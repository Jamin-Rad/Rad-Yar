// Scoped assessments; only reviewed entries are registered in the shared bank.
import { ADRENAL_QUESTION_DRAFTS } from './abdomenAdrenalLessonMaterials'
const L = (de, en, fa) => ({ de, en, fa })
const item = (source, question, options, answer, rationale) => ({ source, question, options, answer, rationale })

export const abdomenThoraxAssessmentDrafts = {
  'thorax-lung-segmental-anatomy': item('Thorax.pdf physical p.7 (printed p.6); Siddharthan et al., J Appl Clin Med Phys. 2025; doi:10.1002/acm2.70193; Pulmonary vascular anatomy & anatomical variants. 2018. PMC6039811', L('Welche Strukturen verlaufen überwiegend intrasegmental und helfen, ein bronchopulmonales Segment zuzuordnen?', 'Which structures run mainly within a bronchopulmonary segment and help localise it?', 'کدام ساختارها عمدتاً درون یک سگمان برونکوپولمونری قرار دارند و به تعیین محل آن کمک می‌کنند؟'), [L('Segmentbronchus und begleitende Pulmonalarterie', 'Segmental bronchus and accompanying pulmonary artery', 'برونش سگمنتال و شریان ریوی همراه'), L('Pulmonalvenen und Lymphbahnen', 'Pulmonary veins and lymphatics', 'وریدهای ریوی و مسیرهای لنفاوی'), L('Interlobuläre Septen und Pleura', 'Interlobular septa and pleura', 'سپتاهای بین‌لوبولی و پلور')], 0, L('Bronchien und begleitende Arterien verlaufen überwiegend intrasegmental; Pulmonalvenen markieren häufig intersegmentale Ebenen. Für die Zuordnung Bronchus und Gefäß über mehrere Schichten verfolgen, nicht eine unsichtbare Segmentgrenze annehmen.', 'Bronchi and accompanying arteries run mainly within segments; pulmonary veins often mark intersegmental planes. Trace the bronchus and vessel across slices rather than assuming an invisible segment boundary.', 'برونش‌ها و شریان‌های همراه عمدتاً درون سگمان‌اند و وریدهای ریوی اغلب صفحات بین‌سگمنتال را نشان می‌دهند. برای تعیین محل، برونش و رگ را در چند برش دنبال کنید و مرز نامرئی سگمان را فرض نکنید.')),
  'hepatic-adenoma-hbp': {
  "question": {
    "de": "Welche häufige Kombination in der hepatobiliären Phase unterstützt im passenden Kontext HCA gegenüber typischer FNH?",
    "en": "Which common hepatobiliary-phase combination supports HCA versus typical FNH in the appropriate context?",
    "fa": "کدام ترکیب شایع در فاز هپاتوبیلیاری، در زمینهٔ مناسب از HCA در برابر FNH تیپیک حمایت می‌کند؟"
  },
  "options": [
    {
      "de": "HCA hypointens; FNH iso- bis hyperintens",
      "en": "HCA hypointense; FNH iso- to hyperintense",
      "fa": "HCA کم‌سیگنال؛ FNH ایزو تا پرسیگنال"
    },
    {
      "de": "HCA iso- bis hyperintens; FNH hypointens",
      "en": "HCA iso- to hyperintense; FNH hypointense",
      "fa": "HCA ایزو تا پرسیگنال؛ FNH کم‌سیگنال"
    },
    {
      "de": "HCA und FNH beide hypointens",
      "en": "Both HCA and FNH hypointense",
      "fa": "HCA و FNH هر دو کم‌سیگنال"
    },
    {
      "de": "HCA und FNH beide iso- bis hyperintens",
      "en": "Both HCA and FNH iso- to hyperintense",
      "fa": "HCA و FNH هر دو ایزو تا پرسیگنال"
    }
  ],
  "answer": 0,
  "rationale": {
    "de": "Die meisten HCA sind in der HBP hypointens, typische FNH häufig iso- bis hyperintens. Atypische inflammatorische oder β-Catenin-mutierte HCA können Kontrastmittel zurückhalten und ebenfalls iso-/hyperintens sein. Deshalb HBP mit dynamischen Phasen, Morphologie und Kontext kombinieren.",
    "en": "Most HCAs are hypointense on HBP, whereas typical FNH is often iso- to hyperintense. Atypical inflammatory or beta-catenin-mutated HCAs can retain contrast and also appear iso/hyperintense. Combine HBP with dynamic phases, morphology and context.",
    "fa": "بیشتر HCAها در HBP کم‌سیگنال‌اند، در حالی که FNH تیپیک اغلب ایزو تا پرسیگنال است. HCA التهابی آتیپیک یا دارای جهش بتاکاتنین می‌تواند مادهٔ حاجب را نگه دارد و ایزو یا پرسیگنال نیز باشد. بنابراین HBP با فازهای دینامیک، مورفولوژی و زمینه ترکیب شود."
  },
  "source": "https://doi.org/10.14309/ajg.0000000000002857",
  "wrongExplanations": {
    "B": {
      "de": "Dies kehrt die häufige Richtung um. HBP-hyperintense HCA sind eine wichtige Ausnahme und dürfen nicht als typische Gegenregel dienen.",
      "en": "This reverses the common direction. HBP-hyperintense HCAs are an important exception rather than the usual opposite rule.",
      "fa": "این گزینه جهت شایع را معکوس می‌کند. HCA پرسیگنال در HBP استثنای مهمی است، نه قاعدهٔ معمولِ معکوس."
    },
    "C": {
      "de": "Beidseitige Hypointensität liefert nicht die gefragte typische Unterscheidung; FNH hält hepatobiliäres Kontrastmittel häufig zurück. Atypische Fälle bleiben möglich.",
      "en": "Hypointensity in both does not provide the typical distinction asked for; FNH commonly retains hepatobiliary contrast. Atypical cases remain possible.",
      "fa": "کم‌سیگنالی هر دو، افتراق تیپیک مورد سؤال را فراهم نمی‌کند؛ FNH اغلب مادهٔ حاجب هپاتوبیلیاری را نگه می‌دارد. موارد آتیپیک همچنان ممکن‌اند."
    },
    "D": {
      "de": "Iso-/Hyperintensität kann bei beiden vorkommen, etwa bei bestimmten HCA-Subtypen. Sie ist aber nicht das häufige HCA-Muster und beweist keine gemeinsame Diagnose.",
      "en": "Iso/hyperintensity can occur in both, including some HCA subtypes. It is not the common HCA pattern and does not establish a shared diagnosis.",
      "fa": "ایزو یا پرسیگنالی در هر دو، از جمله برخی زیرگروه‌های HCA، ممکن است. اما الگوی شایع HCA نیست و تشخیص مشترک را قطعی نمی‌کند."
    }
  }
},
  'hepatic-adenoma-opposed-phase': {
  "question": {
    "de": "Eine Leberläsion verliert gegenüber der In-phase-Aufnahme homogen Signal auf der passenden Opposed-phase-Aufnahme. Welche Gewebekomponente wird dadurch am ehesten angezeigt?",
    "en": "A liver lesion shows homogeneous signal loss on the appropriate opposed-phase image compared with in-phase imaging. Which tissue component does this most strongly indicate?",
    "fa": "ضایعهٔ کبدی در تصویر مناسب opposed-phase نسبت به in-phase افت سیگنال همگن دارد. این یافته بیشتر نشان‌دهندهٔ کدام جزء بافتی است؟"
  },
  "options": [
    {
      "de": "Mikroskopisch gemischtes Fett und Wasser",
      "en": "Microscopically mixed fat and water",
      "fa": "اختلاط میکروسکوپی چربی و آب"
    },
    {
      "de": "Hämosiderinbedingte Suszeptibilität",
      "en": "Haemosiderin-related susceptibility",
      "fa": "سوسپتیبیلیتی ناشی از هموسیدرین"
    },
    {
      "de": "Met-Hb in einem subakuten Blutungsanteil",
      "en": "MetHb in a subacute haemorrhagic component",
      "fa": "مت‌هموگلوبین در جزء خونریزی زیرحاد"
    },
    {
      "de": "Wasserreiches Ödem ohne Fettanteil",
      "en": "Water-rich oedema without fat",
      "fa": "ادم پرآب بدون چربی"
    }
  ],
  "answer": 0,
  "rationale": {
    "de": "Chemical-shift-Signalabfall passt zu mikroskopischem Fett im wasserhaltigen Gewebe. Bei HCA kann dies die Charakterisierung unterstützen, legt aber weder HCA noch einen molekularen Subtyp allein fest. Blut kann natives T1 ebenfalls aufhellen, ohne dieses Fett-Wasser-Muster zu beweisen.",
    "en": "Chemical-shift signal loss supports microscopic fat in water-containing tissue. In HCA this can aid characterisation but establishes neither HCA nor a molecular subtype alone. Blood can also cause unenhanced T1 hyperintensity without establishing this fat-water pattern.",
    "fa": "افت سیگنال chemical shift از چربی میکروسکوپی در بافت حاوی آب حمایت می‌کند. در HCA می‌تواند به بررسی ویژگی‌ها کمک کند، اما به‌تنهایی HCA یا زیرگروه مولکولی را قطعی نمی‌کند. خون نیز می‌تواند در T1 بدون تزریق پرسیگنال باشد، بدون اینکه این الگوی چربی و آب را ثابت کند."
  },
  "source": "https://doi.org/10.14309/ajg.0000000000002857",
  "wrongExplanations": {
    "B": {
      "de": "Eisenbedingter Signalverlust wird anhand echozeitabhängiger Suszeptibilität beziehungsweise T2*-Verhalten beurteilt; er ist nicht gleichbedeutend mit dem hier beschriebenen Chemical-shift-Fettmuster.",
      "en": "Iron-related signal loss is assessed through echo-time-dependent susceptibility/T2* behaviour; it is not equivalent to the chemical-shift fat pattern described here.",
      "fa": "افت سیگنال ناشی از آهن با سوسپتیبیلیتی وابسته به زمان اکو یا رفتار T2* ارزیابی می‌شود؛ معادل الگوی چربی chemical shift توصیف‌شده نیست."
    },
    "C": {
      "de": "Met-Hb kann natives T1 aufhellen. Daraus folgt jedoch kein typischer Signalabfall durch Fett-Wasser-Auslöschung auf Opposed-phase-Bildern.",
      "en": "MetHb can cause unenhanced T1 hyperintensity but does not thereby produce the typical opposed-phase fat-water cancellation pattern.",
      "fa": "مت‌هموگلوبین می‌تواند T1 بدون تزریق را روشن کند، اما این امر به‌خودی‌خود الگوی تیپیک حذف سیگنال چربی و آب در opposed-phase را ایجاد نمی‌کند."
    },
    "D": {
      "de": "Reines wasserreiches Gewebe erzeugt nicht den typischen Fett-Wasser-Auslöschungseffekt. Ödem wird im Gesamtmuster, besonders auf flüssigkeitssensitiven Sequenzen, beurteilt.",
      "en": "Pure water-rich tissue does not generate the typical fat-water cancellation effect. Assess oedema in the overall pattern, particularly on fluid-sensitive sequences.",
      "fa": "بافت صرفاً پرآب اثر تیپیک حذف سیگنال چربی و آب را ایجاد نمی‌کند. ادم در الگوی کلی و به‌ویژه سکانس‌های حساس به مایع بررسی می‌شود."
    }
  }
},
  'hepatic-adenoma-dynamic-ct': {
  "question": {
    "de": "Welches dynamische Muster ist bei einem HCA mit extrazellulärem Kontrastmittel häufig?",
    "en": "Which dynamic pattern is common in HCA with an extracellular contrast agent?",
    "fa": "کدام الگوی دینامیک در HCA با مادهٔ حاجب خارج‌سلولی شایع است؟"
  },
  "options": [
    {
      "de": "Arterielle Hyperanreicherung mit späterer Angleichung an die Leber",
      "en": "Arterial hyperenhancement with later equalisation to liver",
      "fa": "جذب بیشتر شریانی با هم‌سطح‌شدن بعدی با کبد"
    },
    {
      "de": "Periphere diskontinuierliche Knoten mit zentripetaler Auffüllung",
      "en": "Discontinuous peripheral nodules with centripetal fill-in",
      "fa": "ندول‌های محیطی ناپیوسته با پرشدن مرکزگرا"
    },
    {
      "de": "Progressiv zunehmende späte Kontrastmittelaufnahme bei geringer früher Aufnahme",
      "en": "Progressively increasing delayed enhancement with little early enhancement",
      "fa": "افزایش تدریجی جذب تأخیری با جذب اندک در فاز اولیه"
    },
    {
      "de": "Flüssigkeitsdichte Läsion ohne messbare interne Kontrastmittelaufnahme",
      "en": "Fluid-attenuation lesion without measurable internal enhancement",
      "fa": "ضایعه با دانسیتهٔ مایع بدون جذب قابل‌اندازه‌گیری داخلی"
    }
  ],
  "answer": 0,
  "rationale": {
    "de": "HCA zeigt häufig arterielle Hyperanreicherung und spätere Angleichung. Das Muster ist nicht spezifisch und kann je nach Subtyp, Blutung und Fett variieren. Ein Einzelmuster trennt HCA und HCC nicht zuverlässig; weitere Sequenzen und klinischen Kontext einbeziehen.",
    "en": "HCA commonly shows arterial hyperenhancement followed by equalisation. The pattern is nonspecific and can vary with subtype, haemorrhage and fat. One pattern does not reliably distinguish HCA from HCC; integrate further sequences and clinical context.",
    "fa": "HCA اغلب جذب بیشتر شریانی و سپس هم‌سطح‌شدن نشان می‌دهد. این الگو غیراختصاصی است و با زیرگروه، خونریزی و چربی تغییر می‌کند. یک الگو HCA را به‌طور قابل‌اتکا از HCC جدا نمی‌کند؛ سکانس‌های دیگر و زمینهٔ بالینی نیز لحاظ شوند."
  },
  "source": "https://doi.org/10.14309/ajg.0000000000002857",
  "wrongExplanations": {
    "B": {
      "de": "Dieses peripher-noduläre zentripetale Muster passt eher zu einem typischen Hämangiom als zum gefragten häufigen HCA-Muster.",
      "en": "This peripheral nodular centripetal pattern favours typical haemangioma rather than the common HCA pattern asked for.",
      "fa": "این الگوی ندولی محیطی و مرکزگرا بیشتر با همانژیوم تیپیک سازگار است تا الگوی شایع HCA مورد سؤال."
    },
    "C": {
      "de": "Dieses verzögerte progressive Muster kann bei fibrosereichem Gewebe vorkommen. Es beschreibt nicht die gefragte häufige frühe Hypervaskularität mit späterer Angleichung.",
      "en": "This progressive delayed pattern can occur in fibrous tissue. It does not describe the common early hypervascularity followed by equalisation asked for.",
      "fa": "این الگوی تدریجی تأخیری می‌تواند در بافت غنی از فیبروز دیده شود. توصیف‌کنندهٔ پرعروقی اولیهٔ شایع همراه هم‌سطح‌شدن بعدی مورد سؤال نیست."
    },
    "D": {
      "de": "Flüssigkeitsdichte ohne internes Enhancement passt zu zystischem Inhalt, nicht zum gefragten häufigen Muster eines soliden HCA.",
      "en": "Fluid attenuation without internal enhancement fits cystic contents rather than the common solid-HCA pattern asked for.",
      "fa": "دانسیتهٔ مایع بدون جذب داخلی با محتوای کیستیک سازگار است، نه الگوی شایع HCA توپر مورد سؤال."
    }
  }
},
  'hepatic-adenoma-caveat': {
  "question": {
    "de": "Eine technisch ausreichende multiphasische MRT lässt eine atypische hepatozelluläre Läsion zwischen HCA und HCC unklar. Welche weitere Strategie passt am ehesten zu dieser diagnostischen Unsicherheit?",
    "en": "Technically adequate multiphasic MRI leaves an atypical hepatocellular lesion indeterminate between HCA and HCC. Which further strategy best addresses this diagnostic uncertainty?",
    "fa": "MRI چندفازی با کیفیت فنی کافی، ضایعهٔ هپاتوسلولار آتیپیک را بین HCA و HCC نامشخص باقی می‌گذارد. کدام راهبرد بعدی مناسب‌تر به این عدم قطعیت تشخیصی می‌پردازد؟"
  },
  "options": [
    {
      "de": "Interdisziplinäre Leberkonferenz und je nach Fragestellung gezielte Gewebeabklärung erwägen",
      "en": "Multidisciplinary liver review and consideration of targeted tissue diagnosis according to the question",
      "fa": "بررسی در تیم چندتخصصی کبد و درنظرگرفتن بررسی هدفمند بافت بر پایهٔ پرسش بالینی"
    },
    {
      "de": "Eine ergänzende hepatobiliäre Kontrastphase durchführen",
      "en": "Acquire an additional hepatobiliary contrast phase",
      "fa": "انجام فاز تکمیلی با مادهٔ حاجب هپاتوبیلیاری"
    },
    {
      "de": "CEUS zur zusätzlichen Beurteilung der Kontrastdynamik ergänzen",
      "en": "Add CEUS to further assess enhancement dynamics",
      "fa": "افزودن CEUS برای ارزیابی تکمیلی دینامیک مادهٔ حاجب"
    },
    {
      "de": "Eine kurzfristige MRT-Verlaufskontrolle ohne vorherige Fallkonferenz planen",
      "en": "Plan short-interval MRI follow-up before case conference",
      "fa": "برنامه‌ریزی MRI پیگیری کوتاه‌مدت پیش از بررسی در تیم"
    }
  ],
  "answer": 0,
  "rationale": {
    "de": "MRT kann insbesondere HNF-1α- und inflammatorische HCA nahelegen; bestimmte Subtypen und HCC können bildgebend überlappen. Bei unklarer atypischer Läsion interdisziplinär diskutieren und gezielte Biopsie erwägen. Weder eine zusätzliche Einzelphase noch CEUS beweisen zuverlässig den molekularen Subtyp.",
    "en": "MRI can suggest particularly HNF1A and inflammatory HCA, but some subtypes and HCC overlap on imaging. Discuss an indeterminate atypical lesion multidisciplinary and consider targeted biopsy. Neither an additional single phase nor CEUS reliably establishes molecular subtype.",
    "fa": "MRI به‌ویژه می‌تواند HCA وابسته به HNF1A و نوع التهابی را مطرح کند، اما برخی زیرگروه‌ها و HCC در تصویربرداری هم‌پوشانی دارند. ضایعهٔ آتیپیک نامشخص در تیم چندتخصصی بررسی و بیوپسی هدفمند در نظر گرفته شود. نه یک فاز تکمیلی منفرد و نه CEUS، زیرگروه مولکولی را به‌طور قابل‌اتکا قطعی نمی‌کند."
  },
  "source": "https://doi.org/10.14309/ajg.0000000000002857",
  "wrongExplanations": {
    "B": {
      "de": "HBP kann ergänzen, wenn sie fehlt. Sie löst jedoch nicht zuverlässig die HCA/HCC-Unsicherheit oder molekulare Subtypisierung; bei bereits ausreichender atypischer Untersuchung ist die gezielte interdisziplinäre Entscheidung vorrangig.",
      "en": "HBP can complement a study when absent. It does not reliably resolve HCA/HCC uncertainty or molecular subtyping; with an already adequate atypical study, targeted multidisciplinary decision-making takes priority.",
      "fa": "HBP در صورت انجام‌نشدن می‌تواند بررسی را تکمیل کند. اما عدم قطعیت HCA/HCC یا تعیین زیرگروه مولکولی را به‌طور قابل‌اتکا حل نمی‌کند؛ در بررسی کافی ولی آتیپیک، تصمیم‌گیری هدفمند چندتخصصی اولویت دارد."
    },
    "C": {
      "de": "CEUS kann die Charakterisierung ergänzen, subtypisiert HCA aber nicht zuverlässig. Die schon ausreichende MRT mit verbliebener HCA/HCC-Unsicherheit verlangt zunächst eine abgestimmte diagnostische Strategie.",
      "en": "CEUS may complement characterisation but does not reliably subtype HCA. An already adequate MRI with persistent HCA/HCC uncertainty first warrants a coordinated diagnostic strategy.",
      "fa": "CEUS می‌تواند بررسی ویژگی‌ها را تکمیل کند، اما زیرگروه HCA را به‌طور قابل‌اتکا تعیین نمی‌کند. MRI کافی با عدم قطعیت باقی‌مانده HCA/HCC، ابتدا به راهبرد تشخیصی هماهنگ نیاز دارد."
    },
    "D": {
      "de": "Verlauf kann je nach interdisziplinärer Einschätzung sinnvoll sein. Ihn vorab als Standardweg festzulegen, klärt die atypische potenziell maligne Läsion nicht angemessen; Bedarf und Art der Gewebeabklärung zuerst diskutieren.",
      "en": "Follow-up may be appropriate after multidisciplinary assessment. Assigning it beforehand as the default does not adequately address an atypical potentially malignant lesion; first discuss the need and method of tissue evaluation.",
      "fa": "پیگیری پس از ارزیابی چندتخصصی می‌تواند مناسب باشد. تعیین پیشاپیش آن به‌عنوان مسیر پیش‌فرض، ضایعهٔ آتیپیک با احتمال بدخیمی را کافی بررسی نمی‌کند؛ ابتدا نیاز و روش بررسی بافت مطرح شود."
    }
  }
},
  ...Object.fromEntries(ADRENAL_QUESTION_DRAFTS.map(draft => [draft.id, item(draft.source, draft.question, draft.options, draft.answer, draft.rationale)])),
  'abdomen-renal-anatomy': item('Abdomen.pdf, physical pp.44–45 / printed pp.43–44; Kamo et al., Jpn J Radiol. 2021;39:407–413, doi:10.1007/s11604-020-01080-7; Eisner et al., J Urol. 2009;182:165–168, doi:10.1016/j.juro.2009.02.131', L('Welche radiologische Einordnung der klassisch beschriebenen Überkreuzung des Ureters mit den Iliakalgefäßen ist korrekt?', 'Which radiological interpretation of the classically described ureteric crossing of the iliac vessels is correct?', 'کدام تفسیر تصویربرداری از محل کلاسیک عبور حالب از عروق ایلیاک درست است؟'), [L('Anatomische Landmarke, aber nicht als häufige Steinimpaktionsstelle belegt.', 'Anatomical landmark, but not established as a common stone-impaction site.', 'یک نشانه آناتومیک است، اما محل شایع گیرکردن سنگ بودن آن ثابت نشده است.'), L('Einer der zwei häufigsten Steinimpaktionsorte.', 'One of the two most common stone-impaction sites.', 'یکی از دو محل شایع گیرکردن سنگ.'), L('Die Lage des Steins beweist unabhängig von den übrigen Zeichen eine Obstruktion.', 'The stone location proves obstruction regardless of other findings.', 'محل سنگ، مستقل از سایر یافته‌ها، انسداد را ثابت می‌کند.')], 0, L('Die Iliakalgefäßkreuzung ist eine klassische anatomische Landmarke. Kamo et al. unterscheiden sie vom nahegelegenen Übergang am oberen Ureter, an dem sich die Beweglichkeit verändert; die CT-Kohorte von Eisner et al. fand 1,1 % der Steine direkt an der Iliakalgefäßkreuzung. Eine Obstruktion wird aus dem Gesamtbefund beurteilt.', 'The iliac-vessel crossing is a classic anatomical landmark. Kamo et al. distinguish it from the nearby upper-ureter transition where mobility changes; the CT cohort by Eisner et al. found 1.1% of stones directly at the iliac crossing. Obstruction is assessed from the complete imaging context.', 'تقاطع عروق ایلیاک نشانه آناتومیک کلاسیک است. Kamo و همکاران آن را از گذار نزدیک در بخش فوقانی حالب که تغییر تحرک رخ می‌دهد جدا می‌کنند؛ در کوهورت CT مقاله Eisner و همکاران، ۱٫۱٪ سنگ‌ها دقیقاً در تقاطع ایلیاک بودند. انسداد باید بر اساس کل یافته‌ها ارزیابی شود.')),
  'abdomen-liver-metastases': item('Abdomen.pdf pp.24–25 (printed pp.23–24)', L('Ein einzelner Leberherd zeigt geringe arterielle Anreicherung und bleibt portalvenös deutlich hypodens. Welche Einordnung passt am besten?', 'A solitary liver lesion shows little arterial enhancement and remains clearly hypoattenuating in the portal venous phase. Which interpretation fits best?', 'یک ضایعهٔ منفرد کبدی تقویت شریانی کمی دارد و در فاز پورت آشکارا کم‌دانسیته می‌ماند. کدام تفسیر مناسب‌تر است؟'), [L('Hypovaskuläres Muster; solitäres Auftreten schließt Metastase nicht aus', 'Hypovascular pattern; solitary presentation does not exclude metastasis', 'الگوی کم‌عروق؛ منفرد بودن، متاستاز را رد نمی‌کند'), L('Hypervaskuläres Muster, da die Läsion portalvenös hypodens ist', 'Hypervascular pattern because the lesion is hypoattenuating portal venously', 'الگوی پرعروق، چون ضایعه در فاز پورت کم‌دانسیته است'), L('Der Primärtumor ist damit sicher kolorektal', 'The primary tumour is therefore certainly colorectal', 'بنابراین منشأ اولیه قطعاً کولورکتال است')], 0, L('Das passt zum im PDF beschriebenen hypovaskulären Muster. Ein einzelner Herd schließt Metastase ausdrücklich nicht aus; die Enhancement-Dynamik identifiziert den Primärtumor nicht allein.', 'This fits the hypovascular pattern described in the PDF. A solitary lesion explicitly does not exclude metastasis; enhancement dynamics alone do not identify the primary tumour.', 'این یافته با الگوی کم‌عروق شرح‌داده‌شده در PDF سازگار است. منفرد بودن ضایعه متاستاز را رد نمی‌کند و رفتار جذب ماده حاجب به‌تنهایی منشأ اولیه را مشخص نمی‌کند.')),
    'abdomen-gist': item('Abdomen.pdf, physical pp.67–68 / printed pp.66–67; GEIS 2023, DOI 10.1177/17588359231192388', L('Welche morphologischen Angaben sollten Sie an der gezeigten Raumforderung zuerst beschreiben?', 'Which morphologic features should you describe first for the illustrated mass?', 'برای توده نشان‌داده‌شده ابتدا کدام ویژگی‌های مورفولوژیک را توصیف می‌کنید؟'), [L('Magenursprung, lobulierte Kontur, Wachstumsrichtung und Binnenstruktur', 'Gastric origin, lobulated contour, growth direction and internal structure', 'منشأ معده، حاشیه لوبوله، جهت رشد و ساختار داخلی'), L('Den histologischen Subtyp und das TNM-Stadium allein aus der CT festlegen', 'Assign histologic subtype and TNM stage from CT alone', 'تعیین زیرگروه بافت‌شناختی و مرحله TNM فقط بر اساس CT'), L('Die Kontrastphase aus der Reihenfolge der drei Abbildungen ableiten', 'Infer contrast phase from the order of the three panels', 'نتیجه‌گیری درباره فاز تزریق از ترتیب سه تصویر')], 0, L('Zuerst werden beobachtbare Morphologie und anatomischer Ursprung beschrieben. Histologie, Stadium und nicht dokumentierte Phasen werden nicht aus diesen Bildern allein abgeleitet.', 'Start by describing observable morphology and anatomic origin. Histology, stage and undocumented phases cannot be inferred from these images alone.', 'ابتدا مورفولوژی قابل مشاهده و منشأ آناتومیک را توصیف کنید. بافت‌شناسی، مرحله و فازهای ثبت‌نشده را نمی‌توان فقط از این تصاویر نتیجه گرفت.')),
  'abdomen-small-bowel-feces': {
  "question": {
    "de": "CT zeigt partikelhaltigen, stuhlähnlichen Inhalt mit Gasbläschen innerhalb einer dilatierten Dünndarmschlinge nahe einem Kaliberwechsel. Welche Interpretation passt?",
    "en": "CT shows particulate faeces-like contents mixed with gas bubbles inside a dilated small-bowel loop near a calibre change. Which interpretation fits?",
    "fa": "CT محتوای ذره‌ای شبیه مدفوع همراه حباب گاز داخل لوپ متسع رودهٔ باریک نزدیک تغییر قطر نشان می‌دهد. کدام تفسیر مناسب است؟"
  },
  "options": [
    {
      "de": "Small-Bowel-Feces-Zeichen; es kann die Suche nach der Übergangszone unterstützen.",
      "en": "Small-bowel feces sign; it can help locate the transition zone.",
      "fa": "علامت مدفوع رودهٔ باریک؛ می‌تواند به یافتن نقطهٔ گذار کمک کند."
    },
    {
      "de": "Pneumatosis intestinalis; das Gas liegt in der Darmwand.",
      "en": "Pneumatosis intestinalis; the gas is within the bowel wall.",
      "fa": "پنوماتوز روده؛ گاز داخل دیوارهٔ روده است."
    },
    {
      "de": "Portalvenöses Gas; die Gasbläschen folgen peripheren Lebergefäßen.",
      "en": "Portal venous gas; bubbles follow peripheral hepatic vessels.",
      "fa": "گاز ورید پورت؛ حباب‌ها از عروق محیطی کبد پیروی می‌کنند."
    },
    {
      "de": "Whirl-Zeichen; die Gasbläschen markieren verdrehte Mesenterialgefäße.",
      "en": "Whirl sign; the bubbles mark twisted mesenteric vessels.",
      "fa": "علامت ویرل؛ حباب‌ها عروق مزانتریک پیچ‌خورده را مشخص می‌کنند."
    }
  ],
  "answer": 0,
  "rationale": {
    "de": "Das Feces-Zeichen ist intraluminal und kann zur Lokalisation der Übergangszone beitragen. In der zitierten Originalkohorte war es kein unabhängiger Prädiktor für Ischämie oder Erfolg konservativer Behandlung.",
    "en": "The feces sign is intraluminal and can help locate the transition zone. In the original cited cohort it did not independently predict ischaemia or successful nonoperative treatment.",
    "fa": "علامت مدفوع داخل لومن است و می‌تواند به یافتن نقطهٔ گذار کمک کند. در کوهورت اصلیِ مورد استناد، پیش‌بینی‌کنندهٔ مستقل ایسکمی یا موفقیت درمان غیرجراحی نبود."
  },
  "source": "https://pubmed.ncbi.nlm.nih.gov/29045179/",
  "wrongExplanations": {
    "B": {
      "de": "Beschrieben ist Darminhalt im Lumen, nicht Gas in der Wand.",
      "en": "The description places the contents in the lumen, not gas within the wall.",
      "fa": "توصیف مربوط به محتویات داخل لومن است، نه گاز داخل دیواره."
    },
    "C": {
      "de": "Die Gasbläschen liegen im Dünndarmlumen, nicht im hepatischen Portalvenensystem.",
      "en": "The bubbles lie within the small-bowel lumen, not the hepatic portal venous system.",
      "fa": "حباب‌ها داخل لومن رودهٔ باریک‌اند، نه سیستم ورید پورت کبد."
    },
    "D": {
      "de": "Ein Whirl betrifft die spiralige Mesenterial-/Gefäßanordnung, nicht stuhlähnlichen Darminhalt.",
      "en": "A whirl concerns spiralling mesenteric/vessel architecture, not faeces-like bowel contents.",
      "fa": "ویرل آرایش مارپیچی مزانتر و عروق است، نه محتوای روده شبیه مدفوع."
    }
  }
},
  'abdomen-ileus-volvulus': {
  "question": {
    "de": "Welche drei Befunde bilden die klassische Rigler-Trias beim Gallensteinileus?",
    "en": "Which three findings form the classic Rigler triad in gallstone ileus?",
    "fa": "کدام سه یافته تریاد کلاسیک ریگلر را در ایلئوس سنگ صفراوی تشکیل می‌دهند؟"
  },
  "options": [
    {
      "de": "Dünndarmobstruktion, Pneumobilie und ektoper Gallenstein",
      "en": "Small-bowel obstruction, pneumobilia and an ectopic gallstone",
      "fa": "انسداد روده باریک، پنوموبیلی و سنگ صفراوی نابجا"
    },
    {
      "de": "Kolondilatation, Aerobilie und Gallenblasenstein",
      "en": "Colonic dilatation, pneumobilia and a gallbladder stone",
      "fa": "اتساع کولون، پنوموبیلی و سنگ داخل کیسه صفرا"
    },
    {
      "de": "Dünndarmobstruktion, Pneumoperitoneum und Portalvenengas",
      "en": "Small-bowel obstruction, pneumoperitoneum and portal venous gas",
      "fa": "انسداد روده باریک، پنوموپریتوئن و گاز ورید پورت"
    },
    {
      "de": "Dünndarmobstruktion, Pneumobilie und ein Stein noch in der Gallenblase",
      "en": "Small-bowel obstruction, pneumobilia and a stone still within the gallbladder",
      "fa": "انسداد روده باریک، پنوموبیلی و سنگی که هنوز داخل کیسه صفراست"
    }
  ],
  "answer": 0,
  "rationale": {
    "de": "Die klassische Trias umfasst Dünndarmobstruktion, Luft in den Gallenwegen und einen ektopen Gallenstein. Sie ist häufig unvollständig; das Fehlen eines Bestandteils schließt den Gallensteinileus nicht aus.",
    "en": "The classic triad comprises small-bowel obstruction, air in the biliary tree and an ectopic gallstone. It is often incomplete; absence of one component does not exclude gallstone ileus.",
    "fa": "تریاد کلاسیک شامل انسداد روده باریک، هوا در مجاری صفراوی و سنگ نابجا در روده است. این تریاد اغلب کامل نیست؛ نبود یک جزء ایلئوس سنگ صفراوی را رد نمی‌کند."
  },
  "source": "https://pubmed.ncbi.nlm.nih.gov/15093232/",
  "wrongExplanations": {
    "B": {
      "de": "Zur klassischen Trias gehören Dünndarmobstruktion und ein ektoper Stein, nicht lediglich ein noch in der Gallenblase liegender Stein mit Kolondilatation.",
      "en": "The classic triad includes small-bowel obstruction and an ectopic stone, not merely a stone still in the gallbladder with colonic dilatation.",
      "fa": "تریاد کلاسیک شامل انسداد رودهٔ باریک و سنگ نابجاست، نه صرفاً سنگ باقی‌مانده در کیسهٔ صفرا همراه اتساع کولون."
    },
    "C": {
      "de": "Pneumoperitoneum und Portalvenengas sind nicht die Pneumobilie der Rigler-Trias; außerdem fehlt der ektop gelegene Stein.",
      "en": "Pneumoperitoneum and portal venous gas are not the pneumobilia of the Rigler triad; the ectopic stone is also absent.",
      "fa": "پنوموپریتوئن و گاز ورید پورت، پنوموبیلی تریاد ریگلر نیستند؛ سنگ نابجا نیز ذکر نشده است."
    },
    "D": {
      "de": "Der obstruierende Stein der klassischen Trias ist ektop im Darm; ein Gallenblasenstein allein erfüllt dieses Merkmal nicht.",
      "en": "The obstructing stone in the classic triad is ectopic within bowel; a gallbladder stone alone does not meet that component.",
      "fa": "سنگ انسداددهندهٔ تریاد کلاسیک در روده نابجاست؛ سنگ داخل کیسهٔ صفرا به‌تنهایی این جزء را برآورده نمی‌کند."
    }
  }
},
  'abdomen-foramen-winslow': {
  "question": {
    "de": "Textfall: Dilatierte Darmschlingen gelangen zwischen Pfortader und Vena cava inferior in die Bursa omentalis hinter dem Magen. Welche Hernienform passt zu dieser Route?",
    "en": "Text vignette: dilated bowel loops pass between the portal vein and inferior vena cava into the lesser sac behind the stomach. Which hernia fits this route?",
    "fa": "سناریوی متنی: لوپ‌های متسع روده از میان ورید پورت و ورید اجوف تحتانی وارد بورس امنتال پشت معده می‌شوند. کدام فتق با این مسیر سازگار است؟"
  },
  "options": [
    {
      "de": "Foramen-Winslow-Hernie.",
      "en": "Foramen of Winslow hernia.",
      "fa": "فتق فورامن وینسلو."
    },
    {
      "de": "Links-paraduodenale Hernie.",
      "en": "Left paraduodenal hernia.",
      "fa": "فتق پارادئودنال چپ."
    },
    {
      "de": "Perizökale Hernie.",
      "en": "Pericaecal hernia.",
      "fa": "فتق اطراف سکوم."
    },
    {
      "de": "Obturatorhernie.",
      "en": "Obturator hernia.",
      "fa": "فتق ابتوراتور."
    }
  ],
  "answer": 0,
  "rationale": {
    "de": "Die beschriebene Route durch das Foramen Winslow zwischen Pfortader und Vena cava führt in die Bursa omentalis hinter dem Magen. Entscheidend ist die anatomische Durchtrittsstelle.",
    "en": "The described route through the foramen of Winslow between portal vein and vena cava leads into the lesser sac behind the stomach. The anatomical passage is the decisive clue.",
    "fa": "مسیر توصیف‌شده از فورامن وینسلو میان ورید پورت و اجوف به بورس امنتال پشت معده می‌رسد. سرنخ تعیین‌کننده، محل عبور آناتومیک است."
  },
  "source": "https://doi.org/10.11231/jaem.40.751",
  "wrongExplanations": {
    "B": {
      "de": "Die links-paraduodenale Route ist nicht der beschriebene Durchtritt zwischen Pfortader und Vena cava in die Bursa omentalis.",
      "en": "The left paraduodenal route is not the described passage between portal vein and vena cava into the lesser sac.",
      "fa": "مسیر پارادئودنال چپ، عبور توصیف‌شده میان ورید پورت و اجوف به بورس امنتال نیست."
    },
    "C": {
      "de": "Eine perizökale Hernie liegt an zökalen Rezessus und erklärt nicht den genannten Weg in die Bursa omentalis.",
      "en": "A pericaecal hernia involves caecal recesses and does not explain the stated route into the lesser sac.",
      "fa": "فتق اطراف سکوم مربوط به ریسس‌های سکومی است و مسیر گفته‌شده به بورس امنتال را توضیح نمی‌دهد."
    },
    "D": {
      "de": "Eine Obturatorhernie folgt dem Obturatorkanal im Becken, nicht dem Foramen Winslow.",
      "en": "An obturator hernia passes through the pelvic obturator canal, not the foramen of Winslow.",
      "fa": "فتق ابتوراتور از کانال ابتوراتور در لگن می‌گذرد، نه فورامن وینسلو."
    }
  }
},
  'abdomen-intussusception-initial-imaging': {
  "question": {
    "de": "Ein kreislaufstabiles Kind hat anfallsartige Bauchschmerzen und klinischen Verdacht auf ileokolische Intussuszeption. Welche Bildgebung ist initial bevorzugt?",
    "en": "A haemodynamically stable child has intermittent abdominal pain and suspected ileocolic intussusception. Which imaging is preferred initially?",
    "fa": "کودک با وضعیت همودینامیک پایدار، درد شکمی حمله‌ای و شک بالینی به انواژیناسیون ایلئوکولیک دارد. کدام تصویربرداری در ابتدا ترجیح دارد؟"
  },
  "options": [
    {
      "de": "Abdomensonografie.",
      "en": "Abdominal ultrasound.",
      "fa": "سونوگرافی شکم."
    },
    {
      "de": "Kontrastverstärkte CT des Abdomens.",
      "en": "Contrast-enhanced abdominal CT.",
      "fa": "CT شکم با تزریق مادهٔ حاجب."
    },
    {
      "de": "Konventionelle Röntgenaufnahme des Abdomens.",
      "en": "Plain abdominal radiography.",
      "fa": "رادیوگرافی سادهٔ شکم."
    },
    {
      "de": "MRT des Abdomens.",
      "en": "Abdominal MRI.",
      "fa": "MRI شکم."
    }
  ],
  "answer": 0,
  "rationale": {
    "de": "Sonografie ist beim klinischen Verdacht auf kindliche Intussuszeption die initiale Untersuchung der Wahl. Ein Röntgenbild kann bei Obstruktions- oder Perforationsverdacht ergänzen; ein normales Bild schließt Intussuszeption nicht aus.",
    "en": "Ultrasound is the initial study of choice in suspected childhood intussusception. Radiographs may complement assessment for obstruction or perforation; normal radiography does not exclude intussusception.",
    "fa": "سونوگرافی بررسی اولیهٔ منتخب در شک به انواژیناسیون کودکان است. رادیوگرافی می‌تواند در شک به انسداد یا پرفوراسیون کمک کند؛ تصویر طبیعی انواژیناسیون را رد نمی‌کند."
  },
  "source": "https://www.rch.org.au/clinicalguide/guideline_index/intussusception/",
  "wrongExplanations": {
    "B": {
      "de": "CT ist in dieser stabilen pädiatrischen Ausgangssituation nicht die bevorzugte Erstuntersuchung; Sonografie ist gezielt und strahlungsfrei.",
      "en": "CT is not preferred first in this stable paediatric setting; ultrasound is targeted and radiation-free.",
      "fa": "CT در این وضعیت اولیهٔ پایدار کودکان ترجیح نخست نیست؛ سونوگرافی هدفمند و بدون پرتو است."
    },
    "C": {
      "de": "Ein Röntgenbild kann Komplikationshinweise geben, ist aber kein verlässlicher primärer Ausschlusstest.",
      "en": "Radiography can show complication clues but is not a reliable primary exclusion test.",
      "fa": "رادیوگرافی می‌تواند سرنخ عارضه بدهد، اما آزمون اولیهٔ قابل‌اعتماد برای رد بیماری نیست."
    },
    "D": {
      "de": "MRT ist hier nicht die etablierte bevorzugte Erstuntersuchung; die rasch verfügbare gezielte Sonografie ist initial vorgesehen.",
      "en": "MRI is not the established preferred first study here; targeted readily available ultrasound is used initially.",
      "fa": "MRI در اینجا بررسی نخست ترجیحیِ شناخته‌شده نیست؛ سونوگرافی هدفمند و سریع در ابتدا انجام می‌شود."
    }
  }
},
  'abdomen-pancreatic-cysts': {
  "source": "https://doi.org/10.1016/j.pan.2023.12.009",
  "question": {
    "de": "Eine Pankreaszyste kommuniziert mit dem Pankreasgang. Welche Bedeutung hat dieser Befund für die Abgrenzung von IPMN und Pseudozyste?",
    "en": "A pancreatic cyst communicates with the pancreatic duct. What does this finding contribute to distinguishing IPMN from a pseudocyst?",
    "fa": "یک کیست پانکراس با مجرای پانکراس ارتباط دارد. این یافته برای افتراق IPMN از پسودوسیست چه ارزشی دارد؟"
  },
  "options": [
    {
      "de": "Kommunikation ist bei beiden möglich; Morphologie und Pankreatitis-/Traumaanamnese gemeinsam beurteilen.",
      "en": "Communication can occur in both; assess morphology together with pancreatitis/trauma history.",
      "fa": "ارتباط در هر دو ممکن است؛ مورفولوژی را همراه با سابقهٔ پانکراتیت یا تروما بررسی کنید."
    },
    {
      "de": "Kommunikation ordnet die Zyste der IPMN zu und schließt eine Pseudozyste aus.",
      "en": "Communication assigns the cyst to IPMN and excludes a pseudocyst.",
      "fa": "ارتباط، کیست را IPMN طبقه‌بندی و پسودوسیست را رد می‌کند."
    },
    {
      "de": "Kommunikation ordnet die Zyste einer Pseudozyste zu und schließt IPMN aus.",
      "en": "Communication assigns the cyst to a pseudocyst and excludes IPMN.",
      "fa": "ارتباط، کیست را پسودوسیست طبقه‌بندی و IPMN را رد می‌کند."
    }
  ],
  "answer": 0,
  "rationale": {
    "de": "Kyoto2024 beschreibt die Gangkommunikation bei BD-IPMN und als häufig bei Pseudozysten. Bei Pankreatitis oder Trauma muss deshalb eine Pseudozyste abgegrenzt werden. Kommunikation allein ist kein exklusives Unterscheidungsmerkmal; Zystenmorphologie, Gangveränderungen und Anamnese zusammenführen.",
    "en": "Kyoto2024 describes duct communication in BD-IPMN and as common in pseudocysts. A pseudocyst must therefore be considered with pancreatitis or trauma. Communication alone is not an exclusive discriminator; integrate cyst morphology, duct changes and history.",
    "fa": "Kyoto۲۰۲۴ ارتباط مجرایی را در BD-IPMN و به‌صورت شایع در پسودوسیست توصیف می‌کند. بنابراین در سابقهٔ پانکراتیت یا تروما باید پسودوسیست را نیز افتراق داد. ارتباط به‌تنهایی ویژگی افتراقی انحصاری نیست؛ مورفولوژی کیست، تغییرات مجرا و شرح‌حال را با هم جمع‌بندی کنید."
  },
  "wrongExplanations": {
    "B": {
      "de": "Pseudozysten können ebenfalls mit dem Pankreasgang kommunizieren.",
      "en": "Pseudocysts may also communicate with the pancreatic duct.",
      "fa": "پسودوسیست‌ها نیز می‌توانند با مجرای پانکراس ارتباط داشته باشند."
    },
    "C": {
      "de": "Gangkommunikation ist ein Merkmal der BD-IPMN; sie schließt IPMN daher nicht aus.",
      "en": "Duct communication is a feature of BD-IPMN, so it does not exclude IPMN.",
      "fa": "ارتباط مجرایی ویژگی BD-IPMN است؛ بنابراین IPMN را رد نمی‌کند."
    },
    "D": {
      "de": "Die behauptete Trennung trifft für BD-IPMN und kommunizierende Pseudozysten nicht zu.",
      "en": "The claimed separation does not apply to BD-IPMN or communicating pseudocysts.",
      "fa": "جدایی ادعاشده دربارهٔ BD-IPMN یا پسودوسیست‌های مرتبط با مجرا درست نیست."
    }
  }
},
  'abdomen-focal-liver': {
  "question": {
    "de": "Eine solide fokale Leberläsion wurde zufällig in einer einzelnen portalvenösen CT-Phase entdeckt und bleibt unklar. Welche Bildgebung ergänzt ihre Kontrastmittelcharakterisierung am gezieltesten?",
    "en": "A solid focal liver lesion is incidentally detected on a single portal venous CT phase and remains indeterminate. Which imaging most directly complements enhancement characterisation?",
    "fa": "ضایعهٔ توپر کانونی کبد به‌طور اتفاقی در تنها فاز پورتوونوس CT دیده شده و نامشخص مانده است. کدام تصویربرداری برای تکمیل بررسی رفتار مادهٔ حاجب مناسب‌تر است؟"
  },
  "options": [
    {
      "de": "Dedizierte multiphasische Leber-MRT oder -CT einschließlich arterieller und späterer Phasen",
      "en": "Dedicated multiphasic liver MRI or CT including arterial and later phases",
      "fa": "MRI یا CT اختصاصی چندفازی کبد شامل فاز شریانی و فازهای بعدی"
    },
    {
      "de": "Erneute portalvenöse CT zur isolierten Bestätigung der gemessenen Dichte",
      "en": "Repeat portal venous CT to confirm the measured attenuation in isolation",
      "fa": "تکرار CT پورتوونوس برای تأیید جداگانهٔ دانسیتهٔ اندازه‌گیری‌شده"
    },
    {
      "de": "Natives CT zur Einordnung anhand der absoluten Dichte ohne Kontrastdynamik",
      "en": "Unenhanced CT to classify by absolute attenuation without enhancement dynamics",
      "fa": "CT بدون تزریق برای دسته‌بندی بر پایهٔ دانسیتهٔ مطلق بدون بررسی دینامیک مادهٔ حاجب"
    },
    {
      "de": "MRT mit T2 und DWI zur Zuordnung ohne dynamische Kontrastphasen",
      "en": "MRI with T2 and DWI for classification without dynamic contrast phases",
      "fa": "MRI با T2 و DWI برای دسته‌بندی بدون فازهای دینامیک مادهٔ حاجب"
    }
  ],
  "answer": 0,
  "rationale": {
    "de": "Bei unklarer fokaler Leberläsion empfiehlt ACG eine multiphasische kontrastverstärkte MRT oder CT. Arterielle und spätere Phasen zusammen mit nativen Bildern, Morphologie und Leberkontext beurteilen. Keine einzelne Dichte, Diffusions- oder Kontrastphase ersetzt das Gesamtmuster.",
    "en": "For an indeterminate focal liver lesion, ACG recommends multiphasic contrast-enhanced MRI or CT. Assess arterial and later phases together with unenhanced imaging, morphology and liver context. One attenuation value, diffusion image or contrast phase does not replace the overall pattern.",
    "fa": "برای ضایعهٔ کانونی نامشخص کبد، ACG انجام MRI یا CT چندفازی با تزریق را توصیه می‌کند. فاز شریانی و فازهای بعدی همراه تصاویر پیش از تزریق، مورفولوژی و زمینهٔ کبد بررسی شوند. یک مقدار دانسیته، تصویر انتشار یا فاز مادهٔ حاجب جای الگوی کلی را نمی‌گیرد."
  },
  "source": "https://doi.org/10.14309/ajg.0000000000002857",
  "wrongExplanations": {
    "B": {
      "de": "Eine weitere identische Einzelphase prüft die Reproduzierbarkeit, liefert aber die fehlende arterielle und spätere Kontrastdynamik nicht.",
      "en": "Another identical single phase tests reproducibility but does not supply the missing arterial and later enhancement dynamics.",
      "fa": "یک فاز منفرد مشابه، تکرارپذیری را می‌سنجد، اما دینامیک شریانی و فازهای بعدیِ موجودنبوده را فراهم نمی‌کند."
    },
    "C": {
      "de": "Natives CT kann Fett, Blut oder Kalk ergänzend beurteilen. Die konkrete Frage nach dem Kontrastverhalten verlangt jedoch ein multiphasisches Protokoll.",
      "en": "Unenhanced CT can complement assessment of fat, blood or calcium. The specific enhancement question nevertheless requires a multiphasic protocol.",
      "fa": "CT بدون تزریق می‌تواند بررسی چربی، خون یا کلسیم را تکمیل کند. اما پرسش مشخص دربارهٔ رفتار مادهٔ حاجب به پروتکل چندفازی نیاز دارد."
    },
    "D": {
      "de": "T2 und DWI sind nützliche Zusatzinformationen. Ohne dynamische Phasen wird die hier fehlende Kontrastmittelcharakterisierung jedoch nicht ergänzt.",
      "en": "T2 and DWI provide useful additional information. Without dynamic phases, they do not supply the missing enhancement characterisation here.",
      "fa": "T2 و DWI اطلاعات تکمیلی مفیدی‌اند. اما بدون فازهای دینامیک، بررسی رفتار مادهٔ حاجبِ موجودنبوده را تکمیل نمی‌کنند."
    }
  }
},
  'abdomen-hepatic-steatosis': item('Abdomen.pdf pp. 26–27; EASL–EASD–EASO MASLD guideline 2024; EASL non-invasive test guideline 2021; Vilgrain et al., Radiology 2016; doi:10.1148/radiol.2015142576', L('Bei diffuser Steatose zeigt sich nahe der Fissura ligamenti teretis ein fokales Areal ohne Verdrängung; Gefäße verlaufen hindurch. Welche Einordnung ist am besten?', 'In diffuse steatosis, a focal area near the fissura ligamenti teretis shows no displacement and vessels traverse it. What is the best interpretation?', 'در استئاتوز منتشر، ناحیه‌ای کانونی نزدیک شیار رباط گرد بدون جابه‌جایی دیده می‌شود و عروق از آن عبور می‌کنند. بهترین تفسیر چیست؟'), [L('Eine fokale Aussparung ist plausibel; Lage und Gefäßverlauf sind Hinweise, bei Unsicherheit weiter charakterisieren.', 'Focal sparing is plausible; location and vessel course are clues, and further characterisation is appropriate if uncertain.', 'ناحیه حفظ‌شده کانونی محتمل است؛ محل و مسیر عروق سرنخ‌اند و در صورت تردید باید بررسی تکمیلی انجام شود.'), L('Ein HCC ist damit sicher ausgeschlossen.', 'HCC is definitively excluded.', 'با این یافته HCC قطعاً رد می‌شود.'), L('Das Fehlen einer Verdrängung beweist eine fokale Aussparung.', 'Absence of displacement proves focal sparing.', 'نبود جابه‌جایی، ناحیه حفظ‌شده کانونی را ثابت می‌کند.')], 0, L('Typische Lage, fehlender Masseneffekt und Gefäße ohne Verdrängung unterstützen eine Fettverteilungsvariante, beweisen sie aber nicht. Unsichere Läsionen müssen im Gesamtkontext charakterisiert werden. Konventionelle Fettbildgebung bestimmt kein Fibrosestadium.', 'Typical location, no mass effect and vessels without displacement support a fat-distribution variant but do not prove it. Characterise an uncertain lesion in the full clinical and imaging context. Conventional fat imaging does not stage fibrosis.', 'محل تیپیک، نبود اثر فشاری و عبور عروق بدون جابه‌جایی از یک واریانت توزیع چربی حمایت می‌کنند اما آن را ثابت نمی‌کنند. ضایعه نامطمئن باید در زمینه کامل بالینی و تصویربرداری مشخصه‌یابی شود. تصویربرداری متعارف چربی، مرحله فیبروز را تعیین نمی‌کند.')),
  'abdomen-renal-masses': item('Abdomen.pdf pp. 48–51 (printed pp. 47–50); EAU RCC Diagnostic Evaluation', L('Eine solide Nierenmasse enthält auf nativer CT makroskopisches Fett und keine widersprechenden Merkmale. Welche Einordnung ist am besten?', 'A solid renal mass contains macroscopic fat on unenhanced CT and no discordant features. Which interpretation is best?', 'توده جامد کلیه در CT بدون تزریق چربی ماکروسکوپیک دارد و ویژگی ناسازگاری دیده نمی‌شود. بهترین تفسیر چیست؟'), [L('Das Muster stützt ein klassisches AML; Verkalkung und Gesamtkontext trotzdem prüfen.', 'The pattern supports classic AML; still assess calcification and the full context.', 'الگو از AML کلاسیک حمایت می‌کند؛ بااین‌حال کلسیفیکاسیون و زمینه کامل را بررسی کنید.'), L('RCC ist durch Fett immer ausgeschlossen.', 'Fat always excludes RCC.', 'وجود چربی همیشه RCC را رد می‌کند.'), L('Es handelt sich damit um ein fettarmes AML.', 'This therefore represents fat-poor AML.', 'بنابراین این مورد AML کم‌چربی است.'), L('Die Läsion ist automatisch ein Onkozytom.', 'The lesion is automatically an oncocytoma.', 'ضایعه به‌طور خودکار انکوسیتوم است.')], 0, L('Makroskopisches Fett ist ein typischer AML-Hinweis, aber ein einzelnes Zeichen ersetzt nicht die Prüfung der Morphologie. Verkalkung sollte RCC in der Differenzialdiagnose halten.', 'Macroscopic fat is a characteristic AML clue, but one sign does not replace review of morphology. Calcification should keep RCC in the differential.', 'چربی ماکروسکوپیک سرنخی تیپیک برای AML است، اما یک علامت جایگزین ارزیابی مورفولوژی نمی‌شود. کلسیفیکاسیون باید RCC را در افتراق نگه دارد.')),
  'abdomen-renal-cyst-bosniak-nodule': item('Abdomen.pdf p.46 (unversioned source table); Silverman et al. Bosniak Classification v2019, Radiology 2019;292:475–488. DOI 10.1148/radiol.2019182646', L('Eine zystische Nierenmasse zeigt einen kontrastmittelaufnehmenden Nodulus mit stumpfen Winkeln und 4 mm Vorsprung, senkrecht zur Wand gemessen. Welche Bosniak-v2019-Kategorie passt?', 'A cystic renal mass has an enhancing nodule with obtuse margins and a 4-mm protrusion measured perpendicular to the wall. Which Bosniak v2019 category fits?', 'در تودهٔ کیستیک کلیه، ندول تقویت‌شونده‌ای با زاویهٔ منفرجه و برجستگی ۴ میلی‌متری، اندازه‌گیری‌شده عمود بر دیواره، دیده می‌شود. کدام طبقهٔ Bosniak v2019 مناسب است؟'), [L('Bosniak IV', 'Bosniak IV', 'Bosniak IV'), L('Bosniak III', 'Bosniak III', 'Bosniak III'), L('Bosniak IIF', 'Bosniak IIF', 'Bosniak IIF')], 0, L('Bosniak v2019 definiert mindestens einen kontrastmittelaufnehmenden Nodulus als Kategorie IV: mit spitzen Winkeln in jeder Größe oder mit stumpfen Winkeln ab 4 mm, gemessen senkrecht zur Wand oder zum Septum. Die Kategorie ist eine bildgebende Risikoeinordnung, kein histologischer Befund.', 'Bosniak v2019 defines at least one enhancing nodule as category IV: acute margins at any size or obtuse margins of at least 4 mm, measured perpendicular to the wall or septum. The category is imaging-based risk stratification, not a histological diagnosis.', 'در Bosniak v2019 وجود دست‌کم یک ندول تقویت‌شونده معیار طبقهٔ IV است: با زاویهٔ تیز در هر اندازه، یا با زاویهٔ منفرجه و اندازهٔ دست‌کم ۴ میلی‌متر که عمود بر دیواره یا سپتا اندازه‌گیری می‌شود. این طبقه‌بندی برآورد تصویری خطر است، نه تشخیص بافت‌شناسی.')),
  'renal-mass-rcc': item('Abdomen.pdf p. 48 (printed p. 47); EAU RCC Diagnostic Evaluation', L('Welche Zusatzfrage ist bei einer soliden Nierenmasse mit Verdacht auf RCC gezielt zu beantworten?', 'Which additional question should be specifically addressed for a solid renal mass suspicious for RCC?', 'در توده جامد کلیه مشکوک به RCC، کدام نکته تکمیلی را باید هدفمند ارزیابی کرد؟'), [L('Tumorausdehnung in Nierenvene und V. cava', 'Tumour extension into the renal vein and IVC', 'گسترش تومور به ورید کلیوی و IVC'), L('Nur ob die Masse eine zentrale Narbe hat', 'Only whether the mass has a central scar', 'فقط وجود اسکار مرکزی'), L('Ob jede Verkalkung eine Metastase bedeutet', 'Whether any calcification means metastasis', 'اینکه هر کلسیفیکاسیون به‌معنای متاستاز است'), L('Ob die Masse in einer einzelnen Phase hypodens ist', 'Whether the mass is hypoattenuating on one phase', 'اینکه توده در یک فاز منفرد کم‌دانسیته است')], 0, L('Das PDF nennt venöse Tumorausdehnung; die EAU-Leitlinie beschreibt CT und bei unklarer Ausdehnung ergänzend MRT zur Beurteilung des Thrombus.', 'The PDF identifies venous tumour extension; EAU guidance describes CT and additional MRI when thrombus extent is unclear.', 'PDF به گسترش وریدی تومور اشاره می‌کند؛ راهنمای EAU از CT و در صورت نامشخص‌بودن وسعت ترومبوز، MRI تکمیلی نام می‌برد.')),
  'renal-mass-rcc-phases': item('Abdomen.pdf p. 48 (printed p. 47)', L('Welches dynamische Muster beschreibt die PDF häufig beim klarzelligen RCC?', 'Which dynamic pattern does the PDF commonly describe for clear-cell RCC?', 'PDF کدام الگوی دینامیک را اغلب در RCC سلول روشن توصیف می‌کند؟'), [L('Kräftige arterielle Anreicherung mit relativer Abnahme in der portalvenösen/nephrographischen Phase', 'Avid arterial enhancement with relative reduction in the portal venous/nephrographic phase', 'تقویت واضح شریانی همراه با کاهش نسبی در فاز پورتوونوز/نفروگرافیک'), L('Keine Anreicherung in jeder Phase', 'No enhancement in any phase', 'نبود تقویت در همه فازها'), L('Ausschließlich zentripetale Auffüllung', 'Centripetal fill-in only', 'فقط پرشدن مرکزگرا'), L('Ein einzelnes natives Signal beweist den Subtyp', 'A single unenhanced signal proves the subtype', 'یک سیگنال بدون تزریق زیرگروه را ثابت می‌کند')], 0, L('Die PDF beschreibt besonders für klarzelliges RCC eine kräftige frühe arterielle Aufnahme und relativ geringere Anreicherung in der späteren Phase. Das Muster charakterisiert, beweist aber nicht allein den Subtyp.', 'The PDF describes avid early arterial enhancement, particularly for clear-cell RCC, with relatively lower enhancement later. The pattern helps characterise but does not prove subtype on its own.', 'PDF به‌ویژه برای RCC سلول روشن، تقویت شریانی زودرس واضح و تقویت نسبتاً کمتر در فاز بعد را توصیف می‌کند. این الگو به مشخصه‌یابی کمک می‌کند، اما به‌تنهایی زیرگروه را ثابت نمی‌کند.')),
  'renal-mass-oncocytoma': item('Abdomen.pdf p. 49 (printed p. 48)', L('Eine Nierenmasse zeigt eine zentrale sternförmige Narbe. Was folgt daraus?', 'A renal mass shows a central stellate scar. What follows from this finding?', 'در توده کلیه اسکار ستاره‌ای مرکزی دیده می‌شود. نتیجه چیست؟'), [L('Onkozytom ist möglich, aber die Narbe beweist die Histologie nicht.', 'Oncocytoma is possible, but the scar does not prove histology.', 'انکوسیتوم ممکن است، اما اسکار بافت‌شناسی را ثابت نمی‌کند.'), L('RCC ist sicher ausgeschlossen.', 'RCC is definitively excluded.', 'RCC قطعاً رد می‌شود.'), L('Eine Metastase ist bewiesen.', 'Metastasis is proven.', 'متاستاز ثابت شده است.'), L('Es handelt sich zwingend um AML.', 'It must be AML.', 'حتماً AML است.')], 0, L('Die PDF warnt ausdrücklich, dass Onkozytom und RCC präoperativ bildgebend meist nicht sicher trennbar sind.', 'The PDF explicitly cautions that oncocytoma and RCC usually cannot be reliably distinguished preoperatively by imaging.', 'PDF صریحاً هشدار می‌دهد که انکوسیتوم و RCC معمولاً پیش از جراحی با تصویربرداری به‌طور مطمئن از هم جدا نمی‌شوند.')),
  'renal-mass-fat-poor-aml': item('Abdomen.pdf p. 51 (printed p. 50); EAU RCC Epidemiology, Aetiology and Pathology', L('Ein solides Nierenleiden zeigt kein sichtbares makroskopisches Fett. Welche Aussage zu AML trifft zu?', 'A solid renal lesion shows no visible macroscopic fat. Which statement about AML is accurate?', 'در ضایعه جامد کلیه چربی ماکروسکوپیک قابل مشاهده نیست. کدام عبارت درباره AML درست است؟'), [L('Fettarmes AML bleibt möglich und kann bildgebend unbestimmt sein.', 'Fat-poor AML remains possible and may be indeterminate on imaging.', 'AML کم‌چربی همچنان ممکن است و در تصویربرداری می‌تواند نامعین بماند.'), L('AML ist damit ausgeschlossen.', 'AML is excluded.', 'AML رد می‌شود.'), L('Fehlendes Fett beweist papilläres RCC.', 'Absent fat proves papillary RCC.', 'نبود چربی، RCC پاپیلاری را ثابت می‌کند.'), L('Die Läsion ist sicher gutartig.', 'The lesion is certainly benign.', 'ضایعه قطعاً خوش‌خیم است.')], 0, L('Fettarme AML können makroskopisches Fett vermissen lassen und sind bildgebend nicht immer sicher zu erkennen; die Abgrenzung zu RCC kann schwierig sein.', 'Fat-poor AML may lack visible macroscopic fat and cannot always be confidently identified on imaging; distinction from RCC may be difficult.', 'AML کم‌چربی ممکن است چربی ماکروسکوپیک قابل مشاهده نداشته باشد و همیشه در تصویربرداری با اطمینان شناسایی نمی‌شود؛ افتراق آن از RCC دشوار است.')),
  'abdomen-adrenal-masses': item('Abdomen.pdf pp. 58–64; ESE/ENSAT 2023', L('Was gehört zur Einordnung einer Nebennierenraumforderung?', 'What belongs in assessment of an adrenal mass?', 'در ارزیابی توده آدرنال چه مواردی اهمیت دارند؟'), [L('Größe, native Dichte/Signal, Voraufnahmen und klinischer Kontext', 'Size, unenhanced attenuation/signal, priors and clinical context', 'اندازه، دانسیته/سیگنال بدون تزریق، تصاویر قبلی و زمینه بالینی'), L('Form allein', 'Shape alone', 'فقط شکل'), L('Seite allein', 'Side alone', 'فقط سمت')], 0, L('Kein Einzelmerkmal ersetzt Gesamtbildgebung und klinische Abklärung.', 'No single feature replaces full imaging and clinical assessment.', 'هیچ ویژگی منفردی جایگزین ارزیابی کامل تصویری و بالینی نیست.')),
  'thorax-foreign-body': item('Thorax.pdf pp. 30–31; ACR 2025', L('Warum schließt ein unauffälliges Röntgenbild Aspiration nicht immer aus?', 'Why does a normal radiograph not always exclude aspiration?', 'چرا رادیوگرافی طبیعی همیشه آسپیراسیون را رد نمی‌کند؟'), [L('Fremdkörper können radioluzent sein; indirekte Zeichen beachten', 'Objects may be radiolucent; assess indirect signs', 'اجسام می‌توانند رادیولوسنت باشند؛ نشانه‌های غیرمستقیم را بررسی کنید'), L('Alle Fremdkörper sind im Röntgen sichtbar', 'All foreign bodies are visible on radiographs', 'همه اجسام خارجی در رادیوگرافی دیده می‌شوند'), L('Nur Pleuraerguss zählt', 'Only pleural effusion matters', 'فقط افیوژن پلور اهمیت دارد')], 0, L('Indirekte Zeichen und klinischer Verdacht bleiben relevant; ACR recommendation cited here is pediatric.', 'Indirect signs and clinical suspicion remain relevant; the cited ACR recommendation is pediatric.', 'نشانه‌های غیرمستقیم و شک بالینی اهمیت دارند؛ توصیه ACR در اینجا مربوط به کودکان است.')),
  'pneumonie-muster': item(
    'Thorax.pdf, PDF pp. 32–35',
    L('Welche Beschreibung passt zur Röntgenaufnahme der Lobärpneumonie im ersten Beispiel?', 'Which description matches the first example of lobar pneumonia on chest radiography?', 'کدام توصیف با نخستین نمونهٔ رادیوگرافی پنومونی لوبار مطابقت دارد؟'),
    [
      L('Flächige Konsolidierung im rechten Oberlappen mit positivem Aerobronchogramm', 'Confluent right upper-lobe consolidation with a positive air bronchogram', 'کنسولیدیشن پیوسته در لوب فوقانی راست همراه با برونکوگرام هوایی مثبت'),
      L('Beidseitige diffuse Milchglastrübung ohne Konsolidierung', 'Bilateral diffuse ground-glass opacity without consolidation', 'کدورت شیشه‌مات منتشر دوطرفه بدون کنسولیدیشن'),
      L('Einzelner Rundherd mit Halo-Zeichen', 'A solitary nodule with a halo sign', 'ندول منفرد همراه علامت هاله'),
    ],
    0,
    L('Die Bildlegende ordnet das Beispiel als rechtsseitige Oberlappenpneumonie mit flächiger Konsolidierung und positivem Aerobronchogramm ein. Das Muster allein beweist keinen Erreger.', 'The source caption identifies right upper-lobe pneumonia with confluent consolidation and a positive air bronchogram. The pattern alone does not prove an organism.', 'زیرنویس منبع این تصویر را پنومونی لوب فوقانی راست با کنسولیدیشن پیوسته و برونکوگرام هوایی مثبت توصیف می‌کند. این الگو به‌تنهایی عامل میکروبی را ثابت نمی‌کند.'),
  ),
  'thorax-tuberculosis': item('Thorax.pdf pp. 36–37; ATS/CDC/IDSA', L('Kann das Thoraxbild TB definitiv diagnostizieren?', 'Can chest imaging definitively diagnose TB?', 'آیا تصویربرداری قفسه سینه می‌تواند سل را قطعی تشخیص دهد؟'), [L('Nein; es kann die Diagnose stützen, mikrobiologische Abklärung bleibt nötig', 'No; it may support suspicion, but microbiological evaluation is still needed', 'خیر؛ می‌تواند شک را تقویت کند اما بررسی میکروبیولوژیک همچنان لازم است'), L('Ja, bei apikaler Verteilung immer', 'Yes, whenever apical', 'بله، همیشه در توزیع اپیکال'), L('Ja, bei Verkalkung allein', 'Yes, based on calcification alone', 'بله، فقط بر اساس کلسیفیکاسیون')], 0, L('Bildgebung ist suggestiv, aber nicht definitiv.', 'Imaging can be suggestive but is not definitive.', 'تصویربرداری می‌تواند مطرح‌کننده باشد اما قطعی نیست.')),
  'thorax-chest-xray': item('Thorax.pdf pp. 27–28', L('Was sollte vor der Befundinterpretation geprüft werden?', 'What should be checked before interpreting the image?', 'پیش از تفسیر تصویر چه چیزی باید بررسی شود؟'), [L('Projektion, Rotation und Inspiration', 'Projection, rotation and inspiration', 'نما، چرخش و دم'), L('Nur Herzgröße', 'Heart size only', 'فقط اندازه قلب'), L('Nur die Lungenbasen', 'Lung bases only', 'فقط قاعده ریه')], 0, L('Technik verändert die scheinbare Herzgröße und Transparenz.', 'Technique alters apparent heart size and lung lucency.', 'تکنیک بر اندازه ظاهری قلب و شفافیت ریه اثر می‌گذارد.')),
  'thorax-heart-size': item('Thorax.pdf physical pp. 27–28; ACR Appropriateness Criteria (AP/portable projection distortion)', L('Eine mobile a.p.-Aufnahme zeigt eine breitere Herzsilhouette als eine p.a.-Aufnahme. Welche Einordnung ist am treffendsten?', 'A portable AP view shows a wider cardiac silhouette than a PA view. What is the best interpretation?', 'در نمای پرتابل AP سایه قلب از نمای PA پهن‌تر است. بهترین تفسیر چیست؟'), [L('Auf AP ist das Herz weiter vom Detektor entfernt und kann geometrisch vergrößert erscheinen; Projektion und Position berücksichtigen.', 'On AP, the heart is farther from the detector and may appear geometrically magnified; consider projection and positioning.', 'در AP قلب از دتکتور دورتر است و ممکن است از نظر هندسی بزرگ‌تر دیده شود؛ پروجکشن و وضعیت بیمار را در نظر بگیرید.'), L('Eine breitere Silhouette beweist unabhängig von der Projektion eine Kardiomegalie.', 'A wider silhouette proves cardiomegaly regardless of projection.', 'سایه پهن‌تر صرف‌نظر از پروجکشن، کاردیومگالی را ثابت می‌کند.'), L('Eine p.a.-Aufnahme vergrößert die Herzsilhouette typischerweise stärker als a.p.', 'A PA view typically magnifies the cardiac silhouette more than AP.', 'نمای PA معمولاً سایه قلب را بیشتر از AP بزرگ‌نمایی می‌کند.')], 0, L('Bei a.p.-Projektion ist das Herz weiter vom Detektor entfernt; die geometrische Vergrößerung kann die Herzsilhouette breiter wirken lassen. Mit einer standardisierten p.a.-Aufnahme ist sie nicht direkt gleichzusetzen.', 'With AP projection the heart is farther from the detector; geometric magnification can make the silhouette appear wider. It should not be compared directly with a standard PA image.', 'در پروجکشن AP قلب از دتکتور دورتر است؛ بزرگ‌نمایی هندسی می‌تواند سایه را پهن‌تر نشان دهد. آن را نباید مستقیماً با تصویر استاندارد PA مقایسه کرد.')),
  'abdomen-hepatic-aml': item('Abdomen.pdf pp. 12–13; cited CT/MRI case series', L('Warum darf Wash-out nicht als starres AML-Kriterium verwendet werden?', 'Why should washout not be used as a rigid AML criterion?', 'چرا wash-out نباید معیار ثابت AML باشد؟'), [L('Enhancement kann variieren und mit HCC überlappen', 'Enhancement can vary and overlap with HCC', 'الگوی جذب می‌تواند متغیر باشد و با HCC همپوشانی کند'), L('AML zeigt immer Wash-out', 'AML always shows washout', 'AML همیشه wash-out دارد'), L('Wash-out beweist immer AML', 'Washout always proves AML', 'wash-out همیشه AML را ثابت می‌کند')], 0, L('Der PDF-Widerspruch und die variable Literatur werden in der Lektion ausdrücklich offengehalten.', 'The PDF contradiction and variable literature are explicitly kept open in the lesson.', 'تناقض PDF و تفاوت‌های گزارش‌شده در منابع در درس صریحاً باز نگه داشته شده‌اند.')),
  'abdomen-psc-mrcp': item('Abdomen.pdf pp. 28–29; AASLD 2022; IPSCSG 2021', L('Welches Gangmuster passt zu PSC?', 'Which duct pattern is consistent with PSC?', 'کدام الگوی مجاری با PSC سازگار است؟'), [L('Multifokale Strikturen mit wechselndem Kaliber', 'Multifocal strictures with alternating calibre', 'تنگی‌های چندکانونی با تغییر متناوب قطر'), L('Ein einzelner glatter Gang', 'One smooth single duct', 'یک مجرای منفرد و صاف'), L('Nur eine Wandverdickung der Gallenblase', 'Gallbladder wall thickening alone', 'فقط ضخیم‌شدن دیواره کیسه صفرا')], 0, L('MRCP zeigt Morphologie; klinische Relevanz wird nicht allein daraus abgeleitet.', 'MRCP shows morphology; clinical significance is not inferred from imaging alone.', 'MRCP مورفولوژی را نشان می‌دهد؛ اهمیت بالینی فقط از تصویر نتیجه‌گیری نمی‌شود.')),
  'abdomen-pdac-isoattenuating': item('Abdomen.pdf p.36; SAR/APA pancreas reporting consensus', L('Was ist bei einer isoattenuierenden Pankreasläsion wichtig?', 'What is important when a pancreatic lesion is isoattenuating?', 'در ضایعهٔ هم‌دانسیتهٔ پانکراس به چه نکته‌ای باید توجه کرد؟'), [L('Indirekte Zeichen wie Gangabbruch, Aufstau oder distale Atrophie gezielt suchen', 'Look for indirect signs such as duct cut-off, upstream dilatation or distal atrophy', 'به‌دنبال نشانه‌های غیرمستقیم مانند قطع مجرا، اتساع بالادست یا آتروفی دیستال باشید'), L('PDAC ist ausgeschlossen, wenn keine deutliche Masse abgrenzbar ist', 'PDAC is excluded if no definite mass can be delineated', 'اگر تودهٔ واضح دیده نشود، PDAC رد می‌شود'), L('Nur die native CT-Phase erneut beurteilen', 'Reassess only the unenhanced CT phase', 'فقط فاز بدون تزریق CT را دوباره ارزیابی کنید')], 0, L('Ein Teil der PDAC kann isoattenuierend sein. Sekundäre Gangzeichen und Parenchymveränderungen können die Läsion indirekt sichtbar machen.', 'Some PDACs may be isoattenuating. Secondary ductal and parenchymal signs may reveal the lesion indirectly.', 'برخی PDACها ممکن است هم‌دانسیته باشند. نشانه‌های ثانویهٔ مجرا و پارانشیم می‌توانند ضایعه را به‌طور غیرمستقیم آشکار کنند.')),
  'abdomen-pdac-double-duct': item('Abdomen.pdf p.36; SAR/APA pancreas reporting consensus', L('Wie ist das Double-Duct-Zeichen einzuordnen?', 'How should the double-duct sign be interpreted?', 'علامت دو مجرا چگونه باید تفسیر شود؟'), [L('Es lokalisiert einen Prozess im Pankreaskopf, ist aber nicht spezifisch für PDAC', 'It localises a process to the pancreatic head but is not specific for PDAC', 'فرایندی در سر پانکراس را موضع‌یابی می‌کند، اما اختصاصی PDAC نیست'), L('Es beweist unabhängig vom Kontext ein PDAC', 'It proves PDAC regardless of context', 'صرف‌نظر از زمینه، PDAC را ثابت می‌کند'), L('Es schließt einen periampullären Prozess aus', 'It excludes a periampullary process', 'فرایند پری‌آمپولاری را رد می‌کند')], 0, L('Die gleichzeitige Erweiterung von Ductus choledochus und Pankreasgang ist ein Lokalisationshinweis; die Ursache bleibt differenzialdiagnostisch offen.', 'Concurrent dilatation of the common bile duct and pancreatic duct is a localising clue; the cause remains a differential diagnosis.', 'اتساع هم‌زمان مجرای صفراوی مشترک و مجرای پانکراس سرنخی برای موضع‌یابی است؛ علت همچنان نیازمند تشخیص افتراقی است.')),
  'abdomen-pdac-vessel-contact': item('Abdomen.pdf p.36; SAR/APA pancreas reporting consensus', L('Was sollte bei Gefäßkontakt eines PDAC beschrieben werden?', 'What should be described when PDAC contacts a vessel?', 'در تماس PDAC با رگ چه مواردی باید توصیف شوند؟'), [L('Betroffenes Gefäß, Kontaktumfang und -länge sowie Konturveränderung, Stenose oder Verschluss', 'The vessel, extent and length of contact, and contour change, narrowing or occlusion', 'رگ درگیر، میزان و طول تماس، و تغییر شکل جدار، تنگی یا انسداد'), L('Nur ein einzelner Kontaktwinkel als vollständige Resektabilitätsentscheidung', 'A single contact angle as the complete resectability decision', 'فقط یک زاویهٔ تماس به‌عنوان تصمیم کامل دربارهٔ قابلیت برداشت'), L('Gefäßkontakt ignorieren, wenn kein Double-Duct-Zeichen vorliegt', 'Ignore vessel contact if the double-duct sign is absent', 'در نبود علامت دو مجرا، تماس عروقی را نادیده بگیرید')], 0, L('Die Lektion empfiehlt eine getrennte, strukturierte Gefäßbeschreibung. Ein Kontaktwinkel allein ersetzt keine vollständige Resektabilitätsbeurteilung.', 'The lesson recommends structured, vessel-by-vessel description. Contact angle alone does not replace a complete resectability assessment.', 'درس، توصیف ساختاریافته و جداگانهٔ هر رگ را توصیه می‌کند. زاویهٔ تماس به‌تنهایی جایگزین ارزیابی کامل قابلیت برداشت نیست.')),
  'abdomen-inguinal-hernia-landmarks': {
  "question": {
    "de": "Eine Leistenhernie verläuft lateral der inferioren epigastrischen Gefäße durch den tiefen Leistenring. Welche Form passt?",
    "en": "A groin hernia passes lateral to the inferior epigastric vessels through the deep inguinal ring. Which type fits?",
    "fa": "فتق کشالهٔ ران از لترال عروق اپی‌گاستریک تحتانی و از حلقهٔ عمقی عبور می‌کند. کدام نوع با این توصیف سازگار است؟"
  },
  "options": [
    {
      "de": "Indirekte Inguinalhernie",
      "en": "Indirect inguinal hernia",
      "fa": "فتق اینگوینال غیرمستقیم"
    },
    {
      "de": "Direkte Inguinalhernie",
      "en": "Direct inguinal hernia",
      "fa": "فتق اینگوینال مستقیم"
    },
    {
      "de": "Femoralhernie",
      "en": "Femoral hernia",
      "fa": "فتق فمورال"
    },
    {
      "de": "Kombinierte direkte und indirekte Inguinalhernie",
      "en": "Combined direct and indirect inguinal hernia",
      "fa": "فتق اینگوینال ترکیبی مستقیم و غیرمستقیم"
    }
  ],
  "answer": 0,
  "rationale": {
    "de": "Die indirekte Form tritt lateral der inferioren epigastrischen Gefäße durch den tiefen Leistenring ein. Die direkte Form liegt medial der Gefäße; eine Femoralhernie tritt unterhalb des Leistenbandes aus.",
    "en": "An indirect hernia enters lateral to the inferior epigastric vessels through the deep ring. A direct hernia lies medial to the vessels; a femoral hernia emerges below the inguinal ligament.",
    "fa": "فتق غیرمستقیم از لترال عروق اپی‌گاستریک تحتانی و از حلقهٔ عمقی وارد می‌شود. نوع مستقیم مدیال عروق است و فتق فمورال از پایین رباط اینگوینال خارج می‌شود."
  },
  "source": "https://pubmed.ncbi.nlm.nih.gov/21415178/",
  "wrongExplanations": {
    "B": {
      "de": "Die direkte Form liegt medial der epigastrischen Gefäße und tritt nicht durch den tiefen Ring ein.",
      "en": "The direct type lies medial to the epigastric vessels and does not enter through the deep ring.",
      "fa": "نوع مستقیم در مدیال عروق اپی‌گاستریک است و از حلقهٔ عمقی وارد نمی‌شود."
    },
    "C": {
      "de": "Der femorale Weg verläuft unterhalb des Leistenbandes, typischerweise medial der Femoralvene, nicht durch den tiefen Leistenring.",
      "en": "The femoral route runs below the inguinal ligament, typically medial to the femoral vein, rather than through the deep inguinal ring.",
      "fa": "مسیر فمورال پایین رباط اینگوینال و معمولاً مدیال ورید فمورال است، نه از حلقهٔ عمقی اینگوینال."
    },
    "D": {
      "de": "Für die kombinierte Form müssten sowohl ein medialer direkter als auch ein lateraler indirekter Bruchweg nachgewiesen sein. Beschrieben ist der laterale Weg durch den tiefen Ring.",
      "en": "A combined type requires both a medial direct and a lateral indirect defect. The stated finding describes the lateral route through the deep ring.",
      "fa": "نوع ترکیبی به وجود مسیر مستقیم مدیال و غیرمستقیم لترال نیاز دارد. توصیف سؤال مسیر لترال از حلقهٔ عمقی را بیان می‌کند."
    }
  }
},
  'abdomen-femoral-hernia-landmarks': {
  "question": {
    "de": "Ein Bruchsack liegt unterhalb des Leistenbandes und medial der Vena femoralis. Welche Zuordnung passt?",
    "en": "A hernia sac lies below the inguinal ligament and medial to the femoral vein. Which classification fits?",
    "fa": "ساک فتق در پایین رباط اینگوینال و مدیال ورید فمورال قرار دارد. کدام دسته‌بندی مناسب است؟"
  },
  "options": [
    {
      "de": "Femoralhernie",
      "en": "Femoral hernia",
      "fa": "فتق فمورال"
    },
    {
      "de": "Indirekte Inguinalhernie",
      "en": "Indirect inguinal hernia",
      "fa": "فتق اینگوینال غیرمستقیم"
    },
    {
      "de": "Direkte Inguinalhernie",
      "en": "Direct inguinal hernia",
      "fa": "فتق اینگوینال مستقیم"
    },
    {
      "de": "Kombinierte direkte und indirekte Inguinalhernie",
      "en": "Combined direct and indirect inguinal hernia",
      "fa": "فتق اینگوینال ترکیبی مستقیم و غیرمستقیم"
    }
  ],
  "answer": 0,
  "rationale": {
    "de": "Die Kombination aus Lage unterhalb des Leistenbandes und medial der Femoralvene spricht für eine Femoralhernie.",
    "en": "The combination of a position below the inguinal ligament and medial to the femoral vein supports a femoral hernia.",
    "fa": "ترکیب قرارگیری در پایین رباط اینگوینال و مدیال ورید فمورال به نفع فتق فمورال است."
  },
  "source": "https://pubmed.ncbi.nlm.nih.gov/21415178/",
  "wrongExplanations": {
    "B": {
      "de": "Die indirekte Inguinalhernie tritt oberhalb des Leistenbandes lateral der epigastrischen Gefäße durch den tiefen Ring ein.",
      "en": "An indirect inguinal hernia enters through the deep ring above the inguinal ligament lateral to the epigastric vessels.",
      "fa": "فتق اینگوینال غیرمستقیم بالای رباط اینگوینال و لترال عروق اپی‌گاستریک از حلقهٔ عمقی وارد می‌شود."
    },
    "C": {
      "de": "Die direkte Inguinalhernie liegt oberhalb des Leistenbandes medial der epigastrischen Gefäße.",
      "en": "A direct inguinal hernia lies above the inguinal ligament medial to the epigastric vessels.",
      "fa": "فتق اینگوینال مستقیم بالای رباط اینگوینال و مدیال عروق اپی‌گاستریک است."
    },
    "D": {
      "de": "Eine kombinierte Inguinalhernie umfasst direkte und indirekte Defekte oberhalb des Leistenbandes; die genannten femoralen Landmarken sprechen dagegen.",
      "en": "A combined inguinal hernia comprises direct and indirect defects above the inguinal ligament; the stated femoral landmarks do not fit.",
      "fa": "فتق اینگوینال ترکیبی شامل نقص مستقیم و غیرمستقیم بالای رباط اینگوینال است؛ نشانه‌های فمورال ذکرشده با آن سازگار نیستند."
    }
  }
},
  'abdomen-cystic-liver-lesions': item('Abdomen.pdf pp. 5–7; ACG 2024; WHO 2025', L('Welches Muster passt zum MRT-Beispiel einer Echinokokkenzyste?', 'Which pattern matches the MRI example of an echinococcal cyst?', 'کدام الگو با نمونهٔ MRI کیست اکینوکوکی مطابقت دارد؟'), [L('T2-helle Tochterzysten und Septen; nach Kontrastmittel können Wand und Septen, nicht aber der Inhalt anreichern', 'T2-bright daughter cysts and septa; after contrast, the wall and septa may enhance but the contents do not', 'کیست‌های دختر و سپتا در T2 پرسیگنال‌اند؛ پس از تزریق دیواره و سپتا ممکن است جذب داشته باشند، اما محتوا نه'), L('Einzelne glatte Zyste mit homogener Flüssigkeit und ohne Septen', 'A single smooth cyst with homogeneous fluid and no septa', 'یک کیست منفرد با مایع همگن و بدون سپتا'), L('Diskontinuierliche periphere Kontrastknoten mit zentripetaler Auffüllung', 'Discontinuous peripheral enhancing nodules with centripetal fill-in', 'ندول‌های محیطی ناپیوسته با پرشدن به‌سمت مرکز')], 0, L('Das PDF-Beispiel zeigt Tochterzysten im T2w-FS; im T1w post KM FS kontrastieren Wand/Septen mit dem nicht anreichernden Inhalt. Das Muster unterstützt die morphologische Einordnung, beweist allein aber keine Ätiologie.', 'The PDF example shows daughter cysts on T2w-FS; on post-contrast T1w-FS the wall/septa enhance against non-enhancing contents. This supports morphological assessment but does not prove aetiology by itself.', 'نمونهٔ PDF کیست‌های دختر را در T2w-FS نشان می‌دهد؛ در T1w پس از تزریق، دیواره/سپتا در برابر محتوای بدون جذب دیده می‌شوند. این الگو به ارزیابی مورفولوژی کمک می‌کند اما به‌تنهایی علت را ثابت نمی‌کند.')),
  'abdomen-appendizitis': {
  "source": "https://doi.org/10.1186/s13017-020-00306-3; https://acsearch.acr.org/list/TopicNarrativePdf?topicId=21",
  "question": {
    "de": "Was gilt bei einer nicht dargestellten Appendix im Ultraschall?",
    "en": "How should a non-visualised appendix on ultrasound be interpreted?",
    "fa": "آپاندیس دیده‌نشده در سونوگرافی چگونه باید تفسیر شود؟"
  },
  "options": [
    {
      "de": "Das Ergebnis ist nicht diagnostisch; Untersuchungsqualität, Sekundärzeichen und Klinik bestimmen den nächsten Schritt.",
      "en": "The result is non-diagnostic; examination quality, secondary signs and clinical findings determine the next step.",
      "fa": "نتیجه غیرتشخیصی است؛ کیفیت بررسی، نشانه‌های ثانویه و بالین گام بعدی را تعیین می‌کنند."
    },
    {
      "de": "Als negativen Appendixbefund einordnen und die Abklärung unabhängig vom Verlauf beenden.",
      "en": "Classify it as a negative appendiceal finding and end assessment regardless of the clinical course.",
      "fa": "آن را یافتهٔ منفی آپاندیس بدانید و مستقل از سیر بالینی بررسی را پایان دهید."
    },
    {
      "de": "Eine Appendizitis allein aus vergrößerten regionalen Lymphknoten diagnostizieren.",
      "en": "Diagnose appendicitis from enlarged regional nodes alone.",
      "fa": "آپاندیسیت را صرفاً از بزرگی غدد لنفاوی ناحیه‌ای تشخیص دهید."
    }
  ],
  "answer": 0,
  "rationale": {
    "de": "Nichtvisualisierung ist keine sichere Ausschlussdiagnose; weitere Schritte richten sich nach Population, Klinik und Pfad.",
    "en": "Non-visualisation does not safely exclude appendicitis; next steps depend on population, clinical context and pathway.",
    "fa": "دیده‌نشدن آپاندیس آن را با اطمینان رد نمی‌کند؛ گام بعدی به جمعیت، زمینه بالینی و مسیر تشخیصی بستگی دارد."
  },
  "wrongExplanations": {
    "B": {
      "de": "Eine nicht gesehene Appendix ist kein nachweislich unauffälliger Appendixbefund.",
      "en": "An unseen appendix is not a demonstrated normal appendix.",
      "fa": "آپاندیس دیده‌نشده معادل آپاندیس طبیعیِ نشان‌داده‌شده نیست."
    },
    "C": {
      "de": "Lymphknoten können reaktiv und unspezifisch sein; sie ersetzen den direkten Nachweis nicht.",
      "en": "Nodes may be reactive and non-specific; they do not replace direct assessment.",
      "fa": "غدد می‌توانند واکنشی و غیراختصاصی باشند؛ جای ارزیابی مستقیم را نمی‌گیرند."
    },
    "D": {
      "de": "Die Folgeabklärung richtet sich unter anderem nach Alter, Schwangerschaft, Risiko und verfügbaren Verfahren.",
      "en": "Subsequent assessment depends on factors including age, pregnancy, risk and available modalities.",
      "fa": "بررسی بعدی از جمله به سن، بارداری، خطر و روش‌های در دسترس وابسته است."
    }
  }
},
  'abdomen-lower-gi-bleeding': {
  "question": {
    "de": "Bei Hämatochezie zeigt eine technisch geeignete Mehrphasen-CTA einen umschriebenen hyperdensen Fokus im Kolonlumen. Er ist bereits nativ vorhanden und bleibt arteriell und portalvenös in Dichte und Form gleich. Welche Befundformulierung passt am besten?",
    "en": "In a patient with haematochezia, technically adequate multiphase CTA shows a focal hyperattenuating area in the colonic lumen. It is already present before contrast and remains unchanged in attenuation and shape on arterial and portal venous images. Which report wording fits best?",
    "fa": "در بیمار دچار هماتوشزی، CTA چندفازی با تکنیک مناسب کانونی پردانسیته در لومن کولون نشان می‌دهد. کانون از پیش در فاز بدون تزریق وجود دارد و در فازهای شریانی و پورتوونوس از نظر دانسیته و شکل تغییر نمی‌کند. کدام عبارت گزارش مناسب‌تر است؟"
  },
  "options": [
    {
      "de": "Präexistentes hyperdenses Lumenmaterial; an diesem Fokus kein Nachweis aktiver Extravasation.",
      "en": "Pre-existing hyperattenuating luminal material; no active extravasation demonstrated at this focus.",
      "fa": "محتوای پردانسیتهٔ از پیش موجود در لومن؛ در این کانون نشت فعال نشان داده نشده است."
    },
    {
      "de": "Arterielle Extravasation mit fortgesetzter Anreicherung im Darmlumen.",
      "en": "Arterial extravasation with progressive luminal accumulation.",
      "fa": "نشت شریانی همراه تجمع پیشرونده در لومن روده."
    },
    {
      "de": "Verzögert einsetzende Extravasation mit portalvenöser Kontrastmittelansammlung.",
      "en": "Delayed-onset extravasation with portal venous contrast pooling.",
      "fa": "نشت با شروع تأخیری همراه تجمع مادهٔ حاجب در فاز پورتوونوس."
    },
    {
      "de": "Kontrastierte Schleimhautgefäße als Erklärung der neu entstandenen Hyperdensität.",
      "en": "Enhanced mucosal vessels explaining newly developed hyperattenuation.",
      "fa": "عروق مخاطی تقویت‌شده به‌عنوان علت پردانسیته‌شدن تازه."
    }
  ],
  "answer": 0,
  "rationale": {
    "de": "Für aktive Extravasation ist neu hinzukommendes intraluminales Kontrastmittel entscheidend. Ein schon nativ vorhandener unveränderter Fokus belegt diese Aktivität nicht. Blut beziehungsweise anderer hyperdenser Inhalt kann präexistieren; eine negative CTA schließt eine intermittierende klinische Blutung nicht aus.",
    "en": "Active extravasation requires newly appearing intraluminal contrast. A focus already present before contrast and unchanged does not demonstrate that activity. Blood or other hyperattenuating contents may pre-exist; negative CTA does not exclude intermittent clinical bleeding.",
    "fa": "در نشت فعال، اضافه‌شدن مادهٔ حاجب جدید به لومن تعیین‌کننده است. کانونی که از فاز بدون تزریق موجود و بدون تغییر است، این فعالیت را نشان نمی‌دهد. خون یا محتوای پردانسیتهٔ دیگر می‌تواند از پیش وجود داشته باشد؛ CTA منفی خون‌ریزی بالینی متناوب را رد نمی‌کند."
  },
  "source": "https://pubmed.ncbi.nlm.nih.gov/22084211/",
  "wrongExplanations": {
    "B": {
      "de": "Neu auftretende beziehungsweise zunehmende Kontrastmittelansammlung wird nicht beschrieben; der Fokus ist schon nativ unverändert vorhanden.",
      "en": "No new or increasing contrast accumulation is described; the focus is already present and unchanged before contrast.",
      "fa": "تجمع تازه یا فزایندهٔ مادهٔ حاجب توصیف نشده؛ کانون از فاز بدون تزریق وجود داشته و بدون تغییر است."
    },
    "C": {
      "de": "Eine verzögerte Extravasation würde im Phasenvergleich neu auftreten oder sich verändern; hier bleibt der präexistente Fokus unverändert.",
      "en": "Delayed extravasation would appear or evolve across phases; the pre-existing focus here remains unchanged.",
      "fa": "نشت تأخیری در مقایسهٔ فازها تازه ظاهر می‌شود یا تغییر می‌کند؛ کانون از پیش موجود در اینجا بدون تغییر است."
    },
    "D": {
      "de": "Die Hyperdensität ist nicht neu und liegt als Fokus im Lumen vor. Neu kontrastierte Mukosagefäße erklären diesen nativen Befund nicht.",
      "en": "Hyperattenuation is not new and is a luminal focus. Newly enhanced mucosal vessels do not explain this unenhanced finding.",
      "fa": "پردانسیته‌بودن تازه ایجاد نشده و کانون در لومن قرار دارد. عروق مخاطی که تازه تقویت شده‌اند، این یافتهٔ فاز بدون تزریق را توضیح نمی‌دهند."
    }
  }
},
  'abdomen-kolorektales-karzinom': {
  "question": {
    "de": "Im MRT liegt der Primärtumor 2 mm von der MRF entfernt. Ein unregelmäßiger tumorverdächtiger Knoten liegt 0,8 mm entfernt; ein glatt berandeter Knoten liegt 0,6 mm entfernt. Wie ist die MRF nach ESGAR 2026 zu beurteilen?",
    "en": "On MRI, the primary tumour is 2 mm from the MRF. An irregular suspicious node is 0.8 mm away; a smooth-bordered node is 0.6 mm away. How should the MRF be assessed under ESGAR 2026?",
    "fa": "در MRI، تومور اولیه ۲ میلی‌متر از MRF فاصله دارد. یک غدهٔ نامنظم و مشکوک در فاصلهٔ ۰٫۸ میلی‌متری و یک غده با حاشیه صاف در فاصلهٔ ۰٫۶ میلی‌متری قرار دارد. طبق ESGAR 2026، MRF چگونه ارزیابی می‌شود؟"
  },
  "options": [
    {
      "de": "MRF+ wegen des unregelmäßigen tumorverdächtigen Knotens innerhalb von 1 mm",
      "en": "MRF+ because of the irregular suspicious node within 1 mm",
      "fa": "MRF مثبت است، چون غدهٔ نامنظم و مشکوک در فاصلهٔ حداکثر ۱ میلی‌متر قرار دارد"
    },
    {
      "de": "MRF−, weil der Primärtumor selbst mehr als 1 mm entfernt ist",
      "en": "MRF− because the primary tumour itself is more than 1 mm away",
      "fa": "MRF منفی است، چون خود تومور اولیه بیش از ۱ میلی‌متر فاصله دارد"
    },
    {
      "de": "MRF+ nur bei direkter Infiltration der Faszie durch den Primärtumor",
      "en": "MRF+ only with direct invasion of the fascia by the primary tumour",
      "fa": "MRF فقط در صورت تهاجم مستقیم تومور اولیه به فاسیا مثبت است"
    },
    {
      "de": "MRF+ allein wegen eines glatt berandeten Lymphknotens innerhalb von 1 mm",
      "en": "MRF+ based only on a smooth-bordered lymph node within 1 mm",
      "fa": "MRF مثبت فقط به‌دلیل یک غده با حاشیه صاف در فاصلهٔ حداکثر ۱ میلی‌متر"
    }
  ],
  "answer": 0,
  "rationale": {
    "de": "Ein Abstand von ≤1 mm durch einen unregelmäßigen tumorverdächtigen Knoten gilt als MRF-Beteiligung. Ein glatt berandeter Lymphknoten allein macht die MRF nicht positiv.",
    "en": "A margin of ≤1 mm from an irregular suspicious node indicates MRF involvement. A smooth-bordered lymph node alone does not make the MRF positive.",
    "fa": "فاصلهٔ حداکثر ۱ میلی‌متر از غدهٔ نامنظم و مشکوک به معنی درگیری MRF است. غدهٔ لنفاوی با حاشیهٔ صاف به‌تنهایی MRF را مثبت نمی‌کند."
  },
  "source": "https://doi.org/10.1007/s00330-025-12274-w",
  "wrongExplanations": {
    "B": {
      "de": "Die MRF-Beurteilung berücksichtigt neben dem Primärtumor auch EMVI und irreguläre tumorverdächtige Knoten; der beschriebene Knoten liegt innerhalb von 1 mm.",
      "en": "MRF assessment includes EMVI and irregular suspicious nodes as well as the primary tumour; the described irregular node is within 1 mm.",
      "fa": "ارزیابی MRF علاوه بر تومور اصلی، EMVI و غدد نامنظم مشکوک را هم لحاظ می‌کند؛ غدهٔ نامنظم توصیف‌شده در فاصلهٔ کمتر از ۱ میلی‌متر است."
    },
    "C": {
      "de": "Nach der benannten ESGAR-Fassung reicht ein Abstand von ≤1 mm zu den relevanten Tumorstrukturen für MRF-Beteiligung; sichtbares Durchwachsen der Faszie ist nicht erforderlich.",
      "en": "Under the named ESGAR version, distance ≤1 mm to the relevant tumour structures meets MRF involvement; visible penetration through the fascia is not required.",
      "fa": "در نسخهٔ نام‌بردهٔ ESGAR، فاصلهٔ ≤۱ میلی‌متر تا ساختارهای توموری مرتبط معیار درگیری MRF است؛ عبور قابل مشاهده از فاسیا الزامی نیست."
    },
    "D": {
      "de": "Ein glatt berandeter Lymphknoten allein wird in der benannten ESGAR-Fassung auch bei einem Abstand von ≤1 mm nicht als MRF-Beteiligung gewertet.",
      "en": "Under the named ESGAR version, a smooth-bordered node alone does not constitute MRF involvement even at distance ≤1 mm.",
      "fa": "در نسخهٔ نام‌بردهٔ ESGAR، غدهٔ با حاشیهٔ صاف به‌تنهایی حتی با فاصلهٔ ≤۱ میلی‌متر درگیری MRF محسوب نمی‌شود."
    }
  }
},
  'nephroblastom-wilms': item('Abdomen.pdf physical p. 52; Combrink & Beviss-Challinor 2021 (MRI claw-sign evidence, not directly transferable to CT)', L('Eine große inhomogene Raumforderung des Oberbauchs wird von normalem Nierenparenchym beidseits spitzwinklig umgriffen. Was stützt dieses Zeichen am stärksten?', 'A large heterogeneous upper-abdominal mass is partly wrapped by normal renal parenchyma with acute margins on both sides. What does this sign most strongly support?', 'توده‌ای بزرگ و ناهمگن در بخش فوقانی شکم دیده می‌شود که پارانشیم طبیعی کلیه از دو طرف با حاشیه‌های نوک‌تیز آن را در بر گرفته است. این علامت بیش از همه چه چیزی را تقویت می‌کند؟'), [L('Ursprung aus dem Nierenparenchym', 'Origin from the renal parenchyma', 'منشأ از پارانشیم کلیه'), L('Sicherer Ursprung aus der Nebenniere', 'Definite origin from the adrenal gland', 'منشأ قطعی از غده فوق کلیوی'), L('Beweis für eine bestimmte Histologie', 'Proof of a specific histology', 'اثبات یک بافت‌شناسی مشخص')], 0, L('Das Claw sign stützt einen renalen Ursprungsort, beweist aber keine Histologie und schließt Neuroblastom nicht aus. Die Winkelbeschreibung der PDF und eine MRI-Definition werden wegen der unterschiedlichen Modalität nicht gleichgesetzt.', 'The claw sign supports a renal site of origin but does not prove histology or exclude neuroblastoma. The PDF angle description and an MRI definition are not treated as equivalent because the modalities differ.', 'علامت claw از منشأ کلیوی حمایت می‌کند، اما بافت‌شناسی را ثابت نمی‌کند و نوروبلاستوما را رد نمی‌کند. توصیف زاویه در PDF و تعریف MRI به‌دلیل تفاوت روش تصویربرداری معادل دانسته نمی‌شوند.')),
  'abdomen-ileus-ischaemia': {
  "question": {
    "de": "Bei Dünndarmobstruktion zeigt die CT eine Closed-loop-Konfiguration, verminderte Wandkontrastierung und diffuse mesenteriale Trübung. Welche Befundbewertung ist am besten?",
    "en": "In small-bowel obstruction, CT shows a closed-loop configuration, reduced mural enhancement and diffuse mesenteric haziness. Which interpretation fits best?",
    "fa": "در انسداد رودهٔ باریک، CT نمای لوپ بسته، کاهش تقویت دیواره و کدورت منتشر مزانتر را نشان می‌دهد. کدام ارزیابی مناسب‌تر است؟"
  },
  "options": [
    {
      "de": "Verdacht auf Strangulation mit Ischämie; dringlich kommunizieren und mit Klinik und Gefäß-/Mesenterialbefund zusammenführen.",
      "en": "Concern for strangulation with ischaemia; communicate urgently and integrate clinical, vascular and mesenteric findings.",
      "fa": "شک به اختناق همراه ایسکمی؛ فوری اعلام و با بالین و یافته‌های عروقی و مزانتریک تلفیق شود."
    },
    {
      "de": "Unkomplizierte mechanische Obstruktion ohne Hinweis auf eine Durchblutungsstörung.",
      "en": "Uncomplicated mechanical obstruction without evidence of perfusion impairment.",
      "fa": "انسداد مکانیکی بدون عارضه و بدون شواهد اختلال خون‌رسانی."
    },
    {
      "de": "Nichtmechanischer paralytischer Ileus als Erklärung des Closed-loop-Musters.",
      "en": "Nonmechanical paralytic ileus explaining the closed-loop pattern.",
      "fa": "ایلئوس فلجی غیرمکانیکی به‌عنوان توضیح الگوی لوپ بسته."
    },
    {
      "de": "Chronisch-entzündliche Wandveränderung ohne akuten Komplikationsverdacht.",
      "en": "Chronic inflammatory mural change without concern for an acute complication.",
      "fa": "تغییر التهابی مزمن دیواره بدون شک به عارضهٔ حاد."
    }
  ],
  "answer": 0,
  "rationale": {
    "de": "Die Kombination aus verminderter Wandkontrastierung, mesenterialer Trübung und Closed-loop-Mechanismus war in der Originalkohorte mit Strangulation assoziiert. Der Befund ist dringlich; eine sichere Aussage zur Irreversibilität oder zum genauen Resektionsumfang ergibt sich daraus allein nicht.",
    "en": "Reduced mural enhancement, mesenteric haziness and a closed-loop mechanism were associated with strangulation in the original cohort. This warrants urgency; it does not alone establish irreversibility or exact resection extent.",
    "fa": "ترکیب کاهش تقویت دیواره، کدورت مزانتر و مکانیسم لوپ بسته در کوهورت اصلی با اختناق ارتباط داشت. یافته فوری است؛ به‌تنهایی برگشت‌ناپذیری یا وسعت دقیق رزکسیون را قطعی نمی‌کند."
  },
  "source": "https://pubmed.ncbi.nlm.nih.gov/28759326/",
  "wrongExplanations": {
    "B": {
      "de": "Verminderte Kontrastierung und die kombinierte mesenteriale/Closed-loop-Konstellation sprechen gegen eine unauffällige Perfusionsbewertung.",
      "en": "Reduced enhancement and the combined mesenteric/closed-loop pattern argue against an uncomplicated perfusion assessment.",
      "fa": "کاهش تقویت و مجموعهٔ مزانتریک و لوپ بسته، خلاف ارزیابی خون‌رسانی بدون عارضه‌اند."
    },
    "C": {
      "de": "Eine Closed-loop-Konfiguration beschreibt einen mechanischen Schlingenverschluss, nicht die typische diffuse nichtmechanische Dilatation.",
      "en": "A closed-loop configuration describes mechanical loop obstruction rather than typical diffuse nonmechanical dilatation.",
      "fa": "نمای لوپ بسته، انسداد مکانیکی لوپ است، نه اتساع منتشر معمولِ غیرمکانیکی."
    },
    "D": {
      "de": "Das beschriebene akute Obstruktions-/Minderperfusionsmuster darf nicht allein als chronische Wandveränderung eingestuft werden.",
      "en": "The described acute obstruction/hypoperfusion pattern should not be classified merely as chronic mural change.",
      "fa": "الگوی حاد انسداد و کم‌خون‌رسانی توصیف‌شده نباید صرفاً تغییر مزمن دیواره تلقی شود."
    }
  }
},
  'abdomen-mesenteric-ischaemia-cta-protocol': {
  "question": {
    "de": "Bei klinischem Verdacht auf akute mesenteriale Ischämie: welches CT-Akquisitionsprotokoll passt zur ESVS-Empfehlung 33 von 2025?",
    "en": "For suspected acute mesenteric ischaemia, which CT acquisition protocol fits ESVS2025 recommendation33?",
    "fa": "در شک بالینی به ایسکمی حاد مزانتریک، کدام پروتکل برداشت CT با توصیهٔ ۳۳ راهنمای ESVS2025 مطابقت دارد؟"
  },
  "options": [
    {
      "de": "Dringliche arterielle und venöse CTA mit Schichten ≤1 mm; nativ optional ergänzen.",
      "en": "Urgent arterial and venous CTA with slices ≤1 mm; optional unenhanced acquisition.",
      "fa": "CTA فوری در فاز شریانی و وریدی با برش ≤۱ میلی‌متر؛ برداشت بدون تزریق اختیاری است."
    },
    {
      "de": "Portalvenöse CT ohne arterielle Akquisition mit alleiniger 5-mm-Rekonstruktion.",
      "en": "Portal venous CT without arterial acquisition, using only 5-mm reconstruction.",
      "fa": "CT پورتال وریدی بدون برداشت شریانی، فقط با بازسازی ۵ میلی‌متری."
    },
    {
      "de": "Arterielle Dünnschicht-CTA ohne venöse Akquisition.",
      "en": "Thin-slice arterial CTA without venous acquisition.",
      "fa": "CTA شریانی با برش نازک بدون برداشت وریدی."
    },
    {
      "de": "Native Dünnschicht-CT ohne kontrastverstärkte Akquisition.",
      "en": "Unenhanced thin-slice CT without a contrast-enhanced acquisition.",
      "fa": "CT بدون تزریق با برش نازک و بدون برداشت پس از تزریق."
    }
  ],
  "answer": 0,
  "rationale": {
    "de": "Empfehlung 33 fordert bei Verdacht eine dringliche arterielle und venöse CTA mit dünnen Schichten; nativ kann ergänzt werden. Die Empfehlung gilt ausdrücklich unabhängig von der Nierenfunktion.",
    "en": "Recommendation 33 calls for urgent arterial and venous CTA with thin sections; a non-contrast phase may be added. It explicitly applies regardless of renal function.",
    "fa": "توصیهٔ ۳۳ در صورت شک، CTA فوری در فازهای شریانی و وریدی با برش‌های نازک را مطرح می‌کند؛ فاز بدون تزریق را می‌توان افزود. این توصیه صراحتاً مستقل از عملکرد کلیه است."
  },
  "source": "https://doi.org/10.1016/j.ejvs.2025.06.010",
  "wrongExplanations": {
    "B": {
      "de": "Ohne arterielle Phase fehlt die gezielte Beurteilung des arteriellen Verschlusses; allein 5-mm-Schichten entsprechen zudem nicht der Dünnschichtempfehlung.",
      "en": "Without arterial imaging, targeted arterial occlusion assessment is missing; 5-mm slices alone also do not meet the thin-slice recommendation.",
      "fa": "بدون فاز شریانی، ارزیابی هدفمند انسداد شریانی ناقص است؛ برش‌های صرفاً ۵ میلی‌متری نیز با توصیهٔ برش نازک مطابقت ندارند."
    },
    "C": {
      "de": "Eine arterielle Phase allein ergänzt die venöse Gefäß- und Darmbeurteilung nicht; Empfehlung33 fordert beide Phasen.",
      "en": "Arterial imaging alone lacks the venous vascular and bowel assessment; recommendation33 calls for both phases.",
      "fa": "فاز شریانی به‌تنهایی ارزیابی وریدی عروق و روده را کامل نمی‌کند؛ توصیهٔ ۳۳ هر دو فاز را می‌خواهد."
    },
    "D": {
      "de": "Eine native Untersuchung zeigt keine kontrastverstärkte Gefäßdarstellung oder Wandperfusion und ersetzt die empfohlene CTA nicht.",
      "en": "Unenhanced CT does not show contrast-enhanced vessels or mural perfusion and does not replace the recommended CTA.",
      "fa": "CT بدون تزریق، نمایش عروق پس از تزریق یا خون‌رسانی دیواره را نشان نمی‌دهد و جای CTA توصیه‌شده را نمی‌گیرد."
    }
  }
},
  'thorax-lung-abscess-empyema': item('Thorax.pdf p.26; Williford ME, Godwin JD. Computed Tomography of Lung Abscess and Empyema. Radiol Clin North Am. 1983;21(3):575–583. PMID 6635173', L('Welche Herangehensweise hilft, einen Lungenabszess von einem Pleuraempyem abzugrenzen?', 'Which approach helps distinguish a lung abscess from pleural empyema?', 'کدام رویکرد به افتراق آبسهٔ ریه از آمپیم پلور کمک می‌کند؟'), [L('Lage im Lungenparenchym oder Pleuraspalt und Morphologie gemeinsam beurteilen; ein Luft-Flüssigkeitsspiegel allein ist nicht spezifisch.', 'Assess whether the collection is in lung parenchyma or the pleural space and consider its morphology; an air-fluid level alone is not specific.', 'محل ضایعه در پارانشیم ریه یا فضای پلور را همراه با مورفولوژی ارزیابی کنید؛ سطح هواـمایع به‌تنهایی اختصاصی نیست.'), L('Jeder Luft-Flüssigkeitsspiegel beweist einen Lungenabszess.', 'Any air-fluid level proves a lung abscess.', 'هر سطح هواـمایع آبسهٔ ریه را ثابت می‌کند.'), L('Ein Empyem liegt immer im Lungenparenchym und hat dieselbe Form wie ein Abszess.', 'An empyema is always within lung parenchyma and has the same shape as an abscess.', 'آمپیم همیشه در پارانشیم ریه قرار دارد و شکلی مانند آبسه دارد.')], 0, L('Thorax.pdf und der CT-Review beschreiben den Abszess als intraparenchymalen Prozess und betonen die Abgrenzung zum pleuralen Empyem. Luft-Flüssigkeitsspiegel können in unterschiedlichen Hohlräumen vorkommen und legen die Ursache nicht allein fest.', 'Thorax.pdf and the CT review describe abscess as an intraparenchymal process and emphasise distinction from pleural empyema. Air-fluid levels can occur in different cavities and do not determine the cause on their own.', 'Thorax.pdf و مرور CT آبسه را فرایندی داخل پارانشیمی توصیف می‌کنند و بر افتراق آن از آمپیم پلور تأکید دارند. سطح هواـمایع در فضاهای مختلف دیده می‌شود و به‌تنهایی علت را مشخص نمی‌کند.')),

}
