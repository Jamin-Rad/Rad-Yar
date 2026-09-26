import { redirect } from 'next/navigation'
import { hasAndarunSession } from '@/lib/andarunPasswordAuth'
import MedicationPage from './MedicationPage'

export const metadata = {
  title: 'داروی من | اندرون',
  description: 'برنامه ساده و خصوصی مصرف دارو',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

export default async function AndarunMedicationPage() {
  if (!(await hasAndarunSession())) redirect('/andarun/login?next=/andarun/medikamente')
  return <MedicationPage />
}
