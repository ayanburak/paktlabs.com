/*
file: Details.tsx
importable: Details

Acilir kutu. Kapaliyken cerceveli bir satir, acilinca icindeki parcalar
gorunur. Tarayicinin kendi details ogesi kullanilir, klavye ve ekran okuyucu
destegi ondan gelir. Icindeki parcalari BlockView ile gosterir, bu yuzden
kutunun icine her parca turu konabilir.

description: Bolum icindeki ayrintiyi okur isteyince acilan bir kutuda gosteren parca.
*/

import { useReveal } from '@paktlabs/brand/hooks/useReveal'
import { useLanguage } from '@paktlabs/brand/i18n/language'
import { cx } from '@paktlabs/brand/lib/cx'

import type { DetailsBlock } from '@/content/studies/blocks'

import { BlockView } from './BlockView'
import styles from './Details.module.css'

interface DetailsProps {
  block: DetailsBlock
}

// Arti isareti yalnizca gorsel, ekran okuyucu acik ya da kapali oldugunu
// details ogesinin kendisinden ogrenir.
export function Details({ block }: DetailsProps) {
  const { language } = useLanguage()
  const { ref, visible } = useReveal<HTMLDetailsElement>()

  return (
    <details ref={ref} className={cx('reveal', visible && 'in', styles.details)}>
      <summary className={styles.summary}>
        <div>
          <span className={styles.meta}>{block.meta[language]}</span>
          <h3 className={styles.title}>{block.title[language]}</h3>
        </div>
        <span className={styles.sign} aria-hidden="true" />
      </summary>
      <div className={styles.content}>
        {block.blocks.map((inner, index) => (
          <BlockView key={index} block={inner} />
        ))}
      </div>
    </details>
  )
}
