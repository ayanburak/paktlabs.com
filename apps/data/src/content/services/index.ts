/*
file: index.ts
importable: services

Veri disiplininin hizmetleri. Hizmetlerin kimligi, sirasi ve ekrandaki adi
brand'deki dataTags.ts'ten ve brand sozlugunden gelir, her hizmetin kendi
metni bu klasordeki ayri dosyasindadir. Veri sayfasindaki pano ve hizmet
sayfalari metni buradan alir.

Yeni bir hizmet once brand'e kategori olarak eklenir, sonra bu klasore bir
icerik dosyasi yazilip asagidaki listeye baglanir. Record oldugu icin
dosyasi baglanmayan kategori derleme hatasi verir.

description: Veri hizmetlerinin iceriklerini kategori kimligine baglayan liste.
*/

import type { DataTag } from '@paktlabs/brand/content/dataTags'

import { analysis } from './analysis'
import { database } from './database'
import { machineLearning } from './machine-learning'
import { preparation } from './preparation'
import { quality } from './quality'
import type { Service } from './types'
import { visualization } from './visualization'

export const services: Record<DataTag, Service> = {
  preparation,
  database,
  quality,
  analysis,
  visualization,
  machineLearning,
}
