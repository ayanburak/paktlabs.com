/*
file: database.ts
importable: database

/services/database sayfasinin metni. Ozet cumlesi veri sayfasindaki hizmetler
panosunda da gorunur.

description: Veritabani hizmetinin iki dilli icerigi.
*/

import type { DataService } from './types'

export const database: DataService = {
  summary: { tr: 'Verinin duracağı yapıyı kurar, kayıtları içine taşırız.', en: 'We build the structure your data lives in and move the records over.' },
  lede: { tr: 'Verinin uzun süre güvenle duracağı yapıyı tasarlar, kurar ve veri büyüdükçe ayakta kalmasını sağlarız.', en: 'We design and build the structure where data can stay safely for years, and keep it standing as the data grows.' },
  facts: {
    who: { tr: 'Verisi büyüyen, aynı veriye birden fazla kişinin ya da uygulamanın eriştiği işler', en: 'Work where the data keeps growing and several people or applications reach the same data' },
    when: { tr: 'Yeni bir sistem kurulurken ya da var olan yapı yavaşlayıp karışmaya başladığında', en: 'When a new system is being set up, or when an existing one slows down and gets tangled' },
  },
  scope: [
    { title: { tr: 'Yapı tasarımı', en: 'Structure design' }, text: { tr: 'Hangi bilginin nerede ve nasıl duracağını işin gerçek kullanımına göre tasarlarız.', en: 'We design where and how each piece of information lives, based on how the work really uses it.' } },
    { title: { tr: 'Taşıma', en: 'Migration' }, text: { tr: 'Eski bir sistemdeki veriyi kayıpsız biçimde yeni yapıya aktarırız.', en: 'We move data from an old system into the new structure without losing anything.' } },
    { title: { tr: 'Hız', en: 'Speed' }, text: { tr: 'Yavaşlayan noktaları bulur, yapıyı kullanıma göre yeniden düzenleriz.', en: 'We find the places that slow down and rearrange the structure around real use.' } },
    { title: { tr: 'Erişim ve yedek', en: 'Access and backup' }, text: { tr: 'Kimin neyi görüp değiştirebileceğini kurala bağlar, yedekleme düzenini kurarız.', en: 'We set rules for who can see and change what, and put a backup routine in place.' } },
  ],
  steps: [
    { title: { tr: 'Kullanımı anlama', en: 'Understanding use' }, text: { tr: 'Verinin kimler tarafından, ne sıklıkla ve hangi amaçla kullanıldığını çıkarırız.', en: 'We find out who uses the data, how often and for what.' } },
    { title: { tr: 'Tasarım', en: 'Design' }, text: { tr: 'Yapıyı önce kâğıt üzerinde kurar, sizinle birlikte gözden geçiririz.', en: 'We first draw the structure on paper and review it with you.' } },
    { title: { tr: 'Kurulum ve aktarım', en: 'Build and transfer' }, text: { tr: 'Yapıyı kurar, var olan veriyi aktarır ve sonucu kaynakla karşılaştırırız.', en: 'We build it, move the existing data and compare the result with the source.' } },
    { title: { tr: 'Bakım düzeni', en: 'Upkeep routine' }, text: { tr: 'Yedekleme, izleme ve güncelleme adımlarını yazılı hale getiririz.', en: 'We put the backup, monitoring and update steps in writing.' } },
  ],
  outcomes: {
    lead: { title: { tr: 'Büyümeye hazır bir yapı', en: 'A structure ready to grow' }, text: { tr: 'Veri arttıkça ve yeni ihtiyaçlar geldikçe baştan kurulması gerekmeyen bir temel.', en: 'A base that does not need to be rebuilt as the data grows and new needs arrive.' } },
    items: [
      { title: { tr: 'Yapı belgesi', en: 'Structure document' }, text: { tr: 'Hangi bilginin nerede durduğunu ve nedenini anlatır.', en: 'It explains where each piece of information lives and why.' } },
      { title: { tr: 'Aktarılmış veri', en: 'Migrated data' }, text: { tr: 'Kaynakla karşılaştırılmış, eksiksiz kayıtlar.', en: 'Complete records, checked against the source.' } },
      { title: { tr: 'Yedekleme', en: 'Backups' }, text: { tr: 'Bir sorun anında verinin nasıl geri geleceği bellidir.', en: 'How data comes back after a problem is known in advance.' } },
      { title: { tr: 'Erişim kuralları', en: 'Access rules' }, text: { tr: 'Kimin hangi veriye ulaşabildiği tanımlıdır.', en: 'Who can reach which data is defined.' } },
    ],
  },
  art: { tr: 'Ada, raflara etiketli kutuları sırasıyla yerleştiriyor.', en: 'Ada places labelled boxes on shelves in order.' },
}
