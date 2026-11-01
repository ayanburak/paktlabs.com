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
// sinirina takilan istekte nginx, gunluk sinir dolunca servis 429 dondurur. Basarisiz her durumda hata
// firlatilir, form o zaman ziyaretciye dogrudan yazabilecegi adresi gosterir.
// Formun denetimleri servisinkilerle ayni oldugu icin 422 normal bir
// ziyaretcide beklenmez, metin uzunluklari limits.ts dosyasinda tek yerde durur.
//
// Istek en fazla timeoutMs bekler. Nginx ve servis normalde bir saniyenin
// altinda cevap verir, takili kalan bir baglanti ziyaretciyi gonderiliyor
// durumunda kilitlemesin, sure dolunca istek hata sayilir ve form adresi
// gosterir.
const timeoutMs = 15000

export const apiSender: MessageSender = {
  async send(message) {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message),
      signal: AbortSignal.timeout(timeoutMs),
    })
    if (!response.ok) throw new Error(`contact api ${response.status}`)
  },
}
