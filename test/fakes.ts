import type {
  HyperAxisWasmBindings,
  HyperAxisWasmNonceManager,
} from "../src/wasm/bindings.js";

export class FakeNonceManager implements HyperAxisWasmNonceManager {
  public lastIssued: string | undefined;
  public freed = false;

  public constructor(lastIssued?: null | string) {
    this.lastIssued = lastIssued ?? undefined;
  }

  public fastForward(lastIssued: string): void {
    this.lastIssued = lastIssued;
  }

  public free(): void {
    this.freed = true;
  }

  public next(nowMs: string): string {
    this.lastIssued = nowMs;
    return nowMs;
  }
}

export function createFakeBindings(
  overrides: Partial<HyperAxisWasmBindings> = {},
): HyperAxisWasmBindings {
  const defaults: HyperAxisWasmBindings = {
    WasmNonceManager: FakeNonceManager,
    build_exchange_http_request_json: () => httpRequestJson("signedAction"),
    build_info_http_request_json: () => httpRequestJson("info"),
    build_typed_info_http_request_json: () => httpRequestJson("info"),
    clear_logs: () => undefined,
    configure_logging: (enabled, level, capacity) =>
      JSON.stringify({ enabled, level, capacity }),
    drain_logs_json: () => JSON.stringify({ dropped: "0", records: [] }),
    finalize_order_json: () =>
      JSON.stringify({
        endpoint: "https://api.hyperliquid.xyz/exchange",
        requestJson: '{"action":{}}',
        recoveredSigner: "0x0000000000000000000000000000000000000001",
      }),
    finalize_cancel_json: () =>
      JSON.stringify({
        endpoint: "https://api.hyperliquid.xyz/exchange",
        requestJson: '{"action":{"type":"cancel"}}',
        recoveredSigner: "0x0000000000000000000000000000000000000001",
      }),
    finalize_update_leverage_json: () =>
      JSON.stringify({
        endpoint: "https://api.hyperliquid.xyz/exchange",
        requestJson: '{"action":{}}',
        recoveredSigner: "0x0000000000000000000000000000000000000001",
      }),
    finalize_usd_class_transfer_json: () =>
      JSON.stringify({
        endpoint: "https://api.hyperliquid.xyz/exchange",
        requestJson: '{"action":{}}',
        recoveredSigner: "0x0000000000000000000000000000000000000001",
      }),
    finalize_withdraw_json: () =>
      JSON.stringify({
        endpoint: "https://api.hyperliquid.xyz/exchange",
        requestJson: '{"action":{"type":"withdraw3"}}',
        recoveredSigner: "0x0000000000000000000000000000000000000001",
      }),
    finalize_approve_builder_fee_json: () =>
      JSON.stringify({
        endpoint: "https://api.hyperliquid.xyz/exchange",
        requestJson: '{"action":{"type":"approveBuilderFee"}}',
        recoveredSigner: "0x0000000000000000000000000000000000000001",
      }),
    host_failure_retry_advice: () => JSON.stringify("safeAfterBackoff"),
    normalize_decimal: (value) => value,
    parse_http_response_json: (requestKind, statusCode) =>
      JSON.stringify({
        requestKind,
        statusCode,
        kind: "success",
        retry: "never",
        payload: {},
        message: null,
      }),
    parse_perp_dexs_response_json: (body) => body,
    parse_perp_meta_and_asset_ctxs_response_json: (body) => body,
    parse_perp_meta_response_json: (body) => body,
    parse_perp_clearinghouse_state_response_json: (body) => body,
    parse_spot_clearinghouse_state_response_json: (body) => body,
    parse_websocket_message_json: () => JSON.stringify({ channel: "pong" }),
    prepare_info_query_json: () =>
      JSON.stringify({ queryType: "allMids", body: '{"type":"allMids"}' }),
    prepare_limit_order_json: () => preparedActionJson,
    prepare_cancel_json: () => preparedActionJson,
    prepare_update_leverage_json: () => preparedActionJson,
    prepare_usd_class_transfer_json: () => preparedUserActionJson,
    prepare_withdraw_json: () => preparedUserActionJson,
    prepare_approve_builder_fee_json: () => preparedUserActionJson,
    prepared_signing_digest: () => `0x${"11".repeat(32)}`,
    protocol_version: () => "0.3.3",
    snapshot_logs_json: () => JSON.stringify({ dropped: "0", records: [] }),
    validate_exchange_nonce: () => undefined,
    websocket_action_post_json: (id) => JSON.stringify({ id, type: "action" }),
    websocket_info_post_json: (id) => JSON.stringify({ id, type: "info" }),
    websocket_ping_json: () => '{"method":"ping"}',
    websocket_subscribe_json: () => '{"method":"subscribe"}',
    websocket_typed_info_post_json: (id) =>
      JSON.stringify({ id, type: "typedInfo" }),
    websocket_unsubscribe_json: () => '{"method":"unsubscribe"}',
    websocket_url: () => "wss://api.hyperliquid.xyz/ws",
  };
  return { ...defaults, ...overrides };
}

export const preparedActionJson = JSON.stringify({
  network: "mainnet",
  action: { type: "order", orders: [] },
  nonce: "1700000000000",
  vaultAddress: null,
  expiresAfter: null,
  actionJson: '{"type":"order","orders":[]}',
  messagePackHex: "0x01",
  actionHashHex: `0x${"22".repeat(32)}`,
  signingDigestHex: `0x${"11".repeat(32)}`,
});

export const preparedUserActionJson = JSON.stringify({
  network: "mainnet",
  action: {
    type: "usdClassTransfer",
    hyperliquidChain: "Mainnet",
    signatureChainId: "0x66eee",
    amount: "12.5",
    toPerp: true,
    nonce: "1700000000000",
  },
  nonce: "1700000000000",
  actionJson: '{"type":"usdClassTransfer"}',
  signingDigestHex: `0x${"33".repeat(32)}`,
});

function httpRequestJson(kind: "info" | "signedAction"): string {
  return JSON.stringify({
    kind,
    method: "POST",
    url: `https://api.hyperliquid.xyz/${kind === "info" ? "info" : "exchange"}`,
    headers: { "content-type": "application/json" },
    body: "{}",
  });
}
