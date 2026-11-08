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
          <p className={styles.lead}>The Node-RADS app provides an interactive educational reference to published classification criteria. RadYar does not collect your selected criteria or reference results.</p>
          <p className={styles.updated}>Last updated: 8 November 2026</p>
        </div>

        <article className={styles.document} lang="en">
          <section>
            <h2>Data handled by the app</h2>
            <p>You can explore the published Node-RADS criteria using example lymph node measurements and imaging features. The app processes these selections on your device and displays the corresponding reference category. It does not send the selections to RadYar or store them on a server. The app does not request patient-identifying information, require an account, or include advertising or analytics services.</p>
          </section>
          <section>
            <h2>External links</h2>
            <p>Scientific reference links open external websites in your browser, where the destination site’s privacy practices apply. The contact link opens your email app; no message is sent unless you choose to send it.</p>
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
            <p className={styles.updated}>Stand: 8. November 2026</p>
          </div>
          <section>
            <h3>Datenverarbeitung in der App</h3>
            <p>Sie können die veröffentlichten Node-RADS-Kriterien anhand beispielhafter Lymphknotenmaße und Bildmerkmale erkunden. Die App verarbeitet diese Auswahl auf Ihrem Gerät und zeigt die zugehörige Referenzkategorie an. Sie übermittelt die Auswahl nicht an RadYar und speichert sie nicht auf einem Server. Die App fragt keine patientenidentifizierenden Daten ab. Ein Benutzerkonto ist nicht erforderlich. Die App enthält weder Werbung noch Analysedienste.</p>
          </section>
          <section>
            <h3>Externe Links</h3>
            <p>Links zu wissenschaftlichen Quellen öffnen externe Websites in Ihrem Browser; dort gelten die Datenschutzhinweise der jeweiligen Website. Der Kontaktlink öffnet Ihre E-Mail-App. Eine Nachricht wird nur gesendet, wenn Sie dies selbst veranlassen.</p>
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
