import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

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
