import { requireAndarunSession } from '@/lib/andarunPasswordAuth'
import { createPrivateHealthHandlers } from '@/lib/privateHealthApi'

const handlers = createPrivateHealthHandlers(requireAndarunSession, 'Andarun', 'andarun')

export const POST = handlers.foods.POST
export const DELETE = handlers.foods.DELETE
export const PATCH = handlers.foods.PATCH
