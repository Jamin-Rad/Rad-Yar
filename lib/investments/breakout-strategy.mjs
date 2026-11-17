import { atr, pricePatterns } from './chart-analysis.mjs'

const complete = bar => ['open','high','low','close'].every(key=>Number.isFinite(bar?.[key])&&bar[key]>0)

export function breakoutSignal(rows, index, volatility, allowShort) {
  const current=rows[index], previous=rows[index-1]
  if (!complete(current)||!complete(previous)||!(volatility>0)||current.ema20==null||current.sma50==null) return null
  const start=Math.max(0,index-129)
  const bars=rows.slice(start,index+1)
  for (const pattern of pricePatterns(bars).reverse()) {
    if (!pattern.breakout || pattern.end!==bars.length-2) continue
    const long=pattern.breakout==='up'
    if (long?current.ema20<=current.sma50:(!allowShort||current.ema20>=current.sma50)) continue
    const line=long?pattern.upper:pattern.lower
    const other=long?pattern.lower:pattern.upper
    const length=pattern.end-pattern.start
    const boundary=line[1]+(line[1]-line[0])/length
    const opposite=other[1]+(other[1]-other[0])/length
    if (long ? boundary<=opposite||current.close<=boundary : boundary>=opposite||current.close>=boundary) continue
    const direction=long?1:-1
    const stop=boundary-direction*volatility*.5
    if (stop>0) return { direction, stop, pattern:pattern.name, signal:index }
  }
  return null
}

export function backtestBreakout(rows, {allowShort=false,spreadBps=10,feeBps=5,findSignal=breakoutSignal}={}) {
  const volatility=atr(rows)
  const trades=[]
  let pending=null, active=null, equity=1, peak=1, drawdown=0
  const spread=spreadBps/20000, fee=feeBps/10000
  for (let index=0;index<rows.length;index++) {
    const bar=rows[index]
    if (!complete(bar)) {
      pending=null
      if (active) return {trades,active:null,equity,drawdown,incomplete:true}
      continue
    }
    if (pending) {
      const {direction,stop}=pending
      const risk=(bar.open-stop)*direction
      const target=bar.open+direction*2*risk
      if (risk>0&&target>0) active={...pending,entry:index,entryPrice:bar.open,target}
      pending=null
    }
    if (active) {
      const {direction,stop,target,entryPrice}=active
      const stopHit=direction===1?bar.low<=stop:bar.high>=stop
      const targetHit=direction===1?bar.high>=target:bar.low<=target
      const gapStop=(bar.open-stop)*direction<=0
      const gapTarget=(bar.open-target)*direction>=0
      if (stopHit||targetHit) {
        const stopped=gapStop||(!gapTarget&&stopHit)
        const exitPrice=stopped?(gapStop?bar.open:stop):target
        const paid=entryPrice*(1+direction*spread), received=exitPrice*(1-direction*spread)
        const net=(direction*(received-paid)-fee*(paid+received))/entryPrice
        equity*=Math.max(0,1+net)
        peak=Math.max(peak,equity)
        drawdown=Math.max(drawdown,(peak-equity)/peak)
        trades.push({...active,exit:index,exitPrice,net,stopped})
        active=null
        if (equity===0) break
      }
    }
    if (!active && index>=49) pending=findSignal(rows.slice(0,index+1),index,volatility[index],allowShort)
  }
  return {trades,active,equity,drawdown,incomplete:false}
}
