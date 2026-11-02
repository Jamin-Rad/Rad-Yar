import 'server-only'
import { parseNews, periodReference } from './market.mjs'

const cache = new Map()
const pending = new Map()
async function cached(key, task) {
  const current = cache.get(key)
  if (current && Date.now() - current.time < 15 * 60000) return current.value
  if (pending.has(key)) return pending.get(key)
  const request = task().then(value => { if (cache.size >= 300) cache.delete(cache.keys().next().value); cache.set(key, {time:Date.now(),value}); return value }).finally(()=>pending.delete(key))
  pending.set(key, request)
  return request
}
async function get(url, type = 'json') {
  const response = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; FamilyPortfolio/1.0)', Accept: type === 'json' ? 'application/json' : 'application/rss+xml' }, signal: AbortSignal.timeout(9000), cache: 'no-store' })
  if (!response.ok) throw new Error('منبع بازار موقتاً پاسخ نداد.')
  return type === 'json' ? response.json() : response.text()
}
export async function searchInstruments(query) {
  return cached(`search:${query}`, async () => {
    const data = await get(`https://query2.finance.yahoo.com/v1/finance/search?q=${encodeURIComponent(query)}&quotesCount=8&newsCount=0`)
    return (data.quotes || []).filter(q=>['EQUITY','ETF','MUTUALFUND','CRYPTOCURRENCY','INDEX'].includes(q.quoteType)).slice(0, 8).map(q=>({symbol:q.symbol,name:q.longname || q.shortname || q.symbol,exchange:q.exchDisp || q.exchange || '',type:q.quoteType}))
  })
}
async function conversion(currency, date) {
  if (currency === 'EUR') return { rate: 1, date: date === 'latest' ? new Date().toISOString().slice(0,10) : date, source: 'EUR' }
  // Yahoo quotes pence as GBp/GBX; conversion must account for the unit.
  const base = currency === 'GBp' || currency === 'GBX' ? 'GBP' : currency
  return cached(`fx:${base}:${date}`,async()=>{
    const data=await get(`https://api.frankfurter.dev/v1/${date}?base=${encodeURIComponent(base)}&symbols=EUR`)
    if (!(data.rates?.EUR > 0)) throw Error('نرخ تبدیل یورو در دسترس نیست.')
    return {rate:data.rates.EUR,date:data.date,source:'Frankfurter / reference rates'}
  }).then(rate=>({...rate,rate:rate.rate/(currency === 'GBp' || currency === 'GBX' ? 100 : 1)}))
}
export async function loadMarket(symbol, name = symbol) {
  const base = await cached(`quote:${symbol}`,async()=>{
    const data=await get(`https://query2.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?range=1y&interval=1d&events=div%2Csplits`)
    const result=data.chart?.result?.[0]
    if (!result?.meta || !result.timestamp?.length) throw Error('برای این نماد داده معتبری پیدا نشد.')
    const meta=result.meta
    const history=result.timestamp.map((time,index)=>({date:new Date(time*1000).toISOString().slice(0,10),close:result.indicators.quote[0].close[index]})).filter(p=>Number.isFinite(p.close)&&p.close>0)
    if (!history.length) throw Error('تاریخچه معتبر برای این نماد دریافت نشد.')
    const price=meta.regularMarketPrice
    if (!Number.isFinite(price) || price<=0 || !Number.isFinite(meta.regularMarketTime)) throw Error('قیمت یا زمان منبع معتبر نیست.')
    const quote={price,currency:meta.currency,symbol:meta.symbol,exchange:meta.fullExchangeName || meta.exchangeName,name:meta.longName || meta.shortName || symbol,asOf:new Date(meta.regularMarketTime*1000).toISOString(),source:'Yahoo Finance',sourceUrl:`https://finance.yahoo.com/quote/${encodeURIComponent(symbol)}/`,delay:'قیمت مرجع منبع؛ ممکن است با تأخیر باشد'}
    const dates=[...new Set(['latest',... [7,30].map(days=>periodReference(history,days,quote.asOf)?.date).filter(Boolean)])]
    const fx={}
    await Promise.all(dates.map(async date=>{try{fx[date]=await conversion(quote.currency,date)}catch{fx[date]=null}}))
    return {quote,history,fx,splits:Object.values(result.events?.splits || {}).map(s=>({date:new Date(s.date*1000).toISOString().slice(0,10)})),fetchedAt:new Date().toISOString()}
  })
  let news=[],newsError=''
  try { news=await cached(`news:${symbol}:${name}`,async()=>parseNews(await get(`https://news.google.com/rss/search?q=${encodeURIComponent(`"${name.slice(0,100)}" ${symbol} when:14d`)}&hl=en-US&gl=US&ceid=US:en`,'text'))) }
  catch { newsError='خبرها موقتاً در دسترس نیستند.' }
  return {...base,news,newsError}
}
