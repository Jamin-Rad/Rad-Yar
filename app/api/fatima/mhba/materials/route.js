import { hasFatimaSession } from '@/lib/fatimaPasswordAuth'
import { downloadFatimaMhbaMaterial } from '@/lib/fatimaMhbaMaterials'

export const dynamic = 'force-dynamic'

export async function GET() {
  if (!(await hasFatimaSession())) {
    return Response.json({ error: 'Not allowed for Fatima' }, { status: 403 })
  }
  try {
    const materials = await downloadFatimaMhbaMaterial('materials.json')
    return new Response(await materials.text(), {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'private, no-store',
        'X-Robots-Tag': 'noindex, nofollow',
      },
    })
  } catch {
    return Response.json({ error: 'دریافت جزوه‌ها ممکن نشد.' }, { status: 503 })
  }
}
