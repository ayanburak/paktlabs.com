/*
file: apiSender.ts
importable: apiSender

Mesaji iletisim servisine, ayni sitedeki /api/contact adresine gonderen
somut gonderici. Servis services/contact-api altinda durur, sunucuda nginx bu
adresi servise aktarir, lokalde Vite gelistirme sunucusu ayni isi yapar.

description: Iletisim mesajini /api/contact adresine gonderen gonderici.
*/

import type { MessageSender } from './sender'

// Servis basarida 204 doner. Denetimden gecmeyen mesajda 422, gonderim
// sinirina takilan istekte nginx 429 dondurur. Basarisiz her durumda hata
// firlatilir, form o zaman ziyaretciye dogrudan yazabilecegi adresi gosterir.
// Formun kendi denetimleri servisinkilerle ayni oldugu icin 422 normal bir
// ziyaretcide beklenmez.
export const apiSender: MessageSender = {
  async send(message) {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message),
    })
    if (!response.ok) throw new Error(`contact api ${response.status}`)
  },
}
