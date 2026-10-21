/* @ts-self-types="./hyper_axis.d.ts" */

/**
 * Signer-local monotonic nonce source for browser clients.
 *
 * Create one instance per master account or API wallet. A signer may reuse
 * the same instance across its vaults and subaccounts.
 */
export class WasmNonceManager {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        WasmNonceManagerFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_wasmnoncemanager_free(ptr, 0);
    }
    /**
     * Advances the high-water mark without moving it backwards.
     *
     * # Errors
     *
     * Returns a JavaScript error when the value is not a `u64`.
     * @param {string} last_issued
     */
    fastForward(last_issued) {
        const ptr0 = passStringToWasm0(last_issued, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.wasmnoncemanager_fastForward(this.__wbg_ptr, ptr0, len0);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * Returns the current high-water mark as a decimal string.
     * @returns {string | undefined}
     */
    get lastIssued() {
        const ret = wasm.wasmnoncemanager_lastIssued(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]);
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * Creates a manager, optionally restoring the last issued nonce string.
     *
     * # Errors
     *
     * Returns a JavaScript error when the restored value is not a `u64`.
     * @param {string | null} [last_issued]
     */
    constructor(last_issued) {
        var ptr0 = isLikeNone(last_issued) ? 0 : passStringToWasm0(last_issued, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        const ret = wasm.wasmnoncemanager_new(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0];
        WasmNonceManagerFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * Issues the next nonce as a decimal string for JavaScript integer safety.
     *
     * # Errors
     *
     * Returns a JavaScript error for invalid time or nonce exhaustion.
     * @param {string} now_ms
     * @returns {string}
     */
    next(now_ms) {
        let deferred3_0;
        let deferred3_1;
        try {
            const ptr0 = passStringToWasm0(now_ms, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            const ret = wasm.wasmnoncemanager_next(this.__wbg_ptr, ptr0, len0);
            var ptr2 = ret[0];
            var len2 = ret[1];
            if (ret[3]) {
                ptr2 = 0; len2 = 0;
                throw takeFromExternrefTable0(ret[2]);
            }
            deferred3_0 = ptr2;
            deferred3_1 = len2;
            return getStringFromWasm0(ptr2, len2);
        } finally {
            wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
        }
    }
}
if (Symbol.dispose) WasmNonceManager.prototype[Symbol.dispose] = WasmNonceManager.prototype.free;

/**
 * Builds a runtime-neutral `POST /exchange` request from finalized JSON.
 *
 * # Errors
 *
 * Returns a JavaScript error for malformed or unsafe finalized artifacts.
 * @param {string} finalized_json
 * @returns {string}
 */
export function build_exchange_http_request_json(finalized_json) {
    let deferred3_0;
    let deferred3_1;
    try {
        const ptr0 = passStringToWasm0(finalized_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.build_exchange_http_request_json(ptr0, len0);
        var ptr2 = ret[0];
        var len2 = ret[1];
        if (ret[3]) {
            ptr2 = 0; len2 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred3_0 = ptr2;
        deferred3_1 = len2;
        return getStringFromWasm0(ptr2, len2);
    } finally {
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
}

/**
 * Builds a runtime-neutral `POST /info` request as JSON.
 *
 * The nested `body` string must be sent directly by the JavaScript host.
 *
 * # Errors
 *
 * Returns a JavaScript error when the network/body is invalid.
 * @param {string} network
 * @param {string} body
 * @returns {string}
 */
export function build_info_http_request_json(network, body) {
    let deferred4_0;
    let deferred4_1;
    try {
        const ptr0 = passStringToWasm0(network, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(body, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.build_info_http_request_json(ptr0, len0, ptr1, len1);
        var ptr3 = ret[0];
        var len3 = ret[1];
        if (ret[3]) {
            ptr3 = 0; len3 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred4_0 = ptr3;
        deferred4_1 = len3;
        return getStringFromWasm0(ptr3, len3);
    } finally {
        wasm.__wbindgen_free(deferred4_0, deferred4_1, 1);
    }
}

/**
 * Builds a runtime-neutral `POST /info` request from a typed query.
 *
 * # Errors
 *
 * Returns a JavaScript error for an unsupported network, malformed JSON, or
 * invalid query fields.
 * @param {string} network
 * @param {string} query_json
 * @returns {string}
 */
export function build_typed_info_http_request_json(network, query_json) {
    let deferred4_0;
    let deferred4_1;
    try {
        const ptr0 = passStringToWasm0(network, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(query_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.build_typed_info_http_request_json(ptr0, len0, ptr1, len1);
        var ptr3 = ret[0];
        var len3 = ret[1];
        if (ret[3]) {
            ptr3 = 0; len3 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred4_0 = ptr3;
        deferred4_1 = len3;
        return getStringFromWasm0(ptr3, len3);
    } finally {
        wasm.__wbindgen_free(deferred4_0, deferred4_1, 1);
    }
}

/**
 * Clears retained diagnostics and the overflow counter.
 */
export function clear_logs() {
    wasm.clear_logs();
}

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
 * @param {boolean} enabled
 * @param {string} level
 * @param {number} capacity
 * @returns {string}
 */
export function configure_logging(enabled, level, capacity) {
    let deferred3_0;
    let deferred3_1;
    try {
        const ptr0 = passStringToWasm0(level, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.configure_logging(enabled, ptr0, len0, capacity);
        var ptr2 = ret[0];
        var len2 = ret[1];
        if (ret[3]) {
            ptr2 = 0; len2 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred3_0 = ptr2;
        deferred3_1 = len2;
        return getStringFromWasm0(ptr2, len2);
    } finally {
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
}

/**
 * Returns and removes retained diagnostics as JSON.
 *
 * # Errors
 *
 * Returns a JavaScript error only if JSON serialization fails.
 * @returns {string}
 */
export function drain_logs_json() {
    let deferred2_0;
    let deferred2_1;
    try {
        const ret = wasm.drain_logs_json();
        var ptr1 = ret[0];
        var len1 = ret[1];
        if (ret[3]) {
            ptr1 = 0; len1 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred2_0 = ptr1;
        deferred2_1 = len1;
        return getStringFromWasm0(ptr1, len1);
    } finally {
        wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
    }
}

/**
 * Verifies and finalizes legacy DEX-abstraction enablement for an agent.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid prepared JSON, signature, signer, or
 * modified artifacts.
 * @param {string} prepared_json
 * @param {string} r
 * @param {string} s
 * @param {number} v
 * @param {string} expected_signer
 * @returns {string}
 */
export function finalize_agent_enable_dex_abstraction_json(prepared_json, r, s, v, expected_signer) {
    let deferred6_0;
    let deferred6_1;
    try {
        const ptr0 = passStringToWasm0(prepared_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(r, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ptr3 = passStringToWasm0(expected_signer, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len3 = WASM_VECTOR_LEN;
        const ret = wasm.finalize_agent_enable_dex_abstraction_json(ptr0, len0, ptr1, len1, ptr2, len2, v, ptr3, len3);
        var ptr5 = ret[0];
        var len5 = ret[1];
        if (ret[3]) {
            ptr5 = 0; len5 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred6_0 = ptr5;
        deferred6_1 = len5;
        return getStringFromWasm0(ptr5, len5);
    } finally {
        wasm.__wbindgen_free(deferred6_0, deferred6_1, 1);
    }
}

/**
 * Verifies and finalizes an agent account-abstraction mode update.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid prepared JSON, signature, signer, or
 * modified artifacts.
 * @param {string} prepared_json
 * @param {string} r
 * @param {string} s
 * @param {number} v
 * @param {string} expected_signer
 * @returns {string}
 */
export function finalize_agent_set_abstraction_json(prepared_json, r, s, v, expected_signer) {
    let deferred6_0;
    let deferred6_1;
    try {
        const ptr0 = passStringToWasm0(prepared_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(r, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ptr3 = passStringToWasm0(expected_signer, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len3 = WASM_VECTOR_LEN;
        const ret = wasm.finalize_agent_set_abstraction_json(ptr0, len0, ptr1, len1, ptr2, len2, v, ptr3, len3);
        var ptr5 = ret[0];
        var len5 = ret[1];
        if (ret[3]) {
            ptr5 = 0; len5 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred6_0 = ptr5;
        deferred6_1 = len5;
        return getStringFromWasm0(ptr5, len5);
    } finally {
        wasm.__wbindgen_free(deferred6_0, deferred6_1, 1);
    }
}

/**
 * Verifies and finalizes an API wallet authorization.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid prepared JSON, signature, signer,
 * context mismatch, or modified artifacts.
 * @param {string} prepared_json
 * @param {string} r
 * @param {string} s
 * @param {number} v
 * @param {string} expected_signer
 * @returns {string}
 */
export function finalize_approve_agent_json(prepared_json, r, s, v, expected_signer) {
    let deferred6_0;
    let deferred6_1;
    try {
        const ptr0 = passStringToWasm0(prepared_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(r, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ptr3 = passStringToWasm0(expected_signer, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len3 = WASM_VECTOR_LEN;
        const ret = wasm.finalize_approve_agent_json(ptr0, len0, ptr1, len1, ptr2, len2, v, ptr3, len3);
        var ptr5 = ret[0];
        var len5 = ret[1];
        if (ret[3]) {
            ptr5 = 0; len5 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred6_0 = ptr5;
        deferred6_1 = len5;
        return getStringFromWasm0(ptr5, len5);
    } finally {
        wasm.__wbindgen_free(deferred6_0, deferred6_1, 1);
    }
}

/**
 * Verifies and finalizes a builder fee authorization.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid prepared JSON, signature, signer,
 * context mismatch, or modified artifacts.
 * @param {string} prepared_json
 * @param {string} r
 * @param {string} s
 * @param {number} v
 * @param {string} expected_signer
 * @returns {string}
 */
export function finalize_approve_builder_fee_json(prepared_json, r, s, v, expected_signer) {
    let deferred6_0;
    let deferred6_1;
    try {
        const ptr0 = passStringToWasm0(prepared_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(r, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ptr3 = passStringToWasm0(expected_signer, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len3 = WASM_VECTOR_LEN;
        const ret = wasm.finalize_approve_builder_fee_json(ptr0, len0, ptr1, len1, ptr2, len2, v, ptr3, len3);
        var ptr5 = ret[0];
        var len5 = ret[1];
        if (ret[3]) {
            ptr5 = 0; len5 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred6_0 = ptr5;
        deferred6_1 = len5;
        return getStringFromWasm0(ptr5, len5);
    } finally {
        wasm.__wbindgen_free(deferred6_0, deferred6_1, 1);
    }
}

/**
 * Verifies and finalizes a batch-modify request.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid prepared JSON, signature, signer, or
 * modified artifacts.
 * @param {string} prepared_json
 * @param {string} r
 * @param {string} s
 * @param {number} v
 * @param {string} expected_signer
 * @returns {string}
 */
export function finalize_batch_modify_json(prepared_json, r, s, v, expected_signer) {
    let deferred6_0;
    let deferred6_1;
    try {
        const ptr0 = passStringToWasm0(prepared_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(r, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ptr3 = passStringToWasm0(expected_signer, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len3 = WASM_VECTOR_LEN;
        const ret = wasm.finalize_batch_modify_json(ptr0, len0, ptr1, len1, ptr2, len2, v, ptr3, len3);
        var ptr5 = ret[0];
        var len5 = ret[1];
        if (ret[3]) {
            ptr5 = 0; len5 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred6_0 = ptr5;
        deferred6_1 = len5;
        return getStringFromWasm0(ptr5, len5);
    } finally {
        wasm.__wbindgen_free(deferred6_0, deferred6_1, 1);
    }
}

/**
 * Verifies and finalizes a native-token staking deposit.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid prepared JSON, signature, signer,
 * context mismatch, or modified artifacts.
 * @param {string} prepared_json
 * @param {string} r
 * @param {string} s
 * @param {number} v
 * @param {string} expected_signer
 * @returns {string}
 */
export function finalize_c_deposit_json(prepared_json, r, s, v, expected_signer) {
    let deferred6_0;
    let deferred6_1;
    try {
        const ptr0 = passStringToWasm0(prepared_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(r, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ptr3 = passStringToWasm0(expected_signer, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len3 = WASM_VECTOR_LEN;
        const ret = wasm.finalize_c_deposit_json(ptr0, len0, ptr1, len1, ptr2, len2, v, ptr3, len3);
        var ptr5 = ret[0];
        var len5 = ret[1];
        if (ret[3]) {
            ptr5 = 0; len5 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred6_0 = ptr5;
        deferred6_1 = len5;
        return getStringFromWasm0(ptr5, len5);
    } finally {
        wasm.__wbindgen_free(deferred6_0, deferred6_1, 1);
    }
}

/**
 * Verifies and finalizes signer-node self-management.
 *
 * # Errors
 * Returns a JavaScript error for invalid prepared JSON, signature, or artifacts.
 * @param {string} prepared_json
 * @param {string} r
 * @param {string} s
 * @param {number} v
 * @param {string} expected_signer
 * @returns {string}
 */
export function finalize_c_signer_json(prepared_json, r, s, v, expected_signer) {
    let deferred6_0;
    let deferred6_1;
    try {
        const ptr0 = passStringToWasm0(prepared_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(r, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ptr3 = passStringToWasm0(expected_signer, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len3 = WASM_VECTOR_LEN;
        const ret = wasm.finalize_c_signer_json(ptr0, len0, ptr1, len1, ptr2, len2, v, ptr3, len3);
        var ptr5 = ret[0];
        var len5 = ret[1];
        if (ret[3]) {
            ptr5 = 0; len5 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred6_0 = ptr5;
        deferred6_1 = len5;
        return getStringFromWasm0(ptr5, len5);
    } finally {
        wasm.__wbindgen_free(deferred6_0, deferred6_1, 1);
    }
}

/**
 * Verifies and finalizes a validator lifecycle action.
 *
 * # Errors
 * Returns a JavaScript error for invalid prepared JSON, signature, or artifacts.
 * @param {string} prepared_json
 * @param {string} r
 * @param {string} s
 * @param {number} v
 * @param {string} expected_signer
 * @returns {string}
 */
export function finalize_c_validator_json(prepared_json, r, s, v, expected_signer) {
    let deferred6_0;
    let deferred6_1;
    try {
        const ptr0 = passStringToWasm0(prepared_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(r, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ptr3 = passStringToWasm0(expected_signer, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len3 = WASM_VECTOR_LEN;
        const ret = wasm.finalize_c_validator_json(ptr0, len0, ptr1, len1, ptr2, len2, v, ptr3, len3);
        var ptr5 = ret[0];
        var len5 = ret[1];
        if (ret[3]) {
            ptr5 = 0; len5 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred6_0 = ptr5;
        deferred6_1 = len5;
        return getStringFromWasm0(ptr5, len5);
    } finally {
        wasm.__wbindgen_free(deferred6_0, deferred6_1, 1);
    }
}

/**
 * Verifies and finalizes a native-token staking withdrawal.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid prepared JSON, signature, signer,
 * context mismatch, or modified artifacts.
 * @param {string} prepared_json
 * @param {string} r
 * @param {string} s
 * @param {number} v
 * @param {string} expected_signer
 * @returns {string}
 */
export function finalize_c_withdraw_json(prepared_json, r, s, v, expected_signer) {
    let deferred6_0;
    let deferred6_1;
    try {
        const ptr0 = passStringToWasm0(prepared_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(r, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ptr3 = passStringToWasm0(expected_signer, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len3 = WASM_VECTOR_LEN;
        const ret = wasm.finalize_c_withdraw_json(ptr0, len0, ptr1, len1, ptr2, len2, v, ptr3, len3);
        var ptr5 = ret[0];
        var len5 = ret[1];
        if (ret[3]) {
            ptr5 = 0; len5 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred6_0 = ptr5;
        deferred6_1 = len5;
        return getStringFromWasm0(ptr5, len5);
    } finally {
        wasm.__wbindgen_free(deferred6_0, deferred6_1, 1);
    }
}

/**
 * Verifies and finalizes a cancellation-by-Cloid request.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid prepared JSON, signature, signer, or
 * modified artifacts.
 * @param {string} prepared_json
 * @param {string} r
 * @param {string} s
 * @param {number} v
 * @param {string} expected_signer
 * @returns {string}
 */
export function finalize_cancel_by_cloid_json(prepared_json, r, s, v, expected_signer) {
    let deferred6_0;
    let deferred6_1;
    try {
        const ptr0 = passStringToWasm0(prepared_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(r, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ptr3 = passStringToWasm0(expected_signer, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len3 = WASM_VECTOR_LEN;
        const ret = wasm.finalize_cancel_by_cloid_json(ptr0, len0, ptr1, len1, ptr2, len2, v, ptr3, len3);
        var ptr5 = ret[0];
        var len5 = ret[1];
        if (ret[3]) {
            ptr5 = 0; len5 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred6_0 = ptr5;
        deferred6_1 = len5;
        return getStringFromWasm0(ptr5, len5);
    } finally {
        wasm.__wbindgen_free(deferred6_0, deferred6_1, 1);
    }
}

/**
 * Verifies and finalizes a cancellation-by-OID request.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid prepared JSON, signature, signer, or
 * modified artifacts.
 * @param {string} prepared_json
 * @param {string} r
 * @param {string} s
 * @param {number} v
 * @param {string} expected_signer
 * @returns {string}
 */
export function finalize_cancel_json(prepared_json, r, s, v, expected_signer) {
    let deferred6_0;
    let deferred6_1;
    try {
        const ptr0 = passStringToWasm0(prepared_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(r, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ptr3 = passStringToWasm0(expected_signer, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len3 = WASM_VECTOR_LEN;
        const ret = wasm.finalize_cancel_json(ptr0, len0, ptr1, len1, ptr2, len2, v, ptr3, len3);
        var ptr5 = ret[0];
        var len5 = ret[1];
        if (ret[3]) {
            ptr5 = 0; len5 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred6_0 = ptr5;
        deferred6_1 = len5;
        return getStringFromWasm0(ptr5, len5);
    } finally {
        wasm.__wbindgen_free(deferred6_0, deferred6_1, 1);
    }
}

/**
 * Verifies and finalizes conversion to a threshold multi-signature user.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid prepared JSON, signature, signer,
 * context mismatch, or modified artifacts.
 * @param {string} prepared_json
 * @param {string} r
 * @param {string} s
 * @param {number} v
 * @param {string} expected_signer
 * @returns {string}
 */
export function finalize_convert_to_multi_sig_user_json(prepared_json, r, s, v, expected_signer) {
    let deferred6_0;
    let deferred6_1;
    try {
        const ptr0 = passStringToWasm0(prepared_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(r, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ptr3 = passStringToWasm0(expected_signer, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len3 = WASM_VECTOR_LEN;
        const ret = wasm.finalize_convert_to_multi_sig_user_json(ptr0, len0, ptr1, len1, ptr2, len2, v, ptr3, len3);
        var ptr5 = ret[0];
        var len5 = ret[1];
        if (ret[3]) {
            ptr5 = 0; len5 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred6_0 = ptr5;
        deferred6_1 = len5;
        return getStringFromWasm0(ptr5, len5);
    } finally {
        wasm.__wbindgen_free(deferred6_0, deferred6_1, 1);
    }
}

/**
 * Verifies and finalizes named-subaccount creation.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid prepared JSON, signature, signer, or
 * modified artifacts.
 * @param {string} prepared_json
 * @param {string} r
 * @param {string} s
 * @param {number} v
 * @param {string} expected_signer
 * @returns {string}
 */
export function finalize_create_sub_account_json(prepared_json, r, s, v, expected_signer) {
    let deferred6_0;
    let deferred6_1;
    try {
        const ptr0 = passStringToWasm0(prepared_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(r, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ptr3 = passStringToWasm0(expected_signer, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len3 = WASM_VECTOR_LEN;
        const ret = wasm.finalize_create_sub_account_json(ptr0, len0, ptr1, len1, ptr2, len2, v, ptr3, len3);
        var ptr5 = ret[0];
        var len5 = ret[1];
        if (ret[3]) {
            ptr5 = 0; len5 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred6_0 = ptr5;
        deferred6_1 = len5;
        return getStringFromWasm0(ptr5, len5);
    } finally {
        wasm.__wbindgen_free(deferred6_0, deferred6_1, 1);
    }
}

/**
 * Verifies and finalizes an EVM large-block preference update.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid prepared JSON, signature, signer, or
 * modified artifacts.
 * @param {string} prepared_json
 * @param {string} r
 * @param {string} s
 * @param {number} v
 * @param {string} expected_signer
 * @returns {string}
 */
export function finalize_evm_user_modify_json(prepared_json, r, s, v, expected_signer) {
    let deferred6_0;
    let deferred6_1;
    try {
        const ptr0 = passStringToWasm0(prepared_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(r, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ptr3 = passStringToWasm0(expected_signer, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len3 = WASM_VECTOR_LEN;
        const ret = wasm.finalize_evm_user_modify_json(ptr0, len0, ptr1, len1, ptr2, len2, v, ptr3, len3);
        var ptr5 = ret[0];
        var len5 = ret[1];
        if (ret[3]) {
            ptr5 = 0; len5 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred6_0 = ptr5;
        deferred6_1 = len5;
        return getStringFromWasm0(ptr5, len5);
    } finally {
        wasm.__wbindgen_free(deferred6_0, deferred6_1, 1);
    }
}

/**
 * Verifies and finalizes a gossip priority bid.
 *
 * # Errors
 * Returns a JavaScript error for invalid prepared JSON, signature, or artifacts.
 * @param {string} prepared_json
 * @param {string} r
 * @param {string} s
 * @param {number} v
 * @param {string} expected_signer
 * @returns {string}
 */
export function finalize_gossip_priority_bid_json(prepared_json, r, s, v, expected_signer) {
    let deferred6_0;
    let deferred6_1;
    try {
        const ptr0 = passStringToWasm0(prepared_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(r, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ptr3 = passStringToWasm0(expected_signer, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len3 = WASM_VECTOR_LEN;
        const ret = wasm.finalize_gossip_priority_bid_json(ptr0, len0, ptr1, len1, ptr2, len2, v, ptr3, len3);
        var ptr5 = ret[0];
        var len5 = ret[1];
        if (ret[3]) {
            ptr5 = 0; len5 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred6_0 = ptr5;
        deferred6_1 = len5;
        return getStringFromWasm0(ptr5, len5);
    } finally {
        wasm.__wbindgen_free(deferred6_0, deferred6_1, 1);
    }
}

/**
 * Verifies the outer signer and builds the final multi-signature exchange
 * request.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid prepared JSON, signature, outer
 * signer mismatch, modified artifacts, encoding, or serialization failure.
 * @param {string} prepared_json
 * @param {string} r
 * @param {string} s
 * @param {number} v
 * @param {string} expected_outer_signer
 * @returns {string}
 */
export function finalize_multi_sig_json(prepared_json, r, s, v, expected_outer_signer) {
    let deferred6_0;
    let deferred6_1;
    try {
        const ptr0 = passStringToWasm0(prepared_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(r, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ptr3 = passStringToWasm0(expected_outer_signer, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len3 = WASM_VECTOR_LEN;
        const ret = wasm.finalize_multi_sig_json(ptr0, len0, ptr1, len1, ptr2, len2, v, ptr3, len3);
        var ptr5 = ret[0];
        var len5 = ret[1];
        if (ret[3]) {
            ptr5 = 0; len5 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred6_0 = ptr5;
        deferred6_1 = len5;
        return getStringFromWasm0(ptr5, len5);
    } finally {
        wasm.__wbindgen_free(deferred6_0, deferred6_1, 1);
    }
}

/**
 * Verifies and finalizes an empty L1 action.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid prepared JSON, signature, signer, or
 * modified artifacts.
 * @param {string} prepared_json
 * @param {string} r
 * @param {string} s
 * @param {number} v
 * @param {string} expected_signer
 * @returns {string}
 */
export function finalize_noop_json(prepared_json, r, s, v, expected_signer) {
    let deferred6_0;
    let deferred6_1;
    try {
        const ptr0 = passStringToWasm0(prepared_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(r, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ptr3 = passStringToWasm0(expected_signer, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len3 = WASM_VECTOR_LEN;
        const ret = wasm.finalize_noop_json(ptr0, len0, ptr1, len1, ptr2, len2, v, ptr3, len3);
        var ptr5 = ret[0];
        var len5 = ret[1];
        if (ret[3]) {
            ptr5 = 0; len5 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred6_0 = ptr5;
        deferred6_1 = len5;
        return getStringFromWasm0(ptr5, len5);
    } finally {
        wasm.__wbindgen_free(deferred6_0, deferred6_1, 1);
    }
}

/**
 * Verifies a platform signature and returns a finalized exchange request.
 *
 * # Errors
 *
 * Returns a JavaScript error when prepared JSON, signature components, or the
 * expected signer are invalid, or when integrity and recovery checks fail.
 * @param {string} prepared_json
 * @param {string} r
 * @param {string} s
 * @param {number} v
 * @param {string} expected_signer
 * @returns {string}
 */
export function finalize_order_json(prepared_json, r, s, v, expected_signer) {
    let deferred6_0;
    let deferred6_1;
    try {
        const ptr0 = passStringToWasm0(prepared_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(r, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ptr3 = passStringToWasm0(expected_signer, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len3 = WASM_VECTOR_LEN;
        const ret = wasm.finalize_order_json(ptr0, len0, ptr1, len1, ptr2, len2, v, ptr3, len3);
        var ptr5 = ret[0];
        var len5 = ret[1];
        if (ret[3]) {
            ptr5 = 0; len5 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred6_0 = ptr5;
        deferred6_1 = len5;
        return getStringFromWasm0(ptr5, len5);
    } finally {
        wasm.__wbindgen_free(deferred6_0, deferred6_1, 1);
    }
}

/**
 * Verifies and finalizes a perpetual deployer action.
 *
 * # Errors
 * Returns a JavaScript error for invalid prepared JSON, signature, or artifacts.
 * @param {string} prepared_json
 * @param {string} r
 * @param {string} s
 * @param {number} v
 * @param {string} expected_signer
 * @returns {string}
 */
export function finalize_perp_deploy_json(prepared_json, r, s, v, expected_signer) {
    let deferred6_0;
    let deferred6_1;
    try {
        const ptr0 = passStringToWasm0(prepared_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(r, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ptr3 = passStringToWasm0(expected_signer, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len3 = WASM_VECTOR_LEN;
        const ret = wasm.finalize_perp_deploy_json(ptr0, len0, ptr1, len1, ptr2, len2, v, ptr3, len3);
        var ptr5 = ret[0];
        var len5 = ret[1];
        if (ret[3]) {
            ptr5 = 0; len5 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred6_0 = ptr5;
        deferred6_1 = len5;
        return getStringFromWasm0(ptr5, len5);
    } finally {
        wasm.__wbindgen_free(deferred6_0, deferred6_1, 1);
    }
}

/**
 * Verifies and finalizes a dead man's switch request.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid prepared JSON, signature, signer, or
 * modified artifacts.
 * @param {string} prepared_json
 * @param {string} r
 * @param {string} s
 * @param {number} v
 * @param {string} expected_signer
 * @returns {string}
 */
export function finalize_schedule_cancel_json(prepared_json, r, s, v, expected_signer) {
    let deferred6_0;
    let deferred6_1;
    try {
        const ptr0 = passStringToWasm0(prepared_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(r, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ptr3 = passStringToWasm0(expected_signer, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len3 = WASM_VECTOR_LEN;
        const ret = wasm.finalize_schedule_cancel_json(ptr0, len0, ptr1, len1, ptr2, len2, v, ptr3, len3);
        var ptr5 = ret[0];
        var len5 = ret[1];
        if (ret[3]) {
            ptr5 = 0; len5 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred6_0 = ptr5;
        deferred6_1 = len5;
        return getStringFromWasm0(ptr5, len5);
    } finally {
        wasm.__wbindgen_free(deferred6_0, deferred6_1, 1);
    }
}

/**
 * Verifies and finalizes a generalized asset transfer.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid prepared JSON, signature, signer,
 * context mismatch, or modified artifacts.
 * @param {string} prepared_json
 * @param {string} r
 * @param {string} s
 * @param {number} v
 * @param {string} expected_signer
 * @returns {string}
 */
export function finalize_send_asset_json(prepared_json, r, s, v, expected_signer) {
    let deferred6_0;
    let deferred6_1;
    try {
        const ptr0 = passStringToWasm0(prepared_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(r, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ptr3 = passStringToWasm0(expected_signer, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len3 = WASM_VECTOR_LEN;
        const ret = wasm.finalize_send_asset_json(ptr0, len0, ptr1, len1, ptr2, len2, v, ptr3, len3);
        var ptr5 = ret[0];
        var len5 = ret[1];
        if (ret[3]) {
            ptr5 = 0; len5 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred6_0 = ptr5;
        deferred6_1 = len5;
        return getStringFromWasm0(ptr5, len5);
    } finally {
        wasm.__wbindgen_free(deferred6_0, deferred6_1, 1);
    }
}

/**
 * Verifies and finalizes referral-code registration.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid prepared JSON, signature, signer, or
 * modified artifacts.
 * @param {string} prepared_json
 * @param {string} r
 * @param {string} s
 * @param {number} v
 * @param {string} expected_signer
 * @returns {string}
 */
export function finalize_set_referrer_json(prepared_json, r, s, v, expected_signer) {
    let deferred6_0;
    let deferred6_1;
    try {
        const ptr0 = passStringToWasm0(prepared_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(r, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ptr3 = passStringToWasm0(expected_signer, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len3 = WASM_VECTOR_LEN;
        const ret = wasm.finalize_set_referrer_json(ptr0, len0, ptr1, len1, ptr2, len2, v, ptr3, len3);
        var ptr5 = ret[0];
        var len5 = ret[1];
        if (ret[3]) {
            ptr5 = 0; len5 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred6_0 = ptr5;
        deferred6_1 = len5;
        return getStringFromWasm0(ptr5, len5);
    } finally {
        wasm.__wbindgen_free(deferred6_0, deferred6_1, 1);
    }
}

/**
 * Verifies and finalizes a Spot deployer action.
 *
 * # Errors
 * Returns a JavaScript error for invalid prepared JSON, signature, or artifacts.
 * @param {string} prepared_json
 * @param {string} r
 * @param {string} s
 * @param {number} v
 * @param {string} expected_signer
 * @returns {string}
 */
export function finalize_spot_deploy_json(prepared_json, r, s, v, expected_signer) {
    let deferred6_0;
    let deferred6_1;
    try {
        const ptr0 = passStringToWasm0(prepared_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(r, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ptr3 = passStringToWasm0(expected_signer, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len3 = WASM_VECTOR_LEN;
        const ret = wasm.finalize_spot_deploy_json(ptr0, len0, ptr1, len1, ptr2, len2, v, ptr3, len3);
        var ptr5 = ret[0];
        var len5 = ret[1];
        if (ret[3]) {
            ptr5 = 0; len5 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred6_0 = ptr5;
        deferred6_1 = len5;
        return getStringFromWasm0(ptr5, len5);
    } finally {
        wasm.__wbindgen_free(deferred6_0, deferred6_1, 1);
    }
}

/**
 * Verifies and finalizes a Core spot asset transfer.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid prepared JSON, signature, signer,
 * context mismatch, or modified artifacts.
 * @param {string} prepared_json
 * @param {string} r
 * @param {string} s
 * @param {number} v
 * @param {string} expected_signer
 * @returns {string}
 */
export function finalize_spot_send_json(prepared_json, r, s, v, expected_signer) {
    let deferred6_0;
    let deferred6_1;
    try {
        const ptr0 = passStringToWasm0(prepared_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(r, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ptr3 = passStringToWasm0(expected_signer, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len3 = WASM_VECTOR_LEN;
        const ret = wasm.finalize_spot_send_json(ptr0, len0, ptr1, len1, ptr2, len2, v, ptr3, len3);
        var ptr5 = ret[0];
        var len5 = ret[1];
        if (ret[3]) {
            ptr5 = 0; len5 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred6_0 = ptr5;
        deferred6_1 = len5;
        return getStringFromWasm0(ptr5, len5);
    } finally {
        wasm.__wbindgen_free(deferred6_0, deferred6_1, 1);
    }
}

/**
 * Verifies and finalizes a spot-token subaccount transfer.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid prepared JSON, signature, signer, or
 * modified artifacts.
 * @param {string} prepared_json
 * @param {string} r
 * @param {string} s
 * @param {number} v
 * @param {string} expected_signer
 * @returns {string}
 */
export function finalize_sub_account_spot_transfer_json(prepared_json, r, s, v, expected_signer) {
    let deferred6_0;
    let deferred6_1;
    try {
        const ptr0 = passStringToWasm0(prepared_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(r, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ptr3 = passStringToWasm0(expected_signer, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len3 = WASM_VECTOR_LEN;
        const ret = wasm.finalize_sub_account_spot_transfer_json(ptr0, len0, ptr1, len1, ptr2, len2, v, ptr3, len3);
        var ptr5 = ret[0];
        var len5 = ret[1];
        if (ret[3]) {
            ptr5 = 0; len5 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred6_0 = ptr5;
        deferred6_1 = len5;
        return getStringFromWasm0(ptr5, len5);
    } finally {
        wasm.__wbindgen_free(deferred6_0, deferred6_1, 1);
    }
}

/**
 * Verifies and finalizes a USD subaccount transfer.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid prepared JSON, signature, signer, or
 * modified artifacts.
 * @param {string} prepared_json
 * @param {string} r
 * @param {string} s
 * @param {number} v
 * @param {string} expected_signer
 * @returns {string}
 */
export function finalize_sub_account_transfer_json(prepared_json, r, s, v, expected_signer) {
    let deferred6_0;
    let deferred6_1;
    try {
        const ptr0 = passStringToWasm0(prepared_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(r, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ptr3 = passStringToWasm0(expected_signer, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len3 = WASM_VECTOR_LEN;
        const ret = wasm.finalize_sub_account_transfer_json(ptr0, len0, ptr1, len1, ptr2, len2, v, ptr3, len3);
        var ptr5 = ret[0];
        var len5 = ret[1];
        if (ret[3]) {
            ptr5 = 0; len5 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred6_0 = ptr5;
        deferred6_1 = len5;
        return getStringFromWasm0(ptr5, len5);
    } finally {
        wasm.__wbindgen_free(deferred6_0, deferred6_1, 1);
    }
}

/**
 * Verifies and finalizes a validator delegation or undelegation.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid prepared JSON, signature, signer,
 * context mismatch, or modified artifacts.
 * @param {string} prepared_json
 * @param {string} r
 * @param {string} s
 * @param {number} v
 * @param {string} expected_signer
 * @returns {string}
 */
export function finalize_token_delegate_json(prepared_json, r, s, v, expected_signer) {
    let deferred6_0;
    let deferred6_1;
    try {
        const ptr0 = passStringToWasm0(prepared_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(r, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ptr3 = passStringToWasm0(expected_signer, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len3 = WASM_VECTOR_LEN;
        const ret = wasm.finalize_token_delegate_json(ptr0, len0, ptr1, len1, ptr2, len2, v, ptr3, len3);
        var ptr5 = ret[0];
        var len5 = ret[1];
        if (ret[3]) {
            ptr5 = 0; len5 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred6_0 = ptr5;
        deferred6_1 = len5;
        return getStringFromWasm0(ptr5, len5);
    } finally {
        wasm.__wbindgen_free(deferred6_0, deferred6_1, 1);
    }
}

/**
 * Verifies and finalizes an isolated-only margin top-up.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid prepared JSON, signature, signer, or
 * modified artifacts.
 * @param {string} prepared_json
 * @param {string} r
 * @param {string} s
 * @param {number} v
 * @param {string} expected_signer
 * @returns {string}
 */
export function finalize_top_up_isolated_only_margin_json(prepared_json, r, s, v, expected_signer) {
    let deferred6_0;
    let deferred6_1;
    try {
        const ptr0 = passStringToWasm0(prepared_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(r, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ptr3 = passStringToWasm0(expected_signer, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len3 = WASM_VECTOR_LEN;
        const ret = wasm.finalize_top_up_isolated_only_margin_json(ptr0, len0, ptr1, len1, ptr2, len2, v, ptr3, len3);
        var ptr5 = ret[0];
        var len5 = ret[1];
        if (ret[3]) {
            ptr5 = 0; len5 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred6_0 = ptr5;
        deferred6_1 = len5;
        return getStringFromWasm0(ptr5, len5);
    } finally {
        wasm.__wbindgen_free(deferred6_0, deferred6_1, 1);
    }
}

/**
 * Verifies and finalizes a native TWAP cancellation.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid prepared JSON, signature, signer, or
 * modified artifacts.
 * @param {string} prepared_json
 * @param {string} r
 * @param {string} s
 * @param {number} v
 * @param {string} expected_signer
 * @returns {string}
 */
export function finalize_twap_cancel_json(prepared_json, r, s, v, expected_signer) {
    let deferred6_0;
    let deferred6_1;
    try {
        const ptr0 = passStringToWasm0(prepared_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(r, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ptr3 = passStringToWasm0(expected_signer, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len3 = WASM_VECTOR_LEN;
        const ret = wasm.finalize_twap_cancel_json(ptr0, len0, ptr1, len1, ptr2, len2, v, ptr3, len3);
        var ptr5 = ret[0];
        var len5 = ret[1];
        if (ret[3]) {
            ptr5 = 0; len5 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred6_0 = ptr5;
        deferred6_1 = len5;
        return getStringFromWasm0(ptr5, len5);
    } finally {
        wasm.__wbindgen_free(deferred6_0, deferred6_1, 1);
    }
}

/**
 * Verifies and finalizes a native TWAP order.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid prepared JSON, signature, signer, or
 * modified artifacts.
 * @param {string} prepared_json
 * @param {string} r
 * @param {string} s
 * @param {number} v
 * @param {string} expected_signer
 * @returns {string}
 */
export function finalize_twap_order_json(prepared_json, r, s, v, expected_signer) {
    let deferred6_0;
    let deferred6_1;
    try {
        const ptr0 = passStringToWasm0(prepared_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(r, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ptr3 = passStringToWasm0(expected_signer, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len3 = WASM_VECTOR_LEN;
        const ret = wasm.finalize_twap_order_json(ptr0, len0, ptr1, len1, ptr2, len2, v, ptr3, len3);
        var ptr5 = ret[0];
        var len5 = ret[1];
        if (ret[3]) {
            ptr5 = 0; len5 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred6_0 = ptr5;
        deferred6_1 = len5;
        return getStringFromWasm0(ptr5, len5);
    } finally {
        wasm.__wbindgen_free(deferred6_0, deferred6_1, 1);
    }
}

/**
 * Verifies and finalizes an isolated-margin delta.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid prepared JSON, signature, signer, or
 * modified artifacts.
 * @param {string} prepared_json
 * @param {string} r
 * @param {string} s
 * @param {number} v
 * @param {string} expected_signer
 * @returns {string}
 */
export function finalize_update_isolated_margin_json(prepared_json, r, s, v, expected_signer) {
    let deferred6_0;
    let deferred6_1;
    try {
        const ptr0 = passStringToWasm0(prepared_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(r, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ptr3 = passStringToWasm0(expected_signer, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len3 = WASM_VECTOR_LEN;
        const ret = wasm.finalize_update_isolated_margin_json(ptr0, len0, ptr1, len1, ptr2, len2, v, ptr3, len3);
        var ptr5 = ret[0];
        var len5 = ret[1];
        if (ret[3]) {
            ptr5 = 0; len5 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred6_0 = ptr5;
        deferred6_1 = len5;
        return getStringFromWasm0(ptr5, len5);
    } finally {
        wasm.__wbindgen_free(deferred6_0, deferred6_1, 1);
    }
}

/**
 * Verifies and finalizes a leverage update.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid prepared JSON, signature, signer, or
 * modified artifacts.
 * @param {string} prepared_json
 * @param {string} r
 * @param {string} s
 * @param {number} v
 * @param {string} expected_signer
 * @returns {string}
 */
export function finalize_update_leverage_json(prepared_json, r, s, v, expected_signer) {
    let deferred6_0;
    let deferred6_1;
    try {
        const ptr0 = passStringToWasm0(prepared_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(r, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ptr3 = passStringToWasm0(expected_signer, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len3 = WASM_VECTOR_LEN;
        const ret = wasm.finalize_update_leverage_json(ptr0, len0, ptr1, len1, ptr2, len2, v, ptr3, len3);
        var ptr5 = ret[0];
        var len5 = ret[1];
        if (ret[3]) {
            ptr5 = 0; len5 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred6_0 = ptr5;
        deferred6_1 = len5;
        return getStringFromWasm0(ptr5, len5);
    } finally {
        wasm.__wbindgen_free(deferred6_0, deferred6_1, 1);
    }
}

/**
 * Verifies and finalizes a spot/perp USD class transfer.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid prepared JSON, signature, signer,
 * context mismatch, or modified artifacts.
 * @param {string} prepared_json
 * @param {string} r
 * @param {string} s
 * @param {number} v
 * @param {string} expected_signer
 * @returns {string}
 */
export function finalize_usd_class_transfer_json(prepared_json, r, s, v, expected_signer) {
    let deferred6_0;
    let deferred6_1;
    try {
        const ptr0 = passStringToWasm0(prepared_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(r, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ptr3 = passStringToWasm0(expected_signer, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len3 = WASM_VECTOR_LEN;
        const ret = wasm.finalize_usd_class_transfer_json(ptr0, len0, ptr1, len1, ptr2, len2, v, ptr3, len3);
        var ptr5 = ret[0];
        var len5 = ret[1];
        if (ret[3]) {
            ptr5 = 0; len5 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred6_0 = ptr5;
        deferred6_1 = len5;
        return getStringFromWasm0(ptr5, len5);
    } finally {
        wasm.__wbindgen_free(deferred6_0, deferred6_1, 1);
    }
}

/**
 * Verifies and finalizes a Core USDC transfer.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid prepared JSON, signature, signer,
 * context mismatch, or modified artifacts.
 * @param {string} prepared_json
 * @param {string} r
 * @param {string} s
 * @param {number} v
 * @param {string} expected_signer
 * @returns {string}
 */
export function finalize_usd_send_json(prepared_json, r, s, v, expected_signer) {
    let deferred6_0;
    let deferred6_1;
    try {
        const ptr0 = passStringToWasm0(prepared_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(r, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ptr3 = passStringToWasm0(expected_signer, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len3 = WASM_VECTOR_LEN;
        const ret = wasm.finalize_usd_send_json(ptr0, len0, ptr1, len1, ptr2, len2, v, ptr3, len3);
        var ptr5 = ret[0];
        var len5 = ret[1];
        if (ret[3]) {
            ptr5 = 0; len5 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred6_0 = ptr5;
        deferred6_1 = len5;
        return getStringFromWasm0(ptr5, len5);
    } finally {
        wasm.__wbindgen_free(deferred6_0, deferred6_1, 1);
    }
}

/**
 * Verifies and finalizes the legacy user DEX-abstraction toggle.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid prepared JSON, signature, signer,
 * context mismatch, or modified artifacts.
 * @param {string} prepared_json
 * @param {string} r
 * @param {string} s
 * @param {number} v
 * @param {string} expected_signer
 * @returns {string}
 */
export function finalize_user_dex_abstraction_json(prepared_json, r, s, v, expected_signer) {
    let deferred6_0;
    let deferred6_1;
    try {
        const ptr0 = passStringToWasm0(prepared_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(r, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ptr3 = passStringToWasm0(expected_signer, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len3 = WASM_VECTOR_LEN;
        const ret = wasm.finalize_user_dex_abstraction_json(ptr0, len0, ptr1, len1, ptr2, len2, v, ptr3, len3);
        var ptr5 = ret[0];
        var len5 = ret[1];
        if (ret[3]) {
            ptr5 = 0; len5 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred6_0 = ptr5;
        deferred6_1 = len5;
        return getStringFromWasm0(ptr5, len5);
    } finally {
        wasm.__wbindgen_free(deferred6_0, deferred6_1, 1);
    }
}

/**
 * Verifies and finalizes an account-abstraction mode update.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid prepared JSON, signature, signer,
 * context mismatch, or modified artifacts.
 * @param {string} prepared_json
 * @param {string} r
 * @param {string} s
 * @param {number} v
 * @param {string} expected_signer
 * @returns {string}
 */
export function finalize_user_set_abstraction_json(prepared_json, r, s, v, expected_signer) {
    let deferred6_0;
    let deferred6_1;
    try {
        const ptr0 = passStringToWasm0(prepared_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(r, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ptr3 = passStringToWasm0(expected_signer, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len3 = WASM_VECTOR_LEN;
        const ret = wasm.finalize_user_set_abstraction_json(ptr0, len0, ptr1, len1, ptr2, len2, v, ptr3, len3);
        var ptr5 = ret[0];
        var len5 = ret[1];
        if (ret[3]) {
            ptr5 = 0; len5 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred6_0 = ptr5;
        deferred6_1 = len5;
        return getStringFromWasm0(ptr5, len5);
    } finally {
        wasm.__wbindgen_free(deferred6_0, deferred6_1, 1);
    }
}

/**
 * Verifies and finalizes a vault USD transfer.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid prepared JSON, signature, signer, or
 * modified artifacts.
 * @param {string} prepared_json
 * @param {string} r
 * @param {string} s
 * @param {number} v
 * @param {string} expected_signer
 * @returns {string}
 */
export function finalize_vault_transfer_json(prepared_json, r, s, v, expected_signer) {
    let deferred6_0;
    let deferred6_1;
    try {
        const ptr0 = passStringToWasm0(prepared_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(r, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ptr3 = passStringToWasm0(expected_signer, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len3 = WASM_VECTOR_LEN;
        const ret = wasm.finalize_vault_transfer_json(ptr0, len0, ptr1, len1, ptr2, len2, v, ptr3, len3);
        var ptr5 = ret[0];
        var len5 = ret[1];
        if (ret[3]) {
            ptr5 = 0; len5 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred6_0 = ptr5;
        deferred6_1 = len5;
        return getStringFromWasm0(ptr5, len5);
    } finally {
        wasm.__wbindgen_free(deferred6_0, deferred6_1, 1);
    }
}

/**
 * Verifies and finalizes a bridge withdrawal.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid prepared JSON, signature, signer,
 * context mismatch, or modified artifacts.
 * @param {string} prepared_json
 * @param {string} r
 * @param {string} s
 * @param {number} v
 * @param {string} expected_signer
 * @returns {string}
 */
export function finalize_withdraw_json(prepared_json, r, s, v, expected_signer) {
    let deferred6_0;
    let deferred6_1;
    try {
        const ptr0 = passStringToWasm0(prepared_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(r, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ptr3 = passStringToWasm0(expected_signer, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len3 = WASM_VECTOR_LEN;
        const ret = wasm.finalize_withdraw_json(ptr0, len0, ptr1, len1, ptr2, len2, v, ptr3, len3);
        var ptr5 = ret[0];
        var len5 = ret[1];
        if (ret[3]) {
            ptr5 = 0; len5 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred6_0 = ptr5;
        deferred6_1 = len5;
        return getStringFromWasm0(ptr5, len5);
    } finally {
        wasm.__wbindgen_free(deferred6_0, deferred6_1, 1);
    }
}

/**
 * Returns retry guidance for a host networking failure.
 *
 * # Errors
 *
 * Returns a JavaScript error for unsupported request/failure names or an
 * unexpected serialization failure.
 * @param {string} request_kind
 * @param {string} failure
 * @returns {string}
 */
export function host_failure_retry_advice(request_kind, failure) {
    let deferred4_0;
    let deferred4_1;
    try {
        const ptr0 = passStringToWasm0(request_kind, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(failure, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.host_failure_retry_advice(ptr0, len0, ptr1, len1);
        var ptr3 = ret[0];
        var len3 = ret[1];
        if (ret[3]) {
            ptr3 = 0; len3 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred4_0 = ptr3;
        deferred4_1 = len3;
        return getStringFromWasm0(ptr3, len3);
    } finally {
        wasm.__wbindgen_free(deferred4_0, deferred4_1, 1);
    }
}

/**
 * Canonicalizes an exact decimal without JavaScript `Number` conversion.
 *
 * # Errors
 *
 * Returns a JavaScript error when `value` is not a supported protocol decimal.
 * @param {string} value
 * @returns {string}
 */
export function normalize_decimal(value) {
    let deferred3_0;
    let deferred3_1;
    try {
        const ptr0 = passStringToWasm0(value, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.normalize_decimal(ptr0, len0);
        var ptr2 = ret[0];
        var len2 = ret[1];
        if (ret[3]) {
            ptr2 = 0; len2 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred3_0 = ptr2;
        deferred3_1 = len2;
        return getStringFromWasm0(ptr2, len2);
    } finally {
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
}

/**
 * Parses and classifies an HTTP response as stable JSON.
 *
 * # Errors
 *
 * Returns a JavaScript error for an unsupported request kind or serialization
 * failure.
 * @param {string} request_kind
 * @param {number} status_code
 * @param {string} body
 * @returns {string}
 */
export function parse_http_response_json(request_kind, status_code, body) {
    let deferred4_0;
    let deferred4_1;
    try {
        const ptr0 = passStringToWasm0(request_kind, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(body, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.parse_http_response_json(ptr0, len0, status_code, ptr1, len1);
        var ptr3 = ret[0];
        var len3 = ret[1];
        if (ret[3]) {
            ptr3 = 0; len3 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred4_0 = ptr3;
        deferred4_1 = len3;
        return getStringFromWasm0(ptr3, len3);
    } finally {
        wasm.__wbindgen_free(deferred4_0, deferred4_1, 1);
    }
}

/**
 * Parses one inbound WebSocket message into stable JSON.
 *
 * # Errors
 *
 * Returns a JavaScript error for malformed messages or serialization failure.
 * @param {string} message
 * @returns {string}
 */
export function parse_websocket_message_json(message) {
    let deferred3_0;
    let deferred3_1;
    try {
        const ptr0 = passStringToWasm0(message, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.parse_websocket_message_json(ptr0, len0);
        var ptr2 = ret[0];
        var len2 = ret[1];
        if (ret[3]) {
            ptr2 = 0; len2 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred3_0 = ptr2;
        deferred3_1 = len2;
        return getStringFromWasm0(ptr2, len2);
    } finally {
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
}

/**
 * Prepares legacy DEX-abstraction enablement for an agent.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid JSON, address, nonce, or signing
 * context.
 * @param {string} request_json
 * @returns {string}
 */
export function prepare_agent_enable_dex_abstraction_json(request_json) {
    let deferred3_0;
    let deferred3_1;
    try {
        const ptr0 = passStringToWasm0(request_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.prepare_agent_enable_dex_abstraction_json(ptr0, len0);
        var ptr2 = ret[0];
        var len2 = ret[1];
        if (ret[3]) {
            ptr2 = 0; len2 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred3_0 = ptr2;
        deferred3_1 = len2;
        return getStringFromWasm0(ptr2, len2);
    } finally {
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
}

/**
 * Prepares an agent account-abstraction mode update.
 *
 * Accepted `abstraction` wire values are `i`, `u`, and `p`.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid JSON, mode, address, nonce, or
 * signing context.
 * @param {string} request_json
 * @returns {string}
 */
export function prepare_agent_set_abstraction_json(request_json) {
    let deferred3_0;
    let deferred3_1;
    try {
        const ptr0 = passStringToWasm0(request_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.prepare_agent_set_abstraction_json(ptr0, len0);
        var ptr2 = ret[0];
        var len2 = ret[1];
        if (ret[3]) {
            ptr2 = 0; len2 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred3_0 = ptr2;
        deferred3_1 = len2;
        return getStringFromWasm0(ptr2, len2);
    } finally {
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
}

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
 * @param {string} request_json
 * @returns {string}
 */
export function prepare_approve_agent_json(request_json) {
    let deferred3_0;
    let deferred3_1;
    try {
        const ptr0 = passStringToWasm0(request_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.prepare_approve_agent_json(ptr0, len0);
        var ptr2 = ret[0];
        var len2 = ret[1];
        if (ret[3]) {
            ptr2 = 0; len2 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred3_0 = ptr2;
        deferred3_1 = len2;
        return getStringFromWasm0(ptr2, len2);
    } finally {
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
}

/**
 * Prepares a builder fee authorization from strict camelCase JSON.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid JSON, builder address, exact percent
 * string, nonce, or serialization.
 * @param {string} request_json
 * @returns {string}
 */
export function prepare_approve_builder_fee_json(request_json) {
    let deferred3_0;
    let deferred3_1;
    try {
        const ptr0 = passStringToWasm0(request_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.prepare_approve_builder_fee_json(ptr0, len0);
        var ptr2 = ret[0];
        var len2 = ret[1];
        if (ret[3]) {
            ptr2 = 0; len2 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred3_0 = ptr2;
        deferred3_1 = len2;
        return getStringFromWasm0(ptr2, len2);
    } finally {
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
}

/**
 * Prepares a batch of complete order replacements from strict camelCase JSON.
 *
 * An `oid` selector is either a decimal string or a 128-bit Cloid string.
 *
 * # Errors
 *
 * Returns a JavaScript error for malformed JSON or any failed protocol rule.
 * @param {string} request_json
 * @returns {string}
 */
export function prepare_batch_modify_json(request_json) {
    let deferred3_0;
    let deferred3_1;
    try {
        const ptr0 = passStringToWasm0(request_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.prepare_batch_modify_json(ptr0, len0);
        var ptr2 = ret[0];
        var len2 = ret[1];
        if (ret[3]) {
            ptr2 = 0; len2 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred3_0 = ptr2;
        deferred3_1 = len2;
        return getStringFromWasm0(ptr2, len2);
    } finally {
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
}

/**
 * Prepares an atomic limit-order batch from strict camelCase JSON.
 *
 * All `u64` values, including `nonce` and `expiresAfter`, must be decimal
 * strings. OIDs are also strings; asset IDs and builder fees remain numbers.
 *
 * # Errors
 *
 * Returns a JavaScript error for malformed JSON or any failed protocol rule.
 * @param {string} request_json
 * @returns {string}
 */
export function prepare_batch_orders_json(request_json) {
    let deferred3_0;
    let deferred3_1;
    try {
        const ptr0 = passStringToWasm0(request_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.prepare_batch_orders_json(ptr0, len0);
        var ptr2 = ret[0];
        var len2 = ret[1];
        if (ret[3]) {
            ptr2 = 0; len2 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred3_0 = ptr2;
        deferred3_1 = len2;
        return getStringFromWasm0(ptr2, len2);
    } finally {
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
}

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
 * @param {string} request_json
 * @returns {string}
 */
export function prepare_c_deposit_json(request_json) {
    let deferred3_0;
    let deferred3_1;
    try {
        const ptr0 = passStringToWasm0(request_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.prepare_c_deposit_json(ptr0, len0);
        var ptr2 = ret[0];
        var len2 = ret[1];
        if (ret[3]) {
            ptr2 = 0; len2 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred3_0 = ptr2;
        deferred3_1 = len2;
        return getStringFromWasm0(ptr2, len2);
    } finally {
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
}

/**
 * Prepares signer-node jail or unjail self-management from JSON.
 *
 * # Errors
 * Returns a JavaScript error for invalid JSON or signing context.
 * @param {string} request_json
 * @returns {string}
 */
export function prepare_c_signer_json(request_json) {
    let deferred3_0;
    let deferred3_1;
    try {
        const ptr0 = passStringToWasm0(request_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.prepare_c_signer_json(ptr0, len0);
        var ptr2 = ret[0];
        var len2 = ret[1];
        if (ret[3]) {
            ptr2 = 0; len2 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred3_0 = ptr2;
        deferred3_1 = len2;
        return getStringFromWasm0(ptr2, len2);
    } finally {
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
}

/**
 * Prepares a consensus validator profile update from JSON.
 *
 * # Errors
 * Returns a JavaScript error for invalid JSON, profile data, or signing context.
 * @param {string} request_json
 * @returns {string}
 */
export function prepare_c_validator_change_profile_json(request_json) {
    let deferred3_0;
    let deferred3_1;
    try {
        const ptr0 = passStringToWasm0(request_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.prepare_c_validator_change_profile_json(ptr0, len0);
        var ptr2 = ret[0];
        var len2 = ret[1];
        if (ret[3]) {
            ptr2 = 0; len2 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred3_0 = ptr2;
        deferred3_1 = len2;
        return getStringFromWasm0(ptr2, len2);
    } finally {
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
}

/**
 * Prepares consensus validator registration from JSON.
 *
 * # Errors
 * Returns a JavaScript error for invalid JSON, profile data, or signing context.
 * @param {string} request_json
 * @returns {string}
 */
export function prepare_c_validator_register_json(request_json) {
    let deferred3_0;
    let deferred3_1;
    try {
        const ptr0 = passStringToWasm0(request_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.prepare_c_validator_register_json(ptr0, len0);
        var ptr2 = ret[0];
        var len2 = ret[1];
        if (ret[3]) {
            ptr2 = 0; len2 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred3_0 = ptr2;
        deferred3_1 = len2;
        return getStringFromWasm0(ptr2, len2);
    } finally {
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
}

/**
 * Prepares consensus validator unregistration from JSON.
 *
 * # Errors
 * Returns a JavaScript error for invalid JSON or signing context.
 * @param {string} request_json
 * @returns {string}
 */
export function prepare_c_validator_unregister_json(request_json) {
    let deferred3_0;
    let deferred3_1;
    try {
        const ptr0 = passStringToWasm0(request_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.prepare_c_validator_unregister_json(ptr0, len0);
        var ptr2 = ret[0];
        var len2 = ret[1];
        if (ret[3]) {
            ptr2 = 0; len2 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred3_0 = ptr2;
        deferred3_1 = len2;
        return getStringFromWasm0(ptr2, len2);
    } finally {
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
}

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
 * @param {string} request_json
 * @returns {string}
 */
export function prepare_c_withdraw_json(request_json) {
    let deferred3_0;
    let deferred3_1;
    try {
        const ptr0 = passStringToWasm0(request_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.prepare_c_withdraw_json(ptr0, len0);
        var ptr2 = ret[0];
        var len2 = ret[1];
        if (ret[3]) {
            ptr2 = 0; len2 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred3_0 = ptr2;
        deferred3_1 = len2;
        return getStringFromWasm0(ptr2, len2);
    } finally {
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
}

/**
 * Prepares a cancellation batch by 128-bit Cloid from strict camelCase JSON.
 *
 * # Errors
 *
 * Returns a JavaScript error for malformed JSON or any failed protocol rule.
 * @param {string} request_json
 * @returns {string}
 */
export function prepare_cancel_by_cloid_json(request_json) {
    let deferred3_0;
    let deferred3_1;
    try {
        const ptr0 = passStringToWasm0(request_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.prepare_cancel_by_cloid_json(ptr0, len0);
        var ptr2 = ret[0];
        var len2 = ret[1];
        if (ret[3]) {
            ptr2 = 0; len2 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred3_0 = ptr2;
        deferred3_1 = len2;
        return getStringFromWasm0(ptr2, len2);
    } finally {
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
}

/**
 * Prepares a cancellation batch by exchange OID from strict camelCase JSON.
 *
 * # Errors
 *
 * Returns a JavaScript error for malformed JSON or any failed protocol rule.
 * @param {string} request_json
 * @returns {string}
 */
export function prepare_cancel_json(request_json) {
    let deferred3_0;
    let deferred3_1;
    try {
        const ptr0 = passStringToWasm0(request_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.prepare_cancel_json(ptr0, len0);
        var ptr2 = ret[0];
        var len2 = ret[1];
        if (ret[3]) {
            ptr2 = 0; len2 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred3_0 = ptr2;
        deferred3_1 = len2;
        return getStringFromWasm0(ptr2, len2);
    } finally {
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
}

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
 * @param {string} request_json
 * @returns {string}
 */
export function prepare_convert_to_multi_sig_user_json(request_json) {
    let deferred3_0;
    let deferred3_1;
    try {
        const ptr0 = passStringToWasm0(request_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.prepare_convert_to_multi_sig_user_json(ptr0, len0);
        var ptr2 = ret[0];
        var len2 = ret[1];
        if (ret[3]) {
            ptr2 = 0; len2 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred3_0 = ptr2;
        deferred3_1 = len2;
        return getStringFromWasm0(ptr2, len2);
    } finally {
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
}

/**
 * Prepares named-subaccount creation from strict camelCase JSON.
 *
 * `nonce` and optional `expiresAfter` must be unsigned decimal strings.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid names, integer strings, or signing
 * context.
 * @param {string} request_json
 * @returns {string}
 */
export function prepare_create_sub_account_json(request_json) {
    let deferred3_0;
    let deferred3_1;
    try {
        const ptr0 = passStringToWasm0(request_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.prepare_create_sub_account_json(ptr0, len0);
        var ptr2 = ret[0];
        var len2 = ret[1];
        if (ret[3]) {
            ptr2 = 0; len2 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred3_0 = ptr2;
        deferred3_1 = len2;
        return getStringFromWasm0(ptr2, len2);
    } finally {
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
}

/**
 * Prepares an EVM large-block preference update from strict camelCase JSON.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid JSON, nonce, or signing context.
 * @param {string} request_json
 * @returns {string}
 */
export function prepare_evm_user_modify_json(request_json) {
    let deferred3_0;
    let deferred3_1;
    try {
        const ptr0 = passStringToWasm0(request_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.prepare_evm_user_modify_json(ptr0, len0);
        var ptr2 = ret[0];
        var len2 = ret[1];
        if (ret[3]) {
            ptr2 = 0; len2 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred3_0 = ptr2;
        deferred3_1 = len2;
        return getStringFromWasm0(ptr2, len2);
    } finally {
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
}

/**
 * Prepares a gossip priority gas bid from JSON.
 *
 * # Errors
 * Returns a JavaScript error for invalid JSON, bid data, or signing context.
 * @param {string} request_json
 * @returns {string}
 */
export function prepare_gossip_priority_bid_json(request_json) {
    let deferred3_0;
    let deferred3_1;
    try {
        const ptr0 = passStringToWasm0(request_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.prepare_gossip_priority_bid_json(ptr0, len0);
        var ptr2 = ret[0];
        var len2 = ret[1];
        if (ret[3]) {
            ptr2 = 0; len2 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred3_0 = ptr2;
        deferred3_1 = len2;
        return getStringFromWasm0(ptr2, len2);
    } finally {
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
}

/**
 * Validates a typed Info query and returns its canonical wire body.
 *
 * Timestamps and OIDs in `query_json` must be decimal strings.
 *
 * # Errors
 *
 * Returns a JavaScript error for malformed JSON or invalid query fields.
 * @param {string} query_json
 * @returns {string}
 */
export function prepare_info_query_json(query_json) {
    let deferred3_0;
    let deferred3_1;
    try {
        const ptr0 = passStringToWasm0(query_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.prepare_info_query_json(ptr0, len0);
        var ptr2 = ret[0];
        var len2 = ret[1];
        if (ret[3]) {
            ptr2 = 0; len2 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred3_0 = ptr2;
        deferred3_1 = len2;
        return getStringFromWasm0(ptr2, len2);
    } finally {
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
}

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
 * @param {string} network
 * @param {number} asset
 * @param {string} market_kind
 * @param {number} sz_decimals
 * @param {string} side
 * @param {string} limit_price
 * @param {string} order_size
 * @param {boolean} reduce_only
 * @param {string} time_in_force
 * @param {string} nonce
 * @param {string | null} [vault_address]
 * @param {string | null} [expires_after]
 * @returns {string}
 */
export function prepare_limit_order_json(network, asset, market_kind, sz_decimals, side, limit_price, order_size, reduce_only, time_in_force, nonce, vault_address, expires_after) {
    let deferred11_0;
    let deferred11_1;
    try {
        const ptr0 = passStringToWasm0(network, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(market_kind, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(side, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ptr3 = passStringToWasm0(limit_price, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len3 = WASM_VECTOR_LEN;
        const ptr4 = passStringToWasm0(order_size, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len4 = WASM_VECTOR_LEN;
        const ptr5 = passStringToWasm0(time_in_force, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len5 = WASM_VECTOR_LEN;
        const ptr6 = passStringToWasm0(nonce, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len6 = WASM_VECTOR_LEN;
        var ptr7 = isLikeNone(vault_address) ? 0 : passStringToWasm0(vault_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len7 = WASM_VECTOR_LEN;
        var ptr8 = isLikeNone(expires_after) ? 0 : passStringToWasm0(expires_after, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len8 = WASM_VECTOR_LEN;
        const ret = wasm.prepare_limit_order_json(ptr0, len0, asset, ptr1, len1, sz_decimals, ptr2, len2, ptr3, len3, ptr4, len4, reduce_only, ptr5, len5, ptr6, len6, ptr7, len7, ptr8, len8);
        var ptr10 = ret[0];
        var len10 = ret[1];
        if (ret[3]) {
            ptr10 = 0; len10 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred11_0 = ptr10;
        deferred11_1 = len10;
        return getStringFromWasm0(ptr10, len10);
    } finally {
        wasm.__wbindgen_free(deferred11_0, deferred11_1, 1);
    }
}

/**
 * Produces the authorized-user digest for legacy agent abstraction.
 *
 * # Errors
 * Returns a JavaScript error for malformed JSON, modified artifacts, or addresses.
 * @param {string} prepared_json
 * @param {string} multi_sig_user
 * @param {string} outer_signer
 * @returns {string}
 */
export function prepare_multi_sig_agent_enable_dex_abstraction_payload_json(prepared_json, multi_sig_user, outer_signer) {
    let deferred5_0;
    let deferred5_1;
    try {
        const ptr0 = passStringToWasm0(prepared_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(multi_sig_user, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(outer_signer, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ret = wasm.prepare_multi_sig_agent_enable_dex_abstraction_payload_json(ptr0, len0, ptr1, len1, ptr2, len2);
        var ptr4 = ret[0];
        var len4 = ret[1];
        if (ret[3]) {
            ptr4 = 0; len4 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred5_0 = ptr4;
        deferred5_1 = len4;
        return getStringFromWasm0(ptr4, len4);
    } finally {
        wasm.__wbindgen_free(deferred5_0, deferred5_1, 1);
    }
}

/**
 * Produces the authorized-user digest for an agent abstraction update.
 *
 * # Errors
 * Returns a JavaScript error for malformed JSON, modified artifacts, or addresses.
 * @param {string} prepared_json
 * @param {string} multi_sig_user
 * @param {string} outer_signer
 * @returns {string}
 */
export function prepare_multi_sig_agent_set_abstraction_payload_json(prepared_json, multi_sig_user, outer_signer) {
    let deferred5_0;
    let deferred5_1;
    try {
        const ptr0 = passStringToWasm0(prepared_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(multi_sig_user, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(outer_signer, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ret = wasm.prepare_multi_sig_agent_set_abstraction_payload_json(ptr0, len0, ptr1, len1, ptr2, len2);
        var ptr4 = ret[0];
        var len4 = ret[1];
        if (ret[3]) {
            ptr4 = 0; len4 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred5_0 = ptr4;
        deferred5_1 = len4;
        return getStringFromWasm0(ptr4, len4);
    } finally {
        wasm.__wbindgen_free(deferred5_0, deferred5_1, 1);
    }
}

/**
 * Produces the authorized-user digest for prepared API-wallet approval.
 *
 * # Errors
 *
 * Returns a JavaScript error for malformed JSON, modified artifacts, or addresses.
 * @param {string} prepared_json
 * @param {string} multi_sig_user
 * @param {string} outer_signer
 * @returns {string}
 */
export function prepare_multi_sig_approve_agent_payload_json(prepared_json, multi_sig_user, outer_signer) {
    let deferred5_0;
    let deferred5_1;
    try {
        const ptr0 = passStringToWasm0(prepared_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(multi_sig_user, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(outer_signer, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ret = wasm.prepare_multi_sig_approve_agent_payload_json(ptr0, len0, ptr1, len1, ptr2, len2);
        var ptr4 = ret[0];
        var len4 = ret[1];
        if (ret[3]) {
            ptr4 = 0; len4 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred5_0 = ptr4;
        deferred5_1 = len4;
        return getStringFromWasm0(ptr4, len4);
    } finally {
        wasm.__wbindgen_free(deferred5_0, deferred5_1, 1);
    }
}

/**
 * Produces the authorized-user digest for prepared builder-fee approval.
 *
 * # Errors
 *
 * Returns a JavaScript error for malformed JSON, modified artifacts, or addresses.
 * @param {string} prepared_json
 * @param {string} multi_sig_user
 * @param {string} outer_signer
 * @returns {string}
 */
export function prepare_multi_sig_approve_builder_fee_payload_json(prepared_json, multi_sig_user, outer_signer) {
    let deferred5_0;
    let deferred5_1;
    try {
        const ptr0 = passStringToWasm0(prepared_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(multi_sig_user, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(outer_signer, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ret = wasm.prepare_multi_sig_approve_builder_fee_payload_json(ptr0, len0, ptr1, len1, ptr2, len2);
        var ptr4 = ret[0];
        var len4 = ret[1];
        if (ret[3]) {
            ptr4 = 0; len4 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred5_0 = ptr4;
        deferred5_1 = len4;
        return getStringFromWasm0(ptr4, len4);
    } finally {
        wasm.__wbindgen_free(deferred5_0, deferred5_1, 1);
    }
}

/**
 * Produces the authorized-user digest for a prepared batch modification.
 *
 * # Errors
 *
 * Returns a JavaScript error for malformed JSON, modified artifacts,
 * addresses, or encoding failure.
 * @param {string} prepared_json
 * @param {string} multi_sig_user
 * @param {string} outer_signer
 * @returns {string}
 */
export function prepare_multi_sig_batch_modify_payload_json(prepared_json, multi_sig_user, outer_signer) {
    let deferred5_0;
    let deferred5_1;
    try {
        const ptr0 = passStringToWasm0(prepared_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(multi_sig_user, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(outer_signer, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ret = wasm.prepare_multi_sig_batch_modify_payload_json(ptr0, len0, ptr1, len1, ptr2, len2);
        var ptr4 = ret[0];
        var len4 = ret[1];
        if (ret[3]) {
            ptr4 = 0; len4 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred5_0 = ptr4;
        deferred5_1 = len4;
        return getStringFromWasm0(ptr4, len4);
    } finally {
        wasm.__wbindgen_free(deferred5_0, deferred5_1, 1);
    }
}

/**
 * Produces the authorized-user digest for a prepared staking deposit.
 *
 * # Errors
 *
 * Returns a JavaScript error for malformed JSON, modified artifacts, or addresses.
 * @param {string} prepared_json
 * @param {string} multi_sig_user
 * @param {string} outer_signer
 * @returns {string}
 */
export function prepare_multi_sig_c_deposit_payload_json(prepared_json, multi_sig_user, outer_signer) {
    let deferred5_0;
    let deferred5_1;
    try {
        const ptr0 = passStringToWasm0(prepared_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(multi_sig_user, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(outer_signer, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ret = wasm.prepare_multi_sig_c_deposit_payload_json(ptr0, len0, ptr1, len1, ptr2, len2);
        var ptr4 = ret[0];
        var len4 = ret[1];
        if (ret[3]) {
            ptr4 = 0; len4 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred5_0 = ptr4;
        deferred5_1 = len4;
        return getStringFromWasm0(ptr4, len4);
    } finally {
        wasm.__wbindgen_free(deferred5_0, deferred5_1, 1);
    }
}

/**
 * Produces the authorized-user digest for signer-node self-management.
 *
 * # Errors
 * Returns a JavaScript error for malformed JSON, modified artifacts, or addresses.
 * @param {string} prepared_json
 * @param {string} multi_sig_user
 * @param {string} outer_signer
 * @returns {string}
 */
export function prepare_multi_sig_c_signer_payload_json(prepared_json, multi_sig_user, outer_signer) {
    let deferred5_0;
    let deferred5_1;
    try {
        const ptr0 = passStringToWasm0(prepared_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(multi_sig_user, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(outer_signer, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ret = wasm.prepare_multi_sig_c_signer_payload_json(ptr0, len0, ptr1, len1, ptr2, len2);
        var ptr4 = ret[0];
        var len4 = ret[1];
        if (ret[3]) {
            ptr4 = 0; len4 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred5_0 = ptr4;
        deferred5_1 = len4;
        return getStringFromWasm0(ptr4, len4);
    } finally {
        wasm.__wbindgen_free(deferred5_0, deferred5_1, 1);
    }
}

/**
 * Produces the authorized-user digest for a validator lifecycle action.
 *
 * # Errors
 * Returns a JavaScript error for malformed JSON, modified artifacts, or addresses.
 * @param {string} prepared_json
 * @param {string} multi_sig_user
 * @param {string} outer_signer
 * @returns {string}
 */
export function prepare_multi_sig_c_validator_payload_json(prepared_json, multi_sig_user, outer_signer) {
    let deferred5_0;
    let deferred5_1;
    try {
        const ptr0 = passStringToWasm0(prepared_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(multi_sig_user, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(outer_signer, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ret = wasm.prepare_multi_sig_c_validator_payload_json(ptr0, len0, ptr1, len1, ptr2, len2);
        var ptr4 = ret[0];
        var len4 = ret[1];
        if (ret[3]) {
            ptr4 = 0; len4 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred5_0 = ptr4;
        deferred5_1 = len4;
        return getStringFromWasm0(ptr4, len4);
    } finally {
        wasm.__wbindgen_free(deferred5_0, deferred5_1, 1);
    }
}

/**
 * Produces the authorized-user digest for a prepared staking withdrawal.
 *
 * # Errors
 *
 * Returns a JavaScript error for malformed JSON, modified artifacts, or addresses.
 * @param {string} prepared_json
 * @param {string} multi_sig_user
 * @param {string} outer_signer
 * @returns {string}
 */
export function prepare_multi_sig_c_withdraw_payload_json(prepared_json, multi_sig_user, outer_signer) {
    let deferred5_0;
    let deferred5_1;
    try {
        const ptr0 = passStringToWasm0(prepared_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(multi_sig_user, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(outer_signer, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ret = wasm.prepare_multi_sig_c_withdraw_payload_json(ptr0, len0, ptr1, len1, ptr2, len2);
        var ptr4 = ret[0];
        var len4 = ret[1];
        if (ret[3]) {
            ptr4 = 0; len4 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred5_0 = ptr4;
        deferred5_1 = len4;
        return getStringFromWasm0(ptr4, len4);
    } finally {
        wasm.__wbindgen_free(deferred5_0, deferred5_1, 1);
    }
}

/**
 * Produces the authorized-user digest for a prepared Cloid cancellation.
 *
 * # Errors
 *
 * Returns a JavaScript error for malformed JSON, modified artifacts,
 * addresses, or encoding failure.
 * @param {string} prepared_json
 * @param {string} multi_sig_user
 * @param {string} outer_signer
 * @returns {string}
 */
export function prepare_multi_sig_cancel_by_cloid_payload_json(prepared_json, multi_sig_user, outer_signer) {
    let deferred5_0;
    let deferred5_1;
    try {
        const ptr0 = passStringToWasm0(prepared_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(multi_sig_user, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(outer_signer, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ret = wasm.prepare_multi_sig_cancel_by_cloid_payload_json(ptr0, len0, ptr1, len1, ptr2, len2);
        var ptr4 = ret[0];
        var len4 = ret[1];
        if (ret[3]) {
            ptr4 = 0; len4 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred5_0 = ptr4;
        deferred5_1 = len4;
        return getStringFromWasm0(ptr4, len4);
    } finally {
        wasm.__wbindgen_free(deferred5_0, deferred5_1, 1);
    }
}

/**
 * Produces the authorized-user digest for a prepared OID cancellation.
 *
 * # Errors
 *
 * Returns a JavaScript error for malformed JSON, modified artifacts,
 * addresses, or encoding failure.
 * @param {string} prepared_json
 * @param {string} multi_sig_user
 * @param {string} outer_signer
 * @returns {string}
 */
export function prepare_multi_sig_cancel_payload_json(prepared_json, multi_sig_user, outer_signer) {
    let deferred5_0;
    let deferred5_1;
    try {
        const ptr0 = passStringToWasm0(prepared_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(multi_sig_user, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(outer_signer, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ret = wasm.prepare_multi_sig_cancel_payload_json(ptr0, len0, ptr1, len1, ptr2, len2);
        var ptr4 = ret[0];
        var len4 = ret[1];
        if (ret[3]) {
            ptr4 = 0; len4 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred5_0 = ptr4;
        deferred5_1 = len4;
        return getStringFromWasm0(ptr4, len4);
    } finally {
        wasm.__wbindgen_free(deferred5_0, deferred5_1, 1);
    }
}

/**
 * Produces the authorized-user digest for named-subaccount creation.
 *
 * # Errors
 * Returns a JavaScript error for malformed JSON, modified artifacts, or addresses.
 * @param {string} prepared_json
 * @param {string} multi_sig_user
 * @param {string} outer_signer
 * @returns {string}
 */
export function prepare_multi_sig_create_sub_account_payload_json(prepared_json, multi_sig_user, outer_signer) {
    let deferred5_0;
    let deferred5_1;
    try {
        const ptr0 = passStringToWasm0(prepared_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(multi_sig_user, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(outer_signer, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ret = wasm.prepare_multi_sig_create_sub_account_payload_json(ptr0, len0, ptr1, len1, ptr2, len2);
        var ptr4 = ret[0];
        var len4 = ret[1];
        if (ret[3]) {
            ptr4 = 0; len4 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred5_0 = ptr4;
        deferred5_1 = len4;
        return getStringFromWasm0(ptr4, len4);
    } finally {
        wasm.__wbindgen_free(deferred5_0, deferred5_1, 1);
    }
}

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
 * @param {string} payload_json
 * @param {string} signatures_json
 * @returns {string}
 */
export function prepare_multi_sig_envelope_json(payload_json, signatures_json) {
    let deferred4_0;
    let deferred4_1;
    try {
        const ptr0 = passStringToWasm0(payload_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(signatures_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.prepare_multi_sig_envelope_json(ptr0, len0, ptr1, len1);
        var ptr3 = ret[0];
        var len3 = ret[1];
        if (ret[3]) {
            ptr3 = 0; len3 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred4_0 = ptr3;
        deferred4_1 = len3;
        return getStringFromWasm0(ptr3, len3);
    } finally {
        wasm.__wbindgen_free(deferred4_0, deferred4_1, 1);
    }
}

/**
 * Produces the authorized-user digest for an EVM-user update.
 *
 * # Errors
 * Returns a JavaScript error for malformed JSON, modified artifacts, or addresses.
 * @param {string} prepared_json
 * @param {string} multi_sig_user
 * @param {string} outer_signer
 * @returns {string}
 */
export function prepare_multi_sig_evm_user_modify_payload_json(prepared_json, multi_sig_user, outer_signer) {
    let deferred5_0;
    let deferred5_1;
    try {
        const ptr0 = passStringToWasm0(prepared_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(multi_sig_user, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(outer_signer, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ret = wasm.prepare_multi_sig_evm_user_modify_payload_json(ptr0, len0, ptr1, len1, ptr2, len2);
        var ptr4 = ret[0];
        var len4 = ret[1];
        if (ret[3]) {
            ptr4 = 0; len4 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred5_0 = ptr4;
        deferred5_1 = len4;
        return getStringFromWasm0(ptr4, len4);
    } finally {
        wasm.__wbindgen_free(deferred5_0, deferred5_1, 1);
    }
}

/**
 * Produces the authorized-user digest for a gossip priority bid.
 *
 * # Errors
 * Returns a JavaScript error for malformed JSON, modified artifacts, or addresses.
 * @param {string} prepared_json
 * @param {string} multi_sig_user
 * @param {string} outer_signer
 * @returns {string}
 */
export function prepare_multi_sig_gossip_priority_bid_payload_json(prepared_json, multi_sig_user, outer_signer) {
    let deferred5_0;
    let deferred5_1;
    try {
        const ptr0 = passStringToWasm0(prepared_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(multi_sig_user, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(outer_signer, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ret = wasm.prepare_multi_sig_gossip_priority_bid_payload_json(ptr0, len0, ptr1, len1, ptr2, len2);
        var ptr4 = ret[0];
        var len4 = ret[1];
        if (ret[3]) {
            ptr4 = 0; len4 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred5_0 = ptr4;
        deferred5_1 = len4;
        return getStringFromWasm0(ptr4, len4);
    } finally {
        wasm.__wbindgen_free(deferred5_0, deferred5_1, 1);
    }
}

/**
 * Produces the authorized-user digest for an L1 no-op.
 *
 * # Errors
 * Returns a JavaScript error for malformed JSON, modified artifacts, or addresses.
 * @param {string} prepared_json
 * @param {string} multi_sig_user
 * @param {string} outer_signer
 * @returns {string}
 */
export function prepare_multi_sig_noop_payload_json(prepared_json, multi_sig_user, outer_signer) {
    let deferred5_0;
    let deferred5_1;
    try {
        const ptr0 = passStringToWasm0(prepared_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(multi_sig_user, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(outer_signer, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ret = wasm.prepare_multi_sig_noop_payload_json(ptr0, len0, ptr1, len1, ptr2, len2);
        var ptr4 = ret[0];
        var len4 = ret[1];
        if (ret[3]) {
            ptr4 = 0; len4 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred5_0 = ptr4;
        deferred5_1 = len4;
        return getStringFromWasm0(ptr4, len4);
    } finally {
        wasm.__wbindgen_free(deferred5_0, deferred5_1, 1);
    }
}

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
 * @param {string} prepared_json
 * @param {string} multi_sig_user
 * @param {string} outer_signer
 * @returns {string}
 */
export function prepare_multi_sig_order_payload_json(prepared_json, multi_sig_user, outer_signer) {
    let deferred5_0;
    let deferred5_1;
    try {
        const ptr0 = passStringToWasm0(prepared_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(multi_sig_user, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(outer_signer, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ret = wasm.prepare_multi_sig_order_payload_json(ptr0, len0, ptr1, len1, ptr2, len2);
        var ptr4 = ret[0];
        var len4 = ret[1];
        if (ret[3]) {
            ptr4 = 0; len4 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred5_0 = ptr4;
        deferred5_1 = len4;
        return getStringFromWasm0(ptr4, len4);
    } finally {
        wasm.__wbindgen_free(deferred5_0, deferred5_1, 1);
    }
}

/**
 * Produces the authorized-user digest for a perpetual deployer action.
 *
 * # Errors
 * Returns a JavaScript error for malformed JSON, modified artifacts, or addresses.
 * @param {string} prepared_json
 * @param {string} multi_sig_user
 * @param {string} outer_signer
 * @returns {string}
 */
export function prepare_multi_sig_perp_deploy_payload_json(prepared_json, multi_sig_user, outer_signer) {
    let deferred5_0;
    let deferred5_1;
    try {
        const ptr0 = passStringToWasm0(prepared_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(multi_sig_user, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(outer_signer, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ret = wasm.prepare_multi_sig_perp_deploy_payload_json(ptr0, len0, ptr1, len1, ptr2, len2);
        var ptr4 = ret[0];
        var len4 = ret[1];
        if (ret[3]) {
            ptr4 = 0; len4 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred5_0 = ptr4;
        deferred5_1 = len4;
        return getStringFromWasm0(ptr4, len4);
    } finally {
        wasm.__wbindgen_free(deferred5_0, deferred5_1, 1);
    }
}

/**
 * Produces the authorized-user digest for a prepared schedule-cancel action.
 *
 * # Errors
 *
 * Returns a JavaScript error for malformed JSON, modified artifacts,
 * addresses, or encoding failure.
 * @param {string} prepared_json
 * @param {string} multi_sig_user
 * @param {string} outer_signer
 * @returns {string}
 */
export function prepare_multi_sig_schedule_cancel_payload_json(prepared_json, multi_sig_user, outer_signer) {
    let deferred5_0;
    let deferred5_1;
    try {
        const ptr0 = passStringToWasm0(prepared_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(multi_sig_user, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(outer_signer, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ret = wasm.prepare_multi_sig_schedule_cancel_payload_json(ptr0, len0, ptr1, len1, ptr2, len2);
        var ptr4 = ret[0];
        var len4 = ret[1];
        if (ret[3]) {
            ptr4 = 0; len4 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred5_0 = ptr4;
        deferred5_1 = len4;
        return getStringFromWasm0(ptr4, len4);
    } finally {
        wasm.__wbindgen_free(deferred5_0, deferred5_1, 1);
    }
}

/**
 * Produces the authorized-user digest for a prepared multi-signature
 * `sendAsset` action.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid prepared JSON, modified artifacts,
 * invalid addresses, or serialization failure.
 * @param {string} prepared_json
 * @param {string} multi_sig_user
 * @param {string} outer_signer
 * @returns {string}
 */
export function prepare_multi_sig_send_asset_payload_json(prepared_json, multi_sig_user, outer_signer) {
    let deferred5_0;
    let deferred5_1;
    try {
        const ptr0 = passStringToWasm0(prepared_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(multi_sig_user, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(outer_signer, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ret = wasm.prepare_multi_sig_send_asset_payload_json(ptr0, len0, ptr1, len1, ptr2, len2);
        var ptr4 = ret[0];
        var len4 = ret[1];
        if (ret[3]) {
            ptr4 = 0; len4 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred5_0 = ptr4;
        deferred5_1 = len4;
        return getStringFromWasm0(ptr4, len4);
    } finally {
        wasm.__wbindgen_free(deferred5_0, deferred5_1, 1);
    }
}

/**
 * Produces the authorized-user digest for referral-code registration.
 *
 * # Errors
 * Returns a JavaScript error for malformed JSON, modified artifacts, or addresses.
 * @param {string} prepared_json
 * @param {string} multi_sig_user
 * @param {string} outer_signer
 * @returns {string}
 */
export function prepare_multi_sig_set_referrer_payload_json(prepared_json, multi_sig_user, outer_signer) {
    let deferred5_0;
    let deferred5_1;
    try {
        const ptr0 = passStringToWasm0(prepared_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(multi_sig_user, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(outer_signer, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ret = wasm.prepare_multi_sig_set_referrer_payload_json(ptr0, len0, ptr1, len1, ptr2, len2);
        var ptr4 = ret[0];
        var len4 = ret[1];
        if (ret[3]) {
            ptr4 = 0; len4 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred5_0 = ptr4;
        deferred5_1 = len4;
        return getStringFromWasm0(ptr4, len4);
    } finally {
        wasm.__wbindgen_free(deferred5_0, deferred5_1, 1);
    }
}

/**
 * Produces the authorized-user digest for a Spot deployer action.
 *
 * # Errors
 * Returns a JavaScript error for malformed JSON, modified artifacts, or addresses.
 * @param {string} prepared_json
 * @param {string} multi_sig_user
 * @param {string} outer_signer
 * @returns {string}
 */
export function prepare_multi_sig_spot_deploy_payload_json(prepared_json, multi_sig_user, outer_signer) {
    let deferred5_0;
    let deferred5_1;
    try {
        const ptr0 = passStringToWasm0(prepared_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(multi_sig_user, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(outer_signer, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ret = wasm.prepare_multi_sig_spot_deploy_payload_json(ptr0, len0, ptr1, len1, ptr2, len2);
        var ptr4 = ret[0];
        var len4 = ret[1];
        if (ret[3]) {
            ptr4 = 0; len4 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred5_0 = ptr4;
        deferred5_1 = len4;
        return getStringFromWasm0(ptr4, len4);
    } finally {
        wasm.__wbindgen_free(deferred5_0, deferred5_1, 1);
    }
}

/**
 * Produces the authorized-user digest for prepared multi-signature `spotSend`.
 *
 * # Errors
 *
 * Returns a JavaScript error for malformed JSON, modified artifacts, or addresses.
 * @param {string} prepared_json
 * @param {string} multi_sig_user
 * @param {string} outer_signer
 * @returns {string}
 */
export function prepare_multi_sig_spot_send_payload_json(prepared_json, multi_sig_user, outer_signer) {
    let deferred5_0;
    let deferred5_1;
    try {
        const ptr0 = passStringToWasm0(prepared_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(multi_sig_user, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(outer_signer, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ret = wasm.prepare_multi_sig_spot_send_payload_json(ptr0, len0, ptr1, len1, ptr2, len2);
        var ptr4 = ret[0];
        var len4 = ret[1];
        if (ret[3]) {
            ptr4 = 0; len4 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred5_0 = ptr4;
        deferred5_1 = len4;
        return getStringFromWasm0(ptr4, len4);
    } finally {
        wasm.__wbindgen_free(deferred5_0, deferred5_1, 1);
    }
}

/**
 * Produces the authorized-user digest for a spot subaccount transfer.
 *
 * # Errors
 * Returns a JavaScript error for malformed JSON, modified artifacts, or addresses.
 * @param {string} prepared_json
 * @param {string} multi_sig_user
 * @param {string} outer_signer
 * @returns {string}
 */
export function prepare_multi_sig_sub_account_spot_transfer_payload_json(prepared_json, multi_sig_user, outer_signer) {
    let deferred5_0;
    let deferred5_1;
    try {
        const ptr0 = passStringToWasm0(prepared_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(multi_sig_user, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(outer_signer, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ret = wasm.prepare_multi_sig_sub_account_spot_transfer_payload_json(ptr0, len0, ptr1, len1, ptr2, len2);
        var ptr4 = ret[0];
        var len4 = ret[1];
        if (ret[3]) {
            ptr4 = 0; len4 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred5_0 = ptr4;
        deferred5_1 = len4;
        return getStringFromWasm0(ptr4, len4);
    } finally {
        wasm.__wbindgen_free(deferred5_0, deferred5_1, 1);
    }
}

/**
 * Produces the authorized-user digest for a USD subaccount transfer.
 *
 * # Errors
 * Returns a JavaScript error for malformed JSON, modified artifacts, or addresses.
 * @param {string} prepared_json
 * @param {string} multi_sig_user
 * @param {string} outer_signer
 * @returns {string}
 */
export function prepare_multi_sig_sub_account_transfer_payload_json(prepared_json, multi_sig_user, outer_signer) {
    let deferred5_0;
    let deferred5_1;
    try {
        const ptr0 = passStringToWasm0(prepared_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(multi_sig_user, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(outer_signer, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ret = wasm.prepare_multi_sig_sub_account_transfer_payload_json(ptr0, len0, ptr1, len1, ptr2, len2);
        var ptr4 = ret[0];
        var len4 = ret[1];
        if (ret[3]) {
            ptr4 = 0; len4 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred5_0 = ptr4;
        deferred5_1 = len4;
        return getStringFromWasm0(ptr4, len4);
    } finally {
        wasm.__wbindgen_free(deferred5_0, deferred5_1, 1);
    }
}

/**
 * Produces the authorized-user digest for prepared validator delegation.
 *
 * # Errors
 *
 * Returns a JavaScript error for malformed JSON, modified artifacts, or addresses.
 * @param {string} prepared_json
 * @param {string} multi_sig_user
 * @param {string} outer_signer
 * @returns {string}
 */
export function prepare_multi_sig_token_delegate_payload_json(prepared_json, multi_sig_user, outer_signer) {
    let deferred5_0;
    let deferred5_1;
    try {
        const ptr0 = passStringToWasm0(prepared_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(multi_sig_user, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(outer_signer, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ret = wasm.prepare_multi_sig_token_delegate_payload_json(ptr0, len0, ptr1, len1, ptr2, len2);
        var ptr4 = ret[0];
        var len4 = ret[1];
        if (ret[3]) {
            ptr4 = 0; len4 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred5_0 = ptr4;
        deferred5_1 = len4;
        return getStringFromWasm0(ptr4, len4);
    } finally {
        wasm.__wbindgen_free(deferred5_0, deferred5_1, 1);
    }
}

/**
 * Produces the authorized-user digest for a prepared isolated-only margin
 * top-up.
 *
 * # Errors
 *
 * Returns a JavaScript error for malformed JSON, modified artifacts,
 * addresses, or encoding failure.
 * @param {string} prepared_json
 * @param {string} multi_sig_user
 * @param {string} outer_signer
 * @returns {string}
 */
export function prepare_multi_sig_top_up_isolated_only_margin_payload_json(prepared_json, multi_sig_user, outer_signer) {
    let deferred5_0;
    let deferred5_1;
    try {
        const ptr0 = passStringToWasm0(prepared_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(multi_sig_user, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(outer_signer, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ret = wasm.prepare_multi_sig_top_up_isolated_only_margin_payload_json(ptr0, len0, ptr1, len1, ptr2, len2);
        var ptr4 = ret[0];
        var len4 = ret[1];
        if (ret[3]) {
            ptr4 = 0; len4 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred5_0 = ptr4;
        deferred5_1 = len4;
        return getStringFromWasm0(ptr4, len4);
    } finally {
        wasm.__wbindgen_free(deferred5_0, deferred5_1, 1);
    }
}

/**
 * Produces the authorized-user digest for a prepared TWAP cancellation.
 *
 * # Errors
 *
 * Returns a JavaScript error for malformed JSON, modified artifacts,
 * addresses, or encoding failure.
 * @param {string} prepared_json
 * @param {string} multi_sig_user
 * @param {string} outer_signer
 * @returns {string}
 */
export function prepare_multi_sig_twap_cancel_payload_json(prepared_json, multi_sig_user, outer_signer) {
    let deferred5_0;
    let deferred5_1;
    try {
        const ptr0 = passStringToWasm0(prepared_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(multi_sig_user, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(outer_signer, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ret = wasm.prepare_multi_sig_twap_cancel_payload_json(ptr0, len0, ptr1, len1, ptr2, len2);
        var ptr4 = ret[0];
        var len4 = ret[1];
        if (ret[3]) {
            ptr4 = 0; len4 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred5_0 = ptr4;
        deferred5_1 = len4;
        return getStringFromWasm0(ptr4, len4);
    } finally {
        wasm.__wbindgen_free(deferred5_0, deferred5_1, 1);
    }
}

/**
 * Produces the authorized-user digest for a prepared native TWAP order.
 *
 * # Errors
 *
 * Returns a JavaScript error for malformed JSON, modified artifacts,
 * addresses, or encoding failure.
 * @param {string} prepared_json
 * @param {string} multi_sig_user
 * @param {string} outer_signer
 * @returns {string}
 */
export function prepare_multi_sig_twap_order_payload_json(prepared_json, multi_sig_user, outer_signer) {
    let deferred5_0;
    let deferred5_1;
    try {
        const ptr0 = passStringToWasm0(prepared_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(multi_sig_user, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(outer_signer, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ret = wasm.prepare_multi_sig_twap_order_payload_json(ptr0, len0, ptr1, len1, ptr2, len2);
        var ptr4 = ret[0];
        var len4 = ret[1];
        if (ret[3]) {
            ptr4 = 0; len4 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred5_0 = ptr4;
        deferred5_1 = len4;
        return getStringFromWasm0(ptr4, len4);
    } finally {
        wasm.__wbindgen_free(deferred5_0, deferred5_1, 1);
    }
}

/**
 * Produces the authorized-user digest for a prepared isolated-margin update.
 *
 * # Errors
 *
 * Returns a JavaScript error for malformed JSON, modified artifacts,
 * addresses, or encoding failure.
 * @param {string} prepared_json
 * @param {string} multi_sig_user
 * @param {string} outer_signer
 * @returns {string}
 */
export function prepare_multi_sig_update_isolated_margin_payload_json(prepared_json, multi_sig_user, outer_signer) {
    let deferred5_0;
    let deferred5_1;
    try {
        const ptr0 = passStringToWasm0(prepared_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(multi_sig_user, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(outer_signer, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ret = wasm.prepare_multi_sig_update_isolated_margin_payload_json(ptr0, len0, ptr1, len1, ptr2, len2);
        var ptr4 = ret[0];
        var len4 = ret[1];
        if (ret[3]) {
            ptr4 = 0; len4 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred5_0 = ptr4;
        deferred5_1 = len4;
        return getStringFromWasm0(ptr4, len4);
    } finally {
        wasm.__wbindgen_free(deferred5_0, deferred5_1, 1);
    }
}

/**
 * Produces the authorized-user digest for a prepared leverage update.
 *
 * # Errors
 *
 * Returns a JavaScript error for malformed JSON, modified artifacts,
 * addresses, or encoding failure.
 * @param {string} prepared_json
 * @param {string} multi_sig_user
 * @param {string} outer_signer
 * @returns {string}
 */
export function prepare_multi_sig_update_leverage_payload_json(prepared_json, multi_sig_user, outer_signer) {
    let deferred5_0;
    let deferred5_1;
    try {
        const ptr0 = passStringToWasm0(prepared_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(multi_sig_user, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(outer_signer, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ret = wasm.prepare_multi_sig_update_leverage_payload_json(ptr0, len0, ptr1, len1, ptr2, len2);
        var ptr4 = ret[0];
        var len4 = ret[1];
        if (ret[3]) {
            ptr4 = 0; len4 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred5_0 = ptr4;
        deferred5_1 = len4;
        return getStringFromWasm0(ptr4, len4);
    } finally {
        wasm.__wbindgen_free(deferred5_0, deferred5_1, 1);
    }
}

/**
 * Produces the authorized-user digest for a prepared USD class transfer.
 *
 * # Errors
 *
 * Returns a JavaScript error for malformed JSON, modified artifacts, or addresses.
 * @param {string} prepared_json
 * @param {string} multi_sig_user
 * @param {string} outer_signer
 * @returns {string}
 */
export function prepare_multi_sig_usd_class_transfer_payload_json(prepared_json, multi_sig_user, outer_signer) {
    let deferred5_0;
    let deferred5_1;
    try {
        const ptr0 = passStringToWasm0(prepared_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(multi_sig_user, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(outer_signer, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ret = wasm.prepare_multi_sig_usd_class_transfer_payload_json(ptr0, len0, ptr1, len1, ptr2, len2);
        var ptr4 = ret[0];
        var len4 = ret[1];
        if (ret[3]) {
            ptr4 = 0; len4 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred5_0 = ptr4;
        deferred5_1 = len4;
        return getStringFromWasm0(ptr4, len4);
    } finally {
        wasm.__wbindgen_free(deferred5_0, deferred5_1, 1);
    }
}

/**
 * Produces the authorized-user digest for prepared multi-signature `usdSend`.
 *
 * # Errors
 *
 * Returns a JavaScript error for malformed JSON, modified artifacts, or addresses.
 * @param {string} prepared_json
 * @param {string} multi_sig_user
 * @param {string} outer_signer
 * @returns {string}
 */
export function prepare_multi_sig_usd_send_payload_json(prepared_json, multi_sig_user, outer_signer) {
    let deferred5_0;
    let deferred5_1;
    try {
        const ptr0 = passStringToWasm0(prepared_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(multi_sig_user, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(outer_signer, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ret = wasm.prepare_multi_sig_usd_send_payload_json(ptr0, len0, ptr1, len1, ptr2, len2);
        var ptr4 = ret[0];
        var len4 = ret[1];
        if (ret[3]) {
            ptr4 = 0; len4 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred5_0 = ptr4;
        deferred5_1 = len4;
        return getStringFromWasm0(ptr4, len4);
    } finally {
        wasm.__wbindgen_free(deferred5_0, deferred5_1, 1);
    }
}

/**
 * Produces the authorized-user digest for a prepared DEX-abstraction toggle.
 *
 * # Errors
 *
 * Returns a JavaScript error for malformed JSON, modified artifacts, or addresses.
 * @param {string} prepared_json
 * @param {string} multi_sig_user
 * @param {string} outer_signer
 * @returns {string}
 */
export function prepare_multi_sig_user_dex_abstraction_payload_json(prepared_json, multi_sig_user, outer_signer) {
    let deferred5_0;
    let deferred5_1;
    try {
        const ptr0 = passStringToWasm0(prepared_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(multi_sig_user, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(outer_signer, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ret = wasm.prepare_multi_sig_user_dex_abstraction_payload_json(ptr0, len0, ptr1, len1, ptr2, len2);
        var ptr4 = ret[0];
        var len4 = ret[1];
        if (ret[3]) {
            ptr4 = 0; len4 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred5_0 = ptr4;
        deferred5_1 = len4;
        return getStringFromWasm0(ptr4, len4);
    } finally {
        wasm.__wbindgen_free(deferred5_0, deferred5_1, 1);
    }
}

/**
 * Produces the authorized-user digest for a prepared multi-signature
 * `userSetAbstraction` action.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid prepared JSON, modified artifacts,
 * invalid addresses, or serialization failure.
 * @param {string} prepared_json
 * @param {string} multi_sig_user
 * @param {string} outer_signer
 * @returns {string}
 */
export function prepare_multi_sig_user_set_abstraction_payload_json(prepared_json, multi_sig_user, outer_signer) {
    let deferred5_0;
    let deferred5_1;
    try {
        const ptr0 = passStringToWasm0(prepared_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(multi_sig_user, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(outer_signer, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ret = wasm.prepare_multi_sig_user_set_abstraction_payload_json(ptr0, len0, ptr1, len1, ptr2, len2);
        var ptr4 = ret[0];
        var len4 = ret[1];
        if (ret[3]) {
            ptr4 = 0; len4 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred5_0 = ptr4;
        deferred5_1 = len4;
        return getStringFromWasm0(ptr4, len4);
    } finally {
        wasm.__wbindgen_free(deferred5_0, deferred5_1, 1);
    }
}

/**
 * Produces the authorized-user digest for a vault transfer.
 *
 * # Errors
 * Returns a JavaScript error for malformed JSON, modified artifacts, or addresses.
 * @param {string} prepared_json
 * @param {string} multi_sig_user
 * @param {string} outer_signer
 * @returns {string}
 */
export function prepare_multi_sig_vault_transfer_payload_json(prepared_json, multi_sig_user, outer_signer) {
    let deferred5_0;
    let deferred5_1;
    try {
        const ptr0 = passStringToWasm0(prepared_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(multi_sig_user, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(outer_signer, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ret = wasm.prepare_multi_sig_vault_transfer_payload_json(ptr0, len0, ptr1, len1, ptr2, len2);
        var ptr4 = ret[0];
        var len4 = ret[1];
        if (ret[3]) {
            ptr4 = 0; len4 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred5_0 = ptr4;
        deferred5_1 = len4;
        return getStringFromWasm0(ptr4, len4);
    } finally {
        wasm.__wbindgen_free(deferred5_0, deferred5_1, 1);
    }
}

/**
 * Produces the authorized-user digest for a prepared bridge withdrawal.
 *
 * # Errors
 *
 * Returns a JavaScript error for malformed JSON, modified artifacts, or addresses.
 * @param {string} prepared_json
 * @param {string} multi_sig_user
 * @param {string} outer_signer
 * @returns {string}
 */
export function prepare_multi_sig_withdraw_payload_json(prepared_json, multi_sig_user, outer_signer) {
    let deferred5_0;
    let deferred5_1;
    try {
        const ptr0 = passStringToWasm0(prepared_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(multi_sig_user, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(outer_signer, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ret = wasm.prepare_multi_sig_withdraw_payload_json(ptr0, len0, ptr1, len1, ptr2, len2);
        var ptr4 = ret[0];
        var len4 = ret[1];
        if (ret[3]) {
            ptr4 = 0; len4 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred5_0 = ptr4;
        deferred5_1 = len4;
        return getStringFromWasm0(ptr4, len4);
    } finally {
        wasm.__wbindgen_free(deferred5_0, deferred5_1, 1);
    }
}

/**
 * Prepares an empty L1 action from strict camelCase JSON.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid JSON, address, nonce, or signing
 * context.
 * @param {string} request_json
 * @returns {string}
 */
export function prepare_noop_json(request_json) {
    let deferred3_0;
    let deferred3_1;
    try {
        const ptr0 = passStringToWasm0(request_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.prepare_noop_json(ptr0, len0);
        var ptr2 = ret[0];
        var len2 = ret[1];
        if (ret[3]) {
            ptr2 = 0; len2 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred3_0 = ptr2;
        deferred3_1 = len2;
        return getStringFromWasm0(ptr2, len2);
    } finally {
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
}

/**
 * Prepares a mixed atomic batch of limit and trigger orders.
 *
 * # Errors
 *
 * Returns a JavaScript error for malformed JSON or any failed protocol rule.
 * @param {string} request_json
 * @returns {string}
 */
export function prepare_orders_json(request_json) {
    let deferred3_0;
    let deferred3_1;
    try {
        const ptr0 = passStringToWasm0(request_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.prepare_orders_json(ptr0, len0);
        var ptr2 = ret[0];
        var len2 = ret[1];
        if (ret[3]) {
            ptr2 = 0; len2 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred3_0 = ptr2;
        deferred3_1 = len2;
        return getStringFromWasm0(ptr2, len2);
    } finally {
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
}

/**
 * Prepares any supported perpetual deployer lifecycle action from JSON.
 *
 * # Errors
 * Returns a JavaScript error for invalid JSON, deployer data, or signing context.
 * @param {string} request_json
 * @returns {string}
 */
export function prepare_perp_deploy_json(request_json) {
    let deferred3_0;
    let deferred3_1;
    try {
        const ptr0 = passStringToWasm0(request_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.prepare_perp_deploy_json(ptr0, len0);
        var ptr2 = ret[0];
        var len2 = ret[1];
        if (ret[3]) {
            ptr2 = 0; len2 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred3_0 = ptr2;
        deferred3_1 = len2;
        return getStringFromWasm0(ptr2, len2);
    } finally {
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
}

/**
 * Prepares a dead man's switch set or clear action.
 *
 * # Errors
 *
 * Returns a JavaScript error for malformed JSON, an unsafe deadline, or any
 * failed signing-context rule.
 * @param {string} request_json
 * @returns {string}
 */
export function prepare_schedule_cancel_json(request_json) {
    let deferred3_0;
    let deferred3_1;
    try {
        const ptr0 = passStringToWasm0(request_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.prepare_schedule_cancel_json(ptr0, len0);
        var ptr2 = ret[0];
        var len2 = ret[1];
        if (ret[3]) {
            ptr2 = 0; len2 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred3_0 = ptr2;
        deferred3_1 = len2;
        return getStringFromWasm0(ptr2, len2);
    } finally {
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
}

/**
 * Prepares a generalized asset transfer from strict camelCase JSON.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid JSON, addresses, DEX names, token,
 * amount, nonce, or serialization.
 * @param {string} request_json
 * @returns {string}
 */
export function prepare_send_asset_json(request_json) {
    let deferred3_0;
    let deferred3_1;
    try {
        const ptr0 = passStringToWasm0(request_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.prepare_send_asset_json(ptr0, len0);
        var ptr2 = ret[0];
        var len2 = ret[1];
        if (ret[3]) {
            ptr2 = 0; len2 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred3_0 = ptr2;
        deferred3_1 = len2;
        return getStringFromWasm0(ptr2, len2);
    } finally {
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
}

/**
 * Prepares referral-code registration from strict camelCase JSON.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid JSON, code, nonce, or signing
 * context.
 * @param {string} request_json
 * @returns {string}
 */
export function prepare_set_referrer_json(request_json) {
    let deferred3_0;
    let deferred3_1;
    try {
        const ptr0 = passStringToWasm0(request_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.prepare_set_referrer_json(ptr0, len0);
        var ptr2 = ret[0];
        var len2 = ret[1];
        if (ret[3]) {
            ptr2 = 0; len2 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred3_0 = ptr2;
        deferred3_1 = len2;
        return getStringFromWasm0(ptr2, len2);
    } finally {
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
}

/**
 * Prepares any supported Spot deployer lifecycle action from JSON.
 *
 * # Errors
 * Returns a JavaScript error for invalid JSON, deployer data, or signing context.
 * @param {string} request_json
 * @returns {string}
 */
export function prepare_spot_deploy_json(request_json) {
    let deferred3_0;
    let deferred3_1;
    try {
        const ptr0 = passStringToWasm0(request_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.prepare_spot_deploy_json(ptr0, len0);
        var ptr2 = ret[0];
        var len2 = ret[1];
        if (ret[3]) {
            ptr2 = 0; len2 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred3_0 = ptr2;
        deferred3_1 = len2;
        return getStringFromWasm0(ptr2, len2);
    } finally {
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
}

/**
 * Prepares a Core spot transfer from strict camelCase JSON.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid destination, token, amount, nonce,
 * or serialization.
 * @param {string} request_json
 * @returns {string}
 */
export function prepare_spot_send_json(request_json) {
    let deferred3_0;
    let deferred3_1;
    try {
        const ptr0 = passStringToWasm0(request_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.prepare_spot_send_json(ptr0, len0);
        var ptr2 = ret[0];
        var len2 = ret[1];
        if (ret[3]) {
            ptr2 = 0; len2 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred3_0 = ptr2;
        deferred3_1 = len2;
        return getStringFromWasm0(ptr2, len2);
    } finally {
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
}

/**
 * Prepares a spot-token master/subaccount transfer from strict camelCase JSON.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid addresses, token, amount, integer
 * strings, or signing context.
 * @param {string} request_json
 * @returns {string}
 */
export function prepare_sub_account_spot_transfer_json(request_json) {
    let deferred3_0;
    let deferred3_1;
    try {
        const ptr0 = passStringToWasm0(request_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.prepare_sub_account_spot_transfer_json(ptr0, len0);
        var ptr2 = ret[0];
        var len2 = ret[1];
        if (ret[3]) {
            ptr2 = 0; len2 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred3_0 = ptr2;
        deferred3_1 = len2;
        return getStringFromWasm0(ptr2, len2);
    } finally {
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
}

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
 * @param {string} request_json
 * @returns {string}
 */
export function prepare_sub_account_transfer_json(request_json) {
    let deferred3_0;
    let deferred3_1;
    try {
        const ptr0 = passStringToWasm0(request_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.prepare_sub_account_transfer_json(ptr0, len0);
        var ptr2 = ret[0];
        var len2 = ret[1];
        if (ret[3]) {
            ptr2 = 0; len2 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred3_0 = ptr2;
        deferred3_1 = len2;
        return getStringFromWasm0(ptr2, len2);
    } finally {
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
}

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
 * @param {string} request_json
 * @returns {string}
 */
export function prepare_token_delegate_json(request_json) {
    let deferred3_0;
    let deferred3_1;
    try {
        const ptr0 = passStringToWasm0(request_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.prepare_token_delegate_json(ptr0, len0);
        var ptr2 = ret[0];
        var len2 = ret[1];
        if (ret[3]) {
            ptr2 = 0; len2 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred3_0 = ptr2;
        deferred3_1 = len2;
        return getStringFromWasm0(ptr2, len2);
    } finally {
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
}

/**
 * Prepares an isolated-only margin top-up from strict camelCase JSON.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid target leverage or signing context.
 * @param {string} request_json
 * @returns {string}
 */
export function prepare_top_up_isolated_only_margin_json(request_json) {
    let deferred3_0;
    let deferred3_1;
    try {
        const ptr0 = passStringToWasm0(request_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.prepare_top_up_isolated_only_margin_json(ptr0, len0);
        var ptr2 = ret[0];
        var len2 = ret[1];
        if (ret[3]) {
            ptr2 = 0; len2 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred3_0 = ptr2;
        deferred3_1 = len2;
        return getStringFromWasm0(ptr2, len2);
    } finally {
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
}

/**
 * Prepares one native TWAP cancellation.
 *
 * # Errors
 *
 * Returns a JavaScript error for malformed JSON or any failed protocol rule.
 * @param {string} request_json
 * @returns {string}
 */
export function prepare_twap_cancel_json(request_json) {
    let deferred3_0;
    let deferred3_1;
    try {
        const ptr0 = passStringToWasm0(request_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.prepare_twap_cancel_json(ptr0, len0);
        var ptr2 = ret[0];
        var len2 = ret[1];
        if (ret[3]) {
            ptr2 = 0; len2 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred3_0 = ptr2;
        deferred3_1 = len2;
        return getStringFromWasm0(ptr2, len2);
    } finally {
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
}

/**
 * Prepares one native TWAP order.
 *
 * # Errors
 *
 * Returns a JavaScript error for malformed JSON or any failed protocol rule.
 * @param {string} request_json
 * @returns {string}
 */
export function prepare_twap_order_json(request_json) {
    let deferred3_0;
    let deferred3_1;
    try {
        const ptr0 = passStringToWasm0(request_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.prepare_twap_order_json(ptr0, len0);
        var ptr2 = ret[0];
        var len2 = ret[1];
        if (ret[3]) {
            ptr2 = 0; len2 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred3_0 = ptr2;
        deferred3_1 = len2;
        return getStringFromWasm0(ptr2, len2);
    } finally {
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
}

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
 * @param {string} request_json
 * @returns {string}
 */
export function prepare_update_isolated_margin_json(request_json) {
    let deferred3_0;
    let deferred3_1;
    try {
        const ptr0 = passStringToWasm0(request_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.prepare_update_isolated_margin_json(ptr0, len0);
        var ptr2 = ret[0];
        var len2 = ret[1];
        if (ret[3]) {
            ptr2 = 0; len2 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred3_0 = ptr2;
        deferred3_1 = len2;
        return getStringFromWasm0(ptr2, len2);
    } finally {
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
}

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
 * @param {string} request_json
 * @returns {string}
 */
export function prepare_update_leverage_json(request_json) {
    let deferred3_0;
    let deferred3_1;
    try {
        const ptr0 = passStringToWasm0(request_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.prepare_update_leverage_json(ptr0, len0);
        var ptr2 = ret[0];
        var len2 = ret[1];
        if (ret[3]) {
            ptr2 = 0; len2 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred3_0 = ptr2;
        deferred3_1 = len2;
        return getStringFromWasm0(ptr2, len2);
    } finally {
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
}

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
 * @param {string} request_json
 * @returns {string}
 */
export function prepare_usd_class_transfer_json(request_json) {
    let deferred3_0;
    let deferred3_1;
    try {
        const ptr0 = passStringToWasm0(request_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.prepare_usd_class_transfer_json(ptr0, len0);
        var ptr2 = ret[0];
        var len2 = ret[1];
        if (ret[3]) {
            ptr2 = 0; len2 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred3_0 = ptr2;
        deferred3_1 = len2;
        return getStringFromWasm0(ptr2, len2);
    } finally {
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
}

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
 * @param {string} request_json
 * @returns {string}
 */
export function prepare_usd_send_json(request_json) {
    let deferred3_0;
    let deferred3_1;
    try {
        const ptr0 = passStringToWasm0(request_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.prepare_usd_send_json(ptr0, len0);
        var ptr2 = ret[0];
        var len2 = ret[1];
        if (ret[3]) {
            ptr2 = 0; len2 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred3_0 = ptr2;
        deferred3_1 = len2;
        return getStringFromWasm0(ptr2, len2);
    } finally {
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
}

/**
 * Prepares the legacy user DEX-abstraction toggle from strict camelCase JSON.
 *
 * `nonce` must be an unsigned decimal string.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid JSON, user address, nonce, or
 * serialization.
 * @param {string} request_json
 * @returns {string}
 */
export function prepare_user_dex_abstraction_json(request_json) {
    let deferred3_0;
    let deferred3_1;
    try {
        const ptr0 = passStringToWasm0(request_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.prepare_user_dex_abstraction_json(ptr0, len0);
        var ptr2 = ret[0];
        var len2 = ret[1];
        if (ret[3]) {
            ptr2 = 0; len2 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred3_0 = ptr2;
        deferred3_1 = len2;
        return getStringFromWasm0(ptr2, len2);
    } finally {
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
}

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
 * @param {string} request_json
 * @returns {string}
 */
export function prepare_user_set_abstraction_json(request_json) {
    let deferred3_0;
    let deferred3_1;
    try {
        const ptr0 = passStringToWasm0(request_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.prepare_user_set_abstraction_json(ptr0, len0);
        var ptr2 = ret[0];
        var len2 = ret[1];
        if (ret[3]) {
            ptr2 = 0; len2 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred3_0 = ptr2;
        deferred3_1 = len2;
        return getStringFromWasm0(ptr2, len2);
    } finally {
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
}

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
 * @param {string} request_json
 * @returns {string}
 */
export function prepare_vault_transfer_json(request_json) {
    let deferred3_0;
    let deferred3_1;
    try {
        const ptr0 = passStringToWasm0(request_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.prepare_vault_transfer_json(ptr0, len0);
        var ptr2 = ret[0];
        var len2 = ret[1];
        if (ret[3]) {
            ptr2 = 0; len2 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred3_0 = ptr2;
        deferred3_1 = len2;
        return getStringFromWasm0(ptr2, len2);
    } finally {
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
}

/**
 * Prepares a bridge withdrawal from strict camelCase JSON.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid destination, amount, nonce, or
 * serialization.
 * @param {string} request_json
 * @returns {string}
 */
export function prepare_withdraw_json(request_json) {
    let deferred3_0;
    let deferred3_1;
    try {
        const ptr0 = passStringToWasm0(request_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.prepare_withdraw_json(ptr0, len0);
        var ptr2 = ret[0];
        var len2 = ret[1];
        if (ret[3]) {
            ptr2 = 0; len2 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred3_0 = ptr2;
        deferred3_1 = len2;
        return getStringFromWasm0(ptr2, len2);
    } finally {
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
}

/**
 * Extracts the signing digest without parsing prepared JSON in JavaScript.
 *
 * Prepared action JSON should otherwise be treated as an opaque token and
 * passed unchanged into the matching `finalize_*_json` function.
 *
 * # Errors
 *
 * Returns a JavaScript error when the token is malformed or lacks the digest.
 * @param {string} prepared_json
 * @returns {string}
 */
export function prepared_signing_digest(prepared_json) {
    let deferred3_0;
    let deferred3_1;
    try {
        const ptr0 = passStringToWasm0(prepared_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.prepared_signing_digest(ptr0, len0);
        var ptr2 = ret[0];
        var len2 = ret[1];
        if (ret[3]) {
            ptr2 = 0; len2 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred3_0 = ptr2;
        deferred3_1 = len2;
        return getStringFromWasm0(ptr2, len2);
    } finally {
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
}

/**
 * Returns the protocol core version.
 * @returns {string}
 */
export function protocol_version() {
    let deferred1_0;
    let deferred1_1;
    try {
        const ret = wasm.protocol_version();
        deferred1_0 = ret[0];
        deferred1_1 = ret[1];
        return getStringFromWasm0(ret[0], ret[1]);
    } finally {
        wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
}

/**
 * Returns retained diagnostics as JSON without removing them.
 *
 * # Errors
 *
 * Returns a JavaScript error only if JSON serialization fails.
 * @returns {string}
 */
export function snapshot_logs_json() {
    let deferred2_0;
    let deferred2_1;
    try {
        const ret = wasm.snapshot_logs_json();
        var ptr1 = ret[0];
        var len1 = ret[1];
        if (ret[3]) {
            ptr1 = 0; len1 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred2_0 = ptr1;
        deferred2_1 = len1;
        return getStringFromWasm0(ptr1, len1);
    } finally {
        wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
    }
}

/**
 * Checks the documented nonce time window before request submission.
 *
 * # Errors
 *
 * Returns a JavaScript error for invalid integers or a nonce outside the
 * documented server-time window.
 * @param {string} nonce
 * @param {string} now_ms
 */
export function validate_exchange_nonce(nonce, now_ms) {
    const ptr0 = passStringToWasm0(nonce, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ptr1 = passStringToWasm0(now_ms, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    const ret = wasm.validate_exchange_nonce(ptr0, len0, ptr1, len1);
    if (ret[1]) {
        throw takeFromExternrefTable0(ret[0]);
    }
}

/**
 * Builds a signed-action post over WebSocket.
 *
 * # Errors
 *
 * Returns a JavaScript error for malformed or unsafe finalized artifacts.
 * @param {number} id
 * @param {string} finalized_json
 * @returns {string}
 */
export function websocket_action_post_json(id, finalized_json) {
    let deferred3_0;
    let deferred3_1;
    try {
        const ptr0 = passStringToWasm0(finalized_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.websocket_action_post_json(id, ptr0, len0);
        var ptr2 = ret[0];
        var len2 = ret[1];
        if (ret[3]) {
            ptr2 = 0; len2 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred3_0 = ptr2;
        deferred3_1 = len2;
        return getStringFromWasm0(ptr2, len2);
    } finally {
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
}

/**
 * Builds a read-only info post over WebSocket.
 *
 * # Errors
 *
 * Returns a JavaScript error when the payload is not a JSON object.
 * @param {number} id
 * @param {string} payload
 * @returns {string}
 */
export function websocket_info_post_json(id, payload) {
    let deferred3_0;
    let deferred3_1;
    try {
        const ptr0 = passStringToWasm0(payload, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.websocket_info_post_json(id, ptr0, len0);
        var ptr2 = ret[0];
        var len2 = ret[1];
        if (ret[3]) {
            ptr2 = 0; len2 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred3_0 = ptr2;
        deferred3_1 = len2;
        return getStringFromWasm0(ptr2, len2);
    } finally {
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
}

/**
 * Returns the canonical WebSocket heartbeat command.
 *
 * # Errors
 *
 * Returns a JavaScript error only if serialization unexpectedly fails.
 * @returns {string}
 */
export function websocket_ping_json() {
    let deferred2_0;
    let deferred2_1;
    try {
        const ret = wasm.websocket_ping_json();
        var ptr1 = ret[0];
        var len1 = ret[1];
        if (ret[3]) {
            ptr1 = 0; len1 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred2_0 = ptr1;
        deferred2_1 = len1;
        return getStringFromWasm0(ptr1, len1);
    } finally {
        wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
    }
}

/**
 * Validates a subscription and builds its subscribe command.
 *
 * # Errors
 *
 * Returns a JavaScript error for malformed JSON or invalid fields.
 * @param {string} subscription_json
 * @returns {string}
 */
export function websocket_subscribe_json(subscription_json) {
    let deferred3_0;
    let deferred3_1;
    try {
        const ptr0 = passStringToWasm0(subscription_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.websocket_subscribe_json(ptr0, len0);
        var ptr2 = ret[0];
        var len2 = ret[1];
        if (ret[3]) {
            ptr2 = 0; len2 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred3_0 = ptr2;
        deferred3_1 = len2;
        return getStringFromWasm0(ptr2, len2);
    } finally {
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
}

/**
 * Builds a typed read-only Info post over WebSocket.
 *
 * # Errors
 *
 * Returns a JavaScript error for malformed JSON or invalid query fields.
 * @param {number} id
 * @param {string} query_json
 * @returns {string}
 */
export function websocket_typed_info_post_json(id, query_json) {
    let deferred3_0;
    let deferred3_1;
    try {
        const ptr0 = passStringToWasm0(query_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.websocket_typed_info_post_json(id, ptr0, len0);
        var ptr2 = ret[0];
        var len2 = ret[1];
        if (ret[3]) {
            ptr2 = 0; len2 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred3_0 = ptr2;
        deferred3_1 = len2;
        return getStringFromWasm0(ptr2, len2);
    } finally {
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
}

/**
 * Validates a subscription and builds its unsubscribe command.
 *
 * # Errors
 *
 * Returns a JavaScript error for malformed JSON or invalid fields.
 * @param {string} subscription_json
 * @returns {string}
 */
export function websocket_unsubscribe_json(subscription_json) {
    let deferred3_0;
    let deferred3_1;
    try {
        const ptr0 = passStringToWasm0(subscription_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.websocket_unsubscribe_json(ptr0, len0);
        var ptr2 = ret[0];
        var len2 = ret[1];
        if (ret[3]) {
            ptr2 = 0; len2 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred3_0 = ptr2;
        deferred3_1 = len2;
        return getStringFromWasm0(ptr2, len2);
    } finally {
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
}

/**
 * Returns the official WebSocket URL for a network.
 *
 * # Errors
 *
 * Returns a JavaScript error for an unsupported network name.
 * @param {string} network
 * @returns {string}
 */
export function websocket_url(network) {
    let deferred3_0;
    let deferred3_1;
    try {
        const ptr0 = passStringToWasm0(network, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.websocket_url(ptr0, len0);
        var ptr2 = ret[0];
        var len2 = ret[1];
        if (ret[3]) {
            ptr2 = 0; len2 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred3_0 = ptr2;
        deferred3_1 = len2;
        return getStringFromWasm0(ptr2, len2);
    } finally {
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
}
function __wbg_get_imports() {
    const import0 = {
        __proto__: null,
        __wbg_Error_30c8987f7c2ed4e2: function(arg0, arg1) {
            const ret = Error(getStringFromWasm0(arg0, arg1));
            return ret;
        },
        __wbg___wbindgen_throw_41e9ee4f547fc59a: function(arg0, arg1) {
            throw new Error(getStringFromWasm0(arg0, arg1));
        },
        __wbg_now_aa4ccb83129e9e55: function() {
            const ret = Date.now();
            return ret;
        },
        __wbindgen_init_externref_table: function() {
            const table = wasm.__wbindgen_externrefs;
            const offset = table.grow(4);
            table.set(0, undefined);
            table.set(offset + 0, undefined);
            table.set(offset + 1, null);
            table.set(offset + 2, true);
            table.set(offset + 3, false);
        },
    };
    return {
        __proto__: null,
        "./hyper_axis_bg.js": import0,
    };
}

const WasmNonceManagerFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_wasmnoncemanager_free(ptr, 1));

function getStringFromWasm0(ptr, len) {
    return decodeText(ptr >>> 0, len);
}

let cachedUint8ArrayMemory0 = null;
function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

function passStringToWasm0(arg, malloc, realloc) {
    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8ArrayMemory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8ArrayMemory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }
    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
        const ret = cachedTextEncoder.encodeInto(arg, view);

        offset += ret.written;
        ptr = realloc(ptr, len, offset, 1) >>> 0;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

function takeFromExternrefTable0(idx) {
    const value = wasm.__wbindgen_externrefs.get(idx);
    wasm.__externref_table_dealloc(idx);
    return value;
}

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });
cachedTextDecoder.decode();
const MAX_SAFARI_DECODE_BYTES = 2146435072;
let numBytesDecoded = 0;
function decodeText(ptr, len) {
    numBytesDecoded += len;
    if (numBytesDecoded >= MAX_SAFARI_DECODE_BYTES) {
        cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });
        cachedTextDecoder.decode();
        numBytesDecoded = len;
    }
    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}

const cachedTextEncoder = new TextEncoder();

if (!('encodeInto' in cachedTextEncoder)) {
    cachedTextEncoder.encodeInto = function (arg, view) {
        const buf = cachedTextEncoder.encode(arg);
        view.set(buf);
        return {
            read: arg.length,
            written: buf.length
        };
    };
}

let WASM_VECTOR_LEN = 0;

let wasmModule, wasmInstance, wasm;
function __wbg_finalize_init(instance, module) {
    wasmInstance = instance;
    wasm = instance.exports;
    wasmModule = module;
    cachedUint8ArrayMemory0 = null;
    wasm.__wbindgen_start();
    return wasm;
}

async function __wbg_load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (!module.ok) {
            throw new Error(`failed to fetch Wasm: ${module.status} ${module.statusText} fetching '${module.url}'`);
        }

        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);
            } catch (e) {
                const validResponse = expectedResponseType(module.type);

                if (validResponse && module.headers.get('Content-Type') !== 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else { throw e; }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);
    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };
        } else {
            return instance;
        }
    }

    function expectedResponseType(type) {
        switch (type) {
            case 'basic': case 'cors': case 'default': return true;
        }
        return false;
    }
}

function initSync(module) {
    if (wasm !== undefined) return wasm;


    if (module !== undefined) {
        if (Object.getPrototypeOf(module) === Object.prototype) {
            ({module} = module)
        } else {
            console.warn('using deprecated parameters for `initSync()`; pass a single object instead')
        }
    }

    const imports = __wbg_get_imports();
    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }
    const instance = new WebAssembly.Instance(module, imports);
    return __wbg_finalize_init(instance, module);
}

async function __wbg_init(module_or_path) {
    if (wasm !== undefined) return wasm;


    if (module_or_path !== undefined) {
        if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
            ({module_or_path} = module_or_path)
        } else {
            console.warn('using deprecated parameters for the initialization function; pass a single object instead')
        }
    }

    if (module_or_path === undefined) {
        module_or_path = new URL('hyper_axis_bg.wasm', import.meta.url);
    }
    const imports = __wbg_get_imports();

    if (typeof module_or_path === 'string' || (typeof Request === 'function' && module_or_path instanceof Request) || (typeof URL === 'function' && module_or_path instanceof URL)) {
        module_or_path = fetch(module_or_path);
    }

    const { instance, module } = await __wbg_load(await module_or_path, imports);

    return __wbg_finalize_init(instance, module);
}

export { initSync, __wbg_init as default };
