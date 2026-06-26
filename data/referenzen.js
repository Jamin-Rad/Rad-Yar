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
  if (lang === 'fa') return field.fa ?? field.en ?? field.de ?? ''
  return field[lang] ?? field.de ?? field.en ?? ''
}

export const REF_COPY = {
  de: {
    sectionLabel: 'Schnell-Referenz',
    label: '📋 Spickzettel',
    title: '😉 Spickzettel Radiologie',
    sub: 'Normwerte, Grenzwerte und Klassifikationen – kompakt für den radiologischen Alltag.',
    btnAnatomie: 'Befundrelevante Anatomie',
    btnAnatomieSub: 'Segmentanatomie, Gefäßterritorien und schnelle Orientierung für CT/MRT-Befunde.',
    btnMesswerte: 'Größen & Messwerte',
    btnMesswerteSub: 'Normwerte, Grenzwerte und Messpunkte nach Körperregion.',
    btnKlass: 'Klassifikationen und Scores',
    btnKlassSub: 'Radiologische Einteilungen, Scores und Befundkategorien – kurz erklärt und vollständig dargestellt.',
    btnRechner: 'Rechner',
    btnRechnerSub: 'Organe vermessen und sofort Volumen + Bewertung erhalten.',
    chipsAnatomie: ['Lebersegmente', 'Lunge', 'Beckenarterien', 'Hirngefäße'],
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
    colHinweis: 'Hinweis',
    kompakt: 'Kompakt',
    voll: 'Übersicht',
    einfachUebersicht: 'Einfache Übersicht',
    vollstaendig: 'Vollständige Klassifikation',
    ausfuehrlich: 'Stadien & Einteilung im Detail',
    reference: 'Quelle',
    close: 'Schließen',
    zoomImage: 'Vergrößern',
    empty: 'Keine Treffer.',
    pickHint: 'Wähle links eine Klassifikation.',
    disclaimer: 'Orientierungswerte – stets im klinischen Kontext und nach lokalem Standard prüfen.',
  },
  en: {
    sectionLabel: 'Quick Reference',
    label: '📋 Cheat Sheet',
    title: '😉 Radiology Cheat Sheet',
    sub: 'Normal values, thresholds and classifications – compact for everyday radiology.',
    btnAnatomie: 'Relevant anatomy',
    btnAnatomieSub: 'Segment anatomy, vascular territories and fast orientation for CT/MRI reporting.',
    btnMesswerte: 'Sizes & Measurements',
    btnMesswerteSub: 'Normal values, thresholds and measurement points by body region.',
    btnKlass: 'Classifications and Scores',
    btnKlassSub: 'Radiology classifications, scoring systems and reporting categories – concise overview plus full details.',
    btnRechner: 'Calculators',
    btnRechnerSub: 'Measure organs and instantly get volume + interpretation.',
    chipsAnatomie: ['Liver segments', 'Lung', 'Pelvic arteries', 'Brain vessels'],
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
    colHinweis: 'Note',
    kompakt: 'Compact',
    voll: 'Overview',
    einfachUebersicht: 'Simple Overview',
    vollstaendig: 'Full Classification',
    ausfuehrlich: 'Stages & grading in detail',
    reference: 'Source',
    close: 'Close',
    zoomImage: 'Enlarge',
    empty: 'No results.',
    pickHint: 'Select a classification on the left.',
    disclaimer: 'Orientation values – always verify in clinical context and per local standard.',
  },
  fa: {
    sectionLabel: 'مرجع سریع',
    label: '📋 برگه راهنما',
    title: '😉 برگه تقلب رادیولوژی',
    sub: 'مقادیر طبیعی، حدود و طبقه‌بندی‌ها – فشرده برای رادیولوژی روزمره.',
    btnAnatomie: 'آناتومی مرتبط با گزارش',
    btnAnatomieSub: 'آناتومی سگمنتال، قلمروهای عروقی و جهت‌یابی سریع برای گزارش CT/MRI.',
    btnMesswerte: 'اندازه‌ها و مقادیر',
    btnMesswerteSub: 'مقادیر طبیعی، حدود و نقاط اندازه‌گیری بر اساس ناحیه بدن.',
    btnKlass: 'طبقه‌بندی‌ها و سیستم‌های امتیازدهی',
    btnKlassSub: 'طبقه‌بندی‌ها، سیستم‌های امتیازدهی و دسته‌بندی‌های گزارش‌نویسی در رادیولوژی – با خلاصه کوتاه و جزئیات کامل.',
    btnRechner: 'ماشین‌حساب',
    btnRechnerSub: 'اندازه‌گیری اندام‌ها و دریافت فوری حجم + تفسیر.',
    chipsAnatomie: ['سگمان‌های کبد', 'ریه', 'شریان‌های لگن', 'عروق مغز'],
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
    colHinweis: 'نکته',
    kompakt: 'خلاصه',
    voll: 'نمای کلی',
    einfachUebersicht: 'نمای خلاصه',
    vollstaendig: 'طبقه‌بندی کامل',
    ausfuehrlich: 'مراحل و جزئیات طبقه‌بندی',
    reference: 'منبع',
    close: 'بستن',
    zoomImage: 'بزرگ‌نمایی',
    empty: 'نتیجه‌ای یافت نشد.',
    pickHint: 'از سمت راست یک طبقه‌بندی انتخاب کنید.',
    disclaimer: 'مقادیر تقریبی – همیشه در بافت بالینی و طبق استاندارد محلی بررسی شود.',
  },
}

// ── Befundrelevante Anatomie ─────────────────────────────────
export const ANATOMIE = [
  {
    id: 'lebersegmente-couinaud',
    color: '#8b5cf6',
    name: { de: 'Lebersegmente nach Couinaud', en: 'Couinaud liver segments', fa: 'سگمان‌های کبد به روش کوینو' },
    image: '/referenzen/anatomie/lebersegmente-couinaud.jpg',
    kompakt: {
      de: 'Portale Segmentanatomie für Läsionslokalisation, OP-/Ablationsplanung und Verlaufsvergleiche.',
      en: 'Portal segment anatomy for lesion localisation, surgery/ablation planning and follow-up comparison.',
      fa: 'آناتومی سگمنتال پورتال برای تعیین محل ضایعه، برنامه‌ریزی جراحی/ابلیشن و مقایسه پیگیری.',
    },
    cols: [{ de: 'Orientierung', en: 'Orientation', fa: 'جهت‌یابی' }, { de: 'Befundrelevanz', en: 'Reporting relevance', fa: 'اهمیت در گزارش' }],
    rows: [
      [{ de: 'I: Lobus caudatus', en: 'I: caudate lobe', fa: 'I: لوب کودات' }, { de: 'Eigene venöse Drainage; bei Zirrhose oft relativ hypertroph.', en: 'Separate venous drainage; often relatively hypertrophied in cirrhosis.', fa: 'درناژ وریدی جداگانه؛ در سیروز اغلب نسبتاً هیپرتروفیک است.' }],
      [{ de: 'II/III: links lateral', en: 'II/III: left lateral', fa: 'II/III: لترال چپ' }, { de: 'Segment II kranial, III kaudal; wichtig für links-laterale Resektion.', en: 'Segment II cranial, III caudal; important for left lateral sectionectomy.', fa: 'سگمان II کرانیال و III کودال؛ مهم در رزکسیون لترال چپ.' }],
      [{ de: 'IVa/IVb: links medial', en: 'IVa/IVb: left medial', fa: 'IVa/IVb: مدیال چپ' }, { de: 'Zwischen Lig. falciforme und mittlerer Lebervene; IVa kranial, IVb kaudal.', en: 'Between falciform ligament and middle hepatic vein; IVa cranial, IVb caudal.', fa: 'بین لیگامان فالسی‌فرم و ورید کبدی میانی؛ IVa کرانیال، IVb کودال.' }],
      [{ de: 'V/VIII: rechts anterior', en: 'V/VIII: right anterior', fa: 'V/VIII: قدامی راست' }, { de: 'V kaudal, VIII kranial; häufig relevant bei HCC-/Metastasenlokalisation.', en: 'V caudal, VIII cranial; common localisation for HCC/metastasis reporting.', fa: 'V کودال و VIII کرانیال؛ برای گزارش HCC/متاستاز مهم است.' }],
      [{ de: 'VI/VII: rechts posterior', en: 'VI/VII: right posterior', fa: 'VI/VII: خلفی راست' }, { de: 'VI kaudal, VII kranial; posteriore Läsionen bei Interventionen klar benennen.', en: 'VI caudal, VII cranial; name posterior lesions clearly for interventions.', fa: 'VI کودال و VII کرانیال؛ ضایعات خلفی برای مداخله باید دقیق نام‌گذاری شوند.' }],
      [{ de: 'Merke: Lebervenen teilen vertikal, Portalvenen horizontal', en: 'Key: hepatic veins divide vertically, portal veins horizontally', fa: 'نکته: وریدهای کبدی تقسیم عمودی و پورتال تقسیم افقی می‌دهند' }, { de: 'Hilft in axialen CT-Schichten bei Segmentzuordnung.', en: 'Helpful for assigning segments on axial CT slices.', fa: 'در تعیین سگمان در برش‌های محوری CT کمک می‌کند.' }],
    ],
  },
  {
    id: 'lungensegmente',
    color: '#0ea5e9',
    name: { de: 'Lungensegmente', en: 'Lung segments', fa: 'سگمان‌های ریه' },
    image: '/referenzen/anatomie/lungensegmente.jpg',
    kompakt: {
      de: 'Bronchopulmonale Segmente für Herdlokalisation, Pneumonieverteilung, Atelektasen und OP-Planung.',
      en: 'Bronchopulmonary segments for lesion localisation, pneumonia distribution, atelectasis and surgical planning.',
      fa: 'سگمان‌های برونکوپولمونال برای تعیین محل ضایعه، توزیع پنومونی، آتلکتازی و برنامه‌ریزی جراحی.',
    },
    cols: [{ de: 'Region', en: 'Region', fa: 'ناحیه' }, { de: 'Wichtige Segmente', en: 'Key segments', fa: 'سگمان‌های مهم' }],
    rows: [
      [{ de: 'Rechter Oberlappen', en: 'Right upper lobe', fa: 'لوب فوقانی راست' }, { de: 'S1 apikal, S2 posterior, S3 anterior.', en: 'S1 apical, S2 posterior, S3 anterior.', fa: 'S1 آپیکال، S2 خلفی، S3 قدامی.' }],
      [{ de: 'Mittellappen', en: 'Middle lobe', fa: 'لوب میانی' }, { de: 'S4 lateral, S5 medial; Silhouette-Zeichen am rechten Herzrand.', en: 'S4 lateral, S5 medial; silhouette sign at right heart border.', fa: 'S4 لترال، S5 مدیال؛ محو شدن حاشیه راست قلب.' }],
      [{ de: 'Rechter Unterlappen', en: 'Right lower lobe', fa: 'لوب تحتانی راست' }, { de: 'S6 superior, S7 medial-basal, S8 anterior-basal, S9 lateral-basal, S10 posterior-basal.', en: 'S6 superior, S7 medial basal, S8 anterior basal, S9 lateral basal, S10 posterior basal.', fa: 'S6 فوقانی، S7 بازال مدیال، S8 بازال قدامی، S9 بازال لترال، S10 بازال خلفی.' }],
      [{ de: 'Linker Oberlappen / Lingula', en: 'Left upper lobe / lingula', fa: 'لوب فوقانی چپ / لینگولا' }, { de: 'S1+2 apikoposterior, S3 anterior, S4 superior-lingular, S5 inferior-lingular.', en: 'S1+2 apicoposterior, S3 anterior, S4 superior lingular, S5 inferior lingular.', fa: 'S1+2 آپیکوپوستریور، S3 قدامی، S4 لینگولار فوقانی، S5 لینگولار تحتانی.' }],
      [{ de: 'Linker Unterlappen', en: 'Left lower lobe', fa: 'لوب تحتانی چپ' }, { de: 'S6 superior, S8 anteromedial-basal, S9 lateral-basal, S10 posterior-basal.', en: 'S6 superior, S8 anteromedial basal, S9 lateral basal, S10 posterior basal.', fa: 'S6 فوقانی، S8 بازال قدامی‌مدیال، S9 بازال لترال، S10 بازال خلفی.' }],
    ],
  },
  {
    id: 'bronchopulmonal-gefaesse',
    color: '#0284c7',
    name: { de: 'Segmentbronchien & -arterien', en: 'Segment bronchi & arteries', fa: 'برونش‌ها و شریان‌های سگمنتال' },
    image: '/referenzen/anatomie/bronchopulmonal-gefaesse.jpg',
    kompakt: {
      de: 'Grobe Gefäß-/Bronchus-Orientierung für segmentale Embolien, Atelektasen und OP-/Bronchoskopieplanung.',
      en: 'High-yield vessel/bronchus orientation for segmental emboli, atelectasis and procedural planning.',
      fa: 'جهت‌یابی کلی عروق/برونش برای آمبولی سگمنتال، آتلکتازی و برنامه‌ریزی اقدامات.',
    },
    cols: [{ de: 'Prinzip', en: 'Principle', fa: 'اصل' }, { de: 'Praktische Bedeutung', en: 'Practical relevance', fa: 'اهمیت عملی' }],
    rows: [
      [{ de: 'Bronchus benennt das Segment', en: 'The bronchus names the segment', fa: 'برونش نام سگمان را تعیین می‌کند' }, { de: 'Segmentbronchus und begleitende Pulmonalarterie verlaufen zentral im Segment.', en: 'Segment bronchus and accompanying pulmonary artery run centrally within the segment.', fa: 'برونش سگمنتال و شریان ریوی همراه در مرکز سگمان حرکت می‌کنند.' }],
      [{ de: 'Pulmonalvenen liegen intersegmental', en: 'Pulmonary veins are intersegmental', fa: 'وریدهای ریوی بین‌سگمنتال‌اند' }, { de: 'Venen markieren Grenzen zwischen Segmenten und Lappenebenen.', en: 'Veins mark boundaries between segments and lobar planes.', fa: 'وریدها مرز بین سگمان‌ها و صفحات لوبار را نشان می‌دهند.' }],
      [{ de: 'Segmentale LE', en: 'Segmental PE', fa: 'آمبولی سگمنتال' }, { de: 'Gefäßast möglichst mit Lappen/Segment benennen, z. B. A8 rechts.', en: 'Name the involved branch with lobe/segment if possible, e.g. right A8.', fa: 'در صورت امکان شاخه درگیر با لوب/سگمان نام‌گذاری شود، مثل A8 راست.' }],
      [{ de: 'Atelektase / Schleimpfropf', en: 'Atelectasis / mucus plug', fa: 'آتلکتازی / پلاک موکوسی' }, { de: 'Obstruierten Segmentbronchus verfolgen; Volumenverlust segmental erklären.', en: 'Track the obstructed segmental bronchus; explain segmental volume loss.', fa: 'برونش سگمنتال مسدود را دنبال کنید؛ کاهش حجم سگمنتال را توضیح دهید.' }],
    ],
  },
  {
    id: 'beckenarterien',
    color: '#ef4444',
    name: { de: 'Beckenarterien – A. iliaca interna', en: 'Pelvic arteries – internal iliac', fa: 'شریان‌های لگن – ایلیاک داخلی' },
    image: '/referenzen/anatomie/beckenarterien.jpg',
    kompakt: {
      de: 'Embolisations-relevante Äste der A. iliaca interna bei Trauma, Tumorblutung und postoperativer Blutung.',
      en: 'Embolisation-relevant internal iliac branches for trauma, tumour bleeding and postoperative haemorrhage.',
      fa: 'شاخه‌های مهم ایلیاک داخلی برای آمبولیزاسیون در تروما، خونریزی تومور و خونریزی پس از عمل.',
    },
    cols: [{ de: 'Ast / Gebiet', en: 'Branch / territory', fa: 'شاخه / قلمرو' }, { de: 'Befundrelevanz', en: 'Reporting relevance', fa: 'اهمیت در گزارش' }],
    rows: [
      [{ de: 'A. iliaca interna', en: 'Internal iliac artery', fa: 'شریان ایلیاک داخلی' }, { de: 'Meist anteriorer und posteriorer Stamm; Variante häufig, CTA-MIP prüfen.', en: 'Usually anterior and posterior trunks; variants are common, check CTA/MIP.', fa: 'معمولاً تنه قدامی و خلفی؛ واریانت‌ها شایع‌اند، CTA/MIP بررسی شود.' }],
      [{ de: 'A. glutea superior / inferior', en: 'Superior / inferior gluteal arteries', fa: 'گلوتئال فوقانی / تحتانی' }, { de: 'Häufige Trauma-/Beckenfraktur-Blutungsquellen; dorsale Extravasation beachten.', en: 'Common bleeding sources in pelvic fracture trauma; look for posterior extravasation.', fa: 'منبع شایع خونریزی در شکستگی لگن؛ اکستراوازاسیون خلفی مهم است.' }],
      [{ de: 'A. obturatoria', en: 'Obturator artery', fa: 'شریان اوبتوراتور' }, { de: 'Corona mortis möglich; Blutung am oberen Schambein/Acetabulum mitdenken.', en: 'Corona mortis variant possible; consider in superior pubic/acetabular bleeding.', fa: 'واریانت کرونا مورتیس ممکن است؛ در خونریزی پوبیس فوقانی/استابولوم مدنظر باشد.' }],
      [{ de: 'A. pudenda interna', en: 'Internal pudendal artery', fa: 'پودندال داخلی' }, { de: 'Perineale, urethrale und genitale Blutungen; Kollateralen beachten.', en: 'Perineal, urethral and genital bleeding; note collateral pathways.', fa: 'خونریزی پرینه، اورترا و ژنیتال؛ کولترال‌ها مهم‌اند.' }],
      [{ de: 'Vesikale / uterine / prostatäre Äste', en: 'Vesical / uterine / prostatic branches', fa: 'شاخه‌های وزیکال / رحمی / پروستاتیک' }, { de: 'Postoperative oder tumorassoziierte Blutung; selektive Embolisation planen.', en: 'Postoperative or tumour-related bleeding; plan selective embolisation.', fa: 'خونریزی پس از عمل یا توموری؛ آمبولیزاسیون انتخابی برنامه‌ریزی شود.' }],
    ],
  },
  {
    id: 'pankreas-gallenwege',
    color: '#f59e0b',
    name: { de: 'Pankreas & Gallenwege', en: 'Pancreas & biliary ducts', fa: 'پانکراس و مجاری صفراوی' },
    image: '/referenzen/anatomie/pankreas-gallenwege.jpg',
    kompakt: {
      de: 'Schnelle Orientierung für Ikterus, Pankreatitis, Tumorbezug und MRCP-/CT-Befunde.',
      en: 'Fast orientation for jaundice, pancreatitis, tumour relationships and MRCP/CT reporting.',
      fa: 'جهت‌یابی سریع برای ایکتر، پانکراتیت، ارتباط تومور و گزارش MRCP/CT.',
    },
    cols: [{ de: 'Struktur', en: 'Structure', fa: 'ساختار' }, { de: 'Worauf achten?', en: 'What to check?', fa: 'چه چیزی بررسی شود؟' }],
    rows: [
      [{ de: 'Pankreaskopf / Processus uncinatus', en: 'Pancreatic head / uncinate process', fa: 'سر پانکراس / زائده آنسینات' }, { de: 'Beziehung zu Duodenum, DHC, V. portae/SMV und SMA beschreiben.', en: 'Describe relationship to duodenum, CBD, portal vein/SMV and SMA.', fa: 'رابطه با دئودنوم، CBD، ورید پورت/SMV و SMA توصیف شود.' }],
      [{ de: 'Corpus / Schwanz', en: 'Body / tail', fa: 'بدنه / دم' }, { de: 'Kontakt zu Milzgefäßen, Magenhinterwand und linkem Nebennieren-/Nierenlager.', en: 'Assess splenic vessels, posterior stomach and left adrenal/renal region.', fa: 'ارتباط با عروق طحالی، دیواره خلفی معده و ناحیه آدرنال/کلیه چپ.' }],
      [{ de: 'Ductus choledochus', en: 'Common bile duct', fa: 'مجرای صفراوی مشترک' }, { de: 'Bei Dilatation Level der Obstruktion nennen: intrahepatisch, hilär, distal, Papille.', en: 'When dilated, name the obstruction level: intrahepatic, hilar, distal, ampullary.', fa: 'در اتساع، سطح انسداد ذکر شود: داخل‌کبدی، هیلار، دیستال، آمپولاری.' }],
      [{ de: 'Ductus pancreaticus', en: 'Pancreatic duct', fa: 'مجرای پانکراس' }, { de: 'Double-duct-Zeichen und Gangabbruch sind tumorverdächtig.', en: 'Double-duct sign and abrupt duct cut-off are suspicious for tumour.', fa: 'علامت دابل‌داکت و قطع ناگهانی مجرا مشکوک به تومور است.' }],
      [{ de: 'Papille / Ampulla Vateri', en: 'Papilla / ampulla of Vater', fa: 'پاپیلا / آمپول واتر' }, { de: 'Kleine Papillenläsionen können ausgeprägten Ikterus verursachen.', en: 'Small ampullary lesions can cause marked jaundice.', fa: 'ضایعات کوچک آمپولاری می‌توانند ایکتر واضح ایجاد کنند.' }],
    ],
  },
  {
    id: 'koronararterien-territorien',
    color: '#be185d',
    name: { de: 'Koronararterien-Territorien', en: 'Coronary artery territories', fa: 'قلمروهای شریان کرونر' },
    image: '/referenzen/anatomie/koronararterien-territorien.jpg',
    kompakt: {
      de: 'Territorien von LAD, LCx und RCA für Infarkt-/Ischämie-Muster, CT-Koronarangiographie und MRT.',
      en: 'LAD, LCx and RCA territories for infarct/ischaemia patterns, coronary CTA and cardiac MRI.',
      fa: 'قلمرو LAD، LCx و RCA برای الگوی انفارکت/ایسکمی، CTA کرونر و MRI قلب.',
    },
    cols: [{ de: 'Arterie', en: 'Artery', fa: 'شریان' }, { de: 'Typisches Territorium', en: 'Typical territory', fa: 'قلمرو تیپیک' }],
    rows: [
      [{ de: 'LAD / RIVA', en: 'LAD', fa: 'LAD' }, { de: 'Vorderwand, anteroseptal, Apex; Diagonaläste versorgen anterolateral.', en: 'Anterior wall, anteroseptal region and apex; diagonal branches supply anterolateral myocardium.', fa: 'دیواره قدامی، آنتروسپتال و اپکس؛ شاخه‌های دیاگونال ناحیه آنترو لترال را می‌رسانند.' }],
      [{ de: 'LCx / RCX', en: 'LCx', fa: 'LCx' }, { de: 'Lateralwand; bei Linksdominanz auch inferior/posterolateral.', en: 'Lateral wall; in left dominance also inferior/posterolateral territory.', fa: 'دیواره لترال؛ در غالبیت چپ، ناحیه اینفریور/پوسترولترال نیز.' }],
      [{ de: 'RCA', en: 'RCA', fa: 'RCA' }, { de: 'Inferiorwand, rechter Ventrikel; bei Rechtsdominanz PDA/posteriorer Septumanteil.', en: 'Inferior wall and right ventricle; in right dominance PDA/posterior septum.', fa: 'دیواره اینفریور و بطن راست؛ در غالبیت راست PDA/سپتوم خلفی.' }],
      [{ de: 'Dominanz', en: 'Dominance', fa: 'غالبیت' }, { de: 'Bestimmt, ob PDA aus RCA oder LCx kommt; wichtig für Infarktgebiet.', en: 'Determines whether PDA arises from RCA or LCx; important for infarct territory.', fa: 'تعیین می‌کند PDA از RCA یا LCx منشأ می‌گیرد؛ برای قلمرو انفارکت مهم است.' }],
    ],
  },
  {
    id: 'hirngefaess-territorien',
    color: '#7c3aed',
    name: { de: 'Hirngefäßterritorien', en: 'Brain vascular territories', fa: 'قلمروهای عروقی مغز' },
    image: '/referenzen/anatomie/hirngefaess-territorien.jpg',
    kompakt: {
      de: 'ACA/MCA/PCA und PICA/AICA/SCA als Schnellorientierung bei Ischämie, Blutung und Gefäßverschluss.',
      en: 'ACA/MCA/PCA and PICA/AICA/SCA as fast orientation for ischaemia, haemorrhage and vessel occlusion.',
      fa: 'ACA/MCA/PCA و PICA/AICA/SCA برای جهت‌یابی سریع در ایسکمی، خونریزی و انسداد عروقی.',
    },
    cols: [{ de: 'Territorium', en: 'Territory', fa: 'قلمرو' }, { de: 'Typische Lokalisation', en: 'Typical localisation', fa: 'محل تیپیک' }],
    rows: [
      ['ACA', { de: 'Mediale Frontal-/Parietalfläche, Gyrus cinguli, vorderer Corpus-callosum-Anteil.', en: 'Medial frontal/parietal cortex, cingulate gyrus, anterior corpus callosum.', fa: 'سطح مدیال فرونتال/پاریتال، سینگولیت، بخش قدامی جسم پینه‌ای.' }],
      ['MCA', { de: 'Laterale Hemisphäre, Insel, Basalganglien über lentikulostriäre Äste.', en: 'Lateral hemisphere, insula and basal ganglia via lenticulostriate branches.', fa: 'نیمکره لترال، اینسولا و عقده‌های قاعده‌ای از طریق شاخه‌های لنتیکولوستریات.' }],
      ['PCA', { de: 'Okzipitallappen, inferomedialer Temporallappen, Thalamus/Mittelhirn variabel.', en: 'Occipital lobe, inferomedial temporal lobe, variable thalamus/midbrain supply.', fa: 'لوب اکسیپیتال، تمپورال اینفرومدیال، تالاموس/میان‌مغز به‌صورت متغیر.' }],
      ['PICA', { de: 'Inferiore Kleinhirnhemisphäre, Tonsille, laterale Medulla.', en: 'Inferior cerebellar hemisphere, tonsil and lateral medulla.', fa: 'نیمکره تحتانی مخچه، تونسیل و مدولای لترال.' }],
      ['AICA', { de: 'Anteroinferiores Kleinhirn, mittlerer Kleinhirnstiel; oft Labyrintharterie.', en: 'Anteroinferior cerebellum, middle cerebellar peduncle; often labyrinthine artery.', fa: 'مخچه قدامی‌تحتانی، پایک مخچه‌ای میانی؛ اغلب شریان لابیرنتین.' }],
      ['SCA', { de: 'Oberes Kleinhirn, oberer Vermis, dorsolateraler Pons/Mittelhirn.', en: 'Superior cerebellum, superior vermis, dorsolateral pons/midbrain.', fa: 'مخچه فوقانی، ورمیس فوقانی، پونس/میان‌مغز دورسولترال.' }],
    ],
  },
]

// ── Messwerte ────────────────────────────────────────────────
// Struktur: region → groups[] → entries[]
const THORACIC_AORTA_ENTRIES = [
  {
    s: { de: 'Aorta ascendens – Höhe PA-Bif.', en: 'Ascending aorta – PA bifurcation level', fa: 'آئورت صعودی – سطح تقسیم PA' },
    v: '3,2 ± 0,5 cm',
    h: {
      de: 'Dilatation ab ≥ 4,0 cm; Aneurysma ab ≥ 4,5 cm',
      en: 'Dilated from ≥ 4.0 cm; aneurysm from ≥ 4.5 cm',
      fa: 'اتساع از ≥ ۴٫۰ سانتی‌متر؛ آنوریسم از ≥ ۴٫۵ سانتی‌متر',
    },
  },
  {
    s: { de: 'Aorta ascendens – Aortenwurzel', en: 'Ascending aorta – aortic root', fa: 'آئورت صعودی – ریشه آئورت' },
    v: '3,7 ± 0,3 cm',
    h: {
      de: 'Alters-, geschlechts- und körpergrößenabhängig beurteilen',
      en: 'Interpret according to age, sex and body size',
      fa: 'بر اساس سن، جنس و اندازه بدن تفسیر شود',
    },
  },
  {
    s: { de: 'Aortenbogen', en: 'Aortic arch', fa: 'قوس آئورت' },
    v: '2,5 ± 1,2 cm',
    h: { de: 'Variabel je Atemphase und Messpunkt', en: 'Variable by respiratory phase and level', fa: 'متغیر بر اساس فاز تنفسی' },
  },
  {
    s: { de: 'Aorta descendens', en: 'Descending aorta', fa: 'آئورت نزولی' },
    v: '2,5 ± 0,4 cm',
    h: { de: 'Aneurysma ab ≥ 4 cm; OP ab ≥ 5,5 cm', en: 'Aneurysm ≥ 4 cm; surgery ≥ 5.5 cm', fa: 'آنوریسم از ۴؛ جراحی از ۵٫۵' },
  },
  {
    s: { de: 'Verhältnis Aorta ascendens / descendens', en: 'Ascending / descending aortic ratio', fa: 'نسبت آئورت صعودی به نزولی' },
    v: '≈ 1,5 : 1',
    h: {
      de: 'Beide Durchmesser auf vergleichbarer axialer Höhe messen',
      en: 'Measure both diameters at a comparable axial level',
      fa: 'هر دو قطر در سطح محوری قابل مقایسه اندازه‌گیری شوند',
    },
  },
]

export const MESSWERTE = [
  // ── 1. Neuro / Kopf-Hals ────────────────────────────────────
  {
    id: 'neuro', color: '#7c3aed',
    name: { de: 'Neuro / Kopf-Hals', en: 'Neuro / Head & Neck', fa: 'نورو / سر و گردن' },
    groups: [
      {
        name: { de: 'Ventrikel', en: 'Ventricles', fa: 'بطن‌ها' },
        entries: [
          { s: { de: 'Vorderhorn Seitenventrikel (< 40 J.)', en: 'Lateral ventricle frontal horn (< 40 y)', fa: 'شاخ قدامی بطن جانبی (< ۴۰ سال)' }, v: '≤ 12 mm', h: { de: 'Dilatation ab > 12 mm; Messung in Höhe Foramen Monroi', en: 'Dilatation if > 12 mm; measure at the foramen of Monro', fa: 'اتساع از >۱۲ میلی‌متر؛ اندازه‌گیری در سطح فورامن مونرو' } },
          { s: { de: 'Vorderhorn Seitenventrikel (> 40 J.)', en: 'Lateral ventricle frontal horn (> 40 y)', fa: 'شاخ قدامی بطن جانبی (> ۴۰ سال)' }, v: '≤ 15 mm', h: { de: 'Dilatation ab > 15 mm; altersbezogene Normweitung beachten', en: 'Dilatation if > 15 mm; consider age-related widening', fa: 'اتساع از >۱۵ میلی‌متر؛ گشادی وابسته به سن در نظر گرفته شود' } },
          { s: { de: 'III. Ventrikel (Kind)', en: '3rd ventricle (child)', fa: 'بطن سوم (کودک)' }, v: '≤ 5 mm', h: { de: 'Dilatation ab > 5 mm; Säuglinge können etwas weiter sein', en: 'Dilatation if > 5 mm; infants may be slightly wider', fa: 'اتساع از >۵ میلی‌متر؛ در شیرخواران ممکن است کمی بیشتر باشد' } },
          { s: { de: 'III. Ventrikel (Erw. < 60 J.)', en: '3rd ventricle (adult < 60 y)', fa: 'بطن سوم (بزرگسال < ۶۰)' }, v: '≤ 7 mm', h: { de: 'Dilatation ab > 7 mm; Hydrozephalus vs. Atrophie im Kontext beurteilen', en: 'Dilatation if > 7 mm; assess hydrocephalus vs atrophy in context', fa: 'اتساع از >۷ میلی‌متر؛ هیدروسفالی در برابر آتروفی در زمینه بالینی/تصویری ارزیابی شود' } },
          { s: { de: 'III. Ventrikel (Erw. > 60 J.)', en: '3rd ventricle (adult > 60 y)', fa: 'بطن سوم (بزرگسال > ۶۰)' }, v: '≤ 9 mm', h: { de: 'Dilatation ab > 9 mm; altersbezogene Normweitung beachten', en: 'Dilatation if > 9 mm; consider age-related widening', fa: 'اتساع از >۹ میلی‌متر؛ گشادی وابسته به سن در نظر گرفته شود' } },
          { s: { de: 'Evans-Index', en: 'Evans index', fa: 'شاخص ایوانز' }, v: '< 0,30', h: { de: 'Frontalhorn / max. innere Schädelbreite; ≥ 0,30 = Ventrikulomegalie-Kriterium', en: 'Frontal horn / max. inner skull width; ≥ 0.30 = ventriculomegaly criterion', fa: 'عرض شاخ‌های فرونتال / بیشترین عرض داخلی جمجمه؛ ≥۰٫۳۰ معیار ونتریکولومگالی' } },
        ],
        note: {
          de: 'Als Dilatation gilt ein Messwert oberhalb des jeweiligen altersbezogenen Grenzwerts. Hydrozephalus nicht nur über die Größe diagnostizieren: Temporalhörner, Sulci, transependymales Ödem, Callosal angle und klinischen Kontext mitbeurteilen.',
          en: 'Dilatation means a value above the age-related threshold. Do not diagnose hydrocephalus from size alone: also assess temporal horns, sulci, transependymal oedema, callosal angle and clinical context.',
          fa: 'اتساع یعنی مقدار بالاتر از حد آستانه وابسته به سن. هیدروسفالی را فقط با اندازه تشخیص ندهید؛ شاخ‌های تمپورال، سولکوس‌ها، ادم ترانس‌اپندیمال، زاویه کالوزال و زمینه بالینی را هم ارزیابی کنید.',
        },
      },
      {
        name: { de: 'Sehnerv & Orbita', en: 'Optic Nerve & Orbit', fa: 'عصب بینایی و اوربیت' },
        entries: [
          {
            s: { de: 'Optikusscheide / ONSD', en: 'Optic nerve sheath / ONSD', fa: 'غلاف عصب بینایی / ONSD' },
            v: '< 5,7 mm',
            h: {
              de: 'Äußerer Durchmesser der Optikusscheide, 3 mm dorsal/posterior des Bulbus gemessen, senkrecht zur Verlaufsachse des N. opticus, von Außenkante zu Außenkante der Scheide. Nicht den reinen Durchmesser des N. opticus messen.',
              en: 'Outer diameter of the optic nerve sheath, measured 3 mm posterior to the globe, perpendicular to the optic nerve axis, outer edge to outer edge of the sheath. Do not measure the optic nerve diameter alone.',
              fa: 'قطر خارجی غلاف عصب بینایی، ۳ میلی‌متر خلف کره چشم، عمود بر محور عصب بینایی، از لبه خارجی تا لبه خارجی غلاف اندازه‌گیری شود؛ قطر خود عصب به‌تنهایی اندازه‌گیری نشود.',
            },
          },
        ],
        note: {
          de: 'ONSD beschreibt den Durchmesser der Optikusscheide und nicht den Durchmesser des N. opticus selbst. Die Messung dient als indirekter Bildgebungsparameter bei Verdacht auf erhöhten intrakraniellen Druck.',
          en: 'ONSD describes the diameter of the optic nerve sheath, not the diameter of the optic nerve itself. It is used as an indirect imaging parameter when raised intracranial pressure is suspected.',
          fa: 'ONSD قطر غلاف عصب بینایی را توصیف می‌کند، نه قطر خود عصب بینایی. این اندازه‌گیری به‌عنوان شاخص غیرمستقیم تصویربرداری در شک به افزایش فشار داخل جمجمه استفاده می‌شود.',
        },
        source: {
          label: { de: 'StatPearls / NCBI Bookshelf – Optic Nerve Sheath Ultrasound', en: 'StatPearls / NCBI Bookshelf – Optic Nerve Sheath Ultrasound', fa: 'StatPearls / NCBI Bookshelf – Optic Nerve Sheath Ultrasound' },
          url: 'https://www.ncbi.nlm.nih.gov/books/NBK554479/',
        },
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
        entries: THORACIC_AORTA_ENTRIES,
      },
      {
        name: { de: 'Pulmonalgefäße & V. cava', en: 'Pulmonary Vessels & SVC', fa: 'عروق ریوی و ورید اجوف فوقانی' },
        entries: [
          { s: { de: 'Truncus pulmonalis', en: 'Pulmonary trunk', fa: 'تنه ریوی' }, v: '2,4 ± 0,2 cm', h: { de: 'PH wahrscheinlich wenn > Aorta ascendens', en: 'PH likely if > ascending aorta', fa: 'احتمال PH اگر > آئورت صعودی' } },
          {
            s: { de: 'Verhältnis Truncus pulmonalis / Aorta ascendens', en: 'Pulmonary trunk / ascending aorta ratio', fa: 'نسبت تنه ریوی به آئورت صعودی' },
            v: '≤ 1,0',
            h: {
              de: '> 1 spricht im passenden Kontext für pulmonale Hypertonie',
              en: '> 1 supports pulmonary hypertension in the appropriate context',
              fa: 'نسبت > ۱ در زمینه مناسب به نفع پرفشاری ریوی است',
            },
          },
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
        name: { de: 'Aorta thorakalis', en: 'Thoracic Aorta', fa: 'آئورت توراسیک' },
        entries: THORACIC_AORTA_ENTRIES,
      },
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
          de: 'MRT-Skala (Grad 0–3) für Marklagerläsionen bei zerebraler Mikroangiopathie.',
          en: 'MRI scale (grade 0–3) for grading cerebral small-vessel white-matter lesions on FLAIR/T2.',
          fa: 'مقیاس MRI (درجه ۰–۳) برای ارزیابی ضایعات ماده سفید عروق کوچک مغزی در FLAIR/T2.',
        },
        ref: 'Fazekas F et al., AJR Am J Roentgenol. 1987;149(2):351–6',
        refUrl: 'https://pubmed.ncbi.nlm.nih.gov/3496763/',
        image: {
          src: 'https://prod-images-static.radiopaedia.org/images/12735148/e69c30bde439e5a216128284f7a681_big_gallery.jpeg',
          alt: { de: 'Fazekas-Skala MRT-Beispiel', en: 'Fazekas scale MRI example', fa: 'نمونه MRI مقیاس فازکاس' },
          attribution: {
            name: 'Bruno Di Muzio',
            sourceUrl: 'https://radiopaedia.org/?lang=us',
            caseUrl: 'https://radiopaedia.org/cases/36927?lang=us',
            caseId: '36927',
          },
        },
        einfach: {
          cols: [
            { de: 'Grad', en: 'Grade', fa: 'درجه' },
            { de: 'Allgemeine Beschreibung', en: 'General description', fa: 'توضیح کلی' },
          ],
          rows: [
            ['0', { de: 'Keine WMH', en: 'No WMH', fa: 'بدون WMH' }],
            ['1', { de: 'Punktförmige Läsionen', en: 'Punctate lesions', fa: 'ضایعات نقطه‌ای' }],
            ['2', { de: 'Beginnende Konfluenz', en: 'Beginning confluence', fa: 'شروع همگرایی' }],
            ['3', { de: 'Große konfluierende Areale', en: 'Large confluent areas', fa: 'نواحی بزرگ همگرا' }],
          ],
        },
        cols: [
          { de: 'Grad', en: 'Grade', fa: 'درجه' },
          { de: 'Periventrikulär (PVH)', en: 'Periventricular (PVH)', fa: 'پری‌بطنی (PVH)' },
          { de: 'Tiefes Marklager (DWMH)', en: 'Deep white matter (DWMH)', fa: 'ماده سفید عمقی (DWMH)' },
        ],
        rows: [
          ['0',
            { de: 'Keine', en: 'Absent', fa: 'غایب' },
            { de: 'Keine', en: 'Absent', fa: 'غایب' },
          ],
          ['1',
            { de: 'Kappen oder dünner Saum', en: 'Caps or thin lining', fa: 'کلاهک یا حاشیه نازک' },
            { de: 'Punktförmige Läsionen', en: 'Punctate foci', fa: 'کانون‌های نقطه‌ای' },
          ],
          ['2',
            { de: 'Glatter Halo', en: 'Smooth halo', fa: 'هاله صاف' },
            { de: 'Beginnende Konfluenz', en: 'Beginning confluence', fa: 'شروع همگرایی' },
          ],
          ['3',
            { de: 'Unregelmäßig, in tiefes Marklager ausstrahlend', en: 'Irregular, extending into deep white matter', fa: 'نامنظم، گسترش به ماده سفید عمقی' },
            { de: 'Große konfluierende Areale', en: 'Large confluent areas', fa: 'نواحی بزرگ همگرا' },
          ],
        ],
      },
      {
        id: 'aspects',
        name: { de: 'ASPECTS', en: 'ASPECTS', fa: 'ASPECTS' },
        kompakt: {
          de: 'CT/DWI-Score (0–10) für frühe Ischämiezeichen im MCA-Territorium.',
          en: 'CT score (0–10) quantifying early ischaemic changes in the MCA territory.',
          fa: 'امتیاز CT (۰–۱۰) برای سنجش تغییرات ایسکمیک زودرس در قلمرو MCA.',
        },
        image: {
          src: '/stroke/aspects-schema.png',
          alt: { de: 'ASPECTS-Schema mit den zehn MCA-Regionen', en: 'ASPECTS diagram showing the ten MCA regions', fa: 'نمودار ASPECTS با ده ناحیه MCA' },
        },
        ref: 'Barber et al., Lancet 2000',
        cols: [{ de: 'Region', en: 'Region', fa: 'ناحیه' }, { de: 'Wertung', en: 'Score', fa: 'امتیاز' }],
        rows: [
          [{ de: 'Nucleus caudatus (C)', en: 'Caudate (C)', fa: 'هسته دمی (C)' }, '−1'],
          [{ de: 'Linsenkern (L)', en: 'Lentiform (L)', fa: 'هسته عدسی (L)' }, '−1'],
          [{ de: 'Capsula interna (IC)', en: 'Internal capsule (IC)', fa: 'کپسول داخلی (IC)' }, '−1'],
          [{ de: 'Inselrinde (I)', en: 'Insula (I)', fa: 'انسولا (I)' }, '−1'],
          [{ de: 'Kortexareale M1–M6', en: 'Cortical regions M1–M6', fa: 'نواحی قشری M1–M6' }, { de: 'je −1', en: '−1 each', fa: 'هر کدام −۱' }],
        ],
        tableNote: {
          start: { de: 'Ausgangspunkt: 10 Punkte', en: 'Starting point: 10 points', fa: 'نقطه شروع: ۱۰ امتیاز' },
          cutoff: { de: '≤ 7 Punkte = ausgedehnter Infarkt → schlechteres Outcome', en: '≤ 7 points = large infarct → worse outcome', fa: '≤ ۷ امتیاز = انفارکت وسیع → نتیجه بدتر' },
        },
      },
      {
        id: 'pc-aspects',
        name: { de: 'pc-ASPECTS', en: 'pc-ASPECTS', fa: 'pc-ASPECTS' },
        kompakt: {
          de: 'CT/MRT-Score (0–10) für frühe Ischämiezeichen im vertebrobasilären Territorium.',
          en: 'CT/MRI score (0–10) for early ischaemic changes in the posterior circulation (vertebrobasilar territory) – 1 point deducted per affected region; ≤ 6 points indicates large infarct with unfavourable outcome.',
          fa: 'امتیاز CT/MRI (۰–۱۰) برای تغییرات ایسکمیک زودرس در گردش خلفی (قلمرو ورتبروبازیلار)؛ به ازای هر ناحیه درگیر امتیاز کم می‌شود و ≤۶ امتیاز به نفع انفارکت وسیع با پیش‌آگهی نامطلوب است.',
        },
        ref: 'Puetz V et al., AJNR Am J Neuroradiol. 2008;29(10):1862–8',
        refUrl: 'https://pubmed.ncbi.nlm.nih.gov/18719026/',
        image: {
          src: '/stroke/pc-aspects-schema.png',
          alt: { de: 'pc-ASPECTS: 8 Regionen des Posteriorkreislaufs auf CT-Ebenen', en: 'pc-ASPECTS: 8 regions of the posterior circulation on CT levels', fa: 'pc-ASPECTS: ۸ ناحیه گردش پسین در سطوح CT' },
        },
        cols: [{ de: 'Region', en: 'Region', fa: 'ناحیه' }, { de: 'Wertung', en: 'Score', fa: 'امتیاز' }],
        rows: [
          [{ de: 'Mittelhirn (Mesencephalon)', en: 'Midbrain', fa: 'مغز میانی' }, '−2'],
          [{ de: 'Pons', en: 'Pons', fa: 'پونز' }, '−2'],
          [{ de: 'Thalamus links / rechts', en: 'Thalamus left / right', fa: 'تالاموس چپ / راست' }, { de: 'je −1', en: '−1 each', fa: 'هر کدام −۱' }],
          [{ de: 'Kleinhirnhemisphäre links / rechts', en: 'Cerebellar hemisphere left / right', fa: 'نیمکره مخچه چپ / راست' }, { de: 'je −1', en: '−1 each', fa: 'هر کدام −۱' }],
          [{ de: 'PCA-Territorium links / rechts', en: 'PCA territory left / right', fa: 'قلمرو PCA چپ / راست' }, { de: 'je −1', en: '−1 each', fa: 'هر کدام −۱' }],
        ],
        tableNote: {
          start: { de: 'Ausgangspunkt: 10 Punkte', en: 'Starting point: 10 points', fa: 'نقطه شروع: ۱۰ امتیاز' },
          cutoff: { de: '≤ 6 Punkte = ausgedehnter Posteriorinfarkt → schlechteres Outcome', en: '≤ 6 points = large posterior infarct → worse outcome', fa: '≤ ۶ امتیاز = انفارکت وسیع گردش خلفی → پیش‌آگهی بدتر' },
        },
      },
      {
        id: 'mcdonald',
        name: { de: 'McDonald-Kriterien', en: 'McDonald Criteria', fa: 'معیارهای مک‌دونالد' },
        kompakt: {
          de: 'MS-Diagnosekriterien über räumliche und zeitliche Dissemination typischer ZNS-Läsionen.',
          en: 'Diagnostic criteria for multiple sclerosis (2017 revision): demonstration of dissemination in space (DIS – ≥2 MS-typical regions) and time (DIT – different time points or CSF OCBs). Allow MS diagnosis after the very first clinical attack (CIS).',
          fa: 'معیارهای تشخیصی مالتیپل اسکلروز (بازنگری ۲۰۱۷): اثبات انتشار در فضا (DIS – ≥۲ ناحیه معمول MS) و زمان (DIT – نقاط زمانی مختلف یا OCB مایع نخاعی). امکان تشخیص MS پس از اولین حمله بالینی (CIS) را می‌دهند.',
        },
        ref: 'Thompson AJ et al., Lancet Neurol. 2018;17(2):162–173',
        refUrl: 'https://pubmed.ncbi.nlm.nih.gov/29275977/',
        einfach: {
          cols: [
            { de: 'Frage', en: 'Question', fa: 'سؤال' },
            { de: 'Kriterium', en: 'Criterion', fa: 'معیار' },
            { de: 'Was im MRT zeigen?', en: 'What to show on MRI?', fa: 'چه چیزی در MRI نشان داده شود؟' },
          ],
          rows: [
            [
              { de: '📍 Wo?', en: '📍 Where?', fa: '📍 کجا؟' },
              { de: 'DIS – Mehrere Orte', en: 'DIS – Multiple locations', fa: 'DIS – چند مکان' },
              { de: '≥1 Herd in ≥2 Regionen: periventrikulär · kortikal · infratentoriell · Rückenmark', en: '≥1 lesion in ≥2 regions: periventricular · cortical · infratentorial · spinal cord', fa: '≥۱ ضایعه در ≥۲ ناحیه: پریونتریکولار · کورتیکال · اینفراتانتوریال · نخاع' },
            ],
            [
              { de: '⏱ Wann?', en: '⏱ When?', fa: '⏱ کِی؟' },
              { de: 'DIT – Mehrere Zeitpunkte', en: 'DIT – Multiple time points', fa: 'DIT – چند زمان' },
              { de: 'Aktive + inaktive Herde gleichzeitig · ODER neuer Herd im Verlauf · ODER Liquor-OCBs', en: 'Active + inactive lesions simultaneously · OR new lesion on follow-up · OR CSF OCBs', fa: 'ضایعات فعال + غیرفعال همزمان · یا ضایعه جدید در پیگیری · یا OCB مایع نخاعی' },
            ],
          ],
        },
        cols: [
          { de: 'Klinische Schübe', en: 'Clinical attacks', fa: 'حملات بالینی' },
          { de: 'Objektive Läsionen', en: 'Objective lesions', fa: 'ضایعات عینی' },
          { de: 'Zusätzlicher Nachweis', en: 'Additional evidence needed', fa: 'شواهد اضافی لازم' },
        ],
        rows: [
          [
            { de: '≥ 2 Schübe', en: '≥ 2 attacks', fa: '≥ ۲ حمله' },
            { de: '≥ 2 Läsionen', en: '≥ 2 lesions', fa: '≥ ۲ ضایعه' },
            { de: 'Kein weiterer Nachweis nötig ✓', en: 'No additional evidence needed ✓', fa: 'نیازی به شواهد اضافی نیست ✓' },
          ],
          [
            { de: '≥ 2 Schübe', en: '≥ 2 attacks', fa: '≥ ۲ حمله' },
            { de: '1 Läsion', en: '1 lesion', fa: '۱ ضایعه' },
            { de: '+ DIS', en: '+ DIS', fa: '+ DIS' },
          ],
          [
            { de: '1 Schub', en: '1 attack', fa: '۱ حمله' },
            { de: '≥ 2 Läsionen', en: '≥ 2 lesions', fa: '≥ ۲ ضایعه' },
            { de: '+ DIT  oder  Liquor-OCBs', en: '+ DIT  or  CSF OCBs', fa: '+ DIT  یا  OCB مایع نخاعی' },
          ],
          [
            { de: '1 Schub (CIS)', en: '1 attack (CIS)', fa: '۱ حمله (CIS)' },
            { de: '1 Läsion', en: '1 lesion', fa: '۱ ضایعه' },
            { de: '+ DIS  +  DIT oder Liquor-OCBs', en: '+ DIS  +  DIT or CSF OCBs', fa: '+ DIS  +  DIT یا OCB مایع نخاعی' },
          ],
          [
            { de: 'Progredienter Verlauf (PPMS)', en: 'Progressive course (PPMS)', fa: 'سیر پیشرونده (PPMS)' },
            { de: '≥ 1 Jahr Progression', en: '≥ 1 year progression', fa: '≥ ۱ سال پیشرفت' },
            { de: '+ DIS (2/3 Regionen)  +  DIT (OCB oder neuer Herd)', en: '+ DIS (2/3 regions)  +  DIT (OCB or new lesion)', fa: '+ DIS (۲/۳ ناحیه)  +  DIT (OCB یا ضایعه جدید)' },
          ],
        ],
        detail: [
          {
            stage: { de: 'DIS – Dissemination in Raum (4 Regionen)', en: 'DIS – Dissemination in Space (4 regions)', fa: 'DIS – انتشار در فضا (۴ ناحیه)' },
            text: { de: '≥1 T2-Herd in ≥2 von 4 MS-typischen Regionen: (1) periventrikulär (≥3 Herde empfohlen), (2) kortikal/juxtakortikal, (3) infratentoriell (Hirnstamm, Kleinhirn), (4) Rückenmark. Symptomatische Herde dürfen bei CIS mitgezählt werden. Optikusnervläsionen: nur bei NMOSD-Ausschluss.', en: '≥1 T2 lesion in ≥2 of 4 MS-typical regions: (1) periventricular (≥3 lesions recommended), (2) cortical/juxtacortical, (3) infratentorial (brainstem, cerebellum), (4) spinal cord. Symptomatic lesions may be counted in CIS. Optic nerve lesions: only after NMOSD exclusion.', fa: '≥۱ ضایعه T2 در ≥۲ از ۴ ناحیه معمول MS: (۱) پریونتریکولار (≥۳ ضایعه توصیه)، (۲) کورتیکال/جوکستاکورتیکال، (۳) اینفراتانتوریال، (۴) نخاع. ضایعات علامت‌دار در CIS قابل شمارش هستند.' },
          },
          {
            stage: { de: 'DIT – Dissemination in Zeit (3 Wege)', en: 'DIT – Dissemination in Time (3 ways)', fa: 'DIT – انتشار در زمان (۳ روش)' },
            text: { de: '(1) Gleichzeitig gadoliniumaufnehmende (aktive) UND nicht-aufnehmende T2-Herde auf demselben MRT — kein zeitlicher Abstand nötig! · (2) Neuer T2- oder Gd-Herd in Verlaufs-MRT · (3) Liquorspezifische oligoklonale Banden (OCBs) im Vergleich zum Serum. OCBs ersetzen DIT — aber nicht DIS!', en: '(1) Simultaneous gadolinium-enhancing (active) AND non-enhancing T2 lesions on the same MRI — no time gap needed! · (2) New T2 or Gd lesion on follow-up MRI · (3) CSF-specific oligoclonal bands (OCBs) compared to serum. OCBs substitute for DIT — but not DIS!', fa: '(۱) ضایعات گادولینیوم‌گیر (فعال) و غیرگیر T2 بر روی همان MRI — فاصله زمانی لازم نیست! · (۲) ضایعه T2 یا Gd جدید در MRI پیگیری · (۳) باندهای الیگوکلونال اختصاصی مایع نخاعی (OCB). OCBs جایگزین DIT می‌شوند — نه DIS!' },
          },
          {
            stage: { de: 'Wichtige Ausschlussdiagnosen', en: 'Key differential diagnoses', fa: 'تشخیص‌های افتراقی مهم' },
            text: { de: 'MS-Diagnose setzt voraus: Keine bessere Erklärung! DD: NMOSD (AQP4-IgG – oft länger Rückenmarksherde, Area postrema), MOGAD (MOG-IgG – kortikale Enzephalitis, Optikusneuritis), zerebrale Vaskulitis, Neurosarkoidose, infektiöse Enzephalomyelitis. Immer Serum-AQP4-IgG und MOG-IgG testen!', en: 'MS diagnosis requires: no better explanation! DDx: NMOSD (AQP4-IgG – often long spinal cord lesions, area postrema), MOGAD (MOG-IgG – cortical encephalitis, optic neuritis), cerebral vasculitis, neurosarcoidosis, infectious encephalomyelitis. Always test serum AQP4-IgG and MOG-IgG!', fa: 'تشخیص MS مستلزم: هیچ توضیح بهتری وجود نداشته باشد! DD: NMOSD (AQP4-IgG)، MOGAD (MOG-IgG)، واسکولیت مغزی، نوروسارکوئیدوز، آنسفالومیلیت عفونی. همیشه AQP4-IgG و MOG-IgG سرم را آزمایش کنید!' },
          },
        ],
      },
      {
        id: 'fisher',
        name: { de: 'Fisher-Skala', en: 'Fisher scale', fa: 'مقیاس فیشر' },
        kompakt: {
          de: 'CT-Skala der SAB-Blutmenge zur groben Vasospasmus-Risikoeinschätzung.',
          en: 'CT score quantifying SAH blood volume as a vasospasm predictor (original grade 1–4 / modified grade 0–4).',
          fa: 'امتیاز CT برای برآورد حجم خون SAH به‌عنوان شاخص خطر وازواسپاسم (نسخه اصلی درجه ۱–۴ / نسخه اصلاح‌شده درجه ۰–۴).',
        },
        ref: 'Fisher et al., Neurosurgery 1980 · Claassen et al., Stroke 2001',
        tables: [
          {
            title: { de: 'Original Fisher-Skala (1980)', en: 'Original Fisher Scale (1980)', fa: 'مقیاس فیشر اصلی (۱۹۸۰)' },
            cols: [
              { de: 'Grad', en: 'Grade', fa: 'درجه' },
              { de: 'CT-Befund', en: 'CT finding', fa: 'یافته CT' },
            ],
            rows: [
              ['1', { de: 'Kein Blut nachweisbar', en: 'No blood detected', fa: 'بدون خون قابل تشخیص' }],
              ['2', { de: 'Diffuse dünne SAB (< 1 mm)', en: 'Diffuse thin SAH (< 1 mm)', fa: 'SAH منتشر و نازک (< ۱ mm)' }],
              ['3', { de: 'Lokalisierte / dicke SAB (≥ 1 mm) – höchstes Risiko', en: 'Localised / thick SAH (≥ 1 mm) — highest risk', fa: 'SAH موضعی یا ضخیم (≥ ۱ mm) — بیشترین خطر' }],
              ['4', { de: 'Intraventrikuläre oder intrazerebrale Blutung', en: 'Intraventricular or intracerebral haemorrhage', fa: 'خونریزی داخل بطنی یا داخل مغزی' }],
            ],
          },
          {
            title: { de: 'Modifizierte Fisher-Skala (2001)', en: 'Modified Fisher Scale (2001)', fa: 'مقیاس فیشر اصلاح‌شده (۲۰۰۱)' },
            cols: [
              { de: 'Grad', en: 'Grade', fa: 'درجه' },
              { de: 'Blutdicke', en: 'Blood thickness', fa: 'ضخامت خون' },
              { de: 'IVH', en: 'IVH', fa: 'IVH' },
              { de: 'Vasospasmus-Risiko', en: 'Vasospasm risk', fa: 'خطر وازواسپاسم' },
            ],
            rows: [
              ['0', { de: 'Kein SAB', en: 'No SAH', fa: 'بدون SAH' }, { de: 'Nein', en: 'No', fa: 'خیر' }, '~0 %'],
              ['1', { de: 'Dünn (< 1 mm)', en: 'Thin (< 1 mm)', fa: 'نازک (< ۱ mm)' }, { de: 'Nein', en: 'No', fa: 'خیر' }, '~6 %'],
              ['2', { de: 'Dünn (< 1 mm)', en: 'Thin (< 1 mm)', fa: 'نازک (< ۱ mm)' }, { de: 'Ja ✓', en: 'Yes ✓', fa: 'بله ✓' }, '~14 %'],
              ['3', { de: 'Dick (≥ 1 mm)', en: 'Thick (≥ 1 mm)', fa: 'ضخیم (≥ ۱ mm)' }, { de: 'Nein', en: 'No', fa: 'خیر' }, '~12 %'],
              ['4', { de: 'Dick (≥ 1 mm)', en: 'Thick (≥ 1 mm)', fa: 'ضخیم (≥ ۱ mm)' }, { de: 'Ja ✓', en: 'Yes ✓', fa: 'بله ✓' }, '~28 %'],
            ],
          },
        ],
      },
      {
        id: 'mta-score',
        name: { de: 'MTA-Score', en: 'MTA Score', fa: 'امتیاز MTA' },
        kompakt: {
          de: 'Visueller MRT-Score (0–4) der medialen Temporalatrophie/Hippokampusatrophie.',
          en: 'Visual MRI rating (0–4) of medial temporal atrophy (hippocampus) as an Alzheimer imaging marker — T1 coronal at mamillary body level, each hemisphere rated separately.',
          fa: 'امتیازدهی بصری MRI (۰–۴) آتروفی گیجگاهی مدیال (هیپوکامپ) به عنوان نشانگر تصویربرداری آلزهایمر — T1 کرونال در سطح جسم ماميلار، هر نیمکره جداگانه.',
        },
        ref: 'Scheltens P et al., J Neurol Neurosurg Psychiatry. 1992;55(10):967–72',
        refUrl: 'https://pubmed.ncbi.nlm.nih.gov/1431963/',
        image: {
          src: '/mta-score/mta-score.jpeg',
          alt: {
            de: 'MTA-Score 0–4: koronale T1-MRT auf Hippocampushöhe (Scheltens)',
            en: 'MTA score 0–4: coronal T1 MRI at hippocampal level (Scheltens)',
            fa: 'امتیاز MTA ۰–۴: T1 کرونال MRI در سطح هیپوکامپ (شلتنز)',
          },
          attribution: {
            name: 'Radiopaedia.org',
            sourceUrl: 'https://radiopaedia.org',
            caseUrl: 'https://radiopaedia.org/cases/42027',
            caseId: '42027',
          },
        },
        einfach: {
          cols: [
            { de: 'Altersgruppe', en: 'Age group', fa: 'گروه سنی' },
            { de: 'Pathologisch ab', en: 'Pathological at', fa: 'غیرطبیعی از' },
          ],
          rows: [
            [{ de: '< 75 Jahre', en: '< 75 yr', fa: '< ۷۵ سال' }, 'MTA ≥ 2'],
            [{ de: '75–84 Jahre', en: '75–84 yr', fa: '۷۵–۸۴ سال' }, 'MTA ≥ 3'],
            [{ de: '≥ 85 Jahre', en: '≥ 85 yr', fa: '≥ ۸۵ سال' }, 'MTA ≥ 4'],
          ],
        },
        cols: [
          { de: 'Score', en: 'Score', fa: 'امتیاز' },
          { de: 'Atrophie', en: 'Atrophy', fa: 'آتروفی' },
          { de: 'Sulcus choroideus', en: 'Choroid fissure', fa: 'شیار کورویید' },
          { de: 'Temporalhorn', en: 'Temporal horn', fa: 'شاخ گیجگاهی' },
          { de: 'Hippocampushöhe', en: 'Hippocampal height', fa: 'ارتفاع هیپوکامپ' },
        ],
        rows: [
          ['0', { de: 'Keine', en: 'None', fa: 'بدون' }, { de: 'Normal', en: 'Normal', fa: 'طبیعی' }, { de: 'Normal', en: 'Normal', fa: 'طبیعی' }, { de: 'Normal', en: 'Normal', fa: 'طبیعی' }],
          ['1', { de: 'Minimal', en: 'Minimal', fa: 'حداقل' }, { de: 'Leicht ↑', en: 'Mildly ↑', fa: 'کمی ↑' }, { de: 'Normal', en: 'Normal', fa: 'طبیعی' }, { de: 'Normal', en: 'Normal', fa: 'طبیعی' }],
          ['2', { de: 'Leicht', en: 'Mild', fa: 'خفیف' }, { de: '↑', en: '↑', fa: '↑' }, { de: 'Leicht ↑', en: 'Mildly ↑', fa: 'کمی ↑' }, { de: 'Normal–leicht ↓', en: 'Normal–mild ↓', fa: 'طبیعی–کمی ↓' }],
          ['3', { de: 'Moderat', en: 'Moderate', fa: 'متوسط' }, { de: 'Deutlich ↑', en: 'Marked ↑', fa: 'واضح ↑' }, { de: '↑', en: '↑', fa: '↑' }, { de: '25–50 % ↓', en: '25–50 % ↓', fa: '۲۵–۵۰٪ ↓' }],
          ['4', { de: 'Schwer', en: 'Severe', fa: 'شدید' }, { de: 'Stark ↑', en: 'Severe ↑', fa: 'شدید ↑' }, { de: 'Stark ↑', en: 'Severe ↑', fa: 'شدید ↑' }, { de: '> 50 % ↓', en: '> 50 % ↓', fa: '> ۵۰٪ ↓' }],
        ],
        tableNote: {
          start: { de: 'Score 0–1: meist physiologisch · Score 3–4: immer pathologisch', en: 'Score 0–1: usually physiological · Score 3–4: always pathological', fa: 'امتیاز ۰–۱: اغلب فیزیولوژیک · امتیاز ۳–۴: همیشه غیرطبیعی' },
          cutoff: { de: 'Score 2: altersabhängig (s. oben) — jede Hemisphäre separat bewerten', en: 'Score 2: age-dependent (see above) — rate each hemisphere separately', fa: 'امتیاز ۲: وابسته به سن (ر.ک. بالا) — هر نیمکره جداگانه ارزیابی شود' },
        },
      },
    ],
  },
  {
    id: 'thorax', color: '#0ea5e9', iconId: 'thorax',
    name: { de: 'Thorax / Schilddrüse', en: 'Thorax / Thyroid', fa: 'توراکس / تیروئید' },
    items: [
      {
        id: 'lung-rads',
        name: { de: 'Lung-RADS', en: 'Lung-RADS', fa: 'Lung-RADS' },
        kompakt: {
          de: 'ACR-Kategorien (0–4X) für Befunde im LDCT-Lungenkrebsscreening.',
          en: 'ACR scoring (cat. 0–4X) for low-dose CT lung cancer screening – each category directly specifies the recommended management.',
          fa: 'سیستم ACR با دسته‌های ۰ تا 4X برای غربالگری سرطان ریه با CT دوز پایین؛ هر دسته توصیه مدیریتی مشخصی دارد.',
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
          de: 'CT-Kategorien (1–6) für die Wahrscheinlichkeit einer COVID-19-Pneumonie.',
          en: 'Standardises CT reporting in suspected COVID-19 pneumonia across 6 categories from "normal/non-infectious" (1) to "PCR-confirmed" (6).',
          fa: 'گزارش‌دهی CT در مشکوک به پنومونی COVID-19 را در ۶ دسته از «طبیعی/غیرعفونی» (۱) تا «تأییدشده با PCR» (۶) استانداردسازی می‌کند.',
        },
        ref: 'Prokop et al., Radiology 2020',
        cols: [{ de: 'Kategorie', en: 'Category', fa: 'دسته' }, { de: 'Wahrscheinlichkeit', en: 'Probability', fa: 'احتمال' }],
        rows: [
          ['1', { de: 'Sehr niedrig (normal / nicht-infektiös)', en: 'Very low (normal / non-infectious)', fa: 'بسیار پایین (طبیعی / غیرعفونی)' }],
          ['2', { de: 'Niedrig (typisch andere Infektion)', en: 'Low (typical of other infection)', fa: 'پایین (به نفع عفونت دیگر)' }],
          ['3', { de: 'Unklar / unspezifisch', en: 'Indeterminate / unspecific', fa: 'نامشخص / غیراختصاصی' }],
          ['4', { de: 'Hoch', en: 'High', fa: 'بالا' }],
          ['5', { de: 'Sehr hoch (typisches COVID-Muster)', en: 'Very high (typical COVID pattern)', fa: 'بسیار بالا (الگوی معمول COVID-19)' }],
          ['6', { de: 'PCR-bestätigt', en: 'PCR confirmed', fa: 'تأییدشده با PCR' }],
        ],
      },
      {
        id: 'fleischner',
        name: { de: 'Fleischner-Kriterien', en: 'Fleischner criteria', fa: 'معیارهای Fleischner' },
        kompakt: {
          de: 'Fleischner-Society-Leitlinien (2017) für Management inzidenteller Lungenrundherde.',
          en: 'Fleischner Society guidelines (2017) for management of incidental pulmonary nodules.',
          fa: 'دستورالعمل‌های انجمن Fleischner در سال ۲۰۱۷ برای مدیریت ندول‌های ریوی اتفاقی.',
        },
        ref: 'MacMahon et al., Radiology 2017;284:228–243 (Fleischner Society 2017)',
        refUrl: 'https://www.ncbi.nlm.nih.gov/books/NBK553863/table/ch5.Tab1/',
        detailPosition: 'beforeTables',
        einfach: {
          cols: [{ de: 'Situation', en: 'Situation', fa: 'وضعیت' }, { de: 'Grobe Empfehlung', en: 'Simplified recommendation', fa: 'توصیه ساده‌شده' }],
          rows: [
            [{ de: 'Sehr kleine solide Rundherde (< 6 mm)', en: 'Very small solid nodules (< 6 mm)', fa: 'ندول‌های جامد بسیار کوچک (< ۶ mm)' }, { de: 'Meist keine Kontrolle; bei hohem Risiko kann eine CT-Kontrolle nach 12 Monaten sinnvoll sein.', en: 'Usually no follow-up; in high-risk patients, CT at 12 months can be considered.', fa: 'معمولاً پیگیری لازم نیست؛ در خطر بالا می‌توان CT در ۱۲ ماه را در نظر گرفت.' }],
            [{ de: 'Solide Rundherde 6–8 mm', en: 'Solid nodules 6–8 mm', fa: 'ندول‌های جامد ۶–۸ mm' }, { de: 'Kontroll-CT: solitär eher 6–12 Monate, multipel eher früher nach 3–6 Monaten; danach ggf. zweite Kontrolle.', en: 'Follow-up CT: single nodules usually at 6–12 months, multiple nodules earlier at 3–6 months; then consider a second follow-up.', fa: 'CT پیگیری: ندول منفرد معمولاً ۶–۱۲ ماه، ندول‌های متعدد زودتر در ۳–۶ ماه؛ سپس در صورت نیاز کنترل دوم.' }],
            [{ de: 'Solide Rundherde > 8 mm', en: 'Solid nodules > 8 mm', fa: 'ندول‌های جامد > ۸ mm' }, { de: 'Aktivere Abklärung: kurze CT-Kontrolle, PET/CT und/oder Gewebesicherung je nach Morphologie und Risiko.', en: 'More active work-up: short-interval CT, PET/CT and/or tissue sampling depending on morphology and risk.', fa: 'بررسی فعال‌تر: CT کوتاه‌مدت، PET/CT و/یا نمونه‌برداری بر اساس مورفولوژی و خطر.' }],
            [{ de: 'Reines Milchglas ≥ 6 mm', en: 'Pure ground-glass ≥ 6 mm', fa: 'ground-glass خالص ≥ ۶ mm' }, { de: 'Zuerst Persistenz prüfen; wenn persistiert, langfristige Verlaufskontrollen bis 5 Jahre.', en: 'First confirm persistence; if persistent, long-term surveillance up to 5 years.', fa: 'ابتدا پایداری بررسی شود؛ در صورت باقی‌ماندن، پیگیری طولانی‌مدت تا ۵ سال.' }],
            [{ de: 'Part-solid ≥ 6 mm', en: 'Part-solid ≥ 6 mm', fa: 'part-solid ≥ ۶ mm' }, { de: 'Frühe Kontrolle nach 3–6 Monaten; der solide Anteil ist entscheidend für die weitere Abklärung.', en: 'Early follow-up at 3–6 months; the solid component drives further management.', fa: 'کنترل زودهنگام در ۳–۶ ماه؛ جزء جامد تعیین‌کننده ادامه تصمیم‌گیری است.' }],
            [{ de: 'Multiple subsolide Rundherde', en: 'Multiple subsolid nodules', fa: 'ندول‌های subsolid متعدد' }, { de: 'Zunächst kurzfristige Kontrolle; danach richtet sich das Vorgehen nach dem suspektesten Herd.', en: 'Start with short-interval follow-up; subsequent management is based on the most suspicious nodule.', fa: 'ابتدا کنترل کوتاه‌مدت؛ سپس ادامه تصمیم‌گیری بر اساس مشکوک‌ترین ندول انجام می‌شود.' }],
          ],
        },
        tables: [
          {
            title: { de: 'Standardversion – solide Lungenrundherde', en: 'Standard version – solid pulmonary nodules', fa: 'نسخه استاندارد – ندول‌های جامد ریوی' },
            cols: [{ de: 'Rundherd', en: 'Nodule', fa: 'ندول' }, { de: 'Niedriges Risiko', en: 'Low risk', fa: 'خطر پایین' }, { de: 'Hohes Risiko', en: 'High risk', fa: 'خطر بالا' }],
            rows: [
              [{ de: 'Solitär < 6 mm', en: 'Single < 6 mm', fa: 'منفرد < ۶ mm' }, { de: 'Keine Routinekontrolle', en: 'No routine follow-up', fa: 'بدون پیگیری روتین' }, { de: 'Optional CT nach 12 Monaten', en: 'Optional CT at 12 months', fa: 'CT اختیاری پس از ۱۲ ماه' }],
              [{ de: 'Solitär 6–8 mm', en: 'Single 6–8 mm', fa: 'منفرد ۶–۸ mm' }, { de: 'CT nach 6–12 Monaten; dann CT nach 18–24 Monaten erwägen', en: 'CT at 6–12 months; then consider CT at 18–24 months', fa: 'CT پس از ۶–۱۲ ماه؛ سپس CT در ۱۸–۲۴ ماه در نظر گرفته شود' }, { de: 'CT nach 6–12 Monaten; dann CT nach 18–24 Monaten', en: 'CT at 6–12 months; then CT at 18–24 months', fa: 'CT پس از ۶–۱۲ ماه؛ سپس CT در ۱۸–۲۴ ماه' }],
              [{ de: 'Solitär > 8 mm', en: 'Single > 8 mm', fa: 'منفرد > ۸ mm' }, { de: 'CT nach 3 Monaten, PET/CT oder Gewebesicherung erwägen', en: 'Consider CT at 3 months, PET/CT or tissue sampling', fa: 'CT در ۳ ماه، PET/CT یا نمونه‌برداری در نظر گرفته شود' }, { de: 'CT nach 3 Monaten, PET/CT oder Gewebesicherung erwägen', en: 'Consider CT at 3 months, PET/CT or tissue sampling', fa: 'CT در ۳ ماه، PET/CT یا نمونه‌برداری در نظر گرفته شود' }],
              [{ de: 'Multipel < 6 mm', en: 'Multiple < 6 mm', fa: 'متعدد < ۶ mm' }, { de: 'Keine Routinekontrolle', en: 'No routine follow-up', fa: 'بدون پیگیری روتین' }, { de: 'Optional CT nach 12 Monaten', en: 'Optional CT at 12 months', fa: 'CT اختیاری پس از ۱۲ ماه' }],
              [{ de: 'Multipel 6–8 mm', en: 'Multiple 6–8 mm', fa: 'متعدد ۶–۸ mm' }, { de: 'CT nach 3–6 Monaten; dann CT nach 18–24 Monaten erwägen', en: 'CT at 3–6 months; then consider CT at 18–24 months', fa: 'CT پس از ۳–۶ ماه؛ سپس CT در ۱۸–۲۴ ماه در نظر گرفته شود' }, { de: 'CT nach 3–6 Monaten; dann CT nach 18–24 Monaten', en: 'CT at 3–6 months; then CT at 18–24 months', fa: 'CT پس از ۳–۶ ماه؛ سپس CT در ۱۸–۲۴ ماه' }],
              [{ de: 'Multipel > 8 mm', en: 'Multiple > 8 mm', fa: 'متعدد > ۸ mm' }, { de: 'CT nach 3–6 Monaten; dann CT nach 18–24 Monaten erwägen', en: 'CT at 3–6 months; then consider CT at 18–24 months', fa: 'CT پس از ۳–۶ ماه؛ سپس CT در ۱۸–۲۴ ماه در نظر گرفته شود' }, { de: 'CT nach 3–6 Monaten; dann CT nach 18–24 Monaten', en: 'CT at 3–6 months; then CT at 18–24 months', fa: 'CT پس از ۳–۶ ماه؛ سپس CT در ۱۸–۲۴ ماه' }],
            ],
          },
          {
            title: { de: 'Standardversion – subsolide Lungenrundherde', en: 'Standard version – subsolid pulmonary nodules', fa: 'نسخه استاندارد – ندول‌های subsolid ریوی' },
            cols: [{ de: 'Rundherd', en: 'Nodule', fa: 'ندول' }, { de: '< 6 mm', en: '< 6 mm', fa: '< ۶ mm' }, { de: '≥ 6 mm', en: '≥ 6 mm', fa: '≥ ۶ mm' }],
            rows: [
              [{ de: 'Solitär: reines Milchglas', en: 'Single: pure ground-glass', fa: 'منفرد: ground-glass خالص' }, { de: 'Keine Routinekontrolle', en: 'No routine follow-up', fa: 'بدون پیگیری روتین' }, { de: 'CT nach 6–12 Monaten zur Persistenzkontrolle; dann alle 2 Jahre bis 5 Jahre', en: 'CT at 6–12 months to confirm persistence; then every 2 years until 5 years', fa: 'CT پس از ۶–۱۲ ماه برای تأیید پایداری؛ سپس هر ۲ سال تا ۵ سال' }],
              [{ de: 'Solitär: part-solid', en: 'Single: part-solid', fa: 'منفرد: part-solid' }, { de: 'Keine Routinekontrolle', en: 'No routine follow-up', fa: 'بدون پیگیری روتین' }, { de: 'CT nach 3–6 Monaten zur Persistenzkontrolle; bei stabilem Befund und Solid-Anteil < 6 mm jährlich bis 5 Jahre', en: 'CT at 3–6 months to confirm persistence; if unchanged and solid component < 6 mm, annual CT until 5 years', fa: 'CT پس از ۳–۶ ماه برای تأیید پایداری؛ اگر ثابت باشد و جزء جامد < ۶ mm باشد، CT سالانه تا ۵ سال' }],
              [{ de: 'Multipel', en: 'Multiple', fa: 'متعدد' }, { de: 'CT nach 3–6 Monaten; bei stabilem Befund CT nach 2 und 4 Jahren erwägen', en: 'CT at 3–6 months; if stable, consider CT at 2 and 4 years', fa: 'CT پس از ۳–۶ ماه؛ اگر پایدار باشد CT در ۲ و ۴ سال در نظر گرفته شود' }, { de: 'CT nach 3–6 Monaten; weiteres Management nach suspektestem Rundherd', en: 'CT at 3–6 months; subsequent management based on the most suspicious nodule(s)', fa: 'CT پس از ۳–۶ ماه؛ ادامه مدیریت بر اساس مشکوک‌ترین ندول' }],
            ],
          },
        ],
        detail: [
          {
            stage: { de: 'Anwendungsbereich', en: 'Scope', fa: 'کاربرد' },
            text: {
              de: 'Für inzidentell entdeckte Lungenrundherde im CT bei Erwachsenen. Nicht für Lungenkrebs-Screening, bekannte aktive Tumorerkrankung, Immunsuppression oder Patient:innen unter 35 Jahren gedacht.',
              en: 'For incidentally detected pulmonary nodules on CT in adults. Not intended for lung cancer screening, known active cancer, immunosuppression or patients younger than 35 years.',
              fa: 'برای ندول‌های ریوی تصادفی در CT بزرگسالان. برای غربالگری سرطان ریه، سرطان فعال شناخته‌شده، سرکوب ایمنی یا بیماران زیر ۳۵ سال مناسب نیست.',
            },
          },
          {
            stage: { de: 'Messung und Priorisierung', en: 'Measurement and prioritisation', fa: 'اندازه‌گیری و اولویت‌بندی' },
            text: {
              de: 'Größe als mittleren Durchmesser aus langem und kurzem Achsendurchmesser angeben; bei multiplen Rundherden richtet sich das Management nach dem suspektesten Herd, nicht nur nach dem größten.',
              en: 'Report size as the mean of long- and short-axis diameters; in multiple nodules, management is guided by the most suspicious nodule rather than size alone.',
              fa: 'اندازه به‌صورت میانگین قطر بلند و کوتاه گزارش شود؛ در ندول‌های متعدد، مدیریت بر اساس مشکوک‌ترین ندول است نه فقط بزرگ‌ترین ندول.',
            },
          },
        ],
      },
      {
        id: 'stanford-debakey',
        name: { de: 'Stanford / DeBakey', en: 'Stanford / DeBakey', fa: 'استنفورد / دبیکی' },
        kompakt: {
          de: 'Anatomische Einteilung der Aortendissektion nach Ascendens-Beteiligung und Ausdehnung.',
          en: 'Two commonly used anatomical classifications of aortic dissection: Stanford is based on ascending aortic involvement, while DeBakey describes origin and extent.',
          fa: 'دو طبقه‌بندی آناتومیک رایج دیسکسیون آئورت: استنفورد بر درگیری آئورت صعودی و دبیکی بر محل شروع و وسعت تکیه دارد.',
        },
        ref: 'DeBakey et al., J Thorac Cardiovasc Surg. 1965 · Daily et al., Ann Thorac Surg. 1970',
        tables: [
          {
            title: { de: 'Stanford-Klassifikation', en: 'Stanford classification', fa: 'طبقه‌بندی استنفورد' },
            cols: [{ de: 'Typ', en: 'Type', fa: 'نوع' }, { de: 'Definition', en: 'Definition', fa: 'تعریف' }, { de: 'Merksatz', en: 'Key point', fa: 'نکته کلیدی' }],
            rows: [
              ['A', { de: 'Aorta ascendens beteiligt – unabhängig von Ursprung und distaler Ausdehnung', en: 'Ascending aorta involved, regardless of tear origin or distal extent', fa: 'درگیری آئورت صعودی، مستقل از محل پارگی اولیه یا گسترش دیستال' }, { de: 'Ascendens = A', en: 'Ascending = A', fa: 'آئورت صعودی = A' }],
              ['B', { de: 'Keine Beteiligung der Aorta ascendens; meist Beginn distal der linken A. subclavia', en: 'No ascending aortic involvement; usually begins distal to the left subclavian artery', fa: 'بدون درگیری آئورت صعودی؛ معمولاً شروع دیستال شریان ساب‌کلاوین چپ' }, { de: 'Beginnt hinter dem Bogen', en: 'Begins beyond the arch', fa: 'شروع پس از قوس آئورت' }],
            ],
          },
          {
            title: { de: 'DeBakey-Klassifikation', en: 'DeBakey classification', fa: 'طبقه‌بندی دبیکی' },
            cols: [{ de: 'Typ', en: 'Type', fa: 'نوع' }, { de: 'Ursprung und Ausdehnung', en: 'Origin and extent', fa: 'محل شروع و وسعت' }],
            rows: [
              ['I', { de: 'Beginn in der Aorta ascendens, Ausdehnung über den Aortenbogen in die Aorta descendens', en: 'Originates in the ascending aorta and extends through the arch into the descending aorta', fa: 'شروع در آئورت صعودی و گسترش از قوس به آئورت نزولی' }],
              ['II', { de: 'Auf die Aorta ascendens begrenzt', en: 'Confined to the ascending aorta', fa: 'محدود به آئورت صعودی' }],
              ['IIIa', { de: 'Beginn distal der linken A. subclavia, auf die thorakale Aorta begrenzt', en: 'Originates distal to the left subclavian artery and remains confined to the thoracic aorta', fa: 'شروع دیستال ساب‌کلاوین چپ و محدود به آئورت توراسیک' }],
              ['IIIb', { de: 'Beginn distal der linken A. subclavia, Ausdehnung unter das Zwerchfell', en: 'Originates distal to the left subclavian artery and extends below the diaphragm', fa: 'شروع دیستال ساب‌کلاوین چپ و گسترش به زیر دیافراگم' }],
            ],
          },
        ],
      },
      {
        id: 'ti-rads',
        name: { de: 'TI-RADS (ACR)', en: 'TI-RADS (ACR)', fa: 'TI-RADS' },
        kompakt: {
          de: 'ACR-Ultraschallscore (TR1–TR5) für Schilddrüsenknoten und FNA-Schwellen.',
          en: 'Point-based ACR ultrasound system for thyroid nodules (TR1–TR5) with direct FNA recommendation by category and nodule size.',
          fa: 'سیستم امتیازی ACR سونوگرافی برای ندول‌های تیروئید (TR1–TR5) با توصیه مستقیم FNA بر اساس دسته و اندازه ندول.',
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
    id: 'abdomen', color: '#f59e0b', iconId: 'abdomen',
    name: { de: 'Abdomen', en: 'Abdomen', fa: 'شکم' },
    items: [
      {
        id: 'li-rads',
        name: { de: 'LI-RADS', en: 'LI-RADS', fa: 'LI-RADS' },
        kompakt: {
          de: 'ACR-Kategorien für Leberläsionen bei HCC-Risikopatient:innen in CT/MRT.',
          en: 'ACR categorisation of hepatic lesions in HCC-risk patients (LR-1 to LR-5, plus LR-M and LR-TIV) on CT and MRI.',
          fa: 'دسته‌بندی ACR ضایعات کبدی در بیماران پرخطر HCC (LR-1 تا LR-5، به‌اضافه LR-M و LR-TIV) در CT و MRI.',
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
          de: 'Kategorien zystischer Nierenläsionen nach Malignitätsrisiko und Management.',
          en: 'Classification of cystic renal lesions (cat. I–IV) by malignancy risk with direct management recommendations.',
          fa: 'طبقه‌بندی ضایعات کیستیک کلیه (دسته I–IV) بر اساس خطر بدخیمی با توصیه‌های مدیریتی مستقیم.',
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
          de: 'CT-Severity-Index (0–10) für den Schweregrad der akuten Pankreatitis.',
          en: 'Combines the Balthazar grade (A–E, 0–4 pts) and degree of necrosis (0–6 pts) into the CT Severity Index (0–10) for grading acute pancreatitis.',
          fa: 'درجه بالتازار (A–E، ۰–۴ امتیاز) را با میزان نکروز (۰–۶ امتیاز) در شاخص شدت CT (۰–۱۰) برای درجه‌بندی پانکراتیت حاد ترکیب می‌کند.',
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
          de: 'Funktionelle Lebersegment-Anatomie (I–VIII) für Läsionslokalisation und OP-Planung.',
          en: 'Divides the liver into 8 functionally independent segments (I–VIII) with individual vascular and biliary supply – the basis for all hepatic surgical planning.',
          fa: 'کبد را به ۸ سگمان مستقل عملکردی (I–VIII) با تأمین عروقی و صفراوی مجزا تقسیم می‌کند – پایه هر برنامه‌ریزی جراحی کبدی.',
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
          de: 'CT-orientierte Einteilung der Divertikelkrankheit und Divertikulitis.',
          en: 'DGAV/DGVS classification of diverticular disease (type 0–4 with CT-based subtypes), directly determining the therapeutic approach.',
          fa: 'طبقه‌بندی DGAV/DGVS بیماری دیورتیکولی (نوع ۰–۴ با زیرگروه‌های مبتنی بر CT)، که مستقیماً رویکرد درمانی را تعیین می‌کند.',
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
      {
        id: 'aast-ois',
        name: { de: 'AAST Organ Injury Scale', en: 'AAST Organ Injury Scale', fa: 'مقیاس آسیب اندام AAST' },
        kompakt: {
          de: 'CT-Schweregrade traumatischer Leber-, Milz- und Nierenverletzungen.',
          en: 'CT-based grading of traumatic liver, spleen and kidney injuries according to the joint 2018 AAST OIS revision.',
          fa: 'درجه‌بندی مبتنی بر CT آسیب‌های تروماتیک کبد، طحال و کلیه بر اساس بازنگری مشترک AAST OIS سال ۲۰۱۸.',
        },
        ref: 'Kozar et al., J Trauma Acute Care Surg. 2018;85:1119–1122 (AAST-OIS 2018)',
        refUrl: 'https://www.aast.org/resources-detail/injury-scoring-scale',
        tables: [
          {
            title: { de: 'Leberverletzung', en: 'Liver injury', fa: 'آسیب کبد' },
            cols: [{ de: 'Grad', en: 'Grade', fa: 'درجه' }, { de: 'CT-/Verletzungskriterium', en: 'CT / injury criterion', fa: 'معیار CT / آسیب' }],
            rows: [
              ['I', { de: 'Subkapsuläres Hämatom < 10 % der Oberfläche; Kapselriss < 1 cm Tiefe', en: 'Subcapsular haematoma <10% surface area; capsular tear <1 cm depth', fa: 'هماتوم ساب‌کپسولار <۱۰٪ سطح؛ پارگی کپسول با عمق <۱ سانتی‌متر' }],
              ['II', { de: 'Subkapsuläres Hämatom 10–50 %; intraparenchymales Hämatom < 10 cm; Riss 1–3 cm tief und ≤ 10 cm lang', en: 'Subcapsular haematoma 10–50%; intraparenchymal haematoma <10 cm; laceration 1–3 cm deep and ≤10 cm long', fa: 'هماتوم ساب‌کپسولار ۱۰–۵۰٪؛ داخل پارانشیمی <۱۰ سانتی‌متر؛ پارگی با عمق ۱–۳ و طول ≤۱۰ سانتی‌متر' }],
              ['III', { de: 'Subkapsuläres Hämatom > 50 % oder rupturiert; intraparenchymal ≥ 10 cm oder rupturiert; Riss > 3 cm; Gefäßverletzung/aktive Blutung im Leberparenchym', en: 'Subcapsular haematoma >50% or ruptured; intraparenchymal ≥10 cm or ruptured; laceration >3 cm; vascular injury/active bleeding contained within liver parenchyma', fa: 'هماتوم ساب‌کپسولار >۵۰٪ یا پاره؛ داخل پارانشیمی ≥۱۰ سانتی‌متر یا پاره؛ پارگی >۳ سانتی‌متر؛ آسیب عروقی/خونریزی فعال محدود به پارانشیم' }],
              ['IV', { de: 'Parenchymdestruktion von 25–75 % eines Leberlappens; aktive Blutung über das Leberparenchym hinaus ins Peritoneum', en: 'Parenchymal disruption of 25–75% of one hepatic lobe; active bleeding extending beyond liver parenchyma into the peritoneum', fa: 'تخریب ۲۵–۷۵٪ یک لوب کبد؛ خونریزی فعال فراتر از پارانشیم به صفاق' }],
              ['V', { de: 'Parenchymdestruktion > 75 % eines Leberlappens; juxtahepatische Venenverletzung', en: 'Parenchymal disruption >75% of one hepatic lobe; juxtahepatic venous injury', fa: 'تخریب >۷۵٪ یک لوب؛ آسیب وریدهای مجاور کبد' }],
              ['VI', { de: 'Leberavulsion', en: 'Hepatic avulsion', fa: 'کنده‌شدن کبد' }],
            ],
          },
          {
            title: { de: 'Milzverletzung', en: 'Spleen injury', fa: 'آسیب طحال' },
            cols: [{ de: 'Grad', en: 'Grade', fa: 'درجه' }, { de: 'CT-/Verletzungskriterium', en: 'CT / injury criterion', fa: 'معیار CT / آسیب' }],
            rows: [
              ['I', { de: 'Subkapsuläres Hämatom < 10 % der Oberfläche; Kapselriss < 1 cm Tiefe', en: 'Subcapsular haematoma <10% surface area; capsular tear <1 cm depth', fa: 'هماتوم ساب‌کپسولار <۱۰٪ سطح؛ پارگی کپسول با عمق <۱ سانتی‌متر' }],
              ['II', { de: 'Subkapsuläres Hämatom 10–50 %; intraparenchymal < 5 cm; Riss 1–3 cm ohne Trabekelgefäß', en: 'Subcapsular haematoma 10–50%; intraparenchymal <5 cm; laceration 1–3 cm without trabecular vessel injury', fa: 'هماتوم ساب‌کپسولار ۱۰–۵۰٪؛ داخل پارانشیمی <۵ سانتی‌متر؛ پارگی ۱–۳ سانتی‌متر بدون آسیب عروق ترابکولار' }],
              ['III', { de: 'Subkapsuläres Hämatom > 50 % oder rupturiert; intraparenchymal ≥ 5 cm oder rupturiert; Riss > 3 cm oder Trabekelgefäß; Gefäßverletzung/aktive Blutung innerhalb der Milzkapsel', en: 'Subcapsular haematoma >50% or ruptured; intraparenchymal ≥5 cm or ruptured; laceration >3 cm or involving trabecular vessels; vascular injury/active bleeding confined within the splenic capsule', fa: 'هماتوم ساب‌کپسولار >۵۰٪ یا پاره؛ داخل پارانشیمی ≥۵ سانتی‌متر یا پاره؛ پارگی >۳ سانتی‌متر یا عروق ترابکولار؛ خونریزی فعال محدود به کپسول' }],
              ['IV', { de: 'Segmentale/hiläre Gefäßverletzung mit > 25 % Devaskularisation; aktive Blutung über die Milz hinaus ins Peritoneum', en: 'Segmental or hilar vascular injury with >25% devascularisation; active bleeding extending beyond the spleen into the peritoneum', fa: 'آسیب عروقی سگمنتال/ناف با >۲۵٪ عدم خون‌رسانی؛ خونریزی فعال فراتر از طحال به صفاق' }],
              ['V', { de: 'Zertrümmerte Milz oder hiläre Gefäßverletzung mit Devaskularisation der Milz', en: 'Shattered spleen or hilar vascular injury with splenic devascularisation', fa: 'طحال متلاشی یا آسیب عروق ناف همراه با قطع خون‌رسانی طحال' }],
            ],
          },
          {
            title: { de: 'Nierenverletzung (AAST 2018)', en: 'Kidney injury (AAST 2018)', fa: 'آسیب کلیه (AAST ۲۰۱۸)' },
            cols: [{ de: 'Grad', en: 'Grade', fa: 'درجه' }, { de: 'CT-/Verletzungskriterium', en: 'CT / injury criterion', fa: 'معیار CT / آسیب' }],
            rows: [
              ['I', { de: 'Kontusion oder subkapsuläres Hämatom ohne Parenchymriss', en: 'Contusion or subcapsular haematoma without parenchymal laceration', fa: 'کوفتگی یا هماتوم ساب‌کپسولار بدون پارگی پارانشیم' }],
              ['II', { de: 'Perirenales Hämatom innerhalb der Gerota-Faszie; Parenchymriss ≤ 1 cm ohne Urinextravasation', en: 'Perirenal haematoma confined within Gerota fascia; parenchymal laceration ≤1 cm without urinary extravasation', fa: 'هماتوم پری‌رنال محدود به فاسیای ژروتا؛ پارگی پارانشیم ≤۱ سانتی‌متر بدون نشت ادرار' }],
              ['III', { de: 'Parenchymriss > 1 cm ohne Verletzung des Hohlsystems; Gefäßverletzung/aktive Blutung innerhalb der Gerota-Faszie', en: 'Parenchymal laceration >1 cm without collecting-system injury; vascular injury/active bleeding contained within Gerota fascia', fa: 'پارگی پارانشیم >۱ سانتی‌متر بدون آسیب سیستم جمع‌کننده؛ آسیب عروقی/خونریزی فعال محدود به فاسیای ژروتا' }],
              ['IV', { de: 'Riss bis ins Hohlsystem mit Urinextravasation; Nierenbecken-/UPJ-Verletzung; segmentale Gefäßverletzung; aktive Blutung über die Gerota-Faszie hinaus', en: 'Laceration into the collecting system with urinary extravasation; renal pelvis/UPJ injury; segmental vascular injury; active bleeding beyond Gerota fascia', fa: 'پارگی تا سیستم جمع‌کننده با نشت ادرار؛ آسیب لگنچه/UPJ؛ آسیب عروق سگمنتال؛ خونریزی فعال فراتر از فاسیای ژروتا' }],
              ['V', { de: 'Zertrümmerte Niere; Verletzung/Abriss der Hauptnierenarterie oder -vene; Hilusavulsion mit Devaskularisation', en: 'Shattered kidney; main renal artery or vein laceration/avulsion; hilar avulsion with devascularisation', fa: 'کلیه متلاشی؛ پارگی/کنده‌شدن شریان یا ورید اصلی کلیه؛ کنده‌شدن ناف با قطع خون‌رسانی' }],
            ],
          },
        ],
        detail: [
          {
            stage: { de: 'Versionshinweis', en: 'Version note', fa: 'یادداشت نسخه' },
            text: {
              de: 'Diese Seite verwendet bewusst die gemeinsame AAST-Revision 2018 für Leber, Milz und Niere. Für die Niere führt die AAST zusätzlich eine neuere Revision von 2025 separat.',
              en: 'This page deliberately uses the joint 2018 AAST revision for liver, spleen and kidney. AAST also lists a newer 2025 kidney revision separately.',
              fa: 'این صفحه عمداً از بازنگری مشترک AAST سال ۲۰۱۸ برای کبد، طحال و کلیه استفاده می‌کند. AAST بازنگری جدیدتر کلیه در سال ۲۰۲۵ را نیز جداگانه فهرست می‌کند.',
            },
          },
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
          de: 'ACR-Kategorien 0–6 für Brustbildgebung und Managementempfehlung.',
          en: 'ACR standardisation of mammography, breast US and breast MRI into categories 0–6, with directly assigned management from routine to biopsy.',
          fa: 'استانداردسازی ACR ماموگرافی، سونوگرافی و MRI پستان در دسته‌های ۰–۶، با اقدام مستقیم از روتین تا بیوپسی.',
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
        id: 'mamma-mrt-dichte',
        name: { de: 'Mamma-MRT: Drüsendichte & BPE', en: 'Breast MRI: Fibroglandular Tissue & BPE', fa: 'MRI پستان: بافت غده‌ای و BPE' },
        kompakt: {
          de: 'Mamma-MRT-Kategorien für fibroglanduläres Gewebe und Background Enhancement.',
          en: 'ACR BI-RADS MRI describes fibroglandular tissue (FGT a–d) and background parenchymal enhancement (BPE). Both affect breast MRI sensitivity and individual cancer risk.',
          fa: 'BI-RADS MRI پستان بافت فیبروغده‌ای (FGT a–d) و تقویت زمینه پارانشیمی (BPE) را توصیف می‌کند. هر دو بر حساسیت MRI پستان و خطر فردی سرطان تأثیر می‌گذارند.',
        },
        ref: "ACR BI-RADS® MRI Atlas, 5. Auflage (2013), D'Orsi et al.",
        cols: [
          { de: 'Grad', en: 'Grade', fa: 'درجه' },
          { de: 'Fibroglanduläres Gewebe (FGT)', en: 'Fibroglandular Tissue (FGT)', fa: 'بافت فیبروغده‌ای (FGT)' },
          { de: 'Anteil', en: 'Proportion', fa: 'نسبت' },
        ],
        rows: [
          ['a', { de: 'Fast vollständig fettig', en: 'Almost entirely fatty', fa: 'تقریباً کاملاً چربی' }, { de: '< 25 %', en: '< 25%', fa: '< ۲۵٪' }],
          ['b', { de: 'Verstreutes FGT', en: 'Scattered fibroglandular tissue', fa: 'بافت فیبروغده‌ای پراکنده' }, { de: '25–50 %', en: '25–50%', fa: '۲۵–۵۰٪' }],
          ['c', { de: 'Heterogenes FGT', en: 'Heterogeneous fibroglandular tissue', fa: 'بافت فیبروغده‌ای ناهمگن' }, { de: '51–75 %', en: '51–75%', fa: '۵۱–۷۵٪' }],
          ['d', { de: 'Extremes FGT', en: 'Extreme fibroglandular tissue', fa: 'بافت فیبروغده‌ای شدید' }, { de: '> 75 %', en: '> 75%', fa: '> ۷۵٪' }],
        ],
        detail: [
          {
            stage: { de: 'FGT Grad a – Fast vollständig fettig', en: 'FGT Grade a – Almost entirely fatty', fa: 'FGT درجه a – تقریباً کاملاً چربی' },
            text: {
              de: 'Weniger als 25 % Drüsengewebe. Die Brust besteht überwiegend aus Fettgewebe. Herde sind gut abgrenzbar. Das Hintergrundenhancement (BPE) ist gering, die Sensitivität der MRT hoch. Seltener bei prämenopausalen Frauen.',
              en: 'Less than 25% fibroglandular tissue. The breast consists predominantly of fatty tissue. Lesions are well delineated. Background enhancement (BPE) is low and MRI sensitivity is high. Less common in premenopausal women.',
              fa: 'کمتر از ۲۵٪ بافت غده‌ای. پستان عمدتاً از بافت چربی تشکیل شده است. ضایعات به‌خوبی مشخص هستند. BPE پایین و حساسیت MRI بالا است. در زنان پیش‌یائسه نادرتر است.',
            },
          },
          {
            stage: { de: 'FGT Grad b – Verstreutes Drüsengewebe', en: 'FGT Grade b – Scattered fibroglandular tissue', fa: 'FGT درجه b – بافت غده‌ای پراکنده' },
            text: {
              de: '25–50 % Drüsengewebe, verstreut eingelagert. Herde sind meistens gut sichtbar. Normalbefund bei postmenopausalen Frauen. BPE meist minimal bis gering.',
              en: '25–50% fibroglandular tissue, scattered throughout. Lesions are usually well visualised. Normal finding in postmenopausal women. BPE usually minimal to mild.',
              fa: '۲۵–۵۰٪ بافت غده‌ای، به‌صورت پراکنده. ضایعات معمولاً به‌خوبی قابل مشاهده هستند. یافته طبیعی در زنان پس از یائسگی. BPE معمولاً حداقل تا خفیف.',
            },
          },
          {
            stage: { de: 'FGT Grad c – Heterogenes Drüsengewebe', en: 'FGT Grade c – Heterogeneous fibroglandular tissue', fa: 'FGT درجه c – بافت غده‌ای ناهمگن' },
            text: {
              de: '51–75 % Drüsengewebe. Herde können durch das Enhancement des Normalgewebes maskiert werden. Häufig bei prämenopausalen Frauen. BPE oft moderat. Ggf. Zweitmeinung oder ergänzender US empfehlenswert.',
              en: '51–75% fibroglandular tissue. Lesions may be obscured by background tissue enhancement. Common in premenopausal women. BPE often moderate. A second opinion or supplementary ultrasound may be advisable.',
              fa: '۵۱–۷۵٪ بافت غده‌ای. ضایعات ممکن است با تقویت بافت زمینه پوشانده شوند. در زنان پیش‌یائسه شایع است. BPE اغلب متوسط. ممکن است نظر دوم یا سونوگرافی تکمیلی توصیه شود.',
            },
          },
          {
            stage: { de: 'FGT Grad d – Extremes Drüsengewebe', en: 'FGT Grade d – Extreme fibroglandular tissue', fa: 'FGT درجه d – بافت غده‌ای شدید' },
            text: {
              de: 'Mehr als 75 % Drüsengewebe. Höchste Masking-Gefahr: Herde können vollständig im Parenchym verborgen sein. BPE oft ausgeprägt (marked). Erhöhtes intrinsisches Karzinomrisiko (Dense Breast). Sorgfältige Dynamik-Auswertung und Subtraktionsbilder essenziell.',
              en: 'More than 75% fibroglandular tissue. Highest masking risk: lesions can be completely hidden within the parenchyma. BPE often marked. Inherently increased cancer risk (dense breast). Careful dynamic assessment and subtraction images are essential.',
              fa: 'بیش از ۷۵٪ بافت غده‌ای. بیشترین خطر ماسک‌شدن: ضایعات ممکن است کاملاً در پارانشیم پنهان شوند. BPE اغلب شدید. خطر ذاتی بالاتر سرطان (پستان متراکم). ارزیابی دقیق دینامیک و تصاویر تفریقی ضروری است.',
            },
          },
          {
            stage: { de: 'Background Parenchymal Enhancement (BPE)', en: 'Background Parenchymal Enhancement (BPE)', fa: 'تقویت زمینه پارانشیمی (BPE)' },
            text: {
              de: 'BPE beschreibt das physiologische Kontrastmittel-Enhancement des normalen Drüsengewebes in der Mamma-MRT:\n\n• Minimal (< 25 % des FGT enhances)\n• Mild (25–50 %)\n• Moderat (50–75 %)\n• Ausgeprägt / Marked (> 75 %)\n\nBPE ist hormonabhängig: am stärksten in der 2. Zyklushälfte (Lutealphase) und unter HRT; am geringsten in der frühen Follikelphase (2.–3. Zyklustag = optimaler Untersuchungszeitpunkt). Ausgeprägtes BPE kann Läsionen maskieren und die Spezifität der MRT reduzieren.',
              en: 'BPE describes the physiological contrast enhancement of normal fibroglandular tissue on breast MRI:\n\n• Minimal (< 25% of FGT enhances)\n• Mild (25–50%)\n• Moderate (50–75%)\n• Marked (> 75%)\n\nBPE is hormone-dependent: highest in the second half of the cycle (luteal phase) and under HRT; lowest in the early follicular phase (cycle day 2–3 = optimal timing). Marked BPE can mask lesions and reduce MRI specificity.',
              fa: 'BPE تقویت کنتراستی فیزیولوژیک بافت غده‌ای طبیعی در MRI پستان را توصیف می‌کند:\n\n• حداقل (< ۲۵٪ FGT تقویت می‌شود)\n• خفیف (۲۵–۵۰٪)\n• متوسط (۵۰–۷۵٪)\n• شدید (> ۷۵٪)\n\nBPE وابسته به هورمون است: در نیمه دوم سیکل (فاز لوتئال) و تحت HRT بیشترین و در اوایل فاز فولیکولار (روز ۲–۳ سیکل = زمان بهینه معاینه) کمترین میزان. BPE شدید می‌تواند ضایعات را پنهان کند و اختصاصیت MRI را کاهش دهد.',
            },
          },
          {
            stage: { de: 'Klinische Relevanz & Untersuchungszeitpunkt', en: 'Clinical relevance & examination timing', fa: 'ارتباط بالینی و زمان معاینه' },
            text: {
              de: 'Optimaler MRT-Zeitpunkt: 7.–14. Zyklustag (frühe bis mittlere Follikelphase) bei prämenopausalen Frauen → niedrigstes BPE, höchste Spezifität.\n\nFGT-Grad d + BPE marked: erhöhte Falsch-Positiv-Rate. Subtraktionsbilder und kinetische Kurvenanalyse (Wash-in, Plateau, Wash-out) sind entscheidend für die Differenzierung gutartig vs. malignes Enhancement.',
              en: 'Optimal MRI timing: cycle days 7–14 (early to mid-follicular phase) in premenopausal women → lowest BPE, highest specificity.\n\nFGT grade d + BPE marked: increased false-positive rate. Subtraction images and kinetic curve analysis (wash-in, plateau, wash-out) are decisive for differentiating benign from malignant enhancement.',
              fa: 'زمان بهینه MRI: روزهای ۷–۱۴ سیکل (اوایل تا میانه فاز فولیکولار) در زنان پیش‌یائسه → کمترین BPE، بیشترین اختصاصیت.\n\nFGT درجه d + BPE شدید: نرخ مثبت کاذب بالاتر. تصاویر تفریقی و تحلیل منحنی سینتیک (wash-in، plateau، wash-out) برای تمایز تقویت خوش‌خیم از بدخیم تعیین‌کننده هستند.',
            },
          },
        ],
      },
      {
        id: 'pi-rads',
        name: { de: 'PI-RADS', en: 'PI-RADS', fa: 'PI-RADS' },
        kompakt: {
          de: 'mpMRT-Kategorien 1–5 für klinisch signifikantes Prostatakarzinom.',
          en: 'Prostate MRI classification (level 1–5) for the probability of clinically significant prostate cancer.',
          fa: 'طبقه‌بندی MRI پروستات (سطح ۱–۵) برای احتمال سرطان پروستات مهم بالینی.',
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
              fa: 'سرطان clinically significant بسیار محتمل است. معیارها مشابه PI-RADS ۴ هستند، اما ضایعه ≥ ۱٫۵ سانتی‌متر است یا نشانه‌های گسترش خارج پروستات دارد. بیوپسی و مرحله‌بندی، احتمالاً با PSMA-PET، مطرح می‌شود.',
            },
          },
        ],
      },
      {
        id: 'harnstau-grad',
        name: { de: 'Harnstau-Grad', en: 'Hydronephrosis grade', fa: 'درجه هیدرونفروز' },
        kompakt: {
          de: 'Sonographische/CT-orientierte Einteilung der Harnstauung nach Dilatation von Nierenbecken, Kelchen und Parenchymverschmälerung.',
          en: 'Practical ultrasound/CT grading of hydronephrosis by dilatation of the renal pelvis, calyces and parenchymal thinning.',
          fa: 'درجه‌بندی عملی هیدرونفروز در سونوگرافی/CT بر اساس اتساع لگنچه، کالیس‌ها و نازک‌شدن پارانشیم.',
        },
        ref: 'Society for Fetal Urology (SFU) hydronephrosis grading; praktische radiologische Gradierung',
        refUrl: 'https://radiopaedia.org/articles/hydronephrosis-grading-sfu-system',
        einfach: {
          cols: [
            { de: 'Grad', en: 'Grade', fa: 'درجه' },
            { de: 'Kurzbeschreibung', en: 'Short description', fa: 'خلاصه' },
          ],
          rows: [
            ['0', { de: 'Keine Harnstauung', en: 'No hydronephrosis', fa: 'بدون هیدرونفروز' }],
            ['1', { de: 'Nur Nierenbecken erweitert', en: 'Renal pelvis only', fa: 'فقط اتساع لگنچه' }],
            ['2', { de: 'Nierenbecken + wenige Kelche erweitert', en: 'Pelvis + a few calyces', fa: 'لگنچه + چند کالیس' }],
            ['3', { de: 'Alle Kelche erweitert, Parenchym erhalten', en: 'All calyces dilated, parenchyma preserved', fa: 'اتساع همه کالیس‌ها، پارانشیم حفظ شده' }],
            ['4', { de: 'Dilatation mit Parenchymverschmälerung', en: 'Dilatation with parenchymal thinning', fa: 'اتساع همراه با نازک‌شدن پارانشیم' }],
          ],
        },
        cols: [
          { de: 'Grad', en: 'Grade', fa: 'درجه' },
          { de: 'Bildbefund', en: 'Imaging finding', fa: 'یافته تصویربرداری' },
          { de: 'Radiologischer Hinweis', en: 'Radiology note', fa: 'نکته رادیولوژی' },
        ],
        rows: [
          ['0',
            { de: 'Keine Erweiterung von Nierenbecken oder Kelchen.', en: 'No dilatation of the renal pelvis or calyces.', fa: 'بدون اتساع لگنچه یا کالیس‌ها.' },
            { de: 'Kein Hinweis auf Harnstauung.', en: 'No imaging evidence of hydronephrosis.', fa: 'شواهد تصویربرداری به نفع هیدرونفروز وجود ندارد.' },
          ],
          ['1',
            { de: 'Leichte Erweiterung des Nierenbeckens ohne Kelchdilatation.', en: 'Mild dilatation of the renal pelvis without calyceal dilatation.', fa: 'اتساع خفیف لگنچه بدون اتساع کالیس‌ها.' },
            { de: 'Geringgradig; bei voller Blase, Schwangerschaft oder Diurese klinisch korrelieren.', en: 'Mild; correlate with bladder filling, pregnancy or diuresis.', fa: 'خفیف؛ با پر بودن مثانه، بارداری یا دیورز تطبیق داده شود.' },
          ],
          ['2',
            { de: 'Nierenbecken erweitert, zusätzlich einzelne/mehrere Kelche sichtbar erweitert; Parenchym normal.', en: 'Renal pelvis dilated with some calyceal dilatation; parenchyma normal.', fa: 'اتساع لگنچه همراه با اتساع تعدادی از کالیس‌ها؛ پارانشیم طبیعی.' },
            { de: 'Leicht bis mäßig; Uretererweiterung und Ursache distal aktiv suchen.', en: 'Mild to moderate; actively look for ureteral dilatation and a distal cause.', fa: 'خفیف تا متوسط؛ اتساع حالب و علت دیستال فعالانه بررسی شود.' },
          ],
          ['3',
            { de: 'Deutliche Erweiterung von Nierenbecken und allen Kelchen; Parenchymdicke noch erhalten.', en: 'Marked dilatation of the renal pelvis and all calyces; parenchymal thickness preserved.', fa: 'اتساع واضح لگنچه و همه کالیس‌ها؛ ضخامت پارانشیم هنوز حفظ شده است.' },
            { de: 'Mäßig bis hochgradig; Obstruktionszeichen, Stein, Tumor, Striktur oder Reflux prüfen.', en: 'Moderate to severe; assess for obstruction, stone, tumour, stricture or reflux.', fa: 'متوسط تا شدید؛ انسداد، سنگ، تومور، تنگی یا رفلاکس بررسی شود.' },
          ],
          ['4',
            { de: 'Massive Dilatation mit Abflachung/Keulenform der Kelche und Ausdünnung des Nierenparenchyms.', en: 'Severe dilatation with ballooned/blunted calyces and thinning of the renal parenchyma.', fa: 'اتساع شدید با کالیس‌های گرد/بلانت و نازک‌شدن پارانشیم کلیه.' },
            { de: 'Hochgradig/chronisch möglich; Funktionsverlust und dringliche urologische Abklärung beachten.', en: 'Severe, possibly chronic; consider functional loss and urgent urologic evaluation.', fa: 'شدید و احتمالاً مزمن؛ کاهش عملکرد و نیاز به ارزیابی اورولوژی فوری مدنظر باشد.' },
          ],
        ],
        detail: [
          {
            stage: { de: 'Was im Befund sagen?', en: 'What to report?', fa: 'در گزارش چه بنویسیم؟' },
            text: {
              de: 'Grad, Seite, Nierenbecken-/Kelchdilatation, Parenchymdicke, Uretererweiterung und vermutete Ursache nennen. Bei einseitigem Harnstau immer nach Stein, Tumor, Striktur oder extrinsischer Kompression suchen.',
              en: 'Report grade, side, renal pelvis/calyceal dilatation, parenchymal thickness, ureteral dilatation and suspected cause. In unilateral hydronephrosis, actively look for stone, tumour, stricture or extrinsic compression.',
              fa: 'درجه، سمت، اتساع لگنچه/کالیس‌ها، ضخامت پارانشیم، اتساع حالب و علت احتمالی را بنویسید. در هیدرونفروز یک‌طرفه فعالانه به دنبال سنگ، تومور، تنگی یا فشار خارجی باشید.',
            },
          },
          {
            stage: { de: 'Wichtige Fallstricke', en: 'Important pitfalls', fa: 'دام‌های مهم' },
            text: {
              de: 'Ein extrarenales Nierenbecken, parapelvine Zysten und volle Harnblase können Harnstauung imitieren. Eine leichte physiologische Dilatation kann bei Schwangerschaft oder starker Diurese auftreten.',
              en: 'An extrarenal pelvis, parapelvic cysts and a full bladder can mimic hydronephrosis. Mild physiological dilatation can occur in pregnancy or marked diuresis.',
              fa: 'لگنچه خارج‌کلیوی، کیست‌های پاراپلویک و مثانه پر می‌توانند هیدرونفروز را تقلید کنند. اتساع خفیف فیزیولوژیک در بارداری یا دیورز زیاد ممکن است دیده شود.',
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
          de: 'T2-MRT-Gradierung (I–V) der Bandscheibendegeneration.',
          en: 'Grades intervertebral disc degeneration on T2 MRI (grade I–V) by signal, structure and height.',
          fa: 'دژنراسیون دیسک بین‌مهره‌ای را در T2 MRI بر اساس سیگنال، ساختار و ارتفاع (درجه I–V) درجه‌بندی می‌کند.',
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
          de: 'MRT-Typen reaktiver Knochenmarkveränderungen an Wirbelendplatten.',
          en: 'Classifies reactive bone marrow changes at vertebral endplates on MRI: type 1 = oedema (T1↓ T2↑), type 2 = fatty (T1↑), type 3 = sclerosis (T1↓ T2↓).',
          fa: 'تغییرات واکنشی مغز استخوان در صفحات انتهایی مهره‌ها را در MRI طبقه‌بندی می‌کند: نوع ۱ = ادم (T1↓ T2↑)، نوع ۲ = چربی (T1↑)، نوع ۳ = اسکلروز (T1↓ T2↓).',
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
          de: 'Semiquantitative Graduierung osteoporotischer Wirbelkörperfrakturen.',
          en: 'Semi-quantitative radiographic grading of osteoporotic vertebral fractures by height loss (grade 1–3).',
          fa: 'درجه‌بندی نیمه‌کمی رادیوگرافیک شکستگی‌های مهره‌ای استئوپروتیک بر اساس کاهش ارتفاع (درجه ۱–۳).',
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
        id: 'salter-harris',
        name: { de: 'Salter-Harris', en: 'Salter-Harris', fa: 'سالتر-هریس' },
        kompakt: {
          de: 'Typ-I–V-Einteilung kindlicher Epiphysenfugenfrakturen.',
          en: 'Type I–V classification of paediatric physeal fractures.',
          fa: 'طبقه‌بندی نوع I تا V شکستگی‌های فیز کودکان.',
        },
        image: {
          src: '/referenzen/klassifikationen/salter-harris.jpg',
          alt: { de: 'Salter-Harris Typ I bis V', en: 'Salter-Harris types I to V', fa: 'انواع I تا V سالتر-هریس' },
        },
        ref: 'Salter & Harris, JBJS 1963',
        einfach: {
          cols: [{ de: 'Merkwort', en: 'Mnemonic', fa: 'یادآور' }, { de: 'Bedeutung', en: 'Meaning', fa: 'معنا' }],
          rows: [
            ['S – Slip', { de: 'Typ I: Fraktur nur durch die Wachstumsfuge.', en: 'Type I: fracture through the physis only.', fa: 'نوع I: شکستگی فقط از فیز عبور می‌کند.' }],
            ['A – Above', { de: 'Typ II: zusätzlich Metaphyse oberhalb der Fuge.', en: 'Type II: extends above the physis into the metaphysis.', fa: 'نوع II: به متافیز در بالای فیز امتداد دارد.' }],
            ['L – Lower', { de: 'Typ III: zusätzlich Epiphyse unterhalb der Fuge, intraartikulär.', en: 'Type III: extends below the physis into the epiphysis, intra-articular.', fa: 'نوع III: به اپی‌فیز زیر فیز امتداد دارد، داخل مفصلی.' }],
            ['T – Through', { de: 'Typ IV: durch Metaphyse, Physe und Epiphyse.', en: 'Type IV: through metaphysis, physis and epiphysis.', fa: 'نوع IV: از متافیز، فیز و اپی‌فیز عبور می‌کند.' }],
            ['R – Rammed', { de: 'Typ V: Kompressions-/Quetschverletzung der Fuge.', en: 'Type V: crush/compression injury of the physis.', fa: 'نوع V: آسیب فشاری/له‌شدگی فیز.' }],
          ],
        },
        cols: [{ de: 'Typ', en: 'Type', fa: 'نوع' }, { de: 'Frakturverlauf', en: 'Fracture pattern', fa: 'الگوی شکستگی' }, { de: 'Radiologische Relevanz', en: 'Radiology relevance', fa: 'اهمیت رادیولوژیک' }],
        rows: [
          ['I', { de: 'Nur durch die Physe; keine metaphysäre oder epiphysäre Frakturlinie', en: 'Through the physis only; no metaphyseal or epiphyseal fracture line', fa: 'فقط از فیز؛ بدون خط شکستگی متافیزی یا اپی‌فیزی' }, { de: 'Im Röntgen ggf. okkult; Fugenverbreiterung/Fehlstellung und Klinik beachten', en: 'May be radiographically occult; look for physeal widening/malalignment and clinical tenderness', fa: 'ممکن است در رادیوگرافی مخفی باشد؛ به پهن‌شدن فیز/بدراستایی و علائم بالینی توجه شود' }],
          ['II', { de: 'Physe + Metaphyse; epiphysäre Gelenkfläche ausgespart', en: 'Physis + metaphysis; epiphyseal articular surface spared', fa: 'فیز + متافیز؛ سطح مفصلی اپی‌فیز سالم می‌ماند' }, { de: 'Häufigster Typ; Thurston-Holland-Fragment typisch', en: 'Most common type; classic Thurston-Holland fragment', fa: 'شایع‌ترین نوع؛ قطعه Thurston-Holland کلاسیک است' }],
          ['III', { de: 'Physe + Epiphyse bis in die Gelenkfläche', en: 'Physis + epiphysis extending into the articular surface', fa: 'فیز + اپی‌فیز با امتداد به سطح مفصلی' }, { de: 'Intraartikulär; Stufenbildung/Dislokation exakt beurteilen, CT/MRT ggf. hilfreich', en: 'Intra-articular; assess step-off/displacement precisely, CT/MRI may help', fa: 'داخل مفصلی؛ پله/جابجایی دقیق ارزیابی شود، CT/MRI ممکن است کمک کند' }],
          ['IV', { de: 'Durch Metaphyse, Physe und Epiphyse', en: 'Through metaphysis, physis and epiphysis', fa: 'از متافیز، فیز و اپی‌فیز عبور می‌کند' }, { de: 'Intraartikulär und fugenquerend; anatomische Reposition wichtig', en: 'Intra-articular and crosses the physis; anatomical reduction is important', fa: 'داخل مفصلی و عبورکننده از فیز؛ جااندازی آناتومیک مهم است' }],
          ['V', { de: 'Axiale Kompression/Crush der Physe', en: 'Axial compression/crush injury of the physis', fa: 'آسیب فشاری محوری/له‌شدگی فیز' }, { de: 'Akut oft schwer erkennbar; hohes Risiko für Wachstumsstörung', en: 'Often difficult to recognise acutely; high risk of growth arrest', fa: 'در فاز حاد اغلب دشوار تشخیص داده می‌شود؛ خطر بالای توقف رشد' }],
        ],
        detail: [
          {
            stage: { de: 'Befund-Tipp', en: 'Reporting tip', fa: 'نکته گزارش' },
            text: {
              de: 'Im Befund Typ, betroffene Fuge, Dislokation/Angulation, Gelenkbeteiligung und ggf. metaphysäres Fragment nennen. Bei unklarem Röntgen und lokaler Druckdolenz die Fuge gezielt mitbeurteilen.',
              en: 'Report the type, involved physis, displacement/angulation, articular involvement and any metaphyseal fragment. If radiographs are unclear but focal tenderness is present, assess the physis specifically.',
              fa: 'در گزارش نوع، فیز درگیر، جابجایی/زاویه‌دار شدن، درگیری مفصل و قطعه متافیزی احتمالی ذکر شود. اگر رادیوگرافی نامشخص ولی درد موضعی وجود دارد، فیز را دقیق بررسی کنید.',
            },
          },
        ],
      },
      {
        id: 'kellgren-lawrence',
        name: { de: 'Kellgren-Lawrence', en: 'Kellgren-Lawrence', fa: 'کلگرن-لارنس' },
        kompakt: {
          de: 'Röntgen-Gradierung (0–4) der Osteoarthrose.',
          en: 'Radiographic severity grading of osteoarthritis (grade 0–4) based on osteophytes, joint-space narrowing and sclerosis.',
          fa: 'درجه‌بندی شدت رادیوگرافیک استئوآرتریت (درجه ۰–۴) بر اساس استئوفیت، باریک‌شدن فضای مفصلی و اسکلروز.',
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
          de: 'Dislokationsgrade I–IV medialer Schenkelhalsfrakturen.',
          en: 'Classifies medial femoral neck fractures by displacement (grade I–IV) – key for choosing between osteosynthesis (I/II) and arthroplasty (III/IV).',
          fa: 'شکستگی‌های گردن داخلی فمور را بر اساس جابجایی (درجه I–IV) طبقه‌بندی می‌کند – تعیین‌کننده انتخاب بین استئوسنتز (I/II) و پروتز (III/IV).',
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
          de: 'Standardisierte Response-Kategorien solider Tumoren nach Größenänderung.',
          en: 'International standard for solid tumour treatment response (CR/PR/SD/PD) based on percentage change in the sum of target lesion diameters.',
          fa: 'استاندارد بین‌المللی برای پاسخ به درمان تومورهای جامد (CR/PR/SD/PD) بر اساس درصد تغییر مجموع قطرهای ضایعات هدف.',
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
          de: 'Staging-System solider Tumoren nach T, N und M.',
          en: 'Universal staging system for solid tumours: T (size/extent), N (lymph nodes), M (metastasis) – combined into overall stage I–IV.',
          fa: 'سیستم جهانی مرحله‌بندی تومورهای جامد: T برای اندازه/گسترش تومور، N برای غدد لنفاوی و M برای متاستاز؛ در نهایت مرحله کلی I–IV تعیین می‌شود.',
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
          de: '5-Punkte-PET/CT-Skala für metabolisches Lymphom-Ansprechen.',
          en: '5-point PET/CT scale for metabolic treatment response in lymphomas (reference: mediastinum / liver).',
          fa: 'مقیاس ۵ امتیازی PET/CT برای پاسخ متابولیک به درمان در لنفوم (مرجع: مدیاستینوم / کبد).',
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
      {
        id: 'lugano',
        name: { de: 'Lugano-Kriterien', en: 'Lugano criteria', fa: 'معیارهای لوگانو' },
        kompakt: {
          de: 'Staging- und Response-Kriterien für Lymphome.',
          en: 'Standard for lymphoma staging and treatment response: anatomical stage I–IV and, for FDG-avid lymphomas, PET/CT-based response using Deauville.',
          fa: 'استاندارد مرحله‌بندی و ارزیابی پاسخ درمانی لنفوم: مراحل آناتومیک I تا IV و در لنفوم‌های FDG-avid، پاسخ بر پایه PET/CT و Deauville سنجیده می‌شود.',
        },
        ref: 'Cheson et al., J Clin Oncol. 2014;32:3059–3068',
        refUrl: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4979083/',
        tables: [
          {
            title: { de: 'Anatomisches Staging', en: 'Anatomical staging', fa: 'مرحله‌بندی آناتومیک' },
            cols: [{ de: 'Stadium', en: 'Stage', fa: 'مرحله' }, { de: 'Befall', en: 'Involvement', fa: 'درگیری' }],
            rows: [
              ['I', { de: 'Eine Lymphknotenregion; IE: ein einzelner extranodaler Herd ohne Lymphknotenbefall', en: 'One nodal region; IE: a single extranodal site without nodal involvement', fa: 'یک ناحیه غدد لنفاوی؛ IE: یک محل خارج‌گره‌ای منفرد بدون درگیری گره‌ای' }],
              ['II', { de: '≥ 2 Lymphknotenregionen auf derselben Zwerchfellseite; IIE: begrenzte zusammenhängende extranodale Ausbreitung', en: '≥2 nodal regions on the same side of the diaphragm; IIE: limited contiguous extranodal extension', fa: '≥۲ ناحیه غدد لنفاوی در یک سوی دیافراگم؛ IIE: گسترش محدود و مجاور خارج‌گره‌ای' }],
              ['III', { de: 'Lymphknotenregionen beidseits des Zwerchfells; Milzbeteiligung möglich', en: 'Nodal regions on both sides of the diaphragm; spleen may be involved', fa: 'غدد لنفاوی در دو سوی دیافراگم؛ امکان درگیری طحال' }],
              ['IV', { de: 'Disseminierter extranodaler Organbefall, z. B. Knochenmark, Leber oder nicht direkt angrenzende Lunge', en: 'Disseminated extranodal organ involvement, e.g. bone marrow, liver or non-contiguous lung', fa: 'درگیری منتشر اندام‌های خارج‌گره‌ای، مانند مغز استخوان، کبد یا ریه غیرمجاور' }],
            ],
          },
          {
            title: { de: 'PET/CT-Therapieansprechen bei FDG-aviden Lymphomen', en: 'PET/CT treatment response in FDG-avid lymphomas', fa: 'ارزیابی پاسخ درمانی با PET/CT در لنفوم‌های FDG-avid' },
            cols: [{ de: 'Response', en: 'Response', fa: 'پاسخ' }, { de: 'Lugano-Kriterium', en: 'Lugano criterion', fa: 'معیار لوگانو' }],
            rows: [
              ['CMR', { de: 'Komplette metabolische Response: Deauville 1–3, mit oder ohne Residualmasse', en: 'Complete metabolic response: Deauville 1–3, with or without a residual mass', fa: 'پاسخ متابولیک کامل: دوویل ۱–۳، با یا بدون توده باقیمانده' }],
              ['PMR', { de: 'Partielle metabolische Response: Deauville 4–5 mit gegenüber Ausgangsbefund vermindertem Uptake, keine neuen Läsionen', en: 'Partial metabolic response: Deauville 4–5 with reduced uptake from baseline and no new lesions', fa: 'پاسخ متابولیک نسبی: دوویل ۴–۵ با کاهش جذب نسبت به پایه و بدون ضایعه جدید' }],
              ['NMR', { de: 'Keine metabolische Response: Deauville 4–5 ohne wesentliche Änderung, keine neuen Läsionen', en: 'No metabolic response: Deauville 4–5 without significant change and no new lesions', fa: 'بدون پاسخ متابولیک: دوویل ۴–۵ بدون تغییر معنی‌دار و بدون ضایعه جدید' }],
              ['PMD', { de: 'Progressive metabolische Erkrankung: Deauville 4–5 mit zunehmendem Uptake und/oder neue FDG-avide Herde', en: 'Progressive metabolic disease: Deauville 4–5 with increased uptake and/or new FDG-avid foci', fa: 'بیماری متابولیک پیشرونده: Deauville ۴–۵ با افزایش uptake و/یا کانون‌های جدید FDG-avid' }],
            ],
          },
        ],
        detail: [
          {
            stage: { de: 'Wichtige Einordnung', en: 'Important context', fa: 'نکته مهم' },
            text: {
              de: 'PET/CT ist für FDG-avide Lymphome bevorzugt. Bei nicht oder variabel FDG-aviden Subtypen erfolgt die Responsebeurteilung primär CT-basiert. Bulky Disease wird über die größte Tumormasse dokumentiert; B-Symptome werden separat erfasst.',
              en: 'PET/CT is preferred for FDG-avid lymphomas. In non- or variably FDG-avid subtypes, response is assessed primarily by CT. Bulky disease is documented using the largest tumour mass; B symptoms are recorded separately.',
              fa: 'PET/CT برای لنفوم‌های FDG-avid ارجح است. در انواع با uptake کم یا متغیر، پاسخ عمدتاً با CT ارزیابی می‌شود. bulky disease با بزرگ‌ترین توده ثبت می‌شود و علائم B جداگانه گزارش می‌شوند.',
            },
          },
        ],
      },
    ],
  },
]

const CLASSIFICATION_ENHANCEMENTS = {
  fazekas: {
    erklaerung: { de: 'Fazekas beschreibt die Ausprägung chronischer Marklagerläsionen in der MRT. Nützlich ist die Skala vor allem, um Mikroangiopathie standardisiert, knapp und verlaufstauglich zu berichten.' },
    radiologie: [
      { stage: { de: 'Was ansehen?' }, text: { de: 'T2/FLAIR: punktförmige, konfluierende oder ausgedehnte periventrikuläre und tiefe Marklagerhyperintensitäten getrennt beurteilen.' } },
      { stage: { de: 'Wichtig im Befund' }, text: { de: 'Alter, vaskuläre Risikofaktoren, Lakunen/Mikroblutungen und Differenzialdiagnosen wie MS oder vaskulitische Muster mitdenken.' } },
    ],
    sources: [{ label: { de: 'Fazekas et al., AJR 1987' }, url: 'https://pubmed.ncbi.nlm.nih.gov/3496763/' }],
  },
  aspects: {
    erklaerung: { de: 'ASPECTS quantifiziert frühe Ischämiezeichen im Mediastromgebiet im nativen CT oder in der DWI. Ausgangspunkt sind 10 Punkte; für jedes betroffene Areal wird 1 Punkt abgezogen.' },
    radiologie: [
      { stage: { de: 'Was ansehen?' }, text: { de: 'Caudatus, Lentiforme, Insula, Kapsel sowie M1–M6 systematisch prüfen; Hypodensität, Schwellung und aufgehobene Rinden-Mark-Grenze zählen.' } },
      { stage: { de: 'Vorgehen' }, text: { de: 'Immer Seite, Modalität und Endpunkt nennen, z. B. „ASPECTS rechts 7/10 im nativen CT“.' } },
    ],
    sources: [{ label: { de: 'Barber et al., Lancet 2000' }, url: 'https://pubmed.ncbi.nlm.nih.gov/10972352/' }],
  },
  'pc-aspects': {
    erklaerung: { de: 'pc-ASPECTS überträgt das ASPECTS-Prinzip auf den posterioren Kreislauf. Er dient der standardisierten Beschreibung früher Ischämiezeichen in Hirnstamm, Thalamus, Okzipitallappen und Kleinhirn.' },
    radiologie: [
      { stage: { de: 'Was ansehen?' }, text: { de: 'Mittelhirn und Pons sind doppelt gewichtet; Thalami, Okzipitallappen und Kleinhirnseiten werden einzeln bewertet.' } },
      { stage: { de: 'Vorgehen' }, text: { de: 'DWI ist sensitiver als CT; bei Basilarisverschluss Score und betroffene Kernstrukturen klar benennen.' } },
    ],
    sources: [{ label: { de: 'Puetz et al., Stroke 2008' }, url: 'https://pubmed.ncbi.nlm.nih.gov/18719026/' }],
  },
  mcdonald: {
    erklaerung: { de: 'Die McDonald-Kriterien dienen der MS-Diagnose durch Nachweis räumlicher und zeitlicher Dissemination. Radiologisch geht es um typische Läsionsorte, neue Läsionen und Kontrastmittelaufnahme.' },
    radiologie: [
      { stage: { de: 'Was ansehen?' }, text: { de: 'Periventrikulär, kortikal/juxtakortikal, infratentoriell und spinal prüfen; typische Dawson-Finger und KM-aktive Läsionen erwähnen.' } },
      { stage: { de: 'Vorgehen' }, text: { de: 'MRT-Befund nicht allein als MS diagnostizieren: klinischen Schub, Liquor und Differenzialdiagnosen berücksichtigen.' } },
    ],
    sources: [{ label: { de: 'Thompson et al., Lancet Neurol 2018' }, url: 'https://pubmed.ncbi.nlm.nih.gov/29275977/' }],
  },
  fisher: {
    erklaerung: { de: 'Die Fisher-Skala beschreibt Blutmenge und Blutverteilung bei aneurysmatischer SAB im CT. Sie wird genutzt, um Vasospasmus-Risiko grob zu kommunizieren.' },
    radiologie: [
      { stage: { de: 'Was ansehen?' }, text: { de: 'Dicke subarachnoidaler Blutauflagerungen, intraventrikuläre Blutanteile und intrazerebrale Hämatome im initialen CT beurteilen.' } },
      { stage: { de: 'Befund-Tipp' }, text: { de: 'Zusätzlich Hydrozephalus, Aneurysmaverdacht und Blutverteilung zur Lokalisation der Blutungsquelle nennen.' } },
    ],
    sources: [{ label: { de: 'Fisher et al., Neurosurgery 1980' }, url: 'https://pubmed.ncbi.nlm.nih.gov/7354890/' }],
  },
  'mta-score': {
    erklaerung: { de: 'Der MTA-Score bewertet mediale Temporallappenatrophie, insbesondere Hippokampusatrophie. Er hilft als strukturierter Baustein bei Demenzabklärung, ersetzt aber keine klinische Diagnose.' },
    radiologie: [
      { stage: { de: 'Was ansehen?' }, text: { de: 'Koronare T1/T2-Ebene: Choroidfissur, Temporalhornweite und Hippokampushöhe beidseits beurteilen.' } },
      { stage: { de: 'Befund-Tipp' }, text: { de: 'Seitendifferenz, Alter und zusätzliche Atrophiemuster wie frontotemporal oder posterior-kortikal erwähnen.' } },
    ],
    sources: [{ label: { de: 'Scheltens et al., J Neurol Sci 1992' }, url: 'https://pubmed.ncbi.nlm.nih.gov/1431963/' }],
  },
  'lung-rads': {
    erklaerung: { de: 'Lung-RADS standardisiert CT-Lungenkrebs-Screeningbefunde. Es ist für Screening-Programme gedacht und nicht identisch mit Fleischner-Management inzidenteller Rundherde.' },
    radiologie: [
      { stage: { de: 'Was ansehen?' }, text: { de: 'Nodulustyp, mittlere Größe, Wachstum, neue Noduli und solide Komponente bei subsoliden Herden erfassen.' } },
      { stage: { de: 'Vorgehen' }, text: { de: 'Kategorie und Managementempfehlung nennen; Zusatzmodifier wie S oder C nur bei passenden Befunden verwenden.' } },
    ],
    sources: [{ label: { de: 'ACR Lung-RADS' }, url: 'https://www.acr.org/Clinical-Resources/Reporting-and-Data-Systems/Lung-Rads' }],
  },
  'co-rads': {
    erklaerung: { de: 'CO-RADS beschreibt die CT-Wahrscheinlichkeit einer COVID-19-Pneumonie. Es ist ein Befundwahrscheinlichkeits-System und keine klinische Schweregradeinteilung.' },
    radiologie: [
      { stage: { de: 'Was ansehen?' }, text: { de: 'Bilaterale periphere Milchglastrübungen, Crazy Paving, Konsolidierungen, Verteilung und alternative Diagnosen prüfen.' } },
      { stage: { de: 'Befund-Tipp' }, text: { de: 'Kategorie mit klinischem Kontext und PCR/Labordaten korrelieren; andere infektiöse oder ödematöse Muster nennen.' } },
    ],
    sources: [{ label: { de: 'Prokop et al., Radiology 2020' }, url: 'https://pubmed.ncbi.nlm.nih.gov/32339082/' }],
  },
  fleischner: {
    radiologie: [
      { stage: { de: 'Was ansehen?' }, text: { de: 'Nodulustyp, mittlere Größe, solitär/multipel, Wachstum, solide Komponente und suspekte Morphologie wie Spikulation beurteilen.' } },
      { stage: { de: 'Anwendung prüfen' }, text: { de: 'Nur für inzidentelle Rundherde bei Erwachsenen ohne bekannte aktive Tumorerkrankung/Immunsuppression; Screening fällt eher unter Lung-RADS.' } },
    ],
    sources: [
      { label: { de: 'MacMahon et al., Radiology 2017' }, url: 'https://pubmed.ncbi.nlm.nih.gov/28240562/' },
      { label: { de: 'Tabellen: NCBI Bookshelf' }, url: 'https://www.ncbi.nlm.nih.gov/books/NBK553863/table/ch5.Tab1/' },
    ],
  },
  'stanford-debakey': {
    erklaerung: { de: 'Stanford und DeBakey klassifizieren Aortendissektionen anatomisch. Für die Akutentscheidung ist vor allem wichtig, ob die Aorta ascendens beteiligt ist.' },
    radiologie: [
      { stage: { de: 'Was ansehen?' }, text: { de: 'Intimaflap, Entry, Ausdehnung, Aorta ascendens, supraaortale Äste, viszerale/renale Gefäße und Malperfusion systematisch prüfen.' } },
      { stage: { de: 'Befund-Tipp' }, text: { de: 'Stanford-Typ immer nennen; zusätzlich Komplikationen wie Perikarderguss, Rupturzeichen oder Organischämie beschreiben.' } },
    ],
    sources: [{ label: { de: 'Daily et al., Ann Thorac Surg 1970' }, url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Daily+Stanford+classification+aortic+dissection+1970' }],
  },
  'ti-rads': {
    erklaerung: { de: 'ACR TI-RADS ist ein punktbasiertes Ultraschallsystem für Schilddrüsenknoten. Aus Morphologiepunkten ergeben sich TR-Kategorie, FNA-Schwelle und Verlaufsempfehlung.' },
    radiologie: [
      { stage: { de: 'Was ansehen?' }, text: { de: 'Zusammensetzung, Echogenität, Form, Rand und echogene Foci einzeln bewerten und Punkte addieren.' } },
      { stage: { de: 'Vorgehen' }, text: { de: 'Knotengröße mit Kategorie kombinieren; FNA und Verlaufsschwelle sind größenabhängig.' } },
    ],
    sources: [
      { label: { de: 'Tessler et al., JACR 2017' }, url: 'https://pubmed.ncbi.nlm.nih.gov/28372962/' },
      { label: { de: 'ACR TI-RADS' }, url: 'https://www.acr.org/Clinical-Resources/Reporting-and-Data-Systems/TI-RADS' },
    ],
  },
  'li-rads': {
    erklaerung: { de: 'LI-RADS standardisiert die CT/MRT-Diagnostik von Leberläsionen bei HCC-Risikopatient:innen. Es verbindet Hauptkriterien, Zusatzkriterien und Managementsprache.' },
    radiologie: [
      { stage: { de: 'Was ansehen?' }, text: { de: 'Nicht-randständige arterielle Hyperenhancement, Washout, Kapsel, Schwellenwachstum und Läsionsgröße prüfen.' } },
      { stage: { de: 'Vorgehen' }, text: { de: 'Nur bei passender Risikopopulation anwenden; Tumor-in-Vein und nicht-HCC-Malignitätszeichen separat kennzeichnen.' } },
    ],
    sources: [{ label: { de: 'ACR LI-RADS' }, url: 'https://www.acr.org/Clinical-Resources/Reporting-and-Data-Systems/LI-RADS' }],
  },
  bosniak: {
    erklaerung: { de: 'Bosniak klassifiziert zystische Nierenläsionen nach Malignitätsrisiko. Entscheidend sind Septen, Wandverdickung, Verkalkungen, KM-Enhancement und solide Anteile.' },
    radiologie: [
      { stage: { de: 'Was ansehen?' }, text: { de: 'Kontrastmittel-Enhancement sauber von hyperdensen Blut-/Proteinanteilen trennen; bei Zweifel Subtraktion/MRT erwägen.' } },
      { stage: { de: 'Befund-Tipp' }, text: { de: 'Kategorie, maximalen Durchmesser und die begründenden Merkmale nennen, z. B. „Bosniak IIF wegen multipler dünner septaler KM-Aufnahme“.' } },
    ],
    sources: [{ label: { de: 'Bosniak v2019, Radiology' }, url: 'https://pubmed.ncbi.nlm.nih.gov/31210616/' }],
  },
  balthazar: {
    erklaerung: { de: 'Balthazar/CTSI bewertet CT-Schweregrad der akuten Pankreatitis anhand entzündlicher Morphologie und Nekroseausmaß. Nützlich ist es für strukturierte Risikokommunikation.' },
    radiologie: [
      { stage: { de: 'Was ansehen?' }, text: { de: 'Pankreasvergrößerung, peripankreatische Entzündung, Flüssigkeitskollektionen und prozentuale Nekrose nach KM beurteilen.' } },
      { stage: { de: 'Vorgehen' }, text: { de: 'Zeitpunkt der CT beachten: Nekrose ist früh oft unterschätzt; Komplikationen wie Thrombosen oder infizierte Nekrose separat nennen.' } },
    ],
    sources: [{ label: { de: 'Balthazar et al., Radiology 1990' }, url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Balthazar+CT+severity+index+acute+pancreatitis+1990' }],
  },
  couinaud: {
    erklaerung: { de: 'Couinaud teilt die Leber nach portaler Versorgung und venöser Drainage in funktionelle Segmente. Radiologisch ist es vor allem für Läsionslokalisation und OP-/Interventionsplanung relevant.' },
    radiologie: [
      { stage: { de: 'Was ansehen?' }, text: { de: 'Portalvenenäste teilen kraniokaudal, Lebervenen trennen rechts/links/anterior/posterior; Segment I separat betrachten.' } },
      { stage: { de: 'Befund-Tipp' }, text: { de: 'Läsionen immer mit Segment, Größe, Gefäß-/Gallengangsbezug und Resektabilitätsaspekten beschreiben.' } },
    ],
    sources: [{ label: { de: 'Couinaud-Leberanatomie, NCBI Bookshelf' }, url: 'https://www.ncbi.nlm.nih.gov/books/?term=Couinaud+liver+segments' }],
  },
  cdd: {
    erklaerung: { de: 'Die CDD-Klassifikation strukturiert die Divertikelkrankheit inklusive unkomplizierter und komplizierter Divertikulitis. In der CT hilft sie, Abszess, Perforation und freie Luft konsistent einzuordnen.' },
    radiologie: [
      { stage: { de: 'Was ansehen?' }, text: { de: 'Wandverdickung, entzündliches Fettgewebe, gedeckte/freie Perforation, Abszessgröße, Fistel und Stenose beurteilen.' } },
      { stage: { de: 'Befund-Tipp' }, text: { de: 'Abszesse mit Größe und Drainagezugang beschreiben; freie Luft/Peritonitis klar von Mikroperforation abgrenzen.' } },
    ],
    sources: [{ label: { de: 'AWMF Divertikelkrankheit/Divertikulitis' }, url: 'https://register.awmf.org/de/leitlinien/detail/021-020' }],
  },
  'aast-ois': {
    erklaerung: { de: 'AAST-OIS beschreibt traumatische Organverletzungen graduiert nach CT-Morphologie und Gefäß-/Hilusbeteiligung. Es unterstützt Kommunikation zwischen Radiologie, Chirurgie und Intervention.' },
    radiologie: [
      { stage: { de: 'Was ansehen?' }, text: { de: 'Lazerationstiefe, Hämatom, Devaskularisation, aktive Blutung, Pseudoaneurysma, AV-Fistel und Hilarverletzung prüfen.' } },
      { stage: { de: 'Befund-Tipp' }, text: { de: 'Organ, Grad, aktive Kontrastmittelextravasation und relevante Begleitverletzungen getrennt nennen.' } },
    ],
  },
  'bi-rads': {
    erklaerung: { de: 'BI-RADS standardisiert Brustbildgebung und Managementempfehlungen. Es ist modalitätsübergreifend für Mammographie, Ultraschall und MRT nutzbar, die Deskriptoren unterscheiden sich aber.' },
    radiologie: [
      { stage: { de: 'Was ansehen?' }, text: { de: 'Befundtyp, Form, Rand, Dichte/Echogenität, Verkalkungsmuster, Verteilung, KM-Dynamik und Vergleich zu Voraufnahmen prüfen.' } },
      { stage: { de: 'Vorgehen' }, text: { de: 'Erst deskriptiv sauber benennen, dann BI-RADS-Kategorie und konkrete Empfehlung formulieren.' } },
    ],
    sources: [{ label: { de: 'ACR BI-RADS' }, url: 'https://www.acr.org/Clinical-Resources/Reporting-and-Data-Systems/Bi-Rads' }],
  },
  'mamma-mrt-dichte': {
    erklaerung: { de: 'Drüsendichte und Background Parenchymal Enhancement beschreiben die Beurteilbarkeit und hormonell geprägte KM-Aufnahme im Mamma-MRT. Sie sind Kontextmerkmale, keine Läsionskategorie.' },
    radiologie: [
      { stage: { de: 'Was ansehen?' }, text: { de: 'Fibroglanduläres Gewebe und BPE getrennt bewerten; BPE symmetrisch/asymmetrisch und fokal/diffus einordnen.' } },
      { stage: { de: 'Befund-Tipp' }, text: { de: 'Starkes BPE kann kleine Läsionen maskieren; Zyklus, Hormontherapie und Voraufnahmen berücksichtigen.' } },
    ],
    sources: [{ label: { de: 'ACR BI-RADS' }, url: 'https://www.acr.org/Clinical-Resources/Reporting-and-Data-Systems/Bi-Rads' }],
  },
  'pi-rads': {
    erklaerung: { de: 'PI-RADS standardisiert die mpMRT der Prostata zur Wahrscheinlichkeit eines klinisch signifikanten Karzinoms. Dominante Sequenz hängt von peripherer Zone oder Transitionalzone ab.' },
    radiologie: [
      { stage: { de: 'Was ansehen?' }, text: { de: 'Periphere Zone: DWI/ADC dominant; Transitionalzone: T2-Morphologie dominant; DCE kann PI-RADS 3 in PZ aufwerten.' } },
      { stage: { de: 'Befund-Tipp' }, text: { de: 'Läsion mit Zone, Sektor, Größe, PI-RADS, Kapselkontakt/EPE-Zeichen und Biopsierelevanz berichten.' } },
    ],
    sources: [{ label: { de: 'ACR PI-RADS' }, url: 'https://www.acr.org/Clinical-Resources/Reporting-and-Data-Systems/PI-RADS' }],
  },
  pfirrmann: {
    erklaerung: { de: 'Pfirrmann graduiert Bandscheibendegeneration in der T2-MRT nach Signal, Struktur und Höhenverlust. Es hilft, degenerative Befunde einheitlich zu beschreiben.' },
    radiologie: [
      { stage: { de: 'Was ansehen?' }, text: { de: 'T2-Signal des Nucleus, Homogenität, Abgrenzbarkeit von Anulus/Nucleus und Bandscheibenhöhe prüfen.' } },
      { stage: { de: 'Befund-Tipp' }, text: { de: 'Grad nicht isoliert interpretieren: Protrusion/Extrusion, Modic-Veränderungen, Stenose und klinische Seite ergänzen.' } },
    ],
    sources: [{ label: { de: 'Pfirrmann et al., Spine 2001' }, url: 'https://pubmed.ncbi.nlm.nih.gov/11725234/' }],
  },
  modic: {
    erklaerung: { de: 'Modic beschreibt reaktive Knochenmarkveränderungen angrenzend an degenerierte Endplatten. Die Typen spiegeln Ödem, Fettumbau oder Sklerose wider.' },
    radiologie: [
      { stage: { de: 'Was ansehen?' }, text: { de: 'T1/T2/STIR-Signal an den Endplatten beurteilen; erosive Infektion von degenerativem Modic-1-Muster abgrenzen.' } },
      { stage: { de: 'Befund-Tipp' }, text: { de: 'Etage, Typ, Aktivitätszeichen und begleitende Diskus-/Endplattenveränderungen nennen.' } },
    ],
    sources: [{ label: { de: 'Modic et al., Radiology 1988' }, url: 'https://pubmed.ncbi.nlm.nih.gov/3336678/' }],
  },
  genant: {
    erklaerung: { de: 'Genant ist eine semiquantitative Methode zur Einteilung osteoporotischer Wirbelkörperfrakturen nach Höhenminderung. Sie hilft, Frakturlast und Verlauf zu standardisieren.' },
    radiologie: [
      { stage: { de: 'Was ansehen?' }, text: { de: 'Vordere, mittlere und hintere Wirbelkörperhöhe vergleichen; Keil-, bikonkave und Kompressionsform beschreiben.' } },
      { stage: { de: 'Befund-Tipp' }, text: { de: 'Akuität nicht allein aus Genant ableiten: Knochenmarködem/STIR, Frakturlinie und Hinterkantenbeteiligung separat beurteilen.' } },
    ],
    sources: [{ label: { de: 'Genant et al., JBMR 1993' }, url: 'https://pubmed.ncbi.nlm.nih.gov/8237484/' }],
  },
  'salter-harris': {
    erklaerung: { de: 'Salter-Harris klassifiziert Frakturen mit Beteiligung der Wachstumsfuge. Radiologisch geht es darum, ob nur die Physe oder zusätzlich Metaphyse, Epiphyse und Gelenkfläche betroffen sind.' },
    radiologie: [
      { stage: { de: 'Was ansehen?' }, text: { de: 'Fugenverbreiterung, metaphysäres Thurston-Holland-Fragment, epiphysäre Gelenkbeteiligung, Dislokation und Achsfehler prüfen.' } },
      { stage: { de: 'Befund-Tipp' }, text: { de: 'Bei Kindern mit lokaler Druckdolenz kann Typ I röntgenokkult sein; Vergleichsaufnahme, Verlauf oder MRT je nach Situation erwägen.' } },
    ],
    sources: [{ label: { de: 'Salter & Harris, JBJS 1963' }, url: 'https://pubmed.ncbi.nlm.nih.gov/14056420/' }],
  },
  'kellgren-lawrence': {
    erklaerung: { de: 'Kellgren-Lawrence graduiert radiologische Arthrosezeichen. Es ist eine Röntgenskala, die Osteophyten, Gelenkspaltverschmälerung, Sklerose und Deformierung kombiniert.' },
    radiologie: [
      { stage: { de: 'Was ansehen?' }, text: { de: 'Belastungsaufnahme bevorzugen; Osteophyten, Gelenkspalt, subchondrale Sklerose und Achs-/Formveränderung beurteilen.' } },
      { stage: { de: 'Befund-Tipp' }, text: { de: 'Grad mit Kompartiment/Lokalisation nennen, z. B. medial betonte Gonarthrose KL 3.' } },
    ],
    sources: [{ label: { de: 'Kellgren & Lawrence, Ann Rheum Dis 1957' }, url: 'https://pubmed.ncbi.nlm.nih.gov/13498604/' }],
  },
  garden: {
    erklaerung: { de: 'Garden klassifiziert mediale Schenkelhalsfrakturen nach Dislokation. Die Einteilung ist therapeutisch relevant, weil Dislokation mit Durchblutungsrisiko des Hüftkopfs korreliert.' },
    radiologie: [
      { stage: { de: 'Was ansehen?' }, text: { de: 'AP-Becken und axiale Aufnahme: Vollständigkeit, Valgusimpaktion, Trabekelkontinuität und Dislokation beurteilen.' } },
      { stage: { de: 'Befund-Tipp' }, text: { de: 'Zusätzlich Pauwels-Winkel, Hinterwand-/Trochanterbeteiligung und CT-Bedarf bei okkulter Fraktur erwähnen.' } },
    ],
    sources: [{ label: { de: 'Garden, JBJS 1961' }, url: 'https://pubmed.ncbi.nlm.nih.gov/13748280/' }],
  },
  recist: {
    erklaerung: { de: 'RECIST 1.1 standardisiert das Therapieansprechen solider Tumoren anhand der Summe langer Durchmesser von Zielläsionen. Es ist für Studien/Verlauf gedacht, nicht für jede klinische Einzelsituation ausreichend.' },
    radiologie: [
      { stage: { de: 'Was ansehen?' }, text: { de: 'Zielläsionen messbar auswählen, kurze Achse pathologischer Lymphknoten beachten und Nicht-Zielläsionen separat verfolgen.' } },
      { stage: { de: 'Vorgehen' }, text: { de: 'Baseline-Summe, Nadir, prozentuale Änderung, neue Läsionen und eindeutige Progression getrennt dokumentieren.' } },
    ],
    sources: [{ label: { de: 'Eisenhauer et al., EJC 2009' }, url: 'https://pubmed.ncbi.nlm.nih.gov/19097774/' }],
  },
  tnm: {
    erklaerung: { de: 'TNM beschreibt anatomische Tumorausdehnung: Primärtumor, regionäre Lymphknoten und Fernmetastasen. Radiologisch ist es Grundlage für Staging, Therapieplanung und Tumorboard.' },
    radiologie: [
      { stage: { de: 'Was ansehen?' }, text: { de: 'Tumorgröße/Organüberschreitung, Gefäß-/Nachbarorganinvasion, regionäre Lymphknotenstationen und Fernmetastasen systematisch prüfen.' } },
      { stage: { de: 'Befund-Tipp' }, text: { de: 'TNM ist tumorspezifisch: immer die jeweilige Entität/Auflage verwenden und unsichere Befunde als cT/cN/cM kontextualisieren.' } },
    ],
    sources: [{ label: { de: 'UICC TNM' }, url: 'https://www.uicc.org/resources/tnm' }],
  },
  deauville: {
    erklaerung: { de: 'Deauville ist eine 5-Punkte-PET-Skala für FDG-avid Lymphome. Sie vergleicht Läsionsuptake mit Mediastinum und Leber und steuert die metabolische Response-Beurteilung.' },
    radiologie: [
      { stage: { de: 'Was ansehen?' }, text: { de: 'Uptake der Läsion relativ zu Mediastinum und Leber beurteilen; neue FDG-avide Herde separat bewerten.' } },
      { stage: { de: 'Befund-Tipp' }, text: { de: 'Interim- und Abschluss-PET unterscheiden; Entzündung, Therapieeffekte und physiologische Uptakes nicht als Progress fehlwerten.' } },
    ],
    sources: [{ label: { de: 'Meignan et al., Leuk Lymphoma 2009' }, url: 'https://pubmed.ncbi.nlm.nih.gov/19622555/' }],
  },
  lugano: {
    erklaerung: { de: 'Lugano standardisiert Staging und Response bei Lymphomen. Für FDG-avide Lymphome ist PET/CT zentral; bei anderen Subtypen bleibt CT-Morphologie wichtig.' },
    radiologie: [
      { stage: { de: 'Was ansehen?' }, text: { de: 'Nodale Stationen beidseits des Zwerchfells, Milz, extranodale Organe, Bulky Disease und Knochenmarkbeteiligung beurteilen.' } },
      { stage: { de: 'Vorgehen' }, text: { de: 'Bei Response FDG-Avidität und Deauville-Score mit morphologischer Restmasse und neuen Läsionen kombinieren.' } },
    ],
  },
}

const CLASSIFICATION_FA_ENHANCEMENTS = {
  fazekas: {
    erklaerung: { fa: 'مقیاس فازکاس شدت ضایعات مزمن ماده سفید را در MRI توصیف می‌کند. برای گزارش استاندارد میکروآنژیوپاتی و مقایسه در پیگیری مفید است.' },
    radiologie: [
      { stage: { fa: 'چه چیزی را ببینیم؟' }, text: { fa: 'در T2/FLAIR، هایپراینتنسیتی‌های نقطه‌ای، همگرا یا وسیعِ پری‌ونتریکولار و ماده سفید عمقی را جداگانه ارزیابی کنید.' } },
      { stage: { fa: 'نکته گزارش' }, text: { fa: 'سن، عوامل خطر عروقی، لاکون‌ها/میکروبلیدها و افتراق‌هایی مثل MS یا الگوی واسکولیتی را در نظر بگیرید.' } },
    ],
  },
  aspects: {
    erklaerung: { fa: 'ASPECTS تغییرات ایسکمیک زودرس در قلمرو MCA را در CT بدون کنتراست یا DWI عددی می‌کند. شروع از ۱۰ امتیاز است و برای هر ناحیه درگیر ۱ امتیاز کم می‌شود.' },
    radiologie: [
      { stage: { fa: 'چه چیزی را ببینیم؟' }, text: { fa: 'کادات، لنتیفرم، اینسولا، کپسول داخلی و نواحی M1 تا M6 را سیستماتیک بررسی کنید؛ هیپودنسیتی، تورم و از بین رفتن تمایز خاکستری-سفید مهم‌اند.' } },
      { stage: { fa: 'روش گزارش' }, text: { fa: 'همیشه سمت، روش تصویربرداری و امتیاز نهایی را بنویسید؛ مثال: «ASPECTS راست ۷/۱۰ در CT بدون کنتراست».' } },
    ],
  },
  'pc-aspects': {
    erklaerung: { fa: 'pc-ASPECTS همان منطق ASPECTS را برای گردش خون خلفی به کار می‌برد و تغییرات ایسکمیک زودرس در ساقه مغز، تالاموس، لوب اکسیپیتال و مخچه را استاندارد گزارش می‌کند.' },
    radiologie: [
      { stage: { fa: 'چه چیزی را ببینیم؟' }, text: { fa: 'مغز میانی و پونز وزن بیشتری دارند؛ تالاموس‌ها، لوب‌های اکسیپیتال و نیمکره‌های مخچه هر سمت جداگانه امتیازدهی می‌شوند.' } },
      { stage: { fa: 'روش گزارش' }, text: { fa: 'DWI از CT حساس‌تر است؛ در انسداد بازیلار، امتیاز و ساختارهای اصلی درگیر را واضح ذکر کنید.' } },
    ],
  },
  mcdonald: {
    erklaerung: { fa: 'معیارهای مک‌دونالد برای تشخیص MS بر اساس اثبات انتشار ضایعات در فضا و زمان به کار می‌روند. نقش رادیولوژی تشخیص محل‌های معمول، ضایعات جدید و ضایعات فعال با کنتراست است.' },
    radiologie: [
      { stage: { fa: 'چه چیزی را ببینیم؟' }, text: { fa: 'ناحیه پری‌ونتریکولار، کورتیکال/جوکستاکورتیکال، اینفراتنتوریال و نخاع را بررسی کنید؛ Dawson fingers و ضایعات فعال با کنتراست را ذکر کنید.' } },
      { stage: { fa: 'روش گزارش' }, text: { fa: 'MRI به‌تنهایی تشخیص MS نیست؛ حمله بالینی، CSF و تشخیص‌های افتراقی باید در نظر گرفته شوند.' } },
    ],
  },
  fisher: {
    erklaerung: { fa: 'مقیاس فیشر مقدار و توزیع خون در خونریزی ساب‌آراکنوئید آنوریسمال را در CT توصیف می‌کند و برای بیان تقریبی خطر وازواسپاسم به کار می‌رود.' },
    radiologie: [
      { stage: { fa: 'چه چیزی را ببینیم؟' }, text: { fa: 'ضخامت خون ساب‌آراکنوئید، خون داخل بطنی و هماتوم داخل مغزی را در CT اولیه ارزیابی کنید.' } },
      { stage: { fa: 'نکته گزارش' }, text: { fa: 'هیدروسفالی، شک به آنوریسم و توزیع خون برای حدس محل منبع خونریزی را جداگانه ذکر کنید.' } },
    ],
  },
  'mta-score': {
    erklaerung: { fa: 'MTA آتروفی لوب تمپورال داخلی، به‌خصوص هیپوکامپ، را به‌صورت بصری امتیازدهی می‌کند. در بررسی دمانس کمک‌کننده است اما جایگزین تشخیص بالینی نمی‌شود.' },
    radiologie: [
      { stage: { fa: 'چه چیزی را ببینیم؟' }, text: { fa: 'در برش کرونال T1/T2، شیار کورویید، عرض شاخ تمپورال و ارتفاع هیپوکامپ را در دو طرف ارزیابی کنید.' } },
      { stage: { fa: 'نکته گزارش' }, text: { fa: 'اختلاف دو طرف، سن بیمار و الگوهای دیگر آتروفی مثل فرونتوتمپورال یا پس‌سری-کورتیکال را هم بنویسید.' } },
    ],
  },
  'lung-rads': {
    erklaerung: { fa: 'Lung-RADS یافته‌های CT در غربالگری سرطان ریه را استاندارد می‌کند. این سیستم برای برنامه‌های غربالگری است و با مدیریت ندول‌های اتفاقی بر اساس Fleischner یکی نیست.' },
    radiologie: [
      { stage: { fa: 'چه چیزی را ببینیم؟' }, text: { fa: 'نوع ندول، اندازه میانگین، رشد، ندول جدید و جزء جامد در ندول‌های ساب‌سالید را ثبت کنید.' } },
      { stage: { fa: 'روش گزارش' }, text: { fa: 'دسته و توصیه مدیریتی را ذکر کنید؛ modifierهایی مثل S یا C فقط در صورت وجود یافته مناسب استفاده شوند.' } },
    ],
  },
  'co-rads': {
    erklaerung: { fa: 'CO-RADS احتمال پنومونی COVID-19 را در CT بیان می‌کند. این یک سیستم احتمال تشخیصی است، نه درجه‌بندی شدت بالینی بیماری.' },
    radiologie: [
      { stage: { fa: 'چه چیزی را ببینیم؟' }, text: { fa: 'کدورت‌های ground-glass محیطی دوطرفه، crazy paving، consolidation، توزیع ضایعات و تشخیص‌های جایگزین را بررسی کنید.' } },
      { stage: { fa: 'نکته گزارش' }, text: { fa: 'دسته CO-RADS باید با زمینه بالینی و PCR/آزمایش‌ها تفسیر شود؛ الگوهای عفونی دیگر یا ادم را هم ذکر کنید.' } },
    ],
  },
  fleischner: {
    radiologie: [
      { stage: { fa: 'چه چیزی را ببینیم؟' }, text: { fa: 'نوع ندول، اندازه میانگین، منفرد/متعدد بودن، رشد، جزء جامد و مورفولوژی مشکوک مثل spiculation را ارزیابی کنید.' } },
      { stage: { fa: 'کاربرد را چک کنید' }, text: { fa: 'فقط برای ندول‌های اتفاقی در بزرگسالان بدون بدخیمی فعال شناخته‌شده یا سرکوب ایمنی؛ غربالگری بیشتر با Lung-RADS گزارش می‌شود.' } },
    ],
  },
  'stanford-debakey': {
    erklaerung: { fa: 'Stanford و DeBakey دیسکسیون آئورت را بر اساس آناتومی طبقه‌بندی می‌کنند. برای تصمیم حاد، مهم‌ترین نکته درگیری یا عدم درگیری آئورت صعودی است.' },
    radiologie: [
      { stage: { fa: 'چه چیزی را ببینیم؟' }, text: { fa: 'intimal flap، محل entry، وسعت، آئورت صعودی، شاخه‌های سوپرا آئورتیک، عروق احشایی/کلیوی و malperfusion را سیستماتیک بررسی کنید.' } },
      { stage: { fa: 'نکته گزارش' }, text: { fa: 'نوع Stanford را همیشه ذکر کنید؛ عوارضی مثل افیوژن پریکارد، علائم پارگی یا ایسکمی ارگان را جداگانه بنویسید.' } },
    ],
  },
  'ti-rads': {
    erklaerung: { fa: 'ACR TI-RADS یک سیستم امتیازدهی سونوگرافی برای ندول تیروئید است. از امتیازهای مورفولوژی، دسته TR، آستانه FNA و توصیه پیگیری به دست می‌آید.' },
    radiologie: [
      { stage: { fa: 'چه چیزی را ببینیم؟' }, text: { fa: 'ترکیب، اکوژنیسیته، شکل، حاشیه و کانون‌های اکوژن را جداگانه ارزیابی و امتیازها را جمع کنید.' } },
      { stage: { fa: 'روش گزارش' }, text: { fa: 'اندازه ندول را با دسته TR ترکیب کنید؛ آستانه FNA و پیگیری وابسته به اندازه است.' } },
    ],
  },
  'li-rads': {
    erklaerung: { fa: 'LI-RADS تشخیص ضایعات کبدی در CT/MRI بیماران پرخطر برای HCC را استاندارد می‌کند و معیارهای اصلی، فرعی و زبان مدیریتی را یکپارچه می‌کند.' },
    radiologie: [
      { stage: { fa: 'چه چیزی را ببینیم؟' }, text: { fa: 'enhancement شریانی غیرحاشیه‌ای، washout، کپسول، رشد آستانه‌ای و اندازه ضایعه را بررسی کنید.' } },
      { stage: { fa: 'روش گزارش' }, text: { fa: 'فقط در جمعیت پرخطر مناسب استفاده شود؛ tumor-in-vein و نشانه‌های بدخیمی غیر HCC جداگانه مشخص شوند.' } },
    ],
  },
  bosniak: {
    erklaerung: { fa: 'Bosniak ضایعات کیستیک کلیه را بر اساس خطر بدخیمی طبقه‌بندی می‌کند. سپتا، ضخامت دیواره، کلسیفیکاسیون، enhancement و جزء جامد تعیین‌کننده‌اند.' },
    radiologie: [
      { stage: { fa: 'چه چیزی را ببینیم؟' }, text: { fa: 'enhancement واقعی را از محتوای خون/پروتئین هایپردنس جدا کنید؛ در موارد مبهم MRI یا subtraction کمک‌کننده است.' } },
      { stage: { fa: 'نکته گزارش' }, text: { fa: 'دسته، اندازه بیشینه و علت دسته‌بندی را ذکر کنید؛ مثال: «Bosniak IIF به علت چند سپتای نازک با enhancement».' } },
    ],
  },
  balthazar: {
    erklaerung: { fa: 'Balthazar/CTSI شدت CT پانکراتیت حاد را بر اساس مورفولوژی التهاب و میزان نکروز ارزیابی می‌کند و برای گزارش ساختارمند خطر مفید است.' },
    radiologie: [
      { stage: { fa: 'چه چیزی را ببینیم؟' }, text: { fa: 'بزرگی پانکراس، التهاب پری‌پانکراتیک، کالکشن‌های مایع و درصد نکروز پس از کنتراست را ارزیابی کنید.' } },
      { stage: { fa: 'روش گزارش' }, text: { fa: 'زمان CT مهم است؛ نکروز در مراحل خیلی زود ممکن است کمتر برآورد شود. ترومبوز یا نکروز عفونی را جداگانه ذکر کنید.' } },
    ],
  },
  couinaud: {
    erklaerung: { fa: 'Couinaud کبد را بر اساس خون‌رسانی پورتال و درناژ وریدی به سگمان‌های عملکردی تقسیم می‌کند. برای محل‌یابی ضایعه و برنامه‌ریزی جراحی/مداخله‌ای مهم است.' },
    radiologie: [
      { stage: { fa: 'چه چیزی را ببینیم؟' }, text: { fa: 'شاخه‌های پورتال تقسیم کرانیوکودال را نشان می‌دهند؛ وریدهای کبدی مرزهای راست/چپ و قدامی/خلفی را جدا می‌کنند؛ سگمان I جداگانه است.' } },
      { stage: { fa: 'نکته گزارش' }, text: { fa: 'ضایعه را با سگمان، اندازه، ارتباط با عروق/مجاری صفراوی و نکات مربوط به رزکتابیلیتی توصیف کنید.' } },
    ],
  },
  cdd: {
    erklaerung: { fa: 'CDD بیماری دیورتیکولی و دیورتیکولیت بدون عارضه یا عارضه‌دار را ساختارمند می‌کند. در CT برای طبقه‌بندی آبسه، پرفوراسیون و هوای آزاد مفید است.' },
    radiologie: [
      { stage: { fa: 'چه چیزی را ببینیم؟' }, text: { fa: 'ضخیم‌شدن دیواره، التهاب چربی اطراف، پرفوراسیون محدود یا آزاد، اندازه آبسه، فیستول و تنگی را ارزیابی کنید.' } },
      { stage: { fa: 'نکته گزارش' }, text: { fa: 'آبسه‌ها را با اندازه و مسیر احتمالی درناژ توصیف کنید؛ هوای آزاد/پریتونیت را از میکروپرفوراسیون جدا کنید.' } },
    ],
  },
  'aast-ois': {
    erklaerung: { fa: 'AAST-OIS آسیب‌های تروماتیک ارگان را بر اساس مورفولوژی CT و درگیری عروقی/ناف ارگان درجه‌بندی می‌کند و زبان مشترک بین رادیولوژی، جراحی و مداخله می‌سازد.' },
    radiologie: [
      { stage: { fa: 'چه چیزی را ببینیم؟' }, text: { fa: 'عمق پارگی، هماتوم، devascularization، خونریزی فعال، pseudoaneurysm، AV fistula و آسیب ناف ارگان را بررسی کنید.' } },
      { stage: { fa: 'نکته گزارش' }, text: { fa: 'ارگان، درجه، extravasation فعال کنتراست و آسیب‌های همراه مهم را جداگانه ذکر کنید.' } },
    ],
  },
  'bi-rads': {
    erklaerung: { fa: 'BI-RADS گزارش تصویربرداری پستان و توصیه مدیریتی را استاندارد می‌کند. برای ماموگرافی، سونوگرافی و MRI کاربرد دارد، ولی descriptorها در هر روش متفاوت‌اند.' },
    radiologie: [
      { stage: { fa: 'چه چیزی را ببینیم؟' }, text: { fa: 'نوع یافته، شکل، حاشیه، دانسیته/اکوژنیسیته، الگوی کلسیفیکاسیون، توزیع، دینامیک کنتراست و مقایسه با تصاویر قبلی را بررسی کنید.' } },
      { stage: { fa: 'روش گزارش' }, text: { fa: 'ابتدا descriptorها را دقیق بنویسید، سپس دسته BI-RADS و توصیه مشخص را ذکر کنید.' } },
    ],
  },
  'mamma-mrt-dichte': {
    erklaerung: { fa: 'دانسیته بافت غده‌ای و Background Parenchymal Enhancement میزان قابلیت ارزیابی و enhancement هورمونی در MRI پستان را توصیف می‌کنند؛ این‌ها دسته ضایعه نیستند.' },
    radiologie: [
      { stage: { fa: 'چه چیزی را ببینیم؟' }, text: { fa: 'مقدار fibroglandular tissue و BPE را جداگانه ارزیابی کنید؛ BPE را از نظر تقارن و الگوی focal/diffuse توصیف کنید.' } },
      { stage: { fa: 'نکته گزارش' }, text: { fa: 'BPE شدید می‌تواند ضایعات کوچک را پنهان کند؛ سیکل قاعدگی، هورمون‌درمانی و تصاویر قبلی را در نظر بگیرید.' } },
    ],
  },
  'pi-rads': {
    erklaerung: { fa: 'PI-RADS mpMRI پروستات را برای احتمال سرطان clinically significant استاندارد می‌کند. توالی غالب بسته به زون محیطی یا transition zone متفاوت است.' },
    radiologie: [
      { stage: { fa: 'چه چیزی را ببینیم؟' }, text: { fa: 'در زون محیطی DWI/ADC غالب است؛ در transition zone مورفولوژی T2 غالب است؛ DCE می‌تواند PI-RADS 3 در PZ را ارتقا دهد.' } },
      { stage: { fa: 'نکته گزارش' }, text: { fa: 'ضایعه را با زون، سکتور، اندازه، PI-RADS، تماس با کپسول/نشانه‌های EPE و اهمیت برای بیوپسی گزارش کنید.' } },
    ],
  },
  pfirrmann: {
    erklaerung: { fa: 'Pfirrmann دژنراسیون دیسک را در MRI T2 بر اساس سیگنال، ساختار و کاهش ارتفاع درجه‌بندی می‌کند و برای توصیف یکنواخت تغییرات دژنراتیو مفید است.' },
    radiologie: [
      { stage: { fa: 'چه چیزی را ببینیم؟' }, text: { fa: 'سیگنال T2 نوکلئوس، همگنی، تفکیک آنولوس/نوکلئوس و ارتفاع دیسک را بررسی کنید.' } },
      { stage: { fa: 'نکته گزارش' }, text: { fa: 'درجه را تنها تفسیر نکنید؛ protrusion/extrusion، تغییرات Modic، تنگی کانال و سمت علائم را اضافه کنید.' } },
    ],
  },
  modic: {
    erklaerung: { fa: 'Modic تغییرات واکنشی مغز استخوان در مجاورت endplateهای دژنراتیو را توصیف می‌کند. انواع آن بازتاب ادم، تبدیل چربی یا اسکلروز هستند.' },
    radiologie: [
      { stage: { fa: 'چه چیزی را ببینیم؟' }, text: { fa: 'سیگنال T1/T2/STIR در endplateها را بررسی کنید؛ Modic 1 دژنراتیو را از عفونت erosive جدا کنید.' } },
      { stage: { fa: 'نکته گزارش' }, text: { fa: 'سطح، نوع، نشانه‌های فعالیت و تغییرات همراه دیسک/endplate را ذکر کنید.' } },
    ],
  },
  genant: {
    erklaerung: { fa: 'Genant یک روش نیمه‌کمی برای درجه‌بندی شکستگی‌های استئوپروتیک مهره بر اساس کاهش ارتفاع است و برای استانداردسازی بار شکستگی و پیگیری کمک می‌کند.' },
    radiologie: [
      { stage: { fa: 'چه چیزی را ببینیم؟' }, text: { fa: 'ارتفاع قدامی، میانی و خلفی جسم مهره را مقایسه کنید و شکل wedge، biconcave یا compression را بنویسید.' } },
      { stage: { fa: 'نکته گزارش' }, text: { fa: 'حاد بودن را فقط از Genant نتیجه نگیرید؛ ادم مغز استخوان/STIR، خط شکستگی و درگیری دیواره خلفی را جداگانه ارزیابی کنید.' } },
    ],
  },
  'salter-harris': {
    erklaerung: { fa: 'Salter-Harris شکستگی‌های درگیرکننده صفحه رشد را طبقه‌بندی می‌کند. در گزارش باید مشخص شود فقط فیز درگیر است یا متافیز، اپی‌فیز و سطح مفصلی هم درگیرند.' },
    radiologie: [
      { stage: { fa: 'چه چیزی را ببینیم؟' }, text: { fa: 'گشادشدن فیز، قطعه متافیزی Thurston-Holland، درگیری سطح مفصلی اپی‌فیز، جابه‌جایی و خطای محور را بررسی کنید.' } },
      { stage: { fa: 'نکته گزارش' }, text: { fa: 'در کودکان با درد موضعی، نوع I ممکن است در رادیوگرافی دیده نشود؛ بسته به شرایط مقایسه دو طرف، پیگیری یا MRI را در نظر بگیرید.' } },
    ],
  },
  'kellgren-lawrence': {
    erklaerung: { fa: 'Kellgren-Lawrence علائم رادیوگرافیک آرتروز را درجه‌بندی می‌کند و استئوفیت، کاهش فضای مفصلی، اسکلروز و تغییر شکل را با هم در نظر می‌گیرد.' },
    radiologie: [
      { stage: { fa: 'چه چیزی را ببینیم؟' }, text: { fa: 'تصویر weight-bearing ترجیح دارد؛ استئوفیت، فضای مفصلی، اسکلروز ساب‌کندرال و تغییر محور/شکل را ارزیابی کنید.' } },
      { stage: { fa: 'نکته گزارش' }, text: { fa: 'درجه را همراه compartment/محل ذکر کنید؛ مثال: گونارتروز غالب مدیال KL 3.' } },
    ],
  },
  garden: {
    erklaerung: { fa: 'Garden شکستگی‌های گردن فمور داخل‌کپسولی را بر اساس میزان جابه‌جایی طبقه‌بندی می‌کند و از نظر درمانی مهم است، چون جابه‌جایی با خطر اختلال خون‌رسانی سر فمور مرتبط است.' },
    radiologie: [
      { stage: { fa: 'چه چیزی را ببینیم؟' }, text: { fa: 'در AP لگن و نمای axial، کامل بودن شکستگی، valgus impaction، پیوستگی ترابکول‌ها و جابه‌جایی را بررسی کنید.' } },
      { stage: { fa: 'نکته گزارش' }, text: { fa: 'زاویه Pauwels، درگیری دیواره خلفی/تروکانتر و نیاز به CT در شکستگی مخفی را هم ذکر کنید.' } },
    ],
  },
  recist: {
    erklaerung: { fa: 'RECIST 1.1 پاسخ درمانی تومورهای جامد را بر اساس مجموع قطرهای بلند ضایعات هدف استاندارد می‌کند. برای مطالعات و پیگیری طراحی شده و همیشه برای همه تصمیم‌های بالینی کافی نیست.' },
    radiologie: [
      { stage: { fa: 'چه چیزی را ببینیم؟' }, text: { fa: 'ضایعات هدف قابل اندازه‌گیری را انتخاب کنید، محور کوتاه غدد لنفاوی غیرطبیعی را در نظر بگیرید و ضایعات غیرهدف را جداگانه دنبال کنید.' } },
      { stage: { fa: 'روش گزارش' }, text: { fa: 'مجموع baseline، nadir، درصد تغییر، ضایعات جدید و progression واضح را جداگانه ثبت کنید.' } },
    ],
  },
  tnm: {
    erklaerung: { fa: 'TNM گسترش آناتومیک تومور را با T برای تومور اولیه، N برای غدد لنفاوی ناحیه‌ای و M برای متاستاز دور توصیف می‌کند و پایه staging، برنامه درمان و tumor board است.' },
    radiologie: [
      { stage: { fa: 'چه چیزی را ببینیم؟' }, text: { fa: 'اندازه تومور/عبور از ارگان، تهاجم به عروق یا ارگان‌های مجاور، ایستگاه‌های لنفاوی ناحیه‌ای و متاستاز دور را سیستماتیک بررسی کنید.' } },
      { stage: { fa: 'نکته گزارش' }, text: { fa: 'TNM وابسته به نوع تومور است؛ همیشه نسخه و entity مناسب را به کار ببرید و یافته‌های نامطمئن را به‌صورت cT/cN/cM در زمینه بالینی بنویسید.' } },
    ],
  },
  deauville: {
    erklaerung: { fa: 'Deauville یک مقیاس ۵ امتیازی PET برای لنفوم‌های FDG-avid است. uptake ضایعه را با مدیاستن و کبد مقایسه می‌کند و ارزیابی پاسخ متابولیک را هدایت می‌کند.' },
    radiologie: [
      { stage: { fa: 'چه چیزی را ببینیم؟' }, text: { fa: 'uptake ضایعه را نسبت به مدیاستن و کبد ارزیابی کنید و کانون‌های جدید FDG-avid را جداگانه بسنجید.' } },
      { stage: { fa: 'نکته گزارش' }, text: { fa: 'PET میانی درمان و پایان درمان را جدا کنید؛ التهاب، اثرات درمان و uptake فیزیولوژیک را اشتباهاً progression گزارش نکنید.' } },
    ],
  },
  lugano: {
    erklaerung: { fa: 'Lugano مرحله‌بندی و ارزیابی پاسخ درمانی لنفوم را استاندارد می‌کند. برای لنفوم‌های FDG-avid، PET/CT مرکزی است؛ در سایر زیرگروه‌ها مورفولوژی CT همچنان مهم می‌ماند.' },
    radiologie: [
      { stage: { fa: 'چه چیزی را ببینیم؟' }, text: { fa: 'ایستگاه‌های لنفاوی در دو سوی دیافراگم، طحال، ارگان‌های خارج‌گرهی، bulky disease و درگیری مغز استخوان را بررسی کنید.' } },
      { stage: { fa: 'روش گزارش' }, text: { fa: 'در ارزیابی پاسخ، FDG-avidity و Deauville score را با توده باقیمانده مورفولوژیک و ضایعات جدید ترکیب کنید.' } },
    ],
  },
}

function mergeClassificationEnhancement(base = {}, localized = {}) {
  return {
    ...base,
    ...localized,
    erklaerung: { ...(base.erklaerung || {}), ...(localized.erklaerung || {}) },
    radiologie: (base.radiologie || localized.radiologie)
      ? (base.radiologie || []).map((entry, index) => {
          const localEntry = localized.radiologie?.[index] || {}
          return {
            ...entry,
            ...localEntry,
            stage: { ...(entry.stage || {}), ...(localEntry.stage || {}) },
            text: { ...(entry.text || {}), ...(localEntry.text || {}) },
          }
        })
      : undefined,
    sources: base.sources,
  }
}

const KLASSIFIKATIONEN_ERWEITERT = KLASSIFIKATIONEN.map(topic => ({
  ...topic,
  items: topic.items.map(item => ({
    ...item,
    ...mergeClassificationEnhancement(
      CLASSIFICATION_ENHANCEMENTS[item.id] || {},
      CLASSIFICATION_FA_ENHANCEMENTS[item.id] || {},
    ),
  })),
}))

// ── Rechner ──────────────────────────────────────────────────
export const RECHNER = [

  // Neuro: Evans-Index
  {
    id: 'evans-index', type: 'single', color: '#7c3aed',
    name: { de: 'Evans-Index', en: 'Evans Index', fa: 'شاخص ایوانز' },
    formula: 'max. Vorderhornbreite ÷ max. innerer Schädeldurchmesser',
    hint: {
      de: 'Auf derselben axialen Ebene messen. ≥ 0,30 spricht für Ventrikulomegalie, ist aber allein nicht spezifisch für NPH.',
      en: 'Measure on the same axial plane. ≥0.30 supports ventriculomegaly but is not specific for NPH by itself.',
      fa: 'در همان برش محوری اندازه‌گیری شود. ≥۰٫۳۰ به نفع ونتریکولومگالی است اما به‌تنهایی برای NPH اختصاصی نیست.',
    },
    fields: [
      { id: 'horn', label: { de: 'Max. Vorderhornbreite', en: 'Max. frontal horn width', fa: 'حداکثر عرض شاخ‌های فرونتال' }, unit: 'mm', step: 0.1, min: 0.1, max: 120 },
      { id: 'skull', label: { de: 'Max. innerer Schädeldurchmesser', en: 'Max. inner skull diameter', fa: 'حداکثر قطر داخلی جمجمه' }, unit: 'mm', step: 0.1, min: 1, max: 250 },
    ],
    calc: (v) => v.horn && v.skull ? v.horn / v.skull : null,
    resultUnit: '', decimals: 2,
    ranges: [
      { max: 0.29, label: { de: '< 0,30 – kein Evans-Kriterium', en: '<0.30 – Evans criterion not met', fa: '<۰٫۳۰ – معیار ایوانز ندارد' }, color: '#16a34a' },
      { max: Infinity, label: { de: '≥ 0,30 – Ventrikulomegalie', en: '≥0.30 – ventriculomegaly', fa: '≥۰٫۳۰ – ونتریکولومگالی' }, color: '#dc2626' },
    ],
  },

  // Abdomen: Milzindex + geschätztes Milzvolumen
  {
    id: 'milz-index', type: 'multi', color: '#f59e0b',
    name: { de: 'Milzindex + Milzvolumen', en: 'Spleen Index + Volume', fa: 'شاخص و حجم طحال' },
    formula: 'Index = L × B  ·  Volumen = L × B × T × 0.523',
    hint: {
      de: 'Milzindex wie im früheren Rechner: Länge × Breite; zusätzlich ellipsoide Volumenschätzung. Körpergröße und klinischer Kontext mitbeurteilen.',
      en: 'Spleen index as in the previous calculator: length × width; additionally an ellipsoid volume estimate. Consider body size and clinical context.',
      fa: 'شاخص طحال مانند محاسبه‌گر قبلی: طول × عرض؛ به‌علاوه برآورد حجم بیضوی. قد و زمینه بالینی نیز در نظر گرفته شود.',
    },
    fields: [
      { id: 'l', label: { de: 'Länge', en: 'Length', fa: 'طول' }, unit: 'cm', step: 0.1, min: 0.1, max: 30 },
      { id: 'b', label: { de: 'Breite', en: 'Width', fa: 'عرض' }, unit: 'cm', step: 0.1, min: 0.1, max: 20 },
      { id: 't', label: { de: 'Tiefe / Dicke', en: 'Depth / thickness', fa: 'عمق / ضخامت' }, unit: 'cm', step: 0.1, min: 0.1, max: 20 },
    ],
    outputs: [
      {
        label: { de: 'Milzindex', en: 'Spleen index', fa: 'شاخص طحال' }, unit: 'cm²', decimals: 1,
        calc: (v) => v.l && v.b ? v.l * v.b : null,
        ranges: [
          { max: 28, label: { de: '≤ 28 cm² – im Normbereich', en: '≤28 cm² – within normal range', fa: '≤۲۸ cm² – در محدوده طبیعی' }, color: '#16a34a' },
          { max: Infinity, label: { de: '> 28 cm² – vergrößert', en: '>28 cm² – enlarged', fa: '>۲۸ cm² – بزرگ‌شده' }, color: '#dc2626' },
        ],
      },
      {
        label: { de: 'Geschätztes Volumen', en: 'Estimated volume', fa: 'حجم تخمینی' }, unit: 'ml', decimals: 1,
        calc: (v) => v.l && v.b && v.t ? v.l * v.b * v.t * 0.523 : null,
        ranges: [
          { max: 220, label: { de: '< 220 ml – im Normbereich', en: '<220 ml – within normal range', fa: '<۲۲۰ ml – در محدوده طبیعی' }, color: '#16a34a' },
          { max: 400, label: { de: '220–400 ml – Splenomegalie', en: '220–400 ml – splenomegaly', fa: '۲۲۰–۴۰۰ ml – اسپلنومگالی' }, color: '#ca8a04' },
          { max: Infinity, label: { de: '> 400 ml – deutliche Splenomegalie', en: '>400 ml – marked splenomegaly', fa: '>۴۰۰ ml – اسپلنومگالی واضح' }, color: '#dc2626' },
        ],
      },
    ],
  },

  // Abdomen: einseitiges Nierenvolumen
  {
    id: 'niere-volumen', type: 'single', color: '#e11d48',
    name: { de: 'Nierenvolumen', en: 'Kidney Volume', fa: 'حجم کلیه' },
    formula: 'L × B × T × 0.523',
    hint: {
      de: 'Ellipsoide Schätzung einer Niere; Seitenvergleich, Körpergröße und Parenchymdicke bleiben entscheidend.',
      en: 'Ellipsoid estimate for one kidney; side-to-side comparison, body size and parenchymal thickness remain important.',
      fa: 'برآورد بیضوی یک کلیه؛ مقایسه دو طرف، اندازه بدن و ضخامت پارانشیم همچنان مهم‌اند.',
    },
    fields: [
      { id: 'l', label: { de: 'Länge', en: 'Length', fa: 'طول' }, unit: 'cm', step: 0.1, min: 0.1, max: 20 },
      { id: 'b', label: { de: 'Breite', en: 'Width', fa: 'عرض' }, unit: 'cm', step: 0.1, min: 0.1, max: 15 },
      { id: 't', label: { de: 'Tiefe', en: 'Depth', fa: 'عمق' }, unit: 'cm', step: 0.1, min: 0.1, max: 10 },
    ],
    calc: (v) => v.l && v.b && v.t ? v.l * v.b * v.t * 0.523 : null,
    resultUnit: 'ml', decimals: 1,
    ranges: [
      { max: 100, label: { de: '< 100 ml – klein', en: '<100 ml – small', fa: '<۱۰۰ ml – کوچک' }, color: '#ca8a04' },
      { max: 200, label: { de: '100–200 ml – typischer Bereich', en: '100–200 ml – typical range', fa: '۱۰۰–۲۰۰ ml – محدوده معمول' }, color: '#16a34a' },
      { max: Infinity, label: { de: '> 200 ml – vergrößert', en: '>200 ml – enlarged', fa: '>۲۰۰ ml – بزرگ‌شده' }, color: '#ea580c' },
    ],
  },

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
    hint: { de: 'Schnell-Assistent für inzidentelle Rundherde bei Erwachsenen ≥ 35 J.; nicht für Screening, Immunsuppression oder bekannte aktive Tumorerkrankung.', en: 'Quick assistant for incidental nodules in adults ≥ 35 y; not for screening, immunosuppression or known active cancer.', fa: 'دستیار سریع برای ندول‌های تصادفی در بزرگسالان ≥ ۳۵ سال؛ نه برای غربالگری، سرکوب ایمنی یا سرطان فعال شناخته‌شده.' },
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

export const REF_DATA = { anatomie: ANATOMIE, messwerte: MESSWERTE, klassifikationen: KLASSIFIKATIONEN_ERWEITERT, rechner: RECHNER }
