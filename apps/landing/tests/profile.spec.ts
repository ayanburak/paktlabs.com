/*
file: profile.spec.ts

Profil sayfasini kontrol eder: iki dilde baslik ve metinler, JS calismadan
once gelen Turkce baslik, LinkedIn, GitHub ve web dugmelerinin adresleri,
fotograf, calisma satirinin hedefi, kisisel ve studyo adreslerinin ayri
durmasi ve yatay tasma. /profiles adresinin bu sayfaya yonlendirmesi nginx'te
oldugu icin burada degil, yayindan sonra canlida ayrica bakilir.

description: Landing'in profil sayfasinin metinlerini, baglantilarini ve yerlesimini olcen testler.
*/

import { expect, test } from '@playwright/test'
import { contactMailto, contactPage, demoDataWork, personalMailto, profileLinks } from '@paktlabs/config/testing/expected'

import { dict, languages, openProfile, profilePath } from './support'

const person = (lang: 'tr' | 'en') => dict[lang].profilePage.people.ayanburak

for (const lang of languages) {
  test(`${lang}: the profile page shows the person and the texts`, async ({ page }) => {
    await openProfile(page, lang)
    const texts = dict[lang].profilePage

    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Burak Ayan')
    await expect(page).toHaveTitle(person(lang).meta.title)
    await expect(page.locator('html')).toHaveAttribute('lang', lang)
    await expect(page.getByText(person(lang).eyebrow, { exact: true })).toBeVisible()
    await expect(page.getByText(person(lang).badge, { exact: true })).toBeVisible()
    await expect(page.getByRole('heading', { level: 2, name: texts.works.title })).toBeVisible()
    await expect(page.getByText(texts.reach.studio, { exact: true })).toBeVisible()
  })

  // Dugmelerde yazi yok, ekran okuyucu ve testler onlari etiketleriyle bulur.
  test(`${lang}: the link buttons go to LinkedIn, GitHub and the website`, async ({ page }) => {
    await openProfile(page, lang)
    const links = dict[lang].profilePage.links
    const list = page.getByRole('list', { name: links.label })

    await expect(list.getByRole('link')).toHaveCount(3)
    await expect(list.getByRole('link', { name: links.linkedin })).toHaveAttribute('href', profileLinks.linkedin)
    await expect(list.getByRole('link', { name: links.github })).toHaveAttribute('href', profileLinks.github)
    await expect(list.getByRole('link', { name: links.website })).toHaveAttribute('href', profileLinks.website)
  })
}

// Ilk ziyarette sayfa JS calismadan once de dogru dilde baslik tasimali,
// HTML'deki elle yazilmis metin sozlukle ayni kalmali.
test('the profile HTML carries the Turkish title before scripts run', async ({ page }) => {
  await page.route('**/*.js', (route) => route.abort())
  await page.goto(profilePath)

  await expect(page).toHaveTitle(person('tr').meta.title)
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', person('tr').meta.description)
})

test('the photo loads on the badge', async ({ page }) => {
  await openProfile(page)
  const photo = page.getByRole('img', { name: 'Burak Ayan' })

  await expect(photo).toBeVisible()
  expect(await photo.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0)
})

test('the work row opens the study on its discipline site', async ({ page }) => {
  await openProfile(page)

  await expect(page.locator(`a[href="${demoDataWork}"]`)).toHaveCount(1)
})

// Kisinin kendi adresi ile studyonun adresi ayri kutularda, info@ kisinin
// adresi gibi gosterilmez.
test('the personal and studio addresses stay apart', async ({ page }) => {
  await openProfile(page)
  const studio = page.getByRole('complementary')

  await expect(page.locator(`a[href="${personalMailto}"]`)).toHaveCount(1)
  await expect(studio.locator(`a[href="${personalMailto}"]`)).toHaveCount(0)
  await expect(studio.locator(`a[href="${contactMailto}"]`)).toHaveCount(1)
  await expect(studio.locator(`a[href="${contactPage}"]`)).toHaveCount(1)
})

for (const [width, height] of [[390, 844], [768, 1024], [769, 1024], [1366, 1024]] as const) {
  test(`${width}x${height}: the profile page does not overflow sideways`, async ({ page }) => {
    await page.setViewportSize({ width, height })
    await openProfile(page)

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
    expect(overflow).toBeLessThanOrEqual(0)
  })
}
