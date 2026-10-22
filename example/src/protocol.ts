import type { HyperAxisWebSocketMessage, JsonValue } from '@cryptokango/hyper-axis';

import type {
  AssetContext,
  BboPoint,
  CandlePoint,
  MarketDefinition,
  PerpDexDefinition,
  OrderBookLevel,
  OrderBookSnapshot,
} from './market-types.js';
import { classifyRwaSymbol, rwaVenueName } from './rwa-registry.js';

type JsonRecord = Readonly<Record<string, unknown>>;

export interface WireUpdate<TValue> {
  readonly coin: string;
  readonly value: TValue;
}

export function parsePerpMarkets(payload: JsonValue | null): readonly MarketDefinition[] {
  const root = asRecord(payload);
  const universe = asArray(root?.['universe']);
  if (universe === null) return [];

  return universe.flatMap((entry: unknown, index: number) => {
    const item = asRecord(entry);
    const name = readString(item, 'name');
    const sizeDecimals = readInteger(item, 'szDecimals');
    if (name === null || sizeDecimals === null) return [];
    return [{
      id: `perp:${name}`,
      kind: 'perp' as const,
      displayName: `${name}-PERP`,
      coin: name,
      asset: index,
      protocolKind: 'perp' as const,
      sizeDecimals,
      maxLeverage: readNumber(item, 'maxLeverage'),
      dex: null,
      venue: 'Hyperliquid',
      rwaCategory: null,
    }];
  });
}

export function parseSpotMarkets(payload: JsonValue | null): readonly MarketDefinition[] {
  const root = asRecord(payload);
  const universe = asArray(root?.['universe']);
  const tokens = asArray(root?.['tokens']);
  if (universe === null || tokens === null) return [];

  const tokenByIndex = new Map<number, JsonRecord>();
  for (const entry of tokens) {
    const token = asRecord(entry);
    const index = readInteger(token, 'index');
    if (token !== null && index !== null) tokenByIndex.set(index, token);
  }

  return universe.flatMap((entry: unknown) => {
    const pair = asRecord(entry);
    const wireName = readString(pair, 'name');
    const index = readInteger(pair, 'index');
    const tokenIndexes = asArray(pair?.['tokens']);
    if (wireName === null || index === null || tokenIndexes?.length !== 2) return [];

    const baseIndex = asInteger(tokenIndexes[0]);
    const quoteIndex = asInteger(tokenIndexes[1]);
    if (baseIndex === null || quoteIndex === null) return [];
    const base = tokenByIndex.get(baseIndex);
    const quote = tokenByIndex.get(quoteIndex);
    const baseName = readString(base ?? null, 'name');
    const quoteName = readString(quote ?? null, 'name');
    const sizeDecimals = readInteger(base ?? null, 'szDecimals');
    if (baseName === null || quoteName === null || sizeDecimals === null) return [];

    return [{
      id: `spot:${wireName}`,
      kind: 'spot' as const,
      displayName: `${baseName}/${quoteName}`,
      coin: wireName,
      asset: 10_000 + index,
      protocolKind: 'spot' as const,
      sizeDecimals,
      maxLeverage: null,
      dex: null,
      venue: 'Hyperliquid',
      rwaCategory: null,
    }];
  });
}

export function parsePerpDexs(payload: JsonValue | null): readonly PerpDexDefinition[] {
  const entries = asArray(payload);
  if (entries === null) return [];
  return entries.flatMap((entry: unknown, index: number) => {
    const dex = asRecord(entry);
    const name = readString(dex, 'name');
    const fullName = readString(dex, 'fullName');
    if (name === null || fullName === null || rwaVenueName(name) === null) return [];
    return [{ index, name, fullName }];
  });
}

export interface ParsedRwaMarkets {
  readonly markets: readonly MarketDefinition[];
  readonly contexts: Readonly<Record<string, AssetContext>>;
}

export function parseRwaMarkets(
  payload: JsonValue | null,
  dex: PerpDexDefinition,
): ParsedRwaMarkets {
  const tuple = asArray(payload);
  const meta = asRecord(tuple?.[0]);
  const universe = asArray(meta?.['universe']);
  const contextItems = asArray(tuple?.[1]);
  if (universe === null || contextItems === null) return { markets: [], contexts: {} };

  const contexts: Record<string, AssetContext> = {};
  const markets = universe.flatMap((entry: unknown, index: number) => {
    const item = asRecord(entry);
    const coin = readString(item, 'name');
    const sizeDecimals = readInteger(item, 'szDecimals');
    if (coin === null || sizeDecimals === null) return [];
    const parts = coin.split(':');
    const symbol = parts.length === 2 && parts[0] === dex.name ? parts[1] : undefined;
    if (symbol === undefined) return [];
    const category = classifyRwaSymbol(dex.name, symbol);
    if (category === null) return [];
    const context = parseAssetContextRecord(contextItems[index]);
    if (context !== null) contexts[coin] = context;
    return [{
      id: `rwa:${coin}`,
      kind: 'rwa' as const,
      displayName: `${symbol} / USD`,
      coin,
      // HIP-3 asset IDs remain a Rust Core responsibility. The example keeps
      // RWA markets read-only until that helper is exposed through WASM.
      asset: null,
      protocolKind: 'perp' as const,
      sizeDecimals,
      maxLeverage: readNumber(item, 'maxLeverage'),
      dex: dex.name,
      venue: rwaVenueName(dex.name) ?? dex.fullName,
      rwaCategory: category,
    }];
  });
  return { markets, contexts };
}

export function parseCandleSnapshot(payload: JsonValue | null): readonly CandlePoint[] {
  const items = asArray(payload);
  if (items === null) return [];
  return items.flatMap((item: unknown) => {
    const candle = parseCandle(item);
    return candle === null ? [] : [candle];
  });
}

export function parseCandleMessage(
  message: HyperAxisWebSocketMessage,
): WireUpdate<CandlePoint> | null {
  if (readString(message, 'channel') !== 'candle') return null;
  const data = message['data'];
  let value: unknown = data;
  const values = asArray(data);
  if (values !== null) {
    const last = values.at(-1);
    if (last === undefined) return null;
    value = last;
  }
  const record = asRecord(value);
  const coin = readString(record, 's');
  const candle = parseCandle(value);
  return coin === null || candle === null ? null : { coin, value: candle };
}

export function parseBboMessage(
  message: HyperAxisWebSocketMessage,
): WireUpdate<BboPoint> | null {
  if (readString(message, 'channel') !== 'bbo') return null;
  const data = asRecord(message['data']);
  const levels = asArray(data?.['bbo']);
  const bid = asRecord(levels?.[0]);
  const ask = asRecord(levels?.[1]);
  const coin = readString(data, 'coin');
  const timeMs = readNumber(data, 'time');
  const bidPrice = readNumber(bid, 'px');
  const askPrice = readNumber(ask, 'px');
  if (
    coin === null || timeMs === null || !Number.isSafeInteger(timeMs) ||
    bidPrice === null || askPrice === null || bidPrice <= 0 || askPrice <= 0
  ) return null;
  return { coin, value: { timeMs, price: (bidPrice + askPrice) / 2 } };
}

export function parseOrderBookMessage(
  message: HyperAxisWebSocketMessage,
): WireUpdate<OrderBookSnapshot> | null {
  if (readString(message, 'channel') !== 'l2Book') return null;
  const data = asRecord(message['data']);
  const levels = asArray(data?.['levels']);
  const bids = asArray(levels?.[0]);
  const asks = asArray(levels?.[1]);
  if (bids === null || asks === null) return null;
  const coin = readString(data, 'coin');
  if (coin === null) return null;
  return { coin, value: {
    bids: parseBookSide(bids, true),
    asks: parseBookSide(asks, false),
  } };
}

export function parseAllMidsMessage(
  message: HyperAxisWebSocketMessage,
): Readonly<Record<string, number>> | null {
  if (readString(message, 'channel') !== 'allMids') return null;
  const data = asRecord(message['data']);
  const mids = asRecord(data?.['mids']);
  if (mids === null) return null;
  const result: Record<string, number> = {};
  for (const [coin, value] of Object.entries(mids)) {
    const price = asNumber(value);
    if (price !== null) result[coin] = price;
  }
  return result;
}

export function parseAssetContextMessage(
  message: HyperAxisWebSocketMessage,
): WireUpdate<AssetContext> | null {
  if (readString(message, 'channel') !== 'activeAssetCtx') return null;
  const data = asRecord(message['data']);
  const context = asRecord(data?.['ctx'] ?? data);
  const coin = readString(data, 'coin');
  if (context === null || coin === null) return null;
  const value = parseAssetContextRecord(context);
  return value === null ? null : { coin, value };
}

function parseAssetContextRecord(value: unknown): AssetContext | null {
  const context = asRecord(value);
  if (context === null) return null;
  return {
    price: readNumber(context, 'markPx') ?? readNumber(context, 'midPx'),
    previousDayPrice: readNumber(context, 'prevDayPx'),
    dayVolume: readNumber(context, 'dayNtlVlm'),
    funding: readNumber(context, 'funding'),
    openInterest: readNumber(context, 'openInterest'),
  };
}

function parseCandle(value: unknown): CandlePoint | null {
  const candle = asRecord(value);
  const timeMs = readNumber(candle, 't');
  const open = readNumber(candle, 'o');
  const high = readNumber(candle, 'h');
  const low = readNumber(candle, 'l');
  const close = readNumber(candle, 'c');
  const volume = readNumber(candle, 'v');
  if (
    timeMs === null || open === null || high === null || low === null ||
    close === null || volume === null
  ) return null;
  return { time: Math.floor(timeMs / 1000), open, high, low, close, volume };
}

function parseBookSide(values: readonly unknown[], reverse: boolean): readonly OrderBookLevel[] {
  let total = 0;
  const levels = values.slice(0, 8).flatMap((value: unknown) => {
    const level = asRecord(value);
    const price = readNumber(level, 'px');
    const size = readNumber(level, 'sz');
    if (price === null || size === null) return [];
    total += size;
    return [{ price, size, total }];
  });
  return reverse ? levels : levels.reverse();
}

function asRecord(value: unknown): JsonRecord | null {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
    ? value as JsonRecord
    : null;
}

function asArray(value: unknown): readonly unknown[] | null {
  return Array.isArray(value) ? value : null;
}

function asInteger(value: unknown): number | null {
  return typeof value === 'number' && Number.isSafeInteger(value) ? value : null;
}

function asNumber(value: unknown): number | null {
  const number = typeof value === 'number' ? value :
    typeof value === 'string' && value.trim() !== '' ? Number(value) : Number.NaN;
  return Number.isFinite(number) ? number : null;
}

function readString(record: JsonRecord | null, key: string): string | null {
  const value = record?.[key];
  return typeof value === 'string' ? value : null;
}

function readInteger(record: JsonRecord | null, key: string): number | null {
  return asInteger(record?.[key]);
}

function readNumber(record: JsonRecord | null, key: string): number | null {
  return asNumber(record?.[key]);
}
