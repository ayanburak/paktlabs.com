/*
file: support.ts
importable: Language, languages, dict, openPage

Spec dosyalarinin ortak kullandigi sayfa acma yardimcisi ve beklenen metinler.
Ekrandaki metinler data'nin ve brand paketinin sozluklerinden okunur, metin
degisince testler degil sozluk guncellenir.

description: data testlerinde dil tercihini ayarlayip istenen rotayi acan yardimcilar.
*/

import type { Page } from '@playwright/test'

import brandEn from '../../../packages/brand/i18n/en.json' with { type: 'json' }
import brandTr from '../../../packages/brand/i18n/tr.json' with { type: 'json' }
import en from '../src/i18n/en.json' with { type: 'json' }
import tr from '../src/i18n/tr.json' with { type: 'json' }

export type Language = 'tr' | 'en'
export const languages: Language[] = ['tr', 'en']

// Sayfada ortak metinler ve data'nin kendi metinleri bir arada gorunur.
// Spec dosyalari ikisini tek bir sozluk gibi okusun diye birlestiriliyor.
export const dict = {
  tr: { ...brandTr, ...tr },
  en: { ...brandEn, ...en },
}

// lang verilirse tercih her sayfa yuklemesinden once localStorage'a yazilir.
export async function openPage(page: Page, path: string, lang?: Language) {
  if (lang) await page.addInitScript((l) => localStorage.setItem('pl_lang', l), lang)
  await page.goto(path, { waitUntil: 'networkidle' })
}
