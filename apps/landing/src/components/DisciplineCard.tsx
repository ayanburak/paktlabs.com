/*
file: DisciplineCard.tsx
importable: DisciplineCard

Disiplinler bandindaki uc kartin uc somut kullanimi ayni sekli paylasiyor,
bu yuzden tek bilesende toplandi. href disiplinin kendi subdomain adresi,
content/disciplines.ts'ten gelir. Kartlar iletisim sayfasindaki secenek
kutularinin dilini konusur: ekrana girince sirayla yukaridan duser, uzerine
gelince ya da klavyeyle odaklaninca koyulasir ve yazilari altina doner.
index kartin sirasidir, dusme gecikmesi ondan hesaplanir.

description: Ust kisa baslikli, alt paneli detay tasiyan, hover'da birlikte kalkan disiplin karti.
*/

import type { CSSProperties } from 'react'

import { useReveal } from '@paktlabs/brand/hooks/useReveal'
import { cx } from '@paktlabs/brand/lib/cx'

import styles from './DisciplineCard.module.css'

interface DisciplineCardProps {
  index: number
  title: string
  description: string
  go: string
  href: string
}

// Gorunmez baslama ve klavye odaginda hemen belirme brand'deki reveal'dan
// gelir, yalnizca hareketin yonu ve suresi kartin kendi stilinde degisir.
export function DisciplineCard({ index, title, description, go, href }: DisciplineCardProps) {
  const { ref, visible } = useReveal<HTMLAnchorElement>()

  return (
    <a
      ref={ref}
      href={href}
      className={cx('reveal', visible && 'in', styles.card)}
      style={{ '--i': index } as CSSProperties}
    >
      <div className={styles.head}>
        <h3>{title}</h3>
      </div>
      <div className={styles.panel}>
        <p>{description}</p>
        <span className={styles.go}>{go}</span>
      </div>
    </a>
  )
}
