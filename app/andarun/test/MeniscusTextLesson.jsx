import InteractiveTeachingGroups from '@/components/lesson-template/InteractiveTeachingGroups'

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
    tone: 'secondary',
    title: L('MRT-Kriterien für einen Meniskusriss', 'MRI criteria for a meniscal tear', 'معیارهای MRI برای پارگی منیسک'),
    intro: L('Ein reiner intrameniskaler Signalanstieg reicht nicht aus, um einen Meniskusriss sicher zu diagnostizieren.', 'Intrameniscal signal increase alone is not sufficient to confidently diagnose a meniscal tear.', 'افزایش سیگنال داخل منیسک به تنهایی برای تشخیص قطعی پارگی کافی نیست.'),
    items: [
      { id: 'surface', label: L('Kontakt zum Gelenkflächenrand', 'Contact with the articular surface', 'تماس با سطح مفصلی'), category: L('Oberflächenkontakt', 'Surface contact', 'تماس سطحی'), text: L('Das pathologisch erhöhte Signal erreicht die superiore oder inferiore Meniskusoberfläche.', 'The abnormal high signal reaches the superior or inferior meniscal surface.', 'سیگنال پاتولوژیک به سطح فوقانی یا تحتانی منیسک می‌رسد.') },
      { id: 'two-slice', label: L('Two-slice-touch-Regel', 'Two-slice-touch rule', 'قانون Two-slice-touch'), category: L('Reproduzierbarkeit', 'Reproducibility', 'تکرارپذیری'), text: L('Die Läsion ist auf mindestens zwei aufeinanderfolgenden Schichten mit Oberflächenkontakt erkennbar.', 'The lesion is visible with surface contact on at least two consecutive slices.', 'ضایعه باید حداقل در دو برش متوالی با تماس سطحی دیده شود.') },
      { id: 'deformity', label: L('Deformität', 'Deformity', 'دفورمیتی'), category: L('Morphologie', 'Morphology', 'مورفولوژی'), text: L('Die normale dreieckige Meniskuskonfiguration ist verloren oder deutlich verändert.', 'The normal triangular configuration is lost or clearly altered.', 'شکل مثلثی طبیعی منیسک از بین رفته یا واضحاً تغییر کرده است.') },
    ],
  },
]

export default function MeniscusTextLesson({ lang }) {
  return <InteractiveTeachingGroups groups={GROUPS} resolve={value => pick(value, lang)} direction={lang === 'fa' ? 'rtl' : 'ltr'} />
}
