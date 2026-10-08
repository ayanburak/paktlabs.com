/*
file: Chart.tsx
importable: Chart

Tek bir soruya cevap veren cubuk sekli. Ustte kucuk etiket, soru ve tek
cumlelik okuma, ortada sekil, altta istege bagli parcalar, genellikle
verisini tasiyan acilir kutu. Sekil HTML ve CSS ile cizilir, olceklenen bir
SVG icindeki yazi dar ekranda okunmayacak kadar kuculurdu. Eksen sifirdan
baslar ve kesilmez, degerler cubugun hemen ucunda yazar.

description: Dikey ya da yatay cubuk seklini basligi, okumasi ve verisiyle gosteren parca.
*/

import type { CSSProperties } from 'react'

import { useReveal } from '@paktlabs/brand/hooks/useReveal'
import { type Language, useLanguage } from '@paktlabs/brand/i18n/language'
import { cx } from '@paktlabs/brand/lib/cx'

import type { ChartBar, ChartBlock, ChartZone } from '@/content/studies/blocks'

import { BlockView } from './BlockView'
import styles from './Chart.module.css'
import { formatValue } from './format'

interface PlotProps {
  block: ChartBlock
  language: Language
}

// Bolgeler cubuk sirasina gore art arda gelen ayni bolgeli cubuklardan
// kurulur, her bolgenin genisligi kac cubuk tuttugudur.
function zoneSpans(bars: ChartBar[], zones: ChartZone[]) {
  const spans: { zone: ChartZone; count: number }[] = []
  for (const bar of bars) {
    const last = spans[spans.length - 1]
    if (last && last.zone.id === bar.zone) last.count++
    else {
      const zone = zones.find((item) => item.id === bar.zone)
      if (zone) spans.push({ zone, count: 1 })
    }
  }
  return spans
}

// Dikey sutunlar. Ustte deger yazisi icin pay birakilir, cubuk yuksekligi
// bu payin altindaki alana gore hesaplanir. Bolgeli sutunlarin zemini
// bolgenin rengini alir, bolge adlari en altta bir bant olarak durur.
function Vertical({ block, language }: PlotProps) {
  const zones = block.zones ?? []
  const style = (bar: ChartBar) => zones.find((zone) => zone.id === bar.zone)?.style ?? 'none'

  return (
    <div className={styles.vertical} style={{ '--n': block.bars.length } as CSSProperties} aria-hidden="true">
      <div className={styles.plot}>
        {block.ticks.map((tick) => (
          <span key={tick} className={styles.grid} style={{ '--y': (tick / block.max) * 100 } as CSSProperties}>
            <em>{formatValue(tick, block.unit, 0, language)}</em>
          </span>
        ))}
        {block.bars.map((bar) => (
          <div
            key={bar.label[language]}
            className={cx(styles.column, styles[style(bar)])}
            style={{ '--h': (bar.value / block.max) * 100 } as CSSProperties}
          >
            <span className={cx(styles.bar, bar.highlight && styles.highlight)} />
            <b className={styles.value}>{formatValue(bar.value, block.unit, block.decimals, language)}</b>
          </div>
        ))}
      </div>
      <div className={styles.labels}>
        {block.bars.map((bar) => (
          <span key={bar.label[language]}>{bar.label[language]}</span>
        ))}
      </div>
      {zones.length > 0 && (
        <div
          className={styles.zones}
          style={{ gridTemplateColumns: zoneSpans(block.bars, zones).map((span) => `${span.count}fr`).join(' ') }}
        >
          {zoneSpans(block.bars, zones).map((span) => (
            <span key={span.zone.id} className={styles[span.zone.style]}>
              {span.zone.label[language]}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

// Yatay cubuklar. Solda ad, sagda eksen boyunca cubuk ve hemen ucunda deger.
// Cizgiler eksen degerlerinin hizasinda durur. Grup basligi verilen cubugun
// ustunde yeni bir grup acilir.
function Horizontal({ block, language }: PlotProps) {
  const step = 100 / (block.ticks.length - 1)

  return (
    <div className={styles.horizontal} style={{ '--step': `${step}%` } as CSSProperties} aria-hidden="true">
      {block.bars.map((bar) => (
        <div key={bar.label[language]}>
          {bar.group && <div className={styles.group}>{bar.group[language]}</div>}
          <div className={styles.row}>
            <span className={styles.name}>{bar.label[language]}</span>
            <span className={styles.track} style={{ '--w': `${(bar.value / block.max) * 100}%` } as CSSProperties}>
              <i className={cx(bar.highlight && styles.highlight)} />
              <b>{formatValue(bar.value, block.unit, block.decimals, language)}</b>
            </span>
          </div>
        </div>
      ))}
      <div className={styles.row}>
        <span />
        <span className={styles.ticks}>
          {block.ticks.map((tick) => (
            <em key={tick} style={{ '--x': `${(tick / block.max) * 100}%` } as CSSProperties}>
              {formatValue(tick, block.unit, 0, language)}
            </em>
          ))}
        </span>
      </div>
    </div>
  )
}

interface ChartProps {
  block: ChartBlock
}

// Sekil ekran okuyucuya tek bir gorsel olarak, butun degerleriyle okunan bir
// aciklamayla tanitilir. Aciklama elle yazilmaz, cubuklardan uretilir,
// boylece sekil degisince aciklama eskimez.
export function Chart({ block }: ChartProps) {
  const { language } = useLanguage()
  const { ref, visible } = useReveal<HTMLElement>()
  const description = [
    block.title[language],
    ...block.bars.map((bar) => `${bar.label[language]}: ${formatValue(bar.value, block.unit, block.decimals, language)}`),
  ].join('. ')

  return (
    <figure ref={ref} className={cx('reveal', visible && 'in', styles.figure)}>
      <figcaption>
        <span className="eyebrow">{block.label[language]}</span>
        <h3 className={styles.title}>{block.title[language]}</h3>
        <p className={styles.reading}>{block.reading[language]}</p>
      </figcaption>
      <div role="img" aria-label={description}>
        {block.direction === 'vertical' ? (
          <Vertical block={block} language={language} />
        ) : (
          <Horizontal block={block} language={language} />
        )}
      </div>
      {block.blocks?.map((inner, index) => (
        <BlockView key={index} block={inner} />
      ))}
    </figure>
  )
}
