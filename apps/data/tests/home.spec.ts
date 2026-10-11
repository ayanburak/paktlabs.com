/*
file: home.spec.ts

Veri sayfasinin bolumlerini kontrol eder: hero, hizmetler panosu, calisma
listesi ve suzgeci, iletisim. One cikan kartin logolari techNames.ts'teki
adlarla karsilastirilir, o dosya logolardan ayri durdugu icin duz Node
ortaminda da yuklenir. Logolarin dosyalari techStack.ts'te SVG import'u
oldugu icin testlere alinmaz.

description: Veri sayfasinin hero, hizmetler panosu, calisma listesi, suzgec ve iletisim testleri.
*/

import { expect, test } from '@playwright/test'
import type { Page } from '@playwright/test'

import { lastPublished } from '../src/content/lastPublished'
import { studies } from '../src/content/studies'
import { techNames } from '../src/content/techNames'

import { dict, languages, openPage } from './support'

for (const lang of languages) {
  test(`${lang}: hero shows the discipline and links to the work list`, async ({ page }) => {
    await openPage(page, '/', lang)

    await expect(page.getByRole('heading', { level: 1 })).toHaveText(dict[lang].home.hero.title)
    await expect(page.getByRole('link', { name: dict[lang].home.hero.cta })).toHaveAttribute('href', '#works')
    // son yayin tarihi gun, ay, yil sirasiyla gorunur, time etiketi tarihi makine icin tasir
    const [year, month, day] = lastPublished.split('-')
    const latest = page.locator('section').first().locator('dl')
    await expect(latest.locator('dt')).toHaveText(dict[lang].home.hero.latest)
    await expect(latest.locator('time')).toHaveAttribute('datetime', lastPublished)
    await expect(latest.locator('time')).toHaveText(`${day} / ${month} / ${year}`)
  })
}

// Pano alti hizmeti brand'deki sirayla gosterir, her kagit hizmetin
// sayfasina gider. Adresler bilerek elle yazili, brand'deki dataTags.ts'ten
// okunmaz, boylece orada degisen bir adres bu testi de bozar.
for (const lang of languages) {
  test(`${lang}: the services board pins every service and links to its page`, async ({ page }) => {
    await openPage(page, '/', lang)

    const board = page.getByRole('region', { name: dict[lang].home.services.title })
    const notes = board.getByRole('link')
    const order = ['preparation', 'database', 'quality', 'analysis', 'visualization', 'machineLearning'] as const
    const paths = order.map((tag) => `/services/${tag === 'machineLearning' ? 'machine-learning' : tag}`)

    expect(await notes.evaluateAll((links) => links.map((link) => link.getAttribute('href')))).toEqual(paths)
    for (const [i, tag] of order.entries()) {
      await expect(notes.nth(i).getByRole('heading', { level: 3 })).toHaveText(dict[lang].dataTags[tag])
    }
  })
}

// Kartlardaki kucuk logolar da adlariyla okunur ve yalnizca bilinen araclari
// gosterir. Logolar yalnizca one cikan kartta var. Bugun one cikan calisma
// yok, test o gun kendiliginden geri doner.
test('work cards name their tool logos', async ({ page }) => {
  test.skip(!studies.some((study) => study.feature), 'one cikan calisma yok')
  await openPage(page, '/', 'tr')

  const logos = page.locator('#works ~ * [role="img"], a[href^="/work/"] [role="img"]')
  const names = await logos.evaluateAll((items) => items.map((item) => item.getAttribute('aria-label') ?? ''))

  expect(names.length).toBeGreaterThan(0)
  expect(names.every((name) => (techNames as readonly string[]).includes(name))).toBe(true)
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

  const cards = page.locator('#works a')
  const tops = await Promise.all([1, 2, 3].map(async (i) => (await cards.nth(i).locator(':scope > div').nth(1).boundingBox())!.y))
  expect(Math.max(...tops) - Math.min(...tops)).toBeLessThanOrEqual(1)
})

// Gercek onay kutusu gorunmez, ziyaretci onun etiketine tikladigi icin test de
// etikete tiklar. Playwright etiket yerine oturana kadar bekler, panel acilis
// animasyonundayken tiklama baska bir yere dusmez.
async function pickTag(page: Page, name: string) {
  await page.locator('label').filter({ has: page.getByRole('checkbox', { name }) }).click()
}

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
    const tags = dict.tr.dataTags
    const cards = page.locator('#works a')
    const expectCount = async (picked: (keyof typeof tags)[]) => {
      const count = studies.filter((s) => picked.length === 0 || s.tags.some((t) => picked.includes(t))).length
      await expect(cards).toHaveCount(count)
    }

    await openPage(page, '/', 'tr')
    await expectCount([])
    await page.getByRole('button', { name: dict.tr.home.works.filter.toggle }).click()

    await pickTag(page, tags.visualization)
    await expectCount(['visualization'])
    await expect(page.getByRole('button', { name: dict.tr.home.works.filter.all })).toHaveAttribute('aria-pressed', 'false')

    await pickTag(page, tags.database)
    await expectCount(['visualization', 'database'])

    await pickTag(page, tags.visualization)
    await expectCount(['database'])

    await page.getByRole('button', { name: dict.tr.home.works.filter.all }).click()
    await expectCount([])
    await expect(page.getByRole('checkbox', { name: tags.database })).not.toBeChecked()
  })

  // Calismasi olmayan bir etikette izgara bosalir ve yerine uyari cikar. Uyari
  // durum alaninin icinde oldugu icin ekran okuyucu onu kendiliginden okur.
  // Etiketler listeden secilir, icerik degisince test kendiliginden uyar.
  test('an empty selection shows a notice instead of an empty band', async ({ page }) => {
    const tags = dict.tr.dataTags
    const used = new Set(studies.flatMap((study) => study.tags))
    const empty = (Object.keys(tags) as (keyof typeof tags)[]).find((tag) => !used.has(tag))
    test.skip(!empty, 'her etiketin en az bir calismasi var')
    const full = studies[0].tags[0]
    const status = page.locator('#works [role="status"]')

    await openPage(page, '/', 'tr')
    await expect(status).toBeEmpty()
    await page.getByRole('button', { name: dict.tr.home.works.filter.toggle }).click()

    await pickTag(page, tags[empty!])
    await expect(page.locator('#works a')).toHaveCount(0)
    await expect(status).toHaveText(dict.tr.home.works.filter.empty)

    await pickTag(page, tags[full])
    await expect(status).toBeEmpty()
    await expect(page.locator('#works a').first()).toBeVisible()
  })

  // Landing'in Veri bandi her kategoriye bu adresle baglanir. Kimlikler ve
  // adresin bicimi bilerek elle yazili, brand'deki dataTags.ts'ten okunmaz,
  // boylece orada degisen bir kimlik ya da anahtar adi bu testi de bozar.
  // Calismasi olan kategoride kartlar, olmayanda uyari gorunur.
  const linkedTags = ['preparation', 'database', 'quality', 'analysis', 'visualization', 'machineLearning'] as const
  for (const tag of linkedTags) {
    test(`?tag=${tag} opens the list with that tag picked`, async ({ page }) => {
      const tags = dict.tr.dataTags
      const count = studies.filter((study) => study.tags.includes(tag)).length

      await openPage(page, `/?tag=${tag}#works`, 'tr')

      await expect(page.getByRole('button', { name: dict.tr.home.works.filter.toggle })).toHaveAttribute(
        'aria-expanded',
        'true',
      )
      for (const other of linkedTags) {
        await expect(page.getByRole('checkbox', { name: tags[other] })).toBeChecked({ checked: other === tag })
      }
      await expect(page.getByRole('button', { name: dict.tr.home.works.filter.all })).toHaveAttribute(
        'aria-pressed',
        'false',
      )
      await expect(page.locator('#works a')).toHaveCount(count)
      await expect(page.locator('#works [role="status"]')).toHaveText(
        count === 0 ? dict.tr.home.works.filter.empty : '',
      )
    })
  }

  // Her kategorinin yanindaki sayi listedeki calismalardan hesaplanir.
  // Ekran okuyucu sayiyi kelimesiyle duyar, Ingilizcede tekil ya da cogul.
  for (const lang of languages) {
    test(`${lang}: each tag shows how many studies carry it`, async ({ page }) => {
      const words = dict[lang].home.works.filter.studies
      await openPage(page, '/', lang)
      await page.getByRole('button', { name: dict[lang].home.works.filter.toggle }).click()

      for (const tag of linkedTags) {
        const count = studies.filter((study) => study.tags.includes(tag)).length
        const word = lang === 'en' && count === 1 ? words.one : words.other
        await expect(page.getByRole('checkbox', { name: `${dict[lang].dataTags[tag]} ${count} ${word}` })).toHaveCount(1)
      }
    })
  }

  // Yanlis yazilmis ya da eskimis bir kategori sayfayi bozmaz, liste hic
  // secim yokmus gibi acilir.
  test('an unknown tag in the address is ignored', async ({ page }) => {
    await openPage(page, '/?tag=nosuchtag#works', 'tr')

    await expect(page.getByRole('button', { name: dict.tr.home.works.filter.toggle })).toHaveAttribute(
      'aria-expanded',
      'false',
    )
    await expect(page.getByRole('button', { name: dict.tr.home.works.filter.all })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    await expect(page.locator('#works a')).toHaveCount(studies.length)
  })
})

// Iletisim bolumu brand'de ortak, landing'dekiyle ayni. Adresler bilerek elle
// yazili, uygulamanin adres dosyasindan okunmaz.
for (const lang of languages) {
  test(`${lang}: contact section leads to the contact page and offers the email`, async ({ page }) => {
    await openPage(page, '/', lang)

    const contact = page.locator('#contact')
    await expect(contact.getByRole('heading', { level: 2 })).toHaveText(dict[lang].contact.title)
    await expect(contact.getByRole('link', { name: dict[lang].contact.action, exact: true })).toHaveAttribute(
      'href',
      'https://paktlabs.com/contact',
    )
    await expect(contact.getByRole('link', { name: 'info@paktlabs.com' })).toHaveAttribute('href', 'mailto:info@paktlabs.com')
    await expect(contact.getByRole('link')).toHaveCount(2)
  })
}
