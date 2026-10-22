export interface PerpRiskInput {
  readonly entryPrice: string;
  readonly leverage: number;
  readonly margin: string;
  readonly side: 'buy' | 'sell';
  readonly sizeDecimals: number;
}

export interface PerpRiskPreview {
  readonly leverage: number;
  readonly margin: string;
  readonly notional: string;
  readonly orderSize: string;
  readonly zeroEquityPrice: string;
}

interface ParsedDecimal {
  readonly coefficient: bigint;
  readonly scale: number;
}

const MAX_DECIMAL_DIGITS = 80;
const MAX_DECIMAL_SCALE = 38;

/**
 * Calculates a client-side isolated-position preview without using floating-point
 * arithmetic. The zero-equity price deliberately excludes maintenance margin,
 * fees, and account state, so it must never be presented as a liquidation price.
 */
export function calculatePerpRiskPreview(input: PerpRiskInput): PerpRiskPreview | null {
  const price = parsePositiveDecimal(input.entryPrice);
  const margin = parsePositiveDecimal(input.margin);
  const leverage = Math.trunc(input.leverage);
  if (
    price === null
    || margin === null
    || leverage < 1
    || !Number.isSafeInteger(leverage)
    || input.sizeDecimals < 0
    || input.sizeDecimals > MAX_DECIMAL_SCALE
    || !Number.isSafeInteger(input.sizeDecimals)
  ) return null;

  const notionalCoefficient = margin.coefficient * BigInt(leverage);
  const orderSizeCoefficient = divideScaled(
    notionalCoefficient,
    margin.scale,
    price.coefficient,
    price.scale,
    input.sizeDecimals,
  );
  if (orderSizeCoefficient <= 0n) return null;

  const zeroEquityScale = Math.max(price.scale, 6);
  const zeroEquityMultiplier = input.side === 'buy' ? leverage - 1 : leverage + 1;
  const zeroEquityCoefficient = divideAndRound(
    price.coefficient * BigInt(zeroEquityMultiplier) * powerOfTen(zeroEquityScale),
    powerOfTen(price.scale) * BigInt(leverage),
  );

  return {
    leverage,
    margin: formatDecimal(margin.coefficient, margin.scale),
    notional: formatDecimal(notionalCoefficient, margin.scale),
    orderSize: formatDecimal(orderSizeCoefficient, input.sizeDecimals),
    zeroEquityPrice: formatDecimal(zeroEquityCoefficient, zeroEquityScale),
  };
}

/** Multiplies positive decimal strings exactly for display-only order summaries. */
export function multiplyPositiveDecimals(leftValue: string, rightValue: string): string | null {
  const left = parsePositiveDecimal(leftValue);
  const right = parsePositiveDecimal(rightValue);
  if (left === null || right === null) return null;
  return formatDecimal(left.coefficient * right.coefficient, left.scale + right.scale);
}

function parsePositiveDecimal(value: string): ParsedDecimal | null {
  const normalized = value.trim();
  if (normalized.length === 0 || normalized.length > MAX_DECIMAL_DIGITS + 1) return null;
  const match = /^(\d+)(?:\.(\d+))?$/u.exec(normalized);
  if (match === null) return null;
  const whole = match[1];
  if (whole === undefined) return null;
  const fraction = match[2] ?? '';
  if (whole.length + fraction.length > MAX_DECIMAL_DIGITS || fraction.length > MAX_DECIMAL_SCALE) return null;
  const coefficient = BigInt(`${whole}${fraction}`);
  return coefficient > 0n ? { coefficient, scale: fraction.length } : null;
}

function divideScaled(
  numerator: bigint,
  numeratorScale: number,
  denominator: bigint,
  denominatorScale: number,
  outputScale: number,
): bigint {
  return (
    numerator * powerOfTen(denominatorScale + outputScale)
  ) / (
    denominator * powerOfTen(numeratorScale)
  );
}

function divideAndRound(numerator: bigint, denominator: bigint): bigint {
  return (numerator + denominator / 2n) / denominator;
}

function powerOfTen(exponent: number): bigint {
  return 10n ** BigInt(exponent);
}

function formatDecimal(coefficient: bigint, scale: number): string {
  if (scale === 0) return coefficient.toString();
  const padded = coefficient.toString().padStart(scale + 1, '0');
  const whole = padded.slice(0, -scale);
  const fraction = padded.slice(-scale).replace(/0+$/u, '');
  return fraction === '' ? whole : `${whole}.${fraction}`;
}
