'use client'

import { useEffect, useRef, useState } from 'react'
import { isCorrect, rounds } from './questions'
import styles from './endungen.module.css'

const marks = { training: '↗', medium: '✓', hard: '✦' }

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

function Round({ mode, onExit }) {
  const { title, questions } = rounds[mode]
  const training = mode === 'training'
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
    const score = questions.filter((item, number) => isCorrect(item, answers[number])).length
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
        <button className={styles.primary} onClick={restart}>Runde wiederholen</button>
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
          {training ? (index < 10 ? 'Mittel' : 'Schwer') : title} · Aufgabe {index + 1}/{total} · {question.topic}
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
  const [mode, setMode] = useState(null)
  if (mode) return <Round key={mode} mode={mode} onExit={() => setMode(null)} />
  return (
    <>
      <section className={styles.rounds} aria-label="Übungen und Probetests">
        {Object.entries(rounds).map(([key, round]) => (
          <button className={styles.roundCard} data-mode={key} key={key} onClick={() => setMode(key)}>
            <span className={styles.badge} aria-hidden="true">{marks[key]}</span>
            <span className={styles.detail}>{round.detail}</span>
            <strong>{round.title}</strong>
            <span>{round.description}</span>
            <span className={styles.start}>{key === 'training' ? 'Training starten' : 'Test starten'} <span aria-hidden="true">→</span></span>
          </button>
        ))}
      </section>
      <p className={styles.testNote}>Die Probetests zeigen Lösungen und Punktzahl erst nach der Abgabe.</p>
      <Reference />
    </>
  )
}
