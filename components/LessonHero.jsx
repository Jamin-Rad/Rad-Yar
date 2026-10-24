"use client"

import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { LESSON_DESIGN_HEROES } from '@/data/lessonDesignHeroes'
import styles from './LessonHero.module.css'

export default function LessonHero({ title, imageSrc, imageAlt, imageClassName, titleClassName, visual, visualCaption, lang = 'de', lessonId }) {
  const pathname = usePathname()
  const designedImage = LESSON_DESIGN_HEROES[pathname]
  const source = designedImage || imageSrc
  const raster = Boolean(source && !source.endsWith('.svg'))
  return <div className={styles.hero} data-lesson-hero data-hero-topic={lessonId || pathname} lang={lang}>
    <h1 className={titleClassName}>{title}</h1>
    <figure className={styles.visual}>
      {raster ? <Image src={source} alt={designedImage && designedImage !== imageSrc ? (lang === 'fa' ? `تصویر مفهومی ${title}` : lang === 'en' ? `Concept illustration: ${title}` : `Schematische Illustration: ${title}`) : (imageAlt || title)} className={imageClassName} fill sizes="(max-width: 760px) 160px, (max-width: 1100px) 365px, 525px" priority data-designed-illustration={source?.startsWith('/educational/lesson-design/') ? 'true' : undefined} data-no-zoom /> : (visual || (source ? <Image src={source} alt={imageAlt || title} fill sizes="(max-width: 760px) 160px, 525px" priority data-designed-illustration={source?.startsWith('/educational/lesson-design/') ? 'true' : undefined} data-no-zoom /> : null))}
      {!raster && visualCaption ? <figcaption className={styles.visualCaption}>{visualCaption}</figcaption> : null}
    </figure>
  </div>
}
