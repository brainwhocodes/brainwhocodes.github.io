import { defineConfig } from 'vite';

export default defineConfig({
  // Base path for GitHub Pages (update with your repo name)
  base: './',
  
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Ensure clean build
    emptyOutDir: true,
    // Rollup options for proper bundling
    rollupOptions: {
      input: {
        main: './index.html'
      }
    }
  },
  
  // SCSS configuration with sass-embedded
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'
      }
    }
  },
  
  // Development server
  server: {
    port: 3000,
    open: true
  }
});
