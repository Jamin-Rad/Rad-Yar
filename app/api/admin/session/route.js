import { cookies } from 'next/headers'
import { currentUser } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { ADMIN_COOKIE, hasAdminEmail, safeEqual } from '@/lib/adminAuth'

export async function GET() {
  const cookieStore = await cookies()
  const token = cookieStore.get(ADMIN_COOKIE)?.value
  const expected = process.env.ADMIN_SESSION_SECRET
  const hasAdminCookie = !!expected && !!token && safeEqual(token, expected)

  if (!hasAdminCookie) {
    return NextResponse.json({ isAdmin: false })
  }

  const user = await currentUser()
  const isAdmin = hasAdminEmail(user?.emailAddresses)

  return NextResponse.json({ isAdmin })
}
