import { defineConfig } from 'vite'

export default defineConfig({
  base: '/My_PortFolio/', // ⚠️ غيّر هذا لاسم الريبو على GitHub
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
})