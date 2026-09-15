import { NextResponse } from 'next/server'
import { createPrisonerAidSession, PRISONER_AID_COOKIE, validPrisonerAidPassword } from '@/lib/prisonerAidAuth'

export async function POST(request) {
  let body
  try { body = await request.json() } catch {
    return NextResponse.json({ error: 'درخواست نامعتبر است.' }, { status: 400 })
  }
  if (!validPrisonerAidPassword(body?.password))
    return NextResponse.json({ error: 'رمز اشتباه است.' }, { status: 401 })

  const token = createPrisonerAidSession()
  if (!token) return NextResponse.json({ error: 'ورود این صفحه پیکربندی نشده است.' }, { status: 503 })

  const response = NextResponse.json({ ok: true })
  response.cookies.set(PRISONER_AID_COOKIE, token, {
    httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax',
    path: '/', maxAge: 60 * 60 * 24 * 30,
  })
  return response
}
