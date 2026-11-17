import test from 'node:test'
import assert from 'node:assert/strict'
import { backtestBreakout, breakoutSignal } from './breakout-strategy.mjs'

const bar=(open,low,high,close=open)=>({open,low,high,close})
const warmup=Array.from({length:50},()=>bar(100,99,101))
const signal=(_rows,index)=>index===49?{direction:1,stop:95,signal:index,pattern:'test'}:null

test('enters at the next open, charges both sides, and resolves ambiguous intrabar exits at the stop',()=>{
  const result=backtestBreakout([...warmup,bar(101,94,114)],{findSignal:signal,spreadBps:20,feeBps:10})
  const [trade]=result.trades
  assert.equal(trade.entry,50)
  assert.equal(trade.entryPrice,101)
  assert.equal(trade.target,113)
  assert.equal(trade.exitPrice,95)
  assert.ok(Math.abs(trade.net-((95*.999-101*1.001)-.001*(95*.999+101*1.001))/101)<1e-12)
  assert.ok(result.drawdown>0)
})

test('models a stop gap at the open and invalidates entry through its stop',()=>{
  const options={findSignal:signal}
  assert.equal(backtestBreakout([...warmup,bar(100,98,102),bar(92,91,96)],options).trades[0].exitPrice,92)
  assert.equal(backtestBreakout([...warmup,bar(94,90,98)],options).trades.length,0)
})

test('detects a second close above a known triangle and checks trend direction',()=>{
  const values=[8,10,5,10,6,10,7,9,8,11]
  const closes=values.flatMap((value,index)=>index===values.length-1?[value,11.2]:[value,(2*value+values[index+1])/3,(value+2*values[index+1])/3])
  const rows=closes.map(close=>({...bar(close,close-.1,close+.1),ema20:9,sma50:8}))
  const index=rows.findIndex((_,i)=>i>0&&breakoutSignal(rows,i,1,false)?.pattern==='مثلث صعودی')
  assert.ok(index>0)
  assert.equal(breakoutSignal(rows.slice(0,index+1),index,1,false)?.direction,1)
  const opposite=rows.map(row=>({...row,ema20:7}))
  assert.equal(breakoutSignal(opposite,index,1,false),null)
})
