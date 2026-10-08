/*
file: Sheet.tsx
importable: Sheet

Ham veriyi hesap tablosu programlarina benzeyen bir gorunumle gosterir:
dosya adi, ad kutusu, formul cubugu, sutun harfleri, satir numaralari ve alt
kenarda sayfa sekmeleri. Hucreler calismanin CSV'sinden, gorunum ayarlari
parcanin kendisinden gelir. Tablonun altindaki notlar ayni parcanin parcasi.

description: Calismanin CSV dosyasini Excel gorunumlu bir tablo olarak gosteren parca.
*/

// NOTE: Kok oge data-sheet tasir. Acilir kutu bu isarete bakip tabloyu kendi
// kenarina kadar uzatir, tablonun CSS modulu sinifi disaridan okunamadigi
// icin boyle.

import { useLanguage } from '@paktlabs/brand/i18n/language'
import { cx } from '@paktlabs/brand/lib/cx'

import type { SheetBlock } from '@/content/studies/blocks'
import { parseCsv } from '@/content/studies/csv'
import { useDict } from '@/i18n'
import { useStudyData } from '@/routes/Study/studyData'

import styles from './Sheet.module.css'

interface SheetProps {
  block: SheetBlock
}

// Sutun sirasini hesap tablosu harfine cevirir: 0 A, 25 Z, 26 AA.
function columnLetter(index: number): string {
  let letter = ''
  for (let n = index + 1; n > 0; n = Math.floor((n - 1) / 26)) {
    letter = String.fromCharCode(65 + ((n - 1) % 26)) + letter
  }
  return letter
}

// Hucreler, dosya adi, sekmeler ve formul verinin dilinden, notlar ve satir
// etiketi sitenin dilinden gelir. CSV'nin ilk satiri baslik satiridir ve
// hesap tablosundaki gibi 1 numarayi alir. Bos hucre gercek bir disa
// aktarimdaki gibi tire ile gosterilir, toplam satirindaki bosluklar ise bos
// kalir. Satir sayisi baslik ve toplam satiri disindaki veri satirlaridir.
export function Sheet({ block }: SheetProps) {
  const { language: site } = useLanguage()
  const { study } = useDict()
  const data = useStudyData()
  const rows = parseCsv(data.csv[data.language][block.csv] ?? '')
  const width = Math.max(0, ...rows.map((row) => row.length))
  const letters = Array.from({ length: width }, (_, index) => columnLetter(index))
  const selected = block.cell.match(/^([A-Z]+)(\d+)$/)
  const selectedColumn = selected?.[1]
  const selectedRow = Number(selected?.[2])
  const lastRow = rows.length - 1
  const count = rows.length - 1 - (block.total ? 1 : 0)
  const format = new Intl.NumberFormat(site === 'tr' ? 'tr-TR' : 'en-US')
  const rowLabel = block.rows
    ? `${format.format(count)} / ${format.format(block.rows)} ${study.sheet.rows}`
    : `${format.format(count)} ${study.sheet.rows}`

  function cellValue(column: string, row: number) {
    return rows[row - 1]?.[letters.indexOf(column)] ?? ''
  }

  return (
    <>
      <div className={styles.sheet} data-sheet>
        <div className={styles.file}>
          <span>{block.name[data.language]}</span>
          <span aria-hidden="true">{rowLabel}</span>
        </div>
        <div className={styles.bar} aria-hidden="true">
          <span className={styles.address}>{block.cell}</span>
          <span className={styles.fx}>fx</span>
          <span>{block.formula?.[data.language] ?? cellValue(selectedColumn ?? '', selectedRow)}</span>
        </div>
        <div className={styles.scroll}>
          <table>
            <thead aria-hidden="true">
              <tr>
                <th />
                {letters.map((letter) => (
                  <th key={letter}>{letter}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => {
                const isHead = rowIndex === 0
                const isTotal = block.total && rowIndex === lastRow
                return (
                  <tr key={rowIndex} className={cx(isHead && styles.head, isTotal && styles.total)}>
                    <th>{rowIndex + 1}</th>
                    {letters.map((letter, columnIndex) => {
                      const value = row[columnIndex] ?? ''
                      const empty = value === '' && !isHead && !isTotal
                      return (
                        <td
                          key={letter}
                          className={cx(
                            !isHead && block.numbers?.includes(letter) && styles.number,
                            empty && styles.empty,
                            letter === selectedColumn && rowIndex + 1 === selectedRow && styles.selected,
                          )}
                        >
                          {empty ? '—' : value}
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div className={styles.tabs} aria-hidden="true">
          {block.tabs[data.language].map((tab, index) => (
            <span key={tab} className={cx(index === 0 && styles.active)}>
              {tab}
            </span>
          ))}
        </div>
      </div>
      {block.notes?.map((note) => (
        <p key={note[site]} className={styles.note}>
          {note[site]}
        </p>
      ))}
    </>
  )
}
