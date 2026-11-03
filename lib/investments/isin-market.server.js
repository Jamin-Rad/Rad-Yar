import 'server-only'
import { createMarketCache } from './market-cache.mjs'
import { parseIsinMarket, parseIsinHistory } from './isin-market.mjs'
import { resolveIsinHistory } from './history-coverage.mjs'
import { validIsin } from './family.mjs'
const cached = createMarketCache()
const historyCache = createMarketCache()
export async function loadIsinMarket(isin, force = false, withHistory = false, historyDates = []) {
  if (!validIsin(isin)) throw Error('شناسه ابزار معتبر نیست.')
  const market = await cached(isin, async () => {
    const response = await fetch(`https://www.onvista.de/suche/${isin}`, { headers:{'User-Agent':'Mozilla/5.0 (compatible; FamilyPortfolio/1.0)',Accept:'text/html'}, cache:'no-store', signal:AbortSignal.timeout(12000) })
    if (!response.ok || new URL(response.url).hostname !== 'www.onvista.de') throw Error('منبع قیمت خودکار پاسخ معتبر نداد.')
    const html = await response.text()
    if (html.length > 3000000) throw Error('پاسخ منبع بیش از حد بزرگ است.')
    return parseIsinMarket(html, isin)
  }, force)
  const publicResult = ({quoteAlternatives,...result}) => result
  if(!withHistory)return publicResult(market)
  return publicResult(await resolveIsinHistory(market,async candidate=>{
  const {entityType,entityValue}=candidate.identity,idNotation=candidate.quote.idNotation
  if(!/^[A-Z_]{1,30}$/.test(entityType||'')||!/^\d{1,15}$/.test(String(entityValue||''))||!Number.isSafeInteger(idNotation)||idNotation<=0)throw Error('شناسهٔ تاریخچهٔ بازار موجود نیست.')
  const defaultStart=Date.now()-2*366*86400000
  const earliest=historyDates.length?Date.parse([...historyDates].sort()[0])-7*86400000:defaultStart
  const startDate=new Date(Math.max(Date.now()-5*366*86400000,Math.min(defaultStart,earliest))).toISOString().slice(0,10)
  const history=await historyCache(`${isin}:${idNotation}:${startDate}`,async()=>{
    const params=new URLSearchParams({range:'Y3',idNotation:String(idNotation),startDate,isoCurrency:'EUR'})
    const response=await fetch(`https://api.onvista.de/api/v1/instruments/${entityType}/${entityValue}/eod_history?${params}`,{cache:'no-store',signal:AbortSignal.timeout(12000)})
    if(!response.ok)throw Error('تاریخچهٔ بازار دریافت نشد.')
    const text=await response.text()
    if(text.length>1000000)throw Error('تاریخچه بیش از حد بزرگ است.')
    return parseIsinHistory(JSON.parse(text),candidate)
  },force)
  return history
  },historyDates))
}
