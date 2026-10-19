'use client'

import { useState } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import StandardLessonShell, { LessonSection, LessonSources } from '@/components/lesson-template/StandardLessonShell'
import { LUNG_RADS_LESSON as lesson } from '@/data/lungRadsLesson'
import styles from './page.module.css'

const L = (de, en, fa) => ({ de, en, fa })
const pick = (value, lang) => typeof value === 'string' ? value : value?.[lang] || value?.de || ''
const LABELS = {
  contents: L('Lektionsinhalt', 'Lesson contents', 'محتوای درس'), path: L('Lernpfad', 'Learning path', 'مسیر یادگیری'), progress: L('gelesen', 'read', 'خوانده‌شده'),
  continue: L('Weiter', 'Continue', 'ادامه'), completeLesson: L('Ganze Lektion als gelesen markieren', 'Mark the full lesson as read', 'علامت‌گذاری کل درس به‌عنوان خوانده‌شده'),
  lessonCompleted: L('Ganze Lektion gelesen', 'Full lesson read', 'کل درس خوانده شد'), complete: L('Abschnitt als gelesen markieren', 'Mark section as read', 'علامت‌گذاری بخش به‌عنوان خوانده‌شده'), completed: L('Gelesen', 'Read', 'خوانده‌شده'),
  open: L('Abschnitt öffnen', 'Open section', 'بازکردن بخش'), close: L('Abschnitt schließen', 'Close section', 'بستن بخش'), takeHome: L('Vier Regeln merken', 'Four rules to remember', 'چهار نکته برای یادآوری'),
}
const TITLE = L('Thorax', 'Thorax', 'قفسهٔ سینه')
function Icon({ id }) {
  const paths = { start: 'M12 3v18M3 12h18', scope: 'M4 5h16v14H4zM8 9h8M8 13h5', categories: 'M5 4h14M5 9h10M5 14h7M5 19h4', measure: 'M4 18h16M6 15l3-5 3 3 5-9', contrast: 'M5 5h6v6H5zM13 13h6v6h-6z', case: 'M4 12h16M12 4v16', summary: 'M5 5h14M5 12h14M5 19h14' }
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[id] || paths.categories}/></svg>
}
function Table({ rows, lang }) {
  return <div className={styles.tableWrap}><table><thead><tr><th scope="col">{pick(L('Kategorie / Frage', 'Category / question', 'دسته / پرسش'), lang)}</th><th scope="col">{pick(L('Bedeutung und nächster Schritt', 'Meaning and next step', 'معنا و گام بعدی'), lang)}</th></tr></thead><tbody>{rows.map(([label, value], i) => <tr key={i}><th scope="row">{pick(label, lang)}</th><td>{pick(value, lang)}</td></tr>)}</tbody></table></div>
}
function Check({ lang }) {
  const [answer, setAnswer] = useState(null)
  const item = lesson.check
  return <div className={styles.check}><h3>{pick(item.title, lang)}</h3><p>{pick(item.prompt, lang)}</p><fieldset><legend>{pick(L('Eine Antwort wählen', 'Choose one answer', 'یک پاسخ را انتخاب کنید'), lang)}</legend>{item.options.map((option, i) => <label key={i}><input type="radio" name="lung-rads-check" checked={answer === i} onChange={() => setAnswer(i)}/><span>{pick(option, lang)}</span></label>)}</fieldset>{answer !== null && <div className={styles.feedback} role="status"><strong>{pick(answer === item.answerIndex ? L('Richtig. ', 'Correct. ', 'درست است. ') : L('Noch einmal prüfen. ', 'Try again. ', 'دوباره بررسی کنید. '), lang)}</strong>{pick(answer === item.answerIndex ? item.correct : item.retry, lang)}{answer !== item.answerIndex && <button type="button" onClick={() => setAnswer(null)}>{pick(L('Erneut versuchen', 'Try again', 'تلاش دوباره'), lang)}</button>}</div>}</div>
}
export default function LungRadsPage() {
  const { lang } = useLanguage()
  const t = key => pick(LABELS[key], lang)
  const labels = Object.fromEntries(Object.keys(LABELS).map(key => [key, t(key)]))
  const path = href => lang === 'de' ? href : `${href}?lang=${lang}`
  const sections = [{ id: 'start', label: pick(L('Der Entscheidungsrahmen', 'The decision framework', 'چارچوب تصمیم‌گیری'), lang), icon: 'start' }, ...lesson.chapters.map(c => ({ id: c.id, label: pick(c.title, lang), icon: c.icon })), { id: 'case', label: pick(lesson.check.title, lang), icon: 'case' }, { id: 'take-home', label: t('takeHome'), icon: 'summary', emphasis: true }]
  const sourceTags = [L('ACR · Lung-RADS v2022', 'ACR · Lung-RADS v2022', 'ACR · Lung-RADS نسخهٔ ۲۰۲۲'), L('ACR · aktuelle Version', 'ACR · current version', 'ACR · نسخهٔ کنونی'), L('Fleischner Society · 2017', 'Fleischner Society · 2017', 'انجمن Fleischner · ۲۰۱۷')]
  const sources = lesson.references.map((item, i) => ({ tag: pick(sourceTags[i], lang), title: pick(item.label, lang), href: item.url, citation: pick(L('Originalregelwerk; Version und Anwendungsbereich beachten.', 'Primary framework; check version and scope.', 'چارچوب اصلی؛ نسخه و محدودهٔ کاربرد را بررسی کنید.'), lang) }))
  return <StandardLessonShell lessonId={lesson.id} lang={lang} title={pick(lesson.title, lang)} author="Dr. Zia"
    breadcrumbs={[{ label: 'RadYar', href: path('/') }, { label: pick(TITLE, lang), href: path('/lernen/thorax') }]}
    sections={sections} labels={labels} actions={{}} renderIcon={id => <Icon id={id}/>}
    theme={{ backgroundImage: '/andarun-galaxy-v3.png', heroImage: lesson.heroImage, heroImageOpacity: .72, accent: '#72b8c8', accentStrong: '#235f79', accentSoft: '#e4f2f7', secondary: '#9b77c6', secondaryStrong: '#62418e', heroBase: '#172c3b' }}
    heroImageAlt={pick(lesson.alt, lang)} className={styles.page} syncHashNavigation
    sources={<LessonSources title={pick(L('Quellen und Versionsstand', 'Sources and version', 'منابع و نسخه'), lang)} items={sources} note={pick(lesson.notice, lang)}/>}
  >
    <LessonSection id="start" icon="start" title={pick(L('Der Entscheidungsrahmen', 'The decision framework', 'چارچوب تصمیم‌گیری'), lang)}><div className={styles.body}><p>{pick(L('Lung-RADS v2022 ist eine versionierte Kategorie- und Managementhilfe für Screening-LDCT. Entscheide zuerst, ob der Befund aus einem Screeningprogramm oder aus diagnostischer/inzidenteller Bildgebung stammt.', 'Lung-RADS v2022 is a versioned assessment and management framework for screening LDCT. First determine whether the finding comes from a screening program or diagnostic/incidental imaging.', 'Lung-RADS نسخهٔ ۲۰۲۲ چارچوب نسخه‌دار ارزیابی و مدیریت LDCT غربالگری است. ابتدا مشخص کنید یافته مربوط به برنامهٔ غربالگری است یا تصویربرداری تشخیصی/اتفاقی.'), lang)}</p><img className={styles.diagram} src={lesson.heroImage} alt={pick(lesson.alt, lang)}/><ol className={styles.visualLegend}>{lesson.visualLegend.map((label, i) => <li key={i}><span>{i + 1}</span>{pick(label, lang)}</li>)}</ol><p className={styles.scope}>{pick(lesson.visualNote, lang)}</p></div></LessonSection>
    {lesson.chapters.map(chapter => <LessonSection key={chapter.id} id={chapter.id} icon={chapter.icon} title={pick(chapter.title, lang)}><div className={styles.body}><p>{pick(chapter.lead, lang)}</p><Table rows={chapter.rows} lang={lang}/><p className={styles.scope}>{pick(chapter.note, lang)}</p>{chapter.id === 'contrast' && <a className={styles.inlineLink} href={path('/thorax/fleischner-kriterien')}>{pick(L('Zur getrennten Lektion: inzidentelle Noduli nach Fleischner', 'Open the separate lesson: incidental nodules under Fleischner', 'درس جداگانه: ندول‌های اتفاقی بر اساس Fleischner'), lang)}</a>}<small>{pick(L('ACR Lung-RADS v2022, veröffentlicht November 2022; Quelle Thorax.pdf, PDF 14–15 / Druckseiten 13–14.', 'ACR Lung-RADS v2022, released November 2022; source Thorax.pdf, PDF pp. 14–15 / printed pp. 13–14.', 'ACR Lung-RADS نسخهٔ ۲۰۲۲، انتشار نوامبر ۲۰۲۲؛ منبع Thorax.pdf، صفحات PDF ۱۴–۱۵ / چاپی ۱۳–۱۴.'), lang)}</small></div></LessonSection>)}
    <LessonSection id="case" icon="case" title={pick(lesson.check.title, lang)}><Check lang={lang}/></LessonSection>
    <LessonSection id="take-home" icon="summary" title={t('takeHome')}><ol className={styles.rules}>{lesson.takeHome.map((item, i) => <li key={i}>{pick(item, lang)}</li>)}</ol></LessonSection>
  </StandardLessonShell>
}
