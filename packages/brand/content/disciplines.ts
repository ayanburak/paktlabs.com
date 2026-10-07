/*
file: disciplines.ts
importable: disciplineUrls, Discipline

description: Disiplin baglantilarinin dilden bagimsiz subdomain adreslerini tutar.
*/

// Landing'in menu, kart ve bantlari ile disiplin sitelerinin ust bari ayni
// hedefleri kullanir. Adres degisirse yalnizca burasi degisir. Adresler ceviri
// sozluklerinden ayri tutulur, dil degisince farkli bir hedefe gitmemelidir.
export const disciplineUrls = {
  data: 'https://data.paktlabs.com',
  automation: 'https://automation.paktlabs.com',
  web: 'https://web.paktlabs.com',
} as const

// Yeni bir disiplin adresi eklendiginde tip de kendiliginden genisler.
export type Discipline = keyof typeof disciplineUrls
