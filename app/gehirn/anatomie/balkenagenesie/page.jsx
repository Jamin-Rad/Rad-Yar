'use client'

import Link from 'next/link'
import { useState } from 'react'
import LessonHero from '@/components/LessonHero'
import { useLanguage } from '@/providers/LanguageProvider'
import { GEHIRN_BALKENAGENESIE_LESSON as lesson } from '@/data/gehirnBalkenagenesieLesson'
import styles from '@/app/technik/kontrastmittel/page.module.css'

const pick = (x, lang) => x?.[lang] || x?.de || ''

function PlaneSchematic({ lang }) {
  const labels = lang === 'fa' ? ['ساژیتال: مشاهده مستقیم', 'کرونال: بطن‌ها', 'اکسیال: آرایش'] : lang === 'en' ? ['Sagittal: direct view', 'Coronal: ventricles', 'Axial: configuration'] : ['Sagittal: direkt sehen', 'Koronal: Ventrikel', 'Axial: Konfiguration']
  return <figure style={{ margin: 0, padding: 14, border: '1px solid var(--border)', borderRadius: 18, background: 'var(--bg-card)' }}>
    <svg viewBox="0 0 540 180" role="img" aria-label={labels.join(' → ')} style={{ display: 'block', width: '100%', height: 'auto' }}>
      {labels.map((label, i) => { const x = 10 + i * 177; return <g key={label}><rect x={x} y="16" width="160" height="145" rx="16" fill="var(--surface-soft)" stroke="var(--border)" strokeWidth="2" />
        {i === 0 ? <g><path d={`M${x+42} 91c12-47 68-58 86-24 9 18-3 38-15 48-15 12-44 13-58 0`} fill="none" stroke="#4189a7" strokeWidth="5"/><path d={`M${x+47} 81c22-11 33-11 55 0`} fill="none" stroke="#e98183" strokeWidth="4" strokeDasharray="5 5"/></g> : i === 1 ? <g><path d={`M${x+52} 48v65c0 12 19 11 19-1V60m37-12v65c0 12-19 11-19-1V60`} fill="none" stroke="#4189a7" strokeWidth="8" strokeLinecap="round"/><path d={`M${x+80} 34v80`} stroke="#0f9f6e" strokeWidth="3" strokeDasharray="5 5"/></g> : <g><path d={`M${x+42} 48q28 7 35 24v54q-20-5-35-18zM${x+118} 48q-28 7-35 24v54q20-5 35-18z`} fill="#b9dce2" stroke="#4189a7" strokeWidth="3"/><path d={`M${x+44} 52h73`} stroke="#0f9f6e" strokeWidth="3" strokeDasharray="5 5"/></g>}
        <foreignObject x={x+8} y="124" width="144" height="30"><div xmlns="http://www.w3.org/1999/xhtml" style={{ display:'grid', height:'100%', placeItems:'center', color:'var(--text-strong)', fontSize:12, fontWeight:800, textAlign:'center' }}>{label}</div></foreignObject>
      </g>})}
    </svg><figcaption style={{ color:'var(--text-muted)', fontSize:12, textAlign:'center' }}>{lang === 'fa' ? 'شماتیک برای یادآوری ترتیب بررسی؛ تصویر MRI واقعی نیست.' : lang === 'en' ? 'A schematic to cue the viewing sequence; not an MRI.' : 'Schema zur Orientierung; keine MRT-Aufnahme.'}</figcaption>
  </figure>
}

export default function CallosalAgenesisPage() {
  const { lang } = useLanguage()
  const rtl = lang === 'fa'
  const [open, setOpen] = useState(0)
  const [read, setRead] = useState([])
  const [answer, setAnswer] = useState(null)
  const t = lang === 'fa'
    ? { badge:'مغز · پیش‌نویس آموزشی PDF', crumb:'مغز', contents:'مسیر یادگیری', progress:'پیشرفت فقط با علامت‌گذاری بخش خوانده‌شده تغییر می‌کند.', read:'این بخش را خواندم', self:'خودآزمایی: یافتهٔ غیرمستقیم', refs:'منبع و محدودیت‌ها', home:'درس‌های مغز', status:'پیش‌نویس آموزشی؛ برای تصمیم بالینی استفاده نشود.' }
    : lang === 'en'
      ? { badge:'Brain · PDF teaching draft', crumb:'Brain', contents:'Learning path', progress:'Progress changes only after marking a section as read.', read:'Mark section as read', self:'Self-check: an indirect finding', refs:'Source and limits', home:'Brain lessons', status:'Teaching draft; not for clinical decision-making.' }
      : { badge:'Gehirn · PDF-Lernentwurf', crumb:'Gehirn', contents:'Lernpfad', progress:'Der Fortschritt ändert sich erst nach dem Markieren eines Kapitels.', read:'Kapitel als gelesen markieren', self:'Selbstcheck: indirekter Hinweis', refs:'Quelle und Grenzen', home:'Gehirn-Lektionen', status:'Lernentwurf; nicht für klinische Entscheidungen.' }
  const url = path => lang === 'de' ? path : `${path}?lang=${lang}`
  const chapter = lesson.chapters[open]
  const pct = Math.round((read.length / lesson.chapters.length) * 100)
  const setReadState = () => setRead(prev => prev.includes(open) ? prev.filter(x => x !== open) : [...prev, open])
  return <main className={styles.page} dir={rtl ? 'rtl' : 'ltr'} lang={lang}>
    <header className={styles.header}><nav className={styles.breadcrumb} aria-label={rtl ? 'مسیر صفحه' : lang === 'en' ? 'Breadcrumb' : 'Seitennavigation'}><Link href={url('/')}>RadYar</Link><span>›</span><Link href={url('/lernen/gehirn')}>{t.crumb}</Link><span>›</span><span>{pick(lesson.title, lang)}</span></nav>
      <div className={styles.hero}><div className={styles.heroText}><span className={styles.sourceBadge}>{t.badge}</span><LessonHero title={pick(lesson.title, lang)} lang={lang} visual={<PlaneSchematic lang={lang} />} /></div><aside className={styles.heroStats}><div className={styles.heroStat}><strong>85–86</strong><span>{lang === 'fa' ? 'صفحه‌های PDF' : lang === 'en' ? 'PDF pages' : 'PDF-Seiten'}</span><small>{lang === 'fa' ? 'ساژیتال، کرونال، اکسیال' : lang === 'en' ? 'Sagittal, coronal, axial' : 'Sagittal, koronal, axial'}</small></div><p role="status" style={{ padding: 14 }}>{t.status}</p></aside></div>
    </header>
    <div className={styles.layout}><aside className={styles.sidebar}><div className={styles.sideTitle}>{t.contents}</div><div><div style={{ height: 8, margin: '8px 0', borderRadius: 9, background: 'var(--border)' }}><div style={{ width: `${pct}%`, height: '100%', borderRadius: 9, background: '#0f9f6e' }} /></div><small>{pct}% · {t.progress}</small></div>{lesson.chapters.map((c, i) => <button key={c.id} type="button" className={styles.sideItem} aria-current={open === i ? 'step' : undefined} onClick={() => setOpen(i)}><span aria-hidden="true">{read.includes(i) ? '✓' : '◈'}</span><strong>{pick(c.title, lang)}</strong></button>)}</aside>
      <div className={styles.main}><section className={styles.section} id={chapter.id}><div className={styles.sectionHeader}><span className={styles.sectionHeading}><span className={styles.sectionIcon} aria-hidden="true">◈</span><h2>{pick(chapter.title, lang)}</h2></span><span className={styles.sectionToggle} style={{ width:'auto', paddingInline:12 }}>{lang === 'fa' ? `PDF ${chapter.pages}` : lang === 'en' ? `PDF p. ${chapter.pages}` : `PDF S. ${chapter.pages}`}</span></div><div className={styles.sectionBody}>{open === 0 && <p className={styles.lead}>{pick(lesson.objective, lang)}</p>}{pick(chapter.text, lang).split('\n\n').map((p, i) => <p key={i} className={i === 0 ? styles.lead : undefined} style={{ lineHeight: 1.75 }}>{p}</p>)}<button type="button" onClick={setReadState} aria-pressed={read.includes(open)} className={styles.sectionToggle} style={{ width:'auto', padding:'8px 14px', marginTop:14 }}>{read.includes(open) ? `✓ ${t.read}` : t.read}</button></div></section>
        <div style={{ display:'flex', justifyContent:'space-between', gap:12 }}><button type="button" className={styles.lessonLink} disabled={open === 0} onClick={() => setOpen(Math.max(0, open - 1))}>{lang === 'fa' ? 'فصل پیشین' : lang === 'en' ? 'Previous chapter' : 'Vorheriges Kapitel'}</button><button type="button" className={styles.lessonLink} disabled={open === lesson.chapters.length - 1} onClick={() => setOpen(Math.min(lesson.chapters.length - 1, open + 1))}>{lang === 'fa' ? 'فصل بعدی' : lang === 'en' ? 'Next chapter' : 'Nächstes Kapitel'}</button></div>
        {open === lesson.chapters.length - 1 && <><section className={styles.section}><div className={styles.sectionBody}><h2>{t.self}</h2><p className={styles.lead}>{pick(lesson.assessment.question, lang)}</p><div style={{ display:'grid', gap:9 }}>{lesson.assessment.options.map((o,i) => <button key={i} type="button" aria-pressed={answer === i} onClick={() => setAnswer(i)} style={{ padding:14, border:'1px solid var(--border)', borderRadius:12, color:'var(--text)', background:'var(--bg-card)', cursor:'pointer', textAlign:'start' }}>{pick(o,lang)}</button>)}</div>{answer !== null && <p role="status" style={{ marginTop:12 }}>{answer === lesson.assessment.correctIndex ? pick(lesson.assessment.feedback,lang) : pick(lesson.assessment.retry,lang)}</p>}</div></section><aside className={`${styles.callout} ${styles.calloutCave}`}><strong>{t.refs}</strong><p>{pick(lesson.media,lang)}</p><p style={{ marginTop:10 }}>{pick(lesson.sourceConflict,lang)}</p><p style={{ marginTop:10 }}>{pick(lesson.reviewStatus,lang)}</p><ul>{lesson.references.map(ref => <li key={ref.label}>{ref.href ? <a href={ref.href} target="_blank" rel="noreferrer">{ref.label}</a> : ref.label}</li>)}</ul></aside></>}
        <Link className={styles.lessonLink} href={url('/lernen/gehirn')}>{t.home}<span aria-hidden="true">←</span></Link>
      </div>
    </div>
  </main>
}
