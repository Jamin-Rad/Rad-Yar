import { redirect } from 'next/navigation'
import { hasAndarunSession } from '@/lib/andarunPasswordAuth'
import RoutinePage from './RoutinePage'

export const metadata = {
  title: 'Andarun Routine',
  description: 'Private Routine-Progress',
  robots: {
    index: false,
    follow: false,
  },
}

export const dynamic = 'force-dynamic'

export default async function AndarunRoutinePage() {
  if (!(await hasAndarunSession())) redirect('/andarun/login')

  return <RoutinePage />
}
