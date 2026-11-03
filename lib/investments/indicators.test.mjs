import test from 'node:test'
import assert from 'node:assert/strict'
import {sma,ema,rsi,technicalHistory,normalizeDailyHistory} from './indicators.mjs'
const closeTo=(actual,expected)=>assert.ok(Math.abs(actual-expected)<1e-8,`${actual} != ${expected}`)
test('SMA and SMA-seeded EMA require full warm-up and match hand calculations',()=>{
 assert.deepEqual(sma([5,6,7,8,9],3),[null,null,6,7,8])
 assert.deepEqual(ema([1,2,3,4,5],3),[null,null,2,3,4])
 assert.deepEqual(ema([1,2],3),[null,null])
})
test('Wilder RSI matches the published calculation series and handles rising, falling and flat windows',()=>{
 const closes=[44.34,44.09,44.15,43.61,44.33,44.83,45.10,45.42,45.84,46.08,45.89,46.03,45.61,46.28,46.28,46,46.03,46.41,46.22,45.64,46.21]
 const values=rsi(closes)
 closeTo(values[14],70.46413502109705);closeTo(values[15],66.24961855355505)
 assert.equal(values.slice(0,14).every(n=>n===null),true)
 assert.equal(rsi(Array.from({length:20},(_,i)=>i)).at(-1),100)
 assert.equal(rsi(Array.from({length:20},(_,i)=>20-i)).at(-1),0)
 assert.equal(rsi(Array(20).fill(10)).at(-1),50)
})
test('daily series are sorted and deduplicated; unfinished, future and malformed bars are excluded',()=>{
 const rows=normalizeDailyHistory([{date:'2026-06-02',close:3},{date:'2026-06-01',close:1},{date:'2026-06-02',close:2},{date:'2026-06-03',close:9},{date:'2026-02-31',close:1},{date:'2027-01-01',close:1},{date:'2026-05-20',close:NaN}],Date.parse('2026-06-03T18:00:00Z'))
 assert.deepEqual(rows.map(r=>r.close),[1,2])
})
test('MACD warm-up, signal, bands and long averages use earlier bars before a displayed slice',()=>{
 const input=Array.from({length:300},(_,i)=>({date:new Date(Date.UTC(2025,0,1+i)).toISOString().slice(0,10),close:100+i}))
 const rows=technicalHistory(input,Date.parse('2026-01-01'))
 assert.equal(rows[198].sma200,null);closeTo(rows[199].sma200,199.5)
 assert.equal(rows[24].macd,null);closeTo(rows[25].macd,7)
 assert.equal(rows[32].signal,null);closeTo(rows[33].signal,7);closeTo(rows[33].histogram,0)
 const visible=rows.slice(-30);assert.ok(visible.every(r=>r.sma200!=null&&r.rsi!=null))
 const last=rows.at(-1);closeTo(last.sma20,389.5)
 closeTo(last.bbUpper,last.sma20+2*Math.sqrt(33.25));closeTo(last.bbLower,last.sma20-2*Math.sqrt(33.25))
})
