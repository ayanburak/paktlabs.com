/*
file: App.tsx
importable: App

data.paktlabs.com'un sayfalari: veri sayfasi, calisma detay sayfasi, kod ve
veri sayfasi, hizmet sayfalari ve ekibe ozel blok katalogu. Rotalar sayfalar
yazildikca buraya eklenir.

description: Dil saglayicisini ve rotalari kuran en ust bilesen.
*/

// NOTE: Router 2026-10-09'da createBrowserRouter kurulumuna gecti. Calisma
// sayfalarinin metni ve dosyalari ana JS'e gomulmuyor, sayfa acilmadan once
// rota yukleyicisinde indiriliyor. Kaydirmayi kutuphanenin ScrollRestoration'i
// yonetiyor, cunku konumu ancak yukleyici bitip sayfa tam boyuyla
// cizildikten sonra kuruyor. Bu kurulum JS'i yaklasik 17 KB buyutuyor ama
// her calismanin metni ve dosyalari ana JS'ten ciktigi icin ilk calismada
// dengeleniyor.
//
// XXX: Dosya indirilemezse yukleyici hata verir ve bulunamadi sayfasi
// gorunur. Sunucu hatasi icin ayri bir sayfa yok, bilerek kapsam disinda
// birakildi. Okur bu durumda yanlis bir mesaj gorur.

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { LanguageProvider } from '@paktlabs/brand/i18n/LanguageProvider'

import { CATALOG_SLUG } from './content/studies'
import { assetFiles } from './content/studies/assetFiles'
import { Home } from './routes/Home/Home'
import { NotFound } from './routes/NotFound/NotFound'
import { Root } from './routes/Root'
import { Service } from './routes/Service/Service'
import { Study } from './routes/Study/Study'
import { sourceLoader, studyLoader } from './routes/studyLoader'
import { StudySource } from './routes/StudySource/StudySource'

// Dosyalarin kaynagi burada, tek yerde secilir ve iki yukleyiciye verilir.
// Ilk acilista yukleyici bitene kadar bos ekran cizilir.
const loadStudy = studyLoader(assetFiles)
const loadSource = sourceLoader(assetFiles)

const router = createBrowserRouter([
  {
    element: <Root />,
    errorElement: <NotFound />,
    HydrateFallback: () => null,
    children: [
      { path: '/', element: <Home /> },
      { path: '/work/:slug', element: <Study />, loader: loadStudy },
      { path: '/work/:slug/source', element: <StudySource />, loader: loadSource },
      { path: '/services/:slug', element: <Service /> },
      // Ekibe ozel blok katalogu, sunucuda sifreyle korunur. Kodu ayri
      // indirilir, ziyaretcinin acmadigi bir sayfa ana pakete yuk olmasin diye.
      { path: '/blocks', loader: () => assetFiles.load(CATALOG_SLUG), lazy: () => import('./routes/Blocks/Blocks') },
      { path: '*', element: <NotFound /> },
    ],
  },
])

// LanguageProvider router'in disinda durur, secilen dil sayfa gecislerinde
// ve hata sayfasinda da ayni kalir.
export function App() {
  return (
    <LanguageProvider>
      <RouterProvider router={router} />
    </LanguageProvider>
  )
}
