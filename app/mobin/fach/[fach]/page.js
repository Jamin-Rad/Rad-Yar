import { notFound } from 'next/navigation'
import Link from 'next/link'
import PlaceholderPage from '../../PlaceholderPage'
import LanguageHome from '../../LanguageHome'
import SubjectHeader from '../../SubjectHeader'
import learning from '../../learning.module.css'
import endungen from '../latein/endungen/endungen.module.css'

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
  if (fach === 'latein') {
    return (
      <main className={learning.shell}>
        <div className={learning.subjectWrap} data-subject="latin">
          <SubjectHeader title={title} mark="Salve" />
          <Link className={endungen.launch} href="/mobin/fach/latein/endungen">
            <span><strong>Grammatiktest · Endungen</strong><small>40 Trainingsaufgaben und drei Tests</small></span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </main>
    )
  }
  if (fach === 'franzoesisch') return <LanguageHome language={title} />
  return <PlaceholderPage title={title} />
}
