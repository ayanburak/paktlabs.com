/*
file: Note.tsx
importable: Note

Akisin disinda kalan ama okurun bilmesi gereken kisa bir not. Ustte kucuk
bir etiket, altinda bir iki cumle. Paragraftan ayrilsin diye cerceveli bir
kutuda, ama uyari gibi bagirmasin diye sakin renklerle durur.

description: Bolum icindeki kisa bir sinirlamayi ya da uyariyi kutu icinde gosteren parca.
*/

import { useReveal } from '@paktlabs/brand/hooks/useReveal'
import { useLanguage } from '@paktlabs/brand/i18n/language'
import { cx } from '@paktlabs/brand/lib/cx'

import type { NoteBlock } from '@/content/studies/blocks'

import styles from './Note.module.css'

interface NoteProps {
  block: NoteBlock
}

export function Note({ block }: NoteProps) {
  const { language } = useLanguage()
  const { ref, visible } = useReveal<HTMLElement>()

  return (
    <aside ref={ref} className={cx('reveal', visible && 'in', styles.note)}>
      <span className="eyebrow">{block.label[language]}</span>
      <p className={styles.text}>{block.text[language]}</p>
    </aside>
  )
}
