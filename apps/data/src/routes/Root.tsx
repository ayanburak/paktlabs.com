/*
file: Root.tsx
importable: Root

Butun rotalarin ortak cercevesi. Ekrana kendi bir sey cizmez, bulunulan
sayfayi ve kaydirma yoneticisini tasir.

description: Rotalari saran ve sayfa gecislerinde kaydirma konumunu yoneten cerceve.
*/

import { useEffect } from 'react'
import { Outlet, ScrollRestoration, type Location } from 'react-router-dom'

// --- Kaydirma konumunun anahtari ---

// ScrollRestoration her sayfanin konumunu tarayici oturumunda o sayfanin
// gecmis anahtariyla saklar. Uygulama icindeki gecislerde her sayfanin kendi
// anahtari var. Sayfa bastan yuklendiginde ise, adres yazilarak, baska bir
// siteden ya da duz bir a etiketiyle gelindiginde, ilk girisin anahtari her
// zaman default. Bastan yuklenen butun sayfalar ayni anahtari paylastigi icin
// biri digerinin konumunda aciliyordu, ornegin hizmet sayfasinin en altindaki
// Sonraki dugmesi bir sonraki hizmeti en alttan aciyordu. Bu yuzden ilk
// girisin anahtari sayfanin kendi adresi yapildi.
// Kayitlar kutuphanenin varsayilan adi yerine bu adla saklanir, onceki
// surumden oturumda kalmis default kayitlari hic okunmasin diye.
const SCROLL_STORAGE_KEY = 'pl-scroll-positions'

function scrollKey(location: Location): string {
  return location.key === 'default' ? `page:${location.pathname}${location.search}` : location.key
}

// Ziyaretci sayfaya bir baglantiyla ya da adres yazarak geldiyse sayfa en
// ustten, adreste bolum varsa o bolumden acilir. Yenilemede ve geri ileri
// dugmesinde kaldigi yere doner. Ilk gelista sayfanin eski kaydi silinir ki
// ScrollRestoration onu okuyup sayfayi eski konumuna goturmesin. Bu islem
// modul yuklenirken, ScrollRestoration oturumdaki kayitlari okumadan once
// yapilmali.
const firstEntry = performance.getEntriesByType('navigation')[0]
const arrivedFresh = !(firstEntry instanceof PerformanceNavigationTiming) || firstEntry.type === 'navigate'

if (arrivedFresh) {
  try {
    const saved: Record<string, number> = JSON.parse(sessionStorage.getItem(SCROLL_STORAGE_KEY) ?? '{}')
    delete saved[`page:${location.pathname}${location.search}`]
    sessionStorage.setItem(SCROLL_STORAGE_KEY, JSON.stringify(saved))
  } catch {
    // oturum deposu kapaliysa ScrollRestoration da bir sey saklayamaz,
    // silinecek bir kayit da yoktur
  }
}

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
// sonraki gecislerde fontlar zaten yuklu. Yenilemede ve geri dugmesinde
// calismaz, orada okur bolume degil kaldigi yere doner.
function useHashAfterFonts() {
  useEffect(() => {
    const id = readHashId()
    if (!id || !arrivedFresh) return
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
// Geri ve ileri dugmesinde ve yenilemede okur kaldigi yere doner, sayfa
// bastan yuklenmis olsa da. Ikisi de sayfa tam
// boyuyla cizildikten sonra olur, cunku calisma sayfalarinin dosyalari
// rota yukleyicisinde, sayfa cizilmeden once gelir.
export function Root() {
  useHashAfterFonts()

  return (
    <>
      <Outlet />
      <ScrollRestoration getKey={scrollKey} storageKey={SCROLL_STORAGE_KEY} />
    </>
  )
}
