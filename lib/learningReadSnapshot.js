import { readVersion } from '@/utils/readProgressStore'

export async function loadLearningReadSnapshot(db, lookupIds) {
  const rows = []
  for (let offset = 0; ; offset += 1000) {
    const { data, error } = await db.from('user_progress')
      .select('user_id,thema_id,read_pct,updated_at,change_id,learned_at')
      .in('user_id', lookupIds).order('user_id').order('thema_id').range(offset, offset + 999)
    if (error) throw error
    rows.push(...data)
    if (data.length < 1000) break
  }
  const resets = await db.from('learning_progress_resets')
    .select('changed_at,change_id').in('user_id', lookupIds)
  if (resets.error) throw resets.error
  let reset = null
  for (const row of resets.data || []) {
    const next = { changedAt: new Date(row.changed_at).toISOString(), changeId: row.change_id }
    if (readVersion(next) > readVersion(reset)) reset = next
  }
  const records = {}
  for (const row of rows) {
    const record = { read: Number(row.read_pct) >= 1, changedAt: new Date(row.updated_at).toISOString(), changeId: row.change_id || '', learnedAt: row.learned_at || row.updated_at }
    if (!records[row.thema_id] || readVersion(record) > readVersion(records[row.thema_id])) records[row.thema_id] = record
  }
  const read = {}, history = []
  for (const [topicId, record] of Object.entries(records)) {
    read[topicId] = record.read && (!reset || readVersion(record) > readVersion(reset))
    if (read[topicId]) history.push({ topicId, learnedAt: record.learnedAt })
  }
  history.sort((a, b) => Date.parse(b.learnedAt) - Date.parse(a.learnedAt))
  return { version: 2, records, reset, read, history }
}
