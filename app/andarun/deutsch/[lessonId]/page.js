import { redirect } from 'next/navigation'
import { hasAndarunSession } from '@/lib/andarunPasswordAuth'
import AndarunNav from '../../AndarunNav'
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

  return (
    <>
      <AndarunNav />
      <DeutschPage initialLessonId={resolvedParams.lessonId} lessonMode homeHref="/andarun" homeLabel="" courseHref="/andarun/deutsch" lessonBase="/andarun/deutsch" />
    </>
  )
}
