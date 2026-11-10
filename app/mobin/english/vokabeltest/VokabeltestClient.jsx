'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { MOCK_TESTS, WORD_CHALLENGE, isTypedAnswerCorrect } from '@/lib/mobinEnglish'
import { canOpenEnglishMode, challengeComplete, englishRunPosition, readEnglishHistory, saveEnglishHistory } from '@/lib/mobinEnglishProgress'
import styles from '../english.module.css'

const TESTS = [
  { id: 'probe-a', title: 'Probetest A', detail: 'London entdecken' },
  { id: 'probe-b', title: 'Probetest B', detail: 'Unterwegs in London' },
]

export default function VokabeltestClient({ requestedMode }) {
  const [history, setHistory] = useState({})
  const [ready, setReady] = useState(false)
  const [saveFailed, setSaveFailed] = useState(false)

  function persist(updated) {
    setHistory(updated)
    setSaveFailed(!saveEnglishHistory(updated))
  }
  const [mode, setMode] = useState(null)
  const [index, setIndex] = useState(0)
  const [typedAnswer, setTypedAnswer] = useState('')
  const [feedback, setFeedback] = useState(null)
  const [results, setResults] = useState([])
  const [reviewOnly, setReviewOnly] = useState(false)
  const [reviewQuestionIds, setReviewQuestionIds] = useState([])

  function openMode(nextMode, onlyMissed = false, saved = history, restart = false) {
    if (!canOpenEnglishMode(nextMode, saved)) return
    const savedRun = onlyMissed || restart ? null : saved[nextMode]?.run
    const restored = englishRunPosition(savedRun)
    const resumingReview = onlyMissed || Boolean(savedRun?.reviewOnly)
    const ids = onlyMissed ? saved[nextMode]?.missedIds || [] : resumingReview ? savedRun?.questionIds || [] : []
    setMode(nextMode)
    setReviewOnly(resumingReview)
    setReviewQuestionIds(ids)
    setResults(restored.results)
    setIndex(restored.index)
    setTypedAnswer(restored.feedback?.chosen || '')
    setFeedback(restored.feedback)
    if (onlyMissed || restart) {
      persist({ ...saved, [nextMode]: { ...saved[nextMode], run: { results: [], index: 0, ...(resumingReview ? { reviewOnly: true, questionIds: ids } : {}) } } })
    }
  }

  useEffect(() => {
    const saved = readEnglishHistory()
    setHistory(saved)
    const next = !challengeComplete(saved) ? 'word-challenge' : ['word-challenge', 'probe-a', 'probe-b'].includes(requestedMode) ? requestedMode : null
    if (next) openMode(next, false, saved)
    setReady(true)
    // The requested route determines the initial lesson; later mode changes stay in client state.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestedMode])

  const allQuestions = mode === 'word-challenge' ? WORD_CHALLENGE : MOCK_TESTS.find(test => test.id === mode)?.questions || []
  const reviewIds = new Set(reviewQuestionIds)
  const questions = reviewOnly ? allQuestions.filter(question => reviewIds.has(question.id)) : allQuestions
  const question = questions[index]
  const isMcq = mode === 'word-challenge'
  const finished = Boolean(mode && index >= questions.length)
  const score = results.filter(result => result.correct).length
  const unlocked = challengeComplete(history)

  function recordAnswer(value) {
    if (!question || feedback) return
    const correct = isMcq ? value === question.correct : isTypedAnswerCorrect(question, value)
    const result = { id: question.id, correct, chosen: value }
    const nextResults = [...results, result]
    const completeNow = nextResults.length === questions.length
    const previous = history[mode] || {}
    let entry = { ...previous, run: { results: nextResults, index, ...(reviewOnly ? { reviewOnly: true, questionIds: reviewQuestionIds } : {}) } }
    if (completeNow) {
      const missed = new Set(reviewOnly ? previous.missedIds || [] : [])
      nextResults.forEach(item => item.correct ? missed.delete(item.id) : missed.add(item.id))
      entry = {
        ...previous,
        ...(reviewOnly ? {} : { best: Math.max(previous.best || 0, nextResults.filter(item => item.correct).length), last: nextResults.filter(item => item.correct).length, total: questions.length, date: new Date().toISOString() }),
        completed: previous.completed || mode === 'word-challenge' && !reviewOnly,
        missedIds: [...missed],
      }
      entry.run = { results: nextResults, index, ...(reviewOnly ? { reviewOnly: true, questionIds: reviewQuestionIds } : {}) }
    }
    const updated = { ...history, [mode]: entry }
    persist(updated)
    setFeedback(result)
    setResults(nextResults)
  }

  function nextQuestion() {
    if (!feedback) return
    persist({ ...history, [mode]: { ...history[mode], run: { ...history[mode]?.run, results, index: index + 1 } } })
    setIndex(previous => previous + 1)
    setTypedAnswer('')
    setFeedback(null)
  }

  return <main className={styles.shell}>
    <div className={styles.quizPage}>
      <nav className={styles.quizNav}><Link href="/mobin/english/vokabeltest/11-november">← Pause & Übersicht</Link><span>Unit 2 · London</span></nav>
      {!ready ? <div className={styles.loading}>Training wird geladen …</div> : null}

      {ready && !mode && unlocked ? <section className={styles.chooseTests}>
        <div className={styles.successStamp}>✓ 30 WÖRTER GEÜBT</div>
        <h1>Jetzt bist du dran.</h1>
        <p>Wähle einen Probetest. Hier schreibst du die Antworten selbst.</p>
        <div className={styles.chooseGrid}>{TESTS.map(test => <button type="button" key={test.id} className={styles.chooseCard} onClick={() => openMode(test.id)}><span>✎</span><strong>{test.title}</strong><small>{test.detail} · 10 Aufgaben</small><b aria-hidden="true">→</b></button>)}</div>
        <button type="button" className={styles.textButton} onClick={() => openMode('word-challenge', false, history, true)}>30 Wörter neu starten</button>
        {history['word-challenge']?.missedIds?.length > 0 && <button type="button" className={styles.textButton} onClick={() => openMode('word-challenge', true)}>Fehler wiederholen ({history['word-challenge'].missedIds.length})</button>}
      </section> : null}

      {ready && mode ? <p className={styles.saveNotice} role="status">{saveFailed ? 'Speichern nicht möglich. Bitte lasse diese Seite geöffnet.' : `${results.length} Antworten gespeichert · Du kannst jederzeit auf diesem Gerät weiterlernen.`}{saveFailed && <button type="button" className={styles.textButton} onClick={() => persist(history)}>Erneut speichern</button>}</p> : null}
      {ready && mode && !finished && question ? <section className={styles.quizPanel}>
        <div className={styles.quizTop}><span>{reviewOnly ? 'FEHLERTRAINING' : isMcq ? '01 / WORTTRAINING' : `02 / ${TESTS.find(test => test.id === mode)?.title.toUpperCase()}`}</span><span>{index + 1} / {questions.length}</span></div>
        <div className={styles.progressRail}><span style={{ width: `${((index + (feedback ? 1 : 0)) / questions.length) * 100}%` }} /></div>
        <div className={styles.questionType}>{question.group || question.skill}</div>
        <h1 className={styles.questionText}>{question.prompt}</h1>
        {isMcq ? <div className={styles.optionGrid}>{question.options.map((option, optionIndex) => <button type="button" key={optionIndex} disabled={!!feedback} onClick={() => recordAnswer(optionIndex)} className={`${styles.optionButton} ${feedback && optionIndex === question.correct ? styles.correctOption : ''} ${feedback && optionIndex === feedback.chosen && !feedback.correct ? styles.wrongOption : ''}`}><span>{'ABCD'[optionIndex]}</span>{option}</button>)}</div>
          : <form onSubmit={event => { event.preventDefault(); recordAnswer(typedAnswer) }} className={styles.answerForm}><label htmlFor="vocabulary-answer">Deine Antwort auf Englisch</label><div><input id="vocabulary-answer" autoComplete="off" autoCapitalize="off" spellCheck="false" value={typedAnswer} onChange={event => setTypedAnswer(event.target.value)} disabled={!!feedback} placeholder="Schreibe deine Antwort …" /><button className={styles.actionLink} disabled={!typedAnswer.trim() || !!feedback} type="submit">Prüfen</button></div></form>}
        {feedback && <div className={`${styles.feedback} ${feedback.correct ? styles.feedbackCorrect : styles.feedbackWrong}`} role="status" aria-live="polite"><span className={styles.feedbackIcon}>{feedback.correct ? '✓' : '↺'}</span><div><strong>{feedback.correct ? 'Richtig!' : 'So ist es richtig:'}</strong><p>{isMcq ? question.options[question.correct] : question.answer}</p><small>{question.explain}</small></div></div>}
        {feedback && <button type="button" className={styles.nextButton} onClick={nextQuestion}>{index === questions.length - 1 ? 'Ergebnis ansehen' : 'Nächste Frage'} <span aria-hidden="true">→</span></button>}
      </section> : null}

      {ready && finished ? <section className={styles.resultPanel}>
        <span className={styles.successStamp}>RUNDE ABGESCHLOSSEN</span><div className={styles.resultScore}>{score}<span> / {questions.length}</span></div>
        <h1>{isMcq && !reviewOnly ? 'Die Probetests sind frei.' : 'Gut gemacht!'}</h1><p>{score} von {questions.length} richtig. {history[mode]?.missedIds?.length ? 'Deine Fehler kannst du jederzeit wiederholen.' : 'Du hast alles richtig gelöst.'}</p>
        <div className={styles.resultActions}>{isMcq ? <button className={styles.actionLink} type="button" onClick={() => setMode(null)}>Zu den Probetests <span aria-hidden="true">→</span></button> : <button className={styles.actionLink} type="button" onClick={() => openMode(mode === 'probe-a' ? 'probe-b' : 'probe-a')}>{mode === 'probe-a' ? 'Probetest B starten' : 'Probetest A starten'} <span aria-hidden="true">→</span></button>}<button type="button" className={styles.textButton} onClick={() => openMode(mode, false, history, true)}>Neue Runde starten</button><Link href="/mobin/english/vokabeltest/11-november" className={styles.textButton}>Zur Übersicht</Link></div>
      </section> : null}
    </div>
  </main>
}
