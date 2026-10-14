/*
file: dbschema.ts
importable: SchemaLink, schemaLinks, findTable, layoutColumn

Veritabani semasindan baglari ve tablolari okuyan yardimcilar. Sema
parcasi, veritabani tablosu parcasi ve data testi ayni okumayi kullanir.

    const links = schemaLinks(schema)

description: Bir veritabani semasinin baglarini, tablolarini ve yerlesimini okuyan yardimcilar.
*/

import type { DbSchema, DbTable } from './blocks'
import type { Localized } from './types'

// Bir bag: FK sutunu, gittigi PK sutunu ve tek cumlelik anlatimi.
export interface SchemaLink {
  from: [string, string]
  to: [string, string]
  text: Localized | undefined
}

// Baglar sutunlarin ref alanlarindan cikar, sira tablolarin ve sutunlarin
// yazildigi siradir. Levhadaki numaralar bu siradan gelir.
export function schemaLinks(schema: DbSchema): SchemaLink[] {
  return schema.tables.flatMap((table) =>
    table.columns
      .filter((column) => column.ref)
      .map((column) => {
        const [toTable = '', toColumn = ''] = (column.ref ?? '').split('.')
        return { from: [table.name, column.name], to: [toTable, toColumn], text: schema.links[`${table.name}.${column.name}`] }
      }),
  )
}

// Adi verilen tablo. Bulunamazsa hata verir, yanlis yazilmis bir tablo adi
// sayfada sessizce bos bir kart olarak kalmamali.
export function findTable(schema: DbSchema, name: string): DbTable {
  const table = schema.tables.find((item) => item.name === name)
  if (!table) throw new Error(`semada ${name} tablosu yok`)
  return table
}

// Yerlesimde bir tablonun durdugu ilk sutun, sifirdan sayilir. Tablo
// yerlesimde yoksa -1 doner.
export function layoutColumn(layout: string[], name: string): number {
  for (const row of layout) {
    const index = row.split(/\s+/).indexOf(name)
    if (index >= 0) return index
  }
  return -1
}
