/*
file: DataLanguage.tsx
importable: DataLanguage

Detay sayfasinin 00 numarali veri dili bolumu. Sitenin dili calismanin
orijinal veri dilinden farkliysa ilk bolumden once cikar ve tablolarin
cevrilmis ile orijinal hali arasinda gecis yapan iki secenekli bir secici
tasir. Secici yalnizca tablolarin dilini degistirir, sitenin dilini
degistirmez. Diller ayniysa bolum hic cikmaz, bunu Body karar verir.

description: Detay sayfasindaki tablolarin dilini secen 00 numarali bolum.
*/

import { useLanguage } from '@paktlabs/brand/i18n/language'

import { useDict } from '@/i18n'
import { useStudyData } from '@/routes/Study/studyData'

import { Chapter } from './Chapter'
import styles from './DataLanguage.module.css'

export const DATA_LANGUAGE_ID = 'veri-dili'

// Iki secenek ust bardaki TR ve EN secicisi gibi calisir, secili olan koyu
// durur. Tek bir dugme yerine iki secenek, okur tiklamadan once tablolarin
// hangi halde oldugunu bir bakista gorsun diye. Secenek adlari sitenin
// dilinde, dil adlariyla birlikte yazilir.
export function DataLanguage() {
  const { language: site } = useLanguage()
  const { study } = useDict()
  const data = useStudyData()
  const text = study.dataLanguage
  const options = [
    { language: site, label: `${text.translated} · ${text.languages[site]}` },
    { language: data.original, label: `${text.original} · ${text.languages[data.original]}` },
  ]

  return (
    <Chapter
      id={DATA_LANGUAGE_ID}
      number="00"
      label={text.label}
      title={`${text.title} ${text.languages[data.original]}`}
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
