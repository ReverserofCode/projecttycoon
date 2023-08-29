import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build:{
    outDir:'PageLogin'
  },
  server:{
    port:3000,
    proxy:{
      '/login':'http://projecttycoon.com/login'
    }
  }
})
