/*
file: DetailsStep.tsx
importable: DetailsStep, Details

Formun son ekrani: ad, e-posta, istege bagli sirket ve kisa aciklama. Alanlar
Gonder'e basilinca denetlenir, eksik ya da hatali alanin altinda iki dilli
bir uyari cikar ve odak ilk hatali alana gider. Tarayicinin kendi uyari
balonlari kullanilmaz, cunku onlar sitenin dilini degil tarayicinin dilini
konusur.

description: Iletisim formunda ziyaretcinin iletisim bilgilerini ve kisa aciklamasini alan son ekran.
*/

import { useId, useState } from 'react'

import { contactEmail } from '@paktlabs/brand/content/contact'

import { useDict } from '@/i18n'

import styles from './DetailsStep.module.css'
import { StepNav } from './StepNav'

// website formda gorunmeyen tuzak alandir, ayrintisi asagida.
export interface Details {
  name: string
  email: string
  company: string
  message: string
  website: string
}

type Field = keyof Details
type Problem = 'required' | 'email'

interface DetailsStepProps {
  details: Details
  sending: boolean
  failed: boolean
  onChange: (details: Details) => void
  onSubmit: () => void
  onBack: () => void
}

// Basit bir bicim denetimi: bosluksuz bir ad, bir @ ve noktali bir alan adi.
// Adresin gercekten var olup olmadigini yalnizca gonderilen e-posta soyler.
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function check(details: Details): Partial<Record<Field, Problem>> {
  const problems: Partial<Record<Field, Problem>> = {}
  if (!details.name.trim()) problems.name = 'required'
  if (!details.email.trim()) problems.email = 'required'
  else if (!emailPattern.test(details.email.trim())) problems.email = 'email'
  if (!details.message.trim()) problems.message = 'required'
  return problems
}

// Uyarilar ilk Gonder denemesinden sonra gorunur, ziyaretci yazarken
// bos alan uyarisiyla karsilasmasin diye. Sonrasinda her harfte guncellenir.
export function DetailsStep({ details, sending, failed, onChange, onSubmit, onBack }: DetailsStepProps) {
  const { contactPage: dict } = useDict()
  const id = useId()
  const [tried, setTried] = useState(false)
  const problems = tried ? check(details) : {}

  function field(name: Field) {
    return {
      id: `${id}-${name}`,
      value: details[name],
      onChange: (event: { target: { value: string } }) => onChange({ ...details, [name]: event.target.value }),
      'aria-invalid': problems[name] ? true : undefined,
      'aria-describedby': problems[name] ? `${id}-${name}-problem` : undefined,
    }
  }

  function problem(name: Field) {
    const kind = problems[name]
    return (
      kind && (
        <span id={`${id}-${name}-problem`} className={styles.problem}>
          {dict.invalid[kind]}
        </span>
      )
    )
  }

  return (
    <form
      noValidate
      onSubmit={(event) => {
        event.preventDefault()
        setTried(true)
        const found = Object.keys(check(details)) as Field[]
        if (found.length > 0) {
          document.getElementById(`${id}-${found[0]}`)?.focus()
          return
        }
        onSubmit()
      }}
    >
      <div className={styles.grid}>
        <div className={styles.field}>
          <label htmlFor={`${id}-name`}>{dict.details.name}</label>
          <input type="text" autoComplete="name" {...field('name')} />
          {problem('name')}
        </div>
        <div className={styles.field}>
          <label htmlFor={`${id}-email`}>{dict.details.email}</label>
          <input type="email" autoComplete="email" {...field('email')} />
          {problem('email')}
        </div>
        <div className={styles.field}>
          <label htmlFor={`${id}-company`}>
            {dict.details.company} <span className={styles.optional}>· {dict.details.optional}</span>
          </label>
          <input type="text" autoComplete="organization" {...field('company')} />
        </div>
        <div className={`${styles.field} ${styles.wide}`}>
          <label htmlFor={`${id}-message`}>{dict.details.message}</label>
          <textarea rows={5} placeholder={dict.details.messageHint} {...field('message')} />
          {problem('message')}
        </div>
      </div>

      {/* Tuzak alan. Ekranin disinda durur, Tab sirasinda ve ekran
          okuyucuda yoktur, insan ziyaretci onu hic gormez. Formlari otomatik
          dolduran botlar adina bakip doldurur, servis o zaman mesaji
          sessizce birakir. display none kullanilmaz, bazi botlar gizli
          alanlari atliyor. */}
      <div className={styles.trap} aria-hidden="true">
        <label htmlFor={`${id}-website`}>{dict.details.trap}</label>
        <input
          id={`${id}-website`}
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={details.website}
          onChange={(event) => onChange({ ...details, website: event.target.value })}
        />
      </div>

      <p className={styles.privacy}>{dict.details.privacy}</p>

      {/* Gonderim basarisiz olursa ziyaretci yazdiklarini kaybetmez, alanlar
          dolu kalir ve dogrudan yazabilecegi adres verilir. */}
      <div role="alert" className={styles.alert}>
        {failed && (
          <p>
            {dict.error} <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
          </p>
        )}
      </div>

      <StepNav
        submitLabel={sending ? dict.actions.sending : dict.actions.send}
        disabled={sending}
        onBack={onBack}
      />
    </form>
  )
}
