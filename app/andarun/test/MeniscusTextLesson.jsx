import InteractiveTeachingGroups from '@/components/lesson-template/InteractiveTeachingGroups'

const L = (de, en, fa) => ({ de, en, fa })
const pick = (value, lang) => value[lang] || value.de

export const MENISCUS_TITLE = L('MRT-Diagnostik und sichere Risskriterien', 'MRI diagnosis and reliable tear criteria', 'تشخیص MRI و معیارهای قطعی پارگی')

// Educational copy adapted from the existing /msk/knie/meniskus lesson.
const GROUPS = [
  {
    id: 'protocol',
    title: L('MRT-Protokoll', 'MRI protocol', 'پروتکل MRI'),
    intro: L('Knieprotokoll in drei orthogonalen Ebenen mit T1- und flüssigkeitssensitiven Bildern. Schichten ≤3 mm sind bevorzugt; 4 mm sind nach ESSR akzeptabel.', 'Knee protocol in three orthogonal planes with T1-weighted and fluid-sensitive images. Sections ≤3 mm are preferred; ESSR accepts 4 mm.', 'پروتکل زانو در سه صفحهٔ عمود بر هم با تصاویر T1 و حساس به مایع. برش ≤۳ میلی‌متر ترجیح دارد؛ ESSR ضخامت ۴ میلی‌متر را قابل قبول می‌داند.'),
    items: [
      { id: 't1', label: L('T1-Wichtung', 'T1-weighting', 'T1'), category: L('Anatomie', 'Anatomy', 'آناتومی'), text: L('Anatomische Übersicht sowie Beurteilung von Knochenmark und Frakturlinien.', 'Anatomical overview and assessment of bone marrow and fracture lines.', 'نمای کلی آناتومیک و ارزیابی مغز استخوان و خطوط شکستگی.') },
      { id: 't2', label: L('T2-w / PD-fs', 'T2-w / PD-fs', 'T2-w / PD-fs'), category: L('Flüssigkeitssensitive Sequenzen', 'Fluid-sensitive sequences', 'سکانس‌های حساس به مایع'), text: L('Nachweis von Rissen, Knochenödemen und Kontinuitätsunterbrechungen der Bänder.', 'Detection of tears, bone marrow edema and ligament discontinuity.', 'تشخیص پارگی، ادم استخوان و قطع‌شدگی رباط‌ها.') },
    ],
    noteTitle: L('Normalbefund', 'Normal appearance', 'نمای طبیعی'),
    note: L('Normaler Meniskus ist überwiegend signalarm. Die Hörner erscheinen sagittal dreieckig, der Corpus auf peripheren Schichten als Bow-tie; die Gesamtform wird in mehreren Ebenen geprüft.', 'Normal meniscus is predominantly low signal. The horns appear triangular sagittally and the body forms a bowtie on peripheral slices; assess overall shape in multiple planes.', 'منیسک طبیعی عمدتاً کم‌سیگنال است. شاخ‌ها در ساژیتال مثلثی و تنه در برش‌های محیطی شبیه bow-tie دیده می‌شود؛ شکل کلی در چند صفحه بررسی شود.'),
  },
  {
    id: 'criteria',
    tone: 'secondary',
    title: L('MRT-Kriterien für einen Meniskusriss', 'MRI criteria for a meniscal tear', 'معیارهای MRI برای پارگی منیسک'),
    intro: L('Intrameniskales Signal allein beweist keinen Riss. Oberflächenkontakt und eindeutiger morphologischer Defekt sind ergänzende Kriterien; nicht alle Zeichen müssen gleichzeitig vorliegen.', 'Intrasubstance signal alone does not prove a tear. Surface contact and a definite morphological defect are complementary criteria; not all signs need to coexist.', 'سیگنال داخل منیسک به‌تنهایی پارگی را ثابت نمی‌کند. تماس سطحی و نقص شکلی واضح معیارهای مکمل‌اند؛ لازم نیست همهٔ علائم هم‌زمان وجود داشته باشند.'),
    items: [
      { id: 'surface', label: L('Kontakt zum Gelenkflächenrand', 'Contact with the articular surface', 'تماس با سطح مفصلی'), category: L('Oberflächenkontakt', 'Surface contact', 'تماس سطحی'), text: L('Das pathologisch erhöhte Signal erreicht die superiore oder inferiore Meniskusoberfläche.', 'The abnormal high signal reaches the superior or inferior meniscal surface.', 'سیگنال پاتولوژیک به سطح فوقانی یا تحتانی منیسک می‌رسد.') },
      { id: 'two-slice', label: L('Two-slice-touch-Regel', 'Two-slice-touch rule', 'قانون Two-slice-touch'), category: L('Reproduzierbarkeit', 'Reproducibility', 'تکرارپذیری'), text: L('Oberflächenkontakt auf mindestens zwei Bildern erhöht die Sicherheit. Einzelbildkontakt ohne bestätigenden Formdefekt bleibt inkonklusiv; ein klarer Defekt benötigt nicht zwingend zwei Kontaktbilder.', 'Surface contact on at least two images increases confidence. Single-image contact without a supporting morphological defect remains inconclusive; a clear defect does not necessarily require two contact images.', 'تماس سطحی در حداقل دو تصویر اطمینان را بالا می‌برد. تماس تک‌تصویری بدون نقص شکلی مؤید نامطمئن می‌ماند؛ نقص واضح الزاماً به دو تصویر دارای تماس نیاز ندارد.') },
      { id: 'deformity', label: L('Deformität', 'Deformity', 'دفورمیتی'), category: L('Morphologie', 'Morphology', 'مورفولوژی'), text: L('Ein eindeutiger Defekt, fehlendes Gewebe oder ein direkt verfolgbares disloziertes Fragment unterstützt einen Riss. Varianten und Voroperationen berücksichtigen.', 'A definite defect, missing tissue or a directly traceable displaced fragment supports a tear. Consider variants and prior surgery.', 'نقص واضح، فقدان بافت یا قطعهٔ جابه‌جاشدهٔ قابل پیگیری از پارگی حمایت می‌کند. واریانت‌ها و جراحی قبلی لحاظ شوند.') },
    ],
  },
]

export default function MeniscusTextLesson({ lang }) {
  return <InteractiveTeachingGroups groups={GROUPS} resolve={value => pick(value, lang)} direction={lang === 'fa' ? 'rtl' : 'ltr'} />
}
