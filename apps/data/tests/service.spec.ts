/*
file: service.spec.ts

Hizmet sayfalarini kontrol eder: alti hizmetin iki dilde basligi, kapagi,
uc bolumu ve kapanistaki iki karti, bilinmeyen bir adresin bulunamadi
sayfasina dusmesi, panodan site ici gecis ve yatay tasma. Adresler ve
kimlikler bilerek elle yazili, brand'deki dataTags.ts'ten okunmaz, boylece
orada degisen bir adres bu testi de bozar.

description: Veri hizmetlerinin sayfalarini olcen testler.
*/

import { expect, test } from '@playwright/test'

import { dict, languages, openPage } from './support'

const services = [
  ['preparation', 'preparation'],
  ['database', 'database'],
  ['quality', 'quality'],
  ['analysis', 'analysis'],
  ['visualization', 'visualization'],
  ['machineLearning', 'machine-learning'],
] as const

for (const lang of languages) {
  for (const [i, [tag, slug]] of services.entries()) {
    test(`${lang}: /services/${slug} tells the service and leads on`, async ({ page }) => {
      const t = dict[lang]
      await openPage(page, `/services/${slug}`, lang)

      await expect(page).toHaveTitle(`${t.dataTags[tag]} · ${t.home.meta.title}`)
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(t.dataTags[tag])
      await expect(page.getByRole('link', { name: t.service.back })).toHaveAttribute('href', '/#hizmetler')
      await expect(page.locator('main nav').first()).toContainText(String(i + 1).padStart(2, '0'))
      for (const label of Object.values(t.service.kunye)) {
        await expect(page.locator('dt', { hasText: label })).toHaveCount(1)
      }

      const chapters = t.service.chapters
      await expect(page.locator('main section h2').filter({ hasNotText: t.service.closing.title })).toHaveText([
        chapters.scope.title,
        chapters.steps.title,
        chapters.delivery.title,
      ])

      const next = page.getByRole('navigation', { name: t.service.closing.nav })
      await expect(next.getByRole('link')).toHaveCount(2)
      await expect(next.getByRole('link').first()).toHaveAttribute('href', `/?tag=${tag}#calismalar`)
      await expect(next.getByRole('link').last()).toHaveAttribute('href', 'https://paktlabs.com/contact')
    })
  }
}

test('an unknown service shows the not found page', async ({ page }) => {
  await openPage(page, '/services/yok', 'tr')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(dict.tr.notFound.title)
})

// Panodaki kagit sayfayi yeniden yuklemeden hizmet sayfasini acar, kapanistaki
// calismalar karti listeye o kategori secili olarak doner.
test('the board opens a service and the service leads back to its studies', async ({ page }) => {
  await openPage(page, '/', 'tr')
  await page.evaluate(() => ((window as unknown as { marker: number }).marker = 1))

  await page.locator('#hizmetler a').nth(2).click()
  await expect(page).toHaveURL(/\/services\/quality$/)
  expect(await page.evaluate(() => (window as unknown as { marker?: number }).marker)).toBe(1)

  await page.getByRole('navigation', { name: dict.tr.service.closing.nav }).getByRole('link').first().click()
  await expect(page).toHaveURL(/\/\?tag=quality#calismalar$/)
  await expect(page.getByRole('checkbox', { name: dict.tr.dataTags.quality })).toBeChecked()
})

for (const width of [390, 768, 769, 1100, 1101, 1440]) {
  test(`${width}: the service page does not overflow sideways`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    await openPage(page, '/services/machine-learning', 'tr')
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width)
  })
}
