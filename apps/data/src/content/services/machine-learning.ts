/*
file: machine-learning.ts
importable: machineLearning

Veri sayfasindaki panonun ve /services/machine-learning sayfasinin metni.

description: Makine Ogrenmesi hizmetinin iki dilli icerigi.
*/

import type { Service } from './types'

export const machineLearning: Service = {
  summary: { tr: 'Elle verilen kararları öğrenen ve ölçülen modeller kurarız.', en: 'We build models that learn decisions made by hand, and measure them.' },
  lede: { tr: 'Her gün elle verilen bir kararı geçmiş örneklerden öğrenen bir model kurar, ne kadar doğru çalıştığını ölçer ve işin içine yerleştiririz.', en: 'We build a model that learns a decision made by hand every day from past examples, measure how well it works and fit it into your workflow.' },
  facts: {
    input: { tr: 'Geçmiş kararlar ve örnekler, karar kuralları', en: 'Past decisions and examples, decision rules' },
    output: { tr: 'Eğitilmiş model, değerlendirme raporu, kullanım kodu', en: 'A trained model, an evaluation report, the code to run it' },
    tools: 'Python, scikit-learn, pandas',
  },
  scope: {
    lede: { tr: 'Model, elle verilen kararın yerini alacaksa ne kadar doğru olduğu baştan ölçülebilmelidir.', en: 'If a model is to take over a decision made by hand, how often it is right must be measurable from the start.' },
    items: [
      { title: { tr: 'Uygunluk.', en: 'Fit.' }, text: { tr: 'Kararın modele bırakılabilir olup olmadığını önce veriyle sınarız.', en: 'We first test with data whether the decision can be left to a model at all.' } },
      { title: { tr: 'Model.', en: 'Model.' }, text: { tr: 'Geçmiş örneklerden öğrenen, açıklanabilir modeller kurarız.', en: 'We build explainable models that learn from past examples.' } },
      { title: { tr: 'Ölçüm.', en: 'Measurement.' }, text: { tr: 'Modelin ne zaman haklı ne zaman yanlış olduğunu ayrı bir test setinde ölçeriz.', en: 'We measure on a held out set when the model is right and when it is wrong.' } },
      { title: { tr: 'İnsanla birlikte.', en: 'With people.' }, text: { tr: 'Modelin emin olmadığı durumları kişiye bırakan bir akış kurarız.', en: 'We build a flow that leaves the cases the model is unsure about to a person.' } },
    ],
  },
  steps: {
    lede: { tr: 'Önce kararın kendisini anlar, modeli ancak ölçebileceğimiz bir hedefle kurarız.', en: 'We first understand the decision itself and only build a model against a target we can measure.' },
    items: [
      { title: { tr: 'Karar', en: 'Decision' }, text: { tr: 'Elle verilen kararı, girdilerini ve doğru sonucun ne olduğunu çıkarırız.', en: 'We map the decision made by hand, its inputs and what a right answer is.' } },
      { title: { tr: 'Veri', en: 'Data' }, text: { tr: 'Geçmiş kararları öğrenmeye uygun bir veri setine çeviririz.', en: 'We turn past decisions into a data set fit for learning.' } },
      { title: { tr: 'Model', en: 'Model' }, text: { tr: 'Modelleri eğitir, ayrı bir test setinde karşılaştırırız.', en: 'We train models and compare them on a separate test set.' } },
      { title: { tr: 'Devreye alma', en: 'Rollout' }, text: { tr: 'Seçilen modeli işin akışına yerleştirir, sonuçlarını izleriz.', en: 'We fit the chosen model into the workflow and watch its results.' } },
    ],
  },
  delivery: {
    lede: { tr: 'Model teslim edildiğinde ne kadar güvenilebileceği de onunla birlikte teslim edilir.', en: 'When the model is delivered, how far it can be trusted is delivered with it.' },
    items: [
      { title: { tr: 'Eğitilmiş model.', en: 'A trained model.' }, text: { tr: 'İşin akışında çalışacak halde.', en: 'Ready to run inside your workflow.' } },
      { title: { tr: 'Değerlendirme raporu.', en: 'An evaluation report.' }, text: { tr: 'Doğruluk, hata türleri ve belirsizlik payıyla.', en: 'With accuracy, types of errors and uncertainty.' } },
      { title: { tr: 'Kullanım kodu.', en: 'The code to run it.' }, text: { tr: 'Modeli yeni veriyle çalıştırmak ve yeniden eğitmek için.', en: 'To run the model on new data and retrain it.' } },
    ],
  },
}
