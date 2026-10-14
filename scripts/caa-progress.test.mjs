import test from 'node:test'
import assert from 'node:assert/strict'
import { migrateCAAProgress } from '../lib/caaProgress.mjs'
test('completed legacy diagnosis remains completed', () => assert.deepEqual(migrateCAAProgress(['grundlagen', 'mrt-def', 'boston', 'differenzial']), ['grundlagen', 'differenzial', 'mrt-diagnostik']))
test('a partially read legacy diagnosis is not marked completed', () => {
  for (const id of ['mrt-def', 'boston']) assert.deepEqual(migrateCAAProgress(['klinik', id]), ['klinik'])
})
test('current progress remains stable', () => assert.deepEqual(migrateCAAProgress(['grundlagen', 'mrt-diagnostik']), ['grundlagen', 'mrt-diagnostik']))
test('migration is idempotent', () => { const once = migrateCAAProgress(['mrt-def', 'boston']); assert.deepEqual(migrateCAAProgress(once), once) })
