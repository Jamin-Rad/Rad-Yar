import { NextResponse } from 'next/server'
import { MOBIN_COOKIE } from '@/lib/mobinAuth'

export async function POST() {
  const res = NextResponse.json({ ok: true })
  res.cookies.set(MOBIN_COOKIE, '', {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  })
  return res
}
