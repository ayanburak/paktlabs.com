/*
file: service.spec.ts

Hizmet sayfalarini kontrol eder: alti hizmetin iki dilde basligi, kapagi ve
kunyesi, uc bolumun sirasi, teslim bolumunun bes kutusu, iki cizim alani,
kapanistaki baglantilar ve onceki sonraki hizmet gecisi, bilinmeyen bir
adresin bulunamadi sayfasina dusmesi, panodan site ici gecis ve yatay tasma.
Adresler ve kimlikler bilerek elle yazili, brand'deki dataTags.ts'ten
okunmaz, boylece orada degisen bir adres bu testi de bozar.

description: Veri hizmetlerinin sayfalarini olcen testler.
*/

import { expect, test } from '@playwright/test'
import { contactPage, services } from '@paktlabs/config/testing/expected'
import { required } from '@paktlabs/config/testing/support'

import { dict, languages, openPage } from './support'

const number = (i: number) => String(i + 1).padStart(2, '0')

for (const lang of languages) {
  for (const [i, { tag, slug }] of services.entries()) {
    test(`${lang}: /services/${slug} tells the service and leads on`, async ({ page }) => {
      const t = dict[lang]
      const s = t.service
      await openPage(page, `/services/${slug}`, lang)

      await expect(page).toHaveTitle(`${t.dataTags[tag]} · ${t.home.meta.title}`)
      // baslik iki satira bolunur, ekran okuyucu yine kelimeleri ayri okur
      await expect(page.getByRole('heading', { level: 1, name: t.dataTags[tag], exact: true })).toBeVisible()
      await expect(page.getByRole('link', { name: s.back })).toHaveAttribute('href', '/#services')
      await expect(page.locator('main').getByText(`${t.nav.data} · ${number(i)} / 06`)).toBeVisible()
      await expect(page.locator('main dt')).toHaveText([s.facts.who, s.facts.when])

      await expect(page.locator('main section h2')).toHaveText([
        s.scope.title,
        s.steps.title,
        s.outcomes.title,
        s.closing.title,
      ])
      await expect(page.locator('#service-outcomes + ul > li')).toHaveCount(5)
      await expect(page.getByText(`service-${slug}.svg`)).toBeVisible()
      await expect(page.getByText('service-steps.svg')).toBeVisible()

      const works = `/?tag=${tag}#works`
      await expect(page.getByRole('link', { name: s.actions.contact })).toHaveAttribute('href', contactPage)
      await expect(page.getByRole('link', { name: s.actions.works })).toHaveAttribute('href', works)
      await expect(page.getByRole('link', { name: s.closing.contact })).toHaveAttribute('href', contactPage)
      await expect(page.getByRole('link', { name: s.closing.works })).toHaveAttribute('href', works)

      // ilk hizmetin oncesi sonuncusu, sonuncunun sonrasi ilkidir
      const prev = required(services[(i + services.length - 1) % services.length], 'onceki hizmet')
      const next = required(services[(i + 1) % services.length], 'sonraki hizmet')
      const pager = page.getByRole('navigation', { name: s.closing.nav }).getByRole('link')
      await expect(pager).toHaveCount(2)
      await expect(pager.first()).toHaveAttribute('href', `/services/${prev.slug}`)
      await expect(pager.last()).toHaveAttribute('href', `/services/${next.slug}`)
    })
  }
}

test('an unknown service shows the not found page', async ({ page }) => {
  await openPage(page, '/services/yok', 'tr')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(dict.tr.notFound.title)
})

// Panodaki kagit sayfayi yeniden yuklemeden hizmet sayfasini acar. Hizmet
// sayfasindaki calismalar baglantisi listeye o kategori secili olarak doner.
test('the board opens a service and the service leads back to its studies', async ({ page }) => {
  await openPage(page, '/', 'tr')
  await page.evaluate(() => ((window as unknown as { marker: number }).marker = 1))

  await page.locator('#services a').nth(2).click()
  await expect(page).toHaveURL(/\/services\/quality$/)
  expect(await page.evaluate(() => (window as unknown as { marker?: number }).marker)).toBe(1)

  await page.getByRole('link', { name: dict.tr.service.closing.works }).click()
  await expect(page).toHaveURL(/\/\?tag=quality#works$/)
  await expect(page.getByRole('checkbox', { name: dict.tr.dataTags.quality })).toBeChecked()
})

for (const width of [390, 768, 769, 1100, 1101, 1440]) {
  test(`${width}: the service page does not overflow sideways`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    await openPage(page, '/services/visualization', 'tr')
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width)
  })
}
