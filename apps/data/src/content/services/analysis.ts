/*
file: analysis.ts
importable: analysis

/services/analysis sayfasinin metni. Ozet cumlesi veri sayfasindaki hizmetler
panosunda da gorunur.

description: Analiz hizmetinin iki dilli icerigi.
*/

import type { DataService } from './types'

export const analysis: DataService = {
  summary: { tr: 'Sorunuzu veriye sorar, cevabı sınırlarıyla anlatırız.', en: 'We put your question to the data and report the answer with its limits.' },
  lede: { tr: 'İşinize dair bir soruyu veriye sorar, cevabı ne kadar güvenilir olduğuyla birlikte anlaşılır biçimde sunarız.', en: 'We put a question about your work to the data and present the answer clearly, together with how reliable it is.' },
  facts: {
    who: { tr: 'Elinde veri olan ama ondan bir karar çıkarmakta zorlanan ekipler', en: 'Teams that have data but struggle to turn it into a decision' },
    when: { tr: 'Bir karar öncesinde ya da bir değişikliğin etkisini görmek istediğinizde', en: 'Before a decision, or when you want to see the effect of a change' },
  },
  scope: [
    { title: { tr: 'Soruyu netleştirme', en: 'Sharpening the question' }, text: { tr: 'Genel bir merakı veriyle cevaplanabilecek açık bir soruya çeviririz.', en: 'We turn a general curiosity into a clear question the data can answer.' } },
    { title: { tr: 'Keşif', en: 'Exploration' }, text: { tr: 'Verideki örüntüleri, sıra dışı durumları ve eğilimleri ortaya çıkarırız.', en: 'We bring out patterns, unusual cases and trends in the data.' } },
    { title: { tr: 'Karşılaştırma', en: 'Comparison' }, text: { tr: 'Gruplar, dönemler ya da senaryolar arasındaki farkın gerçek olup olmadığını sınarız.', en: 'We test whether a difference between groups, periods or scenarios is real.' } },
    { title: { tr: 'Yorum', en: 'Interpretation' }, text: { tr: 'Bulguları iş diline çevirir, neyin kesin neyin tahmin olduğunu ayrı yazarız.', en: 'We translate findings into the language of the work and keep facts apart from estimates.' } },
  ],
  steps: [
    { title: { tr: 'Soru', en: 'Question' }, text: { tr: 'Neyi öğrenmek istediğinizi ve sonucun hangi kararı etkileyeceğini birlikte belirleriz.', en: 'Together we set what you want to learn and which decision the answer will shape.' } },
    { title: { tr: 'Veri seçimi', en: 'Choosing data' }, text: { tr: 'Soruyu cevaplamaya yetecek veriyi seçer, eksiklerini baştan söyleriz.', en: 'We choose data that is enough to answer the question and name its gaps up front.' } },
    { title: { tr: 'Çözümleme', en: 'Working it through' }, text: { tr: 'Sonuçları birden fazla yoldan sınar, tesadüfle gerçeği birbirinden ayırırız.', en: 'We test results in more than one way to tell chance apart from what is real.' } },
    { title: { tr: 'Sunum', en: 'Presenting' }, text: { tr: 'Bulguları sınırlarıyla birlikte herkesin okuyabileceği bir anlatıya dökeriz.', en: 'We turn the findings and their limits into a story anyone can read.' } },
  ],
  outcomes: {
    lead: { title: { tr: 'Dayanaklı bir cevap', en: 'An answer with grounds' }, text: { tr: 'Kararınızı neye dayandırdığınızı ve ne kadar emin olabileceğinizi bilirsiniz.', en: 'You know what your decision rests on and how sure you can be.' } },
    items: [
      { title: { tr: 'Bulgular', en: 'Findings' }, text: { tr: 'Ana sonuçlar ve onları destekleyen kanıtlar.', en: 'The main results and the evidence behind them.' } },
      { title: { tr: 'Sınırlar', en: 'Limits' }, text: { tr: 'Analizin neyi söyleyemeyeceği açıkça yazılır.', en: 'What the analysis cannot say is written plainly.' } },
      { title: { tr: 'Tekrarlanabilirlik', en: 'Repeatability' }, text: { tr: 'Aynı çalışma yeni veriyle yeniden yapılabilir.', en: 'The same work can be run again with new data.' } },
      { title: { tr: 'Yeni sorular', en: 'New questions' }, text: { tr: 'Bulguların açtığı sorular bir sonraki adım için listelenir.', en: 'Questions the findings raise are listed for the next step.' } },
    ],
  },
  art: { tr: 'Ada, tahtaya çizdiği bir eğrinin önünde durmuş, bir noktayı gösteriyor.', en: 'Ada stands in front of a curve on a board and points at one spot.' },
}
