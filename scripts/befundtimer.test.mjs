import test from 'node:test'
import assert from 'node:assert/strict'
import { weekDates, serviceDate, historyRecords, totals, editForm, editedTimer, shiftDescription } from '../app/andarun/befundtimer/timerModel.js'

test('the complete history includes old sessions, filters inclusively and uses weighted averages', () => {
  const records = [
    { id: 'old', date: '2024-01-01', modality: 'CT', count: 3, durationMs: 1800000 },
    { id: 'new', date: '2026-10-29', modality: 'MRT', count: 1, durationMs: 600000 },
    { id: 'mid', date: '2026-10-01', modality: 'CT', count: 2, durationMs: 600000 },
  ]
  assert.deepEqual(historyRecords(records).map(r => r.id), ['new', 'mid', 'old'])
  assert.deepEqual(historyRecords(records, { from: '2026-10-01', to: '2026-10-29', modality: 'CT' }).map(r => r.id), ['mid'])
  assert.deepEqual(totals(records), { count: 6, totalMs: 3000000, avg: 500000 })
  assert.equal(records[0].id, 'old')
})
test('weeks cross month and year boundaries and always start on Monday', () => {
  assert.deepEqual(weekDates('2026-10-29'), ['2026-10-26','2026-10-27','2026-10-28','2026-10-29','2026-10-30','2026-10-31','2026-11-01'])
  assert.deepEqual(weekDates('2027-01-01'), ['2026-12-28','2026-12-29','2026-12-30','2026-12-31','2027-01-01','2027-01-02','2027-01-03'])
})
test('morning timers retain the preceding night service day in Berlin even across DST', () => {
  const shifts = [{ date: '2026-10-24', model: 'N' }]
  assert.equal(serviceDate(Date.parse('2026-10-25T07:00:00Z'), shifts, []), '2026-10-24')
  assert.equal(serviceDate(Date.parse('2026-10-25T11:00:00Z'), shifts, []), '2026-10-25')
  assert.equal(serviceDate(Date.parse('2026-10-25T07:00:00Z'), [], []), '2026-10-25')
  assert.equal(serviceDate(Date.parse('2026-10-25T07:00:00Z'), [], [{ date: '2026-10-24', createdAt: 'invalid' }]), '2026-10-25')
  assert.equal(serviceDate(Date.parse('2026-10-25T07:00:00Z'), [], [{ date: '2026-10-24', createdAt: '2026-10-24T20:30:00Z' }]), '2026-10-24')
})
test('typed correction preserves identity and other metadata and validates seconds and counts', () => {
  const original = { id: 'timer-1', date: '2026-10-29', modality: 'CT', durationMs: 1800000, count: 3, createdAt: '2026-10-29T08:00:00Z', note: 'retained', examArea: 'Thorax' }
  const form = { ...editForm(original), minutes: '12', seconds: '34', count: '2' }
  const edited = editedTimer(original, form)
  assert.equal(edited.durationMs, 754000)
  assert.equal(edited.count, 2)
  assert.equal(edited.id, original.id)
  assert.equal(edited.note, original.note)
  assert.equal(edited.createdAt, original.createdAt)
  for (const changes of [{ seconds: '60' }, { minutes: '-1' }, { minutes: '' }, { minutes: '1.5' }, { minutes: '0', seconds: '0' }, { count: '21' }, { count: '0' }, { date: '2026-02-31' }]) {
    assert.throws(() => editedTimer(original, { ...form, ...changes }))
  }
})
test('weekly service context uses the saved plan and assignment', () => {
  assert.equal(shiftDescription({ model: 'S', plannedStart: '11:00', plannedEnd: '19:30', assignment: 'CT' }), 'Spätdienst · 11:00–19:30 · CT')
  assert.equal(shiftDescription({ model: 'U' }), 'Urlaub')
})
