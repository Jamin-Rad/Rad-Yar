import styles from './content.module.css'

const COPY = {
  de: { open: 'Bild in voller Größe öffnen', note: 'KI-Lehrbild · keine Patienten-MRT', alt: 'MRI-ähnliche Lehrrekonstruktion und gezeichnete Darstellung' },
  en: { open: 'Open full-size image', note: 'AI teaching image · not a patient MRI', alt: 'MRI-like educational reconstruction and painted illustration' },
  fa: { open: 'نمایش تصویر در اندازهٔ اصلی', note: 'تصویر آموزشی هوش مصنوعی · MRI بیمار نیست', alt: 'بازسازی آموزشی شبیه MRI همراه با نقاشی' },
}

export default function TearSchematic({ item, lang }) {
  const copy = COPY[lang] || COPY.de
  const title = item.label[lang] || item.label.de
  const src = `/meniskus/tear-${item.id}-mri-drawing-v1.png`
  return <figure className={styles.tearSchematic} data-tear-illustration={item.id}>
    <a href={src} data-no-zoom target="_blank" rel="noopener noreferrer" aria-label={`${title} · ${copy.open}`}>
      <img src={src} width="1536" height="1024" loading="lazy" alt={`${title} · ${copy.alt}`} />
    </a>
    <figcaption>{copy.note}</figcaption>
  </figure>
}
