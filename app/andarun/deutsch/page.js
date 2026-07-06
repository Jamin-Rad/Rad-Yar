import { redirect } from 'next/navigation'
import { hasAndarunSession } from '@/lib/andarunPasswordAuth'
import DeutschPage from './DeutschPage'

export const metadata = {
  title: 'Andarun Deutschlernen',
  description: 'Private Deutschlektionen mit Wiederholung',
  robots: {
    index: false,
    follow: false,
  },
}

export const dynamic = 'force-dynamic'

export default async function AndarunDeutschPage() {
  if (!(await hasAndarunSession())) redirect('/andarun/login')

  return <DeutschPage />
}
