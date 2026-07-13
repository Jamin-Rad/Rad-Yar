import { requireFatimaSession } from '@/lib/fatimaPasswordAuth'
import { createPrivateHealthHandlers } from '@/lib/privateHealthApi'

const handlers = createPrivateHealthHandlers(requireFatimaSession, 'Fatima')

export const POST = handlers.foods.POST
export const DELETE = handlers.foods.DELETE
export const PATCH = handlers.foods.PATCH
