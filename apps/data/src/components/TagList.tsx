/*
file: TagList.tsx
importable: TagList

Kucuk cerceveli kutucuklardan olusan etiket listesi. Veri sayfasindaki
calisma karti, detay sayfasinin kapagi ve kod sayfasinin kapagi ayni
gorunusu kullanir, gorunus degisirse tek yerde degisir. Liste metinleri hazir
alir, bir calismanin etiketleri ve yili useStudyTags.ts ile metne cevrilir.

    <TagList items={useStudyTags(study)} className={styles.tags} />

description: Etiketleri kutucuk listesi olarak gosteren bilesen.
*/

import { cx } from '@paktlabs/brand/lib/cx'

import styles from './TagList.module.css'

interface TagListProps {
  items: string[]
  label?: string
  className?: string
}

// className yalnizca listenin bulundugu yere gore bosluk vermek icin var,
// kutucuklarin gorunusu burada kalir. label ekran okuyucuya listenin ne
// oldugunu soyler. Kartta verilmez, cunku kartin tamami tek bir baglanti ve
// liste onun metninin parcasi olarak okunur.
export function TagList({ items, label, className }: TagListProps) {
  return (
    <ul className={cx(styles.tags, className)} aria-label={label}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}
