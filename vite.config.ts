/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import Icons from 'unplugin-icons/vite';

export default defineConfig({
  plugins: [
    solid(),
    // Import each icon from its own module (`~icons/<set>/<name>`), never destructured from a barrel. See ADR-001.
    Icons({ compiler: 'solid' }),
  ],
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
