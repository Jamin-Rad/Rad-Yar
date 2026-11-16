import test from 'node:test'
import assert from 'node:assert/strict'
import { normalizeXtbDrawings, xtbBars } from './xtb-chart.mjs'
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

test('private family state preserves symbol sharing and account-scoped drawings', () => {
  const points=[{date:'2026-11-16T09:00:00.000Z',price:89},{date:'2026-11-16T09:30:00.000Z',price:92}]
  const draw={id:'a',symbol:'OIL',scope:'shared',type:'arrow',color:'#8bb7ee',points}
  const state=normalizeFamilyState(initialInvestmentState())
  state.settings.xtbDrawings=[draw,{...draw,id:'b',scope:'fatemeh'},{...draw,id:'bad',scope:'public'}]
  const stored=normalizeFamilyState(state).settings.xtbDrawings
  assert.deepEqual(stored,[draw,{...draw,id:'b',scope:'fatemeh'}])
  assert.deepEqual(normalizeXtbDrawings(JSON.parse(JSON.stringify(stored))),stored)
})
