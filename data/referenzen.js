// ──────────────────────────────────────────────────────────────
// Wichtige Referenzen
//   • Messwerte:        Bereich → Tabelle (Struktur · Normwert · Hinweis)
//   • Klassifikationen: Thema → Klassifikation → Kompakt + Vollständig + Quelle
// Sprach-Fallback: tx(field, lang) → field[lang] ?? field.de ?? field.en
// Tabellenzellen dürfen String (sprachneutral, z. B. "TR1") ODER {de,en,fa} sein.
// ──────────────────────────────────────────────────────────────

export function tx(field, lang) {
  if (field == null) return ''
  if (typeof field === 'string') return field
  return field[lang] ?? field.de ?? field.en ?? ''
}

export const REF_COPY = {
  de: {
    sectionLabel: 'Schnell-Referenz',
    label: '📋 Spickzettel',
    title: 'Spickzettel Radiologie',
    sub: 'Normwerte, Grenzwerte und Klassifikationen – kompakt für den radiologischen Alltag.',
    btnMesswerte: 'Größen & Messwerte',
    btnMesswerteSub: 'Normwerte, Grenzwerte und Messpunkte nach Körperregion.',
    btnKlass: 'Klassifikationen & Scores',
    btnKlassSub: 'Radiologische Scoring-Systeme und Einteilungen – kompakt und vollständig.',
    btnRechner: 'Rechner',
    btnRechnerSub: 'Organe vermessen und sofort Volumen + Bewertung erhalten.',
    chipsMesswerte: ['Neuro', 'Thorax', 'Herz', 'Abdomen', 'Urogenital', 'Wirbelsäule', 'CT-HE'],
    chipsKlass: ['BI-RADS', 'LI-RADS', 'PI-RADS', 'Fazekas', 'Bosniak', 'RECIST'],
    chipsRechner: ['Prostata', 'Milz', 'Niere', 'PSA-D'],
    calcResult: 'Ergebnis',
    calcNormal: 'Normbereich',
    chooseRegion: 'Bereich wählen',
    chooseTopic: 'Thema wählen',
    chooseClass: 'Klassifikation wählen',
    back: 'Zurück zur Liste',
    search: 'Suchen …',
    colStruktur: 'Struktur',
    colWert: 'Normwert',
    colHinweis: 'Hinweis / Grenzwert',
    kompakt: 'Kompakt',
    voll: 'Übersicht',
    einfachUebersicht: 'Einfache Übersicht',
    vollstaendig: 'Vollständige Klassifikation',
    ausfuehrlich: 'Stadien & Einteilung im Detail',
    openDetail: 'Ausführlich öffnen',
    reference: 'Quelle',
    close: 'Schließen',
    empty: 'Keine Treffer.',
    pickHint: 'Wähle links eine Klassifikation.',
    disclaimer: 'Orientierungswerte – stets im klinischen Kontext und nach lokalem Standard prüfen.',
  },
  en: {
    sectionLabel: 'Quick Reference',
    label: '📋 Cheat Sheet',
    title: 'Radiology Cheat Sheet',
    sub: 'Normal values, thresholds and classifications – compact for everyday radiology.',
    btnMesswerte: 'Sizes & Measurements',
    btnMesswerteSub: 'Normal values, thresholds and measurement points by body region.',
    btnKlass: 'Classifications & Scores',
    btnKlassSub: 'Radiology scoring systems and grading – compact and full.',
    btnRechner: 'Calculators',
    btnRechnerSub: 'Measure organs and instantly get volume + interpretation.',
    chipsMesswerte: ['Neuro', 'Thorax', 'Heart', 'Abdomen', 'Urogenital', 'Spine', 'CT-HU'],
    chipsKlass: ['BI-RADS', 'LI-RADS', 'PI-RADS', 'Fazekas', 'Bosniak', 'RECIST'],
    chipsRechner: ['Prostate', 'Spleen', 'Kidney', 'PSA-D'],
    calcResult: 'Result',
    calcNormal: 'Reference',
    chooseRegion: 'Choose area',
    chooseTopic: 'Choose topic',
    chooseClass: 'Choose classification',
    back: 'Back to list',
    search: 'Search …',
    colStruktur: 'Structure',
    colWert: 'Normal',
    colHinweis: 'Note / threshold',
    kompakt: 'Compact',
    voll: 'Overview',
    einfachUebersicht: 'Simple Overview',
    vollstaendig: 'Full Classification',
    ausfuehrlich: 'Stages & grading in detail',
    openDetail: 'Open full version',
    reference: 'Source',
    close: 'Close',
    empty: 'No results.',
    pickHint: 'Select a classification on the left.',
    disclaimer: 'Orientation values – always verify in clinical context and per local standard.',
  },
  fa: {
    sectionLabel: 'مرجع سریع',
    label: '📋 برگه راهنما',
    title: 'اسپیک‌زتل رادیولوژی',
    sub: 'مقادیر طبیعی، حدود و طبقه‌بندی‌ها – فشرده برای رادیولوژی روزمره.',
    btnMesswerte: 'اندازه‌ها و مقادیر',
    btnMesswerteSub: 'مقادیر طبیعی، حدود و نقاط اندازه‌گیری بر اساس ناحیه بدن.',
    btnKlass: 'طبقه‌بندی‌ها و اسکورها',
    btnKlassSub: 'سیستم‌های امتیازدهی و درجه‌بندی رادیولوژی – خلاصه و کامل.',
    btnRechner: 'ماشین‌حساب',
    btnRechnerSub: 'اندازه‌گیری اندام‌ها و دریافت فوری حجم + تفسیر.',
    chipsMesswerte: ['نورو', 'توراکس', 'قلب', 'شکم', 'اوروژنیتال', 'ستون فقرات', 'CT-HU'],
    chipsKlass: ['BI-RADS', 'LI-RADS', 'PI-RADS', 'فازکاس', 'بوسنیاک', 'RECIST'],
    chipsRechner: ['پروستات', 'طحال', 'کلیه', 'PSA-D'],
    calcResult: 'نتیجه',
    calcNormal: 'مرجع',
    chooseRegion: 'انتخاب بخش',
    chooseTopic: 'انتخاب موضوع',
    chooseClass: 'انتخاب طبقه‌بندی',
    back: 'بازگشت به فهرست',
    search: 'جستجو …',
    colStruktur: 'ساختار',
    colWert: 'مقدار طبیعی',
    colHinweis: 'نکته / حد آستانه',
    kompakt: 'خلاصه',
    voll: 'نمای کلی',
    einfachUebersicht: 'نمای ساده',
    vollstaendig: 'طبقه‌بندی کامل',
    ausfuehrlich: 'مراحل و درجه‌بندی به‌تفصیل',
    openDetail: 'مشاهده نسخه کامل',
    reference: 'منبع',
    close: 'بستن',
    empty: 'نتیجه‌ای یافت نشد.',
    pickHint: 'از سمت راست یک طبقه‌بندی انتخاب کنید.',
    disclaimer: 'مقادیر تقریبی – همیشه در بافت بالینی و طبق استاندارد محلی بررسی شود.',
  },
}

// ── Messwerte ────────────────────────────────────────────────
// Struktur: region → groups[] → entries[]
export const MESSWERTE = [
  // ── 1. Neuro / Kopf-Hals ────────────────────────────────────
  {
    id: 'neuro', color: '#7c3aed',
    name: { de: 'Neuro / Kopf-Hals', en: 'Neuro / Head & Neck', fa: 'نورو / سر و گردن' },
    groups: [
      {
        name: { de: 'Ventrikel', en: 'Ventricles', fa: 'بطن‌ها' },
        entries: [
          { s: { de: 'Vorderhorn Seitenventrikel (< 40 J.)', en: 'Lateral ventricle frontal horn (< 40 y)', fa: 'شاخ قدامی بطن جانبی (< ۴۰ سال)' }, v: '≤ 12 mm', h: { de: 'In Höhe Foramen Monroi', en: 'At foramen of Monro', fa: 'در سطح فورامن مونرو' } },
          { s: { de: 'Vorderhorn Seitenventrikel (> 40 J.)', en: 'Lateral ventricle frontal horn (> 40 y)', fa: 'شاخ قدامی بطن جانبی (> ۴۰ سال)' }, v: '≤ 15 mm', h: { de: 'Altersbedingte Normweitung', en: 'Age-related normal widening', fa: 'گشادی طبیعی وابسته به سن' } },
          { s: { de: 'III. Ventrikel (Kind)', en: '3rd ventricle (child)', fa: 'بطن سوم (کودک)' }, v: '≤ 5 mm', h: { de: 'Säuglinge etwas mehr normal', en: 'Infants slightly more normal', fa: 'نوزادان کمی بیشتر' } },
          { s: { de: 'III. Ventrikel (Erw. < 60 J.)', en: '3rd ventricle (adult < 60 y)', fa: 'بطن سوم (بزرگسال < ۶۰)' }, v: '≤ 7 mm', h: { de: 'Erweiterung → Hydrozephalus oder Atrophie', en: 'Dilation → hydrocephalus or atrophy', fa: 'گشادی → هیدروسفالی یا آتروفی' } },
          { s: { de: 'III. Ventrikel (Erw. > 60 J.)', en: '3rd ventricle (adult > 60 y)', fa: 'بطن سوم (بزرگسال > ۶۰)' }, v: '≤ 9 mm', h: { de: 'Altersbezogene Normweitung', en: 'Age-related normal widening', fa: 'گشادی طبیعی وابسته به سن' } },
          { s: { de: 'Evans-Index', en: 'Evans index', fa: 'شاخص ایوانز' }, v: '< 0,30', h: { de: 'Frontalhorn / max. Schädelbreite; ≥ 0,3 = Hydrozephalus', en: 'Frontal horn / max. skull width; ≥ 0.3 = hydrocephalus', fa: '≥ ۰٫۳ = هیدروسفالی' } },
        ],
      },
      {
        name: { de: 'Sehnerv & Orbita', en: 'Optic Nerve & Orbit', fa: 'عصب بینایی و اوربیت' },
        entries: [
          { s: { de: 'N. opticus retrobulbär (axial)', en: 'Optic nerve retrobulbar (axial)', fa: 'عصب بینایی رتروبولبار' }, v: '5,5 ± 0,8 mm', h: { de: '3 mm hinter dem Bulbus gemessen', en: 'Measured 3 mm behind the globe', fa: '۳ میلی‌متر پشت چشم اندازه‌گیری می‌شود' } },
          { s: { de: 'N. opticus Taille (Orbitamitte)', en: 'Optic nerve waist (mid-orbit)', fa: 'تنه عصب بینایی (میانه مدار)' }, v: '4,2 ± 0,6 mm', h: { de: 'Schmalste Stelle in Orbitamitte', en: 'Narrowest point at orbital midpoint', fa: 'باریکترین نقطه در مرکز مدار' } },
          { s: { de: 'Optikusscheide (ONSD)', en: 'Optic nerve sheath diam. (ONSD)', fa: 'قطر غلاف عصب بینایی' }, v: '< 5,7 mm', h: { de: '> 5,7 mm → Hirndruck ↑', en: '> 5.7 mm → raised ICP', fa: '> ۵٫۷ میلی‌متر → فشار داخل جمجمه ↑' } },
        ],
      },
      {
        name: { de: 'Hypophyse', en: 'Pituitary Gland', fa: 'هیپوفیز' },
        entries: [
          { s: { de: 'Höhe (sagittal)', en: 'Height (sagittal)', fa: 'ارتفاع (ساژیتال)' }, v: '2–7 mm', h: { de: 'Schwangerschaft bis 12 mm; Pubertät: ♀ bis 10 mm, ♂ bis 8 mm', en: 'Pregnancy up to 12 mm; puberty: ♀ up to 10 mm, ♂ up to 8 mm', fa: 'بارداری تا ۱۲ میلی‌متر؛ بلوغ: ♀ تا ۱۰، ♂ تا ۸' } },
        ],
      },
      {
        name: { de: 'Innerer Gehörgang (IAC)', en: 'Internal Auditory Canal (IAC)', fa: 'کانال شنوایی داخلی' },
        entries: [
          { s: { de: 'Weite (axial)', en: 'Width (axial)', fa: 'عرض (محوری)' }, v: '5–10 mm', h: { de: 'Seitendifferenz < 1 mm; > 10 mm → Abklärung (z. B. Vestibularisschwannom)', en: 'Side difference < 1 mm; > 10 mm → work-up (e.g. vestibular schwannoma)', fa: 'اختلاف دو طرف < ۱ میلی‌متر؛ > ۱۰ → بررسی' } },
        ],
      },
      {
        name: { de: 'Schilddrüse', en: 'Thyroid Gland', fa: 'غده تیروئید' },
        entries: [
          { s: { de: 'Länge (je Lappen)', en: 'Length (per lobe)', fa: 'طول (هر لوب)' }, v: '3,5–6 cm', h: { de: 'Volumen je Lappen: ♂ ≤ 18 ml, ♀ ≤ 12 ml', en: 'Volume per lobe: ♂ ≤ 18 ml, ♀ ≤ 12 ml', fa: 'حجم هر لوب: ♂ ≤ ۱۸ میلی‌لیتر، ♀ ≤ ۱۲' } },
          { s: { de: 'Breite / Tiefe (je Lappen)', en: 'Width / Depth (per lobe)', fa: 'عرض / عمق (هر لوب)' }, v: 'B: 1,5–2 cm / T: 1–2 cm', h: { de: 'a-p Tiefe ≤ 2 cm (= Hauptkennmaß)', en: 'AP depth ≤ 2 cm (main criterion)', fa: 'عمق قدامی-خلفی ≤ ۲ سانتی‌متر (معیار اصلی)' } },
        ],
      },
      {
        name: { de: 'Halslymphknoten', en: 'Cervical Lymph Nodes', fa: 'غدد لنفاوی گردن' },
        entries: [
          { s: { de: 'Kurze Achse', en: 'Short axis', fa: 'محور کوتاه' }, v: '< 10 mm', h: { de: 'Jugulodigastrisch bis 11 mm; Retropharyngeal bis 8 mm', en: 'Jugulodigastric up to 11 mm; retropharyngeal up to 8 mm', fa: 'ژوگولودیگاستریک تا ۱۱ میلی‌متر؛ رتروفارنژیال تا ۸' } },
        ],
      },
    ],
  },

  // ── 2. Thorax / Lunge ───────────────────────────────────────
  {
    id: 'thorax', color: '#0ea5e9',
    name: { de: 'Thorax / Lunge', en: 'Thorax / Lung', fa: 'توراکس / ریه' },
    groups: [
      {
        name: { de: 'Aorta thorakalis', en: 'Thoracic Aorta', fa: 'آئورت توراسیک' },
        entries: [
          { s: { de: 'Aorta ascendens – Höhe PA-Bif.', en: 'Ascending aorta – PA bifurcation level', fa: 'آئورت صعودی – سطح تقسیم PA' }, v: '3,2 ± 0,5 cm', h: { de: 'OP-Indikation ab ≥ 5,5 cm (♀ ab 5,0 cm)', en: 'Surgery from ≥ 5.5 cm (♀ from 5.0 cm)', fa: 'جراحی از ۵٫۵ سانتی‌متر' } },
          { s: { de: 'Aorta ascendens – Aortenwurzel', en: 'Ascending aorta – aortic root', fa: 'آئورت صعودی – ریشه آئورت' }, v: '3,7 ± 0,3 cm', h: { de: 'Verhältnis asc./desc. ≈ 1,5 : 1', en: 'Ratio ascending/descending ≈ 1.5 : 1', fa: 'نسبت صعودی/نزولی ≈ ۱٫۵ : ۱' } },
          { s: { de: 'Aortenbogen', en: 'Aortic arch', fa: 'قوس آئورت' }, v: '2,5 ± 1,2 cm', h: { de: 'Variabel je Atemphase und Messpunkt', en: 'Variable by respiratory phase and level', fa: 'متغیر بر اساس فاز تنفسی' } },
          { s: { de: 'Aorta descendens', en: 'Descending aorta', fa: 'آئورت نزولی' }, v: '2,5 ± 0,4 cm', h: { de: 'Aneurysma ab ≥ 4 cm; OP ab ≥ 5,5 cm', en: 'Aneurysm ≥ 4 cm; surgery ≥ 5.5 cm', fa: 'آنوریسم از ۴؛ جراحی از ۵٫۵' } },
        ],
      },
      {
        name: { de: 'Pulmonalgefäße & V. cava', en: 'Pulmonary Vessels & SVC', fa: 'عروق ریوی و ورید اجوف فوقانی' },
        entries: [
          { s: { de: 'Truncus pulmonalis', en: 'Pulmonary trunk', fa: 'تنه ریوی' }, v: '2,4 ± 0,2 cm', h: { de: 'PH wahrscheinlich wenn > Aorta ascendens', en: 'PH likely if > ascending aorta', fa: 'احتمال PH اگر > آئورت صعودی' } },
          { s: { de: 'Re. Pulmonalarterie (proximal)', en: 'Right PA (proximal)', fa: 'شریان ریوی راست (پروگزیمال)' }, v: '1,9 ± 0,3 cm', h: { de: 'Distal re. PA: 1,5 ± 0,3 cm; li. PA: 2,1 ± 0,4 cm', en: 'Distal right PA: 1.5 ± 0.3 cm; left PA: 2.1 ± 0.4 cm', fa: 'PA راست دیستال: ۱٫۵ ± ۰٫۳؛ PA چپ: ۲٫۱ ± ۰٫۴' } },
          { s: { de: 'V. cava superior (Höhe Aortenbogen)', en: 'SVC (aortic arch level)', fa: 'ورید اجوف فوقانی' }, v: '1,4 ± 0,4 cm', h: { de: 'Höhe PA-Bif.: 2,0 ± 0,4 cm', en: 'At PA bifurcation: 2.0 ± 0.4 cm', fa: 'در سطح بایفورکاسیون PA: ۲٫۰ ± ۰٫۴' } },
        ],
      },
      {
        name: { de: 'Atemwege', en: 'Airways', fa: 'راه‌های هوایی' },
        entries: [
          { s: { de: 'Trachea (transversal)', en: 'Trachea (transverse)', fa: 'نای (عرضی)' }, v: '♂ ≤ 25 / ♀ ≤ 21 mm', h: { de: 'Tracheomegalie darüber; Tracheomalazie < 70 % Kollaps', en: 'Tracheomegaly above; tracheomalacia < 70% collapse', fa: 'تراکئومگالی بالاتر' } },
          { s: { de: 'Hauptbronchus rechts (Lumen)', en: 'Right main bronchus (lumen)', fa: 'برونش اصلی راست' }, v: '~15 mm', h: { de: 'Steiler Abgang (25°); kürzer als links', en: 'Steeper take-off (25°); shorter than left', fa: 'زاویه تندتر (۲۵°)؛ کوتاه‌تر از چپ' } },
          { s: { de: 'Hauptbronchus links (Lumen)', en: 'Left main bronchus (lumen)', fa: 'برونش اصلی چپ' }, v: '~13 mm', h: { de: 'Flacherer Abgang (45°); länger als rechts', en: 'Flatter take-off (45°); longer than right', fa: 'زاویه ملایم‌تر (۴۵°)؛ طولانی‌تر از راست' } },
        ],
      },
      {
        name: { de: 'Mediastinum & Sonstiges', en: 'Mediastinum & Other', fa: 'مدیاستن و سایر' },
        entries: [
          { s: { de: 'Thymus (Querdurchmesser)', en: 'Thymus (transverse diam.)', fa: 'تیموس (قطر عرضی)' }, v: '1–2 cm', h: { de: 'Bei Erwachsenen; Involution ab ~20. Lj.', en: 'In adults; involution from ~age 20', fa: 'در بزرگسالان؛ تحلیل از سن ۲۰ سالگی' } },
          { s: { de: 'Herz-Thorax-Quotient (Röntgen)', en: 'Cardiothoracic ratio (CXR)', fa: 'نسبت قلبی-قفسه‌ای' }, v: '< 0,5', h: { de: 'Nur im p.a.-Stehen auswertbar', en: 'Valid only on erect PA film', fa: 'فقط در نمای PA ایستاده' } },
          { s: { de: 'Lungenrundherd – Verlaufsschwelle', en: 'Pulmonary nodule – follow-up threshold', fa: 'ندول ریوی – آستانه پیگیری' }, v: 'solide ≥ 8 mm', h: { de: 'Management nach Fleischner-Gesellschaft 2017', en: 'Management per Fleischner Society 2017', fa: 'طبق دستورالعمل فلایشنر ۲۰۱۷' } },
        ],
      },
    ],
  },

  // ── 3. Herz ─────────────────────────────────────────────────
  {
    id: 'herz', color: '#be185d',
    name: { de: 'Herz', en: 'Heart', fa: 'قلب' },
    groups: [
      {
        name: { de: 'Vorhöfe', en: 'Atria', fa: 'دهلیزها' },
        entries: [
          { s: { de: 'Re. Vorhof – transversal (max.)', en: 'Right atrium – transverse (max.)', fa: 'دهلیز راست – عرضی' }, v: '≤ 4,4 cm', h: { de: 'Höhe Aortenwurzel: 1,9 ± 0,8 cm; Höhe Mitralklappe: 3,2 ± 1,2 cm', en: 'Aortic root level: 1.9 ± 0.8 cm; mitral valve: 3.2 ± 1.2 cm', fa: 'سطح ریشه آئورت: ۱٫۹ ± ۰٫۸؛ میترال: ۳٫۲ ± ۱٫۲' } },
          { s: { de: 'Li. Vorhof – a-p (max.)', en: 'Left atrium – AP (max.)', fa: 'دهلیز چپ – قدامی-خلفی' }, v: '≤ 4–5 cm', h: { de: 'Höhe Aortenwurzel: 2,4–4,5 cm; Höhe Mitralklappe: 2,9–4,9 cm', en: 'Aortic root: 2.4–4.5 cm; mitral valve: 2.9–4.9 cm', fa: 'ریشه آئورت: ۲٫۴–۴٫۵؛ میترال: ۲٫۹–۴٫۹' } },
          { s: { de: 'Li. Vorhof – transversal (max.)', en: 'Left atrium – transverse (max.)', fa: 'دهلیز چپ – عرضی' }, v: '≤ 9 cm', h: { de: 'Höhe Aortenwurzel: 5,5–8,4 cm; Höhe Mitralklappe: 4,9–9,1 cm', en: 'Aortic root: 5.5–8.4 cm; mitral valve: 4.9–9.1 cm', fa: 'ریشه آئورت: ۵٫۵–۸٫۴؛ میترال: ۴٫۹–۹٫۱' } },
        ],
      },
      {
        name: { de: 'Ventrikel & Septum', en: 'Ventricles & Septum', fa: 'بطن‌ها و سپتوم' },
        entries: [
          { s: { de: 'Ventrikelseptum (Dicke)', en: 'Interventricular septum (thickness)', fa: 'سپتوم بین‌بطنی' }, v: '5–10 mm', h: { de: 'Winkel Mediosagittale/Septum = 38°; Hypertrophie > 12 mm', en: 'Angle midsagittal/septum = 38°; hypertrophy > 12 mm', fa: 'زاویه میانی-ساژیتال/سپتوم = ۳۸°؛ هایپرتروفی > ۱۲' } },
          { s: { de: 'Myokard LV (Wanddicke)', en: 'LV myocardium (wall thickness)', fa: 'میوکارد بطن چپ' }, v: '10–12 mm', h: { de: 'Hypertrophie > 12 mm; Dilatative KMP < 6 mm', en: 'Hypertrophy > 12 mm; dilated CMP < 6 mm', fa: 'هایپرتروفی > ۱۲؛ کاردیومیوپاتی اتساعی < ۶' } },
        ],
      },
      {
        name: { de: 'Perikard', en: 'Pericardium', fa: 'پریکارد' },
        entries: [
          { s: { de: 'Perikard (Dicke)', en: 'Pericardium (thickness)', fa: 'ضخامت پریکارد' }, v: '1–2 mm', h: { de: 'Konstriktive Perikarditis bei > 4 mm', en: 'Constrictive pericarditis > 4 mm', fa: 'پریکاردیت کانستریکتیو > ۴ میلی‌متر' } },
        ],
      },
    ],
  },

  // ── 4. Abdomen ──────────────────────────────────────────────
  {
    id: 'abdomen', color: '#f59e0b',
    name: { de: 'Abdomen', en: 'Abdomen', fa: 'شکم' },
    groups: [
      {
        name: { de: 'Leber', en: 'Liver', fa: 'کبد' },
        entries: [
          { s: { de: 'Länge (kraniokaudal, MCL)', en: 'Length (craniocaudal, MCL)', fa: 'طول (طولی، MCL)' }, v: '≤ 15,5 cm', h: { de: 'Hepatomegalie darüber; Leberrandwinkel li. ~45°', en: 'Hepatomegaly above; left liver edge angle ~45°', fa: 'هپاتومگالی بالاتر؛ زاویه لبه کبد چپ ~۴۵°' } },
          { s: { de: 'Li. Leberlappen a-p (Paravertebrallinie)', en: 'Left lobe AP (paravertebral line)', fa: 'لوب چپ کبد (قدامی-خلفی)' }, v: '≤ 5 cm', h: { de: 'In der Paravertebrallinie gemessen', en: 'Measured in the paravertebral line', fa: 'اندازه‌گیری در خط پاراورتبرال' } },
          { s: { de: 'Lobus caudatus / re. Lappen (Ratio)', en: 'Caudate / right lobe ratio', fa: 'نسبت لوب کودات / لوب راست' }, v: '0,37 ± 0,16', h: { de: 'Zirrhose-Zeichen ab ≥ 0,65 (typisch 0,88 ± 0,2)', en: 'Cirrhosis sign ≥ 0.65 (typical 0.88 ± 0.2)', fa: 'نشانه سیروز از ≥ ۰٫۶۵ (معمول ۰٫۸۸ ± ۰٫۲)' } },
        ],
      },
      {
        name: { de: 'Milz', en: 'Spleen', fa: 'طحال' },
        entries: [
          { s: { de: 'Länge', en: 'Length', fa: 'طول' }, v: '11–15 cm', h: { de: 'Splenomegalie > 15 cm; Milzindex (B×T×L) normal: 160–440 cm³', en: 'Splenomegaly > 15 cm; spleen index (B×T×L) normal: 160–440 cm³', fa: 'اسپلنومگالی > ۱۵ سانتی‌متر؛ شاخص طحال ۱۶۰–۴۴۰' } },
          { s: { de: 'Breite / Tiefe', en: 'Width / Depth', fa: 'عرض / عمق' }, v: 'B: 7–10 cm / T: 4–6 cm', h: { de: 'Tiefe > 6 cm → Splenomegalie', en: 'Depth > 6 cm → splenomegaly', fa: 'عمق > ۶ سانتی‌متر → اسپلنومگالی' } },
        ],
      },
      {
        name: { de: 'Pankreas', en: 'Pancreas', fa: 'پانکراس' },
        entries: [
          { s: { de: 'Caput / Corpus / Cauda', en: 'Head / Body / Tail', fa: 'سر / تنه / دنباله' }, v: 'C: ≤ 3,5 / K: ≤ 2,5 / D: ≤ 2,5 cm', h: { de: 'Atrophie bei chron. Pankreatitis; lipomatös bei Alter/DM', en: 'Atrophy in chronic pancreatitis; lipomatous in age/DM', fa: 'آتروفی در پانکراتیت مزمن؛ لیپوماتوس در سالمندان/DM' } },
          { s: { de: 'Ductus pancreaticus (Wirsung)', en: 'Pancreatic duct (Wirsung)', fa: 'مجرای پانکراس' }, v: '1–3 mm', h: { de: 'Erweiterung > 3 mm bei Obstruktion / IPMN', en: 'Dilation > 3 mm in obstruction / IPMN', fa: 'گشادی > ۳ میلی‌متر در انسداد / IPMN' } },
        ],
      },
      {
        name: { de: 'Gallenblase & Gallenwege', en: 'Gallbladder & Bile Ducts', fa: 'کیسه صفرا و مجاری صفراوی' },
        entries: [
          { s: { de: 'Gallenblase (horizontaler Ø)', en: 'Gallbladder (horizontal diam.)', fa: 'کیسه صفرا (قطر افقی)' }, v: '≤ 5 cm', h: { de: 'Hydrops-Verdacht > 5 cm; Wanddicke: 1–3 mm', en: 'Suspect hydrops > 5 cm; wall: 1–3 mm', fa: 'هیدروپس مشکوک > ۵ سانتی‌متر؛ دیواره: ۱–۳ میلی‌متر' } },
          { s: { de: 'Ductus choledochus (DHC)', en: 'Common bile duct (CBD)', fa: 'مجرای صفراوی مشترک' }, v: '≤ 8 mm', h: { de: 'Nach Cholezystektomie ≤ 10 mm; +1 mm/Dekade > 60 J.', en: 'Post-cholecystectomy ≤ 10 mm; +1 mm/decade > 60 y', fa: 'پس از کوله‌سیستکتومی ≤ ۱۰ میلی‌متر' } },
        ],
      },
      {
        name: { de: 'Pfortader, V. cava & Darm', en: 'Portal Vein, IVC & Bowel', fa: 'ورید پورت، VCI و روده' },
        entries: [
          { s: { de: 'Pfortader', en: 'Portal vein', fa: 'ورید پورت' }, v: '≤ 13 mm', h: { de: 'Portale Hypertension ab > 13 mm; atemvariabel', en: 'Portal hypertension > 13 mm; respiratory variation', fa: 'هایپرتانسیون پورت > ۱۳ میلی‌متر؛ تغییر تنفسی' } },
          { s: { de: 'V. cava inferior (Querdurchmesser)', en: 'Inferior vena cava (transverse)', fa: 'ورید اجوف تحتانی' }, v: '≤ 2,5 cm', h: { de: 'Atemvariabel; Kollaps bei Hypovolämie', en: 'Respiratory variation; collapse in hypovolaemia', fa: 'تغییر تنفسی؛ کلاپس در هیپوولمی' } },
          { s: { de: 'Appendix', en: 'Appendix', fa: 'آپاندیس' }, v: '≤ 6 mm', h: { de: 'Appendizitis: > 6 mm + Wandverdickung + KM-Enhancement', en: 'Appendicitis: > 6 mm + wall thickening + contrast enhancement', fa: 'آپاندیسیت: > ۶ + ضخامت دیواره + انهانسمنت' } },
        ],
      },
    ],
  },

  // ── 5. Urogenital / Becken ──────────────────────────────────
  {
    id: 'urogenital', color: '#e11d48',
    name: { de: 'Urogenital / Becken', en: 'Urogenital / Pelvis', fa: 'اوروژنیتال / لگن' },
    groups: [
      {
        name: { de: 'Niere & Ureter', en: 'Kidney & Ureter', fa: 'کلیه و حالب' },
        entries: [
          { s: { de: 'Niere – kraniokaudal', en: 'Kidney – craniocaudal', fa: 'کلیه – طول' }, v: '8–13 cm', h: { de: 'Re. Oberkante L1, li. Unterkante Th12; Seitendiff. < 1,5 cm', en: 'Right upper pole L1, left lower Th12; side diff. < 1.5 cm', fa: 'قطب فوقانی راست L1؛ اختلاف دو طرف < ۱٫۵' } },
          { s: { de: 'Niere – transversal / a-p', en: 'Kidney – transverse / AP', fa: 'کلیه – عرضی / قدامی-خلفی' }, v: 'T: 5–6 cm / AP: ~4 cm', h: { de: 'Quere Nierenachse: Winkel 120° nach dorsal', en: 'Renal axis angle: 120° diverging dorsally', fa: 'زاویه محور کلیه: ۱۲۰° به سمت خلف' } },
          { s: { de: 'Nierenrinde (Breite)', en: 'Renal cortex (width)', fa: 'قشر کلیه' }, v: '4–5 mm', h: { de: 'Verschmälerung bei chron. Nierenerkrankung', en: 'Thinning in chronic kidney disease', fa: 'نازک‌شدن در بیماری مزمن کلیه' } },
          { s: { de: 'Ureter (Weite)', en: 'Ureter (width)', fa: 'حالب (عرض)' }, v: '4–7 mm', h: { de: '> 7 mm: Harnstauung / Obstruktion', en: '> 7 mm: hydronephrosis / obstruction', fa: '> ۷ میلی‌متر: هیدرونفروز / انسداد' } },
          { s: { de: 'Gerota-Faszie (Dicke)', en: "Gerota's fascia (thickness)", fa: 'فاشیای ژروتا' }, v: '1–2 mm', h: { de: 'Verdickt bei perirenaler Entzündung oder Tumor', en: 'Thickened in perirenal inflammation or tumour', fa: 'ضخیم در التهاب یا تومور پیرامون کلیه' } },
        ],
      },
      {
        name: { de: 'Nebenniere', en: 'Adrenal Gland', fa: 'غده آدرنال' },
        entries: [
          { s: { de: 'Schenkeldicke', en: 'Limb thickness', fa: 'ضخامت بازو' }, v: '< 10 mm', h: { de: 'Inzidentalom-Abklärung ≥ 10 mm Schenkel', en: 'Incidentaloma work-up ≥ 10 mm limb', fa: 'بررسی انسیدنتالوم اگر ≥ ۱۰ میلی‌متر' } },
        ],
      },
      {
        name: { de: 'Uterus & Ovar (Frau)', en: 'Uterus & Ovary (Female)', fa: 'رحم و تخمدان (زنان)' },
        entries: [
          { s: { de: 'Uteruslänge – präpubertär / Nullipara / Multipara / postmeno.', en: 'Uterus length – prepubertal / nulliparous / multiparous / postmeno.', fa: 'طول رحم – پیش بلوغ / نولیپار / مولتیپار / یائسگی' }, v: '3 / 8 / 9,5 / 6 cm', h: { de: 'Querdurchmesser: Nullipara ~4 cm, Multipara ~5,5 cm, postmeno. ~2 cm', en: 'Transverse: nulliparous ~4 cm, multiparous ~5.5 cm, postmeno. ~2 cm', fa: 'عرضی: نولیپار ~۴، مولتیپار ~۵٫۵، یائسگی ~۲ سانتی‌متر' } },
          { s: { de: 'Cervix uteri (Querdurchmesser)', en: 'Cervix uteri (transverse diam.)', fa: 'سرویکس رحم' }, v: '≤ 3 cm', h: { de: 'Gemessen bei voller Blase', en: 'Measured with full bladder', fa: 'اندازه‌گیری با مثانه پر' } },
          { s: { de: 'Endometrium (postmenopausal)', en: 'Endometrium (postmenopausal)', fa: 'آندومتر (پس از یائسگی)' }, v: '< 5 mm', h: { de: 'Abklärung bei vaginaler Blutung ab > 4–5 mm', en: 'Work-up if vaginal bleeding > 4–5 mm', fa: 'بررسی در خونریزی واژینال > ۴–۵ میلی‌متر' } },
          { s: { de: 'Ovar – Länge (geschlechtsreif)', en: 'Ovary – length (reproductive age)', fa: 'تخمدان – طول (سنین باروری)' }, v: '≤ 4 cm', h: { de: 'Querdurchmesser ≤ 2,5 cm; Volumen < 10 ml; postmeno.: Länge ≤ 3 cm', en: 'Transverse ≤ 2.5 cm; volume < 10 ml; postmeno: length ≤ 3 cm', fa: 'عرضی ≤ ۲٫۵؛ حجم < ۱۰ میلی‌لیتر؛ یائسگی: طول ≤ ۳' } },
        ],
      },
      {
        name: { de: 'Prostata & Samenblasen (Mann)', en: 'Prostate & Seminal Vesicles (Male)', fa: 'پروستات و وزیکول‌های سمینال (مردان)' },
        entries: [
          { s: { de: 'Prostata – a-p / lateral', en: 'Prostate – AP / lateral', fa: 'پروستات – قدامی-خلفی / جانبی' }, v: 'AP: 2,5–3 cm / L: 3–5 cm', h: { de: 'Altersabhängig (20–70 J.); BPH häufig ab 40 J.', en: 'Age-dependent (20–70 y); BPH common after 40', fa: 'وابسته به سن (۲۰–۷۰ سال)؛ BPH پس از ۴۰' } },
          { s: { de: 'Samenblasen – Länge / Breite', en: 'Seminal vesicles – length / width', fa: 'وزیکول‌های سمینال – طول / عرض' }, v: 'L: ≤ 5 cm / B: ≤ 2 cm', h: { de: 'Tiefe bis 2,5 cm; sehr variabel; Atrophie im Alter', en: 'Depth up to 2.5 cm; very variable; atrophy with age', fa: 'عمق تا ۲٫۵ سانتی‌متر؛ آتروفی در سالمندان' } },
        ],
      },
      {
        name: { de: 'Harnblase & Rektum', en: 'Bladder & Rectum', fa: 'مثانه و رکتوم' },
        entries: [
          { s: { de: 'Harnblasenwand (bei guter Füllung)', en: 'Bladder wall (full bladder)', fa: 'دیواره مثانه (پر)' }, v: '~3 mm', h: { de: 'Verdickt bei Obstruktion / Entzündung / Tumor', en: 'Thickened in obstruction / inflammation / tumour', fa: 'ضخیم در انسداد / التهاب / تومور' } },
          { s: { de: 'Rektumwand (Dicke)', en: 'Rectal wall (thickness)', fa: 'دیواره رکتوم' }, v: '≤ 5 mm', h: { de: 'Wandverdickung bei Entzündung / Tumor', en: 'Wall thickening in inflammation / tumour', fa: 'ضخامت دیواره در التهاب / تومور' } },
        ],
      },
    ],
  },

  // ── 6. Gefäße ───────────────────────────────────────────────
  {
    id: 'gefaesse', color: '#dc2626',
    name: { de: 'Gefäße', en: 'Vessels', fa: 'عروق' },
    groups: [
      {
        name: { de: 'Aorta & Iliakal', en: 'Aorta & Iliac', fa: 'آئورت و ایلیاک' },
        entries: [
          { s: { de: 'Aorta abdominalis (Querdurchmesser)', en: 'Abdominal aorta (transverse diam.)', fa: 'آئورت شکمی (قطر عرضی)' }, v: '18–30 mm', h: { de: 'Aneurysma ab ≥ 30 mm; OP: ♂ ≥ 55 mm, ♀ ≥ 50 mm', en: 'Aneurysm from ≥ 30 mm; surgery: ♂ ≥ 55 mm, ♀ ≥ 50 mm', fa: 'آنوریسم از ۳۰ میلی‌متر؛ جراحی ♂ ≥ ۵۵، ♀ ≥ ۵۰' } },
          { s: { de: 'A. iliaca communis', en: 'Common iliac artery', fa: 'شریان ایلیاک مشترک' }, v: 'Aneurysma > 1,8 cm', h: { de: 'Normal ~1 cm; oft beidseitig', en: 'Normal ~1 cm; often bilateral', fa: 'طبیعی ~۱ سانتی‌متر؛ اغلب دوطرفه' } },
        ],
      },
      {
        name: { de: 'Periphere Gefäße & Viszeralarterien', en: 'Peripheral Vessels & Visceral Arteries', fa: 'عروق محیطی و احشایی' },
        entries: [
          { s: { de: 'A. poplitea', en: 'Popliteal artery', fa: 'شریان پوپلیتئال' }, v: 'Aneurysma > 1,0 cm', h: { de: 'Häufig beidseitig; Gegenseite mitscreenen', en: 'Often bilateral; screen contralateral side', fa: 'اغلب دوطرفه؛ طرف مقابل را غربالگری کنید' } },
          { s: { de: 'Milzarterienaneurysma', en: 'Splenic artery aneurysm', fa: 'آنوریسم شریان طحالی' }, v: 'Therapie > 2 cm', h: { de: 'In Schwangerschaft frühere Intervention', en: 'Earlier intervention in pregnancy', fa: 'مداخله زودتر در بارداری' } },
        ],
      },
    ],
  },

  // ── 7. Wirbelsäule ──────────────────────────────────────────
  {
    id: 'wirbelsaeule', color: '#0d9488',
    name: { de: 'Wirbelsäule', en: 'Spine', fa: 'ستون فقرات' },
    groups: [
      {
        name: { de: 'HWS (Halswirbelsäule)', en: 'Cervical Spine (HWS)', fa: 'ستون فقرات گردنی' },
        entries: [
          { s: { de: 'Atlanto-dentaler Abstand (ADI)', en: 'Atlanto-dental interval (ADI)', fa: 'فاصله اطلانتو-دنتال' }, v: '♂ < 3 mm / Kind < 5 mm', h: { de: 'Erhöht bei C1/C2-Instabilität (z. B. Rheumatoid)', en: 'Raised in C1/C2 instability (e.g. rheumatoid)', fa: 'افزایش در ناپایداری C1/C2 (مثلاً روماتوئید)' } },
          { s: { de: 'Spinalkanal – transversal (Pediculi)', en: 'Spinal canal – transverse (pedicle level)', fa: 'کانال نخاعی – عرضی' }, v: '20–21 mm', h: { de: 'Relative Stenose < 12 mm; absolute Stenose < 10 mm', en: 'Relative stenosis < 12 mm; absolute < 10 mm', fa: 'تنگی نسبی < ۱۲ میلی‌متر؛ مطلق < ۱۰' } },
          { s: { de: 'Myelon (sagittaler Ø)', en: 'Spinal cord (sagittal diam.)', fa: 'طناب نخاعی (قطر ساژیتال)' }, v: '6–7 mm', h: { de: 'Myelopathie-Risiko bei < 7 mm Kanalweite', en: 'Myelopathy risk if canal < 7 mm', fa: 'خطر میلوپاتی اگر کانال < ۷ میلی‌متر' } },
        ],
      },
      {
        name: { de: 'BWS (Brustwirbelsäule)', en: 'Thoracic Spine (BWS)', fa: 'ستون فقرات توراسیک' },
        entries: [
          { s: { de: 'Spinalkanal – sagittal', en: 'Spinal canal – sagittal', fa: 'کانال نخاعی – ساژیتال' }, v: 'Th1–11: 13–14 mm / Th12: 15 mm', h: { de: 'Jones-Thomson-Quotient (A×B / C×D): 0,22–0,5 normal', en: 'Jones-Thomson quotient (A×B / C×D): 0.22–0.5 normal', fa: 'نسبت جونز-تامسون طبیعی: ۰٫۲۲–۰٫۵' } },
          { s: { de: 'Zwischenwirbelraum (Höhe)', en: 'Intervertebral disc space (height)', fa: 'فضای بین‌مهره‌ای' }, v: '4–5 mm', h: { de: 'Th1 am kleinsten; Th11–12 am größten', en: 'Th1 smallest; Th11–12 largest', fa: 'Th1 کوچکترین؛ Th11–12 بزرگترین' } },
        ],
      },
      {
        name: { de: 'LWS (Lendenwirbelsäule)', en: 'Lumbar Spine (LWS)', fa: 'ستون فقرات کمری' },
        entries: [
          { s: { de: 'Lumbosakralwinkel (S1 / Horizontale)', en: 'Lumbosacral angle (S1 / horizontal)', fa: 'زاویه کمری-خاجی' }, v: '26–57°', h: { de: 'Erhöht bei Hyperlordose / Spondylolisthesis', en: 'Raised in hyperlordosis / spondylolisthesis', fa: 'افزایش در هایپرلوردوز / اسپوندیلولیستزیس' } },
          { s: { de: 'Bandscheibenhöhe', en: 'Disc height', fa: 'ارتفاع دیسک' }, v: '8–12 mm', h: { de: 'L1→L4/5 zunehmend; L5/S1 wieder schmäler; Dichte nativ: 70 ± 5 HE', en: 'L1→L4/5 increasing; L5/S1 narrower; native density: 70 ± 5 HU', fa: 'L1→L4/5 افزایشی؛ L5/S1 کمتر؛ دانسیته: ۷۰ ± ۵ HU' } },
          { s: { de: 'Spinalkanal – transversal (L1–L4)', en: 'Spinal canal – transverse (L1–L4)', fa: 'کانال نخاعی کمری (L1–L4)' }, v: '≥ 20–21 mm', h: { de: 'L5 ≥ 24 mm; relativ eng < 12 mm; absolut eng < 10 mm', en: 'L5 ≥ 24 mm; relatively narrow < 12 mm; absolute < 10 mm', fa: 'L5 ≥ ۲۴؛ تنگی نسبی < ۱۲؛ مطلق < ۱۰' } },
          { s: { de: 'Recessus lateralis (sagittal)', en: 'Lateral recess (sagittal)', fa: 'رسسوس جانبی' }, v: '4–5 mm', h: { de: '< 3 mm = Stenose des Recessus lateralis', en: '< 3 mm = lateral recess stenosis', fa: '< ۳ میلی‌متر = تنگی رسسوس جانبی' } },
          { s: { de: 'Ligamentum flavum (Breite)', en: 'Ligamentum flavum (width)', fa: 'لیگامنت فلاووم (عرض)' }, v: '≤ 6 mm', h: { de: '> 6 mm: Hypertrophie → Spinalkanal-Einengung', en: '> 6 mm: hypertrophy → canal narrowing', fa: '> ۶ میلی‌متر: هایپرتروفی → تنگی کانال' } },
        ],
      },
    ],
  },

  // ── 8. MSK – Gelenke & Sehnen ───────────────────────────────
  {
    id: 'msk', color: '#f97316',
    name: { de: 'MSK – Gelenke & Sehnen', en: 'MSK – Joints & Tendons', fa: 'اسکلتی-عضلانی – مفاصل و تاندون‌ها' },
    groups: [
      {
        name: { de: 'Schulter', en: 'Shoulder', fa: 'شانه' },
        entries: [
          { s: { de: 'Akromiohumeraler Abstand', en: 'Acromiohumeral distance', fa: 'فاصله آکرومیوهومرال' }, v: '7–14 mm', h: { de: '< 7 mm → Rotatorenmanschettenläsion', en: '< 7 mm → rotator cuff lesion', fa: '< ۷ میلی‌متر → ضایعه روتاتور کاف' } },
        ],
      },
      {
        name: { de: 'Knie & Patella', en: 'Knee & Patella', fa: 'زانو و کشکک' },
        entries: [
          { s: { de: 'Insall-Salvati-Index', en: 'Insall-Salvati index', fa: 'شاخص اینسال-سالواتی' }, v: '0,8–1,2', h: { de: '> 1,2 Patella alta; < 0,8 Patella baja', en: '> 1.2 patella alta; < 0.8 patella baja', fa: '> ۱٫۲ پاتلا آلتا؛ < ۰٫۸ باجا' } },
        ],
      },
      {
        name: { de: 'Unterschenkel & Fuß', en: 'Lower Leg & Foot', fa: 'ساق پا و پا' },
        entries: [
          { s: { de: 'Achillessehne (Dicke)', en: 'Achilles tendon (thickness)', fa: 'تاندون آشیل (ضخامت)' }, v: '< 6 mm', h: { de: 'Tendinopathie > 6 mm; Ruptur: plötzliche Ausdünnung', en: 'Tendinopathy > 6 mm; rupture: sudden thinning', fa: 'تاندینوپاتی > ۶؛ پارگی: نازک‌شدن ناگهانی' } },
        ],
      },
    ],
  },

  // ── 9. CT-Dichtewerte (HE) ──────────────────────────────────
  {
    id: 'hu-werte', color: '#6366f1',
    name: { de: 'CT-Dichtewerte (HE)', en: 'CT Density Values (HU)', fa: 'مقادیر دانسیته CT (HU)' },
    groups: [
      {
        name: { de: 'Parenchymorgane', en: 'Parenchymal Organs', fa: 'اندام‌های پارانشیمی' },
        entries: [
          { s: { de: 'Leber (nativ)', en: 'Liver (unenhanced)', fa: 'کبد (بدون KM)' }, v: '65 ± 10 HE', h: { de: 'Steatose < 48 HE; Diff. Leber−Milz sollte > 10 HE sein', en: 'Steatosis < 48 HU; liver−spleen diff. should be > 10 HU', fa: 'استئاتوز < ۴۸؛ اختلاف کبد−طحال باید > ۱۰ باشد' } },
          { s: { de: 'Milz (nativ)', en: 'Spleen (unenhanced)', fa: 'طحال (بدون KM)' }, v: '45 ± 5 HE', h: { de: 'Normalerweise niedriger als Leber', en: 'Normally lower than liver', fa: 'معمولاً کمتر از کبد' } },
          { s: { de: 'Niere nativ / Rinde nach KM', en: 'Kidney unenhanced / cortex post-CM', fa: 'کلیه بدون KM / قشر پس از KM' }, v: '35–45 / ~140 HE', h: { de: 'Kortikomedullärer Ausgleich: 1 min; KM-Ausscheidung NBKS: 3 min', en: 'Corticomedullary equilibrium: 1 min; CM excretion: 3 min', fa: 'تعادل کورتیکومدولاری: ۱ دقیقه؛ دفع KM به NBKS: ۳ دقیقه' } },
          { s: { de: 'Pankreas (nativ)', en: 'Pancreas (unenhanced)', fa: 'پانکراس (بدون KM)' }, v: '40 ± 10 HE', h: { de: 'Lipomatöse Atrophie bei < 30 HE', en: 'Lipomatous atrophy if < 30 HU', fa: 'آتروفی چربی < ۳۰ HU' } },
          { s: { de: 'Nebennieren (nativ)', en: 'Adrenals (unenhanced)', fa: 'آدرنال‌ها (بدون KM)' }, v: '25–40 HE', h: { de: 'Adenom lipidreich: ≤ 10 HE; Phäochrom. oft > 20 HE', en: 'Lipid-rich adenoma: ≤ 10 HU; phaeochromocytoma often > 20 HU', fa: 'آدنوم غنی از لیپید ≤ ۱۰؛ فئوکروموسیتوم > ۲۰' } },
        ],
      },
      {
        name: { de: 'Fett & Muskulatur', en: 'Fat & Muscle', fa: 'چربی و عضله' },
        entries: [
          { s: { de: 'Fettgewebe', en: 'Fat tissue', fa: 'بافت چربی' }, v: '−65 bis −100 HE', h: { de: 'Subkutanes Fett: ca. −80 bis −120 HE', en: 'Subcutaneous fat: approx. −80 to −120 HU', fa: 'چربی زیرپوستی: حدود −۸۰ تا −۱۲۰' } },
          { s: { de: 'Muskulatur', en: 'Muscle', fa: 'عضله' }, v: '45 ± 5 HE', h: { de: 'Fettinfiltration (Sarkopenie) bei < 30 HE', en: 'Fat infiltration (sarcopenia) if < 30 HU', fa: 'نفوذ چربی (سارکوپنی) < ۳۰ HU' } },
        ],
      },
      {
        name: { de: 'Gefäße & Hohlorgane', en: 'Vessels & Hollow Organs', fa: 'عروق و اندام‌های توخالی' },
        entries: [
          { s: { de: 'Gefäße (nativ)', en: 'Vessels (unenhanced)', fa: 'عروق (بدون KM)' }, v: '40–55 HE', h: { de: 'Frische Thrombose: 50–70 HE; Kalk: > 130 HE', en: 'Fresh thrombus: 50–70 HU; calcium: > 130 HU', fa: 'ترومبوز تازه: ۵۰–۷۰؛ کلسیم: > ۱۳۰' } },
          { s: { de: 'Gallenblaseninhalt (nativ)', en: 'Gallbladder content (unenhanced)', fa: 'محتویات کیسه صفرا' }, v: '0–25 HE', h: { de: 'Gallensteine können isodens zur Galle sein', en: 'Gallstones may be isodense to bile', fa: 'سنگ صفرا ممکن است ایزودنس باشد' } },
          { s: { de: 'Bandscheibe (nativ)', en: 'Intervertebral disc (unenhanced)', fa: 'دیسک بین‌مهره‌ای' }, v: '70 ± 5 HE', h: { de: 'Degeneration → Dichteabnahme; Kalk → Anstieg', en: 'Degeneration → density loss; calcification → increase', fa: 'دژنراسیون → کاهش دانسیته؛ کلسیفیکاسیون → افزایش' } },
          { s: { de: 'Prostata (nativ)', en: 'Prostate (unenhanced)', fa: 'پروستات (بدون KM)' }, v: '40–65 HE', h: { de: 'Verkalkungen häufig bei älteren Männern', en: 'Calcifications common in older men', fa: 'کلسیفیکاسیون شایع در مردان مسن' } },
        ],
      },
    ],
  },
]

// ── Klassifikationen ─────────────────────────────────────────
// Jede item: { id, name, kompakt, ref, cols:[…], rows:[[…]] }
export const KLASSIFIKATIONEN = [
  {
    id: 'neuro', color: '#7c3aed', iconId: 'neuro',
    name: { de: 'Neuro', en: 'Neuro', fa: 'نورو' },
    items: [
      {
        id: 'fazekas',
        name: { de: 'Fazekas', en: 'Fazekas', fa: 'فازکاس' },
        kompakt: {
          de: 'Die Fazekas-Skala bewertet mikroangiopathische Marklagerveränderungen (White-Matter-Hyperintensitäten) in der MRT (FLAIR/T2). Sie ist ein Maß für die zerebrale Kleingefäßerkrankung und korreliert mit Schlaganfallrisiko, kognitiver Beeinträchtigung und zunehmendem Alter. Grad 0–3 richtet sich nach Anzahl und Konfluenz der Läsionen im periventrikulären und subkortikalen Marklager.',
          en: 'The Fazekas scale grades small-vessel white-matter hyperintensities (WMH) on MRI (FLAIR/T2). It measures cerebral microangiopathy and correlates with stroke risk, cognitive decline and advancing age. Grades 0–3 reflect the number and confluence of lesions in periventricular and subcortical white matter.',
          fa: 'مقیاس فازکاس ضایعات ماده سفید ناشی از بیماری عروق کوچک مغزی (White-Matter Hyperintensities) را در MRI (FLAIR/T2) درجه‌بندی می‌کند. با خطر سکته مغزی، اختلال شناختی و افزایش سن همبستگی دارد. درجه ۰–۳ بر اساس تعداد و همگرایی ضایعات در ماده سفید پریونتریکولار و زیرقشری تعیین می‌شود.',
        },
        ref: 'Fazekas et al., AJR 1987',
        cols: [{ de: 'Grad', en: 'Grade', fa: 'درجه' }, { de: 'Befund', en: 'Finding', fa: 'یافته' }],
        rows: [
          ['0', { de: 'Keine oder einzelne punktförmige Läsionen', en: 'None or single punctate lesions', fa: 'بدون یا یک ضایعه نقطه‌ای' }],
          ['1', { de: 'Mehrere punktförmige Läsionen', en: 'Multiple punctate lesions', fa: 'ضایعات نقطه‌ای متعدد' }],
          ['2', { de: 'Beginnende Konfluenz der Läsionen', en: 'Beginning confluence of lesions', fa: 'شروع همگرایی ضایعات' }],
          ['3', { de: 'Große konfluierende Läsionen', en: 'Large confluent lesions', fa: 'ضایعات بزرگ همگرا' }],
        ],
      },
      {
        id: 'aspects',
        name: { de: 'ASPECTS', en: 'ASPECTS', fa: 'ASPECTS' },
        kompakt: {
          de: 'ASPECTS (Alberta Stroke Program Early CT Score) quantifiziert frühe ischämische CT-Veränderungen im Versorgungsgebiet der A. cerebri media. Ausgehend von 10 Punkten wird pro befallener Hirnregion je 1 Punkt abgezogen. Ein ASPECTS ≤ 7 gilt als Hinweis auf einen ausgedehnten Infarkt und ist ein wichtiger Parameter bei der Entscheidung über i.v.-Lyse oder mechanische Thrombektomie.',
          en: 'ASPECTS (Alberta Stroke Program Early CT Score) quantifies early ischaemic CT changes in the MCA territory. Starting from 10 points, 1 point is deducted for each affected brain region. ASPECTS ≤ 7 indicates a large infarct and is a key parameter in deciding on IV thrombolysis or mechanical thrombectomy.',
          fa: 'ASPECTS تغییرات ایسکمیک اولیه CT در قلمرو شریان مغزی میانی (MCA) را کمّی می‌کند. با شروع از ۱۰ امتیاز، به ازای هر ناحیه مغزی درگیر یک امتیاز کسر می‌شود. ASPECTS ≤ ۷ نشانگر انفارکت وسیع و پارامتر کلیدی در تصمیم برای ترومبولیز یا ترومبکتومی مکانیکی است.',
        },
        ref: 'Barber et al., Lancet 2000',
        cols: [{ de: 'Region', en: 'Region', fa: 'ناحیه' }, { de: 'Wertung', en: 'Score', fa: 'امتیاز' }],
        rows: [
          [{ de: 'Ausgangswert', en: 'Baseline', fa: 'مقدار پایه' }, '10'],
          [{ de: 'Nucleus caudatus (C)', en: 'Caudate (C)', fa: 'هسته دمی (C)' }, '−1'],
          [{ de: 'Linsenkern (L)', en: 'Lentiform (L)', fa: 'هسته عدسی (L)' }, '−1'],
          [{ de: 'Capsula interna (IC)', en: 'Internal capsule (IC)', fa: 'کپسول داخلی (IC)' }, '−1'],
          [{ de: 'Inselrinde (I)', en: 'Insula (I)', fa: 'انسولا (I)' }, '−1'],
          [{ de: 'Kortexareale M1–M6', en: 'Cortical regions M1–M6', fa: 'نواحی قشری M1–M6' }, { de: 'je −1', en: '−1 each', fa: 'هر کدام −۱' }],
          [{ de: 'Interpretation', en: 'Interpretation', fa: 'تفسیر' }, { de: '≤ 7 = ungünstiges Outcome', en: '≤ 7 = unfavourable outcome', fa: '≤ ۷ = نتیجه نامطلوب' }],
        ],
      },
      {
        id: 'fisher',
        name: { de: 'Fisher-Skala', en: 'Fisher scale', fa: 'مقیاس فیشر' },
        kompakt: {
          de: 'Die Fisher-Skala klassifiziert Menge und Verteilung des subarachnoidalen Bluts im CT bei Subarachnoidalblutung (SAB). Sie ist ein wichtiger Prädiktor für das Vasospasmusrisiko, das 4–14 Tage nach dem Ereignis auftreten kann. Ein höherer Fisher-Grad korreliert mit stärkerem Vasospasmus und schlechterer Prognose.',
          en: 'The Fisher scale classifies blood volume and distribution on CT in subarachnoid haemorrhage (SAH). It is an important predictor of vasospasm risk, which can occur 4–14 days after the bleeding event. A higher grade correlates with more severe vasospasm and worse prognosis.',
          fa: 'مقیاس فیشر حجم و توزیع خون در CT در خونریزی زیرعنکبوتیه (SAH) را طبقه‌بندی می‌کند. پیش‌بینی‌کننده مهمی برای خطر وازواسپاسم است که ۴–۱۴ روز پس از خونریزی رخ می‌دهد. درجه بالاتر با وازواسپاسم شدیدتر و پیامد بدتر همبستگی دارد.',
        },
        ref: 'Fisher et al., Neurosurgery 1980',
        cols: [{ de: 'Grad', en: 'Grade', fa: 'درجه' }, { de: 'CT-Befund', en: 'CT finding', fa: 'یافته CT' }],
        rows: [
          ['1', { de: 'Kein Blut nachweisbar', en: 'No blood detected', fa: 'بدون خون قابل تشخیص' }],
          ['2', { de: 'Diffuse dünne SAB (< 1 mm)', en: 'Diffuse thin SAH (< 1 mm)', fa: 'SAH منتشر نازک (< ۱ mm)' }],
          ['3', { de: 'Lokalisierte/dicke SAB (> 1 mm)', en: 'Localised/thick SAH (> 1 mm)', fa: 'SAH موضعی/ضخیم (> ۱ mm)' }],
          ['4', { de: 'Intraventrikuläre / intrazerebrale Blutung', en: 'Intraventricular / intracerebral haemorrhage', fa: 'خونریزی داخل بطنی / داخل مغزی' }],
        ],
      },
      {
        id: 'hunt-hess',
        name: { de: 'Hunt & Hess', en: 'Hunt & Hess', fa: 'هانت و هس' },
        kompakt: {
          de: 'Der Hunt-&-Hess-Score bewertet den klinischen Schweregrad der Subarachnoidalblutung bei Aufnahme und korreliert direkt mit der Prognose sowie dem perioperativen Risiko. Zusammen mit der Fisher-Skala (radiologische Blutmenge) ist er die Grundlage für die Therapieentscheidung (Clipping vs. Coiling, Operationszeitpunkt).',
          en: 'The Hunt & Hess score assesses clinical severity of subarachnoid haemorrhage at admission and correlates directly with prognosis and perioperative risk. Together with the Fisher scale (imaging blood volume), it guides treatment decisions (clipping vs. coiling, timing of surgery).',
          fa: 'اسکور Hunt & Hess شدت بالینی SAH را هنگام بستری ارزیابی می‌کند و با پیامد و خطر پریاپراتیو همبستگی مستقیم دارد. به همراه مقیاس فیشر، اساس تصمیم‌گیری درمانی (کلیپینگ در مقابل کویلینگ، زمان جراحی) را تشکیل می‌دهد.',
        },
        ref: 'Hunt & Hess, J Neurosurg 1968',
        cols: [{ de: 'Grad', en: 'Grade', fa: 'درجه' }, { de: 'Klinik', en: 'Clinical', fa: 'بالین' }],
        rows: [
          ['1', { de: 'Asymptomatisch / leichter Kopfschmerz', en: 'Asymptomatic / mild headache', fa: 'بدون علامت / سردرد خفیف' }],
          ['2', { de: 'Starker Kopfschmerz, Meningismus, Hirnnervenausfall', en: 'Severe headache, meningismus, cranial nerve palsy', fa: 'سردرد شدید، منژیسم، فلج عصب کرانیال' }],
          ['3', { de: 'Somnolenz, leichtes fokales Defizit', en: 'Drowsiness, mild focal deficit', fa: 'خواب‌آلودگی، نقص کانونی خفیف' }],
          ['4', { de: 'Sopor, mäßige–schwere Hemiparese', en: 'Stupor, moderate–severe hemiparesis', fa: 'سوپور، همی‌پارزی متوسط تا شدید' }],
          ['5', { de: 'Koma, Strecksynergismen', en: 'Coma, extensor posturing', fa: 'کما، سینرژی اکستانسور' }],
        ],
      },
    ],
  },
  {
    id: 'thorax', color: '#0ea5e9', iconId: 'thorax',
    name: { de: 'Thorax / Lunge', en: 'Thorax / Lung', fa: 'توراکس / ریه' },
    items: [
      {
        id: 'lung-rads',
        name: { de: 'Lung-RADS', en: 'Lung-RADS', fa: 'Lung-RADS' },
        kompakt: {
          de: 'Lung-RADS (ACR) standardisiert Befundung und Management im Low-Dose-CT-Screening auf Lungenkrebs (Zielgruppe: Raucher > 20 Packungsjahre, Alter 55–80 J.). Jede Kategorie gibt nicht nur das Malignitätsrisiko an, sondern legt direkt die empfohlene Nachsorge fest – von jährlichem Screening über Kurzkontrolle bis zur Gewebesicherung.',
          en: 'Lung-RADS (ACR) standardises reporting and management in low-dose CT lung cancer screening (target group: smokers > 20 pack-years, age 55–80). Each category not only states the malignancy risk but directly specifies the recommended follow-up – from annual screening to short-interval CT to tissue sampling.',
          fa: 'Lung-RADS (ACR) گزارش‌دهی و مدیریت در CT دز پایین غربالگری سرطان ریه را استانداردسازی می‌کند. هر دسته نه‌تنها خطر بدخیمی بلکه پیگیری توصیه‌شده را نیز تعیین می‌کند – از غربالگری سالانه تا CT کوتاه‌مدت تا نمونه‌برداری.',
        },
        ref: 'ACR Lung-RADS v2022',
        einfach: {
          cols: [{ de: 'Kategorie', en: 'Category', fa: 'دسته' }, { de: 'Bedeutung', en: 'Meaning', fa: 'معنا' }],
          rows: [
            ['0', { de: 'Unvollständig', en: 'Incomplete', fa: 'ناقص' }],
            ['1', { de: 'Negativ – kein suspekter Befund', en: 'Negative – no suspicious finding', fa: 'منفی – بدون یافته مشکوک' }],
            ['2', { de: 'Benigne', en: 'Benign', fa: 'خوش‌خیم' }],
            ['3', { de: 'Wahrscheinlich benigne', en: 'Probably benign', fa: 'احتمالاً خوش‌خیم' }],
            ['4A', { de: 'Suspekt', en: 'Suspicious', fa: 'مشکوک' }],
            ['4B / 4X', { de: 'Hochsuspekt', en: 'Very suspicious', fa: 'بسیار مشکوک' }],
          ],
        },
        cols: [{ de: 'Kategorie', en: 'Category', fa: 'دسته' }, { de: 'Bedeutung', en: 'Meaning', fa: 'معنا' }, { de: 'Management', en: 'Management', fa: 'اقدام' }],
        rows: [
          ['0', { de: 'Unvollständig', en: 'Incomplete', fa: 'ناقص' }, { de: 'Voraufnahmen / Zusatz-CT', en: 'Prior imaging / additional CT', fa: 'تصاویر قبلی / CT تکمیلی' }],
          ['1', { de: 'Negativ', en: 'Negative', fa: 'منفی' }, { de: 'Jährliches Screening', en: 'Annual screening', fa: 'غربالگری سالانه' }],
          ['2', { de: 'Benigne', en: 'Benign', fa: 'خوش‌خیم' }, { de: 'Jährliches Screening', en: 'Annual screening', fa: 'غربالگری سالانه' }],
          ['3', { de: 'Wahrscheinlich benigne', en: 'Probably benign', fa: 'احتمالاً خوش‌خیم' }, { de: 'CT in 6 Monaten', en: 'CT in 6 months', fa: 'CT در ۶ ماه' }],
          ['4A', { de: 'Suspekt', en: 'Suspicious', fa: 'مشکوک' }, { de: 'CT in 3 Monaten / PET-CT', en: 'CT in 3 months / PET-CT', fa: 'CT در ۳ ماه / PET-CT' }],
          ['4B / 4X', { de: 'Hochsuspekt', en: 'Very suspicious', fa: 'بسیار مشکوک' }, { de: 'Gewebesicherung / PET-CT', en: 'Tissue sampling / PET-CT', fa: 'نمونه‌برداری / PET-CT' }],
        ],
      },
      {
        id: 'co-rads',
        name: { de: 'CO-RADS', en: 'CO-RADS', fa: 'CO-RADS' },
        kompakt: {
          de: 'CO-RADS standardisiert die CT-Befundung bei V.a. COVID-19-Pneumonie. Die 6 Kategorien spiegeln die Wahrscheinlichkeit einer COVID-19-typischen Lungenbeteiligung wider – von ‟unauffällig/nicht-infektiös" (1) bis ‟PCR-bestätigt" (6). Das System dient der einheitlichen Triage und Kommunikation zwischen Radiologie und Klinik.',
          en: 'CO-RADS standardises CT reporting in suspected COVID-19 pneumonia. The 6 categories reflect the probability of COVID-19-typical lung involvement – from ‟unremarkable/non-infectious" (1) to ‟PCR-confirmed" (6). The system facilitates uniform triage and communication between radiology and clinical teams.',
          fa: 'CO-RADS گزارش‌دهی CT در مشکوک بودن به پنومونی COVID-19 را استانداردسازی می‌کند. ۶ دسته احتمال درگیری ریوی تیپیک COVID-19 را نشان می‌دهند – از «طبیعی/غیرعفونی» (۱) تا «تایید PCR» (۶). این سیستم ارتباط یکنواخت بین رادیولوژی و بالین را تسهیل می‌کند.',
        },
        ref: 'Prokop et al., Radiology 2020',
        cols: [{ de: 'Kategorie', en: 'Category', fa: 'دسته' }, { de: 'Wahrscheinlichkeit', en: 'Probability', fa: 'احتمال' }],
        rows: [
          ['1', { de: 'Sehr niedrig (normal / nicht-infektiös)', en: 'Very low (normal / non-infectious)', fa: 'بسیار پایین (طبیعی / غیرعفونی)' }],
          ['2', { de: 'Niedrig (typisch andere Infektion)', en: 'Low (typical of other infection)', fa: 'پایین (تیپیک عفونت دیگر)' }],
          ['3', { de: 'Unklar / unspezifisch', en: 'Indeterminate / unspecific', fa: 'نامشخص / غیراختصاصی' }],
          ['4', { de: 'Hoch', en: 'High', fa: 'بالا' }],
          ['5', { de: 'Sehr hoch (typisches COVID-Muster)', en: 'Very high (typical COVID pattern)', fa: 'بسیار بالا (الگوی تیپیک COVID)' }],
          ['6', { de: 'PCR-bestätigt', en: 'PCR confirmed', fa: 'تأییدشده با PCR' }],
        ],
      },
      {
        id: 'fleischner',
        name: { de: 'Fleischner-Kriterien', en: 'Fleischner criteria', fa: 'معیار فلایشنر' },
        kompakt: {
          de: 'Die Fleischner-Gesellschaft-Leitlinien (2017) geben Empfehlungen zur Verlaufskontrolle inzidentell entdeckter Lungenrundherde nach Größe, Dichte (solid, Milchglas, part-solid) und Patientenrisiko. Sie gelten für Erwachsene ≥ 35 Jahre ohne bekanntes Malignom und reduzieren unnötige CT-Kontrollen bei gleichzeitig klaren Grenzen für invasivere Abklärungen.',
          en: 'The Fleischner Society guidelines (2017) recommend follow-up for incidentally detected pulmonary nodules based on size, density (solid, ground-glass, part-solid) and patient risk. They apply to adults ≥ 35 years without known malignancy and reduce unnecessary CT follow-ups while setting clear thresholds for more invasive workup.',
          fa: 'دستورالعمل‌های جامعه فلایشنر (۲۰۱۷) پیگیری ندول‌های ریوی کشف تصادفی را بر اساس اندازه، دانسیته (جامد، میلکی‌گلاس، نیمه‌جامد) و خطر بیمار توصیه می‌کنند. برای بزرگسالان ≥ ۳۵ سال بدون بدخیمی شناخته‌شده کاربرد داشته و CT‌های غیرضروری را کاهش می‌دهند.',
        },
        ref: 'MacMahon et al., Fleischner Society 2017',
        cols: [{ de: 'Rundherd', en: 'Nodule', fa: 'ندول' }, { de: 'Niedriges Risiko', en: 'Low risk', fa: 'خطر پایین' }, { de: 'Hohes Risiko', en: 'High risk', fa: 'خطر بالا' }],
        rows: [
          [{ de: 'Solide < 6 mm', en: 'Solid < 6 mm', fa: 'جامد < ۶ mm' }, { de: 'Keine Routinekontrolle', en: 'No routine follow-up', fa: 'بدون پیگیری روتین' }, { de: 'Optional CT 12 Mon.', en: 'Optional CT 12 mo', fa: 'CT اختیاری ۱۲ ماه' }],
          [{ de: 'Solide 6–8 mm', en: 'Solid 6–8 mm', fa: 'جامد ۶–۸ mm' }, { de: 'CT 6–12 Mon.', en: 'CT 6–12 mo', fa: 'CT ۶–۱۲ ماه' }, { de: 'CT 6–12, dann 18–24 Mon.', en: 'CT 6–12, then 18–24 mo', fa: 'CT ۶–۱۲، سپس ۱۸–۲۴ ماه' }],
          [{ de: 'Solide > 8 mm', en: 'Solid > 8 mm', fa: 'جامد > ۸ mm' }, { de: 'CT 3 Mon. / PET / Biopsie', en: 'CT 3 mo / PET / biopsy', fa: 'CT ۳ ماه / PET / بیوپسی' }, { de: 'CT 3 Mon. / PET / Biopsie', en: 'CT 3 mo / PET / biopsy', fa: 'CT ۳ ماه / PET / بیوپسی' }],
          [{ de: 'Milchglas ≥ 6 mm', en: 'Ground-glass ≥ 6 mm', fa: 'میلکی‌گلاس ≥ ۶ mm' }, { de: 'CT 6–12, dann alle 2 J.', en: 'CT 6–12, then q2y', fa: 'CT ۶–۱۲، سپس هر ۲ سال' }, { de: 'CT 6–12, dann alle 2 J.', en: 'CT 6–12, then q2y', fa: 'CT ۶–۱۲، سپس هر ۲ سال' }],
        ],
      },
    ],
  },
  {
    id: 'abdomen', color: '#f59e0b', iconId: 'abdomen',
    name: { de: 'Abdomen', en: 'Abdomen', fa: 'شکم' },
    items: [
      {
        id: 'li-rads',
        name: { de: 'LI-RADS', en: 'LI-RADS', fa: 'LI-RADS' },
        kompakt: {
          de: 'LI-RADS (ACR) standardisiert die CT- und MRT-Befundung hepatischer Läsionen bei Patienten mit erhöhtem HCC-Risiko (Leberzirrhose, chronische Hepatitis B, NASH-Zirrhose). Die Kategorien LR-1 bis LR-5 spiegeln die HCC-Wahrscheinlichkeit wider. LR-M bezeichnet maligne Läsionen ohne HCC-typisches Erscheinungsbild; LR-TIV einen Tumor mit intravaskulärer Ausbreitung.',
          en: 'LI-RADS (ACR) standardises CT and MRI reporting of hepatic lesions in patients at elevated HCC risk (liver cirrhosis, chronic HBV, NASH cirrhosis). Categories LR-1 to LR-5 reflect HCC probability. LR-M denotes malignancy without HCC-typical appearance; LR-TIV indicates tumour with intravascular extension.',
          fa: 'LI-RADS (ACR) گزارش CT و MRI ضایعات کبدی در بیماران با خطر بالای HCC (سیروز کبدی، HBV مزمن، سیروز NASH) را استانداردسازی می‌کند. دسته‌های LR-1 تا LR-5 احتمال HCC را منعکس می‌کنند. LR-M بدخیمی بدون نمای تیپیک HCC و LR-TIV تومور با گسترش داخل عروقی است.',
        },
        ref: 'ACR LI-RADS v2018',
        einfach: {
          cols: [{ de: 'Kategorie', en: 'Category', fa: 'دسته' }, { de: 'HCC-Wahrscheinlichkeit', en: 'HCC probability', fa: 'احتمال HCC' }],
          rows: [
            ['LR-1', { de: 'Definitiv benigne', en: 'Definitely benign', fa: 'قطعاً خوش‌خیم' }],
            ['LR-2', { de: 'Wahrscheinlich benigne', en: 'Probably benign', fa: 'احتمالاً خوش‌خیم' }],
            ['LR-3', { de: 'Intermediär', en: 'Intermediate', fa: 'بینابینی' }],
            ['LR-4', { de: 'Wahrscheinlich HCC', en: 'Probably HCC', fa: 'احتمالاً HCC' }],
            ['LR-5', { de: 'Definitiv HCC', en: 'Definitely HCC', fa: 'قطعاً HCC' }],
          ],
        },
        cols: [{ de: 'Kategorie', en: 'Category', fa: 'دسته' }, { de: 'Bedeutung', en: 'Meaning', fa: 'معنی' }],
        rows: [
          ['LR-1', { de: 'Definitiv benigne', en: 'Definitely benign', fa: 'قطعاً خوش‌خیم' }],
          ['LR-2', { de: 'Wahrscheinlich benigne', en: 'Probably benign', fa: 'احتمالاً خوش‌خیم' }],
          ['LR-3', { de: 'Intermediäre Wahrscheinlichkeit', en: 'Intermediate probability', fa: 'احتمال بینابینی' }],
          ['LR-4', { de: 'Wahrscheinlich HCC', en: 'Probably HCC', fa: 'احتمالاً HCC' }],
          ['LR-5', { de: 'Definitiv HCC', en: 'Definitely HCC', fa: 'قطعاً HCC' }],
          ['LR-M', { de: 'Maligne, nicht HCC-spezifisch', en: 'Malignant, not HCC-specific', fa: 'بدخیم، غیر اختصاصی برای HCC' }],
          ['LR-TIV', { de: 'Tumor im Gefäß (venös)', en: 'Tumour in vein', fa: 'تومور داخل عروقی (وریدی)' }],
        ],
      },
      {
        id: 'bosniak',
        name: { de: 'Bosniak', en: 'Bosniak', fa: 'بوسنیاک' },
        kompakt: {
          de: 'Bosniak (ACR 2019) klassifiziert zystische Nierenläsionen in CT und MRT nach dem Risiko einer Malignität (I–IV). Die Einteilung entscheidet direkt über das Management: Kategorien I und II sind benigne und brauchen keine Verlaufskontrolle; IIF erfordert Verlaufskontrollen; III und IV haben ein hohes Malignitätsrisiko und werden in der Regel operiert.',
          en: 'Bosniak (ACR 2019) classifies cystic renal lesions on CT and MRI by malignancy risk (I–IV). The category directly determines management: I and II are benign and need no follow-up; IIF requires imaging surveillance; III and IV carry high malignancy risk and are usually resected.',
          fa: 'بوسنیاک (ACR 2019) ضایعات کیستیک کلیه را در CT و MRI بر اساس خطر بدخیمی طبقه‌بندی می‌کند (I–IV). دسته مستقیماً نحوه مدیریت را تعیین می‌کند: I و II خوش‌خیم‌اند و نیاز به پیگیری ندارند؛ IIF نیاز به کنترل دوره‌ای دارد؛ III و IV خطر بدخیمی بالا دارند و معمولاً جراحی می‌شوند.',
        },
        ref: 'Silverman et al., Bosniak v2019',
        einfach: {
          cols: [{ de: 'Kategorie', en: 'Category', fa: 'دسته' }, { de: 'Malignitätsrisiko', en: 'Malignancy risk', fa: 'خطر بدخیمی' }, { de: 'Management', en: 'Management', fa: 'مدیریت' }],
          rows: [
            ['I', '~0 %', { de: 'Keine Kontrolle', en: 'No follow-up', fa: 'بدون پیگیری' }],
            ['II', { de: '< 2 %', en: '< 2%', fa: '< ۲٪' }, { de: 'Keine Kontrolle', en: 'No follow-up', fa: 'بدون پیگیری' }],
            ['IIF', '~5 %', { de: 'Verlaufskontrolle', en: 'Surveillance', fa: 'کنترل دوره‌ای' }],
            ['III', '~50 %', { de: 'OP erwägen', en: 'Consider resection', fa: 'در نظر گرفتن جراحی' }],
            ['IV', '~90 %', { de: 'OP / Ablation', en: 'Resection / ablation', fa: 'جراحی / ابلاسیون' }],
          ],
        },
        cols: [{ de: 'Kategorie', en: 'Category', fa: 'دسته' }, { de: 'Befund', en: 'Finding', fa: 'یافته' }, { de: 'Malignität', en: 'Malignancy', fa: 'بدخیمی' }],
        rows: [
          ['I', { de: 'Einfache Zyste – dünnwandig, keine Septen, kein KM, keine Verkalkung', en: 'Simple cyst – thin wall, no septa, no enhancement, no calcification', fa: 'کیست ساده – دیواره نازک، بدون سپتوم، تقویت یا کلسیفیکاسیون' }, '~0 %'],
          ['II', { de: 'Wenige (1–3) dünne Septen; zarte Verkalkung; subzentimetrische hyperattenuierende Zyste', en: 'Few (1–3) thin septa; fine calcification; sub-centimetre hyperattenuating cyst', fa: 'چند سپتوم نازک؛ کلسیفیکاسیون ظریف؛ کیست هایپرآتنوئیت زیر سانتی‌متر' }, { de: 'benigne', en: 'benign', fa: 'خوش‌خیم' }],
          ['IIF', { de: 'Minimal verdickte Wände/Septen, mehr Septen (≥ 4) – Verlaufskontrolle erforderlich', en: 'Minimally thickened walls/septa, ≥ 4 septa – imaging follow-up required', fa: 'دیواره/سپتوم کمی ضخیم، ≥ ۴ سپتوم – کنترل تصویربرداری لازم' }, '~5 %'],
          ['III', { de: 'Verdickte, unregelmäßige oder glatt KM-aufnehmende Wände/Septen', en: 'Thick, irregular or smoothly enhancing walls/septa', fa: 'دیواره/سپتوم ضخیم، نامنظم یا با تقویت صاف' }, '~50 %'],
          ['IV', { de: 'Solide, KM-aufnehmende Weichgewebskomponente unabhängig von Wand/Septen', en: 'Solid enhancing soft-tissue component independent of walls/septa', fa: 'جزء بافت نرم جامد با تقویت، مستقل از دیواره/سپتوم' }, '~90 %'],
        ],
      },
      {
        id: 'balthazar',
        name: { de: 'Balthazar / CTSI', en: 'Balthazar / CTSI', fa: 'بالتازار / CTSI' },
        kompakt: {
          de: 'Der CT-Severity-Index (CTSI) kombiniert den morphologischen Balthazar-Grad (A–E, 0–4 Punkte) mit dem Ausmaß der Pankreasnekrose (0–6 Punkte) zu einer Gesamtpunktzahl von 0–10. Ein CTSI ≥ 3 gilt als schwere Pankreatitis mit deutlich erhöhter Morbidität und Mortalität. Er ist das am weitesten verbreitete CT-basierte Scoring-System für die akute Pankreatitis.',
          en: 'The CT Severity Index (CTSI) combines the morphological Balthazar grade (A–E, 0–4 points) with the extent of pancreatic necrosis (0–6 points) into a total score of 0–10. A CTSI ≥ 3 indicates severe pancreatitis with significantly increased morbidity and mortality. It is the most widely used CT-based scoring system for acute pancreatitis.',
          fa: 'شاخص شدت CT (CTSI) درجه مورفولوژیک بالتازار (A–E، ۰–۴ امتیاز) را با میزان نکروز پانکراس (۰–۶ امتیاز) ترکیب می‌کند و امتیاز کل ۰–۱۰ را ایجاد می‌نماید. CTSI ≥ ۳ پانکراتیت شدید با افزایش قابل‌توجه عوارض و مرگ‌ومیر است. این پرکاربردترین سیستم امتیازدهی CT در پانکراتیت حاد است.',
        },
        ref: 'Balthazar et al., Radiology 1990',
        einfach: {
          cols: [{ de: 'Grad (Punkte)', en: 'Grade (points)', fa: 'درجه (امتیاز)' }, { de: 'CT-Befund', en: 'CT finding', fa: 'یافته CT' }],
          rows: [
            ['A (0)', { de: 'Normal', en: 'Normal', fa: 'طبیعی' }],
            ['B (1)', { de: 'Fokale/diffuse Vergrößerung', en: 'Focal/diffuse enlargement', fa: 'بزرگی کانونی/منتشر' }],
            ['C (2)', { de: 'Peripankreatische Entzündung', en: 'Peripancreatic inflammation', fa: 'التهاب پری‌پانکراتیک' }],
            ['D (3)', { de: 'Eine Flüssigkeitskollektion', en: 'Single fluid collection', fa: 'یک کلکسیون مایع' }],
            ['E (4)', { de: '≥ 2 Kollektionen oder Gas', en: '≥ 2 collections or gas', fa: '≥ ۲ کلکسیون یا گاز' }],
          ],
        },
        cols: [{ de: 'Grad / Punkte', en: 'Grade / points', fa: 'درجه / امتیاز' }, { de: 'Befund', en: 'Finding', fa: 'یافته' }],
        rows: [
          ['A (0)', { de: 'Normales Pankreas', en: 'Normal pancreas', fa: 'پانکراس طبیعی' }],
          ['B (1)', { de: 'Fokale/diffuse Vergrößerung', en: 'Focal/diffuse enlargement', fa: 'بزرگی کانونی یا منتشر' }],
          ['C (2)', { de: 'Peripankreatische Entzündung', en: 'Peripancreatic inflammation', fa: 'التهاب پری‌پانکراتیک' }],
          ['D (3)', { de: 'Eine Flüssigkeitskollektion', en: 'Single fluid collection', fa: 'یک کلکسیون مایع پری‌پانکراتیک' }],
          ['E (4)', { de: '≥ 2 Kollektionen oder Gas in Pankreas/peripankreatisch', en: '≥ 2 collections or gas in/around pancreas', fa: '≥ ۲ کلکسیون یا گاز در/اطراف پانکراس' }],
          [{ de: 'Nekrose (Zusatzpunkte)', en: 'Necrosis (add-on points)', fa: 'نکروز (امتیاز اضافی)' }, { de: '0 % → +0 · ≤ 30 % → +2 · ≤ 50 % → +4 · > 50 % → +6', en: '0% → +0 · ≤30% → +2 · ≤50% → +4 · >50% → +6', fa: '۰٪ → +۰ · ≤۳۰٪ → +۲ · ≤۵۰٪ → +۴ · >۵۰٪ → +۶' }],
        ],
      },
      {
        id: 'couinaud',
        name: { de: 'Couinaud-Segmente', en: 'Couinaud segments', fa: 'سگمان‌های کوینو' },
        kompakt: {
          de: 'Couinaud teilt die Leber in 8 funktionell unabhängige Segmente auf, von denen jedes eine eigene Pfortaderversorgung, Galleableitung und Lebervenendraigage besitzt. Die Segmentnomenklatur ist die Grundlage jeder hepatochirurgischen und interventionell-radiologischen Planung und wird in jedem CT-/MRT-Befund der Leber verwendet.',
          en: 'Couinaud divides the liver into 8 functionally independent segments, each with its own portal venous supply, biliary drainage and hepatic venous outflow. The nomenclature is the basis for all hepatic surgical and interventional planning and is used in every liver CT/MRI report.',
          fa: 'کوینو کبد را به ۸ سگمان مستقل عملکردی تقسیم می‌کند که هر کدام تأمین ورید پورت، زهکشی صفراوی و تخلیه ورید کبدی مجزا دارند. این نامگذاری پایه برنامه‌ریزی جراحی کبدی و مداخله‌ای رادیولوژیک است و در تمام گزارش‌های CT/MRI کبد به‌کار می‌رود.',
        },
        ref: 'Couinaud 1957',
        cols: [{ de: 'Segment', en: 'Segment', fa: 'سگمان' }, { de: 'Lage', en: 'Location', fa: 'موقعیت' }],
        rows: [
          ['I', { de: 'Lobus caudatus', en: 'Caudate lobe', fa: 'لوب دمی (کودات)' }],
          ['II', { de: 'Links lateral superior', en: 'Left lateral superior', fa: 'چپ خارجی فوقانی' }],
          ['III', { de: 'Links lateral inferior', en: 'Left lateral inferior', fa: 'چپ خارجی تحتانی' }],
          ['IVa / IVb', { de: 'Links medial', en: 'Left medial', fa: 'چپ میانی' }],
          ['V', { de: 'Rechts anterior inferior', en: 'Right anterior inferior', fa: 'راست قدامی تحتانی' }],
          ['VI', { de: 'Rechts posterior inferior', en: 'Right posterior inferior', fa: 'راست خلفی تحتانی' }],
          ['VII', { de: 'Rechts posterior superior', en: 'Right posterior superior', fa: 'راست خلفی فوقانی' }],
          ['VIII', { de: 'Rechts anterior superior', en: 'Right anterior superior', fa: 'راست قدامی فوقانی' }],
        ],
      },
      {
        id: 'cdd',
        name: { de: 'CDD-Klassifikation', en: 'CDD Classification', fa: 'طبقه‌بندی CDD' },
        kompakt: {
          de: 'Die Klassifikation der Divertikelkrankheit (CDD, DGAV/DGVS 2014) unterteilt die Divertikelkrankheit systematisch in fünf Haupttypen (0–4) und stützt sich dabei auf CT-Kriterien. Typ 0 ist asymptomatische Divertikulose, Typ 1 akute unkomplizierte Divertikulitis, Typ 2 akute komplizierte Divertikulitis (mit Subtypen für Mikro-/Makroabszess und freie Perforation), Typ 3 chronische Verläufe (inkl. SUDD) und Typ 4 die Divertikelblutung. Die CDD-Klassifikation ist Grundlage der deutschen Leitlinie und wird im CT-Befund direkt als Typisierung angegeben.',
          en: 'The Classification of Diverticular Disease (CDD, DGAV/DGVS 2014) systematically divides diverticular disease into five main types (0–4) based on CT criteria. Type 0 is asymptomatic diverticulosis, type 1 acute uncomplicated diverticulitis, type 2 acute complicated diverticulitis (with subtypes for micro-/macroabscess and free perforation), type 3 chronic disease (including SUDD) and type 4 diverticular bleeding. CDD is the basis of the German guideline and is stated directly as a classification in CT reports.',
          fa: 'طبقه‌بندی بیماری دیورتیکولی (CDD، DGAV/DGVS 2014) این بیماری را بر اساس معیارهای CT به پنج نوع اصلی (۰–۴) تقسیم می‌کند. نوع ۰ دیورتیکولوز بدون علامت، نوع ۱ دیورتیکولیت حاد بدون عارضه، نوع ۲ دیورتیکولیت حاد با عارضه (با زیرگروه‌های میکروآبسه، ماکروآبسه و پرفوراسیون آزاد)، نوع ۳ بیماری مزمن (شامل SUDD) و نوع ۴ خونریزی دیورتیکولی است. CDD پایه رهنمود آلمانی است و مستقیماً در گزارش CT ذکر می‌شود.',
        },
        einfach: {
          cols: [{ de: 'Typ', en: 'Type', fa: 'نوع' }, { de: 'Kategorie', en: 'Category', fa: 'دسته' }],
          rows: [
            ['0', { de: 'Asymptomatische Divertikulose', en: 'Asymptomatic diverticulosis', fa: 'دیورتیکولوز بدون علامت' }],
            ['1', { de: 'Akute unkomplizierte Divertikulitis', en: 'Acute uncomplicated diverticulitis', fa: 'دیورتیکولیت حاد بدون عارضه' }],
            ['2', { de: 'Akute komplizierte Divertikulitis', en: 'Acute complicated diverticulitis', fa: 'دیورتیکولیت حاد با عارضه' }],
            ['3', { de: 'Chronische Divertikelkrankheit', en: 'Chronic diverticular disease', fa: 'بیماری دیورتیکولی مزمن' }],
            ['4', { de: 'Divertikelblutung', en: 'Diverticular bleeding', fa: 'خونریزی دیورتیکولی' }],
          ],
        },
        ref: 'Leifeld et al., Z Gastroenterol 2014 · DGAV/DGVS-Leitlinie',
        cols: [{ de: 'Typ', en: 'Type', fa: 'نوع' }, { de: 'Befund', en: 'Finding', fa: 'یافته' }, { de: 'CT-Merkmal', en: 'CT feature', fa: 'یافته CT' }],
        rows: [
          ['0', { de: 'Asymptomatische Divertikulose', en: 'Asymptomatic diverticulosis', fa: 'دیورتیکولوز بدون علامت' }, { de: 'Divertikel ohne Entzündungszeichen', en: 'Diverticula without inflammation', fa: 'دیورتیکول بدون التهاب' }],
          ['1a', { de: 'Divertikulitis ohne Peridivertikulitis', en: 'Diverticulitis without peridiverticulitis', fa: 'دیورتیکولیت بدون پری‌دیورتیکولیت' }, { de: 'Lokale Wandverdickung', en: 'Local wall thickening', fa: 'ضخامت موضعی دیواره' }],
          ['1b', { de: 'Divertikulitis + Peridivertikulitis (Phlegmone)', en: 'Diverticulitis + peridiverticulitis (phlegmon)', fa: 'دیورتیکولیت + فلگمون پریکولیک' }, { de: 'Perikolische Fettgewebsreaktion', en: 'Pericolic fat stranding', fa: 'واکنش چربی پریکولیک' }],
          ['2a', { de: 'Gedeckte Perforation: Mikroabszess (≤ 1 cm)', en: 'Covered perforation: micro-abscess (≤ 1 cm)', fa: 'پرفوراسیون پوشیده: میکروآبسه' }, { de: 'Abszess ≤ 1 cm perikolisch', en: 'Abscess ≤ 1 cm pericolic', fa: 'آبسه ≤ ۱ سانتی‌متر پریکولیک' }],
          ['2b', { de: 'Gedeckte Perforation: Abszess (> 1 cm)', en: 'Covered perforation: abscess (> 1 cm)', fa: 'پرفوراسیون پوشیده: آبسه بزرگ' }, { de: 'Abszess > 1 cm, perikolisch / pelvin', en: 'Abscess > 1 cm, pericolic / pelvic', fa: 'آبسه > ۱ سانتی‌متر، پریکولیک / لگنی' }],
          ['2c', { de: 'Freie Perforation (Peritonitis)', en: 'Free perforation (peritonitis)', fa: 'پرفوراسیون آزاد (پریتونیت)' }, { de: 'Freie Luft und/oder freie Flüssigkeit', en: 'Free air and/or free fluid', fa: 'هوا یا مایع آزاد شکمی' }],
          ['3a', { de: 'SUDD – symptomatisch, unkompliziert', en: 'SUDD – symptomatic uncomplicated', fa: 'SUDD – علامت‌دار، بدون عارضه' }, { de: 'Keine akute Entzündung im CT', en: 'No acute inflammation on CT', fa: 'بدون التهاب حاد در CT' }],
          ['3b', { de: 'Rezidivierende Divertikulitis (unkompliziert)', en: 'Recurrent diverticulitis (uncomplicated)', fa: 'دیورتیکولیت عودکننده (بدون عارضه)' }, { de: 'Wandverdickung, Vornarben möglich', en: 'Wall thickening, prior scarring possible', fa: 'ضخامت دیواره، زخم قبلی محتمل' }],
          ['3c', { de: 'Rezidivierende Divertikulitis mit Komplikation', en: 'Recurrent diverticulitis with complication', fa: 'دیورتیکولیت عودکننده با عارضه' }, { de: 'Fistel, Stenose, entzündl. Konglomerattumor', en: 'Fistula, stenosis, inflammatory mass', fa: 'فیستول، تنگی، توده التهابی' }],
          ['4', { de: 'Divertikelblutung', en: 'Diverticular bleeding', fa: 'خونریزی دیورتیکولی' }, { de: 'Meist keine Entzündung; Divertikel hyperdense', en: 'Usually no inflammation; hyperdense diverticulum', fa: 'معمولاً بدون التهاب؛ دیورتیکول هایپردنس' }],
        ],
      },
    ],
  },
  {
    id: 'mamma-uro', color: '#ec4899', iconId: 'urogenital',
    name: { de: 'Mamma / Urogenital', en: 'Breast / Urogenital', fa: 'پستان / اوروژنیتال' },
    items: [
      {
        id: 'bi-rads',
        name: { de: 'BI-RADS', en: 'BI-RADS', fa: 'BI-RADS' },
        kompakt: {
          de: 'Einheitliche Einstufung von Mammografie, Brust-Ultraschall und Mamma-MRT. Jede Kategorie 0–6 sagt nicht nur, wie verdächtig ein Befund ist, sondern gibt direkt vor, was als Nächstes zu tun ist – von „Routine“ über „Kurzkontrolle in 6 Monaten“ bis „Biopsie“.',
          en: 'Unified assessment for mammography, breast ultrasound and breast MRI. Each category 0–6 not only states how suspicious a finding is but directly dictates the next step – from “routine” through “6-month short-interval follow-up” to “biopsy”.',
          fa: 'درجه‌بندی یکپارچه برای ماموگرافی، سونوگرافی و MRI پستان. هر دسته ۰–۶ نه‌تنها میزان شک به بدخیمی را نشان می‌دهد، بلکه اقدام بعدی را نیز مشخص می‌کند – از «روتین» تا «کنترل ۶ ماهه» و «بیوپسی».',
        },
        ref: 'ACR BI-RADS® Atlas, 5. Auflage (2013), D’Orsi et al.',
        cols: [{ de: 'Kat.', en: 'Cat.', fa: 'دسته' }, { de: 'Bedeutung', en: 'Meaning', fa: 'معنی' }, { de: 'Management', en: 'Management', fa: 'اقدام' }],
        rows: [
          ['0', { de: 'Unvollständig', en: 'Incomplete', fa: 'ناقص' }, { de: 'Zusatzdiagnostik', en: 'Additional imaging', fa: 'تصویربرداری تکمیلی' }],
          ['1', { de: 'Negativ', en: 'Negative', fa: 'منفی' }, { de: 'Routine', en: 'Routine', fa: 'روتین' }],
          ['2', { de: 'Benigne', en: 'Benign', fa: 'خوش‌خیم' }, { de: 'Routine', en: 'Routine', fa: 'روتین' }],
          ['3', { de: 'Wahrscheinlich benigne (< 2 %)', en: 'Probably benign (< 2%)', fa: 'احتمالاً خوش‌خیم (< ۲٪)' }, { de: 'Kontrolle in 6 Mon.', en: 'Short-interval 6-mo follow-up', fa: 'کنترل ۶ ماهه' }],
          ['4', { de: 'Suspekt (2–95 %)', en: 'Suspicious (2–95%)', fa: 'مشکوک (۲–۹۵٪)' }, { de: 'Biopsie', en: 'Biopsy', fa: 'بیوپسی' }],
          ['5', { de: 'Hochsuspekt (≥ 95 %)', en: 'Highly suspicious (≥ 95%)', fa: 'بسیار مشکوک (≥ ۹۵٪)' }, { de: 'Biopsie / Therapie', en: 'Biopsy / treatment', fa: 'بیوپسی / درمان' }],
          ['6', { de: 'Histologisch gesichertes Karzinom', en: 'Biopsy-proven malignancy', fa: 'بدخیمی اثبات‌شده' }, { de: 'Therapie', en: 'Treatment', fa: 'درمان' }],
        ],
        detail: [
          {
            stage: { de: 'Kategorie 0 – Unvollständig', en: 'Category 0 – Incomplete', fa: 'دسته ۰ – ناقص' },
            text: {
              de: 'Die Bildgebung reicht für eine endgültige Beurteilung nicht aus. Es werden Zusatzaufnahmen (z. B. Spot-Kompression, Vergrößerung, ergänzender Ultraschall) oder Voraufnahmen zum Vergleich benötigt. Es wird noch keine Risikoaussage getroffen.',
              en: 'Imaging is insufficient for a final assessment. Additional views (e.g. spot compression, magnification, supplementary ultrasound) or prior images for comparison are required. No risk statement is made yet.',
              fa: 'تصویربرداری برای ارزیابی نهایی کافی نیست. نماهای تکمیلی (مثل فشردگی موضعی، بزرگ‌نمایی، سونوگرافی) یا تصاویر قبلی برای مقایسه لازم است. هنوز اظهارنظر درباره خطر انجام نمی‌شود.',
            },
          },
          {
            stage: { de: 'Kategorie 1 – Unauffällig', en: 'Category 1 – Negative', fa: 'دسته ۱ – طبیعی' },
            text: {
              de: 'Kein pathologischer Befund: symmetrisches Drüsengewebe, keine Herde, keine verdächtigen Mikroverkalkungen, keine Architekturstörung. Malignitätsrisiko praktisch 0 %. Weiter im regulären Screening-Intervall.',
              en: 'No abnormal finding: symmetric fibroglandular tissue, no masses, no suspicious microcalcifications, no architectural distortion. Malignancy risk practically 0%. Continue routine screening interval.',
              fa: 'یافته غیرطبیعی وجود ندارد: بافت غده‌ای متقارن، بدون توده، بدون میکروکلسیفیکاسیون مشکوک. خطر بدخیمی عملاً ۰٪. ادامه غربالگری روتین.',
            },
          },
          {
            stage: { de: 'Kategorie 2 – Sicher benigne', en: 'Category 2 – Benign', fa: 'دسته ۲ – خوش‌خیم' },
            text: {
              de: 'Eindeutig gutartiger Befund, der benannt wird – z. B. einfache Zyste, verkalktes Fibroadenom, intramammärer Lymphknoten, Lipom, Ölzyste oder Implantat. 0 % Malignität, kein Handlungsbedarf außer Routine.',
              en: 'A clearly benign finding that is named – e.g. simple cyst, calcified fibroadenoma, intramammary lymph node, lipoma, oil cyst or implant. 0% malignancy, no action beyond routine.',
              fa: 'یافته آشکارا خوش‌خیم که نام‌گذاری می‌شود – مثل کیست ساده، فیبروآدنوم کلسیفیه، لنف‌نود داخل پستانی، لیپوم. بدخیمی ۰٪، فقط پیگیری روتین.',
            },
          },
          {
            stage: { de: 'Kategorie 3 – Wahrscheinlich benigne', en: 'Category 3 – Probably benign', fa: 'دسته ۳ – احتمالاً خوش‌خیم' },
            text: {
              de: 'Befund mit sehr geringem Malignitätsrisiko (≤ 2 %), z. B. ein solider, glatt begrenzter ovaler Herd, eine fokale Asymmetrie oder gruppierte runde Mikroverkalkungen. Statt Biopsie eine kurzfristige Verlaufskontrolle nach 6 Monaten, dann über insgesamt 2–3 Jahre. Bleibt der Befund stabil, wird er zu Kategorie 2.',
              en: 'Finding with very low malignancy risk (≤ 2%), e.g. a solid, circumscribed oval mass, focal asymmetry or grouped round microcalcifications. Instead of biopsy, short-interval follow-up at 6 months, then over a total of 2–3 years. If stable, it is downgraded to category 2.',
              fa: 'یافته با خطر بدخیمی بسیار پایین (≤ ۲٪)، مثل توده تو‌پر بیضی با حاشیه صاف. به‌جای بیوپسی، کنترل کوتاه‌مدت در ۶ ماه و سپس طی ۲–۳ سال. در صورت ثبات به دسته ۲ تبدیل می‌شود.',
            },
          },
          {
            stage: { de: 'Kategorie 4 – Suspekt (4A / 4B / 4C)', en: 'Category 4 – Suspicious (4A / 4B / 4C)', fa: 'دسته ۴ – مشکوک (4A/4B/4C)' },
            text: {
              de: 'Breites Spektrum mit 2–95 % Malignitätswahrscheinlichkeit – deshalb unterteilt: 4A gering verdächtig (2–10 %), 4B mäßig (10–50 %), 4C hoch (50–95 %). In jedem Fall ist eine histologische Sicherung (Stanz- oder Vakuumbiopsie) erforderlich.',
              en: 'Broad spectrum with 2–95% probability of malignancy – hence subdivided: 4A low suspicion (2–10%), 4B moderate (10–50%), 4C high (50–95%). In every case histological confirmation (core or vacuum biopsy) is required.',
              fa: 'طیف گسترده با احتمال بدخیمی ۲–۹۵٪ – به همین دلیل تقسیم می‌شود: 4A کم (۲–۱۰٪)، 4B متوسط (۱۰–۵۰٪)، 4C زیاد (۵۰–۹۵٪). در همه موارد بیوپسی لازم است.',
            },
          },
          {
            stage: { de: 'Kategorie 5 – Hochsuspekt', en: 'Category 5 – Highly suspicious', fa: 'دسته ۵ – بسیار مشکوک' },
            text: {
              de: 'Klassische Malignitätszeichen mit ≥ 95 % Karzinomwahrscheinlichkeit – z. B. spikulierter, irregulärer Herd oder feine pleomorphe, linear/segmental angeordnete Mikroverkalkungen. Biopsie und bereits parallele Therapieplanung.',
              en: 'Classic malignant features with ≥ 95% probability of cancer – e.g. a spiculated, irregular mass or fine pleomorphic, linear/segmental microcalcifications. Biopsy with treatment planning already in parallel.',
              fa: 'علائم کلاسیک بدخیمی با احتمال ≥ ۹۵٪ – مثل توده اسپیکوله یا میکروکلسیفیکاسیون پلئومورف خطی. بیوپسی همراه با برنامه‌ریزی درمان.',
            },
          },
          {
            stage: { de: 'Kategorie 6 – Gesichertes Karzinom', en: 'Category 6 – Proven malignancy', fa: 'دسته ۶ – بدخیمی اثبات‌شده' },
            text: {
              de: 'Das Karzinom ist bereits histologisch gesichert. Die Bildgebung dient der Therapieplanung bzw. der Verlaufskontrolle unter neoadjuvanter Behandlung vor der definitiven Operation.',
              en: 'The cancer is already biopsy-proven. Imaging serves treatment planning or monitoring under neoadjuvant therapy before definitive surgery.',
              fa: 'سرطان قبلاً با بیوپسی اثبات شده است. تصویربرداری برای برنامه‌ریزی درمان یا پایش طی درمان نئوادجوانت پیش از جراحی نهایی است.',
            },
          },
        ],
      },
      {
        id: 'pi-rads',
        name: { de: 'PI-RADS', en: 'PI-RADS', fa: 'PI-RADS' },
        kompakt: {
          de: 'Bewertet die multiparametrische Prostata-MRT und schätzt, wie wahrscheinlich ein klinisch signifikantes Karzinom vorliegt – Stufe 1 (sehr unwahrscheinlich) bis 5 (sehr wahrscheinlich). Welche Sequenz den Ausschlag gibt, hängt von der Zone ab: in der peripheren Zone die Diffusion (DWI/ADC), in der Transitionalzone das T2-Bild. Ab PI-RADS 3 wird eine gezielte Biopsie diskutiert.',
          en: 'Assesses multiparametric prostate MRI and estimates how likely a clinically significant cancer is – level 1 (very unlikely) to 5 (very likely). The dominant sequence depends on the zone: diffusion (DWI/ADC) in the peripheral zone, T2 in the transition zone. From PI-RADS 3 onwards a targeted biopsy is discussed.',
          fa: 'MRI چندپارامتری پروستات را ارزیابی می‌کند و احتمال سرطان مهم بالینی را تخمین می‌زند – از ۱ (بسیار بعید) تا ۵ (بسیار محتمل). توالی غالب به ناحیه بستگی دارد: در ناحیه محیطی DWI/ADC و در ناحیه انتقالی T2. از PI-RADS ۳ به بالا بیوپسی هدفمند مطرح می‌شود.',
        },
        ref: 'PI-RADS v2.1 (2019), Turkbey et al., Eur Urol',
        cols: [{ de: 'Kategorie', en: 'Category', fa: 'دسته' }, { de: 'Bedeutung', en: 'Meaning', fa: 'معنی' }],
        rows: [
          ['1', { de: 'Sehr niedrig', en: 'Very low', fa: 'بسیار پایین' }],
          ['2', { de: 'Niedrig', en: 'Low', fa: 'پایین' }],
          ['3', { de: 'Intermediär / unklar', en: 'Intermediate / equivocal', fa: 'بینابینی / نامشخص' }],
          ['4', { de: 'Hoch', en: 'High', fa: 'بالا' }],
          ['5', { de: 'Sehr hoch', en: 'Very high', fa: 'بسیار بالا' }],
          [{ de: 'Dominante Sequenz', en: 'Dominant sequence', fa: 'توالی غالب' }, { de: 'Periphere Zone → DWI · Transitionalzone → T2', en: 'Peripheral zone → DWI · Transition zone → T2', fa: 'ناحیه محیطی → DWI · ناحیه انتقالی → T2' }],
        ],
        detail: [
          {
            stage: { de: 'PI-RADS 1 – Sehr niedrig', en: 'PI-RADS 1 – Very low', fa: 'PI-RADS ۱ – بسیار پایین' },
            text: {
              de: 'Ein klinisch signifikantes Karzinom ist höchst unwahrscheinlich. Alle Sequenzen sind unauffällig, es zeigt sich keine fokale Läsion. Keine weitere Abklärung allein aufgrund der MRT.',
              en: 'A clinically significant cancer is highly unlikely. All sequences are unremarkable, no focal lesion. No further work-up based on MRI alone.',
              fa: 'سرطان مهم بالینی بسیار بعید است. همه توالی‌ها طبیعی‌اند و ضایعه کانونی دیده نمی‌شود. صرفاً بر اساس MRI نیازی به بررسی بیشتر نیست.',
            },
          },
          {
            stage: { de: 'PI-RADS 2 – Niedrig', en: 'PI-RADS 2 – Low', fa: 'PI-RADS ۲ – پایین' },
            text: {
              de: 'Ein signifikantes Karzinom ist unwahrscheinlich. Typisch sind unscharfe, keilförmige oder diffuse Signalveränderungen ohne klar abgrenzbaren Rundherd (z. B. bei benigner Prostatahyperplasie oder Prostatitis).',
              en: 'A significant cancer is unlikely. Typical are ill-defined, wedge-shaped or diffuse signal changes without a clearly delineated mass (e.g. benign prostatic hyperplasia or prostatitis).',
              fa: 'سرطان مهم بعید است. تغییرات سیگنال محو، گوه‌ای یا منتشر بدون توده مشخص (مثلاً در BPH یا پروستاتیت) شایع است.',
            },
          },
          {
            stage: { de: 'PI-RADS 3 – Intermediär / unklar', en: 'PI-RADS 3 – Intermediate / equivocal', fa: 'PI-RADS ۳ – بینابینی' },
            text: {
              de: 'Der Befund ist grenzwertig – ein signifikantes Karzinom ist möglich, aber nicht eindeutig. Hier helfen Zusatzkriterien weiter: PSA-Dichte (≥ 0,15 ng/ml² spricht für Biopsie), DCE-Enhancement in der peripheren Zone (kann auf 4 hochstufen) und der klinische Verlauf.',
              en: 'The finding is borderline – a significant cancer is possible but not clear-cut. Additional criteria help: PSA density (≥ 0.15 ng/ml² favours biopsy), DCE enhancement in the peripheral zone (may upgrade to 4) and clinical course.',
              fa: 'یافته مرزی است – سرطان مهم ممکن است اما قطعی نیست. معیارهای کمکی: چگالی PSA (≥ ۰٫۱۵ به نفع بیوپسی)، تقویت DCE در ناحیه محیطی (ممکن است به ۴ ارتقا دهد) و سیر بالینی.',
            },
          },
          {
            stage: { de: 'PI-RADS 4 – Hoch', en: 'PI-RADS 4 – High', fa: 'PI-RADS ۴ – بالا' },
            text: {
              de: 'Ein klinisch signifikantes Karzinom ist wahrscheinlich. Typisch ist eine fokale, klar abgrenzbare Läsion < 1,5 cm mit deutlicher Diffusionsrestriktion (peripher) bzw. eindeutigen Malignitätskriterien im T2 (Transitionalzone). Gezielte (fusionsgestützte) Biopsie.',
              en: 'A clinically significant cancer is likely. Typically a focal, clearly delineated lesion < 1.5 cm with marked diffusion restriction (peripheral) or clear malignant T2 criteria (transition zone). Targeted (fusion) biopsy.',
              fa: 'سرطان مهم بالینی محتمل است. معمولاً ضایعه کانونی مشخص < ۱٫۵ سانتی‌متر با محدودیت انتشار بارز (محیطی) یا معیارهای بدخیمی در T2 (ناحیه انتقالی). بیوپسی هدفمند.',
            },
          },
          {
            stage: { de: 'PI-RADS 5 – Sehr hoch', en: 'PI-RADS 5 – Very high', fa: 'PI-RADS ۵ – بسیار بالا' },
            text: {
              de: 'Ein signifikantes Karzinom ist sehr wahrscheinlich. Gleiche Kriterien wie PI-RADS 4, aber Läsion ≥ 1,5 cm oder mit Zeichen der extraprostatischen Ausbreitung. Biopsie und Staging (Lokalstaging, ggf. PSMA-PET).',
              en: 'A significant cancer is very likely. Same criteria as PI-RADS 4 but lesion ≥ 1.5 cm or with signs of extraprostatic extension. Biopsy and staging (local staging, possibly PSMA-PET).',
              fa: 'سرطان مهم بسیار محتمل است. معیارهای مشابه PI-RADS ۴ اما ضایعه ≥ ۱٫۵ سانتی‌متر یا با نشانه‌های گسترش خارج پروستات. بیوپسی و استیجینگ (احتمالاً PSMA-PET).',
            },
          },
        ],
      },
      {
        id: 'ti-rads',
        name: { de: 'TI-RADS (ACR)', en: 'TI-RADS (ACR)', fa: 'TI-RADS' },
        kompakt: {
          de: 'Punktbasiertes Ultraschall-System für Schilddrüsenknoten. Man vergibt Punkte in 5 Kategorien – Zusammensetzung, Echogenität, Form, Rand und echogene Foci – und addiert sie zu TR1–TR5. Aus der Gesamtpunktzahl und der Knotengröße ergibt sich direkt, ob eine Feinnadelpunktion (FNA) oder nur eine Verlaufskontrolle nötig ist.',
          en: 'A point-based ultrasound system for thyroid nodules. Points are assigned in 5 categories – composition, echogenicity, shape, margin and echogenic foci – and summed to TR1–TR5. The total points plus nodule size directly determine whether fine-needle aspiration (FNA) or only follow-up is needed.',
          fa: 'سیستم امتیازی سونوگرافی برای ندول‌های تیروئید. در ۵ دسته امتیاز داده می‌شود – ترکیب، اکوژنیسیته، شکل، حاشیه و کانون‌های اکوژنیک – و جمع آن‌ها TR1–TR5 را می‌سازد. مجموع امتیاز به‌همراه اندازه ندول مشخص می‌کند که FNA لازم است یا فقط پیگیری.',
        },
        ref: 'ACR TI-RADS (2017), Tessler et al., J Am Coll Radiol',
        cols: [{ de: 'Kategorie (Punkte)', en: 'Category (points)', fa: 'دسته (امتیاز)' }, { de: 'Risiko', en: 'Risk', fa: 'خطر' }, { de: 'FNA', en: 'FNA', fa: 'FNA' }],
        rows: [
          ['TR1 (0)', { de: 'Benigne', en: 'Benign', fa: 'خوش‌خیم' }, { de: 'Keine', en: 'None', fa: 'لازم نیست' }],
          ['TR2 (2)', { de: 'Nicht suspekt', en: 'Not suspicious', fa: 'غیرمشکوک' }, { de: 'Keine', en: 'None', fa: 'لازم نیست' }],
          ['TR3 (3)', { de: 'Mild suspekt', en: 'Mildly suspicious', fa: 'کمی مشکوک' }, { de: 'FNA ≥ 2,5 cm · Verlauf ≥ 1,5 cm', en: 'FNA ≥ 2.5 cm · follow ≥ 1.5 cm', fa: 'FNA ≥ ۲٫۵ cm · پیگیری ≥ ۱٫۵ cm' }],
          ['TR4 (4–6)', { de: 'Moderat suspekt', en: 'Moderately suspicious', fa: 'نسبتاً مشکوک' }, { de: 'FNA ≥ 1,5 cm · Verlauf ≥ 1 cm', en: 'FNA ≥ 1.5 cm · follow ≥ 1 cm', fa: 'FNA ≥ ۱٫۵ cm · پیگیری ≥ ۱ cm' }],
          ['TR5 (≥ 7)', { de: 'Hochsuspekt', en: 'Highly suspicious', fa: 'بسیار مشکوک' }, { de: 'FNA ≥ 1 cm · Verlauf ≥ 0,5 cm', en: 'FNA ≥ 1 cm · follow ≥ 0.5 cm', fa: 'FNA ≥ ۱ cm · پیگیری ≥ ۰٫۵ cm' }],
        ],
        detail: [
          {
            stage: { de: 'So wird gepunktet (5 Kategorien)', en: 'How points are assigned (5 categories)', fa: 'نحوه امتیازدهی (۵ دسته)' },
            text: {
              de: 'Zusammensetzung: zystisch/schwammartig 0, gemischt zystisch-solide 1, solide 2. Echogenität: anechogen 0, hyper-/isoechogen 1, hypoechogen 2, sehr echoarm 3. Form: breiter als hoch 0, höher als breit 3. Rand: glatt/unklar 0, lobuliert/irregulär 2, extrathyreoidale Ausbreitung 3. Echogene Foci: keine/Komet­schweif 0, Makroverkalkung 1, randständige Verkalkung 2, Punkt-Echogenitäten (Mikrokalk) 3. Alle Punkte werden addiert.',
              en: 'Composition: cystic/spongiform 0, mixed 1, solid 2. Echogenicity: anechoic 0, hyper-/isoechoic 1, hypoechoic 2, very hypoechoic 3. Shape: wider-than-tall 0, taller-than-wide 3. Margin: smooth/ill-defined 0, lobulated/irregular 2, extrathyroidal extension 3. Echogenic foci: none/comet-tail 0, macrocalcification 1, rim calcification 2, punctate echogenic foci (microcalc) 3. All points are summed.',
              fa: 'ترکیب: کیستیک/اسفنجی ۰، مختلط ۱، توپر ۲. اکوژنیسیته: آن‌اکوئیک ۰، هایپر/ایزو ۱، هایپو ۲، بسیار هایپو ۳. شکل: پهن‌تر از بلند ۰، بلندتر از پهن ۳. حاشیه: صاف/نامشخص ۰، لوبوله/نامنظم ۲، گسترش خارج تیروئید ۳. کانون اکوژنیک: هیچ/دم‌ستاره‌ای ۰، ماکروکلسیفیکاسیون ۱، حاشیه‌ای ۲، نقطه‌ای (میکروکلسیفیکاسیون) ۳. همه امتیازها جمع می‌شوند.',
            },
          },
          {
            stage: { de: 'TR1 (0 Punkte) – Benigne', en: 'TR1 (0 points) – Benign', fa: 'TR1 (۰ امتیاز) – خوش‌خیم' },
            text: {
              de: 'Gutartig, z. B. rein zystischer oder schwammartiger (spongiformer) Knoten. Keine Feinnadelpunktion, keine spezielle Verlaufskontrolle nötig.',
              en: 'Benign, e.g. purely cystic or spongiform nodule. No FNA and no special follow-up required.',
              fa: 'خوش‌خیم، مثل ندول کاملاً کیستیک یا اسفنجی. نه FNA و نه پیگیری ویژه لازم است.',
            },
          },
          {
            stage: { de: 'TR2 (2 Punkte) – Nicht suspekt', en: 'TR2 (2 points) – Not suspicious', fa: 'TR2 (۲ امتیاز) – غیرمشکوک' },
            text: {
              de: 'Nicht verdächtig. Keine Feinnadelpunktion und keine routinemäßige Verlaufskontrolle empfohlen.',
              en: 'Not suspicious. No FNA and no routine follow-up recommended.',
              fa: 'غیرمشکوک. نه FNA و نه پیگیری روتین توصیه می‌شود.',
            },
          },
          {
            stage: { de: 'TR3 (3 Punkte) – Mild suspekt', en: 'TR3 (3 points) – Mildly suspicious', fa: 'TR3 (۳ امتیاز) – کمی مشکوک' },
            text: {
              de: 'Gering verdächtig. Feinnadelpunktion erst ab einem Durchmesser ≥ 2,5 cm; Verlaufskontrolle ab ≥ 1,5 cm.',
              en: 'Mildly suspicious. FNA only from a diameter ≥ 2.5 cm; follow-up from ≥ 1.5 cm.',
              fa: 'کمی مشکوک. FNA فقط از قطر ≥ ۲٫۵ سانتی‌متر؛ پیگیری از ≥ ۱٫۵ سانتی‌متر.',
            },
          },
          {
            stage: { de: 'TR4 (4–6 Punkte) – Moderat suspekt', en: 'TR4 (4–6 points) – Moderately suspicious', fa: 'TR4 (۴–۶ امتیاز) – نسبتاً مشکوک' },
            text: {
              de: 'Mäßig verdächtig. Feinnadelpunktion ab ≥ 1,5 cm; Verlaufskontrolle ab ≥ 1 cm.',
              en: 'Moderately suspicious. FNA from ≥ 1.5 cm; follow-up from ≥ 1 cm.',
              fa: 'نسبتاً مشکوک. FNA از ≥ ۱٫۵ سانتی‌متر؛ پیگیری از ≥ ۱ سانتی‌متر.',
            },
          },
          {
            stage: { de: 'TR5 (≥ 7 Punkte) – Hochsuspekt', en: 'TR5 (≥ 7 points) – Highly suspicious', fa: 'TR5 (≥ ۷ امتیاز) – بسیار مشکوک' },
            text: {
              de: 'Hochgradig verdächtig (Malignitätsrisiko > 20 %). Feinnadelpunktion bereits ab ≥ 1 cm; Verlaufskontrolle ab ≥ 0,5 cm.',
              en: 'Highly suspicious (malignancy risk > 20%). FNA already from ≥ 1 cm; follow-up from ≥ 0.5 cm.',
              fa: 'بسیار مشکوک (خطر بدخیمی > ۲۰٪). FNA از ≥ ۱ سانتی‌متر؛ پیگیری از ≥ ۰٫۵ سانتی‌متر.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'msk', color: '#f97316', iconId: 'msk',
    name: { de: 'MSK', en: 'MSK', fa: 'اسکلتی-عضلانی' },
    items: [
      {
        id: 'pfirrmann',
        name: { de: 'Pfirrmann', en: 'Pfirrmann', fa: 'فیرمن' },
        kompakt: {
          de: 'Pfirrmann klassifiziert den Degenerationsgrad von Bandscheiben in der T2-MRT anhand von Signal, Struktur, Abgrenzung zwischen Anulus und Nucleus sowie Höhe der Bandscheibe – von Grad I (normal, hyperintens) bis Grad V (kollabiert, schwarz). Die Graduierung ist Standard für die Befundung degenerativer Wirbelsäulenveränderungen und fließt in OP-Indikationen und Forschungsstudien ein.',
          en: 'Pfirrmann classifies intervertebral disc degeneration on T2 MRI by signal intensity, structure, annulus-nucleus distinction and disc height – from grade I (normal, hyperintense) to grade V (collapsed, black). The grading is the standard for reporting degenerative spinal changes and informs surgical indications and research studies.',
          fa: 'فیرمن درجه دژنراسیون دیسک بین‌مهره‌ای را در T2 MRI بر اساس شدت سیگنال، ساختار، تمایز آنولوس-نوکلئوس و ارتفاع دیسک طبقه‌بندی می‌کند – از درجه I (طبیعی، هایپرانتنس) تا درجه V (تخریب کامل، سیاه). این درجه‌بندی استاندارد گزارش تغییرات دژنراتیو ستون فقرات است.',
        },
        ref: 'Pfirrmann et al., Spine 2001',
        cols: [{ de: 'Grad', en: 'Grade', fa: 'درجه' }, { de: 'Befund (T2)', en: 'Finding (T2)', fa: 'یافته (T2)' }],
        rows: [
          ['I', { de: 'Homogen hyperintens, normale Höhe', en: 'Homogeneous hyperintense, normal height', fa: 'همگن هایپرانتنس، ارتفاع طبیعی' }],
          ['II', { de: 'Inhomogen, klare Grenze Anulus/Nucleus', en: 'Inhomogeneous, clear annulus/nucleus border', fa: 'ناهمگن، مرز آنولوس/نوکلئوس واضح' }],
          ['III', { de: 'Inhomogen grau, leichte Höhenminderung', en: 'Inhomogeneous grey, mild height loss', fa: 'ناهمگن خاکستری، کاهش خفیف ارتفاع' }],
          ['IV', { de: 'Grau-schwarz, mäßige Höhenminderung', en: 'Grey-black, moderate height loss', fa: 'خاکستری-سیاه، کاهش متوسط ارتفاع' }],
          ['V', { de: 'Schwarz, Bandscheibenraum kollabiert', en: 'Black, collapsed disc space', fa: 'سیاه، فضای دیسک تخریب شده' }],
        ],
      },
      {
        id: 'modic',
        name: { de: 'Modic', en: 'Modic', fa: 'مودیک' },
        kompakt: {
          de: 'Modic-Veränderungen beschreiben reaktive Knochenmarkveränderungen an Wirbelkörperendplatten im MRT. Typ 1 entspricht einem Knochenmarködem (entzündlich/aktiv, T1 ↓ T2 ↑) und ist häufig mit akuten Rückenschmerzen assoziiert. Typ 2 zeigt eine fettige Umwandlung (chronisch, T1 ↑). Typ 3 entspricht sklerotischer Fibrose (T1 ↓ T2 ↓). Die Klassifikation ist klinisch relevant für die Differenzierung aktiver versus chronischer Beschwerden.',
          en: 'Modic changes describe reactive bone marrow changes at vertebral endplates on MRI. Type 1 is bone marrow oedema (inflammatory/active, T1 ↓ T2 ↑) and is frequently associated with acute back pain. Type 2 shows fatty conversion (chronic, T1 ↑). Type 3 corresponds to sclerotic fibrosis (T1 ↓ T2 ↓). The classification is clinically relevant for differentiating active from chronic symptoms.',
          fa: 'تغییرات مودیک تغییرات واکنشی مغز استخوان در صفحات انتهایی مهره‌ها را در MRI توصیف می‌کند. نوع ۱ ادم مغز استخوان (التهابی/فعال، T1↓ T2↑) است و اغلب با کمردرد حاد همراه است. نوع ۲ تبدیل چربی (مزمن، T1↑) و نوع ۳ فیبروز اسکلروتیک (T1↓ T2↓) می‌باشد. این طبقه‌بندی برای تمایز علائم فعال از مزمن اهمیت دارد.',
        },
        ref: 'Modic et al., Radiology 1988',
        cols: [{ de: 'Typ', en: 'Type', fa: 'نوع' }, { de: 'Substrat', en: 'Substrate', fa: 'بستر' }, { de: 'Signal (T1 / T2)', en: 'Signal (T1 / T2)', fa: 'سیگنال (T1 / T2)' }],
        rows: [
          ['1', { de: 'Ödem / Entzündung', en: 'Oedema / inflammation', fa: 'ادم / التهاب' }, 'T1 ↓ / T2 ↑'],
          ['2', { de: 'Fettige Degeneration', en: 'Fatty degeneration', fa: 'دژنراسیون چربی' }, 'T1 ↑ / T2 ↔–↑'],
          ['3', { de: 'Sklerose', en: 'Sclerosis', fa: 'اسکلروز' }, 'T1 ↓ / T2 ↓'],
        ],
      },
      {
        id: 'genant',
        name: { de: 'Genant', en: 'Genant', fa: 'ژنانت' },
        kompakt: {
          de: 'Die Genant-Klassifikation bewertet osteoporotische Wirbelkörperfrakturen semiquantitativ anhand der relativen Höhenminderung im Röntgenbild. Grad 0 = normal; Grad 1 = milde Fraktur (20–25 % Höhenverlust); Grad 2 = moderate Fraktur (25–40 %); Grad 3 = schwere Fraktur (> 40 %). Sie ist Standard in der osteoporotischen Frakturdiagnostik, bei DXA-Befunden und in Studien zur vertebralen Frakturdokumentation.',
          en: 'The Genant classification assesses osteoporotic vertebral fractures semi-quantitatively by the relative height loss on plain radiographs. Grade 0 = normal; grade 1 = mild fracture (20–25% height loss); grade 2 = moderate (25–40%); grade 3 = severe (> 40%). It is the standard in osteoporotic fracture assessment, DXA reports and vertebral fracture documentation in research.',
          fa: 'طبقه‌بندی ژنانت شکستگی‌های مهره‌ای استئوپروتیک را بر اساس کاهش نسبی ارتفاع در رادیوگرافی به‌صورت نیمه‌کمی ارزیابی می‌کند. درجه ۰ = طبیعی؛ درجه ۱ = شکستگی خفیف (۲۰–۲۵٪ کاهش ارتفاع)؛ درجه ۲ = متوسط (۲۵–۴۰٪)؛ درجه ۳ = شدید (> ۴۰٪). این استاندارد تشخیص شکستگی استئوپروتیک و مستندسازی در مطالعات است.',
        },
        ref: 'Genant et al., JBMR 1993',
        cols: [{ de: 'Grad', en: 'Grade', fa: 'درجه' }, { de: 'Höhenminderung', en: 'Height loss', fa: 'کاهش ارتفاع' }],
        rows: [
          ['0', { de: 'Normal', en: 'Normal', fa: 'طبیعی' }],
          ['1', { de: 'Mild – 20–25 %', en: 'Mild – 20–25%', fa: 'خفیف – ۲۰–۲۵٪' }],
          ['2', { de: 'Moderat – 25–40 %', en: 'Moderate – 25–40%', fa: 'متوسط – ۲۵–۴۰٪' }],
          ['3', { de: 'Schwer – > 40 %', en: 'Severe – > 40%', fa: 'شدید – > ۴۰٪' }],
        ],
      },
      {
        id: 'kellgren-lawrence',
        name: { de: 'Kellgren-Lawrence', en: 'Kellgren-Lawrence', fa: 'کلگرن-لارنس' },
        kompakt: {
          de: 'Kellgren-Lawrence ist die weltweit am häufigsten genutzte Einteilung für den radiologischen Schweregrad der Osteoarthrose, ursprünglich am Knie entwickelt, heute für alle Gelenke angewendet. Die Graduierung (0–4) basiert auf Osteophyten, Gelenkspaltverschmälerung, subchondraler Sklerose und Deformität. Ab Grad 2 wird die Arthrose als klinisch definitiv eingestuft. Standard in Röntgenbefunden und epidemiologischen Studien.',
          en: 'Kellgren-Lawrence is the most widely used classification for the radiographic severity of osteoarthritis, originally developed for the knee and now applied to all joints. Grading (0–4) is based on osteophytes, joint-space narrowing, subchondral sclerosis and deformity. From grade 2 onwards osteoarthritis is classified as clinically definite. Standard in radiology reports and epidemiological studies.',
          fa: 'کلگرن-لارنس پرکاربردترین طبقه‌بندی شدت رادیولوژیک استئوآرتریت است که ابتدا برای زانو طراحی شد و اکنون برای تمام مفاصل به‌کار می‌رود. درجه‌بندی (۰–۴) بر اساس استئوفیت، باریک‌شدن فضای مفصلی، اسکلروز زیر غضروفی و تغییر شکل است. از درجه ۲ به بالا آرتریت قطعی بالینی است.',
        },
        ref: 'Kellgren & Lawrence, ARD 1957',
        cols: [{ de: 'Grad', en: 'Grade', fa: 'درجه' }, { de: 'Befund', en: 'Finding', fa: 'یافته' }],
        rows: [
          ['0', { de: 'Keine Zeichen', en: 'No features', fa: 'بدون یافته' }],
          ['1', { de: 'Fragliche Osteophyten / Spaltverschmälerung', en: 'Doubtful osteophytes / joint-space narrowing', fa: 'استئوفیت مشکوک / باریک‌شدن مفصل' }],
          ['2', { de: 'Definitive Osteophyten, mögliche Verschmälerung', en: 'Definite osteophytes, possible narrowing', fa: 'استئوفیت قطعی، باریک‌شدن احتمالی' }],
          ['3', { de: 'Multiple Osteophyten, deutliche Verschmälerung, Sklerose', en: 'Multiple osteophytes, definite narrowing, sclerosis', fa: 'استئوفیت متعدد، باریک‌شدن واضح، اسکلروز' }],
          ['4', { de: 'Große Osteophyten, schwere Verschmälerung, Deformität', en: 'Large osteophytes, severe narrowing, deformity', fa: 'استئوفیت بزرگ، باریک‌شدن شدید، تغییر شکل' }],
        ],
      },
      {
        id: 'garden',
        name: { de: 'Garden', en: 'Garden', fa: 'گاردن' },
        kompakt: {
          de: 'Garden klassifiziert mediale Schenkelhalsfrakturen anhand des Ausmaßes der Dislokation (I–IV) im Röntgenbild. Entscheidend ist die klinische Zweiteilung: Grad I und II (nicht disloziert) werden häufig mit Osteosynthese behandelt; Grad III und IV (disloziert) haben ein hohes Risiko für Hüftkopfnekrose und erfordern meist eine Hemiprothese oder Totalprothese. Die Klassifikation ist Standard in der Trauma-Radiologie und Chirurgie.',
          en: 'Garden classifies medial femoral neck fractures by the degree of displacement (I–IV) on plain radiographs. The key clinical division is: grades I and II (non-displaced) are often treated with osteosynthesis; grades III and IV (displaced) carry high risk of avascular necrosis and usually require hemiarthroplasty or total hip replacement. The classification is standard in trauma radiology and surgery.',
          fa: 'گاردن شکستگی‌های گردن داخلی فمور را بر اساس میزان جابجایی (I–IV) در رادیوگرافی طبقه‌بندی می‌کند. تقسیم‌بندی کلینیکی کلیدی این است: درجه I و II (بدون جابجایی) اغلب با استئوسنتز درمان می‌شوند؛ درجه III و IV (دارای جابجایی) خطر بالای نکروز سر فمور دارند و معمولاً نیاز به پروتز دارند.',
        },
        ref: 'Garden, JBJS 1961',
        cols: [{ de: 'Grad', en: 'Grade', fa: 'درجه' }, { de: 'Befund', en: 'Finding', fa: 'یافته' }],
        rows: [
          ['I', { de: 'Inkomplett / valgus-impaktiert', en: 'Incomplete / valgus-impacted', fa: 'ناکامل / impakت والگوس' }],
          ['II', { de: 'Komplett, nicht disloziert', en: 'Complete, non-displaced', fa: 'کامل، بدون جابجایی' }],
          ['III', { de: 'Komplett, teilweise disloziert', en: 'Complete, partially displaced', fa: 'کامل، جابجایی جزئی' }],
          ['IV', { de: 'Komplett, vollständig disloziert', en: 'Complete, fully displaced', fa: 'کامل، جابجایی کامل' }],
        ],
      },
    ],
  },
  {
    id: 'onko', color: '#475569', iconId: 'hu-werte',
    name: { de: 'Onko / Allgemein', en: 'Onco / General', fa: 'انکولوژی / عمومی' },
    items: [
      {
        id: 'recist',
        name: { de: 'RECIST 1.1', en: 'RECIST 1.1', fa: 'RECIST 1.1' },
        kompakt: {
          de: 'RECIST 1.1 (Response Evaluation Criteria in Solid Tumours) ist der internationale Standard zur Beurteilung des Tumoransprechens auf eine systemische Therapie. Pro Patient werden maximal 5 Zielläsionen (max. 2 pro Organ, ≥ 10 mm Kurzachse bei LK, ≥ 10 mm Längsachse bei Weichteilläsionen) ausgewählt. Die prozentuale Veränderung der Summe der größten Durchmesser definiert CR, PR, SD oder PD. RECIST-Kategorien bestimmen, ob eine Studie primären Endpunkt erreicht hat.',
          en: 'RECIST 1.1 (Response Evaluation Criteria in Solid Tumours) is the international standard for assessing tumour response to systemic therapy. Up to 5 target lesions (max 2 per organ, ≥ 10 mm long axis for soft tissue, ≥ 10 mm short axis for lymph nodes) are selected per patient. The percentage change in the sum of longest diameters defines CR, PR, SD or PD. RECIST categories determine whether a study has met its primary endpoint.',
          fa: 'RECIST 1.1 (معیار ارزیابی پاسخ در تومورهای جامد) استاندارد بین‌المللی برای ارزیابی پاسخ تومور به درمان سیستمیک است. به ازای هر بیمار حداکثر ۵ ضایعه هدف (حداکثر ۲ در هر عضو، ≥ ۱۰ میلی‌متر) انتخاب می‌شود. درصد تغییر مجموع بزرگترین قطرها CR، PR، SD یا PD را تعریف می‌کند و به تعیین دستیابی به نقطه پایانی اولیه مطالعات کمک می‌کند.',
        },
        ref: 'Eisenhauer et al., EJC 2009',
        cols: [{ de: 'Ansprechen', en: 'Response', fa: 'پاسخ' }, { de: 'Kriterium', en: 'Criterion', fa: 'معیار' }],
        rows: [
          ['CR', { de: 'Verschwinden aller Zielläsionen', en: 'Disappearance of all target lesions', fa: 'ناپدید شدن همه ضایعات هدف' }],
          ['PR', { de: '≥ 30 % Abnahme der Summe der Durchmesser', en: '≥ 30% decrease in sum of diameters', fa: '≥ ۳۰٪ کاهش مجموع قطرها' }],
          ['SD', { de: 'Weder PR noch PD', en: 'Neither PR nor PD', fa: 'نه PR نه PD' }],
          ['PD', { de: '≥ 20 % Zunahme (und ≥ 5 mm) oder neue Läsion', en: '≥ 20% increase (and ≥ 5 mm) or new lesion', fa: '≥ ۲۰٪ افزایش (و ≥ ۵mm) یا ضایعه جدید' }],
        ],
      },
      {
        id: 'tnm',
        name: { de: 'TNM', en: 'TNM', fa: 'TNM' },
        kompakt: {
          de: 'Das TNM-System der UICC ist das universelle Staging-System für solide Tumoren. T beschreibt Tumorgröße und lokale Ausdehnung (T1–T4), N die regionären Lymphknoten (N0–N3) und M das Vorliegen von Fernmetastasen (M0/M1). Die Kombination aller drei Komponenten ergibt das Gesamtstadium (I–IV), das direkt Prognose und Therapiestrategie bestimmt. Für fast jeden Tumorentitäten existiert ein spezifisches TNM-Schema.',
          en: 'The UICC TNM system is the universal staging system for solid tumours. T describes tumour size and local extent (T1–T4), N the regional lymph nodes (N0–N3) and M the presence of distant metastasis (M0/M1). Combining all three components gives the overall stage (I–IV), which directly determines prognosis and treatment strategy. Almost every tumour entity has its own TNM scheme.',
          fa: 'سیستم TNM UICC سیستم استیجینگ جهانی برای تومورهای جامد است. T اندازه تومور و گسترش موضعی (T1–T4)، N غدد لنفاوی ناحیه‌ای (N0–N3) و M وجود متاستاز دور (M0/M1) را توصیف می‌کند. ترکیب هر سه مؤلفه مرحله کلی (I–IV) را می‌سازد که پیش‌آگهی و استراتژی درمانی را مستقیماً تعیین می‌کند.',
        },
        ref: 'UICC TNM, 8. Auflage',
        cols: [{ de: 'Komponente', en: 'Component', fa: 'مؤلفه' }, { de: 'Bedeutung', en: 'Meaning', fa: 'معنی' }],
        rows: [
          ['T', { de: 'Tumorgröße / -ausdehnung (T1–T4)', en: 'Tumour size / extent (T1–T4)', fa: 'اندازه / گسترش تومور (T1–T4)' }],
          ['N', { de: 'Regionäre Lymphknoten (N0–N3)', en: 'Regional lymph nodes (N0–N3)', fa: 'غدد لنفاوی ناحیه‌ای (N0–N3)' }],
          ['M', { de: 'Fernmetastasen (M0 / M1)', en: 'Distant metastasis (M0 / M1)', fa: 'متاستاز دور (M0 / M1)' }],
        ],
      },
      {
        id: 'deauville',
        name: { de: 'Deauville (PET)', en: 'Deauville (PET)', fa: 'دوویل (PET)' },
        kompakt: {
          de: 'Die Deauville-Kriterien sind eine 5-Punkte-Skala zur visuellen Beurteilung des metabolischen Ansprechens bei Lymphomen im FDG-PET/CT. Als interne Referenzstrukturen dienen Mediastinum (Score 2) und Leber (Score 3). Punkte 1–3 gelten in der Regel als komplette metabolische Remission (Ansprechen), Punkt 4–5 als partielles Ansprechen oder Progression. Die Kriterien sind in Lugano (2014) verbindlich für Hodgkin- und Non-Hodgkin-Lymphome festgelegt.',
          en: 'The Deauville criteria are a 5-point scale for visually assessing metabolic response in lymphomas on FDG-PET/CT. Internal reference structures are the mediastinum (score 2) and liver (score 3). Scores 1–3 are generally considered complete metabolic remission (response), scores 4–5 partial response or progression. The criteria are defined in the Lugano classification (2014) for Hodgkin and non-Hodgkin lymphomas.',
          fa: 'معیارهای دوویل یک مقیاس ۵ امتیازی برای ارزیابی بصری پاسخ متابولیک لنفوم‌ها در FDG-PET/CT است. مدیاستینوم (امتیاز ۲) و کبد (امتیاز ۳) به‌عنوان ساختارهای مرجع داخلی استفاده می‌شوند. امتیاز ۱–۳ معمولاً بهبود کامل متابولیک (پاسخ) و ۴–۵ پاسخ جزئی یا پیشرفت بیماری است. این معیارها در طبقه‌بندی لوگانو (۲۰۱۴) برای لنفوم‌های هوچکین و غیر هوچکین مشخص شده‌اند.',
        },
        ref: 'Deauville-Kriterien, Meignan 2009',
        cols: [{ de: 'Punkte', en: 'Score', fa: 'امتیاز' }, { de: 'FDG-Uptake', en: 'FDG uptake', fa: 'جذب FDG' }],
        rows: [
          ['1', { de: 'Kein Uptake', en: 'No uptake', fa: 'بدون جذب' }],
          ['2', { de: 'Uptake ≤ Mediastinum', en: 'Uptake ≤ mediastinum', fa: 'جذب ≤ مدیاستینوم' }],
          ['3', { de: 'Uptake > Mediastinum, ≤ Leber', en: 'Uptake > mediastinum, ≤ liver', fa: 'جذب > مدیاستینوم، ≤ کبد' }],
          ['4', { de: 'Uptake mäßig > Leber', en: 'Uptake moderately > liver', fa: 'جذب به‌طور متوسط > کبد' }],
          ['5', { de: 'Deutlich > Leber oder neue Läsionen', en: 'Markedly > liver or new lesions', fa: 'واضحاً > کبد یا ضایعات جدید' }],
        ],
      },
    ],
  },
]

// ── Rechner ──────────────────────────────────────────────────
export const RECHNER = [

  // 1. Prostatavolumen + PSA-Dichte (kombiniert)
  {
    id: 'prostata-psa', type: 'multi', color: '#0ea5e9',
    name: { de: 'Prostatavolumen + PSA-Dichte', en: 'Prostate Vol. + PSA Density', fa: 'حجم پروستات + PSA-Dichte' },
    formula: 'L × B × H × 0.523  ·  PSA ÷ Vol',
    hint: { de: 'Ellipsoid; PSA-Dichte ↑ Karzinom-Risiko ab ≥ 0,15 ng/ml²', en: 'Ellipsoid; PSA density ↑ cancer risk from ≥ 0.15 ng/ml²', fa: 'بیضی‌وار؛ چگالی PSA از ≥ ۰٫۱۵ خطر سرطان را افزایش می‌دهد' },
    fields: [
      { id: 'l',   label: { de: 'Länge', en: 'Length', fa: 'طول' },    unit: 'mm',    step: 1, min: 1, max: 150 },
      { id: 'b',   label: { de: 'Breite', en: 'Width', fa: 'عرض' },    unit: 'mm',    step: 1, min: 1, max: 150 },
      { id: 'h',   label: { de: 'Höhe', en: 'Height', fa: 'ارتفاع' },  unit: 'mm',    step: 1, min: 1, max: 150 },
      { id: 'psa', label: { de: 'PSA', en: 'PSA', fa: 'PSA' },         unit: 'ng/ml', step: 0.1, min: 0,   max: 1000 },
    ],
    outputs: [
      {
        label: { de: 'Volumen', en: 'Volume', fa: 'حجم' }, unit: 'ml', decimals: 1,
        calc: (v) => v.l && v.b && v.h ? v.l * v.b * v.h * 0.523 / 1000 : null,
        ranges: [
          { max: 20,       label: { de: '< 20 ml – Normal',           en: '< 20 ml – Normal',           fa: '< ۲۰ ml – نرمال' },       color: '#16a34a' },
          { max: 30,       label: { de: '20–30 ml – leicht vergr.',   en: '20–30 ml – mildly enlarged', fa: '۲۰–۳۰ ml – کمی بزرگ' },   color: '#ca8a04' },
          { max: 50,       label: { de: '30–50 ml – vergrößert',      en: '30–50 ml – enlarged',        fa: '۳۰–۵۰ ml – بزرگ‌شده' },  color: '#ea580c' },
          { max: Infinity, label: { de: '> 50 ml – stark vergr.',     en: '> 50 ml – markedly enlarged',fa: '> ۵۰ ml – بسیار بزرگ' },  color: '#dc2626' },
        ],
      },
      {
        label: { de: 'PSA-Dichte', en: 'PSA Density', fa: 'چگالی PSA' }, unit: 'ng/ml²', decimals: 3,
        calc: (v) => v.psa != null && v.psa !== '' && v.l && v.b && v.h ? v.psa * 1000 / (v.l * v.b * v.h * 0.523) : null,
        ranges: [
          { max: 0.10,     label: { de: '< 0,10 – niedrig',          en: '< 0.10 – low',         fa: '< ۰٫۱۰ – پایین' },     color: '#16a34a' },
          { max: 0.15,     label: { de: '0,10–0,15 – grenzwertig',   en: '0.10–0.15 – borderline',fa: '۰٫۱۰–۰٫۱۵ – مرزی' },  color: '#ca8a04' },
          { max: Infinity, label: { de: '≥ 0,15 – erhöht → Biopsie?',en: '≥ 0.15 – elevated',    fa: '≥ ۰٫۱۵ – بالا' },      color: '#dc2626' },
        ],
      },
    ],
  },

  // 2. Carotisstenose NASCET
  {
    id: 'nascet', type: 'single', color: '#dc2626',
    name: { de: 'Carotisstenose (NASCET)', en: 'Carotid Stenosis (NASCET)', fa: 'تنگی کاروتید (NASCET)' },
    formula: '(1 − D_st / D_dist) × 100',
    hint: { de: 'D_dist = normales ICA-Lumen distal der Stenose', en: 'D_dist = normal ICA lumen distal to the stenosis', fa: 'D_dist = لومن طبیعی ICA دیستال به تنگی' },
    fields: [
      { id: 'dst',  label: { de: 'Rest-Lumen (D_st)', en: 'Residual lumen (D_st)', fa: 'لومن باقی‌مانده' },  unit: 'mm', step: 0.1, min: 0,   max: 20 },
      { id: 'ddist',label: { de: 'Distal-Lumen (D_dist)', en: 'Distal lumen (D_dist)', fa: 'لومن دیستال' }, unit: 'mm', step: 0.1, min: 0.1, max: 20 },
    ],
    calc: (v) => v.dst != null && v.dst !== '' && v.ddist ? (1 - v.dst / v.ddist) * 100 : null,
    resultUnit: '%', decimals: 1,
    ranges: [
      { max: 50,       label: { de: '< 50 % – leichtgradige Stenose',                       en: '< 50% – low-grade',           fa: '< ۵۰٪ – خفیف' },           color: '#16a34a' },
      { max: 70,       label: { de: '50–70 % – mittelgradige Stenose',                      en: '50–70% – moderate',           fa: '۵۰–۷۰٪ – متوسط' },         color: '#ca8a04' },
      { max: 99,       label: { de: '70–99 % – hochgradig → OP-Indikation prüfen',          en: '70–99% – high-grade → surgery?',fa: '۷۰–۹۹٪ – شدید → جراحی؟' }, color: '#dc2626' },
      { max: Infinity, label: { de: '100 % – Verschluss',                                   en: '100% – occlusion',            fa: '۱۰۰٪ – انسداد' },           color: '#7f1d1d' },
    ],
  },

  // 3. ECST ↔ NASCET Umrechnung
  {
    id: 'ecst-nascet', type: 'conversion', color: '#7c3aed',
    name: { de: 'ECST ↔ NASCET Umrechnung', en: 'ECST ↔ NASCET Conversion', fa: 'تبدیل ECST ↔ NASCET' },
    formula: 'ECST = 0,6 × NASCET + 40',
    hint: { de: 'Rothwell et al. 1994 – Näherungsformel', en: 'Rothwell et al. 1994 – approximation formula', fa: 'Rothwell و همکاران ۱۹۹۴' },
    labelA: { de: 'NASCET', en: 'NASCET', fa: 'NASCET' },
    labelB: { de: 'ECST',   en: 'ECST',   fa: 'ECST' },
    unit: '%',
    calcAtoB: (a) => 0.6 * a + 40,    // NASCET → ECST
    calcBtoA: (b) => (b - 40) / 0.6,  // ECST → NASCET
  },

  // 4. ICB-Volumen ABC/2
  {
    id: 'icb', type: 'single', color: '#be185d',
    name: { de: 'ICB-Volumen (ABC/2)', en: 'ICH Volume (ABC/2)', fa: 'حجم خونریزی مغزی (ABC/2)' },
    formula: 'A × B × C ÷ 2',
    hint: { de: 'A = max. ⌀ (mm), B = ⊥ ⌀ (mm), C = Schichtanzahl × Schichtdicke (mm)', en: 'A = max ⌀ (mm), B = ⊥ ⌀ (mm), C = no. slices × slice thickness (mm)', fa: 'A = بیشترین قطر (mm), B = قطر عمود (mm), C = تعداد برش × ضخامت برش (mm)' },
    fields: [
      { id: 'a', label: { de: 'A (max. ⌀)', en: 'A (max ⌀)', fa: 'A (بیشترین قطر)' }, unit: 'mm', step: 1, min: 0, max: 200 },
      { id: 'b', label: { de: 'B (⊥ ⌀)',    en: 'B (⊥ ⌀)',    fa: 'B (قطر عمود)' },    unit: 'mm', step: 1, min: 0, max: 200 },
      { id: 'c', label: { de: 'C (Höhe)',    en: 'C (height)', fa: 'C (ارتفاع)' },       unit: 'mm', step: 1, min: 0, max: 200 },
    ],
    calc: (v) => v.a && v.b && v.c ? v.a * v.b * v.c / 2000 : null,
    resultUnit: 'ml', decimals: 1,
    ranges: [
      { max: 10,       label: { de: '< 10 ml – klein',                          en: '< 10 ml – small',              fa: '< ۱۰ ml – کوچک' },                         color: '#16a34a' },
      { max: 30,       label: { de: '10–30 ml – mittelgroß',                    en: '10–30 ml – medium',            fa: '۱۰–۳۰ ml – متوسط' },                        color: '#ca8a04' },
      { max: 60,       label: { de: '30–60 ml – groß',                          en: '30–60 ml – large',             fa: '۳۰–۶۰ ml – بزرگ' },                         color: '#ea580c' },
      { max: Infinity, label: { de: '> 60 ml – sehr groß · hohe Mortalität',   en: '> 60 ml – very large · high mortality', fa: '> ۶۰ ml – بسیار بزرگ · مرگ‌ومیر بالا' },  color: '#dc2626' },
    ],
  },

  // 5. RECIST 1.1 Verlauf
  {
    id: 'recist', type: 'recist', color: '#0d9488',
    name: { de: 'RECIST 1.1 – Verlauf', en: 'RECIST 1.1 – Response', fa: 'RECIST 1.1 – پاسخ درمانی' },
    formula: 'Δ% = (∑FU − ∑BL) / ∑BL × 100',
    hint: { de: 'PD: ≥ 20 % Zunahme UND ≥ 5 mm absolut — oder neue Läsion', en: 'PD: ≥ 20% increase AND ≥ 5 mm absolute — or new lesion', fa: 'PD: ≥ ۲۰٪ افزایش و ≥ ۵ mm مطلق — یا ضایعه جدید' },
    lbl: {
      bl:        { de: 'Baseline ∑ (mm)',  en: 'Baseline ∑ (mm)',   fa: 'پایه ∑ (mm)' },
      fu:        { de: 'Verlauf ∑ (mm)',   en: 'Follow-up ∑ (mm)', fa: 'پیگیری ∑ (mm)' },
      newLesion: { de: 'Neue Läsion',      en: 'New lesion',        fa: 'ضایعه جدید' },
    },
  },

  // 6. Kardiothorakaler Quotient
  {
    id: 'ktq', type: 'single', color: '#be185d',
    name: { de: 'Kardiothorak. Quotient (CTR)', en: 'Cardiothoracic Ratio (CTR)', fa: 'نسبت قلب‌به‌قفسه‌سینه (CTR)' },
    formula: 'CTR = Herzbreite ÷ Thoraxbreite',
    hint: { de: 'p.a.-Röntgen in tiefer Inspiration; CTR > 0,50 → Kardiomegalie', en: 'PA X-ray in deep inspiration; CTR > 0.50 → cardiomegaly', fa: 'رادیوگرافی PA در دم عمیق؛ CTR > ۰٫۵۰ → کاردیومگالی' },
    fields: [
      { id: 'hz', label: { de: 'Herzbreite',   en: 'Heart width',   fa: 'عرض قلب' },         unit: 'cm', step: 0.1, min: 0.1, max: 30 },
      { id: 'th', label: { de: 'Thoraxbreite', en: 'Thorax width',  fa: 'عرض قفسه‌سینه' }, unit: 'cm', step: 0.1, min: 0.1, max: 50 },
    ],
    calc: (v) => v.hz && v.th ? v.hz / v.th : null,
    resultUnit: '', decimals: 2,
    ranges: [
      { max: 0.50,     label: { de: '≤ 0,50 – Normal',         en: '≤ 0.50 – Normal',        fa: '≤ ۰٫۵۰ – نرمال' },      color: '#16a34a' },
      { max: 0.55,     label: { de: '0,50–0,55 – Grenzwertig', en: '0.50–0.55 – Borderline', fa: '۰٫۵۰–۰٫۵۵ – مرزی' },   color: '#ca8a04' },
      { max: Infinity, label: { de: '> 0,55 – Kardiomegalie',  en: '> 0.55 – Cardiomegaly',  fa: '> ۰٫۵۵ – کاردیومگالی' },color: '#dc2626' },
    ],
  },

  // 7. Meyerding – Spondylolisthesis
  {
    id: 'meyerding', type: 'single', color: '#f97316',
    name: { de: 'Meyerding – Spondylolisthesis', en: 'Meyerding – Spondylolisthesis', fa: 'مایردینگ – اسپوندیلولیستز' },
    formula: 'Slip % = Überhang ÷ S1-Breite × 100',
    hint: { de: 'Grad I: 0–25 % | II: 26–50 % | III: 51–75 % | IV: 76–100 % | V (Ptose): > 100 %', en: 'Grade I: 0–25% | II: 26–50% | III: 51–75% | IV: 76–100% | V (Ptosis): > 100%', fa: 'درجه I: ۰–۲۵٪ | II: ۲۶–۵۰٪ | III: ۵۱–۷۵٪ | IV: ۷۶–۱۰۰٪ | V: > ۱۰۰٪' },
    fields: [
      { id: 'slip',  label: { de: 'Überhang (LWK)', en: 'Slip distance',  fa: 'میزان لغزش' },    unit: 'mm', step: 0.5, min: 0,   max: 100 },
      { id: 'width', label: { de: 'S1-Deckpl. (AP)',en: 'S1 endplate AP', fa: 'پلاتوی S1 (AP)' },unit: 'mm', step: 0.5, min: 1,   max: 100 },
    ],
    calc: (v) => v.slip != null && v.slip !== '' && v.width ? v.slip / v.width * 100 : null,
    resultUnit: '%', decimals: 1,
    ranges: [
      { max: 25,       label: { de: 'Grad I (0–25 %)',                  en: 'Grade I (0–25%)',           fa: 'درجه I (۰–۲۵٪)' },              color: '#16a34a' },
      { max: 50,       label: { de: 'Grad II (26–50 %)',                en: 'Grade II (26–50%)',         fa: 'درجه II (۲۶–۵۰٪)' },            color: '#ca8a04' },
      { max: 75,       label: { de: 'Grad III (51–75 %)',               en: 'Grade III (51–75%)',        fa: 'درجه III (۵۱–۷۵٪)' },           color: '#ea580c' },
      { max: 100,      label: { de: 'Grad IV (76–100 %)',               en: 'Grade IV (76–100%)',        fa: 'درجه IV (۷۶–۱۰۰٪)' },           color: '#dc2626' },
      { max: Infinity, label: { de: 'Grad V – Spondyloptose (> 100 %)',en: 'Grade V – Spondyloptosis',  fa: 'درجه V – اسپوندیلوپتوز (> ۱۰۰٪)' }, color: '#7f1d1d' },
    ],
  },

  // 8. Fleischner-Assistent
  {
    id: 'fleischner', type: 'fleischner', color: '#0891b2',
    name: { de: 'Fleischner – Lungenrundherde', en: 'Fleischner – Pulmonary Nodule', fa: 'Fleischner – ندول ریوی' },
    formula: 'Fleischner Society Guidelines 2017',
    hint: { de: 'Gilt für zufällig entdeckte Rundherde, Erwachsene ≥ 35 J., kein bekanntes Malignom', en: 'Incidentally detected nodules, adults ≥ 35 y, no known malignancy', fa: 'برای ندول‌های تصادفی، بزرگسالان ≥ ۳۵ سال، بدون بدخیمی شناخته‌شده' },
    opts: {
      type: [
        { v: 'solid',     label: { de: 'Solid',          en: 'Solid',         fa: 'جامد' } },
        { v: 'ggo',       label: { de: 'Milchglas (GGO)',en: 'Ground-glass',  fa: 'میلکی‌گلس (GGO)' } },
        { v: 'partsolid', label: { de: 'Part-solid',     en: 'Part-solid',    fa: 'نیمه‌جامد' } },
      ],
      risk: [
        { v: 'low',  label: { de: 'Niedrig',en: 'Low',  fa: 'پایین' } },
        { v: 'high', label: { de: 'Hoch',   en: 'High', fa: 'بالا' } },
      ],
    },
    lbl: {
      nodeType:  { de: 'Herd-Typ',         en: 'Nodule type',      fa: 'نوع ندول' },
      size:      { de: 'Mittl. Größe',     en: 'Mean size',        fa: 'اندازه میانگین' },
      risk:      { de: 'Klinisches Risiko',en: 'Clinical risk',    fa: 'خطر بالینی' },
      solidComp: { de: 'Solid-Anteil',     en: 'Solid component',  fa: 'جز جامد' },
    },
  },
]

export const REF_DATA = { messwerte: MESSWERTE, klassifikationen: KLASSIFIKATIONEN, rechner: RECHNER }
