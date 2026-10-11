/*
file: Contact.tsx
importable: Contact

Iletisim sayfasi. Ustte baslik, altinda bulunulan adimin cizimi ve adim
adim sorulan form yan yana durur. Uc parca ekranin ortasinda tek bir blok
olusturur, cizimle formun alt kenarlari ayni cizgidedir. Once secmeli sorular tek tek, en son iletisim
bilgileri istenir. Mesaj disaridan verilen gonderici ile iletilir, sayfa
mesajin nereye gittigini bilmez.

    <Contact sender={apiSender} />

description: Adim adim sorulardan olusan iletisim formunu ve cevap fisini gosteren sayfa.
*/

import { useEffect, useId, useRef, useState } from 'react'

import { Page } from '@paktlabs/brand/components/Page'
import { useLanguage } from '@paktlabs/brand/i18n/language'
import { cx } from '@paktlabs/brand/lib/cx'

import { useDict } from '@/i18n'

import { ChoiceStep } from './ChoiceStep'
import styles from './Contact.module.css'
import { DetailsStep } from './DetailsStep'
import { isComplete, questions, type Answers, type Question } from './questions'
import type { Details, MessageSender } from './sender'
import { useStepArt } from './useStepArt'

interface ContactProps {
  sender: MessageSender
}

type Status = 'editing' | 'sending' | 'sent' | 'failed'

const emptyDetails: Details = { name: '', email: '', company: '', message: '', website: '' }

// Adimlar secmeli sorular ve son ekrandan olusur. Ekran degisince odak yeni
// sorunun basligina gider, klavye ve ekran okuyucu kullanan ziyaretci yeni
// soruyu bastan duyar. Sayfa ilk acildiginda odak yerinde kalir.
export function Contact({ sender }: ContactProps) {
  const { contactPage: dict } = useDict()
  const { language } = useLanguage()
  const titleId = useId()
  const titleRef = useRef<HTMLHeadingElement>(null)
  const moved = useRef(false)
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Partial<Answers>>({})
  const [details, setDetails] = useState(emptyDetails)
  const [status, setStatus] = useState<Status>('editing')

  const total = questions.length + 1
  const question: Question | undefined = questions[step]
  const sent = status === 'sent'

  useEffect(() => {
    if (moved.current) titleRef.current?.focus()
  }, [step, sent])

  function go(next: number) {
    moved.current = true
    setStep(next)
  }

  // Son ekrana yalnizca butun sorular cevaplanarak gelinir, bu yuzden
  // koruyucu hep gecer.
  async function submit() {
    if (!isComplete(answers)) return
    setStatus('sending')
    try {
      await sender.send({ answers, ...details, language })
      moved.current = true
      setStatus('sent')
    } catch {
      setStatus('failed')
    }
  }

  const title = sent ? dict.sent.title : question ? dict.questions[question.id].title : dict.details.title
  const art = useStepArt(question ? question.id : 'details')

  return (
    <Page title={dict.meta.title} description={dict.meta.description}>
      <section className={styles.contact}>
        <div className={styles.intro}>
          <span className="eyebrow rise">{dict.eyebrow}</span>
          <h1 className={cx('rise', styles.title)}>{dict.title}</h1>
          <p className={cx('rise', styles.lead)}>{dict.lead}</p>
        </div>

        {/* cizim suslemedir, ekran okuyucu atlar. Alanin olcusu sabit, icindeki
            cizim degisir. key yeni cizimin belirme animasyonunu bastan oynatir */}
        <div className={styles.art}>
          {art && <img src={art} alt="" aria-hidden="true" key={art} />}
        </div>

        <div className={styles.card}>
          <div className={cx(styles.box, styles.head)}>
            <div className={styles.meta}>
              <span className="eyebrow">
                {sent ? dict.sent.stamp : `${dict.step} ${String(step + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`}
              </span>
              <ol className={styles.progress} aria-hidden="true">
                {Array.from({ length: total }, (_, i) => (
                  <li key={i} className={cx((sent || i < step) && styles.done, !sent && i === step && styles.current)} />
                ))}
              </ol>
            </div>
            <h2 id={titleId} ref={titleRef} tabIndex={-1} className={styles.question}>
              {title}
            </h2>
          </div>

          <div className={cx(styles.box, styles.body)} key={sent ? 'sent' : step}>
            {sent ? (
              <p className={styles.sentText}>{dict.sent.text}</p>
            ) : question ? (
              <ChoiceStep
                question={question}
                titleId={titleId}
                value={answers[question.id]}
                onChange={(value) => setAnswers({ ...answers, [question.id]: value })}
                onNext={() => go(step + 1)}
                onBack={step > 0 ? () => go(step - 1) : undefined}
              />
            ) : (
              <DetailsStep
                details={details}
                sending={status === 'sending'}
                failed={status === 'failed'}
                onChange={setDetails}
                onSubmit={submit}
                onBack={() => go(step - 1)}
              />
            )}
          </div>
        </div>
      </section>
    </Page>
  )
}
