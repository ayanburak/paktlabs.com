/*
file: scroll.spec.ts

Site ici gecislerde kaydirma konumunu kontrol eder. Gecisler sayfayi yeniden
yuklemedigi icin ileri gidilen sayfayi en uste ScrollToTop alir, geri donuste
kalinan yeri tarayici kendisi kurar. Ileri gidilen sayfa en ustten acilmali,
geri donulen sayfa kalinan yere donmeli, ayni sayfadaki bolum baglantilari ise
bolume gitmeli. Geri donus testi ScrollToTop'taki XXX notunun bekcisidir,
sayfalar icerigini sonradan yuklemeye baslarsa ilk o kirilir.

description: data sitesinde sayfa gecislerindeki kaydirma konumu testleri.
*/

import { expect, test } from '@playwright/test'

import { openPage } from './support'

test.use({ reducedMotion: 'reduce' })

test('a study opened from a card starts at the top and back returns to the card', async ({ page }) => {
  await openPage(page, '/', 'tr')
  const card = page.locator('a[href="/work/demo-veri"]').first()
  await card.scrollIntoViewIfNeeded()
  const before = await page.evaluate(() => window.scrollY)
  expect(before).toBeGreaterThan(0)

  await card.click()
  await expect(page).toHaveURL('/work/demo-veri')
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0)

  await page.goBack()
  await expect(page).toHaveURL('/')
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(before)
})

test('a contents link still moves to its chapter on the same page', async ({ page }) => {
  await openPage(page, '/work/demo-veri', 'tr')
  const link = page.locator('nav a[href^="#"]').nth(2)
  const id = (await link.getAttribute('href'))!.slice(1)

  await link.click()
  await expect(page).toHaveURL(`/work/demo-veri#${id}`)
  await expect
    .poll(() => page.evaluate((target) => Math.round(document.getElementById(target)!.getBoundingClientRect().top), id))
    .toBeLessThan(100)
})
