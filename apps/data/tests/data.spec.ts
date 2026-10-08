/*
file: data.spec.ts

Calismalarin veri dosyalarini denetler. Her calismanin data/tr ve data/en
klasorlerinde ayni kimlikli CSV'ler bulunmali, ayni kimlikli iki dosya ayni
sayida satir ve her satirda ayni sayida hucre tasimali, yoksa okur veri
dilini degistirdiginde tablo kayar. Detay sayfasindaki her hesap tablosunun
cagirdigi CSV de iki dilde var olmali. Tarayiciya ihtiyac yok, dosyalar
diskten okunur.

description: data sitesindeki calisma CSV'lerinin iki dilde eslestigini denetleyen testler.
*/

import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

import { expect, test } from '@playwright/test'

import type { Block } from '../src/content/studies/blocks'
import { parseCsv } from '../src/content/studies/csv'
import { studies } from '../src/content/studies'
import type { Study } from '../src/content/studies/types'

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

// Acilir kutularin icindekiler dahil, bir parca listesindeki butun hesap
// tablolarinin cagirdigi CSV kimlikleri.
function sheetIds(blocks: Block[]): string[] {
  return blocks.flatMap((block) => {
    if (block.type === 'sheet') return [block.csv]
    if (block.type === 'details') return sheetIds(block.blocks)
    return []
  })
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

  test(`${slug}: every sheet points to a data file`, () => {
    const ids = study.page.chapters.flatMap((chapter) => sheetIds(chapter.blocks))
    for (const id of ids) {
      expect(csvIds(slug, 'tr'), id).toContain(id)
      expect(csvIds(slug, 'en'), id).toContain(id)
    }
  })
}
