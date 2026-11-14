const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const vm = require('node:vm')
const { transformSync } = require('esbuild')
const root = path.resolve(__dirname, '..')
function storage() {
  const values = new Map()
  return { get length() { return values.size }, key: index => [...values.keys()][index] ?? null, getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value), removeItem: key => values.delete(key) }
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

function mobinStudyHarness({ localStorage = storage(), online = true, start = '2026-11-10T22:30:00Z' } = {}) {
  const startedAt = Date.parse(start)
  let clock = startedAt
  const callbacks = new Map(), effects = [], posts = []
  const Clock = class extends Date { constructor(...args) { super(...(args.length ? args : [clock])) } static now() { return clock } }
  const navigator = { onLine: online }
  const win = emitter({ dispatchEvent() {}, setTimeout, clearTimeout,
    setInterval(fn, ms) { callbacks.set(fn, ms); return fn }, clearInterval(fn) { callbacks.delete(fn) } })
  const doc = emitter({ visibilityState: 'visible', hasFocus: () => true })
  const globals = { Date: Clock, window: win, document: doc, localStorage, navigator, Event, AbortController, crypto: require('node:crypto') }
  const study = load(read('lib/mobinStudyTime.js'), {}, { ...globals, fetch: async (_, options) => {
    posts.push(JSON.parse(options.body))
    return { ok: true, json: async () => ({ ok: true }) }
  } })
  const tracker = load(read('app/mobin/StudyTimeTracker.jsx'), {
    react: { useEffect: effect => effects.push(effect), useRef: value => ({ current: value }) },
    'next/navigation': { usePathname: () => '/mobin/mathepruefung' },
    '@/lib/mobinStudyTime': study,
    '@/utils/studyTimer': load(read('utils/studyTimer.js'), {}, globals),
  }, globals).default
  tracker()
  const cleanups = effects.map(effect => effect())
  return { posts, study, localStorage,
    stop() { cleanups.reverse().forEach(cleanup => cleanup?.()) },
    async advance(seconds) {
      for (let i = 0; i < seconds; i++) {
        clock += 1000
        win.emit('pointerdown')
        for (const [fn, ms] of callbacks) if ((clock - startedAt) % ms === 0) fn()
        if ((clock - startedAt) % 60000 === 0) await new Promise(resolve => setImmediate(resolve))
      }
    },
  }
}

test('Mobin sends 60 batches for an hour and attributes every second to the correct Berlin day', async () => {
  const h = mobinStudyHarness()
  await h.advance(3600)
  h.stop()
  assert.equal(h.posts.length, 60)
  const days = ['2026-11-10', '2026-11-11']
  const summary = h.study.studySummary(h.posts.flatMap(p => p.sessions), days)
  assert.equal(summary[days[0]].total, 1800)
  assert.equal(summary[days[1]].total, 1800)
})

test('Mobin time recorded offline survives reload and uploads only until acknowledged', async () => {
  const before = mobinStudyHarness({ online: false })
  await before.advance(27)
  before.stop()
  assert.equal(before.posts.length, 0)
  const after = mobinStudyHarness({ localStorage: before.localStorage })
  await after.study.syncLocalStudySessions()
  await after.study.syncLocalStudySessions()
  assert.equal(after.posts.length, 1)
  assert.equal(after.posts[0].sessions[0].seconds, 27)
  after.stop()
})

test('Mobin study API retains newer time after legacy or batched requests arrive out of order', async () => {
  const rows = new Map()
  const db = { from() {
    let filters = {}, patch
    const query = {
      select() { return query },
      eq(key, value) { filters[key] = value; return query },
      is(key, value) { return query.eq(key, value) },
      update(value) { patch = value; return query },
      async insert(value) { rows.set(value.id, value); return {} },
      async maybeSingle() {
        const row = rows.get(filters.id)
        if (!patch) return { data: row }
        if (row.updated_at !== filters.updated_at) return { data: null }
        rows.set(row.id, { ...row, ...patch })
        return { data: { id: row.id } }
      },
    }
    return query
  } }
  const api = load(read('app/api/mobin/study-time/route.js'), {
    'next/server': { NextResponse: Response }, '@/lib/mobinAuth': { hasMobinSession: async () => true },
    '@/lib/supabase/server': { supabaseAdmin: db }, '@/lib/mobinStudyTime': load(read('lib/mobinStudyTime.js'), {}),
  })
  const session = { id: 'study-time:2026-11-10:123e4567-e89b-42d3-a456-426614174000', day: '2026-11-10', section: 'math', seconds: 60 }
  for (const payload of [session, { sessions: [{ ...session, seconds: 90 }] }, { ...session, seconds: 30 }, { sessions: [session] }]) {
    assert.equal((await api.POST({ json: async () => payload })).status, 200)
  }
  assert.equal(rows.get(session.id).data.seconds, 90)
})

test('math clock ticks share a save deadline while answers and navigation flush progress promptly', async () => {
  let time = 0, cursor = 0
  const effects = [], hooks = [], timers = new Map(), writes = []
  const Clock = class extends Date { static now() { return time } }
  const win = emitter({
    setTimeout(fn, delay) { const key = Symbol(); timers.set(key, { fn, due: time + delay }); return key },
    clearTimeout(key) { timers.delete(key) },
  })
  const initial = { version: 1, sessions: { round: { responses: {}, studyDays: {}, updatedAt: '' } }, bookmarks: {} }
  const react = {
    useState(initializer) {
      const index = cursor++
      hooks[index] ??= { value: typeof initializer === 'function' ? initializer() : initializer }
      const slot = hooks[index]
      return [slot.value, value => { slot.value = typeof value === 'function' ? value(slot.value) : value }]
    },
    useRef(value) { return hooks[cursor++] ??= { current: value } },
    useEffect(effect, dependencies) {
      const index = cursor++
      const previous = hooks[index]
      if (previous?.dependencies.every((value, i) => Object.is(value, dependencies[i]))) return
      effects.push(() => { previous?.cleanup?.(); hooks[index] = { dependencies, cleanup: effect() } })
    },
  }
  const { useMathProgress } = load(read('app/mobin/mathepruefung/useMathProgress.js'), {
    react, '@/lib/mobinMath': { emptyMathProgress: () => initial, normalizeMathProgress: value => value ?? initial, mergeMathProgress: current => current, MATH_STORAGE_KEY: 'math' },
  }, { Date: Clock, window: win, document: emitter(), navigator: { onLine: true }, localStorage: storage(), AbortController, Blob,
    fetch: async (_, options) => {
      const state = options.method === 'PATCH' ? JSON.parse(options.body).state : initial
      if (options.method === 'PATCH') writes.push({ at: time, state, keepalive: options.keepalive })
      return { ok: true, json: async () => ({ state }) }
    } })
  const render = () => { cursor = 0; const state = useMathProgress(); effects.splice(0).forEach(effect => effect()); return state }
  const settle = async () => { await new Promise(resolve => setImmediate(resolve)) }
  const due = async () => {
    for (const [key, timer] of [...timers]) if (timer.due <= time) { timers.delete(key); timer.fn() }
    await settle()
  }
  render(); await settle()
  for (let seconds = 5; seconds <= 65; seconds += 5) {
    time = seconds * 1000
    const { setProgress } = render()
    setProgress({ ...initial, sessions: { round: { ...initial.sessions.round, updatedAt: String(time), studyDays: { today: seconds } } } })
    render(); await due()
  }
  assert.deepEqual(writes.map(write => write.state.sessions.round.studyDays.today), [65])
  time = 70000
  const { progress, setProgress } = render()
  setProgress({ ...progress, sessions: { round: { ...progress.sessions.round, responses: { answer: '12' } } } })
  render()
  time += 650; await due()
  assert.equal(writes.length, 2)
  assert.equal(writes[1].state.sessions.round.responses.answer, '12')
  const next = render()
  next.setProgress({ ...next.progress, sessions: { round: { ...next.progress.sessions.round, studyDays: { today: 70 } } } })
  render()
  hooks.forEach(hook => hook.cleanup?.())
  await settle()
  assert.equal(writes.length, 3)
  assert.equal(writes[2].state.sessions.round.studyDays.today, 70)
  assert.equal(writes[2].keepalive, true)
})
