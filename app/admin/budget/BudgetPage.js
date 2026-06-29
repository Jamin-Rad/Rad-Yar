'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from '../admin.module.css'

const STORAGE_KEY = 'radyar_private_budget_v1'

function getMonthKey(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
}

function formatMoney(value) {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 2,
  }).format(Number(value) || 0)
}

function emptyMonth() {
  return {
    budget: '',
    entries: [],
  }
}

function makeEntryId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

export default function BudgetPage() {
  const router = useRouter()
  const [month, setMonth] = useState(getMonthKey())
  const [store, setStore] = useState({})
  const [loaded, setLoaded] = useState(false)
  const [budgetInput, setBudgetInput] = useState('')
  const [entry, setEntry] = useState({
    type: 'expense',
    amount: '',
    title: '',
    category: '',
    date: new Date().toISOString().slice(0, 10),
  })

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setStore(JSON.parse(raw))
    } catch {
      setStore({})
    } finally {
      setLoaded(true)
    }
  }, [])

  useEffect(() => {
    if (!loaded) return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
  }, [store, loaded])

  const monthData = store[month] || emptyMonth()

  useEffect(() => {
    setBudgetInput(monthData.budget || '')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [month, loaded])

  const summary = useMemo(() => {
    const income = monthData.entries
      .filter(item => item.type === 'income')
      .reduce((sum, item) => sum + Number(item.amount || 0), 0)
    const expenses = monthData.entries
      .filter(item => item.type === 'expense')
      .reduce((sum, item) => sum + Number(item.amount || 0), 0)
    const budget = Number(monthData.budget || 0)
    return {
      income,
      expenses,
      budget,
      balance: income - expenses,
      remaining: budget - expenses,
    }
  }, [monthData])

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    document.documentElement.classList.remove('admin-copy-enabled')
    router.push('/admin/login')
  }

  function updateMonth(updater) {
    setStore(prev => {
      const current = prev[month] || emptyMonth()
      return {
        ...prev,
        [month]: updater(current),
      }
    })
  }

  function saveBudget(event) {
    event.preventDefault()
    updateMonth(current => ({ ...current, budget: budgetInput }))
  }

  function addEntry(event) {
    event.preventDefault()
    const amount = Number(entry.amount)
    if (!entry.title.trim() || !amount) return

    updateMonth(current => ({
      ...current,
      entries: [
        {
          id: makeEntryId(),
          type: entry.type,
          amount,
          title: entry.title.trim(),
          category: entry.category.trim(),
          date: entry.date || new Date().toISOString().slice(0, 10),
        },
        ...current.entries,
      ],
    }))
    setEntry(prev => ({ ...prev, amount: '', title: '', category: '' }))
  }

  function deleteEntry(id) {
    updateMonth(current => ({
      ...current,
      entries: current.entries.filter(item => item.id !== id),
    }))
  }

  function clearMonth() {
    if (!window.confirm(`Alle privaten Budget-Einträge für ${month} löschen?`)) return
    setStore(prev => {
      const next = { ...prev }
      delete next[month]
      return next
    })
  }

  return (
    <div className={styles.page}>
      <div className={styles.adminBar}>
        <div className={styles.adminIdentity}>
          <span className={styles.adminBadge}>Privat</span>
          <strong>Monatliches Budget</strong>
        </div>
        <div className={styles.headerActions}>
          <Link className={styles.profileBtn} href="/admin">Admin-Dashboard</Link>
          <Link className={styles.homeBtn} href="/">Zur Hauptseite</Link>
          <button className={styles.signOutBtn} onClick={handleLogout}>Admin abmelden</button>
        </div>
      </div>

      <main className={styles.content}>
        <div className={styles.budgetHero}>
          <div>
            <h1 className={styles.title}>Privates Budget</h1>
            <p className={styles.sub}>Monatsbudget, Einnahmen und Ausgaben lokal und privat verwalten.</p>
          </div>
          <label className={styles.budgetMonthPicker}>
            <span>Monat</span>
            <input type="month" value={month} onChange={event => setMonth(event.target.value || getMonthKey())} />
          </label>
        </div>

        <section className={styles.budgetSummaryGrid} aria-label="Budget Übersicht">
          <div className={styles.budgetMetric}>
            <span>Monatsbudget</span>
            <strong>{formatMoney(summary.budget)}</strong>
          </div>
          <div className={styles.budgetMetric}>
            <span>Einnahmen</span>
            <strong>{formatMoney(summary.income)}</strong>
          </div>
          <div className={styles.budgetMetric}>
            <span>Ausgaben</span>
            <strong>{formatMoney(summary.expenses)}</strong>
          </div>
          <div className={styles.budgetMetric}>
            <span>Saldo</span>
            <strong className={summary.balance >= 0 ? styles.moneyPositive : styles.moneyNegative}>{formatMoney(summary.balance)}</strong>
          </div>
          <div className={styles.budgetMetric}>
            <span>Budget übrig</span>
            <strong className={summary.remaining >= 0 ? styles.moneyPositive : styles.moneyNegative}>{formatMoney(summary.remaining)}</strong>
          </div>
        </section>

        <div className={styles.budgetGrid}>
          <section className={styles.budgetPanel}>
            <h2 className={styles.sectionTitle}>Monatsbudget festlegen</h2>
            <form className={styles.budgetForm} onSubmit={saveBudget}>
              <label>
                <span>Geplantes Ausgabenbudget</span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  inputMode="decimal"
                  value={budgetInput}
                  onChange={event => setBudgetInput(event.target.value)}
                  placeholder="z. B. 2500"
                />
              </label>
              <button className={styles.primaryBudgetBtn} type="submit">Budget speichern</button>
            </form>
          </section>

          <section className={styles.budgetPanel}>
            <h2 className={styles.sectionTitle}>Einnahme oder Ausgabe schreiben</h2>
            <form className={styles.budgetForm} onSubmit={addEntry}>
              <div className={styles.segmentedControl}>
                <button
                  type="button"
                  className={entry.type === 'income' ? styles.segmentActive : ''}
                  onClick={() => setEntry(prev => ({ ...prev, type: 'income' }))}
                >
                  Einnahme
                </button>
                <button
                  type="button"
                  className={entry.type === 'expense' ? styles.segmentActive : ''}
                  onClick={() => setEntry(prev => ({ ...prev, type: 'expense' }))}
                >
                  Ausgabe
                </button>
              </div>
              <label>
                <span>Titel</span>
                <input value={entry.title} onChange={event => setEntry(prev => ({ ...prev, title: event.target.value }))} placeholder="z. B. Gehalt, Miete, Praxis" />
              </label>
              <div className={styles.budgetFieldRow}>
                <label>
                  <span>Betrag</span>
                  <input type="number" step="0.01" inputMode="decimal" value={entry.amount} onChange={event => setEntry(prev => ({ ...prev, amount: event.target.value }))} placeholder="0,00" />
                </label>
                <label>
                  <span>Datum</span>
                  <input type="date" value={entry.date} onChange={event => setEntry(prev => ({ ...prev, date: event.target.value }))} />
                </label>
              </div>
              <label>
                <span>Kategorie</span>
                <input value={entry.category} onChange={event => setEntry(prev => ({ ...prev, category: event.target.value }))} placeholder="z. B. Wohnen, Auto, Steuer" />
              </label>
              <button className={styles.primaryBudgetBtn} type="submit">Eintrag hinzufügen</button>
            </form>
          </section>
        </div>

        <section className={styles.budgetPanel}>
          <div className={styles.tableHead}>
            <h2 className={styles.sectionTitle}>Einträge für {month}</h2>
            <button className={`${styles.actionBtn} ${styles.actionBtnDanger}`} onClick={clearMonth} type="button">Monat löschen</button>
          </div>
          {monthData.entries.length ? (
            <div className={styles.budgetEntryList}>
              {monthData.entries.map(item => (
                <div className={styles.budgetEntry} key={item.id}>
                  <span className={`${styles.budgetEntryType} ${item.type === 'income' ? styles.entryIncome : styles.entryExpense}`}>
                    {item.type === 'income' ? '+' : '-'}
                  </span>
                  <div className={styles.budgetEntryMain}>
                    <strong>{item.title}</strong>
                    <span>{new Date(item.date).toLocaleDateString('de-DE')}{item.category ? ` · ${item.category}` : ''}</span>
                  </div>
                  <strong className={item.type === 'income' ? styles.moneyPositive : styles.moneyNegative}>
                    {item.type === 'income' ? '+' : '-'}{formatMoney(item.amount)}
                  </strong>
                  <button className={styles.actionBtn} type="button" onClick={() => deleteEntry(item.id)}>Löschen</button>
                </div>
              ))}
            </div>
          ) : (
            <p className={styles.emptyAnalytics}>Noch keine privaten Budget-Einträge für diesen Monat.</p>
          )}
        </section>
      </main>
    </div>
  )
}
