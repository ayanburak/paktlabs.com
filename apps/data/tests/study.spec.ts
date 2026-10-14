/*
file: study.spec.ts

Calisma detay sayfasinin davranisini Hartwell & Finch uzerinden kontrol eder:
bolumlerin ve icindekilerin sirasi, veri dili bolumu ve tablolarin dili,
acilir kutular, istasyon seridi, icindekilerden bolume gecis, Meraklisina
karti, yazar kutusu, kapanis kartlari ve yatay tasma. Beklenen metinler
calismanin icerik dosyalarindan ve sozlukten okunur, metin degisince testler
degil icerik guncellenir. Disariya verilen adresler ise bilerek elle yazili,
yanlis yazilmis bir adres testi gecirmesin diye.

description: data sitesindeki calisma detay sayfasinin davranis testleri.
*/

import { expect, test } from '@playwright/test'
import { authorProfile } from '@paktlabs/config/testing/expected'

import { page as studyPage } from '../src/content/studies/hartwell-finch/page'

import { dict, languages, openPage } from './support'

const path = '/work/hartwell-finch'
const chapters = studyPage.chapters

for (const lang of languages) {
  test(`${lang}: chapters and contents follow the page order`, async ({ page }) => {
    await openPage(page, path, lang)

    const titles = chapters.map((chapter) => chapter.title[lang])
    const contentTitles = page.locator('main section[id] h2')
    const labels = chapters.map((chapter) => chapter.label[lang])
    const contents = page.getByRole('navigation', { name: dict[lang].study.toc.title }).locator('ol a')

    // Hartwell & Finch'in verisi Ingilizce, Turkcede basta 00 veri dili bolumu var.
    if (lang === 'tr') {
      await expect(contentTitles).toHaveText([
        `${dict.tr.study.dataLanguage.title} ${dict.tr.study.dataLanguage.languages.en}`,
        ...titles,
      ])
      await expect(contents).toHaveText([`00${dict.tr.study.dataLanguage.label}`, ...labels.map((label, i) => `${String(i + 1).padStart(2, '0')}${label}`)])
    } else {
      await expect(contentTitles).toHaveText(titles)
      await expect(contents).toHaveText(labels.map((label, i) => `${String(i + 1).padStart(2, '0')}${label}`))
    }
  })

  test(`${lang}: reading time is shown in minutes`, async ({ page }) => {
    await openPage(page, path, lang)

    const time = dict[lang].study.toc.readingTime
    await expect(page.getByText(new RegExp(`^${time.before} \\d+ ${time.after.replace('.', '\\.')}$`))).toBeVisible()
  })
}

test('en: the data language chapter is absent when the data is already English', async ({ page }) => {
  await openPage(page, path, 'en')

  await expect(page.locator('#data-language')).toHaveCount(0)
})

test('tr: the data language switch shows the original tables and keeps the site in Turkish', async ({ page }) => {
  await openPage(page, path, 'tr')

  const text = dict.tr.study.dataLanguage
  const translated = page.getByRole('button', { name: `${text.translated} · ${text.languages.tr}` })
  const original = page.getByRole('button', { name: `${text.original} · ${text.languages.en}` })
  const firstSheet = page.locator('#data details').first()

  await expect(translated).toHaveAttribute('aria-pressed', 'true')
  await expect(firstSheet).toContainText('Müşteri ref')

  await original.click()
  await expect(original).toHaveAttribute('aria-pressed', 'true')
  await expect(firstSheet).toContainText('Customer ref')
  await expect(page.locator('html')).toHaveAttribute('lang', 'tr')
})

test('the data language returns to the site language when the site language changes', async ({ page }) => {
  await openPage(page, path, 'tr')

  const text = dict.tr.study.dataLanguage
  await page.getByRole('button', { name: `${text.original} · ${text.languages.en}` }).click()
  await page.getByRole('button', { name: 'EN', exact: true }).click()
  await page.getByRole('button', { name: 'TR', exact: true }).click()

  await expect(page.getByRole('button', { name: `${text.translated} · ${text.languages.tr}` })).toHaveAttribute(
    'aria-pressed',
    'true',
  )
  await expect(page.locator('#data details').first()).toContainText('Müşteri ref')
})

test('details boxes and station strips open and close', async ({ page }) => {
  await openPage(page, path, 'tr')

  const box = page.locator('#data details').first()
  await box.locator('summary').click()
  await expect(box).toHaveAttribute('open', '')
  await box.locator('summary').click()
  await expect(box).not.toHaveAttribute('open', '')

  const strip = page.locator('#consolidation article details').first()
  await strip.locator('summary').click()
  await expect(strip).toHaveAttribute('open', '')
})

test('a contents link moves to its chapter and marks it as read', async ({ page }) => {
  const chapter = chapters[3]
  if (!chapter) throw new Error('Hartwell & Finch en az dort bolum tasimali')
  await openPage(page, path, 'tr')

  const contents = page.getByRole('navigation', { name: dict.tr.study.toc.title })
  const link = contents.getByRole('link', { name: chapter.label.tr })
  await link.click()

  await expect(page).toHaveURL(new RegExp(`#${chapter.id}$`))
  await expect(link).toHaveAttribute('aria-current', 'location')
})

test('the curious card, the author box and the closing cards point to the right places', async ({ page }) => {
  await openPage(page, path, 'tr')

  await expect(page.getByRole('link', { name: new RegExp(dict.tr.study.curious.label) })).toHaveAttribute(
    'href',
    '/work/hartwell-finch/source',
  )
  await expect(page.getByRole('link', { name: /Burak Ayan/ })).toHaveAttribute(
    'href',
    authorProfile,
  )

  // Listede tek calisma var, sonraki calisma karti yok, yalnizca tum
  // calismalara donus karti kalir. Ikinci calisma eklenince burada ikinci
  // bir kart beklenir.
  const closing = page.getByRole('navigation', { name: dict.tr.study.closing.nav })
  await expect(closing.getByRole('link')).toHaveCount(1)
  await expect(closing.getByRole('link')).toHaveAttribute('href', '/#works')
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
