import { redirect } from 'next/navigation'
import { hasFatimaSession } from '@/lib/fatimaPasswordAuth'
import DeutschPage from '@/app/andarun/deutsch/DeutschPage'

export const metadata = {
  title: 'Fatima Deutschlernen',
  description: 'Deutschlernen mit eigenem Fortschritt',
  robots: {
    index: false,
    follow: false,
  },
}

export const dynamic = 'force-dynamic'

export default async function FatimaDeutschPage() {
  if (!(await hasFatimaSession())) redirect('/fatima/login')

  return (
    <DeutschPage
      apiBase="/api/fatima/deutsch"
      correctEndpoint="/api/fatima/deutsch/correct"
      homeHref="/fatima"
      courseHref="/fatima/deutsch"
      lessonBase="/fatima/deutsch"
      canImport={false}
      theme="light"
    />
  )
}
