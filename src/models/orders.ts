import type { JsonObject } from "./json.js";
import type { HyperAxisNetwork, HyperAxisSignature } from "./common.js";

/** Market precision family expected by Rust Core. */
export type HyperAxisMarketKind = "perp" | "spot";

/** Limit-order time-in-force wire name. */
export type HyperAxisTimeInForce = "Alo" | "Gtc" | "Ioc";

/** Builder code attached to an order. Fee is expressed in tenths of a basis point. */
export interface HyperAxisBuilderFee {
  readonly address: string;
  readonly fee: number;
}

/** Exact input for preparing one limit order in Rust. */
export interface HyperAxisLimitOrderRequest {
  readonly network: HyperAxisNetwork;
  readonly asset: number;
  readonly marketKind: HyperAxisMarketKind;
  readonly sizeDecimals: number;
  readonly side: "buy" | "sell";
  readonly limitPrice: string;
  readonly size: string;
  readonly reduceOnly?: boolean;
  readonly timeInForce?: HyperAxisTimeInForce;
  readonly nonce: string;
  readonly vaultAddress?: string;
  readonly expiresAfter?: string;
  readonly builder?: HyperAxisBuilderFee;
}

/** One exchange order selected for cancellation by its exact OID. */
export interface HyperAxisCancelOrder {
  readonly asset: number;
  readonly orderId: string;
}

/** Exact input for preparing one or more order cancellations. */
export interface HyperAxisCancelRequest {
  readonly network: HyperAxisNetwork;
  readonly cancels: readonly HyperAxisCancelOrder[];
  readonly nonce: string;
  readonly vaultAddress?: string;
  readonly expiresAfter?: string;
}

/** Rust-validated action and signing artifacts treated as one opaque token. */
export interface HyperAxisPreparedAction {
  readonly network: HyperAxisNetwork;
  readonly action: JsonObject;
  readonly nonce: string;
  readonly vaultAddress: null | string;
  readonly expiresAfter: null | string;
  readonly actionJson: string;
  readonly messagePackHex: string;
  readonly actionHashHex: string;
  readonly signingDigestHex: string;
  /** Exact Rust JSON passed unchanged into the matching finalize operation. */
  readonly opaqueJson: string;
}

/** Input used to verify a wallet signature and finalize an action. */
export interface HyperAxisFinalizeRequest {
  readonly prepared: HyperAxisPreparedAction;
  readonly signature: HyperAxisSignature;
  readonly expectedSigner: string;
}

/** Final exchange request returned after Rust signature verification. */
export interface HyperAxisFinalizedAction {
  readonly endpoint: string;
  readonly requestJson: string;
  readonly recoveredSigner: string;
  /** Exact Rust JSON accepted by transport helpers. */
  readonly opaqueJson: string;
}
