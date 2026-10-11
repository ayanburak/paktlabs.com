/*
file: ServiceNote.tsx
importable: ServiceNote

Panodaki tek bir hizmet kagidi. Kagidin tamami hizmet sayfasina giden bir
baglantidir, site icinde gecis yapar, sayfa yeniden yuklenmez. Egiklik ve
belirme sirasi kagidin listedeki yerinden gelir, bilesen bunu bilmez.

description: Raptiyeyle tutturulmus, hizmet sayfasina giden tek bir kagit.
*/

import { Link } from 'react-router-dom'

import { useReveal } from '@paktlabs/brand/hooks/useReveal'
import { cx } from '@paktlabs/brand/lib/cx'

import styles from './ServiceNote.module.css'

interface ServiceNoteProps {
  number: string
  title: string
  summary: string
  go: string
  to: string
}

// Gorunmez baslama ve klavye odaginda hemen belirme brand'deki reveal'dan
// gelir, kagidin dusme hareketi kendi stilinde. Raptiye susleme oldugu icin
// CSS ile cizilir, ekran okuyucuya bir sey okutmaz.
export function ServiceNote({ number, title, summary, go, to }: ServiceNoteProps) {
  const { ref, visible } = useReveal<HTMLAnchorElement>()

  return (
    <Link ref={ref} to={to} className={cx('reveal', visible && 'in', styles.note)}>
      <span className={styles.number}>{number}</span>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.summary}>{summary}</p>
      <span className={styles.go}>{go}</span>
    </Link>
  )
}
