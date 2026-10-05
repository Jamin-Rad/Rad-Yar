import { NextResponse } from 'next/server'
import { MAMAN_COOKIE, MAMAN_USERNAME, createMamanToken, isMamanUsername } from '@/lib/mamanAuth'

export async function POST(request) {
  let body = {}
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'درخواست معتبر نیست.' }, { status: 400 })
  }

  if (!isMamanUsername(body.username)) {
    return NextResponse.json({ error: `نام کاربری باید ${MAMAN_USERNAME} باشد.` }, { status: 401 })
  }

  const token = createMamanToken()
  if (!token) return NextResponse.json({ error: 'ورود Maman روی سرور تنظیم نشده است.' }, { status: 500 })

  const response = NextResponse.json({ ok: true, username: MAMAN_USERNAME, token, expiresIn: 60 * 60 * 24 * 365 })
  response.cookies.set(MAMAN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
  })
  return response
}
