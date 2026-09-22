import Link from 'next/link'
import styles from './page.module.css'

export const metadata = {
  title: 'Kaiser Score iOS Privacy Policy | RadYar',
  description: 'How the Kaiser Score iOS app handles your data.',
  alternates: { canonical: '/kaiser-score/privacy' },
}

const contact = 'Dr.hamedzia@outlook.de'

export default function KaiserScorePrivacyPage() {
  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <Link className={styles.brand} href="/kaiser-score" aria-label="Kaiser Score home">
            <span className={styles.brandMark} aria-hidden="true">K</span>
            <span>KAISER SCORE</span>
          </Link>
          <Link className={styles.backLink} href="/kaiser-score">← Kaiser Score</Link>
        </header>

        <div className={styles.intro}>
          <p className={styles.eyebrow}>RadYar · iOS app</p>
          <h1>Privacy Policy</h1>
          <p className={styles.lead}>The Kaiser Score app calculates assessments on your device. RadYar does not collect your entered imaging findings, ADC values or report text.</p>
          <p className={styles.updated}>Last updated: 22 September 2026</p>
        </div>

        <article className={styles.document} lang="en">
          <section>
            <h2>Data handled by the app</h2>
            <p>You can enter breast MRI features and an optional ADC value to calculate a Kaiser Score, display its published BI-RADS mapping and create a summary. The app processes these entries on your device. It does not send them to RadYar or store them on a server. The app does not require an account and does not include advertising or analytics services.</p>
          </section>
          <section>
            <h2>Clipboard and external links</h2>
            <p>If you tap Copy Summary, the summary is placed on your device’s clipboard. You control where it is pasted. Scientific reference links open external websites in your browser, where the destination site’s privacy practices apply. The contact link opens your email app; no message is sent unless you choose to send it.</p>
          </section>
          <section>
            <h2>Contact</h2>
            <p>For questions about this policy or the Kaiser Score app, email <a href={`mailto:${contact}`}>{contact}</a>.</p>
          </section>
        </article>

        <article className={styles.document} lang="de">
          <div className={styles.languageHeading}>
            <p className={styles.eyebrow}>Deutsche Fassung</p>
            <h2>Datenschutzerklärung</h2>
            <p className={styles.updated}>Stand: 22. September 2026</p>
          </div>
          <section>
            <h3>Datenverarbeitung in der App</h3>
            <p>Sie können Mamma-MRT-Merkmale und optional einen ADC-Wert eingeben, um den Kaiser Score zu berechnen, die publizierte BI-RADS-Zuordnung anzuzeigen und eine Zusammenfassung zu erstellen. Die App verarbeitet diese Eingaben auf Ihrem Gerät. Sie übermittelt sie nicht an RadYar und speichert sie nicht auf einem Server. Ein Benutzerkonto ist nicht erforderlich. Die App enthält weder Werbung noch Analysedienste.</p>
          </section>
          <section>
            <h3>Zwischenablage und externe Links</h3>
            <p>Wenn Sie die Zusammenfassung kopieren, wird sie in die Zwischenablage Ihres Geräts geschrieben. Sie entscheiden, wo Sie sie einfügen. Links zu wissenschaftlichen Quellen öffnen externe Websites in Ihrem Browser; dort gelten die Datenschutzhinweise der jeweiligen Website. Der Kontaktlink öffnet Ihre E-Mail-App. Eine Nachricht wird nur gesendet, wenn Sie dies selbst veranlassen.</p>
          </section>
          <section>
            <h3>Kontakt</h3>
            <p>Bei Fragen zu dieser Erklärung oder zur Kaiser-Score-App schreiben Sie an <a href={`mailto:${contact}`}>{contact}</a>.</p>
          </section>
        </article>

        <footer className={styles.footer}>
          <span>© {new Date().getFullYear()} RadYar</span>
          <Link href="/kaiser-score">Back to Kaiser Score</Link>
        </footer>
      </div>
    </main>
  )
}
