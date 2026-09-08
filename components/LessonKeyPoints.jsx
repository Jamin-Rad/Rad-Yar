import styles from './LessonKeyPoints.module.css'

const paths = [
  'M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z',
  'M12 3 20 7v5c0 5-4 8-8 9-4-1-8-4-8-9V7zM8 12l3 3 5-6',
  'M4 6h16M4 12h16M4 18h16M8 3v6M16 9v6M10 15v6',
]

export default function LessonKeyPoints({ points }) {
  return <ul className={styles.points}>
    {points.map(([title, text], index) => <li key={title}>
      <span className={styles.icon} aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d={paths[index]} /></svg></span>
      <div><strong>{title}</strong><p>{text}</p></div>
    </li>)}
  </ul>
}
