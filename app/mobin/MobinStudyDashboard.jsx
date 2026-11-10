import styles from './study-dashboard.module.css'

const views = ['Tage', 'Wochen', 'Monate', 'Jahre']

export default function MobinStudyDashboard() {
  return (
    <section className={styles.calendarPlaceholder} aria-labelledby="mobin-calendar-title">
      <div className={styles.calendarPlaceholderTop}>
        <div className={styles.calendarHeading}>
          <span className={styles.calendarIcon} aria-hidden="true">
            <svg viewBox="0 0 48 48" fill="none">
              <rect x="7" y="10" width="34" height="31" rx="5" stroke="currentColor" strokeWidth="2.5" />
              <path d="M7 19h34M16 6v8M32 6v8M16 27h6m-6 7h6m5-7h6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </span>
          <div>
            <h2 id="mobin-calendar-title">Kalender</h2>
            <p>Dein Kalender kommt bald</p>
          </div>
        </div>
        <div className={styles.calendarViews} aria-label="Kalenderansicht">
          {views.map((view) => <span key={view}>{view}</span>)}
        </div>
      </div>
      <div className={styles.calendarPlaceholderBody}>
        <span className={styles.calendarPlaceholderDot} aria-hidden="true" />
        <p>Hier kannst du bald deinen Schulalltag planen.</p>
      </div>
    </section>
  )
}
