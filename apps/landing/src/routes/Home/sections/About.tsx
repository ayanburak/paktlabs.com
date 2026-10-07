/*
file: About.tsx
importable: About

description: Biz kimiz bolumu, ortalanmis tek bir baslik blogundan olusur.
*/

import { useReveal } from '@paktlabs/brand/hooks/useReveal'
import { cx } from '@paktlabs/brand/lib/cx'

import { useDict } from '@/i18n'

import styles from './About.module.css'

export function About() {
  const { about } = useDict()
  const { ref, visible } = useReveal<HTMLDivElement>()

  return (
    <section id="hakkinda" className={cx('full-bleed', styles.about)}>
      <div className={styles.grid}>
        <div ref={ref} className={cx('reveal', visible && 'in', styles.copy)}>
          <span className="eyebrow">{about.eyebrow}</span>
          <h2>
            {about.title} <span className={styles.soft}>{about.subtitle}</span>
          </h2>
        </div>
      </div>
    </section>
  )
}
