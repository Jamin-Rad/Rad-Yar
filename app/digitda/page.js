import { redirect } from 'next/navigation'
import { hasDigitDASession } from '@/lib/digitdaAuth'
import DigitDADashboard from './DigitDADashboard'

export const metadata = {
  title: 'DigitDA · Finanzen',
  description: 'Geschütztes Finanzdashboard für DigitDA',
  robots: { index: false, follow: false },
}
export const dynamic = 'force-dynamic'

export default async function DigitDAPage() {
  if (!(await hasDigitDASession())) redirect('/digitda/login')
  return <DigitDADashboard />
}
