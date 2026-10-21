import type {
  HyperAxisAppliedLoggingConfig,
  HyperAxisLogBatch,
  HyperAxisLogLevel,
  HyperAxisLogRecord,
} from '../models/logging.js';
import type {
  HyperAxisFinalizedAction,
  HyperAxisPreparedAction,
} from '../models/orders.js';
import type {
  HyperAxisHttpRequest,
  HyperAxisParsedHttpResponse,
  HyperAxisPreparedInfoQuery,
  HyperAxisRetryAdvice,
  HyperAxisWebSocketMessage,
} from '../models/transport.js';
import {
  type JsonObject,
  type JsonValue,
  parseJson,
  requireJsonObject,
  requireString,
} from '../models/json.js';
import type { HyperAxisNetwork } from '../models/common.js';

export function decodePreparedAction(json: string): HyperAxisPreparedAction {
  const operation = 'prepareLimitOrder';
  const object = requireJsonObject(parseJson(json, operation), operation);
  const action = requireJsonObject(object['action'] ?? null, operation);
  const network = requireNetwork(object, operation);
  return Object.freeze({
    network,
    action,
    nonce: requireString(object, 'nonce', operation),
    vaultAddress: optionalString(object, 'vaultAddress', operation),
    expiresAfter: optionalString(object, 'expiresAfter', operation),
    actionJson: requireString(object, 'actionJson', operation),
    messagePackHex: requireString(object, 'messagePackHex', operation),
    actionHashHex: requireString(object, 'actionHashHex', operation),
    signingDigestHex: requireString(object, 'signingDigestHex', operation),
    opaqueJson: json,
  });
}

export function decodeFinalizedAction(json: string): HyperAxisFinalizedAction {
  const operation = 'finalizeOrder';
  const object = requireJsonObject(parseJson(json, operation), operation);
  return Object.freeze({
    endpoint: requireString(object, 'endpoint', operation),
    requestJson: requireString(object, 'requestJson', operation),
    recoveredSigner: requireString(object, 'recoveredSigner', operation),
    opaqueJson: json,
  });
}

export function decodeLoggingConfig(json: string): HyperAxisAppliedLoggingConfig {
  const operation = 'configureLogging';
  const object = requireJsonObject(parseJson(json, operation), operation);
  return Object.freeze({
    enabled: requireBoolean(object, 'enabled', operation),
    level: requireLogLevel(object, 'level', operation),
    capacity: requireSafeInteger(object, 'capacity', operation),
  });
}

export function decodeLogBatch(json: string, operation: string): HyperAxisLogBatch {
  const object = requireJsonObject(parseJson(json, operation), operation);
  const records = object['records'];
  if (!Array.isArray(records)) {
    throw new TypeError(`${operation} is missing records.`);
  }
  const decodedRecords = records.map(
    (record: JsonValue): HyperAxisLogRecord => decodeLogRecord(record, operation),
  );
  return Object.freeze({
    dropped: requireString(object, 'dropped', operation),
    records: Object.freeze(decodedRecords),
  });
}

export function decodeHttpRequest(json: string, operation: string): HyperAxisHttpRequest {
  const object = requireJsonObject(parseJson(json, operation), operation);
  const headersObject = requireJsonObject(object['headers'] ?? null, operation);
  const headers: Record<string, string> = {};
  for (const [key, value] of Object.entries(headersObject)) {
    if (typeof value !== 'string') {
      throw new TypeError(`${operation} returned a non-string header.`);
    }
    headers[key] = value;
  }
  const kind = requireString(object, 'kind', operation);
  if (kind !== 'info' && kind !== 'signedAction') {
    throw new TypeError(`${operation} returned an unsupported request kind.`);
  }
  const method = requireString(object, 'method', operation);
  if (method !== 'POST') {
    throw new TypeError(`${operation} returned an unsupported HTTP method.`);
  }
  return Object.freeze({
    kind,
    method,
    url: requireString(object, 'url', operation),
    headers: Object.freeze(headers),
    body: requireString(object, 'body', operation),
  });
}

export function decodePreparedInfoQuery(json: string): HyperAxisPreparedInfoQuery {
  const operation = 'prepareInfoQuery';
  const object = requireJsonObject(parseJson(json, operation), operation);
  return Object.freeze({
    queryType: requireString(object, 'queryType', operation),
    body: requireString(object, 'body', operation),
  });
}

export function decodeParsedHttpResponse(json: string): HyperAxisParsedHttpResponse {
  const operation = 'parseHttpResponse';
  const object = requireJsonObject(parseJson(json, operation), operation);
  const requestKind = requireString(object, 'requestKind', operation);
  if (requestKind !== 'info' && requestKind !== 'signedAction') {
    throw new TypeError(`${operation} returned an unsupported request kind.`);
  }
  return Object.freeze({
    requestKind,
    statusCode: requireSafeInteger(object, 'statusCode', operation),
    kind: requireString(object, 'kind', operation),
    retry: requireRetryAdvice(object, 'retry', operation),
    payload: object['payload'] ?? null,
    message: optionalString(object, 'message', operation),
  });
}

export function decodeRetryAdvice(json: string): HyperAxisRetryAdvice {
  const value = parseJson(json, 'hostFailureRetryAdvice');
  if (
    value !== 'never' &&
    value !== 'reconcileBeforeRetry' &&
    value !== 'safeAfterBackoff'
  ) {
    throw new TypeError('hostFailureRetryAdvice returned an unsupported value.');
  }
  return value;
}

export function decodeWebSocketMessage(json: string): HyperAxisWebSocketMessage {
  return requireJsonObject(parseJson(json, 'parseWebSocketMessage'), 'parseWebSocketMessage');
}

function decodeLogRecord(value: JsonValue, operation: string): HyperAxisLogRecord {
  const object = requireJsonObject(value, operation);
  return Object.freeze({
    sequence: requireString(object, 'sequence', operation),
    timestampMs: requireString(object, 'timestampMs', operation),
    level: requireLogLevel(object, 'level', operation),
    target: requireString(object, 'target', operation),
    message: requireString(object, 'message', operation),
  });
}

function requireNetwork(value: JsonObject, operation: string): HyperAxisNetwork {
  const network = requireString(value, 'network', operation);
  if (network !== 'mainnet' && network !== 'testnet') {
    throw new TypeError(`${operation} returned an unsupported network.`);
  }
  return network;
}

function requireLogLevel(
  value: JsonObject,
  field: string,
  operation: string,
): HyperAxisLogLevel {
  const level = requireString(value, field, operation);
  if (
    level !== 'debug' &&
    level !== 'error' &&
    level !== 'info' &&
    level !== 'trace' &&
    level !== 'warn'
  ) {
    throw new TypeError(`${operation} returned an unsupported log level.`);
  }
  return level;
}

function requireRetryAdvice(
  value: JsonObject,
  field: string,
  operation: string,
): HyperAxisRetryAdvice {
  const retry = requireString(value, field, operation);
  if (
    retry !== 'never' &&
    retry !== 'reconcileBeforeRetry' &&
    retry !== 'safeAfterBackoff'
  ) {
    throw new TypeError(`${operation} returned unsupported retry advice.`);
  }
  return retry;
}

function requireBoolean(value: JsonObject, field: string, operation: string): boolean {
  const fieldValue = value[field];
  if (typeof fieldValue !== 'boolean') {
    throw new TypeError(`${operation} is missing boolean field ${field}.`);
  }
  return fieldValue;
}

function requireSafeInteger(value: JsonObject, field: string, operation: string): number {
  const fieldValue = value[field];
  if (typeof fieldValue !== 'number' || !Number.isSafeInteger(fieldValue)) {
    throw new TypeError(`${operation} is missing integer field ${field}.`);
  }
  return fieldValue;
}

function optionalString(
  value: JsonObject,
  field: string,
  operation: string,
): null | string {
  const fieldValue = value[field];
  if (fieldValue === null || fieldValue === undefined) return null;
  if (typeof fieldValue !== 'string') {
    throw new TypeError(`${operation} returned invalid optional field ${field}.`);
  }
  return fieldValue;
}

