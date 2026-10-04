'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import { usePersistedSectionProgress } from '@/hooks/usePersistedSectionProgress'
import CaseViewer from './CaseViewer'
import ImageLesson from './ImageLesson'
import LessonIcon from './LessonIcon'
import { allIds, findings, L, pick, quizUrl, sections, sources, stages, takeaways, trackedIds } from './lessonContent'
import s from './page.module.css'

function SectionHeading({ index, lang, lead }) {
  const section = sections[index]
  return <header className={s.sectionHeading}><span className={s.sectionNumber} aria-hidden="true">0{index + 1}</span><div><h2>{pick(section.title, lang)}</h2><p>{pick(lead, lang)}</p></div></header>
}

function ReadControl({ lang, read, onClick }) {
  return <div className={s.readRow}><button type="button" className={`${s.readButton} ${read ? s.isRead : ''}`} aria-pressed={read} onClick={onClick}><LessonIcon name="check" />{pick(read ? L('Als gelesen markiert', 'Marked as read', 'خوانده‌شده') : L('Als gelesen markieren', 'Mark as read', 'علامت‌گذاری به‌عنوان خوانده‌شده'), lang)}</button></div>
}

export default function TestTwoLesson() {
  const { lang } = useLanguage()
  const t = value => pick(value, lang)
  const [active, setActive] = useState(sections[0].id)
  const [read, setRead] = usePersistedSectionProgress('andarun-test-2-v1', trackedIds)

  useEffect(() => {
    const nodes = allIds.map(id => document.getElementById(id)).filter(Boolean)
    let animationFrame = null
    const updateActive = () => {
      animationFrame = null
      const threshold = Math.max(180, window.innerHeight * .33)
      let current = nodes[0]?.id
      for (const node of nodes) {
        if (node.getBoundingClientRect().top <= threshold) current = node.id
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 16) current = 'take-home'
      if (current) setActive(current)
    }
    const onScroll = () => { if (animationFrame === null) animationFrame = requestAnimationFrame(updateActive) }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    const hash = window.location.hash.slice(1)
    if (allIds.includes(hash)) setActive(hash)
    else updateActive()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (animationFrame !== null) cancelAnimationFrame(animationFrame)
    }
  }, [])

  const markRead = id => setRead(previous => {
    const next = new Set(previous)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    return next
  })
  const jump = id => {
    setActive(id)
    document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' })
    window.history.replaceState(null, '', `#${id}`)
  }

  return <main className={s.page} dir={lang === 'fa' ? 'rtl' : 'ltr'} lang={lang}>
    <div className={s.sheet}>
      <header className={s.heroHeader}>
        <div className={s.breadcrumbRow}><nav aria-label={t(L('Seitennavigation', 'Breadcrumb', 'مسیر صفحه'))}><Link href="/andarun">Andarun</Link><span>/</span><span>Test 2</span></nav><Link href="/andarun/test" className={s.compareLink}><LessonIcon name="back" />{t(L('Test 1 ansehen', 'View Test 1', 'دیدن تست ۱'))}</Link></div>
        <div className={s.hero}>
          <div className={s.heroCopy}><h1>{t(L('Ischämischer Schlaganfall', 'Ischaemic stroke', 'سکته ایسکمیک'))}</h1><p>{t(L('Vom ersten Bild zur klaren Entscheidung.', 'From the first image to a clear decision.', 'از اولین تصویر تا یک تصمیم روشن.'))}</p>
            <div className={s.heroActions}><button type="button" className={s.summaryLink} onClick={() => jump('take-home')}><LessonIcon name="bookmark" />Take Home Message</button><Link className={s.primaryButton} href={quizUrl}><LessonIcon name="play" />{t(L('MCQ starten', 'Start MCQs', 'شروع MCQ'))}</Link></div>
          </div>
          <div className={s.heroArt} aria-hidden="true"><Image src="/educational/stroke-hero-cutout-v2.png" alt="" width={1223} height={1286} sizes="(max-width: 760px) 70vw, 480px" priority /></div>
        </div>
      </header>

      <div className={s.mobilePath}><label htmlFor="test2-section-select">{t(L('Lernpfad', 'Learning path', 'مسیر یادگیری'))}<span dir="ltr">{read.size} / 3</span></label><div><select id="test2-section-select" value={active} onChange={event => jump(event.target.value)}>{sections.map((section, index) => <option key={section.id} value={section.id}>0{index + 1} · {t(section.title)}</option>)}<option value="take-home">Take Home Message</option></select><LessonIcon name="chevron" /></div></div>

      <div className={s.lessonLayout}>
        <aside className={s.path}>
          <h2>{t(L('Lernpfad', 'Learning path', 'مسیر یادگیری'))}</h2>
          <progress max="3" value={read.size} aria-label={t(L('Lesefortschritt', 'Reading progress', 'پیشرفت مطالعه'))} />
          <p aria-live="polite">{t(L(`${read.size} von 3 gelesen`, `${read.size} of 3 read`, `${read.size} از ۳ بخش خوانده‌شده`))}</p>
          <nav aria-label={t(L('Lektionsabschnitte', 'Lesson sections', 'بخش‌های درس'))}>
            {sections.map((section, index) => <a key={section.id} href={`#${section.id}`} onClick={event => { event.preventDefault(); jump(section.id) }} aria-current={active === section.id ? 'location' : undefined}><span className={s.pathNumber}>{read.has(section.id) ? <LessonIcon name="check" /> : `0${index + 1}`}</span><span>{t(section.title)}</span></a>)}
            <a className={s.pathSummary} href="#take-home" onClick={event => { event.preventDefault(); jump('take-home') }} aria-current={active === 'take-home' ? 'location' : undefined}><LessonIcon name="bookmark" /><span>Take Home Message</span></a>
          </nav>
        </aside>

        <article className={s.lesson}>
          <section id="akutdiagnostik" className={s.section}>
            <SectionHeading index={0} lang={lang} lead={L('Die Bildgebung beantwortet drei zentrale Fragen, die das weitere Vorgehen bestimmen.', 'Imaging answers three key questions that determine the next steps.', 'تصویربرداری به سه پرسش اصلی پاسخ می‌دهد که مسیر بعدی را مشخص می‌کنند.')} />
            <ol className={s.stages}>{stages.map(stage => <li key={stage.icon}><LessonIcon name={stage.icon} /><h3>{t(stage.title)}</h3><p>{t(stage.text)}</p></li>)}</ol>
            <CaseViewer lang={lang} />
            <ReadControl lang={lang} read={read.has('akutdiagnostik')} onClick={() => markRead('akutdiagnostik')} />
          </section>

          <section id="fruehzeichen" className={s.section}>
            <SectionHeading index={1} lang={lang} lead={L('Drei Blickpunkte. Ein systematischer Seitenvergleich.', 'Three areas of focus. One systematic comparison.', 'سه نقطه توجه؛ یک مقایسه منظم دوطرفه.')} />
            <ImageLesson lang={lang} />
            <ReadControl lang={lang} read={read.has('fruehzeichen')} onClick={() => markRead('fruehzeichen')} />
          </section>

          <section id="befund" className={s.section}>
            <SectionHeading index={2} lang={lang} lead={L('Ein guter Befund macht die nächste Entscheidung leichter.', 'A good report makes the next decision easier.', 'یک گزارش خوب، تصمیم بعدی را آسان‌تر می‌کند.')} />
            <p className={s.tableLead}>{t(L('Gehe zeilenweise vor: Fokus wählen, Prüfort aufsuchen und die Bedeutung im klinischen Kontext einordnen.', 'Work row by row: choose the focus, inspect the location and interpret the finding in its clinical context.', 'ردیف‌به‌ردیف پیش بروید: محور را انتخاب کنید، محل را بررسی و یافته را در زمینه بالینی تفسیر کنید.'))}</p>
            <div className={s.tableScroll} role="region" tabIndex={0} aria-label={t(L('Vergleich früher NCCT-Zeichen, horizontal scrollbar', 'Comparison of early NCCT signs, scroll horizontally', 'مقایسه علائم اولیه NCCT، با اسکرول افقی'))}>
              <table className={s.table}><caption>{t(L('Frühe NCCT-Zeichen im Vergleich', 'Early NCCT signs compared', 'مقایسه علائم اولیه NCCT'))}</caption><thead><tr>{[L('Priorität', 'Priority', 'اولویت'), L('Fokus', 'Focus', 'محور'), L('Prüfort', 'Where to look', 'محل بررسی'), L('Bedeutung', 'Meaning', 'معنی')].map(label => <th key={label.de} scope="col">{t(label)}</th>)}</tr></thead><tbody>{findings.map((item, index) => <tr key={item.id}><td className={s.tableNumber}>0{index + 1}</td><th scope="row">{t(item.label)}</th><td>{t(item.location)}</td><td>{t(item.meaning)}</td></tr>)}</tbody></table>
            </div>
            <aside className={s.merke}><LessonIcon name="bookmark" /><div><strong>{t(L('Merke', 'Remember', 'به‌خاطر بسپار'))}</strong><p>{t(L('Blutung, Frühischämie, Verschlusshöhe: die entscheidenden Befunde zuerst. Eine unauffällige NCCT schließt eine frühe Ischämie nicht aus.', 'Haemorrhage, early ischaemia, occlusion level: key findings first. A normal NCCT does not exclude early ischaemia.', 'خونریزی، ایسکمی اولیه، سطح انسداد: یافته‌های تصمیم‌ساز اول می‌آیند. NCCT طبیعی ایسکمی اولیه را رد نمی‌کند.'))}</p></div></aside>
            <ReadControl lang={lang} read={read.has('befund')} onClick={() => markRead('befund')} />
          </section>

          <section id="take-home" className={`${s.section} ${s.takeHome}`} aria-labelledby="take-home-title"><h2 id="take-home-title"><LessonIcon name="bookmark" />Take Home Message</h2><ol>{takeaways.map((item, index) => <li key={index}><details><summary><span className={s.takeNumber}>0{index + 1}</span><h3>{t(item.title)}</h3><LessonIcon name="plus" /></summary><p>{t(item.detail)}</p></details></li>)}</ol></section>

          <details className={s.sources}><summary>{t(L('Quellen', 'Sources', 'منابع'))}<LessonIcon name="chevron" /></summary><ul>{sources.map(source => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer"><div><strong>{source.title}</strong><span>{source.detail}</span></div><LessonIcon name="external" /></a></li>)}</ul></details>
          <footer className={s.lessonFooter}><Link href="/andarun"><LessonIcon name="back" />Andarun</Link><span>RadYar · Test 2</span><a href="#" onClick={event => { event.preventDefault(); window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }) }}>{t(L('Nach oben', 'Back to top', 'بالای صفحه'))}</a></footer>
        </article>
      </div>
    </div>
  </main>
}
