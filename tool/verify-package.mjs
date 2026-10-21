import { access } from 'node:fs/promises';

const requiredFiles = [
  '../dist/index.js',
  '../dist/index.d.ts',
  '../wasm/hyper_axis.js',
  '../wasm/hyper_axis.d.ts',
  '../wasm/hyper_axis_bg.wasm',
];

const missingFiles = [];
for (const relativePath of requiredFiles) {
  try {
    await access(new URL(relativePath, import.meta.url));
  } catch {
    missingFiles.push(relativePath.slice(3));
  }
}

if (missingFiles.length > 0) {
  throw new Error(
    `Package is incomplete. Missing: ${missingFiles.join(', ')}. ` +
      'Run npm run build and npm run build:wasm before publishing.',
  );
}
