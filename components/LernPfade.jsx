import styles from './LernPfade.module.css'

const pillars = [
  {
    id: 'c1',
    icon: '📖',
    num: '01 — Lernen',
    title: 'Lernen',
    desc: 'Strukturierte Lernmodule nach Organsystem und Modalität – mit klaren Erklärungen, Schemata und Merkhilfen.',
    topics: ['Anatomie', 'Pathologie', 'Befundlehre', 'Normalbefunde', 'Modalitäten'],
  },
  {
    id: 'c2',
    icon: '🎯',
    num: '02 — Üben',
    title: 'Fallbeispiele & MCQs',
    desc: 'Interaktive Fälle mit echten Bildern und Multiple-Choice-Fragen – zum Vertiefen und Überprüfen des Gelernten.',
    topics: ['Fallbeispiele', 'MCQs', 'Differenzialdiagnosen', 'Bildanalyse'],
  },
  {
    id: 'c3',
    icon: '🏅',
    num: '03 — Prüfungsvorbereitung',
    title: 'Prüfungsvorbereitung',
    desc: 'Gezieltes Training für Facharztprüfung und Boards – mit Prüfungsfragen, Zeitlimits und detaillierter Fehleranalyse.',
    topics: ['Prüfungsfragen', 'Schwerpunktthemen', 'Timed Tests', 'Fehleranalyse'],
  },
]

export default function LernPfade() {
  return (
    <section className={styles.section} id="lernpfade">
      <div className="sLabel">Lernpfade</div>
      <h2 className="sTitle">Drei Schritte zum<br />radiologischen Experten</h2>
      <p className="sSub">Vom ersten Konzept bis zur bestandenen Prüfung – RadYar führt dich durch jeden Schritt.</p>

      <div className={styles.grid}>
        {pillars.map((p, i) => (
          <div
            key={p.id}
            className={`${styles.card} ${styles[p.id]}`}
            style={{ animationDelay: `${i * 0.12}s` }}
          >
            <div className={styles.icon}>{p.icon}</div>
            <div className={styles.num}>{p.num}</div>
            <h3 className={styles.title}>{p.title}</h3>
            <p className={styles.desc}>{p.desc}</p>
            <div className={styles.topics}>
              {p.topics.map((t) => (
                <span key={t} className={styles.chip}>{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
