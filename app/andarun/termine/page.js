import { redirect } from 'next/navigation'
import { hasAndarunSession } from '@/lib/andarunPasswordAuth'
import TodoPage from '../todo/TodoPage'

export const metadata = {
  title: 'Jaminova Termine',
  description: 'Persoenliche Termine und Kalender',
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function AndarunEventsPage() {
  if (!(await hasAndarunSession())) redirect('/andarun/login?next=/andarun/termine')

  return (
    <>
      <TodoPage showHomeLink={false} view="events" />
    </>
  )
}
