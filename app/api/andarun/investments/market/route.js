import { NextResponse } from 'next/server'
import { requireAndarunSession } from '@/lib/andarunPasswordAuth'
import { searchInstruments, loadMarket, loadXtbIntraday } from '@/lib/investments/market.server'
import { loadIsinMarket } from '@/lib/investments/isin-market.server'
import { validIsin, isDate, todayBerlin } from '@/lib/investments/family.mjs'
import { xtbReferences } from '@/lib/investments/xtb-markets.mjs'
export const dynamic = 'force-dynamic'
const headers = { 'Cache-Control': 'private, no-store', Vary: 'Cookie' }
const manualRefreshRequired = () => NextResponse.json({error:'برای دریافت قیمت و تاریخچه، دکمه به‌روزرسانی را بزن.'},{status:409,headers})
export async function GET(request) {
  if ((await requireAndarunSession()).error) return NextResponse.json({error:'دسترسی مجاز نیست.'},{status:403,headers})
  const params=new URL(request.url).searchParams
  const query=params.get('q')?.trim()
  const symbol=params.get('symbol')?.trim().toUpperCase()
  const isin=params.get('isin')?.trim().toUpperCase()
  try {
    const interval = params.get('interval')
    const chartOnly = params.get('chart') === '1'
    if (interval === '15m' || interval === '5m') {
      if (params.get('refresh') !== '1') return manualRefreshRequired()
      if (!xtbReferences.includes(symbol) || isin) return NextResponse.json({error:'تایم‌فریم برای این نماد در دسترس نیست.'},{status:400,headers})
      const result = await loadXtbIntraday(symbol,parseInt(interval,10),chartOnly)
      return NextResponse.json(chartOnly ? result : {history:result},{headers})
    }
    const isins = params.getAll('isin')
    if (isins.length > 1) {
      if (params.get('refresh') !== '1') return manualRefreshRequired()
      if (isins.length > 3 || isins.some(id => !validIsin(id)) || params.has('history') || params.has('historyDate')) {
        return NextResponse.json({error:'درخواست گروهی قیمت معتبر نیست.'},{status:400,headers})
      }
      const quotes = await Promise.all([...new Set(isins)].map(async id => {
        try { return [id, await loadIsinMarket(id, true, false)] }
        catch { return [id, null] }
      }))
      return NextResponse.json({quotes:Object.fromEntries(quotes)},{headers})
    }
    if (isin) {
      if (!validIsin(isin)) return NextResponse.json({error:'شناسه ابزار معتبر نیست.'},{status:400,headers})
      const historyDates=params.getAll('historyDate')
      if(historyDates.length>2||historyDates.some(date=>!isDate(date)||date>=todayBerlin()))return NextResponse.json({error:'تاریخ مرجع بازار معتبر نیست.'},{status:400,headers})
      // Old open tabs must not keep fetching providers through automatic polls.
      if (params.get('refresh') !== '1') return manualRefreshRequired()
      return NextResponse.json(await loadIsinMarket(isin,params.get('refresh') === '1',params.get('history') === '1',historyDates),{headers})
    }
    if(query && query.length<=160) return NextResponse.json({results:await searchInstruments(query)},{headers})
    if(!symbol || !/^[A-Z0-9^][A-Z0-9.^=\-]{0,34}$/.test(symbol)) return NextResponse.json({error:'نماد بازار معتبر نیست.'},{status:400,headers})
    if (params.get('refresh') !== '1') return manualRefreshRequired()
    return NextResponse.json(await loadMarket(symbol,(params.get('name') || symbol).slice(0,160),true,params.get('history') === '1',chartOnly),{headers})
  } catch { return NextResponse.json({error:'داده بازار در دسترس نیست. نماد و بورس را بررسی کن و دوباره تلاش کن.'},{status:502,headers}) }
}
