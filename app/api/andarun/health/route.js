import { requireAndarunSession } from '@/lib/andarunPasswordAuth'
import { createPrivateHealthHandlers } from '@/lib/privateHealthApi'

const handlers = createPrivateHealthHandlers(requireAndarunSession, 'Andarun')

export const GET = handlers.GET
