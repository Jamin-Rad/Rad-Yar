import { redirect } from 'next/navigation'
import { hasMobinSession } from '@/lib/mobinAuth'
import VokabeltestClient from './VokabeltestClient'

export const metadata = {
  title: 'Vokabeltest | Mobin English',
  description: 'Zwei neue Vokabeltests und 30 anspruchsvolle Fragen zu Unit 2 London.',
  robots: { index: false, follow: false },
}

export default async function VokabeltestPage() {
  if (!(await hasMobinSession())) redirect('/mobin/login?next=/mobin/english/vokabeltest')
  return <VokabeltestClient />
}
