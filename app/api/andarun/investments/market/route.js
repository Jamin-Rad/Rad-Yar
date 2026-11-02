import { NextResponse } from 'next/server'
import { requireAndarunSession } from '@/lib/andarunPasswordAuth'
import { searchInstruments, loadMarket } from '@/lib/investments/market.server'
export const dynamic = 'force-dynamic'
const headers = { 'Cache-Control': 'private, no-store', Vary: 'Cookie' }
export async function GET(request) {
  if ((await requireAndarunSession()).error) return NextResponse.json({error:'دسترسی مجاز نیست.'},{status:403,headers})
  const params=new URL(request.url).searchParams
  const query=params.get('q')?.trim()
  const symbol=params.get('symbol')?.trim().toUpperCase()
  try {
    if(query && query.length<=160) return NextResponse.json({results:await searchInstruments(query)},{headers})
    if(!symbol || !/^[A-Z0-9^][A-Z0-9.^=\-]{0,34}$/.test(symbol)) return NextResponse.json({error:'نماد بازار معتبر نیست.'},{status:400,headers})
    return NextResponse.json(await loadMarket(symbol,(params.get('name') || symbol).slice(0,160)),{headers})
  } catch { return NextResponse.json({error:'داده بازار در دسترس نیست. نماد و بورس را بررسی کن و دوباره تلاش کن.'},{status:502,headers}) }
}
