'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import styles from './tagesplan.module.css'

const STORAGE_KEY = 'mobin_tagesplan_v1'
const COLORS = ['violet', 'blue', 'mint', 'gold', 'coral']
const STARTER_GOALS = [
  ['Programmieren üben (Python)', 'Lernen', 'Minuten', 30, 'violet'],
  ['Englisch mit Duolingo lernen', 'Sprachen', 'Lektionen', 5, 'blue'],
  ['App mit Swift machen', 'Projekte', 'Minuten', 30, 'mint'],
  ['Fahrrad fahren', 'Sport', 'Minuten', 30, 'gold'],
  ['Liegestütze', 'Sport', 'Wiederholungen', 20, 'coral'],
  ['Klimmzüge', 'Sport', 'Wiederholungen', 5, 'violet'],
  ['Schach', 'Denken', 'Partien', 5, 'blue'],
  ['Buch lesen', 'Lernen', 'Seiten', 10, 'mint'],
  ['Neuronation', 'Denken', 'Übungen', 5, 'gold'],
  ['Matheolympiade üben', 'Mathematik', 'Minuten', 30, 'coral'],
  ['Mathe-Video machen', 'Projekte', 'Minuten', 30, 'violet'],
]

function dateKey(date = new Date()) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function shiftDate(value, days) {
  const date = new Date(`${value}T12:00:00`)
  date.setDate(date.getDate() + days)
  return dateKey(date)
}

function makeId() {
  return `goal-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}

function starterGoals() {
  return STARTER_GOALS.map(([title, group, unit, target, color], index) => ({
    id: `starter-${index + 1}`,
    title,
    group,
    unit,
    target,
    color,
  }))
}

function normalizeGoals(goals) {
  const defaults = starterGoals()
  return goals.map(goal => {
    const fallback = defaults.find(item => item.id === goal.id || item.title === goal.title)
    return { ...goal, group: goal.group || fallback?.group || 'Ohne Gruppe' }
  })
}

function formatNumber(value) {
  return new Intl.NumberFormat('de-DE', { maximumFractionDigits: 1 }).format(value || 0)
}

function percent(amount, target) {
  return Math.min(100, Math.round(((Number(amount) || 0) / (Number(target) || 1)) * 100))
}

function dayLabel(value, compact = false) {
  const date = new Date(`${value}T12:00:00`)
  if (compact) return date.toLocaleDateString('de-DE', { weekday: 'short', day: '2-digit' })
  return date.toLocaleDateString('de-DE', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })
}

export default function TagesplanClient() {
  const [goals, setGoals] = useState([])
  const [entries, setEntries] = useState({})
  const [hourLogs, setHourLogs] = useState({})
  const [selectedDate, setSelectedDate] = useState(() => dateKey())
  const [period, setPeriod] = useState(7)
  const [loaded, setLoaded] = useState(false)
  const [form, setForm] = useState({ title: '', group: 'Lernen', unit: 'Minuten', target: 30, color: 'violet' })
  const [hourForm, setHourForm] = useState({ hour: '16', goalId: '', note: '' })

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null')
      setGoals(Array.isArray(stored?.goals) && stored.goals.length ? normalizeGoals(stored.goals) : starterGoals())
      setEntries(stored?.entries && typeof stored.entries === 'object' ? stored.entries : {})
      setHourLogs(stored?.hourLogs && typeof stored.hourLogs === 'object' ? stored.hourLogs : {})
    } catch {
      setGoals(starterGoals())
    } finally {
      setLoaded(true)
    }
  }, [])

  useEffect(() => {
    if (loaded) localStorage.setItem(STORAGE_KEY, JSON.stringify({ goals, entries, hourLogs }))
  }, [loaded, goals, entries, hourLogs])

  const todayEntries = entries[selectedDate] || {}
  const todayHours = hourLogs[selectedDate] || {}

  const groupedGoals = useMemo(() => goals.reduce((groups, goal) => {
    const group = goal.group?.trim() || 'Ohne Gruppe'
    if (!groups[group]) groups[group] = []
    groups[group].push(goal)
    return groups
  }, {}), [goals])

  const summary = useMemo(() => {
    const values = goals.map(goal => percent(todayEntries[goal.id], goal.target))
    const average = values.length ? Math.round(values.reduce((sum, value) => sum + value, 0) / values.length) : 0
    return { done: values.filter(value => value >= 100).length, average }
  }, [goals, todayEntries])

  const historyDays = useMemo(
    () => Array.from({ length: period }, (_, index) => shiftDate(dateKey(), index - period + 1)),
    [period],
  )

  const dayHistory = useMemo(() => historyDays.map(day => {
    const values = goals.map(goal => percent(entries[day]?.[goal.id], goal.target))
    return {
      day,
      score: values.length ? Math.round(values.reduce((sum, value) => sum + value, 0) / values.length) : 0,
    }
  }), [entries, goals, historyDays])

  const goalHistory = useMemo(() => goals.map(goal => {
    const amounts = historyDays.map(day => Number(entries[day]?.[goal.id]) || 0)
    const reached = amounts.filter(amount => amount >= Number(goal.target)).length
    return { ...goal, reached, total: amounts.reduce((sum, amount) => sum + amount, 0) }
  }), [entries, goals, historyDays])

  function setAmount(goalId, rawValue) {
    const amount = Math.max(0, Number(rawValue) || 0)
    setEntries(previous => ({
      ...previous,
      [selectedDate]: { ...(previous[selectedDate] || {}), [goalId]: amount },
    }))
  }

  function saveHour(event) {
    event.preventDefault()
    const hour = String(Math.max(0, Math.min(23, Number(hourForm.hour) || 0))).padStart(2, '0')
    setHourLogs(previous => ({
      ...previous,
      [selectedDate]: {
        ...(previous[selectedDate] || {}),
        [hour]: { goalId: hourForm.goalId, note: hourForm.note.trim() },
      },
    }))
    setHourForm(previous => ({ ...previous, note: '' }))
  }

  function deleteHour(hour) {
    setHourLogs(previous => {
      const day = { ...(previous[selectedDate] || {}) }
      delete day[hour]
      return { ...previous, [selectedDate]: day }
    })
  }

  function addGoal(event) {
    event.preventDefault()
    if (!form.title.trim()) return
    setGoals(previous => [...previous, {
      id: makeId(),
      title: form.title.trim(),
      group: form.group.trim() || 'Ohne Gruppe',
      unit: form.unit.trim() || 'Einheit',
      target: Math.max(0.1, Number(form.target) || 1),
      color: form.color,
    }])
    setForm(previous => ({ ...previous, title: '' }))
  }

  function updateGoal(goalId, field, value) {
    setGoals(previous => previous.map(goal => goal.id === goalId
      ? { ...goal, [field]: field === 'target' ? Math.max(0.1, Number(value) || 0.1) : value }
      : goal))
  }

  function moveGoal(index, direction) {
    const nextIndex = index + direction
    if (nextIndex < 0 || nextIndex >= goals.length) return
    setGoals(previous => {
      const next = [...previous]
      ;[next[index], next[nextIndex]] = [next[nextIndex], next[index]]
      return next
    })
  }

  function removeGoal(goalId) {
    setGoals(previous => previous.filter(goal => goal.id !== goalId))
  }

  if (!loaded) return <main className={styles.shell}><div className={styles.loading}>Tagesplan wird geladen …</div></main>

  return (
    <main className={styles.shell}>
      <div className={styles.wrap}>
        <header className={styles.topbar}>
          <Link className={styles.brand} href="/mobin">
            <span className={styles.mark}>M</span>
            <span><strong>Mobin</strong><small>Tagesplan</small></span>
          </Link>
          <nav className={styles.nav} aria-label="Bereiche">
            <a href="#heute">Heute</a>
            <a href="#stunden">Stundenplan</a>
            <a href="#verlauf">Verlauf</a>
            <a href="#ziele">Einstellungen</a>
          </nav>
        </header>

        <section className={styles.hero}>
          <div>
            <span className={styles.eyebrow}>Deine Mission für heute</span>
            <h1>Tagesplan</h1>
            <p>{dayLabel(selectedDate)}</p>
          </div>
          <div className={styles.scoreRing} style={{ '--score': `${summary.average * 3.6}deg` }}>
            <strong>{summary.average}%</strong>
            <span>{summary.done}/{goals.length} Ziele</span>
          </div>
        </section>

        <section className={styles.dateBar} aria-label="Datum auswählen">
          <button type="button" onClick={() => setSelectedDate(value => shiftDate(value, -1))}>← Gestern</button>
          <input type="date" value={selectedDate} onChange={event => setSelectedDate(event.target.value)} />
          <button type="button" onClick={() => setSelectedDate(dateKey())}>Heute</button>
          <button type="button" onClick={() => setSelectedDate(value => shiftDate(value, 1))}>Morgen →</button>
        </section>

        <section className={styles.panel} id="heute">
          <div className={styles.sectionHead}>
            <div><span className={styles.eyebrow}>Eintragen</span><h2>Meine Ziele</h2></div>
            <p>Trage ein, wie viel du heute geschafft hast.</p>
          </div>
          <div className={styles.entryTable}>
            <div className={styles.entryTableHead}>
              <span>Thema</span>
              <span>Meine Menge</span>
            </div>
            {Object.entries(groupedGoals).map(([group, groupGoals]) => (
              <div className={styles.entryGroup} key={group}>
                <h3>{group}</h3>
                {groupGoals.map(goal => {
                  const amount = Number(todayEntries[goal.id]) || 0
                  return (
                    <div className={`${styles.entryRow} ${styles[goal.color]}`} key={goal.id}>
                      <div className={styles.entryTopic}>
                        <span className={styles.colorDot} />
                        <strong>{goal.title}</strong>
                        <small>Ziel: {formatNumber(goal.target)} {goal.unit}</small>
                      </div>
                      <div className={styles.choiceGrid}>
                        {[1, 2, 3, 4, 5].map(level => {
                          const choiceAmount = (Number(goal.target) * level) / 5
                          const active = amount >= choiceAmount
                          return (
                            <button
                              className={active ? styles.choiceActive : ''}
                              type="button"
                              onClick={() => setAmount(goal.id, Math.abs(amount - choiceAmount) < 0.001 ? 0 : choiceAmount)}
                              aria-label={`${formatNumber(choiceAmount)} ${goal.unit} für ${goal.title}`}
                              key={level}
                            >
                              <span>{formatNumber(choiceAmount)}</span>
                              <small>{goal.unit}</small>
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </section>

        <section className={styles.panel} id="stunden">
          <div className={styles.sectionHead}>
            <div><span className={styles.eyebrow}>Stündlich</span><h2>Was habe ich gemacht?</h2></div>
            <p>Wähle ein Ziel und schreibe eine kurze Notiz.</p>
          </div>
          <form className={styles.hourForm} onSubmit={saveHour}>
            <label>Uhrzeit<input type="number" min="0" max="23" value={hourForm.hour} onChange={event => setHourForm({ ...hourForm, hour: event.target.value })} /></label>
            <label>Thema<select value={hourForm.goalId} onChange={event => setHourForm({ ...hourForm, goalId: event.target.value })}>
              <option value="">Sonstiges</option>
              {goals.map(goal => <option value={goal.id} key={goal.id}>{goal.title}</option>)}
            </select></label>
            <label>Was habe ich gemacht?<input value={hourForm.note} onChange={event => setHourForm({ ...hourForm, note: event.target.value })} placeholder="z.B. Python-Schleifen geübt" /></label>
            <button type="submit">+ Stunde eintragen</button>
          </form>
          <div className={styles.timeline}>
            {Object.entries(todayHours).sort(([a], [b]) => Number(a) - Number(b)).map(([hour, log]) => {
              const goal = goals.find(item => item.id === log.goalId)
              return (
                <div className={styles.hourEntry} key={hour}>
                  <time>{String(hour).padStart(2, '0')}:00</time>
                  <div><strong>{goal?.title || 'Sonstiges'}</strong><span>{log.note || 'Keine Notiz'}</span></div>
                  <button type="button" onClick={() => deleteHour(hour)}>Löschen</button>
                </div>
              )
            })}
            {!Object.keys(todayHours).length && <p className={styles.emptyHours}>Noch keine Stunde eingetragen.</p>}
          </div>
        </section>

        <section className={styles.panel} id="verlauf">
          <div className={styles.sectionHead}>
            <div><span className={styles.eyebrow}>Auswertung</span><h2>Dein Verlauf</h2></div>
            <div className={styles.periodSwitch}>
              {[7, 30].map(days => <button className={period === days ? styles.active : ''} type="button" onClick={() => setPeriod(days)} key={days}>{days} Tage</button>)}
            </div>
          </div>

          <div className={styles.chartCard}>
            <div className={styles.chartTitle}><strong>Zielerreichung pro Tag</strong><span>Durchschnitt aller Ziele</span></div>
            <div className={`${styles.dayChart} ${period === 30 ? styles.monthChart : ''}`}>
              {dayHistory.map(item => (
                <div className={styles.dayBar} key={item.day} title={`${dayLabel(item.day)}: ${item.score}%`}>
                  <strong>{item.score}%</strong>
                  <div><i style={{ height: `${Math.max(item.score, 2)}%` }} /></div>
                  <span>{period === 7 ? dayLabel(item.day, true) : Number(item.day.slice(-2))}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.chartCard}>
            <div className={styles.chartTitle}><strong>Ziele im Vergleich</strong><span>Erreichte Tage und Gesamtmenge</span></div>
            <div className={styles.goalChart}>
              {goalHistory.map(goal => (
                <div className={styles.goalChartRow} key={goal.id}>
                  <span>{goal.title}</span>
                  <div><i className={styles[goal.color]} style={{ width: `${(goal.reached / period) * 100}%` }} /></div>
                  <strong>{goal.reached}/{period} Tage</strong>
                  <small>{formatNumber(goal.total)} {goal.unit}</small>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.panel} id="ziele">
          <div className={styles.sectionHead}>
            <div><span className={styles.eyebrow}>Ziele & Gruppen</span><h2>Einstellungen</h2></div>
            <p>Definiere Gruppe, Thema, Einheit und Tagesziel.</p>
          </div>
          <div className={styles.manageList}>
            {goals.map((goal, index) => (
              <div className={`${styles.manageRow} ${styles[goal.color]}`} key={goal.id}>
                <span className={`${styles.colorDot} ${styles[goal.color]}`} />
                <span className={styles.orderNumber}>{index + 1}</span>
                <label>Gruppe<input value={goal.group || ''} onChange={event => updateGoal(goal.id, 'group', event.target.value)} /></label>
                <label>Thema<input value={goal.title} onChange={event => updateGoal(goal.id, 'title', event.target.value)} /></label>
                <label>Einheit<input value={goal.unit} onChange={event => updateGoal(goal.id, 'unit', event.target.value)} /></label>
                <label>Tagesziel<input type="number" min="0.1" step="0.5" value={goal.target} onChange={event => updateGoal(goal.id, 'target', event.target.value)} /></label>
                <div className={styles.manageActions}>
                  <button type="button" onClick={() => moveGoal(index, -1)} disabled={index === 0} aria-label={`${goal.title} nach oben`}>↑</button>
                  <button type="button" onClick={() => moveGoal(index, 1)} disabled={index === goals.length - 1} aria-label={`${goal.title} nach unten`}>↓</button>
                  <button className={styles.deleteButton} type="button" onClick={() => removeGoal(goal.id)}>Löschen</button>
                </div>
              </div>
            ))}
          </div>

          <form className={styles.goalForm} onSubmit={addGoal}>
            <label>Ziel<input value={form.title} onChange={event => setForm({ ...form, title: event.target.value })} placeholder="Neues Ziel" required /></label>
            <label>Gruppe<input value={form.group} onChange={event => setForm({ ...form, group: event.target.value })} placeholder="z.B. Sport" /></label>
            <label>Einheit<input value={form.unit} onChange={event => setForm({ ...form, unit: event.target.value })} placeholder="Minuten, Seiten …" /></label>
            <label>Pro Tag<input type="number" min="0.1" step="0.5" value={form.target} onChange={event => setForm({ ...form, target: event.target.value })} /></label>
            <div className={styles.swatches}>{COLORS.map(color => <button className={`${styles[color]} ${form.color === color ? styles.selected : ''}`} type="button" onClick={() => setForm({ ...form, color })} aria-label={`Farbe ${color}`} key={color} />)}</div>
            <button className={styles.addButton} type="submit">+ Ziel hinzufügen</button>
          </form>
        </section>

        <footer className={styles.footer}>Zurück zu <Link href="/mobin">Mobins Startseite</Link></footer>
      </div>
    </main>
  )
}
