import { redirect } from 'next/navigation'
import { hasFatimaSession } from '@/lib/fatimaPasswordAuth'
import DeutschPage from '@/app/andarun/deutsch/DeutschPage'

export const metadata = {
  title: 'Fatima Deutschlektion',
  description: 'Deutschlektion mit eigenem Fortschritt',
  robots: {
    index: false,
    follow: false,
  },
}

export const dynamic = 'force-dynamic'

export default async function FatimaDeutschLessonPage({ params }) {
  if (!(await hasFatimaSession())) redirect('/fatima/login')
  const resolvedParams = await params

  return (
    <DeutschPage
      initialLessonId={resolvedParams.lessonId}
      lessonMode
      apiBase="/api/fatima/deutsch"
      correctEndpoint="/api/fatima/deutsch/correct"
      coachEndpoint="/api/fatima/deutsch/coach"
      homeHref="/fatima"
      courseHref="/fatima/deutsch"
      lessonBase="/fatima/deutsch"
      canImport={false}
    />
  )
}
