/*
file: blocks.ts
importable: Block, ParagraphBlock, ListBlock, ListItem, DetailsBlock, SheetBlock, TableBlock, TableCell, StationsBlock, Station, ChartBlock, ChartBar, ChartZone, DecisionsBlock, TimelineBlock, TimelineTask, TreeBlock, TreeGroup, TreeItem, CompareBlock, CompareRow, NoteBlock, CodeBlock, OutputBlock, DataFileBlock, childBlocks, flattenBlocks

Calisma sayfalarinin bolumlerine konan parcalarin tipleri. Bir parca icerigi
bilmez, adini hikayeden degil bicimden alir. Bir bolumde hangi parcanin hangi
sirayla ve kac kez kullanilacagi serbesttir. Her parcanin type alani onu
digerlerinden ayirir, sayfa da bu alana bakip dogru bileseni secer.

Yeni bir anlatim bicimi gerektiginde buraya yeni bir parca tipi eklenir ve
Block birlesimine katilir, eski sayfalara dokunulmaz. Yanlis ya da eksik
yazilmis bir parca derleme hatasi verir. Baska parca tasiyan parcalarin
icini gezmek icin childBlocks ve flattenBlocks kullanilir, boylece her
gezen kod kendi ozyinelemesini yazmaz.

description: Calisma sayfalarindaki bolum parcalarinin tiplerini tanimlayan modul.
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

// Verilen kararlar, alt alta ve numarali. Her kararin sorusu baslik, cevabi
// paragraf olarak yazilir. Numara siradan cikar, ustundeki kucuk etiketin
// adi sitenin sozlugunden gelir.
export interface DecisionsBlock {
  type: 'decisions'
  items: ListItem[]
}

// Takvimdeki bir is. start isin basladigi donemdir, birden sayilir, length
// kac donem surdugudur. Yarim donemler icin ondalik verilebilir, ornegin 1.6.
// highlight isi altin cizer, takvimde ayri bir tarafin isini gostermek icin.
export interface TimelineTask {
  label: Localized
  start: number
  length: number
  highlight?: true
}

// Zaman cizelgesi. periods donem sayisidir, periodLabel donemlerin kisaltmasi,
// ornegin hafta icin H ve W, basliklar H1, H2 diye yazilir. legend
// cizelgenin altinda vurgulu cubuklarin ne anlama geldigini soyler.
export interface TimelineBlock {
  type: 'timeline'
  periods: number
  periodLabel: Localized
  tasks: TimelineTask[]
  legend?: Localized
}

// Dosya agacinin bir ogesi. Adi dosya, klasor ya da tablo adi oldugu icin
// iki dilde aynidir, yanindaki aciklama sitenin dilini izler. items verilirse
// oge bir klasordur ve altindaki ogeler bir kademe iceride cizilir.
// highlight ogeyi altin cizer, ornegin kod sayfasinda paylasilan dosyalar.
// muted ogeyi soluk cizer, ornegin paylasilmayan dosyalar.
export interface TreeItem {
  name: string
  note?: Localized
  highlight?: true
  muted?: true
  items?: TreeItem[]
}

// Dosya agacinin bir kolu: bir kok ad ve altindaki ogeler. Agac cizgileri ve
// hizalama kendiliginden kurulur.
export interface TreeGroup {
  root: string
  items: TreeItem[]
}

// Kod gorunumlu dosya agaci, ornegin teslim edilen depo ve veritabani.
export interface TreeBlock {
  type: 'tree'
  label: Localized
  groups: TreeGroup[]
}

// Karsilastirmanin bir satiri. lead verilirse sonraki halin basinda kalin
// durur, okurun gozu once degisimin kendisine gitsin diye.
export interface CompareRow {
  label: Localized
  before: Localized
  after: Localized
  lead?: Localized
}

// Once ve sonra karsilastirmasi. Sutun basliklari sitenin sozlugunden gelir.
export interface CompareBlock {
  type: 'compare'
  rows: CompareRow[]
}

// Akisin disinda kalan ama okurun bilmesi gereken kisa bir not, ornegin bir
// sinirlama ya da bir uyari. label notun ustundeki kucuk etiket.
export interface NoteBlock {
  type: 'note'
  label: Localized
  text: Localized
}

// Calismanin code klasorundeki bir kod dosyasi, satir numaralari, yolu ve
// kopyalama dugmesiyle. path dosyanin calismanin kodundaki yoludur, ornegin
// rules/catalog.py, basliginda da bu yol yazar. Dosya verinin dilini izler,
// iki dilde yorumlari cevrilmis ayni kod durur. Dil adi ve renklendirme
// dosyanin uzantisindan secilir.
export interface CodeBlock {
  type: 'code'
  path: string
}

// Bir komutun terminal ciktisi. Metni code klasorundeki bir dosyada durur,
// ornegin out/evaluate.txt, ve kod gibi verinin dilini izler. Ciktidaki
// sayilar sayfadaki tablolar ve sekillerle ayni olmalidir.
export interface OutputBlock {
  type: 'output'
  path: string
}

// Indirilebilir bir veri dosyasi: tam onizlemesi, indirme baglantisi ve
// altinda bir not. csv calismanin data klasorundeki dosyanin kimligidir,
// hesap tablosundaki gibi. name indirilen ve basliginda gorunen dosya
// adidir, verinin dilini izler. note sitenin dilini izler. Satir, sutun ve
// boyut dosyadan hesaplanir, elle yazilmaz.
export interface DataFileBlock {
  type: 'datafile'
  csv: string
  name: Localized
  note?: Localized
}

// Bolumlerde kullanilabilecek butun parcalar. Yeni parca tipi buraya eklenir.
export type Block =
  | ParagraphBlock
  | ListBlock
  | DetailsBlock
  | SheetBlock
  | TableBlock
  | StationsBlock
  | ChartBlock
  | DecisionsBlock
  | TimelineBlock
  | TreeBlock
  | CompareBlock
  | NoteBlock
  | CodeBlock
  | OutputBlock
  | DataFileBlock

// Bir parcanin icine konan parcalar. Yalnizca acilir kutu ve sekil baska
// parca tasir, digerleri bos liste verir. Yeni bir parca tipi icine parca
// tasiyacaksa karsiligi buraya yazilir, yazilmazsa derleme durur.
export function childBlocks(block: Block): Block[] {
  switch (block.type) {
    case 'details':
      return block.blocks
    case 'chart':
      return block.blocks ?? []
    case 'paragraph':
    case 'list':
    case 'sheet':
    case 'table':
    case 'stations':
    case 'decisions':
    case 'timeline':
    case 'tree':
    case 'compare':
    case 'note':
    case 'code':
    case 'output':
    case 'datafile':
      return []
    default: {
      const unreachable: never = block
      return unreachable
    }
  }
}

// Parca listesini ve iclerindeki butun parcalari tek duz listede verir. Bir
// parca kendi icindekilerden once gelir.
export function flattenBlocks(blocks: Block[]): Block[] {
  return blocks.flatMap((block) => [block, ...flattenBlocks(childBlocks(block))])
}
