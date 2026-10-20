'use client'

import { useState } from 'react'
import Footer from '@/components/Footer'
import StandardLessonShell, { LessonSection, LessonSources } from '@/components/lesson-template/StandardLessonShell'
import { useLanguage } from '@/providers/LanguageProvider'
import { CT_BASICS_SECTIONS, CT_BASICS_QUESTIONS } from '@/data/technikCTBasicsLesson'
import styles from './page.module.css'

const L = (de,en,fa) => ({de,en,fa})
const pick = (value,lang) => value?.[lang] || value?.de || ''
const withLang = (path,lang) => {
  if (lang === 'de') return path
  const hashAt = path.indexOf('#')
  const pathname = hashAt < 0 ? path : path.slice(0,hashAt)
  const hash = hashAt < 0 ? '' : path.slice(hashAt)
  return `${pathname}${pathname.includes('?')?'&':'?'}lang=${lang}${hash}`
}
const labels = {
  path:L('Lernpfad','Learning path','مسیر یادگیری'), progress:L('gelesen','read','خوانده‌شده'),
  continue:L('Lektion fortsetzen','Continue lesson','ادامهٔ درس'),
  completeLesson:L('Ganze Lektion als gelesen markieren','Mark full lesson as read','علامت‌گذاری کل درس به‌عنوان خوانده‌شده'),
  lessonCompleted:L('Ganze Lektion gelesen','Full lesson marked as read','کل درس خوانده شد'),
  complete:L('Abschnitt als gelesen markieren','Mark section as read','علامت‌گذاری بخش به‌عنوان خوانده‌شده'),
  completed:L('Als gelesen markiert','Marked as read','خوانده‌شده'), open:L('Abschnitt öffnen','Open section','بازکردن بخش'),
  close:L('Schließen','Close','بستن'), takeHome:L('Drei Regeln mitnehmen','Three rules to remember','سه قاعده برای یادآوری'),
  choose:L('Eine Antwort auswählen','Choose one answer','یک پاسخ انتخاب کنید'),
  check:L('Selbstcheck','Self-check','خودآزمایی'), sources:L('Quellen und Aussagebereich','Sources and scope','منابع و محدودهٔ گزاره‌ها'),
  mcq:L('Prüfungsfragen','Practice questions','سؤال‌های تمرینی'), flashcards:L('Flashcards','Flashcards','فلش‌کارت‌ها'),
}
const references = [
  {href:'https://www.aapm.org/pubs/CTProtocols/documents/CTTerminologyLexicon.pdf',label:L('AAPM CT Lexicon v2.0','AAPM CT Lexicon v2.0','واژه‌نامه CT انجمن AAPM نسخهٔ ۲'),citation:L('2022; Standardbegriffe zu Akquisition und Pitch.','2022; standard terminology for acquisition and pitch.','۲۰۲۲؛ اصطلاحات استاندارد تصویربرداری و pitch.'),scope:L('Terminologie, keine gerätespezifische Protokoll- oder Dosisvorgabe.','Terminology only; not a scanner-specific protocol or dose prescription.','فقط اصطلاح‌شناسی؛ نه دستور پروتکل یا دوز وابسته به دستگاه.')},
  {href:'https://doi.org/10.1117/1.JMI.8.5.052109',label:L('Hsieh & Flohr. Computed tomography recent history and future perspectives.','Hsieh & Flohr. Computed tomography recent history and future perspectives.','Hsieh و Flohr. تاریخچهٔ اخیر و چشم‌انداز آیندهٔ CT.'),citation:L('J Med Imaging. 2021;8(5):052109.','J Med Imaging. 2021;8(5):052109.','J Med Imaging. 2021;8(5):052109.'),scope:L('Technologische Entwicklung einschließlich Helikal-, Mehrzeilen- und Photon-Counting-CT.','Technical evolution including helical, multidetector and photon-counting CT.','تحول فناوری شامل CT مارپیچی، چندردیفه و شمارش فوتون.')},
  {href:'https://pmc.ncbi.nlm.nih.gov/articles/PMC2780825/',label:L('Bardo & Brown. Cardiac multidetector CT: basic physics of image acquisition.','Bardo & Brown. Cardiac multidetector CT: basic physics of image acquisition.','Bardo و Brown. فیزیک پایهٔ تصویربرداری در CT چندردیفهٔ قلب.'),citation:L('Curr Cardiol Rev. 2008;4(3):231–243.','Curr Cardiol Rev. 2008;4(3):231–243.','Curr Cardiol Rev. 2008;4(3):231–243.'),scope:L('Technischer Überblick über Scan-Modi und Hardware; keine Herz-CT-Protokollvorgabe.','Technical overview of scan modes and hardware; not a cardiac CT protocol.','مرور فنی روش‌های تصویربرداری و سخت‌افزار؛ نه دستور پروتکل CT قلب.')},
  {href:'https://pubmed.ncbi.nlm.nih.gov/36047540/',label:L('Photon-counting detector CT: key points radiologists should know.','Photon-counting detector CT: key points radiologists should know.','نکات کلیدی آشکارساز شمارش فوتون CT برای رادیولوژیست‌ها.'),citation:L('RadioGraphics. 2022;42(6):1531–1553.','RadioGraphics. 2022;42(6):1531–1553.','RadioGraphics. 2022;42(6):1531–1553.'),scope:L('Direktumwandlung und potenzielle Leistungsmerkmale; keine Garantie für individuelle Dosisreduktion.','Direct conversion and potential technical features; no guarantee of individual dose reduction.','تبدیل مستقیم و ویژگی‌های فنی بالقوه؛ بدون تضمین کاهش دوز در بیمار مشخص.')},
]

function Check({section,lang}) {
  const [selected,setSelected] = useState(null)
  const q = CT_BASICS_QUESTIONS.find(item => item.id === `${section.curriculumId}-${lang}-01`) || CT_BASICS_QUESTIONS.find(item => item.id === `${section.curriculumId}-de-01`)
  const feedback = selected === null ? '' : selected === q.correct ? q.explanation : q.wrongExplanations[selected]
  return <div className={styles.check}>
    <h3>{pick(labels.check,lang)} · {pick(section.title,lang)}</h3><p>{q.question}</p>
    <fieldset><legend>{pick(labels.choose,lang)}</legend>{q.options.map(option=><label key={option.id} className={styles.option}>
      <input type="radio" name={q.id} checked={selected===option.id} onChange={()=>setSelected(option.id)}/><span>{option.text}</span>
    </label>)}</fieldset>
    {feedback?<p role="status" className={styles.feedback}>{feedback}</p>:null}
  </div>
}

function TopicLinks({section,lang}) {
  const t=value=>pick(value,lang)
  const hrefFor = path => withLang(path,lang)
  const route=`/technik/ct-grundlagen#${section.id}`
  return <nav className={styles.topicLinks} aria-label={t(section.title)}>
    <a href={hrefFor(`/ueben/quiz?fach=technik&n=1&themen=${section.curriculumId}&from=${encodeURIComponent(hrefFor(route))}`)}>{t(labels.mcq)}</a>
    <a href={hrefFor(`/flashcards/${section.curriculumId}?from=${encodeURIComponent(hrefFor(route))}`)}>{t(labels.flashcards)}</a>
  </nav>
}

export default function CTBasicsPage() {
  const {lang} = useLanguage()
  const t=value=>pick(value,lang)
  const pageLabels=Object.fromEntries(Object.entries(labels).map(([key,value])=>[key,t(value)]))
  const route='/technik/ct-grundlagen'
  const langHref=path=>withLang(path,lang)
  const quizHref=langHref(`/ueben/quiz?fach=technik&n=2&themen=${CT_BASICS_SECTIONS.map(section=>section.curriculumId).join(',')}&from=${encodeURIComponent(langHref(route))}`)
  const flashcardHref=langHref(`/flashcards/${CT_BASICS_SECTIONS[0].curriculumId}?from=${encodeURIComponent(langHref(route))}`)
  const shellSections=[...CT_BASICS_SECTIONS.map(section=>({id:section.id,label:t(section.title),icon:section.id==='ct-grundprinzip-aufbau'?'ct':'spiral'})),{id:'take-home',label:pageLabels.takeHome,icon:'summary',emphasis:true}]
  const sources=references.map(source=>({tag:t(L('Fachquelle','Technical source','منبع تخصصی')),title:t(source.label),href:source.href,citation:t(source.citation),scope:t(source.scope)}))
  sources.unshift({tag:'PDF',title:'Technik.pdf · PDF pp. 44–48 / printed pp. 43–47',citation:t(L('Vom Nutzer bereitgestelltes PDF; alle fünf Seiten visuell geprüft.','User-provided PDF; all five pages visually inspected.','PDF ارائه‌شده توسط کاربر؛ هر پنج صفحه به‌صورت بصری بررسی شدند.')),scope:t(L('Primäre Grundlage der Themenabdeckung. Gerätespezifische Angaben werden nicht als allgemeine Standards gelehrt.','Primary source for topic coverage. Scanner-specific figures are not taught as general standards.','منبع اصلی پوشش موضوع؛ اعداد وابسته به دستگاه به‌عنوان استاندارد همگانی آموزش داده نمی‌شوند.'))})
  return <><StandardLessonShell lessonId="ct-grundprinzip-aufbau" lang={lang} title={t(L('CT-Grundprinzip und Aufnahmetechniken','CT fundamentals and acquisition techniques','مبانی و روش‌های تصویربرداری CT'))} author="Dr. Zia" sections={shellSections} labels={pageLabels} renderIcon={icon=> <span aria-hidden="true">{icon==='spiral'?'⟳':icon==='summary'?'✓':'◉'}</span>} actions={{mcq:{label:pageLabels.mcq,href:quizHref},flashcards:{label:pageLabels.flashcards,href:flashcardHref}}} syncHashNavigation breadcrumbs={[{label:'RadYar',href:langHref('/')},{label:t(L('Technik & Physik','Technique & Physics','تکنیک و فیزیک')),href:langHref('/lernen/technik')},{label:t(L('CT','CT','CT'))}]}
    heroImageAlt={t(L('Lehrschema des CT-Scanners: rotierende Röntgenröhre und Detektorarray erfassen Projektionen um den Patienten; daraus wird ein Schnittbild rekonstruiert.','CT scanner teaching schematic: a rotating X-ray tube and detector array collect projections around the patient, which are reconstructed into a cross-section.','شماتیک آموزشی CT: تیوب پرتو ایکس و آرایهٔ آشکارساز پیرامون بیمار پروجکشن ثبت می‌کنند و از آن برش بازسازی می‌شود.'))}
    theme={{backgroundImage:'/andarun-galaxy-v3.png',heroImage:'/technik/ct-grundlagen/hero.svg',heroImageOpacity:.94,accent:'#60b6c5',accentStrong:'#245d68',accentSoft:'#e8f5f7',secondary:'#c69a54',secondaryStrong:'#75531f',heroBase:'#132b35'}} className={styles.page}
    sources={<LessonSources title={t(labels.sources)} items={sources}/>}
  >
    {CT_BASICS_SECTIONS.map(section=><LessonSection key={section.id} id={section.id} icon={section.id==='ct-grundprinzip-aufbau'?'ct':'spiral'} title={t(section.title)} bodyClassName={styles.body}>
      <p className={styles.lead}>{t(section.lead)}</p><p className={styles.pageRef}>{lang==='fa'?`صفحه‌های PDF: ${section.pages.replace('44','۴۴').replace('45','۴۵').replace('46','۴۶').replace('47','۴۷').replace('48','۴۸')}`:lang==='en'?`PDF pages: ${section.pages}`:`PDF-Seiten: ${section.pages}`}</p>
      <div className={styles.tableWrap}><table className={styles.table}><thead><tr><th>{t(L('Baustein','Component','بخش'))}</th><th>{t(L('Funktion / Bedeutung','Function / meaning','کارکرد / معنا'))}</th></tr></thead><tbody>{section.rows.map(([term,detail],index)=><tr key={index}><th scope="row">{t(term)}</th><td>{t(detail)}</td></tr>)}</tbody></table></div>
      <figure className={styles.figure}><img src={section.visual.src} alt={t(section.visual.alt)} loading="lazy"/><figcaption>{t(section.visual.caption)}</figcaption><p>{t(section.visual.legend)}</p></figure>
      <aside className={styles.note}><strong>{t(L('Einordnung','Interpretation','توضیح'))}</strong><p>{t(section.note)}</p></aside>
      <Check section={section} lang={lang}/><TopicLinks section={section} lang={lang}/>
    </LessonSection>)}
    <LessonSection id="take-home" icon="summary" title={pageLabels.takeHome}>
      <ol className={styles.rules}>
        <li>{t(L('Das Schnittbild entsteht aus Messungen der abgeschwächten Röntgenstrahlung aus vielen Winkeln und anschließender Rekonstruktion.','A cross-sectional image is reconstructed from attenuated X-ray measurements acquired at many angles.','برش از اندازه‌گیری تضعیف پرتو ایکس در زاویه‌های متعدد و بازسازی آن‌ها حاصل می‌شود.'))}</li>
        <li>{t(L('Indirekte Detektion wandelt Röntgen in Licht und dann Ladung; Photonenzählung erfasst direkte elektrische Impulse in Energieklassen.','Indirect detection converts X-rays to light and then charge; photon counting records direct electrical pulses in energy bins.','در آشکارسازی غیرمستقیم، پرتو ایکس به نور و سپس بار تبدیل می‌شود؛ شمارش فوتون پالس‌های مستقیم را در بازه‌های انرژی ثبت می‌کند.'))}</li>
        <li>{t(L('Sequenziell heißt Tischstopp zwischen Aufnahmen; spiral/helical heißt kontinuierlicher Tischvorschub. Mehrzeiligkeit bezeichnet die Detektorgeometrie.','Sequential means table stops between acquisitions; helical means continuous table feed. Multidetector-row describes detector geometry.','توالی‌ای یعنی توقف تخت بین برداشت‌ها؛ مارپیچی یعنی حرکت پیوستهٔ تخت. چندردیفه‌بودن هندسهٔ آشکارساز را توصیف می‌کند.'))}</li>
      </ol>
    </LessonSection>
  </StandardLessonShell><Footer/></>
}
