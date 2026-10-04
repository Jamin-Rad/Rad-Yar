'use client'

import Link from 'next/link'
import { useRef, useState } from 'react'
import styles from './teaching-text.module.css'

const L = (de, en, fa) => ({ de, en, fa })
const pick = (value, lang) => value[lang] || value.de

export const MENISCUS_TITLE = L('MRT-Diagnostik und sichere Risskriterien', 'MRI diagnosis and reliable tear criteria', 'تشخیص MRI و معیارهای قطعی پارگی')

// Educational copy adapted from the existing /msk/knie/meniskus lesson.
const GROUPS = [
  {
    id: 'protocol',
    title: L('MRT-Protokoll', 'MRI protocol', 'پروتکل MRI'),
    intro: L('Die MRT-Diagnostik des Meniskus basiert auf einem dünnschichtigen Knieprotokoll und flüssigkeitssensitiven Sequenzen.', 'MRI assessment of the meniscus relies on a thin-slice knee protocol and fluid-sensitive sequences.', 'ارزیابی MRI منیسک بر اساس پروتکل زانو با برش‌های نازک و سکانس‌های حساس به مایع انجام می‌شود.'),
    items: [
      { id: 't1', label: L('T1-Wichtung', 'T1-weighting', 'T1'), category: L('Anatomie', 'Anatomy', 'آناتومی'), text: L('Anatomische Übersicht und Beurteilung chronischer Fibrose.', 'Anatomical overview and assessment of chronic fibrosis.', 'نمای کلی آناتومیک و ارزیابی فیبروز مزمن.') },
      { id: 't2', label: L('T2-w / PD-fs', 'T2-w / PD-fs', 'T2-w / PD-fs'), category: L('Flüssigkeitssensitive Sequenzen', 'Fluid-sensitive sequences', 'سکانس‌های حساس به مایع'), text: L('Nachweis von Rissen, Knochenödemen und Kontinuitätsunterbrechungen der Bänder.', 'Detection of tears, bone marrow edema and ligament discontinuity.', 'تشخیص پارگی، ادم استخوان و قطع‌شدگی رباط‌ها.') },
      { id: 'thickness', label: L('Schnittdicke', 'Slice thickness', 'ضخامت برش'), category: L('Räumliche Auflösung', 'Spatial resolution', 'تفکیک مکانی'), text: L('Standardmäßig 3 mm, damit kleine Risse nicht durch Volumenmitteleffekt übersehen werden.', 'Usually 3 mm so that small tears are not hidden by volume averaging.', 'به طور استاندارد ۳ میلی‌متر، تا پارگی‌های کوچک به علت Volume Averaging پنهان نشوند.') },
    ],
    noteTitle: L('Normalbefund', 'Normal appearance', 'نمای طبیعی'),
    note: L('Der gesunde Meniskus stellt sich homogen hypointens dar. In der sagittalen Ansicht besitzt er eine typische dreieckige Struktur.', 'A healthy meniscus is homogeneously hypointense. On sagittal images it has a typical triangular configuration.', 'منیسک سالم به صورت هموژن هیپواینتنس دیده می‌شود. در نمای ساژیتال شکل مثلثی تیپیک دارد.'),
  },
  {
    id: 'criteria',
    title: L('MRT-Kriterien für einen Meniskusriss', 'MRI criteria for a meniscal tear', 'معیارهای MRI برای پارگی منیسک'),
    intro: L('Ein reiner intrameniskaler Signalanstieg reicht nicht aus, um einen Meniskusriss sicher zu diagnostizieren.', 'Intrameniscal signal increase alone is not sufficient to confidently diagnose a meniscal tear.', 'افزایش سیگنال داخل منیسک به تنهایی برای تشخیص قطعی پارگی کافی نیست.'),
    items: [
      { id: 'surface', label: L('Kontakt zum Gelenkflächenrand', 'Contact with the articular surface', 'تماس با سطح مفصلی'), category: L('Oberflächenkontakt', 'Surface contact', 'تماس سطحی'), text: L('Das pathologisch erhöhte Signal erreicht die superiore oder inferiore Meniskusoberfläche.', 'The abnormal high signal reaches the superior or inferior meniscal surface.', 'سیگنال پاتولوژیک به سطح فوقانی یا تحتانی منیسک می‌رسد.') },
      { id: 'two-slice', label: L('Two-slice-touch-Regel', 'Two-slice-touch rule', 'قانون Two-slice-touch'), category: L('Reproduzierbarkeit', 'Reproducibility', 'تکرارپذیری'), text: L('Die Läsion ist auf mindestens zwei aufeinanderfolgenden Schichten mit Oberflächenkontakt erkennbar.', 'The lesion is visible with surface contact on at least two consecutive slices.', 'ضایعه باید حداقل در دو برش متوالی با تماس سطحی دیده شود.') },
      { id: 'deformity', label: L('Deformität', 'Deformity', 'دفورمیتی'), category: L('Morphologie', 'Morphology', 'مورفولوژی'), text: L('Die normale dreieckige Meniskuskonfiguration ist verloren oder deutlich verändert.', 'The normal triangular configuration is lost or clearly altered.', 'شکل مثلثی طبیعی منیسک از بین رفته یا واضحاً تغییر کرده است.') },
    ],
  },
]

function TeachingTextGroup({ group, index, lang }) {
  const [selected, setSelected] = useState(0)
  const tabRefs = useRef([])
  const prefix = `meniscus-${group.id}`
  const direction = lang === 'fa' ? 'rtl' : 'ltr'

  const handleKeyDown = (event, current) => {
    let next
    if (event.key === 'ArrowDown') next = (current + 1) % group.items.length
    else if (event.key === 'ArrowUp') next = (current - 1 + group.items.length) % group.items.length
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = group.items.length - 1
    else return
    event.preventDefault()
    setSelected(next)
    tabRefs.current[next]?.focus()
  }

  return <section className={styles.group} aria-labelledby={`${prefix}-heading`}>
    <header className={styles.groupHeader}>
      <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
      <h3 id={`${prefix}-heading`}>{pick(group.title, lang)}</h3>
    </header>
    <p className={styles.intro}>{pick(group.intro, lang)}</p>
    <div className={styles.explorer} dir="ltr">
      <div className={styles.tabs} role="tablist" aria-orientation="vertical" aria-label={pick(group.title, lang)} dir={direction}>
        {group.items.map((item, itemIndex) => <button
          key={item.id}
          ref={node => { tabRefs.current[itemIndex] = node }}
          type="button"
          role="tab"
          id={`${prefix}-${item.id}-tab`}
          aria-controls={`${prefix}-${item.id}-panel`}
          aria-selected={selected === itemIndex}
          tabIndex={selected === itemIndex ? 0 : -1}
          onClick={() => setSelected(itemIndex)}
          onKeyDown={event => handleKeyDown(event, itemIndex)}
        ><span>{pick(item.label, lang)}</span><i aria-hidden="true">→</i></button>)}
      </div>
      <div className={styles.panels} dir={direction}>
        {group.items.map((item, itemIndex) => <div
          key={item.id}
          className={styles.panel}
          id={`${prefix}-${item.id}-panel`}
          role="tabpanel"
          aria-labelledby={`${prefix}-${item.id}-tab`}
          tabIndex={0}
          hidden={selected !== itemIndex}
        >
          <span className={styles.category}>{pick(item.category, lang)}</span>
          <h4>{pick(item.label, lang)}</h4>
          <p>{pick(item.text, lang)}</p>
        </div>)}
      </div>
    </div>
    {group.note ? <p className={styles.note}><strong>{pick(group.noteTitle, lang)}</strong>{pick(group.note, lang)}</p> : null}
  </section>
}

export default function MeniscusTextLesson({ lang }) {
  return <div className={styles.lesson}>
    <div className={styles.example}>
      <span>{pick(L('TEXTBEISPIEL · MSK / KNIE', 'TEXT EXAMPLE · MSK / KNEE', 'نمونه متن آموزشی · عضلانی‌اسکلتی / زانو'), lang)}</span>
      <Link href="/msk/knie/meniskus#mrt">{pick(L('Zur Meniskus-Lektion', 'Meniscus lesson', 'درس منیسک'), lang)} <span aria-hidden="true">↗</span></Link>
    </div>
    {GROUPS.map((group, index) => <TeachingTextGroup key={group.id} group={group} index={index} lang={lang} />)}
  </div>
}
