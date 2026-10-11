/*
file: preparation.ts
importable: preparation

Veri sayfasindaki panonun ve /services/preparation sayfasinin metni.

description: Veri Hazirlama hizmetinin iki dilli icerigi.
*/

import type { Service } from './types'

export const preparation: Service = {
  summary: { tr: 'Dağınık kayıtları birleştirir, tek bir düzene getiririz.', en: 'We merge scattered records and bring them into one shape.' },
  lede: { tr: 'Farklı kaynaklardan gelen dağınık kayıtları birleştirir, temizler ve analiz ile raporlamaya hazır tek bir düzene getiririz.', en: 'We merge, clean and shape scattered records from different sources into one form that is ready for analysis and reporting.' },
  facts: {
    input: { tr: 'Excel dosyaları, dışa aktarımlar, veritabanı kayıtları', en: 'Excel files, exports, database records' },
    output: { tr: 'Temiz veri seti, dönüşüm kodu, kısa rapor', en: 'A clean data set, the transformation code, a short report' },
    tools: 'Python, pandas, SQL',
  },
  scope: {
    lede: { tr: 'Hazırlık, verinin işe yarar hale geldiği ilk adımdır. Sonraki her iş bu adımın sağlamlığına dayanır.', en: 'Preparation is the first step that makes data useful. Every later step depends on how solid it is.' },
    items: [
      { title: { tr: 'Birleştirme.', en: 'Merging.' }, text: { tr: 'Farklı sistemlerden gelen kayıtları ortak alanlarda eşleştiririz.', en: 'We match records from different systems on shared fields.' } },
      { title: { tr: 'Ayıklama.', en: 'Cleaning.' }, text: { tr: 'Tekrarlanan, eksik ve hatalı kayıtları bulur, hangisinin kalacağını kurala bağlarız.', en: 'We find duplicate, missing and broken records and set rules for which one stays.' } },
      { title: { tr: 'Biçim birliği.', en: 'One format.' }, text: { tr: 'Tarih, para birimi, ölçü birimi ve yazım farklarını tek biçime çeviririz.', en: 'We bring dates, currencies, units and spelling into a single format.' } },
      { title: { tr: 'Tekrar edilebilir hat.', en: 'A repeatable pipeline.' }, text: { tr: 'Aynı işi her yeni dosyada elle yapmamanız için adımları koda dökeriz.', en: 'We turn the steps into code so you do not redo the work by hand for every new file.' } },
    ],
  },
  steps: {
    lede: { tr: 'Önce verinize bakar, kuralları sizinle birlikte yazar, sonra hattı kurup ölçeriz.', en: 'We look at your data first, write the rules with you, then build and measure the pipeline.' },
    items: [
      { title: { tr: 'İnceleme', en: 'Review' }, text: { tr: 'Örnek dosyalardan kayıtların nerede ve nasıl bozulduğunu çıkarırız.', en: 'From sample files we find where and how the records break.' } },
      { title: { tr: 'Kurallar', en: 'Rules' }, text: { tr: 'Hangi kaydın nasıl düzeltileceğini sizinle birlikte yazıya dökeriz.', en: 'We write down with you how each kind of record gets fixed.' } },
      { title: { tr: 'Hat', en: 'Pipeline' }, text: { tr: 'Kuralları çalışan koda çevirir, sonucu örnek bir kesitte sınarız.', en: 'We turn the rules into working code and test the result on a sample.' } },
      { title: { tr: 'Teslim', en: 'Delivery' }, text: { tr: 'Temiz veriyi, kodu ve neyin neden değiştiğini anlatan raporu teslim ederiz.', en: 'We hand over the clean data, the code and a report of what changed and why.' } },
    ],
  },
  delivery: {
    lede: { tr: 'İş bittiğinde elinizde yalnızca temiz bir dosya değil, aynı işi tekrar yapacak bir yol olur.', en: 'When the work is done you have more than a clean file, you have a way to do it again.' },
    items: [
      { title: { tr: 'Temiz veri seti.', en: 'A clean data set.' }, text: { tr: 'Analize ve raporlamaya doğrudan girecek biçimde.', en: 'Ready to go straight into analysis and reporting.' } },
      { title: { tr: 'Dönüşüm kodu.', en: 'The transformation code.' }, text: { tr: 'Yeni dosyalar geldikçe aynı adımları çalıştırır.', en: 'It runs the same steps as new files arrive.' } },
      { title: { tr: 'Kısa rapor.', en: 'A short report.' }, text: { tr: 'Hangi kaydın neden değiştiğini ve kalan sınırları anlatır.', en: 'It explains which records changed, why, and what limits remain.' } },
    ],
  },
}
