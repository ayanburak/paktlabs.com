/*
file: techStack.ts
importable: techLogos

Her aracin logo dosyasinin adresi. Adlar ve sira techNames.ts'ten gelir, bu
dosya yalnizca her ada logosunu baglar. Logolar ekrana dogrudan degil TechLogo ile
cizilir, dosya yalnizca seklin kalibidir.

Yeni bir logo tek renkli bir sekil olmali ve zemini bos olmali. Hangi renkte
cizildigi onemli degil, gorunen rengi site verir. Cok renkli bir logo bu
yolla boyanamaz, tek renge cevrilip eklenir.

description: Her araci logo dosyasina baglayan sozluk.
*/

import type { TechName } from './techNames'

// Logolar adres olarak alinir. no-inline olmazsa Vite kucuk dosyalari base64
// olarak ana JS dosyasina gomer, oysa logolar ilk acilista gerekmez. Adres
// olarak alininca her biri ayri bir dosya olur ve tarayici yalnizca cizilen
// logoyu ister.
const logoUrls = import.meta.glob<string>('@/assets/stack/*.svg', {
  query: '?url&no-inline',
  import: 'default',
  eager: true,
})

// Dosya adindan adrese bakar. Dosya yoksa derleme degil calisma sirasinda
// hata verir, bu yuzden eksik bir dosya hemen fark edilsin diye atar.
function logo(file: string): string {
  const url = logoUrls[`/src/assets/stack/${file}.svg`]
  if (!url) throw new Error(`Logo dosyasi bulunamadi: ${file}.svg`)
  return url
}

// Record her adin bir logosu olmasini zorunlu tutar, listeye yeni bir ad
// eklenip logosu unutulursa derleme hata verir.
export const techLogos: Record<TechName, string> = {
  Python: logo('python'),
  PostgreSQL: logo('postgresql'),
  React: logo('react'),
  Pandas: logo('pandas'),
  Docker: logo('docker'),
  Excel: logo('excel'),
  'Node.js': logo('nodejs'),
  'SQL Server': logo('sql-server'),
  FastAPI: logo('fastapi'),
  Jupyter: logo('jupyter'),
  TypeScript: logo('typescript'),
  SQLite: logo('sqlite'),
  Git: logo('git'),
  Matplotlib: logo('matplotlib'),
  Ubuntu: logo('ubuntu'),
  MySQL: logo('mysql'),
  Pytest: logo('pytest'),
  'scikit-learn': logo('scikit-learn'),
}
