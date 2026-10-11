/*
file: database.ts
importable: database

Veri sayfasindaki panonun ve /services/database sayfasinin metni.

description: Veritabani hizmetinin iki dilli icerigi.
*/

import type { Service } from './types'

export const database: Service = {
  summary: { tr: 'Verinin duracağı yapıyı kurar, kayıtları içine taşırız.', en: 'We build the structure your data lives in and move the records over.' },
  lede: { tr: 'Excel dosyalarına ya da dağınık sistemlere sığmayan veriniz için düzenli bir veritabanı kurar, eski kayıtları kayıpsız taşırız.', en: 'When your data outgrows spreadsheets and scattered systems, we build an orderly database and move the old records over without loss.' },
  kunye: {
    input: { tr: 'Mevcut dosyalar, eski sistemin dışa aktarımı', en: 'Your current files, an export of the old system' },
    output: { tr: 'Kurulu veritabanı, taşıma betikleri, şema belgesi', en: 'A running database, migration scripts, a schema document' },
    tools: 'PostgreSQL, SQLite, SQL Server, Python',
  },
  scope: {
    lede: { tr: 'Doğru kurulmuş bir veritabanı, verinin tek bir yerde, tutarlı ve aranabilir durması demektir.', en: 'A well built database keeps your data in one place, consistent and searchable.' },
    items: [
      { title: { tr: 'Şema tasarımı.', en: 'Schema design.' }, text: { tr: 'Tabloları, ilişkileri ve kuralları işinizin gerçek akışına göre çizeriz.', en: 'We lay out tables, relations and rules around how your work actually flows.' } },
      { title: { tr: 'Taşıma.', en: 'Migration.' }, text: { tr: 'Eski kayıtları yeni yapıya kayıpsız aktarır, aktarımı sayılarla doğrularız.', en: 'We move the old records into the new structure without loss and check the move with counts.' } },
      { title: { tr: 'Kurallar ve kısıtlar.', en: 'Rules and constraints.' }, text: { tr: 'Yanlış ya da eksik kaydın veritabanına girmesini baştan engelleriz.', en: 'We stop wrong or incomplete records from entering in the first place.' } },
      { title: { tr: 'Erişim ve yedek.', en: 'Access and backups.' }, text: { tr: 'Kimin neyi göreceğini ve verinin nasıl yedekleneceğini ayarlarız.', en: 'We set who can see what and how the data is backed up.' } },
    ],
  },
  steps: {
    lede: { tr: 'Önce verinin bugün nasıl kullanıldığını anlar, yapıyı buna göre kurarız.', en: 'We first learn how the data is used today and build the structure around it.' },
    items: [
      { title: { tr: 'Keşif', en: 'Discovery' }, text: { tr: 'Hangi verinin nerede durduğunu ve kimin kullandığını çıkarırız.', en: 'We map which data lives where and who uses it.' } },
      { title: { tr: 'Tasarım', en: 'Design' }, text: { tr: 'Şemayı çizer, sizinle örnek sorgular üzerinden sınarız.', en: 'We draw the schema and test it with you on sample queries.' } },
      { title: { tr: 'Taşıma', en: 'Migration' }, text: { tr: 'Kayıtları aktarır, eski ve yeni sayıları karşılaştırırız.', en: 'We move the records and compare old and new counts.' } },
      { title: { tr: 'Devir', en: 'Handover' }, text: { tr: 'Veritabanını, betikleri ve belgeyi kullanıma hazır teslim ederiz.', en: 'We hand over the database, scripts and documentation ready to use.' } },
    ],
  },
  delivery: {
    lede: { tr: 'Teslimden sonra veritabanını kendiniz yönetebilmeniz için her adım belgelenir.', en: 'Every step is documented so you can run the database yourself after handover.' },
    items: [
      { title: { tr: 'Kurulu veritabanı.', en: 'A running database.' }, text: { tr: 'Kayıtları taşınmış ve kullanıma hazır.', en: 'With the records moved in and ready to use.' } },
      { title: { tr: 'Taşıma betikleri.', en: 'Migration scripts.' }, text: { tr: 'Aktarımı tekrar çalıştırmak ya da genişletmek için.', en: 'To run or extend the migration again.' } },
      { title: { tr: 'Şema belgesi.', en: 'A schema document.' }, text: { tr: 'Her tablonun ne tuttuğunu ve tabloların nasıl bağlandığını anlatır.', en: 'It explains what each table holds and how the tables connect.' } },
    ],
  },
}
