import test from 'node:test'
import assert from 'node:assert/strict'
import { berlinDay, practiceDays, shiftDay, streakSummary } from '../lib/kanguruStreak.js'
import { normalizeProgress, mergeProgress } from '../lib/kanguruProgress.js'

test('Berlin dates cross midnight and DST without UTC-day mistakes', () => {
  assert.equal(berlinDay('2026-10-12T22:30:00Z'), '2026-10-13')
  assert.equal(berlinDay('2026-03-29T22:30:00Z'), '2026-03-30')
  assert.equal(shiftDay('2026-03-29', -1), '2026-03-28')
  assert.equal(shiftDay('2026-10-25', 1), '2026-10-26')
})

test('today and yesterday keep a consecutive streak, missed day breaks it', () => {
  const state = { practiceDays: ['2026-10-10', '2026-10-11', '2026-10-12', '2026-10-12'] }
  const now = '2026-10-12T12:00:00Z'
  assert.equal(streakSummary(state, now).current, 3)
  assert.equal(streakSummary(state, now).total, 3)
  assert.equal(streakSummary(state, now).practicedToday, true)
  assert.equal(streakSummary(state, '2026-10-13T12:00:00Z').current, 3)
  assert.equal(streakSummary(state, '2026-10-14T12:00:00Z').current, 0)
})

test('existing answer history restores practice days and longest streak', () => {
  const state = { practiceDays: ['invalid', '2026-02-30', '2026-10-11'], attempts: {
    a: { history: [{ at: '2026-10-09T22:30:00Z' }, { at: 'bad' }] },
    b: { lastAnsweredAt: '2026-10-12T08:00:00Z' },
  } }
  assert.deepEqual(practiceDays(state), ['2026-10-10', '2026-10-11', '2026-10-12'])
  const summary = streakSummary(state, '2026-10-15T08:00:00Z')
  assert.equal(summary.current, 0)
  assert.equal(summary.best, 3)
  assert.equal(summary.week.length, 7)
})

test('teaching mode and future dates do not create a current streak', () => {
  const state = { practiceDays: ['2026-10-20'], attempts: { a: { history: [{ mode: 'teaching', at: '2026-10-12T10:00:00Z' }] } } }
  assert.equal(streakSummary(state, '2026-10-12T12:00:00Z').current, 0)
  assert.equal(streakSummary(state, '2026-10-12T12:00:00Z').total, 0)
})

test('migration and merging keep practice days, answers and newest review flags', () => {
  const remote = { version: 2, attempts: { a: { lastAnsweredAt: '2026-10-10T08:00:00Z', needsReview: true }, b: { lastAnsweredAt: '2026-10-11T08:00:00Z' } } }
  const local = { practiceDays: ['2026-10-12'], attempts: { a: { lastAnsweredAt: '2026-10-10T08:00:00Z', updatedAt: '2026-10-12T10:00:00Z', needsReview: false } } }
  const merged = mergeProgress(local, remote)
  assert.equal(normalizeProgress(remote).version, 3)
  assert.deepEqual(merged.practiceDays, ['2026-10-10', '2026-10-11', '2026-10-12'])
  assert.equal(Object.keys(merged.attempts).length, 2)
  assert.equal(merged.attempts.a.needsReview, false)
  assert.equal(mergeProgress(remote, merged).attempts.a.needsReview, false)
})

test('C2 2025: both valid grids have gray-field sum 2', () => {
  const permutations = items => items.length ? items.flatMap((item, index) => permutations(items.filter((_, i) => i !== index)).map(rest => [item, ...rest])) : [[]]
  const valid = permutations([0, 1, 2, 3]).filter(zeros => zeros[1] === 2
    && zeros.filter((column, row) => column === row).length === 1
    && zeros.filter((column, row) => column === 3 - row).length === 1)
  assert.equal(valid.length, 2)
  valid.forEach(zeros => assert.equal([[0, 1], [2, 0], [2, 3], [3, 1]].reduce((sum, [row, column]) => sum + Number(zeros[row] !== column), 0), 2))
})
