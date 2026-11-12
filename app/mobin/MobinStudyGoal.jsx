'use client'

import { useEffect, useState } from 'react'
import {
  berlinStudyDay,
  mergeLegacyMathSessions,
  mergeStudySessions,
  readLocalLegacyMathSessions,
  readLocalStudySessions,
  STUDY_SECTIONS,
  studySummary,
} from '@/lib/mobinStudyTime'
import styles from './study-goal.module.css'

const GOAL_SECONDS = 100 * 60 * 60
const milestones = [0, 25, 50, 75, 100]
const weekdayFormat = new Intl.DateTimeFormat('de-DE', { weekday: 'short', timeZone: 'UTC' })
const percentFormat = new Intl.NumberFormat('de-DE', { style: 'percent', maximumFractionDigits: 1 })
const axisFormat = new Intl.NumberFormat('de-DE', { maximumFractionDigits: 2 })
const subjectLabels = { ...STUDY_SECTIONS, english: 'Englisch', math: 'Mathe' }

function formatTime(seconds) {
  if (seconds > 0 && seconds < 60) return `${seconds} Sek.`
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor(seconds / 60) % 60
  return hours ? `${hours} Std. ${minutes} Min.` : `${minutes} Min.`
}

function recentDays(today) {
  const date = new Date(`${today}T12:00:00Z`)
  return Array.from({ length: 7 }, (_, index) => {
    const day = new Date(date)
    day.setUTCDate(date.getUTCDate() + index - 6)
    return { key: day.toISOString().slice(0, 10), label: weekdayFormat.format(day) }
  })
}

function WeekChart({ week }) {
  const highest = Math.max(...week.map(day => day.seconds))
  const step = Math.max(900, Math.ceil(highest / (4 * 900)) * 900)
  const top = 16
  const bottom = 170
  const points = week.map((day, index) => ({
    ...day,
    x: 65 + 66 * index,
    y: bottom - (bottom - top) * day.seconds / (4 * step),
  }))
  const line = points.map(({ x, y }) => `${x},${y}`).join(' ')

  return (
    <section className={styles.panel} aria-labelledby="study-week-heading">
      <h2 id="study-week-heading">Lernzeit (7 Tage)</h2>
      <svg className={styles.chart} viewBox="0 0 480 205" role="img"
        aria-label={points.map(day => `${day.label} ${day.key}: ${formatTime(day.seconds)}`).join(', ')}>
        <defs>
          <linearGradient id="mobin-week-fill" x2="0" y2="1">
            <stop stopColor="#3999f0" stopOpacity=".52" />
            <stop offset="100%" stopColor="#3999f0" stopOpacity=".06" />
          </linearGradient>
        </defs>
        {[4, 3, 2, 1, 0].map(value => {
          const y = bottom - (bottom - top) * value / 4
          return <g key={value}>
            <line x1="60" x2="473" y1={y} y2={y} stroke="#41617e" strokeDasharray="4 4" />
            <text x="53" y={y + 4} textAnchor="end">{axisFormat.format(value * step / 3600)} h</text>
          </g>
        })}
        <polygon points={`65,${bottom} ${line} 461,${bottom}`} fill="url(#mobin-week-fill)" />
        <polyline points={line} fill="none" stroke="#75dcff" strokeWidth="3" strokeLinejoin="round" />
        {points.map(({ key, label, x, y, seconds }) => (
          <g key={key}>
            <circle cx={x} cy={y} r="4.5" fill="#e9f9ff" stroke="#59c9fa" strokeWidth="2">
              <title>{`${label} ${key}: ${formatTime(seconds)}`}</title>
            </circle>
            <text x={x} y="194" textAnchor="middle">{label}</text>
          </g>
        ))}
      </svg>
    </section>
  )
}

function SubjectBreakdown({ summary, total }) {
  return (
    <section className={styles.panel} aria-labelledby="study-subject-heading">
      <h2 id="study-subject-heading">Nach Fach</h2>
      <table className={styles.subjects}>
        <thead><tr><th scope="col">Fach</th><th scope="col">Lernzeit</th><th scope="col">Anteil</th></tr></thead>
        <tbody>
          {['math', 'english', 'kangaroo', 'preparation'].map(section => {
            const seconds = Object.values(summary).reduce((sum, day) => sum + day.sections[section], 0)
            const share = total ? seconds / total : 0
            return <tr key={section}>
              <th scope="row"><span className={styles[section]} aria-hidden="true" />{subjectLabels[section]}</th>
              <td>{formatTime(seconds)}</td>
              <td><span className={styles.share}>
                <progress aria-hidden="true" max={1} value={share} />
                {percentFormat.format(share)}
              </span></td>
            </tr>
          })}
        </tbody>
      </table>
    </section>
  )
}

export function MobinEntry({ children }) {
  const [entered, setEntered] = useState(false)

  function enter() {
    setEntered(true)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  return entered ? children : <MobinStudyGoal onEnter={enter} />
}

function MobinStudyGoal({ onEnter }) {
  const [local, setLocal] = useState({ sessions: [], mathSessions: [] })
  const [remote, setRemote] = useState(null)
  const [status, setStatus] = useState('loading')
  const [today, setToday] = useState('')

  useEffect(() => {
    let request
    function readLocal() {
      setToday(berlinStudyDay())
      setLocal({ sessions: readLocalStudySessions(), mathSessions: readLocalLegacyMathSessions() })
    }
    async function refresh() {
      readLocal()
      request?.abort()
      const controller = new AbortController()
      request = controller
      try {
        const response = await fetch('/api/mobin/study-time', { cache: 'no-store', signal: controller.signal })
        if (!response.ok) throw new Error('Lernzeit konnte nicht geladen werden')
        const data = await response.json()
        if (controller.signal.aborted) return
        setRemote(data)
        setStatus(data.localOnly ? 'local' : 'ready')
      } catch {
        if (!controller.signal.aborted) setStatus('local')
      }
    }
    refresh()
    window.addEventListener('focus', refresh)
    window.addEventListener('storage', readLocal)
    window.addEventListener('mobin-study-time', readLocal)
    return () => {
      request?.abort()
      window.removeEventListener('focus', refresh)
      window.removeEventListener('storage', readLocal)
      window.removeEventListener('mobin-study-time', readLocal)
    }
  }, [])

  const sessions = mergeStudySessions(remote?.sessions, local.sessions)
  const mathSessions = mergeLegacyMathSessions(remote?.mathSessions, local.mathSessions)
  const days = new Set(sessions.map(session => session.day))
  for (const session of mathSessions) {
    for (const day of Object.keys(session.studyDays)) days.add(day)
  }
  const summary = studySummary(sessions, [...days], mathSessions)
  const total = Object.values(summary).reduce((sum, day) => sum + day.total, 0)
  const week = today ? recentDays(today).map(day => ({ ...day, seconds: summary[day.key]?.total ?? 0 })) : []
  const progress = Math.min(total, GOAL_SECONDS)
  const nextMilestone = milestones.find(hours => hours * 3600 > progress)

  return (
    <main className={styles.goal} lang="de" dir="ltr" data-mobin-study-goal>
      <header className={styles.hero}>
        <div className={styles.heroText}>
          <p className={styles.wordmark}>Mobin</p>
          <h1>100 Stunden<br />Netto-Lernzeit</h1>
          <p className={styles.reward}>Dein Geschenk: <strong>AirPods Pro</strong></p>
          <div className={styles.action}>
            <button type="button" onClick={onEnter}>Deine Seite öffnen <span aria-hidden="true">→</span></button>
          </div>
        </div>
      </header>
      <div className={styles.details}>
        {status === 'loading' ? <p role="status">Lernzeit wird geladen …</p> : (
          <>
            {status === 'local' && <p role="status">Die Synchronisierung ist gerade nicht verfügbar. Der angezeigte Stand kann unvollständig sein.</p>}
            <section className={styles.milestones} aria-label="Fortschritt zum Lernziel">
              <p><strong>{formatTime(total)}</strong> von 100 Stunden gelernt</p>
              <div className={styles.milestoneScale}>
                <progress aria-label="Fortschritt zum Lernziel von 100 Stunden" max={GOAL_SECONDS} value={progress} />
                <ol>
                  {milestones.map(hours => {
                    const reached = hours > 0 && progress >= hours * 3600
                    return <li key={hours} data-reached={reached} data-start={hours === 0}>
                      <span className={styles.marker} aria-hidden="true">{reached ? '✓' : ''}</span>
                      <span>{hours} Std.</span>
                    </li>
                  })}
                </ol>
              </div>
              {nextMilestone && (
                <p className={styles.nextMilestone}>
                  Noch {formatTime(nextMilestone * 3600 - progress)} bis {nextMilestone} Std.
                </p>
              )}
            </section>
            <div className={styles.analysis}>
              <WeekChart week={week} />
              <SubjectBreakdown summary={summary} total={total} />
            </div>
          </>
        )}
      </div>
    </main>
  )
}
