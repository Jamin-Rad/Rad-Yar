'use client'

import { useState } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import StandardLessonShell, { LessonSection, LessonSources } from '@/components/lesson-template/StandardLessonShell'
import { SPINALE_ARACHNOIDITIS_LESSON as lesson } from '@/data/spinaleArachnoiditisLesson'
import styles from './page.module.css'

const L = (de, en, fa) => ({ de, en, fa })
const pick = (value, lang) => typeof value === 'string' ? value : value?.[lang] || value?.de || ''
const labels = {
  contents: L('Lektionsinhalt', 'Lesson contents', 'محتوای درس'), path: L('Lernpfad', 'Learning path', 'مسیر یادگیری'),
  progress: L('gelesen', 'read', 'خوانده‌شده'), continue: L('Weiter', 'Continue', 'ادامه'),
  completeLesson: L('Ganze Lektion als gelesen markieren', 'Mark the full lesson as read', 'علامت‌گذاری کل درس به‌عنوان خوانده‌شده'),
  lessonCompleted: L('Ganze Lektion gelesen', 'Full lesson marked as read', 'کل درس خوانده شد'),
  complete: L('Abschnitt als gelesen markieren', 'Mark section as read', 'علامت‌گذاری بخش به‌عنوان خوانده‌شده'),
  completed: L('Gelesen', 'Read', 'خوانده‌شده'), open: L('Abschnitt öffnen', 'Open section', 'بازکردن بخش'), close: L('Abschnitt schließen', 'Close section', 'بستن بخش'),
  takeHome: L('Vier Regeln merken', 'Four rules to remember', 'چهار نکته برای یادآوری'), sources: L('Quelle und Reichweite', 'Sources and scope', 'منابع و محدوده'),
  quizTitle: L('Kurz selbst prüfen', 'Quick self-check', 'خودآزمایی کوتاه'),
}

function Icon({ id }) {
  const paths = { compartments: 'M4 4h16v16H4zM8 8h8v8H8z', pattern: 'M4 6h16M4 12h16M4 18h16', check: 'M4 12h16', start: 'M12 3v18M3 12h18' }
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[id] || paths.pattern}/></svg>
}

function PatternDiagram({ lang }) {
  const items = [
    [L('Gruppe I · zentral', 'Group I · central', 'گروه ۱ · مرکزی'), L('Wurzeln zentral verklumpt.', 'Roots clumped centrally.', 'تجمع مرکزی ریشه‌ها.')],
    [L('Gruppe II · peripher', 'Group II · peripheral', 'گروه ۲ · محیطی'), L('Wurzeln peripher; zentraler Liquorraum relativ leer.', 'Roots peripheral; central CSF space relatively empty.', 'ریشه‌های محیطی؛ فضای مرکزی مایع مغزی‌نخاعی نسبتاً خالی.')],
    [L('Gruppe III · konglomeriert', 'Group III · conglomerate', 'گروه ۳ · توده‌ای'), L('Wurzeln durch zentrale Gewebemasse ersetzt/überlagert.', 'Roots replaced/obscured by a central tissue mass.', 'ریشه‌ها با توده بافتی مرکزی جایگزین/پوشیده شده‌اند.')],
  ]
  return <><figure className={styles.diagram}><img src={lesson.hero} alt={pick(lesson.alt, lang)}/><figcaption>{pick(L('Schematische, nichtdiagnostische Orientierung an drei morphologischen Gruppen. Keine Darstellung eines Patienten-MRT.', 'Non-diagnostic schematic of three morphologic groups. This is not a patient MRI.', 'شماتیک غیرتشخیصی برای جهت‌یابی در سه گروه مورفولوژیک؛ این تصویر MRI بیمار نیست.'), lang)}</figcaption></figure><ul className={styles.legend}>{items.map(([title, text]) => <li key={pick(title, lang)}><strong>{pick(title, lang)}</strong>{pick(text, lang)}</li>)}</ul></>
}

function SelfCheck({ lang }) {
  const [answer, setAnswer] = useState(null)
  const correct = answer === lesson.check.answerIndex
  return <div className={styles.decision}><h3>{pick(lesson.check.title, lang)}</h3><p>{pick(lesson.check.prompt, lang)}</p>
    <fieldset><legend>{pick(L('Eine Antwort wählen', 'Choose one answer', 'یک پاسخ را انتخاب کنید'), lang)}</legend>{lesson.check.options.map((option, i) => <label key={i}><input type="radio" name="spinal-arachnoiditis-check" checked={answer === i} onChange={() => setAnswer(i)}/><span>{pick(option, lang)}</span></label>)}</fieldset>
    {answer !== null ? <p className={styles.feedback} role="status"><strong>{pick(correct ? L('Richtig. ', 'Correct. ', 'درست است. ') : L('Noch einmal prüfen. ', 'Review the pattern. ', 'الگو را دوباره بررسی کنید. '), lang)}</strong>{pick(lesson.check.feedback, lang)}</p> : null}
  </div>
}

export default function SpinaleArachnoiditisPage() {
  const { lang } = useLanguage()
  const t = value => pick(value, lang)
  const localized = path => lang === 'de' ? path : `${path}?lang=${lang}`
  const sections = [
    { id: 'start', label: t(lesson.intro.title), icon: 'start' },
    ...lesson.sections.map(section => ({ id: section.id, label: t(section.title), icon: section.icon })),
    { id: 'check', label: t(lesson.check.title), icon: 'check' },
    { id: 'take-home', label: t(labels.takeHome), icon: 'pattern', emphasis: true },
  ]
  const references = lesson.references.map(reference => ({ tag: reference.tag, title: t(reference.title), href: reference.href, citation: reference.citation && (typeof reference.citation === 'string' ? reference.citation : t(reference.citation)) }))
  const sourceNote = t(lesson.sourceNote)
  return <StandardLessonShell lessonId={lesson.id} lang={lang} title={t(lesson.title)} author="RadYar" heroImageAlt={t(lesson.alt)} syncHashNavigation
    breadcrumbs={[{ label: 'RadYar', href: localized('/') }, { label: t(L('Wirbelsäule', 'Spine', 'ستون فقرات')), href: localized('/lernen/wirbelsaeule') }, { label: t(lesson.title) }]}
    sections={sections} labels={Object.fromEntries(Object.keys(labels).map(key => [key, t(labels[key])]))} actions={{}} renderIcon={id => <Icon id={id}/>}
    theme={{ backgroundImage: '/andarun-galaxy-v3.png', heroImage: lesson.hero, heroImageOpacity: .92, accent: '#81bfca', accentStrong: '#255e69', accentSoft: '#e4f1f3', secondary: '#a34d7b', secondaryStrong: '#713450', heroBase: '#18333d' }}
    className={styles.page} sources={<LessonSources title={t(labels.sources)} items={references} note={sourceNote}/>}
  >
    <LessonSection id="start" icon="start" title={t(lesson.intro.title)} bodyClassName={styles.body}>
      <p>{t(lesson.intro.text)}</p>
      <aside className={styles.note}>{t(lesson.context)}</aside>
      <p>{t(L('Die PDF führt als mögliche Auslöser intrathekale Injektionen, Wirbelsäulenchirurgie/neuraxiale Eingriffe, Infektionen (einschließlich tuberkulöser Meningitis), Subarachnoidalblutung, chronische Kompression und idiopathische Fälle auf. Das ist keine Häufigkeitsrangliste und keine Aussage zur Ursache des gezeigten Einzelfalls. Pantopaque bzw. ältere ölbasierte Myelographiekontrastmittel werden nur als historische Exposition eingeordnet.', 'The PDF lists possible contexts including intrathecal injections, spinal surgery/neuraxial procedures, infections (including tuberculous meningitis), subarachnoid haemorrhage, chronic compression and idiopathic cases. This is not a prevalence ranking and does not assign a cause to the case shown. Pantopaque and older oil-based myelographic contrast agents are treated only as historical exposures.', 'PDF زمینه‌های احتمالی را شامل تزریق داخل‌تکال، جراحی ستون فقرات/مداخلات نوراکسیال، عفونت‌ها (از جمله مننژیت سلی)، خونریزی زیرعنکبوتیه، فشار مزمن و موارد ایدیوپاتیک می‌داند. این فهرست رتبه‌بندی شیوع نیست و علت مورد نشان‌داده‌شده را تعیین نمی‌کند. پانتوپیک و مواد حاجب روغنی قدیمی میلوگرافی فقط به‌عنوان مواجهه‌های تاریخی مطرح می‌شوند.'))}</p>
    </LessonSection>
    {lesson.sections.map(section => <LessonSection key={section.id} id={section.id} icon={section.icon} title={t(section.title)} bodyClassName={styles.body}>
      <p>{t(section.lead)}</p>
      {section.id === 'patterns' ? <PatternDiagram lang={lang}/> : null}
      <div className={styles.tableWrap}><table><thead><tr><th scope="col">{t(L('Muster / Sequenz', 'Pattern / sequence', 'الگو / سکانس'))}</th><th scope="col">{t(L('Befund und Einordnung', 'Finding and interpretation', 'یافته و تفسیر'))}</th></tr></thead><tbody>{section.rows.map((row, i) => <tr key={i}><th scope="row">{t(row[0])}</th><td>{t(row[1])}</td></tr>)}</tbody></table></div>
      {section.image ? <figure className={styles.caseFigure}><img src={section.image.src} alt={t(section.image.alt)}/><figcaption>{t(section.image.caption)}</figcaption></figure> : null}
      {section.note ? <aside className={styles.note}>{t(section.note)}</aside> : null}
    </LessonSection>)}
    <LessonSection id="check" icon="check" title={t(lesson.check.title)} bodyClassName={styles.body}><SelfCheck lang={lang}/></LessonSection>
    <LessonSection id="take-home" icon="pattern" title={t(labels.takeHome)} bodyClassName={styles.body}><ol className={styles.summary}>{lesson.summary.map((item, i) => <li key={i}>{t(item)}</li>)}</ol></LessonSection>
  </StandardLessonShell>
}
