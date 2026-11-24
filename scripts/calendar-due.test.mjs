import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { PGlite } from '@electric-sql/pglite'
import { berlinEventInstant } from '../utils/calendarReminders.js'

const read = path => readFile(new URL('../' + path, import.meta.url),'utf8')
const owner = 'email:dr.benjamin.zia@gmail.com'
const legacy = 'email:drbenjaminzia@gmail.com'
const id = 'aaaaaaaa-1111-4111-8111-111111111111'
const note = (time, extra = {}) => '[[andarun:todo-meta:' + JSON.stringify({itemType:'event',eventTime:time,allDay:false,...extra}) + ']]'
const fmt = new Intl.DateTimeFormat('sv-SE',{timeZone:'Europe/Berlin',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'})

test('Postgres tick, time zones, leases and duplicate receipts', async () => {
  const db = new PGlite()
  const rows = async (q,args=[]) => (await db.query(q,args)).rows
  const tick = async () => (await rows('select public.calendar_push_tick() as id'))[0].id
  const due = at => rows('select reminder_key, lead from calendar_push_candidates($1)',[new Date(at).toISOString()])
  const claim = key => rows('select * from claim_due_calendar_push($1,$2,$3)',[owner,'test',key])
  try {
    await db.exec('create role anon; create role authenticated; create role service_role;')
    await db.exec((await read('supabase/migrations/0008_andarun_todos.sql')).replace('create extension if not exists pgcrypto;', ''))
    await db.exec(await read('supabase/migrations/0024_calendar_push.sql'))
    await db.exec(await read('supabase/migrations/20261124114153_due_calendar_push.sql'))
    await db.exec(`create schema vault; create schema net; create schema extensions;
      create table vault.secrets(name text); insert into vault.secrets values ('jaminova_calendar_cron_secret');
      create view vault.decrypted_secrets as select name,'synthetic'::text as decrypted_secret from vault.secrets;
      create function extensions.hmac(text,text,text) returns bytea language sql as 'select decode(''11'',''hex'')';
      create table net.calls(id bigserial,url text,headers jsonb);
      create function net.http_get(url text,headers jsonb,timeout_milliseconds integer) returns bigint language sql
      as 'insert into net.calls(url,headers) values ($1,$2) returning id';`)
    const setup = await read('docs/calendar-push-cron.sql')
    await db.exec(setup.slice(setup.indexOf('create or replace function'),setup.indexOf('select cron.schedule')))
    assert.equal(await tick(),null)
    assert.equal((await rows('select last_run is not null as live from calendar_push_health'))[0].live,true)
    await db.query("insert into calendar_push_subscriptions(owner_id,endpoint_hash,subscription,enabled_at) values ($1,'test','{}','2025-01-01')",[owner])
    await db.query("insert into andarun_todos(id,owner_id,title,lane,deadline,note,created_at) values($1,$2,'Test','today','2026-10-25',$3,'2025-01-01')",[id,legacy,note('02:30')])
    const start=berlinEventInstant('2026-10-25','02:30')
    for (const lead of [30,1440]) {
      const at=start-lead*60000
      assert.deepEqual(await due(at-1),[])
      assert.deepEqual(await due(at),[{reminder_key:id+':'+start+':'+lead,lead}])
      assert.equal((await due(at+300000)).length,1)
      assert.deepEqual(await due(at+300001),[])
    }
    await db.query("update andarun_todos set deadline='2026-03-29'")
    assert.deepEqual(await due(Date.parse('2026-03-29T01:00:00Z')),[])
    const minute = Math.floor(Date.now()/60000)*60000, appointment=minute+30*60000
    const [date,time]=fmt.format(appointment).split(' '), key=id+':'+appointment+':30'
    await db.query('update andarun_todos set deadline=$1,note=$2',[date,note(time)])
    for (const invalid of [note(time,{cancelled:true}),note(time,{allDay:true}),note(time,{itemType:'todo'}),'[[andarun:todo-meta:{broken}]]']) {
      await db.query('update andarun_todos set note=$1',[invalid]);assert.equal(await tick(),null)
    }
    await db.query('update andarun_todos set note=$1,done=true',[note(time)])
    assert.equal(await tick(),null)
    await db.query('update andarun_todos set done=false,created_at=$1',[new Date(minute+1).toISOString()])
    assert.equal(await tick(),null)
    await db.query("update andarun_todos set created_at='2025-01-01'")
    await db.query('update calendar_push_subscriptions set enabled_at=$1',[new Date(minute+1).toISOString()])
    assert.equal(await tick(),null)
    await db.exec("update calendar_push_subscriptions set enabled_at='2025-01-01'")
    assert.ok(await tick()); assert.equal(await tick(),null)
    assert.equal((await rows('select * from net.calls')).length,1)
    // Revalidate the appointment and device at reservation time, even after a due tick.
    await db.query('update andarun_todos set note=$1',[note(time,{cancelled:true})]);assert.deepEqual(await claim(key),[])
    await db.query('update andarun_todos set note=$1',[note(time)])
    await db.query('update calendar_push_subscriptions set leads=array[1440]');assert.deepEqual(await claim(key),[])
    await db.query('update calendar_push_subscriptions set leads=array[1440,30]')
    const duplicate=await Promise.all([claim(key),claim(key)]);assert.equal(duplicate.flat().length,1)
    for (const status of ['sending','sent','uncertain','rejected']) {
      await db.query("update calendar_push_deliveries set status=$1,claimed_at=now()-interval '2 minutes'",[status])
      assert.deepEqual(await claim(key),[])
      assert.deepEqual(await due(minute),[])
    }
    await db.exec("update calendar_push_deliveries set status='failed',retry_after=now()+interval '1 minute'")
    assert.deepEqual(await claim(key),[])
    for (const attempt of [2,3]) {
      await db.exec("update calendar_push_deliveries set status='failed',retry_after=now()-interval '1 minute'")
      assert.equal((await claim(key)).length,1)
      assert.equal((await rows('select attempts from calendar_push_deliveries'))[0].attempts,attempt)
    }
    await db.exec("update calendar_push_deliveries set status='failed',retry_after=now()-interval '1 minute'")
    assert.deepEqual(await claim(key),[])
    // Same schedule must work with the additional typed columns used on newer installations.
    await db.exec(await read('supabase/migrations/0010_andarun_todo_events.sql'))
    await db.query("update andarun_todos set note=null,item_type='event',event_time=$1",[time])
    await db.exec('delete from calendar_push_deliveries')
    assert.equal((await due(minute)).length,1)
    await db.exec('update andarun_todos set all_day=true')
    assert.deepEqual(await due(minute),[])
    await db.exec('set role anon')
    await assert.rejects(db.query('select * from calendar_push_candidates()'), /permission denied/)
  } finally { await db.close() }
})
