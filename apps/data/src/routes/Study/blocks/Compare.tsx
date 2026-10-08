/*
file: Compare.tsx
importable: Compare

Once ve sonra karsilastirmasi. Her satirda neyin olculdugu, isten onceki ve
sonraki hali. Sonra sutunu koyu baslikli ve acik zeminli, gozun once
degisime gitmesi icin. Dar ekranda satir adi ustte tam genislikte, iki hal
altinda yan yana durur.

description: Bir isin oncesini ve sonrasini satir satir karsilastiran parca.
*/

import { Fragment } from 'react'

import { useReveal } from '@paktlabs/brand/hooks/useReveal'
import { useLanguage } from '@paktlabs/brand/i18n/language'
import { cx } from '@paktlabs/brand/lib/cx'

import type { CompareBlock } from '@/content/studies/blocks'
import { useDict } from '@/i18n'

import styles from './Compare.module.css'

interface CompareProps {
  block: CompareBlock
}

// Izgara uc sutunlu duz bir hucre dizisi, ekran okuyucuya tablo rolleriyle
// tanitilir. Sutun basliklari sitenin sozlugunden gelir. Kalin bas ile
// devami arasina bosluk konur, devam virgul ya da noktayla basliyorsa konmaz,
// "Bir, kaynaklari altinda listeli" gibi.
export function Compare({ block }: CompareProps) {
  const { language } = useLanguage()
  const { study } = useDict()
  const { ref, visible } = useReveal<HTMLDivElement>()

  return (
    <div
      ref={ref}
      className={cx('reveal', visible && 'in', styles.compare)}
      role="table"
      aria-label={`${study.compare.before} / ${study.compare.after}`}
    >
      <span className={styles.head} role="columnheader" />
      <span className={styles.head} role="columnheader">
        {study.compare.before}
      </span>
      <span className={cx(styles.head, styles.afterHead)} role="columnheader">
        {study.compare.after}
      </span>
      {block.rows.map((row) => (
        <Fragment key={row.label[language]}>
          <span className={styles.label} role="rowheader">
            {row.label[language]}
          </span>
          <span className={styles.before} role="cell">
            {row.before[language]}
          </span>
          <span className={styles.after} role="cell">
            {row.lead && <strong>{row.lead[language]}</strong>}
            {row.lead && !/^[,.;:]/.test(row.after[language]) && ' '}
            {row.after[language]}
          </span>
        </Fragment>
      ))}
    </div>
  )
}
