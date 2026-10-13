import { calculateCaloriePlan, foodCaloriesForRecord } from './healthCalories.js'

export function berlinNow(now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Berlin', year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).formatToParts(now)
  const values = Object.fromEntries(parts.map(part => [part.type, part.value]))
  return { date: `${values.year}-${values.month}-${values.day}`, time: `${values.hour}:${values.minute}` }
}

export function todayDuties(shifts, { date, time }) {
  const yesterday = new Date(Date.parse(`${date}T12:00:00Z`) - 86400000).toISOString().slice(0, 10)
  const labels = { T: 'Tagdienst', S: 'Spätdienst', BD: 'Tagdienst', N: 'Nachtdienst', U: 'Urlaub', K: 'Krank', F: 'Fortbildung', TZ: 'Teilzeitarbeit' }
  return (Array.isArray(shifts) ? shifts : []).flatMap(shift => {
    if (!shift || typeof shift.date !== 'string') return []
    const start = shift.actualStart || shift.plannedStart || ''
    const end = shift.actualEnd || shift.plannedEnd || ''
    const overnight = Boolean(start && end && end < start)
    const carryover = shift.date === yesterday && overnight && time < end
    if (shift.date !== date && !carryover) return []
    return [{ ...shift, start, end, overnight, carryover, label: labels[shift.model] || shift.duty || 'Dienst' }]
  }).sort((a, b) => Number(b.carryover) - Number(a.carryover) || a.start.localeCompare(b.start))
}

export function todayEvents(todos, date, holidays = []) {
  const events = (Array.isArray(todos) ? todos : []).filter(item => {
    if (item?.itemType !== 'event' || item.done || item.cancelled || !item.deadline) return false
    return item.deadline === date || (item.allDay && item.deadline < date && item.endDate >= date)
  }).map(item => ({ ...item, date: item.deadline, startTime: item.allDay ? '' : item.eventTime || '' }))
  const existing = new Set(events.map(item => `${item.date}\u0000${item.title}`))
  return [...events, ...holidays.filter(item => !existing.has(`${item.date}\u0000${item.title}`))]
    .sort((a, b) => Number(Boolean(b.allDay)) - Number(Boolean(a.allDay)) || a.startTime.localeCompare(b.startTime) || String(a.title).localeCompare(String(b.title), 'de'))
}

export function todayNutrition(data, date, baseFoods) {
  const records = Array.isArray(data.records) ? data.records : []
  const record = records.find(item => item?.date === date)
  const deleted = new Set(Array.isArray(data.deletedFoods) ? data.deletedFoods : [])
  const foods = [...baseFoods.filter(food => !deleted.has(food.id)), ...(Array.isArray(data.customFoods) ? data.customFoods : []).filter(Boolean).map(food => ({
    id: food.id, kcalPer100g: food.kcal_per_100g, portionG: food.portion_g || 100,
  }))]
  const { eatenKcal, unknownFoods } = foodCaloriesForRecord(record, foods)
  const latestWeight = records.filter(item => item?.weight && typeof item.date === 'string' && item.date <= date).sort((a, b) => b.date.localeCompare(a.date))[0]?.weight || ''
  const { recommendedKcal } = calculateCaloriePlan(data.caloriePlan || {}, { todayWeight: record?.weight, latestWeight })
  const targetKcal = Number.isFinite(recommendedKcal) && recommendedKcal > 0 ? recommendedKcal : null
  const complete = unknownFoods === 0
  return {
    eatenKcal, targetKcal, complete, hasRecord: Boolean(record),
    remainingKcal: targetKcal && complete ? Math.max(0, targetKcal - eatenKcal) : null,
    overKcal: targetKcal && complete ? Math.max(0, eatenKcal - targetKcal) : 0,
  }
}

export const TODAY_SOURCES = { work: '/api/andarun/work', events: '/api/andarun/todos', health: '/api/andarun/health' }

// Three independent reads: one unavailable service must not blank the other panels.
export async function loadTodaySources(fetcher, signal, onResult) {
  await Promise.all(Object.entries(TODAY_SOURCES).map(async ([key, url]) => {
    try {
      const response = await fetcher(url, { cache: 'no-store', signal })
      if (!response.ok) throw new Error('Daten konnten nicht geladen werden.')
      const data = await response.json()
      if (data?.error || !data || typeof data !== 'object') throw new Error('Ungültige Daten.')
      const requiredArray = { work: 'shifts', events: 'todos', health: 'records' }[key]
      if (!Array.isArray(data[requiredArray])) throw new Error('Unvollständige Daten.')
      if (!signal?.aborted) onResult(key, { status: 'ready', data })
    } catch (error) {
      if (!signal?.aborted && error?.name !== 'AbortError') onResult(key, { status: 'error', data: null })
    }
  }))
}
