/*
file: home.spec.ts

Yapim asamasindaki ana sayfayi kontrol eder: iki dilde metinler, ust barda
bulunulan disiplin, kartlarin gittigi adresler, JS calismadan once Turkce
baslik ve dar ekranlarda yatay tasma.

description: web sitesinin yapim asamasinda sayfasinin metin, baglanti ve yerlesim testleri.
*/

import { expect, test } from '@playwright/test'
import { authorProfile, contactPage, disciplineUrls, mainSite } from '@paktlabs/config/testing/expected'

import { dict, languages, openHome } from './support'

const host = new URL(disciplineUrls.web).host

for (const lang of languages) {
  test(`${lang}: the page shows its own and the shared texts`, async ({ page }) => {
    await openHome(page, lang)
    const d = dict[lang]

    await expect(page).toHaveTitle(d.meta.title)
    await expect(page.locator('html')).toHaveAttribute('lang', lang)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(d.home.title)
    await expect(page.getByText(d.home.lead)).toBeVisible()
    await expect(page.getByText(host, { exact: true })).toBeVisible()
    await expect(page.getByRole('heading', { name: d.underConstruction.meanwhile })).toBeVisible()
    // cizim gelene kadar yer tutucu tarifiyle gorunur
    await expect(page.getByText(d.home.art.note)).toBeVisible()
  })
}

test('the header marks this discipline and the logo returns to the main site', async ({ page }) => {
  await openHome(page, 'tr')
  const menu = page.getByRole('navigation', { name: dict.tr.a11y.mainMenu }).first()

  await expect(menu.getByRole('link', { name: dict.tr.nav.web, exact: true })).toHaveAttribute('aria-current', 'page')
  await expect(page.getByRole('link', { name: dict.tr.brand }).first()).toHaveAttribute('href', mainSite)
})

// Kartlar ziyaretciyi yayindaki yerlere goturur: Veri sitesi, iletisim
// sayfasi ve ekibin profili.
test('the meanwhile cards lead to the live data site, contact and the profile', async ({ page }) => {
  await openHome(page, 'tr')
  const cards = page.getByRole('list').filter({ has: page.getByText(dict.tr.underConstruction.cards.data.label) })

  await expect(cards.getByRole('link')).toHaveCount(3)
  await expect(cards.getByRole('link', { name: new RegExp(dict.tr.nav.data) })).toHaveAttribute('href', disciplineUrls.data)
  await expect(cards.getByRole('link', { name: new RegExp(dict.tr.underConstruction.cards.contact.title) })).toHaveAttribute('href', contactPage)
  await expect(cards.getByRole('link', { name: /Burak Ayan/ })).toHaveAttribute('href', authorProfile)
})

// Ilk ziyarette sayfa JS calismadan once de dogru dilde baslik tasimali,
// index.html'deki elle yazilmis metin sozlukle ayni kalmali.
test('the HTML carries the Turkish title before scripts run', async ({ page }) => {
  await page.route('**/*.js', (route) => route.abort())
  await page.goto('/')

  await expect(page).toHaveTitle(dict.tr.meta.title)
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', dict.tr.meta.description)
})

for (const [width, height] of [[360, 740], [390, 844], [768, 1024], [769, 1024], [1366, 1024]] as const) {
  test(`${width}x${height}: the page does not overflow sideways`, async ({ page }) => {
    await page.setViewportSize({ width, height })
    await openHome(page)

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
    expect(overflow).toBeLessThanOrEqual(0)
  })
}
