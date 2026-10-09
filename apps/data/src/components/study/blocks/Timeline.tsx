/*
file: Timeline.tsx
importable: Timeline

Zaman cizelgesi. Solda isler, sagda donemler boyunca uzanan cubuklar. Cubuk
isin basladigi donemden baslar ve suresi kadar uzanir, yarim donemler de
cizilebilir. Vurgulu isler altin cizilir, altindaki aciklama neden vurgulu
olduklarini soyler.

description: Bir isin takvimini donemlere yayilan cubuklarla gosteren parca.
*/

import type { CSSProperties } from 'react'

import { useReveal } from '@paktlabs/brand/hooks/useReveal'
import { useLanguage } from '@paktlabs/brand/i18n/language'
import { cx } from '@paktlabs/brand/lib/cx'

import type { TimelineBlock } from '@/content/studies/blocks'
import { useDict } from '@/i18n'

import styles from './Timeline.module.css'

interface TimelineProps {
  block: TimelineBlock
}

// Cizelge ekran okuyucuya bir tablo olarak tanitilir, her satir bir is.
// Cubugun yeri ve genisligi donem sayisina gore stil dosyasinda hesaplanir.
// Dar ekranda cizelge kendi kutusunda yana kayar.
export function Timeline({ block }: TimelineProps) {
  const { language } = useLanguage()
  const { study } = useDict()
  const { ref, visible } = useReveal<HTMLDivElement>()
  const periods = Array.from({ length: block.periods }, (_, index) => `${block.periodLabel[language]}${index + 1}`)

  return (
    <div ref={ref} className={cx('reveal', visible && 'in')}>
      <div className={styles.timeline} style={{ '--n': block.periods } as CSSProperties} role="table" aria-label={study.timeline.label}>
        <div className={cx(styles.row, styles.head)} role="row">
          <span role="columnheader">{study.timeline.task}</span>
          {periods.map((period) => (
            <span key={period} role="columnheader">
              {period}
            </span>
          ))}
        </div>
        {block.tasks.map((task) => (
          <div key={task.label[language]} className={styles.row} role="row">
            <span className={styles.task} role="cell">
              {task.label[language]}
            </span>
            <span className={styles.track} role="cell">
              <i
                className={cx(task.highlight && styles.highlight)}
                style={{ '--s': task.start, '--l': task.length } as CSSProperties}
              />
            </span>
          </div>
        ))}
      </div>
      {block.legend && <p className={styles.legend}>{block.legend[language]}</p>}
    </div>
  )
}
