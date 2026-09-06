import { redirect } from 'next/navigation'
import { hasAndarunSession } from '@/lib/andarunPasswordAuth'
import VacationHub from './VacationHub'

export const metadata = { title: 'Urlaubsarchiv · Andarun', description: 'Urlaube und Reisekosten', robots: { index: false, follow: false } }
export const dynamic = 'force-dynamic'

export default async function VacationPage() {
  if (!(await hasAndarunSession())) redirect('/andarun/login?next=/andarun/urlaub')
  return <VacationHub />
}
