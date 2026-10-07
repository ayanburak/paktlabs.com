/*
file: Footer.tsx
importable: Footer

PaktLabs sitelerinin ortak alt bilgisi. Landing hic prop vermeden kullanir,
disiplin siteleri ana siteye donus icin homeHref verir.

    <Footer homeHref="https://paktlabs.com" />

homeHref verilirse disiplin baglantilarinin sonuna bu adrese giden bir
paktlabs.com baglantisi eklenir, verilmezse alt bilgi yalnizca disiplinleri
gosterir.

description: Sayfanin en altindaki telif hakki satiri ve disiplin baglantilarini tasiyan alt bilgi bandi.
*/

import { disciplineUrls } from '../content/disciplines'
import { useBrandDict } from '../i18n/useBrandDict'

import styles from './Footer.module.css'

interface FooterProps {
  homeHref?: string
}

// Header'daki homeHref ile ayni adresi tasir ama burada varsayilani yok, cunku
// landing'in alt bilgisinde kendine donen bir baglanti anlamsiz olurdu. Baglanti
// metni bir alan adi oldugu icin iki dilde de ayni kalir, sozluge girmez.
export function Footer({ homeHref }: FooterProps) {
  const { nav, footer, a11y } = useBrandDict()

  return (
    <footer className={styles.foot}>
      <div className={`wrap ${styles.inner}`}>
        <span>{footer.copy}</span>
        <nav aria-label={a11y.footerMenu}>
          <a href={disciplineUrls.web}>{nav.web}</a>
          <a href={disciplineUrls.automation}>{nav.automation}</a>
          <a href={disciplineUrls.data}>{nav.data}</a>
          {homeHref && <a href={homeHref}>paktlabs.com</a>}
        </nav>
      </div>
    </footer>
  )
}
