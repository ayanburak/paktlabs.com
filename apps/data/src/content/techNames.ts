/*
file: techNames.ts
importable: techNames, TechName

Teknoloji seridindeki araclarin adlari ve sirasi. Adlar logolardan ayri bir
dosyada durur, cunku calisma icerik dosyalari araclari bu adlarla secer ve o
dosyalar testlerde de okunur. Logolar SVG import'u oldugu icin yalnizca Vite
icinde yuklenebilir, burada hic import yoktur.

description: Teknoloji seridindeki araclarin adlarini ve sirasini tutan liste.
*/

// Sira serideki siradir. Urun adlari iki dilde de ayni kaldigi icin sozlukte
// degil burada durur.
export const techNames = [
  'Python',
  'PostgreSQL',
  'React',
  'Pandas',
  'Docker',
  'Excel',
  'Node.js',
  'SQL Server',
  'FastAPI',
  'Jupyter',
  'TypeScript',
  'SQLite',
  'Git',
  'Matplotlib',
  'Ubuntu',
  'MySQL',
  'Pytest',
  'scikit-learn',
] as const

// Calisma kartlari araclari bu adlarla secer. Listede olmayan ya da yanlis
// yazilmis bir ad derleme hatasi verir, kartta sessizce bos bir kutu kalmaz.
export type TechName = (typeof techNames)[number]
