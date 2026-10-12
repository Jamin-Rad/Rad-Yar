import test from 'node:test'
import assert from 'node:assert/strict'
import { createKanguruHandlers } from '../lib/kanguruStore.js'

test('all handlers reject unauthenticated requests before accessing storage', async () => {
  let touched = false
  const handlers = createKanguruHandlers(async () => ({ error: 'Not allowed', status: 401 }), {
    available: true, read: async () => { touched = true }, write: async () => { touched = true },
  })
  for (const method of ['GET', 'PATCH', 'DELETE']) assert.equal((await handlers[method]()).status, 401)
  assert.equal(touched, false)
})

test('cloud roundtrip preserves old answers, migrates days, merges new streak and review state', async () => {
  let row = { version: 2, attempts: { old: { lastAnsweredAt: '2026-10-11T09:00:00Z' } }, updatedAt: '2026-10-11T09:00:00Z' }
  const handlers = createKanguruHandlers(async () => ({ ownerId: 'test-only' }), {
    available: true,
    read: async id => { assert.equal(id, 'test-only'); return row },
    write: async (id, state) => { assert.equal(id, 'test-only'); row = state; return row },
  })
  const request = new Request('http://localhost/test', { method: 'PATCH', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ state: {
    attempts: { new: { lastAnsweredAt: '2026-10-12T09:00:00Z' } }, practiceDays: ['2026-10-12'], updatedAt: '2026-10-12T09:00:00Z',
  } }) })
  assert.equal((await handlers.PATCH(request)).status, 200)
  const payload = await (await handlers.GET()).json()
  assert.equal(Object.keys(payload.state.attempts).length, 2)
  assert.deepEqual(payload.state.practiceDays, ['2026-10-11', '2026-10-12'])
  assert.equal(payload.state.version, 3)
  assert.equal((await handlers.PATCH(new Request('http://localhost/test', { method: 'PATCH', body: 'bad json' }))).status, 400)
})

test('missing storage reports failure instead of pretending to save', async () => {
  const handlers = createKanguruHandlers(async () => ({ ownerId: 'test-only' }), { available: false })
  assert.equal((await handlers.GET()).status, 503)
})
