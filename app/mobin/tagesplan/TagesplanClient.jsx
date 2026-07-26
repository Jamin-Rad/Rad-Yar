'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import styles from './tagesplan.module.css'

const STORAGE_KEY = 'mobin_tagesplan_v1'
const COLORS = ['violet', 'blue', 'mint', 'gold', 'coral']
const HOURS = Array.from({ length: 24 }, (_, hour) => hour)
const STARTER_GOALS = [
  ['Programmieren üben (Python)', 'Minuten', 30, 'violet'],
  ['Englisch mit Duolingo lernen', 'Lektion', 1, 'blue'],
  ['App mit Swift machen', 'Minuten', 30, 'mint'],
  ['Fahrrad fahren', 'Minuten', 30, 'gold'],
  ['Liegestütze', 'Wiederholungen', 20, 'coral'],
  ['Klimmzüge', 'Wiederholungen', 5, 'violet'],
  ['Schach', 'Partie', 1, 'blue'],
  ['Buch lesen', 'Seiten', 10, 'mint'],
  ['Neuronation', 'Training', 1, 'gold'],
  ['Matheolympiade üben', 'Minuten', 30, 'coral'],
  ['Mathe-Video machen', 'Minuten', 30, 'violet'],
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
  return STARTER_GOALS.map(([title, unit, target, color], index) => ({
    id: `starter-${index + 1}`,
    title,
    unit,
    target,
    color,
  }))
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
  const [form, setForm] = useState({ title: '', unit: 'Minuten', target: 30, color: 'violet' })

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null')
      setGoals(Array.isArray(stored?.goals) && stored.goals.length ? stored.goals : starterGoals())
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

  function updateHour(hour, field, value) {
    setHourLogs(previous => ({
      ...previous,
      [selectedDate]: {
        ...(previous[selectedDate] || {}),
        [hour]: { ...(previous[selectedDate]?.[hour] || {}), [field]: value },
      },
    }))
  }

  function addGoal(event) {
    event.preventDefault()
    if (!form.title.trim()) return
    setGoals(previous => [...previous, {
      id: makeId(),
      title: form.title.trim(),
      unit: form.unit.trim() || 'Einheit',
      target: Math.max(0.1, Number(form.target) || 1),
      color: form.color,
    }])
    setForm(previous => ({ ...previous, title: '' }))
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
            <a href="#ziele">Ziele ordnen</a>
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
          <div className={styles.goalGrid}>
            {goals.map((goal, index) => {
              const amount = Number(todayEntries[goal.id]) || 0
              const score = percent(amount, goal.target)
              return (
                <article className={`${styles.goalCard} ${styles[goal.color]}`} key={goal.id}>
                  <div className={styles.goalNumber}>{String(index + 1).padStart(2, '0')}</div>
                  <div className={styles.goalTitle}><h3>{goal.title}</h3><span>{score}%</span></div>
                  <div className={styles.progress}><i style={{ width: `${score}%` }} /></div>
                  <div className={styles.amountRow}>
                    <input type="number" min="0" step="0.5" value={amount || ''} placeholder="0" onChange={event => setAmount(goal.id, event.target.value)} />
                    <span>von {formatNumber(goal.target)} {goal.unit}</span>
                    <button type="button" onClick={() => setAmount(goal.id, goal.target)}>Ziel ✓</button>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <section className={styles.panel} id="stunden">
          <div className={styles.sectionHead}>
            <div><span className={styles.eyebrow}>Stündlich</span><h2>Was habe ich gemacht?</h2></div>
            <p>Wähle ein Ziel und schreibe eine kurze Notiz.</p>
          </div>
          <div className={styles.timeline}>
            {HOURS.map(hour => {
              const log = todayHours[hour] || {}
              return (
                <div className={`${styles.hourRow} ${log.note || log.goalId ? styles.hourFilled : ''}`} key={hour}>
                  <time>{String(hour).padStart(2, '0')}:00</time>
                  <select value={log.goalId || ''} onChange={event => updateHour(hour, 'goalId', event.target.value)} aria-label={`Ziel um ${hour} Uhr`}>
                    <option value="">Kein Ziel gewählt</option>
                    {goals.map(goal => <option value={goal.id} key={goal.id}>{goal.title}</option>)}
                  </select>
                  <input value={log.note || ''} onChange={event => updateHour(hour, 'note', event.target.value)} placeholder="Was hast du gemacht?" aria-label={`Notiz um ${hour} Uhr`} />
                </div>
              )
            })}
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
            <div><span className={styles.eyebrow}>Prioritäten</span><h2>Ziele ordnen</h2></div>
            <p>Die Reihenfolge wird überall übernommen.</p>
          </div>
          <div className={styles.manageList}>
            {goals.map((goal, index) => (
              <div className={styles.manageRow} key={goal.id}>
                <span className={`${styles.colorDot} ${styles[goal.color]}`} />
                <strong>{index + 1}. {goal.title}</strong>
                <small>{formatNumber(goal.target)} {goal.unit} pro Tag</small>
                <div>
                  <button type="button" onClick={() => moveGoal(index, -1)} disabled={index === 0} aria-label={`${goal.title} nach oben`}>↑</button>
                  <button type="button" onClick={() => moveGoal(index, 1)} disabled={index === goals.length - 1} aria-label={`${goal.title} nach unten`}>↓</button>
                  <button className={styles.deleteButton} type="button" onClick={() => removeGoal(goal.id)}>Löschen</button>
                </div>
              </div>
            ))}
          </div>

          <form className={styles.goalForm} onSubmit={addGoal}>
            <label>Ziel<input value={form.title} onChange={event => setForm({ ...form, title: event.target.value })} placeholder="Neues Ziel" required /></label>
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
