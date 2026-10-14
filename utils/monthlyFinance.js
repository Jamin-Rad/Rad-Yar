// Pure reporting helpers. Amounts remain EUR; tags never duplicate a transaction.
const roundMoney = value => Math.round((value + Number.EPSILON) * 100) / 100
export function parseEuroAmount(value) {
  let input = String(value ?? '').trim().replace(/[\s\u00a0]/g, '')
  if (/^\d{1,3}(\.\d{3})+,\d{1,2}$/.test(input)) input = input.replace(/\./g, '')
  input = input.replace(',', '.')
  if (!/^(?:\d+(?:\.\d{0,2})?|\.\d{1,2})$/.test(input)) return null
  const amount = Number(input)
  return Number.isFinite(amount) && amount > 0 && Number.isSafeInteger(Math.round(amount * 100))
    ? Math.round(amount * 100) / 100 : null
}

export function validEntryDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value || '')) return false
  const date = new Date(`${value}T12:00:00Z`)
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value
}

export function berlinToday(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Berlin', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(date)
  const part = key => parts.find(item => item.type === key).value
  return `${part('year')}-${part('month')}-${part('day')}`
}

export function shiftMonth(month, offset) {
  const [year, number] = month.split('-').map(Number)
  const date = new Date(Date.UTC(year, number - 1 + offset, 1))
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}`
}

export function primaryCategory(entry, categories = []) {
  if (entry.category) return entry.category
  return (entry.tags || []).find(tag => categories.some(category => category.name === tag && category.type === entry.type)) || 'Ohne Kategorie'
}

export function expenseCategoryTotals(entries, categories) {
  const totals = new Map()
  for (const entry of entries) {
    if (entry.type !== 'expense') continue
    const name = primaryCategory(entry, categories)
    totals.set(name, (totals.get(name) || 0) + Number(entry.amount || 0))
  }
  return [...totals].map(([name, amount]) => [name, roundMoney(amount)]).sort((a, b) => b[1] - a[1])
}

export function categoryLimit(budgets, name) {
  const positive = value => Number.isFinite(Number(value)) && Number(value) > 0 ? Number(value) : 0
  const whole = positive(budgets[name]) || positive(budgets[`${name} / Gesamt`])
  if (whole) return whole
  return roundMoney(Object.entries(budgets).reduce((sum, [key, value]) => sum + (key.startsWith(`${name} / `) ? positive(value) : 0), 0))
}

export function entryTotals(entries) {
  const result = { income: 0, expenses: 0, fixed: 0, variable: 0, fatima: 0, jamin: 0 }
  for (const entry of entries) {
    const amount = Number(entry.amount || 0)
    if (entry.type === 'income') result.income += amount
    if (entry.type !== 'expense') continue
    result.expenses += amount
    result[entry.generatedRecurring ? 'fixed' : 'variable'] += amount
    result[entry.paidByFatima ? 'fatima' : 'jamin'] += amount
  }
  for (const key of Object.keys(result)) result[key] = roundMoney(result[key])
  result.balance = roundMoney(result.income - result.expenses)
  result.savingsRate = result.income > 0 ? result.balance / result.income * 100 : null
  return result
}

export function buildMonthlyAnalytics({ month, entries, previousEntries, categories, budgets, today = berlinToday() }) {
  const totals = entryTotals(entries)
  const previousMonth = shiftMonth(month, -1)
  const current = month === today.slice(0, 7)
  const future = month > today.slice(0, 7)
  const [year, number] = previousMonth.split('-').map(Number)
  const previousDays = new Date(Date.UTC(year, number, 0)).getUTCDate()
  const comparisonDay = current ? Math.min(Number(today.slice(-2)), previousDays) : null
  const inPeriod = entry => !comparisonDay || Number((entry.date || '0000-00-01').slice(-2)) <= comparisonDay
  const comparisonEntries = entries.filter(inPeriod)
  const previousPeriod = previousEntries.filter(inPeriod)
  const comparable = !future && previousPeriod.length > 0
  const comparisonTotals = entryTotals(comparisonEntries)
  const previousTotals = entryTotals(previousPeriod)
  const changes = {}
  for (const key of ['income', 'expenses', 'balance']) {
    changes[key] = comparable ? {
      amount: roundMoney(comparisonTotals[key] - previousTotals[key]),
      percent: previousTotals[key] > 0 ? (comparisonTotals[key] - previousTotals[key]) / previousTotals[key] * 100 : null,
    } : null
  }
  const categoryTotals = expenseCategoryTotals(entries, categories)
  const actuals = new Map(categoryTotals)
  const names = new Set([...actuals.keys(), ...Object.keys(budgets).map(key => key.split(' / ')[0])])
  const rows = [...names].map(name => {
    const actual = actuals.get(name) || 0
    const budget = categoryLimit(budgets, name)
    return { name, actual, budget, remaining: roundMoney(budget - actual), percent: budget > 0 ? actual / budget * 100 : null,
      share: totals.expenses > 0 ? actual / totals.expenses * 100 : 0,
      status: !budget ? 'none' : actual > budget ? 'over' : actual === budget ? 'full' : actual >= budget * .75 ? 'warn' : 'ok' }
  }).filter(row => row.actual > 0 || row.budget > 0).sort((a, b) => b.actual - a.actual || a.name.localeCompare(b.name, 'de'))
  const budgeted = rows.filter(row => row.budget > 0)
  const budgetTotal = roundMoney(budgeted.reduce((sum, row) => sum + row.budget, 0))
  const budgetActual = roundMoney(budgeted.reduce((sum, row) => sum + row.actual, 0))
  const unbudgeted = roundMoney(rows.filter(row => !row.budget).reduce((sum, row) => sum + row.actual, 0))
  const beforeCats = new Map(expenseCategoryTotals(previousPeriod, categories))
  const increases = expenseCategoryTotals(comparisonEntries, categories).map(([name, actual]) => ({ name, change: actual - (beforeCats.get(name) || 0) })).filter(row => row.change > 0).sort((a, b) => b.change - a.change)
  return { month, previousMonth, current, future, comparisonDay, comparable, totals, changes, rows, increases,
    budgetTotal, budgetActual, budgetRemaining: roundMoney(budgetTotal - budgetActual), unbudgeted,
    overBudget: budgeted.filter(row => row.status === 'over'),
    multiTagged: entries.some(entry => (entry.tags || []).filter(tag => categories.some(category => category.type === 'expense' && category.name === tag)).length > 1),
  }
}
