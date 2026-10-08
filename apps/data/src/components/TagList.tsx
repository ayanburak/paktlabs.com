/*
file: TagList.tsx
importable: TagList

Bir calismanin etiketlerini ve yilini kucuk cerceveli kutucuklar olarak
dizer. Veri sayfasindaki calisma karti ve detay sayfasinin kapagi ayni
gorunusu kullanir, gorunus degisirse tek yerde degisir.

    <TagList tags={study.tags} year={study.year} className={styles.tags} />

description: Calismanin etiketlerini ve yilini kutucuk listesi olarak gosteren bilesen.
*/

import { cx } from '@paktlabs/brand/lib/cx'

import type { StudyTag } from '@/content/studies/types'
import { useDict } from '@/i18n'

import styles from './TagList.module.css'

interface TagListProps {
  tags: StudyTag[]
  year: number
  label?: string
  className?: string
}

// Etiketlerin ekranda gorunen adlari sozlukte, filtrenin kullandigi adlarla
// ayni yerden gelir. Yil son kutucuk olarak etiketlerle ayni gorunur.
// className yalnizca listenin bulundugu yere gore bosluk vermek icin var,
// kutucuklarin gorunusu burada kalir. label ekran okuyucuya listenin ne
// oldugunu soyler. Kartta verilmez, cunku kartin tamami tek bir baglanti ve
// liste onun metninin parcasi olarak okunur.
export function TagList({ tags, year, label, className }: TagListProps) {
  const { home } = useDict()

  return (
    <ul className={cx(styles.tags, className)} aria-label={label}>
      {tags.map((tag) => (
        <li key={tag}>{home.works.tags[tag]}</li>
      ))}
      <li>{year}</li>
    </ul>
  )
}
