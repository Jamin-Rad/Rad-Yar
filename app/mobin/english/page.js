import { redirect } from 'next/navigation'
import { hasMobinSession } from '@/lib/mobinAuth'
import EnglishHome from './EnglishHome'

export const metadata = {
  title: 'English | Mobin',
  description: 'Vokabeltests und Klassenarbeiten für Mobin.',
  robots: { index: false, follow: false },
}

export default async function EnglishPage() {
  if (!(await hasMobinSession())) redirect('/mobin/login?next=/mobin/english')
  return <EnglishHome />
}
