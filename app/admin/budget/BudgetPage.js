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
  ['Restaurant', ['Eis/Coffee/Bäckerei', 'Essen', 'Krankenhaus']],
  ['Auto', ['Tanken', 'Strom', 'Parekn', 'Waschen', 'Reparatur/Service', 'Leasing', 'Bus-Ticket', 'ADAC', 'Bußgeld']],
  ['Zu Hause', ['Miete', 'Darlehen', 'Strom', 'Internet', 'Netflix', 'Fisch', 'Haushaltgerät', 'Papierkram']],
  ['Ausflug', ['Aufenthalt', 'Transport', 'Essen', 'Ticket']],
  ['Jamin', ['Konto', 'Gothaer', 'Kleidung', 'SIM-Karte', 'Frisur', 'Sonst', 'Medikamente', 'Versicherung']],
  ['Fatima', ['Iphone 16', 'Gift', 'Kleidung', 'Medikamente', 'Cosmetics']],
  ['Mobin', ['Schule', 'Taschengeld', 'Bus-Ticket', 'Kleidung', 'SIM-Karte', 'Schulsachen', 'Sonst', 'Spielzeug']],
  ['Mobina', ['Kindergarten', 'Kleidung', 'Spielzeug', 'Schule', 'Sport']],
  ['Meine Eltern', ['Apotheke, Versicherung', 'Sonst', 'Flugticket']],
  ['Hossein', ['Gift']],
  ['Fatima Eltern', ['Apotheke', 'Gift']],
  ['Mohsen', ['Gift']],
  ['Nazri', ['Mosche', 'Iran']],
]

const KNOWN_OLD_EXPENSE_CATEGORY_NAMES = new Set([
  'Lebensmittel', 'Restaurant', 'Auto', 'Zu Hause', 'Kleidung', 'Jamin',
  'Fatima', 'Mobin', 'Mobina', 'Meine Eltern', 'Moschee', 'Online',
])

function createDefaultCategories() {
  return [
    ...DEFAULT_EXPENSE_CATEGORIES.map(([name, subs]) => buildCat(name, subs)),
    buildCat('Einkommen', ['Gehalt', 'Kindergeld'], 'income'),
  ]
}

function mergeExpenseDefaults(categories) {
  const existing = Array.isArray(categories) ? categories : []
  if (!existing.length) return createDefaultCategories()

  const existingByName = new Map(existing.map(cat => [cat.name, cat]))
  const defaultNames = new Set(DEFAULT_EXPENSE_CATEGORIES.map(([name]) => name))

  // Only check for completely missing top-level categories or old names to clean up
  const missingTopLevel = DEFAULT_EXPENSE_CATEGORIES.some(([name]) => {
    const cat = existingByName.get(name)
    return !cat || cat.type !== 'expense'
  })
  const hasOldNames = existing.some(
    cat => cat.type === 'expense' && KNOWN_OLD_EXPENSE_CATEGORY_NAMES.has(cat.name) && !defaultNames.has(cat.name)
  )

  if (!missingTopLevel && !hasOldNames) {
    // Preserve incomes with Familienkasse→Kindergeld rename only
    const incomes = existing.filter(cat => cat.type === 'income')
      .map(cat => ({
        ...cat,
        subs: (cat.subs || []).map(sub => sub.name === 'Familienkasse' ? { ...sub, name: 'Kindergeld' } : sub),
      }))
    if (!incomes.length) return [...existing, buildCat('Einkommen', ['Gehalt', 'Kindergeld'], 'income')]
    return existing.map(cat => cat.type !== 'income' ? cat : incomes.find(i => i.id === cat.id) || cat)
  }

  // Add only missing top-level categories; keep existing ones exactly as-is
  const expenseCategories = DEFAULT_EXPENSE_CATEGORIES.map(([name, subs]) => {
    const current = existingByName.get(name)
    return current && current.type === 'expense' ? current : buildCat(name, subs)
  })
  const customExpenses = existing.filter(cat =>
    cat.type === 'expense' &&
    !defaultNames.has(cat.name) &&
    !KNOWN_OLD_EXPENSE_CATEGORY_NAMES.has(cat.name)
  )
  const incomes = existing.filter(cat => cat.type === 'income')
    .map(cat => ({
      ...cat,
      subs: (cat.subs || []).map(sub => sub.name === 'Familienkasse' ? { ...sub, name: 'Kindergeld' } : sub),
    }))
  return [
    ...expenseCategories,
    ...customExpenses,
    ...(incomes.length ? incomes : [buildCat('Einkommen', ['Gehalt', 'Kindergeld'], 'income')]),
  ]
}

const MONTH_SHORT = ['Jan','Feb','Mrz','Apr','Mai','Jun','Jul','Aug','Sep','Okt','Nov','Dez']
const MONTH_LONG  = ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember']

const CAT_GROUP_COLORS = {
  base:   { bg: '#d1fae5', border: '#059669', text: '#064e3b' },
  people: { bg: '#dbeafe', border: '#2563eb', text: '#1e3a8a' },
  family: { bg: '#ffe4e6', border: '#e11d48', text: '#881337' },
  income: { bg: '#dcfce7', border: '#16a34a', text: '#14532d' },
  custom: { bg: '#f8fafc', border: '#64748b', text: '#334155' },
}

const CATEGORY_COLOR_GROUPS = [
  { names: new Set(['Lebensmittel', 'Kleidung', 'Restaurant', 'Auto', 'Zu Hause', 'Ausflug']), color: CAT_GROUP_COLORS.base },
  { names: new Set(['Jamin', 'Fatima', 'Mobin', 'Mobina']), color: CAT_GROUP_COLORS.people },
  { names: new Set(['Meine Eltern', 'Hossein', 'Fatima Eltern', 'Mohsen', 'Nazri', 'Moschee']), color: CAT_GROUP_COLORS.family },
  { names: new Set(['Einkommen']), color: CAT_GROUP_COLORS.income },
]

function getCatColor(name) {
  return CATEGORY_COLOR_GROUPS.find(group => group.names.has(name))?.color || CAT_GROUP_COLORS.custom
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

function monthIsOnOrAfter(monthKey, startMonth) {
  return !startMonth || monthKey >= startMonth
}

function recurringEntriesForMonth(monthKey, recurring = []) {
  return recurring
    .filter(item => monthIsOnOrAfter(monthKey, item.startMonth))
    .map(item => {
      const category = item.category || ''
      const budgetKey = item.budgetKey || category
      return {
        id: `recurring:${item.id}:${monthKey}`,
        recurringId: item.id,
        generatedRecurring: true,
        type: item.type || 'expense',
        title: item.title,
        amount: Number(item.amount || 0),
        category,
        subtitle: 'Fixkosten',
        tags: [category, budgetKey].filter(Boolean),
        date: `${monthKey}-01`,
      }
    })
}

function monthWithRecurring(monthKey, store, recurring) {
  const base = store[monthKey] || emptyMonth()
  return {
    ...base,
    entries: [
      ...recurringEntriesForMonth(monthKey, recurring),
      ...(base.entries || []),
    ],
  }
}

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

function categoryBudgetValue(catBudgets, categoryName) {
  return catBudgets[categoryName] || catBudgets[`${categoryName} / Gesamt`] || 0
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

function CategoryPicker({ categories, type, selectedItems, onToggleItem, expandedCats, onToggleExpand, label = 'Kategorie wählen', emptyText = 'Keine Kategorien für diesen Typ.', selectionHint = 'Eine oder mehrere auswählen', showParentOption = false }) {
  const filteredCats = categories.filter(c => c.type === type)

  function isItemSelected(catId, subId) {
    return selectedItems.some(i => subId ? i.catId === catId && i.subId === subId : i.catId === catId && !i.subId)
  }

  return (
    <>
      {filteredCats.length > 0 ? (
        <div className={styles.entryCategoryBlock}>
          <div className={styles.entryFormLabelRow}>
            <span>{label}</span>
            <small>{selectedItems.length ? `${selectedItems.length} ausgewählt` : selectionHint}</small>
          </div>
          <div className={styles.catAccordion}>
            {filteredCats.map(cat => {
              const color      = getCatColor(cat.name)
              const isExpanded = expandedCats.has(cat.id)
              const hasSubs    = cat.subs.length > 0
              const isSelected = selectedItems.some(i => i.catId === cat.id)
              return (
                <div key={cat.id} className={styles.catAccordionItem} style={{ '--cat-bg': color.bg, '--cat-border': color.border, '--cat-text': color.text, borderColor: isSelected ? color.border : undefined }}>
                  <button type="button"
                    className={`${styles.catAccordionHeader} ${isExpanded ? styles.catAccordionHeaderOpen : ''} ${isSelected ? styles.catAccordionHeaderSelected : ''}`}
                    style={isSelected ? { background: color.bg, color: color.text } : {}}
                    onClick={() => {
                      if (hasSubs && showParentOption) onToggleItem(cat.id, cat.name, null, null)
                      else if (hasSubs) onToggleExpand(cat.id)
                      else onToggleItem(cat.id, cat.name, null, null)
                    }}>
                    <span className={styles.catAccordionTitle}>
                      <span className={styles.catAccordionDot} />
                      <span>{cat.name}</span>
                    </span>
                    {hasSubs ? (
                      <span
                        className={`${styles.catAccordionChevron} ${isExpanded ? styles.catAccordionChevronOpen : ''}`}
                        role="button"
                        tabIndex={0}
                        aria-label={`${cat.name} Unterkategorien öffnen`}
                        onClick={e => { e.stopPropagation(); onToggleExpand(cat.id) }}
                        onKeyDown={e => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault()
                            e.stopPropagation()
                            onToggleExpand(cat.id)
                          }
                        }}>
                        <ChevronDown />
                      </span>
                    ) : isSelected ? <span style={{ fontSize: 13 }}>✓</span> : null}
                  </button>
                  {hasSubs && isExpanded && (
                    <div className={styles.catAccordionSubs}>
                      {cat.subs.map(sub => {
                        const sel = isItemSelected(cat.id, sub.id)
                        return (
                          <button key={sub.id} type="button"
                            className={sel ? styles.catSubSelectPillActive : styles.catSubSelectPill}
                            onClick={() => onToggleItem(cat.id, cat.name, sub.id, sub.name)}>
                            {sel && <span className={styles.catSubSelectCheck}>✓</span>}
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
        <p className={styles.emptyAnalytics}>{emptyText}</p>
      )}
    </>
  )
}

// ── Entry form (shared between popup and elsewhere) ────────────────────────────
function EntryForm({ formId, categories, type, onTypeChange, selectedItems, onToggleItem, expandedCats, onToggleExpand, entryAmount, onAmountChange, entryDate, onDateChange, onSubmit, entryTitle, entryCatNames }) {
  return (
    <form id={formId} className={`${styles.budgetForm} ${styles.financeEntryForm}`} onSubmit={onSubmit}>
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

      <CategoryPicker
        categories={categories}
        type={type}
        selectedItems={selectedItems}
        onToggleItem={onToggleItem}
        expandedCats={expandedCats}
        onToggleExpand={onToggleExpand}
      />

      {/* Selection summary */}
      {selectedItems.length > 0 && (
        <div className={styles.entrySelectionSummary}>
          <div>
            <span className={styles.entrySelectionTitle}>{entryTitle}</span>
            {entryCatNames.length > 0 && <span className={styles.entrySelectionCats}>{entryCatNames.join(' · ')}</span>}
          </div>
        </div>
      )}
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

  // Category detail popup
  const [catDetail, setCatDetail]               = useState(null) // { type, key, label }
  const [expandedSubtitles, setExpandedSubtitles] = useState(new Set())
  const [editingEntry, setEditingEntry]           = useState(null) // { id, amount }

  const [catError, setCatError] = useState('')
  const [reportTab, setReportTab] = useState('monat')
  const [showMonthPicker, setShowMonthPicker] = useState(false)
  const monthPickerRef = useRef(null)

  // Fixkosten new entry form
  const [planAmount, setPlanAmount] = useState('')
  const [planSelectedItems, setPlanSelectedItems] = useState([])
  const [planExpandedCats, setPlanExpandedCats] = useState(new Set())

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

  // Close month picker on outside click
  useEffect(() => {
    if (!showMonthPicker) return
    const handler = e => {
      if (monthPickerRef.current && !monthPickerRef.current.contains(e.target)) {
        setShowMonthPicker(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [showMonthPicker])

  // One-time migration: set all existing fixkosten to start from 2025-01
  useEffect(() => {
    if (!loaded) return
    setRecurring(prev => {
      const needsMigration = prev.some(r => !r.startMonth || r.startMonth > '2025-01')
      if (!needsMigration) return prev
      return prev.map(r => ({ ...r, startMonth: '2025-01' }))
    })
  }, [loaded])

  // Close any open popup on Escape
  useEffect(() => {
    if (!showPopup && !catDetail) return
    const handler = e => {
      if (e.key !== 'Escape') return
      if (showPopup) closePopup()
      else if (catDetail) closeCatDetail()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [showPopup, catDetail])

  const monthData = useMemo(() => monthWithRecurring(month, store, recurring), [month, store, recurring])

  const summary = useMemo(() => {
    const income   = monthData.entries.filter(i => i.type === 'income').reduce((s, i) => s + Number(i.amount || 0), 0)
    const expenses = monthData.entries.filter(i => i.type === 'expense').reduce((s, i) => s + Number(i.amount || 0), 0)
    return { income, expenses, balance: income - expenses }
  }, [monthData])

  const categoryTotals = useMemo(() => {
    const catNames = new Set(categories.map(c => c.name))
    const t = {}
    monthData.entries.filter(i => i.type === 'expense').forEach(i => {
      // Nur Tags verwenden, die echte Hauptkategorien sind — sonst Subcategory-Namen als Kategorie
      const validTags = Array.isArray(i.tags) ? i.tags.filter(tag => catNames.has(tag)) : []
      const keys = validTags.length ? [...new Set(validTags)] : [i.category || 'Ohne Kategorie']
      keys.forEach(k => { t[k] = (t[k] || 0) + Number(i.amount || 0) })
    })
    return Object.entries(t).sort((a, b) => b[1] - a[1])
  }, [monthData.entries, categories])

  const incomeTotals = useMemo(() => {
    const t = {}
    monthData.entries.filter(i => i.type === 'income').forEach(i => {
      const k = i.title === 'Familienkasse' ? 'Kindergeld' : (i.title || 'Einkommen')
      t[k] = (t[k] || 0) + Number(i.amount || 0)
    })
    return Object.entries(t).sort((a, b) => b[1] - a[1])
  }, [monthData.entries])

  const totalCatBudget = useMemo(() => {
    return Object.values(catBudgets).reduce((s, value) => s + Number(value || 0), 0)
  }, [catBudgets])

  function printBericht() {
    const fixEntries    = monthData.entries.filter(e => e.generatedRecurring)
    const manualEntries = [...monthData.entries.filter(e => !e.generatedRecurring)].sort((a, b) => (b.date || '').localeCompare(a.date || ''))
    const monthLabel    = formatMonthLabel(month)
    const fmtDate       = d => { try { return new Date(d).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' }) } catch { return '—' } }

    const incomeRows = incomeTotals.map(([cat, total]) => {
      const pct = summary.income > 0 ? ((total / summary.income) * 100).toFixed(1) : '0'
      return `<tr><td>${cat}</td><td class="amt green">${formatMoney(total)}</td><td class="pct">${pct} %</td></tr>`
    }).join('')

    const expenseRows = categoryTotals.map(([cat, total]) => {
      const budget = categoryBudgetValue(catBudgets, cat)
      const pct    = budget > 0 ? ((total / budget) * 100).toFixed(1) : '—'
      const status = !budget ? '' : total >= budget ? '⚠ Überzogen' : total / budget >= 0.75 ? '~ Achtung' : '✓ OK'
      return `<tr><td>${cat}</td><td class="amt red">${formatMoney(total)}</td><td class="amt">${budget ? formatMoney(budget) : '—'}</td><td class="pct">${pct !== '—' ? pct + ' %' : '—'}</td><td>${status}</td></tr>`
    }).join('')

    const fixRows = fixEntries.map(e =>
      `<tr><td>${e.title}</td><td>${e.category || '—'}</td><td class="amt red">${formatMoney(e.amount)}</td></tr>`
    ).join('')

    const manualRows = manualEntries.map(e =>
      `<tr><td>${fmtDate(e.date)}</td><td>${e.title}</td><td>${e.category || '—'}</td><td class="amt ${e.type === 'income' ? 'green' : 'red'}">${e.type === 'income' ? '+' : '−'} ${formatMoney(e.amount)}</td></tr>`
    ).join('')

    const html = `<!DOCTYPE html><html lang="de"><head><meta charset="utf-8">
<title>Finanzbericht – ${monthLabel}</title>
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: system-ui, -apple-system, Arial, sans-serif; font-size: 13px; color: #1e293b; padding: 32px; }
  h1 { font-size: 22px; font-weight: 800; margin-bottom: 4px; }
  .sub { color: #64748b; font-size: 12px; margin-bottom: 24px; }
  h2 { font-size: 14px; font-weight: 700; margin: 20px 0 8px; padding-bottom: 4px; border-bottom: 2px solid #e2e8f0; }
  .kpi { display: flex; gap: 16px; margin-bottom: 24px; }
  .kpi-card { flex: 1; border: 1px solid #e2e8f0; border-radius: 10px; padding: 14px; }
  .kpi-label { font-size: 11px; color: #64748b; font-weight: 600; text-transform: uppercase; letter-spacing: .5px; }
  .kpi-value { font-size: 20px; font-weight: 800; display: block; margin: 4px 0 2px; }
  .kpi-sub { font-size: 11px; color: #94a3b8; }
  table { width: 100%; border-collapse: collapse; margin-bottom: 8px; }
  th { text-align: left; font-size: 11px; font-weight: 700; color: #64748b; padding: 5px 8px; border-bottom: 1px solid #e2e8f0; text-transform: uppercase; letter-spacing: .4px; }
  td { padding: 6px 8px; border-bottom: 1px solid #f1f5f9; vertical-align: middle; }
  tr:last-child td { border-bottom: none; }
  .amt { text-align: right; font-weight: 700; font-variant-numeric: tabular-nums; }
  .pct { text-align: right; color: #64748b; width: 70px; }
  .green { color: #16a34a; }
  .red { color: #dc2626; }
  .total-row td { font-weight: 800; border-top: 2px solid #e2e8f0; padding-top: 8px; }
  .saldo { margin-top: 16px; padding: 12px 16px; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; font-weight: 700; font-size: 15px; border: 1.5px solid ${summary.balance >= 0 ? '#16a34a' : '#dc2626'}; background: ${summary.balance >= 0 ? '#f0fdf4' : '#fef2f2'}; }
  .footer { margin-top: 32px; font-size: 11px; color: #94a3b8; text-align: center; }
  @media print {
    body { padding: 16px; }
    .kpi { flex-wrap: wrap; }
    .kpi-card { page-break-inside: avoid; }
    h2 { page-break-after: avoid; }
    table { page-break-inside: auto; }
    tr { page-break-inside: avoid; }
  }
</style></head><body>
<h1>Finanzbericht</h1>
<p class="sub">${monthLabel} · Erstellt am ${fmtDate(new Date().toISOString())}</p>

<div class="kpi">
  <div class="kpi-card"><div class="kpi-label">Einkommen</div><span class="kpi-value green">${formatMoney(summary.income)}</span><span class="kpi-sub">${incomeTotals.length} Quellen</span></div>
  <div class="kpi-card"><div class="kpi-label">Ausgaben</div><span class="kpi-value red">${formatMoney(summary.expenses)}</span><span class="kpi-sub">${categoryTotals.length} Kategorien</span></div>
  <div class="kpi-card"><div class="kpi-label">Saldo</div><span class="kpi-value ${summary.balance >= 0 ? 'green' : 'red'}">${formatMoney(summary.balance)}</span><span class="kpi-sub">${summary.balance >= 0 ? 'Positiv' : 'Negativ'}</span></div>
  <div class="kpi-card"><div class="kpi-label">Sparquote</div><span class="kpi-value" style="color:#0ea5e9">${summary.income ? sparquote(summary.income, summary.expenses) + ' %' : '—'}</span><span class="kpi-sub">des Einkommens</span></div>
</div>

${incomeTotals.length ? `
<h2>Einkommen</h2>
<table><thead><tr><th>Quelle</th><th style="text-align:right">Betrag</th><th style="text-align:right">Anteil</th></tr></thead>
<tbody>${incomeRows}</tbody>
<tfoot><tr class="total-row"><td>Gesamt</td><td class="amt green">${formatMoney(summary.income)}</td><td></td></tr></tfoot>
</table>` : ''}

${categoryTotals.length ? `
<h2>Ausgaben nach Kategorie</h2>
<table><thead><tr><th>Kategorie</th><th style="text-align:right">Ausgegeben</th><th style="text-align:right">Budget</th><th style="text-align:right">% Budget</th><th>Status</th></tr></thead>
<tbody>${expenseRows}</tbody>
<tfoot><tr class="total-row"><td>Gesamt</td><td class="amt red">${formatMoney(summary.expenses)}</td><td></td><td></td><td></td></tr></tfoot>
</table>` : ''}

${fixEntries.length ? `
<h2>Fixkosten (${fixEntries.length})</h2>
<table><thead><tr><th>Bezeichnung</th><th>Kategorie</th><th style="text-align:right">Betrag/Monat</th></tr></thead>
<tbody>${fixRows}</tbody>
<tfoot><tr class="total-row"><td>Gesamt</td><td></td><td class="amt red">${formatMoney(fixEntries.reduce((s, e) => s + e.amount, 0))}</td></tr></tfoot>
</table>` : ''}

${manualEntries.length ? `
<h2>Alle Einträge (${manualEntries.length})</h2>
<table><thead><tr><th>Datum</th><th>Bezeichnung</th><th>Kategorie</th><th style="text-align:right">Betrag</th></tr></thead>
<tbody>${manualRows}</tbody>
</table>` : ''}

<div class="saldo"><span>Monats-Saldo</span><span class="${summary.balance >= 0 ? 'green' : 'red'}">${formatMoney(summary.balance)}</span></div>
<div class="footer">Rad-Yar · Finanzübersicht ${monthLabel}</div>
</body></html>`

    const win = window.open('', '_blank', 'width=900,height=700')
    win.document.write(html)
    win.document.close()
    win.focus()
    setTimeout(() => win.print(), 400)
  }

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

  const planTitle = useMemo(() => {
    const firstSub = planSelectedItems.find(i => i.subName)
    if (firstSub) {
      const subs = planSelectedItems.filter(i => i.subName).map(i => i.subName)
      return subs.length > 1 ? subs.join(' / ') : firstSub.subName
    }
    return planSelectedItems[0]?.catName || ''
  }, [planSelectedItems])

  const planCatNames = useMemo(() => [...new Set(planSelectedItems.map(i => i.catName))], [planSelectedItems])

  const planBudgetKey = useMemo(() => {
    const selected = planSelectedItems[0]
    if (!selected) return ''
    return selected.subName ? `${selected.catName} / ${selected.subName}` : `${selected.catName} / Gesamt`
  }, [planSelectedItems])

  const annualData = useMemo(() => {
    const todayKey = getMonthKey()
    return Array.from({ length: 12 }, (_, i) => {
      const key  = `${year}-${String(i + 1).padStart(2, '0')}`
      // Zukünftige Monate: Fixkosten nicht einrechnen
      const data = key <= todayKey
        ? monthWithRecurring(key, store, recurring)
        : (store[key] || emptyMonth())
      const income   = data.entries.filter(e => e.type === 'income').reduce((s, e)  => s + Number(e.amount || 0), 0)
      const expenses = data.entries.filter(e => e.type === 'expense').reduce((s, e) => s + Number(e.amount || 0), 0)
      return { key, i, income, expenses, balance: income - expenses, hasData: data.entries.length > 0 }
    })
  }, [store, recurring, year])

  const maxAnnual = useMemo(() => Math.max(1, ...annualData.map(m => Math.max(m.income, m.expenses))), [annualData])

  const annualSummary = useMemo(() => {
    const months = annualData.filter(m => m.hasData)
    if (!months.length) return null
    const ti = months.reduce((s, m) => s + m.income, 0)
    const te = months.reduce((s, m) => s + m.expenses, 0)
    return { ti, te, balance: ti - te, avgI: ti / months.length, avgE: te / months.length, count: months.length }
  }, [annualData])

  const totalFixkosten = recurring.filter(r => r.type === 'expense').reduce((s, r) => s + Number(r.amount || 0), 0)

  const catDetailEntries = useMemo(() => {
    if (!catDetail) return []
    const { type, key } = catDetail
    if (type === 'income') {
      return monthData.entries.filter(e =>
        e.type === 'income' &&
        (e.title === key || (key === 'Kindergeld' && e.title === 'Familienkasse'))
      )
    }
    const catNames = new Set(categories.map(c => c.name))
    return monthData.entries.filter(e => {
      if (e.type !== 'expense') return false
      const validTags = Array.isArray(e.tags) ? e.tags.filter(t => catNames.has(t)) : []
      const keys = validTags.length ? validTags : [e.category || 'Ohne Kategorie']
      return keys.includes(key)
    })
  }, [catDetail, monthData.entries, categories])

  const catDetailGrouped = useMemo(() => {
    const groups = {}
    const ctxKey = catDetail?.key
    catDetailEntries.forEach(e => {
      // Richtigen Untertitel für diese Kategorie anzeigen (z.B. in Mobin → "Kleidung", in Kleidung → "Ernstings Family")
      const k = (ctxKey && e.catSubtitles?.[ctxKey]) || e.title || 'Sonstiges'
      if (!groups[k]) groups[k] = []
      groups[k].push(e)
    })
    return Object.entries(groups).sort(
      (a, b) =>
        b[1].reduce((s, e) => s + Number(e.amount), 0) -
        a[1].reduce((s, e) => s + Number(e.amount), 0)
    )
  }, [catDetailEntries])

  // ── Actions ────────────────────────────────────────────────────────────────
  function prevMonth() { const [y, m] = month.split('-').map(Number); setMonth(getMonthKey(new Date(y, m - 2, 1))) }
  function nextMonth() { const [y, m] = month.split('-').map(Number); setMonth(getMonthKey(new Date(y, m, 1))) }
  function updateMonth(updater) { setStore(prev => { const cur = prev[month] || emptyMonth(); return { ...prev, [month]: updater(cur) } }) }
  function saveCatBudget(cat, value) { setCatBudgets(prev => ({ ...prev, [cat]: Number(value) || 0 })) }

  function allEntries() {
    return Object.values(store).flatMap(m => m.entries || [])
  }
  function catHasEntries(catName) {
    return allEntries().some(e => {
      const cats = Array.isArray(e.tags) && e.tags.length ? e.tags : [e.category]
      return cats.includes(catName) || e.title === catName
    }) || recurring.some(r => r.category === catName || r.title === catName)
  }
  function subHasEntries(catName, subName) {
    return allEntries().some(e => e.category === catName && e.title === subName) ||
      recurring.some(r => r.category === catName && r.title === subName)
  }

  function addCategory(e) {
    e.preventDefault()
    const name = newCatName.trim()
    if (!name || categories.some(c => c.name === name)) return
    setCategories(prev => [...prev, buildCat(name, [], newCatType)])
    setNewCatName('')
    setCatError('')
  }
  function removeCategory(id) {
    const cat = categories.find(c => c.id === id)
    if (!cat) return
    if (catHasEntries(cat.name)) {
      setCatError(`„${cat.name}" hat noch Einträge. Bitte erst alle Einträge dieser Kategorie löschen.`)
      return
    }
    setCatError('')
    setCategories(prev => prev.filter(c => c.id !== id))
  }
  function addSubCategory(catId) {
    const name = (newSubInputs[catId] || '').trim()
    if (!name) return
    setCategories(prev => prev.map(c => c.id === catId ? { ...c, subs: [...c.subs, { id: makeId(), name }] } : c))
    setNewSubInputs(p => ({ ...p, [catId]: '' }))
    setCatError('')
  }
  function removeSubCategory(catId, subId) {
    const cat = categories.find(c => c.id === catId)
    const sub = cat?.subs.find(s => s.id === subId)
    if (!cat || !sub) return
    if (subHasEntries(cat.name, sub.name)) {
      setCatError(`„${sub.name}" (${cat.name}) hat noch Einträge. Bitte erst alle Einträge dieser Unterkategorie löschen.`)
      return
    }
    setCatError('')
    setCategories(prev => prev.map(c => c.id === catId ? { ...c, subs: c.subs.filter(s => s.id !== subId) } : c))
  }

  function initialExpandedForType(type) {
    if (type === 'income') {
      return new Set(categories.filter(c => c.type === 'income').map(c => c.id))
    }
    return new Set()
  }

  // Popup
  function openPopup(type = 'expense') {
    setCatDetail(null)   // close category detail if open
    setEntryType(type)
    setSelectedItems([])
    setExpandedCats(initialExpandedForType(type))
    setEntryAmount('')
    const todayKey = getMonthKey()
    setEntryDate(month === todayKey
      ? new Date().toISOString().slice(0, 10)
      : `${month}-01`)
    setShowPopup(true)
  }

  function closePopup() { setShowPopup(false) }

  function toggleExpand(catId) {
    setExpandedCats(prev => prev.has(catId) ? new Set() : new Set([catId]))
  }

  function toggleItem(catId, catName, subId, subName) {
    setSelectedItems(prev => {
      const exists = prev.find(i => subId ? i.catId === catId && i.subId === subId : i.catId === catId && !i.subId)
      if (exists) return prev.filter(i => !(subId ? i.catId === catId && i.subId === subId : i.catId === catId && !i.subId))
      return [...prev, { catId, catName, subId: subId || null, subName: subName || null }]
    })
  }

  function togglePlanExpand(catId) {
    setPlanExpandedCats(prev => { const n = new Set(prev); if (n.has(catId)) n.delete(catId); else n.add(catId); return n })
  }

  function togglePlanItem(catId, catName, subId, subName) {
    const item = { catId, catName, subId: subId || null, subName: subName || null }
    setPlanSelectedItems(prev => {
      const exists = prev.find(i => subId ? i.catId === catId && i.subId === subId : i.catId === catId && !i.subId)
      return exists ? [] : [item]
    })
  }

  function handleTypeChange(newType) {
    setEntryType(newType)
    setSelectedItems([])
    setExpandedCats(initialExpandedForType(newType))
  }

  function addEntry(e) {
    e.preventDefault()
    const amount = Number(entryAmount)
    if (!amount || !entryTitle) return
    const date = entryDate || new Date().toISOString().slice(0, 10)
    const targetKey = date.slice(0, 7)
    // Für jede gewählte Kategorie den richtigen Untertitel merken
    // z.B. { Mobin: 'Kleidung', Kleidung: 'Ernstings Family' }
    const catSubtitles = {}
    selectedItems.forEach(item => {
      catSubtitles[item.catName] = item.subName || item.catName
    })
    setStore(prev => {
      const cur = prev[targetKey] || emptyMonth()
      return {
        ...prev,
        [targetKey]: {
          ...cur,
          entries: [{
            id: makeId(), type: entryType, amount, title: entryTitle,
            subtitle: entryCatNames.join(' · '),
            category: entryCatNames[0] || '', tags: entryCatNames,
            catSubtitles,
            date,
          }, ...cur.entries],
        },
      }
    })
    closePopup()
  }

  function deleteEntry(id) {
    if (String(id).startsWith('recurring:')) {
      const recurringId = String(id).split(':')[1]
      if (recurringId) removeFixeintrag(recurringId)
      return
    }
    updateMonth(c => ({ ...c, entries: c.entries.filter(i => i.id !== id) }))
  }
  function clearMonth() { if (!window.confirm(`Alle Einträge für ${formatMonthLabel(month)} löschen?`)) return; setStore(prev => { const n = { ...prev }; delete n[month]; return n }) }

  function savePlanBudget() {
    const amount = Number(planAmount)
    if (!amount || !planBudgetKey) return
    setCatBudgets(prev => ({ ...prev, [planBudgetKey]: amount }))
    setPlanAmount('')
  }

  function addFixeintrag() {
    const amount = Number(planAmount)
    if (!amount || !planTitle) return
    setRecurring(prev => [...prev, {
      id: makeId(),
      type: 'expense',
      title: planTitle,
      amount,
      category: planCatNames[0] || '',
      budgetKey: planBudgetKey,
      startMonth: getMonthKey(), // immer ab aktuellem Monat, egal welcher Monat angezeigt wird
      dayOfMonth: '1',
    }])
    setPlanAmount('')
  }
  function removeFixeintrag(id) { setRecurring(prev => prev.filter(r => r.id !== id)) }

  function goToMonth(key) { setMonth(key); setView('monat') }
  function navEinstellung(sub) { setView('einstellung'); setSubView(sub) }

  function seedApr2026() {
    if (!window.confirm('April 2026 Ausgaben eintragen? Bereits vorhandene Einträge bleiben erhalten.')) return
    const mk = id => `seed-apr-${Date.now()}-${Math.random().toString(36).slice(2, 6)}-${id}`
    const e = (category, title, amount, sub) => ({
      id: mk(title), type: 'expense', amount, title,
      subtitle: category, category, tags: [category],
      catSubtitles: sub ? { [category]: sub } : undefined,
      date: '2026-04-01',
    })
    const entries = [
      // Lebensmittel
      e('Lebensmittel','Aldi',161), e('Lebensmittel','Lidl',535),
      e('Lebensmittel','Bonus',60), e('Lebensmittel','Edeka/Rewe/Netto',53),
      e('Lebensmittel','DM',20), e('Lebensmittel','Türkei',182),
      // Kleidung
      e('Kleidung','Supermarkt',5),
      // Restaurant
      e('Restaurant','Eis/Coffee/Bäckerei',19), e('Restaurant','Essen',193),
      // Auto (ohne Leasing; Bus-Ticket hier ist Auto-Kategorie, nicht Mobin)
      e('Auto','Tanken',39), e('Auto','Strom',13),
      e('Auto','Reparatur/Service',1392), e('Auto','Bus-Ticket',92),
      // Zu Hause (ohne Miete, Darlehen, Internet, Netflix)
      e('Zu Hause','Strom',91), e('Zu Hause','Haushaltgerät',95),
      // Jamin (ohne Konto, Gothaer)
      e('Jamin','Medikamente',10),
      // Fatima (ohne Iphone 16)
      e('Fatima','Kleidung',5), e('Fatima','Medikamente',296),
      // Mobin (ohne Schule, Bus-Ticket, SIM-Karte)
      e('Mobin','Taschengeld',18),
      // Mobina (ohne Kindergarten)
      e('Mobina','Kleidung',10),
      // Meine Eltern
      e('Meine Eltern','Apotheke/Versicherung',46,'Apotheke/Versicherung'),
      e('Meine Eltern','Sonst',3,'Sonst'),
      // Moschee (Nazri leer diesen Monat)
      e('Moschee','Iran',77,'Iran'),
    ]
    setStore(prev => {
      const cur = prev['2026-04'] || { entries: [] }
      const alreadyDone = cur.entries.some(x => String(x.id).startsWith('seed-apr-'))
      if (alreadyDone) { alert('Einträge für April 2026 sind bereits vorhanden.'); return prev }
      return { ...prev, '2026-04': { ...cur, entries: [...entries, ...cur.entries] } }
    })
    setMonth('2026-04')
    setView('monat')
  }

  function seedJan2026() {
    if (!window.confirm('Januar 2026 Ausgaben eintragen? Bereits vorhandene Einträge bleiben erhalten.')) return
    const mk = id => `seed-${Date.now()}-${Math.random().toString(36).slice(2, 6)}-${id}`
    const e = (category, title, amount) => ({
      id: mk(title), type: 'expense', amount, title,
      subtitle: category, category, tags: [category], date: '2026-01-15',
    })
    const entries = [
      e('Lebensmittel','Aldi',266), e('Lebensmittel','Lidl',288),
      e('Lebensmittel','Bonus',2), e('Lebensmittel','Edeka/Rewe/Netto',21),
      e('Lebensmittel','DM',60), e('Lebensmittel','Türkei',116),
      e('Kleidung','Takko',44), e('Kleidung','Ernstings Family',41),
      e('Restaurant','Essen',171),
      e('Auto','Tanken',100), e('Auto','Strom',8), e('Auto','Parekn',3),
      e('Auto','Waschen',3), e('Auto','Leasing',348),
      e('Zu Hause','Miete',2025), e('Zu Hause','Darlehen',475),
      e('Zu Hause','Strom',153), e('Zu Hause','Internet',47),
      e('Zu Hause','Netflix',12), e('Zu Hause','Haushaltgerät',25),
      e('Jamin','Konto',11), e('Jamin','Gothaer',22), e('Jamin','SIM-Karte',31),
      e('Jamin','Sonst',34), e('Jamin','Medikamente',10), e('Jamin','Versicherung',78),
      e('Fatima','Iphone 16',53), e('Fatima','Kleidung',31),
      e('Fatima','Medikamente',287), e('Fatima','Cosmetics',10),
      e('Mobin','Schule',1029), e('Mobin','Taschengeld',18), e('Mobin','Bus-Ticket',45),
      e('Mobin','Kleidung',38), e('Mobin','SIM-Karte',9), e('Mobin','Schulsachen',71),
      e('Mobin','Gift',444), e('Mobin','Sonst',80),
      e('Mobina','Kindergarten',370), e('Mobina','Kleidung',45),
      e('Mobina','Spielzeug',9), e('Mobina','Sonst',114),
      e('Moschee','Nazri',21), e('Moschee','Sonst',50),
      e('Ausflug','Milan',1400),
    ]
    setStore(prev => {
      const cur = prev['2026-01'] || { entries: [] }
      const alreadyDone = cur.entries.some(x => String(x.id).startsWith('seed-'))
      if (alreadyDone) { alert('Einträge für Januar 2026 sind bereits vorhanden.'); return prev }
      return { ...prev, '2026-01': { ...cur, entries: [...entries, ...cur.entries] } }
    })
    setMonth('2026-01')
    setView('monat')
  }

  function openCatDetail(type, key, label) {
    setShowPopup(false)  // close entry popup if open
    setCatDetail({ type, key, label })
    setExpandedSubtitles(new Set())
    setEditingEntry(null)
  }
  function closeCatDetail() { setCatDetail(null); setEditingEntry(null) }
  function toggleCatSubtitle(key) {
    setExpandedSubtitles(prev => {
      const n = new Set(prev)
      if (n.has(key)) n.delete(key); else n.add(key)
      return n
    })
  }
  function saveEntryEdit(id, newAmount) {
    const amount = Number(newAmount)
    if (!amount) return
    updateMonth(c => ({ ...c, entries: c.entries.map(e => e.id === id ? { ...e, amount } : e) }))
    setEditingEntry(null)
  }

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
          <div className={styles.monthNav} ref={monthPickerRef}>
            <button className={styles.monthNavBtn} onClick={prevMonth} aria-label="Vorheriger Monat">‹</button>
            <button
              className={styles.monthDisplay}
              onClick={() => setShowMonthPicker(p => !p)}
              aria-label="Monat auswählen"
            >
              <span className={styles.monthDisplayLabel}>{MONTH_SHORT[Number(month.split('-')[1]) - 1]}</span>
              <span className={styles.monthDisplayYear}>{month.split('-')[0]}</span>
            </button>
            <button className={styles.monthNavBtn} onClick={nextMonth} aria-label="Nächster Monat">›</button>

            {showMonthPicker && (() => {
              const [pickerYear, setPickerYear] = [
                Number(month.split('-')[0]),
                y => {
                  const m = month.split('-')[1]
                  setMonth(`${y}-${m}`)
                }
              ]
              const todayKey = getMonthKey()
              return (
                <div className={styles.monthPickerDropdown}>
                  <div className={styles.monthPickerYearRow}>
                    <button className={styles.monthPickerYearBtn} onClick={() => setPickerYear(pickerYear - 1)}>‹</button>
                    <span className={styles.monthPickerYearLabel}>{pickerYear}</span>
                    <button className={styles.monthPickerYearBtn} onClick={() => setPickerYear(pickerYear + 1)}>›</button>
                  </div>
                  <div className={styles.monthPickerGrid}>
                    {MONTH_SHORT.map((label, i) => {
                      const key = `${pickerYear}-${String(i + 1).padStart(2, '0')}`
                      const isSelected = key === month
                      const isToday = key === todayKey
                      return (
                        <button
                          key={key}
                          className={`${styles.monthPickerCell} ${isSelected ? styles.monthPickerCellSelected : ''} ${isToday && !isSelected ? styles.monthPickerCellToday : ''}`}
                          onClick={() => { setMonth(key); setShowMonthPicker(false) }}
                        >
                          {label}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )
            })()}
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
                  <button className={subView === 'budget' || subView === 'fixkosten' ? styles.sidebarSubActive : styles.sidebarSub} onClick={() => setSubView('budget')}>Budget &amp; Fixkosten</button>
                  <button className={subView === 'bericht' ? styles.sidebarSubActive : styles.sidebarSub} onClick={() => setSubView('bericht')}>Bericht</button>
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
                    {incomeTotals.length ? incomeTotals.map(([cat, total]) => {
                      const pct = summary.income > 0 ? (total / summary.income) * 100 : 0
                      return (
                        <div className={`${styles.incomeRow} ${styles.clickableRow}`} key={cat} onClick={() => openCatDetail('income', cat, cat)} role="button" tabIndex={0} onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && openCatDetail('income', cat, cat)}>
                          <span className={styles.incomeRowName}>{cat}</span>
                          <div className={styles.incomeBarTrack}><div className={styles.incomeBarFill} style={{ width: `${Math.max(pct, 3)}%` }} /></div>
                          <span className={styles.financeRowAmount}><strong className={styles.moneyPositive}>{formatMoney(total)}</strong><small>{pct.toFixed(0)} %</small></span>
                        </div>
                      )
                    }) : (
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
                      const budget = categoryBudgetValue(catBudgets, cat)
                      const color = trafficColor(total, budget)
                      const pct = budget > 0 ? Math.min((total / budget) * 100, 100) : 0
                      return (
                        <div className={`${styles.expenseRow} ${styles.clickableRow}`} key={cat} onClick={() => openCatDetail('expense', cat, cat)} role="button" tabIndex={0} onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && openCatDetail('expense', cat, cat)}>
                          <span className={styles.categoryName}>{cat}</span>
                          <div className={styles.categoryBarTrack}><div className={styles.categoryBarFill} style={{ width: `${budget > 0 ? Math.max(pct, 2) : 0}%`, background: color || undefined }} /></div>
                          <span className={styles.financeRowAmount}><strong>{formatMoney(total)}</strong><small>{budget ? `${pct.toFixed(0)} %` : 'kein Budget'}</small></span>
                          <span className={styles.trafficDot} style={{ background: color || 'transparent', border: color ? 'none' : '1px dashed #cbd5e1' }} title={budget ? `Budget: ${formatMoney(budget)}` : 'Kein Budget'} />
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
                {catError && (
                  <div className={styles.catErrorBanner}>
                    <span>⚠ {catError}</span>
                    <button type="button" onClick={() => setCatError('')}>×</button>
                  </div>
                )}
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
                {/* One-time data import */}
                <div style={{ marginTop: 16, padding: '14px 16px', borderRadius: 12, border: '1px dashed var(--border,#e2e8f0)', background: 'var(--bg-soft,#f8fafc)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                  <div>
                    <p style={{ margin: 0, fontWeight: 800, fontSize: 13, color: 'var(--text-strong,#0d1b2a)' }}>Ausgaben April 2026 importieren</p>
                    <p style={{ margin: '2px 0 0', fontSize: 12, color: 'var(--text-muted,#94a3b8)' }}>Variable Einträge – ohne Fixkosten</p>
                  </div>
                  <button type="button" className={styles.primaryBudgetBtn} style={{ whiteSpace: 'nowrap', flexShrink: 0 }} onClick={seedApr2026}>
                    Jetzt importieren
                  </button>
                </div>
              </div>
            )}

            {/* ── BUDGET & FIXKOSTEN ── */}
            {view === 'einstellung' && (subView === 'budget' || subView === 'fixkosten') && (
              <div className={styles.settingsBudgetStack}>
                <div className={`${styles.budgetPanel} ${styles.planComposerPanel}`}>
                  <div className={styles.fixedCostsHeader}>
                    <div>
                      <h2 className={styles.sectionTitle} style={{ margin: 0 }}>Budget &amp; Fixkosten</h2>
                      <p style={{ color: '#64748b', fontSize: 13, marginTop: 4 }}>Kategorie wählen, Betrag eintragen, dann als Budget oder Fixkosten speichern.</p>
                    </div>
                    <div className={styles.planTotalsRow}>
                      <div className={styles.fixedTotalPill}>
                        <span>Budget gesamt</span>
                        <strong>{totalCatBudget > 0 ? formatMoney(totalCatBudget) : '—'}</strong>
                      </div>
                      <div className={styles.fixedTotalPill}>
                        <span>Fixkosten</span>
                        <strong>{totalFixkosten > 0 ? formatMoney(totalFixkosten) : '—'}</strong>
                      </div>
                    </div>
                  </div>

                  <CategoryPicker
                    categories={categories}
                    type="expense"
                    selectedItems={planSelectedItems}
                    onToggleItem={togglePlanItem}
                    expandedCats={planExpandedCats}
                    onToggleExpand={togglePlanExpand}
                    label="Kategorie oder Unterkategorie wählen"
                    selectionHint="Eine Kategorie auswählen"
                    showParentOption
                  />

                  {planSelectedItems.length > 0 && (
                    <div className={styles.entrySelectionSummary}>
                      <div>
                        <span className={styles.entrySelectionTitle}>{planBudgetKey}</span>
                        {planCatNames.length > 0 && <span className={styles.entrySelectionCats}>{planCatNames.join(' · ')}</span>}
                      </div>
                    </div>
                  )}

                  <div className={styles.planActionBar}>
                    <label className={styles.entryAmountField}>
                      <span>Betrag</span>
                      <div className={styles.entryAmountInputWrap}>
                        <input type="number" step="0.01" inputMode="decimal" value={planAmount} onChange={e => setPlanAmount(e.target.value)} placeholder="0,00" />
                        <em>€</em>
                      </div>
                    </label>
                    <button className={styles.primaryBudgetBtn} type="button" disabled={!planTitle || !planAmount} onClick={savePlanBudget}>Budget speichern</button>
                    <button className={styles.primaryBudgetBtn} type="button" disabled={!planTitle || !planAmount} onClick={addFixeintrag}>Fixkosten speichern</button>
                  </div>
                </div>

                <div className={styles.budgetPanel}>
                  <h2 className={styles.sectionTitle} style={{ margin: '0 0 16px' }}>Gespeicherte Budgets</h2>
                  <div className={styles.savedBudgetGrid}>
                    {Object.entries(catBudgets).filter(([, amount]) => Number(amount || 0) > 0).map(([name, amount]) => {
                      const baseName = name.split(' / ')[0]
                      const color = getCatColor(baseName)
                      return (
                        <div key={name} className={styles.savedBudgetBox} style={{ '--cat-border': color.border, '--cat-bg': color.bg, '--cat-text': color.text }}>
                          <span>{name}</span>
                          <strong>{formatMoney(amount)}</strong>
                          <button className={styles.actionBtn} type="button" onClick={() => saveCatBudget(name, 0)}>×</button>
                        </div>
                      )
                    })}
                    {!Object.values(catBudgets).some(amount => Number(amount || 0) > 0) && <p className={styles.emptyAnalytics}>Noch kein Budget gespeichert.</p>}
                  </div>
                </div>

                <div className={styles.fixedCostsPanel}>
                  <h2 className={styles.sectionTitle} style={{ margin: 0 }}>Gespeicherte Fixkosten</h2>
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
                            {r.category && <span className={styles.fixedMetaPill}>{r.category}</span>}
                          </div>
                          <button className={styles.fixedDeleteBtn} type="button" onClick={() => removeFixeintrag(r.id)} aria-label={`${r.title} löschen`}>×</button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className={styles.emptyAnalytics}>Noch keine Fixkosten gespeichert.</p>
                  )}
                </div>
              </div>
            )}

            {/* ── BERICHT ── */}
            {view === 'einstellung' && subView === 'bericht' && (() => {
              const fixEntries   = monthData.entries.filter(e => e.generatedRecurring)
              const manualEntries = monthData.entries.filter(e => !e.generatedRecurring)
              const topExpenses  = monthData.entries
                .filter(e => e.type === 'expense' && !e.generatedRecurring)
                .sort((a, b) => b.amount - a.amount)
                .slice(0, 8)
              const topCats = [...categoryTotals].slice(0, 6)
              const budgetCats = categoryTotals.map(([cat, actual]) => {
                const budget = categoryBudgetValue(catBudgets, cat)
                const pct = budget > 0 ? Math.min((actual / budget) * 100, 100) : null
                const status = !budget ? 'none' : actual >= budget ? 'over' : actual / budget >= 0.75 ? 'warn' : 'ok'
                return { cat, actual, budget, pct, status }
              })
              const budgetedCats   = budgetCats.filter(c => c.budget > 0)
              const unbudgetedCats = budgetCats.filter(c => c.budget === 0)
              const overBudgetCats = budgetedCats.filter(c => c.status === 'over')
              const totalBudget    = budgetedCats.reduce((s, c) => s + c.budget, 0)
              const totalActual    = budgetedCats.reduce((s, c) => s + c.actual, 0)
              const totalBudgetPct = totalBudget > 0 ? Math.min((totalActual / totalBudget) * 100, 100) : 0

              // last 6 months data for trend
              const last6 = Array.from({ length: 6 }, (_, i) => {
                const d = new Date()
                d.setMonth(d.getMonth() - (5 - i))
                const key = getMonthKey(d)
                const data = monthWithRecurring(key, store, recurring)
                const inc = data.entries.filter(e => e.type === 'income').reduce((s, e) => s + Number(e.amount), 0)
                const exp = data.entries.filter(e => e.type === 'expense').reduce((s, e) => s + Number(e.amount), 0)
                return { key, label: MONTH_SHORT[d.getMonth()], inc, exp, bal: inc - exp }
              })
              const max6 = Math.max(1, ...last6.map(m => Math.max(m.inc, m.exp)))

              const statusColor = { over: '#dc2626', warn: '#d97706', ok: '#16a34a', none: '#cbd5e1' }
              const statusLabel = { over: 'Überzogen', warn: 'Achtung', ok: 'OK', none: '—' }

              return (
                <div>
                  {/* ── Header ── */}
                  <div className={styles.reportHeader}>
                    <div>
                      <h2 className={styles.sectionTitle} style={{ margin: 0 }}>Bericht</h2>
                      <p>{formatMonthLabel(month)}</p>
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button className={styles.printBtn} type="button" onClick={printBericht}>🖨 Als PDF / Drucken</button>
                    </div>
                  </div>

                  {/* ── Report Tabs ── */}
                  <div className={styles.reportTabBar}>
                    {[['monat','📅 Monat'],['jahr','📊 Jahr'],['top','🏆 Top-Ausgaben'],['budget','🎯 Budget']].map(([id, label]) => (
                      <button key={id} type="button"
                        className={reportTab === id ? styles.reportTabActive : styles.reportTabBtn}
                        onClick={() => setReportTab(id)}>
                        {label}
                      </button>
                    ))}
                  </div>

                  {/* ══ TAB: MONAT ══ */}
                  {reportTab === 'monat' && (
                    <div>
                      {/* KPI Cards */}
                      <div className={styles.berichtKPIGrid}>
                        {[
                          { label: 'Einkommen', value: formatMoney(summary.income),   color: '#16a34a', sub: `${incomeTotals.length} Quellen` },
                          { label: 'Ausgaben',  value: formatMoney(summary.expenses),  color: '#f97316', sub: `${categoryTotals.length} Kategorien` },
                          { label: 'Saldo',     value: formatMoney(summary.balance),   color: summary.balance >= 0 ? '#16a34a' : '#dc2626', sub: summary.balance >= 0 ? 'Positiv' : 'Negativ' },
                          { label: 'Sparquote', value: summary.income ? `${sparquote(summary.income, summary.expenses)} %` : '—', color: '#0ea5e9', sub: 'des Einkommens' },
                        ].map(k => (
                          <div key={k.label} className={styles.berichtKPICard} style={{ borderTop: `3px solid ${k.color}` }}>
                            <span className={styles.berichtKPILabel}>{k.label}</span>
                            <strong className={styles.berichtKPIValue} style={{ color: k.color }}>{k.value}</strong>
                            <small className={styles.berichtKPISub}>{k.sub}</small>
                          </div>
                        ))}
                      </div>

                      {/* Einnahmen */}
                      {incomeTotals.length > 0 && (
                        <div className={styles.reportSection}>
                          <p className={styles.reportSectionTitle}>Einnahmen</p>
                          {incomeTotals.map(([cat, total]) => {
                            const pct = summary.income > 0 ? (total / summary.income) * 100 : 0
                            return (
                              <div key={cat} className={styles.berichtRow}>
                                <span className={styles.berichtRowLabel}>{cat}</span>
                                <div className={styles.berichtBarTrack}><div className={styles.berichtBarIncome} style={{ width: `${Math.max(pct,2)}%` }} /></div>
                                <span className={styles.berichtRowAmt}><strong className={styles.moneyPositive}>{formatMoney(total)}</strong><small>{pct.toFixed(0)} %</small></span>
                              </div>
                            )
                          })}
                          <div className={styles.reportTotalRow} style={{ marginTop: 8 }}><span>Gesamt Einnahmen</span><strong className={styles.moneyPositive}>{formatMoney(summary.income)}</strong></div>
                        </div>
                      )}

                      {/* Ausgaben nach Kategorie */}
                      {categoryTotals.length > 0 && (
                        <div className={styles.reportSection}>
                          <p className={styles.reportSectionTitle}>Ausgaben nach Kategorie</p>
                          {categoryTotals.map(([cat, total]) => {
                            const budget = categoryBudgetValue(catBudgets, cat)
                            const pct = budget > 0 ? Math.min((total / budget) * 100, 100) : 0
                            const col = trafficColor(total, budget)
                            return (
                              <div key={cat} className={styles.berichtRow}>
                                <span className={styles.berichtRowLabel}>{cat}</span>
                                <div className={styles.berichtBarTrack}>
                                  <div className={styles.berichtBarExpense} style={{ width: `${budget > 0 ? Math.max(pct,2) : 0}%`, background: col || '#f97316' }} />
                                </div>
                                <span className={styles.berichtRowAmt}>
                                  <strong>{formatMoney(total)}</strong>
                                  <small>{budget ? `${pct.toFixed(0)} %` : '—'}</small>
                                </span>
                                <span style={{ width: 8, height: 8, borderRadius: '50%', background: col || '#e2e8f0', flexShrink: 0 }} />
                              </div>
                            )
                          })}
                          <div className={styles.reportTotalRow} style={{ marginTop: 8 }}><span>Gesamt Ausgaben</span><strong className={styles.moneyNegative}>{formatMoney(summary.expenses)}</strong></div>
                        </div>
                      )}

                      {/* Fixkosten */}
                      {fixEntries.length > 0 && (
                        <div className={styles.reportSection}>
                          <p className={styles.reportSectionTitle}>Fixkosten diesen Monat ({fixEntries.length})</p>
                          <div className={styles.berichtEntryTable}>
                            {fixEntries.map(e => (
                              <div key={e.id} className={styles.berichtEntryRow}>
                                <span className={styles.berichtEntryDate}>—</span>
                                <span className={styles.berichtEntryTitle}>{e.title}</span>
                                <span className={styles.berichtEntryCat}>{e.category}</span>
                                <strong className={styles.moneyNegative}>− {formatMoney(e.amount)}</strong>
                              </div>
                            ))}
                          </div>
                          <div className={styles.reportTotalRow} style={{ marginTop: 8 }}><span>Fixkosten gesamt</span><strong className={styles.moneyNegative}>{formatMoney(fixEntries.reduce((s,e) => s + e.amount, 0))}</strong></div>
                        </div>
                      )}

                      {/* Alle Einträge */}
                      {manualEntries.length > 0 && (
                        <div className={styles.reportSection}>
                          <p className={styles.reportSectionTitle}>Manuelle Einträge ({manualEntries.length})</p>
                          <div className={styles.berichtEntryTable}>
                            {[...manualEntries].sort((a,b) => (b.date||'').localeCompare(a.date||'')).map(e => (
                              <div key={e.id} className={styles.berichtEntryRow}>
                                <span className={styles.berichtEntryDate}>{new Date(e.date).toLocaleDateString('de-DE',{day:'2-digit',month:'2-digit'})}</span>
                                <span className={styles.berichtEntryTitle}>{e.title}</span>
                                <span className={styles.berichtEntryCat}>{e.category || '—'}</span>
                                <strong className={e.type === 'income' ? styles.moneyPositive : styles.moneyNegative}>
                                  {e.type === 'income' ? '+' : '−'} {formatMoney(e.amount)}
                                </strong>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {(incomeTotals.length > 0 || categoryTotals.length > 0) && (
                        <div className={styles.reportSaldoRow} style={{ border: `1px solid ${summary.balance >= 0 ? '#16a34a' : '#dc2626'}`, background: summary.balance >= 0 ? 'rgba(22,163,74,.05)' : 'rgba(220,38,38,.05)' }}>
                          <span>Monats-Saldo</span>
                          <strong className={summary.balance >= 0 ? styles.moneyPositive : styles.moneyNegative}>{formatMoney(summary.balance)}</strong>
                        </div>
                      )}
                      {!incomeTotals.length && !categoryTotals.length && <p className={styles.emptyAnalytics}>Noch keine Einträge für {formatMonthLabel(month)}.</p>}
                    </div>
                  )}

                  {/* ══ TAB: JAHR ══ */}
                  {reportTab === 'jahr' && (
                    <div>
                      {/* 6-Monats-Mini-Chart */}
                      <div className={styles.reportSection}>
                        <p className={styles.reportSectionTitle}>Letzte 6 Monate</p>
                        <div className={styles.berichtMiniChart}>
                          {last6.map(m => (
                            <div key={m.key} className={styles.berichtMiniCol} onClick={() => { setMonth(m.key); setView('monat') }} title={`${m.label}: ${formatMoney(m.inc)} / ${formatMoney(m.exp)}`}>
                              <div className={styles.berichtMiniBars}>
                                <div style={{ height: `${Math.max((m.inc / max6) * 100, m.inc ? 3 : 0)}%`, background: '#16a34a', borderRadius: '3px 3px 0 0' }} />
                                <div style={{ height: `${Math.max((m.exp / max6) * 100, m.exp ? 3 : 0)}%`, background: '#f97316', borderRadius: '3px 3px 0 0' }} />
                              </div>
                              <span className={styles.berichtMiniLabel}>{m.label}</span>
                              <span className={styles.berichtMiniSaldo} style={{ color: m.bal >= 0 ? '#16a34a' : '#dc2626' }}>{m.bal >= 0 ? '+' : ''}{Math.round(m.bal / 1000 * 10) / 10}k</span>
                            </div>
                          ))}
                        </div>
                        <div style={{ display: 'flex', gap: 14, marginTop: 6 }}>
                          <span className={styles.annualLegend}><span style={{ background: '#16a34a' }} />Einkommen</span>
                          <span className={styles.annualLegend}><span style={{ background: '#f97316' }} />Ausgaben</span>
                        </div>
                      </div>

                      {/* Jahres-Tabelle */}
                      <div className={styles.reportSection}>
                        <div className={styles.reportHeader} style={{ marginBottom: 12 }}>
                          <p className={styles.reportSectionTitle} style={{ margin: 0 }}>Jahresübersicht {year}</p>
                          <div style={{ display: 'flex', gap: 4 }}>
                            <button className={styles.monthNavBtn} onClick={() => setYear(y => y - 1)}>‹</button>
                            <span className={styles.monthDisplay}>{year}</span>
                            <button className={styles.monthNavBtn} onClick={() => setYear(y => y + 1)}>›</button>
                          </div>
                        </div>
                        <div className={styles.budgetPanel} style={{ padding: 0, overflowX: 'auto' }}>
                          <table className={styles.annualTable}>
                            <thead><tr><th>Monat</th><th>Einkommen</th><th>Ausgaben</th><th>Saldo</th><th>Sparquote</th></tr></thead>
                            <tbody>
                              {annualData.map(m => (
                                <tr key={m.key} onClick={() => goToMonth(m.key)} style={{ cursor: 'pointer' }} className={m.key === month ? styles.annualRowActive : !m.hasData ? styles.annualRowEmpty : ''}>
                                  <td>{MONTH_LONG[m.i]}</td>
                                  <td className={styles.moneyPositive}>{m.hasData ? formatMoney(m.income) : '—'}</td>
                                  <td>{m.hasData ? formatMoney(m.expenses) : '—'}</td>
                                  <td className={m.balance >= 0 ? styles.moneyPositive : styles.moneyNegative}>{m.hasData ? formatMoney(m.balance) : '—'}</td>
                                  <td>{m.hasData && m.income ? `${sparquote(m.income, m.expenses)} %` : '—'}</td>
                                </tr>
                              ))}
                            </tbody>
                            {annualSummary && (
                              <tfoot>
                                <tr>
                                  <td>Jahresgesamt</td>
                                  <td className={styles.moneyPositive}>{formatMoney(annualSummary.ti)}</td>
                                  <td>{formatMoney(annualSummary.te)}</td>
                                  <td className={annualSummary.balance >= 0 ? styles.moneyPositive : styles.moneyNegative}>{formatMoney(annualSummary.balance)}</td>
                                  <td>{sparquote(annualSummary.ti, annualSummary.te)} %</td>
                                </tr>
                                <tr className={styles.annualRowAvg}>
                                  <td>Ø pro Monat</td>
                                  <td className={styles.moneyPositive}>{formatMoney(annualSummary.avgI)}</td>
                                  <td>{formatMoney(annualSummary.avgE)}</td>
                                  <td className={annualSummary.balance >= 0 ? styles.moneyPositive : styles.moneyNegative}>{formatMoney(annualSummary.balance / annualSummary.count)}</td>
                                  <td>—</td>
                                </tr>
                              </tfoot>
                            )}
                          </table>
                        </div>
                        {annualSummary && (() => {
                          const best = [...annualData].filter(m => m.hasData).sort((a,b) => b.balance - a.balance)[0]
                          const worst = [...annualData].filter(m => m.hasData).sort((a,b) => a.balance - b.balance)[0]
                          return (
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 12 }}>
                              {best && <div className={styles.berichtHighlight} style={{ borderColor: '#16a34a', background: 'rgba(22,163,74,.04)' }}>
                                <small>🏆 Bester Monat</small>
                                <strong>{MONTH_LONG[best.i]}</strong>
                                <span className={styles.moneyPositive}>{formatMoney(best.balance)}</span>
                              </div>}
                              {worst && worst !== best && <div className={styles.berichtHighlight} style={{ borderColor: '#dc2626', background: 'rgba(220,38,38,.04)' }}>
                                <small>⚠ Schlechtester Monat</small>
                                <strong>{MONTH_LONG[worst.i]}</strong>
                                <span className={styles.moneyNegative}>{formatMoney(worst.balance)}</span>
                              </div>}
                            </div>
                          )
                        })()}
                      </div>
                    </div>
                  )}

                  {/* ══ TAB: TOP-AUSGABEN ══ */}
                  {reportTab === 'top' && (
                    <div>
                      {/* Größte Einzelposten */}
                      <div className={styles.reportSection}>
                        <p className={styles.reportSectionTitle}>Größte Einzelausgaben ({formatMonthLabel(month)})</p>
                        {topExpenses.length > 0 ? (
                          <div className={styles.berichtEntryTable}>
                            {topExpenses.map((e, idx) => (
                              <div key={e.id} className={styles.berichtTopRow}>
                                <span className={styles.berichtTopRank}>#{idx+1}</span>
                                <span className={styles.berichtEntryDate}>{new Date(e.date).toLocaleDateString('de-DE',{day:'2-digit',month:'2-digit'})}</span>
                                <span className={styles.berichtEntryTitle}>{e.title}</span>
                                <span className={styles.berichtEntryCat}>{e.category || '—'}</span>
                                <div className={styles.berichtBarTrack} style={{ maxWidth: 80 }}>
                                  <div className={styles.berichtBarExpense} style={{ width: `${topExpenses[0]?.amount ? (e.amount / topExpenses[0].amount) * 100 : 0}%`, background: idx === 0 ? '#dc2626' : '#f97316' }} />
                                </div>
                                <strong className={styles.moneyNegative}>− {formatMoney(e.amount)}</strong>
                              </div>
                            ))}
                          </div>
                        ) : <p className={styles.emptyAnalytics}>Noch keine Ausgaben eingetragen.</p>}
                      </div>

                      {/* Top Kategorien */}
                      <div className={styles.reportSection}>
                        <p className={styles.reportSectionTitle}>Top Ausgabe-Kategorien</p>
                        {topCats.length > 0 ? topCats.map(([cat, total], idx) => {
                          const pct = categoryTotals[0]?.[1] > 0 ? (total / categoryTotals[0][1]) * 100 : 0
                          const entryCount = monthData.entries.filter(e => e.type === 'expense' && e.category === cat).length
                          return (
                            <div key={cat} className={styles.berichtRow}>
                              <span className={styles.berichtRowLabel} style={{ fontWeight: idx === 0 ? 900 : 700 }}>
                                {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `  ${idx+1}.`} {cat}
                              </span>
                              <div className={styles.berichtBarTrack}><div className={styles.berichtBarExpense} style={{ width: `${Math.max(pct,2)}%` }} /></div>
                              <span className={styles.berichtRowAmt}>
                                <strong>{formatMoney(total)}</strong>
                                <small>{entryCount} Eintr.</small>
                              </span>
                            </div>
                          )
                        }) : <p className={styles.emptyAnalytics}>Keine Ausgaben.</p>}
                      </div>

                      {/* Statistiken */}
                      {monthData.entries.filter(e => e.type === 'expense').length > 0 && (
                        <div className={styles.reportSection}>
                          <p className={styles.reportSectionTitle}>Statistiken</p>
                          <div className={styles.berichtStatGrid}>
                            {(() => {
                              const expEntries = monthData.entries.filter(e => e.type === 'expense')
                              const avgExp = expEntries.length > 0 ? summary.expenses / expEntries.length : 0
                              const maxCat = categoryTotals[0]
                              const fixTotal = fixEntries.reduce((s,e) => s + e.amount, 0)
                              const fixPct = summary.expenses > 0 ? (fixTotal / summary.expenses) * 100 : 0
                              return [
                                { label: 'Ø pro Ausgabe', value: formatMoney(avgExp) },
                                { label: 'Anzahl Ausgaben', value: expEntries.length },
                                { label: 'Größte Kategorie', value: maxCat ? maxCat[0] : '—' },
                                { label: 'Fixkosten-Anteil', value: fixPct > 0 ? `${fixPct.toFixed(0)} %` : '—' },
                              ].map(s => (
                                <div key={s.label} className={styles.berichtStatCard}>
                                  <span>{s.label}</span>
                                  <strong>{s.value}</strong>
                                </div>
                              ))
                            })()}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* ══ TAB: BUDGET ══ */}
                  {reportTab === 'budget' && (
                    <div>
                      {/* Gesamtübersicht */}
                      {totalBudget > 0 && (
                        <div className={styles.reportSection}>
                          <p className={styles.reportSectionTitle}>Budget-Gesamtstatus</p>
                          <div className={styles.berichtBudgetOverview}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                              <span style={{ fontSize: 13, fontWeight: 700 }}>Gesamtbudget</span>
                              <span style={{ fontSize: 13 }}><strong style={{ color: totalActual > totalBudget ? '#dc2626' : '#0d1b2a' }}>{formatMoney(totalActual)}</strong> / {formatMoney(totalBudget)}</span>
                            </div>
                            <div className={styles.budgetBar} style={{ height: 10, borderRadius: 6 }}>
                              <div className={totalActual >= totalBudget ? styles.budgetBarOver : styles.budgetBarGood} style={{ width: `${totalBudgetPct}%`, borderRadius: 6 }} />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                              <span style={{ fontSize: 11, color: '#94a3b8' }}>{totalBudgetPct.toFixed(0)} % verbraucht</span>
                              <span style={{ fontSize: 11, color: totalActual > totalBudget ? '#dc2626' : '#16a34a' }}>
                                {totalActual > totalBudget ? `${formatMoney(totalActual - totalBudget)} überzogen` : `${formatMoney(totalBudget - totalActual)} übrig`}
                              </span>
                            </div>
                          </div>
                          {overBudgetCats.length > 0 && (
                            <div className={styles.catErrorBanner} style={{ marginTop: 10 }}>
                              <span>⚠ {overBudgetCats.length} Kategorie{overBudgetCats.length > 1 ? 'n' : ''} überzogen: {overBudgetCats.map(c => c.cat).join(', ')}</span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Per-Kategorie */}
                      <div className={styles.reportSection}>
                        <p className={styles.reportSectionTitle}>Kategorien mit Budget ({budgetedCats.length})</p>
                        {budgetedCats.length > 0 ? budgetedCats.sort((a,b) => (b.pct||0) - (a.pct||0)).map(({ cat, actual, budget, pct, status }) => (
                          <div key={cat} className={styles.berichtBudgetRow}>
                            <span className={styles.berichtRowLabel}>{cat}</span>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div className={styles.berichtBarTrack} style={{ marginBottom: 2 }}>
                                <div style={{ height: '100%', width: `${pct||0}%`, background: statusColor[status], borderRadius: 4, transition: 'width .4s' }} />
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <small style={{ color: '#94a3b8', fontSize: 11 }}>{formatMoney(actual)} / {formatMoney(budget)}</small>
                                <small style={{ color: '#94a3b8', fontSize: 11 }}>{pct?.toFixed(0)} %</small>
                              </div>
                            </div>
                            <span className={styles.berichtStatusBadge} style={{ background: `${statusColor[status]}18`, color: statusColor[status] }}>{statusLabel[status]}</span>
                          </div>
                        )) : <p className={styles.emptyAnalytics}>Noch kein Budget gespeichert.</p>}
                      </div>

                      {unbudgetedCats.length > 0 && (
                        <div className={styles.reportSection}>
                          <p className={styles.reportSectionTitle}>Ohne Budget ({unbudgetedCats.length})</p>
                          <div className={styles.reportGrid}>
                            {unbudgetedCats.map(({ cat, actual }) => (
                              <div key={cat} className={styles.reportCard}>
                                <span>{cat}</span>
                                <strong>{formatMoney(actual)}</strong>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {categoryTotals.length === 0 && <p className={styles.emptyAnalytics}>Keine Ausgaben für {formatMonthLabel(month)}.</p>}
                    </div>
                  )}
                </div>
              )
            })()}

          </div>
        </div>

        {/* ── POPUP MODAL ── */}
        {showPopup && (
          <div className={styles.popupOverlay} onClick={closePopup} role="dialog" aria-modal="true" aria-label="Neuer Eintrag">
            <div className={styles.popupPanel} onClick={e => e.stopPropagation()}>
              {/* Header */}
              <div className={styles.popupHeader} style={{ borderBottom: `2px solid ${popupAccent}` }}>
                <div>
                  <p className={styles.popupMonthLabel}>
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
                  formId="budget-entry-form"
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

              {/* Submit bar – outside popupBody so it never covers scrollable content */}
              <div className={styles.entrySubmitBar}>
                <div>
                  <span>{entryTitle || 'Noch keine Kategorie'}</span>
                  <strong>{entryAmount ? `${entryAmount.replace('.', ',')} €` : '0,00 €'}</strong>
                </div>
                <button form="budget-entry-form" className={styles.primaryBudgetBtn} type="submit" disabled={!entryTitle || !entryAmount}>
                  Speichern
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── KATEGORIE-DETAIL POPUP ── */}
        {catDetail && (
          <div className={styles.popupOverlay} onClick={closeCatDetail} role="dialog" aria-modal="true" aria-label={catDetail.label}>
            <div className={styles.popupPanel} style={{ maxWidth: 480 }} onClick={e => e.stopPropagation()}>
              {/* Header */}
              <div className={styles.popupHeader} style={{ borderBottom: `2px solid ${catDetail.type === 'income' ? '#16a34a' : '#f97316'}` }}>
                <div>
                  <p className={styles.popupMonthLabel}>
                    {formatMonthLabel(month)}
                  </p>
                  <h3 className={styles.popupTitle} style={{ color: catDetail.type === 'income' ? '#16a34a' : '#f97316' }}>
                    {catDetail.label}
                  </h3>
                  <p style={{ margin: '4px 0 0', fontSize: 18, fontWeight: 900, color: '#0d1b2a' }}>
                    {formatMoney(catDetailEntries.reduce((s, e) => s + Number(e.amount), 0))}
                  </p>
                </div>
                <button className={styles.popupClose} onClick={closeCatDetail} aria-label="Schließen">×</button>
              </div>

              {/* Body */}
              <div className={styles.popupBody} style={{ paddingBottom: 16 }}>
                {catDetailGrouped.length === 0 ? (
                  <p style={{ color: '#94a3b8', textAlign: 'center', padding: '24px 0' }}>Keine Einträge.</p>
                ) : catDetailGrouped.map(([subtitle, entries]) => {
                  const groupTotal = entries.reduce((s, e) => s + Number(e.amount), 0)
                  const autoExpand = catDetailGrouped.length === 1
                  const isExpanded = autoExpand || expandedSubtitles.has(subtitle)
                  return (
                    <div key={subtitle} className={styles.catDetailGroup}>
                      <button type="button" className={styles.catDetailGroupHead} onClick={() => toggleCatSubtitle(subtitle)}>
                        <span>{subtitle}</span>
                        <span className={styles.catDetailGroupMeta}>
                          <strong>{formatMoney(groupTotal)}</strong>
                          <small>{entries.length} Eintr.</small>
                          <span className={isExpanded ? styles.catDetailChevronOpen : styles.catDetailChevron}><ChevronDown /></span>
                        </span>
                      </button>
                      {isExpanded && (
                        <div className={styles.catDetailEntries}>
                          {entries.slice().sort((a, b) => (b.date || '').localeCompare(a.date || '')).map(entry => (
                            <div key={entry.id} className={styles.catDetailEntry}>
                              <span className={styles.catDetailDate}>{new Date(entry.date).toLocaleDateString('de-DE')}</span>
                              {entry.generatedRecurring && <span className={styles.catDetailFixBadge}>Fixkosten</span>}
                              {editingEntry?.id === entry.id ? (
                                <div className={styles.catDetailEditRow}>
                                  <input type="number" step="0.01" value={editingEntry.amount} onChange={e => setEditingEntry(p => ({ ...p, amount: e.target.value }))} className={styles.catDetailInput} autoFocus />
                                  <button type="button" className={styles.catDetailSaveBtn} onClick={() => saveEntryEdit(entry.id, editingEntry.amount)}>✓</button>
                                  <button type="button" className={styles.catDetailCancelBtn} onClick={() => setEditingEntry(null)}>✗</button>
                                </div>
                              ) : (
                                <strong
                                  className={`${styles.catDetailAmount} ${catDetail.type === 'income' ? styles.moneyPositive : ''}`}
                                  onClick={() => !entry.generatedRecurring && setEditingEntry({ id: entry.id, amount: String(entry.amount) })}
                                  title={entry.generatedRecurring ? undefined : 'Klicken zum Bearbeiten'}
                                  style={{ cursor: entry.generatedRecurring ? 'default' : 'pointer' }}
                                >
                                  {formatMoney(entry.amount)}
                                </strong>
                              )}
                              <button type="button" className={styles.actionBtn} onClick={() => deleteEntry(entry.id)}>×</button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  )
}
