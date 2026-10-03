'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import { usePersistedSectionProgress } from '@/hooks/usePersistedSectionProgress'
import styles from './page.module.css'

const L = (de, en, fa) => ({ de, en, fa })
const pick = (value, lang) => typeof value === 'string' ? value : value[lang] || value.de

const SECTION_COPY = [
  { id: 'start', title: L('Der 5-Minuten-Workflow', 'The five-minute workflow', 'روند پنج‌دقیقه‌ای'), icon: 'brain' },
  { id: 'interactive', title: L('Interaktive Bildanalyse', 'Interactive image review', 'تحلیل تعاملی تصویر'), icon: 'scan' },
  { id: 'fall', title: L('Radiopaedia-Fall', 'Radiopaedia case', 'کیس Radiopaedia'), icon: 'case' },
  { id: 'take-home', title: 'Take Home Message', icon: 'spark', emphasis: true },
]

const SECTION_IDS = SECTION_COPY.map(section => section.id)
const PATH_SECTIONS = SECTION_COPY.filter(section => !section.emphasis)

const COPY = {
  title: L('Akuter ischämischer Schlaganfall', 'Acute ischaemic stroke', 'سکته ایسکمیک حاد'),
  mcq: L('MCQ starten', 'Start MCQs', 'شروع MCQ'),
  flashcards: L('Flashcards', 'Flashcards', 'فلش‌کارت‌ها'),
  path: L('Lernpfad', 'Learning path', 'مسیر یادگیری'),
  jumpToSummary: L('Take Home Message', 'Take Home Message', 'Take Home Message'),
  summaryHint: L('Direkt zur Zusammenfassung', 'Jump to the lesson summary', 'رفتن مستقیم به خلاصه درس'),
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
      L('NCCT: Blutung und frühe Parenchymzeichen.', 'NCCT: haemorrhage and early parenchymal signs.', 'NCCT: خونریزی و علائم اولیه پارانشیم.'),
      L('CTA: genaue Verschlusshöhe und Gefäßweg.', 'CTA: exact occlusion level and vascular route.', 'CTA: سطح دقیق انسداد و مسیر عروقی.'),
      L('CTP: nur technisch valide und im Kontext interpretieren.', 'CTP: interpret only when technically valid and in context.', 'CTP: فقط در صورت اعتبار فنی و در زمینه مناسب تفسیر شود.'),
      L('Der Befund endet mit einer klaren Handlungsbotschaft.', 'The report ends with a clear action message.', 'گزارش با یک پیام عملی روشن پایان می‌یابد.'),
    ],
  },
}

const RADIOPAEDIA_CASE = {
  frames: Array.from({ length: 20 }, (_, index) => `/dissection/case-58286/${String(index + 1).padStart(2, '0')}.png`),
  initialFrame: 9,
  url: 'https://radiopaedia.org/cases/58286',
  title: L('Dissektion der rechten ACI mit Pseudoaneurysma', 'Right ICA dissection with pseudoaneurysm', 'دیسکسیون ICA راست همراه با شبه‌آنوریسم'),
  text: L(
    'CTA-Sequenz einer rechtsseitigen ACI-Dissektion unterhalb der Schädelbasis mit medial projizierendem Pseudoaneurysma. Scrolle durch die Schichten und verfolge Gefäßkaliber und Kontur.',
    'CTA sequence of a right ICA dissection below the skull base with a medially projecting pseudoaneurysm. Scroll through the slices and follow the vessel calibre and contour.',
    'سکانس CTA از دیسکسیون ICA راست در زیر قاعده جمجمه همراه با شبه‌آنوریسم مدیال. در برش‌ها اسکرول کنید و قطر و کانتور رگ را دنبال کنید.'
  ),
  alt: L('Axiale CTA bei Dissektion der rechten ACI', 'Axial CTA in right ICA dissection', 'CTA آگزیال در دیسکسیون ICA راست'),
  credit: 'Case courtesy of Heather Pascoe, Radiopaedia.org · rID-58286 · CC BY-NC-SA 3.0',
}

function Icon({ name, className = '' }) {
  const paths = {
    brain: <><path d="M12 5.3a3.4 3.4 0 0 0-6.1 2.1A3.5 3.5 0 0 0 4 13.8a3.8 3.8 0 0 0 4 4.9c1.1 0 2.1-.5 2.7-1.2V6.8A2.9 2.9 0 0 0 8.2 4c-1 0-1.8.5-2.3 1.3"/><path d="M12 5.3a3.4 3.4 0 0 1 6.1 2.1 3.5 3.5 0 0 1 1.9 6.4 3.8 3.8 0 0 1-4 4.9c-1.1 0-2.1-.5-2.7-1.2V6.8A2.9 2.9 0 0 1 15.8 4c1 0 1.8.5 2.3 1.3"/><path d="M7.2 9.2c1 .1 1.8.8 1.9 1.8M16.8 9.2c-1 .1-1.8.8-1.9 1.8M7.5 15.2c.8-.7 1.6-.9 2.4-.7M16.5 15.2c-.8-.7-1.6-.9-2.4-.7"/></>,
    scan: <><circle cx="10.5" cy="10.5" r="5.5"/><path d="m15 15 4.5 4.5M3.5 10.5h2M10.5 3.5v2"/></>,
    vessel: <><path d="M12 21V11M12 11 7 6M12 11l5-5M7 6V3M17 6V3M8.5 14.5 5 18v3M15.5 14.5 19 18v3"/><circle cx="12" cy="10.5" r="1.2"/></>,
    chart: <><path d="M4 20V9M10 20V4M16 20v-7M22 20H2"/><path d="m3 6 5 2 5-4 6 3"/></>,
    decision: <><circle cx="8" cy="7" r="2.2"/><circle cx="16" cy="7" r="2.2"/><path d="M3.5 19v-2.2A3.8 3.8 0 0 1 7.3 13h1.4a3.8 3.8 0 0 1 3.8 3.8V19M12.5 19v-2.2A3.8 3.8 0 0 1 16.3 13h.4a3.8 3.8 0 0 1 3.8 3.8V19"/></>,
    case: <><path d="M6 4h12v16H6zM9 4V2h6v2M9 9h6M9 13h6M9 17h4"/></>,
    check: <><path d="m5 12 4 4L19 6"/><circle cx="12" cy="12" r="9"/></>,
    spark: <><path d="M12 2l1.5 5.1L19 9l-5.5 1.9L12 16l-1.5-5.1L5 9l5.5-1.9z"/><path d="m18.5 15 .8 2.7L22 18.5l-2.7.8-.8 2.7-.8-2.7-2.7-.8 2.7-.8z"/></>,
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
      <button type="button" className={`${styles.readButton} ${isRead ? styles.readButtonDone : ''}`} aria-pressed={isRead} onClick={() => onReadToggle(section.id)}><Icon name="check" />{pick(isRead ? COPY.completed : COPY.complete, lang)}</button>
    </div>
  </section>
}

function StartSection({ lang }) {
  return <>
    <p className={styles.lead}>{pick(COPY.intro, lang)}</p>
    <ol className={styles.workflow}>
      {COPY.workflow.map(([title, text, icon], index) => <li key={pick(title, lang)}><span className={styles.stepIcon}><Icon name={icon} /></span><span className={styles.stepNumber}>{index + 1}</span><strong>{pick(title, lang)}</strong><p>{pick(text, lang)}</p></li>)}
    </ol>
    <aside className={styles.warning}><span aria-hidden="true">!</span><div><strong>{pick(COPY.warningTitle, lang)}</strong><p>{pick(COPY.warningText, lang)}</p></div></aside>
  </>
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

    <div className={styles.teachingTableWrap}>
      <table className={styles.teachingTable}>
        <caption>{pick(L('Standardtabelle für frühe NCCT-Zeichen', 'Standard table for early NCCT signs', 'جدول استاندارد علائم اولیه NCCT'), lang)}</caption>
        <thead><tr><th>{pick(L('Fokus', 'Focus', 'محور'), lang)}</th><th>{pick(L('Prüfort', 'Where to look', 'محل بررسی'), lang)}</th><th>{pick(L('Bedeutung', 'Meaning', 'معنی'), lang)}</th></tr></thead>
        <tbody>{INTERACTIVE_TABLE.map((row, index) => <tr key={pick(row[0], lang)} className={INTERACTIVE_FINDINGS[index].id === activeId ? styles.activeTableRow : ''}>{row.map(cell => <td key={pick(cell, lang)}>{pick(cell, lang)}</td>)}</tr>)}</tbody>
      </table>
    </div>
  </div>
}

function CaseSequence({ lang }) {
  const { frames, initialFrame, url, alt } = RADIOPAEDIA_CASE
  const [frameIndex, setFrameIndex] = useState(initialFrame)
  const viewerRef = useRef(null)
  const touchStartRef = useRef(null)
  const moveFrame = useCallback(delta => {
    setFrameIndex(current => Math.min(frames.length - 1, Math.max(0, current + delta)))
  }, [frames.length])

  useEffect(() => {
    const viewer = viewerRef.current
    if (!viewer) return undefined
    const handleWheel = event => {
      const direction = event.deltaY > 0 ? 1 : -1
      const canMove = direction > 0 ? frameIndex < frames.length - 1 : frameIndex > 0
      if (!canMove) return
      event.preventDefault()
      moveFrame(direction)
    }
    viewer.addEventListener('wheel', handleWheel, { passive: false })
    return () => viewer.removeEventListener('wheel', handleWheel)
  }, [frameIndex, frames.length, moveFrame])

  useEffect(() => {
    ;[frameIndex - 1, frameIndex + 1].forEach(index => {
      if (!frames[index]) return
      const image = new window.Image()
      image.src = frames[index]
    })
  }, [frameIndex, frames])

  const labels = {
    previous: pick(L('Vorherige Schicht', 'Previous slice', 'برش قبلی'), lang),
    next: pick(L('Nächste Schicht', 'Next slice', 'برش بعدی'), lang),
    slider: pick(L('Schicht auswählen', 'Select slice', 'انتخاب برش'), lang),
    hint: pick(L('Scrollen, wischen oder Slider verwenden', 'Scroll, swipe, or use the slider', 'اسکرول کنید، بکشید یا از اسلایدر استفاده کنید'), lang),
    open: pick(L('Fall in Radiopaedia öffnen', 'Open case in Radiopaedia', 'باز کردن کیس در Radiopaedia'), lang),
  }

  const handleKeyDown = event => {
    if (['ArrowRight', 'ArrowDown'].includes(event.key)) moveFrame(1)
    else if (['ArrowLeft', 'ArrowUp'].includes(event.key)) moveFrame(-1)
    else return
    event.preventDefault()
  }

  const handleTouchStart = event => {
    if (event.target.closest('button, input')) return
    const touch = event.touches[0]
    touchStartRef.current = { x: touch.clientX, y: touch.clientY }
  }

  const handleTouchEnd = event => {
    const start = touchStartRef.current
    touchStartRef.current = null
    if (!start) return
    const touch = event.changedTouches[0]
    const deltaX = touch.clientX - start.x
    const deltaY = touch.clientY - start.y
    if (Math.abs(deltaX) >= 35 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) moveFrame(deltaX < 0 ? 1 : -1)
  }

  return <div ref={viewerRef} className={styles.caseSequence} tabIndex={0} onKeyDown={handleKeyDown} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} onTouchCancel={() => { touchStartRef.current = null }} aria-label={`${pick(alt, lang)} · ${labels.hint}`}>
    <a className={styles.caseImage} href={url} target="_blank" rel="noopener noreferrer" aria-label={labels.open}>
      <Image src={frames[frameIndex]} alt={pick(alt, lang)} width={512} height={512} priority={frameIndex === initialFrame} />
      <span className={styles.caseCounter}>{String(frameIndex + 1).padStart(2, '0')} / {frames.length}</span>
      <span className={styles.caseOpen}>{labels.open} ↗</span>
    </a>
    <div className={styles.caseControls}>
      <button type="button" onClick={() => moveFrame(-1)} disabled={frameIndex === 0} aria-label={labels.previous}>‹</button>
      <input type="range" min="0" max={frames.length - 1} value={frameIndex} onChange={event => setFrameIndex(Number(event.target.value))} aria-label={labels.slider} />
      <button type="button" onClick={() => moveFrame(1)} disabled={frameIndex === frames.length - 1} aria-label={labels.next}>›</button>
    </div>
    <small className={styles.caseHint}>↕ {labels.hint}</small>
  </div>
}

function RadiopaediaCase({ lang }) {
  return <article className={styles.caseStudy}>
    <CaseSequence lang={lang} />
    <div className={styles.caseBody}>
      <small>RADIOPAEDIA · rID 58286 · CTA SEQUENCE</small>
      <h3>{pick(RADIOPAEDIA_CASE.title, lang)}</h3>
      <p>{pick(RADIOPAEDIA_CASE.text, lang)}</p>
      <footer>{RADIOPAEDIA_CASE.credit}</footer>
    </div>
  </article>
}

function ContentSection({ id, lang }) {
  if (id === 'interactive') return <InteractiveLesson lang={lang} />
  if (id === 'fall') return <><p className={styles.lead}>{pick(L('Scrolle wie an der Workstation durch eine echte Bildsequenz und achte auf die Gefäßkontur.', 'Scroll through a real image sequence as you would at the workstation and follow the vessel contour.', 'مانند ورک‌استیشن در یک سکانس واقعی اسکرول کنید و کانتور رگ را دنبال کنید.'), lang)}</p><RadiopaediaCase lang={lang} /></>
  const content = LESSON_CONTENT['take-home']
  return <div className={styles.takeHomePanel}><header><Icon name="spark" /><h3>Take Home Message</h3></header><ul className={styles.takeHome}>{content.points.map(point => <li key={pick(point, lang)}><span aria-hidden="true"><Icon name="check" /></span><strong>{pick(point, lang)}</strong></li>)}</ul></div>
}

function MobileLearningPath({ lang, openId, readSections, onSelect }) {
  const [panelOpen, setPanelOpen] = useState(false)
  const activeSection = SECTION_COPY.find(section => section.id === openId) || SECTION_COPY[0]
  const progress = (readSections.size / SECTION_COPY.length) * 360
  const selectFromPanel = id => { onSelect(id); setPanelOpen(false) }

  return <div className={styles.mobileLearningPath}>
    {panelOpen ? <section id="mobile-learning-path-panel" className={styles.mobilePathPanel} role="dialog" aria-label={pick(COPY.path, lang)}>
      <header><div><small>{pick(COPY.progress, lang)}</small><strong>{readSections.size} / {SECTION_COPY.length}</strong></div><button type="button" onClick={() => setPanelOpen(false)} aria-label={pick(COPY.close, lang)}>×</button></header>
      <nav>{PATH_SECTIONS.map(section => <button type="button" key={section.id} className={openId === section.id ? styles.mobilePathCurrent : ''} onClick={() => selectFromPanel(section.id)} aria-current={openId === section.id ? 'location' : undefined}><span className={styles.mobilePathItemIcon}><Icon name={section.icon} /></span><span><strong>{pick(section.title, lang)}</strong></span><i aria-hidden="true">{readSections.has(section.id) ? '✓' : ''}</i></button>)}</nav>
    </section> : null}
    <button type="button" className={styles.mobilePathButton} onClick={() => setPanelOpen(value => !value)} aria-expanded={panelOpen} aria-controls="mobile-learning-path-panel"><span className={styles.mobileProgressRing} style={{ '--mobile-progress': `${progress}deg` }}><b>{readSections.size}</b><small>/{SECTION_COPY.length}</small></span><span className={styles.mobileCurrentIcon}><Icon name={activeSection.icon} /></span><span className={styles.mobilePathLabel}><strong>{pick(COPY.path, lang)}</strong><small>{pick(activeSection.title, lang)}</small></span></button>
  </div>
}

export default function TestLearningPage() {
  const { lang } = useLanguage()
  const [openId, setOpenId] = useState('start')
  const [readSections, setReadSections] = usePersistedSectionProgress('andarun-test', SECTION_IDS)
  const activeIndex = useMemo(() => Math.max(0, SECTION_COPY.findIndex(section => section.id === openId)), [openId])

  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (SECTION_IDS.includes(hash)) setOpenId(hash)
  }, [])

  const selectSection = id => {
    const nextId = openId === id ? null : id
    setOpenId(nextId)
    window.history.replaceState(null, '', nextId ? `#${nextId}` : window.location.pathname)
    if (nextId) requestAnimationFrame(() => document.getElementById(nextId)?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }
  const advance = () => selectSection(SECTION_COPY[Math.min(activeIndex + 1, SECTION_COPY.length - 1)].id)
  const toggleSectionRead = id => setReadSections(previous => { const next = new Set(previous); if (next.has(id)) next.delete(id); else next.add(id); return next })
  const lessonComplete = readSections.size === SECTION_COPY.length
  const toggleLessonComplete = () => setReadSections(lessonComplete ? new Set() : new Set(SECTION_IDS))

  return <main className={styles.page} dir={lang === 'fa' ? 'rtl' : 'ltr'} lang={lang}>
    <header className={styles.header}>
      <div className={styles.topline}><nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">RadYar</Link><span>/</span><Link href="/andarun">Andarun</Link><span>/</span><strong>Test</strong></nav><span className={styles.author}>Dr. Zia</span></div>
      <div className={styles.hero}><div className={styles.heroCopy}><h1>{pick(COPY.title, lang)}</h1><button type="button" className={styles.takeHomeJump} onClick={() => selectSection('take-home')}><span className={styles.takeHomeJumpIcon}><Icon name="spark" /></span><span><strong>{pick(COPY.jumpToSummary, lang)}</strong><small>{pick(COPY.summaryHint, lang)}</small></span><i aria-hidden="true">↓</i></button><div className={styles.actions}><Link className={styles.primaryAction} href="/ueben/quiz?fach=gehirn&n=10&themen=ischaemischer-schlaganfall&from=%2Fandarun%2Ftest">{pick(COPY.mcq, lang)}<span aria-hidden="true">→</span></Link><Link className={styles.secondaryAction} href="/flashcards/ischaemischer-schlaganfall"><Icon name="case" />{pick(COPY.flashcards, lang)}</Link></div></div></div>
      <div className={styles.progressBar}><div className={styles.progressTrack}><i style={{ width: `${(readSections.size / SECTION_COPY.length) * 100}%` }} /></div><span>{readSections.size} / {SECTION_COPY.length} {pick(COPY.progress, lang)}</span><div className={styles.progressActions}><button type="button" className={`${styles.lessonCompleteButton} ${lessonComplete ? styles.lessonCompleteButtonDone : ''}`} aria-pressed={lessonComplete} onClick={toggleLessonComplete}><Icon name="check" />{pick(lessonComplete ? COPY.lessonCompleted : COPY.completeLesson, lang)}</button><button type="button" className={styles.continueButton} onClick={advance} disabled={activeIndex === SECTION_COPY.length - 1}>{pick(COPY.continue, lang)}<span aria-hidden="true">→</span></button></div></div>
    </header>

    <div className={styles.layout}>
      <aside className={styles.sidebar}><h2>{pick(COPY.path, lang)}</h2><nav>{PATH_SECTIONS.map(section => <button type="button" key={section.id} className={openId === section.id ? styles.activeSideItem : ''} onClick={() => selectSection(section.id)} aria-current={openId === section.id ? 'location' : undefined} aria-label={`${pick(COPY.open, lang)}: ${pick(section.title, lang)}`}><span className={styles.sideIcon}><Icon name={section.icon} /></span><strong>{pick(section.title, lang)}</strong></button>)}</nav></aside>
      <article className={styles.lesson}>{SECTION_COPY.map(section => <Section key={section.id} section={section} lang={lang} open={openId === section.id} isRead={readSections.has(section.id)} onToggle={selectSection} onReadToggle={toggleSectionRead}>{section.id === 'start' ? <StartSection lang={lang} /> : <ContentSection id={section.id} lang={lang} />}</Section>)}</article>
    </div>
    <MobileLearningPath lang={lang} openId={openId} readSections={readSections} onSelect={selectSection} />
  </main>
}
