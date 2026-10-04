import { redirect } from 'next/navigation'
import { hasAndarunSession } from '@/lib/andarunPasswordAuth'
import AndarunNav from '../AndarunNav'
import WorkPage from './WorkPage'

export const metadata = {
  title: 'Andarun Dienste',
  description: 'Dienstzeiten und Dienstplanung',
  robots: {
    index: false,
    follow: false,
  },
}

export const dynamic = 'force-dynamic'

export default async function AndarunWorkPage() {
  if (!(await hasAndarunSession())) redirect('/andarun/login?next=/andarun/dienste')

  return (
    <>
      <AndarunNav />
      <WorkPage showHomeLink={false} view="shifts" />
    </>
  )
}
