import test from 'node:test'
import assert from 'node:assert/strict'
import { berlinNow, todayDuties, todayEvents, todayNutrition, loadTodaySources } from '../utils/andarunToday.js'
import { calculateCaloriePlan } from '../utils/healthCalories.js'
import { getBadenWuerttembergCalendarEntriesInRange } from '../utils/germanPublicHolidays.js'

const date = '2026-10-13'
const foods = [{ id: 'rice', kcalPer100g: 130, portionG: 200 }]
const plan = { currentWeight: '80', targetWeight: '75', height: '180', age: '40', sex: 'male', activity: 'moderate', weeks: '12' }

test('today uses Berlin rather than the server or browser timezone, including DST', () => {
  assert.deepEqual(berlinNow(new Date('2026-10-12T22:30:00Z')), { date, time: '00:30' })
  assert.deepEqual(berlinNow(new Date('2026-12-31T23:30:00Z')), { date: '2027-01-01', time: '00:30' })
  assert.deepEqual(berlinNow(new Date('2026-03-29T01:30:00Z')), { date: '2026-03-29', time: '03:30' })
})

test('today shows actual times, absences and an ongoing previous night, without inventing a shift', () => {
  const shifts = [
    { id: 'night', date: '2026-10-12', model: 'N', duty: 'BD1', plannedStart: '11:00', plannedEnd: '08:00' },
    { id: 'today', date, model: 'T', plannedStart: '07:30', plannedEnd: '16:00', actualStart: '08:00', actualEnd: '16:30' },
    { id: 'absence', date, model: 'U' },
    { id: 'tomorrow', date: '2026-10-14', model: 'S' },
  ]
  const result = todayDuties(shifts, { date, time: '00:30' })
  assert.equal(result[0].label, 'Nachtdienst')
  assert.equal(result[0].carryover, true)
  assert.equal(result.find(item => item.id === 'today').start, '08:00')
  assert.equal(result.find(item => item.id === 'absence').label, 'Urlaub')
  assert.equal(todayDuties(shifts, { date, time: '08:00' }).some(item => item.id === 'night'), false)
  assert.deepEqual(todayDuties([], { date, time: '12:00' }), [])
})

test('appointments exclude tasks/completed events, span all-day ranges and sort by actual time', () => {
  const result = todayEvents([
    { id: 'late', itemType: 'event', deadline: date, eventTime: '15:00', title: 'Später' },
    { id: 'early', itemType: 'event', deadline: date, eventTime: '09:00', title: 'Früher' },
    { id: 'range', itemType: 'event', deadline: '2026-10-11', endDate: date, allDay: true, title: 'Mehrere Tage' },
    { id: 'old', itemType: 'event', deadline: '2026-10-10', endDate: '2026-10-12', allDay: true },
    { id: 'todo', itemType: 'todo', deadline: date },
    { id: 'done', itemType: 'event', deadline: date, done: true },
  ], date)
  assert.deepEqual(result.map(item => item.id), ['range', 'early', 'late'])
})

test('existing BW holidays and school ranges are included without duplicated imported holidays', () => {
  const day = '2026-12-25'
  const holidays = getBadenWuerttembergCalendarEntriesInRange(day, day)
  const christmas = holidays.find(item => item.title === '1. Weihnachtstag')
  assert.ok(christmas)
  const events = todayEvents([{ id: 'import', itemType: 'event', deadline: day, title: christmas.title, allDay: true }], day, holidays)
  assert.equal(events.filter(item => item.title === christmas.title).length, 1)
  assert.ok(events.some(item => item.itemType === 'schoolHoliday'))
})

test('nutrition sums grams, portions, custom foods and manual calories for today only', () => {
  const state = {
    caloriePlan: plan,
    customFoods: [{ id: 'custom', kcal_per_100g: 100, portion_g: 50 }],
    records: [
      { date, foods: [{ id: 'rice', g: 100 }, { id: 'rice', count: 1 }, { id: 'custom', count: 2 }], manual_kcal: '50', sports: [{ id: 'running', min: 60 }] },
      { date: '2026-10-12', foods: [{ id: 'rice', g: 2000 }], manual_kcal: 100 },
    ],
  }
  const result = todayNutrition(state, date, foods)
  assert.equal(result.eatenKcal, 540)
  assert.equal(result.targetKcal, calculateCaloriePlan(plan).recommendedKcal)
  assert.equal(result.remainingKcal, result.targetKcal - 540)
  assert.equal(result.complete, true)
  assert.equal(result.hasRecord, true)
})

test('missing goal stays unknown, empty records do not fake yesterday intake, over-goal is explicit', () => {
  const empty = todayNutrition({ records: [{ date: '2026-10-12', manual_kcal: 1800 }] }, date, foods)
  assert.equal(empty.eatenKcal, 0)
  assert.equal(empty.remainingKcal, null)
  assert.equal(empty.hasRecord, false)
  const over = todayNutrition({ caloriePlan: plan, records: [{ date, manual_kcal: 9999 }] }, date, foods)
  assert.equal(over.remainingKcal, 0)
  assert.equal(over.overKcal, 9999 - over.targetKcal)
})

test('unknown or deleted foods do not silently become a trustworthy zero-calorie budget', () => {
  for (const state of [
    { records: [{ date, foods: [{ id: 'missing', g: 100 }] }] },
    { deletedFoods: ['rice'], records: [{ date, foods: [{ id: 'rice', g: 100 }] }] },
  ]) {
    const result = todayNutrition({ ...state, caloriePlan: plan }, date, foods)
    assert.equal(result.complete, false)
    assert.equal(result.remainingKcal, null)
  }
})

test('shared calorie calculation preserves the existing health-page formula', () => {
  for (const sex of ['male', 'female']) for (const activity of ['low', 'light', 'moderate', 'high']) {
    const input = { ...plan, sex, activity }
    const factor = { low: 1.2, light: 1.375, moderate: 1.55, high: 1.725 }[activity]
    const maintenance = Math.round(Math.round(10 * 80 + 6.25 * 180 - 5 * 40 + (sex === 'female' ? -161 : 5)) * factor)
    const delta = Math.round(((75 - 80) * 7700) / (12 * 7))
    assert.equal(calculateCaloriePlan(input).recommendedKcal, Math.max(sex === 'female' ? 1200 : 1500, maintenance + delta))
  }
  assert.equal(calculateCaloriePlan({}).recommendedKcal, null)
  assert.equal(calculateCaloriePlan({ ...plan, currentWeight: '' }, { latestWeight: '80' }).recommendedKcal, calculateCaloriePlan(plan).recommendedKcal)
})

test('source reads start in parallel, use GET/no-store and report partial failures independently', async () => {
  const started = []
  const results = {}
  const pending = []
  const fetcher = (url, options) => {
    started.push(url)
    assert.equal(options.cache, 'no-store')
    assert.equal(options.method, undefined)
    return new Promise(resolve => pending.push(() => resolve({ ok: !url.includes('health'), json: async () => url.includes('work') ? { shifts: [] } : { todos: [] } })))
  }
  const loading = loadTodaySources(fetcher, undefined, (key, result) => { results[key] = result })
  assert.equal(started.length, 3)
  pending.forEach(resolve => resolve())
  await loading
  assert.equal(results.work.status, 'ready')
  assert.equal(results.events.status, 'ready')
  assert.equal(results.health.status, 'error')
  assert.equal(results.health.data, null)
})

test('malformed payloads and rejected requests stay errors; aborted/stale requests cannot update UI', async () => {
  const results = []
  await loadTodaySources(async () => ({ ok: true, json: async () => ({}) }), undefined, (key, result) => results.push(result))
  assert.ok(results.every(item => item.status === 'error'))
  const controller = new AbortController()
  controller.abort()
  await loadTodaySources(async () => { throw new Error('offline') }, controller.signal, () => assert.fail('Aborted update'))
})
