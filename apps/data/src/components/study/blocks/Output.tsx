/*
file: Output.tsx
importable: Output

Bir komutun terminal ciktisi. Kod dosyalarindan biraz daha koyu bir zeminde,
satir numarasiz ve renksiz durur. Baslikta yol yerine cikti oldugu yazar.
Metin verinin dilini izler, kod gibi.

description: Calismanin bir komut ciktisini terminal gorunumunde gosteren parca.
*/

import type { OutputBlock } from '@/content/studies/blocks'
import { useDict } from '@/i18n'

import { useStudyFile } from '../studyFiles'
import { CopyButton } from './FileActions'
import { FileFrame } from './FileFrame'
import { fileText } from './format'
import styles from './Output.module.css'

interface OutputProps {
  block: OutputBlock
}

export function Output({ block }: OutputProps) {
  const { study } = useDict()
  const text = fileText(useStudyFile('code', block.path).text)
  const lines = text.split('\n').length

  return (
    <FileFrame
      path={study.files.output.path}
      meta={`${lines} ${study.files.lines} · ${study.files.output.kind}`}
      action={<CopyButton text={text} />}
      tone="output"
    >
      <pre className={styles.text}>
        <code>{text}</code>
      </pre>
    </FileFrame>
  )
}
