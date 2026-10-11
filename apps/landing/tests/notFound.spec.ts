/*
file: notFound.spec.ts

Landing'in bulunamadi sayfasini kontrol eder. Testler sayfayi /404.html
adresinden acar, cunku vite preview bilinmeyen bir adreste bu dosyayi
dondurmez. Canlida nginx her bilinmeyen adreste ayni dosyayi 404 koduyla
dondurur, o kodun kendisi bu testlerin kapsaminda degil, yayindan sonra
canlida ayrica bakilir.

description: Landing'in 404 sayfasinin metinlerini, geri don dugmesini ve yatay tasmayi olcen testler.
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
    await expect(page.locator('html')).toHaveAttribute('lang', lang)
    await expect(page.getByRole('link', { name: dict[lang].notFound.back })).toHaveAttribute('href', '/')
  })
}

// Ilk ziyarette sayfa JS calismadan once de dogru dilde baslik tasimali,
// 404.html'deki elle yazilmis metin sozlukle ayni kalmali.
test('the not found HTML carries the Turkish title before scripts run', async ({ page }) => {
  await page.route('**/*.js', (route) => route.abort())
  await page.goto(notFoundPath)

  await expect(page).toHaveTitle(dict.tr.notFound.meta.title)
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', dict.tr.notFound.meta.description)
})

// Geri don dugmesi sitenin icinden gelen ziyaretciyi geldigi sayfaya,
// adresi dogrudan acan ziyaretciyi ana sayfaya goturur. Onceki sayfanin
// adresi ana sayfadan ayrilsin diye sorgu parametresi tasiyor.
test('back button returns to the previous page of the site', async ({ page }) => {
  await page.goto('/?from=home', { waitUntil: 'networkidle' })
  await page.goto(notFoundPath, { waitUntil: 'networkidle' })
  await page.getByRole('link', { name: dict.tr.notFound.back }).click()

  await expect(page).toHaveURL('/?from=home')
})

test('back button opens the home page when the address was opened directly', async ({ page }) => {
  await page.goto(notFoundPath, { waitUntil: 'networkidle' })
  await page.getByRole('link', { name: dict.tr.notFound.back }).click()

  await expect(page).toHaveURL('/')
})

for (const [width, height] of [[390, 844], [768, 1024], [769, 1024], [1366, 1024]] as const) {
  test(`${width}x${height}: the not found page does not overflow sideways`, async ({ page }) => {
    await page.setViewportSize({ width, height })
    await page.goto(notFoundPath, { waitUntil: 'networkidle' })

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
    expect(overflow).toBeLessThanOrEqual(0)
  })
}
