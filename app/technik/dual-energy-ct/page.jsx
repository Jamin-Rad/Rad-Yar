'use client'

import { useState } from 'react'
import Footer from '@/components/Footer'
import StandardLessonShell, { LessonSection, LessonSources } from '@/components/lesson-template/StandardLessonShell'
import { useLanguage } from '@/providers/LanguageProvider'
import { DUAL_ENERGY_CT_QUESTIONS, DUAL_ENERGY_CT_SECTION as lesson } from '@/data/technikDualEnergyLesson'
import styles from './page.module.css'

const L = (de, en, fa) => ({ de, en, fa })
const pick = (value, lang) => value?.[lang] || value?.de || ''
const labels = {
  path: L('Lernpfad','Learning path','مسیر یادگیری'), progress: L('gelesen','read','خوانده‌شده'),
  continue: L('Lektion fortsetzen','Continue lesson','ادامهٔ درس'),
  completeLesson: L('Ganze Lektion als gelesen markieren','Mark full lesson as read','علامت‌گذاری کل درس به‌عنوان خوانده‌شده'),
  lessonCompleted: L('Ganze Lektion gelesen','Full lesson marked as read','کل درس خوانده شد'),
  complete: L('Abschnitt als gelesen markieren','Mark section as read','علامت‌گذاری این بخش به‌عنوان خوانده‌شده'),
  completed: L('Als gelesen markiert','Marked as read','خوانده‌شده'), open: L('Abschnitt öffnen','Open section','بازکردن بخش'),
  close: L('Schließen','Close','بستن'), takeHome: L('Drei Regeln mitnehmen','Three rules to remember','سه قاعده برای یادآوری'),
}

function Check({ lang }) {
  const [selected, setSelected] = useState(null)
  const question = DUAL_ENERGY_CT_QUESTIONS.find(item => item.id === `dual-energy-ct-${lang}-low-kev`) || DUAL_ENERGY_CT_QUESTIONS[0]
  const feedback = selected === null ? '' : selected === question.correct ? question.explanation : question.wrongExplanations[selected]
  return <div className={styles.check}>
    <h3>{pick(L('Selbstcheck: Niedrige oder hohe keV?','Self-check: low or high keV?','خودآزمایی: keV پایین یا بالا؟'),lang)}</h3>
    <p>{question.question}</p>
    <fieldset>
      <legend>{pick(L('Eine Antwort auswählen','Choose one answer','یک پاسخ انتخاب کنید'),lang)}</legend>
      {question.options.map(option => <label key={option.id} className={styles.option}>
        <input type="radio" name="dect-question" checked={selected === option.id} onChange={() => setSelected(option.id)} />
        <span>{option.text}</span>
      </label>)}
    </fieldset>
    {feedback ? <p role="status" className={styles.feedback}>{feedback}</p> : null}
  </div>
}

export default function DualEnergyCTPage() {
  const { lang } = useLanguage()
  const t = value => pick(value, lang)
  const pageLabels = Object.fromEntries(Object.entries(labels).map(([key,value]) => [key,t(value)]))
  const langHref = path => lang === 'de' ? path : `${path}${path.includes('?') ? '&' : '?'}lang=${lang}`
  const sources = lesson.references.map(source => ({ tag: t(L('Fachquelle','Technical source','منبع تخصصی')), title: t(source.label), href: source.href, citation: t(source.citation), scope: t(source.scope) }))
  sources.unshift({ tag: 'PDF', title: 'Technik.pdf · PDF pp. 49–50 / printed pp. 48–49', citation: 'User-provided summary; both pages were visually inspected.', scope: t(lesson.note) })
  const sections = [{ id: lesson.id, label: t(lesson.title), icon: 'spectrum' }, { id:'take-home', label:pageLabels.takeHome, icon:'summary', emphasis:true }]

  return <>
    <StandardLessonShell lessonId="dual-energy-ct" lang={lang} title={t(lesson.title)} author="Dr. Zia" sections={sections} labels={pageLabels} renderIcon={() => <span aria-hidden="true">◈</span>} actions={{}} syncHashNavigation
      breadcrumbs={[{label:'RadYar',href:langHref('/')},{label:t(L('Technik & Physik','Technique & Physics','تکنیک و فیزیک')),href:langHref('/lernen/technik')},{label:t(lesson.title)}]}
      heroImageAlt={t(L('Schema des Dual-Energy-CT: zwei Röntgenspektren werden aufgenommen und in Materialinformation überführt; kein Patientenscan.','Dual-energy CT schematic: two X-ray spectra are acquired and converted into material information; not a patient scan.','طرح‌وارهٔ CT دو‌انرژی: دو طیف پرتو ایکس ثبت و به اطلاعات ماده تبدیل می‌شوند؛ تصویر بیمار نیست.'))}
      theme={{backgroundImage:'/andarun-galaxy-v3.png',heroImage:'/technik/dual-energy-ct/hero.svg',heroImageOpacity:.94,accent:'#60b6c5',accentStrong:'#245d68',accentSoft:'#e8f5f7',secondary:'#c69a54',secondaryStrong:'#75531f',heroBase:'#132b35'}} className={styles.page}
      sources={<LessonSources title={t(L('Quellen und Aussagebereich','Sources and scope','منابع و محدودهٔ گزاره‌ها'))} items={sources} note={t(lesson.note)}/>}
    >
      <LessonSection id={lesson.id} icon="spectrum" title={t(lesson.title)} bodyClassName={styles.body}>
        <p className={styles.lead}>{t(lesson.lead)}</p>
        <p className={styles.pageRef}>{lang==='fa'?'صفحهٔ PDF: ۴۹–۵۰':lang==='en'?'PDF pages: 49–50':'PDF-Seiten: 49–50'}</p>
        <div className={styles.tableWrap}>
          <table className={styles.table}><thead><tr><th>{t(L('Technik / Anwendung','Technique / application','روش / کاربرد'))}</th><th>{t(L('Was liefert sie – und was begrenzt sie?','What does it add—and what limits it?','چه چیزی می‌افزاید و چه محدودیتی دارد؟'))}</th></tr></thead>
            <tbody>{lesson.rows.map(([term,detail],index)=><tr key={index}><th scope="row">{t(term)}</th><td>{t(detail)}</td></tr>)}</tbody>
          </table>
        </div>
        {lesson.visuals.map(visual=><figure key={visual.src} className={styles.sourceFigure}><img src={visual.src} alt={t(visual.alt)} loading="lazy"/><figcaption>{t(visual.caption)}</figcaption></figure>)}
        <Check lang={lang}/>
        <aside className={styles.limit}><strong>{t(L('Grenze der Methode','Method limitation','محدودیت روش'))}</strong><p>{t(lesson.note)}</p></aside>
      </LessonSection>
      <LessonSection id="take-home" icon="summary" title={pageLabels.takeHome}>
        <ol className={styles.rules}>
          <li>{t(L('Zwei Energiespektren ermöglichen modellbasierte Materialinformation; sie sind keine direkte chemische Analyse.','Two energy spectra enable model-based material information; they are not direct chemical analysis.','دو طیف انرژی اطلاعات ماده را بر پایهٔ مدل فراهم می‌کنند؛ این تحلیل شیمیایی مستقیم نیست.'))}</li>
          <li>{t(L('Niedrige keV können Iodkontrast erhöhen; hohe keV können Metallartefakte mindern. Beide Effekte haben systemabhängige Grenzen.','Low keV can increase iodine contrast; high keV can reduce metal artefacts. Both effects have scanner-dependent limits.','keV پایین می‌تواند کنتراست ید را بیشتر کند؛ keV بالا ممکن است آرتیفکت فلز را کم کند. هر دو اثر محدودیت وابسته به دستگاه دارند.'))}</li>
          <li>{t(L('Materialkarten, VNC und VNCa ergänzen die Bildbeurteilung; rekonstruktionsbedingte Fehler und Mischbefunde mitprüfen.','Material maps, VNC and VNCa add information; check for reconstruction errors and mixed findings.','نقشه‌های ماده، VNC و VNCa اطلاعات تکمیلی‌اند؛ خطاهای بازسازی و یافته‌های مختلط را نیز بررسی کنید.'))}</li>
        </ol>
      </LessonSection>
    </StandardLessonShell>
    <Footer />
  </>
}
