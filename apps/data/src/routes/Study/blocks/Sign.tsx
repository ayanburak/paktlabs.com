/*
file: Sign.tsx
importable: Sign

Acilir kutularin sagindaki arti isareti. Iki cizgiden yapilir, kutu acilinca
dikey cizgi yatar ve eksiye doner. Bolumdeki acilir kutu ve istasyonlarin
ayrinti seridi ayni isareti farkli boyda kullanir.

description: Acilir kutunun acik ya da kapali oldugunu gosteren arti isareti.
*/

import { cx } from '@paktlabs/brand/lib/cx'

import styles from './Sign.module.css'

interface SignProps {
  small?: boolean
}

// Isaret yalnizca gorsel, ekran okuyucu durumu details ogesinden ogrenir.
// Renk ve donus, isaretin icinde durdugu summary'nin acik olup olmamasina
// gore stil dosyasinda degisir.
export function Sign({ small }: SignProps) {
  return <span className={cx(styles.sign, small && styles.small)} aria-hidden="true" />
}
