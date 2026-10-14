/*
file: Calc.tsx
importable: Calc

Bir sayinin nereden ciktigini satir satir gosteren hesap. Ustte kucuk
etiket, baslik ve istege bagli tek cumlelik okuma, sekillerle ayni
olcude. Her satirda solda islem, ortada ne oldugu ve kisa aciklamasi,
sagda degeri. Son satir sonuctur, kalin bir cizgiyle ayrilir ve degeri
altin zeminde yazar. Sekil degil duz bir listedir, ekran okuyucu satirlari
tek tek okur.

description: Bir sonucun hangi sayilardan nasil hesaplandigini satir satir gosteren parca.
*/

import { useReveal } from '@paktlabs/brand/hooks/useReveal'
import { useLanguage } from '@paktlabs/brand/i18n/language'
import { cx } from '@paktlabs/brand/lib/cx'

import type { CalcBlock } from '@/content/studies/blocks'

import styles from './Calc.module.css'
import figure from './Figure.module.css'

interface CalcProps {
  block: CalcBlock
}

export function Calc({ block }: CalcProps) {
  const { language } = useLanguage()
  const { ref, visible } = useReveal<HTMLElement>()
  const last = block.steps.length - 1

  return (
    <section ref={ref} className={cx('reveal', visible && 'in', styles.calc)}>
      <header>
        <span className="eyebrow">{block.label[language]}</span>
        <h3 className={figure.title}>{block.title[language]}</h3>
        {block.reading && <p className={figure.reading}>{block.reading[language]}</p>}
      </header>
      <ol className={styles.steps}>
        {block.steps.map((step, index) => (
          <li key={index} className={cx(index === last && styles.result)}>
            <span className={styles.op} aria-hidden="true">
              {step.op}
            </span>
            <span className={styles.label}>
              {step.label[language]}
              {step.detail && <small>{step.detail[language]}</small>}
            </span>
            <b className={styles.value}>{step.value[language]}</b>
          </li>
        ))}
      </ol>
    </section>
  )
}
