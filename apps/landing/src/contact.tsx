/*
file: contact.tsx

contact/index.html'in girisi. main.tsx'in esi, App yerine yalnizca iletisim
sayfasini acar. Router kurulmaz, cunku sayfa tek bir adreste durur.
Gonderici burada secilir, mesajin gidecegi yer degisirse yalnizca bu satir
degisir.

description: Landing'in iletisim sayfasini dil saglayicisi ve gondericiyle birlikte acan giris dosyasi.
*/

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { LanguageProvider } from '@paktlabs/brand/i18n/LanguageProvider'

import { Contact } from './routes/Contact/Contact.tsx'
import { apiSender } from './routes/Contact/apiSender.ts'
import '@paktlabs/brand/styles/global.css'

// global.css main.tsx'teki gibi bilesenlerden sonra import edilir, derlenen
// CSS'te global kurallar bilesen kurallarindan sonra gelsin diye.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <Contact sender={apiSender} />
    </LanguageProvider>
  </StrictMode>,
)
