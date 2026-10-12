import Image from 'next/image'
import styles from './LessonHero.module.css'

// Required topic-specific schematic; explanatory text belongs in the first chapter.
// Deliberately no subtitle or children prop: this is the reference lesson header.
export default function LessonHero({ title, imageSrc, imageAlt, lang = 'de' }) {
  return <div className={styles.hero} data-lesson-hero lang={lang}>
    <h1>{title}</h1>
    <div className={styles.visual}>
      <Image src={imageSrc} alt={imageAlt} fill
        sizes="(max-width: 760px) 130px, (max-width: 1100px) 260px, 360px"
        priority data-no-zoom />
    </div>
  </div>
}
