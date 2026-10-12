/*
file: Profile.tsx
importable: Profile

Bir kisinin profil sayfasi. Ustte adi, unvani ve askida sallanan ekip karti,
ortada yazdigi calismalarin listesi, en altta kisiye dogrudan ulasma yolu
durur. Kisinin dilden bagimsiz bilgisi brand'deki profiles.ts'ten, metinleri
landing sozlugundeki profilePage.people altindan gelir.

    <Profile id="ayanburak" />

description: Bir ekip uyesinin tanitimini, calismalarini ve iletisim adresini gosteren sayfa.
*/

import { Page } from '@paktlabs/brand/components/Page'
import type { ProfileId } from '@paktlabs/brand/content/profiles'

import { useDict } from '@/i18n'

import { Intro } from './sections/Intro'
import { Reach } from './sections/Reach'
import { Works } from './sections/Works'

interface ProfileProps {
  id: ProfileId
}

// Sayfa ana sayfa gibi ortak iletisim bolumuyle kapanmaz, kendi Reach bandi
// var. Ziyaretci buraya kisiyi tanimak icin geliyor, kapanista once kisinin
// adresi, ondan ayri olarak studyonun adresi durur.
export function Profile({ id }: ProfileProps) {
  const { meta } = useDict().profilePage.people[id]

  return (
    <Page title={meta.title} description={meta.description}>
      <Intro id={id} />
      <Works id={id} />
      <Reach id={id} />
    </Page>
  )
}
