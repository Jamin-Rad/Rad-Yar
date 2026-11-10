'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { MOCK_TESTS, WORD_CHALLENGE, isTypedAnswerCorrect } from '@/lib/mobinEnglish'
import styles from '../english.module.css'

const STORAGE_KEY = 'mobin_english_vokabeltest_unit2_v1'
const MODES = [
  { id: 'probe-a', title: 'Probetest A', detail: '10 Aufgaben · London entdecken', kind: 'Freitext' },
  { id: 'probe-b', title: 'Probetest B', detail: '10 Aufgaben · Unterwegs in London', kind: 'Freitext' },
  { id: 'word-challenge', title: 'Wort-Challenge', detail: '30 Fragen · Bedeutung & Schreibweise', kind: '4 Antworten' },
]

function loadHistory() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
    return data && typeof data === 'object' ? data : {}
  } catch {
    return {}
  }
}

export default function VokabeltestClient() {
  const [mode, setMode] = useState(null)
  const [index, setIndex] = useState(0)
  const [typedAnswer, setTypedAnswer] = useState('')
  const [feedback, setFeedback] = useState(null)
  const [results, setResults] = useState([])
  const [history, setHistory] = useState({})
  const [historyLoaded, setHistoryLoaded] = useState(false)
  const [reviewOnly, setReviewOnly] = useState(false)

  useEffect(() => { setHistory(loadHistory()); setHistoryLoaded(true) }, [])

  const allQuestions = mode === 'word-challenge' ? WORD_CHALLENGE : MOCK_TESTS.find(test => test.id === mode)?.questions || []
  const missedIds = new Set(history[mode]?.missedIds || [])
  const questions = reviewOnly ? allQuestions.filter(question => missedIds.has(question.id)) : allQuestions
  const question = questions[index]
  const isMcq = mode === 'word-challenge'
  const finished = mode && index >= questions.length
  const score = results.filter(result => result.correct).length

  function start(nextMode, onlyMissed = false) {
    setMode(nextMode)
    setReviewOnly(onlyMissed)
    setIndex(0)
    setTypedAnswer('')
    setFeedback(null)
    setResults([])
  }

  function recordAnswer(value) {
    if (!question || feedback) return
    const correct = isMcq ? value === question.correct : isTypedAnswerCorrect(question, value)
    const result = { id: question.id, correct, chosen: value }
    setFeedback(result)
    setResults(previous => [...previous, result])
  }

  function nextQuestion() {
    if (!feedback) return
    if (index === questions.length - 1) {
      const previous = history[mode] || {}
      const missed = new Set(reviewOnly ? previous.missedIds || [] : [])
      results.forEach(result => result.correct ? missed.delete(result.id) : missed.add(result.id))
      const updated = { ...history, [mode]: { best: Math.max(previous.best || 0, score), last: score, total: questions.length, missedIds: [...missed], date: new Date().toISOString() } }
      setHistory(updated)
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(updated)) } catch { /* Storage may be unavailable. */ }
    }
    setIndex(previous => previous + 1)
    setTypedAnswer('')
    setFeedback(null)
  }

  return (
    <main className={styles.shell}>
      <div className={styles.container}>
        <nav className={styles.breadcrumb} aria-label="Navigation"><Link href="/mobin">← Mobin</Link><span>/</span><Link href="/mobin/english">English</Link><span>/</span><strong>Vokabeltest</strong></nav>
        <header className={styles.practiceHero}><div className={styles.practiceDate}><span>TEST AM 11. NOVEMBER 2026</span><strong>UNIT 02 · LONDON: WOW!</strong></div><span className={styles.kicker}>DEIN TRAINING FÜR DEN 11. NOVEMBER</span><h1>Vokabel<span>test</span></h1><p>Ein Wort nach dem anderen. Nach jeder Antwort siehst du sofort die richtige Lösung und warum sie passt. Deine aktive Lernzeit erscheint auf der Mobin-Startseite.</p></header>
        {!mode && <>
          <section className={styles.sectionHead}><span>WÄHLE DEIN TRAINING</span><h2>Drei Wege zum Ziel</h2></section>
          <div className={styles.modeGrid}>{MODES.map((item, position) => <article className={styles.modeCard} key={item.id}>
            <div className={styles.modeTop}><span>0{position + 1}</span><span>{item.kind}</span></div><h3>{item.title}</h3><p>{item.detail}</p>
            {historyLoaded && history[item.id] && <div className={styles.miniHistory}>Zuletzt: {history[item.id].last}/{history[item.id].total} richtig · Bestwert: {history[item.id].best}</div>}
            <button className={styles.primaryButton} onClick={() => start(item.id)}>Starten <span aria-hidden="true">↗</span></button>
            {historyLoaded && history[item.id]?.missedIds?.length > 0 && <button className={styles.reviewButton} onClick={() => start(item.id, true)}>↺ Fehler wiederholen ({history[item.id].missedIds.length})</button>}
          </article>)}</div>
          <p className={styles.sourceNote}>Die zwei Probetests folgen dem Muster deiner bisherigen Vokabeltests: Übersetzen, Lückensätze und einfache Vergangenheitsformen. Die Wörter stammen aus Unit 2 und den London-Fotos. Dein Fortschritt wird in diesem Browser gespeichert.</p>
        </>}
        {mode && !finished && question && <section className={styles.quizPanel}>
          <div className={styles.quizTop}><button className={styles.backButton} onClick={() => setMode(null)}>← Übersicht</button><span>{reviewOnly ? 'FEHLERTRAINING' : MODES.find(item => item.id === mode)?.title}</span></div>
          <div className={styles.progressInfo}><strong>Frage {index + 1} <span>/ {questions.length}</span></strong><span>{score} richtig</span></div>
          <div className={styles.progressRail}><span style={{ width: `${((index + (feedback ? 1 : 0)) / questions.length) * 100}%` }} /></div>
          <div className={styles.questionType}>{question.group || question.skill}</div><h2 className={styles.questionText}>{question.prompt}</h2>
          {isMcq ? <div className={styles.optionGrid}>{question.options.map((option, optionIndex) => <button key={optionIndex} disabled={!!feedback} onClick={() => recordAnswer(optionIndex)} className={`${styles.optionButton} ${feedback && optionIndex === question.correct ? styles.correctOption : ''} ${feedback && optionIndex === feedback.chosen && !feedback.correct ? styles.wrongOption : ''}`}><span>{'ABCD'[optionIndex]}</span>{option}</button>)}</div>
            : <form onSubmit={event => { event.preventDefault(); recordAnswer(typedAnswer) }} className={styles.answerForm}><label htmlFor="vocabulary-answer">Deine Antwort auf Englisch</label><div><input id="vocabulary-answer" autoComplete="off" autoCapitalize="off" spellCheck="false" value={typedAnswer} onChange={event => setTypedAnswer(event.target.value)} disabled={!!feedback} placeholder="Schreibe das englische Wort …" /><button className={styles.primaryButton} disabled={!typedAnswer.trim() || !!feedback} type="submit">Prüfen</button></div></form>}
          {feedback && <div className={`${styles.feedback} ${feedback.correct ? styles.feedbackCorrect : styles.feedbackWrong}`} role="status" aria-live="polite"><span className={styles.feedbackIcon}>{feedback.correct ? '✓' : '↺'}</span><div><strong>{feedback.correct ? 'Richtig!' : 'Fast — so ist es richtig:'}</strong><p>{isMcq ? question.options[question.correct] : question.answer}</p><small>{question.explain}</small></div></div>}
          {feedback && <button className={styles.nextButton} onClick={nextQuestion}>{index === questions.length - 1 ? 'Ergebnis ansehen' : 'Nächste Frage'} <span aria-hidden="true">→</span></button>}
        </section>}
        {finished && <section className={styles.resultPanel}><span className={styles.kicker}>GESCHAFFT!</span><div className={styles.resultScore}>{score}<span> / {questions.length}</span></div><h2>{score === questions.length ? 'Alles richtig. Stark!' : 'Gut geübt — weiter geht’s.'}</h2><p>Du hast {score} von {questions.length} Aufgaben richtig gelöst. Fehler kannst du jederzeit noch einmal üben.</p><div className={styles.resultActions}><button className={styles.primaryButton} onClick={() => start(mode)}>Noch einmal</button><button className={styles.reviewButton} onClick={() => setMode(null)}>Zur Übersicht</button></div></section>}
      </div>
    </main>
  )
}
