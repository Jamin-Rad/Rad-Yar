'use client'

import LessonCaseGallery from '@/components/LessonCaseGallery'
import { useLanguage } from '@/providers/LanguageProvider'
import { CASES } from './lessonContent'
import { arvcText } from './lessonTranslations'
import styles from './page.module.css'

const examples = [
  {
    id: '39806',
    label: { de: 'Fall 1 · Cine', en: 'Case 1 · Cine', fa: 'کیس ۱ · Cine' },
    history: {
      de: '50-jähriger Mann mit bekannter ARVC nach Ablation einer ventrikulären Tachykardie im RV-Ausflusstrakt.',
      en: 'A 50-year-old man with known ARVC after ablation of ventricular tachycardia in the RV outflow tract.',
      fa: 'مرد ۵۰ ساله با ARVC شناخته‌شده پس از ابلیشن تاکی‌کاردی بطنی در مسیر خروجی بطن راست.',
    },
    findings: {
      de: ['Die freie RV-Wand zeigt im Cine regionale dyskinetische Ausbuchtungen.', 'RVEDVi 115 ml/m², RVEF 41 %.'],
      en: ['Cine shows regional dyskinetic bulges of the RV free wall.', 'RVEDVi 115 mL/m², RVEF 41%.'],
      fa: ['در Cine، برجستگی‌های موضعی دیسکینتیک در دیوارهٔ آزاد بطن راست دیده می‌شوند.', 'RVEDVi ۱۱۵ میلی‌لیتر بر مترمربع، RVEF ۴۱٪.'],
    },
    diagnosis: { de: 'Arrhythmogene rechtsventrikuläre Kardiomyopathie (ARVC).', en: 'Arrhythmogenic right ventricular cardiomyopathy (ARVC).', fa: 'کاردیومیوپاتی آریتموژنیک بطن راست (ARVC).' },
  },
  {
    id: '194915',
    label: { de: 'Fall 2 · LGE', en: 'Case 2 · LGE', fa: 'کیس ۲ · LGE' },
    history: {
      de: '30-jähriger Mann mit Palpitationen, Synkope und auffälligem EKG.',
      en: 'A 30-year-old man with palpitations, syncope and an abnormal ECG.',
      fa: 'مرد ۳۰ ساله با تپش قلب، سنکوپ و نوار قلب غیرطبیعی.',
    },
    findings: {
      de: ['Der RV ist dilatiert. Die freie Wand ist dünn und zeigt eine fokale Ausbuchtung.', 'LGE im RV und in der antero- und inferolateralen LV-Wand.', 'RVEDVi ≈ 135 ml/m², RVEF ≈ 35 %, LVEF ≈ 51 %.'],
      en: ['The RV is dilated with a thin free wall and focal bulging.', 'LGE in the RV and the anterolateral and inferolateral LV wall.', 'RVEDVi ≈ 135 mL/m², RVEF ≈ 35%, LVEF ≈ 51%.'],
      fa: ['بطن راست متسع است. دیوارهٔ آزاد آن نازک است و برجستگی موضعی دارد.', 'LGE در بطن راست و دیوارهٔ قدامی‌جانبی و تحتانی‌جانبی بطن چپ.', 'RVEDVi حدود ۱۳۵ میلی‌لیتر بر مترمربع، RVEF حدود ۳۵٪، LVEF حدود ۵۱٪.'],
    },
    diagnosis: { de: 'Biventrikuläre ACM, im Fallbericht als sehr wahrscheinlich eingestuft.', en: 'Biventricular ACM, considered highly likely in the case report.', fa: 'کاردیومیوپاتی آریتموژنیک دو بطنی، بسیار محتمل طبق گزارش کیس.' },
  },
]

export default function CaseAtlas() {
  const { lang } = useLanguage()
  const items = examples.map(example => {
    const item = CASES.find(entry => entry.id === example.id)
    const firstView = item.views[0]
    return {
      id: item.id,
      label: example.label,
      caseData: {
        variant: 'compact',
        heading: example.label,
        title: { de: 'Anamnese', en: 'Clinical history', fa: 'شرح حال' },
        description: [example.history],
        findings: example.findings[lang] || example.findings.de,
        interpretation: example.diagnosis,
        revealDiagnosis: true,
        url: item.url,
        frames: item.views.map(view => view.src),
        frameLabels: item.views.map(view => arvcText(view.label, lang)),
        initialFrame: 0,
        alt: arvcText(firstView.alt, lang),
        media: firstView.type === 'video' ? (
          <video className={styles.caseCine} controls loop playsInline preload="metadata" aria-label={arvcText(firstView.alt, lang)}>
            <source src={firstView.src} type="video/mp4"/>
          </video>
        ) : undefined,
        credit: <>{item.creator} · <a href={item.url}>Radiopaedia · rID {item.id}</a> · <a href="https://creativecommons.org/licenses/by-nc-sa/3.0/">CC BY-NC-SA 3.0</a></>,
      },
    }
  })

  return <LessonCaseGallery items={items} lang={lang} label={arvcText('MRT-Beispiele', lang)} idPrefix="acm-cases"/>
}
