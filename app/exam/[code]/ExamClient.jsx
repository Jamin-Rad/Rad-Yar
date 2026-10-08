'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { useTheme } from '@/providers/ThemeProvider'
import RadYarIcon from '@/components/RadYarIcon'
import MedicalSequenceViewer from '@/components/MedicalSequenceViewer'
import { getCorrectAnswerExplanation, getWrongAnswerExplanation } from '@/utils/answerFeedback'
import styles from './page.module.css'

const EXAM_COPY = Object.freeze({
  fa: {
    locale: 'fa-IR', dir: 'rtl', loading: 'در حال آماده‌سازی امتحان…', openFailed: 'امتحان باز نشد', badge: 'امتحان آنلاین', introFallback: 'پیش از شروع، اطلاعات خود را وارد کنید.', questions: 'تعداد سؤال', questionUnit: 'سؤال', time: 'زمان', minutes: 'دقیقه', name: 'نام و نام خانوادگی *', namePlaceholder: 'نام شما', contact: 'ایمیل یا آیدی اینستاگرام *', contactPlaceholder: '@username یا name@example.com', start: 'شروع امتحان', startArrow: '←', notice: 'با شروع امتحان، زمان‌سنج فعال می‌شود. پاسخ‌ها در پایان به‌صورت خودکار ارسال خواهند شد.', nameError: 'لطفاً نام و نام خانوادگی خود را وارد کنید.', contactError: 'لطفاً یک ایمیل معتبر یا آیدی اینستاگرام وارد کنید.', submitting: 'در حال ثبت پاسخ‌ها', dontClose: 'این صفحه را نبندید.', submitted: 'آزمون با موفقیت ثبت شد', thanks: name => `${name} جان، ممنون!`, sentTo: organizer => `نتیجه امتحانت برای ${organizer} ارسال شد.`, resultSent: 'نتیجه برای برگزارکننده ارسال شد.', rank: (rank, total) => `رتبه فعلی: ${rank} از ${total} نفر`, review: 'مرور پاسخ‌ها', hideReview: 'بستن مرور پاسخ‌ها', correct: 'درست!', incorrect: 'این یکی نیاز به مرور دارد', whyWrong: 'چرا این گزینه درست نیست؟', feedback: 'نظر بده', feedbackCtaHint: 'نظر شما آزمون‌های بعدی را بهتر می‌کند', hideFeedback: 'بستن فرم نظر', correctAnswer: 'پاسخ صحیح', yourAnswer: 'پاسخ شما', unansweredReview: 'بدون پاسخ', explanation: 'توضیح پاسخ', feedbackTitle: 'یک قدم کوچیک تا دیدن نتیجه', feedbackHint: name => `${name} جان، آزمونت ثبت شد. فقط نظرت رو بگو تا نتیجه و رتبه‌ات رو ببینی.`, feedbackProgress: 'مرحله آخر: نظر شما', feedbackSafe: 'پاسخ‌هایت ثبت شده و از بین نمی‌روند.', questionQuality: 'کیفیت سؤال‌ها چطور بود؟', designQuality: 'تجربه و طراحی آزمون چطور بود؟', clipQuality: 'کیفیت کلیپ آموزشی مرتبط چطور بود؟', feedbackMessageTitle: 'اگر حرفی با ما داری، خوشحال می‌شیم بشنویم', feedbackMessageHint: 'این بخش اختیاری است؛ پیشنهاد، انتقاد یا هر نکته‌ای که دوست داری بگو.', feedbackPlaceholder: 'پیامت را اینجا بنویس…', sendFeedback: 'ثبت نظر و دیدن نتیجه', sendingFeedback: 'در حال ثبت نظر…', feedbackSaved: 'نظر شما ثبت شد. از همراهی‌تان ممنونیم!', feedbackError: 'برای دیدن نتیجه، لطفاً به هر سه بخش امتیاز بده.', feedbackRequired: 'لازم برای دیدن نتیجه', ratingLabels: ['خیلی ضعیف', 'ضعیف', 'متوسط', 'خوب', 'عالی'], exam: 'امتحان', remaining: 'زمان باقی‌مانده', answered: (done, total) => `${done} از ${total} پاسخ داده شده`, questionOf: (current, total) => `سؤال ${current} از ${total}`, previous: 'سؤال قبلی', next: 'سؤال بعدی', submit: 'پایان و ارسال پاسخ‌ها', questionList: 'فهرست سؤال‌ها', answeredLegend: 'پاسخ داده‌شده', unansweredLegend: 'بدون پاسخ', finish: 'پایان امتحان', of: 'از', nextStep: 'قدم بعدی تو', reviewHint: 'با مرور جواب‌ها، هم نقطه‌قوت‌هایت را می‌بینی و هم جاهایی را که می‌توانی بهتر شوی.', backHome: 'بازگشت به رادیار', feedbackThanks: 'ممنون که نظرت را با ما در میان گذاشتی.',
  },
  en: {
    locale: 'en-US', dir: 'ltr', loading: 'Preparing the exam…', openFailed: 'The exam could not be opened', badge: 'Online exam', introFallback: 'Enter your details before starting.', questions: 'Questions', questionUnit: 'questions', time: 'Time', minutes: 'minutes', name: 'Full name *', namePlaceholder: 'Your name', contact: 'Email or Instagram ID *', contactPlaceholder: '@username or name@example.com', start: 'Start exam', startArrow: '→', notice: 'The timer starts when you begin. Your answers are submitted automatically when time runs out.', nameError: 'Please enter your full name.', contactError: 'Please enter a valid email address or Instagram ID.', submitting: 'Submitting answers', dontClose: 'Please do not close this page.', submitted: 'Exam submitted successfully', thanks: name => `Thanks, ${name}!`, sentTo: organizer => `Your exam result was sent to ${organizer}.`, resultSent: 'Your result was sent to the organizer.', rank: (rank, total) => `Current rank: ${rank} of ${total}`, review: 'Review answers', hideReview: 'Close answer review', correct: 'Correct!', incorrect: 'This one is worth another look', whyWrong: 'Why is this option not correct?', feedback: 'Leave feedback', feedbackCtaHint: 'Your feedback makes the next exam better', hideFeedback: 'Close feedback form', correctAnswer: 'Correct answer', yourAnswer: 'Your answer', unansweredReview: 'Not answered', explanation: 'Explanation', feedbackTitle: 'One small step before your result', feedbackHint: name => `${name}, your exam is safely submitted. Share your feedback to see your result and current rank.`, feedbackProgress: 'Final step: your feedback', feedbackSafe: 'Your answers are safely saved and will not be lost.', questionQuality: 'How was the quality of the questions?', designQuality: 'How was the exam design and experience?', clipQuality: 'How was the related educational video?', feedbackMessageTitle: 'If you have anything to tell us, we would love to hear it', feedbackMessageHint: 'Optional—share a suggestion, criticism, or anything we should know.', feedbackPlaceholder: 'Write your message…', sendFeedback: 'Submit feedback and see result', sendingFeedback: 'Saving feedback…', feedbackSaved: 'Thank you—your feedback was saved!', feedbackError: 'Please rate all three areas to see your result.', feedbackRequired: 'Required to see your result', ratingLabels: ['Very poor', 'Poor', 'Average', 'Good', 'Excellent'], exam: 'Exam', remaining: 'Time remaining', answered: (done, total) => `${done} of ${total} answered`, questionOf: (current, total) => `Question ${current} of ${total}`, previous: 'Previous question', next: 'Next question', submit: 'Finish and submit', questionList: 'Question list', answeredLegend: 'Answered', unansweredLegend: 'Unanswered', finish: 'Finish exam', of: 'of', nextStep: 'Your next step', reviewHint: 'Review your answers to see what you already know well and where a quick recap will help.', backHome: 'Back to RadYar', feedbackThanks: 'Thanks for sharing your feedback with us.',
  },
  de: {
    locale: 'de-DE', dir: 'ltr', loading: 'Prüfung wird vorbereitet…', openFailed: 'Die Prüfung konnte nicht geöffnet werden', badge: 'Online-Prüfung', introFallback: 'Bitte geben Sie vor dem Start Ihre Daten ein.', questions: 'Fragen', questionUnit: 'Fragen', time: 'Zeit', minutes: 'Minuten', name: 'Vor- und Nachname *', namePlaceholder: 'Ihr Name', contact: 'E-Mail oder Instagram-ID *', contactPlaceholder: '@username oder name@example.com', start: 'Prüfung starten', startArrow: '→', notice: 'Der Timer startet mit der Prüfung. Nach Ablauf der Zeit werden Ihre Antworten automatisch gesendet.', nameError: 'Bitte geben Sie Ihren vollständigen Namen ein.', contactError: 'Bitte geben Sie eine gültige E-Mail-Adresse oder Instagram-ID ein.', submitting: 'Antworten werden gesendet', dontClose: 'Bitte schließen Sie diese Seite nicht.', submitted: 'Prüfung erfolgreich abgegeben', thanks: name => `Danke, ${name}!`, sentTo: organizer => `Dein Prüfungsergebnis wurde an ${organizer} gesendet.`, resultSent: 'Ihr Ergebnis wurde an die Prüfungsleitung gesendet.', rank: (rank, total) => `Aktueller Rang: ${rank} von ${total}`, review: 'Antworten ansehen', hideReview: 'Antwortübersicht schließen', correct: 'Richtig!', incorrect: 'Diese Frage lohnt einen zweiten Blick', whyWrong: 'Warum ist diese Antwort nicht richtig?', feedback: 'Feedback geben', feedbackCtaHint: 'Ihr Feedback macht die nächsten Prüfungen besser', hideFeedback: 'Bewertung schließen', correctAnswer: 'Richtige Antwort', yourAnswer: 'Ihre Antwort', unansweredReview: 'Nicht beantwortet', explanation: 'Erklärung', feedbackTitle: 'Nur noch ein kleiner Schritt zum Ergebnis', feedbackHint: name => `${name}, deine Prüfung ist sicher gespeichert. Teile kurz dein Feedback, um Ergebnis und Rang zu sehen.`, feedbackProgress: 'Letzter Schritt: dein Feedback', feedbackSafe: 'Deine Antworten sind sicher gespeichert und gehen nicht verloren.', questionQuality: 'Wie war die Qualität der Fragen?', designQuality: 'Wie waren Gestaltung und Prüfungserlebnis?', clipQuality: 'Wie war das zugehörige Lernvideo?', feedbackMessageTitle: 'Wenn du uns noch etwas sagen möchtest, freuen wir uns darauf', feedbackMessageHint: 'Optional—teile eine Anregung, Kritik oder einen Hinweis mit uns.', feedbackPlaceholder: 'Deine Nachricht…', sendFeedback: 'Feedback senden und Ergebnis sehen', sendingFeedback: 'Feedback wird gespeichert…', feedbackSaved: 'Vielen Dank! Ihr Feedback wurde gespeichert.', feedbackError: 'Bitte bewerte alle drei Bereiche, um dein Ergebnis zu sehen.', feedbackRequired: 'Erforderlich für das Ergebnis', ratingLabels: ['Sehr schlecht', 'Schlecht', 'Mittel', 'Gut', 'Sehr gut'], exam: 'Prüfung', remaining: 'Verbleibende Zeit', answered: (done, total) => `${done} von ${total} beantwortet`, questionOf: (current, total) => `Frage ${current} von ${total}`, previous: 'Vorherige Frage', next: 'Nächste Frage', submit: 'Beenden und senden', questionList: 'Fragenübersicht', answeredLegend: 'Beantwortet', unansweredLegend: 'Nicht beantwortet', finish: 'Prüfung beenden', of: 'von', nextStep: 'Dein nächster Schritt', reviewHint: 'Sieh dir deine Antworten an und entdecke, was schon sicher sitzt und wo eine kurze Wiederholung hilft.', backHome: 'Zurück zu RadYar', feedbackThanks: 'Danke, dass du dein Feedback mit uns geteilt hast.',
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

function RatingScale({ label, name, value, labels, locale, onChange }) {
  const faces = ['⌢', '︵', '—', '◡', '●']
  return (
    <div className={styles.ratingFieldset} role="radiogroup" aria-label={`${label} *`}>
      <div className={styles.ratingLegend}>{label}<small>*</small></div>
      <div className={styles.ratingOptions}>
        {labels.map((ratingLabel, index) => {
          const ratingValue = index + 1
          const selected = value === ratingValue
          return (
            <label className={selected ? styles.ratingSelected : styles.ratingOption} key={ratingLabel}>
              <input type="radio" name={name} value={ratingValue} checked={selected} onChange={() => onChange(ratingValue)} />
              <span aria-hidden="true">{faces[index]}</span>
              <strong>{ratingLabel}</strong>
            </label>
          )
        })}
      </div>
    </div>
  )
}

function getResultConversation(percentage, name, language) {
  const firstName = (name || '').trim().split(/\s+/)[0] || ({ fa: 'دوست خوبم', en: 'there', de: 'du' }[language] || 'دوست خوبم')
  const bands = {
    fa: [
      { min: 90, tone: 'excellent', title: `${firstName} جان، فوق‌العاده بود!`, message: 'تقریباً همه‌چیز را دقیق و مطمئن جواب دادی. این نتیجه واقعاً نشان می‌دهد روی مطالب مسلطی.' },
      { min: 75, tone: 'strong', title: `${firstName} جان، عالی بود! واقعاً خوب از پسش برآمدی.`, message: 'بیشتر سؤال‌ها را با اطمینان جواب دادی؛ با مرور چند نکته، نتیجه‌ات حتی بهتر هم می‌شود.' },
      { min: 50, tone: 'growing', title: `${firstName} جان، مسیرت خوبه؛ بیا یک قدم جلوتر بریم.`, message: 'پایه‌ها را بلدی و بخش مهمی از راه را آمده‌ای. مرور جواب‌ها دقیقاً نشان می‌دهد کجاها با کمی تمرین جهش می‌کنی.' },
      { min: 0, tone: 'practice', title: `${firstName} جان، این فقط یک نقطه شروعه.`, message: 'این نتیجه قرار نیست قضاوتت کند؛ آمده تا مسیر مرور را روشن کند. جواب‌ها را با هم ببینیم و از همین‌جا بهتر شویم.' },
    ],
    en: [
      { min: 90, tone: 'excellent', title: `${firstName}, that was outstanding!`, message: 'You answered almost everything with confidence and precision. This result shows real command of the material.' },
      { min: 75, tone: 'strong', title: `${firstName}, great work—you handled that really well.`, message: 'You were confident on most questions. Review a few key points and your next result can be even stronger.' },
      { min: 50, tone: 'growing', title: `${firstName}, you are on the right track.`, message: 'The foundations are there. Reviewing your answers will show exactly where a little practice can make a big difference.' },
      { min: 0, tone: 'practice', title: `${firstName}, this is simply a starting point.`, message: 'This result is not a judgment—it is a map. Let’s review the answers and turn today’s gaps into your next strengths.' },
    ],
    de: [
      { min: 90, tone: 'excellent', title: `${firstName}, das war hervorragend!`, message: 'Du hast fast alles sicher und präzise beantwortet. Dieses Ergebnis zeigt echte Souveränität im Stoff.' },
      { min: 75, tone: 'strong', title: `${firstName}, richtig stark gemacht!`, message: 'Die meisten Fragen hast du sicher beantwortet. Mit ein paar gezielten Wiederholungen wird dein nächstes Ergebnis noch besser.' },
      { min: 50, tone: 'growing', title: `${firstName}, du bist auf einem guten Weg.`, message: 'Die Grundlagen sitzen. In der Antwortübersicht siehst du genau, wo ein wenig Übung den größten Unterschied macht.' },
      { min: 0, tone: 'practice', title: `${firstName}, das ist einfach dein Ausgangspunkt.`, message: 'Dieses Ergebnis bewertet dich nicht – es zeigt dir den Weg. Schauen wir die Antworten an und machen aus Lücken neue Stärken.' },
    ],
  }
  return (bands[language] || bands.fa).find(band => percentage >= band.min)
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
  const [feedbackRatings, setFeedbackRatings] = useState({ questions: null, design: null, clip: null })
  const [feedbackText, setFeedbackText] = useState('')
  const [feedbackState, setFeedbackState] = useState('idle')
  const [feedbackError, setFeedbackError] = useState('')
  const submittingRef = useRef(false)
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
      setPhase('feedback')
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
    if (phase === 'feedback' || phase === 'result') window.scrollTo(0, 0)
  }, [phase])

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
      const data = await readJson(await fetch(`/api/exams/${encodeURIComponent(code)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ attemptId, ratings: feedbackRatings, feedbackText }),
      }))
      setResult(data.result)
      setFeedbackState('saved')
      setPhase('result')
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

  if (phase === 'feedback') {
    const ratingsComplete = Object.values(feedbackRatings).every(value => Number.isInteger(value))
    return (
      <ExamFrame language={language} dir={copy.dir}>
        <section className={styles.feedbackGate} aria-labelledby="feedback-title">
          <div className={styles.feedbackSteps} aria-label={copy.feedbackProgress}>
            <span className={styles.feedbackStepDone}><b>✓</b><small>{language === 'fa' ? 'شرکت در آزمون' : language === 'de' ? 'Prüfung' : 'Exam'}</small></span>
            <i />
            <span className={styles.feedbackStepDone}><b>✓</b><small>{language === 'fa' ? 'ثبت پاسخ‌ها' : language === 'de' ? 'Abgabe' : 'Submitted'}</small></span>
            <i />
            <span className={styles.feedbackStepCurrent}><b>3</b><small>{copy.feedbackProgress}</small></span>
          </div>

          <header className={styles.feedbackGateHeader}>
            <span className={styles.feedbackHeart} aria-hidden="true">♥</span>
            <h1 id="feedback-title">{copy.feedbackTitle}</h1>
            <p>{copy.feedbackHint(participantName)}</p>
          </header>

          <form className={styles.feedbackGateForm} onSubmit={submitFeedback}>
            <div className={styles.feedbackRequiredNote}><span aria-hidden="true">●</span>{copy.feedbackRequired}</div>
            <RatingScale label={copy.questionQuality} name="question-quality" value={feedbackRatings.questions} labels={copy.ratingLabels} locale={copy.locale} onChange={value => setFeedbackRatings(currentRatings => ({ ...currentRatings, questions: value }))} />
            <RatingScale label={copy.designQuality} name="design-quality" value={feedbackRatings.design} labels={copy.ratingLabels} locale={copy.locale} onChange={value => setFeedbackRatings(currentRatings => ({ ...currentRatings, design: value }))} />
            <RatingScale label={copy.clipQuality} name="clip-quality" value={feedbackRatings.clip} labels={copy.ratingLabels} locale={copy.locale} onChange={value => setFeedbackRatings(currentRatings => ({ ...currentRatings, clip: value }))} />

            <label className={styles.feedbackMessageGate}>
              <span><strong>{copy.feedbackMessageTitle}</strong><small>{copy.feedbackMessageHint}</small></span>
              <textarea maxLength={1600} value={feedbackText} onChange={event => setFeedbackText(event.target.value)} placeholder={copy.feedbackPlaceholder} />
            </label>

            {feedbackError ? <div className={styles.error} role="alert">{feedbackError}</div> : null}
            <button className={styles.feedbackGateSubmit} type="submit" disabled={!ratingsComplete || feedbackState === 'saving'}>
              {feedbackState === 'saving' ? copy.sendingFeedback : copy.sendFeedback}
              <ChevronIcon />
            </button>
            <p className={styles.feedbackSafe}><span aria-hidden="true">✓</span>{copy.feedbackSafe}</p>
          </form>
        </section>
      </ExamFrame>
    )
  }

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
    const conversation = result
      ? getResultConversation(Number(result.percentage), participantName, language)
      : { tone: 'strong', title: copy.thanks(participantName), message: copy.resultSent }

    return (
      <ExamFrame language={language} dir={copy.dir}>
        <div className={styles.resultShell}>
          <section className={`${styles.resultCard} ${styles[`resultTone_${conversation.tone}`]}`}>
            <div className={styles.resultConversation}>
              <span className={styles.resultConfirmed}><b>✓</b>{copy.submitted}</span>
              <h1>{conversation.title}</h1>
              <p>{conversation.message}</p>
              <div className={styles.deliveryMessage}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m21 3-7.7 18-3.7-7.6L2 9.7 21 3Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/><path d="M9.6 13.4 21 3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>
                <strong>{copy.sentTo(organizerName)}</strong>
              </div>
              <p className={styles.feedbackThanks}><span aria-hidden="true">♥</span>{copy.feedbackThanks}</p>
            </div>

            {result ? (
              <div className={styles.resultScoreArea}>
                <div className={styles.scoreCircle} style={{ '--score': `${result.percentage * 3.6}deg` }}><div><strong>{Number(result.percentage).toLocaleString(copy.locale)}%</strong><span>{language === 'fa' ? 'درصد موفقیت' : language === 'de' ? 'Ergebnis' : 'Score'}</span></div></div>
                <div className={styles.resultStats}>
                  <div><span>{language === 'fa' ? 'نمره خام' : language === 'de' ? 'Punkte' : 'Raw score'}</span><strong>{result.score.toLocaleString(copy.locale)} {copy.of} {result.maxScore.toLocaleString(copy.locale)}</strong></div>
                  {result.rank && result.totalParticipants ? <div><span>{language === 'fa' ? 'رتبه تا این لحظه' : language === 'de' ? 'Aktueller Rang' : 'Current rank'}</span><strong>{copy.rank(Number(result.rank).toLocaleString(copy.locale), Number(result.totalParticipants).toLocaleString(copy.locale))}</strong></div> : null}
                </div>
            </div>
            ) : null}
          </section>

          <section className={styles.resultNextStep}>
            <div><h2>{copy.nextStep}</h2><p>{copy.reviewHint}</p></div>
            <div className={styles.resultNextActions}>
              {reviewItems.length ? <button type="button" onClick={() => { setReviewIndex(0); setReviewOpen(value => !value) }}>{reviewOpen ? copy.hideReview : copy.review}<ChevronIcon /></button> : null}
              <Link href="/?lang=de">{copy.backHome}</Link>
            </div>
            {reviewItems.length ? (
              <div className={styles.resultReviewPreview}>
                <span>{copy.questionList}</span>
                <div>{reviewItems.slice(0, 12).map((item, index) => {
                  const answered = Number.isInteger(item.selectedOptionIndex)
                  const correct = answered && item.selectedOptionIndex === item.correctOptionIndex
                  return <i className={correct ? styles.previewCorrect : answered ? styles.previewWrong : styles.previewOpen} key={item.id}>{Number(index + 1).toLocaleString(copy.locale)}</i>
                })}</div>
              </div>
            ) : null}
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
                {reviewItem.media ? <div className={styles.questionMedia}><MedicalSequenceViewer media={reviewItem.media} language={language} compact /></div> : null}
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
            {question.media ? <div className={styles.questionMedia}><MedicalSequenceViewer media={question.media} language={language} compact priority /></div> : null}
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
