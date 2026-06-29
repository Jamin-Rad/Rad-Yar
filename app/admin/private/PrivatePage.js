'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from '../admin.module.css'

const STORAGE_KEY = 'radyar_private_notes_v1'

function makeId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

export default function PrivatePage() {
  const router = useRouter()
  const [items, setItems] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [form, setForm] = useState({ title: '', note: '', status: 'offen' })

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setItems(JSON.parse(raw))
    } catch {
      setItems([])
    } finally {
      setLoaded(true)
    }
  }, [])

  useEffect(() => {
    if (loaded) localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items, loaded])

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    document.documentElement.classList.remove('admin-copy-enabled')
    router.push('/admin/login')
  }

  function addItem(event) {
    event.preventDefault()
    if (!form.title.trim()) return
    setItems(prev => [{
      id: makeId(),
      title: form.title.trim(),
      note: form.note.trim(),
      status: form.status,
      createdAt: new Date().toISOString(),
    }, ...prev])
    setForm({ title: '', note: '', status: 'offen' })
  }

  function toggleStatus(id) {
    setItems(prev => prev.map(item => item.id === id ? { ...item, status: item.status === 'erledigt' ? 'offen' : 'erledigt' } : item))
  }

  function deleteItem(id) {
    setItems(prev => prev.filter(item => item.id !== id))
  }

  const done = items.filter(item => item.status === 'erledigt').length

  return (
    <div className={styles.page}>
      <div className={styles.adminBar}>
        <div className={styles.adminIdentity}>
          <span className={styles.adminBadge}>Privat</span>
          <strong>Dritte private Seite</strong>
        </div>
        <div className={styles.headerActions}>
          <Link className={styles.profileBtn} href="/admin">Admin-Dashboard</Link>
          <Link className={styles.profileBtn} href="/admin/health">Kalorien & Sport</Link>
          <Link className={styles.profileBtn} href="/admin/budget">Finanzen</Link>
          <button className={styles.signOutBtn} onClick={handleLogout}>Admin abmelden</button>
        </div>
      </div>

      <main className={styles.content}>
        <div className={styles.budgetHero}>
          <div>
            <h1 className={styles.title}>Private Ziele & Notizen</h1>
            <p className={styles.sub}>Vorläufige dritte private Seite für persönliche Ziele, Ideen und Aufgaben. Sag mir später den genauen Zweck, dann forme ich sie um.</p>
          </div>
        </div>

        <section className={styles.budgetSummaryGrid}>
          <div className={styles.budgetMetric}><span>Einträge</span><strong>{items.length}</strong></div>
          <div className={styles.budgetMetric}><span>Erledigt</span><strong>{done}</strong></div>
          <div className={styles.budgetMetric}><span>Offen</span><strong>{items.length - done}</strong></div>
          <div className={styles.budgetMetric}><span>Speicherung</span><strong>Lokal</strong></div>
          <div className={styles.budgetMetric}><span>Bereich</span><strong>Privat</strong></div>
        </section>

        <div className={styles.budgetGrid}>
          <section className={styles.budgetPanel}>
            <h2 className={styles.sectionTitle}>Neuer privater Eintrag</h2>
            <form className={styles.budgetForm} onSubmit={addItem}>
              <label><span>Titel</span><input value={form.title} onChange={event => setForm(prev => ({ ...prev, title: event.target.value }))} placeholder="z. B. Ziel, Erinnerung, Idee" /></label>
              <label><span>Notiz</span><input value={form.note} onChange={event => setForm(prev => ({ ...prev, note: event.target.value }))} placeholder="optional" /></label>
              <div className={styles.segmentedControl}>
                <button type="button" className={form.status === 'offen' ? styles.segmentActive : ''} onClick={() => setForm(prev => ({ ...prev, status: 'offen' }))}>Offen</button>
                <button type="button" className={form.status === 'erledigt' ? styles.segmentActive : ''} onClick={() => setForm(prev => ({ ...prev, status: 'erledigt' }))}>Erledigt</button>
              </div>
              <button className={styles.primaryBudgetBtn} type="submit">Eintrag speichern</button>
            </form>
          </section>

          <section className={styles.budgetPanel}>
            <h2 className={styles.sectionTitle}>Private Bereiche</h2>
            <div className={styles.privateAreaGrid}>
              <Link href="/admin/health">Kalorien & Sport</Link>
              <Link href="/admin/budget">Finanzen</Link>
              <Link href="/admin/private">Ziele & Notizen</Link>
            </div>
          </section>
        </div>

        <section className={styles.budgetPanel}>
          <h2 className={styles.sectionTitle}>Liste</h2>
          {items.length ? (
            <div className={styles.budgetEntryList}>
              {items.map(item => (
                <div className={styles.budgetEntry} key={item.id}>
                  <span className={`${styles.budgetEntryType} ${item.status === 'erledigt' ? styles.entryIncome : styles.entryExpense}`}>{item.status === 'erledigt' ? '✓' : '!'}</span>
                  <div className={styles.budgetEntryMain}>
                    <strong>{item.title}</strong>
                    <span>{new Date(item.createdAt).toLocaleDateString('de-DE')}{item.note ? ` · ${item.note}` : ''}</span>
                  </div>
                  <button className={styles.actionBtn} type="button" onClick={() => toggleStatus(item.id)}>{item.status === 'erledigt' ? 'Öffnen' : 'Erledigt'}</button>
                  <button className={styles.actionBtn} type="button" onClick={() => deleteItem(item.id)}>Löschen</button>
                </div>
              ))}
            </div>
          ) : (
            <p className={styles.emptyAnalytics}>Noch keine privaten Einträge.</p>
          )}
        </section>
      </main>
    </div>
  )
}
