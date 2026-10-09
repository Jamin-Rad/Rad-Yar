import { redirect } from 'next/navigation'
import { hasAndarunSession } from '@/lib/andarunPasswordAuth'
import KanguruPage from './KanguruPage'

export const metadata = {
  title: 'Känguru | Andarun',
  description: 'Känguru-Aufgaben für die Klassen 5 und 6',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

export default async function Page() {
  if (!(await hasAndarunSession())) redirect('/andarun/login')
  return <KanguruPage />
}

