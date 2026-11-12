'use client'

import { useEffect, useState } from 'react'
import {
  berlinStudyDay,
  mergeLegacyMathSessions,
  mergeStudySessions,
  readLocalLegacyMathSessions,
  readLocalStudySessions,
  studySummary,
} from '@/lib/mobinStudyTime'
import styles from './study-dashboard.module.css'

const GOAL_SECONDS = 100 * 60 * 60

function formatTime(seconds) {
  return `${Math.floor(seconds / 3600)} Std. ${Math.floor(seconds / 60) % 60} Min. ${seconds % 60} Sek.`
}

export default function MobinStudyGoal() {
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
  const remaining = Math.max(0, GOAL_SECONDS - total)

  return (
    <section className={styles.studyGoal} aria-labelledby="mobin-study-goal">
      <div className={styles.studyGoalReward}>
        <h2 id="mobin-study-goal">100 Stunden Netto-Lernzeit</h2>
        <p>Dein Geschenk: <strong>AirPods Pro</strong></p>
      </div>
      {status === 'loading' ? <p role="status">Lernzeit wird geladen …</p> : (
        <>
          <strong>{formatTime(total)} gelernt</strong>
          <progress aria-label="Fortschritt zum Lernziel von 100 Stunden" max={GOAL_SECONDS} value={Math.min(total, GOAL_SECONDS)} />
          <p>{remaining === 0 ? 'Ziel erreicht!' : `Noch ${formatTime(remaining)} bis zum Geschenk.`}</p>
          <p>Heute: {formatTime(summary[today]?.total ?? 0)}</p>
          {status === 'local' && <p role="status">Die Synchronisierung ist gerade nicht verfügbar. Der angezeigte Stand kann unvollständig sein.</p>}
        </>
      )}
    </section>
  )
}
