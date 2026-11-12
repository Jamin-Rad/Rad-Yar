import { NextResponse } from 'next/server'
import { requireAndarunSession } from '@/lib/andarunPasswordAuth'
import { validIsin } from '@/lib/investments/family.mjs'
import { tradingViewCandidates } from '@/lib/investments/tradingview.mjs'

export const dynamic = 'force-dynamic'
const json = (body, status = 200) => NextResponse.json(body, {
  status, headers: { 'Cache-Control': 'private, no-store', Vary: 'Cookie' },
})

export async function GET(request) {
  if ((await requireAndarunSession()).error) return json({ error: 'دسترسی مجاز نیست.' }, 403)
  const params = new URL(request.url).searchParams
  const isin = params.get('isin')?.trim().toUpperCase() || ''
  const name = params.get('name')?.trim() || ''
  if (isin ? !validIsin(isin) : !name || name.length > 160) return json({ error: 'شناسه یا نام دارایی معتبر نیست.' }, 400)

  // Use TradingView's own symbol search so the listing code matches its widget.
  const url = new URL('https://symbol-search.tradingview.com/symbol_search/v3/')
  url.search = new URLSearchParams({ text: isin || name, hl: '0', lang: 'en', domain: 'production' })
  try {
    const response = await fetch(url, {
      headers: { Origin: 'https://www.tradingview.com', Referer: 'https://www.tradingview.com/' },
      signal: AbortSignal.timeout(6000),
      next: { revalidate: 3600 },
    })
    if (!response.ok) throw Error('Symbol search unavailable')
    const payload = await response.json()
    if (!Array.isArray(payload.symbols)) throw Error('Unexpected symbol search response')
    return json({ results: tradingViewCandidates(payload.symbols, isin) })
  } catch {
    return json({ error: 'جست‌وجوی TradingView فعلاً در دسترس نیست.' }, 502)
  }
}
