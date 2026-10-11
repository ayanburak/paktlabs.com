/*
file: support.ts
importable: Language, languages, dict, openPage, waitForAssets

Spec dosyalarinin ortak kullandigi sayfa acma yardimcisi ve beklenen metinler.
Ekrandaki metinler data'nin ve brand paketinin sozluklerinden okunur, metin
degisince testler degil sozluk guncellenir. Dil listesi ve varlik bekleme
ortak @paktlabs/config/testing dosyalarindan gelir.

description: data testlerinde dil tercihini ayarlayip istenen rotayi acan yardimcilar.
*/

import type { Page } from '@playwright/test'
import { languages, waitForAssets } from '@paktlabs/config/testing/support'
import type { Language } from '@paktlabs/config/testing/support'

import brandEn from '../../../packages/brand/i18n/en.json' with { type: 'json' }
import brandTr from '../../../packages/brand/i18n/tr.json' with { type: 'json' }
import en from '../src/i18n/en.json' with { type: 'json' }
import tr from '../src/i18n/tr.json' with { type: 'json' }

// Spec dosyalari dil listesini ve tipini buradan alir.
export { languages, waitForAssets }
export type { Language }

// Sayfada ortak metinler ve data'nin kendi metinleri bir arada gorunur.
// Spec dosyalari ikisini tek bir sozluk gibi okusun diye birlestiriliyor.
export const dict = {
  tr: { ...brandTr, ...tr },
  en: { ...brandEn, ...en },
}

// lang verilirse tercih her sayfa yuklemesinden once localStorage'a yazilir.
// Sayfa acildiktan sonra font ve gorseller de beklenir, olcumler satir
// kirilimina ve gorsel yuksekligine gore degisebilir.
export async function openPage(page: Page, path: string, lang?: Language) {
  if (lang) await page.addInitScript((l) => localStorage.setItem('pl_lang', l), lang)
  await page.goto(path, { waitUntil: 'networkidle' })
  await waitForAssets(page)
}
