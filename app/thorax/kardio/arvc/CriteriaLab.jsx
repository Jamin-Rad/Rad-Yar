'use client'

import { useLanguage } from '@/providers/LanguageProvider'
import { localizeArvcTree } from './lessonTranslations'

import LessonCaseFile from '@/components/LessonCaseFile'
import { getAcmCaseData } from './CaseAtlas'
import { TeachingTable } from './LessonVisuals'
import styles from './page.module.css'

function CriteriaDisclosure({ title, focus, summary, children }) {
  return <details className={styles.criteriaDisclosure}>
    <summary>
      <span className={styles.criteriaTitle}>{title}</span>
      <strong>{focus}</strong>
      <span className={styles.criteriaSummary}>{summary}</span>
      <span className={styles.criteriaToggle} aria-hidden="true"/>
    </summary>
    <div className={styles.criteriaContent}>{children}</div>
  </details>
}

function TfcExplanation() {
  const { lang: _arvcLang } = useLanguage()

  return localizeArvcTree(<>
    <dl className={styles.criteriaRows}>
      <div><dt>Regional</dt><dd>RV-Akinesie, Dyskinesie oder dyssynchrone Kontraktion.</dd></div>
      <div><dt>Global</dt><dd>Erhöhtes RVEDVi oder verminderte RVEF. Ist beides auffällig, zählt die höhere Einstufung einmal.</dd></div>
    </dl>
    <details className={styles.mrtDetails}>
      <summary>MRT-Grenzwerte anzeigen</summary>
      <div className={styles.thresholds}><TeachingTable caption="TFC 2010 · die MRT-Grenzwerte bei Erwachsenen" headers={['Messgröße', 'Major', 'Minor']} rows={[
        ['RVEDVi · Männer', '≥ 110 ml/m²', '≥ 100 bis < 110 ml/m²'],
        ['RVEDVi · Frauen', '≥ 100 ml/m²', '≥ 90 bis < 100 ml/m²'],
        ['RVEF · beide', '≤ 40 %', '> 40 bis ≤ 45 %'],
      ]}/></div>
      <p className={styles.caption}>Nur zusammen mit der geforderten regionalen Störung. RVEDVi = enddiastolisches RV-Volumen / Körperoberfläche; EF = ausgeworfener Volumenanteil. Bei Kindern und Sportlern die Referenzen gesondert prüfen.</p>
    </details>

    <h4 className={styles.mrtTopic}>Gesicherte ARVC nach TFC 2010</h4>
    <ul className={styles.criteriaCombinations}>
      <li>2 Major</li>
      <li>1 Major + 2 Minor</li>
      <li>4 Minor</li>
    </ul>
    <p>Die Kriterien müssen aus unterschiedlichen Kategorien stammen.</p>
  </>, _arvcLang)
}

function PaduaExplanation() {
  const { lang: _arvcLang } = useLanguage()

  return localizeArvcTree(<>
    <dl className={styles.criteriaRows}>
      <div><dt>Cine</dt><dd>Wandbewegung, Größe und Funktion beider Kammern beurteilen. Volumen und EF anhand geeigneter Referenzwerte einordnen.</dd></div>
      <div><dt>RV-LGE</dt><dd>Transmurales Streifen-LGE in mindestens einer Region der RV-Wand.</dd></div>
      <div><dt>LV-LGE</dt><dd>Subepikardiales oder intramurales Streifen-LGE. LGE allein an den RV-Insertionspunkten bleibt unberücksichtigt.</dd></div>
    </dl>
    <p className={styles.criteriaNote}>Das LGE-Muster in zwei orthogonalen Ebenen bestätigen. Bei der Einordnung auch andere Narbenursachen wie eine Myokarditis berücksichtigen.</p>
    <h4 className={styles.mrtTopic}>Was braucht die Gesamtdiagnose?</h4>
    <p>Mindestens ein morphofunktionelles oder strukturelles Kriterium ist erforderlich. Bei isolierter LV-Beteiligung verlangt Padua zusätzlich eine pathogene oder wahrscheinlich pathogene ACM-Genvariante.</p>
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
    findings: [caseData.findings[0], ...(measurements[lang] || measurements.de)],
    revealDiagnosis: true,
    revealLabel: { de: 'Major oder Minor nach TFC 2010?', en: 'Major or minor under the 2010 TFC?', fa: 'طبق TFC ۲۰۱۰ معیار اصلی است یا فرعی؟' },
    interpretation: {
      de: 'Ein Major-MRT-Kriterium. Die regionale RV-Dyskinesie und das RVEDVi von 115 ml/m² erfüllen es gemeinsam. Die RVEF von 41 % liegt im Minor-Bereich derselben Kategorie. Das Gesamtergebnis hängt auch von den Befunden der übrigen Kategorien ab.',
      en: 'Regional RV dyskinesia and an RVEDVi of 115 mL/m² together fulfill one major CMR criterion. The RVEF of 41% falls in the minor range within the same category. The overall diagnosis also requires findings from other categories.',
      fa: 'دیسکینزی موضعی بطن راست همراه با حجم پایان دیاستول شاخص‌شدهٔ ۱۱۵ میلی‌لیتر بر متر مربع، یک معیار اصلی MRI را برآورده می‌کند. کسر جهشی ۴۱٪ در محدودهٔ معیار فرعیِ همان دسته است. برای تشخیص نهایی، یافته‌های دسته‌های دیگر هم لازم‌اند.',
    },
  }}/>
}

export default function CriteriaOverview() {
  const { lang: _arvcLang } = useLanguage()

  return localizeArvcTree(<>
    <p className={styles.lead}>Die Diagnose ergibt sich aus mehreren Befundgruppen, darunter Bildgebung, EKG, Rhythmusdiagnostik und Familienanamnese oder Genetik.</p>
    <div className={styles.criteriaGuide}>
      <CriteriaDisclosure title="Task-Force-Kriterien (TFC 2010)" focus="Klassische ARVC" summary="Das MRT-Kriterium verbindet eine regionale RV-Wandbewegungsstörung mit RV-Dilatation oder verminderter RVEF.">
        <TfcExplanation/>
      </CriteriaDisclosure>
      <CriteriaDisclosure title="Padua-Kriterien (2020)" focus="ACM mit RV- und/oder LV-Beteiligung" summary="Im Cine beide Kammern beurteilen. Typische LGE-Muster zählen als strukturelle Kriterien.">
        <PaduaExplanation/>
      </CriteriaDisclosure>
    </div>
    <hr className={styles.mriCaseDivider}/>
    <h3 className={styles.subheading}>Fallbeispiel</h3>
    <CriteriaExample/>
  </>, _arvcLang)
}
