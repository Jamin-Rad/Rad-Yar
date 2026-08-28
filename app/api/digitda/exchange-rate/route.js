import { NextResponse } from 'next/server'
import { requireDigitDASession } from '@/lib/digitdaAuth'

export async function GET() {
  const access = await requireDigitDASession()
  if (access.error) return NextResponse.json({ error: access.error }, { status: access.status })

  const apiKey = process.env.NAVASAN_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'کلید سرویس نرخ روز تنظیم نشده است. نرخ را دستی وارد کنید.' }, { status: 503 })
  }

  try {
    const response = await fetch(`https://api.navasan.tech/latest/?item=eur&api_key=${encodeURIComponent(apiKey)}`, {
      cache: 'no-store',
      signal: AbortSignal.timeout(8000),
    })
    if (!response.ok) throw new Error(`Navasan ${response.status}`)
    const data = await response.json()
    const item = data?.eur || data?.data?.eur
    const rate = Number(String(item?.value || '').replace(/,/g, ''))
    if (!Number.isFinite(rate) || rate <= 0) throw new Error('Invalid rate')

    return NextResponse.json({
      rate,
      currency: 'toman',
      source: 'Navasan',
      sourceLabel: 'نوسان · بازار آزاد',
      updatedAt: item?.timestamp ? new Date(Number(item.timestamp) * 1000).toISOString() : new Date().toISOString(),
      providerDate: item?.date || null,
    })
  } catch (error) {
    console.error('[digitda-exchange-rate]', error)
    return NextResponse.json({ error: 'دریافت نرخ روز ممکن نشد. نرخ را دستی وارد کنید.' }, { status: 502 })
  }
}
