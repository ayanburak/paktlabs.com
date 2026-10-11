/*
file: types.ts
importable: Service

Bir hizmetin icerigi. Hizmet sayfasi her hizmette ayni uc bolumden olusur:
kapsam, surec ve teslim. Bolumlerin ve kunye satirlarinin adlari alti
sayfada ayni oldugu icin sitenin sozlugunde bir kez durur, bu dosya yalnizca
hizmete ozel metni tasir. Her metin iki dili yan yana tasir, bir dil eksik
kalirsa derleme hata verir.

description: Veri hizmetlerinin icerik tipini tanimlayan modul.
*/

import type { ListItem, Station } from '../studies/blocks'
import type { Localized } from '../studies/types'

// summary panodaki kagidin tek cumlesi, lede sayfanin kapagindaki
// aciklamadir. input okurun getirdigi, output teslim edilen, tools isin
// yapildigi araclardir. Arac adlari iki dilde ayni oldugu icin duz metin.
// Uc bolumun her biri bir giris cumlesi ve maddelerden olusur. steps
// calisma sayfalarindaki istasyon hattiyla cizilir.
export interface Service {
  summary: Localized
  lede: Localized
  kunye: {
    input: Localized
    output: Localized
    tools: string
  }
  scope: { lede: Localized; items: ListItem[] }
  steps: { lede: Localized; items: Station[] }
  delivery: { lede: Localized; items: ListItem[] }
}
