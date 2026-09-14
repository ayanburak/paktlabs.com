/*
file: DisciplineCard.tsx
importable: DisciplineCard

Disiplinler bandindaki uc kartin uc somut kullanimi ayni sekli paylasiyor,
bu yuzden tek bilesende toplandi. href su an bos gecilebilir, gercek disiplin
sayfalari kurulana kadar mockup'taki gibi tanimsiz kalmasi bilinerek boyle birakildi.

description: Ust kisa baslikli, alt paneli detay tasiyan, hover'da birlikte kalkan disiplin karti.
*/

import { useReveal } from '@/hooks/useReveal'
import { cx } from '@/lib/cx'

import styles from './DisciplineCard.module.css'

interface DisciplineCardProps {
  title: string
  description: string
  go: string
  href: string
}

export function DisciplineCard({ title, description, go, href }: DisciplineCardProps) {
  const { ref, visible } = useReveal<HTMLAnchorElement>()

  return (
    <a ref={ref} href={href} className={cx('reveal', visible && 'in', styles.card)}>
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
