import { redirect } from 'next/navigation'
import { hasAndarunSession } from '@/lib/andarunPasswordAuth'
import AndarunNav from '@/app/andarun/AndarunNav'
import PrisonerAidPage from './PrisonerAidPage'

export const metadata = {
  title: 'کمک به زندانیان | Finanzen · Andarun',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

export default async function Page() {
  if (!(await hasAndarunSession())) redirect('/andarun/login')
  return <><AndarunNav /><PrisonerAidPage /></>
}
