/*
file: languages.ts
importable: CodeLanguage, codeLanguage, codeLanguages

Kod sayfasinda gosterilebilen programlama dilleri. Bir kod dosyasinin dili
uzantisindan bulunur, dilin kaydi hem baslikta yazan adi hem de
renklendiricinin kurallarini tasir. Yeni bir dil eklenirken yalnizca buraya
bir kayit eklenir, renklendirici ve kod bileseni degismez.

    codeLanguage('rules/catalog.py').label   // Python

description: Kod dosyalarinin uzantisina gore dil adini ve renklendirme kurallarini veren kayit.
*/

// Renklendiricinin bir dil icin bildigi kurallar. lineComment satir sonuna
// kadar suren yorumun baslangici. docStrings uc tirnakli metinleri ayri bir
// renkle gosterir. decorators @ ile baslayan adlari anahtar kelime sayar.
// caseInsensitive anahtar kelimeleri buyuk kucuk harf ayirmadan tanir, SQL'de
// select ile SELECT ayni kelimedir. stringPrefixes tirnaktan hemen once gelip
// metnin parcasi sayilan harfler, Python'daki r"..." ya da f"..." gibi.
export interface CodeLanguage {
  label: string
  keywords: ReadonlySet<string>
  lineComment: string
  docStrings?: true
  decorators?: true
  caseInsensitive?: true
  stringPrefixes?: ReadonlySet<string>
}

// Kelime listeleri mockup'taki renklendirmeden alindi. Gomulu fonksiyonlar,
// ornegin print ya da len, anahtar kelime sayilmaz. SQL'de min ve count gibi
// toplama fonksiyonlari ise sorgunun yapisini tasidigi icin anahtar kelime
// gibi renklenir, tur adlari ise renklenmez.
const python: CodeLanguage = {
  label: 'Python',
  lineComment: '#',
  docStrings: true,
  decorators: true,
  stringPrefixes: new Set(['r', 'f', 'b', 'u', 'rb', 'br', 'fr', 'rf']),
  keywords: new Set([
    'False', 'None', 'True', 'and', 'as', 'assert', 'async', 'await', 'break', 'class', 'continue',
    'def', 'del', 'elif', 'else', 'except', 'finally', 'for', 'from', 'global', 'if', 'import', 'in',
    'is', 'lambda', 'nonlocal', 'not', 'or', 'pass', 'raise', 'return', 'try', 'while', 'with', 'yield',
  ]),
}

const sql: CodeLanguage = {
  label: 'SQL',
  lineComment: '--',
  caseInsensitive: true,
  keywords: new Set([
    'all', 'alter', 'always', 'and', 'as', 'asc', 'avg', 'between', 'by', 'case', 'check', 'count',
    'create', 'delete', 'desc', 'distinct', 'drop', 'else', 'end', 'exists', 'foreign', 'from',
    'generated', 'group', 'having', 'in', 'index', 'inner', 'insert', 'into', 'is', 'join', 'key',
    'left', 'like', 'limit', 'max', 'min', 'not', 'null', 'on', 'or', 'order', 'outer', 'over',
    'partition', 'primary', 'references', 'right', 'select', 'set', 'stored', 'sum', 'table', 'then',
    'union', 'unique', 'update', 'values', 'when', 'where', 'with',
  ]),
}

// Uzanti, nokta olmadan ve kucuk harfle.
export const codeLanguages: Readonly<Record<string, CodeLanguage>> = {
  py: python,
  sql,
}

// Bilinmeyen bir uzantida hata verir. Kod sayfasinda dili tanimayan bir
// dosya, icerik dosyasinda yanlis yazilmis bir yol ya da eksik bir kayittir
// ve sessizce renksiz kalmamalidir. data testi de her kod dosyasinin
// uzantisinin burada oldugunu denetler.
export function codeLanguage(path: string): CodeLanguage {
  const extension = path.slice(path.lastIndexOf('.') + 1).toLowerCase()
  const language = codeLanguages[extension]
  if (!language) throw new Error(`${path} icin kayitli bir dil yok`)
  return language
}
