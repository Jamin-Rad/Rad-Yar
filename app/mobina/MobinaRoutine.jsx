'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import styles from './page.module.css'

const STORAGE_KEY = 'mobina_daily_routine_v1'
const MONTHS = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember']
const WEEKDAYS = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']

const ROUTINES = [
  { id: 'malen', title: 'Malen', icon: '🎨', count: 2, minutes: 10, color: 'pink' },
  { id: 'anton', title: 'Anton', icon: '✏️', count: 2, minutes: 15, color: 'blue' },
  { id: 'sport', title: 'Sport', icon: '🤸‍♀️', count: 1, minutes: 10, color: 'violet' },
  { id: 'fernsehen', title: 'Fernseher gucken', icon: '📺', count: 6, minutes: 15, color: 'sky' },
  { id: 'lesen', title: 'Bücher lesen', icon: '📚', count: 2, minutes: 10, color: 'rose' },
  { id: 'schach', title: 'Schach spielen', icon: '♟️', count: 2, minutes: null, color: 'indigo' },
  { id: 'tablet', title: 'Tablet spielen', icon: '🎮', count: 2, minutes: 15, color: 'aqua' },
]

const TOTAL_STEPS = ROUTINES.reduce((sum, routine) => sum + routine.count, 0)

function dateKey(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

function parseDate(value) {
  return new Date(`${value}T12:00:00`)
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
  return ROUTINES.reduce((total, routine) => {
    const entries = Array.isArray(daily[routine.id]) ? daily[routine.id] : []
    return total + entries.slice(0, routine.count).filter(Boolean).length
  }, 0)
}

function dayPercent(logs, day) {
  return Math.round((completedCount(logs, day) / TOTAL_STEPS) * 100)
}

function formatTimer(seconds) {
  const safeSeconds = Math.max(0, Number(seconds) || 0)
  return `${String(Math.floor(safeSeconds / 60)).padStart(2, '0')}:${String(safeSeconds % 60).padStart(2, '0')}`
}

export default function MobinaRoutine() {
  const today = dateKey()
  const [logs, setLogs] = useState({})
  const [selectedDate, setSelectedDate] = useState(today)
  const [shownMonth, setShownMonth] = useState(monthKey(today))
  const [loaded, setLoaded] = useState(false)
  const [syncStatus, setSyncStatus] = useState('loading')
  const [timer, setTimer] = useState(null)
  const audioContextRef = useRef(null)

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

  useEffect(() => {
    if (!timer?.running || timer.remaining !== 0) return
    markStepDone(timer.routineId, timer.index, timer.date)
    playRing()
    setTimer(previous => previous ? { ...previous, running: false, finished: true } : null)
  }, [timer?.remaining, timer?.running])

  const days = useMemo(() => monthDays(shownMonth), [shownMonth])
  const doneSteps = completedCount(logs, selectedDate)
  const progress = Math.round((doneSteps / TOTAL_STEPS) * 100)
  const completedRoutines = ROUTINES.filter(routine => {
    const entries = logs[selectedDate]?.[routine.id] || []
    return entries.slice(0, routine.count).filter(Boolean).length === routine.count
  }).length

  const selectedLabel = useMemo(() => parseDate(selectedDate).toLocaleDateString('de-DE', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  }), [selectedDate])

  function toggleStep(routine, index) {
    setLogs(previous => {
      const currentDay = previous[selectedDate] || {}
      const currentSteps = Array.from({ length: routine.count }, (_, step) => Boolean(currentDay[routine.id]?.[step]))
      currentSteps[index] = !currentSteps[index]
      return {
        ...previous,
        [selectedDate]: { ...currentDay, [routine.id]: currentSteps },
      }
    })
  }

  function markStepDone(routineId, index, day) {
    const routine = ROUTINES.find(item => item.id === routineId)
    if (!routine) return
    setLogs(previous => {
      const currentDay = previous[day] || {}
      const currentSteps = Array.from({ length: routine.count }, (_, step) => Boolean(currentDay[routine.id]?.[step]))
      currentSteps[index] = true
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

  function startTimer(routine, index) {
    prepareAudio()
    setTimer({
      routineId: routine.id,
      title: routine.title,
      index,
      date: selectedDate,
      total: routine.minutes * 60,
      remaining: routine.minutes * 60,
      endAt: Date.now() + routine.minutes * 60 * 1000,
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

  function chooseDate(day) {
    if (!day || day > today) return
    setSelectedDate(day)
    setShownMonth(monthKey(day))
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
            <span className={styles.kicker}>Meine täglichen Abenteuer</span>
            <h1>Hallo, Mobina!</h1>
            <p>Jedes Häkchen ist ein kleiner Sieg. Du schaffst das!</p>
          </div>
          <div className={styles.progressOrb} style={{ '--progress': `${progress * 3.6}deg`, '--progress-value': `${progress}%` }}>
            <div><strong>{progress}%</strong><span>geschafft</span></div>
          </div>
        </section>

        {timer && (
          <aside className={`${styles.timerDock} ${timer.finished ? styles.timerFinished : ''}`} aria-live="polite">
            <div className={styles.timerRing} style={{ '--timer-progress': `${(timer.remaining / timer.total) * 360}deg` }}>
              <strong>{formatTimer(timer.remaining)}</strong>
            </div>
            <div className={styles.timerCopy}>
              <span>{timer.finished ? 'Klingeling! Geschafft!' : `Timer · Runde ${timer.index + 1}`}</span>
              <h2>{timer.title}</h2>
            </div>
            <div className={styles.timerActions}>
              {!timer.finished && (
                <button type="button" onClick={toggleTimer}>
                  {timer.running ? 'Pause' : 'Weiter'}
                </button>
              )}
              <button type="button" onClick={() => setTimer(null)}>{timer.finished ? 'Schließen' : 'Stoppen'}</button>
            </div>
          </aside>
        )}

        <section className={styles.dayBar}>
          <div>
            <span className={styles.kicker}>Ausgewählter Tag</span>
            <h2>{selectedLabel}</h2>
          </div>
          <input
            type="date"
            max={today}
            value={selectedDate}
            onChange={event => chooseDate(event.target.value)}
            aria-label="Tag auswählen"
          />
          <div className={styles.dayStats}>
            <span><strong>{doneSteps}</strong> von {TOTAL_STEPS} Häkchen</span>
            <span><strong>{completedRoutines}</strong> von {ROUTINES.length} Routinen fertig</span>
          </div>
        </section>

        {progress === 100 && (
          <section className={styles.celebration}>
            <span aria-hidden="true">🎉</span>
            <div><strong>Fantastisch, alles geschafft!</strong><p>Heute warst du ein echter Routine-Star.</p></div>
            <span aria-hidden="true">🌟</span>
          </section>
        )}

        <section className={styles.routineGrid} aria-label="Tägliche Routinen">
          {ROUTINES.map(routine => {
            const steps = Array.from({ length: routine.count }, (_, index) => Boolean(logs[selectedDate]?.[routine.id]?.[index]))
            const done = steps.filter(Boolean).length
            return (
              <article className={`${styles.routineCard} ${styles[routine.color]} ${done === routine.count ? styles.cardDone : ''}`} key={routine.id}>
                <header>
                  <span className={styles.routineIcon} aria-hidden="true">{routine.icon}</span>
                  <div>
                    <h3>{routine.title}</h3>
                    <p>{routine.count}×{routine.minutes ? ` je ${routine.minutes} Minuten` : ''}</p>
                  </div>
                  <strong>{done}/{routine.count}</strong>
                </header>
                <div className={styles.stepList}>
                  {steps.map((checked, index) => {
                    const timerActive = timer?.routineId === routine.id && timer.index === index
                    return (
                      <div className={styles.stepRow} key={`${routine.id}-${index}`}>
                        <button
                          className={`${styles.step} ${checked ? styles.stepDone : ''}`}
                          type="button"
                          role="checkbox"
                          aria-checked={checked}
                          onClick={() => toggleStep(routine, index)}
                        >
                          <span className={styles.check}>{checked ? '✓' : index + 1}</span>
                          <span>{checked ? 'Erledigt!' : `${index + 1}. Runde`}</span>
                          {routine.minutes && <small>{routine.minutes} Min</small>}
                        </button>
                        {routine.minutes && (
                          <button
                            className={`${styles.timerButton} ${timerActive ? styles.timerButtonActive : ''}`}
                            type="button"
                            onClick={() => startTimer(routine, index)}
                            aria-label={`${routine.title}, Runde ${index + 1}: Timer für ${routine.minutes} Minuten starten`}
                          >
                            <span aria-hidden="true">▶</span> Timer
                          </button>
                        )}
                      </div>
                    )
                  })}
                </div>
              </article>
            )
          })}
        </section>

        <section className={styles.history}>
          <header className={styles.historyHeader}>
            <div><span className={styles.kicker}>Mein Verlauf</span><h2>{MONTHS[Number(shownMonth.slice(5)) - 1]} {shownMonth.slice(0, 4)}</h2></div>
            <div className={styles.monthControls}>
              <button type="button" onClick={() => setShownMonth(value => shiftMonth(value, -1))} aria-label="Vorheriger Monat">‹</button>
              <button type="button" onClick={() => chooseDate(today)}>Heute</button>
              <button type="button" onClick={() => setShownMonth(value => shiftMonth(value, 1))} disabled={shownMonth >= monthKey(today)} aria-label="Nächster Monat">›</button>
            </div>
          </header>
          <div className={styles.calendar}>
            {WEEKDAYS.map(day => <span className={styles.weekday} key={day}>{day}</span>)}
            {days.map((day, index) => {
              const percent = day ? dayPercent(logs, day) : 0
              return (
                <button
                  className={`${styles.calendarDay} ${!day ? styles.emptyDay : ''} ${day === today ? styles.today : ''} ${day === selectedDate ? styles.selected : ''} ${percent === 100 ? styles.perfectDay : ''}`}
                  type="button"
                  disabled={!day || day > today}
                  onClick={() => chooseDate(day)}
                  key={day || `empty-${index}`}
                  aria-label={day ? `${day}: ${percent} Prozent geschafft` : undefined}
                >
                  {day && <><strong>{Number(day.slice(-2))}</strong><span><i style={{ width: `${percent}%` }} /></span><small>{percent}%</small></>}
                </button>
              )
            })}
          </div>
          <p className={styles.historyHint}>Tippe auf einen vergangenen Tag, um deine Häkchen anzusehen.</p>
        </section>
      </div>
    </main>
  )
}
