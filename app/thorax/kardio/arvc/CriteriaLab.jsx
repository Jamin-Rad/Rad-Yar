'use client'

import { useLanguage } from '@/providers/LanguageProvider'
import { localizeArvcTree } from './lessonTranslations'

import { useState } from 'react'
import LessonCaseFile from '@/components/LessonCaseFile'
import { TfcRuleDiagram } from './AcmIllustrations'
import { getAcmCaseData } from './CaseAtlas'
import { Note, Tabs, TeachingTable } from './LessonVisuals'
import styles from './page.module.css'

const CRITERIA_TABS = [
  { id: 'tfc', label: 'TFC 2010' },
  { id: 'padua', label: 'Padua 2020' },
]

function TfcExplanation() {
  const { lang: _arvcLang } = useLanguage()

  return localizeArvcTree(<>
    <h4 className={styles.mrtTopic}>MRT-Kriterium</h4>
    <TfcRuleDiagram/>
    <Note title="Der MRT-Baustein: regional UND global">Eine regionale RV-Akinesie, Dyskinesie oder dyssynchrone Kontraktion muss mit einem erhöhten RVEDVi oder einer verminderten RVEF zusammenkommen. Ein großer RV allein genügt nicht; eine isolierte Hypokinesie auch nicht.</Note>
    <details className={styles.mrtDetails}>
      <summary>MRT-Grenzwerte anzeigen</summary>
      <div className={styles.thresholds}><TeachingTable caption="TFC 2010 · die MRT-Grenzwerte bei Erwachsenen" headers={['Messgröße', 'Major', 'Minor']} rows={[
        ['RVEDVi · Männer', '≥ 110 ml/m²', '≥ 100 bis < 110 ml/m²'],
        ['RVEDVi · Frauen', '≥ 100 ml/m²', '≥ 90 bis < 100 ml/m²'],
        ['RVEF · beide', '≤ 40 %', '> 40 bis ≤ 45 %'],
      ]}/></div>
      <p className={styles.caption}>Nur zusammen mit der geforderten regionalen Störung. RVEDVi = enddiastolisches RV-Volumen / Körperoberfläche; EF = ausgeworfener Volumenanteil. Bei Kindern und Sportlern die Referenzen gesondert prüfen.</p>
      <p className={styles.bodyText}><strong>Nicht doppelt zählen:</strong> Erhöhtes RV-Volumen und reduzierte RVEF sind zwei Wege zum selben MRT-Kriterium dieser Kategorie. Für die Gesamtdiagnose zählen weitere Kriterien aus anderen Kategorien.</p>
    </details>

    <h4 className={styles.mrtTopic}>Gesicherte ARVC nach TFC 2010</h4>
    <ul className={styles.criteriaCombinations}>
      <li>2 Major</li>
      <li>1 Major + 2 Minor</li>
      <li>4 Minor</li>
    </ul>
    <p>Die Kriterien müssen aus unterschiedlichen Kategorien stammen.</p>
    <Note title="Die Grenze dieses Systems">LGE und spezifische LV-Kriterien sind in den TFC 2010 nicht enthalten. Deshalb kann eine linksdominante Erkrankung mit diesem System übersehen werden.</Note>
  </>, _arvcLang)
}

function PaduaExplanation() {
  const { lang: _arvcLang } = useLanguage()

  return localizeArvcTree(<>
    <h4 className={styles.mrtTopic}>Was ergänzt Padua?</h4>
    <TeachingTable caption="Die wichtigsten Ergänzungen für das MRT" headers={['Baustein', 'Worauf achten?']} rows={[
      ['Rechte Kammer', 'Regionale Bewegungsstörung, globale Größe und Funktion beurteilen. Auch ein sicher nachgewiesenes transmural streifenförmiges RV-LGE kann ein strukturelles Kriterium sein.'],
      ['Linke Kammer', 'Pumpfunktion und regionale Bewegung prüfen; zusätzlich nach subepikardialem oder intramuralem Streifen-LGE suchen.'],
      ['LGE absichern', 'Ein passendes Narbenmuster in zwei orthogonalen Ebenen bestätigen. Isoliertes LGE an den septalen RV-Insertionspunkten zählt nicht als LV-LGE-Kriterium.'],
      ['Strukturelle Grundlage', 'Mindestens ein morphofunktionelles oder strukturelles Kriterium muss erfüllt sein. Für Volumen und Funktion geeignete Referenzwerte verwenden.'],
    ]}/>
    <Note title="RV, LV oder beide?">Belegte Veränderungen nur rechts ergeben ein rechtsbetontes Muster; Veränderungen beider Kammern ein biventrikuläres Muster. Bei rein linksdominantem Muster verlangt Padua zusätzlich eine passende pathogene oder wahrscheinlich pathogene ACM-Genvariante. LV-LGE allein reicht nicht.</Note>
    <p className={styles.bodyText}>Padua erweitert die TFC, ist aber ein eigenes Kriterienwerk. Die festen RV-Grenzwerte der TFC 2010 und die Padua-Kriterien nicht zu einer selbst erfundenen Punkteliste vermischen. Andere Narbenursachen, insbesondere Myokarditis, bleiben wichtig.</p>
  </>, _arvcLang)
}

function CriteriaExample() {
  const { lang } = useLanguage()
  const caseData = getAcmCaseData('39806', lang, 'acm-criteria-series')
  const measurements = {
    de: ['RVEDVi: 115 ml/m²', 'RVEF: 41 %'],
    en: ['RVEDVi: 115 mL/m²', 'RVEF: 41%'],
    fa: ['حجم پایان دیاستول شاخص‌شدهٔ بطن راست: ۱۱۵ میلی‌لیتر بر متر مربع', 'کسر جهشی بطن راست: ۴۱٪'],
  }

  return <LessonCaseFile lang={lang} caseData={{
    ...caseData,
    findings: [caseData.findings[0], ...(measurements[lang] || measurements.de), caseData.findings[1]],
    revealDiagnosis: true,
    revealLabel: { de: 'Einordnung nach TFC 2010 anzeigen', en: 'Show 2010 TFC interpretation', fa: 'نمایش تفسیر بر اساس TFC ۲۰۱۰' },
    interpretation: {
      de: 'Die regionale RV-Dyskinesie und das RVEDVi von 115 ml/m² erfüllen zusammen ein Major-MRT-Kriterium. Die RVEF von 41 % liegt im Minor-Bereich derselben Kategorie. Für die Gesamtdiagnose zählen zusätzlich Befunde aus anderen Kategorien.',
      en: 'Regional RV dyskinesia and an RVEDVi of 115 mL/m² together fulfill one major CMR criterion. The RVEF of 41% falls in the minor range within the same category. The overall diagnosis also requires findings from other categories.',
      fa: 'دیسکینزی موضعی بطن راست همراه با حجم پایان دیاستول شاخص‌شدهٔ ۱۱۵ میلی‌لیتر بر متر مربع، یک معیار اصلی MRI را برآورده می‌کند. کسر جهشی ۴۱٪ در محدودهٔ معیار فرعیِ همان دسته است. برای تشخیص نهایی، یافته‌های دسته‌های دیگر هم لازم‌اند.',
    },
  }}/>
}

export default function CriteriaOverview() {
  const { lang: _arvcLang } = useLanguage()

  const [selected, setSelected] = useState(0)
  return localizeArvcTree(<>
    <p className={styles.lead}>Die Diagnose stützt sich auf mehrere Befunde. Das MRT liefert nur einen Teil davon.</p>
    <dl className={styles.mriSequenceSummary}>
      <div>
        <dt>Task-Force-Kriterien (TFC 2010)</dt>
        <dd>Die TFC dienen der Diagnose der klassischen ARVC. Sie kombinieren Haupt- und Nebenkriterien aus Bildgebung, EKG, Rhythmusdiagnostik, Histologie und Familienanamnese oder Genetik.</dd>
      </div>
      <div>
        <dt>Padua-Kriterien (2020)</dt>
        <dd>Die Padua-Kriterien erfassen rechtsdominante, biventrikuläre und linksdominante Formen der ACM. Im MRT beziehen sie auch typische Narbenmuster im Late Gadolinium Enhancement (LGE) ein.</dd>
      </div>
    </dl>
    <div className={styles.explorer}>
      <Tabs label="TFC und Padua erklären" items={CRITERIA_TABS} selected={selected} onChange={setSelected} idPrefix="criteria"/>
      <div className={`${styles.criteriaReading} ${styles.mrtPanel}`} id="criteria-panel" role="tabpanel" aria-labelledby={`criteria-tab-${selected}`} tabIndex={0}>{selected === 0 ? <TfcExplanation/> : <PaduaExplanation/>}</div>
    </div>
    <hr className={styles.mriCaseDivider}/>
    <h3 className={styles.subheading}>Fallbeispiel</h3>
    <CriteriaExample/>
  </>, _arvcLang)
}
