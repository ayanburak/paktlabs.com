/*
file: highlight.ts
importable: Token, TokenKind, highlight

Kod dosyalarinin sade renklendiricisi. Metni anahtar kelime, metin sabiti,
yorum, docstring ve duz metin parcalarina ayirir. Hangi dilde neyin ne
sayilacagi languages.ts'teki kayittan gelir, burada dile ozel bir kural yok.

    highlight('def f():  # not', codeLanguage('a.py'))
    // [{ kind: 'keyword', text: 'def' }, { kind: 'plain', text: ' f():  ' }, { kind: 'comment', text: '# not' }]

description: Kod metnini dilin kurallarina gore renklenecek parcalara ayiran renklendirici.
*/

// NOTE: Bu tam bir dil cozumleyicisi degil, satir satir bakan basit bir
// tarayici. Kod sayfasi kisaltilmis, okunmak icin secilmis dosyalar
// gosterdigi icin bu yeterli. Cok satirli tek tirnakli metinler ya da
// metnin icinde gecen yorum isareti gibi uc durumlar yanlis renklenebilir,
// kodun kendisi bozulmaz, yalnizca rengi.

import type { CodeLanguage } from './languages'

export type TokenKind = 'plain' | 'keyword' | 'string' | 'comment' | 'doc'

export interface Token {
  kind: TokenKind
  text: string
}

const IDENTIFIER = /^[A-Za-z_][A-Za-z0-9_]*/

// Tirnak acildigi yerden ayni tirnagin kacis isaretsiz ilk tekrarina kadar
// okur. Satir sonuna kadar kapanmazsa satir sonunda biter.
function readString(code: string, start: number, quote: string): number {
  let i = start + 1
  while (i < code.length && code[i] !== quote && code[i] !== '\n') i += code[i] === '\\' ? 2 : 1
  return Math.min(i + 1, code.length)
}

// Metin bastan sona bir kez taranir. Her konumda once en uzun eslesen kural
// denenir: docstring, yorum, metin sabiti, dekorator, kelime. Hicbiri tutmazsa
// karakter duz metne eklenir. Art arda gelen ayni turden parcalar
// birlestirilir, boylece ekrana az sayida span cizilir.
export function highlight(code: string, language: CodeLanguage): Token[] {
  const tokens: Token[] = []
  const push = (kind: TokenKind, text: string) => {
    const last = tokens[tokens.length - 1]
    if (last?.kind === kind) last.text += text
    else tokens.push({ kind, text })
  }

  let i = 0
  while (i < code.length) {
    const rest = code.slice(i, i + 3)

    if (language.docStrings && (rest === '"""' || rest === "'''")) {
      const end = code.indexOf(rest, i + 3)
      const stop = end === -1 ? code.length : end + 3
      push('doc', code.slice(i, stop))
      i = stop
      continue
    }

    if (code.startsWith(language.lineComment, i)) {
      const end = code.indexOf('\n', i)
      const stop = end === -1 ? code.length : end
      push('comment', code.slice(i, stop))
      i = stop
      continue
    }

    if (code[i] === '"' || code[i] === "'") {
      const stop = readString(code, i, code[i])
      push('string', code.slice(i, stop))
      i = stop
      continue
    }

    if (language.decorators && code[i] === '@') {
      const name = code.slice(i + 1).match(IDENTIFIER)
      if (name) {
        push('keyword', `@${name[0]}`)
        i += name[0].length + 1
        continue
      }
    }

    const word = code.slice(i).match(IDENTIFIER)
    if (word) {
      const text = word[0]
      const next = code[i + text.length]
      if (language.stringPrefixes?.has(text.toLowerCase()) && (next === '"' || next === "'")) {
        const stop = readString(code, i + text.length, next)
        push('string', code.slice(i, stop))
        i = stop
        continue
      }
      const key = language.caseInsensitive ? text.toLowerCase() : text
      push(language.keywords.has(key) ? 'keyword' : 'plain', text)
      i += text.length
      continue
    }

    push('plain', code[i])
    i += 1
  }
  return tokens
}
