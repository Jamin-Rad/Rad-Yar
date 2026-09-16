'use client'

import { Fragment, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import LessonKeyPoints from '@/components/LessonKeyPoints'
import { useLanguage } from '@/providers/LanguageProvider'
import { useLessonReadStatus } from '@/hooks/useLessonReadStatus'
import { useMobileLearningLayout } from '@/hooks/useMobileLearningLayout'
import { CARDIAC_MRI_BASICS_MD } from '@/data/cardiacMriBasicsContent'
import base from '@/app/abdomen/gi/divertikulitis/page.module.css'
import styles from './page.module.css'

const PATH = '/thorax/kardio/kardio-mrt-basics'

const COPY = {
  de: {
    title: 'Kardiale MRT – Die vier Grundbausteine der CMR', subtitle: 'Cine · Perfusion · T2 · LGE',
    chapter: 'Kardiale Bildgebung / Kardio-MRT', thorax: 'Thorax', contents: 'Inhaltsverzeichnis',
    read: 'Als gelesen markieren', readDone: 'Als gelesen markiert', signIn: 'Anmelden',
    auth: 'Bitte melde dich an, um deinen Lernfortschritt zu speichern.', source: 'Originalinhalt unverändert strukturiert',
    interactive: 'Die vier Bausteine interaktiv', choose: 'Baustein auswählen',
  },
  en: {
    title: 'Cardiac MRI – The four basic building blocks of CMR', subtitle: 'Cine · perfusion · T2 · LGE',
    chapter: 'Cardiac imaging / cardiac MRI', thorax: 'Thorax', contents: 'Contents',
    read: 'Mark as read', readDone: 'Marked as read', signIn: 'Sign in',
    auth: 'Please sign in to save your learning progress.', source: 'Original content structured without additions',
    interactive: 'The four building blocks', choose: 'Select a building block',
  },
  fa: {
    title: 'MRI قلب – چهار پایهٔ اصلی CMR', subtitle: 'Cine · پرفیوژن · T2 · LGE',
    chapter: 'تصویربرداری قلبی / MRI قلب', thorax: 'قفسه سینه', contents: 'فهرست مطالب',
    read: 'علامت‌گذاری به‌عنوان خوانده‌شده', readDone: 'خوانده‌شده', signIn: 'ورود',
    auth: 'برای ذخیرهٔ پیشرفت آموزشی وارد حساب شوید.', source: 'محتوای اصلی بدون افزودن مطلب علمی سازمان‌دهی شده است',
    interactive: 'چهار پایهٔ اصلی', choose: 'یک پایه را انتخاب کنید',
  },
}

const SECTION_LABELS = {
  overview: { de: 'Grundprinzip', en: 'Basic principle', fa: 'اصل پایه' },
  cine: { de: 'Cine & Standardebenen', en: 'Cine & standard planes', fa: 'Cine و نماهای استاندارد' },
  perfusion: { de: 'First-Pass-Perfusion', en: 'First-pass perfusion', fa: 'پرفیوژن First-pass' },
  t2: { de: 'T2 & Ödem', en: 'T2 & oedema', fa: 'T2 و ادم' },
  lge: { de: 'LGE', en: 'LGE', fa: 'LGE' },
  framework: { de: 'Bausteine & Protokoll', en: 'Building blocks & protocol', fa: 'پایه‌ها و پروتکل' },
  case: { de: 'Klinisches Beispiel', en: 'Clinical example', fa: 'مثال بالینی' },
  patterns: { de: 'LGE-Muster & Gewebe', en: 'LGE patterns & tissue', fa: 'الگوهای LGE و بافت' },
  reporting: { de: 'Fehler & Befundung', en: 'Pitfalls & reporting', fa: 'خطاها و گزارش' },
  takehome: { de: 'Take Home', en: 'Take home', fa: 'نکات کلیدی' },
}

const SECTION_IDS = Object.keys(SECTION_LABELS)
const NUMBER_TO_SECTION = { 1: 'overview', 2: 'cine', 3: 'cine', 4: 'cine', 5: 'perfusion', 6: 't2', 7: 'lge', 8: 'framework', 9: 'framework', 10: 'case', 11: 'case', 12: 'case', 13: 'case', 14: 'patterns', 15: 'patterns', 16: 'reporting', 17: 'reporting' }

const PILLARS = [
  { id: 'cine', short: 'CINE', title: 'Cine-bSSFP', question: 'Anatomie und Funktion', detail: 'Morphologie, Bewegung, Volumina, EF', memory: 'Bewegung' },
  { id: 'perfusion', short: 'FLOW', title: 'First-Pass-Perfusion', question: 'Myokarddurchblutung', detail: 'Perfusionsdefekte unter Stress oder in Ruhe', memory: 'Durchblutung' },
  { id: 't2', short: 'T2', title: 'T2-STIR / T2-Mapping', question: 'Ödem', detail: 'Vermehrtes myokardiales Wasser', memory: 'Wasser' },
  { id: 'lge', short: 'LGE', title: 'Late Gadolinium Enhancement', question: 'Fibrose, Nekrose und Narbe', detail: 'Fokale Erweiterung des Extrazellulärraums', memory: 'Narbe / Fibrose' },
]

function groupContent(markdown) {
  const grouped = Object.fromEntries(SECTION_IDS.map(id => [id, []]))
  let current = 'overview'
  for (const line of markdown.replace(/\r/g, '').split('\n')) {
    if (line.startsWith('# Kardiale MRT –')) continue
    if (line.trim() === '## Einführung') continue
    const numbered = line.match(/^# (\d+)\./)
    if (numbered) current = NUMBER_TO_SECTION[Number(numbered[1])] || current
    if (/^# Take-Home Messages/.test(line) || /^# Radyar Memory Box/.test(line)) current = 'takehome'
    grouped[current].push(line)
  }
  return grouped
}

function inline(text) {
  return text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean).map((part, index) =>
    part.startsWith('**') && part.endsWith('**') ? <strong key={index}>{part.slice(2, -2)}</strong> : <Fragment key={index}>{part}</Fragment>
  )
}

function MarkdownBlock({ markdown }) {
  const lines = markdown.split('\n')
  const nodes = []
  let index = 0
  while (index < lines.length) {
    const raw = lines[index]
    const line = raw.trim()
    if (!line || line === '---') { index += 1; continue }
    const heading = line.match(/^(#{1,3})\s+(.+)$/)
    if (heading) {
      const Tag = heading[1].length === 1 ? 'h3' : 'h4'
      nodes.push(<Tag key={`h-${index}`} className={heading[1].length === 1 ? styles.majorHeading : styles.minorHeading}>{inline(heading[2])}</Tag>)
      index += 1; continue
    }
    if (line.startsWith('|')) {
      const rows = []
      while (index < lines.length && lines[index].trim().startsWith('|')) {
        const cells = lines[index].trim().slice(1, -1).split('|').map(cell => cell.trim())
        if (!cells.every(cell => /^-+$/.test(cell))) rows.push(cells)
        index += 1
      }
      const [head, ...body] = rows
      nodes.push(<div className={styles.tableWrap} key={`table-${index}`}><table><thead><tr>{head.map((cell, cellIndex) => <th key={cellIndex}>{inline(cell)}</th>)}</tr></thead><tbody>{body.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={cellIndex}>{inline(cell)}</td>)}</tr>)}</tbody></table></div>)
      continue
    }
    if (/^-\s+/.test(line) || /^\d+\.\s+/.test(line)) {
      const ordered = /^\d+\.\s+/.test(line)
      const items = []
      while (index < lines.length && (ordered ? /^\d+\.\s+/.test(lines[index].trim()) : /^-\s+/.test(lines[index].trim()))) {
        items.push(lines[index].trim().replace(ordered ? /^\d+\.\s+/ : /^-\s+/, ''))
        index += 1
      }
      const List = ordered ? 'ol' : 'ul'
      nodes.push(<List key={`list-${index}`} className={styles.list}>{items.map((item, itemIndex) => <li key={itemIndex}>{inline(item)}</li>)}</List>)
      continue
    }
    if (line.startsWith('>')) {
      nodes.push(<blockquote key={`quote-${index}`}>{inline(line.replace(/^>\s?/, ''))}</blockquote>)
      index += 1; continue
    }
    const paragraph = [line]
    index += 1
    while (index < lines.length) {
      const next = lines[index].trim()
      if (!next || next === '---' || /^(#{1,3})\s+/.test(next) || next.startsWith('|') || /^-\s+/.test(next) || /^\d+\.\s+/.test(next) || next.startsWith('>')) break
      paragraph.push(next)
      index += 1
    }
    nodes.push(<p key={`p-${index}`}>{inline(paragraph.join(' '))}</p>)
  }
  return nodes
}

function SectionIcon({ id }) {
  const paths = {
    overview: 'M4 5h16v14H4z M8 9h8 M8 13h5', cine: 'M3 6h18v12H3z M7 12h2l1.5-3 3 6 1.5-3H18', perfusion: 'M12 3v18 M5 8c2-2 4-2 7 0s5 2 7 0 M5 16c2-2 4-2 7 0s5 2 7 0', t2: 'M12 3c4 5 7 8 7 12a7 7 0 0 1-14 0c0-4 3-7 7-12z', lge: 'M12 3 4 8v8l8 5 8-5V8z M8 11h8 M12 8v6', framework: 'M4 4h7v7H4z M13 4h7v7h-7z M4 13h7v7H4z M13 13h7v7h-7z', case: 'M5 3h14v18H5z M9 8h6 M9 12h6 M9 16h4', patterns: 'M3 12h4l2-5 4 10 2-5h6', reporting: 'M4 4h16v16H4z M8 9h8 M8 13h8 M8 17h5', takehome: 'M9 18h6 M10 22h4 M8 14a7 7 0 1 1 8 0c-1 1-2 2-2 4h-4c0-2-1-3-2-4z',
  }
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[id] || paths.overview} /></svg>
}

function ReadButton({ lang, isRead, toggleRead, authError }) {
  const ui = COPY[lang] || COPY.de
  return <div className={base.readControl}><button type="button" className={`${base.readButton} ${isRead ? base.readButtonActive : ''}`} onClick={toggleRead}><span className={base.readCheck}>{isRead ? '✓' : ''}</span><span>{isRead ? ui.readDone : ui.read}</span></button>{authError && <div className={base.readError}><span>{ui.auth}</span><Link href="/sign-in">{ui.signIn}</Link></div>}</div>
}

export default function CardiacMriBasicsPage() {
  const { lang } = useLanguage()
  const ui = COPY[lang] || COPY.de
  const grouped = useMemo(() => groupContent(CARDIAC_MRI_BASICS_MD), [])
  const [openId, setOpenId] = useState('overview')
  const [activeId, setActiveId] = useState('overview')
  const [pillarId, setPillarId] = useState('cine')
  const { isRead, toggleRead, authError } = useLessonReadStatus('kardio-mrt-basics')
  useMobileLearningLayout()
  const pillar = PILLARS.find(item => item.id === pillarId) || PILLARS[0]
  const withLang = href => lang === 'de' ? href : `${href}${href.includes('?') ? '&' : '?'}lang=${lang}`

  useEffect(() => {
    const observers = SECTION_IDS.map(id => {
      const element = document.getElementById(id)
      if (!element) return null
      const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setActiveId(id) }, { rootMargin: '-18% 0px -72% 0px', threshold: 0.01 })
      observer.observe(element)
      return observer
    })
    return () => observers.forEach(observer => observer?.disconnect())
  }, [])

  const jumpTo = id => {
    setOpenId(id)
    window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 20)
  }

  return <main className={`${base.page} ${styles.page}`} dir={lang === 'fa' ? 'rtl' : 'ltr'} lang={lang}>
    <header className={`${base.header} ${styles.header}`}>
      <nav className={`${base.breadcrumb} ${styles.breadcrumb}`} aria-label="Breadcrumb"><Link href={withLang('/')}>RadYar</Link><span>›</span><Link href={withLang('/lernen/thorax')}>{ui.thorax}</Link><span>›</span><Link href={withLang('/lernen/thorax')}>{ui.chapter}</Link><span>›</span><strong>{ui.title}</strong></nav>
      <div className={`${base.hero} ${styles.hero}`}>
        <div className={`${base.heroText} ${styles.heroText}`}><span className={`${base.sourceBadge} ${styles.sourceBadge}`}>Dr. Zia</span><span className={styles.eyebrow}>BASICS · KARDIO-MRT</span><h1>{ui.title}</h1><p>{ui.subtitle}</p><small>{ui.source}</small></div>
        <LessonKeyPoints points={[[PILLARS[0].title, PILLARS[0].memory], [PILLARS[1].title, PILLARS[1].memory], [PILLARS[2].title, PILLARS[2].memory], [PILLARS[3].title, PILLARS[3].memory]]} />
      </div>
    </header>
    <div className={`${base.readBar} ${styles.readBar}`}><ReadButton lang={lang} isRead={isRead} toggleRead={toggleRead} authError={authError} /></div>
    <div className={`${base.layout} ${styles.layout}`}>
      <aside className={`${base.sidebar} ${styles.sidebar}`}><div className={base.sideTitle}>{ui.contents}</div>{SECTION_IDS.map(id => <button key={id} type="button" className={`${base.sideItem} ${styles.sideItem} ${activeId === id ? `${base.sideItemActive} ${styles.sideItemActive}` : ''}`} onClick={() => jumpTo(id)}><span className={styles.sideIcon}><SectionIcon id={id} /></span><strong>{SECTION_LABELS[id][lang] || SECTION_LABELS[id].de}</strong></button>)}</aside>
      <div className={`${base.main} ${styles.content}`}>
        <section className={styles.pillarLab} aria-label={ui.interactive}>
          <header><span>{ui.choose}</span><h2>{ui.interactive}</h2></header>
          <div className={styles.pillarTabs} role="tablist">{PILLARS.map(item => <button key={item.id} type="button" role="tab" aria-selected={pillarId === item.id} className={pillarId === item.id ? styles.pillarActive : ''} onClick={() => setPillarId(item.id)}><small>{item.short}</small><strong>{item.title}</strong></button>)}</div>
          <article className={styles.pillarPanel} role="tabpanel"><span>{pillar.short}</span><div><small>{pillar.question}</small><h3>{pillar.title}</h3><p>{pillar.detail}</p></div><strong>{pillar.memory}</strong></article>
        </section>
        {SECTION_IDS.map(id => {
          const open = openId === id
          return <section id={id} className={`${base.section} ${styles.section}`} key={id}>
            <button type="button" className={`${base.sectionHeader} ${styles.sectionHeader}`} aria-expanded={open} onClick={() => setOpenId(open ? null : id)}><span className={styles.sectionHeading}><span className={styles.sectionIcon}><SectionIcon id={id} /></span><h2>{SECTION_LABELS[id][lang] || SECTION_LABELS[id].de}</h2></span><span className={styles.sectionToggle}>{open ? '−' : '+'}</span></button>
            {open && <div className={`${base.sectionBody} ${styles.sectionBody}`}><MarkdownBlock markdown={grouped[id].join('\n')} /></div>}
          </section>
        })}
        <div className={`${base.readBar} ${styles.bottomRead}`}><ReadButton lang={lang} isRead={isRead} toggleRead={toggleRead} authError={authError} /></div>
      </div>
    </div>
  </main>
}
