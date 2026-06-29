'use client'

import { useEffect, useMemo, useState } from 'react'
import styles from '../admin.module.css'

const STORAGE_KEY = 'radyar_private_budget_v1'

function makeEntryId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

const APRIL_2026_EXAMPLE = {
  budget: '',
  entries: [
    ['income', 'Einnahmen', 6601.50, 'Einnahmen', '2026-04-01'],
    ['income', 'Familienkasse', 518, 'Einnahmen', '2026-04-01'],
    ['expense', 'Aldi', 161, 'Lebensmittel', '2026-04-02'],
    ['expense', 'Lidl', 535, 'Lebensmittel', '2026-04-03'],
    ['expense', 'Bonus', 60, 'Lebensmittel', '2026-04-04'],
    ['expense', 'Edeka/Rewe/Netto', 53, 'Lebensmittel', '2026-04-05'],
    ['expense', 'DM', 20, 'Lebensmittel', '2026-04-06'],
    ['expense', 'Türkei', 182, 'Lebensmittel', '2026-04-07'],
    ['expense', 'Supermarkt', 5, 'Kleidung', '2026-04-08'],
    ['expense', 'Eis/Coffee/Bäckerei', 19, 'Restaurant', '2026-04-09'],
    ['expense', 'Essen', 193, 'Restaurant', '2026-04-10'],
    ['expense', 'Tanken', 39, 'Auto', '2026-04-11'],
    ['expense', 'Strom', 13, 'Auto', '2026-04-12'],
    ['expense', 'Reparatur/Service', 1392, 'Auto', '2026-04-13'],
    ['expense', 'Leasing', 348, 'Auto', '2026-04-14'],
    ['expense', 'Bus-Ticket', 92, 'Auto', '2026-04-15'],
    ['expense', 'Miete', 2025, 'Zu Hause', '2026-04-01'],
    ['expense', 'Darlehen', 475, 'Zu Hause', '2026-04-02'],
    ['expense', 'Strom', 91, 'Zu Hause', '2026-04-03'],
    ['expense', 'Haushaltgerät', 95, 'Zu Hause', '2026-04-04'],
    ['expense', 'Konto', 11, 'Jamin', '2026-04-16'],
    ['expense', 'Gothaer', 22, 'Jamin', '2026-04-17'],
    ['expense', 'Medikamente', 10, 'Jamin', '2026-04-18'],
    ['expense', 'iPhone 16', 53, 'Fatima', '2026-04-19'],
    ['expense', 'Kleidung', 5, 'Fatima', '2026-04-20'],
    ['expense', 'Medikamente', 296, 'Fatima', '2026-04-21'],
    ['expense', 'Schule', 1029, 'Mobin', '2026-04-22'],
    ['expense', 'Taschengeld', 18, 'Mobin', '2026-04-23'],
    ['expense', 'Bus-Ticket', 45, 'Mobin', '2026-04-24'],
    ['expense', 'SIM-Karte', 9, 'Mobin', '2026-04-25'],
    ['expense', 'Kindergarten', 370, 'Mobina', '2026-04-26'],
    ['expense', 'Kleidung', 10, 'Mobina', '2026-04-27'],
    ['expense', 'Apotheke, Versicherung', 46, 'Meine Eltern', '2026-04-28'],
    ['expense', 'Sonst', 3, 'Meine Eltern', '2026-04-28'],
    ['expense', 'Nazri Iran', 77, 'Moschee', '2026-04-29'],
  ].map(([type, title, amount, category, date]) => ({ id: makeEntryId(), type, title, amount, category, date })),
}

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

function formatMonthLabel(monthKey) {
  const [year, m] = monthKey.split('-').map(Number)
  return new Date(year, m - 1, 1).toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })
}

function emptyMonth() {
  return { budget: '', entries: [] }
}

export default function BudgetPage() {
  const router = useRouter()
  const [tab, setTab] = useState('kategorien')
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
    const income = monthData.entries.filter(i => i.type === 'income').reduce((s, i) => s + Number(i.amount || 0), 0)
    const expenses = monthData.entries.filter(i => i.type === 'expense').reduce((s, i) => s + Number(i.amount || 0), 0)
    const budget = Number(monthData.budget || 0)
    return { income, expenses, budget, balance: income - expenses, remaining: budget - expenses }
  }, [monthData])

  const categoryTotals = useMemo(() => {
    const totals = {}
    monthData.entries.filter(i => i.type === 'expense').forEach(i => {
      const key = i.category || 'Ohne Kategorie'
      totals[key] = (totals[key] || 0) + Number(i.amount || 0)
    })
    return Object.entries(totals).sort((a, b) => b[1] - a[1])
  }, [monthData.entries])

  const incomeTotals = useMemo(() => {
    const totals = {}
    monthData.entries.filter(i => i.type === 'income').forEach(i => {
      const key = i.title || 'Einnahme'
      totals[key] = (totals[key] || 0) + Number(i.amount || 0)
    })
    return Object.entries(totals).sort((a, b) => b[1] - a[1])
  }, [monthData.entries])

  const allCategories = useMemo(() => {
    const cats = new Set()
    Object.values(store).forEach(m => m.entries?.forEach(e => { if (e.category) cats.add(e.category) }))
    return [...cats].sort()
  }, [store])

  const maxCategory = categoryTotals.length ? Math.max(...categoryTotals.map(([, v]) => v)) : 1

  function prevMonth() {
    const [y, m] = month.split('-').map(Number)
    setMonth(getMonthKey(new Date(y, m - 2, 1)))
  }

  function nextMonth() {
    const [y, m] = month.split('-').map(Number)
    setMonth(getMonthKey(new Date(y, m, 1)))
  }

  function updateMonth(updater) {
    setStore(prev => {
      const current = prev[month] || emptyMonth()
      return { ...prev, [month]: updater(current) }
    })
  }

  function saveBudget(e) {
    e.preventDefault()
    updateMonth(current => ({ ...current, budget: budgetInput }))
  }

  function addEntry(e) {
    e.preventDefault()
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
    setTab('eintraege')
  }

  function deleteEntry(id) {
    updateMonth(current => ({ ...current, entries: current.entries.filter(i => i.id !== id) }))
  }

  function clearMonth() {
    if (!window.confirm(`Alle Einträge für ${formatMonthLabel(month)} löschen?`)) return
    setStore(prev => { const next = { ...prev }; delete next[month]; return next })
  }

  function loadAprilExample() {
    if (!window.confirm('April 2026 Beispiel laden?')) return
    setMonth('2026-04')
    setStore(prev => ({ ...prev, '2026-04': APRIL_2026_EXAMPLE }))
  }

  return (
    <div className={styles.page}>
      <main className={styles.content}>

        {/* Page header + month navigation */}
        <div className={styles.financeHeader}>
          <h1 className={styles.title}>Private Finanzen</h1>
          <div className={styles.monthNav}>
            <button className={styles.monthNavBtn} onClick={prevMonth} aria-label="Vorheriger Monat">‹</button>
            <input
              type="month"
              className={styles.monthDisplay}
              value={month}
              onChange={e => setMonth(e.target.value || getMonthKey())}
            />
            <button className={styles.monthNavBtn} onClick={nextMonth} aria-label="Nächster Monat">›</button>
          </div>
        </div>

        {/* 4 key metrics */}
        <div className={styles.financeMetrics}>
          <div className={styles.financeMetric}>
            <span>Einnahmen</span>
            <strong className={styles.moneyPositive}>{formatMoney(summary.income)}</strong>
          </div>
          <div className={styles.financeMetric}>
            <span>Ausgaben</span>
            <strong className={styles.moneyNegative}>{formatMoney(summary.expenses)}</strong>
          </div>
          <div className={styles.financeMetric}>
            <span>Saldo</span>
            <strong className={summary.balance >= 0 ? styles.moneyPositive : styles.moneyNegative}>
              {formatMoney(summary.balance)}
            </strong>
          </div>
          <div className={styles.financeMetric}>
            <span>Budget übrig</span>
            <strong className={summary.remaining >= 0 ? styles.moneyPositive : styles.moneyNegative}>
              {summary.budget ? formatMoney(summary.remaining) : '—'}
            </strong>
          </div>
        </div>

        {/* Tabs */}
        <div className={styles.financeTabs} role="tablist">
          <button role="tab" aria-selected={tab === 'kategorien'} className={tab === 'kategorien' ? styles.financeTabActive : styles.financeTab} onClick={() => setTab('kategorien')}>Kategorien</button>
          <button role="tab" aria-selected={tab === 'eintraege'} className={tab === 'eintraege' ? styles.financeTabActive : styles.financeTab} onClick={() => setTab('eintraege')}>
            Einträge <span>({monthData.entries.length})</span>
          </button>
          <button role="tab" aria-selected={tab === 'bericht'} className={tab === 'bericht' ? styles.financeTabActive : styles.financeTab} onClick={() => setTab('bericht')}>Bericht</button>
          <button role="tab" aria-selected={tab === 'neu'} className={tab === 'neu' ? styles.financeTabActive : styles.financeTab} onClick={() => setTab('neu')}>+ Eintrag</button>
        </div>

        {/* ── KATEGORIEN ── */}
        {tab === 'kategorien' && (
          <div>
            <form className={styles.budgetSettingRow} onSubmit={saveBudget}>
              <label htmlFor="budget-input">Monatsbudget (€)</label>
              <input
                id="budget-input"
                type="number"
                min="0"
                step="0.01"
                inputMode="decimal"
                value={budgetInput}
                onChange={e => setBudgetInput(e.target.value)}
                placeholder="z. B. 7000"
              />
              <button type="submit">Speichern</button>
            </form>

            {categoryTotals.length ? (
              <div className={styles.categoryList}>
                {categoryTotals.map(([category, total]) => (
                  <div className={styles.categoryRow} key={category}>
                    <span className={styles.categoryName}>{category}</span>
                    <div className={styles.categoryBarTrack}>
                      <div
                        className={styles.categoryBarFill}
                        style={{ width: `${Math.max((total / maxCategory) * 100, 2)}%` }}
                      />
                    </div>
                    <span className={styles.categoryAmount}>{formatMoney(total)}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className={styles.emptyAnalytics}>
                Noch keine Ausgaben für {formatMonthLabel(month)}.{' '}
                <button className={styles.actionBtn} type="button" onClick={() => setTab('neu')}>
                  + Eintrag hinzufügen
                </button>
              </p>
            )}

            <div style={{ marginTop: 32 }}>
              <button className={styles.actionBtn} type="button" onClick={loadAprilExample}>April-Beispiel laden</button>
            </div>
          </div>
        )}

        {/* ── EINTRÄGE ── */}
        {tab === 'eintraege' && (
          <div>
            <div className={styles.tableHead}>
              <h2 className={styles.sectionTitle} style={{ margin: 0 }}>Einträge — {formatMonthLabel(month)}</h2>
              <button className={`${styles.actionBtn} ${styles.actionBtnDanger}`} type="button" onClick={clearMonth}>
                Monat löschen
              </button>
            </div>

            {monthData.entries.length ? (
              <div className={styles.budgetEntryList} style={{ marginTop: 20 }}>
                {monthData.entries.map(item => (
                  <div className={styles.budgetEntry} key={item.id}>
                    <span className={`${styles.budgetEntryType} ${item.type === 'income' ? styles.entryIncome : styles.entryExpense}`}>
                      {item.type === 'income' ? '+' : '−'}
                    </span>
                    <div className={styles.budgetEntryMain}>
                      <strong>{item.title}</strong>
                      <span>
                        {new Date(item.date).toLocaleDateString('de-DE')}
                        {item.category ? ` · ${item.category}` : ''}
                      </span>
                    </div>
                    <strong className={item.type === 'income' ? styles.moneyPositive : styles.moneyNegative}>
                      {item.type === 'income' ? '+' : '−'}{formatMoney(item.amount)}
                    </strong>
                    <button className={styles.actionBtn} type="button" onClick={() => deleteEntry(item.id)}>×</button>
                  </div>
                ))}
              </div>
            ) : (
              <p className={styles.emptyAnalytics} style={{ marginTop: 20 }}>
                Noch keine Einträge.{' '}
                <button className={styles.actionBtn} type="button" onClick={() => setTab('neu')}>
                  + Eintrag hinzufügen
                </button>
              </p>
            )}
          </div>
        )}

        {/* ── BERICHT ── */}
        {tab === 'bericht' && (
          <div>
            <div className={styles.reportHeader}>
              <div>
                <h2 className={styles.sectionTitle} style={{ margin: 0 }}>Monatsbericht</h2>
                <p>{formatMonthLabel(month)}</p>
              </div>
              <button className={styles.printBtn} type="button" onClick={() => window.print()}>
                🖨 Drucken
              </button>
            </div>

            {incomeTotals.length > 0 && (
              <div className={styles.reportSection}>
                <p className={styles.reportSectionTitle}>Einnahmen</p>
                <div className={styles.reportGrid}>
                  {incomeTotals.map(([cat, total]) => (
                    <div className={styles.reportCard} key={cat}>
                      <span>{cat}</span>
                      <strong className={styles.moneyPositive}>{formatMoney(total)}</strong>
                    </div>
                  ))}
                </div>
                <div className={styles.reportTotalRow}>
                  <span>Gesamt Einnahmen</span>
                  <strong className={styles.moneyPositive}>{formatMoney(summary.income)}</strong>
                </div>
              </div>
            )}

            {categoryTotals.length > 0 && (
              <div className={styles.reportSection}>
                <p className={styles.reportSectionTitle}>Ausgaben nach Kategorie</p>
                <div className={styles.reportGrid}>
                  {categoryTotals.map(([cat, total]) => (
                    <div className={styles.reportCard} key={cat}>
                      <span>{cat}</span>
                      <strong>{formatMoney(total)}</strong>
                    </div>
                  ))}
                </div>
                <div className={styles.reportTotalRow}>
                  <span>Gesamt Ausgaben</span>
                  <strong className={styles.moneyNegative}>{formatMoney(summary.expenses)}</strong>
                </div>
              </div>
            )}

            {(incomeTotals.length > 0 || categoryTotals.length > 0) && (
              <div
                className={styles.reportSaldoRow}
                style={{
                  border: `1px solid ${summary.balance >= 0 ? '#16a34a' : '#dc2626'}`,
                  background: summary.balance >= 0 ? 'rgba(22,163,74,0.05)' : 'rgba(220,38,38,0.05)',
                }}
              >
                <span>Monats-Saldo</span>
                <strong className={summary.balance >= 0 ? styles.moneyPositive : styles.moneyNegative}>
                  {formatMoney(summary.balance)}
                </strong>
              </div>
            )}

            {!incomeTotals.length && !categoryTotals.length && (
              <p className={styles.emptyAnalytics}>
                Noch keine Einträge für {formatMonthLabel(month)}.{' '}
                <button className={styles.actionBtn} type="button" onClick={() => setTab('neu')}>
                  + Eintrag hinzufügen
                </button>
              </p>
            )}
          </div>
        )}

        {/* ── NEU ── */}
        {tab === 'neu' && (
          <div className={styles.budgetPanel} style={{ maxWidth: 520 }}>
            <h2 className={styles.sectionTitle}>Eintrag hinzufügen</h2>
            <form className={styles.budgetForm} onSubmit={addEntry}>
              <div className={styles.segmentedControl}>
                <button
                  type="button"
                  className={entry.type === 'income' ? styles.segmentActive : ''}
                  onClick={() => setEntry(p => ({ ...p, type: 'income' }))}
                >
                  Einnahme
                </button>
                <button
                  type="button"
                  className={entry.type === 'expense' ? styles.segmentActive : ''}
                  onClick={() => setEntry(p => ({ ...p, type: 'expense' }))}
                >
                  Ausgabe
                </button>
              </div>
              <label>
                <span>Titel</span>
                <input
                  value={entry.title}
                  onChange={e => setEntry(p => ({ ...p, title: e.target.value }))}
                  placeholder={entry.type === 'income' ? 'z. B. Gehalt, Familienkasse' : 'z. B. Miete, Arzt, Aldi'}
                  required
                />
              </label>
              <div className={styles.budgetFieldRow}>
                <label>
                  <span>Betrag (€)</span>
                  <input
                    type="number"
                    step="0.01"
                    inputMode="decimal"
                    value={entry.amount}
                    onChange={e => setEntry(p => ({ ...p, amount: e.target.value }))}
                    placeholder="0,00"
                    required
                  />
                </label>
                <label>
                  <span>Datum</span>
                  <input
                    type="date"
                    value={entry.date}
                    onChange={e => setEntry(p => ({ ...p, date: e.target.value }))}
                  />
                </label>
              </div>
              <label>
                <span>Kategorie</span>
                <input
                  list="cat-suggestions"
                  value={entry.category}
                  onChange={e => setEntry(p => ({ ...p, category: e.target.value }))}
                  placeholder="z. B. Zu Hause, Auto, Mobin"
                />
                <datalist id="cat-suggestions">
                  {allCategories.map(cat => <option key={cat} value={cat} />)}
                </datalist>
              </label>
              <button className={styles.primaryBudgetBtn} type="submit">Eintrag speichern</button>
            </form>
          </div>
        )}

      </main>
    </div>
  )
}
