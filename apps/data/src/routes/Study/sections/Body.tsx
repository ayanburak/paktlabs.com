/*
file: Body.tsx
importable: Body

Detay sayfasinin govdesi: solda icindekiler sutunu, sagda numarali bolumler.
Bolum numaralari burada, bolumlerin sayfadaki sirasindan verilir.

description: Calisma detay sayfasinda bolumleri icindekiler sutunuyla yan yana dizen govde.
*/

import type { Chapter as ChapterContent } from '@/content/studies/types'

import { Chapter } from './Chapter'
import styles from './Body.module.css'

interface BodyProps {
  chapters: ChapterContent[]
}

// Icindekiler sutunu icindekiler parcasi yazilana kadar bos duruyor. Sutun
// simdiden ayrildi ki bolumler son yerlerinde dursun, icindekiler gelince
// sayfa yana kaymasin. Bolumun id'si sayfada tekil oldugu icin anahtar olarak
// kullaniliyor.
export function Body({ chapters }: BodyProps) {
  return (
    <div className={styles.body}>
      <div className={styles.chapters}>
        {chapters.map((chapter, index) => (
          <Chapter key={chapter.id} chapter={chapter} number={index + 1} />
        ))}
      </div>
    </div>
  )
}
