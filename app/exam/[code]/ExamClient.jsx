'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import styles from './page.module.css'

const EXAM_COPY = Object.freeze({
  fa: {
    locale: 'fa-IR', dir: 'rtl', loading: 'در حال آماده‌سازی امتحان…', openFailed: 'امتحان باز نشد', badge: 'امتحان آنلاین', introFallback: 'پیش از شروع، اطلاعات خود را وارد کنید.', questions: 'تعداد سؤال', time: 'زمان', minutes: 'دقیقه', pass: 'حد قبولی', name: 'نام و نام خانوادگی *', namePlaceholder: 'نام شما', email: 'ایمیل *', start: 'شروع امتحان', startArrow: '←', notice: 'با شروع امتحان، زمان‌سنج فعال می‌شود. پاسخ‌ها در پایان به‌صورت خودکار ارسال خواهند شد.', nameError: 'لطفاً نام و نام خانوادگی خود را وارد کنید.', emailError: 'لطفاً ایمیل معتبر خود را وارد کنید.', submitting: 'در حال ثبت پاسخ‌ها', dontClose: 'این صفحه را نبندید.', submitted: 'پاسخ‌ها ثبت شد', thanks: name => `${name}، ممنون!`, passed: 'شما در این امتحان قبول شدید.', failed: 'این بار به حد قبولی نرسیدید.', resultSent: 'نتیجه برای مدیر امتحان ارسال شد.', saved: 'نتیجه شما با موفقیت ذخیره شد و برگزارکننده می‌تواند آن را مشاهده کند.', exam: 'امتحان', remaining: 'زمان باقی‌مانده', answered: (done, total) => `${done} از ${total} پاسخ داده شده`, questionOf: (current, total) => `سؤال ${current} از ${total}`, previous: 'سؤال قبلی', next: 'سؤال بعدی', submit: 'پایان و ارسال پاسخ‌ها', questionList: 'فهرست سؤال‌ها', answeredLegend: 'پاسخ داده‌شده', unansweredLegend: 'بدون پاسخ', finish: 'پایان امتحان', of: 'از',
  },
  en: {
    locale: 'en-US', dir: 'ltr', loading: 'Preparing the exam…', openFailed: 'The exam could not be opened', badge: 'Online exam', introFallback: 'Enter your details before starting.', questions: 'Questions', time: 'Time', minutes: 'minutes', pass: 'Pass mark', name: 'Full name *', namePlaceholder: 'Your name', email: 'Email *', start: 'Start exam', startArrow: '→', notice: 'The timer starts when you begin. Your answers are submitted automatically when time runs out.', nameError: 'Please enter your full name.', emailError: 'Please enter a valid email address.', submitting: 'Submitting answers', dontClose: 'Please do not close this page.', submitted: 'Answers submitted', thanks: name => `Thank you, ${name}!`, passed: 'You passed this exam.', failed: 'You did not reach the pass mark this time.', resultSent: 'Your result was sent to the exam administrator.', saved: 'Your result was saved successfully and is available to the organizer.', exam: 'Exam', remaining: 'Time remaining', answered: (done, total) => `${done} of ${total} answered`, questionOf: (current, total) => `Question ${current} of ${total}`, previous: 'Previous question', next: 'Next question', submit: 'Finish and submit', questionList: 'Question list', answeredLegend: 'Answered', unansweredLegend: 'Unanswered', finish: 'Finish exam', of: 'of',
  },
  de: {
    locale: 'de-DE', dir: 'ltr', loading: 'Prüfung wird vorbereitet…', openFailed: 'Die Prüfung konnte nicht geöffnet werden', badge: 'Online-Prüfung', introFallback: 'Bitte geben Sie vor dem Start Ihre Daten ein.', questions: 'Fragen', time: 'Zeit', minutes: 'Minuten', pass: 'Bestehensgrenze', name: 'Vor- und Nachname *', namePlaceholder: 'Ihr Name', email: 'E-Mail *', start: 'Prüfung starten', startArrow: '→', notice: 'Der Timer startet mit der Prüfung. Nach Ablauf der Zeit werden Ihre Antworten automatisch gesendet.', nameError: 'Bitte geben Sie Ihren vollständigen Namen ein.', emailError: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.', submitting: 'Antworten werden gesendet', dontClose: 'Bitte schließen Sie diese Seite nicht.', submitted: 'Antworten gesendet', thanks: name => `Vielen Dank, ${name}!`, passed: 'Sie haben diese Prüfung bestanden.', failed: 'Sie haben die Bestehensgrenze diesmal nicht erreicht.', resultSent: 'Ihr Ergebnis wurde an die Prüfungsleitung gesendet.', saved: 'Ihr Ergebnis wurde erfolgreich gespeichert und ist für die Prüfungsleitung sichtbar.', exam: 'Prüfung', remaining: 'Verbleibende Zeit', answered: (done, total) => `${done} von ${total} beantwortet`, questionOf: (current, total) => `Frage ${current} von ${total}`, previous: 'Vorherige Frage', next: 'Nächste Frage', submit: 'Beenden und senden', questionList: 'Fragenübersicht', answeredLegend: 'Beantwortet', unansweredLegend: 'Nicht beantwortet', finish: 'Prüfung beenden', of: 'von',
  },
})

function formatTime(seconds, locale = 'fa-IR') {
  const safe = Math.max(0, seconds)
  const minutes = Math.floor(safe / 60)
  return `${minutes.toLocaleString(locale)}:${String(safe % 60).padStart(2, '0')}`
}

function availableSeconds(exam) {
  const personalLimit = Number(exam?.duration_minutes || 0) * 60
  const closesAt = Date.parse(exam?.closes_at)
  if (!Number.isFinite(closesAt)) return personalLimit
  const globalLimit = Math.max(0, Math.floor((closesAt - Date.now()) / 1000))
  return Math.min(personalLimit, globalLimit)
}

function formatDate(value) {
  if (!value) return '—'
  return new Intl.DateTimeFormat('fa-IR', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value))
}

async function readJson(response) {
  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(data.error || 'خطایی رخ داد.')
  return data
}

export default function ExamClient({ code }) {
  const [exam, setExam] = useState(null)
  const [questions, setQuestions] = useState([])
  const [phase, setPhase] = useState('loading')
  const [error, setError] = useState('')
  const [participantName, setParticipantName] = useState('')
  const [participantEmail, setParticipantEmail] = useState('')
  const [website, setWebsite] = useState('')
  const [answers, setAnswers] = useState({})
  const [current, setCurrent] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [startedAt, setStartedAt] = useState('')
  const [result, setResult] = useState(null)
  const submittingRef = useRef(false)
  const language = exam?.language in EXAM_COPY ? exam.language : 'fa'
  const copy = EXAM_COPY[language]

  useEffect(() => {
    let active = true
    async function load() {
      try {
        const data = await readJson(await fetch(`/api/exams/${encodeURIComponent(code)}`, { cache: 'no-store' }))
        if (!active) return
        setExam(data.exam)
        setQuestions(data.questions || [])
        setTimeLeft(availableSeconds(data.exam))
        setPhase('intro')
      } catch (err) {
        if (!active) return
        setError(err.message)
        setPhase('error')
      }
    }
    load()
    return () => { active = false }
  }, [code])

  const answeredCount = useMemo(() => Object.values(answers).filter(value => Number.isInteger(value)).length, [answers])
  const progress = questions.length ? (answeredCount / questions.length) * 100 : 0
  const question = questions[current]

  const submitExam = useCallback(async () => {
    if (submittingRef.current) return
    submittingRef.current = true
    setPhase('submitting')
    setError('')
    try {
      const data = await readJson(await fetch(`/api/exams/${encodeURIComponent(code)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ participantName, participantEmail, website, answers, startedAt }),
      }))
      setResult(data.result)
      setPhase('result')
    } catch (err) {
      setError(err.message)
      setPhase('quiz')
    } finally {
      submittingRef.current = false
    }
  }, [answers, code, participantEmail, participantName, startedAt, website])

  useEffect(() => {
    if (phase !== 'quiz') return undefined
    const timer = window.setInterval(() => setTimeLeft(value => Math.max(0, value - 1)), 1000)
    return () => window.clearInterval(timer)
  }, [phase])

  useEffect(() => {
    if (phase === 'quiz' && timeLeft === 0 && startedAt) submitExam()
  }, [phase, startedAt, submitExam, timeLeft])

  function startExam(event) {
    event.preventDefault()
    if (participantName.trim().length < 2) {
      setError(copy.nameError)
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(participantEmail.trim())) {
      setError(copy.emailError)
      return
    }
    const allowedSeconds = availableSeconds(exam)
    if (allowedSeconds <= 0) {
      setError(language === 'en' ? 'The participation period for this exam has ended.' : language === 'de' ? 'Der Teilnahmezeitraum für diese Prüfung ist beendet.' : 'مهلت شرکت در این آزمون به پایان رسیده است.')
      return
    }
    setError('')
    setStartedAt(new Date().toISOString())
    setTimeLeft(allowedSeconds)
    setPhase('quiz')
  }

  function selectOption(optionIndex) {
    if (!question) return
    setAnswers(currentAnswers => ({ ...currentAnswers, [question.id]: optionIndex }))
  }

  if (phase === 'loading') return <main className={styles.page} dir="rtl"><div className={styles.centerCard}><span className={styles.loader} /><p>{copy.loading}</p></div></main>
  if (phase === 'error') return <main className={styles.page} dir={copy.dir}><div className={styles.centerCard}><span className={styles.errorIcon}>!</span><h1>{copy.openFailed}</h1><p>{error}</p></div></main>

  if (phase === 'intro') return (
    <main className={styles.page} dir={copy.dir} lang={language}>
      <section className={styles.introCard}>
        <div className={styles.introTop}>
          <span className={styles.badge}>{copy.badge}</span>
          <h1>{exam.title}</h1>
          <p>{exam.description || copy.introFallback}</p>
        </div>
        <div className={styles.examFacts}>
          <div><span>{copy.questions}</span><strong>{questions.length.toLocaleString(copy.locale)}</strong></div>
          <div><span>{copy.time}</span><strong>{Number(exam.duration_minutes).toLocaleString(copy.locale)} {copy.minutes}</strong></div>
          <div><span>{copy.pass}</span><strong>{Number(exam.pass_percent).toLocaleString(copy.locale)}%</strong></div>
          <div><span>{language === 'en' ? 'Available until' : language === 'de' ? 'Verfügbar bis' : 'فعال تا'}</span><strong>{new Intl.DateTimeFormat(copy.locale, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(exam.closes_at))}</strong></div>
        </div>
        <form className={styles.identityForm} onSubmit={startExam}>
          <label><span>{copy.name}</span><input autoFocus required minLength={2} maxLength={120} value={participantName} onChange={event => setParticipantName(event.target.value)} autoComplete="name" placeholder={copy.namePlaceholder} /></label>
          <label><span>{copy.email}</span><input type="email" required maxLength={254} value={participantEmail} onChange={event => setParticipantEmail(event.target.value)} autoComplete="email" placeholder="name@example.com" dir="ltr" /></label>
          <label className={styles.honeypot} aria-hidden="true"><span>Website</span><input tabIndex={-1} autoComplete="off" value={website} onChange={event => setWebsite(event.target.value)} /></label>
          {error ? <div className={styles.error} role="alert">{error}</div> : null}
          <button type="submit">{copy.start} <span aria-hidden="true">{copy.startArrow}</span></button>
          <small className={styles.notice}>{copy.notice}</small>
        </form>
      </section>
    </main>
  )

  if (phase === 'submitting') return <main className={styles.page} dir={copy.dir}><div className={styles.centerCard}><span className={styles.loader} /><h1>{copy.submitting}</h1><p>{copy.dontClose}</p></div></main>

  if (phase === 'result') return (
    <main className={styles.page} dir={copy.dir} lang={language}>
      <section className={styles.resultCard}>
        <span className={result?.passed ? styles.resultSuccess : styles.resultDone}>{result ? (result.passed ? '✓' : '!') : '✓'}</span>
        <span className={styles.badge}>{copy.submitted}</span>
        <h1>{copy.thanks(participantName)}</h1>
        {result ? (
          <>
            <div className={styles.scoreCircle} style={{ '--score': `${result.percentage * 3.6}deg` }}><div><strong>{Number(result.percentage).toLocaleString(copy.locale)}%</strong><span>{result.score.toLocaleString(copy.locale)} {copy.of} {result.maxScore.toLocaleString(copy.locale)}</span></div></div>
            <p className={result.passed ? styles.passText : styles.failText}>{result.passed ? copy.passed : copy.failed}</p>
          </>
        ) : <p>{copy.resultSent}</p>}
        <div className={styles.resultNote}>{copy.saved}</div>
      </section>
    </main>
  )

  return (
    <main className={styles.page} dir={copy.dir} lang={language}>
      <div className={styles.examShell}>
        <header className={styles.examHeader}>
          <div><span className={styles.headerLabel}>{copy.exam}</span><h1>{exam.title}</h1></div>
          <div className={timeLeft < 60 ? styles.timerLow : styles.timer}><span>{copy.remaining}</span><strong dir="ltr">{formatTime(timeLeft, copy.locale)}</strong></div>
        </header>

        <div className={styles.progressRow}>
          <div className={styles.progressTrack}><span style={{ width: `${progress}%` }} /></div>
          <span>{copy.answered(answeredCount.toLocaleString(copy.locale), questions.length.toLocaleString(copy.locale))}</span>
        </div>

        {error ? <div className={styles.error} role="alert">{error}</div> : null}

        <div className={styles.examLayout}>
          <section className={styles.questionCard}>
            <div className={styles.questionNumber}>{copy.questionOf(Number(current + 1).toLocaleString(copy.locale), questions.length.toLocaleString(copy.locale))}</div>
            <h2>{question.prompt}</h2>
            <div className={styles.options}>
              {question.options.map((option, index) => (
                <button type="button" className={answers[question.id] === index ? styles.optionSelected : styles.option} onClick={() => selectOption(index)} key={index}>
                  <span className={styles.optionMark}>{String.fromCharCode(65 + index)}</span>
                  <span>{option}</span>
                  <i aria-hidden="true">{answers[question.id] === index ? '✓' : ''}</i>
                </button>
              ))}
            </div>
            <div className={styles.questionActions}>
              <button type="button" className={styles.previous} disabled={current === 0} onClick={() => setCurrent(value => Math.max(0, value - 1))}>{copy.previous}</button>
              {current < questions.length - 1
                ? <button type="button" className={styles.next} onClick={() => setCurrent(value => Math.min(questions.length - 1, value + 1))}>{copy.next}</button>
                : <button type="button" className={styles.submit} onClick={submitExam}>{copy.submit}</button>}
            </div>
          </section>

          <aside className={styles.navigator}>
            <div className={styles.navigatorHeader}><strong>{copy.questionList}</strong><span>{answeredCount.toLocaleString(copy.locale)}/{questions.length.toLocaleString(copy.locale)}</span></div>
            <div className={styles.questionDots}>
              {questions.map((item, index) => (
                <button type="button" className={`${styles.dot} ${index === current ? styles.dotCurrent : ''} ${Number.isInteger(answers[item.id]) ? styles.dotAnswered : ''}`} onClick={() => setCurrent(index)} key={item.id}>{Number(index + 1).toLocaleString(copy.locale)}</button>
              ))}
            </div>
            <div className={styles.legend}><span><i className={styles.legendAnswered} />{copy.answeredLegend}</span><span><i className={styles.legendOpen} />{copy.unansweredLegend}</span></div>
            <button type="button" className={styles.finishButton} onClick={submitExam}>{copy.finish}</button>
          </aside>
        </div>
      </div>
    </main>
  )
}
