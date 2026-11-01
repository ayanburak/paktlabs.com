/*
file: notFound.tsx

404.html'in girisi. main.tsx'in esi, yalnizca bulunamadi sayfasini acar. Sayfa hangi
adreste acilirsa acilsin ayni seyi gosterir.

description: Landing'in bulunamadi sayfasini dil saglayicisiyla birlikte acan giris dosyasi.
*/

import { mount } from '@paktlabs/brand/lib/mount'

import { NotFound } from './routes/NotFound/NotFound'
import '@paktlabs/brand/styles/global.css'

// global.css main.tsx'teki gibi bilesenlerden sonra import edilir, derlenen
// CSS'te global kurallar bilesen kurallarindan sonra gelsin diye.
mount(<NotFound />)
