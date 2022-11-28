import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '~': path.join(__dirname, 'src'),
    },
  },
  build: {
    rollupOptions: {
      manualChunks: {
        mui: ['@mui/material'],
        muicons: ['@mui/icons-material'],
      },
    },
  },
})
