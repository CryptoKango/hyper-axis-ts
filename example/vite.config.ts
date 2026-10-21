import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: {
    // wasm-bindgen resolves its .wasm file relative to the generated module.
    // Keeping this module out of Vite's dependency pre-bundle preserves that URL.
    exclude: ['@cryptokango/hyper-axis/wasm'],
  },
});
