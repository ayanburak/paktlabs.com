/*
file: Outcomes.tsx
importable: Outcomes

Hizmetin teslim bolumu. Altin zeminli bantta baslik ve asimetrik bir izgara
durur: solda iki satir boyunca uzanan koyu buyuk kutuda isin ana sonucu,
sagda dort kucuk kutuda yaninda gelenler.

description: Is bittiginde elde kalanlari altin bantta buyuk ve kucuk kutularla gosteren bolum.
*/

import type { Service } from '../../content/service'
import { useLanguage } from '../../i18n/language'
import { useBrandDict } from '../../i18n/useBrandDict'
import { cx } from '../../lib/cx'

import section from './section.module.css'
import styles from './Outcomes.module.css'

// Kutularin hepsi ayni listenin ogeleri, buyuk kutuyu yalnizca CSS ayirir.
// Kutularda numara yok, sira bir anlam tasimiyor.
export function Outcomes({ outcomes }: { outcomes: Service['outcomes'] }) {
  const { language } = useLanguage()
  const { service: dict } = useBrandDict()
  const rows = [outcomes.lead, ...outcomes.items]

  return (
    <section className={cx(section.section, styles.outcomes)} aria-labelledby="service-outcomes">
      <div className={section.inner}>
        <span className="eyebrow">{dict.outcomes.label}</span>
        <h2 id="service-outcomes" className={section.title}>
          {dict.outcomes.title}
        </h2>
        <ul className={styles.grid}>
          {rows.map((row) => (
            <li key={row.title.en}>
              <h3>{row.title[language]}</h3>
              <p>{row.text[language]}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
