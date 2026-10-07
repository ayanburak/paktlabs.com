/*
file: support.ts
importable: Language, languages, dict, disciplineUrls, openHome, waitForAssets

Spec dosyalarinin ortak kullandigi sayfa acma yardimcilari ve beklenen degerler.
Ekrandaki metinler landing'in ve brand paketinin sozluklerinden okunur, metin
degisince testler degil sozluk guncellenir. Subdomain adresleri ise bilerek
burada elle yazili, uygulamadaki disciplines.ts'ten okunsaydi yanlis bir adres
testi de gecirirdi.

description: Landing testlerinde dil tercihini ayarlayip sayfayi acan ve varliklarin yuklenmesini bekleyen yardimcilar.
*/

import type { Page } from '@playwright/test'

import brandEn from '../../../packages/brand/i18n/en.json' with { type: 'json' }
import brandTr from '../../../packages/brand/i18n/tr.json' with { type: 'json' }
import en from '../src/i18n/en.json' with { type: 'json' }
import tr from '../src/i18n/tr.json' with { type: 'json' }

export type Language = 'tr' | 'en'
export const languages: Language[] = ['tr', 'en']

// Sayfada ortak metinler ve landing'in kendi metinleri bir arada gorunur.
// Spec dosyalari ikisini tek bir sozluk gibi okusun diye birlestiriliyor.
export const dict = {
  tr: { ...brandTr, ...tr },
  en: { ...brandEn, ...en },
}

export const disciplineUrls = {
  web: 'https://web.paktlabs.com',
  automation: 'https://automation.paktlabs.com',
  data: 'https://data.paktlabs.com',
}

// Font ve SVG'ler yuklenmeden alinan olcum veya goruntu satir kirilimina ve
// gorsel yuksekligine gore degisebilir, o yuzden ikisi de acikca beklenir.
export async function waitForAssets(page: Page) {
  await page.evaluate(() => document.fonts.ready)
  await page.evaluate(() => Promise.all([...document.images].map((img) => img.decode().catch(() => {}))))
}

// lang verilirse tercih her sayfa yuklemesinden once localStorage'a yazilir.
// Reload sonrasi kaydin degisip degismedigini olcen testler bu parametreyi
// kullanmamali, yoksa her yuklemede tercih yeniden yazilir.
export async function openHome(page: Page, lang?: Language) {
  if (lang) await page.addInitScript((l) => localStorage.setItem('pl_lang', l), lang)
  await page.goto('/', { waitUntil: 'networkidle' })
  await waitForAssets(page)
}
