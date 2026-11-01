/*
file: Intro.tsx
importable: Intro

Profilin acilis bolumu. Solda ad, unvan, kisa tanitim ve LinkedIn, GitHub ve
kisisel siteye giden uc dugme, sagda ustten bir askiyla sarkan ekip karti
durur. Kartta fotograf, calistigi disiplinler ve dilleri yazar.

description: Profil sayfasinin adi, tanitimi ve ekip kartini gosteren acilis bolumu.
*/

import { disciplineOrder, disciplineUrls } from '@paktlabs/brand/content/disciplines'
import { profilePhotos } from '@paktlabs/brand/content/profilePhotos'
import { profilePagePath, profiles, type ProfileId } from '@paktlabs/brand/content/profiles'
import { useBrandDict } from '@paktlabs/brand/i18n/useBrandDict'

import { useDict } from '@/i18n'

import styles from './Intro.module.css'
import { LinkIcon, type LinkKind } from './LinkIcon'

interface IntroProps {
  id: ProfileId
}

// Kartin altindaki adres sayfanin kendi adresidir, kartin bir kimlik karti
// gibi okunmasi icin yazilir, baglanti degildir. Disiplinler kisinin
// listesinden ama sitelerdeki ortak sirayla gelir, kisinin dosyasinda sira
// farkli yazilsa bile ust barla ayni dizilir.
// Dugmelerin sirasi tasarimda belirlenen siradir. Adresler kisinin dosyasindaki
// kullanici adlarindan kurulur.
function linkUrls(id: ProfileId): Record<LinkKind, string> {
  const { linkedin, github, website } = profiles[id]
  return {
    linkedin: `https://www.linkedin.com/in/${linkedin}/`,
    github: `https://github.com/${github}`,
    website,
  }
}
const linkKinds: readonly LinkKind[] = ['linkedin', 'github', 'website']

// Unvan ve tanitim sozlukten, ad, baglantilar ve disiplinler brand'deki
// profiles'tan gelir. Disiplin rozetleri kisinin dosyasindaki sirayla degil
// sitelerin ortak sirasiyla dizilir.
export function Intro({ id }: IntroProps) {
  const { profilePage: dict } = useDict()
  const { nav } = useBrandDict()
  const person = dict.people[id]
  const profile = profiles[id]
  const urls = linkUrls(id)
  const disciplines = disciplineOrder.filter((discipline) => profile.disciplines.includes(discipline))

  return (
    <section className={styles.intro}>
      <div className={styles.inner}>
        <div className={styles.text}>
          <span className="eyebrow rise">{person.eyebrow}</span>
          <h1 className={`${styles.name} rise`}>{profile.name}</h1>
          <p className={`${styles.role} rise`}>{person.role}</p>
          <div className={`${styles.lead} rise`}>
            {person.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <ul className={`${styles.links} rise`} aria-label={dict.links.label}>
            {linkKinds.map((kind) => (
              <li key={kind}>
                <a href={urls[kind]} aria-label={dict.links[kind]} title={dict.links[kind]}>
                  <LinkIcon kind={kind} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.hanger}>
          <article className={styles.badge} aria-label={profile.name}>
            <header className={styles.strip}>
              <span className={styles.slot} aria-hidden="true" />
              <span>{person.badge}</span>
            </header>
            <img className={styles.photo} src={profilePhotos[id]} alt={profile.name} width="600" height="600" />
            <div className={styles.body}>
              <p className={styles.badgeName}>{profile.name}</p>
              <p className={styles.badgeRole}>{person.role}</p>
              <dl className={styles.rows}>
                <div>
                  <dt>{dict.badge.disciplines}</dt>
                  <dd>
                    {disciplines.map((discipline) => (
                      <a key={discipline} href={disciplineUrls[discipline]}>
                        {nav[discipline]}
                      </a>
                    ))}
                  </dd>
                </div>
                <div>
                  <dt>{dict.badge.languages}</dt>
                  <dd>{dict.badge.languagesValue}</dd>
                </div>
              </dl>
            </div>
            <footer className={styles.foot}>paktlabs.com{profilePagePath(id)}</footer>
          </article>
        </div>
      </div>
    </section>
  )
}
