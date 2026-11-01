/*
file: NotFound.tsx
importable: NotFound

Butun PaktLabs sitelerinin bulunamadi sayfasinin icerigi. Ust bar, alt bilgi
ve sekme basligi sitenin kendi sayfa cercevesinden gelir, bilesen yalnizca
main'in icine konan bolumu cizer. Sekme basligi icin metinler useBrandDict
icindeki notFound.meta'da durur.

    <Page title={notFound.meta.title} description={notFound.meta.description}>
      <NotFound />
    </Page>

Geri don dugmesi ziyaretciyi ayni sitede geldigi sayfaya goturur. Adrese
baska bir siteden ya da adres cubuguna yazarak gelindiyse sitenin ana
sayfasina gider.

description: Metni solda, bariyer cizimini sagda gosteren ortak bulunamadi sayfasi.
*/

// NOTE: masaustu yerlesimi hero'larla ayni, HeroLayout.module.css'in
// siniflari bu bilesenin kendi siniflariyla birlikte veriliyor. Hero
// yerlesimi degisirse bu sayfa da onunla birlikte degisir, bu bilerek boyle.

import type { MouseEvent } from 'react'

import barrierUrl from '../assets/barrier.svg'
import { useBrandDict } from '../i18n/useBrandDict'
import { cx } from '../lib/cx'
import layout from '../styles/HeroLayout.module.css'

import styles from './NotFound.module.css'

// Navigation API'nin gecmis listesi yalnizca ayni origin'deki kayitlari
// tutar, bu yuzden canGoBack disaridan gelen ziyaretcide false doner. Bu API
// olmayan eski tarayicilarda referrer'in ayni origin'den gelip gelmedigine
// bakilir. O yol sitenin icinde sayfa yenilemeden yapilan gecisleri goremez,
// orada dugme ana sayfaya gider, ziyaretci yine sitede kalir.
function canGoBack() {
  if ('navigation' in window) return window.navigation.canGoBack
  return document.referrer !== '' && new URL(document.referrer).origin === location.origin
}

// Dugme bir baglanti, JS calismasa ya da yeni sekmede acilsa bile ana
// sayfaya gider. Geri gidilecek bir sayfa varsa tiklama ona cevrilir. Ana
// sayfa her sitede kok adres oldugu icin disaridan verilmiyor.
function onBack(event: MouseEvent<HTMLAnchorElement>) {
  if (!canGoBack()) return
  event.preventDefault()
  history.back()
}

// Geri don baglantisinin href'i ana sayfadir, JS calismasa da ziyaretciyi bir
// yere goturur. Tiklama onBack'te gecmise donusturulur.
export function NotFound() {
  const { notFound } = useBrandDict()

  return (
    <section className={cx(layout.hero, styles.notFound)}>
      <div className={cx(layout.copy, styles.copy)}>
        <span className={`eyebrow rise ${styles.code}`}>404</span>
        <h1 className={`rise ${styles.title}`}>{notFound.title}</h1>
        <p className={`rise ${styles.lead}`}>{notFound.lead}</p>
        <a className={`cta primary rise ${styles.back}`} href="/" onClick={onBack}>
          {notFound.back}
        </a>
      </div>
      <div className={cx(layout.art, styles.art)}>
        <img src={barrierUrl} alt="" aria-hidden="true" />
      </div>
    </section>
  )
}
