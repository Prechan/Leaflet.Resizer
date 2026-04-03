import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.js'],
    css: false,
  },
  build: {
    lib: {
      entry: './src/leaflet.resizer.js',
      name: 'LeafletResizer',
      formats: ['iife'],
      fileName: () => 'leaflet.resizer.min.js'
    },
    outDir: 'dist',
    rollupOptions: {
      external: ['leaflet'],
      output: {
        globals: { leaflet: 'L' },
        assetFileNames: (assetInfo) =>
          assetInfo.name === 'style.css' ? 'leaflet.resizer.min.css' : assetInfo.name
      }
    }
  }
});
