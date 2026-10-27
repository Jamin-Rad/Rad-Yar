import Link from 'next/link'
import styles from './course.module.css'

function Icon({ kind = 'arrow', ...props }) {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    {kind === 'check' ? <path d="m5 12 4 4L19 6" /> : kind === 'random' ? <><rect x="3" y="3" width="18" height="18" rx="4" /><path d="M7 7h.01M12 12h.01M17 17h.01M17 7h.01M7 17h.01" strokeWidth="3" /></> : kind === 'retry' ? <><path d="M20 7v5h-5M4 17v-5h5" /><path d="M6 7a7 7 0 0 1 12-1l2 3M4 15l2 3a7 7 0 0 0 12-1" /></> : kind === 'cards' ? <><rect x="8" y="3" width="12" height="17" rx="2" /><path d="M5 6 3 7l2 14 11-1M12 7h4M12 10h4" /></> : <path d="M4 12h16m-6-6 6 6-6 6" />}
  </svg>
}

export default function CourseHome({ lessons, lessonStatus = {}, loading, lessonBase, homeHref, homeLabel, canImport, dark, onTheme, onImport, wrongCount, onPractice, onRead, cardCount, dueCount, onFlashcards }) {
  const next = lessons.find(lesson => !lessonStatus[lesson.id]?.readAt) || lessons[0]
  return <div className={`${styles.page} ${dark ? styles.dark : ''}`}>
    <header className={styles.header}>
      <h1>Deutsch im Alltag<span>.</span></h1>
      <div className={styles.tools}>
        <Link href={homeHref}>← {homeLabel}</Link>
        {canImport && <button type="button" onClick={onImport}>Importieren</button>}
        <button type="button" className={styles.theme} aria-label="Farbschema wechseln" title={dark ? 'Helles Design' : 'Dunkles Design'} onClick={onTheme}>{dark ? '☼' : '☾'}</button>
      </div>
    </header>
    <section className={styles.hero} aria-label="Weiterlernen">
      <div className={styles.heroCopy}>
        <h2>Ein Gespräch.<br />Ein Schritt weiter<span>.</span></h2>
        <p className={styles.nextLabel}>Deine nächste Lektion</p>
        <h3>{loading ? 'Dein Kurs wird geladen …' : next?.title || 'Dein nächstes Gespräch wartet.'}</h3>
        {!loading && next && <Link className={styles.primary} href={`${lessonBase}/${next.id}`}>Lektion öffnen <Icon /></Link>}
      </div>
      <img className={styles.illustration} src="/andarun/deutsch/neighborhood.png" alt="Zwei Menschen unterhalten sich vor einem Geschäft im Viertel." width="1536" height="1024" />
    </section>
    <div className={styles.lower}>
      <section className={styles.lessons} aria-labelledby="course-lessons-title" aria-busy={loading}>
        <div className={styles.sectionHeading}><h2 id="course-lessons-title">Deine Lektionen</h2><p>{loading ? 'Wird geladen …' : `${lessons.length} ${lessons.length === 1 ? 'Lektion' : 'Lektionen'}`}</p></div>
        <ol className={styles.list}>
          {lessons.map((lesson, index) => {
            const read = !!lessonStatus[lesson.id]?.readAt
            return <li key={lesson.id}>
              <Link href={`${lessonBase}/${lesson.id}`} className={styles.lessonLink}><span className={styles.number} aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><h3>{lesson.title}</h3></Link>
              <button className={`${styles.readState} ${read ? styles.isRead : ''}`} type="button" aria-pressed={read} aria-label={`${lesson.title}: ${read ? 'Als ungelesen markieren' : 'Als gelesen markieren'}`} onClick={() => onRead(lesson.id)}><span>{read ? 'Gelesen' : 'Noch nicht gelesen'}</span><i>{read && <Icon kind="check" width="17" height="17" />}</i></button>
            </li>
          })}
        </ol>
      </section>
      <aside className={styles.practice} aria-labelledby="course-practice-title">
        <h2 id="course-practice-title">Einfach üben</h2>
        <button type="button" className={styles.random} onClick={() => onPractice('random')} disabled={loading || !lessons.length}><Icon kind="random" /><span>Zufallstest</span><Icon /></button>
        <p className={styles.hint}>20 Fragen aus deinen Lektionen</p>
        <button type="button" className={styles.mistakes} onClick={() => onPractice('mistakes')} disabled={!wrongCount || loading}><Icon kind="retry" /><span>Fehler wiederholen</span><Icon /></button>
        <p className={styles.hint}>{wrongCount ? `${wrongCount} ${wrongCount === 1 ? 'Frage' : 'Fragen'} noch einmal üben` : 'Noch keine Fehler'}</p>
        <div className={styles.cardArea}><button type="button" className={styles.cards} onClick={onFlashcards}><Icon kind="cards" /><span>Karten üben</span><Icon /></button><p className={styles.hint}>{cardCount} {cardCount === 1 ? 'Karte' : 'Karten'} · {dueCount} fällig</p></div>
      </aside>
    </div>
  </div>
}
