/*
file: Tree.tsx
importable: Tree

Kod gorunumlu dosya agaci, ornegin teslim edilen depo ve veritabani
tablolari. Kok adlar altin, ogelerin aciklamalari soluk yazilir. Klasorlerin
ogeleri bir kademe iceride cizilir. Bir oge altinla vurgulanabilir ya da
soluk gosterilebilir, kod sayfasi paylasilan dosyalari boyle ayirir. Agac
cizgileri ve aciklamalarin hizasi icerikten kendiliginden kurulur, elle
bosluk yazilmaz.

description: Bir deponun ya da veritabaninin yapisini agac olarak gosteren parca.
*/

import { useReveal } from '@paktlabs/brand/hooks/useReveal'
import { type Language, useLanguage } from '@paktlabs/brand/i18n/language'
import { cx } from '@paktlabs/brand/lib/cx'

import type { TreeBlock, TreeItem } from '@/content/studies/blocks'

import styles from './Tree.module.css'

// Agacin cizilmeye hazir bir satiri: solundaki cizgiler, ogenin kendisi ve
// varsa aciklamasi.
interface Row {
  guide: string
  item: TreeItem
}

// Ogeler ust kademeden alta dogru satirlara acilir. Bir kolun son ogesi kose
// cizgisiyle, digerleri catal cizgisiyle baslar. Son olmayan bir klasorun
// altindaki satirlar dikey cizgiyle, son klasorunkiler boslukla devam eder,
// boylece cizgi bittigi yerde biter.
function rows(items: TreeItem[], indent = ''): Row[] {
  return items.flatMap((item, index) => {
    const last = index === items.length - 1
    const row = { guide: `${indent}${last ? '└── ' : '├── '}`, item }
    return [row, ...rows(item.items ?? [], `${indent}${last ? '    ' : '│   '}`)]
  })
}

// Aciklamalar ayni koldaki en uzun satirin bitisine gore hizalanir, satirin
// uzunluguna cizgiler de dahildir. Yazi tipi esit genislikli oldugu icin
// bosluklarla hizalamak yeter.
function Branch({ list, language }: { list: Row[]; language: Language }) {
  const width = Math.max(...list.map((row) => row.guide.length + row.item.name.length))

  return list.map(({ guide, item }, index) => (
    <span key={index}>
      {'\n'}
      {guide}
      {item.highlight || item.muted ? (
        <span className={cx(item.highlight && styles.highlight, item.muted && styles.muted)}>{item.name}</span>
      ) : (
        item.name
      )}
      {item.note && ' '.repeat(width + 2 - guide.length - item.name.length)}
      {item.note && <span className={styles.note}>{item.note[language]}</span>}
    </span>
  ))
}

interface TreeProps {
  block: TreeBlock
}

// Kollar arasinda bir bos satir kalir.
export function Tree({ block }: TreeProps) {
  const { language } = useLanguage()
  const { ref, visible } = useReveal<HTMLPreElement>()

  return (
    <pre ref={ref} className={cx('reveal', visible && 'in', styles.tree)} aria-label={block.label[language]}>
      {block.groups.map((group, groupIndex) => (
        <span key={group.root}>
          {groupIndex > 0 && '\n\n'}
          <span className={styles.root}>{group.root}</span>
          <Branch list={rows(group.items)} language={language} />
        </span>
      ))}
    </pre>
  )
}
