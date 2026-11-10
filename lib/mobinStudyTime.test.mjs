import assert from 'node:assert/strict'
import test from 'node:test'
import { berlinStudyDay, mergeStudySessions, studySectionFromPath, studySummary, validStudySession } from './mobinStudyTime.js'

const id = 'study-time:2026-11-10:123e4567-e89b-42d3-a456-426614174000'

test('learning pages map to a subject while planning pages do not count as study', () => {
  assert.equal(studySectionFromPath('/mobin/english/vokabeltest'), 'english')
  assert.equal(studySectionFromPath('/mobin/mathepruefung'), 'math')
  assert.equal(studySectionFromPath('/mobin/kaenguru'), 'kangaroo')
  assert.equal(studySectionFromPath('/mobin/pruefungsvorbereitung'), 'preparation')
  assert.equal(studySectionFromPath('/mobin/tagesplan'), null)
})

test('Berlin dates handle midnight independently of UTC', () => {
  assert.equal(berlinStudyDay(new Date('2026-11-10T23:30:00Z')), '2026-11-11')
  assert.equal(berlinStudyDay(new Date('2026-07-10T22:30:00Z')), '2026-07-11')
})

test('local and remote copies of one session count only the largest duration', () => {
  const remote = { id, day: '2026-11-10', section: 'english', seconds: 80 }
  const local = { ...remote, seconds: 95 }
  assert.equal(validStudySession(remote), true)
  assert.equal(validStudySession({ ...remote, section: 'unknown' }), false)
  assert.equal(validStudySession({ ...remote, seconds: -1 }), false)
  const merged = mergeStudySessions([remote], [local])
  assert.deepEqual(merged, [local])
  assert.equal(studySummary(merged, ['2026-11-10'])['2026-11-10'].total, 95)
  assert.equal(studySummary(merged, ['2026-11-10'])['2026-11-10'].sections.english, 95)
})
