import {
  HyperAxisClient,
  HyperAxisError,
  createHyperAxisWasmLoader,
  type HyperAxisCandleInterval,
  type HyperAxisLimitOrderRequest,
} from '@cryptokango/hyper-axis';

import { MarketChart, type ChartMode } from './market-chart';
import { HyperliquidMarketFeed } from './market-feed';
import type {
  AssetContext,
  BboPoint,
  CandlePoint,
  FeedStatus,
  MarketDefinition,
  MarketKind,
  OrderBookSnapshot,
} from './market-types';
import { ConnectionStatus } from './ui/connection-status';
import { formatPrice, requireElement } from './ui/dom';
import { MarketDirectory } from './ui/market-directory';
import { MarketSummary } from './ui/market-summary';
import { OrderBookPanel } from './ui/order-book-panel';
import { TradeTicket, type TradeDraft } from './ui/trade-ticket';
import './theme.css';
import './style.css';

const protocolVersion = requireElement('protocol-version', HTMLSpanElement);
const tickerTrack = requireElement('ticker-track', HTMLDivElement);
const chartTitle = requireElement('chart-title', HTMLElement);
const chartFeedLabel = requireElement('chart-feed-label', HTMLSpanElement);
const chartIntervalHint = requireElement('chart-interval-hint', HTMLSpanElement);
const chartRoot = requireElement('chart-root', HTMLDivElement);
const chartLoading = requireElement('chart-loading', HTMLDivElement);
const logsButton = requireElement('logs-button', HTMLButtonElement);
const output = requireElement('output', HTMLPreElement);
const intervalButtons = [...document.querySelectorAll<HTMLButtonElement>('[data-interval]')];
const chartModeButtons = [...document.querySelectorAll<HTMLButtonElement>('[data-chart-mode]')];

const chart = new MarketChart(chartRoot);
const summary = new MarketSummary();
const orderBook = new OrderBookPanel();
const directory = new MarketDirectory({
  onKindChange: handleKindChange,
  onSelect: (market: MarketDefinition): void => {
    void selectMarket(market);
  },
});
const tradeTicket = new TradeTicket(handlePrepareOrder);
const connection = new ConnectionStatus(() => feed?.reconnectNow());
const loader = createHyperAxisWasmLoader({
  importModule: () => import('@cryptokango/hyper-axis/wasm'),
});

let client: HyperAxisClient | undefined;
let feed: HyperliquidMarketFeed | undefined;
let markets: readonly MarketDefinition[] = [];
let selectedMarket: MarketDefinition | undefined;
let selectedInterval: HyperAxisCandleInterval = '5m';
let selectedChartMode: ChartMode = 'candles';
let mids: Readonly<Record<string, number>> = {};
let contexts: Readonly<Record<string, AssetContext>> = {};

bindEvents();
void bootstrap();

async function bootstrap(): Promise<void> {
  try {
    client = await HyperAxisClient.initialize(loader);
    client.configureLogging({ enabled: true, level: 'info', capacity: 300 });
    protocolVersion.textContent = `CORE ${client.protocolVersion}`;
    feed = new HyperliquidMarketFeed(client, {
      onStatus: (status: FeedStatus): void => { connection.render(status); },
      onSnapshot: handleCandleSnapshot,
      onCandle: handleCandle,
      onBbo: handleBbo,
      onBook: (book: OrderBookSnapshot): void => { orderBook.render(book); },
      onMids: handleMids,
      onAssetContext: handleAssetContext,
      onError: (error: unknown): void => { writeError('市场数据错误', error); },
    });

    const catalog = await feed.loadMarkets();
    markets = catalog.markets;
    contexts = catalog.initialContexts;
    mids = Object.freeze(Object.fromEntries(
      Object.entries(contexts).flatMap(([coin, context]) =>
        context.price === null ? [] : [[coin, context.price]]),
    ));
    if (markets.length === 0) throw new Error('Hyperliquid 未返回可用市场。');

    directory.setMarkets(markets);
    directory.setMids(mids);
    connection.enable();
    logsButton.disabled = false;
    const initialMarket = directory.firstMarket('perp');
    if (initialMarket === undefined) throw new Error('未找到默认合约市场。');
    await selectMarket(initialMarket);
    feed.connect();
    renderTicker();
    writeOutput('Kango Trade 0.2 初始化完成', {
      network: 'mainnet',
      perpetuals: countMarkets('perp'),
      spot: countMarkets('spot'),
      rwa: countMarkets('rwa'),
      rwaDexes: catalog.rwaDexes,
      chart: 'tradingview/lightweight-charts@5.2.1',
      protocolVersion: client.protocolVersion,
    });
  } catch (error: unknown) {
    connection.renderFailure();
    writeError('初始化失败', error);
  }
}

function bindEvents(): void {
  for (const button of chartModeButtons) {
    button.addEventListener('click', () => {
      const mode = parseChartMode(button.dataset['chartMode']);
      if (mode === null) return;
      selectedChartMode = mode;
      chart.setMode(mode);
      renderChartControls();
    });
  }
  for (const button of intervalButtons) {
    button.addEventListener('click', () => {
      const interval = parseInterval(button.dataset['interval']);
      if (interval === null || selectedMarket === undefined) return;
      selectedInterval = interval;
      renderIntervals();
      void reloadSelection();
    });
  }
  logsButton.addEventListener('click', () => {
    if (client !== undefined) writeOutput('SDK 脱敏日志', client.snapshotLogs());
  });
  window.addEventListener('beforeunload', () => {
    feed?.[Symbol.dispose]();
    chart[Symbol.dispose]();
  });
}

function handleKindChange(kind: MarketKind): void {
  const next = directory.firstMarket(kind);
  if (next !== undefined) void selectMarket(next);
}

async function selectMarket(market: MarketDefinition): Promise<void> {
  selectedMarket = market;
  const latestPrice = mids[market.coin] ?? contexts[market.coin]?.price ?? null;
  directory.setSelected(market);
  summary.setMarket(market, latestPrice);
  const context = contexts[market.coin];
  if (context !== undefined) summary.updateContext(context, market.kind);
  tradeTicket.setMarket(market, latestPrice);
  orderBook.reset();
  chart.setCandleData([]);
  chart.resetTrend();
  renderChartControls();
  chartLoading.textContent = selectedChartMode === 'trend'
    ? '正在等待实时 BBO…'
    : '正在载入历史 K 线…';
  chartLoading.classList.remove('hidden');
  await feed?.select({ market, interval: selectedInterval });
}

async function reloadSelection(): Promise<void> {
  const market = selectedMarket;
  if (market === undefined) return;
  renderChartControls();
  chartLoading.textContent = '正在切换 K 线周期…';
  chartLoading.classList.remove('hidden');
  chart.setCandleData([]);
  await feed?.select({ market, interval: selectedInterval });
}

function handleCandleSnapshot(candles: readonly CandlePoint[]): void {
  chart.setCandleData(candles);
  const latest = candles.at(-1);
  if (latest !== undefined) updatePrice(latest.close);
  if (selectedChartMode === 'candles') {
    chartLoading.textContent = candles.length === 0 ? '该市场暂无历史 K 线' : '';
    chartLoading.classList.toggle('hidden', candles.length > 0);
  }
}

function handleCandle(candle: CandlePoint): void {
  chart.updateCandle(candle);
  if (selectedChartMode === 'candles') chartLoading.classList.add('hidden');
  updatePrice(candle.close);
}

function handleBbo(point: BboPoint): void {
  if (!chart.updateTrend(point)) return;
  if (selectedChartMode === 'trend') chartLoading.classList.add('hidden');
  updatePrice(point.price);
}

function handleMids(nextMids: Readonly<Record<string, number>>): void {
  mids = Object.freeze({ ...mids, ...nextMids });
  directory.setMids(mids);
  const market = selectedMarket;
  if (market !== undefined) {
    const price = mids[market.coin];
    if (price !== undefined) updatePrice(price);
  }
  renderTicker();
}

function handleAssetContext(context: AssetContext): void {
  const market = selectedMarket;
  if (market === undefined) return;
  contexts = Object.freeze({ ...contexts, [market.coin]: context });
  summary.updateContext(context, market.kind);
  if (context.price !== null) updatePrice(context.price);
}

function updatePrice(price: number | null): void {
  summary.updatePrice(price);
  orderBook.updatePrice(price);
  tradeTicket.updatePrice(price);
}

function renderTicker(): void {
  const priorities = ['BTC', 'ETH', 'HYPE', 'xyz:TSLA', 'xyz:GOLD', 'xyz:NVDA'];
  const selected = priorities.flatMap((coin) => {
    const market = markets.find((candidate) => candidate.coin === coin);
    return market === undefined || mids[coin] === undefined ? [] : [market];
  });
  const fallback = markets.filter((market) => mids[market.coin] !== undefined).slice(0, 8);
  const tickerMarkets = selected.length >= 3 ? selected : fallback;
  if (tickerMarkets.length === 0) return;
  tickerTrack.replaceChildren();
  for (const market of [...tickerMarkets, ...tickerMarkets]) {
    const item = document.createElement('span');
    item.className = 'ticker-price';
    item.textContent = `${market.displayName}  ${formatPrice(mids[market.coin] ?? null)}`;
    tickerTrack.append(item);
  }
}

function handlePrepareOrder(draft: TradeDraft): void {
  const activeClient = client;
  const market = selectedMarket;
  if (activeClient === undefined || market === undefined || market.asset === null) return;
  try {
    const nonceManager = activeClient.createNonceManager();
    try {
      const base = {
        network: 'mainnet' as const,
        asset: market.asset,
        marketKind: market.protocolKind,
        sizeDecimals: market.sizeDecimals,
        side: draft.side,
        limitPrice: activeClient.normalizeDecimal(draft.limitPrice),
        size: activeClient.normalizeDecimal(draft.size),
        timeInForce: 'Gtc' as const,
        nonce: nonceManager.next(String(Date.now())),
      };
      const request: HyperAxisLimitOrderRequest = market.protocolKind === 'perp'
        ? { ...base, reduceOnly: draft.reduceOnly }
        : base;
      const prepared = activeClient.prepareLimitOrder(request);
      writeOutput('订单已由 Rust Core 完成预处理（未签名、未提交）', {
        market: market.displayName,
        wireCoin: market.coin,
        asset: market.asset,
        side: draft.side,
        positionPlan: draft.perpPlan,
        action: prepared.action,
        actionHashHex: prepared.actionHashHex,
        signingDigestHex: prepared.signingDigestHex,
      });
    } finally {
      nonceManager.dispose();
    }
  } catch (error: unknown) {
    writeError('订单预处理失败', error);
  }
}

function renderIntervals(): void {
  for (const button of intervalButtons) {
    button.classList.toggle('active', button.dataset['interval'] === selectedInterval);
  }
}

function renderChartControls(): void {
  const marketName = selectedMarket?.displayName ?? 'MARKET';
  const showTrend = selectedChartMode === 'trend';
  chartTitle.textContent = showTrend
    ? `${marketName} · 实时`
    : `${marketName} · ${selectedInterval}`;
  chartFeedLabel.textContent = showTrend
    ? 'LIVE BBO MID · 125MS BUCKETS'
    : 'LIVE CANDLES · WEBSOCKET';
  chartIntervalHint.textContent = showTrend ? 'BBO 实时' : '最小 1m';
  chartIntervalHint.title = showTrend
    ? '趋势图使用 Hyperliquid BBO 中间价，绘制刷新上限为 10 FPS'
    : 'Hyperliquid candle 订阅最小周期为 1m';
  for (const button of chartModeButtons) {
    button.classList.toggle('active', button.dataset['chartMode'] === selectedChartMode);
  }
  for (const button of intervalButtons) button.disabled = showTrend;
  if (showTrend) {
    chartLoading.textContent = chart.hasTrendData ? '' : '正在等待实时 BBO…';
    chartLoading.classList.toggle('hidden', chart.hasTrendData);
  } else {
    chartLoading.textContent = chart.hasCandleData ? '' : '正在载入历史 K 线…';
    chartLoading.classList.toggle('hidden', chart.hasCandleData);
  }
}

function writeError(label: string, error: unknown): void {
  if (error instanceof HyperAxisError) {
    writeOutput(label, {
      error: error.name,
      code: error.code,
      operation: error.operation,
      message: error.message,
    });
    return;
  }
  writeOutput(label, { error: error instanceof Error ? error.message : '未知错误' });
}

function writeOutput(label: string, value: unknown): void {
  output.textContent = `${label}\n\n${typeof value === 'string' ? value : JSON.stringify(value, null, 2)}`;
}

function countMarkets(kind: MarketKind): number {
  return markets.filter((market) => market.kind === kind).length;
}

function parseInterval(value: string | undefined): HyperAxisCandleInterval | null {
  const intervals: readonly HyperAxisCandleInterval[] = [
    '1m', '3m', '5m', '15m', '30m', '1h', '2h', '4h', '8h', '12h',
    '1d', '3d', '1w', '1M',
  ];
  return intervals.find((interval) => interval === value) ?? null;
}

function parseChartMode(value: string | undefined): ChartMode | null {
  return value === 'candles' || value === 'trend' ? value : null;
}
