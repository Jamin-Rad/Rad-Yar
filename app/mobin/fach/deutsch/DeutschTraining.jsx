'use client'

import { useEffect, useState } from 'react'
import styles from './deutsch.module.css'
import { dictations, dictationTest, families, grammar, grammarTest } from './exercises'

function compare(value) {
  return value.normalize('NFC').trim().replace(/\s+/g, ' ')
}

function WordLists() {
  return (
    <div className={styles.families}>
      {families.map(({ name, words }) => <section key={name}>
        <h3>{name}</h3>
        <ul>{words.map(word => <li key={word}>{word}</li>)}</ul>
      </section>)}
    </div>
  )
}

function Round({ set, dictation, isTest, onExit }) {
  const [testing, setTesting] = useState(isTest)
  const [questions, setQuestions] = useState(set.questions)
  const [answers, setAnswers] = useState([])
  const [value, setValue] = useState('')
  const [feedback, setFeedback] = useState(null)
  const [audioError, setAudioError] = useState(false)
  const index = answers.length
  const question = questions[index]

  useEffect(() => () => window.speechSynthesis?.cancel(), [])

  function listen() {
    const speech = window.speechSynthesis
    if (!speech || !window.SpeechSynthesisUtterance) {
      setAudioError(true)
      return
    }
    setAudioError(false)
    speech.cancel()
    const utterance = new SpeechSynthesisUtterance(question.answer)
    utterance.lang = 'de-DE'
    utterance.rate = .78
    const voice = speech.getVoices().find(({ lang }) => lang.toLowerCase().startsWith('de'))
    if (voice) utterance.voice = voice
    utterance.onerror = ({ error }) => {
      if (error !== 'interrupted' && error !== 'canceled') setAudioError(true)
    }
    speech.speak(utterance)
  }

  function next(event) {
    event.preventDefault()
    if (feedback) {
      if (dictation) window.speechSynthesis?.cancel()
      setAnswers([...answers, feedback])
      setFeedback(null)
      setValue('')
    } else if (value.trim()) {
      const submitted = compare(value)
      const graded = dictation ? submitted.replace(/^(Der|Die|Das|Ich) /, word => word.toLowerCase()) : submitted
      const result = { question, value: submitted, correct: graded === question.answer }
      if (testing) {
        if (dictation) window.speechSynthesis?.cancel()
        setAnswers([...answers, result])
        setValue('')
      } else {
        setFeedback(result)
      }
    }
  }

  if (!question) {
    const mistakes = answers.filter(item => !item.correct)
    return <section className={styles.panel}>
      {onExit && <button className={styles.link} onClick={onExit}>← Zur Auswahl</button>}
      <h2>Auswertung</h2>
      <p className={styles.score}>{answers.length - mistakes.length}/{answers.length} richtig</p>
      {mistakes.length > 0 ? <>
        <button className={styles.primary} onClick={() => { setTesting(false); setQuestions(mistakes.map(item => item.question)); setAnswers([]) }}>Fehler wiederholen</button>
        <ul className={styles.corrections}>{mistakes.map((item, number) => <li key={number}>
          {item.question.example || item.question.prompt ? <p>{item.question.example || item.question.prompt}</p> : null}
          <span>Deine Antwort: {item.value}</span>
          <strong>Richtig: {item.question.answer}</strong>
          {item.question.explanation && <p>{item.question.explanation}</p>}
        </li>)}</ul>
      </> : <p>Alles richtig.</p>}
    </section>
  }

  return (
    <section className={styles.panel}>
      <div className={styles.row}>{onExit && <button className={styles.link} onClick={onExit}>← Zur Auswahl</button>}<span>Aufgabe {index + 1}/{questions.length}</span></div>
      <progress className={styles.progress} value={index + Number(Boolean(feedback))} max={questions.length} aria-label="Fortschritt" />
      <h2>{set.name}</h2>
      {dictation ? <>
        <p>Hör zu und schreibe das Wort oder die Wendung genau auf.</p>
        <button className={styles.secondary} type="button" onClick={listen}>Vorlesen</button>
        {audioError && <p role="status">Die Sprachausgabe ist hier nicht verfügbar. Jemand kann dir das Wort vorlesen.</p>}
        {(!testing || audioError) && <details className={styles.fallback} key={index}>
          <summary>Text für eine Vorleseperson</summary><p>{question.answer}</p>
        </details>}
      </> : <>
        <p>{question.prompt.includes('__') ? 'Setze ss oder ß ein.' : question.prompt}</p>
        <p className={styles.prompt}>{question.example ?? (question.prompt.includes('__') ? question.prompt : null)}</p>
      </>}
      <form onSubmit={next} className={styles.exercise}>
        {question.options ? <fieldset className={styles.choices} disabled={Boolean(feedback)}>
          <legend>Deine Antwort</legend>
          {question.options.map(option => <label key={option}>
            <input type="radio" name="deutsch-answer" checked={value === option} onChange={() => setValue(option)} />{option}
          </label>)}
        </fieldset> : <label>Deine Antwort<input key={index} value={value} onChange={e => setValue(e.target.value)}
          readOnly={Boolean(feedback)} autoCapitalize="none" autoCorrect="off" spellCheck={false} autoComplete="off" /></label>}
        <div aria-live="polite">{feedback && <div className={styles.feedback} data-correct={feedback.correct}>
          <strong>{feedback.correct ? 'Richtig!' : 'Richtig wäre: ' + question.answer}</strong>
          {question.explanation && <p>{question.explanation}</p>}
        </div>}</div>
        <button className={styles.primary} disabled={!value.trim()}>
          {testing ? (index + 1 === questions.length ? 'Test abgeben' : 'Weiter') : !feedback ? 'Antwort prüfen' : index + 1 === questions.length ? 'Auswertung anzeigen' : 'Weiter'}
        </button>
      </form>
    </section>
  )
}

const planFields = [
  ['start', 'Einleitung', 'Wer ist dabei? Wo und wann beginnt alles?'],
  ['middle', 'Hauptteil', 'Was passiert Unerwartetes? Wie wächst die Spannung?'],
  ['end', 'Schluss', 'Wie löst sich das Problem? Was ändert sich für die Figur?'],
]
const writingChecks = [
  'Einleitung, Hauptteil und Schluss sind erkennbar.',
  'Die Handlung führt zu einem Höhepunkt und hat ein nachvollziehbares Ende.',
  'Ich erzähle überwiegend im Präteritum und verwende passende Zeitformen.',
  'Ich habe Satzanfänge, Großschreibung und Satzzeichen geprüft.',
]

function Story({ isTest }) {
  const key = 'mobin-deutsch-schreibwerkstatt-v1:' + (isTest ? 'test' : 'ueben')
  const [work, setWork] = useState(null)
  const [now, setNow] = useState(0)
  const [storageError, setStorageError] = useState(false)
  const { step, plan, text, deadline } = work ?? {}
  const seconds = deadline ? Math.max(0, Math.ceil((deadline - now) / 1000)) : null

  useEffect(() => {
    const blank = { step: 'plan', plan: {}, text: '', deadline: null }
    try { setWork(JSON.parse(localStorage.getItem(key)) ?? blank) }
    catch { setWork(blank) }
    setNow(Date.now())
  }, [key])

  function save(changes) {
    const next = { ...work, ...changes }
    setWork(next)
    try { localStorage.setItem(key, JSON.stringify(next)) } catch { setStorageError(true) }
  }

  useEffect(() => {
    if (!deadline || step === 'review') return
    const timer = window.setInterval(() => setNow(Date.now()), 500)
    return () => window.clearInterval(timer)
  }, [deadline, step])

  function advance() {
    const next = step === 'plan' ? 'write' : 'review'
    const start = Date.now()
    setNow(start)
    save({ step: next, deadline: isTest && next === 'write' ? start + 45 * 60000 : null })
  }

  if (!work) return <p role="status">Entwurf wird geladen …</p>

  return (
    <section className={styles.panel}>
      <h2>{isTest ? 'Ein unerwarteter Besuch' : 'Ein Geräusch auf dem Dachboden'}</h2>
      <p>{isTest ? 'Als es spät an der Tür klopft, steht draußen jemand, mit dem niemand gerechnet hat. Erzähle, was passiert und wie die Situation endet.'
        : 'Eine Figur hört auf dem Dachboden ein Geräusch. Erzähle, was sie entdeckt, wie sie reagiert und wie die Geschichte ausgeht.'}</p>
      <ol className={styles.storySteps} aria-label="Schreibphasen">
        <li aria-current={step === 'plan' ? 'step' : undefined}>Schreibplan · 15 Min.</li>
        <li aria-current={step === 'write' ? 'step' : undefined}>Geschichte · 45 Min.</li>
        <li aria-current={step === 'review' ? 'step' : undefined}>Selbstkontrolle</li>
      </ol>
      {isTest && step === 'plan' && !deadline ? (
        <button className={styles.primary} onClick={() => { const start = Date.now(); setNow(start); save({ deadline: start + 15 * 60000 }) }}>Schreibtest starten</button>
      ) : <>
        {seconds !== null && step !== 'review' && <p className={styles.timer} role={seconds === 0 ? 'status' : undefined}>
          {seconds > 0 ? `Restzeit: ${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}` : 'Zeit abgelaufen'}
        </p>}
        {step === 'plan' ? (
          <div className={styles.planFields}>
            {planFields.map(([id, title, hint]) => <label className={styles.storyLabel} key={id}>
              {title}{!isTest && <small>{hint}</small>}<textarea value={plan[id] ?? ''} rows={3} maxLength={2000}
                readOnly={isTest && seconds === 0} onChange={event => save({ plan: { ...plan, [id]: event.target.value } })} />
            </label>)}
          </div>
        ) : <>
          <details className={styles.fallback}><summary>Mein Schreibplan</summary>
            <dl>{planFields.map(([id, title]) => <div key={id}><dt>{title}</dt><dd>{plan[id] || '–'}</dd></div>)}</dl>
          </details>
          <label className={styles.storyLabel}>Deine Geschichte<textarea value={text} onChange={event => save({ text: event.target.value })}
            rows={12} maxLength={18000} readOnly={step === 'review' || (isTest && seconds === 0)} /></label>
          <p>{text.trim() ? text.trim().split(/\s+/).length : 0} Wörter</p>
        </>}
        {step === 'review' ? <>
          <h3>Selbstkontrolle</h3>
          <fieldset className={styles.checklist}><legend>Prüfe deine Geschichte</legend>
            {writingChecks.map(item => <label key={item}><input type="checkbox" />{item}</label>)}
          </fieldset>
          {!isTest && <button className={styles.secondary} onClick={() => save({ step: 'write' })}>Text überarbeiten</button>}
          {isTest && <button className={styles.secondary} onClick={() => {
            if (window.confirm('Neuen Schreibtest beginnen und den bisherigen Entwurf ersetzen?')) save({ step: 'plan', plan: {}, text: '', deadline: null })
          }}>Neuen Schreibtest beginnen</button>}
        </> : <div className={styles.row}>
          {!isTest && step === 'write' && <button className={styles.secondary} onClick={() => save({ step: 'plan' })}>Schreibplan bearbeiten</button>}
          <button className={styles.primary} onClick={advance} disabled={step === 'write' && !text.trim() && seconds !== 0}>
            {step === 'plan' ? 'Zur Geschichte' : isTest ? 'Geschichte abgeben' : 'Geschichte überprüfen'}
          </button>
        </div>}
      </>}
      <small role="status">{storageError ? 'Entwurf konnte nicht gespeichert werden.' : 'Der Entwurf wird in diesem Browser gespeichert.'}</small>
    </section>
  )
}

export default function DeutschTraining({ area, isTest }) {
  const [set, setSet] = useState(null)
  const dictation = area === 'diktat'
  if (area === 'geschichte') return <Story isTest={isTest} />
  if (isTest) return <Round set={dictation ? dictationTest : grammarTest} dictation={dictation} isTest />
  return set ? <Round key={set.name} set={set} dictation={dictation} onExit={() => setSet(null)} /> : (
    <>
      <section className={styles.panel}>
        <h2>{dictation ? 'Wortliste wählen' : 'Station wählen'}</h2>
        <div className={styles.listPicker}>
          {(dictation ? dictations : grammar).map(item => <button className={styles.secondary} key={item.name} onClick={() => setSet(item)}>
            {item.name}
          </button>)}
        </div>
      </section>
      {dictation ? <details className={styles.wordLists}><summary>Vier Wortlisten ansehen</summary><WordLists /></details>
        : <div className={styles.families}>{grammar.map(station => <section key={station.name}><h3>{station.name}</h3><p>{station.note}</p></section>)}</div>}
    </>
  )
}
