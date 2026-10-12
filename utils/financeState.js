// Shared optimistic writes keep website edits and assistant entries from
// overwriting one another. No credentials or browser dependencies here.
export const FRIEND_ACCOUNTS = [
  { id: 'zia', name: 'خانواده ضیا', initials: 'ض' },
  { id: 'ebrahimi', name: 'خانواده ابراهیمی نسب', initials: 'ا' },
  { id: 'mansour', name: 'خانواده منصور مقدم', initials: 'م' },
  { id: 'amirmohammad', name: 'امیرمحمد ابراهیمی نسب', initials: 'ا' },
]

export function financeConflict() {
  return Object.assign(new Error('اطلاعات مالی هم‌زمان تغییر کرده است. دوباره دریافت و ذخیره کنید.'), { status: 409 })
}

function missingTable(error) {
  return /does not exist|schema cache|PGRST205|42P01/i.test(error?.message || '')
}

export async function readFinanceState(client, area) {
  if (!client) throw new Error('Financial storage is not configured.')
  const id = area === 'budget' ? 'default' : 'andarun:friend-finance:v1'
  let table = area === 'budget' ? 'admin_budget_state' : 'andarun_friend_finance_state'
  let field = area === 'budget' ? 'store' : 'state'
  let result = await client.from(table).select('*').eq('id', id).maybeSingle()
  if (area === 'friends' && (missingTable(result.error) || (!result.error && !result.data))) {
    const fallback = await client.from('admin_budget_state').select('*').eq('id', id).maybeSingle()
    if (fallback.error) throw new Error(fallback.error.message)
    if (missingTable(result.error) || fallback.data) {
      table = 'admin_budget_state'
      field = 'store'
      result = fallback
    }
  }
  if (result.error) throw new Error(result.error.message)
  return { table, field, id, row: result.data, state: result.data?.[field] ?? {}, updatedAt: result.data?.updated_at ?? null }
}

export async function writeFinanceState(client, snapshot, patch) {
  // Increment even for back-to-back writes in the same millisecond.
  const updatedAt = new Date(Math.max(Date.now(), Date.parse(snapshot.updatedAt || '') + 1 || 0)).toISOString()
  const payload = { ...patch, updated_at: updatedAt }
  let result
  if (snapshot.row) {
    let query = client.from(snapshot.table).update(payload).eq('id', snapshot.id)
    query = snapshot.updatedAt == null ? query.is('updated_at', null) : query.eq('updated_at', snapshot.updatedAt)
    result = await query.select('updated_at').maybeSingle()
    if (!result.error && !result.data) throw financeConflict()
  } else {
    result = await client.from(snapshot.table).insert({ id: snapshot.id, ...payload }).select('updated_at').single()
    if (result.error?.code === '23505') throw financeConflict()
  }
  if (result.error) throw new Error(result.error.message)
  return result.data.updated_at
}

// Three-way merge: preserve new remote entries while applying only edits or
// deletions made relative to the browser's last successfully loaded ledger.
export function mergeFriendLedgers(remote, local, base) {
  const merged = { ...remote }
  for (const accountId of new Set([...Object.keys(local || {}), ...Object.keys(base || {})])) {
    const remoteEntries = new Map((remote[accountId] || []).map(entry => [entry.id, entry]))
    const baseEntries = new Map((base?.[accountId] || []).map(entry => [entry.id, entry]))
    const localEntries = new Map((local[accountId] || []).map(entry => [entry.id, entry]))
    for (const [id, entry] of baseEntries) {
      if (!localEntries.has(id)) remoteEntries.delete(id)
      else if (JSON.stringify(localEntries.get(id)) !== JSON.stringify(entry)) remoteEntries.set(id, localEntries.get(id))
    }
    for (const [id, entry] of localEntries) if (!baseEntries.has(id)) remoteEntries.set(id, entry)
    merged[accountId] = [...remoteEntries.values()]
  }
  return merged
}

export function validFinanceDate(date) {
  if (typeof date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return false
  const value = new Date(`${date}T00:00:00Z`)
  return Number.isFinite(value.getTime()) && value.toISOString().slice(0, 10) === date
}

export function positiveMoney(value, decimals = 2) {
  if (!Number.isFinite(value) || value <= 0 || value > Number.MAX_SAFE_INTEGER / 100) throw new Error('A positive, finite amount is required.')
  const factor = 10 ** decimals
  const rounded = Math.round(value * factor) / factor
  if (rounded <= 0) throw new Error('Amount is smaller than the minimum currency unit.')
  if (Math.abs(rounded - value) > 0.000001) throw new Error(`Amounts allow at most ${decimals} decimal places.`)
  return rounded
}
