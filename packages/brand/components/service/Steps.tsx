/*
file: Steps.tsx
importable: Steps

Hizmetin surec bolumu. Solda cizim, sagda baslik ve adim satirlari durur.
Cizim bir disiplinin butun hizmetlerinde aynidir, hangi cizimin gelecegini
site verir.

description: Hizmetin hangi adimlarla ilerledigini cizim ve adim satirlariyla anlatan bolum.
*/

import type { ReactNode } from 'react'

import type { ServiceRow } from '../../content/service'
import { useBrandDict } from '../../i18n/useBrandDict'
import { cx } from '../../lib/cx'

import { Rows } from './Rows'
import section from './section.module.css'
import styles from './Steps.module.css'

interface StepsProps {
  rows: ServiceRow[]
  art: ReactNode
}

// Cizim kaynakta metinden once gelir, cunku masaustunde solda duruyor. Dar
// ekranda CSS onu metnin altina indirir.
export function Steps({ rows, art }: StepsProps) {
  const { service: dict } = useBrandDict()

  return (
    <section className={section.section} aria-labelledby="service-steps">
      <div className={cx(section.inner, styles.grid)}>
        <figure className={section.art}>{art}</figure>
        <div>
          <span className="eyebrow">{dict.steps.label}</span>
          <h2 id="service-steps" className={section.title}>
            {dict.steps.title}
          </h2>
          <Rows rows={rows} />
        </div>
      </div>
    </section>
  )
}
