/*
file: Matrix.tsx
importable: Matrix

Bir modelin ya da kuralin kararlarini gercekle karsilastiran karar tablosu.
Etiket, soru, okuma ve altindaki parcalar ortak Figure cercevesinden gelir.
Ustte verilen kararin, solda gercegin ekseni, sagda ve altta toplamlar,
kosede butun kayitlarin sayisi durur. Kosegendeki hucreler dogru kararlardir,
gerisi hatadir, altin zeminle ve Hata etiketiyle ayrilir. Tablonun altinda
hata turleri duz cumleyle anlatilir.

description: Kararlari gercekle karsilastiran, dogru ve hatali hucreleri ayiran tablo parcasi.
*/

import type { CSSProperties } from 'react'

import { useLanguage } from '@paktlabs/brand/i18n/language'
import { cx } from '@paktlabs/brand/lib/cx'

import type { MatrixBlock } from '@/content/studies/blocks'
import { useDict } from '@/i18n'

import { Figure } from './Figure'
import { formatValue } from './format'
import styles from './Matrix.module.css'

interface MatrixProps {
  block: MatrixBlock
}

// Satirlar gercek sinifi, sutunlar verilen karari gosterir. Satir ve sutun
// toplamlari ile genel toplam hucrelerden hesaplanir, icerikte elle yazilmaz
// ki birbirini tutmayan bir toplam yayinlanamasin.
export function Matrix({ block }: MatrixProps) {
  const { language } = useLanguage()
  const { study } = useDict()
  const count = (n: number) => formatValue(n, 'count', 0, language)
  const n = block.classes.length
  const rowSums = block.cells.map((row) => row.reduce((sum, cell) => sum + cell.value, 0))
  const colSums = block.classes.map((_, j) => block.cells.reduce((sum, row) => sum + (row[j]?.value ?? 0), 0))
  const total = rowSums.reduce((a, b) => a + b, 0)

  const description = [
    block.title[language],
    ...block.cells.flatMap((row, i) =>
      row.map(
        (cell, j) =>
          `${block.actual[language]} ${block.classes[i]?.[language]}, ${block.decided[language]} ${block.classes[j]?.[language]}: ${count(cell.value)}, ${cell.text[language]}`,
      ),
    ),
  ].join('. ')

  // Izgara: eksen adi, satir adlari, n hucre sutunu ve toplam sutunu. Her
  // eleman yerini satir ve sutun numarasiyla acikca alir, kendiliginden
  // dizilseydi bos koseler yuzunden hucreler kayardi.
  const at = (row: number, column: number, rowSpan = 1, columnSpan = 1) =>
    ({ gridArea: `${row} / ${column} / ${row + rowSpan} / ${column + columnSpan}` }) as CSSProperties

  return (
    <Figure
      label={block.label[language]}
      title={block.title[language]}
      reading={block.reading[language]}
      description={description}
      after={
        block.key && (
          <dl className={styles.key}>
            {block.key.map((item) => (
              <div key={item.title.en}>
                <dt>{item.title[language]}</dt>
                <dd>{item.text[language]}</dd>
              </div>
            ))}
          </dl>
        )
      }
      blocks={block.blocks}
    >
      <div aria-hidden="true">
        <div className={styles.grid} style={{ '--n': n } as CSSProperties}>
          <div className={cx(styles.axis, styles.top)} style={at(1, 3, 1, n)}>
            {block.decided[language]}
          </div>
          {block.classes.map((item, j) => (
            <div key={item.en} className={styles.column} style={at(2, 3 + j)}>
              {item[language]}
            </div>
          ))}
          <div className={cx(styles.column, styles.sum)} style={at(2, 3 + n)}>
            {study.matrix.total}
          </div>
          <div className={cx(styles.axis, styles.side)} style={at(3, 1, n, 1)}>
            {block.actual[language]}
          </div>
          {block.cells.map((row, i) => [
            <div key={`r${i}`} className={styles.row} style={at(3 + i, 2)}>
              {block.classes[i]?.[language]}
            </div>,
            ...row.map((cell, j) => (
              <div key={`c${i}-${j}`} className={cx(styles.cell, i !== j && styles.error)} style={at(3 + i, 3 + j)}>
                <em>{i === j ? study.matrix.correct : study.matrix.error}</em>
                <b>{count(cell.value)}</b>
                <span>{cell.text[language]}</span>
              </div>
            )),
            <div key={`s${i}`} className={styles.number} style={at(3 + i, 3 + n)}>
              {count(rowSums[i] ?? 0)}
            </div>,
          ])}
          <div className={cx(styles.row, styles.sum)} style={at(3 + n, 2)}>
            {study.matrix.total}
          </div>
          {colSums.map((sum, j) => (
            <div key={`t${j}`} className={styles.number} style={at(3 + n, 3 + j)}>
              {count(sum)}
            </div>
          ))}
          <div className={cx(styles.number, styles.all)} style={at(3 + n, 3 + n)}>
            {count(total)}
          </div>
        </div>
      </div>
    </Figure>
  )
}
