import { requireAndarunSession } from '@/lib/andarunPasswordAuth'
import { createPrivateHealthHandlers } from '@/lib/privateHealthApi'

const handlers = createPrivateHealthHandlers(requireAndarunSession, 'Andarun')

export const POST = handlers.records.POST
export const DELETE = handlers.records.DELETE
