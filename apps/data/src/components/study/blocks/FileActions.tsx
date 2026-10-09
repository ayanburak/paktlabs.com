/*
file: FileActions.tsx
importable: CopyButton, DownloadLink

Dosya cercevesinin basligindaki iki dugme. CopyButton dosyanin metnini panoya
kopyalar, kod sayfasindaki etkilesim kuralinin izinli istisnasidir.
DownloadLink dosyanin kendisini indirir.

description: Dosya cercevesinin kopyalama dugmesi ve indirme baglantisi.
*/

import { useEffect, useState } from 'react'

import { cx } from '@paktlabs/brand/lib/cx'

import { useDict } from '@/i18n'

import styles from './FileActions.module.css'

// Dugmenin "kopyalandi" yazisinda kalma suresi, milisaniye. Okurun gormesine
// yetecek, ikinci bir kopyalamayi bekletmeyecek kadar.
const COPIED_FOR = 1600

interface CopyButtonProps {
  text: string
}

// Pano izni verilmezse ya da tarayici panoyu desteklemezse dugme yazisini
// degistirmez, okur metni elle secip kopyalayabilir. Yazi ekran okuyucuya da
// duyurulur.
export function CopyButton({ text }: CopyButtonProps) {
  const { study } = useDict()
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timer = setTimeout(() => setCopied(false), COPIED_FOR)
    return () => clearTimeout(timer)
  }, [copied])

  async function copy() {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  return (
    <button type="button" className={styles.action} onClick={copy} aria-live="polite">
      {copied ? study.files.copied : study.files.copy}
    </button>
  )
}

interface DownloadLinkProps {
  url: string
  name: string
}

// Derlenen dosyanin adi icerikten uretilmis bir ek tasir, download ozniteligi
// indirilen dosyaya okurun gordugu adi verir.
export function DownloadLink({ url, name }: DownloadLinkProps) {
  const { study } = useDict()

  return (
    <a className={cx(styles.action, styles.download)} href={url} download={name}>
      {study.files.download}
    </a>
  )
}
