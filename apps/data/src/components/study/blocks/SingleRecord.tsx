/*
file: SingleRecord.tsx
importable: SingleRecord

Bir isin tek bir kayda ne yaptigini alan alan gosteren kart. Solda alanin
adi, ortada kaynaktaki, sagda isten sonraki degeri. Degerler verinin
parcasidir ve hesap tablosu gibi verinin dilini izler, basliklar ve not
sitenin dilini. Degisen alanin yeni degerinin solunda altin bir cizgi
durur, degismeyen alan soluk yazilir.

description: Tek bir kaydin alanlarini once ve sonra haliyle yan yana gosteren parca.
*/

import { useLanguage } from '@paktlabs/brand/i18n/language'
import { cx } from '@paktlabs/brand/lib/cx'

import type { RecordBlock } from '@/content/studies/blocks'
import { useDict } from '@/i18n'

import { useDataLanguage } from '../dataLanguageContext'
import styles from './SingleRecord.module.css'

interface SingleRecordProps {
  block: RecordBlock
}

// Bir alanin degisip degismedigi secili veri dilindeki degerlere bakilarak
// bulunur, elle isaretlenmez. Bos deger ve bos olmayan deger farkli sayilir.
export function SingleRecord({ block }: SingleRecordProps) {
  const { language } = useLanguage()
  const { language: data } = useDataLanguage()
  const { study } = useDict()

  return (
    <div className={styles.record}>
      <table>
        <thead>
          <tr>
            <th>{study.record.field}</th>
            <th>{block.before[language]}</th>
            <th>{block.after[language]}</th>
          </tr>
        </thead>
        <tbody>
          {block.fields.map((field) => {
            const before = field.before?.[data]
            const after = field.after?.[data]
            const changed = before !== after
            return (
              <tr key={field.name} className={cx(changed ? styles.changed : styles.same)}>
                <th scope="row">{field.name}</th>
                <td className={cx(styles.before, before === undefined && styles.empty)}>{before ?? study.record.empty}</td>
                <td className={cx(styles.after, after === undefined && styles.empty)}>{after ?? study.record.empty}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      {block.note && <p className={styles.note}>{block.note[language]}</p>}
    </div>
  )
}
