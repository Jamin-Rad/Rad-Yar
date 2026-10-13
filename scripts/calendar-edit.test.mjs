import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const id = '11111111-1111-4111-8111-111111111111'
function fixture({legacy=false,foreign=false,concurrent=false,allDay=false}={}) {
  let row = {id,owner_id:'private:test',title:'Appointment',deadline:'2026-10-15',done:false,updated_at:'2026-10-01T12:00:00Z',
    note:'[[andarun:todo-meta:'+JSON.stringify({itemType:'event',eventTime:allDay?'':'15:00',endTime:allDay?'':'16:00',allDay,endDate:allDay?'2026-10-15':'',cancelled:true})+']]\nPrivate note'}
  const db = {from(){
    let patch=null,filters=[]
    const query={select(){return query},eq(k,v){filters.push([k,v]);return query},in(k,v){filters.push([k,v]);return query},update(v){patch=v;return query},async maybeSingle(){
      if(foreign)return {data:null,error:null}
      if(!patch)return {data:structuredClone(row),error:null}
      if(legacy&&'item_type' in patch)return {data:null,error:{message:'item_type column missing'}}
      if(concurrent||filters.some(([k,v])=>Array.isArray(v)?!v.includes(row[k]):v!==row[k]))return {data:null,error:null}
      row={...row,...patch};return {data:structuredClone(row),error:null}
    }};return query
  }}
  const source=readFileSync(new URL('../lib/personalCalendar.js',import.meta.url),'utf8').replace(/^import .*\r?\n/gm,'').replaceAll('export async function','async function')
  const api=new Function('ANDARUN_LEGACY_OWNER_IDS','ANDARUN_OWNER_ID','isSupabaseAdminConfigured','supabaseAdmin','getBadenWuerttembergCalendarEntriesInRange',source+'\nreturn {updatePersonalCalendarEvent};')([], 'private:test',true,db,()=>[])
  return {edit:patch=>api.updatePersonalCalendarEvent({id,expectedUpdatedAt:row.updated_at,...patch}),row:()=>row}
}
test('ChatGPT edits the same row, preserving omitted note, cancellation and end time, on modern and legacy storage',async()=>{
  for(const legacy of [false,true]){
    const api=fixture({legacy})
    let result=await api.edit({title:'Changed',startTime:'15:30'})
    assert.equal(result.event.id,id);assert.equal(result.event.note,'Private note');assert.equal(result.event.cancelled,true);assert.equal(result.event.endTime,'16:00')
    result=await api.edit({cancelled:false,done:true})
    assert.equal(result.event.cancelled,false);assert.equal(result.event.done,true)
    const completed=api.row().completed_at
    result=await api.edit({note:'Changed note'})
    assert.equal(api.row().completed_at,completed);assert.equal(result.event.done,true)
    result=await api.edit({title:'Changed'})
    assert.equal(result.updated,false)
  }
})
test('foreign IDs, holidays, concurrent edits and stale versions are refused',async()=>{
  await assert.rejects(fixture({foreign:true}).edit({title:'Changed'}),/not found/)
  await assert.rejects(fixture({concurrent:true}).edit({title:'Changed'}),/changed while/)
  await assert.rejects(fixture().edit({expectedUpdatedAt:'old',title:'Changed'}),/changed/)
  await assert.rejects(fixture().edit({id:'holiday:2026-10-03',title:'Changed'}),/Holidays/)
})
test('impossible dates and times are rejected; start-time changes cannot silently erase end time',async()=>{
  for(const patch of [{date:'2026-02-30'},{startTime:'29:00'},{startTime:'17:00'},{endTime:'15:00'}])await assert.rejects(fixture().edit(patch))
  const result=await fixture().edit({startTime:'17:00',endTime:''})
  assert.equal(result.event.endTime,'')
  assert.equal((await fixture({allDay:true}).edit({date:'2026-10-16'})).event.endDate,'2026-10-16')
})
test('cancelled cards render no time or secondary cancelled label',()=>{
  const ui=readFileSync(new URL('../app/andarun/todo/TodoPage.jsx',import.meta.url),'utf8')
  assert.match(ui,/!event.cancelled && !event.allDay/)
  assert.doesNotMatch(ui,/<small>Abgesagt<\/small>/)
  const mcp=readFileSync(new URL('../app/api/personal-calendar/mcp/route.js',import.meta.url),'utf8')
  assert.match(mcp,/'update_personal_calendar_event'/)
  assert.match(mcp,/expectedUpdatedAt/)
})
