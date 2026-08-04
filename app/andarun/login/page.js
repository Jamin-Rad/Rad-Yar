import AndarunLogin from './AndarunLogin'

export const metadata = {
  title: 'Andarun Login',
  description: 'Private Anmeldung',
  robots: {
    index: false,
    follow: false,
  },
}

export default async function AndarunLoginPage({ searchParams }) {
  const params = await searchParams
  const requestedPath = params?.next
  const nextPath = requestedPath?.startsWith('/andarun/') && !requestedPath.startsWith('//') ? requestedPath : '/andarun'

  return <AndarunLogin nextPath={nextPath} />
}
