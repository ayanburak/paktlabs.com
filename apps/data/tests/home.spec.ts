/*
file: home.spec.ts

Veri sayfasinin bolumlerini kontrol eder. Teknoloji seridi kesintisiz tur icin
listeyi iki kez yazar, ekran okuyucunun her araci yalnizca bir kez duymasi ve
hareket azaltma tercihinde akisin durmasi burada olculur. Arac listesi
uygulamadan import edilmez, cunku logolari Vite'in anladigi SVG import'lariyla
gelir ve testler duz Node ortaminda calisir. Beklenen degerler sayfanin
kendisinden olculur.

description: Veri sayfasinin hero ve teknoloji seridi testleri.
*/

import { expect, test } from '@playwright/test'

import { dict, languages, openPage } from './support'

for (const lang of languages) {
  test(`${lang}: hero shows the discipline and links to the work list`, async ({ page }) => {
    await openPage(page, '/', lang)

    await expect(page.getByRole('heading', { level: 1 })).toHaveText(dict[lang].home.hero.title)
    await expect(page.getByRole('link', { name: dict[lang].home.hero.cta })).toHaveAttribute('href', '#calismalar')
  })
}

test('tech rail exposes every tool once to screen readers', async ({ page }) => {
  await openPage(page, '/', 'tr')

  const rail = page.getByRole('region', { name: dict.tr.home.stack.title })
  const names = await rail.getByRole('img').evaluateAll((imgs) => imgs.map((img) => img.getAttribute('alt') ?? ''))
  const tips = await rail.locator('li:not([aria-hidden]) span').allTextContents()

  expect(names.length).toBeGreaterThan(0)
  expect(names.every((name) => name.trim() !== '')).toBe(true)
  expect(new Set(names).size).toBe(names.length)
  expect(names).toEqual(tips)
  await expect(rail.locator('li[aria-hidden="true"]')).toHaveCount(names.length)
})

test('tech rail scrolls on its own with normal motion', async ({ page }) => {
  await openPage(page, '/', 'tr')

  const track = page.locator('section[aria-labelledby="stack-title"] ul')
  await expect(track).not.toHaveCSS('animation-name', 'none')
})

// Hareket azaltma tercihinde akis durur, ikinci kopya gizlenir ve serit elle
// kaydirilabilir hale gelir.
test('tech rail stops and hides the loop copy with reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await openPage(page, '/', 'tr')

  const section = page.locator('section[aria-labelledby="stack-title"]')
  await expect(section.locator('ul')).toHaveCSS('animation-name', 'none')
  await expect(section.locator('li[aria-hidden="true"]').first()).toBeHidden()
  await expect(section.locator('ul').locator('..')).toHaveCSS('overflow-x', 'auto')
})

// Ayni satirdaki kartlarin baslik kutulari ortak bir yukseklik alir, uzun bir
// baslik iki ya da uc satira kirildiginda bile metin kutulari ayni hizadan
// baslamali. 1440 genislikte izgara uc sutundur, ilk satir 01, 02 ve 03.
test('cards in a row start their text boxes at the same height', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await openPage(page, '/', 'tr')

  const cards = page.locator('#calismalar > a')
  const tops = await Promise.all([1, 2, 3].map(async (i) => (await cards.nth(i).locator(':scope > div').nth(1).boundingBox())!.y))
  expect(Math.max(...tops) - Math.min(...tops)).toBeLessThanOrEqual(1)
})
