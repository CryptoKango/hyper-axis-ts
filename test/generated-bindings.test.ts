import { describe, expect, it } from 'vitest';

import { createHyperAxisWasmLoader } from '../src/index.js';

describe('generated WASM bindings', () => {
  it('satisfies the stable loader module contract', () => {
    const loader = createHyperAxisWasmLoader({
      importModule: () => import('../wasm/hyper_axis.js'),
    });

    expect(loader).toBeTypeOf('function');
  });
});
