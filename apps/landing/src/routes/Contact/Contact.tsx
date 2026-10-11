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

import alanSvg from '@/assets/illustrations/iletisim-alan.svg'
import durumSvg from '@/assets/illustrations/iletisim-durum.svg'
import sizSvg from '@/assets/illustrations/iletisim-siz.svg'
import zamanSvg from '@/assets/illustrations/iletisim-zaman.svg'
import { useDict } from '@/i18n'

import { ChoiceStep } from './ChoiceStep'
import styles from './Contact.module.css'
import { DetailsStep } from './DetailsStep'
import { isComplete, questions, type Answers, type Question } from './questions'
import type { Details, MessageSender } from './sender'

interface ContactProps {
  sender: MessageSender
}

type Status = 'editing' | 'sending' | 'sent' | 'failed'

// Her adimin kendi cizimi. Dort cizimde Ada ayni boyda ve ayni golgenin
// ustunde duruyor, sayfa hepsini ayni yukseklikte ve ayni genislikteki bir
// alanda gosterir. Gonderildi ekraninda son adimin cizimi kalir.
const stepArt = {
  area: alanSvg,
  stage: durumSvg,
  timing: zamanSvg,
  details: sizSvg,
}

// Sayfa acilip ilk cizim geldikten sonra oteki cizimler arka planda indirilir.
// Ziyaretci ilk soruyu cevaplayana kadar hepsi onbellekte olur ve adim
// degisince beklenmez. load olayi beklenir ki bu indirme sayfanin kendi
// dosyalarinin onune gecmesin.
function usePreloadedArt() {
  useEffect(() => {
    const load = () => Object.values(stepArt).forEach((src) => (new Image().src = src))
    if (document.readyState === 'complete') load()
    else window.addEventListener('load', load, { once: true })
    return () => window.removeEventListener('load', load)
  }, [])
}

// Ekranda gosterilen cizim, istenen cizim indirilip cizilmeye hazir olunca
// degisir. O ana kadar onceki cizim yerinde kalir, boylece belirme animasyonu
// bos bir alanin ustunde oynamaz ve cizim animasyonsuz pat diye cikmaz. Ilk
// acilista hazir olana kadar hicbir cizim gosterilmez. Indirme hata verirse
// yine de gecilir, kirik bir dosya bir adimi kilitlemesin.
function useReadyArt(wanted: string): string | undefined {
  const [shown, setShown] = useState<string>()
  useEffect(() => {
    let live = true
    const img = new Image()
    img.src = wanted
    img
      .decode()
      .catch(() => undefined)
      .then(() => live && setShown(wanted))
    return () => {
      live = false
    }
  }, [wanted])
  return shown
}

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
  const art = useReadyArt(stepArt[question ? question.id : 'details'])
  usePreloadedArt()

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
