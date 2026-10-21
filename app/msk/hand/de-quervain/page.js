'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import LessonHero from '@/components/LessonHero'
import { useLanguage } from '@/providers/LanguageProvider'
import { useLessonReadStatus } from '@/hooks/useLessonReadStatus'
import { usePersistedSectionProgress } from '@/hooks/usePersistedSectionProgress'
import { SOURCE_LESSON_UI } from '@/data/sourceLessonUi'
import { DE_QUERVAIN_LESSON as lesson } from '@/data/deQuervainLesson'
import styles from './page.module.css'

const L = (value, lang) => typeof value === 'string' ? value : value?.[lang] || value?.de || ''

export default function DeQuervainLesson() {
  const { lang } = useLanguage()
  const rtl = lang === 'fa'
  const c = value => L(value, lang)
  const copy = SOURCE_LESSON_UI[lang] || SOURCE_LESSON_UI.de
  const { isRead, toggleRead, authError } = useLessonReadStatus(lesson.id)
  const sections = useMemo(() => [
    { id: 'start', title: lesson.intro.title, icon: '◉' },
    ...lesson.chapters.map(chapter => ({ id: chapter.id, title: chapter.title, icon: chapter.icon })),
    { id: 'case', title: lesson.case.title, icon: '◇' },
  ], [])
  const ids = useMemo(() => sections.map(section => section.id), [sections])
  const [readSections, setReadSections] = usePersistedSectionProgress(lesson.id, ids, isRead)
  const [openId, setOpenId] = useState('start')
  const [answer, setAnswer] = useState('')
  const activeIndex = Math.max(0, sections.findIndex(section => section.id === openId))
  const completed = readSections.size === ids.length

  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (ids.includes(hash) || hash === 'take-home' || hash === 'sources') setOpenId(hash)
  }, [ids])

  const selectSection = id => {
    setOpenId(id)
    window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}#${id}`)
    requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }
  const toggleSectionRead = id => setReadSections(previous => {
    const next = new Set(previous)
    next.has(id) ? next.delete(id) : next.add(id)
    return next
  })
  const toggleAllRead = () => setReadSections(completed ? new Set() : new Set(ids))
  const renderMark = id => <button className={`${styles.mark} ${readSections.has(id) ? styles.markDone : ''}`} type="button" aria-pressed={readSections.has(id)} onClick={() => toggleSectionRead(id)}>{readSections.has(id) ? `✓ ${copy.read}` : copy.mark}</button>
  const chapter = item => <section className={`${styles.chapter} ${openId === item.id ? styles.chapterOpen : ''}`} id={item.id} key={item.id}>
    <button className={styles.chapterToggle} type="button" aria-expanded={openId === item.id} aria-controls={`${item.id}-panel`} onClick={() => selectSection(openId === item.id ? '' : item.id)}><span aria-hidden="true">{item.icon}</span><strong>{c(item.title)}</strong><i aria-hidden="true">{openId === item.id ? '−' : '+'}</i></button>
    <div id={`${item.id}-panel`} hidden={openId !== item.id} className={styles.chapterBody}>
      <p className={styles.lead}>{c(item.lead)}</p>
      {item.id === 'mri-findings' && <figure className={styles.figure}><Image src="/educational/de-quervain/first-extensor-compartment.svg" alt={c(lesson.alt)} width={760} height={440} sizes="(max-width: 760px) 100vw, 760px" /><figcaption>{c({ de: 'Orientierung: APL = M. abductor pollicis longus; EPB = M. extensor pollicis brevis. Beide Sehnen verlaufen im ersten Strecksehnenfach über dem radialen Processus styloideus.', en: 'Orientation: APL = abductor pollicis longus; EPB = extensor pollicis brevis. Both tendons pass through the first extensor compartment over the radial styloid.', fa: 'جهت‌یابی: APL = عضلهٔ دورکنندهٔ بلند شست؛ EPB = عضلهٔ بازکنندهٔ کوتاه شست. هر دو تاندون از کمپارتمان اول اکستانسور و روی زائدهٔ استایلوئید رادیوس عبور می‌کنند.' })}</figcaption></figure>}
      {item.caseImage && <figure className={styles.figure}><Image src={item.caseImage} alt={c(item.caseAlt)} width={2045} height={730} sizes="(max-width: 760px) 100vw, 980px" /><figcaption>{c(item.caseCaption)}</figcaption></figure>}
      {item.rows && <div className={styles.tableWrap}><table><tbody>{item.rows.map((row, i) => <tr key={i}>{row.map((cell, j) => <td key={j}>{c(cell)}</td>)}</tr>)}</tbody></table></div>}
      <p className={styles.note}>{c(item.note)}</p><small>{copy.chapterSource} {c(item.source)}</small>{renderMark(item.id)}
    </div>
  </section>

  return <main className={styles.page} dir={rtl ? 'rtl' : 'ltr'} lang={lang} data-lesson-progress-managed="true">
    <div className={styles.wrap}>
      <nav className={styles.breadcrumb} aria-label={copy.breadcrumb}><Link href={lang === 'de' ? '/' : `/?lang=${lang}`}>RadYar</Link><span>›</span><Link href={lang === 'de' ? '/lernen/msk' : `/lernen/msk?lang=${lang}`}>{lang === 'fa' ? 'اسکلتی‌عضلانی' : 'MSK'}</Link><span>›</span><span>{c(lesson.title)}</span></nav>
      <LessonHero title={c(lesson.title)} imageSrc={lesson.heroImage} imageAlt={c(lesson.alt)} lang={lang} />
      <div className={styles.assessmentLinks}>
        <Link href="/ueben/quiz?fach=msk&n=1&themen=de-quervain">{lang === 'fa' ? 'پرسش‌های آزمون' : lang === 'en' ? 'Quiz questions' : 'Prüfungsfragen'} →</Link>
        <Link href="/flashcards/de-quervain">{lang === 'fa' ? 'فلش‌کارت‌ها' : lang === 'en' ? 'Flashcards' : 'Lernkarten'} →</Link>
      </div>
      <div className={styles.progressBar}><div className={styles.progressTrack} role="progressbar" aria-label={copy.progress} aria-valuemin={0} aria-valuemax={ids.length} aria-valuenow={readSections.size}><i style={{ width: `${ids.length ? readSections.size / ids.length * 100 : 0}%` }} /></div><span>{readSections.size} / {ids.length} {copy.progress}</span><div className={styles.progressActions}><button className={completed ? styles.markDone : ''} type="button" aria-pressed={completed} onClick={toggleAllRead}>{completed ? copy.lessonCompleted : copy.completeLesson}</button><button type="button" onClick={() => selectSection(sections[Math.min(activeIndex + 1, sections.length - 1)]?.id || 'start')} disabled={activeIndex >= sections.length - 1}>{copy.continue} <span aria-hidden="true">→</span></button></div></div>
      <nav className={styles.path} aria-label={copy.toc}><strong>{copy.toc}</strong>{sections.map(section => <button type="button" key={section.id} className={openId === section.id ? styles.pathCurrent : ''} aria-current={openId === section.id ? 'location' : undefined} onClick={() => selectSection(section.id)}><span aria-hidden="true">{section.icon}</span>{c(section.title)}{readSections.has(section.id) && <i aria-label={copy.read}>✓</i>}</button>)}<button type="button" onClick={() => selectSection('take-home')}>{copy.takeHome}</button><button type="button" onClick={() => selectSection('sources')}>{copy.sources}</button></nav>
      <section className={`${styles.chapter} ${openId === 'start' ? styles.chapterOpen : ''}`} id="start"><button className={styles.chapterToggle} type="button" aria-expanded={openId === 'start'} aria-controls="start-panel" onClick={() => selectSection(openId === 'start' ? '' : 'start')}><span aria-hidden="true">◉</span><strong>{c(lesson.intro.title)}</strong><i aria-hidden="true">{openId === 'start' ? '−' : '+'}</i></button><div id="start-panel" hidden={openId !== 'start'} className={styles.chapterBody}><p>{c(lesson.intro.text)}</p><p className={styles.note}><Link href="/msk/hand/strecksehnenfaecher">{c({ de: 'Zur Übersicht aller sechs Strecksehnenfächer', en: 'See the overview of all six extensor compartments', fa: 'مرور هر شش کمپارتمان اکستانسور' })} →</Link></p>{renderMark('start')}</div></section>
      {lesson.chapters.map(chapter)}
      <section className={`${styles.chapter} ${openId === 'case' ? styles.chapterOpen : ''}`} id="case"><button className={styles.chapterToggle} type="button" aria-expanded={openId === 'case'} aria-controls="case-panel" onClick={() => selectSection(openId === 'case' ? '' : 'case')}><span aria-hidden="true">◇</span><strong>{c(lesson.case.title)}</strong><i aria-hidden="true">{openId === 'case' ? '−' : '+'}</i></button><div id="case-panel" hidden={openId !== 'case'} className={styles.chapterBody}><p>{c(lesson.case.prompt)}</p><div className={styles.options}>{lesson.case.options.map((option, i) => <button key={i} className={answer === String(i) ? styles.selected : ''} type="button" aria-pressed={answer === String(i)} onClick={() => setAnswer(String(i))}>{c(option)}</button>)}</div>{answer !== '' && <p className={styles.feedback} role="status">{Number(answer) === lesson.case.answerIndex ? c(lesson.case.feedbackCorrect) : c(lesson.case.feedbackIncorrect)}</p>}<small>{copy.chapterSource} {c(lesson.case.source)}</small>{renderMark('case')}</div></section>
      <section className={`${styles.chapter} ${openId === 'take-home' ? styles.chapterOpen : ''}`} id="take-home"><button className={styles.chapterToggle} type="button" aria-expanded={openId === 'take-home'} aria-controls="take-home-panel" onClick={() => selectSection(openId === 'take-home' ? '' : 'take-home')}><strong>{copy.takeHome}</strong><i aria-hidden="true">{openId === 'take-home' ? '−' : '+'}</i></button><div id="take-home-panel" hidden={openId !== 'take-home'} className={styles.chapterBody}><ul>{lesson.takeHome.map((item, i) => <li key={i}>{c(item)}</li>)}</ul></div></section>
      <section className={`${styles.chapter} ${openId === 'sources' ? styles.chapterOpen : ''}`} id="sources"><button className={styles.chapterToggle} type="button" aria-expanded={openId === 'sources'} aria-controls="sources-panel" onClick={() => selectSection(openId === 'sources' ? '' : 'sources')}><strong>{copy.sources}</strong><i aria-hidden="true">{openId === 'sources' ? '−' : '+'}</i></button><div id="sources-panel" hidden={openId !== 'sources'} className={styles.chapterBody}><p>{c(lesson.notice)}</p><ul>{lesson.references.map(item => <li key={item.url}><a href={item.url} target="_blank" rel="noopener noreferrer">{c(item.label)}</a></li>)}</ul></div></section>
      <div className={styles.read}><button type="button" onClick={toggleRead}>{isRead ? '✓ ' : ''}{isRead ? copy.lessonCompleted : copy.completeLesson}</button>{authError && <p role="alert">{copy.auth} <Link href={`/sign-in?lang=${lang}`}>{copy.signIn}</Link></p>}</div>
    </div>
  </main>
}
