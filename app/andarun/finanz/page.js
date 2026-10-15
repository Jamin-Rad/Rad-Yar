import { redirect } from 'next/navigation'
import { hasAndarunSession } from '@/lib/andarunPasswordAuth'
import AndarunNav from '../AndarunNav'
import BudgetPage from '@/app/admin/budget/BudgetPage'

export const metadata = {
  title: 'Monatliche Ausgaben | Jaminova Finanzen',
  description: 'Private Finanzen',
  robots: {
    index: false,
    follow: false,
  },
}

export const dynamic = 'force-dynamic'

export default async function AndarunFinanzPage({ searchParams }) {
  if (!(await hasAndarunSession())) redirect('/andarun/login?next=/andarun/finanz')
  const params = await searchParams
  if (params?.bereich === 'urlaub') redirect('/andarun/urlaub')

  return (
    <>
      <AndarunNav variant="finance" />
      <BudgetPage initialView="monat" excludeVacation />
    </>
  )
}
