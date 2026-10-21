/* tslint:disable */
/* eslint-disable */

/**
 * Signer-local monotonic nonce source for browser clients.
 *
 * Create one instance per master account or API wallet. A signer may reuse
 * the same instance across its vaults and subaccounts.
 */
export class WasmNonceManager {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Advances the high-water mark without moving it backwards.
     *
     * # Errors
     *
     * Returns a JavaScript error when the value is not a `u64`.
     */
    fastForward(last_issued: string): void;
    /**
     * Creates a manager, optionally restoring the last issued nonce string.
     *
     * # Errors
     *
     * Returns a JavaScript error when the restored value is not a `u64`.
     */
    constructor(last_issued?: string | null);
    /**
     * Issues the next nonce as a decimal string for JavaScript integer safety.
     *
     * # Errors
     *
     * Returns a JavaScript error for invalid time or nonce exhaustion.
     */
    next(now_ms: string): string;
    /**
     * Returns the current high-water mark as a decimal string.
     */
    readonly lastIssued: string | undefined;
}

/**
 * Builds a runtime-neutral `POST /exchange` request from finalized JSON.
 *
 * # Errors
 *
 * Returns a JavaScript error for malformed or unsafe finalized artifacts.
 */
export function build_exchange_http_request_json(finalized_json: string): string;

/**
 * Builds a runtime-neutral `POST /info` request as JSON.
 *
 * The nested `body` string must be sent directly by the JavaScript host.
 *
 * # Errors
 *
 * Returns a JavaScript error when the network/body is invalid.
 */
export function build_info_http_request_json(network: string, body: string): string;

/**
 * Builds a runtime-neutral `POST /info` request from a typed query.
 *
 * # Errors
 *
 * Returns a JavaScript error for an unsupported network, malformed JSON, or
 * invalid query fields.
 */
export function build_typed_info_http_request_json(network: string, query_json: string): string;

/**
 * Clears retained diagnostics and the overflow counter.
 */
export function clear_logs(): void;

/**
 * Configures structured diagnostics for a browser client.
 *
 * Supported levels are `error`, `warn`, `info`, `debug`, and `trace`.
 * Logging starts disabled and must be explicitly enabled by the application.
 *
 * # Errors
 *
 * Returns a JavaScript error for an unsupported level, invalid capacity, or
 * JSON serialization failure.
 */
export function configure_logging(enabled: boolean, level: string, capacity: number): string;

/**
 * Returns and removes retained diagnostics as JSON.
 *
 * # Errors
 *
 * Returns a JavaScript error only if JSON serialization fails.
 */
export function drain_logs_json(): string;

/**
 * Verifies and finalizes legacy DEX-abstraction enablement for an agent.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid prepared JSON, signature, signer, or
 * modified artifacts.
 */
export function finalize_agent_enable_dex_abstraction_json(prepared_json: string, r: string, s: string, v: number, expected_signer: string): string;

/**
 * Verifies and finalizes an agent account-abstraction mode update.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid prepared JSON, signature, signer, or
 * modified artifacts.
 */
export function finalize_agent_set_abstraction_json(prepared_json: string, r: string, s: string, v: number, expected_signer: string): string;

/**
 * Verifies and finalizes an API wallet authorization.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid prepared JSON, signature, signer,
 * context mismatch, or modified artifacts.
 */
export function finalize_approve_agent_json(prepared_json: string, r: string, s: string, v: number, expected_signer: string): string;

/**
 * Verifies and finalizes a builder fee authorization.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid prepared JSON, signature, signer,
 * context mismatch, or modified artifacts.
 */
export function finalize_approve_builder_fee_json(prepared_json: string, r: string, s: string, v: number, expected_signer: string): string;

/**
 * Verifies and finalizes a batch-modify request.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid prepared JSON, signature, signer, or
 * modified artifacts.
 */
export function finalize_batch_modify_json(prepared_json: string, r: string, s: string, v: number, expected_signer: string): string;

/**
 * Verifies and finalizes a native-token staking deposit.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid prepared JSON, signature, signer,
 * context mismatch, or modified artifacts.
 */
export function finalize_c_deposit_json(prepared_json: string, r: string, s: string, v: number, expected_signer: string): string;

/**
 * Verifies and finalizes signer-node self-management.
 *
 * # Errors
 * Returns a JavaScript error for invalid prepared JSON, signature, or artifacts.
 */
export function finalize_c_signer_json(prepared_json: string, r: string, s: string, v: number, expected_signer: string): string;

/**
 * Verifies and finalizes a validator lifecycle action.
 *
 * # Errors
 * Returns a JavaScript error for invalid prepared JSON, signature, or artifacts.
 */
export function finalize_c_validator_json(prepared_json: string, r: string, s: string, v: number, expected_signer: string): string;

/**
 * Verifies and finalizes a native-token staking withdrawal.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid prepared JSON, signature, signer,
 * context mismatch, or modified artifacts.
 */
export function finalize_c_withdraw_json(prepared_json: string, r: string, s: string, v: number, expected_signer: string): string;

/**
 * Verifies and finalizes a cancellation-by-Cloid request.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid prepared JSON, signature, signer, or
 * modified artifacts.
 */
export function finalize_cancel_by_cloid_json(prepared_json: string, r: string, s: string, v: number, expected_signer: string): string;

/**
 * Verifies and finalizes a cancellation-by-OID request.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid prepared JSON, signature, signer, or
 * modified artifacts.
 */
export function finalize_cancel_json(prepared_json: string, r: string, s: string, v: number, expected_signer: string): string;

/**
 * Verifies and finalizes conversion to a threshold multi-signature user.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid prepared JSON, signature, signer,
 * context mismatch, or modified artifacts.
 */
export function finalize_convert_to_multi_sig_user_json(prepared_json: string, r: string, s: string, v: number, expected_signer: string): string;

/**
 * Verifies and finalizes named-subaccount creation.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid prepared JSON, signature, signer, or
 * modified artifacts.
 */
export function finalize_create_sub_account_json(prepared_json: string, r: string, s: string, v: number, expected_signer: string): string;

/**
 * Verifies and finalizes an EVM large-block preference update.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid prepared JSON, signature, signer, or
 * modified artifacts.
 */
export function finalize_evm_user_modify_json(prepared_json: string, r: string, s: string, v: number, expected_signer: string): string;

/**
 * Verifies and finalizes a gossip priority bid.
 *
 * # Errors
 * Returns a JavaScript error for invalid prepared JSON, signature, or artifacts.
 */
export function finalize_gossip_priority_bid_json(prepared_json: string, r: string, s: string, v: number, expected_signer: string): string;

/**
 * Verifies the outer signer and builds the final multi-signature exchange
 * request.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid prepared JSON, signature, outer
 * signer mismatch, modified artifacts, encoding, or serialization failure.
 */
export function finalize_multi_sig_json(prepared_json: string, r: string, s: string, v: number, expected_outer_signer: string): string;

/**
 * Verifies and finalizes an empty L1 action.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid prepared JSON, signature, signer, or
 * modified artifacts.
 */
export function finalize_noop_json(prepared_json: string, r: string, s: string, v: number, expected_signer: string): string;

/**
 * Verifies a platform signature and returns a finalized exchange request.
 *
 * # Errors
 *
 * Returns a JavaScript error when prepared JSON, signature components, or the
 * expected signer are invalid, or when integrity and recovery checks fail.
 */
export function finalize_order_json(prepared_json: string, r: string, s: string, v: number, expected_signer: string): string;

/**
 * Verifies and finalizes a perpetual deployer action.
 *
 * # Errors
 * Returns a JavaScript error for invalid prepared JSON, signature, or artifacts.
 */
export function finalize_perp_deploy_json(prepared_json: string, r: string, s: string, v: number, expected_signer: string): string;

/**
 * Verifies and finalizes a dead man's switch request.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid prepared JSON, signature, signer, or
 * modified artifacts.
 */
export function finalize_schedule_cancel_json(prepared_json: string, r: string, s: string, v: number, expected_signer: string): string;

/**
 * Verifies and finalizes a generalized asset transfer.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid prepared JSON, signature, signer,
 * context mismatch, or modified artifacts.
 */
export function finalize_send_asset_json(prepared_json: string, r: string, s: string, v: number, expected_signer: string): string;

/**
 * Verifies and finalizes referral-code registration.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid prepared JSON, signature, signer, or
 * modified artifacts.
 */
export function finalize_set_referrer_json(prepared_json: string, r: string, s: string, v: number, expected_signer: string): string;

/**
 * Verifies and finalizes a Spot deployer action.
 *
 * # Errors
 * Returns a JavaScript error for invalid prepared JSON, signature, or artifacts.
 */
export function finalize_spot_deploy_json(prepared_json: string, r: string, s: string, v: number, expected_signer: string): string;

/**
 * Verifies and finalizes a Core spot asset transfer.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid prepared JSON, signature, signer,
 * context mismatch, or modified artifacts.
 */
export function finalize_spot_send_json(prepared_json: string, r: string, s: string, v: number, expected_signer: string): string;

/**
 * Verifies and finalizes a spot-token subaccount transfer.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid prepared JSON, signature, signer, or
 * modified artifacts.
 */
export function finalize_sub_account_spot_transfer_json(prepared_json: string, r: string, s: string, v: number, expected_signer: string): string;

/**
 * Verifies and finalizes a USD subaccount transfer.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid prepared JSON, signature, signer, or
 * modified artifacts.
 */
export function finalize_sub_account_transfer_json(prepared_json: string, r: string, s: string, v: number, expected_signer: string): string;

/**
 * Verifies and finalizes a validator delegation or undelegation.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid prepared JSON, signature, signer,
 * context mismatch, or modified artifacts.
 */
export function finalize_token_delegate_json(prepared_json: string, r: string, s: string, v: number, expected_signer: string): string;

/**
 * Verifies and finalizes an isolated-only margin top-up.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid prepared JSON, signature, signer, or
 * modified artifacts.
 */
export function finalize_top_up_isolated_only_margin_json(prepared_json: string, r: string, s: string, v: number, expected_signer: string): string;

/**
 * Verifies and finalizes a native TWAP cancellation.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid prepared JSON, signature, signer, or
 * modified artifacts.
 */
export function finalize_twap_cancel_json(prepared_json: string, r: string, s: string, v: number, expected_signer: string): string;

/**
 * Verifies and finalizes a native TWAP order.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid prepared JSON, signature, signer, or
 * modified artifacts.
 */
export function finalize_twap_order_json(prepared_json: string, r: string, s: string, v: number, expected_signer: string): string;

/**
 * Verifies and finalizes an isolated-margin delta.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid prepared JSON, signature, signer, or
 * modified artifacts.
 */
export function finalize_update_isolated_margin_json(prepared_json: string, r: string, s: string, v: number, expected_signer: string): string;

/**
 * Verifies and finalizes a leverage update.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid prepared JSON, signature, signer, or
 * modified artifacts.
 */
export function finalize_update_leverage_json(prepared_json: string, r: string, s: string, v: number, expected_signer: string): string;

/**
 * Verifies and finalizes a spot/perp USD class transfer.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid prepared JSON, signature, signer,
 * context mismatch, or modified artifacts.
 */
export function finalize_usd_class_transfer_json(prepared_json: string, r: string, s: string, v: number, expected_signer: string): string;

/**
 * Verifies and finalizes a Core USDC transfer.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid prepared JSON, signature, signer,
 * context mismatch, or modified artifacts.
 */
export function finalize_usd_send_json(prepared_json: string, r: string, s: string, v: number, expected_signer: string): string;

/**
 * Verifies and finalizes the legacy user DEX-abstraction toggle.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid prepared JSON, signature, signer,
 * context mismatch, or modified artifacts.
 */
export function finalize_user_dex_abstraction_json(prepared_json: string, r: string, s: string, v: number, expected_signer: string): string;

/**
 * Verifies and finalizes an account-abstraction mode update.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid prepared JSON, signature, signer,
 * context mismatch, or modified artifacts.
 */
export function finalize_user_set_abstraction_json(prepared_json: string, r: string, s: string, v: number, expected_signer: string): string;

/**
 * Verifies and finalizes a vault USD transfer.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid prepared JSON, signature, signer, or
 * modified artifacts.
 */
export function finalize_vault_transfer_json(prepared_json: string, r: string, s: string, v: number, expected_signer: string): string;

/**
 * Verifies and finalizes a bridge withdrawal.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid prepared JSON, signature, signer,
 * context mismatch, or modified artifacts.
 */
export function finalize_withdraw_json(prepared_json: string, r: string, s: string, v: number, expected_signer: string): string;

/**
 * Returns retry guidance for a host networking failure.
 *
 * # Errors
 *
 * Returns a JavaScript error for unsupported request/failure names or an
 * unexpected serialization failure.
 */
export function host_failure_retry_advice(request_kind: string, failure: string): string;

/**
 * Canonicalizes an exact decimal without JavaScript `Number` conversion.
 *
 * # Errors
 *
 * Returns a JavaScript error when `value` is not a supported protocol decimal.
 */
export function normalize_decimal(value: string): string;

/**
 * Parses and classifies an HTTP response as stable JSON.
 *
 * # Errors
 *
 * Returns a JavaScript error for an unsupported request kind or serialization
 * failure.
 */
export function parse_http_response_json(request_kind: string, status_code: number, body: string): string;

/**
 * Parses one inbound WebSocket message into stable JSON.
 *
 * # Errors
 *
 * Returns a JavaScript error for malformed messages or serialization failure.
 */
export function parse_websocket_message_json(message: string): string;

/**
 * Prepares legacy DEX-abstraction enablement for an agent.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid JSON, address, nonce, or signing
 * context.
 */
export function prepare_agent_enable_dex_abstraction_json(request_json: string): string;

/**
 * Prepares an agent account-abstraction mode update.
 *
 * Accepted `abstraction` wire values are `i`, `u`, and `p`.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid JSON, mode, address, nonce, or
 * signing context.
 */
export function prepare_agent_set_abstraction_json(request_json: string): string;

/**
 * Prepares an API wallet authorization from strict camelCase JSON.
 *
 * `HyperAxis` receives only the pre-generated API wallet address and never its
 * private key. Nonce must be a decimal string.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid JSON, address, nonce, or
 * serialization.
 */
export function prepare_approve_agent_json(request_json: string): string;

/**
 * Prepares a builder fee authorization from strict camelCase JSON.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid JSON, builder address, exact percent
 * string, nonce, or serialization.
 */
export function prepare_approve_builder_fee_json(request_json: string): string;

/**
 * Prepares a batch of complete order replacements from strict camelCase JSON.
 *
 * An `oid` selector is either a decimal string or a 128-bit Cloid string.
 *
 * # Errors
 *
 * Returns a JavaScript error for malformed JSON or any failed protocol rule.
 */
export function prepare_batch_modify_json(request_json: string): string;

/**
 * Prepares an atomic limit-order batch from strict camelCase JSON.
 *
 * All `u64` values, including `nonce` and `expiresAfter`, must be decimal
 * strings. OIDs are also strings; asset IDs and builder fees remain numbers.
 *
 * # Errors
 *
 * Returns a JavaScript error for malformed JSON or any failed protocol rule.
 */
export function prepare_batch_orders_json(request_json: string): string;

/**
 * Prepares a native-token staking deposit from strict camelCase JSON.
 *
 * `wei` and `nonce` must be unsigned decimal strings. The returned prepared
 * JSON is an opaque integrity token; use `prepared_signing_digest` to read the
 * digest without parsing and rewriting that token in JavaScript.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid JSON, zero amounts, nonce, or
 * serialization.
 */
export function prepare_c_deposit_json(request_json: string): string;

/**
 * Prepares signer-node jail or unjail self-management from JSON.
 *
 * # Errors
 * Returns a JavaScript error for invalid JSON or signing context.
 */
export function prepare_c_signer_json(request_json: string): string;

/**
 * Prepares a consensus validator profile update from JSON.
 *
 * # Errors
 * Returns a JavaScript error for invalid JSON, profile data, or signing context.
 */
export function prepare_c_validator_change_profile_json(request_json: string): string;

/**
 * Prepares consensus validator registration from JSON.
 *
 * # Errors
 * Returns a JavaScript error for invalid JSON, profile data, or signing context.
 */
export function prepare_c_validator_register_json(request_json: string): string;

/**
 * Prepares consensus validator unregistration from JSON.
 *
 * # Errors
 * Returns a JavaScript error for invalid JSON or signing context.
 */
export function prepare_c_validator_unregister_json(request_json: string): string;

/**
 * Prepares a native-token staking withdrawal from strict camelCase JSON.
 *
 * `wei` and `nonce` must be unsigned decimal strings. The returned prepared
 * JSON must be passed unchanged to `finalize_c_withdraw_json`.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid JSON, zero amounts, nonce, or
 * serialization.
 */
export function prepare_c_withdraw_json(request_json: string): string;

/**
 * Prepares a cancellation batch by 128-bit Cloid from strict camelCase JSON.
 *
 * # Errors
 *
 * Returns a JavaScript error for malformed JSON or any failed protocol rule.
 */
export function prepare_cancel_by_cloid_json(request_json: string): string;

/**
 * Prepares a cancellation batch by exchange OID from strict camelCase JSON.
 *
 * # Errors
 *
 * Returns a JavaScript error for malformed JSON or any failed protocol rule.
 */
export function prepare_cancel_json(request_json: string): string;

/**
 * Prepares conversion to a threshold multi-signature user from strict JSON.
 *
 * Rust parses and sorts `authorizedUsers`, rejects duplicates, and validates
 * `threshold` before producing the signing digest.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid JSON, addresses, threshold, nonce,
 * or serialization.
 */
export function prepare_convert_to_multi_sig_user_json(request_json: string): string;

/**
 * Prepares named-subaccount creation from strict camelCase JSON.
 *
 * `nonce` and optional `expiresAfter` must be unsigned decimal strings.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid names, integer strings, or signing
 * context.
 */
export function prepare_create_sub_account_json(request_json: string): string;

/**
 * Prepares an EVM large-block preference update from strict camelCase JSON.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid JSON, nonce, or signing context.
 */
export function prepare_evm_user_modify_json(request_json: string): string;

/**
 * Prepares a gossip priority gas bid from JSON.
 *
 * # Errors
 * Returns a JavaScript error for invalid JSON, bid data, or signing context.
 */
export function prepare_gossip_priority_bid_json(request_json: string): string;

/**
 * Validates a typed Info query and returns its canonical wire body.
 *
 * Timestamps and OIDs in `query_json` must be decimal strings.
 *
 * # Errors
 *
 * Returns a JavaScript error for malformed JSON or invalid query fields.
 */
export function prepare_info_query_json(query_json: string): string;

/**
 * Prepares a limit order and returns the action and signing artifacts as JSON.
 *
 * Nonce and expiry use strings so JavaScript never converts 64-bit integers
 * through its lossy `Number` representation.
 *
 * # Errors
 *
 * Returns a JavaScript error for unsupported enum values, invalid integers,
 * precision violations, or serialization failures.
 */
export function prepare_limit_order_json(network: string, asset: number, market_kind: string, sz_decimals: number, side: string, limit_price: string, order_size: string, reduce_only: boolean, time_in_force: string, nonce: string, vault_address?: string | null, expires_after?: string | null): string;

/**
 * Produces the authorized-user digest for legacy agent abstraction.
 *
 * # Errors
 * Returns a JavaScript error for malformed JSON, modified artifacts, or addresses.
 */
export function prepare_multi_sig_agent_enable_dex_abstraction_payload_json(prepared_json: string, multi_sig_user: string, outer_signer: string): string;

/**
 * Produces the authorized-user digest for an agent abstraction update.
 *
 * # Errors
 * Returns a JavaScript error for malformed JSON, modified artifacts, or addresses.
 */
export function prepare_multi_sig_agent_set_abstraction_payload_json(prepared_json: string, multi_sig_user: string, outer_signer: string): string;

/**
 * Produces the authorized-user digest for prepared API-wallet approval.
 *
 * # Errors
 *
 * Returns a JavaScript error for malformed JSON, modified artifacts, or addresses.
 */
export function prepare_multi_sig_approve_agent_payload_json(prepared_json: string, multi_sig_user: string, outer_signer: string): string;

/**
 * Produces the authorized-user digest for prepared builder-fee approval.
 *
 * # Errors
 *
 * Returns a JavaScript error for malformed JSON, modified artifacts, or addresses.
 */
export function prepare_multi_sig_approve_builder_fee_payload_json(prepared_json: string, multi_sig_user: string, outer_signer: string): string;

/**
 * Produces the authorized-user digest for a prepared batch modification.
 *
 * # Errors
 *
 * Returns a JavaScript error for malformed JSON, modified artifacts,
 * addresses, or encoding failure.
 */
export function prepare_multi_sig_batch_modify_payload_json(prepared_json: string, multi_sig_user: string, outer_signer: string): string;

/**
 * Produces the authorized-user digest for a prepared staking deposit.
 *
 * # Errors
 *
 * Returns a JavaScript error for malformed JSON, modified artifacts, or addresses.
 */
export function prepare_multi_sig_c_deposit_payload_json(prepared_json: string, multi_sig_user: string, outer_signer: string): string;

/**
 * Produces the authorized-user digest for signer-node self-management.
 *
 * # Errors
 * Returns a JavaScript error for malformed JSON, modified artifacts, or addresses.
 */
export function prepare_multi_sig_c_signer_payload_json(prepared_json: string, multi_sig_user: string, outer_signer: string): string;

/**
 * Produces the authorized-user digest for a validator lifecycle action.
 *
 * # Errors
 * Returns a JavaScript error for malformed JSON, modified artifacts, or addresses.
 */
export function prepare_multi_sig_c_validator_payload_json(prepared_json: string, multi_sig_user: string, outer_signer: string): string;

/**
 * Produces the authorized-user digest for a prepared staking withdrawal.
 *
 * # Errors
 *
 * Returns a JavaScript error for malformed JSON, modified artifacts, or addresses.
 */
export function prepare_multi_sig_c_withdraw_payload_json(prepared_json: string, multi_sig_user: string, outer_signer: string): string;

/**
 * Produces the authorized-user digest for a prepared Cloid cancellation.
 *
 * # Errors
 *
 * Returns a JavaScript error for malformed JSON, modified artifacts,
 * addresses, or encoding failure.
 */
export function prepare_multi_sig_cancel_by_cloid_payload_json(prepared_json: string, multi_sig_user: string, outer_signer: string): string;

/**
 * Produces the authorized-user digest for a prepared OID cancellation.
 *
 * # Errors
 *
 * Returns a JavaScript error for malformed JSON, modified artifacts,
 * addresses, or encoding failure.
 */
export function prepare_multi_sig_cancel_payload_json(prepared_json: string, multi_sig_user: string, outer_signer: string): string;

/**
 * Produces the authorized-user digest for named-subaccount creation.
 *
 * # Errors
 * Returns a JavaScript error for malformed JSON, modified artifacts, or addresses.
 */
export function prepare_multi_sig_create_sub_account_payload_json(prepared_json: string, multi_sig_user: string, outer_signer: string): string;

/**
 * Verifies authorized-user signatures and produces the outer signer digest.
 *
 * `signaturesJson` must be an array of `{expectedSigner,r,s,v}` objects. The
 * returned envelope is opaque and must be passed unchanged to
 * `finalize_multi_sig_json`.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid JSON, empty/duplicate signers,
 * signature mismatch, modified artifacts, or serialization failure.
 */
export function prepare_multi_sig_envelope_json(payload_json: string, signatures_json: string): string;

/**
 * Produces the authorized-user digest for an EVM-user update.
 *
 * # Errors
 * Returns a JavaScript error for malformed JSON, modified artifacts, or addresses.
 */
export function prepare_multi_sig_evm_user_modify_payload_json(prepared_json: string, multi_sig_user: string, outer_signer: string): string;

/**
 * Produces the authorized-user digest for a gossip priority bid.
 *
 * # Errors
 * Returns a JavaScript error for malformed JSON, modified artifacts, or addresses.
 */
export function prepare_multi_sig_gossip_priority_bid_payload_json(prepared_json: string, multi_sig_user: string, outer_signer: string): string;

/**
 * Produces the authorized-user digest for an L1 no-op.
 *
 * # Errors
 * Returns a JavaScript error for malformed JSON, modified artifacts, or addresses.
 */
export function prepare_multi_sig_noop_payload_json(prepared_json: string, multi_sig_user: string, outer_signer: string): string;

/**
 * Produces the authorized-user digest for a prepared multi-signature L1
 * order.
 *
 * The prepared order JSON must be passed unchanged from
 * `prepare_limit_order_json` or `prepare_orders_json`.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid prepared JSON, modified artifacts,
 * invalid addresses, or encoding failure.
 */
export function prepare_multi_sig_order_payload_json(prepared_json: string, multi_sig_user: string, outer_signer: string): string;

/**
 * Produces the authorized-user digest for a perpetual deployer action.
 *
 * # Errors
 * Returns a JavaScript error for malformed JSON, modified artifacts, or addresses.
 */
export function prepare_multi_sig_perp_deploy_payload_json(prepared_json: string, multi_sig_user: string, outer_signer: string): string;

/**
 * Produces the authorized-user digest for a prepared schedule-cancel action.
 *
 * # Errors
 *
 * Returns a JavaScript error for malformed JSON, modified artifacts,
 * addresses, or encoding failure.
 */
export function prepare_multi_sig_schedule_cancel_payload_json(prepared_json: string, multi_sig_user: string, outer_signer: string): string;

/**
 * Produces the authorized-user digest for a prepared multi-signature
 * `sendAsset` action.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid prepared JSON, modified artifacts,
 * invalid addresses, or serialization failure.
 */
export function prepare_multi_sig_send_asset_payload_json(prepared_json: string, multi_sig_user: string, outer_signer: string): string;

/**
 * Produces the authorized-user digest for referral-code registration.
 *
 * # Errors
 * Returns a JavaScript error for malformed JSON, modified artifacts, or addresses.
 */
export function prepare_multi_sig_set_referrer_payload_json(prepared_json: string, multi_sig_user: string, outer_signer: string): string;

/**
 * Produces the authorized-user digest for a Spot deployer action.
 *
 * # Errors
 * Returns a JavaScript error for malformed JSON, modified artifacts, or addresses.
 */
export function prepare_multi_sig_spot_deploy_payload_json(prepared_json: string, multi_sig_user: string, outer_signer: string): string;

/**
 * Produces the authorized-user digest for prepared multi-signature `spotSend`.
 *
 * # Errors
 *
 * Returns a JavaScript error for malformed JSON, modified artifacts, or addresses.
 */
export function prepare_multi_sig_spot_send_payload_json(prepared_json: string, multi_sig_user: string, outer_signer: string): string;

/**
 * Produces the authorized-user digest for a spot subaccount transfer.
 *
 * # Errors
 * Returns a JavaScript error for malformed JSON, modified artifacts, or addresses.
 */
export function prepare_multi_sig_sub_account_spot_transfer_payload_json(prepared_json: string, multi_sig_user: string, outer_signer: string): string;

/**
 * Produces the authorized-user digest for a USD subaccount transfer.
 *
 * # Errors
 * Returns a JavaScript error for malformed JSON, modified artifacts, or addresses.
 */
export function prepare_multi_sig_sub_account_transfer_payload_json(prepared_json: string, multi_sig_user: string, outer_signer: string): string;

/**
 * Produces the authorized-user digest for prepared validator delegation.
 *
 * # Errors
 *
 * Returns a JavaScript error for malformed JSON, modified artifacts, or addresses.
 */
export function prepare_multi_sig_token_delegate_payload_json(prepared_json: string, multi_sig_user: string, outer_signer: string): string;

/**
 * Produces the authorized-user digest for a prepared isolated-only margin
 * top-up.
 *
 * # Errors
 *
 * Returns a JavaScript error for malformed JSON, modified artifacts,
 * addresses, or encoding failure.
 */
export function prepare_multi_sig_top_up_isolated_only_margin_payload_json(prepared_json: string, multi_sig_user: string, outer_signer: string): string;

/**
 * Produces the authorized-user digest for a prepared TWAP cancellation.
 *
 * # Errors
 *
 * Returns a JavaScript error for malformed JSON, modified artifacts,
 * addresses, or encoding failure.
 */
export function prepare_multi_sig_twap_cancel_payload_json(prepared_json: string, multi_sig_user: string, outer_signer: string): string;

/**
 * Produces the authorized-user digest for a prepared native TWAP order.
 *
 * # Errors
 *
 * Returns a JavaScript error for malformed JSON, modified artifacts,
 * addresses, or encoding failure.
 */
export function prepare_multi_sig_twap_order_payload_json(prepared_json: string, multi_sig_user: string, outer_signer: string): string;

/**
 * Produces the authorized-user digest for a prepared isolated-margin update.
 *
 * # Errors
 *
 * Returns a JavaScript error for malformed JSON, modified artifacts,
 * addresses, or encoding failure.
 */
export function prepare_multi_sig_update_isolated_margin_payload_json(prepared_json: string, multi_sig_user: string, outer_signer: string): string;

/**
 * Produces the authorized-user digest for a prepared leverage update.
 *
 * # Errors
 *
 * Returns a JavaScript error for malformed JSON, modified artifacts,
 * addresses, or encoding failure.
 */
export function prepare_multi_sig_update_leverage_payload_json(prepared_json: string, multi_sig_user: string, outer_signer: string): string;

/**
 * Produces the authorized-user digest for a prepared USD class transfer.
 *
 * # Errors
 *
 * Returns a JavaScript error for malformed JSON, modified artifacts, or addresses.
 */
export function prepare_multi_sig_usd_class_transfer_payload_json(prepared_json: string, multi_sig_user: string, outer_signer: string): string;

/**
 * Produces the authorized-user digest for prepared multi-signature `usdSend`.
 *
 * # Errors
 *
 * Returns a JavaScript error for malformed JSON, modified artifacts, or addresses.
 */
export function prepare_multi_sig_usd_send_payload_json(prepared_json: string, multi_sig_user: string, outer_signer: string): string;

/**
 * Produces the authorized-user digest for a prepared DEX-abstraction toggle.
 *
 * # Errors
 *
 * Returns a JavaScript error for malformed JSON, modified artifacts, or addresses.
 */
export function prepare_multi_sig_user_dex_abstraction_payload_json(prepared_json: string, multi_sig_user: string, outer_signer: string): string;

/**
 * Produces the authorized-user digest for a prepared multi-signature
 * `userSetAbstraction` action.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid prepared JSON, modified artifacts,
 * invalid addresses, or serialization failure.
 */
export function prepare_multi_sig_user_set_abstraction_payload_json(prepared_json: string, multi_sig_user: string, outer_signer: string): string;

/**
 * Produces the authorized-user digest for a vault transfer.
 *
 * # Errors
 * Returns a JavaScript error for malformed JSON, modified artifacts, or addresses.
 */
export function prepare_multi_sig_vault_transfer_payload_json(prepared_json: string, multi_sig_user: string, outer_signer: string): string;

/**
 * Produces the authorized-user digest for a prepared bridge withdrawal.
 *
 * # Errors
 *
 * Returns a JavaScript error for malformed JSON, modified artifacts, or addresses.
 */
export function prepare_multi_sig_withdraw_payload_json(prepared_json: string, multi_sig_user: string, outer_signer: string): string;

/**
 * Prepares an empty L1 action from strict camelCase JSON.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid JSON, address, nonce, or signing
 * context.
 */
export function prepare_noop_json(request_json: string): string;

/**
 * Prepares a mixed atomic batch of limit and trigger orders.
 *
 * # Errors
 *
 * Returns a JavaScript error for malformed JSON or any failed protocol rule.
 */
export function prepare_orders_json(request_json: string): string;

/**
 * Prepares any supported perpetual deployer lifecycle action from JSON.
 *
 * # Errors
 * Returns a JavaScript error for invalid JSON, deployer data, or signing context.
 */
export function prepare_perp_deploy_json(request_json: string): string;

/**
 * Prepares a dead man's switch set or clear action.
 *
 * # Errors
 *
 * Returns a JavaScript error for malformed JSON, an unsafe deadline, or any
 * failed signing-context rule.
 */
export function prepare_schedule_cancel_json(request_json: string): string;

/**
 * Prepares a generalized asset transfer from strict camelCase JSON.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid JSON, addresses, DEX names, token,
 * amount, nonce, or serialization.
 */
export function prepare_send_asset_json(request_json: string): string;

/**
 * Prepares referral-code registration from strict camelCase JSON.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid JSON, code, nonce, or signing
 * context.
 */
export function prepare_set_referrer_json(request_json: string): string;

/**
 * Prepares any supported Spot deployer lifecycle action from JSON.
 *
 * # Errors
 * Returns a JavaScript error for invalid JSON, deployer data, or signing context.
 */
export function prepare_spot_deploy_json(request_json: string): string;

/**
 * Prepares a Core spot transfer from strict camelCase JSON.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid destination, token, amount, nonce,
 * or serialization.
 */
export function prepare_spot_send_json(request_json: string): string;

/**
 * Prepares a spot-token master/subaccount transfer from strict camelCase JSON.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid addresses, token, amount, integer
 * strings, or signing context.
 */
export function prepare_sub_account_spot_transfer_json(request_json: string): string;

/**
 * Prepares a USD master/subaccount transfer from strict camelCase JSON.
 *
 * `amount` is an exact decimal string and is converted to six-decimal
 * protocol units without rounding.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid addresses, amount precision, integer
 * strings, or signing context.
 */
export function prepare_sub_account_transfer_json(request_json: string): string;

/**
 * Prepares a validator delegation or undelegation from strict camelCase JSON.
 *
 * `wei` and `nonce` must be unsigned decimal strings. The returned prepared
 * JSON must be passed unchanged to `finalize_token_delegate_json`.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid JSON, validator, amount, nonce, or
 * serialization.
 */
export function prepare_token_delegate_json(request_json: string): string;

/**
 * Prepares an isolated-only margin top-up from strict camelCase JSON.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid target leverage or signing context.
 */
export function prepare_top_up_isolated_only_margin_json(request_json: string): string;

/**
 * Prepares one native TWAP cancellation.
 *
 * # Errors
 *
 * Returns a JavaScript error for malformed JSON or any failed protocol rule.
 */
export function prepare_twap_cancel_json(request_json: string): string;

/**
 * Prepares one native TWAP order.
 *
 * # Errors
 *
 * Returns a JavaScript error for malformed JSON or any failed protocol rule.
 */
export function prepare_twap_order_json(request_json: string): string;

/**
 * Prepares an exact isolated-margin USD delta from strict camelCase JSON.
 *
 * `usdDelta` is a signed decimal string with at most six fractional digits.
 * It is never converted through JavaScript `Number`.
 *
 * # Errors
 *
 * Returns a JavaScript error for malformed, over-precise, zero, or out-of-
 * range values and invalid signing context.
 */
export function prepare_update_isolated_margin_json(request_json: string): string;

/**
 * Prepares a cross/isolated leverage update from strict camelCase JSON.
 *
 * `maxLeverage` must come from current perpetual market metadata. Nonce and
 * expiry values remain decimal strings at the JavaScript boundary.
 *
 * # Errors
 *
 * Returns a JavaScript error for malformed JSON, leverage outside the market
 * range, or invalid signing context.
 */
export function prepare_update_leverage_json(request_json: string): string;

/**
 * Prepares a spot/perp USD class transfer from strict camelCase JSON.
 *
 * `amount` must not contain a manually appended subaccount suffix; pass the
 * optional `subAccount` field and let the Core construct the signed string.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid JSON, amount, subaccount, nonce, or
 * serialization.
 */
export function prepare_usd_class_transfer_json(request_json: string): string;

/**
 * Prepares a Core USDC transfer from strict camelCase JSON.
 *
 * Nonce is a decimal string and becomes both the signed `time` and outer
 * exchange nonce.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid destination, amount, nonce, or
 * serialization.
 */
export function prepare_usd_send_json(request_json: string): string;

/**
 * Prepares the legacy user DEX-abstraction toggle from strict camelCase JSON.
 *
 * `nonce` must be an unsigned decimal string.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid JSON, user address, nonce, or
 * serialization.
 */
export function prepare_user_dex_abstraction_json(request_json: string): string;

/**
 * Prepares an account-abstraction mode update from strict camelCase JSON.
 *
 * Accepted `abstraction` values are `disabled`, `unifiedAccount`, and
 * `portfolioMargin`.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid JSON, user address, abstraction,
 * nonce, or serialization.
 */
export function prepare_user_set_abstraction_json(request_json: string): string;

/**
 * Prepares a vault USD deposit or withdrawal from strict camelCase JSON.
 *
 * `amount` is an exact decimal string and is converted to six-decimal
 * protocol units without rounding.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid addresses, amount precision, integer
 * strings, or signing context.
 */
export function prepare_vault_transfer_json(request_json: string): string;

/**
 * Prepares a bridge withdrawal from strict camelCase JSON.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid destination, amount, nonce, or
 * serialization.
 */
export function prepare_withdraw_json(request_json: string): string;

/**
 * Extracts the signing digest without parsing prepared JSON in JavaScript.
 *
 * Prepared action JSON should otherwise be treated as an opaque token and
 * passed unchanged into the matching `finalize_*_json` function.
 *
 * # Errors
 *
 * Returns a JavaScript error when the token is malformed or lacks the digest.
 */
export function prepared_signing_digest(prepared_json: string): string;

/**
 * Returns the protocol core version.
 */
export function protocol_version(): string;

/**
 * Returns retained diagnostics as JSON without removing them.
 *
 * # Errors
 *
 * Returns a JavaScript error only if JSON serialization fails.
 */
export function snapshot_logs_json(): string;

/**
 * Checks the documented nonce time window before request submission.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid integers or a nonce outside the
 * documented server-time window.
 */
export function validate_exchange_nonce(nonce: string, now_ms: string): void;

/**
 * Builds a signed-action post over WebSocket.
 *
 * # Errors
 *
 * Returns a JavaScript error for malformed or unsafe finalized artifacts.
 */
export function websocket_action_post_json(id: number, finalized_json: string): string;

/**
 * Builds a read-only info post over WebSocket.
 *
 * # Errors
 *
 * Returns a JavaScript error when the payload is not a JSON object.
 */
export function websocket_info_post_json(id: number, payload: string): string;

/**
 * Returns the canonical WebSocket heartbeat command.
 *
 * # Errors
 *
 * Returns a JavaScript error only if serialization unexpectedly fails.
 */
export function websocket_ping_json(): string;

/**
 * Validates a subscription and builds its subscribe command.
 *
 * # Errors
 *
 * Returns a JavaScript error for malformed JSON or invalid fields.
 */
export function websocket_subscribe_json(subscription_json: string): string;

/**
 * Builds a typed read-only Info post over WebSocket.
 *
 * # Errors
 *
 * Returns a JavaScript error for malformed JSON or invalid query fields.
 */
export function websocket_typed_info_post_json(id: number, query_json: string): string;

/**
 * Validates a subscription and builds its unsubscribe command.
 *
 * # Errors
 *
 * Returns a JavaScript error for malformed JSON or invalid fields.
 */
export function websocket_unsubscribe_json(subscription_json: string): string;

/**
 * Returns the official WebSocket URL for a network.
 *
 * # Errors
 *
 * Returns a JavaScript error for an unsupported network name.
 */
export function websocket_url(network: string): string;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
    readonly memory: WebAssembly.Memory;
    readonly __wbg_wasmnoncemanager_free: (a: number, b: number) => void;
    readonly build_exchange_http_request_json: (a: number, b: number) => [number, number, number, number];
    readonly build_info_http_request_json: (a: number, b: number, c: number, d: number) => [number, number, number, number];
    readonly build_typed_info_http_request_json: (a: number, b: number, c: number, d: number) => [number, number, number, number];
    readonly clear_logs: () => void;
    readonly configure_logging: (a: number, b: number, c: number, d: number) => [number, number, number, number];
    readonly drain_logs_json: () => [number, number, number, number];
    readonly finalize_agent_enable_dex_abstraction_json: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => [number, number, number, number];
    readonly finalize_agent_set_abstraction_json: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => [number, number, number, number];
    readonly finalize_approve_agent_json: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => [number, number, number, number];
    readonly finalize_approve_builder_fee_json: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => [number, number, number, number];
    readonly finalize_batch_modify_json: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => [number, number, number, number];
    readonly finalize_c_deposit_json: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => [number, number, number, number];
    readonly finalize_c_signer_json: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => [number, number, number, number];
    readonly finalize_c_validator_json: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => [number, number, number, number];
    readonly finalize_c_withdraw_json: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => [number, number, number, number];
    readonly finalize_cancel_by_cloid_json: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => [number, number, number, number];
    readonly finalize_cancel_json: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => [number, number, number, number];
    readonly finalize_convert_to_multi_sig_user_json: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => [number, number, number, number];
    readonly finalize_create_sub_account_json: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => [number, number, number, number];
    readonly finalize_evm_user_modify_json: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => [number, number, number, number];
    readonly finalize_gossip_priority_bid_json: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => [number, number, number, number];
    readonly finalize_multi_sig_json: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => [number, number, number, number];
    readonly finalize_noop_json: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => [number, number, number, number];
    readonly finalize_order_json: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => [number, number, number, number];
    readonly finalize_perp_deploy_json: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => [number, number, number, number];
    readonly finalize_schedule_cancel_json: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => [number, number, number, number];
    readonly finalize_send_asset_json: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => [number, number, number, number];
    readonly finalize_set_referrer_json: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => [number, number, number, number];
    readonly finalize_spot_deploy_json: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => [number, number, number, number];
    readonly finalize_spot_send_json: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => [number, number, number, number];
    readonly finalize_sub_account_spot_transfer_json: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => [number, number, number, number];
    readonly finalize_sub_account_transfer_json: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => [number, number, number, number];
    readonly finalize_token_delegate_json: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => [number, number, number, number];
    readonly finalize_top_up_isolated_only_margin_json: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => [number, number, number, number];
    readonly finalize_twap_cancel_json: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => [number, number, number, number];
    readonly finalize_twap_order_json: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => [number, number, number, number];
    readonly finalize_update_isolated_margin_json: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => [number, number, number, number];
    readonly finalize_update_leverage_json: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => [number, number, number, number];
    readonly finalize_usd_class_transfer_json: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => [number, number, number, number];
    readonly finalize_usd_send_json: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => [number, number, number, number];
    readonly finalize_user_dex_abstraction_json: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => [number, number, number, number];
    readonly finalize_user_set_abstraction_json: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => [number, number, number, number];
    readonly finalize_vault_transfer_json: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => [number, number, number, number];
    readonly finalize_withdraw_json: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => [number, number, number, number];
    readonly host_failure_retry_advice: (a: number, b: number, c: number, d: number) => [number, number, number, number];
    readonly normalize_decimal: (a: number, b: number) => [number, number, number, number];
    readonly parse_http_response_json: (a: number, b: number, c: number, d: number, e: number) => [number, number, number, number];
    readonly parse_websocket_message_json: (a: number, b: number) => [number, number, number, number];
    readonly prepare_agent_enable_dex_abstraction_json: (a: number, b: number) => [number, number, number, number];
    readonly prepare_agent_set_abstraction_json: (a: number, b: number) => [number, number, number, number];
    readonly prepare_approve_agent_json: (a: number, b: number) => [number, number, number, number];
    readonly prepare_approve_builder_fee_json: (a: number, b: number) => [number, number, number, number];
    readonly prepare_batch_modify_json: (a: number, b: number) => [number, number, number, number];
    readonly prepare_batch_orders_json: (a: number, b: number) => [number, number, number, number];
    readonly prepare_c_deposit_json: (a: number, b: number) => [number, number, number, number];
    readonly prepare_c_signer_json: (a: number, b: number) => [number, number, number, number];
    readonly prepare_c_validator_change_profile_json: (a: number, b: number) => [number, number, number, number];
    readonly prepare_c_validator_register_json: (a: number, b: number) => [number, number, number, number];
    readonly prepare_c_validator_unregister_json: (a: number, b: number) => [number, number, number, number];
    readonly prepare_c_withdraw_json: (a: number, b: number) => [number, number, number, number];
    readonly prepare_cancel_by_cloid_json: (a: number, b: number) => [number, number, number, number];
    readonly prepare_cancel_json: (a: number, b: number) => [number, number, number, number];
    readonly prepare_convert_to_multi_sig_user_json: (a: number, b: number) => [number, number, number, number];
    readonly prepare_create_sub_account_json: (a: number, b: number) => [number, number, number, number];
    readonly prepare_evm_user_modify_json: (a: number, b: number) => [number, number, number, number];
    readonly prepare_gossip_priority_bid_json: (a: number, b: number) => [number, number, number, number];
    readonly prepare_info_query_json: (a: number, b: number) => [number, number, number, number];
    readonly prepare_limit_order_json: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number, m: number, n: number, o: number, p: number, q: number, r: number, s: number, t: number, u: number) => [number, number, number, number];
    readonly prepare_multi_sig_agent_enable_dex_abstraction_payload_json: (a: number, b: number, c: number, d: number, e: number, f: number) => [number, number, number, number];
    readonly prepare_multi_sig_agent_set_abstraction_payload_json: (a: number, b: number, c: number, d: number, e: number, f: number) => [number, number, number, number];
    readonly prepare_multi_sig_approve_agent_payload_json: (a: number, b: number, c: number, d: number, e: number, f: number) => [number, number, number, number];
    readonly prepare_multi_sig_approve_builder_fee_payload_json: (a: number, b: number, c: number, d: number, e: number, f: number) => [number, number, number, number];
    readonly prepare_multi_sig_batch_modify_payload_json: (a: number, b: number, c: number, d: number, e: number, f: number) => [number, number, number, number];
    readonly prepare_multi_sig_c_deposit_payload_json: (a: number, b: number, c: number, d: number, e: number, f: number) => [number, number, number, number];
    readonly prepare_multi_sig_c_signer_payload_json: (a: number, b: number, c: number, d: number, e: number, f: number) => [number, number, number, number];
    readonly prepare_multi_sig_c_validator_payload_json: (a: number, b: number, c: number, d: number, e: number, f: number) => [number, number, number, number];
    readonly prepare_multi_sig_c_withdraw_payload_json: (a: number, b: number, c: number, d: number, e: number, f: number) => [number, number, number, number];
    readonly prepare_multi_sig_cancel_by_cloid_payload_json: (a: number, b: number, c: number, d: number, e: number, f: number) => [number, number, number, number];
    readonly prepare_multi_sig_cancel_payload_json: (a: number, b: number, c: number, d: number, e: number, f: number) => [number, number, number, number];
    readonly prepare_multi_sig_create_sub_account_payload_json: (a: number, b: number, c: number, d: number, e: number, f: number) => [number, number, number, number];
    readonly prepare_multi_sig_envelope_json: (a: number, b: number, c: number, d: number) => [number, number, number, number];
    readonly prepare_multi_sig_evm_user_modify_payload_json: (a: number, b: number, c: number, d: number, e: number, f: number) => [number, number, number, number];
    readonly prepare_multi_sig_gossip_priority_bid_payload_json: (a: number, b: number, c: number, d: number, e: number, f: number) => [number, number, number, number];
    readonly prepare_multi_sig_noop_payload_json: (a: number, b: number, c: number, d: number, e: number, f: number) => [number, number, number, number];
    readonly prepare_multi_sig_order_payload_json: (a: number, b: number, c: number, d: number, e: number, f: number) => [number, number, number, number];
    readonly prepare_multi_sig_perp_deploy_payload_json: (a: number, b: number, c: number, d: number, e: number, f: number) => [number, number, number, number];
    readonly prepare_multi_sig_schedule_cancel_payload_json: (a: number, b: number, c: number, d: number, e: number, f: number) => [number, number, number, number];
    readonly prepare_multi_sig_send_asset_payload_json: (a: number, b: number, c: number, d: number, e: number, f: number) => [number, number, number, number];
    readonly prepare_multi_sig_set_referrer_payload_json: (a: number, b: number, c: number, d: number, e: number, f: number) => [number, number, number, number];
    readonly prepare_multi_sig_spot_deploy_payload_json: (a: number, b: number, c: number, d: number, e: number, f: number) => [number, number, number, number];
    readonly prepare_multi_sig_spot_send_payload_json: (a: number, b: number, c: number, d: number, e: number, f: number) => [number, number, number, number];
    readonly prepare_multi_sig_sub_account_spot_transfer_payload_json: (a: number, b: number, c: number, d: number, e: number, f: number) => [number, number, number, number];
    readonly prepare_multi_sig_sub_account_transfer_payload_json: (a: number, b: number, c: number, d: number, e: number, f: number) => [number, number, number, number];
    readonly prepare_multi_sig_token_delegate_payload_json: (a: number, b: number, c: number, d: number, e: number, f: number) => [number, number, number, number];
    readonly prepare_multi_sig_top_up_isolated_only_margin_payload_json: (a: number, b: number, c: number, d: number, e: number, f: number) => [number, number, number, number];
    readonly prepare_multi_sig_twap_cancel_payload_json: (a: number, b: number, c: number, d: number, e: number, f: number) => [number, number, number, number];
    readonly prepare_multi_sig_twap_order_payload_json: (a: number, b: number, c: number, d: number, e: number, f: number) => [number, number, number, number];
    readonly prepare_multi_sig_update_isolated_margin_payload_json: (a: number, b: number, c: number, d: number, e: number, f: number) => [number, number, number, number];
    readonly prepare_multi_sig_update_leverage_payload_json: (a: number, b: number, c: number, d: number, e: number, f: number) => [number, number, number, number];
    readonly prepare_multi_sig_usd_class_transfer_payload_json: (a: number, b: number, c: number, d: number, e: number, f: number) => [number, number, number, number];
    readonly prepare_multi_sig_usd_send_payload_json: (a: number, b: number, c: number, d: number, e: number, f: number) => [number, number, number, number];
    readonly prepare_multi_sig_user_dex_abstraction_payload_json: (a: number, b: number, c: number, d: number, e: number, f: number) => [number, number, number, number];
    readonly prepare_multi_sig_user_set_abstraction_payload_json: (a: number, b: number, c: number, d: number, e: number, f: number) => [number, number, number, number];
    readonly prepare_multi_sig_vault_transfer_payload_json: (a: number, b: number, c: number, d: number, e: number, f: number) => [number, number, number, number];
    readonly prepare_multi_sig_withdraw_payload_json: (a: number, b: number, c: number, d: number, e: number, f: number) => [number, number, number, number];
    readonly prepare_noop_json: (a: number, b: number) => [number, number, number, number];
    readonly prepare_orders_json: (a: number, b: number) => [number, number, number, number];
    readonly prepare_perp_deploy_json: (a: number, b: number) => [number, number, number, number];
    readonly prepare_schedule_cancel_json: (a: number, b: number) => [number, number, number, number];
    readonly prepare_send_asset_json: (a: number, b: number) => [number, number, number, number];
    readonly prepare_set_referrer_json: (a: number, b: number) => [number, number, number, number];
    readonly prepare_spot_deploy_json: (a: number, b: number) => [number, number, number, number];
    readonly prepare_spot_send_json: (a: number, b: number) => [number, number, number, number];
    readonly prepare_sub_account_spot_transfer_json: (a: number, b: number) => [number, number, number, number];
    readonly prepare_sub_account_transfer_json: (a: number, b: number) => [number, number, number, number];
    readonly prepare_token_delegate_json: (a: number, b: number) => [number, number, number, number];
    readonly prepare_top_up_isolated_only_margin_json: (a: number, b: number) => [number, number, number, number];
    readonly prepare_twap_cancel_json: (a: number, b: number) => [number, number, number, number];
    readonly prepare_twap_order_json: (a: number, b: number) => [number, number, number, number];
    readonly prepare_update_isolated_margin_json: (a: number, b: number) => [number, number, number, number];
    readonly prepare_update_leverage_json: (a: number, b: number) => [number, number, number, number];
    readonly prepare_usd_class_transfer_json: (a: number, b: number) => [number, number, number, number];
    readonly prepare_usd_send_json: (a: number, b: number) => [number, number, number, number];
    readonly prepare_user_dex_abstraction_json: (a: number, b: number) => [number, number, number, number];
    readonly prepare_user_set_abstraction_json: (a: number, b: number) => [number, number, number, number];
    readonly prepare_vault_transfer_json: (a: number, b: number) => [number, number, number, number];
    readonly prepare_withdraw_json: (a: number, b: number) => [number, number, number, number];
    readonly prepared_signing_digest: (a: number, b: number) => [number, number, number, number];
    readonly protocol_version: () => [number, number];
    readonly snapshot_logs_json: () => [number, number, number, number];
    readonly validate_exchange_nonce: (a: number, b: number, c: number, d: number) => [number, number];
    readonly wasmnoncemanager_fastForward: (a: number, b: number, c: number) => [number, number];
    readonly wasmnoncemanager_lastIssued: (a: number) => [number, number];
    readonly wasmnoncemanager_new: (a: number, b: number) => [number, number, number];
    readonly wasmnoncemanager_next: (a: number, b: number, c: number) => [number, number, number, number];
    readonly websocket_action_post_json: (a: number, b: number, c: number) => [number, number, number, number];
    readonly websocket_info_post_json: (a: number, b: number, c: number) => [number, number, number, number];
    readonly websocket_ping_json: () => [number, number, number, number];
    readonly websocket_subscribe_json: (a: number, b: number) => [number, number, number, number];
    readonly websocket_typed_info_post_json: (a: number, b: number, c: number) => [number, number, number, number];
    readonly websocket_unsubscribe_json: (a: number, b: number) => [number, number, number, number];
    readonly websocket_url: (a: number, b: number) => [number, number, number, number];
    readonly __wbindgen_externrefs: WebAssembly.Table;
    readonly __wbindgen_malloc: (a: number, b: number) => number;
    readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
    readonly __externref_table_dealloc: (a: number) => void;
    readonly __wbindgen_free: (a: number, b: number, c: number) => void;
    readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;

/**
 * Instantiates the given `module`, which can either be bytes or
 * a precompiled `WebAssembly.Module`.
 *
 * @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
 *
 * @returns {InitOutput}
 */
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
 * If `module_or_path` is {RequestInfo} or {URL}, makes a request and
 * for everything else, calls `WebAssembly.instantiate` directly.
 *
 * @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
 *
 * @returns {Promise<InitOutput>}
 */
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
