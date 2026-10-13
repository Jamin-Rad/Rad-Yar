import test from 'node:test'
import assert from 'node:assert/strict'
import { calendarSchedulerSignature,calendarSchedulerAuthorized,calendarSchedulerAuthorization } from '../utils/calendarSchedulerAuth.js'
const secret = 'synthetic-test-secret-not-a-real-key'
const now = Date.parse('2026-10-13T16:00:00Z')
const timestamp = String(now/1000)
const url = 'https://www.rad-yar.com/api/andarun/reminders/dispatch'
const req = (headers={},target=url,method='GET') => new Request(target,{method,headers})
test('short-lived scheduler signatures authenticate without putting the permanent token in request headers',()=>{
  const signature=calendarSchedulerSignature(secret,timestamp)
  const request=req({'x-calendar-timestamp':timestamp,'x-calendar-signature':signature})
  assert.equal(calendarSchedulerAuthorized(request,secret,now),true)
  assert.equal(calendarSchedulerAuthorization(request,secret,now),'signed')
  assert.equal(JSON.stringify([...request.headers]).includes(secret),false)
  assert.equal(calendarSchedulerAuthorized(request,secret,now+90001),false)
  assert.equal(calendarSchedulerAuthorized(request,secret,now-30001),false)
  assert.equal(calendarSchedulerAuthorized(request,'wrong',now),false)
})
test('invalid signatures, unicode bearers, methods and paths fail closed',()=>{
  const headers={'x-calendar-timestamp':timestamp,'x-calendar-signature':calendarSchedulerSignature(secret,timestamp)}
  for(const request of [req(),req({'authorization':'Bearer '+ 'é'.repeat(32)}),req({...headers,'x-calendar-signature':'bad'}),req({...headers,'x-calendar-timestamp':'NaN'}),req(headers,url+'/other'),req(headers,url,'POST')])assert.equal(calendarSchedulerAuthorized(request,secret,now),false)
  assert.equal(calendarSchedulerAuthorized(req({authorization:'Bearer '+secret}),secret,now),true)
  assert.equal(calendarSchedulerAuthorization(req({authorization:'Bearer '+secret}),secret,now),'diagnostic')
  assert.equal(calendarSchedulerAuthorized(req(headers),'',now),false)
})
