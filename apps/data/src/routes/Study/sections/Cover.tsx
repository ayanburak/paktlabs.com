/*
file: Cover.tsx
importable: Cover

Calisma detay sayfasinin acilis yuzu. Solda calismalara donus, etiketler,
baslik ve tek cumlelik aciklama, sagda kunye durur. Landing ve veri
sayfasindaki hero'lar gibi ekrani kaplar ama ortak hero yerlesimini
kullanmaz, cunku burada cizim yok, ikinci sutunda kunye var.

description: Calisma detay sayfasinin kapagini ve kunyesini gosteren bolum.
*/

import { useLanguage } from '@paktlabs/brand/i18n/language'

import { TagList } from '@/components/TagList'
import type { Study } from '@/content/studies/types'
import { useDict } from '@/i18n'

import styles from './Cover.module.css'

interface CoverProps {
  study: Study
}

// Donus baglantisi veri sayfasindaki listeye gider, bulunamadi sayfasindaki
// donus dugmesiyle ayni adres. Yanindaki numara konumu gosterir, baglanti
// degildir. Kunye satirlarinin sayisi ve adlari calismadan gelir, her satir
// bir terim ve aciklama cifti oldugu icin dl ile yazilir.
export function Cover({ study }: CoverProps) {
  const { language } = useLanguage()
  const { study: dict } = useDict()

  return (
    <section className={styles.cover}>
      <div className={styles.inner}>
        <div>
          <nav className={styles.crumb} aria-label={dict.cover.crumb}>
            <a href="/#calismalar">{dict.cover.back}</a>
            <span aria-hidden="true">/</span>
            <span>{study.number}</span>
          </nav>
          <TagList tags={study.tags} year={study.year} label={dict.cover.tags} className={styles.tags} />
          <h1 className={styles.title}>{study.title[language]}</h1>
          <p className={styles.lede}>{study.page.lede[language]}</p>
        </div>
        <dl className={styles.kunye}>
          {study.page.kunye.map((row) => (
            <div key={row.label[language]}>
              <dt>{row.label[language]}</dt>
              <dd>{row.value[language]}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
