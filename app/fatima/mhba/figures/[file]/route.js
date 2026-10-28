import { hasFatimaSession } from '@/lib/fatimaPasswordAuth'
import { downloadFatimaMhbaMaterial } from '@/lib/fatimaMhbaMaterials'
import { sourceFigureFiles } from '../../sourceFigures'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(_request, { params }) {
  if (!(await hasFatimaSession())) return new Response('Not allowed for Fatima', { status: 403 })
  const { file } = await params
  if (!sourceFigureFiles.has(file)) return new Response('Not found', { status: 404 })
  try {
    const image = await downloadFatimaMhbaMaterial(`figures/${file}`)
    return new Response(image, { headers: {
      'Content-Type': 'image/webp',
      'Cache-Control': 'private, no-store',
      'X-Content-Type-Options': 'nosniff',
      'X-Robots-Tag': 'noindex, nofollow',
    } })
  } catch {
    return new Response('Figure temporarily unavailable', { status: 503 })
  }
}
