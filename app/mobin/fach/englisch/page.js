import { redirect } from 'next/navigation'
import { hasMobinSession } from '@/lib/mobinAuth'
import EnglishHome from '../../english/EnglishHome'

export const metadata = { title: 'Englisch · Mobin', robots: { index: false, follow: false } }

export default async function EnglischPage() {
  if (!(await hasMobinSession())) redirect('/mobin/login?next=/mobin/fach/englisch')
  return <EnglishHome />
}
