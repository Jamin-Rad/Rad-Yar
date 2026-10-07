'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import styles from './page.module.css'

function formatTime(seconds) {
  const safe = Math.max(0, seconds)
  const minutes = Math.floor(safe / 60)
  return `${minutes.toLocaleString('fa-IR')}:${String(safe % 60).padStart(2, '0')}`
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
      setError('لطفاً نام و نام خانوادگی خود را وارد کنید.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(participantEmail.trim())) {
      setError('لطفاً ایمیل معتبر خود را وارد کنید.')
      return
    }
    const allowedSeconds = availableSeconds(exam)
    if (allowedSeconds <= 0) {
      setError('مهلت شرکت در این آزمون به پایان رسیده است.')
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

  if (phase === 'loading') return <main className={styles.page} dir="rtl"><div className={styles.centerCard}><span className={styles.loader} /><p>در حال آماده‌سازی امتحان…</p></div></main>
  if (phase === 'error') return <main className={styles.page} dir="rtl"><div className={styles.centerCard}><span className={styles.errorIcon}>!</span><h1>امتحان باز نشد</h1><p>{error}</p></div></main>

  if (phase === 'intro') return (
    <main className={styles.page} dir="rtl">
      <section className={styles.introCard}>
        <div className={styles.introTop}>
          <span className={styles.badge}>امتحان آنلاین</span>
          <h1>{exam.title}</h1>
          <p>{exam.description || 'پیش از شروع، اطلاعات خود را وارد کنید.'}</p>
        </div>
        <div className={styles.examFacts}>
          <div><span>تعداد سؤال</span><strong>{questions.length.toLocaleString('fa-IR')}</strong></div>
          <div><span>زمان پاسخ‌گویی</span><strong>{Number(exam.duration_minutes).toLocaleString('fa-IR')} دقیقه</strong></div>
          <div><span>حد قبولی</span><strong>{Number(exam.pass_percent).toLocaleString('fa-IR')}٪</strong></div>
          <div><span>فعال تا</span><strong>{formatDate(exam.closes_at)}</strong></div>
        </div>
        <form className={styles.identityForm} onSubmit={startExam}>
          <label><span>نام و نام خانوادگی *</span><input autoFocus required minLength={2} maxLength={120} value={participantName} onChange={event => setParticipantName(event.target.value)} autoComplete="name" placeholder="نام شما" /></label>
          <label><span>ایمیل *</span><input type="email" required maxLength={254} value={participantEmail} onChange={event => setParticipantEmail(event.target.value)} autoComplete="email" placeholder="name@example.com" dir="ltr" /></label>
          <label className={styles.honeypot} aria-hidden="true"><span>Website</span><input tabIndex={-1} autoComplete="off" value={website} onChange={event => setWebsite(event.target.value)} /></label>
          {error ? <div className={styles.error} role="alert">{error}</div> : null}
          <button type="submit">شروع امتحان <span aria-hidden="true">←</span></button>
          <small className={styles.notice}>با شروع امتحان، زمان‌سنج فعال می‌شود. پاسخ‌ها در پایان به‌صورت خودکار ارسال خواهند شد.</small>
        </form>
      </section>
    </main>
  )

  if (phase === 'submitting') return <main className={styles.page} dir="rtl"><div className={styles.centerCard}><span className={styles.loader} /><h1>در حال ثبت پاسخ‌ها</h1><p>این صفحه را نبندید.</p></div></main>

  if (phase === 'result') return (
    <main className={styles.page} dir="rtl">
      <section className={styles.resultCard}>
        <span className={result?.passed ? styles.resultSuccess : styles.resultDone}>{result ? (result.passed ? '✓' : '!') : '✓'}</span>
        <span className={styles.badge}>پاسخ‌ها ثبت شد</span>
        <h1>{participantName}، ممنون!</h1>
        {result ? (
          <>
            <div className={styles.scoreCircle} style={{ '--score': `${result.percentage * 3.6}deg` }}><div><strong>{Number(result.percentage).toLocaleString('fa-IR')}٪</strong><span>{result.score.toLocaleString('fa-IR')} از {result.maxScore.toLocaleString('fa-IR')}</span></div></div>
            <p className={result.passed ? styles.passText : styles.failText}>{result.passed ? 'شما در این امتحان قبول شدید.' : 'این بار به حد قبولی نرسیدید.'}</p>
          </>
        ) : <p>نتیجه برای مدیر امتحان ارسال شد.</p>}
        <div className={styles.resultNote}>نتیجه شما با موفقیت ذخیره شد و برگزارکننده می‌تواند آن را مشاهده کند.</div>
      </section>
    </main>
  )

  return (
    <main className={styles.page} dir="rtl">
      <div className={styles.examShell}>
        <header className={styles.examHeader}>
          <div><span className={styles.headerLabel}>امتحان</span><h1>{exam.title}</h1></div>
          <div className={timeLeft < 60 ? styles.timerLow : styles.timer}><span>زمان باقی‌مانده</span><strong dir="ltr">{formatTime(timeLeft)}</strong></div>
        </header>

        <div className={styles.progressRow}>
          <div className={styles.progressTrack}><span style={{ width: `${progress}%` }} /></div>
          <span>{answeredCount.toLocaleString('fa-IR')} از {questions.length.toLocaleString('fa-IR')} پاسخ داده شده</span>
        </div>

        {error ? <div className={styles.error} role="alert">{error}</div> : null}

        <div className={styles.examLayout}>
          <section className={styles.questionCard}>
            <div className={styles.questionNumber}>سؤال {Number(current + 1).toLocaleString('fa-IR')} از {questions.length.toLocaleString('fa-IR')}</div>
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
              <button type="button" className={styles.previous} disabled={current === 0} onClick={() => setCurrent(value => Math.max(0, value - 1))}>سؤال قبلی</button>
              {current < questions.length - 1
                ? <button type="button" className={styles.next} onClick={() => setCurrent(value => Math.min(questions.length - 1, value + 1))}>سؤال بعدی</button>
                : <button type="button" className={styles.submit} onClick={submitExam}>پایان و ارسال پاسخ‌ها</button>}
            </div>
          </section>

          <aside className={styles.navigator}>
            <div className={styles.navigatorHeader}><strong>فهرست سؤال‌ها</strong><span>{answeredCount.toLocaleString('fa-IR')}/{questions.length.toLocaleString('fa-IR')}</span></div>
            <div className={styles.questionDots}>
              {questions.map((item, index) => (
                <button type="button" className={`${styles.dot} ${index === current ? styles.dotCurrent : ''} ${Number.isInteger(answers[item.id]) ? styles.dotAnswered : ''}`} onClick={() => setCurrent(index)} key={item.id}>{Number(index + 1).toLocaleString('fa-IR')}</button>
              ))}
            </div>
            <div className={styles.legend}><span><i className={styles.legendAnswered} />پاسخ داده‌شده</span><span><i className={styles.legendOpen} />بدون پاسخ</span></div>
            <button type="button" className={styles.finishButton} onClick={submitExam}>پایان امتحان</button>
          </aside>
        </div>
      </div>
    </main>
  )
}
