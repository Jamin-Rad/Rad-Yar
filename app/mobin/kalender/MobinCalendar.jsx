'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import {
  berlinStudyDay, mergeLegacyMathSessions, mergeStudySessions,
  readLocalLegacyMathSessions, readLocalStudySessions, studySummary,
} from '@/lib/mobinStudyTime'
import styles from './calendar.module.css'

const modes = { week: 'Wochen', month: 'Monate', year: 'Jahre' }
const weekdays = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']
const key = date => date.toISOString().slice(0, 10)
const dateOf = value => new Date(value + 'T12:00:00Z')
const dateAt = (year, month, day = 1) => new Date(Date.UTC(year, month, day, 12))
const shift = (date, days) => dateAt(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + days)
const monday = date => shift(date, -((date.getUTCDay() + 6) % 7))
const daysOfWeek = date => Array.from({ length: 7 }, (_, index) => shift(date, index))
const monthName = new Intl.DateTimeFormat('de-DE', { month: 'long', timeZone: 'UTC' })
const monthYear = new Intl.DateTimeFormat('de-DE', { month: 'long', year: 'numeric', timeZone: 'UTC' })
const shortDate = new Intl.DateTimeFormat('de-DE', { day: 'numeric', month: 'numeric', timeZone: 'UTC' })
const fullDate = new Intl.DateTimeFormat('de-DE', { dateStyle: 'full', timeZone: 'UTC' })

function weeksOfMonth(date) {
  const first = dateAt(date.getUTCFullYear(), date.getUTCMonth())
  const next = dateAt(date.getUTCFullYear(), date.getUTCMonth() + 1)
  const weeks = []
  for (let start = monday(first); start < next; start = shift(start, 7)) {
    weeks.push(daysOfWeek(start))
  }
  return weeks
}

function weekNumber(start) {
  const thursday = shift(start, 3)
  const firstMonday = monday(dateAt(thursday.getUTCFullYear(), 0, 4))
  return 1 + Math.round((start - firstMonday) / 604800000)
}

export default function MobinCalendar({ initialView = 'month', embedded = false }) {
  const [view, setView] = useState(initialView)
  const [today, setToday] = useState('')
  const [cursor, setCursor] = useState('')
  const [local, setLocal] = useState({ sessions: [], mathSessions: [] })
  const [remote, setRemote] = useState(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const controller = new AbortController()
    const current = berlinStudyDay()
    setToday(current)
    setCursor(current)
    function readLocal() {
      setLocal({ sessions: readLocalStudySessions(), mathSessions: readLocalLegacyMathSessions() })
    }
    readLocal()
    window.addEventListener('mobin-study-time', readLocal)
    fetch('/api/mobin/study-time', { cache: 'no-store', signal: controller.signal })
      .then(response => {
        if (!response.ok) throw new Error()
        return response.json()
      })
      .then(data => {
        setRemote(data)
        setFailed(Boolean(data.localOnly))
      })
      .catch(error => { if (error.name !== 'AbortError') setFailed(true) })
    return () => {
      controller.abort()
      window.removeEventListener('mobin-study-time', readLocal)
    }
  }, [])

  const summary = useMemo(() => {
    const sessions = mergeStudySessions(remote?.sessions, local.sessions)
    const math = mergeLegacyMathSessions(remote?.mathSessions, local.mathSessions)
    const allDays = new Set(sessions.map(session => session.day))
    math.forEach(session => Object.keys(session.studyDays).forEach(day => allDays.add(day)))
    return studySummary(sessions, [...allDays], math)
  }, [remote, local])

  const Container = embedded ? 'section' : 'main'
  const Heading = embedded ? 'h2' : 'h1'
  if (!cursor) return <Container className={styles.shell} data-embedded={embedded}><p role="status">Kalender wird geladen …</p></Container>
  const date = dateOf(cursor)
  const currentWeek = key(monday(dateOf(today)))
  const week = daysOfWeek(monday(date))
  const monthWeeks = weeksOfMonth(date)
  const year = date.getUTCFullYear()
  const month = date.getUTCMonth()
  const monthDays = monthWeeks.flat().filter(item => item.getUTCMonth() === month)
  const yearMonths = Array.from({ length: 12 }, (_, index) => dateAt(year, index))
  const minutes = dates => Math.floor(dates.reduce((total, item) => total + (summary[key(item)]?.total ?? 0), 0) / 60)
  const title = view === 'week' ? shortDate.format(week[0]) + ' – ' + shortDate.format(week[6]) + ' ' + week[6].getUTCFullYear()
    : view === 'month' ? monthYear.format(date) : String(year)

  function navigate(direction) {
    if (view === 'week') setCursor(key(shift(date, direction * 7)))
    else if (view === 'month') setCursor(key(dateAt(year, month + direction)))
    else setCursor(key(dateAt(year + direction, month)))
  }

  function dayCell(item, outside = false) {
    const id = key(item)
    const isToday = id === today
    return <div className={styles.day} key={id} data-today={isToday} data-outside={outside}
      aria-current={isToday ? 'date' : undefined} aria-label={fullDate.format(item) + ', ' + minutes([item]) + ' Minuten gelernt'}>
      <time dateTime={id}>{item.getUTCDate()}</time>
      <span>{minutes([item])} Min.</span>
    </div>
  }

  return <Container className={styles.shell} data-embedded={embedded} aria-label={embedded ? 'Kalenderübersicht' : undefined}>
    <div className={styles.wrap}>
      {!embedded && <Link className={styles.back} href="/mobin?bereich=1">← Mobin</Link>}
      <header className={styles.header}>
        <Heading>Kalender</Heading>
        <div className={styles.views} aria-label="Kalenderansicht">
          {Object.entries(modes).map(([id, label]) => <button key={id} aria-pressed={view === id} onClick={() => setView(id)}>{label}</button>)}
        </div>
      </header>
      <div className={styles.toolbar}>
        <button aria-label="Vorheriger Zeitraum" onClick={() => navigate(-1)}>‹</button>
        <div aria-live="polite"><h2>{title}</h2>
          {view !== 'year' && <p>{minutes(view === 'week' ? week : monthDays)} Min. gelernt</p>}
        </div>
        <button aria-label="Nächster Zeitraum" onClick={() => navigate(1)}>›</button>
        <button className={styles.todayButton} onClick={() => setCursor(today)}>Heute</button>
      </div>
      {!remote && !failed && <p className={styles.status} role="status">Lernzeiten werden geladen …</p>}
      {failed && <p className={styles.status} role="status">Online-Lernzeiten sind gerade nicht verfügbar. Du siehst die Zeiten von diesem Gerät.</p>}
      {view !== 'year' ? <div className={styles.calendar}>
        <div className={styles.dayGrid}>{weekdays.map(label => <span className={styles.weekday} key={label}>{label}</span>)}</div>
        {view === 'week' ? <div className={styles.weekBox}><div className={styles.dayGrid}>{week.map(item => dayCell(item))}</div></div>
          : monthWeeks.map(items => <section className={styles.weekBox} key={key(items[0])} aria-label={'Kalenderwoche ' + weekNumber(items[0])}>
            <div className={styles.dayGrid}>{items.map(item => dayCell(item, item.getUTCMonth() !== month))}</div>
            <p className={styles.weekTotal}>KW {weekNumber(items[0])} · {minutes(items.filter(item => item.getUTCMonth() === month))} Min. gelernt</p>
          </section>)}
      </div> : <div className={styles.yearGrid}>{yearMonths.map(item => {
        const index = item.getUTCMonth()
        const weeks = weeksOfMonth(item)
        const inMonth = dates => dates.filter(date => date.getUTCMonth() === index)
        return <section className={styles.monthBox} key={index}>
          <h3>{monthName.format(item)}</h3>
          <p>{minutes(inMonth(weeks.flat()))} Min. gelernt</p>
          <div className={styles.monthWeeks}>{weeks.map(dates => {
            const start = key(dates[0])
            const isCurrent = start === currentWeek && today.slice(0, 7) === key(item).slice(0, 7)
            return <div key={start} className={styles.miniWeek} data-today={isCurrent} aria-current={isCurrent ? 'date' : undefined}>
              <span>KW {weekNumber(dates[0])}</span><strong>{minutes(inMonth(dates))} Min.</strong>
            </div>
          })}</div>
        </section>
      })}</div>}
    </div>
  </Container>
}
