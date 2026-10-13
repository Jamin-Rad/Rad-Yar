import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { berlinEventInstant, dueReminders, eventFromRow, validPushSubscription } from '../utils/calendarReminders.js'
import { todayEvents } from '../utils/andarunToday.js'

const row = { id: 'event-1', item_type: 'event', title: 'Test', deadline: '2026-10-14', event_time: '15:00:00', done: false, created_at: '2026-10-01T00:00:00Z' }
const event = eventFromRow(row)
test('Berlin time independent of machine timezone, including DST transitions', () => {
  assert.equal(new Date(berlinEventInstant('2026-10-14', '15:00')).toISOString(), '2026-10-14T13:00:00.000Z')
  assert.equal(new Date(berlinEventInstant('2026-12-14', '15:00')).toISOString(), '2026-12-14T14:00:00.000Z')
  assert.equal(berlinEventInstant('2026-03-29', '02:30'), null)
  assert.equal(new Date(berlinEventInstant('2026-10-25', '02:30')).toISOString(), '2026-10-25T00:30:00.000Z')
  for (const [date, time] of [['2026-02-30','12:00'], ['2026-10-14','25:00'], ['2026-10-14','15:99'], ['bad','12:00']]) assert.equal(berlinEventInstant(date,time),null)
})
test('24h and 30min reminders only when due, and only for active timed events', () => {
  const start = berlinEventInstant(event.deadline, event.time)
  for (const lead of [1440, 30]) {
    const now = start - lead * 60000
    assert.equal(dueReminders(event, [1440,30], now).length, 1)
    assert.equal(dueReminders(event, [1440,30], now)[0].lead, lead)
    assert.equal(dueReminders(event, [lead], now - 1).length, 0)
    assert.equal(dueReminders(event, [lead], now + 300001).length, 0)
    for (const patch of [{ cancelled:true }, { done:true }, { allDay:true }, { itemType:'holiday' }, { itemType:'schoolHoliday' }, { time:'' }, { created_at:new Date(now+1).toISOString() }]) assert.deepEqual(dueReminders({...event,...patch},[lead],now),[])
  }
  assert.deepEqual(dueReminders(event,[30],start+1),[])
})
test('legacy metadata carries cancellation and schedule and rescheduling changes receipt key', () => {
  const stored = eventFromRow({...row,item_type:undefined,event_time:undefined,note:'[[andarun:todo-meta:{"itemType":"event","eventTime":"15:00","cancelled":true}]]\nNote'})
  assert.equal(stored.cancelled,true)
  assert.equal(stored.time,'15:00')
  const now = berlinEventInstant(event.deadline,event.time) - 30 * 60000
  const first = dueReminders(event,[30],now)[0].key
  const second = dueReminders({...event,time:'15:01'},[30],now+60000)[0].key
  assert.notEqual(first,second)
  assert.deepEqual(todayEvents([{itemType:'event',deadline:'2026-10-14',cancelled:true}], '2026-10-14'),[])
})
test('subscriptions cannot be arbitrary URLs (SSRF) and must have correct key lengths', () => {
  const subscription = endpoint => ({endpoint,keys:{p256dh:'a'.repeat(87),auth:'a'.repeat(22)}})
  for (const endpoint of ['https://web.push.apple.com/id','https://fcm.googleapis.com/fcm/send/id','https://updates.push.services.mozilla.com/id']) assert.equal(validPushSubscription(subscription(endpoint)),true)
  for (const endpoint of ['http://web.push.apple.com/id','https://127.0.0.1/id','https://evil.example/id','https://fcm.googleapis.com.evil.example/id','https://fcm.googleapis.com:8443/id','https://user:pass@fcm.googleapis.com/id','https://fcm.googleapis.com/id#key']) assert.equal(validPushSubscription(subscription(endpoint)),false)
  assert.equal(validPushSubscription({ ...subscription('https://fcm.googleapis.com/id'),keys:{}}),false)
})
test('cancellation persists through old-schema PATCH and uses owner + concurrent update guards', () => {
  const source = readFileSync(new URL('../app/api/andarun/todos/route.js',import.meta.url),'utf8')
  assert.match(source,/body = \{ \.\.\.saved, \.\.\.body \}/)
  assert.match(source,/fallbackUpdate\.note = encodeStoredNote\([^\n]*body\.cancelled === true/)
  assert.match(source,/\.eq\('updated_at', existing\.data\.updated_at\)/)
  const dispatcher = readFileSync(new URL('../app/api/andarun/reminders/dispatch/route.js',import.meta.url),'utf8')
  assert.match(dispatcher,/timingSafeEqual/)
  assert.match(dispatcher,/claim_calendar_push/)
  assert.match(dispatcher,/dueReminders\(eventFromRow\(fresh\.data\)/)
  const sql = readFileSync(new URL('../supabase/migrations/0024_calendar_push.sql',import.meta.url),'utf8')
  assert.equal((sql.match(/enable row level security/g)||[]).length,3)
  assert.match(sql,/revoke all on function/)
  const sw = readFileSync(new URL('../public/andarun/sw.js',import.meta.url),'utf8')
  assert.doesNotMatch(sw,/addEventListener\('fetch'/)
})

function calendarApiFixture({ legacy = false, authorized = true, concurrent = false } = {}) {
  let stored = { ...row, owner_id: 'private:test', note: '[[andarun:todo-meta:{"itemType":"event","eventTime":"15:00","endTime":"16:00","allDay":false}]]\nExisting note', updated_at: '2026-10-01T00:00:00Z' }
  const db = { from() {
    let operation = 'read', patch, filters = []
    const query = {
      select() { return query },
      eq(key,value) { filters.push([key,value]); return query },
      in(key,values) { filters.push([key,values]); return query },
      update(value) { operation = 'update'; patch = value; return query },
      async maybeSingle() {
        if (!authorized) return {data:null,error:null}
        if (operation === 'read') return {data:structuredClone(stored),error:null}
        if (legacy && 'item_type' in patch) return {data:null,error:{message:'item_type column missing'}}
        if (concurrent || filters.some(([key,value]) => Array.isArray(value) ? !value.includes(stored[key]) : value !== stored[key])) return {data:null,error:null}
        stored = {...stored,...patch}
        return {data:structuredClone(stored),error:null}
      },
    }
    return query
  }}
  const source = readFileSync(new URL('../app/api/andarun/todos/route.js', import.meta.url),'utf8').replace(/^import .*\r?\n/gm,'').replaceAll('export async function','async function')
  const handlers = new Function('NextResponse','requireAndarunSession','requireFatimaSession','SHARED_ANDARUN_LOOKUP_OWNER_IDS','SHARED_ANDARUN_OWNER_ID','isSupabaseAdminConfigured','supabaseAdmin', source + '\nreturn { PATCH };')(
    {json:(body,options)=>Response.json(body,options)}, async()=>({ownerId:'private:test'}), async()=>({error:'denied'}), [], 'shared', true, db)
  const patch = body => handlers.PATCH(new Request('https://www.rad-yar.com/api/andarun/todos',{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:row.id,...body})}))
  return { patch, stored:()=>stored }
}

test('actual PATCH handler cancels/restores/completes without losing note/time or deleting rows', async () => {
  for (const legacy of [false,true]) {
    const api = calendarApiFixture({legacy})
    let response = await api.patch({cancelled:true})
    assert.equal(response.status,200)
    let payload = await response.json()
    assert.equal(payload.todo.cancelled,true)
    assert.equal(payload.todo.eventTime,'15:00')
    assert.equal(payload.todo.endTime,'16:00')
    assert.equal(payload.todo.note,'Existing note')
    response = await api.patch({title:'Renamed'})
    assert.equal((await response.json()).todo.cancelled,true)
    response = await api.patch({cancelled:false,done:true})
    payload = await response.json()
    assert.equal(payload.todo.cancelled,false)
    assert.equal(payload.todo.done,true)
    assert.ok(payload.todo.completedAt)
    const completedAt = payload.todo.completedAt
    response = await api.patch({note:'Edited note'})
    payload = await response.json()
    assert.equal(payload.todo.completedAt,completedAt)
    assert.equal(payload.todo.eventTime,'15:00')
    assert.equal(payload.todo.note,'Edited note')
    response = await api.patch({done:false})
    assert.equal((await response.json()).todo.completedAt,null)
  }
})
test('actual PATCH refuses foreign ownership and simultaneous changes on both schemas', async () => {
  assert.equal((await calendarApiFixture({authorized:false}).patch({cancelled:true})).status,404)
  for (const legacy of [false,true]) assert.equal((await calendarApiFixture({legacy,concurrent:true}).patch({cancelled:true})).status,409)
})
