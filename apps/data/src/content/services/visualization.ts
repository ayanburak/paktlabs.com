/*
file: visualization.ts
importable: visualization

Veri sayfasindaki panonun ve /services/visualization sayfasinin metni.

description: Gorsellestirme hizmetinin iki dilli icerigi.
*/

import type { Service } from './types'

export const visualization: Service = {
  summary: { tr: 'Rakamları bir bakışta okunan grafiklere çeviririz.', en: 'We turn numbers into charts that read at a glance.' },
  lede: { tr: 'Raporlardaki rakamları, kararı verecek kişinin bir bakışta okuyacağı grafiklere ve panolara çeviririz.', en: 'We turn the numbers in your reports into charts and dashboards that the person making the decision can read at a glance.' },
  kunye: {
    input: { tr: 'Raporlar, tablolar, kararı verecek kişilerin soruları', en: 'Reports, tables, the questions of the people who decide' },
    output: { tr: 'Grafikler, güncellenen pano, kısa kullanım notu', en: 'Charts, a dashboard that updates, a short guide' },
    tools: 'Python, Matplotlib, React, SQL',
  },
  scope: {
    lede: { tr: 'İyi bir grafik tek bir soruya cevap verir, okuyanın neye bakacağını aramasına gerek bırakmaz.', en: 'A good chart answers one question and does not leave the reader searching for what to look at.' },
    items: [
      { title: { tr: 'Soruya göre grafik.', en: 'Charts per question.' }, text: { tr: 'Her grafiği okuyacak kişinin sorusuna göre seçeriz.', en: 'We pick each chart for the question of the person who will read it.' } },
      { title: { tr: 'Pano.', en: 'Dashboard.' }, text: { tr: 'Sık bakılan rakamları kendiliğinden güncellenen tek bir yüzeyde toplarız.', en: 'We gather the numbers people check often on one surface that updates by itself.' } },
      { title: { tr: 'Rapor grafikleri.', en: 'Report charts.' }, text: { tr: 'Sunum ve rapor için baskıda da okunan grafikler hazırlarız.', en: 'We make charts for reports and slides that also read well in print.' } },
      { title: { tr: 'Sade tasarım.', en: 'Plain design.' }, text: { tr: 'Eksenleri kesmeden, süssüz ve yanıltmayan çizeriz.', en: 'We draw without cut axes, without decoration and without misleading.' } },
    ],
  },
  steps: {
    lede: { tr: 'Önce kimin neye bakacağını sorar, sonra çizeriz.', en: 'We first ask who will look at what, then we draw.' },
    items: [
      { title: { tr: 'Okurlar', en: 'Readers' }, text: { tr: 'Grafiklere kimin bakacağını ve hangi kararı vereceğini çıkarırız.', en: 'We find out who will read the charts and what they will decide.' } },
      { title: { tr: 'Taslak', en: 'Draft' }, text: { tr: 'İlk taslakları gerçek veriyle çizer, sizinle birlikte okuruz.', en: 'We draw first drafts with real data and read them with you.' } },
      { title: { tr: 'Pano', en: 'Dashboard' }, text: { tr: 'Kabul gören grafikleri veriye bağlar, güncellenir hale getiririz.', en: 'We connect the accepted charts to the data so they update.' } },
      { title: { tr: 'Devir', en: 'Handover' }, text: { tr: 'Panoyu ve grafiklerin nasıl okunacağını anlatan notu teslim ederiz.', en: 'We hand over the dashboard and a note on how to read it.' } },
    ],
  },
  delivery: {
    lede: { tr: 'Sonunda rakamlar tabloda kalmaz, karar verilen yerde okunur.', en: 'At the end the numbers do not stay in a table, they get read where decisions are made.' },
    items: [
      { title: { tr: 'Grafikler.', en: 'Charts.' }, text: { tr: 'Rapor ve sunumda kullanılacak, kaynağı belli grafikler.', en: 'Charts for reports and slides, each with a clear source.' } },
      { title: { tr: 'Güncellenen pano.', en: 'A dashboard that updates.' }, text: { tr: 'Yeni veri geldikçe kendiliğinden yenilenir.', en: 'It refreshes by itself as new data arrives.' } },
      { title: { tr: 'Kullanım notu.', en: 'A short guide.' }, text: { tr: 'Her grafiğin neyi gösterdiğini ve neyi göstermediğini anlatır.', en: 'It explains what each chart shows and what it does not.' } },
    ],
  },
}
