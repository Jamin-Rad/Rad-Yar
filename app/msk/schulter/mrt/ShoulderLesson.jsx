'use client'

import Link from 'next/link'
import { useState } from 'react'
import StandardLessonShell, { LessonSection, LessonSources, TakeHomeList } from '@/components/lesson-template/StandardLessonShell'
import { useLanguage } from '@/providers/LanguageProvider'
import { SHOULDER_MRI_PATH, SHOULDER_MRI_TITLE, shoulderMriTopics } from '@/data/shoulderMriChapter'
import ShoulderDiagram from './ShoulderDiagram'
import { copy } from './shoulderCopy'
import styles from './shoulder.module.css'

const heroImage = '/educational/shoulder-mri/hero.webp'

const sections = [
  { id: 'grundlagen', icon: 'book' },
  { id: 'bildfall', icon: 'scan' },
  { id: 'befundcheck', icon: 'check' },
  { id: 'fragen', icon: 'question' },
  { id: 'take-home', icon: 'check', emphasis: true },
]
const localizedSections = Object.fromEntries(Object.entries(copy).map(([lang, text]) => [
  lang, sections.map((section, i) => ({ ...section, label: text.sections[i] })),
]))

const icons = {
  book: 'M3 5h6a3 3 0 0 1 3 3v13a3 3 0 0 0-3-3H3z M21 5h-6a3 3 0 0 0-3 3v13a3 3 0 0 1 3-3h6z',
  scan: 'M8 3H3v5m13-5h5v5m0 8v5h-5M3 16v5h5 M8 12a4 4 0 1 0 8 0 4 4 0 1 0-8 0',
  check: 'M4 12l5 5L20 6',
  question: 'M8.5 8a3.5 3.5 0 1 1 5.2 3.1c-1.2.7-1.7 1.4-1.7 3 M12 18h.01',
}

const theme = {
  backgroundImage: heroImage,
  heroImage,
  accent: '#258875',
  accentStrong: '#166356',
  accentSoft: '#e0f3ef',
  secondary: '#cbb080',
  secondaryStrong: '#80571f',
  heroBase: '#0a1728',
  heroImageOpacity: 0.85,
}

function renderIcon(name) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={icons[name] ?? icons.book} />
  </svg>
}

function ClinicalCase({ clinicalCase, text }) {
  const [selected, setSelected] = useState(0)
  const frames = clinicalCase.frames
  const frame = frames[selected]
  return <article className={styles.case} aria-label={clinicalCase.label}>
    <p><strong>{text.history}</strong> {clinicalCase.history}</p>
    <figure className={styles.caseFigure}>
      {frames.length > 1 ? <div className={styles.controls} role="group" aria-label={text.series}>
        {frames.map(({ label, src }, index) => <button key={src} type="button" aria-pressed={selected === index}
          onClick={() => setSelected(index)}>{label}</button>)}
      </div> : null}
      <img src={frame.src} alt={frame.label + ' · ' + (frame.alt ?? clinicalCase.label)} loading="lazy" />
      <figcaption>
        {frame.label} · {text.original}
        <br />
        <a href={clinicalCase.url} target="_blank" rel="noreferrer"><bdi>{clinicalCase.credit}</bdi></a>
        {' · '}
        <a href={frame.source ?? clinicalCase.imageSource} target="_blank" rel="noreferrer">{text.credit}</a>
        {' · '}
        <a href="https://creativecommons.org/licenses/by-nc-sa/3.0/" target="_blank" rel="noreferrer">CC BY-NC-SA 3.0</a>
      </figcaption>
    </figure>
    <a className={styles.caseLink} href={clinicalCase.url} target="_blank" rel="noreferrer">{text.openCase} ↗</a>
    <p><strong>{text.findings}</strong> {clinicalCase.findings}</p>
    <details className={styles.disclosure}><summary>{text.diagnosis}</summary><p>{clinicalCase.diagnosis}</p></details>
  </article>
}

function Comparison({ table, label }) {
  return <div className={styles.tableWrap} tabIndex={0} role="region" aria-label={label}>
    <table>
      <thead><tr>{table.headers.map(label => <th key={label} scope="col">{label}</th>)}</tr></thead>
      <tbody>{table.rows.map(([label, ...cells]) => <tr key={label}>
        <th scope="row">{label}</th>
        {cells.map(cell => <td key={cell}>{cell}</td>)}
      </tr>)}</tbody>
    </table>
  </div>
}

export default function ShoulderLesson({ index, content }) {
  const { lang } = useLanguage()
  const { lesson, clinicalCase } = content[lang] ?? content.de
  const text = copy[lang] ?? copy.de
  const topic = shoulderMriTopics[index]
  const title = topic.title[lang] ?? topic.title.de
  const next = shoulderMriTopics[index + 1]
  const localPath = href => lang === 'de' ? href : `${href}?lang=${lang}`
  const chapterTitle = SHOULDER_MRI_TITLE[lang] ?? SHOULDER_MRI_TITLE.de
  const sources = lesson.sources.map(([title, href]) => ({ title, href, tag: text.literature }))
  sources.push({ title: clinicalCase.label, href: clinicalCase.url, citation: clinicalCase.credit, tag: text.sections[1] })
  const backArrow = lang === 'fa' ? '→' : '←'
  const nextArrow = lang === 'fa' ? '←' : '→'

  return <StandardLessonShell
    lessonId={topic.id}
    lang={lang}
    title={title}
    heroLessonId={topic.link}
    sections={localizedSections[lang] ?? localizedSections.de}
    className={styles.lesson}
    breadcrumbs={[
      { label: text.course, href: localPath('/lernen/msk') },
      { label: chapterTitle, href: localPath(SHOULDER_MRI_PATH) },
      { label: title },
    ]}
    actions={{
      mcq: { label: text.mcq, href: topic.mcqLink },
      flashcards: { label: text.flashcards, href: topic.flashcardLink },
    }}
    learningPathLinks={[
      { label: text.overview, href: localPath(SHOULDER_MRI_PATH), icon: 'book' },
      ...(next ? [{ label: text.next, href: localPath(next.link), icon: 'book' }] : []),
    ]}
    renderIcon={renderIcon}
    theme={theme}
    heroImageSrc={heroImage}
    heroImageAlt={text.heroAlt}
    syncHashNavigation
    sources={<LessonSources lang={lang} title={text.sources} items={sources} />}
  >
    <div>
      <LessonSection id="grundlagen" bodyClassName={styles.body}>
        <p className={styles.goal}><strong>{text.goal}</strong> {lesson.goal}</p>
        <dl className={styles.findings}>
          {lesson.topics.map(([label, text]) => <div key={label}><dt>{label}</dt><dd>{text}</dd></div>)}
        </dl>
        <ShoulderDiagram lesson={index} lang={lang} schemaLabel={text.schema} />
        {lesson.table ? <Comparison table={lesson.table} label={text.comparison} /> : null}
      </LessonSection>
      <LessonSection id="bildfall" bodyClassName={styles.body}>
        <ClinicalCase clinicalCase={clinicalCase} text={text} />
      </LessonSection>
      <LessonSection id="befundcheck" bodyClassName={styles.body}>
        <ul className={styles.check}>{lesson.check.map(item => <li key={item}>{item}</li>)}</ul>
        {lesson.report ? <blockquote className={styles.goal}><strong>{text.report}</strong> {lesson.report}</blockquote> : null}
      </LessonSection>
      <LessonSection id="fragen" bodyClassName={styles.body}>
        {lesson.questions.map(([question, answer]) => <details key={question} className={styles.disclosure}>
          <summary>{question}</summary><p>{answer}</p>
        </details>)}
      </LessonSection>
      <LessonSection id="take-home">
        <TakeHomeList items={lesson.check.map(title => ({ title }))} />
      </LessonSection>
      <nav className={styles.lessonNav} aria-label={text.nav}>
        <Link href={localPath(SHOULDER_MRI_PATH)}>{backArrow} {text.overview}</Link>
        {next ? <Link href={localPath(next.link)}>{text.next} {nextArrow}</Link> : null}
      </nav>
    </div>
  </StandardLessonShell>
}
