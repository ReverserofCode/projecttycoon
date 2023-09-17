import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build:{
    outDir:'MemberBoard'
  },
  server:{
    port:3000,
    proxy:{
      "/sessionObject":"http://projecttycoon.com",
      "/api":"http://projecttycoon.com"
    }
  }
})
