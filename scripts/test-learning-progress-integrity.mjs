// Run with: node --experimental-vm-modules --import tsx scripts/test-learning-progress-integrity.mjs
// Set RADYAR_PGLITE_MODULE to an installed @electric-sql/pglite entry if it is
// outside node_modules. Uses an isolated PostgreSQL database; never production.
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { resolve, dirname } from 'node:path'
import { pathToFileURL } from 'node:url'
import { AsyncLocalStorage } from 'node:async_hooks'
import vm from 'node:vm'
import * as activityHelpers from '../utils/learningActivity.js'
import * as emailHelpers from '../lib/emailIdentity.js'
import { readVersion } from '../utils/readProgressStore.js'
import { createStudyTimer } from '../utils/studyTimer.js'

const dependency = process.env.RADYAR_PGLITE_MODULE
const { PGlite } = await import(dependency ? pathToFileURL(dependency).href : '@electric-sql/pglite')
const db = new PGlite()
const root = resolve(import.meta.dirname, '..')
const session = new AsyncLocalStorage()
let failDatabase = false
const cases = []
const plain = value => JSON.parse(JSON.stringify(value))
const check = async (name, fn) => { await fn(); cases.push(name); console.log(`PASS ${name}`) }

await db.exec(`
 create role anon; create role authenticated; create role service_role;
 create table user_progress(user_id text,thema_id text,read_pct numeric not null default 0,updated_at timestamptz not null default now(),primary key(user_id,thema_id));
 create table analytics_daily(visitor_id text,user_id text,day date,active_seconds int,visits int);
 create table analytics_pages(visitor_id text,user_id text,day date,path text,active_seconds int);
 insert into user_progress values ('email:a@example.test','old-lesson',1,'2026-01-01');
 insert into user_progress values ('user_A','clerk-history',1,'2026-02-01');
 insert into user_progress values ('email:b@example.test','b-only',1,'2026-03-01');
 insert into analytics_daily values ('visitor-A','email:a@example.test','2026-01-01',100,1);
 insert into analytics_pages values ('visitor-A','email:a@example.test','2026-01-01','/gehirn/old',100);
`)
const migration = await readFile(resolve(root, 'supabase/migrations/0022_learning_progress_integrity.sql'), 'utf8')
await db.exec(migration)

function query(table) {
  const where = [], params = [], order = []
  let columns = '*', limit = 1000, offset = 0
  const builder = {
    select(value) { columns = value; return builder },
    in(key, values) { params.push(JSON.stringify(values)); where.push(`"${key}" = any(array(select jsonb_array_elements_text($${params.length}::jsonb)))`); return builder },
    order(key) { order.push(`"${key}"`); return builder },
    range(start, end) { offset = start; limit = end - start + 1; return builder },
    then(yes, no) {
      const run = async () => {
        if (failDatabase) return { data: null, error: { message: 'Injected database outage' } }
        try {
          const result = await db.query(`select ${columns} from "${table}" ${where.length ? 'where ' + where.join(' and ') : ''} ${order.length ? 'order by ' + order.join(',') : ''} limit ${limit} offset ${offset}`, params)
          const data = plain(result.rows).map(row => row.day ? { ...row, day: row.day.slice(0, 10) } : row)
          return { data, error: null }
        } catch (error) { return { data: null, error } }
      }
      return run().then(yes, no)
    },
  }
  return builder
}
const supabase = {
  from: query,
  async rpc(name, args) {
    if (failDatabase) return { error: { message: 'Injected database outage' } }
    try {
      if (name === 'claim_learning_legacy_ids') {
        const result = await db.query('select claim_learning_legacy_ids($1,array(select jsonb_array_elements_text($2::jsonb))) ids', [args.p_user_id,JSON.stringify(args.p_legacy_ids)])
        return { data: result.rows[0].ids, error: null }
      }
      if (name === 'apply_learning_read_progress') await db.query('select apply_learning_read_progress($1,array(select jsonb_array_elements_text($2::jsonb)),$3::jsonb,$4::jsonb)', [args.p_user_id, JSON.stringify(args.p_lookup_ids), JSON.stringify(args.p_changes), args.p_reset ? JSON.stringify(args.p_reset) : null])
      else if (name === 'sync_learning_activity') await db.query('select sync_learning_activity($1,$2::jsonb,$3::jsonb)', [args.p_user_id, JSON.stringify(args.p_streams), JSON.stringify(args.p_legacy_days)])
      else throw new Error(`Unexpected RPC: ${name}`)
      return { error: null }
    } catch (error) { console.error('Test database RPC:', error.message); return { error } }
  },
}
const serverContext = vm.createContext({ console, Date, crypto })
const serverModules = new Map()
function synthetic(name, values) {
  const module = new vm.SyntheticModule(Object.keys(values), function () { for (const [key, value] of Object.entries(values)) this.setExport(key, value) }, { context: serverContext })
  serverModules.set(name, module)
}
synthetic('next/server', { NextResponse: { json: (body, options) => ({ body, status: options?.status || 200, ok: !options?.status || options.status < 400, json: async () => plain(body) }) } })
synthetic('@clerk/nextjs/server', {
  auth: async () => ({ userId: session.getStore()?.id || null }),
  currentUser: async () => session.getStore(),
})
synthetic('@/lib/emailIdentity', emailHelpers)
synthetic('@/utils/readProgressStore', { readVersion })
synthetic('@/utils/learningActivity', activityHelpers)
synthetic('@/lib/supabase/server', { isSupabaseAdminConfigured: true, supabaseAdmin: supabase })
const identity = new vm.SourceTextModule(await readFile(resolve(root, 'lib/userIdentity.js'), 'utf8'), { context: serverContext })
serverModules.set('@/lib/userIdentity', identity)
await identity.link(name => serverModules.get(name)); await identity.evaluate()
const routes = {}
for (const name of ['read-status', 'activity']) {
  const mod = new vm.SourceTextModule(await readFile(resolve(root, `app/api/progress/${name}/route.js`), 'utf8'), { context: serverContext })
  await mod.link(name => serverModules.get(name)); await mod.evaluate(); routes[name] = mod.namespace
}
const user = id => ({ id: `user_${id}`, primaryEmailAddressId: 'primary', emailAddresses: [{ id: 'primary', emailAddress: `${id.toLowerCase()}@example.test`, verification: { status: 'verified' } }] })
async function api(name, method, who, payload, expectedId = who?.id) {
  return session.run(who, () => routes[name][method]({ headers: { get: () => expectedId || null }, json: async () => payload }))
}

await check('additive migration preserves lessons, original learned dates, and old activity', async () => {
  assert.equal((await db.query('select count(*)::int n from user_progress')).rows[0].n, 3)
  const res = await api('read-status', 'GET', user('A'))
  assert.equal(res.status, 200)
  assert.equal(res.body.history.find(row => row.topicId === 'old-lesson').learnedAt, '2026-01-01T00:00:00.000Z')
  assert.equal(res.body.read['clerk-history'], true)
  assert.equal(res.body.read['b-only'], undefined)
  assert.equal((await api('activity', 'GET', user('A'))).body.days['2026-01-01'].activeSeconds, 100)
})

await check('GET, POST and reset reject mismatched accounts before any database access', async () => {
  for (const name of ['read-status', 'activity']) for (const method of ['GET', 'POST']) assert.equal((await api(name, method, user('B'), {}, 'user_A')).status, 401)
  assert.equal((await api('read-status', 'DELETE', user('B'), {}, 'user_A')).status, 401)
  assert.equal((await api('read-status', 'GET', null)).status, 401)
})

await check('immutable account ownership survives email changes and prevents email reuse from inheriting history', async () => {
  const changedEmail = { ...user('A'), emailAddresses: [{ id: 'primary', emailAddress: 'new-a@example.test' }] }
  assert.equal((await api('read-status', 'GET', changedEmail)).body.read['old-lesson'], true)
  assert.equal((await api('activity', 'GET', changedEmail)).body.days['2026-01-01'].activeSeconds, 100)
  const differentAccount = { ...user('Z'), emailAddresses: user('A').emailAddresses }
  assert.deepEqual(plain((await api('read-status', 'GET', differentAccount)).body.read), {})
  assert.deepEqual(plain((await api('activity', 'GET', differentAccount)).body.days), {})
})

await check('unverified email addresses cannot claim legacy learning records', async () => {
  await db.exec("insert into user_progress(user_id,thema_id,read_pct,updated_at) values('email:u@example.test','verified-only',1,'2026-01-01')")
  const unverified = user('U'); unverified.emailAddresses[0].verification.status = 'unverified'
  assert.deepEqual(plain((await api('read-status', 'GET', unverified)).body.read), {})
  assert.equal((await api('read-status', 'GET', user('U'))).body.read['verified-only'], true)
})

await check('new storage tables and RPCs cannot be accessed by anonymous clients', async () => {
  const tables = (await db.query("select relname,relrowsecurity from pg_class where relname in ('learning_activity_sources','learning_activity_baselines','learning_progress_resets','learning_legacy_owners')")).rows
  assert.equal(tables.length, 4); assert.ok(tables.every(row => row.relrowsecurity))
  await db.exec('set role anon')
  try {
    await assert.rejects(db.query('select * from learning_activity_sources'), /permission denied/)
    await assert.rejects(db.query("select claim_learning_legacy_ids('attacker','{}')"), /permission denied/)
  } finally { await db.exec('reset role') }
})

const record = (topic, read, date, id) => ({ themaId: topic, read, changedAt: date, changeId: id, learnedAt: read ? date : null })
await check('out-of-order read/unread requests and retries preserve the latest edit', async () => {
  const first = record('ordering', true, '2026-04-01T00:00:00.000Z', 'first')
  const second = record('ordering', false, '2026-04-02T00:00:00.000Z', 'second')
  for (const payload of [first, second, first, second]) assert.equal((await api('read-status', 'POST', user('A'), payload)).status, 200)
  const result = await api('read-status', 'GET', user('A'))
  assert.equal(result.body.read.ordering, false)
  assert.equal(result.body.records.ordering.changedAt, second.changedAt)
})

await check('versioned reset suppresses old offline lessons, including previously unknown topics', async () => {
  const reset = { changedAt: '2026-05-01T00:00:00.000Z', changeId: 'reset' }
  assert.equal((await api('read-status', 'POST', user('A'), { reset })).status, 200)
  await api('read-status', 'POST', user('A'), record('offline-before-reset', true, '2026-04-30T00:00:00.000Z', 'offline'))
  const after = await api('read-status', 'GET', user('A'))
  assert.equal(after.body.history.length, 0)
  assert.equal(after.body.records['offline-before-reset'], undefined)
  await api('read-status', 'POST', user('A'), record('after-reset', true, '2026-05-02T00:00:00.000Z', 'new'))
  assert.equal((await api('read-status', 'GET', user('A'))).body.read['after-reset'], true)
})

const source = (id, lessons, practice = 0) => ({ sourceId: `source-${id}-123456789`, day: '2026-01-01', categories: { lessons, practice, flashcards: 0, other: 0 }, visits: 1 })
await check('two devices add their own time; retries and older snapshots never add it twice', async () => {
  for (const streams of [[source('one', 20)], [source('two', 0, 30)], [source('one', 20)], [source('one', 10)]]) {
    assert.equal((await api('activity', 'POST', user('A'), { streams, legacyDays: { '2026-01-01': { activeSeconds: 100, categories: { lessons: 100 }, visits: 1 } } })).status, 200)
  }
  const result = (await api('activity', 'GET', user('A'))).body.days['2026-01-01']
  assert.equal(result.activeSeconds, 150)
  assert.equal(result.categories.lessons, 120)
  assert.equal(result.categories.practice, 30)
  assert.deepEqual(plain((await api('activity', 'GET', user('B'))).body.days), {})
})

await check('complete read and time histories are returned beyond the 1000-row API default', async () => {
  await db.exec(`insert into user_progress(user_id,thema_id,read_pct,updated_at) select 'email:c@example.test','topic-'||n,1,'2026-01-01' from generate_series(1,1105) n;
    insert into learning_activity_sources(user_id,source_id,day,lessons_seconds) select 'email:c@example.test','source-'||n,'2026-01-01',1 from generate_series(1,1105) n;`)
  assert.equal(Object.keys((await api('read-status', 'GET', user('C'))).body.read).length, 1105)
  assert.equal((await api('activity', 'GET', user('C'))).body.days['2026-01-01'].activeSeconds, 1105)
})

class Storage {
  data = new Map()
  get length() { return this.data.size }
  key(index) { return [...this.data.keys()][index] ?? null }
  getItem(key) { return this.data.get(key) ?? null }
  setItem(key, value) { this.data.set(key, String(value)) }
  removeItem(key) { this.data.delete(key) }
}
class Device {
  constructor(id, storage = new Storage()) {
    this.user = user(id); this.offline = false; this.loseResponse = false; this.requests = []
    this.storage = storage; this.clock = Date.now(); this.modules = new Map()
    const device = this
    const DeviceDate = class extends Date { constructor(...args) { super(...(args.length ? args : [device.clock])) } static now() { return device.clock } }
    this.context = vm.createContext({ console, Date: DeviceDate, crypto, CustomEvent, localStorage: storage, sessionStorage: new Storage(), window: new EventTarget(), fetch: async (url, options = {}) => {
      device.requests.push({ url, options })
      if (device.offline) throw new Error('Offline')
      const endpoint = url.split('/').at(-1)
      let response
      if (routes[endpoint]) response = await api(endpoint, options.method || 'GET', device.user, options.body ? JSON.parse(options.body) : {}, options.headers?.['X-Radyar-User-Id'])
      else response = { ok: true, status: 200, json: async () => ({}) }
      if (device.loseResponse) { device.loseResponse = false; throw new Error('Acknowledgement lost') }
      return response
    } })
  }
  async module(name) {
    const filename = resolve(root, name)
    if (this.modules.has(filename)) return this.modules.get(filename)
    const mod = new vm.SourceTextModule(await readFile(filename, 'utf8'), { context: this.context, identifier: filename })
    this.modules.set(filename, mod)
    await mod.link(async (specifier, parent) => this.module(resolve(dirname(parent.identifier), specifier)))
    return mod
  }
  async exports(name) { const mod = await this.module(name); if (mod.status !== 'evaluated') await mod.evaluate(); return mod.namespace }
  async activate(id) { this.user = user(id); (await this.exports('utils/progressCache.js')).activateUserCache(this.user.id) }
  async sync() { return (await this.exports('utils/syncProgressToServer.js')).syncLocalProgressToServer(this.user.id, { force: true, throwOnError: true }) }
  async toggle(topic, read) {
    const payload = (await this.exports('utils/readProgressStore.js')).changeReadStatus(this.user.id, topic, read)
    await (await this.exports('utils/progressSync.js')).persistProgressWrite(`read:${topic}`, '/api/progress/read-status', payload, this.user.id)
    return plain(payload)
  }
  async time(seconds, category = 'lessons') { (await this.exports('utils/activityStorage.js')).addActiveSeconds(this.user.id, seconds, category, new Date('2026-06-01T12:00:00')) }
  async summary() { return plain((await this.exports('utils/activityStorage.js')).getActivitySummary(this.user.id)) }
  async pending() { return (await this.exports('utils/progressSync.js')).pendingProgressEntries(this.user.id) }
}

await check('offline lessons and time survive a full browser reload and retain original dates', async () => {
  const original = new Device('D'); await original.activate('D'); original.offline = true
  const edit = await original.toggle('offline-lesson', true)
  await original.time(120)
  assert.equal((await original.pending()).length, 1)
  const reloaded = new Device('D', original.storage); await reloaded.activate('D')
  await reloaded.sync()
  const remote = (await api('read-status', 'GET', user('D'))).body
  assert.equal(remote.read['offline-lesson'], true)
  assert.equal(new Date(remote.records['offline-lesson'].learnedAt).toISOString(), edit.learnedAt)
  assert.equal((await reloaded.summary()).totalSeconds, 120)
  assert.equal((await reloaded.pending()).length, 0)
})

await check('independent browsers converge on exact added time and lesson status after offline edits', async () => {
  const one = new Device('E'), two = new Device('E')
  await one.activate('E'); await one.time(60); await one.toggle('cross-device', true); await one.sync()
  await two.activate('E'); await two.sync(); assert.equal((await two.summary()).totalSeconds, 60)
  two.offline = true; two.clock += 100; await two.time(30, 'practice'); await two.toggle('cross-device', false)
  await one.time(10); await one.sync()
  two.offline = false; await two.sync(); await one.sync()
  assert.equal((await one.summary()).totalSeconds, 100)
  assert.equal((await two.summary()).totalSeconds, 100)
  assert.equal((await api('read-status', 'GET', user('E'))).body.read['cross-device'], false)
})

await check('lost acknowledgements retry safely without lost lessons or doubled study time', async () => {
  const device = new Device('F'); await device.activate('F')
  device.loseResponse = true; await device.toggle('lost-response', true)
  assert.equal((await device.pending()).length, 1)
  await device.time(45)
  device.loseResponse = true
  await assert.rejects((await device.exports('utils/activityStorage.js')).syncActivityToServer(device.user.id))
  await device.sync(); await device.sync()
  assert.equal((await device.summary()).totalSeconds, 45)
  assert.equal((await api('read-status', 'GET', user('F'))).body.read['lost-response'], true)
})

await check('late server pulls preserve newer local edits; switching accounts never imports their history', async () => {
  const device = new Device('G'); await device.activate('G'); await device.sync()
  const pull = await device.exports('utils/readStatus.js')
  const originalFetch = device.context.fetch
  let release, started
  const waiting = new Promise(resolve => { started = resolve })
  device.context.fetch = async (...args) => { const response = await originalFetch(...args); started(); await new Promise(resolve => { release = resolve }); return response }
  const pending = pull.pullReadStatusFromServer('user_G'); await waiting
  device.offline = true; device.clock += 200; await device.toggle('newer-local', true)
  release(); await pending
  const projected = (await device.exports('utils/readProgressStore.js')).projectReadState((await device.exports('utils/readProgressStore.js')).loadReadState('user_G'))
  assert.equal(projected.articles['newer-local'], 1)
  device.context.fetch = originalFetch
  await device.activate('H'); assert.deepEqual(plain((await device.exports('utils/readProgressStore.js')).projectReadState((await device.exports('utils/readProgressStore.js')).loadReadState('user_H')).articles), {})
  assert.equal((await device.summary()).totalSeconds, 0)
})

await check('database failures remain visible and leave durable data available for retry', async () => {
  const device = new Device('I'); await device.activate('I'); await device.time(25)
  failDatabase = true
  await device.toggle('retry', true)
  await assert.rejects(device.sync())
  assert.equal((await device.pending()).length, 1)
  assert.equal((await device.summary()).totalSeconds, 25)
  failDatabase = false; await device.sync()
  assert.equal((await device.summary()).totalSeconds, 25)
  assert.equal((await api('read-status', 'GET', user('I'))).body.read.retry, true)
})

await check('simultaneous tabs retain independent offline edits and time streams', async () => {
  const shared = new Storage(), first = new Device('J', shared), second = new Device('J', shared)
  await first.activate('J'); await second.activate('J')
  first.offline = true; second.offline = true
  await Promise.all([first.toggle('tab-one', true), second.toggle('tab-two', true), first.time(20), second.time(30, 'practice')])
  assert.equal((await first.pending()).length, 2)
  const projection = (await first.exports('utils/readProgressStore.js')).projectReadState((await first.exports('utils/readProgressStore.js')).loadReadState('user_J'))
  assert.equal(projection.articles['tab-one'], 1)
  assert.equal(projection.articles['tab-two'], 1)
  first.offline = false; second.offline = false
  await Promise.all([first.sync(), second.sync()])
  assert.equal((await first.summary()).totalSeconds, 50)
  await first.time(10); await second.time(5, 'practice')
  await Promise.all([first.sync(), second.sync()])
  assert.equal((await first.summary()).totalSeconds, 65)
  const remote = (await api('read-status', 'GET', user('J'))).body.read
  assert.equal(remote['tab-one'], true); assert.equal(remote['tab-two'], true)
})

await check('idle and background time are excluded; midnight belongs to the correct local day', async () => {
  let clock = new Date('2026-06-01T23:59:58').getTime(), foreground = true
  const rows = []
  const timer = createStudyTimer({ now: () => clock, foreground: () => foreground, onInterval: (seconds, at) => rows.push({ seconds, day: `${at.getFullYear()}-${at.getMonth()+1}-${at.getDate()}` }) })
  clock += 4000; timer.tick()
  assert.deepEqual(rows, [{ seconds: 2, day: '2026-6-1' }, { seconds: 2, day: '2026-6-2' }])
  clock += 120000; timer.tick()
  assert.equal(rows.reduce((sum,row)=>sum+row.seconds,0), 60)
  foreground = false; timer.visibilityChanged(); clock += 3600000; timer.tick()
  assert.equal(rows.reduce((sum,row)=>sum+row.seconds,0), 60)
  foreground = true; timer.visibilityChanged(); clock += 10000; timer.tick()
  assert.equal(rows.reduce((sum,row)=>sum+row.seconds,0), 70)
})

await check('malformed writes are rejected instead of silently discarding or inventing progress', async () => {
  assert.equal((await api('read-status', 'POST', user('A'), { themaId: 'bad', read: 'yes' })).status, 400)
  assert.equal((await api('read-status', 'POST', user('A'), { bulk: [null] })).status, 400)
  assert.equal((await api('activity', 'POST', user('A'), null)).status, 400)
  assert.equal((await api('activity', 'POST', user('A'), { streams: [source('bad', -1)] })).status, 400)
  assert.equal((await api('activity', 'POST', user('A'), { streams: [{ ...source('bad', 1), day: '2026-02-30' }] })).status, 400)
})

if (!process.env.RADYAR_KEEP_TEST_DB) await db.close()
console.log(`${cases.length} learning-integrity scenarios passed against isolated PostgreSQL and real API/client code.`)
export { db, api, user }
export function setTestDatabaseFailure(value) { failDatabase = value }
