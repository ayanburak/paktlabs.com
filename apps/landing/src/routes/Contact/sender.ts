/*
file: sender.ts
importable: Details, ContactMessage, MessageSender

Formun gonderdigi mesajin sekli ve mesaji bir yere ileten parcanin soyut
hali. Form mesajin nereye gittigini bilmez, yalnizca send'i cagirir. Bugunku
somut hal servise gonderen apiSender.ts, hangisinin kullanilacagi
contact.tsx'te secilir. Mesajin sekli servisteki
services/contact-api/app/schema.py ile ayni kalmali.

description: Iletisim mesajinin tipini ve mesaji ileten parcanin soyut arayuzunu tanimlayan modul.
*/

import type { Language } from '@paktlabs/brand/i18n/language'

import type { Answers } from './questions'

// Son ekranda ziyaretcinin yazdigi alanlar. company bos birakilabilir. website
// formda gorunmeyen tuzak alandir, insan ziyaretcide hep bostur, dolu gelirse
// servis mesaji sessizce birakir.
export interface Details {
  name: string
  email: string
  company: string
  message: string
  website: string
}

// Secmeli cevaplar kimlik olarak gider, ekrandaki metin olarak degil. Boylece
// mesaj sitenin diline bagli kalmaz.
export interface ContactMessage extends Details {
  answers: Answers
  language: Language
}

// send basarisiz olursa hata firlatir, form o zaman hata mesajini gosterir.
export interface MessageSender {
  send(message: ContactMessage): Promise<void>
}
