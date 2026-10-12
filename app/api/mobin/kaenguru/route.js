import { hasMobinSession } from '@/lib/mobinAuth'
import { ANDARUN_OWNER_ID } from '@/lib/andarunPasswordAuth'
import { createKanguruHandlers } from '@/lib/kanguruStore'

async function requireSession() {
  if (!(await hasMobinSession())) return { error: 'Nicht eingeloggt', status: 401 }
  // Reuse the existing family progress row: relocation must not reset Mobin's history.
  return { ownerId: ANDARUN_OWNER_ID }
}

export const { GET, PATCH, DELETE } = createKanguruHandlers(requireSession)
