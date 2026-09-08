// References: ACR BI-RADS mammography assessment categories; Lee et al. (PMC5787219);
// Fueger et al., The Breast 2021 (PMC7907894); ACR–AAPM–SIIM image quality guideline (PMC3553374).
// Preserve stable IDs when editing: learner progress is keyed by question/card ID.
export const CALCIFICATION_REVIEW_QUESTIONS = [
  {
    "id": "round-group-followup",
    "question": {
      "de": "Eine einzelne Gruppe runder/punktförmiger Verkalkungen wird erstmals gesehen. Vergrößerungsaufnahmen zeigen keine suspekten Zusatzmerkmale. Welche Einordnung kommt infrage?",
      "en": "A solitary group of round/punctate calcifications is seen for the first time. Magnification views show no suspicious additional features. Which assessment may be appropriate?",
      "fa": "یک گروه منفرد کلسیفیکاسیون گرد/نقطه‌ای برای نخستین بار دیده می‌شود. در نماهای بزرگ‌نمایی ویژگی مشکوک همراه وجود ندارد. کدام ارزیابی ممکن است مناسب باشد؟"
    },
    "options": [
      {
        "de": "BI-RADS 2 allein wegen fehlender Voraufnahmen",
        "en": "BI-RADS 2 solely because prior images are unavailable",
        "fa": "BI-RADS 2 صرفاً به‌دلیل نبود تصاویر قبلی"
      },
      {
        "de": "BI-RADS 3 nach vollständiger Abklärung; erste Kontrolle nach 6 Monaten",
        "en": "BI-RADS 3 after complete work-up; first follow-up at 6 months",
        "fa": "BI-RADS 3 پس از بررسی کامل؛ نخستین پیگیری پس از ۶ ماه"
      },
      {
        "de": "BI-RADS 5 allein wegen der Gruppierung",
        "en": "BI-RADS 5 solely because they are grouped",
        "fa": "BI-RADS 5 صرفاً به‌دلیل گروهی بودن"
      },
      {
        "de": "Dieselbe BI-RADS-3-Regel gilt uneingeschränkt für amorphe Partikel",
        "en": "The same BI-RADS 3 rule applies without restriction to amorphous particles",
        "fa": "همین قاعده BI-RADS 3 بدون محدودیت برای ذرات آمورف صدق می‌کند"
      }
    ],
    "correct": "B",
    "explanation": {
      "de": "Eine einzelne runde/punktförmige Gruppe ist eine mögliche BI-RADS-3-Konstellation, wenn die diagnostische Abklärung abgeschlossen ist und keine suspekten Merkmale vorliegen.",
      "en": "A solitary round/punctate group may qualify for BI-RADS 3 after complete diagnostic work-up without suspicious features.",
      "fa": "یک گروه منفرد گرد/نقطه‌ای پس از بررسی تشخیصی کامل و در نبود ویژگی مشکوک می‌تواند BI-RADS 3 باشد."
    },
    "wrong": {
      "A": {
        "de": "Fehlende Voraufnahmen beweisen keine Benignität.",
        "en": "Unavailable prior images do not prove benignity.",
        "fa": "نبود تصاویر قبلی، خوش‌خیمی را اثبات نمی‌کند."
      },
      "C": {
        "de": "Gruppierung allein rechtfertigt keine Kategorie 5.",
        "en": "Grouping alone does not justify category 5.",
        "fa": "گروهی بودن به‌تنهایی دسته 5 را توجیه نمی‌کند."
      },
      "D": {
        "de": "Amorphe Morphologie darf nicht pauschal als BI-RADS 3 bewertet werden.",
        "en": "Amorphous morphology must not routinely be assessed as BI-RADS 3.",
        "fa": "مورفولوژی آمورف نباید به‌طور کلی BI-RADS 3 ارزیابی شود."
      }
    }
  },
  {
    "id": "stable-suspicious",
    "question": {
      "de": "Fein pleomorphe, segmentale Verkalkungen sind seit zwei Jahren unverändert. Welche Aussage trifft zu?",
      "en": "Fine pleomorphic, segmental calcifications have been unchanged for two years. Which statement is correct?",
      "fa": "کلسیفیکاسیون‌های پلئومورفیک ظریف با توزیع سگمنتال دو سال بدون تغییر بوده‌اند. کدام عبارت درست است؟"
    },
    "options": [
      {
        "de": "Zweijährige Stabilität beweist BI-RADS 2",
        "en": "Two-year stability proves BI-RADS 2",
        "fa": "پایداری دوساله BI-RADS 2 را اثبات می‌کند"
      },
      {
        "de": "Stabilität schließt nur invasives Karzinom sicher aus",
        "en": "Stability reliably excludes invasive carcinoma only",
        "fa": "پایداری فقط کارسینوم مهاجم را به‌طور قطعی رد می‌کند"
      },
      {
        "de": "Stabilität ersetzt eine Biopsie, wenn keine Masse vorliegt",
        "en": "Stability replaces biopsy if there is no mass",
        "fa": "در نبود توده، پایداری جایگزین بیوپسی می‌شود"
      },
      {
        "de": "Stabilität entkräftet die suspekte Morphologie nicht; DCIS kann langsam wachsen",
        "en": "Stability does not negate suspicious morphology; DCIS may grow slowly",
        "fa": "پایداری مورفولوژی مشکوک را منتفی نمی‌کند؛ DCIS ممکن است آهسته رشد کند"
      }
    ],
    "correct": "D",
    "explanation": {
      "de": "Stabilität ist ein Modifikator, kein Benignitätsbeweis. Ein persistierend suspekter Befund bleibt abklärungsbedürftig.",
      "en": "Stability is a modifier, not proof of benignity. Persistently suspicious findings still require work-up.",
      "fa": "پایداری عامل تعدیل‌کننده است، نه اثبات خوش‌خیمی. یافته‌ای که همچنان مشکوک است نیازمند بررسی باقی می‌ماند."
    },
    "wrong": {
      "A": {
        "de": "Auch DCIS kann über Jahre unverändert erscheinen.",
        "en": "DCIS may also appear unchanged for years.",
        "fa": "DCIS نیز ممکن است سال‌ها بدون تغییر دیده شود."
      },
      "B": {
        "de": "Stabilität allein erlaubt keinen sicheren histologischen Ausschluss.",
        "en": "Stability alone does not reliably exclude a histologic diagnosis.",
        "fa": "پایداری به‌تنهایی تشخیص بافت‌شناختی را به‌طور مطمئن رد نمی‌کند."
      },
      "C": {
        "de": "Suspekte Verkalkungen können ohne assoziierte Masse auftreten.",
        "en": "Suspicious calcifications may occur without an associated mass.",
        "fa": "کلسیفیکاسیون مشکوک می‌تواند بدون توده همراه وجود داشته باشد."
      }
    }
  },
  {
    "id": "regional-definition",
    "question": {
      "de": "Locker verstreute Verkalkungen in einem 3-cm-Areal ohne erkennbare duktale Orientierung: Welcher Verteilungsdeskriptor passt?",
      "en": "Loosely scattered calcifications over a 3-cm area without recognisable ductal orientation: which distribution descriptor fits?",
      "fa": "کلسیفیکاسیون‌های پراکنده در ناحیه‌ای ۳ سانتی‌متری بدون جهت‌گیری مشخص داکتال: کدام توصیف توزیع مناسب است؟"
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
    }
  },
  {
    "id": "segmental-apex",
    "question": {
      "de": "Wie ist eine typische segmentale Verteilung räumlich angeordnet?",
      "en": "How is a typical segmental distribution arranged spatially?",
      "fa": "توزیع سگمنتال تیپیک از نظر فضایی چگونه است؟"
    },
    "options": [
      {
        "de": "Kreisförmig um eine Ölzyste",
        "en": "Circular around an oil cyst",
        "fa": "دایره‌ای پیرامون کیست روغنی"
      },
      {
        "de": "Gleichmäßig über beide Brüste verteilt",
        "en": "Evenly distributed across both breasts",
        "fa": "یکنواخت در هر دو پستان"
      },
      {
        "de": "Keilförmig mit der Spitze zur Mamille, entlang eines Gangsystems",
        "en": "Wedge-shaped with the apex towards the nipple, along a ductal system",
        "fa": "گوه‌ای با رأس رو به نوک پستان، در امتداد سیستم مجاری"
      },
      {
        "de": "Keilförmig mit der Spitze zur Thoraxwand",
        "en": "Wedge-shaped with the apex towards the chest wall",
        "fa": "گوه‌ای با رأس رو به دیواره قفسه سینه"
      }
    ],
    "correct": "C",
    "explanation": {
      "de": "Die segmentale Anordnung bildet einen Gang und seine Verzweigungen ab; die Spitze weist zur Mamille.",
      "en": "Segmental arrangement reflects a duct and its branches; the apex points towards the nipple.",
      "fa": "آرایش سگمنتال نشان‌دهنده مجرا و شاخه‌های آن است؛ رأس به‌سوی نوک پستان قرار دارد."
    },
    "wrong": {
      "A": {
        "de": "Ein dünner Ring um eine Ölzyste beschreibt eine Rim-Morphologie, kein Gangsegment.",
        "en": "A thin ring around an oil cyst describes rim morphology, not a ductal segment.",
        "fa": "حلقه نازک پیرامون کیست روغنی مورفولوژی حاشیه‌ای است، نه سگمان مجرایی."
      },
      "B": {
        "de": "Eine weite bilaterale Streuung passt zu diffuser Verteilung.",
        "en": "Wide bilateral scattering fits diffuse distribution.",
        "fa": "پراکندگی وسیع دوطرفه با توزیع منتشر سازگار است."
      },
      "D": {
        "de": "Die typische Spitze liegt mamillenwärts, nicht thoraxwandwärts.",
        "en": "The typical apex faces the nipple, not the chest wall.",
        "fa": "رأس تیپیک به سمت نوک پستان است، نه دیواره قفسه سینه."
      }
    }
  },
  {
    "id": "modifiers-not-score",
    "question": {
      "de": "Wie werden größere Ausdehnung, Progression und eine assoziierte Masse im interaktiven Modell berücksichtigt?",
      "en": "How are greater extent, progression and an associated mass considered in the interactive model?",
      "fa": "وسعت بیشتر، پیشرفت و توده همراه در مدل تعاملی چگونه لحاظ می‌شوند؟"
    },
    "options": [
      {
        "de": "Jeder Befund erhöht BI-RADS um genau eine Stufe",
        "en": "Each finding increases BI-RADS by exactly one category",
        "fa": "هر یافته BI-RADS را دقیقاً یک دسته افزایش می‌دهد"
      },
      {
        "de": "Als zusätzliche Hinweise zur ärztlichen Gesamtbeurteilung, ohne feste Rechenstufen",
        "en": "As additional information for overall clinical assessment, without fixed arithmetic steps",
        "fa": "به‌عنوان اطلاعات تکمیلی برای ارزیابی بالینی کلی، بدون مراحل محاسباتی ثابت"
      },
      {
        "de": "Sie sind für die Risikoeinschätzung irrelevant",
        "en": "They are irrelevant to risk assessment",
        "fa": "برای ارزیابی خطر بی‌اهمیت‌اند"
      },
      {
        "de": "Zwei Jahre Stabilität heben alle anderen Warnzeichen auf",
        "en": "Two years of stability cancel all other warning signs",
        "fa": "دو سال پایداری همه علائم هشدار دیگر را خنثی می‌کند"
      }
    ],
    "correct": "B",
    "explanation": {
      "de": "Die Modifikatoren sind kein validierter additiver BI-RADS-Score. Die Matrix bildet nur das vereinfachte Ausgangsmodell ab.",
      "en": "Modifiers are not a validated additive BI-RADS score. The matrix represents only the simplified baseline model.",
      "fa": "عوامل تعدیل‌کننده، امتیاز جمع‌شونده معتبر BI-RADS نیستند. ماتریس فقط مدل اولیه ساده‌شده را نشان می‌دهد."
    },
    "wrong": {
      "A": {
        "de": "Eine starre Erhöhung um eine Kategorie pro Merkmal ist nicht vorgesehen.",
        "en": "A fixed one-category increase per feature is not defined.",
        "fa": "افزایش ثابت یک دسته برای هر ویژگی تعریف نشده است."
      },
      "C": {
        "de": "Diese Befunde können den klinischen Verdacht wesentlich beeinflussen.",
        "en": "These findings may substantially influence clinical suspicion.",
        "fa": "این یافته‌ها می‌توانند بر شک بالینی تأثیر مهمی داشته باشند."
      },
      "D": {
        "de": "Stabilität neutralisiert suspekte Morphologie nicht.",
        "en": "Stability does not neutralise suspicious morphology.",
        "fa": "پایداری مورفولوژی مشکوک را خنثی نمی‌کند."
      }
    }
  },
  {
    "id": "mri-4a-selected",
    "question": {
      "de": "Reiner Mikrokalk wurde mammographisch als BI-RADS 4A eingestuft; die MRT ist negativ. Welche Aussage entspricht der Lektion?",
      "en": "Pure microcalcifications were assessed as mammographic BI-RADS 4A; MRI is negative. Which statement matches the lesson?",
      "fa": "میکروکلسیفیکاسیون خالص در ماموگرافی BI-RADS 4A ارزیابی شده و MRI منفی است. کدام عبارت مطابق درس است؟"
    },
    "options": [
      {
        "de": "Ein DCIS ist ausgeschlossen",
        "en": "DCIS is excluded",
        "fa": "DCIS رد شده است"
      },
      {
        "de": "Für alle Patientinnen entfällt die Biopsie; Kontrolle nach genau 12 Monaten",
        "en": "Biopsy is omitted in every patient; follow-up at exactly 12 months",
        "fa": "برای همه بیماران بیوپسی حذف و پیگیری دقیقاً پس از ۱۲ ماه انجام می‌شود"
      },
      {
        "de": "Eine negative MRT erhöht automatisch auf BI-RADS 5",
        "en": "A negative MRI automatically upgrades to BI-RADS 5",
        "fa": "MRI منفی به‌طور خودکار دسته را به BI-RADS 5 افزایش می‌دهد"
      },
      {
        "de": "Biopsie bleibt Standard; eine Kontrolle statt Biopsie ist nur eine ausgewählte, individuell begründete Strategie",
        "en": "Biopsy remains standard; surveillance instead is a selected, individually justified strategy",
        "fa": "بیوپسی استاندارد باقی می‌ماند؛ پیگیری به‌جای آن فقط راهبردی منتخب با توجیه فردی است"
      }
    ],
    "correct": "D",
    "explanation": {
      "de": "Studien diskutieren bei niedrigem Ausgangsrisiko nach negativer MRT Kontrollen nach 6–12 Monaten. Das ist keine allgemeine 4A-Regel und schließt DCIS nicht aus.",
      "en": "Studies discuss 6–12-month surveillance after negative MRI when baseline risk is low. This is not a general 4A rule and does not exclude DCIS.",
      "fa": "مطالعات در خطر اولیه پایین، پیگیری ۶ تا ۱۲ ماه پس از MRI منفی را مطرح می‌کنند. این قاعده عمومی 4A نیست و DCIS را رد نمی‌کند."
    },
    "wrong": {
      "A": {
        "de": "Einige DCIS zeigen kein erkennbares Enhancement.",
        "en": "Some DCIS lesions show no detectable enhancement.",
        "fa": "برخی ضایعات DCIS جذب قابل تشخیص ندارند."
      },
      "B": {
        "de": "Die Studienergebnisse rechtfertigen keinen pauschalen Biopsieverzicht oder ein einheitliches 12-Monats-Intervall.",
        "en": "Study results do not justify universal biopsy avoidance or a uniform 12-month interval.",
        "fa": "نتایج مطالعات، حذف عمومی بیوپسی یا فاصله یکسان ۱۲ ماهه را توجیه نمی‌کنند."
      },
      "C": {
        "de": "Ein negatives Zusatzverfahren bewirkt keine automatische Kategorieänderung.",
        "en": "A negative adjunct examination does not automatically change the category.",
        "fa": "بررسی تکمیلی منفی، دسته را خودکار تغییر نمی‌دهد."
      }
    }
  },
  {
    "id": "mri-4b-risk",
    "question": {
      "de": "Warum lässt sich BI-RADS 4B bei negativer MRT nicht pauschal auf Verlaufskontrolle herabstufen?",
      "en": "Why can BI-RADS 4B with negative MRI not routinely be downgraded to surveillance?",
      "fa": "چرا BI-RADS 4B با MRI منفی را نمی‌توان به‌طور کلی به پیگیری کاهش داد؟"
    },
    "options": [
      {
        "de": "Die Kategorie umfasst > 10 bis ≤ 50 % Ausgangsrisiko; das individuelle Restrisiko ist nicht allein aus der Kategorie ableitbar",
        "en": "The category spans > 10 to ≤ 50% baseline risk; individual residual risk cannot be derived from the category alone",
        "fa": "این دسته خطر اولیه بیش از ۱۰ تا حداکثر ۵۰ درصد را شامل می‌شود؛ خطر باقی‌مانده فردی فقط از روی دسته قابل تعیین نیست"
      },
      {
        "de": "Alle 4B-Befunde sind invasiv",
        "en": "All 4B findings are invasive",
        "fa": "همه یافته‌های 4B مهاجم‌اند"
      },
      {
        "de": "Die MRT misst die Kalkpartikelgröße genauer als die Mammographie",
        "en": "MRI measures calcium particle size more accurately than mammography",
        "fa": "MRI اندازه ذرات کلسیم را دقیق‌تر از ماموگرافی می‌سنجد"
      },
      {
        "de": "Ein fehlendes Enhancement bedeutet immer ein Risiko unter 2 %",
        "en": "Absent enhancement always means a risk below 2%",
        "fa": "نبود جذب همیشه به معنی خطر کمتر از ۲ درصد است"
      }
    ],
    "correct": "A",
    "explanation": {
      "de": "Bei 4B individuell entscheiden und mit Biopsieverzicht zurückhaltend sein. Meist bleibt die histologische Abklärung empfohlen.",
      "en": "For 4B, decide individually and be cautious about omitting biopsy. Tissue diagnosis usually remains recommended.",
      "fa": "در 4B فردی تصمیم بگیرید و در صرف‌نظر از بیوپسی محتاط باشید. معمولاً تشخیص بافتی همچنان توصیه می‌شود."
    },
    "wrong": {
      "B": {
        "de": "BI-RADS ist eine Risikokategorie, keine Histologie.",
        "en": "BI-RADS is a risk category, not a histologic diagnosis.",
        "fa": "BI-RADS دسته خطر است، نه تشخیص بافت‌شناختی."
      },
      "C": {
        "de": "Die Mammographie charakterisiert Kalk; MRT beurteilt vor allem Gewebe-Enhancement.",
        "en": "Mammography characterises calcium; MRI primarily assesses tissue enhancement.",
        "fa": "ماموگرافی کلسیم را مشخص می‌کند؛ MRI عمدتاً جذب بافت را ارزیابی می‌کند."
      },
      "D": {
        "de": "Das Restrisiko hängt auch vom Ausgangsrisiko und der Testleistung ab.",
        "en": "Residual risk also depends on baseline risk and test performance.",
        "fa": "خطر باقی‌مانده به خطر اولیه و عملکرد آزمون نیز بستگی دارد."
      }
    }
  },
  {
    "id": "coarse-heterogeneous-size",
    "question": {
      "de": "Welche Beschreibung passt zu grob heterogenen Verkalkungen?",
      "en": "Which description fits coarse heterogeneous calcifications?",
      "fa": "کدام توصیف با کلسیفیکاسیون درشت ناهمگون سازگار است؟"
    },
    "options": [
      {
        "de": "Glatte Ringe um eine fetthaltige Zyste",
        "en": "Smooth rings around a fat-containing cyst",
        "fa": "حلقه‌های صاف پیرامون کیست حاوی چربی"
      },
      {
        "de": "Formlose, kaum abgrenzbare Partikel ohne erkennbare Kontur",
        "en": "Formless, barely distinguishable particles without recognisable contours",
        "fa": "ذرات بی‌شکل و به‌سختی قابل تشخیص بدون حاشیه مشخص"
      },
      {
        "de": "Irreguläre Partikel, meist 0,5–1 mm; größer als amorph, kleiner als typisch grober benigner Kalk",
        "en": "Irregular particles, usually 0.5–1 mm; larger than amorphous particles, smaller than typically coarse benign calcium",
        "fa": "ذرات نامنظم، معمولاً ۰٫۵ تا ۱ میلی‌متر؛ بزرگ‌تر از آمورف و کوچک‌تر از کلسیم تیپیک درشت خوش‌خیم"
      },
      {
        "de": "Dünne parallele Linien ausschließlich entlang von Gefäßwänden",
        "en": "Thin parallel lines exclusively along vessel walls",
        "fa": "خطوط نازک موازی صرفاً در امتداد دیواره عروق"
      }
    ],
    "correct": "C",
    "explanation": {
      "de": "Grob heterogen beschreibt Form und Größenordnung. Die klinische Einordnung erfordert zusätzlich Verteilung und Gesamtbefund.",
      "en": "Coarse heterogeneous describes shape and size range. Clinical assessment also requires distribution and the overall findings.",
      "fa": "درشت ناهمگون، شکل و محدوده اندازه را توصیف می‌کند. ارزیابی بالینی به توزیع و مجموعه یافته‌ها نیز نیاز دارد."
    },
    "wrong": {
      "A": {
        "de": "Das ist eine Rim-Verkalkung.",
        "en": "This describes rim calcification.",
        "fa": "این توصیف کلسیفیکاسیون حاشیه‌ای است."
      },
      "B": {
        "de": "Das beschreibt eher amorphe Verkalkungen.",
        "en": "This better describes amorphous calcifications.",
        "fa": "این بیشتر توصیف کلسیفیکاسیون آمورف است."
      },
      "D": {
        "de": "Das beschreibt vaskuläre Verkalkungen.",
        "en": "This describes vascular calcifications.",
        "fa": "این توصیف کلسیفیکاسیون عروقی است."
      }
    }
  }
]

export const CALCIFICATION_REVIEW_CARDS = [
  {
    "id": "mammographie-mikrokalk-size",
    "topicId": "mammographie-mikrokalk",
    "category": {
      "de": "Größe",
      "en": "Size",
      "fa": "اندازه"
    },
    "front": {
      "de": "Sind Mikroverkalkungen unter 0,5 mm automatisch maligne?",
      "en": "Are microcalcifications below 0.5 mm automatically malignant?",
      "fa": "آیا میکروکلسیفیکاسیون‌های کوچک‌تر از ۰٫۵ میلی‌متر خودبه‌خود بدخیم‌اند؟"
    },
    "answer": {
      "de": "Nein. Malignitätsassoziierte Partikel sind häufig sehr klein; auch benigner Kalk kann klein sein.",
      "en": "No. Malignancy-associated particles are often very small, but benign calcium can also be small.",
      "fa": "خیر. ذرات همراه بدخیمی اغلب بسیار کوچک‌اند، اما کلسیم خوش‌خیم نیز می‌تواند کوچک باشد."
    },
    "explanation": {
      "de": "Morphologie und Verteilung sind entscheidend; Größe allein ist kein Trennkriterium.",
      "en": "Morphology and distribution are essential; size alone is not a discriminator.",
      "fa": "مورفولوژی و توزیع تعیین‌کننده‌اند؛ اندازه به‌تنهایی معیار افتراق نیست."
    }
  },
  {
    "id": "mammographie-mikrokalk-dbt",
    "topicId": "mammographie-mikrokalk",
    "category": {
      "de": "Technik",
      "en": "Technique",
      "fa": "تکنیک"
    },
    "front": {
      "de": "Ersetzt DBT die gezielte Kalkvergrößerung?",
      "en": "Does DBT replace targeted calcification magnification?",
      "fa": "آیا DBT جایگزین بزرگ‌نمایی هدفمند کلسیفیکاسیون است؟"
    },
    "answer": {
      "de": "Nein. DBT ergänzt Lokalisation und Gewebekontext; 2D-Vergrößerungsaufnahmen zeigen die feinen Kalkdetails.",
      "en": "No. DBT adds localisation and tissue context; 2D magnification shows fine calcification detail.",
      "fa": "خیر. DBT محل و زمینه بافتی را تکمیل می‌کند؛ بزرگ‌نمایی دوبعدی جزئیات ظریف کلسیفیکاسیون را نشان می‌دهد."
    },
    "explanation": {
      "de": "Die Verfahren ergänzen sich. Ein kleiner Brennfleck begrenzt bei Vergrößerung die geometrische Unschärfe.",
      "en": "The techniques complement each other. A small focal spot limits geometric blur during magnification.",
      "fa": "این روش‌ها مکمل هم‌اند. کانون کوچک، تاری هندسی هنگام بزرگ‌نمایی را محدود می‌کند."
    }
  },
  {
    "id": "mammographie-mikrokalk-grouped",
    "topicId": "mammographie-mikrokalk",
    "category": {
      "de": "Verteilung",
      "en": "Distribution",
      "fa": "توزیع"
    },
    "front": {
      "de": "Wie unterscheiden sich gruppierte und regionale Verkalkungen?",
      "en": "How do grouped and regional calcifications differ?",
      "fa": "کلسیفیکاسیون‌های گروهی و ناحیه‌ای چه تفاوتی دارند؟"
    },
    "answer": {
      "de": "Gruppiert: mindestens fünf Partikel in 1 cm oder mehr Partikel innerhalb von 2 cm. Regional: locker verstreut in einem Areal über 2 cm ohne duktale Orientierung.",
      "en": "Grouped: at least five particles in 1 cm or more particles within 2 cm. Regional: loosely scattered over an area larger than 2 cm without ductal orientation.",
      "fa": "گروهی: حداقل پنج ذره در ۱ سانتی‌متر یا تعداد بیشتر در محدوده ۲ سانتی‌متر. ناحیه‌ای: پراکنده در ناحیه بیش از ۲ سانتی‌متر بدون جهت‌گیری داکتال."
    },
    "explanation": {
      "de": "Die Verteilung muss immer mit der Morphologie kombiniert werden.",
      "en": "Always combine distribution with morphology.",
      "fa": "توزیع را همواره با مورفولوژی ترکیب کنید."
    }
  },
  {
    "id": "mammographie-mikrokalk-segmental",
    "topicId": "mammographie-mikrokalk",
    "category": {
      "de": "Verteilung",
      "en": "Distribution",
      "fa": "توزیع"
    },
    "front": {
      "de": "Wohin zeigt die Spitze einer segmentalen Verteilung?",
      "en": "Where does the apex of a segmental distribution point?",
      "fa": "رأس توزیع سگمنتال به کدام سمت است؟"
    },
    "answer": {
      "de": "Zur Mamille; das dreieckige beziehungsweise keilförmige Muster folgt einem Gang und seinen Verzweigungen.",
      "en": "Towards the nipple; the triangular or wedge-shaped pattern follows a duct and its branches.",
      "fa": "به‌سوی نوک پستان؛ الگوی مثلثی یا گوه‌ای از مجرا و شاخه‌های آن پیروی می‌کند."
    },
    "explanation": {
      "de": "Ein duktales Muster beweist allein keine bestimmte Histologie.",
      "en": "A ductal pattern alone does not prove a specific histology.",
      "fa": "الگوی داکتال به‌تنهایی بافت‌شناسی مشخصی را اثبات نمی‌کند."
    }
  },
  {
    "id": "mammographie-mikrokalk-round-3",
    "topicId": "mammographie-mikrokalk",
    "category": {
      "de": "BI-RADS 3",
      "en": "BI-RADS 3",
      "fa": "BI-RADS 3"
    },
    "front": {
      "de": "Wann kommt eine einzelne runde/punktförmige Gruppe für BI-RADS 3 infrage?",
      "en": "When may a solitary round/punctate group qualify for BI-RADS 3?",
      "fa": "چه زمانی یک گروه منفرد گرد/نقطه‌ای می‌تواند BI-RADS 3 باشد؟"
    },
    "answer": {
      "de": "Nach vollständiger diagnostischer Abklärung ohne suspekte Merkmale, auch wenn keine Voraufnahmen vorliegen. Erste Kontrolle nach 6 Monaten.",
      "en": "After complete diagnostic work-up without suspicious features, including when prior images are unavailable. First follow-up at 6 months.",
      "fa": "پس از بررسی تشخیصی کامل و نبود ویژگی مشکوک، از جمله در نبود تصاویر قبلی. نخستین پیگیری پس از ۶ ماه است."
    },
    "explanation": {
      "de": "Fehlende Voraufnahmen allein genügen nicht. Die Regel gilt nicht pauschal für amorphen Kalk.",
      "en": "Lack of prior images alone is insufficient. The rule does not routinely apply to amorphous calcium.",
      "fa": "نبود تصاویر قبلی به‌تنهایی کافی نیست. این قاعده به‌طور کلی برای کلسیم آمورف صدق نمی‌کند."
    }
  },
  {
    "id": "mammographie-mikrokalk-stability",
    "topicId": "mammographie-mikrokalk",
    "category": {
      "de": "Verlauf",
      "en": "Evolution",
      "fa": "روند"
    },
    "front": {
      "de": "Beweist langjährige Stabilität die Benignität suspekter Verkalkungen?",
      "en": "Does long-term stability prove suspicious calcifications are benign?",
      "fa": "آیا پایداری طولانی‌مدت، خوش‌خیمی کلسیفیکاسیون مشکوک را اثبات می‌کند؟"
    },
    "answer": {
      "de": "Nein. DCIS kann langsam wachsen oder lange bildmorphologisch unverändert bleiben.",
      "en": "No. DCIS may grow slowly or remain unchanged on imaging for a long time.",
      "fa": "خیر. DCIS ممکن است آهسته رشد کند یا مدت طولانی در تصویربرداری بدون تغییر بماند."
    },
    "explanation": {
      "de": "Stabilität ist ein Modifikator, aber keine Entwarnung bei suspekter Morphologie.",
      "en": "Stability is a modifier, not reassurance when morphology is suspicious.",
      "fa": "پایداری عامل تعدیل‌کننده است، نه نشانه رفع خطر در مورفولوژی مشکوک."
    }
  },
  {
    "id": "mammographie-mikrokalk-modifiers",
    "topicId": "mammographie-mikrokalk",
    "category": {
      "de": "Modifikatoren",
      "en": "Modifiers",
      "fa": "عوامل تعدیل‌کننده"
    },
    "front": {
      "de": "Welche vier Zusatzaspekte gehören zur Gesamtbeurteilung?",
      "en": "Which four additional aspects belong in the overall assessment?",
      "fa": "کدام چهار جنبه تکمیلی در ارزیابی کلی لحاظ می‌شوند؟"
    },
    "answer": {
      "de": "Verlauf, Gesamtausdehnung, Begleitbefunde sowie Alter und persönliche Anamnese.",
      "en": "Evolution, total extent, associated findings, and age/personal history.",
      "fa": "روند، وسعت کل، یافته‌های همراه و سن/سابقه شخصی."
    },
    "explanation": {
      "de": "Keine festen Plus-/Minus-Kategorien. Der Matrixwert ist ein Studienmodell, keine individuelle Risikoberechnung.",
      "en": "No fixed category increments or decrements. The matrix is a research model, not an individual risk calculation.",
      "fa": "بدون افزایش یا کاهش ثابت دسته‌ها. ماتریس مدل پژوهشی است، نه محاسبه خطر فردی."
    }
  },
  {
    "id": "mammographie-mikrokalk-mri4a",
    "topicId": "mammographie-mikrokalk",
    "category": {
      "de": "Negative MRT",
      "en": "Negative MRI",
      "fa": "MRI منفی"
    },
    "front": {
      "de": "Darf bei BI-RADS 4A nach negativer MRT generell auf Biopsie verzichtet werden?",
      "en": "Can biopsy routinely be omitted in BI-RADS 4A after negative MRI?",
      "fa": "آیا در BI-RADS 4A پس از MRI منفی می‌توان به‌طور کلی از بیوپسی صرف‌نظر کرد؟"
    },
    "answer": {
      "de": "Nein. Biopsie bleibt Standard. Bei ausgewählten reinen Mikroverkalkungen mit niedrigem Ausgangsrisiko kann eine individuelle Überwachungsstrategie diskutiert werden.",
      "en": "No. Biopsy remains standard. An individual surveillance strategy may be discussed for selected pure microcalcifications with low baseline risk.",
      "fa": "خیر. بیوپسی استاندارد باقی می‌ماند. برای میکروکلسیفیکاسیون خالص منتخب با خطر اولیه پایین می‌توان راهبرد پیگیری فردی را بررسی کرد."
    },
    "explanation": {
      "de": "Studien diskutieren 6–12 Monate, keine allgemeine 12-Monats-Regel. Eine negative MRT schließt DCIS nicht vollständig aus.",
      "en": "Studies discuss 6–12 months, not a universal 12-month rule. Negative MRI does not completely exclude DCIS.",
      "fa": "مطالعات ۶ تا ۱۲ ماه را مطرح می‌کنند، نه قاعده عمومی ۱۲ ماهه. MRI منفی، DCIS را به‌طور کامل رد نمی‌کند."
    }
  },
  {
    "id": "mammographie-mikrokalk-mri4b5",
    "topicId": "mammographie-mikrokalk",
    "category": {
      "de": "Negative MRT",
      "en": "Negative MRI",
      "fa": "MRI منفی"
    },
    "front": {
      "de": "Wie werden BI-RADS 4B, 4C und 5 bei negativer MRT eingeordnet?",
      "en": "How are BI-RADS 4B, 4C and 5 managed after negative MRI?",
      "fa": "BI-RADS 4B، 4C و 5 پس از MRI منفی چگونه مدیریت می‌شوند؟"
    },
    "answer": {
      "de": "4B: individuell entscheiden, mit Biopsieverzicht zurückhaltend sein; meist Biopsie. 4C und 5: Biopsie auch bei negativer MRT.",
      "en": "4B: decide individually and be cautious about omitting biopsy; usually biopsy. 4C and 5: biopsy even with negative MRI.",
      "fa": "4B: فردی تصمیم بگیرید و در حذف بیوپسی محتاط باشید؛ معمولاً بیوپسی. 4C و 5: حتی با MRI منفی بیوپسی لازم است."
    },
    "explanation": {
      "de": "Das Ausgangsrisiko bleibt wichtig; Kategorien sind keine individuellen Restrisiken nach MRT.",
      "en": "Baseline risk remains important; categories are not individual residual risks after MRI.",
      "fa": "خطر اولیه همچنان مهم است؛ دسته‌ها معادل خطر باقی‌مانده فردی پس از MRI نیستند."
    }
  },
  {
    "id": "mammographie-mikrokalk-usmacro",
    "topicId": "mammographie-mikrokalk",
    "category": {
      "de": "Ultraschall",
      "en": "Ultrasound",
      "fa": "سونوگرافی"
    },
    "front": {
      "de": "Wie erscheinen Makroverkalkungen im Ultraschall?",
      "en": "How do macrocalcifications appear on ultrasound?",
      "fa": "ماکروکلسیفیکاسیون‌ها در سونوگرافی چگونه دیده می‌شوند؟"
    },
    "answer": {
      "de": "Echogen, häufig mit dorsalem Schallschatten; beispielsweise in Fibroadenomen, verkalkten Ölzysten oder Fettnekrose.",
      "en": "Echogenic, often with posterior acoustic shadowing; for example in fibroadenomas, calcified oil cysts or fat necrosis.",
      "fa": "اکوژن، اغلب با سایه صوتی خلفی؛ برای مثال در فیبروآدنوم، کیست روغنی کلسیفیه یا نکروز چربی."
    },
    "explanation": {
      "de": "Mikrokalk kann als feine echogene Foci sichtbar sein, muss sonographisch aber nicht nachweisbar sein.",
      "en": "Microcalcifications may appear as fine echogenic foci but need not be detectable on ultrasound.",
      "fa": "میکروکلسیفیکاسیون ممکن است به شکل کانون اکوژن ظریف دیده شود، اما الزاماً در سونوگرافی قابل تشخیص نیست."
    }
  }
]
