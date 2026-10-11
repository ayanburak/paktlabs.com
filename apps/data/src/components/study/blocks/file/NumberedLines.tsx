/*
file: NumberedLines.tsx
importable: NumberedLines

Bir dosyanin metnini solda satir numaralariyla gosterir. Numaralar ve metin
iki ayri sutundur, okur metni sectiginde ya da kopyaladiginda numaralar
metne karismaz. Kod dosyasi ve veri dosyasi onizlemesi bunu kullanir.

    <NumberedLines count={76}>{renklenmis kod}</NumberedLines>

description: Dosya metnini kopyaya karismayan satir numaralariyla gosteren govde.
*/

import type { ReactNode } from 'react'

import styles from './NumberedLines.module.css'

interface NumberedLinesProps {
  count: number
  children: ReactNode
}

// Numara sutunu ekran okuyucudan gizlenir, satir numarasi okunacak metnin
// parcasi degil. Metin sutunu dar ekranda yatay kayar, numaralar yerinde
// kalir.
export function NumberedLines({ count, children }: NumberedLinesProps) {
  const numbers = Array.from({ length: count }, (_, index) => index + 1).join('\n')

  return (
    <>
      <pre className={styles.numbers} aria-hidden="true">
        {numbers}
      </pre>
      <pre className={styles.text}>
        <code>{children}</code>
      </pre>
    </>
  )
}
