/*
file: Chapter.tsx
importable: Chapter

Detay sayfasinin numarali bir bolumu: numara kutusu, kisa etiket, baslik,
giris paragrafi ve altinda parcalar. Parcalari BlockView ile gosterir, bu
yuzden yeni bir parca turu eklendiginde buraya dokunulmaz.

description: Calisma detay sayfasindaki bir bolumu basligi, girisi ve parcalariyla gosteren cerceve.
*/

import { useReveal } from '@paktlabs/brand/hooks/useReveal'
import { useLanguage } from '@paktlabs/brand/i18n/language'
import { cx } from '@paktlabs/brand/lib/cx'

import type { Chapter as ChapterContent } from '@/content/studies/types'
import { BlockView } from '@/routes/Study/blocks/BlockView'

import styles from './Chapter.module.css'
import { chapterNumber } from './chapterNumber'

interface ChapterProps {
  chapter: ChapterContent
  index: number
}

// index bolumun sayfadaki sirasidir, numara ondan uretilir. Ekran okuyucu
// numarayi atlar, bolumu basligiyla tanitir. Bolumun id'si adresteki parca
// oldugu icin icindekiler ve #sorun gibi bir baglanti dogrudan buraya gelir.
// Baslik satiri ve giris parcalar gibi ekrana girerken ayri ayri belirir.
export function Chapter({ chapter, index }: ChapterProps) {
  const { language } = useLanguage()
  const head = useReveal<HTMLElement>()
  const lede = useReveal<HTMLParagraphElement>()
  const headingId = `h-${chapter.id}`

  return (
    <section id={chapter.id} className={styles.chapter} aria-labelledby={headingId}>
      <header ref={head.ref} className={cx('reveal', head.visible && 'in', styles.head)}>
        <span className={styles.number} aria-hidden="true">
          {chapterNumber(index)}
        </span>
        <div>
          <span className="eyebrow">{chapter.label[language]}</span>
          <h2 id={headingId} className={styles.title}>
            {chapter.title[language]}
          </h2>
        </div>
      </header>
      <p ref={lede.ref} className={cx('reveal', lede.visible && 'in', styles.lede)}>
        {chapter.lede[language]}
      </p>
      <div className={styles.body}>
        {chapter.blocks.map((block, index) => (
          <BlockView key={index} block={block} />
        ))}
      </div>
    </section>
  )
}
