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
    // esbuild'in css minify'i @media (max-width: X) gibi klasik sorgulari
    // range syntax'a (width<=X) ceviriyor. Safari 16.4 oncesi gibi eski
    // tarayicilar bunu gecersiz sayip kuralin tamamini sessizce yok sayiyor,
    // landing'in butun responsive kurallari klasik sorgularla yazildigi icin
    // minify acilirsa mobil ve tablet yerlesimi o tarayicilarda tamamen kaybolur
    cssMinify: false,
  },
})
