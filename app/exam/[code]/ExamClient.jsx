'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import styles from './page.module.css'

const EXAM_COPY = Object.freeze({
  fa: {
    locale: 'fa-IR', dir: 'rtl', loading: 'در حال آماده‌سازی امتحان…', openFailed: 'امتحان باز نشد', badge: 'امتحان آنلاین', introFallback: 'پیش از شروع، اطلاعات خود را وارد کنید.', questions: 'تعداد سؤال', questionUnit: 'سؤال', time: 'زمان', minutes: 'دقیقه', name: 'نام و نام خانوادگی *', namePlaceholder: 'نام شما', contact: 'ایمیل یا آیدی اینستاگرام *', contactPlaceholder: '@username یا name@example.com', start: 'شروع امتحان', startArrow: '←', notice: 'با شروع امتحان، زمان‌سنج فعال می‌شود. پاسخ‌ها در پایان به‌صورت خودکار ارسال خواهند شد.', nameError: 'لطفاً نام و نام خانوادگی خود را وارد کنید.', contactError: 'لطفاً یک ایمیل معتبر یا آیدی اینستاگرام وارد کنید.', submitting: 'در حال ثبت پاسخ‌ها', dontClose: 'این صفحه را نبندید.', submitted: 'پاسخ‌ها ثبت شد', thanks: name => `${name}، ممنون!`, sentTo: organizer => `نتیجه امتحان شما به ${organizer} ارسال شد.`, resultSent: 'نتیجه برای برگزارکننده ارسال شد.', rank: (rank, total) => `رتبه فعلی شما: ${rank} از ${total}`, review: 'مرور و کنترل سؤال‌ها', hideReview: 'بستن مرور سؤال‌ها', feedback: 'ثبت نظر درباره آزمون', hideFeedback: 'بستن فرم نظر', correctAnswer: 'پاسخ صحیح', yourAnswer: 'پاسخ شما', unansweredReview: 'بدون پاسخ', explanation: 'توضیح پاسخ', feedbackTitle: 'نظر شما درباره این آزمون', feedbackHint: 'یک گزینه را انتخاب کنید و در صورت تمایل توضیح بیشتری بنویسید.', feedbackPlaceholder: 'نظر تشریحی شما…', sendFeedback: 'ارسال نظر', sendingFeedback: 'در حال ارسال…', feedbackSaved: 'نظر شما ثبت شد. ممنون!', feedbackError: 'برای ثبت نظر یک گزینه را انتخاب کنید.', ratingLabels: ['خیلی ضعیف', 'ضعیف', 'متوسط', 'خوب', 'عالی'], exam: 'امتحان', remaining: 'زمان باقی‌مانده', answered: (done, total) => `${done} از ${total} پاسخ داده شده`, questionOf: (current, total) => `سؤال ${current} از ${total}`, previous: 'سؤال قبلی', next: 'سؤال بعدی', submit: 'پایان و ارسال پاسخ‌ها', questionList: 'فهرست سؤال‌ها', answeredLegend: 'پاسخ داده‌شده', unansweredLegend: 'بدون پاسخ', finish: 'پایان امتحان', of: 'از',
  },
  en: {
    locale: 'en-US', dir: 'ltr', loading: 'Preparing the exam…', openFailed: 'The exam could not be opened', badge: 'Online exam', introFallback: 'Enter your details before starting.', questions: 'Questions', questionUnit: 'questions', time: 'Time', minutes: 'minutes', name: 'Full name *', namePlaceholder: 'Your name', contact: 'Email or Instagram ID *', contactPlaceholder: '@username or name@example.com', start: 'Start exam', startArrow: '→', notice: 'The timer starts when you begin. Your answers are submitted automatically when time runs out.', nameError: 'Please enter your full name.', contactError: 'Please enter a valid email address or Instagram ID.', submitting: 'Submitting answers', dontClose: 'Please do not close this page.', submitted: 'Answers submitted', thanks: name => `Thank you, ${name}!`, sentTo: organizer => `Your exam result was sent to ${organizer}.`, resultSent: 'Your result was sent to the organizer.', rank: (rank, total) => `Your current rank: ${rank} of ${total}`, review: 'Review questions', hideReview: 'Close question review', feedback: 'Leave exam feedback', hideFeedback: 'Close feedback form', correctAnswer: 'Correct answer', yourAnswer: 'Your answer', unansweredReview: 'Not answered', explanation: 'Explanation', feedbackTitle: 'Your feedback on this exam', feedbackHint: 'Choose an option and add a written comment if you wish.', feedbackPlaceholder: 'Your written feedback…', sendFeedback: 'Send feedback', sendingFeedback: 'Sending…', feedbackSaved: 'Thank you—your feedback was saved.', feedbackError: 'Please select an option before submitting.', ratingLabels: ['Very poor', 'Poor', 'Average', 'Good', 'Excellent'], exam: 'Exam', remaining: 'Time remaining', answered: (done, total) => `${done} of ${total} answered`, questionOf: (current, total) => `Question ${current} of ${total}`, previous: 'Previous question', next: 'Next question', submit: 'Finish and submit', questionList: 'Question list', answeredLegend: 'Answered', unansweredLegend: 'Unanswered', finish: 'Finish exam', of: 'of',
  },
  de: {
    locale: 'de-DE', dir: 'ltr', loading: 'Prüfung wird vorbereitet…', openFailed: 'Die Prüfung konnte nicht geöffnet werden', badge: 'Online-Prüfung', introFallback: 'Bitte geben Sie vor dem Start Ihre Daten ein.', questions: 'Fragen', questionUnit: 'Fragen', time: 'Zeit', minutes: 'Minuten', name: 'Vor- und Nachname *', namePlaceholder: 'Ihr Name', contact: 'E-Mail oder Instagram-ID *', contactPlaceholder: '@username oder name@example.com', start: 'Prüfung starten', startArrow: '→', notice: 'Der Timer startet mit der Prüfung. Nach Ablauf der Zeit werden Ihre Antworten automatisch gesendet.', nameError: 'Bitte geben Sie Ihren vollständigen Namen ein.', contactError: 'Bitte geben Sie eine gültige E-Mail-Adresse oder Instagram-ID ein.', submitting: 'Antworten werden gesendet', dontClose: 'Bitte schließen Sie diese Seite nicht.', submitted: 'Antworten gesendet', thanks: name => `Vielen Dank, ${name}!`, sentTo: organizer => `Ihr Prüfungsergebnis wurde an ${organizer} gesendet.`, resultSent: 'Ihr Ergebnis wurde an die Prüfungsleitung gesendet.', rank: (rank, total) => `Ihr aktueller Rang: ${rank} von ${total}`, review: 'Fragen kontrollieren', hideReview: 'Fragenkontrolle schließen', feedback: 'Prüfung bewerten', hideFeedback: 'Bewertung schließen', correctAnswer: 'Richtige Antwort', yourAnswer: 'Ihre Antwort', unansweredReview: 'Nicht beantwortet', explanation: 'Erklärung', feedbackTitle: 'Ihre Meinung zu dieser Prüfung', feedbackHint: 'Wählen Sie eine Option und ergänzen Sie bei Bedarf einen freien Text.', feedbackPlaceholder: 'Ihr schriftliches Feedback…', sendFeedback: 'Feedback senden', sendingFeedback: 'Wird gesendet…', feedbackSaved: 'Vielen Dank! Ihr Feedback wurde gespeichert.', feedbackError: 'Bitte wählen Sie vor dem Senden eine Option.', ratingLabels: ['Sehr schlecht', 'Schlecht', 'Mittel', 'Gut', 'Sehr gut'], exam: 'Prüfung', remaining: 'Verbleibende Zeit', answered: (done, total) => `${done} von ${total} beantwortet`, questionOf: (current, total) => `Frage ${current} von ${total}`, previous: 'Vorherige Frage', next: 'Nächste Frage', submit: 'Beenden und senden', questionList: 'Fragenübersicht', answeredLegend: 'Beantwortet', unansweredLegend: 'Nicht beantwortet', finish: 'Prüfung beenden', of: 'von',
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
  const [feedbackOpen, setFeedbackOpen] = useState(false)
  const [feedbackRating, setFeedbackRating] = useState(null)
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
    if (!feedbackRating) {
      setFeedbackError(copy.feedbackError)
      return
    }
    setFeedbackState('saving')
    setFeedbackError('')
    try {
      await readJson(await fetch(`/api/exams/${encodeURIComponent(code)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ attemptId, rating: feedbackRating, feedbackText }),
      }))
      setFeedbackState('saved')
    } catch (err) {
      setFeedbackError(err.message)
      setFeedbackState('idle')
    }
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
    </main>
  )

  if (phase === 'submitting') return <main className={styles.page} dir={copy.dir}><div className={styles.centerCard}><span className={styles.loader} /><h1>{copy.submitting}</h1><p>{copy.dontClose}</p></div></main>

  if (phase === 'result') return (
    <main className={styles.page} dir={copy.dir} lang={language}>
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
            {result?.review?.length ? <button type="button" onClick={() => setReviewOpen(value => !value)}>{reviewOpen ? copy.hideReview : copy.review}</button> : null}
            {attemptId ? <button type="button" className={styles.feedbackButton} onClick={() => setFeedbackOpen(value => !value)}>{feedbackOpen ? copy.hideFeedback : copy.feedback}</button> : null}
          </div>
        </section>

        {reviewOpen && result?.review?.length ? (
          <section className={styles.reviewSection}>
            <div className={styles.resultSectionHeader}><span>{copy.review}</span><strong>{result.review.length.toLocaleString(copy.locale)} {copy.questionUnit}</strong></div>
            <div className={styles.reviewList}>
              {result.review.map((item, questionIndex) => (
                <article className={styles.reviewQuestion} key={item.id}>
                  <div className={styles.reviewQuestionHeader}><span>{Number(questionIndex + 1).toLocaleString(copy.locale)}</span><h2>{item.prompt}</h2></div>
                  <div className={styles.reviewOptions}>
                    {item.options.map((option, optionIndex) => {
                      const isCorrect = optionIndex === item.correctOptionIndex
                      const isSelected = optionIndex === item.selectedOptionIndex
                      const optionClass = [styles.reviewOption, isCorrect ? styles.reviewOptionCorrect : '', isSelected && !isCorrect ? styles.reviewOptionWrong : ''].filter(Boolean).join(' ')
                      return <div className={optionClass} key={optionIndex}><b>{String.fromCharCode(65 + optionIndex)}</b><span>{option}</span>{isCorrect ? <i>✓ {copy.correctAnswer}</i> : null}{isSelected && !isCorrect ? <i>× {copy.yourAnswer}</i> : null}</div>
                    })}
                  </div>
                  <div className={styles.answerSummary}><span><b>{copy.yourAnswer}:</b> {Number.isInteger(item.selectedOptionIndex) ? item.options[item.selectedOptionIndex] : copy.unansweredReview}</span><span><b>{copy.correctAnswer}:</b> {item.options[item.correctOptionIndex]}</span></div>
                  {item.explanation ? <div className={styles.explanation}><strong>{copy.explanation}</strong><p>{item.explanation}</p></div> : null}
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {feedbackOpen && attemptId ? (
          <section className={styles.feedbackSection}>
            <div className={styles.resultSectionHeader}><span>{copy.feedbackTitle}</span><small>{copy.feedbackHint}</small></div>
            {feedbackState === 'saved' ? <div className={styles.feedbackSuccess}>✓ {copy.feedbackSaved}</div> : (
              <form onSubmit={submitFeedback}>
                <div className={styles.ratingOptions}>
                  {copy.ratingLabels.map((label, index) => {
                    const value = index + 1
                    return <label className={feedbackRating === value ? styles.ratingSelected : styles.ratingOption} key={label}><input type="radio" name="feedback-rating" value={value} checked={feedbackRating === value} onChange={() => setFeedbackRating(value)} /><span>{value.toLocaleString(copy.locale)}</span><strong>{label}</strong></label>
                  })}
                </div>
                <textarea maxLength={2000} value={feedbackText} onChange={event => setFeedbackText(event.target.value)} placeholder={copy.feedbackPlaceholder} />
                {feedbackError ? <div className={styles.error} role="alert">{feedbackError}</div> : null}
                <button type="submit" disabled={feedbackState === 'saving'}>{feedbackState === 'saving' ? copy.sendingFeedback : copy.sendFeedback}</button>
              </form>
            )}
          </section>
        ) : null}
      </div>
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
