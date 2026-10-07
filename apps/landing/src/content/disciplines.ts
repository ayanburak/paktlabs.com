/*
file: disciplines.ts
importable: disciplineUrls

description: Disiplin baglantilarinin dilden bagimsiz subdomain adreslerini tutar.
*/

// Menu, kart ve bantlar ayni hedefleri kullanir. Adresler ceviri sozluklerinden
// ayri tutulur, dil degisince farkli bir hedefe gitmemelidir.
export const disciplineUrls = {
  data: 'https://data.paktlabs.com',
  automation: 'https://automation.paktlabs.com',
  web: 'https://web.paktlabs.com',
} as const
