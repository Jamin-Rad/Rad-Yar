import test from 'node:test'
import assert from 'node:assert/strict'
import {saleUnitPrice,heldSaleEstimate} from './transaction-detail.mjs'

test('sale price uses gross proceeds and fractional units, never net cash',()=>{
  assert.equal(saleUnitPrice({type:'SELL',currency:'EUR',amountCents:12000,cashCents:11900,quantity:'-0.125'}),960)
  assert.equal(saleUnitPrice({type:'SELL',currency:'EUR',amountCents:null,cashCents:11900,quantity:'-0.125'}),null)
  assert.equal(saleUnitPrice({type:'SELL',currency:'USD',amountCents:12000,quantity:'-1'}),null)
  assert.equal(saleUnitPrice({type:'SELL',currency:'EUR',amountCents:12000,quantity:'0'}),null)
})

test('hypothetical result requires a matched current quote and known acquisition cost',()=>{
 const now=Date.parse('2026-08-24T10:00:00Z'),tx={type:'SELL',isin:'US0378331005',quantity:'-0.5',date:'2026-08-01'}
 const market={identity:{isin:tx.isin},quote:{price:120,currency:'EUR',asOf:'2026-08-24T09:00:00Z'}}
 assert.equal(heldSaleEstimate(tx,{costCents:5000},market,now).gainCents,1000)
 assert.equal(heldSaleEstimate(tx,{costCents:null},market,now),null)
 assert.equal(heldSaleEstimate(tx,{costCents:5000},{...market,identity:{isin:'other'}},now),null)
 assert.equal(heldSaleEstimate(tx,{costCents:5000},{...market,splits:[{date:'2026-08-12'}]},now),null)
 assert.equal(heldSaleEstimate(tx,{costCents:5000},market,now+8*86400000),null)
})
