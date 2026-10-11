/*
file: Services.tsx
importable: Services

Veri sayfasinda hero ile calismalar arasinda duran hizmetler panosu. Alti
hizmet panoya altin raptiyelerle tutturulmus kagitlar gibi dizilir, her
kagit hizmetin kendi sayfasina gider. Hizmetlerin sirasi ve adi brand'deki
dataTags.ts'ten ve brand sozlugunden, kisa aciklamasi content/services'ten
gelir. Bilesen yalnizca dizer, yeni bir hizmet bu dosyaya dokunmadan eklenir.

description: Veri hizmetlerini panoya tutturulmus kagitlar olarak gosterip hizmet sayfalarina baglayan bolum.
*/

import type { CSSProperties } from 'react'

import { dataServicePath, dataTags } from '@paktlabs/brand/content/dataTags'
import { useLanguage } from '@paktlabs/brand/i18n/language'
import { useBrandDict } from '@paktlabs/brand/i18n/useBrandDict'

import { services } from '@/content/services'
import { useDict } from '@/i18n'

import { ServiceNote } from './ServiceNote'
import styles from './Services.module.css'

// Bolum bir liste, her kagit bir liste ogesi. Kagitlarin egikligi ve
// sirayla dusme gecikmesi siradan gelir, icerikte yazilmaz.
export function Services() {
  const { home } = useDict()
  const { dataTags: names } = useBrandDict()
  const { language } = useLanguage()

  return (
    <section id="hizmetler" className={styles.services} aria-labelledby="services-title">
      <div className={styles.head}>
        <div>
          <span className="eyebrow">{home.services.eyebrow}</span>
          <h2 id="services-title">{home.services.title}</h2>
        </div>
        <p className={styles.lead}>{home.services.lead}</p>
      </div>
      <ul className={styles.board}>
        {dataTags.map((tag, i) => (
          <li key={tag} style={{ '--i': i } as CSSProperties}>
            <ServiceNote
              number={String(i + 1).padStart(2, '0')}
              title={names[tag]}
              summary={services[tag].summary[language]}
              go={home.services.go}
              to={dataServicePath(tag)}
            />
          </li>
        ))}
      </ul>
    </section>
  )
}
