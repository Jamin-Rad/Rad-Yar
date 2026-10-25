import styles from './content.module.css'

const LABELS = {
  de: { mriAlt: "KI-generierte MRT-ähnliche Lehrrekonstruktion eines discoiden Außenmeniskus: koronale Breitenmessung und drei sagittale Schichten; keine Patientendaten.", anatomy: 'Normaler und discoider Außenmeniskus', anatomyAlt: 'Anatomische Lehrillustration: normaler Meniskus links, discoider Außenmeniskus rechts.', anatomyNote: 'KI-generierte anatomische Lehrillustration.', open: 'Bild in voller Größe öffnen', mriNote: 'KI-generierte Lehrrekonstruktion – keine Patienten-MRT und keine diagnostische Referenz.' },
  en: { mriAlt: "AI-generated MRI-like educational reconstruction of a discoid lateral meniscus: coronal body-width measurement and three sagittal slices. Not patient data.", anatomy: 'Normal and discoid lateral meniscus', anatomyAlt: 'Anatomy teaching illustration: normal meniscus on the left, discoid lateral meniscus on the right.', anatomyNote: 'AI-generated anatomy teaching illustration.', open: 'Open full-size image', mriNote: 'AI-generated educational reconstruction – not a patient MRI or diagnostic reference.' },
  fa: { mriAlt: "بازسازی آموزشی شبیه MRI از منیسک خارجی دیسکوئید، ساخته‌شده با هوش مصنوعی: اندازه‌گیری عرض در نمای کرونال و سه برش ساژیتال؛ دادهٔ بیمار نیست.", anatomy: 'مقایسهٔ منیسک طبیعی و منیسک خارجی دیسکوئید', anatomyAlt: 'تصویر آموزشی آناتومی: منیسک طبیعی در چپ و منیسک خارجی دیسکوئید در راست.', anatomyNote: 'تصویر آموزشی آناتومی، ساخته‌شده با هوش مصنوعی.', open: 'نمایش تصویر در اندازهٔ اصلی', mriNote: 'بازسازی آموزشی با هوش مصنوعی؛ اسکن بیمار یا مرجع تشخیصی نیست.' },
}

export function DiscoidComparison({ lang }) {
  const copy = LABELS[lang] || LABELS.de
  return <figure className={styles.discoidRaster} data-discoid-comparison>
    <a href="/meniskus/discoid-anatomy-atlas-v4.png" data-no-zoom target="_blank" rel="noopener noreferrer" aria-label={copy.open}>
      <img src="/meniskus/discoid-anatomy-atlas-v4.png" width="1774" height="887" loading="lazy" lang="en" alt={copy.anatomyAlt} />
    </a>
    <figcaption>{copy.anatomyNote}</figcaption>
  </figure>
}

export function DiscoidMriSchematics({ lang = 'de' }) {
  const copy = LABELS[lang] || LABELS.de
  return <figure className={`${styles.discoidRaster} ${styles.discoidRasterMri}`} data-discoid-mri-diagrams>
    <a href="/meniskus/discoid-mri-teaching-v3.png" data-no-zoom target="_blank" rel="noopener noreferrer" aria-label={copy.open}>
      <img src="/meniskus/discoid-mri-teaching-v3.png" width="1983" height="793" loading="lazy" lang="en" alt={copy.mriAlt} />
    </a>
    <figcaption>{copy.mriNote}</figcaption>
  </figure>
}
