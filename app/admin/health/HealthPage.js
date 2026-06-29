'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from '../admin.module.css'

const STORAGE_KEY = 'radyar_private_health_v1'

function today() {
  return new Date().toISOString().slice(0, 10)
}

function makeId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

function number(value) {
  return Number(value) || 0
}

export default function HealthPage() {
  const router = useRouter()
  const [records, setRecords] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [form, setForm] = useState({
    date: today(),
    calories: '',
    weight: '',
    sportMinutes: '',
    sportType: '',
    note: '',
  })

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setRecords(JSON.parse(raw))
    } catch {
      setRecords([])
    } finally {
      setLoaded(true)
    }
  }, [])

  useEffect(() => {
    if (loaded) localStorage.setItem(STORAGE_KEY, JSON.stringify(records))
  }, [records, loaded])

  const sortedRecords = useMemo(
    () => [...records].sort((a, b) => b.date.localeCompare(a.date)),
    [records]
  )

  const chartRecords = useMemo(
    () => [...records].sort((a, b) => a.date.localeCompare(b.date)).slice(-14),
    [records]
  )

  const summary = useMemo(() => {
    const days = records.length
    const calories = records.reduce((sum, item) => sum + number(item.calories), 0)
    const sport = records.reduce((sum, item) => sum + number(item.sportMinutes), 0)
    const lastWeight = [...records].sort((a, b) => b.date.localeCompare(a.date)).find(item => item.weight)?.weight
    return {
      days,
      avgCalories: days ? Math.round(calories / days) : 0,
      sport,
      lastWeight,
    }
  }, [records])

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    document.documentElement.classList.remove('admin-copy-enabled')
    router.push('/admin/login')
  }

  function saveRecord(event) {
    event.preventDefault()
    const nextRecord = {
      id: makeId(),
      date: form.date || today(),
      calories: number(form.calories),
      weight: form.weight ? number(form.weight) : '',
      sportMinutes: number(form.sportMinutes),
      sportType: form.sportType.trim(),
      note: form.note.trim(),
    }
    setRecords(prev => [nextRecord, ...prev.filter(item => item.date !== nextRecord.date)])
    setForm(prev => ({ ...prev, calories: '', weight: '', sportMinutes: '', sportType: '', note: '' }))
  }

  function deleteRecord(id) {
    setRecords(prev => prev.filter(item => item.id !== id))
  }

  const maxCalories = Math.max(1, ...chartRecords.map(item => number(item.calories)))
  const maxSport = Math.max(1, ...chartRecords.map(item => number(item.sportMinutes)))

  return (
    <div className={styles.page}>
      <div className={styles.adminBar}>
        <div className={styles.adminIdentity}>
          <span className={styles.adminBadge}>Privat</span>
          <strong>Kalorien & Sport</strong>
        </div>
        <div className={styles.headerActions}>
          <Link className={styles.profileBtn} href="/admin">Admin-Dashboard</Link>
          <Link className={styles.profileBtn} href="/admin/budget">Finanzen</Link>
          <Link className={styles.profileBtn} href="/admin/private">Privat</Link>
          <button className={styles.signOutBtn} onClick={handleLogout}>Admin abmelden</button>
        </div>
      </div>

      <main className={styles.content}>
        <div className={styles.budgetHero}>
          <div>
            <h1 className={styles.title}>Kalorien & täglicher Sport</h1>
            <p className={styles.sub}>Täglich Kalorien, Gewicht, Sportdauer und Sportart eintragen. Alles bleibt lokal im Browser.</p>
          </div>
        </div>

        <section className={styles.budgetSummaryGrid}>
          <div className={styles.budgetMetric}><span>Erfasste Tage</span><strong>{summary.days}</strong></div>
          <div className={styles.budgetMetric}><span>Ø Kalorien</span><strong>{summary.avgCalories} kcal</strong></div>
          <div className={styles.budgetMetric}><span>Sport gesamt</span><strong>{summary.sport} Min.</strong></div>
          <div className={styles.budgetMetric}><span>Letztes Gewicht</span><strong>{summary.lastWeight ? `${summary.lastWeight} kg` : '—'}</strong></div>
          <div className={styles.budgetMetric}><span>Heute</span><strong>{today().slice(5).split('-').reverse().join('.')}</strong></div>
        </section>

        <div className={styles.budgetGrid}>
          <section className={styles.budgetPanel}>
            <h2 className={styles.sectionTitle}>Tageswert eintragen</h2>
            <form className={styles.budgetForm} onSubmit={saveRecord}>
              <label><span>Datum</span><input type="date" value={form.date} onChange={event => setForm(prev => ({ ...prev, date: event.target.value }))} /></label>
              <div className={styles.budgetFieldRow}>
                <label><span>Kalorien</span><input type="number" min="0" inputMode="numeric" value={form.calories} onChange={event => setForm(prev => ({ ...prev, calories: event.target.value }))} placeholder="z. B. 2100" /></label>
                <label><span>Gewicht kg</span><input type="number" step="0.1" inputMode="decimal" value={form.weight} onChange={event => setForm(prev => ({ ...prev, weight: event.target.value }))} placeholder="optional" /></label>
              </div>
              <div className={styles.budgetFieldRow}>
                <label><span>Sport Minuten</span><input type="number" min="0" inputMode="numeric" value={form.sportMinutes} onChange={event => setForm(prev => ({ ...prev, sportMinutes: event.target.value }))} placeholder="z. B. 45" /></label>
                <label><span>Sportart</span><input value={form.sportType} onChange={event => setForm(prev => ({ ...prev, sportType: event.target.value }))} placeholder="Gym, Laufen, Fahrrad" /></label>
              </div>
              <label><span>Notiz</span><input value={form.note} onChange={event => setForm(prev => ({ ...prev, note: event.target.value }))} placeholder="optional" /></label>
              <button className={styles.primaryBudgetBtn} type="submit">Tag speichern</button>
            </form>
          </section>

          <section className={styles.budgetPanel}>
            <h2 className={styles.sectionTitle}>Diagramm letzte 14 Einträge</h2>
            {chartRecords.length ? (
              <div className={styles.privateChart}>
                {chartRecords.map(item => (
                  <div className={styles.privateChartCol} key={item.id}>
                    <div className={styles.privateChartBars}>
                      <span className={styles.privateCaloriesBar} style={{ height: `${Math.max((number(item.calories) / maxCalories) * 100, 4)}%` }} title={`${item.calories} kcal`} />
                      <span className={styles.privateSportBar} style={{ height: `${Math.max((number(item.sportMinutes) / maxSport) * 100, 4)}%` }} title={`${item.sportMinutes} Min.`} />
                    </div>
                    <small>{item.date.slice(5)}</small>
                  </div>
                ))}
              </div>
            ) : (
              <p className={styles.emptyAnalytics}>Noch keine Werte eingetragen.</p>
            )}
            <div className={styles.privateLegend}>
              <span><i className={styles.legendCalories} /> Kalorien</span>
              <span><i className={styles.legendSport} /> Sport</span>
            </div>
          </section>
        </div>

        <section className={styles.budgetPanel}>
          <h2 className={styles.sectionTitle}>Tagebuch</h2>
          {sortedRecords.length ? (
            <div className={styles.budgetEntryList}>
              {sortedRecords.map(item => (
                <div className={styles.budgetEntry} key={item.id}>
                  <span className={`${styles.budgetEntryType} ${styles.entryIncome}`}>{item.date.slice(8)}</span>
                  <div className={styles.budgetEntryMain}>
                    <strong>{item.calories} kcal · {item.sportMinutes} Min. Sport</strong>
                    <span>{item.date}{item.weight ? ` · ${item.weight} kg` : ''}{item.sportType ? ` · ${item.sportType}` : ''}{item.note ? ` · ${item.note}` : ''}</span>
                  </div>
                  <button className={styles.actionBtn} type="button" onClick={() => deleteRecord(item.id)}>Löschen</button>
                </div>
              ))}
            </div>
          ) : (
            <p className={styles.emptyAnalytics}>Noch keine Kalorien- oder Sporteinträge.</p>
          )}
        </section>
      </main>
    </div>
  )
}
