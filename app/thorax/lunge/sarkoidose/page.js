'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import styles from './page.module.css'

const CONTENT = {
  de: {
    toc: 'Inhaltsverzeichnis',
    thorax: 'Thorax',
    lung: 'Lunge',
    title: 'Sarkoidose',
    subtitle: 'Scadding-Stadien, typische HRCT-Muster und wichtige Differentialdiagnosen',
    badge: 'RadYar · Thorax',
    mark: 'Als gelesen markieren',
    marked: 'Gelesen',
    key: 'Merke',
    cave: 'Wichtig',
    sections: [
      ['grundlagen', 'Grundlagen', '01'],
      ['scadding', 'Scadding-Stadien', '02'],
      ['hrct', 'HRCT', '03'],
      ['extrapulmonal', 'Extrapulmonal', '04'],
      ['differentialdiagnosen', 'Differentialdiagnosen', '05'],
      ['takehome', 'Take home', '06'],
      ['quellen', 'Quellen', '07'],
    ],
    hero: [
      ['> 90 %', 'thorakaler Befall', 'Lunge oder intrathorakale Lymphknoten'],
      ['2–4 mm', 'Mikronoduli', 'typisch perilymphatisch verteilt'],
      ['1-2-3', 'Lymphknoten-Zeichen', 'beide Hili plus rechts paratracheal'],
    ],
    basics: {
      title: 'Klinische Grundlagen',
      lead: 'Die Sarkoidose ist eine systemische granulomatöse Erkrankung unbekannter Ätiologie. Histologisch ist sie durch nicht verkäsende Granulome gekennzeichnet.',
      cards: [
        ['Prädilektionsort', 'In über 90 % der Fälle sind die Lunge oder das intrathorakale Lymphsystem betroffen.'],
        ['Verteilung', 'Typisch ist ein perilymphatisches Muster entlang von Pleura, interlobulären Septen, Fissuren und bronchovaskulären Bündeln.'],
        ['Epidemiologie', 'Häufigkeitsgipfel liegen ungefähr zwischen 20–40 und 60–70 Jahren; Frauen sind häufiger betroffen.'],
      ],
      note: 'Die Bildgebung kann sehr typisch sein, ersetzt aber nicht die klinische Einordnung. Die Diagnose beruht auf passender Klinik, granulomatöser Histologie und dem Ausschluss alternativer Ursachen.',
    },
    scadding: {
      title: 'Scadding-Klassifikation im Röntgen-Thorax',
      lead: 'Die radiologischen Stadien beschreiben das Muster im Röntgenbild. Sie stellen keine zwingende zeitliche Abfolge dar.',
      headers: ['Stadium', 'Röntgenbefund'],
      rows: [
        ['0', 'Normalbefund trotz möglicher extrapulmonaler Erkrankung'],
        ['I', 'Isolierte bihiläre Lymphadenopathie'],
        ['II', 'Bihiläre Lymphadenopathie plus Parenchymveränderungen'],
        ['III', 'Parenchymveränderungen ohne bihiläre Lymphadenopathie'],
        ['IV', 'Lungenfibrose'],
      ],
      images: [
        ['/sarkoidose/scadding-1.png', 'Stadium I', 'Symmetrische bihiläre Lymphadenopathie bei regelrechtem Lungenparenchym.'],
        ['/sarkoidose/scadding-2.png', 'Stadium II', 'Bihiläre Lymphadenopathie mit retikulonodulärer Parenchymzeichnung.'],
        ['/sarkoidose/scadding-3.png', 'Stadium III', 'Retikulonoduläre Parenchymveränderungen ohne Lymphadenopathie.'],
        ['/sarkoidose/scadding-4.png', 'Stadium IV', 'Fibrotischer Umbau mit Retikulationen und Traktionsbronchiektasen.'],
      ],
    },
    hrct: {
      title: 'HRCT-Muster',
      lead: 'Die HRCT ist die wichtigste Methode zur Beurteilung des pulmonalen Parenchymbefalls und fibrotischer Veränderungen.',
      nodesTitle: 'Lymphknoten',
      nodes: [
        ['Bihiläre Lymphadenopathie', 'Meist symmetrisch.'],
        ['Paratracheale Lymphknoten', 'Besonders häufig rechtsseitig.'],
        ['1-2-3-Zeichen', 'Rechter Hilus, linker Hilus und rechter Paratrachealraum.'],
        ['Verkalkungen', 'Im Spätstadium möglich, teilweise schalenförmig; eine Eggshell-Verkalkung ist nicht spezifisch.'],
      ],
      lungTitle: 'Parenchym',
      lung: [
        ['Mikronoduli', 'Meist 2–4 mm, scharf begrenzt und perilymphatisch verteilt.'],
        ['Typische Lage', 'Entlang der Fissuren, Pleura und bronchovaskulären Bündel; bevorzugt in Ober- und Mittelfeldern.'],
        ['Bronchovaskuläre Verdickung', 'Peribronchovaskuläre Manschetten durch Granulombildung.'],
        ['Fibrose', 'Irreguläre Retikulationen, Architekturverzerrung und Traktionsbronchiektasen.'],
      ],
      signs: [
        ['/sarkoidose/galaxy-sign.jpeg', 'Sarcoid Galaxy Sign', 'Ein größerer Knoten aus aggregierten Granulomen mit zahlreichen kleinen Satellitennoduli. Das Zeichen ist nicht spezifisch und kann auch bei Tuberkulose auftreten.'],
        ['/sarkoidose/cluster-sign.jpeg', 'Cluster Sign', 'Dicht gruppierte kleine Noduli, die nahezu wie ein einzelner Herd erscheinen.'],
      ],
    },
    extra: {
      title: 'Extrapulmonale Manifestationen',
      lead: 'Sarkoidose ist eine Systemerkrankung. Relevante Organmanifestationen sollten aktiv bedacht werden.',
      items: [
        ['Morbus Jüngling', 'Zystische Ostitis multiplex mit tunnelartigen Osteolysen, vor allem an Phalangen von Händen und Füßen.'],
        ['Kardiale Sarkoidose', 'MRT-Nachweis häufig über Late Gadolinium Enhancement; erhöhtes Risiko für Rhythmusstörungen.'],
        ['Neurosarkoidose', 'Unter anderem mögliche Beteiligung des Nervus facialis.'],
        ['Heerfordt-Syndrom', 'Kombination aus Uveitis, Parotitis und Fazialisparese.'],
      ],
    },
    dd: {
      title: 'Wichtige Differentialdiagnosen',
      lead: 'Verteilung, Symmetrie, Begleitbefunde und klinische Exposition helfen bei der Abgrenzung.',
      headers: ['Erkrankung', 'Typische Abgrenzung'],
      rows: [
        ['Silikose', 'Oberlappenbetonung und mögliche Eggshell-Verkalkungen; passende Quarzstaub-Exposition.'],
        ['Lymphangiosis carcinomatosa', 'Häufig unregelmäßige oder knotige Septenverdickung, eher asymmetrisch und klinisch onkologischer Kontext.'],
        ['Tuberkulose', 'Oft asymmetrischer Befall, Nekrosen oder Kavernen; verkäsende Granulome.'],
        ['Lymphom', 'Teilweise massive Lymphadenopathie, meist ohne typische perilymphatische Parenchymknotung.'],
      ],
      compareHeaders: ['Merkmal', 'Asbestose', 'Silikose', 'Sarkoidose'],
      compareRows: [
        ['Verteilung', 'Basal und subpleural', 'Apikal / Oberlappen', 'Ober- und Mittelfelder'],
        ['Muster', 'Retikulär', 'Zentrilobuläre Noduli', 'Perilymphatische Noduli'],
        ['Pleura', 'Pleuraplaques ± Verkalkungen', 'Meist unauffällig', 'Meist unauffällig'],
        ['Lymphknoten', 'Keine oder gering', 'Eggshell-Verkalkungen', 'Bihiläre Lymphadenopathie'],
        ['Fibrose', 'UIP-ähnlich möglich', 'Konglomeratfibrose / PMF', 'Peribronchovaskulär betont'],
      ],
    },
    takehome: {
      title: 'Take home',
      items: [
        ['Perilymphatisch denken', 'Noduli entlang von Fissuren, Pleura, Septen und bronchovaskulären Bündeln sind der zentrale HRCT-Hinweis.'],
        ['Symmetrie beachten', 'Eine symmetrische bihiläre und rechts paratracheale Lymphadenopathie ist besonders typisch.'],
        ['Scadding richtig nutzen', 'Die Stadien beschreiben Röntgenmuster und keine obligate Krankheitsprogression.'],
        ['Differentialdiagnosen prüfen', 'Tuberkulose, Silikose, Lymphom und Lymphangiosis carcinomatosa können Teilaspekte imitieren.'],
      ],
    },
    sources: {
      title: 'Quellen',
      items: [
        ['ATS Clinical Practice Guideline', 'Diagnosis and Detection of Sarcoidosis, 2020', 'https://www.atsjournals.org/doi/10.1164/rccm.202002-0251ST'],
        ['ERS Clinical Practice Guideline', 'Treatment of Sarcoidosis, 2021', 'https://publications.ersnet.org/content/erj/58/6/2004079'],
      ],
    },
  },
  en: {
    toc: 'Contents', thorax: 'Thorax', lung: 'Lung', title: 'Sarcoidosis',
    subtitle: 'Scadding stages, typical HRCT patterns and key differential diagnoses',
    badge: 'RadYar · Thorax', mark: 'Mark as read', marked: 'Read', key: 'Key point', cave: 'Important',
  },
  fa: {
    toc: 'فهرست', thorax: 'توراکس', lung: 'ریه', title: 'سارکوئیدوز',
    subtitle: 'مراحل اسکادینگ، الگوهای تیپیک HRCT و تشخیص‌های افتراقی مهم',
    badge: 'RadYar · توراکس', mark: 'علامت‌گذاری به‌عنوان خوانده‌شده', marked: 'خوانده شد', key: 'نکته', cave: 'مهم',
  },
}

function translatedCopy(lang) {
  if (lang === 'de') return CONTENT.de
  const local = CONTENT[lang] || CONTENT.en
  return { ...CONTENT.de, ...local }
}

function Table({ headers, rows }) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead><tr>{headers.map(header => <th key={header}>{header}</th>)}</tr></thead>
        <tbody>{rows.map((row, i) => <tr key={i}>{row.map((cell, j) => <td key={`${i}-${j}`}>{cell}</td>)}</tr>)}</tbody>
      </table>
    </div>
  )
}

function Section({ id, title, lead, children }) {
  const [open, setOpen] = useState(true)
  return (
    <section id={id} className={styles.section}>
      <button type="button" className={styles.sectionHeader} onClick={() => setOpen(value => !value)} aria-expanded={open}>
        <h2>{title}</h2><span>{open ? '−' : '+'}</span>
      </button>
      {open && <div className={styles.sectionBody}>{lead && <p className={styles.lead}>{lead}</p>}{children}</div>}
    </section>
  )
}

function Cards({ items }) {
  return <div className={styles.cards}>{items.map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div>
}

export default function SarkoidosePage() {
  const { lang } = useLanguage()
  const copy = translatedCopy(lang)
  const isRTL = lang === 'fa'
  const [activeId, setActiveId] = useState(copy.sections[0][0])
  const [read, setRead] = useState(false)
  const sectionIds = useMemo(() => copy.sections.map(([id]) => id), [copy.sections])
  const withLang = href => lang === 'de' ? href : `${href}${href.includes('?') ? '&' : '?'}lang=${lang}`

  useEffect(() => {
    try {
      const state = JSON.parse(localStorage.getItem('radyar_read_articles') || '{}')
      setRead((state.sarkoidose || 0) >= 1)
    } catch {}
  }, [])

  useEffect(() => {
    const observers = sectionIds.map(id => {
      const node = document.getElementById(id)
      if (!node) return null
      const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && setActiveId(id), {
        rootMargin: '-18% 0px -72% 0px', threshold: 0.01,
      })
      observer.observe(node)
      return observer
    })
    return () => observers.forEach(observer => observer?.disconnect())
  }, [sectionIds])

  const toggleRead = () => {
    const next = !read
    setRead(next)
    try {
      const state = JSON.parse(localStorage.getItem('radyar_read_articles') || '{}')
      state.sarkoidose = next ? 1 : 0
      localStorage.setItem('radyar_read_articles', JSON.stringify(state))
    } catch {}
  }

  return (
    <main className={styles.page} dir={isRTL ? 'rtl' : 'ltr'} lang={lang}>
      <header className={styles.header}>
        <nav className={styles.breadcrumb}>
          <Link href={withLang('/')}>RadYar</Link><span>›</span>
          <Link href={withLang('/lernen/thorax')}>{copy.thorax}</Link><span>›</span>
          <span>{copy.lung} · {copy.title}</span>
        </nav>
        <div className={styles.hero}>
          <div className={styles.heroText}>
            <span className={styles.badge}>{copy.badge}</span>
            <h1>{copy.title}</h1>
            <p>{copy.subtitle}</p>
            <button type="button" className={`${styles.readBtn} ${read ? styles.readBtnDone : ''}`} onClick={toggleRead}>
              {read ? `✓ ${copy.marked}` : `○ ${copy.mark}`}
            </button>
          </div>
          <div className={styles.heroStats}>
            {copy.hero.map(([value, label, text]) => <article key={label}><strong>{value}</strong><span>{label}</span><small>{text}</small></article>)}
          </div>
        </div>
      </header>

      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <div className={styles.sideTitle}>{copy.toc}</div>
          {copy.sections.map(([id, label, number]) => (
            <button key={id} type="button" className={activeId === id ? styles.sideActive : ''} onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}>
              <span>{number}</span><strong>{label}</strong>
            </button>
          ))}
        </aside>

        <div className={styles.main}>
          <Section id="grundlagen" title={copy.basics.title} lead={copy.basics.lead}>
            <Cards items={copy.basics.cards} />
            <div className={styles.callout}><strong>{copy.cave}</strong><p>{copy.basics.note}</p></div>
          </Section>

          <Section id="scadding" title={copy.scadding.title} lead={copy.scadding.lead}>
            <Table headers={copy.scadding.headers} rows={copy.scadding.rows} />
            <div className={styles.imageGrid}>
              {copy.scadding.images.map(([src, title, caption]) => (
                <figure key={src}><img src={src} alt={`${copy.title}: ${title}`} /><figcaption><strong>{title}</strong>{caption}</figcaption></figure>
              ))}
            </div>
          </Section>

          <Section id="hrct" title={copy.hrct.title} lead={copy.hrct.lead}>
            <h3 className={styles.subheading}>{copy.hrct.nodesTitle}</h3><Cards items={copy.hrct.nodes} />
            <h3 className={styles.subheading}>{copy.hrct.lungTitle}</h3><Cards items={copy.hrct.lung} />
            <div className={styles.signGrid}>
              {copy.hrct.signs.map(([src, title, caption]) => (
                <figure key={src}><img src={src} alt={title} /><figcaption><strong>{title}</strong>{caption}</figcaption></figure>
              ))}
            </div>
          </Section>

          <Section id="extrapulmonal" title={copy.extra.title} lead={copy.extra.lead}><Cards items={copy.extra.items} /></Section>

          <Section id="differentialdiagnosen" title={copy.dd.title} lead={copy.dd.lead}>
            <Table headers={copy.dd.headers} rows={copy.dd.rows} />
            <Table headers={copy.dd.compareHeaders} rows={copy.dd.compareRows} />
          </Section>

          <Section id="takehome" title={copy.takehome.title}>
            <div className={styles.takeHome}>{copy.takehome.items.map(([title, text], i) => <article key={title}><span>{String(i + 1).padStart(2, '0')}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
          </Section>

          <Section id="quellen" title={copy.sources.title}>
            <div className={styles.sources}>{copy.sources.items.map(([title, text, href]) => <a key={href} href={href} target="_blank" rel="noreferrer"><strong>{title}</strong><span>{text}</span></a>)}</div>
          </Section>
        </div>
      </div>
    </main>
  )
}
