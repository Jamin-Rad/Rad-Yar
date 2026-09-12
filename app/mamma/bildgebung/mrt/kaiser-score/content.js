export const pick = (value, lang) => typeof value === 'string' ? value : value?.[lang] || value?.de || ''

export const COPY = {
  title: { de: 'Kaiser Score', en: 'Kaiser Score', fa: 'Kaiser Score' },
  subtitle: {
    de: 'Der Entscheidungsbaum, der Morphologie und Kinetik in drei Schritten zu einer nachvollziehbaren MRT-Einschätzung verbindet.',
    en: 'A decision tree that combines morphology and kinetics into a traceable MRI assessment in three steps.',
    fa: 'درخت تصمیمی که مورفولوژی و کینتیک را در سه گام به یک ارزیابی قابل‌پیگیری در MRI تبدیل می‌کند.',
  },
  contents: { de: 'Inhaltsverzeichnis', en: 'Contents', fa: 'فهرست مطالب' },
  mamma: { de: 'Mamma', en: 'Breast', fa: 'پستان' },
  imaging: { de: 'Bildgebung', en: 'Imaging', fa: 'تصویربرداری' },
  breastMri: { de: 'Mamma-MRT', en: 'Breast MRI', fa: 'MRI پستان' },
  calculator: { de: 'Klinischen Rechner öffnen', en: 'Open clinical calculator', fa: 'باز کردن محاسبه‌گر بالینی' },
  flashcards: { de: 'Flashcards', en: 'Flashcards', fa: 'فلش‌کارت‌ها' },
  sourceNote: { de: 'Evidenzbasierte Entscheidungshilfe', en: 'Evidence-based decision aid', fa: 'ابزار تصمیم‌یار مبتنی بر شواهد' },
  synthetic: { de: 'Synthetische Lehrdarstellung – keine Patientendaten', en: 'Synthetic teaching image — no patient data', fa: 'تصویر آموزشی مصنوعی — بدون اطلاعات بیمار' },
  zoom: { de: 'Vergrößern', en: 'Enlarge', fa: 'بزرگ‌نمایی' },
}

export const SECTIONS = [
  { id: 'orientierung', icon: 'compass', label: { de: 'Was der Score leistet', en: 'What the score does', fa: 'کاربرد امتیاز' } },
  { id: 'merkmale', icon: 'features', label: { de: 'Die fünf Merkmale', en: 'The five features', fa: 'پنج ویژگی' } },
  { id: 'trainer', icon: 'path', label: { de: 'Interaktiver Entscheidungsweg', en: 'Interactive decision path', fa: 'مسیر تصمیم تعاملی' } },
  { id: 'interpretation', icon: 'gauge', label: { de: 'Score & BI-RADS', en: 'Score & BI-RADS', fa: 'امتیاز و BI-RADS' } },
  { id: 'faelle', icon: 'cases', label: { de: 'Lernfälle', en: 'Learning cases', fa: 'کیس‌های آموزشی' } },
  { id: 'fallstricke', icon: 'shield', label: { de: 'Fallstricke & Merksätze', en: 'Pitfalls & takeaways', fa: 'دام‌ها و نکات کلیدی' } },
]

export const FEATURES = [
  {
    id: 'root', number: '01', accent: 'berry',
    title: { de: 'Root Sign', en: 'Root sign', fa: 'Root sign' },
    short: { de: 'Mindestens eine sichere Spikula?', en: 'At least one definite spicule?', fa: 'حداقل یک اسپیکول قطعی وجود دارد؟' },
    text: {
      de: 'Eine einzelne eindeutige, wurzelartige Ausziehung genügt. Sie wird als eigene erste Verzweigung geprüft – auch wenn der übrige Rand umschrieben wirkt.',
      en: 'One definite root-like extension is enough. It is assessed at the first branch even when the remainder of the margin appears circumscribed.',
      fa: 'وجود یک زائدهٔ ریشه‌مانند و قطعی کافی است. این ویژگی در نخستین شاخه بررسی می‌شود، حتی اگر بقیهٔ حاشیه Circumscribed به نظر برسد.',
    },
    tip: { de: 'Im Zweifel nicht positiv werten: Artefakte sind keine Spikula.', en: 'If uncertain, do not call it positive: artefact is not a spicule.', fa: 'در صورت تردید، آن را مثبت حساب نکنید؛ آرتیفکت اسپیکول نیست.' },
  },
  {
    id: 'curve', number: '02', accent: 'teal',
    title: { de: 'Kurventyp', en: 'Curve type', fa: 'نوع منحنی' },
    short: { de: 'Persistierend, Plateau oder Wash-out?', en: 'Persistent, plateau or wash-out?', fa: 'Persistent، Plateau یا Wash-out؟' },
    text: {
      de: 'Entscheidend ist die Veränderung zwischen frühem beziehungsweise maximalem und spätem Enhancement. Der suspekteste sicher erkennbare Kurvenanteil zählt.',
      en: 'The change between early or peak and delayed enhancement is decisive. Use the most suspicious curve component that is definitely present.',
      fa: 'تغییر سیگنال بین فاز زودرس یا اوج و فاز تأخیری تعیین‌کننده است. مشکوک‌ترین بخش منحنی که به‌طور قطعی دیده می‌شود ملاک است.',
    },
    tip: { de: 'Kinetik nie isoliert diagnostisch verwenden.', en: 'Never use kinetics as a standalone diagnosis.', fa: 'هرگز کینتیک را به‌تنهایی معیار تشخیص قرار ندهید.' },
  },
  {
    id: 'margin', number: '03', accent: 'green',
    title: { de: 'Rand', en: 'Margin', fa: 'حاشیه' },
    short: { de: 'Umschrieben oder nicht umschrieben?', en: 'Circumscribed or non-circumscribed?', fa: 'Circumscribed یا Non-circumscribed؟' },
    text: {
      de: 'Wenn kein Root Sign vorliegt, wird der Rand als umschrieben oder irregulär/nicht umschrieben dichotomisiert. Das Prinzip gilt auch für NME.',
      en: 'When the root sign is absent, the margin is dichotomised as circumscribed or irregular/non-circumscribed. The principle also applies to NME.',
      fa: 'وقتی Root sign وجود ندارد، حاشیه به دو گروه Circumscribed یا Irregular/Non-circumscribed تقسیم می‌شود. این اصل برای NME نیز کاربرد دارد.',
    },
    tip: { de: 'Immer das suspekteste eindeutig vorhandene Randmerkmal wählen.', en: 'Always choose the most suspicious definite margin feature.', fa: 'همیشه مشکوک‌ترین ویژگی قطعی حاشیه را انتخاب کنید.' },
  },
  {
    id: 'enhancement', number: '04', accent: 'gold',
    title: { de: 'Internes Enhancement', en: 'Internal enhancement', fa: 'Enhancement داخلی' },
    short: { de: 'Homogen oder suspekt heterogen?', en: 'Homogeneous or suspiciously heterogeneous?', fa: 'Homogeneous یا Heterogeneous مشکوک؟' },
    text: {
      de: 'Homogenes Enhancement ist die nicht suspekte Kategorie. Heterogen, kräftig randständig und clustered-ring werden für den Baum als suspekt zusammengefasst.',
      en: 'Homogeneous enhancement is the non-suspicious category. Heterogeneous, marked rim and clustered-ring enhancement are grouped as suspicious.',
      fa: 'Enhancement همگن در گروه غیرمشکوک است. الگوهای Heterogeneous، Rim واضح و Clustered-ring در درخت به‌عنوان مشکوک گروه‌بندی می‌شوند.',
    },
    tip: { de: 'Dünner, glatter Rim kann entzündlich sein – Kontext prüfen.', en: 'A thin smooth rim may be inflammatory — check the context.', fa: 'Rim نازک و صاف ممکن است التهابی باشد؛ زمینه را بررسی کنید.' },
  },
  {
    id: 'edema', number: '05', accent: 'cyan',
    title: { de: 'Perifokales Ödem', en: 'Perifocal oedema', fa: 'ادم Perifocal' },
    short: { de: 'Suspektes T2/STIR-Signal vorhanden?', en: 'Suspicious T2/STIR signal present?', fa: 'سیگنال مشکوک در T2/STIR وجود دارد؟' },
    text: {
      de: 'Perifokales oder diffuses ipsilaterales Ödem gilt als positiv. Diffuses bilaterales Ödem wird im Kaiser-Baum nicht als suspektes Ödem gewertet.',
      en: 'Perifocal or diffuse ipsilateral oedema is positive. Diffuse bilateral oedema is not counted as suspicious oedema in the Kaiser tree.',
      fa: 'ادم Perifocal یا منتشر یک‌طرفه مثبت است. ادم منتشر دوطرفه در درخت Kaiser به‌عنوان ادم مشکوک محسوب نمی‌شود.',
    },
    tip: { de: 'T2/STIR und klinischen Kontext gemeinsam beurteilen.', en: 'Interpret T2/STIR together with the clinical context.', fa: 'T2/STIR را همراه با زمینه بالینی تفسیر کنید.' },
  },
]

export const UI = {
  de: {
    trainerEyebrow: 'Drei Entscheidungen · ein nachvollziehbarer Pfad', trainerTitle: 'Baue den Score selbst auf', trainerIntro: 'Beginne mit dem Root Sign. Der Baum zeigt nur das Merkmal, das auf deinem Pfad wirklich noch gebraucht wird.',
    reset: 'Neu starten', back: 'Einen Schritt zurück', choose: 'Wähle eine Antwort', step: 'Schritt', of: 'von 3', path: 'Dein Pfad', result: 'Ergebnis', openCalculator: 'Mit dem klinischen Rechner prüfen',
    questions: {
      root: ['Root Sign vorhanden?', 'Bereits eine einzelne sichere Spikula zählt.'],
      curve: ['Welcher Kurventyp liegt vor?', 'Beurteile den suspektesten sicher erkennbaren Kurvenanteil.'],
      margin: ['Wie ist der Rand?', 'Diese Abfrage erscheint nur, wenn kein Root Sign vorliegt.'],
      enhancement: ['Wie ist das interne Enhancement?', 'Diese Abfrage entscheidet den Wash-out-Pfad ohne Root Sign.'],
      edema: ['Ist perifokales Ödem vorhanden?', 'Diese Abfrage differenziert den Plateau-/Wash-out-Pfad mit Root Sign.'],
    },
    options: {
      no: ['Nein', 'keine sichere Spikula'], yes: ['Ja', 'mindestens eine sichere Spikula'],
      persistent: ['Persistierend', 'Signal steigt weiter'], plateau: ['Plateau', 'Signal bleibt annähernd stabil'], washout: ['Wash-out', 'Signal fällt in der Spätphase'],
      circumscribed: ['Umschrieben', 'scharf begrenzt'], irregular: ['Irregulär', 'nicht umschrieben'],
      homogeneous: ['Homogen', 'gleichmäßige Aufnahme'], heterogeneous: ['Heterogen / Rim', 'inkl. clustered-ring'],
      absent: ['Nicht vorhanden', 'kein suspektes Ödem'], present: ['Vorhanden', 'perifokal oder ipsilateral diffus'],
    },
    labels: { root: 'Root Sign', curve: 'Kurve', margin: 'Rand', enhancement: 'Enhancement', edema: 'Ödem' },
    risks: {
      low: ['niedriger Bereich', 'BI-RADS 2/3', 'Im Kaiser-Modell unterhalb der Biopsieschwelle. Klinischen Kontext und Voraufnahmen trotzdem berücksichtigen.'],
      intermediate: ['intermediärer Bereich', 'BI-RADS 4', 'Histologische Abklärung ist im Kaiser-Modell ab Score 5 vorgesehen.'],
      high: ['hoher Bereich', 'BI-RADS 5', 'Hohe Malignitätswahrscheinlichkeit; bei benignem Biopsieergebnis Radiologie-Pathologie-Konkordanz besonders kritisch prüfen.'],
    },
    presets: 'Geführte Beispiele', load: 'Pfad laden',
  },
  en: {
    trainerEyebrow: 'Three decisions · one traceable path', trainerTitle: 'Build the score yourself', trainerIntro: 'Start with the root sign. The tree reveals only the feature still required on your path.',
    reset: 'Start over', back: 'One step back', choose: 'Choose an answer', step: 'Step', of: 'of 3', path: 'Your path', result: 'Result', openCalculator: 'Check in the clinical calculator',
    questions: {
      root: ['Is the root sign present?', 'A single definite spicule is sufficient.'],
      curve: ['Which curve type is present?', 'Assess the most suspicious curve component definitely present.'],
      margin: ['What is the margin?', 'This question appears only when the root sign is absent.'],
      enhancement: ['What is the internal enhancement?', 'This question determines the wash-out path without a root sign.'],
      edema: ['Is perifocal oedema present?', 'This question differentiates plateau/wash-out paths with a root sign.'],
    },
    options: {
      no: ['No', 'no definite spicule'], yes: ['Yes', 'at least one definite spicule'],
      persistent: ['Persistent', 'signal continues to rise'], plateau: ['Plateau', 'signal remains near-stable'], washout: ['Wash-out', 'signal falls on delayed imaging'],
      circumscribed: ['Circumscribed', 'sharply defined'], irregular: ['Irregular', 'non-circumscribed'],
      homogeneous: ['Homogeneous', 'uniform enhancement'], heterogeneous: ['Heterogeneous / rim', 'including clustered-ring'],
      absent: ['Absent', 'no suspicious oedema'], present: ['Present', 'perifocal or diffuse ipsilateral'],
    },
    labels: { root: 'Root sign', curve: 'Curve', margin: 'Margin', enhancement: 'Enhancement', edema: 'Oedema' },
    risks: {
      low: ['low range', 'BI-RADS 2/3', 'Below the biopsy threshold in the Kaiser model. Clinical context and priors still matter.'],
      intermediate: ['intermediate range', 'BI-RADS 4', 'Histological verification is intended from score 5 in the Kaiser model.'],
      high: ['high range', 'BI-RADS 5', 'High likelihood of malignancy; scrutinise radiology–pathology concordance if biopsy is benign.'],
    },
    presets: 'Guided examples', load: 'Load path',
  },
  fa: {
    trainerEyebrow: 'سه تصمیم · یک مسیر قابل‌پیگیری', trainerTitle: 'خودتان امتیاز را بسازید', trainerIntro: 'از Root sign شروع کنید. درخت فقط ویژگی‌ای را نشان می‌دهد که در مسیر شما واقعاً لازم است.',
    reset: 'شروع دوباره', back: 'یک گام عقب', choose: 'یک پاسخ انتخاب کنید', step: 'گام', of: 'از ۳', path: 'مسیر شما', result: 'نتیجه', openCalculator: 'بررسی با محاسبه‌گر بالینی',
    questions: {
      root: ['آیا Root sign وجود دارد؟', 'وجود یک اسپیکول قطعی کافی است.'],
      curve: ['نوع منحنی چیست؟', 'مشکوک‌ترین بخش قطعی منحنی را ارزیابی کنید.'],
      margin: ['حاشیه چگونه است؟', 'این پرسش فقط در نبود Root sign ظاهر می‌شود.'],
      enhancement: ['Enhancement داخلی چگونه است؟', 'این پرسش مسیر Wash-out بدون Root sign را تعیین می‌کند.'],
      edema: ['آیا ادم Perifocal وجود دارد؟', 'این پرسش مسیر Plateau/Wash-out همراه Root sign را تفکیک می‌کند.'],
    },
    options: {
      no: ['خیر', 'اسپیکول قطعی ندارد'], yes: ['بله', 'حداقل یک اسپیکول قطعی'],
      persistent: ['Persistent', 'سیگنال همچنان افزایش می‌یابد'], plateau: ['Plateau', 'سیگنال تقریباً ثابت می‌ماند'], washout: ['Wash-out', 'سیگنال در فاز تأخیری کاهش می‌یابد'],
      circumscribed: ['Circumscribed', 'حاشیه واضح'], irregular: ['Irregular', 'حاشیه غیرمحدود'],
      homogeneous: ['Homogeneous', 'جذب یکنواخت'], heterogeneous: ['Heterogeneous / Rim', 'شامل Clustered-ring'],
      absent: ['وجود ندارد', 'ادم مشکوک دیده نمی‌شود'], present: ['وجود دارد', 'Perifocal یا منتشر یک‌طرفه'],
    },
    labels: { root: 'Root sign', curve: 'منحنی', margin: 'حاشیه', enhancement: 'Enhancement', edema: 'ادم' },
    risks: {
      low: ['محدوده کم‌خطر', 'BI-RADS 2/3', 'در مدل Kaiser پایین‌تر از آستانه بیوپسی است؛ با این حال زمینه بالینی و تصاویر قبلی باید لحاظ شوند.'],
      intermediate: ['محدوده میانی', 'BI-RADS 4', 'در مدل Kaiser از امتیاز ۵ به بالا بررسی بافت‌شناسی توصیه می‌شود.'],
      high: ['محدوده پرخطر', 'BI-RADS 5', 'احتمال بدخیمی بالاست؛ در صورت بیوپسی خوش‌خیم، تطابق رادیولوژی–پاتولوژی باید با دقت بررسی شود.'],
    },
    presets: 'مثال‌های هدایت‌شده', load: 'بارگذاری مسیر',
  },
}

export const PRESETS = [
  {
    id: 'fibro', score: 1, answers: { root: 'no', curve: 'persistent', margin: 'circumscribed' },
    title: { de: 'Umschriebene persistierende Mass', en: 'Circumscribed persistent mass', fa: 'Mass با حاشیه واضح و منحنی Persistent' },
    note: { de: 'Typischer niedrig-riskanter Pfad; zum Beispiel bei passender Morphologie eines Fibroadenoms.', en: 'A typical low-risk path, for example with fibroadenoma-like morphology.', fa: 'یک مسیر تیپیک کم‌خطر؛ برای مثال در مورفولوژی سازگار با فیبروآدنوم.' },
  },
  {
    id: 'plateau', score: 5, answers: { root: 'no', curve: 'plateau', margin: 'irregular' },
    title: { de: 'Irregulärer Plateau-Befund', en: 'Irregular plateau lesion', fa: 'ضایعه Irregular با منحنی Plateau' },
    note: { de: 'Die Morphologie hebt den Befund genau über die Biopsieschwelle.', en: 'Morphology moves the lesion just above the biopsy threshold.', fa: 'مورفولوژی ضایعه را درست از آستانه بیوپسی عبور می‌دهد.' },
  },
  {
    id: 'rim', score: 8, answers: { root: 'no', curve: 'washout', enhancement: 'heterogeneous' },
    title: { de: 'Wash-out mit suspektem Enhancement', en: 'Wash-out with suspicious enhancement', fa: 'Wash-out با Enhancement مشکوک' },
    note: { de: 'Heterogenes, Rim- oder clustered-ring Enhancement führt in den hohen Bereich.', en: 'Heterogeneous, rim or clustered-ring enhancement leads to the high range.', fa: 'Enhancement از نوع Heterogeneous، Rim یا Clustered-ring مسیر را به محدوده پرخطر می‌برد.' },
  },
  {
    id: 'rooted', score: 11, answers: { root: 'yes', curve: 'washout', edema: 'present' },
    title: { de: 'Root Sign, Wash-out und Ödem', en: 'Root sign, wash-out and oedema', fa: 'Root sign همراه Wash-out و ادم' },
    note: { de: 'Kombination maximal suspekter sicherer Merkmale.', en: 'Combination of maximally suspicious definite features.', fa: 'ترکیب ویژگی‌های قطعی با بیشترین درجه شک.' },
  },
]

export const SOURCES = [
  { href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5990997/', label: 'Dietzel & Baltzer · Insights into Imaging · 2018' },
  { href: 'https://pubmed.ncbi.nlm.nih.gov/23579418/', label: 'Baltzer et al. · European Radiology · 2013' },
  { href: 'https://pubmed.ncbi.nlm.nih.gov/40121897/', label: 'Mohammadzadeh et al. · European Journal of Radiology · 2025' },
]
