/*
file: mount.tsx
importable: mount

Cok sayfali sitelerin, yani landing'in ve yapim asamasindaki web ile
automation sitelerinin, giris dosyalarinin ortak kurulumu. Sayfayi StrictMode
ve dil saglayicisiyla sarip root elemanina basar. CSS burada import edilmez:
global.css her giris dosyasinda bilesen import'larindan sonra gelmeli ki
derlenen CSS'te global kurallar bilesen kurallarindan sonra dursun.

    import { mount } from '@paktlabs/brand/lib/mount'

    import { Home } from './routes/Home/Home'
    import '@paktlabs/brand/styles/global.css'

    mount(<Home />)

description: Bir sayfa elemanini StrictMode ve LanguageProvider ile sarip root elemanina basan yardimci.
*/

import { StrictMode } from 'react'
import type { ReactElement } from 'react'
import { createRoot } from 'react-dom/client'

import { LanguageProvider } from '../i18n/LanguageProvider'

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
