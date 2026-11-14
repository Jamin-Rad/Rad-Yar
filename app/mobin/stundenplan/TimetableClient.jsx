'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { berlinStudyDay } from '@/lib/mobinStudyTime'
import UntisConnect, { useUntis } from '../UntisConnect'
import styles from '../learning.module.css'

const days = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag']
const storeKey = 'mobin-timetable-v1'
const dateLabel = new Intl.DateTimeFormat('de-DE', { day: 'numeric', month: 'numeric', timeZone: 'UTC' })

const views = { day: 'Tag', week: 'Woche', month: 'Monat', year: 'Jahr' }
const monthFormat = new Intl.DateTimeFormat('de-DE', { month: 'long', year: 'numeric', timeZone: 'UTC' })
const dayFormat = new Intl.DateTimeFormat('de-DE', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'UTC' })
const key = date => date.toISOString().slice(0, 10)
const shift = (date, days) => new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + days, 12))
const weekday = date => (date.getUTCDay() + 6) % 7
const makeDate = (year, month, day = 1) => new Date(Date.UTC(year, month, day, 12))

export default function TimetableClient() {
  const untis = useUntis('timetable')
  const [local, setLocal] = useState({ photo: '', lessons: [] })
  const [view, setView] = useState('week')
  const [cursor, setCursor] = useState('')
  const [tests, setTests] = useState([])
  const [notice, setNotice] = useState('')
  useEffect(() => {
    setCursor(berlinStudyDay())
    try {
      setTests(['Mathe', 'Englisch', 'Latein'].flatMap(subject => {
        const entries = JSON.parse(localStorage.getItem('mobin-school-tests:' + subject) || '[]')
        return Array.isArray(entries) ? entries.map(test => ({ ...test, subject })) : []
      }))
    } catch {}
    try {
      const saved = JSON.parse(localStorage.getItem(storeKey) || 'null')
      if (saved) setLocal(saved)
    } catch {}
  }, [])
  function save(next) {
    try {
      localStorage.setItem(storeKey, JSON.stringify(next))
      setLocal(next)
      setNotice('')
    } catch { setNotice('Der Stundenplan konnte nicht auf diesem Gerät gespeichert werden.') }
  }
  const connected = untis.data?.connected
  const today = berlinStudyDay()
  const date = new Date((cursor || today) + 'T12:00:00Z')
  const year = date.getUTCFullYear()
  const month = date.getUTCMonth()
  const monday = shift(date, -weekday(date))
  const week = Array.from({ length: 7 }, (_, i) => shift(monday, i))
  const first = makeDate(year, month)
  const monthDays = Array.from({ length: makeDate(year, month + 1, 0).getUTCDate() }, (_, i) => makeDate(year, month, i + 1))
  const imported = connected ? untis.data.events : []
  const title = view === 'day' ? dayFormat.format(date) : view === 'week' ? dateLabel.format(week[0]) + ' – ' + dateLabel.format(week[6])
    : view === 'month' ? monthFormat.format(date) : String(year)

  function navigate(direction) {
    const next = view === 'day' ? shift(date, direction) : view === 'week' ? shift(date, direction * 7)
      : view === 'month' ? makeDate(year, month + direction) : makeDate(year + direction, month)
    setCursor(key(next))
  }

  function dayEntries(item) {
    const id = key(item)
    const lessons = connected ? imported.filter(event => event.day === id) : local.lessons.filter(lesson => lesson.day === weekday(item))
    const schoolTests = tests.filter(test => test.date === id).map(test => ({
      time: test.period + '. Std.', title: test.subject + ' · ' + test.title,
      kind: test.kind === 'vocabulary' ? 'Vokabeltest' : 'Klassenarbeit',
    }))
    return [...lessons, ...schoolTests]
  }

  return <main className={styles.shell}><div className={styles.wrap}>
    <Link className={styles.back} href="/mobin?bereich=1">← Mobin</Link>
    <header className={styles.learningHero}><h1>Stundenplan</h1></header>
    {notice && <p role="status">{notice}</p>}
    <section className={styles.panel} aria-label="Unterricht">
      <div className={styles.actions} aria-label="Stundenplanansicht">
        {Object.entries(views).map(([id, label]) => <button key={id} aria-pressed={view === id} onClick={() => setView(id)}>{label}</button>)}
      </div>
      <div className={styles.heading}><h2>{title}</h2>
        <div className={styles.actions}><button aria-label="Vorheriger Zeitraum" onClick={() => navigate(-1)}>‹</button>
        <button onClick={() => setCursor(today)}>Heute</button><button aria-label="Nächster Zeitraum" onClick={() => navigate(1)}>›</button></div>
      </div>
      {(view === 'day' || view === 'week') && <div className={styles.timetable} data-view={view}>{(view === 'day' ? [date] : week).map(item => {
        const entries = dayEntries(item)
        return <section key={key(item)} data-today={key(item) === today}><h3>{dayFormat.format(item)}</h3>
          {entries.length ? <ul>{entries.map((lesson, i) => <li key={i}>
            <span>{lesson.time}{lesson.end && '–' + lesson.end}{lesson.kind && ' · ' + lesson.kind}</span>
            <strong>{lesson.cancelled && 'Entfällt · '}{lesson.title}</strong>
            {!connected && local.lessons.includes(lesson) && <button aria-label={lesson.title + ' entfernen'} onClick={() => save({ ...local, lessons: local.lessons.filter(item => item !== lesson) })}>×</button>}
          </li>)}</ul> : <p>{weekday(item) > 4 ? 'Wochenende' : 'Kein Unterricht eingetragen'}</p>}
        </section>
      })}</div>}
      {view === 'month' && <div className={styles.timetableMonth}>
        {['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map(label => <span key={label}>{label}</span>)}
        {Array.from({ length: weekday(first) }, (_, index) => <span key={'pad' + index} />)}
        {monthDays.map(item => {
          const entries = dayEntries(item)
          return <button key={key(item)} data-today={key(item) === today} data-weekend={weekday(item) > 4}
            onClick={() => { setCursor(key(item)); setView('day') }}>
            <strong>{item.getUTCDate()}</strong>
            <small>{entries.some(event => event.kind || /prüfung|klassenarbeit|test|ferien/i.test(event.title))
              ? 'Termin' : entries.length ? entries.length + ' Eintr.' : ''}</small>
          </button>
        })}
      </div>}
      {view === 'year' && <div className={styles.timetableYear}>{Array.from({ length: 12 }, (_, index) => {
        const item = makeDate(year, index)
        return <button key={index} onClick={() => { setCursor(key(item)); setView('month') }}>{monthFormat.format(item)}</button>
      })}</div>}
    </section>
    <details className={styles.panel}><summary>Unterrichtsquellen</summary>
      <UntisConnect state={untis} update />
      <p><a className={styles.back} href="https://moodle.privates-gymnasium.de/login/index.php" target="_blank" rel="noreferrer">Moodle des PG öffnen ↗</a></p>
    </details>
    {!connected && <section className={styles.panel}>
      <h2>Stunden eintragen</h2>
      {local.photo && <details open><summary>Fotografierter Stundenplan</summary><img className={styles.timetablePhoto} src={local.photo} alt="Fotografierter Stundenplan" /></details>}

      <form className={styles.controls} onSubmit={event => {
        event.preventDefault()
        const form = new FormData(event.currentTarget)
        const title = String(form.get('title')).trim()
        const time = form.get('time')
        const end = form.get('end')
        if (!title || (end && end <= time)) { setNotice('Bitte prüfe Fach, Beginn und Ende.'); return }
        save({ ...local, lessons: [...local.lessons, { day: Number(form.get('day')), time, end, title }].sort((a, b) => a.time.localeCompare(b.time)) })
        event.currentTarget.reset()
      }}>
        <label>Tag<select name="day">{days.map((name, i) => <option key={name} value={i}>{name}</option>)}</select></label>
        <label>Beginn<input type="time" name="time" required /></label>
        <label>Ende<input type="time" name="end" /></label>
        <label>Fach<input name="title" maxLength={80} required /></label>
        <button>Hinzufügen</button>
      </form>
    </section>}
  </div></main>
}
