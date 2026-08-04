import { redirect } from 'next/navigation'
import { hasAndarunSession } from '@/lib/andarunPasswordAuth'
import BudgetPage from '@/app/admin/budget/BudgetPage'

export const metadata = {
  title: 'Iran Reisekasse',
  description: 'Private Reisekasse für den Sonderurlaub Iran',
  robots: {
    index: false,
    follow: false,
  },
}

export const dynamic = 'force-dynamic'

export default async function IranAppPage() {
  if (!(await hasAndarunSession())) redirect('/andarun/login?next=/andarun/iran-app')

  return <BudgetPage iranOnly />
}
