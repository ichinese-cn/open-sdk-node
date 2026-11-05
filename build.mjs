#!/usr/bin/env node
// Builds the package for npm: dist/index.js (ESM), dist/index.cjs (CommonJS) and the type declarations.
import { execFileSync } from 'node:child_process';
import { rmSync } from 'node:fs';
import { createRequire } from 'node:module';
import { build } from 'esbuild';

rmSync('dist', { recursive: true, force: true });
const common = { entryPoints: ['src/index.ts'], bundle: true, platform: 'node', target: 'node20', logLevel: 'warning' };
await build({ ...common, format: 'esm', outfile: 'dist/index.js' });
await build({ ...common, format: 'cjs', outfile: 'dist/index.cjs' });
// By its path, not through a package manager: this also builds outside the workspace, with plain npm.
execFileSync(
  process.execPath,
  [createRequire(import.meta.url).resolve('typescript/bin/tsc'), '-p', 'tsconfig.build.json'],
  { stdio: 'inherit' },
);
console.log('@ichinese/open-sdk → dist/');
