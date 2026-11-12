'use client'
import Link from 'next/link'
import WordPractice from './WordPractice'
import SchoolTests, { useSchoolTests } from './SchoolTests'
import styles from './learning.module.css'

const starters = {
  Englisch: [['Hallo', 'Hello'], ['Danke', 'Thank you'], ['Ich verstehe', 'I understand'], ['die Schule', 'the school'], ['Ich habe gestern gelernt', 'I studied yesterday', '2'], ['Könntest du mir helfen?', 'Could you help me?', '2']],
  Latein: [['Hallo!', 'Salve!'], ['Freund', 'amicus'], ['lesen', 'legere'], ['kommen', 'venire'], ['Der Freund liest ein Buch', 'Amicus librum legit', '2']],
  Spanisch: [['Hallo', 'Hola'], ['Guten Morgen', 'Buenos días'], ['Danke', 'Gracias'], ['Bitte', 'Por favor'], ['Wie geht es dir?', '¿Cómo estás?'], ['Bis später', 'Hasta luego'], ['Ich möchte Wasser', 'Quisiera agua', '2']],
  Französisch: [['Hallo', 'Bonjour'], ['Danke', 'Merci'], ['Bitte', 'S’il vous plaît'], ['Auf Wiedersehen', 'Au revoir'], ['Ich möchte Wasser', 'Je voudrais de l’eau', '2']],
  Persisch: [['Hallo', 'سلام'], ['Danke', 'ممنون'], ['Guten Morgen', 'صبح بخیر'], ['Auf Wiedersehen', 'خداحافظ'], ['Ich möchte Wasser', 'من آب می‌خواهم', '2']],
}

export default function LanguageHome({ language, school = false }) {
  const tests = useSchoolTests(language)
  return <main className={styles.shell}><div className={styles.wrap}>
    <Link className={styles.back} href="/mobin?bereich=1">← Mobin</Link>
    <header className={styles.learningHero}><h1>{language}</h1><p>Vokabeln üben und eigene Karteikarten sammeln.</p></header>
    {school && <SchoolTests state={tests} vocabulary />}
    {language === 'Englisch' && <section className={styles.panel}>
      <h2>Vokabeltest · Unit 2 London</h2>
      <Link className={styles.back} href="/mobin/english/vokabeltest/11-november">Vorhandenen Test öffnen →</Link>
    </section>}
    <WordPractice language={language} starter={starters[language]} />
  </div></main>
}
