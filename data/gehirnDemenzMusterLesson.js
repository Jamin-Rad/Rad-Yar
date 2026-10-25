const L = (de, en, fa) => ({ de, en, fa })
const ref = (label, href, citation, scope = '') => ({ label, href, citation, scope })

export const GEHIRN_DEMENZMUSTER_LESSON = {
  "id": "dementia-atrophy-patterns",
  "curriculumIds": [
    "morbus-alzheimer",
    "lewy-body-demenz",
    "frontotemporale-demenz"
  ],
  "title": {
    "de": "Demenzmuster im MRT: Atrophie räumlich lesen",
    "en": "Dementia patterns on MRI: read atrophy by location",
    "fa": "الگوهای دمانس در MRI: آتروفی را بر پایهٔ مکان بخوانید"
  },
  "sourcePages": [
    72,
    73,
    74
  ],
  "printedPages": [
    71,
    72,
    73
  ],
  "objective": {
    "de": "Sie beschreiben, wo Volumenverlust betont ist, und trennen bildgebende Hinweise von klinischen Diagnosekriterien. Ein MRT-Muster allein legt keine Demenzform fest.",
    "en": "Describe where volume loss is most prominent and separate imaging clues from clinical diagnostic criteria. An MRI pattern alone does not establish a dementia subtype.",
    "fa": "محل برجستهٔ کاهش حجم را توصیف کنید و سرنخ تصویربرداری را از معیار تشخیص بالینی جدا نگه دارید. الگوی MRI به‌تنهایی نوع دمانس را تعیین نمی‌کند."
  },
  "heroAlt": {
    "de": "Nichtdiagnostische Übersicht mit drei Gehirnschemata: medialer Temporallappen, relativ erhaltener Hippocampus und frontotemporale Regionen; keine Patientenbilder.",
    "en": "Non-diagnostic overview with three brain schematics: medial temporal lobe, relatively preserved hippocampus, and frontotemporal regions; no patient images.",
    "fa": "نمای شماتیک و غیرتشخیصی از لوب تمپورال داخلی (مزیال)، حفظ نسبی هیپوکامپ و نواحی فرونتوتمپورال؛ تصویر بیمار نیست."
  },
  "ui": {
    "selfCheck": {
      "de": "Selbstcheck: Verteilungsmuster",
      "en": "Self-check: distribution pattern",
      "fa": "خودآزمایی: الگوی توزیع"
    },
    "takeHome": {
      "de": "Drei Merksätze",
      "en": "Three takeaways",
      "fa": "سه نکتهٔ کلیدی"
    },
    "sources": {
      "de": "Quellen und Grenzen",
      "en": "Sources and scope",
      "fa": "منابع و محدوده"
    }
  },
  "chapters": [
    {
      "id": "alzheimer",
      "icon": "hippocampus",
      "pages": [
        72
      ],
      "title": {
        "de": "Alzheimer: mesiotemporale und posteriore Atrophie",
        "en": "Alzheimer disease: medial temporal and posterior atrophy",
        "fa": "آلزایمر: آتروفی تمپورال داخلی (مزیال) و خلفی"
      },
      "text": {
        "de": "Die PDF zeigt eine beidseitige Hippocampus-/Mesiotemporalatrophie und eine Bildreihe für den MTA-Score (0–4). Beurteilen Sie die koronaren Aufnahmen auf Hippocampushöhe gemeinsam nach Höhe der Hippocampusformation, Breite der Fissura choroidea und des Temporalhorns; vergleichen Sie möglichst beide Seiten.\n\nDer MTA-Score ist alters- und referenzbezogen zu bewerten. Validierungsstudien in unterschiedlichen Populationen verwenden unterschiedliche Auswertungen und Schwellen; eine einzelne universelle Altersgrenze wird hier nicht als Diagnosekriterium übernommen. MTA allein ist nicht spezifisch für Alzheimer.\n\nDie PDF nennt außerdem Atrophie von posterioren Cingulum und Precuneus als frühere Verteilung gegenüber globaler Atrophie. Später kann eine diffuse Hirnatrophie mit erweiterten Liquorräumen und kompensatorischer Ventrikelerweiterung (Hydrocephalus e vacuo) auftreten.",
        "en": "The PDF shows bilateral hippocampal/medial temporal atrophy and a visual MTA score series (0–4). On coronal images at hippocampal level, assess hippocampal height and the width of the choroidal fissure and temporal horn together; compare both sides when possible.\n\nInterpret MTA with age and the chosen reference. Validation studies in different populations use different rating approaches and thresholds; a single universal age cutoff is not used here as a diagnostic criterion. MTA alone is not specific to Alzheimer disease.\n\nThe PDF also lists posterior cingulate and precuneus atrophy as an earlier distribution than global atrophy. Later, diffuse brain volume loss may widen CSF spaces and produce compensatory ventricular enlargement (hydrocephalus ex vacuo).",
        "fa": "PDF آتروفی دوطرفهٔ هیپوکامپ/تمپورال داخلی (مزیال) و ردیفی از تصاویر امتیاز MTA از ۰ تا ۴ را نشان می‌دهد. در برش کرونالِ سطح هیپوکامپ، ارتفاع ساختار هیپوکامپ و پهنای شکاف کوروئید و شاخ تمپورال را با هم بسنجید و در صورت امکان دو طرف را مقایسه کنید.\n\nMTA را با سن و مرجع به‌کاررفته تفسیر کنید. مطالعات اعتبارسنجی در جمعیت‌های متفاوت از روش‌های امتیازدهی و آستانه‌های متفاوت استفاده می‌کنند؛ اینجا یک مرز سنی همگانی معیار تشخیصی تلقی نمی‌شود. MTA به‌تنهایی مختص آلزایمر نیست.\n\nPDF همچنین آتروفی سینگولوم خلفی و پره‌کونئوس را الگویی زودتر از آتروفی منتشر می‌داند. در مراحل بعد، کاهش منتشر حجم مغز می‌تواند فضاهای مایع مغزی‌نخاعی را گشاد کند و بطن‌ها به‌طور جبرانی بزرگ شوند (هیدروسفالی ex vacuo)."
      },
      "figure": {
        "id": "source-pdf",
        "src": "/educational/demenzmuster/alzheimer-mta-p72.png",
        "width": 458,
        "height": 365,
        "alt": {
          "de": "Koronare MRT-Beispiele der PDF, als MTA 0 bis 4 beschriftet; die Reihe illustriert zunehmende mesiotemporale Atrophie.",
          "en": "Coronal MRI examples from the PDF labelled MTA 0 to 4; the series illustrates increasing medial temporal atrophy.",
          "fa": "نمونه‌های MRI کرونال PDF با برچسب MTA صفر تا چهار؛ این ردیف افزایش آتروفی تمپورال داخلی (مزیال) را نشان می‌دهد."
        },
        "caption": {
          "de": "Gehirn.pdf · PDF-S.72 (Druck-S.71), Bildreihe MTA 0–4. Vergleichen Sie die Höhe der Hippocampusformation sowie Fissura choroidea und Temporalhorn. PDF-Abbildung; keine unabhängige Einzelfalldiagnose.",
          "en": "Gehirn.pdf · PDF p.72 (printed p.71), MTA 0–4 image series. Compare hippocampal height, choroidal fissure, and temporal horn. Source-PDF figure; not an independent case diagnosis.",
          "fa": "Gehirn.pdf · صفحهٔ PDF ۷۲ (چاپی ۷۱)، ردیف MTA صفر تا چهار. ارتفاع هیپوکامپ، شکاف کوروئید و شاخ تمپورال را مقایسه کنید. تصویر از PDF است و تشخیص مستقل یک بیمار نیست."
        }
      }
    },
    {
      "id": "lewy",
      "icon": "brain",
      "pages": [
        73
      ],
      "title": {
        "de": "Lewy-Körper-Demenz: Klinik und relative MTL-Erhaltung",
        "en": "Dementia with Lewy bodies: clinical clues and relative MTL preservation",
        "fa": "دمانس با اجسام لویی: سرنخ‌های بالینی و حفظ نسبی تمپورال داخلی (مزیال)"
      },
      "text": {
        "de": "Die PDF führt Lewy-Körper-Demenz als zweithäufigste neurodegenerative Demenz auf und nennt α-Synuclein-Ablagerungen. Klinisch werden fluktuierende Kognition, visuelle Halluzinationen und Parkinsonismus zusammengefasst; die zeitliche Beziehung zu Beginn von Demenz und Motorik hilft, DLB und Parkinson-Demenz klinisch einzuordnen.\n\nIm MRT kann die Hippocampusformation im Vergleich zur Alzheimer-Erkrankung relativ erhalten sein. Die PDF beschreibt eine geringe globale Atrophie mit Betonung im Bereich der Insula; dieser Befund ist als Quellenbeschreibung zu verstehen, nicht als spezifisches DLB-Zeichen. Eine relative MTL-Erhaltung ist ein Hinweis, kein Ausschluss einer begleitenden Alzheimer-Pathologie und kein alleiniger DLB-Test.\n\nIm DLB-Konsensus 2017 ist relative MTL-Erhaltung ein unterstützender struktureller Hinweis. Verminderte striatale DAT-Aufnahme in SPECT/PET gilt als indikativer Biomarker und wird getrennt vom MRT berichtet. Auch sie benötigt klinische Einordnung und die Prüfung anderer Ursachen eines DAT-Mangels.",
        "en": "The PDF describes dementia with Lewy bodies (DLB) as the second most common neurodegenerative dementia and names α-synuclein deposits. The clinical summary includes fluctuating cognition, visual hallucinations, and parkinsonism; the timing of dementia and motor symptoms helps clinically distinguish DLB from Parkinson disease dementia.\n\nOn MRI, the hippocampal formation may be relatively preserved compared with Alzheimer disease. The PDF describes mild global atrophy, particularly involving the insula; this is a source-described observation, not a specific DLB sign. Relative medial temporal preservation is a clue, not an exclusion of coexisting Alzheimer pathology and not a stand-alone DLB test.\n\nIn the 2017 DLB consensus, relative MTL preservation is a supportive structural clue. Reduced striatal DAT uptake on SPECT/PET is an indicative biomarker, reported separately from MRI. It still requires clinical interpretation and assessment for other causes of reduced DAT uptake.",
        "fa": "PDF دمانس با اجسام لویی (DLB) را دومین دمانس نورودژنراتیو شایع معرفی می‌کند و به رسوب آلفا‌سینوکلئین اشاره دارد. خلاصهٔ بالینی شامل نوسان شناخت، توهم بینایی و پارکینسونیسم است؛ زمان شروع دمانس و علائم حرکتی در افتراق بالینی DLB از دمانس بیماری پارکینسون کمک می‌کند.\n\nدر MRI، ساختار هیپوکامپ ممکن است در مقایسه با آلزایمر نسبتاً حفظ شده باشد. PDF آتروفی منتشر خفیفی را توصیف می‌کند که در ناحیهٔ اینسولا برجسته‌تر است؛ این یک مشاهدهٔ گزارش‌شده در منبع است و نشانهٔ اختصاصی DLB نیست. حفظ نسبی تمپورال داخلی (مزیال) یک سرنخ است؛ بیماری هم‌زمان آلزایمر را رد نمی‌کند و آزمون مستقل DLB نیست.\n\nدر اجماع DLB سال ۲۰۱۷، حفظ نسبی تمپورال داخلی سرنخ ساختاری حمایتی است. کاهش برداشت استریاتال DAT در SPECT/PET در گروه نشانگرهای شاخص قرار می‌گیرد و جدا از MRI گزارش می‌شود. این یافته نیز به تفسیر بالینی و بررسی علل دیگر کاهش DAT نیاز دارد."
      }
    },
    {
      "id": "ftd",
      "icon": "compare",
      "pages": [
        74
      ],
      "title": {
        "de": "Frontotemporale Demenz: anteriore Verteilung erkennen",
        "en": "Frontotemporal dementia: recognise the anterior distribution",
        "fa": "دمانس فرونتوتمپورال: شناسایی توزیع قدامی"
      },
      "text": {
        "de": "Die PDF nennt einen häufigen Beginn vor dem 65. Lebensjahr und zwei klinische Erscheinungsformen: Verhaltensvariante (bvFTD) sowie primär progressive Aphasie (PPA). Bildgebung und klinisches Profil gehören zusammen; Atrophie allein legt die Variante nicht fest.\n\nIm MRT zeigt sich betonte, oft asymmetrische Atrophie frontal und/oder temporal. Die PDF beschreibt eine „knife-edge“-Morphologie: messerscharf verschmälerte Gyri bei zunächst relativ erhaltenem Parietal- und Okzipitalkortex. Das ist ein morphologischer Eindruck, kein eigenständiger Test; frühe oder atypische Fälle können anders aussehen.\n\nDie koronar und axial gezeigten MRT-Beispiele der PDF illustrieren die frontale beziehungsweise anteriortemporale Verteilung; die Sequenz ist auf der Folie nicht angegeben. Für die Diagnose einer bvFTD braucht es zusätzlich klinische Kriterien; strukturelle Atrophie unterstützt die Einordnung.",
        "en": "The PDF notes that onset is often before age 65 and lists two clinical presentations: the behavioural variant (bvFTD) and primary progressive aphasia (PPA). Imaging and clinical profile must be considered together; atrophy alone does not determine the variant.\n\nMRI may show prominent, often asymmetric frontal and/or temporal atrophy. The PDF describes a “knife-edge” appearance: markedly thinned gyri with relative early preservation of parietal and occipital cortex. This is a morphological impression, not a stand-alone test; early or atypical cases may look different.\n\nThe PDF’s coronal and axial MRI examples illustrate frontal/anterior temporal distribution; the slide does not specify their sequence. A bvFTD diagnosis also requires clinical criteria; structural atrophy supports the classification.",
        "fa": "PDF شروع بیماری را اغلب پیش از ۶۵ سالگی می‌داند و دو تظاهر بالینی را برمی‌شمارد: نوع رفتاری (bvFTD) و آفازی پیشروندهٔ اولیه (PPA). تصویربرداری و نمای بالینی باید کنار هم تفسیر شوند؛ آتروفی به‌تنهایی گونه را تعیین نمی‌کند.\n\nدر MRI ممکن است آتروفی برجسته و اغلب نامتقارنِ فرونتال و/یا تمپورال دیده شود. PDF نمای «knife-edge» را چنین توصیف می‌کند: شکنج‌های به‌شدت نازک با حفظ نسبی اولیهٔ قشر پاریتال و اکسیپیتال. این یک توصیف مورفولوژیک است، نه آزمون مستقل؛ موارد زودرس یا نامعمول ممکن است متفاوت باشند.\n\nنمونه‌های MRI کرونال و اکسیال PDF توزیع فرونتال/تمپورال قدامی را نشان می‌دهند؛ توالی تصاویر در اسلاید مشخص نشده است. تشخیص bvFTD به معیارهای بالینی نیز نیاز دارد؛ آتروفی ساختاری از طبقه‌بندی پشتیبانی می‌کند."
      },
      "figure": {
        "id": "ftd-source-pattern",
        "src": "/educational/demenzmuster/ftd-p74.png",
        "width": 528,
        "height": 320,
        "alt": {
          "de": "Zwei MRT-Bilder der PDF: koronare und axiale Beispiele mit betonter frontaler und anteriortemporaler Atrophie.",
          "en": "Two MRI images from the PDF: coronal and axial examples with prominent frontal and anterior temporal atrophy.",
          "fa": "دو تصویر MRI از PDF: نمونه‌های کرونال و اکسیال با آتروفی برجستهٔ فرونتال و تمپورال قدامی."
        },
        "caption": {
          "de": "Gehirn.pdf · PDF-S.74 (Druck-S.73), zwei MRT-Beispiele; Sequenzen nicht angegeben. Suchen Sie die betonte frontale/anterior-temporale Verteilung und vergleichen Sie die Hemisphären. Die PDF benennt keine Radiopaedia-Fall-ID oder Einzelbild-Provenienz.",
          "en": "Gehirn.pdf · PDF p.74 (printed p.73), two MRI examples; sequences are not specified. Look for prominent frontal/anterior temporal distribution and compare hemispheres. The PDF provides no Radiopaedia case ID or individual-image provenance.",
          "fa": "Gehirn.pdf · صفحهٔ PDF ۷۴ (چاپی ۷۳)، دو نمونهٔ MRI؛ توالی‌ها مشخص نشده‌اند. توزیع برجستهٔ فرونتال/تمپورال قدامی را بیابید و دو نیمکره را مقایسه کنید. PDF شناسهٔ کیس رادیوپدیا یا منشأ جداگانهٔ تصاویر را ثبت نکرده است."
        }
      }
    }
  ],
  "assessment": {
    "id": "gehirn-dementia-pattern-check",
    "sourcePages": [
      72,
      73,
      74
    ],
    "correctIndex": 1,
    "question": {
      "de": "Eine Person entwickelt fortschreitend Enthemmung und verändertes Sozialverhalten. Welche regionale Atrophieverteilung passt am ehesten zu diesem klinischen Syndrom?",
      "en": "A person develops progressive disinhibition and altered social behaviour. Which regional atrophy distribution best fits this clinical syndrome?",
      "fa": "فردی به‌تدریج دچار مهارگسیختگی و تغییر رفتار اجتماعی می‌شود. کدام توزیع ناحیه‌ای آتروفی بیشتر با این سندرم بالینی سازگار است؟"
    },
    "options": [
      {
        "de": "Vorwiegend beidseitige mesiotemporale Atrophie",
        "en": "Predominantly bilateral medial temporal atrophy",
        "fa": "آتروفی عمدتاً دوطرفهٔ تمپورال داخلی"
      },
      {
        "de": "Betonte, oft asymmetrische frontale und/oder anteriortemporale Atrophie",
        "en": "Prominent, often asymmetric frontal and/or anterior temporal atrophy",
        "fa": "آتروفی برجسته و اغلب نامتقارن فرونتال و/یا تمپورال قدامی"
      },
      {
        "de": "Vorwiegend parietookzipitale Atrophie bei relativ erhaltenen vorderen Regionen",
        "en": "Predominantly parieto-occipital atrophy with relatively preserved anterior regions",
        "fa": "آتروفی عمدتاً پاریتواُکسیپیتال با حفظ نسبی نواحی قدامی"
      },
      {
        "de": "Gleichmäßig verteilte globale Atrophie ohne regionalen Schwerpunkt",
        "en": "Uniform global atrophy without a regional predominance",
        "fa": "آتروفی منتشر یکنواخت بدون غلبهٔ ناحیه‌ای"
      }
    ],
    "feedback": {
      "de": "Frontal und anteriortemporal betonte Atrophie unterstützt das passende klinische Syndrom. Bildgebung allein legt weder die Variante noch eine gesicherte bvFTD fest. Für die wahrscheinliche bvFTD werden passende klinische Kriterien, funktioneller Abbau und unterstützende Bildgebung zusammengeführt; andere Ursachen müssen berücksichtigt werden.",
      "en": "Frontal and anterior temporal-predominant atrophy supports the matching clinical syndrome. Imaging alone establishes neither the variant nor definite bvFTD. Probable bvFTD integrates compatible clinical criteria, functional decline and supportive imaging, with competing causes considered.",
      "fa": "آتروفی با غلبهٔ فرونتال و تمپورال قدامی از سندرم بالینی سازگار حمایت می‌کند. تصویربرداری به‌تنهایی نه گونه و نه bvFTD قطعی را تعیین می‌کند. در bvFTD محتمل، معیارهای بالینی سازگار، افت عملکرد و تصویربرداری حمایتی با هم ارزیابی و علل دیگر در نظر گرفته می‌شوند."
    },
    "retry": {
      "de": "Ordnen Sie die betonte frontale/anterior-temporale Verteilung zu; sie ist ein Hinweis und keine alleinige Diagnose.",
      "en": "Match the prominent frontal/anterior temporal distribution; it is a clue, not a diagnosis on its own.",
      "fa": "توزیع برجستهٔ فرونتال/تمپورال قدامی را انتخاب کنید؛ این یک سرنخ است، نه تشخیص مستقل."
    },
    "optionFeedback": [
      {
        "de": "Mesiotemporale Atrophie ist unter anderem im amnestischen Alzheimer-Spektrum relevant, aber nicht das hier gesuchte frontotemporal betonte Unterstützungsmuster.",
        "en": "Medial temporal atrophy matters, among other contexts, in the amnestic Alzheimer spectrum, but is not the frontal/anterior temporal support pattern requested here.",
        "fa": "آتروفی تمپورال داخلی از جمله در طیف آلزایمرِ همراه اختلال حافظه مهم است، ولی الگوی حمایتی فرونتال/تمپورال قدامیِ مورد سؤال نیست."
      },
      {
        "de": "Frontal und anteriortemporal betonte Atrophie unterstützt das passende klinische Syndrom. Bildgebung allein legt weder die Variante noch eine gesicherte bvFTD fest. Für die wahrscheinliche bvFTD werden passende klinische Kriterien, funktioneller Abbau und unterstützende Bildgebung zusammengeführt; andere Ursachen müssen berücksichtigt werden.",
        "en": "Frontal and anterior temporal-predominant atrophy supports the matching clinical syndrome. Imaging alone establishes neither the variant nor definite bvFTD. Probable bvFTD integrates compatible clinical criteria, functional decline and supportive imaging, with competing causes considered.",
        "fa": "آتروفی با غلبهٔ فرونتال و تمپورال قدامی از سندرم بالینی سازگار حمایت می‌کند. تصویربرداری به‌تنهایی نه گونه و نه bvFTD قطعی را تعیین می‌کند. در bvFTD محتمل، معیارهای بالینی سازگار، افت عملکرد و تصویربرداری حمایتی با هم ارزیابی و علل دیگر در نظر گرفته می‌شوند."
      },
      {
        "de": "Eine posterior betonte Verteilung verlangt eine andere Muster- und klinische Einordnung; sie ist nicht das typische vordere Unterstützungsmuster dieses Falls.",
        "en": "A posterior-predominant distribution calls for different pattern and clinical assessment; it is not the typical anterior support pattern in this vignette.",
        "fa": "توزیع با غلبهٔ خلفی به تفسیر الگویی و بالینی دیگری نیاز دارد و الگوی حمایتی قدامیِ تیپیک این سناریو نیست."
      },
      {
        "de": "Globale Atrophie ohne Schwerpunkt ist unspezifischer; die regionale frontale/anteriortemporale Betonung ist hier der gezieltere Hinweis.",
        "en": "Global atrophy without a predominance is less specific; frontal/anterior temporal regional emphasis is the more targeted clue here.",
        "fa": "آتروفی منتشر بدون غلبهٔ ناحیه‌ای کم‌اختصاص‌تر است؛ تأکید فرونتال/تمپورال قدامی اینجا سرنخ هدفمندتری است."
      }
    ]
  },
  "takeaways": [
    {
      "title": {
        "de": "Alzheimer · mesiotemporal",
        "en": "Alzheimer · medial temporal",
        "fa": "آلزایمر · تمپورال داخلی (مزیال)"
      },
      "detail": {
        "de": "MTA gemeinsam anhand von Hippocampus, Fissura choroidea und Temporalhorn beurteilen; Alterskontext und fehlende Spezifität beachten.",
        "en": "Assess MTA using hippocampus, choroidal fissure, and temporal horn together; consider age and its lack of specificity.",
        "fa": "MTA را با ارزیابی هم‌زمان هیپوکامپ، شکاف کوروئید و شاخ تمپورال بسنجید؛ سن و نبود اختصاصیت را در نظر بگیرید."
      }
    },
    {
      "title": {
        "de": "Lewy-Körper · relative Erhaltung",
        "en": "Lewy body · relative preservation",
        "fa": "اجسام لویی · حفظ نسبی"
      },
      "detail": {
        "de": "Relativ erhaltene mesiotemporale Strukturen können die Differenzialdiagnose stützen, aber eine Begleitpathologie nicht ausschließen.",
        "en": "Relative medial temporal preservation can support the differential, but cannot exclude co-pathology.",
        "fa": "حفظ نسبی تمپورال داخلی (مزیال) می‌تواند از افتراق پشتیبانی کند، اما بیماری هم‌زمان را رد نمی‌کند."
      }
    },
    {
      "title": {
        "de": "FTD · anteriore Asymmetrie",
        "en": "FTD · anterior asymmetry",
        "fa": "FTD · عدم تقارن قدامی"
      },
      "detail": {
        "de": "Frontal/anterior-temporale Atrophie und Hemisphären vergleichen; Bildgebung immer klinisch korrelieren.",
        "en": "Compare frontal/anterior temporal atrophy and hemispheres; always correlate imaging clinically.",
        "fa": "آتروفی فرونتال/تمپورال قدامی و دو نیمکره را مقایسه کنید؛ تصویربرداری را با بالین تطبیق دهید."
      }
    }
  ],
  "references": [
    {
      "label": "Gehirn.pdf, PDF pp.72–74 (printed pp.71–73)",
      "href": "#source-pdf",
      "citation": {
        "de": "Gehirn.pdf · Quelltext und Abbildungen auf PDF-Seiten 72–74.",
        "en": "Gehirn.pdf · source text and figures on PDF pages 72–74.",
        "fa": "Gehirn.pdf · متن و تصاویر منبع در صفحات ۷۲ تا ۷۴ PDF."
      },
      "scope": {
        "de": "Die Bildtafeln stammen aus der bereitgestellten PDF; kein externer Patientenfall wurde ergänzt.",
        "en": "Source image panels are reproduced from the user-provided PDF; no external patient case was added.",
        "fa": "پنل‌های تصویری از PDF ارائه‌شده گرفته شده‌اند؛ کیس بیمار خارجی اضافه نشده است."
      }
    },
    {
      "label": "Scheltens P, et al. Atrophy of medial temporal lobes on MRI in “probable” Alzheimer’s disease and normal ageing. J Neurol Neurosurg Psychiatry. 1992;55:967–972.",
      "href": "https://pubmed.ncbi.nlm.nih.gov/1431963/",
      "citation": {
        "de": "Originalarbeit zur visuellen MTA-Skala und ihrem diagnostischen Wert.",
        "en": "Original visual MTA scale and diagnostic-value study.",
        "fa": "پژوهش اصلی دربارهٔ مقیاس دیداری MTA و ارزش تشخیصی آن."
      },
      "scope": {
        "de": "Validiert nicht jede auf der bereitgestellten Folie genannte Altersgrenze.",
        "en": "Does not validate every age threshold quoted in the supplied slide.",
        "fa": "همهٔ آستانه‌های سنی ذکرشده در اسلاید ارائه‌شده را تأیید نمی‌کند."
      }
    },
    {
      "label": "McKeith IG, et al. Diagnosis and management of dementia with Lewy bodies: Fourth consensus report. Neurology. 2017;89:88–100.",
      "href": "https://pmc.ncbi.nlm.nih.gov/articles/PMC5496518/",
      "citation": {
        "de": "Klinische Merkmale, Biomarker und relative Erhaltung medial-temporaler Strukturen.",
        "en": "Clinical features, biomarkers, and relative medial temporal preservation.",
        "fa": "ویژگی‌های بالینی، نشانگرهای زیستی و حفظ نسبی ساختارهای تمپورال داخلی."
      },
      "scope": {
        "de": "Bildgebung wird gemeinsam mit klinischen Kriterien interpretiert.",
        "en": "Imaging is interpreted with clinical criteria.",
        "fa": "تصویربرداری همراه با معیارهای بالینی تفسیر می‌شود."
      }
    },
    {
      "label": "Rascovsky K, et al. Sensitivity of revised diagnostic criteria for the behavioural variant of frontotemporal dementia. Brain. 2011;134:2456–2477.",
      "href": "https://pmc.ncbi.nlm.nih.gov/articles/PMC3170532/",
      "citation": {
        "de": "Klinische Kriterien unterscheiden mögliche, wahrscheinliche und gesicherte bvFTD.",
        "en": "Clinical criteria distinguish possible, probable, and definite bvFTD.",
        "fa": "معیارهای بالینی bvFTD ممکن، محتمل و قطعی را تفکیک می‌کنند."
      },
      "scope": {
        "de": "Bildgebung unterstützt zusammen mit funktionellem Abbau die wahrscheinliche Diagnose; allein genügt sie nicht.",
        "en": "Imaging supports probable classification with functional decline; imaging alone is insufficient.",
        "fa": "تصویربرداری همراه با افت عملکرد از طبقه‌بندی محتمل حمایت می‌کند؛ تصویربرداری به‌تنهایی کافی نیست."
      }
    },
    {
      "label": "Validity and reliability of the medial temporal lobe atrophy scale in a memory clinic population. BMC Neurology. 2021.",
      "href": "https://pmc.ncbi.nlm.nih.gov/articles/PMC8305846/",
      "citation": {
        "de": "Originale MTA-Validierung in einer heterogenen Gedächtnisambulanz-Kohorte; Komponenten und altersabhängige Einordnung.",
        "en": "Original MTA validation in a heterogeneous memory-clinic cohort; components and age-related interpretation.",
        "fa": "اعتبارسنجی اصلی MTA در جمعیت متنوع درمانگاه حافظه؛ اجزا و تفسیر وابسته به سن."
      },
      "scope": {
        "de": "Keine einzelne Studienschwelle als universeller Alzheimer-Test übernommen.",
        "en": "No single study cutoff adopted as a universal Alzheimer test.",
        "fa": "هیچ آستانهٔ منفرد مطالعه به‌عنوان آزمون همگانی آلزایمر به کار نرفته است."
      }
    }
  ],
  "mediaNote": {
    "de": "Ein dreiteiliges Code-SVG als nichtdiagnostische Orientierung. Die MTA-Reihe und FTD-Aufnahmen sind Ausschnitte aus der vom Nutzer bereitgestellten PDF. Fälle/Teilnehmende sind darin nicht identifiziert; kein Radiopaedia-Link wurde ergänzt.",
    "en": "One three-panel code SVG provides non-diagnostic orientation. The MTA series and FTD images are crops from the user-provided PDF. Cases/contributors are not identified there; no Radiopaedia link was added.",
    "fa": "یک SVG سه‌پنلیِ کدنویسی‌شده صرفاً برای جهت‌یابی غیرتشخیصی است. ردیف MTA و تصاویر FTD برش‌هایی از PDF ارائه‌شده توسط کاربرند. کیس/مشارکت‌کننده در PDF مشخص نشده و لینک رادیوپدیا اضافه نشده است."
  },
  "goals": [
    {
      "de": "Den MTA-Score mit seinen anatomischen Komponenten und diagnostischen Grenzen anwenden.",
      "en": "Apply the MTA score using its anatomical components and diagnostic limits.",
      "fa": "امتیاز MTA را با اجزای آناتومیک و محدودیت‌های تشخیصی آن به کار ببرید."
    },
    {
      "de": "Strukturelle Hinweise bei DLB von einem indikativen nuklearmedizinischen Biomarker unterscheiden.",
      "en": "Distinguish structural clues in DLB from an indicative nuclear-medicine biomarker.",
      "fa": "سرنخ‌های ساختاری DLB را از نشانگر زیستی شاخص در پزشکی هسته‌ای متمایز کنید."
    },
    {
      "de": "Ein frontotemporales Atrophiemuster im passenden klinischen Kontext erkennen und die Diagnosegrenze benennen.",
      "en": "Recognise frontotemporal atrophy in its clinical context and state its diagnostic limit.",
      "fa": "الگوی آتروفی فرونتوتمپورال را در زمینهٔ بالینی مناسب بشناسید و محدودیت تشخیصی آن را بیان کنید."
    }
  ]
}
