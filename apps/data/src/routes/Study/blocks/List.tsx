/*
file: List.tsx
importable: List

Kisa maddelerden olusan liste. columns gorunusunde maddeler numarali ve yan
yana, stack gorunusunde alt alta ve aralarinda cizgiyle durur. Iki gorunus
ayni icerik bicimini kullanir, yalnizca dizilisleri farkli.

description: Bolum icindeki madde listesini yan yana ya da alt alta gosteren parca.
*/

import { useReveal } from '@paktlabs/brand/hooks/useReveal'
import { useLanguage } from '@paktlabs/brand/i18n/language'
import { cx } from '@paktlabs/brand/lib/cx'

import type { ListBlock } from '@/content/studies/blocks'

import styles from './List.module.css'

interface ListProps {
  block: ListBlock
}

// Liste ekrana tek parca olarak girer. Maddelerin numarasi CSS sayaciyla
// verilir, icerikte yazilmaz. Baslik verilmisse listeyle birlikte belirir.
export function List({ block }: ListProps) {
  const { language } = useLanguage()
  const { ref, visible } = useReveal<HTMLDivElement>()

  return (
    <div ref={ref} className={cx('reveal', visible && 'in')}>
      {block.title && <h3 className={styles.title}>{block.title[language]}</h3>}
      <ul className={cx(styles.list, styles[block.view])}>
        {block.items.map((item) => (
          <li key={item.title[language]}>
            <span>
              <strong>{item.title[language]}</strong> {item.text[language]}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
