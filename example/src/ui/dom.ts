import type { MarketKind, RwaCategory } from '../market-types';
import { rwaCategoryLabel } from '../rwa-registry';

export function requireElement<TElement extends HTMLElement>(
  id: string,
  elementType: new () => TElement,
): TElement {
  const element = document.getElementById(id);
  if (!(element instanceof elementType)) {
    throw new Error(`缺少页面元素或元素类型不匹配 #${id}`);
  }
  return element;
}

export function formatPrice(value: number | null): string {
  if (value === null || !Number.isFinite(value)) return '--';
  const maximumFractionDigits = value >= 1_000 ? 2 : value >= 1 ? 4 : 8;
  return value.toLocaleString('en-US', { maximumFractionDigits });
}

export function formatAmount(value: number): string {
  return value.toLocaleString('en-US', { maximumFractionDigits: 5 });
}

export function formatCompact(value: number | null, suffix = ''): string {
  if (value === null) return '--';
  const formatted = Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 2,
  }).format(value);
  return suffix === '' ? formatted : `${formatted} ${suffix}`;
}

export function minimumSize(decimals: number): string {
  if (decimals <= 0) return '1';
  return `0.${'0'.repeat(Math.max(0, decimals - 1))}1`;
}

export function marketKindLabel(kind: MarketKind): string {
  const labels: Readonly<Record<MarketKind, string>> = {
    perp: 'PERP',
    rwa: 'RWA',
    spot: 'SPOT',
  };
  return labels[kind];
}

export function categoryLabel(category: RwaCategory | null): string {
  return category === null ? '' : rwaCategoryLabel(category);
}
