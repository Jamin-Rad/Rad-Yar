'use client'

import { useEffect, useMemo, useState } from 'react'
import { berlinStudyDay, mergeLegacyMathSessions, mergeStudySessions, readLocalLegacyMathSessions, readLocalStudySessions, STUDY_SECTIONS, studySummary } from '@/lib/mobinStudyTime'
import styles from './study-dashboard.module.css'

const DAY_LABEL = new Intl.DateTimeFormat('de-DE', { timeZone: 'Europe/Berlin', weekday: 'short' })
const DATE_LABEL = new Intl.DateTimeFormat('de-DE', { timeZone: 'Europe/Berlin', day: '2-digit', month: '2-digit' })
const SECTION_ORDER = ['english', 'kangaroo', 'math', 'preparation']

function recentDays(count, today) {
  const start = new Date(`${today}T12:00:00Z`)
  return Array.from({ length: count }, (_, index) => {
    const date = new Date(start)
    date.setUTCDate(start.getUTCDate() - (count - index - 1))
    return { key: berlinStudyDay(date), date }
  })
}

function duration(seconds) {
  if (seconds < 60) return `${seconds} Sek.`
  const minutes = Math.round(seconds / 60)
  if (minutes < 60) return `${minutes} Min.`
  return `${Math.floor(minutes / 60)} Std. ${minutes % 60} Min.`
}

function allDayCount(sessions, mathSessions, today) {
  const keys = [...sessions.map(item => item.day), ...mathSessions.flatMap(item => Object.keys(item.studyDays || {}))].filter(Boolean).sort()
  if (!keys.length) return 14
  const first = new Date(`${keys[0]}T12:00:00Z`)
  const last = new Date(`${today}T12:00:00Z`)
  return Math.max(14, Math.round((last - first) / 86400000) + 1)
}

export default function MobinStudyDashboard() {
  const [sessions, setSessions] = useState([])
  const [mathSessions, setMathSessions] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [range, setRange] = useState(14)
  const [todayKey, setTodayKey] = useState(() => berlinStudyDay())
  const count = range === 'all' ? allDayCount(sessions, mathSessions, todayKey) : range
  const days = useMemo(() => recentDays(count, todayKey), [count, todayKey])

  useEffect(() => {
    let mounted = true
    const refreshLocal = () => { if (mounted) { setSessions(previous => mergeStudySessions(previous, readLocalStudySessions())); setMathSessions(previous => mergeLegacyMathSessions(previous, readLocalLegacyMathSessions())); setTodayKey(berlinStudyDay()) } }
    const refreshRemote = () => fetch('/api/mobin/study-time', { cache: 'no-store' })
      .then(response => response.ok ? response.json() : { sessions: [] })
      .then(data => { if (mounted) { setSessions(mergeStudySessions(data.sessions, readLocalStudySessions())); setMathSessions(mergeLegacyMathSessions(data.mathSessions, readLocalLegacyMathSessions())); setLoaded(true) } })
      .catch(() => { if (mounted) setLoaded(true) })
    refreshLocal()
    refreshRemote()
    const onFocus = () => { refreshLocal(); refreshRemote() }
    const timer = window.setInterval(refreshLocal, 60000)
    window.addEventListener('storage', refreshLocal)
    window.addEventListener('mobin-study-time', refreshLocal)
    window.addEventListener('focus', onFocus)
    return () => { mounted = false; window.clearInterval(timer); window.removeEventListener('storage', refreshLocal); window.removeEventListener('mobin-study-time', refreshLocal); window.removeEventListener('focus', onFocus) }
  }, [])

  const totals = studySummary(sessions, days.map(day => day.key), mathSessions)
  const today = totals[todayKey]?.total || 0
  const period = Object.values(totals).reduce((sum, day) => sum + day.total, 0)
  const max = Math.max(60, ...Object.values(totals).map(day => day.total))
  const sections = SECTION_ORDER.map(key => ({ key, name: STUDY_SECTIONS[key], seconds: Object.values(totals).reduce((sum, day) => sum + day.sections[key], 0) }))

  return <section className={styles.panel} aria-labelledby="study-dashboard-title">
    <div className={styles.header}>
      <div><h2 id="study-dashboard-title">Deine tägliche Lernzeit</h2><p>Alle Lernbereiche, Tag für Tag.</p></div>
      <div className={styles.rangeButtons} aria-label="Zeitraum wählen">{[14, 30, 'all'].map(value => <button type="button" key={value} onClick={() => setRange(value)} className={range === value ? styles.rangeActive : ''} aria-pressed={range === value}>{value === 'all' ? 'Alle' : `${value} Tage`}</button>)}</div>
    </div>
    <div className={styles.overview}>
      <div className={styles.todayCard}><span>HEUTE</span><strong>{duration(today)}</strong><small>Gesamt: {duration(period)} {range === 'all' ? 'seit Beginn' : `in ${range} Tagen`}</small></div>
      <div className={styles.legend}>{sections.map(item => <div className={styles.legendItem} key={item.key}><i className={styles[item.key]} /><span>{item.name}</span><strong>{duration(item.seconds)}</strong></div>)}</div>
    </div>
    <div className={styles.chartScroll}><div className={styles.chart} style={{ '--day-count': count }} role="img" aria-label={`Lernzeit der letzten ${count} Tage: ${days.map(day => `${DATE_LABEL.format(day.date)} ${duration(totals[day.key]?.total || 0)}`).join(', ')}`}>
      <div className={styles.plot}>
        {days.map(day => {
          const data = totals[day.key]
          const seconds = data?.total || 0
          return <div className={`${styles.day} ${day.key === todayKey ? styles.todayDay : ''}`} key={day.key} title={`${DATE_LABEL.format(day.date)}: ${duration(seconds)} · ${SECTION_ORDER.map(key => `${STUDY_SECTIONS[key]} ${duration(data?.sections[key] || 0)}`).join(' · ')}`}>
            <span className={styles.dayValue}>{seconds ? duration(seconds) : ''}</span>
            <div className={styles.barTrack}>{SECTION_ORDER.map(key => <span key={key} className={`${styles.segment} ${styles[key]}`} style={{ height: `${(data?.sections[key] || 0) / max * 100}%` }} />)}</div>
            <span className={styles.dayName}>{DAY_LABEL.format(day.date)}</span><span className={styles.dayDate}>{DATE_LABEL.format(day.date)}</span>
          </div>
        })}
      </div>
    </div></div>
    <p className={styles.footnote}>{loaded ? 'Aktive Lernzeit aller Bereiche. Ältere Übungen ohne Zeitmessung haben keine nachträglich geschätzte Dauer.' : 'Lernzeiten werden geladen …'}</p>
  </section>
}
