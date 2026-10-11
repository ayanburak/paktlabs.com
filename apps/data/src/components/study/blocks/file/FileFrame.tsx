/*
file: FileFrame.tsx
importable: FileFrame

Kod sayfasindaki dosya gorunumlerinin ortak cercevesi: ustte dosyanin yolu,
satir sayisi gibi bilgileri ve bir dugme, altta dosyanin metni. Kod
dosyasi, terminal ciktisi ve veri dosyasi ayni cerceveyi kullanir,
yalnizca govdeleri ve dugmeleri farklidir.

    <FileFrame path="rules/catalog.py" meta="76 satır · Python" action={<CopyButton text={text} />}>
      ...
    </FileFrame>

description: Dosya yolunu, bilgisini ve dugmesini tasiyan koyu zeminli dosya cercevesi.
*/

// NOTE: Kok oge data-file tasir. Bolum cercevesi art arda gelen dosyalarin
// arasini bu isarete bakip daraltir, cercevenin CSS modulu sinifi disaridan
// okunamadigi icin boyle.

import type { ReactNode } from 'react'

import { useReveal } from '@paktlabs/brand/hooks/useReveal'
import { cx } from '@paktlabs/brand/lib/cx'

import styles from './FileFrame.module.css'

interface FileFrameProps {
  path: string
  meta: string
  action: ReactNode
  tone?: 'code' | 'output'
  children: ReactNode
}

// output terminal ciktisinin biraz daha koyu zeminidir, okur kodla ciktiyi
// bir bakista ayirsin diye. Cerceve ekrana girerken belirir.
export function FileFrame({ path, meta, action, tone = 'code', children }: FileFrameProps) {
  const { ref, visible } = useReveal<HTMLElement>()

  return (
    <figure ref={ref} data-file className={cx('reveal', visible && 'in', styles.frame, tone === 'output' && styles.output)}>
      <figcaption className={styles.head}>
        <span className={styles.path}>{path}</span>
        <span className={styles.meta}>{meta}</span>
        {action}
      </figcaption>
      <div className={styles.body}>{children}</div>
    </figure>
  )
}
