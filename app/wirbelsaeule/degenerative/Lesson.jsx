'use client'
import LegacyLessonMigration from '@/components/lesson-template/LegacyLessonMigration'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import LessonHero from '@/components/LessonHero'
import { useLanguage } from '@/providers/LanguageProvider'
import { useLessonReadStatus } from '@/hooks/useLessonReadStatus'
import { usePersistedSectionProgress } from '@/hooks/usePersistedSectionProgress'
import { SOURCE_LESSON_UI } from '@/data/sourceLessonUi'
import { SPINE_DEGENERATIVE_LESSON as lesson } from '@/data/spineDegenerative'
import styles from './page.module.css'

const L = (value, lang) => typeof value === 'string' ? value : value?.[lang] || value?.de || value

export default function SpineSourceLesson({ lessonData = lesson, sectionName = null, sectionHref = '/lernen/wirbelsaeule' }) {
  const { lang } = useLanguage()
  const rtl = lang === 'fa'
  const c = value => L(value, lang)
  const withLang = href => {
    const [path, hash] = href.split('#', 2)
    const localizedPath = lang === 'de' ? path : `${path}${path.includes('?') ? '&' : '?'}lang=${lang}`
    return hash ? `${localizedPath}#${hash}` : localizedPath
  }
  const copy = SOURCE_LESSON_UI[lang] || SOURCE_LESSON_UI.de
  const { isRead, toggleRead, authError } = useLessonReadStatus(lessonData.id)
  const trackedSections = useMemo(() => [
    { id: 'start', title: lessonData.intro.title, icon: '◉' },
    ...lessonData.chapters.map(chapter => ({ id: chapter.id, title: chapter.title, icon: chapter.icon })),
    ...(lessonData.case ? [{ id: 'case', title: lessonData.case.title, icon: '◇' }] : []),
  ], [lessonData])
  const trackedIds = useMemo(() => trackedSections.map(section => section.id), [trackedSections])
  const [readSections, setReadSections] = usePersistedSectionProgress(lessonData.id, trackedIds, isRead)
  const [openId, setOpenId] = useState(trackedSections[0]?.id || 'start')
  const [answer, setAnswer] = useState('')
  const [mobilePathOpen, setMobilePathOpen] = useState(false)
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
    setMobilePathOpen(false)
  }
  const toggleSectionRead = id => setReadSections(previous => {
    const next = new Set(previous)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    return next
  })
  const toggleAllRead = () => setReadSections(completed ? new Set() : new Set(trackedIds))

  const renderChapterBody = chapter => <>
    <p className={styles.lead}>{c(chapter.lead)}</p>
    <div className={styles.tableWrap}><table><tbody>{chapter.rows.map((row, i) => <tr key={i}>{row.map((cell, j) => <td key={j}>{c(cell)}</td>)}</tr>)}</tbody></table></div>
    {chapter.subheading && <h3>{c(chapter.subheading)}</h3>}
    {chapter.extraRows && <div className={styles.tableWrap}><table><tbody>{chapter.extraRows.map((row, i) => <tr key={`extra-${i}`}>{row.map((cell, j) => <td key={j}>{c(cell)}</td>)}</tr>)}</tbody></table></div>}
    {chapter.signalTitle && <h3>{c(chapter.signalTitle)}</h3>}
    {chapter.signalRows && <div className={styles.tableWrap}><table><tbody>{chapter.signalRows.map((row, i) => <tr key={`signal-${i}`}>{row.map((cell, j) => <td key={j}>{c(cell)}</td>)}</tr>)}</tbody></table></div>}
    {chapter.signalEvidence && <small>{c(chapter.signalEvidence)}</small>}
    {chapter.visual && <figure className={styles.sourceFigure}><img src={chapter.visual.src} alt={c(chapter.visual.alt)} loading="lazy"/><figcaption>{c(chapter.visual.caption)}</figcaption></figure>}
    <p className={styles.note}>{c(chapter.note)}</p>
    <small>{copy.chapterSource} {c(chapter.source)}</small>
    {chapter.id === 'modic' && (() => {
      const returnTo = withLang('/wirbelsaeule/degenerative#modic')
      const from = encodeURIComponent(returnTo)
      const labels = {
        de: { name: 'Modic-Veränderungen üben', quiz: 'MC-Frage', cards: 'Lernkarte' },
        en: { name: 'Practise Modic changes', quiz: 'MCQ', cards: 'Flashcard' },
        fa: { name: 'تمرین تغییرات مودیک', quiz: 'سؤال چندگزینه‌ای', cards: 'فلش‌کارت' },
      }[lang]
      return <nav className={styles.practiceActions} aria-label={labels.name}>
        <Link className={styles.practicePrimary} href={withLang(`/ueben/quiz?fach=wirbelsaeule&n=1&themen=osteochondrosis-intervertebralis&from=${from}`)}>{labels.quiz}</Link>
        <Link className={styles.practiceSecondary} href={withLang(`/flashcards/osteochondrosis-intervertebralis?from=${from}`)}>{labels.cards}</Link>
      </nav>
    })()}
    {chapter.id === 'scheuermann' && (() => {
      const returnTo = withLang('/wirbelsaeule/entzuendlich#scheuermann')
      const from = encodeURIComponent(returnTo)
      const labels = {
        de: { name: 'Scheuermann üben', quiz: 'MC-Frage', cards: 'Lernkarte' },
        en: { name: "Practise Scheuermann's disease", quiz: 'MCQ', cards: 'Flashcard' },
        fa: { name: 'تمرین بیماری شویرمان', quiz: 'سؤال چندگزینه‌ای', cards: 'فلش‌کارت' },
      }[lang]
      return <nav className={styles.practiceActions} aria-label={labels.name}>
        <Link className={styles.practicePrimary} href={withLang(`/ueben/quiz?fach=msk&n=1&themen=morbus-scheuermann&from=${from}`)}>{labels.quiz}</Link>
        <Link className={styles.practiceSecondary} href={withLang(`/flashcards/morbus-scheuermann?from=${from}`)}>{labels.cards}</Link>
      </nav>
    })()}
  </>

  const renderTrackedSection = (section, children) => {
    const open = openId === section.id
    const isSectionRead = readSections.has(section.id)
    return <section className={`${styles.chapter} ${open ? styles.chapterOpen : ''}`} id={section.id} key={section.id}>
      <button className={styles.chapterToggle} type="button" aria-expanded={open} aria-controls={`${section.id}-panel`} aria-label={`${open ? copy.close : copy.open}: ${c(section.title)}`} onClick={() => selectSection(open ? '' : section.id)}>
        <span aria-hidden="true">{section.icon}</span><strong>{c(section.title)}</strong><i aria-hidden="true">{open ? '−' : '+'}</i>
      </button>
      <div id={`${section.id}-panel`} hidden={!open} className={styles.chapterBody}>
        {children}
        <button className={`${styles.sectionRead} ${isSectionRead ? styles.sectionReadDone : ''}`} type="button" aria-pressed={isSectionRead} onClick={() => toggleSectionRead(section.id)}>{isSectionRead ? `✓ ${copy.read}` : copy.mark}</button>
      </div>
    </section>
  }

  return <>

    <LegacyLessonMigration lessonRoute={lessonData.id === "degenerative-wirbelsaeule" ? "/wirbelsaeule/degenerative" : "/wirbelsaeule/entzuendlich"} lessonId={lessonData.id} lang={lang} lessonRead={isRead} summaryFallback={c(lessonData.takeHome).map(item => ({ title: item, detail: "" }))}>
    <main className={styles.page} dir={rtl ? 'rtl' : 'ltr'} lang={lang} data-lesson-progress-managed="true">
      <div className={styles.wrap}>
        <nav className={styles.breadcrumb} aria-label={copy.breadcrumb}><Link href={lang === 'de' ? '/' : `/?lang=${lang}`}>RadYar</Link><span>›</span><Link href={lang === 'de' ? sectionHref : `${sectionHref}?lang=${lang}`}>{sectionName ? c(sectionName) : lang === 'fa' ? 'ستون فقرات' : lang === 'en' ? 'Spine' : 'Wirbelsäule'}</Link><span>›</span><span>{c(lessonData.title)}</span></nav>
        <LessonHero title={c(lessonData.title)} imageSrc={lessonData.heroImage || '/educational/spine-degenerative-schematic.svg'} imageAlt={c(lessonData.alt)} lang={lang} />
        <div className={styles.progressBar}>
          <div className={styles.progressTrack} role="progressbar" aria-label={copy.progress} aria-valuemin={0} aria-valuemax={trackedIds.length} aria-valuenow={readSections.size}><i style={{ width: `${trackedIds.length ? readSections.size / trackedIds.length * 100 : 0}%` }} /></div>
          <span>{readSections.size} / {trackedIds.length} {copy.progress}</span>
          <div className={styles.progressActions}><button className={completed ? styles.lessonCompleted : ''} type="button" aria-pressed={completed} onClick={toggleAllRead}>{completed ? copy.lessonCompleted : copy.completeLesson}</button><button type="button" onClick={() => selectSection(trackedSections[Math.min(activeIndex + 1, trackedSections.length - 1)]?.id || 'start')} disabled={activeIndex >= trackedSections.length - 1}>{copy.continue} <span aria-hidden="true">→</span></button></div>
        </div>
        <aside className={styles.path} aria-label={copy.toc}><strong>{copy.toc}</strong>{trackedSections.map(section => <button type="button" key={section.id} className={openId === section.id ? styles.pathCurrent : ''} aria-current={openId === section.id ? 'location' : undefined} onClick={() => selectSection(section.id)}><span aria-hidden="true">{section.icon}</span>{c(section.title)}{readSections.has(section.id) && <i aria-label={copy.read}>✓</i>}</button>)}{lessonData.takeHome && <button type="button" onClick={() => selectSection('take-home')}>{copy.takeHome}</button>}</aside>
        <section className={`${styles.chapter} ${openId === 'start' ? styles.chapterOpen : ''}`} id="start">
          <button className={styles.chapterToggle} type="button" aria-expanded={openId === 'start'} aria-controls="start-panel" onClick={() => selectSection(openId === 'start' ? '' : 'start')}><span aria-hidden="true">◉</span><strong>{c(lessonData.intro.title)}</strong><i aria-hidden="true">{openId === 'start' ? '−' : '+'}</i></button>
          <div id="start-panel" hidden={openId !== 'start'} className={styles.chapterBody}><p>{c(lessonData.intro.text)}</p><button className={`${styles.sectionRead} ${readSections.has('start') ? styles.sectionReadDone : ''}`} type="button" aria-pressed={readSections.has('start')} onClick={() => toggleSectionRead('start')}>{readSections.has('start') ? `✓ ${copy.read}` : copy.mark}</button></div>
        </section>
        {lessonData.chapters.map(chapter => renderTrackedSection(chapter, renderChapterBody(chapter)))}
        {lessonData.takeHome && <section className={`${styles.chapter} ${openId === 'take-home' ? styles.chapterOpen : ''}`} id="take-home"><button className={styles.chapterToggle} type="button" aria-expanded={openId === 'take-home'} aria-controls="take-home-panel" onClick={() => selectSection(openId === 'take-home' ? '' : 'take-home')}><span aria-hidden="true">✦</span><strong>{copy.takeHome}</strong><i aria-hidden="true">{openId === 'take-home' ? '−' : '+'}</i></button><div id="take-home-panel" hidden={openId !== 'take-home'} className={styles.chapterBody}><ul>{c(lessonData.takeHome).map((item, i) => <li key={i}>{item}</li>)}</ul></div></section>}
        {lessonData.case && <section className={`${styles.chapter} ${openId === 'case' ? styles.chapterOpen : ''}`} id="case"><button className={styles.chapterToggle} type="button" aria-expanded={openId === 'case'} aria-controls="case-panel" onClick={() => selectSection(openId === 'case' ? '' : 'case')}><span aria-hidden="true">◇</span><strong>{c(lessonData.case.title)}</strong><i aria-hidden="true">{openId === 'case' ? '−' : '+'}</i></button><div id="case-panel" hidden={openId !== 'case'} className={styles.chapterBody}><p>{c(lessonData.case.prompt)}</p><div className={styles.options}>{lessonData.case.options.map((option, i) => <button key={i} className={answer === String(i) ? styles.selected : ''} onClick={() => setAnswer(String(i))} type="button" aria-pressed={answer === String(i)}>{c(option)}</button>)}</div>{answer !== '' && <p className={styles.feedback} role="status">{Number(answer) === lessonData.case.answerIndex ? c(lessonData.case.feedbackCorrect) : c(lessonData.case.feedbackIncorrect)}</p>}<button className={`${styles.sectionRead} ${readSections.has('case') ? styles.sectionReadDone : ''}`} type="button" aria-pressed={readSections.has('case')} onClick={() => toggleSectionRead('case')}>{readSections.has('case') ? `✓ ${copy.read}` : copy.mark}</button></div></section>}
        <section className={`${styles.scope} ${openId === 'sources' ? styles.chapterOpen : ''}`} id="sources"><button className={styles.chapterToggle} type="button" aria-expanded={openId === 'sources'} aria-controls="sources-panel" onClick={() => selectSection(openId === 'sources' ? '' : 'sources')}><strong>{copy.sources}</strong><i aria-hidden="true">{openId === 'sources' ? '−' : '+'}</i></button><div id="sources-panel" hidden={openId !== 'sources'} className={styles.chapterBody}><h2>{copy.source}</h2><p>{c(lessonData.notice)}</p>{lessonData.references?.length > 0 && <ul>{lessonData.references.map(item => <li key={item.url}><a href={item.url} target="_blank" rel="noopener noreferrer">{c(item.label)}</a></li>)}</ul>}</div></section>
        <div className={styles.read} data-migration-read-control=""><button type="button" onClick={toggleRead}>{isRead ? '✓ ' : ''}{isRead ? copy.lessonCompleted : copy.completeLesson}</button>{authError && <p role="alert">{copy.auth} <Link href={`/sign-in?lang=${lang}`}>{copy.signIn}</Link></p>}</div>
      </div>
    </main>
    </LegacyLessonMigration>

  </>
}
