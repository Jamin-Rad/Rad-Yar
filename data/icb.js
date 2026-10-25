// ── Intrazerebrale Blutung (ICB) ─────────────────────────────────────────────
// Alle Inhalte: Lesson, MCQs, Flashcards, Lernfälle

const L = (de, en, fa) => ({ de, en, fa })

// ── LESSON ───────────────────────────────────────────────────────────────────

export const ICB_LESSON = {
  "pdfSourcePages": [
    18,
    19,
    20,
    21
  ],
  "toc": {
    "de": "Inhaltsverzeichnis",
    "en": "Contents",
    "fa": "فهرست مطالب"
  },
  "breadcrumbArea": {
    "de": "Kopf",
    "en": "Head",
    "fa": "سر"
  },
  "breadcrumbCurrent": {
    "de": "Vaskuläre Erkrankungen · Intrazerebrale Blutung",
    "en": "Vascular diseases · Intracerebral haemorrhage",
    "fa": "بیماری‌های عروقی · خونریزی داخل مغزی"
  },
  "title": {
    "de": "Intrazerebrale Blutung",
    "en": "Intracerebral Haemorrhage",
    "fa": "خونریزی داخل مغزی"
  },
  "subtitle": {
    "de": "CT-Stadien, MRT-Signalverhalten, Swirl-/Spot-Sign und Differenzialdiagnostik",
    "en": "CT stages, MRI signal evolution, swirl/spot sign and differential diagnosis",
    "fa": "مراحل CT، سیر سیگنال MRI، علامت Swirl/Spot و تشخیص افتراقی"
  },
  "sourceLabel": "Dr. Zia",
  "actionMcq": "MCQ",
  "actionFlash": {
    "de": "Flashcards",
    "en": "Flashcards",
    "fa": "فلش‌کارت"
  },
  "keyLabel": {
    "de": "Merke",
    "en": "Key point",
    "fa": "نکته مهم"
  },
  "caveLabel": {
    "de": "CAVE",
    "en": "Caution",
    "fa": "احتیاط"
  },
  "openCase": {
    "de": "Fall in Radiopaedia öffnen",
    "en": "Open case in Radiopaedia",
    "fa": "باز کردن کیس در Radiopaedia"
  },
  "sections": [
    {
      "id": "klinik",
      "label": {
        "de": "Klinik & Ätiologie",
        "en": "Clinical & aetiology",
        "fa": "بالین و علت‌شناسی"
      },
      "icon": "🩸"
    },
    {
      "id": "ct",
      "label": {
        "de": "CT-Diagnostik",
        "en": "CT diagnosis",
        "fa": "تشخیص CT"
      },
      "icon": "🖥️"
    },
    {
      "id": "mrt",
      "label": {
        "de": "MRT-Signalverhalten",
        "en": "MRI signal evolution",
        "fa": "سیر سیگنال MRI"
      },
      "icon": "🧲"
    },
    {
      "id": "sequenzen",
      "label": {
        "de": "Sequenzen & Praxis",
        "en": "Sequences & practice",
        "fa": "سکانس‌ها و کاربرد بالینی"
      },
      "icon": "📋"
    },
    {
      "id": "faelle",
      "label": {
        "de": "Fallbeispiele",
        "en": "Cases",
        "fa": "نمونه کیس‌ها"
      },
      "icon": "🔬"
    },
    {
      "id": "takehome",
      "label": {
        "de": "Take home message",
        "en": "Take-home messages",
        "fa": "نکات کلیدی"
      },
      "icon": "💡"
    }
  ],
  "heroCards": [
    {
      "value": "50–80",
      "label": {
        "de": "HU akut",
        "en": "HU acute",
        "fa": "HU حاد"
      },
      "text": {
        "de": "Frisches Blut ist nativ-CT hyperdens – das wichtigste erste Zeichen.",
        "en": "Fresh blood is hyperattenuating on NCCT — the key first sign.",
        "fa": "خون تازه در CT بدون کنتراست هایپردنس است — اولین علامت کلیدی."
      }
    },
    {
      "value": "T1↑",
      "label": {
        "de": "Früh subakut",
        "en": "Early subacute",
        "fa": "اولیه زیرحاد"
      },
      "text": {
        "de": "T1-Hyperintensität kann mit Met-Hb im subakuten Verlauf auftreten; der genaue Zeitpunkt ist variabel.",
        "en": "T1 hyperintensity may occur with metHb during the subacute course; its exact timing is variable.",
        "fa": "پرسیگنال‌شدن T1 ممکن است همراه مت‌هموگلوبین در سیر زیرحاد رخ دهد؛ زمان دقیق آن متغیر است."
      }
    },
    {
      "value": "SWI",
      "label": {
        "de": "Chronisch sensitiv",
        "en": "Chronic detection",
        "fa": "تشخیص مزمن"
      },
      "text": {
        "de": "SWI/T2* ist besonders sensitiv für kleine alte Blutprodukte und einen Suszeptibilitätsrand.",
        "en": "SWI/T2* is particularly sensitive to small old blood products and a susceptibility rim.",
        "fa": "SWI/T2* برای محصولات خونی قدیمی کوچک و حاشیهٔ سوسپتیبیلیتی حساس‌تر است."
      }
    }
  ],
  "klinik": {
    "title": {
      "de": "Klinik & Ätiologie",
      "en": "Clinical features & aetiology",
      "fa": "تظاهرات بالینی و علت‌شناسی"
    },
    "lead": {
      "de": "Die ICB ist eine Blutung ins Hirnparenchym. Ihre Ursache beeinflusst Verteilung, Verlauf und Behandlung; die Bildgebung beschreibt Blutung und Begleitbefunde und unterstützt die gezielte Ursachensuche.",
      "en": "ICH is bleeding into brain parenchyma. Its cause influences distribution, evolution and treatment; imaging describes the haemorrhage and associated findings and supports targeted aetiologic investigation.",
      "fa": "ICB خونریزی درون پارانشیم مغز است. علت آن بر توزیع، سیر و درمان اثر می‌گذارد؛ تصویربرداری خونریزی و یافته‌های همراه را توصیف و بررسی هدفمند علت را پشتیبانی می‌کند."
    },
    "definitionTitle": {
      "de": "Definition",
      "en": "Definition",
      "fa": "تعریف"
    },
    "definitionItems": [
      {
        "title": {
          "de": "Makroblutung",
          "en": "Macrobleed",
          "fa": "ماکروبلید"
        },
        "text": {
          "de": "Größeres intraparenchymales Hämatom; Größe, Lokalisation und klinische Auswirkungen getrennt beschreiben",
          "en": "Larger intraparenchymal haematoma; describe size, location, and clinical effects separately",
          "fa": "هماتوم داخل‌پارانشیمی بزرگ‌تر؛ اندازه، محل و اثرات بالینی جداگانه توصیف شوند"
        }
      },
      {
        "title": {
          "de": "Mikroblutung",
          "en": "Microbleed",
          "fa": "میکروبلید"
        },
        "text": {
          "de": "Rundliche/ovale kleine Suszeptibilitätsherde mit Blooming, oft nur auf T2*-GRE/SWI erkennbar. Apparente Größe sequenzabhängig; Gefäß- und Kalk-Mimics ausschließen und die Verteilung einordnen.",
          "en": "Small rounded/ovoid susceptibility foci with blooming, often seen only on T2*-GRE/SWI. Apparent size is sequence-dependent; assess vascular/calcium mimics and classify distribution.",
          "fa": "کانون‌های کوچک گرد یا بیضوی سوسپتیبیلیتی همراه blooming که اغلب فقط در T2*-GRE/SWI دیده می‌شوند. اندازهٔ ظاهری به سکانس وابسته است؛ تقلیدکننده‌های عروقی/کلسیفیه بررسی و توزیع تفسیر شود."
        }
      }
    ],
    "aetiologyHeaders": [
      {
        "de": "Ursache",
        "en": "Cause",
        "fa": "علت"
      },
      {
        "de": "Einordnung",
        "en": "Classification",
        "fa": "طبقه‌بندی"
      },
      {
        "de": "Typische Lokalisation",
        "en": "Typical location",
        "fa": "محل تیپیک"
      }
    ],
    "aetiologyRows": [
      [
        {
          "de": "Arterieller Hypertonus",
          "en": "Arterial hypertension",
          "fa": "فشار خون شریانی"
        },
        {
          "de": "Arteriolopathie tiefer Perforatoren",
          "en": "Deep perforator arteriolopathy",
          "fa": "آرتریولوپاتی پرفوراتورهای عمقی"
        },
        {
          "de": "Putamen, Thalamus, Pons, Kleinhirn",
          "en": "Putamen, thalamus, pons, cerebellum",
          "fa": "پوتامن، تالاموس، پونز، مخچه"
        }
      ],
      [
        {
          "de": "Zerebrale Amyloidangiopathie (CAA)",
          "en": "Cerebral amyloid angiopathy (CAA)",
          "fa": "آنژیوپاتی آمیلوئید مغزی (CAA)"
        },
        {
          "de": "Kortikal-leptomeningeale Gefäßerkrankung",
          "en": "Cortical/leptomeningeal vascular disease",
          "fa": "بیماری عروق قشری و لپتومننژیال"
        },
        {
          "de": "Lobär (kortexnah), oft multipel",
          "en": "Lobar (cortical), often multiple",
          "fa": "لوبار (نزدیک کورتکس)، اغلب چندگانه"
        }
      ],
      [
        {
          "de": "Orale Antikoagulanzien (OAK)",
          "en": "Oral anticoagulants",
          "fa": "ضدانعقادهای خوراکی"
        },
        {
          "de": "Kann Blutung bei zugrunde liegender Gefäßerkrankung begünstigen oder verstärken",
          "en": "Can predispose to or exacerbate bleeding in underlying vascular disease",
          "fa": "ممکن است خونریزی را در زمینهٔ بیماری عروقی تسهیل یا تشدید کند"
        },
        {
          "de": "Lobäre oder tiefe Lage möglich; keine feste kleine Volumengrenze",
          "en": "Lobar or deep location possible; no fixed small-volume limit",
          "fa": "محل لوبار یا عمقی ممکن است؛ محدودیت ثابت به حجم کوچک وجود ندارد"
        }
      ],
      [
        {
          "de": "Einblutung in Tumor",
          "en": "Haemorrhage into tumour",
          "fa": "خونریزی درون تومور"
        },
        {
          "de": "Mögliche sekundäre Ursache; Blut kann Restgewebe verdecken",
          "en": "Possible secondary cause; blood can conceal residual tissue",
          "fa": "علت ثانویهٔ احتمالی؛ خون می‌تواند بافت باقی‌مانده را پنهان کند"
        },
        {
          "de": "Variabel, oft perifokal Ödem > Hämatom",
          "en": "Variable, perilesional oedema often > haematoma",
          "fa": "متغیر، اغلب ادم اطراف > هماتوم"
        }
      ],
      [
        {
          "de": "Vaskuläre Malformationen (AVM, Kavernom)",
          "en": "Vascular malformations (AVM, cavernoma)",
          "fa": "مالفورماسیون‌های عروقی (AVM، کاورنوم)"
        },
        {
          "de": "Mögliche strukturelle Blutungsursache",
          "en": "Possible structural cause of haemorrhage",
          "fa": "علت ساختاری احتمالی خونریزی"
        },
        {
          "de": "Variabel, eher jüngere Patienten",
          "en": "Variable, younger patients more common",
          "fa": "متغیر، بیماران جوان‌تر"
        }
      ]
    ],
    "cave": {
      "de": "Ein unverhältnismäßig ausgeprägtes perifokales Ödem kann auf eine sekundäre Ursache wie Tumor oder hämorrhagischen Infarkt hinweisen. Bei jungem Alter, atypischer Lokalisation oder fehlenden Hinweisen auf eine hypertensive Mikroangiopathie sollte eine sekundäre vaskuläre Ursache gezielt erwogen werden; Auswahl und Zeitpunkt der Gefäßbildgebung richten sich nach dem klinisch-radiologischen Kontext.",
      "en": "Disproportionate perilesional oedema may suggest a secondary cause such as tumour or haemorrhagic infarction. In a younger patient, atypical location or absence of small-vessel disease markers, consider a secondary vascular cause; the choice and timing of vascular imaging depend on the clinical and imaging context.",
      "fa": "ادم پریفوکال نامتناسب ممکن است علت ثانویه‌ای مانند تومور یا انفارکت هموراژیک را مطرح کند. در بیمار جوان، محل غیرمعمول یا نبود نشانه‌های بیماری عروق کوچک، علت عروقی ثانویه را هدفمند بررسی کنید؛ انتخاب و زمان تصویربرداری عروقی به زمینهٔ بالینی و تصویربرداری بستگی دارد."
    },
    "key": {
      "de": "Bei spontaner ICB sind hypertensive Arteriopathie und CAA wichtige Ursachen. Verteilung, Alter, Anamnese und weitere Bildgebungsmarker helfen bei der Einordnung; sekundäre Ursachen müssen im passenden Kontext mitbedacht werden.",
      "en": "In spontaneous ICH, hypertensive arteriopathy and CAA are important causes. Distribution, age, history and other imaging markers help with assessment; consider secondary causes in the appropriate context.",
      "fa": "در ICB خودبه‌خودی، آرتریوپاتی هیپرتانسیو و CAA از علل مهم هستند. توزیع، سن، شرح‌حال و سایر نشانگرهای تصویربرداری به ارزیابی کمک می‌کنند؛ علل ثانویه را نیز در زمینهٔ مناسب در نظر بگیرید."
    }
  },
  "ct": {
    "title": {
      "de": "CT-Diagnostik · Stadien und Zeichen",
      "en": "CT diagnosis · stages and signs",
      "fa": "تشخیص CT · مراحل و علائم"
    },
    "lead": {
      "de": "Das native CCT ist meist die rasch verfügbare Akutuntersuchung: Es zeigt frisches Blut, Volumen, Ventrikeleinbruch und Ödem. Auch eine geeignete, unverzüglich verfügbare MRT kann akute Blutung erfassen; die Wahl richtet sich nach klinischer Situation und lokaler Verfügbarkeit.",
      "en": "Unenhanced CT is usually the promptly available acute study, showing fresh blood, volume, intraventricular extension and oedema. Suitable immediately available MRI can also detect acute haemorrhage; choose according to clinical circumstances and local availability.",
      "fa": "CT بدون تزریق معمولاً بررسی سریعِ در دسترس در مرحلهٔ حاد است و خون تازه، حجم، گسترش به بطن‌ها و ادم را نشان می‌دهد. MRI مناسب و بی‌درنگ در دسترس نیز می‌تواند خونریزی حاد را آشکار کند؛ انتخاب به وضعیت بالینی و امکانات محلی بستگی دارد."
    },
    "stagesHeaders": [
      {
        "de": "Stadium",
        "en": "Stage",
        "fa": "مرحله"
      },
      {
        "de": "Zeitraum",
        "en": "Timeframe",
        "fa": "بازه زمانی"
      },
      {
        "de": "CT nativ",
        "en": "NCCT",
        "fa": "CT بدون کنتراست"
      },
      {
        "de": "CT + KM",
        "en": "CT + contrast",
        "fa": "CT با کنتراست"
      }
    ],
    "stagesRows": [
      [
        {
          "de": "Akut",
          "en": "Acute",
          "fa": "حاد"
        },
        {
          "de": "Stunden bis Tage; variabel",
          "en": "Hours to days; variable",
          "fa": "ساعت تا چند روز؛ متغیر"
        },
        {
          "de": "Oft hyperdens (im PDF-Beispiel 50–80 HU); abhängig u. a. von Hämatokrit und Technik",
          "en": "Often hyperattenuating (50–80 HU in the PDF example); also depends on haematocrit and technique",
          "fa": "اغلب پرچگال (در مثال PDF حدود ۵۰ تا ۸۰ HU)؛ وابسته از جمله به هماتوکریت و تکنیک"
        },
        {
          "de": "CTA-Spot-Sign: Kontrastmittelextravasation; Expansionsrisiko, keine Gewissheit",
          "en": "CTA spot sign: contrast extravasation; expansion risk, not certainty",
          "fa": "Spot sign در CTA: خروج ماده حاجب؛ خطر گسترش را مطرح می‌کند، نه قطعیت"
        }
      ],
      [
        {
          "de": "Subakut",
          "en": "Subacute",
          "fa": "زیرحاد"
        },
        {
          "de": "Tage bis Wochen; variabel",
          "en": "Days to weeks; variable",
          "fa": "چند روز تا چند هفته؛ متغیر"
        },
        {
          "de": "Dichte nimmt im Verlauf oft ab; kann vorübergehend hirnisodens werden",
          "en": "Attenuation often falls over time and may become temporarily isoattenuating to brain",
          "fa": "دانسیته اغلب با گذشت زمان کم می‌شود و ممکن است موقتاً با پارانشیم هم‌دانسیته شود"
        },
        {
          "de": "Randständige Kontrastmittelaufnahme kann auftreten; unspezifisch",
          "en": "Peripheral enhancement may occur; it is nonspecific",
          "fa": "جذب مادهٔ حاجب در حاشیه ممکن است دیده شود؛ اختصاصی نیست"
        }
      ],
      [
        {
          "de": "Chronisch",
          "en": "Chronic",
          "fa": "مزمن"
        },
        {
          "de": "Wochen bis Monate; variabel",
          "en": "Weeks to months; variable",
          "fa": "چند هفته تا چند ماه؛ متغیر"
        },
        {
          "de": "Hypodense Resorptionshöhle oder Residualveränderungen",
          "en": "Hypoattenuating resorption cavity or residual change",
          "fa": "حفرهٔ جذب کم‌دانسیته یا تغییرات باقی‌مانده"
        },
        {
          "de": "Persistierende Randaufnahme ist möglich und allein nicht diagnostisch",
          "en": "Persistent peripheral enhancement is possible and is not diagnostic by itself",
          "fa": "جذب پایدار مادهٔ حاجب در حاشیه ممکن است رخ دهد و به‌تنهایی تشخیصی نیست"
        }
      ]
    ],
    "signsTitle": {
      "de": "Wichtige CT-Zeichen",
      "en": "Key CT signs",
      "fa": "علائم مهم CT"
    },
    "signs": [
      {
        "title": {
          "de": "Swirl Sign",
          "en": "Swirl Sign",
          "fa": "Swirl Sign"
        },
        "text": {
          "de": "Hypodense Areale im hyperdensen Hämatom können einen noch nicht koagulierten Anteil darstellen. Als Heterogenitätszeichen können sie mit Hämatomexpansion assoziiert sein; sie beweisen keine aktuell aktive Blutung.",
          "en": "Hypoattenuating areas within a hyperattenuating haematoma may represent an unclotted component. As a heterogeneity marker they may be associated with haematoma expansion; they do not prove active bleeding at the time of imaging.",
          "fa": "نواحی کم‌دانسیته درون هماتوم پرچگال ممکن است نشان‌دهندهٔ بخش لخته‌نشده باشند. این ناهمگنی می‌تواند با گسترش هماتوم ارتباط داشته باشد، اما خونریزی فعال در زمان تصویربرداری را ثابت نمی‌کند."
        }
      },
      {
        "title": {
          "de": "Spot Sign (CTA)",
          "en": "Spot Sign (CTA)",
          "fa": "علامت اسپات در CTA"
        },
        "text": {
          "de": "Fokaler Kontrastmittelaustritt im Hämatom auf CTA; ein positives Spot Sign ist mit Hämatomexpansion assoziiert. Aussagekraft und Vorhersagewerte hängen unter anderem vom CTA-Zeitpunkt ab und erlauben keine sichere Individualprognose.",
          "en": "Focal contrast extravasation within the haematoma on CTA; a positive spot sign is associated with haematoma expansion. Its performance and predictive values depend in part on CTA timing and do not provide a certain individual prognosis.",
          "fa": "خروج کانونی ماده حاجب درون هماتوم در CTA؛ Spot sign مثبت با گسترش هماتوم ارتباط دارد. عملکرد و ارزش پیش‌بینی آن تا حدی به زمان CTA وابسته است و پیش‌آگهی قطعی فردی نمی‌دهد."
        }
      },
      {
        "title": {
          "de": "Ventrikeleinbruch",
          "en": "Intraventricular extension",
          "fa": "نفوذ به بطن"
        },
        "text": {
          "de": "Hämatom bricht in das Ventrikelsystem ein → Aufstau, Hydrozephalus, schlechtere Prognose.",
          "en": "Haematoma extends into the ventricular system → obstruction, hydrocephalus, worse prognosis.",
          "fa": "هماتوم به سیستم بطنی نفوذ می‌کند → انسداد، هیدروسفالوس، پیش‌آگهی بدتر."
        }
      }
    ],
    "key": {
      "de": "Natives CT: frisches Blut ist meist hyperdens. Mit der Resorption nimmt die Dichte ab und kann sich dem Hirnparenchym annähern; Zeitverlauf und HU sind variabel und erlauben keine lineare Datierung. Bei unspezifischer Randanreicherung Differenzialdiagnosen wie Infektion oder Tumor im Kontext prüfen.",
      "en": "On non-contrast CT, fresh blood is usually hyperattenuating. Attenuation falls during resorption and may approach that of brain; timing and HU are variable and do not support linear age dating. If peripheral enhancement is present, assess alternatives such as infection or tumour in context.",
      "fa": "در CT بدون کنتراست، خون تازه معمولاً پرچگال است. با جذب هماتوم دانسیته کاهش می‌یابد و ممکن است به دانسیتهٔ پارانشیم مغز نزدیک شود؛ زمان‌بندی و HU متغیرند و برای تعیین خطی سن خونریزی مناسب نیستند. در صورت تقویت محیطی، علل دیگری مانند عفونت یا تومور را در زمینهٔ بالینی بررسی کنید."
    }
  },
  "mrt": {
    "title": {
      "de": "MRT-Signalverhalten · Pathophysiologie",
      "en": "MRI signal behaviour · pathophysiology",
      "fa": "سیر سیگنال MRI · پاتوفیزیولوژی"
    },
    "lead": {
      "de": "Das MRT-Signal einer ICB ist kein einfaches Befundmuster, sondern spiegelt die biochemische Umwandlung von Hämoglobin wider. Entscheidend ist die Oxidationsstufe des Hämoglobins und die Integrität der Erythrozyten.",
      "en": "The MRI signal of ICB does not follow a simple pattern: it reflects the biochemical conversion of haemoglobin. The oxidation state of haemoglobin and erythrocyte integrity are the key determinants.",
      "fa": "سیگنال MRI در ICB یک الگوی ساده نیست، بلکه تبدیل بیوشیمیایی هموگلوبین را منعکس می‌کند. وضعیت اکسیداسیون هموگلوبین و یکپارچگی اریتروسیت‌ها تعیین‌کننده‌های اصلی هستند."
    },
    "pathophysItems": [
      {
        "title": {
          "de": "Oxy-Hb · hyperakut",
          "en": "Oxy-Hb · hyperacute",
          "fa": "Oxy-Hb · فوق‌حاد"
        },
        "text": {
          "de": "Oxy-Hb ist diamagnetisch. Das typische Signalmodell beschreibt T1 als iso bis leicht hypointens und T2 als hyperintens; frühe Blutung kann in suszeptibilitätsgewichteten Sequenzen dennoch sichtbar sein. Einzelne Sequenzen und das exakte Alter reichen nicht allein zur Stadieneinteilung.",
          "en": "Oxyhaemoglobin is diamagnetic. The typical signal model describes T1 as iso- to mildly hypointense and T2 as hyperintense; early haemorrhage may still be visible on susceptibility-sensitive sequences. A single sequence or exact age alone is insufficient for staging.",
          "fa": "اکسی‌هموگلوبین دیامغناطیس است. الگوی معمول، T1 ایزو تا کمی کم‌سیگنال و T2 پرسیگنال را توصیف می‌کند؛ با این حال خونریزی زودرس ممکن است در توالی‌های حساس به سوسپتیبیلیتی هم دیده شود. یک توالی یا سن دقیق به‌تنهایی برای مرحله‌بندی کافی نیست."
        }
      },
      {
        "title": {
          "de": "Deoxy-Hb · akut",
          "en": "Deoxy-Hb · acute",
          "fa": "Deoxy-Hb · حاد"
        },
        "text": {
          "de": "Intrazelluläres Deoxy-Hb passt im typischen akuten Muster zu T1 iso-/hypointens und T2 hypointens. Suszeptibilität kann in blutsensitiven Sequenzen deutlich sein. Signalentwicklung und Blutungsalter sind variabel.",
          "en": "Intracellular deoxyHb fits the typical acute pattern of T1 iso/hypointensity and T2 hypointensity. Susceptibility may be conspicuous on blood-sensitive sequences. Signal evolution and haemorrhage timing vary.",
          "fa": "دئوکسی‌هموگلوبین داخل‌سلولی با الگوی حاد معمولِ T1 ایزو یا پایین و T2 پایین سازگار است. اثر حساسیت مغناطیسی می‌تواند در سکانس‌های حساس به خون برجسته باشد. سیر سیگنال و زمان‌بندی خونریزی متغیرند."
        }
      },
      {
        "title": {
          "de": "Met-Hb intrazellulär · früh subakut",
          "en": "Met-Hb intracellular · early subacute",
          "fa": "Met-Hb داخل سلولی · زیرحاد اولیه"
        },
        "text": {
          "de": "Intrazelluläres Met-Hb geht häufig mit T1-Hyperintensität einher; T2 kann dabei noch hypointens sein. Der Übergang erfolgt nicht an einem festen Tag und kann innerhalb eines Hämatoms räumlich variieren.",
          "en": "Intracellular metHb is often associated with T1 hyperintensity while T2 may remain hypointense. The transition does not occur on a fixed day and can vary spatially within one haematoma.",
          "fa": "مت‌هموگلوبین داخل‌سلولی اغلب با پرسیگنال‌شدن T1 همراه است و T2 ممکن است همچنان کم‌سیگنال باشد. این گذار در روز ثابتی رخ نمی‌دهد و می‌تواند در بخش‌های مختلف یک هماتوم متفاوت باشد."
        }
      },
      {
        "title": {
          "de": "Met-Hb extrazellulär · spät subakut",
          "en": "Met-Hb extracellular · late subacute",
          "fa": "Met-Hb خارج سلولی · زیرحاد دیررس"
        },
        "text": {
          "de": "Nach der Erythrozytenlyse kann extrazelluläres Met-Hb sowohl T1 als auch T2 hyperintens erscheinen lassen. Dieses bright-bright-Muster ist nicht spezifisch; Suszeptibilität, Verlauf und klinischer Kontext helfen bei der Einordnung.",
          "en": "After erythrocyte lysis, extracellular metHb may make both T1 and T2 hyperintense. This bright-bright pattern is nonspecific; susceptibility, interval change and clinical context help with interpretation.",
          "fa": "پس از لیز اریتروسیت، مت‌هموگلوبین خارج‌سلولی می‌تواند T1 و T2 را پرسیگنال کند. الگوی روشن-روشن اختصاصی نیست؛ سوسپتیبیلیتی، تغییرات پیگیری و زمینهٔ بالینی به تفسیر کمک می‌کنند."
        }
      },
      {
        "title": {
          "de": "Hämosiderin · chronisch",
          "en": "Haemosiderin · chronic",
          "fa": "هموسیدرین · مزمن"
        },
        "text": {
          "de": "Hämosiderin/Ferritin können als Suszeptibilitätsrand persistieren. SWI/T2* ist besonders sensitiv für solche Residuen und kleine Blutprodukte; ob eine alte größere Blutung im CT noch sichtbar ist, hängt von der Residualmorphologie ab.",
          "en": "Haemosiderin/ferritin may persist as a susceptibility rim. SWI/T2* is particularly sensitive to these residues and small blood products; whether a larger old haemorrhage remains visible on CT depends on its residual morphology.",
          "fa": "هموسیدرین/فریتین ممکن است به‌شکل حاشیهٔ سوسپتیبیلیتی باقی بمانند. SWI/T2* برای این بقایا و محصولات خونی کوچک حساس است؛ دیده‌شدن خونریزی قدیمی بزرگ‌تر در CT به مورفولوژی باقی‌مانده بستگی دارد."
        }
      }
    ],
    "sourceFlowchartAlt": {
      "de": "Originale Tabelle aus Gehirn.pdf, PDF-Seite 20: MRT-Signal einer intrazerebralen Blutung bei 1,5 T in sechs zeitlichen Stadien.",
      "en": "Original table from Gehirn.pdf, PDF page 20: MRI signal of intracerebral haemorrhage at 1.5 T across six time stages.",
      "fa": "جدول اصلی از Gehirn.pdf، صفحهٔ ۲۰ PDF: سیگنال MRI خونریزی داخل‌مغزی در ۱٫۵ تسلا طی شش مرحلهٔ زمانی."
    },
    "sourceFlowchartCaption": {
      "de": "Quelle: Gehirn.pdf, PDF-Seite 20 (gedruckte Seite 19). Die Zeitfenster und Signalmerkmale beziehen sich auf 1,5 T und sind ein Orientierungsmodell; Stadiengrenzen sind fließend und können innerhalb eines Hämatoms variieren.",
      "en": "Source: Gehirn.pdf, PDF page 20 (printed page 19). The time windows and signal features refer to 1.5 T and are a teaching model; stage boundaries are not sharp and can vary within a haematoma.",
      "fa": "منبع: Gehirn.pdf، صفحهٔ ۲۰ PDF (صفحهٔ چاپی ۱۹). بازه‌های زمانی و ویژگی‌های سیگنال در منبع به ۱٫۵ تسلا مربوط‌اند و یک مدل آموزشی هستند؛ مرز مراحل قطعی نیست و در بخش‌های مختلف هماتوم تغییر می‌کند."
    },
    "signalDiagramAlt": {
      "de": "Schematische Zusammenfassung von T1-, T2-, T2*/SWI- und DWI-Signal über sechs ICB-Stadien.",
      "en": "Conceptual summary of T1, T2, T2*/SWI and DWI signal across six ICH stages.",
      "fa": "خلاصهٔ شماتیک سیگنال T1، T2، T2*/SWI و DWI در شش مرحلهٔ ICB."
    },
    "cave": {
      "de": "Die Stadiengrenzen sind fließend und hämatomgrößenabhängig. Die Konversion läuft von peripher nach zentral: Das Zentrum eines großen Hämatoms kann noch akutes Deoxy-Hb zeigen, während die Peripherie bereits Met-Hb aufweist.",
      "en": "Stage boundaries are not sharp and depend on haematoma size. Conversion proceeds from periphery to centre: the centre of a large haematoma may still show acute deoxyHb while the periphery already shows metHb.",
      "fa": "مرزهای مراحل قطعی نیستند و به اندازه هماتوم بستگی دارند. تبدیل از محیط به مرکز پیش می‌رود: مرکز یک هماتوم بزرگ ممکن است هنوز Deoxy-Hb حاد نشان دهد در حالی که محیط آن Met-Hb دارد."
    },
    "key": {
      "de": "T1-Hyperintensität kann im subakuten Verlauf auftreten, hat aber keinen festen Tagesgrenzwert. Bright–Bright ist unspezifisch: Suszeptibilität, Verlauf und klinischen Kontext gemeinsam beurteilen.",
      "en": "T1 hyperintensity may occur during the subacute course, but it has no fixed day threshold. Bright-bright is nonspecific: assess susceptibility, interval change and clinical context together.",
      "fa": "پرسیگنال‌شدن T1 ممکن است در سیر زیرحاد رخ دهد، اما مرز روزانهٔ ثابتی ندارد. الگوی روشن-روشن اختصاصی نیست؛ سوسپتیبیلیتی، تغییرات پیگیری و زمینهٔ بالینی را با هم ارزیابی کنید."
    }
  },
  "sequenzen": {
    "title": {
      "de": "Klinisch wertvolle Sequenzen je Stadium",
      "en": "Clinically useful sequences by stage",
      "fa": "سکانس‌های مفید بالینی بر اساس مرحله"
    },
    "lead": {
      "de": "Je nach klinischem Kontext und Stadium der Blutung sind unterschiedliche MRT-Sequenzen am aussagekräftigsten. Die Kombination mehrerer Sequenzen erhöht Sicherheit und Staging-Genauigkeit.",
      "en": "Depending on the clinical context and stage of haemorrhage, different MRI sequences are most informative. Combining sequences improves confidence and staging accuracy.",
      "fa": "بسته به زمینهٔ بالینی و مرحله خونریزی، سکانس‌های مختلف MRI اطلاعات بیشتری می‌دهند. ترکیب چند سکانس اعتماد و دقت مرحله‌بندی را بهبود می‌دهد."
    },
    "items": [
      {
        "title": {
          "de": "Hyperakut / akut → SWI / T2*",
          "en": "Hyperacute / acute → SWI / T2*",
          "fa": "فوق‌حاد / حاد → SWI / T2*"
        },
        "text": {
          "de": "GRE/SWI erfasst Suszeptibilitätseffekte und ergänzt die Gesamtbeurteilung. CT ist häufig schneller verfügbar; eine geeignete, ohne Verzögerung verfügbare MRT kann akute Blutung ebenfalls erfassen. Sichtbarkeit hängt von Sequenz und Blutverteilung ab.",
          "en": "GRE/SWI depicts susceptibility effects and complements overall assessment. CT is often more promptly available; suitable MRI available without delay can also detect acute haemorrhage. Visibility depends on sequence and blood distribution.",
          "fa": "GRE/SWI اثرات سوسپتیبیلیتی را نشان می‌دهد و مکمل ارزیابی کلی است. CT اغلب سریع‌تر در دسترس است؛ MRI مناسب و بدون تأخیر نیز می‌تواند خونریزی حاد را آشکار کند. دیده‌شدن به سکانس و توزیع خون وابسته است."
        }
      },
      {
        "title": {
          "de": "Früh subakut → T1 w.o. KM",
          "en": "Early subacute → T1 without contrast",
          "fa": "زیرحاد اولیه → T1 بدون کنتراست"
        },
        "text": {
          "de": "Intrazelluläres Met-Hb kann T1-hyperintens werden. Das kann im subakuten Verlauf auftreten, erlaubt wegen variabler Übergänge aber keine exakte Datierung; eine periphere Signaländerung kann der zentralen vorausgehen.",
          "en": "Intracellular metHb can become T1 hyperintense. This may occur during the subacute course, but variable transitions prevent exact dating; peripheral signal change may precede central change.",
          "fa": "Met-Hb داخل‌سلولی می‌تواند در T1 پرسیگنال شود. این تغییر ممکن است در سیر زیرحاد رخ دهد، اما گذارهای متغیر اجازهٔ تاریخ‌گذاری دقیق نمی‌دهند؛ تغییر سیگنال محیطی ممکن است زودتر از مرکز رخ دهد."
        }
      },
      {
        "title": {
          "de": "Spät subakut → T1 + T2 + SWI",
          "en": "Late subacute → T1 + T2 + SWI",
          "fa": "زیرحاد دیررس → T1 + T2 + SWI"
        },
        "text": {
          "de": "Extrazelluläres Met-Hb kann T1 und T2 hyperintens machen. Dieses Muster ist unspezifisch; Suszeptibilität, Morphologie, Verlauf und klinischer Kontext gehören zur Differenzialdiagnose.",
          "en": "Extracellular metHb can make both T1 and T2 hyperintense. This pattern is nonspecific; susceptibility, morphology, interval change and clinical context inform the differential.",
          "fa": "Met-Hb خارج‌سلولی می‌تواند هر دو سکانس T1 و T2 را پرسیگنال کند. این الگو اختصاصی نیست؛ سوسپتیبیلیتی، مورفولوژی، تغییرات پیگیری و زمینهٔ بالینی در تشخیص افتراقی کمک می‌کنند."
        }
      },
      {
        "title": {
          "de": "Chronisch → SWI / T2* ergänzen",
          "en": "Chronic → add SWI / T2*",
          "fa": "مزمن → افزودن SWI / T2*"
        },
        "text": {
          "de": "SWI/T2* ist besonders sensitiv für kleine Residuen und Suszeptibilitätsränder. Die CT kann je nach verbliebener Morphologie weiterhin Veränderungen zeigen.",
          "en": "SWI/T2* is particularly sensitive to small residues and susceptibility rims. CT may still show changes depending on residual morphology.",
          "fa": "SWI/T2* برای بقایای کوچک و حاشیه‌های سوسپتیبیلیتی حساس است. CT نیز بسته به مورفولوژی باقی‌مانده ممکن است تغییرات را نشان دهد."
        }
      }
    ],
    "ddItems": [
      {
        "title": {
          "de": "Bright–Bright → Melanommetastase?",
          "en": "\"Bright-bright\" → melanoma metastasis?",
          "fa": "الگوی روشن-روشن (Bright-Bright) → متاستاز ملانوم؟"
        },
        "text": {
          "de": "T1/T2-Hyperintensität ist unspezifisch und kann auch bei Melanin oder Fett vorkommen. SWI/T2*, fettunterdrückte Sequenzen, Morphologie, Verlauf und Klinik gemeinsam beurteilen; kein Einzelzeichen ist beweisend.",
          "en": "T1/T2 hyperintensity is nonspecific and may also occur with melanin or fat. Assess SWI/T2*, fat-suppressed sequences, morphology, interval change and clinical context together; no single sign is definitive.",
          "fa": "پرسیگنال‌شدن T1/T2 اختصاصی نیست و ممکن است در ملانین یا چربی نیز دیده شود. SWI/T2*، توالی‌های سرکوب چربی، مورفولوژی، تغییرات پیگیری و زمینهٔ بالینی را با هم ارزیابی کنید؛ هیچ علامت منفردی قطعی نیست."
        }
      },
      {
        "title": {
          "de": "Ringenhancement → Abszess? Tumor?",
          "en": "Ring enhancement → abscess? tumour?",
          "fa": "افزایش سیگنال حلقوی پس از کنتراست ← آبسه؟ تومور؟"
        },
        "text": {
          "de": "Zentrale DWI-Hyperintensität mit niedrigem ADC stützt einen Abszess, ist aber nicht pathognomonisch; Tumorausnahmen kommen vor. Randaufnahme und Ödem allein trennen die Ursachen nicht. Klinik, Morphologie und gegebenenfalls Verlauf gemeinsam beurteilen.",
          "en": "Central DWI hyperintensity with low ADC supports abscess but is not pathognomonic; tumour exceptions occur. Rim enhancement and oedema alone do not distinguish causes. Integrate clinical context, morphology and, where appropriate, follow-up.",
          "fa": "روشن‌بودن مرکزی در DWI همراه ADC پایین از آبسه حمایت می‌کند، اما اختصاصی قطعی نیست؛ موارد استثنای توموری وجود دارند. جذب مادهٔ حاجب در حاشیه و ادم به‌تنهایی علت‌ها را جدا نمی‌کنند. زمینهٔ بالینی، مورفولوژی و در صورت لزوم پیگیری با هم ارزیابی شوند."
        }
      }
    ],
    "key": {
      "de": "Akut zügig CT oder geeignete sofort verfügbare MRT einsetzen. GRE/SWI, T1 und T2 gemeinsam beurteilen; Sequenzwahl und zeitliche Einordnung richten sich nach Klinik, Morphologie und Verlauf.",
      "en": "Use prompt CT or suitable immediately available MRI acutely. Interpret GRE/SWI, T1 and T2 together; sequence choice and timing assessment depend on clinical context, morphology and evolution.",
      "fa": "در مرحلهٔ حاد CT سریع یا MRI مناسبِ بی‌درنگ در دسترس انجام شود. GRE/SWI، T1 و T2 با هم تفسیر شوند؛ انتخاب سکانس و ارزیابی زمان‌بندی به زمینهٔ بالینی، مورفولوژی و سیر بستگی دارند."
    }
  },
  "cases": {
    "title": {
      "de": "Fallbeispiele · Radiopaedia",
      "en": "Cases · Radiopaedia",
      "fa": "نمونه کیس‌ها · Radiopaedia"
    },
    "lead": {
      "de": "Drei Fälle von Radiopaedia.org illustrieren CT und MRT der ICB in verschiedenen Stadien.",
      "en": "Three Radiopaedia.org cases illustrate CT and MRI of ICB at different stages.",
      "fa": "سه کیس از Radiopaedia.org CT و MRI در مراحل مختلف ICB را نشان می‌دهند."
    }
  },
  "takehome": {
    "title": {
      "de": "Take home message",
      "en": "Take-home messages",
      "fa": "نکات کلیدی"
    },
    "lead": {
      "de": "Die wichtigsten Merksätze zur ICB.",
      "en": "The key take-home points for ICB.",
      "fa": "مهم‌ترین نکات کلیدی درباره ICB."
    },
    "items": [
      {
        "title": {
          "de": "CT-Dichte akut",
          "en": "Acute CT attenuation",
          "fa": "دانسیته CT حاد"
        },
        "text": {
          "de": "Frisches Blut ist oft hyperdens. Bei der Resorption kann die Dichte abnehmen und das Hämatom vorübergehend hirnisodens werden; HU-Werte und Zeitpunkt variieren.",
          "en": "Fresh blood is often hyperattenuating. During resorption, attenuation may fall and the haematoma may temporarily become isoattenuating to brain; HU values and timing vary.",
          "fa": "خون تازه اغلب پرچگال است. هنگام جذب، دانسیته ممکن است کم شود و هماتوم موقتاً با مغز هم‌دانسیته شود؛ مقدار HU و زمان‌بندی متغیر است."
        }
      },
      {
        "title": {
          "de": "Swirl & Spot Sign",
          "en": "Swirl & spot sign",
          "fa": "علامت چرخش (Swirl sign) و علامت اسپات (Spot sign)"
        },
        "text": {
          "de": "Swirl- und Spot-Sign können mit Hämatomexpansion assoziiert sein. Beide Zeichen unterstützen die Risikoeinschätzung, beweisen aber nicht allein eine laufende Blutung oder eine sichere Expansion.",
          "en": "Swirl and spot signs may be associated with haematoma expansion. Both support risk assessment but do not alone prove ongoing bleeding or certain expansion.",
          "fa": "علامت Swirl و Spot ممکن است با گسترش هماتوم ارتباط داشته باشند. این دو به ارزیابی خطر کمک می‌کنند، اما به‌تنهایی خونریزی جاری یا گسترش قطعی را ثابت نمی‌کنند."
        }
      },
      {
        "title": {
          "de": "MRT-Wendepunkt früh subakut",
          "en": "MRI turning point – early subacute",
          "fa": "نقطه عطف MRI — زیرحاد اولیه"
        },
        "text": {
          "de": "T1-Hyperintensität kann im subakuten Verlauf auftreten, hat aber keinen festen Tagesgrenzwert; die Umwandlung kann an der Peripherie beginnen.",
          "en": "T1 hyperintensity may occur during the subacute course but has no fixed day threshold; conversion may begin at the periphery.",
          "fa": "پرسیگنال‌شدن T1 ممکن است در سیر زیرحاد رخ دهد، اما مرز روزانهٔ ثابتی ندارد؛ تبدیل ممکن است از محیط آغاز شود."
        }
      },
      {
        "title": {
          "de": "Bright–Bright = Falle",
          "en": "\"Bright-bright\" = pitfall",
          "fa": "الگوی روشن-روشن (Bright-Bright) = دام"
        },
        "text": {
          "de": "T1 und T2 können beide hell sein. Das Muster ist unspezifisch; SWI, Verlauf und klinischer Kontext müssen mitbeurteilt werden.",
          "en": "T1 and T2 may both be bright. The pattern is nonspecific; SWI, interval change and clinical context must also be assessed.",
          "fa": "T1 و T2 ممکن است هر دو روشن باشند. این الگو اختصاصی نیست؛ SWI، تغییرات پیگیری و زمینهٔ بالینی را هم ارزیابی کنید."
        }
      },
      {
        "title": {
          "de": "SWI für Mikroblutungen",
          "en": "SWI for microbleeds",
          "fa": "SWI برای میکروبلیدها"
        },
        "text": {
          "de": "SWI ist besonders sensitiv für Mikroblutungen. Verteilungsmuster können eine zugrunde liegende Mikroangiopathie nahelegen, sind aber im klinischen und bildgebenden Kontext zu bewerten.",
          "en": "SWI is particularly sensitive for microbleeds. Their distribution may suggest an underlying small-vessel disease but must be assessed in clinical and imaging context.",
          "fa": "SWI برای میکروخونریزی‌ها حساسیت بالایی دارد. الگوی توزیع می‌تواند بیماری زمینه‌ای عروق کوچک را مطرح کند، اما باید در زمینهٔ بالینی و تصویربرداری ارزیابی شود."
        }
      }
    ]
  },
  "learningGoals": [
    {
      "id": "icb-etiology",
      "text": {
        "de": "Blutungs- und Mikroblutungsverteilung zur Ursachensuche nutzen, ohne das Muster als alleinigen Beweis zu behandeln.",
        "en": "Use haemorrhage and microbleed distribution to guide aetiologic investigation without treating the pattern as proof.",
        "fa": "از توزیع خونریزی و میکروخونریزی برای بررسی علت استفاده کنید، بدون اینکه الگو اثبات مستقل تلقی شود."
      },
      "questionIds": [
        "icb-q01",
        "icb-q02",
        "icb-q13"
      ],
      "cardIds": [
        "icb-fc-05",
        "icb-fc-09"
      ]
    },
    {
      "id": "icb-ct",
      "text": {
        "de": "CT-Verlauf sowie Swirl und Spot unterscheiden und deren prognostische Grenzen benennen.",
        "en": "Distinguish CT evolution, swirl and spot signs and state their prognostic limits.",
        "fa": "سیر CT و علامت‌های Swirl و Spot را از هم جدا کنید و محدودیت پیش‌آگهی آن‌ها را بیان کنید."
      },
      "questionIds": [
        "icb-q03",
        "icb-q04",
        "icb-q05",
        "icb-q06"
      ],
      "cardIds": [
        "icb-fc-06",
        "icb-fc-07",
        "icb-fc-08"
      ]
    },
    {
      "id": "icb-mri",
      "text": {
        "de": "Typische Blutprodukt-Signale und geeignete Sequenzen einordnen, ohne starre Datierung.",
        "en": "Interpret typical blood-product signals and suitable sequences without rigid dating.",
        "fa": "سیگنال‌های تیپیک فرآوردهٔ خون و سکانس مناسب را بدون تعیین زمان ثابت تفسیر کنید."
      },
      "questionIds": [
        "icb-q07",
        "icb-q08",
        "icb-q09",
        "icb-q10",
        "icb-q11"
      ],
      "cardIds": [
        "icb-fc-01",
        "icb-fc-02",
        "icb-fc-03",
        "icb-fc-04",
        "icb-fc-12"
      ]
    },
    {
      "id": "icb-secondary",
      "text": {
        "de": "Bei atypischen Befunden eine kontextgerechte vaskuläre oder kontrastverstärkte Abklärung auswählen.",
        "en": "Select context-appropriate vascular or contrast-enhanced investigation for atypical findings.",
        "fa": "در یافته‌های غیرمعمول، بررسی عروقی یا با تزریق متناسب با زمینه را انتخاب کنید."
      },
      "questionIds": [
        "icb-q12",
        "icb-q14",
        "icb-q15"
      ],
      "cardIds": [
        "icb-fc-10",
        "icb-fc-11"
      ]
    }
  ]
}

export const ICB_LEARNING_CASES = [
  {
    id: 'icb-cerebellum-akut',
    // CT axial: hyperdens Kleinhirnblutung rechts – aus dem Lehrmaterial
    images: ['/icb/case-ct-cerebellum-akut.png', '/icb/case-ct-cerebellum-gross.png'],
    url: 'https://radiopaedia.org/articles/intracerebral-haemorrhage?lang=us',
    credit: L('Bildmaterial aus dem Lehrmaterial · Radiopaedia CC BY-NC-SA 3.0', 'Images from teaching material · Radiopaedia CC BY-NC-SA 3.0', 'تصاویر از محتوای آموزشی · Radiopaedia CC BY-NC-SA 3.0'),
    label: L('CT · axial · nativ · akute Kleinhirnblutung', 'CT · axial · NCCT · acute cerebellar haemorrhage', 'CT · اکسیال · بدون کنتراست · خونریزی مخچه حاد'),
    title: L(
      'Hypertensive ICB · Kleinhirn · CT nativ',
      'Hypertensive ICB · Cerebellum · NCCT',
      'ICB هیپرتانسیو · مخچه · CT بدون کنتراست'
    ),
    text: L(
      '72-jährige Patientin mit arterieller Hypertonie, akutem Schwindel und Ataxie. Bild links (akut): Hyperdens imponierende Kleinhirnblutung rechts, ~1 cm, kein perifokales Ödem. Bild rechts (Folge-CT): Zunahme auf ~3 cm mit deutlichem Ödemsaum und beginnender Kompression des 4. Ventrikels – typische Expansion einer hypertensiven ICB.',
      'A 72-year-old woman with hypertension, acute dizziness and ataxia. Left image (acute): hyperattenuating right cerebellar haemorrhage, ~1 cm, no perilesional oedema. Right image (follow-up CT): expansion to ~3 cm with oedema rim and early compression of the 4th ventricle — typical progression of hypertensive ICB.',
      'زن ۷۲ ساله با پرفشاری خون، سرگیجهٔ حاد و آتاکسی. تصویر چپ (حاد): خونریزی پرچگال مخچهٔ راست، حدود ۱ سانتی‌متر، بدون ادم اطراف. تصویر راست (CT پیگیری): افزایش تا حدود ۳ سانتی‌متر همراه با حاشیهٔ ادم و شروع فشردگی بطن چهارم؛ گسترش تیپیک خونریزی داخل مغزی ناشی از پرفشاری خون.'
    ),
    alt: L('CT axial akute Kleinhirnblutung hyperdens', 'CT axial acute cerebellar haemorrhage hyperattenuating', 'CT اکسیال خونریزی حاد مخچه هایپردنس'),
  },
  {
    id: 'icb-t1-subakut',
    // T1 MRT subakut: hell (Wendepunkt früh subakut)
    images: ['/icb/case-t1-subakut-bright.jpg', '/icb/case-swi-blooming.jpg'],
    url: 'https://radiopaedia.org/articles/mri-signal-characteristics-of-intracerebral-haemorrhage?lang=us',
    credit: L('Bildmaterial aus dem Lehrmaterial · Radiopaedia CC BY-NC-SA 3.0', 'Images from teaching material · Radiopaedia CC BY-NC-SA 3.0', 'تصاویر از محتوای آموزشی · Radiopaedia CC BY-NC-SA 3.0'),
    label: L('MRT · T1 · früh subakut → SWI · chronisch', 'MRI · T1 · early subacute → SWI · chronic', 'MRI · T1 · زیرحاد اولیه → SWI · مزمن'),
    title: L(
      'MRT-Signalwandel der ICB · T1 hell & SWI-Blooming',
      'MRI signal evolution · T1 bright & SWI blooming',
      "تغییر سیگنال MRI · T1 روشن و آرتیفکت شکوفه‌ای در SWI"
    ),
    text: L(
      'Bild links (T1 nativ): T1-Hyperintensität im subakuten Verlauf. Bild rechts (SWI): Suszeptibilitätssaum. Zeitpunkt und Signalausprägung sind variabel; eine einzelne Sequenz datiert die Blutung nicht sicher.',
      'Left image (T1 without contrast): T1 hyperintensity during the subacute course. Right image (SWI): susceptibility rim. Timing and signal appearance vary; a single sequence cannot reliably date the haemorrhage.',
      'تصویر چپ (T1 بدون کنتراست): پرسیگنال‌شدن T1 در سیر زیرحاد. تصویر راست (SWI): حاشیهٔ susceptibility. زمان و شدت سیگنال متغیر است؛ یک سکانس به‌تنهایی زمان خونریزی را با اطمینان تعیین نمی‌کند.'
    ),
    alt: L('MRT T1 hell subakut ICB und SWI Blooming', 'MRI T1 bright subacute ICB and SWI blooming', "MRI T1 روشن زیرحاد ICB و آرتیفکت شکوفه‌ای در SWI"),
  },
  {
    id: 'icb-mrt-flowchart',
    // MRT-Signalflussdiagramm aus dem Lehrdokument
    image: '/icb/mrt-flowchart.png',
    url: 'https://radiopaedia.org/articles/intracerebral-haemorrhage?lang=us',
    credit: L('Bildmaterial aus dem Lehrmaterial · Radiopaedia CC BY-NC-SA 3.0', 'Images from teaching material · Radiopaedia CC BY-NC-SA 3.0', 'تصاویر از محتوای آموزشی · Radiopaedia CC BY-NC-SA 3.0'),
    label: L('MRT · Signalverlauf · Übersichtsdiagramm', 'MRI · signal evolution · overview chart', 'MRI · سیر سیگنال · نمودار کامل'),
    title: L(
      'MR-Signalverhalten intrazerebraler Blutungen · 1,5 T',
      'MRI signal behaviour of intracerebral haemorrhage · 1.5 T',
      'رفتار سیگنال MRI در خونریزی داخل مغزی · ۱.۵ تسلا'
    ),
    text: L(
      'Übersichtsflussdiagramm: Das Staging der ICB erfolgt durch Bestimmung des Hämoglobinabbauprodukts und der Erythrozytenintegrität. Hyperakut: Oxy-Hb, iso/hypo T1. Akut: Deoxy-Hb, T2 hypo, SWI Blooming. Früh subakut: intraz. Met-Hb → T1 HELL (Wendepunkt). Spät subakut: extraz. Met-Hb → T1+T2 HELL. Chronisch: Hämosiderin → SWI Blooming-Saum persistiert.',
      'Overview flowchart: ICB staging is based on the haemoglobin degradation product and erythrocyte integrity. Hyperacute: oxyHb, iso/hypo T1. Acute: deoxyHb, T2 hypo, SWI blooming. Early subacute: intracellular metHb → T1 BRIGHT (turning point). Late subacute: extracellular metHb → T1+T2 BRIGHT. Chronic: haemosiderin → SWI blooming rim persists.',
      "نمودار کلی: مرحله‌بندی ICB بر اساس محصول تجزیه هموگلوبین و یکپارچگی اریتروسیت است. فوق‌حاد: اکسی‌هموگلوبین، T1 ایزو یا کم‌سیگنال. حاد: Deoxy-Hb، T2 هیپو، آرتیفکت شکوفه‌ای (blooming). زیرحاد اولیه: Met-Hb داخل سلولی → T1 روشن (نقطه عطف). زیرحاد دیررس: Met-Hb خارج سلولی → T1+T2 روشن. مزمن: هموسیدرین → حلقه SWI پایدار."
    ),
    alt: L('MRT Signalflussdiagramm ICB alle Stadien', 'MRI signal flowchart ICB all stages', 'نمودار جریان سیگنال MRI ICB تمام مراحل'),
  },
]

// ── MCQ QUESTIONS (15) ────────────────────────────────────────────────────────

const ICB_QUESTION_SEEDS = [
  {
    "id": "icb-q01",
    "question": {
      "de": "Welche Morphologie spricht bei einem kleinen Suszeptibilitätsherd am ehesten für eine zerebrale Mikroblutung?",
      "en": "Which morphology most strongly supports a cerebral microbleed when assessing a small susceptibility focus?",
      "fa": "در بررسی کانون کوچک سوسپتیبیلیتی، کدام مورفولوژی بیشتر از میکروخونریزی مغزی حمایت می‌کند؟"
    },
    "options": [
      {
        "de": "Rundlicher homogener Signalverlust mit Blooming, ohne flüssigkeitsähnliche Höhle",
        "en": "Rounded homogeneous signal loss with blooming and no fluid-like cavity",
        "fa": "افت سیگنال گرد و همگن همراه با blooming، بدون حفرهٔ شبیه مایع"
      },
      {
        "de": "Rundliche Höhle mit Liquorsignal auf T1/T2 und FLAIR",
        "en": "A rounded cavity following CSF signal on T1/T2 and FLAIR",
        "fa": "حفرهٔ گرد با سیگنال مایع مغزی‌نخاعی در T1/T2 و FLAIR"
      },
      {
        "de": "Tubulärer Signalverlust mit Gefäßkontinuität auf benachbarten Schichten",
        "en": "Tubular signal loss continuous with a vessel on adjacent slices",
        "fa": "افت سیگنال لوله‌ای با تداوم عروقی در برش‌های مجاور"
      },
      {
        "de": "Punktförmige dichte Verkalkung im korrespondierenden Nativ-CT",
        "en": "A punctate dense calcification on the corresponding unenhanced CT",
        "fa": "کلسیفیکاسیون متراکم نقطه‌ای در CT متناظرِ بدون تزریق"
      }
    ],
    "correct": "A",
    "explanation": {
      "de": "Mikroblutungen erscheinen als rundliche oder ovale Suszeptibilitätsherde mit Blooming. Die scheinbare Größe hängt von Sequenz und Feldstärke ab; eine starre Millimetergrenze genügt nicht. Gefäße, Kalk und andere Mimics mitbeurteilen.",
      "en": "Microbleeds appear as rounded or ovoid susceptibility foci with blooming. Apparent size depends on sequence and field strength; a rigid millimetre threshold is insufficient. Assess vessels, calcium and other mimics.",
      "fa": "میکروخونریزی‌ها به‌شکل کانون‌های گرد یا بیضوی سوسپتیبیلیتی همراه blooming دیده می‌شوند. اندازهٔ ظاهری به سکانس و قدرت میدان وابسته است؛ مرز ثابت میلی‌متری کافی نیست. عروق، کلسیم و سایر تقلیدکننده‌ها نیز بررسی شوند."
    },
    "wrongExplanations": {
      "B": {
        "de": "Eine liquorisointense Höhle passt eher zu Lakune oder perivaskulärem Raum; sie ist nicht die typische reine Mikroblutungsmorphologie.",
        "en": "A CSF-like cavity favours a lacune or perivascular space rather than the typical isolated microbleed morphology.",
        "fa": "حفرهٔ هم‌سیگنال با مایع بیشتر به نفع لاکون یا فضای دورعروقی است، نه مورفولوژی تیپیکِ میکروخونریزی منفرد."
      },
      "C": {
        "de": "Die Fortsetzung über mehrere Schichten spricht für ein Gefäß als wichtigen Mikroblutungs-Mimic.",
        "en": "Continuity across slices favours a vessel, an important microbleed mimic.",
        "fa": "تداوم در چند برش بیشتر به نفع رگ است که از تقلیدکننده‌های مهم میکروخونریزی است."
      },
      "D": {
        "de": "Kalk kann auf suszeptibilitätssensitiven Bildern ebenfalls dunkel sein; das korrespondierende CT hilft bei der Unterscheidung.",
        "en": "Calcium may also be dark on susceptibility-sensitive imaging; corresponding CT helps distinguish it.",
        "fa": "کلسیم نیز می‌تواند در تصاویر حساس به سوسپتیبیلیتی تیره باشد؛ CT متناظر در افتراق کمک می‌کند."
      }
    },
    "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC3714437/"
  },
  {
    "id": "icb-q02",
    "question": {
      "de": "Bei langjähriger Hypertonie finden sich eine spontane thalamische Blutung, tiefe Mikroblutungen und weitere Marklagerveränderungen. Welche Grunderkrankung passt am ehesten?",
      "en": "Longstanding hypertension is accompanied by spontaneous thalamic haemorrhage, deep microbleeds and additional white-matter changes. Which underlying disease fits best?",
      "fa": "در زمینهٔ پرفشاری خون طولانی‌مدت، خونریزی خودبه‌خودی تالاموس، میکروخونریزی‌های عمقی و تغییرات مادهٔ سفید دیده می‌شوند. کدام بیماری زمینه‌ای مناسب‌تر است؟"
    },
    "options": [
      {
        "de": "Hypertensive Arteriolopathie der tiefen Perforatoren",
        "en": "Hypertensive arteriolopathy of deep perforators",
        "fa": "آرتریولوپاتی ناشی از پرفشاری خون در عروق پرفوراتور عمقی"
      },
      {
        "de": "Überwiegend kortikal-leptomeningeale Amyloidangiopathie",
        "en": "Predominantly cortical/leptomeningeal amyloid angiopathy",
        "fa": "آنژیوپاتی آمیلوئید عمدتاً قشری و لپتومننژیال"
      },
      {
        "de": "Ruptur einer kortikalen arteriovenösen Malformation",
        "en": "Rupture of a cortical arteriovenous malformation",
        "fa": "پارگی مالفورماسیون شریانی‌وریدی قشری"
      },
      {
        "de": "Kortikale Venenthrombose mit hämorrhagischem Infarkt",
        "en": "Cortical venous thrombosis with haemorrhagic infarction",
        "fa": "ترومبوز ورید قشری همراه انفارکت خونریزی‌دهنده"
      }
    ],
    "correct": "A",
    "explanation": {
      "de": "Die tiefe Verteilung zusammen mit Hypertonie und weiteren Mikroangiopathiezeichen stützt eine Perforator-Arteriolopathie. Das ist eine Musterzuordnung, kein Ausschluss aller strukturellen Ursachen. Häufigkeitsprozente oder eine Blutungslokalisation allein ersetzen die Gesamtbeurteilung nicht.",
      "en": "Deep distribution with hypertension and other small-vessel disease markers supports perforator arteriolopathy. This is a pattern interpretation, not exclusion of every structural cause. A frequency estimate or location alone cannot replace the overall assessment.",
      "fa": "توزیع عمقی همراه پرفشاری خون و سایر نشانه‌های بیماری عروق کوچک از آرتریولوپاتی پرفوراتورها حمایت می‌کند. این تفسیر الگوست و همهٔ علل ساختاری را رد نمی‌کند. درصد فراوانی یا محل خونریزی به‌تنهایی جای ارزیابی کلی را نمی‌گیرد."
    },
    "wrongExplanations": {
      "B": {
        "de": "CAA ist eher mit streng lobären Blutungen und kortikaler superfizieller Siderose assoziiert; tiefe Marker passen hier stärker zur Perforator-Arteriolopathie.",
        "en": "CAA is more associated with strictly lobar haemorrhage and cortical superficial siderosis; the deep markers here favour perforator arteriolopathy.",
        "fa": "CAA بیشتر با خونریزی صرفاً لوبار و سیدروز سطحی قشر همراه است؛ نشانه‌های عمقی اینجا بیشتر به نفع آرتریولوپاتی پرفوراتورها هستند."
      },
      "C": {
        "de": "Eine AVM wird anhand ihrer Angioarchitektur geprüft; die verteilten tiefen Mikroangiopathiezeichen sprechen hier für einen anderen führenden Mechanismus.",
        "en": "Assess an AVM by its angioarchitecture; distributed deep small-vessel markers support a different leading mechanism here.",
        "fa": "AVM با معماری عروقی آن بررسی می‌شود؛ نشانه‌های منتشر بیماری عروق کوچک عمقی اینجا از مکانیسم غالب دیگری حمایت می‌کنند."
      },
      "D": {
        "de": "Eine kortikale Venenthrombose erfordert passende venöse Befunde und Infarktverteilung; das gegebene tiefe Muster ist dafür nicht typisch.",
        "en": "Cortical venous thrombosis requires compatible venous findings and infarct distribution; the stated deep pattern is not typical.",
        "fa": "ترومبوز ورید قشری به یافته‌های وریدی و توزیع انفارکت سازگار نیاز دارد؛ الگوی عمقی ذکرشده برای آن تیپیک نیست."
      }
    },
    "source": "https://www.ahajournals.org/doi/10.1161/STR.0000000000000407"
  },
  {
    "id": "icb-q03",
    "question": {
      "de": "Bei akutem fokalem Defizit zeigt das Nativ-CT einen umschriebenen intraparenchymalen Herd. Welcher Dichtebereich passt typischerweise zu frischem hyperdensem Blut?",
      "en": "Unenhanced CT in an acute focal deficit shows a discrete intraparenchymal lesion. Which attenuation range is typical of fresh hyperattenuating blood?",
      "fa": "در نقص عصبی کانونی حاد، CT بدون تزریق ضایعهٔ موضعی داخل پارانشیم نشان می‌دهد. کدام محدودهٔ دانسیته با خون تازهٔ پرچگال سازگارتر است؟"
    },
    "options": [
      {
        "de": "0–10 HU",
        "en": "0–10 HU",
        "fa": "۰ تا ۱۰ HU"
      },
      {
        "de": "20–35 HU",
        "en": "20–35 HU",
        "fa": "۲۰ تا ۳۵ HU"
      },
      {
        "de": "50–80 HU",
        "en": "50–80 HU",
        "fa": "۵۰ تا ۸۰ HU"
      },
      {
        "de": "Über 120 HU",
        "en": "Above 120 HU",
        "fa": "بیش از ۱۲۰ HU"
      }
    ],
    "correct": "C",
    "explanation": {
      "de": "Die PDF nennt 50–80 HU als typisches Beispiel. Akutes Blut ist häufig hyperdens, die tatsächliche Dichte hängt jedoch unter anderem von Konzentration, Hämatokrit und Technik ab. Der Bereich ist keine universelle Diagnose- oder Datierungsgrenze.",
      "en": "The PDF gives 50–80 HU as a typical example. Acute blood is often hyperattenuating, but actual attenuation depends on concentration, haematocrit and technique. The range is not a universal diagnostic or age-dating threshold.",
      "fa": "PDF محدودهٔ ۵۰ تا ۸۰ HU را مثال تیپیک می‌داند. خون حاد اغلب پرچگال است، ولی دانسیتهٔ واقعی از جمله به غلظت، هماتوکریت و تکنیک بستگی دارد. این محدوده مرز همگانی تشخیص یا تعیین زمان نیست."
    },
    "wrongExplanations": {
      "A": {
        "de": "Dieser Bereich liegt eher nahe Wasser/Liquor und entspricht nicht dem gefragten hyperdensen Blutbeispiel.",
        "en": "This range is closer to water/CSF rather than the hyperattenuating blood example asked for.",
        "fa": "این محدوده بیشتر نزدیک آب یا مایع مغزی‌نخاعی است و با مثال خون پرچگال مورد سؤال تطابق ندارد."
      },
      "B": {
        "de": "Dies kann sich Hirnparenchym annähern; das gefragte frische Blutbeispiel ist dichter. Isodensität schließt Blut unter anderen Umständen nicht aus.",
        "en": "This can approach brain attenuation; the acute blood example is denser. Isoattenuation does not exclude blood in other settings.",
        "fa": "این محدوده می‌تواند به دانسیتهٔ پارانشیم نزدیک باشد؛ مثال خون تازه پرچگال‌تر است. هم‌دانسیته‌بودن در شرایط دیگر خون را رد نمی‌کند."
      },
      "D": {
        "de": "So hohe Dichte kann etwa bei Kalk oder Kontrastmittel auftreten; sie ist nicht der in der PDF genannte typische Bereich. Dichte allein bleibt unspezifisch.",
        "en": "Such high attenuation may occur with calcium or contrast, but is not the typical range quoted by the PDF. Attenuation alone remains nonspecific.",
        "fa": "دانسیتهٔ بسیار بالا ممکن است در کلسیم یا مادهٔ حاجب دیده شود، ولی محدودهٔ تیپیک ذکرشده در PDF نیست. دانسیته به‌تنهایی همچنان غیراختصاصی است."
      }
    },
    "source": "https://pubs.rsna.org/doi/10.1148/123.2.335"
  },
  {
    "id": "icb-q04",
    "question": {
      "de": "Ein akutes Hämatom zeigt im nativen CT umschriebene relativ hypodense Bereiche innerhalb des hyperdensen Blutes. Welche Interpretation passt zum Swirl Sign?",
      "en": "On unenhanced CT, an acute haematoma contains focal relatively hypoattenuating regions within hyperattenuating blood. Which interpretation fits the swirl sign?",
      "fa": "در CT بدون تزریق، هماتوم حاد نواحی کم‌دانسیتهٔ موضعی درون خون پرچگال دارد. کدام تفسیر با Swirl sign سازگار است؟"
    },
    "options": [
      {
        "de": "Kontrastmittelpool als direkter CTA-Extravasationsnachweis",
        "en": "A contrast pool directly demonstrating CTA extravasation",
        "fa": "تجمع مادهٔ حاجب به‌عنوان نشانهٔ مستقیم خروج آن در CTA"
      },
      {
        "de": "Dichteheterogenität mit möglichem unverklottetem Blutanteil",
        "en": "Attenuation heterogeneity with a possible unclotted blood component",
        "fa": "ناهمگنی دانسیته با احتمال بخشی از خونِ لخته‌نشده"
      },
      {
        "de": "Gleichmäßiger peripherer Resorptionssaum als typisches subakutes Muster",
        "en": "A uniform peripheral resorption rim as a typical subacute pattern",
        "fa": "حاشیهٔ کم‌دانسیته ناشی از بازجذب تدریجی هماتوم زیرحاد"
      },
      {
        "de": "Extrahämatomales vasogenes Ödem in der benachbarten weißen Substanz",
        "en": "Vasogenic oedema outside the haematoma in adjacent white matter",
        "fa": "ادم وازوژنیک خارج هماتوم در مادهٔ سفید مجاور"
      }
    ],
    "correct": "B",
    "explanation": {
      "de": "Swirl beschreibt Dichteheterogenität im akuten Hämatom, nicht extrahämatomales Ödem oder einen CTA-Kontrastpool. Unverklottetes Blut ist eine mögliche Erklärung; das Zeichen unterstützt die Expansionsrisikoeinschätzung, beweist aber keine laufende Extravasation.",
      "en": "Swirl denotes attenuation heterogeneity within an acute haematoma, not surrounding oedema or a CTA contrast pool. Unclotted blood is one possible explanation; it supports expansion-risk assessment but does not prove ongoing extravasation.",
      "fa": "Swirl ناهمگنی دانسیته درون هماتوم حاد را توصیف می‌کند، نه ادم اطراف یا تجمع مادهٔ حاجب در CTA. خون لخته‌نشده یک توضیح ممکن است؛ علامت در ارزیابی خطر گسترش کمک می‌کند، اما خروج فعال خون را ثابت نمی‌کند."
    },
    "wrongExplanations": {
      "A": {
        "de": "Der Fall beschreibt ein Nativ-CT ohne Kontrastmittelpool. Ein Spot Sign wird auf CTA und im Vergleich mit dem Nativbild beurteilt.",
        "en": "The case describes unenhanced CT without a contrast pool. A spot sign is assessed on CTA with the unenhanced study.",
        "fa": "سناریو CT بدون تزریق را توصیف می‌کند، نه تجمع مادهٔ حاجب. Spot sign در CTA و با مقایسه با تصویر بدون تزریق ارزیابی می‌شود."
      },
      "C": {
        "de": "Ein peripherer Resorptionssaum im subakuten Verlauf kann ein Mimic sein; er ist nicht dieselbe akute intrahämatomale Heterogenität.",
        "en": "A peripheral subacute resorption rim can mimic swirl, but is not the same acute intrahaematoma heterogeneity.",
        "fa": "حاشیهٔ کم‌دانسیته ناشی از بازجذب تدریجی هماتوم زیرحاد با ناحیهٔ کم‌دانسیته درون خونِ پرچگال متفاوت است و نباید خودبه‌خود Swirl sign تلقی شود."
      },
      "D": {
        "de": "Das beschriebene Zeichen liegt innerhalb des Hämatoms; perifokales Ödem liegt außerhalb und wird getrennt beurteilt.",
        "en": "The stated sign lies within the haematoma; perilesional oedema lies outside and is assessed separately.",
        "fa": "علامت ذکرشده درون هماتوم است؛ ادم اطراف خارج آن قرار دارد و جداگانه بررسی می‌شود."
      }
    },
    "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC3517489/; https://pmc.ncbi.nlm.nih.gov/articles/PMC7410590/"
  },
  {
    "id": "icb-q05",
    "question": {
      "de": "In einem akuten Hämatom liegt auf CTA ein kleiner Kontrastmittelpool, der im Nativ-CT fehlt und keine erkennbare Verbindung zu einem Gefäß hat. Welche Einordnung passt am besten?",
      "en": "CTA shows a small contrast pool within an acute haematoma, absent on unenhanced CT and without an identifiable vessel connection. Which interpretation fits best?",
      "fa": "CTA تجمع کوچک مادهٔ حاجب را درون هماتوم حاد نشان می‌دهد که در CT بدون تزریق وجود ندارد و ارتباط عروقی مشخصی ندارد. کدام تفسیر مناسب‌تر است؟"
    },
    "options": [
      {
        "de": "Intrahämatomale Verkalkung",
        "en": "Intrahaematoma calcification",
        "fa": "کلسیفیکاسیون داخل هماتوم"
      },
      {
        "de": "CTA-Spot-Sign als fokaler Extravasationshinweis",
        "en": "CTA spot sign indicating focal extravasation",
        "fa": "Spot sign در CTA به‌عنوان سرنخ خروج کانونی مادهٔ حاجب"
      },
      {
        "de": "Natives Swirl Sign",
        "en": "Unenhanced-CT swirl sign",
        "fa": "Swirl sign در CT بدون تزریق"
      },
      {
        "de": "Durch das Hämatom ziehendes kontrastiertes Gefäß",
        "en": "An enhancing vessel traversing the haematoma",
        "fa": "رگ حاوی مادهٔ حاجب که از هماتوم عبور می‌کند"
      }
    ],
    "correct": "B",
    "explanation": {
      "de": "Ein neu sichtbarer fokaler Kontrastpool ohne Gefäßkontinuität passt zum Spot Sign. Es ist mit erhöhtem Expansionsrisiko assoziiert; Ausprägung und Vorhersage hängen unter anderem vom Aufnahmezeitpunkt ab. Ein positives Zeichen garantiert keine Expansion.",
      "en": "A new focal contrast pool without vessel continuity fits a spot sign. It is associated with increased expansion risk; appearance and prediction depend partly on acquisition timing. A positive sign does not guarantee expansion.",
      "fa": "تجمع کانونی جدید مادهٔ حاجب بدون تداوم عروقی با Spot sign سازگار است. این علامت با افزایش خطر گسترش همراه است؛ نما و ارزش پیش‌بینی تا حدی به زمان تصویربرداری بستگی دارند. مثبت‌بودن علامت گسترش را قطعی نمی‌کند."
    },
    "wrongExplanations": {
      "A": {
        "de": "Kalk sollte bereits im korrespondierenden Nativbild sichtbar sein; der Fall beschreibt eine erst nach Kontrastmittelgabe auftretende Verdichtung.",
        "en": "Calcium should be visible on the corresponding unenhanced scan; the vignette describes attenuation appearing after contrast administration.",
        "fa": "کلسیم باید در تصویر متناظر بدون تزریق دیده شود؛ سناریو افزایش دانسیته‌ای را توصیف می‌کند که پس از تزریق پدیدار شده است."
      },
      "C": {
        "de": "Swirl ist ein Nativ-CT-Heterogenitätszeichen und kein neu auftretender Kontrastmittelpool.",
        "en": "Swirl is an unenhanced-CT heterogeneity sign rather than a newly appearing contrast pool.",
        "fa": "Swirl نشانهٔ ناهمگنی در CT بدون تزریق است، نه تجمع جدید مادهٔ حاجب."
      },
      "D": {
        "de": "Die Kontinuität über benachbarte Schichten und eine Verbindung zum Gefäßbaum sprechen für ein Gefäß-Mimic; diese fehlen im Fall.",
        "en": "Continuity across slices and connection to the vascular tree favour a vessel mimic; these are absent in the vignette.",
        "fa": "تداوم در برش‌های مجاور و اتصال به درخت عروقی بیشتر به نفع رگِ تقلیدکننده است؛ این موارد در سناریو وجود ندارند."
      }
    },
    "source": "https://pubmed.ncbi.nlm.nih.gov/17322083/"
  },
  {
    "id": "icb-q06",
    "question": {
      "de": "Ein bekanntes intraparenchymales Hämatom ist in der Verlaufskontrolle kleiner und weniger dicht als im initialen CT. Welche Einordnung ist am ehesten angemessen?",
      "en": "A known intraparenchymal haematoma is smaller and less attenuating on follow-up than on initial CT. Which interpretation is most appropriate?",
      "fa": "هماتوم شناخته‌شدهٔ داخل پارانشیم در CT پیگیری نسبت به بررسی اولیه کوچک‌تر و کم‌دانسیته‌تر شده است. کدام تفسیر مناسب‌تر است؟"
    },
    "options": [
      {
        "de": "Ein neuer arterieller Infarkt ist die führende Erklärung",
        "en": "A new arterial infarct is the leading explanation",
        "fa": "انفارکت شریانی جدید توضیح اصلی است"
      },
      {
        "de": "Die Veränderung passt zu Hämatomorganisation und Resorption",
        "en": "The change fits haematoma organisation and resorption",
        "fa": "تغییر با سازمان‌یافتگی و جذب هماتوم سازگار است"
      },
      {
        "de": "Die geringere Dichte spricht vorrangig für einen neu entstandenen Abszess",
        "en": "Lower attenuation primarily favours a newly developed abscess",
        "fa": "کاهش دانسیته بیشتر به نفع آبسهٔ تازه ایجادشده است"
      },
      {
        "de": "Sekundäre Blutung in einer zugrunde liegenden Neoplasie als führende Erklärung",
        "en": "Secondary haemorrhage into an underlying neoplasm as the leading explanation",
        "fa": "خونریزی ثانویه در نئوپلاسم زمینه‌ای به‌عنوان توضیح اصلی"
      }
    ],
    "correct": "B",
    "explanation": {
      "de": "Größen- und Dichteabnahme sind mit der Entwicklung eines bekannten Hämatoms vereinbar. Dichte und zeitlicher Verlauf variieren; daraus darf kein exaktes Blutungsalter oder Ausschluss einer zugrunde liegenden Läsion abgeleitet werden.",
      "en": "Reduction in size and attenuation is compatible with evolution of a known haematoma. Attenuation and timing vary; neither an exact age nor exclusion of an underlying lesion follows from this alone.",
      "fa": "کاهش اندازه و دانسیته با سیر هماتوم شناخته‌شده سازگار است. دانسیته و زمان‌بندی متغیرند؛ از این یافته به‌تنهایی نه سن دقیق خونریزی و نه رد ضایعهٔ زمینه‌ای نتیجه می‌شود."
    },
    "wrongExplanations": {
      "A": {
        "de": "Ein neuer arterieller Infarkt erfordert passende neue territoriale Befunde; die bekannte, schrumpfende Blutung erklärt die Veränderung besser.",
        "en": "A new arterial infarct calls for new compatible territorial findings; the known shrinking haemorrhage better explains the change.",
        "fa": "انفارکت شریانی جدید به یافته‌های تازهٔ متناسب با قلمرو شریانی نیاز دارد؛ خونریزی شناخته‌شدهٔ در حال کوچک‌شدن این تغییر را بهتر توضیح می‌دهد."
      },
      "C": {
        "de": "Eine zunehmende infektiöse Läsion braucht zusätzliche klinische und bildgebende Hinweise. Die beschriebene Rückbildung allein stützt sie nicht.",
        "en": "An evolving infectious lesion requires additional clinical and imaging evidence. The described regression alone does not support it.",
        "fa": "ضایعهٔ عفونی رو به رشد به شواهد بالینی و تصویری بیشتری نیاز دارد؛ پسرفت توصیف‌شده به‌تنهایی از آن حمایت نمی‌کند."
      },
      "D": {
        "de": "Ein Tumor kann hinter einer Blutung verborgen sein, wird aber durch den Dichteabfall nicht bewiesen. Verlauf und gegebenenfalls kontrastverstärkte MRT klären die Ursache.",
        "en": "A tumour can be concealed by haemorrhage but is not established by attenuation decrease. Follow-up and, where appropriate, contrast-enhanced MRI help establish the cause.",
        "fa": "تومور ممکن است پشت خونریزی پنهان باشد، اما با افت دانسیته اثبات نمی‌شود. پیگیری و در صورت لزوم MRI با تزریق به تعیین علت کمک می‌کنند."
      }
    },
    "source": "https://www.ahajournals.org/doi/10.1161/STR.0000000000000407; https://pubs.rsna.org/doi/10.1148/123.2.335"
  },
  {
    "id": "icb-q07",
    "question": {
      "de": "Bei nachgewiesener sehr frischer Hirnblutung ist der Herd auf T2 noch hell. Welche zusätzliche Sequenzgruppe hilft besonders, Blutprodukte über ihre Suszeptibilität zu erfassen?",
      "en": "In a confirmed very recent cerebral haemorrhage, the lesion remains bright on T2. Which additional sequence group particularly helps identify blood products through susceptibility?",
      "fa": "در خونریزی مغزی بسیار تازهٔ تأییدشده، ضایعه در T2 هنوز روشن است. کدام گروه سکانس به‌ویژه با استفاده از سوسپتیبیلیتی به آشکارسازی فرآورده‌های خون کمک می‌کند؟"
    },
    "options": [
      {
        "de": "Konventionelle native T1-Spin-Echo-Sequenzen",
        "en": "Conventional unenhanced T1 spin-echo sequences",
        "fa": "سکانس‌های متعارف T1 اسپین‌اکو بدون تزریق"
      },
      {
        "de": "T2*-GRE beziehungsweise SWI",
        "en": "T2*-GRE or SWI",
        "fa": "T2*-GRE یا SWI"
      },
      {
        "de": "Konventionelle FLAIR-Sequenzen",
        "en": "Conventional FLAIR sequences",
        "fa": "سکانس‌های متعارف FLAIR"
      },
      {
        "de": "Postkontrast-T1 zur Beurteilung der Schrankenstörung",
        "en": "Postcontrast T1 for assessing blood–brain barrier disruption",
        "fa": "T1 پس از تزریق برای ارزیابی اختلال سد خونی‌مغزی"
      }
    ],
    "correct": "B",
    "explanation": {
      "de": "Suszeptibilitätssensitive GRE-/SWI-Aufnahmen ergänzen die Beurteilung von Blutprodukten. Ein T2-heller Herd schließt sehr frisches Blut nicht aus; das Signal hängt unter anderem von Blutprodukten, Feldstärke und Sequenz ab.",
      "en": "Susceptibility-sensitive GRE/SWI complements assessment of blood products. T2 hyperintensity does not exclude very recent blood; signal depends on blood products, field strength and sequence, among other factors.",
      "fa": "GRE/SWI حساس به سوسپتیبیلیتی مکمل بررسی فرآورده‌های خون است. روشن‌بودن در T2 خون بسیار تازه را رد نمی‌کند؛ سیگنال از جمله به فرآورده‌های خون، قدرت میدان و سکانس وابسته است."
    },
    "wrongExplanations": {
      "A": {
        "de": "T1 gehört zur Gesamtauswertung, nutzt aber nicht die hier gesuchte T2*-Suszeptibilitätsempfindlichkeit.",
        "en": "T1 contributes to overall interpretation but does not provide the T2* susceptibility sensitivity being sought.",
        "fa": "T1 در تفسیر کلی نقش دارد، اما حساسیت T2* به سوسپتیبیلیتیِ مورد پرسش را فراهم نمی‌کند."
      },
      "C": {
        "de": "FLAIR hilft bei Parenchym- und Liquorraumbefunden; sie ersetzt keine gezielte suszeptibilitätssensitive Aufnahme.",
        "en": "FLAIR helps assess parenchymal and CSF-space findings but does not replace targeted susceptibility-sensitive imaging.",
        "fa": "FLAIR برای بررسی پارانشیم و فضاهای مایع کمک‌کننده است، اما جایگزین تصویربرداری هدفمند حساس به سوسپتیبیلیتی نیست."
      },
      "D": {
        "de": "Kontrastmittelaufnahme beantwortet eine andere Frage. Sie ist nicht das primäre gesuchte Merkmal zur Darstellung der Blutsuszeptibilität.",
        "en": "Contrast enhancement addresses a different question; it is not the primary feature sought for demonstrating blood susceptibility.",
        "fa": "جذب مادهٔ حاجب پرسش دیگری را پاسخ می‌دهد؛ ویژگی اصلی مورد نظر برای نمایش سوسپتیبیلیتی خون نیست."
      }
    },
    "source": "https://doi.org/10.1001/jama.292.15.1823; https://www.ahajournals.org/doi/10.1161/STR.0000000000000407"
  },
  {
    "id": "icb-q08",
    "question": {
      "de": "Ein bekanntes intraparenchymales Hämatom ist nativ T1-isointens bis hypointens und T2-hypointens. Welcher dominante Blutproduktzustand passt im vereinfachten MRT-Modell am ehesten?",
      "en": "A known intraparenchymal haematoma is iso- to hypointense on unenhanced T1 and hypointense on T2. Which predominant blood-product state best fits the simplified MRI model?",
      "fa": "هماتوم شناخته‌شدهٔ داخل پارانشیم در T1 بدون تزریق هم‌سیگنال تا کم‌سیگنال و در T2 کم‌سیگنال است. در مدل ساده‌شدهٔ MRI، کدام حالت غالب فرآوردهٔ خون مناسب‌تر است؟"
    },
    "options": [
      {
        "de": "Überwiegend Oxyhämoglobin",
        "en": "Predominantly oxyhaemoglobin",
        "fa": "عمدتاً اکسی‌هموگلوبین"
      },
      {
        "de": "Überwiegend intrazelluläres Desoxyhämoglobin",
        "en": "Predominantly intracellular deoxyhaemoglobin",
        "fa": "عمدتاً دئوکسی‌هموگلوبین داخل‌سلولی"
      },
      {
        "de": "Überwiegend extrazelluläres verdünntes Methämoglobin",
        "en": "Predominantly extracellular dilute methaemoglobin",
        "fa": "عمدتاً مت‌هموگلوبین رقیق‌شدهٔ خارج‌سلولی"
      },
      {
        "de": "Überwiegend intrazelluläres Methämoglobin",
        "en": "Predominantly intracellular methaemoglobin",
        "fa": "عمدتاً مت‌هموگلوبین داخل‌سلولی"
      }
    ],
    "correct": "B",
    "explanation": {
      "de": "Desoxyhämoglobin passt im vereinfachten Modell zu relativ niedrigem T2-Signal ohne ausgeprägte native T1-Aufhellung. Das Modell beschreibt typische relative Signale, keine verlässliche Uhr zur minutengenauen Datierung.",
      "en": "In the simplified model, deoxyhaemoglobin fits relatively low T2 signal without marked unenhanced T1 hyperintensity. This describes typical relative signals rather than a reliable clock for exact dating.",
      "fa": "در مدل ساده‌شده، دئوکسی‌هموگلوبین با سیگنال نسبتاً پایین T2 بدون روشن‌شدن واضح در T1 بدون تزریق سازگار است. این مدل سیگنال‌های نسبی تیپیک را توصیف می‌کند و ساعت قابل‌اعتماد برای تعیین زمان دقیق نیست."
    },
    "wrongExplanations": {
      "A": {
        "de": "Oxyhämoglobin kann im sehr frischen Hämatom ein hohes T2-Signal zeigen; es erklärt das beschriebene T2-dunkle Muster weniger gut.",
        "en": "Oxyhaemoglobin can show high T2 signal in very recent haematoma and less well explains the stated T2-dark pattern.",
        "fa": "اکسی‌هموگلوبین در هماتوم بسیار تازه می‌تواند در T2 روشن باشد و الگوی T2 تیرهٔ ذکرشده را کمتر توضیح می‌دهد."
      },
      "C": {
        "de": "Verdünntes extrazelluläres Methämoglobin kann in T1 und T2 hell sein; dies passt nicht zum beschriebenen Muster.",
        "en": "Dilute extracellular methaemoglobin may be bright on both T1 and T2, unlike the stated pattern.",
        "fa": "مت‌هموگلوبین رقیق‌شدهٔ خارج‌سلولی ممکن است در T1 و T2 روشن باشد و با الگوی ذکرشده مطابقت ندارد."
      },
      "D": {
        "de": "Intrazelluläres Methämoglobin geht typischerweise mit nativer T1-Aufhellung einher; diese fehlt hier.",
        "en": "Intracellular methaemoglobin typically produces unenhanced T1 hyperintensity, which is absent here.",
        "fa": "مت‌هموگلوبین داخل‌سلولی معمولاً موجب روشن‌شدن در T1 بدون تزریق می‌شود که اینجا وجود ندارد."
      }
    },
    "source": "https://pubmed.ncbi.nlm.nih.gov/4034983/"
  },
  {
    "id": "icb-q09",
    "question": {
      "de": "Ein bekanntes Hämatom ist nativ auf T1 hell und auf T2 noch dunkel. Welche Blutproduktkonstellation passt am ehesten?",
      "en": "A known haematoma is bright on unenhanced T1 but remains dark on T2. Which blood-product state fits best?",
      "fa": "هماتوم شناخته‌شده در T1 بدون تزریق روشن است ولی در T2 هنوز تیره است. کدام حالت فرآوردهٔ خون مناسب‌تر است؟"
    },
    "options": [
      {
        "de": "Überwiegend Oxyhämoglobin",
        "en": "Predominantly oxyhaemoglobin",
        "fa": "عمدتاً اکسی‌هموگلوبین"
      },
      {
        "de": "Überwiegend intrazelluläres Methämoglobin",
        "en": "Predominantly intracellular methaemoglobin",
        "fa": "عمدتاً مت‌هموگلوبین داخل‌سلولی"
      },
      {
        "de": "Überwiegend Desoxyhämoglobin",
        "en": "Predominantly deoxyhaemoglobin",
        "fa": "عمدتاً دئوکسی‌هموگلوبین"
      },
      {
        "de": "Überwiegend verdünntes extrazelluläres Methämoglobin",
        "en": "Predominantly dilute extracellular methaemoglobin",
        "fa": "عمدتاً مت‌هموگلوبین رقیق‌شدهٔ خارج‌سلولی"
      }
    ],
    "correct": "B",
    "explanation": {
      "de": "Intrazelluläres Methämoglobin verkürzt T1, während das T2-Signal noch niedrig sein kann. Konzentration, Kompartimentierung und Sequenz beeinflussen das Signal; daraus folgt kein fester Tagesgrenzwert.",
      "en": "Intracellular methaemoglobin shortens T1 while T2 signal can remain low. Concentration, compartmentalisation and sequence affect signal; this does not establish a fixed day threshold.",
      "fa": "مت‌هموگلوبین داخل‌سلولی T1 را کوتاه می‌کند، در حالی که سیگنال T2 می‌تواند پایین بماند. غلظت، محل داخل یا خارج سلول و سکانس بر سیگنال اثر می‌گذارند؛ مرز زمانی ثابت بر حسب روز نتیجه نمی‌شود."
    },
    "wrongExplanations": {
      "A": {
        "de": "Oxyhämoglobin erklärt die ausgeprägte native T1-Aufhellung weniger gut.",
        "en": "Oxyhaemoglobin less well explains marked unenhanced T1 hyperintensity.",
        "fa": "اکسی‌هموگلوبین روشن‌شدن واضح در T1 بدون تزریق را کمتر توضیح می‌دهد."
      },
      "C": {
        "de": "Desoxyhämoglobin passt zu niedrigem T2, aber nicht so gut zur beschriebenen ausgeprägten T1-Aufhellung.",
        "en": "Deoxyhaemoglobin fits low T2 but less well explains the marked T1 hyperintensity described.",
        "fa": "دئوکسی‌هموگلوبین با T2 پایین سازگار است، اما روشن‌شدن واضح T1 را کمتر توضیح می‌دهد."
      },
      "D": {
        "de": "Bei verdünntem extrazellulärem Methämoglobin wird eher auch ein hohes T2-Signal erwartet.",
        "en": "Dilute extracellular methaemoglobin more often also produces high T2 signal.",
        "fa": "در مت‌هموگلوبین رقیق‌شدهٔ خارج‌سلولی، سیگنال بالای T2 نیز بیشتر انتظار می‌رود."
      }
    },
    "source": "https://pubmed.ncbi.nlm.nih.gov/3257117/"
  },
  {
    "id": "icb-q10",
    "question": {
      "de": "Ein in Voraufnahmen gesichertes Hämatom zeigt jetzt ein helles Signal sowohl im nativen T1 als auch im T2. Welche Blutproduktkonstellation kann dieses Muster erklären?",
      "en": "A haematoma established on prior imaging is now bright on both unenhanced T1 and T2. Which blood-product state can explain this pattern?",
      "fa": "هماتوم تأییدشده در تصاویر قبلی اکنون در T1 بدون تزریق و T2 هر دو روشن است. کدام حالت فرآوردهٔ خون می‌تواند این الگو را توضیح دهد؟"
    },
    "options": [
      {
        "de": "Überwiegend intrazelluläres Desoxyhämoglobin",
        "en": "Predominantly intracellular deoxyhaemoglobin",
        "fa": "عمدتاً دئوکسی‌هموگلوبین داخل‌سلولی"
      },
      {
        "de": "Verdünntes extrazelluläres Methämoglobin",
        "en": "Dilute extracellular methaemoglobin",
        "fa": "مت‌هموگلوبین رقیق‌شدهٔ خارج‌سلولی"
      },
      {
        "de": "Überwiegend intrazelluläres Methämoglobin",
        "en": "Predominantly intracellular methaemoglobin",
        "fa": "عمدتاً مت‌هموگلوبین داخل‌سلولی"
      },
      {
        "de": "Überwiegend Hämosiderinablagerung",
        "en": "Predominantly haemosiderin deposition",
        "fa": "عمدتاً رسوب هموسیدرین"
      }
    ],
    "correct": "B",
    "explanation": {
      "de": "Verdünntes freies Methämoglobin kann T1 und T2 aufhellen. Das Signal hängt auch von Konzentration und Sequenz ab; T1/T2-hell ist außerhalb eines gesicherten Blutungskontexts nicht spezifisch für Blut.",
      "en": "Dilute free methaemoglobin can produce T1 and T2 hyperintensity. Signal also depends on concentration and sequence; T1/T2 brightness is not specific for blood outside an established haemorrhage context.",
      "fa": "مت‌هموگلوبین آزاد و رقیق‌شده می‌تواند در T1 و T2 روشن باشد. سیگنال به غلظت و سکانس نیز وابسته است؛ روشن‌بودن در T1/T2 خارج از زمینهٔ خونریزی تأییدشده اختصاصی خون نیست."
    },
    "wrongExplanations": {
      "A": {
        "de": "Desoxyhämoglobin passt im vereinfachten Modell eher zu niedrigem T2-Signal.",
        "en": "In the simplified model, deoxyhaemoglobin more closely fits low T2 signal.",
        "fa": "در مدل ساده‌شده، دئوکسی‌هموگلوبین بیشتر با سیگنال پایین T2 سازگار است."
      },
      "C": {
        "de": "Intrazelluläres Methämoglobin kann T1 aufhellen, während T2 typischerweise noch niedrig ist.",
        "en": "Intracellular methaemoglobin may brighten T1 while T2 typically remains low.",
        "fa": "مت‌هموگلوبین داخل‌سلولی ممکن است T1 را روشن کند، در حالی که T2 معمولاً هنوز پایین است."
      },
      "D": {
        "de": "Hämosiderin bewirkt vor allem Signalverlust und Blooming auf suszeptibilitätssensitiven Aufnahmen, nicht dieses T1/T2-helle Muster.",
        "en": "Haemosiderin mainly produces signal loss and blooming on susceptibility-sensitive imaging rather than this T1/T2-bright pattern.",
        "fa": "هموسیدرین عمدتاً در تصاویر حساس به سوسپتیبیلیتی افت سیگنال و blooming ایجاد می‌کند، نه این الگوی روشن T1/T2."
      }
    },
    "source": "https://pubmed.ncbi.nlm.nih.gov/3257117/"
  },
  {
    "id": "icb-q11",
    "question": {
      "de": "Eine frühere kleine Blutung ist im CT nicht mehr sicher erkennbar. Welche MRT-Sequenzgruppe hilft bei der Suche nach verbliebenen Hämosiderinablagerungen besonders?",
      "en": "A previous small haemorrhage is no longer confidently visible on CT. Which MRI sequence group particularly helps identify residual haemosiderin deposits?",
      "fa": "خونریزی کوچک قبلی دیگر در CT با اطمینان دیده نمی‌شود. کدام گروه سکانس MRI به‌ویژه برای یافتن رسوب هموسیدرین باقی‌مانده کمک‌کننده است؟"
    },
    "options": [
      {
        "de": "Native T1-Spin-Echo-Aufnahmen",
        "en": "Unenhanced T1 spin-echo imaging",
        "fa": "تصاویر T1 اسپین‌اکو بدون تزریق"
      },
      {
        "de": "Konventionelle T2-Spin-Echo-Aufnahmen",
        "en": "Conventional T2 spin-echo imaging",
        "fa": "تصاویر متعارف T2 اسپین‌اکو"
      },
      {
        "de": "T2*-GRE beziehungsweise SWI",
        "en": "T2*-GRE or SWI",
        "fa": "T2*-GRE یا SWI"
      },
      {
        "de": "Postkontrast-T1-Aufnahmen",
        "en": "Postcontrast T1 imaging",
        "fa": "تصاویر T1 پس از تزریق"
      }
    ],
    "correct": "C",
    "explanation": {
      "de": "Hämosiderin erzeugt Suszeptibilitätseffekte mit Signalverlust und Blooming, die GRE/SWI gut erfassen können. Ein dunkler Fokus ist dennoch nicht automatisch eine Mikroblutung; Mimics und Verteilung sind mitzuprüfen.",
      "en": "Haemosiderin produces susceptibility-related signal loss and blooming that GRE/SWI can depict well. A dark focus is not automatically a microbleed; assess mimics and distribution.",
      "fa": "هموسیدرین افت سیگنال و blooming ناشی از سوسپتیبیلیتی ایجاد می‌کند که GRE/SWI می‌تواند به‌خوبی آشکار کند. کانون تیره خودبه‌خود میکروخونریزی نیست؛ تقلیدکننده‌ها و توزیع نیز بررسی شوند."
    },
    "wrongExplanations": {
      "A": {
        "de": "T1 kann Resthöhle und Begleitbefunde zeigen, ist aber nicht gezielt für den hier gesuchten Suszeptibilitätseffekt ausgelegt.",
        "en": "T1 may depict a residual cavity and associated findings but is not targeted to the susceptibility effect sought here.",
        "fa": "T1 ممکن است حفرهٔ باقی‌مانده و یافته‌های همراه را نشان دهد، اما برای اثر سوسپتیبیلیتی مورد پرسش هدف‌گذاری نشده است."
      },
      "B": {
        "de": "Konventionelle T2 kann die Beurteilung ergänzen; GRE/SWI nutzt den gesuchten T2*-Effekt gezielter.",
        "en": "Conventional T2 can complement assessment; GRE/SWI more directly exploits the T2* effect being sought.",
        "fa": "T2 متعارف مکمل بررسی است؛ GRE/SWI اثر T2* مورد نظر را هدفمندتر به کار می‌گیرد."
      },
      "D": {
        "de": "Postkontrast-T1 beurteilt insbesondere Kontrastmittelaufnahme; diese ist nicht das gesuchte Merkmal von Hämosiderin.",
        "en": "Postcontrast T1 primarily assesses enhancement, which is not the haemosiderin feature sought here.",
        "fa": "T1 پس از تزریق عمدتاً جذب مادهٔ حاجب را ارزیابی می‌کند که ویژگی مورد نظر هموسیدرین نیست."
      }
    },
    "source": "https://doi.org/10.1001/jama.292.15.1823; https://pmc.ncbi.nlm.nih.gov/articles/PMC3714437/"
  },
  {
    "id": "icb-q12",
    "question": {
      "de": "Bei einer lobären Blutung fallen disproportionales Ödem und verdächtiges angrenzendes Gewebe auf. Die initiale CTA zeigt keine makrovaskuläre Ursache. Welche weitere Untersuchung hilft am direktesten, eine zugrunde liegende Gewebeläsion abzuklären?",
      "en": "Lobar haemorrhage is accompanied by disproportionate oedema and suspicious adjacent tissue. Initial CTA shows no macrovascular cause. Which further study most directly evaluates an underlying tissue lesion?",
      "fa": "خونریزی لوبار با ادم نامتناسب و بافت مشکوک مجاور همراه است. CTA اولیه علت ماکروواسکولار نشان نمی‌دهد. کدام بررسی بعدی مستقیم‌تر به ارزیابی ضایعهٔ بافتی زمینه‌ای کمک می‌کند؟"
    },
    "options": [
      {
        "de": "Katheterangiographie zur Suche nach einem kleinen arteriovenösen Shunt",
        "en": "Catheter angiography to search for a small arteriovenous shunt",
        "fa": "آنژیوگرافی کاتتری برای جست‌وجوی شانت کوچک شریانی‌وریدی"
      },
      {
        "de": "MRT mit nativer und kontrastverstärkter Gewebecharakterisierung",
        "en": "MRI with unenhanced and contrast-enhanced tissue characterisation",
        "fa": "MRI برای بررسی ویژگی‌های بافت پیش و پس از تزریق مادهٔ حاجب"
      },
      {
        "de": "CT-Venographie zur Suche nach einer venösen Abflussstörung",
        "en": "CT venography to search for venous outflow obstruction",
        "fa": "CT ونوگرافی برای جست‌وجوی اختلال تخلیهٔ وریدی"
      },
      {
        "de": "Erneutes Nativ-CT zur Kontrolle von Größe und Dichte des Hämatoms",
        "en": "Repeat unenhanced CT to assess haematoma size and attenuation",
        "fa": "تکرار CT بدون تزریق برای کنترل اندازه و دانسیتهٔ هماتوم"
      }
    ],
    "correct": "B",
    "explanation": {
      "de": "Nach negativer CTA kann MRT eine nichtmakrovaskuläre Ursache wie Tumor oder Kavernom weiter klären. Native und postkontrast-T1 müssen zusammen beurteilt werden, da Blut selbst T1-hell sein kann. Verdecktes Restgewebe kann nach Blutresorption eine erneute Kontrolle erfordern; Ödem allein beweist keinen Tumor.",
      "en": "After negative CTA, MRI can further evaluate a nonmacrovascular cause such as tumour or cavernoma. Unenhanced and postcontrast T1 must be assessed together because blood itself may be T1-bright. Concealed tissue may require repeat assessment after blood resorption; oedema alone does not establish tumour.",
      "fa": "پس از CTA منفی، MRI می‌تواند علت غیرماکروواسکولار مانند تومور یا کاورنوم را بیشتر بررسی کند. T1 پیش و پس از تزریق باید با هم ارزیابی شوند، زیرا خود خون ممکن است در T1 روشن باشد. بافت پنهان‌شده ممکن است پس از بازجذب خون به کنترل مجدد نیاز داشته باشد؛ ادم به‌تنهایی تومور را اثبات نمی‌کند."
    },
    "wrongExplanations": {
      "A": {
        "de": "DSA kann bei verbleibendem Verdacht einen kleinen Gefäßshunt klären, charakterisiert das hier verdächtige Gewebe aber weniger direkt als MRT.",
        "en": "DSA can investigate a small vascular shunt when suspicion persists but characterises the suspicious tissue less directly than MRI.",
        "fa": "DSA در شک باقی‌مانده می‌تواند شانت عروقی کوچک را بررسی کند، اما بافت مشکوک اینجا را به‌اندازهٔ MRI مستقیم توصیف نمی‌کند."
      },
      "C": {
        "de": "Venographie ist bei Verdacht auf venöse Ursache wichtig. Die konkrete Frage nach einer zugrunde liegenden Gewebeläsion wird durch MRT direkter beantwortet.",
        "en": "Venography is important when a venous cause is suspected. MRI more directly addresses the specific question of an underlying tissue lesion.",
        "fa": "ونوگرافی در شک به علت وریدی مهم است. MRI پرسش مشخص دربارهٔ ضایعهٔ بافتی زمینه‌ای را مستقیم‌تر پاسخ می‌دهد."
      },
      "D": {
        "de": "Ein Verlaufs-CT beurteilt Expansion und Resorption. Zur Charakterisierung verdächtigen Restgewebes liefert MRT hier gezieltere Information.",
        "en": "Follow-up CT evaluates expansion and resorption. MRI provides more targeted information for characterising suspicious residual tissue here.",
        "fa": "CT پیگیری گسترش و بازجذب را ارزیابی می‌کند. MRI برای بررسی ویژگی‌های بافت مشکوک باقی‌مانده در اینجا اطلاعات هدفمندتری می‌دهد."
      }
    },
    "source": "https://www.ahajournals.org/doi/10.1161/STR.0000000000000407"
  },
  {
    "id": "icb-q13",
    "question": {
      "de": "Bei älterer Person mit spontaner Hirnblutung wird CAA erwogen. Welche zusätzliche Blutungsverteilung stützt diese Möglichkeit stärker als eine tiefe hypertensive Arteriolopathie?",
      "en": "CAA is considered in an older person with spontaneous cerebral haemorrhage. Which additional haemorrhagic distribution supports it more than deep hypertensive arteriolopathy?",
      "fa": "در فرد سالمند دارای خونریزی خودبه‌خودی مغزی، CAA مطرح است. کدام توزیع خونریزی همراه بیشتر از آن در مقایسه با آرتریولوپاتی عمقی ناشی از پرفشاری خون حمایت می‌کند؟"
    },
    "options": [
      {
        "de": "Mikroblutungen überwiegend in Basalganglien und Thalami",
        "en": "Microbleeds predominantly in basal ganglia and thalami",
        "fa": "میکروخونریزی‌ها عمدتاً در عقده‌های قاعده‌ای و تالاموس‌ها"
      },
      {
        "de": "Streng lobäre Mikroblutungen mit kortikaler superfizieller Siderose",
        "en": "Strictly lobar microbleeds with cortical superficial siderosis",
        "fa": "میکروخونریزی‌های کاملاً لوبار همراه سیدروز سطحی قشری"
      },
      {
        "de": "Mikroblutungen überwiegend im Pons und tiefen Kleinhirn",
        "en": "Microbleeds predominantly in the pons and deep cerebellum",
        "fa": "میکروخونریزی‌ها عمدتاً در پونس و بخش عمقی مخچه"
      },
      {
        "de": "Gemischte lobäre und tiefe Mikroblutungen mit thalamischer Blutung",
        "en": "Mixed lobar and deep microbleeds with thalamic haemorrhage",
        "fa": "میکروخونریزی‌های مختلط لوبار و عمقی همراه خونریزی تالاموس"
      }
    ],
    "correct": "B",
    "explanation": {
      "de": "Eine streng lobäre Verteilung und kortikale superfizielle Siderose passen zu CAA. Die diagnostische Kategorie erfordert den vollständigen klinischen und bildgebenden Kriterienrahmen sowie den Ausschluss anderer Ursachen; das Muster allein ist kein histologischer Beweis.",
      "en": "Strictly lobar distribution and cortical superficial siderosis fit CAA. The diagnostic category requires the complete clinical/imaging criteria framework and exclusion of alternative causes; the pattern alone is not histological proof.",
      "fa": "توزیع کاملاً لوبار و سیدروز سطحی قشری با CAA سازگارند. تعیین ردهٔ تشخیصی به چارچوب کامل معیارهای بالینی و تصویری و رد علل دیگر نیاز دارد؛ خود الگو اثبات بافت‌شناختی نیست."
    },
    "wrongExplanations": {
      "A": {
        "de": "Tiefe Mikroblutungen lenken stärker auf die Erkrankung tiefer Perforatoren und passen weniger zu einem streng lobären CAA-Muster.",
        "en": "Deep microbleeds more strongly suggest deep perforator disease and fit a strictly lobar CAA pattern less well.",
        "fa": "میکروخونریزی‌های عمقی بیشتر بیماری پرفوراتورهای عمقی را مطرح می‌کنند و کمتر با الگوی کاملاً لوبار CAA سازگارند."
      },
      "C": {
        "de": "Diese tiefe infratentorielle Betonung stützt eher eine Arteriolopathie tiefer Gefäße als das gesuchte lobäre Muster.",
        "en": "This deep infratentorial predominance favours deep-vessel arteriolopathy rather than the lobar pattern sought.",
        "fa": "غلبهٔ عمقی زیرچادری بیشتر به نفع آرتریولوپاتی عروق عمقی است تا الگوی لوبار مورد نظر."
      },
      "D": {
        "de": "Ein gemischtes Muster kann mehrere Pathologien widerspiegeln. Es ist nicht das hier gesuchte streng lobäre Muster; tiefe Blutungen begrenzen die Boston-MRT-Kategorie.",
        "en": "A mixed pattern can reflect multiple pathologies. It is not the strictly lobar pattern sought; deep haemorrhages limit the Boston MRI category.",
        "fa": "الگوی مختلط ممکن است بازتاب چند آسیب‌شناسی باشد. الگوی کاملاً لوبار مورد نظر نیست؛ خونریزی‌های عمقی طبقه‌بندی MRI بر اساس بوستون را محدود می‌کنند."
      }
    },
    "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC9389452/"
  },
  {
    "id": "icb-q14",
    "question": {
      "de": "Ein bekanntes Hämatom ist im Verlauf kleiner geworden und zeigt jetzt eine glatte randständige Kontrastmittelaufnahme. Was ist die angemessenste Einordnung?",
      "en": "A known haematoma has become smaller on follow-up and now shows smooth peripheral enhancement. What is the most appropriate interpretation?",
      "fa": "هماتوم شناخته‌شده در پیگیری کوچک‌تر شده و اکنون جذب صاف مادهٔ حاجب در حاشیه دارد. مناسب‌ترین تفسیر چیست؟"
    },
    "options": [
      {
        "de": "Das Muster spricht vorrangig für eine neu entstandene Metastase",
        "en": "The pattern primarily indicates a newly developed metastasis",
        "fa": "الگو در درجهٔ اول متاستاز تازه ایجادشده را مطرح می‌کند"
      },
      {
        "de": "Die randständige Aufnahme ist vorrangig als Abszesskapsel zu werten",
        "en": "Peripheral enhancement should primarily be interpreted as an abscess capsule",
        "fa": "جذب حاشیه‌ای در درجهٔ اول کپسول آبسه محسوب می‌شود"
      },
      {
        "de": "Organisatorische Randanreicherung ist möglich; die zugrunde liegende Ursache bleibt im Kontext zu prüfen",
        "en": "Organisational rim enhancement is possible; assess the underlying cause in context",
        "fa": "جذب حاشیه‌ای در جریان سازمان‌یافتگی ممکن است؛ علت زمینه‌ای همچنان با توجه به شرایط بررسی می‌شود"
      },
      {
        "de": "Der neue Kontrastmittelsaum weist vorrangig auf erneute akute Einblutung hin",
        "en": "The new enhancing rim primarily indicates recurrent acute bleeding",
        "fa": "حاشیهٔ جدیدِ جاذب مادهٔ حاجب در درجهٔ اول خونریزی حاد مجدد را نشان می‌دهد"
      }
    ],
    "correct": "C",
    "explanation": {
      "de": "Ein organisierendes Hämatom kann randständig Kontrastmittel aufnehmen. Die Rückbildung stützt diese Möglichkeit, ersetzt aber nicht die Ursachensuche. Noduläres Restgewebe, atypischer Verlauf oder klinische Warnzeichen erfordern gezielte weitere Abklärung.",
      "en": "An organising haematoma can enhance peripherally. Regression supports this possibility but does not replace aetiologic evaluation. Residual nodular tissue, atypical evolution or clinical warning signs warrant targeted investigation.",
      "fa": "هماتوم در حال سازمان‌یافتگی می‌تواند در حاشیه مادهٔ حاجب جذب کند. پسرفت از این احتمال حمایت می‌کند، اما جای بررسی علت را نمی‌گیرد. بافت ندولار باقی‌مانده، سیر غیرمعمول یا علائم هشدار بالینی به بررسی هدفمند بیشتر نیاز دارند."
    },
    "wrongExplanations": {
      "A": {
        "de": "Eine Metastase kann bluten, wird aber durch glatte Randanreicherung eines schrumpfenden Hämatoms nicht bewiesen. Verdächtiges Restgewebe ist gesondert zu suchen.",
        "en": "A metastasis can bleed but is not established by smooth enhancement of a shrinking haematoma. Search separately for suspicious residual tissue.",
        "fa": "متاستاز ممکن است خونریزی کند، اما جذب صاف حاشیهٔ هماتومِ در حال کوچک‌شدن آن را اثبات نمی‌کند. بافت مشکوک باقی‌مانده جداگانه جست‌وجو شود."
      },
      "B": {
        "de": "Ein Abszess erfordert zusätzliche passende Hinweise wie Klinik und Diffusionsbefund. Ringförmige Aufnahme allein trennt diese Ursachen nicht.",
        "en": "Abscess requires additional compatible findings such as clinical context and diffusion imaging. Ring enhancement alone does not separate these causes.",
        "fa": "آبسه به شواهد سازگار بیشتری مانند زمینهٔ بالینی و یافتهٔ انتشار نیاز دارد. جذب حلقوی مادهٔ حاجب به‌تنهایی این علت‌ها را جدا نمی‌کند."
      },
      "D": {
        "de": "Erneute Blutung wird anhand neuer Blutanteile, Größenveränderung und Gesamtkontext beurteilt; Kontrastmittelaufnahme allein ist kein Nachweis.",
        "en": "Rebleeding is assessed using new blood components, size change and overall context; enhancement alone does not establish it.",
        "fa": "خونریزی مجدد با اجزای جدید خون، تغییر اندازه و زمینهٔ کلی ارزیابی می‌شود؛ جذب مادهٔ حاجب به‌تنهایی آن را اثبات نمی‌کند."
      }
    },
    "source": "https://www.ahajournals.org/doi/10.1161/STR.0000000000000407"
  },
  {
    "id": "icb-q15",
    "question": {
      "de": "Eine 29-jährige Person ohne Hypertonie hat im soeben durchgeführten Nativ-CT eine spontane lobäre Blutung. CTA ist unmittelbar verfügbar. Welche Strategie priorisiert die rasche nichtinvasive Abklärung einer makrovaskulären Ursache im Anschluss an das CT?",
      "en": "A 29-year-old without hypertension has spontaneous lobar haemorrhage on the just-completed unenhanced CT. CTA is immediately available. Which strategy prioritises rapid noninvasive evaluation of a macrovascular cause directly after CT?",
      "fa": "در فرد ۲۹ سالهٔ بدون پرفشاری خون، CT بدون تزریق که اکنون انجام شده خونریزی خودبه‌خودی لوبار نشان می‌دهد. CTA بی‌درنگ در دسترس است. کدام راهبرد بررسی سریع و غیرتهاجمی علت ماکروواسکولار را بلافاصله پس از CT در اولویت می‌گذارد؟"
    },
    "options": [
      {
        "de": "Direkte Katheterangiographie als erster Schritt der Gefäßabklärung",
        "en": "Direct catheter angiography as the first vascular investigation",
        "fa": "آنژیوگرافی مستقیم کاتتری به‌عنوان نخستین بررسی عروقی"
      },
      {
        "de": "Intrakranielle CTA, je nach Verdacht ergänzt durch venöse Darstellung",
        "en": "Intracranial CTA, supplemented by venous imaging when indicated",
        "fa": "CTA داخل‌جمجمه‌ای، همراه بررسی وریدی متناسب با شک بالینی"
      },
      {
        "de": "Wechsel zur MRT mit MRA vor der verfügbaren CT-Angiographie",
        "en": "Transfer to MRI with MRA before the available CT angiogram",
        "fa": "انتقال به MRI همراه MRA پیش از CT آنژیوگرافیِ در دسترس"
      },
      {
        "de": "Gefäßdarstellung erst nach Rückbildung des Hämatoms planen",
        "en": "Plan vascular imaging after haematoma regression",
        "fa": "برنامه‌ریزی بررسی عروقی پس از پسرفت هماتوم"
      }
    ],
    "correct": "B",
    "explanation": {
      "de": "Bei junger Person mit lobärer spontaner Blutung ist eine gezielte frühe Gefäßabklärung angezeigt. CTA mit erwogener Venographie adressiert makrovaskuläre bzw. venöse Ursachen; weitere MRT/MRA oder DSA richten sich nach Befund und verbleibendem Verdacht. Eine negative CTA schließt nicht jede Ursache aus.",
      "en": "In a young person with spontaneous lobar haemorrhage, targeted early vascular investigation is indicated. CTA with consideration of venography addresses macrovascular or venous causes; further MRI/MRA or DSA depends on findings and residual suspicion. Negative CTA does not exclude every cause.",
      "fa": "در فرد جوان دارای خونریزی خودبه‌خودی لوبار، بررسی هدفمند و زودهنگام عروق لازم است. CTA با درنظرگرفتن ونوگرافی علل ماکروواسکولار یا وریدی را بررسی می‌کند؛ MRI/MRA یا DSA بیشتر به یافته‌ها و شک باقی‌مانده بستگی دارد. CTA منفی همهٔ علت‌ها را رد نمی‌کند."
    },
    "wrongExplanations": {
      "A": {
        "de": "DSA kann bei verdächtigem Befund oder verbleibender hoher Wahrscheinlichkeit nötig sein. Sie ist invasiv und nicht die hier gesuchte rasche nichtinvasive initiale Strategie.",
        "en": "DSA may be needed for suspicious findings or persistent high probability. It is invasive rather than the rapid noninvasive initial strategy sought here.",
        "fa": "DSA در یافتهٔ مشکوک یا احتمال بالای باقی‌مانده ممکن است لازم باشد. این روش تهاجمی است و راهبرد اولیهٔ سریع و غیرتهاجمی مورد نظر نیست."
      },
      "C": {
        "de": "MRT/MRA kann ergänzen oder kontextabhängig eine Alternative sein. Bei unmittelbar verfügbarer CTA direkt nach dem CT priorisiert dieser Wechsel nicht den beschriebenen schnellen CT-Workflow.",
        "en": "MRI/MRA can complement evaluation or be an alternative in context. With CTA immediately available after CT, this transfer does not prioritise the rapid CT workflow specified.",
        "fa": "MRI/MRA می‌تواند مکمل یا متناسب با زمینه جایگزین باشد. وقتی CTA بلافاصله پس از CT در دسترس است، این انتقال روند سریع CT مطرح‌شده را در اولویت نمی‌گذارد."
      },
      "D": {
        "de": "Spätere Bildgebung kann eine verdeckte Ursache klären, ersetzt aber nicht die frühe Gefäßabklärung dieser jungen Person mit lobärer Blutung.",
        "en": "Later imaging may reveal a concealed cause but does not replace early vascular investigation in this young person with lobar haemorrhage.",
        "fa": "تصویربرداری دیرتر ممکن است علت پنهان را آشکار کند، اما جای بررسی زودهنگام عروق در این فرد جوان با خونریزی لوبار را نمی‌گیرد."
      }
    },
    "source": "https://www.ahajournals.org/doi/10.1161/STR.0000000000000407; https://www.bmj.com/content/351/bmj.h5762"
  }
]

export const ICB_QUESTIONS = Object.fromEntries(['de', 'en', 'fa'].map(lang => [
  lang,
  ICB_QUESTION_SEEDS.map(item => ({
    id: item.id,
    tags: ['intrazerebrale-blutung', 'gehirn-blutung'],
    fach: 'gehirn',
    question: item.question[lang] || item.question.de,
    options: item.options.map((opt, i) => ({
      id: ['A', 'B', 'C', 'D'][i],
      text: opt[lang] || opt.de,
    })),
    correct: item.correct,
    explanation: item.explanation[lang] || item.explanation.de,
    ...(item.wrongExplanations ? { wrongExplanations: Object.fromEntries(Object.entries(item.wrongExplanations).map(([id, value]) => [id, value[lang]])) } : {}),
    ...(item.source ? { source: item.source } : {}),
  })),
]))

// ── FLASHCARDS ────────────────────────────────────────────────────────────────

export const ICB_FLASHCARD_TOPIC = {
  id: 'intrazerebrale-blutung',
  area: L('Gehirn', 'Brain', 'مغز'),
  chapter: L('Vaskuläre Erkrankungen', 'Vascular diseases', 'بیماری‌های عروقی'),
  icon: '🩸',
  iconImage: '/fach/gehirn.png',
  color: '#dc2626',
  href: '/flashcards/intrazerebrale-blutung',
  title: L('Intrazerebrale Blutung', 'Intracerebral Haemorrhage', 'خونریزی داخل مغزی'),
  subtitle: L(
    'CT-Stadien · MRT-Signal · Swirl/Spot-Sign · CAA vs. Hypertonus',
    'CT stages · MRI signal · Swirl/Spot Sign · CAA vs hypertension',
    'مراحل CT · سیگنال MRI · علائم Swirl/Spot · CAA در برابر فشار خون'
  ),
}

const ICB_FLASHCARD_SEEDS = [
  {
    "front": {
      "de": "Hyperakute ICB · Was leisten T2, CT und blutsensitive MRT-Sequenzen?",
      "en": "Hyperacute ICH · What can T2, CT and blood-sensitive MRI sequences show?",
      "fa": "خونریزی داخل مغزی فوق‌حاد · نقش T2، CT و سکانس‌های حساس به خون در MRI چیست؟"
    },
    "back": {
      "de": "T2 kann überwiegend hell sein und schließt Blut nicht aus.\nCT: schnelle Akutdiagnostik.\nGRE/T2* oder SWI: auch hyperakute Blutung erkennbar.",
      "en": "T2 may be predominantly bright and does not exclude blood.\nCT: rapid acute assessment.\nGRE/T2* or SWI: can also detect hyperacute haemorrhage.",
      "fa": "T2 ممکن است عمدتاً روشن باشد و خونریزی را رد نمی‌کند.\nCT: ارزیابی سریع در مرحلهٔ حاد.\nGRE/T2* یا SWI: امکان تشخیص خونریزی فوق‌حاد نیز وجود دارد."
    },
    "explanation": {
      "de": "Signal und Suszeptibilität hängen von Sequenz, Blutprodukten und deren räumlicher Verteilung ab. Das vereinfachte Oxy-Hb-Modell rechtfertigt weder einen Blutungsausschluss auf T2 noch die pauschale Aussage, MRT sei hyperakut weniger sensitiv als CT. Beide Verfahren können eine akute ICB erkennen; Verfügbarkeit und klinische Situation bestimmen die Erstuntersuchung.",
      "en": "Signal and susceptibility depend on the sequence, blood products and their spatial distribution. The simplified oxyHb model justifies neither excluding haemorrhage on T2 nor claiming that MRI is invariably less sensitive than CT in the hyperacute stage. Both can detect acute ICH; availability and the clinical situation determine the initial study.",
      "fa": "سیگنال و حساسیت مغناطیسی به سکانس، محصولات خونی و توزیع فضایی آن‌ها بستگی دارند. مدل ساده‌شدهٔ اکسی‌هموگلوبین نه رد خونریزی بر اساس T2 را توجیه می‌کند و نه این ادعای کلی را که MRI در مرحلهٔ فوق‌حاد همیشه از CT کم‌حساس‌تر است. هر دو روش می‌توانند خونریزی حاد را تشخیص دهند؛ دسترسی و وضعیت بالینی تعیین‌کنندهٔ بررسی اولیه‌اند."
    },
    "diagram": {
      "de": "T2 hell ≠ Blutung ausgeschlossen → CT / GRE / SWI im Kontext beurteilen",
      "en": "Bright T2 ≠ haemorrhage excluded → assess CT / GRE / SWI in context",
      "fa": "T2 روشن ≠ رد خونریزی ← CT / GRE / SWI را در زمینهٔ بالینی ارزیابی کنید"
    },
    "tag": "icb-mrt",
    "source": "https://doi.org/10.1001/jama.292.15.1823; https://www.ahajournals.org/doi/10.1161/STR.0000000000000407"
  },
  {
    "front": {
      "de": "Deoxy-Hb (akut) · T1 und T2?",
      "en": "DeoxyHb (acute) · T1 and T2?",
      "fa": "Deoxy-Hb (حاد) · T1 و T2؟"
    },
    "back": {
      "de": "T1 meist iso-/hypointens; T2 hypointens; blutsensitive Sequenzen zeigen Suszeptibilität.",
      "en": "T1 usually iso/hypointense; T2 hypointense; blood-sensitive sequences show susceptibility.",
      "fa": "T1 معمولاً ایزو یا کم‌سیگنال؛ T2 کم‌سیگنال؛ سکانس‌های حساس به خون، اثر حساسیت مغناطیسی را نشان می‌دهند."
    },
    "explanation": {
      "de": "Intrazelluläres Deoxy-Hb passt zum akuten Muster mit T1 iso-/hypointens und T2 hypointens. Met-Hb führt typischerweise zu T1-Hochsignal. Signal hängt von Blutprodukt, Konzentration, Kompartimentierung und Sequenz ab; daraus lässt sich kein exakter Blutungszeitpunkt ableiten.",
      "en": "Intracellular deoxyHb fits the acute pattern of T1 iso/hypointensity and T2 hypointensity. MetHb typically produces T1 hyperintensity. Signal depends on blood product, concentration, compartmentalisation, and sequence; it does not establish an exact haemorrhage time.",
      "fa": "دئوکسی‌هموگلوبین داخل‌سلولی با الگوی حادِ سیگنال ایزو یا پایین در T1 و پایین در T2 سازگار است. مت‌هموگلوبین معمولاً سیگنال بالای T1 ایجاد می‌کند. سیگنال به محصول خونی، غلظت، بخش‌بندی سلولی و سکانس وابسته است؛ زمان دقیق خونریزی از آن تعیین نمی‌شود."
    },
    "diagram": {
      "de": "Deoxy-Hb intrazellulär → typischerweise T1 iso/niedrig, T2 niedrig",
      "en": "Intracellular deoxyHb → typically T1 iso/low, T2 low",
      "fa": "دئوکسی‌هموگلوبین داخل‌سلولی ← معمولاً T1 ایزو یا پایین، T2 پایین"
    },
    "tag": "icb-mrt",
    "source": "https://pubmed.ncbi.nlm.nih.gov/3257117/; https://pubmed.ncbi.nlm.nih.gov/4034983/"
  },
  {
    "front": {
      "de": "Met-Hb intrazellulär (früh subakut) · T1 und T2?",
      "en": "MetHb intracellular (early subacute) · T1 and T2?",
      "fa": "Met-Hb داخل سلولی (زیرحاد اولیه) · T1 و T2؟"
    },
    "back": {
      "de": "Früh subakut: typischerweise T1 hell und T2 dunkel bei intrazellulärem Met-Hb.",
      "en": "Early subacute: typically bright T1 and dark T2 with intracellular metHb.",
      "fa": "زیرحاد اولیه: معمولاً T1 روشن و T2 تیره با مت‌هموگلوبین داخل‌سلولی."
    },
    "explanation": {
      "de": "Die Kombination hilft bei der relativen Stadieneinordnung. Der Kontrast hängt unter anderem von Hämoglobinzustand, Konzentration und Kompartimentierung ab.",
      "en": "This combination supports relative staging. Contrast depends in part on haemoglobin state, concentration, and compartmentalisation.",
      "fa": "این ترکیب به مرحله‌بندی نسبی کمک می‌کند. کنتراست از جمله به وضعیت هموگلوبین، غلظت و بخش‌بندی سلولی وابسته است."
    },
    "diagram": {
      "de": "Met-Hb intrazellulär → typischerweise T1 hoch, T2 niedrig",
      "en": "Intracellular metHb → typically high T1, low T2",
      "fa": "مت‌هموگلوبین داخل‌سلولی ← معمولاً T1 بالا، T2 پایین"
    },
    "tag": "icb-mrt",
    "source": "https://pubmed.ncbi.nlm.nih.gov/3257117/; https://pubmed.ncbi.nlm.nih.gov/4034983/"
  },
  {
    "front": {
      "de": "Wann kann Methämoglobin im Hämatom auf T1 und T2 hell sein, und welche Grenze hat dieses Muster?",
      "en": "When can methaemoglobin in a haematoma be bright on both T1 and T2, and what limits this pattern?",
      "fa": "چه زمانی مت‌هموگلوبین هماتوم می‌تواند در T1 و T2 روشن باشد و محدودیت این الگو چیست؟"
    },
    "back": {
      "de": "Verdünntes extrazelluläres Methämoglobin kann T1 und T2 aufhellen. Das Muster ist nicht blutspezifisch: unter anderem Fett und melaninreiche Läsionen können überlappen. Kontext, Fettsättigung, blutsensitive Sequenzen und Verlauf ergänzen die Beurteilung.",
      "en": "Dilute extracellular methaemoglobin can brighten T1 and T2. The pattern is not blood-specific: fat and melanin-rich lesions can overlap, among other mimics. Context, fat suppression, blood-sensitive sequences and follow-up complement interpretation.",
      "fa": "مت‌هموگلوبین رقیق‌شدهٔ خارج‌سلولی می‌تواند T1 و T2 را روشن کند. الگو اختصاصی خون نیست؛ از جمله چربی و ضایعات غنی از ملانین ممکن است هم‌پوشانی داشته باشند. زمینه، سرکوب چربی، سکانس‌های حساس به خون و پیگیری مکمل تفسیرند."
    },
    "explanation": {
      "de": "Das beobachtete Signal hängt nicht nur von intra- oder extrazellulärer Lage ab, sondern auch von Konzentration und Aufnahmeparametern. Ein vereinfachtes Blutproduktmodell ersetzt nicht die Auswertung mehrerer Sequenzen.",
      "en": "Observed signal depends not only on intracellular or extracellular location but also on concentration and acquisition parameters. A simplified blood-product model does not replace multisequence interpretation.",
      "fa": "سیگنال مشاهده‌شده علاوه بر محل داخل یا خارج سلول، به غلظت و پارامترهای تصویربرداری وابسته است. مدل ساده‌شدهٔ فرآورده‌های خون جای تفسیر چندسکانسی را نمی‌گیرد."
    },
    "diagram": {
      "de": "Bekannter Blutungskontext + T1/T2 hell → extrazelluläres verdünntes Met-Hb möglich; Mimics und Verlauf prüfen",
      "en": "Established haemorrhage context + bright T1/T2 → dilute extracellular metHb possible; assess mimics and evolution",
      "fa": "زمینهٔ خونریزی تأییدشده + T1/T2 روشن ← مت‌هموگلوبین رقیق خارج‌سلولی ممکن است؛ تقلیدکننده‌ها و سیر بررسی شوند"
    },
    "tag": "icb-mrt",
    "source": "https://pubmed.ncbi.nlm.nih.gov/3257117/"
  },
  {
    "front": {
      "de": "Hämosiderin (chronisch) · Welche Sequenz ist entscheidend?",
      "en": "Haemosiderin (chronic) · Which sequence is essential?",
      "fa": "هموسیدرین (مزمن) · کدام سکانس ضروری است؟"
    },
    "back": {
      "de": "SWI / T2*: ausgeprägter Suszeptibilitätseffekt\nT1/T2: je nach Stadium variabel\nCT und MRT: komplementär",
      "en": "SWI / T2*: marked susceptibility effect\nT1/T2: vary by stage\nCT and MRI: complementary",
      "fa": "SWI / T2*: اثر برجستهٔ susceptibility\nT1/T2: بسته به مرحله متغیر\nCT و MRI: مکمل"
    },
    "explanation": {
      "de": "Hämosiderin verursacht Blooming auf SWI/T2*. Kleine alte Blutprodukte werden mit susceptibility-sensitiven MRT-Sequenzen besonders gut erfasst. CT und MRT bleiben komplementär; keine einzelne Sequenz ersetzt die klinische Einordnung.",
      "en": "Haemosiderin causes blooming on SWI/T2*. Small old blood products are particularly well depicted with susceptibility-sensitive MRI sequences. CT and MRI remain complementary; no single sequence replaces clinical context.",
      "fa": "هموسیدرین روی SWI/T2* باعث blooming می‌شود. محصولات خونی کوچک و قدیمی با سکانس‌های حساس به susceptibility در MRI بهتر دیده می‌شوند. CT و MRI مکمل‌اند و هیچ سکانسی جای زمینهٔ بالینی را نمی‌گیرد."
    },
    "diagram": {
      "de": "Blutabbau → Hämosiderin → Suszeptibilitätseffekt auf SWI/T2*\nCT und MRT: komplementäre Information",
      "en": "Blood breakdown → haemosiderin → susceptibility effect on SWI/T2*\nCT and MRI: complementary information",
      "fa": "تجزیهٔ خون ← هموسیدرین ← اثر سوسپتیبیلیتی در SWI/T2*\nCT و MRI: اطلاعات مکمل"
    },
    "tag": "icb-mrt",
    "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC3714437/"
  },
  {
    "front": {
      "de": "Swirl Sign · Was, Wo, Bedeutung?",
      "en": "Swirl Sign · What, where, significance?",
      "fa": "علامت چرخش (Swirl sign) · چیست، کجا، اهمیت؟"
    },
    "back": {
      "de": "Was: Hypodense Areale im hyperdensen Hämatom\nWo: Natives CCT\nBedeutung: möglicher unverklotteter Anteil; mit Expansion assoziiert, kein Beweis aktiver Blutung",
      "en": "What: Hypoattenuating areas in a hyperattenuating haematoma\nWhere: NCCT\nSignificance: possible unclotted component; associated with expansion, not proof of active bleeding",
      "fa": "چیست: نواحی کم‌دانسیته در هماتوم پرچگال\nکجا: CT بدون کنتراست\nاهمیت: احتمال وجود جزء لخته‌نشده؛ مرتبط با گسترش، نه اثبات خونریزی فعال"
    },
    "explanation": {
      "de": "Hypodense Areale innerhalb des Hämatoms können einen nicht koagulierten Anteil darstellen. Der Heterogenitätsbefund kann mit Expansion assoziiert sein, belegt aber keine laufende Blutung und erlaubt keine sichere Individualprognose.",
      "en": "Hypoattenuating areas within the haematoma may represent an unclotted component. This heterogeneity sign may be associated with expansion, but it does not establish ongoing bleeding or provide a certain individual prognosis.",
      "fa": "نواحی کم‌دانسیته درون هماتوم ممکن است بخشی لخته‌نشده باشند. این ناهمگنی می‌تواند با گسترش ارتباط داشته باشد، اما خونریزی جاری را ثابت نمی‌کند و پیش‌آگهی قطعی فردی نمی‌دهد."
    },
    "tag": "icb-ct",
    "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC3517489/; https://pmc.ncbi.nlm.nih.gov/articles/PMC7410590/"
  },
  {
    "front": {
      "de": "Spot Sign · Was, Wo, Bedeutung?",
      "en": "Spot Sign · What, where, significance?",
      "fa": "علامت اسپات (Spot sign) · چیست، کجا، اهمیت؟"
    },
    "back": {
      "de": "Was: fokaler Kontrastmittelpool im/am Hämatom\nWo: CTA (nicht im nativen CT)\nBedeutung: mit erhöhtem Expansionsrisiko assoziiert; keine sichere Prognose",
      "en": "What: focal contrast pooling within/at the haematoma\nWhere: CTA (not NCCT)\nSignificance: associated with increased expansion risk; not a certain prognosis",
      "fa": "چیست: تجمع کانونی ماده حاجب درون/حاشیهٔ هماتوم\nکجا: CTA (نه CT بدون کنتراست)\nاهمیت: مرتبط با افزایش خطر گسترش؛ پیش‌بینی قطعی نیست"
    },
    "explanation": {
      "de": "Das Spot Sign ist ein fokaler Kontrastmittelpool innerhalb oder am Rand des Hämatoms in der CTA. Ein positives Zeichen ist mit einem erhöhten Risiko für Hämatomexpansion assoziiert. Vorhersagewerte variieren unter anderem mit Zeitpunkt und Protokoll; daraus folgt keine sichere individuelle Prognose. CTA-Bildgebung richtet sich nach klinischem Kontext und lokalem Protokoll.",
      "en": "The Spot Sign is a focal pool of contrast within or at the margin of the haematoma on CTA. A positive sign is associated with increased risk of haematoma expansion. Predictive values vary in part with timing and protocol, so it does not provide a certain individual prognosis. CTA imaging depends on the clinical context and local protocol.",
      "fa": "Spot sign تجمع کانونی ماده حاجب درون یا حاشیهٔ هماتوم در CTA است. مثبت‌بودن آن با افزایش خطر گسترش هماتوم ارتباط دارد. ارزش پیش‌بینی تا حدی با زمان و پروتکل تغییر می‌کند و پیش‌آگهی قطعی فردی نمی‌دهد. انجام CTA به زمینهٔ بالینی و پروتکل مرکز بستگی دارد."
    },
    "tag": "icb-ct",
    "source": "https://pubmed.ncbi.nlm.nih.gov/17322083/"
  },
  {
    "front": {
      "de": "CT-Dichte ICB: Akut, Subakut, Chronisch?",
      "en": "CT attenuation in ICH: acute, subacute, chronic?",
      "fa": "دانسیتهٔ خونریزی داخل مغزی در CT: حاد، زیرحاد و مزمن؟"
    },
    "back": {
      "de": "Akut: Blut häufig hyperdens\nResorption: Dichte kann variabel abnehmen und zeitweise isodens werden\nSpäter: häufig hypodense Residualveränderung\n⚠ Verlauf und Zeitpunkt sind variabel; HU nicht als lineare Uhr verwenden.",
      "en": "Acute: blood is often hyperattenuating\nResorption: attenuation may decrease variably and become temporarily isoattenuating\nLater: often a hypoattenuating residual change\n⚠ Course and timing vary; do not use HU as a linear clock.",
      "fa": "حاد: خون اغلب هایپردنس است\nجذب: دانسیته ممکن است متغیر کاهش یابد و موقتاً ایزودنس شود\nسپس: اغلب باقی‌ماندهٔ هیپودنس\n⚠ سیر و زمان متغیرند؛ HU را ساعت خطی تلقی نکنید."
    },
    "explanation": {
      "de": "Frisches Blut ist häufig hyperdens. Während der Resorption kann die Dichte sinken und sich zeitweise der des Hirnparenchyms annähern; der Rest kann dadurch schwerer abgrenzbar sein. Zeitpunkt und Ausmaß variieren; Masseneffekt und Verlauf helfen bei der Einordnung.",
      "en": "Fresh blood is often hyperattenuating. During resorption, attenuation may decrease and temporarily approach that of brain parenchyma, making the residual haemorrhage harder to delineate. Timing and extent vary; mass effect and interval change help with interpretation.",
      "fa": "خون تازه اغلب هایپردنس است. طی جذب، دانسیته ممکن است کاهش یابد و موقتاً به دانسیتهٔ پارانشیم نزدیک شود؛ در این حالت باقیماندهٔ خونریزی دشوارتر دیده می‌شود. زمان و میزان تغییر متغیر است؛ اثر توده‌ای و تغییرات پیگیری به ارزیابی کمک می‌کنند."
    },
    "diagram": {
      "de": "Akut: oft hyperdens → Resorption: variabel abnehmend / zeitweise isodens → später häufig hypodens",
      "en": "Acute: often hyperattenuating → resorption: variable decrease / temporarily isoattenuating → later often hypoattenuating",
      "fa": "حاد: اغلب هایپردنس → جذب: کاهش متغیر / گاهی ایزودنس → سپس اغلب هیپودنس"
    },
    "tag": "icb-ct",
    "source": "https://pubs.rsna.org/doi/10.1148/123.2.335; https://www.ahajournals.org/doi/10.1161/STR.0000000000000407"
  },
  {
    "front": {
      "de": "CAA vs. Hypertensive ICB · Lokalisation?",
      "en": "CAA vs. hypertensive ICH · location?",
      "fa": "CAA در برابر خونریزی داخل مغزی ناشی از پرفشاری خون · محل؟"
    },
    "back": {
      "de": "Tiefe Blutungen und Mikroblutungen in Basalganglien, Thalamus oder Hirnstamm stützen eine tiefe Perforatorarteriopathie. Streng lobäre Blutungsherde und kortikale superfizielle Siderose stützen CAA. Verteilung allein genügt nicht zur ätiologischen Sicherung.",
      "en": "Deep haemorrhages and microbleeds in basal ganglia, thalamus or brainstem support deep perforator arteriolopathy. Strictly lobar haemorrhagic lesions and cortical superficial siderosis support CAA. Distribution alone does not establish the cause.",
      "fa": "خونریزی و میکروخونریزی عمقی در عقده‌های قاعده‌ای، تالاموس یا ساقهٔ مغز از آرتریولوپاتی پرفوراتورهای عمقی حمایت می‌کنند. کانون‌های خونریزی کاملاً لوبار و سیدروز سطحی قشری از CAA حمایت می‌کنند. توزیع به‌تنهایی علت را اثبات نمی‌کند."
    },
    "explanation": {
      "de": "Muster werden mit Alter, klinischer Präsentation und Ausschluss anderer Ursachen kombiniert. Ein gemischtes tief-lobäres Muster ist nicht gleichbedeutend mit einem streng lobären Boston-Muster.",
      "en": "Combine the pattern with age, clinical presentation and exclusion of other causes. A mixed deep–lobar pattern is not equivalent to a strictly lobar Boston pattern.",
      "fa": "الگو با سن، تظاهر بالینی و رد علل دیگر ترکیب می‌شود. الگوی مختلط عمقی-لوبار معادل الگوی کاملاً لوبار بوستون نیست."
    },
    "diagram": {
      "de": "Tiefe Perforatorarteriopathie → tiefe Blutungsherde | CAA-Verdacht → streng lobäre Herde / kortikale Siderose; Gesamtkriterien prüfen",
      "en": "Deep perforator arteriolopathy → deep haemorrhagic lesions | suspected CAA → strictly lobar lesions / cortical siderosis; assess full criteria",
      "fa": "آرتریولوپاتی پرفوراتور عمقی ← کانون خونریزی عمقی | شک به CAA ← کانون کاملاً لوبار / سیدروز قشری؛ معیارهای کامل بررسی شوند"
    },
    "tag": "icb-aetiology",
    "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC9389452/; https://www.ahajournals.org/doi/10.1161/STR.0000000000000407"
  },
  {
    "front": {
      "de": "Wie ist randständige Kontrastmittelaufnahme eines rückläufigen Hämatoms einzuordnen?",
      "en": "How should peripheral enhancement of a regressing haematoma be interpreted?",
      "fa": "جذب مادهٔ حاجب در حاشیهٔ هماتومِ در حال پسرفت چگونه تفسیر می‌شود؟"
    },
    "back": {
      "de": "Ein organisierendes Hämatom kann randständig Kontrastmittel aufnehmen. Die Rückbildung stützt diese Möglichkeit, ersetzt aber nicht die Ursachensuche. Noduläres Restgewebe, atypischer Verlauf oder klinische Warnzeichen erfordern gezielte weitere Abklärung.",
      "en": "An organising haematoma can enhance peripherally. Regression supports this possibility but does not replace aetiologic evaluation. Residual nodular tissue, atypical evolution or clinical warning signs warrant targeted investigation.",
      "fa": "هماتوم در حال سازمان‌یافتگی می‌تواند در حاشیه مادهٔ حاجب جذب کند. پسرفت از این احتمال حمایت می‌کند، اما جای بررسی علت را نمی‌گیرد. بافت ندولار باقی‌مانده، سیر غیرمعمول یا علائم هشدار بالینی به بررسی هدفمند بیشتر نیاز دارند."
    },
    "explanation": {
      "de": "Randaufnahme ist unspezifisch. Voraufnahmen, DWI/ADC und die Suche nach solidem oder nodulärem Restgewebe helfen bei der Abgrenzung; ein negativer erster Befund kann eine spätere Kontrolle nicht immer ersetzen.",
      "en": "Peripheral enhancement is nonspecific. Prior studies, DWI/ADC and a search for residual solid or nodular tissue help differentiate causes; an initially negative study does not always replace later follow-up.",
      "fa": "جذب حاشیه‌ای مادهٔ حاجب غیراختصاصی است. تصاویر قبلی، DWI/ADC و جست‌وجوی بافت جامد یا ندولار باقی‌مانده به افتراق کمک می‌کنند؛ بررسی اولیهٔ منفی همیشه جای کنترل بعدی را نمی‌گیرد."
    },
    "tag": "icb-ct",
    "diagram": {
      "de": "Randständige Kontrastmittelaufnahme → Verlauf, Diffusion und zugrunde liegende Läsion prüfen",
      "en": "Peripheral enhancement → assess evolution, diffusion and an underlying lesion",
      "fa": "جذب حاشیه‌ای مادهٔ حاجب ← بررسی سیر، انتشار و ضایعهٔ زمینه‌ای"
    },
    "source": "https://www.ahajournals.org/doi/10.1161/STR.0000000000000407"
  },
  {
    "front": {
      "de": "Welche Ursachensuche kann durch unverhältnismäßiges Ödem oder atypische Blutungslage ausgelöst werden?",
      "en": "What aetiologic investigation can be prompted by disproportionate oedema or atypical haemorrhage location?",
      "fa": "ادم نامتناسب یا محل غیرمعمول خونریزی چه بررسی علتی را می‌تواند مطرح کند؟"
    },
    "back": {
      "de": "Sekundäre Ursachen wie Tumor, Gefäßmalformation oder hämorrhagischer Infarkt erwägen; kein Einzelzeichen beweist sie. Gefäßdarstellung und gegebenenfalls kontrastverstärkte MRT werden anhand von Alter, Lage und klinischem Verdacht ausgewählt.",
      "en": "Consider secondary causes such as tumour, vascular malformation or haemorrhagic infarction; no single sign establishes one. Select vascular imaging and, where appropriate, contrast-enhanced MRI according to age, location and clinical suspicion.",
      "fa": "علل ثانویه مانند تومور، مالفورماسیون عروقی یا انفارکت خونریزی‌دهنده مطرح شوند؛ هیچ نشانهٔ منفردی آن‌ها را اثبات نمی‌کند. بررسی عروقی و در صورت لزوم MRI با تزریق بر پایهٔ سن، محل و شک بالینی انتخاب می‌شوند."
    },
    "explanation": {
      "de": "Bei junger Person mit lobärer spontaner Blutung ist eine gezielte frühe Gefäßabklärung angezeigt. CTA mit erwogener Venographie adressiert makrovaskuläre bzw. venöse Ursachen; weitere MRT/MRA oder DSA richten sich nach Befund und verbleibendem Verdacht. Eine negative CTA schließt nicht jede Ursache aus.",
      "en": "In a young person with spontaneous lobar haemorrhage, targeted early vascular investigation is indicated. CTA with consideration of venography addresses macrovascular or venous causes; further MRI/MRA or DSA depends on findings and residual suspicion. Negative CTA does not exclude every cause.",
      "fa": "در فرد جوان دارای خونریزی خودبه‌خودی لوبار، بررسی هدفمند و زودهنگام عروق لازم است. CTA با درنظرگرفتن ونوگرافی علل ماکروواسکولار یا وریدی را بررسی می‌کند؛ MRI/MRA یا DSA بیشتر به یافته‌ها و شک باقی‌مانده بستگی دارد. CTA منفی همهٔ علت‌ها را رد نمی‌کند."
    },
    "diagram": {
      "de": "Atypische Konstellation → gezielte Ursachensuche: CTA/CTV und/oder MRT/MRA; DSA bei passendem verbleibendem Verdacht",
      "en": "Atypical constellation → targeted aetiologic work-up: CTA/CTV and/or MRI/MRA; DSA for appropriate residual suspicion",
      "fa": "مجموعهٔ یافته‌های غیرمعمول ← بررسی هدفمند علت: CTA/CTV و/یا MRI/MRA؛ DSA در شک باقی‌ماندهٔ متناسب"
    },
    "tag": "icb-aetiology",
    "source": "https://www.ahajournals.org/doi/10.1161/STR.0000000000000407; https://www.bmj.com/content/351/bmj.h5762"
  },
  {
    "front": {
      "de": "Wie kombiniert man CT und MRT zur Beurteilung einer Hirnblutung, statt aus einer einzelnen Sequenz ein genaues Alter abzuleiten?",
      "en": "How are CT and MRI combined to assess cerebral haemorrhage rather than assigning an exact age from a single sequence?",
      "fa": "برای ارزیابی خونریزی مغزی، CT و MRI چگونه ترکیب می‌شوند تا سن دقیق از یک سکانس منفرد نتیجه‌گیری نشود؟"
    },
    "back": {
      "de": "Akut: rasche CT oder geeignete zeitnah verfügbare MRT. T1/T2 gemeinsam mit GRE/SWI, Voraufnahmen und Klinik auswerten. Blutproduktmuster sind typische relative Signale, keine feste Tagesuhr; GRE/SWI kann alte kleine Blutungsreste sichtbar machen.",
      "en": "Acutely: rapid CT or suitable promptly available MRI. Interpret T1/T2 together with GRE/SWI, prior imaging and clinical context. Blood-product patterns are typical relative signals, not a fixed day-by-day clock; GRE/SWI can reveal old small haemorrhagic residues.",
      "fa": "در مرحلهٔ حاد: CT سریع یا MRI مناسب و در دسترس بدون تأخیر. T1/T2 همراه GRE/SWI، تصاویر قبلی و زمینهٔ بالینی تفسیر شوند. الگوهای فرآوردهٔ خون سیگنال‌های نسبی تیپیک‌اند، نه ساعت ثابت روزانه؛ GRE/SWI می‌تواند بقایای کوچک خونریزی قدیمی را آشکار کند."
    },
    "explanation": {
      "de": "Sequenz, Feldstärke, Konzentration und räumliche Blutverteilung verändern die Darstellung. Kein pauschaler Vorteil einer Methode für jede Phase und keine lebenslange Sichtbarkeit jedes Restes werden vorausgesetzt.",
      "en": "Sequence, field strength, concentration and spatial distribution of blood affect appearance. Neither a universal modality advantage for every phase nor lifelong visibility of every residue is assumed.",
      "fa": "سکانس، قدرت میدان، غلظت و توزیع فضایی خون بر نما اثر می‌گذارند. برتری همیشگی یک روش در تمام مراحل یا قابل‌مشاهده‌بودن مادام‌العمر هر باقی‌مانده فرض نمی‌شود."
    },
    "diagram": {
      "de": "Blutung beurteilen = Klinik + Verlauf + CT/MRT-Muster; Signale sind keine starre Uhr",
      "en": "Assess haemorrhage = clinical context + evolution + CT/MRI pattern; signals are not a rigid clock",
      "fa": "ارزیابی خونریزی = زمینهٔ بالینی + سیر + الگوی CT/MRI؛ سیگنال ساعت ثابت نیست"
    },
    "tag": "icb-mrt",
    "source": "https://doi.org/10.1001/jama.292.15.1823; https://www.ahajournals.org/doi/10.1161/STR.0000000000000407; https://pubmed.ncbi.nlm.nih.gov/3257117/"
  }
]

export const ICB_FLASHCARDS = ICB_FLASHCARD_SEEDS.map((item, index) => ({
  id: `icb-fc-${String(index + 1).padStart(2, '0')}`,
  topicId: 'intrazerebrale-blutung',
  front: item.front,
  back: item.back,
  explanation: item.explanation,
  diagram: item.diagram,
  tag: item.tag,
  ...(item.source ? { source: item.source } : {}),
}))

// ── FALLPRÜFUNGS-CASES (für Homepage / faelle/pruefung) ─────────────────────

export const ICB_PRUEFUNG_CASES = [
  {
    id: 'icb-pruefung-swirl',
    fachId: 'gehirn',
    kapitelId: 'kopf-vaskulaer',
    topicId: 'intrazerebrale-blutung',
    image: '/icb/case-ct-cerebellum-gross.png',
    modality: 'CT',
    plane: 'CT · axial · nativ',
    title: L('Hyperdenses Hämatom im Kleinhirn mit Ödemsaum', 'Hyperattenuating cerebellar haematoma with oedema rim', 'هماتوم هایپردنس مخچه با حلقه ادم'),
    vignette: L(
      '71-jähriger Patient unter Phenprocoumon-Therapie (INR 3,8) mit plötzlich einsetzendem Schwindel, Erbrechen und schwerer Stand- und Gangataxie. GCS 12. Was ist die bildgebende Diagnose und was zeigt das beschriebene Zeichen an?',
      'A 71-year-old man on phenprocoumon (INR 3.8) presents with sudden vertigo, vomiting and severe truncal and gait ataxia. GCS 12. What is the imaging diagnosis and what does the described sign indicate?',
      'مرد ۷۱ ساله تحت درمان فنپروکومون (INR ۳.۸) با سرگیجه ناگهانی، استفراغ و آتاکسی شدید تنه و راه‌رفتن مراجعه می‌کند. GCS برابر ۱۲ است. تشخیص تصویربرداری و معنی علامت توصیف‌شده چیست؟'
    ),
    question: L(
      'Welche Befundung und Interpretation passen am besten zu diesem CT-Bild?',
      'Which reporting and interpretation best match this CT image?',
      'کدام گزارش و تفسیر با این تصویر CT بهترین تطابق را دارد؟'
    ),
    options: [
      { id: 'A', text: L('ICB mit Swirl Sign · möglicher Anteil unkoagulierten Blutes · erhöhtes Expansionsrisiko', 'ICB with swirl sign · possible unclotted blood component · increased expansion risk', 'ICB با علامت چرخش؛ احتمال وجود خون منعقدنشده و افزایش خطر گسترش') },
      { id: 'B', text: L('Ischämischer Infarkt mit perifokaler Hypodensität', 'Ischaemic infarct with perilesional hypodensity', 'انفارکت ایسکمیک با هیپودنسیتی اطراف') },
      { id: 'C', text: L('Abszess mit zentraler Nekrose · kein Hinweis auf Blutung', 'Abscess with central necrosis · no sign of haemorrhage', 'آبسه با نکروز مرکزی · بدون نشانه خونریزی') },
      { id: 'D', text: L('Subdurale Blutung über dem Parenchym', 'Subdural haematoma over the parenchyma', 'هماتوم ساب‌دورال روی پارانشیم') },
    ],
    correct: 'A',
    explanation: L(
      'Das hyperdense Hämatom mit eingestreuten hypodensen Arealen entspricht dem Swirl Sign. Die weniger dichten Anteile können unkoaguliertes Blut darstellen und sind mit einem erhöhten Risiko der Hämatomexpansion assoziiert; das Zeichen beweist eine aktuell aktive Blutung jedoch nicht allein. Bei OAK-Einnahme (INR 3,8) ist eine rasche Antagonisierung indiziert.',
      'A hyperattenuating haematoma with interspersed hypodense areas represents the swirl sign. The lower-density components may reflect unclotted blood and are associated with increased haematoma expansion risk, but the sign alone does not prove active bleeding at that moment. With anticoagulation (INR 3.8), rapid reversal is indicated.',
      'هماتوم هایپردنس با نواحی هیپودنس پراکنده با علامت چرخش سازگار است. بخش‌های کم‌دانسیته ممکن است خون منعقدنشده باشند و با افزایش خطر گسترش هماتوم ارتباط دارند، اما این علامت به‌تنهایی خونریزی فعال در همان لحظه را اثبات نمی‌کند. با مصرف ضدانعقاد و INR برابر ۳.۸، معکوس‌سازی سریع اندیکاسیون دارد.'
    ),
    source: 'https://radiopaedia.org/articles/intracerebral-haemorrhage?lang=us',
    credit: 'Bildmaterial aus dem Lehrmaterial · Radiopaedia CC BY-NC-SA 3.0',
  },
  {
    id: 'icb-pruefung-ring',
    fachId: 'gehirn',
    kapitelId: 'kopf-vaskulaer',
    topicId: 'intrazerebrale-blutung',
    image: '/icb/case-t1-subakut-bright.jpg',
    modality: 'MRT',
    plane: 'MRT · T1 · axial · nativ · früh subakut',
    title: L('ICB früh subakut · T1 hyperintens · Wendepunkt', 'ICB early subacute · T1 hyperintense · turning point', 'ICB زیرحاد اولیه · T1 هایپرانتنس · نقطه عطف'),
    vignette: L(
      '58-jährige Patientin, bekannte Hypertonikerin, stationäre Aufnahme nach initialer CCT-Diagnose einer Kleinhirnblutung. Kontroll-MRT am Tag 5: T1-gewichtete Sequenz zeigt eine hyperintense Läsion im rechten Kleinhirn. Welche Interpretation ist korrekt?',
      'A 58-year-old woman with known hypertension, admitted after initial NCCT diagnosis of cerebellar haemorrhage. Follow-up MRI on day 5: T1-weighted sequence shows a hyperintense lesion in the right cerebellum. Which interpretation is correct?',
      'خانم ۵۸ ساله با فشار خون شناخته‌شده، بستری پس از تشخیص اولیه CT از خونریزی مخچه. MRI کنترل در روز ۵: سکانس T1 ضایعه هایپرانتنس در مخچه راست نشان می‌دهد. کدام تفسیر صحیح است؟'
    ),
    question: L(
      'Was ist die Ursache der T1-Hyperintensität in diesem MRT-Bild?',
      'What causes the T1 hyperintensity in this MRI image?',
      'علت هایپرانتنسیتی T1 در این تصویر MRI چیست؟'
    ),
    options: [
      { id: 'A', text: L('Akutes Deoxy-Hb · paramagnetisch · T1 immer hell', 'Acute deoxyHb · paramagnetic · T1 always bright', 'Deoxy-Hb حاد · پاراماگنتیک · T1 همیشه روشن') },
      { id: 'B', text: L('Intrazelluläres Met-Hb (früh subakut) · T1 oft hell, T2 kann noch hypointens sein', 'Intracellular metHb (early subacute) · T1 often bright, T2 may remain hypointense', 'Met-Hb داخل‌سلولی (زیرحاد اولیه) · T1 اغلب پرسیگنال؛ T2 ممکن است همچنان کم‌سیگنال باشد') },
      { id: 'C', text: L('Hämosiderin in Makrophagen · SWI-Effekt', 'Haemosiderin in macrophages · SWI effect', 'هموسیدرین در ماکروفاژها · اثر SWI') },
      { id: 'D', text: L('Perifokales Ödem · T1 immer hyperintens', 'Perilesional oedema · T1 always hyperintense', 'ادم اطراف · T1 همیشه هایپرانتنس') },
    ],
    correct: 'B',
    explanation: L(
      'Im früh subakuten Verlauf ist intrazelluläres Met-Hb häufig mit T1-Hyperintensität und noch möglicher T2-Hypointensität verbunden. Zeitpunkt und Ausprägung sind variabel; der Übergang kann zuerst peripher auftreten.',
      'During the early subacute course, intracellular metHb is often associated with T1 hyperintensity while T2 may remain hypointense. Timing and appearance vary; the transition may first appear peripherally.',
      'در سیر زیرحاد اولیه، Met-Hb داخل‌سلولی اغلب با پرسیگنال‌شدن T1 همراه است، درحالی‌که T2 ممکن است کم‌سیگنال بماند. زمان و شدت متغیر است و گذار ممکن است ابتدا در محیط دیده شود.'
    ),
    source: 'https://radiopaedia.org/articles/intracerebral-haemorrhage?lang=us',
    credit: 'Bildmaterial aus dem Lehrmaterial · Radiopaedia CC BY-NC-SA 3.0',
  },
]
