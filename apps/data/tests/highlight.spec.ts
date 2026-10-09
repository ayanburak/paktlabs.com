/*
file: highlight.spec.ts

Kod sayfasindaki renklendiricinin kurallarini kucuk orneklerle denetler:
Python'da anahtar kelime, docstring, yorum, onekli metin ve dekorator,
SQL'de buyuk kucuk harf ayirmayan anahtar kelimeler ve iki tireli yorum,
renklendirmenin metni degistirmemesi ve bilinmeyen bir uzantinin hata
vermesi. Tarayiciya ihtiyac yok.

description: Kod renklendiricisinin ve dil kaydinin birim testleri.
*/

import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

import { expect, test } from '@playwright/test'

import { highlight, type Token } from '../src/components/study/blocks/highlight'
import { codeLanguage } from '../src/components/study/blocks/languages'

const python = codeLanguage('a.py')
const sql = codeLanguage('a.sql')

// Yalnizca renkli parcalar, duz metin gozardi edilir. Beklenen degerler
// boylece okunakli kalir.
function colored(tokens: Token[]): [Token['kind'], string][] {
  return tokens.filter((token) => token.kind !== 'plain').map((token) => [token.kind, token.text])
}

test('python keywords, comments and booleans are coloured, built ins are not', () => {
  expect(colored(highlight('if x is None:  # bos\n    print(len(x))', python))).toEqual([
    ['keyword', 'if'],
    ['keyword', 'is'],
    ['keyword', 'None'],
    ['comment', '# bos'],
  ])
})

test('python docstrings span lines and swallow the keywords inside them', () => {
  const code = 'def f():\n    """Ilk satir\n    for ve in burada metin.\n    """\n    return 1'
  expect(colored(highlight(code, python))).toEqual([
    ['keyword', 'def'],
    ['doc', '"""Ilk satir\n    for ve in burada metin.\n    """'],
    ['keyword', 'return'],
  ])
})

test('python string prefixes and decorators belong to their token', () => {
  expect(colored(highlight('@dataclass(frozen=True)\nDIMS = re.compile(r"(\\d+)x")\nprint(f"a: {b}")', python))).toEqual([
    ['keyword', '@dataclass'],
    ['keyword', 'True'],
    ['string', 'r"(\\d+)x"'],
    ['string', 'f"a: {b}"'],
  ])
})

test('a comment sign inside a string stays in the string', () => {
  expect(colored(highlight('x = "a # b"', python))).toEqual([['string', '"a # b"']])
})

test('sql keywords ignore case, type names stay plain, comments start with two dashes', () => {
  expect(colored(highlight("-- not\nselect min(id) FROM t WHERE kind = 'x'::text", sql))).toEqual([
    ['comment', '-- not'],
    ['keyword', 'select'],
    ['keyword', 'min'],
    ['keyword', 'FROM'],
    ['keyword', 'WHERE'],
    ['string', "'x'"],
  ])
})

// Renklendirme yalnizca metni boler, hicbir karakteri eklemez ya da silmez.
// Calismalarin butun kod dosyalari bunun icin denenir.
test('highlighting never changes the text of a study code file', () => {
  const root = join(import.meta.dirname, '../src/content/studies')
  const files = readdirSync(root, { recursive: true, encoding: 'utf8' }).filter((name) => /\/code\/(tr|en)\/.+\.(py|sql)$/.test(name))
  expect(files.length).toBeGreaterThan(0)
  for (const name of files) {
    const text = readFileSync(join(root, name), 'utf8')
    expect(highlight(text, codeLanguage(name)).map((token) => token.text).join(''), name).toBe(text)
  }
})

test('an unknown file extension is an error, not uncoloured code', () => {
  expect(() => codeLanguage('run.sh')).toThrow()
})
