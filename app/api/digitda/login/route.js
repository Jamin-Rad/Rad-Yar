import { NextResponse } from 'next/server'
import { DIGITDA_COOKIE, getDigitDAPassword, getDigitDASessionSecret } from '@/lib/digitdaAuth'
import { safeEqual } from '@/lib/adminAuth'

export async function POST(request) {
  let body = {}
  try { body = await request.json() } catch {}

  if (!safeEqual(body.password || '', getDigitDAPassword())) {
    return NextResponse.json({ error: 'Das Passwort ist nicht korrekt.' }, { status: 401 })
  }

  const response = NextResponse.json({ ok: true })
  response.cookies.set(DIGITDA_COOKIE, getDigitDASessionSecret(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  })
  return response
}
