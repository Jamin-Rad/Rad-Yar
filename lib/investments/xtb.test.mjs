import test from 'node:test'
import assert from 'node:assert/strict'
import {normalizeXtbAccounts,xtbBalance,assertXtbHistory} from './xtb.mjs'
import {normalizeFamilyState,assertHistoryPreserved} from './family.mjs'
import {initialInvestmentState} from './test-fixtures.mjs'
const baseline=(id='self')=>({id,currency:'EUR',openingCents:10000,balanceCents:12000,asOf:'2026-10-01',includedExecutionIds:[],entries:[]})
const entry=(id,kind,amountCents)=>({id,kind,amountCents,date:'2026-10-02',recordedAt:'2026-10-02T12:00:00Z',note:''})
test('cash movements change cash without fabricating realized profit',()=>{
 const account=normalizeXtbAccounts([{...baseline(),entries:[entry('a','deposit',3000),entry('b','withdrawal',1000),entry('c','realized',-500)]}])[0]
 const result=xtbBalance(account)
 assert.equal(result.balanceCents,13500);assert.equal(result.profitCents,1500)
 assert.equal(result.returnPercent,15)
})
test('balances and executions stay isolated by owner, included exits are not counted twice',()=>{
 const trades=[{id:'t',ownerId:'self',plan:{currency:'EUR',name:'Example'},executions:[{...entry('e','exit',0),netResultCents:400}]},{id:'f',ownerId:'fatemeh',plan:{currency:'EUR'},executions:[{...entry('e','exit',0),netResultCents:900}]}]
 assert.equal(xtbBalance(baseline(),trades).balanceCents,12400)
 assert.equal(xtbBalance({...baseline(),includedExecutionIds:['t:e']},trades).balanceCents,12000)
 assert.equal(xtbBalance(baseline('fatemeh'),trades).balanceCents,12900)
 assert.equal(xtbBalance(baseline(),[{...trades[0],ownerId:null}]).balanceCents,12000)
 assert.equal(xtbBalance(baseline(),[{...trades[0],plan:{currency:'USD'}}]).balanceCents,12400)
})
test('normalization never seeds private balances and round trips account history',()=>{
 const state=normalizeFamilyState(initialInvestmentState());assert.deepEqual(state.settings.xtbAccounts,[])
 state.settings.xtbAccounts=[baseline(),baseline('fatemeh')]
 assert.deepEqual(normalizeFamilyState(JSON.parse(JSON.stringify(state))),state)
 const next=structuredClone(state);next.settings.xtbAccounts[0].entries.push(entry('new','realized',100))
 assert.equal(assertHistoryPreserved(state,next).settings.xtbAccounts[0].entries.length,1)
 next.settings.xtbAccounts[0].balanceCents++;assert.throws(()=>assertHistoryPreserved(state,next),/XTB/)
})
test('invalid and duplicate owners, entries, currencies and dates are rejected',()=>{
 for(const account of [{...baseline(),id:'mobin'},{...baseline(),currency:'USD'},{...baseline(),balanceCents:1.1},{...baseline(),asOf:'2026-02-30'},{...baseline(),entries:[{...entry('x','deposit',100),date:'2026-09-30'}]},{...baseline(),entries:[entry('x','withdrawal',-100)]}])assert.throws(()=>normalizeXtbAccounts([account]))
 assert.throws(()=>normalizeXtbAccounts([baseline(),baseline()]))
 const previous=normalizeXtbAccounts([{...baseline(),entries:[entry('x','realized',100)]}]);assert.throws(()=>assertXtbHistory(previous,[baseline()]))
})
