import { archiveAccess, archiveBody, privateJson, archiveFailure } from '@/lib/caseArchive/server'

export const dynamic = 'force-dynamic'

export async function GET(request) {
  try {
    const store = await archiveAccess(request)
    const [result, imported] = await Promise.all([store.list({ page: new URL(request.url).searchParams.get('page') || 0 }), store.importStatus()])
    return privateJson({ ...result, imported })
  } catch (error) { return archiveFailure(error) }
}

export async function POST(request) {
  try {
    const store = await archiveAccess(request, true)
    const body = await archiveBody(request)
    if (body.action === 'search') {
      const [result, imported] = await Promise.all([store.list({ ...body.filters, page: body.page || 0 }), store.importStatus()])
      return privateJson({ ...result, imported })
    }
    if (body.action === 'copy-fallsammlung') return privateJson(await store.copyFallsammlung())
    if (body.action === 'import-radiopaedia') return privateJson(await store.importRadiopaedia(body.cases))
    if (body.action === 'create') return privateJson({ record: await store.create(body.record) }, 201)
    return privateJson({ error: 'Unbekannte Aktion.' }, 400)
  } catch (error) { return archiveFailure(error) }
}
