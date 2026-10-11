/*
file: visual.spec.ts

data'nin dort sayfa turunun, yani veri sayfasi, Demo Veri'nin detay sayfasi,
kod ve veri sayfasi ve bulunamadi sayfasinin onayli gorunumunu tam sayfa
referanslarla karsilastirir. Dil, DPR 1, hareket azaltma tercihi ve tolerans
landing'in visual.spec.ts dosyasiyla ayni. Veri ve bulunamadi sayfalari
landing'in dort olcusunde, uzun detay ve kod sayfalari yalnizca 390 ve 1366'da
cekilir. Detay sayfasinda acilir kutular kapali cekilir, okurun ilk gordugu
hal budur, tablolarin icerigini davranis testleri denetler. CI bu dosyayi
calistirmaz.

Onayli bir tasarim degisikliginden sonra referanslar
npm run test:visual:update ile yenilenir.

description: Onayli TR ve EN gorunumun dort sayfa turunde tam sayfa piksel karsilastirmasi.
*/

// NOTE: Veri sayfasindaki one cikan kartin teknik ayrintilar listesi, tarayici
// her yeni acildiginda yaklasik yirmide bir ihtimalle birkac tonluk farkla
// ciziliyor. Logolar, bekleme, giris animasyonu, yazi kalinligi ve satir hizasi
// denendi, hicbiri sebep cikmadi, kesin sebep Chromium'un yazi ciziminde
// kaliyor. Ham bayt karsilastirmasinda fark cikar ama Playwright'in renk esigi
// bu farki sayfa farki saymaz. Bu esik kapatilirsa ya da dusurulurse bu test
// ara ara sebepsiz kirilir.

import { expect, test, type Page } from '@playwright/test'

import { languages, openPage } from './support'

const sizes = [
  [390, 844],
  [1024, 1366],
  [1366, 1024],
  [1920, 1080],
] as const

// Hizmet sayfasi alti hizmette ayni kalibi kullanir, biri yeter. Detay ve
// kod sayfalari on iki ile on sekiz bin piksel boyunda, her goruntu
// iki megabayta variyor. Iki sayfa da yalnizca iki duzen tasir, telefonda ustte
// ince icindekiler bari, masaustunde solda icindekiler. 390 ve 1366 bu iki
// duzeni kapsar, 1024 ve 1920 ayni duzenleri tekrar edip repoyu buyutuyordu.
// Yatay tasmayi bu sayfalarin davranis testleri alti genislikte ayrica olcer.
const longPageSizes = [
  [390, 844],
  [1366, 1024],
] as const

const pages = [
  ['home', '/', sizes],
  ['study', '/work/demo-veri', longPageSizes],
  ['source', '/work/demo-veri/source', longPageSizes],
  ['service', '/services/preparation', longPageSizes],
  ['notfound', '/yok', sizes],
] as const

// Fontlar Google Fonts'tan ve cizimler ayri dosyalardan geldigi icin networkidle
// tek basina yetmez, font yuklenmeden alinan goruntu yedek fontla cizilir.
async function settle(page: Page) {
  await page.evaluate(async () => {
    await document.fonts.ready
    await Promise.all([...document.images].map((img) => img.decode().catch(() => {})))
  })
}

test.describe('full page @visual', () => {
  test.use({ reducedMotion: 'reduce' })

  for (const [name, path, list] of pages) {
    for (const lang of languages) {
      for (const [width, height] of list) {
        test(`${name} ${lang} ${width}x${height}`, async ({ page }) => {
          await page.setViewportSize({ width, height })
          await openPage(page, path, lang)
          await settle(page)
          await expect(page).toHaveScreenshot(`${name}-${lang}-${width}x${height}.png`, { fullPage: true })
        })
      }
    }
  }
})
