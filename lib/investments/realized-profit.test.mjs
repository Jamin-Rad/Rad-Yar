import test from 'node:test'
import assert from 'node:assert/strict'
import { realizedProfit, realizedProfitCsv } from './realized-profit.mjs'
const now=Date.parse('2026-06-08T15:00:00Z'),today='2026-06-08',isin='US0378331005'
const accounts=[{id:'self',owner:'Synthetic'},{id:'child',owner:'Synthetic Child'}]
const tx=(id,type,quantity,date,amountCents,extra={})=>({id,accountId:'self',isin,name:'Example',type,quantity,date,datetime:date+'T12:00:00Z',currency:'EUR',amountCents,cashCents:amountCents,issues:[],...extra})
const calc=rows=>realizedProfit(accounts,rows,now,today)
test('partial exits use sold FIFO purchase costs, not proceeds or the remaining position value',()=>{
 const rows=[tx('b1','BUY','10','2025-01-01',-10000,{cashCents:-10100}),tx('s1','SELL','3','2026-05-01',4500,{cashCents:4200}),tx('b2','BUY','2','2026-06-01',-5000)]
 const result=calc(rows)
 assert.equal(result.gainCents,1170);assert.equal(result.count,1);assert.equal(result.sales[0].costCents,3030)
 assert.equal(result.accounts[1].gainCents,0)
})
test('fully closed and repurchased securities keep all realized wins and losses in their own accounts',()=>{
 const rows=[tx('b1','BUY','2','2025-01-01',-2000),tx('s1','SELL','2','2025-02-01',2500),tx('b2','BUY','1','2026-01-01',-2000),tx('s2','SELL','1','2026-02-01',1500),tx('cb','BUY','1','2026-01-01',-1000,{accountId:'child'}),tx('cs','SELL','1','2026-02-01',1200,{accountId:'child'})]
 const result=calc(rows)
 assert.equal(result.gainCents,200);assert.equal(result.winningCents,700);assert.equal(result.losingCents,-500)
 assert.deepEqual(result.accounts.map(a=>a.gainCents),[0,200])
})
test('unknown original purchase basis is explicit and never counted as zero or the whole sale proceeds',()=>{
 const result=calc([tx('old','SELL','1','2026-05-01',5000)])
 assert.equal(result.complete,false);assert.equal(result.gainCents,null);assert.equal(result.knownGainCents,null);assert.equal(result.knownCount,0)
 const partial=calc([tx('old','SELL','1','2026-05-01',5000),tx('cb','BUY','1','2026-01-01',-1000,{accountId:'child'}),tx('cs','SELL','1','2026-02-01',1200,{accountId:'child'})])
 assert.equal(partial.gainCents,null);assert.equal(partial.knownGainCents,200);assert.equal(partial.knownCount,1);assert.equal(partial.count,2)
})
test('transfers, dividends, interest and unrealized holdings are excluded from sold profit',()=>{
 const rows=[tx('b','BUY','1','2026-01-01',-1000),tx('d','DIVIDEND','1','2026-02-01',200),tx('t','TRANSFER_IN',null,'2026-02-01',50000,{isin:''}),tx('i','INTEREST_PAYMENT',null,'2026-02-01',300,{isin:''})]
 assert.equal(calc(rows).gainCents,0);assert.equal(calc(rows).count,0)
 assert.equal(realizedProfit(accounts,null,now,today),null)
})
test('future sales and unrelated account results are excluded; export leaves missing gains blank',()=>{
 const rows=[tx('b','BUY','1','2026-01-01',-1000),tx('s','SELL','1','2026-06-09',2000),tx('other','SELL','1','2026-05-01',5000,{accountId:'outside'})]
 assert.equal(calc(rows).count,0)
 const result=calc([tx('s','SELL','1','2026-05-01',5000)]),csv=realizedProfitCsv(result,'self')
 assert.ok(csv.includes('FIFO after tax EUR'));assert.ok(csv.includes('50.00'));assert.ok(!csv.includes('Synthetic Child'));assert.ok(csv.includes('خرید اولیه'))
})
test('every date range filters exit dates after matching purchases from the full prior history',()=>{
 const rows=[tx('buy','BUY','10','2025-01-01',-10000),tx('sale1','SELL','2','2026-05-31',3000),tx('sale2','SELL','3','2026-06-01',4500),tx('sale3','SELL','1','2026-06-05',800),tx('sale4','SELL','1','2026-06-08',1300)]
 const range={from:'2026-06-01',to:'2026-06-05'},result=realizedProfit(accounts,rows,now,today,range)
 assert.deepEqual(result.sales.map(s=>s.id),['sale2','sale3'])
 assert.equal(result.gainCents,1300);assert.equal(result.from,range.from);assert.equal(result.to,range.to)
 assert.equal(realizedProfit(accounts,rows,now,today,{from:'2026-07-01',to:'2026-07-02'}),null)
 assert.equal(realizedProfit(accounts,rows,now,today,{error:'Invalid'}),null)
})
