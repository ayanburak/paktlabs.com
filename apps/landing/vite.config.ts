import path from 'node:path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Landing cok sayfali, her sayfa kendi HTML'i. Vite tek sayfali varsayimla
  // bilinmeyen her adreste index.html verirdi ve /contact ana sayfayi acardi.
  // mpa ile /contact contact/index.html'i bulur, bilinmeyen adres ise
  // nginx'teki gibi bulunamaz
  appType: 'mpa',
  // Iletisim formu /api/contact'a gonderir. Lokalde servis 8001'de calisir,
  // gelistirme sunucusu istegi oraya aktarir, canlida ayni isi nginx yapar.
  // Boylece kodda lokal ve canli icin ayri adres yazilmaz
  server: {
    proxy: { '/api': 'http://127.0.0.1:8001' },
  },
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
    // Her sayfa ayri bir HTML girisi, kendi JS'i olur ve digerlerinin JS'ini
    // indirmez. 404.html'i nginx bilinmeyen adreslerde dondurur,
    // contact/index.html derlemede contact/ klasorune duser ve nginx onu
    // /contact adresinde dogrudan sunar
    rolldownOptions: {
      input: {
        main: path.resolve(import.meta.dirname, 'index.html'),
        notFound: path.resolve(import.meta.dirname, '404.html'),
        contact: path.resolve(import.meta.dirname, 'contact/index.html'),
      },
    },
  },
})
