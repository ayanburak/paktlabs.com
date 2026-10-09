/*
file: data.spec.ts

Calismalarin dosyalarini denetler. Her calismanin data/tr ve data/en
klasorlerinde ayni kimlikli CSV'ler bulunmali, ayni kimlikli iki dosya ayni
sayida satir ve her satirda ayni sayida hucre tasimali, yoksa okur veri
dilini degistirdiginde tablo kayar. code/tr ve code/en klasorlerinde de ayni
yollarda ayni kod dosyalari bulunmali. Detay sayfasindaki ve kod sayfasindaki
her parcanin cagirdigi dosya iki dilde var olmali, her kod dosyasinin dili
kayitli olmali, bolum adresleri de sayfa icinde tekil olmali. Tarayiciya
ihtiyac yok, dosyalar diskten okunur.

description: data sitesindeki calisma dosyalarinin iki dilde eslestigini denetleyen testler.
*/

import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

import { expect, test } from '@playwright/test'

import type { Block } from '../src/content/studies/blocks'
import { codeLanguage } from '../src/components/study/blocks/languages'
import { parseCsv } from '../src/content/studies/csv'
import { studies } from '../src/content/studies'
import type { Chapter, Study } from '../src/content/studies/types'

const root = join(import.meta.dirname, '../src/content/studies')

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
  return blocks.flatMap((block): FileRef[] => {
    if (block.type === 'sheet') return [{ kind: 'data', id: block.csv }]
    if (block.type === 'datafile') return [{ kind: 'data', id: block.csv }]
    if (block.type === 'code' || block.type === 'output') return [{ kind: 'code', path: block.path }]
    if (block.type === 'details') return fileRefs(block.blocks)
    if (block.type === 'chart') return fileRefs(block.blocks ?? [])
    return []
  })
}

// Calismanin iki sayfasinin bolumleri: detay sayfasi her zaman, kod sayfasi
// kod sitede paylasiliyorsa.
async function pages(study: Study): Promise<[string, Chapter[]][]> {
  const list: [string, Chapter[]][] = [['page', (await study.page()).chapters]]
  if (study.code.kind === 'page') list.push(['source', (await study.code.page()).chapters])
  return list
}

// Yer tutucularin veri dosyasi ve detay sayfasi yok, yalnizca gercek
// calismalar denetlenir.
const realStudies = studies.filter((study): study is Study => !('placeholder' in study))

for (const study of realStudies) {
  const { slug } = study

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
    for (const [name, chapters] of await pages(study)) {
      const ids = ['veri-dili', ...chapters.map((chapter) => chapter.id)]
      expect(new Set(ids).size, name).toBe(ids.length)
    }
  })

  test(`${slug}: every block points to a file in both languages`, async () => {
    for (const [name, chapters] of await pages(study)) {
      for (const ref of chapters.flatMap((chapter) => fileRefs(chapter.blocks))) {
        for (const language of ['tr', 'en']) {
          if (ref.kind === 'data') expect(csvIds(slug, language), `${name}: ${ref.id}`).toContain(ref.id)
          else expect(codePaths(slug, language), `${name}: ${ref.path}`).toContain(ref.path)
        }
      }
    }
  })

  // Terminal ciktisi renklenmez, onun disindaki her kod dosyasinin dili
  // kayitli olmali, yoksa sayfa o dosyada hata verir.
  test(`${slug}: every code file has a known language`, async () => {
    for (const [, chapters] of await pages(study)) {
      for (const block of chapters.flatMap((chapter) => chapter.blocks)) {
        if (block.type === 'code') expect(() => codeLanguage(block.path), block.path).not.toThrow()
      }
    }
  })
}
