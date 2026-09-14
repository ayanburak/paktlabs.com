/*
file: Header.tsx
importable: Header

768px altinda .nav gizlenip yerine hamburger + acilir panel geciyor (bkz.
Header.module.css'teki @media). navLinks dizisi iki yerde (masaustu bar +
mobil panel) ayni linkleri tekrar yazmamak icin var, gercek ikinci kullanim
oldugu icin erken soyutlama sayilmiyor.

description: Hero'nun uzerinde duran, marka adi + disiplin baglantilari + dil degistirici tasiyan ust bar.
*/

import { useState } from 'react'

import logoUrl from '@/assets/brand/logo.svg'
import { disciplineUrls } from '@/content/disciplines'
import { useDict, useLanguage } from '@/i18n'
import { cx } from '@/lib/cx'

import styles from './Header.module.css'

export function Header() {
  const { brand, nav } = useDict()
  const { language, setLanguage } = useLanguage()
  const [open, setOpen] = useState(false)

  const navLinks = [
    { href: disciplineUrls.web, label: nav.web },
    { href: disciplineUrls.automation, label: nav.automation },
    { href: disciplineUrls.data, label: nav.data },
    { href: '#iletisim', label: nav.contact },
  ]

  return (
    <header className={styles.top}>
      <div className={styles.inner}>
        <a href="/">
          <img className={styles.brand} src={logoUrl} alt={brand} />
        </a>
        <nav className={styles.nav} aria-label="Ana menü">
          <span className={styles.links}>
            {navLinks.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </span>
          <span>
            <button
              type="button"
              className={cx(styles.langButton, language === 'tr' && styles.langActive)}
              onClick={() => setLanguage('tr')}
            >
              TR
            </button>
            {' / '}
            <button
              type="button"
              className={cx(styles.langButton, language === 'en' && styles.langActive)}
              onClick={() => setLanguage('en')}
            >
              EN
            </button>
          </span>
        </nav>
        <button
          type="button"
          className={styles.burger}
          aria-label={open ? 'Menüyü kapat' : 'Menüyü aç'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
      <nav className={cx(styles.mobileNav, open && styles.mobileNavOpen)} aria-label="Mobil menü">
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </a>
        ))}
        <span className={styles.mobileLang}>
          <button
            type="button"
            className={cx(styles.langButton, language === 'tr' && styles.langActive)}
            onClick={() => setLanguage('tr')}
          >
            TR
          </button>
          {' / '}
          <button
            type="button"
            className={cx(styles.langButton, language === 'en' && styles.langActive)}
            onClick={() => setLanguage('en')}
          >
            EN
          </button>
        </span>
      </nav>
    </header>
  )
}
