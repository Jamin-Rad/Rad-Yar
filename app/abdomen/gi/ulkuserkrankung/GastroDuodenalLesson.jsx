'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useLanguage } from '@/providers/LanguageProvider'
import StandardLessonShell, { LessonSection, LessonSources } from '@/components/lesson-template/StandardLessonShell'
import styles from './page.module.css'

const L = (de, en, fa) => ({ de, en, fa })
const labels = {
  takeHome: L('Drei Regeln mitnehmen', 'Three rules to remember', 'سه نکته برای یادآوری'),
  contents: L('Lektionsinhalt', 'Lesson contents', 'محتوای درس'),
  path: L('Lernpfad', 'Learning path', 'مسیر یادگیری'),
  progress: L('gelesen', 'read', 'خوانده‌شده'),
  continue: L('Lektion fortsetzen', 'Continue lesson', 'ادامهٔ درس'),
  completeLesson: L('Ganze Lektion als gelesen markieren', 'Mark whole lesson as read', 'علامت‌گذاری کل درس به‌عنوان خوانده‌شده'),
  lessonCompleted: L('Ganze Lektion gelesen', 'Whole lesson read', 'کل درس خوانده شد'),
  complete: L('Abschnitt als gelesen markieren', 'Mark section as read', 'علامت‌گذاری بخش به‌عنوان خوانده‌شده'),
  completed: L('Als gelesen markiert', 'Marked as read', 'خوانده‌شده'),
  open: L('Abschnitt öffnen', 'Open section', 'بازکردن بخش'),
  close: L('Schließen', 'Close', 'بستن'),
  chapter: L('Abdomen', 'Abdomen', 'شکم'),
  sources: L('Quellen', 'Sources', 'منابع'),
  practice: L('Wissen prüfen', 'Check your knowledge', 'دانش خود را بسنجید'),
  cards: L('Karteikarten', 'Flashcards', 'فلش‌کارت‌ها'),
  check: L('Kurz prüfen', 'Quick check', 'خودآزمایی کوتاه'),
  pattern: L('Komplikation', 'Complication', 'عارضه'),
  meaning: L('Worauf achten?', 'What to assess', 'چه چیزی را بررسی کنیم؟'),
  enlarge: L('Originalbild vergrößern', 'Enlarge original image', 'بزرگ‌نمایی تصویر اصلی')
}

function Icon({ name }) {
  const paths = { layers: 'm3 7 9-4 9 4-9 4-9-4Zm0 5 9 4 9-4M3 17l9 4 9-4', scope: 'M4 9V4h5m6 0h5v5m0 6v5h-5M9 20H4v-5M8 12h8m-4-4v8', summary: 'M5 6h14M5 12h14M5 18h14' }
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true"><path d={paths[name] || paths.layers} /></svg>
}

function Check({ item, lang, id }) {
  const [choice, setChoice] = useState(null)
  return <div className={styles.check}>
    <h3>{labels.check[lang]}</h3>
    <p id={id}>{item.prompt[lang]}</p>
    <div className={styles.options} role="group" aria-labelledby={id}>
      {item.options.map((o, i) => <button type="button" key={i} aria-pressed={choice === i} onClick={() => setChoice(i)}><b dir="ltr">{'ABCD'[i]}.</b><span>{o[lang]}</span></button>)}
    </div>
    <p role="status" aria-live="polite" className={choice !== null ? styles.feedback : undefined}>{choice !== null ? (choice === item.answer ? item.explanation[lang] : (item.wrongFeedback?.[choice]?.[lang] || item.retry[lang])) : ''}</p>
  </div>
}

export default function GastroDuodenalLesson({ lesson }) {
  const { lang } = useLanguage()
  const t = value => value?.[lang] || value?.de || value
  const local = path => `${path}${path.includes('?') ? '&' : '?'}lang=${lang}`
  const back = local(lesson.path)
  return <StandardLessonShell
    lessonId={lesson.id} lang={lang} title={t(lesson.title)} author="Dr. Zia" syncHashNavigation
    breadcrumbs={[{ label: 'RadYar', href: local('/') }, { label: t(labels.chapter), href: local('/lernen/abdomen') }, { label: t(lesson.title) }]}
    sections={lesson.chapters.map(section => ({ ...section, label: t(section.title) }))}
    labels={Object.fromEntries(Object.entries(labels).map(([key, value]) => [key, t(value)]))}
    renderIcon={name => <Icon name={name} />}
    actions={{ mcq: { label: t(labels.practice), href: local(`/ueben/quiz?fach=abdomen&n=2&themen=${lesson.id}&from=${encodeURIComponent(back)}`) }, flashcards: { label: t(labels.cards), href: local(`/flashcards/${lesson.id}?from=${encodeURIComponent(back)}`) } }}
    theme={{ backgroundImage: '/andarun-galaxy-v3.png', heroImage: lesson.hero, heroImageOpacity: .65, accent: '#477e85', accentStrong: '#285a64', accentSoft: '#e6f1f3', secondary: '#a17b96', secondaryStrong: '#69566d', heroBase: '#142a37' }}
    heroImageAlt={t(lesson.heroAlt)}
    sources={<LessonSources title={t(labels.sources)} note={t(lesson.scope)} items={lesson.sources.map(source => ({ ...source, tag: 'Abdomen' }))} />}
  >
    <div className={styles.copy} lang={lang} dir={lang === 'fa' ? 'rtl' : 'ltr'}>
      {lesson.chapters.map(section => <LessonSection key={section.id} id={section.id} title={t(section.title)} icon={section.icon}>
        {section.paragraphs?.map((paragraph, index) => <p key={index}>{t(paragraph)}</p>)}
        {section.image && <figure className={styles.figure}>
          <a href={section.image.src} target="_blank" rel="noopener noreferrer" aria-label={t(labels.enlarge)}><Image src={section.image.src} width={section.image.width} height={section.image.height} alt={t(section.image.alt)} sizes="(max-width:700px) 90vw,700px" /></a>
          <figcaption>{t(section.image.caption)}{section.image.source.href ? <a href={section.image.source.href} target="_blank" rel="noopener noreferrer">{section.image.source.title}</a> : <p>{section.image.source.title}</p>}{section.image.license ? <p>{t(section.image.license)}</p> : <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer">CC BY 4.0</a>}</figcaption>
        </figure>}
        {section.rows && <div className={styles.tableWrap} role="region" aria-label={t(section.title)} tabIndex={0}><table><thead><tr><th>{t(labels.pattern)}</th><th>{t(labels.meaning)}</th></tr></thead><tbody>{section.rows.map((row, index) => <tr key={index}><th scope="row">{t(row[0])}</th><td>{t(row[1])}</td></tr>)}</tbody></table></div>}
        {section.cave && <aside className={styles.cave}>{t(section.cave)}</aside>}
        {section.checks?.map(index => <Check key={`${lang}-${index}`} lang={lang} item={lesson.checks[index]} id={`${lesson.id}-${index}`} />)}
        {section.takeaways && <ul>{section.takeaways.map((point, index) => <li key={index}>{t(point)}</li>)}</ul>}
      </LessonSection>)}
    </div>
  </StandardLessonShell>
}
