'use client'

import { useEffect, useMemo, useState } from 'react'
import { berlinStudyDay, mergeStudySessions, readLocalStudySessions, STUDY_SECTIONS, studySummary } from '@/lib/mobinStudyTime'
import styles from './study-dashboard.module.css'

const DAY_LABEL = new Intl.DateTimeFormat('de-DE', { timeZone: 'Europe/Berlin', weekday: 'short' })
const DATE_LABEL = new Intl.DateTimeFormat('de-DE', { timeZone: 'Europe/Berlin', day: '2-digit', month: '2-digit' })

function recentDays(count) {
  const today = berlinStudyDay()
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

export default function MobinStudyDashboard() {
  const [sessions, setSessions] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [todayKey, setTodayKey] = useState(() => berlinStudyDay())
  const days = useMemo(() => recentDays(7), [todayKey])

  useEffect(() => {
    let mounted = true
    const refreshLocal = () => { if (mounted) { setSessions(previous => mergeStudySessions(previous, readLocalStudySessions())); setTodayKey(berlinStudyDay()) } }
    const refreshRemote = () => fetch('/api/mobin/study-time', { cache: 'no-store' })
      .then(response => response.ok ? response.json() : { sessions: [] })
      .then(data => { if (mounted) { setSessions(mergeStudySessions(data.sessions, readLocalStudySessions())); setLoaded(true) } })
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

  const totals = studySummary(sessions, days.map(day => day.key))
  const today = totals[todayKey]?.total || 0
  const week = Object.values(totals).reduce((sum, day) => sum + day.total, 0)
  const max = Math.max(60, ...Object.values(totals).map(day => day.total))
  const sections = Object.entries(STUDY_SECTIONS).map(([key, name]) => ({ key, name, seconds: Object.values(totals).reduce((sum, day) => sum + day.sections[key], 0) })).filter(item => item.seconds > 0)

  return <section className={styles.panel} aria-labelledby="study-dashboard-title">
    <div className={styles.header}><div><span className={styles.kicker}>DEIN LERNKOMPASS</span><h2 id="study-dashboard-title">Jeder Lerntag zählt.</h2><p>Aktive Lernzeit in English, Matheprüfung, Känguru und Prüfungsvorbereitung.</p></div><span className={styles.liveBadge}><i /> Täglich aktualisiert</span></div>
    <div className={styles.body}>
      <div className={styles.stats}><div className={styles.todayCard}><span>HEUTE GELERNT</span><strong>{duration(today)}</strong><small>{today > 0 ? 'Ein guter Schritt für deinen nächsten Test.' : 'Deine erste Lerneinheit wartet auf dich.'}</small></div><div className={styles.weekCard}><span>LETZTE 7 TAGE</span><strong>{duration(week)}</strong><small>{sections.length ? sections.map(item => `${item.name}: ${duration(item.seconds)}`).join(' · ') : 'Hier siehst du bald deine Lernfächer.'}</small></div></div>
      <div className={styles.chart} role="img" aria-label={`Lernzeit der letzten sieben Tage: ${days.map(day => `${DATE_LABEL.format(day.date)} ${duration(totals[day.key]?.total || 0)}`).join(', ')}`}>
        {days.map(day => {
          const seconds = totals[day.key]?.total || 0
          return <div className={styles.day} key={day.key}><span className={styles.dayValue}>{seconds ? duration(seconds) : '–'}</span><div className={styles.barTrack}><div className={`${styles.bar} ${day.key === todayKey ? styles.barToday : ''}`} style={{ height: `${seconds ? Math.max(6, seconds / max * 100) : 2}%` }} /></div><span className={styles.dayName}>{DAY_LABEL.format(day.date)}</span><span className={styles.dayDate}>{DATE_LABEL.format(day.date)}</span></div>
        })}
      </div>
    </div>
    <p className={styles.footnote}>{loaded ? 'Die Zeit zählt nur bei aktivem Fenster und pausiert nach zwei Minuten ohne Aktivität.' : 'Lernzeiten werden geladen …'}</p>
  </section>
}
