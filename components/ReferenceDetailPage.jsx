'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import {
  REFERENCE_CONTENT,
  REFERENCE_COPY,
  countReferenceItems,
  tr,
} from '@/data/referenceSheets'
import styles from './ReferenceDetailPage.module.css'

export default function ReferenceDetailPage({ kind }) {
  const { lang } = useLanguage()
  const copy = REFERENCE_COPY[lang] || REFERENCE_COPY.de
  const sectionCopy = copy.sections[kind]
  const categories = REFERENCE_CONTENT[kind] || []
  const [activeId, setActiveId] = useState(categories[0]?.id || '')

  const activeCategory = useMemo(
    () => categories.find(category => category.id === activeId) || categories[0],
    [activeId, categories]
  )

  if (!sectionCopy || !activeCategory) return null

  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <div className={styles.breadcrumb}>
          <Link href="/">{copy.backHome}</Link>
          <span>/</span>
          <strong>{sectionCopy.title}</strong>
        </div>

        <header className={styles.hero}>
          <div>
            <div className={styles.kicker}>Spickzettel Radiologie</div>
            <h1>{sectionCopy.title}</h1>
            <p>{sectionCopy.desc}</p>
          </div>
          <div className={styles.heroMeta}>
            <strong>{categories.reduce((sum, category) => sum + countReferenceItems(category), 0)}</strong>
            <span>{copy.countSuffix}</span>
          </div>
        </header>

        <div className={styles.layout}>
          <aside className={styles.sidebar} aria-label={copy.chooseChapter}>
            <div className={styles.sidebarTitle}>{copy.chooseChapter}</div>
            <div className={styles.navList}>
              {categories.map(category => (
                <button
                  key={category.id}
                  type="button"
                  className={`${styles.navItem} ${category.id === activeCategory.id ? styles.navItemActive : ''}`}
                  style={{ '--cat-color': category.color }}
                  onClick={() => setActiveId(category.id)}
                >
                  <span>{tr(category.title, lang)}</span>
                  <small>{countReferenceItems(category)}</small>
                </button>
              ))}
            </div>
          </aside>

          <section className={styles.content}>
            <div className={styles.categoryHead} style={{ '--cat-color': activeCategory.color }}>
              <div>
                <span>{sectionCopy.kicker}</span>
                <h2>{tr(activeCategory.title, lang)}</h2>
                <p>{tr(activeCategory.desc, lang)}</p>
              </div>
              <strong>{countReferenceItems(activeCategory)}</strong>
            </div>

            <div className={styles.groupGrid}>
              {activeCategory.groups.map(group => (
                <article key={tr(group.title, lang)} className={styles.group}>
                  <h3>{tr(group.title, lang)}</h3>
                  <div className={styles.itemList}>
                    {group.items.map(item => (
                      <div key={item.title} className={styles.item}>
                        <strong>{item.title}</strong>
                        <p>{item.detail}</p>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
