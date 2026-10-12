import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

// Load the production functions with an in-memory Supabase boundary. No real
// transactions, network requests or production credentials are used.
const utilsUrl = new URL('../utils/financeState.js', import.meta.url)
const utils = await import(`data:text/javascript;base64,${Buffer.from(readFileSync(utilsUrl, 'utf8')).toString('base64')}`)
globalThis.financeUtils = utils

function mockStorage(initial = {}) {
  const tables = structuredClone(initial)
  return {
    tables, beforeWrite: null,
    from(table) {
      const client = this
      const filters = []
      let mode = 'read', payload
      const query = {
        select() { return this }, eq(key, value) { filters.push([key, value]); return this },
        is(key, value) { return this.eq(key, value) },
        update(value) { mode = 'update'; payload = value; return this },
        insert(value) { mode = 'insert'; payload = value; return this },
        async maybeSingle() { return this.single() },
        async single() {
          if (!(table in tables)) return { data: null, error: { code: 'PGRST205', message: 'table does not exist' } }
          if (mode !== 'read' && client.beforeWrite) {
            const callback = client.beforeWrite; client.beforeWrite = null; callback(tables)
          }
          const rows = tables[table]
          if (mode === 'insert') {
            if (rows[payload.id]) return { data: null, error: { code: '23505' } }
            rows[payload.id] = structuredClone(payload)
            return { data: structuredClone(payload), error: null }
          }
          const row = Object.values(rows).find(row => filters.every(([key, value]) => row[key] === value))
          if (!row) return { data: null, error: null }
          if (mode === 'update') Object.assign(row, structuredClone(payload))
          return { data: structuredClone(row), error: null }
        },
      }
      return query
    },
  }
}

const timestamp = '2026-10-12T10:00:00.000Z'
const oldEntry = { id: 'existing', type: 'expense', date: '2026-10-12', title: 'Existing', amount: 10 }
globalThis.financeMock = mockStorage({
  admin_budget_state: { default: { id: 'default', store: { '2026-10': { entries: [oldEntry], note: 'Keep me' }, vacation: { untouched: true } }, categories: [{ name: 'Lebensmittel', type: 'expense' }], recurring: [{ id: 'rent' }], cat_budgets: { Lebensmittel: 200 }, updated_at: timestamp } },
  andarun_friend_finance_state: {},
})
let source = readFileSync(new URL('../lib/personalFinance.js', import.meta.url), 'utf8')
source = source.replace("import { supabaseAdmin } from '@/lib/supabase/server'", 'const supabaseAdmin = globalThis.financeMock')
source = source.replace("import { FRIEND_ACCOUNTS, positiveMoney, readFinanceState, validFinanceDate, writeFinanceState } from '@/utils/financeState'", 'const { FRIEND_ACCOUNTS, positiveMoney, readFinanceState, validFinanceDate, writeFinanceState } = globalThis.financeUtils')
const finance = await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`)
const db = globalThis.financeMock

assert.equal(utils.validFinanceDate('2026-02-30'), false)
assert.equal(utils.validFinanceDate('2028-02-29'), true)
assert.throws(() => utils.positiveMoney(1.001))
assert.throws(() => utils.positiveMoney(Infinity))
assert.throws(() => utils.positiveMoney(0.0000001))

const personal = { requestId: 'monthly-test-1', type: 'expense', amount: 34.50, currency: 'eur', title: 'Aldi', date: '2026-10-12', category: 'Lebensmittel' }
db.beforeWrite = tables => {
  const row = tables.admin_budget_state.default
  row.store['2026-10'].entries.push({ ...oldEntry, id: 'simultaneous' })
  row.updated_at = '2026-10-12T10:00:01.000Z'
}
const result = await finance.addPersonalFinanceEntry(personal)
assert.equal(result.created, true)
const saved = db.tables.admin_budget_state.default
assert.deepEqual(saved.store['2026-10'].entries.map(e => e.id).sort(), ['chatgpt:monthly-test-1', 'existing', 'simultaneous'])
assert.equal(saved.store['2026-10'].note, 'Keep me')
assert.deepEqual(saved.store.vacation, { untouched: true })
assert.deepEqual(saved.recurring, [{ id: 'rent' }])
assert.equal(saved.cat_budgets.Lebensmittel, 200)
assert.equal((await finance.addPersonalFinanceEntry(personal)).duplicate, true)
await assert.rejects(finance.addPersonalFinanceEntry({ ...personal, amount: 50 }), /different entry/)
await assert.rejects(finance.addPersonalFinanceEntry({ ...personal, requestId: 'bad-currency', currency: 'irr' }), /EUR only/)
await assert.rejects(finance.addPersonalFinanceEntry({ ...personal, requestId: 'bad-category', category: 'Invented' }), /does not exist/)
await assert.rejects(finance.addPersonalFinanceEntry({ ...personal, date: '2026-02-30' }), /real Gregorian/)

const friend = { requestId: 'friend-test-1', accountId: 'mansour', payer: 'me', amount: 1000000, currency: 'toman', rate: 100000, date: '2026-10-12', note: 'Shared expense', kind: 'expense' }
await assert.rejects(finance.addFriendFinanceEntry({ ...friend, rate: undefined }), /positive/)
await assert.rejects(finance.addFriendFinanceEntry({ ...friend, accountId: 'unknown' }), /Do not guess/)
const added = await finance.addFriendFinanceEntry(friend)
assert.equal(added.entry.amount, 10000000)
assert.equal(added.entry.rate, 1000000)
assert.equal(added.entry.euroValue, 10)
assert.equal((await finance.addFriendFinanceEntry(friend)).duplicate, true)
await finance.addFriendFinanceEntry({ ...friend, requestId: 'friend-test-2', currency: 'eur', amount: 5, payer: 'them', kind: 'settlement' })
const ledger = await finance.listFriendFinanceEntries({ accountId: 'mansour' })
assert.equal(ledger.accounts[0].balances.irr, 10000000)
assert.equal(ledger.accounts[0].balances.eur, -5)

const stale = await utils.readFinanceState(db, 'budget')
db.tables.admin_budget_state.default.updated_at = '2099-01-01T00:00:00.000Z'
await assert.rejects(utils.writeFinanceState(db, stale, { store: {} }), error => error.status === 409)

const base = { mansour: [{ id: 'old', note: 'Old' }] }
const merged = utils.mergeFriendLedgers({ mansour: [...base.mansour, { id: 'voice' }], zia: [{ id: 'other' }] }, { mansour: [{ id: 'local' }] }, base)
assert.deepEqual(merged.mansour.map(item => item.id).sort(), ['local', 'voice'])
assert.deepEqual(merged.zia, [{ id: 'other' }])
const fallback = mockStorage({ admin_budget_state: { 'andarun:friend-finance:v1': { id: 'andarun:friend-finance:v1', store: base, updated_at: timestamp } } })
assert.equal((await utils.readFinanceState(fallback, 'friends')).field, 'store')
console.log('Personal finance tests passed: validation, currency conversion, retry idempotency, concurrent writes, preserved budget data, ledger merge, and fallback storage.')
