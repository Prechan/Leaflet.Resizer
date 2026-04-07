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
    rolldownOptions: {
      external: ['leaflet'],
      output: {
        globals: { leaflet: 'L' },
        assetFileNames: (assetInfo) => {
          const originalName = assetInfo.originalFileNames?.[0] ?? assetInfo.originalFileName;
          if (originalName === 'style.css') return 'leaflet.resizer.min.css';
          return assetInfo.names?.[0] ?? assetInfo.name ?? '[name][extname]';
        }
      }
    }
  }
});
