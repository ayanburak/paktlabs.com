/*
file: source.spec.ts

Kod ve veri sayfasinin davranisini Demo Veri uzerinden kontrol eder:
bolumlerin ve icindekilerin sirasi, kapak, kod dosyalarinin ve veri
dosyalarinin verinin dilini izlemesi, kopyalanan metnin satir numarasi
tasimamasi, indirilen dosyanin adi ve icerigi, yazar kutusu ve donus karti,
yatay tasma. Beklenen metinler calismanin icerik dosyalarindan, kod ve veri
dosyalarinin kendisinden ve sozlukten okunur. Disariya verilen adresler
bilerek elle yazili.

description: data sitesindeki kod ve veri sayfasinin davranis testleri.
*/

import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { expect, test } from '@playwright/test'

import { source } from '../src/content/studies/demo-data/source'

import { dict, type Language, languages, openPage } from './support'

const path = '/work/demo-data/source'
const root = join(import.meta.dirname, '../src/content/studies/demo-data')

// Ekranda gosterilen metin dosyanin kendisidir, yalnizca sondaki satir sonu
// atilir.
function file(kind: 'code' | 'data', language: Language, name: string): string {
  return readFileSync(join(root, kind, language, name), 'utf8').replace(/\n$/, '')
}

for (const lang of languages) {
  test(`${lang}: chapters and contents follow the source page order`, async ({ page }) => {
    await openPage(page, path, lang)

    const titles = source.chapters.map((chapter) => chapter.title[lang])
    const labels = source.chapters.map((chapter, i) => `0${i + 1}${chapter.label[lang]}`)
    const contentTitles = page.locator('main section[id] h2')
    const contents = page.getByRole('navigation', { name: dict[lang].study.toc.title })
    const common = dict[lang].study.dataLanguage

    // Demo Veri'nin verisi Turkce, Ingilizcede basta 00 veri dili bolumu var.
    if (lang === 'en') {
      await expect(contentTitles).toHaveText([`${common.title} ${common.languages.tr}`, ...titles])
      await expect(contents.locator('ol a')).toHaveText([`00${common.label}`, ...labels])
    } else {
      await expect(contentTitles).toHaveText(titles)
      await expect(contents.locator('ol a')).toHaveText(labels)
    }
    await expect(contents).toContainText(dict[lang].source.toc.note)
  })

  test(`${lang}: the cover shows the tools and leads back to the study`, async ({ page }) => {
    await openPage(page, path, lang)

    const crumb = page.getByRole('navigation', { name: dict[lang].study.cover.crumb })
    await expect(crumb.getByRole('link')).toHaveAttribute('href', '/work/demo-data')
    await expect(crumb).toContainText(`01 · ${dict[lang].source.crumb.current}`)
    await expect(page.getByRole('list', { name: dict[lang].study.cover.tags }).locator('li')).toHaveText(source.tags)
  })

  test(`${lang}: a code file shows its path, line count and language`, async ({ page }) => {
    await openPage(page, path, lang)

    const lines = file('code', lang, 'rules/catalog.py').split('\n').length
    const frame = page.locator('#validation figure[data-file]')
    await expect(frame.locator('figcaption')).toContainText('rules/catalog.py')
    await expect(frame.locator('figcaption')).toContainText(`${lines} ${dict[lang].study.files.lines} · Python`)
  })
}

test('en: code and data files follow the data language and the site stays in English', async ({ page }) => {
  await openPage(page, path, 'en')

  const common = dict.en.study.dataLanguage
  const code = page.locator('#validation figure[data-file] pre').last()
  const data = page.locator('#data [data-datafile]').first()
  await expect(page.locator('#data-language')).toContainText(dict.en.source.dataLanguage.lede)
  await expect(code).toContainText('Catalog records pass through these rules')
  await expect(data).toContainText('raw_records_sample.csv')

  await page.getByRole('button', { name: `${common.original} · ${common.languages.tr}` }).click()
  await expect(code).toContainText('Katalog kayıtları eşleştirmeye girmeden')
  await expect(data).toContainText('ham_kayitlar_ornek.csv')
  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
})

// Satir numaralari ayri bir sutunda durur, kopyalanan metin dosyanin
// kendisiyle birebir ayni olmalidir.
test('the copy button copies the file without line numbers', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write'])
  await openPage(page, path, 'tr')

  const frame = page.locator('#validation figure[data-file]')
  await frame.getByRole('button', { name: dict.tr.study.files.copy }).click()

  await expect(frame.getByRole('button', { name: dict.tr.study.files.copied })).toBeVisible()
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(file('code', 'tr', 'rules/catalog.py'))
})

// Indirme baglantisi onizlemedeki dosyanin aynisini, okurun gordugu adla
// verir. Ingilizce sayfada orijinale gecince Turkce dosya iner.
test('the download link gives the previewed file in the chosen data language', async ({ page }) => {
  await openPage(page, path, 'en')

  const common = dict.en.study.dataLanguage
  const link = page.locator('#data [data-datafile]').first().getByRole('link', { name: dict.en.study.files.download })

  async function expectFile(name: string, language: Language) {
    await expect(link).toHaveAttribute('download', name)
    const response = await page.request.get((await link.getAttribute('href'))!)
    expect(response.ok()).toBe(true)
    expect((await response.text()).replace(/\n$/, '')).toBe(file('data', language, 'raw-sample.csv'))
  }

  await expectFile('raw_records_sample.csv', 'en')
  await page.getByRole('button', { name: `${common.original} · ${common.languages.tr}` }).click()
  await expectFile('ham_kayitlar_ornek.csv', 'tr')
})

test('the author box and the back card point to the right places', async ({ page }) => {
  await openPage(page, path, 'tr')

  await expect(page.getByRole('link', { name: /Burak Ayan/ })).toHaveAttribute(
    'href',
    'https://paktlabs.com/profiles/ayanburak',
  )
  await expect(page.getByRole('link', { name: new RegExp(dict.tr.source.back.text) })).toHaveAttribute(
    'href',
    '/work/demo-data',
  )
})

// Kod ve veri dosyalari dar ekranda kendi kutularinda yatay kayar, sayfanin
// kendisi yana kaymamali. 768/769 ve 1100/1101 CSS'teki esiklerin iki yani.
for (const [width, height] of [
  [390, 844],
  [768, 1024],
  [769, 1024],
  [1100, 900],
  [1101, 900],
  [1440, 900],
] as const) {
  test(`${width}x${height}: the source page does not overflow sideways`, async ({ page }) => {
    await page.setViewportSize({ width, height })
    await openPage(page, path, 'en')

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
    expect(overflow).toBeLessThanOrEqual(0)
  })
}
