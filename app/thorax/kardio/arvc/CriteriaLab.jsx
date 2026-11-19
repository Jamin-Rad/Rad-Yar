'use client'

import { useLanguage } from '@/providers/LanguageProvider'
import { localizeArvcTree } from './lessonTranslations'

import Link from 'next/link'
import { TeachingGroup, TeachingGroups } from '@/components/lesson-template/InteractiveTeachingGroups'
import { Icon } from './LessonVisuals'
import styles from './page.module.css'

const criterionLabels = {
  major: ['Major', 'Major', 'معیار ماژور'],
  minor: ['Minor', 'Minor', 'معیار مینور'],
  rvMajor: ['RV · Major', 'RV · Major', 'بطن راست · معیار ماژور'],
  rvMinor: ['RV · Minor', 'RV · Minor', 'بطن راست · معیار مینور'],
  lvMajor: ['LV · Major', 'LV · Major', 'بطن چپ · معیار ماژور'],
  lvMinor: ['LV · Minor', 'LV · Minor', 'بطن چپ · معیار مینور'],
  bothMinor: ['RV oder LV · Minor', 'RV or LV · Minor', 'بطن راست یا چپ · معیار مینور'],
}

function CategoryDisclosure({ number, title, rows, note, languageIndex }) {
  return <details className={styles.criteriaDisclosure}>
    <summary>
      <span className={styles.criteriaTitle}>{number}</span>
      <strong>{title}</strong>
      <span className={styles.criteriaToggle} aria-hidden="true"/>
    </summary>
    <div className={styles.criteriaContent}>
      <dl className={styles.categoryFindings}>
        {rows.map(([grade, ...findings]) => <div key={grade}>
          <dt>{criterionLabels[grade][languageIndex]}</dt>
          <dd><ul>{findings.map(finding => <li key={finding[0]}>{finding[languageIndex]}</li>)}</ul></dd>
        </div>)}
      </dl>
      {note && <p className={styles.criteriaNote}>{note}</p>}
    </div>
  </details>
}

const ETF_MRI = {
  de: {
    regional: 'Regionale Akinesie, Dyskinesie oder Aneurysma des RV.',
    global: "Globale RV-Dilatation oder verminderte RVEF.",
    rvMinor: "Regionale Akinesie, Dyskinesie oder Aneurysma der freien RV-Wand.",
    lvMinor: "Globale systolische LV-Dysfunktion, mit oder ohne LV-Dilatation.",
    referenceTitle: "CMR-Grenzwerte",
    referenceHeaders: ['Messgröße', 'Frauen', 'Männer', 'Sportler'],
    referenceLimit: 'Die Grenzwerte aus Tabelle 2 des ETF-Berichts sind bei Kindern und älteren Menschen nur eingeschränkt aussagekräftig.',
    confirmation: 'Den LGE-Befund in zwei zueinander senkrechten Ebenen bestätigen.',
    rvLge: "Klar abgrenzbares LGE in mindestens einer Region des RV-Myokards.",
    tricuspid: 'LGE, das auf die Trikuspidalklappe begrenzt ist, zählt nicht.',
    lvPattern: "Nichtischämisches Enhancement im LGE",
    lvMajor: 'Mindestens 3 Segmente. Die Anreicherung kann ringförmig zusammenhängen oder in getrennten Segmenten liegen.',
    lvMinorLge: '1–2 Segmente der freien LV-Wand, des Septums oder beider Bereiche.',
    lvExclusions: 'Punktförmiges oder fleckiges LGE sowie isoliertes LGE an RV-Insertionspunkten zählen nicht.',
    rvMinorContext: "Ohne RV-Dilatation und bei normaler RVEF.",
    lvCineNote: "Für den LV gibt es im Cine nur ein Minor-Kriterium.",
    volumeNote: "Enddiastolisches Volumen auf die Körperoberfläche beziehen (EDV/KOF).",
    efNote: "EF anhand alters- und geschlechtsspezifischer Referenzwerte beurteilen.",
    lvPatternNote: "Streifenförmige Anreicherung subepikardial oder in der mittleren Wandschicht.",
    bothRequired: "Beide Befunde erforderlich",
  },
  en: {
    regional: 'Regional RV akinesia, dyskinesia or aneurysm.',
    global: "Global RV dilatation or reduced RVEF.",
    rvMinor: "Regional akinesia, dyskinesia or aneurysm of the RV free wall.",
    lvMinor: "Global LV systolic dysfunction, with or without LV dilatation.",
    referenceTitle: "CMR thresholds",
    referenceHeaders: ['Measure', 'Women', 'Men', 'Athletes'],
    referenceLimit: 'The thresholds in Table 2 of the ETF report have limited accuracy in children and older adults.',
    confirmation: 'Confirm the LGE finding in two perpendicular planes.',
    rvLge: "Unequivocal LGE in at least one region of the RV myocardium.",
    tricuspid: 'LGE confined to the tricuspid valve does not count.',
    lvPattern: "Non-ischaemic enhancement on LGE images",
    lvMajor: 'At least 3 segments. Enhancement may form a ring or involve separate segments.',
    lvMinorLge: '1–2 segments of the LV free wall, septum or both.',
    lvExclusions: 'Focal or patchy LGE and isolated RV insertion-point LGE are excluded.',
    rvMinorContext: "No RV dilatation and normal RVEF.",
    lvCineNote: "Cine has only a minor criterion for the LV.",
    volumeNote: "Index end-diastolic volume to body surface area (EDV/BSA).",
    efNote: "Interpret EF using age- and sex-specific reference values.",
    lvPatternNote: "Streak-like enhancement in the subepicardium or mid-wall.",
    bothRequired: "Both findings required",
  },
  fa: {
    regional: 'آکینزی، دیسکینزی یا آنوریسم موضعی بطن راست.',
    global: "اتساع کلی بطن راست یا RVEF پایین.",
    rvMinor: "آکینزی، دیسکینزی یا آنوریسم موضعی دیوارهٔ آزاد بطن راست.",
    lvMinor: "اختلال کلی عملکرد سیستولی بطن چپ، با یا بدون اتساع.",
    referenceTitle: "آستانه‌های MRI",
    referenceHeaders: ['شاخص', 'زنان', 'مردان', 'ورزشکاران'],
    referenceLimit: 'آستانه‌های جدول ۲ گزارش ETF در کودکان و سالمندان دقت محدودتری دارند.',
    confirmation: 'یافتهٔ LGE را در دو صفحهٔ تصویربرداری عمود بر هم تأیید کنید.',
    rvLge: "افزایش سیگنال تأخیریِ واضح در دست‌کم یک ناحیه از میوکارد بطن راست.",
    tricuspid: 'افزایش سیگنال محدود به دریچهٔ تریکوسپید در این معیار حساب نمی‌شود.',
    lvPattern: "افزایش سیگنال با الگوی غیرایسکمیک در تصاویر LGE",
    lvMajor: 'درگیری دست‌کم ۳ سگمان. الگو می‌تواند حلقوی یا ناپیوسته باشد.',
    lvMinorLge: 'درگیری ۱ تا ۲ سگمان در دیوارهٔ آزاد بطن چپ، سپتوم یا هر دو.',
    lvExclusions: 'LGE کانونی یا لکه‌ای و LGE محدود به محل اتصال بطن راست به سپتوم در این معیار حساب نمی‌شوند.',
    rvMinorContext: "بدون اتساع بطن راست و با RVEF طبیعی.",
    lvCineNote: "در Cine، بطن چپ فقط معیار مینور دارد.",
    volumeNote: "حجم پایان دیاستول را بر سطح بدن تقسیم کنید (EDV/BSA).",
    efNote: "RVEF یا کسر جهشی بطن راست، درصدی از حجم خون بطن راست در پایان دیاستول است که در هر ضربان از آن خارج می‌شود. این مقدار بر اساس مقادیر مرجع متناسب با سن و جنس تفسیر می‌شود.",
    lvPatternNote: "افزایش سیگنال خطی زیر اپیکارد یا در لایهٔ میانی دیواره.",
    bothRequired: "هر دو شرط لازم‌اند",
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
            <div><dt>Major</dt><dd className={styles.cineConditions}>
              <p>{copy.regional}</p>
              <span className={styles.cinePlus} role="img" aria-label={copy.bothRequired}>+</span>
              <p>{copy.global}</p>
            </dd></div>
            <div><dt>Minor</dt><dd className={styles.cineConditions}>
              <p>{copy.rvMinor}</p>
              <p className={styles.criteriaNote}>{copy.rvMinorContext}</p>
            </dd></div>
          </dl>
        </div>
        <div>
          <h5>Linker Ventrikel (LV)</h5>
          <dl className={styles.paduaGrades}><div><dt>Minor</dt><dd>{copy.lvMinor}</dd></div></dl>
        </div>
      </div>
      <ul className={styles.mriNotes}>
        <li>{copy.lvCineNote}</li>
        <li>{copy.volumeNote}</li>
        <li>{copy.efNote}</li>
      </ul>
      <details className={styles.cmrDisclosure}>
        <summary><span>{copy.referenceTitle}</span><span className={styles.cmrToggle} aria-hidden="true"/></summary>
        <div className={styles.cmrContent}>
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
      <div className={styles.paduaChambers}>
        <div>
          <h5>Rechter Ventrikel (RV)</h5>
          <dl className={styles.paduaGrades}><div><dt>Minor</dt><dd>{copy.rvLge}</dd></div></dl>
          <ul className={styles.mriNotes}><li>{copy.tricuspid}</li></ul>
        </div>
        <div>
          <h5>Linker Ventrikel (LV)</h5>
          <p>{copy.lvPattern}</p>
          <dl className={styles.paduaGrades}>
            <div><dt>Major</dt><dd>{copy.lvMajor}</dd></div>
            <div><dt>Minor</dt><dd>{copy.lvMinorLge}</dd></div>
          </dl>
          <ul className={styles.mriNotes}>
            <li>{copy.lvPatternNote}</li>
            <li>{copy.lvExclusions}</li>
          </ul>
        </div>
      </div>
      <ul className={styles.mriNotes}><li>{copy.confirmation}</li></ul>
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
    'Diagnostische Befunde ergänzend zum MRT',
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
    'Diagnostic findings that complement MRI',
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
    'برای تشخیص فرم چپ‌غالب، الگوی غیرایسکمیک LGE در بطن چپ باید معیار ساختاری ماژور یا مینور ETF را برآورده کند. اگر مجموع یافته‌ها کافی باشد، وجود واریانت ژنتیکی الزامی نیست.',
    'یافته‌های تشخیصی در کنار MRI',
  ],
}

const otherCriteria = [
  ['II', ["Endomyokardbiopsie","Endomyocardial biopsy","بیوپسی اندومیوکارد"], [
    ['major',
      ["Fibrotischer Ersatz von Myokard in mindestens einer Biopsieprobe, mit oder ohne Fett.","Fibrous replacement of myocardium in at least one biopsy sample, with or without fat.","جایگزینی میوکارد با بافت فیبروزی، با یا بدون چربی، در دست‌کم یک نمونهٔ بیوپسی."],
    ],
  ], ["LGE und Biopsie liefern unterschiedliche Befunde derselben Kategorie (II). Eindeutiges RV-LGE erfüllt ein Minor-Kriterium, fibrotischer Ersatz in der Biopsie ein Major-Kriterium. Erfüllt das MRT bereits ein strukturelles Kriterium, ist eine Biopsie allein für dessen Wertung entbehrlich. In Kategorie II zählt nur das stärkste Kriterium.","LGE and biopsy provide different evidence within the same category (II). Unequivocal RV LGE meets a minor criterion, while fibrous replacement on biopsy meets a major criterion. A structural criterion met on MRI can be counted without biopsy. Count only the strongest criterion in category II.","LGE و بیوپسی دو نوع یافته در دستهٔ II هستند. LGE واضح در میوکارد بطن راست معیار مینور است و جایگزینی میوکارد با بافت فیبروزی در بیوپسی معیار ماژور. اگر یافتهٔ MRI یکی از معیارهای ساختاری را برآورده کند، برای امتیاز دادن به همان یافته نیازی به بیوپسی نیست. در دستهٔ II فقط قوی‌ترین معیار حساب می‌شود."]],
  ['III', ["Repolarisation im EKG","ECG repolarization","رپلاریزاسیون در نوار قلب"], [
    ['rvMajor',
      ["T-Negativierung in V1–V3 oder weiter ab 14 Jahren, ohne kompletten Rechtsschenkelblock und ohne vorangehende J-Punkt- oder ST-Hebung.","T-wave inversion in V1–V3 or beyond at age 14 or older, without complete RBBB or preceding J-point or ST elevation.","وارونگی موج T در V1 تا V3 یا فراتر از آن از ۱۴ سالگی، بدون بلوک کامل شاخهٔ راست و بدون بالارفتن پیشین نقطهٔ J یا قطعهٔ ST."],
    ],
    ['rvMinor',
      ["T-Negativierung in V1–V2 bei Männern ab 14 Jahren ohne Rechtsschenkelblock und ohne vorangehende J-Punkt- oder ST-Hebung.","T-wave inversion in V1–V2 in males aged 14 or older without RBBB or preceding J-point or ST elevation.","وارونگی موج T در V1 و V2 در مردان از ۱۴ سالگی، بدون بلوک شاخهٔ راست و بدون بالارفتن پیشین نقطهٔ J یا قطعهٔ ST."],
      ["T-Negativierung über V3 hinaus bei komplettem Rechtsschenkelblock oder unter 14 Jahren.","T-wave inversion beyond V3 with complete RBBB or below age 14.","وارونگی موج T فراتر از V3 در صورت بلوک کامل شاخهٔ راست یا سن زیر ۱۴ سال."],
    ],
    ['lvMinor',
      ["T-Negativierung in V4–V6 ohne kompletten Linksschenkelblock.","T-wave inversion in V4–V6 without complete LBBB.","وارونگی موج T در V4 تا V6 بدون بلوک کامل شاخهٔ چپ."],
    ],
  ]],
  ['IV', ["Depolarisation im EKG","ECG depolarization","دپلاریزاسیون در نوار قلب"], [
    ['rvMinor',
      ["Reproduzierbare Epsilon-Welle in V1–V3.","Reproducible epsilon wave in V1–V3.","موج اپسیلون تکرارپذیر در V1 تا V3."],
      ["Terminale Aktivierungsdauer ≥ 55 ms in V1, V2 oder V3 ohne kompletten Rechtsschenkelblock.","Terminal activation duration ≥55 ms in V1, V2 or V3 without complete RBBB.","مدت فعال‌سازی انتهایی دست‌کم ۵۵ میلی‌ثانیه در یکی از لیدهای V1 تا V3، بدون بلوک کامل شاخهٔ راست."],
    ],
    ['lvMajor',
      ["QRS-Amplitude < 0,5 mV in allen Extremitätenableitungen nach Ausschluss anderer Ursachen der Niedervoltage.","Peak-to-peak QRS amplitude <0.5 mV in all limb leads after excluding other causes of low voltage.","دامنهٔ قله‌به‌قلهٔ QRS کمتر از ۰٫۵ میلی‌ولت در تمام لیدهای اندامی، پس از رد سایر علل کاهش ولتاژ."],
    ],
  ]],
  ['V', ["Ventrikuläre Arrhythmien","Ventricular arrhythmias","آریتمی‌های بطنی"], [
    ['rvMajor',
      ["> 500 ventrikuläre Extrasystolen pro 24 Stunden oder VT, jeweils mit Linksschenkelblockmorphologie und nichtinferiorer Achse.","More than 500 premature ventricular complexes per 24 hours or VT, in either case with LBBB morphology and a non-inferior axis.","بیش از ۵۰۰ اکستراسیستول بطنی در ۲۴ ساعت یا تاکی‌کاردی بطنی (VT)، در هر دو حالت با الگوی بلوک شاخهٔ چپ و محور غیرتحتانی."],
    ],
    ['rvMinor',
      ["Dasselbe Muster mit inferiorer Achse (RVOT-Muster).","The same findings with an inferior axis (RVOT pattern).","همان یافته‌ها با محور تحتانی (الگوی مسیر خروجی بطن راست)."],
    ],
    ['lvMinor',
      ["> 500 ventrikuläre Extrasystolen pro 24 Stunden, belastungsinduzierte Extrasystolen oder VT, jeweils mit nichtfaszikulärer Rechtsschenkelblockmorphologie.","More than 500 premature ventricular complexes per 24 hours, exercise-induced ventricular ectopy, or VT, in each case with non-fascicular RBBB morphology.","بیش از ۵۰۰ اکستراسیستول بطنی در ۲۴ ساعت، اکستراسیستول بطنی ناشی از فعالیت یا VT، در هر حالت با الگوی بلوک شاخهٔ راست غیرفاسیکولار."],
    ],
    ['bothMinor',
      ["Überlebter Herzstillstand durch Kammerflimmern oder anhaltende VT unbekannter Morphologie.","Resuscitated cardiac arrest due to ventricular fibrillation or sustained VT of unknown morphology.","ایست قلبی احیاشده بر اثر فیبریلاسیون بطنی یا VT پایدار با مورفولوژی نامشخص."],
    ],
  ]],
  ['VI', ["Familienanamnese und Genetik","Family history and genetics","سابقهٔ خانوادگی و ژنتیک"], [
    ['major',
      ["Pathogene ACM-Genvariante.","Pathogenic ACM-associated variant.","واریانت بیماری‌زای مرتبط با ACM."],
      ["Gesicherte ACM bei einem Verwandten ersten Grades.","Confirmed ACM in a first-degree relative.","ACM تأییدشده در بستگان درجهٔ اول."],
    ],
    ['minor',
      ["Wahrscheinlich pathogene ACM-Genvariante.","Likely pathogenic ACM-associated variant.","واریانت احتمالاً بیماری‌زای مرتبط با ACM."],
      ["Nicht überprüfbare ACM-Diagnose oder plötzlicher Tod vor dem 35. Lebensjahr bei ACM-Verdacht bei einem Verwandten ersten Grades.","Unverifiable ACM diagnosis or sudden death before age 35 with suspected ACM in a first-degree relative.","تشخیص غیرقابل‌تأیید ACM یا مرگ ناگهانی پیش از ۳۵ سالگی با شک به ACM در بستگان درجهٔ اول."],
      ["Gesicherte ACM bei einem Verwandten zweiten Grades.","Confirmed ACM in a second-degree relative.","ACM تأییدشده در بستگان درجهٔ دوم."],
    ],
  ]],
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
        {otherCriteria.map(([number, title, rows, note]) => <CategoryDisclosure key={number} number={number} title={title[languageIndex]} rows={rows} note={note?.[languageIndex]} languageIndex={languageIndex}/>)}
      </div>
    </TeachingGroup>
  </TeachingGroups>, lang)
}
