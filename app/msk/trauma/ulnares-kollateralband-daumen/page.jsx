'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import StandardLessonShell, { LessonSection, LessonSources } from '@/components/lesson-template/StandardLessonShell'
import { THUMB_UCL_LESSON as lesson } from '@/data/thumbUclLesson'
import styles from './page.module.css'

const L = (de, en, fa) => ({ de, en, fa })
const pick = (value, lang) => value?.[lang] || value?.de || value

function Decision({ lang, section }) {
  const [answer, setAnswer] = useState(null)
  const text = (de, en, fa) => pick(L(de, en, fa), lang)
  return <div className={styles.decision}>
    <h3>{text('Selbstprüfung am Bild', 'Image-based self-check', 'خودآزمایی بر پایهٔ تصویر')}</h3>
    <p>{pick(section.task, lang)}</p>
    <fieldset><legend>{text('Eine Antwort auswählen', 'Choose one answer', 'یک پاسخ را انتخاب کنید')}</legend>
      {section.options.map((option, index) => <label key={index}><input type="radio" name={`thumb-ucl-${section.id}`} checked={answer === index} onChange={() => setAnswer(index)} /><span>{pick(option, lang)}</span></label>)}
    </fieldset>
    {answer !== null ? <p className={`${styles.feedback} ${answer === section.answer ? styles.correct : ''}`} role="status"><strong>{answer === section.answer ? text('Richtig. ', 'Correct. ', 'درست است. ') : text('Noch einmal prüfen. ', 'Review this once more. ', 'دوباره بررسی کنید. ')}</strong>{pick(section.feedback[answer], lang)}</p> : null}
  </div>
}

function Icon({ id }) {
  const paths = { verletzungsmuster: 'M12 3v18M5 8l7 4 7-4M5 16l7-4 7 4', roentgen: 'M5 4h14v16H5zM8 8h8M8 12h8M8 16h5', weichteilbildgebung: 'M4 12h16M12 4v16M6 6l12 12M18 6 6 18', summary: 'm5 12 4 4L19 6' }
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d={paths[id] || paths.summary} /></svg>
}

export default function ThumbUclLessonPage() {
  const { lang } = useLanguage()
  const t = (de, en, fa) => pick(L(de, en, fa), lang)
  const langHref = href => lang === 'de' ? href : `${href}${href.includes('?') ? '&' : '?'}lang=${lang}`
  const sections = [...lesson.sections.map(section => ({ id: section.id, label: pick(section.title, lang), icon: section.id })), { id: 'take-home', label: t('Vier Muster merken', 'Remember four patterns', 'چهار الگو را به خاطر بسپارید'), icon: 'summary', emphasis: true }]
  const sources = [
    { tag: 'MSK.pdf · PDF S.22', title: t('Daumen-UCL und Stener-Läsion', 'Thumb UCL and Stener lesion', 'UCL شست و ضایعهٔ استنر'), citation: t('PDF-S.22 (gedruckte S.21), Text und schematische Abbildungen geprüft.', 'PDF p.22 (printed p.21), text and schematic illustrations inspected.', 'صفحهٔ PDF ۲۲ (چاپی ۲۱)، متن و تصاویر شماتیک بررسی شدند.') },
    { tag: 'MSK.pdf · PDF S.23', title: t('MRT-Beispiel einer Stener-Läsion', 'MRI example of a Stener lesion', 'نمونهٔ MRI ضایعهٔ استنر'), citation: pick(lesson.sections[2].imageCaption, lang) },
    ...lesson.references.map(item => ({ tag: 'Imaging evidence', title: pick(item.label, lang), href: item.url, citation: pick(item.label, lang) })),
  ]
  return <StandardLessonShell lessonId={lesson.id} lang={lang} title={pick(lesson.title, lang)} author="Dr. Zia"
    breadcrumbs={[{ label: 'RadYar', href: langHref('/') }, { label: t('MSK', 'MSK', 'عضلانی‌اسکلتی'), href: langHref('/lernen/msk') }, { label: pick(lesson.title, lang) }]}
    sections={sections}
    labels={{ contents: t('Lektionsinhalt', 'Lesson content', 'محتوای درس'), toc: t('Lernpfad', 'Learning path', 'مسیر یادگیری'), path: t('Lernpfad', 'Learning path', 'مسیر یادگیری'), progress: t('gelesen', 'read', 'خوانده‌شده'), continue: t('Lektion fortsetzen', 'Continue lesson', 'ادامهٔ درس'), completeLesson: t('Ganze Lektion als gelesen markieren', 'Mark full lesson as read', 'علامت‌گذاری کل درس به‌عنوان خوانده‌شده'), lessonCompleted: t('Ganze Lektion gelesen', 'Full lesson marked as read', 'کل درس خوانده شد'), complete: t('Abschnitt als gelesen markieren', 'Mark section as read', 'این بخش را خواندم'), completed: t('Als gelesen markiert', 'Marked as read', 'خوانده‌شده'), open: t('Abschnitt öffnen', 'Open section', 'بازکردن بخش'), close: t('Schließen', 'Close', 'بستن'), takeHome: t('Vier Muster merken', 'Remember four patterns', 'چهار الگو را به خاطر بسپارید'), sources: t('Quellen', 'Sources', 'منابع') }}
    actions={{
      mcq: { label: t('Quiz zur Daumen-UCL-Verletzung', 'Thumb UCL injury questions', 'آزمون آسیب UCL شست'), href: langHref('/ueben/quiz?fach=msk&n=8&themen=bandverletzungen-daumen') },
      flashcards: { label: t('Lernkarten zur Daumen-UCL-Verletzung', 'Thumb UCL injury flashcards', 'فلش‌کارت‌های آسیب UCL شست'), href: langHref('/flashcards/bandverletzungen-daumen') },
    }}
    renderIcon={id => <Icon id={id} />}
    theme={{ backgroundImage: '/andarun-galaxy-v3.png', heroImage: lesson.hero, heroImageOpacity: .72, accent: '#69c8c0', accentStrong: '#176c68', accentSoft: '#d9f2ee', secondary: '#a4b6c3', secondaryStrong: '#4f6575', heroBase: '#172d3a' }}
    heroImageAlt={pick(lesson.heroAlt, lang)} className={styles.page}
    sources={<LessonSources title={t('Quellen und Umfang', 'Sources and scope', 'منابع و دامنه')} items={sources} note={pick(lesson.scope, lang)} />}>
    {lesson.sections.map(section => <LessonSection key={section.id} id={section.id} icon={section.id} title={pick(section.title, lang)} bodyClassName={styles.body}>
      <p>{pick(section.lead, lang)}</p>
      {section.id === 'verletzungsmuster' ? <div className={styles.diagramKey} aria-label={t('Legende zur Schemazeichnung', 'Schematic key', 'راهنمای شکل شماتیک')}>
        <p><strong>{t('A', 'A', 'A')}:</strong> {t('intaktes UCL unter der Aponeurose', 'intact UCL beneath the aponeurosis', 'UCL سالم در زیر آپونوروز')}</p>
        <p><strong>{t('B', 'B', 'B')}:</strong> {t('Stener-Läsion mit dazwischenliegender Aponeurose', 'Stener lesion with the aponeurosis interposed', 'ضایعهٔ استنر با آپونوروزِ قرارگرفته در میان رباط و محل اتصال')}</p>
        <p><strong>1:</strong> {t('UCL', 'UCL', 'UCL')} · <strong>2:</strong> {t('retrahierter Bandstumpf', 'retracted ligament stump', 'انتهای رتراکتهٔ رباط')} · <strong>3:</strong> {t('Adduktorenaponeurose', 'adductor aponeurosis', 'آپونوروز اداکتور')}</p>
      </div> : null}
      {section.paragraphs.map((paragraph, index) => <p key={index}>{pick(paragraph, lang)}</p>)}
      {section.image ? <figure className={styles.figure}><Image src={section.image} width={section.imageWidth} height={section.imageHeight} alt={pick(section.imageAlt, lang)} sizes="(max-width: 760px) 100vw, 850px" /><figcaption>{pick(section.imageCaption, lang)}</figcaption></figure> : null}
      {section.task ? <Decision lang={lang} section={section} /> : null}
      {section.source ? <small className={styles.sourceNote}>{t('Quelle:', 'Source:', 'منبع:')} {pick(section.source, lang)}</small> : null}
    </LessonSection>)}
    <LessonSection id="take-home" icon="summary" title={t('Vier Muster merken', 'Remember four patterns', 'چهار الگو را به خاطر بسپارید')}>
      <ol className={styles.summary}>{lesson.summary.map((rule, index) => <li key={index}>{pick(rule, lang)}</li>)}</ol>
    </LessonSection>
  </StandardLessonShell>
}
