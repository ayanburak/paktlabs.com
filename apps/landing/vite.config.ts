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
    // CSS tek dosya kalir. Iki giris olunca Vite ortak stilleri ayri bir
    // parcaya ayirip sayfada once yukluyor, global.css bilesen stillerinden
    // once gelince esit onemdeki kurallarda kazanan degisiyordu. Tek dosyada
    // sira main.tsx'in import sirasidir, 404'e ozel stiller sona eklenir
    cssCodeSplit: false,
    // 404.html ayri bir giris, nginx bilinmeyen adreslerde onu dondurur.
    // Kendi JS'i olur, ana sayfanin JS'ini indirmez
    rolldownOptions: {
      input: {
        main: path.resolve(import.meta.dirname, 'index.html'),
        notFound: path.resolve(import.meta.dirname, '404.html'),
      },
    },
  },
})
