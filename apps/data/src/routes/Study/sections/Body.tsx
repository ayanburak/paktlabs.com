/*
file: Body.tsx
importable: Body

Detay sayfasinin govdesi: solda icindekiler sutunu, sagda numarali bolumler.
Bolum numaralari burada, bolumlerin sayfadaki sirasindan verilir.

description: Calisma detay sayfasinda bolumleri icindekiler sutunuyla yan yana dizen govde.
*/

import { useRef } from 'react'

import type { Chapter as ChapterContent } from '@/content/studies/types'

import { Chapter } from './Chapter'
import styles from './Body.module.css'
import { Toc } from './Toc'

interface BodyProps {
  chapters: ChapterContent[]
}

// Icindekiler okuma ilerlemesini bolumlerin kapsayicisina gore olcer, ref bu
// yuzden ona veriliyor. Bolumun id'si sayfada tekil oldugu icin anahtar olarak
// kullaniliyor.
export function Body({ chapters }: BodyProps) {
  const chaptersRef = useRef<HTMLDivElement>(null)

  return (
    <div className={styles.body}>
      <Toc chapters={chapters} chaptersRef={chaptersRef} />
      <div ref={chaptersRef} className={styles.chapters}>
        {chapters.map((chapter, index) => (
          <Chapter key={chapter.id} chapter={chapter} index={index} />
        ))}
      </div>
    </div>
  )
}
