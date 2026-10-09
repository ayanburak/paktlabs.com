/*
file: Code.tsx
importable: Code

Calismanin kodundan bir dosya: basliginda yolu, satir sayisi ve dili,
kopyalama dugmesi, govdesinde satir numaralari ve renklenmis metin. Dosya
verinin dilini izler, okur orijinal dile gecince yorumlari orijinal
haliyle gorur.

description: Calismanin bir kod dosyasini satir numaralari ve renklendirmeyle gosteren parca.
*/

import type { CodeBlock } from '@/content/studies/blocks'
import { useDict } from '@/i18n'

import { useStudyFile } from '../studyFiles'
import styles from './Code.module.css'
import { CopyButton } from './FileActions'
import { FileFrame } from './FileFrame'
import { fileText } from './format'
import { highlight } from './highlight'
import { codeLanguage } from './languages'
import { NumberedLines } from './NumberedLines'

interface CodeProps {
  block: CodeBlock
}

// Kopyalanan metin ekranda gorunen metnin aynisidir, satir numaralari ve
// renk isaretleri olmadan. Duz metin parcalari span'siz yazilir.
export function Code({ block }: CodeProps) {
  const { study } = useDict()
  const text = fileText(useStudyFile('code', block.path).text)
  const language = codeLanguage(block.path)
  const lines = text.split('\n').length

  return (
    <FileFrame
      path={block.path}
      meta={`${lines} ${study.files.lines} · ${language.label}`}
      action={<CopyButton text={text} />}
    >
      <NumberedLines count={lines}>
        {highlight(text, language).map((token, index) =>
          token.kind === 'plain' ? token.text : (
            <span key={index} className={styles[token.kind]}>
              {token.text}
            </span>
          ),
        )}
      </NumberedLines>
    </FileFrame>
  )
}
