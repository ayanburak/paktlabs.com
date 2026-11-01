/*
file: contact.tsx

contact/index.html'in girisi. main.tsx'in esi, yalnizca iletisim sayfasini acar.
Gonderici burada secilir, mesajin gidecegi yer degisirse yalnizca bu satir
degisir.

description: Landing'in iletisim sayfasini dil saglayicisi ve gondericiyle birlikte acan giris dosyasi.
*/

import { mount } from '@paktlabs/brand/lib/mount'

import { Contact } from './routes/Contact/Contact'
import { apiSender } from './routes/Contact/apiSender'
import '@paktlabs/brand/styles/global.css'

// global.css main.tsx'teki gibi bilesenlerden sonra import edilir, derlenen
// CSS'te global kurallar bilesen kurallarindan sonra gelsin diye.
mount(<Contact sender={apiSender} />)
