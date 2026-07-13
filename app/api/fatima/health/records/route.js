import { requireFatimaSession } from '@/lib/fatimaPasswordAuth'
import { createPrivateHealthHandlers } from '@/lib/privateHealthApi'

const handlers = createPrivateHealthHandlers(requireFatimaSession, 'Fatima')

export const POST = handlers.records.POST
export const DELETE = handlers.records.DELETE
