/*
file: index.ts
importable: hartwellFinch

Hartwell & Finch calismasinin tanim dosyasi. Listede gorunen bilgileri, one
cikan kartin ayrintilarini, verinin orijinal dilini ve kodun yerini tasir.
Detay sayfasini ve kod sayfasini kendi dosyalarindan yalnizca sayfa
acilirken yukler, metinleri ana pakete girmez.

description: Hartwell & Finch calismasini veri sayfasindaki listeye ve detay sayfasina veren modul.
*/

// NOTE: Firma calismanin firma adiyla yayinlanmasina ve birkac dosyanin
// maskelenmeden paylasilmasina izin verdi, butun kodun ve verinin degil.
// Calisanlar sayfada ve kodda yalnizca rolleriyle anilir, ozel musteri
// adlari kesitlerde Ozel musteri olarak yazilir.

import { works } from '@paktlabs/brand/content/works'

import type { Study } from '../types'

// Ad, slug ve yazar brand'deki calisma listesinden gelir. 00 numarasi one
// cikan calismaya ayrildigi icin bu kart listenin en ustunde durur.
export const hartwellFinch: Study = {
  ...works.hartwellFinch,
  number: '00',
  year: 2026,
  tags: ['preparation', 'database', 'quality', 'analysis', 'visualization'],
  card: {
    lead: {
      tr: "Ciro %41 arttı, kâr artmadı. Bir yıl sonra yapılan bu geriye dönük incelemede iki ERP'den, pazar yerlerinden ve taşıyıcı faturalarından gelen 1.425 ham dosya tek bir veritabanında birleştirildi ve kârın nereye gittiği bulundu.",
      en: 'Turnover grew 41%, profit did not. In this look back a year later, 1,425 raw files from two ERPs, the marketplaces and the carrier invoices were brought into a single database and the place the profit went was found.',
    },
    body: [
      {
        tr: 'Pazar yeri satışları sipariş bazında yeniden kuruldu, her taşıma, gümrük ve iade maliyeti bir siparişe ya da müşteriye bağlandı. Bütün tablolar şirketin yönetim hesaplarına kapanıyor.',
        en: 'Marketplace sales were rebuilt order by order and every freight, customs and returns cost was linked to an order or a customer. Every table closes to the company’s management accounts.',
      },
      {
        tr: "Kasım 2023 ile Mayıs 2024 arasında alınan beş yönetim kararı, Mart 2025'te kapanan yılda şirkete yaklaşık 2,1 milyon sterline mal olmuştu. Bu tutar o yılın kârından büyüktü.",
        en: 'Five management decisions taken between November 2023 and May 2024 had cost the company about 2.1 million pounds in the year to March 2025. That was more than the profit of that year.',
      },
    ],
  },
  feature: {
    facts: [
      { label: { tr: 'Sektör', en: 'Sector' }, value: { tr: 'Mobilya üretimi', en: 'Furniture manufacturing' } },
      { label: { tr: 'Girdi', en: 'Input' }, value: { tr: '11 klasörde 1.425 ham dosya', en: '1,425 raw files in 11 folders' } },
      { label: { tr: 'Dönem', en: 'Period' }, value: { tr: 'Ocak 2021 – Haziran 2025', en: 'January 2021 – June 2025' } },
      {
        label: { tr: 'Teslim', en: 'Delivered' },
        value: { tr: 'Veritabanı, kâr analizi, rapor, aylık göstergeler', en: 'Database, profit analysis, report, monthly indicators' },
      },
    ],
    tools: ['Python', 'Pandas', 'SQLite', 'SQL Server', 'Excel'],
  },
  dataLanguage: 'en',
  code: { kind: 'page', page: () => import('./source').then((module) => module.source) },
  page: () => import('./page').then((module) => module.page),
}
