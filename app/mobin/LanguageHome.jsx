'use client'
import Link from 'next/link'
import { useState } from 'react'
import SubjectHeader from './SubjectHeader'
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

const themes = {
  Englisch: { tone: 'english', mark: 'Hello' },
  Latein: { tone: 'latin', mark: 'Salve' },
  Spanisch: { tone: 'spanish', flag: '/mobin/flag-es.svg' },
  Französisch: { tone: 'french', mark: 'Bonjour' },
  Persisch: { tone: 'persian', mark: 'فارسی', rtl: true },
}

export default function LanguageHome({ language, school = false }) {
  const tests = useSchoolTests(language)
  const [panel, setPanel] = useState('practice')
  const theme = themes[language]
  return <main className={styles.shell}><div className={styles.subjectWrap} data-subject={theme.tone}>
    <SubjectHeader title={language} mark={theme.mark} flag={theme.flag} rtl={theme.rtl} />
    <div className={styles.subjectActions} aria-label="Übungsarten">
      <button className={styles.subjectAction} aria-pressed={panel === 'practice'} onClick={() => setPanel('practice')}>Aufgaben üben<span aria-hidden="true">›</span></button>
      <button className={styles.subjectAction} aria-pressed={panel === 'cards'} onClick={() => setPanel('cards')}>Karteikarten<span aria-hidden="true">›</span></button>
      {school && <button className={styles.subjectAction} aria-pressed={panel === 'tests'} onClick={() => setPanel('tests')}>Tests<span aria-hidden="true">›</span></button>}
    </div>
    {school && <div hidden={panel !== 'tests'}>
      <SchoolTests state={tests} vocabulary />
      {language === 'Englisch' && <section className={styles.panel}>
        <h2>Vokabeltest · Unit 2 London</h2>
        <Link className={styles.back} href="/mobin/english/vokabeltest/11-november">Vorhandenen Test öffnen →</Link>
      </section>}
    </div>}
    <div hidden={panel === 'tests'}>
      <WordPractice language={language} starter={starters[language]} activity={panel === 'cards' ? 'cards' : 'test'} />
    </div>
  </div></main>
}
