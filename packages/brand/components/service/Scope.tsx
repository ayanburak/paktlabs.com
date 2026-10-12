/*
file: Scope.tsx
importable: Scope

Hizmetin kapsam bolumu. Solda baslik ve kapsam satirlari, sagda Ada'nin
cizimi durur. Cizim bolumun dikey ortasinda, havada durur.

description: Hizmetin neleri kapsadigini satirlarla ve yanindaki cizimle anlatan bolum.
*/

import type { ReactNode } from 'react'

import type { ServiceRow } from '../../content/service'
import { useBrandDict } from '../../i18n/useBrandDict'
import { cx } from '../../lib/cx'

import { Rows } from './Rows'
import section from './section.module.css'
import styles from './Scope.module.css'

interface ScopeProps {
  rows: ServiceRow[]
  art: ReactNode
}

// Cizim sitenin verdigi hazir bir parca, bolum yalnizca yerini ve oranini
// belirler.
export function Scope({ rows, art }: ScopeProps) {
  const { service: dict } = useBrandDict()

  return (
    <section className={section.section} aria-labelledby="service-scope">
      <div className={cx(section.inner, styles.grid)}>
        <div>
          <span className="eyebrow">{dict.scope.label}</span>
          <h2 id="service-scope" className={section.title}>
            {dict.scope.title}
          </h2>
          <Rows rows={rows} />
        </div>
        <figure className={section.art}>{art}</figure>
      </div>
    </section>
  )
}
