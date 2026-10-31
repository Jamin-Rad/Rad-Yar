export const ACTIVITY_CATEGORIES = ['lessons', 'practice', 'flashcards', 'other']
const count = value => Math.max(0, Math.floor(Number(value) || 0))

export function activityDay(day = {}) {
  const categories = Object.fromEntries(ACTIVITY_CATEGORIES.map(key => [key, count(day.categories?.[key])]))
  const sum = Object.values(categories).reduce((a, b) => a + b, 0)
  categories.other += Math.max(0, count(day.activeSeconds) - sum)
  return { activeSeconds: Object.values(categories).reduce((a, b) => a + b, 0), categories, visits: count(day.visits) }
}

export function maxActivityDay(left, right) {
  const a = activityDay(left), b = activityDay(right)
  return activityDay({ categories: Object.fromEntries(ACTIVITY_CATEGORIES.map(key => [key, Math.max(a.categories[key], b.categories[key])])), visits: Math.max(a.visits, b.visits) })
}

export function aggregateActivity(legacyDays, sources) {
  const days = Object.fromEntries(Object.entries(legacyDays).map(([day, value]) => [day, activityDay(value)]))
  const unique = new Map()
  for (const source of sources) {
    const key = `${source.sourceId}:${source.day}`
    const previous = unique.get(key)
    unique.set(key, { ...source, ...maxActivityDay(previous, source) })
  }
  for (const source of unique.values()) {
    const day = days[source.day] || activityDay()
    for (const key of ACTIVITY_CATEGORIES) day.categories[key] += source.categories[key]
    day.activeSeconds += source.activeSeconds
    day.visits += source.visits
    days[source.day] = day
  }
  return days
}

export function activityRow(row) {
  return { sourceId: row.source_id, day: row.day, ...activityDay({
    activeSeconds: row.active_seconds,
    visits: row.visits,
    categories: Object.fromEntries(ACTIVITY_CATEGORIES.map(key => [key, row[`${key}_seconds`]])),
  }) }
}
