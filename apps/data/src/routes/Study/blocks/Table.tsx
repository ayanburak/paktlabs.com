/*
file: Table.tsx
importable: Table

Duz tablo. Hesap tablosu gorunumu tasimaz, sitenin diliyle yazilir ve kisa
bir karsilastirma icin kullanilir. Ilk sutun satirin adidir. Oran hucreleri
kucuk bir cubuk ve yaninda degerle cizilir.

description: Bolum icindeki kisa karsilastirma tablosunu gosteren parca.
*/

import type { CSSProperties } from 'react'

import { useReveal } from '@paktlabs/brand/hooks/useReveal'
import { useLanguage } from '@paktlabs/brand/i18n/language'
import { cx } from '@paktlabs/brand/lib/cx'

import type { TableBlock, TableCell } from '@/content/studies/blocks'

import { formatValue } from './format'
import styles from './Table.module.css'

interface TableProps {
  block: TableBlock
}

// Oran cubugu tek seri oldugu icin komur renginde ve dogrudan etiketlidir,
// lejant gerekmez. Dar ekranda tablo kendi kutusunda yana kayar, sayfa kaymaz.
export function Table({ block }: TableProps) {
  const { language } = useLanguage()
  const { ref, visible } = useReveal<HTMLDivElement>()

  function cell(value: TableCell) {
    if ('meter' in value) {
      return (
        <span className={styles.meter} style={{ '--w': `${value.meter}%` } as CSSProperties}>
          <i />
          <b>{formatValue(value.meter, 'percent', 0, language)}</b>
        </span>
      )
    }
    return value[language]
  }

  return (
    <div ref={ref} className={cx('reveal', visible && 'in', styles.wrap)}>
      <table className={styles.table}>
        <thead>
          <tr>
            {block.head.map((label) => (
              <th key={label[language]} scope="col">
                {label[language]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((value, columnIndex) => (
                <td key={columnIndex} className={cx(columnIndex === 0 && styles.key)}>
                  {cell(value)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
