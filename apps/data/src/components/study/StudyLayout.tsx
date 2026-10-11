/*
file: StudyLayout.tsx
importable: StudyLayout

Detay sayfasi ile kod sayfasinin ortak iskeleti: veri dili saglayicisi,
dosyalarin context'i, kapak, govde ve yazar kutusu. Iki sayfa yalnizca
farklarini verir. children kapakla govde arasina konur, ornegin detay
sayfasinin ozet bandi. beforeAuthor ve afterAuthor yazar kutusunun
onune ve arkasina konur, ornegin Meraklisina karti ve calismaya donus karti.

description: Detay ve kod sayfalarinin kapak, govde ve yazar kutusu iskeletini kuran bilesen.
*/

import type { ReactNode } from 'react'

import { useLanguage } from '@paktlabs/brand/i18n/language'

import type { Chapter as ChapterContent, FactRow, Study } from '@/content/studies/types'
import type { StudyFileSet } from '@/content/studies/files'

import { Author } from './Author'
import { Body } from './Body'
import { Cover, type CoverCrumb } from './Cover'
import type { DataLanguageText } from './DataLanguage'
import { DataLanguageProvider } from './DataLanguageProvider'
import { StudyFilesContext } from './studyFiles'

interface StudyLayoutProps {
  study: Study
  files: StudyFileSet
  crumb: CoverCrumb
  tags: string[]
  title: string
  lede: string
  facts: FactRow[]
  chapters: ChapterContent[]
  tocNote: string
  dataLanguage: DataLanguageText
  beforeAuthor?: ReactNode
  afterAuthor?: ReactNode
  children?: ReactNode
}

// Saglayici calismanin slug'iyla yeniden kurulur ki baska bir calismaya
// gecildiginde veri dili secimi sifirlansin. Facts satirlari burada secili
// siteye gore dile cevrilir, kapak dil bilmez.
export function StudyLayout({
  study,
  files,
  crumb,
  tags,
  title,
  lede,
  facts,
  chapters,
  tocNote,
  dataLanguage,
  beforeAuthor,
  afterAuthor,
  children,
}: StudyLayoutProps) {
  const { language } = useLanguage()

  return (
    <DataLanguageProvider key={study.slug} original={study.dataLanguage}>
      <StudyFilesContext.Provider value={files}>
        <Cover
          crumb={crumb}
          tags={tags}
          title={title}
          lede={lede}
          facts={facts.map((row) => ({ label: row.label[language], value: row.value[language] }))}
        />
        {children}
        <Body
          chapters={chapters}
          tocNote={tocNote}
          dataLanguage={dataLanguage}
          afterChapters={
            <>
              {beforeAuthor}
              <Author id={study.author} />
              {afterAuthor}
            </>
          }
        />
      </StudyFilesContext.Provider>
    </DataLanguageProvider>
  )
}
