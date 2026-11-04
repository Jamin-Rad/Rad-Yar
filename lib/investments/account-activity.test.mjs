import test from 'node:test'
import assert from 'node:assert/strict'
import {accountActivity} from './account-activity.mjs'
test('account activity scopes owners, applies inclusive dates and groups newest days first',()=>{
 const rows=[{id:'a',accountId:'self',date:'2026-10-01',datetime:'2026-10-01T10:00Z',name:'One',type:'BUY'},{id:'b',accountId:'self',date:'2026-10-02',datetime:'2026-10-02T10:00Z',name:'Two',type:'SELL'},{id:'c',accountId:'self',date:'2026-10-02',datetime:'2026-10-02T12:00Z',name:'Three',type:'BUY'},{id:'d',accountId:'fatemeh',date:'2026-10-02',datetime:'2026-10-02T12:00Z',name:'Other',type:'BUY'}]
 const result=accountActivity(rows,'self',{from:'2026-10-01',to:'2026-10-02'})
 assert.deepEqual(result.groups.map(g=>g.date),['2026-10-02','2026-10-01'])
 assert.deepEqual(result.rows.map(t=>t.id),['c','b','a'])
 assert.deepEqual(accountActivity(rows,'self',{query:'two',from:'2026-10-02',to:'2026-10-02'}).rows.map(t=>t.id),['b'])
 assert.equal(accountActivity(rows,'self',{from:'2026-10-03'}).rows.length,0)
})
