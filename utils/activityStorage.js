const KEY_PREFIX = 'radyar_activity'
const IDLE_MS = 60 * 1000

const keyFor = userId => `${KEY_PREFIX}_${userId || 'anon'}`
const dateKey = date => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function loadActivity(userId) {
  if (typeof window === 'undefined') return { days: {} }
  try {
    return { days: {}, ...JSON.parse(localStorage.getItem(keyFor(userId)) || '{}') }
  } catch {
    return { days: {} }
  }
}

export function addActiveSeconds(userId, seconds, category = 'other') {
  if (typeof window === 'undefined' || seconds <= 0) return
  const activity = loadActivity(userId)
  const today = dateKey(new Date())
  const day = activity.days[today] || { activeSeconds: 0, visits: 0 }
  const roundedSeconds = Math.round(seconds)
  day.activeSeconds += roundedSeconds
  day.categories = {
    ...(day.categories || {}),
    [category]: Number(day.categories?.[category] || 0) + roundedSeconds,
  }
  activity.days[today] = day
  localStorage.setItem(keyFor(userId), JSON.stringify(activity))
  window.dispatchEvent(new CustomEvent('radyar:activity-updated'))
}

export function registerVisit(userId) {
  if (typeof window === 'undefined') return
  const activity = loadActivity(userId)
  const today = dateKey(new Date())
  const day = activity.days[today] || { activeSeconds: 0, visits: 0 }
  const sessionKey = `${keyFor(userId)}_visit_${today}`
  if (!sessionStorage.getItem(sessionKey)) {
    day.visits += 1
    sessionStorage.setItem(sessionKey, '1')
  }
  activity.days[today] = day
  localStorage.setItem(keyFor(userId), JSON.stringify(activity))
}

export function getActivitySummary(userId) {
  const activity = loadActivity(userId)
  const dates = Object.keys(activity.days).sort()
  const totalSeconds = dates.reduce((sum, key) => sum + Number(activity.days[key]?.activeSeconds || 0), 0)
  let streak = 0
  const cursor = new Date()
  cursor.setHours(0, 0, 0, 0)
  while (activity.days[dateKey(cursor)]) {
    streak += 1
    cursor.setDate(cursor.getDate() - 1)
  }
  return { days: activity.days, totalSeconds, streak, visitedDays: dates.length }
}

// Merge server-side activity (from analytics_daily) into local storage.
// Server data covers all devices; per day we take the higher value.
// Local categories (lessons/practice/flashcards) are preserved.
export function mergeServerActivity(userId, serverDays) {
  if (typeof window === 'undefined' || !serverDays) return null
  const activity = loadActivity(userId)
  let changed = false
  for (const [day, serverDay] of Object.entries(serverDays)) {
    const local = activity.days[day] || { activeSeconds: 0, visits: 0 }
    const mergedSeconds = Math.max(Number(local.activeSeconds || 0), Number(serverDay.activeSeconds || 0))
    const mergedVisits = Math.max(Number(local.visits || 0), Number(serverDay.visits || 0))
    if (mergedSeconds !== Number(local.activeSeconds || 0) || mergedVisits !== Number(local.visits || 0)) {
      activity.days[day] = { ...local, activeSeconds: mergedSeconds, visits: mergedVisits }
      changed = true
    }
  }
  if (changed) {
    localStorage.setItem(keyFor(userId), JSON.stringify(activity))
    window.dispatchEvent(new CustomEvent('radyar:activity-updated'))
  }
  return activity
}

export { IDLE_MS }
