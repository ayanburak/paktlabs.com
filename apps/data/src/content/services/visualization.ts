/*
file: visualization.ts
importable: visualization

/services/visualization sayfasinin metni. Ozet cumlesi veri sayfasindaki hizmetler
panosunda da gorunur.

description: Gorsellestirme hizmetinin iki dilli icerigi.
*/

import type { DataService } from './types'

export const visualization: DataService = {
  summary: { tr: 'Rakamları bir bakışta okunan grafiklere çeviririz.', en: 'We turn numbers into charts that read at a glance.' },
  lede: { tr: 'Veriyi, bakan herkesin aynı şeyi gördüğü şekillere ve panolara çevirir, rakamların anlattığını görünür kılarız.', en: 'We turn data into charts and dashboards where everyone who looks sees the same thing, so what the numbers say becomes visible.' },
  facts: {
    who: { tr: 'Veriyi ekibiyle, yöneticisiyle ya da müşterisiyle düzenli olarak paylaşan herkes', en: 'Anyone who regularly shares data with their team, management or customers' },
    when: { tr: 'Raporlar okunmadan geçildiğinde ya da aynı tabloları her dönem elle hazırladığınızda', en: 'When reports go unread, or when you build the same tables by hand every period' },
  },
  scope: [
    { title: { tr: 'Doğru şekil', en: 'The right chart' }, text: { tr: 'Her soruya okuyanı yanıltmayan ve ilk bakışta anlaşılan bir şekil seçeriz.', en: 'For every question we choose a chart that does not mislead and reads at first glance.' } },
    { title: { tr: 'Panolar', en: 'Dashboards' }, text: { tr: 'Takip edilmesi gereken göstergeleri tek bir ekranda, önem sırasıyla toplarız.', en: 'We gather the measures that need watching on one screen, in order of importance.' } },
    { title: { tr: 'Güncel kalma', en: 'Staying current' }, text: { tr: 'Veri değiştikçe şekillerin ve panoların kendiliğinden yenilenmesini sağlarız.', en: 'We make charts and dashboards refresh on their own as the data changes.' } },
    { title: { tr: 'Anlatı', en: 'Story' }, text: { tr: 'Tek tek şekilleri bir sonuca götüren, sırası düşünülmüş bir akışa dizeriz.', en: 'We order single charts into a considered flow that leads to a conclusion.' } },
  ],
  steps: [
    { title: { tr: 'Okur', en: 'Reader' }, text: { tr: 'Şekillere kimin, ne sıklıkla ve hangi kararı vermek için bakacağını belirleriz.', en: 'We set who will look at the charts, how often and to make which decision.' } },
    { title: { tr: 'Taslak', en: 'Sketch' }, text: { tr: 'Birkaç farklı çizimi kaba haliyle gösterir, en iyi okunanı birlikte seçeriz.', en: 'We show a few rough drawings and pick the clearest one together.' } },
    { title: { tr: 'Bağlantı', en: 'Connecting' }, text: { tr: 'Seçilen tasarımı gerçek veriye bağlar, rakamları kaynakla karşılaştırırız.', en: 'We connect the chosen design to real data and check the numbers against the source.' } },
    { title: { tr: 'Kullanım', en: 'Use' }, text: { tr: 'Panonun nasıl okunacağını ve nasıl güncelleneceğini anlatırız.', en: 'We explain how to read the dashboard and how to keep it up to date.' } },
  ],
  outcomes: {
    lead: { title: { tr: 'Okunan bir veri', en: 'Data that gets read' }, text: { tr: 'Toplantıda rakamları açıklamakla vakit geçirmez, doğrudan onlar üzerine konuşursunuz.', en: 'In meetings you stop explaining the numbers and start talking about them.' } },
    items: [
      { title: { tr: 'Şekiller ve panolar', en: 'Charts and dashboards' }, text: { tr: 'Gerçek veriye bağlı ve kendiliğinden güncel.', en: 'Connected to real data and current on their own.' } },
      { title: { tr: 'Okuma kılavuzu', en: 'Reading guide' }, text: { tr: 'Her göstergenin neyi ölçtüğünü anlatır.', en: 'It explains what each measure tracks.' } },
      { title: { tr: 'Ortak görünüm', en: 'A shared look' }, text: { tr: 'Renkler ve biçimler her yerde aynı anlamı taşır.', en: 'Colours and shapes mean the same thing everywhere.' } },
      { title: { tr: 'Genişletme', en: 'Extending' }, text: { tr: 'Yeni bir gösterge eklemenin yolu bellidir.', en: 'How to add a new measure is clear.' } },
    ],
  },
  art: { tr: 'Ada, duvara asılı büyük bir panoya son çubuğu yapıştırıyor.', en: 'Ada sticks the last bar onto a large chart on the wall.' },
}
