/*
file: Correlation.tsx
importable: Correlation

Degiskenlerin ikiser ikiser ne kadar birlikte hareket ettigini gosteren
korelasyon tablosu. Etiket, soru, okuma ve altindaki parcalar ortak Figure
cercevesinden gelir. Yalnizca alt ucgen cizilir, kosegende 1 yazan kesikli
hucreler durur. Arti katsayi murekkebin bes kademesinde, eksi katsayi altina
dogru koyulasir.
Altta iki yonlu bir olcek ve katsayinin neden sonuc gostermedigini soyleyen
not durur.

description: Degiskenler arasindaki katsayilari alt ucgen bir tabloda gosteren sekil parcasi.
*/

import type { CSSProperties } from 'react'

import { type Language, useLanguage } from '@paktlabs/brand/i18n/language'
import { cx } from '@paktlabs/brand/lib/cx'

import type { CorrelationBlock } from '@/content/studies/blocks'
import { useDict } from '@/i18n'

import styles from './Correlation.module.css'
import { Figure } from './Figure'
import { localeFor } from './format'
import { shade } from './shade'

// Bu degerin ustundeki katsayinin hucresi cerceve alir, zayif iliskiler
// zemine karisir ve goz once guclu olanlara gider.
const STRONG = 0.3

// Katsayi her zaman isaretiyle ve iki haneyle yazilir: +0,12 ve -0,62.
// Eksi icin kisa cizgi degil gercek eksi isareti kullanilir.
function coefficient(n: number, language: Language): string {
  const digits = new Intl.NumberFormat(localeFor(language), { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(Math.abs(n))
  return `${n > 0 ? '+' : n < 0 ? '−' : ''}${digits}`
}

interface CorrelationProps {
  block: CorrelationBlock
}

// Tablo yalnizca alt ucgeni doldurur, ust ucgen ayni sayilarin tekrari
// olurdu. Kosegen her zaman 1 oldugu icin icerikten okunmaz, dogrudan
// yazilir.
export function Correlation({ block }: CorrelationProps) {
  const { language } = useLanguage()
  const { study } = useDict()
  const names = block.variables.map((variable) => variable[language])

  const description = [
    block.title[language],
    ...block.values.flatMap((row, i) => row.map((n, j) => `${names[i]} ${names[j]}: ${coefficient(n, language)}`)),
  ].join('. ')

  return (
    <Figure
      label={block.label[language]}
      title={block.title[language]}
      reading={block.reading[language]}
      description={description}
      after={<p className={styles.note}>{study.correlation.note}</p>}
      blocks={block.blocks}
    >
      <div aria-hidden="true">
        <div className={styles.scroll}>
          <table className={styles.corr}>
            <thead>
              <tr>
                <th />
                {names.map((name) => (
                  <th key={name}>{name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {names.map((name, i) => (
                <tr key={name}>
                  <th>{name}</th>
                  {names.map((_, j) => {
                    if (j > i) return <td key={j} />
                    if (j === i)
                      return (
                        <td key={j} className={styles.self}>
                          1
                        </td>
                      )
                    const n = block.values[i]?.[j] ?? 0
                    // Arti yon murekkebin bes kademesini kullanir. Altin acik bir
                    // renk oldugu icin uzerindeki yazi her koyulukta murekkep
                    // kalir, eksi yon bu yuzden surekli koyulasir ve ayni
                    // katsayida daha koyu karistirilir, iki yonun gucu goze esit
                    // gorunsun diye.
                    const step = shade(Math.abs(n))
                    const depth = n < 0 ? Math.min(100, Math.round(Math.abs(n) * 140)) : step.depth
                    return (
                      <td
                        key={j}
                        className={cx(
                          n >= 0 ? styles.positive : styles.negative,
                          Math.abs(n) >= STRONG && styles.strong,
                          n > 0 && step.light && styles.light,
                        )}
                        style={{ '--depth': `${depth}%` } as CSSProperties}
                      >
                        {coefficient(n, language)}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={styles.scale}>
          {'\u22121'}
          <i className={styles.negativeScale} />0<i className={styles.positiveScale} />
          +1
        </div>
      </div>
    </Figure>
  )
}
