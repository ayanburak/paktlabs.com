/*
file: preparation.ts
importable: preparation

/services/preparation sayfasinin metni. Ozet cumlesi veri sayfasindaki hizmetler
panosunda da gorunur.

description: Veri Hazirlama hizmetinin iki dilli icerigi.
*/

import type { DataService } from './types'

export const preparation: DataService = {
  summary: { tr: 'Dağınık kayıtları birleştirir, tek bir düzene getiririz.', en: 'We merge scattered records and bring them into one shape.' },
  lede: { tr: 'Farklı yerlerden gelen veriyi bir araya getirir, düzenler ve üzerine her türlü işin kurulabileceği sağlam bir temel hazırlarız.', en: 'We bring data from different places together, put it in order and prepare a solid base that any later work can be built on.' },
  facts: {
    who: { tr: 'Verisi birden fazla yerde duran ve bunları birlikte kullanmak isteyen ekipler', en: 'Teams whose data lives in more than one place and who want to use it together' },
    when: { tr: 'Bir analize, rapora ya da yeni bir sisteme başlamadan önce', en: 'Before starting an analysis, a report or a new system' },
  },
  scope: [
    { title: { tr: 'Bir araya getirme', en: 'Bringing together' }, text: { tr: 'Farklı sistemlerde, dosyalarda ya da servislerde duran veriyi tek bir yerde toplarız.', en: 'We gather data that sits in different systems, files or services into one place.' } },
    { title: { tr: 'Ortak yapı', en: 'A shared structure' }, text: { tr: 'Aynı bilgiyi farklı biçimlerde tutan kaynakları tek bir düzende buluştururuz.', en: 'We bring sources that keep the same information in different shapes into one order.' } },
    { title: { tr: 'Ayıklama', en: 'Cleaning' }, text: { tr: 'Tekrar eden, eksik ya da çelişen kayıtları açık kurallarla ele alırız.', en: 'We handle repeated, missing or conflicting records with clear rules.' } },
    { title: { tr: 'Tekrarlanabilirlik', en: 'Repeatability' }, text: { tr: 'Yeni veri geldikçe aynı hazırlığın elle değil kendiliğinden yapılmasını sağlarız.', en: 'We make sure the same preparation runs on its own as new data arrives, not by hand.' } },
  ],
  steps: [
    { title: { tr: 'Tanıma', en: 'Getting to know' }, text: { tr: 'Verinin nereden geldiğini, nasıl üretildiğini ve nerede bozulduğunu birlikte inceleriz.', en: 'Together we look at where the data comes from, how it is produced and where it breaks.' } },
    { title: { tr: 'Kurallar', en: 'Rules' }, text: { tr: 'Neyin nasıl düzeltileceğini sizinle birlikte yazıya dökeriz.', en: 'We write down with you what gets fixed and how.' } },
    { title: { tr: 'Kurulum', en: 'Building' }, text: { tr: 'Kuralları çalışan bir akışa çevirir, sonucu gerçek veri üzerinde sınarız.', en: 'We turn the rules into a working flow and test the result on real data.' } },
    { title: { tr: 'Devir', en: 'Handover' }, text: { tr: 'Akışı, belgelerini ve açık kalan noktaları size teslim ederiz.', en: 'We hand over the flow, its documents and the points that remain open.' } },
  ],
  outcomes: {
    lead: { title: { tr: 'Güvenilir bir temel', en: 'A reliable base' }, text: { tr: 'Analiz, raporlama ya da yazılım, sonra hangi iş gelirse gelsin aynı düzenli kaynaktan beslenir.', en: 'Analysis, reporting or software, whatever comes next is fed from the same orderly source.' } },
    items: [
      { title: { tr: 'Çalışan akış', en: 'A working flow' }, text: { tr: 'Yeni veri geldikçe hazırlığı yeniden yapar.', en: 'It repeats the preparation as new data arrives.' } },
      { title: { tr: 'Yazılı kurallar', en: 'Written rules' }, text: { tr: 'Hangi kaydın neden değiştiği okunabilir kalır.', en: 'Which record changed and why stays readable.' } },
      { title: { tr: 'Belgeler', en: 'Documents' }, text: { tr: 'Akışın nasıl çalıştığını ve nasıl genişletileceğini anlatır.', en: 'They explain how the flow works and how to extend it.' } },
      { title: { tr: 'Açık noktalar', en: 'Open points' }, text: { tr: 'Karar bekleyen konular ayrıca listelenir.', en: 'Questions that still need a decision are listed separately.' } },
    ],
  },
  art: { tr: 'Ada, dağınık duran kâğıt yığınlarını tek bir düzgün desteye topluyor.', en: 'Ada gathers scattered piles of paper into one neat stack.' },
}
