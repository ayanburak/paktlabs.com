/*
file: a11y.spec.ts

data'nin dort sayfa turunde, yani veri sayfasi, calisma detay sayfasi, kod
sayfasi ve bulunamadi sayfasinda, ekran okuyucunun dayandigi yapiyi ve
baglantilari denetler. Tek bir h1, atlanmayan baslik seviyeleri, tek main,
ust bar ve alt bilgi, ust bardaki adreslerin dogru yere gitmesi ve sayfada bos
ya da yeni sekmede acilan baglanti kalmamasi. Adresler bilerek elle yazili.

description: data sitesinin baslik sirasi, sayfa bolgeleri ve baglanti testleri.
*/

import { expect, test } from '@playwright/test'

import { openPage } from './support'

const pages = ['/', '/work/demo-veri', '/work/demo-veri/source', '/yok']

const headerLinks = [
  'https://web.paktlabs.com',
  'https://automation.paktlabs.com',
  'https://data.paktlabs.com',
  'https://paktlabs.com/contact',
]

for (const path of pages) {
  test(`${path}: headings, landmarks and links`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await openPage(page, path, 'tr')

    // Seviye bir onceki basliktan en fazla bir derin olabilir, h2'den h4'e
    // atlamak ekran okuyucuda bolum yapisini bozar.
    const levels = await page.locator('h1, h2, h3, h4, h5, h6').evaluateAll((els) =>
      els.map((el) => Number(el.tagName[1])),
    )
    expect(levels.filter((level) => level === 1)).toHaveLength(1)
    levels.reduce((prev, level) => {
      expect(level, `h${prev} sonrasi h${level}`).toBeLessThanOrEqual(prev + 1)
      return level
    })

    await expect(page.locator('main')).toHaveCount(1)
    // Bolumlerin kendi header etiketleri var, onlar sayfa bolgesi sayilmaz.
    // Sayilan ust bar ve alt bilginin rolleri.
    await expect(page.getByRole('banner')).toHaveCount(1)
    await expect(page.getByRole('contentinfo')).toHaveCount(1)

    const hrefs = await page.locator('header nav').first().locator('a').evaluateAll((els) =>
      els.map((el) => el.getAttribute('href')),
    )
    expect(hrefs).toEqual(headerLinks)

    await expect(page.locator('a:not([href]), a[href=""], a[href="#"]')).toHaveCount(0)
    await expect(page.locator('a[target="_blank"]')).toHaveCount(0)
  })
}
