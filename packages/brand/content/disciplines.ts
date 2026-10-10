/*
file: disciplines.ts
importable: disciplineUrls, Discipline, disciplineOrder

description: Disiplin baglantilarinin dilden bagimsiz subdomain adreslerini ve sitelerde goruldukleri sirayi tutar.
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

// Disiplinlerin sitelerde goruldugu sira. Ust bar, alt bilgi ve landing'in
// kartlari bu listeyi dolasir. Sira daha once bu uc yerde ayri ayri elle
// yaziliyordu ve menu kartlardan ayrismisti, artik tek yerde. Landing'deki
// Kabul ettigimiz isler bantlari bu listeye bagli degil, her bandin kendi
// cizimi ve zig-zag ayari oldugu icin orada elle diziliyor, sira degisirse
// onlar da elle degistirilir.
export const disciplineOrder: readonly Discipline[] = ['data', 'automation', 'web']
