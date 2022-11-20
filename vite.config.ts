import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
    }),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://api.football-data.org/v4',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/crests': {
        target: 'https://crests.football-data.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/crests/, ''),
      },
    },
  },
});
