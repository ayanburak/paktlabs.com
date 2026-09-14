/*
file: App.tsx
importable: App

Su an tek gercek rota Home. /web /automation /data CLAUDE.md'de planli ama
henuz kendi sayfalari kurulmadi, o yuzden burada tanimlanmadilar, disiplin
kartlarindaki ve nav'daki linkler su an hedefsiz kaliyor, bu bilerek boyle.

description: Dil saglayicisini ve rotayi kuran en ust bilesen.
*/

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { LanguageProvider } from '@/i18n'

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
