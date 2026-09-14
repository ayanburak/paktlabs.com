/*
file: Footer.tsx
importable: Footer

description: Sayfanin en altindaki telif hakki satiri ve disiplin baglantilarini tasiyan alt bilgi bandi.
*/

import { useDict } from '@/i18n'

import styles from './Footer.module.css'

export function Footer() {
  const { nav, footer } = useDict()

  return (
    <footer className={styles.foot}>
      <div className={`wrap ${styles.inner}`}>
        <span>{footer.copy}</span>
        <nav aria-label="Alt menü">
          <a href="/web">{nav.web}</a>
          <a href="/automation">{nav.automation}</a>
          <a href="/data">{nav.data}</a>
        </nav>
      </div>
    </footer>
  )
}
