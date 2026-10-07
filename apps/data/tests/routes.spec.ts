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

import { en as demoEn } from '../src/content/studies/demo-veri/en'
import { tr as demoTr } from '../src/content/studies/demo-veri/tr'

import { dict, languages, openPage } from './support'

const demo = { tr: demoTr, en: demoEn }

for (const lang of languages) {
  test(`${lang}: unknown address shows the not found page`, async ({ page }) => {
    await openPage(page, '/boyle-bir-sayfa-yok', lang)

    await expect(page.getByRole('heading', { level: 1 })).toHaveText(dict[lang].notFound.title)
    await expect(page).toHaveTitle(dict[lang].notFound.meta.title)
    await expect(page.getByRole('link', { name: dict[lang].notFound.back })).toHaveAttribute('href', '/#calismalar')
  })
}

for (const lang of languages) {
  test(`${lang}: study address opens the study`, async ({ page }) => {
    await openPage(page, '/work/demo-veri', lang)

    await expect(page.getByRole('heading', { level: 1 })).toHaveText(demo[lang].title)
    await expect(page).toHaveTitle(`${demo[lang].title} · ${dict[lang].home.meta.title}`)
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', demo[lang].lede)
  })
}

test('unknown study slug shows the not found page', async ({ page }) => {
  await openPage(page, '/work/boyle-bir-calisma-yok', 'tr')

  await expect(page.getByRole('heading', { level: 1 })).toHaveText(dict.tr.notFound.title)
  await expect(page).toHaveTitle(dict.tr.notFound.meta.title)
})
