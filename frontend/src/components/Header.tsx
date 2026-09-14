/*
file: Header.tsx
importable: Header

description: Hero'nun uzerinde duran, marka adi + disiplin baglantilari + dil degistirici tasiyan ust bar.
*/

import logoUrl from '@/assets/brand/logo.svg'
import { useDict, useLanguage } from '@/i18n'
import { cx } from '@/lib/cx'

import styles from './Header.module.css'

export function Header() {
  const { brand, nav } = useDict()
  const { language, setLanguage } = useLanguage()

  return (
    <header className={styles.top}>
      <div className={styles.inner}>
        <a href="/">
          <img className={styles.brand} src={logoUrl} alt={brand} />
        </a>
        <nav className={styles.nav} aria-label="Ana menü">
          <span className={styles.links}>
            <a href="/web">{nav.web}</a>
            <a href="/automation">{nav.automation}</a>
            <a href="/data">{nav.data}</a>
            <a href="#iletisim">{nav.contact}</a>
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
      </div>
    </header>
  )
}
