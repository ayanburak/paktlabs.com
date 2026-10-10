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

    const show = () => {
      setVisible(true)
      observer.disconnect()
    }
    const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && show(), {
      threshold: 0.15,
      rootMargin: '0px 0px -8% 0px',
    })
    observer.observe(el)

    // Tab ile icerideki bir dugmeye gelindiginde tarayici yalnizca o dugmeyi
    // ekrana getirir. Eleman uzunsa, ornegin data'daki bin dokuz yuz piksellik
    // kod kutusu, yuzde on besi ekrana girmez ve odaklanan dugme gorunmez bir
    // kutunun icinde kalirdi. Odak iceri girince esige bakmadan gosterilir.
    // Yalnizca klavye odagi sayilir. Fareyle tiklamada da dugme odak alir ve
    // eleman o anda gosterilirse yirmi iki piksel yukari kayar, fare
    // birakildiginda dugme imlecin altinda olmaz ve tiklama kaybolur.
    const onFocus = (event: FocusEvent) => {
      if ((event.target as Element).matches(':focus-visible')) show()
    }
    el.addEventListener('focusin', onFocus)
    return () => {
      observer.disconnect()
      el.removeEventListener('focusin', onFocus)
    }
  }, [])

  return { ref, visible }
}
