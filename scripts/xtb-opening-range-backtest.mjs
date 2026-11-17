import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const markets=[
  {name:'Nasdaq 100',symbol:'NQ=F',tick:.25,multiplier:20},
  {name:'Gold futures (XAUUSD proxy)',symbol:'GC=F',tick:.1,multiplier:100},
  {name:'Brent (XTB OIL reference)',symbol:'BZ=F',tick:.01,multiplier:1000},
]
const scenarios=[
  {name:'low',spreadTicks:1,slipTicks:0,feePerSide:2.5},
  {name:'base',spreadTicks:2,slipTicks:1,feePerSide:2.5},
  {name:'high',spreadTicks:4,slipTicks:2,feePerSide:2.5},
]
const holidays=new Set(['2026-01-01','2026-01-19','2026-02-16','2026-04-03','2026-05-25','2026-06-19','2026-07-03','2026-09-07','2026-11-26','2026-12-25'])
const early=new Set(['2026-11-27','2026-12-24'])
const ny=new Intl.DateTimeFormat('sv-SE',{timeZone:'America/New_York',dateStyle:'short',timeStyle:'short',hourCycle:'h23'})
const berlin=new Intl.DateTimeFormat('sv-SE',{timeZone:'Europe/Berlin',dateStyle:'short',timeStyle:'short',hourCycle:'h23'})
const OPEN=570, RANGE_END=585, ENTRY_END=660
const closeMinute=day=>early.has(day)?780:960
const complete=(rows,start,end,step)=>Array.from({length:(end-start)/step},(_,i)=>rows.has(start+i*step)).every(Boolean)

async function yahoo(symbol,interval,query) {
  for (const server of ['query2','query1']) {
    const url='https://'+server+'.finance.yahoo.com/v8/finance/chart/'+encodeURIComponent(symbol)+'?'+query+'&interval='+interval
    try {
      const response=await fetch(url,{headers:{'User-Agent':'Mozilla/5.0'},signal:AbortSignal.timeout(12000)})
      if (!response.ok) continue
      const result=(await response.json()).chart.result?.[0]
      if (result?.meta?.symbol!==symbol||result.meta.currency!=='USD') continue
      const quote=result.indicators.quote[0]
      const rows=result.timestamp.map((stamp,i)=>[stamp,...['open','high','low','close'].map(key=>quote[key][i])])
        .filter(row=>row.every(n=>Number.isFinite(n)&&n>0))
      return {url,exchange:result.meta.exchangeName,exchangeZone:result.meta.exchangeTimezoneName,rows}
    } catch {}
  }
  return null
}

function sessions(sources) {
  const days=new Map()
  for (const source of sources.filter(Boolean)) for (const [stamp,open,high,low,close] of source.rows) {
    const [day,time]=ny.format(new Date(stamp*1000)).split(' ')
    const [hour,minute]=time.split(':').map(Number)
    const clock=hour*60+minute
    if (!days.has(day)) days.set(day,new Map())
    days.get(day).set(clock,{stamp,clock,open,high,low,close})
  }
  return days
}

function entryFor(bars,execution,market,cost) {
  const opening=[OPEN,OPEN+5,OPEN+10].map(minute=>bars.get(minute))
  const upper=Math.max(...opening.map(bar=>bar.high))
  const lower=Math.min(...opening.map(bar=>bar.low))
  const pending=[]
  let breakout=false,retest=false,spreadRejected=0,invalidRisk=0
  for (let minute=RANGE_END;minute+5<ENTRY_END;minute+=5) {
    const candle=bars.get(minute)
    const next=execution.get(minute+5)
    for (const setup of pending) {
      if (!setup || minute-setup.minute>15) continue
      const {side}=setup
      const touched=side===1?candle.low<=upper&&candle.close>upper:candle.high>=lower&&candle.close<lower
      if (!touched) continue
      retest=true
      const stop=side===1?candle.low-market.tick:candle.high+market.tick
      const entry=next.open+side*market.tick*(cost.spreadTicks/2+cost.slipTicks)
      const risk=(entry-stop)*side
      if (risk<=0) {invalidRisk++;continue}
      if (market.tick*cost.spreadTicks>risk*.10+1e-10) {spreadRejected++;continue}
      return {entry,stop,risk,side,minute:minute+5,stamp:next.stamp,rangeHigh:upper,rangeLow:lower,retestStamp:candle.stamp,breakoutStamp:bars.get(setup.minute).stamp,spreadRejected,invalidRisk}
    }
    const side=candle.close>upper?1:candle.close<lower?-1:0
    if (!side) continue
    breakout=true
    const slot=side===1?0:1
    if (!pending[slot]||minute-pending[slot].minute>15) pending[slot]={side,minute}
  }
  return {reason:!breakout?'noBreakout':!retest?'noRetest':spreadRejected?'cost':'invalidRisk',spreadRejected,invalidRisk}
}

function candle15(bars,end) {
  const window=[end-15,end-10,end-5].map(minute=>bars.get(minute))
  if (window.some(bar=>!bar)) return null
  return {low:Math.min(...window.map(bar=>bar.low)),high:Math.max(...window.map(bar=>bar.high))}
}

function simulate(entry,bars,execution,step,end,market,cost,runner) {
  const {side,risk}=entry
  const spread=market.tick*cost.spreadTicks/2, slip=market.tick*cost.slipTicks
  const target=entry.entry+side*2*risk
  let stop=entry.stop, remaining=1, ambiguity=0, targetAt=null
  const fills=[]
  const add=(type,price,at,fraction)=>{
    const executed=price-side*slip
    const netR=(side*(executed-entry.entry)-2*cost.feePerSide/market.multiplier)/risk*fraction
    fills.push({type,price:executed,stamp:at,berlin:berlin.format(new Date(at*1000)),fraction,netR})
    remaining-=fraction
  }
  for (let minute=entry.minute;minute<end&&remaining>1e-9;minute+=step) {
    if (targetAt!=null&&minute%15===0&&minute>=targetAt) {
      const first=candle15(bars,minute), prior=candle15(bars,minute-15)
      if (first&&prior) stop=side===1?Math.max(stop,Math.min(first.low,prior.low)-market.tick):Math.min(stop,Math.max(first.high,prior.high)+market.tick)
    }
    const bar=execution.get(minute)
    const open=bar.open-side*spread
    const stopHit=side===1?bar.low-spread<=stop:bar.high+spread>=stop
    const targetHit=targetAt==null&&(side===1?bar.high-spread>=target:bar.low+spread<=target)
    const openStop=(open-stop)*side<=0
    const openTarget=targetAt==null&&(open-target)*side>=0
    if (stopHit&&targetHit&&!openStop&&!openTarget) ambiguity++
    if (openStop || (stopHit&&!openTarget)) {
      add('stop',openStop?open:stop,bar.stamp,remaining)
      break
    }
    if (targetHit) {
      add('target',target,bar.stamp,runner?1/3:1)
      targetAt=minute+step
      if (remaining>1e-9&&stopHit) add('stop',stop,bar.stamp,remaining)
    }
  }
  if (remaining>1e-9) {
    const close=execution.get(end)
    add('time',close.open-side*spread,close.stamp,remaining)
  }
  return {target,fills,ambiguity,netR:fills.reduce((sum,fill)=>sum+fill.netR,0)}
}

function statistics(rows,method) {
  let equity=0,high=0,drawdown=0,loss=0,losingStreak=0
  for (const row of rows) {
    const r=row[method].netR
    equity+=r
    high=Math.max(high,equity)
    drawdown=Math.max(drawdown,high-equity)
    loss=r<0?loss+1:0
    losingStreak=Math.max(loss,losingStreak)
  }
  return {count:rows.length,meanR:rows.length?equity/rows.length:null,totalR:equity,maxDrawdownR:drawdown,losingStreak,
    timeExits:rows.filter(row=>row[method].fills.some(fill=>fill.type==='time')).length,
    ambiguousBars:rows.reduce((sum,row)=>sum+row[method].ambiguity,0)}
}

function run(days,series,cost) {
  const trades=[], details=[]
  for (const date of days) {
    const end=closeMinute(date)
    const resolution=series.every(market=>complete(market.one.get(date)??new Map(),OPEN,end+1,1))?1:5
    const signals=series.map(market=>{
      const bars=market.five.get(date)
      const execution=resolution===1?market.one.get(date):bars
      return entryFor(bars,execution,market,cost)
    })
    const winner=signals.map((signal,index)=>({signal,index})).filter(item=>item.signal.entry!=null)
      .sort((a,b)=>a.signal.minute-b.signal.minute||a.index-b.index)[0]
    const reasons=signals.map(signal=>signal.reason??'valid')
    const noEntryReason=winner?null:['cost','invalidRisk','noRetest','noBreakout'].find(reason=>reasons.includes(reason))
    details.push({date,resolution,reasons,noEntryReason,spreadRejected:signals.map(signal=>signal.spreadRejected)})
    if (!winner) continue
    const market=series[winner.index], entry=winner.signal
    const bars=market.five.get(date), execution=resolution===1?market.one.get(date):bars
    trades.push({date,symbol:market.symbol,resolution,...entry,entryBerlin:berlin.format(new Date(entry.stamp*1000)),
      a:simulate(entry,bars,execution,resolution,end,market,cost,false),
      b:simulate(entry,bars,execution,resolution,end,market,cost,true)})
  }
  const without=(method)=>{const removed=[...trades].sort((a,b)=>b[method].netR-a[method].netR).slice(0,3);return statistics(trades.filter(row=>!removed.includes(row)),method)}
  const topB=[...trades].sort((a,b)=>b.b.netR-a.b.netR).slice(0,3)
  const paired=trades.filter(row=>!topB.includes(row))
  const reasons=count=>Object.fromEntries(['valid','noBreakout','noRetest','cost','invalidRisk'].map(key=>[key,count(key)]))
  return {cost,days:days.length,first:days[0],last:days.at(-1),valid:trades.length,frequency:trades.length/days.length,
    byMarket:Object.fromEntries(series.map((m,i)=>[m.symbol,reasons(key=>details.filter(row=>row.reasons[i]===key).length)])),
    combinedReasons:reasons(key=>key==='valid'?trades.length:details.filter(row=>row.noEntryReason===key).length),
    oneMinuteSessions:details.filter(row=>row.resolution===1).length,
    a:statistics(trades,'a'),b:statistics(trades,'b'),aWithoutTop3:without('a'),bWithoutTop3:without('b'),
    pairedWithoutTopB:{excluded:topB.map(row=>row.date),a:statistics(paired,'a'),b:statistics(paired,'b')}, trades,details}
}

const directory=resolve(process.argv[2]||'opening-range-results')
await mkdir(directory,{recursive:true})
const dataPath=resolve(directory,'market-data.json')
const cutoff=process.env.BACKTEST_AS_OF??'2026-11-16'
let snapshots
if (process.argv.includes('--download')) {
  snapshots=await Promise.all(markets.map(async market=>{
    const five=await yahoo(market.symbol,'5m','range=60d')
    if (!five?.rows.length) throw Error('No five-minute history for '+market.symbol)
    const end=Math.min(five.rows.at(-1)[0]+300,Math.floor(Date.now()/1000))
    const one=[]
    for (let days=0;days<28;days+=7) {
      const period2=end-days*86400
      const period1=period2-7*86400+60
      one.push(await yahoo(market.symbol,'1m','period1='+period1+'&period2='+period2))
    }
    return {...market,five,one:one.filter(Boolean)}
  }))
  await writeFile(dataPath,JSON.stringify(snapshots))
} else snapshots=JSON.parse(await readFile(dataPath,'utf8'))
const series=snapshots.map(market=>({...market,five:sessions([market.five]),one:sessions(market.one)}))
const dates=[...new Set(series.flatMap(market=>[...market.five.keys()]))].sort()
const excluded=[], eligible=[]
for (const day of dates) {
  const week=new Date(day+'T12:00:00Z').getUTCDay()
  if (day>cutoff||week===0||week===6||holidays.has(day)) {
    excluded.push({day,reason:day>cutoff?'afterCutoff':week===0||week===6?'weekend':'US market holiday'})
    continue
  }
  const missing=series.filter(market=>!complete(market.five.get(day)??new Map(),OPEN,closeMinute(day)+5,5)).map(market=>market.symbol)
  if (missing.length) excluded.push({day,reason:'incomplete',missing})
  else eligible.push(day)
}
if (eligible.length<30) throw Error('Only '+eligible.length+' common full sessions found')
const periods={recent:eligible.slice(-30),earlier:eligible.slice(0,-30)}
const results=Object.fromEntries(Object.entries(periods).map(([key,days])=>[key,days.length?scenarios.map(cost=>run(days,series,cost)):[]]))
const sources=snapshots.map(({name,symbol,tick,multiplier,five,one})=>({name,symbol,tick,multiplier,
  provider:'Yahoo Finance',instrument:'front-month futures reference',currency:'USD',timestampZone:'UTC',
  sessionZone:'America/New_York',reportZone:'Europe/Berlin',exchange:five.exchange,exchangeZone:five.exchangeZone,
  first:new Date(five.rows[0][0]*1000).toISOString(),last:new Date(five.rows.at(-1)[0]*1000).toISOString(),
  fiveMinuteUrl:five.url,oneMinuteUrls:one.map(item=>item.url)}))
const summary={cutoff,sources,excluded,periods,results}
await writeFile(resolve(directory,'results.json'),JSON.stringify(summary,null,2))
const clean=Object.fromEntries(Object.entries(results).map(([period,runs])=>[period,runs.map(({trades,details,...run})=>run)]))
await writeFile(resolve(directory,'summary.json'),JSON.stringify({cutoff,sources,excluded,periods,results:clean},null,2))
const csvCell=value=>'"'+String(value??'').replaceAll('"','""')+'"'
const csvRows=[['Period','Scenario','Session (New York)','Market','Side','Execution minutes','Entry UTC','Entry Berlin','Entry','Initial Stop','2R Target','Method A net R','Method B net R','Method A exits','Method B exits']]
for (const [period,runs] of Object.entries(results)) for (const result of runs) for (const trade of result.trades) {
  const exits=method=>method.fills.map(fill=>fill.berlin+' '+fill.type+' '+fill.price).join(' | ')
  csvRows.push([period,result.cost.name,trade.date,trade.symbol,trade.side===1?'long':'short',trade.resolution,
    new Date(trade.stamp*1000).toISOString(),trade.entryBerlin,trade.entry,trade.stop,trade.a.target,trade.a.netR,trade.b.netR,exits(trade.a),exits(trade.b)])
}
await writeFile(resolve(directory,'trades.csv'),csvRows.map(row=>row.map(csvCell).join(',')).join('\r\n')+'\r\n')
const base=results.recent.find(result=>result.cost.name==='base')
const overlay={first:base.first,last:base.last,days:base.days,valid:base.valid,
  a:base.a.totalR,b:base.b.totalR,byMarket:base.byMarket,trades:base.trades.map(trade=>({
    symbol:trade.symbol,stamp:trade.stamp,entry:trade.entry,stop:trade.stop,target:trade.a.target,side:trade.side,
    a:trade.a.netR,b:trade.b.netR,rangeHigh:trade.rangeHigh,rangeLow:trade.rangeLow,
  }))}
await writeFile(resolve(directory,'chart-overlay.json'),JSON.stringify(overlay,null,2)+'\n')
console.log(JSON.stringify({periods:Object.fromEntries(Object.entries(periods).map(([key,days])=>[key,[days[0],days.at(-1),days.length]])),results:clean},null,2))
