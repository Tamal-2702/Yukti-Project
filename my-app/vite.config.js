import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: true, // YAHAN CHANGE KIYA HAI: Sabhi hosts ko allow kar diya
    host: true // Network par access allow karne ke liye
  }
})