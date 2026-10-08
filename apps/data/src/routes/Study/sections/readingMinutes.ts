/*
file: readingMinutes.ts
importable: readingMinutes

Bir detay sayfasinin okuma suresini dakika olarak hesaplar. Sure elle
yazilmaz, sayfanin metni degistikce kendiliginden guncellenir.

description: Detay sayfasinin metninden yaklasik okuma suresini hesaplayan yardimci.
*/

import type { Language } from '@paktlabs/brand/i18n/language'

import type { Block } from '@/content/studies/blocks'
import type { StudyPage } from '@/content/studies/types'

// Ortalama bir okurun duz metinde dakikada okudugu kelime sayisi. Yaygin
// kabul edilen deger iki yuz ile iki yuz elli arasi, teknik metin daha yavas
// okundugu icin alt sinir secildi.
const WORDS_PER_MINUTE = 200

// Bir parcanin okunan metni. Donus tipi acikca yazili, BlockView'deki gibi
// Block'a yeni bir tur eklenip burada karsiligi yazilmazsa derleme durur.
// Tablo hucreleri ve sekillerdeki sayilar sayilmaz, okur onlari okumaz, goz
// atar. Yalnizca duz metin sayilir, duz tablo, dosya agaci ve karsilastirma
// da bu yuzden disarida.
function blockText(block: Block, language: Language): string[] {
  switch (block.type) {
    case 'paragraph':
      return [block.text[language]]
    case 'list':
      return [
        block.title?.[language] ?? '',
        ...block.items.flatMap((item) => [item.title[language], item.text[language]]),
      ]
    case 'details':
      return [block.meta[language], block.title[language], ...block.blocks.flatMap((inner) => blockText(inner, language))]
    case 'sheet':
      return block.notes?.map((note) => note[language]) ?? []
    case 'table':
    case 'tree':
    case 'compare':
      return []
    case 'decisions':
      return block.items.flatMap((item) => [item.title[language], item.text[language]])
    case 'timeline':
      return block.legend ? [block.legend[language]] : []
    case 'note':
      return [block.label[language], block.text[language]]
    case 'stations':
      return block.items.flatMap((station) => [
        station.title[language],
        station.text[language],
        ...(station.details ?? []).map((paragraph) => paragraph[language]),
      ])
    case 'chart':
      return [
        block.label[language],
        block.title[language],
        block.reading[language],
        ...(block.blocks ?? []).flatMap((inner) => blockText(inner, language)),
      ]
  }
}

// Sayfadaki butun duz metin toplanir: kapak aciklamasi, ozet bandi ve her
// bolumun etiketi, basligi, girisi ve parcalari. En az bir dakika doner, sifir
// dakikalik okuma suresi anlamsiz olurdu.
export function readingMinutes(page: StudyPage, language: Language): number {
  const texts = [
    page.lede[language],
    page.summary.problem[language],
    page.summary.approach[language],
    page.summary.result[language],
    ...page.chapters.flatMap((chapter) => [
      chapter.label[language],
      chapter.title[language],
      chapter.lede[language],
      ...chapter.blocks.flatMap((block) => blockText(block, language)),
    ]),
  ]
  const words = texts.join(' ').split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE))
}
