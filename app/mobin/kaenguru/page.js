import { redirect } from 'next/navigation'
import { hasMobinSession } from '@/lib/mobinAuth'
import KanguruPage from './KanguruPage'

export const metadata = {
  title: 'Känguru | Mobin',
  description: 'Mobins Känguru-Aufgaben, tägliche Lernserie und Fortschritt.',
  robots: { index: false, follow: false },
}
export const dynamic = 'force-dynamic'

export default async function Page() {
  if (!(await hasMobinSession())) redirect('/mobin/login?next=/mobin/kaenguru')
  return <KanguruPage />
}
