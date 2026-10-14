/*
file: shade.ts
importable: shade, SHADE_STEPS

Isi ve korelasyon tablolarinda hucre zemininin murekkep koyulugu. Koyuluk
degerle surekli artmaz, bes kademede artar. Surekli artsaydi orta koyulukta
ne murekkep ne kagit rengi yazi yeterince okunurdu. Kademeler bu ara bolgeyi
atlar: ilk uc kademede yazi murekkep, son ikisinde kagit rengi ve her
ikisinde de kontrast en az 4.5.

    const { depth, light } = shade(0.61)

description: Bir orani hucre zemininin koyulugune ve yazi rengine ceviren yardimci.
*/

// Murekkebin kagida karisma yuzdeleri. 32 ile 72 arasi bilerek bos.
export const SHADE_STEPS = [6, 18, 32, 72, 86] as const

// fraction 0 ile 1 arasi bir oran. 1 en koyu kademeye duser.
export function shade(fraction: number): { depth: number; light: boolean } {
  const step = Math.min(SHADE_STEPS.length - 1, Math.max(0, Math.floor(fraction * SHADE_STEPS.length)))
  return { depth: SHADE_STEPS[step] ?? 0, light: step >= 3 }
}
