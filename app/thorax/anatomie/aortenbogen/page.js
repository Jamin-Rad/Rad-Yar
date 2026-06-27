import Image from 'next/image'
import Link from 'next/link'
import styles from './page.module.css'

export const metadata = {
  title: 'Aortenbogen | RadYar',
  description: 'Normale Anatomie und wichtige Normvarianten des Aortenbogens mit schematischen Bildern.',
}

const normalRows = [
  ['Lage', 'Linksseitiger Aortenbogen im oberen Mediastinum, Übergang von Aorta ascendens zu Aorta descendens.', 'Im axialen CT liegt die Aorta descendens typischerweise links paravertebral.'],
  ['Abgänge', 'Von proximal nach distal: Truncus brachiocephalicus, A. carotis communis links, A. subclavia links.', 'Der Truncus brachiocephalicus teilt sich in rechte A. carotis communis und rechte A. subclavia.'],
  ['Verlauf', 'Der Bogen zieht über den linken Hauptbronchus und links der Trachea nach dorsal.', 'Wichtige Beziehung zu Trachea, Oesophagus und Pulmonalarterie.'],
  ['Befundung', 'Kaliber, Wand, Abgangsanatomie und Seitenlage beschreiben.', 'Bei CTA auch Ostien, Stenosen, Plaques, Aneurysma oder Dissektion prüfen.'],
]

const variantRows = [
  ['Gemeinsamer Ursprung von Truncus brachiocephalicus und linker Karotis', 'Häufige Normvariante, oft ungenau als boviner Aortenbogen bezeichnet.', 'Für Katheterangiographie, OP-Planung und Stentgrafts relevant.'],
  ['Linke A. vertebralis direkt aus dem Aortenbogen', 'Zusätzlicher Abgang meist zwischen linker A. carotis communis und linker A. subclavia.', 'Nicht mit pathologischer Kollaterale verwechseln; Verlauf bis zum Foramen transversarium verfolgen.'],
  ['Aberrante rechte A. subclavia', 'Letzter Abgang distal der linken Subclavia, meist retrooesophagealer Verlauf nach rechts.', 'Kann Dysphagia lusoria verursachen; auf Kommerell-Divertikel achten.'],
  ['Rechter Aortenbogen', 'Aortenbogen und Aorta descendens rechtsseitig; verschiedene Verzweigungsmuster möglich.', 'Bei Symptomen oder OP-Planung Beziehung zu Trachea/Oesophagus und Spiegelbildanatomie beschreiben.'],
  ['Doppelter Aortenbogen', 'Persistierende rechte und linke Bogenanteile bilden einen vaskulären Ring.', 'Keine bloße Zufallsvariante, wenn Trachea oder Oesophagus komprimiert werden.'],
]

const takeHome = [
  ['1', 'Normal erkennen', 'Linksseitiger Bogen mit drei klassischen Abgängen: Truncus brachiocephalicus, linke Karotis, linke Subclavia.'],
  ['2', 'Varianten benennen', 'Die häufigsten Varianten betreffen gemeinsame Ostien, zusätzliche Abgänge oder eine andere Seitenlage des Bogens.'],
  ['3', 'Relevanz prüfen', 'Wichtig sind Kompression von Trachea/Oesophagus, Kommerell-Divertikel, Aneurysma, Dissektion und Interventionsplanung.'],
]

export default function AortenbogenPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/lernen/thorax">Anatomie</Link>
          <span>/</span>
          <span>Aortenbogen</span>
        </nav>

        <div className={styles.hero}>
          <div className={styles.heroText}>
            <span className={styles.badge}>Thoraxanatomie</span>
            <h1>Aortenbogen</h1>
            <p>
              Normale Anatomie des Aortenbogens und die wichtigsten Normvarianten in der Schnittbildgebung.
              Entscheidend sind Seitenlage, Abgangsmuster und die Beziehung zu Trachea und Oesophagus.
            </p>
          </div>
          <aside className={styles.heroPanel} aria-label="Kurzüberblick">
            <div className={styles.stat}>
              <strong>3</strong>
              <span>klassische Abgänge</span>
              <small>Truncus brachiocephalicus, linke Karotis, linke Subclavia</small>
            </div>
            <div className={styles.stat}>
              <strong>links</strong>
              <span>typische Seitenlage</span>
              <small>Aorta descendens links paravertebral</small>
            </div>
            <div className={styles.stat}>
              <strong>CTA</strong>
              <span>beste Übersicht</span>
              <small>Abgänge, Ostien, Wand und vaskuläre Ringe</small>
            </div>
          </aside>
        </div>
      </header>

      <div className={styles.layout}>
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Was ist normal?</h2>
          </div>
          <div className={styles.sectionBody}>
            <div className={styles.grid2}>
              <div>
                <p className={styles.lead}>
                  Der normale Aortenbogen ist linksseitig. Er beginnt nach der Aorta ascendens, zieht im oberen
                  Mediastinum bogenförmig nach dorsal links und geht in die Aorta descendens über. Das klassische
                  Muster hat drei supra-aortale Abgänge.
                </p>
                <div className={styles.tableWrap}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>Merkmal</th>
                        <th>Normalbefund</th>
                        <th>Radiologischer Hinweis</th>
                      </tr>
                    </thead>
                    <tbody>
                      {normalRows.map(([feature, finding, note]) => (
                        <tr key={feature}>
                          <td>{feature}</td>
                          <td>{finding}</td>
                          <td>{note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <figure className={styles.figure}>
                <Image
                  src="/aortenbogen/normal-aortenbogen.svg"
                  alt="Schema eines normalen linksseitigen Aortenbogens"
                  width={960}
                  height={560}
                  priority
                />
                <figcaption>
                  <strong>Schema: normaler Aortenbogen</strong>
                  Linksseitiger Bogen mit den drei klassischen Abgängen von proximal nach distal.
                </figcaption>
              </figure>
            </div>

            <div className={styles.cards}>
              <article className={styles.miniCard}>
                <h3>Truncus brachiocephalicus</h3>
                <p>Erster Abgang; teilt sich in rechte A. carotis communis und rechte A. subclavia.</p>
              </article>
              <article className={styles.miniCard}>
                <h3>Linke A. carotis communis</h3>
                <p>Zweiter Abgang; steigt links der Trachea nach kranial.</p>
              </article>
              <article className={styles.miniCard}>
                <h3>Linke A. subclavia</h3>
                <p>Dritter Abgang; zieht nach links lateral zum Arm und gibt meist die linke Vertebralis ab.</p>
              </article>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Normvarianten</h2>
          </div>
          <div className={styles.sectionBody}>
            <p className={styles.lead}>
              Normvarianten des Aortenbogens sind häufig Zufallsbefunde. Sie werden relevant, wenn sie Symptome
              verursachen, eine Intervention erschweren oder mit Aneurysma, Kommerell-Divertikel beziehungsweise
              vaskulärem Ring einhergehen.
            </p>
            <figure className={styles.figure}>
              <Image
                src="/aortenbogen/aortenbogen-varianten.svg"
                alt="Schematische Übersicht häufiger Aortenbogenvarianten"
                width={1200}
                height={760}
              />
              <figcaption>
                <strong>Schema: wichtige Normvarianten</strong>
                Häufige Abgangsvarianten und Seitenlagevarianten, die im CT oder MRT gezielt beschrieben werden sollten.
              </figcaption>
            </figure>
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Variante</th>
                    <th>Typisches Bild</th>
                    <th>Warum wichtig?</th>
                  </tr>
                </thead>
                <tbody>
                  {variantRows.map(([variant, finding, relevance]) => (
                    <tr key={variant}>
                      <td>{variant}</td>
                      <td>{finding}</td>
                      <td>{relevance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className={styles.callout}>
              <strong>Merke</strong>
              <p>
                Eine Variante ist erst dann klinisch relevant, wenn sie einen Ring bildet, Trachea oder Oesophagus
                komprimiert, aneurysmatisch erweitert ist oder die Zugangs- und Stentplanung verändert.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Befundstrategie</h2>
          </div>
          <div className={styles.sectionBody}>
            <p className={styles.lead}>
              In der Routine reicht eine klare anatomische Beschreibung. Bei CTA-Fragestellungen sollte die
              Beschreibung operational sein: Wo liegt der Bogen, welche Gefäße gehen wo ab und gibt es einen
              relevanten Masseneffekt oder eine Wandpathologie?
            </p>
            <div className={styles.takeHome}>
              {takeHome.map(([number, title, text]) => (
                <article className={styles.takeHomeItem} key={number}>
                  <span>{number}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
