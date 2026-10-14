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

import { hartwellFinch } from '../src/content/studies/hartwell-finch'
import { page as studyPage } from '../src/content/studies/hartwell-finch/page'
import { source as studySource } from '../src/content/studies/hartwell-finch/source'

import { dict, languages, openPage } from './support'

for (const lang of languages) {
  test(`${lang}: unknown address shows the not found page`, async ({ page }) => {
    await openPage(page, '/boyle-bir-sayfa-yok', lang)

    await expect(page.getByRole('heading', { level: 1 })).toHaveText(dict[lang].notFound.title)
    await expect(page).toHaveTitle(dict[lang].notFound.meta.title)
    await expect(page.getByRole('link', { name: dict[lang].notFound.back })).toHaveAttribute('href', '/')
  })
}

// Cozulemeyen yuzde kodlu bir bolum adresi sayfayi dusurmemeli.
test('a malformed hash still opens the page', async ({ page }) => {
  await openPage(page, '/#%', 'tr')

  await expect(page.getByRole('heading', { level: 1 })).toHaveText(dict.tr.home.hero.title)
  await expect(page.getByText(dict.tr.notFound.title)).toHaveCount(0)
})

// Geri don dugmesi sitenin icinden gelen ziyaretciyi geldigi sayfaya,
// adresi dogrudan acan ziyaretciyi ana sayfaya goturur.
test('back button returns to the previous page of the site', async ({ page }) => {
  await openPage(page, '/work/hartwell-finch', 'tr')
  await page.goto('/boyle-bir-sayfa-yok', { waitUntil: 'networkidle' })
  await page.getByRole('link', { name: dict.tr.notFound.back }).click()

  await expect(page).toHaveURL('/work/hartwell-finch')
})

test('back button opens the home page when the address was opened directly', async ({ page }) => {
  await openPage(page, '/boyle-bir-sayfa-yok', 'tr')
  await page.getByRole('link', { name: dict.tr.notFound.back }).click()

  await expect(page).toHaveURL('/')
})

for (const lang of languages) {
  test(`${lang}: study address opens the study`, async ({ page }) => {
    await openPage(page, '/work/hartwell-finch', lang)

    await expect(page.getByRole('heading', { level: 1 })).toHaveText(hartwellFinch.title[lang])
    await expect(page).toHaveTitle(`${hartwellFinch.title[lang]} · ${dict[lang].home.meta.title}`)
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', studyPage.lede[lang])
  })
}

test('unknown study slug shows the not found page', async ({ page }) => {
  await openPage(page, '/work/boyle-bir-calisma-yok', 'tr')

  await expect(page.getByRole('heading', { level: 1 })).toHaveText(dict.tr.notFound.title)
  await expect(page).toHaveTitle(dict.tr.notFound.meta.title)
})

for (const lang of languages) {
  test(`${lang}: source address opens the code and data page`, async ({ page }) => {
    await openPage(page, '/work/hartwell-finch/source', lang)

    await expect(page.getByRole('heading', { level: 1 })).toHaveText(studySource.title[lang])
    await expect(page).toHaveTitle(`${studySource.title[lang]} · ${dict[lang].home.meta.title}`)
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', studySource.lede[lang])
  })
}

test('source page of an unknown study shows the not found page', async ({ page }) => {
  await openPage(page, '/work/boyle-bir-calisma-yok/source', 'tr')

  await expect(page.getByRole('heading', { level: 1 })).toHaveText(dict.tr.notFound.title)
})

