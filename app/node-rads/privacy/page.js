import Link from 'next/link'
import styles from './page.module.css'

export const metadata = {
  title: 'Node-RADS iOS Privacy Policy | RadYar',
  description: 'How the Node-RADS iOS app handles your data.',
  alternates: { canonical: '/node-rads/privacy' },
}

const contact = 'Dr.hamedzia@outlook.de'

export default function NodeRadsPrivacyPage() {
  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <Link className={styles.brand} href="/node-rads" aria-label="Node-RADS home">
            <span className={styles.brandMark} aria-hidden="true">N</span>
            <span>NODE–RADS</span>
          </Link>
          <Link className={styles.backLink} href="/node-rads">← Node-RADS</Link>
        </header>

        <div className={styles.intro}>
          <p className={styles.eyebrow}>RadYar · iOS app</p>
          <h1>Privacy Policy</h1>
          <p className={styles.lead}>The Node-RADS app calculates assessments on your device. RadYar does not collect your entered findings or reports.</p>
          <p className={styles.updated}>Last updated: 22 September 2026</p>
        </div>

        <article className={styles.document} lang="en">
          <section>
            <h2>Data handled by the app</h2>
            <p>You can enter lymph node measurements and imaging features to calculate a Node-RADS assessment and create a report. The app processes these entries on your device. It does not send them to RadYar or store them on a server. The app does not require an account and does not include advertising or analytics services.</p>
          </section>
          <section>
            <h2>Clipboard and external links</h2>
            <p>If you tap Copy Report, the report is placed on your device’s clipboard. You control where it is pasted. Scientific reference links open external websites in your browser, where the destination site’s privacy practices apply. The contact link opens your email app; no message is sent unless you choose to send it.</p>
          </section>
          <section>
            <h2>Contact</h2>
            <p>For questions about this policy or the Node-RADS app, email <a href={`mailto:${contact}`}>{contact}</a>.</p>
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
            <p>Sie können Lymphknotenmaße und Bildmerkmale eingeben, um eine Node-RADS-Einstufung und einen Befundtext zu erstellen. Die App verarbeitet diese Eingaben auf Ihrem Gerät. Sie übermittelt sie nicht an RadYar und speichert sie nicht auf einem Server. Ein Benutzerkonto ist nicht erforderlich. Die App enthält weder Werbung noch Analysedienste.</p>
          </section>
          <section>
            <h3>Zwischenablage und externe Links</h3>
            <p>Wenn Sie den Befund kopieren, wird er in die Zwischenablage Ihres Geräts geschrieben. Sie entscheiden, wo Sie ihn einfügen. Links zu wissenschaftlichen Quellen öffnen externe Websites in Ihrem Browser; dort gelten die Datenschutzhinweise der jeweiligen Website. Der Kontaktlink öffnet Ihre E-Mail-App. Eine Nachricht wird nur gesendet, wenn Sie dies selbst veranlassen.</p>
          </section>
          <section>
            <h3>Kontakt</h3>
            <p>Bei Fragen zu dieser Erklärung oder zur Node-RADS-App schreiben Sie an <a href={`mailto:${contact}`}>{contact}</a>.</p>
          </section>
        </article>

        <footer className={styles.footer}>
          <span>© {new Date().getFullYear()} RadYar</span>
          <Link href="/node-rads">Back to Node-RADS</Link>
        </footer>
      </div>
    </main>
  )
}
