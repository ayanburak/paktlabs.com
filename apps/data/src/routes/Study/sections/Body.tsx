/*
file: Body.tsx
importable: Body

Detay sayfasinin govdesi: solda icindekiler, sagda numarali bolumler. Bolum
numaralari ve icindekilerin listesi burada, bolumlerin sayfadaki sirasindan
kurulur. Sitenin dili verinin orijinal dilinden farkliysa bolumlerin onune
00 numarali veri dili bolumu eklenir.

description: Calisma detay sayfasinda bolumleri icindekilerle yan yana dizen govde.
*/

import { useMemo, useRef } from 'react'

import { useLanguage } from '@paktlabs/brand/i18n/language'

import type { Chapter as ChapterContent } from '@/content/studies/types'
import { useDict } from '@/i18n'
import { BlockView } from '@/routes/Study/blocks/BlockView'
import { useStudyData } from '@/routes/Study/studyData'

import styles from './Body.module.css'
import { Chapter } from './Chapter'
import { chapterNumber } from './chapterNumber'
import { DATA_LANGUAGE_ID, DataLanguage } from './DataLanguage'
import { Toc, type TocEntry } from './Toc'

interface BodyProps {
  chapters: ChapterContent[]
  minutes: number
}

// Icindekiler okuma ilerlemesini bolumlerin kapsayicisina gore olcer, ref bu
// yuzden ona veriliyor. Veri dili bolumunun numarasi 00, boylece eklendiginde
// icerik bolumlerinin numaralari kaymaz. Bolumun id'si sayfada tekil oldugu
// icin anahtar olarak kullaniliyor.
export function Body({ chapters, minutes }: BodyProps) {
  const { language } = useLanguage()
  const { study } = useDict()
  const data = useStudyData()
  const chaptersRef = useRef<HTMLDivElement>(null)
  const showDataLanguage = language !== data.original

  const entries = useMemo<TocEntry[]>(() => {
    const list = chapters.map((chapter, index) => ({
      id: chapter.id,
      number: chapterNumber(index),
      label: chapter.label[language],
    }))
    return showDataLanguage
      ? [{ id: DATA_LANGUAGE_ID, number: '00', label: study.dataLanguage.label }, ...list]
      : list
  }, [chapters, language, showDataLanguage, study])

  return (
    <div className={styles.body}>
      <Toc entries={entries} chaptersRef={chaptersRef} minutes={minutes} />
      <div ref={chaptersRef} className={styles.chapters}>
        {showDataLanguage && <DataLanguage />}
        {chapters.map((chapter, index) => (
          <Chapter
            key={chapter.id}
            id={chapter.id}
            number={chapterNumber(index)}
            label={chapter.label[language]}
            title={chapter.title[language]}
            lede={chapter.lede[language]}
          >
            {chapter.blocks.map((block, blockIndex) => (
              <BlockView key={blockIndex} block={block} />
            ))}
          </Chapter>
        ))}
      </div>
    </div>
  )
}
