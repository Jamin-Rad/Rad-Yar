const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const vm = require('node:vm')
const { buildSync, transformSync } = require('esbuild')
const root = path.resolve(__dirname, '..')

test('global UI and profile do not depend on exercise content', () => {
  const result = buildSync({
    absWorkingDir: root,
    entryPoints: ['components/RobotAssistantGate.jsx', 'components/Navbar.jsx', 'app/profil/page.js'],
    bundle: true, write: false, metafile: true, outdir: 'out', packages: 'external',
    alias: { '@': root }, loader: { '.js': 'jsx', '.css': 'empty' },
  })
  for (const bank of ['data/questions.js', 'data/flashcards.js', 'data/contrastMedia.js', 'data/assessmentQuality/publishedBank.json']) {
    assert.ok(!Object.hasOwn(result.metafile.inputs, bank), bank)
  }
})

test('recommendation and progress indexes match the current exercise catalog', () => {
  const tsx = require('tsx/cjs/api')
  const { FLASHCARDS } = tsx.require('../data/flashcards.js', __filename)
  const { MCQ_TOPIC_GROUPS } = tsx.require('../data/questions.js', __filename)
  assert.deepEqual(require('../data/flashcardIds.json'), FLASHCARDS.map(card => card.id))
  assert.deepEqual(require('../data/mcqTopicIndex.json'), MCQ_TOPIC_GROUPS.map(group => ({
    fachId: group.fachId, kapitelId: group.kapitelId,
    topics: group.topics.map(topic => ({ id: topic.id, title: topic.title })),
  })))
})

function storage() {
  const values = new Map()
  return { get length() { return values.size }, key: index => [...values.keys()][index] ?? null, getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value), removeItem: key => values.delete(key) }
}
function emitter(extra = {}) {
  const handlers = new Map()
  return { ...extra, addEventListener(name, handler) { if (!handlers.has(name)) handlers.set(name, new Set()); handlers.get(name).add(handler) }, removeEventListener(name, handler) { handlers.get(name)?.delete(handler) }, emit(name, event) { for (const handler of handlers.get(name) || []) handler(event) } }
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
    './progressSync.js': { flushPendingProgress: async () => true, progressWriteVersion: () => null },
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
  const periods = []
  const win = emitter({ setInterval: (fn, ms) => { callbacks.push(fn); periods.push(ms); return fn }, clearInterval() {} })
  const component = load(read('components/ActivityTracker.jsx'), {
    react: { useEffect: e => effects.push(e), useState: () => [false, () => {}] },
    '@clerk/nextjs': { useUser: () => ({ isLoaded: true, user: { id: 'test-user' } }) },
    'next/navigation': { usePathname: () => '/' },
    '@/utils/activityStorage': { addActiveSeconds() {}, registerVisit() {}, syncActivityToServer: async () => {}, IDLE_MS: 120000 },
    '@/utils/activityCategory': { getActivityCategory: () => 'learning' },
    '@/utils/studyTimer': { createStudyTimer: () => ({ tick() {}, stop() {} }) },
    '@/utils/syncProgressToServer': { activateUserCache() {}, syncLocalProgressToServer: () => { syncs++ } },
    '@/utils/progressCache': { isUserCacheCurrent: () => true, getUserCacheToken: () => 'token' },
    '@/utils/progressSync': { pendingProgressEntries: () => [], flushPendingProgress: async () => true },
    '@/utils/trackExitPage': {},
    '@/components/LegalNotice': { readPrivacyChoice: () => ({ analytics: false }), PRIVACY_CHOICE_EVENT: 'privacy' },
    '@/utils/calculatorAnalytics': {},
  }, { window: win, document: doc, navigator: { onLine: true }, clearInterval() {} }).default
  component(); const cleanup = effects[1]()
  assert.equal(syncs, 1)
  assert.deepEqual(periods, [300000, 60000])
  callbacks[1](); win.emit('radyar:progress-pending')
  assert.equal(syncs, 1)
  doc.visibilityState = 'hidden'
  for (let i = 0; i < 120; i++) callbacks[0]()
  assert.equal(syncs, 1)
  doc.visibilityState = 'visible'; doc.emit('visibilitychange')
  assert.equal(syncs, 2)
  win.emit('online'); win.emit('focus')
  assert.equal(syncs, 4)
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
function analyticsHarness({ consent = true, local = storage(), start = '2026-11-05T12:00:00Z' } = {}) {
  const callbacks = new Set(), posts = [], session = storage()
  let clock = Date.parse(start), allowed = consent
  const Clock = class extends Date {
    constructor(...args) { super(...(args.length ? args : [clock])) }
    static now() { return clock }
  }
  const doc = emitter({ visibilityState:'visible', hasFocus:()=>true, cookie:'' })
  const win = emitter({ setInterval:fn=>{ callbacks.add(fn); return fn } })
  const globals = { Date:Clock, crypto, TextEncoder, location:{origin:'https://rad.test'}, document:doc, window:win, localStorage:local, sessionStorage:session,
    clearInterval:fn=>callbacks.delete(fn), fetch:async (_,options)=>{
      posts.push(JSON.parse(options.body)); return new Response(null,{status:503})
    } }
  const exit = load(read('utils/exitAnalytics.js'),{},globals)
  const tracker = load(read('utils/trackExitPage.js'),{
    './studyTimer.js':load(read('utils/studyTimer.js'),{},{Date:Clock}), './exitAnalytics.js':exit,
  },globals)
  const effects = []
  let pathname = '/first'
  const component = load(read('components/ActivityTracker.jsx'), {
    react:{useEffect:e=>effects.push(e),useState:()=>[allowed,()=>{}]},
    '@clerk/nextjs':{useUser:()=>({isLoaded:true,user:null})}, 'next/navigation':{usePathname:()=>pathname},
    '@/utils/activityStorage':{IDLE_MS:120000}, '@/utils/activityCategory':{}, '@/utils/studyTimer':{},
    '@/utils/syncProgressToServer':{}, '@/utils/progressCache':{}, '@/utils/progressSync':{},
    '@/components/LegalNotice':{readPrivacyChoice:()=>({analytics:allowed})},
    '@/utils/calculatorAnalytics':{getAnalyticsVisitorId:()=>{local.setItem('radyar_visitor_id','test-visitor-000');return 'test-visitor-000'},
      getAnalyticsSessionId:()=>session.setItem('radyar_analytics_session','session')},
    '@/utils/trackExitPage':tracker,
  },globals).default
  const mount = () => { effects.length=0; component(); return effects[3]() }
  let stop = mount()
  const leave = () => {
    win.emit('click',{button:0,target:{closest:()=>({origin:'https://outside.test',hasAttribute:()=>false})}})
    win.emit('pagehide')
  }
  return { posts, doc, win, local, leave, stop:()=>stop?.(), revoke(){allowed=false;exit.cleanExitAnalytics(true)},
    route(path){stop?.();pathname=path;stop=mount()},
    advance(seconds, interact=true){for(let i=0;i<seconds;i++){clock+=1000;if(interact)win.emit('pointerdown');if(i%15===14)for(const tick of callbacks)tick()}},
  }
}
test('one hour across routes, tab switches and idle time sends only on exit', () => {
  const h=analyticsHarness();h.advance(1200);h.win.emit('blur');h.route('/second')
  h.advance(2400);h.doc.visibilityState='hidden';h.doc.emit('visibilitychange');h.advance(600,false)
  assert.equal(h.posts.length,0)
  h.leave();h.leave();h.stop()
  assert.equal(h.posts.length,1)
  const entries=h.posts[0].entries
  assert.deepEqual(entries.map(r=>[r.path,r.seconds,r.views,r.visits]),[['/first',1200,1,1],['/second',2400,1,0]])
})
test('restored page continues cumulative time and midnight retains the historical UTC day',()=>{
  const h=analyticsHarness({start:'2026-11-05T23:59:58Z'})
  h.advance(4);h.leave();h.advance(100,false);h.win.emit('pageshow');h.advance(600,false);h.leave()
  assert.equal(h.posts.length,2)
  const entries=h.posts[1].entries
  assert.deepEqual(entries.map(e=>[e.day,e.seconds,e.views]),[['2026-11-05',2,1],['2026-11-06',122,0]])
  assert.equal(entries[1].id,h.posts[0].entries[1].id)
})
test('sudden closure persists a local checkpoint until a later exit, and refusal clears pending rows',()=>{
  const first=analyticsHarness();first.advance(30)
  assert.equal(first.posts.length,0)
  const next=analyticsHarness({local:first.local});assert.equal(next.posts.length,0)
  next.win.emit('pagehide');assert.equal(next.posts.length,0);next.win.emit('pageshow');next.leave();assert.ok(next.posts[0].entries.some(row=>row.seconds===30))
  next.revoke();assert.equal(Array.from({length:next.local.length},(_,i)=>next.local.key(i)).some(k=>k.startsWith('radyar_exit_')),false)
  const denied=analyticsHarness({consent:false});denied.advance(60);denied.win.emit('pagehide');assert.equal(denied.posts.length,0)
})

function mobinStudyHarness({ localStorage = storage(), online = true, start = '2026-11-10T22:30:00Z', pathname = '/mobin/mathepruefung' } = {}) {
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
    'next/navigation': { usePathname: () => pathname },
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

test('Mobin sends 30 batches for an hour and attributes every second to the correct Berlin day', async () => {
  const h = mobinStudyHarness()
  await h.advance(3600)
  h.stop()
  assert.equal(h.posts.length, 30)
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

test('math clock ticks batch for two minutes, answers for 15 seconds, and exit flushes promptly', async () => {
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
  for (let seconds = 5; seconds <= 125; seconds += 5) {
    time = seconds * 1000
    const { setProgress } = render()
    setProgress({ ...initial, sessions: { round: { ...initial.sessions.round, updatedAt: String(time), studyDays: { today: seconds } } } })
    render(); await due()
  }
  assert.deepEqual(writes.map(write => write.state.sessions.round.studyDays.today), [125])
  time = 130000
  const { progress, setProgress } = render()
  setProgress({ ...progress, sessions: { round: { ...progress.sessions.round, responses: { answer: '12' } } } })
  render()
  time += 15000; await due()
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

test('English exam time reaches the English section and overall total without double counting repeated uploads', async () => {
  for (const pathname of ['/mobin/fach/englisch', '/mobin/english/vokabeltest/18-november']) {
    const h = mobinStudyHarness({ pathname, start: '2026-11-17T15:00:00Z' })
    await h.advance(247)
    h.stop()
    await new Promise(resolve => setImmediate(resolve))
    const sessions = h.posts.flatMap(p => p.sessions)
    assert.ok(sessions.length > 1)
    assert.ok(sessions.every(s => s.section === 'english'))
    const totals = h.study.studySummary([...sessions, ...sessions], ['2026-11-17'])['2026-11-17']
    assert.equal(totals.sections.english, 247)
    assert.equal(totals.total, 247)
    const combined = h.study.studySummary([...sessions, {id:'study-time:2026-11-17:123e4567-e89b-42d3-a456-426614174000',day:'2026-11-17',section:'math',seconds:90}], ['2026-11-17'])['2026-11-17']
    assert.equal(combined.total, 337)
    assert.equal(combined.sections.english, 247)
    assert.equal(combined.sections.math, 90)
  }
})
