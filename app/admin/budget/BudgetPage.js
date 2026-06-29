'use client'

import { useEffect, useMemo, useState } from 'react'
import styles from '../admin.module.css'

const STORAGE_KEY   = 'radyar_private_budget_v1'
const RECURRING_KEY = 'radyar_recurring_v1'
const CAT_BUDGET_KEY = 'radyar_cat_budget_v1'

function makeId() {
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
  ].map(([type, title, amount, category, date]) => ({ id: makeId(), type, title, amount, category, date })),
}

const MONTH_SHORT = ['Jan','Feb','Mrz','Apr','Mai','Jun','Jul','Aug','Sep','Okt','Nov','Dez']
const MONTH_LONG  = ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember']

function getMonthKey(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
}

function formatMoney(value) {
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 2 }).format(Number(value) || 0)
}

function formatMonthLabel(key) {
  const [y, m] = key.split('-').map(Number)
  return new Date(y, m - 1, 1).toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })
}

function emptyMonth() { return { budget: '', entries: [] } }

function sparquote(income, expenses) {
  if (!income) return null
  return ((income - expenses) / income * 100).toFixed(1)
}

function trafficColor(spent, budget) {
  if (!budget) return null
  const p = spent / budget
  if (p >= 1) return '#dc2626'
  if (p >= 0.75) return '#d97706'
  return '#16a34a'
}

export default function BudgetPage() {
  const [tab, setTab]     = useState('uebersicht')
  const [month, setMonth] = useState(getMonthKey())
  const [year, setYear]   = useState(new Date().getFullYear())
  const [store, setStore] = useState({})
  const [catBudgets, setCatBudgets] = useState({})
  const [recurring, setRecurring]   = useState([])
  const [loaded, setLoaded]         = useState(false)
  const [budgetInput, setBudgetInput] = useState('')
  const [catEdits, setCatEdits]       = useState({})
  const [entry, setEntry] = useState({
    type: 'expense', amount: '', title: '', category: '',
    date: new Date().toISOString().slice(0, 10),
  })
  const [newFix, setNewFix] = useState({
    type: 'expense', title: '', amount: '', category: '', dayOfMonth: '1',
  })

  useEffect(() => {
    try { const r = localStorage.getItem(STORAGE_KEY);    if (r) setStore(JSON.parse(r))      } catch {}
    try { const r = localStorage.getItem(RECURRING_KEY);  if (r) setRecurring(JSON.parse(r))  } catch {}
    try { const r = localStorage.getItem(CAT_BUDGET_KEY); if (r) setCatBudgets(JSON.parse(r)) } catch {}
    setLoaded(true)
  }, [])

  useEffect(() => { if (loaded) localStorage.setItem(STORAGE_KEY,    JSON.stringify(store))      }, [store, loaded])
  useEffect(() => { if (loaded) localStorage.setItem(RECURRING_KEY,  JSON.stringify(recurring))  }, [recurring, loaded])
  useEffect(() => { if (loaded) localStorage.setItem(CAT_BUDGET_KEY, JSON.stringify(catBudgets)) }, [catBudgets, loaded])

  const monthData = store[month] || emptyMonth()

  useEffect(() => { setBudgetInput(monthData.budget || '') }, [month, loaded]) // eslint-disable-line

  const summary = useMemo(() => {
    const income   = monthData.entries.filter(i => i.type === 'income').reduce((s, i) => s + Number(i.amount || 0), 0)
    const expenses = monthData.entries.filter(i => i.type === 'expense').reduce((s, i) => s + Number(i.amount || 0), 0)
    const budget   = Number(monthData.budget || 0)
    return { income, expenses, budget, balance: income - expenses, remaining: budget - expenses }
  }, [monthData])

  const categoryTotals = useMemo(() => {
    const t = {}
    monthData.entries.filter(i => i.type === 'expense').forEach(i => {
      const k = i.category || 'Ohne Kategorie'
      t[k] = (t[k] || 0) + Number(i.amount || 0)
    })
    return Object.entries(t).sort((a, b) => b[1] - a[1])
  }, [monthData.entries])

  const incomeTotals = useMemo(() => {
    const t = {}
    monthData.entries.filter(i => i.type === 'income').forEach(i => {
      const k = i.title || 'Einnahme'
      t[k] = (t[k] || 0) + Number(i.amount || 0)
    })
    return Object.entries(t).sort((a, b) => b[1] - a[1])
  }, [monthData.entries])

  const allCategories = useMemo(() => {
    const s = new Set()
    Object.values(store).forEach(m => m.entries?.forEach(e => { if (e.category) s.add(e.category) }))
    return [...s].sort()
  }, [store])

  const maxCategory = categoryTotals.length ? Math.max(...categoryTotals.map(([, v]) => v)) : 1

  // ── Jahres-Daten ──
  const annualData = useMemo(() => Array.from({ length: 12 }, (_, i) => {
    const key  = `${year}-${String(i + 1).padStart(2, '0')}`
    const data = store[key] || emptyMonth()
    const income   = data.entries.filter(e => e.type === 'income').reduce((s, e)  => s + Number(e.amount || 0), 0)
    const expenses = data.entries.filter(e => e.type === 'expense').reduce((s, e) => s + Number(e.amount || 0), 0)
    return { key, i, income, expenses, balance: income - expenses, hasData: data.entries.length > 0 }
  }), [store, year])

  const maxAnnual = useMemo(() => Math.max(1, ...annualData.map(m => Math.max(m.income, m.expenses))), [annualData])

  const annualSummary = useMemo(() => {
    const months = annualData.filter(m => m.hasData)
    if (!months.length) return null
    const ti = months.reduce((s, m) => s + m.income, 0)
    const te = months.reduce((s, m) => s + m.expenses, 0)
    return { ti, te, balance: ti - te, avgI: ti / months.length, avgE: te / months.length, count: months.length }
  }, [annualData])

  const totalFixkosten = recurring.filter(r => r.type === 'expense').reduce((s, r) => s + Number(r.amount || 0), 0)

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
      const cur = prev[month] || emptyMonth()
      return { ...prev, [month]: updater(cur) }
    })
  }

  function saveBudget(e) {
    e.preventDefault()
    updateMonth(c => ({ ...c, budget: budgetInput }))
  }

  function saveCatBudget(cat, value) {
    setCatBudgets(prev => ({ ...prev, [cat]: Number(value) || 0 }))
  }

  function addEntry(e) {
    e.preventDefault()
    const amount = Number(entry.amount)
    if (!entry.title.trim() || !amount) return
    updateMonth(c => ({
      ...c,
      entries: [
        { id: makeId(), type: entry.type, amount, title: entry.title.trim(), category: entry.category.trim(), date: entry.date || new Date().toISOString().slice(0, 10) },
        ...c.entries,
      ],
    }))
    setEntry(p => ({ ...p, amount: '', title: '', category: '' }))
    setTab('eintraege')
  }

  function deleteEntry(id) {
    updateMonth(c => ({ ...c, entries: c.entries.filter(i => i.id !== id) }))
  }

  function clearMonth() {
    if (!window.confirm(`Alle Einträge für ${formatMonthLabel(month)} löschen?`)) return
    setStore(prev => { const n = { ...prev }; delete n[month]; return n })
  }

  function addFixeintrag(e) {
    e.preventDefault()
    const amount = Number(newFix.amount)
    if (!newFix.title.trim() || !amount) return
    setRecurring(prev => [...prev, { id: makeId(), ...newFix, amount }])
    setNewFix(p => ({ ...p, title: '', amount: '', category: '' }))
  }

  function removeFixeintrag(id) {
    setRecurring(prev => prev.filter(r => r.id !== id))
  }

  function insertFixInMonth() {
    const [y, m] = month.split('-').map(Number)
    const existing = new Set(monthData.entries.map(e => `${e.title}||${e.amount}`))
    const toAdd    = recurring.filter(r => !existing.has(`${r.title}||${r.amount}`))
    if (!toAdd.length) { window.alert('Alle Fixkosten für diesen Monat bereits eingetragen.'); return }
    updateMonth(c => ({
      ...c,
      entries: [
        ...toAdd.map(r => ({
          id: makeId(), type: r.type, amount: Number(r.amount), title: r.title, category: r.category,
          date: `${y}-${String(m).padStart(2, '0')}-${String(Math.min(Number(r.dayOfMonth), 28)).padStart(2, '0')}`,
        })),
        ...c.entries,
      ],
    }))
    setTab('eintraege')
  }

  function goToMonth(key) {
    setMonth(key)
    setTab('uebersicht')
  }

  const TABS = [
    { id: 'uebersicht', label: 'Übersicht' },
    { id: 'eintraege',  label: `Einträge (${monthData.entries.length})` },
    { id: 'jahr',       label: 'Jahr' },
    { id: 'fixkosten',  label: 'Fixkosten' },
    { id: 'bericht',    label: 'Bericht' },
    { id: 'neu',        label: '+ Eintrag' },
  ]

  return (
    <div className={styles.page}>
      <main className={styles.content}>

        {/* Header + Monatsnavigation */}
        <div className={styles.financeHeader}>
          <h1 className={styles.title}>Private Finanzen</h1>
          <div className={styles.monthNav}>
            <button className={styles.monthNavBtn} onClick={prevMonth} aria-label="Vorheriger Monat">‹</button>
            <input type="month" className={styles.monthDisplay} value={month} onChange={e => setMonth(e.target.value || getMonthKey())} />
            <button className={styles.monthNavBtn} onClick={nextMonth} aria-label="Nächster Monat">›</button>
          </div>
        </div>

        {/* 4 Metriken */}
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
            <strong className={summary.balance >= 0 ? styles.moneyPositive : styles.moneyNegative}>{formatMoney(summary.balance)}</strong>
          </div>
          <div className={styles.financeMetric}>
            <span>Sparquote</span>
            <strong className={summary.balance >= 0 ? styles.moneyPositive : styles.moneyNegative}>
              {summary.income ? `${sparquote(summary.income, summary.expenses)} %` : '—'}
            </strong>
          </div>
        </div>

        {/* Tabs */}
        <div className={styles.financeTabs} role="tablist">
          {TABS.map(t => (
            <button key={t.id} role="tab" aria-selected={tab === t.id}
              className={tab === t.id ? styles.financeTabActive : styles.financeTab}
              onClick={() => setTab(t.id)}>
              {t.label}
            </button>
          ))}
        </div>

        {/* ── ÜBERSICHT ── */}
        {tab === 'uebersicht' && (
          <div>
            <form className={styles.budgetSettingRow} onSubmit={saveBudget}>
              <label htmlFor="budget-input">Monatsbudget (€)</label>
              <input id="budget-input" type="number" min="0" step="0.01" inputMode="decimal"
                value={budgetInput} onChange={e => setBudgetInput(e.target.value)} placeholder="z. B. 7000" />
              <button type="submit">Speichern</button>
            </form>

            {categoryTotals.length ? (
              <div className={styles.categoryList}>
                {categoryTotals.map(([cat, total]) => {
                  const budget = catBudgets[cat] || 0
                  const color  = trafficColor(total, budget)
                  return (
                    <div className={styles.catBudgetRow} key={cat}>
                      <span className={styles.categoryName}>{cat}</span>
                      <div className={styles.categoryBarTrack}>
                        <div className={styles.categoryBarFill} style={{ width: `${Math.max((total / maxCategory) * 100, 2)}%` }} />
                      </div>
                      <span className={styles.categoryAmount}>{formatMoney(total)}</span>
                      <span className={styles.trafficDot} style={{ background: color || 'transparent', border: color ? 'none' : '1px dashed #cbd5e1' }} title={budget ? `Budget: ${formatMoney(budget)}` : 'Kein Budget gesetzt'} />
                      <input
                        className={styles.catBudgetInput}
                        type="number" min="0" step="1"
                        placeholder="Budget €"
                        value={catEdits[cat] !== undefined ? catEdits[cat] : (catBudgets[cat] || '')}
                        onChange={e => setCatEdits(p => ({ ...p, [cat]: e.target.value }))}
                        onBlur={e => {
                          saveCatBudget(cat, e.target.value)
                          setCatEdits(p => { const n = { ...p }; delete n[cat]; return n })
                        }}
                      />
                    </div>
                  )
                })}
              </div>
            ) : (
              <p className={styles.emptyAnalytics}>
                Noch keine Ausgaben für {formatMonthLabel(month)}.{' '}
                <button className={styles.actionBtn} type="button" onClick={() => setTab('neu')}>+ Eintrag hinzufügen</button>
              </p>
            )}
          </div>
        )}

        {/* ── EINTRÄGE ── */}
        {tab === 'eintraege' && (
          <div>
            <div className={styles.tableHead}>
              <h2 className={styles.sectionTitle} style={{ margin: 0 }}>Einträge — {formatMonthLabel(month)}</h2>
              <button className={`${styles.actionBtn} ${styles.actionBtnDanger}`} type="button" onClick={clearMonth}>Monat löschen</button>
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
                      <span>{new Date(item.date).toLocaleDateString('de-DE')}{item.category ? ` · ${item.category}` : ''}</span>
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
                <button className={styles.actionBtn} type="button" onClick={() => setTab('neu')}>+ Eintrag hinzufügen</button>
              </p>
            )}
          </div>
        )}

        {/* ── JAHR ── */}
        {tab === 'jahr' && (
          <div>
            <div className={styles.reportHeader}>
              <h2 className={styles.sectionTitle} style={{ margin: 0 }}>Jahresübersicht</h2>
              <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                <button className={styles.monthNavBtn} onClick={() => setYear(y => y - 1)}>‹</button>
                <span className={styles.monthDisplay}>{year}</span>
                <button className={styles.monthNavBtn} onClick={() => setYear(y => y + 1)}>›</button>
              </div>
            </div>

            <div className={styles.budgetPanel} style={{ marginBottom: 20 }}>
              <div className={styles.annualChart}>
                {annualData.map(m => (
                  <div key={m.key} onClick={() => goToMonth(m.key)}
                    className={`${styles.annualCol} ${m.key === month ? styles.annualColActive : ''}`}
                    title={m.hasData ? `${MONTH_LONG[m.i]}: ${formatMoney(m.income)} / ${formatMoney(m.expenses)}` : MONTH_LONG[m.i]}>
                    <div className={styles.annualBars}>
                      <div className={styles.annualBarIn} style={{ height: `${m.hasData ? Math.max((m.income / maxAnnual) * 100, 4) : 3}%`, opacity: m.hasData ? 1 : 0.12 }} />
                      <div className={styles.annualBarEx} style={{ height: `${m.hasData ? Math.max((m.expenses / maxAnnual) * 100, 4) : 3}%`, opacity: m.hasData ? 1 : 0.12 }} />
                    </div>
                    <span className={styles.annualColLabel}>{MONTH_SHORT[m.i]}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 14, marginTop: 8 }}>
                <span className={styles.annualLegend}><span style={{ background: '#16a34a' }} />Einnahmen</span>
                <span className={styles.annualLegend}><span style={{ background: '#f97316' }} />Ausgaben</span>
              </div>
            </div>

            <div className={styles.budgetPanel}>
              {annualSummary ? (
                <table className={styles.annualTable}>
                  <thead>
                    <tr>
                      <th>Monat</th>
                      <th>Einnahmen</th>
                      <th>Ausgaben</th>
                      <th>Saldo</th>
                      <th>Sparquote</th>
                    </tr>
                  </thead>
                  <tbody>
                    {annualData.map(m => (
                      <tr key={m.key} onClick={() => goToMonth(m.key)} style={{ cursor: 'pointer' }}
                        className={m.key === month ? styles.annualRowActive : !m.hasData ? styles.annualRowEmpty : ''}>
                        <td>{MONTH_LONG[m.i]}{m.key === month ? ' ●' : ''}</td>
                        <td className={styles.moneyPositive}>{m.hasData ? formatMoney(m.income) : '—'}</td>
                        <td>{m.hasData ? formatMoney(m.expenses) : '—'}</td>
                        <td className={m.balance >= 0 ? styles.moneyPositive : styles.moneyNegative}>{m.hasData ? formatMoney(m.balance) : '—'}</td>
                        <td className={m.balance >= 0 ? styles.moneyPositive : styles.moneyNegative}>{m.hasData && m.income ? `${sparquote(m.income, m.expenses)} %` : '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td>Jahresgesamt ({annualSummary.count} Monate)</td>
                      <td className={styles.moneyPositive}>{formatMoney(annualSummary.ti)}</td>
                      <td>{formatMoney(annualSummary.te)}</td>
                      <td className={annualSummary.balance >= 0 ? styles.moneyPositive : styles.moneyNegative}>{formatMoney(annualSummary.balance)}</td>
                      <td className={annualSummary.balance >= 0 ? styles.moneyPositive : styles.moneyNegative}>{sparquote(annualSummary.ti, annualSummary.te)} %</td>
                    </tr>
                    <tr className={styles.annualRowAvg}>
                      <td>Ø pro Monat</td>
                      <td className={styles.moneyPositive}>{formatMoney(annualSummary.avgI)}</td>
                      <td>{formatMoney(annualSummary.avgE)}</td>
                      <td className={annualSummary.balance >= 0 ? styles.moneyPositive : styles.moneyNegative}>{formatMoney(annualSummary.balance / annualSummary.count)}</td>
                      <td>—</td>
                    </tr>
                  </tfoot>
                </table>
              ) : (
                <p className={styles.emptyAnalytics}>Noch keine Daten für {year}. Trage Einträge in einen Monat ein.</p>
              )}
            </div>
          </div>
        )}

        {/* ── FIXKOSTEN ── */}
        {tab === 'fixkosten' && (
          <div>
            <div className={styles.reportHeader}>
              <div>
                <h2 className={styles.sectionTitle} style={{ margin: 0 }}>Wiederkehrende Ausgaben</h2>
                {totalFixkosten > 0 && (
                  <p style={{ color: '#64748b', fontSize: 13, marginTop: 4 }}>
                    Fixkosten gesamt: <strong style={{ color: '#0d1b2a' }}>{formatMoney(totalFixkosten)} / Monat</strong>
                  </p>
                )}
              </div>
              {recurring.length > 0 && (
                <button className={styles.primaryBudgetBtn} type="button" onClick={insertFixInMonth}>
                  Für {formatMonthLabel(month)} eintragen
                </button>
              )}
            </div>

            {recurring.length > 0 && (
              <div className={styles.fixedList} style={{ marginBottom: 28 }}>
                {recurring.map(r => (
                  <div className={styles.fixedItem} key={r.id}>
                    <div className={styles.fixedItemMain}>
                      <strong>{r.title}</strong>
                      <span>{r.category || 'Keine Kategorie'} · Tag {r.dayOfMonth} · {r.type === 'income' ? 'Einnahme' : 'Ausgabe'}</span>
                    </div>
                    <strong className={r.type === 'income' ? styles.moneyPositive : ''}>{formatMoney(r.amount)}</strong>
                    <button className={styles.actionBtn} type="button" onClick={() => removeFixeintrag(r.id)}>×</button>
                  </div>
                ))}
              </div>
            )}

            <div className={styles.budgetPanel} style={{ maxWidth: 520 }}>
              <h2 className={styles.sectionTitle}>Fixkosten hinzufügen</h2>
              <form className={styles.budgetForm} onSubmit={addFixeintrag}>
                <div className={styles.segmentedControl}>
                  <button type="button" className={newFix.type === 'income' ? styles.segmentActive : ''} onClick={() => setNewFix(p => ({ ...p, type: 'income' }))}>Einnahme</button>
                  <button type="button" className={newFix.type === 'expense' ? styles.segmentActive : ''} onClick={() => setNewFix(p => ({ ...p, type: 'expense' }))}>Ausgabe</button>
                </div>
                <label>
                  <span>Titel</span>
                  <input value={newFix.title} onChange={e => setNewFix(p => ({ ...p, title: e.target.value }))} placeholder="z. B. Miete, Leasing, Kindergarten" required />
                </label>
                <div className={styles.budgetFieldRow}>
                  <label>
                    <span>Betrag (€)</span>
                    <input type="number" step="0.01" inputMode="decimal" value={newFix.amount} onChange={e => setNewFix(p => ({ ...p, amount: e.target.value }))} placeholder="0,00" required />
                  </label>
                  <label>
                    <span>Tag des Monats</span>
                    <input type="number" min="1" max="28" value={newFix.dayOfMonth} onChange={e => setNewFix(p => ({ ...p, dayOfMonth: e.target.value }))} />
                  </label>
                </div>
                <label>
                  <span>Kategorie</span>
                  <input list="fix-cat-list" value={newFix.category} onChange={e => setNewFix(p => ({ ...p, category: e.target.value }))} placeholder="z. B. Zu Hause, Auto" />
                  <datalist id="fix-cat-list">
                    {allCategories.map(c => <option key={c} value={c} />)}
                  </datalist>
                </label>
                <button className={styles.primaryBudgetBtn} type="submit">Fixkosten speichern</button>
              </form>
            </div>
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
              <button className={styles.printBtn} type="button" onClick={() => window.print()}>🖨 Drucken</button>
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
              <div className={styles.reportSaldoRow} style={{
                border: `1px solid ${summary.balance >= 0 ? '#16a34a' : '#dc2626'}`,
                background: summary.balance >= 0 ? 'rgba(22,163,74,0.05)' : 'rgba(220,38,38,0.05)',
              }}>
                <span>Monats-Saldo</span>
                <strong className={summary.balance >= 0 ? styles.moneyPositive : styles.moneyNegative}>{formatMoney(summary.balance)}</strong>
              </div>
            )}

            {!incomeTotals.length && !categoryTotals.length && (
              <p className={styles.emptyAnalytics}>Noch keine Einträge für {formatMonthLabel(month)}.</p>
            )}
          </div>
        )}

        {/* ── NEU ── */}
        {tab === 'neu' && (
          <div className={styles.budgetPanel} style={{ maxWidth: 520 }}>
            <h2 className={styles.sectionTitle}>Eintrag hinzufügen</h2>
            <form className={styles.budgetForm} onSubmit={addEntry}>
              <div className={styles.segmentedControl}>
                <button type="button" className={entry.type === 'income' ? styles.segmentActive : ''} onClick={() => setEntry(p => ({ ...p, type: 'income' }))}>Einnahme</button>
                <button type="button" className={entry.type === 'expense' ? styles.segmentActive : ''} onClick={() => setEntry(p => ({ ...p, type: 'expense' }))}>Ausgabe</button>
              </div>
              <label>
                <span>Titel</span>
                <input value={entry.title} onChange={e => setEntry(p => ({ ...p, title: e.target.value }))}
                  placeholder={entry.type === 'income' ? 'z. B. Gehalt, Familienkasse' : 'z. B. Miete, Arzt, Aldi'} required />
              </label>
              <div className={styles.budgetFieldRow}>
                <label>
                  <span>Betrag (€)</span>
                  <input type="number" step="0.01" inputMode="decimal" value={entry.amount}
                    onChange={e => setEntry(p => ({ ...p, amount: e.target.value }))} placeholder="0,00" required />
                </label>
                <label>
                  <span>Datum</span>
                  <input type="date" value={entry.date} onChange={e => setEntry(p => ({ ...p, date: e.target.value }))} />
                </label>
              </div>
              <label>
                <span>Kategorie</span>
                <input list="cat-suggestions" value={entry.category}
                  onChange={e => setEntry(p => ({ ...p, category: e.target.value }))}
                  placeholder="z. B. Zu Hause, Auto, Mobin" />
                <datalist id="cat-suggestions">
                  {allCategories.map(c => <option key={c} value={c} />)}
                </datalist>
              </label>
              <button className={styles.primaryBudgetBtn} type="submit">Eintrag speichern</button>
            </form>
          </div>
        )}

        <div style={{ marginTop: 32 }}>
          <button className={styles.actionBtn} type="button"
            onClick={() => { if (window.confirm('April 2026 Beispiel laden?')) { setMonth('2026-04'); setStore(p => ({ ...p, '2026-04': APRIL_2026_EXAMPLE })) } }}>
            April-Beispiel laden
          </button>
        </div>

      </main>
    </div>
  )
}
