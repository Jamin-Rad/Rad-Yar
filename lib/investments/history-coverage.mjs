import { isDate, validIsin } from './family.mjs'
const DAY=86400000

// An old first row does not prove coverage: there can be gaps within a series.
export function historicalPrice(market,date,now=Date.now()) {
  const meta=market?.historyMeta,quote=market?.quote,today=new Date(now).toISOString().slice(0,10)
  if(!isDate(date)||Date.parse(date)>Date.parse(today)||!meta?.verified||!validIsin(market.identity?.isin)||!Number.isSafeInteger(meta.idNotation)||meta.isin!==market.identity?.isin||meta.currency!=='EUR'||quote?.currency!=='EUR'||meta.idNotation!==quote.idNotation)return null
  let latest=null
  for(const row of market.history||[])if(isDate(row.date)&&row.date<=date&&row.date<today&&Number.isFinite(row.close)&&row.close>0&&(!latest||row.date>latest.date))latest=row
  if(!latest||Date.parse(date)-Date.parse(latest.date)>7*DAY)return null
  return {price:latest.close,asOf:latest.date}
}
export function historyCovers(market,dates,now=Date.now()) {
  return dates.every(date=>historicalPrice(market,date,now)!==null)
}

// Every alternative keeps its own quote and its matching EUR venue history.
// Never fill a hole by splicing prices from different venues into one series.
export async function resolveIsinHistory(market,loadHistory,dates=[],now=Date.now()) {
  const candidates=[market.quote,...(market.quoteAlternatives||[])].filter((q,i,all)=>Number.isSafeInteger(q.idNotation)&&q.idNotation>0&&q.currency==='EUR'&&all.findIndex(p=>p.idNotation===q.idNotation)===i).slice(0,9)
  let best=null,bestCoverage=-1,lastError
  for(const quote of candidates){
    try{
      const candidate={...market,quote},history=await loadHistory(candidate)
      const result={...candidate,...history}
      const coverage=dates.filter(date=>historicalPrice(result,date,now)).length
      if(!best||coverage>bestCoverage){best=result;bestCoverage=coverage}
      if(coverage===dates.length)return result
    }catch(error){lastError=error}
  }
  if(best)return best
  throw lastError||Error('تاریخچهٔ معتبر برای ابزار موجود نیست.')
}
