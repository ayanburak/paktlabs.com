/*
file: UnderConstruction.tsx
importable: UnderConstruction

Henuz kurulmamis bir disiplin sitesinin yer tutucu bolumu. Sahnede bos bir
yapi tabelasi ve merdivenin ustunde tabelanin son vidasini sikan Ada durur.
Baslik, kisa aciklama ve iki dugme bu tabelanin icine yazilir. Dugmelerden
biri yayindaki Veri sitesine, digeri iletisim sayfasina gider. Tabelanin
direkleri hemen altindaki alt bilginin ust cizgisine basar.

    <Page title={meta.title} description={meta.description} current="web" homeHref={mainSiteUrl}>
      <UnderConstruction title={home.title} lead={home.lead} />
    </Page>

Baslik ve aciklama siteye ozeldir, siteden gelir. Cizim her sitede ayni
oldugu icin bolumun kendisinde durur, dugme metinleri ortak sozlukte
underConstruction altindadir.

description: Bos yapi tabelasini kuran Ada'yi ve tabelanin icine yazilan metni gosteren yapim asamasinda bolumu.
*/

// NOTE: metin cizimin ustune konan ayri bir kutu, yeri construction.svg'deki
// tabelanin bos alanina gore yuzdeyle verilmis. Cizim degisirse ya da yeniden
// izlenirse bu yuzdeler CSS'te yeniden olculur, yoksa yazi tabeladan tasar.
//
// NOTE: dugmelerden biri bugun yayinda olan tek disiplin sitesine, Veri'ye
// gidiyor. Web ya da Otomasyon yayina girdiginde bu bolumu kullanan yalnizca
// bir site kalir, o zaman bu dugme yeniden dusunulur.

import constructionUrl from '../assets/construction.svg'
import { contactPageUrl } from '../content/contact'
import { disciplineUrls } from '../content/disciplines'
import { useBrandDict } from '../i18n/useBrandDict'

import styles from './UnderConstruction.module.css'

interface UnderConstructionProps {
  title: string
  lead: string
}

// Cizim yalnizca susler, ayni mesaj baslikta zaten yazili, ekran okuyucu onu
// okumaz. Metin DOM'da cizimden once gelir, okuma sirasi ekrandakiyle ayni.
export function UnderConstruction({ title, lead }: UnderConstructionProps) {
  const { underConstruction } = useBrandDict()
  const { actions } = underConstruction

  return (
    <section className={styles.underConstruction}>
      <div className={styles.scene}>
        <div className={styles.sign}>
          <h1 className={`rise ${styles.title}`}>{title}</h1>
          <p className={`rise ${styles.lead}`}>{lead}</p>
          <div className={`rise ${styles.actions}`}>
            <a className="cta primary" href={disciplineUrls.data}>
              {actions.data}
            </a>
            <a className="cta" href={contactPageUrl}>
              {actions.contact}
            </a>
          </div>
        </div>
        <img className={styles.art} src={constructionUrl} alt="" aria-hidden="true" />
      </div>
    </section>
  )
}
