'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import LessonKeyPoints from '@/components/LessonKeyPoints'
import { useLanguage } from '@/providers/LanguageProvider'
import { useLessonReadStatus } from '@/hooks/useLessonReadStatus'
import { useMobileLearningLayout } from '@/hooks/useMobileLearningLayout'
import base from '@/app/abdomen/gi/divertikulitis/page.module.css'
import styles from './page.module.css'

const PATH = '/thorax/kardio/kardio-mrt-indikationen'
const L = (de, en, fa) => ({ de, en, fa })

const COPY = {
  de: {
    title: 'Indikationen zur Kardio-MRT', subtitle: 'Die richtige Untersuchung für die richtige klinische Frage', chapter: 'Kardiale Bildgebung / Kardio-MRT', thorax: 'Thorax', contents: 'Inhaltsverzeichnis', source: 'Leitlinienbasiert · klinisch orientiert', read: 'Als gelesen markieren', readDone: 'Als gelesen markiert', signIn: 'Anmelden', auth: 'Bitte melde dich an, um deinen Lernfortschritt zu speichern.', choose: 'Klinische Frage auswählen', answer: 'Was liefert die CMR?', protocol: 'Passender Protokollkern', indication: 'Typische Indikation', value: 'Zusatznutzen', sequence: 'Sequenzen', important: 'Wichtig', example: 'Gute Anmeldung · Beispiel', sources: 'Leitlinien & Quellen', noRadiation: 'Keine ionisierende Strahlung', notEmergency: 'CMR darf eine dringliche Therapie nicht verzögern.', contrastNote: 'Nicht jede Kardio-MRT benötigt Gadolinium: Cine, Flussmessung, T2* und Teile des Mappings sind auch nativ möglich.',
  },
  en: {
    title: 'Indications for cardiac MRI', subtitle: 'The right examination for the right clinical question', chapter: 'Cardiac imaging / cardiac MRI', thorax: 'Thorax', contents: 'Contents', source: 'Guideline-based · clinically oriented', read: 'Mark as read', readDone: 'Marked as read', signIn: 'Sign in', auth: 'Please sign in to save your learning progress.', choose: 'Select the clinical question', answer: 'What does CMR add?', protocol: 'Core protocol', indication: 'Typical indication', value: 'Added value', sequence: 'Sequences', important: 'Important', example: 'Good referral · example', sources: 'Guidelines & sources', noRadiation: 'No ionising radiation', notEmergency: 'CMR must not delay urgent treatment.', contrastNote: 'Not every cardiac MRI requires gadolinium: cine, flow imaging, T2* and parts of mapping can be performed without contrast.',
  },
  fa: {
    title: 'اندیکاسیون‌های MRI قلب', subtitle: 'انتخاب بررسی مناسب برای پرسش بالینی مناسب', chapter: 'تصویربرداری قلبی / MRI قلب', thorax: 'قفسه سینه', contents: 'فهرست مطالب', source: 'مبتنی بر گایدلاین · با رویکرد بالینی', read: 'علامت‌گذاری به‌عنوان خوانده‌شده', readDone: 'خوانده‌شده', signIn: 'ورود', auth: 'برای ذخیرهٔ پیشرفت آموزشی وارد حساب شوید.', choose: 'پرسش بالینی را انتخاب کنید', answer: 'CMR چه اطلاعاتی اضافه می‌کند؟', protocol: 'هستهٔ پروتکل مناسب', indication: 'اندیکاسیون تیپیک', value: 'ارزش افزوده', sequence: 'سکانس‌ها', important: 'نکتهٔ مهم', example: 'نمونهٔ درخواست مناسب', sources: 'گایدلاین‌ها و منابع', noRadiation: 'بدون پرتو یونیزان', notEmergency: 'CMR نباید درمان اورژانسی را به تأخیر بیندازد.', contrastNote: 'هر MRI قلب به گادولینیوم نیاز ندارد؛ Cine، اندازه‌گیری جریان، T2* و بخشی از مپینگ را می‌توان بدون کنتراست انجام داد.',
  },
}

const SECTION_LABELS = {
  overview: L('Wann ist CMR besonders stark?', 'When is CMR especially useful?', 'چه زمانی CMR بیشترین ارزش را دارد؟'),
  indications: L('Kernindikationen', 'Core indications', 'اندیکاسیون‌های اصلی'),
  triage: L('Wann nicht zuerst?', 'When not first?', 'چه زمانی انتخاب اول نیست؟'),
  safety: L('Sicherheit & Vorbereitung', 'Safety & preparation', 'ایمنی و آماده‌سازی'),
  referral: L('Die gute Anmeldung', 'A good referral', 'درخواست مناسب'),
  takehome: L('Take Home', 'Take home', 'نکات کلیدی'),
  sources: L('Quellen', 'Sources', 'منابع'),
}

const SECTION_IDS = Object.keys(SECTION_LABELS)

const KEY_POINTS = [
  [L('Gewebe', 'Tissue', 'بافت'), L('Ödem, Fibrose, Narbe und Infiltration charakterisieren.', 'Characterise oedema, fibrosis, scar and infiltration.', 'ادم، فیبروز، اسکار و نفوذ بافتی را مشخص می‌کند.')],
  [L('Funktion', 'Function', 'عملکرد'), L('Beide Ventrikel, Volumina, EF und regionale Bewegung präzise messen.', 'Measure both ventricles, volumes, EF and regional motion accurately.', 'هر دو بطن، حجم‌ها، EF و حرکت موضعی را دقیق اندازه‌گیری می‌کند.')],
  [L('Fluss & Ischämie', 'Flow & ischaemia', 'جریان و ایسکمی'), L('Shunts, Klappenfluss, Stressperfusion und Vitalität beantworten.', 'Assess shunts, valvular flow, stress perfusion and viability.', 'شانت‌ها، جریان دریچه‌ای، پرفیوژن استرس و حیات میوکارد را ارزیابی می‌کند.')],
]

const QUESTIONS = [
  {
    id: 'inflammation', short: 'T2 / LGE', title: L('Myokarditis & Entzündung', 'Myocarditis & inflammation', 'میوکاردیت و التهاب'),
    indication: L('Akuter Myokardschaden ohne klare Ischämie, Troponinanstieg, MINOCA, entzündliche Systemerkrankung.', 'Acute myocardial injury without clear ischaemia, troponin rise, MINOCA or systemic inflammatory disease.', 'آسیب حاد میوکارد بدون ایسکمی واضح، افزایش تروپونین، MINOCA یا بیماری التهابی سیستمیک.'),
    value: L('Ödem, nichtischämische Nekrose/Narbe und Ausmaß der Beteiligung; wichtige Abgrenzung zu Infarkt und Takotsubo.', 'Oedema, non-ischaemic injury/scar and disease extent; important distinction from infarction and Takotsubo.', 'ادم، آسیب یا اسکار غیرایسکمیک و وسعت درگیری؛ افتراق مهم از انفارکت و تاکوتسوبو.'),
    protocol: L('Cine · T1/T2-Mapping · T2 · Early/Late Gadolinium Enhancement', 'Cine · T1/T2 mapping · T2 · early/late gadolinium enhancement', 'Cine · مپینگ T1/T2 · T2 · افزایش زودرس/دیررس گادولینیوم'),
  },
  {
    id: 'cardiomyopathy', short: 'CINE / LGE', title: L('Kardiomyopathie-Phänotyp', 'Cardiomyopathy phenotype', 'فنوتیپ کاردیومیوپاتی'),
    indication: L('Unklare LV/RV-Dysfunktion, Hypertrophie, familiäre Kardiomyopathie, Arrhythmien oder auffällige Echokardiographie.', 'Unexplained LV/RV dysfunction, hypertrophy, familial cardiomyopathy, arrhythmia or abnormal echocardiography.', 'اختلال عملکرد نامشخص LV/RV، هیپرتروفی، کاردیومیوپاتی خانوادگی، آریتمی یا اکوکاردیوگرافی غیرطبیعی.'),
    value: L('Reproduzierbare Volumina und EF, Phänotypisierung sowie Narbenlast für Diagnose und Risikostratifikation.', 'Reproducible volumes and EF, phenotyping and scar burden for diagnosis and risk stratification.', 'حجم‌ها و EF قابل تکرار، تعیین فنوتیپ و بار اسکار برای تشخیص و ارزیابی خطر.'),
    protocol: L('Cine · T1/T2-Mapping · LGE · ggf. Flussmessung', 'Cine · T1/T2 mapping · LGE · flow imaging when needed', 'Cine · مپینگ T1/T2 · LGE · در صورت نیاز اندازه‌گیری جریان'),
  },
  {
    id: 'ischaemia', short: 'KHK', title: L('KHK / Myokardischämie', 'CAD / myocardial ischaemia', 'بیماری کرونر / ایسکمی میوکارد'),
    indication: L('Funktionelle Beurteilung einer vermuteten KHK oder unklarer Relevanz bekannter Koronarstenosen.', 'Functional assessment of suspected coronary disease or uncertain significance of known coronary stenoses.', 'ارزیابی عملکردی بیماری کرونری مشکوک یا اهمیت نامشخص تنگی‌های شناخته‌شده.'),
    value: L('Stressinduzierte Perfusionsdefekte, Wandbewegung, LV-Funktion und Infarktnarbe in einer Untersuchung.', 'Stress-induced perfusion defects, wall motion, LV function and infarct scar in one examination.', 'نقص پرفیوژن ناشی از استرس، حرکت دیواره، عملکرد LV و اسکار انفارکت در یک بررسی.'),
    protocol: L('Vasodilatator-Stressperfusion · Cine · LGE · Ruheperfusion optional', 'Vasodilator stress perfusion · cine · LGE · optional rest perfusion', 'پرفیوژن استرس با وازودیلاتور · Cine · LGE · پرفیوژن استراحت اختیاری'),
  },
  {
    id: 'viability', short: 'LGE', title: L('Infarkt & Vitalität', 'Infarction & viability', 'انفارکت و حیات میوکارد'),
    indication: L('LV-Dysfunktion nach Infarkt oder vor Revaskularisation bei unklarer Erholungsfähigkeit.', 'LV dysfunction after infarction or before revascularisation when recovery potential is uncertain.', 'اختلال عملکرد LV پس از انفارکت یا پیش از رواسکولاریزاسیون با امکان بهبود نامشخص.'),
    value: L('Lokalisation und transmuraler Anteil der Narbe; je geringer die Transmuralität, desto größer die Chance funktioneller Erholung.', 'Scar location and transmural extent; lower transmurality generally means a greater chance of functional recovery.', 'محل و وسعت ترانس‌مورال اسکار؛ هرچه درگیری تمام‌جداری کمتر باشد، احتمال بهبود عملکرد بیشتر است.'),
    protocol: L('Cine · LGE · ggf. Low-dose-Dobutamin', 'Cine · LGE · low-dose dobutamine when appropriate', 'Cine · LGE · در صورت لزوم دوبوتامین با دوز پایین'),
  },
  {
    id: 'flow', short: 'FLOW', title: L('Klappen, Shunts & angeborene Herzfehler', 'Valves, shunts & congenital heart disease', 'دریچه‌ها، شانت‌ها و بیماری مادرزادی قلب'),
    indication: L('Diskrepante oder limitierte Echo-Befunde, Quantifizierung von Regurgitation/Shunt, RV- und Gefäßbeurteilung.', 'Discordant or limited echocardiography, quantification of regurgitation or shunt, RV and great-vessel assessment.', 'اکوی محدود یا ناسازگار، کمی‌سازی رگورژیتاسیون یا شانت و ارزیابی RV و عروق بزرگ.'),
    value: L('Volumenbasierte Regurgitationsfraktion, Qp/Qs, präzise RV-Volumina und komplexe dreidimensionale Anatomie.', 'Volume-based regurgitant fraction, Qp/Qs, accurate RV volumes and complex three-dimensional anatomy.', 'کسر رگورژیتاسیون مبتنی بر حجم، Qp/Qs، حجم دقیق RV و آناتومی پیچیدهٔ سه‌بعدی.'),
    protocol: L('Cine · Phasenkontrast-Fluss · 3D-Angiographie · ggf. 4D-Flow', 'Cine · phase-contrast flow · 3D angiography · 4D flow when available', 'Cine · جریان فازکنتراست · آنژیوگرافی سه‌بعدی · در صورت امکان 4D-Flow'),
  },
  {
    id: 'infiltration', short: 'T1 / T2*', title: L('Infiltration & Speichererkrankungen', 'Infiltration & storage disease', 'بیماری‌های نفوذی و ذخیره‌ای'),
    indication: L('Verdacht auf Amyloidose, Fabry, kardiale Sarkoidose oder Eisenüberladung.', 'Suspected amyloidosis, Fabry disease, cardiac sarcoidosis or iron overload.', 'شک به آمیلوئیدوز، فابری، سارکوئیدوز قلبی یا اضافه‌بار آهن.'),
    value: L('Charakteristische Mapping- und LGE-Muster; T2* quantifiziert myokardiales Eisen.', 'Characteristic mapping and LGE patterns; T2* quantifies myocardial iron.', 'الگوهای مشخص مپینگ و LGE؛ T2* آهن میوکارد را کمی‌سازی می‌کند.'),
    protocol: L('Cine · natives T1/ECV · T2/T2* · LGE je nach Fragestellung', 'Cine · native T1/ECV · T2/T2* · LGE tailored to the question', 'Cine · T1 طبیعی/ECV · T2/T2* · LGE متناسب با پرسش'),
  },
  {
    id: 'mass', short: 'MASS', title: L('Raumforderung, Thrombus & Perikard', 'Mass, thrombus & pericardium', 'توده، ترومبوز و پریکارد'),
    indication: L('Unklare intrakardiale Struktur, Tumorverdacht, Perikardentzündung oder Verdacht auf Konstriktion.', 'Uncertain intracardiac structure, suspected tumour, pericardial inflammation or possible constriction.', 'ساختار نامشخص داخل قلب، شک به تومور، التهاب پریکارد یا احتمال کنستریکشن.'),
    value: L('Gewebecharakterisierung, Perfusion und Enhancement; Echtzeit-Cine zeigt ventrikuläre Interdependenz bei Konstriktion.', 'Tissue characterisation, perfusion and enhancement; real-time cine shows ventricular interdependence in constriction.', 'توصیف بافت، پرفیوژن و enhancement؛ Cine زمان‌واقعی وابستگی متقابل بطنی را در کنستریکشن نشان می‌دهد.'),
    protocol: L('Cine · T1/T2 · Perfusion · LGE · Echtzeit-Cine bei Atmung', 'Cine · T1/T2 · perfusion · LGE · free-breathing real-time cine', 'Cine · T1/T2 · پرفیوژن · LGE · Cine زمان‌واقعی حین تنفس'),
  },
]

const CORE_INDICATIONS = [
  [L('Myokarderkrankung', 'Myocardial disease', 'بیماری میوکارد'), L('Myokarditis, Kardiomyopathien, infiltrative und Speichererkrankungen, unklare Herzinsuffizienz.', 'Myocarditis, cardiomyopathies, infiltrative and storage diseases, unexplained heart failure.', 'میوکاردیت، کاردیومیوپاتی‌ها، بیماری‌های نفوذی و ذخیره‌ای و نارسایی قلبی نامشخص.')],
  [L('KHK', 'Coronary disease', 'بیماری کرونری'), L('Stressperfusion, Infarktnarbe, Vitalität und Komplikationen nach Myokardinfarkt.', 'Stress perfusion, infarct scar, viability and post-infarction complications.', 'پرفیوژن استرس، اسکار انفارکت، حیات میوکارد و عوارض پس از انفارکت.')],
  [L('Struktur & Fluss', 'Structure & flow', 'ساختار و جریان'), L('Kongenitale Herzfehler, Shunts, RV, große Gefäße und Klappenquantifizierung bei unklarem Echo.', 'Congenital heart disease, shunts, RV, great vessels and valve quantification when echo is inconclusive.', 'بیماری مادرزادی قلب، شانت‌ها، RV، عروق بزرگ و کمی‌سازی دریچه‌ای در اکوی نامشخص.')],
  [L('Tumor & Perikard', 'Tumour & pericardium', 'تومور و پریکارد'), L('Raumforderungen, Thrombusabgrenzung, Perikarditis und konstriktive Physiologie.', 'Masses, thrombus differentiation, pericarditis and constrictive physiology.', 'توده‌ها، افتراق ترومبوز، پریکاردیت و فیزیولوژی کنستریکتیو.')],
]

const TRIAGE = [
  [L('Akutes Koronarsyndrom / STEMI', 'Acute coronary syndrome / STEMI', 'سندرم حاد کرونری / STEMI'), L('Notfalldiagnostik und Revaskularisation haben Vorrang. CMR kann später Ursache, Infarktgröße oder MINOCA klären.', 'Emergency assessment and revascularisation take priority. CMR may later clarify cause, infarct size or MINOCA.', 'ارزیابی اورژانسی و رواسکولاریزاسیون اولویت دارد؛ CMR بعداً می‌تواند علت، اندازهٔ انفارکت یا MINOCA را روشن کند.')],
  [L('Koronaranatomie oder Kalk', 'Coronary anatomy or calcium', 'آناتومی یا کلسیم کرونر'), L('Für Lumen, Plaque und Kalzium ist meist Koronar-CT bzw. invasive Angiographie geeigneter.', 'Coronary CT or invasive angiography is generally better for lumen, plaque and calcium.', 'برای لومن، پلاک و کلسیم معمولاً CT کرونر یا آنژیوگرافی تهاجمی مناسب‌تر است.')],
  [L('Erste Klappen- oder EF-Beurteilung', 'Initial valve or EF assessment', 'ارزیابی اولیهٔ دریچه یا EF'), L('Echokardiographie ist schnell, verfügbar und meist First-line; CMR ergänzt bei schlechter Qualität oder Diskrepanz.', 'Echocardiography is rapid and usually first line; CMR complements limited or discordant studies.', 'اکوکاردیوگرافی سریع و معمولاً خط اول است؛ CMR در کیفیت پایین یا یافته‌های ناسازگار تکمیل‌کننده است.')],
  [L('Akute Aorta oder Lungenembolie', 'Acute aorta or pulmonary embolism', 'آئورت حاد یا آمبولی ریه'), L('Bei instabilen oder zeitkritischen Situationen ist CT-Angiographie in der Regel schneller und geeigneter.', 'In unstable or time-critical settings, CT angiography is generally faster and more appropriate.', 'در شرایط ناپایدار یا زمان‌حساس، CT آنژیوگرافی معمولاً سریع‌تر و مناسب‌تر است.')],
]

const SAFETY = [
  [L('Implantate', 'Implants', 'ایمپلنت‌ها'), L('Gerät und Elektroden exakt identifizieren. Viele Systeme sind MR Conditional; Untersuchung nur nach lokalem Sicherheitsprotokoll und ggf. Device-Programmierung.', 'Identify device and leads precisely. Many systems are MR Conditional; scan only under the local safety protocol with device programming when required.', 'نوع دستگاه و لیدها دقیق مشخص شود. بسیاری از سیستم‌ها MR Conditional هستند؛ بررسی فقط طبق پروتکل ایمنی محلی و در صورت نیاز با برنامه‌ریزی دستگاه انجام شود.')],
  [L('Nierenfunktion & Gadolinium', 'Renal function & gadolinium', 'عملکرد کلیه و گادولینیوم'), L('Aktuellen klinischen Kontext, eGFR und verwendetes Kontrastmittel berücksichtigen. Nutzen und Risiko nach lokaler Richtlinie abwägen.', 'Consider the current clinical context, eGFR and contrast agent. Balance benefit and risk according to local policy.', 'شرایط بالینی، eGFR و نوع مادهٔ کنتراست در نظر گرفته شود و سود و خطر طبق دستورالعمل محلی سنجیده شود.')],
  [L('Schwangerschaft', 'Pregnancy', 'بارداری'), L('Eine native MRT kann bei relevanter Fragestellung möglich sein; Gadolinium in der Schwangerschaft nicht routinemäßig geben.', 'Non-contrast MRI may be possible for a relevant question; gadolinium should not be given routinely in pregnancy.', 'MRI بدون کنتراست در صورت سؤال بالینی مهم ممکن است انجام شود؛ گادولینیوم در بارداری به‌طور روتین استفاده نشود.')],
  [L('Stress-CMR', 'Stress CMR', 'CMR استرس'), L('Koffein, Medikamente, Bronchospasmus, AV-Block und weitere Kontraindikationen des Stressors vorab nach lokalem Protokoll prüfen.', 'Check caffeine, medication, bronchospasm, AV block and other stress-agent contraindications according to local protocol.', 'کافئین، داروها، برونکواسپاسم، بلوک AV و سایر موارد منع عامل استرس طبق پروتکل محلی بررسی شود.')],
  [L('Bildqualität', 'Image quality', 'کیفیت تصویر'), L('Rhythmus, Atemanhaltefähigkeit, Klaustrophobie und Liegefähigkeit bestimmen Protokoll, Dauer und ggf. Sedierungsbedarf.', 'Rhythm, breath-holding, claustrophobia and ability to lie flat affect protocol, duration and possible sedation needs.', 'ریتم، توانایی حبس نفس، کلاستروفوبیا و امکان درازکشیدن بر پروتکل، زمان و احتمال نیاز به آرام‌بخشی اثر می‌گذارد.')],
]

const REFERRAL_CHECKLIST = [
  L('Eine konkrete Frage formulieren: Entzündung? Narbe? Ischämie? Shunt? Klappenfluss?', 'State one concrete question: inflammation, scar, ischaemia, shunt or valvular flow?', 'یک پرسش مشخص مطرح کنید: التهاب؟ اسکار؟ ایسکمی؟ شانت؟ جریان دریچه‌ای؟'),
  L('Vorbefunde nennen: Echo, EKG, Troponin, Koronarstatus, Operationen und relevante Bildgebung.', 'Include prior findings: echo, ECG, troponin, coronary status, surgery and relevant imaging.', 'یافته‌های قبلی شامل اکو، ECG، تروپونین، وضعیت کرونر، جراحی‌ها و تصویربرداری مرتبط ذکر شود.'),
  L('Implantatdaten, Rhythmus, Nierenfunktion, Schwangerschaft und Kontrastmittelreaktionen angeben.', 'Provide implant data, rhythm, renal function, pregnancy status and contrast reactions.', 'اطلاعات ایمپلنت، ریتم، عملکرد کلیه، وضعیت بارداری و واکنش به کنتراست ذکر شود.'),
  L('Bei Stress-CMR: relevante Medikamente, Koffeinkarenz und Kontraindikationen des Stressors klären.', 'For stress CMR, clarify relevant medication, caffeine restriction and stress-agent contraindications.', 'برای CMR استرس، داروهای مرتبط، پرهیز از کافئین و موارد منع عامل استرس بررسی شود.'),
]

const TAKE_HOME = [
  L('CMR ist besonders wertvoll, wenn Gewebecharakterisierung oder eine präzise RV/LV-Quantifizierung die Therapie verändert.', 'CMR is especially valuable when tissue characterisation or precise RV/LV quantification changes management.', 'CMR زمانی بیشترین ارزش را دارد که توصیف بافت یا کمی‌سازی دقیق RV/LV درمان را تغییر دهد.'),
  L('Die klinische Frage bestimmt das Protokoll – „Herz-MRT“ allein ist keine ausreichende Anmeldung.', 'The clinical question determines the protocol; “cardiac MRI” alone is not an adequate referral.', 'پرسش بالینی پروتکل را تعیین می‌کند؛ نوشتن صرف «MRI قلب» درخواست کافی نیست.'),
  L('Echo bleibt häufig First-line, CT beantwortet Anatomie und Kalk besser, CMR dominiert bei Funktion, Fluss und Gewebe.', 'Echo often remains first line, CT is better for anatomy and calcium, while CMR excels in function, flow and tissue.', 'اکو اغلب خط اول است، CT برای آناتومی و کلسیم بهتر است و CMR در عملکرد، جریان و بافت برتری دارد.'),
  L('Sicherheitscheck und Protokollplanung gehören vor die Untersuchung – besonders bei Implantaten, Stress und Gadolinium.', 'Safety screening and protocol planning come before scanning, especially with implants, stress and gadolinium.', 'بررسی ایمنی و برنامه‌ریزی پروتکل باید پیش از اسکن انجام شود، به‌ویژه در ایمپلنت، استرس و گادولینیوم.'),
]

const SOURCES = [
  ['SCMR · Clinical indications for CMR (2020)', 'https://doi.org/10.1186/s12968-020-00682-4'],
  ['SCMR · Standardized CMR protocols (2020)', 'https://scmr.org/news/standardized-cardiovascular-magnetic-resonance-imaging-cmr-protocols-2020-update/'],
  ['EACVI · CMR Pocket Guides', 'https://www.escardio.org/communities/associations/eacvi/scientific-documents-and-publications/cmr-pocket-guides/'],
  ['ESC · Myocarditis and pericarditis guideline (2025)', 'https://www.escardio.org/guidelines/clinical-practice-guidelines/all-esc-practice-guidelines/myocarditis-and-pericarditis/'],
  ['ACR · MR Safety Manual', 'https://www.acr.org/Clinical-Resources/Clinical-Tools-and-Reference/radiology-safety/mr-safety'],
  ['ACR · Contrast Media Manual', 'https://www.acr.org/Clinical-Resources/Clinical-Tools-and-Reference/Contrast-Manual'],
]

const KHK_PATHWAYS = [
  { id: 'verdacht', label: 'Verdacht auf KHK', exam: 'Stress-MRT', goal: 'Ischämienachweis', detail: 'Nachweis eines reversiblen Perfusionsdefizits.' },
  { id: 'gesichert', label: 'Gesicherte KHK', exam: 'Stress-MRT + LGE', goal: 'Relevanz, Vitalität und Narbe', detail: 'Stress-MRT prüft die hämodynamische Relevanz; LGE beurteilt Vitalität und Narbe.' },
  { id: 'akut', label: 'Akutes Koronarsyndrom', exam: 'Funktion + T2 + LGE', goal: 'Differentialdiagnose und Komplikationen', detail: 'Die Indikation hängt von der klinischen Situation und der Stabilität des Patienten ab.' },
  { id: 'behandelt', label: 'Behandelte KHK', exam: 'MRT bei erneuten Symptomen', goal: 'Gezielte erneute Abklärung', detail: 'Nach PCI oder Bypass stehen symptomatische Patienten im Vordergrund.' },
]

function SectionIcon({ id }) {
  const paths = {
    overview: 'M4 5h16v14H4z M8 9h8 M8 13h5', indications: 'M12 3 20 7v5c0 5-4 8-8 9-4-1-8-4-8-9V7z M8 12l3 3 5-6', triage: 'M12 3 3 20h18z M12 9v5 M12 17h.01', safety: 'M12 3 20 7v5c0 5-4 8-8 9-4-1-8-4-8-9V7z M12 8v4 M12 16h.01', referral: 'M5 3h14v18H5z M9 8h6 M9 12h6 M9 16h4', takehome: 'M9 18h6 M10 22h4 M8 14a7 7 0 1 1 8 0c-1 1-2 2-2 4h-4c0-2-1-3-2-4z', sources: 'M12 5c-2-2-5-2-9-1v15c4-1 7-1 9 1 2-2 5-2 9-1V4c-4-1-7-1-9 1z M12 5v15',
  }
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[id] || paths.overview} /></svg>
}

function ReadButton({ ui, isRead, toggleRead, authError, withLang }) {
  return <div className={base.readControl}><button type="button" className={`${base.readButton} ${isRead ? base.readButtonActive : ''}`} onClick={toggleRead}><span className={base.readCheck}>{isRead ? '✓' : ''}</span><span>{isRead ? ui.readDone : ui.read}</span></button>{authError && <div className={base.readError}><span>{ui.auth}</span><Link href={withLang('/sign-in')}>{ui.signIn}</Link></div>}</div>
}

function Section({ id, title, openId, setOpenId, children }) {
  const open = openId === id
  return <section id={id} className={`${base.section} ${styles.section}`}>
    <button type="button" className={`${base.sectionHeader} ${styles.sectionHeader}`} aria-expanded={open} onClick={() => setOpenId(open ? null : id)}><span className={styles.sectionHeading}><span className={styles.sectionIcon}><SectionIcon id={id} /></span><h2>{title}</h2></span><span className={styles.sectionToggle}>{open ? '−' : '+'}</span></button>
    {open ? <div className={`${base.sectionBody} ${styles.sectionBody}`}>{children}</div> : null}
  </section>
}

function KhkDetail() {
  const [pathwayId, setPathwayId] = useState(KHK_PATHWAYS[0].id)
  const pathway = KHK_PATHWAYS.find(item => item.id === pathwayId) || KHK_PATHWAYS[0]

  return <div className={styles.khkDetail}>
    <header className={styles.khkHeader}>
      <div><span>VERTIEFUNG KHK</span><h3>Indikationen der Herz-MRT bei KHK</h3></div>
      <p>Entscheidend ist, ob es sich um eine Erstdiagnose, eine bereits gesicherte KHK oder eine bereits behandelte KHK handelt.</p>
    </header>

    <div className={styles.khkPathway}>
      <div className={styles.khkPathTabs} role="tablist" aria-label="Klinische Ausgangssituation">
        {KHK_PATHWAYS.map(item => <button key={item.id} type="button" role="tab" aria-selected={pathwayId === item.id} className={pathwayId === item.id ? styles.khkPathActive : ''} onClick={() => setPathwayId(item.id)}>{item.label}</button>)}
      </div>
      <div className={styles.khkPathResult} role="tabpanel" aria-live="polite">
        <div><small>Untersuchung</small><strong>{pathway.exam}</strong></div><span aria-hidden="true">→</span><div><small>Ziel</small><strong>{pathway.goal}</strong></div>
        <p>{pathway.detail}</p>
      </div>
    </div>

    <div className={styles.khkSections}>
      <details open>
        <summary><span>01</span><strong>Erstdiagnose bei Verdacht auf KHK</strong></summary>
        <div className={styles.khkSectionBody}>
          <div className={styles.khkTitleRow}><div><small>Stabile Angina pectoris</small><h4>Ischämie unter Belastung nachweisen</h4></div><b>I2-Indikation</b></div>
          <p>Bei symptomatischen Patienten kann die Stress-MRT zum Nachweis einer relevanten Myokardischämie eingesetzt werden.</p>
          <div className={styles.khkKey}><small>Bildgebendes Korrelat</small><strong>Reversibles Perfusionsdefizit</strong></div>
          <p>Ein Perfusionsdefizit, das unter pharmakologischem Stress auftritt und in Ruhe nicht nachweisbar ist, entspricht einer stressinduzierten Ischämie.</p>
          <div className={styles.khkSplit}><div><h4>Typische klinische Situation</h4><ul><li>typische Beschwerden</li><li>KHK-Verdacht</li><li>Ergometrie nicht möglich oder nicht aussagekräftig</li><li>andere funktionelle Untersuchungen uneindeutig</li></ul></div><div><h4>Prinzip der Stress-Perfusion</h4><p>Unter Stress wird die myokardiale Perfusion beurteilt. Ein stressinduziertes Perfusionsdefizit zeigt sich typischerweise subendokardial.</p><div className={styles.perfusionDiagram}><div><i /><strong>Stress</strong><small>Defizit sichtbar</small></div><span>→</span><div><i className={styles.restRing} /><strong>Ruhe</strong><small>nicht nachweisbar</small></div></div></div></div>
          <div className={styles.khkKey}><small>Merksatz</small><strong>Ischämiediagnostik = Nachweis eines reversiblen Perfusionsdefizits</strong></div>
        </div>
      </details>

      <details>
        <summary><span>02</span><strong>Akutes Koronarsyndrom</strong></summary>
        <div className={styles.khkSectionBody}>
          <p>Die Indikation zur Herz-MRT ist abhängig von der klinischen Situation.</p>
          <div className={styles.acsCards}>
            <article><div><h4>Instabile Angina pectoris</h4><b>I3</b></div><p>Grundsätzlich geht es um den Nachweis einer hämodynamisch relevanten Koronarstenose. Für eine Stress-MRT muss der Patient ausreichend stabil sein.</p></article>
            <article><div><h4>NSTEMI</h4><b>I2</b></div><p>Die Herz-MRT kann insbesondere zur weiteren Differenzierung der zugrunde liegenden Myokardschädigung eingesetzt werden.</p><small>Funktion · T2 · Late Gadolinium Enhancement</small></article>
            <article><div><h4>STEMI</h4><b>I3</b></div><p>Im Vordergrund stehen Risikostratifizierung, Infarktausdehnung und Komplikationen – nicht primär die stressinduzierte Ischämie.</p><small>Funktion · T2 · Late Enhancement</small></article>
          </div>
          <div className={styles.patternRows}><div><strong>Myokardinfarkt</strong><p>Typischerweise subendokardiales Late Enhancement.</p></div><div><strong>Takotsubo-Kardiomyopathie</strong><p>Ausgeprägte Wandbewegungsstörungen und Myokardödem, jedoch ohne typisches Infarktmuster im Late Enhancement.</p></div><div><strong>Myokarditis</strong><p>Wandbewegungsstörungen bzw. Myokardschädigung mit nicht-ischämischem Late-Enhancement-Muster, beispielsweise subepikardial.</p></div></div>
        </div>
      </details>

      <details>
        <summary><span>03</span><strong>Narben- und Infarktbeurteilung</strong></summary>
        <div className={styles.khkSectionBody}>
          <p>Eine wichtige Stärke der Herz-MRT ist die Beurteilung der Myokardnarbe.</p>
          <div className={styles.khkKey}><small>Entscheidende Frage</small><strong>Wie transmural ist das Late Enhancement?</strong></div>
          <p>Je größer der Anteil des Myokards mit Late Enhancement ist, desto ausgeprägter ist die Narbenbildung.</p>
          <div className={styles.khkSplit}><article><h4>Mikrovaskuläre Obstruktion</h4><p>Eine No-Reflow-Situation: ein dunkles Areal innerhalb des infarzierten Myokards, in das auch in der Spätaufnahme kein Kontrastmittel einströmt. Ihr Vorliegen ist mit einer geringeren funktionellen Erholung verbunden.</p></article><article><h4>Intrakardialer Thrombus</h4><p>Ein Thrombus kann als dunkles, dem Endokard anliegendes Areal dargestellt werden. Die MRT kann außerdem weitere Komplikationen wie ein Herzspitzenaneurysma erfassen.</p></article></div>
        </div>
      </details>

      <details>
        <summary><span>04</span><strong>Gesicherte KHK</strong></summary>
        <div className={styles.khkSectionBody}>
          <p>Bei bereits bekannter KHK stellen sich vor allem zwei Fragen:</p>
          <div className={styles.khkQuestion}><span>A</span><div><h4>Ist die Koronarstenose ischämierelevant?</h4><p>Bei unklarer hämodynamischer Relevanz einer bekannten Koronarstenose kann eine Stress-Untersuchung durchgeführt werden. Ziel ist der Nachweis einer stressinduzierten Ischämie. Dies kann beispielsweise bei Patienten mit Mehrgefäßerkrankung relevant sein.</p></div></div>
          <div className={styles.khkQuestion}><span>B</span><div><div className={styles.khkTitleRow}><h4>Ist das versorgte Myokard noch vital?</h4><b>I1-Indikation</b></div><p>Die Transmuralität des Late Enhancements wird beurteilt. Je transmuraler der Infarkt, desto geringer ist die zu erwartende funktionelle Erholung nach Revaskularisation. Entscheidend ist der Anteil des Myokards mit Late Enhancement im Verhältnis zum nicht vernarbten Myokard.</p></div></div>
        </div>
      </details>

      <details>
        <summary><span>05</span><strong>Bereits behandelte KHK</strong></summary>
        <div className={styles.khkSectionBody}><p>Auch nach perkutaner Koronarintervention oder Bypass-Operation kann eine Herz-MRT sinnvoll sein. Im Vordergrund stehen insbesondere symptomatische Patienten.</p><div className={styles.khkWarning}><strong>Keine Routinenachsorge</strong><p>Eine routinemäßige Herz-MRT bei asymptomatischen Patienten allein zur Nachsorge sollte nicht durchgeführt werden.</p></div></div>
      </details>

      <details>
        <summary><span>06</span><strong>Ruheperfusion – notwendig?</strong></summary>
        <div className={styles.khkSectionBody}><p>Eine Ruheperfusion ist laut den dargestellten Empfehlungen nicht verpflichtend. Sie kann jedoch hilfreich sein, um insbesondere Artefakte zu erkennen und mit der Stressperfusion zu vergleichen.</p><p>Ein Perfusionsdefizit in Ruhe bedeutet nicht automatisch, dass eine Narbe vorliegt. Auch eine fixierte Narbe kann zu einem Perfusionsdefizit führen, dies ist jedoch nicht zuverlässig.</p><div className={styles.khkKey}><small>Daher gilt</small><strong>Eine Narbe wird nicht zuverlässig über die Ruheperfusion beurteilt.</strong></div></div>
      </details>

      <details>
        <summary><span>07</span><strong>Praktischer Einsatz der Herz-MRT</strong></summary>
        <div className={styles.khkSectionBody}><p>Die Herz-MRT ist mit einem mittleren bis hohen Untersuchungsaufwand verbunden und die Zahl verfügbarer Untersuchungsplätze kann limitiert sein. Deshalb ist eine klinische Stratifizierung wichtig.</p><div className={styles.khkClinicalQuestion}><small>Vor jeder Untersuchung klären</small><strong>Welche konkrete klinische Frage soll die MRT beantworten?</strong></div><ul><li>Das Untersuchungsprotokoll sollte an die Fragestellung angepasst werden.</li><li>Eine übermäßige Untersuchung asymptomatischer Patienten sollte vermieden werden.</li><li>Auch bei gesicherter Diagnose sollte ein zusätzlicher diagnostischer Mehrwert zu erwarten sein.</li></ul></div>
      </details>
    </div>

    <div className={styles.khkSummary}>
      <h4>Merkschema</h4><div>{KHK_PATHWAYS.map(item => <article key={item.id}><small>{item.label}</small><strong>{item.exam}</strong><p>{item.goal}</p></article>)}</div>
      <h4>Zentrale Begriffe</h4><dl><div><dt>Reversibles Perfusionsdefizit</dt><dd>Ischämie</dd></div><div><dt>Stress-Perfusion</dt><dd>Ischämiediagnostik</dd></div><div><dt>Late Enhancement</dt><dd>Beurteilung von Infarkt und Narbe</dd></div><div><dt>Transmuralität</dt><dd>Abschätzung der Myokardvitalität</dd></div></dl>
    </div>
  </div>
}

export default function CardiacMriIndicationsPage() {
  const { lang } = useLanguage()
  const ui = COPY[lang] || COPY.de
  const c = value => value?.[lang] || value?.de || value
  const [openId, setOpenId] = useState('overview')
  const [activeId, setActiveId] = useState('overview')
  const [questionId, setQuestionId] = useState('inflammation')
  const { isRead, toggleRead, authError } = useLessonReadStatus('kardio-mrt-indikationen')
  useMobileLearningLayout()
  const selectedQuestion = QUESTIONS.find(item => item.id === questionId) || QUESTIONS[0]
  const withLang = href => lang === 'de' ? href : `${href}${href.includes('?') ? '&' : '?'}lang=${lang}`

  useEffect(() => {
    const observers = SECTION_IDS.map(id => {
      const element = document.getElementById(id)
      if (!element) return null
      const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setActiveId(id) }, { rootMargin: '-18% 0px -72% 0px', threshold: 0.01 })
      observer.observe(element)
      return observer
    })
    return () => observers.forEach(observer => observer?.disconnect())
  }, [])

  const jumpTo = id => {
    setOpenId(id)
    window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 20)
  }

  return <main className={`${base.page} ${styles.page}`} dir={lang === 'fa' ? 'rtl' : 'ltr'} lang={lang}>
    <header className={`${base.header} ${styles.header}`}>
      <nav className={`${base.breadcrumb} ${styles.breadcrumb}`} aria-label="Breadcrumb"><Link href={withLang('/')}>RadYar</Link><span>›</span><Link href={withLang('/lernen/thorax')}>{ui.thorax}</Link><span>›</span><Link href={withLang('/lernen/thorax')}>{ui.chapter}</Link><span>›</span><strong>{ui.title}</strong></nav>
      <div className={`${base.hero} ${styles.hero}`}>
        <div className={`${base.heroText} ${styles.heroText}`}><span className={`${base.sourceBadge} ${styles.sourceBadge}`}>Dr. Zia</span><span className={styles.eyebrow}>INDIKATION · KARDIO-MRT</span><h1>{ui.title}</h1><p>{ui.subtitle}</p><small>{ui.source}</small></div>
        <LessonKeyPoints points={KEY_POINTS.map(([title, text]) => [c(title), c(text)])} />
      </div>
    </header>

    <div className={`${base.readBar} ${styles.readBar}`}><ReadButton ui={ui} isRead={isRead} toggleRead={toggleRead} authError={authError} withLang={withLang} /></div>

    <div className={`${base.layout} ${styles.layout}`}>
      <aside className={`${base.sidebar} ${styles.sidebar}`}><div className={base.sideTitle}>{ui.contents}</div>{SECTION_IDS.map(id => <button key={id} type="button" className={`${base.sideItem} ${styles.sideItem} ${activeId === id ? `${base.sideItemActive} ${styles.sideItemActive}` : ''}`} onClick={() => jumpTo(id)}><span className={styles.sideIcon}><SectionIcon id={id} /></span><strong>{c(SECTION_LABELS[id])}</strong></button>)}</aside>

      <div className={`${base.main} ${styles.content}`}>
        <section className={styles.questionLab} aria-label={ui.choose}>
          <header><span>QUESTION FIRST</span><h2>{ui.choose}</h2></header>
          <div className={styles.questionTabs} role="tablist" aria-label={ui.choose}>{QUESTIONS.map(item => <button key={item.id} type="button" role="tab" aria-selected={questionId === item.id} className={questionId === item.id ? styles.questionActive : ''} onClick={() => setQuestionId(item.id)}><small>{item.short}</small><strong>{c(item.title)}</strong></button>)}</div>
          <article className={styles.questionPanel} role="tabpanel"><div className={styles.questionBadge}>{selectedQuestion.short}</div><div><small>{ui.indication}</small><h3>{c(selectedQuestion.title)}</h3><p>{c(selectedQuestion.indication)}</p></div><dl><div><dt>{ui.value}</dt><dd>{c(selectedQuestion.value)}</dd></div><div><dt>{ui.sequence}</dt><dd>{c(selectedQuestion.protocol)}</dd></div></dl></article>
          {questionId === 'ischaemia' && lang === 'de' ? <KhkDetail /> : null}
        </section>

        <Section id="overview" title={c(SECTION_LABELS.overview)} openId={openId} setOpenId={setOpenId}>
          <div className={styles.principleGrid}><article><span>01</span><h3>{c(L('Wenn Gewebe zählt', 'When tissue matters', 'وقتی بافت اهمیت دارد'))}</h3><p>{c(L('CMR erkennt Ödem, Fibrose, Narbe, Fett, Eisen und diffuse Infiltration – Informationen, die Echo und CT nur eingeschränkt liefern.', 'CMR detects oedema, fibrosis, scar, fat, iron and diffuse infiltration—information only partly available from echo or CT.', 'CMR ادم، فیبروز، اسکار، چربی، آهن و نفوذ منتشر را شناسایی می‌کند؛ اطلاعاتی که اکو یا CT فقط به‌صورت محدود ارائه می‌کنند.'))}</p></article><article><span>02</span><h3>{c(L('Wenn Quantifizierung zählt', 'When quantification matters', 'وقتی کمی‌سازی اهمیت دارد'))}</h3><p>{c(L('CMR ist Referenzmethode für biventrikuläre Volumina und Funktion und besonders stark beim rechten Ventrikel.', 'CMR is the reference method for biventricular volumes and function and is especially strong for the right ventricle.', 'CMR روش مرجع برای حجم و عملکرد هر دو بطن است و به‌ویژه در ارزیابی بطن راست برتری دارد.'))}</p></article><article><span>03</span><h3>{c(L('Wenn mehrere Fragen zusammenkommen', 'When questions overlap', 'وقتی چند پرسش هم‌زمان مطرح است'))}</h3><p>{c(L('Morphologie, Funktion, Perfusion, Fluss und Gewebe lassen sich in einer maßgeschneiderten Untersuchung kombinieren.', 'Morphology, function, perfusion, flow and tissue can be combined in one tailored examination.', 'مورفولوژی، عملکرد، پرفیوژن، جریان و بافت را می‌توان در یک بررسی هدفمند ترکیب کرد.'))}</p></article></div>
          <div className={styles.note}><strong>{ui.noRadiation}</strong><p>{ui.contrastNote}</p></div>
        </Section>

        <Section id="indications" title={c(SECTION_LABELS.indications)} openId={openId} setOpenId={setOpenId}>
          <div className={styles.indicationGrid}>{CORE_INDICATIONS.map(([title, text], index) => <article key={c(title)}><span>{String(index + 1).padStart(2, '0')}</span><h3>{c(title)}</h3><p>{c(text)}</p></article>)}</div>
          <div className={styles.ruleBox}><strong>{c(L('Merksatz', 'Rule of thumb', 'نکتهٔ کلیدی'))}</strong><p>{c(L('CMR ist indiziert, wenn die Antwort die Diagnose, Risikostratifikation, Therapie oder Verlaufskontrolle voraussichtlich verändert und eine andere Methode die Frage nicht gleichwertig beantwortet.', 'CMR is indicated when its answer is likely to change diagnosis, risk stratification, treatment or follow-up and another method cannot answer the question equivalently.', 'CMR زمانی اندیکاسیون دارد که پاسخ آن احتمالاً تشخیص، ارزیابی خطر، درمان یا پیگیری را تغییر دهد و روش دیگری پاسخ هم‌ارز ارائه نکند.'))}</p></div>
        </Section>

        <Section id="triage" title={c(SECTION_LABELS.triage)} openId={openId} setOpenId={setOpenId}>
          <div className={styles.alert}><strong>{ui.important}</strong><p>{ui.notEmergency}</p></div>
          <div className={styles.triageGrid}>{TRIAGE.map(([title, text]) => <article key={c(title)}><h3>{c(title)}</h3><p>{c(text)}</p></article>)}</div>
        </Section>

        <Section id="safety" title={c(SECTION_LABELS.safety)} openId={openId} setOpenId={setOpenId}>
          <div className={styles.safetyList}>{SAFETY.map(([title, text], index) => <article key={c(title)}><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{c(title)}</h3><p>{c(text)}</p></div></article>)}</div>
        </Section>

        <Section id="referral" title={c(SECTION_LABELS.referral)} openId={openId} setOpenId={setOpenId}>
          <div className={styles.checklist}>{REFERRAL_CHECKLIST.map(item => <div key={c(item)}><span>✓</span><p>{c(item)}</p></div>)}</div>
          <div className={styles.referralExample}><strong>{ui.example}</strong><p>{c(L('„Unklare nichtischämische LV-Dysfunktion (LVEF 38 % im Echo), Koronarangiographie ohne relevante Stenose. Frage: Kardiomyopathie-Phänotyp, Myokardnarbe und aktive Entzündung? Sinusrhythmus, eGFR 72 ml/min/1,73 m², kein Implantat.“', '“Unexplained non-ischaemic LV dysfunction (echo LVEF 38%); coronary angiography without relevant stenosis. Question: cardiomyopathy phenotype, myocardial scar and active inflammation? Sinus rhythm, eGFR 72 mL/min/1.73 m², no implant.”', '«اختلال عملکرد غیرایسکمیک نامشخص LV (LVEF در اکو ۳۸٪)، آنژیوگرافی کرونر بدون تنگی مهم. پرسش: فنوتیپ کاردیومیوپاتی، اسکار میوکارد و التهاب فعال؟ ریتم سینوسی، eGFR برابر ۷۲ و بدون ایمپلنت.»'))}</p></div>
        </Section>

        <Section id="takehome" title={c(SECTION_LABELS.takehome)} openId={openId} setOpenId={setOpenId}>
          <div className={styles.takeHomeGrid}>{TAKE_HOME.map(item => <div key={c(item)}><span>✓</span><p>{c(item)}</p></div>)}</div>
        </Section>

        <Section id="sources" title={ui.sources} openId={openId} setOpenId={setOpenId}>
          <div className={styles.sources}>{SOURCES.map(([label, href]) => <a key={href} href={href} target="_blank" rel="noopener noreferrer">{label}<span>↗</span></a>)}</div>
        </Section>

        <div className={`${base.readBar} ${styles.bottomRead}`}><ReadButton ui={ui} isRead={isRead} toggleRead={toggleRead} authError={authError} withLang={withLang} /></div>
      </div>
    </div>
  </main>
}
