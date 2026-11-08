import { redirect } from 'next/navigation'
import { hasAndarunSession } from '@/lib/andarunPasswordAuth'
import PlannerPage from './PlannerPage'

export const metadata = {
  title: 'Jaminova To Do',
  description: 'Private tasks',
  robots: {
    index: false,
    follow: false,
  },
}

export const dynamic = 'force-dynamic'

export default async function AndarunTodoPage() {
  if (!(await hasAndarunSession())) redirect('/andarun/login?next=/andarun/todo')

  return (
    <>
      <PlannerPage />
    </>
  )
}
