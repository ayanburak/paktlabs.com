/*
file: types.ts
importable: Study, StudyText, SourceText, StudyTag, KunyeRow

Bir calisma iki katmandan olusur. Study dilden bagimsiz alanlari tasir:
adresteki slug, listedeki numara, yil ve filtrede kullanilan etiketler.
StudyText ise her dil icin ayri yazilan metinleri tasir. Iki dilin metni
ayni StudyText tipine uymak zorunda, bir dilde eksik kalan alan derleme
hatasi verir.

Kod ve veri sayfasi her calismada olmayabilir, firmanin paylasilmasina izin
vermedigi kod yayinlanmaz. Bu yuzden source alani istege baglidir. Varsa iki
dilde birden vardir, tek bir dilde yazilmis kod sayfasi derleme hatasi verir.

Tip, sayfalar yazildikca genisler. Su an yalnizca kapak ve listeleme icin
gereken alanlar var, bolum bloklari detay sayfasi yazilirken eklenecek.

description: data sitesindeki calismalarin icerik tiplerini tanimlayan modul.
*/

import type { Language } from '@paktlabs/brand/i18n/language'

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

export interface StudyText {
  title: string
  lede: string
  kunye: KunyeRow[]
}

// Kod sayfasinin kendi basligi, aciklamasi ve kunyesi var. Su an StudyText ile
// ayni alanlari tasiyor ama ayri bir tip, cunku bolumleri calisma sayfasinin
// bolumlerinden farkli olacak: dosya agaci, kod dosyalari ve veri ornekleri.
export interface SourceText {
  title: string
  lede: string
  kunye: KunyeRow[]
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
}
