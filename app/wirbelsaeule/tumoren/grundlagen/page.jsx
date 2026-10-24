'use client'

import { useState } from 'react'
import { spinePracticeActions } from '@/data/spinePracticeLinks'
import { SPINE_PATTERN_QUESTIONS } from '@/data/spinePatternPractice'
import TopicAssessment from '@/components/lesson-template/TopicAssessment'
import { useLanguage } from '@/providers/LanguageProvider'
import StandardLessonShell, { LessonSection, LessonSources } from '@/components/lesson-template/StandardLessonShell'
import { SPINALE_TUMOREN_GRUNDLAGEN as lesson } from '@/data/spinaleTumorenGrundlagen'
import styles from '../../infektion/page.module.css'
import mediaStyles from './page.module.css'

const L = (de, en, fa) => ({ de, en, fa })
const pick = (value, lang) => typeof value === 'string' ? value : value?.[lang] || value?.de || ''
const LABELS = {
  contents: L('Lektionsinhalt', 'Lesson contents', 'محتوای درس'), path: L('Lernpfad', 'Learning path', 'مسیر یادگیری'),
  progress: L('gelesen', 'read', 'خوانده‌شده'), continue: L('Weiter', 'Continue', 'ادامه'),
  completeLesson: L('Ganze Lektion als gelesen markieren', 'Mark the full lesson as read', 'علامت‌گذاری کل درس به‌عنوان خوانده‌شده'),
  lessonCompleted: L('Ganze Lektion gelesen', 'Full lesson marked as read', 'کل درس خوانده شد'),
  complete: L('Abschnitt als gelesen markieren', 'Mark section as read', 'علامت‌گذاری بخش به‌عنوان خوانده‌شده'),
  completed: L('Gelesen', 'Read', 'خوانده‌شده'), open: L('Abschnitt öffnen', 'Open section', 'بازکردن بخش'),
  close: L('Abschnitt schließen', 'Close section', 'بستن بخش'), takeHome: L('Drei Regeln merken', 'Three rules to remember', 'سه نکته برای یادآوری'),
}

function Icon({ id }) {
  const paths = { start: 'M12 3v18M3 12h18', compartments: 'M4 4h16v16H4zM8 8h8v8H8z', bone: 'M5 8c-2-2 1-5 3-3 2-2 5-2 7 0 2-2 5 1 3 3l-2 2 2 2c2 2-1 5-3 3-2 2-5 2-7 0-2 2-5-1-3-3l2-2z', pattern: 'M4 6h16M4 12h16M4 18h16', check: 'M4 12h16' }
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[id] || paths.pattern}/></svg>
}

function Table({ rows, lang }) {
  return <div className={styles.tableWrap}><table><thead><tr><th scope="col">{pick(L('Lage / Muster', 'Location / pattern', 'محل / الگو'), lang)}</th><th scope="col">{pick(L('Einordnung laut PDF', 'Description in the PDF', 'توصیف بر اساس PDF'), lang)}</th></tr></thead><tbody>{rows.map(([label, value], i) => <tr key={i}><th scope="row">{pick(label, lang)}</th><td>{pick(value, lang)}</td></tr>)}</tbody></table></div>
}

function CompartmentLegend({ lang }) {
  const items = [
    { color: '#b43d67', label: L('im Myelon (intramedullär)', 'within the cord (intramedullary)', 'درون طناب نخاعی (داخل‌مدولاری)') },
    { color: '#e58b28', label: L('im Duralsack, außerhalb des Myelons (intradural-extramedullär)', 'inside the dural sac, outside the cord (intradural-extramedullary)', 'داخل کیسهٔ دورال، خارج از طناب نخاعی (داخل‌دورال ـ خارج‌مدولاری)') },
    { color: '#3978b6', label: L('außerhalb des Duralsacks, innerhalb des knöchernen Spinalkanals (extradural)', 'outside the dural sac, inside the bony canal (extradural)', 'خارج از کیسهٔ دورال، داخل کانال استخوانی (خارج‌دورال)') },
  ]
  return <ul style={{ display: 'grid', gap: '.5rem', margin: 0, paddingInlineStart: '1.25rem', lineHeight: 1.65 }}>{items.map(item => <li key={item.color}><span aria-hidden="true" style={{ display: 'inline-block', width: '.7rem', height: '.7rem', borderRadius: '50%', background: item.color, marginInlineEnd: '.5rem' }}/>{pick(item.label, lang)}</li>)}</ul>
}

function SelfCheck({ lang }) {
  const [answer, setAnswer] = useState(null)
  const item = lesson.check
  return <div className={styles.decision}><h3>{pick(item.title, lang)}</h3><p>{pick(item.prompt, lang)}</p>
    <fieldset><legend>{pick(L('Eine Antwort wählen', 'Choose one answer', 'یک پاسخ انتخاب کنید'), lang)}</legend>{item.options.map((option, i) => <label key={i}><input type="radio" name="spinal-tumour-compartment-check" checked={answer === i} onChange={() => setAnswer(i)}/><span>{pick(option, lang)}</span></label>)}</fieldset>
    {answer !== null ? <div className={styles.feedback} role="status"><strong>{pick(answer === item.answerIndex ? L('Richtig. ', 'Correct. ', 'درست است. ') : L('Noch einmal prüfen. ', 'Try again. ', 'دوباره بررسی کنید. '), lang)}</strong>{pick(item.feedback, lang)}</div> : null}
  </div>
}

export default function SpinaleTumorenGrundlagenPage() {
  const { lang } = useLanguage()
  const tr = key => pick(LABELS[key], lang)
  const localized = path => lang === 'de' ? path : `${path}?lang=${lang}`
  const withLang = href => lang === 'de' ? href : `${href}${href.includes('?') ? '&' : '?'}lang=${lang}`
  const topicReturn = encodeURIComponent(`${localized('/wirbelsaeule/tumoren/grundlagen')}#signal-patterns`)
  const actions = spinePracticeActions(lesson.id, '/wirbelsaeule/tumoren/grundlagen', lang)
  const sections = [{ id: 'start', label: pick(lesson.intro.title, lang), icon: 'start' }, ...lesson.chapters.map(ch => ({ id: ch.id, label: pick(ch.title, lang), icon: ch.icon })), { id: 'check', label: pick(lesson.check.title, lang), icon: 'check' }, { id: 'take-home', label: tr('takeHome'), icon: 'pattern', emphasis: true }]
  const sources = [{ tag: 'PDF · S. 21–22', title: 'Wirbelsäule.pdf', citation: pick(L('Primärquelle des hier begrenzten Lerninhalts; PDF-Seiten 21–22, gedruckte Seiten 20–21.', 'Primary source for this bounded lesson; PDF pages 21–22, printed pages 20–21.', 'منبع اصلی محتوای محدود این درس؛ صفحه‌های PDF ۲۱–۲۲، شماره‌های چاپی ۲۰–۲۱.'), lang) }]
  sources.push({ title: 'Tang et al. · Spinal epidermoid versus arachnoid cyst (2006)', href: 'https://pubmed.ncbi.nlm.nih.gov/16778630/', citation: 'J Comput Assist Tomogr. 2006;30:507–509. doi:10.1097/00004728-200605000-00026.' })
  return <StandardLessonShell lessonId={lesson.id} lang={lang} title={pick(lesson.title, lang)} author="Dr. Zia"
    breadcrumbs={[{ label: 'RadYar', href: localized('/') }, { label: pick(L('Wirbelsäule', 'Spine', 'ستون فقرات'), lang), href: localized('/lernen/wirbelsaeule') }]}
    sections={sections} labels={Object.fromEntries(Object.keys(LABELS).map(key => [key, tr(key)]))} actions={actions} renderIcon={id => <Icon id={id}/>}
    theme={{ backgroundImage: '/andarun-galaxy-v3.png', heroImage: '/educational/spinal-tumour-compartments.svg', heroImageOpacity: .6, accent: '#72b7c7', accentStrong: '#236c7d', accentSoft: '#dff2f5', secondary: '#9a79c5', secondaryStrong: '#62418e', heroBase: '#172c3b' }}
    heroImageAlt={pick(lesson.alt, lang)} className={styles.page} syncHashNavigation
    sources={<LessonSources title={pick(L('Quelle und Reichweite', 'Source and scope', 'منبع و محدوده'), lang)} items={sources} note={pick(lesson.notice, lang)}/>}
  >
    <LessonSection id="start" icon="start" title={pick(lesson.intro.title, lang)}><div className={styles.body}><p>{pick(lesson.intro.text, lang)}</p><CompartmentLegend lang={lang}/><p className={styles.scope}>{pick(lesson.notice, lang)}</p></div></LessonSection>
    {lesson.chapters.map(ch => <LessonSection key={ch.id} id={ch.id} icon={ch.icon} title={pick(ch.title, lang)}><div className={styles.body}><p>{pick(ch.lead, lang)}</p><Table rows={ch.rows} lang={lang}/>{ch.id === 'ivory-vertebra' ? <><div className={mediaStyles.caseGrid}>{lesson.ivoryFigures.map((figure, index) => <figure key={figure.src} className={mediaStyles.caseFigure}><img src={figure.src} alt={pick(figure.alt, lang)} width={index === 0 ? 176 : 218} height="250"/><figcaption>{pick(figure.caption, lang)}</figcaption></figure>)}</div><p className={styles.scope}>{pick(L('Bildquelle: Zuschnitte der beiden unveränderten Radiographien aus Wirbelsäule.pdf, PDF S. 21 (gedruckte S. 20); die Quellseite nennt Radiopaedia rID 25354 und 96568. Die Seitenbeschriftungen A/B und der sichtbare Bildinhalt bleiben erhalten.', 'Image source: crops of the two unchanged radiographs in Wirbelsäule.pdf, PDF p. 21 (printed p. 20); the source page lists Radiopaedia rIDs 25354 and 96568. The A/B labels and visible image content are retained.', 'منبع تصویر: برش‌هایی از دو رادیوگرافی بدون تغییر در Wirbelsäule.pdf، صفحهٔ PDF ۲۱ (شمارهٔ چاپی ۲۰)؛ صفحهٔ منبع شناسه‌های Radiopaedia rID 25354 و 96568 را ذکر می‌کند. برچسب‌های A/B و محتوای تصویری قابل مشاهده حفظ شده‌اند.'), lang)}</p></> : null}{ch.id === 'signal-patterns' ? <><h3>{pick(L('Fallbeispiele: intramedulläre Läsionen', 'Case examples: intramedullary lesions', 'نمونه‌های موردی: ضایعات داخل‌مدولاری'), lang)}</h3><div className={mediaStyles.caseGrid}>{lesson.intramedullaryFigures.map(figure => <figure key={figure.src} className={mediaStyles.caseFigure}><img src={figure.src} alt={pick(figure.alt, lang)} width="630" height="630" loading="lazy"/><figcaption><a href={figure.href} target="_blank" rel="noreferrer">{pick(figure.caption, lang)}</a></figcaption></figure>)}</div><p className={styles.scope}>{pick(L('Radiopaedia-Bildquellen: Fallseiten von Frank Gaillard (Ependymom, rID 19319) und Joe Cyriac (pilozystisches Astrozytom, rID 152705). Verwendet wird jeweils das sagittale T2-Bild; beide Bilder sind lokal gespeichert und mit ausdrücklicher Nutzerfreigabe eingebunden. Die Einzelbeispiele illustrieren Befunde, sie ersetzen keine kombinierte Befundung.', 'Radiopaedia image sources: case pages by Frank Gaillard (ependymoma, rID 19319) and Joe Cyriac (pilocytic astrocytoma, rID 152705). The sagittal T2 image is used in each case; both images are stored locally and included with the user’s explicit permission. The individual examples illustrate findings; they do not replace combined interpretation.', 'منابع تصاویر رادیوپدیا: صفحات مورد از Frank Gaillard (اپاندیموم، rID 19319) و Joe Cyriac (آستروسیتوم پیلوسیتیک، rID 152705). در هر مورد تصویر ساجیتال T2 استفاده شده؛ هر دو تصویر به‌صورت محلی ذخیره شده‌اند و با اجازهٔ صریح کاربر درج شده‌اند. این نمونه‌های جداگانه یافته‌ها را نشان می‌دهند و جایگزین تفسیر ترکیبی نیستند.'), lang)}</p></> : null}{ch.id === 'signal-patterns' ? <TopicAssessment key={lang} question={SPINE_PATTERN_QUESTIONS[lang][0]} topic="epidermoid-spinal" lang={lang} fach="wirbelsaeule" returnTo={`/wirbelsaeule/tumoren/grundlagen?lang=${lang}#signal-patterns`} /> : null}<p className={styles.scope}>{pick(ch.note, lang)}</p><small>{pick(ch.source, lang)}</small></div></LessonSection>)}
    <nav className={mediaStyles.assessmentLinks} aria-label={pick(L('Lernkarten zu spinalen Tumoren', 'Spinal tumour flashcards', 'فلش‌کارت‌های تومورهای نخاعی'), lang)}>
      <a href={withLang(`/ueben/quiz?fach=msk&n=2&themen=astrozytom-spinal,ependymom-spinal,meningeom-spinal,schwannom-neurofibrom-spinal&from=${topicReturn}`)}>{pick(L('Tumorarten vergleichen: MC-Fragen', 'Compare tumour types: MCQs', 'مقایسهٔ انواع تومور: سؤال‌های چندگزینه‌ای'), lang)}</a>
      <a href={withLang(`/flashcards/astrozytom-spinal?from=${topicReturn}`)}>{pick(L('Flashcard: spinales Astrozytom', 'Flashcard: spinal astrocytoma', 'فلش‌کارت: آستروسیتوم نخاعی'), lang)}</a>
      <a href={withLang(`/flashcards/ependymom-spinal?from=${topicReturn}`)}>{pick(L('Flashcard: spinales Ependymom', 'Flashcard: spinal ependymoma', 'فلش‌کارت: اپاندیموم نخاعی'), lang)}</a>
      <a href={withLang(`/flashcards/meningeom-spinal?from=${topicReturn}`)}>{pick(L('Flashcard: spinales Meningeom', 'Flashcard: spinal meningioma', 'فلش‌کارت: مننژیوم نخاعی'), lang)}</a>
      <a href={withLang(`/flashcards/schwannom-neurofibrom-spinal?from=${topicReturn}`)}>{pick(L('Flashcard: spinales Schwannom', 'Flashcard: spinal schwannoma', 'فلش‌کارت: شوانومای نخاعی'), lang)}</a>
    </nav>
    <LessonSection id="check" icon="check" title={pick(lesson.check.title, lang)}><SelfCheck key={lang} lang={lang}/></LessonSection>
    <LessonSection id="take-home" icon="pattern" title={tr('takeHome')}><ol className={styles.rules}>{lesson.takeHome.map((item, i) => <li key={i}>{pick(item, lang)}</li>)}</ol></LessonSection>
  </StandardLessonShell>
}
