/*
file: types.ts
importable: DataService

Veri hizmetlerinin icerik tipi. Sayfanin metni brand'deki ortak Service
tipine uyar, Veri, Otomasyon ve Web hizmetleri ayni sablonu paylasir.
Buraya eklenen tek alan art, kapsam bolumundeki cizimin yer tutucusu.

description: Veri hizmetlerinin icerik tipini tanimlayan modul.
*/

import type { Service } from '@paktlabs/brand/content/service'
import type { Localized } from '@paktlabs/brand/i18n/language'

// art, Ada'nin cizimi gelene kadar kesikli kutunun icinde yazan tariftir.
// Cizim hazir oldugunda bu alan kalkar, rota kutunun yerine img verir.
export interface DataService extends Service {
  art: Localized
}
