import { requireAndarunSession } from '@/lib/andarunPasswordAuth'
import { createFoodPhotoHandlers } from '@/lib/foodPhotoAi'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 60
export const { GET, POST } = createFoodPhotoHandlers(requireAndarunSession)
