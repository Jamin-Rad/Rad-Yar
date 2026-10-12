import { supabaseAdmin } from '@/lib/supabase/server'
import { FRIEND_ACCOUNTS, positiveMoney, readFinanceState, validFinanceDate, writeFinanceState } from '@/utils/financeState'

function text(value, limit) { return typeof value === 'string' ? value.trim().slice(0, limit) : '' }
function requireDate(date) { if (!validFinanceDate(date)) throw new Error('Use a real Gregorian date in YYYY-MM-DD format.') }
function accountFor(id) {
  const account = FRIEND_ACCOUNTS.find(item => item.id === id)
  if (!account) throw new Error('Choose an accountId returned by list_friend_finance_entries. Do not guess a person.')
  return account
}

async function appendEntry(area, makeChange) {
  for (let attempt = 0; attempt < 4; attempt++) {
    const snapshot = await readFinanceState(supabaseAdmin, area)
    const change = makeChange(snapshot)
    if (change.duplicate) return { ...change.result, duplicate: true, created: false }
    try {
      const updatedAt = await writeFinanceState(supabaseAdmin, snapshot, { [snapshot.field]: change.state })
      return { ...change.result, updatedAt, duplicate: false, created: true }
    } catch (error) {
      if (error.status !== 409 || attempt === 3) throw error
    }
  }
}

function requestEntryId(requestId) {
  if (typeof requestId !== 'string' || !/^[a-zA-Z0-9_-]{8,80}$/.test(requestId)) throw new Error('A stable unique requestId is required for retry-safe recording.')
  return `chatgpt:${requestId}`
}

function checkDuplicate(existing, entry, keys) {
  if (!existing) return false
  if (!keys.every(key => JSON.stringify(existing[key]) === JSON.stringify(entry[key]))) throw new Error('This requestId was used for a different entry. Use a new ID for a new transaction.')
  return true
}

export async function listPersonalFinanceEntries({ from, to }) {
  requireDate(from); requireDate(to)
  if (to < from || Number(to.slice(0, 4)) - Number(from.slice(0, 4)) > 2) throw new Error('Use an ordered date range of at most two calendar years.')
  const snapshot = await readFinanceState(supabaseAdmin, 'budget')
  const entries = Object.entries(snapshot.state).filter(([key]) => /^\d{4}-\d{2}$/.test(key))
    .flatMap(([, month]) => month.entries || []).filter(entry => entry.date >= from && entry.date <= to)
    .sort((a, b) => a.date.localeCompare(b.date))
  const totals = entries.reduce((sum, entry) => { if (entry.type === 'income' || entry.type === 'expense') sum[entry.type] += Number(entry.amount || 0); return sum }, { income: 0, expense: 0 })
  return { entries, totals, currency: 'EUR', categories: snapshot.row?.categories || [], note: 'Recorded monthly entries only; recurring projections and vacation ledgers are not included.', url: '/andarun/finanz' }
}

export async function addPersonalFinanceEntry(input) {
  requireDate(input.date)
  if (!['income', 'expense'].includes(input.type)) throw new Error('Choose income or expense.')
  if (input.currency !== 'eur') throw new Error('The personal monthly budget stores EUR only. Do not silently convert another currency.')
  const amount = positiveMoney(input.amount)
  const title = text(input.title, 240)
  if (!title) throw new Error('A transaction title is required.')
  const id = requestEntryId(input.requestId)
  return appendEntry('budget', snapshot => {
    const categories = snapshot.row?.categories || []
    const categoryName = text(input.category, 120)
    const category = categoryName ? categories.find(item => item.name === categoryName && item.type === input.type) : null
    if (categoryName && !category) throw new Error('Category does not exist for this transaction type. Read the categories first; never invent a category.')
    const entry = {
      id, type: input.type, amount, title, date: input.date,
      category: category?.name || '', tags: category ? [category.name] : [],
      subtitle: category?.name || '', catSubtitles: category ? { [category.name]: title } : {},
      description: text(input.note, 500),
      ...(input.type === 'expense' && input.paidByFatima ? { paidByFatima: true } : {}),
    }
    const monthKey = input.date.slice(0, 7)
    const month = snapshot.state[monthKey] || { entries: [] }
    const existing = Object.values(snapshot.state).flatMap(item => item.entries || []).find(item => item.id === id)
    const duplicate = checkDuplicate(existing, entry, ['type', 'amount', 'title', 'date', 'category', 'description', 'paidByFatima'])
    return { duplicate, state: { ...snapshot.state, [monthKey]: { ...month, entries: [entry, ...(month.entries || [])] } }, result: { entry: existing || entry, currency: 'EUR', url: '/andarun/finanz' } }
  })
}

export async function listFriendFinanceEntries({ accountId, from, to } = {}) {
  if (accountId) accountFor(accountId)
  if (from) requireDate(from)
  if (to) requireDate(to)
  if (from && to && to < from) throw new Error('Invalid date range.')
  const { state } = await readFinanceState(supabaseAdmin, 'friends')
  const accounts = FRIEND_ACCOUNTS.filter(account => !accountId || account.id === accountId).map(account => {
    const allEntries = state[account.id] || []
    const balances = allEntries.reduce((sum, entry) => {
      if (entry.currency === 'eur' || entry.currency === 'irr') sum[entry.currency] += (entry.payer === 'me' ? 1 : -1) * Number(entry.amount || 0)
      return sum
    }, { eur: 0, irr: 0 })
    return { ...account, balances, entries: allEntries.filter(entry => (!from || entry.date >= from) && (!to || entry.date <= to)).sort((a, b) => a.date.localeCompare(b.date)) }
  })
  return { accounts, note: 'Balances cover the full ledger; a positive balance means the user is owed money. Entry amounts in irr and exchange rates are in RIAL, not toman.', url: '/andarun/finanz/freunde' }
}

export async function addFriendFinanceEntry(input) {
  const account = accountFor(input.accountId)
  requireDate(input.date)
  if (!['me', 'them'].includes(input.payer)) throw new Error('Specify whether I paid (me) or the other party paid (them).')
  if (!['eur', 'irr', 'toman'].includes(input.currency)) throw new Error('Choose EUR, IRR or toman explicitly.')
  if (!['expense', 'settlement'].includes(input.kind)) throw new Error('Choose expense or an explicitly requested settlement.')
  const amount = positiveMoney(input.amount, input.currency === 'eur' ? 2 : 0)
  const rialMultiplier = input.currency === 'toman' ? 10 : 1
  const storedAmount = amount * rialMultiplier
  if (!Number.isSafeInteger(storedAmount) && input.currency !== 'eur') throw new Error('The converted amount is too large.')
  const note = text(input.note, 500)
  if (!note) throw new Error('A short explanation is required.')
  const rate = input.currency === 'eur' ? null : positiveMoney(input.rate) * rialMultiplier
  const entry = {
    id: requestEntryId(input.requestId), payer: input.payer, amount: storedAmount,
    currency: input.currency === 'eur' ? 'eur' : 'irr', rate,
    euroValue: input.currency === 'eur' ? amount : storedAmount / rate,
    date: input.date, note, createdAt: Date.now(), kind: input.kind,
  }
  return appendEntry('friends', snapshot => {
    const entries = snapshot.state[account.id] || []
    const existing = Object.values(snapshot.state).flat().find(item => item.id === entry.id)
    const duplicate = checkDuplicate(existing, entry, ['payer', 'amount', 'currency', 'rate', 'date', 'note', 'kind'])
    if (existing && !entries.some(item => item.id === entry.id)) throw new Error('This requestId belongs to another account.')
    return { duplicate, state: { ...snapshot.state, [account.id]: [entry, ...entries] }, result: { account, entry: existing || entry, url: '/andarun/finanz/freunde' } }
  })
}
