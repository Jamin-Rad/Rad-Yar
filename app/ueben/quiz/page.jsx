'use client'
import { useState, useEffect, useMemo, useRef, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { useLanguage } from '@/providers/LanguageProvider'
import { shuffleQuestionIds, getQuestionsForIds, getQuestionsByIds } from '@/data/questions'
import { isSubscriptionActive, FREE_ITEM_LIMIT } from '@/utils/subscription'
import { getWrongAnswerExplanation } from '@/utils/answerFeedback'
import { persistProgressWrite } from '@/utils/progressSync'
import styles from './page.module.css'

const localDateKey = () => {
  const date = new Date()
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

const FACH_NAMES = {
  de: { abdomen:'Abdomen', gehirn:'Kopf', msk:'Muskuloskelettales', thorax:'Thorax',
        wirbelsaeule:'Wirbelsäule', hals:'Hals', mamma:'Mamma',
        'becken-f':'Becken – Frau', 'becken-m':'Becken – Mann', technik:'Technik & Physik',
        'gefaesse-ir':'Gefäße' },
  en: { abdomen:'Abdomen', gehirn:'Head', msk:'Musculoskeletal', thorax:'Thorax',
        wirbelsaeule:'Spine', hals:'Neck', mamma:'Breast',
        'becken-f':'Pelvis – Female', 'becken-m':'Pelvis – Male', technik:'Physics & Tech',
        'gefaesse-ir':'Vascular' },
  fa: { abdomen:'شکم', gehirn:'سر', msk:'اسکلتی-عضلانی', thorax:'توراکس',
        wirbelsaeule:'ستون فقرات', hals:'گردن', mamma:'پستان',
        'becken-f':'لگن – زنان', 'becken-m':'لگن – مردان', technik:'تکنیک و فیزیک',
        'gefaesse-ir':'عروق' },
}

const UI = {
  de: {
    back: '← Zurück',
    noQ: 'Für die gewählten Themen sind noch keine Fragen verfügbar.',
    noQSub: 'Die Fragendatenbank wird laufend erweitert.',
    backSetup: '← Zur Auswahl',
    questionOf: (c, t) => `Frage ${c} von ${t}`,
    checkBtn: 'Antwort prüfen',
    nextBtn: 'Nächste Frage',
    resultBtn: 'Ergebnis anzeigen',
    restartBtn: 'Nochmal starten',
    correct: 'Richtig!',
    incorrect: 'Leider falsch',
    correctAnswer: 'Richtige Antwort:',
    explanation: 'Erklärung',
    whyWrong: 'Warum deine Antwort falsch ist',
    result: 'Dein Ergebnis',
    scoreLabel: (s, t) => `${s} von ${t} richtig`,
    summary: 'Zusammenfassung',
    wrongOnly: 'Nur Fehler',
    allQ: 'Alle',
    yourAnswer: 'Deine Antwort:',
    rightAnswer: 'Richtig:',
    excellent: 'Ausgezeichnet! 🏆',
    veryGood: 'Sehr gut! 🎯',
    good: 'Gut gemacht 📖',
    practice: 'Weiter üben 💪',
    freeLimitNote: `Kostenlose Version: max. ${FREE_ITEM_LIMIT} Fragen pro Durchgang.`,
    upgradeLink: 'Mit Abo unbegrenzt →',
  },
  en: {
    back: '← Back',
    noQ: 'No questions available for the selected topics yet.',
    noQSub: 'The question database is continuously growing.',
    backSetup: '← Back to setup',
    questionOf: (c, t) => `Question ${c} of ${t}`,
    checkBtn: 'Check answer',
    nextBtn: 'Next question',
    resultBtn: 'Show results',
    restartBtn: 'Restart',
    correct: 'Correct!',
    incorrect: 'Incorrect',
    correctAnswer: 'Correct answer:',
    explanation: 'Explanation',
    whyWrong: 'Why your answer is incorrect',
    result: 'Your score',
    scoreLabel: (s, t) => `${s} of ${t} correct`,
    summary: 'Summary',
    wrongOnly: 'Wrong only',
    allQ: 'All',
    yourAnswer: 'Your answer:',
    rightAnswer: 'Correct:',
    excellent: 'Excellent! 🏆',
    veryGood: 'Very good! 🎯',
    good: 'Well done 📖',
    practice: 'Keep practicing 💪',
    freeLimitNote: `Free version: max. ${FREE_ITEM_LIMIT} questions per session.`,
    upgradeLink: 'Unlimited with a subscription →',
  },
  fa: {
    back: '← بازگشت',
    noQ: 'برای موضوعات انتخاب شده هنوز سوالی موجود نیست.',
    noQSub: 'بانک سوالات در حال توسعه است.',
    backSetup: '← بازگشت به انتخاب',
    questionOf: (c, t) => `سوال ${c} از ${t}`,
    checkBtn: 'بررسی پاسخ',
    nextBtn: 'سوال بعدی',
    resultBtn: 'نمایش نتیجه',
    restartBtn: 'شروع مجدد',
    correct: 'درست!',
    incorrect: 'متأسفانه اشتباه',
    correctAnswer: 'پاسخ صحیح:',
    explanation: 'توضیح',
    whyWrong: 'چرا پاسخ شما نادرست است',
    result: 'نتیجه شما',
    scoreLabel: (s, t) => `${s} از ${t} درست`,
    summary: 'خلاصه',
    wrongOnly: 'فقط اشتباه‌ها',
    allQ: 'همه',
    yourAnswer: 'پاسخ شما:',
    rightAnswer: 'درست:',
    excellent: 'عالی! 🏆',
    veryGood: 'خیلی خوب! 🎯',
    good: 'خوب بود 📖',
    practice: 'ادامه تمرین 💪',
    freeLimitNote: `نسخه رایگان: حداکثر ${FREE_ITEM_LIMIT} سؤال در هر دور.`,
    upgradeLink: 'با اشتراک نامحدود ←',
  },
}

function gradeLabel(score, total, ui) {
  const pct = score / total
  if (pct === 1)    return ui.excellent
  if (pct >= 0.75)  return ui.veryGood
  if (pct >= 0.5)   return ui.good
  return ui.practice
}

function gradeColor(score, total) {
  const pct = score / total
  if (pct === 1)   return '#059669'
  if (pct >= 0.75) return '#0ea5e9'
  if (pct >= 0.5)  return '#f97316'
  return '#ef4444'
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

function QuizContent() {
  const { lang } = useLanguage()
  const searchParams = useSearchParams()
  const { user } = useUser()
  const subscriptionActive = isSubscriptionActive(user)
  const ui = UI[lang] || UI.de
  const names = FACH_NAMES[lang] || FACH_NAMES.de

  // Parse params
  const fachParam   = searchParams.get('fach') || ''
  const themenParam = searchParams.get('themen') || ''
  const nParam      = parseInt(searchParams.get('n') || '10', 10)
  const fromParam   = searchParams.get('from') || ''
  const fragenParam = searchParams.get('fragen') || ''
  const backHref    = fromParam || '/ueben'

  const fachIds   = fachParam.split(',').filter(Boolean)
  const themenIds = themenParam.split(',').filter(Boolean)
  const questionIds = fragenParam.split(',').filter(Boolean)

  // Kostenlose Konten: max. FREE_ITEM_LIMIT Fragen pro Durchgang
  const effectiveN = subscriptionActive ? nParam : Math.min(nParam, FREE_ITEM_LIMIT)

  // Stable question order — fixed on mount, does NOT change when lang changes
  const orderedIds = useMemo(
    () => questionIds.length
      ? questionIds.slice(0, effectiveN)
      : shuffleQuestionIds(themenIds, effectiveN),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [themenParam, fragenParam, effectiveN]
  )

  // Translate to current language without re-shuffling
  const questions = useMemo(
    () => questionIds.length
      ? getQuestionsByIds(orderedIds, lang)
      : getQuestionsForIds(orderedIds, lang),
    [orderedIds, lang]
  )
  const total = questions.length

  // Quiz state
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [checked,  setChecked]  = useState(false)
  const [answers,  setAnswers]  = useState([])
  const [phase,    setPhase]    = useState('quiz') // 'quiz' | 'result'
  const [filter,   setFilter]   = useState('all')

  // Zeitlimit (optional): 60 Sekunden pro Frage für den ganzen Durchgang
  const timed = searchParams.get('timed') === '1'
  const totalSeconds = total * 60
  const [timeLeft, setTimeLeft] = useState(totalSeconds)
  const timeUpRef = useRef(false)

  useEffect(() => {
    setTimeLeft(totalSeconds)
    timeUpRef.current = false
  }, [totalSeconds])

  useEffect(() => {
    if (!timed || phase !== 'quiz' || total === 0) return
    const interval = setInterval(() => setTimeLeft(t => Math.max(0, t - 1)), 1000)
    return () => clearInterval(interval)
  }, [timed, phase, total])

  const q = questions[current]
  const isLast = current === total - 1
  const score = answers.filter(a => a.correct).length
  const progressPct = total > 0 ? ((current + (checked ? 1 : 0)) / total) * 100 : 0

  const fachLabel = fachIds.map(id => names[id] || id).join(', ')

  const handleCheck = () => {
    if (!selected || !q) return
    setChecked(true)
    setAnswers(prev => [
      ...prev.filter(a => a.qId !== q.id),
      { qId: q.id, selected, correct: selected === q.correct },
    ])
  }

  const saveMcqResult = (finalAnswers) => {
    try {
      const scores = JSON.parse(localStorage.getItem('radyar_mcq_scores') || '{}')
      const key = themenIds.length === 1 ? themenIds[0] : (fachIds[0] || 'mixed')
      const correct = finalAnswers.filter(a => a.correct).length
      for (const storedScore of Object.values(scores)) {
        const storedWrong = new Set(storedScore.wrongQuestionIds || [])
        finalAnswers.forEach(answer => {
          if (answer.correct) storedWrong.delete(answer.qId)
        })
        storedScore.wrongQuestionIds = [...storedWrong]
      }
      const previousWrong = new Set(scores[key]?.wrongQuestionIds || [])
      const todayKey = localDateKey()
      const daily = { ...(scores[key]?.daily || {}) }
      daily[todayKey] = {
        attempted: Number(daily[todayKey]?.attempted || 0) + finalAnswers.length,
        correct: Number(daily[todayKey]?.correct || 0) + correct,
      }
      finalAnswers.forEach(answer => answer.correct ? previousWrong.delete(answer.qId) : previousWrong.add(answer.qId))
      scores[key] = {
        attempted: (scores[key]?.attempted || 0) + finalAnswers.length,
        correct:   (scores[key]?.correct   || 0) + correct,
        lastDate:  new Date().toISOString(),
        fach:      fachIds[0] || '',
        wrongQuestionIds: [...previousWrong],
        daily,
        lastSessionAttempted: finalAnswers.length,
      }
      localStorage.setItem('radyar_mcq_scores', JSON.stringify(scores))
      if (user?.id) {
        persistProgressWrite('mcq:scores', '/api/progress/mcq-results', { bulk: scores }, true)
      }
    } catch {}
  }

  const handleNext = () => {
    if (isLast) {
      const finalAnswers = [...answers.filter(a => a.qId !== q.id), { qId: q.id, selected, correct: selected === q.correct }]
      saveMcqResult(finalAnswers)
      setPhase('result')
      return
    }
    setCurrent(c => c + 1)
    setSelected(null)
    setChecked(false)
  }

  // Zeit abgelaufen → Durchgang sofort beenden
  useEffect(() => {
    if (!timed || phase !== 'quiz' || timeUpRef.current || timeLeft > 0 || total === 0) return
    timeUpRef.current = true
    const finalAnswers = checked && q
      ? [...answers.filter(a => a.qId !== q.id), { qId: q.id, selected, correct: selected === q.correct }]
      : answers
    saveMcqResult(finalAnswers)
    setAnswers(finalAnswers)
    setPhase('result')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, timed, phase])

  const handleRestart = () => {
    setCurrent(0); setSelected(null); setChecked(false)
    setAnswers([]); setPhase('quiz'); setFilter('all')
    setTimeLeft(totalSeconds); timeUpRef.current = false
  }

  // ── NO QUESTIONS ──────────────────────────────
  if (total === 0) return (
    <div className={styles.page}>
      <div className={styles.empty}>
        <div className={styles.emptyIcon}>🔍</div>
        <h2 className={styles.emptyTitle}>{ui.noQ}</h2>
        <p className={styles.emptySub}>{ui.noQSub}</p>
        <Link href={backHref} className={styles.emptyBtn}>{ui.backSetup}</Link>
      </div>
    </div>
  )

  // ── RESULT PHASE ──────────────────────────────
  if (phase === 'result') {
    const color = gradeColor(score, total)
    const filtered = filter === 'wrong'
      ? questions.filter(q => answers.find(a => a.qId === q.id && !a.correct))
      : questions

    return (
      <div className={styles.page}>
        <div className={styles.topBar}>
          <Link href={backHref} className={styles.back}>{ui.back}</Link>
          <span className={styles.topFach}>{fachLabel}</span>
        </div>
        {!subscriptionActive && (
          <div className={styles.freeLimitBanner}>
            <span>{ui.freeLimitNote}</span>
            <Link href="/profil">{ui.upgradeLink}</Link>
          </div>
        )}
        <div className={styles.resultWrap}>
          {/* Score card */}
          <div className={styles.scoreCard} style={{ borderColor: color }}>
            <div className={styles.scoreNum} style={{ color }}>{score}<span className={styles.scoreTotal}>/{total}</span></div>
            <div className={styles.gradeLabel} style={{ color }}>{gradeLabel(score, total, ui)}</div>
            <div className={styles.scoreBar}><div className={styles.scoreBarFill} style={{ width: `${(score/total)*100}%`, background: color }}/></div>
            <div className={styles.scoreDesc}>{ui.scoreLabel(score, total)}</div>
          </div>

          {/* Summary filter */}
          <div className={styles.summaryHeader}>
            <span className={styles.summaryTitle}>{ui.summary}</span>
            <div className={styles.filterRow}>
              <button className={`${styles.filterBtn} ${filter==='all' ? styles.filterActive : ''}`} onClick={() => setFilter('all')}>{ui.allQ}</button>
              <button className={`${styles.filterBtn} ${filter==='wrong' ? styles.filterWrong : ''}`} onClick={() => setFilter('wrong')}>{ui.wrongOnly}</button>
            </div>
          </div>

          <div className={styles.summaryList}>
            {filtered.map((sq, i) => {
              const ans = answers.find(a => a.qId === sq.id)
              const ok = ans?.correct
              return (
                <div key={sq.id} className={`${styles.summaryItem} ${ok ? styles.sumOk : styles.sumWrong}`}>
                  <div className={styles.sumHead}>
                    <span className={`${styles.sumTag} ${ok ? styles.tagOk : styles.tagErr}`}>{ok ? '✓' : '✗'}</span>
                    <span className={styles.sumQ}>{i+1}. {sq.question}</span>
                  </div>
                  {!ok && (
                    <div className={styles.sumAnswers}>
                      <span>{ui.yourAnswer} <strong>{ans?.selected}) {sq.options.find(o=>o.id===ans?.selected)?.text}</strong></span>
                      <span>{ui.rightAnswer} <strong style={{color:'#059669'}}>{sq.correct}) {sq.options.find(o=>o.id===sq.correct)?.text}</strong></span>
                    </div>
                  )}
                  <div className={styles.sumExp}>{sq.explanation}</div>
                </div>
              )
            })}
          </div>

          <div className={styles.resultActions}>
            <button className={styles.restartBtn} onClick={handleRestart}>{ui.restartBtn}</button>
            <Link href={backHref} className={styles.backBtn}>{ui.backSetup}</Link>
          </div>
        </div>
      </div>
    )
  }

  // ── QUIZ PHASE ────────────────────────────────
  if (!q) return null
  const isCorrect = checked && selected === q.correct
  const correctOpt = q.options.find(o => o.id === q.correct)
  const wrongExplanation = getWrongAnswerExplanation(q, selected, lang)

  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <Link href={backHref} className={styles.back}>{ui.back}</Link>
        <span className={styles.topFach}>{fachLabel}</span>
        {timed && (
          <span className={`${styles.timerPill} ${timeLeft <= 30 ? styles.timerPillLow : ''}`}>
            ⏱ {formatTime(timeLeft)}
          </span>
        )}
        <div className={styles.progressWrap}>
          <div className={styles.progressTrack}>
            <div className={styles.progressFill} style={{ width: `${progressPct}%` }}/>
          </div>
          <span className={styles.progressLabel}>{current+1}/{total}</span>
        </div>
      </div>
      {!subscriptionActive && (
        <div className={styles.freeLimitBanner}>
          <span>{ui.freeLimitNote}</span>
          <Link href="/profil">{ui.upgradeLink}</Link>
        </div>
      )}

      <div className={styles.quizLayout}>
        {/* Main card */}
        <div className={styles.quizCard}>
          <div className={styles.qNum}>{ui.questionOf(current+1, total)}</div>
          <div className={styles.qText}>{q.question}</div>

          <div className={styles.options}>
            {q.options.map(opt => {
              const isThisSelected = selected === opt.id && !checked
              let cls = styles.option
              if (selected && selected !== opt.id && !checked) cls = `${styles.option} ${styles.optUnsel}`
              if (selected === opt.id && !checked) cls = `${styles.option} ${styles.optSel}`
              if (checked && opt.id === q.correct) cls = `${styles.option} ${styles.optOk}`
              if (checked && selected === opt.id && opt.id !== q.correct) cls = `${styles.option} ${styles.optErr}`
              return (
                <div key={opt.id} className={styles.optWrap}>
                  <button className={cls} disabled={checked} onClick={() => setSelected(opt.id)}>
                    <span className={styles.optLetter}>{opt.id}</span>
                    <span className={styles.optText}>{opt.text}</span>
                    {checked && opt.id === q.correct && <span className={styles.optMark}>✓</span>}
                    {checked && selected === opt.id && opt.id !== q.correct && <span className={styles.optMark}>✗</span>}
                  </button>
                  {isThisSelected && (
                    <div className={styles.confirmPopup}>
                      <span className={styles.confirmQuestion}>Bist du sicher?</span>
                      <div className={styles.confirmBtns}>
                        <button className={styles.confirmYes} onClick={handleCheck}>✓ Bestätigen</button>
                        <button className={styles.confirmNo} onClick={() => setSelected(null)}>Ändern</button>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {checked && (
            <div className={`${styles.feedback} ${isCorrect ? styles.fbOk : styles.fbErr}`}>
              <div className={styles.fbHead}>
                <span>{isCorrect ? '✅' : '❌'}</span>
                <strong>{isCorrect ? ui.correct : ui.incorrect}</strong>
              </div>
              {!isCorrect && (
                <div className={styles.correctAnswerRow}>
                  <span>{ui.correctAnswer}</span>
                  <strong>{q.correct}) {correctOpt?.text}</strong>
                </div>
              )}
              <div className={styles.fbLabel}>{ui.explanation}</div>
              <div className={styles.fbText}>{q.explanation}</div>
              {!isCorrect && wrongExplanation && (
                <div className={styles.wrongExplanation}>
                  <div className={styles.fbLabel}>{ui.whyWrong}</div>
                  <div className={styles.fbText}>{wrongExplanation}</div>
                </div>
              )}
            </div>
          )}

          {checked && (
            <div className={styles.actionRow}>
              <button className={styles.nextBtn} onClick={handleNext}>{isLast ? ui.resultBtn : ui.nextBtn} →</button>
            </div>
          )}
        </div>

        {/* Score tracker */}
        <div className={styles.tracker}>
          <div className={styles.trackerTitle}>Score</div>
          <div className={styles.trackerDots}>
            {questions.map((_, i) => {
              const ans = answers.find(a => a.qId === questions[i].id)
              const cls = i === current ? styles.dotCur : ans?.correct ? styles.dotOk : ans ? styles.dotErr : styles.dot
              return <div key={i} className={`${styles.dot} ${cls}`}>{i+1}</div>
            })}
          </div>
          <div className={styles.trackerScore}>
            <span style={{color:'#059669', fontWeight:700}}>{answers.filter(a=>a.correct).length}</span>
            <span style={{color:'#cbd5e1'}}> / </span>
            <span style={{color:'#ef4444', fontWeight:700}}>{answers.filter(a=>!a.correct).length}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export const dynamic = 'force-dynamic'

export default function QuizPage() {
  return (
    <Suspense fallback={<div style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'100vh',color:'#94a3b8',fontFamily:'system-ui'}}>Loading…</div>}>
      <QuizContent />
    </Suspense>
  )
}
