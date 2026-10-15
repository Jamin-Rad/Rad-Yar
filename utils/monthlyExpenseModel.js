// All reporting amounts are EUR. A transaction is counted once, regardless of tags.
const round = value => Math.round((value + Number.EPSILON) * 100) / 100
const currency = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' })
export const money = value => currency.format(Number(value) || 0)
export const percent = value => new Intl.NumberFormat('de-DE', { maximumFractionDigits: 1 }).format(value || 0)
export const monthLabel = key => new Date(`${key}-01T12:00:00Z`).toLocaleDateString('de-DE', { month: 'long', year: 'numeric', timeZone: 'Europe/Berlin' })
export const shortDate = key => validDate(key) ? new Date(`${key}T12:00:00Z`).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', timeZone: 'Europe/Berlin' }) : '—'

export function todayBerlin(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'Europe/Berlin' }).formatToParts(date)
  const read = key => parts.find(part => part.type === key).value
  return `${read('year')}-${read('month')}-${read('day')}`
}
export function shiftMonth(key, offset) {
  const [year, month] = key.split('-').map(Number)
  const date = new Date(Date.UTC(year, month - 1 + offset, 1))
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}`
}
export function validDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value || '')) return false
  const date = new Date(`${value}T12:00:00Z`)
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value
}
export function parseAmount(value) {
  let text = String(value ?? '').trim().replace(/[\s\u00a0]/g, '')
  if (/^\d{1,3}(\.\d{3})+,\d{1,2}$/.test(text)) text = text.replace(/\./g, '')
  text = text.replace(',', '.')
  if (!/^(?:\d+(?:\.\d{0,2})?|\.\d{1,2})$/.test(text)) return null
  const number = Number(text)
  return number > 0 && Number.isFinite(number) && Number.isSafeInteger(Math.round(number * 100)) ? round(number) : null
}
export function mainCategory(entry, categories = []) {
  if (entry.category) return entry.category
  return (Array.isArray(entry.tags) ? entry.tags : []).find(tag => categories.some(category => category.name === tag && category.type === entry.type)) || 'Ohne Kategorie'
}
export function recurringAmount(item, key) {
  let amount = Number(item.amount || 0)
  const changes = [...(item.amountChanges || [])].filter(change => change.startMonth && Number(change.amount) > 0).sort((a, b) => a.startMonth.localeCompare(b.startMonth))
  for (const change of changes) if (change.startMonth <= key) amount = Number(change.amount)
  return round(amount)
}
export function monthEntries(key, store, recurring, { futureRecurring = true, today = todayBerlin() } = {}) {
  const projected = !futureRecurring && key > today.slice(0, 7) ? [] : recurring.filter(item => (!item.startMonth || key >= item.startMonth) && (!item.endMonth || key <= item.endMonth)).map(item => ({
    id: `recurring:${item.id}:${key}`, recurringId: item.id, generatedRecurring: true,
    type: item.type || 'expense', title: item.title, category: item.category || '',
    tags: [...new Set([item.category, item.budgetKey].filter(Boolean))], amount: recurringAmount(item, key),
    date: `${key}-01`, paidByFatima: Boolean(item.paidByFatima),
  }))
  return [...projected, ...(store[key]?.entries || [])].filter(entry => entry.category !== 'Ausflug' && !(entry.tags || []).includes('Ausflug'))
}
export function totals(entries) {
  const result = { income: 0, expenses: 0, fixed: 0, variable: 0, jamin: 0, fatima: 0 }
  for (const entry of entries) {
    const amount = Number(entry.amount || 0)
    if (entry.type === 'income') result.income += amount
    if (entry.type !== 'expense') continue
    result.expenses += amount
    result[entry.generatedRecurring ? 'fixed' : 'variable'] += amount
    result[entry.paidByFatima ? 'fatima' : 'jamin'] += amount
  }
  for (const key of Object.keys(result)) result[key] = round(result[key])
  return { ...result, balance: round(result.income - result.expenses) }
}
export function categoryLimit(budgets, name) {
  const positive = value => Number.isFinite(Number(value)) && Number(value) > 0 ? Number(value) : 0
  const direct = positive(budgets[name]) || positive(budgets[`${name} / Gesamt`])
  return direct || round(Object.entries(budgets).reduce((sum, [key, value]) => sum + (key.startsWith(`${name} / `) ? positive(value) : 0), 0))
}
function grouped(entries, categories) {
  const result = new Map()
  for (const entry of entries) {
    if (entry.type !== 'expense') continue
    const name = mainCategory(entry, categories)
    result.set(name, round((result.get(name) || 0) + Number(entry.amount || 0)))
  }
  return result
}
export function analyseMonth({ month, store, recurring, budgets, categories, today = todayBerlin() }) {
  const entries = monthEntries(month, store, recurring, { today })
  const sum = totals(entries)
  const before = shiftMonth(month, -1)
  const previous = monthEntries(before, store, recurring, { today })
  const current = month === today.slice(0, 7), future = month > today.slice(0, 7)
  const [year, number] = before.split('-').map(Number)
  const day = current ? Math.min(Number(today.slice(-2)), new Date(Date.UTC(year, number, 0)).getUTCDate()) : null
  const inPeriod = entry => !day || Number((entry.date || `${month}-01`).slice(-2)) <= day
  const comparableEntries = entries.filter(inPeriod), previousPeriod = previous.filter(inPeriod)
  const comparable = !future && previousPeriod.length > 0
  const nowTotals = totals(comparableEntries), beforeTotals = totals(previousPeriod)
  const delta = comparable ? round(nowTotals.expenses - beforeTotals.expenses) : null
  const actuals = grouped(entries, categories), oldGroups = grouped(previousPeriod, categories)
  const nowGroups = grouped(comparableEntries, categories)
  const names = new Set([...actuals.keys(), ...Object.keys(budgets).map(key => key.split(' / ')[0])])
  const rows = [...names].map(name => {
    const actual = actuals.get(name) || 0, budget = categoryLimit(budgets, name)
    return { name, actual, budget, remaining: round(budget - actual), percent: budget > 0 ? actual / budget * 100 : null,
      share: sum.expenses > 0 ? actual / sum.expenses * 100 : 0,
      status: !budget ? 'none' : actual > budget ? 'over' : actual === budget ? 'full' : actual >= budget * .8 ? 'near' : 'good' }
  }).filter(row => row.actual > 0 || row.budget > 0).sort((a, b) => b.actual - a.actual || a.name.localeCompare(b.name, 'de'))
  const budgeted = rows.filter(row => row.budget > 0)
  const budgetTotal = round(budgeted.reduce((sum, row) => sum + row.budget, 0))
  const budgetUsed = round(budgeted.reduce((sum, row) => sum + row.actual, 0))
  const increases = comparable ? [...nowGroups].map(([name, amount]) => ({ name, delta: round(amount - (oldGroups.get(name) || 0)) })).filter(row => row.delta > 0).sort((a, b) => b.delta - a.delta) : []
  return { month, entries, totals: sum, current, future, before, day, comparable, delta,
    deltaPercent: delta !== null && beforeTotals.expenses > 0 ? delta / beforeTotals.expenses * 100 : null,
    rows, increases, budgetTotal, budgetUsed, budgetLeft: round(budgetTotal - budgetUsed),
    budgetPercent: budgetTotal > 0 ? budgetUsed / budgetTotal * 100 : null,
    unbudgeted: round(rows.filter(row => !row.budget).reduce((sum, row) => sum + row.actual, 0)),
  }
}

// These updates preserve unrelated months, metadata, vacation data, and legacy tags.
export function putMonthlyEntry(store, entry) {
  const next = { ...store }
  for (const key of Object.keys(next)) {
    if (!/^\d{4}-\d{2}$/.test(key)) continue
    const entries = next[key]?.entries || []
    if (entries.some(item => item.id === entry.id)) next[key] = { ...next[key], entries: entries.filter(item => item.id !== entry.id) }
  }
  const key = entry.date.slice(0, 7)
  const month = next[key] || { budget: '', entries: [] }
  next[key] = { ...month, entries: [entry, ...month.entries] }
  return next
}
export function removeMonthlyEntry(store, id) {
  return Object.fromEntries(Object.entries(store).map(([key, month]) => /^\d{4}-\d{2}$/.test(key) ? [key, { ...month, entries: (month.entries || []).filter(entry => entry.id !== id) }] : [key, month]))
}
