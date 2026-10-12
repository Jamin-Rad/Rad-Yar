import { requireAndarunSession } from '@/lib/andarunPasswordAuth'
import { createKanguruHandlers } from '@/lib/kanguruStore'

// Compatibility for old installed apps; keep their existing authentication.
export const { GET, PATCH, DELETE } = createKanguruHandlers(requireAndarunSession)
