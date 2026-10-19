'use client'

import Link from 'next/link'
import { useState } from 'react'
import LessonHero from '@/components/LessonHero'
import { useLanguage } from '@/providers/LanguageProvider'
import { GEHIRN_PRES_LESSON as lesson } from '@/data/gehirnPresLesson'
import styles from '@/app/technik/kontrastmittel/page.module.css'

const pick = (x, lang) => x?.[lang] || x?.de || ''

function PresSchematic({ lang }) {
  const labels = lang === 'fa'
    ? ['T2/FLAIR','توزیع','DWI + ADC','زمینه']
    : lang === 'en'
      ? ['T2/FLAIR','Distribution','DWI + ADC','Context']
      : ['T2/FLAIR','Verteilung','DWI + ADC','Kontext']
  return <figure style={{ margin: 0, padding: 14, border: '1px solid var(--border)', borderRadius: 18, background: 'var(--bg-card)' }}>
    <svg viewBox="0 0 640 190" role="img" aria-label={labels.join(' → ')} style={{ display: 'block', width: '100%', height: 'auto' }}>
      <defs><marker id="pres-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 8 4 0 8" fill="var(--text-muted)" /></marker></defs>
      <path d="M30 94h568" stroke="var(--text-muted)" strokeWidth="2" markerEnd="url(#pres-arrow)" />
      {labels.map((label, i) => { const x = 18 + i * 154; return <g key={label}>
        <rect x={x} y="52" width="128" height="82" rx="16" fill="var(--surface-soft)" stroke={i === 2 ? '#0f9f6e' : 'var(--border)'} strokeWidth="2" />
        <circle cx={x + 20} cy="72" r="11" fill={i === 2 ? '#0f9f6e' : '#4189a7'} />
        <text x={x + 20} y="76" textAnchor="middle" fill="white" fontSize="10" fontWeight="700">{i + 1}</text>
        <foreignObject x={x + 7} y="89" width="114" height="38"><div xmlns="http://www.w3.org/1999/xhtml" style={{ display:'grid', height:'100%', placeItems:'center', color:'var(--text-strong)', fontSize:13, fontWeight:800, textAlign:'center' }}>{label}</div></foreignObject>
      </g> })}
      <text x="320" y="169" textAnchor="middle" fill="var(--text-muted)" fontSize="12">{lang === 'fa' ? 'الگوی تصویری + زمینه؛ بدون نشانهٔ قطعی منفرد' : lang === 'en' ? 'Imaging pattern + context; no single decisive sign' : 'Bildmuster + Kontext; kein einzelnes beweisendes Zeichen'}</text>
    </svg>
    <figcaption style={{ color:'var(--text-muted)', fontSize:12, textAlign:'center' }}>{lang === 'fa' ? 'شماتیک آموزشی است و تصویر MRI واقعی نیست.' : lang === 'en' ? 'Educational schematic; not an MRI.' : 'Konzeptgrafik, keine MRT-Aufnahme.'}</figcaption>
  </figure>
}

export default function PresLessonPage() {
  const { lang } = useLanguage()
  const rtl = lang === 'fa'
  const [open, setOpen] = useState(0)
  const [read, setRead] = useState([])
  const [answer, setAnswer] = useState(null)
  const t = lang === 'fa'
    ? { badge:'Gehirn · PDF-Lernentwurf', breadcrumb:'مغز', contents:'مسیر یادگیری', progress:'پیشرفت فقط با علامت‌گذاری بخش خوانده‌شده تغییر می‌کند.', read:'این بخش را خواندم', source:'منبع و محدودیت‌ها', media:'رسانه', review:'وضعیت بررسی', self:'خودآزمایی: تفسیر DWI', result:'بازخورد', home:'آموزش مغز', status:'پیش‌نویس آموزشی؛ برای تصمیم بالینی استفاده نشود.' }
    : lang === 'en'
      ? { badge:'Brain · PDF teaching draft', breadcrumb:'Brain', contents:'Learning path', progress:'Progress changes only when you mark a section as read.', read:'Mark section as read', source:'Source and limits', media:'Media', review:'Review status', self:'Self-check: interpreting DWI', result:'Feedback', home:'Brain lessons', status:'Teaching draft; not for clinical decision-making.' }
      : { badge:'Gehirn · PDF-Lernentwurf', breadcrumb:'Gehirn', contents:'Lernpfad', progress:'Der Fortschritt ändert sich erst, wenn Sie ein Kapitel als gelesen markieren.', read:'Kapitel als gelesen markieren', source:'Quelle und Grenzen', media:'Medien', review:'Prüfstatus', self:'Selbstcheck: DWI einordnen', result:'Rückmeldung', home:'Gehirn-Lektionen', status:'Lernentwurf; nicht für klinische Entscheidungen.' }
  const url = path => lang === 'de' ? path : `${path}?lang=${lang}`
  const chapter = lesson.chapters[open]
  const toggleRead = i => setRead(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i])
  const pct = Math.round((read.length / lesson.chapters.length) * 100)

  return <main className={styles.page} dir={rtl ? 'rtl' : 'ltr'} lang={lang}>
    <header className={styles.header}>
      <nav className={styles.breadcrumb} aria-label={rtl ? 'مسیر صفحه' : lang === 'en' ? 'Breadcrumb' : 'Seitennavigation'}><Link href={url('/')}>RadYar</Link><span>›</span><Link href={url('/lernen/gehirn')}>{t.breadcrumb}</Link><span>›</span><span>{pick(lesson.title, lang)}</span></nav>
      <div className={styles.hero}><div className={styles.heroText}><span className={styles.sourceBadge}>{t.badge}</span><LessonHero title={pick(lesson.title, lang)} lang={lang} visual={<PresSchematic lang={lang} />} /></div><aside className={styles.heroStats}><div className={styles.heroStat}><strong>79</strong><span>{lang === 'fa' ? 'صفحه PDF' : lang === 'en' ? 'PDF page' : 'PDF-Seite'}</span><small>{lang === 'fa' ? 'PRES و افتراق انفارکت' : lang === 'en' ? 'PRES and infarct differential' : 'PRES und Infarktdifferenzial'}</small></div><p role="status" style={{ padding: 14 }}>{t.status}</p></aside></div>
    </header>
    <div className={styles.layout}>
      <aside className={styles.sidebar}><div className={styles.sideTitle}>{t.contents}</div><div aria-label={t.progress}><div style={{ height: 8, margin: '8px 0', borderRadius: 9, background: 'var(--border)' }}><div style={{ width: `${pct}%`, height: '100%', borderRadius: 9, background: '#0f9f6e', transition: 'width .2s' }} /></div><small>{pct}% · {t.progress}</small></div>{lesson.chapters.map((c, i) => <button key={c.id} type="button" className={styles.sideItem} aria-current={open === i ? 'step' : undefined} onClick={() => setOpen(i)}><span aria-hidden="true">{read.includes(i) ? '✓' : '◈'}</span><strong>{pick(c.title, lang)}</strong></button>)}</aside>
      <div className={styles.main}>
        <section className={styles.section} id={chapter.id}>
          <button className={styles.sectionHeader} type="button" aria-expanded="true"><span className={styles.sectionHeading}><span className={styles.sectionIcon} aria-hidden="true">◈</span><h2>{pick(chapter.title, lang)}</h2></span><span className={styles.sectionToggle}>{chapter.pages}</span></button>
          <div className={styles.sectionBody}>{open === 0 && <p className={styles.lead}>{pick(lesson.objective, lang)}</p>}<p className={styles.lead}>{pick(chapter.text, lang).split('\n\n')[0]}</p>{pick(chapter.text, lang).split('\n\n').slice(1).map((p, i) => <p key={i} style={{ lineHeight: 1.75 }}>{p}</p>)}<button type="button" onClick={() => toggleRead(open)} aria-pressed={read.includes(open)} className={styles.sectionToggle} style={{ width: 'auto', padding: '8px 14px', marginTop: 14 }}>{read.includes(open) ? `✓ ${t.read}` : t.read}</button></div>
        </section>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}><button type="button" className={styles.lessonLink} disabled={open === 0} onClick={() => setOpen(Math.max(0, open - 1))}>{lang === 'fa' ? 'فصل پیشین' : lang === 'en' ? 'Previous chapter' : 'Vorheriges Kapitel'}</button><button type="button" className={styles.lessonLink} disabled={open === lesson.chapters.length - 1} onClick={() => setOpen(Math.min(lesson.chapters.length - 1, open + 1))}>{lang === 'fa' ? 'فصل بعدی' : lang === 'en' ? 'Next chapter' : 'Nächstes Kapitel'}</button></div>
        {open === lesson.chapters.length - 1 && <>
          <section className={styles.section} aria-labelledby="pres-check"><div className={styles.sectionBody}><h2 id="pres-check">{t.self}</h2><p className={styles.lead}>{pick(lesson.assessment.question, lang)}</p><div style={{ display: 'grid', gap: 9 }}>{lesson.assessment.options.map((o, i) => <button key={i} type="button" aria-pressed={answer === i} onClick={() => setAnswer(i)} style={{ padding: 14, border: '1px solid var(--border)', borderRadius: 12, color: 'var(--text)', background: 'var(--bg-card)', cursor: 'pointer', textAlign: 'start' }}>{pick(o, lang)}</button>)}</div>{answer !== null && <p role="status" style={{ marginTop: 12 }}>{answer === lesson.assessment.correctIndex ? pick(lesson.assessment.feedback, lang) : pick(lesson.assessment.retry, lang)}</p>}</div></section>
          <aside className={`${styles.callout} ${styles.calloutCave}`}><strong>{t.source}</strong><p>{pick(lesson.media, lang)}</p><p style={{ marginTop: 10 }}>{pick(lesson.reviewStatus, lang)}</p><ul>{lesson.references.map(ref => <li key={ref.label}>{ref.href ? <a href={ref.href} target="_blank" rel="noreferrer">{ref.label}</a> : ref.label}</li>)}</ul></aside>
        </>}
        <Link className={styles.lessonLink} href={url('/lernen/gehirn')}>{t.home}<span aria-hidden="true">←</span></Link>
      </div>
    </div>
  </main>
}
