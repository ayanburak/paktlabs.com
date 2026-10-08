/*
file: blocks.ts
importable: Block, ParagraphBlock, ListBlock, ListItem, DetailsBlock, SheetBlock, TableBlock, TableCell, StationsBlock, Station, ChartBlock, ChartBar, ChartZone

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

// Duz tablonun bir hucresi: ya iki dilli bir metin ya da yuzde olarak bir
// oran. Oran hucreye kucuk bir cubukla ve yaninda degeriyle cizilir.
export type TableCell = Localized | { meter: number }

// Sitenin diliyle yazilan, hesap tablosu gorunumu tasimayan duz tablo. Ham
// veri degil, kisa bir karsilastirma icin. Ilk sutun satirin adidir ve
// kalin yazilir. Her satirda basliklar kadar hucre olmalidir.
export interface TableBlock {
  type: 'table'
  head: Localized[]
  rows: TableCell[][]
}

// Hattin bir istasyonu: adi, ne yaptigini anlatan kisa metin ve istege bagli
// ayrinti paragraflari. Ayrinti istasyonun alt kenarinda acilan bir seritte
// durur, okur ancak isterse sayiya ve gerekceye iner.
export interface Station {
  title: Localized
  text: Localized
  details?: Localized[]
}

// Sirayla gecilen adimlar, solda numarali bir hattin uzerinde alt alta.
// Numaralar siradan cikar.
export interface StationsBlock {
  type: 'stations'
  items: Station[]
}

// Cubuk seklinin bir cubugu. value sifirdan baslayan eksendeki degeridir.
// zone cubugun hangi bolgede durdugunu soyler, bolgeler seklin zones
// listesinde adlandirilir. highlight cubugu altin cizer, okurun gozunu tek
// bir degere cekmek icin. group verilirse cubugun ustunde yeni bir grup
// basligi acilir, ornegin yanlis birlesenler ve kacirilanlar.
export interface ChartBar {
  label: Localized
  value: number
  zone?: string
  highlight?: true
  group?: Localized
}

// Seklin bolgeleri, ornegin otomatik karar, inceleme ve ret. style bolgenin
// zeminini secer: none zeminsiz, hatched altin taramali, shaded acik gri.
// Bolgeler dikey sekilde cubuklarin altinda adlariyla bir bant olarak durur.
export interface ChartZone {
  id: string
  label: Localized
  style: 'none' | 'hatched' | 'shaded'
}

// Tek bir soruya cevap veren cubuk sekli. label seklin ustundeki kucuk
// etiket, ornegin Sekil 1, title soru, reading tek cumlelik okumasi. Eksen
// sifirdan max'a kadar uzanir ve kesilmez, ticks eksende yazan degerlerdir.
// unit ve decimals degerlerin nasil yazilacagini soyler, yuzdeler sitenin
// diline gore %0,1 ya da 0.1% yazilir. blocks seklin altina konan parcalar,
// genellikle verisini ve ayrintisini tasiyan acilir kutu.
export interface ChartBlock {
  type: 'chart'
  direction: 'vertical' | 'horizontal'
  label: Localized
  title: Localized
  reading: Localized
  unit: 'percent' | 'count'
  decimals: number
  max: number
  ticks: number[]
  bars: ChartBar[]
  zones?: ChartZone[]
  blocks?: Block[]
}

// Bolumlerde kullanilabilecek butun parcalar. Yeni parca tipi buraya eklenir.
export type Block = ParagraphBlock | ListBlock | DetailsBlock | SheetBlock | TableBlock | StationsBlock | ChartBlock
