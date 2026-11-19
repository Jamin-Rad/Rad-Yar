'use client'

import { useLanguage } from '@/providers/LanguageProvider'
import { localizeArvcTree } from './lessonTranslations'

import Link from 'next/link'
import { TeachingGroup, TeachingGroups } from '@/components/lesson-template/InteractiveTeachingGroups'
import { Icon } from './LessonVisuals'
import styles from './page.module.css'

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

const ETF_MRI = {
  de: {
    regional: 'Regionale Akinesie, Dyskinesie oder Aneurysma des RV.',
    global: 'Zusätzlich globale RV-Dilatation oder verminderte RVEF.',
    rvMinor: 'Akinesie, Dyskinesie oder Aneurysma der freien RV-Wand reichen auch bei normalem RV-Volumen und normaler RVEF.',
    lvMinor: 'Globale systolische Dysfunktion des LV, mit oder ohne LV-Dilatation. In Kategorie I gibt es für den LV nur ein Minor-Kriterium.',
    referenceNote: 'Das enddiastolische Volumen auf die Körperoberfläche (KOF) beziehen. Die EF in Prozent angeben. Referenzwerte passend zu Alter, Geschlecht und Messmethode verwenden.',
    referenceTitle: 'MRT-Grenzwerte für Dilatation und systolische Dysfunktion',
    referenceHeaders: ['Messgröße', 'Frauen', 'Männer', 'Sportler'],
    referenceLimit: 'Die Grenzwerte aus Tabelle 2 des ETF-Berichts sind bei Kindern und älteren Menschen nur eingeschränkt aussagekräftig.',
    confirmation: 'Den LGE-Befund in zwei zueinander senkrechten Ebenen bestätigen.',
    rvLge: 'Klar abgrenzbares LGE im Herzmuskel des rechten Ventrikels in mindestens einer Region. Der Befund zählt als Minor.',
    tricuspid: 'LGE, das auf die Trikuspidalklappe begrenzt ist, zählt nicht.',
    lvPattern: 'Gesucht ist streifenförmiges, nichtischämisches LGE direkt unter dem Epikard oder in der mittleren Schicht der LV-Wand. Die Zahl der betroffenen Segmente bestimmt die Einstufung.',
    lvMajor: 'Mindestens 3 Segmente. Die Anreicherung kann ringförmig zusammenhängen oder in getrennten Segmenten liegen.',
    lvMinorLge: '1–2 Segmente der freien LV-Wand, des Septums oder beider Bereiche.',
    lvExclusions: 'Punktförmiges oder fleckiges LGE sowie isoliertes LGE an RV-Insertionspunkten zählen nicht.',
  },
  en: {
    regional: 'Regional RV akinesia, dyskinesia or aneurysm.',
    global: 'In addition, global RV dilatation or reduced RVEF.',
    rvMinor: 'Akinesia, dyskinesia or aneurysm of the RV free wall qualifies even when RV volume and RVEF are normal.',
    lvMinor: 'Global LV systolic dysfunction with or without LV dilatation. Category I has only a minor criterion for the LV.',
    referenceNote: 'Index end-diastolic volume to body surface area (BSA). Report EF as a percentage. Use reference ranges appropriate for age, sex and measurement technique.',
    referenceTitle: 'MRI thresholds for dilatation and systolic dysfunction',
    referenceHeaders: ['Measure', 'Women', 'Men', 'Athletes'],
    referenceLimit: 'The thresholds in Table 2 of the ETF report have limited accuracy in children and older adults.',
    confirmation: 'Confirm the LGE finding in two perpendicular planes.',
    rvLge: 'Clearly identifiable LGE in the right ventricular myocardium in at least one region counts as minor.',
    tricuspid: 'LGE confined to the tricuspid valve does not count.',
    lvPattern: 'Look for non-ischaemic, streak-like LGE in the outer or middle layer of the LV wall. The number of involved segments determines the grade.',
    lvMajor: 'At least 3 segments. Enhancement may form a ring or involve separate segments.',
    lvMinorLge: '1–2 segments of the LV free wall, septum or both.',
    lvExclusions: 'Focal or patchy LGE and isolated RV insertion-point LGE are excluded.',
  },
  fa: {
    regional: 'آکینزی، دیسکینزی یا آنوریسم موضعی بطن راست.',
    global: 'همراه با اتساع کلی بطن راست یا کاهش کسر جهشی آن (RVEF).',
    rvMinor: 'آکینزی، دیسکینزی یا آنوریسم موضعی دیوارهٔ آزاد بطن راست، حتی وقتی حجم بطن راست و RVEF طبیعی‌اند.',
    lvMinor: 'اختلال کلی عملکرد سیستولی بطن چپ، با یا بدون اتساع. در دستهٔ I، بطن چپ فقط معیار فرعی دارد.',
    referenceNote: 'حجم پایان دیاستول را بر سطح بدن (BSA) تقسیم کنید. کسر جهشی (EF) به درصد بیان می‌شود. برای تفسیر، از مقادیر مرجع متناسب با سن، جنس و روش اندازه‌گیری استفاده کنید.',
    referenceTitle: 'آستانه‌های MRI برای اتساع و اختلال عملکرد سیستولی',
    referenceHeaders: ['شاخص', 'زنان', 'مردان', 'ورزشکاران'],
    referenceLimit: 'آستانه‌های جدول ۲ گزارش ETF در کودکان و سالمندان دقت محدودتری دارند.',
    confirmation: 'یافتهٔ LGE را در دو صفحهٔ تصویربرداری عمود بر هم تأیید کنید.',
    rvLge: 'اگر افزایش سیگنال تأخیری پس از تزریق گادولینیوم (LGE) به‌وضوح در دست‌کم یک ناحیه از عضلهٔ بطن راست دیده شود، معیار فرعی است.',
    tricuspid: 'افزایش سیگنال محدود به دریچهٔ تریکوسپید در این معیار حساب نمی‌شود.',
    lvPattern: 'به دنبال رگه‌های LGE با الگوی غیرایسکمیک در لایهٔ بیرونی دیواره، زیر اپیکارد، یا در ضخامت میانی عضلهٔ بطن چپ باشید. تعداد سگمان‌های درگیر تعیین می‌کند یافته اصلی است یا فرعی.',
    lvMajor: 'درگیری دست‌کم ۳ سگمان. الگو می‌تواند حلقوی یا ناپیوسته باشد.',
    lvMinorLge: 'درگیری ۱ تا ۲ سگمان در دیوارهٔ آزاد بطن چپ، سپتوم یا هر دو.',
    lvExclusions: 'LGE کانونی یا لکه‌ای و LGE محدود به محل اتصال بطن راست به سپتوم در این معیار حساب نمی‌شوند.',
  },
}

const cmrThresholds = [
  ['RV EDV / BSA (mL/m²)', '>112', '>121', '>130'],
  ['RVEF (%)', '<51', '<52', '<52'],
  ['LV EDV / BSA (mL/m²)', '>96', '>105', '>122'],
  ['LVEF (%)', '<57', '<57', '<58'],
]

function EtfExplanation({ lang }) {
  const copy = ETF_MRI[lang] || ETF_MRI.de

  return localizeArvcTree(<div className={styles.paduaMri}>
    <section aria-labelledby="etf-cine">
      <h4 id="etf-cine" className={styles.mrtTopic}>Cine · Form und Funktion (I)</h4>
      <div className={styles.paduaChambers}>
        <div>
          <h5>Rechter Ventrikel (RV)</h5>
          <dl className={styles.paduaGrades}>
            <div><dt>Major</dt><dd><ol className={styles.essentialList}><li>{copy.regional}</li><li>{copy.global}</li></ol></dd></div>
            <div><dt>Minor</dt><dd>{copy.rvMinor}</dd></div>
          </dl>
        </div>
        <div>
          <h5>Linker Ventrikel (LV)</h5>
          <dl className={styles.paduaGrades}><div><dt>Minor</dt><dd>{copy.lvMinor}</dd></div></dl>
        </div>
      </div>
      <p className={styles.criteriaNote}>{copy.referenceNote}</p>
      <details className={styles.criteriaDisclosure}>
        <summary><strong>{copy.referenceTitle}</strong><span className={styles.criteriaToggle} aria-hidden="true"/></summary>
        <div className={styles.criteriaContent}>
          <div className={`${styles.criteriaComparison} ${styles.cmrReferences}`} tabIndex={0} role="region" aria-label={copy.referenceTitle}>
            <table>
              <thead><tr>{copy.referenceHeaders.map(header => <th key={header} scope="col">{header}</th>)}</tr></thead>
              <tbody>{cmrThresholds.map(([measure, ...values]) => <tr key={measure}>
                <th scope="row"><bdi dir="ltr">{measure}</bdi></th>
                {values.map((value, index) => <td key={copy.referenceHeaders[index + 1]}><bdi dir="ltr">{value}</bdi></td>)}
              </tr>)}</tbody>
            </table>
          </div>
          <p className={styles.criteriaNote}>{copy.referenceLimit}</p>
        </div>
      </details>
    </section>
    <section aria-labelledby="etf-lge">
      <h4 id="etf-lge" className={styles.mrtTopic}>LGE · Myokardgewebe (II)</h4>
      <p>{copy.confirmation}</p>
      <div className={styles.paduaChambers}>
        <div>
          <h5>Rechter Ventrikel (RV)</h5>
          <dl className={styles.paduaGrades}><div><dt>Minor</dt><dd>{copy.rvLge}</dd></div></dl>
          <p className={styles.criteriaNote}>{copy.tricuspid}</p>
        </div>
        <div>
          <h5>Linker Ventrikel (LV)</h5>
          <p>{copy.lvPattern}</p>
          <dl className={styles.paduaGrades}>
            <div><dt>Major</dt><dd>{copy.lvMajor}</dd></div>
            <div><dt>Minor</dt><dd>{copy.lvMinorLge}</dd></div>
          </dl>
          <p className={styles.criteriaNote}>{copy.lvExclusions}</p>
        </div>
      </div>
    </section>
  </div>, lang)
}

const overview = {
  de: [
    'Diagnose nach ETF 2023',
    'Die European Task Force kombiniert Befunde aus sechs Kategorien. Neben Cine und LGE zählen je nach Befund auch Histologie, EKG, ventrikuläre Arrhythmien, Familienanamnese und Genetik.',
    'Pro Kategorie wird das stärkste passende Kriterium gewertet.',
    'Diagnosestufen nach ETF 2023',
    'Voraussetzungen für den Phänotyp',
    'Rechtsdominant (ARVC)',
    'Mindestens ein RV-Kriterium aus Form und Funktion (I) oder Myokardgewebe (II).',
    'Biventrikulär',
    'Jeder Ventrikel erfüllt mindestens ein Kriterium aus I oder II.',
    'Linksdominant (ALVC)',
    'Ein qualifizierendes LV-LGE ist erforderlich und kann Major oder Minor sein. Bei ausreichender Befundkombination ist eine Genvariante nicht zwingend.',
    'Kriterien außerhalb des MRT',
  ],
  en: [
    'Diagnosis under ETF 2023',
    'The European Task Force combines findings from six categories. Alongside cine and LGE, the assessment can include histology, ECG, ventricular arrhythmias, family history and genetics.',
    'Count the strongest applicable criterion in each category.',
    'Diagnostic tiers under ETF 2023',
    'Requirements by phenotype',
    'Right-dominant (ARVC)',
    'At least one RV criterion from morphology and function (I) or myocardial tissue (II).',
    'Biventricular',
    'Each ventricle meets at least one criterion from I or II.',
    'Left-dominant (ALVC)',
    'Qualifying LV LGE is required and can be major or minor. A genetic variant is optional when the combination of findings is sufficient.',
    'Criteria beyond MRI',
  ],
  fa: [
    'تشخیص بر اساس ETF 2023',
    'معیارهای ETF یافته‌ها را در شش دسته بررسی می‌کنند. MRI قلب دو دستهٔ مورفولوژی و عملکرد و مشخصات بافت میوکارد را پوشش می‌دهد. برای تشخیص، یافته‌های MRI را در کنار بافت‌شناسی، نوار قلب، آریتمی‌های بطنی، سابقهٔ خانوادگی و ژنتیک تفسیر کنید.',
    'در هر دسته قوی‌ترین معیارِ برآورده‌شده حساب می‌شود.',
    'رده‌های تشخیصی بر اساس ETF 2023',
    'پیش‌شرط‌های هر فنوتیپ',
    'راست‌غالب (ARVC)',
    'دست‌کم یک معیار بطن راست از دستهٔ مورفولوژی و عملکرد (I) یا بافت میوکارد (II) لازم است.',
    'دوبطنی',
    'هر بطن باید دست‌کم یک معیار از دستهٔ I یا II داشته باشد.',
    'چپ‌غالب (ALVC)',
    'برای تشخیص فرم چپ‌غالب، الگوی غیرایسکمیک LGE در بطن چپ باید معیار ساختاری اصلی یا فرعی ETF را برآورده کند. اگر مجموع یافته‌ها کافی باشد، وجود واریانت ژنتیکی الزامی نیست.',
    'معیارهای خارج از MRI',
  ],
}

const otherCriteria = [
  ['II', 'Histologie', 'Histology', 'بافت‌شناسی',
    ['Major: fibrotischer Ersatz von Myokard in mindestens einer Biopsieprobe, mit oder ohne Fett.'],
    ['Major: fibrous replacement of myocardium in at least one biopsy sample, with or without fat.'],
    ['در بافت‌شناسی، جایگزینی میوکارد با بافت فیبروزی، با یا بدون چربی، در دست‌کم یک نمونهٔ بیوپسی معیار اصلی است.']],
  ['III', 'Repolarisation im EKG', 'ECG repolarization', 'رپلاریزاسیون در نوار قلب',
    ['RV Major: T-Negativierung in V1–V3 oder weiter ab 14 Jahren, ohne kompletten Rechtsschenkelblock und ohne vorangehende J-Punkt- oder ST-Hebung.', 'RV Minor: V1–V2 bei Männern ab 14 Jahren ohne Rechtsschenkelblock und ohne vorangehende J-Punkt- oder ST-Hebung. T-Negativierung über V3 hinaus zählt bei komplettem Rechtsschenkelblock oder unter 14 Jahren ebenfalls als Minor.', 'LV Minor: T-Negativierung in V4–V6 ohne kompletten Linksschenkelblock.'],
    ['RV major: T-wave inversion in V1–V3 or beyond at age 14 or older, without complete RBBB or preceding J-point or ST elevation.', 'RV minor: inversion in V1–V2 in males aged 14 or older without RBBB or preceding J-point or ST elevation. Inversion beyond V3 also counts with complete RBBB or below age 14.', 'LV minor: inversion in V4–V6 without complete LBBB.'],
    ['معیار اصلی بطن راست شامل وارونگی موج T در V1 تا V3 یا فراتر از آن از ۱۴ سالگی، بدون بلوک کامل شاخهٔ راست و بدون بالارفتن پیشین نقطهٔ J یا قطعهٔ ST است.', 'وارونگی در V1 و V2 در مردان از ۱۴ سالگی، بدون بلوک شاخهٔ راست و بدون بالارفتن پیشین J یا ST، معیار فرعی بطن راست است. وارونگی فراتر از V3 در صورت بلوک کامل شاخهٔ راست یا سن زیر ۱۴ سال هم معیار فرعی است.', 'وارونگی T در V4 تا V6 بدون بلوک کامل شاخهٔ چپ معیار فرعی بطن چپ است.']],
  ['IV', 'Depolarisation im EKG', 'ECG depolarization', 'دپلاریزاسیون در نوار قلب',
    ['RV Minor: reproduzierbare Epsilon-Welle in V1–V3 oder terminale Aktivierungsdauer ≥ 55 ms in V1, V2 oder V3 ohne kompletten Rechtsschenkelblock.', 'LV Major: QRS-Amplitude < 0,5 mV in allen Extremitätenableitungen, wenn andere Ursachen der Niedervoltage ausgeschlossen sind.'],
    ['RV minor: reproducible epsilon wave in V1–V3 or terminal activation duration ≥55 ms in V1, V2 or V3 without complete RBBB.', 'LV major: QRS amplitude <0.5 mV in all limb leads after other causes of low voltage have been excluded.'],
    ['موج اپسیلون تکرارپذیر در V1 تا V3 یا مدت فعال‌سازی انتهایی دست‌کم ۵۵ میلی‌ثانیه در یکی از این لیدها بدون بلوک کامل شاخهٔ راست، معیار فرعی بطن راست است.', 'دامنهٔ قله‌به‌قلهٔ QRS کمتر از ۰٫۵ میلی‌ولت در تمام لیدهای اندامی، پس از رد سایر علل کاهش ولتاژ، معیار اصلی بطن چپ است.']],
  ['V', 'Ventrikuläre Arrhythmien', 'Ventricular arrhythmias', 'آریتمی‌های بطنی',
    ['RV Major: > 500 ventrikuläre Extrasystolen in 24 Stunden oder anhaltende bzw. nichtanhaltende VT mit Linksschenkelblockmorphologie und nichtinferiorer Achse. Bei inferiorer Achse zählt dieses Muster als RV Minor.', 'LV Minor: häufige oder belastungsinduzierte ventrikuläre Extrasystolen oder VT mit nichtfaszikulärer Rechtsschenkelblockmorphologie.', 'Minor: überlebter Herzstillstand durch Kammerflimmern oder anhaltende VT unbekannter Morphologie.'],
    ['RV major: >500 premature ventricular complexes in 24 hours or sustained or nonsustained VT with LBBB morphology and a non-inferior axis. The same findings with an inferior axis count as RV minor.', 'LV minor: frequent or exercise-induced premature ventricular complexes, or VT, with non-fascicular RBBB morphology.', 'Minor: resuscitated cardiac arrest due to ventricular fibrillation or sustained VT of unknown morphology.'],
    ['بیش از ۵۰۰ اکستراسیستول بطنی در ۲۴ ساعت، یا تاکی‌کاردی بطنی پایدار یا غیرپایدار، با الگوی بلوک شاخهٔ چپ و محور غیرتحتانی معیار اصلی بطن راست است. همین الگو با محور تحتانی معیار فرعی است.', 'اکستراسیستول‌های بطنی مکرر یا ناشی از ورزش، یا VT، با الگوی بلوک شاخهٔ راست غیرفاسیکولار معیار فرعی بطن چپ هستند.', 'ایست قلبی احیاشده بر اثر فیبریلاسیون بطنی یا VT پایدار با مورفولوژی نامشخص معیار فرعی است.']],
  ['VI', 'Familienanamnese und Genetik', 'Family history and genetics', 'سابقهٔ خانوادگی و ژنتیک',
    ['Major: pathogene ACM-Genvariante oder gesicherte ACM bei einem erstgradig Verwandten.', 'Minor: wahrscheinlich pathogene Variante, nicht überprüfbare ACM-Diagnose bei einem erstgradig Verwandten, plötzlicher Tod unter 35 Jahren bei einem erstgradig Verwandten mit ACM-Verdacht oder gesicherte ACM bei einem zweitgradig Verwandten.'],
    ['Major: pathogenic ACM variant or confirmed ACM in a first-degree relative.', 'Minor: likely pathogenic variant, unverifiable ACM diagnosis in a first-degree relative, sudden death before age 35 in a first-degree relative with suspected ACM, or confirmed ACM in a second-degree relative.'],
    ['واریانت بیماری‌زای مرتبط با ACM یا تشخیص تأییدشدهٔ ACM در بستگان درجهٔ اول معیار اصلی است.', 'واریانت احتمالاً بیماری‌زا، تشخیص غیرقابل‌تأیید ACM در بستگان درجهٔ اول، مرگ ناگهانی پیش از ۳۵ سالگی در بستگان درجهٔ اول مشکوک به ACM، یا ACM تأییدشده در بستگان درجهٔ دوم معیار فرعی است.']],
]

export default function CriteriaOverview() {
  const { lang } = useLanguage()
  const languageIndex = { de: 0, en: 1, fa: 2 }[lang] ?? 0
  const [title, intro, weighting, scale, phenotypes, rv, rvRule, biv, bivRule, lv, lvRule, other] = overview[lang] || overview.de

  return localizeArvcTree(<TeachingGroups direction={lang === 'fa' ? 'rtl' : 'ltr'}>
    <TeachingGroup id="arvc-diagnostic-comparison" title={title} tone="secondary">
      <div className={styles.criteriaLesson}>
        <p className={styles.criteriaIntro}>{intro}</p>
        <p>{weighting}</p>
        <figure className={styles.criteriaScale}>
          <figcaption>{scale}</figcaption>
          <dl className={styles.criteriaScores}>
            {[
              { points: 2, display: '2', label: 'Möglich', spoken: '2 Punkte' },
              { points: 3, display: '3', label: 'Grenzwertig', spoken: '3 Punkte' },
              { points: 4, display: '≥ 4', label: 'Gesichert', spoken: 'Ab 4 Punkten' },
            ].map(tier => <div key={tier.points} data-tier={tier.points}>
              <dt><bdi dir="ltr" aria-label={tier.spoken}>{tier.display}</bdi></dt>
              <dd>{tier.label}</dd>
              <span className={styles.criteriaMeter} aria-hidden="true">
                {[1, 2, 3, 4].map(segment => <i key={segment} data-filled={segment <= tier.points}/>)}
              </span>
            </div>)}
          </dl>
          <div className={styles.criteriaWeights}>
            <span><strong>Major</strong><span>2 Punkte</span></span>
            <span><strong>Minor</strong><span>1 Punkt</span></span>
          </div>
        </figure>
        <h4 className={styles.subheading}>{phenotypes}</h4>
        <dl className={styles.paduaPatterns}>
          <div><dt>{rv}</dt><dd>{rvRule}</dd></div>
          <div><dt>{biv}</dt><dd>{bivRule}</dd></div>
          <div><dt>{lv}</dt><dd>{lvRule}</dd></div>
        </dl>
        <Link className={styles.paduaCalculatorLink} href={lang === 'de' ? '/padua-rechner' : '/padua-rechner?lang=' + lang}>Zum ACM-Rechner <Icon name="arrow"/></Link>
      </div>
    </TeachingGroup>
    <TeachingGroup id="arvc-diagnostic-mri" title="Major und Minor im MRT" className={styles.mriCriteriaGroup}>
      <div className={styles.criteriaMri}><EtfExplanation lang={lang}/></div>
    </TeachingGroup>
    <TeachingGroup id="arvc-diagnostic-other-categories" title={other}>
      <div className={styles.criteriaGuide}>
        {otherCriteria.map(([number, ...copy]) => <CategoryDisclosure key={number} number={number} title={copy[languageIndex]} description={copy[languageIndex + 3]}/>)}
      </div>
    </TeachingGroup>
  </TeachingGroups>, lang)
}
