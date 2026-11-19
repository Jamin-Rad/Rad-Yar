import test from 'node:test'
import assert from 'node:assert/strict'
import { anchoredOffset, candleDirection, chartTimes, chartViewport, normalizeXtbDrawings, priceStepDigits, priceValueDigits, timeIndex, xtbBars } from './xtb-chart.mjs'
import { mergeIntradayRows } from './intraday-archive.mjs'
import { normalizeFamilyState } from './family.mjs'
import { initialInvestmentState } from './test-fixtures.mjs'

test('higher timeframes aggregate completed contiguous source candles and preserve volume', () => {
  const bar = (minute, close) => ({
    date: new Date(Date.UTC(2026,10,16,9,minute)).toISOString(),
    open:close-1, high:close+2, low:close-2, close, volume:10,
  })
  const rows = [bar(0,10),bar(15,12),bar(30,13),bar(45,15),bar(60,16)]
  const now=Date.UTC(2026,10,16,10,20)
  const result=xtbBars(rows,30,now)
  assert.equal(result.length,2)
  assert.deepEqual(result.map(({open,high,low,close,volume})=>[open,high,low,close,volume]),[[9,14,8,12,20],[12,17,11,15,20]])
  assert.equal(xtbBars([bar(0,10),bar(45,15)],60,now).length,0)
})

test('only slots beyond the final bar are empty, including partial pans', () => {
  assert.deepEqual(chartViewport(500,100,0),{viewportOffset:0,start:400,end:500,slots:130})
  assert.deepEqual(chartViewport(500,100,20),{viewportOffset:20,start:380,end:500,slots:130})
  assert.deepEqual(chartViewport(500,100,31),{viewportOffset:31,start:369,end:499,slots:130})
  assert.deepEqual(chartViewport(500,100,999),{viewportOffset:400,start:0,end:130,slots:130})
  assert.deepEqual(chartViewport(12,100,5),{viewportOffset:0,start:0,end:12,slots:42})
})

test('wheel zoom keeps the bar at the same screen fraction to within half a bar', () => {
  for (const fraction of [.1,.42,.85]) {
    const index = 200 + fraction*129
    const next = chartViewport(500,80,anchoredOffset(500,80,index,fraction))
    assert.ok(Math.abs(next.start + fraction*(next.slots-1) - index) <= .5)
  }
})

test('the projected time ruler extends from the last real timestamp only', () => {
  const rows = [{date:'2026-11-12'}, {date:'2026-11-13'}]
  const times = chartTimes(rows,'1d')
  assert.equal(times.length,32)
  assert.equal(new Date(times[2]).toISOString().slice(0,10),'2026-11-16')
  assert.equal(timeIndex(times,times[6]),6)
  assert.equal(timeIndex(times,(times[5]+times[6])/2),5.5)
  assert.equal(chartTimes(rows,15)[2] - times[1], 900000)
})

test('price labels keep the precision implied by the tick or a small value', () => {
  assert.equal(priceStepDigits(10),2)
  assert.equal(priceStepDigits(.01),2)
  assert.equal(priceStepDigits(.025),3)
  assert.equal(priceStepDigits(.00025),5)
  assert.equal(priceValueDigits(125.32),2)
  assert.equal(priceValueDigits(.1234),4)
  assert.equal(priceValueDigits(.001234),6)
})

test('close-only rows do not pretend to be rising candles', () => {
  assert.equal(candleDirection({open:10,high:12,low:9,close:11}),'up')
  assert.equal(candleDirection({open:11,high:12,low:9,close:10}),'down')
  assert.equal(candleDirection({close:10,volume:20}),'unknown')
})

test('private family state preserves symbol sharing and account-scoped drawings', () => {
  const points=[{date:'2026-11-16T09:00:00.000Z',price:89},{date:'2026-11-16T09:30:00.000Z',price:92}]
  const draw={id:'a',symbol:'OIL',scope:'shared',type:'arrow',color:'#8bb7ee',points}
  const state=normalizeFamilyState(initialInvestmentState())
  state.settings.xtbDrawings=[draw,{...draw,id:'b',scope:'fatemeh'},{...draw,id:'bad',scope:'public'}]
  const stored=normalizeFamilyState(state).settings.xtbDrawings
  assert.deepEqual(stored,[draw,{...draw,id:'b',scope:'fatemeh'}])
  assert.deepEqual(normalizeXtbDrawings(JSON.parse(JSON.stringify(stored))),stored)
  const republic = {...draw,id:'tr',symbol:'TR:US0378331005.123.EUR',scope:'mobina'}
  assert.deepEqual(normalizeXtbDrawings([republic]),[republic])
  for (const type of ['fib','ellipse']) {
    const item={...draw,type}
    assert.deepEqual(normalizeXtbDrawings([item]),[item])
    assert.deepEqual(normalizeXtbDrawings([{...item,points:points.slice(0,1)}]),[])
  }
})

test('intraday archive preserves older sessions and replaces revised overlapping bars',()=>{
  const bar=(day,close)=>({date:'2026-10-'+day+'T10:00:00Z',close})
  assert.deepEqual(mergeIntradayRows([bar('02',2),bar('01',1)],[bar('02',3),bar('03',4)]),[bar('01',1),bar('02',3),bar('03',4)])
})

test('channel handles and complete pinned pattern geometry survive portfolio normalization',()=>{
  const p=i=>({date:new Date(Date.UTC(2024,2,1,i)).toISOString(),price:100+i})
  const base={symbol:'OIL',scope:'shared',color:'#8bb7ee'}
  const pattern={...base,id:'p',type:'pattern',meta:{frame:15,name:'سقف دوقلو',count:3,rails:1,pole:false,breakout:'down'},points:Array.from({length:6},(_,i)=>p(i))}
  const channel={...base,id:'c',type:'channel',points:[p(0),p(1),p(2)]}
  const state=normalizeFamilyState(initialInvestmentState())
  state.settings.xtbDrawings=[channel,pattern]
  assert.deepEqual(normalizeFamilyState(state).settings.xtbDrawings,[channel,pattern])
  assert.deepEqual(normalizeXtbDrawings([{...pattern,points:pattern.points.slice(1)},{...channel,points:channel.points.slice(1)}]),[])
})
