// ──────────────────────────────────────────────────────────────
// Wichtige Referenzen – Größen/Messwerte & Klassifikationen
// Orientierungswerte für den radiologischen Alltag.
// Struktur:
//   REF_DATA[tab] = [ { id, name:{de,en,fa}, color, entries:[ {s,v,h} ] } ]
//     s = Struktur/Name   (mehrsprachig {de,en,fa})
//     v = Wert/Stufen     (sprachneutraler String, z. B. "< 3 cm")
//     h = Hinweis/Bedeutung (mehrsprachig {de,en,fa})
// ──────────────────────────────────────────────────────────────

export const REF_COPY = {
  de: {
    label: '📌 Schnell nachschlagen',
    title: 'Wichtige Referenzen',
    sub: 'Normwerte, Größenkriterien und Klassifikationen – kompakt zum Nachschlagen.',
    tabs: { messwerte: 'Größen & Messwerte', klassifikationen: 'Klassifikationen' },
    search: 'Suchen … (z. B. Aorta, BI-RADS, Milz)',
    colStruktur: 'Struktur',
    colWert: 'Normwert',
    colHinweis: 'Hinweis / Grenzwert',
    colStufen: 'Stufen',
    colBedeutung: 'Bedeutung',
    chooseRegion: 'Bereich wählen',
    empty: 'Keine Treffer.',
    disclaimer: 'Orientierungswerte – stets im klinischen Kontext und nach lokalem Standard prüfen.',
    results: 'Treffer',
  },
  en: {
    label: '📌 Quick reference',
    title: 'Key References',
    sub: 'Normal values, size criteria and classifications – compact and quick to look up.',
    tabs: { messwerte: 'Sizes & Measurements', klassifikationen: 'Classifications' },
    search: 'Search … (e.g. aorta, BI-RADS, spleen)',
    colStruktur: 'Structure',
    colWert: 'Normal',
    colHinweis: 'Note / threshold',
    colStufen: 'Grades',
    colBedeutung: 'Meaning',
    chooseRegion: 'Choose area',
    empty: 'No results.',
    disclaimer: 'Orientation values – always verify in clinical context and per local standard.',
    results: 'results',
  },
  fa: {
    label: '📌 مرجع سریع',
    title: 'مراجع مهم',
    sub: 'مقادیر طبیعی، معیارهای اندازه و طبقه‌بندی‌ها – فشرده و سریع برای مرور.',
    tabs: { messwerte: 'اندازه‌ها و مقادیر', klassifikationen: 'طبقه‌بندی‌ها' },
    search: 'جستجو … (مثلاً آئورت، BI-RADS، طحال)',
    colStruktur: 'ساختار',
    colWert: 'مقدار طبیعی',
    colHinweis: 'نکته / حد آستانه',
    colStufen: 'درجات',
    colBedeutung: 'معنا',
    chooseRegion: 'انتخاب بخش',
    empty: 'نتیجه‌ای یافت نشد.',
    disclaimer: 'مقادیر تقریبی – همیشه در بافت بالینی و طبق استاندارد محلی بررسی شود.',
    results: 'نتیجه',
  },
}

// ── Tab 1: Größen & Messwerte ────────────────────────────────
const MESSWERTE = [
  {
    id: 'neuro',
    color: '#7c3aed',
    name: { de: 'Neuro / Kopf-Hals', en: 'Neuro / Head & Neck', fa: 'نورو / سر و گردن' },
    entries: [
      { s: { de: '3. Ventrikel', en: '3rd ventricle', fa: 'بطن سوم' }, v: '< 10 mm', h: { de: 'Erweitert bei Hydrozephalus', en: 'Dilated in hydrocephalus', fa: 'گشاد در هیدروسفالی' } },
      { s: { de: 'Evans-Index', en: 'Evans index', fa: 'شاخص ایوانز' }, v: '< 0,30', h: { de: 'Frontalhorn-Breite / max. Schädelbreite', en: 'Frontal horn / max. skull width', fa: 'شاخ فرونتال / حداکثر عرض جمجمه' } },
      { s: { de: 'Hypophyse (Höhe)', en: 'Pituitary (height)', fa: 'هیپوفیز (ارتفاع)' }, v: '≤ 9 mm', h: { de: 'Bis 12 mm in der Schwangerschaft', en: 'Up to 12 mm in pregnancy', fa: 'تا ۱۲ میلی‌متر در بارداری' } },
      { s: { de: 'Optikusscheide (ONSD)', en: 'Optic nerve sheath (ONSD)', fa: 'غلاف عصب بینایی' }, v: '< 5,7 mm', h: { de: 'Erhöht bei intrakraniellem Druck ↑', en: 'Raised with intracranial pressure ↑', fa: 'افزایش در فشار داخل جمجمه‌ای' } },
      { s: { de: 'Schilddrüsenlappen (Tiefe)', en: 'Thyroid lobe (depth)', fa: 'لوب تیروئید (عمق)' }, v: '< 2 cm', h: { de: 'a-p Durchmesser je Lappen', en: 'AP diameter per lobe', fa: 'قطر قدامی-خلفی هر لوب' } },
      { s: { de: 'Halslymphknoten (kurze Achse)', en: 'Cervical node (short axis)', fa: 'گره لنفاوی گردن (محور کوتاه)' }, v: '< 10 mm', h: { de: 'Jugulodigastrisch bis 11 mm', en: 'Jugulodigastric up to 11 mm', fa: 'ژوگولودیگاستریک تا ۱۱ میلی‌متر' } },
    ],
  },
  {
    id: 'thorax',
    color: '#0ea5e9',
    name: { de: 'Thorax', en: 'Thorax', fa: 'توراکس' },
    entries: [
      { s: { de: 'Aorta ascendens', en: 'Ascending aorta', fa: 'آئورت صعودی' }, v: '< 4,0 cm', h: { de: 'OP-Indikation ab ≥ 5,5 cm', en: 'Surgery from ≥ 5.5 cm', fa: 'اندیکاسیون جراحی از ۵٫۵ سانتی‌متر' } },
      { s: { de: 'Aorta descendens', en: 'Descending aorta', fa: 'آئورت نزولی' }, v: '< 3,0 cm', h: { de: 'Aneurysma ab ≥ 4 cm', en: 'Aneurysm from ≥ 4 cm', fa: 'آنوریسم از ۴ سانتی‌متر' } },
      { s: { de: 'Truncus pulmonalis', en: 'Pulmonary trunk', fa: 'تنه ریوی' }, v: '< 2,9 cm', h: { de: 'PH wahrscheinlich, wenn > Aorta asc.', en: 'PH likely if > ascending aorta', fa: 'احتمال PH اگر > آئورت صعودی' } },
      { s: { de: 'Trachea (quer)', en: 'Trachea (transverse)', fa: 'نای (عرضی)' }, v: '♂ ≤ 25 / ♀ ≤ 21 mm', h: { de: 'Tracheomegalie darüber', en: 'Tracheomegaly above', fa: 'تراکئومگالی بالاتر' } },
      { s: { de: 'Herz-Thorax-Quotient (Rö)', en: 'Cardiothoracic ratio (CXR)', fa: 'نسبت قلبی-قفسه‌ای' }, v: '< 0,5', h: { de: 'Nur im p.a.-Stehen verwertbar', en: 'Valid only on erect PA film', fa: 'فقط در نمای PA ایستاده معتبر' } },
      { s: { de: 'Lungenrundherd – Kontrolle', en: 'Pulmonary nodule – follow-up', fa: 'ندول ریوی – پیگیری' }, v: 'solide ≥ 8 mm', h: { de: 'Verlauf nach Fleischner-Kriterien', en: 'Follow Fleischner criteria', fa: 'طبق معیار فلایشنر' } },
    ],
  },
  {
    id: 'abdomen',
    color: '#f59e0b',
    name: { de: 'Abdomen', en: 'Abdomen', fa: 'شکم' },
    entries: [
      { s: { de: 'Aorta abdominalis', en: 'Abdominal aorta', fa: 'آئورت شکمی' }, v: '< 3,0 cm', h: { de: 'Aneurysma ab ≥ 3,0 cm; OP ≥ 5,5 cm', en: 'Aneurysm ≥ 3.0 cm; surgery ≥ 5.5 cm', fa: 'آنوریسم از ۳ سانتی‌متر؛ جراحی از ۵٫۵' } },
      { s: { de: 'Leber (MCL, kraniokaudal)', en: 'Liver (MCL, craniocaudal)', fa: 'کبد (طولی)' }, v: '≤ 15,5 cm', h: { de: 'Hepatomegalie darüber', en: 'Hepatomegaly above', fa: 'هپاتومگالی بالاتر' } },
      { s: { de: 'Milz (Länge)', en: 'Spleen (length)', fa: 'طحال (طول)' }, v: '≤ 12 cm', h: { de: 'Splenomegalie > 13 cm', en: 'Splenomegaly > 13 cm', fa: 'اسپلنومگالی > ۱۳ سانتی‌متر' } },
      { s: { de: 'Ductus choledochus (DHC)', en: 'Common bile duct', fa: 'مجرای صفراوی مشترک' }, v: '≤ 6 mm', h: { de: '+1 mm/Dekade > 60 J.; nach CHE bis 10 mm', en: '+1 mm/decade > 60 y; up to 10 mm post-chole', fa: '+۱ میلی‌متر در هر دهه > ۶۰ سال' } },
      { s: { de: 'Ductus pancreaticus', en: 'Pancreatic duct', fa: 'مجرای پانکراس' }, v: '≤ 3 mm', h: { de: 'Im Korpus gemessen', en: 'Measured in body', fa: 'اندازه‌گیری در تنه' } },
      { s: { de: 'Pfortader', en: 'Portal vein', fa: 'ورید پورت' }, v: '≤ 13 mm', h: { de: 'Erweitert bei portaler Hypertension', en: 'Dilated in portal hypertension', fa: 'گشاد در هایپرتانسیون پورت' } },
      { s: { de: 'Appendix', en: 'Appendix', fa: 'آپاندیس' }, v: '≤ 6 mm', h: { de: 'Appendizitis ab > 6 mm + Wandverdickung', en: 'Appendicitis > 6 mm + wall thickening', fa: 'آپاندیسیت > ۶ میلی‌متر + ضخامت دیواره' } },
    ],
  },
  {
    id: 'urogenital',
    color: '#e11d48',
    name: { de: 'Urogenital / Becken', en: 'Urogenital / Pelvis', fa: 'اوروژنیتال / لگن' },
    entries: [
      { s: { de: 'Niere (Länge)', en: 'Kidney (length)', fa: 'کلیه (طول)' }, v: '9–12 cm', h: { de: 'Seitendifferenz < 1,5 cm', en: 'Side difference < 1.5 cm', fa: 'اختلاف دو طرف < ۱٫۵ سانتی‌متر' } },
      { s: { de: 'Nebenniere (Schenkel)', en: 'Adrenal limb', fa: 'بازوی آدرنال' }, v: '< 10 mm', h: { de: 'Dicke einzelner Schenkel', en: 'Thickness of single limb', fa: 'ضخامت هر بازو' } },
      { s: { de: 'Prostata (Volumen)', en: 'Prostate (volume)', fa: 'پروستات (حجم)' }, v: '< 30 ml', h: { de: 'Vergrößerung bei BPH', en: 'Enlarged in BPH', fa: 'بزرگ در BPH' } },
      { s: { de: 'Endometrium (postmenopausal)', en: 'Endometrium (postmenopausal)', fa: 'آندومتر (یائسگی)' }, v: '< 5 mm', h: { de: 'Abklärung bei Blutung ab > 4–5 mm', en: 'Work-up if bleeding > 4–5 mm', fa: 'بررسی در خونریزی > ۴–۵ میلی‌متر' } },
      { s: { de: 'Ovar (prämenopausal, Vol.)', en: 'Ovary (premenopausal, vol.)', fa: 'تخمدان (پیش از یائسگی)' }, v: '< 10 ml', h: { de: 'Follikel physiologisch < 3 cm', en: 'Follicle physiological < 3 cm', fa: 'فولیکول فیزیولوژیک < ۳ سانتی‌متر' } },
      { s: { de: 'Harnblasenwand (gefüllt)', en: 'Bladder wall (full)', fa: 'دیواره مثانه (پر)' }, v: '< 3 mm', h: { de: 'Verdickt bei Obstruktion/Entzündung', en: 'Thickened in obstruction/inflammation', fa: 'ضخیم در انسداد/التهاب' } },
    ],
  },
  {
    id: 'gefaesse',
    color: '#dc2626',
    name: { de: 'Gefäße', en: 'Vessels', fa: 'عروق' },
    entries: [
      { s: { de: 'Aortenaneurysma abd.', en: 'Abdominal aortic aneurysm', fa: 'آنوریسم آئورت شکمی' }, v: 'OP ≥ 5,5 cm', h: { de: 'Frau ≥ 5,0 cm; rasches Wachstum > 1 cm/Jahr', en: 'Women ≥ 5.0 cm; rapid growth > 1 cm/yr', fa: 'زنان ≥ ۵ سانتی‌متر؛ رشد سریع > ۱ سانتی‌متر/سال' } },
      { s: { de: 'A. iliaca communis', en: 'Common iliac artery', fa: 'شریان ایلیاک مشترک' }, v: 'Aneurysma > 1,8 cm', h: { de: 'Normal ~1 cm', en: 'Normal ~1 cm', fa: 'طبیعی حدود ۱ سانتی‌متر' } },
      { s: { de: 'A. poplitea', en: 'Popliteal artery', fa: 'شریان پوپلیتئال' }, v: 'Aneurysma > 1,0 cm', h: { de: 'Häufig beidseitig', en: 'Often bilateral', fa: 'اغلب دوطرفه' } },
      { s: { de: 'V. cava inferior', en: 'Inferior vena cava', fa: 'ورید اجوف تحتانی' }, v: '~1,5–2,5 cm', h: { de: 'Atemvariabel; Volumenstatus', en: 'Respiratory variation; volume status', fa: 'تغییر تنفسی؛ وضعیت حجم' } },
      { s: { de: 'Milzarterienaneurysma', en: 'Splenic artery aneurysm', fa: 'آنوریسم شریان طحالی' }, v: 'Therapie > 2 cm', h: { de: 'In Schwangerschaft früher', en: 'Earlier in pregnancy', fa: 'زودتر در بارداری' } },
    ],
  },
  {
    id: 'msk',
    color: '#f97316',
    name: { de: 'MSK', en: 'MSK', fa: 'اسکلتی-عضلانی' },
    entries: [
      { s: { de: 'Spinalkanal lumbal (a-p)', en: 'Lumbar canal (AP)', fa: 'کانال نخاعی کمری' }, v: '< 12 mm relativ', h: { de: '< 10 mm absolute Stenose', en: '< 10 mm absolute stenosis', fa: '< ۱۰ میلی‌متر تنگی مطلق' } },
      { s: { de: 'Atlanto-dentaler Abstand (ADI)', en: 'Atlanto-dental interval', fa: 'فاصله اطلانتو-دنتال' }, v: '♂ < 3 / Kind < 5 mm', h: { de: 'Erhöht bei C1/C2-Instabilität', en: 'Raised in C1/C2 instability', fa: 'افزایش در ناپایداری C1/C2' } },
      { s: { de: 'Akromiohumeraler Abstand', en: 'Acromiohumeral distance', fa: 'فاصله آکرومیوهومرال' }, v: '7–14 mm', h: { de: '< 7 mm: Rotatorenmanschettenschaden', en: '< 7 mm: rotator cuff tear', fa: '< ۷ میلی‌متر: پارگی روتاتور کاف' } },
      { s: { de: 'Achillessehne (Dicke)', en: 'Achilles tendon (thickness)', fa: 'تاندون آشیل (ضخامت)' }, v: '< 6 mm', h: { de: 'Tendinopathie darüber', en: 'Tendinopathy above', fa: 'تاندینوپاتی بالاتر' } },
      { s: { de: 'Insall-Salvati-Index', en: 'Insall-Salvati index', fa: 'شاخص اینسال-سالواتی' }, v: '0,8–1,2', h: { de: '> 1,2 Patella alta, < 0,8 Patella baja', en: '> 1.2 patella alta, < 0.8 baja', fa: '> ۱٫۲ پاتلا آلتا، < ۰٫۸ باجا' } },
    ],
  },
]

// ── Tab 2: Klassifikationen ──────────────────────────────────
const KLASSIFIKATIONEN = [
  {
    id: 'neuro',
    color: '#7c3aed',
    name: { de: 'Neuro', en: 'Neuro', fa: 'نورو' },
    entries: [
      { s: { de: 'Fazekas', en: 'Fazekas', fa: 'فازکاس' }, v: 'Grad 0–3', h: { de: 'Mikroangiopathie / Marklagerläsionen (WM)', en: 'Small-vessel white-matter lesions', fa: 'ضایعات ماده سفید عروق ریز' } },
      { s: { de: 'ASPECTS', en: 'ASPECTS', fa: 'ASPECTS' }, v: '10 → 0', h: { de: 'Mediainfarkt-Frühzeichen; ≤ 7 ungünstig', en: 'Early MCA infarct; ≤ 7 unfavourable', fa: 'انفارکت زودرس MCA؛ ≤ ۷ نامطلوب' } },
      { s: { de: 'Fisher-Skala', en: 'Fisher scale', fa: 'مقیاس فیشر' }, v: 'Grad 1–4', h: { de: 'Blutmenge bei SAB (Vasospasmus-Risiko)', en: 'SAH blood volume (vasospasm risk)', fa: 'حجم خون SAH (خطر وازواسپاسم)' } },
      { s: { de: 'Hunt & Hess', en: 'Hunt & Hess', fa: 'هانت و هس' }, v: 'Grad 1–5', h: { de: 'Klinischer Schweregrad der SAB', en: 'Clinical SAH severity', fa: 'شدت بالینی SAH' } },
      { s: { de: 'Spetzler-Martin', en: 'Spetzler-Martin', fa: 'اسپتزلر-مارتین' }, v: '1–5 Punkte', h: { de: 'AVM-Risikograduierung', en: 'AVM grading', fa: 'درجه‌بندی AVM' } },
    ],
  },
  {
    id: 'thorax',
    color: '#0ea5e9',
    name: { de: 'Thorax / Lunge', en: 'Thorax / Lung', fa: 'توراکس / ریه' },
    entries: [
      { s: { de: 'Lung-RADS', en: 'Lung-RADS', fa: 'Lung-RADS' }, v: '0–4X', h: { de: 'Lungenkrebs-Screening (Rundherde)', en: 'Lung cancer screening (nodules)', fa: 'غربالگری سرطان ریه' } },
      { s: { de: 'CO-RADS', en: 'CO-RADS', fa: 'CO-RADS' }, v: '1–6', h: { de: 'COVID-19-Wahrscheinlichkeit im CT', en: 'COVID-19 probability on CT', fa: 'احتمال کووید-۱۹ در سی‌تی' } },
      { s: { de: 'Fleischner-Kriterien', en: 'Fleischner criteria', fa: 'معیار فلایشنر' }, v: 'Verlaufsregeln', h: { de: 'Management inzidenteller Lungenrundherde', en: 'Incidental pulmonary nodule management', fa: 'مدیریت ندول‌های اتفاقی ریه' } },
      { s: { de: 'Bhalla-Score', en: 'Bhalla score', fa: 'امتیاز بهالا' }, v: 'Schweregrad', h: { de: 'Ausmaß der Bronchiektasen im HRCT', en: 'Bronchiectasis severity on HRCT', fa: 'شدت برونشکتازی در HRCT' } },
    ],
  },
  {
    id: 'abdomen',
    color: '#f59e0b',
    name: { de: 'Abdomen', en: 'Abdomen', fa: 'شکم' },
    entries: [
      { s: { de: 'LI-RADS', en: 'LI-RADS', fa: 'LI-RADS' }, v: 'LR-1 … LR-5, LR-M', h: { de: 'HCC-Wahrscheinlichkeit bei Risikopatienten', en: 'HCC probability in at-risk patients', fa: 'احتمال HCC در بیماران پرخطر' } },
      { s: { de: 'Bosniak', en: 'Bosniak', fa: 'بوسنیاک' }, v: 'I, II, IIF, III, IV', h: { de: 'Malignitätsrisiko von Nierenzysten', en: 'Malignancy risk of renal cysts', fa: 'خطر بدخیمی کیست کلیه' } },
      { s: { de: 'Balthazar / CTSI', en: 'Balthazar / CTSI', fa: 'بالتازار / CTSI' }, v: 'A–E / 0–10', h: { de: 'Schweregrad der akuten Pankreatitis', en: 'Acute pancreatitis severity', fa: 'شدت پانکراتیت حاد' } },
      { s: { de: 'O-RADS (MRT/US)', en: 'O-RADS (MRI/US)', fa: 'O-RADS' }, v: '0–5', h: { de: 'Adnex-/Ovarialläsionen', en: 'Adnexal / ovarian lesions', fa: 'ضایعات آدنکس / تخمدان' } },
      { s: { de: 'Couinaud-Segmente', en: 'Couinaud segments', fa: 'سگمان‌های کوینو' }, v: 'I–VIII', h: { de: 'Anatomische Lebersegmenteinteilung', en: 'Anatomical liver segmentation', fa: 'تقسیم‌بندی آناتومیک کبد' } },
    ],
  },
  {
    id: 'mamma-uro',
    color: '#ec4899',
    name: { de: 'Mamma / Urogenital', en: 'Breast / Urogenital', fa: 'پستان / اوروژنیتال' },
    entries: [
      { s: { de: 'BI-RADS', en: 'BI-RADS', fa: 'BI-RADS' }, v: '0–6', h: { de: 'Mammographie/Sono/MRT; Malignitätsrisiko', en: 'Mammo/US/MRI; malignancy risk', fa: 'ماموگرافی/سونو/MRI؛ خطر بدخیمی' } },
      { s: { de: 'PI-RADS', en: 'PI-RADS', fa: 'PI-RADS' }, v: '1–5', h: { de: 'Prostata-MRT; klinisch signifikantes Ca', en: 'Prostate MRI; clinically significant cancer', fa: 'MRI پروستات؛ سرطان مهم بالینی' } },
      { s: { de: 'TI-RADS (ACR)', en: 'TI-RADS (ACR)', fa: 'TI-RADS' }, v: 'TR1–TR5', h: { de: 'Schilddrüsenknoten; Punktionsbedarf', en: 'Thyroid nodule; FNA need', fa: 'ندول تیروئید؛ نیاز به FNA' } },
    ],
  },
  {
    id: 'msk',
    color: '#f97316',
    name: { de: 'MSK', en: 'MSK', fa: 'اسکلتی-عضلانی' },
    entries: [
      { s: { de: 'Pfirrmann', en: 'Pfirrmann', fa: 'فیرمن' }, v: 'I–V', h: { de: 'Bandscheibendegeneration (MRT)', en: 'Disc degeneration (MRI)', fa: 'دژنراسیون دیسک (MRI)' } },
      { s: { de: 'Modic', en: 'Modic', fa: 'مودیک' }, v: 'Typ 1–3', h: { de: 'Endplatten-/Knochenmarksveränderungen', en: 'Endplate / marrow changes', fa: 'تغییرات صفحه انتهایی/مغز استخوان' } },
      { s: { de: 'Genant', en: 'Genant', fa: 'ژنانت' }, v: 'Grad 0–3', h: { de: 'Wirbelkörperfraktur (Höhenminderung)', en: 'Vertebral fracture (height loss)', fa: 'شکستگی مهره (کاهش ارتفاع)' } },
      { s: { de: 'Kellgren-Lawrence', en: 'Kellgren-Lawrence', fa: 'کلگرن-لارنس' }, v: '0–4', h: { de: 'Osteoarthrose-Schweregrad', en: 'Osteoarthritis severity', fa: 'شدت استئوآرتریت' } },
      { s: { de: 'Garden', en: 'Garden', fa: 'گاردن' }, v: 'I–IV', h: { de: 'Mediale Schenkelhalsfraktur', en: 'Femoral neck fracture', fa: 'شکستگی گردن فمور' } },
    ],
  },
  {
    id: 'onko',
    color: '#475569',
    name: { de: 'Onko / Allgemein', en: 'Onco / General', fa: 'انکولوژی / عمومی' },
    entries: [
      { s: { de: 'RECIST 1.1', en: 'RECIST 1.1', fa: 'RECIST 1.1' }, v: 'CR / PR / SD / PD', h: { de: 'Therapieansprechen solider Tumoren', en: 'Solid tumour treatment response', fa: 'پاسخ درمانی تومورهای جامد' } },
      { s: { de: 'TNM', en: 'TNM', fa: 'TNM' }, v: 'T · N · M', h: { de: 'Tumorgröße · Lymphknoten · Metastasen', en: 'Tumour · nodes · metastasis', fa: 'تومور · گره · متاستاز' } },
      { s: { de: 'Deauville (PET)', en: 'Deauville (PET)', fa: 'دوویل (PET)' }, v: '1–5', h: { de: 'Lymphom-Ansprechen im FDG-PET', en: 'Lymphoma response on FDG-PET', fa: 'پاسخ لنفوم در FDG-PET' } },
    ],
  },
]

export const REF_DATA = {
  messwerte: MESSWERTE,
  klassifikationen: KLASSIFIKATIONEN,
}

// Sprach-Helfer mit Fallback de → en
export function tx(field, lang) {
  if (field == null) return ''
  if (typeof field === 'string') return field
  return field[lang] ?? field.de ?? field.en ?? ''
}
