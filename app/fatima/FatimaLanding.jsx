import Image from 'next/image'
import Link from 'next/link'
import styles from './page.module.css'

const destinations = [
  { title: 'MHBA', text: 'Dein Studium, in deinem Tempo.', href: '/fatima/mhba', icon: 'book' },
  { title: 'Deutschlernen', text: 'Mit jedem Wort ein Stück weiter.', href: '/fatima/deutsch', icon: 'language' },
  { title: 'Kalender', text: 'Deine Termine und kleinen Pläne.', href: '/fatima/todo', icon: 'calendar' },
  { title: 'Gesundheit', text: 'Für dein Wohlbefinden.', href: '/fatima/gesundheit', icon: 'heart' },
]

function Icon({ name, className }) {
  return (
    <svg className={className} width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {name === 'heart' && <path d="M16 27S3.5 19.1 3.5 10.8A6.7 6.7 0 0 1 16 7.6a6.7 6.7 0 0 1 12.5 3.2C28.5 19.1 16 27 16 27Z" />}
      {name === 'calendar' && <><rect x="4" y="7" width="24" height="21" rx="3" /><path d="M10 3v8M22 3v8M4 15h24M10 20h1M16 20h1M22 20h1M10 24h1M16 24h1" /></>}
      {name === 'check' && <><rect x="5" y="5" width="22" height="22" rx="4" /><path d="m10 16 4 4 8-9" /></>}
      {name === 'language' && <><path d="M3 8h17M11 4v4M7 8c1 7 5 11 11 14M17 8c-1 7-6 12-13 15M18 28l6-16 6 16M20 23h8" /></>}
      {name === 'book' && <><path d="M16 8c-4-3-8-3-13-1v20c5-2 9-2 13 1 4-3 8-3 13-1V7c-5-2-9-2-13 1ZM16 8v20" /></>}
      {name === 'arrow' && <path d="M5 16h21m-7-7 7 7-7 7" />}
    </svg>
  )
}

export default function FatimaLanding() {
  return (
    <main className={styles.shell} data-fatima-home lang="de" dir="ltr">
      <div className={styles.page}>
        <header className={styles.masthead}>
          <span className={styles.monogram} aria-hidden="true">F.</span>
          <span className={styles.dedication} lang="de">Nur für dich <Icon name="heart" /></span>
        </header>
        <div className={styles.composition}>
          <div className={styles.portrait} aria-hidden="true">
            <Image src="/fatima/roses-in-the-light.webp" alt="" fill priority sizes="(max-width: 700px) 38vw, 48vw" />
          </div>
          <div className={styles.letter} lang="de">
            <section className={styles.greeting} aria-labelledby="fatima-title" lang="de">
              <h1 id="fatima-title" lang="de">Für dich,<em>Fatima.</em></h1>
              <p lang="de">Ein kleiner Ort für alles, was dir guttut.</p>
            </section>
            <nav className={styles.destinations} aria-label="Fatimas Bereiche" lang="de">
              {destinations.map(destination => (
                <Link className={styles.destination} href={destination.href} key={destination.href} lang="de">
                  <Icon name={destination.icon} className={styles.destinationIcon} />
                  <span className={styles.destinationText} lang="de">
                    <span className={styles.destinationTitle} lang="de">{destination.title}</span>
                    <span className={styles.destinationDescription} lang="de">{destination.text}</span>
                  </span>
                  <Icon name="arrow" className={styles.arrow} />
                </Link>
              ))}
            </nav>
            <footer className={styles.loveNote}>
              <div className={styles.flourish} aria-hidden="true"><span /><Icon name="heart" /><span /></div>
              <p lang="fa" dir="rtl">با عشق، برای تو</p>
            </footer>
          </div>
        </div>
      </div>
    </main>
  )
}
