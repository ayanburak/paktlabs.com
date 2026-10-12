/*
file: home.spec.ts

Yapim asamasindaki ana sayfayi kontrol eder: iki dilde metinler, ust barda
bulunulan disiplin, kartlarin gittigi adresler, JS calismadan once Turkce
baslik ve dar ekranlarda yatay tasma.

description: automation sitesinin yapim asamasinda sayfasinin metin, baglanti ve yerlesim testleri.
*/

import { expect, test } from '@playwright/test'
import { contactPage, disciplineUrls, mainSite } from '@paktlabs/config/testing/expected'

import { dict, languages, openHome } from './support'

for (const lang of languages) {
  test(`${lang}: the page shows its own and the shared texts`, async ({ page }) => {
    await openHome(page, lang)
    const d = dict[lang]

    await expect(page).toHaveTitle(d.meta.title)
    await expect(page.locator('html')).toHaveAttribute('lang', lang)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(d.home.title)
    await expect(page.getByText(d.home.lead)).toBeVisible()
  })
}

test('the header marks this discipline and the logo returns to the main site', async ({ page }) => {
  await openHome(page, 'tr')
  const menu = page.getByRole('navigation', { name: dict.tr.a11y.mainMenu }).first()

  await expect(menu.getByRole('link', { name: dict.tr.nav.automation, exact: true })).toHaveAttribute('aria-current', 'page')
  await expect(page.getByRole('link', { name: dict.tr.brand }).first()).toHaveAttribute('href', mainSite)
})

// Iki dugme ziyaretciyi yayindaki yerlere goturur: Veri sitesi ve iletisim
// sayfasi. Sayfada baska bir baglanti yok, ortak iletisim bolumu kaldirildi.
test('the two buttons lead to the live data site and the contact page', async ({ page }) => {
  await openHome(page, 'tr')
  const main = page.locator('main')
  const { actions } = dict.tr.underConstruction

  await expect(main.getByRole('link')).toHaveCount(2)
  await expect(main.getByRole('link', { name: actions.data })).toHaveAttribute('href', disciplineUrls.data)
  await expect(main.getByRole('link', { name: actions.contact })).toHaveAttribute('href', contactPage)
})

// Ilk ziyarette sayfa JS calismadan once de dogru dilde baslik tasimali,
// index.html'deki elle yazilmis metin sozlukle ayni kalmali.
test('the HTML carries the Turkish title before scripts run', async ({ page }) => {
  await page.route('**/*.js', (route) => route.abort())
  await page.goto('/')

  await expect(page).toHaveTitle(dict.tr.meta.title)
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', dict.tr.meta.description)
})

// Cizim inmis ve gorunur olmali, kirik bir dosya ya da yanlis bir yol isik
// konisinin altinda bos bir sahne birakirdi.
test('the drawing loads on the stage', async ({ page }) => {
  await openHome(page)
  const art = page.locator('main img[src*="construction"]')

  await expect(art).toBeVisible()
  expect(await art.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0)
})

for (const [width, height] of [[360, 740], [390, 844], [768, 1024], [769, 1024], [1366, 1024]] as const) {
  test(`${width}x${height}: the page does not overflow sideways`, async ({ page }) => {
    await page.setViewportSize({ width, height })
    await openHome(page)

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
    expect(overflow).toBeLessThanOrEqual(0)
  })
}
