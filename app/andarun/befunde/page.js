import { redirect } from 'next/navigation'
import { hasAndarunSession } from '@/lib/andarunPasswordAuth'
import AndarunNav from '../AndarunNav'
import WorkPage from '../dienste/WorkPage'

export const metadata = {
  title: 'Andarun Befunde',
  description: 'Befundzeiten erfassen und Tagesarbeitszeit ansehen',
  robots: {
    index: false,
    follow: false,
  },
}

export const dynamic = 'force-dynamic'

export default async function AndarunFindingsPage() {
  if (!(await hasAndarunSession())) redirect('/andarun/login')

  return (
    <>
      <AndarunNav />
      <WorkPage showHomeLink={false} view="findings" />
    </>
  )
}
