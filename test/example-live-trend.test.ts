import { describe, expect, it } from 'vitest';

import { LiveTrendBuffer } from '../example/src/live-trend.js';
import { parseBboMessage } from '../example/src/protocol.js';

describe('example BBO parsing', () => {
  it('parses the best bid and ask into a midpoint observation', () => {
    expect(parseBboMessage({
      channel: 'bbo',
      data: {
        coin: 'BTC',
        time: 1_700_000_000_125,
        bbo: [
          { px: '100', sz: '2', n: 1 },
          { px: '102', sz: '3', n: 1 },
        ],
      },
    })).toEqual({
      coin: 'BTC',
      value: { timeMs: 1_700_000_000_125, price: 101 },
    });
  });

  it('rejects incomplete or unrelated messages', () => {
    expect(parseBboMessage({
      channel: 'bbo',
      data: { coin: 'BTC', time: 1_700_000_000_125, bbo: [{ px: '100' }, null] },
    })).toBeNull();
    expect(parseBboMessage({ channel: 'pong' })).toBeNull();
  });
});

describe('LiveTrendBuffer', () => {
  it('buckets quotes, replaces the active bucket, and rejects stale data', () => {
    const buffer = new LiveTrendBuffer({ bucketMs: 125, windowMs: 1_000 });

    expect(buffer.push({ timeMs: 1_010, price: 100 }, 10)).toBe(true);
    expect(buffer.push({ timeMs: 1_099, price: 101 }, 20)).toBe(true);
    expect(buffer.push({ timeMs: 1_050, price: 99 }, 30)).toBe(false);

    expect(buffer.frame(20)).toEqual([
      { timeMs: 1_000, price: 101 },
      { timeMs: 1_099, price: 101 },
    ]);
  });

  it('uses the monotonic receive clock to carry the last quote forward', () => {
    const buffer = new LiveTrendBuffer({ bucketMs: 125, windowMs: 1_000 });
    buffer.push({ timeMs: 2_000, price: 50 }, 100);
    buffer.push({ timeMs: 2_250, price: 51 }, 200);

    expect(buffer.frame(450)).toEqual([
      { timeMs: 2_000, price: 50 },
      { timeMs: 2_250, price: 51 },
      { timeMs: 2_500, price: 51 },
    ]);
  });

  it('validates its retention configuration', () => {
    expect(() => new LiveTrendBuffer({ bucketMs: 0 })).toThrow(RangeError);
    expect(() => new LiveTrendBuffer({ windowMs: Number.NaN })).toThrow(RangeError);
  });
});
