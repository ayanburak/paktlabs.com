/*
file: studyLoader.ts
importable: StudyRoute, SourceRoute, studyLoader, sourceLoader, useStudyRoute, useSourceRoute

Calisma sayfasi ve kod sayfasi acilmadan once calismanin metnini ve
dosyalarini yukleyen rota yukleyicileri. Router sayfayi ancak ikisi de
gelince cizer, boylece sayfa ilk cizimde tam boyundadir. Geri dugmesinde
okur kaldigi yere, bolum baglantisinda hedef bolume duser. Metin ve dosyalar
ana pakete girmez, yalnizca o calismanin sayfasi acilirken indirilir.

    { path: '/work/:slug', element: <Study />, loader: studyLoader(assetFiles) }

Sayfa yuklenenleri useStudyRoute ya da useSourceRoute ile alir.

description: Calisma sayfalarinin metnini ve dosyalarini sayfa cizilmeden once yukleyen rota yukleyicileri.
*/

import { type LoaderFunctionArgs, useLoaderData } from 'react-router-dom'

import { findStudy } from '@/content/studies'
import type { StudyFileSet, StudyFiles } from '@/content/studies/files'
import type { SourcePage, Study, StudyPage } from '@/content/studies/types'

// Detay sayfasinin ihtiyac duydugu her sey: listede de duran facts, sayfanin
// metni ve dosyalar.
export interface StudyRoute {
  study: Study
  page: StudyPage
  files: StudyFileSet
}

// Kod sayfasinin ihtiyac duydugu her sey, kod sayfasinin kendi metniyle.
export interface SourceRoute {
  study: Study
  source: SourcePage
  files: StudyFileSet
}

// Dosyalarin kaynagi disaridan verilir, yukleyici hangi somut kaynagin
// kullanildigini bilmez. Adresteki ad bir calismaya karsilik gelmiyorsa
// yuklenecek bir sey yoktur, null doner ve sayfa bulunamadi sayfasini
// gosterir. Metin ve dosyalar ayni anda istenir.
export function studyLoader(files: StudyFiles) {
  return async ({ params }: LoaderFunctionArgs): Promise<StudyRoute | null> => {
    const study = findStudy(params.slug ?? '')
    if (!study) return null
    const [page, set] = await Promise.all([study.page(), files.load(study.slug)])
    return { study, page, files: set }
  }
}

// Kodu GitHub'da olan calismanin sitede kod sayfasi yoktur, bu adres de
// bilinmeyen bir adres gibi null doner.
export function sourceLoader(files: StudyFiles) {
  return async ({ params }: LoaderFunctionArgs): Promise<SourceRoute | null> => {
    const study = findStudy(params.slug ?? '')
    if (study?.code.kind !== 'page') return null
    const [source, set] = await Promise.all([study.code.page(), files.load(study.slug)])
    return { study, source, files: set }
  }
}

// Yukleyicilerin dondurdugu degerlerin tipi burada bir kez yazilir, sayfalar
// useLoaderData'yi tip vermeden cagirmak zorunda kalmaz.
export function useStudyRoute(): StudyRoute | null {
  return useLoaderData() as StudyRoute | null
}

export function useSourceRoute(): SourceRoute | null {
  return useLoaderData() as SourceRoute | null
}
