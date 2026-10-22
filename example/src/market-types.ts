import type { HyperAxisCandleInterval } from '@cryptokango/hyper-axis';

export type MarketKind = 'perp' | 'rwa' | 'spot';
export type ProtocolMarketKind = 'perp' | 'spot';
export type RwaCategory =
  | 'commodity'
  | 'equity'
  | 'forex'
  | 'index'
  | 'private'
  | 'rates';

export interface MarketDefinition {
  readonly id: string;
  readonly kind: MarketKind;
  readonly displayName: string;
  readonly coin: string;
  readonly asset: number | null;
  readonly protocolKind: ProtocolMarketKind;
  readonly sizeDecimals: number;
  readonly maxLeverage: number | null;
  readonly dex: string | null;
  readonly venue: string;
  readonly rwaCategory: RwaCategory | null;
}

export interface PerpDexDefinition {
  readonly index: number;
  readonly name: string;
  readonly fullName: string;
}

export interface MarketCatalog {
  readonly markets: readonly MarketDefinition[];
  readonly initialContexts: Readonly<Record<string, AssetContext>>;
  readonly rwaDexes: readonly string[];
}

export interface CandlePoint {
  readonly time: number;
  readonly open: number;
  readonly high: number;
  readonly low: number;
  readonly close: number;
  readonly volume: number;
}

/** Best-bid/offer midpoint observation used by the display-only live trend. */
export interface BboPoint {
  readonly timeMs: number;
  readonly price: number;
}

/** Time-bucketed point rendered by the live trend series. */
export interface TrendPoint {
  readonly timeMs: number;
  readonly price: number;
}

export interface OrderBookLevel {
  readonly price: number;
  readonly size: number;
  readonly total: number;
}

export interface OrderBookSnapshot {
  readonly asks: readonly OrderBookLevel[];
  readonly bids: readonly OrderBookLevel[];
}

export interface AssetContext {
  readonly price: number | null;
  readonly previousDayPrice: number | null;
  readonly dayVolume: number | null;
  readonly funding: number | null;
  readonly openInterest: number | null;
}

export interface FeedSelection {
  readonly market: MarketDefinition;
  readonly interval: HyperAxisCandleInterval;
}

export type FeedStatus =
  | 'connecting'
  | 'live'
  | 'reconnecting'
  | 'offline';
