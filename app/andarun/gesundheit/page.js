import { redirect } from 'next/navigation'
import { hasAndarunSession } from '@/lib/andarunPasswordAuth'
import HealthPage from '@/app/admin/health/HealthPage'

export const metadata = {
  title: 'Andarun Gesundheit',
  description: 'Private Gesundheit',
  robots: {
    index: false,
    follow: false,
  },
}

export const dynamic = 'force-dynamic'

export default async function AndarunHealthPage() {
  if (!(await hasAndarunSession())) redirect('/andarun/login')

  return <HealthPage apiBase="/api/andarun/health" homeHref="/andarun" homeLabel="Andarun" />
}
