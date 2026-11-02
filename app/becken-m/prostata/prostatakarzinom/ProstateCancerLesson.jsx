'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import { usePersistedSectionProgress } from '@/hooks/usePersistedSectionProgress'
import { PROSTATE_TITLE, PROSTATE_PATH, PROSTATE_SECTIONS, PROSTATE_SOURCES, PROSTATE_CASES, PROSTATE_QUIZ } from '@/data/prostateCancer'
import { ZoneDiagram, PiradsTrainer, MriExamples } from './ProstateTools'
import { useLessonReadStatus } from '@/hooks/useLessonReadStatus'
import styles from './page.module.css'

const L = (de, en, fa) => ({ de, en, fa })
const pick = (value, lang) => typeof value === 'string' ? value : value[lang] || value.de
const IDS = PROSTATE_SECTIONS.map(s => s.id)
const COPY = {
  head: L('Becken – Mann', 'Pelvis – male', 'لگن مردان'), chapter: L('Prostata', 'Prostate', 'پروستات'),
  subtitle: L('Von der Zone zum Zielherd: mpMRT, PI-RADS v2.1, lokale Ausbreitung und ein klarer Befund.', 'From zone to target: mpMRI, PI-RADS v2.1, local spread and a clear report.', 'از زون تا ضایعه هدف: mpMRI، ‏PI-RADS v2.1، گسترش موضعی و گزارش روشن.'),
  eyebrow: L('Uroradiologie · Prostata', 'Uroradiology · Prostate', 'اورورادیولوژی · پروستات'),
  updated: L('Quellen geprüft: 02.11.2026', 'Sources checked: 2 Nov 2026', 'بازبینی منابع: ۲ نوامبر ۲۰۲۶'),
  duration: L('ca. 40 Min. · 14 Abschnitte', 'About 40 min · 14 sections', 'حدود ۴۰ دقیقه · ۱۴ بخش'),
  path: L('Lernpfad', 'Learning path', 'مسیر یادگیری'), read: L('gelesen', 'read', 'خوانده‌شده'),
  mark: L('Abschnitt als gelesen markieren', 'Mark section as read', 'علامت‌گذاری بخش به‌عنوان خوانده‌شده'),
  marked: L('Abschnitt gelesen', 'Section read', 'بخش خوانده شد'),
  all: L('Ganze Lektion als gelesen markieren', 'Mark full lesson as read', 'علامت‌گذاری کل درس به‌عنوان خوانده‌شده'),
  allDone: L('Ganze Lektion gelesen', 'Full lesson read', 'کل درس خوانده شد'),
  continue: L('Weiter im Lernpfad', 'Continue learning', 'ادامه مسیر یادگیری'),
  local: L('Lesefortschritt auf diesem Gerät gespeichert', 'Reading progress saved on this device', 'پیشرفت مطالعه روی این دستگاه ذخیره می‌شود'),
  key: L('Merke', 'Remember', 'نکته کلیدی'), warning: L('Klinische Priorität', 'Clinical priority', 'اولویت بالینی'),
  sources: L('Quellen', 'Sources', 'منابع'), related: L('Vertiefen', 'Explore further', 'مطالعه بیشتر'),
  mcq: L('12 MCQ üben', 'Practise 12 MCQs', 'تمرین ۱۲ سؤال'), cards: L('12 Flashcards', '12 flashcards', '۱۲ فلش‌کارت'),
  goalsTitle: L('Nach dieser Lektion kannst du …', 'After this lesson you can …', 'پس از این درس می‌توانید …'),
  goals: [L('PZ und TZ sicher lokalisieren und unterschiedlich bewerten.', 'Localise PZ and TZ and apply their different scoring rules.', 'PZ و TZ را مکان‌یابی و قواعد متفاوت آن‌ها را اعمال کنید.'), L('PI-RADS von Histologie und lokalem Staging trennen.', 'Separate PI-RADS from histology and local staging.', 'PI-RADS را از بافت‌شناسی و مرحله‌بندی موضعی تفکیک کنید.'), L('EPE/SVI prüfen und einen biopsietauglichen Befund schreiben.', 'Assess EPE/SVI and write a report that guides biopsy.', 'EPE/SVI را ارزیابی و گزارشی راهنما برای بیوپسی بنویسید.')],

}

function Arrow() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" /></svg>
}

function Check() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="m5 12 4 4L19 6" /></svg>
}

function SourceLinks({ ids, lang }) {
  return <div className={styles.citations}><span>{pick(COPY.sources, lang)}:</span>{ids.map(id => {
    const source = PROSTATE_SOURCES.find(s => s.id === id)
    return <a key={id} href={source.url} target="_blank" rel="noopener noreferrer" lang="en" dir="ltr">{source.title}</a>
  })}</div>
}

function Callout({ warning = false, lang, children }) {
  return <aside className={`${styles.callout} ${warning ? styles.warning : ''}`}><strong>{pick(warning ? COPY.warning : COPY.key, lang)}</strong><p>{children}</p></aside>
}

function CasePractice({ lang }) {
  const [selected, setSelected] = useState('pz')
  const [revealed, setRevealed] = useState(false)
  const c = value => pick(value, lang)
  const active = PROSTATE_CASES.find(item => item.id === selected)
  return <div className={styles.casePractice}>
    <div className={styles.toolHeader}><span>01 / {c(L('Falltraining', 'Case practice', 'تمرین کیس'))}</span><h3>{c(L('Welche Kategorie, welcher nächste Schritt?', 'Which category, which next step?', 'کدام دسته و کدام قدم بعدی؟'))}</h3><p>{c(L('Drei fiktive Lehrfälle. Erst entscheiden, dann die Begründung öffnen.', 'Three fictional teaching cases. Decide first, then reveal the reasoning.', 'سه کیس آموزشی فرضی. ابتدا تصمیم بگیرید، سپس توضیح را ببینید.'))}</p></div>
    <fieldset className={styles.caseChoices}><legend className={styles.srOnly}>{c(L('Lehrfall auswählen', 'Choose a teaching case', 'انتخاب کیس آموزشی'))}</legend>{PROSTATE_CASES.map(item => <label key={item.id} className={selected === item.id ? styles.caseSelected : ''}><input type="radio" name="prostate-case" value={item.id} checked={selected === item.id} onChange={() => { setSelected(item.id); setRevealed(false) }} /><span>{c(item.label)}</span></label>)}</fieldset>
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
  const score = PROSTATE_QUIZ.filter(q => checked[q.id] && answers[q.id] === q.correct).length
  return <div className={styles.quiz}>
    <div className={styles.toolHeader}><span>02 / {c(L('Mini-Check', 'Mini-check', 'آزمون کوتاه'))}</span><h3>{c(L('Zwölf Entscheidungen, die sitzen sollten', 'Twelve decisions to remember', 'دوازده تصمیمی که باید بدانید'))}</h3><p aria-live="polite"><bdi dir="ltr">{total} / {PROSTATE_QUIZ.length}</bdi> {c(L('geprüft', 'checked', 'بررسی‌شده'))} · {score} {c(L('richtig', 'correct', 'درست'))}</p></div>
    {PROSTATE_QUIZ.map((q, index) => <div key={q.id} className={styles.question}>
      <fieldset><legend><span>{String(index + 1).padStart(2, '0')}</span>{c(q.question)}</legend>
        <div className={styles.options}>{q.options.map((option, i) => <label key={i} className={answers[q.id] === i ? styles.optionSelected : ''}><input type="radio" name={`prostate-question-${q.id}`} checked={answers[q.id] === i} onChange={() => { setAnswers(prev => ({ ...prev, [q.id]: i })); setChecked(prev => { const next = { ...prev }; delete next[q.id]; return next }) }} /><span>{c(option)}</span></label>)}</div>
      </fieldset>
      <button type="button" className={styles.checkButton} disabled={answers[q.id] === undefined || !!checked[q.id]} onClick={() => setChecked(prev => ({ ...prev, [q.id]: true }))}>{c(L('Antwort prüfen', 'Check answer', 'بررسی پاسخ'))}</button>
      {checked[q.id] ? <div className={`${styles.feedback} ${answers[q.id] !== q.correct ? styles.feedbackWrong : ''}`} role="status"><strong>{c(answers[q.id] === q.correct ? L('Richtig.', 'Correct.', 'درست است.') : L('Noch nicht. Richtige Antwort:', 'Not quite. Correct answer:', 'درست نیست. پاسخ صحیح:'))} {answers[q.id] !== q.correct ? c(q.options[q.correct]) : ''}</strong><p>{c(q.explanation)}</p></div> : null}
    </div>)}
    {total === PROSTATE_QUIZ.length ? <div className={styles.quizSummary} role="status"><strong>{c(L('Mini-Check abgeschlossen', 'Mini-check complete', 'آزمون کوتاه تمام شد'))} · <bdi dir="ltr">{score} / {PROSTATE_QUIZ.length}</bdi></strong><button type="button" className={styles.checkButton} onClick={() => { setAnswers({}); setChecked({}) }}>{c(L('Erneut üben', 'Practise again', 'تمرین دوباره'))}</button></div> : null}
  </div>
}

function LessonContent({ section, lang, withLang }) {
  const c = value => pick(value, lang)
  if (section.kind === 'training') return <><CasePractice lang={lang} /><MiniQuiz lang={lang} /></>
  if (section.kind === 'take-home') return <ol className={styles.takeHome}>{section.points.map((point, i) => <li key={i}><span>{String(i + 1).padStart(2, '0')}</span><strong>{c(point)}</strong></li>)}</ol>
  if (section.kind === 'sources') return <><p className={styles.lead}>{c(L('Stand der Quellenprüfung: 2. November 2026. Die Jahreszahl der jeweiligen Leitlinie bleibt sichtbar; ein neues Abrufdatum bedeutet keine neue Leitlinienversion. Protokoll und Fallbeispiele sind eine didaktische Synthese, kein validierter Entscheidungsrechner.', 'Sources checked on 2 November 2026. Each guideline retains its publication year; a new access date does not imply a new edition. The protocol and cases are educational synthesis, not a validated decision calculator.', 'منابع در ۲ نوامبر ۲۰۲۶ بررسی شدند. سال انتشار هر راهنما مشخص است؛ تاریخ بازبینی جدید به معنی نسخه جدید راهنما نیست. پروتکل و کیس‌ها جمع‌بندی آموزشی‌اند، نه ابزار تصمیم‌گیری اعتبارسنجی‌شده.'))}</p><ol className={styles.sourceList}>{PROSTATE_SOURCES.map(source => <li key={source.id}><a href={source.url} target="_blank" rel="noopener noreferrer" lang="en" dir="ltr">{source.title}<Arrow /></a><p>{c(source.note)}</p></li>)}</ol></>
  return <>
    {section.lead ? <p className={styles.lead}>{c(section.lead)}</p> : null}
    {section.id === 'grundlagen' ? <div className={styles.goals}><h3>{c(COPY.goalsTitle)}</h3><ul>{COPY.goals.map((g, i) => <li key={i}>{c(g)}</li>)}</ul></div> : null}
    {section.cards ? <div className={styles.learningRows}>{section.cards.map((card, i) => <div className={styles.learningRow} key={i}><span className={styles.rowNumber}>{String(i + 1).padStart(2, '0')}</span><div><h3>{c(card.title)}</h3><p>{c(card.text)}</p></div></div>)}</div> : null}
    {section.id === 'anatomie' ? <ZoneDiagram lang={lang} /> : null}
    {section.id === 'bildmuster' ? <MriExamples lang={lang} /> : null}
    {section.id === 'pirads' ? <PiradsTrainer lang={lang} /> : null}
    {section.rows ? <div className={styles.tableWrap} role="region" aria-label={c(section.short)} tabIndex={0}><table><caption className={styles.srOnly}>{c(section.title)}</caption><thead><tr>{section.headers.map((h, i) => <th key={i} scope="col">{c(h)}</th>)}</tr></thead><tbody>{section.rows.map((row, r) => <tr key={r}>{row.map((cell, col) => col === 0 ? <th key={col} scope="row">{c(cell)}</th> : <td key={col}>{c(cell)}</td>)}</tr>)}</tbody></table></div> : null}
    {section.headers?.length > 2 ? <p className={styles.tableHint}>{c(L('Tabelle seitlich bewegen, um alle Spalten zu sehen.', 'Scroll the table sideways to see all columns.', 'برای دیدن همه ستون‌ها، جدول را افقی حرکت دهید.'))}</p> : null}
    {section.reports ? section.reports.map((report, i) => <div className={styles.report} key={i}><h3>{c(report.title)}</h3><blockquote>{c(report.text)}</blockquote></div>) : null}
    {section.warning ? <Callout warning lang={lang}>{c(section.warning)}</Callout> : null}
    {section.note ? <Callout lang={lang}>{c(section.note)}</Callout> : null}
    {section.related ? <nav className={styles.related} aria-label={c(COPY.related)}><span>{c(COPY.related)}</span>{section.related.map(link => <Link key={link.path} href={withLang(link.path)}>{c(link.label)}<Arrow /></Link>)}</nav> : null}
    {section.sources ? <SourceLinks ids={section.sources} lang={lang} /> : null}
  </>
}

export default function ProstateCancerLesson() {
  const { lang } = useLanguage()
  const [openId, setOpenId] = useState('grundlagen')
  const { isRead, toggleRead: toggleLessonRead, authError } = useLessonReadStatus('prostatakarzinom')
  const [readSections, setReadSections] = usePersistedSectionProgress('prostatakarzinom', IDS, isRead)
  const c = value => pick(value, lang)
  const withLang = path => lang === 'de' ? path : `${path}${path.includes('?') ? '&' : '?'}lang=${lang}`
  const allRead = isRead
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
  const toggleRead = id => {
    if (isRead && !toggleLessonRead()) return
    setReadSections(prev => { const next = new Set(prev); if (next.has(id)) next.delete(id); else next.add(id); return next })
  }

  return <main className={styles.page} data-lesson-progress-managed="true" dir={lang === 'fa' ? 'rtl' : 'ltr'} lang={lang}>
    <div className={styles.shell}>
      <header className={styles.header}>
        <nav className={styles.breadcrumb} aria-label={c(L('Seitennavigation', 'Breadcrumb', 'مسیر صفحه'))}><Link href={withLang('/')}>RadYar</Link><span>/</span><Link href={withLang('/lernen/becken-m')}>{c(COPY.head)}</Link><span>/</span><span>{c(COPY.chapter)}</span><span>/</span><strong>{c(PROSTATE_TITLE)}</strong></nav>
        <div className={styles.hero}>
          <div className={styles.heroCopy}><p className={styles.eyebrow}>{c(COPY.eyebrow)}</p><h1>{c(PROSTATE_TITLE)}</h1><p className={styles.subtitle}>{c(COPY.subtitle)}</p><div className={styles.actions}><Link className={styles.primaryButton} href={withLang(`/ueben/quiz?fach=becken-m&n=12&themen=prostatakarzinom&from=${encodeURIComponent(withLang(PROSTATE_PATH))}`)}>{c(COPY.mcq)}<Arrow /></Link><Link className={styles.secondaryButton} href={withLang(`/flashcards/prostatakarzinom?from=${encodeURIComponent(withLang(PROSTATE_PATH))}`)}>{c(COPY.cards)}<Arrow /></Link></div><div className={styles.meta}><span>{c(COPY.duration)}</span><span>{c(COPY.updated)}</span></div></div>
          <div className={styles.heroFacts}>{[
            ['PZ', L('Diffusion', 'Diffusion', 'دیفیوژن'), L('DWI / ADC führen.', 'DWI / ADC lead.', 'DWI / ADC غالب‌اند.')],
            ['TZ', L('Morphologie', 'Morphology', 'مورفولوژی'), L('T2 gibt die Richtung vor.', 'T2 leads the way.', 'T2 مسیر را تعیین می‌کند.')],
            ['TNM', L('Ausbreitung', 'Extent', 'گسترش'), L('EPE, SVI, Lymphknoten, Knochen.', 'EPE, SVI, nodes, bones.', 'EPE، SVI، گره‌ها و استخوان.')],
          ].map(([n, title, text]) => <div key={n}><span>{n}</span><div><strong>{c(title)}</strong><p>{c(text)}</p></div></div>)}</div>
        </div>
        <div className={styles.progressBar}><div className={styles.progressInfo}><div className={styles.progressTrack} role="progressbar" aria-label={c(COPY.path)} aria-valuenow={readSections.size} aria-valuemin={0} aria-valuemax={IDS.length}><i style={{ width: `${readSections.size / IDS.length * 100}%` }} /></div><span><bdi dir="ltr">{readSections.size} / {IDS.length}</bdi> {c(COPY.read)}</span></div><button type="button" className={styles.completeButton} aria-pressed={allRead} onClick={() => { if (toggleLessonRead() && isRead) setReadSections(new Set()) }}><Check />{c(allRead ? COPY.allDone : COPY.all)}</button></div>
        {authError ? <p className={styles.authMessage} role="status">{c(L('Zum Speichern der ganzen Lektion bitte anmelden. Einzelne Abschnitte werden lokal gespeichert.', 'Sign in to save full lesson completion. Section progress is saved locally.', 'برای ذخیره خواندن کل درس وارد شوید. پیشرفت بخش‌ها روی دستگاه ذخیره می‌شود.'))} <Link href="/sign-in">{c(L('Anmelden', 'Sign in', 'ورود'))}</Link></p> : null}
      </header>
      <div className={styles.mobilePath}><label htmlFor="prostate-section-select">{c(COPY.path)}</label><select id="prostate-section-select" value={openId || ''} onChange={event => navigate(event.target.value)}><option value="" disabled>{c(COPY.path)}</option>{PROSTATE_SECTIONS.map((s, i) => <option key={s.id} value={s.id}>{String(i + 1).padStart(2, '0')} · {c(s.short)}{readSections.has(s.id) ? ' ✓' : ''}</option>)}</select></div>
      <div className={styles.layout}>
        <aside className={styles.sidebar}><h2>{c(COPY.path)}</h2><nav>{PROSTATE_SECTIONS.map((section, i) => <button key={section.id} type="button" className={`${openId === section.id ? styles.activeNav : ''} ${section.kind === 'take-home' ? styles.finalNav : ''}`} onClick={() => navigate(section.id)} aria-current={openId === section.id ? 'location' : undefined}><span>{readSections.has(section.id) ? <Check /> : String(i + 1).padStart(2, '0')}</span><strong>{c(section.short)}</strong></button>)}</nav><p className={styles.localNote}>{c(COPY.local)}</p></aside>
        <div className={styles.lesson}>{PROSTATE_SECTIONS.map((section, i) => <section id={section.id} key={section.id} className={`${styles.section} ${section.kind === 'take-home' ? styles.finalSection : ''}`}>
          <h2><button type="button" className={styles.sectionHeader} onClick={() => navigate(section.id, true)} aria-expanded={openId === section.id} aria-controls={`prostate-${section.id}-panel`}><span className={styles.sectionNumber}>{String(i + 1).padStart(2, '0')}</span><span><small>{c(section.short)}</small><span>{c(section.title)}</span></span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d={openId === section.id ? 'M5 12h14' : 'M5 12h14M12 5v14'} /></svg></button></h2>
          <div id={`prostate-${section.id}-panel`} className={styles.sectionBody} hidden={openId !== section.id}>
            <LessonContent section={section} lang={lang} withLang={withLang} />
            <div className={styles.sectionFooter}><button type="button" className={styles.readButton} aria-pressed={readSections.has(section.id)} onClick={() => toggleRead(section.id)}><Check />{c(readSections.has(section.id) ? COPY.marked : COPY.mark)}</button>{i < IDS.length - 1 ? <button type="button" className={styles.nextButton} onClick={() => navigate(IDS[i + 1])}>{c(COPY.continue)}<Arrow /></button> : null}</div>
          </div>
        </section>)}<div className={styles.bottomContinue}>{activeIndex >= 0 && activeIndex < IDS.length - 1 ? <button type="button" className={styles.secondaryButton} onClick={() => navigate(IDS[activeIndex + 1])}>{c(COPY.continue)}<Arrow /></button> : null}</div></div>
      </div>
    </div>
  </main>
}
