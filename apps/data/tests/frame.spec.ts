/*
file: frame.spec.ts

Ust bar ve alt bilginin data sitesine dogru baglandigini kontrol eder. Header
ve Footer brand paketinden gelir, landing onlara prop vermedigi icin current
ve homeHref davranisi yalnizca burada olculur. Adresler bilerek elle yazili,
uygulamanin kendi adres dosyasindan okunsaydi yanlis bir adres testi de
gecirirdi.

description: data sayfalarinin ust bar, alt bilgi ve sayfa basligi testleri.
*/

import { expect, test } from '@playwright/test'

import { dict, languages, openPage } from './support'

const mainSite = 'https://paktlabs.com'
const dataSite = 'https://data.paktlabs.com'

for (const lang of languages) {
  test(`${lang}: header marks the data discipline as current`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await openPage(page, '/', lang)

    const nav = page.getByRole('navigation', { name: dict[lang].a11y.mainMenu }).first()
    await expect(nav.getByRole('link', { name: dict[lang].nav.data })).toHaveAttribute('aria-current', 'page')
    await expect(nav.locator('a[aria-current]')).toHaveCount(1)
    await expect(page.locator('header a').first()).toHaveAttribute('href', mainSite)
  })

  test(`${lang}: footer links back to the main site`, async ({ page }) => {
    await openPage(page, '/', lang)

    const footer = page.getByRole('navigation', { name: dict[lang].a11y.footerMenu })
    await expect(footer.getByRole('link', { name: 'paktlabs.com' })).toHaveAttribute('href', mainSite)
    await expect(footer.getByRole('link', { name: dict[lang].nav.data })).toHaveAttribute('href', dataSite)
  })

  test(`${lang}: page title and description follow the language`, async ({ page }) => {
    await openPage(page, '/', lang)

    await expect(page).toHaveTitle(dict[lang].home.meta.title)
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', dict[lang].home.meta.description)
    await expect(page.locator('html')).toHaveAttribute('lang', lang)
  })
}

// Mobil panelde de bulunulan disiplin isaretli olmali, ekran okuyucu iki menude
// de hangi sitede olundugunu duyar.
test('mobile panel marks the data discipline as current', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await openPage(page, '/', 'tr')

  await page.getByRole('button', { name: dict.tr.a11y.openMenu }).click()
  const panel = page.locator('header nav').last()
  await expect(panel.getByRole('link', { name: dict.tr.nav.data })).toHaveAttribute('aria-current', 'page')
})

// index.html JS calismadan once de dogru baslik ve aciklamayi tasimali, JS
// calistirmayan botlar yalnizca onu gorur.
test('index.html carries the Turkish title and description', async ({ request }) => {
  const html = await (await request.get('/')).text()
  expect(html).toContain(`<title>${dict.tr.home.meta.title}</title>`)
  expect(html).toContain(`content="${dict.tr.home.meta.description}"`)
})
