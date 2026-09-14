import path from 'node:path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(import.meta.dirname, 'src') },
  },
  build: {
    // esbuild'in css minify'i @media (max-width: X) gibi klasik sorguları
    // range syntax'a (width<=X) ceviriyor, bu daha eski tarayicilarda
    // (ör. Safari 16.4 oncesi) gecersiz sayilip tum kural sessizce yok
    // sayiliyor — su an sadece prefers-reduced-motion sorgusu var ama yeni
    // bir @media eklenirse (ör. ileride mobil icin) ayni riski tasiyacagi
    // icin bu kapali kaliyor
    cssMinify: false,
  },
})
