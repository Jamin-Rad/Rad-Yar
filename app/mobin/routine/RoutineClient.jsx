'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import styles from '../mobin.module.css'

const STORAGE_KEY = 'mobin_routines_v1'
const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez']
const COLORS = ['sun', 'comet', 'earth', 'nebula']
const STARTER_ROUTINES = [
  { title: 'Mathe', unit: 'Aufgaben', dailyTarget: 5, color: 'sun' },
  { title: 'Englisch', unit: 'Minuten', dailyTarget: 10, color: 'comet' },
  { title: 'Radfahren', unit: 'Minuten', dailyTarget: 20, color: 'earth' },
]

function makeId() {
  return `routine-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

function dateValue(date = new Date()) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function monthKeyFromDate(value = new Date()) {
  const date = typeof value === 'string' ? new Date(`${value}T00:00:00`) : value
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
}

function formatMonthTitle(monthKey) {
  const [year, month] = monthKey.split('-').map(Number)
  return `${MONTH_LABELS[month - 1]} ${year}`
}

function shiftMonth(monthKey, delta) {
  const [year, month] = monthKey.split('-').map(Number)
  return monthKeyFromDate(new Date(year, month - 1 + delta, 1))
}

function buildMonthDays(monthKey) {
  const [year, month] = monthKey.split('-').map(Number)
  const first = new Date(year, month - 1, 1)
  const last = new Date(year, month, 0)
  const offset = (first.getDay() + 6) % 7
  const days = []
  for (let i = 0; i < offset; i += 1) days.push(null)
  for (let day = 1; day <= last.getDate(); day += 1) {
    days.push(`${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`)
  }
  while (days.length % 7 !== 0) days.push(null)
  return days
}

function emptyForm() {
  return {
    title: '',
    unit: 'Einheit',
    dailyTarget: 1,
    color: 'sun',
  }
}

function percentFor(amount, target) {
  const goal = Number(target) || 1
  return Math.min(100, Math.round(((Number(amount) || 0) / goal) * 100))
}

function logKey(routineId, date) {
  return `${routineId}:${date}`
}

function starterState() {
  return {
    routines: STARTER_ROUTINES.map((routine, index) => ({
      id: `starter-${index + 1}`,
      ...routine,
      createdAt: new Date().toISOString(),
    })),
    logs: {},
  }
}

export default function RoutineClient() {
  const [routines, setRoutines] = useState([])
  const [logs, setLogs] = useState({})
  const [form, setForm] = useState(() => emptyForm())
  const [selectedDate, setSelectedDate] = useState(() => dateValue())
  const [monthView, setMonthView] = useState(() => monthKeyFromDate())
  const [editingId, setEditingId] = useState(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null')
      const next = stored && Array.isArray(stored.routines) ? stored : starterState()
      setRoutines(next.routines)
      setLogs(next.logs && typeof next.logs === 'object' ? next.logs : {})
    } catch {
      const next = starterState()
      setRoutines(next.routines)
      setLogs(next.logs)
    } finally {
      setLoaded(true)
    }
  }, [])

  useEffect(() => {
    if (loaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ routines, logs }))
    }
  }, [loaded, routines, logs])

  const monthDays = useMemo(() => buildMonthDays(monthView), [monthView])

  const selectedLabel = useMemo(() => {
    const date = new Date(`${selectedDate}T00:00:00`)
    if (Number.isNaN(date.getTime())) return selectedDate
    return date.toLocaleDateString('de-DE', { weekday: 'long', day: '2-digit', month: 'long' })
  }, [selectedDate])

  const stats = useMemo(() => {
    const percents = routines.map(routine => percentFor(logs[logKey(routine.id, selectedDate)]?.amount, routine.dailyTarget))
    const average = percents.length ? Math.round(percents.reduce((sum, value) => sum + value, 0) / percents.length) : 0
    return {
      routines: routines.length,
      done: percents.filter(value => value >= 100).length,
      average,
    }
  }, [routines, logs, selectedDate])

  function saveRoutine(event) {
    event.preventDefault()
    const title = form.title.trim()
    if (!title) return

    const payload = {
      title,
      unit: form.unit.trim() || 'Einheit',
      dailyTarget: Math.max(Number(form.dailyTarget) || 1, 0.01),
      color: COLORS.includes(form.color) ? form.color : 'sun',
    }

    if (editingId) {
      setRoutines(prev => prev.map(routine => routine.id === editingId ? { ...routine, ...payload } : routine))
      setEditingId(null)
    } else {
      setRoutines(prev => [{ id: makeId(), ...payload, createdAt: new Date().toISOString() }, ...prev])
    }
    setForm(emptyForm())
  }

  function saveLog(routine, value, date = selectedDate) {
    const amount = Math.max(Number(value) || 0, 0)
    const key = logKey(routine.id, date)
    setLogs(prev => ({
      ...prev,
      [key]: {
        routineId: routine.id,
        date,
        amount,
        updatedAt: new Date().toISOString(),
      },
    }))
  }

  function editRoutine(routine) {
    setEditingId(routine.id)
    setForm({
      title: routine.title,
      unit: routine.unit,
      dailyTarget: routine.dailyTarget,
      color: routine.color,
    })
  }

  function deleteRoutine(id) {
    setRoutines(prev => prev.filter(routine => routine.id !== id))
    setLogs(prev => {
      const next = { ...prev }
      for (const key of Object.keys(next)) {
        if (key.startsWith(`${id}:`)) delete next[key]
      }
      return next
    })
  }

  return (
    <main className={styles.shell}>
      <div className={styles.wrap}>
        <header className={styles.topbar}>
          <Link className={styles.brand} href="/mobin">
            <span className={styles.mark}>M</span>
            <span className={styles.brandText}>
              <span className={styles.brandName}>Mobin</span>
              <span className={styles.brandSub}>Routine</span>
            </span>
          </Link>
          <nav className={styles.nav} aria-label="Mobin Navigation">
            <Link className={styles.glassButton} href="/mobin/bildschirmzeit" style={{ '--tilt': '1.2deg', '--speed': '8s' }}>
              <span className={styles.buttonTitle}>Bildschirmzeit</span>
              <span className={styles.buttonMeta}>Pausen</span>
            </Link>
            <Link className={styles.glassButton} href="/mobin/tagebuch" style={{ '--tilt': '-1.4deg', '--speed': '7.3s' }}>
              <span className={styles.buttonTitle}>Tagebuch</span>
              <span className={styles.buttonMeta}>Notizen</span>
            </Link>
          </nav>
        </header>

        <section className={styles.routineHero}>
          <div>
            <span className={styles.eyebrow}>Tägliche Missionen</span>
            <h1 className={styles.sectionTitle}>Routine</h1>
          </div>
          <div className={styles.routineStats}>
            <span><strong>{stats.routines}</strong> Routinen</span>
            <span><strong>{stats.done}</strong> fertig</span>
            <span><strong>{stats.average}%</strong> heute</span>
          </div>
        </section>

        <section className={styles.routineComposer}>
          <form className={styles.routineForm} onSubmit={saveRoutine}>
            <label className={styles.routineTitleField}>
              Routine
              <input value={form.title} onChange={event => setForm(prev => ({ ...prev, title: event.target.value }))} placeholder="z.B. Lesen, Mathe, Radfahren" required />
            </label>
            <label>
              Einheit
              <input value={form.unit} onChange={event => setForm(prev => ({ ...prev, unit: event.target.value }))} placeholder="Minuten, Seiten..." />
            </label>
            <label>
              Ziel pro Tag
              <input type="number" min="0.01" step="0.25" value={form.dailyTarget} onChange={event => setForm(prev => ({ ...prev, dailyTarget: event.target.value }))} />
            </label>
            <div className={styles.routineSwatches} aria-label="Farbe">
              {COLORS.map(color => (
                <button
                  className={`${styles.routineSwatch} ${styles[color]} ${form.color === color ? styles.routineSwatchActive : ''}`}
                  type="button"
                  aria-label={color}
                  onClick={() => setForm(prev => ({ ...prev, color }))}
                  key={color}
                />
              ))}
            </div>
            <div className={styles.routineFormActions}>
              {editingId && <button className={styles.routineGhostButton} type="button" onClick={() => { setEditingId(null); setForm(emptyForm()) }}>Abbrechen</button>}
              <button className={styles.routineAddButton} type="submit">{editingId ? 'Aktualisieren' : 'Hinzufügen'}</button>
            </div>
          </form>
        </section>

        <section className={styles.routineDayPanel}>
          <header className={styles.routinePanelHeader}>
            <div>
              <span className={styles.eyebrow}>Eintragen</span>
              <h2>{selectedLabel}</h2>
            </div>
            <input
              className={styles.routineDatePicker}
              type="date"
              value={selectedDate}
              onChange={event => {
                setSelectedDate(event.target.value)
                if (event.target.value) setMonthView(monthKeyFromDate(event.target.value))
              }}
            />
          </header>

          <div className={styles.routineCards}>
            {routines.map(routine => {
              const log = logs[logKey(routine.id, selectedDate)]
              const percent = percentFor(log?.amount, routine.dailyTarget)
              return (
                <article className={`${styles.routineCard} ${styles[routine.color]}`} key={routine.id}>
                  <div className={styles.routineCardTop}>
                    <div>
                      <h3>{routine.title}</h3>
                      <p>Ziel: {routine.dailyTarget} {routine.unit}</p>
                    </div>
                    <strong>{percent}%</strong>
                  </div>
                  <div className={styles.routineProgress}>
                    <span style={{ width: `${percent}%` }} />
                  </div>
                  <div className={styles.routineEntryRow}>
                    <input
                      type="number"
                      min="0"
                      step="0.25"
                      value={log?.amount ?? ''}
                      placeholder="0"
                      onChange={event => saveLog(routine, event.target.value)}
                      aria-label={`${routine.title} erledigte Einheiten`}
                    />
                    <span>{routine.unit}</span>
                    <button type="button" onClick={() => saveLog(routine, routine.dailyTarget)}>Ziel</button>
                  </div>
                  <div className={styles.routineCardActions}>
                    <button type="button" onClick={() => editRoutine(routine)}>Edit</button>
                    <button type="button" onClick={() => deleteRoutine(routine.id)}>Löschen</button>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <section className={styles.routineMonthPanel}>
          <header className={styles.routinePanelHeader}>
            <div>
              <span className={styles.eyebrow}>Kalender</span>
              <h2>{formatMonthTitle(monthView)}</h2>
            </div>
            <div className={styles.routineMonthControls}>
              <button type="button" onClick={() => setMonthView(prev => shiftMonth(prev, -1))} aria-label="Vorheriger Monat">&lt;</button>
              <button type="button" onClick={() => { setMonthView(monthKeyFromDate()); setSelectedDate(dateValue()) }}>Heute</button>
              <button type="button" onClick={() => setMonthView(prev => shiftMonth(prev, 1))} aria-label="Nächster Monat">&gt;</button>
            </div>
          </header>

          <div className={styles.routineMonthGrid}>
            {['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map(day => (
              <div className={styles.routineWeekday} key={day}>{day}</div>
            ))}
            {monthDays.map((day, index) => (
              <button
                className={`${styles.routineMonthCell} ${!day ? styles.routineMonthCellEmpty : ''} ${day === dateValue() ? styles.routineMonthCellToday : ''} ${day === selectedDate ? styles.routineMonthCellSelected : ''}`}
                type="button"
                disabled={!day}
                onClick={() => day && setSelectedDate(day)}
                key={day || `empty-${index}`}
              >
                {day && <span className={styles.routineMonthDay}>{Number(day.slice(-2))}</span>}
                {day && routines.slice(0, 4).map(routine => {
                  const percent = percentFor(logs[logKey(routine.id, day)]?.amount, routine.dailyTarget)
                  return (
                    <span className={`${styles.routineCalendarLine} ${styles[routine.color]}`} key={routine.id}>
                      <span className={styles.routineLineName}>{routine.title}</span>
                      <span className={styles.routineLineBar}><i style={{ width: `${percent}%` }} /></span>
                      <span className={styles.routineLinePercent}>{percent}%</span>
                    </span>
                  )
                })}
              </button>
            ))}
          </div>
        </section>

        <footer className={styles.footer}>Zurück zu <Link href="/mobin">Mobin</Link></footer>
      </div>
    </main>
  )
}
