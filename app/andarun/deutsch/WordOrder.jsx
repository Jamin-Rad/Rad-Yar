'use client'
import { useState } from 'react'
import { checkWordOrder, shuffledTokens } from './shortExercises'
import styles from './shortExercises.module.css'

export default function WordOrder({ item, answered, onAnswer }) {
  const [pool] = useState(() => shuffledTokens(item))
  const [chosen, setChosen] = useState([])
  const chosenIds = new Set(chosen.map(token => token.id))
  return <div className={styles.wordOrder}>
    <div className={styles.assembled} role="group" aria-label="Dein Satz">
      {!chosen.length && <span aria-hidden="true">…</span>}
      {chosen.map((token, index) => <button type="button" key={token.id} disabled={answered} aria-label={`Wort ${index + 1} entfernen: ${token.text}`} onClick={() => setChosen(words => words.filter(word => word.id !== token.id))}>{token.text}</button>)}
    </div>
    <div className={styles.wordPool} role="group" aria-label="Wörter">
      {pool.filter(token => !chosenIds.has(token.id)).map(token => <button type="button" key={token.id} disabled={answered} aria-label={`Wort hinzufügen: ${token.text}`} onClick={() => setChosen(words => [...words, token])}>{token.text}</button>)}
    </div>
    {!answered && <button type="button" className={styles.checkOrder} disabled={chosen.length !== pool.length} onClick={() => onAnswer(checkWordOrder(item, chosen) ? 0 : 1)}>Prüfen</button>}
  </div>
}
