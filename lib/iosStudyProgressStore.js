import { projectStudyScores } from './studyProgressScores.mjs'

export function clientCard(row) {
  return {
    id: row.card_id, box: row.box, status: row.status, addedAt: row.added_at,
    lastSeenAt: row.last_seen_at, lastReviewedAt: row.last_reviewed_at, dueAt: row.due_at,
    correctCount: row.correct_count, wrongCount: row.wrong_count, seenCount: row.seen_count,
  }
}

export async function loadQuestionProgress(db, lookupIds) {
  const rows = []
  const pageSize = 500
  for (let start = 0; ; start += pageSize) {
    const { data, error } = await db.from('mcq_results')
      .select('thema_id,fach_id,attempted,correct,last_date,details')
      .in('user_id', lookupIds).order('user_id').order('thema_id').range(start, start + pageSize - 1)
    if (error) throw error
    rows.push(...data)
    if (data.length < pageSize) return projectStudyScores(rows)
  }
}

const cardTime = row => Date.parse(row?.last_reviewed_at || row?.last_seen_at || row?.added_at || 0)

export function isNewerCard(row, current) {
  if (!current) return true
  return Boolean((row.added_at || row.last_reviewed_at || row.last_seen_at) &&
    !(current.last_reviewed_at && !row.last_reviewed_at) &&
    cardTime(row) > cardTime(current))
}

export async function saveStudyCard(db, row) {
  // Read and compare against the exact database revision before updating, including after a concurrent insert.
  for (let attempt = 0; attempt < 4; attempt++) {
    const table = () => db.from('leitner_cards')
    const { data: current, error } = await table().select('added_at,last_reviewed_at,last_seen_at')
      .eq('user_id', row.user_id).eq('card_id', row.card_id).maybeSingle()
    if (error) throw error
    if (!current) {
      const inserted = await table().upsert(row, { onConflict: 'user_id,card_id', ignoreDuplicates: true }).select('card_id')
      if (inserted.error) throw inserted.error
      if (inserted.data.length) return
      continue
    }
    if (!isNewerCard(row, current)) return
    let update = table().update(row).eq('user_id', row.user_id).eq('card_id', row.card_id)
    for (const column of ['added_at', 'last_reviewed_at', 'last_seen_at']) {
      update = current[column] == null ? update.is(column, null) : update.eq(column, current[column])
    }
    const result = await update.select('card_id')
    if (result.error) throw result.error
    if (result.data.length) return
  }
  throw new Error('Leitner record changed while syncing')
}
