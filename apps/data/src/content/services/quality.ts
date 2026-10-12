/*
file: quality.ts
importable: quality

/services/quality sayfasinin metni. Ozet cumlesi veri sayfasindaki hizmetler
panosunda da gorunur.

description: Veri Kalitesi hizmetinin iki dilli icerigi.
*/

import type { DataService } from './types'

export const quality: DataService = {
  summary: { tr: 'Hataları ölçer, kaynağını bulur ve kurala bağlarız.', en: 'We measure errors, trace them to their source and turn them into rules.' },
  lede: { tr: 'Verinin ne kadar güvenilir olduğunu ölçer, hataların nereden geldiğini bulur ve tekrar etmemeleri için kalıcı kontroller kurarız.', en: 'We measure how reliable the data is, find where the errors come from and set up lasting checks so they do not return.' },
  facts: {
    who: { tr: 'Kararlarına, raporlarına ya da müşterilerine yanlış veri yansımasını göze alamayan ekipler', en: 'Teams that cannot afford wrong data reaching their decisions, reports or customers' },
    when: { tr: 'Rakamlar birbirini tutmadığında ya da bir veriye duyulan güven sarsıldığında', en: 'When the numbers do not add up, or when trust in a piece of data is shaken' },
  },
  scope: [
    { title: { tr: 'Ölçüm', en: 'Measuring' }, text: { tr: 'Eksik, tekrar eden, çelişen ve geçersiz kayıtların ne kadar olduğunu ortaya koyarız.', en: 'We show how many records are missing, repeated, conflicting or invalid.' } },
    { title: { tr: 'Kaynağı bulma', en: 'Finding the source' }, text: { tr: 'Hatanın verinin hangi aşamasında ortaya çıktığını geriye doğru izleriz.', en: 'We trace back to the stage where each error first appears.' } },
    { title: { tr: 'Kurallar', en: 'Rules' }, text: { tr: 'Bir kaydın doğru sayılması için gereken koşulları sizinle birlikte tanımlarız.', en: 'Together we define what a record needs to count as correct.' } },
    { title: { tr: 'Sürekli kontrol', en: 'Ongoing checks' }, text: { tr: 'Yeni gelen verinin bu kurallardan kendiliğinden geçmesini sağlarız.', en: 'We make new data pass through these rules on its own.' } },
  ],
  steps: [
    { title: { tr: 'Tespit', en: 'Assessment' }, text: { tr: 'Verinin bugünkü durumunu ölçer, sorunları büyüklüğüne göre sıralarız.', en: 'We measure where the data stands today and rank the problems by size.' } },
    { title: { tr: 'Kök neden', en: 'Root cause' }, text: { tr: 'Her sorunun nereden geldiğini bulur, belirtiyi değil kaynağı ele alırız.', en: 'We find where each problem comes from and fix the source, not the symptom.' } },
    { title: { tr: 'Düzeltme', en: 'Correction' }, text: { tr: 'Geçmiş kayıtları düzeltir, aynı hatayı üreten adımı değiştiririz.', en: 'We correct past records and change the step that produced the error.' } },
    { title: { tr: 'Takip', en: 'Follow-up' }, text: { tr: 'Kontrolleri çalışır halde bırakır, kalitenin zamanla nasıl değiştiğini görünür kılarız.', en: 'We leave the checks running and make changes in quality visible over time.' } },
  ],
  outcomes: {
    lead: { title: { tr: 'Güvenilen bir veri', en: 'Data people trust' }, text: { tr: 'Üzerinde karar verilen rakamların nereden geldiği ve ne kadar doğru olduğu bilinir.', en: 'Everyone knows where the numbers behind a decision come from and how accurate they are.' } },
    items: [
      { title: { tr: 'Kalite raporu', en: 'Quality report' }, text: { tr: 'Bugünkü durumu ve giderilen sorunları anlatır.', en: 'It describes the current state and the problems solved.' } },
      { title: { tr: 'Ortak tanım', en: 'Shared definition' }, text: { tr: 'Doğru verinin ne olduğu herkes için aynıdır.', en: 'What counts as correct data is the same for everyone.' } },
      { title: { tr: 'Kendiliğinden kontrol', en: 'Automatic checks' }, text: { tr: 'Sorunlu veri içeri girmeden yakalanır.', en: 'Faulty data is caught before it gets in.' } },
      { title: { tr: 'Uyarılar', en: 'Alerts' }, text: { tr: 'Bir sorun çıktığında ilgili kişiye haber gider.', en: 'The right person hears about a problem when it appears.' } },
    ],
  },
  art: { tr: 'Ada, büyüteçle bir kayıt listesini satır satır inceliyor.', en: 'Ada checks a list of records line by line with a magnifying glass.' },
}
