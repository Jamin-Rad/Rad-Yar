import { redirect } from 'next/navigation'
import { hasAndarunSession } from '@/lib/andarunPasswordAuth'
import VacationDetail from '../VacationDetail'

export const metadata = { title: 'Urlaub · Andarun', robots: { index: false, follow: false } }
export const dynamic = 'force-dynamic'

export default async function VacationDetailPage({ params }) {
  if (!(await hasAndarunSession())) redirect('/andarun/login?next=/andarun/urlaub')
  const { tripId } = await params
  if (tripId === 'iran') redirect('/andarun/iran-app')
  return <VacationDetail tripId={tripId} />
}
