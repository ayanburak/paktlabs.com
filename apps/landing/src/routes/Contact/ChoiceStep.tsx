/*
file: ChoiceStep.tsx
importable: ChoiceStep

Formun secmeli soru ekrani. Secenekler buyuk kutular olarak dizilir, her biri
gercek bir radio dugmesidir, boylece klavyede ok tuslariyla da secilir. Secim
yapilmadan Devam'a basilamaz. Hangi sorunun gosterildigini ve secimi Contact
tutar.

description: Iletisim formunda tek bir secmeli soruyu kutular halinde gosteren ekran.
*/

import { useId, type CSSProperties } from 'react'

import { useDict } from '@/i18n'

import styles from './ChoiceStep.module.css'
import { questions } from './questions'
import { StepNav } from './StepNav'

interface ChoiceStepProps {
  question: (typeof questions)[number]
  titleId: string
  value?: string
  onChange: (value: string) => void
  onNext: () => void
  onBack?: () => void
}

// Ekran okuyucu icin secenegin adi yalnizca etiketidir, kisa aciklama
// ayrica aciklama olarak okunur.
export function ChoiceStep({ question, titleId, value, onChange, onNext, onBack }: ChoiceStepProps) {
  const { contactPage: dict } = useDict()
  const id = useId()
  const texts = dict.questions[question.id].options as Record<string, { label: string; hint: string }>

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        if (value) onNext()
      }}
    >
      <fieldset className={styles.fieldset} aria-labelledby={titleId}>
        <ul className={styles.options} data-count={question.options.length}>
          {question.options.map((option, i) => (
            <li key={option} style={{ '--i': i } as CSSProperties}>
              <label className={styles.option}>
                <input
                  className={styles.input}
                  type="radio"
                  name={question.id}
                  value={option}
                  checked={value === option}
                  onChange={() => onChange(option)}
                  aria-labelledby={`${id}-${option}`}
                  aria-describedby={`${id}-${option}-hint`}
                />
                <span className={styles.face}>
                  <span id={`${id}-${option}`} className={styles.label}>
                    {texts[option].label}
                  </span>
                  <span id={`${id}-${option}-hint`} className={styles.hint}>
                    {texts[option].hint}
                  </span>
                </span>
              </label>
            </li>
          ))}
        </ul>
      </fieldset>
      <StepNav submitLabel={dict.actions.next} disabled={!value} onBack={onBack} />
    </form>
  )
}
