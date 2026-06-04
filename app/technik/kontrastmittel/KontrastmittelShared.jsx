'use client'

import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import styles from './page.module.css'
import { KM_TOPICS, KM_UI, getLangValue, topicHref, topicQuizHref, withLang } from './kontrastmittelContent'

function SectionBlock({ block, lang }) {
  if (block.type === 'cards') {
    return (
      <div className={styles.cardGrid}>
        {block.items.map((item, index) => (
          <div key={index} className={styles.infoCard}>
            <h3>{getLangValue(item.title, lang)}</h3>
            <p>{getLangValue(item.text, lang)}</p>
          </div>
        ))}
      </div>
    )
  }

  if (block.type === 'table') {
    const headers = getLangValue(block.headers, lang)
    return (
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>{headers.map((header, index) => <th key={index}>{header}</th>)}</tr>
          </thead>
          <tbody>
            {block.rows.map((row, index) => {
              const cells = getLangValue(row, lang)
              return <tr key={index}>{cells.map((cell, idx) => <td key={idx}>{cell}</td>)}</tr>
            })}
          </tbody>
        </table>
      </div>
    )
  }

  if (block.type === 'note') {
    return (
      <div className={`${styles.note} ${styles[block.variant || 'info']}`}>
        <strong>{getLangValue(block.title, lang)}</strong>
        <p>{getLangValue(block.text, lang)}</p>
      </div>
    )
  }

  if (block.type === 'steps') {
    const items = getLangValue(block.items, lang)
    return (
      <div className={styles.steps}>
        {items.map((item, index) => (
          <div key={index} className={styles.stepItem}>
            <span>{index + 1}</span>
            <p>{item}</p>
          </div>
        ))}
      </div>
    )
  }

  return null
}

export function KontrastmittelLanding() {
  const { lang } = useLanguage()
  const ui = KM_UI[lang] || KM_UI.de
  const dir = ui.dir

  return (
    <div className={styles.page} dir={dir}>
      <header className={styles.header}>
        <nav className={styles.breadcrumb}>
          <Link href={withLang('/', lang)}>{ui.home}</Link>
          <span>›</span>
          <Link href={withLang('/lernen/technik', lang)}>{ui.learn}</Link>
          <span>›</span>
          <span>{ui.title}</span>
        </nav>

        <div className={styles.hero}>
          <div className={styles.heroMain}>
            <span className={styles.badge}>{ui.badge}</span>
            <h1>{ui.title}</h1>
            <p>{ui.lead}</p>
            <div className={styles.heroActions}>
              <Link href={withLang('/technik/kontrastmittel/mcq', lang)} className={styles.darkBtn}>{ui.mcq}</Link>
              <Link href={withLang('/lernen/technik', lang)} className={styles.lightBtn}>{ui.learn}</Link>
            </div>
          </div>
        </div>
      </header>

      <main className={styles.overviewWrap}>
        <div className={styles.sectionEyebrow}>{ui.choose}</div>
        <div className={styles.topicGrid}>
          {KM_TOPICS.map((topic, index) => (
            <Link key={topic.id} href={topicHref(topic, lang)} className={styles.topicCard} style={{ '--accent': topic.color }}>
              <div className={styles.topicNum}>{String(index + 1).padStart(2, '0')}</div>
              <div className={styles.topicIcon}>{topic.icon}</div>
              <div>
                <h2>{getLangValue(topic.shortTitles, lang)}</h2>
                <p>{getLangValue(topic.summary, lang)}</p>
              </div>
              <span className={styles.cardArrow}>{ui.open} →</span>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}

export function KontrastmittelTopicPage({ topic }) {
  const { lang } = useLanguage()
  const ui = KM_UI[lang] || KM_UI.de
  const dir = ui.dir
  const index = KM_TOPICS.findIndex(t => t.id === topic.id)
  const previous = index > 0 ? KM_TOPICS[index - 1] : null
  const next = index < KM_TOPICS.length - 1 ? KM_TOPICS[index + 1] : null

  return (
    <div className={styles.page} dir={dir}>
      <header className={styles.header}>
        <nav className={styles.breadcrumb}>
          <Link href={withLang('/', lang)}>{ui.home}</Link>
          <span>›</span>
          <Link href={withLang('/technik/kontrastmittel', lang)}>{ui.title}</Link>
          <span>›</span>
          <span>{getLangValue(topic.shortTitles, lang)}</span>
        </nav>

        <div className={styles.hero}>
          <div className={styles.heroMain}>
            <span className={styles.badge}>{ui.badge}</span>
            <h1>{getLangValue(topic.titles, lang)}</h1>
            <p>{getLangValue(topic.summary, lang)}</p>
            <div className={styles.heroActions}>
              <Link href={topicQuizHref(topic, lang)} className={styles.darkBtn}>{ui.mcq}</Link>
              <Link href={withLang('/technik/kontrastmittel', lang)} className={styles.lightBtn}>{ui.overview}</Link>
            </div>
          </div>
          <div className={styles.statPanel}>
            {topic.stats.map((stat, i) => (
              <div key={i} className={styles.statCard} style={{ '--accent': topic.color }}>
                <strong>{stat.value}</strong>
                <span>{getLangValue(stat.label, lang)}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      <div className={styles.contentLayout}>
        <aside className={styles.sidebar}>
          <div className={styles.sideTitle}>{ui.toc}</div>
          <nav className={styles.sideNav}>
            {topic.sections.map(section => (
              <a key={section.id} href={`#${section.id}`} className={styles.sideItem}>
                <span>{section.icon}</span>
                <span>{getLangValue(section.title, lang)}</span>
              </a>
            ))}
          </nav>
        </aside>

        <main className={styles.article}>
          {topic.sections.map(section => (
            <section key={section.id} id={section.id} className={styles.section}>
              <h2><span>{section.icon}</span>{getLangValue(section.title, lang)}</h2>
              {section.blocks.map((block, index) => <SectionBlock key={index} block={block} lang={lang} />)}
            </section>
          ))}

          <div className={styles.pageNav}>
            {previous ? <Link href={topicHref(previous, lang)} className={styles.navBtn}>← {ui.prev}</Link> : <span />}
            {next ? <Link href={topicHref(next, lang)} className={styles.navBtn}>{ui.next} →</Link> : <span />}
          </div>
        </main>
      </div>

      <Link href={topicQuizHref(topic, lang)} className={styles.mobileQuizBtn}>{ui.mcq}</Link>
    </div>
  )
}
