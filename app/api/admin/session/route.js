import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { ADMIN_COOKIE, safeEqual } from '@/lib/adminAuth'

export async function GET() {
  const cookieStore = await cookies()
  const token = cookieStore.get(ADMIN_COOKIE)?.value
  const expected = process.env.ADMIN_SESSION_SECRET
  const isAdmin = !!expected && !!token && safeEqual(token, expected)

  return NextResponse.json({ isAdmin })
}
