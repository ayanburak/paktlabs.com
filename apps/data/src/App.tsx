/*
file: App.tsx
importable: App

data.paktlabs.com uc sayfadan olusur: veri sayfasi, calisma detay sayfasi ve
kod ve veri sayfasi. Rotalar sayfalar yazildikca buraya eklenir.

description: Dil saglayicisini ve rotalari kuran en ust bilesen.
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
