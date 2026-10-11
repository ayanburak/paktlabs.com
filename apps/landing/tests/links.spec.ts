/*
file: links.spec.ts

Disiplin baglantilarinin bes yerde de dogru subdomain'e gittigini kontrol eder:
masaustu menu, mobil panel, disiplin kartlari, is bantlari ve footer. Veri
bandinin alti satirinin data'daki dogru hizmet sayfasina gittigi de
burada olculur. Adreslerin uzakta gercekten hizmet verip vermedigini veya DNS
ve sertifikayi dogrulamaz.

description: Landing sayfasindaki subdomain baglantilari ve eski alt sayfa hedeflerinin olmadigi testleri.
*/

import { expect, test } from '@playwright/test'
import type { Locator } from '@playwright/test'

import { dict, disciplineUrls, languages, openHome } from './support'

const { web, automation, data } = disciplineUrls
const contactPage = 'https://paktlabs.com/contact'

// Veri bandinin satirlari, sirasiyla. Her satir data'daki hizmet sayfasina
// gider, adresler data'nin service.spec.ts'teki adresleriyle ayni, ikisi de
// bilerek elle yazili.
const dataTagOrder = ['preparation', 'database', 'quality', 'analysis', 'visualization', 'machineLearning'] as const
const dataTagLinks = ['preparation', 'database', 'quality', 'analysis', 'visualization', 'machine-learning'].map(
  (slug) => `${data}/services/${slug}`,
)

async function hrefs(links: Locator) {
  return links.evaluateAll((els) => els.map((el) => el.getAttribute('href')))
}

for (const lang of languages) {
  const { nav } = dict[lang]

  test(`${lang}: desktop links point at discipline subdomains`, async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 })
    await openHome(page, lang)

    const headerLinks = page.locator('header nav').first().locator('a')
    expect(await hrefs(headerLinks)).toEqual([data, automation, web, contactPage])
    await expect(headerLinks).toHaveText([nav.data, nav.automation, nav.web, nav.contact])

    await expect(page.locator('main section').first().locator('a.cta')).toHaveAttribute('href', contactPage)
    expect(await hrefs(page.locator('#disiplinler a'))).toEqual([data, automation, web])
    expect(await hrefs(page.locator('#isler a'))).toEqual([data, ...dataTagLinks, automation, web])

    const footerLinks = page.locator('footer nav a')
    expect(await hrefs(footerLinks)).toEqual([data, automation, web])
    await expect(footerLinks).toHaveText([nav.data, nav.automation, nav.web])
  })

  // Satirlarin adi ok isareti olmadan, yalnizca kategori adiyla okunur.
  // Otomasyon ve web bantlarinda baglantili satir yoktur.
  test(`${lang}: data band rows open their service page on data`, async ({ page }) => {
    await openHome(page, lang)

    const rows = page.locator('#isler ol').first().locator('a')
    expect(await hrefs(rows)).toEqual(dataTagLinks)
    for (const [i, tag] of dataTagOrder.entries()) {
      await expect(rows.nth(i)).toHaveAccessibleName(dict[lang].dataTags[tag])
    }
    await expect(page.locator('#isler ol').nth(1).locator('a')).toHaveCount(0)
    await expect(page.locator('#isler ol').nth(2).locator('a')).toHaveCount(0)
  })

  test(`${lang}: mobile panel links point at discipline subdomains`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await openHome(page, lang)
    await page.locator('header button[aria-expanded]').click()
    const panelLinks = page.locator('header > nav a')
    expect(await hrefs(panelLinks)).toEqual([data, automation, web, contactPage])
    await expect(panelLinks).toHaveText([nav.data, nav.automation, nav.web, nav.contact])
  })
}

test('no empty, old sub page or new tab links remain', async ({ page }) => {
  await openHome(page)
  const all = await page.locator('a').evaluateAll((els) =>
    els.map((el) => ({ href: el.getAttribute('href'), target: el.getAttribute('target') })),
  )
  for (const { href, target } of all) {
    expect(href, 'bos href kalmamali').toBeTruthy()
    expect(['/web', '/automation', '/data']).not.toContain(href)
    expect(target).toBeNull()
  }
  // kok adrese giden tek link logo
  expect(all.filter(({ href }) => href?.startsWith('/'))).toEqual([{ href: '/', target: null }])
  await expect(page.locator('a[href^="mailto:"]')).toHaveAttribute('href', 'mailto:info@paktlabs.com')
})
