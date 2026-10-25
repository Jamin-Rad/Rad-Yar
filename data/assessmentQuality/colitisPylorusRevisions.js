// Canonical original-item revisions; stable IDs are assigned by the existing consumer.
export const pylorusBorderlineAdvice={
  "de": "Bei anhaltenden Beschwerden und unklaren oder grenzwertigen Messungen den Befund klinisch abstimmen und eine Wiederholungs-Sonografie oder alternative Abklärung erwägen; nicht allein aus einem Grenzwert ausschließen.",
  "en": "With persistent symptoms and uncertain or borderline measurements, coordinate clinically and consider repeat ultrasound or alternative assessment; do not exclude disease from one threshold alone.",
  "fa": "در علائم ماندگار و اندازه‌های نامطمئن یا مرزی، یافته را با بالین هماهنگ و سونوگرافی تکراری یا بررسی جایگزین را در نظر بگیرید؛ بیماری را فقط از یک حد عددی رد نکنید."
}
export const PRACTICE_REVISIONS={
  "pylorusstenose:dynamic": {
    "prompt": {
      "de": "Der Pylorus wirkt in einem Standbild verdickt, öffnet sich aber wiederholt mit Passage und wechselnder Form. Wie soll der Ultraschallbefund gewertet werden?",
      "en": "The pylorus looks thickened on one still frame but repeatedly opens with passage and changing shape. How should the ultrasound be assessed?",
      "fa": "پیلور در یک تصویر ثابت ضخیم به‌نظر می‌رسد، اما مکرراً با عبور محتویات و تغییر شکل باز می‌شود. سونوگرافی چگونه باید ارزیابی شود؟"
    },
    "options": [
      {
        "de": "Die größte statische Messung als maßgebliche Bestätigung einer fixen Stenose verwenden.",
        "en": "Use the largest static measurement as the determining confirmation of fixed stenosis.",
        "fa": "بزرگ‌ترین اندازهٔ ثابت را تأیید تعیین‌کنندهٔ تنگی ثابت بدانید."
      },
      {
        "de": "Dynamische Öffnung und Variabilität zusammen mit korrekt erhobenen Muskelmaßen und Klinik beurteilen.",
        "en": "Assess dynamic opening and variability together with correctly obtained muscle measurements and clinical findings.",
        "fa": "بازشدن پویا و تغییرپذیری را همراه با اندازه‌گیری درست عضله و بالین بررسی کنید."
      },
      {
        "de": "Die beobachtete Passage spricht für ein frühes HPS-Stadium mit bereits fixer Muskelhypertrophie.",
        "en": "The observed passage favours early HPS with already fixed muscular hypertrophy.",
        "fa": "عبور مشاهده‌شده به نفع مرحلهٔ زودرس HPS با هیپرتروفی عضلانی از قبل ثابت است."
      },
      {
        "de": "Die wiederholte Öffnung spricht für einen normalen Pylorus trotz der wechselnden Verdickung.",
        "en": "Repeated opening favours a normal pylorus despite the variable thickening.",
        "fa": "بازشدن مکرر به نفع پیلور طبیعی، با وجود ضخیم‌شدگی متغیر است."
      }
    ],
    "answer": 1,
    "explanation": {
      "de": "Pylorospasmus kann zeitweise dieselben Größen erreichen wie HPS. Wiederholte Öffnung und wechselnde Morphologie sind wichtige Hinweise, aber eine geringe Passage allein schließt HPS nicht aus. Morphometrie, Dynamik und Klinik gemeinsam beurteilen.",
      "en": "Pylorospasm can transiently overlap HPS measurements. Repeated opening and changing morphology are important clues, but a small amount of passage alone does not exclude HPS. Interpret morphology, dynamics and clinical findings together.",
      "fa": "پیلورواسپاسم می‌تواند موقتاً اندازه‌هایی هم‌پوشان با HPS داشته باشد. بازشدن مکرر و تغییر مورفولوژی سرنخ‌های مهم‌اند، اما عبور مقدار کمی مایع به‌تنهایی HPS را رد نمی‌کند. مورفومتری، پویایی و بالین را با هم بررسی کنید."
    },
    "wrongFeedback": {
      "0": {
        "de": "Eine Maximalmessung ignoriert die dokumentierte Variabilität; Spasmus kann einzelne hohe Werte erzeugen.",
        "en": "A maximum measurement ignores the observed variability; spasm may produce isolated high values.",
        "fa": "بیشینهٔ اندازه، تغییرپذیری مشاهده‌شده را نادیده می‌گیرد؛ اسپاسم می‌تواند مقادیر منفرد بالا ایجاد کند."
      },
      "2": {
        "de": "Geringe Passage kann auch bei HPS vorkommen; sie belegt aber keine fixe Hypertrophie. Die dokumentierte Variabilität muss mit korrekt gemessener Muskulatur und Klinik gewertet werden.",
        "en": "Small-volume passage may occur in HPS, but does not demonstrate fixed hypertrophy. The documented variability must be assessed with correctly measured muscle and clinical findings.",
        "fa": "عبور مقدار کمی مایع ممکن است در HPS هم رخ دهد، اما هیپرتروفی ثابت را نشان نمی‌دهد. تغییرپذیری ثبت‌شده باید همراه اندازه‌گیری درست عضله و بالین ارزیابی شود."
      },
      "3": {
        "de": "Öffnung allein unterscheidet einen normalen Pylorus nicht sicher von Spasmus oder HPS. Wechselnde Verdickung verlangt eine gemeinsame morphometrische und dynamische Beurteilung.",
        "en": "Opening alone does not reliably distinguish a normal pylorus from spasm or HPS. Variable thickening requires combined morphometric and dynamic assessment.",
        "fa": "بازشدن به‌تنهایی پیلور طبیعی را با اطمینان از اسپاسم یا HPS تفکیک نمی‌کند. ضخیم‌شدگی متغیر به ارزیابی توأم مورفومتری و پویایی نیاز دارد."
      }
    },
    "front": {
      "de": "Warum die Pylorusöffnung über mehrere Wellen beobachten?",
      "en": "Why observe pyloric opening over several waves?",
      "fa": "چرا بازشدن پیلور را طی چند موج مشاهده می‌کنیم؟"
    },
    "retrieval": {
      "de": "Variabilität und wiederholte Öffnung helfen, Spasmus von persistenter Hypertrophie abzugrenzen. Geringe Passage allein ist kein sicherer Ausschluss einer HPS.",
      "en": "Variability and repeated opening help distinguish spasm from persistent hypertrophy. A small amount of passage alone does not reliably exclude HPS.",
      "fa": "تغییرپذیری و بازشدن مکرر به افتراق اسپاسم از هیپرتروفی پایدار کمک می‌کنند. عبور مقدار کمی مایع به‌تنهایی HPS را با اطمینان رد نمی‌کند."
    },
    "source": "https://pubmed.ncbi.nlm.nih.gov/9805307/"
  },
  "pylorusstenose:measurement": {
    "options": [
      {
        "de": "Außenrand der Vorderwand bis Außenrand der Hinterwand einschließlich Lumen.",
        "en": "Outer anterior wall to outer posterior wall, including the lumen.",
        "fa": "از لبهٔ خارجی دیوارهٔ قدامی تا لبهٔ خارجی دیوارهٔ خلفی، شامل لومن."
      },
      {
        "de": "Eine Wand einschließlich hypoechoischer Muskularis und echogener Mukosa.",
        "en": "One wall including hypoechoic muscularis and echogenic mucosa.",
        "fa": "یک دیواره شامل عضلهٔ کم‌اکو و مخاط اکوژن."
      },
      {
        "de": "Eine einzelne Muskulariswand senkrecht zu ihren Grenzen, ohne Mukosa, Submukosa und Lumen.",
        "en": "One muscularis wall perpendicular to its borders, excluding mucosa, submucosa and lumen.",
        "fa": "یک دیوارهٔ عضلانی عمود بر مرزهای آن، بدون مخاط، زیرمخاط و لومن."
      },
      {
        "de": "Die Längsausdehnung des Pyloruskanals als Wert für die Wanddicke.",
        "en": "The longitudinal pyloric canal length as the wall-thickness measurement.",
        "fa": "طول کانال پیلور به‌عنوان اندازهٔ ضخامت دیواره."
      }
    ],
    "answer": 2,
    "explanation": {
      "de": "Die Muskeldicke ist die Dicke einer einzelnen Muskulariswand, nicht der gesamte Pylorusdurchmesser und nicht die Kanallänge. Andere Wandschichten und das Lumen werden ausgeschlossen; schräges Messen kann die Dicke überschätzen.",
      "en": "Muscle thickness is the thickness of one muscularis wall, not total pyloric diameter or canal length. Exclude other wall layers and the lumen; oblique measurement can overestimate thickness.",
      "fa": "ضخامت عضله، ضخامت یک دیوارهٔ عضلانی است، نه قطر کل پیلور یا طول کانال. لایه‌های دیگر دیواره و لومن را کنار بگذارید؛ اندازه‌گیری مایل می‌تواند ضخامت را بیش‌برآورد کند."
    },
    "wrongFeedback": {
      "0": {
        "de": "Das ist ein Gesamtdurchmesser mit Lumen und zwei Wänden.",
        "en": "That is a total diameter containing the lumen and two walls.",
        "fa": "این قطر کلی شامل لومن و دو دیواره است."
      },
      "1": {
        "de": "Mukosa und andere Wandschichten gehören nicht zur isolierten Muskularismessung.",
        "en": "Mucosa and other wall layers are not part of isolated muscularis measurement.",
        "fa": "مخاط و لایه‌های دیگر دیواره جزو اندازه‌گیری منفرد عضله نیستند."
      },
      "3": {
        "de": "Länge und Dicke sind unterschiedliche Messgrößen und müssen getrennt dokumentiert werden.",
        "en": "Length and thickness are different dimensions and must be recorded separately.",
        "fa": "طول و ضخامت دو بُعد متفاوت‌اند و باید جداگانه ثبت شوند."
      }
    },
    "front": {
      "de": "Welche Struktur wird als Pylorusmuskeldicke gemessen?",
      "en": "Which structure is measured as pyloric muscle thickness?",
      "fa": "کدام ساختار به‌عنوان ضخامت عضلهٔ پیلور اندازه‌گیری می‌شود؟"
    },
    "retrieval": {
      "de": "Eine einzelne Muskulariswand senkrecht messen; Mukosa, Submukosa, Lumen und gegenüberliegende Wand nicht einbeziehen.",
      "en": "Measure one muscularis wall perpendicularly; exclude mucosa, submucosa, lumen and the opposite wall.",
      "fa": "یک دیوارهٔ عضلانی را عمود اندازه بگیرید؛ مخاط، زیرمخاط، لومن و دیوارهٔ مقابل را وارد نکنید."
    },
    "source": "https://doi.org/10.13029/aps.2020.26.1.15"
  },
  "pmc-kolitis:distribution": {
    "prompt": {
      "de": "Nach Antibiotikatherapie bestehen akute Diarrhö und eine segmentale Kolitis mit ausgeprägtem submukösem Ödem. Welche Arbeitsdiagnose sollte in diesem Kontext vorrangig gezielt geprüft werden?",
      "en": "After antibiotic treatment, acute diarrhoea accompanies segmental colitis with marked submucosal oedema. Which working diagnosis should be specifically prioritised for assessment in this context?",
      "fa": "پس از درمان آنتی‌بیوتیکی، اسهال حاد همراه کولیت سگمنتال و ادم واضح زیرمخاطی وجود دارد. در این زمینه، بررسی هدفمند کدام تشخیص کاری باید در اولویت باشد؟"
    },
    "options": [
      {
        "de": "Ischämische Kolitis als führende Erklärung des segmentalen Ödems.",
        "en": "Ischaemic colitis as the leading explanation for segmental oedema.",
        "fa": "کولیت ایسکمیک به‌عنوان علت اصلی ادم سگمنتال."
      },
      {
        "de": "Erstmanifestation einer Colitis ulcerosa als führende Erklärung der akuten Diarrhö.",
        "en": "New-onset ulcerative colitis as the leading explanation for acute diarrhoea.",
        "fa": "اولین تظاهر کولیت اولسروز به‌عنوان علت اصلی اسهال حاد."
      },
      {
        "de": "C.-difficile-assoziierte Kolitis als infektiöse Arbeitsdiagnose nach Antibiotikatherapie.",
        "en": "C. difficile-associated colitis as an infectious working diagnosis after antibiotic treatment.",
        "fa": "کولیت مرتبط با C. difficile به‌عنوان تشخیص کاری عفونی پس از درمان آنتی‌بیوتیکی."
      },
      {
        "de": "Crohn-Kolitis als führende Erklärung der segmentalen Entzündungsverteilung.",
        "en": "Crohn colitis as the leading explanation for segmental inflammation.",
        "fa": "کولیت کرون به‌عنوان علت اصلی توزیع سگمنتال التهاب."
      }
    ],
    "answer": 2,
    "explanation": {
      "de": "PMC kann pancolisch oder segmental auftreten. Wandverdickung und submuköses Ödem sind nicht ätiologiespezifisch; Antibiotikaanamnese und gezielte C.-difficile-Diagnostik gehören zur Einordnung.",
      "en": "PMC may be pancolonic or segmental. Wall thickening and submucosal oedema are not aetiology-specific; antibiotic history and targeted C. difficile testing inform interpretation.",
      "fa": "PMC می‌تواند پان‌کولونیک یا سگمنتال باشد. ضخیم‌شدگی دیواره و ادم زیرمخاطی برای علت اختصاصی نیستند؛ سابقهٔ آنتی‌بیوتیک و آزمایش هدفمند C. difficile به تفسیر کمک می‌کنند."
    },
    "wrongFeedback": {
      "0": {
        "de": "Ischämische Kolitis bleibt eine Differenzialdiagnose. Segmentales Ödem allein priorisiert sie aber nicht gegenüber der durch Antibiotikaanamnese und akute Diarrhö nahegelegten infektiösen Abklärung.",
        "en": "Ischaemic colitis remains a differential diagnosis. Segmental oedema alone does not prioritise it over infectious assessment prompted by antibiotic exposure and acute diarrhoea.",
        "fa": "کولیت ایسکمیک همچنان تشخیص افتراقی است؛ اما ادم سگمنتال به‌تنهایی آن را بر بررسی عفونتِ مطرح در زمینهٔ آنتی‌بیوتیک و اسهال حاد مقدم نمی‌کند."
      },
      "1": {
        "de": "Akute Diarrhö und Ödem sind nicht CU-spezifisch. Im beschriebenen Antibiotikakontext muss eine C.-difficile-Infektion vor vorschneller Zuordnung zu neuer IBD gezielt geprüft werden.",
        "en": "Acute diarrhoea and oedema are not UC-specific. In this antibiotic context, targeted C. difficile assessment is needed before prematurely attributing the findings to new IBD.",
        "fa": "اسهال حاد و ادم مختص CU نیستند. در زمینهٔ آنتی‌بیوتیکِ ذکرشده، پیش از نسبت‌دادن شتاب‌زدهٔ یافته‌ها به IBD جدید، بررسی هدفمند C. difficile لازم است."
      },
      "3": {
        "de": "Segmentaler Befall passt zu mehreren Ursachen, darunter auch C.-difficile-Kolitis. Er macht Crohn ohne weitere typische Befunde nicht zur führenden Erklärung dieses akuten Antibiotikakontexts.",
        "en": "Segmental involvement occurs with several causes, including C. difficile colitis. Without additional characteristic findings, it does not make Crohn the leading explanation in this acute antibiotic context.",
        "fa": "درگیری سگمنتال علل گوناگونی از جمله کولیت C. difficile دارد. بدون یافته‌های مشخصهٔ بیشتر، این توزیع کرون را علت اصلی در زمینهٔ حاد پس از آنتی‌بیوتیک نمی‌کند."
      }
    },
    "front": {
      "de": "Schließt segmentale Kolitis eine PMC aus?",
      "en": "Does segmental colitis exclude PMC?",
      "fa": "آیا کولیت سگمنتال PMC را رد می‌کند؟"
    },
    "retrieval": {
      "de": "Nein. PMC kann segmental oder pancolisch sein; die CT-Verteilung allein legt die Ursache nicht fest.",
      "en": "No. PMC may be segmental or pancolonic; CT distribution alone does not determine aetiology.",
      "fa": "خیر. PMC می‌تواند سگمنتال یا پان‌کولونیک باشد؛ توزیع CT به‌تنهایی علت را تعیین نمی‌کند."
    },
    "source": "https://pubmed.ncbi.nlm.nih.gov/2052723/"
  },
  "pmc-kolitis:accordion": {
    "prompt": {
      "de": "In einer CT mit Kolitis liegt positives luminales Kontrastmittel zwischen stark verdickten Haustren. Welcher Mechanismus erklärt das Accordion-Zeichen?",
      "en": "In CT of colitis, positive luminal contrast lies between markedly thickened haustra. Which mechanism explains the accordion sign?",
      "fa": "در CT کولیت، مادهٔ حاجب مثبت داخل لومن بین هاوسترهای به‌شدت ضخیم قرار دارد. کدام سازوکار علامت آکاردئون را توضیح می‌دهد؟"
    },
    "options": [
      {
        "de": "Kontrastmittel zwischen ödematös verdickten Kolonfalten erzeugt ein alternierendes Faltenmuster.",
        "en": "Contrast between oedematous thickened colonic folds creates an alternating fold pattern.",
        "fa": "مادهٔ حاجب بین چین‌های ادماتو و ضخیم کولون، الگوی متناوب چین‌ها را ایجاد می‌کند."
      },
      {
        "de": "Gas innerhalb der Darmwand erzeugt ein intramurales Blasenmuster.",
        "en": "Gas within the bowel wall creates an intramural bubbly pattern.",
        "fa": "گاز داخل دیوارهٔ روده، الگوی حبابی داخل‌دیواره‌ای ایجاد می‌کند."
      },
      {
        "de": "Ein eingestülptes Darmsegment erzeugt konzentrische Darm-in-Darm-Ringe.",
        "en": "An invaginated bowel segment creates concentric bowel-within-bowel rings.",
        "fa": "یک قطعهٔ فرورفتهٔ روده، حلقه‌های متحدالمرکز روده‌در‌روده ایجاد می‌کند."
      },
      {
        "de": "Verdrehte Mesenterialgefäße erzeugen ein spiralförmiges Gefäßmuster.",
        "en": "Twisted mesenteric vessels create a spiral vascular pattern.",
        "fa": "عروق مزانتریک پیچ‌خورده، الگوی عروقی مارپیچی ایجاد می‌کنند."
      }
    ],
    "answer": 0,
    "explanation": {
      "de": "Das beschriebene Accordion-Muster entsteht durch Kontrastmittel zwischen verdickten ödematösen Falten. Es zeigt ausgeprägte Kolitis beziehungsweise Ödem, beweist aber keinen bestimmten Erreger.",
      "en": "The described accordion pattern arises from contrast between thickened oedematous folds. It indicates marked colitis or oedema but does not prove a specific organism.",
      "fa": "الگوی آکاردئونی توصیف‌شده از مادهٔ حاجب بین چین‌های ضخیم و ادماتو ناشی می‌شود. نشان‌دهندهٔ کولیت یا ادم شدید است، اما عامل عفونی مشخصی را ثابت نمی‌کند."
    },
    "wrongFeedback": {
      "1": {
        "de": "Intramurales Gas beschreibt Pneumatosis, nicht Kontrastmittel zwischen Haustren.",
        "en": "Intramural gas describes pneumatosis, not contrast between haustra.",
        "fa": "گاز داخل دیواره، پنوماتوز است، نه مادهٔ حاجب بین هاوسترها."
      },
      "2": {
        "de": "Darm-in-Darm-Ringe gehören zum Invaginationsmuster, nicht zum beschriebenen Faltenmuster.",
        "en": "Bowel-within-bowel rings belong to intussusception, not the described fold pattern.",
        "fa": "حلقه‌های روده‌در‌روده مربوط به انواژیناسیون‌اند، نه الگوی چین‌های توصیف‌شده."
      },
      "3": {
        "de": "Spiralförmige Mesenterialgefäße entsprechen einem Whirl-Muster; hier wird die Kolonwand beschrieben.",
        "en": "Spiral mesenteric vessels form a whirl pattern; this case describes the colonic wall.",
        "fa": "عروق مزانتریک مارپیچی الگوی ویرل می‌سازند؛ این مورد دیوارهٔ کولون را توصیف می‌کند."
      }
    },
    "front": {
      "de": "Was zeigt das Accordion-Zeichen, und was beweist es nicht?",
      "en": "What does the accordion sign show, and what does it not prove?",
      "fa": "علامت آکاردئون چه چیزی را نشان می‌دهد و چه چیزی را ثابت نمی‌کند؟"
    },
    "retrieval": {
      "de": "Ein ausgeprägtes ödematöses Faltenmuster; es ist kein alleiniger Nachweis einer C.-difficile-Infektion.",
      "en": "Marked oedematous folds; it does not alone prove C. difficile infection.",
      "fa": "الگوی چین‌های به‌شدت ادماتو؛ به‌تنهایی عفونت C. difficile را ثابت نمی‌کند."
    },
    "source": "https://doi.org/10.1148/radiology.211.3.r99jn32743"
  },
  "colitis-ulcerosa:pattern": {
    "options": [
      {
        "de": "Diskontinuierliche Abschnitte mit ausgesparten Zwischenstrecken und relativ geschontem Rektum.",
        "en": "Discontinuous segments with intervening spared bowel and relative rectal sparing.",
        "fa": "قطعات ناپیوسته با بخش‌های بینابینی سالم و حفظ نسبی رکتوم."
      },
      {
        "de": "Isolierte Entzündung des terminalen Ileums bei unauffälligem Kolon.",
        "en": "Isolated terminal ileal inflammation with an unremarkable colon.",
        "fa": "التهاب منفرد ایلئوم انتهایی با کولون بدون یافته."
      },
      {
        "de": "Ein kurzer fokaler Kolonabschnitt mit umschriebener stenosierender Raumforderung.",
        "en": "A short focal colonic segment with a localised stenosing mass.",
        "fa": "قطعهٔ کوتاه و کانونی کولون با تودهٔ تنگ‌کنندهٔ محدود."
      },
      {
        "de": "Kontinuierlicher Befall vom Rektum nach proximal.",
        "en": "Continuous involvement from the rectum proximally.",
        "fa": "درگیری پیوسته از رکتوم به سمت پروگزیمال."
      }
    ],
    "answer": 3,
    "wrongFeedback": {
      "0": {
        "de": "Dieses diskontinuierliche Muster ist nicht die typische unbehandelte CU-Verteilung; es verlangt weitere Differenzialdiagnostik.",
        "en": "This discontinuous pattern is not typical of untreated UC and needs differential assessment.",
        "fa": "این الگوی ناپیوسته، توزیع معمول CU درمان‌نشده نیست و بررسی افتراقی می‌خواهد."
      },
      "1": {
        "de": "Eine isolierte Ileitis beschreibt nicht den typischen rektal beginnenden Kolonbefall einer CU.",
        "en": "Isolated ileitis does not describe the typical rectal-onset colonic distribution of UC.",
        "fa": "ایلئیت منفرد، درگیری معمول کولون با شروع رکتال در CU را توصیف نمی‌کند."
      },
      "2": {
        "de": "Eine fokale stenosierende Raumforderung passt nicht zum typischen kontinuierlichen entzündlichen Verteilungsmuster.",
        "en": "A focal stenosing mass is not the typical continuous inflammatory distribution.",
        "fa": "تودهٔ تنگ‌کنندهٔ کانونی، الگوی معمول توزیع التهابی پیوسته نیست."
      }
    },
    "front": {
      "de": "Welche Verteilung ist bei unbehandelter CU typisch?",
      "en": "Which distribution is typical of untreated UC?",
      "fa": "کدام توزیع در CU درمان‌نشده معمول است؟"
    },
    "retrieval": {
      "de": "Kontinuierlich vom Rektum nach proximal; Ausnahmen und Therapieeffekte sind möglich, Bildverteilung allein ist kein Diagnosenachweis.",
      "en": "Continuous from the rectum proximally; exceptions and treatment effects occur, and distribution alone does not prove the diagnosis.",
      "fa": "پیوسته از رکتوم به پروگزیمال؛ استثناها و اثر درمان ممکن‌اند و توزیع به‌تنهایی تشخیص را ثابت نمی‌کند."
    },
    "source": "https://doi.org/10.1093/ecco-jcc/jjaf106"
  },
  "colitis-ulcerosa:urgent": {
    "prompt": {
      "de": "Bei schwerer Kolitis bestehen eine deutliche Kolondilatation ohne mechanischen Übergang, Fieber und Kreislaufinstabilität. Welcher Komplikationsverdacht muss dringlich kommuniziert werden?",
      "en": "Severe colitis is accompanied by marked colonic dilatation without a mechanical transition, fever and haemodynamic instability. Which suspected complication requires urgent communication?",
      "fa": "کولیت شدید با اتساع واضح کولون بدون نقطهٔ گذار مکانیکی، تب و ناپایداری همودینامیک همراه است. شک به کدام عارضه باید فوری اعلام شود؟"
    },
    "options": [
      {
        "de": "Mechanische Dickdarmobstruktion durch eine fokale Tumorstenose.",
        "en": "Mechanical large-bowel obstruction from a focal tumour stenosis.",
        "fa": "انسداد مکانیکی رودهٔ بزرگ به علت تنگی توموری کانونی."
      },
      {
        "de": "Toxisches Megakolon im Rahmen schwerer Kolitis.",
        "en": "Toxic megacolon complicating severe colitis.",
        "fa": "مگاکولون توکسیک در زمینهٔ کولیت شدید."
      },
      {
        "de": "Chronische Narbenstenose mit vorgeschalteter mechanischer Dilatation.",
        "en": "Chronic scar stenosis with upstream mechanical dilatation.",
        "fa": "تنگی اسکاری مزمن با اتساع مکانیکی بالادست."
      },
      {
        "de": "Isolierte chronische Entfaltungsminderung ohne akute Komplikation.",
        "en": "Isolated chronic loss of distensibility without an acute complication.",
        "fa": "کاهش اتساع‌پذیری مزمن و منفرد بدون عارضهٔ حاد."
      }
    ],
    "answer": 1,
    "wrongFeedback": {
      "0": {
        "de": "Ein fokaler mechanischer Übergang ist nicht beschrieben; Kolitis, Dilatation und systemische Toxizität sprechen für den genannten dringlichen Komplikationsverdacht.",
        "en": "No focal mechanical transition is described; colitis, dilatation and systemic toxicity support the urgent complication concern.",
        "fa": "نقطهٔ گذار مکانیکی کانونی توصیف نشده؛ کولیت، اتساع و سمیت سیستمیک از شک به عارضهٔ فوری حمایت می‌کنند."
      },
      "2": {
        "de": "Eine Narbenstenose erklärt ohne nachgewiesenen Übergang weder das nichtmechanische Dilatationsmuster noch die akute systemische Toxizität hinreichend.",
        "en": "Without a demonstrated transition, scar stenosis does not adequately explain nonmechanical dilatation and acute systemic toxicity.",
        "fa": "بدون نقطهٔ گذار اثبات‌شده، تنگی اسکاری اتساع غیرمکانیکی و سمیت حاد سیستمیک را به‌خوبی توضیح نمی‌دهد."
      },
      "3": {
        "de": "Die akute systemische Instabilität und deutliche Dilatation sind nicht als isolierter chronischer Befund abzutun.",
        "en": "Acute systemic instability and marked dilatation cannot be dismissed as an isolated chronic finding.",
        "fa": "ناپایداری حاد سیستمیک و اتساع واضح را نمی‌توان یافتهٔ مزمن منفرد دانست."
      }
    },
    "front": {
      "de": "Welche Konstellation weckt bei schwerer Kolitis Verdacht auf toxisches Megakolon?",
      "en": "Which findings raise concern for toxic megacolon in severe colitis?",
      "fa": "در کولیت شدید چه مجموعه‌ای شک به مگاکولون توکسیک ایجاد می‌کند؟"
    },
    "retrieval": {
      "de": "Nichtmechanische Kolondilatation zusammen mit systemischer Toxizität: dringlich klinisch kommunizieren, nicht auf Perforation warten.",
      "en": "Nonmechanical colonic dilatation together with systemic toxicity: communicate urgently and do not wait for perforation.",
      "fa": "اتساع غیرمکانیکی کولون همراه با سمیت سیستمیک: فوری به تیم بالینی اطلاع دهید و منتظر پرفوراسیون نمانید."
    },
    "source": "https://doi.org/10.1093/ecco-jcc/jjaf106"
  }
}
