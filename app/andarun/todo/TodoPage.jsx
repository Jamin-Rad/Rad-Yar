'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import styles from './page.module.css'

const STORAGE_KEY = 'andarun_todos_fallback_v1'

const LANES = [
  {
    id: 'urgent',
    title: 'Urgent',
    subtitle: 'due today',
    color: 'red',
  },
  {
    id: 'today',
    title: 'Next',
    subtitle: 'tomorrow',
    color: 'gold',
  },
  {
    id: 'watch',
    title: 'In sight',
    subtitle: 'long-term, keep visible',
    color: 'violet',
  },
]

const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function makeId() {
  return `local-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

function readLocalTodos() {
  try {
    const local = localStorage.getItem(STORAGE_KEY)
    const parsed = local ? JSON.parse(local) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function clearLocalTodos() {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {}
}

function todoPayload(todo) {
  return {
    title: todo.title || '',
    note: todo.note || '',
    lane: todo.lane || laneFromDeadline(todo.deadline),
    deadline: todo.deadline || '',
    itemType: todo.itemType || 'todo',
    eventTime: todo.itemType === 'event' && !todo.allDay ? todo.eventTime || '' : '',
    allDay: todo.itemType === 'event' ? Boolean(todo.allDay) : false,
  }
}

function todayValue() {
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function formatDeadline(value) {
  if (!value) return ''
  const date = new Date(`${value}T00:00:00`)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })
}

function formatEventMeta(todo) {
  if (todo?.itemType !== 'event') return ''
  if (todo.allDay) return 'Ganztag'
  return todo.eventTime || 'ohne Uhrzeit'
}

function formatMonthTitle(monthKey) {
  const [year, month] = monthKey.split('-').map(Number)
  return `${MONTH_LABELS[month - 1]} ${year}`
}

function monthKeyFromDate(value = new Date()) {
  const date = typeof value === 'string' ? new Date(`${value}T00:00:00`) : value
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  return `${year}-${month}`
}

function shiftMonth(monthKey, delta) {
  const [year, month] = monthKey.split('-').map(Number)
  const date = new Date(year, month - 1 + delta, 1)
  return monthKeyFromDate(date)
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

function daysUntil(value) {
  if (!value) return null
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const date = new Date(`${value}T00:00:00`)
  if (Number.isNaN(date.getTime())) return null
  return Math.round((date - today) / 86400000)
}

function laneFromDeadline(value) {
  const diff = daysUntil(value)
  if (diff === null) return 'today'
  if (diff <= 0) return 'urgent'
  if (diff === 1) return 'today'
  return 'watch'
}

function emptyForm() {
  const deadline = todayValue()
  return {
    title: '',
    note: '',
    lane: laneFromDeadline(deadline),
    deadline,
    itemType: 'todo',
    eventTime: '',
    allDay: false,
  }
}

function eventFormForDate(deadline = todayValue()) {
  return {
    title: '',
    note: '',
    lane: laneFromDeadline(deadline),
    deadline,
    itemType: 'event',
    eventTime: '',
    allDay: false,
  }
}

function formFromTodo(todo) {
  return {
    title: todo?.title || '',
    note: todo?.note || '',
    lane: todo?.lane || laneFromDeadline(todo?.deadline),
    deadline: todo?.deadline || todayValue(),
    itemType: todo?.itemType || 'todo',
    eventTime: todo?.eventTime || '',
    allDay: Boolean(todo?.allDay),
  }
}

function effectiveLane(todo) {
  if (!todo?.deadline || todo.done) return todo?.lane || 'today'
  return laneFromDeadline(todo.deadline)
}

export default function TodoPage({ apiBase = '/api/andarun/todos', homeHref = '/andarun', homeLabel = 'Andarun' }) {
  const [todos, setTodos] = useState([])
  const [form, setForm] = useState(() => emptyForm())
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [storageMode, setStorageMode] = useState('online')
  const [message, setMessage] = useState('')
  const [completedOpen, setCompletedOpen] = useState(false)
  const [monthView, setMonthView] = useState(() => monthKeyFromDate())
  const [detailId, setDetailId] = useState(null)
  const [detailForm, setDetailForm] = useState(() => emptyForm())
  const [newEventOpen, setNewEventOpen] = useState(false)
  const [newEventForm, setNewEventForm] = useState(() => eventFormForDate())

  useEffect(() => {
    let active = true

    async function loadTodos() {
      const localTodos = readLocalTodos()

      try {
        const response = await fetch(apiBase, { cache: 'no-store' })
        if (!response.ok) throw new Error('Online storage is not ready yet.')
        const payload = await response.json()
        if (!active) return
        const onlineTodos = Array.isArray(payload.todos) ? payload.todos : []
        const unsyncedTodos = localTodos.filter(todo => String(todo.id || '').startsWith('local-'))

        if (!unsyncedTodos.length) {
          clearLocalTodos()
          setTodos(onlineTodos)
          setStorageMode('online')
          return
        }

        setTodos([...unsyncedTodos, ...onlineTodos])
        setStorageMode('online')
        setMessage('Lokale ToDos werden mit dem Online-Speicher synchronisiert...')

        const syncedTodos = []
        for (const todo of unsyncedTodos) {
          const syncResponse = await fetch(apiBase, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(todoPayload(todo)),
          })
          if (!syncResponse.ok) throw new Error('Could not sync local ToDos online.')
          const syncPayload = await syncResponse.json()
          if (syncPayload.todo) syncedTodos.push(syncPayload.todo)
        }

        if (!active) return
        clearLocalTodos()
        setTodos([...syncedTodos, ...onlineTodos])
        setMessage('')
      } catch (error) {
        if (!active) return
        setTodos(localTodos)
        setStorageMode('local')
        setMessage(error.message)
      } finally {
        if (active) setLoading(false)
      }
    }

    loadTodos()
    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    if (storageMode === 'local' && !loading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
    }
  }, [todos, storageMode, loading])

  const stats = useMemo(() => {
    const taskTodos = todos.filter(todo => todo.itemType !== 'event')
    const open = taskTodos.filter(todo => !todo.done)
    return {
      open: open.length,
      done: taskTodos.length - open.length,
      dueToday: open.filter(todo => daysUntil(todo.deadline) === 0).length,
    }
  }, [todos])

  const grouped = useMemo(() => {
    const result = Object.fromEntries(LANES.map(lane => [lane.id, []]))
    const visibleTodos = todos.filter(todo => todo.itemType !== 'event' && !todo.done)
    for (const todo of visibleTodos) {
      const lane = result[effectiveLane(todo)] ? effectiveLane(todo) : 'today'
      result[lane].push(todo)
    }
    result.watch.sort((a, b) => {
      if (!a.deadline && !b.deadline) return 0
      if (!a.deadline) return 1
      if (!b.deadline) return -1
      return a.deadline.localeCompare(b.deadline)
    })
    return result
  }, [todos])

  const completedGroups = useMemo(() => {
    const groups = new Map()
    const completed = todos
      .filter(todo => todo.itemType !== 'event' && todo.done)
      .sort((a, b) => new Date(b.completedAt || b.updatedAt || 0) - new Date(a.completedAt || a.updatedAt || 0))

    for (const todo of completed) {
      const stamp = todo.completedAt || todo.updatedAt || new Date().toISOString()
      const date = new Date(stamp)
      const key = Number.isNaN(date.getTime()) ? 'Unknown date' : date.toLocaleDateString('en-GB', {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
      if (!groups.has(key)) groups.set(key, [])
      groups.get(key).push(todo)
    }

    return [...groups.entries()].map(([date, items]) => ({ date, items }))
  }, [todos])

  async function createTodo(event) {
    event.preventDefault()
    const title = form.title.trim()
    if (!title) return

    setSaving(true)
    setMessage('')
    const optimistic = {
      id: makeId(),
      title,
      note: form.note.trim(),
      lane: form.lane,
      deadline: form.deadline,
      itemType: form.itemType,
      eventTime: form.itemType === 'event' && !form.allDay ? form.eventTime : '',
      allDay: form.itemType === 'event' ? form.allDay : false,
      done: false,
      completedAt: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    if (storageMode === 'local') {
      setTodos(prev => [optimistic, ...prev])
      setForm(emptyForm())
      setSaving(false)
      return
    }

    try {
      const response = await fetch(apiBase, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!response.ok) throw new Error('Could not save online.')
      const payload = await response.json()
      setTodos(prev => [payload.todo, ...prev])
      setForm(emptyForm())
    } catch (error) {
      setTodos(prev => [optimistic, ...prev])
      setStorageMode('local')
      setMessage(`${error.message} Saved locally for now.`)
      setForm(emptyForm())
    } finally {
      setSaving(false)
    }
  }

  async function saveNewEvent(event) {
    event.preventDefault()
    const title = newEventForm.title.trim()
    if (!title) return

    setSaving(true)
    setMessage('')
    const optimistic = {
      id: makeId(),
      title,
      note: newEventForm.note.trim(),
      lane: laneFromDeadline(newEventForm.deadline),
      deadline: newEventForm.deadline,
      itemType: 'event',
      eventTime: newEventForm.allDay ? '' : newEventForm.eventTime,
      allDay: Boolean(newEventForm.allDay),
      done: false,
      completedAt: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    if (storageMode === 'local') {
      setTodos(prev => [optimistic, ...prev])
      setMonthView(monthKeyFromDate(newEventForm.deadline))
      closeNewEvent()
      setSaving(false)
      return
    }

    try {
      const response = await fetch(apiBase, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newEventForm,
          title,
          note: newEventForm.note.trim(),
          lane: laneFromDeadline(newEventForm.deadline),
          itemType: 'event',
          eventTime: newEventForm.allDay ? '' : newEventForm.eventTime,
        }),
      })
      if (!response.ok) throw new Error('Could not save online.')
      const payload = await response.json()
      setTodos(prev => [payload.todo, ...prev])
      setMonthView(monthKeyFromDate(newEventForm.deadline))
      closeNewEvent()
    } catch (error) {
      setTodos(prev => [optimistic, ...prev])
      setStorageMode('local')
      setMessage(`${error.message} Saved locally for now.`)
      setMonthView(monthKeyFromDate(newEventForm.deadline))
      closeNewEvent()
    } finally {
      setSaving(false)
    }
  }

  const monthDays = useMemo(() => buildMonthDays(monthView), [monthView])

  const eventsByDate = useMemo(() => {
    const map = new Map()
    for (const todo of todos) {
      if (todo.itemType !== 'event' || !todo.deadline || !todo.deadline.startsWith(monthView)) continue
      if (!map.has(todo.deadline)) map.set(todo.deadline, [])
      map.get(todo.deadline).push(todo)
    }
    for (const items of map.values()) {
      items.sort((a, b) => {
        if (a.allDay && !b.allDay) return -1
        if (!a.allDay && b.allDay) return 1
        return (a.eventTime || '').localeCompare(b.eventTime || '')
      })
    }
    return map
  }, [todos, monthView])

  async function patchTodo(id, patch) {
    const previous = todos
    const normalizedPatch = typeof patch.done === 'boolean'
      ? { ...patch, completedAt: patch.done ? new Date().toISOString() : null }
      : patch
    setTodos(prev => prev.map(todo => todo.id === id ? { ...todo, ...normalizedPatch, updatedAt: new Date().toISOString() } : todo))

    if (storageMode === 'local' || id.startsWith('local-')) return

    try {
      const response = await fetch(apiBase, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...patch }),
      })
      if (!response.ok) throw new Error('Could not update online.')
      const payload = await response.json()
      setTodos(prev => prev.map(todo => todo.id === id ? payload.todo : todo))
    } catch (error) {
      setTodos(previous)
      setMessage(error.message)
    }
  }

  async function deleteTodo(id) {
    const previous = todos
    setTodos(prev => prev.filter(todo => todo.id !== id))

    if (storageMode === 'local' || id.startsWith('local-')) return

    try {
      const response = await fetch(`${apiBase}?id=${encodeURIComponent(id)}`, { method: 'DELETE' })
      if (!response.ok) throw new Error('Could not delete online.')
    } catch (error) {
      setTodos(previous)
      setMessage(error.message)
    }
  }

  function openDetail(todo) {
    setDetailId(todo.id)
    setDetailForm(formFromTodo(todo))
  }

  function openNewEvent(day) {
    if (!day) return
    setDetailId(null)
    setNewEventForm(eventFormForDate(day))
    setNewEventOpen(true)
  }

  function closeNewEvent() {
    setNewEventOpen(false)
    setNewEventForm(eventFormForDate())
  }

  function closeDetail() {
    setDetailId(null)
    setDetailForm(emptyForm())
  }

  async function saveDetail(event) {
    event.preventDefault()
    const title = detailForm.title.trim()
    if (!detailId || !title) return

    const patch = {
      title,
      note: detailForm.note.trim(),
      deadline: detailForm.deadline,
      lane: laneFromDeadline(detailForm.deadline),
      itemType: detailForm.itemType,
      allDay: detailForm.itemType === 'event' ? detailForm.allDay : false,
      eventTime: detailForm.itemType === 'event' && !detailForm.allDay ? detailForm.eventTime : '',
    }

    await patchTodo(detailId, patch)
    if (patch.itemType === 'event' && patch.deadline) setMonthView(monthKeyFromDate(patch.deadline))
    closeDetail()
  }

  async function deleteDetail() {
    if (!detailId) return
    await deleteTodo(detailId)
    closeDetail()
  }

  const detailTodo = detailId ? todos.find(todo => todo.id === detailId) : null

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <Link href={homeHref} className={styles.backLink}>{homeLabel}</Link>
        <div>
          <span className={styles.kicker}>Private planning</span>
          <h1>ToDo</h1>
        </div>
        <div className={styles.stats}>
          <span><strong>{stats.open}</strong> open</span>
          <span><strong>{stats.dueToday}</strong> today</span>
          <span><strong>{stats.done}</strong> done</span>
          <button className={styles.completedToggle} type="button" onClick={() => setCompletedOpen(true)}>
            Completed
          </button>
        </div>
      </section>

      {message && <div className={styles.message}>{message}</div>}

      <section className={styles.composer}>
        <form onSubmit={createTodo} className={styles.form}>
          <label className={styles.titleField}>
            Task
            <input value={form.title} onChange={event => setForm(prev => ({ ...prev, title: event.target.value }))} placeholder="What needs to be done?" required />
          </label>
          <label>
            Deadline
            <input type="date" value={form.deadline} onChange={event => {
              const deadline = event.target.value
              setForm(prev => ({ ...prev, deadline, lane: laneFromDeadline(deadline) }))
              if (deadline) setMonthView(monthKeyFromDate(deadline))
            }} min={todayValue()} />
          </label>
          <label>
            Note
            <input value={form.note} onChange={event => setForm(prev => ({ ...prev, note: event.target.value }))} placeholder="Optional" />
          </label>
          {form.itemType === 'event' && (
            <label className={styles.timeField}>
              Time
              <input
                type="time"
                value={form.eventTime}
                onChange={event => setForm(prev => ({ ...prev, eventTime: event.target.value }))}
                disabled={form.allDay}
              />
            </label>
          )}
          <div className={styles.formActions}>
            <label className={`${styles.eventToggle} ${form.itemType === 'event' ? styles.eventToggleActive : ''}`}>
              <input
                type="checkbox"
                checked={form.itemType === 'event'}
                onChange={event => setForm(prev => ({
                  ...prev,
                  itemType: event.target.checked ? 'event' : 'todo',
                  allDay: event.target.checked ? prev.allDay : false,
                  eventTime: event.target.checked ? prev.eventTime : '',
                }))}
              />
              <span>Termin</span>
            </label>
            {form.itemType === 'event' && (
              <label className={styles.eventToggle}>
                <input
                  type="checkbox"
                  checked={form.allDay}
                  onChange={event => setForm(prev => ({
                    ...prev,
                    allDay: event.target.checked,
                    eventTime: event.target.checked ? '' : prev.eventTime,
                  }))}
                />
                <span>Ganztag</span>
              </label>
            )}
            <button className={styles.addBtn} type="submit" disabled={saving || !form.title.trim()}>
              {saving ? 'Saving...' : form.itemType === 'event' ? 'Add Termin' : 'Add ToDo'}
            </button>
          </div>
        </form>
      </section>

      <section className={styles.board} aria-label="ToDo board">
        {LANES.map(lane => (
          <article className={`${styles.column} ${styles[lane.color]}`} key={lane.id}>
            <header className={styles.columnHeader}>
              <div>
                <h2>{lane.title}</h2>
                <p>{lane.subtitle}</p>
              </div>
              <strong>{grouped[lane.id].length}</strong>
            </header>

            <div className={styles.cards}>
              {grouped[lane.id].length ? grouped[lane.id].map(todo => {
                const deadlineDiff = daysUntil(todo.deadline)
                const isSoon = deadlineDiff !== null && deadlineDiff <= 2 && deadlineDiff >= 0 && !todo.done
                return (
                  <div
                    className={`${styles.card} ${todo.done ? styles.done : ''}`}
                    key={todo.id}
                    onClick={() => openDetail(todo)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={event => (event.key === 'Enter' || event.key === ' ') && openDetail(todo)}
                  >
                    <div className={styles.cardTop}>
                      <button type="button" className={styles.checkBtn} onClick={event => { event.stopPropagation(); patchTodo(todo.id, { done: !todo.done }) }} aria-label={todo.done ? 'Mark open' : 'Mark done'}>
                        {todo.done ? '✓' : ''}
                      </button>
                      <strong>{todo.title}</strong>
                    </div>
                    {todo.note && <p>{todo.note}</p>}
                    <div className={styles.cardFooter}>
                      {todo.deadline ? (
                        <span className={`${styles.deadline} ${isSoon ? styles.soon : ''}`}>
                          {todo.itemType === 'event' ? `${formatDeadline(todo.deadline)} · ${formatEventMeta(todo)}` : formatDeadline(todo.deadline)}
                        </span>
                      ) : <span />}
                      <div className={styles.cardActions}>
                        <button type="button" onClick={event => { event.stopPropagation(); openDetail(todo) }}>Edit</button>
                      </div>
                    </div>
                  </div>
                )
              }) : (
                <p className={styles.empty}>Nothing here.</p>
              )}
            </div>
          </article>
        ))}
      </section>

      <section className={styles.monthPanel} aria-label="Termin month view">
        <header className={styles.monthHeader}>
          <div>
            <span className={styles.kicker}>Termine</span>
            <h2>{formatMonthTitle(monthView)}</h2>
          </div>
          <div className={styles.monthControls}>
            <button type="button" onClick={() => setMonthView(prev => shiftMonth(prev, -1))} aria-label="Previous month">‹</button>
            <button type="button" onClick={() => setMonthView(monthKeyFromDate())}>Today</button>
            <button type="button" onClick={() => setMonthView(prev => shiftMonth(prev, 1))} aria-label="Next month">›</button>
          </div>
        </header>

        <div className={styles.monthGrid}>
          {['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map(day => (
            <div className={styles.weekday} key={day}>{day}</div>
          ))}
          {monthDays.map((day, index) => {
            const events = day ? eventsByDate.get(day) || [] : []
            const isToday = day === todayValue()
            return (
              <div
                className={`${styles.monthCell} ${!day ? styles.monthCellEmpty : ''} ${isToday ? styles.monthCellToday : ''}`}
                key={day || `empty-${index}`}
                onClick={() => openNewEvent(day)}
                onKeyDown={event => {
                  if (!day || (event.key !== 'Enter' && event.key !== ' ')) return
                  event.preventDefault()
                  openNewEvent(day)
                }}
                role={day ? 'button' : undefined}
                tabIndex={day ? 0 : undefined}
                aria-label={day ? `Termin am ${formatDeadline(day)} hinzufügen` : undefined}
              >
                {day && <span className={styles.monthDay}>{Number(day.slice(-2))}</span>}
                {events.map(event => (
                  <button
                    className={`${styles.monthEvent} ${event.done ? styles.monthEventDone : ''}`}
                    type="button"
                    onClick={clickEvent => {
                      clickEvent.stopPropagation()
                      openDetail(event)
                    }}
                    onKeyDown={keyEvent => keyEvent.stopPropagation()}
                    title="Termin bearbeiten"
                    key={event.id}
                  >
                    <strong>{event.allDay ? 'Ganztag' : event.eventTime || '--:--'}</strong>
                    <span>{event.title}</span>
                  </button>
                ))}
              </div>
            )
          })}
        </div>
      </section>

      {completedOpen && (
        <div className={styles.modalBackdrop} role="presentation" onMouseDown={() => setCompletedOpen(false)}>
          <section className={styles.completedModal} role="dialog" aria-modal="true" aria-labelledby="completed-title" onMouseDown={event => event.stopPropagation()}>
            <header className={styles.modalHeader}>
              <div>
                <span className={styles.kicker}>Archive</span>
                <h2 id="completed-title">Completed</h2>
              </div>
              <button type="button" className={styles.modalClose} onClick={() => setCompletedOpen(false)} aria-label="Close completed tasks">×</button>
            </header>

            {completedGroups.length ? (
              <div className={styles.completedList}>
                {completedGroups.map(group => (
                  <article className={styles.completedGroup} key={group.date}>
                    <h3>{group.date}</h3>
                    <div className={styles.completedItems}>
                      {group.items.map(todo => (
                        <div className={styles.completedItem} key={todo.id}>
                          <div>
                            <strong>{todo.title}</strong>
                            {todo.note && <p>{todo.note}</p>}
                          </div>
                          <button type="button" onClick={() => patchTodo(todo.id, { done: false })}>Reopen</button>
                        </div>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <p className={styles.emptyCompleted}>No completed tasks yet.</p>
            )}
          </section>
        </div>
      )}

      {newEventOpen && (
        <div className={styles.modalBackdrop} role="presentation" onMouseDown={closeNewEvent}>
          <section className={styles.detailModal} role="dialog" aria-modal="true" aria-labelledby="new-event-title" onMouseDown={event => event.stopPropagation()}>
            <header className={styles.modalHeader}>
              <div>
                <span className={styles.kicker}>{formatDeadline(newEventForm.deadline)}</span>
                <h2 id="new-event-title">Neuer Termin</h2>
              </div>
              <button type="button" className={styles.modalClose} onClick={closeNewEvent} aria-label="Close new event">Ã—</button>
            </header>

            <form className={styles.detailForm} onSubmit={saveNewEvent}>
              <label>
                Titel
                <input value={newEventForm.title} onChange={event => setNewEventForm(prev => ({ ...prev, title: event.target.value }))} placeholder="Was steht an?" required autoFocus />
              </label>
              <label>
                Datum
                <input type="date" value={newEventForm.deadline} onChange={event => {
                  const deadline = event.target.value
                  setNewEventForm(prev => ({ ...prev, deadline, lane: laneFromDeadline(deadline) }))
                }} />
              </label>
              <label>
                Notiz
                <input value={newEventForm.note} onChange={event => setNewEventForm(prev => ({ ...prev, note: event.target.value }))} placeholder="Optional" />
              </label>

              <div className={styles.detailTimeRow}>
                <label>
                  Uhrzeit
                  <input
                    type="time"
                    value={newEventForm.eventTime}
                    disabled={newEventForm.allDay}
                    onChange={event => setNewEventForm(prev => ({ ...prev, eventTime: event.target.value }))}
                  />
                </label>
                <label className={styles.detailAllDayToggle}>
                  <input
                    type="checkbox"
                    checked={newEventForm.allDay}
                    onChange={event => setNewEventForm(prev => ({
                      ...prev,
                      allDay: event.target.checked,
                      eventTime: event.target.checked ? '' : prev.eventTime,
                    }))}
                  />
                  <span>Ganztag</span>
                </label>
              </div>

              <div className={styles.newEventActions}>
                <button className={styles.detailGhostBtn} type="button" onClick={closeNewEvent}>Abbrechen</button>
                <button className={styles.addBtn} type="submit" disabled={saving || !newEventForm.title.trim()}>
                  {saving ? 'Saving...' : 'Termin speichern'}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}

      {detailTodo && (
        <div className={styles.modalBackdrop} role="presentation" onMouseDown={closeDetail}>
          <section className={styles.detailModal} role="dialog" aria-modal="true" aria-labelledby="detail-title" onMouseDown={event => event.stopPropagation()}>
            <header className={styles.modalHeader}>
              <div>
                <span className={styles.kicker}>{detailForm.itemType === 'event' ? 'Termin' : 'ToDo'}</span>
                <h2 id="detail-title">{detailForm.itemType === 'event' ? 'Termin' : 'ToDo'}</h2>
              </div>
              <button type="button" className={styles.modalClose} onClick={closeDetail} aria-label="Close detail">×</button>
            </header>

            <form className={styles.detailForm} onSubmit={saveDetail}>
              <label>
                Titel
                <input value={detailForm.title} onChange={event => setDetailForm(prev => ({ ...prev, title: event.target.value }))} required />
              </label>
              <label>
                Datum
                <input type="date" value={detailForm.deadline} min={todayValue()} onChange={event => {
                  const deadline = event.target.value
                  setDetailForm(prev => ({ ...prev, deadline, lane: laneFromDeadline(deadline) }))
                }} />
              </label>
              <label>
                Notiz
                <input value={detailForm.note} onChange={event => setDetailForm(prev => ({ ...prev, note: event.target.value }))} placeholder="Optional" />
              </label>

              {detailForm.itemType === 'event' && (
                <div className={styles.detailTimeRow}>
                  <label>
                    Uhrzeit
                    <input
                      type="time"
                      value={detailForm.eventTime}
                      disabled={detailForm.allDay}
                      onChange={event => setDetailForm(prev => ({ ...prev, eventTime: event.target.value }))}
                    />
                  </label>
                  <label className={styles.detailAllDayToggle}>
                    <input
                      type="checkbox"
                      checked={detailForm.allDay}
                      onChange={event => setDetailForm(prev => ({
                        ...prev,
                        allDay: event.target.checked,
                        eventTime: event.target.checked ? '' : prev.eventTime,
                      }))}
                    />
                    <span>Ganztag</span>
                  </label>
                </div>
              )}

              <div className={styles.detailActions}>
                <button className={styles.detailDeleteBtn} type="button" onClick={deleteDetail}>Löschen</button>
                <button className={styles.detailGhostBtn} type="button" onClick={() => patchTodo(detailId, { done: !detailTodo.done }).then(closeDetail)}>
                  {detailTodo.done ? 'Wieder öffnen' : 'Erledigt'}
                </button>
                <button className={styles.addBtn} type="submit">Speichern</button>
              </div>
            </form>
          </section>
        </div>
      )}
    </main>
  )
}
