/*
file: support.ts
importable: Language, languages, dict, contactPath, profilePath, openHome, openContact, openProfile, waitForAssets

Spec dosyalarinin ortak kullandigi sayfa acma yardimcilari ve beklenen degerler.
Ekrandaki metinler landing'in ve brand paketinin sozluklerinden okunur, metin
degisince testler degil sozluk guncellenir. Beklenen adresler ve dil listesi
ortak @paktlabs/config/testing dosyalarinda elle yazilidir.

description: Landing testlerinde dil tercihini ayarlayip sayfayi acan ve varliklarin yuklenmesini bekleyen yardimcilar.
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

// Sayfada ortak metinler ve landing'in kendi metinleri bir arada gorunur.
// Spec dosyalari ikisini tek bir sozluk gibi okusun diye birlestiriliyor.
export const dict = {
  tr: { ...brandTr, ...tr },
  en: { ...brandEn, ...en },
}

// Iletisim sayfasi contact/index.html'den gelir. vite preview sonda egik
// cizgi olmadan bu dosyayi bulmaz, canlida nginx iki bicimi de sunar.
export const contactPath = '/contact/'

// Profil sayfasi da ayni sebeple sondaki egik cizgiyle acilir.
export const profilePath = '/profiles/ayanburak/'

// lang verilirse tercih her sayfa yuklemesinden once localStorage'a yazilir.
// Reload sonrasi kaydin degisip degismedigini olcen testler bu parametreyi
// kullanmamali, yoksa her yuklemede tercih yeniden yazilir.
export async function openHome(page: Page, lang?: Language) {
  if (lang) await page.addInitScript((l) => localStorage.setItem('pl_lang', l), lang)
  await page.goto('/', { waitUntil: 'networkidle' })
  await waitForAssets(page)
}

// openHome'un iletisim sayfasi icin olani. Form gonderimi testlerde gercek
// servise gitmez, her test /api/contact'i kendisi taklit eder. Adimin cizimi
// indirilip hazir olunca DOM'a girer, bu yuzden ayrica beklenir. Dar ekranda
// cizimin alani gizli ama img yine DOM'a girer.
export async function openContact(page: Page, lang?: Language) {
  if (lang) await page.addInitScript((l) => localStorage.setItem('pl_lang', l), lang)
  await page.goto(contactPath, { waitUntil: 'networkidle' })
  await page.locator('main img').waitFor({ state: 'attached' })
  await waitForAssets(page)
}

// openHome'un profil sayfasi icin olani. Fotograf da beklenir, yuklenmeden
// alinan goruntude kartin yuksekligi farkli olurdu.
export async function openProfile(page: Page, lang?: Language) {
  if (lang) await page.addInitScript((l) => localStorage.setItem('pl_lang', l), lang)
  await page.goto(profilePath, { waitUntil: 'networkidle' })
  await waitForAssets(page)
}
