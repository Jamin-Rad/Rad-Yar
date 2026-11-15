'use client'

import { useLanguage } from '@/providers/LanguageProvider'
import { localizeArvcTree } from './lessonTranslations'

import { useState } from 'react'
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
    <p>Major und Minor setzen eine regionale RV-Akinesie, Dyskinesie oder dyssynchrone Kontraktion voraus. Der Messwert für RV-Volumen oder RVEF bestimmt die Einstufung.</p>
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
    <p className={styles.criteriaNote}>Sind Volumen und RVEF auffällig, zählt in Kategorie I nur die höhere Einstufung. LGE ist bei TFC 2010 kein eigenes Kriterium.</p>
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

export default function CriteriaOverview() {
  const { lang } = useLanguage()
  const [selected, setSelected] = useState(0)

  return localizeArvcTree(<div className={styles.criteriaLesson}>
    <p className={styles.criteriaIntro}><strong>Für eine gesicherte Diagnose reicht ein einzelner MRT-Befund nicht aus.</strong> TFC und Padua berücksichtigen sechs Befundkategorien. Neben dem MRT zählen unter anderem das EKG, dokumentierte Rhythmusstörungen sowie Familienanamnese und Genetik.</p>
    <h3 className={styles.subheading}>Von den Befunden zur Diagnose</h3>
    <p>Pro Kategorie zählt nur das stärkste erfüllte Kriterium. Die Punkte aus den verschiedenen Kategorien werden addiert.</p>
    <figure className={styles.criteriaScale}>
      <figcaption>Diagnosestufen nach TFC 2010</figcaption>
      <div className={styles.criteriaWeights}>
        <span><strong>Major</strong> <span>2 Punkte</span></span>
        <span><strong>Minor</strong> <span>1 Punkt</span></span>
      </div>
      <dl className={styles.criteriaScores}>
        <div><dt><bdi dir="ltr" aria-label="2 Punkte">2</bdi></dt><dd>Möglich</dd></div>
        <div><dt><bdi dir="ltr" aria-label="3 Punkte">3</bdi></dt><dd>Grenzwertig</dd></div>
        <div><dt><bdi dir="ltr" aria-label="Ab 4 Punkten">≥ 4</bdi></dt><dd>Gesichert</dd></div>
      </dl>
    </figure>
    <h3 className={styles.subheading}>TFC und Padua im Vergleich</h3>
    <dl className={styles.criteriaRows}>
      <div><dt>TFC 2010</dt><dd>Die Task-Force-Kriterien wurden für die klassische ARVC entwickelt. Im Mittelpunkt steht die rechte Herzkammer.</dd></div>
      <div><dt>Padua 2020</dt><dd>Padua erfasst auch linksdominante und biventrikuläre Formen und berücksichtigt Narben im LGE. Bei rechtsdominanter oder biventrikulärer ACM gelten dieselben Diagnosestufen mit zusätzlichen Voraussetzungen.</dd></div>
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
    <h3 className={styles.subheading}>Major und Minor im MRT</h3>
    <p>Cine zeigt Form und Funktion der Herzkammern (Kategorie I). Bei Padua können typische Narben im LGE auch in die Bewertung des Myokardgewebes eingehen (Kategorie II).</p>
    <div className={`${styles.atlas} ${styles.criteriaAtlas}`}>
      <Tabs label="MRT-Kriterien vergleichen" items={MRI_SYSTEMS} selected={selected} onChange={setSelected} idPrefix="acm-diagnostic-mri"/>
      <div className={styles.criteriaMri} id="acm-diagnostic-mri-panel" role="tabpanel" aria-labelledby={`acm-diagnostic-mri-tab-${selected}`} tabIndex={0}>
        {selected === 0 ? <TfcExplanation lang={lang}/> : <PaduaExplanation lang={lang}/>}
      </div>
    </div>
    <h3 className={styles.subheading}>Die fünf weiteren Kategorien</h3>
    <div className={styles.criteriaGuide}>
      {OTHER_CATEGORIES.map(category => <CategoryDisclosure key={category.number} {...category}/>)}
    </div>
  </div>, lang)
}
