'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import styles from './deutsch.module.css'
import { families, spellingPractice, spellingTest } from './exercises'
import { stations } from './grammar'

const base = '/mobin/fach/deutsch/klassenarbeit/grammatik/'
const keyFor = (id) => 'mobin-deutsch-2026-11-20-v2:' + id
const emptyRound = { answers: [], value: '', checked: false }

function load(set) {
  try {
    const saved = JSON.parse(window.localStorage.getItem(keyFor(set.id)))
    if (saved && Array.isArray(saved.answers) && saved.answers.length <= set.questions.length
        && saved.answers.every(value => typeof value === 'string') && typeof saved.value === 'string'
        && typeof saved.checked === 'boolean') return saved
  } catch {}
  return emptyRound
}

function normalize(value, strict) {
  const result = value.normalize('NFC').trim().replace(/\s+/g, ' ')
  return strict ? result : result.toLocaleLowerCase('de-DE')
}

function correct(question, value, strict) {
  return normalize(question.answer, strict) === normalize(value, strict)
}

function WordLists() {
  return (
    <details className={styles.wordLists} open>
      <summary>Vier Wortlisten zur Wiederholung</summary>
      <div className={styles.families}>
        {families.map(({ name, words }) => <section key={name}>
          <h3>{name}</h3>
          <p>{words.join(' · ')}</p>
        </section>)}
      </div>
    </details>
  )
}

function Sentence({ text }) {
  if (!text) return null
  return <p className={styles.prompt}>{text.split(/(\[[^\]]+\])/).map((part, index) =>
    part.startsWith('[') ? <mark key={index}>{part.slice(1, -1)}</mark> : part)}</p>
}

function Round({ set, isTest, spelling }) {
  const [saved, setSaved] = useState(null)
  const [retry, setRetry] = useState(null)
  const [storageError, setStorageError] = useState(false)
  const questions = retry ? retry.questions : set.questions
  const testing = isTest && !retry
  const draft = retry ? retry.draft : saved
  const index = draft?.answers.length ?? 0
  const question = questions[index]
  const strict = spelling || ['nomen-ueben', 'nomen-test'].includes(set.id)

  useEffect(() => { setSaved(load(set)) }, [set])

  function save(next) {
    if (retry) {
      setRetry({ ...retry, draft: next })
      return
    }
    setSaved(next)
    try {
      window.localStorage.setItem(keyFor(set.id), JSON.stringify(next))
      setStorageError(false)
    } catch {
      setStorageError(true)
    }
  }

  function submit(event) {
    event.preventDefault()
    if (!draft.value.trim()) return
    if (testing || draft.checked) save({ answers: [...draft.answers, draft.value], value: '', checked: false })
    else save({ ...draft, checked: true })
  }

  if (!draft) return <p role="status">Lernstand wird geladen …</p>
  const saveStatus = storageError
    ? <p role="status">Der Lernstand konnte in diesem Browser nicht gespeichert werden.</p>
    : null

  if (!question) {
    const wrong = questions.flatMap((item, i) => correct(item, draft.answers[i], strict) ? [] : [{ item, index: i }])
    return <section className={styles.panel}>
      <h2>Auswertung</h2>
      <p>{set.name}</p>
      <p className={styles.score}>{questions.length - wrong.length}/{questions.length} richtig</p>
      {wrong.length > 0 ? <>
        <button className={styles.primary} onClick={() => setRetry({ questions: wrong.map(({ item }) => item), draft: emptyRound })}>Fehler wiederholen</button>
        <ul className={styles.corrections}>{wrong.map(({ item, index }) => <li key={index}>
          <strong>Aufgabe {index + 1} · {item.prompt}</strong>
          <Sentence text={item.example} />
          <span>Deine Antwort: {draft.answers[index]}</span>
          <strong>Richtig: {item.answer}</strong>
          <p>{item.explanation}</p>
        </li>)}</ul>
      </> : <p>Alles richtig.</p>}
      {retry ? <button className={styles.secondary} onClick={() => setRetry(null)}>Zum gespeicherten Ergebnis</button>
        : <button className={styles.secondary} onClick={() => {
          if (window.confirm('Eine neue Runde starten und das bisherige Ergebnis dieser Runde ersetzen?')) save(emptyRound)
        }}>Neue Runde starten</button>}
      {saveStatus}
    </section>
  }

  const checked = !testing && draft.checked
  const right = checked && correct(question, draft.value, strict)
  return (
    <section className={styles.panel}>
      <div className={styles.exerciseHead}><h2>{retry ? 'Fehler wiederholen' : set.name}</h2><strong>Aufgabe {index + 1}/{questions.length}</strong></div>
      <progress className={styles.progress} value={index + Number(checked)} max={questions.length} aria-label="Fortschritt" />
      <p>{question.prompt}</p>
      <Sentence text={question.example} />
      {question.hint && <p className={styles.hint}>Gesucht: {question.hint}</p>}
      <form onSubmit={submit} className={styles.exercise} autoComplete="off">
        {question.options ? <fieldset className={styles.choices} disabled={checked}>
          <legend>Deine Antwort</legend>
          {question.options.map(option => <label key={option}>
            <input type="radio" name="deutsch-answer" checked={draft.value === option}
              onChange={() => save({ ...draft, value: option })} />{option}
          </label>)}
        </fieldset> : <label>Deine Antwort<input key={index} value={draft.value} onChange={event => save({ ...draft, value: event.target.value })}
          readOnly={checked} maxLength={160} autoCapitalize="none" autoCorrect="off" spellCheck={false} autoComplete="off"
          data-gramm="false" data-gramm_editor="false" data-enable-grammarly="false" /></label>}
        <div aria-live="polite">{checked && <div className={styles.feedback} data-correct={right}>
          <strong>{right ? 'Richtig!' : 'Richtig wäre: ' + question.answer}</strong>
          <p>{question.explanation}</p>
        </div>}</div>
        <button className={styles.primary} disabled={!draft.value.trim()}>
          {testing ? (index + 1 === questions.length ? 'Test abgeben' : 'Weiter')
            : !checked ? 'Antwort prüfen' : index + 1 === questions.length ? 'Auswertung anzeigen' : 'Weiter'}
        </button>
      </form>
      {saveStatus}
    </section>
  )
}

function StationCards({ isTest }) {
  const [progress, setProgress] = useState({})
  const mode = isTest ? 'test' : 'ueben'
  useEffect(() => {
    function read() {
      setProgress(Object.fromEntries(stations.map(station => [station.id, load(isTest ? station.test : station.practice)])))
    }
    read()
    window.addEventListener('pageshow', read)
    return () => window.removeEventListener('pageshow', read)
  }, [isTest])
  return (
    <nav className={styles.stationGrid} aria-label={isTest ? 'Grammatiktests' : 'Grammatikstationen'}>
      {stations.map((station, index) => {
        const draft = progress[station.id]
        const count = draft?.answers.length ?? 0
        return (
        <Link className={styles.stationCard} key={station.id} href={base + mode + '/' + station.id}>
          <span className={styles.stationArt} style={{ backgroundPositionX: `${index * 25}%` }} aria-hidden="true" />
          <strong>{station.name}</strong>
          <small>{station.note}</small>
          <span>{count === 10 ? 'Ergebnis öffnen' : count || draft?.value ? `Fortsetzen · ${count}/10` : '10 Aufgaben'} <span aria-hidden="true">→</span></span>
        </Link>
        )
      })}
    </nav>
  )
}

export default function DeutschTraining({ area, isTest, stationId }) {
  if (area === 'diktat') return <>
    {!isTest && <WordLists />}
    <Round set={isTest ? spellingTest : spellingPractice} isTest={isTest} spelling />
  </>
  if (!stationId) return <StationCards isTest={isTest} />
  const station = stations.find(item => item.id === stationId)
  return <Round set={isTest ? station.test : station.practice} isTest={isTest} />
}
