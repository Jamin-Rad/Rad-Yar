import test from 'node:test'
import assert from 'node:assert/strict'
import { trendForecast } from './trend-forecast.mjs'

test('damped trend beats a flat baseline on synthetic trending data', () => {
  const rows = Array.from({length:250},(_,i)=>({close:100*Math.exp(i*.003)}))
  const forecast = trendForecast(rows,{horizon:20,window:50})
  assert.equal(forecast.points.length,21)
  assert.equal(forecast.useTrend,true)
  assert.ok(forecast.error < forecast.baselineError)
  assert.equal(forecast.points[0].mid,rows.at(-1).close)
  for (const point of forecast.points) assert.ok(point.low <= point.mid && point.mid <= point.high)
})

test('flat prices select the unchanged baseline; insufficient history returns no forecast', () => {
  const rows = Array.from({length:140},()=>({close:95}))
  assert.equal(trendForecast(rows,{horizon:4,window:32}).useTrend,false)
  assert.equal(trendForecast(rows.slice(-40),{horizon:4,window:32}),null)
})
