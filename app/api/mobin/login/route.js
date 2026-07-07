import { NextResponse } from 'next/server'
import { MOBIN_COOKIE, getMobinPassword, getMobinSessionSecret } from '@/lib/mobinAuth'
import { safeEqual } from '@/lib/adminAuth'

export async function POST(request) {
  const { password } = await request.json()
  const expected = getMobinPassword()
  const secret = getMobinSessionSecret()

  if (!expected || !secret) {
    return NextResponse.json({ error: 'Login nicht konfiguriert' }, { status: 500 })
  }

  if (!safeEqual(password || '', expected)) {
    return NextResponse.json({ error: 'Falsches Passwort' }, { status: 401 })
  }

  const res = NextResponse.json({ ok: true })
  res.cookies.set(MOBIN_COOKIE, secret, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  })
  return res
}
