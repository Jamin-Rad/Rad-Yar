'use client'

import { useEffect, useState } from 'react'
import styles from './deutsch.module.css'
import { dictations, families, grammar, storyWords } from './exercises'

const tiles = [
  { id: 'diktat', title: 'Minidiktat', detail: '4 Wortlisten · 20 Wörter und Wendungen' },
  { id: 'grammatik', title: 'Grammatik', detail: '16 Aufgaben · ss, ß und Wortformen' },
  { id: 'geschichte', title: 'Geschichte schreiben', detail: 'Schreibauftrag · Wortbank und Checkliste' },
]
const storyKey = 'mobin-deutsch-geschichte-2026-11-20'

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

function Round({ set, dictation, onExit }) {
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
      setFeedback({ question, value: submitted, correct: graded === question.answer })
    }
  }

  if (!question) {
    const mistakes = answers.filter(item => !item.correct)
    return <section className={styles.panel}>
      <button className={styles.link} onClick={onExit}>← Zur Auswahl</button>
      <h2>Auswertung</h2>
      <p className={styles.score}>{answers.length - mistakes.length}/{answers.length} richtig</p>
      {mistakes.length > 0 ? <>
        <button className={styles.primary} onClick={() => { setQuestions(mistakes.map(item => item.question)); setAnswers([]) }}>Fehler wiederholen</button>
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
      <div className={styles.row}><button className={styles.link} onClick={onExit}>← Zur Auswahl</button><span>Aufgabe {index + 1}/{questions.length}</span></div>
      <progress className={styles.progress} value={index + Number(Boolean(feedback))} max={questions.length} aria-label="Fortschritt" />
      <h2>{set.name}</h2>
      {dictation ? <>
        <p>Hör zu und schreibe das Wort oder die Wendung genau auf.</p>
        <button className={styles.secondary} type="button" onClick={listen}>Vorlesen</button>
        {audioError && <p role="status">Die Sprachausgabe ist hier nicht verfügbar. Jemand kann dir das Wort vorlesen.</p>}
        <details className={styles.fallback} key={index}><summary>Text für eine Vorleseperson</summary><p>{question.answer}</p></details>
      </> : <>
        <p>{question.prompt.includes('__') ? 'Setze ss oder ß ein.' : question.prompt}</p>
        <p className={styles.prompt}>{question.example ?? (question.prompt.includes('__') ? question.prompt : null)}</p>
      </>}
      <form onSubmit={next} className={styles.exercise}>
        <label>Deine Antwort<input key={index} value={value} onChange={e => setValue(e.target.value)}
          readOnly={Boolean(feedback)} autoCapitalize="none" autoCorrect="off" spellCheck={false} autoComplete="off" /></label>
        {!dictation && question.prompt.includes('__') && !feedback && <div className={styles.row}>
          {['ss', 'ß'].map(ending => <button type="button" key={ending} className={styles.secondary}
            aria-pressed={value === ending} onClick={() => setValue(ending)}>{ending}</button>)}
        </div>}
        <div aria-live="polite">{feedback && <div className={styles.feedback} data-correct={feedback.correct}>
          <strong>{feedback.correct ? 'Richtig!' : 'Richtig wäre: ' + question.answer}</strong>
          {question.explanation && <p>{question.explanation}</p>}
        </div>}</div>
        <button className={styles.primary} disabled={!value.trim()}>
          {!feedback ? 'Antwort prüfen' : index + 1 === questions.length ? 'Auswertung anzeigen' : 'Weiter'}
        </button>
      </form>
    </section>
  )
}

function Story() {
  const [draft, setDraft] = useState(() => {
    try { return window.localStorage.getItem(storyKey) ?? '' } catch { return '' }
  })
  const [review, setReview] = useState(false)
  const [saved, setSaved] = useState(null)

  function write(text) {
    setDraft(text)
    try { localStorage.setItem(storyKey, text); setSaved(true) } catch { setSaved(false) }
  }

  return <section className={styles.panel}>
    <h2>Der Schlüssel am Fluss</h2>
    <p>Du findest am Fluss einen Schlüssel. Er passt zu einem Schloss, das du bisher übersehen hast. Was öffnet sich und welche Entscheidung musst du danach treffen?</p>
    <p>Verwende mindestens vier Wörter oder Wendungen aus der Wortbank.</p>
    <ul className={styles.wordBank}>{storyWords.map(word => <li key={word}>{word}</li>)}</ul>
    <label className={styles.storyLabel}>Deine Geschichte<textarea value={draft} onChange={e => write(e.target.value)} rows={10} maxLength={18000} /></label>
    <div className={styles.row}>
      <span>{draft.trim() ? draft.trim().split(/\s+/).length : 0} Wörter</span>
      <span role="status">{saved === true ? 'Entwurf in diesem Browser gespeichert' : saved === false ? 'Entwurf konnte nicht gespeichert werden' : ''}</span>
    </div>
    <button className={styles.primary} type="button" disabled={!draft.trim()} aria-expanded={review} onClick={() => setReview(!review)}>Geschichte überprüfen</button>
    {review && <fieldset className={styles.checklist}><legend>Checkliste</legend>
      {['Der Anfang zeigt, wer am Fluss ist und wie der Schlüssel auftaucht.', 'Im Hauptteil passiert etwas Unerwartetes.', 'Der Schluss zeigt, wie die Figur sich entscheidet.', 'Ich habe mindestens vier Wörter aus der Wortbank verwendet.', 'Ich habe Nomen, Satzanfänge sowie ss und ß kontrolliert.'].map(item =>
        <label key={item}><input type="checkbox" />{item}</label>
      )}
    </fieldset>}
  </section>
}

export default function DeutschTraining() {
  const [active, setActive] = useState(null)
  const [set, setSet] = useState(null)
  return (
    <>
      <nav className={styles.tiles} aria-label="Übungsbereiche">
        {tiles.map(tile => <button type="button" key={tile.id} aria-pressed={active === tile.id} onClick={() => { setActive(tile.id); setSet(null) }}>
          <strong>{tile.title}</strong><small>{tile.detail}</small>
        </button>)}
      </nav>
      {active === 'geschichte' ? <Story /> : set ? (
        <Round key={set.name} set={set} dictation={active === 'diktat'} onExit={() => setSet(null)} />
      ) : active === 'diktat' ? <section className={styles.panel}>
        <h2>Wortliste wählen</h2>
        <div className={styles.listPicker}>{dictations.map(set => <button className={styles.secondary} key={set.name} onClick={() => setSet(set)}>{set.name}</button>)}</div>
      </section> : active === 'grammatik' ? <section className={styles.panel}>
        <h2>Wortfamilien und Rechtschreibung</h2>
        <p>Beim stimmlosen s-Laut steht nach einem kurzen Vokal oft ss. Nach einem langen Vokal oder Doppellaut steht ß, wenn kein weiterer Konsonant im Wortstamm folgt.</p>
        <p><strong>der Fluss → fließen</strong> · <strong>genießen → der Genuss</strong> · <strong>wissen → ich weiß</strong></p>
        <button className={styles.primary} onClick={() => setSet(grammar[0])}>Grammatik starten</button>
      </section> : null}
      {!set && <details className={styles.wordLists}><summary>Vier Wortlisten ansehen</summary><WordLists /></details>}
    </>
  )
}
