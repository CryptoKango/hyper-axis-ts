import type { MarketDefinition } from '../market-types';
import {
  hasExtendedLeverage,
  resolvePlannerMaxLeverage,
} from '../leverage-policy.js';
import {
  calculatePerpRiskPreview,
  multiplyPositiveDecimals,
  type PerpRiskPreview,
} from '../perp-risk';
import { minimumSize, requireElement } from './dom';

export interface TradeDraft {
  readonly limitPrice: string;
  readonly perpPlan: PerpRiskPreview | null;
  readonly reduceOnly: boolean;
  readonly side: 'buy' | 'sell';
  readonly size: string;
}

export class TradeTicket {
  readonly #buy = requireElement('buy-side', HTMLButtonElement);
  readonly #sell = requireElement('sell-side', HTMLButtonElement);
  readonly #planner = requireElement('perp-planner', HTMLElement);
  readonly #margin = requireElement('margin-input', HTMLInputElement);
  readonly #leverage = requireElement('leverage-slider', HTMLInputElement);
  readonly #leverageValue = requireElement('leverage-value', HTMLElement);
  readonly #leverageButtons = [...document.querySelectorAll<HTMLButtonElement>('[data-leverage], [data-leverage-max]')];
  readonly #price = requireElement('price-input', HTMLInputElement);
  readonly #size = requireElement('size-input', HTMLInputElement);
  readonly #sizeUnit = requireElement('size-unit', HTMLElement);
  readonly #reduceOnlyRow = requireElement('reduce-only-row', HTMLLabelElement);
  readonly #reduceOnly = requireElement('reduce-only', HTMLInputElement);
  readonly #totalLabel = requireElement('order-total-label', HTMLElement);
  readonly #total = requireElement('order-total', HTMLElement);
  readonly #zeroEquityRow = requireElement('zero-equity-row', HTMLElement);
  readonly #zeroEquityPrice = requireElement('zero-equity-price', HTMLElement);
  readonly #assetId = requireElement('asset-id', HTMLElement);
  readonly #button = requireElement('order-button', HTMLButtonElement);
  readonly #notice = requireElement('trade-notice', HTMLParagraphElement);
  readonly #onPrepare: (draft: TradeDraft) => void;
  #market: MarketDefinition | undefined;
  #maxLeverage = 1;
  #perpPlan: PerpRiskPreview | null = null;
  #side: 'buy' | 'sell' = 'buy';

  public constructor(onPrepare: (draft: TradeDraft) => void) {
    this.#onPrepare = onPrepare;
    this.#buy.addEventListener('click', () => { this.#setSide('buy'); });
    this.#sell.addEventListener('click', () => { this.#setSide('sell'); });
    this.#price.addEventListener('input', () => {
      this.#price.dataset['automatic'] = 'false';
      this.#renderSummary();
    });
    this.#size.addEventListener('input', () => { this.#renderSummary(); });
    this.#margin.addEventListener('input', () => { this.#renderSummary(); });
    this.#leverage.addEventListener('input', () => {
      this.#renderLeverage();
      this.#renderSummary();
    });
    for (const button of this.#leverageButtons) {
      button.addEventListener('click', () => {
        const requested = button.hasAttribute('data-leverage-max')
          ? this.#maxLeverage
          : Number(button.dataset['leverage']);
        if (!Number.isSafeInteger(requested) || requested < 1) return;
        this.#leverage.value = String(Math.min(requested, this.#maxLeverage));
        this.#renderLeverage();
        this.#renderSummary();
      });
    }
    this.#reduceOnly.addEventListener('change', () => {
      this.#renderTradingMode();
      this.#renderSummary();
      this.#renderButton();
    });
    this.#button.addEventListener('click', () => {
      if (this.#market?.asset === null || this.#button.disabled) return;
      this.#onPrepare({
        limitPrice: this.#price.value,
        perpPlan: this.#perpPlan,
        reduceOnly: this.#reduceOnly.checked,
        side: this.#side,
        size: this.#size.value,
      });
    });
  }

  public setMarket(market: MarketDefinition, price: number | null): void {
    this.#market = market;
    this.#maxLeverage = resolvePlannerMaxLeverage(market);
    this.#leverage.max = String(this.#maxLeverage);
    this.#leverage.value = String(Math.min(10, this.#maxLeverage));
    this.#price.dataset['automatic'] = 'true';
    this.#sizeUnit.textContent = market.displayName.split(/[ /-]/u)[0] ?? market.coin;
    this.#reduceOnly.checked = false;
    this.#assetId.textContent = market.asset === null ? 'RWA READ-ONLY' : String(market.asset);
    this.#size.value = minimumSize(market.sizeDecimals);
    this.#renderLeverage();
    this.#renderTradingMode();
    this.#renderButton();
    this.updatePrice(price);
    this.#renderSummary();
  }

  public updatePrice(price: number | null): void {
    if (price === null || (this.#price.value !== '' && this.#price.dataset['automatic'] === 'false')) return;
    this.#price.value = price >= 1_000
      ? price.toFixed(1)
      : price >= 1 ? price.toFixed(4) : price.toFixed(8);
    this.#price.dataset['automatic'] = 'true';
    this.#renderSummary();
  }

  #setSide(side: 'buy' | 'sell'): void {
    this.#side = side;
    this.#buy.classList.toggle('active', side === 'buy');
    this.#sell.classList.toggle('active', side === 'sell');
    this.#button.classList.toggle('sell', side === 'sell');
    this.#renderSummary();
    this.#renderButton();
  }

  #renderTradingMode(): void {
    const market = this.#market;
    if (market === undefined) return;
    const isPerp = market.protocolKind === 'perp';
    const isReduceOnly = isPerp && this.#reduceOnly.checked;
    this.#planner.classList.toggle('hidden', !isPerp);
    this.#planner.classList.toggle('disabled', isReduceOnly);
    this.#reduceOnlyRow.classList.toggle('hidden', !isPerp);
    this.#zeroEquityRow.classList.toggle('hidden', !isPerp);
    this.#margin.disabled = !isPerp || isReduceOnly;
    this.#leverage.disabled = !isPerp || isReduceOnly;
    this.#size.readOnly = isPerp && !isReduceOnly;
    this.#totalLabel.textContent = isPerp ? '名义价值' : '预估金额';
    this.#buy.textContent = isPerp ? '做多' : '买入';
    this.#sell.textContent = isPerp ? '做空' : '卖出';
    for (const button of this.#leverageButtons) {
      const requested = Number(button.dataset['leverage']);
      button.disabled = !isPerp
        || isReduceOnly
        || (Number.isFinite(requested) && requested > this.#maxLeverage);
    }
    if (market.asset === null) {
      this.#notice.textContent = 'RWA 支持 1–1000×产品侧仓位规划；HIP-3 下单等待 Rust WASM 暴露 Asset ID 后启用。';
    } else if (isReduceOnly) {
      this.#notice.textContent = '只减仓模式按输入数量生成摘要；最终可减数量由账户持仓决定。';
    } else if (isPerp) {
      this.#notice.textContent = hasExtendedLeverage(market)
        ? '支持 1–1000×产品侧仓位规划；真实账户杠杆与清算规则仍受 Hyperliquid 协议限制。'
        : '保证金与杠杆仅用于下单规划；零权益价不等于 Hyperliquid 清算价。订单仍由 Rust Core 预处理。';
    } else {
      this.#notice.textContent = '示例只生成签名摘要，不会签名或广播订单。';
    }
  }

  #renderLeverage(): void {
    this.#leverageValue.textContent = `${this.#leverage.value}× / MAX ${String(this.#maxLeverage)}×`;
  }

  #renderButton(): void {
    const market = this.#market;
    if (market?.asset === null) {
      this.#button.textContent = 'RWA 行情模式';
      return;
    }
    if (market?.protocolKind === 'perp') {
      const action = this.#reduceOnly.checked
        ? `减仓${this.#side === 'buy' ? '买入' : '卖出'}`
        : this.#side === 'buy' ? '开多' : '开空';
      this.#button.textContent = `生成${action}摘要`;
      return;
    }
    this.#button.textContent = `生成${this.#side === 'buy' ? '买入' : '卖出'}摘要`;
  }

  #renderSummary(): void {
    const market = this.#market;
    if (market === undefined) return;

    if (market.protocolKind === 'perp' && !this.#reduceOnly.checked) {
      this.#perpPlan = calculatePerpRiskPreview({
        entryPrice: this.#price.value,
        leverage: Number(this.#leverage.value),
        margin: this.#margin.value,
        side: this.#side,
        sizeDecimals: market.sizeDecimals,
      });
      if (this.#perpPlan === null) {
        this.#size.value = '';
        this.#total.textContent = '-- USDC';
        this.#zeroEquityPrice.textContent = '--';
      } else {
        this.#size.value = this.#perpPlan.orderSize;
        this.#total.textContent = `${formatDecimalDisplay(this.#perpPlan.notional)} USDC`;
        this.#zeroEquityPrice.textContent = `${formatDecimalDisplay(this.#perpPlan.zeroEquityPrice)} USDC`;
      }
      this.#button.disabled = market.asset === null || this.#perpPlan === null;
      return;
    }

    this.#perpPlan = null;
    const orderValue = multiplyPositiveDecimals(this.#price.value, this.#size.value);
    this.#total.textContent = orderValue === null
      ? '-- USDC'
      : `${formatDecimalDisplay(orderValue)} USDC`;
    this.#zeroEquityPrice.textContent = market.protocolKind === 'perp' ? '按现有仓位决定' : '--';
    this.#button.disabled = market.asset === null || orderValue === null;
  }
}

function formatDecimalDisplay(value: string): string {
  const [whole = '0', fraction] = value.split('.');
  const grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/gu, ',');
  return fraction === undefined ? grouped : `${grouped}.${fraction}`;
}
