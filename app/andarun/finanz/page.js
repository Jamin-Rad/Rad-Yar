import { redirect } from 'next/navigation'
import { hasAndarunSession } from '@/lib/andarunPasswordAuth'
import AndarunNav from '../AndarunNav'
import BudgetPage from '@/app/admin/budget/BudgetPage'

export const metadata = {
  title: 'Andarun Finanzen',
  description: 'Private Finanzen',
  robots: {
    index: false,
    follow: false,
  },
}

export const dynamic = 'force-dynamic'

export default async function AndarunFinanzPage({ searchParams }) {
  if (!(await hasAndarunSession())) redirect('/andarun/login')
  const params = await searchParams
  const initialView = params?.bereich === 'urlaub' ? 'iranurlaub' : 'monat'

  return (
    <>
      <AndarunNav />
      <BudgetPage initialView={initialView} />
    </>
  )
}
