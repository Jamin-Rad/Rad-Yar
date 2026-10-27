import { hasFatimaSession } from '@/lib/fatimaPasswordAuth'
import { downloadFatimaMhbaMaterial, FATIMA_MHBA_FILES } from '@/lib/fatimaMhbaMaterials'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(_request, { params }) {
  if (!(await hasFatimaSession())) {
    return new Response('Not allowed for Fatima', { status: 403 })
  }

  const { file } = await params
  if (!FATIMA_MHBA_FILES.has(file)) return new Response('Not found', { status: 404 })

  try {
    const pdf = await downloadFatimaMhbaMaterial(file)
    return new Response(pdf, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${file}"`,
        'Cache-Control': 'private, no-store',
        'X-Content-Type-Options': 'nosniff',
        'X-Robots-Tag': 'noindex, nofollow',
      },
    })
  } catch {
    return new Response('Material temporarily unavailable', { status: 503 })
  }
}
