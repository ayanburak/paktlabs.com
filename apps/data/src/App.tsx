/*
file: App.tsx
importable: App

data.paktlabs.com uc sayfadan olusur: veri sayfasi, calisma detay sayfasi ve
kod ve veri sayfasi. Rotalar sayfalar yazildikca buraya eklenir.

description: Dil saglayicisini ve rotalari kuran en ust bilesen.
*/

// NOTE: Router 2026-10-09'da createBrowserRouter kurulumuna gecti. Calisma
// sayfalarinin dosyalari ana JS'e gomulmuyor, sayfa acilmadan once rota
// yukleyicisinde indiriliyor. Kaydirmayi kutuphanenin ScrollRestoration'i
// yonetiyor, cunku konumu ancak yukleyici bitip sayfa tam boyuyla
// cizildikten sonra kuruyor. Bu kurulum JS'i yaklasik 17 KB buyutuyor ama
// her calismanin dosyalari ana JS'ten ciktigi icin ilk calismada dengeleniyor.
//
// XXX: Dosya indirilemezse yukleyici hata verir ve bulunamadi sayfasi
// gorunur. Sunucu hatasi icin ayri bir sayfa yok, madde 25.5'te kapsam
// disinda birakildi. Okur bu durumda yanlis bir mesaj gorur.

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { LanguageProvider } from '@paktlabs/brand/i18n/LanguageProvider'

import { assetFiles } from './content/studies/assetFiles'
import { Home } from './routes/Home/Home'
import { NotFound } from './routes/NotFound/NotFound'
import { Root } from './routes/Root'
import { Study } from './routes/Study/Study'
import { studyLoader } from './routes/studyLoader'
import { StudySource } from './routes/StudySource/StudySource'

// Iki calisma sayfasi ayni yukleyiciyi paylasir, dosyalarin kaynagi burada,
// tek yerde secilir. Ilk acilista yukleyici bitene kadar bos ekran cizilir.
const loadStudy = studyLoader(assetFiles)

const router = createBrowserRouter([
  {
    element: <Root />,
    errorElement: <NotFound />,
    HydrateFallback: () => null,
    children: [
      { path: '/', element: <Home /> },
      { path: '/work/:slug', element: <Study />, loader: loadStudy },
      { path: '/work/:slug/source', element: <StudySource />, loader: loadStudy },
      { path: '*', element: <NotFound /> },
    ],
  },
])

export function App() {
  return (
    <LanguageProvider>
      <RouterProvider router={router} />
    </LanguageProvider>
  )
}
