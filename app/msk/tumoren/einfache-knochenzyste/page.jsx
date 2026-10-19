'use client'

import { useState } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import StandardLessonShell, { LessonSection, LessonSources } from '@/components/lesson-template/StandardLessonShell'
import { SIMPLE_BONE_CYST_LESSON as lesson } from '@/data/mskSimpleBoneCystLesson'
import styles from './page.module.css'

const L = (de, en, fa) => ({ de, en, fa })
const pick = (value, lang) => typeof value === 'string' ? value : value?.[lang] ?? value?.de ?? ''

function Icon({ id }) {
  const paths = {
    pattern: 'M4 18h16M6 15l3-5 3 3 5-8 2 3', imaging: 'M4 5h16v14H4zM7 15l3-4 2 2 3-5 3 7',
    differential: 'M12 3v5m0 4v9M5 8h14M5 16h14', management: 'M4 12h16M12 4v16M7 7l10 10',
    check: 'm4 12 5 5L20 6', summary: 'M5 5h14M5 12h14M5 19h14',
  }
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[id] || paths.pattern} /></svg>
}

function Matrix({ rows, lang, caption }) {
  const t = value => pick(value, lang)
  return <div className={styles.tableWrap} role="region" tabIndex={0} aria-label={t(L('Vergleichstabelle', 'Comparison table', 'جدول مقایسه'))}>
    <table><caption>{t(caption || L('Befund und Einordnung', 'Finding and interpretation', 'یافته و تفسیر'))}</caption>
      <thead><tr><th scope="col">{t(L('Merkmal', 'Feature', 'ویژگی'))}</th><th scope="col">{t(L('Einordnung', 'Interpretation', 'تفسیر'))}</th></tr></thead>
      <tbody>{rows.map(([name, detail], index) => <tr key={index}><th scope="row">{t(name)}</th><td>{t(detail)}</td></tr>)}</tbody>
    </table>
  </div>
}

function SourceImages({ lang }) {
  const t = value => pick(value, lang)
  return <figure className={styles.caseFigure}>
    <div className={styles.imageGrid}>
      <div><img src="/educational/simple-bone-cyst/Image1109.jpg" alt={t(L('Röntgenbild des proximalen Humerus mit zentraler länglicher Aufhellung; Quelle MSK.pdf, PDF-Seite 110.', 'Proximal humerus radiograph with central elongated lucency; source MSK.pdf, PDF p. 110.', 'رادیوگرافی هومروس پروگزیمال با شفافیت مرکزی کشیده؛ منبع MSK.pdf، صفحهٔ ۱۱۰.'))} width="286" height="630" loading="lazy"/><p>{t(L('Proximaler Humerus · rID 17146', 'Proximal humerus · rID 17146', 'هومروس پروگزیمال · rID 17146'))}</p></div>
      <div><img src="/educational/simple-bone-cyst/Image1110.jpg" alt={t(L('Röntgenbild des proximalen Femurs mit zentraler länglicher Aufhellung; Quelle MSK.pdf, PDF-Seite 110.', 'Proximal femur radiograph with central elongated lucency; source MSK.pdf, PDF p. 110.', 'رادیوگرافی فمور پروگزیمال با شفافیت مرکزی کشیده؛ منبع MSK.pdf، صفحهٔ ۱۱۰.'))} width="630" height="630" loading="lazy"/><p>{t(L('Proximales Femur · rID 10361', 'Proximal femur · rID 10361', 'فمور پروگزیمال · rID 10361'))}</p></div>
    </div>
    <figcaption>{t(L('Beispiele aus MSK.pdf, PDF-S. 110 (Druckseite 109). Die Originalbilder wurden aus den eingebetteten Bilddaten extrahiert, damit die Wasserzeichen und PDF-Beschriftung nicht über den Röntgenaufnahmen liegen. Die Abbildungszuordnung folgt der PDF; eine unabhängige Fallbeschreibung liegt nicht vor.', 'Examples from MSK.pdf, PDF p. 110 (printed p. 109). Original images were extracted from embedded image data so PDF watermarks and page labels do not overlay the radiographs. Labels follow the PDF; no independent case description is available.', 'نمونه‌ها از MSK.pdf، صفحهٔ PDF ۱۱۰ (صفحهٔ چاپی ۱۰۹). تصاویر اصلی از داده‌های تصویری تعبیه‌شده استخراج شدند تا واترمارک و برچسب‌های PDF روی رادیوگرافی نیفتند. برچسب‌ها از PDF پیروی می‌کنند و شرح موردی مستقل در دسترس نیست.'))}</figcaption>
  </figure>
}

function SelfCheck({ lang }) {
  const [answer, setAnswer] = useState(null)
  const t = value => pick(value, lang)
  const check = lesson.check
  return <div className={styles.decision}>
    <h3>{t(check.title)}</h3><p>{t(check.prompt)}</p>
    <fieldset><legend>{t(L('Eine Antwort auswählen', 'Choose one answer', 'یک پاسخ انتخاب کنید'))}</legend>
      {check.options.map((option, index) => <label key={index}><input type="radio" name="simple-bone-cyst-check" checked={answer === index} onChange={() => setAnswer(index)} /><span>{t(option)}</span></label>)}
    </fieldset>
    {answer !== null ? <p className={styles.feedback} role="status"><strong>{t(answer === check.answer ? L('Richtig. ', 'Correct. ', 'درست است. ') : L('Noch einmal prüfen. ', 'Review the pattern. ', 'الگو را دوباره بررسی کنید. '))}</strong>{t(answer === check.answer ? check.feedback : check.retry)}</p> : null}
  </div>
}

export default function EinfacheKnochenzystePage() {
  const { lang } = useLanguage()
  const t = value => pick(value, lang)
  const labels = {
    path: t(L('Lernweg', 'Learning path', 'مسیر یادگیری')), progress: t(L('gelesen', 'read', 'خوانده‌شده')),
    continue: t(L('Weiterlernen', 'Continue learning', 'ادامهٔ یادگیری')), completeLesson: t(L('Ganze Lektion als gelesen markieren', 'Mark full lesson as read', 'علامت‌گذاری کل درس به‌عنوان خوانده‌شده')),
    lessonCompleted: t(L('Ganze Lektion gelesen', 'Full lesson marked as read', 'کل درس خوانده شد')),
    complete: t(L('Abschnitt als gelesen markieren', 'Mark section as read', 'علامت‌گذاری بخش به‌عنوان خوانده‌شده')),
    completed: t(L('Als gelesen markiert', 'Marked as read', 'خوانده‌شده')), open: t(L('Abschnitt öffnen', 'Open section', 'بازکردن بخش')),
    close: t(L('Schließen', 'Close', 'بستن')), takeHome: t(L('Vier Regeln mitnehmen', 'Four rules to remember', 'چهار نکته برای یادآوری')),
    sources: t(L('Quellen und Umfang', 'Sources and scope', 'منابع و دامنه')),
  }
  const path = value => lang === 'de' ? value : `${value}?lang=${lang}`
  const sections = [...lesson.sections.map(({ id, title, icon }) => ({ id, label: t(title), icon })), { id: 'check', label: t(lesson.check.title), icon: 'check' }, { id: 'take-home', label: labels.takeHome, icon: 'summary', emphasis: true }]
  const sources = lesson.references.map(reference => ({ ...reference, title: t(reference.title), citation: t(reference.citation) }))
  return <StandardLessonShell lessonId={lesson.id} lang={lang} title={t(lesson.title)} author="RadYar" syncHashNavigation
    heroImageAlt={t(L('Schematische, nichtdiagnostische Darstellung einer zentralen metaphysären Knochenzyste in einem langen Röhrenknochen.', 'Non-diagnostic schematic of a central metaphyseal bone cyst in a long bone.', 'شماتیک غیرتشخیصی کیست مرکزی متافیزی در استخوان بلند.'))}
    breadcrumbs={[{ label: 'RadYar', href: path('/') }, { label: 'MSK', href: path('/lernen/msk') }, { label: t(lesson.title) }]}
    sections={sections} labels={labels} actions={{}} renderIcon={id => <Icon id={id} />}
    theme={{ backgroundImage: '/andarun-galaxy-v3.png', heroImage: lesson.hero, heroImageOpacity: .95, accent: '#65b7b5', accentStrong: '#246a6b', accentSoft: '#e3f1ef', secondary: '#d8a362', secondaryStrong: '#80522b', heroBase: '#193b3d' }}
    className={styles.page} sources={<LessonSources title={labels.sources} items={sources} note={t(lesson.sourceNote)} />}>
    {lesson.sections.map(section => <LessonSection key={section.id} id={section.id} icon={section.icon} title={t(section.title)} bodyClassName={styles.body}>
      <p>{t(section.lead)}</p>
      <Matrix rows={section.rows} lang={lang} />
      {section.id === 'radiograph-mri' ? <SourceImages lang={lang} /> : null}
      {section.note ? <aside className={styles.note}>{t(section.note)}</aside> : null}
    </LessonSection>)}
    <LessonSection id="check" icon="check" title={t(lesson.check.title)} bodyClassName={styles.body}><SelfCheck lang={lang} /></LessonSection>
    <LessonSection id="take-home" icon="summary" title={labels.takeHome} bodyClassName={styles.body}><ol className={styles.summary}>{lesson.summary.map((item, index) => <li key={index}>{t(item)}</li>)}</ol></LessonSection>
  </StandardLessonShell>
}
