import { redirect } from 'next/navigation'
import { hasAndarunSession } from '@/lib/andarunPasswordAuth'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import TestLearningPage from './TestLearningPage'

export const metadata = {
  title: 'Test · Lernseiten | Andarun',
  description: 'Dauerhafte Testseite für die Gestaltung zukünftiger RadYar-Lernseiten.',
  robots: {
    index: false,
    follow: false,
  },
}

export const dynamic = 'force-dynamic'

export default async function AndarunTestPage() {
  if (!(await hasAndarunSession())) redirect('/andarun/login?next=/andarun/test')

  return (
    <>
      <Navbar />
      <TestLearningPage />
      <Footer />
    </>
  )
}
