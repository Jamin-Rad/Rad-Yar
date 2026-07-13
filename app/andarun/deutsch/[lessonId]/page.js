import { redirect } from 'next/navigation'
import { hasAndarunSession } from '@/lib/andarunPasswordAuth'
import DeutschPage from '../DeutschPage'

export const metadata = {
  title: 'Andarun Deutschlektion',
  description: 'Private Deutschlektion',
  robots: {
    index: false,
    follow: false,
  },
}

export const dynamic = 'force-dynamic'

export default async function AndarunDeutschLessonPage({ params }) {
  if (!(await hasAndarunSession())) redirect('/andarun/login')
  const resolvedParams = await params

  return <DeutschPage initialLessonId={resolvedParams.lessonId} lessonMode homeHref="/andarun" homeLabel="Andarun" courseHref="/andarun/deutsch" lessonBase="/andarun/deutsch" />
}
