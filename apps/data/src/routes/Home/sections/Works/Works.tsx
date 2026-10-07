/*
file: Works.tsx
importable: Works

description: Veri sayfasindaki calisma listesini kartlar halinde dizen bolum.
*/

import { studies } from '@/content/studies'

import { StudyCard } from './StudyCard'
import styles from './Works.module.css'

// Bolum basligi, altin bant ve suzgec bir sonraki adimda eklenecek. Su an
// kartlar duz bir izgarada, kartin kendisini gormek icin.
export function Works() {
  return (
    <section id="calismalar" className={styles.grid}>
      {studies.map((study) => (
        <StudyCard key={study.slug} study={study} />
      ))}
    </section>
  )
}
