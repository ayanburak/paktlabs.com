/*
file: machine-learning.ts
importable: machineLearning

/services/machine-learning sayfasinin metni. Ozet cumlesi veri sayfasindaki hizmetler
panosunda da gorunur.

description: Makine Ogrenmesi hizmetinin iki dilli icerigi.
*/

import type { DataService } from './types'

export const machineLearning: DataService = {
  summary: { tr: 'Elle verilen kararları öğrenen ve ölçülen modeller kurarız.', en: 'We build models that learn decisions made by hand, and measure them.' },
  lede: { tr: 'Tekrar tekrar verilen kararları geçmiş örneklerden öğrenen modeller kurar, ne kadar doğru çalıştıklarını ölçer ve işinizin içine yerleştiririz.', en: 'We build models that learn repeated decisions from past examples, measure how well they work and place them inside your work.' },
  facts: {
    who: { tr: 'Benzer kararları her gün yeniden veren ya da ileriyi tahmin etmesi gereken ekipler', en: 'Teams that make similar decisions every day, or that need to look ahead' },
    when: { tr: 'Bir kararın kuralı elle yazılamayacak kadar karmaşıklaştığında ve geçmiş örnekler biriktiğinde', en: 'When a decision is too complex to write down as rules and past examples have piled up' },
  },
  scope: [
    { title: { tr: 'Uygunluk', en: 'Fit' }, text: { tr: 'Önce işin gerçekten bir modele ihtiyacı olup olmadığına ve verinin buna yetip yetmediğine bakarız.', en: 'First we check whether the work really needs a model and whether the data is enough for one.' } },
    { title: { tr: 'Model kurma', en: 'Building the model' }, text: { tr: 'Tahmin, sınıflandırma ya da eşleştirme gibi işler için modeli eğitir ve ayarlarız.', en: 'We train and tune models for work such as forecasting, sorting or matching.' } },
    { title: { tr: 'Ölçüm', en: 'Measuring' }, text: { tr: 'Modelin nerede doğru, nerede yanlış karar verdiğini gerçek örneklerle gösteririz.', en: 'We show with real examples where the model decides right and where it goes wrong.' } },
    { title: { tr: 'İşe yerleştirme', en: 'Putting it to work' }, text: { tr: 'Modeli mevcut düzeninize bağlar, emin olamadığı kararları insana bırakırız.', en: 'We connect the model to how you already work and leave the uncertain calls to people.' } },
  ],
  steps: [
    { title: { tr: 'Karar', en: 'Decision' }, text: { tr: 'Modelin hangi kararı vereceğini ve başarının nasıl ölçüleceğini birlikte tanımlarız.', en: 'Together we define which decision the model makes and how success is measured.' } },
    { title: { tr: 'Hazırlık', en: 'Preparation' }, text: { tr: 'Geçmiş örnekleri toplar, öğrenmeye uygun hale getiririz.', en: 'We collect past examples and make them ready for learning.' } },
    { title: { tr: 'Eğitim ve sınama', en: 'Training and testing' }, text: { tr: 'Modeli eğitir, hiç görmediği örneklerle sınar, hatalarını tek tek inceleriz.', en: 'We train the model, test it on examples it has never seen and study its mistakes one by one.' } },
    { title: { tr: 'Yayın ve izleme', en: 'Release and watch' }, text: { tr: 'Modeli kullanıma alır, zamanla bozulup bozulmadığını izleriz.', en: 'We put the model into use and watch whether it degrades over time.' } },
  ],
  outcomes: {
    lead: { title: { tr: 'Ölçülmüş bir model', en: 'A measured model' }, text: { tr: 'Ne kadar doğru çalıştığı, nerede yanıldığı ve ne zaman insana danışması gerektiği bilinir.', en: 'How well it works, where it errs and when it should ask a person are all known.' } },
    items: [
      { title: { tr: 'Çalışan model', en: 'A working model' }, text: { tr: 'İşinize bağlı, kararlarını kendiliğinden verir.', en: 'Connected to your work, it makes its calls on its own.' } },
      { title: { tr: 'Ölçüm raporu', en: 'Measurement report' }, text: { tr: 'Başarıyı ve hataları gerçek örneklerle anlatır.', en: 'It shows success and errors with real examples.' } },
      { title: { tr: 'İzleme', en: 'Monitoring' }, text: { tr: 'Başarı düştüğünde haber verir.', en: 'It tells you when performance drops.' } },
      { title: { tr: 'Yenileme', en: 'Refreshing' }, text: { tr: 'Modelin yeni veriyle nasıl güncelleneceği bellidir.', en: 'How to update the model with new data is clear.' } },
    ],
  },
  art: { tr: 'Ada, küçük robot Bit’e bir kart destesini tek tek gösteriyor.', en: 'Ada shows a deck of cards to the little robot Bit one by one.' },
}
