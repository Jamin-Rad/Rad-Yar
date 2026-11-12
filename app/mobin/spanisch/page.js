import Link from 'next/link'
import WordPractice from '../WordPractice'
import styles from '../learning.module.css'

export const metadata = { title: 'Spanisch · Mobin' }
const basics = [
  ['Hallo', 'Hola'], ['Guten Morgen', 'Buenos días'], ['Danke', 'Gracias'],
  ['Bitte', 'Por favor'], ['Wie geht es dir?', '¿Cómo estás?'], ['Bis später', 'Hasta luego'],
]

export default function SpanischPage() {
  return <main className={styles.shell}><div className={styles.wrap}>
    <Link className={styles.back} href="/mobin?bereich=1">← Mobin</Link>
    <h1>Spanisch</h1>
    <p>Beginne mit Begrüßungen und ergänze eigene Wörter.</p>
    <WordPractice language="Spanisch" starter={basics} />
  </div></main>
}
