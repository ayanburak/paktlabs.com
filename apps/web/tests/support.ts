/*
file: support.ts
importable: Language, languages, dict, openHome, waitForAssets

Spec dosyalarinin ortak kullandigi sayfa acma yardimcisi ve sozluk. Ekrandaki
metinler sitenin ve brand paketinin sozluklerinden okunur, metin degisince
testler degil sozluk guncellenir. Beklenen adresler ortak
@paktlabs/config/testing dosyalarinda elle yazilidir.

description: web testlerinde dil tercihini ayarlayip sayfayi acan yardimci ve birlesik sozluk.
*/

import type { Page } from '@playwright/test'
import { languages, waitForAssets } from '@paktlabs/config/testing/support'
import type { Language } from '@paktlabs/config/testing/support'

import brandEn from '../../../packages/brand/i18n/en.json' with { type: 'json' }
import brandTr from '../../../packages/brand/i18n/tr.json' with { type: 'json' }
import en from '../src/i18n/en.json' with { type: 'json' }
import tr from '../src/i18n/tr.json' with { type: 'json' }

export { languages, waitForAssets }
export type { Language }

// Sayfada ortak metinler ve sitenin kendi metinleri bir arada gorunur. Iki
// sozlugun ust anahtarlari ayri tutuluyor, ayni adli bir anahtar olsaydi
// brand'inki burada ezilirdi.
export const dict = {
  tr: { ...brandTr, ...tr },
  en: { ...brandEn, ...en },
}

// lang verilirse tercih her sayfa yuklemesinden once localStorage'a yazilir.
export async function openHome(page: Page, lang?: Language) {
  if (lang) await page.addInitScript((l) => localStorage.setItem('pl_lang', l), lang)
  await page.goto('/', { waitUntil: 'networkidle' })
  await waitForAssets(page)
}
