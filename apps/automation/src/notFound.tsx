/*
file: notFound.tsx

404.html'in girisi. main.tsx'in esi, yalnizca bulunamadi sayfasini acar.
nginx bilinmeyen her adreste bu dosyayi 404 koduyla dondurur.

description: automation sitesinin bulunamadi sayfasini dil saglayicisiyla birlikte acan giris dosyasi.
*/

import { mount } from '@paktlabs/brand/lib/mount'

import { NotFound } from './routes/NotFound/NotFound.tsx'
import '@paktlabs/brand/styles/global.css'

// global.css main.tsx'teki gibi bilesenlerden sonra import edilir.
mount(<NotFound />)
