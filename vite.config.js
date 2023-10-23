import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build:{
    outDir:'MemberPage'
  },
  server:{
    port:3000,
    proxy:{
      "/api":"http://projecttycoon.com",
      "/sessionObject":"http://projecttycoon.com",
      "/api/logoutProcess":"http://projecttycoon.com"
    }
  }
})
