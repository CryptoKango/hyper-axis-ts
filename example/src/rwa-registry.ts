import type { RwaCategory } from './market-types.js';

const RWA_VENUES: Readonly<Record<string, string>> = Object.freeze({
  cash: 'Dreamcash',
  flx: 'Felix Exchange',
  io: 'EntropyIO',
  km: 'Markets by Kinetiq',
  mkts: 'Markets by Kinetiq',
  vntl: 'Ventuals',
  xyz: 'XYZ',
});

const CATEGORY_SYMBOLS: Readonly<Record<RwaCategory, ReadonlySet<string>>> = {
  commodity: new Set([
    'ALUMINIUM', 'BRENTOIL', 'CL', 'COPPER', 'CORN', 'GAS', 'GOLD', 'GOLDJM',
    'HO', 'NATGAS', 'OIL', 'PALLADIUM', 'PLATINUM', 'SILVER', 'SILVERJM', 'SOY',
    'TTF', 'URANIUM', 'USENERGY', 'USOIL', 'WHEAT', 'WTI',
  ]),
  equity: new Set([
    'AAOI', 'AAPL', 'AMAT', 'AMD', 'AMZN', 'ARM', 'ASML', 'AVGO', 'BABA', 'BB',
    'BE', 'BMNR', 'BX', 'CAMBRICON', 'CBRS', 'COIN', 'COST', 'CRCL', 'CRWD',
    'CRWV', 'CVX', 'CXMT', 'DELL', 'DKNG', 'EBAY', 'GEV', 'GIGADEV', 'GLW',
    'GME', 'GOOGL', 'GPRO', 'HIMS', 'HOOD', 'HYUNDAI', 'IBIDEN', 'IBM', 'INTC',
    'IONQ', 'IREN', 'KIOXIA', 'LITE', 'LLY', 'LRCX', 'META', 'MINIMAX', 'MRNA',
    'MRVL', 'MSFT', 'MSTR', 'MU', 'NBIS', 'NCLD', 'NET', 'NFLX', 'NOK', 'NOW',
    'NVDA', 'ORCL', 'PLTR', 'QCOM', 'RDDT', 'RIVN', 'RKLB', 'RTX', 'SKHX',
    'SKHY', 'SMSN', 'SNDK', 'SOFTBANK', 'TCNT', 'TENCENT', 'TSLA', 'TSM',
    'TWST', 'UMC', 'WDC', 'XIAOMI', 'YMTC', 'ZHIPU', 'ZM',
  ]),
  forex: new Set(['DXY', 'EUR', 'GBP', 'JPY', 'KRW']),
  index: new Set([
    'EWJ', 'EWT', 'EWY', 'EWZ', 'H100', 'IBOV', 'JP225', 'KORU', 'KR200', 'MAGS',
    'NIFTY', 'SEMI', 'SMALL2000', 'SMH', 'SOXL', 'SP500', 'USA100', 'USA500',
    'USTECH', 'VIX', 'XBI', 'XLE', 'XYZ100',
  ]),
  private: new Set([
    'ANTH', 'ANTHROPIC', 'BOT', 'BIRD', 'DEFENSE', 'ENERGY', 'INFOTECH', 'MAG7',
    'NUCLEAR', 'OAI', 'OPENAI', 'OURA', 'ROBOT', 'SEMIS', 'SHEIN', 'SPACEX',
    'SPCX', 'UNITREE',
  ]),
  rates: new Set(['TLT', 'USBOND']),
};

const RWA_CATEGORIES: readonly RwaCategory[] = [
  'commodity',
  'equity',
  'forex',
  'index',
  'private',
  'rates',
];

/** Returns the trusted display name for an allow-listed RWA venue. */
export function rwaVenueName(dex: string): string | null {
  return RWA_VENUES[dex] ?? null;
}

/**
 * Classifies only symbols explicitly reviewed in this registry.
 * Unknown HIP-3 symbols are intentionally omitted instead of guessed.
 */
export function classifyRwaSymbol(dex: string, symbol: string): RwaCategory | null {
  if (rwaVenueName(dex) === null) return null;
  for (const category of RWA_CATEGORIES) {
    if (CATEGORY_SYMBOLS[category].has(symbol)) return category;
  }
  return null;
}

export function rwaCategoryLabel(category: RwaCategory): string {
  const labels: Readonly<Record<RwaCategory, string>> = {
    commodity: '商品',
    equity: '股票',
    forex: '外汇',
    index: '指数 / ETF',
    private: '私募市场',
    rates: '利率',
  };
  return labels[category];
}
