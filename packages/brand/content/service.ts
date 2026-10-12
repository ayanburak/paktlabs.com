/*
file: service.ts
importable: Service, ServiceRow

Bir hizmet sayfasinin icerik tipi. Veri, Otomasyon ve Web disiplinlerinin
hizmetleri ayni sablonu ve bu tipi paylasir, her site kendi hizmetlerinin
metnini kendi klasorunde yazar.

    const preparation: Service = { summary, lede, facts, scope, steps, outcomes }

Bolum basliklari ve etiketler her hizmette ayni oldugu icin brand sozlugunde
service altinda durur, bu tip yalnizca hizmete ozel metni tasir.

description: Butun disiplinlerin hizmet sayfalarinin paylastigi icerik tipini tanimlayan modul.
*/

import type { Localized } from '../i18n/language'

// Kapsam, surec ve teslim bolumlerinin her satiri bir baslik ve bir
// cumleden olusur.
export interface ServiceRow {
  title: Localized
  text: Localized
}

// summary sitenin hizmetler panosundaki tek cumle, lede sayfanin
// kapagindaki aciklama. facts kapagin yanindaki kunye.
//
// outcomes'ta lead koyu buyuk kutu, items yanindaki dort kucuk kutu. Teslim
// izgarasi iki satir ve iki sutun oldugu icin items tam dort tane olmali,
// eksik ya da fazla yazilirsa derleme hata verir.
export interface Service {
  summary: Localized
  lede: Localized
  facts: {
    who: Localized
    when: Localized
  }
  scope: ServiceRow[]
  steps: ServiceRow[]
  outcomes: {
    lead: ServiceRow
    items: [ServiceRow, ServiceRow, ServiceRow, ServiceRow]
  }
}
