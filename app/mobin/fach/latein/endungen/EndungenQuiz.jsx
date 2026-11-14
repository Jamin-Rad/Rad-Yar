'use client'

import { useEffect, useRef, useState } from 'react'
import { isCorrect, rounds } from './questions'
import styles from './endungen.module.css'

const marks = { training: '↗', medium: '✓', hard: '✦' }
const resultsKey = 'mobin-latin-endungen-results-v1'
const resultDate = new Intl.DateTimeFormat('de-DE', { dateStyle: 'medium', timeStyle: 'short' })

function readResults() {
  try {
    const data = JSON.parse(window.localStorage.getItem(resultsKey) ?? '[]')
    return Array.isArray(data) ? data.filter((item) => item && typeof item.id === 'string'
      && (item.mode === 'medium' || item.mode === 'hard') && Number.isFinite(item.date)
      && Array.isArray(item.mistakes) && item.mistakes.every((index) =>
        Number.isInteger(index) && index >= 0 && index < rounds[item.mode].questions.length)) : []
  } catch {
    return []
  }
}

const rows = [
  ['a-Deklination', 'amica', 'a', 'am', 'ae', 'as'],
  ['o-Deklination (m.)', 'amicus', 'us', 'um', 'i', 'os'],
  ['o-Deklination (n.)', 'donum', 'um', 'um', 'a', 'a'],
]

function Reference() {
  return (
    <details className={styles.reference}>
      <summary>Merkhilfe öffnen</summary>
      <div className={styles.referenceBody}>
        <table>
          <thead><tr><th>Person</th><th>Endung</th><th><i lang="la">esse</i></th></tr></thead>
          <tbody>
            {[
              ['ich', '-o', 'sum'], ['du', '-s', 'es'], ['er / sie / es', '-t', 'est'],
              ['wir', '-mus', 'sumus'], ['ihr', '-tis', 'estis'], ['sie (Plural)', '-nt', 'sunt'],
            ].map(([person, ending, form]) => (
              <tr key={person}><th scope="row">{person}</th><td>{ending}</td><td lang="la">{form}</td></tr>
            ))}
          </tbody>
        </table>
        <div>
          <table className={styles.caseTable}>
            <thead><tr><th>Beispiel</th><th>Nom. Sg.</th><th>Akk. Sg.</th><th>Nom. Pl.</th><th>Akk. Pl.</th></tr></thead>
            <tbody>
              {rows.map(([label, noun, ...endings]) => (
                <tr key={noun}>
                  <th scope="row"><i lang="la">{noun}</i><small>{label}</small></th>
                  {endings.map((ending, index) => <td key={index}>-{ending}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
          <p>Subjekt: Wer oder was? Akkusativobjekt: Wen oder was? Beim Neutrum haben beide Fälle dieselbe Form. Schau darauf, welche Aufgabe das Wort im Satz hat.</p>
        </div>
      </div>
    </details>
  )
}

function AnswerFeedback({ question, answer }) {
  const correct = isCorrect(question, answer)
  return (
    <div className={styles.feedback} data-correct={correct}>
      <strong>{correct ? '✓ Richtig!' : 'Richtige Lösung: ' + question.answer}</strong>
      <p>{question.explanation}</p>
    </div>
  )
}

function Round({ mode, subset, onExit, onResult, onRepeat }) {
  const round = rounds[mode]
  const questions = subset ? subset.map((index) => round.questions[index]) : round.questions
  const title = subset ? 'Fehler wiederholen' : round.title
  const training = mode === 'training' || Boolean(subset)
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [checked, setChecked] = useState({})
  const [finished, setFinished] = useState(false)
  const [retry, setRetry] = useState(0)
  const heading = useRef(null)
  const question = questions[index]
  const answer = answers[index] ?? ''
  const marked = Boolean(checked[index])
  const done = training ? Object.keys(checked).length : Object.values(answers).filter((value) => value.trim()).length
  const total = questions.length
  const mistakes = finished ? questions.flatMap((item, number) =>
    isCorrect(item, answers[number]) ? [] : [subset?.[number] ?? number]) : []

  useEffect(() => {
    heading.current?.focus()
  }, [index, finished, retry])

  function save(value) {
    setAnswers((previous) => ({ ...previous, [index]: value }))
  }

  function next(event) {
    event.preventDefault()
    if (!answer.trim()) return
    if (training && !marked) {
      setChecked((previous) => ({ ...previous, [index]: true }))
      return
    }
    if (index < total - 1) {
      setIndex(index + 1)
      return
    }
    if (done === total) {
      if (!training) {
        onResult(mode, questions.flatMap((item, number) => isCorrect(item, answers[number]) ? [] : [number]))
      }
      setFinished(true)
      return
    }
    setIndex(questions.findIndex((_, number) => !answers[number]?.trim()))
  }

  function restart() {
    setAnswers({})
    setChecked({})
    setIndex(0)
    setFinished(false)
    setRetry((previous) => previous + 1)
  }

  function exit() {
    if (finished || done === 0 || window.confirm('Diese Runde verlassen? Deine Antworten in der laufenden Runde gehen verloren.')) onExit()
  }

  if (finished) {
    const score = total - mistakes.length
    return (
      <section className={styles.panel}>
        <button className={styles.textButton} onClick={onExit}>← Zur Auswahl</button>
        <h2 ref={heading} tabIndex={-1}>{title} · Auswertung</h2>
        <div className={styles.score}><strong>{score}<span> / {total}</span></strong><span>richtige Antworten</span></div>
        <ol className={styles.review}>
          {questions.map((item, number) => (
            <li key={number}>
              <details open={!isCorrect(item, answers[number]) ? true : undefined}>
                <summary>{isCorrect(item, answers[number]) ? '✓' : '↻'} {number + 1}. {item.prompt}</summary>
                <p>{item.example}</p>
                <p>Deine Antwort: <strong>{answers[number]}</strong></p>
                <AnswerFeedback question={item} answer={answers[number]} />
              </details>
            </li>
          ))}
        </ol>
        <div className={styles.controls}>
          <button className={styles.secondary} onClick={restart}>Runde wiederholen</button>
          {mistakes.length > 0 && <button className={styles.primary} onClick={() => onRepeat(mode, mistakes)}>Fehler wiederholen</button>}
        </div>
      </section>
    )
  }

  return (
    <>
      <section className={styles.panel} aria-label={title}>
        <div className={styles.roundBar}>
          <button className={styles.textButton} onClick={exit}>← Zur Auswahl</button>
          <span>{done} von {total} {training ? 'geprüft' : 'beantwortet'}</span>
        </div>
        <progress className={styles.progress} value={done} max={total} aria-label="Fortschritt" />
        {!training && (
          <nav className={styles.steps} aria-label="Aufgaben">
            {questions.map((_, number) => (
              <button key={number} type="button" aria-label={`Aufgabe ${number + 1}${answers[number]?.trim() ? ', beantwortet' : ''}`}
                aria-current={index === number ? 'step' : undefined} data-answered={Boolean(answers[number]?.trim())}
                onClick={() => setIndex(number)}>{number + 1}</button>
            ))}
          </nav>
        )}
        <p className={styles.eyebrow}>
          {mode === 'training' && !subset ? (index < 10 ? 'Mittel' : 'Schwer') : title} · Aufgabe {index + 1}/{total} · {question.topic}
        </p>
        <h2 ref={heading} tabIndex={-1}>{question.prompt}</h2>
        <p className={styles.example}>{question.example}</p>
        <form onSubmit={next}>
          {question.options ? (
            <fieldset className={styles.options} key={index} disabled={marked}>
              <legend className={styles.srOnly}>Wähle eine Antwort</legend>
              {question.options.map((option) => (
                <label key={option} className={styles.option} data-selected={answer === option}
                  data-solution={marked && option === question.answer}>
                  <input type="radio" name="latin-answer" value={option} checked={answer === option} onChange={() => save(option)} />
                  {option}
                </label>
              ))}
            </fieldset>
          ) : (
            <label className={styles.inputLabel}>
              Deine Antwort
              <input key={index} className={styles.input} value={answer} onChange={(event) => save(event.target.value)}
                readOnly={marked} autoComplete="off" autoCapitalize="none" spellCheck={false} />
            </label>
          )}
          <div aria-live="polite">{marked && <AnswerFeedback question={question} answer={answer} />}</div>
          <div className={styles.controls}>
            {index > 0 && <button className={styles.secondary} type="button" onClick={() => setIndex(index - 1)}>← Zurück</button>}
            <button className={styles.primary} disabled={!answer.trim()}>
              {training && !marked ? 'Antwort prüfen' : index < total - 1 ? 'Weiter →'
                : done < total ? 'Zur offenen Aufgabe →' : training ? 'Auswertung anzeigen' : 'Test abgeben'}
            </button>
          </div>
        </form>
      </section>
      {training && <Reference />}
    </>
  )
}

export default function EndungenQuiz() {
  const [active, setActive] = useState(null)
  const [results, setResults] = useState([])
  const [storageError, setStorageError] = useState(false)

  useEffect(() => {
    setResults(readResults())
    function syncResults(event) {
      if (event.key === resultsKey) setResults(readResults())
    }
    window.addEventListener('storage', syncResults)
    return () => window.removeEventListener('storage', syncResults)
  }, [])

  function saveResult(mode, mistakes) {
    const entry = { id: crypto.randomUUID(), date: Date.now(), mode, mistakes }
    const previous = readResults()
    const saved = [entry, ...previous, ...results.filter((result) => !previous.some((item) => item.id === result.id))]
    setResults(saved)
    try {
      window.localStorage.setItem(resultsKey, JSON.stringify(saved))
      setStorageError(false)
    } catch {
      setStorageError(true)
    }
  }

  function repeat(mode, subset) {
    setActive({ mode, subset, id: crypto.randomUUID() })
  }

  const storageWarning = storageError && <p role="status" className={styles.testNote}>
    Die Ergebnisse sind noch sichtbar, konnten aber in diesem Browser nicht dauerhaft gespeichert werden.
  </p>

  if (active) return <>
    {storageWarning}
    <Round key={active.id} mode={active.mode} subset={active.subset}
      onExit={() => setActive(null)} onResult={saveResult} onRepeat={repeat} />
  </>
  return (
    <>
      <section className={styles.rounds} aria-label="Übungen und Probetests">
        {Object.entries(rounds).map(([key, round]) => (
          <button className={styles.roundCard} data-mode={key} key={key} onClick={() => setActive({ mode: key, id: key })}>
            <span className={styles.badge} aria-hidden="true">{marks[key]}</span>
            <span className={styles.detail}>{round.detail}</span>
            <strong>{round.title}</strong>
            <span>{round.description}</span>
            <span className={styles.start}>{key === 'training' ? 'Training starten' : 'Test starten'} <span aria-hidden="true">→</span></span>
          </button>
        ))}
      </section>
      <p className={styles.testNote}>Die Probetests zeigen Lösungen und Punktzahl erst nach der Abgabe.</p>
      {storageWarning}
      {results.length > 0 && (
        <section className={styles.panel} aria-labelledby="latin-results">
          <h2 id="latin-results">Deine Testergebnisse</h2>
          <ul className={styles.review}>
            {results.map(({ id, mode, date, mistakes }) => {
              const total = rounds[mode].questions.length
              return <li className={styles.resultRow} key={id}>
                <div><strong>{rounds[mode].title} · {total - mistakes.length}/{total}</strong>
                  <small>{resultDate.format(date)}</small></div>
                {mistakes.length > 0
                  ? <button className={styles.secondary} onClick={() => repeat(mode, mistakes)}>Fehler wiederholen</button>
                  : <span>Alles richtig</span>}
              </li>
            })}
          </ul>
        </section>
      )}
      <Reference />
    </>
  )
}
