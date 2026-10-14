/*
file: Pie.tsx
importable: Pie

Tek bir butunun az sayida parcaya bolunusunu gosteren pasta sekli. Etiket,
soru, okuma ve altindaki parcalar ortak Figure cercevesinden gelir. Dilimler
SVG ile, yuzdeler HTML ile cizilir. En buyuk dilim saat on ikiden baslar,
saat yonunde kuculur. Sagda dilimlerin adlari ve yuzdeleri bir liste olarak
durur.

description: Tek bir butunun dilimlerini ve yuzdelerini gosteren pasta sekli parcasi.
*/

import { type CSSProperties, useId } from 'react'

import { useLanguage } from '@paktlabs/brand/i18n/language'
import { cx } from '@paktlabs/brand/lib/cx'

import type { PieBlock } from '@/content/studies/blocks'

import { Figure } from './Figure'
import { formatValue } from './format'
import styles from './Pie.module.css'

// Dilim renkleri siradan gelir, en buyuk dilim murekkep, ikincisi altin.
const TONES = ['ink', 'gold', 'gray', 'light', 'hatched'] as const

// Bu yuzdenin altindaki dilimin degeri dilimin ustune yazilmaz, sigmazdi.
// Degeri yanindaki listede yazar.
const MIN_LABEL = 8

// Dairenin merkezinden aci ve uzakliga gore nokta. Aci saat on ikiden
// baslar ve saat yonunde artar, birim radyan. Daire 0 ile 100 arasinda.
function point(angle: number, radius: number): [number, number] {
  return [50 + radius * Math.sin(angle), 50 - radius * Math.cos(angle)]
}

interface PieProps {
  block: PieBlock
}

export function Pie({ block }: PieProps) {
  const { language } = useLanguage()
  // Taramali dilimin deseni SVG icinde tanimlanir, ayni sayfadaki iki pasta
  // birbirinin desenine baglanmasin diye adi her pastada farkli.
  const hatch = `hatch-${useId().replace(/:/g, '')}`
  const percent = (n: number) => formatValue(n, 'percent', 0, language)

  // Her dilimin baslangic acisi, kendinden onceki dilimlerin toplamidir.
  const starts = block.slices.map((_, index) =>
    block.slices.slice(0, index).reduce((sum, slice) => sum + (slice.value / 100) * Math.PI * 2, 0),
  )
  const slices = block.slices.map((slice, index) => {
    const start = starts[index] ?? 0
    const end = start + (slice.value / 100) * Math.PI * 2
    const [x0, y0] = point(start, 50)
    const [x1, y1] = point(end, 50)
    const [lx, ly] = point((start + end) / 2, 33)
    const large = end - start > Math.PI ? 1 : 0
    return { slice, tone: TONES[index] ?? 'light', path: `M50 50 L${x0} ${y0} A50 50 0 ${large} 1 ${x1} ${y1} Z`, lx, ly }
  })

  const description = [block.title[language], ...block.slices.map((slice) => `${slice.label[language]}: ${percent(slice.value)}`)].join(
    '. ',
  )

  return (
    <Figure
      label={block.label[language]}
      title={block.title[language]}
      reading={block.reading[language]}
      description={description}
      blocks={block.blocks}
    >
      <div className={styles.pie} aria-hidden="true">
        <div className={styles.disc}>
          <svg viewBox="0 0 100 100">
            <defs>
              <pattern id={hatch} width="3.5" height="3.5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <rect width="3.5" height="3.5" className={styles.hatchBase} />
                <rect width="0.75" height="3.5" className={styles.hatchLine} />
              </pattern>
            </defs>
            {slices.map(({ slice, tone, path }) => (
              <path
                key={slice.label.en}
                d={path}
                className={styles[tone]}
                style={tone === 'hatched' ? { fill: `url(#${hatch})` } : undefined}
              />
            ))}
            <circle cx="50" cy="50" r="49.5" className={styles.rim} />
          </svg>
          {slices
            .filter(({ slice }) => slice.value >= MIN_LABEL)
            .map(({ slice, tone, lx, ly }) => (
              <span
                key={slice.label.en}
                className={cx(styles.value, tone === 'ink' && styles.onInk)}
                style={{ '--x': `${lx}%`, '--y': `${ly}%` } as CSSProperties}
              >
                {percent(slice.value)}
              </span>
            ))}
        </div>
        <ul className={styles.list}>
          {slices.map(({ slice, tone }) => (
            <li key={slice.label.en}>
              <i className={cx(styles.key, styles[`key-${tone}`])} />
              {slice.label[language]}
              <b>{percent(slice.value)}</b>
            </li>
          ))}
        </ul>
      </div>
    </Figure>
  )
}
