/*
file: main.tsx

index.html'in girisi, ana sayfayi acar. Site su an yapim asamasinda, tek
sayfasi brand'deki ortak yer tutucu bolumdur, router yoktur.

description: web sitesinin ana sayfasini acan giris dosyasi.
*/

import { mount } from '@paktlabs/brand/lib/mount'

import { Home } from './routes/Home/Home'
import '@paktlabs/brand/styles/global.css'

// global.css bilesenlerden sonra import edilir, derlenen CSS'te global
// kurallar bilesen kurallarindan sonra gelsin diye.
mount(<Home />)
