/*
file: home.spec.ts

Veri sayfasinin bolumlerini kontrol eder. Teknoloji seridi kesintisiz tur icin
listeyi iki kez yazar, ekran okuyucunun her araci yalnizca bir kez duymasi ve
hareket azaltma tercihinde akisin durmasi burada olculur. Arac adlari ve
sirasi techNames.ts'ten okunur, o dosya logolardan ayri durdugu icin duz Node
ortaminda da yuklenir. Logolarin dosyalari techStack.ts'te SVG import'u
oldugu icin testlere alinmaz.

description: Veri sayfasinin hero, teknoloji seridi, calisma listesi ve iletisim testleri.
*/

import { expect, test } from '@playwright/test'

import { studies } from '../src/content/studies'
import { techNames } from '../src/content/techNames'

import { dict, languages, openPage } from './support'

for (const lang of languages) {
  test(`${lang}: hero shows the discipline and links to the work list`, async ({ page }) => {
    await openPage(page, '/', lang)

    await expect(page.getByRole('heading', { level: 1 })).toHaveText(dict[lang].home.hero.title)
    await expect(page.getByRole('link', { name: dict[lang].home.hero.cta })).toHaveAttribute('href', '#calismalar')
    const counts = page.locator('section').first().locator('dl dd')
    await expect(counts).toHaveText(dict[lang].home.hero.counts.map((count) => count.value))
  })
}

test('tech rail exposes every tool once to screen readers', async ({ page }) => {
  await openPage(page, '/', 'tr')

  const rail = page.getByRole('region', { name: dict.tr.home.stack.title })
  const names = await rail.getByRole('img').evaluateAll((logos) => logos.map((logo) => logo.getAttribute('aria-label') ?? ''))
  const tips = await rail.locator('li:not([aria-hidden]) span[aria-hidden="true"]').allTextContents()

  expect(names.length).toBeGreaterThan(0)
  expect(names.every((name) => name.trim() !== '')).toBe(true)
  expect(new Set(names).size).toBe(names.length)
  expect(names).toEqual(tips)
  expect(names).toEqual([...techNames])
  await expect(rail.locator('li[aria-hidden="true"]')).toHaveCount(names.length)
})

// Kartlardaki kucuk logolar da adlariyla okunur ve yalnizca bilinen araclari
// gosterir. Logolar yalnizca one cikan kartta var. Bugun one cikan calisma
// yok, test o gun kendiliginden geri doner.
test('work cards name their tool logos', async ({ page }) => {
  test.skip(!studies.some((study) => study.feature), 'one cikan calisma yok')
  await openPage(page, '/', 'tr')

  const logos = page.locator('#calismalar ~ * [role="img"], a[href^="/work/"] [role="img"]')
  const names = await logos.evaluateAll((items) => items.map((item) => item.getAttribute('aria-label') ?? ''))

  expect(names.length).toBeGreaterThan(0)
  expect(names.every((name) => (techNames as readonly string[]).includes(name))).toBe(true)
})

test('tech rail scrolls on its own with normal motion', async ({ page }) => {
  await openPage(page, '/', 'tr')

  const track = page.locator('section[aria-labelledby="stack-title"] ul')
  await expect(track).not.toHaveCSS('animation-name', 'none')
})

// Hareket azaltma tercihinde akis durur, ikinci kopya gizlenir ve serit elle
// kaydirilabilir hale gelir.
test('tech rail stops and hides the loop copy with reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await openPage(page, '/', 'tr')

  const section = page.locator('section[aria-labelledby="stack-title"]')
  await expect(section.locator('ul')).toHaveCSS('animation-name', 'none')
  await expect(section.locator('li[aria-hidden="true"]').first()).toBeHidden()
  await expect(section.locator('ul').locator('..')).toHaveCSS('overflow-x', 'auto')
})

// Ayni satirdaki kartlarin baslik kutulari ortak bir yukseklik alir, uzun bir
// baslik iki ya da uc satira kirildiginda bile metin kutulari ayni hizadan
// baslamali. 1440 genislikte izgara uc sutundur, ilk satir 01, 02 ve 03.
// Karsilastirma icin uc normal kart gerekir, yoksa test atlanir.
test('cards in a row start their text boxes at the same height', async ({ page }) => {
  test.skip(studies.filter((study) => !study.feature).length < 3, 'karsilastirilacak uc kart yok')
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await openPage(page, '/', 'tr')

  const cards = page.locator('#calismalar a')
  const tops = await Promise.all([1, 2, 3].map(async (i) => (await cards.nth(i).locator(':scope > div').nth(1).boundingBox())!.y))
  expect(Math.max(...tops) - Math.min(...tops)).toBeLessThanOrEqual(1)
})

// Beklenen kartlar calisma listesinden hesaplanir, icerik degisince test
// kendiliginden uyum saglar. Liste SVG import etmedigi icin burada okunabilir.
test.describe('work filter', () => {
  test('panel is closed and unreachable until opened', async ({ page }) => {
    await openPage(page, '/', 'tr')

    // Playwright'in rol sorgusu inert icindeki dugmeleri de sayar, kirpilmis bir
    // dugmeyi de kendi kutusu bos olmadigi icin gorunur sayar. Bu yuzden
    // panelin inert olup olmadigi ve kendi yuksekligi olculur.
    await page.emulateMedia({ reducedMotion: 'reduce' })
    const toggle = page.getByRole('button', { name: dict.tr.home.works.filter.toggle })
    const panel = page.locator(`#${await toggle.getAttribute('aria-controls')}`)
    const height = async () => (await panel.boundingBox())!.height

    await expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await expect(panel).toHaveAttribute('inert', '')
    expect(await height()).toBe(0)

    await toggle.click()
    await expect(toggle).toHaveAttribute('aria-expanded', 'true')
    await expect(panel).not.toHaveAttribute('inert')
    expect(await height()).toBeGreaterThan(0)
  })

  test('picked tags show studies carrying any of them', async ({ page }) => {
    const tags = dict.tr.home.works.tags
    const cards = page.locator('#calismalar a')
    const expectCount = async (picked: (keyof typeof tags)[]) => {
      const count = studies.filter((s) => picked.length === 0 || s.tags.some((t) => picked.includes(t))).length
      await expect(cards).toHaveCount(count)
    }

    await openPage(page, '/', 'tr')
    await expectCount([])
    await page.getByRole('button', { name: dict.tr.home.works.filter.toggle }).click()

    await page.getByRole('button', { name: tags.visualization }).click()
    await expectCount(['visualization'])
    await expect(page.getByRole('button', { name: dict.tr.home.works.filter.all })).toHaveAttribute('aria-pressed', 'false')

    await page.getByRole('button', { name: tags.database }).click()
    await expectCount(['visualization', 'database'])

    await page.getByRole('button', { name: tags.visualization }).click()
    await expectCount(['database'])

    await page.getByRole('button', { name: dict.tr.home.works.filter.all }).click()
    await expectCount([])
    await expect(page.getByRole('button', { name: tags.database })).toHaveAttribute('aria-pressed', 'false')
  })
})

// Iletisim bolumu brand'de ortak, landing'dekiyle ayni. Adresler bilerek elle
// yazili, uygulamanin adres dosyasindan okunmaz.
for (const lang of languages) {
  test(`${lang}: contact section leads to the contact page and offers the email`, async ({ page }) => {
    await openPage(page, '/', lang)

    const contact = page.locator('#iletisim')
    await expect(contact.getByRole('heading', { level: 2 })).toHaveText(dict[lang].contact.title)
    await expect(contact.getByRole('link', { name: dict[lang].contact.action, exact: true })).toHaveAttribute(
      'href',
      'https://paktlabs.com/contact',
    )
    await expect(contact.getByRole('link', { name: 'info@paktlabs.com' })).toHaveAttribute('href', 'mailto:info@paktlabs.com')
    await expect(contact.getByRole('link')).toHaveCount(2)
  })
}
