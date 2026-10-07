/*
file: useReveal.ts
importable: useReveal

Mockup'taki data-reveal + IntersectionObserver script'inin React karsiligi.
Eskisinden fark: orada tum sayfadaki [data-reveal] elemanlari tek bir
observer'da elle toplaniyordu, burada her bilesen kendi ref'ini kendi
observer'iyla izliyor, boylece bir bilesen DOM'dan kalkinca observer'i da
kendisiyle beraber temizleniyor.

description: Bir elemanin ekrana girdigi ani yakalayip geri donen kucuk bir gorunurluk hook'u.
*/

import { useEffect, useRef, useState } from 'react'

export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // hareket azaltma tercihi olan kullanicida animasyon beklemeye deger yok,
    // eleman direkt acik baslar
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, visible }
}
