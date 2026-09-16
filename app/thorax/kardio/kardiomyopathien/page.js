'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import LessonKeyPoints from '@/components/LessonKeyPoints'
import { useLanguage } from '@/providers/LanguageProvider'
import { useLessonReadStatus } from '@/hooks/useLessonReadStatus'
import { useMobileLearningLayout } from '@/hooks/useMobileLearningLayout'
import base from '@/app/abdomen/gi/divertikulitis/page.module.css'
import styles from './page.module.css'

const L = (de, en, fa) => ({ de, en, fa })

const copy = {
  de: { chapter: 'Kardiale Bildgebung / Kardio-MRT', back: 'Zurück zum Thorax', toc: 'Im Überblick', overview: 'Kurzüberblick', phenotype: 'Phänotypen', special: 'LVNC & Takotsubo', protocol: 'MRT lesen', atlas: 'Bildatlas', practice: 'Muster erkennen', sources: 'Quellen', definition: 'Definition', clinic: 'Klinik', class: 'ESC-Phänotypen', clue: 'MRT-Leitbefund', cine: 'Cine / Morphologie', lge: 'LGE / Gewebe', pitfall: 'Wichtig', reveal: 'Befund zeigen', hide: 'Befund verbergen', sample: 'Synthetische Lehrabbildung · kein Patientenbild', imageHint: 'Bild antippen zum Vergrößern', mark: 'Als gelesen markieren', read: 'Als gelesen markiert', login: 'Bitte anmelden, um den Lernfortschritt zu speichern.', signIn: 'Anmelden', answer: 'Antwort wählen', correct: 'Richtig', incorrect: 'Noch einmal ansehen', reset: 'Zurücksetzen' },
  en: { chapter: 'Cardiac imaging / cardiac MRI', back: 'Back to thorax', toc: 'At a glance', overview: 'Quick overview', phenotype: 'Phenotypes', special: 'LVNC & Takotsubo', protocol: 'Reading MRI', atlas: 'Image atlas', practice: 'Recognise the pattern', sources: 'Sources', definition: 'Definition', clinic: 'Clinical signs', class: 'ESC phenotypes', clue: 'Key MRI clue', cine: 'Cine / morphology', lge: 'LGE / tissue', pitfall: 'Important', reveal: 'Show finding', hide: 'Hide finding', sample: 'Synthetic teaching image · not a patient scan', imageHint: 'Tap image to enlarge', mark: 'Mark as read', read: 'Marked as read', login: 'Please sign in to save learning progress.', signIn: 'Sign in', answer: 'Choose an answer', correct: 'Correct', incorrect: 'Review the pattern', reset: 'Reset' },
  fa: { chapter: 'تصویربرداری قلبی / MRI قلب', back: 'بازگشت به قفسه سینه', toc: 'در یک نگاه', overview: 'مرور کوتاه', phenotype: 'فنوتیپ‌ها', special: 'LVNC و تاکوتسوبو', protocol: 'خواندن MRI', atlas: 'گالری تصاویر', practice: 'تشخیص الگو', sources: 'منابع', definition: 'تعریف', clinic: 'علائم بالینی', class: 'فنوتیپ‌های ESC', clue: 'نشانهٔ کلیدی MRI', cine: 'Cine / شکل و عملکرد', lge: 'LGE / بافت', pitfall: 'نکتهٔ مهم', reveal: 'نمایش یافته', hide: 'پنهان‌کردن یافته', sample: 'تصویر آموزشیِ ساخته‌شده · تصویر بیمار نیست', imageHint: 'برای بزرگ‌نمایی روی تصویر بزنید', mark: 'علامت‌گذاری به‌عنوان خوانده‌شده', read: 'خوانده‌شده', login: 'برای ذخیرهٔ پیشرفت آموزشی وارد حساب شوید.', signIn: 'ورود', answer: 'یک پاسخ انتخاب کنید', correct: 'درست', incorrect: 'الگو را دوباره بررسی کنید', reset: 'شروع دوباره' },
}

const lesson = {
  title: L('Kardiomyopathien im Kardio-MRT', 'Cardiomyopathies on cardiac MRI', 'کاردیومیوپاتی‌ها در MRI قلب'),
  subtitle: L('Phänotyp → Funktion → Gewebe: fünf ESC-Phänotypen plus LVNC und Takotsubo im direkten MRT-Vergleich.', 'Phenotype → function → tissue: five ESC phenotypes plus LVNC and Takotsubo in a direct MRI comparison.', 'فنوتیپ ← عملکرد ← بافت: پنج فنوتیپ ESC به‌همراه LVNC و تاکوتسوبو در مقایسهٔ مستقیم MRI.'),
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

const specialPatterns = [
  {
    id: 'lvnc', short: 'LVNC', name: L('Non-Compaction / Hypertrabekulierung', 'Non-compaction / hypertrabeculation', 'عدم فشردگی / ترابکولاسیون بیش‌ازحد'),
    shape: L('Prominente Trabekel, tiefe intertrabekuläre Recessus und eine dünne kompakte Außenschicht, meist apikal und lateral.', 'Prominent trabeculae, deep intertrabecular recesses and a thin compacted outer layer, usually apical and lateral.', 'ترابکول‌های برجسته، فرورفتگی‌های عمیق بین‌ترابکولی و لایهٔ فشردهٔ بیرونی نازک، معمولاً در اپکس و دیوارهٔ لترال.'),
    cine: L('Ausmaß und Verteilung der Hypertrabekulierung sowie LV-Größe, EF und regionale Wandbewegung beurteilen.', 'Assess the extent and distribution of hypertrabeculation together with LV size, EF and regional wall motion.', 'وسعت و توزیع ترابکولاسیون بیش‌ازحد را همراه با اندازهٔ بطن چپ، EF و حرکت موضعی دیواره ارزیابی کنید.'),
    tissue: L('LGE und Mapping sind variabel. Fibrose oder Dysfunktion stützen einen pathologischen Phänotyp, fehlendes LGE schließt ihn aber nicht aus.', 'LGE and mapping findings vary. Fibrosis or dysfunction support a pathological phenotype, but absent LGE does not exclude it.', 'یافته‌های LGE و مپینگ متغیرند. فیبروز یا اختلال عملکرد از فنوتیپ پاتولوژیک حمایت می‌کند، اما نبود LGE آن را رد نمی‌کند.'),
    cave: L('Nicht anhand eines NC/C-Grenzwerts allein diagnostizieren: Hypertrabekulierung kann auch physiologisch sein, etwa bei Athleten oder in der Schwangerschaft.', 'Do not diagnose from an NC/C cut-off alone: hypertrabeculation may also be physiological, including in athletes or pregnancy.', 'تشخیص را فقط بر اساس آستانهٔ NC/C نگذارید؛ ترابکولاسیون زیاد می‌تواند در ورزشکاران یا بارداری نیز فیزیولوژیک باشد.'),
  },
  {
    id: 'takotsubo', short: 'TTS', name: L('Takotsubo-Syndrom', 'Takotsubo syndrome', 'سندرم تاکوتسوبو'),
    shape: L('Akute, meist reversible regionale LV-Dysfunktion über ein einzelnes Koronarterritorium hinaus; apikal, midventrikulär, basal oder fokal.', 'Acute, usually reversible regional LV dysfunction extending beyond a single coronary territory; apical, mid-ventricular, basal or focal.', 'اختلال حاد و معمولاً برگشت‌پذیر عملکرد موضعی بطن چپ فراتر از یک قلمرو کرونری؛ به‌شکل اپیکال، میدونتریکولار، بازال یا فوکال.'),
    cine: L('Typische Ballonierung erkennen und RV-Beteiligung, LVOT-Obstruktion, Mitralinsuffizienz sowie apikale Thromben suchen.', 'Identify the ballooning pattern and assess RV involvement, LVOT obstruction, mitral regurgitation and apical thrombus.', 'الگوی بالونینگ را شناسایی و درگیری بطن راست، انسداد LVOT، نارسایی میترال و ترومبوز اپیکال را بررسی کنید.'),
    tissue: L('Myokardödem in den dysfunktionalen Segmenten bei typischerweise fehlendem irreversiblem LGE; CMR grenzt Infarkt und Myokarditis ab.', 'Myocardial oedema in dysfunctional segments with typically absent irreversible LGE; CMR helps distinguish infarction and myocarditis.', 'ادم میوکارد در قطعات دچار اختلال همراه با فقدان معمول LGE برگشت‌ناپذیر؛ CMR به افتراق انفارکت و میوکاردیت کمک می‌کند.'),
    cave: L('Akut zunächst wie ein ACS abklären. Takotsubo ist ein Syndrom und kein hereditärer ESC-Kardiomyopathie-Phänotyp; die Erholung im Verlauf dokumentieren.', 'Initially investigate as an acute coronary syndrome. Takotsubo is a syndrome, not a hereditary ESC cardiomyopathy phenotype; document recovery on follow-up.', 'در فاز حاد ابتدا مانند ACS بررسی شود. تاکوتسوبو یک سندرم است، نه فنوتیپ ارثی کاردیومیوپاتی ESC؛ بهبود در پیگیری مستند شود.'),
  },
]

const protocol = [
  { title: L('1 · Cine', '1 · Cine', '۱ · Cine'), text: L('LV/RV-Volumina, EF, Wanddicke, regionale Bewegung, Klappen und Vorhöfe.', 'LV/RV volumes, EF, wall thickness, regional motion, valves and atria.', 'حجم و EF هر دو بطن، ضخامت دیواره، حرکت موضعی، دریچه‌ها و دهلیزها.') },
  { title: L('2 · T2 / Ödem', '2 · T2 / oedema', '۲ · T2 / ادم'), text: L('T2-Mapping oder T2-gewichtete Sequenzen helfen aktive Entzündung von chronischer Narbe zu trennen.', 'T2 mapping or T2-weighted images help separate active inflammation from chronic scar.', 'T2 mapping یا تصاویر T2 برای افتراق التهاب فعال از اسکار قدیمی کمک می‌کنند.') },
  { title: L('3 · LGE', '3 · LGE', '۳ · LGE'), text: L('Subendokardial, mid-wall, subepikardial oder diffus? Ort und Ausmaß angeben.', 'Subendocardial, mid-wall, subepicardial or diffuse? Record location and extent.', 'ساب‌اندوکاردیال، میدوال، ساب‌اپیکاردیال یا منتشر؟ محل و وسعت را گزارش کنید.') },
  { title: L('4 · Mapping', '4 · Mapping', '۴ · Mapping'), text: L('Natives T1 und ECV für diffuse Infiltration/Fibrose; niedriges natives T1 kann auf Fabry hinweisen.', 'Native T1 and ECV for diffuse infiltration/fibrosis; low native T1 can suggest Fabry.', 'T1 طبیعی و ECV برای نفوذ یا فیبروز منتشر؛ T1 طبیعیِ پایین می‌تواند به نفع فابری باشد.') },
]

const atlas = [
  ...phenotypes.map(item => ({ ...item, caption: item.tissue })),
  { ...specialPatterns[0], image: '/cardiomyopathy/noncompaction.webp', caption: specialPatterns[0].tissue },
]

const links = [
  { href: 'https://www.escardio.org/guidelines/clinical-practice-guidelines/all-esc-practice-guidelines/cardiomyopathy/', label: 'ESC · 2023 Cardiomyopathy Guidelines' },
  { href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7649060/', label: 'SCMR · CMR clinical indications' },
  { href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5891337/', label: 'Cardiac MR in HCM' },
  { href: 'https://www.escardio.org/education/resources/imaging-toolboxes/cardiomyopathies-and-the-athletes-heart/lv-noncompaction/', label: 'EACVI · LV non-compaction' },
  { href: 'https://academic.oup.com/ehjcimaging/article/21/11/1184/5898275', label: 'EACVI/JSE · Takotsubo imaging consensus' },
]

const reportSteps = [
  { title: L('Technik & Qualität', 'Technique & quality', 'تکنیک و کیفیت'), text: L('Sequenzen, Kontrastmittel und Einschränkungen nennen.', 'State sequences, contrast administration and limitations.', 'سکانس‌ها، تزریق ماده حاجب و محدودیت‌ها را ذکر کنید.') },
  { title: L('Volumina & Funktion', 'Volumes & function', 'حجم‌ها و عملکرد'), text: L('LV/RV EDV, ESV, Schlagvolumen und EF indexiert dokumentieren.', 'Document indexed LV/RV EDV, ESV, stroke volume and EF.', 'EDV، ESV، حجم ضربه‌ای و EF هر دو بطن را به‌صورت ایندکس‌شده ثبت کنید.') },
  { title: L('Morphologie', 'Morphology', 'مورفولوژی'), text: L('Wanddicke, Dilatation, Trabekulierung, Aneurysmen und Vorhofgröße.', 'Wall thickness, dilatation, trabeculation, aneurysms and atrial size.', 'ضخامت دیواره، اتساع، ترابکولاسیون، آنوریسم و اندازه دهلیزها.') },
  { title: L('Bewegung & Hämodynamik', 'Motion & haemodynamics', 'حرکت و همودینامیک'), text: L('Regionale Kinetik, LVOT/SAM, Klappen und Flussphänomene.', 'Regional motion, LVOT/SAM, valves and flow phenomena.', 'حرکت موضعی، LVOT/SAM، دریچه‌ها و پدیده‌های جریان.') },
  { title: L('Gewebe', 'Tissue', 'بافت'), text: L('Ödem, natives T1/T2, ECV und LGE-Muster mit Segmenten und Ausmaß.', 'Oedema, native T1/T2, ECV and LGE pattern with segments and extent.', 'ادم، T1/T2 طبیعی، ECV و الگوی LGE همراه قطعات و وسعت.') },
  { title: L('Beurteilung', 'Impression', 'جمع‌بندی'), text: L('Phänotyp zuerst, wahrscheinliche Ätiologie und relevante Differenzialdiagnosen danach.', 'State phenotype first, followed by likely aetiology and relevant differentials.', 'ابتدا فنوتیپ، سپس علت محتمل و افتراق‌های مهم را بیان کنید.') },
]

const reportExample = L(
  'Nicht-dilatierter LV mit asymmetrischer basaler Septumhypertrophie bis 19 mm, erhaltener LVEF (68 %) und systolischer anteriorer Mitralklappenbewegung. Fleckiges intramyokardiales LGE im hypertrophierten Septum und an den RV-Insertionen, insgesamt ca. 8 % der LV-Masse. Kein Ödem. Befundkonstellation vereinbar mit hypertropher Kardiomyopathie.',
  'Non-dilated LV with asymmetric basal septal hypertrophy to 19 mm, preserved LVEF (68%) and systolic anterior motion of the mitral valve. Patchy intramyocardial LGE in the hypertrophied septum and at the RV insertion points, approximately 8% of LV mass. No oedema. Findings are consistent with hypertrophic cardiomyopathy.',
  'بطن چپ بدون اتساع با هیپرتروفی نامتقارن سپتوم قاعده‌ای تا ۱۹ میلی‌متر، LVEF حفظ‌شده (۶۸٪) و حرکت سیستولی قدامی دریچه میترال. LGE لکه‌ای داخل‌میوکاردی در سپتوم هیپرتروفیک و محل اتصال بطن راست، در مجموع حدود ۸٪ توده بطن چپ. بدون ادم. مجموعه یافته‌ها با کاردیومیوپاتی هیپرتروفیک سازگار است.'
)

const takeHomes = [
  L('Zuerst den Phänotyp benennen, danach die Ursache einordnen.', 'Name the phenotype first, then assess the cause.', 'ابتدا فنوتیپ را نام‌گذاری و سپس علت را ارزیابی کنید.'),
  L('Cine beantwortet Form und Funktion; Mapping und LGE beantworten die Gewebefrage.', 'Cine answers shape and function; mapping and LGE answer the tissue question.', 'Cine شکل و عملکرد را نشان می‌دهد؛ mapping و LGE وضعیت بافت را مشخص می‌کنند.'),
  L('Subendokardiales/transmurales LGE folgt Ischämie; mid-wall/subepikardiales LGE ist meist nichtischämisch.', 'Subendocardial/transmural LGE follows ischaemia; mid-wall/subepicardial LGE is usually non-ischaemic.', 'LGE ساب‌اندوکاردیال/تمام‌جداری از ایسکمی پیروی می‌کند؛ LGE میدوال/ساب‌اپیکاردیال معمولاً غیرایسکمیک است.'),
  L('Ein einzelnes Zeichen stellt selten die Diagnose: Klinik, EKG, Genetik und Familienanamnese mitdenken.', 'A single sign rarely establishes the diagnosis: integrate clinical data, ECG, genetics and family history.', 'یک نشانه به‌ندرت تشخیص را قطعی می‌کند؛ اطلاعات بالینی، ECG، ژنتیک و سابقه خانوادگی را یکپارچه کنید.'),
]

const extraCopy = {
  de: { thorax: 'Thorax', cardiac: 'Kardiale Bildgebung', reporting: 'Strukturierte Befundung', reportExample: 'Beispielbefund · HCM', takehome: 'Take Home', flashcards: 'Flashcards', zoom: 'Bild vergrößern', close: 'Bild schließen', contents: 'Inhaltsverzeichnis' },
  en: { thorax: 'Thorax', cardiac: 'Cardiac imaging', reporting: 'Structured reporting', reportExample: 'Example report · HCM', takehome: 'Take home', flashcards: 'Flashcards', zoom: 'Enlarge image', close: 'Close image', contents: 'Contents' },
  fa: { thorax: 'قفسه سینه', cardiac: 'تصویربرداری قلبی', reporting: 'گزارش ساختاریافته', reportExample: 'نمونه گزارش · HCM', takehome: 'نکات کلیدی', flashcards: 'فلش‌کارت‌ها', zoom: 'بزرگ‌نمایی تصویر', close: 'بستن تصویر', contents: 'فهرست مطالب' },
}

function SectionIcon({ id }) {
  const common = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true }
  const icons = {
    overview: <><path d="M12 20s-8-5-8-11a4.5 4.5 0 0 1 8-2 4.5 4.5 0 0 1 8 2c0 6-8 11-8 11Z"/><path d="M5 12h4l1.5-3 2.5 6 1.5-3H19"/></>,
    phenotypes: <><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></>,
    special: <><path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 5.5-7 10-7 10Z"/><path d="M8 13h2l1-2 2 4 1-2h2"/></>,
    protocol: <><rect x="3" y="4" width="18" height="15" rx="2"/><path d="M7 12h2l1.5-3 2.5 6 1.5-3H17M9 22h6"/></>,
    atlas: <><rect x="5" y="3" width="14" height="14" rx="2"/><path d="m7 14 3-3 2 2 2.5-3 2.5 4M3 19v1a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2v-1"/><circle cx="9" cy="7" r="1"/></>,
    reporting: <><path d="M9 4h6l1 2h3v15H5V6h3l1-2Z"/><path d="M9 12h6M9 16h6M9 8h6"/></>,
    takehome: <><path d="M9 18h6M10 22h4"/><path d="M8.5 14.5A7 7 0 1 1 15.5 14.5c-1 .7-1.5 1.5-1.5 2.5h-4c0-1-.5-1.8-1.5-2.5Z"/><path d="m9.5 10.5 1.7 1.7 3.4-4"/></>,
    sources: <><path d="M12 5c-2-2-5-2-9-1v15c4-1 7-1 9 1 2-2 5-2 9-1V4c-4-1-7-1-9 1ZM12 5v15"/><path d="M5 8c2-.3 4-.1 5 1M14 9c1-1 3-1.3 5-1"/></>,
  }
  return <svg {...common}>{icons[id]}</svg>
}

function ReadButton({ isRead, onClick, authError, ui, withLang }) {
  return <div className={base.readControl}><button type="button" className={`${base.readButton} ${styles.readButton} ${isRead ? `${base.readButtonActive} ${styles.readActive}` : ''}`} onClick={onClick}><span className={`${base.readCheck} ${styles.readCheck}`} aria-hidden="true">{isRead ? '✓' : ''}</span><span>{isRead ? ui.read : ui.mark}</span></button>{authError && <div className={base.readError} role="alert"><span>{ui.login}</span> <Link href={withLang('/sign-in')}>{ui.signIn}</Link></div>}</div>
}

function Section({ id, title, children }) {
  useMobileLearningLayout()
  const [open, setOpen] = useState(id === 'overview')
  return <section id={id} className={`${base.section} ${styles.section}`}><button className={`${base.sectionHeader} ${styles.sectionHeader}`} type="button" onClick={() => setOpen(value => !value)} aria-expanded={open}><div className={styles.sectionHeading}><span className={styles.sectionIcon}><SectionIcon id={id} /></span><h2>{title}</h2></div><span className={styles.sectionToggle}>{open ? '−' : '+'}</span></button>{open && <div className={`${base.sectionBody} ${styles.sectionBody}`}>{children}</div>}</section>
}

function ZoomImage({ src, alt, width = 674, height = 764, className, children, labels }) {
  const [open, setOpen] = useState(false)
  return <><button type="button" className={`${styles.zoomTrigger} ${className || ''}`} onClick={() => setOpen(true)} aria-label={labels.zoom}><Image src={src} alt={alt} width={width} height={height} loading="lazy" />{children}</button>{open && <div className={styles.imageModal} role="dialog" aria-modal="true" onClick={() => setOpen(false)}><div className={styles.imageModalContent} onClick={event => event.stopPropagation()}><button type="button" className={styles.imageModalClose} onClick={() => setOpen(false)} aria-label={labels.close}>×</button><img src={src} alt={alt} /></div></div>}</>
}

function useCopy() {
  const { lang = 'de' } = useLanguage()
  return { lang, c: value => value?.[lang] || value?.de || value, ui: copy[lang] || copy.de }
}

export default function KardiomyopathienPage() {
  const { lang, c, ui } = useCopy()
  const labels = extraCopy[lang] || extraCopy.de
  const [selected, setSelected] = useState('hcm')
  const [revealed, setRevealed] = useState({})
  const [activeId, setActiveId] = useState('overview')
  const { isRead, toggleRead, authError } = useLessonReadStatus('kardiomyopathien')
  const current = phenotypes.find(item => item.id === selected) || phenotypes[0]
  const withLang = href => lang === 'de' ? href : `${href}${href.includes('?') ? '&' : '?'}lang=${lang}`
  const lessonPath = '/thorax/kardio/kardiomyopathien'
  const sections = useMemo(() => [
    ['overview', ui.overview], ['phenotypes', ui.phenotype], ['special', ui.special], ['protocol', ui.protocol],
    ['atlas', ui.atlas], ['reporting', labels.reporting],
    ['takehome', labels.takehome], ['sources', ui.sources],
  ], [labels.reporting, labels.takehome, ui])

  useEffect(() => {
    const observers = sections.map(([id]) => {
      const element = document.getElementById(id)
      if (!element) return null
      const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setActiveId(id) }, { rootMargin: '-18% 0px -72% 0px', threshold: 0.01 })
      observer.observe(element)
      return observer
    })
    return () => observers.forEach(observer => observer?.disconnect())
  }, [sections])

  return (
    <main className={`${base.page} ${styles.page}`} dir={lang === 'fa' ? 'rtl' : 'ltr'} lang={lang}>
      <header className={`${base.header} ${styles.header}`}>
        <nav className={`${base.breadcrumb} ${styles.breadcrumb}`} aria-label="Breadcrumb">
          <Link href={withLang('/')}>RadYar</Link><span>›</span><Link href={withLang('/lernen/thorax')}>{labels.thorax}</Link><span>›</span><Link href={withLang('/lernen/thorax')}>{labels.cardiac}</Link><span>›</span><strong>{c(lesson.title)}</strong>
        </nav>
        <div className={`${base.hero} ${styles.hero}`}>
          <div className={`${base.heroText} ${styles.heroText}`}><span className={`${base.sourceBadge} ${styles.sourceBadge}`}>Dr. Zia</span><span className={styles.eyebrow}>KARDIO-MRT · CMR</span><h1>{c(lesson.title)}</h1><p>{c(lesson.subtitle)}</p><div className={`${base.actions} ${styles.actions}`}><Link className={`${base.actionBtn} ${styles.actionBtn}`} href={withLang(`/ueben/quiz?fach=thorax&n=10&themen=kardiomyopathien&from=${encodeURIComponent(withLang(lessonPath))}`)}>🎯 MCQ</Link><Link className={`${base.actionBtn} ${styles.actionBtn}`} href={withLang(`/flashcards/kardiomyopathien?from=${encodeURIComponent(withLang(lessonPath))}`)}>🧠 {labels.flashcards}</Link></div></div>
          <LessonKeyPoints points={[[c(L('Phänotyp zuerst', 'Phenotype first', 'ابتدا فنوتیپ')), c(L('HCM · DCM · NDLVC · ARVC · RCM', 'HCM · DCM · NDLVC · ARVC · RCM', 'HCM · DCM · NDLVC · ARVC · RCM'))], [c(L('Funktion', 'Function', 'عملکرد')), c(L('Cine: Volumina, EF und regionale Bewegung.', 'Cine: volumes, EF and regional motion.', 'Cine: حجم‌ها، EF و حرکت موضعی.'))], [c(L('Gewebe', 'Tissue', 'بافت')), c(L('T2/Mapping plus LGE-Muster und -Ausmaß.', 'T2/mapping plus LGE pattern and extent.', 'T2/mapping همراه الگو و وسعت LGE.'))]]} />
        </div>
      </header>
      <div className={`${base.readBar} ${styles.readBar}`}><ReadButton isRead={isRead} onClick={toggleRead} authError={authError} ui={ui} withLang={withLang} /></div>
      <div className={`${base.layout} ${styles.layout}`}>
          <aside className={`${base.sidebar} ${styles.sidebar}`}><div className={base.sideTitle}>{labels.contents}</div>{sections.map(([id, label]) => <button key={id} type="button" className={`${base.sideItem} ${styles.sideItem} ${activeId === id ? `${base.sideItemActive} ${styles.sideItemActive}` : ''}`} onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}><span className={styles.sideIcon}><SectionIcon id={id} /></span><strong>{label}</strong></button>)}</aside>
          <div className={`${base.main} ${styles.content}`}>
            <Section id="overview" title={ui.overview}>
              <div className={styles.quickGrid}><div><small>{ui.definition}</small><p>{c(lesson.definition)}</p></div><div><small>{ui.clinic}</small><p>{c(lesson.clinic)}</p></div></div>
              <div className={styles.callout}><strong>{ui.class}</strong><p>{c(lesson.classNote)}</p></div>
            </Section>
            <Section id="phenotypes" title={ui.phenotype}>
              <div className={styles.tabList} role="tablist" aria-label={ui.phenotype}>{phenotypes.map(item => <button key={item.id} type="button" role="tab" aria-selected={selected === item.id} className={selected === item.id ? styles.selectedTab : ''} onClick={() => setSelected(item.id)}><b>{item.short}</b><span>{c(item.name)}</span></button>)}</div>
              <article className={styles.featureCard} role="tabpanel">
                <div className={styles.featureImage}><ZoomImage src={current.image} alt={c(current.tissue)} className={styles.featureZoom} labels={labels}><small>{ui.sample} · {labels.zoom}</small></ZoomImage></div>
                <div className={styles.featureText}><div className={styles.featureTitle}><span>{current.short}</span><h3>{c(current.name)}</h3></div><p className={styles.shape}>{c(current.shape)}</p><dl><div><dt>{ui.cine}</dt><dd>{c(current.cine)}</dd></div><div><dt>{ui.lge}</dt><dd>{c(current.tissue)}</dd></div></dl><div className={styles.warning}><strong>{ui.pitfall}</strong><p>{c(current.cave)}</p></div></div>
              </article>
            </Section>
            <Section id="special" title={ui.special}>
              <div className={styles.specialGrid}>{specialPatterns.map(item => <article key={item.id} className={styles.specialCard}><div className={styles.specialTitle}><span>{item.short}</span><h3>{c(item.name)}</h3></div><p className={styles.shape}>{c(item.shape)}</p><dl><div><dt>{ui.cine}</dt><dd>{c(item.cine)}</dd></div><div><dt>{ui.lge}</dt><dd>{c(item.tissue)}</dd></div></dl><div className={styles.warning}><strong>{ui.pitfall}</strong><p>{c(item.cave)}</p></div></article>)}</div>
            </Section>
            <Section id="protocol" title={ui.protocol}>
              <div className={styles.protocolGrid}>{protocol.map(step => <div key={c(step.title)}><h3>{c(step.title)}</h3><p>{c(step.text)}</p></div>)}</div>
              <div className={styles.callout}><strong>LGE</strong><p>{c(lesson.lgeRule)}</p></div>
            </Section>
            <Section id="atlas" title={ui.atlas}><p className={styles.sectionLead}>{ui.imageHint} · {ui.sample}</p>
              <div className={styles.atlasGrid}>{atlas.map(item => <figure key={item.id} className={styles.atlasCard}><ZoomImage src={item.image} alt={c(item.caption)} labels={labels} /><figcaption><strong>{item.short} · {c(item.name)}</strong><button type="button" aria-expanded={Boolean(revealed[item.id])} onClick={() => setRevealed(previous => ({ ...previous, [item.id]: !previous[item.id] }))}>{revealed[item.id] ? ui.hide : ui.reveal}</button>{revealed[item.id] && <p>{c(item.caption)}</p>}</figcaption></figure>)}</div>
            </Section>
            <Section id="reporting" title={labels.reporting}><div className={styles.reportGrid}>{reportSteps.map((step, index) => <div key={index}><span>{String(index + 1).padStart(2, '0')}</span><h3>{c(step.title)}</h3><p>{c(step.text)}</p></div>)}</div><div className={styles.reportExample}><strong>{labels.reportExample}</strong><p>{c(reportExample)}</p></div></Section>
            <Section id="takehome" title={labels.takehome}><div className={styles.takeHomeGrid}>{takeHomes.map((item, index) => <div key={index}><span>✓</span><p>{c(item)}</p></div>)}</div><div className={styles.actionFooter}><Link href={withLang(`/ueben/quiz?fach=thorax&n=10&themen=kardiomyopathien&from=${encodeURIComponent(withLang(lessonPath))}`)}>🎯 MCQ</Link><Link href={withLang(`/flashcards/kardiomyopathien?from=${encodeURIComponent(withLang(lessonPath))}`)}>🧠 {labels.flashcards}</Link></div></Section>
            <Section id="sources" title={ui.sources}>
              <div className={styles.sources}>{links.map(link => <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">{link.label} ↗</a>)}</div>
            </Section>
            <div className={`${base.readBar} ${styles.bottomRead}`}><ReadButton isRead={isRead} onClick={toggleRead} authError={authError} ui={ui} withLang={withLang} /></div>
          </div>
        </div>
    </main>
  )
}
