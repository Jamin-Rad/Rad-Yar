import { NextResponse } from 'next/server'
import { ANDARUN_COOKIE, getAndarunPassword, getAndarunSessionSecret } from '@/lib/andarunPasswordAuth'
import { safeEqual } from '@/lib/adminAuth'

export async function POST(request) {
  const { password } = await request.json()
  const expectedPassword = getAndarunPassword()
  const sessionSecret = getAndarunSessionSecret()

  if (!expectedPassword || !sessionSecret) {
    return NextResponse.json({ error: 'Andarun access is not configured.' }, { status: 500 })
  }

  if (!safeEqual(password || '', expectedPassword)) {
    return NextResponse.json({ error: 'Wrong password.' }, { status: 401 })
  }

  const response = NextResponse.json({ ok: true })
  response.cookies.set(ANDARUN_COOKIE, sessionSecret, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  })
  return response
}
