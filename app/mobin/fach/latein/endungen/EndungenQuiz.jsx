'use client'

import { useEffect, useRef, useState } from 'react'
import { isCorrect, rounds } from './questions'
import styles from './endungen.module.css'
import useLatinProgress from './useLatinProgress'

const marks = { training: '↗', extra: '+', quick: '◷', medium: '✓', hard: '✦' }
const resultDate = new Intl.DateTimeFormat('de-DE', { dateStyle: 'medium', timeStyle: 'short' })
const emptyDraft = { index: 0, answers: {}, checked: {} }

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

function Round({ mode, subset, initialDraft, onDraft, onExit, onResult, onRepeat }) {
  const round = rounds[mode]
  const questions = subset ? subset.map((index) => round.questions[index]) : round.questions
  const title = subset ? 'Fehler wiederholen' : round.title
  const training = round.kind === 'training' || Boolean(subset)
  const [draft, setDraft] = useState(initialDraft ?? emptyDraft)
  const { index, answers, checked } = draft
  const [finished, setFinished] = useState(false)
  const [retry, setRetry] = useState(0)
  const heading = useRef(null)
  const question = questions[index]
  const answer = answers[index] ?? ''
  const marked = Boolean(checked[index])
  const done = training ? Object.keys(checked).length : Object.values(answers).filter((value) => value.trim()).length
  const total = questions.length
  const mistakes = finished ? questions.flatMap((item, number) =>
    !answers[number]?.trim() || isCorrect(item, answers[number]) ? [] : [subset?.[number] ?? number]) : []

  useEffect(() => {
    heading.current?.focus()
  }, [index, finished, retry])

  function updateDraft(changes) {
    const updated = { ...draft, ...changes }
    setDraft(updated)
    if (!subset) onDraft(mode, updated)
  }

  function setIndex(number) {
    updateDraft({ index: number })
  }

  function finish() {
    if (!training) {
      const wrong = questions.flatMap((item, number) =>
        answers[number]?.trim() && !isCorrect(item, answers[number]) ? [number] : [])
      onResult(mode, wrong, total - done)
    }
    if (!subset) onDraft(mode, null)
    setFinished(true)
  }

  function next(event) {
    event.preventDefault()
    if (!answer.trim()) return
    if (training && !marked) {
      updateDraft({ checked: { ...checked, [index]: true } })
      return
    }
    if (index < total - 1) {
      setIndex(index + 1)
      return
    }
    if (done === total) {
      finish()
      return
    }
    setIndex(questions.findIndex((_, number) => !answers[number]?.trim()))
  }

  function restart() {
    setDraft(emptyDraft)
    setFinished(false)
    setRetry((previous) => previous + 1)
  }

  function exit() {
    if (!subset || finished || done === 0 || window.confirm('Diese Wiederholung verlassen?')) onExit()
  }

  if (finished) {
    const score = done - mistakes.length
    return (
      <section className={styles.panel}>
        <button className={styles.textButton} onClick={onExit}>← Zur Auswahl</button>
        <h2 ref={heading} tabIndex={-1}>{title} · Auswertung</h2>
        <div className={styles.score}><strong>{score}<span> / {total}</span></strong><span>richtige Antworten</span></div>
        <ol className={styles.review}>
          {questions.map((item, number) => (
            <li key={number}>
              <details open={answers[number]?.trim() && !isCorrect(item, answers[number]) ? true : undefined}>
                <summary>{!answers[number]?.trim() ? '–' : isCorrect(item, answers[number]) ? '✓' : '↻'} {number + 1}. {item.prompt}</summary>
                <p>{item.example}</p>
                <p>Deine Antwort: <strong>{answers[number]?.trim() || 'Nicht beantwortet'}</strong></p>
                <AnswerFeedback question={item} answer={answers[number] ?? ''} />
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
          <button className={styles.textButton} onClick={exit}>{subset ? '← Zur Auswahl' : '← Speichern und zurück'}</button>
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
          {round.kind === 'training' && !subset ? (index < 10 ? 'Mittel' : 'Schwer') : title} · Aufgabe {index + 1}/{total} · {question.topic}
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
                  <input type="radio" name="latin-answer" value={option} checked={answer === option}
                    onChange={() => updateDraft({ answers: { ...answers, [index]: option } })} />
                  {option}
                </label>
              ))}
            </fieldset>
          ) : (
            <label className={styles.inputLabel}>
              Deine Antwort
              <input key={index} className={styles.input} value={answer}
                onChange={(event) => updateDraft({ answers: { ...answers, [index]: event.target.value } })}
                readOnly={marked} maxLength={240} autoComplete="off" autoCapitalize="none" spellCheck={false} />
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
        {!training && done > 0 && done < total && (
          <button type="button" className={styles.textButton} onClick={() => {
            if (window.confirm(`Test mit ${total - done} offenen Aufgaben abgeben?`)) finish()
          }}>Vorzeitig abgeben</button>
        )}
      </section>
      {training && <Reference />}
    </>
  )
}

export default function EndungenQuiz() {
  const [active, setActive] = useState(null)
  const { results, drafts, status, saveDraft, saveResult, refresh, flush } = useLatinProgress()
  const [opening, setOpening] = useState(false)

  function repeat(mode, subset) {
    setActive({ mode, subset, id: crypto.randomUUID() })
  }

  async function openRound(mode) {
    setOpening(true)
    const latest = await refresh()
    setActive({ mode, id: mode, draft: latest[mode]?.draft })
    setOpening(false)
  }

  const syncStatus = <div className={styles.roundBar}>
    <p className={styles.testNote} role="status">{{
      loading: 'Lernstand wird geladen …',
      saving: 'Lernstand wird synchronisiert …',
      saved: 'Im Mobin-Konto gespeichert',
      offline: 'Online-Speicher nicht erreichbar. Lernstand bleibt vorerst in diesem Browser.',
    }[status]}</p>
    {status === 'offline' && <button type="button" className={styles.textButton} onClick={refresh}>Erneut synchronisieren</button>}
  </div>

  if (active) return <>
    {syncStatus}
    <Round key={active.id} mode={active.mode} subset={active.subset}
      initialDraft={active.draft} onDraft={saveDraft}
      onExit={() => { void flush(); setActive(null) }} onResult={saveResult} onRepeat={repeat} />
  </>
  return (
    <>
      {[['training', 'Üben'], ['test', 'Tests']].map(([kind, label]) => (
      <section className={styles.roundGroup} key={kind} aria-labelledby={`latein-${kind}`}>
        <h2 id={`latein-${kind}`}>{label}</h2>
        <div className={styles.rounds}>
        {Object.entries(rounds).filter(([, round]) => (round.kind ?? 'test') === kind).map(([key, round]) => (
          <button className={styles.roundCard} data-mode={key} key={key} disabled={status === 'loading' || opening} onClick={() => openRound(key)}>
            <span className={styles.badge} aria-hidden="true">{marks[key]}</span>
            <span className={styles.detail}>{round.detail}</span>
            <strong>{round.title}</strong>
            <span>{round.description}</span>
            <span className={styles.start} data-draft={Boolean(drafts[key]?.draft)}>{drafts[key]?.draft ? 'Fortsetzen' : round.kind === 'training' ? 'Training starten' : 'Test starten'} <span aria-hidden="true">→</span></span>
          </button>
        ))}
        </div>
      </section>
      ))}
      <p className={styles.testNote}>Die Probetests zeigen Lösungen und Punktzahl erst nach der Abgabe.</p>
      {syncStatus}
      {results.length > 0 && (
        <section className={styles.panel} aria-labelledby="latin-results">
          <h2 id="latin-results">Deine Testergebnisse</h2>
          <ul className={styles.review}>
            {results.map(({ id, mode, date, mistakes, unanswered = 0 }) => {
              const total = rounds[mode].questions.length
              return <li className={styles.resultRow} key={id}>
                <div><strong>{rounds[mode].title} · {total - mistakes.length - unanswered}/{total}</strong>
                  <small>{resultDate.format(date)}{unanswered > 0 ? ` · ${unanswered} offen bei Abgabe` : ''}</small></div>
                {mistakes.length > 0
                  ? <button className={styles.secondary} onClick={() => repeat(mode, mistakes)}>Fehler wiederholen</button>
                  : <span>{unanswered > 0 ? 'Keine falschen Antworten' : 'Alles richtig'}</span>}
              </li>
            })}
          </ul>
        </section>
      )}
      <Reference />
    </>
  )
}
