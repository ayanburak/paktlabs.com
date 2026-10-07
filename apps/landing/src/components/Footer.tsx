/*
file: Footer.tsx
importable: Footer

description: Sayfanin en altindaki telif hakki satiri ve disiplin baglantilarini tasiyan alt bilgi bandi.
*/

import { disciplineUrls } from '@paktlabs/brand/content/disciplines'

import { useDict } from '@/i18n'

import styles from './Footer.module.css'

export function Footer() {
  const { nav, footer, a11y } = useDict()

  return (
    <footer className={styles.foot}>
      <div className={`wrap ${styles.inner}`}>
        <span>{footer.copy}</span>
        <nav aria-label={a11y.footerMenu}>
          <a href={disciplineUrls.web}>{nav.web}</a>
          <a href={disciplineUrls.automation}>{nav.automation}</a>
          <a href={disciplineUrls.data}>{nav.data}</a>
        </nav>
      </div>
    </footer>
  )
}
