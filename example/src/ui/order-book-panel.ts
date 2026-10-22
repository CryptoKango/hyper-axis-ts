import type { OrderBookLevel, OrderBookSnapshot } from '../market-types';
import { formatAmount, formatPrice, requireElement } from './dom';

export class OrderBookPanel {
  readonly #asks = requireElement('orderbook-asks', HTMLDivElement);
  readonly #bids = requireElement('orderbook-bids', HTMLDivElement);
  readonly #spreadPrice = requireElement('spread-price', HTMLElement);
  readonly #spreadValue = requireElement('spread-value', HTMLElement);

  public reset(): void {
    this.#asks.replaceChildren();
    this.#bids.replaceChildren();
    this.#spreadPrice.textContent = '--';
    this.#spreadValue.textContent = 'SPREAD --';
  }

  public updatePrice(price: number | null): void {
    this.#spreadPrice.textContent = formatPrice(price);
  }

  public render(book: OrderBookSnapshot): void {
    this.#renderSide(this.#asks, book.asks);
    this.#renderSide(this.#bids, book.bids);
    const bestAsk = book.asks.at(-1)?.price;
    const bestBid = book.bids[0]?.price;
    this.#spreadValue.textContent = bestAsk === undefined || bestBid === undefined
      ? 'SPREAD --'
      : `SPREAD ${formatPrice(bestAsk - bestBid)}`;
  }

  #renderSide(container: HTMLElement, levels: readonly OrderBookLevel[]): void {
    container.replaceChildren();
    const maximumTotal = Math.max(...levels.map((level) => level.total), 1);
    const fragment = document.createDocumentFragment();
    for (const level of levels) {
      const row = document.createElement('div');
      row.className = 'book-row';
      row.style.setProperty('--depth', `${String(Math.min(100, level.total / maximumTotal * 100))}%`);
      for (const value of [formatPrice(level.price), formatAmount(level.size), formatAmount(level.total)]) {
        const cell = document.createElement('span');
        cell.textContent = value;
        row.append(cell);
      }
      fragment.append(row);
    }
    container.append(fragment);
  }
}
