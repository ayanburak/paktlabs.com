/*
file: tags.ts
importable: studyTags

Calismalarin filtre etiketleri ve sirasi. StudyTag tipi types.ts'te bu
listeden turetilir, filtre paneli de kutulari bu listeyle dizer. Yeni bir
etiket yalnizca buraya eklenir, ekrandaki adi da iki dilin sozlugune yazilir.
Sozlukte adi eksik kalirsa derleme hata verir.

description: Calisma etiketlerinin kimliklerini ve filtredeki sirasini tutan liste.
*/

// Sira mockup'taki filtre sirasidir. Etiketin ekranda gorunen adi sozlukte
// durur, sozluk nesnesinin anahtar sirasina guvenilmedigi icin sira burada
// tutuluyor.
export const studyTags = [
  'preparation',
  'database',
  'quality',
  'analysis',
  'visualization',
  'machineLearning',
] as const
