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

if (client.protocolVersion !== '0.1.0') {
  throw new Error(`Unexpected protocol version: ${client.protocolVersion}`);
}
if (client.normalizeDecimal('001.2300') !== '1.23') {
  throw new Error('Rust decimal normalization smoke test failed.');
}

const prepared = client.prepareInfoQuery({ type: 'allMids', dex: '' });
if (prepared.queryType !== 'allMids') {
  throw new Error(`Unexpected Info query type: ${prepared.queryType}`);
}

console.log('HyperAxis Rust WASM smoke test passed.');
