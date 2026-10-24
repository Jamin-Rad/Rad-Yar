'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import StandardLessonShell, { LessonSection, LessonSources, TakeHomeList } from '@/components/lesson-template/StandardLessonShell'
import { DIFFUSE_GLIOMA_ID, DIFFUSE_GLIOMA_PATH, DIFFUSE_GLIOMA_TOPIC_IDS, DIFFUSE_GLIOMA_COPY as C, DIFFUSE_GLIOMA_LABELS, DIFFUSE_GLIOMA_SECTIONS, DIFFUSE_GLIOMA_SOURCES, DIFFUSE_GLIOMA_CHECKS } from '@/data/diffuseGliomaLesson'
import styles from './page.module.css'

const v = (value, lang) => value[lang]
function iconFor(name) {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d={name === 'check' ? 'm4 12 5 5L20 6' : name === 'brain' ? 'M12 5a4 4 0 0 0-7 3 4 4 0 0 0-1 7 4 4 0 0 0 7 4V5m2 0a4 4 0 0 1 7 3 4 4 0 0 1 1 7 4 4 0 0 1-7 4V5' : 'M4 8V4h4m8 0h4v4M20 16v4h-4M8 20H4v-4M7 12h10M12 7v10'} /></svg>
}
function PatternTable({ rows, lang, classification = false }) {
  return <div className={styles.tableWrap}><table><thead><tr><th scope="col">{classification ? v(C.title, lang) : v(DIFFUSE_GLIOMA_LABELS.finding, lang)}</th><th scope="col">{v(DIFFUSE_GLIOMA_LABELS.limit, lang)}</th></tr></thead><tbody>{rows.map(([label, text], i) => <tr key={i}><th scope="row">{v(label, lang)}</th><td>{v(text, lang)}</td></tr>)}</tbody></table></div>
}
function ClinicalFigure({ kind, copy, figure, lang }) {
  const src = `/educational/diffuse-glioma/${kind}.jpg`
  return <figure className={styles.figure}>
    <a href={src} target="_blank" rel="noopener noreferrer" aria-label={v(DIFFUSE_GLIOMA_LABELS.view, lang)}><img src={src} alt={v(copy.alt, lang)} loading="lazy" width={kind === 'glioblastoma-typical' ? 779 : kind === 'glioblastoma' ? 685 : 704} height={kind === 'astrocytoma' ? 199 : kind === 'oligodendroglioma' ? 277 : kind === 'glioblastoma-typical' ? 468 : 420} /></a>
    <figcaption><p>{v(copy.caption, lang)}</p><a href={copy.sourceHref || `https://pmc.ncbi.nlm.nih.gov/articles/PMC10411771/#f${figure}`} target="_blank" rel="noopener noreferrer">{copy.attribution ? v(copy.attribution, lang) : `${v(DIFFUSE_GLIOMA_LABELS.origin, lang)} · ${figure}`}</a></figcaption>
  </figure>
}
function Check({ item, lang }) {
  const [answer, setAnswer] = useState(null)
  const questionId = `${item.topic}-check`
  return <div className={styles.check}>
    <p id={questionId} className={styles.question}>{v(item.question, lang)}</p>
    <div role="group" aria-labelledby={questionId} className={styles.options}>{item.options.map((option, i) => <button type="button" key={i} aria-pressed={answer === i} onClick={() => setAnswer(i)}><b aria-hidden="true">{String.fromCharCode(65 + i)}</b><span>{v(option, lang)}</span></button>)}</div>
    {answer !== null && <p role="status" className={styles.feedback}>{v(item.feedback[answer], lang)}</p>}
  </div>
}
export default function DiffuseGliomaLesson() {
  const { lang } = useLanguage()
  const t = key => v(DIFFUSE_GLIOMA_LABELS[key], lang)
  const langPath = path => lang === 'de' ? path : `${path}${path.includes('?') ? '&' : '?'}lang=${lang}`
  const returnPath = langPath(DIFFUSE_GLIOMA_PATH)
  const sections = DIFFUSE_GLIOMA_SECTIONS.map(section => ({ ...section, label: v(section.label, lang) }))
  const sources = DIFFUSE_GLIOMA_SOURCES.map(source => ({ ...source, tag: v(source.tag, lang), title: v(source.title, lang), citation: v(source.citation, lang), scope: v(source.scope, lang) }))
  const quiz = id => langPath(`/ueben/quiz?fach=gehirn&n=${id ? 1 : 3}&themen=${id || DIFFUSE_GLIOMA_TOPIC_IDS.join(',')}&from=${encodeURIComponent(returnPath)}`)
  const cards = id => langPath(`/flashcards/${id}?from=${encodeURIComponent(returnPath)}`)
  return <StandardLessonShell lessonId={DIFFUSE_GLIOMA_ID} lang={lang} title={v(C.title, lang)} author="Dr. Zia"
    breadcrumbs={[{ label: 'RadYar', href: langPath('/') }, { label: v(C.chapter, lang), href: langPath('/lernen/gehirn') }, { label: v(C.title, lang) }]}
    sections={[...(sections),{id:'takehome',label:lang==='fa'?'پیام نهایی':'Take Home Message',icon:'summary',emphasis:true}]} labels={Object.fromEntries(Object.entries(DIFFUSE_GLIOMA_LABELS).map(([key, val]) => [key, v(val, lang)]))}
    renderIcon={iconFor} actions={{ mcq: { label: t('practice'), href: quiz() }, flashcards: { label: lang === 'de' ? 'Karteikarten wählen' : lang === 'en' ? 'Choose flashcards' : 'انتخاب فلش‌کارت', href: `${returnPath}#muster-einordnen` } }}
    theme={{ backgroundImage: '/andarun-galaxy-v3.png', heroImage: '/educational/diffuse-glioma/hero.png', heroImageOpacity: .55, accent: '#608a9d', accentStrong: '#315b72', accentSoft: '#e8f1f5', secondary: '#b78b68', secondaryStrong: '#785437', heroBase: '#13232d' }}
    heroImageAlt={v({ de: 'KI-generierte Konzeptillustration eines diffus infiltrierenden Hirntumors; keine diagnostische Aufnahme.', en: 'AI-generated conceptual illustration of a diffusely infiltrating brain tumour; not a diagnostic image.', fa: 'تصویر مفهومی تولیدشده با هوش مصنوعی از تومور نفوذی منتشر مغز؛ تصویر تشخیصی نیست.' }, lang)} className={styles.page} syncHashNavigation
    sources={<LessonSources title={t('sources')} items={sources} note={v(C.scope, lang)} />}>
    <div className={styles.copy} lang={lang} dir={lang === 'fa' ? 'rtl' : 'ltr'}>
      <LessonSection id={sections[0].id} title={sections[0].label} icon="scan">
        <p className={styles.lead}>{v(C.intro, lang)}</p><p>{v(C.protocol, lang)}</p>
        <PatternTable rows={C.classification} lang={lang} classification />
      </LessonSection>
      <LessonSection id={sections[1].id} title={sections[1].label} icon="brain">
        <p className={styles.lead}>{v(C.astro.lead, lang)}</p>
        <ClinicalFigure kind="astrocytoma" copy={C.astro} figure={1} lang={lang} />
        <PatternTable rows={C.astro.rows} lang={lang} /><Check item={DIFFUSE_GLIOMA_CHECKS[0]} lang={lang} />
      </LessonSection>
      <LessonSection id={sections[2].id} title={sections[2].label} icon="brain">
        <p className={styles.lead}>{v(C.oligo.lead, lang)}</p>
        <ClinicalFigure kind="oligodendroglioma" copy={C.oligo} figure={2} lang={lang} />
        <PatternTable rows={C.oligo.rows} lang={lang} /><Check item={DIFFUSE_GLIOMA_CHECKS[1]} lang={lang} />
      </LessonSection>
      <LessonSection id={sections[3].id} title={sections[3].label} icon="brain">
        <p className={styles.lead}>{v(C.gbm.lead, lang)}</p>
        <ClinicalFigure kind="glioblastoma-typical" copy={C.gbmTypical} figure={1} lang={lang} />
        <PatternTable rows={C.gbm.rows} lang={lang} />
        <aside className={styles.note}>{v(C.gbm.caveat, lang)}</aside>
        <ClinicalFigure kind="glioblastoma" copy={C.gbm} figure={3} lang={lang} /><Check item={DIFFUSE_GLIOMA_CHECKS[2]} lang={lang} />
      </LessonSection>
      <LessonSection id={sections[4].id} title={sections[4].label} icon="check">

        <p>{v(C.report, lang)}</p>
        <div className={styles.practice}>{DIFFUSE_GLIOMA_TOPIC_IDS.map((id, i) => <div key={id}><h3>{v(C.classification[i][0], lang)}</h3><Link href={quiz(id)}>{t('practice')}</Link><Link href={cards(id)}>{t('cards')}</Link></div>)}</div>
      </LessonSection>
    </div>

<LessonSection id="takehome" icon="summary"><TakeHomeList items={C.takeaways.map(item => ({ title: v(item.title, lang), detail: v(item.detail, lang) }))}/></LessonSection>
</StandardLessonShell>
}
