import type { HyperAxisNetwork, HyperAxisSignature } from "./common.js";
import type { JsonObject } from "./json.js";

/** Aggregate margin totals returned for a perpetual account. */
export interface HyperAxisPerpMarginSummary {
  readonly accountValue: string;
  readonly totalMarginUsed: string;
  readonly totalNtlPos: string;
  readonly totalRawUsd: string;
}

/** Funding totals attached to one perpetual position. */
export interface HyperAxisPerpCumulativeFunding {
  readonly allTime: string;
  readonly sinceChange: string;
  readonly sinceOpen: string;
}

/** Cross or isolated leverage configuration. */
export interface HyperAxisPerpLeverage {
  readonly type: string;
  readonly value: number;
  readonly rawUsd: null | string;
}

/** One open perpetual position. Exact decimal values remain strings. */
export interface HyperAxisPerpPosition {
  readonly coin: string;
  readonly cumFunding: HyperAxisPerpCumulativeFunding;
  readonly entryPx: null | string;
  readonly leverage: HyperAxisPerpLeverage;
  readonly liquidationPx: null | string;
  readonly marginUsed: string;
  readonly maxLeverage: number;
  readonly positionValue: string;
  readonly returnOnEquity: string;
  readonly szi: string;
  readonly unrealizedPnl: string;
}

/** Position envelope returned by HyperCore. */
export interface HyperAxisPerpAssetPosition {
  readonly type: string;
  readonly position: HyperAxisPerpPosition;
}

/** Strongly typed response for `clearinghouseState`. */
export interface HyperAxisPerpAccountState {
  readonly assetPositions: readonly HyperAxisPerpAssetPosition[];
  readonly crossMaintenanceMarginUsed: string;
  readonly crossMarginSummary: HyperAxisPerpMarginSummary;
  readonly marginSummary: HyperAxisPerpMarginSummary;
  readonly time: string;
  readonly withdrawable: string;
}

/** One token balance returned by `spotClearinghouseState`. */
export interface HyperAxisSpotBalance {
  readonly coin: string;
  readonly token: number;
  readonly hold: string;
  readonly total: string;
  readonly entryNtl: string;
}

/** Strongly typed response for `spotClearinghouseState`. */
export interface HyperAxisSpotAccountState {
  readonly balances: readonly HyperAxisSpotBalance[];
}

/** Exact input for moving USDC between spot and perpetual balance classes. */
export interface HyperAxisUsdClassTransferRequest {
  readonly network: HyperAxisNetwork;
  readonly amount: string;
  /** `true` moves spot USDC to perps; `false` moves perps USDC to spot. */
  readonly toPerp: boolean;
  readonly subAccount?: string;
  readonly nonce: string;
}

/** Exact input for withdrawing USDC from Hyperliquid to an EVM address. */
export interface HyperAxisWithdrawRequest {
  readonly network: HyperAxisNetwork;
  readonly destination: string;
  readonly amount: string;
  readonly nonce: string;
}

/** Rust-validated user action awaiting a host-wallet signature. */
export interface HyperAxisPreparedUserAction {
  readonly network: HyperAxisNetwork;
  readonly action: JsonObject;
  readonly nonce: string;
  readonly actionJson: string;
  readonly signingDigestHex: string;
  /** Exact Rust JSON passed unchanged into the matching finalize operation. */
  readonly opaqueJson: string;
}

/** Input used to verify and finalize a user-signed action. */
export interface HyperAxisFinalizeUserActionRequest {
  readonly prepared: HyperAxisPreparedUserAction;
  readonly signature: HyperAxisSignature;
  readonly expectedSigner: string;
}
