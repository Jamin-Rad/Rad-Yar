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

function makeId() {
  return `local-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
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
  }
}

function effectiveLane(todo) {
  if (!todo?.deadline || todo.done) return todo?.lane || 'today'
  return laneFromDeadline(todo.deadline)
}

export default function TodoPage() {
  const [todos, setTodos] = useState([])
  const [form, setForm] = useState(() => emptyForm())
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [storageMode, setStorageMode] = useState('online')
  const [message, setMessage] = useState('')
  const [showCompleted, setShowCompleted] = useState(false)

  useEffect(() => {
    let active = true

    async function loadTodos() {
      try {
        const response = await fetch('/api/andarun/todos', { cache: 'no-store' })
        if (!response.ok) throw new Error('Online storage is not ready yet.')
        const payload = await response.json()
        if (!active) return
        setTodos(Array.isArray(payload.todos) ? payload.todos : [])
        setStorageMode('online')
      } catch (error) {
        if (!active) return
        try {
          const local = localStorage.getItem(STORAGE_KEY)
          setTodos(local ? JSON.parse(local) : [])
        } catch {
          setTodos([])
        }
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
    const open = todos.filter(todo => !todo.done)
    return {
      open: open.length,
      done: todos.length - open.length,
      dueToday: open.filter(todo => daysUntil(todo.deadline) === 0).length,
    }
  }, [todos])

  const grouped = useMemo(() => {
    const result = Object.fromEntries(LANES.map(lane => [lane.id, []]))
    const visibleTodos = showCompleted ? todos : todos.filter(todo => !todo.done)
    for (const todo of visibleTodos) {
      const lane = result[effectiveLane(todo)] ? effectiveLane(todo) : 'today'
      result[lane].push(todo)
    }
    return result
  }, [todos, showCompleted])

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
      done: false,
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
      const response = await fetch('/api/andarun/todos', {
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

  async function patchTodo(id, patch) {
    const previous = todos
    setTodos(prev => prev.map(todo => todo.id === id ? { ...todo, ...patch, updatedAt: new Date().toISOString() } : todo))

    if (storageMode === 'local' || id.startsWith('local-')) return

    try {
      const response = await fetch('/api/andarun/todos', {
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
      const response = await fetch(`/api/andarun/todos?id=${encodeURIComponent(id)}`, { method: 'DELETE' })
      if (!response.ok) throw new Error('Could not delete online.')
    } catch (error) {
      setTodos(previous)
      setMessage(error.message)
    }
  }

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <Link href="/andarun" className={styles.backLink}>Andarun</Link>
        <div>
          <span className={styles.kicker}>Private planning</span>
          <h1>ToDo</h1>
        </div>
        <div className={styles.stats}>
          <span><strong>{stats.open}</strong> open</span>
          <span><strong>{stats.dueToday}</strong> today</span>
          <span><strong>{stats.done}</strong> done</span>
          <button className={styles.completedToggle} type="button" onClick={() => setShowCompleted(value => !value)}>
            {showCompleted ? 'Hide completed' : 'Show completed'}
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
            }} min={todayValue()} />
          </label>
          <label>
            Note
            <input value={form.note} onChange={event => setForm(prev => ({ ...prev, note: event.target.value }))} placeholder="Optional" />
          </label>
          <button className={styles.addBtn} type="submit" disabled={saving || !form.title.trim()}>
            {saving ? 'Saving...' : 'Add ToDo'}
          </button>
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
                  <div className={`${styles.card} ${todo.done ? styles.done : ''}`} key={todo.id}>
                    <div className={styles.cardTop}>
                      <button type="button" className={styles.checkBtn} onClick={() => patchTodo(todo.id, { done: !todo.done })} aria-label={todo.done ? 'Mark open' : 'Mark done'}>
                        {todo.done ? '✓' : ''}
                      </button>
                      <strong>{todo.title}</strong>
                    </div>
                    {todo.note && <p>{todo.note}</p>}
                    <div className={styles.cardFooter}>
                      {todo.deadline ? (
                        <span className={`${styles.deadline} ${isSoon ? styles.soon : ''}`}>
                          {formatDeadline(todo.deadline)}
                        </span>
                      ) : <span />}
                      <div className={styles.cardActions}>
                        <button type="button" onClick={() => deleteTodo(todo.id)}>Delete</button>
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
    </main>
  )
}
