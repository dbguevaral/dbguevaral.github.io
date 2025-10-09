import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: { quietDeps: true }
    }
  },
  plugins: [react()],
  build: {
    outDir: 'docs' // GitHub Pages expects static files here
  },
  base: '/' // Like this because your repo is the same name as the username
});

