/*
file: routes.spec.ts

Rotalarin dogru sayfayi actigini kontrol eder. Bilinmeyen bir adres, sitenin
kendi bulunamadi sayfasini gostermeli, tarayicinin bos bir sayfasini degil.

description: data sitesinin rota ve bulunamadi sayfasi testleri.
*/

import { expect, test } from '@playwright/test'

import { dict, languages, openPage } from './support'

for (const lang of languages) {
  test(`${lang}: unknown address shows the not found page`, async ({ page }) => {
    await openPage(page, '/boyle-bir-sayfa-yok', lang)

    await expect(page.getByRole('heading', { level: 1 })).toHaveText(dict[lang].notFound.title)
    await expect(page).toHaveTitle(dict[lang].notFound.meta.title)
    await expect(page.getByRole('link', { name: dict[lang].notFound.back })).toHaveAttribute('href', '/#calismalar')
  })
}
