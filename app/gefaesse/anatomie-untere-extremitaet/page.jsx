'use client'

import { useState } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import StandardLessonShell, { LessonSection, LessonSources } from '@/components/lesson-template/StandardLessonShell'
import { ARTERIAL_ANATOMY_LOWER_LIMB as lesson } from '@/data/arterialAnatomyLowerLimb'
import styles from './page.module.css'

const L = (de, en, fa) => ({ de, en, fa })
const pick = (value, lang) => typeof value === 'string' ? value : value?.[lang] || value?.de || ''
const LABELS = {
  contents: L('Lektionsinhalt', 'Lesson contents', 'محتوای درس'),
  takeHome: L('Drei Verläufe merken', 'Three pathways to remember', 'سه مسیر برای یادآوری'),
  sources: L('Quelle und Reichweite', 'Source and scope', 'منبع و محدوده'),
  choose: L('Eine Antwort wählen', 'Choose one answer', 'یک پاسخ انتخاب کنید'),
}

function Icon({ id }) {
  const paths = {
    start: 'M12 3v18M3 12h18', artery: 'M4 12c4-8 12-8 16 0-4 8-12 8-16 0z',
    branches: 'M12 3v7m0 0L6 16m6-6 6 6', foot: 'M7 3c-1 4-2 6-1 9l-2 5c0 2 2 4 4 4h7c3 0 5-2 4-5l-3-6-1-7',
    check: 'M4 12h16', pattern: 'M4 6h16M4 12h16M4 18h16',
  }
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[id] || paths.pattern}/></svg>
}

function ArterialMap({ lang }) {
  const numbered = [
    L('A. iliaca externa', 'External iliac artery', 'شریان ایلیاک خارجی'),
    L('A. femoralis communis', 'Common femoral artery', 'شریان فمورال مشترک'),
    L('A. profunda femoris', 'Deep femoral artery', 'شریان فمورال عمقی'),
    L('A. femoralis superficialis', 'Superficial femoral artery', 'شریان فمورال سطحی'),
    L('A. poplitea', 'Popliteal artery', 'شریان پوپلیته‌آل'),
    L('Truncus tibiofibularis', 'Tibioperoneal trunk', 'تنهٔ تیبیوپروونئال'),
    L('A. tibialis posterior', 'Posterior tibial artery', 'شریان تیبیال خلفی'),
    L('A. plantaris medialis', 'Medial plantar artery', 'شریان پلانتار داخلی'),
    L('A. fibularis (peronea)', 'Fibular (peroneal) artery', 'شریان فیبولار (پروونئال)'),
    L('A. tibialis anterior → A. dorsalis pedis', 'Anterior tibial → dorsalis pedis artery', 'تیبیال قدامی ← دورسالیس پدیس'),
    L('A. plantaris lateralis', 'Lateral plantar artery', 'شریان پلانتار خارجی'),
    L('Arcus plantaris', 'Plantar arch', 'قوس پلانتار'),
  ]
  return <figure className={styles.diagram}>
    <img src={lesson.diagram} alt={pick(lesson.diagramAlt, lang)} />
    <figcaption>{pick(L('Vereinfachter Verlauf: Die A. tibialis posterior teilt sich in mediale und laterale Plantararterie; nur die laterale bildet den Hauptanteil des Plantarbogens. Die gestrichelte tiefe Verbindung kommt von der A. dorsalis pedis. Nicht maßstabsgetreu und keine Patientenangiographie.', 'Simplified pathway: the posterior tibial artery divides into medial and lateral plantar arteries; only the lateral branch forms most of the plantar arch. The dashed deep connection comes from dorsalis pedis. Not to scale and not a patient angiogram.', 'مسیر ساده‌شده: شریان تیبیال خلفی به شریان‌های پلانتار داخلی و خارجی تقسیم می‌شود؛ فقط شاخهٔ خارجی بخش عمدهٔ قوس پلانتار را می‌سازد. اتصال عمقی خط‌چین از دورسالیس پدیس می‌آید. بدون مقیاس واقعی و فاقد آنژیوگرافی بیمار.'), lang)}</figcaption>
    <ol className={styles.mapKey}>{numbered.map((v, i) => <li key={i}><span aria-hidden="true">{i + 1}</span>{pick(v, lang)}</li>)}</ol>
  </figure>
}

function Table({ rows, lang }) {
  return <div className={styles.tableWrap}><table><thead><tr><th scope="col">{pick(L('Gefäß / Abschnitt', 'Vessel / segment', 'رگ / بخش'), lang)}</th><th scope="col">{pick(L('Verlauf und Orientierung', 'Course and orientation', 'مسیر و جهت‌یابی'), lang)}</th></tr></thead><tbody>{rows.map(([name, details], i) => <tr key={i}><th scope="row">{pick(name, lang)}</th><td>{pick(details, lang)}</td></tr>)}</tbody></table></div>
}

function SelfCheck({ lang }) {
  const [answer, setAnswer] = useState(null)
  return <div className={styles.decision}>
    <h3>{pick(lesson.check.title, lang)}</h3><p>{pick(lesson.check.prompt, lang)}</p>
    <fieldset><legend>{pick(LABELS.choose, lang)}</legend>{lesson.check.options.map((option, i) => <label key={i}><input type="radio" name="lower-limb-artery-check" checked={answer === i} onChange={() => setAnswer(i)}/><span>{pick(option, lang)}</span></label>)}</fieldset>
    {answer !== null ? <div className={styles.feedback} role="status"><strong>{pick(answer === lesson.check.answerIndex ? L('Die Fortsetzung ist: ', 'The continuation is: ', 'ادامهٔ آن عبارت است از: ') : L('Prüfe den Verlauf erneut: ', 'Trace the pathway again: ', 'مسیر را دوباره دنبال کنید: '), lang)}</strong>{pick(lesson.check.feedback, lang)}</div> : null}
  </div>
}

export default function LowerLimbArterialAnatomyPage() {
  const { lang } = useLanguage()
  const t = value => pick(value, lang)
  const localized = path => lang === 'de' ? path : `${path}?lang=${lang}`
  const labels = { contents: t(LABELS.contents), takeHome: t(LABELS.takeHome) }
  const sections = [
    { id: 'start', label: t(lesson.intro.title), icon: 'start' },
    ...lesson.chapters.map(ch => ({ id: ch.id, label: t(ch.title), icon: ch.icon })),
    { id: 'check', label: t(lesson.check.title), icon: 'check' },
    { id: 'take-home', label: labels.takeHome, icon: 'pattern', emphasis: true },
  ]
  const sources = lesson.references.map(ref => ({ tag: ref.tag, title: t(ref.title), href: ref.href, citation: ref.citation && (typeof ref.citation === 'string' ? ref.citation : t(ref.citation)) }))
  return <StandardLessonShell lessonId={lesson.id} lang={lang} title={t(lesson.title)} author="RadYar"
    breadcrumbs={[{ label: 'RadYar', href: localized('/') }, { label: t(L('Gefäßbildgebung', 'Vascular imaging', 'تصویربرداری عروقی')), href: localized('/lernen') }, { label: t(lesson.title) }]}
    sections={sections} labels={labels} actions={{}} renderIcon={id => <Icon id={id}/>}
    theme={{ backgroundImage: '/andarun-galaxy-v3.png', heroImage: lesson.hero, heroImageOpacity: .95, accent: '#81bfca', accentStrong: '#255e69', accentSoft: '#e4f1f3', secondary: '#a34d7b', secondaryStrong: '#713450', heroBase: '#18333d' }}
    heroImageAlt={t(lesson.alt)} className={styles.page} syncHashNavigation
    sources={<LessonSources title={t(LABELS.sources)} items={sources} note={t(lesson.scope)}/>}
  >
    <LessonSection id="start" icon="start" title={t(lesson.intro.title)}><div className={styles.body}><p>{t(lesson.intro.text)}</p><ArterialMap lang={lang}/><aside className={styles.note}>{t(lesson.scope)}</aside></div></LessonSection>
    {lesson.chapters.map(ch => <LessonSection key={ch.id} id={ch.id} icon={ch.icon} title={t(ch.title)}><div className={styles.body}><p>{t(ch.lead)}</p><Table rows={ch.rows} lang={lang}/><aside className={styles.note}>{t(ch.note)}</aside></div></LessonSection>)}
    <LessonSection id="check" icon="check" title={t(lesson.check.title)}><SelfCheck lang={lang}/></LessonSection>
    <LessonSection id="take-home" icon="pattern" title={labels.takeHome}><ol className={styles.summary}>{lesson.takeHome.map((item, i) => <li key={i}>{t(item)}</li>)}</ol></LessonSection>
  </StandardLessonShell>
}
