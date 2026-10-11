/*
file: contact.tsx

contact/index.html'in girisi. main.tsx'in esi, yalnizca iletisim sayfasini acar.
Gonderici burada secilir, mesajin gidecegi yer degisirse yalnizca bu satir
degisir.

description: Landing'in iletisim sayfasini dil saglayicisi ve gondericiyle birlikte acan giris dosyasi.
*/

import { Contact } from './routes/Contact/Contact.tsx'
import { apiSender } from './routes/Contact/apiSender.ts'
import { mount } from './mount.tsx'
import '@paktlabs/brand/styles/global.css'

// global.css main.tsx'teki gibi bilesenlerden sonra import edilir, derlenen
// CSS'te global kurallar bilesen kurallarindan sonra gelsin diye.
mount(<Contact sender={apiSender} />)
