import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build:{
    outDir:'ProjectBoard',
    rollupOptions: {
      input: {
        app: './index.html', // default
      },
    },
  },
  server:{
    port:3000
  }
})
