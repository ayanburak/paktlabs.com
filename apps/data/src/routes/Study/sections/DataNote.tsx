/*
file: DataNote.tsx
importable: DataNote

Kapakta kunyenin altindaki veri dili notu. Sitenin dili calismanin orijinal
veri dilinden farkliysa cikar ve okura tablolarin cevrilmis haliyle
gorundugunu soyler. Tiklama yalnizca tablolarin dilini degistirir, sitenin
dilini degistirmez. Diller ayniysa not hic cikmaz.

description: Detay sayfasindaki tablolari orijinal veri diliyle cevrilmis hali arasinda degistiren not.
*/

import { useLanguage } from '@paktlabs/brand/i18n/language'

import { useDict } from '@/i18n'
import { useStudyData } from '@/routes/Study/studyData'

import styles from './DataNote.module.css'

// Dugme bir yere gitmedigi, sayfadaki bir seyi degistirdigi icin baglanti
// degil button. Dil adi calismanin orijinal dilinden, sitenin dilinde yazilir.
export function DataNote() {
  const { language: site } = useLanguage()
  const { study } = useDict()
  const data = useStudyData()
  const note = study.dataNote

  if (site === data.original) return null

  const showingOriginal = data.language === data.original

  return (
    <p className={styles.note}>
      {note.lead.before} {note.languages[data.original]}
      {note.lead.after} {showingOriginal ? note.original : note.translated}{' '}
      <button
        type="button"
        className={styles.toggle}
        onClick={() => data.setLanguage(showingOriginal ? site : data.original)}
      >
        {showingOriginal ? note.showTranslated : note.showOriginal}
      </button>
    </p>
  )
}
