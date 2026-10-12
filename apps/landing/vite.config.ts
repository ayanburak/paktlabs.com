import path from 'node:path'

import { siteConfig } from '@paktlabs/config/vite'
import { mergeConfig } from 'vite'

// Ortak ayar packages/config altindan gelir. Burada yalnizca landing e ozel
// olanlar durur
export default mergeConfig(siteConfig({ root: import.meta.dirname, port: 5173 }), {
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
  build: {
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
        // Her profil kendi HTML'i, arama motoru basligi JS calismadan gorsun
        // diye. Hepsi ayni src/profile.tsx'i yukler, yeni kisi bir satir ekler
        profileAyanburak: path.resolve(import.meta.dirname, 'profiles/ayanburak/index.html'),
      },
    },
  },
})
