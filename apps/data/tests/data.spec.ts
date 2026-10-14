/*
file: data.spec.ts

Calismalarin dosyalarini denetler. Dosya desenlerinin desteklenen dillerle
ayni kaldigini da burada olcer. Her calismanin data/tr ve data/en
klasorlerinde ayni kimlikli CSV'ler bulunmali, ayni kimlikli iki dosya ayni
sayida satir ve her satirda ayni sayida hucre tasimali, yoksa okur veri
dilini degistirdiginde tablo kayar. code/tr ve code/en klasorlerinde de ayni
yollarda ayni kod dosyalari bulunmali. Detay sayfasindaki ve kod sayfasindaki
her parcanin cagirdigi dosya iki dilde var olmali, her kod dosyasinin dili
kayitli olmali, bolum adresleri de sayfa icinde tekil olmali. Parcalarin
icerigi de tutarli olmali: tablo satirlarinin hucre sayisi, sekil bolgeleri
ve eksen sinirlari, cizgi serilerinin nokta sayisi, bilesim ve pasta
yuzdelerinin toplami, isi ve korelasyon tablolarinin boyutu, karar tablosunun
kareligi, hesabin sonuc satiri, hesap tablosu hucre adresi ve takvim araligi. Blok
katalogu da calismalarla ayni denetimlerden gecer, ayrica her katalog
bolumunun kendi parca turunu gosterdigi olculur. Tarayiciya ihtiyac yok,
dosyalar diskten okunur.

description: data sitesindeki calisma dosyalarinin iki dilde eslestigini denetleyen testler.
*/

import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

import { expect, test } from '@playwright/test'
import { languages } from '@paktlabs/brand/i18n/language'

import { codeLanguage } from '../src/components/study/blocks/file/languages'
import { type Block, flattenBlocks } from '../src/content/studies/blocks'
import { parseCsv } from '../src/content/studies/csv'
import { CATALOG_SLUG, studies } from '../src/content/studies'
import { catalogChapters } from '../src/content/studies/catalog/page'
import type { Chapter, Study } from '../src/content/studies/types'

const root = join(import.meta.dirname, '../src/content/studies')

// assetFiles.ts'teki glob deseni ve yol ifadesi Vite icin statik yazilmak
// zorunda, dil listesinden uretilemez. Ikisindeki dil kodlari brand'deki
// languages listesiyle ayni degilse yeni bir dilin dosyalari sessizce yuklenmez.
test('the asset file patterns list exactly the supported languages', () => {
  const source = readFileSync(join(root, 'assetFiles.ts'), 'utf8')
  const glob = source.match(/import\.meta\.glob<string>\('[^']*\{(?:data,code|code,data)\}\/\{([^}]*)\}/)
  const path = source.match(/const PATH = [^\n]*\(([a-z|]+)\)\\\/\(\.\+\)/)
  expect(glob, 'glob deseni bulunamadi').not.toBeNull()
  expect(path, 'PATH ifadesi bulunamadi').not.toBeNull()
  expect(glob?.[1]?.split(',')).toEqual([...languages])
  expect(path?.[1]?.split('|')).toEqual([...languages])
})

function csvIds(slug: string, language: string): string[] {
  try {
    return readdirSync(join(root, slug, 'data', language))
      .filter((file) => file.endsWith('.csv'))
      .map((file) => file.slice(0, -4))
      .sort()
  } catch {
    return []
  }
}

function readCsv(slug: string, language: string, id: string): string[][] {
  return parseCsv(readFileSync(join(root, slug, 'data', language, `${id}.csv`), 'utf8'))
}

// Bir calismanin bir dildeki kod dosyalarinin, code/<dil> klasorune gore
// yollari, ornegin rules/catalog.py.
function codePaths(slug: string, language: string): string[] {
  try {
    return readdirSync(join(root, slug, 'code', language), { recursive: true, withFileTypes: true })
      .filter((entry) => entry.isFile())
      .map((entry) => join(entry.parentPath, entry.name).slice(join(root, slug, 'code', language).length + 1))
      .sort()
  } catch {
    return []
  }
}

// Bir parcanin cagirdigi dosya. Hesap tablosu ve veri dosyasi data
// klasorunden CSV kimligiyle, kod ve terminal ciktisi code klasorunden
// yoluyla dosya cagirir.
type FileRef = { kind: 'data'; id: string } | { kind: 'code'; path: string }

// Acilir kutularin ve sekillerin icindekiler dahil, bir parca listesindeki
// butun dosya cagrilari.
function fileRefs(blocks: Block[]): FileRef[] {
  return flattenBlocks(blocks).flatMap((block): FileRef[] => {
    if (block.type === 'sheet') return [{ kind: 'data', id: block.csv }]
    if (block.type === 'datafile') return [{ kind: 'data', id: block.csv }]
    if (block.type === 'code' || block.type === 'output') return [{ kind: 'code', path: block.path }]
    return []
  })
}

// Bir parcanin kendi icerigindeki tutarsizliklar, okunabilir bir mesajla.
// Tipler bu kurallari yakalayamaz: hucre sayisi, bolge kimligi, eksen
// sinirlari, hucre adresi ve takvim araligi sayilara ve metne bakar. Bos
// liste tutarlidir.
function blockProblems(block: Block): string[] {
  const problems: string[] = []
  if (block.type === 'table') {
    block.rows.forEach((row, index) => {
      if (row.length !== block.head.length) problems.push(`table row ${index + 1} has ${row.length} cells, head has ${block.head.length}`)
    })
  }
  if (block.type === 'chart') {
    const zoneIds = (block.zones ?? []).map((zone) => zone.id)
    for (const bar of block.bars) {
      if (bar.zone !== undefined && !zoneIds.includes(bar.zone)) problems.push(`chart bar "${bar.label.en}" has unknown zone ${bar.zone}`)
      if (bar.value > block.max) problems.push(`chart bar "${bar.label.en}" is ${bar.value}, above max ${block.max}`)
    }
    if (block.ticks.length < 2) problems.push(`chart "${block.title.en}" has ${block.ticks.length} ticks, needs at least 2`)
  }
  if (block.type === 'line') {
    if (block.series.length > 3) problems.push(`line "${block.title.en}" has ${block.series.length} series, at most 3 read well`)
    if (block.series.filter((series) => series.highlight).length > 1) problems.push(`line "${block.title.en}" highlights more than one series`)
    for (const series of block.series) {
      if (series.values.length !== block.points.length) {
        problems.push(`line series "${series.label.en}" has ${series.values.length} values, there are ${block.points.length} points`)
      }
      if (series.values.some((value) => value < 0 || value > block.max)) problems.push(`line series "${series.label.en}" leaves the axis 0..${block.max}`)
    }
    if (block.ticks.length < 2) problems.push(`line "${block.title.en}" has ${block.ticks.length} ticks, needs at least 2`)
  }
  // Yuzdeler tam sayi yazildigi icin toplam yuvarlamadan bir eksik ya da
  // fazla olabilir, yarim puanlik pay buna birakilir.
  if (block.type === 'composition') {
    if (block.parts.length > 4) problems.push(`composition "${block.title.en}" has ${block.parts.length} parts, at most 4`)
    for (const row of block.rows) {
      if (row.values.length !== block.parts.length) problems.push(`composition row "${row.label.en}" has ${row.values.length} values for ${block.parts.length} parts`)
      const sum = row.values.reduce((a, b) => a + b, 0)
      if (Math.abs(sum - 100) > 0.5) problems.push(`composition row "${row.label.en}" sums to ${sum}, not 100`)
    }
  }
  if (block.type === 'pie') {
    if (block.slices.length > 5) problems.push(`pie "${block.title.en}" has ${block.slices.length} slices, at most 5`)
    const sum = block.slices.reduce((a, slice) => a + slice.value, 0)
    if (Math.abs(sum - 100) > 0.5) problems.push(`pie "${block.title.en}" sums to ${sum}, not 100`)
    block.slices.forEach((slice, index) => {
      const prev = block.slices[index - 1]
      if (prev && slice.value > prev.value) problems.push(`pie slice "${slice.label.en}" is larger than the one before, write slices largest first`)
    })
  }
  if (block.type === 'heat') {
    for (const row of block.rows) {
      if (row.values.length !== block.columns.length) problems.push(`heat row "${row.label.en}" has ${row.values.length} values for ${block.columns.length} columns`)
      if (row.values.some((value) => value < 0 || value > block.max)) problems.push(`heat row "${row.label.en}" leaves the scale 0..${block.max}`)
    }
  }
  // Alt ucgen: i. satir i deger tasir, ilk satir bos.
  if (block.type === 'correlation') {
    if (block.values.length !== block.variables.length) problems.push(`correlation "${block.title.en}" has ${block.values.length} rows for ${block.variables.length} variables`)
    block.values.forEach((row, index) => {
      if (row.length !== index) problems.push(`correlation row ${index + 1} has ${row.length} values, the lower triangle needs ${index}`)
      if (row.some((value) => value < -1 || value > 1)) problems.push(`correlation row ${index + 1} has a value outside -1..1`)
    })
  }
  if (block.type === 'matrix') {
    const n = block.classes.length
    if (block.cells.length !== n || block.cells.some((row) => row.length !== n)) problems.push(`matrix "${block.title.en}" is not ${n} by ${n}`)
  }
  // Hesabin son satiri sonuctur ve = ile baslar, ilk satirin islemi olmaz.
  if (block.type === 'calc') {
    if (block.steps[0]?.op !== undefined) problems.push(`calc "${block.title.en}" starts with an operation`)
    if (block.steps[block.steps.length - 1]?.op !== '=') problems.push(`calc "${block.title.en}" does not end with a result line`)
    if (block.steps.slice(1).some((step) => step.op === undefined)) problems.push(`calc "${block.title.en}" has a line without an operation`)
  }
  if (block.type === 'sheet' && !/^[A-Z]+\d+$/.test(block.cell)) problems.push(`sheet ${block.csv} has bad cell ${block.cell}`)
  if (block.type === 'timeline') {
    for (const task of block.tasks) {
      // Baslangic birden sayildigi icin donem sayisi n ise cizgi n + 1'de biter.
      if (task.start < 1 || task.start + task.length > block.periods + 1) {
        problems.push(`timeline task "${task.label.en}" runs from ${task.start} for ${task.length}, periods is ${block.periods}`)
      }
    }
  }
  return problems
}

// Calismanin iki sayfasinin bolumleri: detay sayfasi her zaman, kod sayfasi
// kod sitede paylasiliyorsa.
async function studyPages(study: Study): Promise<[string, Chapter[]][]> {
  const list: [string, Chapter[]][] = [['page', (await study.page()).chapters]]
  if (study.code.kind === 'page') list.push(['source', (await study.code.page()).chapters])
  return list
}

// Dosyalari ve parcalari denetlenen her sey: calismalar ve blok katalogu.
// Katalog bir calisma degil ama ayni klasor duzeninde dosya tasir ve ayni
// parcalari kullanir, bu yuzden ayni denetimlerden gecer.
const subjects: { slug: string; pages: () => Promise<[string, Chapter[]][]> }[] = [
  ...studies.map((study) => ({ slug: study.slug, pages: () => studyPages(study) })),
  { slug: CATALOG_SLUG, pages: async () => [['catalog', catalogChapters]] },
]

// Katalogda her bolumun id'si bir parca turudur ve bolum o turden en az bir
// parca tasimalidir. Tur listesinin eksiksiz oldugunu TypeScript zaten
// denetler, burada bolumun yanlis ture ornek vermedigi olculur.
test('every catalog chapter shows its own block type', () => {
  for (const chapter of catalogChapters) {
    expect(flattenBlocks(chapter.blocks).map((block) => block.type), chapter.id).toContain(chapter.id)
  }
})

for (const { slug, pages } of subjects) {

  test(`${slug}: both languages have the same data files`, () => {
    expect(csvIds(slug, 'en')).toEqual(csvIds(slug, 'tr'))
  })

  test(`${slug}: each data file has the same shape in both languages`, () => {
    for (const id of csvIds(slug, 'tr')) {
      const tr = readCsv(slug, 'tr', id).map((row) => row.length)
      const en = readCsv(slug, 'en', id).map((row) => row.length)
      expect(en, `${id}.csv`).toEqual(tr)
    }
  })

  test(`${slug}: both languages have the same code files`, () => {
    expect(codePaths(slug, 'en')).toEqual(codePaths(slug, 'tr'))
  })

  // Icindekiler bolume adresteki parcayla atlar, ayni parcayi tasiyan iki
  // bolum olursa yanlis bolume gidilir. 00 veri dili bolumunun adresi de
  // bir icerik bolumuyle cakismamali.
  test(`${slug}: chapter addresses are unique on each page`, async () => {
    for (const [name, chapters] of await pages()) {
      const ids = ['data-language', ...chapters.map((chapter) => chapter.id)]
      expect(new Set(ids).size, name).toBe(ids.length)
    }
  })

  test(`${slug}: every block points to a file in both languages`, async () => {
    for (const [name, chapters] of await pages()) {
      for (const ref of chapters.flatMap((chapter) => fileRefs(chapter.blocks))) {
        for (const language of ['tr', 'en']) {
          if (ref.kind === 'data') expect(csvIds(slug, language), `${name}: ${ref.id}`).toContain(ref.id)
          else expect(codePaths(slug, language), `${name}: ${ref.path}`).toContain(ref.path)
        }
      }
    }
  })

  test(`${slug}: block contents are consistent`, async () => {
    for (const [name, chapters] of await pages()) {
      for (const chapter of chapters) {
        for (const block of flattenBlocks(chapter.blocks)) {
          expect(blockProblems(block), `${name}/${chapter.id}/${block.type}`).toEqual([])
        }
      }
    }
  })

  // Terminal ciktisi renklenmez, onun disindaki her kod dosyasinin dili
  // kayitli olmali, yoksa sayfa o dosyada hata verir.
  test(`${slug}: every code file has a known language`, async () => {
    for (const [, chapters] of await pages()) {
      for (const block of flattenBlocks(chapters.flatMap((chapter) => chapter.blocks))) {
        if (block.type === 'code') expect(() => codeLanguage(block.path), block.path).not.toThrow()
      }
    }
  })
}
