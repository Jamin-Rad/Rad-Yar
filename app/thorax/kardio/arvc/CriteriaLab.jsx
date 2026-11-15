'use client'

import { useLanguage } from '@/providers/LanguageProvider'
import { localizeArvcTree } from './lessonTranslations'

import { useState } from 'react'
import LessonCaseFile from '@/components/LessonCaseFile'
import { getAcmCaseData } from './CaseAtlas'
import { Tabs } from './LessonVisuals'
import styles from './page.module.css'

const MRI_SYSTEMS = [
  { id: 'tfc', label: 'TFC 2010' },
  { id: 'padua', label: 'Padua 2020' },
]

const OTHER_CATEGORIES = [
  {
    number: 'II',
    title: 'Myokardgewebe',
    description: 'TFC bewertet den fibrotischen Ersatz in der RV-Biopsie anhand des Anteils verbliebener Herzmuskelzellen. Bei Padua zählen fibrotischer Ersatz in der RV-Biopsie oder typisches LGE als Major-Kriterium.',
  },
  {
    number: 'III',
    title: 'Repolarisation im EKG',
    description: 'Negative T-Wellen in V1–V3 oder darüber hinaus ohne kompletten Rechtsschenkelblock sind ein Beispiel für Major. TFC setzt ein Alter über 14 Jahren voraus, Padua eine abgeschlossene Pubertät.',
  },
  {
    number: 'IV',
    title: 'Depolarisation im EKG',
    description: 'Eine Epsilon-Welle in V1–V3 zählt beispielsweise bei TFC als Major und bei Padua als Minor.',
  },
  {
    number: 'V',
    title: 'Ventrikuläre Arrhythmien',
    description: 'Im Langzeit-EKG zählen Häufigkeit und Morphologie ventrikulärer Extrasystolen und Tachykardien. Zum Beispiel ist eine VT mit Linksschenkelblockmorphologie und superiorer Achse in beiden Systemen ein Major-Kriterium.',
  },
  {
    number: 'VI',
    title: 'Familienanamnese und Genetik',
    description: 'Eine bestätigte Erkrankung bei einem erstgradig Verwandten kann ein Major-Kriterium erfüllen. Auch eine als krankheitsverursachend eingestufte Genvariante kann als Major zählen.',
  },
]

function CategoryDisclosure({ number, title, description }) {
  return <details className={styles.criteriaDisclosure}>
    <summary>
      <span className={styles.criteriaTitle}>{number}</span>
      <strong>{title}</strong>
      <span className={styles.criteriaToggle} aria-hidden="true"/>
    </summary>
    <p className={styles.criteriaContent}>{description}</p>
  </details>
}

function TfcExplanation({ lang }) {
  return localizeArvcTree(<>
    <h4 className={styles.mrtTopic}>Cine · rechter Ventrikel</h4>
    <p>Für beide Stufen braucht es eine regionale RV-Akinesie, Dyskinesie oder dyssynchrone RV-Kontraktion. Dazu muss mindestens einer der folgenden Messwerte auffällig sein.</p>
    <dl className={`${styles.criteriaRows} ${styles.criteriaThresholds}`}>
      <div>
        <dt>RVEDVi · Männer</dt>
        <dd><strong>Major</strong> ≥ 110 ml/m²</dd>
        <dd><strong>Minor</strong> ≥ 100 bis &lt; 110 ml/m²</dd>
      </div>
      <div>
        <dt>RVEDVi · Frauen</dt>
        <dd><strong>Major</strong> ≥ 100 ml/m²</dd>
        <dd><strong>Minor</strong> ≥ 90 bis &lt; 100 ml/m²</dd>
      </div>
      <div>
        <dt>RVEF · beide</dt>
        <dd><strong>Major</strong> ≤ 40 %</dd>
        <dd><strong>Minor</strong> &gt; 40 bis ≤ 45 %</dd>
      </div>
    </dl>
    <p className={styles.criteriaNote}>RVEDVi ist das enddiastolische RV-Volumen bezogen auf die Körperoberfläche. RVEF ist die rechtsventrikuläre Ejektionsfraktion.</p>
    <p className={styles.criteriaNote}>Volumen und RVEF gehören beide zur Kategorie I. Bei zwei auffälligen Messwerten zählt nur die höhere Einstufung. LGE ist bei TFC 2010 kein eigenes Kriterium.</p>
  </>, lang)
}

function PaduaExplanation({ lang }) {
  return localizeArvcTree(<>
    <h4 className={styles.mrtTopic}>Cine · Form und Funktion (I)</h4>
    <dl className={styles.criteriaRows}>
      <div>
        <dt>RV</dt>
        <dd><strong>Major</strong> Regionale Akinesie, Dyskinesie oder Ausbuchtung zusammen mit globaler RV-Dilatation oder verminderter RVEF.</dd>
        <dd><strong>Minor</strong> Regionale Akinesie, Dyskinesie oder ein Aneurysma der freien RV-Wand genügt auch ohne globale Auffälligkeit.</dd>
      </div>
      <div>
        <dt>LV</dt>
        <dd><strong>Minor</strong> Verminderte LVEF mit oder ohne LV-Dilatation. Auch eine regionale Hypokinesie oder Akinesie der freien LV-Wand oder des Septums erfüllt ein Minor-Kriterium.</dd>
      </div>
    </dl>
    <p className={styles.criteriaNote}>Im Cine gibt es für den LV kein Major-Kriterium. Für Volumen und EF gelten zur Methode und zur untersuchten Person passende Referenzwerte, etwa nach Alter, Geschlecht und Körperoberfläche.</p>
    <h4 className={styles.mrtTopic}>LGE · Myokardgewebe (II)</h4>
    <p>Das typische LGE muss in zwei orthogonalen Ebenen nachweisbar sein.</p>
    <dl className={styles.criteriaRows}>
      <div><dt>RV</dt><dd><strong>Major</strong> Transmurales Streifen-LGE in mindestens einer RV-Region (Einflusstrakt, Ausflusstrakt oder Apex).</dd></div>
      <div><dt>LV</dt><dd><strong>Major</strong> Subepikardiales oder mittmyokardiales Streifen-LGE in mindestens einem Segment der freien Wand oder des Septums. Isoliertes LGE an RV-Insertionspunkten bleibt unberücksichtigt.</dd></div>
    </dl>
    <p className={styles.criteriaNote}>Für LGE gibt es kein Minor-Kriterium.</p>
  </>, lang)
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
      de: 'Ein Major-Kriterium (2 Punkte). Die RV-Dyskinesie und das RVEDVi von 115 ml/m² erfüllen es gemeinsam. Die RVEF von 41 % liegt im Minor-Bereich derselben Kategorie. Für sich genommen ergibt dieser MRT-Befund nach TFC die Stufe „möglich“. Beim Patienten war die ARVC bereits bekannt.',
      en: 'One major criterion (2 points). RV dyskinesia and an RVEDVi of 115 mL/m² together fulfill it. The RVEF of 41% falls in the minor range within the same category. On its own, this MRI finding meets the “possible” tier under TFC. The patient already had a diagnosis of ARVC.',
      fa: 'یک معیار اصلی (۲ امتیاز). دیسکینزی بطن راست و حجم پایان دیاستول شاخص‌شدهٔ ۱۱۵ میلی‌لیتر بر متر مربع با هم این معیار را برآورده می‌کنند. کسر جهشی ۴۱٪ در محدودهٔ معیار فرعیِ همان دسته است. اگر فقط این یافتهٔ MRI را حساب کنیم، نتیجه طبق TFC در ردهٔ «ممکن» قرار می‌گیرد. تشخیص ARVC از قبل برای این بیمار مشخص بود.',
    },
  }}/>
}

export default function CriteriaOverview() {
  const { lang } = useLanguage()
  const [selected, setSelected] = useState(0)

  return localizeArvcTree(<>
    <p className={styles.lead}>Ein einzelner MRT-Befund reicht für eine gesicherte Diagnose nicht aus. TFC und Padua verteilen die Befunde auf sechs Kategorien. Das MRT liefert Befunde zu Form, Funktion und Gewebe. Auch EKG, Rhythmus und Familienanamnese oder Genetik fließen in die Diagnose ein.</p>
    <h3 className={styles.subheading}>Wie wird gewertet?</h3>
    <p><strong>Major entspricht 2 Punkten. Minor entspricht 1 Punkt.</strong> Pro Kategorie zählt der stärkste Befund einmal.</p>
    <dl className={styles.criteriaScores} aria-label="Diagnosestufen nach TFC 2010">
      <div><dt>Möglich</dt><dd>2 Punkte</dd></div>
      <div><dt>Grenzwertig</dt><dd>3 Punkte</dd></div>
      <div><dt>Gesichert</dt><dd>Ab 4 Punkten</dd></div>
    </dl>
    <p className={styles.criteriaNote}>Vier Punkte ergeben sich zum Beispiel aus zwei Major-Kriterien, einem Major- und zwei Minor-Kriterien oder vier Minor-Kriterien aus verschiedenen Kategorien.</p>
    <dl className={styles.criteriaRows}>
      <div><dt>TFC 2010</dt><dd>Die Task-Force-Kriterien richten sich auf die klassische ARVC mit Beteiligung der rechten Herzkammer. Für sie gelten die drei Stufen oben.</dd></div>
      <div><dt>Padua 2020</dt><dd>Padua ergänzt Kriterien für die linke Herzkammer und für Narben im LGE. Für rechtsdominante und biventrikuläre Formen gelten dieselben Stufen mit zusätzlichen Voraussetzungen.</dd></div>
    </dl>
    <details className={styles.mrtDetails}>
      <summary>Welche Voraussetzungen gelten bei Padua?</summary>
      <p>Bei Padua muss mindestens ein Kriterium aus Form und Funktion (I) oder Myokardgewebe (II) erfüllt sein. Welche Kammer betroffen ist, bestimmt die Form.</p>
      <dl className={styles.criteriaRows}>
        <div><dt>Rechtsdominant</dt><dd>Kriterien aus I oder II nur am RV. Linksventrikuläre elektrische Befunde fließen bei dieser Form nicht in die Wertung ein.</dd></div>
        <div><dt>Biventrikulär</dt><dd>Mindestens ein Kriterium aus I oder II pro Herzkammer.</dd></div>
        <div><dt>Isoliert links</dt><dd>Typisches LV-LGE und eine pathogene oder wahrscheinlich pathogene ACM-Genvariante sind erforderlich.</dd></div>
      </dl>
    </details>
    <h3 className={styles.subheading}>Was zählt im MRT als Major oder Minor?</h3>
    <p>Im Cine beurteilen wir Form und Funktion (I). Bei Padua kann das LGE zusätzlich ein Kriterium des Myokardgewebes (II) erfüllen.</p>
    <div className={styles.atlas}>
      <Tabs label="MRT-Kriterien vergleichen" items={MRI_SYSTEMS} selected={selected} onChange={setSelected} idPrefix="acm-diagnostic-mri"/>
      <div className={styles.criteriaMri} id="acm-diagnostic-mri-panel" role="tabpanel" aria-labelledby={`acm-diagnostic-mri-tab-${selected}`} tabIndex={0}>
        {selected === 0 ? <TfcExplanation lang={lang}/> : <PaduaExplanation lang={lang}/>}
      </div>
    </div>
    <h3 className={styles.subheading}>Die fünf weiteren Kategorien</h3>
    <div className={styles.criteriaGuide}>
      {OTHER_CATEGORIES.map(category => <CategoryDisclosure key={category.number} {...category}/>)}
    </div>
    <hr className={styles.mriCaseDivider}/>
    <h3 className={styles.subheading}>Fallbeispiel</h3>
    <CriteriaExample/>
  </>, lang)
}
