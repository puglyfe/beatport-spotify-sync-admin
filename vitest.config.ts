import path from 'node:path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, './'),
    },
  },
  test: {
    environment: 'jsdom',
    globalSetup: ['./tests/setupTests.ts', './tests/setupHooks.ts'],
  },
});
