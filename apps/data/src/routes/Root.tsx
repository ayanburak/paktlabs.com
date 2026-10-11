/*
file: Root.tsx
importable: Root

Butun rotalarin ortak cercevesi. Ekrana kendi bir sey cizmez, bulunulan
sayfayi ve kaydirma yoneticisini tasir.

description: Rotalari saran ve sayfa gecislerinde kaydirma konumunu yoneten cerceve.
*/

import { useEffect } from 'react'
import { Outlet, ScrollRestoration } from 'react-router-dom'

// Bozuk yuzde kodlu bir adres (ornegin /#%) cozulemez, ham deger kullanilir.
function readHashId() {
  const raw = window.location.hash.slice(1)
  try {
    return decodeURIComponent(raw)
  } catch {
    return raw
  }
}

// Okurun kendisinin kaydirmaya basladigini gosteren olaylar. scroll bunlardan
// biri degil, cunku hizalamanin kendisi de scroll olayi uretir.
const USER_EVENTS = ['wheel', 'touchstart', 'pointerdown', 'keydown'] as const

// Adres bir bolumle dogrudan acildiginda ScrollRestoration bolume ilk
// cizimde kaydirir. Fontlar o anda henuz gelmemis olabilir, gelince ustteki
// metinler yeniden dizilir ve bolum yerinden kayar. Fontlar tek seferde degil
// birkac dalga halinde geliyor, basligin ekranin ustune yetmis piksel tasdigi
// olculdu. Bu yuzden her font dalgasindan sonra bolume yeniden hizalanir.
// Okur kendisi kaydirmaya, tiklamaya ya da tusa basmaya baslayinca hizalama
// durur, okurun konumuna bir daha dokunulmaz. Yalnizca ilk acilista calisir,
// sonraki gecislerde fontlar zaten yuklu.
function useHashAfterFonts() {
  useEffect(() => {
    const id = readHashId()
    if (!id) return
    const align = () => document.getElementById(id)?.scrollIntoView({ behavior: 'instant' })
    const stop = () => {
      document.fonts.removeEventListener('loadingdone', align)
      USER_EVENTS.forEach((type) => window.removeEventListener(type, stop))
    }
    document.fonts.addEventListener('loadingdone', align)
    USER_EVENTS.forEach((type) => window.addEventListener(type, stop, { passive: true }))
    return stop
  }, [])
}

// Ileri gidilen sayfa en ustten, adreste bir bolum varsa o bolumden acilir.
// Geri ve ileri dugmesinde okur kaldigi yere doner. Ikisi de sayfa tam
// boyuyla cizildikten sonra olur, cunku calisma sayfalarinin dosyalari
// rota yukleyicisinde, sayfa cizilmeden once gelir.
export function Root() {
  useHashAfterFonts()

  return (
    <>
      <Outlet />
      <ScrollRestoration />
    </>
  )
}
