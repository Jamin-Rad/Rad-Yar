import { archiveAccess, archiveBody, privateJson, archiveFailure } from '@/lib/caseArchive/server'

export const dynamic = 'force-dynamic'

export async function GET(request, { params }) {
  try {
    const store = await archiveAccess(request)
    const { id } = await params
    return privateJson({ record: await store.get(id) })
  } catch (error) { return archiveFailure(error) }
}

export async function PUT(request, { params }) {
  try {
    const store = await archiveAccess(request, true)
    const { id } = await params
    const body = await archiveBody(request)
    return privateJson({ record: await store.update(id, body.record, body.revision) })
  } catch (error) { return archiveFailure(error) }
}
