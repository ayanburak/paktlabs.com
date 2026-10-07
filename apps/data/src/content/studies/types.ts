/*
file: types.ts
importable: Study, StudyText, StudyCard, SourceText, StudyFeature, StudyTag, KunyeRow

Bir calisma iki katmandan olusur. Study dilden bagimsiz alanlari tasir:
adresteki slug, listedeki numara, yil ve filtrede kullanilan etiketler.
StudyText ise her dil icin ayri yazilan metinleri tasir. Iki dilin metni
ayni StudyText tipine uymak zorunda, bir dilde eksik kalan alan derleme
hatasi verir.

Kod ve veri sayfasi her calismada olmayabilir, firmanin paylasilmasina izin
vermedigi kod yayinlanmaz. Bu yuzden source alani istege baglidir. Varsa iki
dilde birden vardir, tek bir dilde yazilmis kod sayfasi derleme hatasi verir.

Veri sayfasindaki listede bir calisma ya normal bir kart ya da tam satir
tutan one cikan kart olarak gorunur. One cikan kartin teknik detaylari ve
araclari feature alaninda durur, varsa iki dilde birden yazilir.

placeholder isaretli calismalar yalnizca listede gorunen yer tutuculardir.
Mockup'taki lorem kartlari canliya tasimak icin var, detay ve kod sayfalari
bulunamadi sayfasina duser. Gercek calismalar geldikce placeholders.ts'ten
silinirler.

Tip, sayfalar yazildikca genisler. Bolum bloklari detay sayfasi yazilirken
eklenecek.

description: data sitesindeki calismalarin icerik tiplerini tanimlayan modul.
*/

import type { Language } from '@paktlabs/brand/i18n/language'

import type { TechName } from '../techNames'

// Filtrede ve kartlarda gorunen etiketlerin kimlikleri. Ekranda gorunen adlari
// sozlukte durur, burada yalnizca dilden bagimsiz anahtarlar var.
export type StudyTag = 'preparation' | 'database' | 'quality' | 'analysis' | 'visualization' | 'machineLearning'

// Kunye satirlari calismadan calismaya ve sayfadan sayfaya degisir. Detay
// sayfasi sektor, sure, girdi ve teslimi, kod sayfasi dil ve kutuphaneleri
// gosterir. Bu yuzden sabit alanlar yerine etiket ve deger ciftleri tutuluyor.
export interface KunyeRow {
  label: string
  value: string
}

// Listedeki kartin metni: kalin yazilan bir giris cumlesi ve altinda birkac
// kisa paragraf. Detay sayfasinin tek cumlelik lede'inden ayri tutulur, cunku
// kart sayfaya hic girmemis okura isi anlatir.
export interface StudyCard {
  lead: string
  body: string[]
}

export interface StudyText {
  title: string
  lede: string
  kunye: KunyeRow[]
  card: StudyCard
}

// Kod sayfasinin kendi basligi, aciklamasi ve kunyesi var. Su an StudyText ile
// ayni alanlari tasiyor ama ayri bir tip, cunku bolumleri calisma sayfasinin
// bolumlerinden farkli olacak: dosya agaci, kod dosyalari ve veri ornekleri.
export interface SourceText {
  title: string
  lede: string
  kunye: KunyeRow[]
}

// One cikan kartin sag kutusu. Teknik detaylar dile bagli oldugu icin iki
// dilde ayri, araclar ise urun adlari oldugu icin tek bir listede durur.
export interface StudyFeature {
  facts: Record<Language, KunyeRow[]>
  tools: TechName[]
}

// source dil basina degil calisma basina tanimli. Alan her dilin StudyText'i
// icinde istege bagli olsaydi TypeScript tr'de olup en'de olmayan bir kod
// sayfasini yakalayamazdi.
export interface Study {
  slug: string
  number: string
  year: number
  tags: StudyTag[]
  text: Record<Language, StudyText>
  source?: Record<Language, SourceText>
  feature?: StudyFeature
  placeholder?: true
}
