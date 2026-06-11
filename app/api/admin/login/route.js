import { NextResponse } from 'next/server'
import { ADMIN_COOKIE, safeEqual } from '@/lib/adminAuth'

export async function POST(request) {
  const { password } = await request.json()
  const expectedPassword = process.env.ADMIN_PASSWORD
  const sessionSecret = process.env.ADMIN_SESSION_SECRET

  if (!expectedPassword || !sessionSecret) {
    return NextResponse.json({ error: 'Admin-Login ist nicht konfiguriert' }, { status: 500 })
  }

  if (!safeEqual(password || '', expectedPassword)) {
    return NextResponse.json({ error: 'Falsches Passwort' }, { status: 401 })
  }

  const res = NextResponse.json({ ok: true })
  res.cookies.set(ADMIN_COOKIE, sessionSecret, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  })
  return res
}
