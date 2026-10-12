/*
file: Hero.tsx
importable: Hero

Hizmet sayfasinin kapagi. Ustte hizmetler listesine donus ve hizmetin
disiplin icindeki sirasi, altinda iki satira bolunmus buyuk baslik durur.
Basligin son kelimesi altin bir blogun icindedir. Altta solda aciklama ve
iki dugme, sagda hizmetin kimin icin ve ne zaman gerektigini soyleyen kunye
yer alir.

description: Hizmet sayfasinin baslik, aciklama, dugmeler ve kunyeden olusan kapak bolumu.
*/

import { contactPageUrl } from '../../content/contact'
import type { Service } from '../../content/service'
import { useLanguage, type Localized } from '../../i18n/language'
import { useBrandDict } from '../../i18n/useBrandDict'

import styles from './Hero.module.css'

interface HeroProps {
  discipline: string
  number: string
  total: string
  title: string
  lede: Localized
  facts: Service['facts']
  backHref: string
  worksHref: string
}

// Baslik son bosluktan ikiye ayrilir, son kelime altin bloga girer. Tek
// kelimelik bir adda, ornegin Analiz, butun ad blogun icinde kalir. Satir
// sonundan once bir bosluk birakilir, br metne bosluk katmadigi icin ekran
// okuyucu yoksa iki kelimeyi bitisik okurdu.
function splitTitle(title: string): [string, string] {
  const cut = title.lastIndexOf(' ')
  return cut === -1 ? ['', title] : [title.slice(0, cut), title.slice(cut + 1)]
}

// Kunye bir tanim listesi, ekran okuyucu etiketi ve degeri birlikte okur.
export function Hero({ discipline, number, total, title, lede, facts, backHref, worksHref }: HeroProps) {
  const { language } = useLanguage()
  const { service: dict } = useBrandDict()
  const [head, last] = splitTitle(title)

  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.crumb}>
          <a href={backHref}>{dict.back}</a>
          <span>
            {discipline} · {number} / {total}
          </span>
        </div>

        <h1 className={styles.title}>
          {head && (
            <>
              {head} <br />
            </>
          )}
          <span className={styles.mark}>{last}</span>
        </h1>

        <div className={styles.row}>
          <div>
            <p className={styles.lede}>{lede[language]}</p>
            <div className={styles.actions}>
              <a className="cta primary" href={contactPageUrl}>
                {dict.actions.contact} →
              </a>
              <a className="cta" href={worksHref}>
                {dict.actions.works}
              </a>
            </div>
          </div>

          <dl className={styles.facts} aria-label={dict.facts.label}>
            <div>
              <dt className="eyebrow">{dict.facts.who}</dt>
              <dd>{facts.who[language]}</dd>
            </div>
            <div>
              <dt className="eyebrow">{dict.facts.when}</dt>
              <dd>{facts.when[language]}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}
