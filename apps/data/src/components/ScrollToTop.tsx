/*
file: ScrollToTop.tsx
importable: ScrollToTop

Site ici gecislerde sayfanin kaydirma konumunu ayarlar. App'te BrowserRouter
icinde, Routes'tan sonra bir kez kullanilir, ekrana bir sey cizmez.

    <BrowserRouter>
      <Routes>...</Routes>
      <ScrollToTop />
    </BrowserRouter>

description: Ileri gidilen sayfayi en uste ya da adresteki bolume tasiyan, geri donuste tarayiciya karismayan bilesen.
*/

// NOTE: React Router'in kendi ScrollRestoration'i yalnizca createBrowserRouter
// kurulumunda calisiyor. 2026-10-09'da denendi, o kurulum data'nin
// kullanmadigi veri yukleme parcalarini da pakete aliyor, JS sikistirilmis
// haliyle 17 KB buyuyordu. Bu yuzden is burada elle yapiliyor.
//
// XXX: geri ve ileri dugmesinde kalinan yeri tarayici kendisi kurar. Bu
// yalnizca sayfanin icerigi aninda hazir oldugu surece dogru calisir, bugun
// calismalarin icerigi ve CSV'ler pakette geliyor. Bir sayfa icerigini
// sonradan yuklemeye baslarsa tarayici konumu icerik gelmeden kurar ve okur
// yanlis yere duser. tests/scroll.spec.ts bu durumda kirilir, o gun
// ScrollRestoration'a gecmek dusunulur.

import { useLayoutEffect } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

// POP geri ve ileri dugmesidir, ayni sayfadaki bolum baglantilari da tarayicida
// boyle gorunur. Ikisinde de konuma tarayici karar verir. Kaydirma aninda
// yapilir, global.css'teki yumusak kaydirma burada sayfayi yukari dogru
// akitirdi. useLayoutEffect yeni sayfa ekrana cizilmeden once calisir, okur
// eski konumu bir an bile gormez.
export function ScrollToTop() {
  const location = useLocation()
  const type = useNavigationType()

  useLayoutEffect(() => {
    if (type === 'POP') return
    const target = location.hash ? document.getElementById(decodeURIComponent(location.hash.slice(1))) : null
    if (target) target.scrollIntoView({ behavior: 'instant' })
    else window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [location, type])

  return null
}
