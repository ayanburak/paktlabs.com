/*
file: notFound.tsx

404.html'in girisi. main.tsx'in esi, yalnizca bulunamadi sayfasini acar.
nginx bilinmeyen her adreste bu dosyayi 404 koduyla dondurur.

description: web sitesinin bulunamadi sayfasini dil saglayicisiyla birlikte acan giris dosyasi.
*/

import { mount } from '@paktlabs/brand/lib/mount'

import { NotFound } from './routes/NotFound/NotFound'
import '@paktlabs/brand/styles/global.css'

// global.css main.tsx'teki gibi bilesenlerden sonra import edilir.
mount(<NotFound />)
