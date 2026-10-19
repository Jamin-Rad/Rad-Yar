'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Footer from '@/components/Footer'
import LessonHero from '@/components/LessonHero'
import InProgressBanner from '@/components/InProgressBanner'
import { useLanguage } from '@/providers/LanguageProvider'
import { TECHNIK_GRUNDLAGEN } from '@/data/technikGrundlagenLesson'
import styles from '../kontrastmittel/page.module.css'

const pick = (value, lang) => value?.[lang] || value?.de || ''

function LearningPath({ lang }) {
  const labels = lang === 'fa'
    ? ['پرسش بالینی', 'انتخاب روش و پروتکل', 'سیگنال و بازسازی', 'پاسخ به پرسش']
    : lang === 'en'
      ? ['Clinical question', 'Choose method and protocol', 'Signal and reconstruction', 'Answer the question']
      : ['Klinische Frage', 'Verfahren und Protokoll wählen', 'Signal und Rekonstruktion', 'Fragestellung beantworten']
  return <figure aria-label={lang === 'fa' ? 'مسیر یادگیری تصویربرداری' : lang === 'en' ? 'Imaging learning pathway' : 'Lernpfad der Bildgebung'} style={{ margin: '12px 0 22px', padding: 18, border: '1px solid var(--border)', borderRadius: 20, background: 'var(--surface-soft)' }}>
    <svg viewBox="0 0 800 148" role="img" aria-label={labels.join(' → ')} style={{ display: 'block', width: '100%', height: 'auto' }}>
      {[0,1,2,3].map((n) => { const x=12+n*198; return <g key={n}><rect x={x} y="30" width="170" height="78" rx="16" fill="var(--bg-card)" stroke="var(--line)" strokeWidth="2"/><circle cx={x+22} cy="52" r="13" fill="#0f9f6e"/><text x={x+22} y="57" fill="white" fontSize="13" textAnchor="middle">{n+1}</text><foreignObject x={x+12} y="69" width="146" height="30"><div xmlns="http://www.w3.org/1999/xhtml" style={{fontSize:11,fontWeight:700,textAlign:'center',color:'var(--text-strong)'}}>{labels[n]}</div></foreignObject>{n<3&&<path d={`M${x+174} 69h16m-6-6 6 6-6 6`} fill="none" stroke="#0f9f6e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>}</g>})}
    </svg><figcaption style={{ marginTop: 6, textAlign: 'center', color: 'var(--text-muted)', fontSize: 12 }}>{lang === 'fa' ? 'مراحل به‌هم‌پیوسته‌اند؛ انتخاب پروتکل باید به پرسش تشخیصی پاسخ دهد.' : lang === 'en' ? 'The steps connect: protocol selection should answer the diagnostic question.' : 'Die Schritte hängen zusammen: Die Protokollwahl soll die diagnostische Frage beantworten.'}</figcaption>
  </figure>
}

function RadiationProtectionCheck({ lang }) {
  const [answer, setAnswer] = useState(null)
  const copy = lang === 'fa'
    ? { title: 'خودآزمایی: نقش‌ها در تلرادیولوژی', question: 'کدام چیدمان نقش‌ها با چارچوب فعلی آلمان سازگار است؟', options: ['پزشک تلرادیولوژیستِ دارای صلاحیت هنگام بررسی در دسترس است؛ پزشک دارای دانش لازم در محل حضور دارد؛ فرد مجری نیز باید صلاحیت و مجوز لازم را داشته باشد.', 'حضور پزشک محل کافی است؛ نیاز به پزشک مسئول از راه دور نیست.', 'فقط MTR مجاز به اجرای فنی است و هیچ گروه دیگری نمی‌تواند شرایط قانونی را برآورده کند.'], correct: 'درست است. مادهٔ ۱۴ بند ۲ StrlSchG و مادهٔ ۱۴۵ StrlSchV نقش مسئول از راه دور، پزشک حاضر و فرد مجاز به اجرای فنی را جدا می‌کنند.', retry: 'به سه نقش جدا فکر کنید: پزشک مسئول از راه دور، پزشک حاضر در محل و فرد واجد شرایط اجرای فنی.' }
    : lang === 'en'
      ? { title: 'Self-check: roles in teleradiology', question: 'Which arrangement matches the current German framework?', options: ['The qualified remote radiologist is available during the examination; a physician with required knowledge is on site; the operator also meets the required expertise and authorization.', 'An on-site physician is enough; no remote responsible radiologist is required.', 'Only MTRs may perform the technical examination, and no other group can meet the legal conditions.'], correct: 'Correct. StrlSchG § 14(2) and StrlSchV § 145 distinguish the remote responsible physician, the on-site physician, and the person authorized to perform the examination.', retry: 'Think of three separate roles: remote responsible physician, on-site physician, and qualified technical operator.' }
      : { title: 'Selbstcheck: Rollen in der Teleradiologie', question: 'Welche Besetzung entspricht dem aktuellen deutschen Rechtsrahmen?', options: ['Die fachkundige teleradiologische Ärztin/der Arzt ist während der Untersuchung verfügbar; vor Ort ist ein Arzt mit den erforderlichen Kenntnissen; die ausführende Person erfüllt ebenfalls Fachkunde- und Berechtigungsvorgaben.', 'Ein Arzt am Untersuchungsort genügt; eine verantwortliche teleradiologische Ärztin oder ein Arzt ist nicht erforderlich.', 'Nur MTR dürfen technisch durchführen; keine andere Personengruppe kann die gesetzlichen Voraussetzungen erfüllen.'], correct: 'Richtig. § 14 Absatz 2 StrlSchG und § 145 StrlSchV unterscheiden die teleradiologisch verantwortliche Person, den Arzt am Ort und die zur technischen Durchführung berechtigte Person.', retry: 'Denken Sie an drei getrennte Rollen: teleradiologische Verantwortung, ärztliche Präsenz am Ort und berechtigte technische Durchführung.' }
  return <section className={styles.section} aria-labelledby="radiation-law-check"><div className={styles.sectionBody}><h2 id="radiation-law-check">{copy.title}</h2><p className={styles.lead}>{copy.question}</p><div style={{display:'grid',gap:8}}>{copy.options.map((option,index)=><button type="button" key={index} aria-pressed={answer===index} onClick={()=>setAnswer(index)} style={{padding:12,border:'1px solid var(--border)',borderRadius:12,background:'var(--bg-card)',color:'var(--text)',textAlign:'start',cursor:'pointer'}}>{option}</button>)}</div>{answer!==null&&<p role="status" style={{marginTop:12}}>{answer===0?copy.correct:copy.retry}</p>}</div></section>
}

function RetrievalCheck({ lang }) {
  const [answer, setAnswer] = useState(null)
  const copy = lang === 'fa'
    ? { title:'بازیابی فعال', q:'در CT، کدام عبارت دربارهٔ CTDIvol و DLP درست است؟', opts:['CTDIvol با طول اسکن افزایش می‌یابد.','DLP، CTDIvol را در طول اسکن جمع می‌کند.','هر دو دوز اندامی فرد را دقیق می‌سنجند.'], ok:'درست. DLP حاصل CTDIvol و طول اسکن است؛ هیچ‌کدام به‌تنهایی دوز اندامی فرد را تعیین نمی‌کنند.', retry:'دوباره فکر کنید: یکی شاخص حجم/پروتکل است و دیگری طول اسکن را هم لحاظ می‌کند.' }
    : lang === 'en'
      ? { title:'Retrieval check', q:'In CT, which statement about CTDIvol and DLP is correct?', opts:['CTDIvol increases with scan length.','DLP combines CTDIvol with scan length.','Both precisely measure an individual organ dose.'], ok:'Correct. DLP combines CTDIvol and scan length; neither alone determines an individual organ dose.', retry:'Try again: one is a volume/protocol index; the other also accounts for scan length.' }
      : { title:'Wiederabruf', q:'Welche Aussage zu CTDIvol und DLP ist richtig?', opts:['CTDIvol steigt mit der Scanlänge.','DLP berücksichtigt CTDIvol und Scanlänge.','Beide messen die individuelle Organdosis exakt.'], ok:'Richtig. Das DLP kombiniert CTDIvol und Scanlänge; keine der Größen allein bestimmt die individuelle Organdosis.', retry:'Noch einmal: Eine Größe beschreibt einen Volumen-/Protokollindex, die andere berücksichtigt zusätzlich die Scanlänge.' }
  return <section className={styles.section} aria-labelledby="tech-check"><div className={styles.sectionBody}><h2 id="tech-check">{copy.title}</h2><p className={styles.lead}>{copy.q}</p><div style={{display:'grid',gap:8}}>{copy.opts.map((option,index)=><button type="button" key={index} aria-pressed={answer===index} onClick={()=>setAnswer(index)} style={{padding:12,border:'1px solid var(--border)',borderRadius:12,background:'var(--bg-card)',color:'var(--text)',textAlign:'start',cursor:'pointer'}}>{option}</button>)}</div>{answer!==null&&<p role="status" style={{marginTop:12}}>{answer===1?copy.ok:copy.retry}</p>}</div></section>
}

export default function TechnikGrundlagenPage() {
  const { lang } = useLanguage()
  const [active, setActive] = useState(TECHNIK_GRUNDLAGEN.sections[0].id)
  const rtl = lang === 'fa'
  const withLang = href => lang === 'de' ? href : `${href}${href.includes('?') ? '&' : '?'}lang=${lang}`

  useEffect(() => {
    const observers = TECHNIK_GRUNDLAGEN.sections.map(section => {
      const node = document.getElementById(section.id)
      if (!node) return null
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setActive(section.id)
      }, { rootMargin: '-18% 0px -72% 0px', threshold: 0.01 })
      observer.observe(node)
      return observer
    })
    return () => observers.forEach(observer => observer?.disconnect())
  }, [])

  return <><main className={styles.page} dir={rtl ? 'rtl' : 'ltr'} lang={lang}>
    <InProgressBanner lang={lang} />
    <header className={styles.header}>
      <nav className={styles.breadcrumb} aria-label={lang === 'de' ? 'Seitennavigation' : lang === 'fa' ? 'مسیر صفحه' : 'Breadcrumb'}>
        <Link href={withLang('/')}>RadYar</Link><span>›</span><Link href={withLang('/lernen/technik')}>{lang === 'fa' ? 'تکنیک' : 'Technique'}</Link><span>›</span><span>{pick(TECHNIK_GRUNDLAGEN.title, lang)}</span>
      </nav>
      <LessonHero title={pick(TECHNIK_GRUNDLAGEN.title, lang)} lang={lang} visual={<svg viewBox="0 0 360 180" role="img" aria-label={lang === 'fa' ? 'شماتیک تولید تصویر پرتو ایکس' : lang === 'en' ? 'X-ray image formation schematic' : 'Schema der Röntgenbildentstehung'}><rect width="360" height="180" rx="20" fill="var(--surface-soft)"/><circle cx="48" cy="90" r="24" fill="#55b8cc"/><path d="M76 90h58m0 0 21-29m-21 29 21 29m-21-29h74" stroke="#149c83" strokeWidth="5" fill="none"/><ellipse cx="211" cy="90" rx="34" ry="52" fill="#c4d5e7" stroke="#416d8c" strokeWidth="3"/><path d="M247 90h58" stroke="#149c83" strokeWidth="5"/><rect x="306" y="56" width="25" height="68" rx="5" fill="#456b88"/><text x="48" y="150" textAnchor="middle" fontSize="12" fill="var(--text)">{lang === 'fa' ? 'منبع' : lang === 'en' ? 'Source' : 'Quelle'}</text><text x="211" y="158" textAnchor="middle" fontSize="12" fill="var(--text)">{lang === 'fa' ? 'بیمار' : lang === 'en' ? 'Patient' : 'Patient'}</text><text x="318" y="145" textAnchor="middle" fontSize="12" fill="var(--text)">{lang === 'fa' ? 'آشکارساز' : lang === 'en' ? 'Detector' : 'Detektor'}</text></svg>} />
      <div className={styles.heroStats}><div className={styles.heroStat}><strong>2–20 · 25–27</strong><span>{lang === 'fa' ? 'صفحه‌های PDF' : lang === 'en' ? 'PDF pages' : 'PDF-Seiten'}</span><small>{lang === 'fa' ? 'اثر پرتو، دوز، چارچوب قانونی و اتم' : lang === 'en' ? 'Radiation effects, dose, legal framework and atoms' : 'Strahlenwirkung, Dosis, Rechtsrahmen, Atom und Ionisation'}</small></div><div className={styles.heroStat}><strong>30–43</strong><span>{lang === 'fa' ? 'صفحه‌های PDF' : lang === 'en' ? 'PDF pages' : 'PDF-Seiten'}</span><small>{lang === 'fa' ? 'لوله، برهم‌کنش، آشکارساز' : lang === 'en' ? 'Tube, interaction, detector' : 'Röhre, Wechselwirkung, Detektor'}</small></div></div>
    </header>
    <div className={styles.layout}>
      <aside className={styles.sidebar}><div className={styles.sideTitle}>{lang === 'fa' ? 'فهرست مطالب' : lang === 'en' ? 'Contents' : 'Inhalt'}</div>
        {TECHNIK_GRUNDLAGEN.sections.map(section => <button type="button" key={section.id} className={`${styles.sideItem} ${active === section.id ? styles.sideItemActive : ''}`} onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}><span aria-hidden="true">◈</span><strong>{pick(section.title, lang)}</strong></button>)}
      </aside>
      <div className={styles.main}>
        <section className={styles.section}><div className={styles.sectionBody}><p className={styles.lead}>{pick(TECHNIK_GRUNDLAGEN.intro, lang)}</p><LearningPath lang={lang} /></div></section>
        {TECHNIK_GRUNDLAGEN.sections.map(section => <section id={section.id} className={styles.section} key={section.id}>
          <div className={styles.sectionHeader}><span className={styles.sectionHeading}><span className={styles.sectionIcon}>◈</span><h2>{pick(section.title, lang)}</h2></span><span className={styles.sectionToggle} style={{ width: 'auto', paddingInline: 12, flex: '0 0 auto', fontSize: 11 }}>{lang === 'fa' ? `صفحهٔ PDF ${section.pages}` : lang === 'en' ? `PDF page ${section.pages}` : `PDF-Seite ${section.pages}`}</span></div>
          {section.id === 'intervention-3a' ? <figure style={{margin:'0 20px',padding:12,border:'1px solid var(--border)',borderRadius:16}}><svg viewBox="0 0 520 125" role="img" aria-label={lang === 'fa' ? 'بیمار منبع پرتو پراکنده است؛ فاصله و حفاظ کارکنان را کاهش می‌دهد' : lang === 'en' ? 'Patient is the source of scatter; distance and shielding protect staff' : 'Der Patient streut; Abstand und Abschirmung schützen das Personal'} style={{width:'100%',height:'auto'}}><circle cx="85" cy="56" r="22" fill="#55b8cc"/><ellipse cx="250" cy="58" rx="32" ry="44" fill="#c4d5e7" stroke="#416d8c" strokeWidth="3"/><rect x="373" y="24" width="12" height="68" fill="#18a27c"/><circle cx="457" cy="56" r="19" fill="#d6a56a"/><path d="M110 56h100m72 0h90m18 0h43" stroke="#667b8d" strokeWidth="3" strokeDasharray="7 6"/><text x="85" y="112" textAnchor="middle" fontSize="13" fill="var(--text)">{lang==='fa'?'پرتو X':lang==='en'?'X-ray tube':'Röntgenröhre'}</text><text x="250" y="116" textAnchor="middle" fontSize="13" fill="var(--text)">{lang==='fa'?'بیمار / پراکندگی':lang==='en'?'Patient / scatter':'Patient / Streuquelle'}</text><text x="379" y="112" textAnchor="middle" fontSize="13" fill="var(--text)">{lang==='fa'?'حفاظ':lang==='en'?'Shield':'Schutzschirm'}</text><text x="457" y="112" textAnchor="middle" fontSize="13" fill="var(--text)">{lang==='fa'?'کارکنان':lang==='en'?'Staff':'Personal'}</text></svg><figcaption>{lang==='fa'?'زمان کمتر، فاصلهٔ بیشتر و حفاظِ درست‌قرارگرفته سه اقدام مکمل‌اند.':lang==='en'?'Less time, greater distance and correctly positioned shielding are complementary measures.':'Weniger Zeit, mehr Abstand und korrekt positionierte Abschirmung ergänzen sich.'}</figcaption></figure> : null}
          <div className={styles.sectionBody}><p className={styles.lead}>{pick(section.lead, lang)}</p>
            <div className={styles.tableWrap}><table className={styles.table}><thead><tr><th>{lang === 'fa' ? 'مفهوم' : lang === 'en' ? 'Concept' : 'Begriff'}</th><th>{lang === 'fa' ? 'نکتهٔ آموزشی' : lang === 'en' ? 'Learning point' : 'Lernpunkt'}</th></tr></thead><tbody>{section.rows.map((row, index) => <tr key={index}>{row.map((cell, cellIndex) => <td key={cellIndex}>{pick(cell, lang)}</td>)}</tr>)}</tbody></table></div>
            {section.visuals?.map((visual, index) => <figure key={visual.src} style={{ margin: '22px 0', padding: 14, border: '1px solid var(--border)', borderRadius: 16, background: 'var(--surface-soft)' }}>
              <img src={visual.src} alt={pick(visual.alt, lang)} loading="lazy" style={{ display: 'block', width: '100%', height: 'auto', borderRadius: 10 }} />
              <figcaption style={{ marginTop: 10, color: 'var(--text-muted)', fontSize: 13, lineHeight: 1.65 }}>{pick(visual.caption, lang)}</figcaption>
              {section.visualGuides?.[index]?.length ? <div style={{ marginTop: 14, padding: '12px 14px', borderRadius: 12, background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                <h3 style={{ margin: '0 0 8px', fontSize: 14 }}>{lang === 'fa' ? 'راهنمای برچسب‌های آلمانی داخل تصویر' : lang === 'en' ? 'Guide to German labels in the image' : 'Legende der deutschen Bildbeschriftungen'}</h3>
                <ul style={{ margin: 0, paddingInlineStart: 20, display: 'grid', gap: 8 }}>
                  {section.visualGuides[index].map((item, guideIndex) => <li key={guideIndex} style={{ lineHeight: 1.65 }}><bdi dir="auto" style={{ fontWeight: 700 }}>{item.label}</bdi><span> — {pick(item.meaning, lang)}</span></li>)}
                </ul>
              </div> : null}
            </figure>)}
            {section.note ? <aside className={styles.callout}><strong>{lang === 'fa' ? 'محدودیت منبع' : lang === 'en' ? 'Source limitation' : 'Quellenhinweis'}</strong><p>{pick(section.note, lang)}</p></aside> : null}
            {section.references?.length ? <nav aria-label={lang === 'fa' ? 'منابع قانونی رسمی' : lang === 'en' ? 'Official legal sources' : 'Amtliche Rechtsquellen'} style={{ marginTop: 12 }}><strong>{lang === 'fa' ? 'متن قانون:' : lang === 'en' ? 'Official law text:' : 'Amtlicher Gesetzestext:'}</strong><ul style={{ margin: '6px 0', paddingInlineStart: 20 }}>{section.references.map(reference => <li key={reference.href}><a href={reference.href} target="_blank" rel="noreferrer">{pick(reference.label, lang)}</a></li>)}</ul></nav> : null}
          </div>
        </section>)}
        <RadiationProtectionCheck lang={lang} />
        <RetrievalCheck lang={lang} />
        <section className={styles.section}><div className={styles.sectionBody}><h2>{lang === 'fa' ? 'سه قاعدهٔ کاربردی' : lang === 'en' ? 'Three practical rules' : 'Drei praktische Regeln'}</h2><ol><li>{lang === 'fa' ? 'ابتدا پرسش و محدودهٔ لازم را مشخص کنید.' : lang === 'en' ? 'Define the question and necessary scan range first.' : 'Legen Sie zuerst Fragestellung und erforderlichen Scanbereich fest.'}</li><li>{lang === 'fa' ? 'شاخص خروجی دستگاه را با دوز اندامی فرد یکی نگیرید.' : lang === 'en' ? 'Do not equate scanner-output indices with an individual organ dose.' : 'Setzen Sie Scanner-Ausgabeindizes nicht mit der individuellen Organdosis gleich.'}</li><li>{lang === 'fa' ? 'تغییر پارامتر را هم‌زمان از نظر تصویر و دوز بسنجید.' : lang === 'en' ? 'Assess parameter changes for image quality and dose together.' : 'Beurteilen Sie Parameteränderungen gemeinsam nach Bildqualität und Dosis.'}</li></ol></div></section>
        <aside className={styles.callout}><strong>{lang === 'fa' ? 'منبع و دامنه' : lang === 'en' ? 'Source and scope' : 'Quelle und Umfang'}</strong><p>{pick(TECHNIK_GRUNDLAGEN.source, lang)}</p><p>{lang === 'fa' ? 'این پیش‌نویس هنوز از نظر علمی، ترجمه و رفتار مرورگر مستقل بازبینی نشده است.' : lang === 'en' ? 'This draft has not yet received independent scientific, translation or browser review.' : 'Dieser Entwurf wurde noch nicht unabhängig wissenschaftlich, sprachlich oder im Browser geprüft.'}</p></aside>
      </div>
    </div>
  </main><Footer /></>
}
