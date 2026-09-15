import { redirect } from 'next/navigation'
import { hasPrisonerAidSession } from '@/lib/prisonerAidAuth'
import AndarunNav from '@/app/andarun/AndarunNav'
import PrisonerAidPage from './PrisonerAidPage'

export const metadata = {
  title: 'کمک به زندانیان | Finanzen · Andarun',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

export default async function Page() {
  if (!(await hasPrisonerAidSession())) redirect('/andarun/finanz/gefangene/login')
  return <><AndarunNav /><PrisonerAidPage mode="report" /></>
}
