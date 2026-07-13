'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import styles from './page.module.css'

const STORAGE_KEY = 'andarun_routines_fallback_v1'
const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez']
const COLORS = ['gold', 'rose', 'mint', 'sky', 'violet']

function makeId() {
  return `local-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

function todayValue() {
  const date = new Date()
  return dateValue(date)
}

function dateValue(date) {
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
    color: 'gold',
  }
}

function percentFor(amount, target) {
  if (!target) return 0
  return Math.min(100, Math.round((Number(amount || 0) / Number(target)) * 100))
}

function logKey(routineId, date) {
  return `${routineId}:${date}`
}

export default function RoutinePage({ apiBase = '/api/andarun/routines', homeHref = '/andarun', homeLabel = 'Andarun', showHomeLink = true }) {
  const [routines, setRoutines] = useState([])
  const [logs, setLogs] = useState({})
  const [form, setForm] = useState(() => emptyForm())
  const [selectedDate, setSelectedDate] = useState(() => todayValue())
  const [monthView, setMonthView] = useState(() => monthKeyFromDate())
  const [storageMode, setStorageMode] = useState('online')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    let active = true

    async function loadRoutines() {
      try {
        const response = await fetch(`${apiBase}?month=${encodeURIComponent(monthView)}`, { cache: 'no-store' })
        if (!response.ok) throw new Error('Online storage is not ready yet.')
        const payload = await response.json()
        if (!active) return
        setRoutines(Array.isArray(payload.routines) ? payload.routines : [])
        setLogs(logsToMap(Array.isArray(payload.logs) ? payload.logs : []))
        setStorageMode('online')
        setMessage('')
      } catch (error) {
        if (!active) return
        try {
          const local = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
          setRoutines(Array.isArray(local.routines) ? local.routines : [])
          setLogs(local.logs && typeof local.logs === 'object' ? local.logs : {})
        } catch {
          setRoutines([])
          setLogs({})
        }
        setStorageMode('local')
        setMessage(error.message)
      } finally {
        if (active) setLoading(false)
      }
    }

    loadRoutines()
    return () => {
      active = false
    }
  }, [apiBase, monthView])

  useEffect(() => {
    if (storageMode === 'local' && !loading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ routines, logs }))
    }
  }, [routines, logs, storageMode, loading])

  const monthDays = useMemo(() => buildMonthDays(monthView), [monthView])

  const stats = useMemo(() => {
    const today = todayValue()
    const todayPercents = routines.map(routine => percentFor(logs[logKey(routine.id, today)]?.amount, routine.dailyTarget))
    const todayAverage = todayPercents.length
      ? Math.round(todayPercents.reduce((sum, value) => sum + value, 0) / todayPercents.length)
      : 0
    const done = todayPercents.filter(value => value >= 100).length
    return { active: routines.length, todayAverage, done }
  }, [routines, logs])

  const selectedLabel = useMemo(() => {
    const date = new Date(`${selectedDate}T00:00:00`)
    if (Number.isNaN(date.getTime())) return selectedDate
    return date.toLocaleDateString('de-DE', { weekday: 'short', day: '2-digit', month: 'short' })
  }, [selectedDate])

  function logsToMap(items) {
    return Object.fromEntries(items.map(log => [logKey(log.routineId, log.date), log]))
  }

  async function saveRoutine(event) {
    event.preventDefault()
    const title = form.title.trim()
    if (!title) return

    setSaving(true)
    setMessage('')
    const payload = {
      title,
      unit: form.unit.trim() || 'Einheit',
      dailyTarget: Math.max(Number(form.dailyTarget) || 1, 0.01),
      color: form.color,
    }

    if (editingId) {
      await updateRoutine(editingId, payload)
      setEditingId(null)
      setForm(emptyForm())
      setSaving(false)
      return
    }

    const optimistic = {
      id: makeId(),
      ...payload,
      archived: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    if (storageMode === 'local') {
      setRoutines(prev => [optimistic, ...prev])
      setForm(emptyForm())
      setSaving(false)
      return
    }

    try {
      const response = await fetch(apiBase, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!response.ok) throw new Error('Could not save online.')
      const data = await response.json()
      setRoutines(prev => [data.routine, ...prev])
      setForm(emptyForm())
    } catch (error) {
      setRoutines(prev => [optimistic, ...prev])
      setStorageMode('local')
      setMessage(`${error.message} Saved locally for now.`)
      setForm(emptyForm())
    } finally {
      setSaving(false)
    }
  }

  async function updateRoutine(id, patch) {
    const previous = routines
    setRoutines(prev => prev.map(routine => routine.id === id ? { ...routine, ...patch, updatedAt: new Date().toISOString() } : routine))
    if (storageMode === 'local' || id.startsWith('local-')) return

    try {
      const response = await fetch(apiBase, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...patch }),
      })
      if (!response.ok) throw new Error('Could not update routine.')
      const data = await response.json()
      setRoutines(prev => prev.map(routine => routine.id === id ? data.routine : routine))
    } catch (error) {
      setRoutines(previous)
      setMessage(error.message)
    }
  }

  async function archiveRoutine(id) {
    const previous = routines
    setRoutines(prev => prev.filter(routine => routine.id !== id))
    if (storageMode === 'local' || id.startsWith('local-')) return

    try {
      const response = await fetch(`${apiBase}?id=${encodeURIComponent(id)}`, { method: 'DELETE' })
      if (!response.ok) throw new Error('Could not delete routine.')
    } catch (error) {
      setRoutines(previous)
      setMessage(error.message)
    }
  }

  async function saveLog(routine, value, date = selectedDate) {
    const amount = Math.max(Number(value) || 0, 0)
    const key = logKey(routine.id, date)
    const previous = logs
    const optimistic = {
      id: logs[key]?.id || makeId(),
      routineId: routine.id,
      date,
      amount,
      note: '',
      updatedAt: new Date().toISOString(),
    }
    setLogs(prev => ({ ...prev, [key]: optimistic }))

    if (storageMode === 'local' || routine.id.startsWith('local-')) return

    try {
      const response = await fetch(apiBase, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'log', routineId: routine.id, date, amount }),
      })
      if (!response.ok) throw new Error('Could not save progress.')
      const data = await response.json()
      setLogs(prev => ({ ...prev, [key]: data.log }))
    } catch (error) {
      setLogs(previous)
      setMessage(error.message)
    }
  }

  function startEdit(routine) {
    setEditingId(routine.id)
    setForm({
      title: routine.title,
      unit: routine.unit,
      dailyTarget: routine.dailyTarget,
      color: routine.color,
    })
  }

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        {showHomeLink ? <Link href={homeHref} className={styles.backLink}>← {homeLabel}</Link> : <span />}
        <div>
          <span className={styles.kicker}>Private Routine</span>
          <h1>Routine</h1>
        </div>
        <div className={styles.stats}>
          <span><strong>{stats.active}</strong> aktiv</span>
          <span><strong>{stats.done}</strong> heute fertig</span>
          <span><strong>{stats.todayAverage}%</strong> heute</span>
        </div>
      </section>

      {message && <div className={styles.message}>{message}</div>}

      <section className={styles.composer}>
        <form className={styles.form} onSubmit={saveRoutine}>
          <label className={styles.titleField}>
            Routine
            <input value={form.title} onChange={event => setForm(prev => ({ ...prev, title: event.target.value }))} placeholder="z.B. Lesen, Sport, Vokabeln" required />
          </label>
          <label>
            Einheit
            <input value={form.unit} onChange={event => setForm(prev => ({ ...prev, unit: event.target.value }))} placeholder="Seiten, Minuten..." />
          </label>
          <label>
            Ziel pro Tag
            <input type="number" min="0.01" step="0.25" value={form.dailyTarget} onChange={event => setForm(prev => ({ ...prev, dailyTarget: event.target.value }))} />
          </label>
          <div className={styles.swatches} aria-label="Farbe">
            {COLORS.map(color => (
              <button
                className={`${styles.swatch} ${styles[color]} ${form.color === color ? styles.swatchActive : ''}`}
                type="button"
                aria-label={color}
                onClick={() => setForm(prev => ({ ...prev, color }))}
                key={color}
              />
            ))}
          </div>
          <div className={styles.formActions}>
            {editingId && <button className={styles.ghostBtn} type="button" onClick={() => { setEditingId(null); setForm(emptyForm()) }}>Abbrechen</button>}
            <button className={styles.addBtn} type="submit" disabled={saving || !form.title.trim()}>
              {saving ? 'Speichern...' : editingId ? 'Aktualisieren' : 'Hinzufügen'}
            </button>
          </div>
        </form>
      </section>

      <section className={styles.dayPanel}>
        <header className={styles.dayHeader}>
          <div>
            <span className={styles.kicker}>Heute eintragen</span>
            <h2>{selectedLabel}</h2>
          </div>
          <input
            className={styles.datePicker}
            type="date"
            value={selectedDate}
            onChange={event => {
              setSelectedDate(event.target.value)
              if (event.target.value) setMonthView(monthKeyFromDate(event.target.value))
            }}
          />
        </header>

        <div className={styles.routineList}>
          {routines.length ? routines.map(routine => {
            const log = logs[logKey(routine.id, selectedDate)]
            const amount = log?.amount || ''
            const percent = percentFor(log?.amount, routine.dailyTarget)
            return (
              <article className={`${styles.routineCard} ${styles[routine.color]}`} key={routine.id}>
                <div className={styles.routineTop}>
                  <div>
                    <h3>{routine.title}</h3>
                    <p>Ziel: {routine.dailyTarget} {routine.unit}</p>
                  </div>
                  <strong>{percent}%</strong>
                </div>
                <div className={styles.progressTrack}>
                  <span style={{ width: `${percent}%` }} />
                </div>
                <div className={styles.entryRow}>
                  <input
                    type="number"
                    min="0"
                    step="0.25"
                    value={amount}
                    placeholder="0"
                    onChange={event => saveLog(routine, event.target.value)}
                    aria-label={`${routine.title} erledigte Einheiten`}
                  />
                  <span>{routine.unit}</span>
                  <button type="button" onClick={() => saveLog(routine, routine.dailyTarget)}>Ziel</button>
                </div>
                <div className={styles.cardActions}>
                  <button type="button" onClick={() => startEdit(routine)}>Edit</button>
                  <button type="button" onClick={() => archiveRoutine(routine.id)}>Löschen</button>
                </div>
              </article>
            )
          }) : (
            <p className={styles.empty}>Noch keine Routine. Oben die erste wiederholte Routine anlegen.</p>
          )}
        </div>
      </section>

      <section className={styles.monthPanel} aria-label="Routine month progress">
        <header className={styles.monthHeader}>
          <div>
            <span className={styles.kicker}>Kalender</span>
            <h2>{formatMonthTitle(monthView)}</h2>
          </div>
          <div className={styles.monthControls}>
            <button type="button" onClick={() => setMonthView(prev => shiftMonth(prev, -1))} aria-label="Vorheriger Monat">&lt;</button>
            <button type="button" onClick={() => { setMonthView(monthKeyFromDate()); setSelectedDate(todayValue()) }}>Heute</button>
            <button type="button" onClick={() => setMonthView(prev => shiftMonth(prev, 1))} aria-label="Nächster Monat">&gt;</button>
          </div>
        </header>

        <div className={styles.monthGrid}>
          {['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map(day => (
            <div className={styles.weekday} key={day}>{day}</div>
          ))}
          {monthDays.map((day, index) => (
            <button
              className={`${styles.monthCell} ${!day ? styles.monthCellEmpty : ''} ${day === todayValue() ? styles.monthCellToday : ''} ${day === selectedDate ? styles.monthCellSelected : ''}`}
              type="button"
              disabled={!day}
              onClick={() => day && setSelectedDate(day)}
              key={day || `empty-${index}`}
            >
              {day && <span className={styles.monthDay}>{Number(day.slice(-2))}</span>}
              {day && routines.slice(0, 4).map(routine => {
                const percent = percentFor(logs[logKey(routine.id, day)]?.amount, routine.dailyTarget)
                return (
                  <span className={`${styles.routineLine} ${styles[routine.color]}`} key={routine.id}>
                    <span className={styles.lineName}>{routine.title}</span>
                    <span className={styles.lineBar}><i style={{ width: `${percent}%` }} /></span>
                    <span className={styles.linePercent}>{percent}%</span>
                  </span>
                )
              })}
            </button>
          ))}
        </div>
      </section>
    </main>
  )
}
