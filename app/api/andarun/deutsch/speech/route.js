import { requireAndarunSession } from '@/lib/andarunPasswordAuth'
import { createDeutschSpeechPost } from '@/lib/privateDeutschSpeech'

export const POST = createDeutschSpeechPost(requireAndarunSession, 'andarun-deutsch-speech')
