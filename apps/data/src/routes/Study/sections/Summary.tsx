/*
file: Summary.tsx
importable: Summary

Kapagin altindaki Sorun, Yaklasim ve Sonuc bandi. Sayfayi yalnizca kaydirip
gecen okur isin tamamini bu uc paragraftan anlar. Paragraflar calismanin
page.ts dosyasindan, basliklar sitenin sozlugunden gelir, cunku her
calismada ayni uc baslik durur.

description: Calisma detay sayfasindaki uc sutunlu ozet bandini gosteren bolum.
*/

import { useReveal } from '@paktlabs/brand/hooks/useReveal'
import { useLanguage } from '@paktlabs/brand/i18n/language'
import { cx } from '@paktlabs/brand/lib/cx'

import type { StudyPage } from '@/content/studies/types'
import { useDict } from '@/i18n'

import styles from './Summary.module.css'

interface SummaryColumnProps {
  title: string
  text: string
}

// Her sutun ekrana girerken kendi basina belirir, mockup'taki gibi. Masaustunde
// uc sutun ayni satirda oldugu icin birlikte, mobilde alt alta oldugu icin
// sirayla belirirler. Belirme kancasi sutun basina bir tane oldugu icin sutun
// ayri bir bilesen.
function SummaryColumn({ title, text }: SummaryColumnProps) {
  const { ref, visible } = useReveal<HTMLDivElement>()

  return (
    <div ref={ref} className={cx('reveal', visible && 'in', styles.column)}>
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  )
}

interface SummaryProps {
  summary: StudyPage['summary']
}

// Sutunlarin sirasi her calismada ayni: once sorun, sonra yaklasim, en son
// sonuc. Bant bir bolum olarak ekran okuyucuya ozet adiyla tanitilir.
export function Summary({ summary }: SummaryProps) {
  const { language } = useLanguage()
  const { study } = useDict()

  return (
    <section className={styles.summary} aria-label={study.summary.label}>
      <div className={styles.inner}>
        <SummaryColumn title={study.summary.problem} text={summary.problem[language]} />
        <SummaryColumn title={study.summary.approach} text={summary.approach[language]} />
        <SummaryColumn title={study.summary.result} text={summary.result[language]} />
      </div>
    </section>
  )
}
