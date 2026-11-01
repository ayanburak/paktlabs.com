/*
file: Acceptance.tsx
importable: Acceptance

Isin basinda konusulan hedefler ve teslimde olculen sonuclar, satir satir.
Her satirin sonunda hedefin tutup tutmadigi bir etiketle yazar, tutmayan
hedefin etiketi altin zeminlidir. Sutun basliklari ve etiketler sitenin
sozlugunden gelir.

description: Kabul olcutlerini hedef, teslimdeki sonuc ve durumlariyla gosteren tablo parcasi.
*/

import { useLanguage } from '@paktlabs/brand/i18n/language'
import { cx } from '@paktlabs/brand/lib/cx'

import type { AcceptanceBlock } from '@/content/studies/blocks'
import { useDict } from '@/i18n'

import styles from './Acceptance.module.css'

interface AcceptanceProps {
  block: AcceptanceBlock
}

// Olcutun Ingilizce metni satirin anahtari, ayni tabloda iki olcut ayni adi
// tasimaz. Durum sutununun basligi gozden gizli, isaretin kendisi ne oldugunu
// soyluyor ama ekran okuyucu sutunun adini yine duyar.
export function Acceptance({ block }: AcceptanceProps) {
  const { language } = useLanguage()
  const { study } = useDict()
  const dict = study.acceptance

  return (
    <table className={styles.acceptance}>
      <thead>
        <tr>
          <th>{dict.criterion}</th>
          <th>{dict.target}</th>
          <th>{dict.result}</th>
          <th>
            <span className="sr">{dict.status}</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {block.rows.map((row) => (
          <tr key={row.criterion.en}>
            <td>{row.criterion[language]}</td>
            <td className={styles.number}>{row.target[language]}</td>
            <td className={styles.number}>{row.result[language]}</td>
            <td>
              <span className={cx(styles.status, !row.met && styles.missed)}>{row.met ? dict.met : dict.missed}</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
