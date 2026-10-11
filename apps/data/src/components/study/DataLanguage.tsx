/*
file: DataLanguage.tsx
importable: DataLanguage

Calisma sayfalarinin 00 numarali veri dili bolumu. Sitenin dili calismanin
orijinal veri dilinden farkliysa ilk bolumden once cikar ve calismanin
dosyalarinin cevrilmis ile orijinal hali arasinda gecis yapan iki secenekli
bir secici tasir. Secici yalnizca dosyalarin dilini degistirir, sitenin
dilini degistirmez. Diller ayniysa bolum hic cikmaz, bunu Body karar verir.
Giris paragrafi ve secicinin adi sayfadan gelir, detay sayfasi tablolari,
kod sayfasi kod ve veri dosyalarini anar.

description: Calisma sayfalarindaki dosyalarin dilini secen 00 numarali bolum.
*/

import { useLanguage } from '@paktlabs/brand/i18n/language'

import { useDict } from '@/i18n'

import { Chapter } from './Chapter'
import styles from './DataLanguage.module.css'
import { useDataLanguage } from './dataLanguageContext'

export const DATA_LANGUAGE_ID = 'data-language'

// Veri dili bolumu numaralanan bolumlerden once geldigi icin sifir numarasini
// alir. Icindekiler ve bolumun kendisi ayni numarayi gostersin diye tek yerde.
export const DATA_LANGUAGE_NUMBER = '00'

// Bolumun sayfaya gore degisen iki metni: giris paragrafi ve secicinin ekran
// okuyucuya okunan adi.
export interface DataLanguageText {
  lede: string
  group: string
}

interface DataLanguageProps {
  text: DataLanguageText
}

// Iki secenek ust bardaki TR ve EN secicisi gibi calisir, secili olan koyu
// durur. Tek bir dugme yerine iki secenek, okur tiklamadan once dosyalarin
// hangi halde oldugunu bir bakista gorsun diye. Secenek adlari sitenin
// dilinde, dil adlariyla birlikte yazilir. Bolumun adi, basligi ve secenek
// adlari iki sayfada ortaktir ve sozlukten gelir.
export function DataLanguage({ text }: DataLanguageProps) {
  const { language: site } = useLanguage()
  const { study } = useDict()
  const data = useDataLanguage()
  const common = study.dataLanguage
  const options = [
    { language: site, label: `${common.translated} · ${common.languages[site]}` },
    { language: data.original, label: `${common.original} · ${common.languages[data.original]}` },
  ]

  return (
    <Chapter
      id={DATA_LANGUAGE_ID}
      number={DATA_LANGUAGE_NUMBER}
      label={common.label}
      title={`${common.title} ${common.languages[data.original]}`}
      lede={text.lede}
    >
      <div className={styles.switch} role="group" aria-label={text.group}>
        {options.map((option) => (
          <button
            key={option.language}
            type="button"
            className={styles.option}
            aria-pressed={data.language === option.language}
            onClick={() => data.setLanguage(option.language)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </Chapter>
  )
}
