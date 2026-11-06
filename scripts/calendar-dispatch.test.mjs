import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import vm from 'node:vm'
import { dueReminders, eventFromRow, validPushSubscription } from '../utils/calendarReminders.js'

const now = Date.parse('2026-11-06T12:00:00Z')
const event = { id: 'event-1', owner_id: 'owner', item_type: 'event', title: 'Appointment', deadline: '2026-11-06', event_time: '13:30:00', done: false, created_at: '2026-11-01T00:00:00Z' }
const device = { owner_id: 'owner', endpoint_hash: 'device-1', enabled_at: '2026-11-01T00:00:00Z', leads: [1440,30], show_details: false,
  subscription: { endpoint: 'https://fcm.googleapis.com/fcm/send/test', keys: { p256dh: 'a'.repeat(87), auth: 'a'.repeat(22) } } }
const source = readFileSync(new URL('../app/api/andarun/reminders/dispatch/route.js', import.meta.url), 'utf8')

function fixture(options = {}) {
  const devices = options.devices ?? [structuredClone(device)]
  const events = options.events ?? [structuredClone(event)]
  const operations = [], pushed = [], claims = new Set()
  let scans = 0, authorization = options.authorization ?? 'signed'
  const db = {
    from(table) {
      let operation = 'select', payload, single = false
      const filters = []
      const query = {
        select() { return query }, limit() { return query }, in() { return query }, gte() { return query }, lte() { return query }, lt() { return query },
        eq(key, value) { filters.push([key, value]); return query },
        upsert(value) { operation = 'upsert'; payload = value; return query },
        update(value) { operation = 'update'; payload = value; return query },
        delete() { operation = 'delete'; return query },
        maybeSingle() { single = true; return query },
        then(resolve, reject) {
          operations.push({ table, operation, payload, single, filters })
          const error = options.failTable === table ? { message: 'synthetic storage failure' } : null
          let data = null
          if (operation === 'select' && table === 'calendar_push_subscriptions') {
            const current = devices.find(d => filters.every(([k,v]) => d[k] === v))
            data = single ? (options.freshDevice ? options.freshDevice(current) : current) : devices
          }
          if (operation === 'select' && table === 'andarun_todos') data = single ? (options.freshEvent ? options.freshEvent(events[0]) : events[0]) : events
          return Promise.resolve({ data, error }).then(resolve, reject)
        },
      }
      return query
    },
    async rpc(name, args) {
      assert.equal(name, 'claim_calendar_push')
      const key = `${args.p_endpoint}:${args.p_key}`
      const acquired = !claims.has(key) && !options.claimDenied
      claims.add(key)
      return { data: acquired, error: null }
    },
  }
  const body = source.replace(/^import .*\r?\n/gm, '').replaceAll('export ', '')
  class Clock extends Date { static now() { return now } }
  const handler = new Function('NextResponse','calendarSchedulerAuthorization','supabaseAdmin','ANDARUN_OWNER_ID','ANDARUN_LEGACY_OWNER_IDS','pushConfigured','sendCalendarPush','dueReminders','eventFromRow','validPushSubscription','Date', body + '\nreturn GET;')(
    { json: (body, options) => Response.json(body, options) }, () => authorization, db, 'owner', ['legacy'], () => options.configured !== false,
    async (subscription, payload) => { pushed.push({ subscription, payload }); if (options.pushStatus) throw { statusCode: options.pushStatus } },
    (...args) => { scans++; return dueReminders(...args) }, eventFromRow, validPushSubscription, Clock)
  return { run: () => handler(new Request('https://example.test/api/andarun/reminders/dispatch')), operations, pushed, scans: () => scans, setAuthorization: value => { authorization = value } }
}

test('idle ticks keep signed heartbeat and retention cleanup, without querying appointments', async () => {
  for (const devices of [[], [{ ...device, leads: [] }], [{ ...device, subscription: {} }]]) {
    const f = fixture({ devices })
    assert.deepEqual(await (await f.run()).json(), { ok: true, sent: 0, failed: 0 })
    assert.equal(f.operations.some(x => x.table === 'andarun_todos'), false)
    assert.equal(f.operations.some(x => x.table === 'calendar_push_health' && x.operation === 'upsert'), true)
    assert.equal(f.operations.some(x => x.table === 'calendar_push_deliveries' && x.operation === 'delete'), true)
    assert.equal(f.pushed.length, 0)
  }
})

test('due notification preserves opt-in details, per-device leads, tag and duplicate lease', async () => {
  const devices = [{ ...device, show_details: true }, { ...device, endpoint_hash: 'device-2', leads: [1440] }]
  const f = fixture({ devices })
  assert.deepEqual(await (await f.run()).json(), { ok: true, sent: 1, failed: 0 })
  assert.deepEqual(f.pushed[0].payload, { title: 'Termin in 30 Minuten', body: 'Appointment · 13:30', tag: `event-1:${Date.parse('2026-11-06T12:30:00Z')}:30` })
  assert.equal((await (await f.run()).json()).sent, 0)
  assert.equal(f.pushed.length, 1)
})

test('event cancellation, rescheduling, completion and newly enabled devices still cancel delivery after claim', async () => {
  for (const patch of [{ note: '[[andarun:todo-meta:{"cancelled":true}]]' }, { done: true }, { event_time: '14:00:00' }]) {
    const f = fixture({ freshEvent: row => ({ ...row, ...patch }) })
    assert.equal((await (await f.run()).json()).sent, 0)
    assert.equal(f.pushed.length, 0)
  }
  for (const patch of [{ leads: [1440] }, { enabled_at: new Date(now + 1).toISOString() }]) {
    const f = fixture({ freshDevice: row => ({ ...row, ...patch }) })
    assert.equal((await (await f.run()).json()).sent, 0)
  }
  for (const options of [{ freshDevice: () => null }, { freshEvent: () => null }, { claimDenied: true }]) {
    const f = fixture(options)
    assert.equal((await (await f.run()).json()).sent, 0)
    assert.equal(f.pushed.length, 0)
  }
})

test('failed push retains retry receipt and removes expired subscriptions', async () => {
  const f = fixture({ pushStatus: 410 })
  assert.deepEqual(await (await f.run()).json(), { ok: true, sent: 0, failed: 1 })
  assert.equal(f.operations.some(x => x.table === 'calendar_push_subscriptions' && x.operation === 'delete'), true)
  assert.equal(f.operations.some(x => x.table === 'calendar_push_deliveries' && x.payload?.status === 'failed'), true)
})

test('authentication, configuration, storage failures and diagnostic heartbeat behavior remain intact', async () => {
  for (const [options, status] of [[{ authorization: false },401], [{ configured: false },503], [{ failTable: 'andarun_todos' },503], [{ failTable: 'calendar_push_health' },503], [{ failTable: 'calendar_push_subscriptions' },503]]) {
    const f = fixture(options)
    assert.equal((await f.run()).status, status)
    assert.equal(f.pushed.length, 0)
  }
  const f = fixture({ authorization: 'diagnostic', events: [] })
  assert.equal((await f.run()).status, 200)
  assert.equal(f.operations.some(x => x.table === 'calendar_push_health'), false)
})

test('twenty idle devices share each event calculation within a tick', async () => {
  const events = Array.from({ length: 100 }, (_, i) => ({ ...event, id: `event-${i}`, event_time: '18:00:00' }))
  const devices = Array.from({ length: 20 }, (_, i) => ({ ...device, endpoint_hash: `device-${i}` }))
  const f = fixture({ events, devices })
  assert.equal((await f.run()).status, 200)
  assert.equal(f.scans(), 100)
  assert.equal(f.pushed.length, 0)
})

test('push readiness does not load web-push; actual send loads it and retains payload/options', async () => {
  const context = vm.createContext({ process: { env: { CALENDAR_VAPID_PUBLIC_KEY: 'a'.repeat(87), CALENDAR_VAPID_PRIVATE_KEY: 'b'.repeat(43), CALENDAR_VAPID_SUBJECT: 'mailto:test@example.test', CALENDAR_CRON_SECRET: 'c'.repeat(32) } }, Date })
  let loads = 0, sent
  const push = new vm.SyntheticModule(['default'], function () { this.setExport('default', { sendNotification: (...args) => { sent = args; return 'sent' } }) }, { context })
  const module = new vm.SourceTextModule(readFileSync(new URL('../lib/calendarPush.js', import.meta.url), 'utf8'), { context, importModuleDynamically: async specifier => {
    assert.equal(specifier, 'web-push'); loads++
    await push.link(() => {}); await push.evaluate(); return push
  } })
  await module.link(specifier => new vm.SyntheticModule(specifier === 'server-only' ? [] : ['supabaseAdmin'], function () {
    if (specifier !== 'server-only') this.setExport('supabaseAdmin', {})
  }, { context }))
  await module.evaluate()
  assert.equal(module.namespace.pushConfigured(), true)
  assert.equal(loads, 0)
  assert.equal(await module.namespace.sendCalendarPush(device.subscription, { title: 'Test' }), 'sent')
  assert.equal(loads, 1)
  assert.equal(sent[0], device.subscription)
  assert.equal(sent[1], '{"title":"Test"}')
  assert.equal(sent[2].TTL, 300)
  assert.equal(sent[2].timeout, 5000)
})
