import { NextResponse } from 'next/server'
import { safeEqual } from '@/lib/adminAuth'
import { FATIMA_COOKIE, getFatimaPassword, getFatimaSessionSecret } from '@/lib/fatimaPasswordAuth'

export async function POST(request) {
  const { password } = await request.json()
  const expectedPassword = getFatimaPassword()
  const sessionSecret = getFatimaSessionSecret()

  if (!expectedPassword || !sessionSecret) {
    return NextResponse.json({ error: 'Fatima access is not configured.' }, { status: 500 })
  }

  if (!safeEqual(password || '', expectedPassword)) {
    return NextResponse.json({ error: 'Wrong password.' }, { status: 401 })
  }

  const response = NextResponse.json({ ok: true })
  response.cookies.set(FATIMA_COOKIE, sessionSecret, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  })
  return response
}
