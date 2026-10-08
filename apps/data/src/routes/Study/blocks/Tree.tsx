/*
file: Tree.tsx
importable: Tree

Kod gorunumlu dosya agaci, ornegin teslim edilen depo ve veritabani
tablolari. Kok adlar altin, ogelerin aciklamalari soluk yazilir. Agac
cizgileri ve aciklamalarin hizasi icerikten kendiliginden kurulur, elle
bosluk yazilmaz.

description: Bir deponun ya da veritabaninin yapisini agac olarak gosteren parca.
*/

import { useReveal } from '@paktlabs/brand/hooks/useReveal'
import { useLanguage } from '@paktlabs/brand/i18n/language'
import { cx } from '@paktlabs/brand/lib/cx'

import type { TreeBlock } from '@/content/studies/blocks'

import styles from './Tree.module.css'

interface TreeProps {
  block: TreeBlock
}

// Bir kolun son ogesi kose cizgisiyle, digerleri catal cizgisiyle baslar.
// Aciklamalar ayni koldaki en uzun adin bitisine gore hizalanir, yazi tipi
// esit genislikli oldugu icin bosluklarla hizalamak yeter. Kollar arasinda
// bir bos satir kalir.
export function Tree({ block }: TreeProps) {
  const { language } = useLanguage()
  const { ref, visible } = useReveal<HTMLPreElement>()

  return (
    <pre ref={ref} className={cx('reveal', visible && 'in', styles.tree)} aria-label={block.label[language]}>
      {block.groups.map((group, groupIndex) => {
        const width = Math.max(...group.items.map((item) => item.name.length))
        return (
          <span key={group.root}>
            {groupIndex > 0 && '\n\n'}
            <span className={styles.root}>{group.root}</span>
            {group.items.map((item, index) => (
              <span key={item.name}>
                {'\n'}
                {index === group.items.length - 1 ? '└── ' : '├── '}
                {item.note ? item.name.padEnd(width + 2) : item.name}
                {item.note && <span className={styles.note}>{item.note[language]}</span>}
              </span>
            ))}
          </span>
        )
      })}
    </pre>
  )
}
