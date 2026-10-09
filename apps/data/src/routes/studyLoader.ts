/*
file: studyLoader.ts
importable: studyLoader, useStudyFileSet

Calisma sayfasi ve kod sayfasi acilmadan once calismanin dosyalarini
yukleyen rota yukleyicisi. Router sayfayi ancak dosyalar gelince cizer,
boylece sayfa ilk cizimde tam boyundadir. Geri dugmesinde okur kaldigi
yere, bolum baglantisinda hedef bolume duser.

    { path: '/work/:slug', element: <Study />, loader: studyLoader(assetFiles) }

Sayfa yuklenen dosyalari useStudyFileSet ile alir.

description: Calisma sayfalarinin dosyalarini sayfa cizilmeden once yukleyen rota yukleyicisi.
*/

import { type LoaderFunctionArgs, useLoaderData } from 'react-router-dom'

import { findStudy } from '@/content/studies'
import type { StudyFileSet, StudyFiles } from '@/content/studies/files'

// Dosyalarin kaynagi disaridan verilir, yukleyici hangi somut kaynagin
// kullanildigini bilmez. Adresteki ad bir calismaya karsilik gelmiyorsa
// yuklenecek bir sey yoktur, null doner ve sayfa bulunamadi sayfasini
// gosterir.
export function studyLoader(files: StudyFiles) {
  return async ({ params }: LoaderFunctionArgs): Promise<StudyFileSet | null> => {
    const study = findStudy(params.slug ?? '')
    return study ? files.load(study.slug) : null
  }
}

// Yukleyicinin dondurdugu degerin tipi burada bir kez yazilir, sayfalar
// useLoaderData'yi tip vermeden cagirmak zorunda kalmaz.
export function useStudyFileSet(): StudyFileSet | null {
  return useLoaderData() as StudyFileSet | null
}
