import { redirect } from 'next/navigation'
import { hasAndarunSession } from '@/lib/andarunPasswordAuth'
import AndarunNav from '../AndarunNav'
import TodoPage from '../todo/TodoPage'

export const metadata = {
  title: 'Andarun Termine',
  description: 'Persoenliche Termine und Kalender',
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function AndarunEventsPage() {
  if (!(await hasAndarunSession())) redirect('/andarun/login')

  return (
    <>
      <AndarunNav />
      <TodoPage showHomeLink={false} view="events" />
    </>
  )
}
