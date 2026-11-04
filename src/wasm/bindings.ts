/** Minimal generated NonceManager surface wrapped by the stable SDK. */
export interface HyperAxisWasmNonceManager {
  readonly lastIssued: string | undefined;
  fastForward(lastIssued: string): void;
  free(): void;
  next(nowMs: string): string;
}

/** Constructor exported by wasm-bindgen. */
export type HyperAxisWasmNonceManagerConstructor = new (
  lastIssued?: null | string,
) => HyperAxisWasmNonceManager;

/**
 * Rust WASM functions currently consumed by the stable TypeScript facade.
 *
 * Generated bindings expose additional advanced actions. They remain internal
 * until their TypeScript request and response types are stabilized.
 */
export interface HyperAxisWasmBindings {
  readonly WasmNonceManager: HyperAxisWasmNonceManagerConstructor;
  build_exchange_http_request_json(finalizedJson: string): string;
  build_info_http_request_json(network: string, body: string): string;
  build_typed_info_http_request_json(
    network: string,
    queryJson: string,
  ): string;
  clear_logs(): void;
  configure_logging(enabled: boolean, level: string, capacity: number): string;
  drain_logs_json(): string;
  finalize_order_json(
    preparedJson: string,
    r: string,
    s: string,
    v: number,
    expectedSigner: string,
  ): string;
  finalize_cancel_json(
    preparedJson: string,
    r: string,
    s: string,
    v: number,
    expectedSigner: string,
  ): string;
  finalize_update_leverage_json(
    preparedJson: string,
    r: string,
    s: string,
    v: number,
    expectedSigner: string,
  ): string;
  finalize_usd_class_transfer_json(
    preparedJson: string,
    r: string,
    s: string,
    v: number,
    expectedSigner: string,
  ): string;
  finalize_withdraw_json(
    preparedJson: string,
    r: string,
    s: string,
    v: number,
    expectedSigner: string,
  ): string;
  host_failure_retry_advice(requestKind: string, failure: string): string;
  normalize_decimal(value: string): string;
  parse_http_response_json(
    requestKind: string,
    statusCode: number,
    body: string,
  ): string;
  parse_perp_dexs_response_json(body: string): string;
  parse_perp_meta_and_asset_ctxs_response_json(body: string): string;
  parse_perp_meta_response_json(body: string): string;
  parse_perp_clearinghouse_state_response_json(body: string): string;
  parse_spot_clearinghouse_state_response_json(body: string): string;
  parse_websocket_message_json(message: string): string;
  prepare_info_query_json(queryJson: string): string;
  prepare_limit_order_json(
    network: string,
    asset: number,
    marketKind: string,
    sizeDecimals: number,
    side: string,
    limitPrice: string,
    orderSize: string,
    reduceOnly: boolean,
    timeInForce: string,
    nonce: string,
    vaultAddress?: null | string,
    expiresAfter?: null | string,
  ): string;
  prepare_cancel_json(requestJson: string): string;
  prepare_update_leverage_json(requestJson: string): string;
  prepare_usd_class_transfer_json(requestJson: string): string;
  prepare_withdraw_json(requestJson: string): string;
  prepared_signing_digest(preparedJson: string): string;
  protocol_version(): string;
  snapshot_logs_json(): string;
  validate_exchange_nonce(nonce: string, nowMs: string): void;
  websocket_action_post_json(id: number, finalizedJson: string): string;
  websocket_info_post_json(id: number, payload: string): string;
  websocket_ping_json(): string;
  websocket_subscribe_json(subscriptionJson: string): string;
  websocket_typed_info_post_json(id: number, queryJson: string): string;
  websocket_unsubscribe_json(subscriptionJson: string): string;
  websocket_url(network: string): string;
}
