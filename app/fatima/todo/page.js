import { redirect } from 'next/navigation'
import { hasFatimaSession } from '@/lib/fatimaPasswordAuth'
import TodoPage from '@/app/andarun/todo/TodoPage'

export const metadata = {
  title: 'Fatima ToDo',
  description: 'Gemeinsame Aufgaben und Termine',
  robots: {
    index: false,
    follow: false,
  },
}

export const dynamic = 'force-dynamic'

export default async function FatimaTodoPage() {
  if (!(await hasFatimaSession())) redirect('/fatima/login')

  return <TodoPage apiBase="/api/fatima/todos" homeHref="/fatima" homeLabel="Fatima" theme="light" />
}
