/*
file: blocks.ts
importable: Block, ParagraphBlock, ListBlock, ListItem, DetailsBlock, SheetBlock

Detay sayfasinin bolumlerine konan parcalarin tipleri. Bir parca icerigi
bilmez, adini hikayeden degil bicimden alir. Bir bolumde hangi parcanin hangi
sirayla ve kac kez kullanilacagi serbesttir. Her parcanin type alani onu
digerlerinden ayirir, sayfa da bu alana bakip dogru bileseni secer.

Yeni bir anlatim bicimi gerektiginde buraya yeni bir parca tipi eklenir ve
Block birlesimine katilir, eski sayfalara dokunulmaz. Yanlis ya da eksik
yazilmis bir parca derleme hatasi verir.

description: Calisma detay sayfasindaki bolum parcalarinin tiplerini tanimlayan modul.
*/

import type { Localized } from './types'

// Duz metin paragrafi. Bolum girisinden sonra gelen ara anlatim icin, ornegin
// iki tablodan once onlari tanitan cumle.
export interface ParagraphBlock {
  type: 'paragraph'
  text: Localized
}

// Listenin bir maddesi: kalin yazilan kisa bir bas cumlesi ve aciklamasi.
export interface ListItem {
  title: Localized
  text: Localized
}

// Kisa maddelerden olusan liste, iki gorunusu var. columns maddeleri
// numarali ve yan yana dizer, birkac kisa etkiyi bir bakista gostermek icin.
// stack maddeleri alt alta, aralarinda cizgiyle dizer, her biri biraz daha
// uzun anlatilan sinirlar ya da uyarilar icin. title verilirse listenin
// ustunde kucuk bir baslik olarak durur.
export interface ListBlock {
  type: 'list'
  view: 'columns' | 'stack'
  title?: Localized
  items: ListItem[]
}

// Acilir kutu. Kapaliyken ustte kucuk bir etiket ve basliktan olusan bir
// satir, acilinca icindeki parcalar gorunur. Ayrintiyi ilk katmandan ayirmak
// icin kullanilir, icine paragraf, liste ya da hesap tablosu gibi baska
// parcalar konabilir.
export interface DetailsBlock {
  type: 'details'
  meta: Localized
  title: Localized
  blocks: Block[]
}

// Excel gorunumlu hesap tablosu. Hucreler calismanin data klasorundeki CSV'den
// gelir, csv o dosyanin dilden bagimsiz kimligidir. Buradaki alanlar yalnizca
// gorunumu ayarlar.
//
// name, tabs ve formula verinin parcasi sayilir ve verinin dilini izler,
// Turkce veride =TOPLA, Ingilizce veride =SUM yazar. notes tablonun altindaki
// aciklamalardir ve sitenin dilini izler. cell secili hucredir, ornegin C6,
// formula yoksa formul cubugu bu hucrenin degerini gosterir. numbers sayi
// tasiyan ve saga yaslanan sutunlarin harfleri. total son satirin toplam
// satiri oldugunu, rows CSV bir kesitse gercek tablonun satir sayisini soyler.
export interface SheetBlock {
  type: 'sheet'
  csv: string
  name: Localized
  tabs: Localized<string[]>
  cell: string
  formula?: Localized
  numbers?: string[]
  total?: true
  rows?: number
  notes?: Localized[]
}

// Bolumlerde kullanilabilecek butun parcalar. Yeni parca tipi buraya eklenir.
export type Block = ParagraphBlock | ListBlock | DetailsBlock | SheetBlock
