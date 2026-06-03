'use client'
import { useState, useEffect, useMemo, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useLanguage } from '@/providers/LanguageProvider'
import { getQuestions } from '@/data/questions'
import styles from './page.module.css'

const FACH_NAMES = {
  de: { abdomen:'Abdomen', gehirn:'Kopf', msk:'Muskuloskelettales', thorax:'Thorax',
        wirbelsaeule:'Wirbelsäule', hals:'Hals', mamma:'Mamma',
        'becken-f':'Becken – Frau', 'becken-m':'Becken – Mann', technik:'Technik & Physik' },
  en: { abdomen:'Abdomen', gehirn:'Head', msk:'Musculoskeletal', thorax:'Thorax',
        wirbelsaeule:'Spine', hals:'Neck', mamma:'Breast',
        'becken-f':'Pelvis – Female', 'becken-m':'Pelvis – Male', technik:'Physics & Tech' },
  fa: { abdomen:'شکم', gehirn:'سر', msk:'اسکلتی-عضلانی', thorax:'توراکس',
        wirbelsaeule:'ستون فقرات', hals:'گردن', mamma:'پستان',
        'becken-f':'لگن – زنان', 'becken-m':'لگن – مردان', technik:'تکنیک و فیزیک' },
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

function QuizContent() {
  const { lang } = useLanguage()
  const searchParams = useSearchParams()
  const ui = UI[lang] || UI.de
  const names = FACH_NAMES[lang] || FACH_NAMES.de

  // Parse params
  const fachParam   = searchParams.get('fach') || ''
  const themenParam = searchParams.get('themen') || ''
  const nParam      = parseInt(searchParams.get('n') || '10', 10)

  const fachIds   = fachParam.split(',').filter(Boolean)
  const themenIds = themenParam.split(',').filter(Boolean)

  // Load questions (randomized, capped to n)
  const questions = useMemo(() => getQuestions(themenIds, lang, nParam), [themenParam, lang, nParam])
  const total = questions.length

  // Quiz state
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [checked,  setChecked]  = useState(false)
  const [answers,  setAnswers]  = useState([])
  const [phase,    setPhase]    = useState('quiz') // 'quiz' | 'result'
  const [filter,   setFilter]   = useState('all')

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

  const handleNext = () => {
    if (isLast) { setPhase('result'); return }
    setCurrent(c => c + 1)
    setSelected(null)
    setChecked(false)
  }

  const handleRestart = () => {
    setCurrent(0); setSelected(null); setChecked(false)
    setAnswers([]); setPhase('quiz'); setFilter('all')
  }

  // ── NO QUESTIONS ──────────────────────────────
  if (total === 0) return (
    <div className={styles.page}>
      <div className={styles.empty}>
        <div className={styles.emptyIcon}>🔍</div>
        <h2 className={styles.emptyTitle}>{ui.noQ}</h2>
        <p className={styles.emptySub}>{ui.noQSub}</p>
        <Link href="/ueben" className={styles.emptyBtn}>{ui.backSetup}</Link>
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
          <Link href="/ueben" className={styles.back}>{ui.back}</Link>
          <span className={styles.topFach}>{fachLabel}</span>
        </div>
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
            <Link href="/ueben" className={styles.backBtn}>{ui.backSetup}</Link>
          </div>
        </div>
      </div>
    )
  }

  // ── QUIZ PHASE ────────────────────────────────
  if (!q) return null
  const isCorrect = checked && selected === q.correct
  const correctOpt = q.options.find(o => o.id === q.correct)

  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <Link href="/ueben" className={styles.back}>{ui.back}</Link>
        <span className={styles.topFach}>{fachLabel}</span>
        <div className={styles.progressWrap}>
          <div className={styles.progressTrack}>
            <div className={styles.progressFill} style={{ width: `${progressPct}%` }}/>
          </div>
          <span className={styles.progressLabel}>{current+1}/{total}</span>
        </div>
      </div>

      <div className={styles.quizLayout}>
        {/* Main card */}
        <div className={styles.quizCard}>
          <div className={styles.qNum}>{ui.questionOf(current+1, total)}</div>
          <div className={styles.qText}>{q.question}</div>

          <div className={styles.options}>
            {q.options.map(opt => {
              let cls = styles.option
              if (selected === opt.id && !checked) cls = `${styles.option} ${styles.optSel}`
              if (checked && opt.id === q.correct) cls = `${styles.option} ${styles.optOk}`
              if (checked && selected === opt.id && opt.id !== q.correct) cls = `${styles.option} ${styles.optErr}`
              return (
                <button key={opt.id} className={cls} disabled={checked} onClick={() => setSelected(opt.id)}>
                  <span className={styles.optLetter}>{opt.id}</span>
                  <span className={styles.optText}>{opt.text}</span>
                  {checked && opt.id === q.correct && <span className={styles.optMark}>✓</span>}
                  {checked && selected === opt.id && opt.id !== q.correct && <span className={styles.optMark}>✗</span>}
                </button>
              )
            })}
          </div>

          {checked && (
            <div className={`${styles.feedback} ${isCorrect ? styles.fbOk : styles.fbErr}`}>
              <div className={styles.fbHead}>
                <span>{isCorrect ? '✅' : '❌'}</span>
                <strong>{isCorrect ? ui.correct : ui.incorrect}</strong>
                {!isCorrect && <span> — {ui.correctAnswer} <strong>{q.correct}) {correctOpt?.text}</strong></span>}
              </div>
              <div className={styles.fbLabel}>{ui.explanation}</div>
              <div className={styles.fbText}>{q.explanation}</div>
            </div>
          )}

          <div className={styles.actionRow}>
            {!checked
              ? <button className={`${styles.checkBtn} ${!selected ? styles.checkDisabled : ''}`} onClick={handleCheck} disabled={!selected}>{ui.checkBtn}</button>
              : <button className={styles.nextBtn} onClick={handleNext}>{isLast ? ui.resultBtn : ui.nextBtn} →</button>
            }
          </div>
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
