import type {
  HyperAxisPerpAccountState,
  HyperAxisPerpAssetPosition,
  HyperAxisPerpCumulativeFunding,
  HyperAxisPerpLeverage,
  HyperAxisPerpMarginSummary,
  HyperAxisPerpPosition,
  HyperAxisSpotAccountState,
  HyperAxisSpotBalance,
} from '../models/accounts.js';
import {
  type JsonObject,
  type JsonValue,
  parseJson,
  requireJsonObject,
  requireString,
} from '../models/json.js';

/** Decodes Rust-canonicalized `clearinghouseState` JSON. */
export function decodePerpAccountState(json: string): HyperAxisPerpAccountState {
  const operation = 'parsePerpAccountState';
  const object = requireJsonObject(parseJson(json, operation), operation);
  const positions = requireArray(object, 'assetPositions', operation).map(
    (value: JsonValue): HyperAxisPerpAssetPosition =>
      decodeAssetPosition(value, operation),
  );
  return Object.freeze({
    assetPositions: Object.freeze(positions),
    crossMaintenanceMarginUsed: requireString(
      object,
      'crossMaintenanceMarginUsed',
      operation,
    ),
    crossMarginSummary: decodeMarginSummary(
      object['crossMarginSummary'] ?? null,
      operation,
    ),
    marginSummary: decodeMarginSummary(object['marginSummary'] ?? null, operation),
    time: requireString(object, 'time', operation),
    withdrawable: requireString(object, 'withdrawable', operation),
  });
}

/** Decodes Rust-canonicalized `spotClearinghouseState` JSON. */
export function decodeSpotAccountState(json: string): HyperAxisSpotAccountState {
  const operation = 'parseSpotAccountState';
  const object = requireJsonObject(parseJson(json, operation), operation);
  const balances = requireArray(object, 'balances', operation).map(
    (value: JsonValue): HyperAxisSpotBalance => {
      const balance = requireJsonObject(value, operation);
      return Object.freeze({
        coin: requireString(balance, 'coin', operation),
        token: requireSafeInteger(balance, 'token', operation),
        hold: requireString(balance, 'hold', operation),
        total: requireString(balance, 'total', operation),
        entryNtl: requireString(balance, 'entryNtl', operation),
      });
    },
  );
  return Object.freeze({ balances: Object.freeze(balances) });
}

function decodeAssetPosition(
  value: JsonValue,
  operation: string,
): HyperAxisPerpAssetPosition {
  const object = requireJsonObject(value, operation);
  return Object.freeze({
    type: requireString(object, 'type', operation),
    position: decodePosition(object['position'] ?? null, operation),
  });
}

function decodePosition(
  value: JsonValue,
  operation: string,
): HyperAxisPerpPosition {
  const object = requireJsonObject(value, operation);
  return Object.freeze({
    coin: requireString(object, 'coin', operation),
    cumFunding: decodeFunding(object['cumFunding'] ?? null, operation),
    entryPx: optionalString(object, 'entryPx', operation),
    leverage: decodeLeverage(object['leverage'] ?? null, operation),
    liquidationPx: optionalString(object, 'liquidationPx', operation),
    marginUsed: requireString(object, 'marginUsed', operation),
    maxLeverage: requireSafeInteger(object, 'maxLeverage', operation),
    positionValue: requireString(object, 'positionValue', operation),
    returnOnEquity: requireString(object, 'returnOnEquity', operation),
    szi: requireString(object, 'szi', operation),
    unrealizedPnl: requireString(object, 'unrealizedPnl', operation),
  });
}

function decodeFunding(
  value: JsonValue,
  operation: string,
): HyperAxisPerpCumulativeFunding {
  const object = requireJsonObject(value, operation);
  return Object.freeze({
    allTime: requireString(object, 'allTime', operation),
    sinceChange: requireString(object, 'sinceChange', operation),
    sinceOpen: requireString(object, 'sinceOpen', operation),
  });
}

function decodeLeverage(
  value: JsonValue,
  operation: string,
): HyperAxisPerpLeverage {
  const object = requireJsonObject(value, operation);
  return Object.freeze({
    type: requireString(object, 'type', operation),
    value: requireSafeInteger(object, 'value', operation),
    rawUsd: optionalString(object, 'rawUsd', operation),
  });
}

function decodeMarginSummary(
  value: JsonValue,
  operation: string,
): HyperAxisPerpMarginSummary {
  const object = requireJsonObject(value, operation);
  return Object.freeze({
    accountValue: requireString(object, 'accountValue', operation),
    totalMarginUsed: requireString(object, 'totalMarginUsed', operation),
    totalNtlPos: requireString(object, 'totalNtlPos', operation),
    totalRawUsd: requireString(object, 'totalRawUsd', operation),
  });
}

function requireArray(
  object: JsonObject,
  field: string,
  operation: string,
): readonly JsonValue[] {
  const value = object[field];
  if (value === undefined || !isJsonArray(value)) {
    throw new TypeError(`${operation} is missing array field ${field}.`);
  }
  return value;
}

function isJsonArray(value: JsonValue): value is readonly JsonValue[] {
  return Array.isArray(value);
}

function requireSafeInteger(
  object: JsonObject,
  field: string,
  operation: string,
): number {
  const value = object[field];
  if (typeof value !== 'number' || !Number.isSafeInteger(value)) {
    throw new TypeError(`${operation} is missing integer field ${field}.`);
  }
  return value;
}

function optionalString(
  object: JsonObject,
  field: string,
  operation: string,
): null | string {
  const value = object[field];
  if (value === null || value === undefined) return null;
  if (typeof value !== 'string') {
    throw new TypeError(`${operation} returned invalid optional field ${field}.`);
  }
  return value;
}
