import { requireFatimaSession } from '@/lib/fatimaPasswordAuth'
import { createPrivateHealthHandlers } from '@/lib/privateHealthApi'

const handlers = createPrivateHealthHandlers(requireFatimaSession, 'Fatima')

export const POST = handlers.sports.POST
export const DELETE = handlers.sports.DELETE
export const PATCH = handlers.sports.PATCH
