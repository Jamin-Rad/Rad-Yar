'use client'

import LessonCaseGallery from '@/components/LessonCaseGallery'
import { useLanguage } from '@/providers/LanguageProvider'
import { CASES } from './lessonContent'
import { arvcText } from './lessonTranslations'
import styles from './page.module.css'

const examples = [
  {
    id: '39806',
    label: { de: 'Fall 1 (ARVC)', en: 'Case 1 (ARVC)', fa: 'کیس ۱ (ARVC)' },
    history: {
      de: '50-jähriger Mann mit bekannter ARVC nach Ablation einer ventrikulären Tachykardie im RV-Ausflusstrakt.',
      en: 'A 50-year-old man with known ARVC after ablation of ventricular tachycardia in the RV outflow tract.',
      fa: 'مرد ۵۰ ساله با ARVC شناخته‌شده پس از ابلیشن تاکی‌کاردی بطنی در مسیر خروجی بطن راست.',
    },
    findings: {
      "de": [
        "Ausgeprägte Dyskinesie mit aneurysmatischen Ausbuchtungen der RV-Wand, vor allem am Apex und an der freien Wand.",
        "T1: Leichte fettige Veränderungen basal und apikal an der freien RV-Wand sowie subepikardial an der posterolateralen LV-Wand."
      ],
      "en": [
        "Marked dyskinesia with aneurysmal bulging of the RV wall, most prominent at the apex and free wall.",
        "T1-weighted images show slight fatty changes in the basal and apical RV free wall and in the subepicardial posterolateral LV wall."
      ],
      "fa": [
        "دیسکینزی واضح با برجستگی‌های آنوریسمی دیوارهٔ بطن راست، به‌ویژه در نوک و دیوارهٔ آزاد.",
        "در تصاویر T1، تغییرات چربی خفیف در قاعده و نوک دیوارهٔ آزاد بطن راست و زیر اپی‌کارد دیوارهٔ خلفی‌جانبی بطن چپ دیده می‌شود."
      ]
    },
  },
  {
    id: '194915',
    label: { de: 'Fall 2 (Biventrikuläre ACM)', en: 'Case 2 (Biventricular ACM)', fa: 'کیس ۲ (ACM دو بطنی)' },
    history: {
      de: '30-jähriger Mann mit Palpitationen, Synkope und auffälligem EKG.',
      en: 'A 30-year-old man with palpitations, syncope and an abnormal ECG.',
      fa: 'مرد ۳۰ ساله با تپش قلب، سنکوپ و نوار قلب غیرطبیعی.',
    },
    findings: {
      "de": [
        "Dilatierter RV mit dünner, gewellter Wand und fettigem Ersatz von RV-Myokard.",
        "RV-Hypokinesie mit Ausbuchtung bzw. leichter regionaler Dyskinesie der freien Wand.",
        "LGE in der RV-Wand und in der LV-Wand, besonders basal anterolateral."
      ],
      "en": [
        "The RV is dilated with a thin, corrugated wall and fatty replacement of RV myocardium.",
        "RV hypokinesia with bulging or mild regional dyskinesia of the free wall.",
        "LGE in the RV wall and in the LV wall, particularly in the basal anterolateral segment."
      ],
      "fa": [
        "بطن راست متسع است و دیواره‌ای نازک و موج‌دار با جایگزینی چربی در میوکارد دارد.",
        "هیپوکینزی بطن راست با برجستگی یا دیسکینزی موضعی خفیف دیوارهٔ آزاد.",
        "LGE در دیوارهٔ بطن راست و دیوارهٔ بطن چپ، به‌ویژه در بخش قاعده‌ای قدامی‌جانبی."
      ]
    },
  },
]

export default function CaseAtlas() {
  const { lang } = useLanguage()
  const items = examples.map(example => {
    const item = CASES.find(entry => entry.id === example.id)
    const views = item.views.filter(view => view.file !== '194915-lge-sax.jpg')
    const firstView = views[0]
    return {
      id: item.id,
      label: example.label,
      caseData: {
        variant: 'compact',
        heading: example.label,
        title: { de: 'Anamnese', en: 'Clinical history', fa: 'شرح حال' },
        description: [example.history],
        findings: example.findings[lang] || example.findings.de,
        url: item.study + '?new_full_screen_viewer=true',
        frames: views.map(view => view.src),
        frameLabels: views.map(view => arvcText(view.label, lang)),
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
