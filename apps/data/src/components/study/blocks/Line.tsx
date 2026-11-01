/*
file: Line.tsx
importable: Line

Bir degerin zaman icinde nasil degistigini gosteren cizgi sekli. Etiket,
soru, okuma ve altindaki parcalar ortak Figure cercevesinden gelir. Cizgi
SVG ile, eksen yazilari, noktalar ve uctaki etiketler HTML ile cizilir,
olceklenen bir SVG icindeki yazi dar ekranda okunmayacak kadar kuculurdu.
Eksen sifirdan baslar ve kesilmez.

description: Bir ya da birkac serinin zaman icindeki degisimini cizen sekil parcasi.
*/

import type { CSSProperties } from 'react'

import { useLanguage } from '@paktlabs/brand/i18n/language'
import { cx } from '@paktlabs/brand/lib/cx'

import type { LineBlock, LineSeries } from '@/content/studies/blocks'

import { Figure } from './Figure'
import { formatValue } from './format'
import styles from './Line.module.css'

// Iki uc etiketi arasinda en az bu kadar yuzde, yani yaklasik yirmi dokuz
// piksel kalir. Son degerleri birbirine yakin iki seride etiketler ust uste
// binmesin diye.
const LABEL_GAP = 12

// Serinin rengi: vurgulu seri altin, vurgusuz ilk seri murekkep, sonrakiler gri.
function tones(series: LineSeries[]): string[] {
  let plain = 0
  return series.map((item) => (item.highlight ? 'gold' : plain++ === 0 ? 'ink' : 'gray'))
}

// Uc etiketlerinin dikey yerleri. Yukaridan asagi siralanir, birbirine
// LABEL_GAP'tan yakin olan asagi itilir, en alttaki tasarsa hepsi yukari
// kaydirilir. Donen liste serilerin kendi sirasindadir.
function labelPositions(ys: number[]): number[] {
  const order = ys.map((y, index) => ({ y, index })).sort((a, b) => a.y - b.y)
  for (let i = 1; i < order.length; i++) {
    const prev = order[i - 1]
    const item = order[i]
    if (prev && item && item.y - prev.y < LABEL_GAP) item.y = prev.y + LABEL_GAP
  }
  const last = order[order.length - 1]
  const overflow = last ? Math.max(0, last.y - 100) : 0
  const out: number[] = []
  for (const item of order) out[item.index] = item.y - overflow
  return out
}

interface LineProps {
  block: LineBlock
}

// Noktalar x ekseninde esit araliklarla dizilir, donemlerin uzunlugu
// farkliysa bu cizimde gorunmez. Serilerin sonundaki etiketler labelPositions
// ile birbirinin ustune binmeyecek sekilde kaydirilir.
export function Line({ block }: LineProps) {
  const { language } = useLanguage()
  const value = (n: number, decimals = block.decimals) => formatValue(n, block.unit, decimals, language)
  const x = (index: number) => (block.points.length > 1 ? (index / (block.points.length - 1)) * 100 : 50)
  const y = (n: number) => 100 - (n / block.max) * 100
  const tone = tones(block.series)
  const ends = labelPositions(block.series.map((item) => y(item.values[item.values.length - 1] ?? 0)))
  const first = block.points[0]?.[language] ?? ''
  const last = block.points[block.points.length - 1]?.[language] ?? ''

  // Ekran okuyucuya her serinin ilk ve son degeri okunur, ara degerler
  // altindaki acilir kutudaki tabloda.
  const description = [
    block.title[language],
    ...block.series.map(
      (item) => `${item.label[language]}: ${first} ${value(item.values[0] ?? 0)}, ${last} ${value(item.values[item.values.length - 1] ?? 0)}`,
    ),
  ].join('. ')

  return (
    <Figure
      label={block.label[language]}
      title={block.title[language]}
      reading={block.reading[language]}
      description={description}
      blocks={block.blocks}
    >
      <div className={cx(styles.line, block.points.length > 8 && styles.dense)} aria-hidden="true">
        <div className={styles.axis}>
          {block.ticks.map((tick) => (
            <span key={tick} style={{ '--y': `${y(tick)}%` } as CSSProperties}>
              {value(tick, 0)}
            </span>
          ))}
        </div>
        <div className={styles.plot}>
          {block.ticks
            .filter((tick) => tick > 0)
            .map((tick) => (
              <i key={tick} className={styles.grid} style={{ '--y': `${y(tick)}%` } as CSSProperties} />
            ))}
          <svg className={styles.svg} viewBox="0 0 100 100" preserveAspectRatio="none">
            {block.series.map((item, index) => (
              <polyline
                key={item.label.en}
                className={styles[tone[index] ?? 'ink']}
                points={item.values.map((n, i) => `${x(i)},${y(n)}`).join(' ')}
              />
            ))}
          </svg>
          {block.series.map((item, index) =>
            item.values.map((n, i) => (
              <span
                key={`${item.label.en}-${i}`}
                className={cx(styles.dot, styles[tone[index] ?? 'ink'])}
                style={{ '--x': `${x(i)}%`, '--y': `${y(n)}%` } as CSSProperties}
              />
            )),
          )}
        </div>
        <div className={styles.ends}>
          {block.series.map((item, index) => (
            <span key={item.label.en} style={{ '--y': `${ends[index] ?? 0}%` } as CSSProperties}>
              <b>{value(item.values[item.values.length - 1] ?? 0)}</b>
              {item.label[language]}
            </span>
          ))}
        </div>
        <div className={styles.points}>
          {block.points.map((point, index) => (
            <span key={point.en} style={{ '--x': `${x(index)}%` } as CSSProperties}>
              {point[language]}
            </span>
          ))}
        </div>
      </div>
    </Figure>
  )
}
