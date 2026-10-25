// Replacement records retain original assessment IDs. Independently reviewed separately.
export const HRCT_INCREASED_DENSITY_CASES={
  "hrct-dichteanhebung-01": {
    "question": {
      "de": "Die Dünnschicht-CT zeigt eine Region mit erhöhter Lungendichte; die Gefäß- und Bronchialwandkonturen bleiben darin erkennbar. Welche Beschreibung ist passend?",
      "en": "Thin-section CT shows a region of increased lung attenuation with preserved vascular and bronchial-wall margins. Which description fits?",
      "fa": "CT نازک‌برش ناحیه‌ای با افزایش دانسیتهٔ ریه نشان می‌دهد که حاشیهٔ عروق و دیوارهٔ برونش در آن قابل مشاهده است. کدام توصیف مناسب است؟"
    },
    "options": [
      {
        "de": "Milchglasverdichtung",
        "en": "Ground-glass opacity",
        "fa": "کدورت شیشه‌مات"
      },
      {
        "de": "Konsolidierung",
        "en": "Consolidation",
        "fa": "کنسولیدیشن"
      },
      {
        "de": "Isolierte Retikulation",
        "en": "Isolated reticulation",
        "fa": "رتیکولاسیون منفرد"
      },
      {
        "de": "Emphysematöse Dichteminderung",
        "en": "Emphysematous low attenuation",
        "fa": "کاهش دانسیتهٔ آمفیزماتیک"
      }
    ],
    "correct": 0,
    "difficulty": 1,
    "source": "https://doi.org/10.1148/radiol.232558",
    "explanation": {
      "de": "Erhöhte Dichte mit erkennbaren Gefäß-/Bronchialkonturen beschreibt Milchglas. Der Begriff legt weder eine Infektion noch eine andere Ursache fest.",
      "en": "Increased attenuation with preserved vessel/bronchial margins describes ground glass. The term establishes neither infection nor another cause.",
      "fa": "افزایش دانسیته با حفظ حاشیهٔ عروق/برونش شیشه‌مات را توصیف می‌کند. این اصطلاح نه عفونت و نه علت دیگری را تعیین می‌کند."
    },
    "wrong": [
      null,
      {
        "de": "Bei Konsolidierung sind die Gefäßränder durch die Verdichtung verdeckt.",
        "en": "Consolidation obscures vessel margins.",
        "fa": "در کنسولیدیشن حاشیهٔ عروق با کدورت محو می‌شود."
      },
      {
        "de": "Retikulation bezeichnet ein Netz linearer Verschattungen; ein solches Netz ist hier nicht angegeben.",
        "en": "Reticulation describes a network of linear opacities, which is not stated here.",
        "fa": "رتیکولاسیون شبکهٔ کدورت‌های خطی را توصیف می‌کند که اینجا ذکر نشده است."
      },
      {
        "de": "Emphysem führt zu vermindertem Gewebeanteil und eher niedrigerer Dichte, nicht zur beschriebenen erhöhten Dichte.",
        "en": "Emphysema reduces tissue content and tends to lower attenuation rather than producing the increase described.",
        "fa": "آمفیزم بافت را کاهش می‌دهد و بیشتر دانسیته را پایین می‌آورد، نه افزایش توصیف‌شده را."
      }
    ],
    "front": {
      "de": "Was unterscheidet Milchglas morphologisch von Konsolidierung?",
      "en": "What morphologically distinguishes ground glass from consolidation?",
      "fa": "از نظر مورفولوژی چه چیزی شیشه‌مات را از کنسولیدیشن جدا می‌کند؟"
    },
    "answer": {
      "de": "Bei Milchglas bleiben Gefäß- und Bronchialwandkonturen erkennbar; Konsolidierung verdeckt die Gefäßränder.",
      "en": "Vascular and bronchial-wall margins remain visible in ground glass; consolidation obscures vessel margins.",
      "fa": "در شیشه‌مات حاشیهٔ عروق و دیوارهٔ برونش دیده می‌شود؛ کنسولیدیشن حاشیهٔ عروق را محو می‌کند."
    }
  },
  "hrct-dichteanhebung-02": {
    "question": {
      "de": "Nach länger bestehender Pleuraerkrankung zeigt die CT eine basale pleuranahe rundliche Verdichtung mit angrenzender Pleuraverdickung, lokalem Volumenverlust und gebogen einziehenden Bronchien/Gefäßen. Welche Einordnung wird am stärksten gestützt?",
      "en": "After longstanding pleural disease, CT shows a basal pleural-based rounded opacity with adjacent pleural thickening, local volume loss and curving bronchi/vessels entering it. Which interpretation is best supported?",
      "fa": "پس از بیماری طولانی‌مدت پلور، CT کدورت گرد بازال و مجاور پلور با ضخیم‌شدگی پلور کنار آن، کاهش حجم موضعی و ورود خمیدهٔ برونش‌ها/عروق نشان می‌دهد. کدام تفسیر بیشتر حمایت می‌شود؟"
    },
    "options": [
      {
        "de": "Pleuranahe Metastase",
        "en": "Pleural-based metastasis",
        "fa": "متاستاز مجاور پلور"
      },
      {
        "de": "Rundatelektase",
        "en": "Rounded atelectasis",
        "fa": "آتلکتازی گرد"
      },
      {
        "de": "Peripheres Bronchialkarzinom",
        "en": "Peripheral lung carcinoma",
        "fa": "کارسینوم محیطی ریه"
      },
      {
        "de": "Rundpneumonie",
        "en": "Round pneumonia",
        "fa": "پنومونی گرد"
      }
    ],
    "correct": 1,
    "difficulty": 2,
    "source": "https://pubmed.ncbi.nlm.nih.gov/3186982/",
    "explanation": {
      "de": "Pleuraveränderung, angrenzende Verdichtung, Volumenverlust und einziehende bronchovaskuläre Strukturen bilden die charakteristische Rundatelektase-Konstellation. Ein Einzelzeichen allein ersetzt keine Gesamtbeurteilung/Vorvergleiche.",
      "en": "Pleural change, adjacent opacity, volume loss and entering bronchovascular structures form the characteristic rounded-atelectasis constellation. A single sign does not replace overall assessment/prior comparison.",
      "fa": "تغییرات پلور، کدورت مجاور، کاهش حجم و ساختارهای برونکوواسکولار واردشونده مجموعهٔ مشخصهٔ آتلکتازی گرد را می‌سازند. یک نشانه جای ارزیابی کلی/مقایسه با تصاویر قبلی را نمی‌گیرد."
    },
    "wrong": [
      {
        "de": "Pleuranahe Lage allein würde Metastase und Rundatelektase nicht trennen. Die zusätzlichen Bündel-/Volumenzeichen stützen hier Letztere.",
        "en": "Pleural proximity alone would not distinguish metastasis from rounded atelectasis. The additional bundle/volume signs favour the latter here.",
        "fa": "مجاورت پلور به‌تنهایی متاستاز را از آتلکتازی گرد جدا نمی‌کند. نشانه‌های اضافی دسته‌های برونکوواسکولار و حجم در اینجا از دومی حمایت می‌کنند."
      },
      null,
      {
        "de": "Eine Neoplasie bleibt bei atypischer Morphologie oder Entwicklung zu bedenken; die genannte Gesamtmorphologie stützt hier jedoch stärker Rundatelektase.",
        "en": "Neoplasia remains a consideration with atypical morphology or evolution, but the combined morphology here better supports rounded atelectasis.",
        "fa": "در مورفولوژی یا سیر غیرتیپیک نئوپلاسم همچنان مطرح است، اما مجموعهٔ مورفولوژیک اینجا بیشتر از آتلکتازی گرد حمایت می‌کند."
      },
      {
        "de": "Eine passende akute Infektionskonstellation ist nicht beschrieben; Pleuraveränderung, Volumenverlust und gebogene Bündel priorisieren Rundatelektase.",
        "en": "An acute infectious context is not described; pleural change, volume loss and curving bundles prioritise rounded atelectasis.",
        "fa": "زمینهٔ عفونت حاد توصیف نشده است؛ تغییرات پلور، کاهش حجم و دسته‌های خمیده آتلکتازی گرد را در اولویت قرار می‌دهند."
      }
    ],
    "front": {
      "de": "Welche Befundkombination stützt Rundatelektase?",
      "en": "Which combination supports rounded atelectasis?",
      "fa": "کدام ترکیب یافته از آتلکتازی گرد حمایت می‌کند؟"
    },
    "answer": {
      "de": "Pleuranahe Verdichtung, angrenzende Pleuraveränderung, lokaler Volumenverlust und gebogen einziehende Bronchien/Gefäße (Comet tail); mit Kontext und Verlauf einordnen.",
      "en": "Pleural-based opacity, adjacent pleural change, local volume loss and curving entering bronchi/vessels (comet tail); interpret with context and interval evolution.",
      "fa": "کدورت مجاور پلور، تغییر پلور کنار آن، کاهش حجم موضعی و برونش‌ها/عروق واردشوندهٔ خمیده (دم‌دنباله‌دار)؛ با زمینه و سیر زمانی تفسیر شود."
    }
  },
  "hrct-dichteanhebung-03": {
    "question": {
      "de": "Eine umschriebene rundliche solide Lungenläsion hat einen mittleren Durchmesser von 35 mm. Welche Größenbezeichnung ist nach der Thorax-Nomenklatur passend?",
      "en": "A circumscribed rounded solid pulmonary lesion has a mean diameter of 35 mm. Which size term fits thoracic nomenclature?",
      "fa": "ضایعهٔ جامد و گردِ مشخص ریه میانگین قطر ۳۵ میلی‌متر دارد. کدام اصطلاح اندازه در نام‌گذاری قفسهٔ سینه مناسب است؟"
    },
    "options": [
      {
        "de": "Mikronodulus",
        "en": "Micronodule",
        "fa": "میکروندول"
      },
      {
        "de": "Mikronoduläres Muster",
        "en": "Micronodular pattern",
        "fa": "الگوی میکروندولار"
      },
      {
        "de": "Raumforderung (Mass)",
        "en": "Mass",
        "fa": "توده (Mass)"
      },
      {
        "de": "Nodulus",
        "en": "Nodule",
        "fa": "ندول"
      }
    ],
    "correct": 2,
    "difficulty": 1,
    "source": "https://doi.org/10.1148/radiol.232558",
    "explanation": {
      "de": "Eine rundliche Läsion über 30 mm wird als Raumforderung bezeichnet. Das ist eine Größenbeschreibung und beweist keine Histologie.",
      "en": "A rounded lesion larger than 30 mm is termed a mass. This describes size rather than proving histology.",
      "fa": "ضایعهٔ گرد بزرگ‌تر از ۳۰ میلی‌متر توده نامیده می‌شود. این توصیف اندازه است و بافت‌شناسی را ثابت نمی‌کند."
    },
    "wrong": [
      {
        "de": "Mikronoduli sind nach aktuellem Fleischner-Glossar kleiner als 6 mm.",
        "en": "Micronodules are smaller than 6 mm in the current Fleischner glossary.",
        "fa": "میکروندول‌ها در واژه‌نامهٔ فعلی فلایشنر کوچک‌تر از ۶ میلی‌مترند."
      },
      {
        "de": "Ein mikronoduläres Muster bezeichnet viele kleine Noduli, nicht die einzelne 35 mm-Läsion.",
        "en": "A micronodular pattern describes numerous small nodules rather than a single 35 mm lesion.",
        "fa": "الگوی میکروندولار ندول‌های کوچک متعدد را توصیف می‌کند، نه یک ضایعهٔ منفرد ۳۵ میلی‌متری."
      },
      null,
      {
        "de": "Der Nodulusbegriff gilt in dieser Nomenklatur bis einschließlich 30 mm; 35 mm liegt darüber.",
        "en": "The nodule term extends through 30 mm in this nomenclature; 35 mm exceeds it.",
        "fa": "در این نام‌گذاری اصطلاح ندول تا ۳۰ میلی‌متر را شامل می‌شود؛ ۳۵ میلی‌متر از آن بیشتر است."
      }
    ],
    "front": {
      "de": "Wie unterscheiden sich Mikronodulus, Nodulus und Raumforderung in der aktuellen Größen-Nomenklatur?",
      "en": "How do micronodule, nodule and mass differ in current size terminology?",
      "fa": "میکروندول، ندول و توده در نام‌گذاری فعلی اندازه چه تفاوتی دارند؟"
    },
    "answer": {
      "de": "Mikronodulus <6 mm; Nodulus bis 30 mm; Raumforderung >30 mm. Mikronodulus bezeichnet die kleine Untergruppe, nicht eine histologische Diagnose.",
      "en": "Micronodule <6 mm; nodule up to 30 mm; mass >30 mm. Micronodule denotes the small subgroup rather than a histological diagnosis.",
      "fa": "میکروندول <۶ میلی‌متر؛ ندول تا ۳۰ میلی‌متر؛ توده >۳۰ میلی‌متر. میکروندول زیرگروه کوچک را نام‌گذاری می‌کند، نه تشخیص بافت‌شناختی."
    }
  },
  "hrct-dichteanhebung-04": {
    "question": {
      "de": "Eine CT-Verdichtung besteht aus einer zentralen Milchglaszone mit dichtem ringförmigem Saum. Welcher Zeichenbegriff beschreibt dieses Verhältnis?",
      "en": "A CT opacity has a central ground-glass region surrounded by a dense ring. Which sign describes this relationship?",
      "fa": "کدورت CT از ناحیهٔ مرکزی شیشه‌مات با حاشیهٔ حلقه‌ای متراکم تشکیل شده است. کدام علامت این رابطه را توصیف می‌کند؟"
    },
    "options": [
      {
        "de": "Halo-Zeichen",
        "en": "Halo sign",
        "fa": "علامت هالو"
      },
      {
        "de": "Luftsichelzeichen",
        "en": "Air crescent sign",
        "fa": "علامت هلال هوا"
      },
      {
        "de": "Comet-tail-Zeichen",
        "en": "Comet-tail sign",
        "fa": "علامت دم‌دنباله‌دار"
      },
      {
        "de": "Reverse-Halo-Zeichen",
        "en": "Reversed halo sign",
        "fa": "علامت هالوی معکوس"
      }
    ],
    "correct": 3,
    "difficulty": 1,
    "source": "https://doi.org/10.1148/radiol.232558",
    "explanation": {
      "de": "Zentrales Milchglas mit peripherer Konsolidierung beschreibt einen Reverse Halo. Das Zeichen ist nicht spezifisch für organisierende Pneumonie; der klinische Kontext bleibt entscheidend.",
      "en": "Central ground glass with peripheral consolidation describes a reversed halo. The sign is not specific for organising pneumonia; clinical context remains essential.",
      "fa": "شیشه‌مات مرکزی با کنسولیدیشن محیطی هالوی معکوس را توصیف می‌کند. این علامت برای پنومونی سازمان‌یابنده اختصاصی نیست؛ زمینهٔ بالینی همچنان ضروری است."
    },
    "wrong": [
      {
        "de": "Beim Halo liegt Milchglas als Saum um einen zentralen Nodulus/eine dichtere Läsion, also in umgekehrter Anordnung.",
        "en": "In a halo, ground glass rims a central nodule/denser lesion, the reverse arrangement.",
        "fa": "در هالو، شیشه‌مات حاشیهٔ ندول/ضایعهٔ متراکم‌تر مرکزی است؛ آرایش برعکس است."
      },
      {
        "de": "Eine Luftsichel liegt als Luft zwischen Kavitätenwand und intrakavitärem Material, nicht als Konsolidierungsring um Milchglas.",
        "en": "An air crescent is air between a cavity wall and intracavitary material rather than a consolidation ring around ground glass.",
        "fa": "هلال هوا، هوا بین دیوارهٔ کاویتی و مادهٔ داخل آن است، نه حلقهٔ کنسولیدیشن دور شیشه‌مات."
      },
      {
        "de": "Comet tail beschreibt gebogen einziehende bronchovaskuläre Strukturen, keine zentrale Milchglas-/Ringanordnung.",
        "en": "Comet tail describes curving entering bronchovascular structures rather than a central ground-glass/ring arrangement.",
        "fa": "دم‌دنباله‌دار ساختارهای برونکوواسکولار واردشوندهٔ خمیده را توصیف می‌کند، نه آرایش شیشه‌مات مرکزی و حلقه."
      },
      null
    ],
    "front": {
      "de": "Was unterscheidet Halo und Reverse Halo?",
      "en": "What distinguishes halo from reversed halo?",
      "fa": "چه چیزی هالو را از هالوی معکوس جدا می‌کند؟"
    },
    "answer": {
      "de": "Halo: Milchglassaum um einen dichteren Fokus. Reverse Halo: zentrales Milchglas mit peripherer Konsolidierung. Beide benötigen ätiologische Einordnung.",
      "en": "Halo: ground-glass rim around a denser focus. Reversed halo: central ground glass with peripheral consolidation. Both require aetiological assessment.",
      "fa": "هالو: حاشیهٔ شیشه‌مات دور کانون متراکم‌تر. هالوی معکوس: شیشه‌مات مرکزی با کنسولیدیشن محیطی. هر دو به ارزیابی علت نیاز دارند."
    }
  },
  "hrct-dichteanhebung-05": {
    "question": {
      "de": "Postoperativ ist ein Lappen dichter und kleiner; die Fissur und der Hilus sind zur betroffenen Region verlagert. Welche morphologische Einordnung passt am besten?",
      "en": "Postoperatively, a lobe is denser and smaller, with the fissure and hilum displaced toward the affected region. Which morphological interpretation fits best?",
      "fa": "پس از عمل، یک لوب متراکم‌تر و کوچک‌تر شده و فیشور و ناف به سمت ناحیهٔ درگیر جابه‌جا شده‌اند. کدام تفسیر مورفولوژیک مناسب‌تر است؟"
    },
    "options": [
      {
        "de": "Atelektatische Verdichtung",
        "en": "Atelectatic opacity",
        "fa": "کدورت آتلکتاتیک"
      },
      {
        "de": "Alveoläre Füllung ohne Volumenverlust",
        "en": "Alveolar filling without volume loss",
        "fa": "پرشدگی آلوئولی بدون کاهش حجم"
      },
      {
        "de": "Emphysematöse Überblähung",
        "en": "Emphysematous overinflation",
        "fa": "پرهوایی آمفیزماتیک"
      },
      {
        "de": "Isolierte interlobuläre Septenverdickung",
        "en": "Isolated interlobular septal thickening",
        "fa": "ضخیم‌شدگی منفرد سپتای بین‌لوبولی"
      }
    ],
    "correct": 0,
    "difficulty": 2,
    "source": "https://doi.org/10.1148/radiol.232558",
    "explanation": {
      "de": "Die Kombination aus erhöhter Dichte und Volumenverlust mit Fissur-/Hilusverlagerung stützt Atelektase. Daraus folgt nicht allein die Ursache des Kollapses.",
      "en": "Increased attenuation with volume loss and fissural/hilar displacement supports atelectasis. This does not alone establish the cause of collapse.",
      "fa": "افزایش دانسیته همراه کاهش حجم و جابه‌جایی فیشور/ناف از آتلکتازی حمایت می‌کند. علت کلاپس صرفاً از این یافته‌ها تعیین نمی‌شود."
    },
    "wrong": [
      null,
      {
        "de": "Ein Volumenverlust mit struktureller Verlagerung ist ausdrücklich beschrieben; reine Füllung ohne Volumenverlust erfasst ihn nicht.",
        "en": "Volume loss with structural displacement is explicitly described and is not captured by filling without volume loss.",
        "fa": "کاهش حجم با جابه‌جایی ساختارها صریحاً توصیف شده و پرشدگی بدون کاهش حجم آن را بیان نمی‌کند."
      },
      {
        "de": "Überblähung würde eher eine Volumenzunahme erklären, nicht den kleineren dichteren Lappen.",
        "en": "Overinflation would explain increased volume rather than the smaller denser lobe.",
        "fa": "پرهوایی بیشتر افزایش حجم را توضیح می‌دهد، نه لوب کوچک‌تر و متراکم‌تر."
      },
      {
        "de": "Septenverdickung allein erklärt den lobären Volumenverlust mit Fissur-/Hilusverlagerung nicht ausreichend.",
        "en": "Septal thickening alone does not adequately explain lobar volume loss with fissural/hilar displacement.",
        "fa": "ضخیم‌شدگی سپتا به‌تنهایی کاهش حجم لوب با جابه‌جایی فیشور/ناف را به‌طور کافی توضیح نمی‌دهد."
      }
    ],
    "front": {
      "de": "Welche Begleitzeichen machen bei einer Verdichtung Atelektase wahrscheinlich?",
      "en": "Which associated signs make an opacity likely atelectatic?",
      "fa": "کدام نشانه‌های همراه احتمال آتلکتاتیک‌بودن کدورت را بیشتر می‌کنند؟"
    },
    "answer": {
      "de": "Volumenverlust mit Fissuren-/Hilusverlagerung, gegebenenfalls Gefäßcrowding und Zwerchfellhochstand; die Kollapsursache gesondert prüfen.",
      "en": "Volume loss with fissural/hilar displacement, sometimes vascular crowding and diaphragmatic elevation; assess the cause of collapse separately.",
      "fa": "کاهش حجم با جابه‌جایی فیشور/ناف، گاهی تجمع عروق و بالا‌رفتن دیافراگم؛ علت کلاپس جداگانه بررسی شود."
    }
  },
  "hrct-dichteanhebung-06": {
    "question": {
      "de": "Welche Morphologie eines kleinen soliden Nodulus passt am besten zu einem typischen perifissuralen intrapulmonalen Lymphknoten?",
      "en": "Which small solid-nodule morphology best fits a typical perifissural intrapulmonary lymph node?",
      "fa": "کدام مورفولوژی ندول جامد کوچک بیشتر با غدهٔ لنفاوی داخل‌ریوی پری‌فیشورال تیپیک سازگار است؟"
    },
    "options": [
      {
        "de": "Irregulär mit nodulär verdickter Kavitätenwand",
        "en": "Irregular with nodular cavity-wall thickening",
        "fa": "نامنظم با ضخیم‌شدگی ندولار دیوارهٔ کاویتی"
      },
      {
        "de": "Glatt, linsen-/dreieckförmig, an einer Fissur gelegen",
        "en": "Smooth, lentiform/triangular, along a fissure",
        "fa": "صاف، عدسی/مثلثی، در کنار فیشور"
      },
      {
        "de": "Spikuliert, unregelmäßig, apikal gelegen",
        "en": "Spiculated, irregular, apical",
        "fa": "اسپیکوله، نامنظم، اپیکال"
      },
      {
        "de": "Teilsolide mit neu wachsendem soliden Anteil",
        "en": "Part-solid with a newly growing solid component",
        "fa": "نیمه‌جامد با جزء جامد جدید و در حال رشد"
      }
    ],
    "correct": 1,
    "difficulty": 1,
    "source": "https://pubs.rsna.org/doi/10.1148/radiol.2017161659",
    "explanation": {
      "de": "Glatter Rand, linsen-/dreieckartige Form und Fissurenbezug passen zu einem typischen intrapulmonalen Lymphknoten. Die Lage an einer Fissur allein erlaubt keine automatische Benignitätszuordnung.",
      "en": "Smooth margins, lentiform/triangular shape and fissural relation fit a typical intrapulmonary lymph node. Fissural proximity alone does not establish benignity.",
      "fa": "حاشیهٔ صاف، شکل عدسی/مثلثی و ارتباط با فیشور با غدهٔ لنفاوی داخل‌ریوی تیپیک سازگارند. مجاورت فیشور به‌تنهایی خوش‌خیمی را تعیین نمی‌کند."
    },
    "wrong": [
      {
        "de": "Eine nodulär verdickte Kavitätenwand beschreibt eine andere Morphologie als den glatten kompakten perifissuralen Lymphknoten.",
        "en": "Nodular cavity-wall thickening describes a different morphology from a smooth compact perifissural lymph node.",
        "fa": "ضخیم‌شدگی ندولار دیوارهٔ کاویتی مورفولوژی متفاوتی با غدهٔ لنفاوی پری‌فیشورال صاف و متراکم دارد."
      },
      null,
      {
        "de": "Spikulation und irregulärer Rand entsprechen nicht der typischen glatten Lymphknotenmorphologie.",
        "en": "Spiculation and an irregular margin do not match typical smooth lymph-node morphology.",
        "fa": "اسپیکولاسیون و حاشیهٔ نامنظم با مورفولوژی صاف و تیپیک غدهٔ لنفاوی تطابق ندارند."
      },
      {
        "de": "Ein wachsender solider Anteil in einem teilsoliden Nodulus ist keine typische perifissurale Lymphknotenbeschreibung.",
        "en": "A growing solid component in a part-solid nodule is not a typical perifissural lymph-node description.",
        "fa": "جزء جامد در حال رشد در ندول نیمه‌جامد توصیف تیپیک غدهٔ لنفاوی پری‌فیشورال نیست."
      }
    ],
    "front": {
      "de": "Reicht Fissurennähe allein für die Bezeichnung typischer perifissuraler Nodulus?",
      "en": "Is proximity to a fissure alone sufficient to call a typical perifissural nodule?",
      "fa": "آیا مجاورت فیشور به‌تنهایی برای نام‌گذاری ندول پری‌فیشورال تیپیک کافی است؟"
    },
    "answer": {
      "de": "Nein. Auch glatter Rand und passende linsen-/ovale/dreieckige Morphologie gehören zur Gesamtbeurteilung; atypische Merkmale getrennt abklären.",
      "en": "No. Smooth margins and suitable lentiform/oval/triangular morphology also contribute; assess atypical features separately.",
      "fa": "خیر. حاشیهٔ صاف و مورفولوژی مناسب عدسی/بیضی/مثلثی هم در ارزیابی کلی نقش دارند؛ ویژگی‌های غیرتیپیک جداگانه بررسی شوند."
    }
  },
  "hrct-dichteanhebung-07": {
    "question": {
      "de": "Ein persistierender teilsolider Nodulus hat im vergleichbaren Dünnschicht-CT einen unveränderten Gesamtdurchmesser, aber einen gewachsenen soliden Anteil. Welche Befundaussage berücksichtigt den relevanten Verlauf?",
      "en": "A persistent part-solid nodule has an unchanged overall diameter but a growing solid component on comparable thin-section CT. Which report accounts for the relevant interval change?",
      "fa": "ندول نیمه‌جامد پایدار در CT نازک‌برش قابل‌مقایسه، قطر کلی ثابت ولی جزء جامد در حال رشد دارد. کدام گزارش تغییر مهم پیگیری را لحاظ می‌کند؟"
    },
    "options": [
      {
        "de": "Der Anteil an Milchglas ist kleiner; dies wird als Größenregression des gesamten Befunds gewertet.",
        "en": "The ground-glass proportion is smaller; this is recorded as regression of the whole lesion.",
        "fa": "نسبت شیشه‌مات کمتر شده است؛ این به‌عنوان پسرفت کل ضایعه ثبت می‌شود."
      },
      {
        "de": "Der gesamte Nodulus ist größenstabil; damit ist die Entwicklung ausreichend beschrieben.",
        "en": "The overall nodule size is stable; this adequately describes its evolution.",
        "fa": "اندازهٔ کلی ندول ثابت است؛ این توصیف برای تغییرات آن کافی است."
      },
      {
        "de": "Die solide Komponente ist gewachsen und wird getrennt vom Gesamtdurchmesser dokumentiert.",
        "en": "The solid component has grown and is documented separately from overall diameter.",
        "fa": "جزء جامد رشد کرده و جدا از قطر کلی ثبت می‌شود."
      },
      {
        "de": "Der pleurale Abstand ist unverändert; er dient als maßgeblicher Verlaufsparameter.",
        "en": "Pleural distance is unchanged and serves as the principal follow-up parameter.",
        "fa": "فاصله از پلور ثابت است و معیار اصلی پیگیری محسوب می‌شود."
      }
    ],
    "correct": 2,
    "difficulty": 2,
    "source": "https://doi.org/10.1148/radiol.2017161659",
    "explanation": {
      "de": "Wachstum der soliden Komponente ist trotz gleichbleibendem Gesamtdurchmesser relevant und verlangt erneute Einordnung. Gesamtgröße und solider Anteil werden getrennt gemessen. Das Wachstum allein beweist keine Histologie.",
      "en": "Growth of the solid component matters despite stable overall diameter and warrants reassessment. Measure overall size and the solid component separately. Growth alone does not establish histology.",
      "fa": "رشد جزء جامد با وجود ثبات قطر کلی مهم و نیازمند ارزیابی مجدد است. اندازهٔ کلی و جزء جامد جداگانه اندازه‌گیری شوند. رشد به‌تنهایی بافت‌شناسی را ثابت نمی‌کند."
    },
    "wrong": [
      {
        "de": "Ein kleinerer relativer Milchglasanteil bei wachsendem solidem Anteil ist keine Größenregression des gesamten Nodulus.",
        "en": "A smaller relative ground-glass proportion with a growing solid component is not regression of the whole nodule.",
        "fa": "کاهش نسبت شیشه‌مات همراه رشد جزء جامد به‌معنای پسرفت کل ندول نیست."
      },
      {
        "de": "Die Gesamtgröße kann eine relevante Veränderung der Zusammensetzung verdecken. Der gewachsene solide Anteil muss ausdrücklich erfasst werden.",
        "en": "Overall size can hide a relevant compositional change. Explicitly record the growing solid component.",
        "fa": "اندازهٔ کلی می‌تواند تغییر مهم ترکیب را پنهان کند. رشد جزء جامد باید صریح ثبت شود."
      },
      null,
      {
        "de": "Der Abstand zur Pleura ersetzt die Größen- und Komponentenbeurteilung nicht.",
        "en": "Distance to the pleura does not replace size and component assessment.",
        "fa": "فاصله از پلور جای ارزیابی اندازه و اجزا را نمی‌گیرد."
      }
    ],
    "front": {
      "de": "Was wird bei einem teilsoliden Nodulus im Verlauf getrennt erfasst?",
      "en": "What is assessed separately during part-solid nodule follow-up?",
      "fa": "در پیگیری ندول نیمه‌جامد چه چیزهایی جداگانه ارزیابی می‌شوند؟"
    },
    "answer": {
      "de": "Gesamtgröße und Größe/Entwicklung des soliden Anteils; stabiler Gesamtdurchmesser schließt relevante Progression des soliden Anteils nicht aus.",
      "en": "Overall size and size/evolution of the solid component; stable total diameter does not exclude relevant solid-component progression.",
      "fa": "اندازهٔ کلی و اندازه/تغییر جزء جامد؛ ثبات قطر کلی، پیشرفت مهم جزء جامد را رد نمی‌کند."
    }
  },
  "hrct-dichteanhebung-08": {
    "question": {
      "de": "Bei neu aufgetretener Orthopnoe und Gewichtszunahme zeigt die CT glatte Septenverdickung, perihilär-basales Milchglas, Kardiomegalie und beidseitige Ergüsse. Welche Ursache wird durch die Gesamtkonstellation am stärksten gestützt?",
      "en": "With new orthopnoea and weight gain, CT shows smooth septal thickening, perihilar basal ground glass, cardiomegaly and bilateral effusions. Which cause is best supported by the combined findings?",
      "fa": "با ارتوپنه و افزایش وزن جدید، CT ضخیم‌شدگی صاف سپتا، شیشه‌مات اطراف ناف و قاعده، کاردیومگالی و افیوژن دوطرفه نشان می‌دهد. مجموعهٔ یافته‌ها بیشتر از کدام علت حمایت می‌کند؟"
    },
    "options": [
      {
        "de": "Akute virale Pneumonie",
        "en": "Acute viral pneumonia",
        "fa": "پنومونی حاد ویروسی"
      },
      {
        "de": "Diffuse alveoläre Blutung",
        "en": "Diffuse alveolar haemorrhage",
        "fa": "خون‌ریزی منتشر آلوئولی"
      },
      {
        "de": "Organisierende Pneumonie",
        "en": "Organising pneumonia",
        "fa": "پنومونی سازمان‌یابنده"
      },
      {
        "de": "Hydrostatisches Lungenödem",
        "en": "Hydrostatic pulmonary oedema",
        "fa": "ادم هیدروستاتیک ریه"
      }
    ],
    "correct": 3,
    "difficulty": 2,
    "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC3259383/",
    "explanation": {
      "de": "Glatte Septenverdickung, die Verteilung und kardiale/pleurale Begleitzeichen passen mit Orthopnoe und Gewichtszunahme am besten zu hydrostatischem Ödem. Kein Einzelzeichen beweist die Ursache oder den Volumenstatus.",
      "en": "Smooth septal thickening, distribution and cardiac/pleural findings together with orthopnoea and weight gain best support hydrostatic oedema. No single sign proves the cause or volume status.",
      "fa": "ضخیم‌شدگی صاف سپتا، توزیع و یافته‌های قلبی/پلورال همراه ارتوپنه و افزایش وزن بیشتر از ادم هیدروستاتیک حمایت می‌کنند. هیچ نشانهٔ منفردی علت یا وضعیت حجم را ثابت نمی‌کند."
    },
    "wrong": [
      {
        "de": "Virale Pneumonie kann Milchglas verursachen. Die Kombination aus glatten Septen, Kardiomegalie, Ergüssen und Gewichtszunahme priorisiert hier jedoch Ödem.",
        "en": "Viral pneumonia can cause ground glass, but smooth septa, cardiomegaly, effusions and weight gain together prioritise oedema here.",
        "fa": "پنومونی ویروسی می‌تواند شیشه‌مات ایجاد کند؛ ولی مجموع سپتای صاف، کاردیومگالی، افیوژن و افزایش وزن اینجا ادم را در اولویت قرار می‌دهد."
      },
      {
        "de": "Alveoläre Blutung kann ähnlich aussehen und Hämoptysen können fehlen. Die vorliegende Gesamtanamnese und Begleitmorphologie stützen stärker hydrostatisches Ödem.",
        "en": "Alveolar haemorrhage can look similar and haemoptysis may be absent. The combined history and associated morphology here better support hydrostatic oedema.",
        "fa": "خون‌ریزی آلوئولی ممکن است مشابه باشد و هموپتیزی نیز می‌تواند غایب باشد. مجموع شرح‌حال و مورفولوژی همراه اینجا بیشتر از ادم هیدروستاتیک حمایت می‌کند."
      },
      {
        "de": "Organisierende Pneumonie kann periphere oder peribronchiale Verdichtungen zeigen. Die kardial-pleurale Konstellation mit Gewichtszunahme priorisiert hier einen hydrostatischen Mechanismus.",
        "en": "Organising pneumonia can show peripheral or peribronchial opacity. The cardiac/pleural constellation with weight gain prioritises a hydrostatic mechanism here.",
        "fa": "پنومونی سازمان‌یابنده می‌تواند کدورت محیطی یا اطراف برونش نشان دهد. مجموعهٔ قلبی/پلورال همراه افزایش وزن اینجا مکانیسم هیدروستاتیک را در اولویت قرار می‌دهد."
      },
      null
    ],
    "front": {
      "de": "Welche Kombination stützt ein hydrostatisches Lungenödem im CT?",
      "en": "Which combination supports hydrostatic pulmonary oedema on CT?",
      "fa": "کدام مجموعه از ادم هیدروستاتیک ریه در CT حمایت می‌کند؟"
    },
    "answer": {
      "de": "Glatte Septenverdickung, perihilär/basal betontes Milchglas und passende kardiale/pleurale Begleitzeichen mit entsprechender Klinik; kein Einzelzeichen genügt.",
      "en": "Smooth septal thickening, perihilar/basal ground glass and compatible cardiac/pleural signs with matching clinical context; no single sign suffices.",
      "fa": "ضخیم‌شدگی صاف سپتا، شیشه‌مات غالب اطراف ناف/قاعده و نشانه‌های قلبی/پلورال متناسب با زمینهٔ بالینی؛ یک نشانه کافی نیست."
    }
  },
  "hrct-dichteanhebung-09": {
    "question": {
      "de": "In einer dichten pulmonalen Verdichtung sind die Gefäßkonturen verdeckt; eine Luftbronchogrammzeichnung bleibt erkennbar. Welcher Mechanismus erklärt das Muster am besten?",
      "en": "Vascular margins are obscured within a dense pulmonary opacity while air bronchograms remain visible. Which mechanism best explains the pattern?",
      "fa": "در کدورت متراکم ریوی، حاشیهٔ عروق محو ولی برونکوگرام هوایی قابل‌مشاهده است. کدام مکانیسم الگو را بهتر توضیح می‌دهد؟"
    },
    "options": [
      {
        "de": "Weitgehender Ersatz alveolärer Luft durch Flüssigkeit, Zellen oder anderes Material.",
        "en": "Extensive replacement of alveolar air by fluid, cells or other material.",
        "fa": "جایگزینی گستردهٔ هوای آلوئولی با مایع، سلول یا مواد دیگر."
      },
      {
        "de": "Überblähung mit Verlust alveolärer Septen.",
        "en": "Hyperinflation with loss of alveolar septa.",
        "fa": "اتساع بیش‌ازحد همراه ازبین‌رفتن سپتاهای آلوئولی."
      },
      {
        "de": "Isolierte Erweiterung luftgefüllter Bronchien.",
        "en": "Isolated dilatation of air-filled bronchi.",
        "fa": "اتساع منفرد برونش‌های هوادار."
      },
      {
        "de": "Isolierte Verdickung interlobulärer Septen bei belüfteten Alveolen.",
        "en": "Isolated interlobular septal thickening with aerated alveoli.",
        "fa": "ضخیم‌شدگی منفرد سپتاهای بین‌لوبولی با آلوئول‌های هوادار."
      }
    ],
    "correct": 0,
    "difficulty": 2,
    "source": "https://doi.org/10.1148/radiol.232558",
    "explanation": {
      "de": "Das beschreibt Konsolidierung. Luftgefüllte Bronchien können innerhalb der verdichteten, luftarmen Umgebung sichtbar bleiben. Das Muster bestimmt weder Erreger noch Zelltyp.",
      "en": "This describes consolidation. Air-filled bronchi can remain visible within the dense, poorly aerated surroundings. The pattern determines neither pathogen nor cell type.",
      "fa": "این توصیف کنسولیدیشن است. برونش‌های هوادار ممکن است در محیط متراکم و کم‌هوای اطراف دیده شوند. الگو نه عامل عفونی و نه نوع سلول را تعیین می‌کند."
    },
    "wrong": [
      null,
      {
        "de": "Überblähung und Septenverlust führen eher zur Dichteminderung, nicht zum beschriebenen dichten Alveolarmuster.",
        "en": "Hyperinflation and septal loss tend to lower attenuation rather than produce this dense air-space pattern.",
        "fa": "اتساع بیش‌ازحد و ازبین‌رفتن سپتا بیشتر دانسیته را کم می‌کنند، نه الگوی متراکم فضای هوایی توصیف‌شده را."
      },
      {
        "de": "Bronchusdilatation erklärt die dichte Umgebung und verdeckten Gefäßränder nicht.",
        "en": "Bronchial dilatation does not explain the dense surrounding opacity and obscured vessel margins.",
        "fa": "اتساع برونش، کدورت متراکم اطراف و محوشدن حاشیهٔ عروق را توضیح نمی‌دهد."
      },
      {
        "de": "Ein isoliertes Septenmuster erzeugt lineare Strukturen; hier ist eine flächige Dichte mit verdeckten Gefäßkonturen beschrieben.",
        "en": "An isolated septal pattern produces lines; the described opacity is confluent and obscures vessel margins.",
        "fa": "الگوی منفرد سپتایی خطوط ایجاد می‌کند؛ کدورت توصیف‌شده به‌هم‌پیوسته است و حاشیهٔ عروق را می‌پوشاند."
      }
    ],
    "front": {
      "de": "Was beschreibt Konsolidierung, und was kann man daraus nicht bestimmen?",
      "en": "What does consolidation describe, and what cannot be determined from it?",
      "fa": "کنسولیدیشن چه چیزی را توصیف می‌کند و چه چیزی از آن تعیین نمی‌شود؟"
    },
    "answer": {
      "de": "Dichte Alveolenfüllung mit verdeckten Gefäßrändern; Luftbronchogramme können bleiben. Ursache, Erreger oder Histologie sind damit nicht festgelegt.",
      "en": "Dense alveolar filling obscuring vascular margins; air bronchograms may persist. Cause, pathogen and histology remain undetermined.",
      "fa": "پرشدگی متراکم آلوئولی با محوشدن حاشیهٔ عروق؛ برونکوگرام هوایی ممکن است باقی بماند. علت، عامل عفونی و بافت‌شناسی تعیین نمی‌شوند."
    }
  },
  "hrct-dichteanhebung-10": {
    "question": {
      "de": "Bei akuter Lungenembolie liegt im Versorgungsgebiet eines verschlossenen Segmentgefäßes eine pleurabasierte keilförmige Verdichtung. Welche Einordnung berücksichtigt Kontext und Aussagegrenze?",
      "en": "In acute pulmonary embolism, a pleural-based wedge-shaped opacity lies in the territory of an occluded segmental vessel. Which interpretation respects the context and imaging limit?",
      "fa": "در آمبولی حاد ریه، کدورت گوه‌ای با قاعدهٔ پلورال در قلمرو رگ سگمنتال مسدود دیده می‌شود. کدام تفسیر، زمینه و محدودیت تصویربرداری را رعایت می‌کند؟"
    },
    "options": [
      {
        "de": "Postobstruktive Verdichtung hinter einem verschlossenen Bronchus.",
        "en": "Post-obstructive opacity distal to an occluded bronchus.",
        "fa": "کدورت پس‌انسدادی در دیستال برونش مسدود."
      },
      {
        "de": "Embolieassoziierte Parenchymreaktion; Ödem/Blutung sind möglich, Nekrose ist damit nicht bewiesen.",
        "en": "Embolism-associated parenchymal reaction; oedema/haemorrhage are possible and necrosis is not established.",
        "fa": "واکنش پارانشیمی مرتبط با آمبولی؛ ادم/خون‌ریزی ممکن‌اند و نکروز اثبات نمی‌شود."
      },
      {
        "de": "Fokale organisierende Pneumonie als wahrscheinlich unabhängiger Zweitbefund.",
        "en": "Focal organising pneumonia as a likely independent second finding.",
        "fa": "پنومونی سازمان‌یابندهٔ کانونی به‌عنوان یافتهٔ دوم احتمالاً مستقل."
      },
      {
        "de": "Rundatelektase durch pleurale Einfaltung als führende Erklärung.",
        "en": "Rounded atelectasis from pleural folding as the leading explanation.",
        "fa": "آتلکتازی گرد ناشی از تاخوردگی پلور به‌عنوان توضیح اصلی."
      }
    ],
    "correct": 1,
    "difficulty": 2,
    "source": "https://doi.org/10.1148/radiol.232558",
    "explanation": {
      "de": "Die passende Gefäßterritorialität stützt eine embolieassoziierte Verdichtung, häufig als Infarkt bezeichnet. Akute Veränderungen können aus Ödem und Blutung ohne Nekrose bestehen; die CT-Morphologie beweist keinen Gewebsuntergang.",
      "en": "Matching vascular territory supports an embolism-associated opacity, often termed infarction. Acute changes may consist of oedema and haemorrhage without necrosis; CT morphology does not prove tissue death.",
      "fa": "تطابق قلمرو عروقی از کدورت مرتبط با آمبولی حمایت می‌کند که اغلب انفارکت نامیده می‌شود. تغییرات حاد ممکن است ادم و خون‌ریزی بدون نکروز باشند؛ مورفولوژی CT مرگ بافتی را ثابت نمی‌کند."
    },
    "wrong": [
      {
        "de": "Es ist ein Segmentgefäß und kein Bronchus verschlossen; Zeichen einer bronchialen Obstruktion sind nicht beschrieben.",
        "en": "A segmental vessel, not a bronchus, is occluded; signs of bronchial obstruction are not described.",
        "fa": "رگ سگمنتال مسدود است، نه برونش؛ نشانهٔ انسداد برونشی توصیف نشده است."
      },
      null,
      {
        "de": "Organisierende Pneumonie kann periphere Verdichtungen zeigen; hier ist die Beziehung zum akut verschlossenen versorgenden Gefäß die entscheidende Zusatzinformation.",
        "en": "Organising pneumonia can cause peripheral opacity, but the acutely occluded supplying vessel is the decisive contextual clue here.",
        "fa": "پنومونی سازمان‌یابنده می‌تواند کدورت محیطی ایجاد کند؛ اینجا ارتباط با رگ تغذیه‌کنندهٔ تازه‌مسدود، سرنخ تعیین‌کننده است."
      },
      {
        "de": "Pleuraschwiele, lokale Volumenminderung und einziehende bronchovaskuläre Strukturen sind nicht angegeben; die akute Gefäßterritorialität spricht für einen anderen Mechanismus.",
        "en": "Pleural scarring, local volume loss and converging bronchovascular structures are not given; the acute vascular territory favours another mechanism.",
        "fa": "اسکار پلور، کاهش حجم موضعی و ساختارهای برونکوواسکولار همگرا ذکر نشده‌اند؛ قلمرو عروقی حاد مکانیسم دیگری را مطرح می‌کند."
      }
    ],
    "front": {
      "de": "Beweist die keilförmige Verdichtung bei akuter Lungenembolie einen nekrotischen Infarkt?",
      "en": "Does a wedge-shaped opacity in acute pulmonary embolism prove a necrotic infarct?",
      "fa": "آیا کدورت گوه‌ای در آمبولی حاد ریه انفارکت نکروتیک را ثابت می‌کند؟"
    },
    "answer": {
      "de": "Nein. Im passenden Gefäßgebiet ist eine embolieassoziierte Reaktion plausibel; Ödem und Blutung können ohne Nekrose auftreten.",
      "en": "No. In the matching vascular territory an embolism-associated reaction is plausible; oedema and haemorrhage can occur without necrosis.",
      "fa": "خیر. در قلمرو عروقی مطابق، واکنش مرتبط با آمبولی محتمل است؛ ادم و خون‌ریزی ممکن است بدون نکروز رخ دهند."
    }
  },
  "hrct-dichteanhebung-11": {
    "question": {
      "de": "Innerhalb einer Konsolidierung ziehen sich verzweigte luftgefüllte Strukturen in Kontinuität zu den proximalen Bronchien. Welcher Begriff beschreibt sie?",
      "en": "Branching air-filled structures within consolidation are continuous with proximal bronchi. Which term describes them?",
      "fa": "ساختارهای منشعب هوادار داخل کنسولیدیشن با برونش‌های پروگزیمال پیوستگی دارند. کدام اصطلاح آن‌ها را توصیف می‌کند؟"
    },
    "options": [
      {
        "de": "Tree-in-bud-Muster",
        "en": "Tree-in-bud pattern",
        "fa": "الگوی درخت در جوانه"
      },
      {
        "de": "Luftsichelzeichen",
        "en": "Air crescent sign",
        "fa": "علامت هلال هوا"
      },
      {
        "de": "Luftbronchogramm",
        "en": "Air bronchogram",
        "fa": "برونکوگرام هوایی"
      },
      {
        "de": "Honigwabenmuster",
        "en": "Honeycombing",
        "fa": "الگوی هانی‌کومبینگ"
      }
    ],
    "correct": 2,
    "difficulty": 1,
    "source": "https://doi.org/10.1148/radiol.232558",
    "explanation": {
      "de": "Ein Luftbronchogramm stellt lufthaltige Atemwege in luftarmem Parenchym dar. Es impliziert proximale Durchgängigkeit; es beweist weder bakterielle Pneumonie noch schließt es Atelektase aus.",
      "en": "An air bronchogram depicts air-filled airways within poorly aerated parenchyma. It implies proximal patency; it neither proves bacterial pneumonia nor excludes atelectasis.",
      "fa": "برونکوگرام هوایی راه‌های هوایی حاوی هوا را در پارانشیم کم‌هوا نشان می‌دهد و بر بازبودن مسیر پروگزیمال دلالت دارد؛ نه پنومونی باکتریایی را ثابت و نه آتلکتازی را رد می‌کند."
    },
    "wrong": [
      {
        "de": "Tree-in-bud beschreibt zentrilobuläre verzweigte kleine Verdichtungen, nicht die hier sichtbaren luftgefüllten größeren Atemwege.",
        "en": "Tree-in-bud describes small branching centrilobular opacities, rather than the visible air-filled larger airways here.",
        "fa": "درخت در جوانه، کدورت‌های کوچک منشعب سنترلوبولار را توصیف می‌کند، نه راه‌های هوایی بزرگ‌تر و هوادار اینجا."
      },
      {
        "de": "Eine Luftsichel liegt zwischen Höhlenwand und intrakavitärem Material; sie ist kein verzweigter Bronchialbaum.",
        "en": "An air crescent lies between a cavity wall and intracavitary material, rather than forming a branching bronchial tree.",
        "fa": "هلال هوا میان دیوارهٔ حفره و مادهٔ داخل آن قرار دارد و درخت برونشی منشعب نیست."
      },
      null,
      {
        "de": "Honeycombing beschreibt zystische Räume mit Fibrosezeichen, nicht lufthaltige Bronchien innerhalb einer Konsolidierung.",
        "en": "Honeycombing describes cystic spaces with fibrotic signs rather than air-filled bronchi within consolidation.",
        "fa": "هانی‌کومبینگ فضاهای کیستیک با نشانه‌های فیبروز را توصیف می‌کند، نه برونش هوادار داخل کنسولیدیشن."
      }
    ],
    "front": {
      "de": "Was bedeutet ein Luftbronchogramm, und legt es die Ursache fest?",
      "en": "What does an air bronchogram mean, and does it establish the cause?",
      "fa": "برونکوگرام هوایی چه مفهومی دارد و آیا علت را تعیین می‌کند؟"
    },
    "answer": {
      "de": "Luftgefüllte Atemwege in luftarmem Parenchym mit proximaler Durchgängigkeit. Kein alleiniger Beweis bakterieller Infektion und kein Ausschluss einer Atelektase.",
      "en": "Air-filled airways in poorly aerated parenchyma with proximal patency. It does not alone prove bacterial infection or exclude atelectasis.",
      "fa": "راه هوایی حاوی هوا در پارانشیم کم‌هوا با بازبودن مسیر پروگزیمال؛ به‌تنهایی عفونت باکتریایی را ثابت یا آتلکتازی را رد نمی‌کند."
    }
  },
  "hrct-dichteanhebung-12": {
    "question": {
      "de": "Ein kleiner Nodulus erscheint auf einer neu angefertigten dünneren CT-Rekonstruktion geringfügig größer als auf einer alten dicken Serie mit anderem Kernel. Was ist der sinnvollste erste Vergleichsschritt?",
      "en": "A small nodule appears slightly larger on a newly acquired thinner CT reconstruction than on an older thick-section series using a different kernel. What is the most useful first comparison step?",
      "fa": "ندول کوچک در بازسازی CT جدید و نازک‌تر کمی بزرگ‌تر از سری قدیمی ضخیم با کرنل متفاوت دیده می‌شود. مناسب‌ترین گام نخست مقایسه چیست؟"
    },
    "options": [
      {
        "de": "Den Unterschied ausschließlich aus der Zahl betroffener axialer Schichten bestimmen.",
        "en": "Determine the difference solely from the number of involved axial slices.",
        "fa": "اختلاف را فقط از تعداد برش‌های محوری درگیر تعیین کنید."
      },
      {
        "de": "Nur den jeweils maximalen angezeigten Durchmesser übernehmen.",
        "en": "Use only the maximum displayed diameter from each series.",
        "fa": "فقط بیشترین قطر نمایش‌داده‌شدهٔ هر سری را ثبت کنید."
      },
      {
        "de": "Die Durchmesser allein nach dem Inspirationsvolumen proportional korrigieren.",
        "en": "Correct diameters proportionally using inspiratory volume alone.",
        "fa": "قطرها را فقط متناسب با حجم دم اصلاح کنید."
      },
      {
        "de": "Vorhandene vergleichbare dünne Rekonstruktionen mit ähnlichem Kernel und Messverfahren heranziehen.",
        "en": "Use available comparable thin-section reconstructions with a similar kernel and measurement method.",
        "fa": "از بازسازی‌های نازک موجود و قابل‌مقایسه با کرنل و روش اندازه‌گیری مشابه استفاده کنید."
      }
    ],
    "correct": 3,
    "difficulty": 2,
    "source": "https://doi.org/10.1148/radiol.2017161659",
    "explanation": {
      "de": "Technische Unterschiede, besonders Schichtdicke und Rekonstruktionsfilter, beeinflussen die Vergleichbarkeit. Möglichst vergleichbare vorhandene Serien und dasselbe Messverfahren verwenden; Unsicherheit dokumentieren, wenn diese fehlen. Keine automatische neue CT allein aus der Frage ableiten.",
      "en": "Technical differences, especially section thickness and reconstruction filter, affect comparability. Use comparable available series and the same measurement method where possible; document uncertainty if unavailable. This question does not automatically require a new CT.",
      "fa": "تفاوت‌های فنی، به‌ویژه ضخامت برش و فیلتر بازسازی، بر قابلیت مقایسه اثر می‌گذارند. در حد امکان از سری‌های موجود قابل‌مقایسه و روش اندازه‌گیری یکسان استفاده و در نبود آن‌ها عدم قطعیت را ثبت کنید. این سؤال خودبه‌خود به‌معنای CT جدید نیست."
    },
    "wrong": [
      {
        "de": "Die Zahl betroffener Schichten hängt selbst von Schichtdicke und Rekonstruktion ab; sie ist hier kein unabhängiger Größenmaßstab.",
        "en": "The number of involved slices itself depends on section thickness and reconstruction and is not an independent size measure here.",
        "fa": "تعداد برش‌های درگیر خود به ضخامت و بازسازی وابسته است و اینجا معیار مستقل اندازه نیست."
      },
      {
        "de": "Zwei maximale Werte aus technisch unterschiedlichen Serien können einen scheinbaren Unterschied erzeugen; zuerst die Vergleichbarkeit prüfen.",
        "en": "Two maximum values from technically different series can produce an apparent difference; first check comparability.",
        "fa": "دو مقدار بیشینه از سری‌های فنی متفاوت می‌توانند اختلاف ظاهری بسازند؛ ابتدا قابلیت مقایسه بررسی شود."
      },
      {
        "de": "Eine pauschale proportionale Korrektur ersetzt keine vergleichbaren Rekonstruktionen und standardisierte Messung.",
        "en": "A blanket proportional correction does not replace comparable reconstructions and standardised measurement.",
        "fa": "اصلاح تناسبی کلی جای بازسازی قابل‌مقایسه و اندازه‌گیری استاندارد را نمی‌گیرد."
      },
      null
    ],
    "front": {
      "de": "Welche technischen Angaben sind für den CT-Größenvergleich eines Nodulus besonders wichtig?",
      "en": "Which technical parameters particularly matter for CT nodule size comparison?",
      "fa": "کدام پارامترهای فنی برای مقایسهٔ اندازهٔ ندول در CT اهمیت ویژه دارند؟"
    },
    "answer": {
      "de": "Vergleichbare Schichtdicke und Rekonstruktionsfilter sowie konsistente Messmethode; scheinbare kleine Unterschiede bei ungleichen Serien nicht vorschnell als Wachstum werten.",
      "en": "Comparable section thickness and reconstruction filter plus a consistent measurement method; do not hastily label small apparent differences between dissimilar series as growth.",
      "fa": "ضخامت برش و فیلتر بازسازی قابل‌مقایسه و روش اندازه‌گیری ثابت؛ اختلاف کوچک ظاهری میان سری‌های نامشابه را عجولانه رشد ننامید."
    }
  }
}
export const HRCT_INCREASED_DENSITY_EXTRA_CARDS=[
  {
    "id": "hrct-dichteanhebung-fc-13",
    "front": {
      "de": "Wie wird „Infiltrat“ in einer präzisen CT-Beschreibung ersetzt?",
      "en": "How is “infiltrate” replaced in a precise CT description?",
      "fa": "«اینفیلتراسیون» را در توصیف دقیق CT چگونه جایگزین کنیم؟"
    },
    "answer": {
      "de": "Morphologie, Verteilung und Begleitzeichen benennen: etwa Milchglas/Konsolidierung, basal-peripher, mit/ohne Volumenverlust.",
      "en": "State morphology, distribution and associated findings: for example ground glass/consolidation, basal peripheral location and presence/absence of volume loss.",
      "fa": "مورفولوژی، توزیع و یافته‌های همراه را بیان کنید؛ مانند شیشه‌مات/کنسولیدیشن، موقعیت محیطی قاعده‌ای و وجود/نبود کاهش حجم."
    },
    "explanation": {
      "de": "Die morphologische Beschreibung setzt die Ursache nicht voraus; Infektion, Ödem oder andere Ursachen werden separat im Kontext gewichtet.",
      "en": "Morphological description does not presuppose a cause; weigh infection, oedema or other causes separately in context.",
      "fa": "توصیف مورفولوژیک علت را پیش‌فرض نمی‌گیرد؛ عفونت، ادم یا علت‌های دیگر جداگانه با زمینه سنجیده می‌شوند."
    },
    "source": "https://doi.org/10.1148/radiol.232558"
  },
  {
    "id": "hrct-dichteanhebung-fc-14",
    "front": {
      "de": "Beweist ein Luftbronchogramm eine bakterielle Pneumonie?",
      "en": "Does an air bronchogram prove bacterial pneumonia?",
      "fa": "آیا برونکوگرام هوایی پنومونی باکتریایی را ثابت می‌کند؟"
    },
    "answer": {
      "de": "Nein. Es beschreibt lufthaltige Atemwege in luftarmem Parenchym; auch andere alveoläre Prozesse oder Atelektase sind möglich.",
      "en": "No. It describes air-filled airways in poorly aerated parenchyma; other air-space processes or atelectasis are possible.",
      "fa": "خیر. راه‌های هوایی حاوی هوا را در پارانشیم کم‌هوا توصیف می‌کند؛ فرآیندهای آلوئولی دیگر یا آتلکتازی نیز ممکن‌اند."
    },
    "explanation": {
      "de": "Ein Luftbronchogramm stellt lufthaltige Atemwege in luftarmem Parenchym dar. Es impliziert proximale Durchgängigkeit; es beweist weder bakterielle Pneumonie noch schließt es Atelektase aus.",
      "en": "An air bronchogram depicts air-filled airways within poorly aerated parenchyma. It implies proximal patency; it neither proves bacterial pneumonia nor excludes atelectasis.",
      "fa": "برونکوگرام هوایی راه‌های هوایی حاوی هوا را در پارانشیم کم‌هوا نشان می‌دهد و بر بازبودن مسیر پروگزیمال دلالت دارد؛ نه پنومونی باکتریایی را ثابت و نه آتلکتازی را رد می‌کند."
    },
    "source": "https://doi.org/10.1148/radiol.232558"
  },
  {
    "id": "hrct-dichteanhebung-fc-15",
    "front": {
      "de": "Welche Zusatzbeurteilung ist bei pleuranaher Rundverdichtung besonders wichtig?",
      "en": "Which additional assessment matters particularly for a pleural-based rounded opacity?",
      "fa": "در کدورت گرد مجاور پلور، کدام ارزیابی تکمیلی اهمیت ویژه دارد؟"
    },
    "answer": {
      "de": "Pleura, lokale Volumenminderung und einziehende bronchovaskuläre Strukturen mit Morphologie und Verlauf kombinieren.",
      "en": "Combine pleural findings, local volume loss and converging bronchovascular structures with morphology and interval change.",
      "fa": "یافته‌های پلور، کاهش حجم موضعی و ساختارهای برونکوواسکولار همگرا را با مورفولوژی و تغییرات زمانی ترکیب کنید."
    },
    "explanation": {
      "de": "Pleuraveränderung, angrenzende Verdichtung, Volumenverlust und einziehende bronchovaskuläre Strukturen bilden die charakteristische Rundatelektase-Konstellation. Ein Einzelzeichen allein ersetzt keine Gesamtbeurteilung/Vorvergleiche.",
      "en": "Pleural change, adjacent opacity, volume loss and entering bronchovascular structures form the characteristic rounded-atelectasis constellation. A single sign does not replace overall assessment/prior comparison.",
      "fa": "تغییرات پلور، کدورت مجاور، کاهش حجم و ساختارهای برونکوواسکولار واردشونده مجموعهٔ مشخصهٔ آتلکتازی گرد را می‌سازند. یک نشانه جای ارزیابی کلی/مقایسه با تصاویر قبلی را نمی‌گیرد."
    },
    "source": "https://pubmed.ncbi.nlm.nih.gov/3186982/"
  }
]
