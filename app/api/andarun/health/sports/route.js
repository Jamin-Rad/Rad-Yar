import { requireAndarunSession } from '@/lib/andarunPasswordAuth'
import { createPrivateHealthHandlers } from '@/lib/privateHealthApi'

const handlers = createPrivateHealthHandlers(requireAndarunSession, 'Andarun')

export const POST = handlers.sports.POST
export const DELETE = handlers.sports.DELETE
export const PATCH = handlers.sports.PATCH
