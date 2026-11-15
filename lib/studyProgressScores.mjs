export const nativeScorePrefix = 'ios-study:'

function setLatest(outcomes, id, record) {
  if (!record || typeof record.correct !== 'boolean') return
  const time = Date.parse(record.at)
  if (!Number.isFinite(time)) return
  const previous = outcomes.get(id)
  if (!previous || time > previous.time || (time === previous.time && record.correct)) {
    outcomes.set(id, { time, correct: record.correct })
  }
}

// Each native answer has an immutable storage key. Browsers receive one summary per topic.
export function projectStudyScores(rows) {
  const scores = Object.create(null)
  const outcomes = new Map()
  const studied = new Set()
  for (const row of rows) {
    const details = row.details || {}
    const native = row.thema_id.startsWith(nativeScorePrefix)
    if (native) {
      const { topicId, questionId, day } = details.nativeAnswer || {}
      if (!topicId || !questionId) continue
      const key = nativeScorePrefix + topicId
      const score = scores[key] ??= {
        attempted: 0, correct: 0, lastDate: row.last_date, fach: row.fach_id || '',
        studyTopicId: topicId, wrongQuestionIds: [], daily: {},
      }
      score.attempted += row.attempted
      score.correct += row.correct
      if (row.last_date > score.lastDate) score.lastDate = row.last_date
      if (day) {
        const daily = score.daily[day] ??= { attempted: 0, correct: 0 }
        daily.attempted += row.attempted
        daily.correct += row.correct
      }
      if (!row.correct) score.wrongQuestionIds.push(questionId)
      setLatest(outcomes, questionId, { at: row.last_date, correct: Boolean(row.correct) })
      studied.add(topicId)
    } else {
      const score = { attempted: row.attempted, correct: row.correct, lastDate: row.last_date,
        fach: row.fach_id || '', ...details }
      const previous = scores[row.thema_id]
      if (!previous || Date.parse(score.lastDate) >= Date.parse(previous.lastDate)) scores[row.thema_id] = score
      if (row.attempted > 0) studied.add(row.thema_id)
      const recorded = details.questionOutcomes || {}
      for (const id of details.wrongQuestionIds || []) {
        if (!Object.hasOwn(recorded, id)) setLatest(outcomes, id, { at: row.last_date, correct: false })
      }
      for (const [id, record] of Object.entries(recorded)) setLatest(outcomes, id, record)
    }
  }
  for (const score of Object.values(scores)) {
    score.wrongQuestionIds = [...new Set(score.wrongQuestionIds || [])]
      .filter(id => outcomes.get(id)?.correct === false)
  }
  return { scores, studiedTopicIds: [...studied], answeredQuestionIds: [...outcomes.keys()], wrongQuestionIds: [...outcomes]
    .filter(([, value]) => !value.correct).map(([id]) => id) }
}

export function scoresByStudyTopic(scores) {
  const topics = Object.create(null)
  for (const [key, score] of Object.entries(scores)) {
    const topic = score.studyTopicId || key
    const existing = topics[topic]
    topics[topic] = existing ? {
      ...existing, attempted: existing.attempted + score.attempted, correct: existing.correct + score.correct,
    } : score
  }
  return topics
}
