'use client'

import { useLanguage } from '@/providers/LanguageProvider'
import { localizeArvcTree } from './lessonTranslations'

import { useState } from 'react'
import Link from 'next/link'
import { TeachingGroup, TeachingGroups } from '@/components/lesson-template/InteractiveTeachingGroups'
import { Icon, Tabs } from './LessonVisuals'
import styles from './page.module.css'

const MRI_SYSTEMS = [
  { id: 'tfc', label: 'TFC 2010' },
  { id: 'padua', label: 'Padua 2020' },
  { id: 'etf', label: 'ETF 2023' },
]

const OTHER_CATEGORIES = [
  {
    number: 'II',
    title: 'Myokardgewebe',
    description: [
      'TFC bewertet den fibrotischen Ersatz in der RV-Biopsie anhand des Anteils verbliebener Herzmuskelzellen.',
      'Bei Padua zählen fibrotischer Ersatz in der RV-Biopsie oder typisches LGE als Major-Kriterium.',
    ],
  },
  {
    number: 'III',
    title: 'Repolarisation im EKG',
    description: [
      'Negative T-Wellen in V1–V3 oder darüber hinaus ohne kompletten Rechtsschenkelblock sind ein Beispiel für Major.',
      'TFC setzt ein Alter über 14 Jahren voraus, Padua eine abgeschlossene Pubertät.',
    ],
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
    <div className={styles.criteriaContent}>
      {[description].flat().map(paragraph => <p key={paragraph}>{paragraph}</p>)}
    </div>
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
    <ul className={styles.criteriaFootnotes}>
      <li>RVEDVi ist das enddiastolische RV-Volumen bezogen auf die Körperoberfläche.</li>
      <li>RVEF ist die rechtsventrikuläre Ejektionsfraktion.</li>
      <li>Sind Volumen und RVEF auffällig, zählt in Kategorie I nur die höhere Einstufung.</li>
      <li>LGE ist bei TFC 2010 kein eigenes Kriterium.</li>
    </ul>
  </>, lang)
}

function PaduaExplanation({ lang }) {
  return localizeArvcTree(<div className={styles.paduaMri}>
    <section aria-labelledby="padua-cine">
      <h4 id="padua-cine" className={styles.mrtTopic}>Cine · Form und Funktion (I)</h4>
      <div className={styles.paduaChambers}>
        <div>
          <h5>Rechter Ventrikel (RV)</h5>
          <dl className={styles.paduaGrades}>
            <div><dt>Major</dt><dd>Regionale Akinesie, Dyskinesie oder Ausbuchtung zusammen mit globaler RV-Dilatation oder verminderter RVEF.</dd></div>
            <div><dt>Minor</dt><dd>Regionale Akinesie, Dyskinesie oder ein Aneurysma der freien RV-Wand genügt auch ohne globale Auffälligkeit.</dd></div>
          </dl>
        </div>
        <div>
          <h5>Linker Ventrikel (LV)</h5>
          <dl className={styles.paduaGrades}>
            <div>
              <dt>Minor</dt>
              <dd>Verminderte LVEF mit oder ohne LV-Dilatation.</dd>
              <dd>Alternativ zählt eine regionale Hypokinesie oder Akinesie der freien LV-Wand oder des Septums.</dd>
            </div>
          </dl>
          <p className={styles.criteriaNote}>Für den LV gibt es im Cine kein Major-Kriterium.</p>
        </div>
      </div>
      <p className={styles.criteriaNote}>Volumen und EF anhand geeigneter Referenzwerte für die Methode, das Alter und das Geschlecht beurteilen. Beim Volumen auch die Körperoberfläche berücksichtigen.</p>
    </section>
    <section aria-labelledby="padua-lge">
      <h4 id="padua-lge" className={styles.mrtTopic}>LGE · Myokardgewebe (II)</h4>
      <p>Ein typisches LGE-Muster in zwei orthogonalen Ebenen zählt als Major-Kriterium.</p>
      <dl className={styles.paduaChambers}>
        <div><dt>Rechter Ventrikel (RV)</dt><dd>Transmurales Streifen-LGE in mindestens einer RV-Region (Einflusstrakt, Ausflusstrakt oder Apex).</dd></div>
        <div>
          <dt>Linker Ventrikel (LV)</dt>
          <dd>Subepikardiales oder mittmyokardiales Streifen-LGE in mindestens einem Segment der freien Wand oder des Septums.</dd>
          <dd>Isoliertes LGE an RV-Insertionspunkten bleibt unberücksichtigt.</dd>
        </div>
      </dl>
      <p className={styles.criteriaNote}>Für LGE gibt es kein Minor-Kriterium.</p>
    </section>
  </div>, lang)
}

const ETF_MRI = [
  {
    de: ['Cine · RV Major', 'Regionale Akinesie, Dyskinesie oder Aneurysma plus globale RV-Dilatation oder reduzierte RVEF. Volumen und EF anhand geeigneter Referenzwerte beurteilen.'],
    en: ['Cine · RV major', 'Regional akinesia, dyskinesia or aneurysm plus global RV dilatation or reduced RVEF. Use appropriate reference ranges for volume and EF.'],
    fa: ['Cine · معیار اصلی بطن راست', 'آکینزی، دیسکینزی یا آنوریسم موضعی همراه اتساع کلی بطن راست یا کاهش RVEF. حجم و EF را با مقادیر مرجع مناسب بسنجید.'],
  },
  {
    de: ['Cine · RV/LV Minor', 'RV: Akinesie, Dyskinesie oder Aneurysma der freien Wand. LV: globale systolische Dysfunktion mit oder ohne Dilatation.'],
    en: ['Cine · RV/LV minor', 'RV: free-wall akinesia, dyskinesia or aneurysm. LV: global systolic dysfunction with or without dilatation.'],
    fa: ['Cine · معیار فرعی بطن‌ها', 'بطن راست: آکینزی، دیسکینزی یا آنوریسم دیوارهٔ آزاد. بطن چپ: اختلال کلی سیستولی با یا بدون اتساع.'],
  },
  {
    de: ['LGE · RV Minor', 'Eindeutiges RV-LGE in mindestens einer Region außerhalb der Trikuspidalklappe, bestätigt in zwei orthogonalen Ebenen.'],
    en: ['LGE · RV minor', 'Unequivocal RV LGE in at least one region outside the tricuspid valve, confirmed in two orthogonal views.'],
    fa: ['LGE · معیار فرعی بطن راست', 'LGE قطعی در دست‌کم یک ناحیه از بطن راست خارج از دریچهٔ تریکوسپید، با تأیید در دو نمای عمود.'],
  },
  {
    de: ['LGE · LV Major oder Minor', 'Subepikardiales oder mittmyokardiales Streifen-LGE in 1–2 Segmenten ist Minor. Ab 3 Segmenten zählt es als Major, ringförmig oder diskontinuierlich. Das Muster in zwei orthogonalen Ebenen bestätigen. Isoliertes Insertions-LGE zählt nicht.'],
    en: ['LGE · LV major or minor', 'Subepicardial or midwall stria-pattern LGE in 1–2 segments is minor. At least 3 segments are major, whether ring-like or discontinuous. Confirm the pattern in two orthogonal views. Exclude isolated junctional LGE.'],
    fa: ['LGE · معیار اصلی یا فرعی بطن چپ', 'LGE نواری زیر اپیکارد یا میان‌میوکارد در ۱ تا ۲ سگمان فرعی است. در دست‌کم ۳ سگمان، چه حلقوی چه ناپیوسته، اصلی است. الگو را در دو نمای عمود تأیید کنید. LGE محدود به محل اتصال بطن راست امتیاز ندارد.'],
  },
]

const CRITERIA_COMPARISON = {
  de: [
    ['Kriteriensystem', 'Schwerpunkt', 'LGE', 'Diagnostische Einordnung'],
    ['TFC 2010', 'Klassische ARVC mit Fokus auf den RV', 'Kein eigenes Kriterium', 'Diagnosestufen für ARVC'],
    ['Padua 2020', 'Rechtsdominante, biventrikuläre und linksdominante ACM', 'Typisches RV- oder LV-LGE zählt als Major', 'Diagnosestufen für rechtsdominante und biventrikuläre ACM. Bei isolierter ALVC sind typisches LV-LGE und eine passende Genvariante erforderlich.'],
    ['ETF 2023', 'Europäischer Vorschlag zur Weiterentwicklung von Padua', 'RV-LGE zählt als Minor. Beim LV entscheidet die Ausdehnung.', 'Für ALVC ist typisches nichtischämisches LV-LGE erforderlich. Eine ausreichende Befundkombination kann auch ohne Genvariante genügen.'],
  ],
  en: [
    ['Criteria', 'Focus', 'LGE', 'Diagnostic classification'],
    ['TFC 2010', 'Classic ARVC with a focus on the RV', 'No standalone criterion', 'Diagnostic tiers for ARVC'],
    ['Padua 2020', 'Right-dominant, biventricular and left-dominant ACM', 'Characteristic RV or LV LGE is a major criterion', 'Diagnostic tiers apply to right-dominant and biventricular ACM. Isolated ALVC requires characteristic LV LGE and a qualifying genetic variant.'],
    ['ETF 2023', 'European proposal to refine Padua', 'RV LGE is minor. LV grading depends on extent.', 'ALVC requires characteristic non-ischaemic LV LGE. A sufficient combination of findings can qualify without a genetic variant.'],
  ],
  fa: [
    ['معیارها', 'تمرکز', 'LGE', 'طبقه‌بندی تشخیصی'],
    ['TFC 2010', 'ARVC کلاسیک با تمرکز بر بطن راست', 'معیار مستقل ندارد', 'رده‌های تشخیصی ARVC'],
    ['Padua 2020', 'ACM راست‌غالب، دوبطنی و چپ‌غالب', 'LGE شاخص بطن راست یا چپ معیار اصلی است', 'رده‌بندی برای فرم راست‌غالب و دوبطنی. در ALVC منفرد، LGE شاخص بطن چپ و واریانت ژنتیکی مرتبط لازم‌اند.'],
    ['ETF 2023', 'پیشنهاد کارگروه اروپایی برای تکمیل پادوا', 'LGE بطن راست معیار فرعی است. در بطن چپ وسعت درگیری تعیین‌کننده است.', 'ALVC به LGE غیرایسکمیک شاخص بطن چپ نیاز دارد. ترکیب کافی یافته‌ها می‌تواند بدون واریانت ژنتیکی هم معیارها را برآورده کند.'],
  ],
}

const ETF_OTHER = {
  de: ['Weitere Änderungen nach ETF', 'Epsilon-Welle: Minor. Niedervoltage in allen Extremitätenableitungen ohne andere Ursache: LV Major. Pathogene ACM-Variante: Major, wahrscheinlich pathogene Variante: Minor.', 'Auch das T-Wellen-Muster, die VES-Morphologie bei Belastung und ein überlebter arrhythmischer Herzstillstand gehen nach den ETF-Regeln ein.'],
  en: ['Other ETF updates', 'Epsilon wave: minor. Low voltage in all limb leads without another cause: LV major. Pathogenic ACM variant: major, likely pathogenic variant: minor.', 'ETF also defines criteria for T-wave patterns, exercise-induced PVC morphology and resuscitated arrhythmic cardiac arrest.'],
  fa: ['تغییرات دیگر ETF', 'موج اپسیلون: فرعی. ولتاژ پایین در همهٔ لیدهای اندامی بدون علت دیگر: معیار اصلی بطن چپ. واریانت بیماری‌زا: اصلی. واریانت احتمالاً بیماری‌زا: فرعی.', 'الگوی موج T، مورفولوژی PVC حین ورزش و ایست قلبی آریتمیک احیاشده نیز معیارهای مشخصی دارند.'],
}

function EtfExplanation({ lang }) {
  return <dl className={styles.criteriaRows}>
    {ETF_MRI.map(row => {
      const [label, detail] = row[lang] || row.de
      return <div key={row.de[0]}><dt>{label}</dt><dd>{detail}</dd></div>
    })}
  </dl>
}

export default function CriteriaOverview() {
  const { lang } = useLanguage()
  const [selected, setSelected] = useState(0)

  const [columns, ...rows] = CRITERIA_COMPARISON[lang] || CRITERIA_COMPARISON.de
  const [otherTitle, ...otherNotes] = ETF_OTHER[lang] || ETF_OTHER.de

  return localizeArvcTree(<TeachingGroups direction={lang === 'fa' ? 'rtl' : 'ltr'}>
    <TeachingGroup id="arvc-diagnostic-comparison" title="TFC und Padua im Vergleich" tone="secondary">
      <div className={styles.criteriaLesson}>
        <p className={styles.criteriaIntro}>
          <strong>Für eine gesicherte Diagnose reicht ein einzelner MRT-Befund nicht aus.</strong>
          <span>Alle drei Systeme berücksichtigen sechs Befundkategorien. Neben dem MRT zählen unter anderem das EKG, dokumentierte Rhythmusstörungen sowie Familienanamnese und Genetik.</span>
        </p>
        <div className={styles.criteriaComparison} tabIndex={0} role="region" aria-label="TFC / Padua / ETF">
          <table>
            <thead><tr>{columns.map(column => <th key={column} scope="col">{column}</th>)}</tr></thead>
            <tbody>{rows.map(([system, ...cells]) => <tr key={system}>
              <th scope="row"><bdi>{system}</bdi></th>
              {cells.map((cell, index) => <td key={columns[index + 1]}>{cell}</td>)}
            </tr>)}</tbody>
          </table>
        </div>
        <h4 className={styles.subheading}>Von den Befunden zur Diagnose</h4>
        <p>Pro Kategorie zählt nur das stärkste erfüllte Kriterium, dann werden die Punkte aus den verschiedenen Kategorien addiert.</p>
        <figure className={styles.criteriaScale}>
          <figcaption>Diagnosestufen nach TFC 2010 und Padua 2020</figcaption>
          <p className={styles.criteriaScaleScope}>Bei Padua gilt die Skala für rechtsdominante und biventrikuläre ACM.</p>
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
        <dl className={styles.paduaPatterns}>
          <div>
            <dt>Padua · Schon für „möglich“</dt>
            <dd>Mindestens ein Kriterium für Form und Funktion (I) oder Myokardgewebe (II) muss erfüllt sein. Bei biventrikulärer ACM gilt das für beide Kammern. Ein Major-Kriterium im EKG allein genügt nicht.</dd>
          </div>
          <div>
            <dt>Padua · Isoliert links (ALVC)</dt>
            <dd>Erforderlich sind ein strukturelles LV-Major-Kriterium (typisches LGE) und eine pathogene oder wahrscheinlich pathogene ACM-assoziierte Genvariante.</dd>
          </div>
        </dl>
        <Link className={styles.paduaCalculatorLink} href="/padua-rechner">Zum ACM-Rechner <Icon name="arrow"/></Link>
      </div>
    </TeachingGroup>
    <TeachingGroup id="arvc-diagnostic-mri" title="Major und Minor im MRT" className={styles.mriCriteriaGroup}>
      <div className={styles.criteriaLesson}>
        <p>Cine zeigt Form und Funktion der Herzkammern (Kategorie I). Bei Padua und ETF können typische LGE-Muster als Kriterien für das Myokardgewebe zählen (Kategorie II).</p>
        <div className={`${styles.atlas} ${styles.criteriaAtlas}`}>
          <div dir="ltr"><Tabs label="MRT-Kriterien vergleichen" items={MRI_SYSTEMS} selected={selected} onChange={setSelected} idPrefix="acm-diagnostic-mri"/></div>
          <div className={styles.criteriaMri} id="acm-diagnostic-mri-panel" role="tabpanel" aria-labelledby={`acm-diagnostic-mri-tab-${selected}`} tabIndex={0}>
            {[<TfcExplanation key="tfc" lang={lang}/>, <PaduaExplanation key="padua" lang={lang}/>, <EtfExplanation key="etf" lang={lang}/>][selected]}
          </div>
        </div>
      </div>
    </TeachingGroup>
    <TeachingGroup id="arvc-diagnostic-other-categories" title="Die fünf weiteren Kategorien">
      <div className={styles.criteriaGuide}>
          {OTHER_CATEGORIES.map(category => <CategoryDisclosure key={category.number} {...category}/>)}
          <CategoryDisclosure number="ETF" title={otherTitle} description={otherNotes}/>
      </div>
    </TeachingGroup>
  </TeachingGroups>, lang)
}
