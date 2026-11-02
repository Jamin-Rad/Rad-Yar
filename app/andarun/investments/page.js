import { redirect } from 'next/navigation'
import { hasAndarunSession } from '@/lib/andarunPasswordAuth'
import InvestmentWorkspace from './InvestmentWorkspace'

export const dynamic = 'force-dynamic'
export const metadata = {
  title: 'سرمایه | Andarun',
  description: 'مدیریت خصوصی سبد سرمایه‌گذاری',
  robots: { index: false, follow: false },
}

export default async function InvestmentsPage() {
  if (!(await hasAndarunSession())) redirect('/andarun/login')
  return <InvestmentWorkspace />
}
