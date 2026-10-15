'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import { usePersistedSectionProgress } from '@/hooks/usePersistedSectionProgress'
import { useLessonSectionScroll } from '@/hooks/useLessonSectionScroll'
import { useLehrModeActive } from '@/hooks/useLehrModeActive'
import LessonHero from '@/components/LessonHero'
import LessonTakeHome from '@/components/LessonTakeHome'
import { TeachingGroup, TeachingGroups } from '@/components/lesson-template/InteractiveTeachingGroups'
import { MIGRAINE_CHAPTERS, MIGRAINE_TRACKED_IDS, MIGRAINE_PROGRESS_VERSION, MIGRAINE_TAKE_HOME, resolveMigraineChapter } from '@/data/migraineLayout'
import { migrateMigraineProgress } from '@/lib/migraineProgress.mjs'
import reference from '@/components/LessonTemplate.module.css'
import { MIGRAINE_TITLE, MIGRAINE_PATH, MIGRAINE_SECTIONS, MIGRAINE_SOURCES, MIGRAINE_CASES, MIGRAINE_QUIZ } from '@/data/migraine'
import styles from './page.module.css'
import { MriHotspots, AuraComparison, ProtocolTrainer, PracticalPearl } from './MigraineInteractive'

const L = (de, en, fa) => ({ de, en, fa })
const pick = (value, lang) => typeof value === 'string' ? value : value[lang] || value.de
const topic = id => MIGRAINE_SECTIONS.find(section => section.id === id)
const PATH_CHAPTERS = MIGRAINE_CHAPTERS.filter(chapter => !chapter.emphasis)
const PROGRESS_KEY = `radyar-lesson-sections:${MIGRAINE_PROGRESS_VERSION}`
function migrateStoredProgress(saved) {
  if (window.localStorage.getItem(PROGRESS_KEY) !== null) return saved
  try { return migrateMigraineProgress(JSON.parse(window.localStorage.getItem('radyar-lesson-sections:migraene') || '[]')) } catch { return [] }
}
const COPY = {
  head: L('Kopf', 'Head', 'سر'), chapter: L('Kopfschmerz', 'Headache', 'سردرد'),
  subtitle: L('Eine radiologische Lektion über die richtige Indikation, aussagekräftige MRT-Befunde und die Grenzen der Bildgebung.', 'A radiology lesson on appropriate imaging, meaningful MRI findings, and the limits of the scan.', 'یک درس رادیولوژی درباره اندیکاسیون درست، یافته‌های معنادار MRI و مرزهای تصویربرداری.'),
  eyebrow: L('Neuroradiologie · Kopfschmerz', 'Neuroradiology · Headache', 'نورورادیولوژی · سردرد'),
  updated: L('Quellen geprüft: 15.10.2026', 'Sources checked: 15 Oct 2026', 'بازبینی منابع: ۱۵ اکتبر ۲۰۲۶'),
  duration: L('ca. 25 Min. · 11 Abschnitte', 'About 25 min · 11 sections', 'حدود ۲۵ دقیقه · ۱۱ بخش'),
  path: L('Lernpfad', 'Learning path', 'مسیر یادگیری'), read: L('gelesen', 'read', 'خوانده‌شده'),
  mark: L('Abschnitt als gelesen markieren', 'Mark section as read', 'علامت‌گذاری بخش به‌عنوان خوانده‌شده'),
  marked: L('Abschnitt gelesen', 'Section read', 'بخش خوانده شد'),
  all: L('Alles als gelesen', 'Mark all read', 'ثبت خواندن کل درس'),
  allDone: L('Alles gelesen', 'All read', 'کل درس خوانده شد'),
  continue: L('Lektion fortsetzen', 'Continue lesson', 'ادامه درس'),
  local: L('Lesefortschritt auf diesem Gerät gespeichert', 'Reading progress saved on this device', 'پیشرفت مطالعه روی این دستگاه ذخیره می‌شود'),
  key: L('Merke', 'Remember', 'نکته کلیدی'), warning: L('Klinische Priorität', 'Clinical priority', 'اولویت بالینی'),
  sources: L('Quellen', 'Sources', 'منابع'), related: L('Vertiefen', 'Explore further', 'مطالعه بیشتر'),
  mcq: L('MCQ starten', 'Start MCQs', 'شروع MCQ'), cards: L('Flashcards', 'Flashcards', 'فلش‌کارت‌ها'),
  goalsTitle: L('Nach dieser Lektion kannst du …', 'After this lesson you can …', 'پس از این درس می‌توانید …'),
  goals: [L('Bildgebung gezielt indizieren.', 'Choose when imaging is indicated.', 'اندیکاسیون تصویربرداری را هدفمند تعیین کنید.'), L('Aura, Infarkt und unspezifische WMH einordnen.', 'Interpret aura, infarction, and nonspecific WMHs.', 'اورا، انفارکت و WMH غیراختصاصی را تفسیر کنید.'), L('Einen klaren, klinisch hilfreichen Befund formulieren.', 'Write a clear, clinically useful report.', 'گزارشی روشن و مفید برای بالین بنویسید.')],
}

function Icon({
  name
}) {
  const paths = {
    brain: <><path d="M12 5a3.5 3.5 0 0 0-6 2 4 4 0 0 0-2 7 4 4 0 0 0 7 4V6M12 5a3.5 3.5 0 0 1 6 2 4 4 0 0 1 2 7 4 4 0 0 1-7 4V6" /><path d="M6 10h3M15 10h3M7 15l2-1M17 15l-2-1" /></>,
    scan: <><circle cx="10.5" cy="10.5" r="6" /><path d="m15 15 5 5M10.5 7v7M7 10.5h7" /></>,
    vessel: <path d="M12 21V11L7 6V3M12 11l5-5V3M9 15l-4 4M15 15l4 4" />,
    clinical: <path d="M3 12h4l3-7 4 14 3-7h4" />,
    chart: <path d="M4 20V10M10 20V4M16 20v-7M2 20h20" />,
    case: <path d="M6 4h12v17H6zM9 4V2h6v2M9 9h6M9 13h6M9 17h4" />,
    quiz: <><rect x="3.5" y="3.5" width="17" height="17" rx="2.5"/><path d="M7.2 9.1a2 2 0 1 1 2.8 1.8c-.9.4-1.4.9-1.4 1.8"/><circle cx="8.6" cy="16" r=".55" fill="currentColor" stroke="none"/><path d="M13.5 8.5h3.5M13.5 12h3.5M13.5 15.5h2.5"/></>,
    flashcards: <><rect x="7" y="5" width="13" height="15" rx="2"/><path d="M7 18H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2"/><path d="M10 9h7M10 13h5"/></>,
    spark: <><path d="M12 2l1.5 5.1L19 9l-5.5 1.9L12 16l-1.5-5.1L5 9l5.5-1.9z"/><path d="m18.5 15 .8 2.7L22 18.5l-2.7.8-.8 2.7-.8-2.7-2.7-.8 2.7-.8z"/></>,
    check: <><circle cx="12" cy="12" r="9" /><path d="m7 12 3 3 7-7" /></>,
    arrow: <path d="M4 12h16m-6-6 6 6-6 6" />,
    decision: <><path d="M12 3v6m0 0-6 5m6-5 6 5M6 14v7m12-7v7" /><path d="M3 18h6m6 0h6" /></>,
    warning: <path d="m12 3 10 18H2zM12 9v5M12 17v1" />
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

function Arrow() { return <Icon name="arrow" /> }
function Check() { return <Icon name="check" /> }

function SourceLinks({ ids, lang }) {
  return <div className={styles.citations}><span>{pick(COPY.sources, lang)}:</span>{ids.map(id => {
    const source = MIGRAINE_SOURCES.find(s => s.id === id)
    return <a key={id} href={source.url} target="_blank" rel="noopener noreferrer" lang="en" dir="ltr">{source.title}</a>
  })}</div>
}

function Callout({ warning = false, lang, children }) {
  return <aside className={warning ? reference.warning : reference.rememberNote}><span className={reference.calloutLabel}><Icon name={warning ? 'warning' : 'spark'} />{pick(warning ? COPY.warning : COPY.key, lang)}</span><div className={reference.calloutBody}><p>{children}</p></div></aside>
}

function CasePractice({ lang }) {
  const [selected, setSelected] = useState('stable')
  const [revealed, setRevealed] = useState(false)
  const c = value => pick(value, lang)
  const active = MIGRAINE_CASES.find(item => item.id === selected)
  return <div className={styles.casePractice}>
    <div className={styles.toolHeader}><h4>{c(L('Welche Untersuchung passt?', 'Which examination fits?', 'کدام بررسی مناسب است؟'))}</h4><p>{c(L('Vier Lehrfälle. Erst entscheiden, dann die Begründung öffnen.', 'Four teaching cases. Decide first, then reveal the reasoning.', 'چهار کیس آموزشی. ابتدا تصمیم بگیرید، سپس توضیح را ببینید.'))}</p></div>
    <fieldset className={styles.caseChoices}><legend className={styles.srOnly}>{c(L('Lehrfall auswählen', 'Choose a teaching case', 'انتخاب کیس آموزشی'))}</legend>{MIGRAINE_CASES.map(item => <label key={item.id} className={selected === item.id ? styles.caseSelected : ''}><input type="radio" name="migraine-case" value={item.id} checked={selected === item.id} onChange={() => { setSelected(item.id); setRevealed(false) }} /><span>{c(item.label)}</span></label>)}</fieldset>
    <p className={styles.caseStory}>{c(active.story)}</p>
    <button type="button" className={styles.primaryButton} aria-expanded={revealed} aria-controls="case-reasoning" onClick={() => setRevealed(v => !v)}>{c(revealed ? L('Begründung schließen', 'Hide reasoning', 'بستن توضیح') : L('Vorgehen & Begründung zeigen', 'Show approach & reasoning', 'نمایش اقدام و توضیح'))}<Arrow /></button>
    <div id="case-reasoning" hidden={!revealed} className={styles.caseResult}><strong>{c(active.answer)}</strong><p>{c(active.why)}</p><SourceLinks ids={active.sources} lang={lang} /></div>
  </div>
}

function MiniQuiz({ lang }) {
  const [answers, setAnswers] = useState({})
  const [checked, setChecked] = useState({})
  const c = value => pick(value, lang)
  const total = Object.keys(checked).length
  const score = MIGRAINE_QUIZ.filter(q => checked[q.id] && answers[q.id] === q.correct).length
  return <div className={styles.quiz}>
    <div className={styles.toolHeader}><h4>{c(L('Acht Entscheidungen, die sitzen sollten', 'Eight decisions to remember', 'هشت تصمیمی که باید بدانید'))}</h4><p aria-live="polite"><bdi dir="ltr">{total} / 8</bdi> {c(L('geprüft', 'checked', 'بررسی‌شده'))} · {score} {c(L('richtig', 'correct', 'درست'))}</p></div>
    {MIGRAINE_QUIZ.map((q, index) => <div key={q.id} className={styles.question}>
      <fieldset><legend><span>{String(index + 1).padStart(2, '0')}</span>{c(q.question)}</legend>
        <div className={styles.options}>{q.options.map((option, i) => <label key={i} className={answers[q.id] === i ? styles.optionSelected : ''}><input type="radio" name={`migraine-question-${q.id}`} checked={answers[q.id] === i} onChange={() => { setAnswers(prev => ({ ...prev, [q.id]: i })); setChecked(prev => { const next = { ...prev }; delete next[q.id]; return next }) }} /><span>{c(option)}</span></label>)}</div>
      </fieldset>
      <button type="button" className={styles.checkButton} disabled={answers[q.id] === undefined || !!checked[q.id]} onClick={() => setChecked(prev => ({ ...prev, [q.id]: true }))}>{c(L('Antwort prüfen', 'Check answer', 'بررسی پاسخ'))}</button>
      {checked[q.id] ? <div className={`${styles.feedback} ${answers[q.id] !== q.correct ? styles.feedbackWrong : ''}`} role="status"><strong>{c(answers[q.id] === q.correct ? L('Richtig.', 'Correct.', 'درست است.') : L('Noch nicht. Richtige Antwort:', 'Not quite. Correct answer:', 'درست نیست. پاسخ صحیح:'))} {answers[q.id] !== q.correct ? c(q.options[q.correct]) : ''}</strong><p>{c(q.explanation)}</p></div> : null}
    </div>)}
    {total === 8 ? <div className={styles.quizSummary} role="status"><strong>{c(L('Mini-Check abgeschlossen', 'Mini-check complete', 'آزمون کوتاه تمام شد'))} · <bdi dir="ltr">{score} / 8</bdi></strong><button type="button" className={styles.checkButton} onClick={() => { setAnswers({}); setChecked({}) }}>{c(L('Erneut üben', 'Practise again', 'تمرین دوباره'))}</button></div> : null}
  </div>
}

function LessonContent({ section, lang, withLang }) {
  const c = value => pick(value, lang)
  if (section.kind === 'training') return <><CasePractice lang={lang} /><MiniQuiz lang={lang} /></>
  if (section.kind === 'take-home') return <LessonTakeHome points={MIGRAINE_TAKE_HOME} lang={lang} idPrefix="migraine-take-home" />
  if (section.kind === 'sources') return <><p className={reference.lead}>{c(L('Stand der Quellenprüfung: 15. Oktober 2026. Die Jahreszahl der jeweiligen Leitlinie bleibt sichtbar; ein neues Abrufdatum bedeutet keine neue Leitlinienversion. Protokoll und Fallbeispiele sind eine didaktische Synthese, kein validierter Entscheidungsrechner.', 'Sources checked on 15 October 2026. Each guideline retains its publication year; a new access date does not imply a new edition. The protocol and cases are educational synthesis, not a validated decision calculator.', 'منابع در ۱۵ اکتبر ۲۰۲۶ بررسی شدند. سال انتشار هر راهنما مشخص است؛ تاریخ بازبینی جدید به معنی نسخه جدید راهنما نیست. پروتکل و کیس‌ها جمع‌بندی آموزشی‌اند، نه ابزار تصمیم‌گیری اعتبارسنجی‌شده.'))}</p><ol className={styles.sourceList}>{MIGRAINE_SOURCES.map(source => <li key={source.id}><a href={source.url} target="_blank" rel="noopener noreferrer" lang="en" dir="ltr">{source.title}<Arrow /></a><p>{c(source.note)}</p></li>)}</ol></>
  return <>
    {section.lead ? <p className={styles.paragraph}>{c(section.lead)}</p> : null}
    {section.id === 'grundlagen' ? <div className={styles.goals}><h4>{c(COPY.goalsTitle)}</h4><ul>{COPY.goals.map((g, i) => <li key={i}>{c(g)}</li>)}</ul></div> : null}
    {section.cards ? <dl className={styles.teachingList}>{section.cards.map((card, i) => <div key={i}><dt>{c(card.title)}</dt><dd>{c(card.text)}</dd></div>)}</dl> : null}
    {section.id === 'bildmuster' ? <MriHotspots lang={lang} /> : null}
    {section.id === 'protokoll' ? <ProtocolTrainer lang={lang} /> : null}
    {section.id === 'stroke-mimic' ? <AuraComparison lang={lang} /> : null}
    {section.rows && section.id !== 'stroke-mimic' ? <div className={styles.tableWrap} role="region" aria-label={c(section.short)} tabIndex={0}><table><caption className={styles.srOnly}>{c(section.title)}</caption><thead><tr>{section.headers.map((h, i) => <th key={i} scope="col">{c(h)}</th>)}</tr></thead><tbody>{section.rows.map((row, r) => <tr key={r}>{row.map((cell, col) => col === 0 ? <th key={col} scope="row">{c(cell)}</th> : <td key={col}>{c(cell)}</td>)}</tr>)}</tbody></table></div> : null}
    {section.headers?.length > 2 && section.id !== 'stroke-mimic' ? <p className={styles.tableHint}>{c(L('Tabelle seitlich bewegen, um alle Spalten zu sehen.', 'Scroll the table sideways to see all columns.', 'برای دیدن همه ستون‌ها، جدول را افقی حرکت دهید.'))}</p> : null}
    {section.reports ? section.reports.map((report, i) => <div className={styles.report} key={i}><h4>{c(report.title)}</h4><blockquote>{c(report.text)}</blockquote></div>) : null}
    {section.warning ? <Callout warning lang={lang}>{c(section.warning)}</Callout> : null}
    {section.note ? <Callout lang={lang}>{c(section.note)}</Callout> : null}
    {section.related ? <nav className={styles.related} aria-label={c(COPY.related)}><span>{c(COPY.related)}</span>{section.related.map(link => <Link key={link.path} href={withLang(link.path)}>{c(link.label)}<Arrow /></Link>)}</nav> : null}
    <PracticalPearl id={section.id} lang={lang} />
    {section.sources ? <SourceLinks ids={section.sources} lang={lang} /> : null}
  </>
}

function ChapterContent({ chapter, lang, withLang }) {
  const c = value => pick(value, lang)
  if (chapter.emphasis) return <LessonTakeHome points={MIGRAINE_TAKE_HOME} lang={lang} idPrefix="migraine-take-home" />
  if (chapter.id === 'training') return <TeachingGroups direction={lang === 'fa' ? 'rtl' : 'ltr'}>
    <TeachingGroup id="migraine-case-training" title={c(L('Falltraining', 'Case practice', 'تمرین کیس'))}><div className={styles.groupBody}><CasePractice lang={lang} /><PracticalPearl id="training" lang={lang} /></div></TeachingGroup>
    <TeachingGroup id="migraine-mini-check" title={c(L('Mini-Check', 'Mini-check', 'آزمون کوتاه'))} tone="secondary"><div className={styles.groupBody}><MiniQuiz lang={lang} /><PracticalPearl id="quiz" lang={lang} /></div></TeachingGroup>
  </TeachingGroups>
  return <TeachingGroups direction={lang === 'fa' ? 'rtl' : 'ltr'}>{chapter.topics.map((id, index) => {
    const section = topic(id)
    return <TeachingGroup key={id} id={`migraine-${id}`} title={c(section.short)} tone={index % 2 ? 'secondary' : undefined}><div className={`${styles.groupBody} ${id === 'grundlagen' ? styles.foundationBody : ''}`}><LessonContent section={section} lang={lang} withLang={withLang} /></div></TeachingGroup>
  })}</TeachingGroups>
}

function MobileLearningPath({ lang, openId, readSections, onSelect }) {
  const [panelOpen, setPanelOpen] = useState(false)
  const active = MIGRAINE_CHAPTERS.find(chapter => chapter.id === openId) || PATH_CHAPTERS[0]
  const c = value => pick(value, lang)
  useEffect(() => {
    if (!panelOpen) return
    const close = event => { if (event.key === 'Escape') setPanelOpen(false) }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [panelOpen])
  return <div className={`${reference.mobileLearningPath} ${styles.compactPath}`}>
    {panelOpen ? <section id="migraine-mobile-learning-path" className={reference.mobilePathPanel} role="dialog" aria-label={c(COPY.path)}>
      <header className={reference.learningPathHeading}><div><small>{c(COPY.path)}</small><strong><bdi dir="ltr">{readSections.size} / {MIGRAINE_TRACKED_IDS.length}</bdi></strong></div><button type="button" onClick={() => setPanelOpen(false)} aria-label={c(L('Schließen', 'Close', 'بستن'))}>×</button></header>
      <nav>{MIGRAINE_CHAPTERS.map(chapter => <button type="button" key={chapter.id} className={openId === chapter.id ? reference.mobilePathCurrent : ''} onClick={() => { onSelect(chapter.id); setPanelOpen(false) }} aria-current={openId === chapter.id ? 'location' : undefined}><span className={reference.mobilePathItemIcon}><Icon name={chapter.icon} /></span><span><strong>{c(chapter.title)}</strong></span><i aria-hidden="true">{readSections.has(chapter.id) ? '✓' : ''}</i></button>)}</nav>
    </section> : null}
    <button type="button" className={reference.mobilePathButton} aria-label={`${c(COPY.path)} · ${c(active.title)} · ${readSections.size} / ${MIGRAINE_TRACKED_IDS.length}`} title={c(active.title)} onClick={() => setPanelOpen(value => !value)} aria-expanded={panelOpen} aria-controls="migraine-mobile-learning-path"><span className={reference.mobileProgressRing} style={{ '--mobile-progress': `${readSections.size / MIGRAINE_TRACKED_IDS.length * 360}deg` }}><b>{readSections.size}</b><small>/{MIGRAINE_TRACKED_IDS.length}</small></span><span className={reference.mobileCurrentIcon}><Icon name={active.icon} /></span><span className={reference.mobilePathLabel}><strong>{c(COPY.path)}</strong><small>{c(active.title)}</small></span></button>
  </div>
}

export default function MigraineLesson() {
  const { lang } = useLanguage()
  const [openId, setOpenId] = useState('grundlagen')
  const [summaryOpen, setSummaryOpen] = useState(false)
  const [sourcesOpen, setSourcesOpen] = useState(false)
  const [readSections, setReadSections] = usePersistedSectionProgress(MIGRAINE_PROGRESS_VERSION, MIGRAINE_TRACKED_IDS, false, migrateStoredProgress)
  const scrollToSection = useLessonSectionScroll()
  const lehrMode = useLehrModeActive()
  const c = value => pick(value, lang)
  const withLang = path => lang === 'de' ? path : `${path}${path.includes('?') ? '&' : '?'}lang=${lang}`
  const allRead = readSections.size === MIGRAINE_TRACKED_IDS.length
  const activeIndex = Math.max(0, MIGRAINE_TRACKED_IDS.indexOf(openId))
  const isOpen = chapter => lehrMode || (chapter.emphasis ? summaryOpen : chapter.id === openId)

  useEffect(() => {
    const syncHash = () => {
      const hash = window.location.hash.slice(1)
      if (hash === 'quellen') { setSourcesOpen(true); scrollToSection('quellen'); return }
      const id = resolveMigraineChapter(hash)
      if (id === 'take-home') setSummaryOpen(true)
      else if (id) setOpenId(id)
      else setOpenId('grundlagen')
      if (id) scrollToSection(hash !== id && topic(hash) ? `migraine-${hash}-heading` : id)
    }
    syncHash()
    window.addEventListener('hashchange', syncHash)
    window.addEventListener('popstate', syncHash)
    return () => { window.removeEventListener('hashchange', syncHash); window.removeEventListener('popstate', syncHash) }
  }, [scrollToSection])

  const replaceHash = id => {
    const url = new URL(window.location.href)
    url.hash = id || ''
    window.history.replaceState(null, '', url)
  }
  const selectSection = id => {
    if (id === 'take-home') setSummaryOpen(true)
    else if (MIGRAINE_TRACKED_IDS.includes(id)) setOpenId(id)
    else return
    replaceHash(id)
    scrollToSection(id)
  }
  const toggleSummary = () => {
    const next = !summaryOpen
    setSummaryOpen(next)
    replaceHash(next ? 'take-home' : openId)
    if (next) scrollToSection('take-home')
  }
  const toggleRead = id => setReadSections(previous => {
    const next = new Set(previous)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    return next
  })

  return <main className={`${reference.page} ${styles.page}`} data-lesson-section-divider="true" data-lesson-progress-managed="true" data-disable-lesson-explorer="true" data-lehr-sections-managed="true" dir={lang === 'fa' ? 'rtl' : 'ltr'} lang={lang}>
    <header className={reference.header}>
      <div className={reference.topline}><nav className={reference.breadcrumb} aria-label={c(L('Seitennavigation', 'Breadcrumb', 'مسیر صفحه'))}><Link href={withLang('/')}>RadYar</Link><span>/</span><Link href={withLang('/lernen/gehirn')}>{c(COPY.head)}</Link><span>/</span><strong>{c(MIGRAINE_TITLE)}</strong></nav><span className={reference.author}>Dr. Zia</span></div>
      <LessonHero title={c(MIGRAINE_TITLE)} imageSrc="/educational/migraine-hero-schematic.png" imageAlt={c(L('Illustratives Migräne-Schema: intakte Hirnrinde mit einer symbolischen Welle für Aura, kein MRT-Befund', 'Illustrative migraine schematic: intact cortex with a symbolic aura wave, not an MRI finding', 'شماتیک آموزشی میگرن: قشر سالم مغز با موج نمادین اورا، نه یافته MRI'))} lang={lang} />
      <div className={reference.actions}>
        <button type="button" className={reference.takeHomeJump} onClick={() => selectSection('take-home')}><Icon name="spark" />Take Home Message<span aria-hidden="true">↓</span></button>
        <Link className={reference.primaryAction} href={withLang(`/ueben/quiz?fach=gehirn&n=8&themen=migraene&from=${encodeURIComponent(withLang(MIGRAINE_PATH))}`)}><Icon name="quiz" />{c(COPY.mcq)}<span aria-hidden="true">→</span></Link>
        <Link className={reference.secondaryAction} href={withLang(`/flashcards/migraene?mode=practice&from=${encodeURIComponent(withLang(MIGRAINE_PATH))}`)}><Icon name="flashcards" />{c(COPY.cards)}</Link>
      </div>
      <div className={reference.progressBar}>
        <div className={reference.progressTrack} role="progressbar" aria-label={c(COPY.path)} aria-valuenow={readSections.size} aria-valuemin={0} aria-valuemax={MIGRAINE_TRACKED_IDS.length}><i style={{ width: `${readSections.size / MIGRAINE_TRACKED_IDS.length * 100}%` }} /></div>
        <span><bdi dir="ltr">{readSections.size} / {MIGRAINE_TRACKED_IDS.length}</bdi> {c(COPY.read)}</span>
        <div className={reference.progressActions}>
          <button type="button" className={`${reference.lessonCompleteButton} ${allRead ? reference.lessonCompleteButtonDone : ''}`} aria-pressed={allRead} onClick={() => setReadSections(allRead ? new Set() : new Set(MIGRAINE_TRACKED_IDS))}><Check />{c(allRead ? COPY.allDone : COPY.all)}</button>
          <button type="button" className={reference.continueButton} onClick={() => selectSection(MIGRAINE_TRACKED_IDS[activeIndex + 1])} disabled={activeIndex === MIGRAINE_TRACKED_IDS.length - 1}>{c(COPY.continue)}<Arrow /></button>
        </div>
      </div>
    </header>
    <div className={reference.layout}>
      <aside className={reference.sidebar}><h2 className={reference.learningPathHeading}>{c(COPY.path)}</h2><nav aria-label={c(COPY.path)}>{PATH_CHAPTERS.map(chapter => <button type="button" key={chapter.id} className={chapter.id === openId ? reference.activeSideItem : ''} onClick={() => selectSection(chapter.id)} aria-current={chapter.id === openId ? 'location' : undefined}><span className={reference.sideIcon}><Icon name={chapter.icon} /></span><strong>{c(chapter.title)}{readSections.has(chapter.id) ? <span className={styles.readTick} aria-label={c(COPY.marked)}> ✓</span> : null}</strong></button>)}</nav></aside>
      <article className={reference.lesson}>{MIGRAINE_CHAPTERS.map(chapter => <section key={chapter.id} id={chapter.id} className={`${reference.section} ${isOpen(chapter) ? reference.sectionOpen : ''} ${chapter.emphasis ? reference.takeHomeSection : ''}`}>
        <h2 className={styles.chapterHeading}><button type="button" className={reference.sectionHeader} onClick={() => chapter.emphasis ? toggleSummary() : selectSection(chapter.id)} aria-expanded={isOpen(chapter)} aria-controls={`migraine-${chapter.id}-panel`}><span className={reference.sectionIcon}><Icon name={chapter.icon} /></span><span><strong>{c(chapter.title)}</strong></span><span className={reference.toggle} aria-hidden="true">{isOpen(chapter) ? '−' : '+'}</span></button></h2>
        <div id={`migraine-${chapter.id}-panel`} className={reference.sectionBody} hidden={!isOpen(chapter)}><ChapterContent chapter={chapter} lang={lang} withLang={withLang} />{!chapter.emphasis ? <button type="button" className={`${reference.readButton} ${readSections.has(chapter.id) ? reference.readButtonDone : ''}`} aria-pressed={readSections.has(chapter.id)} onClick={() => toggleRead(chapter.id)}><Check />{c(readSections.has(chapter.id) ? COPY.marked : COPY.mark)}</button> : null}</div>
      </section>)}
        <details id="quellen" className={styles.sources} open={sourcesOpen || lehrMode} onToggle={event => setSourcesOpen(event.currentTarget.open)}><summary>{c(COPY.sources)} · {c(COPY.updated)}</summary><LessonContent section={topic('quellen')} lang={lang} withLang={withLang} /></details>
      </article>
    </div>
    <MobileLearningPath lang={lang} openId={openId} readSections={readSections} onSelect={selectSection} />
  </main>
}
