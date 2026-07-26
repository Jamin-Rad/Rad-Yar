'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import styles from './page.module.css'

const STORAGE_KEY = 'mobina_daily_routine_v1'
const MONTHS = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember']
const WEEKDAYS = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']
const WEEKDAY_ICONS = ['🌙', '🌷', '🌈', '🦄', '⭐', '🎈', '☀️']

const ROUTINES = [
  { id: 'malen', title: 'Malen', icon: '🎨', count: 2, minutes: 15, color: 'pink', kind: 'goal' },
  { id: 'anton', title: 'Anton', icon: '✏️', count: 2, minutes: 15, color: 'blue', kind: 'goal' },
  { id: 'sport', title: 'Sport', icon: '🤸‍♀️', count: 1, minutes: 15, color: 'violet', kind: 'goal' },
  { id: 'fernsehen', title: 'Fernseher gucken', icon: '📺', count: 6, minutes: 15, color: 'sky', kind: 'limit' },
  { id: 'lesen', title: 'Bücher lesen', icon: '📚', count: 2, minutes: 15, color: 'rose', kind: 'goal' },
  { id: 'schach', title: 'Schach spielen', icon: '♟️', count: 2, minutes: 15, color: 'indigo', kind: 'goal' },
  { id: 'tablet', title: 'Tablet spielen', icon: '📱', count: 3, minutes: 15, color: 'aqua', kind: 'limit' },
  { id: 'basteln', title: 'Basteln', icon: '✂️', count: 2, minutes: 15, color: 'orange', kind: 'goal' },
  { id: 'vorschulbuch', title: 'Vorschulbuch', icon: '🔤', count: 2, minutes: 15, color: 'lilac', kind: 'goal' },
  { id: 'spielzeuge', title: 'Mit Spielzeug spielen', icon: '🧸', count: 2, minutes: 15, color: 'sunny', kind: 'goal' },
]

const GOAL_ROUTINES = ROUTINES.filter(routine => routine.kind === 'goal')
const LIMIT_ROUTINES = ROUTINES.filter(routine => routine.kind === 'limit')
const ROUTINE_BY_ID = Object.fromEntries(ROUTINES.map(routine => [routine.id, routine]))
const ROUTINE_GROUPS = [
  { id: 'learning', label: 'Lernen', routines: ['vorschulbuch', 'anton', 'lesen'].map(id => ROUTINE_BY_ID[id]) },
  { id: 'creative', label: 'Kreativ und Spielen', routines: ['malen', 'basteln', 'spielzeuge'].map(id => ROUTINE_BY_ID[id]) },
  { id: 'bodymind', label: 'Körper und Kopf', routines: ['sport', 'schach'].map(id => ROUTINE_BY_ID[id]) },
  { id: 'limits', label: 'Bildschirmzeit', routines: ['fernsehen', 'tablet'].map(id => ROUTINE_BY_ID[id]) },
]
const TOTAL_GOAL_STEPS = GOAL_ROUTINES.reduce((sum, routine) => sum + routine.count, 0)
const TOTAL_LIMIT_STEPS = LIMIT_ROUTINES.reduce((sum, routine) => sum + routine.count, 0)

function dateKey(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

function monthKey(value = dateKey()) {
  return value.slice(0, 7)
}

function shiftMonth(value, amount) {
  const [year, month] = value.split('-').map(Number)
  const next = new Date(year, month - 1 + amount, 1)
  return `${next.getFullYear()}-${String(next.getMonth() + 1).padStart(2, '0')}`
}

function monthDays(value) {
  const [year, month] = value.split('-').map(Number)
  const firstDay = new Date(year, month - 1, 1)
  const lastDay = new Date(year, month, 0).getDate()
  const offset = (firstDay.getDay() + 6) % 7
  const result = Array(offset).fill(null)
  for (let day = 1; day <= lastDay; day += 1) {
    result.push(`${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`)
  }
  while (result.length % 7) result.push(null)
  return result
}

function completedCount(logs, day) {
  const daily = logs[day] || {}
  return GOAL_ROUTINES.reduce((total, routine) => {
    const entries = Array.isArray(daily[routine.id]) ? daily[routine.id] : []
    return total + entries.slice(0, routine.count).filter(Boolean).length
  }, 0)
}

function dayPercent(logs, day) {
  return Math.round((completedCount(logs, day) / TOTAL_GOAL_STEPS) * 100)
}

function formatTimer(seconds) {
  const safeSeconds = Math.max(0, Number(seconds) || 0)
  return `${String(Math.floor(safeSeconds / 60)).padStart(2, '0')}:${String(safeSeconds % 60).padStart(2, '0')}`
}

function RoutineSymbol({ routine }) {
  if (routine.id === 'anton') {
    return <span className={styles.antonLogo} aria-hidden="true"><i /><b /></span>
  }
  return routine.icon
}

export default function MobinaRoutine() {
  const today = dateKey()
  const [logs, setLogs] = useState({})
  const [shownMonth, setShownMonth] = useState(monthKey(today))
  const [loaded, setLoaded] = useState(false)
  const [syncStatus, setSyncStatus] = useState('loading')
  const [timer, setTimer] = useState(null)
  const [timerRoutineId, setTimerRoutineId] = useState('malen')
  const audioContextRef = useRef(null)
  const timerTapRef = useRef(null)

  useEffect(() => {
    let cancelled = false

    async function loadLogs() {
      let localLogs = {}
      try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
        localLogs = saved && typeof saved === 'object' && !Array.isArray(saved) ? saved : {}
      } catch {}

      try {
        const response = await fetch('/api/mobina/progress', { cache: 'no-store' })
        const payload = await response.json()
        if (!response.ok || !payload.online || !payload.logs || typeof payload.logs !== 'object') throw new Error('offline')
        if (!cancelled) {
          setLogs(payload.logs)
          setSyncStatus('online')
        }
      } catch {
        if (!cancelled) {
          setLogs(localLogs)
          setSyncStatus('offline')
        }
      } finally {
        if (!cancelled) setLoaded(true)
      }
    }

    loadLogs()
    return () => { cancelled = true }
  }, [])

  useEffect(() => {
    if (!loaded) return undefined
    localStorage.setItem(STORAGE_KEY, JSON.stringify(logs))
    setSyncStatus('saving')

    const controller = new AbortController()
    const timeout = window.setTimeout(async () => {
      try {
        const response = await fetch('/api/mobina/progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ logs }),
          signal: controller.signal,
        })
        if (!response.ok) throw new Error('offline')
        setSyncStatus('online')
      } catch (error) {
        if (error.name !== 'AbortError') setSyncStatus('offline')
      }
    }, 450)

    return () => {
      window.clearTimeout(timeout)
      controller.abort()
    }
  }, [loaded, logs])

  useEffect(() => {
    if (!timer?.running) return undefined
    const interval = window.setInterval(() => {
      setTimer(previous => previous?.running
        ? { ...previous, remaining: Math.max(0, Math.ceil((previous.endAt - Date.now()) / 1000)) }
        : previous)
    }, 250)
    return () => window.clearInterval(interval)
  }, [timer?.running])

  useEffect(() => () => {
    if (timerTapRef.current) window.clearTimeout(timerTapRef.current)
  }, [])

  useEffect(() => {
    if (!timer?.running || timer.remaining !== 0) return
    setTimer(previous => previous ? { ...previous, running: false, finished: true } : null)
  }, [timer?.remaining, timer?.running])

  useEffect(() => {
    if (!timer?.finished) return undefined
    playRing()
    const interval = window.setInterval(playRing, 1250)
    return () => window.clearInterval(interval)
  }, [timer?.finished])

  const days = useMemo(() => monthDays(shownMonth), [shownMonth])
  const doneSteps = completedCount(logs, today)
  const progress = Math.round((doneSteps / TOTAL_GOAL_STEPS) * 100)
  const usedLimitSteps = LIMIT_ROUTINES.reduce((total, routine) => {
    const entries = Array.isArray(logs[today]?.[routine.id]) ? logs[today][routine.id] : []
    return total + entries.slice(0, routine.count).filter(Boolean).length
  }, 0)
  const limitProgress = Math.round((usedLimitSteps / TOTAL_LIMIT_STEPS) * 100)
  const selectedTimerRoutine = ROUTINES.find(routine => routine.id === timerRoutineId) || ROUTINES[0]
  const displayedTimerRoutine = timer
    ? ROUTINES.find(routine => routine.id === timer.routineId) || selectedTimerRoutine
    : selectedTimerRoutine
  const timerDisplaySeconds = timer ? timer.remaining : 15 * 60
  const timerProgress = timer ? (timer.remaining / timer.total) * 360 : 360

  function toggleStep(routine, index) {
    setLogs(previous => {
      const currentDay = previous[today] || {}
      const currentSteps = Array.from({ length: routine.count }, (_, step) => Boolean(currentDay[routine.id]?.[step]))
      currentSteps[index] = !currentSteps[index]
      return {
        ...previous,
        [today]: { ...currentDay, [routine.id]: currentSteps },
      }
    })
  }

  function markNextStepDone(routineId, day) {
    const routine = ROUTINES.find(item => item.id === routineId)
    if (!routine) return
    setLogs(previous => {
      const currentDay = previous[day] || {}
      const currentSteps = Array.from({ length: routine.count }, (_, step) => Boolean(currentDay[routine.id]?.[step]))
      const nextOpenIndex = currentSteps.findIndex(checked => !checked)
      if (nextOpenIndex >= 0) currentSteps[nextOpenIndex] = true
      return { ...previous, [day]: { ...currentDay, [routine.id]: currentSteps } }
    })
  }

  function prepareAudio() {
    if (typeof window === 'undefined') return
    const AudioContext = window.AudioContext || window.webkitAudioContext
    if (!AudioContext) return
    if (!audioContextRef.current) audioContextRef.current = new AudioContext()
    audioContextRef.current.resume().catch(() => {})
  }

  function playRing() {
    const context = audioContextRef.current
    if (!context) return
    const start = context.currentTime
    ;[0, .28, .56].forEach((delay, index) => {
      const oscillator = context.createOscillator()
      const gain = context.createGain()
      oscillator.type = 'sine'
      oscillator.frequency.setValueAtTime(index === 1 ? 880 : 1046, start + delay)
      gain.gain.setValueAtTime(.0001, start + delay)
      gain.gain.exponentialRampToValueAtTime(.32, start + delay + .02)
      gain.gain.exponentialRampToValueAtTime(.0001, start + delay + .22)
      oscillator.connect(gain)
      gain.connect(context.destination)
      oscillator.start(start + delay)
      oscillator.stop(start + delay + .24)
    })
  }

  function startTimer() {
    prepareAudio()
    const routine = ROUTINES.find(item => item.id === timerRoutineId) || ROUTINES[0]
    const seconds = 15 * 60
    setTimer({
      routineId: routine.id,
      title: routine.title,
      date: today,
      total: seconds,
      remaining: seconds,
      endAt: Date.now() + seconds * 1000,
      running: true,
      finished: false,
    })
  }

  function toggleTimer() {
    prepareAudio()
    setTimer(previous => {
      if (!previous || previous.finished) return previous
      if (previous.running) {
        return {
          ...previous,
          running: false,
          remaining: Math.max(0, Math.ceil((previous.endAt - Date.now()) / 1000)),
          endAt: null,
        }
      }
      return { ...previous, running: true, endAt: Date.now() + previous.remaining * 1000 }
    })
  }

  function handleTimerTap() {
    if (timer?.finished) {
      audioContextRef.current?.suspend().catch(() => {})
      markNextStepDone(timer.routineId, timer.date)
      setTimer(null)
      return
    }

    if (timerTapRef.current) {
      window.clearTimeout(timerTapRef.current)
      timerTapRef.current = null
      if (timer && !timer.finished) markNextStepDone(timer.routineId, timer.date)
      setTimer(null)
      return
    }

    timerTapRef.current = window.setTimeout(() => {
      timerTapRef.current = null
      if (!timer || timer.finished) startTimer()
      else toggleTimer()
    }, 260)
  }

  return (
    <main className={styles.page}>
      <div className={styles.decorations} aria-hidden="true"><i>★</i><i>♥</i><i>✦</i><i>●</i><i>★</i></div>
      <div className={styles.wrap}>
        <header className={styles.topbar}>
          <div className={styles.brand}>
            <span className={styles.logo}>M</span>
            <span><strong>Mobina</strong><small>Mein schöner Tag</small></span>
          </div>
          <span className={`${styles.syncBadge} ${styles[syncStatus]}`}>
            <i aria-hidden="true" />
            {syncStatus === 'online' ? 'Online gespeichert' : syncStatus === 'saving' ? 'Wird gespeichert …' : syncStatus === 'loading' ? 'Wird geladen …' : 'Lokal gespeichert'}
          </span>
        </header>

        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <span className={styles.heroStars} aria-hidden="true">🌈 ✨ 🦄</span>
            <h1>Mobina</h1>
          </div>
          <div className={styles.heroMeters}>
            <div className={styles.progressOrb} style={{ '--progress': `${progress * 3.6}deg`, '--progress-value': `${progress}%` }} aria-label={`${progress} Prozent der Ziele erledigt`}>
              <div><strong>{progress}%</strong><span aria-hidden="true">⭐</span></div>
            </div>
            <div className={`${styles.progressOrb} ${styles.limitOrb}`} style={{ '--progress': `${limitProgress * 3.6}deg`, '--progress-value': `${limitProgress}%` }} aria-label={`${limitProgress} Prozent der Bildschirmzeit genutzt`}>
              <div><strong>{limitProgress}%</strong><span aria-hidden="true">📺 📱</span></div>
            </div>
          </div>
        </section>

        <section className={`${styles.timerPanel} ${timer?.finished ? styles.timerFinished : ''}`} aria-live="polite">
          <div className={styles.activityGroups} aria-label="Aktivität auswählen">
            {ROUTINE_GROUPS.map(group => (
              <div className={`${styles.activityGroup} ${group.id === 'limits' ? styles.activityLimits : ''}`} key={group.id}>
                <div className={styles.activityPicker}>
                  {group.routines.map(routine => (
                    <button
                      className={timerRoutineId === routine.id ? styles.activityActive : ''}
                      type="button"
                      onClick={() => setTimerRoutineId(routine.id)}
                      aria-label={routine.title}
                      aria-pressed={timerRoutineId === routine.id}
                      disabled={Boolean(timer && !timer.finished)}
                      key={routine.id}
                    >
                      <span aria-hidden="true"><RoutineSymbol routine={routine} /></span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className={styles.timerStage}>
            <button
              className={styles.timerRing}
              style={{ '--timer-progress': `${timerProgress}deg` }}
              type="button"
              onClick={handleTimerTap}
              aria-label={timer?.finished ? 'Klingeln stoppen' : !timer ? 'Timer starten' : timer.running ? 'Timer pausieren; zweimal tippen zum Beenden' : 'Timer fortsetzen; zweimal tippen zum Beenden'}
            >
              <span className={styles.timerActivity} aria-hidden="true">{timer?.finished ? '🎉' : <RoutineSymbol routine={displayedTimerRoutine} />}</span>
              <strong>{formatTimer(timerDisplaySeconds)}</strong>
              <span className={styles.timerState} aria-hidden="true">{timer?.finished ? '■' : timer?.running ? 'Ⅱ' : '▶'}</span>
            </button>
          </div>
        </section>

        {progress === 100 && (
          <section className={styles.celebration} aria-label="Alle Tagesziele geschafft"><span aria-hidden="true">🎉 🌟 🦄 🌈 ⭐</span></section>
        )}

        <section className={styles.routineGroups} aria-label="Tägliche Routinen">
          {ROUTINE_GROUPS.map(group => (
            <section className={`${styles.routineGroup} ${group.id === 'limits' ? styles.limitGroup : ''}`} aria-label={group.label} key={group.id}>
              <div className={styles.routineGrid}>
                {group.routines.map(routine => {
                  const steps = Array.from({ length: routine.count }, (_, index) => Boolean(logs[today]?.[routine.id]?.[index]))
                  const done = steps.filter(Boolean).length
                  return (
                    <article className={`${styles.routineCard} ${styles[routine.color]} ${routine.kind === 'limit' ? styles.limitCard : ''} ${routine.kind === 'goal' && done === routine.count ? styles.cardDone : ''}`} key={routine.id}>
                      <header>
                        <span className={styles.routineIcon} aria-hidden="true"><RoutineSymbol routine={routine} /></span>
                        <div><h3>{routine.title}</h3></div>
                      </header>
                      <div className={styles.stepList}>
                        {steps.map((checked, index) => (
                          <button
                            className={`${styles.step} ${routine.kind === 'limit' ? styles.limitStep : ''} ${checked ? styles.stepDone : ''}`}
                            type="button"
                            role="checkbox"
                            aria-checked={checked}
                            onClick={() => toggleStep(routine, index)}
                            aria-label={`${routine.title}, ${index + 1}. Runde, ${checked ? 'markiert' : 'nicht markiert'}, 15 Minuten`}
                            key={`${routine.id}-${index}`}
                          >
                            <span className={styles.roundSparkle} aria-hidden="true">{routine.kind === 'goal' ? (checked ? '⭐' : '✨') : (checked ? '⏳' : '🫧')}</span>
                            <span className={styles.roundNumber} aria-hidden="true">{index + 1}</span>
                            <small aria-hidden="true">15′</small>
                          </button>
                        ))}
                      </div>
                    </article>
                  )
                })}
              </div>
            </section>
          ))}
        </section>

        <section className={styles.history}>
          <header className={styles.historyHeader}>
            <div className={styles.historyTitle}><span aria-hidden="true">🌷 🦋 ⭐</span><h2>{MONTHS[Number(shownMonth.slice(5)) - 1]} {shownMonth.slice(0, 4)}</h2></div>
            <div className={styles.monthControls}>
              <button type="button" onClick={() => setShownMonth(value => shiftMonth(value, -1))} aria-label="Vorheriger Monat">⬅️</button>
              <button type="button" onClick={() => setShownMonth(monthKey(today))} aria-label="Heute">🏠</button>
              <button type="button" onClick={() => setShownMonth(value => shiftMonth(value, 1))} disabled={shownMonth >= monthKey(today)} aria-label="Nächster Monat">➡️</button>
            </div>
          </header>
          <div className={styles.calendar}>
            {WEEKDAYS.map((day, index) => <span className={styles.weekday} aria-label={day} role="img" key={day}>{WEEKDAY_ICONS[index]}</span>)}
            {days.map((day, index) => {
              const percent = day ? dayPercent(logs, day) : 0
              const stars = Math.min(3, Math.ceil(percent / 34))
              const dayPicture = percent === 100 ? '🏆' : percent >= 67 ? '🌈' : percent > 0 ? '🌱' : '☁️'
              return (
                <div
                  className={`${styles.calendarDay} ${!day ? styles.emptyDay : ''} ${day === today ? styles.today : ''} ${day > today ? styles.futureDay : ''} ${percent === 100 ? styles.perfectDay : ''}`}
                  key={day || `empty-${index}`}
                  aria-label={day ? `${day}: ${percent} Prozent geschafft` : undefined}
                >
                  {day && <>
                    <strong>{Number(day.slice(-2))}</strong>
                    <span className={styles.dayPicture} aria-hidden="true">{dayPicture}</span>
                    <span className={styles.starTrail} aria-hidden="true">
                      {[0, 1, 2].map(star => <i className={star < stars ? styles.starEarned : ''} key={star}>★</i>)}
                    </span>
                  </>}
                </div>
              )
            })}
          </div>
          <div className={styles.historyHint} aria-hidden="true">🌱 ✨ 🌈 ✨ 🏆</div>
        </section>
      </div>
    </main>
  )
}
