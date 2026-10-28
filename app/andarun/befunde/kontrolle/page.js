import { redirect } from 'next/navigation'
import { hasAndarunSession } from '@/lib/andarunPasswordAuth'
import BefundKontrollePage from './BefundKontrollePage'

export const metadata = {
  title: 'Befundkontrolle · Jaminova',
  description: 'Befunde und ihre Untersuchungsdaten zum späteren Wiederansehen speichern',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

export default async function Page() {
  if (!(await hasAndarunSession())) redirect('/andarun/login?next=/andarun/befunde/kontrolle')
  return <><BefundKontrollePage /></>
}
