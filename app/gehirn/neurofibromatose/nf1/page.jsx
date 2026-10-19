'use client'

import Image from 'next/image'
import { useLanguage } from '@/providers/LanguageProvider'
import LessonReferenceShell from '@/components/LessonReferenceShell'
import { GEHIRN_NF1_CNS_LESSON as lesson } from '@/data/gehirnNf1CnsLesson'

const pick = (value, lang) => value?.[lang] || value?.de || ''
const imageSizes = {
  '/educational/nf1/fasi-case-44916.png': [578, 719],
  '/educational/nf1/optic-pathway-glioma-case-7683.png': [544, 789],
  '/educational/nf1/plexiform-neurofibroma-example.png': [928, 916],
}

function SourceFigure({ image, lang }) {
  const [width, height] = imageSizes[image.src]
  return <figure style={{ margin: '18px 0 24px', padding: 12, border: '1px solid var(--border)', borderRadius: 16, background: 'var(--bg-card)' }}>
    <Image src={image.src} width={width} height={height} alt={pick(image.alt, lang)} sizes="(max-width: 700px) 90vw, 420px" style={{ display: 'block', width: 'auto', maxWidth: '100%', maxHeight: 460, height: 'auto', margin: '0 auto', objectFit: 'contain' }} />
    <figcaption style={{ marginTop: 10, color: 'var(--text-muted)', fontSize: 12, lineHeight: 1.6 }}>{pick(image.caption, lang)} <a href={image.href} target="_blank" rel="noreferrer">Radiopaedia ↗</a></figcaption>
  </figure>
}

export default function Nf1LessonPage() {
  const { lang } = useLanguage()
  const langPath = lang === 'de' ? '' : `&lang=${lang}`
  const quizHref = `/ueben/quiz?fach=gehirn&n=10&themen=neurofibromatose-typ1${langPath}`
  return <LessonReferenceShell
    lang={lang}
    lessonId="neurofibromatose-typ1"
    title={lesson.title}
    diagram="nf1"
    goals={lesson.goals}
    check={lesson.assessment}
    summary={lesson.summary}
    quizHref={quizHref}
  >
    {lesson.chapters.map((chapter, index) => <section key={chapter.id} aria-labelledby={`nf1-${chapter.id}`} style={{ marginBottom: 26 }}>
      <h3 id={`nf1-${chapter.id}`} style={{ margin: '0 0 10px', color: 'var(--text-strong)' }}>{chapter.title[lang]}</h3>
      <p style={{ lineHeight: 1.75 }}>{chapter.text[lang]}</p>
      {chapter.image && <SourceFigure image={chapter.image} lang={lang} />}
      {chapter.note && <aside role="note" style={{ borderInlineStart: '4px solid #3b8798', padding: '10px 14px', marginBlock: 14, background: 'var(--surface-soft)' }}><strong>{lang === 'fa' ? 'نکته' : lang === 'en' ? 'Note' : 'Hinweis'}: </strong>{chapter.note[lang]}</aside>}
      {chapter.caveat && <aside role="note" style={{ borderInlineStart: '4px solid #d97706', padding: '10px 14px', marginBlock: 14, background: 'var(--surface-soft)' }}><strong>{lang === 'fa' ? 'محدودیت' : lang === 'en' ? 'Limit' : 'Grenze'}: </strong>{chapter.caveat[lang]}</aside>}
    </section>)}
  </LessonReferenceShell>
}
