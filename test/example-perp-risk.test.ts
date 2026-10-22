import { describe, expect, it } from 'vitest';

import {
  calculatePerpRiskPreview,
  multiplyPositiveDecimals,
} from '../example/src/perp-risk.js';

describe('example perpetual risk preview', () => {
  it('derives long size, notional, and zero-equity reference without floats', () => {
    expect(calculatePerpRiskPreview({
      entryPrice: '50000',
      leverage: 10,
      margin: '100',
      side: 'buy',
      sizeDecimals: 5,
    })).toEqual({
      leverage: 10,
      margin: '100',
      notional: '1000',
      orderSize: '0.02',
      zeroEquityPrice: '45000',
    });
  });

  it('derives the short zero-equity reference above entry', () => {
    expect(calculatePerpRiskPreview({
      entryPrice: '50000',
      leverage: 10,
      margin: '100',
      side: 'sell',
      sizeDecimals: 5,
    })?.zeroEquityPrice).toBe('55000');
  });

  it('floors order size to the market size precision', () => {
    expect(calculatePerpRiskPreview({
      entryPrice: '3',
      leverage: 2,
      margin: '1',
      side: 'buy',
      sizeDecimals: 2,
    })?.orderSize).toBe('0.66');
  });

  it('rejects invalid or zero values', () => {
    expect(calculatePerpRiskPreview({
      entryPrice: '0',
      leverage: 10,
      margin: '100',
      side: 'buy',
      sizeDecimals: 5,
    })).toBeNull();
    expect(multiplyPositiveDecimals('1.2', 'bad')).toBeNull();
    expect(multiplyPositiveDecimals(`1.${'1'.repeat(39)}`, '2')).toBeNull();
  });

  it('multiplies decimal order values exactly', () => {
    expect(multiplyPositiveDecimals('0.00000001', '123456789')).toBe('1.23456789');
  });
});
