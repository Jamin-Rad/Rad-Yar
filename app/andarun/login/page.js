import AndarunLogin from './AndarunLogin'
import { getAndarunPwaMetadata, getAndarunWebAppKey } from '@/lib/andarunWebApps'

function destination(params) {
  const path = params?.next
  return typeof path === 'string' && path.startsWith('/andarun/') && !/[\\\r\n]/.test(path) ? path : '/andarun'
}

export async function generateMetadata({ searchParams }) {
  const path = destination(await searchParams)
  return {
    ...getAndarunPwaMetadata(getAndarunWebAppKey(path.split(/[?#]/)[0]) || 'andarun'),
    title: 'Jaminova Login',
    description: 'Private Anmeldung',
    robots: { index: false, follow: false },
  }
}

export default async function AndarunLoginPage({ searchParams }) {
  const params = await searchParams
  const nextPath = destination(params)

  return <AndarunLogin nextPath={nextPath} />
}
