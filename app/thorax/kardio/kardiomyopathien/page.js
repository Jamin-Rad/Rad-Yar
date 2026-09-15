'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import { useLessonReadStatus } from '@/hooks/useLessonReadStatus'
import InProgressBanner from '@/components/InProgressBanner'
import styles from './page.module.css'

const L = (de, en, fa) => ({ de, en, fa })

const copy = {
  de: { chapter: 'Kardiale Bildgebung / Kardio-MRT', back: 'Zurück zum Thorax', toc: 'Im Überblick', overview: 'Kurzüberblick', phenotype: 'Phänotypen', protocol: 'MRT lesen', atlas: 'Bildatlas', practice: 'Muster erkennen', sources: 'Quellen', definition: 'Definition', clinic: 'Klinik', class: 'ESC-Phänotypen', clue: 'MRT-Leitbefund', cine: 'Cine / Morphologie', lge: 'LGE / Gewebe', pitfall: 'Wichtig', reveal: 'Befund zeigen', hide: 'Befund verbergen', sample: 'Synthetische Lehrabbildung · kein Patientenbild', imageHint: 'Bild antippen zum Vergrößern', mark: 'Als gelesen markieren', read: 'Als gelesen markiert', login: 'Bitte anmelden, um den Lernfortschritt zu speichern.', signIn: 'Anmelden', answer: 'Antwort wählen', correct: 'Richtig', incorrect: 'Noch einmal ansehen', reset: 'Zurücksetzen' },
  en: { chapter: 'Cardiac imaging / cardiac MRI', back: 'Back to thorax', toc: 'At a glance', overview: 'Quick overview', phenotype: 'Phenotypes', protocol: 'Reading MRI', atlas: 'Image atlas', practice: 'Recognise the pattern', sources: 'Sources', definition: 'Definition', clinic: 'Clinical signs', class: 'ESC phenotypes', clue: 'Key MRI clue', cine: 'Cine / morphology', lge: 'LGE / tissue', pitfall: 'Important', reveal: 'Show finding', hide: 'Hide finding', sample: 'Synthetic teaching image · not a patient scan', imageHint: 'Tap image to enlarge', mark: 'Mark as read', read: 'Marked as read', login: 'Please sign in to save learning progress.', signIn: 'Sign in', answer: 'Choose an answer', correct: 'Correct', incorrect: 'Review the pattern', reset: 'Reset' },
  fa: { chapter: 'تصویربرداری قلبی / MRI قلب', back: 'بازگشت به قفسه سینه', toc: 'در یک نگاه', overview: 'مرور کوتاه', phenotype: 'فنوتیپ‌ها', protocol: 'خواندن MRI', atlas: 'گالری تصاویر', practice: 'تشخیص الگو', sources: 'منابع', definition: 'تعریف', clinic: 'علائم بالینی', class: 'فنوتیپ‌های ESC', clue: 'نشانهٔ کلیدی MRI', cine: 'Cine / شکل و عملکرد', lge: 'LGE / بافت', pitfall: 'نکتهٔ مهم', reveal: 'نمایش یافته', hide: 'پنهان‌کردن یافته', sample: 'تصویر آموزشیِ ساخته‌شده · تصویر بیمار نیست', imageHint: 'برای بزرگ‌نمایی روی تصویر بزنید', mark: 'علامت‌گذاری به‌عنوان خوانده‌شده', read: 'خوانده‌شده', login: 'برای ذخیرهٔ پیشرفت آموزشی وارد حساب شوید.', signIn: 'ورود', answer: 'یک پاسخ انتخاب کنید', correct: 'درست', incorrect: 'الگو را دوباره بررسی کنید', reset: 'شروع دوباره' },
}

const lesson = {
  title: L('Kardiomyopathien im Kardio-MRT', 'Cardiomyopathies on cardiac MRI', 'کاردیومیوپاتی‌ها در MRI قلب'),
  subtitle: L('Phänotyp → Funktion → Gewebe: fünf Formen, sechs MRT-Bilder und ein interaktiver Mustervergleich.', 'Phenotype → function → tissue: five forms, six MRI images and an interactive pattern comparison.', 'فنوتیپ ← عملکرد ← بافت: پنج گروه اصلی، شش تصویر MRI و مقایسهٔ تعاملی الگوها.'),
  definition: L('Erkrankungen des Herzmuskels mit struktureller und/oder funktioneller Abweichung, die nicht allein durch KHK, Hypertonie, Klappenfehler oder angeborene Herzfehler erklärt wird.', 'Heart muscle diseases with structural and/or functional abnormality not explained solely by coronary disease, hypertension, valve disease or congenital heart disease.', 'بیماری عضلهٔ قلب با تغییر ساختار و/یا عملکرد که صرفاً با بیماری کرونر، فشارخون، بیماری دریچه‌ای یا نقص مادرزادی توضیح داده نمی‌شود.'),
  clinic: L('Dyspnoe, Leistungsminderung, Palpitationen, Synkope; gelegentlich asymptomatisch.', 'Dyspnoea, reduced exercise tolerance, palpitations or syncope; sometimes asymptomatic.', 'تنگی نفس، کاهش تحمل فعالیت، تپش قلب یا سنکوپ؛ گاهی بدون علامت.'),
  classNote: L('Die ESC beschreibt HCM, DCM, nicht-dilatierte LV-Kardiomyopathie (NDLVC), arrhythmogene RV-Kardiomyopathie (ARVC) und restriktive Kardiomyopathie (RCM) als morphologisch-funktionelle Phänotypen. Ursache und Phänotyp sind getrennt zu beurteilen.', 'ESC describes HCM, DCM, non-dilated LV cardiomyopathy (NDLVC), arrhythmogenic RV cardiomyopathy (ARVC) and restrictive cardiomyopathy (RCM) as morphological/functional phenotypes. Determine phenotype and cause separately.', 'در طبقه‌بندی ESC پنج فنوتیپ HCM، DCM، کاردیومیوپاتی بطن چپ بدون اتساع (NDLVC)، نوع آریتموژنیک بطن راست (ARVC) و نوع محدودکننده (RCM) مطرح‌اند. فنوتیپ و علت را جداگانه ارزیابی کنید.'),
  lgeRule: L('Subendokardiales/transmurales LGE im Koronarterritorium spricht zunächst für Ischämie. Mid-wall- oder subepikardiales LGE ist eher nichtischämisch; das Muster allein beweist keine bestimmte Ursache.', 'Subendocardial/transmural LGE in a coronary territory first suggests ischaemia. Mid-wall or subepicardial LGE is more often non-ischaemic; pattern alone does not prove a specific cause.', 'LGE ساب‌اندوکاردیال یا تمام‌جداری در قلمرو کرونری ابتدا به نفع ایسکمی است. LGE میدوال یا ساب‌اپیکاردیال بیشتر غیرایسکمیک است؛ الگو به‌تنهایی علت قطعی را ثابت نمی‌کند.'),
}

const phenotypes = [
  { id: 'hcm', short: 'HCM', name: L('Hypertroph', 'Hypertrophic', 'هیپرتروفیک'), shape: L('Verdickte LV-Wand ohne ausreichende Belastungserklärung.', 'Thick LV wall without sufficient loading explanation.', 'ضخیم‌شدن دیوارهٔ بطن چپ بدون علت بارگذاری کافی.'), cine: L('Asymmetrische Septumhypertrophie ist häufig; LVOT-Obstruktion und systolische Mitralbewegung (SAM) prüfen.', 'Asymmetric septal thickening is common; assess LVOT obstruction and systolic anterior motion (SAM).', 'هیپرتروفی نامتقارن سپتوم شایع است؛ انسداد خروجی بطن چپ و SAM دریچهٔ میترال را بررسی کنید.'), tissue: L('Fleckiges LGE in hypertrophierten Segmenten und an RV-Insertionen; LGE-Ausmaß dokumentieren.', 'Patchy LGE in hypertrophied segments and at RV insertion points; record LGE extent.', 'LGE لکه‌ای در قطعات ضخیم‌شده و نقاط اتصال بطن راست؛ گسترهٔ LGE را گزارش کنید.'), cave: L('Nicht jede LV-Hypertrophie ist HCM: Hypertonie, Aortenstenose, Amyloidose und Fabry ausschließen.', 'Not all LV hypertrophy is HCM: consider hypertension, aortic stenosis, amyloidosis and Fabry.', 'هر هیپرتروفی بطن چپ HCM نیست؛ فشارخون، تنگی آئورت، آمیلوئیدوز و فابری را در نظر بگیرید.'), image: '/cardiomyopathy/hcm.webp' },
  { id: 'dcm', short: 'DCM', name: L('Dilatativ', 'Dilated', 'اتساعی'), shape: L('LV-Dilatation mit systolischer Dysfunktion, nicht durch alleinige Belastung erklärt.', 'LV dilatation with systolic dysfunction not explained solely by loading conditions.', 'اتساع بطن چپ همراه اختلال عملکرد سیستولی که صرفاً با بارگذاری توضیح داده نمی‌شود.'), cine: L('LV-Volumina ↑, LVEF ↓; RV-Funktion und funktionelle Mitralinsuffizienz mitbeurteilen.', 'LV volumes ↑, LVEF ↓; also assess RV function and functional mitral regurgitation.', 'حجم‌های بطن چپ ↑ و LVEF ↓؛ عملکرد بطن راست و نارسایی عملکردی میترال را نیز بررسی کنید.'), tissue: L('Typisch nichtischämisches mid-wall-LGE als Septumstreifen; fehlendes LGE schließt DCM nicht aus.', 'A non-ischaemic mid-wall septal LGE stripe is characteristic; absent LGE does not exclude DCM.', 'الگوی شاخص LGE میدوال به‌شکل نوار سپتوم است؛ نبود LGE، DCM را رد نمی‌کند.'), cave: L('Koronarer Infarkt, Klappenfehler und andere reversible Ursachen müssen geprüft werden.', 'Check for infarction, valve disease and potentially reversible causes.', 'انفارکت کرونری، بیماری دریچه‌ای و علل قابل‌برگشت را بررسی کنید.'), image: '/cardiomyopathy/dcm.webp' },
  { id: 'ndlvc', short: 'NDLVC', name: L('Nicht-dilatierter LV', 'Non-dilated LV', 'بطن چپِ بدون اتساع'), shape: L('Nichtischämische LV-Narbe/Fettersatz bei fehlender LV-Dilatation, ggf. mit regionaler/globaler Dysfunktion.', 'Non-ischaemic LV scar/fat replacement without LV dilatation, possibly with regional/global dysfunction.', 'اسکار یا جایگزینی چربی غیرایسکمیک در بطن چپ بدون اتساع؛ با یا بدون اختلال عملکرد موضعی/کلی.'), cine: L('LV kann normal groß sein; regionale Bewegung und EF sorgfältig prüfen.', 'LV size can be normal; carefully assess regional motion and EF.', 'اندازهٔ بطن چپ ممکن است طبیعی باشد؛ حرکت موضعی و EF را دقیق ببینید.'), tissue: L('Nichtischämisches LGE, oft subepikardial/mid-wall; Verteilung und Ausmaß wichtiger als die Kammergröße.', 'Non-ischaemic LGE, often subepicardial/mid-wall; distribution and extent matter more than chamber size.', 'LGE غیرایسکمیک، اغلب ساب‌اپیکاردیال یا میدوال؛ محل و گسترهٔ آن مهم است.'), cave: L('Myokarditis und kardiale Sarkoidose können ein ähnliches Narbenmuster erzeugen.', 'Myocarditis and cardiac sarcoidosis can give a similar scar pattern.', 'میوکاردیت و سارکوئیدوز قلبی هم می‌توانند الگوی اسکار مشابه ایجاد کنند.'), image: '/cardiomyopathy/ndlvc.webp' },
  { id: 'arvc', short: 'ARVC', name: L('Arrhythmogener RV', 'Arrhythmogenic RV', 'آریتموژنیکِ بطن راست'), shape: L('RV-betonte arrhythmogene Kardiomyopathie; auch biventrikuläre/LV-betonte Formen existieren.', 'RV-predominant arrhythmogenic cardiomyopathy; biventricular and LV-predominant forms also occur.', 'درگیری آریتموژنیک غالبِ بطن راست؛ شکل‌های دو بطنی یا غالب بطن چپ نیز وجود دارند.'), cine: L('RV-Dilatation/Dysfunktion plus regionale Akinesie, Dyskinesie oder Aneurysma sind zentrale Befunde.', 'RV dilatation/dysfunction with regional akinesia, dyskinesia or aneurysm are central findings.', 'اتساع یا اختلال عملکرد بطن راست همراه آکینزی، دیسکینزی یا آنوریسم موضعی، یافتهٔ اصلی است.'), tissue: L('RV-LGE kann vorkommen; wegen der dünnen RV-Wand ist es schwierig und kein isoliertes Diagnosekriterium.', 'RV LGE may occur, but the thin RV wall makes it difficult to assess and it is not a stand-alone criterion.', 'LGE بطن راست ممکن است دیده شود، اما دیوارهٔ نازک بطن راست ارزیابی آن را دشوار می‌کند و به‌تنهایی معیار تشخیصی نیست.'), cave: L('Nicht aus Fett-Signal allein diagnostizieren; CMR-Befunde mit EKG, Arrhythmien und Familienanamnese kombinieren.', 'Do not diagnose from fat signal alone; combine CMR with ECG, arrhythmias and family history.', 'از سیگنال چربی به‌تنهایی تشخیص ندهید؛ MRI را با ECG، آریتمی و سابقهٔ خانوادگی جمع‌بندی کنید.'), image: '/cardiomyopathy/arvc.webp' },
  { id: 'rcm', short: 'RCM', name: L('Restriktiv', 'Restrictive', 'محدودکننده'), shape: L('Restriktive Füllung bei normalen/kleinen Ventrikeln; Vorhöfe oft vergrößert.', 'Restrictive filling with normal/small ventricles; atria are often enlarged.', 'پرشدن محدودکننده با بطن‌های طبیعی یا کوچک؛ دهلیزها اغلب بزرگ‌اند.'), cine: L('Biatriale Vergrößerung, nicht-dilatierte Ventrikel; Perikardkonstriktion als Differenzialdiagnose prüfen.', 'Biatrial enlargement with non-dilated ventricles; assess constrictive pericarditis as a differential.', 'بزرگی هر دو دهلیز با بطن‌های بدون اتساع؛ پریکاردیت کنستریکتیو را در افتراق بررسی کنید.'), tissue: L('LGE hängt von der Ursache ab. Bei Amyloidose: diffuse subendokardiale/transmurale Anreicherung, schwieriges Nulling, T1/ECV ↑.', 'LGE depends on cause. In amyloidosis: diffuse subendocardial/transmural enhancement, difficult nulling, elevated T1/ECV.', 'LGE وابسته به علت است. در آمیلوئیدوز: enhancement منتشر ساب‌اندوکاردیال یا تمام‌جداری، دشواری nulling و افزایش T1/ECV.'), cave: L('Die Abbildung zeigt Amyloidose als Ursache einer restriktiven Physiologie, nicht das Muster jeder RCM.', 'The image shows amyloidosis as one cause of restrictive physiology, not a universal RCM pattern.', 'تصویر، آمیلوئیدوز را به‌عنوان یک علت فنوتیپ محدودکننده نشان می‌دهد، نه الگوی همهٔ RCMها.'), image: '/cardiomyopathy/amyloid.webp' },
]

const protocol = [
  { title: L('1 · Cine', '1 · Cine', '۱ · Cine'), text: L('LV/RV-Volumina, EF, Wanddicke, regionale Bewegung, Klappen und Vorhöfe.', 'LV/RV volumes, EF, wall thickness, regional motion, valves and atria.', 'حجم و EF هر دو بطن، ضخامت دیواره، حرکت موضعی، دریچه‌ها و دهلیزها.') },
  { title: L('2 · T2 / Ödem', '2 · T2 / oedema', '۲ · T2 / ادم'), text: L('T2-Mapping oder T2-gewichtete Sequenzen helfen aktive Entzündung von chronischer Narbe zu trennen.', 'T2 mapping or T2-weighted images help separate active inflammation from chronic scar.', 'T2 mapping یا تصاویر T2 برای افتراق التهاب فعال از اسکار قدیمی کمک می‌کنند.') },
  { title: L('3 · LGE', '3 · LGE', '۳ · LGE'), text: L('Subendokardial, mid-wall, subepikardial oder diffus? Ort und Ausmaß angeben.', 'Subendocardial, mid-wall, subepicardial or diffuse? Record location and extent.', 'ساب‌اندوکاردیال، میدوال، ساب‌اپیکاردیال یا منتشر؟ محل و وسعت را گزارش کنید.') },
  { title: L('4 · Mapping', '4 · Mapping', '۴ · Mapping'), text: L('Natives T1 und ECV für diffuse Infiltration/Fibrose; niedriges natives T1 kann auf Fabry hinweisen.', 'Native T1 and ECV for diffuse infiltration/fibrosis; low native T1 can suggest Fabry.', 'T1 طبیعی و ECV برای نفوذ یا فیبروز منتشر؛ T1 طبیعیِ پایین می‌تواند به نفع فابری باشد.') },
]

const atlas = [
  ...phenotypes.map(item => ({ ...item, caption: item.tissue })),
  { id: 'noncompaction', short: 'LVNC', name: L('Noncompaction-Morphologie', 'Noncompaction morphology', 'نمای noncompaction'), image: '/cardiomyopathy/noncompaction.webp', caption: L('Ausgeprägte Trabekel und tiefe Recessus im Cine. Ein morphologisches Merkmal, keine automatisch eigenständige Kardiomyopathie.', 'Prominent trabeculae and deep recesses on cine. A morphological trait, not automatically a separate cardiomyopathy.', 'ترابکول‌های برجسته و فرورفتگی‌های عمیق در cine؛ یک ویژگی مورفولوژیک است و خودبه‌خود کاردیومیوپاتی مستقل محسوب نمی‌شود.') },
]

const questions = [
  { prompt: L('Großer LV, niedrige EF, septaler mid-wall-LGE-Streifen. Welcher Phänotyp?', 'Large LV, low EF, septal mid-wall LGE stripe. Which phenotype?', 'بطن چپ بزرگ، EF پایین و نوار LGE میدوال در سپتوم؛ کدام فنوتیپ؟'), answer: 'dcm' },
  { prompt: L('Asymmetrisch dickes Septum und fleckiges LGE an der RV-Insertion. Welcher Phänotyp?', 'Asymmetrically thick septum and patchy RV insertion LGE. Which phenotype?', 'سپتوم ضخیمِ نامتقارن و LGE لکه‌ای در محل اتصال بطن راست؛ کدام فنوتیپ؟'), answer: 'hcm' },
  { prompt: L('Normal großer LV, aber subepikardiale nichtischämische Narbe. Welcher Phänotyp?', 'Normal-sized LV with non-ischaemic subepicardial scar. Which phenotype?', 'بطن چپ با اندازهٔ طبیعی و اسکار ساب‌اپیکاردیال غیرایسکمیک؛ کدام فنوتیپ؟'), answer: 'ndlvc' },
  { prompt: L('RV-Dilatation und regionale Dyskinesie sind führend. Welcher Phänotyp?', 'RV dilatation and regional dyskinesia dominate. Which phenotype?', 'اتساع بطن راست و دیسکینزی موضعی یافتهٔ غالب‌اند؛ کدام فنوتیپ؟'), answer: 'arvc' },
  { prompt: L('Kleine Ventrikel, große Vorhöfe, restriktive Füllung. Welcher Phänotyp?', 'Small ventricles, enlarged atria and restrictive filling. Which phenotype?', 'بطن‌های کوچک، دهلیزهای بزرگ و پرشدن محدودکننده؛ کدام فنوتیپ؟'), answer: 'rcm' },
]

const links = [
  { href: 'https://www.escardio.org/guidelines/clinical-practice-guidelines/all-esc-practice-guidelines/cardiomyopathy/', label: 'ESC · 2023 Cardiomyopathy Guidelines' },
  { href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7649060/', label: 'SCMR · CMR clinical indications' },
  { href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5891337/', label: 'Cardiac MR in HCM' },
]

function useCopy() {
  const { lang = 'de' } = useLanguage()
  return { lang, c: value => value?.[lang] || value?.de || value, ui: copy[lang] || copy.de }
}

export default function KardiomyopathienPage() {
  const { lang, c, ui } = useCopy()
  const [selected, setSelected] = useState('hcm')
  const [revealed, setRevealed] = useState({})
  const [answers, setAnswers] = useState({})
  const { isRead, toggleRead, authError } = useLessonReadStatus('kardiomyopathien')
  const current = phenotypes.find(item => item.id === selected) || phenotypes[0]
  const withLang = href => lang === 'de' ? href : `${href}${href.includes('?') ? '&' : '?'}lang=${lang}`
  const sections = [
    ['overview', ui.overview], ['phenotypes', ui.phenotype], ['protocol', ui.protocol],
    ['atlas', ui.atlas], ['practice', ui.practice], ['sources', ui.sources],
  ]

  return (
    <main className={styles.page} dir={lang === 'fa' ? 'rtl' : 'ltr'} lang={lang}>
      <InProgressBanner lang={lang} />
      <div className={styles.shell}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href={withLang('/')}>RadYar</Link><span>›</span><Link href={withLang('/lernen/thorax')}>{ui.back}</Link><span>›</span><span>{ui.chapter}</span>
        </nav>
        <header className={styles.hero}>
          <div><span className={styles.eyebrow}>KARDIO-MRT · CMR</span><h1>{c(lesson.title)}</h1><p>{c(lesson.subtitle)}</p></div>
          <div className={styles.heroVisual}><Image src="/cardiomyopathy/hcm.webp" alt={c(phenotypes[0].tissue)} width={643} height={764} priority /><span>HCM · LGE</span></div>
        </header>
        <div className={styles.readRow}>
          <button type="button" className={`${styles.readButton} ${isRead ? styles.readActive : ''}`} onClick={toggleRead}>{isRead ? '✓ ' : '○ '}{isRead ? ui.read : ui.mark}</button>
          {authError && <p role="alert">{ui.login} <Link href={withLang('/sign-in')}>{ui.signIn}</Link></p>}
        </div>
        <div className={styles.layout}>
          <aside className={styles.sidebar}><strong>{ui.toc}</strong>{sections.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}</aside>
          <div className={styles.content}>
            <section id="overview" className={styles.section}>
              <div className={styles.sectionHeading}><span>01</span><h2>{ui.overview}</h2></div>
              <div className={styles.quickGrid}><div><small>{ui.definition}</small><p>{c(lesson.definition)}</p></div><div><small>{ui.clinic}</small><p>{c(lesson.clinic)}</p></div></div>
              <div className={styles.callout}><strong>{ui.class}</strong><p>{c(lesson.classNote)}</p></div>
            </section>
            <section id="phenotypes" className={styles.section}>
              <div className={styles.sectionHeading}><span>02</span><h2>{ui.phenotype}</h2></div>
              <div className={styles.tabList} role="tablist" aria-label={ui.phenotype}>{phenotypes.map(item => <button key={item.id} type="button" role="tab" aria-selected={selected === item.id} className={selected === item.id ? styles.selectedTab : ''} onClick={() => setSelected(item.id)}><b>{item.short}</b><span>{c(item.name)}</span></button>)}</div>
              <article className={styles.featureCard} role="tabpanel">
                <div className={styles.featureImage}><Image src={current.image} alt={c(current.tissue)} width={674} height={764} /><small>{ui.sample}</small></div>
                <div className={styles.featureText}><div className={styles.featureTitle}><span>{current.short}</span><h3>{c(current.name)}</h3></div><p className={styles.shape}>{c(current.shape)}</p><dl><div><dt>{ui.cine}</dt><dd>{c(current.cine)}</dd></div><div><dt>{ui.lge}</dt><dd>{c(current.tissue)}</dd></div></dl><div className={styles.warning}><strong>{ui.pitfall}</strong><p>{c(current.cave)}</p></div></div>
              </article>
            </section>
            <section id="protocol" className={styles.section}>
              <div className={styles.sectionHeading}><span>03</span><h2>{ui.protocol}</h2></div>
              <div className={styles.protocolGrid}>{protocol.map(step => <div key={c(step.title)}><h3>{c(step.title)}</h3><p>{c(step.text)}</p></div>)}</div>
              <div className={styles.callout}><strong>LGE</strong><p>{c(lesson.lgeRule)}</p></div>
            </section>
            <section id="atlas" className={styles.section}>
              <div className={styles.sectionHeading}><span>04</span><h2>{ui.atlas}</h2></div><p className={styles.sectionLead}>{ui.imageHint} · {ui.sample}</p>
              <div className={styles.atlasGrid}>{atlas.map(item => <figure key={item.id} className={styles.atlasCard}><Image src={item.image} alt={c(item.caption)} width={674} height={764} loading="lazy" /><figcaption><strong>{item.short} · {c(item.name)}</strong><button type="button" aria-expanded={Boolean(revealed[item.id])} onClick={() => setRevealed(previous => ({ ...previous, [item.id]: !previous[item.id] }))}>{revealed[item.id] ? ui.hide : ui.reveal}</button>{revealed[item.id] && <p>{c(item.caption)}</p>}</figcaption></figure>)}</div>
            </section>
            <section id="practice" className={styles.section}>
              <div className={styles.sectionHeading}><span>05</span><h2>{ui.practice}</h2></div>
              <div className={styles.quizGrid}>{questions.map((question, index) => <div key={index} className={styles.quizCard}><span>{String(index + 1).padStart(2, '0')}</span><h3>{c(question.prompt)}</h3><div className={styles.choices}>{phenotypes.map(item => <button key={item.id} type="button" className={answers[index] === item.id ? styles.chosen : ''} onClick={() => setAnswers(previous => ({ ...previous, [index]: item.id }))}>{item.short}</button>)}</div>{answers[index] && <p className={answers[index] === question.answer ? styles.correct : styles.incorrect}>{answers[index] === question.answer ? ui.correct : `${ui.incorrect} · ${phenotypes.find(item => item.id === question.answer)?.short}`}</p>}</div>)}</div>
              {Object.keys(answers).length > 0 && <button type="button" className={styles.reset} onClick={() => setAnswers({})}>{ui.reset}</button>}
            </section>
            <section id="sources" className={styles.section}>
              <div className={styles.sectionHeading}><span>06</span><h2>{ui.sources}</h2></div>
              <div className={styles.sources}>{links.map(link => <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">{link.label} ↗</a>)}</div>
            </section>
            <div className={styles.bottomRead}><button type="button" className={`${styles.readButton} ${isRead ? styles.readActive : ''}`} onClick={toggleRead}>{isRead ? '✓ ' : '○ '}{isRead ? ui.read : ui.mark}</button></div>
          </div>
        </div>
      </div>
    </main>
  )
}
