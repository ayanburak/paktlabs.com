/*
file: notFound.tsx

404.html'in girisi. main.tsx'in esi, App yerine yalnizca bulunamadi sayfasini
acar. Router kurulmaz, cunku bu sayfa hangi adreste acilirsa acilsin ayni
seyi gosterir.

description: Landing'in bulunamadi sayfasini dil saglayicisiyla birlikte acan giris dosyasi.
*/

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { LanguageProvider } from '@paktlabs/brand/i18n/LanguageProvider'

import { NotFound } from './routes/NotFound/NotFound.tsx'
import '@paktlabs/brand/styles/global.css'

// global.css main.tsx'teki gibi bilesenlerden sonra import edilir, derlenen
// CSS'te global kurallar bilesen kurallarindan sonra gelsin diye.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <NotFound />
    </LanguageProvider>
  </StrictMode>,
)
