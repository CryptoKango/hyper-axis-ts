import { HyperAxisError } from '../error.js';
import {
  decodeFinalizedAction,
  decodeHttpRequest,
  decodeLogBatch,
  decodeLoggingConfig,
  decodeParsedHttpResponse,
  decodePreparedAction,
  decodePreparedUserAction,
  decodePreparedInfoQuery,
  decodeRetryAdvice,
  decodeWebSocketMessage,
} from '../internal/codec.js';
import {
  decodePerpAccountState,
  decodeSpotAccountState,
} from '../internal/account-codec.js';
import type {
  HyperAxisFinalizeUserActionRequest,
  HyperAxisPerpAccountState,
  HyperAxisPreparedUserAction,
  HyperAxisSpotAccountState,
  HyperAxisUsdClassTransferRequest,
} from '../models/accounts.js';
import type { HyperAxisNetwork } from '../models/common.js';
import { type JsonObject, type JsonValue, parseJson, stringifyJson } from '../models/json.js';
import type {
  HyperAxisAppliedLoggingConfig,
  HyperAxisLogBatch,
  HyperAxisLoggingConfig,
} from '../models/logging.js';
import type {
  HyperAxisFinalizedAction,
  HyperAxisFinalizeRequest,
  HyperAxisLimitOrderRequest,
  HyperAxisPreparedAction,
} from '../models/orders.js';
import type {
  HyperAxisHostFailureKind,
  HyperAxisHttpRequest,
  HyperAxisInfoQuery,
  HyperAxisParsedHttpResponse,
  HyperAxisPreparedInfoQuery,
  HyperAxisRequestKind,
  HyperAxisRetryAdvice,
  HyperAxisSubscription,
  HyperAxisWebSocketMessage,
} from '../models/transport.js';
import { HyperAxisNonceManager } from '../runtime/nonce-manager.js';
import { hyperAxisRustProtocolVersion } from '../version.js';
import type { HyperAxisWasmBindings } from '../wasm/bindings.js';
import type { HyperAxisWasmLoader } from '../wasm/loader.js';

const UINT8_MAX = 255;
const UINT16_MAX = 65_535;
const UINT32_MAX = 4_294_967_295;
const MAX_LOG_CAPACITY = 10_000;
const initializationByLoader = new WeakMap<
  HyperAxisWasmLoader,
  Promise<HyperAxisClient>
>();

/** Stable, runtime-neutral TypeScript facade over HyperAxis Rust WASM. */
export class HyperAxisClient {
  readonly #wasm: HyperAxisWasmBindings;
  public readonly protocolVersion: string;

  private constructor(wasm: HyperAxisWasmBindings, protocolVersion: string) {
    this.#wasm = wasm;
    this.protocolVersion = protocolVersion;
  }

  /** Loads Rust WASM once for a given loader and checks protocol compatibility. */
  public static initialize(loader: HyperAxisWasmLoader): Promise<HyperAxisClient> {
    const existing = initializationByLoader.get(loader);
    if (existing !== undefined) return existing;
    const initialization = HyperAxisClient.#initialize(loader);
    initializationByLoader.set(loader, initialization);
    return initialization;
  }

  static async #initialize(loader: HyperAxisWasmLoader): Promise<HyperAxisClient> {
    let wasm: HyperAxisWasmBindings;
    try {
      wasm = await loader();
    } catch (error: unknown) {
      if (error instanceof HyperAxisError) throw error;
      throw bridgeError('initialize', error);
    }

    let protocolVersion: string;
    try {
      protocolVersion = wasm.protocol_version();
    } catch (error: unknown) {
      throw bridgeError('protocolVersion', error);
    }
    if (protocolVersion !== hyperAxisRustProtocolVersion) {
      throw new HyperAxisError({
        code: 'incompatibleVersion',
        message: `Expected HyperAxis Rust ${hyperAxisRustProtocolVersion}, received ${protocolVersion}.`,
        operation: 'protocolVersion',
      });
    }
    return new HyperAxisClient(wasm, protocolVersion);
  }

  /** Canonicalizes a protocol decimal without converting through JS Number. */
  public normalizeDecimal(value: string): string {
    return this.#invoke('normalizeDecimal', () => this.#wasm.normalize_decimal(value));
  }

  /** Creates an independent signer-local monotonic nonce manager. */
  public createNonceManager(lastIssued?: string): HyperAxisNonceManager {
    return this.#invoke('createNonceManager', () => {
      const inner = new this.#wasm.WasmNonceManager(lastIssued ?? null);
      return new HyperAxisNonceManager(inner);
    });
  }

  /** Checks the Hyperliquid exchange nonce time window in Rust Core. */
  public validateExchangeNonce(nonce: string, nowMs: string): void {
    this.#invoke('validateExchangeNonce', () => {
      this.#wasm.validate_exchange_nonce(nonce, nowMs);
    });
  }

  /** Enables or disables Rust's sanitized in-memory diagnostic ring buffer. */
  public configureLogging(
    config: HyperAxisLoggingConfig = {},
  ): HyperAxisAppliedLoggingConfig {
    const capacity = config.capacity ?? 500;
    requireIntegerInRange(capacity, 1, MAX_LOG_CAPACITY, 'capacity');
    return this.#invoke('configureLogging', () =>
      decodeLoggingConfig(
        this.#wasm.configure_logging(
          config.enabled ?? false,
          config.level ?? 'info',
          capacity,
        ),
      ),
    );
  }

  /** Reads retained logs without removing them. */
  public snapshotLogs(): HyperAxisLogBatch {
    return this.#invoke('snapshotLogs', () =>
      decodeLogBatch(this.#wasm.snapshot_logs_json(), 'snapshotLogs'),
    );
  }

  /** Atomically reads and removes retained logs. */
  public drainLogs(): HyperAxisLogBatch {
    return this.#invoke('drainLogs', () =>
      decodeLogBatch(this.#wasm.drain_logs_json(), 'drainLogs'),
    );
  }

  /** Clears retained logs and the dropped-record counter. */
  public clearLogs(): void {
    this.#invoke('clearLogs', () => {
      this.#wasm.clear_logs();
    });
  }

  /** Validates and prepares one limit order for host-wallet signing. */
  public prepareLimitOrder(request: HyperAxisLimitOrderRequest): HyperAxisPreparedAction {
    requireIntegerInRange(request.asset, 0, UINT32_MAX, 'asset');
    requireIntegerInRange(request.sizeDecimals, 0, UINT8_MAX, 'sizeDecimals');
    return this.#invoke('prepareLimitOrder', () =>
      decodePreparedAction(
        this.#wasm.prepare_limit_order_json(
          request.network,
          request.asset,
          request.marketKind,
          request.sizeDecimals,
          request.side,
          request.limitPrice,
          request.size,
          request.reduceOnly ?? false,
          request.timeInForce ?? 'Gtc',
          request.nonce,
          request.vaultAddress ?? null,
          request.expiresAfter ?? null,
        ),
      ),
    );
  }

  /** Recomputes the signing digest from the opaque Rust prepared artifact. */
  public preparedSigningDigest(prepared: HyperAxisPreparedAction): string {
    return this.#invoke('preparedSigningDigest', () =>
      this.#wasm.prepared_signing_digest(prepared.opaqueJson),
    );
  }

  /** Verifies the wallet signature and finalizes the exchange request in Rust. */
  public finalizeOrder(request: HyperAxisFinalizeRequest): HyperAxisFinalizedAction {
    return this.#invoke('finalizeOrder', () =>
      decodeFinalizedAction(
        this.#wasm.finalize_order_json(
          request.prepared.opaqueJson,
          request.signature.r,
          request.signature.s,
          request.signature.v,
          request.expectedSigner,
        ),
      ),
    );
  }

  /** Prepares an exact USDC transfer between spot and perpetual balances. */
  public prepareUsdClassTransfer(
    request: HyperAxisUsdClassTransferRequest,
  ): HyperAxisPreparedUserAction {
    const wireRequest: JsonObject = {
      network: request.network,
      amount: request.amount,
      toPerp: request.toPerp,
      subAccount: request.subAccount ?? null,
      nonce: request.nonce,
    };
    return this.#invoke('prepareUsdClassTransfer', () =>
      decodePreparedUserAction(
        this.#wasm.prepare_usd_class_transfer_json(
          stringifyJson(wireRequest, 'prepareUsdClassTransfer'),
        ),
      ),
    );
  }

  /** Verifies and finalizes a prepared spot/perpetual USDC transfer. */
  public finalizeUsdClassTransfer(
    request: HyperAxisFinalizeUserActionRequest,
  ): HyperAxisFinalizedAction {
    return this.#invoke('finalizeUsdClassTransfer', () =>
      decodeFinalizedAction(
        this.#wasm.finalize_usd_class_transfer_json(
          request.prepared.opaqueJson,
          request.signature.r,
          request.signature.s,
          request.signature.v,
          request.expectedSigner,
        ),
      ),
    );
  }

  /** Returns the official WebSocket endpoint for a network. */
  public websocketUrl(network: HyperAxisNetwork): string {
    return this.#invoke('websocketUrl', () => this.#wasm.websocket_url(network));
  }

  /** Builds a runtime-neutral POST /info request from an already canonical body. */
  public buildInfoHttpRequest(network: HyperAxisNetwork, body: string): HyperAxisHttpRequest {
    return this.#invoke('buildInfoHttpRequest', () =>
      decodeHttpRequest(
        this.#wasm.build_info_http_request_json(network, body),
        'buildInfoHttpRequest',
      ),
    );
  }

  /** Validates a typed Info query and returns its canonical wire body. */
  public prepareInfoQuery(query: HyperAxisInfoQuery): HyperAxisPreparedInfoQuery {
    return this.#invoke('prepareInfoQuery', () =>
      decodePreparedInfoQuery(
        this.#wasm.prepare_info_query_json(stringifyJson(query, 'prepareInfoQuery')),
      ),
    );
  }

  /** Builds a runtime-neutral POST /info request from a typed query. */
  public buildTypedInfoHttpRequest(
    network: HyperAxisNetwork,
    query: HyperAxisInfoQuery,
  ): HyperAxisHttpRequest {
    return this.#invoke('buildTypedInfoHttpRequest', () =>
      decodeHttpRequest(
        this.#wasm.build_typed_info_http_request_json(
          network,
          stringifyJson(query, 'buildTypedInfoHttpRequest'),
        ),
        'buildTypedInfoHttpRequest',
      ),
    );
  }

  /** Builds a runtime-neutral POST /exchange request from a finalized action. */
  public buildExchangeHttpRequest(finalized: HyperAxisFinalizedAction): HyperAxisHttpRequest {
    return this.#invoke('buildExchangeHttpRequest', () =>
      decodeHttpRequest(
        this.#wasm.build_exchange_http_request_json(finalized.opaqueJson),
        'buildExchangeHttpRequest',
      ),
    );
  }

  /** Parses and classifies an HTTP response using Rust protocol rules. */
  public parseHttpResponse(
    requestKind: HyperAxisRequestKind,
    statusCode: number,
    body: string,
  ): HyperAxisParsedHttpResponse {
    requireIntegerInRange(statusCode, 0, UINT16_MAX, 'statusCode');
    return this.#invoke('parseHttpResponse', () =>
      decodeParsedHttpResponse(
        this.#wasm.parse_http_response_json(requestKind, statusCode, body),
      ),
    );
  }

  /** Validates a `perpDexs` response with the pinned Rust protocol schema. */
  public parsePerpDexsResponse(body: string): JsonValue {
    return this.#invoke('parsePerpDexsResponse', () =>
      parseJson(this.#wasm.parse_perp_dexs_response_json(body), 'parsePerpDexsResponse'),
    );
  }

  /** Validates a native or HIP-3 `meta` response with Rust Core. */
  public parsePerpMetaResponse(body: string): JsonValue {
    return this.#invoke('parsePerpMetaResponse', () =>
      parseJson(this.#wasm.parse_perp_meta_response_json(body), 'parsePerpMetaResponse'),
    );
  }

  /** Validates an aligned native or HIP-3 `metaAndAssetCtxs` response. */
  public parsePerpMetaAndAssetCtxsResponse(body: string): JsonValue {
    return this.#invoke('parsePerpMetaAndAssetCtxsResponse', () =>
      parseJson(
        this.#wasm.parse_perp_meta_and_asset_ctxs_response_json(body),
        'parsePerpMetaAndAssetCtxsResponse',
      ),
    );
  }

  /** Validates and decodes a perpetual `clearinghouseState` response. */
  public parsePerpAccountState(body: string): HyperAxisPerpAccountState {
    return this.#invoke('parsePerpAccountState', () =>
      decodePerpAccountState(
        this.#wasm.parse_perp_clearinghouse_state_response_json(body),
      ),
    );
  }

  /** Validates and decodes a spot `spotClearinghouseState` response. */
  public parseSpotAccountState(body: string): HyperAxisSpotAccountState {
    return this.#invoke('parseSpotAccountState', () =>
      decodeSpotAccountState(
        this.#wasm.parse_spot_clearinghouse_state_response_json(body),
      ),
    );
  }

  /** Returns retry guidance after a host-network failure. */
  public hostFailureRetryAdvice(
    requestKind: HyperAxisRequestKind,
    failure: HyperAxisHostFailureKind,
  ): HyperAxisRetryAdvice {
    return this.#invoke('hostFailureRetryAdvice', () =>
      decodeRetryAdvice(this.#wasm.host_failure_retry_advice(requestKind, failure)),
    );
  }

  public websocketSubscribe(subscription: HyperAxisSubscription): string {
    return this.#invoke('websocketSubscribe', () =>
      this.#wasm.websocket_subscribe_json(
        stringifyJson(subscription, 'websocketSubscribe'),
      ),
    );
  }

  public websocketUnsubscribe(subscription: HyperAxisSubscription): string {
    return this.#invoke('websocketUnsubscribe', () =>
      this.#wasm.websocket_unsubscribe_json(
        stringifyJson(subscription, 'websocketUnsubscribe'),
      ),
    );
  }

  public websocketPing(): string {
    return this.#invoke('websocketPing', () => this.#wasm.websocket_ping_json());
  }

  public websocketInfoPost(id: number, payload: JsonObject): string {
    requireIntegerInRange(id, 0, UINT32_MAX, 'id');
    return this.#invoke('websocketInfoPost', () =>
      this.#wasm.websocket_info_post_json(
        id,
        stringifyJson(payload, 'websocketInfoPost'),
      ),
    );
  }

  public websocketTypedInfoPost(id: number, query: HyperAxisInfoQuery): string {
    requireIntegerInRange(id, 0, UINT32_MAX, 'id');
    return this.#invoke('websocketTypedInfoPost', () =>
      this.#wasm.websocket_typed_info_post_json(
        id,
        stringifyJson(query, 'websocketTypedInfoPost'),
      ),
    );
  }

  public websocketActionPost(id: number, finalized: HyperAxisFinalizedAction): string {
    requireIntegerInRange(id, 0, UINT32_MAX, 'id');
    return this.#invoke('websocketActionPost', () =>
      this.#wasm.websocket_action_post_json(id, finalized.opaqueJson),
    );
  }

  public parseWebSocketMessage(message: string): HyperAxisWebSocketMessage {
    return this.#invoke('parseWebSocketMessage', () =>
      decodeWebSocketMessage(this.#wasm.parse_websocket_message_json(message)),
    );
  }

  #invoke<T>(operation: string, invoke: () => T): T {
    try {
      return invoke();
    } catch (error: unknown) {
      if (error instanceof HyperAxisError) throw error;
      throw bridgeError(operation, error);
    }
  }
}

function requireIntegerInRange(
  value: number,
  minimum: number,
  maximum: number,
  field: string,
): void {
  if (!Number.isSafeInteger(value) || value < minimum || value > maximum) {
    throw new HyperAxisError({
      code: 'invalidArgument',
      message: `${field} must be an integer between ${String(minimum)} and ${String(maximum)}.`,
      operation: 'validateArgument',
    });
  }
}

function bridgeError(operation: string, cause: unknown): HyperAxisError {
  return new HyperAxisError({
    code: 'bridgeFailure',
    message: `HyperAxis operation failed: ${operation}.`,
    operation,
    cause,
  });
}
