import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { ADMIN_COOKIE, safeEqual } from '@/lib/adminAuth'
import HealthPage from './HealthPage'

export default async function AdminHealthPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get(ADMIN_COOKIE)?.value
  const expected = process.env.ADMIN_SESSION_SECRET

  if (!expected || !token || !safeEqual(token, expected)) {
    redirect('/admin/login')
  }

  return <HealthPage />
}
