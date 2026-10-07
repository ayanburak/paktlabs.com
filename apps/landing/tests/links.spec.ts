/*
file: links.spec.ts

Disiplin baglantilarinin bes yerde de dogru subdomain'e gittigini kontrol eder:
masaustu menu, mobil panel, disiplin kartlari, is bantlari ve footer. Adreslerin
uzakta gercekten hizmet verip vermedigini veya DNS ve sertifikayi dogrulamaz.

description: Landing sayfasindaki subdomain baglantilari ve eski alt sayfa hedeflerinin olmadigi testleri.
*/

import { expect, test } from '@playwright/test'
import type { Locator } from '@playwright/test'

import { dict, disciplineUrls, languages, openHome } from './support'

const { web, automation, data } = disciplineUrls

async function hrefs(links: Locator) {
  return links.evaluateAll((els) => els.map((el) => el.getAttribute('href')))
}

for (const lang of languages) {
  const { nav } = dict[lang]

  test(`${lang}: desktop links point at discipline subdomains`, async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 })
    await openHome(page, lang)

    const headerLinks = page.locator('header nav').first().locator('a')
    expect(await hrefs(headerLinks)).toEqual([web, automation, data, '#iletisim'])
    await expect(headerLinks).toHaveText([nav.web, nav.automation, nav.data, nav.contact])

    expect(await hrefs(page.locator('#disiplinler a'))).toEqual([data, automation, web])
    expect(await hrefs(page.locator('#isler a'))).toEqual([data, automation, web])

    const footerLinks = page.locator('footer nav a')
    expect(await hrefs(footerLinks)).toEqual([web, automation, data])
    await expect(footerLinks).toHaveText([nav.web, nav.automation, nav.data])
  })

  test(`${lang}: mobile panel links point at discipline subdomains`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await openHome(page, lang)
    await page.locator('header button[aria-expanded]').click()
    const panelLinks = page.locator('header > nav a')
    expect(await hrefs(panelLinks)).toEqual([web, automation, data, '#iletisim'])
    await expect(panelLinks).toHaveText([nav.web, nav.automation, nav.data, nav.contact])
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
  await expect(page.locator('a[href^="mailto:"]')).toHaveAttribute('href', `mailto:${dict.tr.contact.email}`)
})
