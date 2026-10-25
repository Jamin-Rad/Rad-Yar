const L = (de, en, fa) => ({ de, en, fa })

const QUESTIONS = [
  {
    "id": "describe-first",
    "question": {
      "de": "Im Screening fällt erstmals eine umschriebene Verdichtung auf. Voraufnahmen liegen noch nicht vor; die diagnostische Abklärung steht aus. Welcher nächste Arbeitsablauf ist am sinnvollsten?",
      "en": "Screening first shows a focal density. Prior images are not yet available and diagnostic work-up is pending. Which next workflow is most appropriate?",
      "fa": "در غربالگری برای نخستین بار یک کدورت موضعی دیده می‌شود. تصاویر قبلی هنوز در دسترس نیستند و بررسی تشخیصی انجام نشده است. کدام روند بعدی مناسب‌تر است؟"
    },
    "options": [
      {
        "de": "Eine mammographische Kurzzeitkontrolle nach sechs Monaten vorsehen",
        "en": "Arrange short-interval mammographic follow-up in six months",
        "fa": "پیگیری کوتاه‌مدت ماموگرافی در شش ماه تعیین شود"
      },
      {
        "de": "Zielgerichtete Zusatzaufnahmen mit Vorvergleich durchführen",
        "en": "Complete targeted additional mammographic views with prior comparison",
        "fa": "نماهای تکمیلی هدفمند با مقایسهٔ تصاویر قبلی انجام شوند"
      },
      {
        "de": "Eine Brust-MRT zur weiteren Charakterisierung vorschalten",
        "en": "Obtain contrast-enhanced breast MRI for further characterisation",
        "fa": "ابتدا MRI پستان با تزریق برای مشخص‌کردن بیشتر یافته انجام شود"
      },
      {
        "de": "Eine stereotaktische Biopsie der auffälligen Region planen",
        "en": "Plan stereotactic tissue sampling of the suspicious area",
        "fa": "نمونه‌برداری استریوتاکتیک از ناحیهٔ مشکوک برنامه‌ریزی شود"
      }
    ],
    "correct": "B",
    "explanation": {
      "de": "Eine unvollständig abgeklärte Screeningauffälligkeit braucht eine nachvollziehbare Beschreibung und gezielte diagnostische Klärung, gegebenenfalls mit Vorvergleich. Endkategorie und Empfehlung folgen den gesicherten Befundmerkmalen.",
      "en": "An incompletely assessed screening finding needs a clear description and targeted diagnostic evaluation, including comparison when available. Final assessment and recommendation follow established findings.",
      "fa": "یافتهٔ غربالگری با بررسی ناکامل به توصیف روشن و ارزیابی تشخیصی هدفمند، در صورت امکان با مقایسه، نیاز دارد. ارزیابی نهایی و توصیه از ویژگی‌های مشخص‌شدهٔ یافته نتیجه می‌شوند."
    },
    "wrong": {
      "A": {
        "de": "Eine Kurzzeitkontrolle setzt eine ausreichend abgeklärte, wahrscheinlich benigne Konstellation voraus; diese ist hier noch nicht festgestellt.",
        "en": "Short-interval follow-up requires an adequately assessed probably benign finding, which has not yet been established.",
        "fa": "پیگیری کوتاه‌مدت مستلزم یافتهٔ احتمالاً خوش‌خیم با بررسی کافی است؛ این وضعیت هنوز مشخص نشده است."
      },
      "C": {
        "de": "MRT ist nicht der routinemäßige erste Ersatz für die ausstehende mammographische Problemlösung und den Vorvergleich.",
        "en": "MRI is not the routine first substitute for pending mammographic problem-solving and prior comparison.",
        "fa": "MRI جایگزین روتین اولیه برای بررسی تکمیلی ماموگرافیک و مقایسهٔ تصاویر قبلی نیست."
      },
      "D": {
        "de": "Vor Festlegung des Biopsiezugangs muss die Auffälligkeit diagnostisch charakterisiert und lokalisiert werden.",
        "en": "The finding needs diagnostic characterisation and localisation before the biopsy route is selected.",
        "fa": "پیش از انتخاب مسیر بیوپسی، یافته باید به‌طور تشخیصی مشخص و مکان‌یابی شود."
      }
    },
    "source": "https://www.acr.org/Clinical-Resources/Clinical-Tools-and-Reference/Reporting-and-Data-Systems/BI-RADS",
    "difficulty": 2
  },
  {
    "id": "composition-c",
    "question": {
      "de": "Eine 58-jährige Frau hat einen neuen fokalen Tastbefund. Die diagnostische Mammographie ist negativ, bei heterogen dichter Brust (Composition C). Welche ergänzende Bildgebung ist zunächst am besten geeignet?",
      "en": "A 58-year-old woman has a new focal palpable finding. Diagnostic mammography is negative in heterogeneously dense breasts (composition C). Which additional imaging is most appropriate next?",
      "fa": "زن ۵۸ ساله یافتهٔ موضعی قابل لمس جدید دارد. ماموگرافی تشخیصی در پستان با تراکم ناهمگون (ترکیب C) منفی است. کدام تصویربرداری تکمیلی در گام بعدی مناسب‌تر است؟"
    },
    "options": [
      {
        "de": "Mammographische Kontrolle nach sechs Monaten",
        "en": "Mammographic follow-up in six months",
        "fa": "پیگیری ماموگرافی پس از شش ماه"
      },
      {
        "de": "Kontrastverstärkte Brust-MRT",
        "en": "Contrast-enhanced breast MRI",
        "fa": "MRI پستان با تزریق"
      },
      {
        "de": "Gezielte Sonografie der tastbaren Region",
        "en": "Targeted ultrasound of the palpable area",
        "fa": "سونوگرافی هدفمند ناحیهٔ قابل لمس"
      },
      {
        "de": "Kontrastverstärkte Mammographie (CEM)",
        "en": "Contrast-enhanced mammography (CEM)",
        "fa": "ماموگرافی با تزریق مادهٔ حاجب (CEM)"
      }
    ],
    "correct": "C",
    "explanation": {
      "de": "Dichtes Gewebe kann kleine nichtverkalkte Läsionen maskieren. Bei einer mindestens 40-jährigen Frau mit neuem Tastbefund und negativer Mammographie ist die gezielte Sonografie der passende nächste Bildgebungsschritt. Klinisch suspekte Diskordanz erfordert weitere Abklärung auch bei negativer Bildgebung.",
      "en": "Dense tissue can obscure small noncalcified lesions. In a woman aged 40 or older with a new palpable finding and negative mammography, targeted ultrasound is the appropriate next imaging step. Clinically suspicious discordance warrants further assessment even with negative imaging.",
      "fa": "بافت متراکم می‌تواند ضایعات کوچک بدون کلسیفیکاسیون را پنهان کند. در زن ۴۰ ساله یا بالاتر با یافتهٔ قابل لمس جدید و ماموگرافی منفی، سونوگرافی هدفمند گام تصویربرداری بعدی مناسب است. عدم تطابق با یافتهٔ بالینی مشکوک حتی در تصویربرداری منفی به بررسی بیشتر نیاز دارد."
    },
    "wrong": {
      "A": {
        "de": "Eine noch nicht vollständig abgeklärte neue Tastauffälligkeit wird nicht durch eine isolierte Sechsmonats-Mammographiekontrolle geklärt.",
        "en": "Isolated six-month mammographic follow-up does not complete evaluation of a new unresolved palpable finding.",
        "fa": "پیگیری منفرد ماموگرافی در شش ماه بررسی یافتهٔ قابل لمس جدید و حل‌نشده را کامل نمی‌کند."
      },
      "B": {
        "de": "MRT ist hier nicht die reguläre nächste Untersuchung vor gezielter Sonografie und klinisch-bildgebender Korrelation.",
        "en": "MRI is not the routine next examination before targeted ultrasound and clinical-imaging correlation here.",
        "fa": "MRI در اینجا پیش از سونوگرافی هدفمند و تطبیق بالینی-تصویری بررسی بعدی روتین نیست."
      },
      "D": {
        "de": "Hier hat die gezielte Sonografie der tastbaren Region Vorrang. Ein negativer Mammographiebefund begründet für sich keine zusätzliche Kontrastmitteluntersuchung.",
        "en": "Targeted ultrasound of the palpable area takes priority here. A negative mammogram does not itself establish an indication for another contrast examination.",
        "fa": "اینجا سونوگرافی هدفمند ناحیهٔ قابل لمس اولویت دارد. ماموگرافی منفی به‌خودی‌خود اندیکاسیون بررسی دیگر با مادهٔ حاجب ایجاد نمی‌کند."
      }
    },
    "source": "https://acsearch.acr.org/docs/69495/Narrative/",
    "difficulty": 2
  },
  {
    "id": "obscured-indistinct",
    "question": {
      "de": "Bei einer mammographischen Mass sind etwa 40% des Randes durch angrenzendes Drüsengewebe verdeckt; der übrige sichtbare Rand ist scharf begrenzt. Welcher Randdeskriptor passt?",
      "en": "About 40% of a mammographic mass margin is hidden by adjacent fibroglandular tissue; the remaining visible margin is sharply defined. Which margin descriptor fits?",
      "fa": "حدود ۴۰٪ حاشیهٔ تودهٔ ماموگرافیک با بافت فیبروگلاندولار مجاور پوشیده است؛ بخش باقی‌ماندهٔ قابل مشاهده حاشیهٔ مشخص دارد. کدام توصیف حاشیه مناسب است؟"
    },
    "options": [
      {
        "de": "Obscured · überlagert",
        "en": "Obscured",
        "fa": "پوشیده (Obscured)"
      },
      {
        "de": "Indistinct · unscharf",
        "en": "Indistinct",
        "fa": "نامشخص (Indistinct)"
      },
      {
        "de": "Spiculated · spikuliert",
        "en": "Spiculated",
        "fa": "اسپیکوله"
      },
      {
        "de": "Circumscribed · umschrieben",
        "en": "Circumscribed",
        "fa": "با حاشیهٔ مشخص (Circumscribed)"
      }
    ],
    "correct": "A",
    "explanation": {
      "de": "Der wesentliche Anteil ist durch normales Gewebe verdeckt, während der sichtbare Rand scharf bleibt: obscured. Dies unterscheidet fehlende Beurteilbarkeit durch Überlagerung von einem tatsächlich unscharfen Rand.",
      "en": "A substantial portion is hidden by normal tissue while the visible edge remains sharply defined: obscured. This distinguishes overlap-limited visibility from a truly indistinct margin.",
      "fa": "بخش قابل توجهی با بافت طبیعی پوشیده شده، در حالی که لبهٔ قابل مشاهده مشخص است: Obscured. این حالت محدودیت دید ناشی از هم‌پوشانی را از حاشیهٔ واقعاً نامشخص جدا می‌کند."
    },
    "wrong": {
      "B": {
        "de": "Indistinct bezeichnet eine echte fehlende Abgrenzung des Randes, nicht bloß dessen Überlagerung durch normales Gewebe.",
        "en": "Indistinct describes a genuinely ill-defined margin rather than overlap by normal tissue.",
        "fa": "Indistinct حاشیهٔ واقعاً نامشخص را توصیف می‌کند، نه صرفاً پوشیده‌شدن با بافت طبیعی."
      },
      "C": {
        "de": "Für spiculated wären vom Rand ausstrahlende Linien erforderlich; solche sind nicht beschrieben.",
        "en": "Spiculated requires radiating lines from the margin, which are not described.",
        "fa": "برای اسپیکوله خطوط شعاعی از حاشیه لازم‌اند؛ چنین خطوطی توصیف نشده‌اند."
      },
      "D": {
        "de": "Nur 60% sind hier scharf sichtbar. Damit ist die für circumscribed geforderte Beurteilbarkeit von mindestens 75% nicht erfüllt.",
        "en": "Only 60% is sharply visible here, below the at least 75% clearly demarcated margin required for circumscribed.",
        "fa": "اینجا فقط ۶۰٪ به‌وضوح دیده می‌شود؛ شرط مشخص‌بودن دست‌کم ۷۵٪ حاشیه برای Circumscribed برقرار نیست."
      }
    },
    "source": "https://www.acr.org/Clinical-Resources/Clinical-Tools-and-Reference/Reporting-and-Data-Systems/BI-RADS",
    "difficulty": 1
  },
  {
    "id": "mass-density",
    "question": {
      "de": "Eine Mass schwächt Röntgenstrahlen stärker ab als ein gleich großes Volumen fibroglandulären Gewebes. Welcher Density-Deskriptor passt?",
      "en": "A mass attenuates x-rays more than an equal volume of fibroglandular tissue. Which density descriptor fits?",
      "fa": "یک توده پرتو ایکس را بیش از حجم برابر بافت فیبروگلاندولار تضعیف می‌کند. کدام توصیف دانسیته مناسب است؟"
    },
    "options": [
      {
        "de": "Equal density",
        "en": "Equal density",
        "fa": "دانسیتهٔ برابر"
      },
      {
        "de": "High density",
        "en": "High density",
        "fa": "دانسیتهٔ بالا"
      },
      {
        "de": "Low density",
        "en": "Low density",
        "fa": "دانسیتهٔ پایین"
      },
      {
        "de": "Fat-containing",
        "en": "Fat-containing",
        "fa": "حاوی چربی"
      }
    ],
    "correct": "B",
    "explanation": {
      "de": "Mass density ist ein Läsionsdescriptor und wird relativ zum fibroglandulären Brustgewebe beurteilt.",
      "en": "Mass density is a lesion descriptor assessed relative to fibroglandular breast tissue.",
      "fa": "دانسیته توده یک دسکریپتور ضایعه است و نسبت به بافت فیبروگلاندولار سنجیده می‌شود."
    },
    "wrong": {
      "A": {
        "de": "Equal density bedeutet eine vergleichbare, nicht stärkere Abschwächung gegenüber gleichvolumigem fibroglandulärem Gewebe.",
        "en": "Equal density means comparable rather than greater attenuation relative to an equal volume of fibroglandular tissue.",
        "fa": "دانسیتهٔ برابر یعنی تضعیف مشابه، نه بیشتر از حجم برابر بافت فیبروگلاندولار."
      },
      "C": {
        "de": "Low density beschreibt geringere, nicht stärkere Abschwächung als der Gewebevergleich.",
        "en": "Low density describes less rather than greater attenuation than the reference tissue.",
        "fa": "دانسیتهٔ پایین تضعیف کمتر، نه بیشتر از بافت مرجع را توصیف می‌کند."
      },
      "D": {
        "de": "Ein Fettanteil ist nicht beschrieben und kann aus hoher Röntgendichte nicht abgeleitet werden.",
        "en": "No fat component is described, and high radiographic density does not establish one.",
        "fa": "جزء چربی توصیف نشده و از دانسیتهٔ رادیوگرافیک بالا نتیجه نمی‌شود."
      }
    },
    "source": "https://www.acr.org/Clinical-Resources/Clinical-Tools-and-Reference/Reporting-and-Data-Systems/BI-RADS",
    "difficulty": 1
  },
  {
    "id": "calc-combination",
    "question": {
      "de": "Welche Kombination von Verkalkungsmerkmalen ist am stärksten malignitätsverdächtig?",
      "en": "Which combination of calcification features is most suspicious for malignancy?",
      "fa": "کدام ترکیب ویژگی کلسیفیکاسیون بیشترین شک به بدخیمی را ایجاد می‌کند؟"
    },
    "options": [
      {
        "de": "Rund und diffus",
        "en": "Round and diffuse",
        "fa": "گرد و منتشر"
      },
      {
        "de": "Amorph und regional",
        "en": "Amorphous and regional",
        "fa": "آمورف و ناحیه‌ای"
      },
      {
        "de": "Grob heterogen und diffus bilateral",
        "en": "Coarse heterogeneous and diffuse bilateral",
        "fa": "درشت ناهمگون و منتشر دوطرفه"
      },
      {
        "de": "Fine linear/branching und segmental",
        "en": "Fine linear/branching and segmental",
        "fa": "ظریف خطی/شاخه‌دار و سگمنتال"
      }
    ],
    "correct": "D",
    "explanation": {
      "de": "Fine linear beziehungsweise branching morphology bildet zusammen mit segmentaler Verteilung ein hochsuspektes duktales Muster.",
      "en": "Fine linear or branching morphology with segmental distribution forms a highly suspicious ductal pattern.",
      "fa": "مورفولوژی ظریف خطی یا شاخه‌دار همراه با توزیع سگمنتال یک الگوی داکتال بسیار مشکوک ایجاد می‌کند."
    },
    "wrong": {
      "A": {
        "de": "Runde, diffus verteilte Verkalkungen sind typischerweise deutlich weniger suspekt als ein duktales Muster.",
        "en": "Round diffusely distributed calcifications are usually far less suspicious than a ductal pattern.",
        "fa": "کلسیفیکاسیون‌های گرد و منتشر معمولاً بسیار کمتر از الگوی داکتال مشکوک‌اند."
      },
      "B": {
        "de": "Amorphe Verkalkungen können abklärungsbedürftig sein, aber regional ist weniger spezifisch als eine segmentale duktale Verteilung.",
        "en": "Amorphous calcifications may need work-up, but regional distribution is less specific than segmental ductal distribution.",
        "fa": "کلسیفیکاسیون آمورف ممکن است نیاز به بررسی داشته باشد، اما توزیع ناحیه‌ای از توزیع داکتال سگمنتال اختصاصیت کمتری دارد."
      },
      "C": {
        "de": "Ein diffuses bilaterales Muster spricht eher gegen einen lokalisierten duktalen Prozess; Kontext und Voraufnahmen bleiben relevant.",
        "en": "A diffuse bilateral pattern is less suggestive of a localised ductal process; context and priors still matter.",
        "fa": "الگوی منتشر دوطرفه کمتر به نفع فرایند داکتال موضعی است؛ زمینه و تصاویر قبلی همچنان مهم‌اند."
      }
    },
    "source": "https://www.acr.org/Clinical-Resources/Clinical-Tools-and-Reference/Reporting-and-Data-Systems/BI-RADS",
    "difficulty": 1
  },
  {
    "id": "asymmetry-workup",
    "question": {
      "de": "Eine asymmetrische Dichte ist nur in der MLO-Projektion sichtbar. Was ist der sinnvollste nächste Schritt?",
      "en": "An asymmetric density is visible only on the MLO view. What is the most appropriate next step?",
      "fa": "دانسیته آسیمتریک فقط در نمای MLO دیده می‌شود. مناسب‌ترین گام بعدی چیست؟"
    },
    "options": [
      {
        "de": "Mammographische Kontrolle nach sechs Monaten",
        "en": "Six-month mammographic follow-up",
        "fa": "پیگیری ماموگرافی پس از شش ماه"
      },
      {
        "de": "Zusatzprojektionen/Spot Compression beziehungsweise DBT",
        "en": "Additional views/spot compression or DBT",
        "fa": "نماهای تکمیلی/فشرده‌سازی موضعی یا DBT"
      },
      {
        "de": "Sonografie als abschließende alleinige Abklärung",
        "en": "Ultrasound as the sole final assessment",
        "fa": "سونوگرافی به‌عنوان تنها بررسی نهایی"
      },
      {
        "de": "Unmittelbare stereotaktische Biopsie",
        "en": "Immediate stereotactic biopsy",
        "fa": "بیوپسی استریوتاکتیک فوری"
      }
    ],
    "correct": "B",
    "explanation": {
      "de": "Eine Ein-Projektions-Asymmetrie kann durch Summation entstehen. Zusatzaufnahmen oder DBT prüfen, ob der Befund persistiert.",
      "en": "A one-view asymmetry may result from summation. Additional views or DBT determine whether it persists.",
      "fa": "آسیمتری تک‌نما ممکن است ناشی از هم‌پوشانی باشد؛ نماهای تکمیلی یا DBT ماندگاری آن را بررسی می‌کنند."
    },
    "wrong": {
      "A": {
        "de": "Die Kurzzeitkontrolle folgt erst einer ausreichend gesicherten wahrscheinlich benignen Einordnung; zunächst muss eine mögliche Summation geklärt werden.",
        "en": "Short-interval follow-up follows an adequately established probably benign assessment; possible summation first requires clarification.",
        "fa": "پیگیری کوتاه‌مدت پس از ارزیابی کافیِ احتمالاً خوش‌خیم مطرح می‌شود؛ ابتدا باید هم‌پوشانی احتمالی روشن شود."
      },
      "C": {
        "de": "Sonografie kann ergänzen; ein negativer Ultraschall allein löst die mammographische Ein-Projektions-Auffälligkeit nicht zuverlässig auf.",
        "en": "Ultrasound may complement evaluation; a negative ultrasound alone does not reliably resolve the one-view mammographic finding.",
        "fa": "سونوگرافی می‌تواند مکمل باشد؛ سونوگرافی منفی به‌تنهایی یافتهٔ ماموگرافیک تک‌نما را با اطمینان حل نمی‌کند."
      },
      "D": {
        "de": "Vor einer Biopsie müssen Persistenz und Zielposition diagnostisch geklärt werden.",
        "en": "Persistence and target location need diagnostic clarification before biopsy.",
        "fa": "پیش از بیوپسی، ماندگاری و محل هدف باید از نظر تشخیصی روشن شوند."
      }
    },
    "source": "https://www.acr.org/Clinical-Resources/Clinical-Tools-and-Reference/Reporting-and-Data-Systems/BI-RADS",
    "difficulty": 2
  },
  {
    "id": "distortion",
    "question": {
      "de": "In zwei mammographischen Projektionen und der DBT konvergieren feine Linien zu einem fokalen Zentrum; eine umschriebene dreidimensionale Mass ist nicht abgrenzbar. Wie wird der Befund beschrieben?",
      "en": "On two mammographic views and DBT, fine lines converge toward a focal centre without a discrete three-dimensional mass. How should this be described?",
      "fa": "در دو نمای ماموگرافی و DBT خطوط ظریف به مرکز موضعی همگرا می‌شوند، بدون تودهٔ سه‌بعدی مشخص. این یافته چگونه توصیف می‌شود؟"
    },
    "options": [
      {
        "de": "Fokale Asymmetrie",
        "en": "Focal asymmetry",
        "fa": "آسیمتری موضعی"
      },
      {
        "de": "Spikulierte Mass",
        "en": "Spiculated mass",
        "fa": "تودهٔ اسپیکوله"
      },
      {
        "de": "Architectural Distortion",
        "en": "Architectural distortion",
        "fa": "دیستورشن معماری"
      },
      {
        "de": "Isolierte diffuse Trabekelverdickung",
        "en": "Isolated diffuse trabecular thickening",
        "fa": "ضخیم‌شدگی منتشر و منفرد ترابکول‌ها"
      }
    ],
    "correct": "C",
    "explanation": {
      "de": "Architectural distortion ist eine Störung der normalen Gewebearchitektur ohne notwendige diskrete Mass.",
      "en": "Architectural distortion is disruption of normal tissue architecture without necessarily forming a discrete mass.",
      "fa": "دیستورشن معماری اختلال معماری طبیعی بافت است و الزاماً توده مشخصی ایجاد نمی‌کند."
    },
    "wrong": {
      "A": {
        "de": "Die fokale Linienkonvergenz kennzeichnet eine Architekturstörung über eine reine asymmetrische Gewebedichte hinaus.",
        "en": "Focal line convergence indicates architectural disruption beyond asymmetric tissue density alone.",
        "fa": "همگرایی موضعی خطوط اختلال معماری را فراتر از دانسیتهٔ آسیمتریک صرف نشان می‌دهد."
      },
      "B": {
        "de": "Einzelne strahlige Linien machen ohne abgrenzbare Mass noch keine spikulierte Mass.",
        "en": "Radiating lines without a discrete mass do not establish a spiculated mass.",
        "fa": "خطوط شعاعی بدون تودهٔ مشخص، تودهٔ اسپیکوله را تعیین نمی‌کنند."
      },
      "D": {
        "de": "Beschrieben ist eine umschriebene Konvergenz, keine diffuse Verdickung des Trabekelnetzes.",
        "en": "A focal convergence is described, not diffuse thickening of the trabecular network.",
        "fa": "همگرایی موضعی توصیف شده است، نه ضخیم‌شدن منتشر شبکهٔ ترابکولار."
      }
    },
    "source": "https://www.acr.org/Clinical-Resources/Clinical-Tools-and-Reference/Reporting-and-Data-Systems/BI-RADS",
    "difficulty": 1
  },
  {
    "id": "cem-calc",
    "question": {
      "de": "Segmentale fine pleomorphe Verkalkungen zeigen in CEM kein Enhancement. Welche Konsequenz ist korrekt?",
      "en": "Segmental fine pleomorphic calcifications show no enhancement on CEM. What is the correct consequence?",
      "fa": "کلسیفیکاسیون ظریف پلئومورفیک سگمنتال در CEM تقویت پس از تزریق ندارد. پیامد درست چیست؟"
    },
    "options": [
      {
        "de": "Rückkehr zum Routine-Screening",
        "en": "Return to routine screening",
        "fa": "بازگشت به غربالگری روتین"
      },
      {
        "de": "Mammographisch gesteuerte Gewebediagnostik planen",
        "en": "Plan mammography-guided tissue sampling",
        "fa": "نمونه‌برداری بافتی تحت هدایت ماموگرافی برنامه‌ریزی شود"
      },
      {
        "de": "Mammographische Kontrolle nach sechs Monaten",
        "en": "Six-month mammographic follow-up",
        "fa": "پیگیری ماموگرافی پس از شش ماه"
      },
      {
        "de": "Zuerst MRT; Biopsieentscheidung vom MRT-Enhancement abhängig machen",
        "en": "MRI first; base the biopsy decision on MRI enhancement",
        "fa": "ابتدا MRI؛ تصمیم بیوپسی بر اساس تقویت در MRI گرفته شود"
      }
    ],
    "correct": "B",
    "explanation": {
      "de": "Fehlende Jodaufnahme entkräftet suspekte Verkalkungsmorphologie nicht; insbesondere DCIS kann ohne auffälliges CEM-Enhancement vorliegen.",
      "en": "Absent iodine uptake does not negate suspicious calcification morphology; DCIS may lack conspicuous CEM enhancement.",
      "fa": "نبود جذب ید مورفولوژی مشکوک کلسیفیکاسیون را خنثی نمی‌کند؛ DCIS ممکن است تقویت پس از تزریق واضح در CEM نداشته باشد."
    },
    "wrong": {
      "A": {
        "de": "Fehlendes CEM-Enhancement entkräftet die suspekte Kalkmorphologie nicht; Rückkehr zum Screening wäre hier nicht begründet.",
        "en": "Absent CEM enhancement does not negate suspicious calcification morphology; return to screening is not justified here.",
        "fa": "نبود تقویت در CEM مورفولوژی مشکوک کلسیفیکاسیون را رد نمی‌کند؛ بازگشت به غربالگری در اینجا توجیه ندارد."
      },
      "C": {
        "de": "Die beschriebene suspekte Morphologie ist keine ausreichend begründete wahrscheinlich benigne Konstellation für alleinige Kurzzeitkontrolle.",
        "en": "The suspicious morphology described does not establish a probably benign finding suitable for short-interval follow-up alone.",
        "fa": "مورفولوژی مشکوک توصیف‌شده، یافتهٔ احتمالاً خوش‌خیم مناسب برای پیگیری کوتاه‌مدتِ تنها را تعیین نمی‌کند."
      },
      "D": {
        "de": "Eine weitere Kontrastmitteluntersuchung ist kein verlässlicher Filter, um die Gewebediagnostik suspekter Verkalkungen von Enhancement abhängig zu machen.",
        "en": "Another contrast examination is not a reliable filter for making tissue diagnosis of suspicious calcifications conditional on enhancement.",
        "fa": "بررسی دیگر با مادهٔ حاجب فیلتر قابل اتکایی برای وابسته‌کردن نمونه‌برداری کلسیفیکاسیون مشکوک به وجود تقویت نیست."
      }
    },
    "source": "https://doi.org/10.1177/0284185118822639",
    "difficulty": 2
  },
  {
    "id": "birads-6",
    "question": {
      "de": "Vor Beginn einer Therapie wird die bildgebend sichtbare Läsion beurteilt, für die bereits eine konkordante maligne Stanzbiopsie vorliegt. Welche Assessment-Bezeichnung passt?",
      "en": "Before treatment, imaging evaluates the visible lesion already shown malignant by a concordant core biopsy. Which assessment description fits?",
      "fa": "پیش از درمان، ضایعهٔ قابل مشاهده‌ای بررسی می‌شود که بدخیمی آن با بیوپسی سوزنیِ همخوان تأیید شده است. کدام عنوان ارزیابی مناسب است؟"
    },
    "options": [
      {
        "de": "Bildgebung hochgradig suspekt, aber noch ohne Biopsie",
        "en": "Imaging highly suspicious but not yet biopsied",
        "fa": "تصویربرداری بسیار مشکوک، هنوز بدون بیوپسی"
      },
      {
        "de": "Unvollständige Untersuchung",
        "en": "Incomplete examination",
        "fa": "بررسی ناکامل"
      },
      {
        "de": "Bereits histologisch gesicherte Malignität",
        "en": "Known biopsy-proven malignancy",
        "fa": "بدخیمی اثبات‌شده با بیوپسی"
      },
      {
        "de": "Wahrscheinlich benigne Läsion",
        "en": "Probably benign lesion",
        "fa": "ضایعه احتمالاً خوش‌خیم"
      }
    ],
    "correct": "C",
    "explanation": {
      "de": "BI-RADS 6 kennzeichnet ein bereits biopsiebestätigtes Malignom; es ist keine höhere morphologische Verdachtsstufe als Kategorie 5.",
      "en": "BI-RADS 6 denotes biopsy-proven malignancy; it is not a higher morphologic suspicion level than category 5.",
      "fa": "BI-RADS 6 بدخیمی اثبات‌شده با بیوپسی را نشان می‌دهد و درجه مورفولوژیک بالاتری از دسته 5 نیست."
    },
    "wrong": {
      "A": {
        "de": "Ein hochgradig suspekter, noch nicht gesicherter Befund entspricht BI-RADS 5.",
        "en": "A highly suspicious finding not yet proven by biopsy corresponds to BI-RADS 5.",
        "fa": "یافته بسیار مشکوک که هنوز با بیوپسی اثبات نشده، BI-RADS 5 است."
      },
      "B": {
        "de": "Eine unvollständige Untersuchung mit Bedarf an Zusatzbildgebung entspricht BI-RADS 0.",
        "en": "An incomplete examination requiring additional imaging is BI-RADS 0.",
        "fa": "بررسی ناکامل نیازمند تصویربرداری بیشتر BI-RADS 0 است."
      },
      "D": {
        "de": "Ein wahrscheinlich benigner Befund mit kurzfristiger Kontrolle entspricht BI-RADS 3.",
        "en": "A probably benign finding with short-interval follow-up is BI-RADS 3.",
        "fa": "یافته احتمالاً خوش‌خیم با پیگیری کوتاه‌مدت BI-RADS 3 است."
      }
    },
    "source": "https://www.acr.org/Clinical-Resources/Clinical-Tools-and-Reference/Reporting-and-Data-Systems/BI-RADS",
    "difficulty": 1
  },
  {
    "id": "case-final",
    "question": {
      "de": "Neue fine pleomorphe Verkalkungen sind segmental verteilt. Ein Ultraschallkorrelat fehlt. Welche Aussage ist richtig?",
      "en": "New fine pleomorphic calcifications have segmental distribution. No ultrasound correlate is found. Which statement is correct?",
      "fa": "کلسیفیکاسیون‌های ظریف پلئومورفیک جدید توزیع سگمنتال دارند و همبستگی سونوگرافی یافت نمی‌شود. کدام عبارت درست است؟"
    },
    "options": [
      {
        "de": "Gezielte Sonografie in sechs Monaten wiederholen",
        "en": "Repeat targeted ultrasound in six months",
        "fa": "سونوگرافی هدفمند پس از شش ماه تکرار شود"
      },
      {
        "de": "Eine kontrastverstärkte MRT vor der Biopsieentscheidung einplanen",
        "en": "Obtain contrast-enhanced MRI before deciding on biopsy",
        "fa": "پیش از تصمیم بیوپسی، MRI با تزریق انجام شود"
      },
      {
        "de": "Mammographisch/DBT-gesteuerte Gewebediagnostik planen",
        "en": "Plan mammography/DBT-guided tissue sampling",
        "fa": "نمونه‌برداری بافتی تحت هدایت ماموگرافی/DBT برنامه‌ریزی شود"
      },
      {
        "de": "Eine ultraschallgesteuerte Biopsie anhand der ungefähren Lage planen",
        "en": "Plan ultrasound-guided biopsy using the approximate location",
        "fa": "بیوپسی تحت هدایت سونوگرافی بر اساس محل تقریبی برنامه‌ریزی شود"
      }
    ],
    "correct": "C",
    "explanation": {
      "de": "Die Indikation folgt dem suspekten mammographischen Muster. Ein fehlendes Sonographiekorrelat ändert den geeigneten Biopsiezugang, nicht die Risikobewertung.",
      "en": "The indication follows the suspicious mammographic pattern. Lack of an ultrasound correlate changes the biopsy route, not the risk assessment.",
      "fa": "اندیکاسیون بر اساس الگوی مشکوک ماموگرافی است؛ نبود همبستگی سونوگرافی مسیر بیوپسی را تغییر می‌دهد، نه ارزیابی خطر را."
    },
    "wrong": {
      "A": {
        "de": "Die mammographisch suspekte Kalkgruppe wird durch sonografische Verlaufskontrolle ohne sichtbares Korrelat nicht adäquat abgeklärt.",
        "en": "Ultrasound follow-up without a visible correlate does not adequately evaluate suspicious mammographic calcifications.",
        "fa": "پیگیری سونوگرافی بدون همبستگی قابل مشاهده، کلسیفیکاسیون مشکوک ماموگرافیک را به‌طور مناسب بررسی نمی‌کند."
      },
      "B": {
        "de": "Die Gewebediagnostik folgt dem suspekten Kalkmuster und soll nicht vom Ergebnis einer vorgeschalteten MRT abhängig gemacht werden.",
        "en": "Tissue diagnosis follows the suspicious calcification pattern and should not be made conditional on a preceding MRI result.",
        "fa": "نمونه‌برداری از الگوی مشکوک کلسیفیکاسیون نتیجه می‌شود و نباید به نتیجهٔ MRI پیش از آن وابسته شود."
      },
      "D": {
        "de": "Eine gezielte ultraschallgesteuerte Biopsie braucht ein sicher zugeordnetes sichtbares Korrelat; eine ungefähre Lage reicht nicht.",
        "en": "Targeted ultrasound-guided biopsy requires a confidently matched visible correlate; an approximate location is insufficient.",
        "fa": "بیوپسی هدفمند تحت هدایت سونوگرافی به همبستگی قابل مشاهده و با تطابق مطمئن نیاز دارد؛ محل تقریبی کافی نیست."
      }
    },
    "source": "https://doi.org/10.1177/0284185118822639",
    "difficulty": 2
  }
]

export const MAMMOGRAPHY_BASICS_QUESTIONS = Object.fromEntries(['de','en','fa'].map(lang => [lang, QUESTIONS.map(item => ({
  id:`mammographie-grundlagen-${lang}-${item.id}`, tags:['mammographie-grundlagen','mamma','mammographie','bi-rads'], fach:'mamma', question:item.question[lang],
  options:item.options.map((text,index)=>({id:String.fromCharCode(65+index),text:text[lang]})), correct:item.correct, explanation:item.explanation[lang], source:item.source, difficulty:item.difficulty,
  wrongExplanations:Object.fromEntries(Object.entries(item.wrong).map(([id,text])=>[id,text[lang]])),
}))]))

const CARDS = [
  [
    "Systematik",
    "Warum wird der Befund vor der BI-RADS-Kategorie beschrieben?",
    "Damit das Assessment nachvollziehbar aus objektiven Deskriptoren und dem Vergleich mit Voraufnahmen abgeleitet wird.",
    "BI-RADS ist das Ergebnis der Analyse, nicht ihr Ausgangspunkt.",
    "System",
    "Why describe the finding before assigning BI-RADS?",
    "So the assessment follows transparently from objective descriptors and comparison with priors.",
    "BI-RADS is the result of analysis, not its starting point.",
    "سیستماتیک",
    "چرا یافته پیش از تعیین دسته BI-RADS توصیف می‌شود؟",
    "تا ارزیابی به‌طور شفاف از دسکریپتورهای عینی و مقایسه با تصاویر قبلی نتیجه شود.",
    "BI-RADS نتیجه تحلیل است، نه نقطه آغاز آن."
  ],
  [
    "Composition",
    "Was ist der Masking-Effekt?",
    "Dichtes fibroglanduläres Gewebe kann eine ähnlich dichte, insbesondere nichtverkalkte Läsion überdecken.",
    "Die Composition beschreibt deshalb auch die erwartbare Sensitivität der Mammographie.",
    "Composition",
    "What is the masking effect?",
    "Dense fibroglandular tissue may obscure a similarly dense, especially non-calcified lesion.",
    "Composition therefore also conveys expected mammographic sensitivity.",
    "ترکیب بافت",
    "اثر پنهان‌کنندگی چیست؟",
    "بافت فیبروگلاندولار متراکم می‌تواند ضایعه‌ای با دانسیته مشابه، به‌ویژه بدون کلسیفیکاسیون، را پنهان کند.",
    "بنابراین ترکیب بافت حساسیت مورد انتظار ماموگرافی را نیز بیان می‌کند."
  ],
  [
    "Mass",
    "Welche drei Merkmalsgruppen beschreiben eine Mass?",
    "Form, Rand und relative Röntgendichte.",
    "Diese Reihenfolge hält Form, Randqualität und relative Röntgendichte getrennt.",
    "Mass",
    "Which three feature groups describe a mass?",
    "Shape, margin and density.",
    "This separates form, edge quality and relative radiographic density.",
    "توده",
    "کدام سه گروه ویژگی یک توده را توصیف می‌کنند؟",
    "شکل، حاشیه و دانسیته.",
    "این ترتیب فرم، کیفیت حاشیه و دانسیته نسبی رادیوگرافیک را جدا نگه می‌دارد."
  ],
  [
    "Margin",
    "Was ist der Unterschied zwischen obscured und indistinct?",
    "Obscured: Rand durch Gewebe überlagert und nicht beurteilbar. Indistinct: sichtbarer Rand tatsächlich unscharf.",
    "Nicht Sichtbarkeit und echte Randqualität miteinander verwechseln.",
    "Margin",
    "What is the difference between obscured and indistinct?",
    "Obscured: overlying tissue prevents margin assessment. Indistinct: the visible margin is truly ill-defined.",
    "Do not confuse visibility with actual margin quality.",
    "حاشیه",
    "تفاوت پوشیده (Obscured) و نامشخص (Indistinct) چیست؟",
    "پوشیده (Obscured): بافت روی‌هم‌افتاده مانع ارزیابی بخشی از حاشیه است و بخش قابل مشاهده مشخص است. نامشخص (Indistinct): خود حاشیه واقعاً نامشخص است.",
    "قابلیت مشاهده را با کیفیت واقعی حاشیه اشتباه نکنید."
  ],
  [
    "Kalk",
    "Welche zwei Eigenschaften müssen bei Verkalkungen immer kombiniert werden?",
    "Morphologie und Distribution.",
    "Morphologie beschreibt die Einzelpartikel; Distribution beschreibt ihre räumliche Anordnung.",
    "Calcifications",
    "Which two properties must always be combined for calcifications?",
    "Morphology and distribution.",
    "Morphology describes individual particles; distribution describes spatial arrangement.",
    "کلسیفیکاسیون",
    "کدام دو ویژگی کلسیفیکاسیون باید همیشه ترکیب شوند؟",
    "مورفولوژی و توزیع.",
    "مورفولوژی ذرات منفرد و توزیع آرایش فضایی آن‌ها را توصیف می‌کند."
  ],
  [
    "Kalk",
    "Welche Kalkkombination ist besonders suspekt auf einen duktalen Prozess?",
    "Fine linear oder fine-linear branching mit linearer beziehungsweise segmentaler Distribution.",
    "Form und Verteilung können gemeinsam den Verlauf eines Gangsystems widerspiegeln.",
    "Calcifications",
    "Which calcification combination is particularly suspicious for a ductal process?",
    "Fine linear or fine-linear branching with linear or segmental distribution.",
    "Together, morphology and distribution may mirror a ductal system.",
    "کلسیفیکاسیون",
    "کدام ترکیب کلسیفیکاسیون به‌ویژه به فرایند داکتال مشکوک است؟",
    "ظریف خطی یا ظریف خطی شاخه‌دار با توزیع خطی یا سگمنتال.",
    "مورفولوژی و توزیع با هم می‌توانند مسیر سیستم مجاری را بازتاب دهند."
  ],
  [
    "Asymmetrie",
    "Welche Kernfrage steuert die Abklärung einer möglichen Summationsasymmetrie?",
    "Persistiert der Befund nach Auflösung der Gewebeüberlagerung?",
    "DBT, Spot Compression und Zusatzprojektionen prüfen diese Frage.",
    "Asymmetry",
    "What key question guides work-up of a possible summation asymmetry?",
    "Does the finding persist after tissue overlap is resolved?",
    "DBT, spot compression and additional projections test this.",
    "آسیمتری",
    "کدام سؤال کلیدی بررسی آسیمتری احتمالی ناشی از هم‌پوشانی را هدایت می‌کند؟",
    "آیا یافته پس از رفع هم‌پوشانی بافت باقی می‌ماند؟",
    "DBT، فشرده‌سازی موضعی و نماهای تکمیلی این سؤال را بررسی می‌کنند."
  ],
  [
    "Distortion",
    "Kann ein Mammakarzinom ohne sichtbare Mass imponieren?",
    "Ja. Eine Architectural Distortion oder suspekte Verkalkungen können die einzige Manifestation sein.",
    "Das Fehlen einer Mass ist kein Ausschlusskriterium.",
    "Distortion",
    "Can breast cancer present without a visible mass?",
    "Yes. Architectural distortion or suspicious calcifications may be the only manifestation.",
    "Absence of a mass is not an exclusion criterion.",
    "دیستورشن",
    "آیا سرطان پستان می‌تواند بدون توده قابل مشاهده ظاهر شود؟",
    "بله. دیستورشن معماری یا کلسیفیکاسیون مشکوک ممکن است تنها تظاهر باشد.",
    "نبود توده معیار رد نیست."
  ],
  [
    "DBT",
    "Welches Grundproblem der 2D-Mammographie reduziert die Tomosynthese?",
    "Gewebeüberlagerung durch Projektion aller Strukturen auf ein zweidimensionales Bild.",
    "Schichtdarstellung kann Pseudoläsionen auflösen und echte Distortion besser zeigen.",
    "DBT",
    "What fundamental problem of 2D mammography does tomosynthesis reduce?",
    "Tissue overlap caused by projecting all structures onto a two-dimensional image.",
    "Slice display may resolve pseudolesions and reveal true distortion better.",
    "DBT",
    "توموسنتز کدام مشکل بنیادی ماموگرافی دوبعدی را کاهش می‌دهد؟",
    "هم‌پوشانی بافت ناشی از تصویر شدن همه ساختارها روی یک تصویر دوبعدی.",
    "نمایش لایه‌ای می‌تواند ضایعات کاذب را برطرف و دیستورشن واقعی را بهتر نشان دهد."
  ],
  [
    "CEM",
    "Darf fehlendes Enhancement suspekte Verkalkungen entwarnen?",
    "Nein. Die suspekte Morphologie auf dem Low-Energy-Bild bleibt maßgeblich.",
    "Insbesondere DCIS kann durch Verkalkungen auffallen, ohne deutlich anzureichern.",
    "CEM",
    "May absent enhancement reassure in suspicious calcifications?",
    "No. Suspicious morphology on the low-energy image remains decisive.",
    "DCIS in particular may present with calcifications without conspicuous enhancement.",
    "CEM",
    "آیا نبود تقویت پس از تزریق می‌تواند کلسیفیکاسیون مشکوک را بی‌خطر نشان دهد؟",
    "خیر. مورفولوژی مشکوک در تصویر کم‌انرژی همچنان تعیین‌کننده است.",
    "به‌ویژه DCIS می‌تواند با کلسیفیکاسیون و بدون تقویت پس از تزریق واضح ظاهر شود."
  ],
  [
    "BI-RADS",
    "Warum ist BI-RADS 6 nicht „schlimmer“ als BI-RADS 5?",
    "Kategorie 6 bezeichnet den Nachweisstatus: Die Malignität ist bereits histologisch gesichert.",
    "Kategorie 5 beschreibt dagegen einen noch nicht zwingend biopsiebestätigten, hochgradigen Bildverdacht.",
    "BI-RADS",
    "Why is BI-RADS 6 not “worse” than BI-RADS 5?",
    "Category 6 describes proof status: malignancy is already biopsy-proven.",
    "Category 5 describes highly suspicious imaging that may not yet be biopsy-proven.",
    "BI-RADS",
    "چرا BI-RADS 6 «بدتر» از BI-RADS 5 نیست؟",
    "دسته 6 وضعیت اثبات را نشان می‌دهد: بدخیمی قبلاً با بیوپسی تأیید شده است.",
    "دسته 5 شک بسیار بالای تصویربرداری را نشان می‌دهد که ممکن است هنوز با بیوپسی اثبات نشده باشد."
  ],
  [
    "Klinischer Tastbefund",
    "Welcher Bildgebungsschritt folgt bei einer Frau ab 40 mit neuem Tastbefund und negativer diagnostischer Mammographie?",
    "Gezielte Sonografie der tastbaren Region.",
    "Ein klinisch suspekter Befund bleibt auch bei negativer Bildgebung weiter abklärungsbedürftig.",
    "Palpable finding",
    "Which imaging step follows a new palpable finding and negative diagnostic mammography in a woman aged 40 or older?",
    "Targeted ultrasound of the palpable area.",
    "A clinically suspicious finding warrants further assessment even if imaging is negative.",
    "یافتهٔ قابل لمس",
    "در زن ۴۰ ساله یا بالاتر با یافتهٔ قابل لمس جدید و ماموگرافی تشخیصی منفی، گام تصویربرداری بعدی چیست؟",
    "سونوگرافی هدفمند ناحیهٔ قابل لمس.",
    "یافتهٔ بالینی مشکوک حتی با تصویربرداری منفی همچنان به بررسی بیشتر نیاز دارد."
  ]
]

export const MAMMOGRAPHY_BASICS_FLASHCARDS = CARDS.map((item,index)=>({id:`mammographie-grundlagen-${String(index+1).padStart(2,'0')}`,topicId:'mammographie-grundlagen',category:L(item[0],item[4],item[8]),front:L(item[1],item[5],item[9]),answer:L(item[2],item[6],item[10]),explanation:L(item[3],item[7],item[11]),source:index===11?'https://acsearch.acr.org/docs/69495/Narrative/':index===9?'https://doi.org/10.1177/0284185118822639':'https://www.acr.org/Clinical-Resources/Clinical-Tools-and-Reference/Reporting-and-Data-Systems/BI-RADS'}))
export const MAMMOGRAPHY_BASICS_FLASHCARD_TOPIC = {id:'mammographie-grundlagen',area:'Mamma',chapter:'Bildgebung · Mammographie',icon:'MG',iconImage:'/fach/mamma.png',color:'#e83668',href:'/flashcards/mammographie-grundlagen',title:L('Mammographie: Grundlagen der Befundung','Mammography: Reporting Fundamentals','ماموگرافی: مبانی گزارش‌نویسی'),subtitle:L('Composition · Mass · Kalk · Asymmetrie · DBT · CEM · BI-RADS','Composition · mass · calcifications · asymmetry · DBT · CEM · BI-RADS','ترکیب بافت · توده · کلسیفیکاسیون · آسیمتری · DBT · CEM · BI-RADS')}
