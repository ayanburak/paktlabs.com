/*
file: authors.ts
importable: authors, AuthorId

Calismalari hazirlayan kisiler. Bir calismanin tanim dosyasi yazarini
kimligiyle anar, detay sayfasindaki yazar kutusu adini, e-postasini ve
profil adresini buradan alir. Ayni kisi birden fazla calisma yazdiginda
bilgisi tek yerde durur.

description: Calisma yazarlarinin adini ve e-postasini kimlikleriyle tutan modul.
*/

// Kimlik profil sayfasinin adresinde de kullanilir: paktlabs.com/profiles/ayanburak.
export const authors = {
  ayanburak: { name: 'Burak Ayan', email: 'contact@ayanburak.com' },
} as const

export type AuthorId = keyof typeof authors
