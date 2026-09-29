/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Relative asset URLs, so the build works at a domain root or under a subpath (e.g. GitHub Pages).
  base: './',
  build: {
    // Keep CRA's output folder so the gh-pages deploy script is unchanged.
    outDir: 'build',
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
});
