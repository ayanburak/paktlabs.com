/*
file: TableCard.tsx
importable: TableCard

Veritabani semasinda bir tablonun karti: ustte adi ve kayit sayisi, altinda
sutunlari. Anahtar sutun PK, bag sutunu FK etiketi tasir ve bag sutunlari
altin zeminlidir. Uc gorunusu var: full butun sutunlari turleriyle, brief
anahtar ve bag sutunlarini ve tabloyu tanitan sutunlari, keys yalnizca
anahtar ve bag sutunlarini gosterir. Gosterilmeyen sutunlar +N sutun diye
ozetlenir. Satirlar data-column ile, kart data-table ile isaretlidir, cizgiler
bu isaretlerden olculur.

description: Bir veritabani tablosunu adi, kayit sayisi ve secilen sutunlariyla gosteren kart.
*/

import type { CSSProperties } from 'react'

import { useLanguage } from '@paktlabs/brand/i18n/language'
import { cx } from '@paktlabs/brand/lib/cx'

import type { DbTable } from '@/content/studies/blocks'
import { useDict } from '@/i18n'

import { formatValue } from '../format'
import styles from './Schema.module.css'

interface TableCardProps {
  table: DbTable
  view: 'full' | 'brief' | 'keys'
  main?: boolean
}

export function TableCard({ table, view, main = false }: TableCardProps) {
  const { language } = useLanguage()
  const { study } = useDict()
  const shown = table.columns.filter(
    (column) => view === 'full' || column.pk || column.ref || (view === 'brief' && table.brief.includes(column.name)),
  )
  const rest = table.columns.length - shown.length

  return (
    <div className={cx(styles.card, main && styles.main)} data-table={table.name} style={{ gridArea: table.name } as CSSProperties}>
      <header>
        <b>{table.name}</b>
        <small>
          {formatValue(table.rows, 'count', 0, language)} {study.schema.rows}
        </small>
      </header>
      <ul>
        {shown.map((column) => (
          <li key={column.name} className={cx(column.ref && styles.link)} data-column={column.name}>
            <span>{column.pk ? <i className={styles.pk}>PK</i> : column.ref ? <i className={styles.fk}>FK</i> : null}</span>
            {column.name}
            {view === 'full' && <em>{column.type}</em>}
          </li>
        ))}
        {rest > 0 && (
          <li className={styles.more}>
            <span />+{rest} {study.schema.more}
          </li>
        )}
      </ul>
    </div>
  )
}
