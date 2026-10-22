import { describe, expect, it } from 'vitest';

import { parsePerpDexs, parseRwaMarkets } from '../example/src/protocol.js';
import { classifyRwaSymbol, rwaVenueName } from '../example/src/rwa-registry.js';
import type { JsonValue } from '../src/models/json.js';

describe('example RWA registry', () => {
  it('accepts only reviewed venue and symbol combinations', () => {
    expect(rwaVenueName('xyz')).toBe('XYZ');
    expect(classifyRwaSymbol('xyz', 'TSLA')).toBe('equity');
    expect(classifyRwaSymbol('xyz', 'GOLD')).toBe('commodity');
    expect(classifyRwaSymbol('unknown', 'TSLA')).toBeNull();
    expect(classifyRwaSymbol('xyz', 'UNREVIEWED')).toBeNull();
  });
});

describe('example HIP-3 market parsing', () => {
  it('retains the protocol DEX index while filtering unknown venues', () => {
    const payload: JsonValue = [
      { name: 'xyz', fullName: 'XYZ Markets' },
      { name: 'unknown', fullName: 'Unreviewed DEX' },
      { name: 'flx', fullName: 'Felix' },
    ];

    expect(parsePerpDexs(payload)).toEqual([
      { index: 0, name: 'xyz', fullName: 'XYZ Markets' },
      { index: 2, name: 'flx', fullName: 'Felix' },
    ]);
  });

  it('maps reviewed markets and keeps HIP-3 orders read-only', () => {
    const payload: JsonValue = [
      {
        universe: [
          { name: 'xyz:TSLA', szDecimals: 3, maxLeverage: 10 },
          { name: 'xyz:GOLD', szDecimals: 2, maxLeverage: 5 },
          { name: 'xyz:UNKNOWN', szDecimals: 1, maxLeverage: 2 },
        ],
      },
      [
        { markPx: '251.25', prevDayPx: '245', dayNtlVlm: '1000', funding: '0.0001', openInterest: '25' },
        { markPx: '2400.5', prevDayPx: '2390', dayNtlVlm: '500', funding: '0', openInterest: '8' },
        { markPx: '1' },
      ],
    ];

    const parsed = parseRwaMarkets(payload, {
      index: 0,
      name: 'xyz',
      fullName: 'XYZ Markets',
    });

    expect(parsed.markets).toHaveLength(2);
    expect(parsed.markets[0]).toMatchObject({
      asset: null,
      coin: 'xyz:TSLA',
      kind: 'rwa',
      protocolKind: 'perp',
      rwaCategory: 'equity',
      venue: 'XYZ',
    });
    expect(parsed.markets[1]).toMatchObject({
      asset: null,
      coin: 'xyz:GOLD',
      rwaCategory: 'commodity',
    });
    expect(parsed.contexts['xyz:TSLA']).toEqual({
      dayVolume: 1000,
      funding: 0.0001,
      openInterest: 25,
      previousDayPrice: 245,
      price: 251.25,
    });
    expect(parsed.contexts['xyz:UNKNOWN']).toBeUndefined();
  });
});
