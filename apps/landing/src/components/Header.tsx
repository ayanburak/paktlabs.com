/*
file: Header.tsx
importable: Header

768px altinda .nav gizlenip yerine hamburger + acilir panel geciyor, esik
Header.module.css'teki @media'da. navLinks dizisi ve LanguageSwitch iki yerde
yani masaustu bar ve mobil panelde ayni seyi tekrar yazmamak icin var, gercek
ikinci kullanim oldugu icin erken soyutlama sayilmiyor.

description: Hero'nun uzerinde duran, marka adi + disiplin baglantilari + dil degistirici tasiyan ust bar.
*/

import { useEffect, useId, useRef, useState } from 'react'

import logoUrl from '@paktlabs/brand/assets/logo.svg'
import { disciplineUrls } from '@paktlabs/brand/content/disciplines'
import { useLanguage } from '@paktlabs/brand/i18n/language'
import { useBrandDict } from '@paktlabs/brand/i18n/useBrandDict'
import { cx } from '@paktlabs/brand/lib/cx'

import styles from './Header.module.css'

export function Header() {
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

  const navLinks = [
    { href: disciplineUrls.web, label: nav.web },
    { href: disciplineUrls.automation, label: nav.automation },
    { href: disciplineUrls.data, label: nav.data },
    { href: '#iletisim', label: nav.contact },
  ]

  // Iki nav ayni anda hic gorunmuyor, biri hep display:none. O yuzden ikisi de
  // ayni ana menu etiketini tasiyor, mobil ayrimi ekran okuyucuya bir sey anlatmiyor.
  return (
    <header className={styles.top}>
      <div className={styles.inner}>
        <a href="/">
          <img className={styles.brand} src={logoUrl} alt={brand} />
        </a>
        <nav className={styles.nav} aria-label={a11y.mainMenu}>
          <span className={styles.links}>
            {navLinks.map((link) => (
              <a key={link.href} href={link.href}>
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
          <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
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
