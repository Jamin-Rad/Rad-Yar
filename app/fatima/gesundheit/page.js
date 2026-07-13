import { redirect } from 'next/navigation'
import { hasFatimaSession } from '@/lib/fatimaPasswordAuth'
import HealthPage from '@/app/admin/health/HealthPage'

export const metadata = {
  title: 'Fatima Gesundheit',
  description: 'Private Gesundheit',
  robots: {
    index: false,
    follow: false,
  },
}

export const dynamic = 'force-dynamic'

export default async function FatimaHealthPage() {
  if (!(await hasFatimaSession())) redirect('/fatima/login')

  return <HealthPage apiBase="/api/fatima/health" />
}
