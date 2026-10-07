/*
file: App.tsx
importable: App

Landing tek Home rotasindan olusur. Disiplin baglantilari kendi subdomain
adreslerine gider, bu uygulamada onlar icin alt sayfa tanimlanmaz.

description: Dil saglayicisini ve rotayi kuran en ust bilesen.
*/

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { LanguageProvider } from '@paktlabs/brand/i18n/LanguageProvider'

import { Home } from './routes/Home/Home'

export function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  )
}
