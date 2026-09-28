'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import { usePersistedSectionProgress } from '@/hooks/usePersistedSectionProgress'
import template from '@/app/andarun/test/page.module.css'
import styles from './page.module.css'

const ID = 'myokardinfarkt-differentialdiagnosen'
const PATH = '/thorax/kardio/myokardinfarkt-differentialdiagnosen'
const L = (de, en, fa) => ({ de, en, fa })
const pick = (value, lang) => typeof value === 'string' ? value : value?.[lang] || value?.de || ''

const COPY = {
  title: L('Rolle der Kardio-MRT bei Troponinanstieg', 'Role of cardiac MRI in patients with elevated troponin', 'نقش MRI قلب در بیمار با افزایش تروپونین'),
  thorax: L('Thorax', 'Thorax', 'قفسه سینه'),
  chapter: L('Herz / Kardio-MRT', 'Heart / cardiac MRI', 'قلب / MRI قلب'),
  contents: L('Lektionsinhalt', 'Lesson content', 'محتوای درس'),
  path: L('Lernpfad', 'Learning path', 'مسیر یادگیری'),
  progress: L('gelesen', 'read', 'خوانده‌شده'),
  continue: L('Lektion fortsetzen', 'Continue lesson', 'ادامه درس'),
  completeLesson: L('Ganze Lektion als gelesen markieren', 'Mark full lesson as read', 'علامت‌گذاری کل درس به‌عنوان خوانده‌شده'),
  lessonCompleted: L('Ganze Lektion gelesen', 'Full lesson marked as read', 'کل درس خوانده شد'),
  complete: L('Abschnitt als gelesen markieren', 'Mark section as read', 'علامت‌گذاری بخش به‌عنوان خوانده‌شده'),
  completed: L('Als gelesen markiert', 'Marked as read', 'به‌عنوان خوانده‌شده علامت‌گذاری شد'),
  open: L('Abschnitt öffnen', 'Open section', 'باز کردن بخش'),
  close: L('Schließen', 'Close', 'بستن'),
  start: L('Entscheidungsweg starten', 'Start decision pathway', 'شروع مسیر تصمیم‌گیری'),
  synthetic: L('Synthetische Lehrabbildung · kein Patientendatensatz', 'Synthetic teaching image · not a patient dataset', 'تصویر آموزشی ساختگی · بدون دادهٔ بیمار'),
}

const SECTIONS = [
  { id: 'ausgangspunkt', label: L('Ausgangspunkt: Troponinanstieg', 'Starting point: troponin rise', 'نقطه شروع: افزایش تروپونین') },
  { id: 'toolbox', label: L('CMR-Toolbox', 'CMR toolbox', 'ابزارهای CMR') },
  { id: 'lge-muster', label: L('Infarkt- oder Nicht-Infarkt-Typ?', 'Infarct or non-infarct pattern?', 'الگوی انفارکتی یا غیرانفارکتی؟') },
  { id: 'infarkt', label: L('Akuter & chronischer Infarkt', 'Acute & chronic infarction', 'انفارکت حاد و مزمن') },
  { id: 'minoca-takotsubo', label: L('MINOCA & Takotsubo', 'MINOCA & Takotsubo', 'MINOCA و تاکوتسوبو') },
  { id: 'entzuendung', label: L('Myokarditis & Sarkoidose', 'Myocarditis & sarcoidosis', 'میوکاردیت و سارکوئیدوز') },
  { id: 'algorithmus', label: L('Entscheidungsalgorithmus', 'Decision algorithm', 'الگوریتم تصمیم‌گیری') },
  { id: 'takehome', label: L('Take Home', 'Take home', 'نکات کلیدی') },
]
const SECTION_IDS = SECTIONS.map(section => section.id)

const ICONS = {
  ausgangspunkt: 'M4 12h4l2-5 4 10 2-5h4 M5 4h14v16H5z',
  toolbox: 'M4 7h16v13H4z M8 7V4h8v3 M8 12h8 M12 9v6',
  'lge-muster': 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18 M12 7v10 M7 12h10',
  infarkt: 'M3 12h4l2-6 5 12 3-7h4 M12 3v3 M12 18v3',
  'minoca-takotsubo': 'M5 5h14v14H5z M8 9h8 M8 13h5 M8 17h3',
  entzuendung: 'M12 3c4 3 6 6 6 10a6 6 0 0 1-12 0c0-4 2-7 6-10 M9 13h6',
  algorithmus: 'M6 4h12v4H6z M6 16h12v4H6z M12 8v8 M9 13l3 3 3-3',
  takehome: 'M12 3l8 3v6c0 5-8 9-8 9s-8-4-8-9V6z M8 12l3 3 5-6',
}

const PATTERNS = [
  {
    id: 'infarct', short: 'LGE', title: L('Infarkt / MINOCA', 'Infarction / MINOCA', 'انفارکت / MINOCA'),
    image: '/thorax/kardio/myokardinfarkt-differentialdiagnosen/synthetic-infarct-lge.jpg',
    alt: L('Synthetische LGE-Kurzachsenaufnahme mit subendokardial bis transmuralem Infarktmuster und dunkler mikrovaskulärer Obstruktion', 'Synthetic short-axis LGE image with subendocardial-to-transmural infarct pattern and dark microvascular obstruction', 'تصویر ساختگی LGE محور کوتاه با الگوی انفارکت ساب‌اندوکاردیال تا ترانس‌مورال و انسداد میکروواسکولار تیره'),
    lge: L('Subendokardial bis transmural, einem Koronarterritorium folgend', 'Subendocardial to transmural, following a coronary territory', 'ساب‌اندوکاردیال تا ترانس‌مورال، مطابق قلمرو عروق کرونر'),
    edema: L('Beim akuten Infarkt deutlich', 'Marked in acute infarction', 'در انفارکت حاد واضح'),
    cine: L('Regionale Hypo-/Akinesie; bei MVO schlechtere Prognose', 'Regional hypo-/akinesia; worse prognosis with MVO', 'هیپو/آکینزی موضعی؛ پیش‌آگهی بدتر در MVO'),
  },
  {
    id: 'takotsubo', short: 'CINE', title: L('Takotsubo', 'Takotsubo', 'تاکوتسوبو'),
    image: '/thorax/kardio/myokardinfarkt-differentialdiagnosen/synthetic-takotsubo-cine.jpg',
    alt: L('Synthetische Cine-Langachsenaufnahme mit apikalem Ballooning bei Takotsubo', 'Synthetic long-axis cine image with apical ballooning in Takotsubo syndrome', 'تصویر ساختگی Cine محور بلند با بالونینگ اپیکال در تاکوتسوبو'),
    lge: L('Kein typisches LGE als Zeichen irreversibler Schädigung', 'No typical LGE indicating irreversible injury', 'LGE تیپیک دال بر آسیب برگشت‌ناپذیر وجود ندارد'),
    edema: L('Möglich, aber nicht obligat', 'Possible, but not mandatory', 'ممکن است وجود داشته باشد، اما الزامی نیست'),
    cine: L('Typische mittelventrikuläre bis apikale Hypo-/Akinesie', 'Typical mid-ventricular to apical hypo-/akinesia', 'هیپو/آکینزی تیپیک از میانی بطن تا اپکس'),
  },
  {
    id: 'myocarditis', short: 'T1/T2', title: L('Myokarditis', 'Myocarditis', 'میوکاردیت'),
    image: '/thorax/kardio/myokardinfarkt-differentialdiagnosen/synthetic-myocarditis-lge.jpg',
    alt: L('Synthetische LGE-Kurzachsenaufnahme mit subepikardialem inferolateralem Myokarditismuster', 'Synthetic short-axis LGE image with a subepicardial inferolateral myocarditis pattern', 'تصویر ساختگی LGE محور کوتاه با الگوی ساب‌اپیکاردیال اینفرولاترال میوکاردیت'),
    lge: L('Nichtischämisch: subepikardial und/oder midmyokardial', 'Non-ischaemic: subepicardial and/or mid-wall', 'غیرایسکمیک: ساب‌اپیکاردیال و/یا میدوال'),
    edema: L('T2-basiertes Zeichen aktiver Entzündung', 'T2-based marker of active inflammation', 'نشانه مبتنی بر T2 از التهاب فعال'),
    cine: L('Normal möglich; regionale oder globale Dysfunktion möglich', 'May be normal; regional or global dysfunction may occur', 'ممکن است طبیعی باشد؛ اختلال موضعی یا کلی ممکن است رخ دهد'),
  },
  {
    id: 'sarcoidosis', short: 'PATCHY', title: L('Sarkoidose', 'Sarcoidosis', 'سارکوئیدوز'),
    image: '/thorax/kardio/myokardinfarkt-differentialdiagnosen/synthetic-sarcoidosis-lge.jpg',
    alt: L('Synthetische LGE-Kurzachsenaufnahme mit multifokal fleckigem nichtischämischem Muster bei kardialer Sarkoidose', 'Synthetic short-axis LGE image with multifocal patchy non-ischaemic pattern in cardiac sarcoidosis', 'تصویر ساختگی LGE محور کوتاه با الگوی چندکانونی لکه‌ای غیرایسکمیک در سارکوئیدوز قلبی'),
    lge: L('Fleckig, multifokal, häufig septal und lateral; kein Koronarterritorium', 'Patchy, multifocal, often septal and lateral; no coronary territory', 'لکه‌ای و چندکانونی، اغلب سپتال و لترال؛ بدون قلمرو کرونری'),
    edema: L('Bei aktiver Entzündung möglich', 'Possible with active inflammation', 'در التهاب فعال ممکن است دیده شود'),
    cine: L('Dyskinesie oder LV-Dysfunktion möglich', 'Dyskinesia or LV dysfunction may occur', 'دیسکینزی یا اختلال عملکرد LV ممکن است رخ دهد'),
  },
]

const TROPNON_CORONARY = [
  L('Tachykarde Herzrhythmusstörung', 'Tachyarrhythmia', 'تاکی‌آریتمی'),
  L('Lungenarterienembolie', 'Pulmonary embolism', 'آمبولی ریه'),
  L('Herzinsuffizienz', 'Heart failure', 'نارسایی قلبی'),
  L('Aortenstenose', 'Aortic stenosis', 'تنگی آئورت'),
  L('Aortendissektion', 'Aortic dissection', 'دیسکسیون آئورت'),
  L('Koronare Vaskulitis / Herz-OP', 'Coronary vasculitis / cardiac surgery', 'واسکولیت کرونر / جراحی قلب'),
]

const REFERENCES = [
  ['ESC 2023 Acute Coronary Syndromes Guideline', 'https://academic.oup.com/eurheartj/article/44/38/3720/7243210'],
  ['ESC 2024 Chronic Coronary Syndromes Guideline', 'https://academic.oup.com/eurheartj/article/45/36/3415/7743115'],
  ['SCMR Standardized CMR Protocols · 2020 Update', 'https://scmr.org/news/standardized-cardiovascular-magnetic-resonance-imaging-cmr-protocols-2020-update/'],
  ['2018 Updated Lake Louise Criteria · JACC Expert Panel', 'https://pubmed.ncbi.nlm.nih.gov/30545455/'],
  ['International Expert Consensus on Takotsubo Syndrome', 'https://academic.oup.com/eurheartj/article/39/22/2047/5025411'],
  ['AHA Scientific Statement: Diagnosis and Management of Cardiac Sarcoidosis', 'https://www.ahajournals.org/doi/10.1161/CIR.0000000000001240'],
]

const LessonContext = createContext(null)

function SectionIcon({ id }) {
  return <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={ICONS[id] || ICONS.toolbox} /></svg>
}

function Section({ id, title, children }) {
  const context = useContext(LessonContext)
  const open = context.openId === id
  const isRead = context.readSections.has(id)
  return <section id={id} className={`${template.section} ${open ? template.sectionOpen : ''} ${styles.section}`}>
    <button type="button" className={`${template.sectionHeader} ${styles.sectionHeader}`} onClick={() => context.selectSection(id)} aria-expanded={open} aria-controls={`${id}-panel`}>
      <span className={template.sectionIcon}><SectionIcon id={id} /></span>
      <span><strong>{title}</strong></span>
      <span className={template.toggle} aria-hidden="true">{open ? '−' : '+'}</span>
    </button>
    <div id={`${id}-panel`} hidden={!open} className={`${template.sectionBody} ${styles.sectionBody}`}>
      {children}
      <button type="button" className={`${template.readButton} ${styles.sectionReadButton} ${isRead ? template.readButtonDone : ''}`} aria-pressed={isRead} onClick={() => context.toggleSectionRead(id)}><SectionIcon id="takehome" />{pick(isRead ? COPY.completed : COPY.complete, context.lang)}</button>
    </div>
  </section>
}

function PatternExplorer({ lang }) {
  const [selectedId, setSelectedId] = useState('infarct')
  const selected = PATTERNS.find(pattern => pattern.id === selectedId) || PATTERNS[0]
  return <section className={styles.patternExplorer} aria-labelledby="pattern-title">
    <header><span>{pick(L('Interaktiver Mustervergleich', 'Interactive pattern comparison', 'مقایسه تعاملی الگوها'), lang)}</span><h3 id="pattern-title">{pick(L('Was zeigt das LGE – und was nicht?', 'What does LGE show—and what does it not?', 'LGE چه چیزی را نشان می‌دهد و چه چیزی را نه؟'), lang)}</h3></header>
    <div className={styles.patternTabs} role="tablist" aria-label={pick(L('Diagnose auswählen', 'Select diagnosis', 'انتخاب تشخیص'), lang)}>{PATTERNS.map(pattern => <button key={pattern.id} type="button" role="tab" aria-selected={selectedId === pattern.id} className={selectedId === pattern.id ? styles.patternTabActive : ''} onClick={() => setSelectedId(pattern.id)}><small>{pattern.short}</small><strong>{pick(pattern.title, lang)}</strong></button>)}</div>
    <article className={styles.patternPanel} role="tabpanel">
      <figure><Image src={selected.image} alt={pick(selected.alt, lang)} width={1254} height={1254} priority={selected.id === 'infarct'} /><figcaption>{pick(COPY.synthetic, lang)}</figcaption></figure>
      <div><small>{selected.short}</small><h4>{pick(selected.title, lang)}</h4><dl><div><dt>LGE</dt><dd>{pick(selected.lge, lang)}</dd></div><div><dt>{pick(L('Ödem', 'Oedema', 'ادم'), lang)}</dt><dd>{pick(selected.edema, lang)}</dd></div><div><dt>Cine</dt><dd>{pick(selected.cine, lang)}</dd></div></dl></div>
    </article>
  </section>
}

function LayerDiagram({ lang }) {
  return <div className={styles.layerDiagram} role="img" aria-label={pick(L('Schema der ischämischen und nichtischämischen LGE-Verteilung', 'Diagram of ischaemic and non-ischaemic LGE distribution', 'نمودار توزیع LGE ایسکمیک و غیرایسکمیک'), lang)}>
    <article><h4>{pick(L('Infarkt-Typ', 'Infarct pattern', 'الگوی انفارکتی'), lang)}</h4><div className={`${styles.wallRing} ${styles.subendo}`}><i /></div><strong>{pick(L('Subendokardial → transmural', 'Subendocardial → transmural', 'ساب‌اندوکاردیال ← ترانس‌مورال'), lang)}</strong><p>{pick(L('Immer mit Beteiligung des Subendokards und passend zu einem Koronarterritorium.', 'Always includes the subendocardium and matches a coronary territory.', 'همیشه ساب‌اندوکارد را درگیر می‌کند و با قلمرو کرونری تطابق دارد.'), lang)}</p></article>
    <span aria-hidden="true">≠</span>
    <article><h4>{pick(L('Nicht-Infarkt-Typ', 'Non-infarct pattern', 'الگوی غیرانفارکتی'), lang)}</h4><div className={`${styles.wallRing} ${styles.midwall}`}><i /></div><strong>{pick(L('Mid-wall / subepikardial', 'Mid-wall / subepicardial', 'میدوال / ساب‌اپیکاردیال'), lang)}</strong><p>{pick(L('Keine Zuordnung zu einem einzelnen Koronarterritorium.', 'Does not map to a single coronary territory.', 'با یک قلمرو کرونری منفرد تطابق ندارد.'), lang)}</p></article>
  </div>
}

function TroponinApproach({ lang }) {
  const t = value => pick(value, lang)
  const cmrResults = [
    {
      code: 'LGE',
      className: styles.approachResultInfarct,
      title: L('Infarkt-Typ', 'Infarct pattern', 'الگوی انفارکتی'),
      text: L('Subendokardiales bis transmurales LGE im Koronarterritorium → ischämische Schädigung; bei offenen Koronarien MINOCA weiter abklären.', 'Subendocardial-to-transmural LGE in a coronary territory → ischaemic injury; with unobstructed coronaries continue the MINOCA work-up.', 'LGE ساب‌اندوکاردیال تا ترانس‌مورال در قلمرو کرونری ← آسیب ایسکمیک؛ در صورت باز بودن عروق، بررسی MINOCA ادامه می‌یابد.'),
    },
    {
      code: 'T1/T2',
      className: styles.approachResultInflammation,
      title: L('Nicht-Infarkt-Typ', 'Non-infarct pattern', 'الگوی غیرانفارکتی'),
      text: L('Subepikardiales, midmyokardiales oder fleckiges LGE mit Ödem → an Myokarditis oder Sarkoidose denken.', 'Subepicardial, mid-wall or patchy LGE with oedema → consider myocarditis or sarcoidosis.', 'LGE ساب‌اپیکاردیال، میدوال یا لکه‌ای همراه ادم ← میوکاردیت یا سارکوئیدوز مطرح می‌شود.'),
    },
    {
      code: 'CINE',
      className: styles.approachResultTakotsubo,
      title: L('Kein typisches LGE', 'No typical LGE', 'بدون LGE تیپیک'),
      text: L('Mittelventrikuläre oder apikale Akinesie ohne Infarktnarbe → Takotsubo ist wahrscheinlich.', 'Mid-ventricular or apical akinesia without infarct scar → Takotsubo is likely.', 'آکینزی میانی بطن یا اپیکال بدون اسکار انفارکت ← تاکوتسوبو محتمل است.'),
    },
  ]

  return <div className={styles.approachMap}>
    <header className={styles.approachHeading}>
      <small>{t(L('Vom Laborwert zur Gewebediagnose', 'From laboratory value to tissue diagnosis', 'از یافته آزمایشگاهی تا تشخیص بافتی'))}</small>
      <h3>{t(L('Schritt für Schritt beim Troponinanstieg', 'A step-by-step approach to troponin rise', 'اپروچ قدم‌به‌قدم به افزایش تروپونین'))}</h3>
      <p>{t(L('Troponin zeigt eine Myokardschädigung – nicht automatisch einen Myokardinfarkt. Erst Klinik, EKG, Dynamik und Koronarstatus bestimmen den nächsten Schritt.', 'Troponin indicates myocardial injury—not automatically myocardial infarction. Symptoms, ECG, kinetics and coronary status determine the next step.', 'تروپونین نشان‌دهنده آسیب میوکارد است، نه لزوماً انفارکت. علائم، ECG، روند تغییرات و وضعیت عروق کرونر قدم بعدی را تعیین می‌کنند.'))}</p>
    </header>

    <div className={`${styles.approachNode} ${styles.approachStart}`}>
      <span>START</span>
      <div><strong>{t(L('hs-Troponin erhöht', 'Elevated hs-troponin', 'افزایش hs-Troponin'))}</strong><p>{t(L('Klinik + serielles Troponin + 12-Kanal-EKG sofort zusammenführen', 'Integrate symptoms + serial troponin + 12-lead ECG immediately', 'علائم + تروپونین سریال + ECG دوازده لید بلافاصله کنار هم قرار گیرند'))}</p></div>
    </div>
    <span className={styles.flowArrow} aria-hidden="true" />

    <section className={styles.approachStage}>
      <div className={styles.stageLabel}><span>01</span><strong>{t(L('Ist ein akutes Koronarsyndrom wahrscheinlich?', 'Is acute coronary syndrome likely?', 'آیا سندرم حاد کرونری محتمل است؟'))}</strong></div>
      <div className={styles.approachBranches}>
        <article className={styles.urgentBranch}><small>{t(L('ST-Hebung / instabil', 'ST elevation / unstable', 'ST elevation / ناپایدار'))}</small><h4>{t(L('Sofortige Koronarangiographie', 'Immediate coronary angiography', 'آنژیوگرافی فوری کرونر'))}</h4><p>{t(L('STEMI-Pfad. Die CMR darf die Reperfusion nicht verzögern.', 'STEMI pathway. CMR must not delay reperfusion.', 'مسیر STEMI؛ CMR نباید رپرفیوژن را به تأخیر بیندازد.'))}</p></article>
        <article><small>{t(L('Keine ST-Hebung', 'No ST elevation', 'بدون ST elevation'))}</small><h4>{t(L('NSTE-ACS-Risiko einordnen', 'Assess NSTE-ACS risk', 'ارزیابی ریسک NSTE-ACS'))}</h4><p>{t(L('Dynamik, Beschwerden und Risiko bestimmen, wie früh die Angiographie erfolgt.', 'Kinetics, symptoms and risk determine how early angiography is performed.', 'روند تغییرات، علائم و ریسک، زمان آنژیوگرافی را تعیین می‌کنند.'))}</p></article>
      </div>
    </section>
    <span className={styles.flowArrow} aria-hidden="true" />

    <section className={styles.approachStage}>
      <div className={styles.stageLabel}><span>02</span><strong>{t(L('Was zeigt die Koronarangiographie?', 'What does coronary angiography show?', 'آنژیوگرافی کرونر چه نشان می‌دهد؟'))}</strong></div>
      <div className={styles.approachBranches}>
        <article><small>{t(L('Obstruktive Läsion', 'Obstructive lesion', 'ضایعه انسدادی'))}</small><h4>{t(L('Myokardinfarkt gesichert', 'Myocardial infarction established', 'انفارکت میوکارد تأیید می‌شود'))}</h4><p>{t(L('Culprit-Läsion behandeln; CMR nur bei spezieller Frage zu Ausdehnung, Vitalität oder Komplikationen.', 'Treat the culprit lesion; reserve CMR for specific questions about extent, viability or complications.', 'ضایعه مسئول درمان می‌شود؛ CMR برای سؤال‌های خاص درباره وسعت، حیات‌پذیری یا عوارض استفاده می‌شود.'))}</p></article>
        <article className={styles.minocaBranch}><small>{t(L('Keine obstruktive Läsion', 'No obstructive lesion', 'بدون ضایعه انسدادی'))}</small><h4>{t(L('Arbeitsdiagnose MINOCA', 'Working diagnosis: MINOCA', 'تشخیص کاری MINOCA'))}</h4><p>{t(L('Jetzt soll die CMR Infarkt, Entzündung und Takotsubo voneinander trennen.', 'CMR should now distinguish infarction, inflammation and Takotsubo.', 'اکنون CMR باید انفارکت، التهاب و تاکوتسوبو را از هم جدا کند.'))}</p></article>
      </div>
    </section>
    <span className={styles.flowArrow} aria-hidden="true" />

    <section className={`${styles.approachStage} ${styles.cmrStage}`}>
      <div className={styles.stageLabel}><span>03</span><strong>{t(L('CMR: Muster statt Einzelbefund lesen', 'CMR: read the pattern, not an isolated finding', 'CMR: الگو را بخوانید، نه یک یافته منفرد'))}</strong></div>
      <p className={styles.cmrSequence}>Cine → T2 / T2-Mapping → LGE → T1-Mapping</p>
      <div className={styles.approachResults}>{cmrResults.map(result => <article key={result.code} className={result.className}><small>{result.code}</small><h4>{t(result.title)}</h4><p>{t(result.text)}</p></article>)}</div>
    </section>

    <aside className={styles.parallelCheck}>
      <div><small>{t(L('Parallel prüfen', 'Check in parallel', 'بررسی هم‌زمان'))}</small><strong>{t(L('Passt die Klinik überhaupt zu ACS?', 'Does the clinical picture fit ACS?', 'آیا تابلوی بالینی اصلاً با ACS تطابق دارد؟'))}</strong></div>
      <p>{t(L('Bei unpassender Konstellation gezielt nach anderen Ursachen suchen:', 'If the constellation does not fit, actively look for other causes:', 'اگر مجموعه یافته‌ها تطابق ندارد، علل دیگر به‌طور هدفمند بررسی شوند:'))}</p>
      <div className={styles.parallelCauses}>{TROPNON_CORONARY.map(item => <span key={t(item)}>{t(item)}</span>)}</div>
    </aside>
  </div>
}

function DecisionTree({ lang }) {
  const [answer, setAnswer] = useState('infarct')
  const result = {
    infarct: L('Infarkttypisches LGE + Ödem + regionale Dyskinesie → akuter MI; bei nichtobstruktiven Koronarien an MINOCA denken.', 'Infarct-pattern LGE + oedema + regional dyskinesia → acute MI; with non-obstructive coronaries consider MINOCA.', 'LGE انفارکتی + ادم + دیسکینزی موضعی ← MI حاد؛ با کرونر غیرانسدادی به MINOCA فکر کنید.'),
    none: L('Kein typisches LGE + mittelventrikuläre/apikale Bewegungsstörung → Takotsubo wahrscheinlich.', 'No typical LGE + mid-ventricular/apical motion abnormality → Takotsubo likely.', 'نبود LGE تیپیک + اختلال حرکتی میانی/اپیکال ← تاکوتسوبو محتمل است.'),
    nonischemic: L('Nichtinfarkttypisches LGE + Ödem → entzündliche Myokardschädigung; Verteilung auf Myokarditis oder Sarkoidose prüfen.', 'Non-infarct LGE + oedema → inflammatory myocardial injury; use distribution to distinguish myocarditis from sarcoidosis.', 'LGE غیرانفارکتی + ادم ← آسیب التهابی میوکارد؛ توزیع برای افتراق میوکاردیت از سارکوئیدوز بررسی شود.'),
  }[answer]
  return <div className={styles.decisionTool}>
    <header><small>{pick(L('Erster Blick', 'First look', 'نگاه اول'), lang)}</small><h3>{pick(L('Wie ist das Late Enhancement verteilt?', 'How is late enhancement distributed?', 'توزیع Late Enhancement چگونه است؟'), lang)}</h3></header>
    <div className={styles.decisionOptions}>{[
      ['infarct', L('Infarkt-Typ', 'Infarct pattern', 'الگوی انفارکتی')],
      ['none', L('Kein typisches LGE', 'No typical LGE', 'بدون LGE تیپیک')],
      ['nonischemic', L('Nicht-Infarkt-Typ', 'Non-infarct pattern', 'الگوی غیرانفارکتی')],
    ].map(([id, label]) => <button key={id} type="button" className={answer === id ? styles.decisionActive : ''} aria-pressed={answer === id} onClick={() => setAnswer(id)}>{pick(label, lang)}</button>)}</div>
    <div className={styles.decisionResult} aria-live="polite"><span>→</span><p>{pick(result, lang)}</p></div>
  </div>
}

function LessonContent({ lang }) {
  const t = value => pick(value, lang)
  return <>
    <Section id="ausgangspunkt" title={t(SECTIONS[0].label)}>
      <TroponinApproach lang={lang} />
    </Section>

    <Section id="toolbox" title={t(SECTIONS[1].label)}>
      <p className={styles.lead}>{t(L('Die CMR kombiniert Funktion, Gewebecharakterisierung und – bei passender klinischer Frage – Perfusion. Nicht jede Sequenz gehört automatisch in jedes Protokoll.', 'CMR combines function, tissue characterisation and—when the clinical question calls for it—perfusion. Not every sequence automatically belongs in every protocol.', 'CMR عملکرد، مشخصه‌یابی بافتی و در صورت وجود سؤال بالینی مناسب، پرفیوژن را ترکیب می‌کند. هر سکانسی به‌طور خودکار در هر پروتکلی قرار نمی‌گیرد.'))}</p>
      <div className={styles.toolboxGrid}>{[
        ['CINE', L('Funktion', 'Function', 'عملکرد'), L('Regionale Hypo-, A- oder Dyskinesie; globale LV-Funktion.', 'Regional hypo-, a- or dyskinesia; global LV function.', 'هیپو، آ یا دیسکینزی موضعی؛ عملکرد کلی LV.')],
        ['T2', L('Ödem', 'Oedema', 'ادم'), L('T2w-Fat-Sat oder T2-Mapping zeigt akuten Wassergehalt.', 'T2-weighted fat-sat or T2 mapping shows acute water content.', 'T2w Fat-Sat یا T2 mapping افزایش آب حاد را نشان می‌دهد.')],
        ['LGE', L('Schaden / Narbe', 'Injury / scar', 'آسیب / اسکار'), L('Verteilung und Transmuralität sind der Schlüssel zur Einordnung.', 'Distribution and transmurality are the key to classification.', 'توزیع و ترانس‌مورالیتی کلید طبقه‌بندی هستند.')],
        ['MAP', L('T1 / T2-Mapping', 'T1 / T2 mapping', 'مپینگ T1 / T2'), L('Quantitative Ergänzung bei diffuser oder subtiler Myokardschädigung.', 'Quantitative support for diffuse or subtle myocardial injury.', 'تکمیل کمی در آسیب منتشر یا ظریف میوکارد.')],
        ['PERF', L('Perfusion', 'Perfusion', 'پرفیوژن'), L('First-pass in Ruhe oder unter Stress beantwortet eine Perfusions- beziehungsweise Ischämiefrage.', 'First-pass imaging at rest or during stress answers a perfusion or ischaemia question.', 'First-pass در حالت استراحت یا استرس به سؤال پرفیوژن یا ایسکمی پاسخ می‌دهد.')],
      ].map(([code, title, text]) => <article key={code}><span>{code}</span><h3>{t(title)}</h3><p>{t(text)}</p></article>)}</div>
      <div className={styles.perfusionGuide}>
        <header><small>{t(L('Perfusion richtig einordnen', 'Putting perfusion in the right context', 'جایگاه درست پرفیوژن'))}</small><h3>{t(L('Ja – aber Stress-Perfusion ist frage- und situationsabhängig', 'Yes—but stress perfusion depends on the question and clinical setting', 'بله؛ اما Stress-Perfusion به سؤال و شرایط بالینی بستگی دارد'))}</h3></header>
        <div>
          <article className={styles.perfusionAcute}><span>01</span><div><strong>{t(L('Akut & instabil / Hochrisiko-ACS', 'Acute and unstable / high-risk ACS', 'حاد و ناپایدار / ACS پرخطر'))}</strong><p>{t(L('Keine routinemäßige Stress-Perfusion vor der dringlichen Angiographie. Nach Stabilisierung stehen Cine, T1/T2 und LGE zur Ursachenklärung im Vordergrund.', 'Do not routinely perform stress perfusion before urgent angiography. After stabilisation, cine, T1/T2 and LGE are central to determining the cause.', 'Stress-Perfusion روتین پیش از آنژیوگرافی فوری انجام نمی‌شود. پس از پایدارشدن، Cine، ‏T1/T2 و LGE محور تعیین علت هستند.'))}</p></div></article>
          <article className={styles.perfusionObserve}><span>02</span><div><strong>{t(L('Stabil in der „Observe Zone“', 'Stable in the observe zone', 'بیمار پایدار در Observe Zone'))}</strong><p>{t(L('Nach EKG und seriellen hs-Troponinen kann Stress-CMR selektiv eine Alternative zu CCTA oder anderer Stressbildgebung sein – besonders bei bekannter KHK.', 'After ECG and serial hs-troponin testing, stress CMR may selectively be an alternative to CCTA or other stress imaging—especially in established CAD.', 'پس از ECG و hs-Troponin سریال، Stress-CMR می‌تواند به‌صورت انتخابی جایگزین CCTA یا سایر روش‌های استرس باشد؛ به‌ویژه در KHK شناخته‌شده.'))}</p></div></article>
          <article className={styles.perfusionStable}><span>03</span><div><strong>{t(L('Stabile Ischämiefrage / KHK / INOCA', 'Stable ischaemia question / CAD / INOCA', 'سؤال ایسکمی پایدار / KHK / INOCA'))}</strong><p>{t(L('Typische Indikation für Stress-Perfusion: belastungsinduzierte Ischämie, funktionelle Relevanz einer Stenose oder mikrovaskuläre Dysfunktion beurteilen.', 'A typical indication for stress perfusion: assess inducible ischaemia, the functional relevance of a stenosis, or microvascular dysfunction.', 'اندیکاسیون تیپیک Stress-Perfusion: بررسی ایسکمی القاشونده، اهمیت عملکردی تنگی یا اختلال میکروواسکولار.'))}</p></div></article>
        </div>
      </div>
      <div className={styles.rule}><strong>{t(L('Für diese Lektion', 'For this lesson', 'برای این درس'))}</strong><p>{t(L('Beim akuten Troponinanstieg lautet die Kernfrage zunächst: Infarkt, Myokarditis, Takotsubo oder eine andere Ursache? Deshalb dominieren Cine, Ödem/Mapping und LGE; Stress-Perfusion wird nur bei einer zusätzlichen Ischämiefrage ergänzt.', 'With acute troponin elevation, the initial question is infarction, myocarditis, Takotsubo, or another cause. Cine, oedema/mapping and LGE therefore dominate; add stress perfusion only for an additional ischaemia question.', 'در افزایش حاد تروپونین، سؤال اصلی ابتدا انفارکت، میوکاردیت، تاکوتسوبو یا علت دیگر است؛ بنابراین Cine، ادم/مپینگ و LGE اولویت دارند و Stress-Perfusion فقط در صورت وجود سؤال اضافی ایسکمی اضافه می‌شود.'))}</p></div>
    </Section>

    <Section id="lge-muster" title={t(SECTIONS[2].label)}>
      <LayerDiagram lang={lang} />
      <PatternExplorer lang={lang} />
    </Section>

    <Section id="infarkt" title={t(SECTIONS[3].label)}>
      <div className={styles.infarctSplit}><article><small>{t(L('Akut', 'Acute', 'حاد'))}</small><h3>{t(L('Drei korrelierende Zeichen', 'Three matching signs', 'سه نشانه هم‌خوان'))}</h3><ul><li>{t(L('Cine: regionale Hypo- oder Akinesie.', 'Cine: regional hypo- or akinesia.', 'Cine: هیپو یا آکینزی موضعی.'))}</li><li>{t(L('T2: deutliches Ödem im betroffenen Areal.', 'T2: marked oedema in the affected area.', 'T2: ادم واضح در ناحیه درگیر.'))}</li><li>{t(L('LGE: subendokardial bis transmural in einem Koronarterritorium.', 'LGE: subendocardial to transmural in a coronary territory.', 'LGE: ساب‌اندوکاردیال تا ترانس‌مورال در قلمرو کرونر.'))}</li></ul></article><article><small>{t(L('Chronisch', 'Chronic', 'مزمن'))}</small><h3>{t(L('Narbe und Remodeling', 'Scar and remodelling', 'اسکار و بازسازی'))}</h3><ul><li>{t(L('Abnahme der Myokarddicke und regionale Wandverdünnung.', 'Reduced myocardial thickness and regional wall thinning.', 'کاهش ضخامت میوکارد و نازک‌شدن موضعی دیواره.'))}</li><li>{t(L('Persistierendes LGE als Narbenzeichen.', 'Persistent LGE as a sign of scar.', 'LGE پایدار به‌عنوان نشانه اسکار.'))}</li><li>{t(L('Apikaler Thrombus oder Aneurysma als mögliche Komplikation.', 'Apical thrombus or aneurysm as possible complications.', 'ترومبوس یا آنوریسم اپیکال به‌عنوان عوارض احتمالی.'))}</li></ul></article></div>
      <div className={styles.mvoBox}><div className={styles.mvoMark}><span /></div><div><small>MVO · NO-REFLOW</small><h3>{t(L('Mikrovaskuläre Obstruktion', 'Microvascular obstruction', 'انسداد میکروواسکولار'))}</h3><p>{t(L('Eine dunkle Aussparung innerhalb des hellen Infarkt-LGE zeigt fehlende mikrovaskuläre Reperfusion. Sie ist ein ungünstiges Prognosezeichen.', 'A dark core within bright infarct LGE indicates failed microvascular reperfusion and is an adverse prognostic marker.', 'ناحیه تیره درون LGE روشن انفارکت نشان‌دهنده عدم رپرفیوژن میکروواسکولار و یک نشانه پیش‌آگهی نامطلوب است.'))}</p></div></div>
      <div className={styles.rule}><strong>{t(L('Territorium prüfen', 'Check the territory', 'قلمرو را بررسی کنید'))}</strong><p>{t(L('Vorderwand und anteroseptale Beteiligung sprechen beispielsweise für ein LAD-Territorium. Die Segmentzuordnung unterstützt, ersetzt aber nicht die Gesamtkorrelation.', 'Anterior and anteroseptal involvement, for example, points to the LAD territory. Segment assignment supports but does not replace the full correlation.', 'درگیری قدامی و قدامی‌سپتال برای مثال به قلمرو LAD اشاره دارد. تطبیق سگمنت‌ها کمک‌کننده است اما جایگزین جمع‌بندی کامل نیست.'))}</p></div>
    </Section>

    <Section id="minoca-takotsubo" title={t(SECTIONS[4].label)}>
      <div className={styles.compareColumns}><article><header><small>MINOCA</small><h3>{t(L('Infarktbild ohne obstruktive Koronarstenose', 'Infarct image without obstructive coronary stenosis', 'نمای انفارکت بدون تنگی انسدادی کرونر'))}</h3></header><p>{t(L('MINOCA ist zunächst eine Arbeitsdiagnose. Zeigt die CMR ein subendokardiales bis transmural ausgeprägtes LGE mit passendem Ödem und regionaler Dysfunktion, sieht das Myokardbild wie ein Infarkt aus – obwohl die Angiographie keine relevante Stenose zeigt.', 'MINOCA is initially a working diagnosis. If CMR shows subendocardial-to-transmural LGE with matching oedema and regional dysfunction, the myocardium looks infarcted despite no relevant stenosis on angiography.', 'MINOCA در ابتدا یک تشخیص کاری است. اگر CMR الگوی LGE ساب‌اندوکاردیال تا ترانس‌مورال همراه با ادم و اختلال موضعی نشان دهد، تصویر میوکارد شبیه انفارکت است، با وجود نبود تنگی مهم در آنژیوگرافی.'))}</p><strong>{t(L('Kernaussage: Gleiches Gewebemuster wie MI – andere Koronaranatomie.', 'Key point: same tissue pattern as MI—different coronary anatomy.', 'نکته اصلی: الگوی بافتی مشابه MI، اما آناتومی کرونر متفاوت.'))}</strong></article><article><header><small>TAKOTSUBO</small><h3>{t(L('Bewegungsmuster ohne typische Narbe', 'Motion pattern without typical scar', 'الگوی حرکتی بدون اسکار تیپیک'))}</h3></header><p>{t(L('Das Broken-Heart- oder Apical-Ballooning-Syndrom ist vorübergehend und häufig durch emotionalen oder körperlichen Stress ausgelöst. Charakteristisch ist die Hypo- oder Akinesie der mittleren bis apikalen Segmente. Ein Ödem kann vorliegen; ein typisches Infarkt-LGE fehlt.', 'The broken-heart or apical-ballooning syndrome is transient and often triggered by emotional or physical stress. Mid-to-apical hypo- or akinesia is characteristic. Oedema may be present; typical infarct LGE is absent.', 'سندروم قلب شکسته یا Apical Ballooning گذراست و اغلب با استرس عاطفی یا جسمی تحریک می‌شود. هیپو یا آکینزی سگمنت‌های میانی تا اپیکال تیپیک است. ادم ممکن است وجود داشته باشد، اما LGE تیپیک انفارکت دیده نمی‌شود.'))}</p><strong>{t(L('Kernaussage: Cine macht die Diagnose sichtbar; LGE verhindert die Verwechslung mit Infarkt.', 'Key point: cine reveals the diagnosis; LGE prevents confusion with infarction.', 'نکته اصلی: Cine تشخیص را نشان می‌دهد و LGE از اشتباه با انفارکت جلوگیری می‌کند.'))}</strong></article></div>
    </Section>

    <Section id="entzuendung" title={t(SECTIONS[5].label)}>
      <div className={styles.inflammationIntro}><h3>{t(L('Myokarditis: aktualisierte Lake-Louise-Kriterien', 'Myocarditis: updated Lake Louise criteria', 'میوکاردیت: معیارهای به‌روزشده Lake Louise'))}</h3><p>{t(L('Für eine CMR-basierte Diagnose sollen ein T2-basiertes Zeichen des Myokardödems und ein T1-basiertes Zeichen der Myokardschädigung vorliegen. Dazu zählen erhöhtes natives T1 oder ECV beziehungsweise ein nichtischämisches LGE-Muster.', 'A CMR-based diagnosis is supported by one T2-based marker of myocardial oedema and one T1-based marker of myocardial injury. The latter includes elevated native T1 or ECV, or a non-ischaemic LGE pattern.', 'برای تشخیص مبتنی بر CMR باید یک نشانه مبتنی بر T2 از ادم میوکارد و یک نشانه مبتنی بر T1 از آسیب میوکارد وجود داشته باشد؛ از جمله افزایش native T1 یا ECV و یا الگوی LGE غیرایسکمیک.'))}</p><div><span><b>1</b>{t(L('T2-basiert', 'T2-based', 'مبتنی بر T2'))}</span><i>+</i><span><b>1</b>{t(L('T1-basiert', 'T1-based', 'مبتنی بر T1'))}</span></div></div>
      <div className={styles.inflammationTable} role="table" aria-label={t(L('Vergleich Myokarditis und Sarkoidose', 'Comparison of myocarditis and sarcoidosis', 'مقایسه میوکاردیت و سارکوئیدوز'))}><div role="row" className={styles.tableHead}><span role="columnheader">CMR</span><strong role="columnheader">{t(L('Myokarditis', 'Myocarditis', 'میوکاردیت'))}</strong><strong role="columnheader">{t(L('Sarkoidose', 'Sarcoidosis', 'سارکوئیدوز'))}</strong></div>{[
        [L('Cine', 'Cine', 'Cine'), L('Normal oder regionale/globale Dysfunktion', 'Normal or regional/global dysfunction', 'طبیعی یا اختلال موضعی/کلی'), L('Dyskinesie oder LV-Dysfunktion möglich', 'Dyskinesia or LV dysfunction possible', 'دیسکینزی یا اختلال LV ممکن است')],
        [L('T2', 'T2', 'T2'), L('Ödem bei aktiver Entzündung', 'Oedema in active inflammation', 'ادم در التهاب فعال'), L('Ödem bei aktiver Entzündung', 'Oedema in active inflammation', 'ادم در التهاب فعال')],
        [L('LGE', 'LGE', 'LGE'), L('Subepikardial oder midmyokardial, häufig inferolateral', 'Subepicardial or mid-wall, often inferolateral', 'ساب‌اپیکاردیال یا میدوال، اغلب اینفرولاترال'), L('Fleckig, multifokal, oft basal-septal und lateral', 'Patchy, multifocal, often basal-septal and lateral', 'لکه‌ای و چندکانونی، اغلب بازال-سپتال و لترال')],
      ].map(row => <div role="row" key={t(row[0])}><span role="cell">{t(row[0])}</span><p role="cell">{t(row[1])}</p><p role="cell">{t(row[2])}</p></div>)}</div>
      <div className={styles.rule}><strong>{t(L('Wichtige Grenze', 'Important limitation', 'محدودیت مهم'))}</strong><p>{t(L('Das LGE-Muster lenkt die Verdachtsdiagnose, ist aber nicht pathognomonisch. Klinische Daten und weitere Untersuchungen bleiben notwendig.', 'The LGE pattern guides the differential but is not pathognomonic. Clinical data and additional tests remain necessary.', 'الگوی LGE جهت تشخیص افتراقی را مشخص می‌کند، اما پاتوگنومونیک نیست؛ داده‌های بالینی و بررسی‌های تکمیلی همچنان لازم‌اند.'))}</p></div>
    </Section>

    <Section id="algorithmus" title={t(SECTIONS[6].label)}>
      <DecisionTree lang={lang} />
      <ol className={styles.algorithmSteps}><li><span>01</span><div><h3>{t(L('LGE zuerst', 'Start with LGE', 'ابتدا LGE'))}</h3><p>{t(L('Infarkt-Typ, kein typisches LGE oder Nicht-Infarkt-Typ unterscheiden.', 'Separate infarct pattern, no typical LGE, and non-infarct pattern.', 'الگوی انفارکتی، نبود LGE تیپیک و الگوی غیرانفارکتی را جدا کنید.'))}</p></div></li><li><span>02</span><div><h3>{t(L('Ödem ergänzen', 'Add oedema', 'ادم را اضافه کنید'))}</h3><p>{t(L('Ödem spricht für einen akuten beziehungsweise aktiven Prozess, ist aber allein nicht spezifisch.', 'Oedema supports an acute or active process but is not specific on its own.', 'ادم به نفع فرایند حاد یا فعال است، اما به‌تنهایی اختصاصی نیست.'))}</p></div></li><li><span>03</span><div><h3>{t(L('Cine korrelieren', 'Correlate cine', 'Cine را تطبیق دهید'))}</h3><p>{t(L('Territoriale Akinesie, apikales Ballooning oder unspezifische Dysfunktion einordnen.', 'Classify territorial akinesia, apical ballooning, or non-specific dysfunction.', 'آکینزی قلمرویی، بالونینگ اپیکال یا اختلال عملکرد غیراختصاصی را طبقه‌بندی کنید.'))}</p></div></li><li><span>04</span><div><h3>{t(L('Koronarstatus einbeziehen', 'Include coronary status', 'وضعیت کرونر را لحاظ کنید'))}</h3><p>{t(L('Infarktmuster plus nichtobstruktive Koronarien bleibt eine MINOCA-Arbeitsdiagnose und verlangt Ursachenklärung.', 'An infarct pattern with non-obstructive coronaries remains a working diagnosis of MINOCA and requires aetiologic work-up.', 'الگوی انفارکت با کرونر غیرانسدادی همچنان تشخیص کاری MINOCA است و نیاز به بررسی علت دارد.'))}</p></div></li></ol>
    </Section>

    <Section id="takehome" title={t(SECTIONS[7].label)}>
      <ol className={styles.takeHome}>{[
        L('Eine dringliche ACS-Therapie darf durch die Kardio-MRT nicht verzögert werden.', 'Cardiac MRI must not delay urgent ACS treatment.', 'MRI قلب نباید درمان فوری ACS را به تأخیر بیندازد.'),
        L('Infarkt-LGE beginnt subendokardial und folgt einem Koronarterritorium; die Ausdehnung kann transmural werden.', 'Infarct LGE starts subendocardially and follows a coronary territory; it may become transmural.', 'LGE انفارکت از ساب‌اندوکارد آغاز می‌شود و قلمرو کرونر را دنبال می‌کند و می‌تواند ترانس‌مورال شود.'),
        L('Ödem plus regionale Dysfunktion unterstützt den akuten Infarkt; MVO ist ein ungünstiges Zeichen.', 'Oedema plus regional dysfunction supports acute infarction; MVO is an adverse marker.', 'ادم همراه اختلال موضعی از انفارکت حاد حمایت می‌کند؛ MVO نشانه نامطلوب است.'),
        L('MINOCA sieht im Myokard wie ein Infarkt aus, obwohl keine obstruktive Koronarstenose vorliegt.', 'MINOCA may look like infarction in the myocardium despite no obstructive coronary stenosis.', 'MINOCA در میوکارد شبیه انفارکت است، با وجود نبود تنگی انسدادی کرونر.'),
        L('Takotsubo zeigt das charakteristische Bewegungsmuster ohne typisches Infarkt-LGE.', 'Takotsubo shows a characteristic motion pattern without typical infarct LGE.', 'تاکوتسوبو الگوی حرکتی تیپیک بدون LGE انفارکتی دارد.'),
        L('Myokarditis und Sarkoidose zeigen nichtischämische, subepikardiale/midmyokardiale beziehungsweise fleckige LGE-Muster.', 'Myocarditis and sarcoidosis show non-ischaemic subepicardial/mid-wall or patchy LGE patterns.', 'میوکاردیت و سارکوئیدوز الگوهای LGE غیرایسکمیک ساب‌اپیکاردیال/میدوال یا لکه‌ای نشان می‌دهند.'),
        L('Stress-Perfusion ist bei akutem Hochrisiko-ACS nicht der erste Schritt, bleibt aber bei stabiler Ischämiefrage, KHK oder INOCA eine wichtige CMR-Indikation.', 'Stress perfusion is not the first step in acute high-risk ACS, but remains an important CMR indication for stable ischaemia questions, CAD or INOCA.', 'Stress-Perfusion در ACS حاد پرخطر قدم اول نیست، اما در سؤال ایسکمی پایدار، KHK یا INOCA همچنان یک اندیکاسیون مهم CMR است.'),
      ].map((item, index) => <li key={t(item)}><span>{String(index + 1).padStart(2, '0')}</span><p>{t(item)}</p></li>)}</ol>
      <aside className={styles.sources}><header><small>{t(L('Evidenzbasis', 'Evidence base', 'پایه شواهد'))}</small><h3>{t(L('Leitlinien & Konsensusdokumente', 'Guidelines & consensus documents', 'گایدلاین‌ها و اسناد اجماعی'))}</h3></header><div>{REFERENCES.map(([title, href], index) => <a key={href} href={href} target="_blank" rel="noreferrer"><span>{String(index + 1).padStart(2, '0')}</span><strong>{title}</strong><i aria-hidden="true">↗</i></a>)}</div><p>{t(L('Die Unterrichtsinhalte wurden anhand der bereitgestellten Kursunterlagen strukturiert und fachlich mit den genannten Primärquellen abgeglichen. Die Seite ersetzt keine individuelle klinische Entscheidung.', 'The lesson was structured from the supplied course material and checked against the listed primary sources. It does not replace individual clinical decision-making.', 'محتوای درس بر اساس جزوه‌های ارائه‌شده ساختاربندی و با منابع اولیه ذکرشده تطبیق داده شده است. این صفحه جایگزین تصمیم‌گیری بالینی فردی نیست.'))}</p></aside>
    </Section>
  </>
}

function MobilePath({ lang, openId, readSections, onSelect }) {
  const [panelOpen, setPanelOpen] = useState(false)
  const current = SECTIONS.find(section => section.id === openId) || SECTIONS[0]
  const progress = (readSections.size / SECTIONS.length) * 360
  const select = id => { onSelect(id); setPanelOpen(false) }
  return <div className={template.mobileLearningPath}>
    {panelOpen ? <section id="mi-dd-mobile-path" className={template.mobilePathPanel} role="dialog" aria-label={pick(COPY.path, lang)}><header><div><small>{pick(COPY.progress, lang)}</small><strong>{readSections.size} / {SECTIONS.length}</strong></div><button type="button" onClick={() => setPanelOpen(false)} aria-label={pick(COPY.close, lang)}>×</button></header><nav>{SECTIONS.map(section => <button type="button" key={section.id} className={openId === section.id ? template.mobilePathCurrent : ''} onClick={() => select(section.id)} aria-current={openId === section.id ? 'location' : undefined}><span className={template.mobilePathItemIcon}><SectionIcon id={section.id} /></span><span><strong>{pick(section.label, lang)}</strong><small>{pick(section.label, lang)}</small></span><i aria-hidden="true">{readSections.has(section.id) ? '✓' : ''}</i></button>)}</nav></section> : null}
    <button type="button" className={template.mobilePathButton} onClick={() => setPanelOpen(value => !value)} aria-expanded={panelOpen} aria-controls="mi-dd-mobile-path"><span className={template.mobileProgressRing} style={{ '--mobile-progress': `${progress}deg` }}><b>{readSections.size}</b><small>/{SECTIONS.length}</small></span><span className={template.mobileCurrentIcon}><SectionIcon id={current.id} /></span><span className={template.mobilePathLabel}><strong>{pick(COPY.path, lang)}</strong><small>{pick(current.label, lang)}</small></span></button>
  </div>
}

export default function MyocardialInfarctionDifferentialPage() {
  const { lang } = useLanguage()
  const [openId, setOpenId] = useState(SECTIONS[0].id)
  const [readSections, setReadSections] = usePersistedSectionProgress(ID, SECTION_IDS)
  const activeIndex = useMemo(() => SECTIONS.findIndex(section => section.id === openId), [openId])
  const withLang = href => lang === 'de' ? href : `${href}${href.includes('?') ? '&' : '?'}lang=${lang}`

  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (SECTION_IDS.includes(hash)) setOpenId(hash)
  }, [])

  const selectSection = id => {
    const nextId = openId === id ? null : id
    setOpenId(nextId)
    const baseUrl = `${window.location.pathname}${window.location.search}`
    window.history.replaceState(null, '', nextId ? `${baseUrl}#${nextId}` : baseUrl)
    if (nextId) requestAnimationFrame(() => requestAnimationFrame(() => document.getElementById(nextId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })))
  }
  const jumpTo = id => {
    setOpenId(id)
    const baseUrl = `${window.location.pathname}${window.location.search}`
    window.history.replaceState(null, '', `${baseUrl}#${id}`)
    requestAnimationFrame(() => requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })))
  }
  const toggleSectionRead = id => setReadSections(previous => { const next = new Set(previous); if (next.has(id)) next.delete(id); else next.add(id); return next })
  const lessonComplete = readSections.size === SECTIONS.length
  const toggleLessonComplete = () => setReadSections(lessonComplete ? new Set() : new Set(SECTION_IDS))
  const advance = () => jumpTo(SECTIONS[activeIndex < 0 ? 0 : Math.min(activeIndex + 1, SECTIONS.length - 1)].id)
  const facts = [
    [L('LGE-Muster', 'LGE pattern', 'الگوی LGE'), L('Territorium & Wandschicht', 'Territory & wall layer', 'قلمرو و لایه دیواره'), 'lge-muster'],
    [L('Ödem', 'Oedema', 'ادم'), L('Akut oder aktiv?', 'Acute or active?', 'حاد یا فعال؟'), 'toolbox'],
    [L('Perfusion', 'Perfusion', 'پرفیوژن'), L('Nur bei passender Ischämiefrage', 'Only for the right ischaemia question', 'فقط با سؤال مناسب ایسکمی'), 'toolbox'],
  ]

  return <main className={`${template.page} ${styles.page} ${lang === 'fa' ? styles.rtl : ''}`} data-lesson-progress-managed="true" dir={lang === 'fa' ? 'rtl' : 'ltr'} lang={lang}>
    <header className={template.header}>
      <div className={template.topline}><nav className={template.breadcrumb} aria-label={pick(COPY.contents, lang)}><Link href={withLang('/')}>RadYar</Link><span>/</span><Link href={withLang('/lernen/thorax')}>{pick(COPY.thorax, lang)}</Link><span>/</span><span>{pick(COPY.chapter, lang)}</span><span>/</span><strong>{pick(COPY.title, lang)}</strong></nav><span className={template.author}>Dr. Zia</span></div>
      <div className={template.hero}><div className={`${template.heroCopy} ${styles.heroCopy}`}><h1>{pick(COPY.title, lang)}</h1><div className={template.actions}><button type="button" className={template.primaryAction} onClick={() => jumpTo('algorithmus')}>{pick(COPY.start, lang)}<span aria-hidden="true">→</span></button></div></div><div className={template.heroFacts}>{facts.map(([value, description, icon]) => <article key={pick(value, lang)}><span className={template.factIcon}><SectionIcon id={icon} /></span><strong>{pick(value, lang)}</strong><p>{pick(description, lang)}</p></article>)}</div></div>
      <div className={template.progressBar}><div className={template.progressTrack}><i style={{ width: `${(readSections.size / SECTIONS.length) * 100}%` }} /></div><span>{readSections.size} / {SECTIONS.length} {pick(COPY.progress, lang)}</span><div className={template.progressActions}><button type="button" className={`${template.lessonCompleteButton} ${lessonComplete ? template.lessonCompleteButtonDone : ''}`} aria-pressed={lessonComplete} onClick={toggleLessonComplete}><SectionIcon id="takehome" />{pick(lessonComplete ? COPY.lessonCompleted : COPY.completeLesson, lang)}</button><button type="button" className={template.continueButton} onClick={advance} disabled={activeIndex === SECTIONS.length - 1}>{pick(COPY.continue, lang)}<span aria-hidden="true">→</span></button></div></div>
    </header>
    <div className={template.layout}><aside className={template.sidebar}><h2>{pick(COPY.path, lang)}</h2><nav>{SECTIONS.map(section => <button type="button" key={section.id} className={openId === section.id ? template.activeSideItem : ''} onClick={() => jumpTo(section.id)} aria-current={openId === section.id ? 'location' : undefined} aria-label={`${pick(COPY.open, lang)}: ${pick(section.label, lang)}`}><span className={template.sideIcon}><SectionIcon id={section.id} /></span><strong>{pick(section.label, lang)}</strong></button>)}</nav></aside><article className={template.lesson}><LessonContext.Provider value={{ lang, openId, readSections, selectSection, toggleSectionRead }}><LessonContent lang={lang} /></LessonContext.Provider></article></div>
    <MobilePath lang={lang} openId={openId} readSections={readSections} onSelect={jumpTo} />
  </main>
}
