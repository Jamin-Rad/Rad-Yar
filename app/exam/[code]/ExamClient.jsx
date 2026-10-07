'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { useTheme } from '@/providers/ThemeProvider'
import RadYarIcon from '@/components/RadYarIcon'
import { getCorrectAnswerExplanation, getWrongAnswerExplanation } from '@/utils/answerFeedback'
import styles from './page.module.css'

const EXAM_COPY = Object.freeze({
  fa: {
    locale: 'fa-IR', dir: 'rtl', loading: 'در حال آماده‌سازی امتحان…', openFailed: 'امتحان باز نشد', badge: 'امتحان آنلاین', introFallback: 'پیش از شروع، اطلاعات خود را وارد کنید.', questions: 'تعداد سؤال', questionUnit: 'سؤال', time: 'زمان', minutes: 'دقیقه', name: 'نام و نام خانوادگی *', namePlaceholder: 'نام شما', contact: 'ایمیل یا آیدی اینستاگرام *', contactPlaceholder: '@username یا name@example.com', start: 'شروع امتحان', startArrow: '←', notice: 'با شروع امتحان، زمان‌سنج فعال می‌شود. پاسخ‌ها در پایان به‌صورت خودکار ارسال خواهند شد.', nameError: 'لطفاً نام و نام خانوادگی خود را وارد کنید.', contactError: 'لطفاً یک ایمیل معتبر یا آیدی اینستاگرام وارد کنید.', submitting: 'در حال ثبت پاسخ‌ها', dontClose: 'این صفحه را نبندید.', submitted: 'پاسخ‌ها ثبت شد', thanks: name => `${name}، ممنون!`, sentTo: organizer => `نتیجه امتحان شما به ${organizer} ارسال شد.`, resultSent: 'نتیجه برای برگزارکننده ارسال شد.', rank: (rank, total) => `رتبه فعلی شما: ${rank} از ${total}`, review: 'مرور و کنترل سؤال‌ها', hideReview: 'بستن مرور سؤال‌ها', correct: 'درست!', incorrect: 'متأسفانه اشتباه', whyWrong: 'چرا پاسخ شما نادرست است', feedback: 'نظر بده', feedbackCtaHint: 'نظر شما آزمون‌های بعدی را بهتر می‌کند', hideFeedback: 'بستن فرم نظر', correctAnswer: 'پاسخ صحیح', yourAnswer: 'پاسخ شما', unansweredReview: 'بدون پاسخ', explanation: 'توضیح پاسخ', feedbackTitle: 'کیفیت این آزمون را ارزیابی کنید', feedbackHint: 'کمتر از یک دقیقه زمان می‌برد و مستقیماً به بهترشدن آزمون‌ها کمک می‌کند.', questionQuality: 'کیفیت سؤال‌ها چطور بود؟', designQuality: 'کیفیت طراحی و تجربه آزمون چطور بود؟', clipQuality: 'کیفیت کلیپ آموزشی مرتبط چطور بود؟', feedbackMessageTitle: 'خوشحال می‌شوم اگر پیامی داشته باشید', feedbackMessageHint: 'اختیاری است؛ پیشنهاد، انتقاد یا نکته‌ای که دوست دارید بدانیم.', feedbackPlaceholder: 'پیام شما…', sendFeedback: 'ثبت نظر من', sendingFeedback: 'در حال ارسال…', feedbackSaved: 'نظر شما ثبت شد. از همراهی‌تان ممنونیم!', feedbackError: 'لطفاً برای هر سه بخش یک امتیاز انتخاب کنید.', ratingLabels: ['خیلی ضعیف', 'ضعیف', 'متوسط', 'خوب', 'عالی'], exam: 'امتحان', remaining: 'زمان باقی‌مانده', answered: (done, total) => `${done} از ${total} پاسخ داده شده`, questionOf: (current, total) => `سؤال ${current} از ${total}`, previous: 'سؤال قبلی', next: 'سؤال بعدی', submit: 'پایان و ارسال پاسخ‌ها', questionList: 'فهرست سؤال‌ها', answeredLegend: 'پاسخ داده‌شده', unansweredLegend: 'بدون پاسخ', finish: 'پایان امتحان', of: 'از',
  },
  en: {
    locale: 'en-US', dir: 'ltr', loading: 'Preparing the exam…', openFailed: 'The exam could not be opened', badge: 'Online exam', introFallback: 'Enter your details before starting.', questions: 'Questions', questionUnit: 'questions', time: 'Time', minutes: 'minutes', name: 'Full name *', namePlaceholder: 'Your name', contact: 'Email or Instagram ID *', contactPlaceholder: '@username or name@example.com', start: 'Start exam', startArrow: '→', notice: 'The timer starts when you begin. Your answers are submitted automatically when time runs out.', nameError: 'Please enter your full name.', contactError: 'Please enter a valid email address or Instagram ID.', submitting: 'Submitting answers', dontClose: 'Please do not close this page.', submitted: 'Answers submitted', thanks: name => `Thank you, ${name}!`, sentTo: organizer => `Your exam result was sent to ${organizer}.`, resultSent: 'Your result was sent to the organizer.', rank: (rank, total) => `Your current rank: ${rank} of ${total}`, review: 'Review questions', hideReview: 'Close question review', correct: 'Correct!', incorrect: 'Unfortunately incorrect', whyWrong: 'Why your answer is incorrect', feedback: 'Leave feedback', feedbackCtaHint: 'Your feedback makes the next exam better', hideFeedback: 'Close feedback form', correctAnswer: 'Correct answer', yourAnswer: 'Your answer', unansweredReview: 'Not answered', explanation: 'Explanation', feedbackTitle: 'Rate the quality of this exam', feedbackHint: 'It takes less than a minute and directly helps us improve.', questionQuality: 'How was the quality of the questions?', designQuality: 'How was the exam design and experience?', clipQuality: 'How was the related educational video?', feedbackMessageTitle: 'I would be happy to hear any message you have', feedbackMessageHint: 'Optional—share a suggestion, criticism, or anything we should know.', feedbackPlaceholder: 'Your message…', sendFeedback: 'Submit my feedback', sendingFeedback: 'Sending…', feedbackSaved: 'Thank you—your feedback was saved!', feedbackError: 'Please rate all three areas before submitting.', ratingLabels: ['Very poor', 'Poor', 'Average', 'Good', 'Excellent'], exam: 'Exam', remaining: 'Time remaining', answered: (done, total) => `${done} of ${total} answered`, questionOf: (current, total) => `Question ${current} of ${total}`, previous: 'Previous question', next: 'Next question', submit: 'Finish and submit', questionList: 'Question list', answeredLegend: 'Answered', unansweredLegend: 'Unanswered', finish: 'Finish exam', of: 'of',
  },
  de: {
    locale: 'de-DE', dir: 'ltr', loading: 'Prüfung wird vorbereitet…', openFailed: 'Die Prüfung konnte nicht geöffnet werden', badge: 'Online-Prüfung', introFallback: 'Bitte geben Sie vor dem Start Ihre Daten ein.', questions: 'Fragen', questionUnit: 'Fragen', time: 'Zeit', minutes: 'Minuten', name: 'Vor- und Nachname *', namePlaceholder: 'Ihr Name', contact: 'E-Mail oder Instagram-ID *', contactPlaceholder: '@username oder name@example.com', start: 'Prüfung starten', startArrow: '→', notice: 'Der Timer startet mit der Prüfung. Nach Ablauf der Zeit werden Ihre Antworten automatisch gesendet.', nameError: 'Bitte geben Sie Ihren vollständigen Namen ein.', contactError: 'Bitte geben Sie eine gültige E-Mail-Adresse oder Instagram-ID ein.', submitting: 'Antworten werden gesendet', dontClose: 'Bitte schließen Sie diese Seite nicht.', submitted: 'Antworten gesendet', thanks: name => `Vielen Dank, ${name}!`, sentTo: organizer => `Ihr Prüfungsergebnis wurde an ${organizer} gesendet.`, resultSent: 'Ihr Ergebnis wurde an die Prüfungsleitung gesendet.', rank: (rank, total) => `Ihr aktueller Rang: ${rank} von ${total}`, review: 'Fragen kontrollieren', hideReview: 'Fragenkontrolle schließen', correct: 'Richtig!', incorrect: 'Leider falsch', whyWrong: 'Warum Ihre Antwort falsch ist', feedback: 'Feedback geben', feedbackCtaHint: 'Ihr Feedback macht die nächsten Prüfungen besser', hideFeedback: 'Bewertung schließen', correctAnswer: 'Richtige Antwort', yourAnswer: 'Ihre Antwort', unansweredReview: 'Nicht beantwortet', explanation: 'Erklärung', feedbackTitle: 'Bewerten Sie die Qualität dieser Prüfung', feedbackHint: 'Es dauert weniger als eine Minute und hilft uns direkt bei der Verbesserung.', questionQuality: 'Wie war die Qualität der Fragen?', designQuality: 'Wie waren Gestaltung und Prüfungserlebnis?', clipQuality: 'Wie war das zugehörige Lernvideo?', feedbackMessageTitle: 'Ich freue mich, wenn Sie mir noch etwas mitteilen möchten', feedbackMessageHint: 'Optional—teilen Sie eine Anregung, Kritik oder einen Hinweis mit uns.', feedbackPlaceholder: 'Ihre Nachricht…', sendFeedback: 'Mein Feedback absenden', sendingFeedback: 'Wird gesendet…', feedbackSaved: 'Vielen Dank! Ihr Feedback wurde gespeichert.', feedbackError: 'Bitte bewerten Sie vor dem Senden alle drei Bereiche.', ratingLabels: ['Sehr schlecht', 'Schlecht', 'Mittel', 'Gut', 'Sehr gut'], exam: 'Prüfung', remaining: 'Verbleibende Zeit', answered: (done, total) => `${done} von ${total} beantwortet`, questionOf: (current, total) => `Frage ${current} von ${total}`, previous: 'Vorherige Frage', next: 'Nächste Frage', submit: 'Beenden und senden', questionList: 'Fragenübersicht', answeredLegend: 'Beantwortet', unansweredLegend: 'Nicht beantwortet', finish: 'Prüfung beenden', of: 'von',
  },
})

const HEADER_COPY = Object.freeze({
  fa: { light: 'حالت روشن', dark: 'حالت تاریک' },
  en: { light: 'Light mode', dark: 'Dark mode' },
  de: { light: 'Heller Modus', dark: 'Dunkler Modus' },
})

function ExamFrame({ children, language = 'fa', dir = 'rtl' }) {
  const { theme, toggleTheme } = useTheme()
  const labels = HEADER_COPY[language] || HEADER_COPY.fa
  const themeLabel = theme === 'dark' ? labels.light : labels.dark

  return (
    <>
      <header className={styles.examTopbar} dir={dir}>
        <Link href="/?lang=de" className={styles.homeLink} dir="ltr" aria-label="RadYar Startseite auf Deutsch" title="RadYar Startseite auf Deutsch">
          <RadYarIcon size={30} />
          <span className={styles.examWordmark} aria-hidden="true"><span className={styles.rad}>RAD</span><span className={styles.yar}>YAR</span></span>
        </Link>
        <button type="button" className={styles.themeToggle} onClick={toggleTheme} aria-label={themeLabel} title={themeLabel}>
          <span aria-hidden="true">{theme === 'dark' ? '☀' : '☾'}</span>
          <strong>{themeLabel}</strong>
        </button>
      </header>
      <main className={styles.page} dir={dir} lang={language}>{children}</main>
    </>
  )
}

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

function isValidContact(value) {
  const contact = value.trim()
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact)) return true
  const withoutUrl = contact.replace(/^https?:\/\/(?:www\.)?instagram\.com\//i, '')
  const handle = withoutUrl.replace(/^@/, '').split(/[/?#]/)[0]
  return /^(?=.*[A-Za-z0-9])[A-Za-z0-9._]{1,30}$/.test(handle)
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

function asStandardQuestion(item) {
  const optionIds = item.options.map((_, index) => String.fromCharCode(65 + index))
  return {
    explanation: item.explanation,
    correct: optionIds[item.correctOptionIndex],
    originalCorrect: optionIds[item.correctOptionIndex],
    options: item.options.map((text, index) => ({ id: optionIds[index], text })),
  }
}

function ChevronIcon({ direction = 'next' }) {
  const transform = direction === 'previous' ? 'rotate(180 10 10)' : undefined
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M7.5 4.75 12.75 10 7.5 15.25" transform={transform} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="m5.25 5.25 9.5 9.5m0-9.5-9.5 9.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function RatingScale({ label, name, value, labels, locale, onChange }) {
  return (
    <fieldset className={styles.ratingFieldset}>
      <legend>{label}</legend>
      <div className={styles.ratingOptions}>
        {labels.map((ratingLabel, index) => {
          const ratingValue = index + 1
          const selected = value === ratingValue
          return (
            <label className={selected ? styles.ratingSelected : styles.ratingOption} key={ratingLabel}>
              <input type="radio" name={name} value={ratingValue} checked={selected} onChange={() => onChange(ratingValue)} />
              <span>{ratingValue.toLocaleString(locale)}</span>
              <strong>{ratingLabel}</strong>
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}

export default function ExamClient({ code }) {
  const [exam, setExam] = useState(null)
  const [questions, setQuestions] = useState([])
  const [phase, setPhase] = useState('loading')
  const [error, setError] = useState('')
  const [participantName, setParticipantName] = useState('')
  const [participantContact, setParticipantContact] = useState('')
  const [website, setWebsite] = useState('')
  const [answers, setAnswers] = useState({})
  const [current, setCurrent] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [startedAt, setStartedAt] = useState('')
  const [result, setResult] = useState(null)
  const [attemptId, setAttemptId] = useState('')
  const [reviewOpen, setReviewOpen] = useState(false)
  const [reviewIndex, setReviewIndex] = useState(0)
  const [feedbackOpen, setFeedbackOpen] = useState(false)
  const [feedbackRatings, setFeedbackRatings] = useState({ questions: null, design: null, clip: null })
  const [feedbackText, setFeedbackText] = useState('')
  const [feedbackState, setFeedbackState] = useState('idle')
  const [feedbackError, setFeedbackError] = useState('')
  const submittingRef = useRef(false)
  const feedbackCloseRef = useRef(null)
  const language = exam?.language in EXAM_COPY ? exam.language : 'fa'
  const copy = EXAM_COPY[language]
  const organizerName = exam?.organizer_name || (language === 'en' ? 'the exam organizer' : language === 'de' ? 'die Prüfungsleitung' : 'برگزارکننده آزمون')

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
        body: JSON.stringify({ participantName, participantContact, website, answers, startedAt }),
      }))
      setAttemptId(data.attemptId)
      setResult(data.result)
      setPhase('result')
    } catch (err) {
      setError(err.message)
      setPhase('quiz')
    } finally {
      submittingRef.current = false
    }
  }, [answers, code, participantContact, participantName, startedAt, website])

  useEffect(() => {
    if (phase !== 'quiz') return undefined
    const timer = window.setInterval(() => setTimeLeft(value => Math.max(0, value - 1)), 1000)
    return () => window.clearInterval(timer)
  }, [phase])

  useEffect(() => {
    if (phase === 'quiz' && timeLeft === 0 && startedAt) submitExam()
  }, [phase, startedAt, submitExam, timeLeft])

  useEffect(() => {
    if (!feedbackOpen) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    feedbackCloseRef.current?.focus()
    const closeOnEscape = event => {
      if (event.key === 'Escape') setFeedbackOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [feedbackOpen])

  function startExam(event) {
    event.preventDefault()
    if (participantName.trim().length < 2) {
      setError(copy.nameError)
      return
    }
    if (!isValidContact(participantContact)) {
      setError(copy.contactError)
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

  async function submitFeedback(event) {
    event.preventDefault()
    if (Object.values(feedbackRatings).some(value => !value)) {
      setFeedbackError(copy.feedbackError)
      return
    }
    setFeedbackState('saving')
    setFeedbackError('')
    try {
      await readJson(await fetch(`/api/exams/${encodeURIComponent(code)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ attemptId, ratings: feedbackRatings, feedbackText }),
      }))
      setFeedbackState('saved')
    } catch (err) {
      setFeedbackError(err.message)
      setFeedbackState('idle')
    }
  }

  if (phase === 'loading') return <ExamFrame language="fa" dir="rtl"><div className={styles.centerCard}><span className={styles.loader} /><p>{copy.loading}</p></div></ExamFrame>
  if (phase === 'error') return <ExamFrame language={language} dir={copy.dir}><div className={styles.centerCard}><span className={styles.errorIcon}>!</span><h1>{copy.openFailed}</h1><p>{error}</p></div></ExamFrame>

  if (phase === 'intro') return (
    <ExamFrame language={language} dir={copy.dir}>
      <section className={styles.introCard}>
        <div className={styles.introTop}>
          <span className={styles.badge}>{copy.badge}</span>
          <h1>{exam.title}</h1>
          <p>{exam.description || copy.introFallback}</p>
        </div>
        <div className={styles.examFacts}>
          <div><span>{copy.questions}</span><strong>{questions.length.toLocaleString(copy.locale)}</strong></div>
          <div><span>{copy.time}</span><strong>{Number(exam.duration_minutes).toLocaleString(copy.locale)} {copy.minutes}</strong></div>
          <div><span>{language === 'en' ? 'Available until' : language === 'de' ? 'Verfügbar bis' : 'فعال تا'}</span><strong>{new Intl.DateTimeFormat(copy.locale, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(exam.closes_at))}</strong></div>
        </div>
        <form className={styles.identityForm} onSubmit={startExam}>
          <label><span>{copy.name}</span><input autoFocus required minLength={2} maxLength={120} value={participantName} onChange={event => setParticipantName(event.target.value)} autoComplete="name" placeholder={copy.namePlaceholder} /></label>
          <label><span>{copy.contact}</span><input type="text" required maxLength={254} value={participantContact} onChange={event => setParticipantContact(event.target.value)} autoComplete="email" placeholder={copy.contactPlaceholder} dir="ltr" /></label>
          <label className={styles.honeypot} aria-hidden="true"><span>Website</span><input tabIndex={-1} autoComplete="off" value={website} onChange={event => setWebsite(event.target.value)} /></label>
          {error ? <div className={styles.error} role="alert">{error}</div> : null}
          <button type="submit">{copy.start} <span aria-hidden="true">{copy.startArrow}</span></button>
          <small className={styles.notice}>{copy.notice}</small>
        </form>
      </section>
    </ExamFrame>
  )

  if (phase === 'submitting') return <ExamFrame language={language} dir={copy.dir}><div className={styles.centerCard}><span className={styles.loader} /><h1>{copy.submitting}</h1><p>{copy.dontClose}</p></div></ExamFrame>

  if (phase === 'result') {
    const reviewItems = result?.review || []
    const safeReviewIndex = Math.min(reviewIndex, Math.max(0, reviewItems.length - 1))
    const reviewItem = reviewItems[safeReviewIndex]
    const reviewAnswered = Number.isInteger(reviewItem?.selectedOptionIndex)
    const reviewCorrect = reviewAnswered && reviewItem.selectedOptionIndex === reviewItem.correctOptionIndex
    const standardQuestion = reviewItem ? asStandardQuestion(reviewItem) : null
    const selectedOptionId = reviewAnswered ? String.fromCharCode(65 + reviewItem.selectedOptionIndex) : null
    const correctExplanation = standardQuestion ? getCorrectAnswerExplanation(standardQuestion, language) : ''
    const wrongExplanation = standardQuestion ? getWrongAnswerExplanation(standardQuestion, selectedOptionId, language) : ''

    return (
      <ExamFrame language={language} dir={copy.dir}>
        <div className={styles.resultShell}>
          <section className={styles.resultCard}>
            <span className={styles.resultSuccess}>✓</span>
            <span className={styles.badge}>{copy.submitted}</span>
            <h1>{copy.thanks(participantName)}</h1>
            <p className={styles.personalMessage}>{copy.sentTo(organizerName)}</p>
            {result ? (
              <>
                <div className={styles.scoreCircle} style={{ '--score': `${result.percentage * 3.6}deg` }}><div><strong>{Number(result.percentage).toLocaleString(copy.locale)}%</strong><span>{result.score.toLocaleString(copy.locale)} {copy.of} {result.maxScore.toLocaleString(copy.locale)}</span></div></div>
                {result.rank && result.totalParticipants ? <div className={styles.rankCard}><span aria-hidden="true">🏆</span><strong>{copy.rank(Number(result.rank).toLocaleString(copy.locale), Number(result.totalParticipants).toLocaleString(copy.locale))}</strong></div> : null}
              </>
            ) : <p>{copy.resultSent}</p>}
            <div className={styles.resultActions}>
              {reviewItems.length ? <button type="button" onClick={() => { setReviewIndex(0); setReviewOpen(value => !value) }}>{reviewOpen ? copy.hideReview : copy.review}</button> : null}
              {attemptId ? (
                <button type="button" className={styles.feedbackButton} onClick={() => setFeedbackOpen(true)}>
                  <strong>{copy.feedback}</strong>
                  <span>{copy.feedbackCtaHint}</span>
                </button>
              ) : null}
            </div>
          </section>

          {reviewOpen && reviewItem ? (
            <section className={styles.reviewSection} aria-label={copy.review}>
              <div className={styles.resultSectionHeader}>
                <div><span>{copy.review}</span><small>{copy.questionOf(Number(safeReviewIndex + 1).toLocaleString(copy.locale), reviewItems.length.toLocaleString(copy.locale))}</small></div>
                <strong className={reviewCorrect ? styles.reviewStatusCorrect : reviewAnswered ? styles.reviewStatusWrong : styles.reviewStatusOpen}>{reviewCorrect ? copy.correct : reviewAnswered ? copy.incorrect : copy.unansweredReview}</strong>
              </div>

              <div className={styles.reviewNavigator} role="tablist" aria-label={copy.questionList}>
                {reviewItems.map((item, index) => {
                  const answered = Number.isInteger(item.selectedOptionIndex)
                  const correct = answered && item.selectedOptionIndex === item.correctOptionIndex
                  const dotClass = [styles.reviewDot, correct ? styles.reviewDotCorrect : answered ? styles.reviewDotWrong : styles.reviewDotOpen, index === safeReviewIndex ? styles.reviewDotActive : ''].filter(Boolean).join(' ')
                  return <button type="button" role="tab" aria-selected={index === safeReviewIndex} className={dotClass} onClick={() => setReviewIndex(index)} key={item.id}>{Number(index + 1).toLocaleString(copy.locale)}</button>
                })}
              </div>

              <article className={styles.reviewQuestion} key={reviewItem.id}>
                <div className={styles.reviewQuestionHeader}><span>{Number(safeReviewIndex + 1).toLocaleString(copy.locale)}</span><h2>{reviewItem.prompt}</h2></div>
                <div className={styles.reviewOptions}>
                  {reviewItem.options.map((option, optionIndex) => {
                    const isCorrect = optionIndex === reviewItem.correctOptionIndex
                    const isSelected = optionIndex === reviewItem.selectedOptionIndex
                    const optionClass = [styles.reviewOption, isCorrect ? styles.reviewOptionCorrect : '', isSelected && !isCorrect ? styles.reviewOptionWrong : ''].filter(Boolean).join(' ')
                    return <div className={optionClass} key={optionIndex}><b>{String.fromCharCode(65 + optionIndex)}</b><span>{option}</span>{isCorrect ? <i>✓ {copy.correctAnswer}</i> : null}{isSelected && !isCorrect ? <i>× {copy.yourAnswer}</i> : null}</div>
                  })}
                </div>

                <div className={`${styles.standardExplanation} ${reviewCorrect ? styles.standardExplanationCorrect : styles.standardExplanationWrong}`}>
                  <div className={styles.explanationVerdict}><span aria-hidden="true">{reviewCorrect ? '✓' : '×'}</span><strong>{reviewCorrect ? copy.correct : reviewAnswered ? copy.incorrect : copy.unansweredReview}</strong></div>
                  {!reviewCorrect ? <div className={styles.correctAnswerRow}><span>{copy.correctAnswer}</span><strong>{String.fromCharCode(65 + reviewItem.correctOptionIndex)}) {reviewItem.options[reviewItem.correctOptionIndex]}</strong></div> : null}
                  {reviewItem.explanation ? <div className={styles.explanationBody}><strong>{copy.explanation}</strong><p>{reviewCorrect ? correctExplanation : reviewItem.explanation}</p></div> : null}
                  {!reviewCorrect && reviewAnswered && wrongExplanation ? <div className={styles.wrongExplanation}><strong>{copy.whyWrong}</strong><p>{wrongExplanation}</p></div> : null}
                </div>
              </article>

              <div className={styles.reviewControls}>
                <button type="button" disabled={safeReviewIndex === 0} onClick={() => setReviewIndex(index => Math.max(0, index - 1))}><ChevronIcon direction="previous" />{copy.previous}</button>
                <span>{Number(safeReviewIndex + 1).toLocaleString(copy.locale)} / {reviewItems.length.toLocaleString(copy.locale)}</span>
                <button type="button" disabled={safeReviewIndex === reviewItems.length - 1} onClick={() => setReviewIndex(index => Math.min(reviewItems.length - 1, index + 1))}>{copy.next}<ChevronIcon /></button>
              </div>
            </section>
          ) : null}
        </div>

        {feedbackOpen && attemptId ? (
          <div className={styles.modalBackdrop} onMouseDown={event => { if (event.target === event.currentTarget) setFeedbackOpen(false) }}>
            <section className={styles.feedbackModal} role="dialog" aria-modal="true" aria-labelledby="feedback-dialog-title">
              <div className={styles.feedbackModalHeader}>
                <div><h2 id="feedback-dialog-title">{copy.feedbackTitle}</h2><p>{copy.feedbackHint}</p></div>
                <button ref={feedbackCloseRef} type="button" className={styles.modalClose} onClick={() => setFeedbackOpen(false)} aria-label={copy.hideFeedback}><CloseIcon /></button>
              </div>
              {feedbackState === 'saved' ? (
                <div className={styles.feedbackSuccess}><span aria-hidden="true">✓</span><strong>{copy.feedbackSaved}</strong><button type="button" onClick={() => setFeedbackOpen(false)}>{copy.hideFeedback}</button></div>
              ) : (
                <form className={styles.feedbackForm} onSubmit={submitFeedback}>
                  <RatingScale label={copy.questionQuality} name="question-quality" value={feedbackRatings.questions} labels={copy.ratingLabels} locale={copy.locale} onChange={value => setFeedbackRatings(currentRatings => ({ ...currentRatings, questions: value }))} />
                  <RatingScale label={copy.designQuality} name="design-quality" value={feedbackRatings.design} labels={copy.ratingLabels} locale={copy.locale} onChange={value => setFeedbackRatings(currentRatings => ({ ...currentRatings, design: value }))} />
                  <RatingScale label={copy.clipQuality} name="clip-quality" value={feedbackRatings.clip} labels={copy.ratingLabels} locale={copy.locale} onChange={value => setFeedbackRatings(currentRatings => ({ ...currentRatings, clip: value }))} />
                  <label className={styles.feedbackMessage}><strong>{copy.feedbackMessageTitle}</strong><span>{copy.feedbackMessageHint}</span><textarea maxLength={1600} value={feedbackText} onChange={event => setFeedbackText(event.target.value)} placeholder={copy.feedbackPlaceholder} /></label>
                  {feedbackError ? <div className={styles.error} role="alert">{feedbackError}</div> : null}
                  <button className={styles.feedbackSubmit} type="submit" disabled={feedbackState === 'saving'}>{feedbackState === 'saving' ? copy.sendingFeedback : copy.sendFeedback}</button>
                </form>
              )}
            </section>
          </div>
        ) : null}
      </ExamFrame>
    )
  }

  return (
    <ExamFrame language={language} dir={copy.dir}>
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
    </ExamFrame>
  )
}
