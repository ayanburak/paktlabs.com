/*
file: Rows.tsx
importable: Rows

Kapsam ve surec bolumlerinin satir listesi. Her satirda solda sira
numarasi, ortada kalin baslik, sagda tek cumle durur, satirlari iki
piksellik murekkep cizgi ayirir.

description: Hizmet sayfasindaki numarali baslik ve cumle satirlarini dizen liste.
*/

import type { ServiceRow } from '../../content/service'
import { useLanguage } from '../../i18n/language'
import { sequenceNumber } from '../../lib/sequenceNumber'

import styles from './Rows.module.css'

// Numara sayfada gorunen metnin parcasi oldugu icin liste ol degil ul.
// ol kullanilsaydi ekran okuyucu numarayi bir kez listeden bir kez metinden
// olmak uzere iki kez okurdu.
export function Rows({ rows }: { rows: ServiceRow[] }) {
  const { language } = useLanguage()

  return (
    <ul className={styles.rows}>
      {rows.map((row, i) => (
        <li key={row.title.en}>
          <span className={styles.number}>{sequenceNumber(i)}</span>
          <h3>{row.title[language]}</h3>
          <p>{row.text[language]}</p>
        </li>
      ))}
    </ul>
  )
}
