import { readFile } from 'node:fs/promises';

import {
  HyperAxisClient,
  createHyperAxisWasmLoader,
} from '../dist/index.js';

const wasmBytes = await readFile(
  new URL('../wasm/hyper_axis_bg.wasm', import.meta.url),
);
const loader = createHyperAxisWasmLoader({
  importModule: () => import('../wasm/hyper_axis.js'),
  wasmInput: wasmBytes,
});
const client = await HyperAxisClient.initialize(loader);

if (client.protocolVersion !== '0.3.2') {
  throw new Error(`Unexpected protocol version: ${client.protocolVersion}`);
}
if (client.normalizeDecimal('001.2300') !== '1.23') {
  throw new Error('Rust decimal normalization smoke test failed.');
}

const prepared = client.prepareInfoQuery({ type: 'allMids', dex: '' });
if (prepared.queryType !== 'allMids') {
  throw new Error(`Unexpected Info query type: ${prepared.queryType}`);
}

const account = client.parsePerpAccountState(
  '{"assetPositions":[],"crossMaintenanceMarginUsed":"0.0",' +
    '"crossMarginSummary":{"accountValue":"1","totalMarginUsed":"0",' +
    '"totalNtlPos":"0","totalRawUsd":"1"},"marginSummary":' +
    '{"accountValue":"1","totalMarginUsed":"0","totalNtlPos":"0",' +
    '"totalRawUsd":"1"},"time":1,"withdrawable":"1"}',
);
if (account.time !== '1' || account.withdrawable !== '1') {
  throw new Error('Perpetual account parsing smoke test failed.');
}

const subscription = client.websocketSubscribe({
  type: 'clearinghouseState',
  user: '0x000000000000000000000000000000000000beef',
  dex: '',
});
if (!subscription.includes('clearinghouseState')) {
  throw new Error('Perpetual account subscription smoke test failed.');
}

const transfer = client.prepareUsdClassTransfer({
  network: 'mainnet',
  amount: '1.25',
  toPerp: true,
  nonce: '1234567890000',
});
if (transfer.signingDigestHex.length === 0) {
  throw new Error('USDC class-transfer preparation smoke test failed.');
}

const leverage = client.prepareUpdateLeverage({
  network: 'mainnet',
  asset: 4,
  isCross: false,
  leverage: 12,
  maxLeverage: 50,
  nonce: '1234567890000',
});
if (leverage.action.type !== 'updateLeverage') {
  throw new Error('Leverage-update preparation smoke test failed.');
}

console.log('HyperAxis Rust WASM smoke test passed.');
