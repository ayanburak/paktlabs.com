/*
file: useStepArt.ts
importable: useStepArt

Iletisim formunun adim cizimleri. Hangi adimin hangi cizimi gosterdigini
tutar, cizimleri arka planda onbellege alir ve ekrandaki cizimi yalnizca
indirilip cizilmeye hazir olunca degistirir. Form durumundan habersizdir.

    const art = useStepArt(question ? question.id : 'details')

description: Verilen adimin cizimini hazir olunca donduren ve oteki cizimleri onceden indiren hook.
*/

import { useEffect, useState } from 'react'

import areaSvg from '@/assets/illustrations/contact-area.svg'
import stageSvg from '@/assets/illustrations/contact-stage.svg'
import detailsSvg from '@/assets/illustrations/contact-details.svg'
import timingSvg from '@/assets/illustrations/contact-timing.svg'

// Her adimin kendi cizimi. Dort cizimde Ada ayni boyda ve ayni golgenin
// ustunde duruyor, sayfa hepsini ayni yukseklikte ve ayni genislikteki bir
// alanda gosterir. Gonderildi ekraninda son adimin cizimi kalir.
const stepArt = {
  area: areaSvg,
  stage: stageSvg,
  timing: timingSvg,
  details: detailsSvg,
}

// Sayfa acilip ilk cizim geldikten sonra oteki cizimler arka planda indirilir.
// Ziyaretci ilk soruyu cevaplayana kadar hepsi onbellekte olur ve adim
// degisince beklenmez. load olayi beklenir ki bu indirme sayfanin kendi
// dosyalarinin onune gecmesin.
function usePreloadedArt() {
  useEffect(() => {
    const load = () => Object.values(stepArt).forEach((src) => (new Image().src = src))
    if (document.readyState === 'complete') load()
    else window.addEventListener('load', load, { once: true })
    return () => window.removeEventListener('load', load)
  }, [])
}

// Ekranda gosterilen cizim, istenen cizim indirilip cizilmeye hazir olunca
// degisir. O ana kadar onceki cizim yerinde kalir, boylece belirme animasyonu
// bos bir alanin ustunde oynamaz ve cizim animasyonsuz pat diye cikmaz. Ilk
// acilista hazir olana kadar hicbir cizim gosterilmez. Indirme hata verirse
// yine de gecilir, kirik bir dosya bir adimi kilitlemesin.
function useReadyArt(wanted: string): string | undefined {
  const [shown, setShown] = useState<string>()
  useEffect(() => {
    let live = true
    const img = new Image()
    img.src = wanted
    img
      .decode()
      .catch(() => undefined)
      .then(() => live && setShown(wanted))
    return () => {
      live = false
    }
  }, [wanted])
  return shown
}

// Contact'in cagirdigi tek giris. Adimin cizimini hazir olunca verir, ayni
// anda oteki cizimlerin indirilmesini baslatir.
export function useStepArt(step: keyof typeof stepArt): string | undefined {
  usePreloadedArt()
  return useReadyArt(stepArt[step])
}
