import { describe, expect, it, vi } from 'vitest';

import { HyperAxisClient, HyperAxisError } from '../src/index.js';
import type { HyperAxisWasmBindings } from '../src/wasm/bindings.js';
import {
  createFakeBindings,
  preparedActionJson,
  preparedUserActionJson,
} from './fakes.js';

describe('HyperAxisClient initialization', () => {
  it('deduplicates concurrent initialization for the same loader', async () => {
    const bindings = createFakeBindings();
    const loader = vi.fn((): Promise<HyperAxisWasmBindings> => Promise.resolve(bindings));

    const [first, second] = await Promise.all([
      HyperAxisClient.initialize(loader),
      HyperAxisClient.initialize(loader),
    ]);

    expect(first).toBe(second);
    expect(first.protocolVersion).toBe('0.3.1');
    expect(loader).toHaveBeenCalledTimes(1);
  });

  it('rejects an incompatible Rust protocol version', async () => {
    const bindings = createFakeBindings({ protocol_version: () => '0.2.0' });

    await expect(
      HyperAxisClient.initialize(() => Promise.resolve(bindings)),
    ).rejects.toMatchObject({
      code: 'incompatibleVersion',
      operation: 'protocolVersion',
    });
  });
});

describe('HyperAxisClient order flow', () => {
  it('passes exact values to Rust and preserves opaque prepared JSON', async () => {
    const prepare = vi.fn(() => preparedActionJson);
    const bindings = createFakeBindings({ prepare_limit_order_json: prepare });
    const client = await HyperAxisClient.initialize(() => Promise.resolve(bindings));

    const prepared = client.prepareLimitOrder({
      network: 'mainnet',
      asset: 0,
      marketKind: 'perp',
      sizeDecimals: 5,
      side: 'buy',
      limitPrice: '3500.2500',
      size: '0.01000',
      nonce: '1700000000000',
    });

    expect(prepare).toHaveBeenCalledWith(
      'mainnet',
      0,
      'perp',
      5,
      'buy',
      '3500.2500',
      '0.01000',
      false,
      'Gtc',
      '1700000000000',
      null,
      null,
    );
    expect(prepared.opaqueJson).toBe(preparedActionJson);
    expect(prepared.signingDigestHex).toHaveLength(66);
  });

  it('passes opaque Rust JSON unchanged into finalization', async () => {
    const finalize = vi.fn(() =>
      JSON.stringify({
        endpoint: 'https://api.hyperliquid.xyz/exchange',
        requestJson: '{}',
        recoveredSigner: '0x0000000000000000000000000000000000000001',
      }),
    );
    const bindings = createFakeBindings({ finalize_order_json: finalize });
    const client = await HyperAxisClient.initialize(() => Promise.resolve(bindings));
    const prepared = client.prepareLimitOrder({
      network: 'mainnet',
      asset: 0,
      marketKind: 'perp',
      sizeDecimals: 5,
      side: 'buy',
      limitPrice: '1',
      size: '1',
      nonce: '1700000000000',
    });

    const finalized = client.finalizeOrder({
      prepared,
      signature: { r: '0x01', s: '0x02', v: 27 },
      expectedSigner: '0x0000000000000000000000000000000000000001',
    });

    expect(finalize).toHaveBeenCalledWith(
      preparedActionJson,
      '0x01',
      '0x02',
      27,
      '0x0000000000000000000000000000000000000001',
    );
    expect(finalized.opaqueJson).toContain('recoveredSigner');
  });

  it('rejects values that would be truncated at the WASM u32 boundary', async () => {
    const client = await HyperAxisClient.initialize(() =>
      Promise.resolve(createFakeBindings()),
    );

    expect(() =>
      client.prepareLimitOrder({
        network: 'mainnet',
        asset: 4_294_967_296,
        marketKind: 'perp',
        sizeDecimals: 5,
        side: 'buy',
        limitPrice: '1',
        size: '1',
        nonce: '1',
      }),
    ).toThrow(HyperAxisError);
  });

  it('preserves cancellation OIDs and nonces as exact strings', async () => {
    const prepare = vi.fn(() => preparedActionJson);
    const finalize = vi.fn(() =>
      JSON.stringify({
        endpoint: 'https://api.hyperliquid.xyz/exchange',
        requestJson: '{"action":{"type":"cancel"}}',
        recoveredSigner: '0x0000000000000000000000000000000000000001',
      }),
    );
    const client = await HyperAxisClient.initialize(() =>
      Promise.resolve(
        createFakeBindings({
          prepare_cancel_json: prepare,
          finalize_cancel_json: finalize,
        }),
      ),
    );
    const prepared = client.prepareCancel({
      network: 'mainnet',
      cancels: [{ asset: 3, orderId: '18446744073709551615' }],
      nonce: '1700000000000',
    });
    client.finalizeCancel({
      prepared,
      signature: { r: '0x01', s: '0x02', v: 27 },
      expectedSigner: '0x0000000000000000000000000000000000000001',
    });

    expect(prepare).toHaveBeenCalledWith(
      JSON.stringify({
        network: 'mainnet',
        cancels: [{ asset: 3, oid: '18446744073709551615' }],
        nonce: '1700000000000',
        vaultAddress: null,
        expiresAfter: null,
      }),
    );
    expect(finalize).toHaveBeenCalledWith(
      preparedActionJson,
      '0x01',
      '0x02',
      27,
      '0x0000000000000000000000000000000000000001',
    );
  });
});

describe('HyperAxisClient leverage flow', () => {
  it('serializes exact leverage inputs and preserves the prepared artifact', async () => {
    const prepare = vi.fn(() => preparedActionJson);
    const client = await HyperAxisClient.initialize(() =>
      Promise.resolve(
        createFakeBindings({ prepare_update_leverage_json: prepare }),
      ),
    );

    const prepared = client.prepareUpdateLeverage({
      network: 'mainnet',
      asset: 4,
      isCross: false,
      leverage: 12,
      maxLeverage: 50,
      nonce: '1700000000000',
    });

    expect(prepare).toHaveBeenCalledWith(
      JSON.stringify({
        network: 'mainnet',
        asset: 4,
        isCross: false,
        leverage: 12,
        maxLeverage: 50,
        nonce: '1700000000000',
        vaultAddress: null,
        expiresAfter: null,
      }),
    );
    expect(prepared.opaqueJson).toBe(preparedActionJson);
  });

  it('passes opaque leverage JSON unchanged into finalization', async () => {
    const finalize = vi.fn(() =>
      JSON.stringify({
        endpoint: 'https://api.hyperliquid.xyz/exchange',
        requestJson: '{}',
        recoveredSigner: '0x0000000000000000000000000000000000000001',
      }),
    );
    const client = await HyperAxisClient.initialize(() =>
      Promise.resolve(
        createFakeBindings({ finalize_update_leverage_json: finalize }),
      ),
    );
    const prepared = client.prepareUpdateLeverage({
      network: 'mainnet',
      asset: 4,
      isCross: true,
      leverage: 20,
      maxLeverage: 50,
      nonce: '1700000000000',
    });

    client.finalizeUpdateLeverage({
      prepared,
      signature: { r: '0x01', s: '0x02', v: 27 },
      expectedSigner: '0x0000000000000000000000000000000000000001',
    });

    expect(finalize).toHaveBeenCalledWith(
      preparedActionJson,
      '0x01',
      '0x02',
      27,
      '0x0000000000000000000000000000000000000001',
    );
  });

  it('rejects leverage above current market metadata before invoking Rust', async () => {
    const prepare = vi.fn(() => preparedActionJson);
    const client = await HyperAxisClient.initialize(() =>
      Promise.resolve(
        createFakeBindings({ prepare_update_leverage_json: prepare }),
      ),
    );

    expect(() =>
      client.prepareUpdateLeverage({
        network: 'mainnet',
        asset: 4,
        isCross: true,
        leverage: 51,
        maxLeverage: 50,
        nonce: '1700000000000',
      }),
    ).toThrow(HyperAxisError);
    expect(prepare).not.toHaveBeenCalled();
  });
});

describe('HyperAxisClient runtime and transport', () => {
  it('manages nonce lifecycle and prevents use after disposal', async () => {
    const client = await HyperAxisClient.initialize(() =>
      Promise.resolve(createFakeBindings()),
    );
    const manager = client.createNonceManager('9');

    expect(manager.next('10')).toBe('10');
    manager.fastForward('11');
    expect(manager.lastIssued).toBe('11');
    manager.dispose();
    manager.dispose();
    expect(() => manager.next('12')).toThrow(HyperAxisError);
  });

  it('serializes typed info queries before crossing the WASM boundary', async () => {
    const build = vi.fn(() =>
      JSON.stringify({
        kind: 'info',
        method: 'POST',
        url: 'https://api.hyperliquid.xyz/info',
        headers: { 'content-type': 'application/json' },
        body: '{"type":"allMids"}',
      }),
    );
    const client = await HyperAxisClient.initialize(() =>
      Promise.resolve(
        createFakeBindings({ build_typed_info_http_request_json: build }),
      ),
    );

    const request = client.buildTypedInfoHttpRequest('mainnet', {
      type: 'allMids',
      dex: '',
    });

    expect(build).toHaveBeenCalledWith(
      'mainnet',
      JSON.stringify({ type: 'allMids', dex: '' }),
    );
    expect(request.kind).toBe('info');
    expect(Object.isFrozen(request.headers)).toBe(true);
  });

  it('passes HIP-3 dex scope and validates typed RWA responses in Rust', async () => {
    const prepare = vi.fn(() =>
      JSON.stringify({
        queryType: 'metaAndAssetCtxs',
        body: '{"type":"metaAndAssetCtxs","dex":"xyz"}',
      }),
    );
    const parse = vi.fn((body: string) => body);
    const client = await HyperAxisClient.initialize(() =>
      Promise.resolve(
        createFakeBindings({
          prepare_info_query_json: prepare,
          parse_perp_meta_and_asset_ctxs_response_json: parse,
        }),
      ),
    );

    const prepared = client.prepareInfoQuery({ type: 'metaAndAssetCtxs', dex: 'xyz' });
    const response = client.parsePerpMetaAndAssetCtxsResponse('[{"universe":[]},[]]');

    expect(prepare).toHaveBeenCalledWith(
      JSON.stringify({ type: 'metaAndAssetCtxs', dex: 'xyz' }),
    );
    expect(prepared.body).toContain('"dex":"xyz"');
    expect(parse).toHaveBeenCalledOnce();
    expect(response).toEqual([{ universe: [] }, []]);
  });

  it('validates host-side integer boundaries before invoking Rust', async () => {
    const parse = vi.fn(() => '{}');
    const client = await HyperAxisClient.initialize(() =>
      Promise.resolve(createFakeBindings({ parse_http_response_json: parse })),
    );

    expect(() => client.parseHttpResponse('info', 65_536, '{}')).toThrow(
      HyperAxisError,
    );
    expect(parse).not.toHaveBeenCalled();
  });

  it('decodes logging records into immutable snapshots', async () => {
    const client = await HyperAxisClient.initialize(() =>
      Promise.resolve(
        createFakeBindings({
          snapshot_logs_json: () =>
            JSON.stringify({
              dropped: '2',
              records: [
                {
                  sequence: '3',
                  timestampMs: '1700000000000',
                  level: 'info',
                  target: 'order',
                  message: 'prepared',
                },
              ],
            }),
        }),
      ),
    );

    const batch = client.snapshotLogs();
    expect(batch.dropped).toBe('2');
    expect(batch.records[0]?.message).toBe('prepared');
    expect(Object.isFrozen(batch.records)).toBe(true);
  });
});

describe('HyperAxisClient account flow', () => {
  it('decodes exact perpetual and spot account responses', async () => {
    const client = await HyperAxisClient.initialize(() =>
      Promise.resolve(createFakeBindings()),
    );
    const perpetual = client.parsePerpAccountState(
      JSON.stringify({
        assetPositions: [],
        crossMaintenanceMarginUsed: '1.25',
        crossMarginSummary: {
          accountValue: '100',
          totalMarginUsed: '20',
          totalNtlPos: '200',
          totalRawUsd: '100',
        },
        marginSummary: {
          accountValue: '100',
          totalMarginUsed: '20',
          totalNtlPos: '200',
          totalRawUsd: '100',
        },
        time: '1700000000000',
        withdrawable: '80',
      }),
    );
    const spot = client.parseSpotAccountState(
      JSON.stringify({
        balances: [
          { coin: 'USDC', token: 0, hold: '1', total: '10', entryNtl: '0' },
        ],
      }),
    );

    expect(perpetual.time).toBe('1700000000000');
    expect(Object.isFrozen(perpetual.assetPositions)).toBe(true);
    expect(spot.balances[0]?.total).toBe('10');
  });

  it('prepares and finalizes an exact spot/perp USDC transfer', async () => {
    const prepare = vi.fn(() => preparedUserActionJson);
    const finalize = vi.fn(() =>
      JSON.stringify({
        endpoint: 'https://api.hyperliquid.xyz/exchange',
        requestJson: '{}',
        recoveredSigner: '0x0000000000000000000000000000000000000001',
      }),
    );
    const client = await HyperAxisClient.initialize(() =>
      Promise.resolve(
        createFakeBindings({
          prepare_usd_class_transfer_json: prepare,
          finalize_usd_class_transfer_json: finalize,
        }),
      ),
    );
    const prepared = client.prepareUsdClassTransfer({
      network: 'mainnet',
      amount: '12.5000',
      toPerp: true,
      nonce: '1700000000000',
    });
    const finalized = client.finalizeUsdClassTransfer({
      prepared,
      signature: { r: '0x01', s: '0x02', v: 27 },
      expectedSigner: '0x0000000000000000000000000000000000000001',
    });

    expect(prepare).toHaveBeenCalledWith(
      JSON.stringify({
        network: 'mainnet',
        amount: '12.5000',
        toPerp: true,
        subAccount: null,
        nonce: '1700000000000',
      }),
    );
    expect(finalize).toHaveBeenCalledWith(
      preparedUserActionJson,
      '0x01',
      '0x02',
      27,
      '0x0000000000000000000000000000000000000001',
    );
    expect(finalized.endpoint).toContain('/exchange');
  });

  it('prepares and finalizes an exact bridge withdrawal', async () => {
    const prepare = vi.fn(() => preparedUserActionJson);
    const finalize = vi.fn(() =>
      JSON.stringify({
        endpoint: 'https://api.hyperliquid.xyz/exchange',
        requestJson: '{"action":{"type":"withdraw3"}}',
        recoveredSigner: '0x0000000000000000000000000000000000000001',
      }),
    );
    const client = await HyperAxisClient.initialize(() =>
      Promise.resolve(
        createFakeBindings({
          prepare_withdraw_json: prepare,
          finalize_withdraw_json: finalize,
        }),
      ),
    );
    const prepared = client.prepareWithdraw({
      network: 'mainnet',
      destination: '0x0000000000000000000000000000000000000001',
      amount: '5.25',
      nonce: '1700000000000',
    });
    client.finalizeWithdraw({
      prepared,
      signature: { r: '0x01', s: '0x02', v: 27 },
      expectedSigner: '0x0000000000000000000000000000000000000001',
    });

    expect(prepare).toHaveBeenCalledWith(
      JSON.stringify({
        network: 'mainnet',
        destination: '0x0000000000000000000000000000000000000001',
        amount: '5.25',
        nonce: '1700000000000',
      }),
    );
    expect(finalize).toHaveBeenCalledWith(
      preparedUserActionJson,
      '0x01',
      '0x02',
      27,
      '0x0000000000000000000000000000000000000001',
    );
  });
});
