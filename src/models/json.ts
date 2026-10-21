/** JSON primitive accepted at the Rust WebAssembly boundary. */
export type JsonPrimitive = boolean | null | number | string;

/** Recursively typed JSON value. Protocol integers wider than 32 bits remain strings. */
export type JsonValue = JsonPrimitive | JsonObject | readonly JsonValue[];

/** JSON object with unknown but validated value shapes. */
export interface JsonObject {
  readonly [key: string]: JsonValue;
}

/** Parses JSON without leaking TypeScript's unsafe `any` type. */
export function parseJson(text: string, operation: string): JsonValue {
  let value: unknown;
  try {
    value = JSON.parse(text) as unknown;
  } catch (error: unknown) {
    throw new TypeError(`${operation} returned malformed JSON.`, { cause: error });
  }
  if (!isJsonValue(value)) {
    throw new TypeError(`${operation} returned a non-JSON value.`);
  }
  return value;
}

/** Serializes a validated JSON value without permitting `undefined`. */
export function stringifyJson(value: JsonValue, operation: string): string {
  try {
    return JSON.stringify(value);
  } catch (error: unknown) {
    throw new TypeError(`${operation} received a value that cannot be serialized.`, {
      cause: error,
    });
  }
}

/** Requires a parsed JSON object. */
export function requireJsonObject(value: JsonValue, operation: string): JsonObject {
  if (value === null || isJsonArray(value) || typeof value !== 'object') {
    throw new TypeError(`${operation} must return a JSON object.`);
  }
  return value;
}

function isJsonArray(value: JsonValue): value is readonly JsonValue[] {
  return Array.isArray(value);
}

/** Requires a string field from a JSON object. */
export function requireString(
  value: JsonObject,
  field: string,
  operation: string,
): string {
  const fieldValue = value[field];
  if (typeof fieldValue !== 'string') {
    throw new TypeError(`${operation} is missing string field ${field}.`);
  }
  return fieldValue;
}

function isJsonValue(value: unknown): value is JsonValue {
  if (
    value === null ||
    typeof value === 'boolean' ||
    typeof value === 'string'
  ) {
    return true;
  }
  if (typeof value === 'number') {
    return Number.isFinite(value);
  }
  if (Array.isArray(value)) {
    return value.every((item: unknown) => isJsonValue(item));
  }
  if (typeof value === 'object') {
    return Object.values(value).every((item: unknown) => isJsonValue(item));
  }
  return false;
}

