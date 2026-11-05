// Exercises the real identity helpers and API handlers against isolated Postgres.
// No production credentials, network requests, or production writes are used.
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { AsyncLocalStorage } from 'node:async_hooks'
import vm from 'node:vm'
import { PGlite } from '@electric-sql/pglite'
import * as emailHelpers from '../lib/emailIdentity.js'

const root = resolve(import.meta.dirname, '..')
const db = new PGlite()
const session = new AsyncLocalStorage()
let failure = null, rowLimit = 1000, databaseCalls = 0
const plain = value => JSON.parse(JSON.stringify(value))
await db.exec(`
  create role anon; create role authenticated; create role service_role;
  create table user_progress(user_id text,thema_id text,read_pct numeric not null default 0,updated_at timestamptz not null default now(),primary key(user_id,thema_id));
  create table analytics_daily(visitor_id text,user_id text,day date,active_seconds int,visits int);
  create table analytics_pages(visitor_id text,user_id text,day date,path text,active_seconds int);
`)
await db.exec(await readFile(resolve(root, 'supabase/migrations/0022_learning_progress_integrity.sql'), 'utf8'))
await db.exec(`
  create table leitner_cards(user_id text,card_id text,box int not null default 1,status text not null default 'active',added_at timestamptz,last_seen_at timestamptz,last_reviewed_at timestamptz,due_at timestamptz,correct_count int not null default 0,wrong_count int not null default 0,seen_count int not null default 0,primary key(user_id,card_id));
  create table mcq_results(user_id text,thema_id text,fach_id text,attempted int not null default 0,correct int not null default 0,last_date timestamptz,details jsonb not null default '{}',primary key(user_id,thema_id));
  insert into leitner_cards(user_id,card_id,box,added_at) values('email:a@example.test','legacy-card',3,'2026-01-01'),('email:b@example.test','b-only',2,'2026-01-01'),('email:u@example.test','verified-only',2,'2026-01-01');
  insert into mcq_results(user_id,thema_id,attempted,correct,last_date) values('email:a@example.test','legacy-topic',5,4,'2026-01-01'),('email:b@example.test','b-only',3,2,'2026-01-01'),('email:u@example.test','verified-only',2,1,'2026-01-01');
`)

function query(table) {
  const where = [], values = [], order = []
  let columns = '*', offset = 0, limit = 1000, exact = false, operation = 'select', rows, conflict
  const builder = {
    select(value, options) { columns = value; exact = options?.count === 'exact'; return builder },
    eq(key, value) { values.push(value); where.push(`"${key}"=$${values.length}`); return builder },
    in(key, ids) { values.push(JSON.stringify(ids)); where.push(`"${key}"=any(array(select jsonb_array_elements_text($${values.length}::jsonb)))`); return builder },
    order(key) { order.push(`"${key}"`); return builder },
    range(start, end) { offset = start; limit = end - start + 1; return builder },
    delete() { operation = 'delete'; return builder },
    upsert(input, options) { operation = 'upsert'; rows = input; conflict = options.onConflict; return builder },
    then(yes, no) {
      const run = async () => {
        databaseCalls++
        if (failure === 'all' || (failure === 'owners' && table === 'learning_legacy_owners') || (failure === 'page' && offset > 0)) return { data: null, error: { message: 'Injected outage' } }
        const filter = where.length ? 'where ' + where.join(' and ') : ''
        if (operation === 'delete') { await db.query(`delete from "${table}" ${filter}`, values); return { error: null } }
        if (operation === 'upsert') {
          for (const row of rows) {
            const keys = Object.keys(row)
            const params = Object.values(row).map(value => value && typeof value === 'object' ? JSON.stringify(value) : value)
            const updates = keys.filter(key => !conflict.split(',').includes(key)).map(key => `"${key}"=excluded."${key}"`).join(',')
            await db.query(`insert into "${table}" (${keys.map(key => `"${key}"`).join(',')}) values (${keys.map((_,i) => '$' + (i+1)).join(',')}) on conflict(${conflict}) do update set ${updates}`, params)
          }
          return { error: null }
        }
        const count = exact ? (await db.query(`select count(*)::int n from "${table}" ${filter}`, values)).rows[0].n : null
        const result = await db.query(`select ${columns} from "${table}" ${filter} ${order.length ? 'order by '+order.join(',') : ''} limit ${Math.min(limit,rowLimit)} offset ${offset}`, values)
        return { data: plain(result.rows), count, error: null }
      }
      return run().then(yes, no)
    },
  }
  return builder
}
const supabase = {
  from: query,
  async rpc(name, args) {
    databaseCalls++
    if (failure === 'all') return { data: null, error: { message: 'Injected outage' } }
    assert.equal(name, 'claim_learning_legacy_ids')
    const result = await db.query('select claim_learning_legacy_ids($1,array(select jsonb_array_elements_text($2::jsonb))) ids', [args.p_user_id,JSON.stringify(args.p_legacy_ids)])
    return { data: plain(result.rows[0].ids), error: null }
  },
}
const context = vm.createContext({ console, Date })
const modules = new Map()
function mock(name, exports) {
  modules.set(name, new vm.SyntheticModule(Object.keys(exports), function () { for (const [key,value] of Object.entries(exports)) this.setExport(key,value) }, { context }))
}
mock('next/server', { NextResponse: { json: (body, options) => ({ body: plain(body), status: options?.status || 200, headers: options?.headers || {} }) } })
mock('@clerk/nextjs/server', { auth: async () => ({ userId: session.getStore()?.id || null }), currentUser: async () => session.getStore() })
mock('@/lib/emailIdentity', emailHelpers)
mock('@/lib/supabase/server', { isSupabaseAdminConfigured: true, supabaseAdmin: supabase })
async function load(name, file) {
  const module = new vm.SourceTextModule(await readFile(resolve(root,file),'utf8'), { context })
  modules.set(name,module)
  await module.link(id => modules.get(id)); await module.evaluate()
  return module.namespace
}
await load('@/lib/userIdentity','lib/userIdentity.js')
const routes = {
  leitner: await load('leitner','app/api/progress/leitner/route.js'),
  mcq: await load('mcq','app/api/progress/mcq-results/route.js'),
}
const user = (id, email = `${id.toLowerCase()}@example.test`, verified = true) => ({ id: `user_${id}`, primaryEmailAddressId:'primary',emailAddresses:[{id:'primary',emailAddress:email,verification:{status:verified?'verified':'unverified'}}] })
const api = (name, method, who, payload, expectedId = who?.id) => session.run(who, () => routes[name][method]({ headers: { get: () => expectedId || null }, json: async () => payload }))
const resultKey = name => name === 'leitner' ? 'cards' : 'scores'
let cases = 0
const check = async (name, fn) => { await fn(); cases++; console.log(`PASS ${name}`) }

await check('GET, POST and DELETE reject anonymous or mismatched accounts before database access', async () => {
  for (const name of Object.keys(routes)) for (const method of ['GET','POST','DELETE']) {
    const before = databaseCalls
    assert.equal((await api(name,method,null,{})).status,401)
    assert.equal((await api(name,method,user('A'),{},'user_B')).status,401)
    assert.equal(databaseCalls,before)
  }
})
await check('verified accounts retain their legacy practice history without exposing another account', async () => {
  assert.equal((await api('leitner','GET',user('A'))).body.cards['legacy-card'].box,3)
  assert.equal((await api('mcq','GET',user('A'))).body.scores['legacy-topic'].correct,4)
  assert.equal((await api('leitner','GET',user('A'))).body.cards['b-only'],undefined)
})
await check('unverified email cannot read, overwrite or delete unclaimed legacy practice data', async () => {
  for (const name of Object.keys(routes)) {
    assert.deepEqual((await api(name,'GET',user('U',undefined,false))).body[resultKey(name)],{})
    const payload = name === 'leitner'
      ? { cardId: 'verified-only', record: { box: 8 } }
      : { themaId: 'verified-only', result: { attempted: 100, correct: 100 } }
    assert.equal((await api(name,'POST',user('U',undefined,false),payload)).status,200)
    assert.equal((await api(name,'DELETE',user('U',undefined,false))).status,200)
  }
  assert.equal((await db.query("select box from leitner_cards where user_id='email:u@example.test' and card_id='verified-only'")).rows[0].box,2)
  assert.equal((await db.query("select correct from mcq_results where user_id='email:u@example.test' and thema_id='verified-only'")).rows[0].correct,1)
})
await check('email changes retain all formerly claimed aliases and email reuse never inherits them', async () => {
  const changed = user('A','changed@example.test')
  assert.ok((await api('leitner','GET',changed)).body.cards['legacy-card'])
  assert.ok((await api('mcq','GET',changed)).body.scores['legacy-topic'])
  for (const name of Object.keys(routes)) {
    assert.deepEqual((await api(name,'GET',user('Z','a@example.test'))).body[resultKey(name)],{})
    assert.deepEqual((await api(name,'GET',user('Z','a@example.test',false))).body[resultKey(name)],{})
  }
})
await check('new writes use immutable account IDs and survive later email changes', async () => {
  assert.equal((await api('leitner','POST',user('A','changed@example.test'),{cardId:'new-card',record:{box:4,lastReviewedAt:'2026-11-01'}})).status,200)
  assert.equal((await api('mcq','POST',user('A','changed@example.test'),{themaId:'new-topic',result:{attempted:8,correct:7,lastDate:'2026-11-01'}})).status,200)
  for (const table of ['leitner_cards','mcq_results']) assert.equal((await db.query(`select count(*)::int n from ${table} where user_id='user_A'`)).rows[0].n,1)
  assert.ok((await api('leitner','GET',user('A','third@example.test'))).body.cards['new-card'])
  assert.ok((await api('mcq','GET',user('A','third@example.test'))).body.scores['new-topic'])
})
await check('pagination retrieves all 1005 records even when the backend caps responses below the requested range', async () => {
  await db.exec("insert into leitner_cards(user_id,card_id) select 'user_L','card-'||lpad(n::text,4,'0') from generate_series(1,1005) n; insert into mcq_results(user_id,thema_id) select 'user_L','topic-'||lpad(n::text,4,'0') from generate_series(1,1005) n;")
  for (const cap of [1000,300]) {
    rowLimit = cap
    for (const name of Object.keys(routes)) {
      const res = await api(name,'GET',user('L'))
      assert.equal(Object.keys(res.body[resultKey(name)]).length,1005)
      assert.equal(res.headers['Cache-Control'],'no-store')
    }
  }
  rowLimit = 1000
})
await check('reset removes immutable and every previously claimed legacy key without touching other accounts', async () => {
  for (const name of Object.keys(routes)) {
    assert.equal((await api(name,'DELETE',user('A','third@example.test'))).status,200)
    assert.deepEqual((await api(name,'GET',user('A','third@example.test'))).body[resultKey(name)],{})
    assert.deepEqual((await api(name,'GET',user('A','a@example.test'))).body[resultKey(name)],{})
    assert.ok((await api(name,'GET',user('B'))).body[resultKey(name)]['b-only'])
  }
})
await check('ownership and pagination outages return 503 instead of exposing aliases or returning partial history', async () => {
  for (const mode of ['all','owners','page']) {
    failure = mode
    for (const name of Object.keys(routes)) assert.equal((await api(name,'GET',user('L'))).status,503)
    failure = null
  }
})
await check('null and array writes return 400', async () => {
  for (const name of Object.keys(routes)) for (const payload of [null,[]]) assert.equal((await api(name,'POST',user('A'),payload)).status,400)
})
await db.close()
console.log(`${cases} practice-integrity scenarios passed against isolated PostgreSQL and real identity/API code.`)
