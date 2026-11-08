import { redirect } from 'next/navigation'
import { hasAndarunSession } from '@/lib/andarunPasswordAuth'
import CaseArchive from './CaseArchive'

export const metadata = {
  title: 'Fallarchiv · Jaminova',
  description: 'Dein privates radiologisches Fallarchiv.',
  robots: { index: false, follow: false },
}
export const dynamic = 'force-dynamic'

export default async function FallarchivPage() {
  if (!(await hasAndarunSession())) redirect('/andarun/login')
  return <CaseArchive />
}
