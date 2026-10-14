'use client'

import Link from 'next/link'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import styles from '../admin.module.css'
import MonthlyFinance, { FinanceMetrics, money } from './MonthlyFinance'
import EntryForm, { FinancePlanForm } from './FinanceEntryForm'
import FinanceIcon from './FinanceIcon'
import financeStyles from './MonthlyFinance.module.css'
import { berlinToday, buildMonthlyAnalytics, categoryLimit, entryTotals, parseEuroAmount, primaryCategory, shiftMonth, validEntryDate } from '@/utils/monthlyFinance'

const STORAGE_KEY    = 'radyar_private_budget_v1'
const RECURRING_KEY  = 'radyar_recurring_v1'
const CAT_BUDGET_KEY = 'radyar_cat_budget_v1'
const CATEGORIES_KEY = 'radyar_categories_v2'
const SYNC_META_KEY  = 'radyar_private_budget_sync_v2'
const SYNC_BASE_KEY  = 'radyar_private_budget_remote_base_v1'
const IRAN_TRIP_KEY  = '__iran_special_trip_v1'
const IRAN_ACCOUNT_OPENING_BALANCE_RIAL = '2798510103'


const IRAN_EXPENSE_CATEGORIES = [
  { name: 'Transport', icon: 'transport', subs: ['Flugzeug', 'Bahn', 'Taxi'] },
  { name: 'Aufenthalt', icon: 'stay', subs: [] },
  { name: 'Essen', icon: 'food', subs: ['Restaurant (allein)', 'Restaurant (mit anderen)', 'Supermarkt'] },
  { name: 'Freizeit & Spaß', icon: 'fun', subs: [] },
  { name: 'Einkäufe', icon: 'shopping', subs: ['Jamin', 'Fatima', 'Mobin', 'Mobina'] },
  { name: 'Geschenke und Ausgaben', icon: 'gift', subs: ['Jamins Familie', 'Fatimas Familie'] },
  { name: 'Telefon', icon: 'phone', subs: [] },
  { name: 'Gesundheit', icon: 'health', subs: [] },
  { name: 'Hilfe Iran', icon: 'help', subs: [] },
]

function iranCategoryValue(category, sub = '') {
  return sub ? `${category} › ${sub}` : category
}

function iranCategoryGroup(value) {
  return IRAN_EXPENSE_CATEGORIES.find(category => (
    value === category.name || value.startsWith(`${category.name} › `)
  ))?.name || value
}

const IRAN_SETTLEMENT_PEOPLE = ['Hossein', 'Mohsen', 'Maman']
const IRAN_INITIAL_SETTLEMENTS_RIAL = {
  Mohsen: 37_500_000 * 10,
}
const IRAN_EXPENSE_PAYERS = [
  { value: 'account', label: 'Mein Konto' },
  { value: 'Hossein', label: 'Hossein' },
  { value: 'Mohsen', label: 'Mohsen' },
  { value: 'Maman', label: 'Mamma' },
]

function iranPersonLabel(person) {
  return person === 'Maman' ? 'Mamma' : person
}

function emptyIranTrip() {
  return { exchangeRate: '', exchangeRateUnit: 'toman', accountBalanceRial: IRAN_ACCOUNT_OPENING_BALANCE_RIAL, displayCurrency: 'toman', expenses: [], settlements: [], exchanges: [] }
}

function normalizeIranTrip(value) {
  const fallback = emptyIranTrip()
  if (!value || typeof value !== 'object') return fallback
  const rawRate = Number(value.exchangeRate || 0)
  const exchangeRate = rawRate > 0
    ? String(value.exchangeRateUnit === 'toman' ? rawRate : rawRate / 10)
    : ''
  return {
    exchangeRate,
    exchangeRateUnit: 'toman',
    accountBalanceRial: value.accountBalanceRial ?? fallback.accountBalanceRial,
    displayCurrency: value.displayCurrency === 'eur' ? 'eur' : 'toman',
    expenses: Array.isArray(value.expenses) ? value.expenses : [],
    settlements: Array.isArray(value.settlements) ? value.settlements : [],
    exchanges: Array.isArray(value.exchanges) ? value.exchanges : [],
  }
}

function formatTomanFromRial(value) {
  return `${new Intl.NumberFormat('de-DE', { maximumFractionDigits: 1 }).format(Number(value || 0) / 10)} T`
}

function formatIranRial(value) {
  return `${new Intl.NumberFormat('de-DE', { maximumFractionDigits: 0 }).format(Number(value || 0))} Rial`
}

function formatTomanInput(value) {
  const digits = String(value || '').replace(/\D/g, '').replace(/^0+(?=\d)/, '')
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

function parseTomanInput(value) {
  return Number(String(value || '').replace(/,/g, ''))
}

function iranExpenseEuroValue(entry, fallbackRateToman) {
  const lockedEuro = Number(entry.amountEuroAtEntry)
  if (lockedEuro > 0) return lockedEuro
  if (entry.originalCurrency === 'eur' && Number(entry.originalAmount) > 0) return Number(entry.originalAmount)
  const lockedRate = Number(entry.exchangeRateAtEntryToman || (entry.exchangeRateUnit === 'toman' ? entry.exchangeRateAtEntry : 0))
  const rateToman = lockedRate > 0 ? lockedRate : Number(fallbackRateToman || 0)
  return rateToman > 0 ? Number(entry.amountRial || 0) / 10 / rateToman : 0
}

function iranSettlementAccountDelta(entry) {
  const amountRial = Number(entry.amountRial || 0)
  return entry.direction === 'receive' ? amountRial : -amountRial
}

function iranSettlementBalanceDelta(entry) {
  const amountRial = Number(entry.amountRial || 0)
  return entry.direction === 'receive' ? -amountRial : amountRial
}

async function budgetApi(method = 'GET', body) {
  const res = await fetch('/api/admin/budget', {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const fallbackMessage = method === 'GET'
      ? 'Finanzdaten konnten nicht geladen werden.'
      : 'Budget konnte nicht gespeichert werden.'
    const error = new Error(data.error || fallbackMessage)
    error.status = res.status
    throw error
  }
  return data
}

function budgetStateFromData(data = {}) {
  return {
    store: data.store && typeof data.store === 'object' ? data.store : {},
    recurring: Array.isArray(data.recurring) ? data.recurring : [],
    catBudgets: data.catBudgets && typeof data.catBudgets === 'object' ? data.catBudgets : {},
    categories: Array.isArray(data.categories) ? data.categories : [],
  }
}

function budgetStateHasData(state) {
  return Object.keys(state.store || {}).length > 0 ||
    (state.recurring || []).length > 0 ||
    Object.keys(state.catBudgets || {}).length > 0 ||
    (state.categories || []).length > 0
}

function sameStoredValue(left, right) {
  return JSON.stringify(left ?? null) === JSON.stringify(right ?? null)
}

function mergeVersionedRecord(remote = {}, local = {}, base = null) {
  const hasBase = Boolean(base && typeof base === 'object')
  const result = {}
  const keys = new Set([...Object.keys(remote || {}), ...Object.keys(local || {}), ...Object.keys(base || {})])

  keys.forEach(key => {
    const remoteHas = Object.prototype.hasOwnProperty.call(remote || {}, key)
    const localHas = Object.prototype.hasOwnProperty.call(local || {}, key)
    const baseHas = Object.prototype.hasOwnProperty.call(base || {}, key)

    if (!hasBase || !baseHas) {
      if (localHas) result[key] = local[key]
      else if (remoteHas) result[key] = remote[key]
      return
    }

    if (!localHas) return
    if (!sameStoredValue(local[key], base[key])) result[key] = local[key]
    else if (remoteHas) result[key] = remote[key]
  })

  return result
}

function mergeVersionedList(remote = [], local = [], base = null, getKey = item => item?.id) {
  const hasBase = Array.isArray(base)
  const toMap = items => new Map((items || []).map((item, index) => [
    String(getKey(item, index) || `fallback:${index}:${JSON.stringify(item)}`),
    item,
  ]))
  const remoteMap = toMap(remote)
  const localMap = toMap(local)
  const baseMap = toMap(base || [])
  const keys = new Set([...remoteMap.keys(), ...localMap.keys(), ...baseMap.keys()])
  const result = []

  keys.forEach(key => {
    const remoteHas = remoteMap.has(key)
    const localHas = localMap.has(key)
    const baseHas = baseMap.has(key)

    if (!hasBase || !baseHas) {
      if (localHas) result.push(localMap.get(key))
      else if (remoteHas) result.push(remoteMap.get(key))
      return
    }

    if (!localHas) return
    const localItem = localMap.get(key)
    const baseItem = baseMap.get(key)
    if (!sameStoredValue(localItem, baseItem)) result.push(localItem)
    else if (remoteHas) result.push(remoteMap.get(key))
  })

  return result
}

const entrySyncKey = item => item?.id || [item?.type, item?.date, item?.title, item?.amount, item?.category].join('|')
const recurringSyncKey = item => item?.id || [item?.type, item?.title, item?.category, item?.startMonth].join('|')
const categorySyncKey = item => item?.id || [item?.type, item?.name].join('|')

function mergeMonthState(remote = {}, local = {}, base = null) {
  const { entries: remoteEntries = [], ...remoteRest } = remote || {}
  const { entries: localEntries = [], ...localRest } = local || {}
  const { entries: baseEntries = [], ...baseRest } = base || {}
  return {
    ...mergeVersionedRecord(remoteRest, localRest, base ? baseRest : null),
    entries: mergeVersionedList(remoteEntries, localEntries, base ? baseEntries : null, entrySyncKey),
  }
}

function mergeIranTripState(remote = {}, local = {}, base = null) {
  const listKeys = new Set(['expenses', 'settlements', 'exchanges'])
  const withoutLists = value => Object.fromEntries(Object.entries(value || {}).filter(([key]) => !listKeys.has(key)))
  const merged = mergeVersionedRecord(withoutLists(remote), withoutLists(local), base ? withoutLists(base) : null)

  listKeys.forEach(key => {
    merged[key] = mergeVersionedList(
      Array.isArray(remote?.[key]) ? remote[key] : [],
      Array.isArray(local?.[key]) ? local[key] : [],
      base ? (Array.isArray(base?.[key]) ? base[key] : []) : null,
      entrySyncKey,
    )
  })
  return merged
}

function mergeBudgetStore(remote = {}, local = {}, base = null) {
  const hasBase = Boolean(base && typeof base === 'object')
  const result = {}
  const keys = new Set([...Object.keys(remote || {}), ...Object.keys(local || {}), ...Object.keys(base || {})])

  keys.forEach(key => {
    const remoteHas = Object.prototype.hasOwnProperty.call(remote || {}, key)
    const localHas = Object.prototype.hasOwnProperty.call(local || {}, key)
    const baseHas = Object.prototype.hasOwnProperty.call(base || {}, key)

    if (!hasBase || !baseHas) {
      if (localHas && remoteHas) {
        result[key] = key === IRAN_TRIP_KEY
          ? mergeIranTripState(remote[key], local[key])
          : mergeMonthState(remote[key], local[key])
      } else if (localHas) result[key] = local[key]
      else if (remoteHas) result[key] = remote[key]
      return
    }

    if (!localHas) return
    if (sameStoredValue(local[key], base[key])) {
      if (remoteHas) result[key] = remote[key]
      return
    }
    if (!remoteHas) {
      result[key] = local[key]
      return
    }
    result[key] = key === IRAN_TRIP_KEY
      ? mergeIranTripState(remote[key], local[key], base[key])
      : mergeMonthState(remote[key], local[key], base[key])
  })

  return result
}

function mergeBudgetStates(remote, local, base = null) {
  return {
    store: mergeBudgetStore(remote.store, local.store, base?.store || null),
    recurring: mergeVersionedList(remote.recurring, local.recurring, base?.recurring || null, recurringSyncKey),
    catBudgets: mergeVersionedRecord(remote.catBudgets, local.catBudgets, base?.catBudgets || null),
    categories: mergeVersionedList(remote.categories, local.categories, base?.categories || null, categorySyncKey),
  }
}

function persistBudgetState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.store))
    localStorage.setItem(RECURRING_KEY, JSON.stringify(state.recurring))
    localStorage.setItem(CAT_BUDGET_KEY, JSON.stringify(state.catBudgets))
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(state.categories))
  } catch {}
}

function persistBudgetSyncMeta({ dirty, remoteUpdatedAt, baseState }) {
  try {
    localStorage.setItem(SYNC_META_KEY, JSON.stringify({ dirty: Boolean(dirty), remoteUpdatedAt: remoteUpdatedAt || null }))
    if (baseState) localStorage.setItem(SYNC_BASE_KEY, JSON.stringify(baseState))
  } catch {}
}

async function reconcileBudgetState(localState, baseState) {
  let lastError = null
  for (let attempt = 0; attempt < 2; attempt += 1) {
    const latest = await budgetApi()
    const merged = mergeBudgetStates(budgetStateFromData(latest), localState, baseState)
    try {
      const saved = await budgetApi('PUT', { ...merged, expectedUpdatedAt: latest.updatedAt || null })
      return { state: merged, updatedAt: saved.updatedAt || latest.updatedAt || null }
    } catch (error) {
      lastError = error
      if (error.status !== 409) throw error
    }
  }
  throw lastError || new Error('Finanzdaten konnten nicht zusammengeführt werden.')
}

function FinanceSyncStatus({ status }) {
  const config = {
    loading: { label: 'Verbindung wird hergestellt', detail: 'Finanzdaten werden geladen.' },
    saving: { label: 'Wird gespeichert', detail: 'Deine Änderungen werden online gesichert.' },
    merging: { label: 'Änderungen werden zusammengeführt', detail: 'Lokale und aktuelle Online-Daten werden sicher abgeglichen.' },
    synced: { label: 'Online gespeichert', detail: 'Alle Änderungen sind synchronisiert.' },
    offline: { label: 'Nur lokal gespeichert', detail: 'Online-Speichern ist pausiert. Deine Änderungen bleiben auf diesem Gerät erhalten.' },
    conflict: { label: 'Abgleich pausiert', detail: 'Deine Eingaben bleiben auf diesem Gerät und werden beim nächsten Öffnen automatisch zusammengeführt.' },
  }
  const current = config[status] || config.loading

  return (
    <div className={`${styles.financeSyncStatus} ${styles[`financeSyncStatus_${status}`] || ''}`} role="status" aria-live="polite" title={current.detail}>
      <span className={styles.financeSyncDot} aria-hidden="true" />
      <span>
        <strong>{current.label}</strong>
        <small>{current.detail}</small>
      </span>
    </div>
  )
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
  ['Auto', ['Tanken', 'Strom', 'Parken', 'Waschen', 'Reparatur/Service', 'Leasing', 'Bus-Ticket', 'ADAC', 'Bußgeld']],
  ['Zu Hause', ['Miete', 'Darlehen', 'Strom', 'Internet', 'Netflix', 'Fisch', 'Haushaltgerät', 'Papierkram']],
  ['Ausflug', ['Aufenthalt', 'Transport', 'Essen', 'Ticket']],
  ['Jamin', ['Konto', 'Gothaer', 'Kleidung', 'SIM-Karte', 'Frisur', 'Sonst', 'Medikamente', 'Versicherung']],
  ['Fatima', ['Iphone 16', 'Gift', 'Kleidung', 'Medikamente', 'Cosmetics']],
  ['Mobin', ['Schule', 'Taschengeld', 'Bus-Ticket', 'Kleidung', 'SIM-Karte', 'Schulsachen', 'Sonst', 'Spielzeug']],
  ['Mobina', ['Kindergarten', 'Kleidung', 'Spielzeug', 'Schule', 'Sport']],
  ['Meine Eltern', ['Apotheke/Versicherung', 'Sonst', 'Flugticket']],
  ['Hossein', ['Gift']],
  ['Fatima Eltern', ['Apotheke', 'Gift']],
  ['Mohsen', ['Gift']],
  ['Nazri', ['Moschee', 'Iran']],
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

const LEGACY_SUBCATEGORY_RENAMES = {
  Auto: { Parekn: 'Parken' },
  Nazri: { Mosche: 'Moschee' },
  'Meine Eltern': { 'Apotheke, Versicherung': 'Apotheke/Versicherung' },
}

function normalizeCategoryLabels(categories) {
  return categories.map(category => {
    const renames = LEGACY_SUBCATEGORY_RENAMES[category.name]
    if (!renames) return category

    const seen = new Set()
    const subs = (category.subs || []).flatMap(sub => {
      const name = renames[sub.name] || sub.name
      if (seen.has(name)) return []
      seen.add(name)
      return [{ ...sub, name }]
    })
    return { ...category, subs }
  })
}

function mergeExpenseDefaults(categories) {
  const existing = normalizeCategoryLabels(Array.isArray(categories) ? categories : [])
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

function getMonthKey(date) {
  if (!date) return berlinToday().slice(0, 7)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
}

function getDateKey(date) {
  if (!date) return berlinToday()
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
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

function recurringAmountChanges(item) {
  return (Array.isArray(item?.amountChanges) ? item.amountChanges : [])
    .filter(change => change?.startMonth && Number(change.amount) > 0)
    .toSorted((a, b) => a.startMonth.localeCompare(b.startMonth))
}

function recurringAmountForMonth(item, monthKey) {
  let amount = Number(item?.amount || 0)
  recurringAmountChanges(item).forEach(change => {
    if (change.startMonth <= monthKey) amount = Number(change.amount || 0)
  })
  return amount
}

function nextRecurringAmountChange(item, monthKey) {
  return recurringAmountChanges(item).find(change => change.startMonth > monthKey) || null
}

function withRecurringAmountChange(item, amount, startMonth) {
  const initialStartMonth = item.startMonth || '2025-01'
  const changes = recurringAmountChanges(item)

  if (startMonth <= initialStartMonth) {
    return {
      ...item,
      amount,
      startMonth,
      amountChanges: changes.filter(change => change.startMonth > startMonth),
    }
  }

  return {
    ...item,
    amountChanges: [
      ...changes.filter(change => change.startMonth !== startMonth),
      { amount, startMonth },
    ].toSorted((a, b) => a.startMonth.localeCompare(b.startMonth)),
  }
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
        amount: recurringAmountForMonth(item, monthKey),
        category,
        subtitle: 'Fixkosten',
        tags: [...new Set([category, budgetKey].filter(Boolean))],
        date: `${monthKey}-01`,
      }
    })
}

function isVacationEntry(entry) {
  return entry?.category === 'Ausflug' || (entry?.tags || []).includes('Ausflug')
}

function withoutVacationEntries(monthData, excludeVacation) {
  if (!excludeVacation) return monthData
  return {
    ...monthData,
    entries: (monthData.entries || []).filter(entry => !isVacationEntry(entry)),
  }
}

function monthWithRecurring(monthKey, store, recurring, excludeVacation = false) {
  const base = store[monthKey] || emptyMonth()
  return withoutVacationEntries({
    ...base,
    entries: [
      ...recurringEntriesForMonth(monthKey, recurring),
      ...(base.entries || []),
    ],
  }, excludeVacation)
}

function IranCategoryIcon({ type }) {
  const paths = {
    transport: <><path d="M3 11h18"/><path d="M5 11l2-6h10l2 6v7H5z"/><circle cx="8" cy="18" r="2"/><circle cx="16" cy="18" r="2"/></>,
    stay: <><path d="M3 20V9l9-6 9 6v11"/><path d="M8 20v-7h8v7"/></>,
    food: <><path d="M7 3v8"/><path d="M4 3v5a3 3 0 0 0 6 0V3"/><path d="M7 11v10"/><path d="M17 3v18"/><path d="M17 3c-3 2-3 7 0 9"/></>,
    fun: <><path d="M8 14s1.5 2 4 2 4-2 4-2"/><path d="M9 9h.01"/><path d="M15 9h.01"/><circle cx="12" cy="12" r="9"/></>,
    shopping: <><path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.6L21 8H6"/><circle cx="10" cy="20" r="1"/><circle cx="18" cy="20" r="1"/></>,
    gift: <><rect x="3" y="8" width="18" height="13" rx="2"/><path d="M12 8v13"/><path d="M3 12h18"/><path d="M12 8H8.5a2.5 2.5 0 1 1 2.1-3.85L12 8Z"/><path d="M12 8h3.5a2.5 2.5 0 1 0-2.1-3.85L12 8Z"/></>,
    phone: <><rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/></>,
    health: <><path d="M12 21s-8-4.7-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 6.3-8 11-8 11Z"/><path d="M8 12h2l1-2 2 4 1-2h2"/></>,
    help: <><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"/><path d="M9 12h6"/><path d="M12 9v6"/></>,
  }
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[type]}</svg>
}
function IconPlus() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
}

export default function BudgetPage({ homeHref = '', homeLabel = '', iranOnly = false, initialView = 'monat', excludeVacation = false }) {
  const [view, setView]       = useState(() => iranOnly ? 'iranurlaub' : initialView)
  const [subView, setSubView] = useState('kategorien')
  const [month, setMonth]     = useState(getMonthKey())
  const [store, setStore]     = useState({})
  const [catBudgets, setCatBudgets] = useState({})
  const [recurring, setRecurring]   = useState([])
  const [categories, setCategories] = useState([])
  const [loaded, setLoaded]         = useState(false)
  const [syncStatus, setSyncStatus] = useState('loading')
  const didHydrate = useRef(false)
  const remoteWritesEnabled = useRef(false)
  const remoteVersion = useRef(null)
  const lastRemoteState = useRef(null)
  const skipNextRemoteSave = useRef(false)
  const [newCatName, setNewCatName] = useState('')
  const [newCatType, setNewCatType] = useState('expense')
  const [newSubInputs, setNewSubInputs] = useState({})

  // Popup state
  const [showPopup, setShowPopup]         = useState(false)
  const [entryType, setEntryType]         = useState('expense')
  const [entryAmount, setEntryAmount]     = useState('')
  const [entryDate, setEntryDate]         = useState(getDateKey())
  const [entryDescription, setEntryDescription] = useState('')
  const [selectedItems, setSelectedItems] = useState([])
  const [expandedCats, setExpandedCats]   = useState(new Set())
  const [paidByFatima, setPaidByFatima]   = useState(false)
  const [entryScope, setEntryScope]       = useState(null)
  const [incomeSourceMode, setIncomeSourceMode] = useState('standard')
  const [otherIncomeName, setOtherIncomeName] = useState('')
  const [entryErrors, setEntryErrors] = useState({})
  const [editingBooking, setEditingBooking] = useState(null)
  const [entryNotice, setEntryNotice] = useState(null)

  // Category detail popup
  const [catDetail, setCatDetail]               = useState(null) // { type, key, label }
  const [expandedSubtitles, setExpandedSubtitles] = useState(new Set())
  const [editingEntry, setEditingEntry]           = useState(null) // { id, amount }

  const [catError, setCatError] = useState('')
  const [showMonthPicker, setShowMonthPicker] = useState(false)
  const monthPickerRef = useRef(null)

  // Sonderurlaub Iran
  const [iranExpenseForm, setIranExpenseForm] = useState(() => ({
    category: iranCategoryValue(IRAN_EXPENSE_CATEGORIES[0].name, IRAN_EXPENSE_CATEGORIES[0].subs[0]), currency: 'toman', paidBy: 'account', amount: '', exchangeRate: '', description: '', date: getDateKey(),
  }))
  const [editingIranExpenseId, setEditingIranExpenseId] = useState(null)
  const [iranOpenCategory, setIranOpenCategory] = useState(null)
  const [iranAnalysisCategory, setIranAnalysisCategory] = useState(null)
  const iranExpenseCardRef = useRef(null)
  const iranCategoryPickerRef = useRef(null)
  const [iranSettlementForm, setIranSettlementForm] = useState(() => ({
    person: IRAN_SETTLEMENT_PEOPLE[0], direction: 'receive', currency: 'toman', amount: '', note: '', date: getDateKey(),
  }))
  const [iranExchangeForm, setIranExchangeForm] = useState(() => ({
    euroAmount: '', exchangeRate: '', date: getDateKey(),
  }))

  // Fixkosten new entry form
  const [planAmount, setPlanAmount] = useState('')
  const [planError, setPlanError] = useState('')
  const [planStartMonth, setPlanStartMonth] = useState(() => getMonthKey())
  const [planSelectedItems, setPlanSelectedItems] = useState([])
  const [editingRecurringId, setEditingRecurringId] = useState(null)
  const [recurringEditAmount, setRecurringEditAmount] = useState('')
  const [recurringEditStartMonth, setRecurringEditStartMonth] = useState(() => getMonthKey())

  useEffect(() => {
    let cancelled = false

    async function loadBudget() {
      let localStore = {}
      let localRecurring = []
      let localCatBudgets = {}
      let localCategories = createDefaultCategories()
      let localSyncMeta = null
      let localBaseState = null
      let localHasPersistedData = false

      try { const r = localStorage.getItem(STORAGE_KEY);    if (r) { localStore = JSON.parse(r); localHasPersistedData = true }      } catch {}
      try { const r = localStorage.getItem(RECURRING_KEY);  if (r) { localRecurring = JSON.parse(r); localHasPersistedData = true }  } catch {}
      try { const r = localStorage.getItem(CAT_BUDGET_KEY); if (r) { localCatBudgets = JSON.parse(r); localHasPersistedData = true } } catch {}
      try {
        const r = localStorage.getItem(CATEGORIES_KEY)
        const p = r ? JSON.parse(r) : []
        if (r) localHasPersistedData = true
        localCategories = mergeExpenseDefaults(p.length > 0 ? p : createDefaultCategories())
      } catch {}
      try { const r = localStorage.getItem(SYNC_META_KEY); if (r) localSyncMeta = JSON.parse(r) } catch {}
      try { const r = localStorage.getItem(SYNC_BASE_KEY); if (r) localBaseState = budgetStateFromData(JSON.parse(r)) } catch {}

      const localState = {
        store: localStore,
        recurring: localRecurring,
        catBudgets: localCatBudgets,
        categories: mergeExpenseDefaults(localCategories),
      }

      try {
        const remote = await budgetApi()
        if (cancelled) return

        const rawRemoteState = budgetStateFromData(remote)
        const remoteHasData = budgetStateHasData(rawRemoteState)
        const remoteState = {
          ...rawRemoteState,
          categories: mergeExpenseDefaults(rawRemoteState.categories.length > 0 ? rawRemoteState.categories : createDefaultCategories()),
        }
        const legacyLocalDifference = !localSyncMeta && localHasPersistedData && !sameStoredValue(localState, remoteState)
        const shouldRecoverLocal = remoteHasData && (Boolean(localSyncMeta?.dirty) || legacyLocalDifference)
        let nextState = remoteHasData
          ? (shouldRecoverLocal ? mergeBudgetStates(remoteState, localState, localBaseState) : remoteState)
          : localState

        setStore(nextState.store)
        setRecurring(nextState.recurring)
        setCatBudgets(nextState.catBudgets)
        setCategories(nextState.categories)
        setSyncStatus('synced')
        remoteWritesEnabled.current = true
        remoteVersion.current = remote.updatedAt || null
        lastRemoteState.current = remoteState
        skipNextRemoteSave.current = true
        didHydrate.current = true
        setLoaded(true)
        persistBudgetState(nextState)

        if (!remoteHasData || shouldRecoverLocal) {
          try {
            setSyncStatus(shouldRecoverLocal ? 'merging' : 'saving')
            let syncedState = nextState
            let saved
            try {
              saved = await budgetApi('PUT', { ...syncedState, expectedUpdatedAt: remoteVersion.current })
            } catch (error) {
              if (error.status !== 409) throw error
              const reconciled = await reconcileBudgetState(syncedState, localBaseState)
              syncedState = reconciled.state
              saved = { updatedAt: reconciled.updatedAt }
            }
            if (cancelled) return
            nextState = syncedState
            setStore(nextState.store)
            setRecurring(nextState.recurring)
            setCatBudgets(nextState.catBudgets)
            setCategories(nextState.categories)
            remoteVersion.current = saved.updatedAt || remoteVersion.current
            lastRemoteState.current = nextState
            persistBudgetState(nextState)
            persistBudgetSyncMeta({ dirty: false, remoteUpdatedAt: remoteVersion.current, baseState: nextState })
            setSyncStatus('synced')
          } catch (err) {
            remoteWritesEnabled.current = false
            persistBudgetSyncMeta({ dirty: true, remoteUpdatedAt: remoteVersion.current, baseState: localBaseState })
            setSyncStatus(err.status === 409 ? 'conflict' : 'offline')
          }
        } else {
          lastRemoteState.current = nextState
          persistBudgetSyncMeta({ dirty: false, remoteUpdatedAt: remoteVersion.current, baseState: nextState })
        }
      } catch (err) {
        if (cancelled) return
        setStore(localStore)
        setRecurring(localRecurring)
        setCatBudgets(localCatBudgets)
        setCategories(localCategories)
        setSyncStatus('offline')
        remoteWritesEnabled.current = false
        remoteVersion.current = null
        lastRemoteState.current = localBaseState
        skipNextRemoteSave.current = true
        didHydrate.current = true
        setLoaded(true)
        persistBudgetState(localState)
        persistBudgetSyncMeta({ dirty: true, remoteUpdatedAt: localSyncMeta?.remoteUpdatedAt, baseState: localBaseState })
      }
    }

    loadBudget()
    return () => { cancelled = true }
  }, [])

  useEffect(() => {
    if (!loaded || !didHydrate.current) return
    const payload = { store, recurring, catBudgets, categories }

    if (skipNextRemoteSave.current) {
      skipNextRemoteSave.current = false
      persistBudgetState(payload)
      return
    }

    persistBudgetState(payload)
    persistBudgetSyncMeta({ dirty: true, remoteUpdatedAt: remoteVersion.current, baseState: lastRemoteState.current })

    if (!remoteWritesEnabled.current) {
      setSyncStatus(current => current === 'conflict' ? current : 'offline')
      return
    }

    setSyncStatus('saving')

    let cancelled = false
    const timer = window.setTimeout(async () => {
      try {
        const saved = await budgetApi('PUT', { ...payload, expectedUpdatedAt: remoteVersion.current })
        if (cancelled) return
        remoteVersion.current = saved.updatedAt || remoteVersion.current
        lastRemoteState.current = payload
        persistBudgetSyncMeta({ dirty: false, remoteUpdatedAt: remoteVersion.current, baseState: payload })
        setSyncStatus('synced')
      } catch (err) {
        if (cancelled) return
        if (err.status === 409) {
          setSyncStatus('merging')
          try {
            const reconciled = await reconcileBudgetState(payload, lastRemoteState.current)
            if (cancelled) return
            remoteVersion.current = reconciled.updatedAt
            lastRemoteState.current = reconciled.state
            remoteWritesEnabled.current = true
            skipNextRemoteSave.current = true
            setStore(reconciled.state.store)
            setRecurring(reconciled.state.recurring)
            setCatBudgets(reconciled.state.catBudgets)
            setCategories(reconciled.state.categories)
            persistBudgetState(reconciled.state)
            persistBudgetSyncMeta({ dirty: false, remoteUpdatedAt: reconciled.updatedAt, baseState: reconciled.state })
            setSyncStatus('synced')
            return
          } catch (mergeError) {
            remoteWritesEnabled.current = false
            persistBudgetSyncMeta({ dirty: true, remoteUpdatedAt: remoteVersion.current, baseState: lastRemoteState.current })
            setSyncStatus(mergeError.status === 409 ? 'conflict' : 'offline')
            return
          }
        }
        remoteWritesEnabled.current = false
        persistBudgetSyncMeta({ dirty: true, remoteUpdatedAt: remoteVersion.current, baseState: lastRemoteState.current })
        setSyncStatus('offline')
      }
    }, 500)

    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
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

  useEffect(() => {
    if (!iranOpenCategory) return
    const closeOnOutsideClick = event => {
      if (iranCategoryPickerRef.current && !iranCategoryPickerRef.current.contains(event.target)) {
        setIranOpenCategory(null)
      }
    }
    const closeOnEscape = event => {
      if (event.key === 'Escape') setIranOpenCategory(null)
    }
    document.addEventListener('mousedown', closeOnOutsideClick)
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('mousedown', closeOnOutsideClick)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [iranOpenCategory])

  // Legacy entries without a start month predate the start-month feature.
  // Preserve every explicitly chosen start date, especially future entries.
  useEffect(() => {
    if (!loaded) return
    setRecurring(prev => {
      const needsMigration = prev.some(r => !r.startMonth)
      if (!needsMigration) return prev
      return prev.map(r => r.startMonth ? r : { ...r, startMonth: '2025-01' })
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

  useEffect(() => {
    if (!showPopup && !catDetail) return
    const opener = document.activeElement
    const oldOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const viewport = window.visualViewport
    const resize = () => document.documentElement.style.setProperty('--finance-dialog-height', `${viewport?.height || window.innerHeight}px`)
    resize()
    viewport?.addEventListener('resize', resize)
    const trapFocus = event => {
      if (event.key !== 'Tab') return
      const dialog = document.querySelector('[data-monthly-dialog]')
      if (!dialog) return
      const controls = [...dialog.querySelectorAll('button, input, select, textarea, summary, [tabindex="0"]')].filter(control => !control.disabled && control.getClientRects().length)
      const first = controls[0], last = controls.at(-1)
      if (!first) return
      if (event.shiftKey && (document.activeElement === first || !dialog.contains(document.activeElement))) { event.preventDefault(); last.focus() }
      if (!event.shiftKey && (document.activeElement === last || !dialog.contains(document.activeElement))) { event.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', trapFocus)
    return () => {
      document.body.style.overflow = oldOverflow
      document.documentElement.style.removeProperty('--finance-dialog-height')
      viewport?.removeEventListener('resize', resize)
      document.removeEventListener('keydown', trapFocus)
      if (opener?.isConnected) opener.focus()
    }
  }, [showPopup, catDetail])

  useEffect(() => {
    if (!entryNotice) return
    const timer = window.setTimeout(() => setEntryNotice(null), 10000)
    return () => window.clearTimeout(timer)
  }, [entryNotice])

  const visibleCategories = useMemo(
    () => excludeVacation ? categories.filter(category => category.name !== 'Ausflug') : categories,
    [categories, excludeVacation]
  )
  const visibleCatBudgets = useMemo(
    () => Object.fromEntries(Object.entries(catBudgets).filter(([name]) => !excludeVacation || name.split(' / ')[0] !== 'Ausflug')),
    [catBudgets, excludeVacation]
  )
  const visibleRecurring = useMemo(
    () => excludeVacation ? recurring.filter(entry => !isVacationEntry(entry)) : recurring,
    [recurring, excludeVacation]
  )
  const monthData = useMemo(
    () => monthWithRecurring(month, store, recurring, excludeVacation),
    [month, store, recurring, excludeVacation]
  )
  const iranTrip = useMemo(() => normalizeIranTrip(store[IRAN_TRIP_KEY]), [store])

  const iranExpenseTotal = useMemo(
    () => iranTrip.expenses.reduce((sum, entry) => sum + Number(entry.amountRial || 0), 0),
    [iranTrip.expenses]
  )
  const iranExpenseTotalEuro = useMemo(
    () => iranTrip.expenses.reduce((sum, entry) => sum + iranExpenseEuroValue(entry, iranTrip.exchangeRate), 0),
    [iranTrip.expenses, iranTrip.exchangeRate]
  )
  const iranAccountExpensesRial = useMemo(
    () => iranTrip.expenses
      .filter(entry => entry.originalCurrency !== 'eur' && (entry.paidBy || 'account') === 'account')
      .reduce((sum, entry) => sum + Number(entry.amountRial || 0), 0),
    [iranTrip.expenses]
  )
  const iranExchangedTotalEuro = useMemo(
    () => iranTrip.exchanges.reduce((sum, entry) => sum + Number(entry.euroAmount || 0), 0),
    [iranTrip.exchanges]
  )
  const iranExchangedTotalRial = useMemo(
    () => iranTrip.exchanges.reduce((sum, entry) => sum + Number(entry.amountRial || 0), 0),
    [iranTrip.exchanges]
  )
  const iranSettlementAccountTotalRial = useMemo(
    () => iranTrip.settlements.reduce((sum, entry) => sum + iranSettlementAccountDelta(entry), 0),
    [iranTrip.settlements]
  )
  const iranAccountRemainingRial = Number(iranTrip.accountBalanceRial || 0)
    + iranExchangedTotalRial
    - iranAccountExpensesRial
    + iranSettlementAccountTotalRial

  const iranCategoryTotals = useMemo(() => IRAN_EXPENSE_CATEGORIES.map(category => {
    const entries = iranTrip.expenses.filter(entry => iranCategoryGroup(entry.category) === category.name)
    return {
      category: category.name,
      icon: category.icon,
      entries,
      total: entries.reduce((sum, entry) => sum + Number(entry.amountRial || 0), 0),
      totalEuro: entries.reduce((sum, entry) => sum + iranExpenseEuroValue(entry, iranTrip.exchangeRate), 0),
    }
  }).filter(item => item.total > 0), [iranTrip.expenses, iranTrip.exchangeRate])

  const iranCategoryChartMax = Math.max(1, ...iranCategoryTotals.map(item => (
    iranTrip.displayCurrency === 'eur' ? item.totalEuro : item.total
  )))

  const iranSettlementBalances = useMemo(() => IRAN_SETTLEMENT_PEOPLE.map(person => {
    const openingEntries = IRAN_INITIAL_SETTLEMENTS_RIAL[person]
      ? [{
          id: `opening-${person}`,
          isOpeningBalance: true,
          direction: 'receive',
          amountRial: IRAN_INITIAL_SETTLEMENTS_RIAL[person],
          note: 'Anfangsforderung',
        }]
      : []
    const settlementEntries = iranTrip.settlements.filter(entry => entry.person === person)
    const expenseEntries = iranTrip.expenses
      .filter(entry => entry.originalCurrency !== 'eur' && entry.paidBy === person)
      .map(entry => ({
        id: `expense-${entry.id}`,
        expenseId: entry.id,
        direction: 'pay',
        amountRial: entry.amountRial,
        note: entry.description || entry.category,
        date: entry.date,
      }))
    const entries = [...openingEntries, ...expenseEntries, ...settlementEntries]
    const openingBalance = openingEntries.reduce((sum, entry) => sum + Number(entry.amountRial || 0), 0)
    const expenseBalance = expenseEntries.reduce((sum, entry) => sum - Number(entry.amountRial || 0), 0)
    const settlementBalance = settlementEntries.reduce((sum, entry) => sum + iranSettlementBalanceDelta(entry), 0)
    const balance = openingBalance + expenseBalance + settlementBalance
    return { person, balance, entries }
  }), [iranTrip.settlements, iranTrip.expenses])

  function updateIranTrip(updater) {
    setStore(prev => ({
      ...prev,
      [IRAN_TRIP_KEY]: updater(normalizeIranTrip(prev[IRAN_TRIP_KEY])),
    }))
  }

  function iranDisplayAmount(amountRial) {
    const rateToman = Number(iranTrip.exchangeRate || 0)
    if (iranTrip.displayCurrency === 'eur') {
      return rateToman > 0 ? formatMoney(Number(amountRial || 0) / 10 / rateToman) : 'Kurs fehlt'
    }
    return formatTomanFromRial(amountRial)
  }

  function iranBalanceDisplayAmount(amountRial) {
    const rateToman = Number(iranTrip.exchangeRate || 0)
    if (iranTrip.displayCurrency === 'eur') {
      return rateToman > 0 ? formatMoney(Number(amountRial || 0) / 10 / rateToman) : 'Kurs fehlt'
    }
    return formatTomanFromRial(amountRial)
  }

  function iranExpenseDisplayAmount(entry) {
    return iranTrip.displayCurrency === 'eur'
      ? formatMoney(iranExpenseEuroValue(entry, iranTrip.exchangeRate))
      : formatTomanFromRial(entry.amountRial)
  }

  function saveIranExpense(event) {
    event.preventDefault()
    const inputCurrency = iranExpenseForm.currency === 'eur' ? 'eur' : 'toman'
    const enteredAmount = inputCurrency === 'eur' ? Number(iranExpenseForm.amount) : parseTomanInput(iranExpenseForm.amount)
    const rateToman = Number(iranExpenseForm.exchangeRate || iranTrip.exchangeRate || 0)
    if (!enteredAmount || !iranExpenseForm.category || rateToman <= 0) return
    const originalAmount = enteredAmount
    const amountRial = Math.round((inputCurrency === 'eur' ? enteredAmount * rateToman : originalAmount) * 10)
    const entry = {
      category: iranExpenseForm.category,
      amountRial,
      originalAmount,
      originalCurrency: inputCurrency,
      paidBy: inputCurrency === 'toman' ? iranExpenseForm.paidBy : 'external',
      exchangeRateAtEntry: rateToman,
      exchangeRateAtEntryToman: rateToman,
      exchangeRateUnit: 'toman',
      amountEuroAtEntry: inputCurrency === 'eur' ? enteredAmount : amountRial / 10 / rateToman,
      description: iranExpenseForm.description.trim(),
      date: iranExpenseForm.date || getDateKey(),
    }
    updateIranTrip(current => ({
      ...current,
      expenses: editingIranExpenseId
        ? current.expenses.map(currentEntry => currentEntry.id === editingIranExpenseId ? { ...currentEntry, ...entry } : currentEntry)
        : [{ id: makeId(), ...entry }, ...current.expenses],
    }))
    setEditingIranExpenseId(null)
    setIranExpenseForm(prev => ({ ...prev, amount: '', exchangeRate: '', description: '' }))
  }

  function editIranExpense(entry) {
    const inputCurrency = entry.originalCurrency === 'eur' ? 'eur' : 'toman'
    const originalAmount = Number(entry.originalAmount || 0)
    const storedRate = Number(entry.exchangeRateAtEntryToman || 0) || (
      Number(entry.exchangeRateAtEntry || 0) > 0
        ? (entry.exchangeRateUnit === 'toman' ? Number(entry.exchangeRateAtEntry) : Number(entry.exchangeRateAtEntry) / 10)
        : Number(iranTrip.exchangeRate || 0)
    )

    setEditingIranExpenseId(entry.id)
    setIranExpenseForm({
      category: entry.category || iranCategoryValue(IRAN_EXPENSE_CATEGORIES[0].name, IRAN_EXPENSE_CATEGORIES[0].subs[0]),
      currency: inputCurrency,
      paidBy: inputCurrency === 'toman' ? (entry.paidBy || 'account') : 'external',
      amount: inputCurrency === 'eur'
        ? String(originalAmount || iranExpenseEuroValue(entry, iranTrip.exchangeRate))
        : formatTomanInput(originalAmount || Number(entry.amountRial || 0) / 10),
      exchangeRate: storedRate > 0 ? String(storedRate) : '',
      description: entry.description || '',
      date: entry.date || getDateKey(),
    })
    setIranOpenCategory(null)
    window.requestAnimationFrame(() => iranExpenseCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }

  function cancelIranExpenseEdit() {
    setEditingIranExpenseId(null)
    setIranOpenCategory(null)
    setIranExpenseForm(prev => ({ ...prev, amount: '', exchangeRate: '', description: '' }))
  }

  function addIranSettlement(event) {
    event.preventDefault()
    const enteredAmount = parseTomanInput(iranSettlementForm.amount)
    if (!enteredAmount || !iranSettlementForm.person) return
    const amountRial = Math.round(iranSettlementForm.currency === 'rial' ? enteredAmount : enteredAmount * 10)
    const entry = {
      id: makeId(),
      person: iranSettlementForm.person,
      direction: iranSettlementForm.direction,
      amountRial,
      originalAmount: enteredAmount,
      originalCurrency: iranSettlementForm.currency,
      note: iranSettlementForm.note.trim(),
      date: iranSettlementForm.date || getDateKey(),
    }
    updateIranTrip(current => ({ ...current, settlements: [entry, ...current.settlements] }))
    setIranSettlementForm(prev => ({ ...prev, amount: '', note: '' }))
  }

  function addIranExchange(event) {
    event.preventDefault()
    const euroAmount = Number(iranExchangeForm.euroAmount || 0)
    const exchangeRateToman = Number(iranExchangeForm.exchangeRate || iranTrip.exchangeRate || 0)
    if (euroAmount <= 0 || exchangeRateToman <= 0) return
    const entry = {
      id: makeId(),
      euroAmount,
      exchangeRateToman,
      amountRial: Math.round(euroAmount * exchangeRateToman * 10),
      date: iranExchangeForm.date || getDateKey(),
    }
    updateIranTrip(current => ({ ...current, exchanges: [entry, ...current.exchanges] }))
    setIranExchangeForm(prev => ({ ...prev, euroAmount: '', exchangeRate: '' }))
  }

  function deleteIranExpense(id) {
    updateIranTrip(current => ({ ...current, expenses: current.expenses.filter(entry => entry.id !== id) }))
    if (editingIranExpenseId === id) cancelIranExpenseEdit()
  }

  function deleteIranSettlement(id) {
    updateIranTrip(current => ({ ...current, settlements: current.settlements.filter(entry => entry.id !== id) }))
  }

  function deleteIranExchange(id) {
    updateIranTrip(current => ({ ...current, exchanges: current.exchanges.filter(entry => entry.id !== id) }))
  }

  const totalCatBudget = useMemo(() => {
    return visibleCategories
      .filter(category => category.type === 'expense')
      .reduce((sum, category) => sum + categoryLimit(visibleCatBudgets, category.name), 0)
  }, [visibleCatBudgets, visibleCategories])

  const monthlyAnalytics = useMemo(() => buildMonthlyAnalytics({
    month, entries: monthData.entries,
    previousEntries: monthWithRecurring(shiftMonth(month, -1), store, recurring, excludeVacation).entries,
    categories: visibleCategories, budgets: visibleCatBudgets,
  }), [month, monthData.entries, store, recurring, excludeVacation, visibleCategories, visibleCatBudgets])

  const financeHistory = useMemo(() => Array.from({ length: 6 }, (_, index) => {
    const key = shiftMonth(month, index - 5)
    const data = monthWithRecurring(key, store, recurring, excludeVacation)
    return { key, ...entryTotals(data.entries) }
  }), [month, store, recurring, excludeVacation])

  const financeAnnualData = useMemo(() => Array.from({ length: 12 }, (_, index) => {
    const key = `${month.slice(0, 4)}-${String(index + 1).padStart(2, '0')}`
    const data = key <= getMonthKey() ? monthWithRecurring(key, store, recurring, excludeVacation) : withoutVacationEntries(store[key] || emptyMonth(), excludeVacation)
    return { key, ...entryTotals(data.entries) }
  }), [month, store, recurring, excludeVacation])

  const getReportMonthEntries = useCallback(key => {
    const data = key <= getMonthKey() ? monthWithRecurring(key, store, recurring, excludeVacation) : withoutVacationEntries(store[key] || emptyMonth(), excludeVacation)
    return data.entries
  }, [store, recurring, excludeVacation])

  const frequentCategories = useMemo(() => {
    const counts = new Map()
    Object.values(store).forEach(data => (data?.entries || []).forEach(entry => {
      if (entry.type === entryType) {
        const category = primaryCategory(entry, visibleCategories)
        counts.set(category, (counts.get(category) || 0) + 1)
      }
    }))
    return [...counts].sort((a, b) => b[1] - a[1]).map(([name]) => name)
  }, [store, entryType, visibleCategories])

  const entryTitle = useMemo(() => {
    if (entryType === 'income' && incomeSourceMode === 'other') return otherIncomeName.trim()
    if (selectedItems[0]?.subName) return selectedItems[0].subName
    if (editingBooking && entryType === editingBooking.entry.type && selectedItems[0]?.catName === primaryCategory(editingBooking.entry, visibleCategories)) return editingBooking.entry.title
    return selectedItems[0]?.catName || ''
  }, [entryType, incomeSourceMode, otherIncomeName, selectedItems, editingBooking, visibleCategories])

  const entryCatNames = useMemo(() => (
    entryType === 'income' && incomeSourceMode === 'other'
      ? ['Andere']
      : [...new Set(selectedItems.map(i => i.catName))]
  ), [entryType, incomeSourceMode, selectedItems])

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

  const currentMonthKey = getMonthKey()
  const totalFixkosten = visibleRecurring
    .filter(r => r.type === 'expense' && monthIsOnOrAfter(currentMonthKey, r.startMonth))
    .reduce((sum, item) => sum + recurringAmountForMonth(item, currentMonthKey), 0)

  const catDetailEntries = useMemo(() => {
    if (!catDetail) return []
    const { type, key } = catDetail
    if (type === 'income') {
      return monthData.entries.filter(e =>
        e.type === 'income' &&
        (e.title === key || (key === 'Kindergeld' && e.title === 'Familienkasse'))
      )
    }
    return monthData.entries.filter(e => {
      if (e.type !== 'expense') return false
      return primaryCategory(e, visibleCategories) === key
    })
  }, [catDetail, monthData.entries, visibleCategories])

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
    setEntryErrors({})
    setEditingBooking(null)
    setSelectedItems([])
    setEntryScope(null)
    setIncomeSourceMode('standard')
    setOtherIncomeName('')
    setExpandedCats(initialExpandedForType(type))
    setEntryAmount('')
    setPaidByFatima(false)
    setEntryDescription('')
    const todayKey = getMonthKey()
    setEntryDate(month === todayKey
      ? getDateKey()
      : `${month}-01`)
    setShowPopup(true)
  }

  function openPopupFromDetail() {
    if (!catDetail) return
    const detail = catDetail
    const category = categories.find(cat => (
      cat.type === detail.type && (cat.name === detail.key || cat.subs.some(sub => sub.name === detail.key))
    ))
    openPopup(detail.type)
    if (category) {
      const sub = category.subs.find(item => item.name === detail.key)
      setEntryScope({ catId: category.id, catName: category.name, subId: sub?.id || null, subName: sub?.name || null })
      setSelectedItems([{ catId: category.id, catName: category.name, subId: sub?.id || null, subName: sub?.name || null }])
    } else if (detail.type === 'income') {
      setIncomeSourceMode('other')
      setOtherIncomeName(detail.key)
    }
  }

  function openPopupForSub(subName) {
    if (!catDetail) return
    const category = categories.find(cat => cat.type === catDetail.type && cat.name === catDetail.key)
    openPopup(catDetail.type)
    if (category) {
      const sub = category.subs.find(s => s.name === subName)
      setEntryScope({ catId: category.id, catName: category.name, subId: sub?.id || null, subName: sub?.name || null })
      if (sub) {
        setSelectedItems([{ catId: category.id, catName: category.name, subId: sub.id, subName: sub.name }])
      } else {
        setSelectedItems([{ catId: category.id, catName: category.name, subId: null, subName: null }])
      }
    }
  }

  function closePopup() { setShowPopup(false); setPaidByFatima(false) }

  function chooseEntryItem(catId, catName, subId, subName) {
    setSelectedItems(prev => [{ catId, catName, subId, subName }, ...prev.slice(1).filter(item => item.catId !== catId)])
    setEntryErrors(prev => ({ ...prev, category: undefined }))
  }

  function editBooking(entry) {
    if (entry.generatedRecurring) { setView('budgets'); return }
    openPopup(entry.type)
    setEditingBooking({ entry, month: entry.date?.slice(0, 7) || month })
    setEntryAmount(String(entry.amount).replace('.', ','))
    setEntryDate(entry.date || `${month}-01`)
    setEntryDescription(entry.description || '')
    setPaidByFatima(Boolean(entry.paidByFatima))
    const names = [...new Set([primaryCategory(entry, visibleCategories), ...(entry.tags || [])])]
    const selection = names.map(name => {
      const category = visibleCategories.find(item => item.name === name && item.type === entry.type)
      if (!category) return null
      const sub = category.subs.find(item => item.name === (entry.catSubtitles?.[name] || entry.title))
      return { catId: category.id, catName: category.name, subId: sub?.id || null, subName: sub?.name || null }
    }).filter(Boolean)
    setSelectedItems(selection)
    if (entry.type === 'income' && (!selection.length || !selection[0].subName)) {
      setIncomeSourceMode('other')
      setOtherIncomeName(entry.title)
    }
  }

  function undoEntry() {
    if (!entryNotice) return
    const { id, targetKey, previous } = entryNotice
    setStore(prev => {
      const next = { ...prev, [targetKey]: { ...prev[targetKey], entries: (prev[targetKey]?.entries || []).filter(entry => entry.id !== id) } }
      if (previous) {
        const source = next[previous.month] || emptyMonth()
        next[previous.month] = { ...source, entries: [previous.entry, ...source.entries.filter(entry => entry.id !== id)] }
      }
      return next
    })
    setEntryNotice(null)
  }

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

  function handleTypeChange(newType) {
    setEntryErrors({})
    setEntryType(newType)
    setSelectedItems([])
    setIncomeSourceMode('standard')
    setOtherIncomeName('')
    setExpandedCats(initialExpandedForType(newType))
  }

  function handleIncomeSourceModeChange(mode) {
    setIncomeSourceMode(mode)
    setSelectedItems([])
    setExpandedCats(mode === 'standard' ? initialExpandedForType('income') : new Set())
    if (mode === 'standard') setOtherIncomeName('')
  }

  function addEntry(e) {
    e.preventDefault()
    const amount = parseEuroAmount(entryAmount)
    const errors = {}
    if (amount === null) errors.amount = 'Bitte einen Betrag größer als 0 mit höchstens zwei Nachkommastellen eingeben.'
    if (!entryTitle) errors.category = entryType === 'income' && incomeSourceMode === 'other' ? 'Bitte die Einkommensquelle benennen.' : 'Bitte eine Kategorie auswählen.'
    if (!validEntryDate(entryDate)) errors.date = 'Bitte ein gültiges Datum auswählen.'
    setEntryErrors(errors)
    if (Object.keys(errors).length) return
    const date = entryDate
    const targetKey = date.slice(0, 7)
    // Für jede gewählte Kategorie den richtigen Untertitel merken
    // z.B. { Mobin: 'Kleidung', Kleidung: 'Ernstings Family' }
    const catSubtitles = {}
    selectedItems.forEach(item => {
      catSubtitles[item.catName] = item.subName || item.catName
    })
    const id = editingBooking?.entry.id || makeId()
    const savedEntry = {
      ...(editingBooking?.entry || {}),
      id, type: entryType, amount, title: entryTitle,
      subtitle: entryCatNames.join(' · '), category: entryCatNames[0] || '', tags: entryCatNames,
      catSubtitles, date, description: entryDescription.trim(),
      paidByFatima: entryType === 'expense' && paidByFatima,
    }
    setStore(prev => {
      const next = { ...prev }
      if (editingBooking) {
        const source = next[editingBooking.month] || emptyMonth()
        next[editingBooking.month] = { ...source, entries: source.entries.filter(entry => entry.id !== id) }
      }
      const cur = next[targetKey] || emptyMonth()
      return {
        ...next,
        [targetKey]: {
          ...cur,
          entries: [savedEntry, ...cur.entries],
        },
      }
    })
    setMonth(targetKey)
    setEntryNotice({ id, targetKey, previous: editingBooking, message: `${editingBooking ? 'Buchung aktualisiert' : entryType === 'income' ? 'Einkommen erfasst' : 'Ausgabe erfasst'} · ${money(amount)}` })
    if (e.nativeEvent.submitter?.value === 'continue' && !editingBooking) {
      setEntryAmount('')
      setEntryDescription('')
      document.getElementById('finance-amount')?.focus()
    } else closePopup()
  }

  function deleteEntry(id) {
    if (String(id).startsWith('recurring:')) {
      const recurringId = String(id).split(':')[1]
      if (recurringId) removeFixeintrag(recurringId)
      return
    }
    updateMonth(c => ({ ...c, entries: c.entries.filter(i => i.id !== id) }))
  }

  function savePlanBudget() {
    const amount = parseEuroAmount(planAmount)
    if (amount === null || !planBudgetKey) { setPlanError('Bitte Kategorie und einen gültigen Betrag größer als 0 eingeben.'); return }
    setPlanError('')
    setCatBudgets(prev => {
      const next = { ...prev, [planBudgetKey]: amount }
      if (!planSelectedItems[0]?.subId) delete next[planCatNames[0]]
      return next
    })
    setPlanAmount('')
  }

  function addFixeintrag() {
    const amount = parseEuroAmount(planAmount)
    if (amount === null || !planTitle || !validEntryDate(`${planStartMonth}-01`)) { setPlanError('Bitte Kategorie, gültigen Betrag und Startmonat auswählen.'); return }
    setPlanError('')
    setRecurring(prev => [...prev, {
      id: makeId(),
      type: 'expense',
      title: planTitle,
      amount,
      category: planCatNames[0] || '',
      budgetKey: planBudgetKey,
      startMonth: planStartMonth,
      dayOfMonth: '1',
    }])
    setPlanAmount('')
  }

  function beginFixeintragEdit(item) {
    setEditingRecurringId(item.id)
    setRecurringEditAmount(String(recurringAmountForMonth(item, currentMonthKey) || ''))
    setRecurringEditStartMonth(currentMonthKey)
  }

  function cancelFixeintragEdit() {
    setEditingRecurringId(null)
    setRecurringEditAmount('')
    setRecurringEditStartMonth(currentMonthKey)
  }

  function saveFixeintragEdit() {
    const amount = parseEuroAmount(recurringEditAmount)
    if (!editingRecurringId || amount === null || !validEntryDate(`${recurringEditStartMonth}-01`)) return
    setRecurring(prev => prev.map(item => (
      item.id === editingRecurringId
        ? withRecurringAmountChange(item, amount, recurringEditStartMonth)
        : item
    )))
    cancelFixeintragEdit()
  }

  function removeFixeintrag(id) {
    setRecurring(prev => prev.filter(r => r.id !== id))
    if (editingRecurringId === id) cancelFixeintragEdit()
  }

  function goToMonth(key) { setMonth(key); setView('monat') }
  function navEinstellung(sub) { setView('einstellung'); setSubView(sub) }

  function seedMai2026() {
    if (!window.confirm('Mai 2026 Ausgaben eintragen? Bereits vorhandene Einträge bleiben erhalten.')) return
    const mk = id => `seed-mai-${Date.now()}-${Math.random().toString(36).slice(2, 6)}-${id}`
    const e = (category, title, amount, sub) => ({
      id: mk(title), type: 'expense', amount, title,
      subtitle: category, category, tags: [category],
      catSubtitles: sub ? { [category]: sub } : undefined,
      date: '2026-05-01',
    })
    const entries = [
      // Lebensmittel
      e('Lebensmittel','Aldi',72), e('Lebensmittel','Lidl',446),
      e('Lebensmittel','Bonus',42), e('Lebensmittel','Edeka/Rewe/Netto',5),
      e('Lebensmittel','DM',96), e('Lebensmittel','Türkei',113),
      // Kleidung
      e('Kleidung','Takko',42), e('Kleidung','Deichman',84),
      // Restaurant
      e('Restaurant','Essen',108), e('Restaurant','Krankenhaus',52),
      // Auto (ohne Leasing)
      e('Auto','Tanken',156), e('Auto','Parken',18), e('Auto','Bus-Ticket',62),
      // Zu Hause (ohne Miete, Darlehen, Internet, Netflix)
      e('Zu Hause','Strom',91), e('Zu Hause','Haushaltgerät',19),
      // Jamin (ohne Konto, Gothaer)
      e('Jamin','Kleidung',90), e('Jamin','Sonst',98),
      // Fatima (ohne Iphone 16)
      e('Fatima','Gift',95), e('Fatima','Kleidung',201), e('Fatima','Medikamente',383),
      // Mobin (ohne Schule, Bus-Ticket, SIM-Karte)
      e('Mobin','Taschengeld',18), e('Mobin','Kleidung',165), e('Mobin','Sonst',15),
      // Mobina (ohne Kindergarten)
      e('Mobina','Kleidung',77), e('Mobina','Sport',61),
      // Meine Eltern
      e('Meine Eltern','Apotheke/Versicherung',81,'Apotheke/Versicherung'),
      e('Meine Eltern','Sonst',535,'Sonst'),
      e('Meine Eltern','Flugticket',260,'Flugticket'),
      // Fatima Eltern
      e('Fatima Eltern','Apotheke',56,'Apotheke'),
      // Moschee (Nazri leer diesen Monat)
      e('Moschee','Iran',180,'Iran'),
      // Ausflug
      e('Ausflug','Aufenthalt',158), e('Ausflug','Transport',112),
      e('Ausflug','Essen',91), e('Ausflug','Ticket',77),
    ]
    setStore(prev => {
      const cur = prev['2026-05'] || { entries: [] }
      const alreadyDone = cur.entries.some(x => String(x.id).startsWith('seed-mai-'))
      if (alreadyDone) { alert('Einträge für Mai 2026 sind bereits vorhanden.'); return prev }
      return { ...prev, '2026-05': { ...cur, entries: [...entries, ...cur.entries] } }
    })
    setMonth('2026-05')
    setView('monat')
  }

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
    const amount = parseEuroAmount(newAmount)
    if (amount === null) return
    updateMonth(c => ({ ...c, entries: c.entries.map(e => e.id === id ? { ...e, amount } : e) }))
    setEditingEntry(null)
  }

  const isIncome = entryType === 'income'
  const popupAccent = isIncome ? '#16a34a' : '#f97316'

  return (
    <div className={`${styles.page} ${!iranOnly ? styles.monthlyWorkspace : ''}`}>
      <main className={styles.content}>

        {/* ── HEADER ── */}
        {homeHref && (
          <Link className={styles.financeBackLink} href={homeHref}>
            ← {homeLabel || 'Zurück'}
          </Link>
        )}
        {!iranOnly && <div className={styles.financeHeader}>
          <div className={styles.financeHeroCopy}>
            <h1 className={styles.title}>Monatliche Ausgaben</h1>
            <p className={styles.financeHeroText}>Dein Monat. Deine Ausgaben. Klar im Blick.</p>
            <FinanceSyncStatus status={syncStatus} />
          </div>
          <div className={financeStyles.headerActions}>
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
          <button className={financeStyles.primary} type="button" onClick={() => openPopup('expense')}><FinanceIcon name="plus" />Ausgabe hinzufügen</button>
          </div>
        </div>}

        {!iranOnly && <>
          <nav className={financeStyles.workspaceNav} aria-label="Finanzbereiche">
            {[['monat', 'Übersicht', 'home'], ['buchungen', 'Buchungen', 'receipt'], ['budgets', 'Budgets', 'wallet'], ['berichte', 'Berichte', 'chart'], ['einstellung', 'Einstellungen', 'settings']].map(([id, label, icon]) => <button type="button" key={id} aria-current={view === id ? 'page' : undefined} onClick={() => { setView(id); if (id === 'einstellung') setSubView('kategorien') }}><FinanceIcon name={icon} size={18} />{label}</button>)}
          </nav>
          <FinanceMetrics analytics={monthlyAnalytics} onAddIncome={() => openPopup('income')} />
        </>}

        {/* ── LAYOUT ── */}
        <div className={iranOnly ? styles.iranAppLayout : styles.financeLayout}>


          <div className={styles.financeMain}>



            {/* ── MONATSÜBERSICHT ── */}
            {!iranOnly && ['monat', 'buchungen', 'berichte'].includes(view) && <MonthlyFinance view={view} analytics={monthlyAnalytics} entries={monthData.entries} categories={visibleCategories} history={financeHistory} annualData={financeAnnualData} onCategory={openCatDetail} onEdit={editBooking} onView={setView} onPrint={() => window.print()} getMonthEntries={getReportMonthEntries} onMonth={goToMonth} />}
            {/* ── SONDERURLAUB IRAN ── */}
            {view === 'iranurlaub' && (
              <div className={styles.iranTripView}>
                <section className={styles.iranTripHero}>
                  <div>
                    <span className={styles.iranTripEyebrow}>Reisekasse</span>
                    <h2>Iran August</h2>
                    <p className={styles.iranTripDates}>31.07.2026 – 23.08.2026 · 24 Tage</p>
                    <p>Ausgaben direkt in Toman erfassen und jederzeit in Euro ansehen.</p>
                  </div>
                  <div className={styles.iranTripHeroStats}>
                    <div className={styles.iranCurrencySwitch} aria-label="Anzeigewährung">
                      <button type="button" className={iranTrip.displayCurrency === 'toman' ? styles.iranCurrencyActive : ''} onClick={() => updateIranTrip(current => ({ ...current, displayCurrency: 'toman' }))}>Toman</button>
                      <button type="button" className={iranTrip.displayCurrency === 'eur' ? styles.iranCurrencyActive : ''} onClick={() => updateIranTrip(current => ({ ...current, displayCurrency: 'eur' }))}>Euro</button>
                    </div>
                    <div className={styles.iranTripSummaryRow}>
                      <div className={styles.iranAccountBalance}>
                        <span>Kontostand Iran</span>
                        <strong className={iranAccountRemainingRial < 0 ? styles.iranAccountBalanceNegative : ''}>{iranBalanceDisplayAmount(iranAccountRemainingRial)}</strong>
                        <small>{formatIranRial(iranAccountRemainingRial)}</small>
                      </div>
                      <div className={styles.iranTripTotal}>
                        <span>Gesamtausgaben</span>
                        <strong>{iranTrip.displayCurrency === 'eur' ? formatMoney(iranExpenseTotalEuro) : formatTomanFromRial(iranExpenseTotal)}</strong>
                      </div>
                      <div className={styles.iranTripTotal}>
                        <span>Euro gewechselt</span>
                        <strong>{iranTrip.displayCurrency === 'eur' ? formatMoney(iranExchangedTotalEuro) : formatTomanFromRial(iranExchangedTotalRial)}</strong>
                      </div>
                    </div>
                  </div>
                </section>

                <div className={styles.iranTripWorkspace}>
                  <section className={`${styles.iranTripCard} ${styles.iranExpenseCard}`} ref={iranExpenseCardRef}>
                    <header className={styles.iranTripCardHead}>
                      <b>01</b>
                      <div>
                        <span>{editingIranExpenseId ? 'Ausgabe bearbeiten' : 'Ausgaben erfassen'}</span>
                        <h3>{editingIranExpenseId ? 'Reisekosten aktualisieren' : 'Neue Reisekosten'}</h3>
                      </div>
                    </header>
                    <form className={styles.iranTripForm} onSubmit={saveIranExpense}>
                      <fieldset className={styles.iranCategoryPicker} ref={iranCategoryPickerRef}>
                        <legend>Kategorie</legend>
                        <div className={styles.iranCategoryChoices}>
                          {IRAN_EXPENSE_CATEGORIES.map(category => {
                            const groupActive = iranCategoryGroup(iranExpenseForm.category) === category.name
                            return (
                              <div className={`${styles.iranCategoryChoice} ${groupActive ? styles.iranCategoryChoiceActive : ''} ${iranOpenCategory === category.name ? styles.iranCategoryChoiceOpen : ''}`} key={category.name}>
                                <button
                                  type="button"
                                  className={styles.iranCategoryChoiceHead}
                                  aria-pressed={category.subs.length === 0 && groupActive}
                                  aria-expanded={category.subs.length > 0 ? iranOpenCategory === category.name : undefined}
                                  onClick={() => {
                                    if (category.subs.length > 0) {
                                      setIranOpenCategory(current => current === category.name ? null : category.name)
                                    } else {
                                      setIranExpenseForm(prev => ({ ...prev, category: category.name }))
                                      setIranOpenCategory(null)
                                    }
                                  }}
                                >
                                  <span className={styles.iranCategoryIcon}><IranCategoryIcon type={category.icon} /></span>
                                  <span>{category.name}</span>
                                  {groupActive && <span className={styles.iranCategoryCheck}>✓</span>}
                                </button>
                                {iranOpenCategory === category.name && category.subs.length > 0 && (
                                  <div className={styles.iranCategorySubs} role="group" aria-label={`Unterkategorie für ${category.name}`}>
                                    {category.subs.map(sub => {
                                      const value = iranCategoryValue(category.name, sub)
                                      return (
                                        <button
                                          type="button"
                                          key={sub}
                                          className={iranExpenseForm.category === value ? styles.iranCategorySubActive : ''}
                                          aria-pressed={iranExpenseForm.category === value}
                                          onClick={() => {
                                            setIranExpenseForm(prev => ({ ...prev, category: value }))
                                            setIranOpenCategory(null)
                                          }}
                                        >{sub}</button>
                                      )
                                    })}
                                  </div>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      </fieldset>
                      <div className={styles.iranAmountField}>
                        <div className={styles.iranAmountFieldHead}>
                          <span>Betrag</span>
                          <div className={styles.iranAmountCurrencySwitch} aria-label="Eingabewährung">
                            <button type="button" className={iranExpenseForm.currency === 'toman' ? styles.iranAmountCurrencyActive : ''} aria-pressed={iranExpenseForm.currency === 'toman'} onClick={() => setIranExpenseForm(prev => ({ ...prev, currency: 'toman', amount: '' }))}>Toman</button>
                            <button type="button" className={iranExpenseForm.currency === 'eur' ? styles.iranAmountCurrencyActive : ''} aria-pressed={iranExpenseForm.currency === 'eur'} onClick={() => setIranExpenseForm(prev => ({ ...prev, currency: 'eur', amount: '' }))}>Euro</button>
                          </div>
                        </div>
                        <div className={styles.iranAmountInput}>
                          <input
                            type={iranExpenseForm.currency === 'eur' ? 'number' : 'text'}
                            min={iranExpenseForm.currency === 'eur' ? '0.01' : undefined}
                            step={iranExpenseForm.currency === 'eur' ? '0.01' : undefined}
                            inputMode={iranExpenseForm.currency === 'eur' ? 'decimal' : 'numeric'}
                            value={iranExpenseForm.amount}
                            onChange={event => setIranExpenseForm(prev => ({ ...prev, amount: prev.currency === 'eur' ? event.target.value : formatTomanInput(event.target.value) }))}
                            placeholder={iranExpenseForm.currency === 'eur' ? '0,00' : '10,000'}
                            required
                          />
                          <strong>{iranExpenseForm.currency === 'eur' ? '€' : 'T'}</strong>
                        </div>
                        {iranExpenseForm.currency === 'eur' ? (
                          Number(iranExpenseForm.exchangeRate || iranTrip.exchangeRate || 0) > 0
                            ? <small>Wird beim Speichern zu {formatTomanFromRial(Number(iranExpenseForm.amount || 0) * Number(iranExpenseForm.exchangeRate || iranTrip.exchangeRate) * 10)} umgerechnet.</small>
                            : <small className={styles.iranRateWarning}>Bitte einen Wechselkurs für diese Ausgabe eintragen.</small>
                        ) : <small>Betrag direkt in Toman eingeben.</small>}
                      </div>
                      {iranExpenseForm.currency === 'toman' && (
                        <label>
                          Bezahlt über
                          <select value={iranExpenseForm.paidBy} onChange={event => setIranExpenseForm(prev => ({ ...prev, paidBy: event.target.value }))}>
                            {IRAN_EXPENSE_PAYERS.map(payer => <option key={payer.value} value={payer.value}>{payer.label}</option>)}
                          </select>
                          <small>
                            {iranExpenseForm.paidBy === 'account'
                              ? 'Wird vom Iran-Kontostand abgezogen.'
                              : `Wird bei ${iranPersonLabel(iranExpenseForm.paidBy)} als offener Betrag angezeigt.`}
                          </small>
                        </label>
                      )}
                      <label>
                        Kurs dieser Ausgabe
                        <div className={styles.iranLockedRateInput}>
                          <input
                            type="number"
                            min="1"
                            step="1"
                            inputMode="numeric"
                            value={iranExpenseForm.exchangeRate}
                            onChange={event => setIranExpenseForm(prev => ({ ...prev, exchangeRate: event.target.value }))}
                            placeholder={iranTrip.exchangeRate || 'z. B. 200.000'}
                            required={!iranTrip.exchangeRate}
                          />
                          <strong>T / €</strong>
                        </div>
                        <small>Dieser Kurs wird für den Eintrag fest gespeichert.</small>
                      </label>
                      <label>
                        Datum
                        <input type="date" value={iranExpenseForm.date} onChange={event => setIranExpenseForm(prev => ({ ...prev, date: event.target.value }))} />
                      </label>
                      <label className={styles.iranTripWideField}>
                        Beschreibung
                        <input value={iranExpenseForm.description} onChange={event => setIranExpenseForm(prev => ({ ...prev, description: event.target.value }))} placeholder="Optional" />
                      </label>
                      <div className={styles.iranExpenseFormActions}>
                        <button className={styles.iranPrimaryBtn} type="submit" disabled={!iranExpenseForm.amount || Number(iranExpenseForm.exchangeRate || iranTrip.exchangeRate || 0) <= 0}>
                          {editingIranExpenseId ? 'Änderungen speichern' : 'Ausgabe speichern'}
                        </button>
                        {editingIranExpenseId && <button className={styles.iranSecondaryBtn} type="button" onClick={cancelIranExpenseEdit}>Abbrechen</button>}
                      </div>
                    </form>
                  </section>

                  <aside className={styles.iranTripSidebar}>
                    <section className={styles.iranExchangeCard}>
                      <header className={styles.iranCompactCardHead}><b>02</b><div><span>Umrechnung</span><h3>Standardkurs</h3></div></header>
                      <label>
                        <span>Euro in Toman</span>
                        <div className={styles.iranRateInput}>
                          <em>1 € =</em>
                          <input
                            type="number"
                            min="1"
                            step="1"
                            inputMode="numeric"
                            value={iranTrip.exchangeRate}
                            onChange={event => updateIranTrip(current => ({ ...current, exchangeRate: event.target.value }))}
                            placeholder="z. B. 200.000"
                            aria-label="Toman pro Euro"
                          />
                          <em>T</em>
                        </div>
                        <small>Nur neue Ausgaben übernehmen diesen Kurs.</small>
                      </label>
                      <form className={styles.iranMoneyExchangeForm} onSubmit={addIranExchange}>
                        <div className={styles.iranExchangeFormTitle}>
                          <strong>Euro gewechselt</strong>
                          <small>Der verwendete Kurs wird fest gespeichert.</small>
                        </div>
                        <label>
                          Eurobetrag
                          <div className={styles.iranLockedRateInput}>
                            <input type="number" min="0.01" step="0.01" inputMode="decimal" value={iranExchangeForm.euroAmount} onChange={event => setIranExchangeForm(prev => ({ ...prev, euroAmount: event.target.value }))} placeholder="0,00" required />
                            <strong>€</strong>
                          </div>
                        </label>
                        <label>
                          Kurs beim Wechsel
                          <div className={styles.iranLockedRateInput}>
                            <input type="number" min="1" step="1" inputMode="numeric" value={iranExchangeForm.exchangeRate} onChange={event => setIranExchangeForm(prev => ({ ...prev, exchangeRate: event.target.value }))} placeholder={iranTrip.exchangeRate || 'z. B. 200.000'} required={!iranTrip.exchangeRate} />
                            <strong>T / €</strong>
                          </div>
                        </label>
                        <label>
                          Datum
                          <input type="date" value={iranExchangeForm.date} onChange={event => setIranExchangeForm(prev => ({ ...prev, date: event.target.value }))} />
                        </label>
                        {Number(iranExchangeForm.euroAmount || 0) > 0 && Number(iranExchangeForm.exchangeRate || iranTrip.exchangeRate || 0) > 0 && (
                          <div className={styles.iranExchangePreview}>
                            <span>Du erhältst</span>
                            <strong>{formatTomanFromRial(Number(iranExchangeForm.euroAmount) * Number(iranExchangeForm.exchangeRate || iranTrip.exchangeRate) * 10)}</strong>
                            <small>{formatIranRial(Number(iranExchangeForm.euroAmount) * Number(iranExchangeForm.exchangeRate || iranTrip.exchangeRate) * 10)}</small>
                          </div>
                        )}
                        <button className={styles.iranPrimaryBtn} type="submit" disabled={!iranExchangeForm.euroAmount || Number(iranExchangeForm.exchangeRate || iranTrip.exchangeRate || 0) <= 0}>Wechsel speichern</button>
                      </form>
                      {iranTrip.exchanges.length > 0 && (
                        <div className={styles.iranExchangeHistory}>
                          {iranTrip.exchanges.map(entry => (
                            <div key={entry.id}>
                              <span><strong>{formatMoney(entry.euroAmount)} → {formatTomanFromRial(entry.amountRial)}</strong><small>{new Date(`${entry.date}T00:00:00`).toLocaleDateString('de-DE')} · Kurs {new Intl.NumberFormat('de-DE').format(entry.exchangeRateToman)} T/€</small></span>
                              <button type="button" onClick={() => deleteIranExchange(entry.id)} aria-label="Geldwechsel löschen">×</button>
                            </div>
                          ))}
                        </div>
                      )}
                    </section>

                  <section className={`${styles.iranTripCard} ${styles.iranSettlementCard}`}>
                    <header className={styles.iranTripCardHead}>
                      <b>03</b>
                      <div><span>Abrechnung</span><h3>Geben &amp; bekommen</h3></div>
                    </header>
                    <form className={styles.iranTripForm} onSubmit={addIranSettlement}>
                      <label>
                        Person
                        <select value={iranSettlementForm.person} onChange={event => setIranSettlementForm(prev => ({ ...prev, person: event.target.value }))}>
                          {IRAN_SETTLEMENT_PEOPLE.map(person => <option key={person} value={person}>{iranPersonLabel(person)}</option>)}
                        </select>
                      </label>
                      <label>
                        Richtung
                        <select value={iranSettlementForm.direction} onChange={event => setIranSettlementForm(prev => ({ ...prev, direction: event.target.value }))}>
                          <option value="receive">Ich bekomme von</option>
                          <option value="pay">Ich gebe an</option>
                        </select>
                      </label>
                      <label>
                        Betrag
                        <div className={styles.iranSettlementAmountInput}>
                          <input type="text" inputMode="numeric" value={iranSettlementForm.amount} onChange={event => setIranSettlementForm(prev => ({ ...prev, amount: formatTomanInput(event.target.value) }))} placeholder={iranSettlementForm.currency === 'rial' ? 'z. B. 350,000' : 'z. B. 35,000'} required />
                          <select value={iranSettlementForm.currency} onChange={event => setIranSettlementForm(prev => ({ ...prev, currency: event.target.value, amount: '' }))} aria-label="Währung der Abrechnung">
                            <option value="toman">Toman</option>
                            <option value="rial">Rial</option>
                          </select>
                        </div>
                        <small>
                          {iranSettlementForm.direction === 'pay'
                            ? `Wird vom Iran-Kontostand abgezogen und mit der offenen Abrechnung bei ${iranPersonLabel(iranSettlementForm.person)} verrechnet.`
                            : `Wird dem Iran-Kontostand gutgeschrieben und mit der offenen Abrechnung bei ${iranPersonLabel(iranSettlementForm.person)} verrechnet.`}
                        </small>
                      </label>
                      <label className={styles.iranTripWideField}>
                        Notiz
                        <input value={iranSettlementForm.note} onChange={event => setIranSettlementForm(prev => ({ ...prev, note: event.target.value }))} placeholder="Wofür?" />
                      </label>
                      <button className={styles.iranPrimaryBtn} type="submit" disabled={!iranSettlementForm.amount}>Abrechnung speichern</button>
                    </form>
                  </section>
                  </aside>
                </div>

                <section className={`${styles.iranTripCard} ${styles.iranOverviewCard}`}>
                  <header className={styles.iranTripCardHead}>
                    <b>04</b>
                    <div><span>Analyse</span><h3>Ausgaben nach Kategorie</h3></div>
                  </header>
                  {iranCategoryTotals.length ? (
                    <div className={styles.iranCategoryChart}>
                      {iranCategoryTotals.map(item => {
                        const chartValue = iranTrip.displayCurrency === 'eur' ? item.totalEuro : item.total
                        const isOpen = iranAnalysisCategory === item.category
                        return (
                        <div className={styles.iranCategoryChartGroup} key={item.category}>
                          <button
                            type="button"
                            className={`${styles.iranCategoryChartRow} ${isOpen ? styles.iranCategoryChartRowActive : ''}`}
                            aria-expanded={isOpen}
                            onClick={() => setIranAnalysisCategory(current => current === item.category ? null : item.category)}
                          >
                            <span className={styles.iranCategoryChartIcon}><IranCategoryIcon type={item.icon} /></span>
                            <span className={styles.iranCategoryChartBody}>
                              <span><span>{item.category}</span><strong>{iranTrip.displayCurrency === 'eur' ? formatMoney(item.totalEuro) : formatTomanFromRial(item.total)}</strong></span>
                              <span className={styles.iranCategoryChartTrack}><i style={{ width: `${Math.max(3, (chartValue / iranCategoryChartMax) * 100)}%` }} /></span>
                            </span>
                          </button>
                          {isOpen && (
                            <div className={styles.iranCategoryExpenseDetails}>
                              {item.entries.map(entry => (
                                <div key={entry.id}>
                                  <span>
                                    <strong>{entry.category.includes(' › ') ? entry.category.split(' › ')[1] : (entry.description || item.category)}</strong>
                                    <small>{entry.description && entry.category.includes(' › ') ? `${entry.description} · ` : ''}{new Date(`${entry.date}T00:00:00`).toLocaleDateString('de-DE')}</small>
                                  </span>
                                  <b>{iranExpenseDisplayAmount(entry)}</b>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        )
                      })}
                    </div>
                  ) : <p className={styles.iranEmpty}>Noch keine Reisekosten eingetragen.</p>}

                  {iranTrip.expenses.length > 0 && (
                    <div className={styles.iranHistoryBlock}>
                      <div className={styles.iranHistoryHead}><strong>Letzte Ausgaben</strong><span>{iranTrip.expenses.length} Einträge</span></div>
                      <div className={styles.iranEntryList}>
                        {iranTrip.expenses.map(entry => (
                          <div className={styles.iranEntryRow} key={entry.id}>
                            <div>
                              <strong>{entry.category}</strong>
                              <span>{entry.description || 'Ohne Beschreibung'} · {new Date(`${entry.date}T00:00:00`).toLocaleDateString('de-DE')}{entry.originalCurrency === 'eur' ? ` · ursprünglich ${formatMoney(entry.originalAmount)}` : ` · ${entry.paidBy && entry.paidBy !== 'account' ? `bezahlt von ${iranPersonLabel(entry.paidBy)}` : 'Mein Konto'}`}{entry.exchangeRateAtEntryToman ? ` · Kurs ${new Intl.NumberFormat('de-DE').format(entry.exchangeRateAtEntryToman)} T/€` : ''}</span>
                            </div>
                            <b>{iranExpenseDisplayAmount(entry)}</b>
                            <span className={styles.iranEntryActions}>
                              <button type="button" onClick={() => editIranExpense(entry)} aria-label="Ausgabe bearbeiten">✎</button>
                              <button type="button" onClick={() => deleteIranExpense(entry.id)} aria-label="Ausgabe löschen">×</button>
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </section>

                <section className={`${styles.iranTripCard} ${styles.iranPeopleCard}`}>
                  <header className={styles.iranTripCardHead}>
                    <b>05</b>
                    <div><span>Personen</span><h3>Offene Abrechnung</h3></div>
                  </header>
                  <div className={styles.iranPeopleGrid}>
                    {iranSettlementBalances.map(item => (
                      <article className={styles.iranPersonCard} key={item.person}>
                        <span>{iranPersonLabel(item.person)}</span>
                        <strong className={item.balance >= 0 ? styles.iranReceive : styles.iranPay}>
                          {item.balance >= 0 ? 'Du bekommst ' : 'Du gibst '}{iranDisplayAmount(Math.abs(item.balance))}
                        </strong>
                        {item.entries.length ? item.entries.map(entry => (
                          <div className={styles.iranSettlementRow} key={entry.id}>
                            <span>{entry.expenseId ? 'Ausgabe' : (entry.direction === 'receive' ? 'Bekommen' : 'Geben')}{entry.note ? ` · ${entry.note}` : ''}{entry.originalCurrency === 'rial' ? ` · ${formatIranRial(entry.amountRial)}` : ''}</span>
                            <b>{iranDisplayAmount(entry.amountRial)}</b>
                            {entry.expenseId || entry.isOpeningBalance
                              ? <em className={styles.iranLinkedExpenseBadge}>{entry.isOpeningBalance ? 'Start' : 'offen'}</em>
                              : <button type="button" onClick={() => deleteIranSettlement(entry.id)} aria-label="Abrechnung löschen">×</button>}
                          </div>
                        )) : <small>Noch keine Abrechnung.</small>}
                      </article>
                    ))}
                  </div>
                </section>
              </div>
            )}

            {/* ── JAHRESÜBERSICHT ── */}
            {view === 'einstellung' && subView === 'kategorien' && (
              <div>
                <div className={styles.categoryManagerHero}>
                  <div>
                    <span className={styles.categoryManagerEyebrow}>Ordnung &amp; Struktur</span>
                    <h2>Kategorien verwalten</h2>
                    <p>Hauptkategorien bündeln deine Ausgaben. Unterkategorien machen Einträge schneller und genauer.</p>
                  </div>
                  <div className={styles.categoryManagerStats}>
                    <span><strong>{visibleCategories.filter(cat => cat.type === 'expense').length}</strong> Ausgaben</span>
                    <span><strong>{visibleCategories.reduce((sum, cat) => sum + cat.subs.length, 0)}</strong> Unterkategorien</span>
                  </div>
                </div>
                {catError && (
                  <div className={styles.catErrorBanner}>
                    <span>⚠ {catError}</span>
                    <button type="button" onClick={() => setCatError('')}>×</button>
                  </div>
                )}
                <div className={styles.categoryTileGrid}>
                  {visibleCategories.map(cat => {
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
                    <p style={{ margin: 0, fontWeight: 800, fontSize: 13, color: 'var(--text-strong,#0d1b2a)' }}>Ausgaben Mai 2026 importieren</p>
                    <p style={{ margin: '2px 0 0', fontSize: 12, color: 'var(--text-muted,#94a3b8)' }}>Variable Einträge – ohne Fixkosten</p>
                  </div>
                  <button type="button" className={styles.primaryBudgetBtn} style={{ whiteSpace: 'nowrap', flexShrink: 0 }} onClick={seedMai2026}>
                    Jetzt importieren
                  </button>
                </div>
              </div>
            )}

            {/* ── BUDGET & FIXKOSTEN ── */}
            {(view === 'budgets' || (view === 'einstellung' && (subView === 'budget' || subView === 'fixkosten'))) && (
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

                  <FinancePlanForm categories={visibleCategories} selectedItems={planSelectedItems} onChooseItem={setPlanSelectedItems} amount={planAmount} onAmountChange={setPlanAmount} startMonth={planStartMonth} onStartMonthChange={setPlanStartMonth} onSaveBudget={savePlanBudget} onSaveRecurring={addFixeintrag} error={planError} />

                </div>

                <div className={styles.budgetPanel}>
                  <h2 className={styles.sectionTitle} style={{ margin: '0 0 16px' }}>Gespeicherte Budgets</h2>
                  <div className={styles.savedBudgetGrid}>
                    {Object.entries(visibleCatBudgets).filter(([, amount]) => Number(amount || 0) > 0).map(([name, amount]) => {
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
                    {!Object.values(visibleCatBudgets).some(amount => Number(amount || 0) > 0) && <p className={styles.emptyAnalytics}>Noch kein Budget gespeichert.</p>}
                  </div>
                </div>

                <div className={styles.fixedCostsPanel}>
                  <h2 className={styles.sectionTitle} style={{ margin: 0 }}>Gespeicherte Fixkosten</h2>
                  {visibleRecurring.length > 0 ? (
                    <div className={styles.fixedCardGrid}>
                      {visibleRecurring.map(r => {
                        const nextChange = nextRecurringAmountChange(r, currentMonthKey)
                        const displayedAmount = recurringAmountForMonth(r, currentMonthKey)
                        const isEditing = editingRecurringId === r.id
                        return <div className={`${styles.fixedCard} ${isEditing ? styles.fixedCardEditing : ''}`} key={r.id}>
                          <div className={styles.fixedCardActions}>
                            <button className={styles.fixedEditBtn} type="button" onClick={() => beginFixeintragEdit(r)}>Bearbeiten</button>
                            <button className={styles.fixedDeleteBtn} type="button" onClick={() => removeFixeintrag(r.id)} aria-label={`${r.title} löschen`}>×</button>
                          </div>
                          <div className={styles.fixedCardHead}>
                            <strong>{r.title}</strong>
                            <span className={r.type === 'income' ? styles.moneyPositive : styles.moneyNegative}>{formatMoney(displayedAmount)}</span>
                          </div>
                          <div className={styles.fixedMetaRow}>
                            <span className={r.type === 'income' ? styles.fixedMetaIncome : styles.fixedMetaExpense}>{r.type === 'income' ? 'Einnahme' : 'Ausgabe'}</span>
                            {r.category && <span className={styles.fixedMetaPill}>{r.category}</span>}
                            <span className={styles.fixedMetaPill}>{(r.startMonth || '2025-01') > currentMonthKey ? 'Ab' : 'Seit'} {formatMonthLabel(r.startMonth || '2025-01')}</span>
                          </div>
                          {nextChange ? (
                            <div className={styles.fixedUpcomingChange}>
                              <span>Geplant ab {formatMonthLabel(nextChange.startMonth)}</span>
                              <strong>{formatMoney(nextChange.amount)}</strong>
                            </div>
                          ) : null}
                          {isEditing ? (
                            <div className={styles.fixedEditPanel}>
                              <div className={styles.fixedEditGrid}>
                                <label>
                                  <span>Neuer Betrag</span>
                                  <div className={styles.fixedEditMoney}>
                                    <input type="text" inputMode="decimal" value={recurringEditAmount} onChange={event => setRecurringEditAmount(event.target.value)} autoFocus />
                                    <em>€</em>
                                  </div>
                                </label>
                                <label>
                                  <span>Gültig ab</span>
                                  <input type="month" value={recurringEditStartMonth} onChange={event => setRecurringEditStartMonth(event.target.value)} />
                                </label>
                              </div>
                              <p>Vergangene Monate bleiben unverändert.</p>
                              <div className={styles.fixedEditActions}>
                                <button type="button" onClick={cancelFixeintragEdit}>Abbrechen</button>
                                <button type="button" disabled={!recurringEditAmount || !recurringEditStartMonth} onClick={saveFixeintragEdit}>Änderung speichern</button>
                              </div>
                            </div>
                          ) : null}
                        </div>
                      })}
                    </div>
                  ) : (
                    <p className={styles.emptyAnalytics}>Noch keine Fixkosten gespeichert.</p>
                  )}
                </div>
              </div>
            )}

          </div>
        </div>

        {/* ── POPUP MODAL ── */}
        {showPopup && (
          // Keep the backdrop static: native date pickers can report their selection as a backdrop click on mobile.
          <div className={`${styles.popupOverlay} ${financeStyles.dialogOverlay}`} role="dialog" aria-modal="true" aria-labelledby="finance-dialog-title" data-monthly-dialog>
            <div className={`${styles.popupPanel} ${entryScope ? styles.scopedPopupPanel : ''}`}>
              {/* Header */}
              <div className={styles.popupHeader} style={{ borderBottom: `2px solid ${popupAccent}` }}>
                <div>
                  <p className={styles.popupMonthLabel}>
                    {formatMonthLabel(month)}
                  </p>
                  <h3 id="finance-dialog-title" className={styles.popupTitle} style={{ color: popupAccent }}>
                    {editingBooking ? 'Buchung bearbeiten' : entryScope ? `Ausgabe · ${entryScope.subName || entryScope.catName}` : `${isIncome ? 'Einkommen' : 'Ausgabe'} hinzufügen`}
                  </h3>
                </div>
                <button className={styles.popupClose} onClick={closePopup} aria-label="Schließen">×</button>
              </div>

              {/* Body */}
              <div className={styles.popupBody}>
                <EntryForm
                  formId="budget-entry-form"
                  categories={visibleCategories}
                  type={entryType}
                  onTypeChange={handleTypeChange}
                  selectedItems={selectedItems}
                  onToggleItem={toggleItem}
                  onChooseItem={chooseEntryItem}
                  frequentCategories={frequentCategories}
                  errors={entryErrors}
                  onManageCategories={() => { closePopup(); setView('einstellung'); setSubView('kategorien') }}
                  expandedCats={expandedCats}
                  onToggleExpand={toggleExpand}
                  entryAmount={entryAmount}
                  onAmountChange={setEntryAmount}
                  entryDate={entryDate}
                  onDateChange={setEntryDate}
                  entryDescription={entryDescription}
                  onDescriptionChange={setEntryDescription}
                  onSubmit={addEntry}
                  entryTitle={entryTitle}
                  entryCatNames={entryCatNames}
                  paidByFatima={paidByFatima}
                  onToggleFatima={() => setPaidByFatima(v => !v)}
                  entryScope={entryScope}
                  incomeSourceMode={incomeSourceMode}
                  onIncomeSourceModeChange={handleIncomeSourceModeChange}
                  otherIncomeName={otherIncomeName}
                  onOtherIncomeNameChange={setOtherIncomeName}
                />
              </div>

              {/* Submit bar – outside popupBody so it never covers scrollable content */}
              <div className={financeStyles.submitBar}>
                <button form="budget-entry-form" className={financeStyles.primary} type="submit">{editingBooking ? 'Änderung speichern' : `${isIncome ? 'Einkommen' : 'Ausgabe'} speichern`}</button>
                {!editingBooking && <button form="budget-entry-form" className={financeStyles.secondary} type="submit" value="continue">Speichern & weitere</button>}
              </div>
            </div>
          </div>
        )}

        {/* ── KATEGORIE-DETAIL POPUP ── */}
        {catDetail && (
          <div className={styles.popupOverlay} onClick={closeCatDetail} role="dialog" aria-modal="true" aria-label={catDetail.label} data-monthly-dialog>
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
                <div className={styles.catDetailHeaderActions}>
                  {catDetail.type === 'expense' && (
                    <button type="button" className={styles.catDetailAddBtn} onClick={openPopupFromDetail}>
                      <IconPlus />
                      <span>Neue Ausgabe</span>
                    </button>
                  )}
                  <button className={styles.popupClose} onClick={closeCatDetail} aria-label="Schließen">×</button>
                </div>
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
                      <div className={styles.catDetailGroupHeaderWrap}>
                        <button type="button" className={styles.catDetailGroupHead} onClick={() => toggleCatSubtitle(subtitle)}>
                          <span>{subtitle}</span>
                          <span className={styles.catDetailGroupMeta}>
                            <strong>{formatMoney(groupTotal)}</strong>
                            <small>{entries.length} Eintr.</small>
                            <span className={isExpanded ? styles.catDetailChevronOpen : styles.catDetailChevron}><FinanceIcon name="chevron" size={16} /></span>
                          </span>
                        </button>
                        {catDetail.type === 'expense' && (
                          <button type="button" className={styles.catDetailSubAddBtn} onClick={() => openPopupForSub(subtitle)} aria-label={`${subtitle} hinzufügen`} title={`${subtitle} hinzufügen`}>
                            <IconPlus />
                          </button>
                        )}
                      </div>
                      {isExpanded && (
                        <div className={styles.catDetailEntries}>
                          {entries.slice().sort((a, b) => (b.date || '').localeCompare(a.date || '')).map(entry => (
                            <div key={entry.id} className={styles.catDetailEntry}>
                              <span className={styles.catDetailDate}>{new Date(entry.date).toLocaleDateString('de-DE')}</span>
                              {entry.description && <span className={styles.entryDescription}>{entry.description}</span>}
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

        {entryNotice && <div className={`${financeStyles.toast} ${showPopup ? financeStyles.toastTop : ''}`} role="status"><span>{entryNotice.message}</span><button onClick={undoEntry}>Rückgängig</button><button aria-label="Bestätigung schließen" onClick={() => setEntryNotice(null)}><FinanceIcon name="close" size={16} /></button></div>}
      </main>
    </div>
  )
}
