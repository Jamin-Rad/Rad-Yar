'use client'

import { useState } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import StandardLessonShell, { LessonSection, LessonSources } from '@/components/lesson-template/StandardLessonShell'
import { SPINALE_TUMOREN_GRUNDLAGEN as lesson } from '@/data/spinaleTumorenGrundlagen'
import styles from '../../infektion/page.module.css'

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
  const sections = [{ id: 'start', label: pick(lesson.intro.title, lang), icon: 'start' }, ...lesson.chapters.map(ch => ({ id: ch.id, label: pick(ch.title, lang), icon: ch.icon })), { id: 'check', label: pick(lesson.check.title, lang), icon: 'check' }, { id: 'take-home', label: tr('takeHome'), icon: 'pattern', emphasis: true }]
  const sources = [{ tag: 'PDF · S. 21–22', title: 'Wirbelsäule.pdf', citation: pick(L('Primärquelle des hier begrenzten Lerninhalts; PDF-Seiten 21–22, gedruckte Seiten 20–21.', 'Primary source for this bounded lesson; PDF pages 21–22, printed pages 20–21.', 'منبع اصلی محتوای محدود این درس؛ صفحه‌های PDF ۲۱–۲۲، شماره‌های چاپی ۲۰–۲۱.'), lang) }]
  return <StandardLessonShell lessonId={lesson.id} lang={lang} title={pick(lesson.title, lang)} author="Dr. Zia"
    breadcrumbs={[{ label: 'RadYar', href: localized('/') }, { label: pick(L('Wirbelsäule', 'Spine', 'ستون فقرات'), lang), href: localized('/lernen/wirbelsaeule') }]}
    sections={sections} labels={Object.fromEntries(Object.keys(LABELS).map(key => [key, tr(key)]))} actions={{}} renderIcon={id => <Icon id={id}/>}
    theme={{ backgroundImage: '/andarun-galaxy-v3.png', heroImage: '/educational/spinal-tumour-compartments.svg', heroImageOpacity: .6, accent: '#72b7c7', accentStrong: '#236c7d', accentSoft: '#dff2f5', secondary: '#9a79c5', secondaryStrong: '#62418e', heroBase: '#172c3b' }}
    heroImageAlt={pick(lesson.alt, lang)} className={styles.page} syncHashNavigation
    sources={<LessonSources title={pick(L('Quelle und Reichweite', 'Source and scope', 'منبع و محدوده'), lang)} items={sources} note={pick(lesson.notice, lang)}/>}
  >
    <LessonSection id="start" icon="start" title={pick(lesson.intro.title, lang)}><div className={styles.body}><p>{pick(lesson.intro.text, lang)}</p><CompartmentLegend lang={lang}/><p className={styles.scope}>{pick(lesson.notice, lang)}</p></div></LessonSection>
    {lesson.chapters.map(ch => <LessonSection key={ch.id} id={ch.id} icon={ch.icon} title={pick(ch.title, lang)}><div className={styles.body}><p>{pick(ch.lead, lang)}</p><Table rows={ch.rows} lang={lang}/><p className={styles.scope}>{pick(ch.note, lang)}</p><small>{pick(ch.source, lang)}</small></div></LessonSection>)}
    <LessonSection id="check" icon="check" title={pick(lesson.check.title, lang)}><SelfCheck lang={lang}/></LessonSection>
    <LessonSection id="take-home" icon="pattern" title={tr('takeHome')}><ol className={styles.rules}>{lesson.takeHome.map((item, i) => <li key={i}>{pick(item, lang)}</li>)}</ol></LessonSection>
  </StandardLessonShell>
}
