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
  { id: 'lge-muster', label: L('Late Gadolinium Enhancement (LGE)', 'Late gadolinium enhancement (LGE)', 'Late Gadolinium Enhancement (LGE)') },
  { id: 'infarkt', label: L('Akuter & chronischer Infarkt', 'Acute & chronic infarction', 'انفارکت حاد و مزمن') },
  { id: 'minoca-takotsubo', label: L('MINOCA & Takotsubo', 'MINOCA & Takotsubo', 'MINOCA و تاکوتسوبو') },
  { id: 'entzuendung', label: L('Myokarditis & Sarkoidose', 'Myocarditis & sarcoidosis', 'میوکاردیت و سارکوئیدوز') },
  { id: 'algorithmus', label: L('Entscheidungsalgorithmus', 'Decision algorithm', 'الگوریتم تصمیم‌گیری') },
  { id: 'takehome', label: L('Take Home', 'Take home', 'نکات کلیدی') },
]
const SECTION_IDS = SECTIONS.map(section => section.id)
const SECTION_LABELS = Object.fromEntries(SECTIONS.map(section => [section.id, section.label]))

const ICONS = {
  ausgangspunkt: 'M4 12h4l2-5 4 10 2-5h4 M5 4h14v16H5z',
  'lge-muster': 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18 M12 7v10 M7 12h10',
  infarkt: 'M3 12h4l2-6 5 12 3-7h4 M12 3v3 M12 18v3',
  'minoca-takotsubo': 'M5 5h14v14H5z M8 9h8 M8 13h5 M8 17h3',
  entzuendung: 'M12 3c4 3 6 6 6 10a6 6 0 0 1-12 0c0-4 2-7 6-10 M9 13h6',
  algorithmus: 'M6 4h12v4H6z M6 16h12v4H6z M12 8v8 M9 13l3 3 3-3',
  takehome: 'M12 3l8 3v6c0 5-8 9-8 9s-8-4-8-9V6z M8 12l3 3 5-6',
}

const PATTERNS = [
  {
    id: 'infarct', title: L('Infarkt / MINOCA', 'Infarction / MINOCA', 'انفارکت / MINOCA'),
    image: '/thorax/kardio/myokardinfarkt-differentialdiagnosen/synthetic-infarct-lge.jpg',
    alt: L('Synthetische LGE-Kurzachsenaufnahme mit subendokardial bis transmuralem Infarktmuster und dunkler mikrovaskulärer Obstruktion', 'Synthetic short-axis LGE image with subendocardial-to-transmural infarct pattern and dark microvascular obstruction', 'تصویر ساختگی LGE محور کوتاه با الگوی انفارکت ساب‌اندوکاردیال تا ترانس‌مورال و انسداد میکروواسکولار تیره'),
    pattern: L('Subendokardial bis transmural und einem Koronarterritorium folgend.', 'Subendocardial to transmural and following a coronary territory.', 'ساب‌اندوکاردیال تا ترانس‌مورال و مطابق قلمرو کرونری.'),
    clue: L('Infarktausdehnung bestimmen und auf Komplikationen wie MVO oder intrakardialen Thrombus achten.', 'Assess transmurality and look for a dark MVO core within the bright infarct area.', 'به ترانس‌مورالیتی و هستهٔ تیرهٔ MVO در ناحیه روشن انفارکت توجه کنید.'),
    meaning: L('Ischämische Schädigung; bei nichtobstruktiven Koronarien ist MINOCA nur eine vorläufige Arbeitsdiagnose, bis die Ursache geklärt ist.', 'Ischaemic injury; with non-obstructive coronaries, MINOCA remains a working diagnosis.', 'آسیب ایسکمیک؛ در عروق غیرانسدادی، MINOCA همچنان یک تشخیص کاری است.'),
  },
  {
    id: 'takotsubo', title: L('Takotsubo', 'Takotsubo', 'تاکوتسوبو'),
    image: '/thorax/kardio/myokardinfarkt-differentialdiagnosen/synthetic-takotsubo-cine.jpg',
    alt: L('Synthetische Cine-Langachsenaufnahme mit apikalem Ballooning bei Takotsubo', 'Synthetic long-axis cine image with apical ballooning in Takotsubo syndrome', 'تصویر ساختگی Cine محور بلند با بالونینگ اپیکال در تاکوتسوبو'),
    pattern: L('Typischerweise kein LGE.', 'Typically no infarct-pattern LGE and no persistent focal scar.', 'معمولاً LGE با الگوی انفارکت و اسکار فوکال پایدار وجود ندارد.'),
    clue: L('Cine ist entscheidend: vorübergehende Hypo-, A- oder Dyskinesie mit apikalem, midventrikulärem, basalem (inversem) oder fokalem Ballooning – meist über ein einzelnes Koronarterritorium hinaus.', 'The mid-ventricular or apical motion pattern is decisive; oedema may coexist.', 'الگوی حرکتی میانی بطن یا اپیکال تعیین‌کننده است؛ ادم می‌تواند همراه باشد.'),
    meaning: L('Bewegungsmuster plus Ödem bei typischerweise fehlendem LGE sprechen für Takotsubo; die Funktionsstörung ist reversibel.', 'The absent infarct pattern helps distinguish Takotsubo from acute myocardial infarction.', 'نبود الگوی انفارکت به افتراق تاکوتسوبو از انفارکت حاد کمک می‌کند.'),
  },
  {
    id: 'myocarditis', title: L('Myokarditis', 'Myocarditis', 'میوکاردیت'),
    image: '/thorax/kardio/myokardinfarkt-differentialdiagnosen/synthetic-myocarditis-lge.jpg',
    alt: L('Synthetische LGE-Kurzachsenaufnahme mit subepikardialem inferolateralem Myokarditismuster', 'Synthetic short-axis LGE image with a subepicardial inferolateral myocarditis pattern', 'تصویر ساختگی LGE محور کوتاه با الگوی ساب‌اپیکاردیال اینفرولاترال میوکاردیت'),
    pattern: L('Subepikardial und/oder midmyokardial, häufig inferolateral; kein Koronarterritorium.', 'Subepicardial and/or mid-wall, often inferolateral; no coronary territory.', 'ساب‌اپیکاردیال و/یا میدوال، اغلب اینفرولاترال؛ بدون قلمرو کرونری.'),
    clue: L('Ödem sowie erhöhte T1-/T2-Werte sprechen für aktive Entzündung. Perikarderguss oder perikardiales LGE sind unterstützende Begleitbefunde.', 'Associated oedema or elevated T1/T2 values supports active inflammation.', 'ادم همراه یا افزایش مقادیر T1/T2 از التهاب فعال حمایت می‌کند.'),
    meaning: L('Nichtischämische Myokardschädigung; Klinik und Lake-Louise-Kriterien mitbewerten.', 'Non-ischaemic myocardial injury; integrate the clinical picture and Lake Louise criteria.', 'آسیب غیرایسکمیک میوکارد؛ تابلوی بالینی و معیارهای Lake Louise نیز ارزیابی شوند.'),
  },
  {
    id: 'sarcoidosis', title: L('Sarkoidose', 'Sarcoidosis', 'سارکوئیدوز'),
    image: '/thorax/kardio/myokardinfarkt-differentialdiagnosen/synthetic-sarcoidosis-lge.jpg',
    alt: L('Synthetische LGE-Kurzachsenaufnahme mit multifokal fleckigem nichtischämischem Muster bei kardialer Sarkoidose', 'Synthetic short-axis LGE image with multifocal patchy non-ischaemic pattern in cardiac sarcoidosis', 'تصویر ساختگی LGE محور کوتاه با الگوی چندکانونی لکه‌ای غیرایسکمیک در سارکوئیدوز قلبی'),
    pattern: L('Fleckig und multifokal, häufig basal-septal und lateral; kein Koronarterritorium.', 'Patchy and multifocal, often basal-septal and lateral; no coronary territory.', 'لکه‌ای و چندکانونی، اغلب بازال‌سپتال و لترال؛ بدون قلمرو کرونری.'),
    clue: L('Auf mehrere voneinander getrennte Herde und mögliche Aktivitätszeichen wie Ödem achten.', 'Look for multiple separate foci and possible activity markers such as oedema.', 'به کانون‌های متعدد جدا از هم و نشانه‌های احتمالی فعالیت مانند ادم توجه کنید.'),
    meaning: L('Hinweis auf granulomatöse Entzündung oder Narbe; das Muster ist nicht allein beweisend.', 'Suggests granulomatous inflammation or scar; the pattern is not diagnostic on its own.', 'به نفع التهاب گرانولوماتوز یا اسکار است؛ الگو به‌تنهایی تشخیصی نیست.'),
  },
]

const TROPONIN_DIFFERENTIALS = [
  { id: 'mi', title: L('Akuter Myokardinfarkt / MINOCA', 'Acute myocardial infarction / MINOCA', 'انفارکت حاد میوکارد / MINOCA'), description: L('Ischämische Myokardschädigung mit Troponindynamik. MINOCA ist keine Enddiagnose, sondern ein vorläufiger Sammelbegriff, bis die zugrunde liegende Ursache geklärt ist.', 'Ischämische Myokardschädigung mit Anstieg und/oder Abfall des Troponins. Bei nichtobstruktiven Koronarien bleibt MINOCA zunächst eine Arbeitsdiagnose.', 'Ischämische Myokardschädigung mit Anstieg und/oder Abfall des Troponins. Bei nichtobstruktiven Koronarien bleibt MINOCA zunächst eine Arbeitsdiagnose.') },
  { id: 'myocarditis', title: L('Myokarditis', 'Myocarditis', 'میوکاردیت'), description: L('Entzündliche Myokardschädigung mit Ödem und nichtischämischem LGE-Muster; Perikarderguss oder perikardiales LGE können die Diagnose unterstützen.', 'Entzündliche Schädigung des Myokards; CMR sucht nach Ödem und einem nichtischämischen LGE-Muster.', 'Entzündliche Schädigung des Myokards; CMR sucht nach Ödem und einem nichtischämischen LGE-Muster.') },
  { id: 'takotsubo', title: L('Takotsubo-Syndrom', 'Takotsubo syndrome', 'سندروم تاکوتسوبو'), description: L('Vorübergehende regionale LV-Dysfunktion mit apikalem, midventrikulärem, basalem (inversem) oder fokalem Ballooning; typischerweise kein LGE.', 'Vorübergehende stressassoziierte LV-Dysfunktion; typisches Bewegungsmuster ohne Infarkt-LGE.', 'Vorübergehende stressassoziierte LV-Dysfunktion; typisches Bewegungsmuster ohne Infarkt-LGE.') },
  { id: 'pe', title: L('Lungenarterienembolie', 'Pulmonary embolism', 'آمبولی ریه'), description: L('Akute Rechtsherzbelastung und Hypoxämie können eine sekundäre Myokardschädigung mit Troponinfreisetzung verursachen.', 'Akute Rechtsherzbelastung und Hypoxämie können eine sekundäre Myokardschädigung mit Troponinfreisetzung verursachen.', 'Akute Rechtsherzbelastung und Hypoxämie können eine sekundäre Myokardschädigung mit Troponinfreisetzung verursachen.') },
  { id: 'tachy', title: L('Tachyarrhythmie', 'Tachyarrhythmia', 'تاکی‌آریتمی'), description: L('Hohe Herzfrequenz erhöht den Sauerstoffbedarf und kann ein Missverhältnis von Angebot und Bedarf auslösen.', 'Hohe Herzfrequenz erhöht den Sauerstoffbedarf und kann ein Missverhältnis von Angebot und Bedarf auslösen.', 'Hohe Herzfrequenz erhöht den Sauerstoffbedarf und kann ein Missverhältnis von Angebot und Bedarf auslösen.') },
  { id: 'heart-failure', title: L('Akute Herzinsuffizienz', 'Acute heart failure', 'نارسایی حاد قلبی'), description: L('Wandstress, erhöhte Füllungsdrücke und Minderperfusion können Troponin ohne akuten Typ-1-Infarkt erhöhen.', 'Wandstress, erhöhte Füllungsdrücke und Minderperfusion können Troponin ohne akuten Typ-1-Infarkt erhöhen.', 'Wandstress, erhöhte Füllungsdrücke und Minderperfusion können Troponin ohne akuten Typ-1-Infarkt erhöhen.') },
  { id: 'aorta', title: L('Aortenstenose / -dissektion', 'Aortic stenosis / dissection', 'تنگی / دیسکسیون آئورت'), description: L('Druckbelastung oder akute Koronarmalperfusion kann eine relevante Myokardschädigung hervorrufen.', 'Druckbelastung oder akute Koronarmalperfusion kann eine relevante Myokardschädigung hervorrufen.', 'Druckbelastung oder akute Koronarmalperfusion kann eine relevante Myokardschädigung hervorrufen.') },
  { id: 'sarcoid-op', title: L('Kardiale Sarkoidose / Herz-OP', 'Cardiac sarcoidosis / cardiac surgery', 'سارکوئیدوز قلبی / جراحی قلب'), description: L('Granulomatöse Entzündung beziehungsweise perioperative Myokardschädigung kann Troponin freisetzen.', 'Granulomatöse Entzündung beziehungsweise perioperative Myokardschädigung kann Troponin freisetzen.', 'Granulomatöse Entzündung beziehungsweise perioperative Myokardschädigung kann Troponin freisetzen.') },
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
  return <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={ICONS[id] || ICONS['lge-muster']} /></svg>
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
    <header><h3 id="pattern-title">{pick(L('Differenzialdiagnosen im LGE', 'Differential diagnoses on LGE', 'تشخیص‌های افتراقی در LGE'), lang)}</h3></header>
    <div className={styles.patternTabs} role="tablist" aria-label={pick(L('Diagnose auswählen', 'Select diagnosis', 'انتخاب تشخیص'), lang)}>{PATTERNS.map(pattern => <button key={pattern.id} type="button" role="tab" aria-selected={selectedId === pattern.id} className={selectedId === pattern.id ? styles.patternTabActive : ''} onClick={() => setSelectedId(pattern.id)}><strong>{pick(pattern.title, lang)}</strong></button>)}</div>
    <article className={styles.patternPanel} role="tabpanel">
      <figure><Image src={selected.image} alt={pick(selected.alt, lang)} width={1254} height={1254} priority={selected.id === 'infarct'} /><figcaption>{pick(COPY.synthetic, lang)}</figcaption></figure>
      <div><h4>{pick(selected.title, lang)}</h4><dl><div><dt>{pick(L('Typisches LGE-Muster', 'Typical LGE pattern', 'الگوی تیپیک LGE'), lang)}</dt><dd>{pick(selected.pattern, lang)}</dd></div><div><dt>{pick(L('Worauf achten?', 'What to look for', 'به چه نکته‌ای توجه کنیم؟'), lang)}</dt><dd>{pick(selected.clue, lang)}</dd></div><div><dt>{pick(L('Einordnung', 'Interpretation', 'تفسیر'), lang)}</dt><dd>{pick(selected.meaning, lang)}</dd></div></dl></div>
    </article>
  </section>
}

function LgeBasics({ lang }) {
  const t = value => pick(value, lang)
  return <div className={styles.lgeBasics}>
    <article><span>01</span><div><h3>{t(L('Wie entsteht das Bild?', 'How is the image created?', 'تصویر چگونه ایجاد می‌شود؟'))}</h3><p>{t(L('Etwa 10–15 Minuten nach Gadolinium wird eine T1-gewichtete Inversion-Recovery-Sequenz aufgenommen. Die Inversionszeit wird so gewählt, dass normales Myokard dunkel erscheint.', 'LGE depicts focal necrosis and fibrosis or scar as bright myocardial areas.', 'LGE نکروز فوکال و فیبروز یا اسکار را به‌صورت نواحی روشن میوکارد نشان می‌دهد.'))}</p></div></article>
    <article><span>02</span><div><h3>{t(L('Warum wird geschädigtes Myokard hell?', 'Why does injured myocardium become bright?', 'چرا میوکارد آسیب‌دیده روشن می‌شود؟'))}</h3><p>{t(L('Bei Nekrose oder Fibrose ist der Extrazellulärraum vergrößert: Gadolinium reichert sich stärker an und wird gegenüber dem genullten, dunklen Normalmyokard hell. Entscheidend sind danach Wandschicht und Verteilung.', 'The wall layer and distribution determine the interpretation.', 'لایه دیواره و نحوه توزیع برای تفسیر تعیین‌کننده هستند.'))}</p></div></article>
  </div>
}

function LayerDiagram({ lang }) {
  const t = value => pick(value, lang)
  return <div className={styles.layerDiagram} aria-label={t(L('Schema der ischämischen und nichtischämischen LGE-Verteilung', 'Diagram of ischaemic and non-ischaemic LGE distribution', 'نمودار توزیع LGE ایسکمیک و غیرایسکمیک'))}>
    <article><h4>{t(L('Ischämisches LGE', 'Ischaemic LGE', 'LGE ایسکمیک'))}</h4><div className={`${styles.wallRing} ${styles.subendo}`}><i /></div><dl><div><dt>{t(L('1 · Wandschicht', '1 · Wall layer', '۱ · لایه دیواره'))}</dt><dd>{t(L('Das LGE beginnt immer subendokardial und kann sich je nach Infarkttiefe bis transmural ausbreiten.', 'It starts subendocardially and may extend transmurally.', 'از ساب‌اندوکارد آغاز می‌شود و می‌تواند تا ترانس‌مورال گسترش یابد.'))}</dd></div><div><dt>{t(L('2 · Verteilung', '2 · Distribution', '۲ · توزیع'))}</dt><dd>{t(L('Die Ausdehnung folgt einem Koronarterritorium.', 'The distribution follows a coronary territory.', 'توزیع از یک قلمرو کرونری پیروی می‌کند.'))}</dd></div></dl></article>
    <span aria-hidden="true">≠</span>
    <article><h4>{t(L('Nichtischämisches LGE', 'Non-ischaemic LGE', 'LGE غیرایسکمیک'))}</h4><div className={`${styles.wallRing} ${styles.midwall}`}><i /></div><dl><div><dt>{t(L('1 · Wandschicht', '1 · Wall layer', '۱ · لایه دیواره'))}</dt><dd>{t(L('Midmyokardial oder subepikardial: Das helle Areal berührt die innere, direkt an das LV-Blut angrenzende Myokardschicht typischerweise nicht.', 'Usually mid-wall or subepicardial, sparing the subendocardium.', 'معمولاً میدوال یا ساب‌اپیکاردیال است و ساب‌اندوکارد را درگیر نمی‌کند.'))}</dd></div><div><dt>{t(L('2 · Verteilung', '2 · Distribution', '۲ · توزیع'))}</dt><dd>{t(L('Die Herde folgen keinem einzelnen Koronarterritorium und können fleckig oder multifokal sein.', 'The foci do not follow a single coronary territory.', 'کانون‌ها از یک قلمرو کرونری منفرد پیروی نمی‌کنند.'))}</dd></div></dl></article>
  </div>
}

const TROPONIN_GRAPHICS = {
  de: {
    src: '/thorax/kardio/myokardinfarkt-differentialdiagnosen/troponin-pathway-de.png',
    title: 'Entscheidungsweg bei Thoraxschmerz und Troponinanstieg',
    alt: 'Entscheidungsweg bei Thoraxschmerz und Troponinanstieg: Herzkatheterlabor bei ST-Hebung, hämodynamischer Instabilität, sehr hohem Ausgangswert oder signifikanter Troponindynamik; CMR bei fehlender obstruktiver KHK oder weiterhin unklarer Ursache.',
  },
  en: {
    src: '/thorax/kardio/myokardinfarkt-differentialdiagnosen/troponin-pathway-en.png',
    title: 'Decision pathway for chest pain and elevated troponin',
    alt: 'Decision pathway for chest pain and elevated troponin: cardiac catheterization lab for ST elevation, haemodynamic instability, a very high baseline value, or a significant troponin change; CMR when there is no obstructive CAD or the patient is clinically stable but the cause remains unclear.',
  },
  fa: {
    src: '/thorax/kardio/myokardinfarkt-differentialdiagnosen/troponin-pathway-fa.png',
    title: 'مسیر تصمیم‌گیری در درد قفسه سینه و افزایش تروپونین',
    alt: 'مسیر تصمیم‌گیری در درد قفسه سینه و افزایش تروپونین: ارجاع به آزمایشگاه کاتتریزاسیون قلب در بالا رفتن قطعه ST، ناپایداری همودینامیک، مقدار اولیه بسیار بالا یا تغییر معنی‌دار تروپونین؛ انجام CMR در نبود بیماری انسدادی عروق کرونر یا باقی ماندن علت نامشخص در بیمار پایدار.',
  },
}

function TroponinFlowchart({ lang }) {
  const graphic = TROPONIN_GRAPHICS[lang] || TROPONIN_GRAPHICS.de
  return <figure className={styles.troponinGraphic} aria-labelledby="troponin-flow-title">
    <h3 id="troponin-flow-title" className={styles.srOnly}>{graphic.title}</h3>
    <Image src={graphic.src} alt={graphic.alt} width={1205} height={1306} priority unoptimized />
  </figure>
}

function TroponinDifferentials({ lang }) {
  const t = value => pick(value, lang)
  const [selectedId, setSelectedId] = useState(TROPONIN_DIFFERENTIALS[0].id)
  const selected = TROPONIN_DIFFERENTIALS.find(item => item.id === selectedId) || TROPONIN_DIFFERENTIALS[0]
  return <section className={styles.troponinDifferentials} aria-labelledby="troponin-dd-title">
    <header><h3 id="troponin-dd-title">{t(L('Differenzialdiagnosen des Troponinanstiegs', 'Differential diagnoses of troponin elevation', 'تشخیص‌های افتراقی افزایش تروپونین'))}</h3></header>
    <div className={styles.differentialTabs} role="tablist" aria-label={t(L('Differenzialdiagnose auswählen', 'Select differential diagnosis', 'انتخاب تشخیص افتراقی'))}>{TROPONIN_DIFFERENTIALS.map((item, index) => <button key={item.id} type="button" role="tab" aria-selected={selectedId === item.id} className={selectedId === item.id ? styles.differentialTabActive : ''} onMouseEnter={() => setSelectedId(item.id)} onFocus={() => setSelectedId(item.id)} onClick={() => setSelectedId(item.id)}><span>{String(index + 1).padStart(2, '0')}</span><strong>{t(item.title)}</strong></button>)}</div>
    <article className={styles.differentialDetail} role="tabpanel" aria-live="polite"><small>{t(L('Warum steigt Troponin?', 'Why does troponin rise?', 'چرا تروپونین افزایش می‌یابد؟'))}</small><strong>{t(selected.title)}</strong><p>{t(selected.description)}</p></article>
    <aside className={styles.troponinRemember}><strong>{t(L('Merke', 'Remember', 'نکته'))}</strong><p>{t(L('Je höher der Ausgangswert und je deutlicher die Dynamik, desto wahrscheinlicher ist im passenden ischämischen Kontext ein akuter Myokardinfarkt.', 'The higher the initial value and the clearer the kinetics, the more likely acute myocardial infarction becomes in the appropriate ischaemic context.', 'هرچه مقدار اولیه بالاتر و تغییرات سریال واضح‌تر باشد، در زمینه بالینی ایسکمیک احتمال انفارکت حاد بیشتر می‌شود.'))} <b>{t(L('Die Höhe allein beweist keine KHK. Auch nichtkoronare Ursachen können starke Anstiege verursachen.', 'Magnitude alone does not prove CAD. Non-coronary causes can also cause marked elevations.', 'شدت افزایش به‌تنهایی KHK را ثابت نمی‌کند و علل غیرکرونری نیز می‌توانند افزایش شدید ایجاد کنند.'))}</b></p></aside>
  </section>
}

function TroponinApproach({ lang }) {
  return <div className={styles.troponinSection}>
    <TroponinFlowchart lang={lang} />
    <TroponinDifferentials lang={lang} />
  </div>
}

function DecisionTree({ lang }) {
  const [answer, setAnswer] = useState('infarct')
  const result = {
    infarct: L('Infarkttypisches LGE + Ödem + regionale Dyskinesie → akuter MI; bei nichtobstruktiven Koronarien an MINOCA denken.', 'Infarct-pattern LGE + oedema + regional dyskinesia → acute MI; with non-obstructive coronaries consider MINOCA.', 'LGE انفارکتی + ادم + دیسکینزی موضعی ← MI حاد؛ با کرونر غیرانسدادی به MINOCA فکر کنید.'),
    none: L('Typischerweise kein LGE + charakteristisches Ballooning über ein einzelnes Koronarterritorium hinaus → Takotsubo wahrscheinlich.', 'No typical LGE + mid-ventricular/apical motion abnormality → Takotsubo likely.', 'نبود LGE تیپیک + اختلال حرکتی میانی/اپیکال ← تاکوتسوبو محتمل است.'),
    nonischemic: L('Nichtinfarkttypisches LGE + Ödem → entzündliche Myokardschädigung; Verteilung auf Myokarditis oder Sarkoidose prüfen.', 'Non-infarct LGE + oedema → inflammatory myocardial injury; use distribution to distinguish myocarditis from sarcoidosis.', 'LGE غیرانفارکتی + ادم ← آسیب التهابی میوکارد؛ توزیع برای افتراق میوکاردیت از سارکوئیدوز بررسی شود.'),
  }[answer]
  return <div className={styles.decisionTool}>
    <header><small>{pick(L('Erster Blick', 'First look', 'نگاه اول'), lang)}</small><h3>{pick(L('Wie ist das Late Enhancement verteilt?', 'How is late enhancement distributed?', 'توزیع Late Enhancement چگونه است؟'), lang)}</h3></header>
    <div className={styles.decisionOptions}>{[
      ['infarct', L('Infarkt-Typ', 'Infarct pattern', 'الگوی انفارکتی')],
      ['none', L('Kein LGE', 'No typical LGE', 'بدون LGE تیپیک')],
      ['nonischemic', L('Nicht-Infarkt-Typ', 'Non-infarct pattern', 'الگوی غیرانفارکتی')],
    ].map(([id, label]) => <button key={id} type="button" className={answer === id ? styles.decisionActive : ''} aria-pressed={answer === id} onClick={() => setAnswer(id)}>{pick(label, lang)}</button>)}</div>
    <div className={styles.decisionResult} aria-live="polite"><span>→</span><p>{pick(result, lang)}</p></div>
  </div>
}

function LessonContent({ lang }) {
  const t = value => pick(value, lang)
  return <>
    <Section id="ausgangspunkt" title={t(SECTION_LABELS.ausgangspunkt)}>
      <TroponinApproach lang={lang} />
    </Section>

    <Section id="lge-muster" title={t(SECTION_LABELS['lge-muster'])}>
      <LgeBasics lang={lang} />
      <LayerDiagram lang={lang} />
      <PatternExplorer lang={lang} />
    </Section>

    <Section id="infarkt" title={t(SECTION_LABELS.infarkt)}>
      <div className={styles.infarctSplit}><article><small>{t(L('Akut', 'Acute', 'حاد'))}</small><h3>{t(L('Drei korrelierende Zeichen', 'Three matching signs', 'سه نشانه هم‌خوان'))}</h3><ul><li>{t(L('Cine: regionale Hypo- oder Akinesie.', 'Cine: regional hypo- or akinesia.', 'Cine: هیپو یا آکینزی موضعی.'))}</li><li>{t(L('T2: deutliches Ödem im betroffenen Areal.', 'T2: marked oedema in the affected area.', 'T2: ادم واضح در ناحیه درگیر.'))}</li><li>{t(L('LGE: subendokardial bis transmural in einem Koronarterritorium.', 'LGE: subendocardial to transmural in a coronary territory.', 'LGE: ساب‌اندوکاردیال تا ترانس‌مورال در قلمرو کرونر.'))}</li></ul></article><article><small>{t(L('Chronisch', 'Chronic', 'مزمن'))}</small><h3>{t(L('Narbe und Remodeling', 'Scar and remodelling', 'اسکار و بازسازی'))}</h3><ul><li>{t(L('Abnahme der Myokarddicke und regionale Wandverdünnung.', 'Reduced myocardial thickness and regional wall thinning.', 'کاهش ضخامت میوکارد و نازک‌شدن موضعی دیواره.'))}</li><li>{t(L('Persistierendes LGE als Narbenzeichen.', 'Persistent LGE as a sign of scar.', 'LGE پایدار به‌عنوان نشانه اسکار.'))}</li><li>{t(L('Apikaler Thrombus oder Aneurysma als mögliche Komplikation.', 'Apical thrombus or aneurysm as possible complications.', 'ترومبوس یا آنوریسم اپیکال به‌عنوان عوارض احتمالی.'))}</li></ul></article></div>
      <div className={styles.mvoBox}><div className={styles.mvoMark}><span /></div><div><small>{t(L('KOMPLIKATIONEN', 'MVO · NO-REFLOW', 'MVO · NO-REFLOW'))}</small><h3>{t(L('Auf MVO und Thrombus achten', 'Microvascular obstruction', 'انسداد میکروواسکولار'))}</h3><p>{t(L('Eine dunkle Aussparung im hellen Infarkt-LGE spricht für MVO und ist prognostisch ungünstig. Zusätzlich Cine und kontrastverstärkte Bilder gezielt auf einen intrakardialen, besonders apikalen Thrombus prüfen.', 'A dark core within bright infarct LGE indicates failed microvascular reperfusion and is an adverse prognostic marker.', 'ناحیه تیره درون LGE روشن انفارکت نشان‌دهنده عدم رپرفیوژن میکروواسکولار و یک نشانه پیش‌آگهی نامطلوب است.'))}</p></div></div>
      <div className={styles.rule}><strong>{t(L('Territorium prüfen', 'Check the territory', 'قلمرو را بررسی کنید'))}</strong><p>{t(L('Vorderwand und anteroseptale Beteiligung sprechen beispielsweise für ein LAD-Territorium. Die Segmentzuordnung unterstützt, ersetzt aber nicht die Gesamtkorrelation.', 'Anterior and anteroseptal involvement, for example, points to the LAD territory. Segment assignment supports but does not replace the full correlation.', 'درگیری قدامی و قدامی‌سپتال برای مثال به قلمرو LAD اشاره دارد. تطبیق سگمنت‌ها کمک‌کننده است اما جایگزین جمع‌بندی کامل نیست.'))}</p></div>
    </Section>

    <Section id="minoca-takotsubo" title={t(SECTION_LABELS['minoca-takotsubo'])}>
      <div className={styles.compareColumns}><article><header><small>MINOCA</small><h3>{t(L('Infarktbild ohne obstruktive Koronarstenose', 'Infarct image without obstructive coronary stenosis', 'نمای انفارکت بدون تنگی انسدادی کرونر'))}</h3></header><p>{t(L('„Arbeitsdiagnose“ bedeutet: MINOCA ist noch keine endgültige Diagnose, sondern ein vorläufiger Sammelbegriff nach der Angiographie. Die eigentliche Ursache – zum Beispiel echter Infarkt, Myokarditis oder Takotsubo – muss anschließend geklärt werden. Ein subendokardiales bis transmurales LGE mit passendem Ödem und regionaler Dysfunktion spricht für einen Infarkt.', 'MINOCA is initially a working diagnosis. If CMR shows subendocardial-to-transmural LGE with matching oedema and regional dysfunction, the myocardium looks infarcted despite no relevant stenosis on angiography.', 'MINOCA در ابتدا یک تشخیص کاری است. اگر CMR الگوی LGE ساب‌اندوکاردیال تا ترانس‌مورال همراه با ادم و اختلال موضعی نشان دهد، تصویر میوکارد شبیه انفارکت است، با وجود نبود تنگی مهم در آنژیوگرافی.'))}</p><strong>{t(L('Kernaussage: Erst die Ursachenklärung macht aus der Arbeitsdiagnose eine endgültige Diagnose.', 'Key point: same tissue pattern as MI—different coronary anatomy.', 'نکته اصلی: الگوی بافتی مشابه MI، اما آناتومی کرونر متفاوت.'))}</strong></article><article><header><small>TAKOTSUBO</small><h3>{t(L('Typisches Bewegungsmuster · kein LGE', 'Motion pattern without typical scar', 'الگوی حرکتی بدون اسکار تیپیک'))}</h3></header><p>{t(L('Entscheidend ist Cine: Die vorübergehende Hypo-, A- oder Dyskinesie reicht meist über ein einzelnes Koronarterritorium hinaus. Am häufigsten zeigt sich apikales Ballooning; möglich sind auch midventrikuläre, basale (inverse) oder fokale Formen. Ein Ödem kann vorliegen, LGE fehlt typischerweise.', 'The broken-heart or apical-ballooning syndrome is transient and often triggered by emotional or physical stress. Mid-to-apical hypo- or akinesia is characteristic. Oedema may be present; typical infarct LGE is absent.', 'سندروم قلب شکسته یا Apical Ballooning گذراست و اغلب با استرس عاطفی یا جسمی تحریک می‌شود. هیپو یا آکینزی سگمنت‌های میانی تا اپیکال تیپیک است. ادم ممکن است وجود داشته باشد، اما LGE تیپیک انفارکت دیده نمی‌شود.'))}</p><strong>{t(L('Kernaussage: charakteristisches Cine-Muster + Ödem + typischerweise kein LGE.', 'Key point: cine reveals the diagnosis; LGE prevents confusion with infarction.', 'نکته اصلی: Cine تشخیص را نشان می‌دهد و LGE از اشتباه با انفارکت جلوگیری می‌کند.'))}</strong></article></div>
    </Section>

    <Section id="entzuendung" title={t(SECTION_LABELS.entzuendung)}>
      <div className={styles.inflammationIntro}><h3>{t(L('Myokarditis: aktualisierte Lake-Louise-Kriterien', 'Myocarditis: updated Lake Louise criteria', 'میوکاردیت: معیارهای به‌روزشده Lake Louise'))}</h3><p>{t(L('Für eine CMR-basierte Diagnose sollen ein T2-basiertes Zeichen des Myokardödems und ein T1-basiertes Zeichen der Myokardschädigung vorliegen. Dazu zählen erhöhtes natives T1 oder ECV beziehungsweise ein nichtischämisches LGE-Muster. Zusätzlich auf Perikarderguss oder perikardiales Enhancement achten: Das sind unterstützende Kriterien, aber keine Hauptkriterien.', 'A CMR-based diagnosis is supported by one T2-based marker of myocardial oedema and one T1-based marker of myocardial injury. The latter includes elevated native T1 or ECV, or a non-ischaemic LGE pattern.', 'برای تشخیص مبتنی بر CMR باید یک نشانه مبتنی بر T2 از ادم میوکارد و یک نشانه مبتنی بر T1 از آسیب میوکارد وجود داشته باشد؛ از جمله افزایش native T1 یا ECV و یا الگوی LGE غیرایسکمیک.'))}</p><div><span><b>1</b>{t(L('T2-basiert', 'T2-based', 'مبتنی بر T2'))}</span><i>+</i><span><b>1</b>{t(L('T1-basiert', 'T1-based', 'مبتنی بر T1'))}</span></div></div>
      <div className={styles.inflammationTable} role="table" aria-label={t(L('Vergleich Myokarditis und Sarkoidose', 'Comparison of myocarditis and sarcoidosis', 'مقایسه میوکاردیت و سارکوئیدوز'))}><div role="row" className={styles.tableHead}><span role="columnheader">CMR</span><strong role="columnheader">{t(L('Myokarditis', 'Myocarditis', 'میوکاردیت'))}</strong><strong role="columnheader">{t(L('Sarkoidose', 'Sarcoidosis', 'سارکوئیدوز'))}</strong></div>{[
        [L('Cine', 'Cine', 'Cine'), L('Normal oder regionale/globale Dysfunktion', 'Normal or regional/global dysfunction', 'طبیعی یا اختلال موضعی/کلی'), L('Dyskinesie oder LV-Dysfunktion möglich', 'Dyskinesia or LV dysfunction possible', 'دیسکینزی یا اختلال LV ممکن است')],
        [L('T2', 'T2', 'T2'), L('Ödem bei aktiver Entzündung', 'Oedema in active inflammation', 'ادم در التهاب فعال'), L('Ödem bei aktiver Entzündung', 'Oedema in active inflammation', 'ادم در التهاب فعال')],
        [L('LGE', 'LGE', 'LGE'), L('Subepikardial oder midmyokardial, häufig inferolateral', 'Subepicardial or mid-wall, often inferolateral', 'ساب‌اپیکاردیال یا میدوال، اغلب اینفرولاترال'), L('Fleckig, multifokal, oft basal-septal und lateral', 'Patchy, multifocal, often basal-septal and lateral', 'لکه‌ای و چندکانونی، اغلب بازال-سپتال و لترال')],
        [L('Perikard', 'Pericardium', 'پریکارد'), L('Erguss oder perikardiales LGE als unterstützender Befund', 'Effusion or pericardial LGE as a supportive finding', 'افیوژن یا LGE پریکارد به‌عنوان یافته حمایتی'), L('Perikardbeteiligung ist kein typisches Leitmuster', 'Pericardial involvement is not a typical leading pattern', 'درگیری پریکارد الگوی اصلی تیپیک نیست')],
      ].map(row => <div role="row" key={t(row[0])}><span role="cell">{t(row[0])}</span><p role="cell">{t(row[1])}</p><p role="cell">{t(row[2])}</p></div>)}</div>
      <div className={styles.rule}><strong>{t(L('Wichtige Grenze', 'Important limitation', 'محدودیت مهم'))}</strong><p>{t(L('Das LGE-Muster lenkt die Verdachtsdiagnose, ist aber nicht pathognomonisch. Klinische Daten und weitere Untersuchungen bleiben notwendig.', 'The LGE pattern guides the differential but is not pathognomonic. Clinical data and additional tests remain necessary.', 'الگوی LGE جهت تشخیص افتراقی را مشخص می‌کند، اما پاتوگنومونیک نیست؛ داده‌های بالینی و بررسی‌های تکمیلی همچنان لازم‌اند.'))}</p></div>
    </Section>

    <Section id="algorithmus" title={t(SECTION_LABELS.algorithmus)}>
      <DecisionTree lang={lang} />
      <ol className={styles.algorithmSteps}><li><span>01</span><div><h3>{t(L('LGE zuerst', 'Start with LGE', 'ابتدا LGE'))}</h3><p>{t(L('Infarkt-Typ, kein typisches LGE oder Nicht-Infarkt-Typ unterscheiden.', 'Separate infarct pattern, no typical LGE, and non-infarct pattern.', 'الگوی انفارکتی، نبود LGE تیپیک و الگوی غیرانفارکتی را جدا کنید.'))}</p></div></li><li><span>02</span><div><h3>{t(L('Ödem ergänzen', 'Add oedema', 'ادم را اضافه کنید'))}</h3><p>{t(L('Ödem spricht für einen akuten beziehungsweise aktiven Prozess, ist aber allein nicht spezifisch.', 'Oedema supports an acute or active process but is not specific on its own.', 'ادم به نفع فرایند حاد یا فعال است، اما به‌تنهایی اختصاصی نیست.'))}</p></div></li><li><span>03</span><div><h3>{t(L('Cine korrelieren', 'Correlate cine', 'Cine را تطبیق دهید'))}</h3><p>{t(L('Territoriale Akinesie, apikales Ballooning oder unspezifische Dysfunktion einordnen.', 'Classify territorial akinesia, apical ballooning, or non-specific dysfunction.', 'آکینزی قلمرویی، بالونینگ اپیکال یا اختلال عملکرد غیراختصاصی را طبقه‌بندی کنید.'))}</p></div></li><li><span>04</span><div><h3>{t(L('Koronarstatus einbeziehen', 'Include coronary status', 'وضعیت کرونر را لحاظ کنید'))}</h3><p>{t(L('Infarktmuster plus nichtobstruktive Koronarien bleibt eine MINOCA-Arbeitsdiagnose und verlangt Ursachenklärung.', 'An infarct pattern with non-obstructive coronaries remains a working diagnosis of MINOCA and requires aetiologic work-up.', 'الگوی انفارکت با کرونر غیرانسدادی همچنان تشخیص کاری MINOCA است و نیاز به بررسی علت دارد.'))}</p></div></li></ol>
    </Section>

    <Section id="takehome" title={t(SECTION_LABELS.takehome)}>
      <ol className={styles.takeHome}>{[
        L('Eine dringliche ACS-Therapie darf durch die Kardio-MRT nicht verzögert werden.', 'Cardiac MRI must not delay urgent ACS treatment.', 'MRI قلب نباید درمان فوری ACS را به تأخیر بیندازد.'),
        L('Infarkt-LGE beginnt subendokardial und folgt einem Koronarterritorium; die Ausdehnung kann transmural werden.', 'Infarct LGE starts subendocardially and follows a coronary territory; it may become transmural.', 'LGE انفارکت از ساب‌اندوکارد آغاز می‌شود و قلمرو کرونر را دنبال می‌کند و می‌تواند ترانس‌مورال شود.'),
        L('Beim akuten Infarkt gezielt auf Komplikationen wie MVO und intrakardialen Thrombus achten.', 'Oedema plus regional dysfunction supports acute infarction; MVO is an adverse marker.', 'ادم همراه اختلال موضعی از انفارکت حاد حمایت می‌کند؛ MVO نشانه نامطلوب است.'),
        L('MINOCA sieht im Myokard wie ein Infarkt aus, obwohl keine obstruktive Koronarstenose vorliegt.', 'MINOCA may look like infarction in the myocardium despite no obstructive coronary stenosis.', 'MINOCA در میوکارد شبیه انفارکت است، با وجود نبود تنگی انسدادی کرونر.'),
        L('Takotsubo zeigt ein charakteristisches, meist territoriumsübergreifendes Ballooning und typischerweise kein LGE.', 'Takotsubo shows a characteristic motion pattern without typical infarct LGE.', 'تاکوتسوبو الگوی حرکتی تیپیک بدون LGE انفارکتی دارد.'),
        L('Myokarditis und Sarkoidose zeigen nichtischämische, subepikardiale/midmyokardiale beziehungsweise fleckige LGE-Muster.', 'Myocarditis and sarcoidosis show non-ischaemic subepicardial/mid-wall or patchy LGE patterns.', 'میوکاردیت و سارکوئیدوز الگوهای LGE غیرایسکمیک ساب‌اپیکاردیال/میدوال یا لکه‌ای نشان می‌دهند.'),
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
    [L('Infarktalter', 'Infarct age', 'سن انفارکت'), L('Akut oder chronisch?', 'Acute or chronic?', 'حاد یا مزمن؟'), 'infarkt'],
    [L('Differenzialdiagnosen', 'Differential diagnoses', 'تشخیص‌های افتراقی'), L('Myokarditis, Takotsubo & mehr', 'Myocarditis, Takotsubo & more', 'میوکاردیت، تاکوتسوبو و موارد دیگر'), 'lge-muster'],
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
