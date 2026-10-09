/*
file: contact.ts
importable: contactEmail, contactPageUrl

description: PaktLabs sitelerinin ortak iletisim adresini ve iletisim sayfasinin adresini tutan modul.
*/

import { mainSiteUrl } from './site'

// Adres dilden bagimsiz oldugu icin sozlukte degil burada durur. Landing'in ve
// disiplin sitelerinin iletisim bolumleri ayni adresi gosterir, degisirse
// yalnizca burasi degisir.
export const contactEmail = 'info@paktlabs.com'

// Iletisim sayfasi yalnizca ana sitede var, bu yuzden adres her sitede tam
// adres olarak yaziliyor, disiplin sitesinden de ana siteye gider. Sayfa
// henuz yazilmadi, o gelene kadar bu adres bulunamadi sayfasini acar.
export const contactPageUrl = `${mainSiteUrl}/contact`
