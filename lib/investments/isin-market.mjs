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
  const primary = snapshot.quote?.market?.idNotation === selected.row.market?.idNotation
  const history = primary ? (page.data.eodHistory?.history || []).filter(p=>p.datetime?.slice(0,10)<new Date(now).toISOString().slice(0,10)&&p.last>0).map(p=>({ date:p.datetime.slice(0,10),close:p.last })) : []
  const sourceUrl = `https://www.onvista.de/suche/${isin}`
  return { identity:{isin,source:'Onvista exact ISIN'}, quote:{isin,price:selected.price,currency:'EUR',symbol:instrument.symbol || isin,name:instrument.name,exchange:selected.row.market?.nameExchange || 'منبع عمومی',asOf:new Date(selected.time).toISOString(),source:'Onvista',sourceUrl,delay:selected.kind==='previous-close'?'آخرین قیمت پایانی معتبر منبع؛ زمان قیمت را بررسی کن':'قیمت مرجع عمومی؛ ممکن است با تأخیر باشد'}, history,fx:{latest:{rate:1,date:new Date(selected.time).toISOString().slice(0,10),source:'EUR'}},splits:[],news:[],newsError:'این منبع فقط برای قیمت‌گذاری خودکار استفاده می‌شود؛ خبرها را از پرونده دارایی بررسی کن.',fetchedAt:new Date(now).toISOString() }
}
