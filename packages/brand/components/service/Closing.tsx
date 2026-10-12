/*
file: Closing.tsx
importable: Closing

Hizmet sayfasinin kapanisi. Koyu bantta buyuk bir soru, altinda iletisim
sayfasina ve o alandaki calismalara giden iki baglanti, en altta ayni
disiplindeki onceki ve sonraki hizmete gecis durur.

description: Iletisim ve calisma baglantilariyla komsu hizmetlere gecisi gosteren koyu kapanis bandi.
*/

import { contactPageUrl } from '../../content/contact'
import { useBrandDict } from '../../i18n/useBrandDict'
import { cx } from '../../lib/cx'

import type { ServiceLink } from './ServicePage'
import section from './section.module.css'
import styles from './Closing.module.css'

interface ClosingProps {
  worksHref: string
  prev: ServiceLink
  next: ServiceLink
}

// Ilk hizmetin oncesi sonuncusu, sonuncunun sonrasi ilkidir, bu donguyu
// rota kurar. Bolum yalnizca verilen iki baglantiyi gosterir.
export function Closing({ worksHref, prev, next }: ClosingProps) {
  const { service: dict } = useBrandDict()

  return (
    <section className={cx(section.section, styles.closing)} aria-labelledby="service-closing">
      <div className={section.inner}>
        <span className="eyebrow">{dict.closing.label}</span>
        <h2 id="service-closing" className={styles.title}>
          {dict.closing.title}
        </h2>
        <div className={styles.links}>
          <a className={styles.primary} href={contactPageUrl}>
            {dict.closing.contact}
          </a>
          <a href={worksHref}>{dict.closing.works}</a>
        </div>
        <nav className={styles.pager} aria-label={dict.closing.nav}>
          <a href={prev.href}>
            <span className="eyebrow">{dict.closing.prev}</span>
            {prev.number} {prev.name}
          </a>
          <a href={next.href}>
            <span className="eyebrow">{dict.closing.next}</span>
            {next.number} {next.name}
          </a>
        </nav>
      </div>
    </section>
  )
}
