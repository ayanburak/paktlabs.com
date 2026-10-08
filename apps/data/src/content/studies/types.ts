/*
file: types.ts
importable: Localized, Study, StudyListing, PlaceholderStudy, StudyPage, CodeLocation, StudyCard, SourcePage, StudyFeature, StudyTag, KunyeRow

Bir calisma iki kattan olusur. StudyListing veri sayfasindaki listede gorunen
kisimdir: adresteki slug, numara, yil, etiketler, baslik ve kart metni. Study
bunun ustune detay sayfasini, verinin orijinal dilini ve kodun yerini ekler.
Yer tutucular yalnizca liste katindan olusur, bu yuzden detay sayfasi
olmayan bir gercek calisma derlenmez, yer tutucu da bos alan doldurmak
zorunda kalmaz.

Her metin Localized ile iki dili yan yana tasir. Bir dilde eksik kalan metin
derleme hatasi verir.

Kod ya GitHub'daki bir depodadir ya da sitedeki kod ve veri sayfasindadir,
CodeLocation ikisinden birini zorunlu tutar. Firma koda izin verdiyse kart
yalnizca depoya baglanir ve sitede ayrica kod sayfasi olmaz.

Veri sayfasindaki listede bir calisma ya normal bir kart ya da tam satir
tutan one cikan kart olarak gorunur. One cikan kartin teknik detaylari ve
araclari feature alaninda durur.

Tip, sayfalar yazildikca genisler. Bolumler ve parcalar detay sayfasi
yazilirken her parcanin bileseniyle birlikte eklenecek.

description: data sitesindeki calismalarin icerik tiplerini tanimlayan modul.
*/

import type { Language } from '@paktlabs/brand/i18n/language'

import type { TechName } from '../techNames'
import type { studyTags } from './tags'

// Bir icerigin her dildeki hali. Calisma dosyalarinda her metin iki dili yan
// yana yazilir, boylece bir paragrafin cevirisi ondan ayri bir dosyada
// unutulamaz. Bir dil eksik kalirsa derleme hata verir. Varsayilan tip duz
// metin, ama paragraf listesi gibi baska bir sey de verilebilir.
export type Localized<T = string> = Record<Language, T>

// Filtrede ve kartlarda gorunen etiketlerin kimlikleri. Liste ve sira
// tags.ts'te, tip oradan turetilir ki filtre ile tip birbirinden ayrilamasin.
// Ekranda gorunen adlari sozlukte durur.
export type StudyTag = (typeof studyTags)[number]

// Kunye satirlari calismadan calismaya ve sayfadan sayfaya degisir. Detay
// sayfasi sektor, sure, girdi ve teslimi, kod sayfasi dil ve kutuphaneleri
// gosterir. Bu yuzden sabit alanlar yerine etiket ve deger ciftleri tutuluyor.
export interface KunyeRow {
  label: Localized
  value: Localized
}

// Listedeki kartin metni: kalin yazilan bir giris cumlesi ve altinda birkac
// kisa paragraf. Detay sayfasinin tek cumlelik lede'inden ayri tutulur, cunku
// kart sayfaya hic girmemis okura isi anlatir. Her paragraf iki dili kendi
// icinde tasir, dil basina ayri bir paragraf listesi tutulmaz.
export interface StudyCard {
  lead: Localized
  body: Localized[]
}

// Detay sayfasinin icerigi, calismanin page.ts dosyasi bu tipe uyar. lede
// kapaktaki tek cumlelik aciklamadir, sekmenin aciklamasi da ondan gelir.
// summary kapagin altindaki Sorun, Yaklasim ve Sonuc bandidir, sayfayi
// yalnizca kaydirip gecen okur isi bu uc paragraftan anlar. Bolumler bolum
// cercevesiyle birlikte eklenecek.
export interface StudyPage {
  lede: Localized
  kunye: KunyeRow[]
  summary: {
    problem: Localized
    approach: Localized
    result: Localized
  }
}

// Kod sayfasinin icerigi, calismanin source.ts dosyasi bu tipe uyar. Kendi
// basligi, aciklamasi ve kunyesi var. StudyPage'den ayri bir tip, cunku
// bolumleri detay sayfasinin bolumlerinden farkli olacak: dosya agaci, kod
// dosyalari ve veri ornekleri. Bolumler Faz 5'te eklenecek.
export interface SourcePage {
  title: Localized
  lede: Localized
  kunye: KunyeRow[]
}

// One cikan kartin sag kutusu. Araclar urun adlari oldugu icin iki dilde
// ayni kalir, tek bir listede durur.
export interface StudyFeature {
  facts: KunyeRow[]
  tools: TechName[]
}

// Kodun yeri. kind alani hangisi oldugunu soyler, depo adresi ile kod sayfasi
// ayni anda yazilamaz.
export type CodeLocation = { kind: 'repo'; url: string } | { kind: 'page'; page: SourcePage }

// Gercek calismanin da yer tutucunun da listede gosterdigi kisim. Baslik
// kartta, detay sayfasinda ve sekme basliginda ayni oldugu icin sayfanin
// dosyasinda degil burada durur.
export interface StudyListing {
  slug: string
  number: string
  year: number
  tags: StudyTag[]
  title: Localized
  card: StudyCard
  feature?: StudyFeature
}

// dataLanguage verinin orijinal dilidir. Sayfa acildiginda hesap tablolari
// sitenin dilinde gosterilir, bu dil ondan farkliysa kunyenin altinda
// orijinal veriye gecis notu cikar.
export interface Study extends StudyListing {
  dataLanguage: Language
  code: CodeLocation
  page: StudyPage
}

// Mockup'taki lorem kartlari canliya tasimak icin var. Detay ve kod sayfalari
// yoktur, adresleri bulunamadi sayfasina duser. Gercek calismalar geldikce
// placeholders.ts'ten silinirler.
export interface PlaceholderStudy extends StudyListing {
  placeholder: true
}
