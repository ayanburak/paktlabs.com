/*
file: routes.spec.ts

Rotalarin dogru sayfayi actigini kontrol eder. Bilinmeyen bir adres, sitenin
kendi bulunamadi sayfasini gostermeli, tarayicinin bos bir sayfasini degil.
Calisma adresleri bilerek elle yazili, disariya verilen baglantilar oldugu icin
icerik dosyasindaki slug degisirse test kirilmali. Beklenen metinler ise
calismanin kendi icerik dosyalarindan okunur.

description: data sitesinin rota ve bulunamadi sayfasi testleri.
*/

import { expect, test } from '@playwright/test'

import { demoVeri } from '../src/content/studies/demo-veri'
import { page as demoPage } from '../src/content/studies/demo-veri/page'
import { source as demoSource } from '../src/content/studies/demo-veri/source'

import { dict, languages, openPage } from './support'

for (const lang of languages) {
  test(`${lang}: unknown address shows the not found page`, async ({ page }) => {
    await openPage(page, '/boyle-bir-sayfa-yok', lang)

    await expect(page.getByRole('heading', { level: 1 })).toHaveText(dict[lang].notFound.title)
    await expect(page).toHaveTitle(dict[lang].notFound.meta.title)
    await expect(page.getByRole('link', { name: dict[lang].notFound.back })).toHaveAttribute('href', '/')
  })
}

// Geri don dugmesi sitenin icinden gelen ziyaretciyi geldigi sayfaya,
// adresi dogrudan acan ziyaretciyi ana sayfaya goturur.
test('back button returns to the previous page of the site', async ({ page }) => {
  await openPage(page, '/work/demo-veri', 'tr')
  await page.goto('/boyle-bir-sayfa-yok', { waitUntil: 'networkidle' })
  await page.getByRole('link', { name: dict.tr.notFound.back }).click()

  await expect(page).toHaveURL('/work/demo-veri')
})

test('back button opens the home page when the address was opened directly', async ({ page }) => {
  await openPage(page, '/boyle-bir-sayfa-yok', 'tr')
  await page.getByRole('link', { name: dict.tr.notFound.back }).click()

  await expect(page).toHaveURL('/')
})

for (const lang of languages) {
  test(`${lang}: study address opens the study`, async ({ page }) => {
    await openPage(page, '/work/demo-veri', lang)

    await expect(page.getByRole('heading', { level: 1 })).toHaveText(demoVeri.title[lang])
    await expect(page).toHaveTitle(`${demoVeri.title[lang]} · ${dict[lang].home.meta.title}`)
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', demoPage.lede[lang])
  })
}

test('unknown study slug shows the not found page', async ({ page }) => {
  await openPage(page, '/work/boyle-bir-calisma-yok', 'tr')

  await expect(page.getByRole('heading', { level: 1 })).toHaveText(dict.tr.notFound.title)
  await expect(page).toHaveTitle(dict.tr.notFound.meta.title)
})

for (const lang of languages) {
  test(`${lang}: source address opens the code and data page`, async ({ page }) => {
    await openPage(page, '/work/demo-veri/source', lang)

    await expect(page.getByRole('heading', { level: 1 })).toHaveText(demoSource.title[lang])
    await expect(page).toHaveTitle(`${demoSource.title[lang]} · ${dict[lang].home.meta.title}`)
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', demoSource.lede[lang])
  })
}

test('source page of an unknown study shows the not found page', async ({ page }) => {
  await openPage(page, '/work/boyle-bir-calisma-yok/source', 'tr')

  await expect(page.getByRole('heading', { level: 1 })).toHaveText(dict.tr.notFound.title)
})

