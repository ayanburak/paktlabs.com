/*
file: visual.spec.ts

Onayli gorunumun tam sayfa referanslari. Referanslar yerel Linux Chromium'da,
DPR 1 ve hareket azaltma tercihiyle alindi. CI bu dosyayi calistirmaz. Onayli
bir tasarim degisikliginden sonra npm run test:visual:update ile yenilenir.

description: automation sitesinin TR ve EN gorunumunun dort ekran olcusunde piksel karsilastirmasi.
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
