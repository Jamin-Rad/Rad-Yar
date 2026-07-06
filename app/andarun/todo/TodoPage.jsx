'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import styles from './page.module.css'

const STORAGE_KEY = 'andarun_todos_fallback_v1'

const LANES = [
  {
    id: 'urgent',
    title: 'Urgent',
    subtitle: 'needs attention now',
    color: 'red',
  },
  {
    id: 'today',
    title: 'Today',
    subtitle: 'for this day',
    color: 'gold',
  },
  {
    id: 'watch',
    title: 'In sight',
    subtitle: 'long-term, keep visible',
    color: 'violet',
  },
]

const EMPTY_FORM = {
  title: '',
  note: '',
  lane: 'today',
  deadline: '',
}

function makeId() {
  return `local-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
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

export default function TodoPage() {
  const [todos, setTodos] = useState([])
  const [form, setForm] = useState(EMPTY_FORM)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [storageMode, setStorageMode] = useState('online')
  const [message, setMessage] = useState('')

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
    const overdue = open.filter(todo => {
      const diff = daysUntil(todo.deadline)
      return diff !== null && diff < 0
    })
    return {
      open: open.length,
      done: todos.length - open.length,
      overdue: overdue.length,
    }
  }, [todos])

  const grouped = useMemo(() => {
    const result = Object.fromEntries(LANES.map(lane => [lane.id, []]))
    for (const todo of todos) {
      const lane = result[todo.lane] ? todo.lane : 'today'
      result[lane].push(todo)
    }
    return result
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
      done: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    if (storageMode === 'local') {
      setTodos(prev => [optimistic, ...prev])
      setForm(EMPTY_FORM)
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
      setForm(EMPTY_FORM)
    } catch (error) {
      setTodos(prev => [optimistic, ...prev])
      setStorageMode('local')
      setMessage(`${error.message} Saved locally for now.`)
      setForm(EMPTY_FORM)
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
          <span><strong>{stats.overdue}</strong> overdue</span>
          <span><strong>{stats.done}</strong> done</span>
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
            <input type="date" value={form.deadline} onChange={event => setForm(prev => ({ ...prev, deadline: event.target.value }))} />
          </label>
          <label>
            Note
            <input value={form.note} onChange={event => setForm(prev => ({ ...prev, note: event.target.value }))} placeholder="Optional" />
          </label>
          <div className={styles.segmented} aria-label="Priority">
            {LANES.map(lane => (
              <button key={lane.id} type="button" className={form.lane === lane.id ? styles.activeSegment : ''} onClick={() => setForm(prev => ({ ...prev, lane: lane.id }))}>
                {lane.title}
              </button>
            ))}
          </div>
          <button className={styles.addBtn} type="submit" disabled={saving || !form.title.trim()}>
            {saving ? 'Saving...' : 'Add ToDo'}
          </button>
        </form>
        <span className={`${styles.storageBadge} ${storageMode === 'online' ? styles.online : styles.local}`}>
          {storageMode === 'online' ? 'Online' : 'Local fallback'}
        </span>
      </section>

      <section className={styles.board} aria-label="ToDo board">
        {LANES.map(lane => (
          <article className={`${styles.column} ${styles[lane.color]}`} key={lane.id}>
            <header className={styles.columnHeader}>
              <div>
                <h2>{lane.title}</h2>
                <p>{lane.subtitle}</p>
              </div>
              <strong>{grouped[lane.id].filter(todo => !todo.done).length}</strong>
            </header>

            <div className={styles.cards}>
              {grouped[lane.id].length ? grouped[lane.id].map(todo => {
                const deadlineDiff = daysUntil(todo.deadline)
                const isOverdue = deadlineDiff !== null && deadlineDiff < 0 && !todo.done
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
                        <span className={`${styles.deadline} ${isOverdue ? styles.overdue : ''} ${isSoon ? styles.soon : ''}`}>
                          {formatDeadline(todo.deadline)}
                        </span>
                      ) : <span />}
                      <div className={styles.cardActions}>
                        {LANES.filter(next => next.id !== todo.lane).map(next => (
                          <button key={next.id} type="button" onClick={() => patchTodo(todo.id, { lane: next.id })}>{next.title}</button>
                        ))}
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
