/*
file: questions.ts
importable: questions, Question, QuestionId, OptionId, Answers, isComplete

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

export type Question = (typeof questions)[number]
export type QuestionId = Question['id']
export type OptionId = Question['options'][number]

// Her sorunun cevabi o sorunun seceneklerinden biridir. Gonderilen mesajdaki
// cevaplar bu sekildedir, eksiksizdir.
export type Answers = { [Q in Question as Q['id']]: Q['options'][number] }

// Ziyaretci sorulari cevapladikca dolan hal. Son ekrana butun sorular
// cevaplanmadan gelinmez, bu koruyucu derleyiciye bunu kanitlar.
export function isComplete(answers: Partial<Answers>): answers is Answers {
  return questions.every((question) => answers[question.id] !== undefined)
}
