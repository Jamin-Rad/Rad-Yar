'use client'
import { useEffect, useState } from 'react'
import styles from './learning.module.css'

export default function WordPractice({ language, starter = [], activity = null }) {
  const storage = 'mobin-word-practice-' + language
  const [cards, setCards] = useState(starter)
  const [round, setRound] = useState([])
  const [index, setIndex] = useState(0)
  const [mode, setMode] = useState('')
  useEffect(() => { setMode('') }, [activity])
  const [answer, setAnswer] = useState('')
  const [revealed, setRevealed] = useState(false)
  const [score, setScore] = useState(0)
  const [notice, setNotice] = useState('')
  const [level, setLevel] = useState('auto')
  const [autoLevel, setAutoLevel] = useState('1')
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(storage) || 'null')
      if (Array.isArray(saved)) setCards(saved)
      setAutoLevel(localStorage.getItem(storage + ':level') === '2' ? '2' : '1')
    } catch {}
  }, [storage])
  function save(next) {
    try {
      localStorage.setItem(storage, JSON.stringify(next))
      setCards(next)
      setNotice('')
    } catch { setNotice('Die Karten konnten auf diesem Gerät nicht gespeichert werden.') }
  }
  const effectiveLevel = level === 'auto' ? autoLevel : level
  const available = cards.filter(card => (card[2] || '1') === effectiveLevel)
  function begin(nextMode) {
    setRound([...available]); setMode(nextMode); setIndex(0); setScore(0); setAnswer(''); setRevealed(false)
  }
  const card = round[index]
  const normalize = value => value.trim().normalize('NFC').toLocaleLowerCase()
  const correct = card && normalize(answer) === normalize(card[1])
  return <section className={styles.panel} aria-label="Freies Training">
    <h2>{activity === 'cards' ? 'Karteikarten' : 'Freies Training'}</h2>
    <details><summary>Eigene Karte hinzufügen</summary><form className={styles.controls} onSubmit={event => {
      event.preventDefault()
      const fields = new FormData(event.currentTarget)
      const front = String(fields.get('front')).trim()
      const back = String(fields.get('back')).trim()
      if (!front || !back || cards.length >= 200) return
      save([...cards, [front, back, String(fields.get('level'))]])
      event.currentTarget.reset()
    }}>
      <label>Deutsch<input name="front" required maxLength={120} /></label>
      <label>{language}<input name="back" dir="auto" required maxLength={120} /></label>
      <label>Niveau der Karte<select name="level"><option value="1">Grundlagen</option><option value="2">Aufbau</option></select></label><button type="submit" disabled={cards.length >= 200}>Karte hinzufügen</button>
    </form></details>
    {notice && <p role="status">{notice}</p>}
    {cards.length > 0 && <details><summary>{cards.length} Karten</summary><ul>{cards.map(([front, back], i) => <li key={i}>
      {front} · {back} <button type="button" onClick={() => save(cards.filter((_, n) => n !== i))}>Entfernen</button>
    </li>)}</ul></details>}
    <div className={styles.controls}>
      <label>Übungsniveau<select value={level} onChange={event => { setLevel(event.target.value); setMode('') }}>
        <option value="auto">Automatisch</option><option value="1">Grundlagen</option><option value="2">Aufbau</option>
      </select></label>
      {activity !== 'test' && <button disabled={!available.length} onClick={() => begin('cards')}>Karteikarten lernen</button>}
      {activity !== 'cards' && <button disabled={!available.length} onClick={() => begin('test')}>Übungsrunde starten</button>}
    </div>
    {!available.length && <p>Füge Karten für dieses Niveau hinzu.</p>}
    {mode && (card ? <div className={styles.exercise}>
      <p>{index + 1} / {round.length}</p>
      <strong>{card[0]}</strong>
      {mode === 'test' && <label>Deine Übersetzung<input dir="auto" value={answer} onChange={event => setAnswer(event.target.value)} readOnly={revealed} /></label>}
      {revealed && <p role="status">{mode === 'test' && (correct ? 'Richtig · ' : 'Lösung · ')}<bdi>{card[1]}</bdi></p>}
      {!revealed ? <button disabled={mode === 'test' && !answer.trim()} onClick={() => setRevealed(true)}>{mode === 'test' ? 'Antwort prüfen' : 'Karte umdrehen'}</button>
        : <button onClick={() => {
          if (mode === 'test') {
            const nextScore = score + Number(correct)
            setScore(nextScore)
            if (level === 'auto' && index + 1 === round.length) {
              const nextLevel = nextScore / round.length >= .8 && cards.some(item => item[2] === '2') ? '2' : '1'
              setAutoLevel(nextLevel)
              try { localStorage.setItem(storage + ':level', nextLevel) } catch {}
            }
          }
          setIndex(index + 1); setAnswer(''); setRevealed(false)
        }}>{index + 1 === round.length ? 'Runde abschließen' : 'Weiter'}</button>}
    </div> : <p role="status">{mode === 'test' ? score + ' von ' + round.length + ' richtig.' : 'Alle Karten angesehen.'}</p>)}
  </section>
}
