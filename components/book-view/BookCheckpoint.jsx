'use client'

import { useState } from 'react'
import { BOOK_COPY, useLessonView } from './BookViewContext'
import { mappedQuestions } from './pagination.mjs'
import styles from './BookView.module.css'

function Question({ question, copy }) {
  const [selected, setSelected] = useState('')
  const [checked, setChecked] = useState(false)
  const correct = selected === question.correct
  return <fieldset className={styles.question} data-book-atomic data-book-question={question.id}>
    <legend>{question.question}</legend>
    <div className={styles.options}>{question.options.map(option => <label key={option.id} data-result={checked && option.id === question.correct ? 'correct' : checked && option.id === selected ? 'incorrect' : undefined}>
      <input type="radio" name={`book-${question.id}`} value={option.id} checked={selected === option.id} disabled={checked} onChange={() => setSelected(option.id)} />
      <span><b>{option.id}</b>{option.text}</span>
    </label>)}</div>
    {checked ? <div className={styles.feedback} role="status"><strong>{correct ? '✓ ' + copy.correct : copy.incorrect + ' · ' + copy.answer + ': ' + question.correct}</strong><p>{question.explanation}</p>{!correct && question.wrongExplanations?.[selected] ? <p>{question.wrongExplanations[selected]}</p> : null}</div> : <button className={styles.checkAnswer} type="button" disabled={!selected} onClick={() => setChecked(true)}>{copy.check}</button>}
  </fieldset>
}
// Question objects are passed through unchanged. Missing/unverified mappings render nothing.
export default function BookCheckpoint({ questions, questionIds, lang = 'de' }) {
  const { mode } = useLessonView()
  const copy = BOOK_COPY[lang] || BOOK_COPY.de
  const mapped = mappedQuestions(questions, questionIds)
  if (mode !== 'book' || !mapped.length) return null
  return <aside className={styles.checkpoint} data-book-checkpoint>
    {mapped.map(question => <Question key={question.id} question={question} copy={copy} />)}
  </aside>
}
