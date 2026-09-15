import { redirect } from 'next/navigation'
import { hasAndarunSession } from '@/lib/andarunPasswordAuth'
import AndarunNav from '../../AndarunNav'
import BefundKontrollePage from './BefundKontrollePage'

export const metadata = {
  title: 'Befundkontrolle · Andarun',
  description: 'Relevante Fälle und Verlaufskontrollen übersichtlich bearbeiten',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

export default async function Page() {
  if (!(await hasAndarunSession())) redirect('/andarun/login')
  return <><AndarunNav /><BefundKontrollePage /></>
}
