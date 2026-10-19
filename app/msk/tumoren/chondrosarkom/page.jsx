'use client'

import { useState } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import StandardLessonShell, { LessonSection, LessonSources } from '@/components/lesson-template/StandardLessonShell'
import { CHONDROSARKOM_LESSON as lesson } from '@/data/chondrosarkomLesson'
import styles from './page.module.css'

const L = (de, en, fa) => ({ de, en, fa })
const pick = (value, lang) => value?.[lang] ?? value?.de ?? value
function Icon({ id }) {
  const paths = { pattern: 'M4 18h16M6 15l3-5 3 3 5-8 2 3', imaging: 'M4 4h16v16H4zM7 15l3-4 2 2 4-6 2 8', case: 'M5 4h14v16H5zM8 9h8M8 13h8M8 17h5', check: 'm4 12 5 5L20 6' }
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[id] || paths.pattern} /></svg>
}
function Check({ lang }) {
  const t = value => pick(value, lang)
  const [answer, setAnswer] = useState(null)
  return <div className={styles.check}>
    <h3>{t(L('Selbstcheck: Befund und Schlussfolgerung trennen', 'Self-check: separate finding from conclusion', 'خودآزمایی: یافته را از نتیجه‌گیری جدا کنید'))}</h3>
    <p>{t(lesson.case.question)}</p>
    <fieldset><legend>{t(L('Eine Antwort auswählen', 'Choose one answer', 'یک پاسخ انتخاب کنید'))}</legend>{lesson.case.options.map((option, index) => <label key={index}><input type="radio" name="chondrosarcoma-check" checked={answer === index} onChange={() => setAnswer(index)} /><span>{t(option)}</span></label>)}</fieldset>
    {answer !== null && <p role="status" className={`${styles.feedback} ${answer === lesson.case.answer ? styles.correct : ''}`}><strong>{answer === lesson.case.answer ? t(L('Richtig. ', 'Correct. ', 'درست است. ')) : t(L('Bitte erneut prüfen. ', 'Review the case again. ', 'کیس را دوباره بررسی کنید. '))}</strong>{t(lesson.case.feedback)}</p>}
  </div>
}
function Table({ lang }) {
  const t = value => pick(value, lang)
  return <div className={styles.tableWrap} role="region" tabIndex={0} aria-label={t(L('Modalitätenvergleich, horizontal scrollbar falls nötig', 'Modality comparison, horizontally scrollable if needed', 'مقایسهٔ روش‌ها؛ در صورت نیاز پیمایش افقی'))}>
    <table><caption>{t(L('Bildgebende Aufgaben nach Modalität', 'Imaging roles by modality', 'نقش روش‌های تصویربرداری'))}</caption><thead><tr><th scope="col">{t(L('Methode', 'Modality', 'روش'))}</th><th scope="col">{t(L('Worauf achten?', 'What to assess', 'به چه چیزی توجه کنیم؟'))}</th></tr></thead><tbody>{lesson.modalityRows.map((row, index) => <tr key={index}><th scope="row">{t(row[0])}</th><td>{t(row[1])}</td></tr>)}</tbody></table>
  </div>
}

export default function ChondrosarkomPage() {
  const { lang } = useLanguage()
  const t = value => pick(value, lang)
  const labels = {
    path: t(L('Lernweg', 'Learning path', 'مسیر یادگیری')), contents: t(L('Inhalt', 'Contents', 'فهرست')),
    progress: t(L('gelesen', 'read', 'خوانده‌شده')), continue: t(L('Weiterlernen', 'Continue learning', 'ادامهٔ یادگیری')),
    completeLesson: t(L('Ganze Lektion als gelesen markieren', 'Mark full lesson as read', 'علامت‌گذاری کل درس به‌عنوان خوانده‌شده')),
    lessonCompleted: t(L('Ganze Lektion gelesen', 'Full lesson marked as read', 'کل درس خوانده شد')),
    complete: t(L('Abschnitt als gelesen markieren', 'Mark section as read', 'علامت‌گذاری بخش به‌عنوان خوانده‌شده')),
    completed: t(L('Als gelesen markiert', 'Marked as read', 'خوانده‌شده')), open: t(L('Abschnitt öffnen', 'Open section', 'بازکردن بخش')),
    close: t(L('Schließen', 'Close', 'بستن')), takeHome: t(lesson.sections[3].title), sources: t(L('Quellen und Umfang', 'Sources and scope', 'منابع و دامنه')),
  }
  const sources = lesson.sources.map(item => ({ ...item, title: t(item.title), tag: t(item.tag), citation: t(item.citation), scope: t(item.scope), href: item.href }))
  return <StandardLessonShell
    lessonId={lesson.id} lang={lang} title={t(lesson.title)} author="Dr. Zia"
    breadcrumbs={[{ label: 'RadYar', href: lang === 'de' ? '/' : `/?lang=${lang}` }, { label: t(L('MSK', 'MSK', 'اسکلتی‌عضلانی')), href: lang === 'de' ? '/lernen/msk' : `/lernen/msk?lang=${lang}` }, { label: t(lesson.title) }]}
    sections={lesson.sections.map(section => ({ id: section.id, label: t(section.title), icon: section.icon, emphasis: section.emphasis }))}
    labels={labels} actions={{}} renderIcon={id => <Icon id={id} />}
    theme={{ backgroundImage: '/andarun-galaxy-v3.png', heroImage: '/educational/chondrosarkom-hero.svg', heroImageOpacity: .96, accent: '#8fb9c7', accentStrong: '#315f70', accentSoft: '#e6f0f2', secondary: '#d7a06b', secondaryStrong: '#80522b', heroBase: '#203746' }}
    className={styles.page} heroImageAlt={t(lesson.hero)} sources={<LessonSources title={labels.sources} items={sources} note={t(lesson.sourceNote)} />}>
    <LessonSection id="pattern" icon="pattern" title={t(lesson.sections[0].title)} bodyClassName={styles.body}>
      <p className={styles.lead}>{t(lesson.intro)}</p><ul className={styles.list}>{lesson.features.map((item, index) => <li key={index}>{t(item)}</li>)}</ul>
    </LessonSection>
    <LessonSection id="modalities" icon="imaging" title={t(lesson.sections[1].title)} bodyClassName={styles.body}><Table lang={lang} /></LessonSection>
    <LessonSection id="case" icon="case" title={t(lesson.sections[2].title)} bodyClassName={styles.body}>
      <figure className={styles.caseFigure}><img src={lesson.case.src} alt={t(lesson.case.alt)} width="925" height="670" /><figcaption>{t(lesson.case.caption)}</figcaption></figure><Check lang={lang} />
    </LessonSection>
    <LessonSection id="take-home" icon="check" title={t(lesson.sections[3].title)} bodyClassName={styles.body}><ol className={styles.list}>{lesson.takeHome.map((item, index) => <li key={index}>{t(item)}</li>)}</ol></LessonSection>
  </StandardLessonShell>
}
