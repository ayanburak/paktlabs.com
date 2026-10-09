/*
file: useReadingProgress.ts
importable: useReadingProgress

Okurun detay sayfasinda nerede oldugunu izler: hangi bolumun okundugunu ve
bolumlerin ne kadarinin okundugunu. Icindekiler bunu bulunulan bolumu
isaretlemek ve ilerleme cizgisini doldurmak icin kullanir.

    const { current, progress } = useReadingProgress(ids, chaptersRef)

description: Okunan bolumu ve bolumlerdeki okuma ilerlemesini donduren hook.
*/

import { type RefObject, useEffect, useState } from 'react'

interface ReadingProgress {
  current: number
  progress: number
}

// Okunan bolum, ust kenari ekranin ust ucte birini gecmis son bolumdur. Ilk
// bolume gelinmeden once de ilk bolum okunuyor sayilir. Ilerleme sayfanin
// tamamina gore degil yalnizca bolumlere gore hesaplanir, yoksa kapak ve
// kapanis orani bozar. Sifir ile bir arasinda kalir, ucuncu haneden sonrasi
// atilir ki her piksellik kaydirmada yeniden cizim olmasin.
export function useReadingProgress(ids: string[], chaptersRef: RefObject<HTMLElement | null>): ReadingProgress {
  const [state, setState] = useState<ReadingProgress>({ current: 0, progress: 0 })

  useEffect(() => {
    function update() {
      const wrap = chaptersRef.current
      if (!wrap) return
      const mark = window.innerHeight / 3
      let current = 0
      ids.forEach((id, index) => {
        const top = document.getElementById(id)?.getBoundingClientRect().top
        if (top !== undefined && top < mark) current = index
      })
      const box = wrap.getBoundingClientRect()
      const raw = (mark - box.top) / (box.height - mark)
      const progress = Math.round(Math.min(1, Math.max(0, raw)) * 1000) / 1000
      setState((prev) => (prev.current === current && prev.progress === progress ? prev : { current, progress }))
    }

    update()
    document.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      document.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [ids, chaptersRef])

  return state
}
