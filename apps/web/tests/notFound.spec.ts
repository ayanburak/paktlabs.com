/*
file: notFound.spec.ts

Bulunamadi sayfasini kontrol eder. Sayfa /404.html adresinden acilir, cunku
vite preview bilinmeyen bir adreste bu dosyayi dondurmez. Canlida nginx her
bilinmeyen adreste ayni dosyayi 404 koduyla dondurur, o kod yayindan sonra
canlida ayrica denetlenir.

description: web sitesinin 404 sayfasinin metinlerini ve ust barini olcen testler.
*/

import { expect, test } from '@playwright/test'

import { dict, languages } from './support'

const notFoundPath = '/404.html'

for (const lang of languages) {
  test(`${lang}: the not found page shows the shared texts`, async ({ page }) => {
    await page.addInitScript((l) => localStorage.setItem('pl_lang', l), lang)
    await page.goto(notFoundPath, { waitUntil: 'networkidle' })

    await expect(page.getByRole('heading', { level: 1 })).toHaveText(dict[lang].notFound.title)
    await expect(page).toHaveTitle(dict[lang].notFound.meta.title)
    await expect(page.getByRole('link', { name: dict[lang].notFound.back })).toHaveAttribute('href', '/')
  })
}

test('the not found HTML carries the Turkish title before scripts run', async ({ page }) => {
  await page.route('**/*.js', (route) => route.abort())
  await page.goto(notFoundPath)

  await expect(page).toHaveTitle(dict.tr.notFound.meta.title)
})

test('the not found page marks this discipline in the header', async ({ page }) => {
  await page.goto(notFoundPath, { waitUntil: 'networkidle' })
  const menu = page.getByRole('navigation', { name: dict.tr.a11y.mainMenu }).first()

  await expect(menu.getByRole('link', { name: dict.tr.nav.web, exact: true })).toHaveAttribute('aria-current', 'page')
})
