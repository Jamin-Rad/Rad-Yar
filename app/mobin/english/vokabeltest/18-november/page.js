import { redirect } from 'next/navigation'
import { hasMobinSession } from '@/lib/mobinAuth'
import NovemberClient from './NovemberClient'

export const metadata = {
  title: 'Testvorbereitung 18. November · English · Mobin',
  robots: { index: false, follow: false },
}

export default async function NovemberVocabularyPage() {
  if (!(await hasMobinSession())) redirect('/mobin/login?next=/mobin/english/vokabeltest/18-november')
  return <NovemberClient />
}
