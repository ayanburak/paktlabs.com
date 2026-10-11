/*
file: questions.ts
importable: questions, QuestionId, Answers

Iletisim formunun secmeli sorulari ve siralari. Her soru bir ekran olur,
secmeli sorulardan sonra son ekranda ad, e-posta ve kisa aciklama istenir.
Sorularin ve seceneklerin ekranda gorunen metni sozlukte contactPage.questions
altinda, kimlikleriyle durur. Yeni bir soru ya da secenek yalnizca buraya
eklenir, metni iki dilin sozlugune yazilir, sozlukte eksik kalirsa derleme
hata verir.

description: Iletisim formundaki secmeli sorularin kimliklerini ve siralarini tutan liste.
*/

// Sira formdaki ekran sirasidir. Kimlikler gonderilen mesajda da gecer,
// degistirilirse servis tarafindaki karsiliklari da degismeli.
export const questions = [
  { id: 'area', options: ['data', 'automation', 'web', 'unsure'] },
  { id: 'stage', options: ['idea', 'plan', 'unfinished', 'running'] },
  { id: 'timing', options: ['days', 'month', 'months', 'flexible'] },
] as const

export type QuestionId = (typeof questions)[number]['id']

// Ziyaretcinin o ana kadar sectigi cevaplar. Cevaplanmamis soru yoktur.
export type Answers = Partial<Record<QuestionId, string>>
