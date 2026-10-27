'use client'
import { useMemo, useState } from 'react'
import { getWritingExercises, checkTranslation } from './shortExercises'
import styles from './shortExercises.module.css'

function Sentence({ exercise, index, saved, onSave }) {
  const [text, setText] = useState(saved?.text || '')
  const [checked, setChecked] = useState(!!saved?.checkedAt)
  const matched = checked && checkTranslation(exercise, text)
  function save(submitted) {
    const submittedText = submitted && text.trim()
    if ((saved?.text || '') === text && !!saved?.checkedAt === !!submittedText) { setChecked(!!submittedText); return }
    const checkedAt = submittedText ? new Date().toISOString() : null
    onSave({ id: exercise.id, exerciseId: exercise.id, kind: 'translation', task: exercise.fa, text, checkedAt })
    setChecked(!!checkedAt)
  }
  return <form className={styles.sentenceCard} onSubmit={event => { event.preventDefault(); save(true) }}>
    <div className={styles.sentenceHeading}><span>{String(index + 1).padStart(2, '0')}</span><p lang="fa" dir="rtl">{exercise.fa}</p></div>
    <div className={styles.sentenceEntry}>
      <input type="text" lang="de" dir="ltr" aria-label={`Dein deutscher Satz ${index + 1}`} value={text} onChange={event => { setText(event.target.value); setChecked(false) }} onBlur={() => save(checked)} autoComplete="off" />
      <button type="submit" disabled={!text.trim()}>Prüfen</button>
    </div>
    {checked && <div className={styles.sentenceFeedback} role="status">
      <strong>{matched ? 'Richtig' : 'Mögliche Lösung'}</strong>
      <p lang="de">{matched ? exercise.answers.find(answer => checkTranslation({ answers: [answer] }, text)) : exercise.answers[0]}</p>
    </div>}
  </form>
}
export default function ShortWriting({ lesson, writings, onSave }) {
  const exercises = useMemo(() => getWritingExercises(lesson), [lesson])
  const completed = exercises.filter(exercise => writings.some(item => item.id === exercise.id && item.checkedAt && item.text?.trim())).length
  return <article className={styles.writing}>
    <header><h2>Fünf kurze Sätze</h2><span>Persisch → Deutsch</span></header>
    <p className={styles.writingProgress}>{completed} von 5 Sätzen geübt</p>
    {exercises.map((exercise, index) => <Sentence key={exercise.id} exercise={exercise} index={index} saved={writings.find(item => item.id === exercise.id)} onSave={value => onSave({ ...value, lessonId: lesson.id })} />)}
  </article>
}
