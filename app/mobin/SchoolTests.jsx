'use client'
import { useEffect, useState } from 'react'
import styles from './learning.module.css'

export function useSchoolTests(subject) {
  const key = 'mobin-school-tests:' + subject
  const [tests, setTests] = useState([])
  const [error, setError] = useState('')
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(key) || '[]')
      if (Array.isArray(saved)) setTests(saved)
    } catch { setError('Die gespeicherten Tests konnten nicht gelesen werden.') }
  }, [key])
  function add(test) {
    try {
      const next = [...tests, { ...test, id: crypto.randomUUID() }].sort((a, b) => a.date.localeCompare(b.date) || a.period - b.period)
      localStorage.setItem(key, JSON.stringify(next))
      setTests(next)
      setError('')
      return true
    } catch {
      setError('Der Test konnte auf diesem Gerät nicht gespeichert werden.')
      return false
    }
  }
  return { tests, add, error }
}

export default function SchoolTests({ state, vocabulary = false, topics = [], kind, onDone }) {
  const [open, setOpen] = useState(Boolean(kind))
  const [selectedKind, setSelectedKind] = useState(kind || 'exam')
  const now = new Date()
  const schoolYear = now.getFullYear() - Number(now.getMonth() < 8)
  const defaultGrade = Math.min(13, Math.max(5, 6 + schoolYear - 2026))
  const category = selectedKind === 'vocabulary' ? 'Vokabeltest' : 'Klassenarbeit'
  const { tests, add, error } = state
  const shownTests = tests.filter(test => test.kind === selectedKind)
  return <section className={styles.panel} aria-label="Tests">
    <div className={styles.heading}><h2>Tests</h2>
      <button type="button" aria-expanded={open} onClick={() => setOpen(!open)}>＋ {vocabulary ? category : 'Prüfung'} hinzufügen</button>
    </div>
    {vocabulary && <div className={styles.actions} aria-label="Testart">
      <button type="button" aria-pressed={selectedKind === 'exam'} onClick={() => { setSelectedKind('exam'); setOpen(false) }}>Klassenarbeiten</button>
      <button type="button" aria-pressed={selectedKind === 'vocabulary'} onClick={() => { setSelectedKind('vocabulary'); setOpen(false) }}>Vokabeltests</button>
    </div>}
    {open && <form className={styles.testForm} onSubmit={event => {
      event.preventDefault()
      const form = new FormData(event.currentTarget)
      const title = String(form.get('title')).trim()
      if (!title) return
      const result = add({
        title, date: form.get('date'), period: Number(form.get('period')),
        kind: selectedKind, grade: Number(form.get('grade')),
        sources: String(form.get('sources')).trim(), material: String(form.get('material')).trim(),
        notes: String(form.get('notes')).trim(), topics: form.getAll('topics'),
      })
      if (result) { event.currentTarget.reset(); setOpen(false); onDone?.() }
    }}>
      <div className={styles.controls}>
        <label>Titel<input name="title" required maxLength={100} /></label>
        <label>Klasse<select name="grade" defaultValue={defaultGrade}>{[5, 6, 7, 8, 9, 10, 11, 12, 13].map(grade => <option key={grade}>{grade}</option>)}</select></label><label>Datum<input name="date" type="date" required /></label>
        <label>Schulstunde<input name="period" type="number" min="1" max="14" required /></label>
      </div>
      <a className={styles.back} href="https://moodle.privates-gymnasium.de/login/index.php" target="_blank" rel="noreferrer">Moodle des PG öffnen ↗</a>
      <label>Quellen oder Links<textarea name="sources" maxLength={2000} /></label>
      <label>Material und Lernstoff<textarea name="material" maxLength={4000} /></label>
      <label>Aufschriebe<textarea name="notes" maxLength={4000} /></label>
      {topics.length > 0 && <fieldset className={styles.testTopics}><legend>Passende Übungsthemen</legend>
        {topics.map(topic => <label key={topic.id}><input type="checkbox" name="topics" value={topic.id} />{topic.title}</label>)}
      </fieldset>}
      <button>Speichern</button>
    </form>}
    {error && <p role="status">{error}</p>}
    {shownTests.length ? <div className={styles.testList}>{shownTests.map(test => <details key={test.id}>
      <summary><strong>{test.title}</strong><span>{test.kind === 'vocabulary' ? 'Vokabeltest' : 'Klassenarbeit'} · {test.date.split('-').reverse().join('.')} · {test.period}. Stunde{test.grade ? ' · Klasse ' + test.grade : ''}</span></summary>
      {test.sources && <p><strong>Quellen</strong><br />{test.sources}</p>}
      {test.material && <p><strong>Material</strong><br />{test.material}</p>}
      {test.notes && <p><strong>Aufschriebe</strong><br />{test.notes}</p>}
    </details>)}</div> : <p>Für diese Testart ist noch nichts eingetragen.</p>}
  </section>
}
