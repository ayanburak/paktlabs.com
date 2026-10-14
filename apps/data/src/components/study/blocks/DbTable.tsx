/*
file: DbTable.tsx
importable: DbTable

Veritabani tablosu parcasi, hesap tablosunun veritabanindaki karsiligi.
Ustte murekkep bir serit tablonun adini ve neyin gosterildigini soyler.
columns gorunusu sutun yapisini gosterir: sira, ad, tur, bos kalabilmesi,
bag ve aciklama, hepsi semadan gelir, anahtar ve bag sutunlarinin adi altin
zeminlidir. rows gorunusu bir sorgunun sonucunu gosterir: satirlar CSV'den
gelir ve verinin dilini izler, basliklarda sutunun adi ve semadaki turu
yazar, sayi turundeki sutunlar saga yaslanir, bos hucre NULL olarak gorunur.

description: Bir veritabani tablosunun sutun yapisini ya da bir sorgu sonucunu gosteren parca.
*/

import { useLanguage } from '@paktlabs/brand/i18n/language'
import { cx } from '@paktlabs/brand/lib/cx'

import type { DbTable as DbTableContent, DbTableBlock } from '@/content/studies/blocks'
import { parseCsv } from '@/content/studies/csv'
import { findTable } from '@/content/studies/dbschema'
import { useDict } from '@/i18n'

import { useStudyFile } from '../studyFiles'
import styles from './DbTable.module.css'
import { formatValue } from './format'

// Sayi turundeki sutunlar saga yaslanir, rakamlar alt alta hizalansin diye.
const NUMERIC = /^(smallint|integer|bigint|numeric|decimal|real|double)/

function Columns({ table }: { table: DbTableContent }) {
  const { language } = useLanguage()
  const { study } = useDict()
  const dict = study.dbtable

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th className={styles.index}>{dict.index}</th>
          <th>{dict.column}</th>
          <th>{dict.type}</th>
          <th>{dict.nullable}</th>
          <th>{dict.ref}</th>
          <th>{dict.note}</th>
        </tr>
      </thead>
      <tbody>
        {table.columns.map((column, i) => (
          <tr key={column.name}>
            <td className={styles.index}>{i + 1}</td>
            <td className={cx(styles.name, (column.pk || column.ref) && styles.key)}>
              {column.pk ? <i className={styles.pk}>PK</i> : column.ref ? <i className={styles.fk}>FK</i> : null}
              {column.name}
            </td>
            <td className={styles.type}>{column.type}</td>
            <td className={cx(!column.nullable && styles.faint)}>{column.nullable ? dict.yes : dict.no}</td>
            <td className={styles.ref}>{column.ref && `→ ${column.ref}`}</td>
            <td className={styles.note}>{column.note[language]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

// CSV'nin ilk satiri sutun adlaridir, turleri semadan okunur.
function Rows({ table, csv }: { table: DbTableContent; csv: string }) {
  const [head = [], ...rows] = parseCsv(useStudyFile('data', `${csv}.csv`).text)
  const numeric = head.map((name) => NUMERIC.test(table.columns.find((column) => column.name === name)?.type ?? ''))

  return (
    <table className={cx(styles.table, styles.rows)}>
      <thead>
        <tr>
          <th className={styles.index} />
          {head.map((name, i) => (
            <th key={name} className={cx(numeric[i] && styles.number)}>
              {name}
              <small>{table.columns.find((column) => column.name === name)?.type}</small>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, r) => (
          <tr key={r}>
            <td className={styles.index}>{r + 1}</td>
            {row.map((cell, i) => (
              <td key={i} className={cx(numeric[i] && styles.number)}>
                {cell === '' ? <span className={styles.null}>NULL</span> : cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

interface DbTableProps {
  block: DbTableBlock
}

export function DbTable({ block }: DbTableProps) {
  const { language } = useLanguage()
  const { study } = useDict()
  const dict = study.dbtable
  const table = findTable(block.schema, block.table)

  return (
    <div className={styles.frame}>
      <div className={styles.bar}>
        <b>{table.name}</b>
        <span>
          {block.view === 'columns'
            ? `${dict.columns} · ${formatValue(table.rows, 'count', 0, language)} ${dict.rows}`
            : dict.result}
        </span>
      </div>
      <div className={styles.scroll}>{block.view === 'columns' ? <Columns table={table} /> : <Rows table={table} csv={block.csv} />}</div>
      {block.view === 'rows' && <RowCount csv={block.csv} />}
    </div>
  )
}

// Sorgu sonucunun altindaki satir sayisi, dosyadan sayilir.
function RowCount({ csv }: { csv: string }) {
  const { language } = useLanguage()
  const { study } = useDict()
  const count = parseCsv(useStudyFile('data', `${csv}.csv`).text).length - 1
  return (
    <div className={styles.foot}>
      {formatValue(count, 'count', 0, language)} {study.dbtable.rows}
    </div>
  )
}
