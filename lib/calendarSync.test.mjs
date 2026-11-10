import { test } from 'node:test'
import assert from 'node:assert/strict'
import { randomUUID } from 'node:crypto'
import { calendarEvent, listCalendar, mutateCalendar, validateCalendarEvent, timestamp } from './calendarSync.mjs'
const identity = { ownerId: 'qa:calendar', lookupOwnerIds: ['qa:calendar', 'qa:legacy'] }
const event = () => ({ title: 'Synthetic calendar sync test', note: 'یادداشت 👨‍👩‍👧‍👦', date: '2026-11-10', startTime: '11:00', endTime: '12:00', endDate: '', allDay: false, done: false, cancelled: false, category: 'Privat' })
const change = (e = event()) => ({ id: randomUUID(), mutationId: randomUUID(), expectedUpdatedAt: null, operation: 'save', event: e })
class DB {
  rows = []; race = null; fail = false; lostAck = false
  from(table) { assert.equal(table, 'andarun_todos'); return new Query(this) }
}
class Query {
  constructor(db) { this.db = db; this.filters = []; this.kind = 'select'; this.max = Infinity }
  select() { return this }
  eq(k,v) { this.filters.push(r => k === 'updated_at' ? timestamp(r[k]) === timestamp(v) : r[k] === v); return this }
  in(k,v) { this.filters.push(r => v.includes(r[k])); return this }
  gt(k,v) { this.filters.push(r => r[k] > v); return this }
  order() { return this }
  limit(n) { this.max = n; return this }
  maybeSingle() { this.singleRow = true; return this }
  single() { this.singleRow = true; return this }
  update(value) { this.kind = 'update'; this.value = value; return this }
  insert(value) { this.kind = 'insert'; this.value = value; return this }
  then(resolve, reject) {
    try {
      if (this.db.fail) return resolve({ data: null, error: { code: 'network' } })
      if (this.kind === 'update' && this.db.race) { const action = this.db.race; this.db.race = null; action(this.db.rows) }
      let rows = this.db.rows.filter(r => this.filters.every(f => f(r))).sort((a,b) => a.id.localeCompare(b.id)).slice(0,this.max)
      if (this.kind === 'insert') {
        if (this.db.rows.some(r => r.id === this.value.id)) return resolve({ data: null, error: { code: '23505' } })
        rows = [structuredClone(this.value)]; this.db.rows.push(rows[0])
      }
      if (this.kind === 'update') rows.forEach(r => Object.assign(r,this.value))
      if (this.kind !== 'select' && this.db.lostAck) { this.db.lostAck = false; throw new Error('lost acknowledgement') }
      resolve({ data: structuredClone(this.singleRow ? rows[0] || null : rows), error: null })
    } catch(e) { reject(e) }
  }
}
test('create is persistent and a lost response retry is idempotent', async () => {
  const db = new DB(); const op = change(); db.lostAck = true
  await assert.rejects(mutateCalendar(db, identity, op))
  const retry = await mutateCalendar(db, identity, op)
  assert.equal(db.rows.length, 1); assert.equal(retry.event.title, op.event.title)
  assert.equal(retry.event.note, op.event.note)
  assert.equal((await listCalendar(db,identity)).events.length,1)
})
test('two clients: stale write cannot replace another device change', async () => {
  const db = new DB(); const created = await mutateCalendar(db,identity,change())
  const base = { id: created.event.id, expectedUpdatedAt: created.event.updatedAt, operation: 'save', event: event() }
  const newer = await mutateCalendar(db,identity,{ ...base, mutationId: randomUUID(), event:{...event(),title:'iPad update'} })
  await assert.rejects(mutateCalendar(db,identity,{...base,mutationId:randomUUID()}), e => e.status === 409 && e.current.title === 'iPad update')
  assert.equal(db.rows[0].title, newer.event.title)
})
test('concurrent mutation between read and write is detected atomically',async()=>{
  const db=new DB(); const saved=await mutateCalendar(db,identity,change())
  db.race=rows=>{ rows[0].title='ChatGPT edit'; rows[0].updated_at='2030-01-01T00:00:00.123456Z' }
  await assert.rejects(mutateCalendar(db,identity,{id:saved.event.id,mutationId:randomUUID(),operation:'save',event:event(),expectedUpdatedAt:saved.event.updatedAt}),e=>e.status===409 && e.current.title==='ChatGPT edit')
})
test('cancellation keeps the row and metadata for the web and ChatGPT', async()=>{
  const db=new DB(); const saved=await mutateCalendar(db,identity,change())
  db.rows[0].note=db.rows[0].note.replace('"itemType"','"futureField":"preserved","itemType"')
  const result=await mutateCalendar(db,identity,{id:saved.event.id,mutationId:randomUUID(),operation:'cancel',expectedUpdatedAt:saved.event.updatedAt})
  assert.equal(result.event.cancelled,true); assert.equal(db.rows.length,1); assert.match(db.rows[0].note,/futureField/)
})
test('deleted event cannot be silently resurrected; foreign IDs and task IDs are protected',async()=>{
  const db=new DB(); const saved=await mutateCalendar(db,identity,change()); db.rows=[]
  await assert.rejects(mutateCalendar(db,identity,{...change(),id:saved.event.id,expectedUpdatedAt:saved.event.updatedAt}),e=>e.status===409)
  db.rows=[{id:saved.event.id,owner_id:'someone-else',title:'private',note:'secret'}]
  await assert.rejects(mutateCalendar(db,identity,{...change(),id:saved.event.id}),e=>e.status===409 && e.current===null)
  assert.deepEqual((await listCalendar(db,identity)).events,[])
  db.rows[0].owner_id=identity.ownerId
  await assert.rejects(mutateCalendar(db,identity,{...change(),id:saved.event.id}),e=>e.status===409)
})
test('legacy metadata including inactive and multi-day events round trips',async()=>{
  const db=new DB(); const value={...event(),allDay:true,date:'2026-10-24',endDate:'2026-10-27',startTime:'',endTime:'',done:true}
  const saved=await mutateCalendar(db,identity,change(value))
  assert.equal(saved.event.endDate,'2026-10-27'); assert.equal(saved.event.done,true)
  db.rows[0].owner_id='qa:legacy'
  assert.equal((await listCalendar(db,identity)).events.length,1)
})
test('invalid dates, times and text are rejected rather than truncated',()=>{
  for(const patch of [{date:'2026-02-30'},{startTime:'25:00'},{endTime:'10:00'},{title:' '},{note:'x'.repeat(501)},{title:'x'.repeat(241)},{category:'bad'},{allDay:true,endDate:'2026-11-09'}])
    assert.throws(()=>validateCalendarEvent({...event(),...patch}))
  assert.equal(validateCalendarEvent({...event(),note:'👨‍👩‍👧‍👦'.repeat(500)}).note.length,5500)
})
test('microsecond versions are not collapsed to milliseconds',()=>{
  assert.equal(timestamp('2026-11-10 10:00:00.25+00'),timestamp('2026-11-10T10:00:00.250000Z'))
  assert.notEqual(timestamp('2026-11-10T10:00:00.123001Z'),timestamp('2026-11-10T10:00:00.123002Z'))
})
test('pagination does not silently drop events above the server page size',async()=>{
  const db=new DB()
  for(let i=0;i<501;i++) db.rows.push({id:randomUUID(),owner_id:identity.ownerId,title:'test',note:'[[andarun:todo-meta:{"itemType":"event"}]]',deadline:'2026-11-10'})
  const a=await listCalendar(db,identity); const b=await listCalendar(db,identity,a.nextCursor)
  assert.equal(a.events.length,500);assert.equal(b.events.length,1);assert.equal(b.nextCursor,null)
})
