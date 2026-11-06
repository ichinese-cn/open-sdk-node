import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

// Its own module cache: by default every package's vitest shares `node_modules/.vitest-cache` at the workspace
// root, and one run clearing it while another writes there fails with ENOTEMPTY when `pnpm test` runs them
// in parallel.
export default defineConfig({
  test: {
    include: ['test/**/*.test.ts'],
    fsModuleCachePath: fileURLToPath(new URL('./node_modules/.vitest-cache', import.meta.url)),
  },
});
