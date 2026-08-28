import { NextResponse } from 'next/server'
import { DIGITDA_COOKIE } from '@/lib/digitdaAuth'

export async function POST(request) {
  const response = NextResponse.redirect(new URL('/digitda/login', request.url), 303)
  response.cookies.set(DIGITDA_COOKIE, '', { httpOnly: true, path: '/', maxAge: 0 })
  return response
}
