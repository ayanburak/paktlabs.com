/*
file: Root.tsx
importable: Root

Butun rotalarin ortak cercevesi. Ekrana kendi bir sey cizmez, bulunulan
sayfayi ve kaydirma yoneticisini tasir.

description: Rotalari saran ve sayfa gecislerinde kaydirma konumunu yoneten cerceve.
*/

import { Outlet, ScrollRestoration } from 'react-router-dom'

// Ileri gidilen sayfa en ustten, adreste bir bolum varsa o bolumden acilir.
// Geri ve ileri dugmesinde okur kaldigi yere doner. Ikisi de sayfa tam
// boyuyla cizildikten sonra olur, cunku calisma sayfalarinin dosyalari
// rota yukleyicisinde, sayfa cizilmeden once gelir.
export function Root() {
  return (
    <>
      <Outlet />
      <ScrollRestoration />
    </>
  )
}
