import { NextResponse } from 'next/server'
import { requireAndarunSession } from '@/lib/andarunPasswordAuth'
import { searchInstruments, loadMarket } from '@/lib/investments/market.server'
import { loadIsinMarket } from '@/lib/investments/isin-market.server'
import { validIsin, isDate, todayBerlin } from '@/lib/investments/family.mjs'
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
    return NextResponse.json(await loadMarket(symbol,(params.get('name') || symbol).slice(0,160),params.get('refresh') === '1'),{headers})
  } catch { return NextResponse.json({error:'داده بازار در دسترس نیست. نماد و بورس را بررسی کن و دوباره تلاش کن.'},{status:502,headers}) }
}
