'use client'

import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import { REFERENCE_COPY, REFERENCE_SECTIONS } from '@/data/referenceSheets'
import styles from './ReferenceSpotlight.module.css'

export default function ReferenceSpotlight() {
  const { lang } = useLanguage()
  const copy = REFERENCE_COPY[lang] || REFERENCE_COPY.de

  return (
    <div className={styles.wrap}>
      <div className={styles.head}>
        <div>
          <div className={styles.label}>{copy.homeLabel}</div>
          <h3 className={styles.title}>{copy.homeTitle}</h3>
          <p className={styles.faTitle} dir="rtl">{copy.homeTitleFa}</p>
        </div>
        <p className={styles.desc}>{copy.homeDesc}</p>
      </div>

      <div className={styles.cards}>
        {REFERENCE_SECTIONS.map(section => {
          const sectionCopy = copy.sections[section.id]
          return (
            <Link
              key={section.id}
              href={section.href}
              className={styles.card}
              style={{ '--ref-color': section.color }}
            >
              <span className={styles.icon} aria-hidden="true">{section.icon}</span>
              <span className={styles.cardBody}>
                <strong>{sectionCopy.title}</strong>
                <small>{sectionCopy.kicker}</small>
                <span className={styles.preview}>
                  {(section.preview[lang] || section.preview.de).map(item => (
                    <em key={item}>{item}</em>
                  ))}
                </span>
              </span>
              <span className={styles.open}>{copy.open}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
