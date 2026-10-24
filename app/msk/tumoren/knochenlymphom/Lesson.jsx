'use client'
import LegacyLessonMigration from '@/components/lesson-template/LegacyLessonMigration'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import LessonHero from '@/components/LessonHero'
import { useLanguage } from '@/providers/LanguageProvider'
import { useLessonReadStatus } from '@/hooks/useLessonReadStatus'
import { usePersistedSectionProgress } from '@/hooks/usePersistedSectionProgress'
import { SOURCE_LESSON_UI } from '@/data/sourceLessonUi'
import { MSK_BONE_LYMPHOMA_LESSON as lesson } from '@/data/mskBoneLymphomaLesson'
import styles from './page.module.css'

const L = (value, lang) => typeof value === 'string' ? value : value?.[lang] || value?.de || value

export default function BoneLymphomaLesson() {
  const { lang } = useLanguage()
  const rtl = lang === 'fa'
  const c = value => L(value, lang)
  const copy = SOURCE_LESSON_UI[lang] || SOURCE_LESSON_UI.de
  const { isRead, toggleRead, authError } = useLessonReadStatus(lesson.id)
  const trackedSections = useMemo(() => [
    { id: 'start', title: lesson.intro.title, icon: '◉' },
    ...lesson.chapters.map(chapter => ({ id: chapter.id, title: chapter.title, icon: chapter.icon })),
    { id: 'case', title: lesson.case.title, icon: '◇' },
  ], [])
  const trackedIds = useMemo(() => trackedSections.map(section => section.id), [trackedSections])
  const [readSections, setReadSections] = usePersistedSectionProgress(lesson.id, trackedIds, isRead)
  const [openId, setOpenId] = useState('start')
  const [answer, setAnswer] = useState('')
  const activeIndex = Math.max(0, trackedSections.findIndex(section => section.id === openId))
  const completed = readSections.size === trackedIds.length

  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (trackedIds.includes(hash) || hash === 'take-home' || hash === 'sources') setOpenId(hash)
  }, [trackedIds])

  const selectSection = id => {
    setOpenId(id)
    window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}#${id}`)
    if (trackedIds.includes(id)) requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }
  const toggleSectionRead = id => setReadSections(previous => {
    const next = new Set(previous)
    next.has(id) ? next.delete(id) : next.add(id)
    return next
  })
  const toggleAllRead = () => setReadSections(completed ? new Set() : new Set(trackedIds))
  const renderFigure = figure => figure && <figure className={styles.figure}>
    <Image src={figure.src} alt={c(figure.alt)} width={figure.width} height={figure.height} sizes="(max-width: 760px) 100vw, 900px" />
    {figure.panelLabels && <div className={styles.figurePanelLabels} dir="ltr">{figure.panelLabels.map((label, index) => <span key={index} dir={rtl ? 'rtl' : 'ltr'}>{c(label)}</span>)}</div>}
    <figcaption>{c(figure.caption)}</figcaption>
  </figure>
  const renderChapter = chapter => <section className={`${styles.chapter} ${openId === chapter.id ? styles.chapterOpen : ''}`} id={chapter.id} key={chapter.id}>
    <button className={styles.chapterToggle} type="button" aria-expanded={openId === chapter.id} aria-controls={`${chapter.id}-panel`} onClick={() => selectSection(openId === chapter.id ? '' : chapter.id)}>
      <span aria-hidden="true">{chapter.icon}</span><strong>{c(chapter.title)}</strong><i aria-hidden="true">{openId === chapter.id ? '−' : '+'}</i>
    </button>
    <div id={`${chapter.id}-panel`} hidden={openId !== chapter.id} className={styles.chapterBody}>
      <p className={styles.lead}>{c(chapter.lead)}</p>
      {renderFigure(chapter.figure)}
      <div className={styles.tableWrap}><table><tbody>{chapter.rows.map((row, i) => <tr key={i}>{row.map((cell, j) => <td key={j}>{c(cell)}</td>)}</tr>)}</tbody></table></div>
      <p className={styles.note}>{c(chapter.note)}</p>
      <small>{copy.chapterSource} {c(chapter.source)}</small>
      <button className={`${styles.sectionRead} ${readSections.has(chapter.id) ? styles.sectionReadDone : ''}`} type="button" aria-pressed={readSections.has(chapter.id)} onClick={() => toggleSectionRead(chapter.id)}>{readSections.has(chapter.id) ? `✓ ${copy.read}` : copy.mark}</button>
    </div>
  </section>

  return <>

    <LegacyLessonMigration lessonRoute="/msk/tumoren/knochenlymphom" lessonId={lesson.id} lang={lang} lessonRead={isRead} summaryFallback={lesson.takeHome.map(item => ({ title: c(item), detail: "" }))}>
    <main className={styles.page} dir={rtl ? 'rtl' : 'ltr'} lang={lang} data-lesson-progress-managed="true">
      <div className={styles.wrap}>
        <nav className={styles.breadcrumb} aria-label={copy.breadcrumb}><Link href={lang === 'de' ? '/' : `/?lang=${lang}`}>RadYar</Link><span>›</span><Link href={lang === 'de' ? '/lernen/msk' : `/lernen/msk?lang=${lang}`}>{lang === 'fa' ? 'اسکلتی‌عضلانی' : 'MSK'}</Link><span>›</span><span>{c(lesson.title)}</span></nav>
        <LessonHero title={c(lesson.title)} imageSrc={lesson.heroImage} imageAlt={c(lesson.alt)} lang={lang} />
        <div className={styles.progressBar}>
          <div className={styles.progressTrack} role="progressbar" aria-label={copy.progress} aria-valuemin={0} aria-valuemax={trackedIds.length} aria-valuenow={readSections.size}><i style={{ width: `${trackedIds.length ? readSections.size / trackedIds.length * 100 : 0}%` }} /></div>
          <span>{readSections.size} / {trackedIds.length} {copy.progress}</span>
          <div className={styles.progressActions}><button className={completed ? styles.lessonCompleted : ''} type="button" aria-pressed={completed} onClick={toggleAllRead}>{completed ? copy.lessonCompleted : copy.completeLesson}</button><button type="button" onClick={() => selectSection(trackedSections[Math.min(activeIndex + 1, trackedSections.length - 1)]?.id || 'start')} disabled={activeIndex >= trackedSections.length - 1}>{copy.continue} <span aria-hidden="true">→</span></button></div>
        </div>
        <aside className={styles.path} aria-label={copy.toc}><strong>{copy.toc}</strong>{trackedSections.map(section => <button type="button" key={section.id} className={openId === section.id ? styles.pathCurrent : ''} aria-current={openId === section.id ? 'location' : undefined} onClick={() => selectSection(section.id)}><span aria-hidden="true">{section.icon}</span>{c(section.title)}{readSections.has(section.id) && <i aria-label={copy.read}>✓</i>}</button>)}<button type="button" onClick={() => selectSection('take-home')}>{copy.takeHome}</button><button type="button" onClick={() => selectSection('sources')}>{copy.sources}</button></aside>
        <section className={`${styles.chapter} ${openId === 'start' ? styles.chapterOpen : ''}`} id="start"><button className={styles.chapterToggle} type="button" aria-expanded={openId === 'start'} aria-controls="start-panel" onClick={() => selectSection(openId === 'start' ? '' : 'start')}><span aria-hidden="true">◉</span><strong>{c(lesson.intro.title)}</strong><i aria-hidden="true">{openId === 'start' ? '−' : '+'}</i></button><div id="start-panel" hidden={openId !== 'start'} className={styles.chapterBody}><p>{c(lesson.intro.text)}</p><button className={`${styles.sectionRead} ${readSections.has('start') ? styles.sectionReadDone : ''}`} type="button" aria-pressed={readSections.has('start')} onClick={() => toggleSectionRead('start')}>{readSections.has('start') ? `✓ ${copy.read}` : copy.mark}</button></div></section>
        {lesson.chapters.map(renderChapter)}
        <section className={`${styles.chapter} ${openId === 'case' ? styles.chapterOpen : ''}`} id="case"><button className={styles.chapterToggle} type="button" aria-expanded={openId === 'case'} aria-controls="case-panel" onClick={() => selectSection(openId === 'case' ? '' : 'case')}><span aria-hidden="true">◇</span><strong>{c(lesson.case.title)}</strong><i aria-hidden="true">{openId === 'case' ? '−' : '+'}</i></button><div id="case-panel" hidden={openId !== 'case'} className={styles.chapterBody}><p>{c(lesson.case.prompt)}</p><div className={styles.options}>{lesson.case.options.map((option, i) => <button key={i} className={answer === String(i) ? styles.selected : ''} onClick={() => setAnswer(String(i))} type="button" aria-pressed={answer === String(i)}>{c(option)}</button>)}</div>{answer !== '' && <p className={styles.feedback} role="status">{Number(answer) === lesson.case.answerIndex ? c(lesson.case.feedbackCorrect) : c(lesson.case.feedbackIncorrect)}</p>}<button className={`${styles.sectionRead} ${readSections.has('case') ? styles.sectionReadDone : ''}`} type="button" aria-pressed={readSections.has('case')} onClick={() => toggleSectionRead('case')}>{readSections.has('case') ? `✓ ${copy.read}` : copy.mark}</button></div></section>
        <section className={`${styles.scope} ${openId === 'take-home' ? styles.chapterOpen : ''}`} id="take-home"><button className={styles.chapterToggle} type="button" aria-expanded={openId === 'take-home'} aria-controls="take-home-panel" onClick={() => selectSection(openId === 'take-home' ? '' : 'take-home')}><strong>{copy.takeHome}</strong><i aria-hidden="true">{openId === 'take-home' ? '−' : '+'}</i></button><div id="take-home-panel" hidden={openId !== 'take-home'} className={styles.chapterBody}><ul>{lesson.takeHome.map((item, i) => <li key={i}>{c(item)}</li>)}</ul></div></section>
        <section className={`${styles.scope} ${openId === 'sources' ? styles.chapterOpen : ''}`} id="sources"><button className={styles.chapterToggle} type="button" aria-expanded={openId === 'sources'} aria-controls="sources-panel" onClick={() => selectSection(openId === 'sources' ? '' : 'sources')}><strong>{copy.sources}</strong><i aria-hidden="true">{openId === 'sources' ? '−' : '+'}</i></button><div id="sources-panel" hidden={openId !== 'sources'} className={styles.chapterBody}><h2>{copy.source}</h2><p>{c(lesson.notice)}</p><ul>{lesson.references.map(item => <li key={item.url}><a href={item.url} target="_blank" rel="noopener noreferrer">{c(item.label)}</a></li>)}</ul></div></section>
        <div className={styles.read} data-migration-read-control=""><button type="button" onClick={toggleRead}>{isRead ? '✓ ' : ''}{isRead ? copy.lessonCompleted : copy.completeLesson}</button>{authError && <p role="alert">{copy.auth} <Link href={`/sign-in?lang=${lang}`}>{copy.signIn}</Link></p>}</div>
      </div>
    </main>
    </LegacyLessonMigration>

  </>
}
