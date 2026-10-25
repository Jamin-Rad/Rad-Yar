// Primary coverage: user Abdomen.pdf physical pp8–10; targeted packet06 source and assessment review pending.
export const HEMANGIOMA_CHAPTERS = [
  {
    "id": "muster",
    "icon": "vessel",
    "title": {
      "de": "Das Muster erkennen",
      "en": "Recognise the pattern",
      "fa": "الگو را بشناسید"
    },
    "lead": {
      "de": "Erst die Dynamik verstehen: außen beginnen, nach innen auffüllen, dem Blutpool folgen.",
      "en": "Start with the dynamics: begin at the edge, fill inward, follow the blood pool.",
      "fa": "ابتدا الگوی دینامیک را بفهمید: شروع از محیط، پرشدن به‌سمت مرکز و پیروی از مخزن خون."
    },
    "blocks": [
      {
        "type": "text",
        "text": {
          "de": "Das Leberhämangiom ist eine gutartige vaskuläre Läsion mit kavernösen, blutgefüllten Räumen. Es ist die häufigste gutartige solide Leberläsion, bei Frauen häufiger und oft ein Zufallsbefund. Eine periphere Lage ist möglich, aber kein Diagnosekriterium.",
          "en": "Hepatic haemangioma is a benign vascular lesion with cavernous blood-filled spaces. It is the most common benign solid liver lesion, more frequent in women and often incidental. A peripheral location is possible but is not a diagnostic criterion.",
          "fa": "همانژیوم کبدی ضایعه‌ای عروقی و خوش‌خیم با فضاهای کاورنوز پُر از خون است. شایع‌ترین ضایعه جامد خوش‌خیم کبد است، در زنان بیشتر دیده می‌شود و اغلب اتفاقی کشف می‌شود. قرارگیری محیطی ممکن است، اما معیار تشخیص نیست."
        }
      },
      {
        "type": "text",
        "text": {
          "de": "Im Ultraschall ist das klassische kleine Hämangiom homogen echoreich, scharf begrenzt, mit dorsaler Schallverstärkung und ohne Halo. In einer verfetteten Leber kann es relativ echoarm wirken. Fehlendes Dopplersignal schließt es wegen des langsamen Blutflusses nicht aus.",
          "en": "On ultrasound, a classic small haemangioma is homogeneously hyperechoic and sharply defined, with posterior enhancement and no halo. In a fatty liver it may appear relatively hypoechoic. Absent Doppler signal does not exclude it because flow is slow.",
          "fa": "در سونوگرافی، همانژیوم کوچک تیپیک همگن و اکوژن است، مرز مشخص و تقویت صوتی خلفی دارد و هاله ندارد. در کبد چرب ممکن است نسبتاً هیپواکو باشد. نبود سیگنال داپلر به‌علت جریان آهسته، همانژیوم را رد نمی‌کند."
        }
      },
      {
        "type": "note",
        "tone": "warning",
        "text": {
          "de": "Sonographie allein genügt nach EASL nur bei typischem Befund unter 3 cm in gesunder Leber ohne Tumoranamnese. Bei Lebererkrankung, Tumoranamnese oder untypischem Befund ist kontrastverstärkte Charakterisierung nötig, z. B. mittels CEUS oder MRT.",
          "en": "Under EASL guidance, ultrasound alone is sufficient only for a typical lesion under 3 cm in a healthy liver without a cancer history. Liver disease, cancer history or atypical findings require contrast-enhanced characterisation, for example with CEUS or MRI.",
          "fa": "طبق راهنمای EASL، سونوگرافی به‌تنهایی فقط برای ضایعه تیپیک کوچک‌تر از ۳ سانتی‌متر در کبد سالم و بدون سابقه سرطان کافی است. بیماری کبدی، سابقه سرطان یا یافته غیرتیپیک به بررسی با ماده حاجب، مثلاً CEUS یا MRI، نیاز دارد."
        }
      },
      {
        "type": "note",
        "tone": "key",
        "text": {
          "de": "Leitlinien unterscheiden sich beim Größenlimit: EASL 2016 nennt <3 cm; ACG 2024 <2 cm. Beide Grenzen gelten nur bei typischer Morphologie und passendem klinischem Kontext; nicht zu einem universellen Grenzwert zusammenziehen.",
          "en": "Guidelines differ on the size threshold: EASL 2016 uses <3 cm; ACG 2024 uses <2 cm. Both apply only with typical morphology and the appropriate clinical context; do not merge them into one universal cutoff.",
          "fa": "حدّ اندازه در راهنماها متفاوت است: EASL 2016 کمتر از ۳ سانتی‌متر و ACG 2024 کمتر از ۲ سانتی‌متر را ذکر می‌کند. هر دو فقط با مورفولوژی تیپیک و زمینه بالینی مناسب کاربرد دارند؛ این دو حد را به یک آستانه همگانی تبدیل نکنید."
        }
      }
    ]
  },
  {
    "id": "dynamik",
    "icon": "scan",
    "title": {
      "de": "Die Kontrastphasen lesen",
      "en": "Read the contrast phases",
      "fa": "فازهای کنتراست را بخوانید"
    },
    "lead": {
      "de": "Suchen Sie einzelne randständige Kontrastknoten und verfolgen Sie dieselbe Läsion durch die Phasen.",
      "en": "Find individual peripheral enhancing nodules and follow the same lesion through the phases.",
      "fa": "ندول‌های مجزای جذب‌کننده کنتراست در محیط را پیدا کنید و همان ضایعه را در فازهای متوالی دنبال کنید."
    },
    "blocks": [
      {
        "type": "phaseDiagram"
      },
      {
        "type": "cases"
      },
      {
        "type": "table",
        "headers": [
          {
            "de": "Phase",
            "en": "Phase",
            "fa": "فاز"
          },
          {
            "de": "Typischer Befund",
            "en": "Typical finding",
            "fa": "یافته تیپیک"
          }
        ],
        "rows": [
          [
            {
              "de": "Nativ",
              "en": "Unenhanced",
              "fa": "بدون کنتراست"
            },
            {
              "de": "Scharf begrenzt und gegenüber der Leber hypodens.",
              "en": "Well-defined and hypoattenuating to liver.",
              "fa": "مرز مشخص و دانسیته کمتر از کبد."
            }
          ],
          [
            {
              "de": "Arteriell",
              "en": "Arterial",
              "fa": "شریانی"
            },
            {
              "de": "Diskontinuierliche periphere Knoten; ihre Anreicherung ähnelt dem Blutpool derselben Phase.",
              "en": "Discontinuous peripheral nodules; their enhancement resembles the blood pool in the same phase.",
              "fa": "ندول‌های محیطی ناپیوسته؛ میزان جذب آن‌ها شبیه مخزن خون در همان فاز است."
            }
          ],
          [
            {
              "de": "Portalvenös / spät",
              "en": "Portal venous / delayed",
              "fa": "پورتال‌ونوس / تأخیری"
            },
            {
              "de": "Progressive zentripetale Auffüllung mit persistierender Anreicherung; bei großen Läsionen oft unvollständig.",
              "en": "Progressive centripetal fill-in with persistent enhancement; often incomplete in large lesions.",
              "fa": "پرشدن تدریجی از محیط به مرکز با ماندگاری کنتراست؛ در ضایعات بزرگ اغلب کامل نمی‌شود."
            }
          ]
        ]
      },
      {
        "type": "note",
        "tone": "key",
        "text": {
          "de": "Irisblendenphänomen bedeutet Auffüllung vom Rand zur Mitte. Maßstab ist der Blutpool, nicht zwingend die Leber: Das Hämangiom muss spät weder vollständig gefüllt noch homogen hyperdens sein.",
          "en": "The iris diaphragm phenomenon means inward filling from the edge. Use the blood pool as the reference, not necessarily the liver: delayed complete filling or homogeneous hyperattenuation is not required.",
          "fa": "پدیده دیافراگم عنبیه یعنی پرشدن از محیط به مرکز. مرجع مقایسه، مخزن خون است و لزوماً کبد نیست؛ پرشدن کامل یا دانسیته بالای همگن در فاز تأخیری الزامی نیست."
        }
      },
      {
        "type": "note",
        "tone": "warning",
        "text": {
          "de": "Ein glatter, durchgehender Randsaum ist nicht dasselbe wie einzelne periphere Kontrastknoten. Bei Rim-Enhancement oder echtem Washout das typische Hämangiommuster kritisch hinterfragen.",
          "en": "A smooth continuous enhancing rim is different from separate peripheral nodules. Rim enhancement or true washout should prompt reassessment of a typical haemangioma diagnosis.",
          "fa": "حاشیه صاف و پیوسته جذب کنتراست با ندول‌های مجزای محیطی یکسان نیست. در جذب حلقوی پیوسته یا washout واقعی، تشخیص همانژیوم تیپیک را دوباره بررسی کنید."
        }
      }
    ]
  },
  {
    "id": "mrt",
    "icon": "chart",
    "title": {
      "de": "T2 und Diffusion zusammen lesen",
      "en": "Read T2 and diffusion together",
      "fa": "T2 و دیفیوژن را کنار هم بخوانید"
    },
    "lead": {
      "de": "Ein helles DWI-Bild allein beweist keine Diffusionsrestriktion.",
      "en": "A bright DWI image alone does not establish restricted diffusion.",
      "fa": "روشن‌بودن DWI به‌تنهایی اثبات‌کننده محدودیت انتشار نیست."
    },
    "blocks": [
      {
        "type": "table",
        "headers": [
          {
            "de": "Sequenz",
            "en": "Sequence",
            "fa": "سکانس"
          },
          {
            "de": "Worauf achten?",
            "en": "What to look for",
            "fa": "به چه چیزی توجه کنید؟"
          }
        ],
        "rows": [
          [
            {
              "de": "T1 nativ",
              "en": "Unenhanced T1",
              "fa": "T1 بدون کنتراست"
            },
            {
              "de": "Meist hypo- bis isointens; allein wenig spezifisch.",
              "en": "Usually hypo- to isointense; nonspecific on its own.",
              "fa": "معمولاً کم‌سیگنال تا هم‌سیگنال؛ به‌تنهایی غیراختصاصی است."
            }
          ],
          [
            {
              "de": "T2",
              "en": "T2",
              "fa": "T2"
            },
            {
              "de": "Typisch sehr signalreich: Light-Bulb-Zeichen. Kleine Läsionen oft homogen, große durch Thromben oder Fibrose heterogen.",
              "en": "Typically markedly bright: the light-bulb sign. Small lesions are often homogeneous; thrombus or fibrosis may make larger lesions heterogeneous.",
              "fa": "به‌طور تیپیک بسیار پُرسیگنال: علامت لامپ روشن. ضایعات کوچک اغلب همگن‌اند؛ ترومبوز یا فیبروز می‌تواند ضایعات بزرگ‌تر را ناهمگن کند."
            }
          ],
          [
            {
              "de": "DWI + ADC",
              "en": "DWI + ADC",
              "fa": "DWI + ADC"
            },
            {
              "de": "DWI kann hell sein; ohne korrespondierend niedrigen ADC spricht das für T2-shine-through.",
              "en": "DWI may be bright; without a corresponding low ADC, this supports T2 shine-through.",
              "fa": "DWI می‌تواند روشن باشد؛ بدون کاهش متناظر ADC، این الگو به نفع T2 shine-through است."
            }
          ],
          [
            {
              "de": "T1 dynamisch",
              "en": "Dynamic T1",
              "fa": "T1 دینامیک"
            },
            {
              "de": "Wie im CT: periphere Knoten, zentripetale Auffüllung und persistierende blutpoolähnliche Anreicherung.",
              "en": "As on CT: peripheral nodules, centripetal fill-in and persistent blood-pool-like enhancement.",
              "fa": "مانند CT: ندول‌های محیطی، پرشدن به‌سمت مرکز و ماندگاری جذب شبیه مخزن خون."
            }
          ]
        ]
      },
      {
        "type": "dwiDiagram"
      },
      {
        "type": "note",
        "tone": "warning",
        "text": {
          "de": "ADC ist ein ergänzender Befund, kein alleiniger Gutartigkeitsnachweis. Sehr helles T2-Signal und passende Mehrphasendynamik gemeinsam bewerten; Messwerte können sich mit anderen Läsionen überlappen.",
          "en": "ADC is supportive, not proof of benignity by itself. Assess marked T2 brightness together with compatible multiphasic enhancement; measurements can overlap with other lesions.",
          "fa": "ADC یک یافته کمکی است و به‌تنهایی خوش‌خیمی را ثابت نمی‌کند. سیگنال بسیار بالای T2 را همراه الگوی چندفازی سازگار ارزیابی کنید؛ مقادیر اندازه‌گیری‌شده می‌توانند با ضایعات دیگر هم‌پوشانی داشته باشند."
        }
      }
    ]
  },
  {
    "id": "atypisch",
    "icon": "brain",
    "title": {
      "de": "Atypisch ist kein einheitliches Muster",
      "en": "Atypical is not one pattern",
      "fa": "غیرتیپیک یک الگوی واحد نیست"
    },
    "lead": {
      "de": "Rasche Füllung und Sklerosierung sind zwei unterschiedliche Gründe für ein ungewohntes Bild.",
      "en": "Rapid filling and sclerosis are two different reasons for an unusual appearance.",
      "fa": "پرشدن سریع و اسکلروز دو علت متفاوت برای ظاهر غیرمعمول‌اند."
    },
    "blocks": [
      {
        "type": "table",
        "headers": [
          {
            "de": "Variante",
            "en": "Variant",
            "fa": "نوع"
          },
          {
            "de": "Muster und Konsequenz",
            "en": "Pattern and implication",
            "fa": "الگو و نتیجه"
          }
        ],
        "rows": [
          [
            {
              "de": "Flash-filling",
              "en": "Flash-filling",
              "fa": "پرشدن سریع · Flash-filling"
            },
            {
              "de": "Oft kleine Läsion: bereits arteriell homogen kräftig anreichernd. Später weiterhin dem Blutpool folgend; nicht allein aus der arteriellen Phase diagnostizieren.",
              "en": "Often a small lesion: already intensely and homogeneously enhancing in the arterial phase. It continues to follow the blood pool later; do not diagnose from the arterial phase alone.",
              "fa": "اغلب ضایعه‌ای کوچک است که از همان فاز شریانی جذب شدید و همگن دارد. در فازهای بعد همچنان از مخزن خون پیروی می‌کند؛ فقط از روی فاز شریانی تشخیص ندهید."
            }
          ],
          [
            {
              "de": "Sklerosiert / hyalinisiert",
              "en": "Sclerosed / hyalinised",
              "fa": "اسکلروزه / هیالینیزه"
            },
            {
              "de": "Fibrose kann T2-Signal und Anreicherung vermindern; die typische Auffüllung kann fehlen. Kapselretraktion oder Verkalkung sind möglich. Die Abgrenzung zu Malignität kann schwierig bleiben.",
              "en": "Fibrosis may reduce T2 signal and enhancement; typical fill-in may be absent. Capsular retraction or calcification may occur. Distinction from malignancy may remain difficult.",
              "fa": "فیبروز می‌تواند سیگنال T2 و جذب کنتراست را کاهش دهد و الگوی پرشدن تیپیک را از بین ببرد. فرورفتگی کپسول یا کلسیفیکاسیون ممکن است دیده شود. افتراق از بدخیمی می‌تواند دشوار بماند."
            }
          ]
        ]
      },
      {
        "type": "note",
        "tone": "key",
        "text": {
          "de": "Seltene Fallberichte beschreiben eine echte Diffusionsrestriktion bei sklerosierten Hämangiomen. Das ist kein allgemeines Merkmal atypischer Hämangiome; daraus allein lässt sich die Diagnose nicht ableiten.",
          "en": "Rare case reports describe true restricted diffusion in sclerosing haemangiomas. This is not a general feature of atypical haemangiomas and cannot establish the diagnosis by itself.",
          "fa": "در گزارش‌های موردی نادر، محدودیت واقعی انتشار در همانژیوم اسکلروزه توصیف شده است. این یافته ویژگی عمومی همانژیوم غیرتیپیک نیست و به‌تنهایی تشخیص را ثابت نمی‌کند."
        }
      },
      {
        "type": "note",
        "tone": "warning",
        "text": {
          "de": "„Atypisch“ bedeutet weder immer homogen arteriell hypervaskulär noch generell randständig diffusionsrestringiert. Bei fehlender eindeutiger Gesamtkonstellation den Befund als unklar einordnen und weiter charakterisieren.",
          "en": "“Atypical” does not always mean homogeneous arterial hypervascularity or peripheral restricted diffusion. If the overall findings are not convincing, classify the lesion as indeterminate and characterise it further.",
          "fa": "«غیرتیپیک» نه همیشه به معنی جذب شریانی همگن است و نه به معنی محدودیت انتشار محیطی. اگر مجموعه یافته‌ها قانع‌کننده نیست، ضایعه را نامعین گزارش کنید و بررسی تکمیلی انجام دهید."
        }
      }
    ]
  },
  {
    "id": "anwenden",
    "icon": "case",
    "title": {
      "de": "Befundmuster sicher anwenden",
      "en": "Apply the imaging pattern",
      "fa": "به‌کارگیری الگوی تصویربرداری"
    },
    "lead": {
      "de": "Benennen Sie das beobachtete Muster, bevor Sie die Diagnose formulieren.",
      "en": "Describe the observed pattern before giving the diagnosis.",
      "fa": "پیش از بیان تشخیص، الگوی مشاهده‌شده را توصیف کنید."
    },
    "blocks": [
      {
        "type": "report",
        "title": {
          "de": "Beispiel bei klassischer MRT-Konstellation",
          "en": "Example with a classic MRI constellation",
          "fa": "نمونه گزارش برای مجموعه یافته‌های تیپیک MRI"
        },
        "text": {
          "de": "Scharf begrenzte Läsion in Segment VII, T1-hypointens und deutlich T2-hyperintens. Diskontinuierliche periphere noduläre Kontrastmittelanreicherung mit progressiver zentripetaler Auffüllung und persistierendem blutpoolähnlichem Signal. Kein korrespondierend erniedrigter ADC. Bildmorphologisch typisches Leberhämangiom.",
          "en": "Well-defined segment VII lesion, T1 hypointense and markedly T2 hyperintense. Discontinuous peripheral nodular enhancement with progressive centripetal fill-in and persistent blood-pool-like signal. No corresponding low ADC. Imaging appearance typical of hepatic haemangioma.",
          "fa": "ضایعه با حدود مشخص در سگمنت VII، با سیگنال پایین T1 و بسیار بالای T2. جذب ندولار محیطی ناپیوسته همراه با پرشدن تدریجی به‌سمت مرکز و ماندگاری سیگنال مشابه مخزن خون. کاهش متناظر ADC دیده نمی‌شود. نمای تصویربرداری تیپیک همانژیوم کبدی است."
        }
      },
      {
        "type": "quiz"
      }
    ]
  },
  {
    "id": "takehome",
    "icon": "spark",
    "emphasis": true,
    "title": {
      "de": "Fünf Kernpunkte",
      "en": "Five key points",
      "fa": "پنج نکتهٔ اصلی"
    },
    "lead": {
      "de": "Das Gesamtmuster zählt mehr als ein einzelnes helles Signal.",
      "en": "The overall pattern matters more than one bright signal.",
      "fa": "مجموعه یافته‌ها از یک سیگنال روشن ارزشمندتر است."
    },
    "blocks": [
      {
        "type": "summary",
        "items": [
          {
            "de": "Periphere diskontinuierliche Knoten mit zentripetaler Auffüllung erkennen.",
            "en": "Recognise discontinuous peripheral nodules with centripetal fill-in.",
            "fa": "ندول‌های محیطی ناپیوسته با پرشدن به‌سمت مرکز را بشناسید."
          },
          {
            "de": "Die Anreicherung mit dem Blutpool derselben Phase vergleichen; komplette Füllung ist nicht obligat.",
            "en": "Compare enhancement with the blood pool in the same phase; complete filling is not mandatory.",
            "fa": "جذب را با مخزن خون همان فاز مقایسه کنید؛ پرشدن کامل الزامی نیست."
          },
          {
            "de": "T2, DWI und ADC gemeinsam lesen; DWI-Helligkeit allein ist keine Restriktion.",
            "en": "Read T2, DWI and ADC together; DWI brightness alone is not restriction.",
            "fa": "T2، DWI و ADC را با هم بخوانید؛ روشن‌بودن DWI به‌تنهایی محدودیت انتشار نیست."
          },
          {
            "de": "Flash-filling und sklerosierte Varianten unterscheiden; „atypisch“ hat kein Einheitsmuster.",
            "en": "Distinguish flash-filling from sclerosed variants; “atypical” has no single pattern.",
            "fa": "نوع پرشدن سریع را از نوع اسکلروزه جدا کنید؛ «غیرتیپیک» الگوی واحدی ندارد."
          },
          {
            "de": "Sonographische Entwarnung nur im passenden klinischen Kontext und bei erfüllten Kriterien.",
            "en": "Accept ultrasound alone only in the appropriate clinical context with all criteria met.",
            "fa": "فقط در زمینه بالینی مناسب و با احراز همه شرایط، به سونوگرافی تنها اکتفا کنید."
          }
        ]
      }
    ]
  }
]
export const HEMANGIOMA_COPY = {
  "title": {
    "de": "Leberhämangiom",
    "en": "Hepatic haemangioma",
    "fa": "همانژیوم کبدی"
  },
  "heroAlt": {
    "de": "Schematische Darstellung einer vaskulären Leberläsion mit peripheren Gefäßräumen",
    "en": "Schematic of a vascular liver lesion with peripheral vascular spaces",
    "fa": "نمای شماتیک ضایعه عروقی کبد با فضاهای عروقی محیطی"
  },
  "ui": {
    "path": {
      "de": "Lernpfad",
      "en": "Learning path",
      "fa": "مسیر یادگیری"
    },
    "read": {
      "de": "gelesen",
      "en": "read",
      "fa": "خوانده‌شده"
    },
    "mark": {
      "de": "Abschnitt als gelesen markieren",
      "en": "Mark section as read",
      "fa": "ثبت خواندن این بخش"
    },
    "marked": {
      "de": "Als gelesen markiert",
      "en": "Marked as read",
      "fa": "خوانده شد"
    },
    "continue": {
      "de": "Lektion fortsetzen",
      "en": "Continue lesson",
      "fa": "ادامه درس"
    },
    "fullMark": {
      "de": "Alles als gelesen markieren",
      "en": "Mark all as read",
      "fa": "ثبت خواندن کل درس"
    },
    "fullMarked": {
      "de": "Alles gelesen",
      "en": "All read",
      "fa": "کل درس خوانده شد"
    },
    "auth": {
      "de": "Anmelden, um den Abschluss im Profil zu speichern.",
      "en": "Sign in to save lesson completion to your profile.",
      "fa": "برای ذخیره پایان درس در پروفایل وارد شوید."
    },
    "login": {
      "de": "Anmelden",
      "en": "Sign in",
      "fa": "ورود"
    },
    "mcq": {
      "de": "MCQ starten",
      "en": "Start MCQs",
      "fa": "شروع آزمون"
    },
    "flashcards": {
      "de": "Flashcards",
      "en": "Flashcards",
      "fa": "فلش‌کارت‌ها"
    },
    "key": {
      "de": "Merke",
      "en": "Key point",
      "fa": "نکته کلیدی"
    },
    "warning": {
      "de": "Cave",
      "en": "Caution",
      "fa": "احتیاط"
    },
    "sources": {
      "de": "Quellen und Vertiefung",
      "en": "Sources and further reading",
      "fa": "منابع و مطالعه بیشتر"
    },
    "summary": {
      "de": "Take Home",
      "en": "Take Home",
      "fa": "جمع‌بندی"
    },
    "breadcrumb": {
      "de": "Leber",
      "en": "Liver",
      "fa": "کبد"
    }
  },
  "quiz": {
    "title": {
      "de": "Welche Beobachtung entscheidet?",
      "en": "Which observation is decisive?",
      "fa": "کدام مشاهده تعیین‌کننده است؟"
    },
    "stem": {
      "de": "Textfall: Eine T2-helle Läsion hat hohes DWI-Signal ohne erniedrigten ADC. Arteriell zeigen sich einzelne periphere Kontrastknoten, später zunehmend zentrale Füllung. Welche Einordnung passt am besten?",
      "en": "Text vignette: a T2-bright lesion has high DWI signal without low ADC. Separate peripheral arterial enhancing nodules progressively fill centrally on later phases. Which interpretation fits best?",
      "fa": "سناریوی متنی: ضایعهٔ روشن در T2، سیگنال بالای DWI بدون ADC پایین دارد. ندول‌های مجزای محیطی در فاز شریانی جذب دارند و سپس پرشدن مرکزی افزایش می‌یابد. کدام تفسیر مناسب‌تر است؟"
    },
    "options": [
      {
        "de": "Leberhämangiom mit T2-shine-through",
        "en": "Hepatic haemangioma with T2 shine-through",
        "fa": "همانژیوم کبدی با T2 shine-through"
      },
      {
        "de": "Hypervaskuläre Metastase",
        "en": "Hypervascular metastasis",
        "fa": "متاستاز هیپرواسکولار"
      },
      {
        "de": "Fokale noduläre Hyperplasie",
        "en": "Focal nodular hyperplasia",
        "fa": "هیپرپلازی ندولار کانونی"
      },
      {
        "de": "Einfache Leberzyste",
        "en": "Simple hepatic cyst",
        "fa": "کیست سادهٔ کبد"
      }
    ],
    "correct": 0,
    "feedback": [
      {
        "de": "Ausgeprägtes T2-Signal, fehlender korrespondierend niedriger ADC und peripher-noduläre zentripetale Füllung ergeben die typische Hämangiomkonstellation.",
        "en": "Marked T2 signal, no corresponding low ADC and peripheral nodular centripetal fill-in form the typical haemangioma pattern.",
        "fa": "سیگنال شدید T2، نبود ADC پایین متناظر و پرشدن مرکزگرای ندولار محیطی، مجموعهٔ تیپیک همانژیوم را می‌سازند."
      },
      {
        "de": "Hypervaskuläre Metastasen gehören zur Differenzialdiagnose heller DWI-Läsionen. Entscheidend ist hier aber die typische vaskuläre Mehrphasendynamik; DWI allein legt die Diagnose nicht fest.",
        "en": "Hypervascular metastases are a differential for DWI-bright lesions. Here the characteristic vascular multiphasic pattern is decisive; DWI alone does not establish the diagnosis.",
        "fa": "متاستاز هیپرواسکولار در افتراق ضایعات روشن در DWI مطرح است، اما اینجا دینامیک عروقی چندفازی مشخصه تعیین‌کننده است؛ DWI به‌تنهایی تشخیص را تعیین نمی‌کند."
      },
      {
        "de": "Typische FNH zeigt eher früh homogene Anreicherung als getrennte periphere Kontrastknoten mit fortschreitender zentraler Füllung.",
        "en": "Typical FNH instead shows early homogeneous enhancement rather than separate peripheral nodules with progressive central fill-in.",
        "fa": "FNH تیپیک بیشتر جذب همگن زودرس دارد، نه ندول‌های مجزای محیطی با پرشدن پیشروندهٔ مرکزی."
      },
      {
        "de": "Eine einfache Zyste kann sehr T2-hell sein, zeigt aber keine solchen inneren anreichernden Gefäßknoten.",
        "en": "A simple cyst may be markedly T2 bright but does not show these internal enhancing vascular nodules.",
        "fa": "کیست ساده می‌تواند در T2 بسیار روشن باشد، اما چنین ندول‌های عروقی داخلی دارای جذب را نشان نمی‌دهد."
      }
    ]
  }
}
