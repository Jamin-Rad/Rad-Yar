'use client'

import LessonCaseGallery from '@/components/LessonCaseGallery'
import { CaseSequence } from '@/components/LessonCaseFile'
import { useLanguage } from '@/providers/LanguageProvider'
import { useState } from 'react'
import { CASES } from './lessonContent'
import { arvcText } from './lessonTranslations'
import { Tabs } from './LessonVisuals'
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

const SERIES = {
  '39806': [
    { id: 'cine', label: '4ch Cine', file: '39806-cine-4ch.mp4' },
    { id: 't1', label: 'T1' },
  ],
  '194915': [
    { id: 'psir', label: '4ch PSIR', file: '194915-lge-4ch.jpg' },
    { id: 'axial', label: 'Axial T1 Black Blood' },
    { id: 'sax', label: 'T1 Black Blood · SAX', file: '194915-t1-sax.jpg' },
  ],
}

const VIEWER_COPY = {
  de: { label: 'MRT-Sequenz auswählen', unavailable: 'Diese Sequenz ist im Lernmodul noch nicht verfügbar.', preview: 'Einzelbild. Weitere Schichten in der Studie ansehen.', study: 'Studie im Vollbild öffnen' },
  en: { label: 'Choose an MRI sequence', unavailable: 'This sequence is not yet available in the lesson.', preview: 'Single frame. Open the study for additional slices.', study: 'Open study full screen' },
  fa: { label: 'انتخاب سکانس MRI', unavailable: 'این سکانس هنوز در درس در دسترس نیست.', preview: 'تک‌تصویر. برای برش‌های بیشتر مطالعه را باز کنید.', study: 'باز کردن مطالعه در نمای تمام‌صفحه' },
}

function CaseSeries({ item, lang, studyUrl }) {
  const [selected, setSelected] = useState(0)
  const sequences = SERIES[item.id]
  const sequence = sequences[selected]
  const view = item.views.find(entry => entry.file === sequence.file)
  const copy = VIEWER_COPY[lang] || VIEWER_COPY.de
  const prefix = `acm-series-${item.id}`

  return <div className={styles.caseSeries}>
    <Tabs label={copy.label} items={sequences} selected={selected} onChange={setSelected} idPrefix={prefix}/>
    <div id={`${prefix}-panel`} role="tabpanel" aria-labelledby={`${prefix}-tab-${selected}`}>
      {view?.type === 'video' && <video key={view.src} className={styles.caseCine} controls loop playsInline preload="metadata" aria-label={arvcText(view.alt, lang)}>
        <source src={view.src} type="video/mp4"/>
      </video>}
      {view && view.type !== 'video' && <CaseSequence key={sequence.id} lang={lang} caseData={{
        frames: [view.src], initialFrame: 0, alt: arvcText(view.alt, lang), autoAspectRatio: true, compactScroll: true,
      }}/>}
      {view?.type !== 'video' && <p className={styles.seriesHint}>
        {view ? copy.preview : copy.unavailable} <a href={studyUrl} target="_blank" rel="noreferrer">{copy.study}</a>
      </p>}
    </div>
  </div>
}

export default function CaseAtlas() {
  const { lang } = useLanguage()
  const items = examples.map(example => {
    const item = CASES.find(entry => entry.id === example.id)
    const studyUrl = item.study + '?new_full_screen_viewer=true'
    return {
      id: item.id,
      label: example.label,
      caseData: {
        variant: 'compact',
        heading: example.label,
        title: { de: 'Anamnese', en: 'Clinical history', fa: 'شرح حال' },
        description: [example.history],
        findings: example.findings[lang] || example.findings.de,
        url: studyUrl,
        media: <CaseSeries item={item} lang={lang} studyUrl={studyUrl}/>,
        credit: <>{item.creator} · <a href={item.url}>Radiopaedia · rID {item.id}</a> · <a href="https://creativecommons.org/licenses/by-nc-sa/3.0/">CC BY-NC-SA 3.0</a></>,
      },
    }
  })

  return <LessonCaseGallery items={items} lang={lang} label={arvcText('MRT-Beispiele', lang)} idPrefix="acm-cases"/>
}
