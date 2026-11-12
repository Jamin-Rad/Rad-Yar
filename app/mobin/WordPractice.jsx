'use client'
import { useEffect, useState } from 'react'
import styles from './learning.module.css'

export default function WordPractice({ language, starter = [] }) {
  const storage = 'mobin-word-practice-' + language
  const [cards, setCards] = useState(starter)
  const [round, setRound] = useState([])
  const [index, setIndex] = useState(0)
  const [mode, setMode] = useState('')
  const [answer, setAnswer] = useState('')
  const [revealed, setRevealed] = useState(false)
  const [score, setScore] = useState(0)
  const [notice, setNotice] = useState('')
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(storage) || 'null')
      if (Array.isArray(saved)) setCards(saved)
    } catch {}
  }, [storage])
  function save(next) {
    try {
      localStorage.setItem(storage, JSON.stringify(next))
      setCards(next)
      setNotice('')
    } catch { setNotice('Die Karten konnten auf diesem Gerät nicht gespeichert werden.') }
  }
  function begin(nextMode) {
    setRound([...cards]); setMode(nextMode); setIndex(0); setScore(0); setAnswer(''); setRevealed(false)
  }
  const card = round[index]
  const normalize = value => value.trim().normalize('NFC').toLocaleLowerCase()
  const correct = card && normalize(answer) === normalize(card[1])
  return <section className={styles.panel} aria-label="Freies Training">
    <h2>Freies Training</h2>
    <form className={styles.controls} onSubmit={event => {
      event.preventDefault()
      const fields = new FormData(event.currentTarget)
      const front = String(fields.get('front')).trim()
      const back = String(fields.get('back')).trim()
      if (!front || !back || cards.length >= 200) return
      save([...cards, [front, back]])
      event.currentTarget.reset()
    }}>
      <label>Deutsch<input name="front" required maxLength={120} /></label>
      <label>{language}<input name="back" required maxLength={120} /></label>
      <button type="submit" disabled={cards.length >= 200}>Karte hinzufügen</button>
    </form>
    {notice && <p role="status">{notice}</p>}
    {cards.length > 0 && <details><summary>{cards.length} Karten</summary><ul>{cards.map(([front, back], i) => <li key={i}>
      {front} · {back} <button type="button" onClick={() => save(cards.filter((_, n) => n !== i))}>Entfernen</button>
    </li>)}</ul></details>}
    <div className={styles.controls}>
      <button disabled={!cards.length} onClick={() => begin('cards')}>Karteikarten lernen</button>
      <button disabled={!cards.length} onClick={() => begin('test')}>Eigenen Vokabeltest starten</button>
    </div>
    {mode && (card ? <div className={styles.exercise}>
      <p>{index + 1} / {round.length}</p>
      <strong>{card[0]}</strong>
      {mode === 'test' && <label>Deine Übersetzung<input value={answer} onChange={event => setAnswer(event.target.value)} readOnly={revealed} /></label>}
      {revealed && <p role="status">{mode === 'test' && (correct ? 'Richtig · ' : 'Lösung · ')}{card[1]}</p>}
      {!revealed ? <button disabled={mode === 'test' && !answer.trim()} onClick={() => setRevealed(true)}>{mode === 'test' ? 'Antwort prüfen' : 'Karte umdrehen'}</button>
        : <button onClick={() => {
          if (mode === 'test' && correct) setScore(score + 1)
          setIndex(index + 1); setAnswer(''); setRevealed(false)
        }}>{index + 1 === round.length ? 'Runde abschließen' : 'Weiter'}</button>}
    </div> : <p role="status">{mode === 'test' ? score + ' von ' + round.length + ' richtig.' : 'Alle Karten angesehen.'}</p>)}
  </section>
}
