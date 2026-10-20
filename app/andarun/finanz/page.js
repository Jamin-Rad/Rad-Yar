import { redirect } from 'next/navigation'
import { hasAndarunSession } from '@/lib/andarunPasswordAuth'
import BudgetPage from '@/app/admin/budget/BudgetPage'

export const metadata = {
  title: 'Yaminova Finanzen',
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
      <BudgetPage initialView="monat" excludeVacation />
    </>
  )
}
