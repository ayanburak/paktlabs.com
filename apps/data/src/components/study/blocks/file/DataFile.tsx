/*
file: DataFile.tsx
importable: DataFile

Indirilebilir bir veri dosyasi: basliginda adi, satir, sutun ve boyutu,
indirme baglantisi, govdesinde dosyanin tam metni satir numaralariyla,
altinda bir not. Onizleme ve indirilen dosya ayni dosyadir. Dosya ve adi
verinin dilini, not sitenin dilini izler.

description: Calismanin bir veri dosyasini onizlemesi ve indirme baglantisiyla gosteren parca.
*/

// NOTE: Kok oge data-datafile tasir, bolum cercevesi art arda gelen veri
// dosyalarinin arasini bu isarete gore ayarlar.

import { useLanguage } from '@paktlabs/brand/i18n/language'

import type { DataFileBlock } from '@/content/studies/blocks'
import { parseCsv } from '@/content/studies/csv'
import { useDict } from '@/i18n'

import { useDataLanguage } from '../../dataLanguageContext'
import { useStudyFile } from '../../studyFiles'
import styles from './DataFile.module.css'
import { DownloadLink } from './FileActions'
import { FileFrame } from './FileFrame'
import { fileText, formatSize } from './fileFormat'
import { NumberedLines } from './NumberedLines'

interface DataFileProps {
  block: DataFileBlock
}

// Satir sayisi baslik satiri disindaki kayitlardir, sutun sayisi baslik
// satirindan cikar. Boyut indirilen dosyanin bayt olarak boyutudur, metnin
// UTF-8 karsiligindan hesaplanir. Baslik satiri kalin yazilir, okur
// sutunlarin adini bir bakista gorsun diye.
export function DataFile({ block }: DataFileProps) {
  const { language: site } = useLanguage()
  const { study } = useDict()
  const data = useDataLanguage()
  const file = useStudyFile('data', `${block.csv}.csv`)
  const text = fileText(file.text)
  const [header, ...records] = text.split('\n')
  const columns = parseCsv(header)[0]?.length ?? 0
  const size = formatSize(new TextEncoder().encode(file.text).length, site, study.files.bytes)
  const name = block.name[data.language]

  return (
    <div data-datafile>
      <FileFrame
        path={name}
        meta={`${records.length} ${study.files.lines} · ${columns} ${study.files.columns} · ${size}`}
        action={<DownloadLink url={file.url} name={name} />}
      >
        <NumberedLines count={records.length + 1}>
          <b className={styles.header}>{header}</b>
          {records.map((record) => `\n${record}`)}
        </NumberedLines>
      </FileFrame>
      {block.note && <p className={styles.note}>{block.note[site]}</p>}
    </div>
  )
}
