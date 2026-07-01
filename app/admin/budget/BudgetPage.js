'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import styles from '../admin.module.css'

const STORAGE_KEY    = 'radyar_private_budget_v1'
const RECURRING_KEY  = 'radyar_recurring_v1'
const CAT_BUDGET_KEY = 'radyar_cat_budget_v1'
const CATEGORIES_KEY = 'radyar_categories_v2'

async function budgetApi(method = 'GET', body) {
  const res = await fetch('/api/admin/budget', {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.error || 'Budget konnte nicht gespeichert werden.')
  return data
}

function makeId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

function buildCat(name, subs = [], type = 'expense') {
  return { id: makeId(), name, type, subs: subs.map(s => ({ id: makeId(), name: s })) }
}

const DEFAULT_EXPENSE_CATEGORIES = [
  ['Lebensmittel', ['Aldi', 'Lidl', 'Bonus', 'Edeka/Rewe/Netto', 'DM', 'Türkei']],
  ['Kleidung', ['Supermarkt', 'Takko', 'Ernstings Family', 'Deichman']],
  ['Online', ['Amazon', 'AliExpress', 'Temu']],
  ['Restaurant', ['Eis/Coffee/Bäckerei', 'Essen', 'Krankenhaus']],
  ['Auto', ['Tanken', 'Strom', 'Parekn', 'Waschen', 'Reparatur/Service', 'Leasing', 'Bus-Ticket', 'ADAC', 'Bußgeld']],
  ['Zu Hause', ['Miete', 'Darlehen', 'Strom', 'Internet', 'Netflix', 'Fisch', 'Haushaltgerät', 'Papierkram']],
  ['Jamin', ['Konto', 'Gothaer', 'Kleidung', 'SIM-Karte', 'Frisur', 'Sonst', 'Medikamente', 'Versicherung']],
  ['Fatima', ['Iphone 16', 'Gift', 'Kleidung', 'Medikamente', 'Cosmetics']],
  ['Mobin', ['Schule', 'Taschengeld', 'Bus-Ticket', 'Kleidung', 'SIM-Karte', 'Schulsachen', 'Sonst', 'Spielzeug']],
  ['Mobina', ['Kindergarten', 'Kleidung', 'Spielzeug', 'Schule', 'Sport']],
  ['Meine Eltern', ['Apotheke, Versicherung', 'Sonst', 'Flugticket']],
  ['Hossein', ['Gift']],
  ['Fatima Eltern', ['Apotheke', 'Gift']],
  ['Mohsen', ['Gift']],
  ['Nazri', ['Mosche', 'Iran']],
  ['Ausflug', ['Aufenthalt', 'Transport', 'Essen', 'Ticket']],
]

const KNOWN_OLD_EXPENSE_CATEGORY_NAMES = new Set([
  'Lebensmittel', 'Restaurant', 'Auto', 'Zu Hause', 'Kleidung', 'Jamin',
  'Fatima', 'Mobin', 'Mobina', 'Meine Eltern', 'Moschee',
])

function createDefaultCategories() {
  return [
    ...DEFAULT_EXPENSE_CATEGORIES.map(([name, subs]) => buildCat(name, subs)),
    buildCat('Einkommen', ['Gehalt', 'Familienkasse'], 'income'),
  ]
}

function mergeExpenseDefaults(categories) {
  const existing = Array.isArray(categories) ? categories : []
  const existingByName = new Map(existing.map(cat => [cat.name, cat]))
  const defaultNames = new Set(DEFAULT_EXPENSE_CATEGORIES.map(([name]) => name))
  const needsUpgrade = DEFAULT_EXPENSE_CATEGORIES.some(([name, subs]) => {
    const cat = existingByName.get(name)
    if (!cat || cat.type !== 'expense') return true
    const subNames = new Set((cat.subs || []).map(sub => sub.name))
    return subs.some(sub => !subNames.has(sub))
  }) || existing.some(cat => cat.type === 'expense' && KNOWN_OLD_EXPENSE_CATEGORY_NAMES.has(cat.name) && !defaultNames.has(cat.name))

  if (!needsUpgrade) return existing.length ? existing : createDefaultCategories()

  const expenseCategories = DEFAULT_EXPENSE_CATEGORIES.map(([name, subs]) => {
    const current = existingByName.get(name)
    const currentSubsByName = new Map((current?.subs || []).map(sub => [sub.name, sub]))
    return {
      id: current?.id || makeId(),
      name,
      type: 'expense',
      subs: subs.map(subName => currentSubsByName.get(subName) || { id: makeId(), name: subName }),
    }
  })
  const customExpenses = existing.filter(cat =>
    cat.type === 'expense' &&
    !defaultNames.has(cat.name) &&
    !KNOWN_OLD_EXPENSE_CATEGORY_NAMES.has(cat.name)
  )
  const incomes = existing.filter(cat => cat.type === 'income')
  return [
    ...expenseCategories,
    ...customExpenses,
    ...(incomes.length ? incomes : [buildCat('Einkommen', ['Gehalt', 'Familienkasse'], 'income')]),
  ]
}

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
function ChevronDown() {
  return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
}
function IconPlus() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
}

// ── Entry form (shared between popup and elsewhere) ────────────────────────────
function EntryForm({ categories, type, onTypeChange, selectedItems, onToggleItem, expandedCats, onToggleExpand, entryAmount, onAmountChange, entryDate, onDateChange, onSubmit, entryTitle, entryCatNames }) {
  const filteredCats = categories.filter(c => c.type === type)

  function isItemSelected(catId, subId) {
    return selectedItems.some(i => subId ? i.catId === catId && i.subId === subId : i.catId === catId && !i.subId)
  }

  return (
    <form className={`${styles.budgetForm} ${styles.financeEntryForm}`} onSubmit={onSubmit}>
      {/* Type */}
      <div className={`${styles.segmentedControl} ${styles.entryTypeSwitch}`}>
        <button type="button" className={type === 'income' ? styles.segmentActive : ''} onClick={() => onTypeChange('income')}>Einkommen</button>
        <button type="button" className={type === 'expense' ? styles.segmentActive : ''} onClick={() => onTypeChange('expense')}>Ausgabe</button>
      </div>

      {/* Amount + Date */}
      <div className={styles.entryAmountPanel}>
        <label className={styles.entryAmountField}>
          <span>Betrag</span>
          <div className={styles.entryAmountInputWrap}>
            <input type="number" step="0.01" inputMode="decimal" value={entryAmount} onChange={e => onAmountChange(e.target.value)} placeholder="0,00" required autoFocus />
            <em>€</em>
          </div>
        </label>
        <label className={styles.entryDateField}>
          <span>Datum</span>
          <input type="date" value={entryDate} onChange={e => onDateChange(e.target.value)} />
        </label>
      </div>

      {/* Category selector */}
      {filteredCats.length > 0 ? (
        <div className={styles.entryCategoryBlock}>
          <div className={styles.entryFormLabelRow}>
            <span>Kategorie wählen</span>
            <small>{selectedItems.length ? `${selectedItems.length} ausgewählt` : 'Eine oder mehrere auswählen'}</small>
          </div>
          <div className={styles.catAccordion}>
            {filteredCats.map(cat => {
              const color      = getCatColor(cat.name)
              const isExpanded = expandedCats.has(cat.id)
              const hasSubs    = cat.subs.length > 0
              const isSelected = selectedItems.some(i => i.catId === cat.id)
              return (
                <div key={cat.id} className={styles.catAccordionItem} style={{ borderColor: isSelected ? color.border : undefined }}>
                  <button type="button"
                    className={`${styles.catAccordionHeader} ${isExpanded ? styles.catAccordionHeaderOpen : ''} ${isSelected ? styles.catAccordionHeaderSelected : ''}`}
                    style={isSelected ? { background: color.bg, color: color.text } : {}}
                    onClick={() => {
                      if (hasSubs) onToggleExpand(cat.id)
                      else onToggleItem(cat.id, cat.name, null, null)
                    }}>
                    <span>{cat.name}</span>
                    {hasSubs ? (
                      <span className={`${styles.catAccordionChevron} ${isExpanded ? styles.catAccordionChevronOpen : ''}`}><ChevronDown /></span>
                    ) : isSelected ? <span style={{ fontSize: 13 }}>✓</span> : null}
                  </button>
                  {hasSubs && isExpanded && (
                    <div className={styles.catAccordionSubs}>
                      {cat.subs.map(sub => {
                        const sel = isItemSelected(cat.id, sub.id)
                        return (
                          <button key={sub.id} type="button"
                            className={sel ? styles.catSubSelectPillActive : styles.catSubSelectPill}
                            style={sel ? { background: color.bg, borderColor: color.border, color: color.text } : { borderColor: color.border, color: color.text }}
                            onClick={() => onToggleItem(cat.id, cat.name, sub.id, sub.name)}>
                            {sub.name}
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        <p className={styles.emptyAnalytics}>Keine Kategorien für diesen Typ.</p>
      )}

      {/* Selection summary */}
      {selectedItems.length > 0 && (
        <div className={styles.entrySelectionSummary}>
          <div>
            <span className={styles.entrySelectionTitle}>{entryTitle}</span>
            {entryCatNames.length > 0 && <span className={styles.entrySelectionCats}>{entryCatNames.join(' · ')}</span>}
          </div>
        </div>
      )}

      <div className={styles.entrySubmitBar}>
        <div>
          <span>{entryTitle || 'Noch keine Kategorie'}</span>
          <strong>{entryAmount ? `${entryAmount.replace('.', ',')} €` : '0,00 €'}</strong>
        </div>
        <button className={styles.primaryBudgetBtn} type="submit" disabled={!entryTitle || !entryAmount}>
          Speichern
        </button>
      </div>
    </form>
  )
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
  const [syncError, setSyncError]   = useState('')
  const didHydrate = useRef(false)
  const [catEdits, setCatEdits]     = useState({})
  const [newCatName, setNewCatName] = useState('')
  const [newCatType, setNewCatType] = useState('expense')
  const [newSubInputs, setNewSubInputs] = useState({})

  // Popup state
  const [showPopup, setShowPopup]         = useState(false)
  const [entryType, setEntryType]         = useState('expense')
  const [entryAmount, setEntryAmount]     = useState('')
  const [entryDate, setEntryDate]         = useState(new Date().toISOString().slice(0, 10))
  const [selectedItems, setSelectedItems] = useState([])
  const [expandedCats, setExpandedCats]   = useState(new Set())

  // Fixkosten new entry form
  const [newFix, setNewFix] = useState({
    type: 'expense', title: '', amount: '', category: '', dayOfMonth: '1',
  })

  useEffect(() => {
    let cancelled = false

    async function loadBudget() {
      let localStore = {}
      let localRecurring = []
      let localCatBudgets = {}
      let localCategories = createDefaultCategories()

      try { const r = localStorage.getItem(STORAGE_KEY);    if (r) localStore = JSON.parse(r)      } catch {}
      try { const r = localStorage.getItem(RECURRING_KEY);  if (r) localRecurring = JSON.parse(r)  } catch {}
      try { const r = localStorage.getItem(CAT_BUDGET_KEY); if (r) localCatBudgets = JSON.parse(r) } catch {}
      try {
        const r = localStorage.getItem(CATEGORIES_KEY)
        const p = r ? JSON.parse(r) : []
        localCategories = mergeExpenseDefaults(p.length > 0 ? p : createDefaultCategories())
      } catch {}

      try {
        const remote = await budgetApi()
        if (cancelled) return

        const remoteHasData =
          Object.keys(remote.store || {}).length > 0 ||
          (remote.recurring || []).length > 0 ||
          Object.keys(remote.catBudgets || {}).length > 0 ||
          (remote.categories || []).length > 0

        const nextState = remoteHasData ? {
          store: remote.store || {},
          recurring: remote.recurring || [],
          catBudgets: remote.catBudgets || {},
          categories: mergeExpenseDefaults((remote.categories || []).length > 0 ? remote.categories : createDefaultCategories()),
        } : {
          store: localStore,
          recurring: localRecurring,
          catBudgets: localCatBudgets,
          categories: mergeExpenseDefaults(localCategories),
        }

        setStore(nextState.store)
        setRecurring(nextState.recurring)
        setCatBudgets(nextState.catBudgets)
        setCategories(nextState.categories)
        setSyncError('')
        didHydrate.current = true
        setLoaded(true)

        if (!remoteHasData) await budgetApi('PUT', nextState)
      } catch (err) {
        if (cancelled) return
        setStore(localStore)
        setRecurring(localRecurring)
        setCatBudgets(localCatBudgets)
        setCategories(localCategories)
        setSyncError(err.message)
        didHydrate.current = true
        setLoaded(true)
      }
    }

    loadBudget()
    return () => { cancelled = true }
  }, [])

  useEffect(() => {
    if (!loaded || !didHydrate.current) return
    const payload = { store, recurring, catBudgets, categories }

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
      localStorage.setItem(RECURRING_KEY, JSON.stringify(recurring))
      localStorage.setItem(CAT_BUDGET_KEY, JSON.stringify(catBudgets))
      localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories))
    } catch {}

    const timer = window.setTimeout(async () => {
      try {
        await budgetApi('PUT', payload)
        setSyncError('')
      } catch (err) {
        setSyncError(err.message)
      }
    }, 500)

    return () => window.clearTimeout(timer)
  }, [store, recurring, catBudgets, categories, loaded])

  // Close popup on Escape
  useEffect(() => {
    if (!showPopup) return
    const handler = e => { if (e.key === 'Escape') closePopup() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [showPopup])

  const monthData = store[month] || emptyMonth()

  const summary = useMemo(() => {
    const income   = monthData.entries.filter(i => i.type === 'income').reduce((s, i) => s + Number(i.amount || 0), 0)
    const expenses = monthData.entries.filter(i => i.type === 'expense').reduce((s, i) => s + Number(i.amount || 0), 0)
    return { income, expenses, balance: income - expenses }
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
      const k = i.title || 'Einkommen'
      t[k] = (t[k] || 0) + Number(i.amount || 0)
    })
    return Object.entries(t).sort((a, b) => b[1] - a[1])
  }, [monthData.entries])

  const maxCategory = categoryTotals.length ? Math.max(...categoryTotals.map(([, v]) => v)) : 1
  const maxIncome   = incomeTotals.length   ? Math.max(...incomeTotals.map(([, v]) => v))   : 1

  const totalCatBudget = useMemo(() => {
    return categories.filter(c => c.type !== 'income').reduce((s, c) => s + (catBudgets[c.name] || 0), 0)
  }, [categories, catBudgets])

  const budgetRemaining = totalCatBudget - summary.expenses
  const budgetOver      = totalCatBudget > 0 && budgetRemaining < 0
  const budgetPct       = totalCatBudget > 0 ? Math.min((summary.expenses / totalCatBudget) * 100, 100) : 0

  const entryTitle = useMemo(() => {
    const firstSub = selectedItems.find(i => i.subName)
    if (firstSub) {
      const subs = selectedItems.filter(i => i.subName).map(i => i.subName)
      return subs.length > 1 ? subs.join(' / ') : firstSub.subName
    }
    return selectedItems[0]?.catName || ''
  }, [selectedItems])

  const entryCatNames = useMemo(() => [...new Set(selectedItems.map(i => i.catName))], [selectedItems])

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
  function prevMonth() { const [y, m] = month.split('-').map(Number); setMonth(getMonthKey(new Date(y, m - 2, 1))) }
  function nextMonth() { const [y, m] = month.split('-').map(Number); setMonth(getMonthKey(new Date(y, m, 1))) }
  function updateMonth(updater) { setStore(prev => { const cur = prev[month] || emptyMonth(); return { ...prev, [month]: updater(cur) } }) }
  function saveCatBudget(cat, value) { setCatBudgets(prev => ({ ...prev, [cat]: Number(value) || 0 })) }

  function addCategory(e) {
    e.preventDefault()
    const name = newCatName.trim()
    if (!name || categories.some(c => c.name === name)) return
    setCategories(prev => [...prev, buildCat(name, [], newCatType)])
    setNewCatName('')
  }
  function removeCategory(id) { if (!window.confirm('Kategorie löschen?')) return; setCategories(prev => prev.filter(c => c.id !== id)) }
  function addSubCategory(catId) {
    const name = (newSubInputs[catId] || '').trim()
    if (!name) return
    setCategories(prev => prev.map(c => c.id === catId ? { ...c, subs: [...c.subs, { id: makeId(), name }] } : c))
    setNewSubInputs(p => ({ ...p, [catId]: '' }))
  }
  function removeSubCategory(catId, subId) { setCategories(prev => prev.map(c => c.id === catId ? { ...c, subs: c.subs.filter(s => s.id !== subId) } : c)) }

  // Popup
  function openPopup(type = 'expense') {
    setEntryType(type)
    setSelectedItems([])
    setExpandedCats(new Set())
    setEntryAmount('')
    setEntryDate(new Date().toISOString().slice(0, 10))
    setShowPopup(true)
  }

  function closePopup() { setShowPopup(false) }

  function toggleExpand(catId) {
    setExpandedCats(prev => { const n = new Set(prev); if (n.has(catId)) n.delete(catId); else n.add(catId); return n })
  }

  function toggleItem(catId, catName, subId, subName) {
    setSelectedItems(prev => {
      const exists = prev.find(i => subId ? i.catId === catId && i.subId === subId : i.catId === catId && !i.subId)
      if (exists) return prev.filter(i => !(subId ? i.catId === catId && i.subId === subId : i.catId === catId && !i.subId))
      return [...prev, { catId, catName, subId: subId || null, subName: subName || null }]
    })
  }

  function handleTypeChange(newType) {
    setEntryType(newType)
    setSelectedItems([])
    setExpandedCats(new Set())
  }

  function addEntry(e) {
    e.preventDefault()
    const amount = Number(entryAmount)
    if (!amount || !entryTitle) return
    updateMonth(c => ({
      ...c,
      entries: [{
        id: makeId(), type: entryType, amount, title: entryTitle,
        subtitle: entryCatNames.join(' · '),
        category: entryCatNames[0] || '', tags: entryCatNames,
        date: entryDate || new Date().toISOString().slice(0, 10),
      }, ...c.entries],
    }))
    closePopup()
  }

  function deleteEntry(id) { updateMonth(c => ({ ...c, entries: c.entries.filter(i => i.id !== id) })) }
  function clearMonth() { if (!window.confirm(`Alle Einträge für ${formatMonthLabel(month)} löschen?`)) return; setStore(prev => { const n = { ...prev }; delete n[month]; return n }) }

  function addFixeintrag(e) {
    e.preventDefault()
    const amount = Number(newFix.amount)
    if (!newFix.title.trim() || !amount) return
    setRecurring(prev => [...prev, { id: makeId(), ...newFix, amount }])
    setNewFix(p => ({ ...p, title: '', amount: '', category: '' }))
  }
  function removeFixeintrag(id) { setRecurring(prev => prev.filter(r => r.id !== id)) }

  function goToMonth(key) { setMonth(key); setView('monat') }
  function navEinstellung(sub) { setView('einstellung'); setSubView(sub) }

  function SidebarItem({ icon, label, active, onClick }) {
    return <button className={active ? styles.sidebarItemActive : styles.sidebarItem} onClick={onClick} aria-current={active ? 'page' : undefined}>{icon}{label}</button>
  }

  const isIncome = entryType === 'income'
  const popupAccent = isIncome ? '#16a34a' : '#f97316'

  return (
    <div className={styles.page}>
      <main className={styles.content}>

        {/* ── HEADER ── */}
        <div className={styles.financeHeader}>
          <div>
            <h1 className={styles.title}>Private Finanzen</h1>
            <p className={styles.sub} style={{ margin: 0 }}>{formatMonthLabel(month)}</p>
            {syncError && <p className={styles.sub} style={{ margin: '4px 0 0', color: '#dc2626' }}>Online-Speichern fehlgeschlagen: {syncError}</p>}
          </div>
          <div className={styles.monthNav}>
            <button className={styles.monthNavBtn} onClick={prevMonth}>‹</button>
            <input type="month" className={styles.monthDisplay} value={month} onChange={e => setMonth(e.target.value || getMonthKey())} />
            <button className={styles.monthNavBtn} onClick={nextMonth}>›</button>
          </div>
        </div>

        {/* ── METRIKEN ── */}
        <div className={styles.financeMetrics}>
          <div className={styles.financeMetric} style={{ borderTop: '3px solid #16a34a' }}>
            <span>Einkommen</span>
            <strong className={styles.moneyPositive}>{formatMoney(summary.income)}</strong>
          </div>
          <div className={styles.financeMetric} style={{ borderTop: '3px solid #dc2626' }}>
            <span>Ausgaben</span>
            <strong className={styles.moneyNegative}>{formatMoney(summary.expenses)}</strong>
          </div>
          <div className={styles.financeMetric} style={{ borderTop: `3px solid ${summary.balance >= 0 ? '#16a34a' : '#dc2626'}` }}>
            <span>Saldo</span>
            <strong className={summary.balance >= 0 ? styles.moneyPositive : styles.moneyNegative}>{formatMoney(summary.balance)}</strong>
          </div>
          <div className={styles.financeMetric} style={{ borderTop: '3px solid #0ea5e9' }}>
            <span>Sparquote</span>
            <strong className={summary.balance >= 0 ? styles.moneyPositive : styles.moneyNegative}>
              {summary.income ? `${sparquote(summary.income, summary.expenses)} %` : '—'}
            </strong>
          </div>
        </div>

        {/* ── LAYOUT ── */}
        <div className={styles.financeLayout}>
          <aside className={styles.financeSidebar}>
            <nav className={styles.sidebarNav}>
              <SidebarItem icon={<IconCalendar />} label="Monatsübersicht" active={view === 'monat'} onClick={() => setView('monat')} />
              <SidebarItem icon={<IconChart />} label="Jahresübersicht" active={view === 'jahr'} onClick={() => setView('jahr')} />
              <SidebarItem icon={<IconSettings />} label="Einstellung" active={view === 'einstellung'} onClick={() => navEinstellung(subView)} />
              {view === 'einstellung' && (
                <div className={styles.sidebarSubGroup}>
                  <button className={subView === 'kategorien' ? styles.sidebarSubActive : styles.sidebarSub} onClick={() => setSubView('kategorien')}>Kategorien</button>
                  <button className={subView === 'budget'  ? styles.sidebarSubActive : styles.sidebarSub} onClick={() => setSubView('budget')}>Budget</button>
                  <button className={subView === 'fixkosten'  ? styles.sidebarSubActive : styles.sidebarSub} onClick={() => setSubView('fixkosten')}>Fixkosten</button>
                </div>
              )}
            </nav>
          </aside>

          <div className={styles.financeMain}>

            {/* ── MONATSÜBERSICHT ── */}
            {view === 'monat' && (
              <div>
                {/* EINKOMMEN */}
                <div className={styles.sectionCard} style={{ borderColor: 'rgba(22,163,74,.2)' }}>
                  <div className={styles.sectionCardHead} style={{ background: 'rgba(22,163,74,.07)', borderBottom: '1px solid rgba(22,163,74,.15)' }}>
                    <span className={styles.sectionCardLabel} style={{ color: '#15803d' }}>Einkommen</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <strong className={styles.moneyPositive} style={{ fontSize: 18 }}>{formatMoney(summary.income)}</strong>
                      <button className={styles.sectionAddBtn} style={{ background: '#16a34a' }} onClick={() => openPopup('income')} aria-label="Einkommen hinzufügen"><IconPlus /></button>
                    </div>
                  </div>
                  <div className={styles.sectionCardBody}>
                    {incomeTotals.length ? incomeTotals.map(([cat, total]) => (
                      <div className={styles.incomeRow} key={cat}>
                        <span className={styles.incomeRowName}>{cat}</span>
                        <div className={styles.incomeBarTrack}><div className={styles.incomeBarFill} style={{ width: `${Math.max((total / maxIncome) * 100, 3)}%` }} /></div>
                        <span className={styles.moneyPositive} style={{ fontSize: 13, fontWeight: 800, textAlign: 'right' }}>{formatMoney(total)}</span>
                      </div>
                    )) : (
                      <div className={styles.sectionEmptyRow}>
                        <p>Kein Einkommen eingetragen.</p>
                        <button className={styles.sectionEmptyBtn} type="button" onClick={() => openPopup('income')}>+ Einkommen eintragen</button>
                      </div>
                    )}
                  </div>
                </div>

                {/* AUSGABEN */}
                <div className={styles.sectionCard} style={{ borderColor: 'rgba(249,115,22,.2)' }}>
                  <div className={styles.sectionCardHead} style={{ background: 'rgba(249,115,22,.07)', borderBottom: '1px solid rgba(249,115,22,.15)' }}>
                    <span className={styles.sectionCardLabel} style={{ color: '#c2410c' }}>Ausgaben</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      {totalCatBudget > 0 && (
                        <span style={{ fontSize: 12, color: budgetOver ? '#dc2626' : '#64748b' }}>
                          {budgetOver ? `${formatMoney(-budgetRemaining)} überzogen` : `${formatMoney(budgetRemaining)} übrig`}
                        </span>
                      )}
                      <strong className={styles.moneyNegative} style={{ fontSize: 18 }}>{formatMoney(summary.expenses)}</strong>
                      <button className={styles.sectionAddBtn} style={{ background: '#f97316' }} onClick={() => openPopup('expense')} aria-label="Ausgabe hinzufügen"><IconPlus /></button>
                    </div>
                  </div>
                  {totalCatBudget > 0 && (
                    <div className={styles.budgetBar} style={{ margin: 0, borderRadius: 0, height: 3 }}>
                      <div className={budgetOver ? styles.budgetBarOver : styles.budgetBarGood} style={{ width: `${budgetPct}%` }} />
                    </div>
                  )}
                  <div className={styles.sectionCardBody}>
                    {categoryTotals.length ? categoryTotals.map(([cat, total]) => {
                      const color = trafficColor(total, catBudgets[cat] || 0)
                      return (
                        <div className={styles.expenseRow} key={cat}>
                          <span className={styles.categoryName}>{cat}</span>
                          <div className={styles.categoryBarTrack}><div className={styles.categoryBarFill} style={{ width: `${Math.max((total / maxCategory) * 100, 2)}%` }} /></div>
                          <span className={styles.categoryAmount}>{formatMoney(total)}</span>
                          <span className={styles.trafficDot} style={{ background: color || 'transparent', border: color ? 'none' : '1px dashed #cbd5e1' }} title={catBudgets[cat] ? `Budget: ${formatMoney(catBudgets[cat])}` : 'Kein Budget'} />
                        </div>
                      )
                    }) : (
                      <div className={styles.sectionEmptyRow}>
                        <p>Keine Ausgaben eingetragen.</p>
                        <button className={styles.sectionEmptyBtn} type="button" onClick={() => openPopup('expense')}>+ Ausgabe eintragen</button>
                      </div>
                    )}
                  </div>
                  {(incomeTotals.length > 0 || categoryTotals.length > 0) && (
                    <div className={styles.sectionCardFoot}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: 13, fontWeight: 700, color: '#475569' }}>Saldo</span>
                        <strong className={summary.balance >= 0 ? styles.moneyPositive : styles.moneyNegative} style={{ fontSize: 16 }}>{formatMoney(summary.balance)}</strong>
                      </div>
                      <button className={styles.actionBtn} style={{ fontSize: 11 }} type="button" onClick={clearMonth}>Monat löschen</button>
                    </div>
                  )}
                </div>

                {/* Entry list */}
                {monthData.entries.length > 0 && (
                  <div>
                    <p className={styles.reportSectionTitle} style={{ marginBottom: 8 }}>Alle Einträge ({monthData.entries.length})</p>
                    <div className={styles.budgetEntryList}>
                      {monthData.entries.map(item => (
                        <div className={styles.budgetEntry} key={item.id}>
                          <span className={`${styles.budgetEntryType} ${item.type === 'income' ? styles.entryIncome : styles.entryExpense}`}>{item.type === 'income' ? '+' : '−'}</span>
                          <div className={styles.budgetEntryMain}>
                            <strong>{item.title}</strong>
                            <span>{new Date(item.date).toLocaleDateString('de-DE')}{item.category ? ` · ${item.category}` : ''}</span>
                            {Array.isArray(item.tags) && item.tags.length > 1 && <span className={styles.entryTags}>{item.tags.map(t => <span key={t} className={styles.entryTag}>{t}</span>)}</span>}
                          </div>
                          <strong className={item.type === 'income' ? styles.moneyPositive : styles.moneyNegative}>{item.type === 'income' ? '+' : '−'}{formatMoney(item.amount)}</strong>
                          <button className={styles.actionBtn} type="button" onClick={() => deleteEntry(item.id)}>×</button>
                        </div>
                      ))}
                    </div>
                  </div>
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
                      <div key={m.key} onClick={() => goToMonth(m.key)} className={`${styles.annualCol} ${m.key === month ? styles.annualColActive : ''}`} title={m.hasData ? `${MONTH_LONG[m.i]}: ${formatMoney(m.income)} / ${formatMoney(m.expenses)}` : MONTH_LONG[m.i]}>
                        <div className={styles.annualBars}>
                          <div className={styles.annualBarIn} style={{ height: `${m.hasData ? Math.max((m.income / maxAnnual) * 100, 4) : 3}%`, opacity: m.hasData ? 1 : 0.12 }} />
                          <div className={styles.annualBarEx} style={{ height: `${m.hasData ? Math.max((m.expenses / maxAnnual) * 100, 4) : 3}%`, opacity: m.hasData ? 1 : 0.12 }} />
                        </div>
                        <span className={styles.annualColLabel}>{MONTH_SHORT[m.i]}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: 14, marginTop: 8 }}>
                    <span className={styles.annualLegend}><span style={{ background: '#16a34a' }} />Einkommen</span>
                    <span className={styles.annualLegend}><span style={{ background: '#f97316' }} />Ausgaben</span>
                  </div>
                </div>
                <div className={styles.budgetPanel}>
                  {annualSummary ? (
                    <table className={styles.annualTable}>
                      <thead><tr><th>Monat</th><th>Einkommen</th><th>Ausgaben</th><th>Saldo</th><th>Sparquote</th></tr></thead>
                      <tbody>
                        {annualData.map(m => (
                          <tr key={m.key} onClick={() => goToMonth(m.key)} style={{ cursor: 'pointer' }} className={m.key === month ? styles.annualRowActive : !m.hasData ? styles.annualRowEmpty : ''}>
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
                  ) : <p className={styles.emptyAnalytics}>Noch keine Daten für {year}.</p>}
                </div>
              </div>
            )}

            {/* ── KATEGORIEN ── */}
            {view === 'einstellung' && subView === 'kategorien' && (
              <div>
                <div className={styles.categoryTileGrid}>
                  {categories.map(cat => {
                    const color    = getCatColor(cat.name)
                    return (
                      <div key={cat.id} className={styles.categoryManagedTile} style={{ '--cat-accent': color.border }}>
                        <div className={styles.categoryTileHeader}>
                          <div>
                            <div className={styles.categoryTileTitleRow}>
                              <span className={styles.categoryTileAccent} style={{ background: color.border }} />
                              <div className={styles.categoryTileName}>{cat.name}</div>
                              <span className={cat.type === 'income' ? styles.categoryTypeIncome : styles.categoryTypeExpense}>
                                {cat.type === 'income' ? 'Einkommen' : 'Ausgabe'}
                              </span>
                            </div>
                            <div className={styles.categoryTileMeta}>
                              <span>{cat.subs.length} Unterkategorien</span>
                            </div>
                          </div>
                          <button className={styles.categoryTileDelete} onClick={() => removeCategory(cat.id)} aria-label={`${cat.name} löschen`}>×</button>
                        </div>
                        <div className={styles.categorySubsRow}>
                          {cat.subs.map(sub => (
                            <span key={sub.id} className={styles.categorySubChip}>
                              {sub.name}
                              <button type="button" onClick={() => removeSubCategory(cat.id, sub.id)} aria-label={`${sub.name} löschen`}>×</button>
                            </span>
                          ))}
                          <form className={styles.categorySubAddForm} onSubmit={e => { e.preventDefault(); addSubCategory(cat.id) }}>
                            <input className={styles.categorySubInput} value={newSubInputs[cat.id] || ''} onChange={e => setNewSubInputs(p => ({ ...p, [cat.id]: e.target.value }))} placeholder="+ Unterkategorie" />
                          </form>
                        </div>
                      </div>
                    )
                  })}
                  <form className={styles.categoryAddTile} onSubmit={addCategory}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: '100%' }}>
                      <div className={styles.segmentedControl} style={{ padding: 2 }}>
                        <button type="button" className={newCatType === 'expense' ? styles.segmentActive : ''} onClick={() => setNewCatType('expense')}>Ausgabe</button>
                        <button type="button" className={newCatType === 'income' ? styles.segmentActive : ''} onClick={() => setNewCatType('income')}>Einkommen</button>
                      </div>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <input className={styles.categoryAddInput} value={newCatName} onChange={e => setNewCatName(e.target.value)} placeholder="Neue Kategorie…" />
                        <button type="submit" className={styles.categoryAddBtn} disabled={!newCatName.trim()}>+</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* ── BUDGET ── */}
            {view === 'einstellung' && subView === 'budget' && (
              <div>
                <div className={styles.budgetPanel}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <div>
                      <h2 className={styles.sectionTitle} style={{ margin: 0 }}>Budget pro Kategorie</h2>
                      <p style={{ color: '#64748b', fontSize: 13, marginTop: 4 }}>
                        Geplantes Gesamtbudget: <strong style={{ color: '#0d1b2a' }}>{totalCatBudget > 0 ? formatMoney(totalCatBudget) : '—'}</strong>
                      </p>
                    </div>
                  </div>
                  <div className={styles.budgetCatList}>
                    {categories.filter(c => c.type === 'expense').map(cat => {
                      const color   = getCatColor(cat.name)
                      return (
                        <div key={cat.id} className={styles.budgetCatRow} style={{ borderLeft: `3px solid ${color.border}` }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span className={styles.budgetCatName}>{cat.name}</span>
                          </div>
                          <input className={styles.budgetCatInput}
                            type="number" min="0" step="1" placeholder="—"
                            value={catEdits[cat.name] !== undefined ? catEdits[cat.name] : (catBudgets[cat.name] || '')}
                            onChange={e => setCatEdits(p => ({ ...p, [cat.name]: e.target.value }))}
                            onBlur={e => { saveCatBudget(cat.name, e.target.value); setCatEdits(p => { const n = { ...p }; delete n[cat.name]; return n }) }} />
                          <span className={styles.budgetCatUnit}>€</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* ── FIXKOSTEN ── */}
            {view === 'einstellung' && subView === 'fixkosten' && (
              <div>
                <div className={styles.fixedCostsPanel}>
                  <div className={styles.fixedCostsHeader}>
                    <div>
                      <h2 className={styles.sectionTitle} style={{ margin: 0 }}>Monatliche Fixkosten</h2>
                      <p style={{ color: '#64748b', fontSize: 13, marginTop: 4 }}>Wiederkehrende Beträge für deine Planung.</p>
                    </div>
                    <div className={styles.fixedTotalPill}>
                      <span>Summe pro Monat</span>
                      <strong>{totalFixkosten > 0 ? formatMoney(totalFixkosten) : '—'}</strong>
                    </div>
                  </div>
                  {recurring.length > 0 ? (
                    <div className={styles.fixedCardGrid}>
                      {recurring.map(r => (
                        <div className={styles.fixedCard} key={r.id}>
                          <div className={styles.fixedCardHead}>
                            <strong>{r.title}</strong>
                            <span className={r.type === 'income' ? styles.moneyPositive : styles.moneyNegative}>{formatMoney(r.amount)}</span>
                          </div>
                          <div className={styles.fixedMetaRow}>
                            <span className={r.type === 'income' ? styles.fixedMetaIncome : styles.fixedMetaExpense}>{r.type === 'income' ? 'Einnahme' : 'Ausgabe'}</span>
                            <span className={styles.fixedMetaPill}>Tag {r.dayOfMonth}</span>
                            {r.category && <span className={styles.fixedMetaPill}>{r.category}</span>}
                          </div>
                          <button className={styles.fixedDeleteBtn} type="button" onClick={() => removeFixeintrag(r.id)} aria-label={`${r.title} löschen`}>×</button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className={styles.emptyAnalytics}>Noch keine Fixkosten gespeichert.</p>
                  )}
                  <form className={`${styles.budgetForm} ${styles.fixedFormPanel}`} onSubmit={addFixeintrag}>
                    <div className={styles.segmentedControl}>
                      <button type="button" className={newFix.type === 'income' ? styles.segmentActive : ''} onClick={() => setNewFix(p => ({ ...p, type: 'income' }))}>Einkommen</button>
                      <button type="button" className={newFix.type === 'expense' ? styles.segmentActive : ''} onClick={() => setNewFix(p => ({ ...p, type: 'expense' }))}>Ausgabe</button>
                    </div>
                    <div className={styles.budgetFieldRow}>
                      <label><span>Titel</span><input value={newFix.title} onChange={e => setNewFix(p => ({ ...p, title: e.target.value }))} placeholder="z. B. Miete, Leasing" required /></label>
                      <label>
                        <span>Zuordnung</span>
                        <select value={newFix.category} onChange={e => setNewFix(p => ({ ...p, category: e.target.value }))}>
                          <option value="">Ohne Zuordnung</option>
                          {categories.filter(c => c.type === newFix.type).map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                        </select>
                      </label>
                    </div>
                    <div className={styles.budgetFieldRow}>
                      <label><span>Betrag (€)</span><input type="number" step="0.01" inputMode="decimal" value={newFix.amount} onChange={e => setNewFix(p => ({ ...p, amount: e.target.value }))} placeholder="0,00" required /></label>
                      <label><span>Tag des Monats</span><input type="number" min="1" max="28" value={newFix.dayOfMonth} onChange={e => setNewFix(p => ({ ...p, dayOfMonth: e.target.value }))} /></label>
                    </div>
                    <button className={styles.primaryBudgetBtn} type="submit">Fixkosten speichern</button>
                  </form>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* ── POPUP MODAL ── */}
        {showPopup && (
          <div className={styles.popupOverlay} onClick={closePopup} role="dialog" aria-modal="true" aria-label="Neuer Eintrag">
            <div className={styles.popupPanel} onClick={e => e.stopPropagation()}>
              {/* Header */}
              <div className={styles.popupHeader} style={{ borderBottom: `2px solid ${popupAccent}` }}>
                <div>
                  <p style={{ fontSize: 11, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '.06em', margin: '0 0 2px' }}>
                    {formatMonthLabel(month)}
                  </p>
                  <h3 className={styles.popupTitle} style={{ color: popupAccent }}>
                    {isIncome ? 'Einkommen' : 'Ausgabe'} eintragen
                  </h3>
                </div>
                <button className={styles.popupClose} onClick={closePopup} aria-label="Schließen">×</button>
              </div>

              {/* Body */}
              <div className={styles.popupBody}>
                <EntryForm
                  categories={categories}
                  type={entryType}
                  onTypeChange={handleTypeChange}
                  selectedItems={selectedItems}
                  onToggleItem={toggleItem}
                  expandedCats={expandedCats}
                  onToggleExpand={toggleExpand}
                  entryAmount={entryAmount}
                  onAmountChange={setEntryAmount}
                  entryDate={entryDate}
                  onDateChange={setEntryDate}
                  onSubmit={addEntry}
                  entryTitle={entryTitle}
                  entryCatNames={entryCatNames}
                />
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  )
}
