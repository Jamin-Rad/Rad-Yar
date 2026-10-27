const ARRAY_FIELDS = ['lessons', 'cards', 'reviews', 'writings']
const MAP_FIELDS = ['answers', 'lessonStatus', 'mistakeReviews']
const safeKey = key => typeof key === 'string' && !['__proto__', 'constructor', 'prototype'].includes(key)

export function normalizeDeutschState(value) {
  return {
    lessons: Array.isArray(value?.lessons) ? value.lessons : [],
    cards: Array.isArray(value?.cards) ? value.cards : [],
    reviews: Array.isArray(value?.reviews) ? value.reviews : [],
    writings: Array.isArray(value?.writings) ? value.writings : [],
    answers: value?.answers && typeof value.answers === 'object' && !Array.isArray(value.answers) ? value.answers : {},
    mistakeReviews: value?.mistakeReviews && typeof value.mistakeReviews === 'object' && !Array.isArray(value.mistakeReviews) ? value.mistakeReviews : {},
    lessonStatus: value?.lessonStatus && typeof value.lessonStatus === 'object' && !Array.isArray(value.lessonStatus) ? value.lessonStatus : {},
  }
}

export function diffDeutschState(before, after) {
  const previous = normalizeDeutschState(before)
  const next = normalizeDeutschState(after)
  const changes = {}
  for (const field of ARRAY_FIELDS) {
    const old = new Map(previous[field].map(item => [item.id, item]))
    const ids = new Set(next[field].map(item => item.id))
    const upsert = next[field].filter(item => safeKey(item.id) && JSON.stringify(old.get(item.id)) !== JSON.stringify(item))
    const remove = previous[field].filter(item => !ids.has(item.id)).map(item => item.id)
    if (upsert.length || remove.length) changes[field] = { upsert, remove }
  }
  for (const field of MAP_FIELDS) {
    const set = Object.fromEntries(Object.entries(next[field]).filter(([key, value]) => safeKey(key) && JSON.stringify(value) !== JSON.stringify(previous[field][key])))
    const remove = Object.keys(previous[field]).filter(key => !(key in next[field]))
    if (Object.keys(set).length || remove.length) changes[field] = { set, remove }
  }
  return changes
}

export function applyDeutschChanges(value, changes = {}, { allowLessons = true } = {}) {
  const state = normalizeDeutschState(value)
  for (const field of ARRAY_FIELDS) {
    if (field === 'lessons' && !allowLessons) continue
    const delta = changes?.[field]
    if (!delta) continue
    const remove = new Set(Array.isArray(delta.remove) ? delta.remove : [])
    const upserts = (Array.isArray(delta.upsert) ? delta.upsert : []).filter(item => {
      if (!item || !safeKey(item.id)) return false
      const prior = field === 'writings' ? state.writings.find(entry => entry.id === item.id) : null
      return !prior || !(Date.parse(prior.updatedAt) > Date.parse(item.updatedAt))
    })
    const map = new Map(upserts.map(item => [item.id, item]))
    const retained = state[field].filter(item => !remove.has(item.id) && !map.has(item.id))
    state[field] = field === 'reviews' ? [...retained, ...map.values()] : [...map.values(), ...retained]
  }
  for (const field of MAP_FIELDS) {
    const delta = changes?.[field]
    if (!delta) continue
    const entries = { ...state[field] }
    for (const key of Array.isArray(delta.remove) ? delta.remove : []) delete entries[key]
    for (const [key, item] of Object.entries(delta.set || {})) {
      if (!safeKey(key)) continue
      if (field === 'answers' && (!Number.isInteger(item) || item < 0 || item > 20)) continue
      if (field === 'lessonStatus' && (!item || typeof item !== 'object' || (item.readAt !== null && !Number.isFinite(Date.parse(item.readAt))))) continue
      if (field === 'mistakeReviews' && (!item || !Number.isInteger(item.correctCount) || item.correctCount < 0 || item.correctCount > 3 || !Number.isFinite(Date.parse(item.lastReviewedAt)) || (item.dueAt !== null && !Number.isFinite(Date.parse(item.dueAt))))) continue
      if (field === 'mistakeReviews' && Date.parse(entries[key]?.lastReviewedAt) > Date.parse(item.lastReviewedAt)) continue
      entries[key] = field === 'lessonStatus' ? {
        ...entries[key], ...item,
        readProgress: Math.max(entries[key]?.readProgress || 0, item.readProgress || 0),
        listenProgress: Math.max(entries[key]?.listenProgress || 0, item.listenProgress || 0),
      } : item
    }
    state[field] = entries
  }
  state.lessons = state.lessons.slice(0, 365)
  state.cards = state.cards.slice(0, 5000)
  state.reviews = state.reviews.slice(-5000)
  state.writings = state.writings.slice(0, 500)
  return state
}

export function replayDeutschChanges(state, pending) {
  return pending.reduce((current, changes) => applyDeutschChanges(current, changes), normalizeDeutschState(state))
}
