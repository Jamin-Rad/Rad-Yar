import { redirect } from 'next/navigation'
import { hasAndarunSession } from '@/lib/andarunPasswordAuth'
import AndarunNav from '../AndarunNav'
import ImmobilienPage from './ImmobilienPage'

export const metadata = {
  title: 'Immobilien | Andarun',
  description: 'Private Immobiliensuche und Vergleich',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

export default async function AndarunImmobilienPage() {
  if (!(await hasAndarunSession())) redirect('/andarun/login')

  return (
    <>
      <AndarunNav />
      <ImmobilienPage />
    </>
  )
}
