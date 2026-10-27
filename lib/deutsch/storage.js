import { supabaseAdmin } from '../supabase/server'
import { normalizeDeutschState, applyDeutschChanges, diffDeutschState } from './state'

const missingTable = error => /PGRST205|42P01|relation .*does not exist|schema cache/i.test(`${error?.code} ${error?.message}`)

async function readRecord(ownerId) {
  const primary = await supabaseAdmin.from('andarun_deutsch_state').select('state,updated_at').eq('owner_id', ownerId).maybeSingle()
  if (!primary.error) return { table: 'andarun_deutsch_state', column: 'state', idColumn: 'owner_id', id: ownerId, row: primary.data }
  if (!missingTable(primary.error)) throw primary.error
  const id = `deutsch:${ownerId}`
  const fallback = await supabaseAdmin.from('admin_budget_state').select('store,updated_at').eq('id', id).maybeSingle()
  if (fallback.error) throw fallback.error
  return { table: 'admin_budget_state', column: 'store', idColumn: 'id', id, row: fallback.data }
}

export async function readDeutschState(ownerId) {
  const record = await readRecord(ownerId)
  return normalizeDeutschState(record.row?.[record.column])
}

export async function saveDeutschChanges(ownerId, batches, { allowLessons = true, legacyState } = {}) {
  for (let attempt = 0; attempt < 5; attempt++) {
    const record = await readRecord(ownerId)
    const current = normalizeDeutschState(record.row?.[record.column])
    const changes = legacyState ? [diffDeutschState(current, { ...legacyState, lessonStatus: legacyState.lessonStatus || current.lessonStatus, mistakeReviews: legacyState.mistakeReviews || current.mistakeReviews })] : batches
    const state = changes.reduce((next, delta) => applyDeutschChanges(next, delta, { allowLessons }), current)
    const updatedAt = new Date().toISOString()
    let result
    if (record.row) {
      let query = supabaseAdmin.from(record.table).update({ [record.column]: state, updated_at: updatedAt }).eq(record.idColumn, record.id)
      query = record.row.updated_at ? query.eq('updated_at', record.row.updated_at) : query.is('updated_at', null)
      result = await query.select(record.column)
    } else {
      const row = { [record.idColumn]: record.id, [record.column]: state, updated_at: updatedAt }
      if (record.table === 'admin_budget_state') Object.assign(row, { recurring: [], cat_budgets: {}, categories: [] })
      result = await supabaseAdmin.from(record.table).insert(row).select(record.column)
    }
    if (result.error?.code === '23505') continue
    if (result.error) throw result.error
    if (result.data?.length) return normalizeDeutschState(result.data[0][record.column])
  }
  throw new Error('Gleichzeitige Änderung. Bitte erneut synchronisieren.')
}
