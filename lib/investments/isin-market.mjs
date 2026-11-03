// Parse data, never execute provider HTML. Only the exact requested instrument
// and per-unit EUR prices may be used in the automatic account valuation.
export function parseIsinMarket(html, isin, now = Date.now()) {
  const script = html.match(/<script\b[^>]*id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/i)
  if (!script) throw Error('قالب داده منبع قیمت تغییر کرده است.')
  const page = JSON.parse(script[1]).props?.pageProps
  const snapshot = page?.data?.snapshot, instrument = snapshot?.instrument
  if (!instrument || instrument.isin !== isin) throw Error('شناسه منبع قیمت با دارایی یکسان نیست.')
  const candidates = []
  for (const row of [snapshot.quote, ...(snapshot.quoteList?.list || [])].filter(Boolean)) {
    if (row.isoCurrency !== 'EUR' || row.unitType !== 'STK') continue
    for (const [price,date,kind] of [[row.last,row.datetimeLast,'last'],[row.previousLast,row.datetimePreviousLast,'previous-close']]) {
      const time = Date.parse(date)
      if (Number.isFinite(price) && price > 0 && Number.isFinite(time) && time <= now + 300000 && now - time <= 7 * 86400000) candidates.push({ row, price, time, kind })
    }
  }
  candidates.sort((a,b)=>b.time-a.time)
  const selected = candidates[0]
  if (!selected) throw Error('قیمت یورویی معتبر و دارای زمان قابل اتکا در منبع موجود نیست.')
  // Page-level eodHistory may be in the home-market currency (e.g. USD),
  // even when snapshot.quote is EUR. It has no reliable venue identifier.
  const history = []
  const sourceUrl = `https://www.onvista.de/suche/${isin}`
  return { identity:{isin,source:'Onvista exact ISIN',entityType:instrument.entityType,entityValue:instrument.entityValue}, quote:{isin,idNotation:selected.row.market?.idNotation,price:selected.price,currency:'EUR',symbol:instrument.symbol || isin,name:instrument.name,exchange:selected.row.market?.nameExchange || 'منبع عمومی',asOf:new Date(selected.time).toISOString(),source:'Onvista',sourceUrl,delay:selected.kind==='previous-close'?'آخرین قیمت پایانی معتبر منبع؛ زمان قیمت را بررسی کن':'قیمت مرجع عمومی؛ ممکن است با تأخیر باشد'}, history,fx:{latest:{rate:1,date:new Date(selected.time).toISOString().slice(0,10),source:'EUR'}},splits:[],news:[],newsError:'این منبع فقط برای قیمت‌گذاری خودکار استفاده می‌شود؛ خبرها را از پرونده دارایی بررسی کن.',fetchedAt:new Date(now).toISOString() }
}

export function parseIsinHistory(data, market, now=Date.now()) {
  if (data.entityType !== market.identity.entityType || String(data.entityValue) !== String(market.identity.entityValue) || data.idNotation !== market.quote.idNotation || data.market?.idNotation !== market.quote.idNotation || data.isoCurrency !== market.quote.currency || data.unitType !== 'STK') throw Error('بورس، ارز یا ابزار تاریخچه با قیمت یکسان نیست.')
  if (!Array.isArray(data.datetimeLast) || !Array.isArray(data.last) || data.datetimeLast.length !== data.last.length || data.last.length > 2000) throw Error('ساختار تاریخچه معتبر نیست.')
  const today=new Date(now).toISOString().slice(0,10)
  const history=data.datetimeLast.flatMap((time,index)=>{
    if(!Number.isFinite(time)||!Number.isFinite(data.last[index])||data.last[index]<=0)return []
    const date=new Date(time*1000).toISOString().slice(0,10)
    if(date>=today)return []
    const row={date,close:data.last[index]}
    const open=data.first?.[index],high=data.high?.[index],low=data.low?.[index],volume=data.volume?.[index]
    if([open,high,low].every(v=>Number.isFinite(v)&&v>0)&&high>=Math.max(open,row.close)&&low<=Math.min(open,row.close))Object.assign(row,{open,high,low})
    if(Number.isFinite(volume)&&volume>=0)row.volume=volume
    return [row]
  }).sort((a,b)=>a.date.localeCompare(b.date))
  return {history:[...new Map(history.map(row=>[row.date,row])).values()],historyMeta:{verified:true,isin:market.identity.isin,idNotation:data.idNotation,currency:data.isoCurrency,source:'Onvista',interval:'1d',fetchedAt:new Date(now).toISOString()}}
}
