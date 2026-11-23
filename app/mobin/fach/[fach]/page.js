import { notFound } from 'next/navigation'
import Link from 'next/link'
import PlaceholderPage from '../../PlaceholderPage'
import LanguageHome from '../../LanguageHome'
import latin from '../latein/latin-home.module.css'

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
      <main className={latin.home} lang="de">
        <Link className={latin.back} href="/mobin?bereich=1">← Mobin</Link>
        <h1>{title}</h1>
        <nav className={latin.topics} aria-label="Latein lernen">
          <Link className={latin.topic} href="/mobin/fach/latein/probe-ka"><span><strong>Probe-KA · 24. November</strong><small>Wortschatz, Endungen und Römisches Reich · 2 Prüfungen direkt starten</small></span><span aria-hidden="true">→</span></Link>
        <Link className={latin.topic} href="/mobin/fach/latein/endungen">
          <span><strong>Endungen</strong><small>Präsens, esse und Akkusativ</small></span>
          <span className={latin.arrow} aria-hidden="true">→</span>
        </Link>
        </nav>
      </main>
    )
  }
  if (fach === 'franzoesisch') return <LanguageHome language={title} />
  return <PlaceholderPage title={title} />
}
