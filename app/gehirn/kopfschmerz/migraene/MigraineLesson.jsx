'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import { usePersistedSectionProgress } from '@/hooks/usePersistedSectionProgress'
import { MIGRAINE_TITLE, MIGRAINE_PATH, MIGRAINE_SECTIONS, MIGRAINE_SOURCES, MIGRAINE_CASES, MIGRAINE_QUIZ, MIGRAINE_IMAGE } from '@/data/migraine'
import styles from './page.module.css'

const L = (de, en, fa) => ({ de, en, fa })
const pick = (value, lang) => typeof value === 'string' ? value : value[lang] || value.de
const IDS = MIGRAINE_SECTIONS.map(s => s.id)
const COPY = {
  head: L('Kopf', 'Head', 'سر'), chapter: L('Kopfschmerz', 'Headache', 'سردرد'),
  subtitle: L('Eine radiologische Lektion über die richtige Indikation, aussagekräftige MRT-Befunde und die Grenzen der Bildgebung.', 'A radiology lesson on appropriate imaging, meaningful MRI findings, and the limits of the scan.', 'یک درس رادیولوژی درباره اندیکاسیون درست، یافته‌های معنادار MRI و مرزهای تصویربرداری.'),
  eyebrow: L('Neuroradiologie · Kopfschmerz', 'Neuroradiology · Headache', 'نورورادیولوژی · سردرد'),
  updated: L('Quellen geprüft: 15.10.2026', 'Sources checked: 15 Oct 2026', 'بازبینی منابع: ۱۵ اکتبر ۲۰۲۶'),
  duration: L('ca. 25 Min. · 11 Abschnitte', 'About 25 min · 11 sections', 'حدود ۲۵ دقیقه · ۱۱ بخش'),
  path: L('Lernpfad', 'Learning path', 'مسیر یادگیری'), read: L('gelesen', 'read', 'خوانده‌شده'),
  mark: L('Abschnitt als gelesen markieren', 'Mark section as read', 'علامت‌گذاری بخش به‌عنوان خوانده‌شده'),
  marked: L('Abschnitt gelesen', 'Section read', 'بخش خوانده شد'),
  all: L('Ganze Lektion als gelesen markieren', 'Mark full lesson as read', 'علامت‌گذاری کل درس به‌عنوان خوانده‌شده'),
  allDone: L('Ganze Lektion gelesen', 'Full lesson read', 'کل درس خوانده شد'),
  continue: L('Weiter im Lernpfad', 'Continue learning', 'ادامه مسیر یادگیری'),
  local: L('Lesefortschritt auf diesem Gerät gespeichert', 'Reading progress saved on this device', 'پیشرفت مطالعه روی این دستگاه ذخیره می‌شود'),
  key: L('Merke', 'Remember', 'نکته کلیدی'), warning: L('Klinische Priorität', 'Clinical priority', 'اولویت بالینی'),
  sources: L('Quellen', 'Sources', 'منابع'), related: L('Vertiefen', 'Explore further', 'مطالعه بیشتر'),
  mcq: L('8 MCQ üben', 'Practise 8 MCQs', 'تمرین ۸ سؤال'), cards: L('8 Flashcards', '8 flashcards', '۸ فلش‌کارت'),
  goalsTitle: L('Nach dieser Lektion kannst du …', 'After this lesson you can …', 'پس از این درس می‌توانید …'),
  goals: [L('Bildgebung gezielt indizieren.', 'Choose when imaging is indicated.', 'اندیکاسیون تصویربرداری را هدفمند تعیین کنید.'), L('Aura, Infarkt und unspezifische WMH einordnen.', 'Interpret aura, infarction, and nonspecific WMHs.', 'اورا، انفارکت و WMH غیراختصاصی را تفسیر کنید.'), L('Einen klaren, klinisch hilfreichen Befund formulieren.', 'Write a clear, clinically useful report.', 'گزارشی روشن و مفید برای بالین بنویسید.')],
}

function Arrow() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" /></svg>
}

function Check() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="m5 12 4 4L19 6" /></svg>
}

function SourceLinks({ ids, lang }) {
  return <div className={styles.citations}><span>{pick(COPY.sources, lang)}:</span>{ids.map(id => {
    const source = MIGRAINE_SOURCES.find(s => s.id === id)
    return <a key={id} href={source.url} target="_blank" rel="noopener noreferrer" lang="en" dir="ltr">{source.title}</a>
  })}</div>
}

function Callout({ warning = false, lang, children }) {
  return <aside className={`${styles.callout} ${warning ? styles.warning : ''}`}><strong>{pick(warning ? COPY.warning : COPY.key, lang)}</strong><p>{children}</p></aside>
}

function CasePractice({ lang }) {
  const [selected, setSelected] = useState('stable')
  const [revealed, setRevealed] = useState(false)
  const c = value => pick(value, lang)
  const active = MIGRAINE_CASES.find(item => item.id === selected)
  return <div className={styles.casePractice}>
    <div className={styles.toolHeader}><span>01 / {c(L('Falltraining', 'Case practice', 'تمرین کیس'))}</span><h3>{c(L('Welche Untersuchung passt?', 'Which examination fits?', 'کدام بررسی مناسب است؟'))}</h3><p>{c(L('Vier Lehrfälle. Erst entscheiden, dann die Begründung öffnen.', 'Four teaching cases. Decide first, then reveal the reasoning.', 'چهار کیس آموزشی. ابتدا تصمیم بگیرید، سپس توضیح را ببینید.'))}</p></div>
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
    <div className={styles.toolHeader}><span>02 / {c(L('Mini-Check', 'Mini-check', 'آزمون کوتاه'))}</span><h3>{c(L('Acht Entscheidungen, die sitzen sollten', 'Eight decisions to remember', 'هشت تصمیمی که باید بدانید'))}</h3><p aria-live="polite"><bdi dir="ltr">{total} / 8</bdi> {c(L('geprüft', 'checked', 'بررسی‌شده'))} · {score} {c(L('richtig', 'correct', 'درست'))}</p></div>
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
  if (section.kind === 'take-home') return <ol className={styles.takeHome}>{section.points.map((point, i) => <li key={i}><span>{String(i + 1).padStart(2, '0')}</span><strong>{c(point)}</strong></li>)}</ol>
  if (section.kind === 'sources') return <><p className={styles.lead}>{c(L('Stand der Quellenprüfung: 15. Oktober 2026. Die Jahreszahl der jeweiligen Leitlinie bleibt sichtbar; ein neues Abrufdatum bedeutet keine neue Leitlinienversion. Protokoll und Fallbeispiele sind eine didaktische Synthese, kein validierter Entscheidungsrechner.', 'Sources checked on 15 October 2026. Each guideline retains its publication year; a new access date does not imply a new edition. The protocol and cases are educational synthesis, not a validated decision calculator.', 'منابع در ۱۵ اکتبر ۲۰۲۶ بررسی شدند. سال انتشار هر راهنما مشخص است؛ تاریخ بازبینی جدید به معنی نسخه جدید راهنما نیست. پروتکل و کیس‌ها جمع‌بندی آموزشی‌اند، نه ابزار تصمیم‌گیری اعتبارسنجی‌شده.'))}</p><ol className={styles.sourceList}>{MIGRAINE_SOURCES.map(source => <li key={source.id}><a href={source.url} target="_blank" rel="noopener noreferrer" lang="en" dir="ltr">{source.title}<Arrow /></a><p>{c(source.note)}</p></li>)}</ol></>
  return <>
    {section.lead ? <p className={styles.lead}>{c(section.lead)}</p> : null}
    {section.id === 'grundlagen' ? <div className={styles.goals}><h3>{c(COPY.goalsTitle)}</h3><ul>{COPY.goals.map((g, i) => <li key={i}>{c(g)}</li>)}</ul></div> : null}
    {section.cards ? <div className={styles.learningRows}>{section.cards.map((card, i) => <div className={styles.learningRow} key={i}><span className={styles.rowNumber}>{String(i + 1).padStart(2, '0')}</span><div><h3>{c(card.title)}</h3><p>{c(card.text)}</p></div></div>)}</div> : null}
    {section.id === 'bildmuster' ? <figure className={styles.imagingFigure}>
      <h3>{c(MIGRAINE_IMAGE.title)}</h3>
      <a href={MIGRAINE_IMAGE.src} target="_blank" rel="noopener noreferrer" aria-label={c(L('MRT-Abbildung in voller Größe öffnen (neuer Tab)', 'Open full-size MRI figure (new tab)', 'باز کردن تصویر MRI در اندازه کامل (زبانه جدید)'))}><img src={MIGRAINE_IMAGE.src} width={MIGRAINE_IMAGE.width} height={MIGRAINE_IMAGE.height} alt={c(MIGRAINE_IMAGE.alt)} loading="lazy" decoding="async" /><span>{c(L('In voller Größe ansehen', 'View full size', 'مشاهده در اندازه کامل'))}<Arrow /></span></a>
      <figcaption><p>{c(MIGRAINE_IMAGE.caption)}</p><a href={MIGRAINE_IMAGE.source} target="_blank" rel="noopener noreferrer" lang="en" dir="ltr">{MIGRAINE_IMAGE.credit}</a> · <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer">CC BY 4.0</a></figcaption>
    </figure> : null}
    {section.rows ? <div className={styles.tableWrap} role="region" aria-label={c(section.short)} tabIndex={0}><table><caption className={styles.srOnly}>{c(section.title)}</caption><thead><tr>{section.headers.map((h, i) => <th key={i} scope="col">{c(h)}</th>)}</tr></thead><tbody>{section.rows.map((row, r) => <tr key={r}>{row.map((cell, col) => col === 0 ? <th key={col} scope="row">{c(cell)}</th> : <td key={col}>{c(cell)}</td>)}</tr>)}</tbody></table></div> : null}
    {section.headers?.length > 2 ? <p className={styles.tableHint}>{c(L('Tabelle seitlich bewegen, um alle Spalten zu sehen.', 'Scroll the table sideways to see all columns.', 'برای دیدن همه ستون‌ها، جدول را افقی حرکت دهید.'))}</p> : null}
    {section.reports ? section.reports.map((report, i) => <div className={styles.report} key={i}><h3>{c(report.title)}</h3><blockquote>{c(report.text)}</blockquote></div>) : null}
    {section.warning ? <Callout warning lang={lang}>{c(section.warning)}</Callout> : null}
    {section.note ? <Callout lang={lang}>{c(section.note)}</Callout> : null}
    {section.related ? <nav className={styles.related} aria-label={c(COPY.related)}><span>{c(COPY.related)}</span>{section.related.map(link => <Link key={link.path} href={withLang(link.path)}>{c(link.label)}<Arrow /></Link>)}</nav> : null}
    {section.sources ? <SourceLinks ids={section.sources} lang={lang} /> : null}
  </>
}

export default function MigraineLesson() {
  const { lang } = useLanguage()
  const [openId, setOpenId] = useState('grundlagen')
  const [readSections, setReadSections] = usePersistedSectionProgress('migraene', IDS)
  const c = value => pick(value, lang)
  const withLang = path => lang === 'de' ? path : `${path}${path.includes('?') ? '&' : '?'}lang=${lang}`
  const allRead = readSections.size === IDS.length
  const activeIndex = IDS.indexOf(openId)

  useEffect(() => {
    const syncHash = () => {
      const hash = window.location.hash.slice(1)
      if (IDS.includes(hash)) setOpenId(hash)
    }
    syncHash()
    window.addEventListener('hashchange', syncHash)
    window.addEventListener('popstate', syncHash)
    return () => { window.removeEventListener('hashchange', syncHash); window.removeEventListener('popstate', syncHash) }
  }, [])

  const navigate = (id, toggle = false) => {
    const next = toggle && openId === id ? null : id
    setOpenId(next)
    const url = new URL(window.location.href)
    url.hash = next || ''
    window.history.replaceState(null, '', url)
    if (next) requestAnimationFrame(() => document.getElementById(next)?.scrollIntoView({ block: 'start', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }))
  }
  const toggleRead = id => setReadSections(prev => { const next = new Set(prev); if (next.has(id)) next.delete(id); else next.add(id); return next })

  return <main className={styles.page} data-lesson-progress-managed="true" dir={lang === 'fa' ? 'rtl' : 'ltr'} lang={lang}>
    <div className={styles.shell}>
      <header className={styles.header}>
        <nav className={styles.breadcrumb} aria-label={c(L('Seitennavigation', 'Breadcrumb', 'مسیر صفحه'))}><Link href={withLang('/')}>RadYar</Link><span>/</span><Link href={withLang('/lernen/gehirn')}>{c(COPY.head)}</Link><span>/</span><span>{c(COPY.chapter)}</span><span>/</span><strong>{c(MIGRAINE_TITLE)}</strong></nav>
        <div className={styles.hero}>
          <div className={styles.heroCopy}><p className={styles.eyebrow}>{c(COPY.eyebrow)}</p><h1>{c(MIGRAINE_TITLE)}</h1><p className={styles.subtitle}>{c(COPY.subtitle)}</p><div className={styles.actions}><Link className={styles.primaryButton} href={withLang(`/ueben/quiz?fach=gehirn&n=8&themen=migraene&from=${encodeURIComponent(withLang(MIGRAINE_PATH))}`)}>{c(COPY.mcq)}<Arrow /></Link><Link className={styles.secondaryButton} href={withLang(`/flashcards/migraene?from=${encodeURIComponent(withLang(MIGRAINE_PATH))}`)}>{c(COPY.cards)}<Arrow /></Link></div><div className={styles.meta}><span>{c(COPY.duration)}</span><span>{c(COPY.updated)}</span></div></div>
          <div className={styles.heroFacts}>{[
            ['01', L('Indikation', 'Indication', 'اندیکاسیون'), L('Wann braucht es ein Bild?', 'When is a scan needed?', 'چه زمانی تصویر لازم است؟')],
            ['02', L('Bildmuster', 'Imaging patterns', 'الگوی تصویری'), L('Was ist relevant, was unspezifisch?', 'What matters, what is nonspecific?', 'کدام مهم است، کدام غیراختصاصی؟')],
            ['03', L('Entscheidung', 'Decision', 'تصمیم'), L('Was darf nicht übersehen werden?', 'What must not be missed?', 'چه چیزی نباید از دست برود؟')],
          ].map(([n, title, text]) => <div key={n}><span>{n}</span><div><strong>{c(title)}</strong><p>{c(text)}</p></div></div>)}</div>
        </div>
        <div className={styles.progressBar}><div className={styles.progressInfo}><div className={styles.progressTrack} role="progressbar" aria-label={c(COPY.path)} aria-valuenow={readSections.size} aria-valuemin={0} aria-valuemax={IDS.length}><i style={{ width: `${readSections.size / IDS.length * 100}%` }} /></div><span><bdi dir="ltr">{readSections.size} / {IDS.length}</bdi> {c(COPY.read)}</span></div><button type="button" className={styles.completeButton} aria-pressed={allRead} onClick={() => setReadSections(allRead ? new Set() : new Set(IDS))}><Check />{c(allRead ? COPY.allDone : COPY.all)}</button></div>
      </header>
      <div className={styles.mobilePath}><label htmlFor="migraine-section-select">{c(COPY.path)}</label><select id="migraine-section-select" value={openId || ''} onChange={event => navigate(event.target.value)}><option value="" disabled>{c(COPY.path)}</option>{MIGRAINE_SECTIONS.map((s, i) => <option key={s.id} value={s.id}>{String(i + 1).padStart(2, '0')} · {c(s.short)}{readSections.has(s.id) ? ' ✓' : ''}</option>)}</select></div>
      <div className={styles.layout}>
        <aside className={styles.sidebar}><h2>{c(COPY.path)}</h2><nav>{MIGRAINE_SECTIONS.map((section, i) => <button key={section.id} type="button" className={`${openId === section.id ? styles.activeNav : ''} ${section.kind === 'take-home' ? styles.finalNav : ''}`} onClick={() => navigate(section.id)} aria-current={openId === section.id ? 'location' : undefined}><span>{readSections.has(section.id) ? <Check /> : String(i + 1).padStart(2, '0')}</span><strong>{c(section.short)}</strong></button>)}</nav><p className={styles.localNote}>{c(COPY.local)}</p></aside>
        <div className={styles.lesson}>{MIGRAINE_SECTIONS.map((section, i) => <section id={section.id} key={section.id} className={`${styles.section} ${section.kind === 'take-home' ? styles.finalSection : ''}`}>
          <h2><button type="button" className={styles.sectionHeader} onClick={() => navigate(section.id, true)} aria-expanded={openId === section.id} aria-controls={`migraine-${section.id}-panel`}><span className={styles.sectionNumber}>{String(i + 1).padStart(2, '0')}</span><span><small>{c(section.short)}</small><span>{c(section.title)}</span></span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d={openId === section.id ? 'M5 12h14' : 'M5 12h14M12 5v14'} /></svg></button></h2>
          <div id={`migraine-${section.id}-panel`} className={styles.sectionBody} hidden={openId !== section.id}>
            <LessonContent section={section} lang={lang} withLang={withLang} />
            <div className={styles.sectionFooter}><button type="button" className={styles.readButton} aria-pressed={readSections.has(section.id)} onClick={() => toggleRead(section.id)}><Check />{c(readSections.has(section.id) ? COPY.marked : COPY.mark)}</button>{i < IDS.length - 1 ? <button type="button" className={styles.nextButton} onClick={() => navigate(IDS[i + 1])}>{c(COPY.continue)}<Arrow /></button> : null}</div>
          </div>
        </section>)}<div className={styles.bottomContinue}>{activeIndex >= 0 && activeIndex < IDS.length - 1 ? <button type="button" className={styles.secondaryButton} onClick={() => navigate(IDS[activeIndex + 1])}>{c(COPY.continue)}<Arrow /></button> : null}</div></div>
      </div>
    </div>
  </main>
}
