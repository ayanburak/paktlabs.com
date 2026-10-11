/*
file: Works.tsx
importable: Works

Calisma listesi ve suzgeci. Filtrele dugmesi etiket panelini acar, birden
fazla etiket secilebilir. Secili etiketlerden herhangi birini tasiyan calisma
gorunur, hic etiket secili degilse hepsi gorunur. Tumu secimi sifirlar.
Secimde hic calisma kalmazsa izgaranin yerine kisa bir uyari cikar.

Adreste ?tag=quality gibi bir kategori varsa sayfa o kategori secili ve
panel acik olarak acilir. Landing'in Veri bandi buraya boyle baglanir.

description: Veri sayfasindaki calisma listesini baslik satiri, suzgec ve altin bant icindeki kartlarla gosteren bolum.
*/

import { useId, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { dataTagParam, isDataTag, type DataTag } from '@paktlabs/brand/content/dataTags'
import { useReveal } from '@paktlabs/brand/hooks/useReveal'
import { cx } from '@paktlabs/brand/lib/cx'

import { studies } from '@/content/studies'
import { useDict } from '@/i18n'

import { FilterPanel } from './FilterPanel'
import { StudyCard } from './StudyCard'
import styles from './Works.module.css'

// Hero'daki dugme ve bulunamadi sayfasi #calismalar adresine gelir, kimlik
// bu yuzden bolumun kendisinde durur ve okur baslik satirindan baslar.
// Secim Works'te tutulur, cunku hem basliktaki dugmeler hem panel hem de kart
// izgarasi ayni secimi okur.
//
// Adresteki kategori yalnizca ilk acilista okunur, secim adrese geri
// yazilmaz. Yazilsaydi her tiklama React Router'da bir gecis olurdu ve
// ScrollRestoration sayfayi yukari atabilirdi. Bu yuzden Tumu'ye basip sayfa
// yenilenirse adresteki kategori yeniden secili gelir. Panel acik gelir ki
// okur neden tek kart ya da uyari gordugunu secili kutudan anlasin.
export function Works() {
  const { home } = useDict()
  const head = useReveal<HTMLDivElement>()
  const panelId = useId()
  const [params] = useSearchParams()
  const [linked] = useState(() => {
    const tag = params.get(dataTagParam)
    return tag !== null && isDataTag(tag) ? tag : undefined
  })
  const [open, setOpen] = useState(linked !== undefined)
  const [picked, setPicked] = useState<ReadonlySet<DataTag>>(() => new Set(linked ? [linked] : []))

  function toggle(tag: DataTag) {
    const next = new Set(picked)
    if (next.has(tag)) next.delete(tag)
    else next.add(tag)
    setPicked(next)
  }

  const shown = picked.size === 0 ? studies : studies.filter((study) => study.tags.some((tag) => picked.has(tag)))

  return (
    <section id="calismalar" aria-labelledby="works-title">
      <div ref={head.ref} className={cx('reveal', head.visible && 'in', styles.head)}>
        <div>
          <span className="eyebrow">{home.works.eyebrow}</span>
          <h2 id="works-title">{home.works.title}</h2>
        </div>
        <div className={styles.filters}>
          <button
            type="button"
            className={styles.chip}
            aria-pressed={picked.size === 0}
            onClick={() => setPicked(new Set())}
          >
            {home.works.filter.all}
          </button>
          <button
            type="button"
            className={cx(styles.chip, picked.size > 0 && styles.chipOn)}
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen(!open)}
          >
            {home.works.filter.toggle}
            {picked.size > 0 && <span className={styles.count}> · {picked.size}</span>}
            <span className={styles.caret} aria-hidden="true">
              ↓
            </span>
          </button>
        </div>
      </div>

      <FilterPanel id={panelId} open={open} picked={picked} onToggle={toggle} />

      <div className={styles.band}>
        <div className={styles.grid}>
          {shown.map((study) => (
            <StudyCard key={study.slug} study={study} />
          ))}
        </div>
        {/* Secili etiketlerde calisma yoksa izgara bos kalir, yerine kisa bir
            uyari cikar. Durum alani her zaman DOM'da durur, ekran okuyucu
            yalnizca var olan bir alanin icerigi degisince okur. Ikinci bir
            dugme yok, basliktaki Tumu secimi zaten sifirliyor. */}
        <div role="status" className={styles.status}>
          {shown.length === 0 && <p className={styles.empty}>{home.works.filter.empty}</p>}
        </div>
      </div>
    </section>
  )
}
