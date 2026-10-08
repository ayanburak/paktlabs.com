/*
file: Stations.tsx
importable: Stations

Sirayla gecilen adimlar. Istasyonlar soldaki dikey hattin boyunca alt alta
durur, her birinin numarasi hattin uzerinde koyu bir kutuya oturur. Ayrinti
istasyonun alt kenarinda acilan bir seritte durur.

description: Bir surecin adimlarini numarali istasyonlar olarak gosteren parca.
*/

import { useReveal } from '@paktlabs/brand/hooks/useReveal'
import { useLanguage } from '@paktlabs/brand/i18n/language'
import { cx } from '@paktlabs/brand/lib/cx'

import type { Station as StationContent, StationsBlock } from '@/content/studies/blocks'
import { useDict } from '@/i18n'

import { Sign } from './Sign'
import styles from './Stations.module.css'

interface StationProps {
  station: StationContent
}

// Her istasyon ekrana girerken kendi basina belirir, bu yuzden ayri bir
// bilesen. Numara stil dosyasindaki sayactan gelir. Ayrintisi olmayan
// istasyonda serit hic cizilmez.
function Station({ station }: StationProps) {
  const { language } = useLanguage()
  const { study } = useDict()
  const { ref, visible } = useReveal<HTMLElement>()

  return (
    <article ref={ref} className={cx('reveal', visible && 'in', styles.station)}>
      <div className={styles.text}>
        <h3>{station.title[language]}</h3>
        <p>{station.text[language]}</p>
      </div>
      {station.details && (
        <details className={styles.more}>
          <summary>
            <span>{study.stations.more}</span>
            <Sign small />
          </summary>
          <div className={styles.details}>
            {station.details.map((paragraph) => (
              <p key={paragraph[language]}>{paragraph[language]}</p>
            ))}
          </div>
        </details>
      )}
    </article>
  )
}

interface StationsProps {
  block: StationsBlock
}

export function Stations({ block }: StationsProps) {
  const { language } = useLanguage()

  return (
    <div className={styles.line}>
      {block.items.map((station) => (
        <Station key={station.title[language]} station={station} />
      ))}
    </div>
  )
}
