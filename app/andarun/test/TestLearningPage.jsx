'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import { usePersistedSectionProgress } from '@/hooks/usePersistedSectionProgress'
import MeniscusTextLesson, { MENISCUS_TITLE } from './MeniscusTextLesson'
import RadiopaediaFile from '@/components/LessonCaseFile'
import styles from '@/components/LessonTemplate.module.css'

const L = (de, en, fa) => ({ de, en, fa })
const pick = (value, lang) => typeof value === 'string' ? value : value[lang] || value.de

const SECTION_COPY = [
  { id: 'start', title: L('Der 5-Minuten-Workflow', 'The five-minute workflow', 'روند پنج‌دقیقه‌ای'), icon: 'brain' },
  { id: 'meniscus-text', title: MENISCUS_TITLE, icon: 'case' },
  { id: 'interactive', title: L('Interaktive Bildanalyse', 'Interactive image review', 'تحلیل تعاملی تصویر'), icon: 'scan' },
  { id: 'table', title: L('Befundtabelle', 'Reporting table', 'جدول گزارش'), icon: 'chart' },
  { id: 'take-home', title: 'Take Home Message', icon: 'spark', emphasis: true },
]

const PATH_SECTIONS = SECTION_COPY.filter(section => !section.emphasis)
const TRACKED_SECTION_IDS = PATH_SECTIONS.map(section => section.id)

function replaceLessonHash(id) {
  const baseUrl = `${window.location.pathname}${window.location.search}`
  window.history.replaceState(null, '', id ? `${baseUrl}#${id}` : baseUrl)
}

function scrollToLessonSection(id) {
  requestAnimationFrame(() => requestAnimationFrame(() => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }))
}

const COPY = {
  title: L('Akuter ischämischer Schlaganfall', 'Acute ischaemic stroke', 'سکته ایسکمیک حاد'),
  mcq: L('MCQ starten', 'Start MCQs', 'شروع MCQ'),
  flashcards: L('Flashcards', 'Flashcards', 'فلش‌کارت‌ها'),
  path: L('Lernpfad', 'Learning path', 'مسیر یادگیری'),
  jumpToSummary: L('Take Home Message', 'Take Home Message', 'Take Home Message'),
  close: L('Schließen', 'Close', 'بستن'),
  progress: L('gelesen', 'read', 'خوانده‌شده'),
  continue: L('Lektion fortsetzen', 'Continue lesson', 'ادامه درس'),
  completeLesson: L('Ganze Lektion als gelesen markieren', 'Mark full lesson as read', 'علامت‌گذاری کل درس به‌عنوان خوانده‌شده'),
  lessonCompleted: L('Ganze Lektion gelesen', 'Full lesson marked as read', 'کل درس خوانده شد'),
  complete: L('Abschnitt als gelesen markieren', 'Mark section as read', 'علامت‌گذاری بخش به‌عنوان خوانده‌شده'),
  completed: L('Als gelesen markiert', 'Marked as read', 'به‌عنوان خوانده‌شده علامت‌گذاری شد'),
  open: L('Abschnitt öffnen', 'Open section', 'باز کردن بخش'),
  intro: L(
    'In wenigen, strukturierten Schritten von der ersten Bildbeurteilung zur richtigen Therapieentscheidung – schnell, sicher und teamorientiert.',
    'Move from first image review to the right treatment decision in a few structured steps — quickly, safely, and as a team.',
    'با چند گام ساختاریافته از نخستین بررسی تصویر به تصمیم درمانی درست برسید — سریع، ایمن و تیم‌محور.'
  ),
  workflow: [
    [L('Blutung?', 'Haemorrhage?', 'خونریزی؟'), L('Intrakranielle Blutung ausschließen', 'Exclude intracranial haemorrhage', 'رد خونریزی داخل جمجمه'), 'brain'],
    [L('Frühischämie?', 'Early ischaemia?', 'ایسکمی اولیه؟'), L('ASPECTS und subtile Zeichen prüfen', 'Check ASPECTS and subtle signs', 'بررسی ASPECTS و علائم ظریف'), 'scan'],
    ['LVO?', L('Großgefäßverschluss lokalisieren', 'Localise large-vessel occlusion', 'تعیین محل انسداد عروق بزرگ'), 'vessel'],
    [L('Kern & Penumbra?', 'Core & penumbra?', 'هسته و پنومبرا؟'), L('Rettbares Gewebe beurteilen', 'Assess salvageable tissue', 'ارزیابی بافت قابل نجات'), 'chart'],
    [L('Teamentscheidung', 'Team decision', 'تصمیم تیمی'), L('Befunde priorisieren und kommunizieren', 'Prioritise and communicate findings', 'اولویت‌بندی و انتقال یافته‌ها'), 'decision'],
  ],
  warningTitle: L('Nicht an einer unauffälligen NCCT hängen bleiben', 'Do not stop at a normal NCCT', 'در NCCT طبیعی متوقف نشوید'),
  warningText: L(
    'Eine frühe Ischämie kann in der NCCT noch subtil sein. Bei passender Klinik die Gefäßbildgebung ohne unnötige Verzögerung fortsetzen.',
    'Early ischaemia may still be subtle on NCCT. When the clinical picture fits, continue vascular imaging without unnecessary delay.',
    'ایسکمی اولیه ممکن است در NCCT هنوز ظریف باشد. در صورت تطابق بالینی، تصویربرداری عروقی را بدون تأخیر غیرضروری ادامه دهید.'
  ),
}

const INTERACTIVE_FINDINGS = [
  {
    id: 'density',
    label: L('Dichte', 'Density', 'دانسیته'),
    title: L('Seitenvergleich zuerst', 'Start with side-to-side comparison', 'ابتدا دو سمت را مقایسه کنید'),
    text: L('Eine diskrete Hypodensität kann das früheste Parenchymzeichen sein. Vergleiche Kortex und Basalganglien konsequent mit der Gegenseite.', 'Subtle low attenuation may be the earliest parenchymal sign. Compare cortex and basal ganglia systematically with the opposite side.', 'هیپودنسیتی ظریف می‌تواند نخستین علامت پارانشیمی باشد. کورتکس و عقده‌های قاعده‌ای را منظم با سمت مقابل مقایسه کنید.'),
    marker: { insetInlineStart: '70%', top: '47%' },
  },
  {
    id: 'insula',
    label: L('Insula', 'Insula', 'اینسولا'),
    title: L('Insular ribbon verfolgen', 'Trace the insular ribbon', 'نوار اینسولا را دنبال کنید'),
    text: L('Der Verlust der scharfen Mark-Rinden-Grenze an der Insula ist ein klassisches Frühzeichen im MCA-Territorium.', 'Loss of the sharp grey–white interface at the insula is a classic early sign in the MCA territory.', 'از بین رفتن مرز واضح ماده خاکستری و سفید در اینسولا یک علامت کلاسیک اولیه در قلمرو MCA است.'),
    marker: { insetInlineStart: '77%', top: '42%' },
  },
  {
    id: 'sulci',
    label: L('Sulci', 'Sulci', 'سولکوس‌ها'),
    title: L('Sulcusverstrich aktiv suchen', 'Actively look for sulcal effacement', 'محو شدن سولکوس‌ها را فعالانه بررسی کنید'),
    text: L('Frühes zytotoxisches Ödem vermindert die Abgrenzbarkeit kortikaler Sulci. Nutze ein enges Hirnfenster und bleibe symmetrisch.', 'Early cytotoxic oedema reduces the visibility of cortical sulci. Use a narrow brain window and keep the comparison symmetric.', 'ادم سیتوتوکسیک اولیه وضوح سولکوس‌های قشری را کم می‌کند. از پنجره باریک مغزی و مقایسه متقارن استفاده کنید.'),
    marker: { insetInlineStart: '79%', top: '31%' },
  },
]

const INTERACTIVE_TABLE = [
  [L('Dichte', 'Density', 'دانسیته'), L('Kortex und Basalganglien', 'Cortex and basal ganglia', 'کورتکس و عقده‌های قاعده‌ای'), L('Hypodensität oder Verlust der Grau-Weiß-Differenzierung', 'Low attenuation or loss of grey–white differentiation', 'هیپودنسیتی یا از بین رفتن تفکیک خاکستری–سفید')],
  [L('Insula', 'Insula', 'اینسولا'), L('Insular ribbon', 'Insular ribbon', 'نوار اینسولا'), L('Frühes MCA-Territoriumzeichen', 'Early MCA-territory sign', 'علامت اولیه قلمرو MCA')],
  [L('Sulci', 'Sulci', 'سولکوس‌ها'), L('Konvexität und Sylvische Fissur', 'Convexity and Sylvian fissure', 'کانوکسیتی و شیار سیلوین'), L('Lokales Ödem und beginnende Raumforderung', 'Local oedema and early mass effect', 'ادم موضعی و اثر فشاری اولیه')],
]

const LESSON_CONTENT = {
  'take-home': {
    points: [
      {
        title: L('Blutung zuerst ausschließen.', 'Exclude haemorrhage first.', 'ابتدا خونریزی را رد کنید.'),
        detail: L('Die NCCT beantwortet zuerst die Sicherheitsfrage. Suche systematisch in Parenchym, Ventrikeln und Subarachnoidalräumen, bevor du Frühzeichen der Ischämie bewertest.', 'NCCT answers the safety question first. Review the parenchyma, ventricles, and subarachnoid spaces systematically before assessing early ischaemic signs.', 'NCCT ابتدا به پرسش ایمنی پاسخ می‌دهد. پیش از بررسی علائم اولیه ایسکمی، پارانشیم، بطن‌ها و فضاهای ساب‌آراکنوئید را منظم ارزیابی کنید.'),
      },
      {
        title: L('LVO in der CTA exakt lokalisieren.', 'Localise the LVO precisely on CTA.', 'محل LVO را در CTA دقیق مشخص کنید.'),
        detail: L('Benenne Seite und Segment, prüfe den Gefäßweg auf Tandemläsion oder Dissektion und ordne die distale Füllung im klinischen Kontext ein.', 'Name the side and segment, inspect the access route for tandem lesions or dissection, and interpret distal filling in clinical context.', 'سمت و سگمان را مشخص کنید، مسیر عروقی را از نظر ضایعه تاندوم یا دیسکسیون بررسی کرده و پرشدگی دیستال را در زمینه بالینی تفسیر کنید.'),
      },
      {
        title: L('Frühzeichen immer im Seitenvergleich lesen.', 'Read early signs with side-to-side comparison.', 'علائم اولیه را همیشه با مقایسه دو سمت بخوانید.'),
        detail: L('Achte besonders auf Dichteunterschiede, Insular ribbon, Basalganglien und Sulcusverstrich. Eine unauffällige NCCT schließt eine frühe Ischämie nicht aus.', 'Focus on attenuation differences, the insular ribbon, basal ganglia, and sulcal effacement. A normal NCCT does not exclude early ischaemia.', 'به تفاوت دانسیته، نوار اینسولا، عقده‌های قاعده‌ای و محوشدن سولکوس‌ها توجه کنید. NCCT طبیعی ایسکمی اولیه را رد نمی‌کند.'),
      },
      {
        title: L('Mit einer klaren Handlungsbotschaft enden.', 'End with a clear action message.', 'با یک پیام عملی روشن پایان دهید.'),
        detail: L('Der Akutbefund komprimiert Blutung, Parenchym, Verschlusshöhe und gegebenenfalls Perfusion auf wenige entscheidungsrelevante Sätze – inklusive unmittelbarer Kommunikation kritischer Befunde.', 'The acute report compresses haemorrhage, parenchyma, occlusion level, and when relevant perfusion into a few decision-focused sentences, including immediate communication of critical findings.', 'گزارش حاد باید خونریزی، پارانشیم، سطح انسداد و در صورت نیاز پرفیوژن را در چند جمله تصمیم‌ساز خلاصه کند و یافته بحرانی فوراً منتقل شود.'),
      },
    ],
  },
}

const LESSON_SOURCES = [
  {
    title: L('AWMF-Leitlinie: Akuttherapie des ischämischen Schlaganfalls', 'AWMF guideline: Acute treatment of ischaemic stroke', 'راهنمای AWMF: درمان حاد سکته ایسکمیک'),
    meta: L('S2e · Reg.-Nr. 030-046 · Version 5.1', 'S2e · Registration no. 030-046 · Version 5.1', 'S2e · شماره ثبت 030-046 · نسخه 5.1'),
    url: 'https://register.awmf.org/assets/guidelines/030-046l_S2e_Akuttherapie-des-ischaemischen-Schlaganfalls_2022-11-verlaengert.pdf',
  },
  {
    title: L('AHA/ASA Guideline: Early Management of Acute Ischemic Stroke', 'AHA/ASA guideline: Early management of acute ischaemic stroke', 'راهنمای AHA/ASA: مدیریت اولیه سکته ایسکمیک حاد'),
    meta: L('American Heart Association · 2026', 'American Heart Association · 2026', 'انجمن قلب آمریکا · ۲۰۲۶'),
    url: 'https://professional.heart.org/en/guidelines-statements/2026-guideline-for-the-early-management-of-patients-with-acute-ischemic-strokestr0000000000000513',
  },
  {
    title: L('Radiopaedia-Fall: Wandhämatom der rechten ACI', 'Radiopaedia case: Right ICA mural haematoma', 'کیس Radiopaedia: هماتوم دیواره‌ای ICA راست'),
    meta: 'Ian Bickle · Radiopaedia.org',
    url: 'https://radiopaedia.org/cases/28441',
  },
]

const RADIOPAEDIA_CASE = {
  // Twenty consecutive frames around the relevant portion of the original
  // 40-frame T1 fat-sat stack: smoother anatomy without loading the full study.
  frames: Array.from({ length: 20 }, (_, index) => `/andarun/test/case-28441-20/${String(index + 1).padStart(2, '0')}.jpg`),
  initialFrame: 10,
  url: 'https://radiopaedia.org/cases/28441/studies/28689?lang=us',
  title: L('Dissektion der rechten A. carotis interna', 'Right internal carotid artery dissection', 'دیسکسیون شریان کاروتید داخلی راست'),
  findings: [
    L('Sichelförmig hyperintenses Signal in der Wand der rechten ACI', 'Crescent-shaped hyperintense signal in the wall of the right ICA', 'سیگنال پرشدت هلالی‌شکل در دیواره ICA راست'),
    L('Asymmetrische Wandverdickung mit eingeengtem, signalarmem Restlumen', 'Asymmetric wall thickening with a narrowed, low-signal residual lumen', 'ضخیم‌شدگی نامتقارن دیواره همراه با تنگی لومن باقی‌مانده با سیگنال پایین'),
  ],
  interpretation: L(
    'Das T1-hyperintense Wandhämatom erzeugt das typische Crescent sign und stützt die Diagnose einer arteriellen Dissektion.',
    'The T1-hyperintense mural haematoma creates the typical crescent sign and supports the diagnosis of arterial dissection.',
    'هماتوم دیواره‌ای پرسیگنال در T1 علامت هلالی تیپیک را ایجاد می‌کند و تشخیص دیسکسیون شریانی را تقویت می‌کند.'
  ),
  alt: L('Axiale T1-Fat-Sat-MRT bei Dissektion der rechten ACI', 'Axial T1 fat-saturated MRI in right ICA dissection', 'MRI آگزیال T1 با اشباع چربی در دیسکسیون ICA راست'),
  credit: 'Case courtesy of Ian Bickle, Radiopaedia.org · CC BY-NC-SA 3.0',
}

function Icon({ name, className = '' }) {
  const paths = {
    brain: <><path d="M12 5.3a3.4 3.4 0 0 0-6.1 2.1A3.5 3.5 0 0 0 4 13.8a3.8 3.8 0 0 0 4 4.9c1.1 0 2.1-.5 2.7-1.2V6.8A2.9 2.9 0 0 0 8.2 4c-1 0-1.8.5-2.3 1.3"/><path d="M12 5.3a3.4 3.4 0 0 1 6.1 2.1 3.5 3.5 0 0 1 1.9 6.4 3.8 3.8 0 0 1-4 4.9c-1.1 0-2.1-.5-2.7-1.2V6.8A2.9 2.9 0 0 1 15.8 4c1 0 1.8.5 2.3 1.3"/><path d="M7.2 9.2c1 .1 1.8.8 1.9 1.8M16.8 9.2c-1 .1-1.8.8-1.9 1.8M7.5 15.2c.8-.7 1.6-.9 2.4-.7M16.5 15.2c-.8-.7-1.6-.9-2.4-.7"/></>,
    scan: <><circle cx="10.5" cy="10.5" r="5.5"/><path d="m15 15 4.5 4.5M3.5 10.5h2M10.5 3.5v2"/></>,
    vessel: <><path d="M12 21V11M12 11 7 6M12 11l5-5M7 6V3M17 6V3M8.5 14.5 5 18v3M15.5 14.5 19 18v3"/><circle cx="12" cy="10.5" r="1.2"/></>,
    chart: <><path d="M4 20V9M10 20V4M16 20v-7M22 20H2"/><path d="m3 6 5 2 5-4 6 3"/></>,
    decision: <><circle cx="8" cy="7" r="2.2"/><circle cx="16" cy="7" r="2.2"/><path d="M3.5 19v-2.2A3.8 3.8 0 0 1 7.3 13h1.4a3.8 3.8 0 0 1 3.8 3.8V19M12.5 19v-2.2A3.8 3.8 0 0 1 16.3 13h.4a3.8 3.8 0 0 1 3.8 3.8V19"/></>,
    case: <><path d="M6 4h12v16H6zM9 4V2h6v2M9 9h6M9 13h6M9 17h4"/></>,
    quiz: <><rect x="3.5" y="3.5" width="17" height="17" rx="2.5"/><path d="M7.2 9.1a2 2 0 1 1 2.8 1.8c-.9.4-1.4.9-1.4 1.8"/><circle cx="8.6" cy="16" r=".55" fill="currentColor" stroke="none"/><path d="M13.5 8.5h3.5M13.5 12h3.5M13.5 15.5h2.5"/></>,
    flashcards: <><rect x="7" y="5" width="13" height="15" rx="2"/><path d="M7 18H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2"/><path d="M10 9h7M10 13h5"/></>,
    check: <><path d="m5 12 4 4L19 6"/><circle cx="12" cy="12" r="9"/></>,
    spark: <><path d="M12 2l1.5 5.1L19 9l-5.5 1.9L12 16l-1.5-5.1L5 9l5.5-1.9z"/><path d="m18.5 15 .8 2.7L22 18.5l-2.7.8-.8 2.7-.8-2.7-2.7-.8 2.7-.8z"/></>,
    bookmark: <><path d="M6 3.5h12v17l-6-3.8-6 3.8z"/><path d="M9 8h6M9 11.5h4"/></>,
    external: <><path d="M14 4h6v6M20 4l-9 9"/><path d="M18 13v6H5V6h6"/></>,
    previous: <><path d="m14.5 6-6 6 6 6"/></>,
    next: <><path d="m9.5 6 6 6-6 6"/></>,
    layers: <><path d="m12 3 9 5-9 5-9-5z"/><path d="m3 12 9 5 9-5M3 16l9 5 9-5"/></>,
  }
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}

function Section({ section, lang, open, isRead, onToggle, onReadToggle, children }) {
  return <section id={section.id} className={`${styles.section} ${open ? styles.sectionOpen : ''} ${section.emphasis ? styles.takeHomeSection : ''}`}>
    <button type="button" className={styles.sectionHeader} aria-expanded={open} aria-controls={`${section.id}-panel`} onClick={() => onToggle(section.id)}>
      <span className={styles.sectionIcon}><Icon name={section.icon} /></span>
      <span><strong>{pick(section.title, lang)}</strong></span>
      <span className={styles.toggle} aria-hidden="true">{open ? '−' : '+'}</span>
    </button>
    <div id={`${section.id}-panel`} hidden={!open} className={styles.sectionBody}>
      {children}
      {!section.emphasis ? <button type="button" className={`${styles.readButton} ${isRead ? styles.readButtonDone : ''}`} aria-pressed={isRead} onClick={() => onReadToggle(section.id)}><Icon name="check" />{pick(isRead ? COPY.completed : COPY.complete, lang)}</button> : null}
    </div>
  </section>
}

function StartSection({ lang }) {
  return <>
    <p className={styles.lead}>{pick(COPY.intro, lang)}</p>
    <ol className={styles.workflow}>
      {COPY.workflow.map(([title, text, icon], index) => <li key={pick(title, lang)}><span className={styles.stepIcon}><Icon name={icon} /></span><span className={styles.stepNumber}>{index + 1}</span><strong>{pick(title, lang)}</strong><p>{pick(text, lang)}</p></li>)}
    </ol>
    <aside className={styles.warning}><span className={styles.calloutLabel}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3L2 21h20z M12 9v5 M12 17v1" /></svg>{pick(L('Cave', 'Caution', 'احتیاط'), lang)}</span><div className={styles.calloutBody}><strong>{pick(COPY.warningTitle, lang)}</strong><p>{pick(COPY.warningText, lang)}</p></div></aside>
    <RadiopaediaFile lang={lang} caseData={RADIOPAEDIA_CASE} />
  </>
}

function RememberNote({ lang, children }) {
  return <aside className={styles.rememberNote}><span className={styles.calloutLabel}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3a6 6 0 0 0-4 10c1 1 1 2 1 4h6c0-2 0-3 1-4a6 6 0 0 0-4-10z M9 21h6" /></svg>{pick(L('Merke', 'Remember', 'به‌خاطر بسپار'), lang)}</span><div className={styles.calloutBody}>{children}</div></aside>
}

function InteractiveLesson({ lang }) {
  const [activeId, setActiveId] = useState(INTERACTIVE_FINDINGS[0].id)
  const activeFinding = INTERACTIVE_FINDINGS.find(finding => finding.id === activeId) || INTERACTIVE_FINDINGS[0]

  return <div className={styles.interactiveModule}>
    <header className={styles.interactiveIntro}>
      <span>{pick(L('INTERAKTIVES LERNMUSTER', 'INTERACTIVE LEARNING PATTERN', 'الگوی آموزش تعاملی'), lang)}</span>
      <h3>{pick(L('Frühzeichen in der NCCT systematisch lesen', 'Read early NCCT signs systematically', 'خواندن نظام‌مند علائم اولیه در NCCT'), lang)}</h3>
      <p>{pick(L('Wähle einen Fokus. Markierung, Erklärung und Tabellenzeile bilden gemeinsam eine wiederverwendbare Lerneinheit.', 'Choose a focus. The marker, explanation, and table row form one reusable learning unit.', 'یک محور را انتخاب کنید. نشانگر، توضیح و ردیف جدول با هم یک واحد آموزشی قابل‌استفادهٔ مجدد می‌سازند.'), lang)}</p>
    </header>

    <div className={styles.findingTabs} role="tablist" aria-label={pick(L('Bildfokus wählen', 'Choose image focus', 'انتخاب محور تصویر'), lang)}>
      {INTERACTIVE_FINDINGS.map(finding => <button type="button" role="tab" id={`finding-tab-${finding.id}`} aria-controls="finding-explanation" key={finding.id} aria-selected={activeId === finding.id} className={activeId === finding.id ? styles.findingTabActive : ''} onClick={() => setActiveId(finding.id)}><span aria-hidden="true" />{pick(finding.label, lang)}</button>)}
    </div>

    <div className={styles.interactiveStage}>
      <figure className={styles.teachingImage}>
        <Image src="/stroke/case-left-mca-ct-rid-78956.png" alt={pick(L('Axiale NCCT mit frühem ischämischem Zeichen im linken MCA-Territorium', 'Axial NCCT with an early ischaemic sign in the left MCA territory', 'NCCT آگزیال با علامت اولیه ایسکمیک در قلمرو MCA چپ'), lang)} width={512} height={512} />
        <span className={styles.imageMarker} style={activeFinding.marker} aria-hidden="true"><i /></span>
        <figcaption>{pick(L('Markierung wechselt mit dem gewählten Lernfokus.', 'The marker follows the selected learning focus.', 'نشانگر با محور آموزشی انتخاب‌شده تغییر می‌کند.'), lang)}</figcaption>
      </figure>
      <article id="finding-explanation" className={styles.findingExplanation} role="tabpanel" aria-labelledby={`finding-tab-${activeId}`}>
        <small>{pick(activeFinding.label, lang)}</small>
        <h4>{pick(activeFinding.title, lang)}</h4>
        <p>{pick(activeFinding.text, lang)}</p>
        <aside><Icon name="check" /><span>{pick(L('Immer Seite für Seite vergleichen und den Befund mit der Klinik abgleichen.', 'Always compare side to side and correlate the finding with the clinical picture.', 'همیشه دو سمت را مقایسه و یافته را با تابلوی بالینی تطبیق دهید.'), lang)}</span></aside>
      </article>
    </div>

  </div>
}

function TableLesson({ lang }) {
  return <>
    <div className={styles.tableLesson}>
      <header className={styles.tableIntro}>
        <h3>{pick(L('Frühe NCCT-Zeichen kompakt vergleichen', 'Compare early NCCT signs at a glance', 'مقایسه فشرده علائم اولیه NCCT'), lang)}</h3>
        <p>{pick(L('Tabellen eignen sich für klar abgrenzbare Vergleichskriterien. Eine kurze Einleitung erklärt zuerst, wie die Tabelle gelesen und im Befund angewendet werden soll.', 'Tables work best for clearly separated comparison criteria. A short introduction first explains how to read the table and apply it in reporting.', 'جدول برای معیارهای مقایسه‌ای مشخص مناسب است. ابتدا یک توضیح کوتاه روشن می‌کند جدول چگونه خوانده و در گزارش استفاده شود.'), lang)}</p>
        <p className={styles.tableUsage}><strong>{pick(L('So lesen:', 'How to read it:', 'روش خواندن:'), lang)}</strong> {pick(L('Fokus wählen, den anatomischen Prüfort aufsuchen und die Bedeutung anschließend in den klinischen Kontext setzen.', 'Choose the focus, inspect the anatomical location, then place its meaning in the clinical context.', 'محور را انتخاب کنید، محل آناتومیک را بررسی کنید و سپس مفهوم آن را در زمینه بالینی قرار دهید.'), lang)}</p>
      </header>
      <div className={styles.teachingTableWrap}>
        <table className={styles.teachingTable}>
          <caption>{pick(L('Standardtabelle für frühe NCCT-Zeichen', 'Standard table for early NCCT signs', 'جدول استاندارد علائم اولیه NCCT'), lang)}</caption>
          <thead><tr><th>{pick(L('Fokus', 'Focus', 'محور'), lang)}</th><th>{pick(L('Prüfort', 'Where to look', 'محل بررسی'), lang)}</th><th>{pick(L('Bedeutung', 'Meaning', 'معنی'), lang)}</th></tr></thead>
          <tbody>{INTERACTIVE_TABLE.map(row => <tr key={pick(row[0], lang)}>{row.map(cell => <td key={pick(cell, lang)}>{pick(cell, lang)}</td>)}</tr>)}</tbody>
        </table>
      </div>
    </div>
    <RememberNote lang={lang}>{pick(L('Im Akutbefund die entscheidenden Punkte in derselben Reihenfolge nennen: Blutung, Frühischämie, Verschlusshöhe und unmittelbare therapeutische Konsequenz.', 'Keep the acute report in a fixed decision-focused order: haemorrhage, early ischaemia, occlusion level, and the immediate therapeutic consequence.', 'در گزارش حاد، نکات تصمیم‌ساز را همیشه با ترتیب ثابت بیان کنید: خونریزی، ایسکمی اولیه، سطح انسداد و پیامد درمانی فوری.'), lang)}</RememberNote>
  </>
}

function TakeHomeSummary({ lang }) {
  const [openItems, setOpenItems] = useState(() => new Set())
  const toggleItem = index => setOpenItems(previous => {
    const next = new Set(previous)
    if (next.has(index)) next.delete(index)
    else next.add(index)
    return next
  })

  return <ol className={styles.takeHome}>{LESSON_CONTENT['take-home'].points.map((point, index) => {
    const open = openItems.has(index)
    return <li key={pick(point.title, lang)} className={open ? styles.takeHomeItemOpen : ''}>
      <button type="button" aria-expanded={open} aria-controls={`take-home-detail-${index}`} onClick={() => toggleItem(index)}><span className={styles.takeHomePriority}>{String(index + 1).padStart(2, '0')}</span><strong>{pick(point.title, lang)}</strong><i aria-hidden="true">{open ? '−' : '+'}</i></button>
      <div id={`take-home-detail-${index}`} hidden={!open} className={styles.takeHomeDetail}><p>{pick(point.detail, lang)}</p></div>
    </li>
  })}</ol>
}

function LessonSources({ lang }) {
  const [open, setOpen] = useState(false)

  return <aside className={styles.sources}>
    <button type="button" className={styles.sourcesToggle} aria-expanded={open} aria-controls="lesson-sources" onClick={() => setOpen(value => !value)}><span>{pick(L('Quellen', 'Sources', 'منابع'), lang)}</span><i aria-hidden="true">{open ? '−' : '+'}</i></button>
    <div id="lesson-sources" className={styles.sourcesPanel} hidden={!open}>
      <ul>{LESSON_SOURCES.map(source => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer"><span><strong>{pick(source.title, lang)}</strong><small>{pick(source.meta, lang)}</small></span><Icon name="external" /></a></li>)}</ul>
    </div>
  </aside>
}

function ContentSection({ id, lang }) {
  if (id === 'meniscus-text') return <MeniscusTextLesson lang={lang} />
  if (id === 'interactive') return <InteractiveLesson lang={lang} />
  if (id === 'table') return <TableLesson lang={lang} />
  return <TakeHomeSummary lang={lang} />
}

function MobileLearningPath({ lang, openId, readSections, onSelect }) {
  const [panelOpen, setPanelOpen] = useState(false)
  const activeSection = SECTION_COPY.find(section => section.id === openId) || SECTION_COPY[0]
  const progress = (readSections.size / TRACKED_SECTION_IDS.length) * 360
  const selectFromPanel = id => { onSelect(id); setPanelOpen(false) }

  return <div className={styles.mobileLearningPath}>
    {panelOpen ? <section id="mobile-learning-path-panel" className={styles.mobilePathPanel} role="dialog" aria-label={pick(COPY.path, lang)}>
      <header><div><small>{pick(COPY.progress, lang)}</small><strong>{readSections.size} / {TRACKED_SECTION_IDS.length}</strong></div><button type="button" onClick={() => setPanelOpen(false)} aria-label={pick(COPY.close, lang)}>×</button></header>
      <nav>{PATH_SECTIONS.map(section => <button type="button" key={section.id} className={openId === section.id ? styles.mobilePathCurrent : ''} onClick={() => selectFromPanel(section.id)} aria-current={openId === section.id ? 'location' : undefined}><span className={styles.mobilePathItemIcon}><Icon name={section.icon} /></span><span><strong>{pick(section.title, lang)}</strong></span><i aria-hidden="true">{readSections.has(section.id) ? '✓' : ''}</i></button>)}</nav>
    </section> : null}
    <button type="button" className={styles.mobilePathButton} onClick={() => setPanelOpen(value => !value)} aria-expanded={panelOpen} aria-controls="mobile-learning-path-panel"><span className={styles.mobileProgressRing} style={{ '--mobile-progress': `${progress}deg` }}><b>{readSections.size}</b><small>/{TRACKED_SECTION_IDS.length}</small></span><span className={styles.mobileCurrentIcon}><Icon name={activeSection.icon} /></span><span className={styles.mobilePathLabel}><strong>{pick(COPY.path, lang)}</strong><small>{pick(activeSection.title, lang)}</small></span></button>
  </div>
}

export default function TestLearningPage() {
  const { lang } = useLanguage()
  const [openId, setOpenId] = useState('start')
  const [summaryOpen, setSummaryOpen] = useState(false)
  const [readSections, setReadSections] = usePersistedSectionProgress('andarun-test', TRACKED_SECTION_IDS)
  const activeIndex = useMemo(() => Math.max(0, PATH_SECTIONS.findIndex(section => section.id === openId)), [openId])

  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (hash === 'take-home') setSummaryOpen(true)
    else if (TRACKED_SECTION_IDS.includes(hash)) setOpenId(hash)
  }, [])

  const selectSection = id => {
    if (!TRACKED_SECTION_IDS.includes(id)) return
    setOpenId(id)
    replaceLessonHash(id)
    scrollToLessonSection(id)
  }
  const openSummary = () => {
    setSummaryOpen(true)
    replaceLessonHash('take-home')
    scrollToLessonSection('take-home')
  }
  const toggleSummary = () => {
    setSummaryOpen(previous => {
      const next = !previous
      replaceLessonHash(next ? 'take-home' : openId)
      if (next) scrollToLessonSection('take-home')
      return next
    })
  }
  const advance = () => selectSection(PATH_SECTIONS[Math.min(activeIndex + 1, PATH_SECTIONS.length - 1)].id)
  const toggleSectionRead = id => setReadSections(previous => { const next = new Set(previous); if (next.has(id)) next.delete(id); else next.add(id); return next })
  const lessonComplete = readSections.size === TRACKED_SECTION_IDS.length
  const toggleLessonComplete = () => setReadSections(lessonComplete ? new Set() : new Set(TRACKED_SECTION_IDS))
  // Template-only CTAs: real lesson pages must replace these two inert buttons
  // with lesson-specific Links to the matching MCQ and flashcard routes.

  return <main className={styles.page} dir={lang === 'fa' ? 'rtl' : 'ltr'} lang={lang}>
    <header className={styles.header}>
      <div className={styles.topline}><nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">RadYar</Link><span>/</span><Link href="/andarun">Andarun</Link><span>/</span><strong>Test</strong></nav><span className={styles.author}>Dr. Zia</span></div>
      <div className={styles.hero}>
        <div className={styles.heroCopy}><h1>{pick(COPY.title, lang)}</h1></div>
        <div className={styles.heroVisual} aria-hidden="true" />
      </div>
      <div className={styles.actions}><button type="button" className={styles.takeHomeJump} onClick={openSummary}><Icon name="spark" />{pick(COPY.jumpToSummary, lang)}<span aria-hidden="true">↓</span></button><button type="button" className={`${styles.primaryAction} ${styles.demoAction}`} aria-disabled="true" data-template-target="lesson-mcq"><Icon name="quiz" />{pick(COPY.mcq, lang)}<span aria-hidden="true">→</span></button><button type="button" className={`${styles.secondaryAction} ${styles.demoAction}`} aria-disabled="true" data-template-target="lesson-flashcards"><Icon name="flashcards" />{pick(COPY.flashcards, lang)}</button></div>
      <div className={styles.progressBar}><div className={styles.progressTrack} role="progressbar" aria-label={pick(COPY.progress, lang)} aria-valuemin={0} aria-valuemax={TRACKED_SECTION_IDS.length} aria-valuenow={readSections.size}><i style={{ width: `${(readSections.size / TRACKED_SECTION_IDS.length) * 100}%` }} /></div><span>{readSections.size} / {TRACKED_SECTION_IDS.length} {pick(COPY.progress, lang)}</span><div className={styles.progressActions}><button type="button" className={styles.continueButton} onClick={advance} disabled={activeIndex === PATH_SECTIONS.length - 1}>{pick(COPY.continue, lang)}<span aria-hidden="true">→</span></button><button type="button" className={`${styles.lessonCompleteButton} ${lessonComplete ? styles.lessonCompleteButtonDone : ''}`} aria-pressed={lessonComplete} onClick={toggleLessonComplete}><Icon name="check" />{pick(lessonComplete ? COPY.lessonCompleted : COPY.completeLesson, lang)}</button></div></div>
    </header>

    <div className={styles.layout}>
      <aside className={styles.sidebar}><h2>{pick(COPY.path, lang)}</h2><nav>{PATH_SECTIONS.map(section => <button type="button" key={section.id} className={openId === section.id ? styles.activeSideItem : ''} onClick={() => selectSection(section.id)} aria-current={openId === section.id ? 'location' : undefined} aria-label={`${pick(COPY.open, lang)}: ${pick(section.title, lang)}`}><span className={styles.sideIcon}><Icon name={section.icon} /></span><strong>{pick(section.title, lang)}</strong></button>)}</nav></aside>
      <article className={styles.lesson}>{SECTION_COPY.map(section => <Section key={section.id} section={section} lang={lang} open={section.emphasis ? summaryOpen : openId === section.id} isRead={readSections.has(section.id)} onToggle={section.emphasis ? toggleSummary : selectSection} onReadToggle={toggleSectionRead}>{section.id === 'start' ? <StartSection lang={lang} /> : <ContentSection id={section.id} lang={lang} />}</Section>)}<LessonSources lang={lang} /></article>
    </div>
    <MobileLearningPath lang={lang} openId={openId} readSections={readSections} onSelect={selectSection} />
  </main>
}
