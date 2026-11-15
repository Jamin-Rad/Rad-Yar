import Link from 'next/link'
import { notFound } from 'next/navigation'
import DeutschTraining from '../../DeutschTraining'
import styles from '../../deutsch.module.css'

const base = '/mobin/fach/deutsch/klassenarbeit'
const areas = {
  diktat: { title: 'Minidiktat', detail: 'Vier Wortlisten hören und schreiben' },
  grammatik: { title: 'Grammatik', detail: 'Fünf Stationen zu Wortarten und Zeitformen' },
  geschichte: { title: 'Geschichte schreiben', detail: 'Schreibplan und Erzählung' },
}

export const metadata = { title: 'Klassenarbeit Deutsch · Mobin' }

export default async function KlassenarbeitPage({ params }) {
  const { bereich = [] } = await params
  const [area, mode] = bereich
  if (bereich.length > 2 || (area && !Object.hasOwn(areas, area)) || (mode && !['ueben', 'test'].includes(mode))) notFound()
  return (
    <main className={styles.shell} lang="de">
      <div className={styles.frame}>
        <Link className={styles.back} href={mode ? base + '/' + area : area ? base : '/mobin/fach/deutsch'}>
          ← {mode ? areas[area].title : area ? 'Klassenarbeit' : 'Deutsch'}
        </Link>
        <header className={styles.heading}>
          <h1>{area ? areas[area].title : 'Klassenarbeit'}</h1>
          <p>{mode ? (mode === 'ueben' ? 'Üben' : 'Test') : area ? areas[area].detail : 'Deutsch · 20. November'}</p>
        </header>
        {!area ? (
          <nav className={styles.tiles} aria-label="Prüfungsbereiche">
            {Object.entries(areas).map(([id, { title, detail }]) =>
              <Link className={styles.tile} data-tone={id} href={base + '/' + id} key={id}>
                <span className={styles.art} aria-hidden="true" />
                <strong>{title}</strong><small>{detail}</small><span className={styles.tileArrow} aria-hidden="true">→</span>
              </Link>)}
          </nav>
        ) : !mode ? (
          <nav className={styles.tiles} aria-label="Modus wählen">
            <Link className={styles.tile} href={base + '/' + area + '/ueben'}><strong>Üben</strong>
              <small>{area === 'geschichte' ? 'Mit Schreibhilfen planen und schreiben' : 'Mit direkter Rückmeldung'}</small><span className={styles.tileArrow} aria-hidden="true">→</span>
            </Link>
            <Link className={styles.tile} data-tone="geschichte" href={base + '/' + area + '/test'}><strong>Test</strong>
              <small>{area === 'geschichte' ? '15 Minuten planen, 45 Minuten schreiben' : 'Lösungen nach der Abgabe'}</small><span className={styles.tileArrow} aria-hidden="true">→</span>
            </Link>
          </nav>
        ) : <DeutschTraining key={area + mode} area={area} isTest={mode === 'test'} />}
      </div>
    </main>
  )
}
