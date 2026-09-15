import PrisonerAidLogin from './PrisonerAidLogin'

export const metadata = { title: 'ورود | کمک به زندانیان', robots: { index: false, follow: false } }

export default async function Page({ searchParams }) {
  const params = await searchParams
  const nextPath = params?.next === '/andarun/finanz/gefangene/edit'
    ? '/andarun/finanz/gefangene/edit' : '/andarun/finanz/gefangene'
  return <PrisonerAidLogin nextPath={nextPath} />
}
