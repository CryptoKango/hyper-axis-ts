import { describe, expect, it } from 'vitest';

import {
  EXTENDED_MAX_LEVERAGE,
  hasExtendedLeverage,
  resolvePlannerMaxLeverage,
} from '../example/src/leverage-policy.js';
import type { MarketDefinition, MarketKind } from '../example/src/market-types.js';

describe('example leverage policy', () => {
  it.each(['BTC', 'ETH'] as const)('extends %s perpetual leverage to 1000x', (coin) => {
    const market = createMarket('perp', coin, 40);

    expect(hasExtendedLeverage(market)).toBe(true);
    expect(resolvePlannerMaxLeverage(market)).toBe(EXTENDED_MAX_LEVERAGE);
  });

  it('extends all reviewed RWA markets to 1000x', () => {
    const market = createMarket('rwa', 'xyz:TSLA', 10);

    expect(hasExtendedLeverage(market)).toBe(true);
    expect(resolvePlannerMaxLeverage(market)).toBe(EXTENDED_MAX_LEVERAGE);
  });

  it('retains the protocol ceiling for other perpetual markets', () => {
    const market = createMarket('perp', 'SOL', 20);

    expect(hasExtendedLeverage(market)).toBe(false);
    expect(resolvePlannerMaxLeverage(market)).toBe(20);
  });

  it('falls back to 1x when a protocol ceiling is absent', () => {
    expect(resolvePlannerMaxLeverage(createMarket('perp', 'OTHER', null))).toBe(1);
  });
});

function createMarket(
  kind: MarketKind,
  coin: string,
  maxLeverage: number | null,
): MarketDefinition {
  return {
    id: `${kind}:${coin}`,
    kind,
    displayName: coin,
    coin,
    asset: kind === 'rwa' ? null : 0,
    protocolKind: 'perp',
    sizeDecimals: 5,
    maxLeverage,
    dex: kind === 'rwa' ? 'xyz' : null,
    venue: 'test',
    rwaCategory: kind === 'rwa' ? 'equity' : null,
  };
}
