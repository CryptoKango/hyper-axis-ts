import type { BboPoint, TrendPoint } from './market-types.js';

const DEFAULT_BUCKET_MS = 125;
const DEFAULT_WINDOW_MS = 5 * 60_000;

export interface LiveTrendBufferOptions {
  readonly bucketMs?: number;
  readonly windowMs?: number;
}

/**
 * Stores observed BBO midpoints while keeping rendering cadence independent
 * from transport cadence. The trailing point is display-only and carries the
 * last observed price forward to the estimated exchange time.
 */
export class LiveTrendBuffer {
  readonly #bucketMs: number;
  readonly #windowMs: number;
  #points: TrendPoint[] = [];
  #lastSourceTimeMs = Number.NEGATIVE_INFINITY;
  #lastReceivedMonoMs = Number.NEGATIVE_INFINITY;

  public constructor(options: LiveTrendBufferOptions = {}) {
    this.#bucketMs = positiveInteger(options.bucketMs ?? DEFAULT_BUCKET_MS, 'bucketMs');
    this.#windowMs = positiveInteger(options.windowMs ?? DEFAULT_WINDOW_MS, 'windowMs');
  }

  public get hasData(): boolean {
    return this.#points.length > 0;
  }

  public reset(): void {
    this.#points = [];
    this.#lastSourceTimeMs = Number.NEGATIVE_INFINITY;
    this.#lastReceivedMonoMs = Number.NEGATIVE_INFINITY;
  }

  public push(point: BboPoint, receivedMonoMs: number = performance.now()): boolean {
    if (
      !Number.isSafeInteger(point.timeMs) || !Number.isFinite(point.price) || point.price <= 0 ||
      !Number.isFinite(receivedMonoMs) || point.timeMs < this.#lastSourceTimeMs
    ) return false;

    const bucketTimeMs = Math.floor(point.timeMs / this.#bucketMs) * this.#bucketMs;
    const nextPoint = Object.freeze({ timeMs: bucketTimeMs, price: point.price });
    const lastPoint = this.#points.at(-1);
    if (lastPoint?.timeMs === bucketTimeMs) {
      this.#points[this.#points.length - 1] = nextPoint;
    } else {
      this.#points.push(nextPoint);
    }

    this.#lastSourceTimeMs = point.timeMs;
    this.#lastReceivedMonoMs = receivedMonoMs;
    this.#trim(bucketTimeMs);
    return true;
  }

  public frame(nowMonoMs: number = performance.now()): readonly TrendPoint[] {
    const lastPoint = this.#points.at(-1);
    if (lastPoint === undefined || !Number.isFinite(nowMonoMs)) return [];
    const estimatedSourceTimeMs = Math.max(
      this.#lastSourceTimeMs,
      this.#lastSourceTimeMs + Math.max(0, nowMonoMs - this.#lastReceivedMonoMs),
    );
    const minimumTimeMs = estimatedSourceTimeMs - this.#windowMs;
    const visiblePoints = this.#points.filter((point) => point.timeMs >= minimumTimeMs);
    const visibleLast = visiblePoints.at(-1);
    if (visibleLast === undefined) {
      return [Object.freeze({ timeMs: estimatedSourceTimeMs, price: lastPoint.price })];
    }
    if (estimatedSourceTimeMs <= visibleLast.timeMs) return Object.freeze(visiblePoints);
    return Object.freeze([
      ...visiblePoints,
      Object.freeze({ timeMs: estimatedSourceTimeMs, price: visibleLast.price }),
    ]);
  }

  #trim(referenceTimeMs: number): void {
    const minimumTimeMs = referenceTimeMs - this.#windowMs;
    const firstVisibleIndex = this.#points.findIndex((point) => point.timeMs >= minimumTimeMs);
    if (firstVisibleIndex > 0) this.#points = this.#points.slice(firstVisibleIndex);
  }
}

function positiveInteger(value: number, name: string): number {
  if (!Number.isSafeInteger(value) || value <= 0) {
    throw new RangeError(`${name} must be a positive safe integer`);
  }
  return value;
}
