import { redirect } from 'next/navigation'
import { hasMobinSession } from '@/lib/mobinAuth'
import EnglishTestPrep from '../../EnglishTestPrep'

export const metadata = {
  title: 'Vokabeltest 11. November | Mobin',
  robots: { index: false, follow: false },
}

export default async function NovemberVocabularyPage() {
  if (!(await hasMobinSession())) redirect('/mobin/login?next=/mobin/english/vokabeltest/11-november')
  return <EnglishTestPrep />
}
