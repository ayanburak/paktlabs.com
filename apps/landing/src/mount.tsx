/*
file: mount.tsx
importable: mount

Landing'in uc giris dosyasinin ortak kurulumu. Sayfayi StrictMode ve dil
saglayicisiyla sarip root elemanina basar. CSS burada import edilmez:
global.css her giris dosyasinda bilesen import'larindan sonra gelmeli ki
derlenen CSS'te global kurallar bilesen kurallarindan sonra dursun.

description: Bir sayfa elemanini StrictMode ve LanguageProvider ile sarip root elemanina basan yardimci.
*/

import { StrictMode } from 'react'
import type { ReactElement } from 'react'
import { createRoot } from 'react-dom/client'

import { LanguageProvider } from '@paktlabs/brand/i18n/LanguageProvider'

// Root elemani yoksa sessizce bos sayfa yerine neyin eksik oldugunu soyler.
export function mount(page: ReactElement) {
  const root = document.getElementById('root')
  if (!root) throw new Error('mount: #root elemani bulunamadi')
  createRoot(root).render(
    <StrictMode>
      <LanguageProvider>{page}</LanguageProvider>
    </StrictMode>,
  )
}
