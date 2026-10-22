import {
  AreaSeries,
  CandlestickSeries,
  ColorType,
  CrosshairMode,
  HistogramSeries,
  LineStyle,
  LineType,
  createChart,
  type AreaData,
  type CandlestickData,
  type HistogramData,
  type IChartApi,
  type ISeriesApi,
  type UTCTimestamp,
} from 'lightweight-charts';

import { LiveTrendBuffer } from './live-trend';
import type { BboPoint, CandlePoint, TrendPoint } from './market-types';

export type ChartMode = 'candles' | 'trend';

const TREND_RENDER_INTERVAL_MS = 100;
const TREND_WINDOW_MS = 5 * 60_000;

export class MarketChart implements Disposable {
  readonly #chart: IChartApi;
  readonly #candles: ISeriesApi<'Candlestick'>;
  readonly #trend: ISeriesApi<'Area'>;
  readonly #volume: ISeriesApi<'Histogram'>;
  readonly #resizeObserver: ResizeObserver;
  readonly #longVolumeColor: string;
  readonly #shortVolumeColor: string;
  readonly #trendBuffer = new LiveTrendBuffer({ windowMs: TREND_WINDOW_MS });
  #mode: ChartMode = 'candles';
  #hasCandleData = false;
  #trendFrameId: number | undefined;
  #lastTrendPaintMonoMs = Number.NEGATIVE_INFINITY;

  public constructor(container: HTMLElement) {
    const theme = readChartTheme();
    this.#longVolumeColor = theme.longVolume;
    this.#shortVolumeColor = theme.shortVolume;
    this.#chart = createChart(container, {
      autoSize: true,
      layout: {
        attributionLogo: false,
        background: { type: ColorType.Solid, color: theme.surface },
        textColor: theme.mutedText,
        fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
      },
      localization: { locale: 'zh-CN' },
      grid: {
        vertLines: { color: theme.grid, style: LineStyle.Dotted },
        horzLines: { color: theme.grid, style: LineStyle.Dotted },
      },
      crosshair: { mode: CrosshairMode.Normal },
      rightPriceScale: { borderColor: theme.border },
      timeScale: {
        borderColor: theme.border,
        timeVisible: true,
        secondsVisible: false,
        rightOffset: 4,
      },
      handleScale: true,
      handleScroll: true,
    });

    this.#candles = this.#chart.addSeries(CandlestickSeries, {
      upColor: theme.long,
      downColor: theme.short,
      borderUpColor: theme.longStrong,
      borderDownColor: theme.shortStrong,
      wickUpColor: theme.longStrong,
      wickDownColor: theme.shortStrong,
      priceLineColor: theme.border,
    });
    this.#candles.priceScale().applyOptions({
      scaleMargins: { top: 0.08, bottom: 0.24 },
    });

    this.#trend = this.#chart.addSeries(AreaSeries, {
      lineColor: theme.trendLine,
      lineType: LineType.WithSteps,
      lineWidth: 3,
      topColor: theme.trendFillTop,
      bottomColor: theme.trendFillBottom,
      priceLineColor: theme.trendLine,
      visible: false,
    });
    this.#trend.priceScale().applyOptions({
      scaleMargins: { top: 0.08, bottom: 0.08 },
    });

    this.#volume = this.#chart.addSeries(HistogramSeries, {
      priceFormat: { type: 'volume' },
      priceScaleId: '',
    });
    this.#volume.priceScale().applyOptions({
      scaleMargins: { top: 0.8, bottom: 0 },
    });

    this.#resizeObserver = new ResizeObserver(() => {
      this.#chart.timeScale().applyOptions({ barSpacing: container.clientWidth < 640 ? 6 : 9 });
    });
    this.#resizeObserver.observe(container);
  }

  public setCandleData(points: readonly CandlePoint[]): void {
    this.#hasCandleData = points.length > 0;
    this.#candles.setData(points.map(toCandlestickData));
    this.#volume.setData(points.map((point) => this.#toVolumeData(point)));
    if (this.#mode === 'candles') this.#chart.timeScale().fitContent();
  }

  public updateCandle(point: CandlePoint): void {
    this.#hasCandleData = true;
    this.#candles.update(toCandlestickData(point));
    this.#volume.update(this.#toVolumeData(point));
  }

  public updateTrend(point: BboPoint): boolean {
    return this.#trendBuffer.push(point);
  }

  public resetTrend(): void {
    this.#trendBuffer.reset();
    this.#trend.setData([]);
  }

  public get hasTrendData(): boolean {
    return this.#trendBuffer.hasData;
  }

  public get hasCandleData(): boolean {
    return this.#hasCandleData;
  }

  public setMode(mode: ChartMode): void {
    this.#mode = mode;
    const showCandles = mode === 'candles';
    this.#candles.applyOptions({ visible: showCandles });
    this.#volume.applyOptions({ visible: showCandles });
    this.#trend.applyOptions({ visible: !showCandles });
    this.#chart.timeScale().applyOptions({
      rightOffset: showCandles ? 4 : 0,
      secondsVisible: !showCandles,
    });
    if (showCandles) {
      this.#stopTrendAnimation();
      // Lightweight Charts uses one shared time scale for every series. Hidden
      // sub-second trend points would otherwise compress minute candles.
      this.#trend.setData([]);
      this.#chart.timeScale().fitContent();
    } else {
      this.#startTrendAnimation();
    }
  }

  #toVolumeData(point: CandlePoint): HistogramData {
    return {
      time: point.time as UTCTimestamp,
      value: point.volume,
      color: point.close >= point.open ? this.#longVolumeColor : this.#shortVolumeColor,
    };
  }

  public [Symbol.dispose](): void {
    this.#stopTrendAnimation();
    this.#resizeObserver.disconnect();
    this.#chart.remove();
  }

  #startTrendAnimation(): void {
    if (this.#trendFrameId !== undefined) return;
    this.#lastTrendPaintMonoMs = Number.NEGATIVE_INFINITY;
    this.#trendFrameId = requestAnimationFrame(this.#renderTrendFrame);
  }

  #stopTrendAnimation(): void {
    if (this.#trendFrameId === undefined) return;
    cancelAnimationFrame(this.#trendFrameId);
    this.#trendFrameId = undefined;
  }

  readonly #renderTrendFrame = (nowMonoMs: number): void => {
    this.#trendFrameId = undefined;
    if (this.#mode !== 'trend') return;
    if (nowMonoMs - this.#lastTrendPaintMonoMs >= TREND_RENDER_INTERVAL_MS) {
      const points = this.#trendBuffer.frame(nowMonoMs);
      const lastPoint = points.at(-1);
      if (lastPoint !== undefined) {
        this.#trend.setData(points.map(toTrendAreaData));
        this.#chart.timeScale().setVisibleRange({
          from: ((lastPoint.timeMs - TREND_WINDOW_MS) / 1000) as UTCTimestamp,
          to: (lastPoint.timeMs / 1000) as UTCTimestamp,
        });
      }
      this.#lastTrendPaintMonoMs = nowMonoMs;
    }
    this.#trendFrameId = requestAnimationFrame(this.#renderTrendFrame);
  };
}

function toCandlestickData(point: CandlePoint): CandlestickData {
  return {
    time: point.time as UTCTimestamp,
    open: point.open,
    high: point.high,
    low: point.low,
    close: point.close,
  };
}

function toTrendAreaData(point: TrendPoint): AreaData {
  return {
    time: (point.timeMs / 1000) as UTCTimestamp,
    value: point.price,
  };
}

interface ChartTheme {
  readonly border: string;
  readonly grid: string;
  readonly long: string;
  readonly longStrong: string;
  readonly longVolume: string;
  readonly mutedText: string;
  readonly short: string;
  readonly shortStrong: string;
  readonly shortVolume: string;
  readonly surface: string;
  readonly trendFillBottom: string;
  readonly trendFillTop: string;
  readonly trendLine: string;
}

function readChartTheme(): ChartTheme {
  const style = getComputedStyle(document.documentElement);
  return {
    border: readThemeColor(style, '--color-border'),
    grid: readThemeColor(style, '--color-grid'),
    long: readThemeColor(style, '--color-long-chart'),
    longStrong: readThemeColor(style, '--color-long-chart-strong'),
    longVolume: readThemeColor(style, '--color-long-volume'),
    mutedText: readThemeColor(style, '--color-text-muted'),
    short: readThemeColor(style, '--color-short-chart'),
    shortStrong: readThemeColor(style, '--color-short-chart-strong'),
    shortVolume: readThemeColor(style, '--color-short-volume'),
    surface: readThemeColor(style, '--color-surface-paper'),
    trendFillBottom: readThemeColor(style, '--color-trend-fill-bottom'),
    trendFillTop: readThemeColor(style, '--color-trend-fill-top'),
    trendLine: readThemeColor(style, '--color-trend-line'),
  };
}

function readThemeColor(style: CSSStyleDeclaration, property: string): string {
  const value = style.getPropertyValue(property).trim();
  if (value === '') throw new Error(`缺少主题颜色 ${property}`);
  return value;
}
