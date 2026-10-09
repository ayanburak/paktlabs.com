/*
file: study.spec.ts

Calisma detay sayfasinin davranisini Demo Veri uzerinden kontrol eder:
bolumlerin ve icindekilerin sirasi, veri dili bolumu ve tablolarin dili,
acilir kutular, istasyon seridi, icindekilerden bolume gecis, Meraklisina
karti, yazar kutusu, kapanis kartlari ve yatay tasma. Beklenen metinler
calismanin icerik dosyalarindan ve sozlukten okunur, metin degisince testler
degil icerik guncellenir. Disariya verilen adresler ise bilerek elle yazili,
yanlis yazilmis bir adres testi gecirmesin diye.

description: data sitesindeki calisma detay sayfasinin davranis testleri.
*/

import { expect, test } from '@playwright/test'

import { page as demoPage } from '../src/content/studies/demo-veri/page'

import { dict, languages, openPage } from './support'

const path = '/work/demo-veri'
const chapters = demoPage.chapters

for (const lang of languages) {
  test(`${lang}: chapters and contents follow the page order`, async ({ page }) => {
    await openPage(page, path, lang)

    const titles = chapters.map((chapter) => chapter.title[lang])
    const contentTitles = page.locator('main section[id] h2')
    const labels = chapters.map((chapter) => chapter.label[lang])
    const contents = page.getByRole('navigation', { name: dict[lang].study.toc.title }).locator('ol a')

    // Demo Veri'nin verisi Turkce, Ingilizcede basta 00 veri dili bolumu var.
    if (lang === 'en') {
      await expect(contentTitles).toHaveText([
        `${dict.en.study.dataLanguage.title} ${dict.en.study.dataLanguage.languages.tr}`,
        ...titles,
      ])
      await expect(contents).toHaveText([`00${dict.en.study.dataLanguage.label}`, ...labels.map((label, i) => `0${i + 1}${label}`)])
    } else {
      await expect(contentTitles).toHaveText(titles)
      await expect(contents).toHaveText(labels.map((label, i) => `0${i + 1}${label}`))
    }
  })

  test(`${lang}: reading time is shown in minutes`, async ({ page }) => {
    await openPage(page, path, lang)

    const time = dict[lang].study.toc.readingTime
    await expect(page.getByText(new RegExp(`^${time.before} \\d+ ${time.after.replace('.', '\\.')}$`))).toBeVisible()
  })
}

test('tr: the data language chapter is absent when the data is already Turkish', async ({ page }) => {
  await openPage(page, path, 'tr')

  await expect(page.locator('#veri-dili')).toHaveCount(0)
})

test('en: the data language switch shows the original tables and keeps the site in English', async ({ page }) => {
  await openPage(page, path, 'en')

  const text = dict.en.study.dataLanguage
  const translated = page.getByRole('button', { name: `${text.translated} · ${text.languages.en}` })
  const original = page.getByRole('button', { name: `${text.original} · ${text.languages.tr}` })
  const firstSheet = page.locator('#sorun details').first()

  await expect(translated).toHaveAttribute('aria-pressed', 'true')
  await expect(firstSheet).toContainText('combined_raw_records.xlsx')

  await original.click()
  await expect(original).toHaveAttribute('aria-pressed', 'true')
  await expect(firstSheet).toContainText('birlesik_ham_kayitlar.xlsx')
  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
})

test('the data language returns to the site language when the site language changes', async ({ page }) => {
  await openPage(page, path, 'en')

  const text = dict.en.study.dataLanguage
  await page.getByRole('button', { name: `${text.original} · ${text.languages.tr}` }).click()
  await page.getByRole('button', { name: 'TR', exact: true }).click()
  await page.getByRole('button', { name: 'EN', exact: true }).click()

  await expect(page.getByRole('button', { name: `${text.translated} · ${text.languages.en}` })).toHaveAttribute(
    'aria-pressed',
    'true',
  )
  await expect(page.locator('#sorun details').first()).toContainText('combined_raw_records.xlsx')
})

test('details boxes and station strips open and close', async ({ page }) => {
  await openPage(page, path, 'tr')

  const box = page.locator('#sorun details').first()
  await box.locator('summary').click()
  await expect(box).toHaveAttribute('open', '')
  await box.locator('summary').click()
  await expect(box).not.toHaveAttribute('open', '')

  const strip = page.locator('#hat article details').first()
  await strip.locator('summary').click()
  await expect(strip).toHaveAttribute('open', '')
})

test('a contents link moves to its chapter and marks it as read', async ({ page }) => {
  await openPage(page, path, 'tr')

  const contents = page.getByRole('navigation', { name: dict.tr.study.toc.title })
  const link = contents.getByRole('link', { name: chapters[3].label.tr })
  await link.click()

  await expect(page).toHaveURL(new RegExp(`#${chapters[3].id}$`))
  await expect(link).toHaveAttribute('aria-current', 'location')
})

test('the curious card, the author box and the closing cards point to the right places', async ({ page }) => {
  await openPage(page, path, 'tr')

  await expect(page.getByRole('link', { name: new RegExp(dict.tr.study.curious.label) })).toHaveAttribute(
    'href',
    '/work/demo-veri/source',
  )
  await expect(page.getByRole('link', { name: /Burak Ayan/ })).toHaveAttribute(
    'href',
    'https://paktlabs.com/profiles/ayanburak',
  )

  // Demo Veri tek gercek calisma, sonraki calisma karti cikmaz.
  const closing = page.getByRole('navigation', { name: dict.tr.study.closing.nav })
  await expect(closing.getByRole('link')).toHaveCount(1)
  await expect(closing.getByRole('link')).toHaveAttribute('href', '/#calismalar')
})

// 768/769 ve 1100/1101 CSS'teki iki esigin iki yani. Genis tablolar kendi
// kutularinda kayar, sayfanin kendisi yana kaymamali.
for (const [width, height] of [
  [390, 844],
  [768, 1024],
  [769, 1024],
  [1100, 900],
  [1101, 900],
  [1440, 900],
] as const) {
  test(`${width}x${height}: the study page does not overflow sideways`, async ({ page }) => {
    await page.setViewportSize({ width, height })
    await openPage(page, path, 'en')

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
    expect(overflow).toBeLessThanOrEqual(0)
  })
}
