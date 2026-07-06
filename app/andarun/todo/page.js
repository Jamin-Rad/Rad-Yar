import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { isAndarunUser } from '@/lib/andarunAuth'
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
  const { userId } = await auth()
  if (!userId) redirect('/andarun/login')

  const user = await currentUser()
  if (!isAndarunUser(user)) {
    return (
      <main style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        padding: 24,
        background: '#030712',
        color: '#fff',
        fontFamily: 'var(--font-manrope, sans-serif)',
      }}>
        <section style={{
          width: 'min(520px, 100%)',
          padding: 32,
          border: '1px solid rgba(255,255,255,.16)',
          borderRadius: 28,
          background: 'rgba(255,255,255,.08)',
          boxShadow: '0 28px 80px rgba(0,0,0,.35)',
          textAlign: 'center',
        }}>
          <h1 style={{ margin: '0 0 12px', fontFamily: 'var(--font-fraunces, serif)', fontSize: 44 }}>Andarun</h1>
          <p style={{ margin: 0, color: 'rgba(255,255,255,.72)', lineHeight: 1.6 }}>
            This account is not enabled for Andarun yet.
          </p>
        </section>
      </main>
    )
  }

  return <TodoPage />
}
