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
  de: [
    'Regionale Akinesie, Dyskinesie oder Aneurysma mit globaler RV-Dilatation oder verminderter RVEF.',
    'Regionale Akinesie, Dyskinesie oder Aneurysma der freien RV-Wand.',
    'Globale systolische LV-Dysfunktion mit oder ohne LV-Dilatation.',
    'Eindeutiges RV-LGE in mindestens einer Region außerhalb der Trikuspidalklappe.',
    'Subepikardiales oder mittmyokardiales Streifen-LGE in mindestens 3 Segmenten, ringförmig oder diskontinuierlich.',
    'Subepikardiales oder mittmyokardiales Streifen-LGE in 1–2 Segmenten der freien Wand oder des Septums.',
    'Das jeweilige LGE-Muster in zwei orthogonalen Ebenen bestätigen.',
  ],
  en: [
    'Regional akinesia, dyskinesia or aneurysm with global RV dilatation or reduced RVEF.',
    'Regional akinesia, dyskinesia or aneurysm of the RV free wall.',
    'Global LV systolic dysfunction with or without LV dilatation.',
    'Unequivocal RV LGE in at least one region outside the tricuspid valve.',
    'Subepicardial or midwall stria-pattern LGE in at least 3 segments, ring-like or discontinuous.',
    'Subepicardial or midwall stria-pattern LGE in 1–2 segments of the free wall or septum.',
    'Confirm the LGE pattern in two orthogonal views.',
  ],
  fa: [
    'آکینزی، دیسکینزی یا آنوریسم موضعی همراه اتساع کلی بطن راست یا کاهش RVEF.',
    'آکینزی، دیسکینزی یا آنوریسم موضعی دیوارهٔ آزاد بطن راست.',
    'اختلال کلی سیستولی بطن چپ با یا بدون اتساع.',
    'LGE قطعی در دست‌کم یک ناحیه از بطن راست خارج از دریچهٔ تریکوسپید.',
    'LGE نواری زیر اپیکارد یا میان‌میوکارد در دست‌کم ۳ سگمان، حلقوی یا ناپیوسته.',
    'LGE نواری زیر اپیکارد یا میان‌میوکارد در ۱ تا ۲ سگمان از دیوارهٔ آزاد یا سپتوم.',
    'الگوی LGE را در دو نمای عمود بر هم تأیید کنید.',
  ],
}

function EtfExplanation({ lang }) {
  const [rvMajor, rvMinor, lvMinor, rvLge, lvLgeMajor, lvLgeMinor, confirmation] = ETF_MRI[lang] || ETF_MRI.de

  return localizeArvcTree(<div className={styles.paduaMri}>
    <section aria-labelledby="etf-cine">
      <h4 id="etf-cine" className={styles.mrtTopic}>Cine · Form und Funktion (I)</h4>
      <div className={styles.paduaChambers}>
        <div>
          <h5>Rechter Ventrikel (RV)</h5>
          <dl className={styles.paduaGrades}>
            <div><dt>Major</dt><dd>{rvMajor}</dd></div>
            <div><dt>Minor</dt><dd>{rvMinor}</dd></div>
          </dl>
        </div>
        <div>
          <h5>Linker Ventrikel (LV)</h5>
          <dl className={styles.paduaGrades}><div><dt>Minor</dt><dd>{lvMinor}</dd></div></dl>
        </div>
      </div>
      <p className={styles.criteriaNote}>Volumen und EF anhand geeigneter Referenzwerte für die Methode, das Alter und das Geschlecht beurteilen. Beim Volumen auch die Körperoberfläche berücksichtigen.</p>
    </section>
    <section aria-labelledby="etf-lge">
      <h4 id="etf-lge" className={styles.mrtTopic}>LGE · Myokardgewebe (II)</h4>
      <p>{confirmation}</p>
      <div className={styles.paduaChambers}>
        <div>
          <h5>Rechter Ventrikel (RV)</h5>
          <dl className={styles.paduaGrades}><div><dt>Minor</dt><dd>{rvLge}</dd></div></dl>
        </div>
        <div>
          <h5>Linker Ventrikel (LV)</h5>
          <dl className={styles.paduaGrades}>
            <div><dt>Major</dt><dd>{lvLgeMajor}</dd></div>
            <div><dt>Minor</dt><dd>{lvLgeMinor}</dd></div>
          </dl>
          <p className={styles.criteriaNote}>Isoliertes LGE an RV-Insertionspunkten bleibt unberücksichtigt.</p>
        </div>
      </div>
    </section>
  </div>, lang)
}

const overview = {
  de: [
    'Diagnose nach ETF 2023',
    'Die European Task Force kombiniert Befunde aus sechs Kategorien. Neben Cine und LGE zählen je nach Befund auch Histologie, EKG, ventrikuläre Arrhythmien, Familienanamnese und Genetik.',
    'Pro Kategorie wird das stärkste passende Kriterium gewertet. Major entspricht 2 Punkten, Minor 1 Punkt.',
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
    'Count the strongest applicable criterion in each category. Major is worth 2 points and minor 1 point.',
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
    'کارگروه اروپایی یافته‌های شش دسته را با هم ارزیابی می‌کند. در کنار Cine و LGE، بافت‌شناسی، نوار قلب، آریتمی‌های بطنی، سابقهٔ خانوادگی و ژنتیک هم می‌توانند در تشخیص نقش داشته باشند.',
    'در هر دسته قوی‌ترین معیارِ برآورده‌شده حساب می‌شود. معیار اصلی ۲ امتیاز و معیار فرعی ۱ امتیاز دارد.',
    'رده‌های تشخیصی بر اساس ETF 2023',
    'پیش‌شرط‌های هر فنوتیپ',
    'راست‌غالب (ARVC)',
    'دست‌کم یک معیار بطن راست از دستهٔ شکل و عملکرد (I) یا بافت میوکارد (II) لازم است.',
    'دوبطنی',
    'هر بطن باید دست‌کم یک معیار از دستهٔ I یا II داشته باشد.',
    'چپ‌غالب (ALVC)',
    'وجود LGE واجد شرایط در بطن چپ لازم است و می‌تواند معیار اصلی یا فرعی باشد. با ترکیب کافی یافته‌ها، وجود واریانت ژنتیکی الزامی نیست.',
    'معیارهای خارج از MRI',
  ],
}

const otherCriteria = [
  ['II', 'Histologie', 'Histology', 'بافت‌شناسی',
    ['Major: fibrotischer Ersatz von Myokard in mindestens einer Biopsieprobe, mit oder ohne Fett.'],
    ['Major: fibrous replacement of myocardium in at least one biopsy sample, with or without fat.'],
    ['معیار اصلی شامل جایگزینی فیبروزی میوکارد در دست‌کم یک نمونهٔ بیوپسی، با یا بدون چربی است.']],
  ['III', 'Repolarisation im EKG', 'ECG repolarization', 'رپلاریزاسیون در نوار قلب',
    ['RV Major: T-Negativierung in V1–V3 oder weiter ab 14 Jahren, ohne kompletten Rechtsschenkelblock und ohne vorangehende J-Punkt- oder ST-Hebung.', 'RV Minor: V1–V2 bei Männern ab 14 Jahren ohne Rechtsschenkelblock und ohne vorangehende J-Punkt- oder ST-Hebung. T-Negativierung über V3 hinaus zählt bei komplettem Rechtsschenkelblock oder unter 14 Jahren ebenfalls als Minor.', 'LV Minor: T-Negativierung in V4–V6 ohne kompletten Linksschenkelblock.'],
    ['RV major: T-wave inversion in V1–V3 or beyond at age 14 or older, without complete RBBB or preceding J-point or ST elevation.', 'RV minor: inversion in V1–V2 in males aged 14 or older without RBBB or preceding J-point or ST elevation. Inversion beyond V3 also counts with complete RBBB or below age 14.', 'LV minor: inversion in V4–V6 without complete LBBB.'],
    ['معیار اصلی بطن راست شامل وارونگی موج T در V1 تا V3 یا فراتر از آن از ۱۴ سالگی، بدون بلوک کامل شاخهٔ راست و بدون بالارفتن پیشین نقطهٔ J یا قطعهٔ ST است.', 'وارونگی در V1 و V2 در مردان از ۱۴ سالگی، بدون بلوک شاخهٔ راست و بدون بالارفتن پیشین J یا ST، معیار فرعی بطن راست است. وارونگی فراتر از V3 در صورت بلوک کامل شاخهٔ راست یا سن زیر ۱۴ سال هم معیار فرعی است.', 'وارونگی T در V4 تا V6 بدون بلوک کامل شاخهٔ چپ معیار فرعی بطن چپ است.']],
  ['IV', 'Depolarisation im EKG', 'ECG depolarization', 'دپلاریزاسیون در نوار قلب',
    ['RV Minor: reproduzierbare Epsilon-Welle in V1–V3 oder terminale Aktivierungsdauer ≥ 55 ms in V1, V2 oder V3 ohne kompletten Rechtsschenkelblock.', 'LV Major: QRS-Amplitude < 0,5 mV in allen Extremitätenableitungen, wenn andere Ursachen der Niedervoltage ausgeschlossen sind.'],
    ['RV minor: reproducible epsilon wave in V1–V3 or terminal activation duration ≥55 ms in V1, V2 or V3 without complete RBBB.', 'LV major: QRS amplitude <0.5 mV in all limb leads after other causes of low voltage have been excluded.'],
    ['موج اپسیلون تکرارپذیر در V1 تا V3 یا مدت فعال‌سازی انتهایی دست‌کم ۵۵ میلی‌ثانیه در یکی از این لیدها بدون بلوک کامل شاخهٔ راست، معیار فرعی بطن راست است.', 'دامنهٔ QRS کمتر از ۰٫۵ میلی‌ولت در همهٔ لیدهای اندامی پس از رد سایر علل ولتاژ پایین، معیار اصلی بطن چپ است.']],
  ['V', 'Ventrikuläre Arrhythmien', 'Ventricular arrhythmias', 'آریتمی‌های بطنی',
    ['RV Major: > 500 ventrikuläre Extrasystolen in 24 Stunden oder anhaltende bzw. nichtanhaltende VT mit Linksschenkelblockmorphologie und nichtinferiorer Achse. Bei inferiorer Achse zählt dieses Muster als RV Minor.', 'LV Minor: häufige oder belastungsinduzierte ventrikuläre Extrasystolen oder VT mit nichtfaszikulärer Rechtsschenkelblockmorphologie.', 'Minor: überlebter Herzstillstand durch Kammerflimmern oder anhaltende VT unbekannter Morphologie.'],
    ['RV major: >500 premature ventricular complexes in 24 hours or sustained or nonsustained VT with LBBB morphology and a non-inferior axis. The same findings with an inferior axis count as RV minor.', 'LV minor: frequent or exercise-induced premature ventricular complexes, or VT, with non-fascicular RBBB morphology.', 'Minor: resuscitated cardiac arrest due to ventricular fibrillation or sustained VT of unknown morphology.'],
    ['بیش از ۵۰۰ ضربان زودرس بطنی در ۲۴ ساعت، یا VT پایدار یا ناپایدار، با الگوی بلوک شاخهٔ چپ و محور غیرتحتانی معیار اصلی بطن راست است. همین الگو با محور تحتانی معیار فرعی است.', 'ضربان‌های زودرس بطنی مکرر یا ناشی از ورزش، یا VT، با الگوی بلوک شاخهٔ راست غیرفاسیکولار معیار فرعی بطن چپ هستند.', 'ایست قلبی احیاشده بر اثر فیبریلاسیون بطنی یا VT پایدار با مورفولوژی نامشخص معیار فرعی است.']],
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
            <div><dt><bdi dir="ltr" aria-label="2 Punkte">2</bdi></dt><dd>Möglich</dd></div>
            <div><dt><bdi dir="ltr" aria-label="3 Punkte">3</bdi></dt><dd>Grenzwertig</dd></div>
            <div><dt><bdi dir="ltr" aria-label="Ab 4 Punkten">≥ 4</bdi></dt><dd>Gesichert</dd></div>
          </dl>
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
