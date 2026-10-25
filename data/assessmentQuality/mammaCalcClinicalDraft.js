// Canonical18-question content consumed by the actual calcification producers.
// Legacy filename retained; no offline/shadow pool. Source and review scope: Calcification08 author ledger.
export const MAMMA_CALCIFICATION_CLINICAL_CONTENT = {
  "size-alone": {
    "question": {
      "de": "Textfall: Eine neue Kalkgruppe enthält überwiegend submillimetrische Partikel. Welche Formbeschreibung ist trotz der kleinen Partikelgröße suspekt?",
      "en": "Text vignette: A new calcification group contains mainly submillimetric particles. Which shape description is suspicious despite the small particle size?",
      "fa": "سناریوی متنی: گروه جدید کلسیفیکاسیون عمدتاً ذرات زیرمیلی‌متری دارد. کدام توصیف شکل، با وجود اندازهٔ کوچک ذرات، مشکوک است؟"
    },
    "options": [
      {
        "de": "Rund, glatt und in der Form gleichartig",
        "en": "Round, smooth and similar in shape",
        "fa": "گرد، صاف و هم‌شکل"
      },
      {
        "de": "Fein, irregulär und in Größe und Form unterschiedlich",
        "en": "Fine, irregular and variable in size and shape",
        "fa": "ظریف، نامنظم و متفاوت از نظر اندازه و شکل"
      },
      {
        "de": "Rund mit zentraler Aufhellung und gesicherter Hautlage",
        "en": "Round with central lucency and confirmed skin location",
        "fa": "گرد با شفافیت مرکزی و محل پوستی تأییدشده"
      },
      {
        "de": "Halbmondförmig sedimentierend mit projektionsabhängigem Formwechsel",
        "en": "Semilunar sediment with projection-dependent shape change",
        "fa": "رسوب هلالی با تغییر شکل وابسته به نما"
      }
    ],
    "correct": "B",
    "difficulty": 1,
    "source": "https://edge.sitecorecloud.io/americancoldf5f-acrorgf92a-productioncb02-3650/media/ACR/Files/RADS/BI-RADS/BI-RADS-Summary-Form-Mammography.pdf",
    "explanation": {
      "de": "Die irregulären, unterschiedlich geformten feinen Partikel passen zu fein pleomorpher, suspekter Morphologie. Geringe Größe allein beruhigt nicht; Verteilung, Vergleich und Gesamtbefund gehören zum Assessment.",
      "en": "Fine irregular particles with variable shapes fit suspicious fine pleomorphic morphology. Small size alone is not reassuring; include distribution, comparison and overall findings in assessment.",
      "fa": "ذرات ظریف و نامنظم با شکل‌های متفاوت با مورفولوژی مشکوک پلئومورفیک ظریف تطابق دارند. اندازهٔ کوچک به‌تنهایی اطمینان‌بخش نیست؛ توزیع، مقایسه و یافته‌های کلی نیز در ارزیابی لحاظ شوند."
    },
    "wrong": {
      "A": {
        "de": "Glatte runde Partikel besitzen nicht die beschriebene pleomorphe Form; die Gesamtbewertung bleibt dennoch kontextabhängig.",
        "en": "Smooth round particles lack the pleomorphic shape described; overall assessment still depends on context.",
        "fa": "ذرات گرد و صاف شکل پلئومورفیک توصیف‌شده را ندارند؛ بااین‌حال ارزیابی کلی وابسته به زمینه است."
      },
      "C": {
        "de": "Gesicherte oberflächliche Lage mit zentraler Aufhellung stützt typische Hautverkalkung.",
        "en": "Confirmed superficial location with central lucency supports typical skin calcification.",
        "fa": "محل سطحی تأییدشده با شفافیت مرکزی از کلسیفیکاسیون پوستی تیپیک حمایت می‌کند."
      },
      "D": {
        "de": "Der lageabhängige Formwechsel mit Sediment entspricht Layering und nicht fein pleomorpher Partikelform.",
        "en": "Position-dependent shape change with sediment corresponds to layering rather than fine pleomorphic particle shape.",
        "fa": "تغییر شکل وابسته به وضعیت همراه رسوب با لایه‌بندی تطابق دارد، نه شکل پلئومورفیک ظریف ذرات."
      }
    },
    "sources": [
      "https://edge.sitecorecloud.io/americancoldf5f-acrorgf92a-productioncb02-3650/media/ACR/Files/RADS/BI-RADS/BI-RADS-Summary-Form-Mammography.pdf"
    ],
    "learningGoalIds": [
      "calc08-characterise"
    ]
  },
  "magnification": {
    "question": {
      "de": "Textfall: Im Screening wird eine neue feine Kalkgruppe erkannt; ihre Partikelform ist auf den Standardaufnahmen nicht sicher beurteilbar. Welche gezielte Ergänzung dient vorrangig der morphologischen Detailanalyse?",
      "en": "Text vignette: Screening reveals a new fine calcification group whose particle shape is unclear on standard views. Which targeted addition primarily serves detailed morphological assessment?",
      "fa": "سناریوی متنی: در غربالگری گروه جدیدی از کلسیفیکاسیون ظریف دیده شده که شکل ذرات آن در نماهای استاندارد روشن نیست. کدام بررسی هدفمند عمدتاً برای تحلیل جزئیات مورفولوژیک مناسب است؟"
    },
    "options": [
      {
        "de": "Gezielte Spotkompression ohne geometrische Vergrößerung",
        "en": "Targeted spot compression without geometric magnification",
        "fa": "فشردگی موضعی هدفمند بدون بزرگ‌نمایی هندسی"
      },
      {
        "de": "DBT-Schichten zur räumlichen Lokalisation und zum Gewebekontext",
        "en": "DBT slices for spatial localisation and tissue context",
        "fa": "برش‌های DBT برای تعیین محل فضایی و زمینهٔ بافتی"
      },
      {
        "de": "Gezielte mammographische Vergrößerungsaufnahmen des Kalkareals",
        "en": "Targeted mammographic magnification views of the calcification area",
        "fa": "نماهای بزرگ‌نمایی ماموگرافیک هدفمند از ناحیهٔ کلسیفیکاسیون"
      },
      {
        "de": "Tangentialaufnahme zur Prüfung einer möglichen Hautlage",
        "en": "Tangential view to assess possible skin location",
        "fa": "نمای تانژانسی برای بررسی محل پوستی احتمالی"
      }
    ],
    "correct": "C",
    "difficulty": 2,
    "source": "https://www.gov.uk/government/publications/breast-screening-clinical-guidelines-for-screening-management/clinical-guidance-for-breast-cancer-screening-assessment",
    "explanation": {
      "de": "Gezielte Vergrößerung unterstützt die Beurteilung von Form, Kontur und Anordnung. Ein kleiner Brennfleck begrenzt geometrische Unschärfe. Ultraschall oder MRT können ergänzende Fragen beantworten, ersetzen die Kalkdetailanalyse aber nicht.",
      "en": "Targeted magnification supports assessment of shape, margins and arrangement. A small focal spot limits geometric blur. Ultrasound or MRI may answer additional questions but do not replace calcification detail analysis.",
      "fa": "بزرگ‌نمایی هدفمند به ارزیابی شکل، حاشیه و آرایش کمک می‌کند. کانون کوچک تاری هندسی را محدود می‌کند. سونوگرافی یا MRI ممکن است به پرسش‌های تکمیلی پاسخ دهند ولی جای تحلیل جزئیات کلسیفیکاسیون را نمی‌گیرند."
    },
    "wrong": {
      "A": {
        "de": "Spotkompression reduziert Überlagerung, bietet aber nicht die gezielte geometrische Detailvergrößerung der Kalkpartikel.",
        "en": "Spot compression reduces overlap but does not provide targeted geometric magnification of calcification particles.",
        "fa": "فشردگی موضعی هم‌پوشانی را کم می‌کند ولی بزرگ‌نمایی هندسی هدفمند جزئیات ذرات کلسیفیکاسیون را فراهم نمی‌کند."
      },
      "B": {
        "de": "DBT ergänzt Lokalisation und Gewebekontext. Für die hier gefragte feine Partikelform bleiben gezielte Vergrößerungsaufnahmen wichtig.",
        "en": "DBT adds localisation and tissue context. Targeted magnification remains important for the fine particle shape asked about here.",
        "fa": "DBT محل و زمینهٔ بافتی را تکمیل می‌کند. برای شکل ظریف ذرات که اینجا مطرح است، نمای بزرگ‌نمایی هدفمند همچنان اهمیت دارد."
      },
      "D": {
        "de": "Eine Tangentialaufnahme beantwortet vor allem die Frage nach oberflächlicher Hautlage. Hier steht die feine Partikelmorphologie im Vordergrund.",
        "en": "A tangential view primarily answers whether calcifications lie in the skin. Fine particle morphology is the main question here.",
        "fa": "نمای تانژانسی عمدتاً به محل پوستی کلسیفیکاسیون پاسخ می‌دهد. اینجا پرسش اصلی مورفولوژی ظریف ذرات است."
      }
    },
    "sources": [
      "https://www.gov.uk/government/publications/breast-screening-clinical-guidelines-for-screening-management/clinical-guidance-for-breast-cancer-screening-assessment",
      "https://www.acr.org/-/media/ACR/Files/Practice-Parameters/dig-mamo.pdf"
    ],
    "learningGoalIds": [
      "calc08-characterise"
    ]
  },
  "popcorn": {
    "question": {
      "de": "Textfall: Eine über Jahre bekannte umschriebene Brustmasse entwickelt zunehmend grobe, dichte, zusammenfließende popcornartige Verkalkungen. Welche Erklärung passt am besten?",
      "en": "Text vignette: A longstanding circumscribed breast mass develops increasingly coarse, dense, confluent popcorn-like calcifications. Which explanation fits best?",
      "fa": "سناریوی متنی: تودهٔ پستانی با حدود مشخص و شناخته‌شده از سال‌ها قبل، به‌تدریج کلسیفیکاسیون درشت، متراکم و به‌هم‌پیوستهٔ پاپ‌کورنی پیدا می‌کند. کدام توضیح مناسب‌تر است؟"
    },
    "options": [
      {
        "de": "Involution eines Fibroadenoms",
        "en": "Involution of a fibroadenoma",
        "fa": "پسرفت فیبروآدنوم"
      },
      {
        "de": "Sedimentation von Kalzium in kleinen Zysten",
        "en": "Sedimentation of calcium in small cysts",
        "fa": "رسوب کلسیم در کیست‌های کوچک"
      },
      {
        "de": "Verkalkung entlang paralleler Gefäßwände",
        "en": "Calcification along parallel vessel walls",
        "fa": "کلسیفیکاسیون در امتداد دیواره‌های موازی عروق"
      },
      {
        "de": "Dünne irreguläre Verkalkung duktaler Gangausgüsse",
        "en": "Thin irregular calcification of ductal casts",
        "fa": "کلسیفیکاسیون ظریف و نامنظم قالب‌های مجرایی"
      }
    ],
    "correct": "A",
    "difficulty": 2,
    "source": "https://edge.sitecorecloud.io/americancoldf5f-acrorgf92a-productioncb02-3650/media/ACR/Files/RADS/BI-RADS/BI-RADS-Summary-Form-Mammography.pdf",
    "explanation": {
      "de": "Die aktuelle Kategorie „Coarse“ umfasst das klassische popcornartige, dichte und zusammenfließende Muster. In einer bekannten umschriebenen Masse passt es zur Involution eines Fibroadenoms. Die gesamte Konstellation zählt; Größe allein beweist keine Benignität.",
      "en": "The current “coarse” descriptor includes the classic popcorn-like, dense, confluent pattern. In a known circumscribed mass it fits fibroadenoma involution. Assessment uses the whole constellation; size alone does not establish benignity.",
      "fa": "اصطلاح کنونی «درشت» الگوی کلاسیک پاپ‌کورنی، متراکم و به‌هم‌پیوسته را در بر می‌گیرد. در تودهٔ شناخته‌شده با حدود مشخص با پسرفت فیبروآدنوم تطابق دارد. کل مجموعه مهم است؛ اندازه به‌تنهایی خوش‌خیمی را ثابت نمی‌کند."
    },
    "wrong": {
      "B": {
        "de": "Sediment erzeugt vor allem lageabhängiges Layering, nicht eine zunehmend grobe konfluierende Masseverkalkung.",
        "en": "Sediment mainly produces position-dependent layering rather than increasingly coarse confluent calcification of a mass.",
        "fa": "رسوب بیشتر لایه‌بندی وابسته به وضعیت ایجاد می‌کند، نه کلسیفیکاسیون درشت و پیوستهٔ پیشرونده در توده."
      },
      "C": {
        "de": "Gefäßkalk folgt einem linearen oder tubulären Gefäßverlauf und erklärt kein popcornartiges Muster innerhalb der Masse.",
        "en": "Vascular calcium follows linear or tubular vessels rather than a popcorn pattern within a mass.",
        "fa": "کلسیفیکاسیون عروقی مسیر خطی یا لوله‌ای عروق را دنبال می‌کند، نه الگوی پاپ‌کورنی داخل توده."
      },
      "D": {
        "de": "Duktale Gangausgüsse sind dünn und irregulär; hier sind grobe zusammenfließende Partikel beschrieben.",
        "en": "Ductal casts are thin and irregular; the described particles are coarse and confluent.",
        "fa": "قالب‌های مجرایی ظریف و نامنظم‌اند؛ ذرات اینجا درشت و به‌هم‌پیوسته توصیف شده‌اند."
      }
    },
    "sources": [
      "https://edge.sitecorecloud.io/americancoldf5f-acrorgf92a-productioncb02-3650/media/ACR/Files/RADS/BI-RADS/BI-RADS-Summary-Form-Mammography.pdf"
    ],
    "learningGoalIds": [
      "calc08-characterise"
    ]
  },
  "milk-calcium": {
    "question": {
      "de": "Textfall: Eine Kalkgruppe wirkt in CC eher rundlich-unscharf; auf einer echten seitlichen Aufnahme entstehen scharf begrenzte halbmond-/teetassenartige Sedimente. Welche Erklärung passt?",
      "en": "Text vignette: A calcification group appears rounded and smudgy on CC, but sharply defined semilunar/teacup-like sediment appears on a true lateral view. Which explanation fits?",
      "fa": "سناریوی متنی: گروه کلسیفیکاسیون در نمای CC گرد و محو است، اما در نمای لترال واقعی رسوبات واضح هلالی/فنجانی دیده می‌شوند. کدام توضیح مناسب است؟"
    },
    "options": [
      {
        "de": "Grobe sekretorische Stäbchenverkalkungen",
        "en": "Large secretory rod-like calcifications",
        "fa": "کلسیفیکاسیون‌های درشت ترشحی میله‌ای"
      },
      {
        "de": "Layering durch sedimentierenden Kalk in Zysten",
        "en": "Layering from sedimented calcium in cysts",
        "fa": "لایه‌بندی ناشی از رسوب کلسیم در کیست‌ها"
      },
      {
        "de": "Feine lineare duktale Verkalkungen",
        "en": "Fine linear ductal calcifications",
        "fa": "کلسیفیکاسیون ظریف خطی مجرایی"
      },
      {
        "de": "Parallele vaskuläre Wandverkalkungen",
        "en": "Parallel vascular wall calcifications",
        "fa": "کلسیفیکاسیون موازی دیوارهٔ عروق"
      }
    ],
    "correct": "B",
    "difficulty": 2,
    "source": "https://edge.sitecorecloud.io/americancoldf5f-acrorgf92a-productioncb02-3650/media/ACR/Files/RADS/BI-RADS/BI-RADS-Summary-Form-Mammography.pdf",
    "explanation": {
      "de": "Der projektionsabhängige Formwechsel mit sedimentierendem Layering ist charakteristisch. Im aktuellen BI-RADS-Lexikon heißt der Deskriptor „Layering“. Die Formänderung wird geprüft, nicht nur das Vorhandensein einer Gruppe.",
      "en": "Projection-dependent shape change with sedimented layering is characteristic. The current BI-RADS descriptor is “layering”. Assess shape change rather than merely the presence of a group.",
      "fa": "تغییر شکل وابسته به نما همراه رسوب لایه‌ای شاخص است. اصطلاح توصیفی کنونی BI-RADS «لایه‌بندی» است. تغییر شکل بررسی می‌شود، نه صرفاً وجود گروه."
    },
    "wrong": {
      "A": {
        "de": "Sekretorische Stäbchen sind glatt und linear, nicht lageabhängige Sedimentspiegel in Zysten.",
        "en": "Secretory rods are smooth and linear rather than position-dependent sediment levels in cysts.",
        "fa": "میله‌های ترشحی صاف و خطی‌اند، نه سطوح رسوب وابسته به وضعیت در کیست‌ها."
      },
      "C": {
        "de": "Feine duktale Formen sind dünn und irregulär; der beschriebene Formwechsel spricht für Sediment.",
        "en": "Fine ductal forms are thin and irregular; the described shape change favours sediment.",
        "fa": "اشکال ظریف مجرایی نازک و نامنظم‌اند؛ تغییر شکل توصیف‌شده از رسوب حمایت می‌کند."
      },
      "D": {
        "de": "Gefäßkalk folgt den Wänden eines Gefäßes; das Layering in der Seitaufnahme bildet hier Sediment ab.",
        "en": "Vascular calcium follows vessel walls; layering on the lateral view here represents sediment.",
        "fa": "کلسیفیکاسیون عروقی دیوارهٔ رگ را دنبال می‌کند؛ لایه‌بندی در نمای لترال اینجا رسوب را نشان می‌دهد."
      }
    },
    "sources": [
      "https://edge.sitecorecloud.io/americancoldf5f-acrorgf92a-productioncb02-3650/media/ACR/Files/RADS/BI-RADS/BI-RADS-Summary-Form-Mammography.pdf"
    ],
    "learningGoalIds": [
      "calc08-characterise"
    ]
  },
  "rods-versus-linear": {
    "question": {
      "de": "Textfall: Eine Mammographie zeigt beidseits glatte, grobe stäbchenförmige Verkalkungen entlang retroareolärer Gänge. Welche morphologische Zuordnung passt am besten?",
      "en": "Text vignette: Mammography shows bilateral smooth, large rod-like calcifications along retroareolar ducts. Which morphological classification fits best?",
      "fa": "سناریوی متنی: ماموگرافی کلسیفیکاسیون‌های دوطرفهٔ صاف، درشت و میله‌ای در امتداد مجاری پشت آرئول نشان می‌دهد. کدام طبقه‌بندی مورفولوژیک مناسب‌تر است؟"
    },
    "options": [
      {
        "de": "Feine lineare/verzweigte suspekte Verkalkungen",
        "en": "Suspicious fine linear/branching calcifications",
        "fa": "کلسیفیکاسیون مشکوک ظریف خطی/شاخه‌دار"
      },
      {
        "de": "Grobe stäbchenförmige sekretorische Verkalkungen",
        "en": "Large rod-like secretory calcifications",
        "fa": "کلسیفیکاسیون درشت ترشحی میله‌ای"
      },
      {
        "de": "Vaskuläre Verkalkungen entlang paralleler Gefäßwände",
        "en": "Vascular calcifications along parallel vessel walls",
        "fa": "کلسیفیکاسیون عروقی در امتداد دیواره‌های موازی رگ"
      },
      {
        "de": "Layering durch sedimentierenden Kalk in kleinen Zysten",
        "en": "Layering from sedimented calcium in small cysts",
        "fa": "لایه‌بندی ناشی از رسوب کلسیم در کیست‌های کوچک"
      }
    ],
    "correct": "B",
    "difficulty": 2,
    "source": "https://edge.sitecorecloud.io/americancoldf5f-acrorgf92a-productioncb02-3650/media/ACR/Files/RADS/BI-RADS/BI-RADS-Summary-Form-Mammography.pdf",
    "explanation": {
      "de": "Das glatte grobe Stäbchenmuster passt zu large rod-like, typischerweise mit Duktusektasie verbunden. Dünne irreguläre fine-lineare Gangausgüsse sind ein anderer, suspekter Deskriptor.",
      "en": "The smooth large-rod pattern fits large rod-like calcifications, typically associated with duct ectasia. Thin irregular fine-linear ductal casts are a different, suspicious descriptor.",
      "fa": "الگوی صاف و میله‌ای درشت با کلسیفیکاسیون large rod-like تطابق دارد که معمولاً با اتساع مجاری همراه است. قالب‌های مجرایی ظریف و نامنظم خطی، اصطلاح توصیفی متفاوت و مشکوکی هستند."
    },
    "wrong": {
      "A": {
        "de": "Fine-lineare/verzweigte Formen sind dünn und irregulär; hier ist ein grobes glattes Muster beschrieben.",
        "en": "Fine linear/branching forms are thin and irregular; the pattern described here is large and smooth.",
        "fa": "اشکال ظریف خطی/شاخه‌دار نازک و نامنظم‌اند؛ الگوی اینجا درشت و صاف توصیف شده است."
      },
      "C": {
        "de": "Vaskulärer Kalk bildet parallele oder tubuläre Gefäßwände ab; die beschriebene Lage folgt den retroareolären Gängen.",
        "en": "Vascular calcium outlines parallel or tubular vessel walls; the stated location follows retroareolar ducts.",
        "fa": "کلسیفیکاسیون عروقی دیواره‌های موازی یا لوله‌ای رگ را مشخص می‌کند؛ محل اینجا مجاری پشت آرئول را دنبال می‌کند."
      },
      "D": {
        "de": "Layering wird durch projektionsabhängigen Formwechsel mit Sedimentation erkannt, der hier nicht beschrieben ist.",
        "en": "Layering is recognised by projection-dependent shape change with sedimentation, which is not described here.",
        "fa": "لایه‌بندی با تغییر شکل وابسته به نما و رسوب شناخته می‌شود که اینجا توصیف نشده است."
      }
    },
    "sources": [
      "https://edge.sitecorecloud.io/americancoldf5f-acrorgf92a-productioncb02-3650/media/ACR/Files/RADS/BI-RADS/BI-RADS-Summary-Form-Mammography.pdf"
    ],
    "learningGoalIds": [
      "calc08-characterise"
    ]
  },
  "amorphous-distribution": {
    "question": {
      "de": "Textfall: Eine neue Kalkgruppe bleibt auch in gezielten Vergrößerungsaufnahmen so klein und verwaschen, dass keine spezifische Partikelform bestimmbar ist. Welcher BI-RADS-Morphologiedeskriptor passt?",
      "en": "Text vignette: A new calcification group remains so small and hazy on targeted magnification that no specific particle shape can be determined. Which BI-RADS morphology descriptor fits?",
      "fa": "سناریوی متنی: گروه جدید کلسیفیکاسیون در نماهای بزرگ‌نمایی هدفمند نیز آن‌قدر کوچک و محو است که شکل مشخص ذرات تعیین نمی‌شود. کدام اصطلاح مورفولوژیک BI-RADS مناسب است؟"
    },
    "options": [
      {
        "de": "Fein pleomorph",
        "en": "Fine pleomorphic",
        "fa": "پلئومورفیک ظریف"
      },
      {
        "de": "Grob heterogen",
        "en": "Coarse heterogeneous",
        "fa": "درشت ناهمگون"
      },
      {
        "de": "Amorph",
        "en": "Amorphous",
        "fa": "آمورف"
      },
      {
        "de": "Fein linear/verzweigt",
        "en": "Fine linear/branching",
        "fa": "ظریف خطی/شاخه‌دار"
      }
    ],
    "correct": "C",
    "difficulty": 1,
    "source": "https://edge.sitecorecloud.io/americancoldf5f-acrorgf92a-productioncb02-3650/media/ACR/Files/RADS/BI-RADS/BI-RADS-Summary-Form-Mammography.pdf",
    "explanation": {
      "de": "Amorph bezeichnet Partikel, die so klein oder formlos sind, dass keine genauere Form bestimmbar ist. Es ist ein suspekter Morphologiedeskriptor; die Gesamtbewertung verlangt zusätzlich Verteilung, Vergleich und Kontext.",
      "en": "Amorphous describes particles too small or formless for a more specific shape. It is a suspicious morphology descriptor; overall assessment also requires distribution, comparison and context.",
      "fa": "آمورف ذراتی را توصیف می‌کند که برای تعیین شکل مشخص‌تر، بیش از حد کوچک یا بی‌شکل‌اند. اصطلاح مورفولوژیک مشکوک است؛ ارزیابی کلی به توزیع، مقایسه و زمینه نیز نیاز دارد."
    },
    "wrong": {
      "A": {
        "de": "Fein pleomorphe Partikel besitzen erkennbare unterschiedliche Formen; gerade das ist hier nicht bestimmbar.",
        "en": "Fine pleomorphic particles have discernible variable shapes, which cannot be determined here.",
        "fa": "ذرات پلئومورفیک ظریف شکل‌های متفاوت قابل‌تشخیص دارند که اینجا تعیین نمی‌شوند."
      },
      "B": {
        "de": "Grob heterogene Verkalkungen sind auffällige irreguläre Partikel mit bestimmbarer Kontur; die hier fehlende Form passt besser zu amorph.",
        "en": "Coarse heterogeneous calcifications are conspicuous irregular particles with discernible contours; the indeterminate shape here better fits amorphous.",
        "fa": "کلسیفیکاسیون درشت ناهمگون ذرات نامنظم و واضح با حاشیهٔ قابل‌تشخیص است؛ شکل نامشخص اینجا بیشتر با آمورف تطابق دارد."
      },
      "D": {
        "de": "Für fein linear/verzweigt müssen dünne irreguläre lineare Formen erkennbar sein.",
        "en": "Fine linear/branching requires recognisable thin irregular linear forms.",
        "fa": "برای توصیف ظریف خطی/شاخه‌دار باید اشکال خطی نازک و نامنظم قابل‌شناسایی باشند."
      }
    },
    "sources": [
      "https://edge.sitecorecloud.io/americancoldf5f-acrorgf92a-productioncb02-3650/media/ACR/Files/RADS/BI-RADS/BI-RADS-Summary-Form-Mammography.pdf"
    ],
    "learningGoalIds": [
      "calc08-characterise"
    ]
  },
  "pleomorphic-segmental": {
    "question": {
      "de": "Textfall: Feine irreguläre Verkalkungen unterschiedlicher Form und Größe liegen in einem dreieckigen Gebiet mit Spitze zur Mamille. Welche kombinierte Beschreibung ist am präzisesten?",
      "en": "Text vignette: Fine irregular calcifications of varying shapes and sizes occupy a triangular region with its apex towards the nipple. Which combined description is most precise?",
      "fa": "سناریوی متنی: کلسیفیکاسیون‌های ظریف و نامنظم با شکل‌ها و اندازه‌های متفاوت در ناحیه‌ای مثلثی با رأس به‌سوی نوک پستان قرار دارند. کدام توصیف ترکیبی دقیق‌تر است؟"
    },
    "options": [
      {
        "de": "Fein pleomorph, regional verteilt",
        "en": "Fine pleomorphic, regional distribution",
        "fa": "پلئومورفیک ظریف با توزیع ناحیه‌ای"
      },
      {
        "de": "Grob heterogen, segmental verteilt",
        "en": "Coarse heterogeneous, segmental distribution",
        "fa": "درشت ناهمگون با توزیع سگمنتال"
      },
      {
        "de": "Fein pleomorph, segmental verteilt",
        "en": "Fine pleomorphic, segmental distribution",
        "fa": "پلئومورفیک ظریف با توزیع سگمنتال"
      },
      {
        "de": "Amorph, diffus verteilt",
        "en": "Amorphous, diffuse distribution",
        "fa": "آمورف با توزیع منتشر"
      }
    ],
    "correct": "C",
    "difficulty": 2,
    "source": "https://edge.sitecorecloud.io/americancoldf5f-acrorgf92a-productioncb02-3650/media/ACR/Files/RADS/BI-RADS/BI-RADS-Summary-Form-Mammography.pdf",
    "explanation": {
      "de": "Die erkennbaren unterschiedlichen feinen Formen sind pleomorph; das zur Mamille gerichtete Dreieck entspricht segmentaler Gangorientierung. Morphologie und Verteilung werden getrennt benannt und gemeinsam bewertet.",
      "en": "Discernible variable fine shapes are pleomorphic; the nipple-directed triangle corresponds to segmental ductal orientation. Name morphology and distribution separately and assess them together.",
      "fa": "اشکال ظریف و متفاوت قابل‌تشخیص، پلئومورفیک‌اند؛ مثلث رو به نوک پستان با جهت‌گیری سگمنتال مجرایی تطابق دارد. مورفولوژی و توزیع جداگانه نام‌گذاری و با هم ارزیابی می‌شوند."
    },
    "wrong": {
      "A": {
        "de": "Die Morphologie passt, aber regional beschreibt ein größeres Areal ohne erkennbare Gangorientierung. Hier ist die mamillenwärts gerichtete Dreiecksform angegeben.",
        "en": "The morphology fits, but regional describes a larger area without ductal orientation. A nipple-directed triangle is specified here.",
        "fa": "مورفولوژی مطابق است، ولی ناحیه‌ای محدودهٔ بزرگ‌تر بدون جهت‌گیری مجرایی را توصیف می‌کند. اینجا شکل مثلثی رو به نوک پستان ذکر شده است."
      },
      "B": {
        "de": "Die segmentale Verteilung passt. Die beschriebenen feinen variablen Partikelformen entsprechen jedoch fein pleomorph und nicht grob heterogen.",
        "en": "Segmental distribution fits, but the fine variable particle shapes described are fine pleomorphic rather than coarse heterogeneous.",
        "fa": "توزیع سگمنتال مطابق است؛ ولی اشکال ظریف و متغیر ذرات، پلئومورفیک ظریف‌اند نه درشت ناهمگون."
      },
      "D": {
        "de": "Die Partikelformen sind erkennbar, also nicht amorph; die gerichtete Dreiecksverteilung ist nicht diffus.",
        "en": "Particle shapes are discernible, hence not amorphous; the directed triangular distribution is not diffuse.",
        "fa": "شکل ذرات قابل‌تشخیص است، پس آمورف نیست؛ توزیع مثلثی جهت‌دار نیز منتشر نیست."
      }
    },
    "sources": [
      "https://edge.sitecorecloud.io/americancoldf5f-acrorgf92a-productioncb02-3650/media/ACR/Files/RADS/BI-RADS/BI-RADS-Summary-Form-Mammography.pdf"
    ],
    "learningGoalIds": [
      "calc08-distribution"
    ]
  },
  "highest-suspicion": {
    "question": {
      "de": "Textfall: Bei vier neu diagnostisch abgeklärten Kalkbefunden unterscheiden sich Form und Verteilung. Welche Kombination ist das stärkste duktale Verdachtsmuster unter diesen Befunden?",
      "en": "Text vignette: Four newly investigated calcification findings differ in morphology and distribution. Which combination is the strongest ductal suspicion pattern among these findings?",
      "fa": "سناریوی متنی: چهار یافتهٔ جدید کلسیفیکاسیون پس از بررسی تشخیصی، از نظر مورفولوژی و توزیع متفاوت‌اند. کدام ترکیب در میان این یافته‌ها قوی‌ترین الگوی مشکوک مجرایی است؟"
    },
    "options": [
      {
        "de": "Fein linear/verzweigt, segmental",
        "en": "Fine linear/branching, segmental",
        "fa": "ظریف خطی/شاخه‌دار، سگمنتال"
      },
      {
        "de": "Fein pleomorph, gruppiert",
        "en": "Fine pleomorphic, grouped",
        "fa": "پلئومورفیک ظریف، گروهی"
      },
      {
        "de": "Amorph, gruppiert",
        "en": "Amorphous, grouped",
        "fa": "آمورف، گروهی"
      },
      {
        "de": "Grob heterogen, regional",
        "en": "Coarse heterogeneous, regional",
        "fa": "درشت ناهمگون، ناحیه‌ای"
      }
    ],
    "correct": "A",
    "difficulty": 2,
    "source": "https://edge.sitecorecloud.io/americancoldf5f-acrorgf92a-productioncb02-3650/media/ACR/Files/RADS/BI-RADS/BI-RADS-Summary-Form-Mammography.pdf",
    "explanation": {
      "de": "Dünne irreguläre verzweigte Partikel mit segmentaler Gangorientierung ergeben hier das stärkste duktale Verdachtsmuster. Auch die anderen aufgeführten Morphologien sind suspekt; aus dieser Rangfrage folgt weder eine Histologie noch eine feste individuelle Prozentzahl.",
      "en": "Thin irregular branching particles with segmental ductal orientation form the strongest ductal suspicion pattern here. The other listed morphologies are also suspicious; this comparison establishes neither histology nor a fixed individual probability.",
      "fa": "ذرات ظریف و نامنظم شاخه‌دار با جهت‌گیری سگمنتال مجرایی اینجا قوی‌ترین الگوی مشکوک مجرایی را می‌سازند. مورفولوژی‌های دیگر فهرست‌شده نیز مشکوک‌اند؛ این مقایسه نه بافت‌شناسی و نه درصد ثابت فردی را تعیین می‌کند."
    },
    "wrong": {
      "B": {
        "de": "Fein pleomorph ist suspekt und abklärungsbedürftig. Die Kombination aus feinen verzweigten Gangausgüssen und segmentaler Orientierung ist hier dennoch stärker duktal verdächtig.",
        "en": "Fine pleomorphic is suspicious and needs work-up. Fine branching ductal casts with segmental orientation nevertheless create the stronger ductal suspicion pattern here.",
        "fa": "پلئومورفیک ظریف مشکوک و نیازمند بررسی است؛ بااین‌حال قالب‌های ظریف شاخه‌دار مجرایی با جهت‌گیری سگمنتال اینجا الگوی مشکوک مجرایی قوی‌تری می‌سازند."
      },
      "C": {
        "de": "Gruppierter amorpher Kalk ist nicht automatisch benign, zeigt aber keinen so klaren irregulären Gangausguss wie Option A.",
        "en": "Grouped amorphous calcifications are not automatically benign, but do not show the same clear irregular duct-cast morphology as option A.",
        "fa": "کلسیفیکاسیون آمورف گروهی خودبه‌خود خوش‌خیم نیست، ولی مورفولوژی واضح قالب مجرایی نامنظم گزینهٔ A را نشان نمی‌دهد."
      },
      "D": {
        "de": "Grob heterogen ist ebenfalls ein suspekter Deskriptor. Die regionale Verteilung liefert hier jedoch nicht die segmentale Gangarchitektur mit feinen Verzweigungen.",
        "en": "Coarse heterogeneous is also a suspicious descriptor, but regional distribution here lacks the segmental ductal architecture with fine branching.",
        "fa": "درشت ناهمگون نیز اصطلاح مشکوکی است، ولی توزیع ناحیه‌ای اینجا معماری سگمنتال مجرایی با شاخه‌های ظریف را ندارد."
      }
    },
    "sources": [
      "https://edge.sitecorecloud.io/americancoldf5f-acrorgf92a-productioncb02-3650/media/ACR/Files/RADS/BI-RADS/BI-RADS-Summary-Form-Mammography.pdf",
      "https://pmc.ncbi.nlm.nih.gov/articles/PMC6923207/"
    ],
    "learningGoalIds": [
      "calc08-distribution"
    ]
  },
  "evolution-context": {
    "question": {
      "de": "Textfall: Voraufnahmen derselben Technik liegen vor. Welche Veränderung eines zuvor runden Kalkbefunds erhöht den Abklärungsbedarf am stärksten?",
      "en": "Text vignette: Prior images acquired with the same technique are available. Which change in a previously round calcification finding most increases the need for further assessment?",
      "fa": "سناریوی متنی: تصاویر قبلی با تکنیک یکسان موجودند. کدام تغییر در یافتهٔ کلسیفیکاسیون قبلاً گرد، بیش از همه نیاز به بررسی بیشتر را افزایش می‌دهد؟"
    },
    "options": [
      {
        "de": "Zunehmende grobe konfluierende Verkalkung in einer bekannten umschriebenen Fibroadenommasse",
        "en": "Increasing coarse confluent calcification in a known circumscribed fibroadenoma mass",
        "fa": "افزایش کلسیفیکاسیون درشت و پیوسته در تودهٔ فیبروآدنوم شناخته‌شده با حدود مشخص"
      },
      {
        "de": "Zunahme irregulärer pleomorpher Partikel mit neu erkennbarer duktaler Anordnung",
        "en": "Increasing irregular pleomorphic particles with newly apparent ductal arrangement",
        "fa": "افزایش ذرات نامنظم پلئومورفیک با آرایش مجرایی تازه‌قابل‌تشخیص"
      },
      {
        "de": "Nachweis sedimentierender Formen in einer ergänzten echten Seitaufnahme",
        "en": "Demonstration of sedimenting shapes on an additional true lateral view",
        "fa": "نمایان‌شدن اشکال رسوبی در نمای لترال واقعی تکمیلی"
      },
      {
        "de": "Bessere Abgrenzbarkeit paralleler Gefäßwandverkalkungen ohne Änderung ihrer Verteilung",
        "en": "Clearer depiction of parallel vascular wall calcifications without changed distribution",
        "fa": "وضوح بیشتر کلسیفیکاسیون موازی دیوارهٔ عروق بدون تغییر توزیع"
      }
    ],
    "correct": "B",
    "difficulty": 2,
    "source": "https://edge.sitecorecloud.io/americancoldf5f-acrorgf92a-productioncb02-3650/media/ACR/Files/RADS/BI-RADS/BI-RADS-Summary-Form-Mammography.pdf",
    "explanation": {
      "de": "Die Entwicklung irregulärer Partikel mit duktaler Architektur ist eine relevante morphologische Progression. Eine Zunahme allein kann auch bei benignem Umbau vorkommen; entscheidend ist, was sich verändert.",
      "en": "Development of irregular particles with ductal architecture is relevant morphological progression. Increase alone can also occur during benign evolution; the nature of the change matters.",
      "fa": "ایجاد ذرات نامنظم با معماری مجرایی پیشرفت مورفولوژیک مهمی است. افزایش به‌تنهایی ممکن است در تغییرات خوش‌خیم هم رخ دهد؛ ماهیت تغییر اهمیت دارد."
    },
    "wrong": {
      "A": {
        "de": "Grobe konfluierende Reifung eines bekannten Fibroadenoms passt zu Involution und ist eine andere Entwicklung als neu suspekte Partikelform.",
        "en": "Coarse confluent maturation of a known fibroadenoma fits involution rather than newly suspicious particle morphology.",
        "fa": "بلوغ درشت و پیوستهٔ فیبروآدنوم شناخته‌شده با پسرفت تطابق دارد، نه مورفولوژی تازه‌مشکوک ذرات."
      },
      "C": {
        "de": "Nachgewiesenes lageabhängiges Sediment erklärt ein Layering-Muster; eine neue Projektion ist nicht gleich biologische Progression.",
        "en": "Demonstrated position-dependent sediment explains layering; an additional projection is not biological progression.",
        "fa": "رسوب وابسته به وضعیت الگوی لایه‌بندی را توضیح می‌دهد؛ نمای اضافه به‌معنای پیشرفت زیستی نیست."
      },
      "D": {
        "de": "Bessere Sichtbarkeit eines unveränderten typischen Gefäßmusters ist keine neue duktale Formveränderung.",
        "en": "Clearer visibility of an unchanged typical vascular pattern is not a new ductal morphological change.",
        "fa": "وضوح بیشتر الگوی عروقی تیپیکِ بدون تغییر، تغییر مورفولوژیک مجرایی جدید نیست."
      }
    },
    "sources": [
      "https://edge.sitecorecloud.io/americancoldf5f-acrorgf92a-productioncb02-3650/media/ACR/Files/RADS/BI-RADS/BI-RADS-Summary-Form-Mammography.pdf"
    ],
    "learningGoalIds": [
      "calc08-evolution"
    ]
  },
  "no-correlate": {
    "question": {
      "de": "Textfall: Neue segmentale fein pleomorphe Verkalkungen bleiben nach diagnostischen Mammographieaufnahmen suspekt. Es gibt kein Ultraschallkorrelat und kein MRT-Enhancement. Welches Vorgehen ist am besten begründet?",
      "en": "Text vignette: New segmental fine pleomorphic calcifications remain suspicious after diagnostic mammographic views. There is no ultrasound correlate or MRI enhancement. Which approach is best justified?",
      "fa": "سناریوی متنی: کلسیفیکاسیون‌های جدید پلئومورفیک ظریف و سگمنتال پس از نماهای تشخیصی ماموگرافی همچنان مشکوک‌اند. تطابق سونوگرافیک یا افزایش سیگنال پس از تزریق در MRI وجود ندارد. کدام اقدام موجه‌تر است؟"
    },
    "options": [
      {
        "de": "Mammographisch gezielte Gewebeentnahme des sichtbaren Kalkbefunds planen",
        "en": "Plan tissue sampling targeting the mammographically visible calcifications",
        "fa": "نمونه‌برداری بافتی هدفمند از کلسیفیکاسیون قابل‌مشاهدهٔ ماموگرافیک برنامه‌ریزی شود"
      },
      {
        "de": "MRT-gesteuerte Vakuumbiopsie der korrespondierenden Brustregion planen",
        "en": "Plan MRI-guided vacuum biopsy of the corresponding breast region",
        "fa": "بیوپسی وکیوم تحت هدایت MRI از ناحیهٔ متناظر پستان برنامه‌ریزی شود"
      },
      {
        "de": "Sonographisch gesteuerte Stanzbiopsie der topographisch zugeordneten Region planen",
        "en": "Plan ultrasound-guided core biopsy of the topographically corresponding region",
        "fa": "بیوپسی سوزنی تحت هدایت سونوگرافی از ناحیهٔ منطبق از نظر محل برنامه‌ریزی شود"
      },
      {
        "de": "Wegen der negativen Zusatzverfahren zunächst sechsmonatige Bildkontrolle wählen",
        "en": "Choose initial six-month imaging surveillance because adjunct imaging is negative",
        "fa": "به‌دلیل منفی‌بودن روش‌های تکمیلی ابتدا پیگیری تصویربرداری شش‌ماهه انتخاب شود"
      }
    ],
    "correct": "A",
    "difficulty": 2,
    "source": "https://edge.sitecorecloud.io/americancoldf5f-acrorgf92a-productioncb02-3650/media/ACR/Files/RADS/BI-RADS/BI-RADS-Summary-Form-Mammography.pdf",
    "explanation": {
      "de": "Die suspekte mammographische Morphologie bleibt maßgeblich. Negative MRT kann Malignität nicht vollständig ausschließen; in der retrospektiven Originalkohorte gab es auch falsch negative Karzinome/DCIS. Die Entnahme muss auf den tatsächlich sichtbaren Befund zielen.",
      "en": "Suspicious mammographic morphology remains decisive. Negative MRI cannot completely exclude malignancy; the original retrospective cohort included false-negative cancers/DCIS. Sampling must target the actually visible finding.",
      "fa": "مورفولوژی مشکوک ماموگرافیک همچنان تعیین‌کننده است. MRI منفی بدخیمی را کاملاً رد نمی‌کند؛ در کوهورت اصلی گذشته‌نگر، کارسینوم/DCIS منفی کاذب نیز وجود داشت. نمونه‌برداری باید یافتهٔ واقعاً قابل‌مشاهده را هدف بگیرد."
    },
    "wrong": {
      "B": {
        "de": "Ohne darstellbares MRT-Ziel lässt sich der mammographische Kalkbefund so nicht zuverlässig gezielt entnehmen.",
        "en": "Without a visible MRI target, this does not reliably target the mammographic calcification finding.",
        "fa": "بدون هدف قابل‌مشاهده در MRI، این روش کلسیفیکاسیون ماموگرافیک را با اطمینان هدف نمی‌گیرد."
      },
      "C": {
        "de": "Eine bloß ungefähre Region ersetzt keine gesicherte sonographische Korrelation zum Kalkziel.",
        "en": "An approximate region does not replace confirmed sonographic correlation with the calcification target.",
        "fa": "محدودهٔ تقریبی جای تطابق سونوگرافیک تأییدشده با هدف کلسیفیکاسیون را نمی‌گیرد."
      },
      "D": {
        "de": "Negative Zusatzverfahren machen aus einer persistierend suspekten Kalkmorphologie keine wahrscheinlich benigne Verlaufskonstellation.",
        "en": "Negative adjunct imaging does not turn persistently suspicious calcification morphology into a probably benign surveillance finding.",
        "fa": "روش تکمیلی منفی، مورفولوژی همچنان مشکوک کلسیفیکاسیون را به یافتهٔ احتمالاً خوش‌خیم مناسب پیگیری تبدیل نمی‌کند."
      }
    },
    "sources": [
      "https://edge.sitecorecloud.io/americancoldf5f-acrorgf92a-productioncb02-3650/media/ACR/Files/RADS/BI-RADS/BI-RADS-Summary-Form-Mammography.pdf",
      "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0188679",
      "https://www.gov.uk/government/publications/breast-screening-clinical-guidelines-for-screening-management/clinical-guidance-for-breast-cancer-screening-assessment"
    ],
    "learningGoalIds": [
      "calc08-management"
    ]
  },
  "round-group-followup": {
    "question": {
      "de": "Textfall: Bei einer asymptomatischen Frau ohne Brustkrebsanamnese ist eine einzelne Gruppe runder Partikel erstmals sichtbar. Die vollständige diagnostische Abklärung einschließlich Vergrößerungsaufnahmen zeigt keine suspekten Merkmale; das Assessment lautet wahrscheinlich benign. Welche Empfehlung passt?",
      "en": "Text vignette: In an asymptomatic woman without a personal breast cancer history, a solitary group of round particles is first seen. Complete diagnostic work-up including magnification shows no suspicious features; the assessment is probably benign. Which recommendation fits?",
      "fa": "سناریوی متنی: در زن بدون علامت و فاقد سابقهٔ سرطان پستان، یک گروه منفرد ذرات گرد برای نخستین بار دیده می‌شود. بررسی تشخیصی کامل شامل بزرگ‌نمایی، ویژگی مشکوکی ندارد و ارزیابی نهایی احتمالاً خوش‌خیم است. کدام توصیه مناسب است؟"
    },
    "options": [
      {
        "de": "Rückkehr zum nächsten regulären Screeningintervall empfehlen",
        "en": "Recommend return to the next routine screening interval",
        "fa": "بازگشت به نوبت بعدی غربالگری معمول توصیه شود"
      },
      {
        "de": "Kurzfristige mammographische Kontrolle nach sechs Monaten",
        "en": "Short-interval mammographic follow-up at six months",
        "fa": "پیگیری کوتاه‌مدت ماموگرافیک پس از شش ماه"
      },
      {
        "de": "MRT als Ersatz für die erste mammographische Verlaufskontrolle",
        "en": "MRI instead of the initial mammographic follow-up",
        "fa": "MRI به‌جای نخستین پیگیری ماموگرافیک"
      },
      {
        "de": "Unmittelbare stereotaktische Gewebeentnahme empfehlen",
        "en": "Recommend immediate stereotactic tissue sampling",
        "fa": "نمونه‌برداری فوری بافتی با هدایت استریوتاکتیک توصیه شود"
      }
    ],
    "correct": "B",
    "difficulty": 2,
    "source": "https://edge.sitecorecloud.io/americancoldf5f-acrorgf92a-productioncb02-3650/media/ACR/Files/RADS/BI-RADS/BI-RADS-Summary-Form-Mammography.pdf",
    "explanation": {
      "de": "Für ein nach vollständiger Abklärung als wahrscheinlich benign bewertetes mammographisches Muster passt BI-RADS 3 mit erster Sechsmonatskontrolle. Das ist keine Regel für amorphe/suspekte Gruppen oder eine noch unvollständige Screeningabklärung.",
      "en": "A mammographic finding assessed as probably benign after complete work-up fits BI-RADS 3 with initial six-month follow-up. This is not a rule for amorphous/suspicious groups or incomplete screening work-up.",
      "fa": "یافتهٔ ماموگرافیک که پس از بررسی کامل احتمالاً خوش‌خیم ارزیابی شده، با BI-RADS 3 و نخستین پیگیری شش‌ماهه تطابق دارد. این قاعده برای گروه آمورف/مشکوک یا بررسی ناقص غربالگری نیست."
    },
    "wrong": {
      "A": {
        "de": "Wahrscheinlich benign bedeutet nicht abschließend benign. Der kurzfristige Vergleich gehört zu dieser Beurteilung.",
        "en": "Probably benign does not mean definitively benign; short-interval comparison belongs to this assessment.",
        "fa": "احتمالاً خوش‌خیم به‌معنای خوش‌خیم قطعی نیست؛ مقایسهٔ کوتاه‌مدت بخشی از این ارزیابی است."
      },
      "C": {
        "de": "Die festgelegte mammographische Verlaufskontrolle wird nicht durch eine negative MRT ersetzt.",
        "en": "The planned mammographic surveillance is not replaced by negative MRI.",
        "fa": "پیگیری ماموگرافیک تعیین‌شده با MRI منفی جایگزین نمی‌شود."
      },
      "D": {
        "de": "Erstmalige Sichtbarkeit allein ist nach der beschriebenen vollständigen, wahrscheinlich benignen Abklärung kein zwingender Biopsiegrund.",
        "en": "First visibility alone does not mandate biopsy after the complete probably benign work-up described.",
        "fa": "نخستین مشاهده به‌تنهایی پس از بررسی کامل و احتمالاً خوش‌خیمِ توصیف‌شده الزام بیوپسی ایجاد نمی‌کند."
      }
    },
    "sources": [
      "https://edge.sitecorecloud.io/americancoldf5f-acrorgf92a-productioncb02-3650/media/ACR/Files/RADS/BI-RADS/BI-RADS-Summary-Form-Mammography.pdf",
      "https://doi.org/10.1148/radiol.2020192641"
    ],
    "learningGoalIds": [
      "calc08-management"
    ]
  },
  "stable-suspicious": {
    "question": {
      "de": "Textfall: Eine bisher nicht biopsierte Gruppe fein pleomorpher segmentaler Verkalkungen ist auf technisch vergleichbaren Bildern seit zwei Jahren stabil. Die aktuelle diagnostische Beurteilung bleibt suspekt. Was ist am besten begründet?",
      "en": "Text vignette: An unbiopsied group of fine pleomorphic segmental calcifications has been stable for two years on technically comparable images. Current diagnostic assessment remains suspicious. What is best justified?",
      "fa": "سناریوی متنی: گروه بیوپسی‌نشدهٔ کلسیفیکاسیون پلئومورفیک ظریف و سگمنتال در تصاویر فنی قابل‌مقایسه دو سال ثابت بوده است. ارزیابی تشخیصی فعلی همچنان مشکوک است. کدام اقدام موجه‌تر است؟"
    },
    "options": [
      {
        "de": "Auf Routinekontrolle umstellen, weil der zweijährige Vergleich abgeschlossen ist",
        "en": "Return to routine screening because two-year comparison is complete",
        "fa": "به پیگیری معمول بازگردید، چون مقایسهٔ دوساله کامل شده است"
      },
      {
        "de": "Kontrastverstärkte MRT vor Festlegung der weiteren Maßnahmen veranlassen",
        "en": "Arrange contrast-enhanced MRI before deciding further management",
        "fa": "پیش از تعیین اقدام بعدی، MRI با تزریق درخواست شود"
      },
      {
        "de": "Weitere mammographische Kontrolle nach sechs Monaten empfehlen",
        "en": "Recommend further mammographic follow-up in six months",
        "fa": "پیگیری مجدد ماموگرافیک پس از شش ماه توصیه شود"
      },
      {
        "de": "Die Gewebeabklärung wegen fortbestehender suspekter Morphologie empfehlen",
        "en": "Recommend tissue diagnosis because suspicious morphology persists",
        "fa": "به‌دلیل تداوم مورفولوژی مشکوک، تشخیص بافتی توصیه شود"
      }
    ],
    "correct": "D",
    "difficulty": 2,
    "source": "https://edge.sitecorecloud.io/americancoldf5f-acrorgf92a-productioncb02-3650/media/ACR/Files/RADS/BI-RADS/BI-RADS-Summary-Form-Mammography.pdf",
    "explanation": {
      "de": "Zweijährige Stabilität macht persistierend suspekte Verkalkungen nicht automatisch benign. Die Originalserie enthielt malignen Kalk, der über längere Zeit unverändert erschien; daraus wird hier keine individuelle Risikozahl abgeleitet.",
      "en": "Two-year stability does not automatically make persistently suspicious calcifications benign. The original series included malignant calcifications unchanged for extended periods; no individual probability is inferred here.",
      "fa": "ثبات دوساله کلسیفیکاسیون همچنان مشکوک را خودکار خوش‌خیم نمی‌کند. مجموعهٔ اصلی شامل کلسیفیکاسیون بدخیم با ظاهر ثابت در مدت طولانی بود؛ اینجا درصد خطر فردی از آن استخراج نمی‌شود."
    },
    "wrong": {
      "A": {
        "de": "Die Beendigung einer wahrscheinlich benignen Überwachung ist nicht auf einen fortbestehend suspekten, unbiopsierten Befund übertragbar.",
        "en": "Completion of probably benign surveillance cannot be transferred to a persistently suspicious unbiopsied finding.",
        "fa": "پایان پایش یافتهٔ احتمالاً خوش‌خیم قابل‌تعمیم به یافتهٔ همچنان مشکوک و بیوپسی‌نشده نیست."
      },
      "B": {
        "de": "Negative MRT schließt insbesondere DCIS nicht vollständig aus und hebt den morphologischen Verdacht nicht automatisch auf.",
        "en": "Negative MRI does not completely exclude DCIS and does not automatically negate morphological suspicion.",
        "fa": "MRI منفی، به‌ویژه DCIS را کاملاً رد نمی‌کند و ظن مورفولوژیک را خودکار از بین نمی‌برد."
      },
      "C": {
        "de": "Weiterbeobachtung ersetzt bei diesem weiterhin suspekten Assessment nicht die empfohlene Gewebediagnostik.",
        "en": "Continued surveillance does not replace recommended tissue diagnosis for this persistently suspicious assessment.",
        "fa": "ادامهٔ مشاهده در این ارزیابی همچنان مشکوک جای تشخیص بافتی توصیه‌شده را نمی‌گیرد."
      }
    },
    "sources": [
      "https://edge.sitecorecloud.io/americancoldf5f-acrorgf92a-productioncb02-3650/media/ACR/Files/RADS/BI-RADS/BI-RADS-Summary-Form-Mammography.pdf",
      "https://pubmed.ncbi.nlm.nih.gov/8208928/"
    ],
    "learningGoalIds": [
      "calc08-evolution"
    ]
  },
  "regional-definition": {
    "question": {
      "de": "Textfall: Locker verstreute Verkalkungen in einem 3-cm-Areal ohne erkennbare duktale Orientierung: Welcher Verteilungsdeskriptor passt?",
      "en": "Text vignette: Loosely scattered calcifications over a 3-cm area without recognisable ductal orientation: which distribution descriptor fits?",
      "fa": "سناریوی متنی: کلسیفیکاسیون‌های پراکنده در ناحیه‌ای ۳ سانتی‌متری بدون جهت‌گیری مشخص داکتال: کدام توصیف توزیع مناسب است؟"
    },
    "options": [
      {
        "de": "Regional",
        "en": "Regional",
        "fa": "ناحیه‌ای"
      },
      {
        "de": "Gruppiert",
        "en": "Grouped",
        "fa": "گروهی"
      },
      {
        "de": "Linear",
        "en": "Linear",
        "fa": "خطی"
      },
      {
        "de": "Segmental",
        "en": "Segmental",
        "fa": "سگمنتال"
      }
    ],
    "correct": "A",
    "difficulty": 1,
    "source": "https://edge.sitecorecloud.io/americancoldf5f-acrorgf92a-productioncb02-3650/media/ACR/Files/RADS/BI-RADS/BI-RADS-Summary-Form-Mammography.pdf",
    "explanation": {
      "de": "Regional beschreibt ein größeres Areal über 2 cm ohne eindeutige Gangorientierung.",
      "en": "Regional describes a larger area exceeding 2 cm without a clear ductal orientation.",
      "fa": "ناحیه‌ای به محدوده بزرگ‌تر از ۲ سانتی‌متر بدون جهت‌گیری مشخص مجرایی گفته می‌شود."
    },
    "wrong": {
      "B": {
        "de": "Gruppiert: mindestens fünf Partikel in 1 cm oder eine größere Zahl innerhalb von 2 cm.",
        "en": "Grouped: at least five particles in 1 cm or a larger number within 2 cm.",
        "fa": "گروهی: حداقل پنج ذره در ۱ سانتی‌متر یا تعداد بیشتر در محدوده ۲ سانتی‌متر."
      },
      "C": {
        "de": "Linear setzt eine Anordnung entlang einer Linie voraus.",
        "en": "Linear requires an arrangement along a line.",
        "fa": "خطی به آرایش در امتداد یک خط نیاز دارد."
      },
      "D": {
        "de": "Segmental folgt einem Gangsystem, typischerweise keilförmig zur Mamille.",
        "en": "Segmental follows a ductal system, typically wedge-shaped towards the nipple.",
        "fa": "سگمنتال از سیستم مجاری پیروی می‌کند و معمولاً گوه‌ای با رأس رو به نوک پستان است."
      }
    },
    "sources": [
      "https://edge.sitecorecloud.io/americancoldf5f-acrorgf92a-productioncb02-3650/media/ACR/Files/RADS/BI-RADS/BI-RADS-Summary-Form-Mammography.pdf"
    ],
    "learningGoalIds": [
      "calc08-distribution"
    ]
  },
  "segmental-apex": {
    "question": {
      "de": "Textfall: Auf den diagnostischen Aufnahmen folgen Verkalkungen einem verzweigten Gangsystem in einem dreieckigen Areal mit Spitze zur Mamille. Welcher Verteilungsdeskriptor gehört in den Befund?",
      "en": "Text vignette: On diagnostic views, calcifications follow a branching ductal system in a triangular area with its apex towards the nipple. Which distribution descriptor belongs in the report?",
      "fa": "سناریوی متنی: در نماهای تشخیصی، کلسیفیکاسیون‌ها از سیستم مجرایی شاخه‌دار در ناحیه‌ای مثلثی با رأس رو به نوک پستان پیروی می‌کنند. کدام توصیف توزیع در گزارش مناسب است؟"
    },
    "options": [
      {
        "de": "Regional",
        "en": "Regional",
        "fa": "ناحیه‌ای"
      },
      {
        "de": "Gruppiert",
        "en": "Grouped",
        "fa": "گروهی"
      },
      {
        "de": "Segmental",
        "en": "Segmental",
        "fa": "سگمنتال"
      },
      {
        "de": "Linear",
        "en": "Linear",
        "fa": "خطی"
      }
    ],
    "correct": "C",
    "difficulty": 1,
    "source": "https://edge.sitecorecloud.io/americancoldf5f-acrorgf92a-productioncb02-3650/media/ACR/Files/RADS/BI-RADS/BI-RADS-Summary-Form-Mammography.pdf",
    "explanation": {
      "de": "Das dreieckige Areal entlang eines Ganges mit seinen Ästen entspricht einer segmentalen Verteilung. Dies beschreibt die räumliche Anordnung; die Partikelmorphologie wird separat benannt.",
      "en": "A triangular area following a duct and its branches corresponds to segmental distribution. This describes spatial arrangement; particle morphology is reported separately.",
      "fa": "ناحیهٔ مثلثی در امتداد مجرا و شاخه‌های آن با توزیع سگمنتال تطابق دارد. این اصطلاح آرایش فضایی را توصیف می‌کند؛ مورفولوژی ذرات جداگانه ذکر می‌شود."
    },
    "wrong": {
      "A": {
        "de": "Regional bezeichnet ein größeres Areal ohne die hier erkennbare duktale Orientierung.",
        "en": "Regional describes a larger area without the ductal orientation demonstrated here.",
        "fa": "ناحیه‌ای محدوده‌ای بزرگ‌تر بدون جهت‌گیری مجراییِ مشخص در این سناریو است."
      },
      "B": {
        "de": "Gruppiert beschreibt die räumliche Häufung; das dargestellte Gangsystem mit seinen Ästen wird präziser als segmental beschrieben.",
        "en": "Grouped describes spatial clustering; the duct and its branches shown here are more precisely described as segmental.",
        "fa": "گروهی تجمع فضایی را توصیف می‌کند؛ مجرا و شاخه‌های توصیف‌شده با سگمنتال دقیق‌تر بیان می‌شوند."
      },
      "D": {
        "de": "Linear beschreibt eine Anordnung entlang einer Linie; die Äste und das dreieckige Areal sprechen hier für segmental.",
        "en": "Linear describes arrangement along a line; the branches and triangular area favour segmental here.",
        "fa": "خطی آرایش در امتداد یک خط است؛ شاخه‌ها و محدودهٔ مثلثی در اینجا به نفع سگمنتال‌اند."
      }
    },
    "sources": [
      "https://edge.sitecorecloud.io/americancoldf5f-acrorgf92a-productioncb02-3650/media/ACR/Files/RADS/BI-RADS/BI-RADS-Summary-Form-Mammography.pdf"
    ],
    "learningGoalIds": [
      "calc08-distribution"
    ]
  },
  "modifiers-not-score": {
    "question": {
      "de": "Textfall: Einer regionalen amorphen Kalkverteilung wird in einem historischen Morphologie-Verteilungsmodell die Modellkategorie 3 zugeordnet. Zusätzlich zeigt sich eine neue benachbarte Architekturstörung. Welcher nächste Schritt ist am besten begründet?",
      "en": "Text vignette: Regional amorphous calcifications are assigned model category 3 in a historical morphology-distribution model. A new adjacent architectural distortion is also present. Which next step is best justified?",
      "fa": "سناریوی متنی: کلسیفیکاسیون آمورف ناحیه‌ای در مدل تاریخی مورفولوژی‌ـ‌توزیع در دستهٔ مدل ۳ قرار می‌گیرد. دیستورشن معماری جدیدی نیز در مجاورت آن دیده می‌شود. کدام گام بعدی موجه‌تر است؟"
    },
    "options": [
      {
        "de": "Für den gesamten Befund eine Sechsmonatskontrolle nach dem Modellwert empfehlen",
        "en": "Recommend six-month surveillance for the entire finding based on the model value",
        "fa": "بر اساس مقدار مدل، پیگیری شش‌ماهه برای کل یافته توصیه شود"
      },
      {
        "de": "Die Architekturstörung gezielt abklären und Kalk sowie Begleitbefund gemeinsam neu bewerten",
        "en": "Investigate the distortion and reassess calcifications and associated findings together",
        "fa": "دیستورشن هدفمند بررسی و کلسیفیکاسیون و یافتهٔ همراه با هم دوباره ارزیابی شوند"
      },
      {
        "de": "Vor dem Gesamtassessment eine negative MRT als Voraussetzung für Verlaufskontrolle anstreben",
        "en": "Seek a negative MRI as the prerequisite for surveillance before overall assessment",
        "fa": "پیش از ارزیابی کلی، MRI منفی به‌عنوان شرط پیگیری دنبال شود"
      },
      {
        "de": "Die Modellkategorie anhand der größeren Gesamtausdehnung um eine Stufe erhöhen",
        "en": "Raise the model category by one level based on the greater total extent",
        "fa": "بر پایهٔ وسعت کلی بیشتر، دستهٔ مدل یک مرحله افزایش یابد"
      }
    ],
    "correct": "B",
    "difficulty": 3,
    "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC6923207/",
    "explanation": {
      "de": "Das historische Youk-Modell wurde aus ausgewählten Exzisionskohorten entwickelt und enthält weder Zeitverlauf noch Patientenmerkmale oder die neue Architekturstörung. Seine Modellkategorie 3 kann deshalb keine Verlaufskontrolle dieses Gesamtbefunds verordnen. Zuerst die zusätzliche Veränderung diagnostisch klären; das klinische Assessment folgt dem Gesamtbefund.",
      "en": "The historical Youk model was developed in selected excision cohorts and contains neither temporal change, patient factors nor the new distortion. Its model category 3 cannot prescribe surveillance for this overall finding. First investigate the additional change; clinical assessment follows the complete findings.",
      "fa": "مدل تاریخی Youk از کوهورت‌های منتخب جراحی ساخته شده و نه تغییرات زمانی، نه عوامل بیمار و نه دیستورشن جدید را در بر دارد. بنابراین دستهٔ مدل ۳ نمی‌تواند پیگیری این مجموعهٔ یافته‌ها را تجویز کند. ابتدا تغییر همراه بررسی تشخیصی شود؛ ارزیابی بالینی بر کل یافته‌ها استوار است."
    },
    "wrong": {
      "A": {
        "de": "Die Modellkategorie berücksichtigt die neue Gewebeveränderung nicht. Eine wahrscheinlich benigne Verlaufsempfehlung setzt eine abgeschlossene, passende diagnostische Gesamtbewertung voraus.",
        "en": "The model category does not account for the new tissue change. Probably benign surveillance requires a completed, appropriate overall diagnostic assessment.",
        "fa": "دستهٔ مدل تغییر بافتی جدید را لحاظ نمی‌کند. پیگیری یافتهٔ احتمالاً خوش‌خیم نیازمند ارزیابی تشخیصی کلی کامل و مناسب است."
      },
      "C": {
        "de": "Ein negatives Zusatzverfahren ersetzt weder die gezielte Abklärung der Architekturstörung noch ein klinisches Assessment aller Befunde.",
        "en": "A negative adjunct examination replaces neither targeted investigation of distortion nor clinical assessment of all findings.",
        "fa": "بررسی تکمیلی منفی جای بررسی هدفمند دیستورشن یا ارزیابی بالینی همهٔ یافته‌ها را نمی‌گیرد."
      },
      "D": {
        "de": "Für Ausdehnung oder Begleitbefunde gibt es in diesem Modell keine validierte Erhöhung um eine feste Kategorie. Beschreiben und klinisch gewichten, nicht rechnerisch addieren.",
        "en": "This model has no validated fixed-category increment for extent or associated findings. Describe and weigh them clinically rather than adding categories arithmetically.",
        "fa": "در این مدل افزایش ثابت و اعتبارسنجی‌شدهٔ دسته برای وسعت یا یافتهٔ همراه وجود ندارد. این عوامل توصیف و بالینی وزن‌دهی شوند، نه اینکه دسته‌ها به‌صورت حسابی جمع شوند."
      }
    },
    "sources": [
      "https://pmc.ncbi.nlm.nih.gov/articles/PMC6923207/",
      "https://www.gov.uk/government/publications/breast-screening-clinical-guidelines-for-screening-management/clinical-guidance-for-breast-cancer-screening-assessment"
    ],
    "learningGoalIds": [
      "calc08-evolution"
    ]
  },
  "mri-4a-selected": {
    "question": {
      "de": "Textfall: Reine Mikroverkalkungen werden nach diagnostischer Mammographie als BI-RADS 4A beurteilt. Eine zusätzlich durchgeführte MRT ist negativ. Es besteht kein Studienprotokoll zum Biopsieverzicht. Welche Empfehlung entspricht dem Standardmanagement?",
      "en": "Text vignette: Pure microcalcifications are assessed as BI-RADS 4A after diagnostic mammography. Additional MRI is negative. There is no study protocol for biopsy avoidance. Which recommendation follows standard management?",
      "fa": "سناریوی متنی: میکروکلسیفیکاسیون خالص پس از ماموگرافی تشخیصی BI-RADS 4A ارزیابی می‌شود. MRI تکمیلی منفی است و پروتکل پژوهشی برای حذف بیوپسی وجود ندارد. کدام توصیه مطابق مدیریت استاندارد است؟"
    },
    "options": [
      {
        "de": "Rückkehr zum Routine-Screening nach negativer MRT",
        "en": "Return to routine screening after negative MRI",
        "fa": "بازگشت به غربالگری معمول پس از MRI منفی"
      },
      {
        "de": "BI-RADS 3 und zwölfmonatige Kontrolle ohne Gewebeabklärung",
        "en": "BI-RADS 3 with twelve-month follow-up without tissue diagnosis",
        "fa": "BI-RADS 3 و پیگیری دوازده‌ماهه بدون تشخیص بافتی"
      },
      {
        "de": "Sechsmonatige MRT-Kontrolle als Ersatz der mammographisch gezielten Abklärung",
        "en": "Six-month MRI follow-up instead of mammographically targeted work-up",
        "fa": "پیگیری MRI شش‌ماهه به‌جای بررسی هدفمند ماموگرافیک"
      },
      {
        "de": "Gewebediagnostik des suspekten mammographischen Befunds empfehlen",
        "en": "Recommend tissue diagnosis of the suspicious mammographic finding",
        "fa": "تشخیص بافتی یافتهٔ مشکوک ماموگرافیک توصیه شود"
      }
    ],
    "correct": "D",
    "difficulty": 2,
    "source": "https://edge.sitecorecloud.io/americancoldf5f-acrorgf92a-productioncb02-3650/media/ACR/Files/RADS/BI-RADS/BI-RADS-Summary-Form-Mammography.pdf",
    "explanation": {
      "de": "Kategorie 4 führt im Standard zur Gewebediagnostik. Fueger 2021 diskutiert bei ausgewählten niedrigeren Prätestrisiken nach negativer MRT eine Forschungsstrategie mit Überwachung. Die vorgeschlagenen 6–12 Monate sind kein prospektiv validierter allgemeiner Ersatz für die Biopsie und keine automatische 4A-Regel.",
      "en": "Category 4 calls for tissue diagnosis in standard management. Fueger 2021 discusses a research strategy of surveillance after negative MRI at selected lower pretest risks. The proposed 6–12 months are not a prospectively validated general replacement for biopsy or an automatic 4A rule.",
      "fa": "مدیریت استاندارد دستهٔ ۴ تشخیص بافتی است. Fueger 2021 راهبرد پژوهشی پایش پس از MRI منفی را در خطرهای پیش‌آزمون پایین‌ترِ منتخب مطرح می‌کند. فاصلهٔ پیشنهادی ۶ تا ۱۲ ماه جایگزین عمومیِ اعتبارسنجی‌شدهٔ آینده‌نگر برای بیوپسی یا قاعدهٔ خودکار 4A نیست."
    },
    "wrong": {
      "A": {
        "de": "Eine negative Zusatz-MRT macht das suspekte mammographische Assessment nicht zu einem abgeschlossenen benignen Befund.",
        "en": "Negative adjunct MRI does not convert the suspicious mammographic assessment into a completed benign work-up.",
        "fa": "MRI تکمیلی منفی، ارزیابی مشکوک ماموگرافیک را به بررسی پایان‌یافتهٔ خوش‌خیم تبدیل نمی‌کند."
      },
      "B": {
        "de": "Die negative MRT allein begründet keine automatische Herabstufung auf 3 und kein festes zwölfmonatiges Intervall.",
        "en": "Negative MRI alone does not justify automatic downgrading to 3 or a fixed twelve-month interval.",
        "fa": "MRI منفی به‌تنهایی کاهش خودکار به دستهٔ ۳ یا فاصلهٔ ثابت دوازده‌ماهه را توجیه نمی‌کند."
      },
      "C": {
        "de": "Eine MRT-Kontrolle ersetzt hier nicht die empfohlene Gewebediagnostik des mammographischen Kalkziels.",
        "en": "MRI follow-up does not replace recommended tissue diagnosis of the mammographic calcification target here.",
        "fa": "پیگیری MRI در اینجا جای تشخیص بافتی توصیه‌شدهٔ هدف کلسیفیکاسیون ماموگرافیک را نمی‌گیرد."
      }
    },
    "sources": [
      "https://edge.sitecorecloud.io/americancoldf5f-acrorgf92a-productioncb02-3650/media/ACR/Files/RADS/BI-RADS/BI-RADS-Summary-Form-Mammography.pdf",
      "https://pmc.ncbi.nlm.nih.gov/articles/PMC7907894/"
    ],
    "learningGoalIds": [
      "calc08-management"
    ]
  },
  "mri-4b-risk": {
    "question": {
      "de": "Textfall: Ein BI-RADS 4B-Kalkbefund zeigt in der MRT kein Enhancement. Für eine gemeinsame Fallbesprechung soll das verbleibende Malignitätsrisiko eingeordnet werden. Welche Information ist dafür am unmittelbarsten erforderlich?",
      "en": "Text vignette: A BI-RADS 4B calcification finding shows no MRI enhancement. Residual malignancy risk is to be assessed at a multidisciplinary discussion. Which information is most directly needed?",
      "fa": "سناریوی متنی: یافتهٔ کلسیفیکاسیون BI-RADS 4B در MRI جذب مادهٔ حاجب ندارد. برای جلسهٔ چندتخصصی باید خطر باقی‌ماندهٔ بدخیمی ارزیابی شود. کدام اطلاعات مستقیماً لازم‌تر است؟"
    },
    "options": [
      {
        "de": "Angemessenes Prätestrisiko und Testleistung in einer vergleichbaren Population",
        "en": "Appropriate pretest risk and test performance in a comparable population",
        "fa": "خطر پیش‌آزمون مناسب و عملکرد آزمون در جمعیت قابل‌مقایسه"
      },
      {
        "de": "Negativer Vorhersagewert aus einer anders zusammengesetzten Screeningpopulation",
        "en": "Negative predictive value from a screening population with a different case mix",
        "fa": "ارزش اخباری منفی در جمعیت غربالگری با ترکیب متفاوت موارد"
      },
      {
        "de": "Übernahme der oberen 4A-Risikogrenze als neues Risiko nach negativer MRT",
        "en": "Using the upper 4A risk boundary as the new risk after negative MRI",
        "fa": "درنظرگرفتن سقف خطر 4A به‌عنوان خطر جدید پس از MRI منفی"
      },
      {
        "de": "In einer Vergleichsstudie beobachtete Falsch-negativ-Rate der MRT bei malignen Läsionen",
        "en": "The MRI false-negative rate among malignant lesions in a comparator study",
        "fa": "نرخ منفی کاذب MRI در ضایعات بدخیم یک مطالعهٔ مقایسه‌ای"
      }
    ],
    "correct": "A",
    "difficulty": 3,
    "source": "https://edge.sitecorecloud.io/americancoldf5f-acrorgf92a-productioncb02-3650/media/ACR/Files/RADS/BI-RADS/BI-RADS-Summary-Form-Mammography.pdf",
    "explanation": {
      "de": "4B umfasst mehr als 10 bis einschließlich 50 Prozent Prätestrisiko; die Kategorie allein liefert kein individuelles Residualrisiko. Der negative Vorhersagewert hängt vom Prätestrisiko und der Testleistung ab. Die Meta-Analyse erlaubte keine belastbare 4A/4B/4C-Subgruppenregel; Standardmanagement bleibt Gewebediagnostik.",
      "en": "4B spans greater than 10 up to 50 percent pretest risk; the category alone does not give individual residual risk. Negative predictive value depends on pretest risk and test performance. The meta-analysis did not establish a robust 4A/4B/4C subgroup rule; standard management remains tissue diagnosis.",
      "fa": "4B خطر پیش‌آزمون بیش از ۱۰ تا حداکثر ۵۰ درصد را شامل می‌شود؛ دسته به‌تنهایی خطر باقی‌ماندهٔ فردی نمی‌دهد. ارزش اخباری منفی به خطر پیش‌آزمون و عملکرد آزمون بستگی دارد. فراتحلیل قاعدهٔ معتبر زیرگروه‌های 4A/4B/4C را ثابت نکرد؛ مدیریت استاندارد همچنان تشخیص بافتی است."
    },
    "wrong": {
      "B": {
        "de": "Der negative Vorhersagewert ist bei verändertem Prätestrisiko und Fallmix nicht unverändert übertragbar.",
        "en": "Negative predictive value cannot be transferred unchanged across different pretest risks and case mixes.",
        "fa": "ارزش اخباری منفی در خطرهای پیش‌آزمون و ترکیب موارد متفاوت بدون تغییر قابل‌تعمیم نیست."
      },
      "C": {
        "de": "Eine Kategoriengrenze ist kein durch die negative MRT berechnetes Nachtestrisiko.",
        "en": "A category boundary is not a post-test risk calculated from negative MRI.",
        "fa": "مرز دسته، خطر پس‌آزمون محاسبه‌شده از MRI منفی نیست."
      },
      "D": {
        "de": "Die Falsch-negativ-Rate bezieht sich auf maligne Läsionen. Sie ist nicht mit dem Malignitätsrisiko unter allen MRT-negativen Befunden gleichzusetzen.",
        "en": "The false-negative rate is conditional on lesions being malignant. It is not the malignancy risk among all MRI-negative findings.",
        "fa": "نرخ منفی کاذب مربوط به ضایعات بدخیم است. این نرخ با خطر بدخیمی در میان همهٔ یافته‌های MRI منفی یکسان نیست."
      }
    },
    "sources": [
      "https://edge.sitecorecloud.io/americancoldf5f-acrorgf92a-productioncb02-3650/media/ACR/Files/RADS/BI-RADS/BI-RADS-Summary-Form-Mammography.pdf",
      "https://pmc.ncbi.nlm.nih.gov/articles/PMC7907894/"
    ],
    "learningGoalIds": [
      "calc08-management"
    ]
  },
  "coarse-heterogeneous-size": {
    "question": {
      "de": "Textfall: In Vergrößerungsaufnahmen sind irreguläre, gut erkennbare Partikel meist zwischen 0,5 und 1 mm sichtbar. Sie sind größer als amorpher Kalk, aber ohne grobes konfluierendes Involutionsmuster. Welcher Morphologiedeskriptor passt?",
      "en": "Text vignette: Magnification views show irregular, distinguishable particles mostly between 0.5 and 1 mm. They are larger than amorphous calcifications but lack a coarse confluent involution pattern. Which morphology descriptor fits?",
      "fa": "سناریوی متنی: نماهای بزرگ‌نمایی ذرات نامنظم و قابل‌تفکیک عمدتاً بین ۰٫۵ تا ۱ میلی‌متر را نشان می‌دهند. از کلسیفیکاسیون آمورف بزرگ‌ترند، اما الگوی درشت و پیوستهٔ پسرفت ندارند. کدام توصیف مورفولوژیک مناسب است؟"
    },
    "options": [
      {
        "de": "Fein pleomorph",
        "en": "Fine pleomorphic",
        "fa": "پلئومورفیک ظریف"
      },
      {
        "de": "Amorph",
        "en": "Amorphous",
        "fa": "آمورف"
      },
      {
        "de": "Grob heterogen",
        "en": "Coarse heterogeneous",
        "fa": "درشت ناهمگون"
      },
      {
        "de": "Grob, typisch benigne konfluierend",
        "en": "Coarse, typically benign confluent",
        "fa": "درشت، پیوسته و تیپیک خوش‌خیم"
      }
    ],
    "correct": "C",
    "difficulty": 2,
    "source": "https://edge.sitecorecloud.io/americancoldf5f-acrorgf92a-productioncb02-3650/media/ACR/Files/RADS/BI-RADS/BI-RADS-Summary-Form-Mammography.pdf",
    "explanation": {
      "de": "Die Kombination aus irregulärer, klar erkennbarer Partikelform und typischer Größe 0,5–1 mm passt zum aktuellen Deskriptor grob heterogen. Die Managemententscheidung erfordert zusätzlich Verteilung, Verlauf und Gesamtkontext.",
      "en": "Irregular distinguishable particles typically 0.5–1 mm fit the current coarse heterogeneous descriptor. Management additionally requires distribution, evolution and the full context.",
      "fa": "ترکیب شکل نامنظم و قابل‌تفکیک با اندازهٔ معمول ۰٫۵ تا ۱ میلی‌متر با توصیف فعلی درشت ناهمگون تطابق دارد. تصمیم مدیریت علاوه بر آن به توزیع، روند و زمینهٔ کلی نیاز دارد."
    },
    "wrong": {
      "A": {
        "de": "Fein pleomorphe Partikel sind typischerweise kleiner und variieren in Form und Größe; die beschriebene Größen-Form-Kombination passt besser zu grob heterogen.",
        "en": "Fine pleomorphic particles are typically smaller and vary in shape and size; the described combination better fits coarse heterogeneous.",
        "fa": "ذرات پلئومورفیک ظریف معمولاً کوچک‌ترند و شکل و اندازهٔ متغیر دارند؛ ترکیب توصیف‌شده بیشتر با درشت ناهمگون تطابق دارد."
      },
      "B": {
        "de": "Amorphe Partikel sind so klein oder unscharf, dass ihre Form nicht klar erkennbar ist; hier sind irreguläre Konturen unterscheidbar.",
        "en": "Amorphous particles are too small or hazy for clear shape characterization; irregular contours are distinguishable here.",
        "fa": "ذرات آمورف آن‌قدر کوچک یا محوند که شکلشان مشخص نیست؛ در اینجا حاشیه‌های نامنظم قابل‌تفکیک‌اند."
      },
      "D": {
        "de": "Das typische grobe konfluierende Involutionsmuster fehlt ausdrücklich; bloße Größenzunahme beweist keine benigne Morphologie.",
        "en": "The typical coarse confluent involution pattern is explicitly absent; larger size alone does not establish benign morphology.",
        "fa": "الگوی تیپیک درشت و پیوستهٔ پسرفت صراحتاً وجود ندارد؛ اندازهٔ بزرگ‌تر به‌تنهایی مورفولوژی خوش‌خیم را ثابت نمی‌کند."
      }
    },
    "sources": [
      "https://edge.sitecorecloud.io/americancoldf5f-acrorgf92a-productioncb02-3650/media/ACR/Files/RADS/BI-RADS/BI-RADS-Summary-Form-Mammography.pdf"
    ],
    "learningGoalIds": [
      "calc08-characterise"
    ]
  }
}
