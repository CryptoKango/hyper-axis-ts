import type { AssetContext, MarketDefinition } from '../market-types';
import {
  categoryLabel,
  formatCompact,
  formatPrice,
  marketKindLabel,
  requireElement,
} from './dom';

export class MarketSummary {
  readonly #kind = requireElement('selected-market-kind', HTMLSpanElement);
  readonly #symbol = requireElement('selected-symbol', HTMLHeadingElement);
  readonly #wire = requireElement('selected-wire-coin', HTMLSpanElement);
  readonly #venue = requireElement('selected-venue', HTMLSpanElement);
  readonly #price = requireElement('market-price', HTMLElement);
  readonly #change = requireElement('market-change', HTMLElement);
  readonly #volume = requireElement('market-volume', HTMLElement);
  readonly #funding = requireElement('market-funding', HTMLElement);
  readonly #openInterest = requireElement('market-open-interest', HTMLElement);

  public setMarket(market: MarketDefinition, price: number | null): void {
    this.#kind.textContent = marketKindLabel(market.kind);
    this.#kind.className = `market-kind-tag ${market.kind}`;
    this.#symbol.textContent = market.displayName;
    this.#wire.textContent = market.coin;
    const category = categoryLabel(market.rwaCategory);
    this.#venue.textContent = category === '' ? market.venue : `${category} · ${market.venue}`;
    this.#change.textContent = '--';
    this.#change.className = 'metric-value';
    this.#volume.textContent = '--';
    this.#funding.textContent = '--';
    this.#openInterest.textContent = '--';
    this.updatePrice(price);
  }

  public updatePrice(price: number | null): void {
    this.#price.textContent = formatPrice(price);
  }

  public updateContext(context: AssetContext, kind: MarketDefinition['kind']): void {
    this.updatePrice(context.price);
    this.#volume.textContent = formatCompact(context.dayVolume, 'USD');
    this.#openInterest.textContent = kind === 'spot'
      ? '--'
      : formatCompact(context.openInterest);
    this.#funding.textContent = kind !== 'spot' && context.funding !== null
      ? `${(context.funding * 100).toFixed(4)}%`
      : '--';
    const change = context.price !== null
      && context.previousDayPrice !== null
      && context.previousDayPrice !== 0
      ? (context.price - context.previousDayPrice) / context.previousDayPrice * 100
      : null;
    this.#change.textContent = change === null
      ? '--'
      : `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`;
    this.#change.className = `metric-value ${change === null ? '' : change >= 0 ? 'positive' : 'negative'}`;
  }
}
