import type { JsonObject, JsonValue } from './json.js';
import type { HyperAxisNetwork } from './common.js';

/** Endpoint family controlling retry safety. */
export type HyperAxisRequestKind = 'info' | 'signedAction';

/** Host networking failure category accepted by Rust retry classification. */
export type HyperAxisHostFailureKind =
  | 'cancelled'
  | 'connection'
  | 'dns'
  | 'other'
  | 'timeout'
  | 'tls';

/** Retry policy returned by Rust Core. */
export type HyperAxisRetryAdvice =
  | 'never'
  | 'reconcileBeforeRetry'
  | 'safeAfterBackoff';

/** Runtime-neutral HTTP request description. */
export interface HyperAxisHttpRequest {
  readonly kind: HyperAxisRequestKind;
  readonly method: 'POST';
  readonly url: string;
  readonly headers: Readonly<Record<string, string>>;
  readonly body: string;
}

/** Parsed and classified HTTP response. */
export interface HyperAxisParsedHttpResponse {
  readonly requestKind: HyperAxisRequestKind;
  readonly statusCode: number;
  readonly kind: string;
  readonly retry: HyperAxisRetryAdvice;
  readonly payload: JsonValue | null;
  readonly message: null | string;
}

/** Supported candle interval wire names. */
export type HyperAxisCandleInterval =
  | '1M'
  | '1d'
  | '1h'
  | '1m'
  | '1w'
  | '2h'
  | '3d'
  | '3m'
  | '4h'
  | '5m'
  | '8h'
  | '12h'
  | '15m'
  | '30m';

/** Order identifier accepted by the orderStatus Info query. */
export type HyperAxisOrderStatusSelector =
  | { readonly kind: 'cloid'; readonly cloid: string }
  | { readonly kind: 'oid'; readonly oid: string };

/**
 * Complete typed Info API request surface exposed by Rust Core v0.1.0.
 * Wide integers are decimal strings and become JSON numbers only inside Rust.
 */
export type HyperAxisInfoQuery =
  | { readonly type: 'allMids'; readonly dex: string }
  | { readonly type: 'candleSnapshot'; readonly coin: string; readonly interval: HyperAxisCandleInterval; readonly startTime: string; readonly endTime: string }
  | { readonly type: 'clearinghouseState'; readonly user: string; readonly dex: string }
  | { readonly type: 'delegations'; readonly user: string }
  | { readonly type: 'delegatorHistory'; readonly user: string }
  | { readonly type: 'delegatorRewards'; readonly user: string }
  | { readonly type: 'delegatorSummary'; readonly user: string }
  | { readonly type: 'extraAgents'; readonly user: string }
  | { readonly type: 'frontendOpenOrders'; readonly user: string; readonly dex: string }
  | { readonly type: 'fundingHistory'; readonly coin: string; readonly startTime: string; readonly endTime?: string }
  | { readonly type: 'historicalOrders'; readonly user: string }
  | { readonly type: 'l2Book'; readonly coin: string; readonly nSigFigs?: number; readonly mantissa?: number }
  | { readonly type: 'meta'; readonly dex: string }
  | { readonly type: 'metaAndAssetCtxs' }
  | { readonly type: 'openOrders'; readonly user: string; readonly dex: string }
  | { readonly type: 'orderStatus'; readonly user: string; readonly selector: HyperAxisOrderStatusSelector }
  | { readonly type: 'perpDeployAuctionStatus' }
  | { readonly type: 'perpDexs' }
  | { readonly type: 'portfolio'; readonly user: string }
  | { readonly type: 'referral'; readonly user: string }
  | { readonly type: 'spotClearinghouseState'; readonly user: string }
  | { readonly type: 'spotDeployState'; readonly user: string }
  | { readonly type: 'spotMeta' }
  | { readonly type: 'spotMetaAndAssetCtxs' }
  | { readonly type: 'subAccounts'; readonly user: string }
  | { readonly type: 'userAbstraction'; readonly user: string }
  | { readonly type: 'userDexAbstraction'; readonly user: string }
  | { readonly type: 'userFees'; readonly user: string }
  | { readonly type: 'userFills'; readonly user: string }
  | { readonly type: 'userFillsByTime'; readonly user: string; readonly startTime: string; readonly endTime?: string; readonly aggregateByTime: boolean }
  | { readonly type: 'userFunding'; readonly user: string; readonly startTime: string; readonly endTime?: string }
  | { readonly type: 'userNonFundingLedgerUpdates'; readonly user: string; readonly startTime: string; readonly endTime?: string }
  | { readonly type: 'userRateLimit'; readonly user: string }
  | { readonly type: 'userRole'; readonly user: string }
  | { readonly type: 'userToMultiSigSigners'; readonly user: string }
  | { readonly type: 'userTwapSliceFills'; readonly user: string }
  | { readonly type: 'userVaultEquities'; readonly user: string };

/** Canonical Info body and discriminator produced by Rust Core. */
export interface HyperAxisPreparedInfoQuery {
  readonly queryType: string;
  readonly body: string;
}

/** Complete WebSocket subscription surface exposed by Rust Core v0.1.0. */
export type HyperAxisSubscription =
  | { readonly type: 'activeAssetCtx'; readonly coin: string }
  | { readonly type: 'activeAssetData'; readonly user: string; readonly coin: string }
  | { readonly type: 'allDexsAssetCtxs' }
  | { readonly type: 'allDexsClearinghouseState'; readonly user: string }
  | { readonly type: 'allMids'; readonly dex?: string }
  | { readonly type: 'bbo'; readonly coin: string }
  | { readonly type: 'candle'; readonly coin: string; readonly interval: HyperAxisCandleInterval }
  | { readonly type: 'clearinghouseState'; readonly user: string; readonly dex: string }
  | { readonly type: 'fastAssetCtxs' }
  | { readonly type: 'l2Book'; readonly coin: string; readonly nSigFigs?: number; readonly mantissa?: number; readonly fast?: boolean }
  | { readonly type: 'notification'; readonly user: string }
  | { readonly type: 'openOrders'; readonly user: string; readonly dex: string }
  | { readonly type: 'orderUpdates'; readonly user: string }
  | { readonly type: 'outcomeMetaUpdates' }
  | { readonly type: 'spotState'; readonly user: string; readonly isPortfolioMargin?: boolean }
  | { readonly type: 'trades'; readonly coin: string }
  | { readonly type: 'twapStates'; readonly user: string; readonly dex: string }
  | { readonly type: 'userEvents'; readonly user: string }
  | { readonly type: 'userFills'; readonly user: string; readonly aggregateByTime?: boolean }
  | { readonly type: 'userFundings'; readonly user: string }
  | { readonly type: 'userNonFundingLedgerUpdates'; readonly user: string }
  | { readonly type: 'userTwapHistory'; readonly user: string }
  | { readonly type: 'userTwapSliceFills'; readonly user: string }
  | { readonly type: 'webData3'; readonly user: string };

/** Parsed WebSocket message returned by Rust Core. */
export type HyperAxisWebSocketMessage = JsonObject;

/** Options used by transport methods that route per network. */
export interface HyperAxisNetworkRequest {
  readonly network: HyperAxisNetwork;
}

