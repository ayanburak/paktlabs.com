/*
file: Disciplines.tsx
importable: Disciplines

description: Gold bant icinde figur ve uc disiplin kartini bir arada gosteren bolum.
*/

import inceleyinSvg from '@/assets/illustrations/inceleyin.svg'
import { DisciplineCard } from '@/components/DisciplineCard'
import { RevealImg } from '@/components/RevealImg'
import { useDict } from '@/i18n'
import { cx } from '@/lib/cx'

import styles from './Disciplines.module.css'

export function Disciplines() {
  const { disciplines } = useDict()
  const cards = [
    { key: 'data', ...disciplines.items.data },
    { key: 'automation', ...disciplines.items.automation },
    { key: 'web', ...disciplines.items.web },
  ] as const

  return (
    <section id="disiplinler" className={cx('full-bleed', styles.disciplines)}>
      <div className={styles.wrap}>
        <RevealImg
          src={inceleyinSvg}
          alt="Çalışmalarımızı inceleyin yazılı bir tabela tutan, kartları işaret eden figür"
          className={styles.art}
        />
        <div className={styles.grid}>
          {cards.map((item) => (
            <DisciplineCard
              key={item.key}
              title={item.title}
              description={item.desc}
              go={disciplines.go}
              href=""
            />
          ))}
        </div>
      </div>
    </section>
  )
}
