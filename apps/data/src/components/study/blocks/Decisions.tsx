/*
file: Decisions.tsx
importable: Decisions

Verilen kararlarin listesi. Her karar ustte kucuk numarali bir etiket,
sorusu ve cevabiyla, ustunde kalin bir cizgiyle durur. Teknik okurun ilk
soracagi "neden boyle" sorularinin cevabi icin.

description: Bir isteki kararlari soru ve cevap olarak alt alta gosteren parca.
*/

import { useReveal } from '@paktlabs/brand/hooks/useReveal'
import { useLanguage } from '@paktlabs/brand/i18n/language'
import { cx } from '@paktlabs/brand/lib/cx'

import type { DecisionsBlock, ListItem } from '@/content/studies/blocks'
import { useDict } from '@/i18n'

import styles from './Decisions.module.css'
import { sequenceNumber } from './format'

interface DecisionProps {
  item: ListItem
  number: string
}

// Her karar ekrana girerken kendi basina belirir. Etiketteki kelime sitenin
// sozlugunden gelir, numara siradan.
function Decision({ item, number }: DecisionProps) {
  const { language } = useLanguage()
  const { study } = useDict()
  const { ref, visible } = useReveal<HTMLDivElement>()

  return (
    <div ref={ref} className={cx('reveal', visible && 'in', styles.decision)}>
      <span className="eyebrow">
        {study.decisions.label} {number}
      </span>
      <h3 className={styles.title}>{item.title[language]}</h3>
      <p className={styles.text}>{item.text[language]}</p>
    </div>
  )
}

interface DecisionsProps {
  block: DecisionsBlock
}

export function Decisions({ block }: DecisionsProps) {
  const { language } = useLanguage()

  return (
    <div className={styles.decisions}>
      {block.items.map((item, index) => (
        <Decision key={item.title[language]} item={item} number={sequenceNumber(index)} />
      ))}
    </div>
  )
}
