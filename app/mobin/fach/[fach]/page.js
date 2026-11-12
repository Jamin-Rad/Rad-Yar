import { notFound } from 'next/navigation'
import PlaceholderPage from '../../PlaceholderPage'
import LanguageHome from '../../LanguageHome'

const subjects = {
  nwt: 'NWT',
  physik: 'Physik',
  biologie: 'Biologie',
  geographie: 'Geographie',
  sport: 'Sport',
  spanisch: 'Spanisch',
  latein: 'Latein',
  franzoesisch: 'Französisch',
  religion: 'Reli',
}

export function generateStaticParams() {
  return Object.keys(subjects).map((fach) => ({ fach }))
}

export async function generateMetadata({ params }) {
  const { fach } = await params
  return { title: `${subjects[fach] || 'Schulfach'} · Mobin` }
}

export default async function FachPage({ params }) {
  const { fach } = await params
  const title = subjects[fach]
  if (!title) notFound()
  if (fach === 'latein' || fach === 'franzoesisch') return <LanguageHome language={title} school={fach === 'latein'} />
  return <PlaceholderPage title={title} />
}
