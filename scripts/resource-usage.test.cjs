const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const vm = require('node:vm')
const { transformSync } = require('esbuild')
const root = path.resolve(__dirname, '..')
function storage() {
  const values = new Map()
  return { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value), removeItem: key => values.delete(key) }
}
function emitter(extra = {}) {
  const handlers = new Map()
  return { ...extra, addEventListener(name, handler) { if (!handlers.has(name)) handlers.set(name, new Set()); handlers.get(name).add(handler) }, removeEventListener(name, handler) { handlers.get(name)?.delete(handler) }, emit(name) { for (const handler of handlers.get(name) || []) handler() } }
}
function load(source, mocks, globals = {}) {
  const module = { exports: {} }
  const code = transformSync(source, { loader: 'jsx', format: 'cjs', jsx: 'automatic' }).code
  const context = vm.createContext({ module, exports: module.exports, console, Date, URL, Response, setTimeout, clearTimeout, ...globals,
    require(name) { if (name === 'react/jsx-runtime') return { jsx: () => null, jsxs: () => null }; if (name in mocks) return mocks[name]; throw new Error('Unexpected module: ' + name) } })
  vm.runInContext(code, context)
  return module.exports
}
const read = name => fs.readFileSync(path.join(root, name), 'utf8')
test('copy permission makes no guest request, retains signed-in verification', async () => {
  for (const signedIn of [false, true]) {
    const effects = [], requests = []
    const component = load(read('components/AdminCopyMode.jsx'), {
      react: { useEffect: e => effects.push(e), useState: () => [false, () => {}] },
      '@clerk/nextjs': { useUser: () => ({ isLoaded: true, user: signedIn ? { id: 'user', emailAddresses: [] } : null }) },
      '@/lib/copyPermission': { hasCopyAllowedEmail: () => false },
    }, { fetch: async url => { requests.push(url); return { json: async () => ({ canCopy: false }) } } }).default
    component(); effects[0]()
    await new Promise(resolve => setImmediate(resolve))
    assert.equal(requests.length, signedIn ? 1 : 0)
  }
})
test('health loads the existing calorie plan with a single authenticated API request', async () => {
  for (const apiBase of ['/api/andarun/health', '/api/fatima/health']) {
    const effects = [], updates = [], requests = []
    const plan = { currentWeight: '75', injectionDay: '4', injectionDoneDates: ['2026-11-05'] }
    const component = load(read('app/admin/health/HealthPage.js'), {
      react: { useEffect: e => effects.push(e), useRef: value => ({ current: value }), useState: value => [value, next => updates.push(next)] },
      'next/link': {}, 'next/dynamic': () => () => null, './health.module.css': {},
      './HealthTodayOverview': { default: () => null, HealthIcon: () => null },
      '@/utils/healthCalories': load(read('utils/healthCalories.js'), { './foodPhotoMeals.js': load(read('utils/foodPhotoMeals.js'), {}) }),
      '@/utils/foodPhotoMeals': load(read('utils/foodPhotoMeals.js'), {}),
      '@/data/health': { sportarten: [], sportKategorien: [], lebensmittel: [], kategorien: [] },
    }, { fetch: async url => { requests.push(url); return { ok: true, json: async () => ({ records: [], caloriePlan: plan }) } } }).default
    component({ apiBase }); effects[0]()
    await new Promise(resolve => setImmediate(resolve))
    assert.deepEqual(requests, [apiBase + '/'])
    const loadedPlan = updates.find(value => value?.injectionDay === '4')
    assert.equal(loadedPlan.currentWeight, plan.currentWeight)
    assert.deepEqual(loadedPlan.injectionDoneDates, plan.injectionDoneDates)
  }
})
function progressSync(localScores, remoteScores, localCards, remoteCards) {
  const local = storage(), requests = []
  local.setItem('radyar_mcq_scores', JSON.stringify(localScores))
  local.setItem('radyar_leitner_test-user', JSON.stringify(localCards))
  const sync = load(read('utils/syncProgressToServer.js'), {
    './progressCache.js': { activateUserCache() {}, getUserCacheToken: () => 'token', isUserCacheCurrent: () => true, persistCurrentUserCache() {} },
    './readProgressStore.js': { mergeReadState: () => ({ state: { records: {} }, server: { records: {} } }), readVersion: () => 0 },
    './progressSync.js': { flushPendingProgress: async () => true },
    './activityStorage.js': { syncActivityToServer: async () => ({}) },
  }, { window: { dispatchEvent() {} }, navigator: { onLine: true }, CustomEvent: class {}, localStorage: local, sessionStorage: storage(),
    fetch: async (url, options = {}) => { requests.push({ url, options }); return { ok: true, json: async () => url.includes('mcq-results') ? { scores: remoteScores } : url.includes('leitner') ? { cards: remoteCards } : {} } },
  })
  return { sync: sync.syncLocalProgressToServer, requests }
}
test('stops repeatedly writing unchanged quizzes and cards', async () => {
  const scores = { lesson: { attempted: 4, correct: 3, lastDate: '2026-11-04T10:00:00Z' } }
  const cards = { card: { id: 'card', box: 2, lastReviewedAt: '2026-11-04T10:00:00Z' } }
  {
    const h = progressSync(scores, scores, cards, cards)
    await h.sync('test-user'); await h.sync('test-user')
    assert.equal(h.requests.filter(r => r.options.method === 'POST').length, 0)
    assert.equal(h.requests.filter(r => !r.options.method).length, 6)
  }
})
test('uploads only changed records and keeps newer server progress', async () => {
  const oldDate = '2026-11-03T10:00:00Z', newDate = '2026-11-04T10:00:00Z'
  const remote = { same: { attempted: 2, lastDate: newDate }, newer: { attempted: 3, lastDate: newDate } }
  const local = { same: remote.same, newer: { attempted: 1, lastDate: oldDate }, added: { attempted: 4, lastDate: newDate } }
  const remoteCards = { same: { box: 2, lastReviewedAt: newDate }, newer: { box: 3, lastReviewedAt: newDate } }
  const localCards = { same: remoteCards.same, newer: { box: 1, lastReviewedAt: oldDate }, added: { box: 4, lastReviewedAt: newDate } }
  const h = progressSync(local, remote, localCards, remoteCards)
  await h.sync('test-user')
  const posts = h.requests.filter(r => r.options.method === 'POST')
  assert.equal(posts.length, 2)
  for (const post of posts) assert.deepEqual(Object.keys(JSON.parse(post.options.body).bulk), ['added'])
})
test('pauses hidden-tab polling and resumes immediately on visibility', () => {
  const effects = [], callbacks = [], doc = emitter({ visibilityState: 'visible' })
  let syncs = 0
  const win = emitter({ setInterval: fn => { callbacks.push(fn); return fn }, clearInterval() {} })
  const component = load(read('components/ActivityTracker.jsx'), {
    react: { useEffect: e => effects.push(e), useState: () => [false, () => {}] },
    '@clerk/nextjs': { useUser: () => ({ isLoaded: true, user: { id: 'test-user' } }) },
    'next/navigation': { usePathname: () => '/' },
    '@/utils/activityStorage': { addActiveSeconds() {}, registerVisit() {}, syncActivityToServer: async () => {}, IDLE_MS: 120000 },
    '@/utils/activityCategory': { getActivityCategory: () => 'learning' },
    '@/utils/studyTimer': { createStudyTimer: () => ({ tick() {}, stop() {} }) },
    '@/utils/syncProgressToServer': { activateUserCache() {}, syncLocalProgressToServer: () => { syncs++ } },
    '@/utils/progressCache': { isUserCacheCurrent: () => true, getUserCacheToken: () => 'token' },
    '@/components/LegalNotice': { readPrivacyChoice: () => ({ analytics: false }), PRIVACY_CHOICE_EVENT: 'privacy' },
    '@/utils/calculatorAnalytics': {},
  }, { window: win, document: doc, navigator: { onLine: true }, clearInterval() {} }).default
  component(); const cleanup = effects[1]()
  assert.equal(syncs, 1)
  doc.visibilityState = 'hidden'
  for (let i = 0; i < 120; i++) callbacks[0]()
  assert.equal(syncs, 1)
  doc.visibilityState = 'visible'; doc.emit('visibilitychange')
  assert.equal(syncs, 2)
  cleanup()
})
test('private health handlers keep authentication and return the same settings in the main response', async () => {
  for (const scope of ['andarun', 'fatima']) {
    let reads = 0
    const state = { records: [{ id: 'record', date: '2026-11-05', weight: 75 }], customFoods: [], customSports: [], deletedFoods: [], deletedSports: [], caloriePlan: { injectionDay: '4' } }
    const { createPrivateHealthHandlers } = load(read('lib/privateHealthApi.js'), {
      'next/server': { NextResponse: { json: (body, options = {}) => Response.json(body, options) } },
      '@/utils/foodPhotoMeals': load(read('utils/foodPhotoMeals.js'), {}),
      '@/lib/supabase/server': { isSupabaseAdminConfigured: true, supabaseAdmin: { from() { return { select() { return this }, eq() { return this }, async maybeSingle() { reads++; return { data: { store: state }, error: null } } } } } },
    })
    const denied = createPrivateHealthHandlers(async () => ({ error: 'Denied', status: 403 }), scope, scope)
    assert.equal((await denied.GET()).status, 403); assert.equal(reads, 0)
    const allowed = createPrivateHealthHandlers(async () => ({ ownerId: 'test-owner' }), scope, scope)
    const main = await (await allowed.GET()).json()
    const settings = await (await allowed.settings.GET()).json()
    assert.deepEqual(main.caloriePlan, settings.caloriePlan)
    assert.deepEqual(main.records, state.records)
    assert.equal(reads, 2)
  }
})
function analyticsHarness({ consent = true } = {}) {
  const effects = [], callbacks = new Set(), posts = []
  let clock = new Date('2026-11-05T12:00:00Z').getTime()
  const Clock = class extends Date { static now() { return clock } }
  const doc = emitter({ visibilityState: 'visible', hasFocus: () => true })
  const win = emitter({ setInterval: fn => { callbacks.add(fn); return fn }, clearInterval: fn => callbacks.delete(fn) })
  const { createStudyTimer } = load(read('utils/studyTimer.js'), {}, { Date: Clock })
  const component = load(read('components/ActivityTracker.jsx'), {
    react: { useEffect: e => effects.push(e), useState: () => [consent, () => {}] },
    '@clerk/nextjs': { useUser: () => ({ isLoaded: true, user: null }) },
    'next/navigation': { usePathname: () => '/andarun/todo' },
    '@/utils/activityStorage': { IDLE_MS: 120000 }, '@/utils/activityCategory': {},
    '@/utils/studyTimer': { createStudyTimer },
    '@/utils/syncProgressToServer': {}, '@/utils/progressCache': {},
    '@/components/LegalNotice': { readPrivacyChoice: () => ({ analytics: consent }), PRIVACY_CHOICE_EVENT: 'privacy' },
    '@/utils/calculatorAnalytics': { getAnalyticsVisitorId: () => 'test-visitor', getAnalyticsSessionId() {} },
  }, { window: win, document: doc, sessionStorage: storage(), clearInterval: win.clearInterval,
    fetch: async (_, opts) => { posts.push(JSON.parse(opts.body)); return {} } }).default
  component(); const cleanup = effects[3]()
  return { posts, doc, win, stop: () => cleanup?.(),
    advance(seconds, interact = true) { for (let i = 1; i <= seconds; i++) { clock += 1000; if (interact) win.emit('pointerdown'); if (i % 15 === 0) for (const tick of callbacks) tick() } },
  }
}
test('one hour of activity uses 60 heartbeats and preserves all 3600 seconds', () => {
  const h = analyticsHarness(); h.advance(3600); h.stop()
  assert.equal(h.posts.length, 61) // One page view plus 60 time batches.
  assert.equal(h.posts.reduce((sum, p) => sum + p.activeSeconds, 0), 3600)
  assert.ok(h.posts.every(p => p.activeSeconds <= 60))
})
test('analytics flush partial seconds on hide, blur, pagehide and cleanup without duplicates', () => {
  for (const event of ['hidden', 'blur', 'pagehide', 'cleanup']) {
    const h = analyticsHarness(); h.advance(37)
    if (event === 'hidden') { h.doc.visibilityState = 'hidden'; h.doc.emit('visibilitychange') }
    if (event === 'blur' || event === 'pagehide') h.win.emit(event)
    h.stop()
    assert.equal(h.posts.reduce((sum, p) => sum + p.activeSeconds, 0), 37, event)
  }
})
test('hidden and idle time never become active time after batching', () => {
  const h = analyticsHarness(); h.advance(30)
  h.doc.visibilityState = 'hidden'; h.doc.emit('visibilitychange')
  h.advance(3600, false)
  h.doc.visibilityState = 'visible'; h.doc.emit('visibilitychange')
  h.advance(600, false); h.stop()
  assert.equal(h.posts.reduce((sum, p) => sum + p.activeSeconds, 0), 150)
})
test('declining analytics does not start analytics requests', () => {
  const h = analyticsHarness({ consent: false }); h.advance(3600); h.stop(); assert.equal(h.posts.length, 0)
})
