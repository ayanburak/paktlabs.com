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
import { NotFound } from './routes/NotFound/NotFound'
import { Study } from './routes/Study/Study'

export function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work/:slug" element={<Study />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  )
}
