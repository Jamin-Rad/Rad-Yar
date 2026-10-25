const L = (de, en, fa) => ({ de, en, fa })

const questions = [
  {
    "id": "herbert-b4",
    "q": {
      "de": "Textfall: Eine Skaphoidfraktur geht mit perilunärer Karpalluxation einher. Welche Herbert-Untergruppe erfasst diese Kombination?",
      "en": "Text vignette: a scaphoid fracture is accompanied by perilunate carpal dislocation. Which Herbert subtype captures this combination?",
      "fa": "سناریوی متنی: شکستگی اسکافوئید همراه دررفتگی پری‌لونیت کارپ است. کدام زیرگروه هربرت این ترکیب را توصیف می‌کند؟"
    },
    "options": [
      {
        "de": "A1: Tuberkelfraktur",
        "en": "A1: tubercle fracture",
        "fa": "A1: شکستگی تکمه"
      },
      {
        "de": "B2: vollständige Taillenfraktur",
        "en": "B2: complete waist fracture",
        "fa": "B2: شکستگی کامل کمرگاه اسکافوئید"
      },
      {
        "de": "B4: transskaphoidale perilunäre Frakturluxation",
        "en": "B4: trans-scaphoid perilunate fracture-dislocation",
        "fa": "B4: شکستگی-دررفتگی پری‌لونیت ترانس‌اسکافوئید"
      },
      {
        "de": "B3: Fraktur des proximalen Pols",
        "en": "B3: proximal-pole fracture",
        "fa": "B3: شکستگی قطب پروگزیمال"
      }
    ],
    "correct": 2,
    "explanation": {
      "de": "B4 bezeichnet die transskaphoidale perilunäre Frakturluxation. Die Klassifikation ergänzt die morphologische Beschreibung, ersetzt aber nicht die vollständige Beurteilung der Karpalstellung.",
      "en": "B4 describes a trans-scaphoid perilunate fracture-dislocation. The classification supplements the morphology description but does not replace full assessment of carpal alignment.",
      "fa": "B4 به شکستگی-دررفتگی پری‌لونار ترانس‌اسکافوئید اشاره دارد. طبقه‌بندی مکمل توصیف مورفولوژی است و جای ارزیابی کامل راستای کارپ را نمی‌گیرد."
    },
    "wrong": {
      "A": {
        "de": "A1 betrifft den Tuberkel. Die beschriebene begleitende Karpalluxation wird damit nicht erfasst.",
        "en": "A1 concerns the tubercle and does not capture the associated carpal dislocation described.",
        "fa": "A1 تکمه را درگیر می‌کند و دررفتگی همراه کارپِ توصیف‌شده را بیان نمی‌کند."
      },
      "B": {
        "de": "B2 beschreibt die vollständige Taillenfraktur. Die Kombination mit perilunärer Luxation gehört zu B4.",
        "en": "B2 describes a complete waist fracture. The combination with perilunate dislocation belongs to B4.",
        "fa": "B2 شکستگی کامل کمرگاه را توصیف می‌کند؛ ترکیب با دررفتگی پری‌لونیت مربوط به B4 است."
      },
      "D": {
        "de": "B3 lokalisiert die Fraktur am proximalen Pol. B4 bezeichnet das beschriebene Luxationsmuster.",
        "en": "B3 localizes the fracture to the proximal pole. B4 describes the stated fracture-dislocation pattern.",
        "fa": "B3 شکستگی را در قطب پروگزیمال موضع‌یابی می‌کند؛ B4 الگوی شکستگی-دررفتگی توصیف‌شده است."
      }
    },
    "source": "MSK.pdf physical19–20/printed18–19; actual file C:/Users/Drham/OneDrive/Desktop/Lerncore/MSK.pdf; text and fresh110dpi page images read2026-10-25. AO Surgery Reference, Herbert classification, https://surgeryreference.aofoundation.org/orthopedic-trauma/adult-trauma/carpal-bones/further-reading/classifications-for-fractures-of-carpal-bones",
    "difficulty": 2
  },
  {
    "id": "snac-pattern",
    "q": {
      "de": "Textfall: Bei bekannter chronischer Skaphoidpseudarthrose zeigt sich Arthrose am Radiusstyloid und distalen Skaphoidfragment mit mediokarpaler Beteiligung. Das Radiolunargelenk ist erhalten. Welche Einordnung passt am besten?",
      "en": "Text vignette: known chronic scaphoid nonunion is accompanied by arthritis at the radial styloid and distal scaphoid fragment with midcarpal involvement. The radiolunate joint is preserved. Which interpretation fits best?",
      "fa": "سناریوی متنی: در عدم جوش‌خوردن مزمنِ شناخته‌شدهٔ اسکافوئید، آرتروز میان استایلوئید رادیوس و قطعهٔ دیستال اسکافوئید همراه درگیری میدکارپال دیده می‌شود. مفصل رادیولونات حفظ شده است. کدام تفسیر مناسب‌تر است؟"
    },
    "options": [
      {
        "de": "SNAC-Arthrosemuster bei Skaphoidpseudarthrose",
        "en": "SNAC arthritis pattern associated with scaphoid nonunion",
        "fa": "الگوی آرتروز SNAC همراه عدم جوش‌خوردن اسکافوئید"
      },
      {
        "de": "SLAC allein durch primäre SL-Bandinsuffizienz ohne Skaphoidpseudarthrose",
        "en": "SLAC solely from primary SL-ligament insufficiency without scaphoid nonunion",
        "fa": "SLAC صرفاً بر اثر نارسایی اولیهٔ رباط SL بدون عدم جوش‌خوردن اسکافوئید"
      },
      {
        "de": "Isolierte primäre Radiolunararthrose",
        "en": "Isolated primary radiolunate arthritis",
        "fa": "آرتروز اولیهٔ منفرد رادیولونات"
      },
      {
        "de": "Isolierte STT-Arthrose ohne radiokarpale oder mediokarpale Beteiligung",
        "en": "Isolated STT arthritis without radiocarpal or midcarpal involvement",
        "fa": "آرتروز منفرد STT بدون درگیری رادیوکارپال یا میدکارپال"
      }
    ],
    "correct": 0,
    "explanation": {
      "de": "Die bekannte Skaphoidpseudarthrose und das radiale/mediokarpale Arthrosemuster passen zu SNAC. Ein einzelnes Bild erlaubt keine vollständige Stadieneinteilung; die Entwicklung ist nicht bei jeder Pseudarthrose gleich.",
      "en": "Known scaphoid nonunion with radial/midcarpal arthritis fits SNAC. A single image does not allow full staging; progression is not identical in every nonunion.",
      "fa": "عدم جوش‌خوردن شناخته‌شدهٔ اسکافوئید همراه آرتروز رادیال/میدکارپال با SNAC سازگار است. یک تصویر برای مرحله‌بندی کامل کافی نیست؛ سیر در همهٔ موارد عدم جوش‌خوردن یکسان نیست."
    },
    "wrong": {
      "B": {
        "de": "SLAC und SNAC können ähnliche Arthroseverteilungen haben. Hier ist aber eine Skaphoidpseudarthrose ausdrücklich vorgegeben; „ohne Pseudarthrose“ widerspricht dem Fall.",
        "en": "SLAC and SNAC may have similar arthritis distributions. Here scaphoid nonunion is explicitly given; “without nonunion” contradicts the case.",
        "fa": "SLAC و SNAC می‌توانند توزیع مشابه آرتروز داشته باشند؛ اینجا عدم جوش‌خوردن اسکافوئید صراحتاً بیان شده و «بدون عدم جوش‌خوردن» با سناریو تناقض دارد."
      },
      "C": {
        "de": "Das Radiolunargelenk ist im Fall erhalten; die Arthrose liegt radial und mediokarpal.",
        "en": "The radiolunate joint is preserved in the case; arthritis is radial and midcarpal.",
        "fa": "مفصل رادیولونات در سناریو حفظ شده؛ آرتروز رادیال و میدکارپال است."
      },
      "D": {
        "de": "Der Fall beschreibt radiokarpale und mediokarpale Beteiligung und nicht nur das Skaphotrapeziotrapezoidalgelenk.",
        "en": "The case describes radiocarpal and midcarpal involvement, not only the scaphotrapeziotrapezoid joint.",
        "fa": "سناریو درگیری رادیوکارپال و میدکارپال را توصیف می‌کند، نه فقط مفصل اسکافوتراپزیوتراپزوئید."
      }
    },
    "source": "MSK.pdf physical19–20/printed18–19; actual file C:/Users/Drham/OneDrive/Desktop/Lerncore/MSK.pdf; text and fresh110dpi page images read2026-10-25. Vender et al.1987, original symptomatic nonunion cohort, abstract: https://pubmed.ncbi.nlm.nih.gov/3611645/",
    "difficulty": 2
  },
  {
    "id": "proximal-risk",
    "q": {
      "de": "Eine Fraktur trennt den proximalen Skaphoidpol ab. Welche Aussage zur Gefährdung dieses Fragments ist richtig?",
      "en": "A fracture separates the proximal scaphoid pole. Which statement about risk to this fragment is correct?",
      "fa": "شکستگی قطب پروگزیمال اسکافوئید را جدا کرده است. کدام عبارت دربارهٔ خطر این قطعه درست است؟"
    },
    "options": [
      {
        "de": "Der distale Gefäßeintritt mit retrogradem intraossärem Fluss erhöht das Ischämie-/Nekroserisiko; die Lage allein beweist keine Nekrose",
        "en": "Distal vessel entry with retrograde intraosseous flow increases ischemia/osteonecrosis risk; location alone does not prove necrosis",
        "fa": "ورود دیستال عروق با جریان داخل‌استخوانی رتروگراد، خطر ایسکمی/استئونکروز را افزایش می‌دهد؛ محل به‌تنهایی نکروز را اثبات نمی‌کند"
      },
      {
        "de": "Der proximale Pol wird überwiegend direkt proximal versorgt und ist daher vor Ischämie geschützt",
        "en": "The proximal pole is supplied predominantly directly from proximally and is therefore protected from ischemia",
        "fa": "قطب پروگزیمال عمدتاً مستقیماً از پروگزیمال خون می‌گیرد و بنابراین از ایسکمی محفوظ است"
      },
      {
        "de": "Eine B3-Lokalisation ist bereits der sichere Nachweis einer Osteonekrose",
        "en": "A B3 location already establishes osteonecrosis",
        "fa": "محل B3 به‌خودی‌خود استئونکروز را قطعی می‌کند"
      },
      {
        "de": "Retrograder Blutfluss begünstigt nur Arthrose, nicht die Heilung oder Vitalität des Fragments",
        "en": "Retrograde flow affects only arthritis, not fragment healing or viability",
        "fa": "جریان رتروگراد فقط بر آرتروز اثر دارد، نه جوش‌خوردن یا زنده‌مانی قطعه"
      }
    ],
    "correct": 0,
    "explanation": {
      "de": "Der proximale Pol hängt wesentlich von distal eintretenden Gefäßen und retrogradem intraossärem Blutfluss ab. Eine Fraktur kann diese Versorgung beeinträchtigen und Ischämie, Osteonekrose oder Heilungsstörung begünstigen. Risiko und nachgewiesene Nekrose sind zu trennen.",
      "en": "The proximal pole relies substantially on distally entering vessels and retrograde intraosseous flow. Fracture can disrupt supply and predispose to ischemia, osteonecrosis or impaired healing. Risk must be distinguished from demonstrated necrosis.",
      "fa": "قطب پروگزیمال تا حد زیادی به عروق ورودی دیستال و جریان داخل‌استخوانی رتروگراد وابسته است. شکستگی می‌تواند خون‌رسانی را مختل و زمینهٔ ایسکمی، استئونکروز یا اختلال جوش‌خوردن را فراهم کند. خطر را از نکروز اثبات‌شده جدا کنید."
    },
    "wrong": {
      "B": {
        "de": "Die entscheidende Versorgung des proximalen Pols erfolgt retrograd aus distal eintretenden Gefäßen.",
        "en": "The important proximal-pole supply flows retrogradely from distally entering vessels.",
        "fa": "خون‌رسانی مهم قطب پروگزیمال به‌صورت رتروگراد از عروق ورودی دیستال است."
      },
      "C": {
        "de": "Die Lokalisation erhöht das Risiko, ist aber kein alleiniger Vitalitäts- oder Nekrosenachweis.",
        "en": "Location raises risk but alone establishes neither viability nor necrosis.",
        "fa": "محل خطر را افزایش می‌دهد، اما به‌تنهایی زنده‌مانی یا نکروز را اثبات نمی‌کند."
      },
      "D": {
        "de": "Die Gefäßversorgung ist für Vitalität und Heilung relevant; sie ist keine Erklärung allein für Arthrose.",
        "en": "Blood supply matters for viability and healing; its significance is not limited to arthritis.",
        "fa": "خون‌رسانی برای زنده‌مانی و جوش‌خوردن مهم است؛ اهمیت آن به آرتروز محدود نمی‌شود."
      }
    },
    "source": "MSK.pdf physical19–20/printed18–19; actual file C:/Users/Drham/OneDrive/Desktop/Lerncore/MSK.pdf; text and fresh110dpi page images read2026-10-25. AO Surgery Reference, proximal-pole vascularity, https://surgeryreference.aofoundation.org/orthopedic-trauma/adult-trauma/carpal-bones/scaphoid-proximal-pole/definition",
    "difficulty": 2
  },
  {
    "id": "variant-context",
    "q": {
      "de": "Textfall: Das Skaphoid erscheint zweigeteilt mit glatten kortizierten Rändern. Eine frühere Verletzung ist nicht erinnerlich. Welche Befundaussage ist am angemessensten?",
      "en": "Text vignette: the scaphoid appears bipartite with smooth corticated margins. No previous injury is recalled. Which report statement is most appropriate?",
      "fa": "سناریوی متنی: اسکافوئید دوپاره با حاشیه‌های صاف و کورتیکه دیده می‌شود. آسیب قبلی به یاد آورده نمی‌شود. کدام عبارت گزارش مناسب‌تر است؟"
    },
    "options": [
      {
        "de": "Sichere Pseudarthrose allein aufgrund der Zweiteilung",
        "en": "Definite nonunion based solely on the two-part appearance",
        "fa": "عدم جوش‌خوردن قطعی فقط به دلیل ظاهر دوپاره"
      },
      {
        "de": "Bipartite Variante erwägen; Vorgeschichte, Voraufnahmen und Morphologie gemeinsam beurteilen",
        "en": "Consider a bipartite variant; assess history, prior images and morphology together",
        "fa": "واریانت دوپاره را مطرح کنید؛ سابقه، تصاویر قبلی و مورفولوژی را با هم بسنجید"
      },
      {
        "de": "Eine frühere Fraktur ist durch die fehlende Traumaerinnerung sicher ausgeschlossen",
        "en": "Lack of recalled trauma definitively excludes an old fracture",
        "fa": "به یاد نیاوردن تروما، شکستگی قدیمی را قطعاً رد می‌کند"
      },
      {
        "de": "Arthrose würde eine bipartite Variante unter allen Umständen ausschließen",
        "en": "Arthritis would exclude a bipartite variant in all circumstances",
        "fa": "وجود آرتروز در همهٔ شرایط واریانت دوپاره را رد می‌کند"
      }
    ],
    "correct": 1,
    "explanation": {
      "de": "Glatte kortizierte Ränder und fehlende Traumaerinnerung lassen eine Variante erwägen, beweisen sie aber nicht. Kontext und frühere Bilder mitbeurteilen; fehlende Traumaerinnerung schließt eine alte Fraktur nicht aus. Auch bei echter Bipartition ist Arthrose beschrieben.",
      "en": "Smooth corticated margins and no recalled trauma support considering a variant but do not prove it. Assess context and prior images; absent trauma recall does not exclude an old fracture. Arthritis has also been reported in true bipartition.",
      "fa": "حاشیه‌های صاف و کورتیکه و به یاد نیاوردن تروما، مطرح‌کردن واریانت را توجیه می‌کنند، اما آن را اثبات نمی‌کنند. زمینه و تصاویر قبلی را بررسی کنید؛ نبود یادآوری تروما شکستگی قدیمی را رد نمی‌کند. آرتروز در دوپارگی واقعی هم گزارش شده است."
    },
    "wrong": {
      "A": {
        "de": "Zweiteilung allein unterscheidet eine alte Fraktur nicht zuverlässig von einer seltenen bipartiten Variante.",
        "en": "A two-part appearance alone does not reliably distinguish old fracture from a rare bipartite variant.",
        "fa": "ظاهر دوپاره به‌تنهایی شکستگی قدیمی را به‌طور قابل‌اعتماد از واریانت نادر دوپاره تفکیک نمی‌کند."
      },
      "C": {
        "de": "Die Anamnese ist ein Hinweis, kein sicherer Ausschlusstest für eine frühere Fraktur.",
        "en": "History is a clue, not a definitive exclusion test for an old fracture.",
        "fa": "شرح‌حال یک سرنخ است، نه آزمون قطعی رد شکستگی قدیمی."
      },
      "D": {
        "de": "Primäre Fallberichte dokumentieren Arthrose auch bei kongenital bipartitem Skaphoid; sie ist kein absoluter Ausschluss.",
        "en": "Primary cases document arthritis in congenital bipartite scaphoid as well; it is not an absolute exclusion.",
        "fa": "گزارش‌های موردی اولیه آرتروز را در اسکافوئید دوپارهٔ مادرزادی هم ثبت کرده‌اند؛ پس معیار رد مطلق نیست."
      }
    },
    "source": "MSK.pdf physical19–20/printed18–19; actual file C:/Users/Drham/OneDrive/Desktop/Lerncore/MSK.pdf; text and fresh110dpi page images read2026-10-25. Doman/Marcus1990 congenital bipartite scaphoid primary longitudinal case: https://pubmed.ncbi.nlm.nih.gov/2269775/; Richards et al.1987 bipartite scaphoid with arthritis: https://pubmed.ncbi.nlm.nih.gov/3607646/",
    "difficulty": 2
  }
]

export const SCAPHOID_QUESTIONS = Object.fromEntries(['de','en','fa'].map(lang=>[lang,questions.map(item=>({id:'scaphoid-'+item.id,fach:'msk',tags:['skaphoidfraktur'],question:item.q[lang],options:item.options.map((o,i)=>({id:'ABCD'[i],text:o[lang]})),correct:'ABCD'[item.correct],explanation:item.explanation[lang],wrongExplanations:Object.fromEntries(Object.entries(item.wrong).map(([id,t])=>[id,t[lang]])),source:item.source,difficulty:item.difficulty}))]))

export const SCAPHOID_FLASHCARDS = [
  {
    "id": "scaphoid-fc-b4",
    "topicId": "skaphoidfraktur",
    "category": {
      "de": "Klassifikation",
      "en": "Classification",
      "fa": "طبقه‌بندی"
    },
    "front": {
      "de": "Welcher Herbert-Typ steht für eine transskaphoidale perilunäre Frakturluxation?",
      "en": "Which Herbert type describes a trans-scaphoid perilunate fracture-dislocation?",
      "fa": "کدام نوع هربرت نشان‌دهندهٔ شکستگی-دررفتگی پری‌لونار ترانس‌اسکافوئید است؟"
    },
    "answer": {
      "de": "B4.",
      "en": "B4.",
      "fa": "B4."
    },
    "explanation": {
      "de": "Die vollständige Karpalstellung und Begleitverletzungen zusätzlich beschreiben.",
      "en": "Also describe complete carpal alignment and associated injuries.",
      "fa": "راستای کامل کارپ و آسیب‌های همراه را نیز توصیف کنید."
    },
    "source": "MSK.pdf physical19–20/printed18–19; actual file C:/Users/Drham/OneDrive/Desktop/Lerncore/MSK.pdf; text and fresh110dpi page images read2026-10-25. AO Surgery Reference, Herbert classification, https://surgeryreference.aofoundation.org/orthopedic-trauma/adult-trauma/carpal-bones/further-reading/classifications-for-fractures-of-carpal-bones"
  },
  {
    "id": "scaphoid-fc-snac",
    "topicId": "skaphoidfraktur",
    "category": {
      "de": "Chronische Verletzung",
      "en": "Chronic injury",
      "fa": "آسیب مزمن"
    },
    "front": {
      "de": "Welches degenerative Muster kann bei chronischer Skaphoidpseudarthrose entstehen?",
      "en": "Which degenerative pattern can develop with chronic scaphoid nonunion?",
      "fa": "در عدم جوش‌خوردن مزمن اسکافوئید چه الگوی دژنراتیوی ممکن است ایجاد شود؟"
    },
    "answer": {
      "de": "SNAC-Arthrose, oft radial beginnend und fortschreitend.",
      "en": "SNAC arthritis, often starting radially and progressing.",
      "fa": "آرتروز SNAC که اغلب از سمت رادیال آغاز می‌شود و پیشرفت می‌کند."
    },
    "explanation": {
      "de": "Eine einzelne Röntgenprojektion reicht nicht für eine vollständige Stadieneinteilung.",
      "en": "A single radiographic projection is insufficient for full staging.",
      "fa": "یک نمای رادیوگرافی برای مرحله‌بندی کامل کافی نیست."
    },
    "source": "MSK.pdf physical19–20/printed18–19; actual file C:/Users/Drham/OneDrive/Desktop/Lerncore/MSK.pdf; text and fresh110dpi page images read2026-10-25. Vender et al.1987, original symptomatic nonunion cohort, abstract: https://pubmed.ncbi.nlm.nih.gov/3611645/"
  },
  {
    "id": "scaphoid-fc-proximal-risk",
    "topicId": "skaphoidfraktur",
    "category": {
      "de": "Vitalität",
      "en": "Viability",
      "fa": "زنده‌مانی"
    },
    "front": {
      "de": "Warum ist der proximale Skaphoidpol gefährdet, und was beweist die Lokalisation nicht?",
      "en": "Why is the proximal scaphoid pole at risk, and what does location not prove?",
      "fa": "چرا قطب پروگزیمال اسکافوئید در خطر است و محل چه چیزی را اثبات نمی‌کند؟"
    },
    "answer": {
      "de": "Distaler Gefäßeintritt und retrograder intraossärer Fluss machen ihn vulnerabel; B3 allein beweist keine Osteonekrose.",
      "en": "Distal vessel entry and retrograde intraosseous flow make it vulnerable; B3 alone does not prove osteonecrosis.",
      "fa": "ورود دیستال عروق و جریان داخل‌استخوانی رتروگراد آن را آسیب‌پذیر می‌کنند؛ B3 به‌تنهایی استئونکروز را اثبات نمی‌کند."
    },
    "explanation": {
      "de": "Der proximale Pol hängt wesentlich von distal eintretenden Gefäßen und retrogradem intraossärem Blutfluss ab. Eine Fraktur kann diese Versorgung beeinträchtigen und Ischämie, Osteonekrose oder Heilungsstörung begünstigen. Risiko und nachgewiesene Nekrose sind zu trennen.",
      "en": "The proximal pole relies substantially on distally entering vessels and retrograde intraosseous flow. Fracture can disrupt supply and predispose to ischemia, osteonecrosis or impaired healing. Risk must be distinguished from demonstrated necrosis.",
      "fa": "قطب پروگزیمال تا حد زیادی به عروق ورودی دیستال و جریان داخل‌استخوانی رتروگراد وابسته است. شکستگی می‌تواند خون‌رسانی را مختل و زمینهٔ ایسکمی، استئونکروز یا اختلال جوش‌خوردن را فراهم کند. خطر را از نکروز اثبات‌شده جدا کنید."
    },
    "source": "MSK.pdf physical19–20/printed18–19; actual file C:/Users/Drham/OneDrive/Desktop/Lerncore/MSK.pdf; text and fresh110dpi page images read2026-10-25. AO Surgery Reference, proximal-pole vascularity, https://surgeryreference.aofoundation.org/orthopedic-trauma/adult-trauma/carpal-bones/scaphoid-proximal-pole/definition"
  },
  {
    "id": "scaphoid-fc-variant-context",
    "topicId": "skaphoidfraktur",
    "category": {
      "de": "Differenzialdiagnose",
      "en": "Differential diagnosis",
      "fa": "تشخیص افتراقی"
    },
    "front": {
      "de": "Wie vermeiden Sie die Verwechslung einer Skaphoidpseudarthrose mit einer bipartiten Variante?",
      "en": "How do you avoid confusing scaphoid nonunion with a bipartite variant?",
      "fa": "چگونه از اشتباه عدم جوش‌خوردن اسکافوئید با واریانت دوپاره جلوگیری می‌کنید؟"
    },
    "answer": {
      "de": "Ränder, Frakturverlauf, Vorgeschichte und Voraufnahmen gemeinsam beurteilen; kein Einzelzeichen entscheidet sicher.",
      "en": "Assess margins, fracture configuration, history and prior images together; no single sign settles the diagnosis.",
      "fa": "حاشیه‌ها، مسیر شکستگی، سابقه و تصاویر قبلی را با هم بسنجید؛ هیچ نشانهٔ منفردی تشخیص را قطعی نمی‌کند."
    },
    "explanation": {
      "de": "Glatte kortizierte Ränder und fehlende Traumaerinnerung lassen eine Variante erwägen, beweisen sie aber nicht. Kontext und frühere Bilder mitbeurteilen; fehlende Traumaerinnerung schließt eine alte Fraktur nicht aus. Auch bei echter Bipartition ist Arthrose beschrieben.",
      "en": "Smooth corticated margins and no recalled trauma support considering a variant but do not prove it. Assess context and prior images; absent trauma recall does not exclude an old fracture. Arthritis has also been reported in true bipartition.",
      "fa": "حاشیه‌های صاف و کورتیکه و به یاد نیاوردن تروما، مطرح‌کردن واریانت را توجیه می‌کنند، اما آن را اثبات نمی‌کنند. زمینه و تصاویر قبلی را بررسی کنید؛ نبود یادآوری تروما شکستگی قدیمی را رد نمی‌کند. آرتروز در دوپارگی واقعی هم گزارش شده است."
    },
    "source": "MSK.pdf physical19–20/printed18–19; actual file C:/Users/Drham/OneDrive/Desktop/Lerncore/MSK.pdf; text and fresh110dpi page images read2026-10-25. Doman/Marcus1990 congenital bipartite scaphoid primary longitudinal case: https://pubmed.ncbi.nlm.nih.gov/2269775/; Richards et al.1987 bipartite scaphoid with arthritis: https://pubmed.ncbi.nlm.nih.gov/3607646/"
  }
]

export const SCAPHOID_FLASHCARD_TOPIC = {
  id: 'skaphoidfraktur',
  title: L('Skaphoidfraktur', 'Scaphoid Fracture', 'شکستگی اسکافوئید'),
  subtitle: L('Herbert · Pseudarthrose · SNAC', 'Herbert · nonunion · SNAC', 'هربرت · عدم جوش‌خوردن · SNAC'),
  area: 'MSK', chapter: L('Traumatologie & Frakturen', 'Trauma & Fractures', 'تروما و شکستگی‌ها'),
  icon: '🦴', iconImage: '/fach/msk.png', color: '#65c9be', href: '/flashcards/skaphoidfraktur',
}
