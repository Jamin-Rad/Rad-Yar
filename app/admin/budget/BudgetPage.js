'use client'

import { useEffect, useMemo, useState } from 'react'
import styles from '../admin.module.css'

const STORAGE_KEY    = 'radyar_private_budget_v1'
const RECURRING_KEY  = 'radyar_recurring_v1'
const CAT_BUDGET_KEY = 'radyar_cat_budget_v1'
const CATEGORIES_KEY = 'radyar_categories_v1'

function makeId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

const APRIL_2026_EXAMPLE = {
  budget: '',
  entries: [
    ['income',  'Einnahmen',           6601.50, 'Einnahmen',    '',                    '2026-04-01', []],
    ['income',  'Familienkasse',        518,     'Einnahmen',    '',                    '2026-04-01', []],
    ['expense', 'Aldi',                 161,     'Lebensmittel', 'Wocheneinkauf',       '2026-04-02', ['Lebensmittel']],
    ['expense', 'Lidl',                 535,     'Lebensmittel', 'Wocheneinkauf',       '2026-04-03', ['Lebensmittel']],
    ['expense', 'Bonus',                60,      'Lebensmittel', '',                    '2026-04-04', ['Lebensmittel']],
    ['expense', 'Edeka/Rewe/Netto',     53,      'Lebensmittel', '',                    '2026-04-05', ['Lebensmittel']],
    ['expense', 'DM',                   20,      'Lebensmittel', 'Drogerie',            '2026-04-06', ['Lebensmittel']],
    ['expense', 'Türkei',               182,     'Lebensmittel', 'Türkischer Markt',   '2026-04-07', ['Lebensmittel']],
    ['expense', 'Supermarkt',           5,       'Kleidung',     'Für Mobin',           '2026-04-08', ['Kleidung', 'Mobin']],
    ['expense', 'Eis/Coffee/Bäckerei', 19,      'Restaurant',   '',                    '2026-04-09', ['Restaurant']],
    ['expense', 'Essen',                193,     'Restaurant',   'Auswärts',            '2026-04-10', ['Restaurant']],
    ['expense', 'Tanken',               39,      'Auto',         '',                    '2026-04-11', ['Auto']],
    ['expense', 'Strom Auto',           13,      'Auto',         'Laden',               '2026-04-12', ['Auto']],
    ['expense', 'Reparatur/Service',    1392,    'Auto',         'Werkstatt',           '2026-04-13', ['Auto']],
    ['expense', 'Leasing',              348,     'Auto',         'Monatlich',           '2026-04-14', ['Auto']],
    ['expense', 'Bus-Ticket',           92,      'Auto',         'Öffentlich',          '2026-04-15', ['Auto']],
    ['expense', 'Miete',                2025,    'Zu Hause',     'Monatlich',           '2026-04-01', ['Zu Hause']],
    ['expense', 'Darlehen',             475,     'Zu Hause',     '',                    '2026-04-02', ['Zu Hause']],
    ['expense', 'Strom',                91,      'Zu Hause',     '',                    '2026-04-03', ['Zu Hause']],
    ['expense', 'Haushaltgerät',        95,      'Zu Hause',     '',                    '2026-04-04', ['Zu Hause']],
    ['expense', 'Konto',                11,      'Jamin',        'Bankgebühr',          '2026-04-16', ['Jamin']],
    ['expense', 'Gothaer',              22,      'Jamin',        'Versicherung',        '2026-04-17', ['Jamin']],
    ['expense', 'Medikamente',          10,      'Jamin',        '',                    '2026-04-18', ['Jamin']],
    ['expense', 'iPhone 16',            53,      'Fatima',       'Rate',                '2026-04-19', ['Fatima']],
    ['expense', 'Kleidung',             5,       'Fatima',       'Für Fatima',          '2026-04-20', ['Kleidung', 'Fatima']],
    ['expense', 'Medikamente',          296,     'Fatima',       '',                    '2026-04-21', ['Fatima']],
    ['expense', 'Schule',               1029,    'Mobin',        'Schulgeld',           '2026-04-22', ['Mobin']],
    ['expense', 'Taschengeld',          18,      'Mobin',        '',                    '2026-04-23', ['Mobin']],
    ['expense', 'Bus-Ticket',           45,      'Mobin',        'Schulweg',            '2026-04-24', ['Mobin', 'Auto']],
    ['expense', 'SIM-Karte',            9,       'Mobin',        '',                    '2026-04-25', ['Mobin']],
    ['expense', 'Kindergarten',         370,     'Mobina',       'Monatsbeitrag',       '2026-04-26', ['Mobina']],
    ['expense', 'Kleidung',             10,      'Mobina',       'Für Mobina',          '2026-04-27', ['Kleidung', 'Mobina']],
    ['expense', 'Apotheke',             46,      'Meine Eltern', 'Versicherung',        '2026-04-28', ['Meine Eltern']],
    ['expense', 'Sonst',                3,       'Meine Eltern', '',                    '2026-04-28', ['Meine Eltern']],
    ['expense', 'Nazri Iran',           77,      'Moschee',      '',                    '2026-04-29', ['Moschee']],
  ].map(([type, title, amount, category, subtitle, date, tags]) => ({
    id: makeId(), type, title, amount, category, subtitle, date, tags,
  })),
}

const APRIL_CATEGORIES = [
  'Einnahmen','Lebensmittel','Restaurant','Auto','Zu Hause',
  'Kleidung','Jamin','Fatima','Mobin','Mobina','Meine Eltern','Moschee',
].map(name => ({ id: makeId(), name }))

const MONTH_SHORT = ['Jan','Feb','Mrz','Apr','Mai','Jun','Jul','Aug','Sep','Okt','Nov','Dez']
const MONTH_LONG  = ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember']

const CAT_COLORS = [
  { bg: '#fef3c7', border: '#f59e0b', text: '#92400e' },
  { bg: '#dbeafe', border: '#3b82f6', text: '#1e3a8a' },
  { bg: '#dcfce7', border: '#22c55e', text: '#14532d' },
  { bg: '#fce7f3', border: '#ec4899', text: '#831843' },
  { bg: '#ede9fe', border: '#8b5cf6', text: '#4c1d95' },
  { bg: '#ffedd5', border: '#f97316', text: '#7c2d12' },
  { bg: '#e0f2fe', border: '#0ea5e9', text: '#0c4a6e' },
  { bg: '#f0fdf4', border: '#16a34a', text: '#14532d' },
  { bg: '#fdf4ff', border: '#d946ef', text: '#701a75' },
  { bg: '#fff1f2', border: '#f43f5e', text: '#881337' },
]

function getCatColor(name) {
  let h = 0
  for (const c of name) h = ((h << 5) - h) + c.charCodeAt(0)
  return CAT_COLORS[Math.abs(h) % CAT_COLORS.length]
}

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

function IconCalendar() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
}
function IconChart() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
}
function IconSettings() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
}

export default function BudgetPage() {
  const [view, setView]       = useState('monat')
  const [subView, setSubView] = useState('kategorien')
  const [month, setMonth]     = useState(getMonthKey())
  const [year, setYear]       = useState(new Date().getFullYear())
  const [store, setStore]     = useState({})
  const [catBudgets, setCatBudgets] = useState({})
  const [recurring, setRecurring]   = useState([])
  const [categories, setCategories] = useState([])
  const [loaded, setLoaded]         = useState(false)
  const [budgetInput, setBudgetInput] = useState('')
  const [catEdits, setCatEdits]       = useState({})
  const [newCatName, setNewCatName]   = useState('')
  const [selectedCats, setSelectedCats] = useState([])

  const [entry, setEntry] = useState({
    type: 'expense', title: '', subtitle: '', amount: '', date: new Date().toISOString().slice(0, 10),
  })
  const [newFix, setNewFix] = useState({
    type: 'expense', title: '', subtitle: '', amount: '', category: '', dayOfMonth: '1',
  })

  // ── Persistence ────────────────────────────────────────────────────────────
  useEffect(() => {
    try { const r = localStorage.getItem(STORAGE_KEY);    if (r) setStore(JSON.parse(r))      } catch {}
    try { const r = localStorage.getItem(RECURRING_KEY);  if (r) setRecurring(JSON.parse(r))  } catch {}
    try { const r = localStorage.getItem(CAT_BUDGET_KEY); if (r) setCatBudgets(JSON.parse(r)) } catch {}
    try { const r = localStorage.getItem(CATEGORIES_KEY); if (r) setCategories(JSON.parse(r)) } catch {}
    setLoaded(true)
  }, [])

  useEffect(() => { if (loaded) localStorage.setItem(STORAGE_KEY,    JSON.stringify(store))      }, [store, loaded])
  useEffect(() => { if (loaded) localStorage.setItem(RECURRING_KEY,  JSON.stringify(recurring))  }, [recurring, loaded])
  useEffect(() => { if (loaded) localStorage.setItem(CAT_BUDGET_KEY, JSON.stringify(catBudgets)) }, [catBudgets, loaded])
  useEffect(() => { if (loaded) localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories)) }, [categories, loaded])

  const monthData = store[month] || emptyMonth()
  useEffect(() => { setBudgetInput(monthData.budget || '') }, [month, loaded]) // eslint-disable-line

  // ── Derived ────────────────────────────────────────────────────────────────
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

  const maxCategory = categoryTotals.length ? Math.max(...categoryTotals.map(([, v]) => v)) : 1

  // Annual data
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

  // ── Actions ────────────────────────────────────────────────────────────────
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

  function addCategory(e) {
    e.preventDefault()
    const name = newCatName.trim()
    if (!name || categories.some(c => c.name === name)) return
    setCategories(prev => [...prev, { id: makeId(), name }])
    setNewCatName('')
  }

  function removeCategory(id) {
    if (!window.confirm('Kategorie löschen?')) return
    setCategories(prev => prev.filter(c => c.id !== id))
  }

  function toggleCat(name) {
    setSelectedCats(prev => prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name])
  }

  function addEntry(e) {
    e.preventDefault()
    const amount = Number(entry.amount)
    if (!entry.title.trim() || !amount) return
    const primaryCat = selectedCats[0] || ''
    updateMonth(c => ({
      ...c,
      entries: [
        {
          id: makeId(),
          type: entry.type,
          amount,
          title: entry.title.trim(),
          subtitle: entry.subtitle.trim(),
          category: primaryCat,
          tags: selectedCats.length ? [...selectedCats] : [primaryCat].filter(Boolean),
          date: entry.date || new Date().toISOString().slice(0, 10),
        },
        ...c.entries,
      ],
    }))
    setEntry(p => ({ ...p, amount: '', title: '', subtitle: '' }))
    setSelectedCats([])
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
    setNewFix(p => ({ ...p, title: '', subtitle: '', amount: '', category: '' }))
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
          id: makeId(), type: r.type, amount: Number(r.amount), title: r.title,
          subtitle: r.subtitle || '', category: r.category,
          tags: [r.category].filter(Boolean),
          date: `${y}-${String(m).padStart(2, '0')}-${String(Math.min(Number(r.dayOfMonth), 28)).padStart(2, '0')}`,
        })),
        ...c.entries,
      ],
    }))
    setView('monat')
  }

  function goToMonth(key) {
    setMonth(key)
    setView('monat')
  }

  function navEinstellung(sub) {
    setView('einstellung')
    setSubView(sub)
  }

  function loadAprilExample() {
    if (!window.confirm('April 2026 Beispieldaten + Kategorien laden?')) return
    setMonth('2026-04')
    setStore(p => ({ ...p, '2026-04': APRIL_2026_EXAMPLE }))
    setCategories(prev => {
      const existing = new Set(prev.map(c => c.name))
      const toAdd = APRIL_CATEGORIES.filter(c => !existing.has(c.name))
      return [...prev, ...toAdd]
    })
  }

  const catSpending = useMemo(() => {
    const map = {}
    categoryTotals.forEach(([name, total]) => { map[name] = total })
    return map
  }, [categoryTotals])

  // Sidebar helper
  function SidebarItem({ id, icon, label, active, onClick }) {
    return (
      <button className={active ? styles.sidebarItemActive : styles.sidebarItem} onClick={onClick} aria-current={active ? 'page' : undefined}>
        {icon}{label}
      </button>
    )
  }

  return (
    <div className={styles.page}>
      <main className={styles.content}>

        {/* Header */}
        <div className={styles.financeHeader}>
          <div>
            <h1 className={styles.title}>Private Finanzen</h1>
            <p className={styles.sub} style={{ margin: 0 }}>{formatMonthLabel(month)}</p>
          </div>
          <div className={styles.monthNav}>
            <button className={styles.monthNavBtn} onClick={prevMonth}>‹</button>
            <input type="month" className={styles.monthDisplay} value={month} onChange={e => setMonth(e.target.value || getMonthKey())} />
            <button className={styles.monthNavBtn} onClick={nextMonth}>›</button>
          </div>
        </div>

        {/* Metriken */}
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

        {/* Layout */}
        <div className={styles.financeLayout}>

          {/* Sidebar */}
          <aside className={styles.financeSidebar}>
            <nav className={styles.sidebarNav}>
              <SidebarItem icon={<IconCalendar />} label="Monatsübersicht" active={view === 'monat'} onClick={() => setView('monat')} />
              <SidebarItem icon={<IconChart />} label="Jahresübersicht" active={view === 'jahr'} onClick={() => setView('jahr')} />
              <SidebarItem icon={<IconSettings />} label="Einstellung" active={view === 'einstellung'} onClick={() => navEinstellung(subView)} />

              {view === 'einstellung' && (
                <div className={styles.sidebarSubGroup}>
                  <button className={subView === 'kategorien' ? styles.sidebarSubActive : styles.sidebarSub} onClick={() => setSubView('kategorien')}>Kategorien</button>
                  <button className={subView === 'eintraege'  ? styles.sidebarSubActive : styles.sidebarSub} onClick={() => setSubView('eintraege')}>Einträge</button>
                  <button className={subView === 'fixkosten'  ? styles.sidebarSubActive : styles.sidebarSub} onClick={() => setSubView('fixkosten')}>Fixkosten</button>
                  <button className={subView === 'bericht'    ? styles.sidebarSubActive : styles.sidebarSub} onClick={() => setSubView('bericht')}>Bericht</button>
                </div>
              )}
            </nav>
          </aside>

          {/* Content */}
          <div className={styles.financeMain}>

            {/* ── MONATSÜBERSICHT ── */}
            {view === 'monat' && (
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
                          <span className={styles.trafficDot}
                            style={{ background: color || 'transparent', border: color ? 'none' : '1px dashed #cbd5e1' }}
                            title={budget ? `Budget: ${formatMoney(budget)}` : 'Kein Budget gesetzt'} />
                          <input className={styles.catBudgetInput} type="number" min="0" step="1" placeholder="Budget €"
                            value={catEdits[cat] !== undefined ? catEdits[cat] : (catBudgets[cat] || '')}
                            onChange={e => setCatEdits(p => ({ ...p, [cat]: e.target.value }))}
                            onBlur={e => {
                              saveCatBudget(cat, e.target.value)
                              setCatEdits(p => { const n = { ...p }; delete n[cat]; return n })
                            }} />
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <p className={styles.emptyAnalytics}>
                    Noch keine Ausgaben für {formatMonthLabel(month)}.{' '}
                    <button className={styles.actionBtn} type="button" onClick={() => navEinstellung('eintraege')}>+ Eintrag hinzufügen</button>
                  </p>
                )}
              </div>
            )}

            {/* ── JAHRESÜBERSICHT ── */}
            {view === 'jahr' && (
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
                        <tr><th>Monat</th><th>Einnahmen</th><th>Ausgaben</th><th>Saldo</th><th>Sparquote</th></tr>
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
                    <p className={styles.emptyAnalytics}>Noch keine Daten für {year}.</p>
                  )}
                </div>
              </div>
            )}

            {/* ── EINSTELLUNG: KATEGORIEN ── */}
            {view === 'einstellung' && subView === 'kategorien' && (
              <div>
                <div className={styles.reportHeader}>
                  <div>
                    <h2 className={styles.sectionTitle} style={{ margin: 0 }}>Kategorien</h2>
                    <p style={{ color: '#64748b', fontSize: 13, marginTop: 4 }}>
                      Verwalte deine Kategorien — beim Eintrag kannst du eine oder mehrere auswählen.
                    </p>
                  </div>
                </div>

                <div className={styles.categoryTileGrid}>
                  {categories.map(cat => {
                    const color    = getCatColor(cat.name)
                    const spending = catSpending[cat.name] || 0
                    return (
                      <div key={cat.id} className={styles.categoryManagedTile}
                        style={{ background: color.bg, border: `1px solid ${color.border}` }}>
                        <div className={styles.categoryTileName} style={{ color: color.text }}>{cat.name}</div>
                        {spending > 0 && (
                          <div className={styles.categoryTileAmount} style={{ color: color.text }}>{formatMoney(spending)}</div>
                        )}
                        <button className={styles.categoryTileDelete} style={{ color: color.text }}
                          onClick={() => removeCategory(cat.id)} aria-label={`${cat.name} löschen`}>×</button>
                      </div>
                    )
                  })}

                  {/* Add tile */}
                  <form className={styles.categoryAddTile} onSubmit={addCategory}>
                    <input
                      className={styles.categoryAddInput}
                      value={newCatName}
                      onChange={e => setNewCatName(e.target.value)}
                      placeholder="Neue Kategorie…"
                    />
                    <button type="submit" className={styles.categoryAddBtn} disabled={!newCatName.trim()}>+</button>
                  </form>
                </div>

                <div style={{ marginTop: 32 }}>
                  <button className={styles.actionBtn} type="button" onClick={loadAprilExample}>
                    April-Beispiel + Kategorien laden
                  </button>
                </div>
              </div>
            )}

            {/* ── EINSTELLUNG: EINTRÄGE ── */}
            {view === 'einstellung' && subView === 'eintraege' && (
              <div>
                {/* Add form */}
                <div className={styles.budgetPanel} style={{ marginBottom: 24 }}>
                  <h2 className={styles.sectionTitle}>Neuer Eintrag — {formatMonthLabel(month)}</h2>
                  <form className={styles.budgetForm} onSubmit={addEntry}>
                    <div className={styles.segmentedControl}>
                      <button type="button" className={entry.type === 'income' ? styles.segmentActive : ''} onClick={() => setEntry(p => ({ ...p, type: 'income' }))}>Einnahme</button>
                      <button type="button" className={entry.type === 'expense' ? styles.segmentActive : ''} onClick={() => setEntry(p => ({ ...p, type: 'expense' }))}>Ausgabe</button>
                    </div>
                    <div className={styles.budgetFieldRow}>
                      <label>
                        <span>Titel</span>
                        <input value={entry.title} onChange={e => setEntry(p => ({ ...p, title: e.target.value }))}
                          placeholder={entry.type === 'income' ? 'z. B. Gehalt' : 'z. B. Miete, Lidl'} required />
                      </label>
                      <label>
                        <span>Untertitel</span>
                        <input value={entry.subtitle} onChange={e => setEntry(p => ({ ...p, subtitle: e.target.value }))}
                          placeholder="z. B. Amazon · Für Mobin" />
                      </label>
                    </div>
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

                    {categories.length > 0 && (
                      <div>
                        <span className={styles.budgetForm + ' label'} style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#64748b', marginBottom: 8 }}>
                          Kategorien auswählen {selectedCats.length > 0 && `(${selectedCats.join(', ')})`}
                        </span>
                        <div className={styles.catSelector}>
                          {categories.map(cat => (
                            <button key={cat.id} type="button"
                              className={selectedCats.includes(cat.name) ? styles.catTileSelected : styles.catTile}
                              onClick={() => toggleCat(cat.name)}>
                              {cat.name}
                              {selectedCats.includes(cat.name) && <span className={styles.catTileCheck}>✓</span>}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <button className={styles.primaryBudgetBtn} type="submit">Eintrag speichern</button>
                  </form>
                </div>

                {/* Entry list */}
                <div>
                  <div className={styles.tableHead}>
                    <h2 className={styles.sectionTitle} style={{ margin: 0 }}>
                      Alle Einträge — {formatMonthLabel(month)} ({monthData.entries.length})
                    </h2>
                    <button className={`${styles.actionBtn} ${styles.actionBtnDanger}`} type="button" onClick={clearMonth}>Monat löschen</button>
                  </div>

                  {monthData.entries.length ? (
                    <div className={styles.budgetEntryList} style={{ marginTop: 16 }}>
                      {monthData.entries.map(item => (
                        <div className={styles.budgetEntry} key={item.id}>
                          <span className={`${styles.budgetEntryType} ${item.type === 'income' ? styles.entryIncome : styles.entryExpense}`}>
                            {item.type === 'income' ? '+' : '−'}
                          </span>
                          <div className={styles.budgetEntryMain}>
                            <strong>{item.title}</strong>
                            <span>
                              {item.subtitle ? `${item.subtitle} · ` : ''}
                              {new Date(item.date).toLocaleDateString('de-DE')}
                              {item.category ? ` · ${item.category}` : ''}
                            </span>
                            {Array.isArray(item.tags) && item.tags.length > 1 && (
                              <span className={styles.entryTags}>
                                {item.tags.map(t => <span key={t} className={styles.entryTag}>{t}</span>)}
                              </span>
                            )}
                          </div>
                          <strong className={item.type === 'income' ? styles.moneyPositive : styles.moneyNegative}>
                            {item.type === 'income' ? '+' : '−'}{formatMoney(item.amount)}
                          </strong>
                          <button className={styles.actionBtn} type="button" onClick={() => deleteEntry(item.id)}>×</button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className={styles.emptyAnalytics} style={{ marginTop: 16 }}>Noch keine Einträge.</p>
                  )}
                </div>
              </div>
            )}

            {/* ── EINSTELLUNG: FIXKOSTEN ── */}
            {view === 'einstellung' && subView === 'fixkosten' && (
              <div>
                <div className={styles.reportHeader}>
                  <div>
                    <h2 className={styles.sectionTitle} style={{ margin: 0 }}>Fixkosten</h2>
                    {totalFixkosten > 0 && (
                      <p style={{ color: '#64748b', fontSize: 13, marginTop: 4 }}>
                        Gesamt: <strong style={{ color: '#0d1b2a' }}>{formatMoney(totalFixkosten)} / Monat</strong>
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
                          <span>{r.subtitle ? `${r.subtitle} · ` : ''}{r.category || 'Keine Kategorie'} · Tag {r.dayOfMonth}</span>
                        </div>
                        <strong className={r.type === 'income' ? styles.moneyPositive : ''}>{formatMoney(r.amount)}</strong>
                        <button className={styles.actionBtn} type="button" onClick={() => removeFixeintrag(r.id)}>×</button>
                      </div>
                    ))}
                  </div>
                )}

                <div className={styles.budgetPanel} style={{ maxWidth: 500 }}>
                  <h2 className={styles.sectionTitle}>Fixkosten hinzufügen</h2>
                  <form className={styles.budgetForm} onSubmit={addFixeintrag}>
                    <div className={styles.segmentedControl}>
                      <button type="button" className={newFix.type === 'income' ? styles.segmentActive : ''} onClick={() => setNewFix(p => ({ ...p, type: 'income' }))}>Einnahme</button>
                      <button type="button" className={newFix.type === 'expense' ? styles.segmentActive : ''} onClick={() => setNewFix(p => ({ ...p, type: 'expense' }))}>Ausgabe</button>
                    </div>
                    <label><span>Titel</span><input value={newFix.title} onChange={e => setNewFix(p => ({ ...p, title: e.target.value }))} placeholder="z. B. Miete, Leasing" required /></label>
                    <label><span>Untertitel (optional)</span><input value={newFix.subtitle} onChange={e => setNewFix(p => ({ ...p, subtitle: e.target.value }))} placeholder="z. B. Volksbank · Monatlich" /></label>
                    <div className={styles.budgetFieldRow}>
                      <label><span>Betrag (€)</span><input type="number" step="0.01" inputMode="decimal" value={newFix.amount} onChange={e => setNewFix(p => ({ ...p, amount: e.target.value }))} placeholder="0,00" required /></label>
                      <label><span>Tag des Monats</span><input type="number" min="1" max="28" value={newFix.dayOfMonth} onChange={e => setNewFix(p => ({ ...p, dayOfMonth: e.target.value }))} /></label>
                    </div>
                    <label>
                      <span>Kategorie</span>
                      <input list="fix-cat-list" value={newFix.category} onChange={e => setNewFix(p => ({ ...p, category: e.target.value }))} placeholder="z. B. Zu Hause, Auto" />
                      <datalist id="fix-cat-list">
                        {categories.map(c => <option key={c.id} value={c.name} />)}
                      </datalist>
                    </label>
                    <button className={styles.primaryBudgetBtn} type="submit">Fixkosten speichern</button>
                  </form>
                </div>
              </div>
            )}

            {/* ── EINSTELLUNG: BERICHT ── */}
            {view === 'einstellung' && subView === 'bericht' && (
              <div>
                <div className={styles.reportHeader}>
                  <div>
                    <h2 className={styles.sectionTitle} style={{ margin: 0 }}>Monatsbericht</h2>
                    <p style={{ color: '#64748b', fontSize: 13, marginTop: 4 }}>{formatMonthLabel(month)}</p>
                  </div>
                  <button className={styles.printBtn} type="button" onClick={() => window.print()}>Drucken</button>
                </div>

                {incomeTotals.length > 0 && (
                  <div className={styles.reportSection}>
                    <p className={styles.reportSectionTitle}>Einnahmen</p>
                    <div className={styles.reportGrid}>
                      {incomeTotals.map(([cat, total]) => (
                        <div className={styles.reportCard} key={cat}><span>{cat}</span><strong className={styles.moneyPositive}>{formatMoney(total)}</strong></div>
                      ))}
                    </div>
                    <div className={styles.reportTotalRow}><span>Gesamt Einnahmen</span><strong className={styles.moneyPositive}>{formatMoney(summary.income)}</strong></div>
                  </div>
                )}

                {categoryTotals.length > 0 && (
                  <div className={styles.reportSection}>
                    <p className={styles.reportSectionTitle}>Ausgaben nach Kategorie</p>
                    <div className={styles.reportGrid}>
                      {categoryTotals.map(([cat, total]) => (
                        <div className={styles.reportCard} key={cat}><span>{cat}</span><strong>{formatMoney(total)}</strong></div>
                      ))}
                    </div>
                    <div className={styles.reportTotalRow}><span>Gesamt Ausgaben</span><strong className={styles.moneyNegative}>{formatMoney(summary.expenses)}</strong></div>
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

          </div>
        </div>
      </main>
    </div>
  )
}
