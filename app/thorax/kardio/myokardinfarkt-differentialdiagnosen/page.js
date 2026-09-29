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
  { id: 'ausgangspunkt', label: L('Vorgehen bei erhöhtem Troponin', 'Approach to elevated troponin', 'رویکرد به افزایش تروپونین') },
  { id: 'lge-muster', label: L('Late Gadolinium Enhancement (LGE)', 'Late gadolinium enhancement (LGE)', 'Late Gadolinium Enhancement (LGE)') },
  { id: 'infarkt', label: L('Akuter vs. chronischer Infarkt', 'Acute vs. chronic infarction', 'انفارکت حاد در برابر مزمن') },
  { id: 'minoca', label: L('MINOCA', 'MINOCA', 'MINOCA') },
  { id: 'takotsubo', label: L('Takotsubo-Syndrom', 'Takotsubo syndrome', 'سندروم تاکوتسوبو') },
  { id: 'myokarditis', label: L('Myokarditis', 'Myocarditis', 'میوکاردیت') },
  { id: 'sarkoidose', label: L('Kardiale Sarkoidose', 'Cardiac sarcoidosis', 'سارکوئیدوز قلبی') },
  { id: 'algorithmus', label: L('Entscheidungsalgorithmus', 'Decision algorithm', 'الگوریتم تصمیم‌گیری') },
  { id: 'takehome', label: L('Take Home', 'Take home', 'نکات کلیدی') },
]
const SECTION_IDS = SECTIONS.map(section => section.id)
const SECTION_LABELS = Object.fromEntries(SECTIONS.map(section => [section.id, section.label]))

const ICONS = {
  ausgangspunkt: 'M4 12h4l2-5 4 10 2-5h4 M5 4h14v16H5z',
  'lge-muster': 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18 M12 7v10 M7 12h10',
  infarkt: 'M3 12h4l2-6 5 12 3-7h4 M12 3v3 M12 18v3',
  minoca: 'M5 5h14v14H5z M8 9h8 M8 13h5 M8 17h3',
  takotsubo: 'M12 21s-7-4.3-7-10.1C5 7.6 7.2 5 10 5c1.2 0 2 .6 2 1.5C12 5.6 12.8 5 14 5c2.8 0 5 2.6 5 5.9C19 16.7 12 21 12 21z',
  myokarditis: 'M12 3c4 3 6 6 6 10a6 6 0 0 1-12 0c0-4 2-7 6-10 M9 13h6',
  sarkoidose: 'M7 7h.01 M12 4h.01 M17 8h.01 M8 13h.01 M15 15h.01 M12 20h.01',
  algorithmus: 'M6 4h12v4H6z M6 16h12v4H6z M12 8v8 M9 13l3 3 3-3',
  takehome: 'M12 3l8 3v6c0 5-8 9-8 9s-8-4-8-9V6z M8 12l3 3 5-6',
}

const PATTERNS = [
  {
    id: 'infarct', title: L('Infarkt / MINOCA', 'Infarction / MINOCA', 'انفارکت / MINOCA'),
    image: '/thorax/kardio/myokardinfarkt-differentialdiagnosen/synthetic-infarct-lge.jpg',
    alt: L('Synthetische LGE-Kurzachsenaufnahme mit subendokardial bis transmuralem Infarktmuster und dunkler mikrovaskulärer Obstruktion', 'Synthetic short-axis LGE image with subendocardial-to-transmural infarct pattern and dark microvascular obstruction', 'تصویر ساختگی LGE محور کوتاه با الگوی انفارکت ساب‌اندوکاردیال تا ترانس‌مورال و انسداد میکروواسکولار تیره'),
    lge: L('Subendokardial beginnend, je nach Infarkttiefe bis transmural; die Verteilung folgt einem Koronarterritorium.', 'Subendocardial to transmural in a coronary territory.', 'ساب‌اندوکاردیال تا ترانس‌مورال در قلمرو کرونری.'),
    points: [
      L('Transmuralität und betroffene Segmente dokumentieren.', 'Document transmural extent and involved segments.', 'وسعت ترانس‌مورال و سگمنت‌های درگیر ثبت شود.'),
      L('T2-Ödem spricht für einen akuten Infarkt; fehlendes Ödem eher für eine chronische Narbe.', 'T2 oedema supports acute infarction.', 'ادم T2 به نفع انفارکت حاد است.'),
      L('Bei akutem Infarkt gezielt nach MVO, Einblutung und LV-Thrombus suchen.', 'Look for MVO, haemorrhage, and LV thrombus.', 'MVO، خونریزی و ترومبوس LV بررسی شود.'),
    ],
  },
  {
    id: 'takotsubo', title: L('Takotsubo', 'Takotsubo', 'تاکوتسوبو'),
    image: '/thorax/kardio/myokardinfarkt-differentialdiagnosen/synthetic-takotsubo-cine.jpg',
    alt: L('Synthetische Cine-Langachsenaufnahme mit apikalem Ballooning bei Takotsubo', 'Synthetic long-axis cine image with apical ballooning in Takotsubo syndrome', 'تصویر ساختگی Cine محور بلند با بالونینگ اپیکال در تاکوتسوبو'),
    lge: L('Typischerweise kein LGE in den dysfunktionellen Segmenten; ein persistierendes infarct- oder myokarditistypisches Muster spricht gegen die klassische Konstellation.', 'Typically no LGE in dysfunctional segments.', 'معمولاً در سگمنت‌های مختل LGE وجود ندارد.'),
    points: [
      L('Cine zeigt das Ballooning: apikal, midventrikulär, basal (invers) oder fokal.', 'Cine shows apical, mid-ventricular, basal, or focal ballooning.', 'Cine بالونینگ اپیکال، میانی، بازال یا فوکال را نشان می‌دهد.'),
      L('Die Wandbewegungsstörung reicht meist über ein einzelnes Koronarterritorium hinaus.', 'Wall-motion abnormality usually extends beyond one coronary territory.', 'اختلال حرکت دیواره معمولاً فراتر از یک قلمرو کرونر است.'),
      L('T2-Ödem kann vorliegen; zusätzlich auf LV-/RV-Beteiligung und intrakavitäre Thromben achten.', 'T2 oedema may occur; assess ventricular involvement and thrombi.', 'ادم T2 ممکن است وجود داشته باشد؛ درگیری بطنی و ترومبوس بررسی شود.'),
    ],
  },
  {
    id: 'myocarditis', title: L('Myokarditis', 'Myocarditis', 'میوکاردیت'),
    image: '/thorax/kardio/myokardinfarkt-differentialdiagnosen/synthetic-myocarditis-lge.jpg',
    alt: L('Synthetische LGE-Kurzachsenaufnahme mit subepikardialem inferolateralem Myokarditismuster', 'Synthetic short-axis LGE image with a subepicardial inferolateral myocarditis pattern', 'تصویر ساختگی LGE محور کوتاه با الگوی ساب‌اپیکاردیال اینفرولاترال میوکاردیت'),
    lge: L('Subepikardial und/oder midmyokardial, häufig inferolateral; keine Bindung an ein Koronarterritorium und typischerweise Aussparung des Subendokards.', 'Subepicardial and/or mid-wall, often inferolateral.', 'ساب‌اپیکاردیال و/یا میدوال، اغلب اینفرولاترال.'),
    points: [
      L('Lake Louise: mindestens ein T2-basiertes plus ein T1-basiertes Zeichen zusammen bewerten.', 'Combine one T2-based and one T1-based marker.', 'یک معیار T2 و یک معیار T1 با هم ارزیابی شوند.'),
      L('T2-Ödem sowie erhöhte native T1-/ECV-Werte stützen eine aktive Entzündung.', 'T2 oedema and elevated native T1/ECV support active inflammation.', 'ادم T2 و افزایش T1/ECV به نفع التهاب فعال است.'),
      L('Auch auf Perikarderguss und perikardiales Enhancement achten.', 'Also assess pericardial effusion and enhancement.', 'افیوژن و enhancement پریکارد نیز بررسی شود.'),
    ],
  },
  {
    id: 'sarcoidosis', title: L('Sarkoidose', 'Sarcoidosis', 'سارکوئیدوز'),
    image: '/thorax/kardio/myokardinfarkt-differentialdiagnosen/synthetic-sarcoidosis-lge.jpg',
    alt: L('Synthetische LGE-Kurzachsenaufnahme mit multifokal fleckigem nichtischämischem Muster bei kardialer Sarkoidose', 'Synthetic short-axis LGE image with multifocal patchy non-ischaemic pattern in cardiac sarcoidosis', 'تصویر ساختگی LGE محور کوتاه با الگوی چندکانونی لکه‌ای غیرایسکمیک در سارکوئیدوز قلبی'),
    lge: L('Fleckig und multifokal, häufig basal-septal oder lateral sowie midmyokardial/subepikardial; ein einzelnes Koronarterritorium wird nicht eingehalten.', 'Patchy and multifocal, often basal-septal or lateral.', 'لکه‌ای و چندکانونی، اغلب بازال‌سپتال یا لترال.'),
    points: [
      L('Mehrere räumlich getrennte Herde und eine mögliche RV-Beteiligung erfassen.', 'Assess separate foci and possible RV involvement.', 'کانون‌های جدا و درگیری احتمالی RV بررسی شود.'),
      L('LGE zeigt vor allem Narbe; FDG-PET ergänzt bei der Frage nach aktiver Entzündung.', 'LGE depicts scar; FDG-PET complements assessment of activity.', 'LGE بیشتر اسکار را نشان می‌دهد؛ PET برای فعالیت کمک‌کننده است.'),
      L('Das Muster ist nicht pathognomonisch und muss klinisch eingeordnet werden.', 'The pattern is not diagnostic on its own.', 'این الگو به‌تنهایی تشخیصی نیست.'),
    ],
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
  ['AHA Standardized Myocardial Segmentation and Nomenclature', 'https://www.ahajournals.org/doi/10.1161/hc0402.102975'],
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
      <div><h4>{pick(selected.title, lang)}</h4><div className={styles.patternInfo}><section><h5>{pick(L('LGE-Charakteristik', 'LGE characteristics', 'ویژگی‌های LGE'), lang)}</h5><p>{pick(selected.lge, lang)}</p></section><section><h5>{pick(L('Wichtige Punkte', 'Important points', 'نکات مهم'), lang)}</h5><ul>{selected.points.map(point => <li key={pick(point, lang)}>{pick(point, lang)}</li>)}</ul></section></div></div>
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
    alt: 'مسیر تصمیم‌گیری در درد قفسه سینه و افزایش تروپونین: ارجاع به Cardiac catheterization lab در بالا رفتن قطعه ST، ناپایداری همودینامیک، مقدار اولیه بسیار بالا یا تغییر معنی‌دار تروپونین؛ انجام CMR در نبود بیماری انسدادی عروق کرونر یا باقی ماندن علت نامشخص در بیمار پایدار.',
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
      <div className={styles.infarctSplit}>
        <article><small>{t(L('Akut', 'Acute', 'حاد'))}</small><h3>{t(L('Ödem + frische Nekrose', 'Oedema + acute necrosis', 'ادم و نکروز حاد'))}</h3><ul><li>{t(L('T2: erhöht durch Myokardödem.', 'T2: elevated due to myocardial oedema.', 'T2 به علت ادم بالا است.'))}</li><li>{t(L('LGE: subendokardial bis transmural im Koronarterritorium.', 'LGE: subendocardial to transmural.', 'LGE ساب‌اندوکاردیال تا ترانس‌مورال است.'))}</li><li>{t(L('Cine: regionale Hypo-, A- oder Dyskinesie.', 'Cine: regional wall-motion abnormality.', 'Cine اختلال حرکت دیواره را نشان می‌دهد.'))}</li></ul></article>
        <article><small>{t(L('Chronisch', 'Chronic', 'مزمن'))}</small><h3>{t(L('Narbe + Remodeling', 'Scar + remodelling', 'اسکار و بازسازی'))}</h3><ul><li>{t(L('T2: kein Ödem, Signal meist normalisiert.', 'T2: no oedema, usually normalised.', 'T2 بدون ادم و معمولاً نرمال است.'))}</li><li>{t(L('LGE: persistierende Narbe, oft mit Wandverdünnung.', 'LGE: persistent scar, often with wall thinning.', 'LGE اسکار پایدار همراه نازکی دیواره است.'))}</li><li>{t(L('Cine: persistierende A- oder Dyskinesie und LV-Remodeling.', 'Cine: persistent akinesia/dyskinesia and remodelling.', 'Cine آکینزی یا دیسکینزی پایدار را نشان می‌دهد.'))}</li></ul></article>
      </div>

      <section className={styles.complicationSection} aria-labelledby="mi-complications-title">
        <header><small>{t(L('Eigener Prüfschritt', 'Dedicated review step', 'مرحله بررسی مستقل'))}</small><h3 id="mi-complications-title">{t(L('Komplikationen des Myokardinfarkts', 'Complications of myocardial infarction', 'عوارض انفارکت میوکارد'))}</h3></header>
        <figure><Image src="/thorax/kardio/myokardinfarkt-differentialdiagnosen/post-mi-complications-cmr.png" alt={t(L('Synthetische CMR-Lehrabbildung mit mikrovaskulärer Obstruktion, intramyokardialer Einblutung, LV-Thrombus und LV-Aneurysma', 'Synthetic CMR teaching image of post-infarction complications', 'تصویر آموزشی ساختگی عوارض پس از انفارکت'))} width={1536} height={1024} /><figcaption>{t(COPY.synthetic)}</figcaption></figure>
        <div className={styles.complicationGrid}>{[
          [L('MVO', 'MVO', 'MVO'), L('Dunkler Kern innerhalb des hellen Infarkt-LGE: Hinweis auf fehlende mikrovaskuläre Reperfusion.', 'Dark core within bright infarct LGE.', 'هسته تیره در LGE روشن انفارکت.')],
          [L('Intramyokardiale Einblutung', 'Intramyocardial haemorrhage', 'خونریزی داخل میوکارد'), L('Suszeptibilitätsbedingte Signalminderung im Infarktkern, am besten in T2*/Mapping erfassbar.', 'Susceptibility-related dark core on T2* imaging.', 'هسته تیره ناشی از خونریزی در T2*.')],
          [L('LV-Thrombus', 'LV thrombus', 'ترومبوس LV'), L('Meist apikaler, nicht perfundierter Füllungsdefekt; gezielt in Cine und kontrastverstärkten Bildern prüfen.', 'Usually an apical non-perfused filling defect.', 'معمولاً نقص پرشدگی اپیکال بدون پرفیوژن.')],
          [L('Aneurysma / Pseudoaneurysma', 'Aneurysm / pseudoaneurysm', 'آنوریسم / پسودوآنوریسم'), L('Breithalsiges, wandständiges Aneurysma von einem schmalhalsigen, rupturgefährdeten Pseudoaneurysma abgrenzen.', 'Distinguish true broad-neck aneurysm from narrow-neck pseudoaneurysm.', 'افتراق آنوریسم واقعی از پسودوآنوریسم ضروری است.')],
        ].map(([title, text], index) => <article key={t(title)}><span>{String(index + 1).padStart(2, '0')}</span><div><h4>{t(title)}</h4><p>{t(text)}</p></div></article>)}</div>
      </section>

      <section className={styles.territorySection} aria-labelledby="territory-title">
        <div className={styles.territoryCopy}><small>AHA · 17 SEGMENTE</small><h3 id="territory-title">{t(L('Koronarterritorium systematisch zuordnen', 'Map the coronary territory systematically', 'تطبیق سیستماتیک قلمرو کرونر'))}</h3><p>{t(L('LAD versorgt typischerweise die anterioren und anteroseptalen, RCA die inferioren und LCX die lateralen Segmente. Diese Zuordnung ist eine Orientierung: Dominanz und individuelle Koronaranatomie können abweichen.', 'Typical coronary territory assignment is a guide; anatomy varies.', 'تطبیق قلمرو کرونر راهنماست و آناتومی می‌تواند متفاوت باشد.'))}</p></div>
        <figure><Image src="/thorax/kardio/myokardinfarkt-differentialdiagnosen/coronary-territories-aha17.png" alt={t(L('Originale schematische Darstellung der typischen LAD-, RCA- und LCX-Territorien im AHA-17-Segment-Modell', 'Original schematic of typical coronary territories in the AHA 17-segment model', 'شماتیک قلمروهای کرونری در مدل ۱۷ سگمنتی AHA'))} width={1536} height={1024} /><figcaption>{t(L('Vereinfachte Zuordnung · Koronaranatomie variabel', 'Simplified assignment · coronary anatomy varies', 'تطبیق ساده‌شده؛ آناتومی کرونر متغیر است'))}</figcaption></figure>
      </section>
    </Section>

    <Section id="minoca" title={t(SECTION_LABELS.minoca)}>
      <div className={styles.focusCard}><small>MINOCA</small><h3>{t(L('Keine Enddiagnose, sondern der Start der Ursachenklärung', 'A starting point for aetiologic work-up', 'شروع بررسی علت'))}</h3><p>{t(L('Nach Nachweis eines Myokardinfarkts ohne obstruktive KHK klärt die CMR, ob tatsächlich ein Infarkt vorliegt oder ob Myokarditis, Takotsubo beziehungsweise eine andere Myokardschädigung die Klinik erklärt. Die Untersuchung sollte möglichst früh im Indexaufenthalt erfolgen.', 'CMR distinguishes infarction from myocarditis, Takotsubo, and other injury.', 'CMR انفارکت را از میوکاردیت، تاکوتسوبو و علل دیگر افتراق می‌دهد.'))}</p><div className={styles.focusSteps}><span><b>01</b>{t(L('Koronarangiographie: keine obstruktive KHK', 'No obstructive CAD', 'بدون KHK انسدادی'))}</span><span><b>02</b>{t(L('CMR: LGE + T2 + Cine', 'CMR: LGE + T2 + cine', 'CMR: LGE + T2 + Cine'))}</span><span><b>03</b>{t(L('Ätiologie festlegen', 'Define the cause', 'تعیین علت'))}</span></div></div>
    </Section>

    <Section id="takotsubo" title={t(SECTION_LABELS.takotsubo)}>
      <div className={styles.diseaseFeature}><figure><Image src="/thorax/kardio/myokardinfarkt-differentialdiagnosen/synthetic-takotsubo-cine.jpg" alt={t(PATTERNS[1].alt)} width={1254} height={1254} /><figcaption>{t(COPY.synthetic)}</figcaption></figure><div><small>CINE ZUERST</small><h3>{t(L('Ballooning statt Koronarterritorium', 'Ballooning beyond one coronary territory', 'بالونینگ فراتر از قلمرو کرونر'))}</h3><p>{t(L('Cine zeigt eine vorübergehende regionale LV-Dysfunktion. Das Muster ist am häufigsten apikal, kann aber auch midventrikulär, basal (invers) oder fokal sein und überschreitet meist die Grenzen eines einzelnen Koronarterritoriums.', 'Cine demonstrates transient regional LV dysfunction beyond one coronary territory.', 'Cine اختلال گذرای عملکرد LV را نشان می‌دهد.'))}</p><ul><li>{t(L('T2: Ödem in den dysfunktionellen Segmenten möglich.', 'T2 oedema may be present.', 'ادم T2 ممکن است وجود داشته باشد.'))}</li><li>{t(L('LGE: typischerweise nicht nachweisbar.', 'LGE is typically absent.', 'LGE معمولاً وجود ندارد.'))}</li><li>{t(L('Komplikationen: LV-/RV-Beteiligung, LVOT-Obstruktion, Mitralinsuffizienz und intrakavitäre Thromben prüfen.', 'Assess ventricular involvement, LVOTO, MR, and thrombi.', 'درگیری بطنی، LVOTO، MR و ترومبوس بررسی شود.'))}</li></ul></div></div>
    </Section>

    <Section id="myokarditis" title={t(SECTION_LABELS.myokarditis)}>
      <div className={styles.inflammationIntro}><h3>{t(L('Myokarditis: aktualisierte Lake-Louise-Kriterien', 'Myocarditis: updated Lake Louise criteria', 'میوکاردیت: معیارهای به‌روزشده Lake Louise'))}</h3><p>{t(L('Für eine CMR-basierte Diagnose sollen ein T2-basiertes Zeichen des Myokardödems und ein T1-basiertes Zeichen der Myokardschädigung vorliegen. Dazu zählen erhöhtes natives T1 oder ECV beziehungsweise ein nichtischämisches LGE-Muster. Zusätzlich auf Perikarderguss oder perikardiales Enhancement achten: Das sind unterstützende Kriterien, aber keine Hauptkriterien.', 'A CMR-based diagnosis is supported by one T2-based marker of myocardial oedema and one T1-based marker of myocardial injury. The latter includes elevated native T1 or ECV, or a non-ischaemic LGE pattern.', 'برای تشخیص مبتنی بر CMR باید یک نشانه مبتنی بر T2 از ادم میوکارد و یک نشانه مبتنی بر T1 از آسیب میوکارد وجود داشته باشد؛ از جمله افزایش native T1 یا ECV و یا الگوی LGE غیرایسکمیک.'))}</p><div><span><b>1</b>{t(L('T2-basiert', 'T2-based', 'مبتنی بر T2'))}</span><i>+</i><span><b>1</b>{t(L('T1-basiert', 'T1-based', 'مبتنی بر T1'))}</span></div></div>
      <div className={styles.rule}><strong>{t(L('LGE-Muster', 'LGE pattern', 'الگوی LGE'))}</strong><p>{t(L('Subepikardial oder midmyokardial, häufig inferolateral und nicht an ein Koronarterritorium gebunden. Perikarderguss oder perikardiales Enhancement unterstützen die Diagnose.', 'Subepicardial or mid-wall, often inferolateral; pericardial findings are supportive.', 'ساب‌اپیکاردیال یا میدوال، اغلب اینفرولاترال؛ یافته‌های پریکارد حمایتی هستند.'))}</p></div>
    </Section>

    <Section id="sarkoidose" title={t(SECTION_LABELS.sarkoidose)}>
      <div className={styles.diseaseFeature}><figure><Image src="/thorax/kardio/myokardinfarkt-differentialdiagnosen/synthetic-sarcoidosis-lge.jpg" alt={t(PATTERNS[3].alt)} width={1254} height={1254} /><figcaption>{t(COPY.synthetic)}</figcaption></figure><div><small>MULTIFOKALES LGE</small><h3>{t(L('Fleckige Narbe, nicht ein Koronarterritorium', 'Patchy scar beyond a coronary territory', 'اسکار لکه‌ای خارج از قلمرو کرونر'))}</h3><p>{t(L('Typisch ist ein fleckiges, multifokales LGE, häufig basal-septal oder lateral sowie midmyokardial beziehungsweise subepikardial. Auch transmurale Herde und eine RV-Beteiligung sind möglich.', 'Patchy, multifocal LGE is typical, often basal-septal or lateral.', 'LGE لکه‌ای و چندکانونی، اغلب بازال‌سپتال یا لترال است.'))}</p><ul><li>{t(L('LGE quantifiziert vor allem die Narbenlast und ist prognostisch relevant.', 'LGE primarily depicts scar burden.', 'LGE بار اسکار را نشان می‌دهد.'))}</li><li>{t(L('FDG-PET ergänzt die Beurteilung der entzündlichen Aktivität.', 'FDG-PET complements assessment of inflammatory activity.', 'FDG-PET برای فعالیت التهاب کمک‌کننده است.'))}</li><li>{t(L('Kein einzelnes LGE-Muster ist beweisend: Klinik, Rhythmusdiagnostik und extrakardiale Befunde mitbewerten.', 'No single LGE pattern is diagnostic.', 'هیچ الگوی منفرد LGE تشخیصی نیست.'))}</li></ul></div></div>
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
  return <div className={`${template.mobileLearningPath} ${styles.mobileLearningPath}`}>
    {panelOpen ? <section id="mi-dd-mobile-path" className={`${template.mobilePathPanel} ${styles.mobilePathPanel}`} role="dialog" aria-label={pick(COPY.path, lang)}><header><div><small>{pick(COPY.progress, lang)}</small><strong>{readSections.size} / {SECTIONS.length}</strong></div><button type="button" onClick={() => setPanelOpen(false)} aria-label={pick(COPY.close, lang)}>×</button></header><nav>{SECTIONS.map(section => <button type="button" key={section.id} className={openId === section.id ? template.mobilePathCurrent : ''} onClick={() => select(section.id)} aria-current={openId === section.id ? 'location' : undefined}><span className={template.mobilePathItemIcon}><SectionIcon id={section.id} /></span><span><strong>{pick(section.label, lang)}</strong><small>{pick(section.label, lang)}</small></span><i aria-hidden="true">{readSections.has(section.id) ? '✓' : ''}</i></button>)}</nav></section> : null}
    <button type="button" className={`${template.mobilePathButton} ${styles.mobilePathButton}`} onClick={() => setPanelOpen(value => !value)} aria-expanded={panelOpen} aria-controls="mi-dd-mobile-path"><span className={`${template.mobileProgressRing} ${styles.mobileProgressRing}`} style={{ '--mobile-progress': `${progress}deg` }}><b>{readSections.size}</b><small>/{SECTIONS.length}</small></span><span className={`${template.mobileCurrentIcon} ${styles.mobileCurrentIcon}`}><SectionIcon id={current.id} /></span><span className={template.mobilePathLabel}><strong>{pick(COPY.path, lang)}</strong><small>{pick(current.label, lang)}</small></span></button>
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
    <div className={`${template.layout} ${styles.lessonLayout}`}><aside className={`${template.sidebar} ${styles.lessonSidebar}`}><h2>{pick(COPY.path, lang)}</h2><nav>{SECTIONS.map(section => <button type="button" key={section.id} className={`${styles.sideNavItem} ${openId === section.id ? `${template.activeSideItem} ${styles.sideNavItemActive}` : ''}`} onClick={() => jumpTo(section.id)} aria-current={openId === section.id ? 'location' : undefined} aria-label={`${pick(COPY.open, lang)}: ${pick(section.label, lang)}`}><span className={template.sideIcon}><SectionIcon id={section.id} /></span><strong>{pick(section.label, lang)}</strong></button>)}</nav></aside><article className={template.lesson}><LessonContext.Provider value={{ lang, openId, readSections, selectSection, toggleSectionRead }}><LessonContent lang={lang} /></LessonContext.Provider></article></div>
    <MobilePath lang={lang} openId={openId} readSections={readSections} onSelect={jumpTo} />
  </main>
}
