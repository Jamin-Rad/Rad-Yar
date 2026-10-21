'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import InProgressBanner from '@/components/InProgressBanner'
import LessonHero from '@/components/LessonHero'
import LessonTakeHome from '@/components/LessonTakeHome'
import { useLessonSectionScroll } from '@/hooks/useLessonSectionScroll'
import { usePersistedSectionProgress } from '@/hooks/usePersistedSectionProgress'
import { useLanguage } from '@/providers/LanguageProvider'
import { useLessonReadStatus } from '@/hooks/useLessonReadStatus'
import { SVT_LESSON, SVT_SOURCES } from '@/data/sinusvenenthrombose'
import reference from '@/components/LessonTemplate.module.css'
import styles from './page.module.css'

const L = (value, lang) => value?.[lang] || value?.de || value
const UI = {
  de: { zoom: 'Bild vergrößern', close: 'Bildansicht schließen', mark: 'Als gelesen markieren', read: 'Als gelesen markiert', signIn: 'Anmelden', auth: 'Bitte melde dich an, um deinen Lernfortschritt zu speichern.', mcq: 'MCQ', flash: 'Flashcards', imageTitle: 'Stadienabhängiges MRT-Signal' },
  en: { zoom: 'Enlarge image', close: 'Close image preview', mark: 'Mark as read', read: 'Marked as read', signIn: 'Sign in', auth: 'Please sign in to save your learning progress.', mcq: 'MCQ', flash: 'Flashcards', imageTitle: 'Stage-dependent MRI signal' },
  fa: { zoom: 'بزرگ‌نمایی تصویر', close: 'بستن تصویر', mark: 'علامت‌گذاری به‌عنوان خوانده‌شده', read: 'به‌عنوان خوانده‌شده علامت خورد', signIn: 'ورود', auth: 'برای ذخیره پیشرفت لطفاً وارد شوید.', mcq: 'MCQ', flash: 'فلش‌کارت', imageTitle: 'سیگنال MRI وابسته به مرحله' },
}

function Section({ id, title, icon, lead, children, open, onToggle, emphasis = false }) {
  return <section id={id} className={`${reference.section} ${open ? reference.sectionOpen : ''} ${emphasis ? reference.takeHomeSection : ''}`}>
    <h2 className={styles.chapterHeading}><button type="button" className={reference.sectionHeader} aria-expanded={open} aria-controls={`${id}-panel`} onClick={onToggle}>
      <span className={reference.sectionIcon} aria-hidden="true">{icon}</span><span><strong>{title}</strong></span><span className={reference.toggle} aria-hidden="true">{open ? '−' : '+'}</span>
    </button></h2>
    <div id={`${id}-panel`} className={reference.sectionBody} hidden={!open}>{lead && <p className={reference.lead}>{lead}</p>}{children}</div>
  </section>
}
function Table({ headers, rows }) {
  return <div className={reference.teachingTableWrap} tabIndex={0}><table className={reference.teachingTable}><thead><tr>{headers.map((h, i) => <th key={`${h}-${i}`} scope="col">{h}</th>)}</tr></thead><tbody>{rows.map((row, i) => <tr key={i}>{row.map((cell, j) => j === 0 ? <th key={`${i}-${j}`} scope="row">{cell}</th> : <td key={`${i}-${j}`}>{cell}</td>)}</tr>)}</tbody></table></div>
}
function Cards({ items, lang }) {
  return <div className={styles.cardsGrid}>{items.map(item => <article className={styles.infoCard} key={L(item.title, lang)}><span className={styles.cardIcon} aria-hidden="true">{item.icon}</span><h3>{L(item.title, lang)}</h3><p>{L(item.text, lang)}</p></article>)}</div>
}
function Callout({ label, cave = false, children }) {
  return <aside className={cave ? reference.warning : reference.rememberNote}><span className={reference.calloutLabel}>{cave ? '⚠️' : '✦'} {label}</span><div className={reference.calloutBody}><p>{children}</p></div></aside>
}
function QuickCheck({ lang }) {
  const [selected, setSelected] = useState(null)
  const [checked, setChecked] = useState(false)
  const c = values => L(values, lang)
  const options = [
    { text: { de: 'Die Sinusasymmetrie allein beweist eine Thrombose.', en: 'Sinus asymmetry alone proves thrombosis.', fa: 'عدم تقارن سینوس به‌تنهایی ترومبوز را ثابت می‌کند.' }, correct: false },
    { text: { de: 'Quellbilder und Kontrast-CTV oder -MRV zur Abgrenzung heranziehen.', en: 'Review source images and use contrast CTV or MRV for clarification.', fa: 'تصاویر منبع را بررسی و برای افتراق از CTV یا MRV کنتراست‌دار استفاده کنید.' }, correct: true },
    { text: { de: 'Bei fehlendem Flusssignal die Variantenprüfung auslassen.', en: 'If flow signal is absent, skip the variant check.', fa: 'در صورت نبود سیگنال جریان، بررسی واریانت را کنار بگذارید.' }, correct: false },
  ]
  const labels = {
    de: { title: 'Selbstcheck: Sinusvariante oder Thrombose?', prompt: 'Eine TOF-MRV zeigt links kaum Signal im Sinus transversus. Was ist der nächste radiologische Schritt?', check: 'Antwort prüfen', right: 'Richtig: TOF kann durch langsamen oder ungünstig gerichteten Fluss Signal verlieren. Quellbilder, Anatomie und eine geeignete kontrastgestützte Venografie helfen bei der Einordnung.', wrong: 'Noch nicht: fehlendes TOF-Signal allein beweist keine Thrombose. Prüfe Quellbilder und venöse Anatomie und bestätige den Befund mit geeigneter Venografie.' },
    en: { title: 'Self-check: sinus variant or thrombosis?', prompt: 'TOF-MRV shows little signal in the left transverse sinus. What is the next imaging step?', check: 'Check answer', right: 'Correct: TOF may lose signal because of slow or unfavourably directed flow. Source images, anatomy and suitable contrast venography help resolve the finding.', wrong: 'Not yet: absent TOF signal alone does not prove thrombosis. Review source images and venous anatomy, then confirm with suitable venography.' },
    fa: { title: 'خودآزمایی: واریانت سینوس یا ترومبوز؟', prompt: 'در TOF-MRV سیگنال سینوس عرضی چپ بسیار کم است. گام بعدی تصویربرداری چیست؟', check: 'بررسی پاسخ', right: 'درست است: TOF ممکن است به‌علت جریان آهسته یا جهت نامناسب جریان، افت سیگنال نشان دهد. تصاویر منبع، آناتومی و ونوگرافی کنتراست‌دار مناسب به تفسیر کمک می‌کنند.', wrong: 'هنوز نه: نبود سیگنال در TOF به‌تنهایی ترومبوز را ثابت نمی‌کند. تصاویر منبع و آناتومی وریدی را بررسی و با ونوگرافی مناسب تأیید کنید.' },
  }[lang] || { title: '', prompt: '', check: '', right: '', wrong: '' }
  return <section className={styles.selfCheck} aria-labelledby="svt-self-check-title"><span>{c({ de: 'Selbstcheck', en: 'Self-check', fa: 'خودآزمایی' })}</span><h3 id="svt-self-check-title">{labels.title}</h3><p>{labels.prompt}</p><div role="group" aria-label={labels.prompt} className={styles.selfCheckOptions}>{options.map((option, index) => <button type="button" key={index} className={selected === index ? styles.selectedOption : ''} aria-pressed={selected === index} onClick={() => { setSelected(index); setChecked(false) }}>{c(option.text)}</button>)}</div><button type="button" className={styles.checkButton} disabled={selected === null} onClick={() => setChecked(true)}>{labels.check}</button>{checked && selected !== null && <p className={options[selected].correct ? styles.feedbackCorrect : styles.feedbackWrong} role="status">{options[selected].correct ? labels.right : labels.wrong}</p>}</section>
}

function Sources({ sources, lang }) {
  return <details className={styles.sources}><summary>{L({de:'Quellen & Einordnung',en:'Sources & context',fa:'منابع و محدوده درس'}, lang)}</summary><ul>{sources.map(source => <li key={source.href}><a href={source.href} target="_blank" rel="noopener noreferrer">{L(source.label, lang)}</a><p>{L(source.note, lang)}</p></li>)}</ul></details>
}

export default function SinusvenenthrombosePage() {
  const { lang } = useLanguage()
  const copy = UI[lang] || UI.de
  const c = value => L(value, lang)
  const rtl = lang === 'fa'
  const { isRead, toggleRead, authError } = useLessonReadStatus('sinusvenenthrombose')
  const trackedIds = SVT_LESSON.sections.filter(section => !section.emphasis).map(section => section.id)
  const [readSections, setReadSections] = usePersistedSectionProgress('sinusvenenthrombose', trackedIds, isRead)
  const [openSection, setOpenSection] = useState('grundlagen')
  const [active, setActive] = useState('grundlagen')
  const [mobileOpen, setMobileOpen] = useState(false)
  const scrollToSection = useLessonSectionScroll()
  const route = '/gehirn/vaskulaer/sinusvenenthrombose'
  const withLang = href => lang === 'de' ? href : (href.includes('?') ? `${href}&lang=${lang}` : `${href}?lang=${lang}`)
  const rows = value => value.map(row => row.map(c))
  const replaceHash = id => {
    const url = new URL(window.location.href)
    url.hash = id || ''
    window.history.replaceState(null, '', url)
  }
  const selectSection = id => {
    setOpenSection(id)
    setActive(id)
    setMobileOpen(false)
    replaceHash(id)
    scrollToSection(id)
  }
  const toggleSection = id => {
    const next = openSection === id ? '' : id
    setOpenSection(next)
    setActive(id)
    replaceHash(next)
  }
  const toggleSectionRead = id => {
    if (isRead) toggleRead()
    setReadSections(previous => {
      const next = new Set(previous)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }
  const toggleLessonRead = () => {
    const nextRead = !isRead
    toggleRead()
    setReadSections(nextRead ? new Set(trackedIds) : new Set())
  }

  useEffect(() => {
    const syncHash = () => {
      const requested = window.location.hash.slice(1)
      const id = SVT_LESSON.sections.some(section => section.id === requested) ? requested : 'grundlagen'
      setOpenSection(id)
      setActive(id)
      if (requested) scrollToSection(id)
    }
    syncHash()
    window.addEventListener('hashchange', syncHash)
    window.addEventListener('popstate', syncHash)
    return () => {
      window.removeEventListener('hashchange', syncHash)
      window.removeEventListener('popstate', syncHash)
    }
  }, [scrollToSection])

  useEffect(() => {
    const observers = SVT_LESSON.sections.map(section => {
      const element = document.getElementById(section.id)
      if (!element) return null
      const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          setActive(section.id)
          if (openSection && section.id !== openSection) {
            setOpenSection(section.id)
            replaceHash(section.id)
          }
        }
      }, { rootMargin: '-30% 0px -60% 0px' })
      observer.observe(element)
      return observer
    })
    return () => observers.forEach(observer => observer?.disconnect())
  }, [openSection])

  const markButton = (id = null) => <button type="button" className={`${reference.readButton} ${id ? (readSections.has(id) ? reference.readButtonDone : '') : (isRead ? reference.readButtonDone : '')}`} aria-pressed={id ? readSections.has(id) : isRead} onClick={id ? () => toggleSectionRead(id) : toggleLessonRead}><span aria-hidden="true">✓</span>{id ? c(readSections.has(id) ? UI[lang].read : UI[lang].mark) : c(isRead ? UI[lang].read : UI[lang].mark)}</button>
  const navItems = () => SVT_LESSON.sections.filter(section => !section.emphasis).map(section => <button type="button" key={section.id} className={openSection === section.id ? reference.activeSideItem : ''} aria-current={openSection === section.id ? 'location' : undefined} onClick={() => selectSection(section.id)}><span className={reference.sideIcon} aria-hidden="true">{section.icon}</span><strong>{c(section.label)}{readSections.has(section.id) ? <span className={reference.readTick} aria-label={c(UI[lang].read)}> ✓</span> : null}</strong></button>)
  const sectionProps = id => ({ open: openSection === id, onToggle: () => toggleSection(id) })

  return <main className={`${reference.page} ${styles.page}`} data-lesson-section-divider="true" data-lesson-progress-managed="true" dir={rtl ? 'rtl' : 'ltr'} lang={lang}>
    <InProgressBanner lang={lang} />
    <header className={reference.header}>
      <div className={reference.topline}><nav className={reference.breadcrumb} aria-label={c(L({de:'Seitennavigation',en:'Breadcrumb',fa:'مسیر صفحه'}, lang))}><Link href={withLang('/')}>RadYar</Link><span>/</span><Link href={withLang('/lernen/gehirn')}>{c({de:'Kopf',en:'Head',fa:'سر'})}</Link><span>/</span><strong>{c(SVT_LESSON.breadcrumb)}</strong></nav><span className={reference.author}>{c(L({de:'Dr. Zia',en:'Dr. Zia',fa:'دکتر ضیا'}, lang))}</span></div>
      <LessonHero title={c(SVT_LESSON.title)} imageSrc="/sinusvenenthrombose/hero-generated-v2.webp" imageAlt={c(L({de:'Nichtdiagnostische schematische Darstellung der zerebralen Venensinus und des venösen Abflusses',en:'Non-diagnostic schematic of cerebral venous sinuses and venous drainage',fa:'نمای شماتیک غیرتشخیصی از سینوس‌های وریدی مغز و مسیر تخلیه وریدی'}, lang))} lang={lang} />
      <div className={reference.actions}><Link className={reference.primaryAction} href={withLang(`/ueben/quiz?fach=gehirn&n=12&themen=sinusvenenthrombose&from=${encodeURIComponent(withLang(route))}`)}>🎯 {copy.mcq}</Link><Link className={reference.secondaryAction} href={withLang(`/flashcards/sinusvenenthrombose?from=${encodeURIComponent(withLang(route))}`)}>🧠 {copy.flash}</Link><button className={reference.takeHomeJump} type="button" onClick={() => selectSection('takehome')}>↓ {c(SVT_LESSON.takehome.title)}</button></div>
      <div className={reference.progressBar}><div className={reference.progressTrack} role="progressbar" aria-label={c(SVT_LESSON.toc)} aria-valuemin={0} aria-valuemax={trackedIds.length} aria-valuenow={readSections.size}><i style={{width:`${readSections.size / trackedIds.length * 100}%`}} /></div><span>{readSections.size} / {trackedIds.length}</span><div className={reference.progressActions}><button className={`${reference.lessonCompleteButton} ${isRead ? reference.lessonCompleteButtonDone : ''}`} type="button" onClick={toggleLessonRead} aria-pressed={isRead}>✓ {c(isRead ? UI[lang].read : UI[lang].mark)}</button><button className={reference.continueButton} type="button" disabled={active === trackedIds[trackedIds.length - 1] || active === 'takehome'} onClick={() => selectSection(trackedIds[Math.min(Math.max(trackedIds.indexOf(active), 0) + 1, trackedIds.length - 1)])}>{c(L({de:'Weiter',en:'Continue',fa:'ادامه'}, lang))} →</button></div></div>
    </header>
    <div className={reference.layout}><aside className={reference.sidebar}><h2 className={reference.learningPathHeading}>{c(SVT_LESSON.toc)}</h2><nav aria-label={c(SVT_LESSON.toc)}>{navItems()}<button type="button" onClick={() => selectSection('takehome')} className={openSection === 'takehome' ? reference.activeSideItem : ''}><span className={reference.sideIcon}>🏁</span><strong>{c(SVT_LESSON.takehome.title)}</strong></button></nav></aside>
      <article className={reference.lesson}>
        <Section id="grundlagen" icon={SVT_LESSON.sections[0].icon} title={c(SVT_LESSON.grundlagen.title)} lead={c(SVT_LESSON.grundlagen.lead)} {...sectionProps('grundlagen')}><Table headers={SVT_LESSON.grundlagen.headers.map(c)} rows={rows(SVT_LESSON.grundlagen.rows)} /><figure className={styles.drainageFigure}><Image src="/sinusvenenthrombose/venous-drainage.svg" alt={c(L({de:'Vereinfachte Orientierung: oberflächliche Sinus, tiefe venöse Drainage und Abfluss in die Transversus-/Sigmoideus-Sinus',en:'Simplified orientation: superficial sinuses, deep venous drainage and outflow into the transverse/sigmoid sinuses',fa:'نمای ساده‌شده: سینوس‌های سطحی، تخلیه وریدی عمقی و خروج به سینوس‌های عرضی و سیگموئید'}, lang))} width={720} height={380} /><figcaption>{c(L({de:'Mittellinie: Sinus sagittalis superior; kurze zentrale Paare: tiefe Venen; seitliche Abgänge: Sinus transversi; nach unten gekrümmte Enden: Abfluss über die Sinus sigmoidei. Orientierungsschema, keine patientenbezogene Gefäßdarstellung.',en:'Midline: superior sagittal sinus; short central paired branches: deep veins; lateral branches: transverse sinuses; downward-curving ends: sigmoid outflow. Orientation schematic, not patient-specific vascular imaging.',fa:'خط میانی: سینوس ساژیتال فوقانی؛ شاخه‌های کوتاه مرکزی: وریدهای عمقی؛ شاخه‌های طرفی: سینوس‌های عرضی؛ انتهای خمیده رو به پایین: خروج از سینوس‌های سیگموئید. شماتیک جهت‌یابی است، نه تصویربرداری عروقی بیمار.'}, lang))}</figcaption></figure><Callout label={c(SVT_LESSON.keyLabel)}>{c(SVT_LESSON.grundlagen.key)}</Callout>{markButton('grundlagen')}</Section>
        <Section id="risiko" icon={SVT_LESSON.sections[1].icon} title={c(SVT_LESSON.risiko.title)} lead={c(SVT_LESSON.risiko.lead)} {...sectionProps('risiko')}><Cards items={SVT_LESSON.risiko.items} lang={lang} /><Callout label={c(SVT_LESSON.caveLabel)} cave>{c(SVT_LESSON.risiko.cave)}</Callout>{markButton('risiko')}</Section>
        <Section id="klinik" icon={SVT_LESSON.sections[2].icon} title={c(SVT_LESSON.klinik.title)} lead={c(SVT_LESSON.klinik.lead)} {...sectionProps('klinik')}><Cards items={SVT_LESSON.klinik.items} lang={lang} /><Callout label={c(SVT_LESSON.keyLabel)}>{c(SVT_LESSON.klinik.key)}</Callout>{markButton('klinik')}</Section>
        <Section id="pathophysiologie" icon={SVT_LESSON.sections[3].icon} title={c(SVT_LESSON.pathophysiologie.title)} lead={c(SVT_LESSON.pathophysiologie.lead)} {...sectionProps('pathophysiologie')}><Cards items={SVT_LESSON.pathophysiologie.items} lang={lang} />{markButton('pathophysiologie')}</Section>
        <Section id="ct" icon={SVT_LESSON.sections[4].icon} title={c(SVT_LESSON.ct.title)} lead={c(SVT_LESSON.ct.lead)} {...sectionProps('ct')}><Table headers={SVT_LESSON.ct.headers.map(c)} rows={rows(SVT_LESSON.ct.rows)} /><Callout label={c(SVT_LESSON.caveLabel)} cave>{c(SVT_LESSON.ct.cave)}</Callout>{markButton('ct')}</Section>
        <Section id="mrt" icon={SVT_LESSON.sections[5].icon} title={c(SVT_LESSON.mrt.title)} lead={c(SVT_LESSON.mrt.lead)} {...sectionProps('mrt')}><h3 className={styles.tableHeading}>{c(SVT_LESSON.mrt.stageTitle)}</h3><Table headers={SVT_LESSON.mrt.headers.map(c)} rows={rows(SVT_LESSON.mrt.rows)} /><h3 className={styles.tableHeading}>{c(SVT_LESSON.mrt.sequenceTitle)}</h3><Table headers={SVT_LESSON.mrt.sequenceHeaders.map(c)} rows={rows(SVT_LESSON.mrt.sequenceRows)} /><Callout label={c(SVT_LESSON.caveLabel)} cave>{c(SVT_LESSON.mrt.signalCave)}</Callout><Callout label={c(SVT_LESSON.keyLabel)}>{c(SVT_LESSON.mrt.key)}</Callout>{markButton('mrt')}</Section>
        <Section id="fallstricke" icon={SVT_LESSON.sections[6].icon} title={c(SVT_LESSON.fallstricke.title)} lead={c(SVT_LESSON.fallstricke.lead)} {...sectionProps('fallstricke')}><Table headers={SVT_LESSON.fallstricke.headers.map(c)} rows={rows(SVT_LESSON.fallstricke.rows)} /><Callout label={c(SVT_LESSON.caveLabel)} cave>{c(SVT_LESSON.fallstricke.cave)}</Callout><QuickCheck lang={lang} /><Sources sources={SVT_SOURCES} lang={lang} />{markButton('fallstricke')}</Section>
        <Section id="therapie" icon={SVT_LESSON.sections[7].icon} title={c(SVT_LESSON.therapie.title)} lead={c(SVT_LESSON.therapie.lead)} {...sectionProps('therapie')}><Cards items={SVT_LESSON.therapie.items} lang={lang} /><Callout label={c(SVT_LESSON.caveLabel)} cave>{c(SVT_LESSON.therapie.cave)}</Callout>{markButton('therapie')}</Section>
        <Section id="takehome" icon={SVT_LESSON.sections[8].icon} title={c(SVT_LESSON.takehome.title)} lead={c(SVT_LESSON.takehome.lead)} emphasis {...sectionProps('takehome')}><LessonTakeHome points={SVT_LESSON.takehome.items.map(item => ({title:item.title,detail:item.text}))} lang={lang} idPrefix="svt-take-home" /></Section>
      </article>
    </div>
    <div className={reference.mobileLearningPath}><button type="button" className={reference.mobilePathButton} aria-expanded={mobileOpen} aria-controls="svt-mobile-path" onClick={() => setMobileOpen(value => !value)}><span className={reference.mobileCurrentIcon}>{SVT_LESSON.sections.find(section => section.id === active)?.icon || '🩸'}</span><span className={reference.mobilePathLabel}><strong>{c(SVT_LESSON.sections.find(section => section.id === active)?.label || SVT_LESSON.toc)}</strong><small>{readSections.size} / {trackedIds.length}</small></span></button><div id="svt-mobile-path" className={reference.mobilePathPanel} hidden={!mobileOpen}><header className={reference.learningPathHeading}><strong>{c(SVT_LESSON.toc)}</strong></header><nav>{navItems()}<button type="button" onClick={() => selectSection('takehome')}><span className={reference.mobilePathItemIcon}>🏁</span><strong>{c(SVT_LESSON.takehome.title)}</strong></button></nav></div></div>
    {authError && <p className={styles.authError}>{UI[lang].auth} <Link href="/sign-in">{UI[lang].signIn}</Link></p>}
  </main>
}
