import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import vm from 'node:vm'
import { PGlite } from '@electric-sql/pglite'
import * as protocol from '../utils/exitAnalytics.js'

const read = file => readFile(new URL('../'+file,import.meta.url),'utf8')

test('exit API commits both daily and route totals once, including stale and concurrent deliveries', async () => {
  const db = new PGlite()
  try {
    await db.exec('create role anon; create role authenticated; create role service_role;')
    await db.exec(await read('supabase/migrations/0002_site_analytics.sql'))
    await db.exec(await read('supabase/migrations/20261124121931_record_exit_analytics.sql'))
    let calls = 0, fail = false
    const context = vm.createContext({ Response,Request,URL,TextEncoder,console })
    const modules = {}
    function mock(name, values) {
      modules[name] = new vm.SyntheticModule(Object.keys(values),function(){
        for(const [k,v] of Object.entries(values)) this.setExport(k,v)
      },{context})
    }
    mock('next/server',{NextResponse:Response})
    mock('@/lib/userIdentity',{getSignedInUserIdentity:async()=>({userId:'account',ownerId:'owner'})})
    mock('@/utils/exitAnalytics',protocol)
    mock('@/lib/supabase/server',{isSupabaseAdminConfigured:true,supabaseAdmin:{rpc:async(name,args)=>{
      calls++
      if(fail) return {error:{code:'outage'}}
      assert.equal(name,'record_exit_analytics')
      await db.query('select record_exit_analytics($1,$2,$3::jsonb)',[args.p_visitor,args.p_owner,JSON.stringify(args.p_entries)])
      return {error:null}
    }}})
    const route = new vm.SourceTextModule(await read('app/api/analytics/track/route.js'),{context})
    await route.link(name=>modules[name]);await route.evaluate()
    const visitorId='test-browser-1234', batchId=crypto.randomUUID(), base='https://rad.test'
    const first={id:crypto.randomUUID(),actor:'account',path:'/a',day:'2026-11-18',seen:'2026-11-18T21:01:00Z',seconds:3700,views:1,visits:1}
    const second={...first,id:crypto.randomUUID(),actor:'another',path:'/b',seconds:60,visits:0,seen:'2026-11-19T00:01:00Z',day:'2026-11-19'}
    const send=(entries,origin=base)=>route.namespace.POST(new Request(base+'/api/analytics/track',{method:'POST',
      headers:{'Content-Type':'application/json',origin},body:JSON.stringify({visitorId,batchId,entries})}))
    for(const [entries,origin] of [[[first],'https://else.test'],[[{...first,seconds:-1}],base],[[{...first,day:'2026-11-20'}],base]]){
      assert.ok((await send(entries,origin)).status>=400)
    }
    assert.equal(calls,0)
    fail=true
    const failed=await send([first]);assert.equal(failed.status,503);assert.equal(failed.headers.get('set-cookie'),null)
    fail=false
    const response=await send([first,second]);assert.equal(response.status,204)
    assert.equal(response.headers.get('X-Radyar-Analytics-Ack'),batchId)
    assert.ok(response.headers.get('set-cookie').includes(protocol.ACK_PREFIX+batchId+'=1'))
    const newer={...first,seconds:3777,seen:'2026-11-18T21:02:17Z'}
    await Promise.all([send([newer,second]),send([first,second])])
    const days=(await db.query('select visits,page_views,active_seconds,user_id from analytics_daily order by day')).rows
    assert.deepEqual(days,[{visits:1,page_views:1,active_seconds:3777,user_id:'owner'},{visits:0,page_views:1,active_seconds:60,user_id:null}])
    assert.deepEqual((await db.query('select path,views,active_seconds from analytics_pages order by path')).rows,
      [{path:'/a',views:1,active_seconds:3777},{path:'/b',views:1,active_seconds:60}])
    assert.equal((await db.query("select has_function_privilege('anon','public.record_exit_analytics(text,text,jsonb)','execute') as permitted")).rows[0].permitted,false)
  } finally { await db.close() }
})
