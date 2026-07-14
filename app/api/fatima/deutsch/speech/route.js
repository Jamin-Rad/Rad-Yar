import { requireFatimaSession } from '@/lib/fatimaPasswordAuth'
import { createDeutschSpeechPost } from '@/lib/privateDeutschSpeech'

export const POST = createDeutschSpeechPost(requireFatimaSession, 'fatima-deutsch-speech')
