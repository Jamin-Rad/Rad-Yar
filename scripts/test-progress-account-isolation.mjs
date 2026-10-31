import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import vm from 'node:vm'
import { activateUserCache } from '../utils/progressCache.js'
import { syncLocalProgressToServer } from '../utils/syncProgressToServer.js'
import { pullReadStatusFromServer } from '../utils/readStatus.js'
import { queueProgressWrite, flushPendingProgress, pendingProgressEntries } from '../utils/progressSync.js'
import { readVersion } from '../utils/readProgressStore.js'

class Storage {
  data = new Map()
  get length() { return this.data.size }
  key(index) { return [...this.data.keys()][index] ?? null }
  getItem(key) { return this.data.get(key) ?? null }
  setItem(key, value) { this.data.set(key, String(value)) }
  removeItem(key) { this.data.delete(key) }
}
const json = (key, fallback = {}) => JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback))
const put = (key, value) => localStorage.setItem(key, JSON.stringify(value))
const response = data => ({ ok: true, json: async () => data })
function reset() {
  globalThis.localStorage = new Storage()
  globalThis.sessionStorage = new Storage()
  globalThis.window = { dispatchEvent() {} }
  globalThis.fetch = async () => response({})
}
const cases = []
async function check(name, fn) { reset(); await fn(); cases.push(name); console.log(`PASS ${name}`) }

await check('unowned legacy progress is preserved but never attributed to a new account', async () => {
  put('radyar_read_articles', { haemangiom: 1 })
  put('radyar_learning_history', [{ topicId: 'haemangiom', learnedAt: '2026-07-01' }])
  put('radyar_mcq_scores', { old: { correct: 5 } })
  const uploads = []
  globalThis.fetch = async (url, options) => {
    if (url.endsWith('/activity')) return response({ version: 2, sources: [], legacyDays: {} })
    if (options.method === 'POST') uploads.push(JSON.parse(options.body))
    return response({})
  }
  await syncLocalProgressToServer('new-account', { force: true, throwOnError: true })
  assert.deepEqual(json('radyar_read_articles'), {})
  assert.deepEqual(json('radyar_learning_history', []), [])
  assert.deepEqual(json('radyar_mcq_scores'), {})
  assert.deepEqual(json('radyar_read_articles_unclaimed'), { haemangiom: 1 })
  assert.deepEqual(uploads, [])
})

await check('A -> B -> signed out -> A preserves separate caches and scoped settings', async () => {
  activateUserCache('A')
  put('radyar_read_articles', { A_lesson: 1 })
  put('radyar_settings_A', { mcqDailyGoal: 25 })
  activateUserCache('B')
  assert.deepEqual(json('radyar_read_articles'), {})
  put('radyar_read_articles', { B_lesson: 1 })
  activateUserCache(null)
  assert.deepEqual(json('radyar_read_articles'), {})
  put('radyar_read_articles', { guest_lesson: 1 })
  activateUserCache('A')
  assert.deepEqual(json('radyar_read_articles'), { A_lesson: 1 })
  assert.deepEqual(json('radyar_settings_A'), { mcqDailyGoal: 25 })
  activateUserCache('B')
  assert.deepEqual(json('radyar_read_articles'), { B_lesson: 1 })
})

await check('known scoped offline data survives first activation', async () => {
  put('radyar_read_articles_A', { own: 1 })
  put('radyar_read_articles', { unknown: 1 })
  activateUserCache('A')
  assert.deepEqual(json('radyar_read_articles'), { own: 1 })
})

await check('legacy, guest and another account pending writes cannot upload into B', async () => {
  put('radyar_pending_progress', { legacy: { endpoint: '/legacy', payload: {} } })
  queueProgressWrite('read:a', '/read', { themaId: 'a', read: true }, 'A')
  queueProgressWrite('read:guest', '/read', { themaId: 'guest', read: true }, null)
  activateUserCache('B')
  const requests = []
  globalThis.fetch = async (url, options) => { requests.push({ url, options }); return response({}) }
  assert.equal(await flushPendingProgress('B'), true)
  assert.deepEqual(requests, [])
  activateUserCache('A')
  assert.equal(await flushPendingProgress('A'), true)
  assert.equal(requests.length, 1)
  assert.equal(requests[0].options.headers['X-Radyar-User-Id'], 'A')
  assert.equal(pendingProgressEntries('A').length, 0)
  assert.ok(localStorage.getItem('radyar_pending_progress'))
})

await check('an in-flight reconciliation cannot merge or upload after an account switch', async () => {
  let resolvePull
  const gate = new Promise(resolve => { resolvePull = resolve })
  const uploads = []
  globalThis.fetch = async (url, options) => {
    if (options.method === 'POST') { uploads.push(options); return response({}) }
    await gate
    return response({ read: { A_lesson: true }, history: [{ topicId: 'A_lesson' }] })
  }
  const pending = syncLocalProgressToServer('A', { force: true, throwOnError: true })
  activateUserCache('B')
  resolvePull()
  assert.equal(await pending, null)
  assert.deepEqual(json('radyar_read_articles'), {})
  assert.deepEqual(uploads, [])
})

await check('late read pull is discarded even after A -> B -> A', async () => {
  let resolvePull
  globalThis.fetch = () => new Promise(resolve => { resolvePull = resolve })
  const pending = pullReadStatusFromServer('A')
  activateUserCache('B')
  activateUserCache('A')
  resolvePull(response({ read: { stale: true } }))
  assert.equal(await pending, null)
  assert.deepEqual(json('radyar_read_articles'), {})
})

await check('server unread corrections remove stale local checks and history', async () => {
  activateUserCache('A')
  put('radyar_read_articles', { haemangiom: 1, own: 1 })
  put('radyar_learning_history', [{ topicId: 'haemangiom' }, { topicId: 'own' }])
  globalThis.fetch = async () => response({ read: { haemangiom: false } })
  const result = await pullReadStatusFromServer('A')
  assert.deepEqual(result.articles, { own: 1 })
  assert.deepEqual(result.history, [{ topicId: 'own', learnedAt: '1970-01-01T00:00:00.000Z' }])
})

await check('flushing stops on account switch and retains newer queued edits', async () => {
  activateUserCache('A')
  queueProgressWrite('read:a', '/read', { themaId: 'a', read: true }, 'A')
  queueProgressWrite('read:b', '/read', { themaId: 'b', read: true }, 'A')
  let resolveWrite
  globalThis.fetch = () => new Promise(resolve => { resolveWrite = resolve })
  const pending = flushPendingProgress('A')
  queueProgressWrite('read:a', '/read', { themaId: 'a', read: false }, 'A')
  activateUserCache('B')
  resolveWrite(response({}))
  assert.equal(await pending, false)
  assert.ok(pendingProgressEntries('A').some(entry => entry.item.payload.themaId === 'a' && entry.item.payload.read === false))
  assert.ok(pendingProgressEntries('A').some(entry => entry.item.payload.themaId === 'b'))
})

// Exercise the real identity resolver and API handlers with a changed Clerk
// session: the account hint must be checked before any database access.
await check('all progress APIs reject requests made for a different Clerk account', async () => {
  const context = vm.createContext({ console })
  const modules = new Map()
  function synthetic(name, values) {
    const mod = new vm.SyntheticModule(Object.keys(values), function () {
      for (const [key, value] of Object.entries(values)) this.setExport(key, value)
    }, { context, identifier: name })
    modules.set(name, mod)
    return mod
  }
  synthetic('@clerk/nextjs/server', {
    auth: async () => ({ userId: 'B' }),
    currentUser: async () => { throw new Error('Mismatched account should return before user lookup') },
  })
  synthetic('@/lib/emailIdentity', { canonicalUserEmail: () => '', primaryEmailFromUser: () => '' })
  synthetic('@/utils/readProgressStore', { readVersion })
  synthetic('next/server', { NextResponse: { json: (body, options) => ({ body, status: options?.status || 200 }) } })
  synthetic('@/lib/supabase/server', {
    isSupabaseAdminConfigured: true,
    supabaseAdmin: { from() { throw new Error('Mismatched account must never access database') } },
  })
  const identity = new vm.SourceTextModule(await readFile(new URL('../lib/userIdentity.js', import.meta.url), 'utf8'), { context })
  modules.set('@/lib/userIdentity', identity)
  await identity.link(name => modules.get(name))
  await identity.evaluate()
  for (const endpoint of ['read-status', 'mcq-results', 'leitner']) {
    const route = new vm.SourceTextModule(await readFile(new URL(`../app/api/progress/${endpoint}/route.js`, import.meta.url), 'utf8'), { context })
    await route.link(name => modules.get(name))
    await route.evaluate()
    const request = { headers: { get: () => 'A' } }
    assert.equal((await route.namespace.GET(request)).status, 401)
    assert.equal((await route.namespace.POST(request)).status, 401)
  }
})
console.log(`${cases.length} account-isolation regression tests passed.`)
