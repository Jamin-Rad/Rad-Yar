import { redirect } from 'next/navigation'
import { hasAndarunSession } from '@/lib/andarunPasswordAuth'
import BefundKontrollePage from './BefundKontrollePage'

export const metadata = {
  title: 'Befundkontrolle · Jaminova',
  description: 'Offene Befundfragen mit Frist, Priorität und Status nachverfolgen',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

export default async function Page() {
  if (!(await hasAndarunSession())) redirect('/andarun/login')
  return <><BefundKontrollePage /></>
}
