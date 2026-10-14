/*
file: Heat.tsx
importable: Heat

Iki boyutlu bir sorunun cevabini tek bakista veren isi tablosu. Etiket,
soru, okuma ve altindaki parcalar ortak Figure cercevesinden gelir. Hucrenin
zemini degerle bes kademede murekkebe dogru koyulasir, deger hucrenin
icinde yazar. Altta kademelerin araliklarini gosteren bir olcek durur.

description: Satir ve sutunlarin kesisimindeki degerleri koyuluk ve sayiyla gosteren tablo parcasi.
*/

import type { CSSProperties } from 'react'

import { useLanguage } from '@paktlabs/brand/i18n/language'
import { cx } from '@paktlabs/brand/lib/cx'

import type { HeatBlock } from '@/content/studies/blocks'

import { Figure } from './Figure'
import { formatValue } from './format'
import styles from './Heat.module.css'
import { SHADE_STEPS, shade } from './shade'

interface HeatProps {
  block: HeatBlock
}

export function Heat({ block }: HeatProps) {
  const { language } = useLanguage()
  const value = (n: number) => formatValue(n, block.unit, block.decimals, language)
  const cell = (n: number) => shade(Math.min(n, block.max) / block.max)

  const description = [
    block.title[language],
    ...block.rows.map(
      (row) =>
        `${row.label[language]}: ${block.columns.map((column, i) => `${column[language]} ${value(row.values[i] ?? 0)}`).join(', ')}`,
    ),
  ].join('. ')

  return (
    <Figure
      label={block.label[language]}
      title={block.title[language]}
      reading={block.reading[language]}
      description={description}
      blocks={block.blocks}
    >
      <div aria-hidden="true">
        <table className={styles.heat}>
          <thead>
            <tr>
              <th />
              {block.columns.map((column) => (
                <th key={column.en}>{column[language]}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row) => (
              <tr key={row.label.en}>
                <th>{row.label[language]}</th>
                {row.values.map((n, i) => {
                  const { depth, light } = cell(n)
                  return (
                    <td key={i} className={cx(light && styles.light)} style={{ '--depth': `${depth}%` } as CSSProperties}>
                      {value(n)}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles.scale}>
          {formatValue(0, block.unit, 0, language)}
          {SHADE_STEPS.map((depth) => (
            <i key={depth} style={{ '--depth': `${depth}%` } as CSSProperties} />
          ))}
          {formatValue(block.max, block.unit, 0, language)}
        </div>
      </div>
    </Figure>
  )
}
