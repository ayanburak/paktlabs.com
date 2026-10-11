/*
file: StepNav.tsx
importable: StepNav

Formun her ekraninin altindaki Geri ve ilerleme dugmeleri. Ilerleme dugmesi
submit'tir, boylece Enter ile de ilerlenir. Ilk ekranda Geri yoktur.

description: Form ekranlarinin altindaki geri ve ilerle dugmelerini dizen satir.
*/

import { useDict } from '@/i18n'

import styles from './StepNav.module.css'

interface StepNavProps {
  submitLabel: string
  disabled?: boolean
  onBack?: () => void
}

export function StepNav({ submitLabel, disabled, onBack }: StepNavProps) {
  const { contactPage: dict } = useDict()

  return (
    <div className={styles.nav}>
      {onBack && (
        <button type="button" className="cta" onClick={onBack}>
          ← {dict.actions.back}
        </button>
      )}
      <button type="submit" className={`cta primary ${styles.next}`} disabled={disabled}>
        {submitLabel} →
      </button>
    </div>
  )
}
