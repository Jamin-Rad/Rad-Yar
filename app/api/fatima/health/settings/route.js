import { requireFatimaSession } from '@/lib/fatimaPasswordAuth'
import { createPrivateHealthHandlers } from '@/lib/privateHealthApi'

const handlers = createPrivateHealthHandlers(requireFatimaSession, 'Fatima', 'fatima')

export const GET = handlers.settings.GET
export const POST = handlers.settings.POST
