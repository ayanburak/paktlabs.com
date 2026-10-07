/*
file: Header.tsx
importable: Header

PaktLabs sitelerinin ortak ust bari. Landing hic prop vermeden kullanir,
disiplin siteleri bulunduklari disiplini ve logonun gidecegi adresi verir.

    <Header current="data" homeHref="https://paktlabs.com" />

current verilen disiplinin baglantisi aria-current ile isaretlenir, ust barda
kalin ve alti cizili gorunur. homeHref verilmezse logo sitenin kokune gider.

description: Sayfanin ustunde duran, logo, disiplin baglantilari ve dil degistirici tasiyan ust bar.
*/

// 768px altinda .nav gizlenip yerine hamburger ve acilir panel geciyor, esik
// Header.module.css'teki @media'da. navLinks dizisi ve LanguageSwitch iki yerde
// yani masaustu bar ve mobil panelde ayni seyi tekrar yazmamak icin var, gercek
// ikinci kullanim oldugu icin erken soyutlama sayilmiyor.

import { useEffect, useId, useRef, useState } from 'react'

import logoUrl from '../assets/logo.svg'
import { disciplineUrls } from '../content/disciplines'
import type { Discipline } from '../content/disciplines'
import { useLanguage } from '../i18n/language'
import { useBrandDict } from '../i18n/useBrandDict'
import { cx } from '../lib/cx'

import styles from './Header.module.css'

interface HeaderProps {
  current?: Discipline
  homeHref?: string
}

export function Header({ current, homeHref = '/' }: HeaderProps) {
  const { brand, nav, a11y } = useBrandDict()
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const burgerRef = useRef<HTMLButtonElement>(null)

  // Panel dialog degil, odak icerde kilitlenmiyor. Escape sadece paneli kapatip
  // odagi hamburgere geri veriyor ki klavye kullanicisi sayfada kaybolmasin.
  useEffect(() => {
    if (!open) return
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Escape') return
      setOpen(false)
      burgerRef.current?.focus()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  // Bulunulan disiplin hem masaustu barda hem mobil panelde aria-current
  // tasir, ekran okuyucu iki menude de hangi sitede olundugunu soyler.
  const navLinks = [
    { href: disciplineUrls.web, label: nav.web, current: current === 'web' },
    { href: disciplineUrls.automation, label: nav.automation, current: current === 'automation' },
    { href: disciplineUrls.data, label: nav.data, current: current === 'data' },
    { href: '#iletisim', label: nav.contact, current: false },
  ]

  // Iki nav ayni anda hic gorunmuyor, biri hep display:none. O yuzden ikisi de
  // ayni ana menu etiketini tasiyor, mobil ayrimi ekran okuyucuya bir sey anlatmiyor.
  return (
    <header className={styles.top}>
      <div className={styles.inner}>
        <a href={homeHref}>
          <img className={styles.brand} src={logoUrl} alt={brand} />
        </a>
        <nav className={styles.nav} aria-label={a11y.mainMenu}>
          <span className={styles.links}>
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} aria-current={link.current ? 'page' : undefined}>
                {link.label}
              </a>
            ))}
          </span>
          <LanguageSwitch />
        </nav>
        <button
          ref={burgerRef}
          type="button"
          className={styles.burger}
          aria-label={open ? a11y.closeMenu : a11y.openMenu}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
      <nav
        id={panelId}
        className={cx(styles.mobileNav, open && styles.mobileNavOpen)}
        aria-label={a11y.mainMenu}
      >
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            aria-current={link.current ? 'page' : undefined}
            onClick={() => setOpen(false)}
          >
            {link.label}
          </a>
        ))}
        <LanguageSwitch className={styles.mobileLang} />
      </nav>
    </header>
  )
}

// Secili dil eskiden sadece kalin yaziyla belli oluyordu, aria-pressed bunu
// ekran okuyucuya da soyluyor. Gorunen TR/EN metni ayrica Turkce/English diye
// etiketlenmedi cunku okunan ad gorunen metni icermeli, yoksa sesli komutla
// TR'ye bas diyen kullanici dugmeyi bulamaz. Ayrac da sesli okunmasin diye gizli.
function LanguageSwitch({ className }: { className?: string }) {
  const { language, setLanguage } = useLanguage()

  return (
    <span className={className}>
      <button
        type="button"
        className={cx(styles.langButton, language === 'tr' && styles.langActive)}
        aria-pressed={language === 'tr'}
        onClick={() => setLanguage('tr')}
      >
        TR
      </button>
      <span aria-hidden="true"> / </span>
      <button
        type="button"
        className={cx(styles.langButton, language === 'en' && styles.langActive)}
        aria-pressed={language === 'en'}
        onClick={() => setLanguage('en')}
      >
        EN
      </button>
    </span>
  )
}
