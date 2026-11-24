import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import vm from 'node:vm'
import { validPushSubscription } from '../utils/calendarReminders.js'

const device = { subscription: { endpoint:'https://fcm.googleapis.com/fcm/send/test',keys:{p256dh:'a'.repeat(87),auth:'a'.repeat(22)} } }
const candidate = { owner_id:'owner',endpoint_hash:'test-device',reminder_key:'event:1795512600000:30' }
const payload = { ...device,enabled_at:'2026-01-01T00:00:00Z',title:'Synthetic appointment',event_time:'14:00',lead:30,show_details:false }
const source = readFileSync(new URL('../app/api/andarun/reminders/dispatch/route.js',import.meta.url),'utf8')
function fixture(options = {}) {
  let claimed = false
  const pushes = [], writes = []
  const db = {
    rpc(name) {
      if (name === 'calendar_push_candidates') return { select: () => ({limit: async () => ({data:options.idle ? [] : [candidate],error:options.listError})}) }
      assert.equal(name,'claim_due_calendar_push')
      return {maybeSingle:async () => {
        if (claimed || options.cancelled) return {data:null}
        claimed=true
        return {data:{...payload,...options.payload}}
      }}
    },
    from(table) {
      const builder = { eq:()=>builder,then(resolve,reject){return Promise.resolve({error:options.writeError}).then(resolve,reject)} }
      return {update(value){writes.push({table,value});return builder},delete(){writes.push({table});return builder}}
    },
  }
  const handler=new Function('NextResponse','calendarSchedulerAuthorization','supabaseAdmin','pushConfigured','sendCalendarPush','validPushSubscription',
    source.replace(/^import .*\r?\n/gm,'').replaceAll('export ','')+'\nreturn GET')(
    {json:(value,options)=>Response.json(value,options)},()=>options.auth!==false,db,()=>options.configured!==false,
    async (subscription,message)=>{pushes.push(message);if(options.pushError)throw options.pushError},validPushSubscription)
  return {run:()=>handler(new Request('https://example.org/api/andarun/reminders/dispatch')),pushes,writes}
}

test('concurrent dispatchers share one claim; only the owning device gets one push',async()=>{
  const f=fixture()
  const responses=await Promise.all([f.run(),f.run()])
  assert.equal(responses.every(r=>r.status===200),true)
  assert.deepEqual(f.pushes,[{title:'Termin in 30 Minuten',body:'Öffne deinen persönlichen Kalender für die Details.',tag:candidate.reminder_key}])
  assert.equal(f.writes[0].value.status,'sent')
  const optIn=fixture({payload:{show_details:true,lead:1440}})
  await optIn.run()
  assert.equal(optIn.pushes[0].title,'Termin in einem Tag')
  assert.equal(optIn.pushes[0].body,'Synthetic appointment · 14:00')
})
test('missing or invalid claims, idle scans and access failures produce no push',async()=>{
  for(const [options,status] of [[{idle:true},200],[{cancelled:true},200],[{payload:{subscription:{}}},200],[{auth:false},401],[{configured:false},503],[{listError:true},503]]){
    const f=fixture(options);assert.equal((await f.run()).status,status);assert.equal(f.pushes.length,0)
  }
})
test('explicit transient refusals can retry, uncertain acceptance and expired devices cannot',async()=>{
  for (const [error,status] of [[{statusCode:429,headers:{'retry-after':'120'}},'failed'],[{statusCode:503},'failed'],[new Error('timeout'),'uncertain'],[{statusCode:502},'uncertain'],[{statusCode:410},'rejected']]) {
    const f=fixture({pushError:error});await f.run()
    const write=f.writes.find(w=>w.table==='calendar_push_deliveries').value
    assert.equal(write.status,status)
    if(status==='failed') assert.ok(Date.parse(write.retry_after)>Date.now())
    if(error.statusCode===410)assert.ok(f.writes.some(w=>w.table==='calendar_push_subscriptions'))
  }
})
test('loss of the receipt update after provider acceptance never submits the same claim twice',async()=>{
  const f=fixture({writeError:true});assert.equal((await f.run()).status,503)
  await f.run();assert.equal(f.pushes.length,1)
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
