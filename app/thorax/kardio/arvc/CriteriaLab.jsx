'use client'

import { Note, TeachingTable } from './LessonVisuals'
import styles from './page.module.css'

export default function CriteriaOverview() {
  return <>
    <p className={styles.lead}>ACM wird aus mehreren Hinweisen diagnostiziert: MRT, EKG, Rhythmusstörungen, Familiengeschichte und gegebenenfalls Genetik. <strong>TFC und Padua sind zwei Regelwerke, die diese Hinweise zusammenführen.</strong></p>
    <TeachingTable caption="Die wichtigste Unterscheidung" headers={['Regelwerk', 'Die Grundidee']} rows={[
      ['TFC 2010 · Task Force Criteria', 'Für die klassische rechtsbetonte ARVC. Im MRT braucht es eine der geforderten regionalen RV-Bewegungsstörungen zusammen mit einer globalen RV-Vergrößerung oder verminderten Pumpfunktion nach definierten Grenzwerten. LGE ist hier kein Kriterium.'],
      ['Padua 2020', 'Erweitert die Beurteilung auf die linke Kammer und nimmt LGE als Zeichen einer Narbe hinzu. So lassen sich auch biventrikuläre und linksdominante Formen besser einordnen.'],
    ]}/>
    <Note title="Das reicht für den Überblick">TFC: vor allem RV und Funktion. Padua: zusätzlich LV und Narben. Beide Systeme benötigen das klinische Gesamtbild; das MRT allein stellt die Diagnose nicht.</Note>
    <h3 className={styles.subheading}>Drei häufige Denkfehler</h3>
    <ul className={styles.essentialList}>
      <li><strong>„Großer RV = ARVC.“</strong> Auch Training oder eine Druck- beziehungsweise Volumenbelastung können den RV vergrößern.</li>
      <li><strong>„LGE = ACM.“</strong> Auch andere Erkrankungen, etwa eine Myokarditis, können Narben verursachen.</li>
      <li><strong>„Kein LGE = keine ARVC.“</strong> Fehlendes LGE schließt die Erkrankung nicht aus.</li>
    </ul>
  </>
}
