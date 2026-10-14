/*
file: blocks.ts
importable: Block, ParagraphBlock, ListBlock, ListItem, DetailsBlock, SheetBlock, TableBlock, TableCell, StationsBlock, Station, ChartBlock, ChartBar, ChartZone, LineBlock, LineSeries, CompositionBlock, CompositionPart, CompositionRow, PieBlock, PieSlice, HeatBlock, HeatRow, CorrelationBlock, MatrixBlock, MatrixCell, RecordBlock, RecordField, CalcBlock, CalcStep, AcceptanceBlock, AcceptanceRow, DbColumn, DbTable, DbSchema, SchemaBlock, DbTableBlock, DecisionsBlock, TimelineBlock, TimelineTask, TreeBlock, TreeGroup, TreeItem, CompareBlock, CompareRow, NoteBlock, CodeBlock, OutputBlock, DataFileBlock, childBlocks, flattenBlocks

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

// Cizgi seklinin bir serisi. values her noktadaki degerdir, noktalarin
// sayisi seklin points listesiyle ayni olmalidir. highlight seriyi altin
// cizer, okurun gozunu tek bir seriye cekmek icin. Vurgusuz ilk seri
// murekkep, ondan sonrakiler gri cizilir.
export interface LineSeries {
  label: Localized
  values: number[]
  highlight?: true
}

// Bir degerin zaman icinde nasil degistigini gosteren cizgi sekli. points
// yatay eksendeki noktalarin adlaridir, aylar ya da haftalar gibi. Eksen
// sifirdan max'a uzanir ve kesilmez, ticks eksende yazan degerlerdir. Her
// serinin son degeri ve adi cizginin ucunda yazar, ayrica bir renk
// aciklamasi aranmaz. En fazla uc seri, daha fazlasi okunmaz.
export interface LineBlock {
  type: 'line'
  label: Localized
  title: Localized
  reading: Localized
  unit: 'percent' | 'count'
  decimals: number
  max: number
  ticks: number[]
  points: Localized[]
  series: LineSeries[]
  blocks?: Block[]
}

// Bilesim cubugunun bir parcasi. style parcanin zeminidir: ink murekkep,
// light acik gri, gold altin, hatched taramali. Altin okurun gozunu tek bir
// parcaya cekmek icin bir kez kullanilir.
export interface CompositionPart {
  label: Localized
  style: 'ink' | 'light' | 'gold' | 'hatched'
}

// Bilesim cubugunun bir satiri. values parcalarin yuzdeleridir, parcalarla
// ayni sirada ve toplami yuz.
export interface CompositionRow {
  label: Localized
  values: number[]
}

// Bir butunun parcalara nasil bolundugunu gosteren yuzde yuzluk cubuklar.
// Her satir ayri bir butundur, satirlar alt alta kiyaslanir. Dar bir dilimin
// yuzdesi cubugun icine sigmazsa yazilmaz, kesin degerler altindaki acilir
// kutuda verilir. En fazla dort parca.
export interface CompositionBlock {
  type: 'composition'
  label: Localized
  title: Localized
  reading: Localized
  parts: CompositionPart[]
  rows: CompositionRow[]
  blocks?: Block[]
}

// Pasta seklinin bir dilimi. value dilimin yuzdesidir.
export interface PieSlice {
  label: Localized
  value: number
}

// Tek bir butunun az sayida parcaya bolunusu. Dilimler buyukten kucuge
// yazilir, en buyugu saat on ikiden baslar ve saat yonunde ilerler. Renkler
// siradan gelir: murekkep, altin, gri, acik gri, taramali. Yuzdeler hem
// dilimin ustunde hem yanindaki listede yazar, dar dilimde yalnizca listede.
// En fazla bes dilim, toplami yuz.
export interface PieBlock {
  type: 'pie'
  label: Localized
  title: Localized
  reading: Localized
  slices: PieSlice[]
  blocks?: Block[]
}

// Isi tablosunun bir satiri. values sutunlarla ayni sirada degerlerdir.
export interface HeatRow {
  label: Localized
  values: number[]
}

// Iki boyutlu bir sorunun cevabini tek bakista veren tablo, ornegin hangi
// kaynakta hangi alanin ne kadar dolu oldugu. Hucrenin zemini degerle
// koyulasir, deger hucrenin icinde yazar, renk tek basina bir sey anlatmaz.
// max zeminin en koyu oldugu degerdir, yuzdelerde genellikle 100.
export interface HeatBlock {
  type: 'heat'
  label: Localized
  title: Localized
  reading: Localized
  unit: 'percent' | 'count'
  decimals: number
  max: number
  columns: Localized[]
  rows: HeatRow[]
  blocks?: Block[]
}

// Degiskenlerin ikiser ikiser ne kadar birlikte hareket ettigini gosteren
// tablo. Yalnizca alt ucgen cizilir, ust yari ayni sayilari tekrar ederdi.
// values satir satir yazilir: ilk satir bos, ikinci satir bir deger, ucuncu
// satir iki deger tasir, her deger o satirin degiskeniyle soldaki
// degiskenlerden biri arasindaki katsayidir, -1 ile 1 arasinda. Arti yon
// murekkep, eksi yon altin koyulasir. Tablonun altinda katsayinin neden
// sonuc gostermedigini soyleyen not sitenin sozlugunden gelir.
export interface CorrelationBlock {
  type: 'correlation'
  label: Localized
  title: Localized
  reading: Localized
  variables: Localized[]
  values: number[][]
  blocks?: Block[]
}

// Karar tablosunun bir hucresi: kac kayit oldugu ve ne anlama geldigi, duz
// bir cumleyle, ornegin Kacirildi, ayri kaldi.
export interface MatrixCell {
  value: number
  text: Localized
}

// Bir modelin ya da kuralin kararlarini gercekle karsilastiran tablo. Satirlar
// gercekteki sinif, sutunlar verilen karar, ikisi de classes sirasinda.
// Kosegen dogru kararlardir, gerisi hatadir ve altin zeminle ayrilir, hucrenin
// ustundeki Dogru ya da Hata etiketi buradan kendiliginden cikar. Satir ve
// sutun toplamlari hesaplanir, elle yazilmaz. actual ve decided eksenlerin
// adlaridir. key tablonun altinda hata turlerini duz cumleyle anlatir.
export interface MatrixBlock {
  type: 'matrix'
  label: Localized
  title: Localized
  reading: Localized
  actual: Localized
  decided: Localized
  classes: Localized[]
  cells: MatrixCell[][]
  key?: ListItem[]
  blocks?: Block[]
}

// Tek kaydin bir alani. name alanin kendi adidir, kod oldugu icin iki dilde
// aynidir. before ve after alanin degeri, verinin parcasi sayilir ve verinin
// dilini izler. Deger yoksa yazilmaz, sayfada bos diye gorunur.
export interface RecordField {
  name: string
  before?: Localized
  after?: Localized
}

// Bir isin tek bir kayda ne yaptigini alan alan gosterir. before ve after
// iki sutunun basliklaridir, ornegin Kaynakta ve Normalizasyondan sonra,
// sitenin dilini izler. Degisen alanin yeni degerinin solunda altin bir
// cizgi durur, degismeyen alan soluk yazilir, ikisi de verinin kendisinden
// cikar. note tablonun altindaki kisa aciklamadir.
export interface RecordBlock {
  type: 'record'
  before: Localized
  after: Localized
  fields: RecordField[]
  note?: Localized
}

// Hesabin bir satiri. op satirin onundeki islemdir, ilk satirda yazilmaz.
// label satirin ne oldugu, detail altindaki kisa aciklama, value sonuc
// sutununda yazan deger, birimiyle ve sitenin diline gore yazilmis haliyle.
export interface CalcStep {
  op?: '+' | '−' | '×' | '÷' | '='
  label: Localized
  detail?: Localized
  value: Localized
}

// Bir sayinin nereden ciktigini satir satir gosteren hesap. Son satir
// sonuctur, = ile baslar ve degeri altin zeminde yazar. Hesap sayfadaki
// metinle ayni sayilari tasimalidir.
export interface CalcBlock {
  type: 'calc'
  label: Localized
  title: Localized
  reading?: Localized
  steps: CalcStep[]
}

// Kabul olcutlerinin bir satiri: olcut, isin basindaki hedef, teslimde
// olculen sonuc ve hedefin tutup tutmadigi.
export interface AcceptanceRow {
  criterion: Localized
  target: Localized
  result: Localized
  met: boolean
}

// Isin basinda musteriyle konusulan hedefler ve teslimde olculen sonuclar.
// Tutmayan bir hedef de yazilir, durumu Karsilanmadi diye altin zeminde
// gorunur. Sutun basliklari ve durum etiketleri sitenin sozlugunden gelir.
export interface AcceptanceBlock {
  type: 'acceptance'
  rows: AcceptanceRow[]
}

// Veritabani tablosunun bir sutunu. name ve type kod oldugu icin iki dilde
// aynidir. pk sutunun tablonun anahtari oldugunu, ref baska bir tablonun
// anahtarina baglandigini soyler, tablo.sutun biciminde, ornegin brand.id.
// nullable bos kalabildigini, note sutunun ne tuttugunu sitenin diliyle
// anlatir.
export interface DbColumn {
  name: string
  type: string
  pk?: true
  ref?: string
  nullable?: true
  note: Localized
}

// Veritabaninin bir tablosu. rows tablodaki kayit sayisidir. brief semanin
// ozet halinde anahtar ve bag sutunlarinin yaninda gorunen, tabloyu tanitan
// sutunlardir, genellikle bir tane. Kalan sutunlar ozette +N sutun olur.
export interface DbTable {
  name: string
  rows: number
  brief: string[]
  columns: DbColumn[]
}

// Bir calismanin veritabani. Calisma klasorunde schema.ts dosyasinda bir kez
// yazilir, sema ve veritabani tablosu parcalari onu ayni yerden okur. engine
// veritabaninin adidir, ornegin PostgreSQL. links her bag icin tek cumlelik
// anlatimdir, anahtari bag sutununun tablo.sutun adidir. Baglar sutunlarin
// ref alanlarindan cikar, burada yalnizca cumleleri yazilir.
export interface DbSchema {
  engine: string
  tables: DbTable[]
  links: Record<string, Localized>
}

// Veritabani semasi, iki gorunusle. plate teknik bir cizim levhasidir: cift
// cerceve, sag altta antet, tablolarda yalnizca anahtar, bag ve tanitan
// sutunlar, baglar kirik cizgiyle, her bagin ciktigi satirda bir numara ve
// levhanin altinda o numaranin cumlesi. center bir tabloyu ortada butun
// sutunlariyla buyuk bir kart olarak gosterir, otekiler etrafinda yalnizca
// anahtar ve bag sutunlariyla durur, baglar duz cizgiyle gider. main ortadaki
// tablodur, yalnizca center'da kullanilir.
//
// layout tablolarin yerlesimidir, her satiri bosluklarla ayrilmis tablo
// adlarindan olusur ve CSS grid-template-areas gibi okunur. Bir tablo birden
// cok hucre kaplayabilir, center'da ortadaki tablo iki satir boyunca yazilir.
// Cizgiler, seritler, numaralar ve kopruler yerlesimden kendiliginden cikar.
// plate'te bir bag yalnizca yan yana iki sutun arasinda ya da ayni sutunda
// cizilebilir, iki sutun atlayan bag icin yerlesim degistirilir.
export interface SchemaBlock {
  type: 'schema'
  view: 'plate' | 'center'
  schema: DbSchema
  layout: string[]
  main?: string
  label: Localized
  title: Localized
  reading: Localized
  blocks?: Block[]
}

// Veritabani tablosu, hesap tablosunun veritabanindaki karsiligi. columns
// tablonun sutun yapisini gosterir: sira, ad, tur, bos kalabilmesi, bag ve
// aciklama, hepsi semadan gelir. rows bir sorgunun sonucunu gosterir:
// satirlar calismanin data klasorundeki CSV'den gelir ve verinin dilini
// izler, CSV'nin ilk satiri tablonun sutun adlaridir ve sutunlarin turu
// semadan okunur. Bos hucre NULL olarak gorunur.
export type DbTableBlock =
  | { type: 'dbtable'; view: 'columns'; schema: DbSchema; table: string }
  | { type: 'dbtable'; view: 'rows'; schema: DbSchema; table: string; csv: string }

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
  | LineBlock
  | CompositionBlock
  | PieBlock
  | HeatBlock
  | CorrelationBlock
  | MatrixBlock
  | RecordBlock
  | CalcBlock
  | AcceptanceBlock
  | SchemaBlock
  | DbTableBlock
  | DecisionsBlock
  | TimelineBlock
  | TreeBlock
  | CompareBlock
  | NoteBlock
  | CodeBlock
  | OutputBlock
  | DataFileBlock

// Bir parcanin icine konan parcalar. Yalnizca acilir kutu ve sekiller baska
// parca tasir, digerleri bos liste verir. Yeni bir parca tipi icine parca
// tasiyacaksa karsiligi buraya yazilir, yazilmazsa derleme durur.
export function childBlocks(block: Block): Block[] {
  switch (block.type) {
    case 'details':
      return block.blocks
    case 'chart':
    case 'line':
    case 'composition':
    case 'pie':
    case 'heat':
    case 'correlation':
    case 'matrix':
    case 'schema':
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
    case 'record':
    case 'calc':
    case 'acceptance':
    case 'dbtable':
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
