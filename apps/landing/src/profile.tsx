/*
file: profile.tsx

profiles/<kimlik>/index.html girislerinin ortak dosyasi. Hangi kisinin sayfasi
oldugunu root elemanindaki data-profile okur, boylece yeni bir kisi icin
yalnizca yeni bir HTML girisi yazilir, bu dosya degismez.

description: Landing'in profil sayfalarini root'taki kimlige gore acan giris dosyasi.
*/

import { profiles, type ProfileId } from '@paktlabs/brand/content/profiles'
import { mount } from '@paktlabs/brand/lib/mount'

import { Profile } from './routes/Profile/Profile.tsx'
import '@paktlabs/brand/styles/global.css'

// Kimlik HTML'e elle yazildigi icin yanlis yazilabilir. Bos bir sayfa yerine
// hangi kimligin bulunamadigini soyleyen bir hata verir, derlemeden sonra
// profil testi de bunu yakalar.
function isProfileId(value: string | undefined): value is ProfileId {
  return value !== undefined && Object.hasOwn(profiles, value)
}

const id = document.getElementById('root')?.dataset.profile
if (!isProfileId(id)) throw new Error(`profile.tsx: bilinmeyen profil kimligi ${id}`)

// global.css main.tsx'teki gibi bilesenlerden sonra import edilir, derlenen
// CSS'te global kurallar bilesen kurallarindan sonra gelsin diye.
mount(<Profile id={id} />)
