import type { MarketDefinition } from './market-types.js';

export const EXTENDED_MAX_LEVERAGE = 1_000;

/** Returns whether Kango Trade applies its extended product leverage range. */
export function hasExtendedLeverage(market: MarketDefinition): boolean {
  return market.kind === 'rwa'
    || (market.kind === 'perp' && (market.coin === 'BTC' || market.coin === 'ETH'));
}

/**
 * Resolves the leverage ceiling used by the local position planner.
 * Other perpetual markets retain the ceiling reported by Hyperliquid.
 */
export function resolvePlannerMaxLeverage(market: MarketDefinition): number {
  if (hasExtendedLeverage(market)) return EXTENDED_MAX_LEVERAGE;
  const protocolMaximum = Math.trunc(market.maxLeverage ?? 1);
  return Number.isSafeInteger(protocolMaximum) && protocolMaximum >= 1
    ? protocolMaximum
    : 1;
}
