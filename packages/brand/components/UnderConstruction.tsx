/*
file: UnderConstruction.tsx
importable: UnderConstruction

Henuz kurulmamis bir disiplin sitesinin yer tutucu bolumu. Ustte adres,
baslik ve kisa aciklama, ortada serit cekilmis bir vitrin ve icinde cizim,
altinda ziyaretciyi yayindaki yerlere goturen uc kart durur. Ust bar, alt
bilgi ve iletisim bolumu sitenin kendi sayfasindan gelir.

    <Page title={meta.title} description={meta.description} current="web" homeHref={mainSiteUrl}>
      <UnderConstruction discipline="web" title={page.title} lead={page.lead} art={<ArtSlot ... />} />
      <Contact />
    </Page>

Baslik ve aciklama siteye ozeldir, siteden gelir. Seritler, Bu arada basligi
ve kartlarin metinleri her sitede ayni oldugu icin ortak sozlukte
underConstruction altinda durur.

description: Serit cekilmis vitrin, cizim ve yonlendiren kartlardan olusan yapim asamasinda bolumu.
*/

// NOTE: kartlardan biri bugun yayinda olan tek disiplin sitesi, Veri. Web ya
// da Otomasyon yayina girdiginde bu bolumu kullanan yalnizca bir site kalir,
// o zaman kart listesi yeniden dusunulur. Ekip karti da bugun tek kisilik
// ekibin profiline gider, ikinci kisi gelince profil listesine cevrilir.

import type { ReactNode } from 'react'

import { contactPageUrl } from '../content/contact'
import { disciplineUrls, type Discipline } from '../content/disciplines'
import { profilePageUrl, profiles } from '../content/profiles'
import { useBrandDict } from '../i18n/useBrandDict'

import styles from './UnderConstruction.module.css'

interface UnderConstructionProps {
  discipline: Discipline
  title: string
  lead: string
  art: ReactNode
}

// Adres ustteki kucuk etikette gorunur, ziyaretci hangi alt alan adinda
// oldugunu bilsin diye. Disiplinin adresinden okunur, elle yazilmaz.
//
// Seritler vitrinin iki kosesinden gecer ve yalnizca susler, ayni mesaj
// baslikta zaten yazili. Ekran okuyucu bu yuzden onlari okumaz.
export function UnderConstruction({ discipline, title, lead, art }: UnderConstructionProps) {
  const { nav, underConstruction } = useBrandDict()
  const { tapes, meanwhile, cards } = underConstruction
  const host = new URL(disciplineUrls[discipline]).host

  const links = [
    { href: disciplineUrls.data, label: cards.data.label, title: nav.data, text: cards.data.text, live: true },
    { href: contactPageUrl, label: cards.contact.label, title: cards.contact.title, text: cards.contact.text },
    { href: profilePageUrl('ayanburak'), label: cards.team.label, title: profiles.ayanburak.name, text: cards.team.text },
  ]

  return (
    <section className={styles.underConstruction}>
      <div className={styles.head}>
        <span className={`eyebrow rise ${styles.host}`}>{host}</span>
        <h1 className={`rise ${styles.title}`}>{title}</h1>
        <p className={`rise ${styles.lead}`}>{lead}</p>
      </div>

      <div className={`rise ${styles.window}`}>
        <div className={styles.art}>{art}</div>
        {tapes.map((tape, i) => (
          <div key={tape} className={styles.tape} data-tape={i} aria-hidden="true">
            <span>{tape}</span>
          </div>
        ))}
      </div>

      <h2 className={`eyebrow ${styles.meanwhile}`}>{meanwhile}</h2>
      <ul className={styles.cards}>
        {links.map((link) => (
          <li key={link.href}>
            <a className={styles.card} href={link.href} data-live={link.live || undefined}>
              <span className={styles.label}>{link.label}</span>
              <span className={styles.cardTitle}>{link.title} →</span>
              <span className={styles.text}>{link.text}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
