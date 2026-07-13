import { redirect } from 'next/navigation'
import { hasAndarunSession } from '@/lib/andarunPasswordAuth'
import AndarunNav from '../AndarunNav'
import TodoPage from './TodoPage'

export const metadata = {
  title: 'Andarun ToDo',
  description: 'Private tasks',
  robots: {
    index: false,
    follow: false,
  },
}

export const dynamic = 'force-dynamic'

export default async function AndarunTodoPage() {
  if (!(await hasAndarunSession())) redirect('/andarun/login')

  return (
    <>
      <AndarunNav />
      <TodoPage showHomeLink={false} />
    </>
  )
}
