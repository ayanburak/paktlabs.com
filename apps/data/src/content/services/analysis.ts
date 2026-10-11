/*
file: analysis.ts
importable: analysis

Veri sayfasindaki panonun ve /services/analysis sayfasinin metni.

description: Analiz hizmetinin iki dilli icerigi.
*/

import type { Service } from './types'

export const analysis: Service = {
  summary: { tr: 'Sorunuzu veriye sorar, cevabı sınırlarıyla anlatırız.', en: 'We put your question to the data and report the answer with its limits.' },
  lede: { tr: 'İşinizle ilgili somut bir soruyu veriye sorar, cevabı sayılarla ve nerede yanılabileceğiyle birlikte anlatırız.', en: 'We put a concrete business question to your data and report the answer in numbers, together with where it might be wrong.' },
  kunye: {
    input: { tr: 'Bir soru, ilgili veri, alan bilgisi', en: 'A question, the related data, domain knowledge' },
    output: { tr: 'Analiz raporu, tekrar çalıştırılabilir defter', en: 'An analysis report, a notebook you can rerun' },
    tools: 'Python, pandas, SQL, Jupyter',
  },
  scope: {
    lede: { tr: 'İyi bir analiz önce doğru soruyla başlar, sonucu da o sorunun diliyle anlatır.', en: 'Good analysis starts with the right question and answers in that question\'s terms.' },
    items: [
      { title: { tr: 'Soruyu netleştirme.', en: 'Sharpening the question.' }, text: { tr: 'Merak ettiğiniz şeyi ölçülebilir bir soruya çeviririz.', en: 'We turn what you want to know into a measurable question.' } },
      { title: { tr: 'Keşif.', en: 'Exploration.' }, text: { tr: 'Verinin neyi söyleyip neyi söyleyemeyeceğini önceden gösteririz.', en: 'We show up front what the data can and cannot tell.' } },
      { title: { tr: 'Ölçüm ve karşılaştırma.', en: 'Measuring and comparing.' }, text: { tr: 'Farkları, eğilimleri ve ilişkileri belirsizlik payıyla ölçeriz.', en: 'We measure differences, trends and relations with their uncertainty.' } },
      { title: { tr: 'Sonuç ve sınırlar.', en: 'Answer and limits.' }, text: { tr: 'Cevabı ve hangi durumda yanlış olabileceğini birlikte yazarız.', en: 'We write the answer together with when it could be wrong.' } },
    ],
  },
  steps: {
    lede: { tr: 'Analiz boyunca ara sonuçları sizinle paylaşır, sorunun yönünü birlikte tutarız.', en: 'We share interim results as we go and keep the question on course together.' },
    items: [
      { title: { tr: 'Soru', en: 'Question' }, text: { tr: 'Sorunuzu ve kararınızı neyin değiştireceğini birlikte yazarız.', en: 'We write down your question and what would change your decision.' } },
      { title: { tr: 'Veri', en: 'Data' }, text: { tr: 'Gereken veriyi toplar, hazırlık gerekiyorsa önce onu yaparız.', en: 'We gather the data needed and prepare it first if it needs that.' } },
      { title: { tr: 'Analiz', en: 'Analysis' }, text: { tr: 'Ölçümleri yapar, ara sonuçları sizinle tartışırız.', en: 'We run the measurements and discuss interim results with you.' } },
      { title: { tr: 'Rapor', en: 'Report' }, text: { tr: 'Cevabı, kanıtını ve sınırlarını tek bir raporda toplarız.', en: 'We gather the answer, its evidence and its limits in one report.' } },
    ],
  },
  delivery: {
    lede: { tr: 'Rapor bir kez okunup biten bir belge değil, aynı soruyu yeni veriyle tekrar sormanın yoludur.', en: 'The report is not read once and filed, it is a way to ask the same question again with new data.' },
    items: [
      { title: { tr: 'Analiz raporu.', en: 'An analysis report.' }, text: { tr: 'Soru, cevap, kanıt ve sınırlar sade bir dille.', en: 'Question, answer, evidence and limits in plain words.' } },
      { title: { tr: 'Tekrar çalıştırılabilir defter.', en: 'A rerunnable notebook.' }, text: { tr: 'Aynı analizi yeni veriyle yeniden yapmak için.', en: 'To repeat the same analysis on new data.' } },
      { title: { tr: 'Ara sonuçlar.', en: 'Interim results.' }, text: { tr: 'Yol boyunca verdiğimiz kararların kaydı.', en: 'A record of the decisions made along the way.' } },
    ],
  },
}
