'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { useLanguage } from '@/providers/LanguageProvider'
import styles from './page.module.css'

const COPY = {
  de: {
    back: '← Startseite', eyebrow: 'Interaktive Fallbibliothek', title: 'Fallbeispiele',
    lead: 'Wähle ein Thema aus dem Verzeichnis und bearbeite die Fälle Schritt für Schritt.',
    directory: 'Verzeichnis', available: 'verfügbar', planned: 'geplant',
    caseOf: (c, t) => `Fall ${c} von ${t}`, questionOf: (c, t) => `Frage ${c} von ${t}`,
    check: 'Antwort prüfen', next: 'Nächste Frage', nextCase: 'Nächster Fall',
    result: 'Ergebnis anzeigen', restart: 'Erneut bearbeiten', correct: 'Richtig',
    incorrect: 'Nicht ganz', explanation: 'Erklärung', source: 'Originalfall ansehen',
    completed: 'Fallserie abgeschlossen', score: (s, t) => `${s} von ${t} Fragen richtig`,
    choose: 'Wähle links ein verfügbares Thema.',
  },
  en: {
    back: '← Home', eyebrow: 'Interactive case library', title: 'Cases',
    lead: 'Choose a topic from the directory and work through the cases step by step.',
    directory: 'Directory', available: 'available', planned: 'planned',
    caseOf: (c, t) => `Case ${c} of ${t}`, questionOf: (c, t) => `Question ${c} of ${t}`,
    check: 'Check answer', next: 'Next question', nextCase: 'Next case',
    result: 'Show result', restart: 'Try again', correct: 'Correct',
    incorrect: 'Not quite', explanation: 'Explanation', source: 'View original case',
    completed: 'Case series completed', score: (s, t) => `${s} of ${t} questions correct`,
    choose: 'Choose an available topic on the left.',
  },
  fa: {
    back: 'خانه →', eyebrow: 'کتابخانه تعاملی کیس‌ها', title: 'نمونه کیس‌ها',
    lead: 'یک موضوع را از فهرست انتخاب کن و کیس‌ها را مرحله‌به‌مرحله پاسخ بده.',
    directory: 'فهرست', available: 'موجود', planned: 'برنامه‌ریزی‌شده',
    caseOf: (c, t) => `کیس ${c} از ${t}`, questionOf: (c, t) => `سؤال ${c} از ${t}`,
    check: 'بررسی پاسخ', next: 'سؤال بعدی', nextCase: 'کیس بعدی',
    result: 'نمایش نتیجه', restart: 'شروع دوباره', correct: 'درست',
    incorrect: 'کاملاً درست نیست', explanation: 'توضیح', source: 'مشاهده کیس اصلی',
    completed: 'مجموعه کیس‌ها تمام شد', score: (s, t) => `${s} از ${t} سؤال درست`,
    choose: 'یک موضوع موجود را از فهرست انتخاب کن.',
  },
}

const TOPICS = [
  {
    id: 'meniskus', ready: true, count: 2,
    region: { de: 'Muskuloskelettal', en: 'Musculoskeletal', fa: 'اسکلتی-عضلانی' },
    chapter: { de: 'Knie', en: 'Knee', fa: 'زانو' },
    title: { de: 'Meniskus', en: 'Meniscus', fa: 'منیسک' },
  },
  {
    id: 'kontrastmittel', ready: false, count: 0,
    region: { de: 'Technik & Physik', en: 'Physics & Technology', fa: 'تکنیک و فیزیک' },
    chapter: { de: 'Kontrastmittel', en: 'Contrast agents', fa: 'ماده حاجب' },
    title: { de: 'Nebenwirkungen', en: 'Adverse reactions', fa: 'عوارض' },
  },
]

const MENISCUS_CASES_DE = [
  {
    id: 'meniskus-2c', label: 'Fall 1 · sagittal',
    title: 'Keilförmig-globuläres intrameniskales Signal',
    clinical: 'Knie-MRT bei belastungsabhängigen Beschwerden. Im discoiden Außenmeniskus zeigt sich eine ausgedehnte Signalsteigerung ohne sicheren Kontakt zur Gelenkfläche.',
    image: '/meniskus/mri-sagittal.png',
    source: 'https://radiopaedia.org/cases/75168/studies/86248#t=im&v1i=52196174&v1z=1&v2i=52196277&v2z=1&v3i=52196234&v3z=1&v4i=52196213&v4z=1',
    credit: 'Case courtesy of Roberto Schubert, Radiopaedia.org',
    questions: [
      {
        text: 'Welche Einordnung passt am besten zu diesem Befund?',
        options: ['Sicherer Grad-3-Meniskusriss', 'Grad 2c mit mukoider Degeneration', 'Normaler Meniskus ohne Signalalteration', 'Dislozierter Korbhenkelriss'],
        correct: 1,
        explanation: 'Das keilförmig-globuläre Signal ohne sicheren Oberflächenkontakt entspricht Grad 2c. Es kann mit mukoider Degeneration und einem erhöhten Risiko für einen okkulten Riss verbunden sein, erfüllt aber allein nicht die Kriterien eines sicheren Grad-3-Risses.',
      },
      {
        text: 'Welcher zusätzliche Befund würde einen sicheren Meniskusriss am stärksten stützen?',
        options: ['Signal nur auf einer Schicht ohne Oberflächenkontakt', 'Homogen signalarmes Meniskusgewebe', 'Oberflächenkontakt auf mindestens zwei aufeinanderfolgenden Schichten', 'Leichter Gelenkerguss ohne Meniskusdeformität'],
        correct: 2,
        explanation: 'Die Two-slice-touch-Regel fordert Oberflächenkontakt auf mindestens zwei aufeinanderfolgenden Schichten und erhöht dadurch die Spezifität der Rissdiagnose.',
      },
    ],
  },
  {
    id: 'meniskus-2b', label: 'Fall 2 · koronal',
    title: 'Lineares Signal mit Kontakt auf nur einer Schicht',
    clinical: 'Koronare PD-Sequenz eines discoiden Außenmeniskus. Ein lineares Signal erreicht scheinbar die Oberfläche, ist jedoch nur auf einer einzelnen Schicht nachvollziehbar.',
    image: '/meniskus/mri-coronal.png',
    source: 'https://radiopaedia.org/cases/14060/studies/13900#t=im&v1i=1118538&v1z=1&v2i=1118592&v2z=1',
    credit: 'Case courtesy of Ammar Haouimi, Radiopaedia.org',
    questions: [
      {
        text: 'Wie sollte dieser Einzelbildbefund bewertet werden?',
        options: ['Als sicherer Grad-3-Riss', 'Als Grad 2b beziehungsweise inkonklusiver Befund', 'Als Korbhenkelriss mit Dislokation', 'Als normale Gefäßstruktur'],
        correct: 1,
        explanation: 'Ein lineares Signal mit scheinbarem Oberflächenkontakt auf nur einer Schicht ist inkonklusiv und entspricht hier Grad 2b. Ohne Bestätigung auf einer zweiten Schicht sollte kein sicherer Grad-3-Riss diagnostiziert werden.',
      },
      {
        text: 'Welche Befundformulierung ist am angemessensten?',
        options: ['Sicherer Meniskusriss, dringliche Arthroskopie', 'Kein pathologischer Befund', 'Intrameniskale Signalalteration ohne sichere Risskriterien', 'Komplette Meniskuswurzelruptur'],
        correct: 2,
        explanation: 'Die Formulierung beschreibt die sichtbare Signalalteration, ohne die diagnostischen Kriterien zu überschreiten. Das verhindert ein Overcalling eines Einzelbildartefakts als Riss.',
      },
    ],
  },
]

const MENISCUS_CASES = {
  de: MENISCUS_CASES_DE,
  en: [
    {
      ...MENISCUS_CASES_DE[0],
      label: 'Case 1 · sagittal',
      title: 'Wedge-shaped globular intrameniscal signal',
      clinical: 'Knee MRI for load-related pain. The discoid lateral meniscus shows extensive high signal without definite contact with the articular surface.',
      questions: [
        {
          text: 'Which classification best fits this finding?',
          options: ['Definite grade-3 meniscal tear', 'Grade 2c with mucoid degeneration', 'Normal meniscus without signal alteration', 'Displaced bucket-handle tear'],
          correct: 1,
          explanation: 'A wedge-shaped or globular signal without definite surface contact is grade 2c. It may indicate mucoid degeneration and a higher risk of an occult tear, but does not by itself meet grade-3 criteria.',
        },
        {
          text: 'Which additional finding would most strongly support a definite meniscal tear?',
          options: ['Signal on one slice without surface contact', 'Uniformly low-signal meniscal tissue', 'Surface contact on at least two consecutive slices', 'Small joint effusion without meniscal deformity'],
          correct: 2,
          explanation: 'The two-slice-touch rule requires surface contact on at least two consecutive slices and improves the specificity of tear diagnosis.',
        },
      ],
    },
    {
      ...MENISCUS_CASES_DE[1],
      label: 'Case 2 · coronal',
      title: 'Linear signal contacting the surface on one slice only',
      clinical: 'Coronal PD sequence of a discoid lateral meniscus. A linear signal appears to reach the surface but can only be followed on a single slice.',
      questions: [
        {
          text: 'How should this single-slice finding be classified?',
          options: ['Definite grade-3 tear', 'Grade 2b or indeterminate finding', 'Displaced bucket-handle tear', 'Normal vascular structure'],
          correct: 1,
          explanation: 'Apparent surface contact on one slice only is indeterminate and corresponds here to grade 2b. A definite grade-3 tear should not be diagnosed without confirmation on another slice.',
        },
        {
          text: 'Which report wording is most appropriate?',
          options: ['Definite meniscal tear; urgent arthroscopy', 'No abnormality', 'Intrameniscal signal alteration without definite tear criteria', 'Complete meniscal root tear'],
          correct: 2,
          explanation: 'This wording describes the visible abnormality without exceeding the diagnostic criteria and prevents overcalling a single-slice artifact.',
        },
      ],
    },
  ],
  fa: [
    {
      ...MENISCUS_CASES_DE[0],
      label: 'کیس ۱ · ساژیتال',
      title: 'سیگنال گوه‌ای و گلوبولار داخل منیسک',
      clinical: 'MRI زانو به‌علت درد وابسته به فعالیت. در منیسک خارجی دیسکوئید افزایش سیگنال وسیع بدون تماس قطعی با سطح مفصلی دیده می‌شود.',
      questions: [
        {
          text: 'بهترین طبقه‌بندی برای این یافته چیست؟',
          options: ['پارگی قطعی درجه ۳', 'درجه 2c همراه دژنراسیون موکوئید', 'منیسک طبیعی بدون تغییر سیگنال', 'پارگی جابه‌جا‌شده Bucket-handle'],
          correct: 1,
          explanation: 'سیگنال گوه‌ای یا گلوبولار بدون تماس قطعی با سطح، درجه 2c است. این یافته می‌تواند با دژنراسیون موکوئید و ریسک پارگی مخفی همراه باشد، اما به‌تنهایی معیار درجه ۳ را ندارد.',
        },
        {
          text: 'کدام یافته اضافی بیشترین حمایت را از پارگی قطعی منیسک می‌کند؟',
          options: ['سیگنال در یک برش بدون تماس سطحی', 'بافت منیسک با سیگنال پایین یکنواخت', 'تماس سطحی در حداقل دو برش متوالی', 'افیوژن خفیف بدون تغییر شکل منیسک'],
          correct: 2,
          explanation: 'قانون Two-slice-touch تماس با سطح را در حداقل دو برش متوالی لازم می‌داند و اختصاصیت تشخیص پارگی را بالا می‌برد.',
        },
      ],
    },
    {
      ...MENISCUS_CASES_DE[1],
      label: 'کیس ۲ · کرونال',
      title: 'سیگنال خطی با تماس سطحی فقط در یک برش',
      clinical: 'سکانس PD کرونال از منیسک خارجی دیسکوئید. سیگنال خطی ظاهراً به سطح می‌رسد، اما فقط در یک برش قابل پیگیری است.',
      questions: [
        {
          text: 'این یافته تک‌برشی چگونه باید ارزیابی شود؟',
          options: ['پارگی قطعی درجه ۳', 'یافته درجه 2b یا غیرقطعی', 'پارگی Bucket-handle جابه‌جا‌شده', 'ساختار عروقی طبیعی'],
          correct: 1,
          explanation: 'تماس ظاهری با سطح فقط در یک برش، غیرقطعی و در اینجا مطابق درجه 2b است. بدون تأیید در برش دوم نباید پارگی قطعی درجه ۳ گزارش شود.',
        },
        {
          text: 'کدام عبارت برای گزارش مناسب‌تر است؟',
          options: ['پارگی قطعی منیسک؛ آرتروسکوپی فوری', 'بدون یافته پاتولوژیک', 'تغییر سیگنال داخل منیسک بدون معیار قطعی پارگی', 'پارگی کامل ریشه منیسک'],
          correct: 2,
          explanation: 'این عبارت یافته قابل مشاهده را توصیف می‌کند، بدون اینکه از معیارهای تشخیصی فراتر رود و آرتیفکت تک‌برشی را به‌اشتباه پارگی بنامد.',
        },
      ],
    },
  ],
}

function localized(value, lang) {
  return value?.[lang] || value?.de || ''
}

export default function CasesPage() {
  const { lang } = useLanguage()
  const ui = COPY[lang] || COPY.de
  const dir = lang === 'fa' ? 'rtl' : 'ltr'
  const [topicId, setTopicId] = useState(null)
  const [caseIndex, setCaseIndex] = useState(0)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [checked, setChecked] = useState(false)
  const [answers, setAnswers] = useState([])
  const [finished, setFinished] = useState(false)

  const cases = useMemo(() => topicId === 'meniskus' ? (MENISCUS_CASES[lang] || MENISCUS_CASES.de) : [], [topicId, lang])
  const currentCase = cases[caseIndex]
  const question = currentCase?.questions[questionIndex]
  const totalQuestions = cases.reduce((sum, item) => sum + item.questions.length, 0)
  const answeredBefore = cases.slice(0, caseIndex).reduce((sum, item) => sum + item.questions.length, 0)
  const absoluteQuestion = answeredBefore + questionIndex + 1
  const score = answers.filter(answer => answer.correct).length

  useEffect(() => {
    const requestedTopic = new URLSearchParams(window.location.search).get('thema')
    if (TOPICS.some(topic => topic.id === requestedTopic && topic.ready)) reset(requestedTopic)
  // The URL selection is only applied on the initial page load.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const reset = (nextTopic = topicId) => {
    setTopicId(nextTopic); setCaseIndex(0); setQuestionIndex(0); setSelected(null)
    setChecked(false); setAnswers([]); setFinished(false)
  }

  const checkAnswer = () => {
    if (selected === null || !question) return
    setChecked(true)
    setAnswers(previous => [
      ...previous.filter(answer => answer.caseId !== currentCase.id || answer.questionIndex !== questionIndex),
      { caseId: currentCase.id, questionIndex, correct: selected === question.correct },
    ])
  }

  const next = () => {
    if (questionIndex < currentCase.questions.length - 1) {
      setQuestionIndex(index => index + 1)
    } else if (caseIndex < cases.length - 1) {
      setCaseIndex(index => index + 1); setQuestionIndex(0)
    } else {
      setFinished(true); return
    }
    setSelected(null); setChecked(false)
  }

  const nextLabel = questionIndex < currentCase?.questions.length - 1
    ? ui.next : caseIndex < cases.length - 1 ? ui.nextCase : ui.result

  return (
    <div className={styles.page} dir={dir}>
      <Navbar />
      <header className={styles.hero}>
        <div>
          <Link href="/" className={styles.back}>{ui.back}</Link>
          <span className={styles.eyebrow}>{ui.eyebrow}</span>
          <h1>{ui.title}</h1>
          <p>{ui.lead}</p>
        </div>
        <div className={styles.heroMark} aria-hidden="true"><span>01</span><strong>MRI</strong></div>
      </header>

      <div className={styles.layout}>
        <aside className={styles.directory}>
          <h2>{ui.directory}</h2>
          <div className={styles.topicList}>
            {TOPICS.map(topic => (
              <button key={topic.id} type="button"
                className={`${styles.topicButton} ${topicId === topic.id ? styles.topicActive : ''}`}
                disabled={!topic.ready} onClick={() => reset(topic.id)}>
                <span className={styles.topicIcon}>{topic.id === 'meniskus' ? 'K' : '+'}</span>
                <span className={styles.topicText}>
                  <small>{localized(topic.region, lang)} · {localized(topic.chapter, lang)}</small>
                  <strong>{localized(topic.title, lang)}</strong>
                </span>
                <span className={`${styles.status} ${topic.ready ? styles.statusReady : ''}`}>
                  {topic.ready ? `${topic.count} ${ui.available}` : ui.planned}
                </span>
              </button>
            ))}
          </div>
        </aside>

        <main className={styles.workspace}>
          {!currentCase ? <div className={styles.empty}>{ui.choose}</div> : finished ? (
            <section className={styles.resultCard}>
              <span className={styles.resultIcon}>✓</span>
              <p>{ui.completed}</p><h2>{ui.score(score, totalQuestions)}</h2>
              <div className={styles.resultBar}><span style={{ width: `${totalQuestions ? (score / totalQuestions) * 100 : 0}%` }} /></div>
              <button type="button" onClick={() => reset()}>{ui.restart}</button>
            </section>
          ) : (
            <>
              <div className={styles.progressHeader}>
                <span>{ui.caseOf(caseIndex + 1, cases.length)}</span>
                <div className={styles.progressTrack}><span style={{ width: `${((absoluteQuestion - 1 + (checked ? 1 : 0)) / totalQuestions) * 100}%` }} /></div>
                <strong>{ui.questionOf(absoluteQuestion, totalQuestions)}</strong>
              </div>
              <article className={styles.caseCard}>
                <section className={styles.caseVisual}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={currentCase.image} alt={currentCase.title} />
                  <div className={styles.imageMeta}><span>{currentCase.label}</span><small>{currentCase.credit}</small></div>
                </section>
                <section className={styles.caseQuestion}>
                  <span className={styles.caseLabel}>{currentCase.label}</span>
                  <h2>{currentCase.title}</h2><p className={styles.clinical}>{currentCase.clinical}</p>
                  <div className={styles.questionBlock}><span>{ui.questionOf(absoluteQuestion, totalQuestions)}</span><h3>{question.text}</h3></div>
                  <div className={styles.options}>
                    {question.options.map((option, index) => {
                      const isSelected = selected === index
                      const isCorrect = checked && index === question.correct
                      const isWrong = checked && isSelected && index !== question.correct
                      return (
                        <button key={option} type="button" disabled={checked}
                          className={`${styles.option} ${isSelected ? styles.optionSelected : ''} ${isCorrect ? styles.optionCorrect : ''} ${isWrong ? styles.optionWrong : ''}`}
                          onClick={() => setSelected(index)}>
                          <span>{String.fromCharCode(65 + index)}</span><strong>{option}</strong>
                          {isCorrect && <em>✓</em>}{isWrong && <em>×</em>}
                        </button>
                      )
                    })}
                  </div>
                  {checked && (
                    <div className={`${styles.feedback} ${selected === question.correct ? styles.feedbackCorrect : styles.feedbackWrong}`}>
                      <strong>{selected === question.correct ? ui.correct : ui.incorrect}</strong>
                      <span>{ui.explanation}</span><p>{question.explanation}</p>
                      <a href={currentCase.source} target="_blank" rel="noopener noreferrer">{ui.source} ↗</a>
                    </div>
                  )}
                  <div className={styles.actions}>
                    {!checked
                      ? <button type="button" disabled={selected === null} onClick={checkAnswer}>{ui.check}</button>
                      : <button type="button" onClick={next}>{nextLabel}</button>}
                  </div>
                </section>
              </article>
            </>
          )}
        </main>
      </div>
    </div>
  )
}
