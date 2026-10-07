/*
file: NotFound.tsx
importable: NotFound

description: Bilinmeyen bir adreste ya da bulunamayan bir calismada gosterilen sayfa.
*/

import { Page } from '@/components/Page'
import { useDict } from '@/i18n'

import styles from './NotFound.module.css'

// Calisma rotasi da bilinmeyen bir slug gordugunde bu bileseni gosterir, bu
// yuzden ayri bir rota bileseni degil, her yerden cagrilabilen bir sayfa.
// Sunucu SPA fallback ile index.html dondugu icin HTTP durumu 200 kalir,
// sayfa yalnizca tarayicida bulunamadi der.
export function NotFound() {
  const { notFound } = useDict()

  return (
    <Page title={notFound.meta.title} description={notFound.meta.description}>
      <section className={styles.notFound}>
        <span className="eyebrow">404</span>
        <h1>{notFound.title}</h1>
        <p className={styles.lead}>{notFound.lead}</p>
        <a className={`cta primary ${styles.back}`} href="/#calismalar">
          {notFound.back}
        </a>
      </section>
    </Page>
  )
}
