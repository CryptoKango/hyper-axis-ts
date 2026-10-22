import { fileURLToPath } from 'node:url';

import { defineConfig } from 'vite';

const repositoryRoot = fileURLToPath(new URL('..', import.meta.url));

export default defineConfig({
  optimizeDeps: {
    // wasm-bindgen resolves its .wasm file relative to the generated module.
    // Keeping this module out of Vite's dependency pre-bundle preserves that URL.
    exclude: ['@cryptokango/hyper-axis/wasm'],
  },
  server: {
    fs: {
      // Required when the example consumes the SDK through `file:..`.
      allow: [repositoryRoot],
    },
  },
});
