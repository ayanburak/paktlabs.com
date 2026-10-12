/*
file: profilePhotos.ts
importable: profilePhotos

Ekipteki kisilerin kare fotograflari. Profil sayfasindaki kart ve data'daki
yazar kutusu ayni dosyayi gosterir. Fotograf 600 piksel kare bir WebP olarak
assets/profiles/<kimlik>.webp altina konur ve buraya eklenir.

description: Kisilerin fotograflarini kimlikleriyle eslestiren modul.
*/

import ayanburak from '../assets/profiles/ayanburak.webp'

import type { ProfileId } from './profiles'

// NOTE: fotograflar profiles.ts'te degil burada, cunku resim importu yalnizca
// Vite'in derledigi kodda calisir. data'nin testleri calisma listesini Node'da
// okuyor, liste works.ts uzerinden profiles.ts'e ulasiyor. Resim orada olsaydi
// testlerin tip denetimi ve kendisi bozulurdu. Bu dosyayi yalnizca bilesenler
// import eder.
//
// Record oldugu icin yeni bir kisinin fotografi eklenmezse derleme hata verir.
export const profilePhotos: Record<ProfileId, string> = { ayanburak }
