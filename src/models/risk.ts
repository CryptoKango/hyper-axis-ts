import type { HyperAxisNetwork } from './common.js';

/** Exact input for preparing one perpetual leverage update in Rust. */
export interface HyperAxisUpdateLeverageRequest {
  readonly network: HyperAxisNetwork;
  readonly asset: number;
  /** Cross margin when true, isolated margin when false. */
  readonly isCross: boolean;
  readonly leverage: number;
  /** Current market `maxLeverage` returned by perpetual metadata. */
  readonly maxLeverage: number;
  readonly nonce: string;
  readonly vaultAddress?: string;
  readonly expiresAfter?: string;
}
