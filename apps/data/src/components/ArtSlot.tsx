/*
file: ArtSlot.tsx
importable: ArtSlot

Henuz cizilmemis bir illustrasyonun yerini tutan kesikli kutu. Icinde
alanin kodu, dosya adi ve cizimin nasil olmasi gerektigi yazar. Cizim
hazir oldugunda bilesen kaldirilir, yerine ayni kutuya tek bir img konur.

    <figure className={styles.art}>
      <ArtSlot label={slot.label} note={slot.note} />
    </figure>

description: Cizilmemis bir illustrasyon icin kesikli cizgili, aciklamali yer tutucu kutu.
*/

import { cx } from '@paktlabs/brand/lib/cx'

import styles from './ArtSlot.module.css'

// floating, figurun ayaklari bir cizgiye basmayacaksa verilir, kutunun alt
// kenari da cizilir.
interface ArtSlotProps {
  label: string
  note: string
  floating?: boolean
}

// Kutu ekran okuyucuya okunur, cunku icindeki not sayfada gercekten gorunen
// bir metin. Tasarim karari geregi canlida da gorunur, cizim gelene kadar
// sayfa bilerek bu haliyle durur.
export function ArtSlot({ label, note, floating = false }: ArtSlotProps) {
  return (
    <div className={cx(styles.slot, floating && styles.floating)}>
      <span className={styles.label}>{label}</span>
      <p className={styles.note}>{note}</p>
    </div>
  )
}
