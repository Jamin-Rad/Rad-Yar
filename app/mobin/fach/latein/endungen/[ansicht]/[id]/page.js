import { notFound } from 'next/navigation'
import { rounds } from '../../questions'

export default async function LatinRoundPage({ params }) {
  const { ansicht, id } = await params
  if (id.startsWith('probe24-')) notFound()
  const valid = (ansicht === 'uebung' && (id === 'fehler' || (Object.hasOwn(rounds, id) && rounds[id].kind === 'training')))
    || (ansicht === 'test' && Object.hasOwn(rounds, id) && rounds[id].kind !== 'training')
    || (ansicht === 'auswertung' && /^[a-f0-9-]{36}$/i.test(id))
  if (!valid) notFound()
  return null
}
