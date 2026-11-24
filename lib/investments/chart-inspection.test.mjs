import test from 'node:test'
import assert from 'node:assert/strict'
import { chartFeedQuery, overviewTrace, priceChange, relativeVolume, viewStatistics, visiblePriceDomain } from './chart-inspection.mjs'
import { aggregateDaily } from './chart-analysis.mjs'
import { readChartMark, saveChartMark } from './local-asset-chart.mjs'

test('intraday auto scale follows small actual moves even on a high-priced instrument', () => {
  const [min,max] = visiblePriceDomain(24000,24002)
  assert.ok(min<24000 && max>24002 && max-min<3)
  const [lo,hi] = visiblePriceDomain(.000036,.000036)
  assert.ok(lo>=0 && lo<.000036 && hi>.000036)
})

test('inspection keeps missing volume and incomplete ranges distinct from zero', () => {
  const rows=Array.from({length:21},(_,i)=>({volume:i===20?20:10,close:100+i}))
  assert.equal(relativeVolume(rows,20),2)
  assert.equal(relativeVolume(rows,19),null)
  rows[20].volume=0
  assert.equal(relativeVolume(rows,20),0)
  rows[8].volume=null
  assert.equal(relativeVolume(rows,20),null)
  assert.deepEqual(viewStatistics(rows),{count:21,low:100,high:120,hasRange:false,change:{amount:20,percent:20}})
  assert.equal(priceChange(null,92),null)
  assert.equal(priceChange(90,0).percent,-100)
})

test('aggregation does not reconstruct highs, lows or volume from a close-only day',()=>{
  const period=aggregateDaily([{date:'2026-01-05',open:98,high:105,low:95,close:100,volume:12},
    {date:'2026-01-06',close:101}], '1w')[0]
  assert.deepEqual([period.open,period.high,period.low,period.close,period.volume,period.lastSession],[98,null,null,101,null,'2026-01-06'])
})

test('overview trace preserves a one-bar spike in a large archive and bounds geometry',()=>{
  const rows=Array.from({length:35000},(_,i)=>({close:i===12345?200:100}))
  const trace=overviewTrace(rows)
  assert.ok(trace.includes(' 4.0') && trace.includes(' 36.0'))
  assert.ok(trace.split(/[LM]/).length<=484)
  assert.equal(overviewTrace([]),'')
  assert.equal(overviewTrace([{close:1}]),'M0.0 20.0')
})

test('each explicit refresh requests only the source series needed by the selected frame',()=>{
  for(const [frame,base] of [[5,'5m'],[15,'15m'],[60,'15m'],[240,'15m'],['1d',null],['1w',null],['1mo',null]]) {
    const params=new URL(chartFeedQuery('BZ=F',frame),'https://example.test').searchParams
    assert.equal(params.get('symbol'),'BZ=F')
    assert.equal(params.get('refresh'),'1')
    assert.equal(params.get('chart'),'1')
    assert.equal(params.get('interval'),base)
    assert.equal(params.get('history'),base?null:'1')
  }
})

test('a stale or unrelated quote cannot replace a newer public chart mark',()=>{
  const values=new Map(), storage={getItem:key=>values.get(key),setItem:(key,v)=>values.set(key,v)}
  const mark=(date,price,symbol='BZ=F')=>({quote:{asOf:date,price,symbol,currency:'USD'},history:[1,2],fx:{latest:{rate:.9}}})
  saveChartMark(storage,'BZ=F',mark('2026-01-02',80))
  saveChartMark(storage,'BZ=F',mark('2026-01-01',70))
  saveChartMark(storage,'BZ=F',mark('2026-01-03',101,'NQ=F'))
  assert.equal(readChartMark(storage,'BZ=F').quote.price,80)
  assert.equal(readChartMark(storage,'BZ=F').history,undefined)
})
