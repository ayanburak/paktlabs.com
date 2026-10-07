/*
file: visual.spec.ts

Guncel onayli gorunumun tam sayfa referanslari. Referanslar yerel Linux
Chromium'da, DPR 1 ve hareket azaltma tercihiyle alindi. Fontlar Google Fonts
uzerinden agdan gelir, font veya isletim sistemi degisirse cikan fark once
gozle incelenir, dogrudan uygulama hatasi sayilmaz. CI bu dosyayi calistirmaz.

docs/visual-baseline altindaki 257ed79 arsivi baslangic kaydidir, bu dosya onu
degistirmez. Onayli bir tasarim degisikliginden sonra referanslar
npm run test:visual:update ile yenilenir.

description: Onayli TR ve EN gorunumun dort ekran olcusunde piksel karsilastirmasi.
*/

import { expect, test } from '@playwright/test'

import { languages, openHome } from './support'

const sizes = [
  [390, 844],
  [1024, 1366],
  [1366, 1024],
  [1920, 1080],
] as const

test.describe('full page @visual', () => {
  test.use({ reducedMotion: 'reduce' })

  for (const lang of languages) {
    for (const [width, height] of sizes) {
      test(`${lang} ${width}x${height}`, async ({ page }) => {
        await page.setViewportSize({ width, height })
        await openHome(page, lang)
        await expect(page).toHaveScreenshot(`${lang}-${width}x${height}.png`, { fullPage: true })
      })
    }
  }
})
