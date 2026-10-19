'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import StandardLessonShell, { LessonSection, LessonSources, TakeHomeList } from '@/components/lesson-template/StandardLessonShell'
import { GEHIRN_PARKINSON_LESSON as lesson } from '@/data/gehirnParkinsonLesson'
import styles from './page.module.css'

const L = (de, en, fa) => ({ de, en, fa })
const pick = (value, lang) => value?.[lang] || value?.de || ''
const LABELS = {
  contents: L('Lektionsinhalt', 'Lesson content', 'محتوای درس'), path: L('Lernpfad', 'Learning path', 'مسیر یادگیری'),
  progress: L('gelesen', 'read', 'خوانده‌شده'), continue: L('Lektion fortsetzen', 'Continue lesson', 'ادامهٔ درس'),
  completeLesson: L('Ganze Lektion als gelesen markieren', 'Mark full lesson as read', 'علامت‌گذاری کل درس به‌عنوان خوانده‌شده'),
  lessonCompleted: L('Ganze Lektion gelesen', 'Full lesson marked as read', 'کل درس خوانده شد'),
  complete: L('Abschnitt als gelesen markieren', 'Mark section as read', 'این بخش را خواندم'), completed: L('Als gelesen markiert', 'Marked as read', 'خوانده‌شده'),
  open: L('Abschnitt öffnen', 'Open section', 'بازکردن بخش'), close: L('Schließen', 'Close', 'بستن'),
  takeHome: L('Drei Regeln mitnehmen', 'Three rules to remember', 'سه نکته برای یادآوری'),
}

function Icon({ id }) {
  const paths = { mri: 'M4 7h16v10H4zM7 10h4m2 4h4', nuclear: 'M12 2v5m0 10v5M2 12h5m10 0h5M5 5l3.5 3.5m7 7L19 19m0-14-3.5 3.5m-7 7L5 19', report: 'M5 3h14v18H5zM8 8h8m-8 4h8m-8 4h5', summary: 'M5 5h14M5 12h14M5 19h14' }
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[id] || paths.report}/></svg>
}

function Decision({ lang }) {
  const [answer, setAnswer] = useState(null)
  const question = lesson.assessment
  return <div className={styles.decision}>
    <h3>{pick(L('Selbstcheck: technische Sicherheit', 'Self-check: technical confidence', 'خودآزمایی: اطمینان فنی'), lang)}</h3>
    <p>{pick(question.question, lang)}</p>
    <fieldset><legend>{pick(L('Eine Antwort auswählen', 'Choose one answer', 'یک پاسخ را انتخاب کنید'), lang)}</legend>
      {question.options.map((option, index) => <label key={index}><input type="radio" name={question.id} checked={answer === index} onChange={() => setAnswer(index)}/><span>{pick(option, lang)}</span></label>)}
    </fieldset>
    {answer !== null ? <p className={styles.feedback} role="status"><strong>{pick(answer === question.correctIndex ? L('Richtig. ', 'Correct. ', 'درست است. ') : L('Noch einmal prüfen. ', 'Review this once more. ', 'دوباره بررسی کنید. '), lang)}</strong>{pick(question.optionFeedback[answer], lang)}</p> : <p className={styles.retry}>{pick(question.retry, lang)}</p>}
  </div>
}

export default function ParkinsonPage() {
  const { lang } = useLanguage()
  const labels = Object.fromEntries(Object.entries(LABELS).map(([key, value]) => [key, pick(value, lang)]))
  const sections = [...lesson.chapters.map(chapter => ({ id: chapter.id, label: pick(chapter.title, lang), icon: chapter.id })), { id: 'take-home', label: labels.takeHome, icon: 'summary', emphasis: true }]
  const langHref = path => lang === 'de' ? path : `${path}${path.includes('?') ? '&' : '?'}lang=${lang}`
  const sources = lesson.references.filter(reference => reference.href).map(reference => ({ tag: reference.href.includes('8323030') || reference.href.includes('4975367') ? 'MRT / SWI' : reference.href.includes('7300075') ? 'DAT-SPECT' : 'Klinik', title: reference.label, href: reference.href, citation: reference.href.includes('8323030') ? 'Brain Behav. 2021;11:e02202. doi:10.1002/brb3.2202.' : reference.href.includes('4975367') ? 'Pol J Radiol. 2016;81:363–369. doi:10.12659/PJR.897090.' : reference.href.includes('7300075') ? 'Eur J Nucl Med Mol Imaging. 2020;47:1885–1912. doi:10.1007/s00259-020-04817-8.' : 'Mov Disord. 2015;30:1591–1601. doi:10.1002/mds.26424.' }))
  const takeHome = [
    { title: pick(L('Technik zuerst prüfen', 'Check technique first', 'ابتدا کیفیت فنی را بررسی کنید'), lang), detail: pick(L('Sequenz, Ebene und Bildqualität bestimmen, ob Nigrosom 1 sicher beurteilbar ist.', 'Sequence, plane, and image quality determine whether nigrosome 1 can be assessed confidently.', 'توالی، صفحه و کیفیت تصویر تعیین می‌کنند که ارزیابی نیگروزوم ۱ قابل‌اعتماد است یا نه.'), lang) },
    { title: pick(L('MRT und DAT-SPECT getrennt einordnen', 'Interpret MRI and DAT-SPECT separately', 'MRI و DAT-SPECT را جداگانه تفسیر کنید'), lang), detail: pick(L('Die MRT zeigt Struktur; DAT-SPECT erfasst funktionell die präsynaptische DAT-Bindung.', 'MRI depicts structure; DAT-SPECT functionally assesses presynaptic DAT binding.', 'MRI ساختار را نشان می‌دهد؛ DAT-SPECT اتصال پیش‌سیناپسی DAT را به‌صورت عملکردی می‌سنجد.'), lang) },
    { title: pick(L('Bildgebung bleibt ergänzend', 'Imaging remains adjunctive', 'تصویربرداری نقش تکمیلی دارد'), lang), detail: pick(L('Konventionelle MRT ist bei idiopathischem Parkinson oft unauffällig und sucht vor allem strukturelle Alternativen.', 'Conventional MRI is often normal in idiopathic Parkinson disease and mainly looks for structural alternatives.', 'MRI معمول در پارکینسون ایدیوپاتیک اغلب طبیعی است و بیشتر برای یافتن علل ساختاری جایگزین به‌کار می‌رود.'), lang) },
  ]
  return <StandardLessonShell lessonId={lesson.id} lang={lang} title={pick(lesson.title, lang)} author="Dr. Zia"
    breadcrumbs={[{ label: 'RadYar', href: langHref('/') }, { label: pick(L('Gehirn', 'Brain', 'مغز'), lang), href: langHref('/lernen/gehirn') }, { label: pick(L('Neurodegeneration', 'Neurodegeneration', 'تخریب عصبی'), lang) }]}
    sections={sections} labels={labels} renderIcon={id => <Icon id={id}/>} syncHashNavigation
    actions={{}}
    theme={{ backgroundImage: '/andarun-galaxy-v3.png', heroImage: '/educational/parkinson/hero.svg', heroImageOpacity: .8, accent: '#79d5e5', accentStrong: '#13677b', accentSoft: '#dff4f7', secondary: '#a99be8', secondaryStrong: '#57448f', heroBase: '#122a3a' }}
    heroImageAlt={pick(L('Abstraktes Schema zu MRT und funktioneller Bildgebung, keine diagnostische Aufnahme', 'Abstract MRI and functional imaging concept, not a diagnostic scan', 'نمای مفهومی انتزاعی از MRI و تصویربرداری عملکردی، نه تصویر تشخیصی'), lang)}
    className={styles.page}
    sources={<LessonSources title={pick(L('Quellen', 'Sources', 'منابع'), lang)} items={sources} note={pick(lesson.media, lang)}/>}
  >
    {lesson.chapters.map(chapter => <LessonSection key={chapter.id} id={chapter.id} icon={chapter.id} title={pick(chapter.title, lang)} bodyClassName={styles.body}>
      {pick(chapter.text, lang).split(/\n\s*\n/).map((paragraph, index) => <p key={index}>{paragraph}</p>)}
      {chapter.id === 'mri' ? <figure className={styles.figure}><div className={styles.images}>
        <Image src="/educational/parkinson/nigrosome-normal.png" width={700} height={470} alt={pick(L('PDF-Beispiel: normales Nigrosom-1-Zeichen', 'PDF example: normal nigrosome-1 sign', 'نمونهٔ PDF: نشانهٔ طبیعی نیگروزوم ۱'), lang)} sizes="(max-width: 760px) 100vw, 680px"/>
        <Image src="/educational/parkinson/nigrosome-parkinson.png" width={700} height={470} alt={pick(L('PDF-Beispiel, als Parkinson beschriftet: Nigrosom-Zeichen nicht sichtbar', 'PDF example labelled Parkinson disease: nigrosome sign not visible', 'نمونهٔ PDF با برچسب پارکینسون: نشانهٔ نیگروزوم دیده نمی‌شود'), lang)} sizes="(max-width: 760px) 100vw, 680px"/>
      </div><figcaption>{pick(lesson.imageCaption, lang)}</figcaption></figure> : null}
      {chapter.id === 'report' ? <Decision lang={lang}/> : null}
    </LessonSection>)}
    <LessonSection id="take-home" icon="summary" title={labels.takeHome}><TakeHomeList items={takeHome}/></LessonSection>
  </StandardLessonShell>
}
