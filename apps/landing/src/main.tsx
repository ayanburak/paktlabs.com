/*
file: main.tsx

index.html'in girisi, ana sayfayi acar. Disiplin baglantilari kendi subdomain
adreslerine gider, bu sitede router yoktur.

description: Landing'in ana sayfasini acan giris dosyasi.
*/

import { mount } from '@paktlabs/brand/lib/mount'

import { Home } from './routes/Home/Home'
import '@paktlabs/brand/styles/global.css'

// global.css bilesenlerden sonra import edilir, derlenen CSS'te global
// kurallar bilesen kurallarindan sonra gelsin diye.
mount(<Home />)
