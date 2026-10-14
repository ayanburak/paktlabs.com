/*
file: blocks.spec.ts

Ekibe ozel blok katalogunu denetler. Sayfa iki dilde hatasiz acilmali ve
katalogdaki her bolum cizilmeli. Her bolumun gorsel referansi ayri tutulur,
boylece yeni bir parca turu eklendiginde ya da bir parcanin gorunusu
degistiginde fark yalnizca o bolumde gorunur. Katalogdaki bloklar henuz
hicbir calismada kullanilmiyorsa sitedeki tek gorsel olcumleri bunlardir.

Canlida katalog sifreyle korunur. test:live calisirken BLOCKS_USER ve
BLOCKS_PASSWORD verilmezse bu dosyadaki testler atlanir.

description: data sitesindeki blok katalogunun acilisini ve her bolumunun gorunusunu denetleyen testler.
*/

import { expect, test } from '@playwright/test'

import { catalogChapters } from '../src/content/studies/catalog/page'
import { catalogReachable, dict, languages, openPage } from './support'

test.skip(!catalogReachable, 'katalog canlida sifreli, BLOCKS_USER ve BLOCKS_PASSWORD verilmedi')

// Ekran okuyucunun okudugu bolum basligi secili dildeki parca adidir, bolum
// sayisi katalogdaki tur sayisiyla ayni olmali.
for (const lang of languages) {
  test(`catalog ${lang}: every chapter is drawn without errors`, async ({ page }) => {
    const errors: string[] = []
    page.on('pageerror', (error) => errors.push(error.message))
    page.on('console', (message) => message.type() === 'error' && errors.push(message.text()))
    await page.setViewportSize({ width: 1440, height: 900 })
    await openPage(page, '/blocks', lang)

    await expect(page.locator('h1')).toHaveText(dict[lang].catalog.title)
    for (const chapter of catalogChapters) {
      await expect(page.locator(`section#${chapter.id} h2`), chapter.id).toHaveText(chapter.title[lang])
    }
    expect(errors).toEqual([])
  })
}

// Bolumler tek tek cekilir. Belirme animasyonu kapali, sayfa bir kez sonuna
// kadar kaydirilir ki ekrana girince yuklenen bir sey kalmasin.
test.describe('catalog chapters @visual', () => {
  test.use({ reducedMotion: 'reduce' })

  for (const [width, height] of [
    [1440, 900],
    [390, 844],
  ] as const) {
    test(`catalog tr ${width}x${height}`, async ({ page }) => {
      await page.setViewportSize({ width, height })
      await openPage(page, '/blocks', 'tr')
      for (const chapter of catalogChapters) {
        await expect(page.locator(`section#${chapter.id}`)).toHaveScreenshot(`catalog-${chapter.id}-tr-${width}.png`)
      }
    })
  }
})
