/*
file: quality.ts
importable: quality

Veri sayfasindaki panonun ve /services/quality sayfasinin metni.

description: Veri Kalitesi hizmetinin iki dilli icerigi.
*/

import type { Service } from './types'

export const quality: Service = {
  summary: { tr: 'Hataları ölçer, kaynağını bulur ve kurala bağlarız.', en: 'We measure errors, trace them to their source and turn them into rules.' },
  lede: { tr: 'Raporlarınızdaki sayıların neden birbirini tutmadığını bulur, hataları ölçer ve tekrar etmemeleri için denetim kurallarına bağlarız.', en: 'We find out why the numbers in your reports disagree, measure the errors and set up checks so they do not come back.' },
  kunye: {
    input: { tr: 'Raporlar, kaynak tablolar, iş kuralları', en: 'Reports, source tables, business rules' },
    output: { tr: 'Kalite raporu, denetim kuralları, düzeltme önerileri', en: 'A quality report, automated checks, suggested fixes' },
    tools: 'Python, SQL, pytest',
  },
  scope: {
    lede: { tr: 'Kalite işi hatayı bir kez düzeltmek değil, nereden geldiğini bulup bir daha girmemesini sağlamaktır.', en: 'Quality work is not fixing an error once, it is finding where it comes from and keeping it out.' },
    items: [
      { title: { tr: 'Ölçüm.', en: 'Measurement.' }, text: { tr: 'Eksik, tutarsız ve çelişen kayıtların oranını alan alan ölçeriz.', en: 'We measure the share of missing, inconsistent and conflicting records field by field.' } },
      { title: { tr: 'Kaynak takibi.', en: 'Tracing.' }, text: { tr: 'Hatanın hangi sistemden ya da hangi adımdan geldiğini buluruz.', en: 'We find which system or step an error comes from.' } },
      { title: { tr: 'Denetim kuralları.', en: 'Checks.' }, text: { tr: 'Her yeni veride kendiliğinden çalışan kontroller yazarız.', en: 'We write checks that run on every new batch of data by themselves.' } },
      { title: { tr: 'Düzeltme.', en: 'Fixing.' }, text: { tr: 'Geçmişteki hatalı kayıtlar için kurala dayanan bir düzeltme yolu öneririz.', en: 'We propose a rule based way to repair past records.' } },
    ],
  },
  steps: {
    lede: { tr: 'Önce hatanın ne kadar büyük olduğunu sayıyla gösterir, sonra kaynağına ineriz.', en: 'We first show how big the problem is in numbers, then go to its source.' },
    items: [
      { title: { tr: 'Ölçüm', en: 'Measure' }, text: { tr: 'Kalite sorunlarını alan bazında sayar, bir başlangıç tablosu çıkarırız.', en: 'We count quality problems per field and set a baseline.' } },
      { title: { tr: 'İz sürme', en: 'Trace' }, text: { tr: 'En büyük sorunların kaynağına iner, nedenini kanıtıyla gösteririz.', en: 'We go to the source of the biggest problems and show the cause with evidence.' } },
      { title: { tr: 'Kurallar', en: 'Rules' }, text: { tr: 'Kontrolleri yazar, geçmiş veride deneyerek ayarlarız.', en: 'We write the checks and tune them on past data.' } },
      { title: { tr: 'İzleme', en: 'Monitor' }, text: { tr: 'Kontrollerin her yeni veride çalışmasını ve sonucunu raporlamasını sağlarız.', en: 'We make the checks run on every new batch and report their results.' } },
    ],
  },
  delivery: {
    lede: { tr: 'Sonunda verinizin ne kadar güvenilir olduğunu bir sayıyla söyleyebilirsiniz.', en: 'At the end you can state how reliable your data is with a number.' },
    items: [
      { title: { tr: 'Kalite raporu.', en: 'A quality report.' }, text: { tr: 'Hangi alanda ne kadar sorun olduğunu ve kaynağını gösterir.', en: 'It shows how much trouble each field has and where it comes from.' } },
      { title: { tr: 'Denetim kuralları.', en: 'Automated checks.' }, text: { tr: 'Kendiliğinden çalışan, kodu sizde kalan kontroller.', en: 'Checks that run on their own, with the code left in your hands.' } },
      { title: { tr: 'Düzeltme önerileri.', en: 'Suggested fixes.' }, text: { tr: 'Geçmiş kayıtları kurala göre onarmanın yolu.', en: 'A rule based way to repair past records.' } },
    ],
  },
}
