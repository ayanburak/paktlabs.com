/*
file: types.ts
importable: Study, StudyText, StudyTag, KunyeRow

Bir calisma iki katmandan olusur. Study dilden bagimsiz alanlari tasir:
adresteki slug, listedeki numara, yil ve filtrede kullanilan etiketler.
StudyText ise her dil icin ayri yazilan metinleri tasir. Iki dilin metni
ayni StudyText tipine uymak zorunda, bir dilde eksik kalan alan derleme
hatasi verir.

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

export interface Study {
  slug: string
  number: string
  year: number
  tags: StudyTag[]
  text: Record<Language, StudyText>
}
