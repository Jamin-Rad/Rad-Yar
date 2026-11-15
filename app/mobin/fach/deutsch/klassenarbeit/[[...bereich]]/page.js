import Link from 'next/link'
import { notFound } from 'next/navigation'
import DeutschTraining from '../../DeutschTraining'
import styles from '../../deutsch.module.css'
import { stations } from '../../grammar'

const base = '/mobin/fach/deutsch/klassenarbeit'
const areas = {
  diktat: { title: 'Minidiktat', detail: 'Vier Wortlisten und Rechtschreibung im Satz' },
  grammatik: { title: 'Grammatik', detail: 'Fünf Stationen zu Wortarten und Zeitformen' },
  geschichte: { title: 'Geschichte schreiben' },
}

export const metadata = { title: 'Klassenarbeit Deutsch · Mobin' }

export default async function KlassenarbeitPage({ params }) {
  const { bereich = [] } = await params
  const [area, mode, stationId] = bereich
  const station = stations.find(item => item.id === stationId)
  if (bereich.length > 3 || (area && !Object.hasOwn(areas, area))
    || (mode && (area === 'geschichte' || !['ueben', 'test'].includes(mode)))
    || (stationId && (area !== 'grammatik' || !station))) notFound()
  return (
    <main className={styles.shell} lang="de">
      <div className={styles.frame}>
        <Link className={styles.back} href={station ? base + '/' + area + '/' + mode : mode ? base + '/' + area : area ? base : '/mobin/fach/deutsch'}>
          ← {station ? (mode === 'test' ? 'Grammatiktests' : 'Grammatikstationen') : mode ? areas[area].title : area ? 'Klassenarbeit' : 'Deutsch'}
        </Link>
        <header className={styles.heading}>
          <h1>{station ? station.name : area ? areas[area].title : 'Klassenarbeit'}</h1>
          {area !== 'geschichte' && <p>{mode ? (mode === 'ueben' ? 'Üben' : 'Test') : area ? areas[area].detail : 'Deutsch · 20. November'}</p>}
        </header>
        {!area ? (
          <nav className={styles.tiles} aria-label="Prüfungsbereiche">
            {Object.entries(areas).map(([id, { title, detail }]) =>
              <Link className={styles.tile} data-tone={id} href={base + '/' + id} key={id}>
                <span className={styles.art} aria-hidden="true" />
                <strong>{title}</strong>{detail && <small>{detail}</small>}<span className={styles.tileArrow} aria-hidden="true">→</span>
              </Link>)}
          </nav>
        ) : area === 'geschichte' ? null : !mode ? (
          <nav className={styles.tiles} aria-label="Modus wählen">
            <Link className={styles.tile} href={base + '/' + area + '/ueben'}><strong>Üben</strong>
              <small>Mit direkter Rückmeldung</small><span className={styles.tileArrow} aria-hidden="true">→</span>
            </Link>
            <Link className={styles.tile} data-tone="geschichte" href={base + '/' + area + '/test'}><strong>Test</strong>
              <small>{area === 'grammatik' ? 'Fünf Tests mit je zehn neuen Aufgaben' : 'Neue Lückensätze · Lösungen nach der Abgabe'}</small><span className={styles.tileArrow} aria-hidden="true">→</span>
            </Link>
          </nav>
        ) : <DeutschTraining key={bereich.join('/')} area={area} isTest={mode === 'test'} stationId={stationId} />}
      </div>
    </main>
  )
}
