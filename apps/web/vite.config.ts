/*
file: vite.config.ts

web sitesinin Vite ayari. Gercek site gelene kadar iki sayfasi var, ana
sayfa ve bulunamadi sayfasi. Yapi landing'le ayni, gercek site geldiginde
yalnizca girisler eklenir.

description: web sitesini cok sayfali olarak derleyen Vite ayari.
*/

import path from 'node:path'

import { siteConfig } from '@paktlabs/config/vite'
import { mergeConfig } from 'vite'

// Ortak ayar packages/config altindan gelir. Port landing 5173, data 5174
// oldugu icin web 5175, automation 5176, dort site ayni anda acik kalabilir
export default mergeConfig(siteConfig({ root: import.meta.dirname, port: 5175 }), {
  // Site simdilik iki sayfa, ana sayfa ve bulunamadi sayfasi. Landing'deki
  // gibi her sayfa kendi HTML'i, bilinmeyen adres ana sayfayi acmaz, nginx
  // onu 404.html ile 404 koduyla dondurur
  appType: 'mpa',
  build: {
    // Iki giris olunca Vite ortak stilleri ayri parcaya ayirip global.css'i
    // bilesen stillerinden once yukluyor, landing'deki sebeple CSS tek dosya
    cssCodeSplit: false,
    rolldownOptions: {
      input: {
        main: path.resolve(import.meta.dirname, 'index.html'),
        notFound: path.resolve(import.meta.dirname, '404.html'),
      },
    },
  },
})
