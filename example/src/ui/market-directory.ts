import type { MarketDefinition, MarketKind } from '../market-types';
import { categoryLabel, formatPrice, marketKindLabel, requireElement } from './dom';

export interface MarketDirectoryHandlers {
  readonly onKindChange: (kind: MarketKind) => void;
  readonly onSelect: (market: MarketDefinition) => void;
}

export class MarketDirectory {
  readonly #search = requireElement('market-search', HTMLInputElement);
  readonly #list = requireElement('market-list', HTMLDivElement);
  readonly #count = requireElement('market-count', HTMLSpanElement);
  readonly #tabs = [...document.querySelectorAll<HTMLButtonElement>('[data-market-kind]')];
  readonly #handlers: MarketDirectoryHandlers;
  #markets: readonly MarketDefinition[] = [];
  #mids: Readonly<Record<string, number>> = {};
  #selectedId: string | null = null;
  #kind: MarketKind = 'perp';

  public constructor(handlers: MarketDirectoryHandlers) {
    this.#handlers = handlers;
    this.#search.addEventListener('input', () => { this.render(); });
    for (const tab of this.#tabs) {
      tab.addEventListener('click', () => {
        const kind = parseMarketKind(tab.dataset['marketKind']);
        if (kind === null || kind === this.#kind) return;
        this.#kind = kind;
        this.#search.value = '';
        this.#handlers.onKindChange(kind);
        this.render();
      });
    }
  }

  public get kind(): MarketKind {
    return this.#kind;
  }

  public setMarkets(markets: readonly MarketDefinition[]): void {
    this.#markets = markets;
    this.render();
  }

  public setMids(mids: Readonly<Record<string, number>>): void {
    this.#mids = mids;
    this.render();
  }

  public setSelected(market: MarketDefinition): void {
    this.#selectedId = market.id;
    this.#kind = market.kind;
    this.render();
  }

  public firstMarket(kind: MarketKind): MarketDefinition | undefined {
    const matching = this.#markets.filter((market: MarketDefinition) => market.kind === kind);
    if (kind === 'perp') return matching.find((market) => market.coin === 'BTC') ?? matching[0];
    if (kind === 'spot') {
      return matching.find((market) => market.displayName === 'HYPE/USDC')
        ?? matching.find((market) => market.displayName === 'PURR/USDC')
        ?? matching[0];
    }
    return matching.find((market) => market.coin === 'xyz:TSLA')
      ?? matching.find((market) => market.coin === 'xyz:GOLD')
      ?? matching[0];
  }

  public render(): void {
    for (const tab of this.#tabs) {
      const kind = parseMarketKind(tab.dataset['marketKind']);
      const active = kind === this.#kind;
      tab.classList.toggle('active', active);
      tab.setAttribute('aria-selected', String(active));
      if (kind !== null) {
        const count = this.#markets.filter((market) => market.kind === kind).length;
        const countElement = tab.querySelector('[data-tab-count]');
        if (countElement !== null) countElement.textContent = String(count);
      }
    }

    const query = this.#search.value.trim().toUpperCase();
    const visible = this.#markets
      .filter((market) => market.kind === this.#kind)
      .filter((market) => query === '' || market.displayName.toUpperCase().includes(query)
        || market.coin.toUpperCase().includes(query)
        || market.venue.toUpperCase().includes(query))
      .slice(0, 120);
    this.#count.textContent = `${String(visible.length)} MARKETS`;
    this.#list.replaceChildren();
    if (visible.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'empty-state';
      empty.textContent = this.#kind === 'rwa' ? '暂无已验证 RWA 市场' : '没有匹配的市场';
      this.#list.append(empty);
      return;
    }
    const fragment = document.createDocumentFragment();
    for (const market of visible) fragment.append(this.#createRow(market));
    this.#list.append(fragment);
  }

  #createRow(market: MarketDefinition): HTMLButtonElement {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'market-row';
    button.classList.toggle('active', market.id === this.#selectedId);

    const identity = document.createElement('span');
    identity.className = 'market-row-identity';
    const symbol = document.createElement('strong');
    symbol.textContent = market.displayName;
    const meta = document.createElement('small');
    const category = categoryLabel(market.rwaCategory);
    meta.textContent = category === '' ? market.venue : `${category} · ${market.venue}`;
    identity.append(symbol, meta);

    const price = document.createElement('span');
    price.className = 'market-row-price';
    price.textContent = formatPrice(this.#mids[market.coin] ?? null);

    const tag = document.createElement('span');
    tag.className = `market-kind-tag ${market.kind}`;
    tag.textContent = marketKindLabel(market.kind);
    button.append(identity, price, tag);
    button.addEventListener('click', () => { this.#handlers.onSelect(market); });
    return button;
  }
}

function parseMarketKind(value: string | undefined): MarketKind | null {
  return value === 'perp' || value === 'rwa' || value === 'spot' ? value : null;
}
