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
import type { OptionId, Question } from './questions'
import { StepNav } from './StepNav'

interface ChoiceStepProps {
  question: Question
  titleId: string
  value?: OptionId
  onChange: (value: OptionId) => void
  onNext: () => void
  onBack?: () => void
}

type OptionText = { label: string; hint: string }
type OptionTexts = { [Q in Question as Q['id']]: { options: Record<Q['options'][number], OptionText> } }

// Ekran okuyucu icin secenegin adi yalnizca etiketidir, kisa aciklama
// ayrica aciklama olarak okunur.
export function ChoiceStep({ question, titleId, value, onChange, onNext, onBack }: ChoiceStepProps) {
  const { contactPage: dict } = useDict()
  const id = useId()
  // Sozluk her sorunun her secenegi icin metin tasimiyorsa ilk atama derleme
  // hatasi verir. Ikinci atama yalnizca tipi genisletir, bu soruya ait
  // secenekleri hepsinin ortak anahtariyla indekslemeye yarar.
  const all: OptionTexts = dict.questions
  const texts: Record<string, OptionText> = all[question.id].options
  // Tip her secenegin metnini garanti eder, eksikse sozluk bozuktur ve ilk
  // render'da acik bir hata gorulur.
  const options = question.options.map((option) => {
    const text = texts[option]
    if (!text) throw new Error(`${question.id}.${option} icin metin yok`)
    return { option, ...text }
  })

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        if (value) onNext()
      }}
    >
      <fieldset className={styles.fieldset} aria-labelledby={titleId}>
        <ul className={styles.options} data-count={question.options.length}>
          {options.map(({ option, label, hint }, i) => (
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
                    {label}
                  </span>
                  <span id={`${id}-${option}-hint`} className={styles.hint}>
                    {hint}
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
