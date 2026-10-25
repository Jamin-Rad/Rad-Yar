// Authored remediation items. Coverage records document goals, not release approval.
const L=(de,en,fa)=>({de,en,fa})
const pick=(value,lang)=>value?.[lang]??value?.de??value
const records=[
  {
    "key": "annotated-alignment-limit",
    "topicId": "radiuskoepfchenfraktur",
    "question": {
      "de": "Welcher Kurzbefund bleibt bei der gezeigten annotierten Lehrabbildung auf die belegbare Aussage beschränkt?",
      "en": "Which brief report stays within what the annotated teaching image establishes?",
      "fa": "کدام گزارش کوتاه به آنچه تصویر آموزشی علامت‌گذاری‌شده نشان می‌دهد محدود می‌ماند؟"
    },
    "options": [
      {
        "de": "Isolierte Radiusköpfchenluxation ohne begleitende Fraktur.",
        "en": "Isolated radial-head dislocation without an associated fracture.",
        "fa": "دررفتگی منفرد سر رادیوس بدون شکستگی همراه."
      },
      {
        "de": "Radiokapitellare Fehlstellung; Frakturmorphologie und gesamte Gelenkstellung zusätzlich beurteilen.",
        "en": "Radiocapitellar malalignment; additionally assess fracture morphology and overall joint alignment.",
        "fa": "بدراستایی رادیوکاپیتلار؛ مورفولوژی شکستگی و وضعیت کلی مفصل نیز ارزیابی شوند."
      },
      {
        "de": "Radiusköpfchenfraktur mit Ellenbogenluxation, entsprechend Mason IV.",
        "en": "Radial-head fracture with elbow dislocation, corresponding to Mason IV.",
        "fa": "شکستگی سر رادیوس همراه دررفتگی آرنج، مطابق ماسون IV."
      },
      {
        "de": "Mehrfragmentäre Radiusköpfchenfraktur, entsprechend Mason III.",
        "en": "Comminuted radial-head fracture, corresponding to Mason III.",
        "fa": "شکستگی خردشدهٔ سر رادیوس، مطابق ماسون III."
      }
    ],
    "correct": "B",
    "explanation": {
      "de": "Die markierte Beziehung von Radius und Capitulum ist eine Stellungsinformation. Sie ersetzt weder die Beschreibung einer Fraktur noch die Stabilitäts- oder Nervenuntersuchung. Die Abbildung allein rechtfertigt daher kein vollständiges Mason-IV-Label.",
      "en": "The marked radius–capitellum relationship describes alignment. It does not replace fracture characterisation, stability assessment or a nerve examination. This image alone therefore does not justify a complete Mason IV label.",
      "fa": "رابطهٔ علامت‌گذاری‌شدهٔ رادیوس و کاپیتولوم دربارهٔ هم‌راستایی است. جای توصیف شکستگی، ارزیابی پایداری یا معاینهٔ عصبی را نمی‌گیرد؛ بنابراین این تصویر به‌تنهایی برچسب کامل ماسون IV را توجیه نمی‌کند."
    },
    "wrongExplanations": {
      "A": {
        "de": "Die markierte Fehlstellung belegt nicht, dass eine begleitende Fraktur ausgeschlossen ist.",
        "en": "The marked malalignment does not establish that an associated fracture has been excluded.",
        "fa": "بدراستایی علامت‌گذاری‌شده ثابت نمی‌کند که شکستگی همراه رد شده است."
      },
      "C": {
        "de": "Die Abbildung zeigt eine gestörte radiokapitellare Beziehung; die vollständige Kombination aus Radiuskopffraktur und Ellenbogenluxation ist damit nicht belegt.",
        "en": "The image shows an abnormal radiocapitellar relationship; this does not establish the full combination of radial-head fracture and elbow dislocation.",
        "fa": "تصویر رابطهٔ غیرطبیعی رادیوکاپیتلار را نشان می‌دهد؛ ترکیب کامل شکستگی سر رادیوس و دررفتگی آرنج از آن اثبات نمی‌شود."
      },
      "D": {
        "de": "Eine Mason-III-Zuordnung erfordert die Beurteilung der mehrfragmentären Frakturmorphologie; die Achsmarkierung liefert diese Information nicht.",
        "en": "Mason III requires assessment of comminuted fracture morphology; the axis annotation does not supply that information.",
        "fa": "تعیین ماسون III نیازمند بررسی مورفولوژی شکستگی خردشده است؛ علامت‌گذاری محور این اطلاعات را فراهم نمی‌کند."
      }
    },
    "image": {
      "src": "/radiuskopf/mason-iv-luxation.jpeg",
      "alt": {
        "de": "Zwei annotierte Ellenbogen-Röntgenausschnitte mit verfehlter radiokapitellarer Ausrichtung.",
        "en": "Two annotated elbow radiograph crops showing radiocapitellar malalignment.",
        "fa": "دو برش رادیوگرافی آرنج با علامت‌گذاری بدراستایی رادیوکاپیتلار."
      },
      "caption": {
        "de": "Vorhandene annotierte Lehrabbildung: die Aufgabe betrifft ihre Aussagegrenze, keine vollständige Frakturklassifikation.",
        "en": "Existing annotated teaching image: the task concerns its evidentiary limit, not full fracture classification.",
        "fa": "تصویر آموزشی موجود و علامت‌گذاری‌شده؛ پرسش دربارهٔ حدود نتیجه‌گیری از آن است، نه طبقه‌بندی کامل شکستگی."
      },
      "credit": {
        "de": "Vorhandenes Unterrichtsmaterial · sichtbare Bildmarke: Radiology Expert",
        "en": "Existing teaching material · visible image mark: Radiology Expert",
        "fa": "محتوای آموزشی موجود · نشان قابل مشاهدهٔ تصویر: Radiology Expert"
      }
    },
    "sources": [
      "Existing authorised lesson teaching image /radiuskopf/mason-iv-luxation.jpeg; visual inspection 2026-10-25"
    ]
  },
  {
    "key": "report-distal-reference",
    "topicId": "frakturbeschreibung",
    "question": {
      "de": "Eine beschriebene Schaftfraktur der rechten Tibia hat ein dorsal um eine halbe Schaftbreite versetztes distales Fragment und 6 mm Verkürzung. Welche Formulierung gibt diese Angaben korrekt wieder?",
      "en": "A described right tibial shaft fracture has its distal fragment translated dorsally by half a shaft width and 6 mm of shortening. Which report accurately conveys those findings?",
      "fa": "در شرح یک شکستگی تنهٔ تیبیای راست، قطعهٔ دیستال به اندازهٔ نصف عرض تنه به دورسال جابه‌جا شده و ۶ میلی‌متر کوتاهی وجود دارد. کدام گزارش این داده‌ها را درست منتقل می‌کند؟"
    },
    "options": [
      {
        "de": "Rechte Tibiaschaftfraktur mit dorsaler Translation des distalen Fragments um eine halbe Schaftbreite und 6 mm Verkürzung.",
        "en": "Right tibial shaft fracture with dorsal translation of the distal fragment by half a shaft width and 6 mm shortening.",
        "fa": "شکستگی تنهٔ تیبیای راست با جابه‌جایی دورسال قطعهٔ دیستال به اندازهٔ نصف عرض تنه و ۶ میلی‌متر کوتاهی."
      },
      {
        "de": "Rechte Tibiaschaftfraktur mit ventraler Translation des distalen Fragments um eine halbe Schaftbreite und 6 mm Verkürzung.",
        "en": "Right tibial shaft fracture with ventral translation of the distal fragment by half a shaft width and 6 mm shortening.",
        "fa": "شکستگی تنهٔ تیبیای راست با جابه‌جایی ونترال قطعهٔ دیستال به اندازهٔ نصف عرض تنه و ۶ میلی‌متر کوتاهی."
      },
      {
        "de": "Linke Tibiaschaftfraktur mit dorsaler Translation des distalen Fragments um eine halbe Schaftbreite und 6 mm Verkürzung.",
        "en": "Left tibial shaft fracture with dorsal translation of the distal fragment by half a shaft width and 6 mm shortening.",
        "fa": "شکستگی تنهٔ تیبیای چپ با جابه‌جایی دورسال قطعهٔ دیستال به اندازهٔ نصف عرض تنه و ۶ میلی‌متر کوتاهی."
      },
      {
        "de": "Rechte Tibiaschaftfraktur mit dorsaler Angulation von 50° und ohne Verkürzung.",
        "en": "Right tibial shaft fracture with 50° dorsal angulation and no shortening.",
        "fa": "شکستگی تنهٔ تیبیای راست با زاویه‌داری دورسال ۵۰ درجه و بدون کوتاهی."
      }
    ],
    "correct": "A",
    "explanation": {
      "de": "Die Richtung bezieht sich auf das distale relativ zum proximalen Fragment. Translation in Schaftbreiten ist kein Winkel; Seite und gemessene Verkürzung müssen erhalten bleiben.",
      "en": "Direction refers to the distal relative to the proximal fragment. Translation in shaft widths is not an angle; preserve the side and measured shortening.",
      "fa": "جهت بر اساس قطعهٔ دیستال نسبت به پروگزیمال بیان می‌شود. جابه‌جایی بر حسب عرض تنه، زاویه نیست؛ سمت و کوتاهی اندازه‌گیری‌شده نیز باید حفظ شوند."
    },
    "wrongExplanations": {
      "B": {
        "de": "Ventral kehrt die vorgegebene dorsale Richtung um.",
        "en": "Ventral reverses the specified dorsal direction.",
        "fa": "ونترال جهت دورسالِ داده‌شده را معکوس می‌کند."
      },
      "C": {
        "de": "Die vorgegebene Seite ist rechts, nicht links.",
        "en": "The specified side is right, not left.",
        "fa": "سمت داده‌شده راست است، نه چپ."
      },
      "D": {
        "de": "Eine halbe Schaftbreite beschreibt Translation, nicht 50° Angulation; zudem fehlt die Verkürzung.",
        "en": "Half a shaft width describes translation, not 50° angulation; shortening is also lost.",
        "fa": "نصف عرض تنه جابه‌جایی را توصیف می‌کند، نه زاویهٔ ۵۰ درجه؛ کوتاهی نیز حذف شده است."
      }
    },
    "sources": [
      "Existing lesson FRAKTUR_LESSON.befund.example; no new clinical threshold"
    ]
  },
  {
    "topicId": "morbus-perthes",
    "key": "early-mri",
    "question": {
      "de": "Bei einem Kind bestehen belastungsabhängiges Hinken und Hüftschmerz fort; die erste Röntgenaufnahme zeigt noch keine eindeutige Femurkopfveränderung. Bei weiter bestehendem Perthes-Verdacht: Welche Aussage zur Zusatzbildgebung trifft zu?",
      "en": "A child has persistent activity-related limp and hip pain, but initial radiographs show no definite femoral-head abnormality. With continuing suspicion of Perthes disease, which statement about additional imaging is correct?",
      "fa": "کودکی همچنان هنگام فعالیت می‌لنگد و درد لگن دارد، اما رادیوگرافی اولیه تغییر واضح سر فمور نشان نمی‌دهد. در صورت تداوم شک به پرتس، کدام گزاره دربارهٔ تصویربرداری تکمیلی درست است؟"
    },
    "options": [
      {
        "de": "Die MRT kann frühe Veränderungen zeigen, bevor sie im Röntgen sichtbar werden.",
        "en": "MRI can show early changes before they become radiographically visible.",
        "fa": "MRI می‌تواند تغییرات زودرس را پیش از آشکارشدن در رادیوگرافی نشان دهد."
      },
      {
        "de": "Eine MRT ist erst nach sichtbarer Fragmentierung zur Erkennung einer Nekrose hilfreich.",
        "en": "MRI becomes useful for detecting necrosis only after visible fragmentation.",
        "fa": "MRI فقط پس از قطعه‌قطعه‌شدن قابل مشاهده برای شناسایی نکروز مفید می‌شود."
      },
      {
        "de": "Eine Sonographie des Ergusses ersetzt die Untersuchung der epiphysären Knochenmarkveränderung.",
        "en": "Ultrasound assessment of effusion replaces assessment of epiphyseal marrow change.",
        "fa": "بررسی سونوگرافیک افیوژن جای ارزیابی تغییر مغز استخوان اپی‌فیز را می‌گیرد."
      },
      {
        "de": "Eine frühe Nekrose wird durch die unauffällige erste Röntgenaufnahme ausreichend ausgeschlossen.",
        "en": "An unremarkable initial radiograph adequately excludes early necrosis.",
        "fa": "رادیوگرافی اولیهٔ غیرقابل‌توجه برای رد نکروز زودرس کافی است."
      }
    ],
    "correct": "A",
    "explanation": {
      "de": "Bei anhaltendem klinischem Verdacht kann die MRT frühe Femurkopfveränderungen darstellen, die im Röntgen noch fehlen. Die Bildgebung bleibt mit Untersuchung und Verlauf zu verbinden; aus kleinen historischen Studien wird hier keine allgemeine Sensitivität abgeleitet.",
      "en": "When clinical suspicion persists, MRI can depict early femoral-head changes absent on radiographs. Correlate imaging with examination and follow-up; no universal sensitivity is inferred from small historical studies.",
      "fa": "با تداوم شک بالینی، MRI می‌تواند تغییرات زودرس سر فمور را نشان دهد که در رادیوگرافی هنوز وجود ندارند. تصویربرداری باید با معاینه و سیر بالینی سنجیده شود؛ از مطالعات کوچک تاریخی حساسیت همگانی نتیجه گرفته نمی‌شود."
    },
    "wrongExplanations": {
      "B": {
        "de": "Der Zusatznutzen liegt gerade in möglichen Veränderungen vor der radiographischen Fragmentierung.",
        "en": "The added value includes changes before radiographic fragmentation.",
        "fa": "ارزش افزوده دقیقاً شامل تغییرات احتمالی پیش از قطعه‌قطعه‌شدن رادیوگرافیک است."
      },
      "C": {
        "de": "Ein Erguss ist kein spezifischer Nachweis oder Ausschluss einer epiphysären Osteonekrose.",
        "en": "Effusion neither specifically establishes nor excludes epiphyseal osteonecrosis.",
        "fa": "افیوژن به‌طور اختصاصی استئونکروز اپی‌فیزی را نه اثبات و نه رد می‌کند."
      },
      "D": {
        "de": "Frühe Röntgenbilder können trotz später bestätigter Erkrankung unauffällig sein.",
        "en": "Early radiographs may be unremarkable despite subsequently confirmed disease.",
        "fa": "رادیوگرافی زودرس ممکن است با وجود تأیید بعدی بیماری غیرقابل‌توجه باشد."
      }
    },
    "sources": [
      "https://pubmed.ncbi.nlm.nih.gov/2915033/",
      "https://pubmed.ncbi.nlm.nih.gov/1837398/"
    ]
  },
  {
    "topicId": "morbus-perthes",
    "key": "source-image-morphology",
    "question": {
      "de": "Die Quellabbildung ist mit „nach 10 Monaten“ bezeichnet. Welche Morphologie dominiert am rechten Femurkopf?",
      "en": "The source image is labelled “after 10 months.” Which morphology predominates at the right femoral head?",
      "fa": "تصویر منبع با «پس از ۱۰ ماه» مشخص شده است. کدام مورفولوژی در سر فمور راست غالب است؟"
    },
    "options": [
      {
        "de": "Runde, gleichmäßig ossifizierte Epiphyse mit erhaltener Höhe.",
        "en": "Round, uniformly ossified epiphysis with preserved height.",
        "fa": "اپی‌فیز گرد با استخوانی‌شدن یکنواخت و ارتفاع حفظ‌شده."
      },
      {
        "de": "Abgeflachte, unregelmäßig fragmentierte Femurkopfepiphyse.",
        "en": "Flattened, irregularly fragmented femoral-head epiphysis.",
        "fa": "اپی‌فیز سر فمور صاف‌شده و به‌طور نامنظم قطعه‌قطعه‌شده."
      },
      {
        "de": "Isolierte Gelenkspaltverschmälerung bei erhaltener runder Kopfkontur.",
        "en": "Isolated joint-space narrowing with a preserved round head contour.",
        "fa": "تنگی منفرد فضای مفصل با حفظ شکل گرد سر فمور."
      },
      {
        "de": "Isolierte Aufhellung im Femurhals bei erhaltener Epiphysenhöhe.",
        "en": "Isolated femoral-neck lucency with preserved epiphyseal height.",
        "fa": "شفافیت منفرد گردن فمور با ارتفاع حفظ‌شدهٔ اپی‌فیز."
      }
    ],
    "correct": "B",
    "explanation": {
      "de": "Im Verlauf systematisch Dichte, Ossifikationsstruktur, Epiphysenhöhe und Kontur vergleichen und Veränderungen mit der Voruntersuchung beschreiben. Diese Befund-Checkliste bestimmt allein weder die individuelle Prognose noch die Therapie.",
      "en": "During follow-up, systematically compare density, ossification structure, epiphyseal height and contour with prior imaging. This reporting checklist alone determines neither individual prognosis nor treatment.",
      "fa": "در پیگیری، دانسیته، ساختار استخوان‌سازی، ارتفاع اپی‌فیز و کانتور را به‌طور نظام‌مند با بررسی قبلی مقایسه و تغییرات را توصیف کنید. این چک‌لیست گزارش به‌تنهایی پیش‌آگهی یا درمان فردی را تعیین نمی‌کند."
    },
    "wrongExplanations": {
      "A": {
        "de": "Die rechte Epiphyse ist sichtbar abgeflacht und unregelmäßig, nicht gleichmäßig rund.",
        "en": "The right epiphysis is visibly flattened and irregular, not uniformly round.",
        "fa": "اپی‌فیز راست آشکارا صاف‌شده و نامنظم است، نه گرد و یکنواخت."
      },
      "C": {
        "de": "Die auffällige Veränderung betrifft die Kopfepiphyse; eine erhaltene runde Kontur ist nicht gegeben.",
        "en": "The conspicuous change involves the head epiphysis; its round contour is not preserved.",
        "fa": "تغییر شاخص مربوط به اپی‌فیز سر است؛ شکل گرد آن حفظ نشده است."
      },
      "D": {
        "de": "Der Befund ist nicht auf den Hals begrenzt; die Epiphyse selbst zeigt Höhenverlust und Formänderung.",
        "en": "The finding is not confined to the neck; the epiphysis itself has lost height and changed shape.",
        "fa": "یافته به گردن محدود نیست؛ خود اپی‌فیز کاهش ارتفاع و تغییر شکل دارد."
      }
    },
    "image": {
      "src": "/educational/perthes/rid-9742-10-months.jpg",
      "alt": {
        "de": "Beckenübersicht und Lauenstein-Ausschnitt mit abgeflachtem und unregelmäßigem rechtem Femurkopf.",
        "en": "Pelvic overview and Lauenstein crop with a flattened irregular right femoral head.",
        "fa": "نمای کلی لگن و برش لائونشتاین با سر فمور راستِ صاف‌شده و نامنظم."
      },
      "caption": {
        "de": "MSK.pdf, PDF S.126 / Druck S.125; beschrifteter Zeitpunkt nach 10 Monaten.",
        "en": "MSK.pdf, PDF p. 126 / printed p. 125; labelled time point after 10 months.",
        "fa": "MSK.pdf، صفحهٔ PDF۱۲۶ / چاپی۱۲۵؛ زمانِ برچسب‌گذاری‌شده پس از۱۰ماه."
      },
      "credit": "H. Salam · Radiopaedia.org · rID: 9742",
      "sourceUrl": "https://doi.org/10.53347/rID-9742"
    },
    "sources": [
      "MSK.pdf physicalp126; actual page and stored image viewed2026-10-25",
      "https://doi.org/10.53347/rID-9742"
    ]
  },
  {
    "topicId": "chondrokalzinose",
    "key": "radiograph-pattern",
    "question": {
      "de": "Welches sichtbare Merkmal im gezeigten Knieausschnitt unterstützt eine meniskale Chondrokalzinose?",
      "en": "Which visible feature in this knee crop supports meniscal chondrocalcinosis?",
      "fa": "کدام ویژگی قابل مشاهده در این برش زانو، کندروکلسی‌نوز منیسک را پشتیبانی می‌کند؟"
    },
    "options": [
      {
        "de": "Feine lineare Verkalkungen im meniskalen Gelenkspaltbereich.",
        "en": "Fine linear calcification in the meniscal joint-space region.",
        "fa": "کلسیفیکاسیون خطی ظریف در ناحیهٔ منیسکِ فضای مفصل."
      },
      {
        "de": "Subchondrale Sklerose an den belasteten Gelenkflächen.",
        "en": "Subchondral sclerosis at the weight-bearing articular surfaces.",
        "fa": "اسکلروز زیرغضروفی در سطوح مفصلی تحمل‌کنندهٔ وزن."
      },
      {
        "de": "Randständige knöcherne Anbauten an der Gelenkkontur.",
        "en": "Marginal bony spurs at the joint contour.",
        "fa": "زوائد استخوانی حاشیه‌ای در لبهٔ مفصل."
      },
      {
        "de": "Einengung des femorotibialen Gelenkspalts.",
        "en": "Narrowing of the femorotibial joint space.",
        "fa": "تنگ‌شدن فضای مفصل فموروتیبیال."
      }
    ],
    "correct": "A",
    "explanation": {
      "de": "Feine lineare Dichten im meniskalen Bereich stützen den Bildbefund Chondrokalzinose. Sklerose, Osteophyten oder Gelenkspaltverschmälerung können zusätzlich bestehen, sind aber nicht das hier gesuchte Kalzifikationszeichen. Daraus allein lässt sich kein akuter CPPD-Schub ableiten.",
      "en": "Fine linear densities in the meniscal region support the imaging finding of chondrocalcinosis. Sclerosis, osteophytes or joint-space narrowing may coexist, but are not the calcification sign asked for. This finding alone does not establish an acute CPPD flare.",
      "fa": "کدورت‌های خطی ظریف در ناحیهٔ منیسک، یافتهٔ تصویری کندروکلسی‌نوز را پشتیبانی می‌کنند. اسکلروز، استئوفیت یا تنگی فضای مفصل ممکن است هم‌زمان باشند، اما علامت کلسیفیکاسیون مورد پرسش نیستند. این یافته به‌تنهایی حملهٔ حاد CPPD را اثبات نمی‌کند."
    },
    "wrongExplanations": {
      "B": {
        "de": "Subchondrale Sklerose liegt im Knochen unter dem Knorpel, nicht als feine Linie im Meniskus.",
        "en": "Subchondral sclerosis lies in bone beneath cartilage, not as a fine meniscal line.",
        "fa": "اسکلروز زیرغضروفی در استخوان زیر غضروف است، نه به‌شکل خطی ظریف در منیسک."
      },
      "C": {
        "de": "Osteophyten sind knöcherne Randanbauten; sie sind von meniskalen Verkalkungslinien zu trennen.",
        "en": "Osteophytes are marginal bony spurs, distinct from meniscal calcific lines.",
        "fa": "استئوفیت‌ها زوائد استخوانی حاشیه‌اند و با خطوط کلسیفیکاسیون منیسک تفاوت دارند."
      },
      "D": {
        "de": "Die Gelenkspaltweite beschreibt einen anderen Befund und weist für sich keine meniskale Verkalkung nach.",
        "en": "Joint-space width is a separate finding and does not itself demonstrate meniscal calcification.",
        "fa": "پهنای فضای مفصل یافته‌ای جداگانه است و به‌خودی‌خود کلسیفیکاسیون منیسک را نشان نمی‌دهد."
      }
    },
    "image": {
      "src": "/msk/knie/chondrokalzinose/msk-p56-rid-22147-joint-detail.jpg",
      "alt": {
        "de": "Vergrößerter Ausschnitt des femorotibialen Gelenkspalts einer Knie-Röntgenaufnahme.",
        "en": "Magnified femorotibial joint-space crop from a knee radiograph.",
        "fa": "برش بزرگ‌شدهٔ فضای مفصل فموروتیبیال در رادیوگرافی زانو."
      },
      "caption": {
        "de": "Vorhandener Quellausschnitt aus MSK.pdf, PDF S.56 / Druck S.55.",
        "en": "Existing source crop from MSK.pdf, PDF p.56 / printed p.55.",
        "fa": "برش موجود از MSK.pdf، صفحهٔ PDF۵۶ / چاپی۵۵."
      },
      "credit": "Radiopaedia.org · rID: 22147",
      "sourceUrl": "https://radiopaedia.org/cases/22147"
    },
    "sources": [
      "https://pubmed.ncbi.nlm.nih.gov/11566703/",
      "https://pmc.ncbi.nlm.nih.gov/articles/PMC11103298/",
      "MSK.pdf physicalp56; actual stored joint-detail image inspected2026-10-25"
    ]
  },
  {
    "topicId": "chondrokalzinose",
    "key": "mri-correlation",
    "question": {
      "de": "Im Röntgen sind meniskale Verkalkungen bekannt. Die MRT zeigt erhöhtes PD-Signal im Meniskus, aber keinen sicheren Oberflächenkontakt oder Formdefekt. Welche Vorgehensweise ist am besten begründet?",
      "en": "Radiographs show meniscal calcification. MRI shows increased meniscal PD signal without definite surface contact or a morphological defect. Which approach is best justified?",
      "fa": "در رادیوگرافی کلسیفیکاسیون منیسک وجود دارد. MRI افزایش سیگنال PD در منیسک را بدون تماس قطعی با سطح یا نقص شکل نشان می‌دهد. کدام رویکرد توجیه بهتری دارد؟"
    },
    "options": [
      {
        "de": "Das Signal als degenerativen Horizontalriss einordnen; Oberflächen- und Formzeichen nachrangig behandeln.",
        "en": "Assign the signal to a degenerative horizontal tear, giving surface and shape signs less weight.",
        "fa": "سیگنال را پارگی افقی دژنراتیو بدانید و به نشانه‌های سطح و شکل اهمیت کمتری بدهید."
      },
      {
        "de": "Das Signal als Aktivitätszeichen werten und damit einen akuten CPPD-Schub zuordnen.",
        "en": "Treat the signal as an activity marker and assign an acute CPPD flare.",
        "fa": "سیگنال را نشانهٔ فعالیت بدانید و بر این اساس حملهٔ حاد CPPD تعیین کنید."
      },
      {
        "de": "Röntgenkorrelation und unabhängige Oberflächen-/Formzeichen prüfen, bevor ein Riss zugeordnet wird.",
        "en": "Correlate radiographs and assess independent surface/shape signs before assigning a tear.",
        "fa": "پیش از تعیین پارگی، تطابق با رادیوگرافی و نشانه‌های مستقل سطح و شکل را بررسی کنید."
      },
      {
        "de": "Das Signal den Verkalkungen zuordnen und die weitere Suche nach einer begleitenden Meniskusläsion beenden.",
        "en": "Attribute the signal to calcification and stop looking for a coexisting meniscal lesion.",
        "fa": "سیگنال را به کلسیفیکاسیون نسبت دهید و جستجوی ضایعهٔ همراه منیسک را پایان دهید."
      }
    ],
    "correct": "C",
    "explanation": {
      "de": "Chondrokalzinose kann signalreich erscheinen und einen Riss imitieren; ein echter Riss kann dennoch zusätzlich bestehen. Deshalb Röntgenmuster, Nachbarschichten, sicheren Oberflächenkontakt und Morphologie gemeinsam beurteilen. Die Ursache aktueller Beschwerden braucht klinischen Kontext.",
      "en": "Chondrocalcinosis can appear bright and mimic a tear, while a true tear may coexist. Assess the radiographic pattern, adjacent slices, definite surface contact and morphology together. The cause of current symptoms requires clinical context.",
      "fa": "کندروکلسی‌نوز می‌تواند پرسیگنال دیده شود و پارگی را تقلید کند، در حالی که پارگی واقعی نیز ممکن است همراه آن باشد. الگوی رادیوگرافی، برش‌های مجاور، تماس قطعی با سطح و مورفولوژی با هم بررسی شوند. تعیین علت علائم فعلی به زمینهٔ بالینی نیاز دارد."
    },
    "wrongExplanations": {
      "A": {
        "de": "Hohes PD-Signal allein ist bei Chondrokalzinose kein verlässlicher Rissnachweis.",
        "en": "High PD signal alone is not reliable evidence of a tear in chondrocalcinosis.",
        "fa": "سیگنال بالای PD به‌تنهایی در کندروکلسی‌نوز شاهد قابل‌اعتماد پارگی نیست."
      },
      "B": {
        "de": "Ablagerungsbefund und Signal beweisen keine aktuelle entzündliche Attacke.",
        "en": "Deposition and signal do not establish a current inflammatory attack.",
        "fa": "رسوب و سیگنال، حملهٔ التهابی فعلی را اثبات نمی‌کنند."
      },
      "D": {
        "de": "Die Kalzifikation erklärt eine mögliche Signalquelle, schließt aber einen zusätzlichen Riss nicht aus.",
        "en": "Calcification provides a possible source of signal but does not exclude a coexisting tear.",
        "fa": "کلسیفیکاسیون منبع احتمالی سیگنال را توضیح می‌دهد، اما پارگی همراه را رد نمی‌کند."
      }
    },
    "sources": [
      "https://pubmed.ncbi.nlm.nih.gov/11566703/",
      "https://pmc.ncbi.nlm.nih.gov/articles/PMC11103298/"
    ]
  },
  {
    "topicId": "osgood-schlatter",
    "key": "pain-localisation",
    "question": {
      "de": "Ein sportlich aktiver Jugendlicher hat belastungsabhängigen Druckschmerz über der Tuberositas tibiae. Dort ist der distale Patellarsehnenansatz verdickt und reizbetont. Welche Zuordnung passt am besten?",
      "en": "An active adolescent has activity-related tenderness over the tibial tuberosity. The distal patellar tendon attachment is thickened and reactive at that site. Which diagnosis fits best?",
      "fa": "نوجوان ورزشکاری با فعالیت در ناحیهٔ برجستگی درشت‌نی درد و حساسیت فشاری دارد. محل اتصال دیستال تاندون کشککی در همان ناحیه ضخیم و واکنشی است. کدام تشخیص مناسب‌تر است؟"
    },
    "options": [
      {
        "de": "Sinding-Larsen-Johansson-Syndrom am unteren Patellapol.",
        "en": "Sinding–Larsen–Johansson syndrome at the inferior patellar pole.",
        "fa": "سندرم سیندینگ–لارسن–یوهانسون در قطب تحتانی کشکک."
      },
      {
        "de": "Osgood-Schlatter-Läsion an der Tuberositas tibiae.",
        "en": "Osgood–Schlatter lesion at the tibial tuberosity.",
        "fa": "ضایعهٔ آزگود–اشلاتر در برجستگی درشت‌نی."
      },
      {
        "de": "Proximale Patellatendinopathie am unteren Patellapol.",
        "en": "Proximal patellar tendinopathy at the inferior patellar pole.",
        "fa": "تندینوپاتی پروگزیمال کشککی در قطب تحتانی کشکک."
      },
      {
        "de": "Reizung einer bipartiten Patella am superolateralen Fragment.",
        "en": "Irritation of a bipartite patella at the superolateral fragment.",
        "fa": "تحریک کشکک دوقسمتی در قطعهٔ فوقانی‌خارجی."
      }
    ],
    "correct": "B",
    "explanation": {
      "de": "Die Lokalisation an der Tuberositas tibiae und am distalen Patellarsehnenansatz passt zur Osgood-Schlatter-Läsion. Für den Befund Symptome, Sehne und umgebende Weichteile gemeinsam beurteilen; eine Fragmentierung allein genügt nicht.",
      "en": "The tibial-tuberosity and distal patellar-tendon location fits an Osgood–Schlatter lesion. Assess symptoms, tendon and surrounding soft tissues together; fragmentation alone is insufficient.",
      "fa": "محل درگیری در برجستگی درشت‌نی و اتصال دیستال تاندون کشککی با ضایعهٔ آزگود–اشلاتر سازگار است. علائم، تاندون و بافت نرم اطراف باید با هم ارزیابی شوند؛ قطعه‌قطعه‌شدن به‌تنهایی کافی نیست."
    },
    "wrongExplanations": {
      "A": {
        "de": "Diese Alternative liegt am unteren Patellapol, nicht am tibialen Sehnenansatz.",
        "en": "This alternative is at the inferior patellar pole, not the tibial tendon attachment.",
        "fa": "این گزینه در قطب تحتانی کشکک است، نه محل اتصال تاندون به تیبیا."
      },
      "C": {
        "de": "Proximale Patellatendinopathie betrifft den patellaren, nicht den hier beschriebenen tibialen Ansatz.",
        "en": "Proximal patellar tendinopathy affects the patellar attachment, not the described tibial attachment.",
        "fa": "تندینوپاتی پروگزیمال محل اتصال به کشکک را درگیر می‌کند، نه اتصال تیبیالِ توصیف‌شده را."
      },
      "D": {
        "de": "Ein superolaterales Patellafragment ist eine andere anatomische Lokalisation.",
        "en": "A superolateral patellar fragment is a different anatomical location.",
        "fa": "قطعهٔ فوقانی‌خارجی کشکک در محل آناتومیک دیگری است."
      }
    },
    "sources": [
      "https://pubmed.ncbi.nlm.nih.gov/1438775/",
      "Existing patella/extensor and Osgood lessons: distal versus proximal insertion localisation",
      "https://pubmed.ncbi.nlm.nih.gov/19398884/"
    ]
  },
  {
    "topicId": "weitere-osteochondrosen",
    "key": "adult-disc-term",
    "question": {
      "de": "Im deutschsprachigen Befund eines Erwachsenen steht „Osteochondrosis intervertebralis“ bei degenerativen Bandscheiben- und angrenzenden Knochenveränderungen. Welche Bedeutung passt hier?",
      "en": "An adult German-language report uses “Osteochondrosis intervertebralis” for degenerative disc and adjacent osseous changes. Which meaning fits this context?",
      "fa": "در گزارش آلمانی یک بزرگسال، اصطلاح «Osteochondrosis intervertebralis» برای تغییرات دژنراتیو دیسک و استخوان مجاور آمده است. کدام معنا در این زمینه درست است؟"
    },
    "options": [
      {
        "de": "Akute traumatische Verletzung des Wachstumsknorpels.",
        "en": "Acute traumatic growth-cartilage injury.",
        "fa": "آسیب تروماتیک حاد غضروف رشد."
      },
      {
        "de": "Kindliche Osteonekrose der proximalen Femurepiphyse.",
        "en": "Childhood osteonecrosis of the proximal femoral epiphysis.",
        "fa": "استئونکروز اپی‌فیز پروگزیمال فمور در کودکی."
      },
      {
        "de": "Deutschsprachige Bezeichnung für degenerative Bandscheibenveränderungen im Erwachsenenalter.",
        "en": "German-language terminology for adult degenerative disc changes.",
        "fa": "اصطلاح آلمانی‌زبان برای تغییرات دژنراتیو دیسک در بزرگسالی."
      },
      {
        "de": "Wachstumsstörung der Wirbelkörperabschlussplatten im Sinne eines Morbus Scheuermann.",
        "en": "Growth disturbance of vertebral endplates as in Scheuermann disease.",
        "fa": "اختلال رشد صفحات انتهایی مهره در مفهوم بیماری شویرمان."
      }
    ],
    "correct": "C",
    "explanation": {
      "de": "Die Quelle weist auf den deutschsprachigen Gebrauch bei adultem Bandscheibenverschleiß mit Knochenreaktion hin; als englischen Ausdruck nennt sie degenerative disc disease. Alter, Lokalisation und der vollständige Befund verhindern eine Verwechslung mit kindlichen Osteochondrosen.",
      "en": "The source describes German-language use for adult disc degeneration with an osseous reaction, giving degenerative disc disease as the English term. Age, location and the full report prevent confusion with childhood osteochondroses.",
      "fa": "منبع به کاربرد آلمانی این اصطلاح برای دژنراسیون دیسک بزرگسالان همراه واکنش استخوانی اشاره دارد و معادل انگلیسی را degenerative disc disease می‌نامد. سن، محل و متن کامل گزارش از اشتباه با استئوکندروز کودکان جلوگیری می‌کنند."
    },
    "wrongExplanations": {
      "A": {
        "de": "Eine akute Wachstumsfugenverletzung ist ein traumatisches Geschehen und wird in der Quelle ausdrücklich abgegrenzt.",
        "en": "An acute physeal injury is traumatic and is explicitly distinguished in the source.",
        "fa": "آسیب حاد صفحهٔ رشد پدیده‌ای تروماتیک است و منبع آن را صریحاً جدا می‌کند."
      },
      "B": {
        "de": "Diese Beschreibung gehört zum kindlichen Femurkopf, nicht zu adulten degenerativen Bandscheibenbefunden.",
        "en": "That description concerns the childhood femoral head, not adult degenerative disc findings.",
        "fa": "این توصیف مربوط به سر فمور کودک است، نه یافته‌های دژنراتیو دیسک بزرگسال."
      },
      "D": {
        "de": "Scheuermann betrifft eine Wachstumsstörung der Abschlussplatten; der vorgegebene adulte degenerative Kontext ist anders.",
        "en": "Scheuermann concerns growth-related endplate disturbance; the given adult degenerative context differs.",
        "fa": "شویرمان مربوط به اختلال رشد صفحات انتهایی است؛ زمینهٔ دژنراتیو بزرگسال در سؤال متفاوت است."
      }
    },
    "sources": [
      "MSK.pdf physicalp124 /printedp123; original renderedpage inspected2026-10-25"
    ]
  },
  {
    "topicId": "weitere-osteochondrosen",
    "key": "acute-physis-distinction",
    "question": {
      "de": "Nach einem Sturz zeigt ein Kind eine akute Frakturlinie durch die Wachstumsfuge. Welche Einordnung hält die Begriffe der Quelle auseinander?",
      "en": "After a fall, a child has an acute fracture line through the physis. Which classification keeps the source terminology distinct?",
      "fa": "پس از افتادن، در کودک خط شکستگی حادی از صفحهٔ رشد عبور می‌کند. کدام دسته‌بندی مفاهیم منبع را از هم جدا نگه می‌دارد؟"
    },
    "options": [
      {
        "de": "Osteochondrose allein wegen der Lage im Wachstumsknorpel.",
        "en": "Osteochondrosis solely because the lesion is in growth cartilage.",
        "fa": "استئوکندروز، صرفاً به‌علت محل ضایعه در غضروف رشد."
      },
      {
        "de": "Akute Wachstumsfugenverletzung, getrennt vom Sammelbegriff Osteochondrose.",
        "en": "Acute physeal injury, distinct from the osteochondrosis umbrella term.",
        "fa": "آسیب حاد صفحهٔ رشد، جدا از اصطلاح کلی استئوکندروز."
      },
      {
        "de": "Osteochondrosis intervertebralis im Sinne einer degenerativen Erkrankung.",
        "en": "Osteochondrosis intervertebralis in the degenerative sense.",
        "fa": "Osteochondrosis intervertebralis در معنای بیماری دژنراتیو."
      },
      {
        "de": "Wachstumsstörung vertebraler Endplatten (Morbus Scheuermann).",
        "en": "Growth disturbance of vertebral endplates (Scheuermann disease).",
        "fa": "اختلال رشد صفحات انتهایی مهره‌ها (بیماری شویرمان)."
      }
    ],
    "correct": "B",
    "explanation": {
      "de": "Die Lage am Wachstumsknorpel macht eine akute traumatische Fraktur nicht zur Osteochondrose. Die Quelle trennt akute Wachstumsfugenverletzungen von der Gruppe mit gestörter enchondraler Ossifikation. Der konkrete Frakturverlauf wird gesondert beschrieben.",
      "en": "Location at growth cartilage does not turn an acute traumatic fracture into osteochondrosis. The source distinguishes acute physeal injuries from the group with disturbed endochondral ossification. Describe the specific fracture course separately.",
      "fa": "محل ضایعه در غضروف رشد، شکستگی تروماتیک حاد را به استئوکندروز تبدیل نمی‌کند. منبع آسیب حاد صفحهٔ رشد را از گروه اختلال استخوان‌سازی درون‌غضروفی جدا می‌کند. مسیر مشخص شکستگی باید جداگانه توصیف شود."
    },
    "wrongExplanations": {
      "A": {
        "de": "Entscheidend ist hier der akute traumatische Frakturverlauf, nicht die Lokalisation allein.",
        "en": "The acute traumatic fracture course matters here, not location alone.",
        "fa": "در اینجا مسیر شکستگی تروماتیک حاد اهمیت دارد، نه صرفاً محل آن."
      },
      "C": {
        "de": "Der degenerative Bandscheibenbegriff beschreibt weder eine kindliche Physis noch diese akute Fraktur.",
        "en": "The degenerative disc term describes neither a childhood physis nor this acute fracture.",
        "fa": "اصطلاح دژنراتیو دیسک نه صفحهٔ رشد کودک و نه این شکستگی حاد را توصیف می‌کند."
      },
      "D": {
        "de": "Scheuermann bezeichnet einen spinalen Endplatten-Wachstumskontext; eine akute physeale Frakturlinie ist anders einzuordnen.",
        "en": "Scheuermann concerns spinal endplate growth; an acute physeal fracture line belongs to a different category.",
        "fa": "شویرمان مربوط به رشد صفحات انتهایی ستون فقرات است؛ خط شکستگی حاد صفحهٔ رشد در دستهٔ دیگری قرار می‌گیرد."
      }
    },
    "sources": [
      "MSK.pdf physicalp124 /printedp123; original renderedpage inspected2026-10-25"
    ]
  },
  {
    "topicId": "osteochondrosis-dissecans",
    "key": "juvenile-rim-interpretation",
    "question": {
      "de": "Bei einem 12-jährigen Kind mit offenen Wachstumsfugen liegt eine OCD des Femurkondylus vor. Das Fragment ist nicht disloziert; im MRT zeigt sich ein T2-hyperintenser Grenzsaum. Welche Beurteilung dieses einzelnen Zeichens ist angemessen?",
      "en": "A 12-year-old with open physes has femoral condylar OCD. The fragment is not displaced; MRI shows a high-T2 interface rim. Which assessment of this single sign is appropriate?",
      "fa": "کودکی ۱۲ ساله با صفحات رشد باز، OCD کندیل فمور دارد. قطعه جابه‌جا نشده و در MRI حاشیه‌ای با سیگنال بالای T2 در محل تماس دیده می‌شود. ارزیابی مناسب این علامت منفرد چیست؟"
    },
    "options": [
      {
        "de": "Der Saum ist ein Instabilitätshinweis, aber für juvenile Läsionen allein nicht spezifisch genug; weitere Befunde und Verlauf einbeziehen.",
        "en": "The rim raises concern for instability but alone lacks specificity in juvenile lesions; integrate other findings and clinical course.",
        "fa": "حاشیه احتمال ناپایداری را مطرح می‌کند، اما به‌تنهایی در ضایعات نوجوانان اختصاصیت کافی ندارد؛ سایر یافته‌ها و سیر بالینی را نیز در نظر بگیرید."
      },
      {
        "de": "Der Saum kennzeichnet ein stabiles Fragment mit abgeschlossener knöcherner Einheilung.",
        "en": "The rim characterizes a stable fragment with completed bony healing.",
        "fa": "حاشیه نشان‌دهندهٔ قطعه‌ای پایدار با ترمیم استخوانی کامل است."
      },
      {
        "de": "Der Saum reicht zur Einstufung als instabile OCD wie beim Erwachsenen aus.",
        "en": "The rim suffices to classify instability using the same interpretation as in adults.",
        "fa": "حاشیه برای تشخیص ناپایداری با همان تفسیر بزرگسالان کافی است."
      },
      {
        "de": "Der Saum entspricht einer normalen Ossifikationsvariante statt einer OCD.",
        "en": "The rim represents a normal ossification variant rather than OCD.",
        "fa": "حاشیه مربوط به واریانت طبیعی استخوان‌سازی است، نه OCD."
      }
    ],
    "correct": "A",
    "explanation": {
      "de": "In der arthroskopisch korrelierten Primärstudie waren gebräuchliche MRT-Instabilitätskriterien bei juvenilen Läsionen weniger spezifisch als bei adulten. Ein Grenzsaum allein erlaubt deshalb hier keine sichere Stabilitätszuordnung. Alter, Knorpel/Subchondralplatte, weitere Zeichen und Verlauf mitbeurteilen.",
      "en": "In the arthroscopy-correlated primary study, conventional MRI instability criteria were less specific in juvenile than adult lesions. An interface rim alone therefore cannot establish stability status here. Integrate skeletal maturity, cartilage/subchondral plate, other signs and clinical course.",
      "fa": "در مطالعهٔ اولیه با مرجع آرتروسکوپی، معیارهای رایج MRI ناپایداری در ضایعات نوجوانان از بزرگسالان کم‌اختصاص‌تر بودند. بنابراین حاشیهٔ محل تماس به‌تنهایی در اینجا وضعیت پایداری را قطعی نمی‌کند. بلوغ اسکلتی، غضروف/صفحهٔ زیرغضروفی، سایر علائم و سیر بالینی را نیز ارزیابی کنید."
    },
    "wrongExplanations": {
      "B": {
        "de": "Ein T2-hyperintenser Saum belegt keine abgeschlossene knöcherne Einheilung.",
        "en": "A high-T2 rim does not establish completed bony healing.",
        "fa": "حاشیهٔ پرسیگنال T2 ترمیم استخوانی کامل را ثابت نمی‌کند."
      },
      "C": {
        "de": "Gerade die Übertragung erwachsener Kriterien ist bei juveniler OCD durch geringere Spezifität begrenzt.",
        "en": "Lower specificity in juvenile OCD limits direct transfer of adult criteria.",
        "fa": "اختصاصیت کمتر در OCD نوجوانان، تعمیم مستقیم معیارهای بزرگسالان را محدود می‌کند."
      },
      "D": {
        "de": "Eine bereits beschriebene OCD wird nicht durch einen Grenzsaum zur normalen Ossifikationsvariante; deren Verteilung und Begleitbefunde gesondert prüfen.",
        "en": "An interface rim does not turn the described OCD into a normal ossification variant; assess the distribution and accompanying findings separately.",
        "fa": "حاشیهٔ محل تماس، OCD توصیف‌شده را به واریانت طبیعی استخوان‌سازی تبدیل نمی‌کند؛ توزیع و یافته‌های همراه باید جداگانه بررسی شوند."
      }
    },
    "sources": [
      "https://pubmed.ncbi.nlm.nih.gov/18552309/"
    ]
  },
  {
    "topicId": "avn-huefte",
    "key": "arco2019-depression",
    "question": {
      "de": "Bei gesicherter Femurkopfosteonekrose zeigt CT eine subchondrale Fraktur mit 3 mm Einsenkung. Der Gelenkspalt ist erhalten, Arthrosezeichen fehlen. Welches Stadium der ARCO-Revision 2019 passt?",
      "en": "In established femoral-head osteonecrosis, CT shows a subchondral fracture with 3 mm depression. Joint space is preserved, without osteoarthritis. Which 2019 revised ARCO stage fits?",
      "fa": "در استئونکروز اثبات‌شدهٔ سر فمور، CT شکستگی زیرغضروفی همراه فرورفتگی ۳ میلی‌متری را نشان می‌دهد. فضای مفصلی حفظ شده و نشانه‌ای از آرتروز وجود ندارد. کدام مرحلهٔ ARCO بازنگری ۲۰۱۹ مناسب است؟"
    },
    "options": [
      {
        "de": "II",
        "en": "II",
        "fa": "II"
      },
      {
        "de": "IIIA",
        "en": "IIIA",
        "fa": "IIIA"
      },
      {
        "de": "IIIB",
        "en": "IIIB",
        "fa": "IIIB"
      },
      {
        "de": "IV",
        "en": "IV",
        "fa": "IV"
      }
    ],
    "correct": "C",
    "explanation": {
      "de": "ARCO 2019 ordnet die subchondrale oder nekrotische Fraktur Stadium III zu: IIIA bei Depression ≤2 mm, IIIB bei >2 mm. Stadium IV erfordert radiographische Arthrosezeichen; die Depression allein macht kein Stadium IV.",
      "en": "ARCO 2019 assigns subchondral or necrotic-zone fracture to stage III: IIIA for depression ≤2 mm and IIIB for >2 mm. Stage IV requires radiographic osteoarthritis; depression alone does not make stage IV.",
      "fa": "ARCO ۲۰۱۹ شکستگی زیرغضروفی یا ناحیهٔ نکروتیک را در مرحلهٔ III قرار می‌دهد: IIIA برای فرورفتگی ≤۲ میلی‌متر و IIIB برای >۲ میلی‌متر. مرحلهٔ IV به نشانه‌های رادیوگرافیک آرتروز نیاز دارد؛ فرورفتگی به‌تنهایی مرحلهٔ IV ایجاد نمی‌کند."
    },
    "wrongExplanations": {
      "A": {
        "de": "Stadium II hat keine subchondrale/nekrotische Fraktur und keine Abflachung; hier liegt beides strukturell fortgeschritten vor.",
        "en": "Stage II has no subchondral/necrotic-zone fracture or flattening; the described structural findings exceed it.",
        "fa": "در مرحلهٔ II شکستگی زیرغضروفی/ناحیهٔ نکروتیک و صاف‌شدن وجود ندارد؛ یافته‌های ساختاری توصیف‌شده فراتر از آن‌اند."
      },
      "B": {
        "de": "IIIA gilt für Depression ≤2 mm. Die angegebenen 3 mm überschreiten diese Grenze.",
        "en": "IIIA applies to depression ≤2 mm. The specified 3 mm exceeds that boundary.",
        "fa": "IIIA برای فرورفتگی ≤۲ میلی‌متر است؛ ۳ میلی‌مترِ ذکرشده از این مرز بیشتر است."
      },
      "D": {
        "de": "Erhaltene Gelenkweite ohne Arthrosezeichen erfüllt die hier geforderte Stadium-IV-Konstellation nicht.",
        "en": "Preserved joint space without osteoarthritis does not meet the stage-IV setting described here.",
        "fa": "فضای مفصلی حفظ‌شده بدون نشانهٔ آرتروز، وضعیت لازم برای مرحلهٔ IV در اینجا را برآورده نمی‌کند."
      }
    },
    "sources": [
      "https://pubmed.ncbi.nlm.nih.gov/31866252/"
    ]
  },
  {
    "topicId": "melorheostose",
    "key": "source-cortical-pattern",
    "question": {
      "de": "Welches Knochenmuster steht in der gezeigten Handaufnahme im Vordergrund?",
      "en": "Which bone pattern predominates in the displayed hand radiograph?",
      "fa": "کدام الگوی استخوانی در رادیوگرافی دستِ نشان‌داده‌شده برجسته‌تر است؟"
    },
    "image": {
      "src": "/educational/melorheostose/pdf-case-p133.jpg",
      "alt": {
        "de": "Originaler Röntgenbildausschnitt der linken Hand aus MSK.pdf, Seite133; rID199384.",
        "en": "Original left-hand radiograph crop from MSK.pdf, page133; rID199384.",
        "fa": "برش اصلی رادیوگرافی دست چپ از صفحهٔ ۱۳۳ MSK.pdf؛ rID199384."
      },
      "caption": {
        "de": "Quellbild ohne ergänzte Markierungen.",
        "en": "Source image without added overlays.",
        "fa": "تصویر منبع بدون علامت‌گذاری افزوده."
      },
      "credit": {
        "de": "Radiopaedia rID199384 · Bild aus der Nutzer-PDF; kein Beitragender auf der Quellseite genannt.",
        "en": "Radiopaedia rID199384 · image from the user-provided PDF; no contributor named on the source page.",
        "fa": "Radiopaedia rID199384 · تصویر از PDF ارائه‌شدهٔ کاربر؛ نام مشارکت‌کننده در صفحهٔ منبع ذکر نشده است."
      }
    },
    "options": [
      {
        "de": "Umschriebene runde Skleroseinsel im Markraum.",
        "en": "A circumscribed round medullary sclerotic island.",
        "fa": "جزیرهٔ اسکلروتیک گرد و محدود در مغز استخوان."
      },
      {
        "de": "Mehrere ring- und bogenförmige Matrixverkalkungen.",
        "en": "Multiple ring-and-arc matrix calcifications.",
        "fa": "چند کلسیفیکاسیون ماتریکس به‌شکل حلقه و قوس."
      },
      {
        "de": "Irregulär längsverlaufende kortikale Hyperostose.",
        "en": "Irregular longitudinal cortical hyperostosis.",
        "fa": "هیپراستوز قشری نامنظم با امتداد طولی."
      },
      {
        "de": "Diffuse Verminderung der Knochendichte ohne umschriebene Sklerose.",
        "en": "Diffuse reduced bone density without focal sclerosis.",
        "fa": "کاهش منتشر دانسیتهٔ استخوان بدون اسکلروز کانونی."
      }
    ],
    "correct": "C",
    "explanation": {
      "de": "Die Aufnahme zeigt eine längsverlaufende dichte kortikale Knochenanlagerung. Dieses Muster stützt im Quellfall eine Melorheostose. Die sichtbare Morphologie beschreiben; ein einzelner Ausschnitt erfasst nicht die gesamte Ausdehnung oder Weichteilbeteiligung.",
      "en": "The image shows longitudinal dense cortical bone overgrowth. In the source case, this pattern supports melorheostosis. Describe visible morphology; a single crop does not establish total extent or soft-tissue involvement.",
      "fa": "تصویر رشد اضافی استخوان متراکم را در قشر و با امتداد طولی نشان می‌دهد. این الگو در کیس منبع از ملوره‌اوستوز حمایت می‌کند. مورفولوژی قابل مشاهده را توصیف کنید؛ یک برش تصویر، وسعت کامل یا درگیری بافت نرم را تعیین نمی‌کند."
    },
    "wrongExplanations": {
      "A": {
        "de": "Die sichtbare dichte Veränderung folgt längs der Kortikalis statt als einzelne runde Markrauminsel zu erscheinen.",
        "en": "The visible dense abnormality follows the cortex longitudinally rather than forming a solitary round medullary island.",
        "fa": "تغییر متراکم قابل مشاهده در امتداد طولی قشر است، نه به‌شکل یک جزیرهٔ گرد منفرد در مغز استخوان."
      },
      "B": {
        "de": "Ring- und Bogenverkalkungen sind hier nicht das vorherrschende Muster; es handelt sich um kompakte kortikale Knochenanlagerung.",
        "en": "Ring-and-arc calcifications are not the predominant pattern here; the finding is compact cortical bone overgrowth.",
        "fa": "کلسیفیکاسیون حلقه‌ای و قوسی الگوی غالب اینجا نیست؛ یافته رشد اضافی استخوان قشری متراکم است."
      },
      "D": {
        "de": "Das Leitmerkmal ist eine lokal verdichtete Kortikalis, nicht allein eine generalisierte Dichteminderung.",
        "en": "The key finding is locally dense cortex rather than generalized reduced density alone.",
        "fa": "ویژگی اصلی، قشر با دانسیتهٔ موضعی افزایش‌یافته است، نه صرفاً کاهش دانسیتهٔ منتشر."
      }
    },
    "sources": [
      "MSK.pdf physical133 /printed132; original page and retained image visually inspected2026-10-25",
      "https://doi.org/10.53347/rID-199384",
      "https://onlinelibrary.wiley.com/doi/full/10.1002/jbm4.10472"
    ]
  },
  {
    "key": "provocation-study-limit",
    "topicId": "de-quervain",
    "fach": "msk",
    "question": {
      "de": "Bei der Einordnung eines radial schmerzhaften Handgelenks wird die Studie von Wu et al. (2018) diskutiert: 36 beschwerdefreie Personen wurden mit Finkelstein und Eichhoff untersucht; Finkelstein erzeugte weniger falsch-positive Reaktionen. Welche Aussage lässt dieses Studiendesign unmittelbar zu?",
      "en": "When assessing radial wrist pain, Wu et al. (2018) is discussed: 36 asymptomatic people underwent Finkelstein and Eichhoff testing; Finkelstein produced fewer false-positive responses. Which conclusion is directly supported by this study design?",
      "fa": "هنگام ارزیابی درد رادیال مچ، مطالعهٔ Wu و همکاران (۲۰۱۸) مطرح می‌شود: ۳۶ فرد بدون علامت با آزمون‌های فینکلشتاین و آیکهوف بررسی شدند و فینکلشتاین پاسخ مثبت کاذب کمتری ایجاد کرد. کدام نتیجه مستقیماً با این طراحی مطالعه پشتیبانی می‌شود؟"
    },
    "options": [
      {
        "de": "Finkelstein erkennt einen größeren Anteil der tatsächlich erkrankten Patienten.",
        "en": "Finkelstein detects a larger proportion of genuinely affected patients.",
        "fa": "فینکلشتاین نسبت بیشتری از بیماران واقعاً مبتلا را شناسایی می‌کند."
      },
      {
        "de": "Die falsch-positive Schmerzprovokation lässt sich in dieser beschwerdefreien Gruppe zwischen den Manövern vergleichen.",
        "en": "False-positive pain provocation can be compared between manoeuvres in this asymptomatic group.",
        "fa": "می‌توان بازتولید دردِ مثبت کاذب را در این گروه بدون علامت بین دو مانور مقایسه کرد."
      },
      {
        "de": "Ein positiver Finkelstein-Test hat damit einen bestimmten Vorhersagewert in einer symptomatischen Ambulanzpopulation.",
        "en": "A positive Finkelstein test thereby has an established predictive value in a symptomatic outpatient population.",
        "fa": "به این ترتیب ارزش پیش‌بینی آزمون مثبت فینکلشتاین در جمعیت علامت‌دار درمانگاه مشخص شده است."
      },
      {
        "de": "Ein negativer Finkelstein-Test senkt die Krankheitswahrscheinlichkeit in symptomatischen Patienten in bekanntem Ausmaß.",
        "en": "A negative Finkelstein test reduces disease probability in symptomatic patients by a known amount.",
        "fa": "آزمون منفی فینکلشتاین احتمال بیماری را در بیماران علامت‌دار به میزان معلوم کاهش می‌دهد."
      }
    ],
    "correct": "B",
    "explanation": {
      "de": "Untersucht wurden beschwerdefreie Handgelenke. Damit ist eine Aussage zu falsch-positiver Provokation in dieser Gruppe möglich; Sensitivität bei Erkrankten und Vorhersagewerte in einer symptomatischen Versorgungspopulation wurden damit nicht bestimmt. Ausführung und Klinik weiterhin genau dokumentieren.",
      "en": "The study examined asymptomatic wrists. It supports comparison of false-positive provocation in that group; it did not establish sensitivity in affected patients or predictive values in a symptomatic clinical population. Continue to document technique and clinical findings precisely.",
      "fa": "مطالعه مچ‌های بدون علامت را بررسی کرد؛ بنابراین مقایسهٔ تحریک مثبت کاذب در همین گروه ممکن است. حساسیت در بیماران مبتلا و ارزش‌های پیش‌بینی در جمعیت بالینی علامت‌دار با آن تعیین نشده‌اند. شیوهٔ اجرا و یافته‌های بالینی همچنان دقیق ثبت شوند."
    },
    "wrongExplanations": {
      "A": {
        "de": "Für Sensitivität braucht man erkrankte Patienten und einen geeigneten Referenzstandard. Diese Vergleichsgruppe war beschwerdefrei.",
        "en": "Sensitivity requires affected patients and a suitable reference standard. This comparison group was asymptomatic.",
        "fa": "برای حساسیت، بیماران مبتلا و استاندارد مرجع مناسب لازم‌اند؛ این گروه مقایسه بدون علامت بود."
      },
      "C": {
        "de": "Der positive Vorhersagewert hängt auch von Krankheitshäufigkeit und Untersuchungsspektrum ab. Eine rein beschwerdefreie Gruppe legt ihn für eine symptomatische Ambulanz nicht fest.",
        "en": "Positive predictive value also depends on disease prevalence and case spectrum. An asymptomatic-only group does not establish it in symptomatic outpatients.",
        "fa": "ارزش پیش‌بینی مثبت به شیوع بیماری و طیف افراد بررسی‌شده نیز وابسته است؛ گروه صرفاً بدون علامت آن را برای مراجعه‌کنندگان علامت‌دار تعیین نمی‌کند."
      },
      "D": {
        "de": "Eine quantifizierte Ausschlusswirkung bei symptomatischen Patienten erfordert unter anderem Daten zur Sensitivität; diese wurden hier nicht erhoben.",
        "en": "Quantified rule-out performance in symptomatic patients requires sensitivity data among other information; these were not collected here.",
        "fa": "تعیین کمّی توان رد بیماری در بیماران علامت‌دار، از جمله به داده‌های حساسیت نیاز دارد؛ چنین داده‌هایی در اینجا جمع‌آوری نشده‌اند."
      }
    },
    "sources": [
      "https://pmc.ncbi.nlm.nih.gov/articles/PMC6103758/"
    ]
  },
  {
    "key": "lister-course",
    "topicId": "sehnenpathologien-hand",
    "fach": "msk",
    "question": {
      "de": "Textfall zur typischen Anatomie: Eine Sehne läuft an der ulnaren Seite des Lister-Tuberkulums und schwenkt distal davon nach radial zum Daumen. Welche Zuordnung passt?",
      "en": "Text vignette of typical anatomy: a tendon runs on the ulnar side of Lister tubercle and turns radially toward the thumb beyond it. Which identification fits?",
      "fa": "سناریوی متنی دربارهٔ آناتومی معمول: تاندونی در سمت اولنار تکمهٔ لیستر می‌گذرد و در دیستال آن به سمت رادیال و شست می‌چرخد. کدام شناسایی مناسب است؟"
    },
    "options": [
      {
        "de": "ECRL/ECRB im zweiten Fach",
        "en": "ECRL/ECRB in compartment II",
        "fa": "ECRL/ECRB در کمپارتمان II"
      },
      {
        "de": "APL/EPB im ersten Fach",
        "en": "APL/EPB in compartment I",
        "fa": "APL/EPB در کمپارتمان I"
      },
      {
        "de": "EPL im dritten Fach",
        "en": "EPL in compartment III",
        "fa": "EPL در کمپارتمان III"
      },
      {
        "de": "EDC/EIP im vierten Fach",
        "en": "EDC/EIP in compartment IV",
        "fa": "EDC/EIP در کمپارتمان IV"
      }
    ],
    "correct": "C",
    "explanation": {
      "de": "EPL wird am Lister-Tuberkulum im dritten Fach umgelenkt und zieht anschließend zum Daumen. ECRL/ECRB liegen im zweiten Fach radial des Tuberkulums. Verlauf und Landmarke gemeinsam zur Zuordnung verwenden; die Frage beschreibt die typische Anatomie.",
      "en": "EPL is redirected at Lister tubercle in the third compartment before running toward the thumb. ECRL/ECRB occupy the second compartment radial to the tubercle. Use tendon course and landmark together; this vignette describes typical anatomy.",
      "fa": "EPL در کمپارتمان سوم کنار تکمهٔ لیستر تغییر جهت می‌دهد و سپس به شست می‌رود. ECRL/ECRB در کمپارتمان دوم و سمت رادیال تکمه قرار دارند. مسیر و لندمارک را با هم برای شناسایی به‌کار ببرید؛ سناریو آناتومی معمول را توصیف می‌کند."
    },
    "wrongExplanations": {
      "A": {
        "de": "ECRL/ECRB sind dem zweiten Fach radial des Lister-Tuberkulums zugeordnet, nicht dem beschriebenen dritten Fach mit Daumenverlauf.",
        "en": "ECRL/ECRB belong to the second compartment radial to Lister tubercle rather than the described third compartment and thumb course.",
        "fa": "ECRL/ECRB مربوط به کمپارتمان دوم و سمت رادیال تکمهٔ لیسترند، نه کمپارتمان سوم و مسیر توصیف‌شده به شست."
      },
      "B": {
        "de": "APL/EPB gehören zum ersten Fach am Radiusstyloid. Die beschriebene Umlenkung um Lister betrifft EPL.",
        "en": "APL/EPB occupy the first compartment at the radial styloid. The described turn around Lister tubercle concerns EPL.",
        "fa": "APL/EPB در کمپارتمان اول کنار استایلوئید رادیوس قرار دارند؛ پیچیدن توصیف‌شده دور تکمهٔ لیستر مربوط به EPL است."
      },
      "D": {
        "de": "EDC/EIP verlaufen gemeinsam im größeren vierten Fach; sie erklären keine einzelne im Fach III um Lister ziehende Daumensehne.",
        "en": "EDC/EIP share the larger fourth compartment; they do not explain a single thumb tendon turning around Lister in compartment III.",
        "fa": "EDC/EIP با هم در کمپارتمان چهارم بزرگ‌تر قرار دارند؛ آن‌ها تاندون منفرد شست را که در کمپارتمان III دور لیستر می‌چرخد توضیح نمی‌دهند."
      }
    },
    "sources": [
      "MSK.pdf physical41/printed40; actual table and page freshly rendered/read2026-10-25",
      "https://pmc.ncbi.nlm.nih.gov/articles/PMC11775041/"
    ],
    "difficulty": 1
  },
  {
    "key": "periosteal-report",
    "question": {
      "de": "Textfall: Bei einem Jugendlichen zeigt eine osteolytische Knochenläsion eine mehrschichtige Periostreaktion. Klinik und Labor liegen noch nicht vor. Welche Befundbeurteilung berücksichtigt die Aussagegrenze des Musters am besten?",
      "en": "Text vignette: an adolescent has an osteolytic bone lesion with a multilamellar periosteal response. Clinical and laboratory information is not yet available. Which report best respects the limits of this pattern?",
      "fa": "سناریوی متنی: نوجوانی ضایعهٔ استئولیتیک استخوان با واکنش پریوست چندلایه دارد. اطلاعات بالینی و آزمایشگاهی هنوز در دسترس نیست. کدام ارزیابی گزارش، محدودیت این الگو را بهتر رعایت می‌کند؟"
    },
    "options": [
      {
        "de": "Aggressiv wirkende Läsion; das Schichtmuster legt vorrangig eine neoplastische Ursache gegenüber Infektion nahe.",
        "en": "Aggressive-appearing lesion; the layered pattern primarily favours neoplasia over infection.",
        "fa": "ضایعه با ظاهر تهاجمی؛ الگوی لایه‌لایه در درجهٔ اول نئوپلازی را بر عفونت ترجیح می‌دهد."
      },
      {
        "de": "Aggressiv wirkende Läsion; infektiöse und neoplastische Ursachen sind mit Klinik und weiteren Befunden abzugleichen.",
        "en": "Aggressive-appearing lesion; correlate infectious and neoplastic possibilities with clinical and additional findings.",
        "fa": "ضایعه با ظاهر تهاجمی؛ علل عفونی و نئوپلاستیک باید با بالین و یافته‌های تکمیلی تطبیق داده شوند."
      },
      {
        "de": "Langsam verlaufende Läsion; die mehreren Periostschichten sprechen eher für einen nichtaggressiven Verlauf.",
        "en": "Slowly evolving lesion; multiple periosteal layers favour a nonaggressive course.",
        "fa": "ضایعهٔ آهسته‌سیر؛ لایه‌های متعدد پریوست بیشتر به نفع روند غیرتهاجمی‌اند."
      },
      {
        "de": "Traumatische Knochenreaktion; das Schichtmuster spricht vorrangig für eine organisierte Frakturheilung.",
        "en": "Traumatic bone response; the layered pattern primarily favours organised fracture healing.",
        "fa": "واکنش تروماتیک استخوان؛ الگوی لایه‌لایه در درجهٔ اول به نفع ترمیم سازمان‌یافتهٔ شکستگی است."
      }
    ],
    "correct": "B",
    "explanation": {
      "de": "Eine lamelläre Periostreaktion beschreibt die Knochenantwort und ist nicht tumorspezifisch. Sowohl Ewing-Sarkom als auch Osteomyelitis gehören in die Differentialdiagnose; aus dem Muster allein folgen weder Histologie noch Erreger.",
      "en": "Lamellated periosteal response describes the bone reaction and is not tumour-specific. Both Ewing sarcoma and osteomyelitis belong in the differential; the pattern alone establishes neither histology nor pathogen.",
      "fa": "واکنش پریوست لایه‌لایه پاسخ استخوان را توصیف می‌کند و اختصاصی تومور نیست. سارکوم یوئینگ و استئومیلیت هر دو در افتراق قرار دارند؛ الگو به‌تنهایی نه بافت‌شناسی و نه عامل عفونی را تعیین می‌کند."
    },
    "wrongExplanations": {
      "A": {
        "de": "Das Muster allein begründet keine Priorisierung von Neoplasie gegenüber Infektion; die fehlenden Kontextdaten sind relevant.",
        "en": "The pattern alone does not justify prioritising neoplasia over infection; missing context matters.",
        "fa": "الگو به‌تنهایی ترجیح نئوپلازی بر عفونت را توجیه نمی‌کند؛ اطلاعات زمینه‌ای هنوز در دسترس نیست و اهمیت دارد."
      },
      "C": {
        "de": "Mehrere Periostlamellen sind nicht mit einer einzigen glatten soliden Periostreaktion gleichzusetzen.",
        "en": "Multiple lamellae are not equivalent to a single smooth solid periosteal response.",
        "fa": "لایه‌های متعدد با واکنش پریوست جامد و صافِ منفرد یکسان نیستند."
      },
      "D": {
        "de": "Eine Fraktur oder ein entsprechender Heilungsverlauf ist nicht beschrieben. Aus Lamellierung allein lässt sich die traumatische Ursache nicht ableiten.",
        "en": "No fracture or corresponding healing course is described. Lamellation alone does not establish traumatic origin.",
        "fa": "شکستگی یا سیر ترمیمی متناظر توصیف نشده است؛ لایه‌لایه‌بودن به‌تنهایی منشأ تروماتیک را تعیین نمی‌کند."
      }
    },
    "sources": [
      "MSK.pdf physical73/printed72; actual rendered page read2026-10-25"
    ],
    "topicId": "osteomyelitis",
    "fach": "msk",
    "difficulty": 1
  },
  {
    "key": "brodie-variability",
    "question": {
      "de": "Ein Brodie-Abszess wird differentialdiagnostisch erwogen. Die Röntgenaufnahme zeigt keine Periostreaktion. Welche Interpretation dieser fehlenden Reaktion ist angemessen?",
      "en": "Brodie abscess is being considered in the differential. Radiographs show no periosteal response. How should this absent response be interpreted?",
      "fa": "آبسهٔ برودی در تشخیص افتراقی مطرح است. رادیوگرافی واکنش پریوست نشان نمی‌دهد. تفسیر مناسبِ نبود این واکنش چیست؟"
    },
    "options": [
      {
        "de": "Die Infektionshypothese sollte zugunsten einer nichtinfektiösen Läsion zurückgestellt werden.",
        "en": "The infection hypothesis should be deprioritised in favour of a noninfectious lesion.",
        "fa": "فرض عفونت باید به نفع ضایعهٔ غیرعفونی در اولویت پایین‌تر قرار گیرد."
      },
      {
        "de": "Die Läsion sollte ohne Periostreaktion als akut statt subakut oder chronisch eingeordnet werden.",
        "en": "Without periosteal response, classify the lesion as acute rather than subacute or chronic.",
        "fa": "بدون واکنش پریوست، ضایعه باید حاد و نه تحت‌حاد یا مزمن دسته‌بندی شود."
      },
      {
        "de": "Das Fehlen passt zur variablen Morphologie; die übrigen klinischen und bildgebenden Befunde bleiben entscheidend.",
        "en": "Absence fits the variable appearances; the remaining clinical and imaging findings still determine interpretation.",
        "fa": "نبود آن با ظاهر متغیر سازگار است؛ سایر یافته‌های بالینی و تصویری همچنان برای تفسیر تعیین‌کننده‌اند."
      },
      {
        "de": "Die fehlende Reaktion spricht eher für einen abgeheilten als einen fortbestehenden infektiösen Herd.",
        "en": "Absent response favours a healed rather than an ongoing infectious focus.",
        "fa": "نبود واکنش بیشتر به نفع کانون عفونی بهبودیافته است تا کانونی که همچنان وجود دارد."
      }
    ],
    "correct": "C",
    "explanation": {
      "de": "In der ursprünglichen Serie von 25 Brodie-Abszessen zeigte nur ein Teil eine Periostreaktion. Ihr Fehlen ist daher kein Ausschlusskriterium. Die Serie belegt die Variabilität, nicht eine diagnostische Entscheidungsregel aus einem Einzelzeichen.",
      "en": "Only some lesions had periosteal response in the original series of 25 Brodie abscesses. Its absence therefore does not exclude the diagnosis. The series supports variability, not a diagnostic decision rule from one sign.",
      "fa": "در مجموعهٔ اصلی ۲۵ آبسهٔ برودی، فقط بخشی واکنش پریوست داشتند؛ بنابراین نبود آن معیار رد نیست. این مجموعه تنوع ظاهر را نشان می‌دهد، نه قاعدهٔ تصمیم‌گیری تشخیصی از یک نشانه."
    },
    "wrongExplanations": {
      "A": {
        "de": "Die Originalserie enthält Brodie-Abszesse ohne Periostreaktion; dieses fehlende Zeichen trägt die vorgeschlagene Umgewichtung allein nicht.",
        "en": "The original series includes Brodie abscesses without periosteal response; this absent sign alone does not support the proposed reprioritisation.",
        "fa": "مجموعهٔ اصلی شامل آبسه‌های برودی بدون واکنش پریوست است؛ این نشانهٔ غایب به‌تنهایی تغییر اولویت پیشنهادی را پشتیبانی نمی‌کند."
      },
      "B": {
        "de": "Der zeitliche Verlauf wird nicht allein aus dem Vorhandensein oder Fehlen einer Periostreaktion bestimmt.",
        "en": "Temporal course is not determined solely by whether periosteal response is present.",
        "fa": "سیر زمانی صرفاً از وجود یا نبود واکنش پریوست تعیین نمی‌شود."
      },
      "D": {
        "de": "Aus einer fehlenden Periostreaktion lässt sich die aktuelle Aktivität des möglichen Herdes nicht zuverlässig ableiten. Die übrigen Befunde und der Verlauf bleiben nötig.",
        "en": "Absent periosteal response does not reliably determine the current activity of the possible focus. Other findings and clinical course remain necessary.",
        "fa": "نبود واکنش پریوست، فعالیت فعلی کانون احتمالی را با اطمینان تعیین نمی‌کند؛ سایر یافته‌ها و سیر بالینی همچنان لازم‌اند."
      }
    },
    "sources": [
      "https://pubmed.ncbi.nlm.nih.gov/451190/"
    ],
    "topicId": "osteomyelitis",
    "fach": "msk",
    "difficulty": 1
  },
  {
    "key": "paediatric-next-imaging",
    "question": {
      "de": "Bei einem 9-jährigen Kind besteht weiter Verdacht auf akute hämatogene Osteomyelitis. Initiale Röntgenaufnahmen klären den Befund nicht; weitere Bildgebung zur Diagnose und Ausdehnung ist erforderlich. Welche Modalität wird nach PIDS/IDSA 2021 bevorzugt?",
      "en": "A 9-year-old child remains suspected of acute haematogenous osteomyelitis. Initial radiographs are inconclusive; additional imaging is required for diagnosis and extent. Which modality is preferred by PIDS/IDSA 2021?",
      "fa": "در کودک ۹ ساله هنوز شک به استئومیلیت حاد هماتوژن وجود دارد. رادیوگرافی اولیه نتیجه را روشن نکرده و برای تشخیص و تعیین وسعت تصویربرداری بیشتر لازم است. طبق PIDS/IDSA ۲۰۲۱ کدام روش ترجیح داده می‌شود؟"
    },
    "options": [
      {
        "de": "MRT der betroffenen Region",
        "en": "MRI of the affected region",
        "fa": "MRI ناحیهٔ درگیر"
      },
      {
        "de": "CT der betroffenen Region",
        "en": "CT of the affected region",
        "fa": "CT ناحیهٔ درگیر"
      },
      {
        "de": "Knochenszintigrafie",
        "en": "Bone scintigraphy",
        "fa": "اسکن استخوان"
      },
      {
        "de": "Sonografie der betroffenen Region",
        "en": "Ultrasound of the affected region",
        "fa": "سونوگرافی ناحیهٔ درگیر"
      }
    ],
    "correct": "A",
    "explanation": {
      "de": "Wenn bei pädiatrischer akuter hämatogener Osteomyelitis weitere Bildgebung nötig ist, bevorzugt die Leitlinie MRT gegenüber CT, Szintigrafie oder Sonografie. Die Empfehlung ist konditional bei sehr niedriger Evidenzsicherheit; nicht jedes unkomplizierte Kind braucht zusätzliche MRT.",
      "en": "When further imaging is needed in paediatric acute haematogenous osteomyelitis, the guideline favours MRI over CT, scintigraphy or ultrasound. This is conditional with very low-certainty evidence; not every uncomplicated child requires additional MRI.",
      "fa": "اگر در استئومیلیت حاد هماتوژن کودکان تصویربرداری بیشتر لازم باشد، راهنما MRI را بر CT، اسکن استخوان یا سونوگرافی ترجیح می‌دهد. توصیه مشروط با قطعیت بسیار پایین شواهد است؛ همهٔ کودکان با بیماری بدون عارضه به MRI تکمیلی نیاز ندارند."
    },
    "wrongExplanations": {
      "B": {
        "de": "Die Leitlinie bevorzugt für den beschriebenen weiteren Bildgebungsbedarf MRT gegenüber CT. Daraus folgt kein Verbot klinisch begründeter CT in anderen Situationen.",
        "en": "For this additional imaging requirement, the guideline favours MRI over CT. This is not a ban on clinically justified CT in other settings.",
        "fa": "برای نیاز تکمیلی توصیف‌شده، راهنما MRI را بر CT ترجیح می‌دهد؛ این به معنای ممنوعیت CT با اندیکاسیون بالینی در موقعیت‌های دیگر نیست."
      },
      "C": {
        "de": "MRT wird für diese Fragestellung gegenüber Knochenszintigrafie bevorzugt; die Empfehlung gilt hier für pädiatrische AHO.",
        "en": "MRI is preferred over bone scintigraphy for this question; the recommendation here concerns paediatric AHO.",
        "fa": "برای این پرسش MRI بر اسکن استخوان ترجیح دارد؛ این توصیه در اینجا مربوط به AHO کودکان است."
      },
      "D": {
        "de": "Sonografie kann etwa einen angrenzenden Gelenkerguss oder eine Weichteilausbreitung ergänzend beurteilen; sie ersetzt die bevorzugte MRT-Beurteilung der Knocheninfektion hier nicht.",
        "en": "Ultrasound may complement assessment of adjacent joint effusion or soft-tissue spread; it does not replace the preferred MRI assessment of bone infection here.",
        "fa": "سونوگرافی می‌تواند ارزیابی افیوژن مفصل مجاور یا انتشار بافت نرم را تکمیل کند؛ اما اینجا جای ارزیابی ترجیحی MRI عفونت استخوان را نمی‌گیرد."
      }
    },
    "sources": [
      "https://www.idsociety.org/practice-guideline/bone-and-joint-infections---osteomyelitis/"
    ],
    "topicId": "osteomyelitis",
    "fach": "msk",
    "difficulty": 2
  }
]
export const newQuestions=(lang='de')=>records.map(item=>({id: 'aq-msk-'+item.topicId+'-'+lang+'-'+item.key,fach:item.fach||'msk',tags:[item.topicId],...(item.difficulty?{difficulty:item.difficulty}:{}),question:pick(item.question,lang),options:item.options.map((text,i)=>({id:'ABCD'[i],text:pick(text,lang)})),correct:item.correct,explanation:pick(item.explanation,lang),wrongExplanations:Object.fromEntries(Object.entries(item.wrongExplanations).map(([key,value])=>[key,pick(value,lang)])),...(item.image?{image:Object.fromEntries(Object.entries(item.image).map(([key,value])=>[key,pick(value,lang)]))}:{}),sources:item.sources||[]}))
export const newCards=[
  {
    "id": "aq-msk-perthes-early-mri",
    "topicId": "morbus-perthes",
    "category": {
      "de": "Früherkennung",
      "en": "Early detection",
      "fa": "تشخیص زودرس"
    },
    "front": {
      "de": "Perthes-Verdacht trotz unauffälligem Röntgen: Welche Rolle hat die MRT?",
      "en": "Suspected Perthes despite unremarkable radiographs: what is the role of MRI?",
      "fa": "شک به پرتس با رادیوگرافی غیرقابل‌توجه: نقش MRI چیست؟"
    },
    "answer": {
      "de": "Sie kann frühe Knochenmark-/Femurkopfveränderungen zeigen, bevor sie radiographisch sichtbar sind.",
      "en": "It can show early marrow/femoral-head changes before radiographic visibility.",
      "fa": "می‌تواند تغییرات زودرس مغز استخوان/سر فمور را پیش از آشکارشدن در رادیوگرافی نشان دهد."
    },
    "explanation": {
      "de": "Bei anhaltendem klinischem Verdacht kann die MRT frühe Femurkopfveränderungen darstellen, die im Röntgen noch fehlen. Die Bildgebung bleibt mit Untersuchung und Verlauf zu verbinden; aus kleinen historischen Studien wird hier keine allgemeine Sensitivität abgeleitet.",
      "en": "When clinical suspicion persists, MRI can depict early femoral-head changes absent on radiographs. Correlate imaging with examination and follow-up; no universal sensitivity is inferred from small historical studies.",
      "fa": "با تداوم شک بالینی، MRI می‌تواند تغییرات زودرس سر فمور را نشان دهد که در رادیوگرافی هنوز وجود ندارند. تصویربرداری باید با معاینه و سیر بالینی سنجیده شود؛ از مطالعات کوچک تاریخی حساسیت همگانی نتیجه گرفته نمی‌شود."
    },
    "sources": [
      "https://pubmed.ncbi.nlm.nih.gov/2915033/",
      "https://pubmed.ncbi.nlm.nih.gov/1837398/"
    ]
  },
  {
    "id": "aq-msk-perthes-image-report",
    "topicId": "morbus-perthes",
    "category": {
      "de": "Bildbefund",
      "en": "Image interpretation",
      "fa": "تفسیر تصویر"
    },
    "front": {
      "de": "Welche Veränderungen der Femurkopfepiphyse im Perthes-Verlauf beschreiben, ohne daraus allein die Therapie abzuleiten?",
      "en": "Which femoral-head epiphyseal changes should be described during Perthes follow-up without deriving treatment from them alone?",
      "fa": "کدام تغییرات اپی‌فیز سر فمور در پیگیری پرتس باید بدون تعیین درمان صرفاً بر اساس آن‌ها توصیف شوند؟"
    },
    "answer": {
      "de": "Sklerose, Fragmentierung, Höhenverlust/Abflachung und mögliche Formänderung im zeitlichen Verlauf.",
      "en": "Sclerosis, fragmentation, loss of height/flattening and possible contour changes over time.",
      "fa": "اسکلروز، قطعه‌قطعه‌شدن، کاهش ارتفاع/صاف‌شدن و تغییر احتمالی شکل در سیر زمانی."
    },
    "explanation": {
      "de": "Im Verlauf systematisch Dichte, Ossifikationsstruktur, Epiphysenhöhe und Kontur vergleichen und Veränderungen mit der Voruntersuchung beschreiben. Diese Befund-Checkliste bestimmt allein weder die individuelle Prognose noch die Therapie.",
      "en": "During follow-up, systematically compare density, ossification structure, epiphyseal height and contour with prior imaging. This reporting checklist alone determines neither individual prognosis nor treatment.",
      "fa": "در پیگیری، دانسیته، ساختار استخوان‌سازی، ارتفاع اپی‌فیز و کانتور را به‌طور نظام‌مند با بررسی قبلی مقایسه و تغییرات را توصیف کنید. این چک‌لیست گزارش به‌تنهایی پیش‌آگهی یا درمان فردی را تعیین نمی‌کند."
    },
    "sources": [
      "MSK.pdf physicalp126; actual page and stored image viewed2026-10-25",
      "https://doi.org/10.53347/rID-9742"
    ]
  },
  {
    "id": "aq-msk-perthes-bilateral-context",
    "topicId": "morbus-perthes",
    "category": {
      "de": "Differenzialdiagnose",
      "en": "Differential diagnosis",
      "fa": "تشخیص افتراقی"
    },
    "front": {
      "de": "Beide Femurkopfepiphysen sind relativ gleichzeitig und symmetrisch verändert. Welche Frage gehört in die Perthes-Differenzialdiagnose?",
      "en": "Both femoral-head epiphyses change relatively synchronously and symmetrically. What question belongs in the Perthes differential?",
      "fa": "هر دو اپی‌فیز سر فمور نسبتاً هم‌زمان و متقارن تغییر کرده‌اند. کدام پرسش در افتراق پرتس اهمیت دارد؟"
    },
    "answer": {
      "de": "Andere, auch systemische Ursachen oder eine epiphysäre Dysplasie mitprüfen; Bilateralität allein stellt keine Diagnose.",
      "en": "Consider other causes, including systemic disease or epiphyseal dysplasia; bilaterality alone is not a diagnosis.",
      "fa": "علل دیگر، از جمله بیماری سیستمیک یا دیسپلازی اپی‌فیزی، نیز بررسی شوند؛ دوطرفه‌بودن به‌تنهایی تشخیص نیست."
    },
    "explanation": {
      "de": "Der zeitliche und räumliche Befall hilft bei der Differenzialdiagnose. Er ersetzt weder klinischen Kontext noch die Beurteilung der gesamten Morphologie.",
      "en": "Temporal and spatial involvement informs the differential. It does not replace clinical context or assessment of the full morphology.",
      "fa": "الگوی زمانی و مکانی درگیری به افتراق کمک می‌کند، اما جای زمینهٔ بالینی و ارزیابی کل مورفولوژی را نمی‌گیرد."
    },
    "source": "https://posna.org/physician-education/study-guide/legg-calve-perthes-disease; https://pubmed.ncbi.nlm.nih.gov/35415150/"
  },
  {
    "id": "aq-msk-chondro-pattern",
    "topicId": "chondrokalzinose",
    "category": {
      "de": "Bildmuster",
      "en": "Imaging pattern",
      "fa": "الگوی تصویری"
    },
    "front": {
      "de": "Wie zeigt sich eine meniskale Chondrokalzinose im Röntgen?",
      "en": "How does meniscal chondrocalcinosis appear radiographically?",
      "fa": "کندروکلسی‌نوز منیسک در رادیوگرافی چگونه دیده می‌شود؟"
    },
    "answer": {
      "de": "Feine lineare oder punktförmige Verkalkungen im meniskalen Bereich.",
      "en": "Fine linear or punctate calcification in the meniscal region.",
      "fa": "کلسیفیکاسیون خطی یا نقطه‌ای ظریف در ناحیهٔ منیسک."
    },
    "explanation": {
      "de": "Feine lineare Dichten im meniskalen Bereich stützen den Bildbefund Chondrokalzinose. Sklerose, Osteophyten oder Gelenkspaltverschmälerung können zusätzlich bestehen, sind aber nicht das hier gesuchte Kalzifikationszeichen. Daraus allein lässt sich kein akuter CPPD-Schub ableiten.",
      "en": "Fine linear densities in the meniscal region support the imaging finding of chondrocalcinosis. Sclerosis, osteophytes or joint-space narrowing may coexist, but are not the calcification sign asked for. This finding alone does not establish an acute CPPD flare.",
      "fa": "کدورت‌های خطی ظریف در ناحیهٔ منیسک، یافتهٔ تصویری کندروکلسی‌نوز را پشتیبانی می‌کنند. اسکلروز، استئوفیت یا تنگی فضای مفصل ممکن است هم‌زمان باشند، اما علامت کلسیفیکاسیون مورد پرسش نیستند. این یافته به‌تنهایی حملهٔ حاد CPPD را اثبات نمی‌کند."
    },
    "sources": [
      "https://pubmed.ncbi.nlm.nih.gov/11566703/",
      "https://pmc.ncbi.nlm.nih.gov/articles/PMC11103298/"
    ]
  },
  {
    "id": "aq-msk-chondro-mri-pitfall",
    "topicId": "chondrokalzinose",
    "category": {
      "de": "MRT-Fallstrick",
      "en": "MRI pitfall",
      "fa": "دام MRI"
    },
    "front": {
      "de": "Bekannte Chondrokalzinose und hohes Meniskus-PD-Signal: Was vor dem Rissbefund prüfen?",
      "en": "Known chondrocalcinosis and high meniscal PD signal: what should be checked before reporting a tear?",
      "fa": "کندروکلسی‌نوز شناخته‌شده و سیگنال PD بالای منیسک: پیش از گزارش پارگی چه بررسی شود؟"
    },
    "answer": {
      "de": "Röntgenkorrelation und unabhängige Risszeichen; Kalzifikation kann Signal imitieren, einen echten Riss aber nicht ausschließen.",
      "en": "Radiographic correlation and independent tear signs; calcification can mimic signal but does not exclude a true tear.",
      "fa": "تطابق رادیوگرافی و نشانه‌های مستقل پارگی؛ کلسیفیکاسیون می‌تواند سیگنال را تقلید کند، اما پارگی واقعی را رد نمی‌کند."
    },
    "explanation": {
      "de": "Chondrokalzinose kann signalreich erscheinen und einen Riss imitieren; ein echter Riss kann dennoch zusätzlich bestehen. Deshalb Röntgenmuster, Nachbarschichten, sicheren Oberflächenkontakt und Morphologie gemeinsam beurteilen. Die Ursache aktueller Beschwerden braucht klinischen Kontext.",
      "en": "Chondrocalcinosis can appear bright and mimic a tear, while a true tear may coexist. Assess the radiographic pattern, adjacent slices, definite surface contact and morphology together. The cause of current symptoms requires clinical context.",
      "fa": "کندروکلسی‌نوز می‌تواند پرسیگنال دیده شود و پارگی را تقلید کند، در حالی که پارگی واقعی نیز ممکن است همراه آن باشد. الگوی رادیوگرافی، برش‌های مجاور، تماس قطعی با سطح و مورفولوژی با هم بررسی شوند. تعیین علت علائم فعلی به زمینهٔ بالینی نیاز دارد."
    },
    "sources": [
      "https://pubmed.ncbi.nlm.nih.gov/11566703/",
      "https://pmc.ncbi.nlm.nih.gov/articles/PMC11103298/"
    ]
  },
  {
    "id": "aq-msk-chondro-clinical-report",
    "topicId": "chondrokalzinose",
    "category": {
      "de": "Befundgrenze",
      "en": "Reporting limit",
      "fa": "حدود گزارش"
    },
    "front": {
      "de": "Meniskale Verkalkungen sind sichtbar; zur aktuellen Entzündung liegen keine klinischen Angaben vor. Welche Schlussfolgerung im Bericht vermeiden?",
      "en": "Meniscal calcification is visible but there is no clinical information about current inflammation. What reporting conclusion should be avoided?",
      "fa": "کلسیفیکاسیون منیسک دیده می‌شود، اما اطلاعات بالینی دربارهٔ التهاب فعلی وجود ندارد. از کدام نتیجه در گزارش باید پرهیز کرد؟"
    },
    "answer": {
      "de": "Nicht allein aus dem Bildbefund einen akuten symptomatischen CPPD-Schub als Beschwerdeursache festlegen.",
      "en": "Do not assign an acute symptomatic CPPD flare as the cause of symptoms from imaging alone.",
      "fa": "صرفاً از تصویر، حملهٔ حاد و علامت‌دار CPPD را علت علائم تعیین نکنید."
    },
    "explanation": {
      "de": "Kristallablagerungen und klinische Manifestation können auseinanderfallen. Der Bericht beschreibt den Bildbefund und macht seine klinische Einordnung vom passenden Kontext abhängig.",
      "en": "Crystal deposition and clinical manifestations may differ. Report the imaging finding and tie clinical attribution to the appropriate context.",
      "fa": "رسوب کریستال و تظاهر بالینی می‌توانند از هم جدا باشند. گزارش باید یافتهٔ تصویری را توصیف و نسبت‌دادن بالینی را به زمینهٔ مناسب وابسته کند."
    },
    "sources": [
      "https://pmc.ncbi.nlm.nih.gov/articles/PMC11103298/"
    ]
  },
  {
    "id": "aq-msk-osgood-localise",
    "topicId": "osgood-schlatter",
    "category": {
      "de": "Lokalisation",
      "en": "Localisation",
      "fa": "محل‌یابی"
    },
    "front": {
      "de": "Osgood-Schlatter versus proximaler Patellarsehnenschmerz: welcher Ansatz ist betroffen?",
      "en": "Osgood–Schlatter versus proximal patellar-tendon pain: which attachment is involved?",
      "fa": "آزگود–اشلاتر در مقایسه با درد پروگزیمال تاندون کشککی: کدام محل اتصال درگیر است؟"
    },
    "answer": {
      "de": "Osgood-Schlatter: distaler Patellarsehnenansatz an der Tuberositas tibiae; proximale Beschwerden liegen am unteren Patellapol.",
      "en": "Osgood–Schlatter: distal patellar-tendon attachment at the tibial tuberosity; proximal symptoms localise to the inferior patellar pole.",
      "fa": "آزگود–اشلاتر: اتصال دیستال تاندون کشککی به برجستگی درشت‌نی؛ علائم پروگزیمال در قطب تحتانی کشکک قرار دارند."
    },
    "explanation": {
      "de": "Die Lokalisation an der Tuberositas tibiae und am distalen Patellarsehnenansatz passt zur Osgood-Schlatter-Läsion. Für den Befund Symptome, Sehne und umgebende Weichteile gemeinsam beurteilen; eine Fragmentierung allein genügt nicht.",
      "en": "The tibial-tuberosity and distal patellar-tendon location fits an Osgood–Schlatter lesion. Assess symptoms, tendon and surrounding soft tissues together; fragmentation alone is insufficient.",
      "fa": "محل درگیری در برجستگی درشت‌نی و اتصال دیستال تاندون کشککی با ضایعهٔ آزگود–اشلاتر سازگار است. علائم، تاندون و بافت نرم اطراف باید با هم ارزیابی شوند؛ قطعه‌قطعه‌شدن به‌تنهایی کافی نیست."
    },
    "source": "https://pubmed.ncbi.nlm.nih.gov/1438775/"
  },
  {
    "id": "aq-msk-osgood-ossicle-limit",
    "topicId": "osgood-schlatter",
    "category": {
      "de": "Befundgrenze",
      "en": "Interpretive limit",
      "fa": "حدود تفسیر"
    },
    "front": {
      "de": "Beweist ein persistierendes Ossikel nach Osgood-Schlatter fortbestehende Beschwerden?",
      "en": "Does a persistent ossicle after Osgood–Schlatter prove persistent symptoms?",
      "fa": "آیا استخوانچهٔ باقی‌مانده پس از آزگود–اشلاتر تداوم علائم را ثابت می‌کند؟"
    },
    "answer": {
      "de": "Nein. Es kann trotz klinischer Besserung unvereinigt bleiben.",
      "en": "No. It can remain ununited despite clinical improvement.",
      "fa": "خیر؛ ممکن است با وجود بهبود بالینی جوش‌نخورده باقی بماند."
    },
    "explanation": {
      "de": "In der ursprünglichen Bildgebungsserie blieben bei einzelnen klinisch gebesserten Fällen Ossikel unvereinigt. Ein Ossikel ist daher kein selbständiger Symptom- oder Therapieverlaufsmarker; Sehnen-/Weichteilbefund und Klinik mitbeurteilen.",
      "en": "In the original imaging series, some clinically improved cases retained ununited ossicles. An ossicle is therefore not a stand-alone marker of symptoms or treatment response; assess tendon/soft-tissue findings and the clinical course.",
      "fa": "در مجموعهٔ اصلی تصویربرداری، در بعضی مواردِ دارای بهبود بالینی استخوانچه‌ها جوش‌نخورده باقی ماندند. بنابراین استخوانچه شاخص مستقل علائم یا پاسخ درمانی نیست؛ یافته‌های تاندون/بافت نرم و سیر بالینی نیز ارزیابی شوند."
    },
    "source": "https://pubmed.ncbi.nlm.nih.gov/1438775/"
  },
  {
    "id": "aq-msk-osgood-report",
    "topicId": "osgood-schlatter",
    "category": {
      "de": "Befund",
      "en": "Reporting",
      "fa": "گزارش"
    },
    "front": {
      "de": "Welche Befunde ergänzen die Beschreibung eines Ossikels bei vermuteter Osgood-Schlatter-Läsion?",
      "en": "Which findings complement an ossicle description in suspected Osgood–Schlatter disease?",
      "fa": "در شک به ضایعهٔ آزگود–اشلاتر، کدام یافته‌ها توصیف استخوانچه را تکمیل می‌کنند؟"
    },
    "answer": {
      "de": "Distale Sehnendicke und -signal, umgebende Weichteil-/Bursareaktion und die Übereinstimmung mit der klinischen Schmerzlokalisation.",
      "en": "Distal tendon thickness and signal, surrounding soft-tissue/bursal reaction and concordance with clinical pain localisation.",
      "fa": "ضخامت و سیگنال تاندون دیستال، واکنش بافت نرم/بورس اطراف و تطابق با محل درد بالینی."
    },
    "explanation": {
      "de": "Ossikel und Sehnen-/Weichteilbefund sind unterschiedliche Informationen. Die Bildgebung beschreibt ihre Morphologie; die klinische Zuordnung braucht den lokalen Kontext.",
      "en": "The ossicle and tendon/soft-tissue findings provide different information. Imaging describes morphology; clinical attribution needs the local context.",
      "fa": "استخوانچه و یافته‌های تاندون/بافت نرم اطلاعات متفاوتی هستند. تصویربرداری مورفولوژی را توصیف می‌کند؛ نسبت‌دادن بالینی نیازمند زمینهٔ موضعی است."
    },
    "source": "https://pubmed.ncbi.nlm.nih.gov/1438775/"
  },
  {
    "id": "aq-msk-osteochondrosis-umbrella",
    "topicId": "weitere-osteochondrosen",
    "category": {
      "de": "Begriff",
      "en": "Terminology",
      "fa": "اصطلاح"
    },
    "front": {
      "de": "Was sagt der Sammelbegriff Osteochondrose in dieser Quelle aus, und was noch nicht?",
      "en": "What does the osteochondrosis umbrella term mean in this source, and what does it not yet specify?",
      "fa": "اصطلاح کلی استئوکندروز در این منبع چه معنایی دارد و چه چیزی را هنوز مشخص نمی‌کند؟"
    },
    "answer": {
      "de": "Eine Gruppe mit gestörter enchondraler Ossifikation; er legt allein weder eine einzelne Diagnose noch gemeinsame Stadien oder Therapie fest.",
      "en": "A group with disturbed endochondral ossification; it alone specifies neither a single diagnosis nor shared staging or treatment.",
      "fa": "گروهی با اختلال استخوان‌سازی درون‌غضروفی؛ به‌تنهایی نه یک تشخیص مشخص و نه مرحله‌بندی یا درمان مشترک را تعیین می‌کند."
    },
    "explanation": {
      "de": "Für die weitere Einordnung müssen Ort, Alter, Verlauf und das konkrete Krankheitsbild benannt werden.",
      "en": "Further interpretation requires location, age, course and the specific condition.",
      "fa": "برای تفسیر بعدی باید محل، سن، سیر و بیماری مشخص نام برده شوند."
    },
    "sources": [
      "MSK.pdf physicalp124 /printedp123; original renderedpage inspected2026-10-25"
    ]
  },
  {
    "id": "aq-msk-osteochondrosis-acute-physis",
    "topicId": "weitere-osteochondrosen",
    "category": {
      "de": "Abgrenzung",
      "en": "Distinction",
      "fa": "تمایز"
    },
    "front": {
      "de": "Wird eine akute traumatische Wachstumsfugenfraktur durch ihre Lage zur Osteochondrose?",
      "en": "Does an acute traumatic physeal fracture become osteochondrosis because of its location?",
      "fa": "آیا شکستگی تروماتیک حاد صفحهٔ رشد صرفاً به‌علت محل آن استئوکندروز است؟"
    },
    "answer": {
      "de": "Nein. Die Quelle grenzt akute Verletzungen des Wachstumsknorpels ausdrücklich davon ab.",
      "en": "No. The source explicitly distinguishes acute growth-cartilage injuries.",
      "fa": "خیر؛ منبع آسیب‌های حاد غضروف رشد را صریحاً از آن جدا می‌کند."
    },
    "explanation": {
      "de": "Die Lage am Wachstumsknorpel macht eine akute traumatische Fraktur nicht zur Osteochondrose. Die Quelle trennt akute Wachstumsfugenverletzungen von der Gruppe mit gestörter enchondraler Ossifikation. Der konkrete Frakturverlauf wird gesondert beschrieben.",
      "en": "Location at growth cartilage does not turn an acute traumatic fracture into osteochondrosis. The source distinguishes acute physeal injuries from the group with disturbed endochondral ossification. Describe the specific fracture course separately.",
      "fa": "محل ضایعه در غضروف رشد، شکستگی تروماتیک حاد را به استئوکندروز تبدیل نمی‌کند. منبع آسیب حاد صفحهٔ رشد را از گروه اختلال استخوان‌سازی درون‌غضروفی جدا می‌کند. مسیر مشخص شکستگی باید جداگانه توصیف شود."
    },
    "sources": [
      "MSK.pdf physicalp124 /printedp123; original renderedpage inspected2026-10-25"
    ]
  },
  {
    "id": "aq-msk-osteochondrosis-adult-term",
    "topicId": "weitere-osteochondrosen",
    "category": {
      "de": "Sprachkontext",
      "en": "Language context",
      "fa": "زمینهٔ زبانی"
    },
    "front": {
      "de": "Wie wird Osteochondrosis intervertebralis bei einem adulten degenerativen Bandscheibenbefund eingeordnet?",
      "en": "How is osteochondrosis intervertebralis interpreted in an adult degenerative disc report?",
      "fa": "Osteochondrosis intervertebralis در گزارش دژنراسیون دیسک بزرگسال چگونه تفسیر می‌شود؟"
    },
    "answer": {
      "de": "Als deutschsprachiger degenerativer Bandscheibenbegriff mit Knochenreaktion; nicht automatisch als kindliche Osteochondrose.",
      "en": "As German-language terminology for disc degeneration with an osseous reaction, not automatically childhood osteochondrosis.",
      "fa": "به‌عنوان اصطلاح آلمانی برای دژنراسیون دیسک همراه واکنش استخوانی، نه لزوماً استئوکندروز کودکان."
    },
    "explanation": {
      "de": "Die Quelle weist auf den deutschsprachigen Gebrauch bei adultem Bandscheibenverschleiß mit Knochenreaktion hin; als englischen Ausdruck nennt sie degenerative disc disease. Alter, Lokalisation und der vollständige Befund verhindern eine Verwechslung mit kindlichen Osteochondrosen.",
      "en": "The source describes German-language use for adult disc degeneration with an osseous reaction, giving degenerative disc disease as the English term. Age, location and the full report prevent confusion with childhood osteochondroses.",
      "fa": "منبع به کاربرد آلمانی این اصطلاح برای دژنراسیون دیسک بزرگسالان همراه واکنش استخوانی اشاره دارد و معادل انگلیسی را degenerative disc disease می‌نامد. سن، محل و متن کامل گزارش از اشتباه با استئوکندروز کودکان جلوگیری می‌کنند."
    },
    "sources": [
      "MSK.pdf physicalp124 /printedp123; original renderedpage inspected2026-10-25"
    ]
  },
  {
    "id": "aq-msk-ocd-juvenile-rim",
    "topicId": "osteochondrosis-dissecans",
    "front": {
      "de": "Juvenile OCD: Warum beweist ein T2-hyperintenser Grenzsaum allein keine Instabilität?",
      "en": "Juvenile OCD: why does a high-T2 interface rim alone not prove instability?",
      "fa": "OCD نوجوانان: چرا حاشیهٔ پرسیگنال T2 به‌تنهایی ناپایداری را ثابت نمی‌کند؟"
    },
    "answer": {
      "de": "Gebräuchliche MRT-Kriterien sind bei juvenilen Läsionen weniger spezifisch; den Saum mit Reife, weiteren Zeichen und Verlauf abgleichen.",
      "en": "Conventional MRI criteria are less specific in juvenile lesions; integrate skeletal maturity, other signs and clinical course.",
      "fa": "معیارهای رایج MRI در ضایعات نوجوانان اختصاصیت کمتری دارند؛ بلوغ اسکلتی، سایر علائم و سیر بالینی را نیز لحاظ کنید."
    },
    "explanation": {
      "de": "In der arthroskopisch korrelierten Primärstudie waren gebräuchliche MRT-Instabilitätskriterien bei juvenilen Läsionen weniger spezifisch als bei adulten. Ein Grenzsaum allein erlaubt deshalb hier keine sichere Stabilitätszuordnung. Alter, Knorpel/Subchondralplatte, weitere Zeichen und Verlauf mitbeurteilen.",
      "en": "In the arthroscopy-correlated primary study, conventional MRI instability criteria were less specific in juvenile than adult lesions. An interface rim alone therefore cannot establish stability status here. Integrate skeletal maturity, cartilage/subchondral plate, other signs and clinical course.",
      "fa": "در مطالعهٔ اولیه با مرجع آرتروسکوپی، معیارهای رایج MRI ناپایداری در ضایعات نوجوانان از بزرگسالان کم‌اختصاص‌تر بودند. بنابراین حاشیهٔ محل تماس به‌تنهایی در اینجا وضعیت پایداری را قطعی نمی‌کند. بلوغ اسکلتی، غضروف/صفحهٔ زیرغضروفی، سایر علائم و سیر بالینی را نیز ارزیابی کنید."
    },
    "source": "https://pubmed.ncbi.nlm.nih.gov/18552309/"
  },
  {
    "id": "aq-msk-ocd-displaced-report",
    "topicId": "osteochondrosis-dissecans",
    "front": {
      "de": "OCD: Das Fragment fehlt im Defektbett und liegt frei im Gelenk. Welche beiden Befundelemente gehören in den Bericht?",
      "en": "OCD: the fragment is absent from its bed and lies loose in the joint. Which two findings belong in the report?",
      "fa": "OCD: قطعه در بستر نقص وجود ندارد و آزاد در مفصل قرار گرفته است. کدام دو یافته باید گزارش شوند؟"
    },
    "answer": {
      "de": "Leeres Defektbett und dislozierten freien Gelenkkörper mit Lage beschreiben.",
      "en": "Describe the empty defect bed and displaced loose body, including location.",
      "fa": "بستر خالی نقص و جسم آزاد جابه‌جا‌شده را همراه محل آن توصیف کنید."
    },
    "explanation": {
      "de": "Dies entspricht dem dislozierten Stadium IV der in der Lektion verwendeten Quelleinteilung; ein Ödem oder Grenzsaum ohne Fragmentverlagerung ist etwas anderes.",
      "en": "This corresponds to displaced stage IV in the source classification used by this lesson; oedema or an interface rim without fragment displacement is different.",
      "fa": "این وضعیت با مرحلهٔ IV جابه‌جا‌شده در طبقه‌بندی منبعِ این درس سازگار است؛ ادم یا حاشیهٔ محل تماس بدون جابه‌جایی قطعه، وضعیت متفاوتی است."
    },
    "source": "MSK.pdf physical pages128–129; source-specific classification"
  },
  {
    "id": "aq-msk-patella-signal-clinical",
    "topicId": "patella-streckapparat",
    "front": {
      "de": "Zufällig erhöhtes T2-Signal der proximalen Patellarsehne, aber keine passende Druck- oder Belastungsschmerzhaftigkeit: Wie vermeiden Sie eine Überdiagnose?",
      "en": "Incidental proximal patellar tendon T2 hyperintensity without corresponding tenderness or load-related pain: how do you avoid overdiagnosis?",
      "fa": "افزایش اتفاقی سیگنال T2 تاندون پروگزیمال کشککی بدون حساسیت فشاری یا درد مرتبط با بارگذاری در همان محل: چگونه از بیش‌تشخیصی پرهیز می‌کنید؟"
    },
    "answer": {
      "de": "Signaländerung beschreiben und mit Klinik und Sehnenmorphologie abgleichen; das Signal allein beweist keine symptomatische Tendinopathie.",
      "en": "Describe the signal change and correlate symptoms and tendon morphology; signal alone does not establish symptomatic tendinopathy.",
      "fa": "تغییر سیگنال را توصیف و با علائم و مورفولوژی تاندون تطبیق دهید؛ سیگنال به‌تنهایی تندینوپاتی علامت‌دار را ثابت نمی‌کند."
    },
    "explanation": {
      "de": "Eine retrospektive Primärstudie fand proximale T2-Signalanhebungen häufig ohne zugehörige klinische Tendinopathie. Das hebt einen passenden klinisch-morphologischen Befund nicht auf, begrenzt aber die Aussage eines isolierten Signals.",
      "en": "A retrospective primary study found proximal T2 hyperintensity commonly without associated clinical tendinopathy. This does not negate concordant clinical and structural findings, but limits interpretation of isolated signal.",
      "fa": "مطالعهٔ اولیهٔ گذشته‌نگر، افزایش سیگنال T2 پروگزیمال را اغلب بدون تندینوپاتی بالینی همراه یافت. این موضوع یافته‌های بالینی و ساختاری هم‌خوان را نفی نمی‌کند، اما تفسیر سیگنال منفرد را محدود می‌کند."
    },
    "source": "https://pubmed.ncbi.nlm.nih.gov/30903258/"
  },
  {
    "id": "aq-msk-avn-imaging-specificity",
    "topicId": "avn-huefte",
    "front": {
      "de": "Hüftschmerz, normales Röntgen und Knochenmarködem im MRT: Reicht das Ödem allein zur AVN-Diagnose und zu ARCO I?",
      "en": "Hip pain, normal radiographs and MRI marrow oedema: is oedema alone sufficient to diagnose AVN and ARCO I?",
      "fa": "درد مفصل ران، رادیوگرافی طبیعی و ادم مغز استخوان در MRI: آیا ادم به‌تنهایی برای تشخیص AVN و مرحلهٔ ARCO I کافی است؟"
    },
    "answer": {
      "de": "Nein. Ein für Osteonekrose positiver MRT-/Szintigrafiebefund ist gefordert; Ödem allein ist unspezifisch.",
      "en": "No. A positive MRI/bone-scan finding for osteonecrosis is required; oedema alone is nonspecific.",
      "fa": "خیر. یافتهٔ مثبت MRI/اسکن استخوان به نفع استئونکروز لازم است؛ ادم به‌تنهایی غیراختصاصی است."
    },
    "explanation": {
      "de": "Die Lektion trennt die undatierte PDF-Tabelle von ARCO 2019. Den nekrotischen Herd und sein Randmuster beurteilen, nicht jedes Ödem als Nekrose einstufen.",
      "en": "The lesson separates the undated PDF table from ARCO 2019. Assess the necrotic lesion and its interface pattern rather than labelling every oedema as necrosis.",
      "fa": "درس، جدول بدون تاریخ PDF را از ARCO ۲۰۱۹ جدا می‌کند. کانون نکروتیک و الگوی حاشیهٔ آن را ارزیابی کنید، نه آنکه هر ادمی نکروز تلقی شود."
    },
    "source": "https://pubmed.ncbi.nlm.nih.gov/31866252/; https://pubmed.ncbi.nlm.nih.gov/10990307/; https://pubmed.ncbi.nlm.nih.gov/15145483/"
  },
  {
    "id": "aq-msk-avn-structural-stage",
    "topicId": "avn-huefte",
    "front": {
      "de": "ARCO 2019: Welche Strukturmerkmale trennen Stadium II, III und IV?",
      "en": "ARCO 2019: which structural findings distinguish stages II, III and IV?",
      "fa": "ARCO ۲۰۱۹: کدام یافته‌های ساختاری مراحل II، III و IV را از هم جدا می‌کنند؟"
    },
    "answer": {
      "de": "II: Röntgenveränderungen ohne Fraktur/Abflachung. III: subchondrale/nekrotische Fraktur; Depression ≤2 oder >2 mm trennt IIIA/IIIB. IV: Arthrosezeichen.",
      "en": "II: radiographic abnormality without fracture/flattening. III: subchondral/necrotic-zone fracture; depression ≤2 or >2 mm separates IIIA/IIIB. IV: osteoarthritis.",
      "fa": "II: تغییر رادیوگرافیک بدون شکستگی/صاف‌شدن. III: شکستگی زیرغضروفی/ناحیهٔ نکروتیک؛ فرورفتگی ≤۲ یا >۲ میلی‌متر IIIA/IIIB را جدا می‌کند. IV: آرتروز."
    },
    "explanation": {
      "de": "ARCO 2019 ordnet die subchondrale oder nekrotische Fraktur Stadium III zu: IIIA bei Depression ≤2 mm, IIIB bei >2 mm. Stadium IV erfordert radiographische Arthrosezeichen; die Depression allein macht kein Stadium IV.",
      "en": "ARCO 2019 assigns subchondral or necrotic-zone fracture to stage III: IIIA for depression ≤2 mm and IIIB for >2 mm. Stage IV requires radiographic osteoarthritis; depression alone does not make stage IV.",
      "fa": "ARCO ۲۰۱۹ شکستگی زیرغضروفی یا ناحیهٔ نکروتیک را در مرحلهٔ III قرار می‌دهد: IIIA برای فرورفتگی ≤۲ میلی‌متر و IIIB برای >۲ میلی‌متر. مرحلهٔ IV به نشانه‌های رادیوگرافیک آرتروز نیاز دارد؛ فرورفتگی به‌تنهایی مرحلهٔ IV ایجاد نمی‌کند."
    },
    "source": "https://pubmed.ncbi.nlm.nih.gov/31866252/"
  },
  {
    "id": "aq-msk-avn-report-fracture",
    "topicId": "avn-huefte",
    "front": {
      "de": "Femurkopfosteonekrose mit Kollaps: Welche Befundangaben machen das Staging nachvollziehbar?",
      "en": "Femoral-head osteonecrosis with collapse: which report findings make staging traceable?",
      "fa": "استئونکروز سر فمور همراه فروریزش: کدام اطلاعات گزارش، مرحله‌بندی را قابل پیگیری می‌کنند؟"
    },
    "answer": {
      "de": "Fraktur/Kontureinbruch, gemessene Depression und Gelenkspalt-/Arthrosezeichen angeben; verwendete ARCO-Version nennen.",
      "en": "State fracture/contour collapse, measured depression and joint-space/osteoarthritis findings; identify the ARCO version.",
      "fa": "شکستگی/فروریزش کانتور، فرورفتگی اندازه‌گیری‌شده و وضعیت فضای مفصلی/نشانه‌های آرتروز را ذکر و نسخهٔ ARCO را مشخص کنید."
    },
    "explanation": {
      "de": "Die Version und die strukturellen Merkmale sind aussagekräftiger als eine alleinige Stufenzahl oder Ödembeschreibung; daraus folgt kein automatischer Therapiebefehl.",
      "en": "The version and structural findings are more informative than a stage number or oedema description alone; they do not impose an automatic treatment instruction.",
      "fa": "نسخه و یافته‌های ساختاری از شمارهٔ مرحله یا توصیف ادم به‌تنهایی گویاترند؛ این اطلاعات دستور درمانی خودکار ایجاد نمی‌کنند."
    },
    "source": "https://pubmed.ncbi.nlm.nih.gov/31866252/"
  },
  {
    "id": "aq-msk-melor-morphology",
    "topicId": "melorheostose",
    "front": {
      "de": "Welches klassische Röntgenmuster verbindet Melorheostose mit „tropfendem Kerzenwachs“?",
      "en": "Which classic radiographic pattern links melorheostosis with “dripping candlewax”?",
      "fa": "کدام الگوی کلاسیک رادیوگرافی، ملوره‌اوستوز را به «موم شمعِ چکیده» مرتبط می‌کند؟"
    },
    "answer": {
      "de": "Irreguläre, fließende kortikale Hyperostose entlang eines Knochens; die tatsächliche Verteilung und Ausdehnung beschreiben.",
      "en": "Irregular flowing cortical hyperostosis along a bone; describe the actual distribution and extent.",
      "fa": "هیپراستوز قشری نامنظم و پیوسته در امتداد استخوان؛ توزیع و وسعت واقعی را توصیف کنید."
    },
    "explanation": {
      "de": "Das ist ein klassisches, aber nicht obligatorisches Muster jedes Falls. Andere radiographische Erscheinungsformen sind beschrieben.",
      "en": "This is a classic pattern, not a required appearance of every case. Other radiographic patterns are described.",
      "fa": "این یک الگوی کلاسیک است، نه نمای الزامی تمام موارد. الگوهای رادیوگرافیک دیگری نیز توصیف شده‌اند."
    },
    "source": "https://onlinelibrary.wiley.com/doi/full/10.1002/jbm4.10472"
  },
  {
    "id": "aq-msk-melor-mri-role",
    "topicId": "melorheostose",
    "front": {
      "de": "Bei Melorheostose erklärt die sichtbare Knochenverteilung die Beschwerden nicht ausreichend. Welche ergänzende Frage kann MRT klären?",
      "en": "In melorheostosis, visible bone distribution does not fully explain symptoms. Which complementary question can MRI address?",
      "fa": "در ملوره‌اوستوز، توزیع استخوانی قابل مشاهده علائم را به‌طور کامل توضیح نمی‌دهد. MRI کدام پرسش تکمیلی را می‌تواند بررسی کند؟"
    },
    "answer": {
      "de": "Begleitende Weichteilveränderungen, Ödem und Knochenmarkreaktion prüfen; CT beschreibt die knöcherne Ausdehnung und Ossifikationen besonders gut.",
      "en": "Assess associated soft-tissue abnormalities, oedema and marrow reaction; CT particularly defines osseous extent and ossifications.",
      "fa": "تغییرات همراه بافت نرم، ادم و واکنش مغز استخوان را بررسی کند؛ CT وسعت استخوانی و استخوانی‌شدن‌ها را به‌خوبی مشخص می‌کند."
    },
    "explanation": {
      "de": "In der 40-Fälle-Serie ergänzte MRT vor allem Weichteil- und reaktive Befunde. Das ist eine gezielte Ergänzung, keine automatische MRT-Pflicht jedes Zufallsbefunds.",
      "en": "In the 40-case series, MRI mainly added soft-tissue and reactive findings. This is a targeted complement, not mandatory MRI for every incidental finding.",
      "fa": "در مجموعهٔ ۴۰ موردی، MRI عمدتاً یافته‌های بافت نرم و واکنشی را تکمیل کرد. این بررسی تکمیلی هدفمند است، نه الزام MRI برای هر یافتهٔ اتفاقی."
    },
    "source": "https://onlinelibrary.wiley.com/doi/full/10.1002/jbm4.10472"
  },
  {
    "id": "aq-msk-melor-edema-limit",
    "topicId": "melorheostose",
    "front": {
      "de": "Schließt Ödem neben einer typischen sklerotischen Melorheostose-Komponente die Erkrankung aus?",
      "en": "Does oedema adjacent to a typical sclerotic melorheostosis component exclude the disease?",
      "fa": "آیا ادم مجاور جزء اسکلروتیک تیپیک ملوره‌اوستوز، بیماری را رد می‌کند؟"
    },
    "answer": {
      "de": "Nein. Den signalarmen sklerotischen Kern von begleitenden reaktiven Weichteil-/Markveränderungen unterscheiden.",
      "en": "No. Distinguish the low-signal sclerotic core from associated reactive soft-tissue or marrow changes.",
      "fa": "خیر. هستهٔ اسکلروتیک کم‌سیگنال را از تغییرات واکنشی همراهِ بافت نرم یا مغز استخوان جدا کنید."
    },
    "explanation": {
      "de": "Die absolute PDF-Aussage „kein Ödem“ wird durch die primäre Bildgebungsserie begrenzt: Ödem kann als Begleitbefund vorkommen und ist kein pauschaler Ausschlusstest.",
      "en": "The PDF’s absolute “no oedema” statement is qualified by the primary imaging series: oedema can coexist and is not a blanket exclusion test.",
      "fa": "گزارهٔ مطلق «نبود ادم» در PDF با مجموعهٔ اولیهٔ تصویربرداری تعدیل می‌شود: ادم ممکن است همراه باشد و آزمون کلی برای رد بیماری نیست."
    },
    "source": "https://onlinelibrary.wiley.com/doi/full/10.1002/jbm4.10472"
  },
  {
    "id": "aq-msk-knee-medial-report",
    "topicId": "kreuzbaender",
    "front": {
      "de": "MCL-Verletzung mit posteromedialem Ödem: Welche Angaben ergänzen eine bloße Gradzahl im Befund?",
      "en": "MCL injury with posteromedial oedema: which findings add value beyond a grade number?",
      "fa": "آسیب MCL همراه ادم خلفی‌ـ‌داخلی: کدام اطلاعات، گزارش را فراتر از ذکر یک درجه تکمیل می‌کنند؟"
    },
    "answer": {
      "de": "Ort und Kontinuität der MCL-Anteile beschreiben und das POL sowie weitere posteromediale Strukturen gezielt prüfen; Ödem allein nicht als bewiesene POL-Ruptur bezeichnen.",
      "en": "Describe the site and continuity of MCL components and assess the POL and other posteromedial structures directly; oedema alone does not establish a POL tear.",
      "fa": "محل و پیوستگی اجزای MCL را توصیف و POL و دیگر ساختارهای خلفی‌ـ‌داخلی را هدفمند بررسی کنید؛ ادم به‌تنهایی پارگی POL را اثبات نمی‌کند."
    },
    "explanation": {
      "de": "Die primäre MRT-Serie fand POL-Verletzungen häufig im Rahmen komplexer Bandverletzungen. Die Assoziation begründet eine gezielte Suche, nicht die automatische Diagnose einer Begleitruptur.",
      "en": "The primary MRI series found POL injury frequently within complex ligament injuries. Association supports targeted assessment, not automatic diagnosis of an associated tear.",
      "fa": "مجموعهٔ اولیهٔ MRI، آسیب POL را اغلب در چارچوب آسیب‌های پیچیدهٔ رباطی یافت. این ارتباط، بررسی هدفمند را توجیه می‌کند، نه تشخیص خودکار پارگی همراه را."
    },
    "source": "https://pubmed.ncbi.nlm.nih.gov/34626207/"
  },
  {
    "id": "aq-msk-infarct-report",
    "topicId": "knocheninfarkt",
    "front": {
      "de": "Verdacht auf medullären Knocheninfarkt: Welche drei Beschreibungsaspekte gehören in einen nützlichen Befund?",
      "en": "Suspected medullary bone infarct: which three descriptive dimensions belong in a useful report?",
      "fa": "شک به انفارکت مدولاری استخوان: کدام سه محور توصیفی باید در گزارش مفید ذکر شوند؟"
    },
    "answer": {
      "de": "Lokalisation/Markraumkompartiment, Randmuster und zentrales Fettmark getrennt beschreiben; Ödem, Weichteilreaktion und klinische Warnzeichen zusätzlich einordnen.",
      "en": "Describe location/marrow compartment, border pattern and central fatty marrow separately; additionally assess oedema, soft-tissue reaction and clinical warning signs.",
      "fa": "محل/کمپارتمان مغز استخوان، الگوی حاشیه و مغز استخوان چرب مرکزی را جداگانه توصیف کنید؛ ادم، واکنش بافت نرم و علائم هشدار بالینی را نیز ارزیابی کنید."
    },
    "explanation": {
      "de": "Der Begriff allein ersetzt keine morphologische Beschreibung. Ein fehlendes Double-Line-Zeichen schließt Osteonekrose nicht aus, und ein Infarktmuster schließt eine zusätzliche Infektion nicht aus.",
      "en": "The label alone does not replace morphologic description. An absent double-line sign does not exclude osteonecrosis, and an infarct pattern does not exclude superimposed infection.",
      "fa": "نام‌گذاری به‌تنهایی جای توصیف مورفولوژیک را نمی‌گیرد. نبود علامت خط دوگانه، استئونکروز را رد نمی‌کند و الگوی انفارکت نیز عفونت افزوده را رد نمی‌کند."
    },
    "source": "https://pubmed.ncbi.nlm.nih.gov/8508844/; https://pubmed.ncbi.nlm.nih.gov/10745133/"
  },
  {
    "id": "aq-msk-wrist-lister-course",
    "topicId": "sehnenpathologien-hand",
    "category": {
      "de": "Landmarken",
      "en": "Landmarks",
      "fa": "لندمارک‌ها"
    },
    "front": {
      "de": "Wie hilft das Lister-Tuberkulum bei der Unterscheidung von Strecksehnenfach II und III?",
      "en": "How does Lister tubercle help distinguish extensor compartments II and III?",
      "fa": "تکمهٔ لیستر چگونه به تفکیک کمپارتمان‌های اکستانسور II و III کمک می‌کند؟"
    },
    "answer": {
      "de": "II enthält ECRL/ECRB radial des Tuberkulums; III enthält EPL, der um Lister nach radial zum Daumen zieht.",
      "en": "II contains ECRL/ECRB radial to the tubercle; III contains EPL, which turns around Lister toward the thumb.",
      "fa": "II شامل ECRL/ECRB در سمت رادیال تکمه است؛ III شامل EPL است که دور لیستر به سمت رادیال و شست می‌رود."
    },
    "explanation": {
      "de": "Das Lister-Tuberkulum mit dem Verlauf der EPL-Sehne verknüpfen. Distal des dritten Fachs kann ihre Lage mit der Handgelenk- und Daumenstellung variieren.",
      "en": "Link Lister tubercle to the EPL course. Beyond the third compartment its position may vary with wrist and thumb posture.",
      "fa": "تکمهٔ لیستر را با مسیر EPL مرتبط کنید. در دیستال کمپارتمان سوم، موقعیت آن می‌تواند با وضعیت مچ و شست تغییر کند."
    },
    "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC11775041/"
  },
  {
    "id": "aq-msk-osteomyelitis-periosteal-limit",
    "category": {
      "de": "Befundinterpretation",
      "en": "Report interpretation",
      "fa": "تفسیر گزارش"
    },
    "front": {
      "de": "Was darf aus einer lamellären Periostreaktion nicht allein abgeleitet werden?",
      "en": "What cannot be inferred from a lamellated periosteal response alone?",
      "fa": "از واکنش پریوست لایه‌لایه، چه چیزی را نمی‌توان به‌تنهایی نتیجه گرفت؟"
    },
    "answer": {
      "de": "Weder eine bestimmte Histologie noch ein Erreger; Infektion und Neoplasie bleiben im Kontext zu prüfen.",
      "en": "Neither a specific histology nor a pathogen; consider infection and neoplasia in context.",
      "fa": "نه بافت‌شناسی مشخص و نه عامل عفونی؛ عفونت و نئوپلازی باید در زمینه بررسی شوند."
    },
    "explanation": {
      "de": "Das Reaktionsmuster beschreibt den Knochenumbau, nicht dessen Ursache. Die Quelle nennt Ewing-Sarkom und Osteomyelitis als Beispiele, ohne Exklusivität.",
      "en": "The response pattern describes bone remodelling, not its cause. The source lists Ewing sarcoma and osteomyelitis as nonexclusive examples.",
      "fa": "الگوی واکنش، بازسازی استخوان را توصیف می‌کند نه علت آن را. منبع یوئینگ و استئومیلیت را به‌عنوان نمونه‌های غیرانحصاری ذکر می‌کند."
    },
    "source": "MSK.pdf, PDF-S.73 / Druck-S.72.",
    "topicId": "osteomyelitis"
  },
  {
    "id": "aq-msk-osteomyelitis-brodie-variability",
    "category": {
      "de": "Brodie-Abszess",
      "en": "Brodie abscess",
      "fa": "آبسهٔ برودی"
    },
    "front": {
      "de": "Schließt eine fehlende Periostreaktion einen Brodie-Abszess aus?",
      "en": "Does absent periosteal response exclude a Brodie abscess?",
      "fa": "آیا نبود واکنش پریوست آبسهٔ برودی را رد می‌کند؟"
    },
    "answer": {
      "de": "Nein. Die radiologische Morphologie ist variabel; übrige Bildgebung, Klinik und Verlauf müssen zusammen bewertet werden.",
      "en": "No. Radiographic appearances vary; integrate other imaging findings, clinical context and course.",
      "fa": "خیر. ظاهر رادیولوژیک متغیر است؛ سایر یافته‌های تصویری، بالین و سیر باید با هم ارزیابی شوند."
    },
    "explanation": {
      "de": "Die ursprüngliche 25-Fall-Serie enthielt auch Läsionen ohne Periostreaktion. Sie liefert kein Ausschlusskriterium aus diesem einzelnen Zeichen.",
      "en": "The original 25-case series included lesions without periosteal response. It does not provide an exclusion rule from this one sign.",
      "fa": "مجموعهٔ اصلی ۲۵ موردی شامل ضایعات بدون واکنش پریوست نیز بود؛ از این نشانهٔ منفرد قاعدهٔ رد به دست نمی‌آید."
    },
    "source": "https://pubmed.ncbi.nlm.nih.gov/451190/",
    "topicId": "osteomyelitis"
  },
  {
    "id": "aq-msk-osteomyelitis-paediatric-imaging",
    "category": {
      "de": "Pädiatrische AHO",
      "en": "Paediatric AHO",
      "fa": "AHO کودکان"
    },
    "front": {
      "de": "Welche Bildgebungsfolge empfiehlt PIDS/IDSA2021 bei vermuteter pädiatrischer AHO, wenn weitere Bildgebung nötig ist?",
      "en": "What imaging sequence does PIDS/IDSA2021 recommend for suspected paediatric AHO when further imaging is needed?",
      "fa": "اگر در AHO احتمالی کودکان تصویربرداری بیشتر لازم باشد، PIDS/IDSA۲۰۲۱ چه توالی‌ای توصیه می‌کند؟"
    },
    "answer": {
      "de": "Zunächst Röntgen; bei weiterem Bildgebungsbedarf MRT gegenüber CT, Szintigrafie oder Sonografie bevorzugen.",
      "en": "Initial radiographs; if more imaging is needed, prefer MRI over CT, scintigraphy or ultrasound.",
      "fa": "ابتدا رادیوگرافی؛ اگر بررسی بیشتر لازم باشد، MRI بر CT، اسکن استخوان یا سونوگرافی ترجیح دارد."
    },
    "explanation": {
      "de": "Initiale Röntgenbilder können trotz Infektion wenig auffällig sein. Die zusätzliche MRT-Empfehlung ist konditional bei sehr unsicherer Evidenz und ist hier keine universelle Regel für Erwachsene oder jede Osteomyelitisform.",
      "en": "Initial radiographs may be inconspicuous despite infection. The additional MRI recommendation is conditional with very low-certainty evidence and is not a universal rule for adults or all forms of osteomyelitis.",
      "fa": "رادیوگرافی اولیه ممکن است با وجود عفونت چندان غیرطبیعی نباشد. توصیهٔ MRI تکمیلی مشروط با قطعیت بسیار پایین شواهد است و قاعدهٔ همگانی برای بزرگسالان یا همهٔ انواع استئومیلیت نیست."
    },
    "source": "https://www.idsociety.org/practice-guideline/bone-and-joint-infections---osteomyelitis/",
    "topicId": "osteomyelitis"
  }
]
export const topics=[
  {
    "id": "morbus-perthes",
    "subject": "msk",
    "title": {
      "de": "Morbus Perthes",
      "en": "Perthes disease",
      "fa": "بیماری پرتس"
    },
    "description": {
      "de": "Frühe Bildgebung, Verlaufsbefund und Differenzialkontext",
      "en": "Early imaging, follow-up morphology and differential context",
      "fa": "تصویربرداری زودرس، مورفولوژی پیگیری و زمینهٔ افتراقی"
    },
    "href": "/flashcards/morbus-perthes"
  },
  {
    "id": "chondrokalzinose",
    "subject": "msk",
    "title": {
      "de": "Chondrokalzinose am Knie",
      "en": "Knee chondrocalcinosis",
      "fa": "کندروکلسی‌نوز زانو"
    },
    "description": {
      "de": "Verkalkungsmuster, MRT-Fallstrick und Befundgrenzen",
      "en": "Calcification pattern, MRI pitfall and reporting limits",
      "fa": "الگوی کلسیفیکاسیون، دام MRI و حدود گزارش"
    },
    "href": "/flashcards/chondrokalzinose"
  },
  {
    "id": "osgood-schlatter",
    "subject": "msk",
    "title": {
      "de": "Morbus Osgood-Schlatter",
      "en": "Osgood–Schlatter disease",
      "fa": "بیماری آزگود–اشلاتر"
    },
    "description": {
      "de": "Ansatzlokalisation, Ossikel und klinische Korrelation",
      "en": "Insertion localisation, ossicles and clinical correlation",
      "fa": "محل اتصال، استخوانچه و تطابق بالینی"
    },
    "href": "/flashcards/osgood-schlatter"
  },
  {
    "id": "weitere-osteochondrosen",
    "subject": "msk",
    "title": {
      "de": "Osteochondrose: Begriff und Abgrenzung",
      "en": "Osteochondrosis: meaning and terminology",
      "fa": "استئوکندروز: مفهوم و تمایز اصطلاحی"
    },
    "description": {
      "de": "Sammelbegriff, akute Physisverletzung und adulter Sprachgebrauch",
      "en": "Umbrella term, acute physeal injury and adult terminology",
      "fa": "اصطلاح کلی، آسیب حاد صفحهٔ رشد و کاربرد در بزرگسالان"
    },
    "href": "/flashcards/weitere-osteochondrosen"
  },
  {
    "id": "avn-huefte",
    "title": {
      "de": "Avaskuläre Femurkopfnekrose",
      "en": "Femoral-head osteonecrosis",
      "fa": "استئونکروز سر فمور"
    },
    "subject": "msk",
    "description": {
      "de": "Bildmuster · ARCO 2019 · strukturierter Befund",
      "en": "Imaging pattern · ARCO 2019 · structured reporting",
      "fa": "الگوی تصویری · ARCO ۲۰۱۹ · گزارش ساختاریافته"
    },
    "href": "/flashcards/avn-huefte"
  },
  {
    "id": "melorheostose",
    "title": {
      "de": "Melorheostose",
      "en": "Melorheostosis",
      "fa": "ملوره‌اوستوز"
    },
    "subject": "msk",
    "description": {
      "de": "Kortikale Hyperostose · ergänzende MRT · Befundgrenzen",
      "en": "Cortical hyperostosis · complementary MRI · interpretation limits",
      "fa": "هیپراستوز قشری · MRI تکمیلی · محدودیت تفسیر"
    },
    "href": "/flashcards/melorheostose"
  },
  {
    "id": "osteomyelitis",
    "title": {
      "de": "Osteomyelitis: Differentialhinweise",
      "en": "Osteomyelitis: differential clues",
      "fa": "استئومیلیت: سرنخ‌های افتراقی"
    },
    "subject": "msk",
    "description": {
      "de": "Periostmuster · Brodie-Variabilität · begrenzte pädiatrische Bildgebungsempfehlung",
      "en": "Periosteal pattern · Brodie variability · scoped paediatric imaging recommendation",
      "fa": "الگوی پریوست · تنوع برودی · توصیهٔ محدود تصویربرداری کودکان"
    },
    "href": "/flashcards/osteomyelitis"
  }
]
export const routeCoverage=[
  {
    "route": "/msk/trauma/radiuskoepfchenfraktur",
    "topicId": "radiuskoepfchenfraktur",
    "learningGoals": [
      {
        "id": "alignment",
        "text": {
          "de": "Radiokapitellare Stellung und Fettkissenzeichen mit ihren Aussagegrenzen einordnen.",
          "en": "Interpret radiocapitellar alignment and fat-pad signs within their limits.",
          "fa": "هم‌راستایی رادیوکاپیتلار و علامت بالشتک چربی را با حدود نتیجه‌گیری آن‌ها تفسیر کنید."
        },
        "questionIds": [
          "rk-fettkissen-1-de",
          "rk-rcline-1-de",
          "aq-msk-radiuskoepfchenfraktur-de-annotated-alignment-limit"
        ],
        "cardIds": [
          "rk-fc-3",
          "rk-fc-4"
        ]
      },
      {
        "id": "classification",
        "text": {
          "de": "Mason-Morphologie benennen und von einer Therapieanordnung unterscheiden.",
          "en": "Name Mason morphology and distinguish classification from treatment instructions.",
          "fa": "مورفولوژی ماسون را نام ببرید و طبقه‌بندی را از دستور درمان جدا کنید."
        },
        "questionIds": [
          "rk-mason-1-de",
          "rk-mason-2-de",
          "rk-therapie-1-de"
        ],
        "cardIds": [
          "rk-fc-1",
          "rk-fc-2"
        ]
      },
      {
        "id": "associated",
        "text": {
          "de": "Terrible Triad und Essex-Lopresti als relevante Begleitverletzungen erkennen.",
          "en": "Recognise terrible triad and Essex–Lopresti associated injuries.",
          "fa": "آسیب‌های همراه مهمِ سه‌گانهٔ وحشتناک و اسکس‌لوپرستی را تشخیص دهید."
        },
        "questionIds": [
          "rk-terrible-triad-1-de",
          "rk-essex-1-de"
        ],
        "cardIds": [
          "rk-fc-5",
          "rk-fc-6"
        ]
      },
      {
        "id": "management-context",
        "text": {
          "de": "Frühe Bewegung und Nachbehandlung auf stabile einfache Verletzungen und den klinischen Verlauf beziehen.",
          "en": "Relate early movement and rehabilitation to simple stable injuries and clinical progress.",
          "fa": "حرکت زودهنگام و توان‌بخشی را با آسیب ساده و پایدار و سیر بالینی مرتبط کنید."
        },
        "questionIds": [
          "rk-komplikation-1-de",
          "rk-mason-therapie-2-de"
        ],
        "cardIds": [
          "rk-fc-7"
        ]
      }
    ],
    "status": "AUTHOR_PACKET_1_REVIEW_PENDING"
  },
  {
    "route": "/msk/schulter/rotatorenmanschette",
    "topicId": "rotatorenmanschette",
    "learningGoals": [
      {
        "id": "protocol",
        "text": {
          "de": "Sehnenanatomie und geeignete MRT-Sequenzen einschließlich Magic-Angle-Falle zuordnen.",
          "en": "Identify tendon anatomy and suitable MRI sequences including the magic-angle pitfall.",
          "fa": "آناتومی تاندون و سکانس‌های مناسب MRI را با دام زاویهٔ جادویی تطبیق دهید."
        },
        "questionIds": [
          "rotatorenmanschette-de-01",
          "rotatorenmanschette-de-04",
          "rotatorenmanschette-de-05"
        ],
        "cardIds": [
          "rotatorenmanschette-01",
          "rotatorenmanschette-04",
          "rotatorenmanschette-05"
        ]
      },
      {
        "id": "tear-pattern",
        "text": {
          "de": "Partialrupturen nach Oberfläche und Faserdefekt von Komplettruptur unterscheiden.",
          "en": "Distinguish partial tears by surface and fibre defect from full-thickness tears.",
          "fa": "پارگی‌های نسبی را بر اساس سطح و نقص فیبر از پارگی تمام‌ضخامت جدا کنید."
        },
        "questionIds": [
          "rotatorenmanschette-de-06",
          "rotatorenmanschette-de-07",
          "rotatorenmanschette-de-08",
          "rotatorenmanschette-de-10"
        ],
        "cardIds": [
          "rotatorenmanschette-06",
          "rotatorenmanschette-07",
          "rotatorenmanschette-08",
          "rotatorenmanschette-10"
        ]
      },
      {
        "id": "prognostic-description",
        "text": {
          "de": "Retraktion, Muskelatrophie und Fettinfiltration für die Planung beschreiben.",
          "en": "Describe retraction, muscle atrophy and fatty infiltration for planning.",
          "fa": "رتراکشن، آتروفی عضله و نفوذ چربی را برای برنامه‌ریزی توصیف کنید."
        },
        "questionIds": [
          "rotatorenmanschette-de-11",
          "rotatorenmanschette-de-12",
          "rotatorenmanschette-de-13"
        ],
        "cardIds": [
          "rotatorenmanschette-11",
          "rotatorenmanschette-12"
        ]
      },
      {
        "id": "partial-depth",
        "text": {
          "de": "PASTA-Defekttiefe als Anteil der Sehnendicke messen und im klinischen Kontext einordnen.",
          "en": "Assess PASTA tear depth as a proportion of tendon thickness in clinical context.",
          "fa": "عمق نقص PASTA را به‌صورت سهمی از ضخامت تاندون و در زمینهٔ بالینی ارزیابی کنید."
        },
        "questionIds": [
          "rotatorenmanschette-de-09"
        ],
        "cardIds": [
          "rotatorenmanschette-09"
        ]
      }
    ],
    "status": "AUTHOR_PACKET_1_REVIEW_PENDING"
  },
  {
    "route": "/msk/trauma/ak-luxation",
    "topicId": "ak-luxation",
    "learningGoals": [
      {
        "id": "direction-grade",
        "text": {
          "de": "Rockwood-Typen nach Bandverletzung und Verlagerungsrichtung unterscheiden.",
          "en": "Distinguish Rockwood types by ligament injury and displacement direction.",
          "fa": "انواع راک‌وود را بر اساس آسیب رباط و جهت جابه‌جایی متمایز کنید."
        },
        "questionIds": [
          "ak-lux-band-1-de",
          "ak-lux-rock-1-de",
          "ak-lux-rock-2-de",
          "ak-lux-rock-3-de",
          "ak-lux-rock-vi-1-de"
        ],
        "cardIds": [
          "ak-lux-fc-1",
          "ak-lux-fc-4",
          "ak-lux-fc-5"
        ]
      },
      {
        "id": "measurement-technique",
        "text": {
          "de": "CCD im Seitenvergleich beurteilen und posteriore Verlagerung mit geeigneter Projektion prüfen.",
          "en": "Assess CCD side to side and evaluate posterior displacement with an appropriate projection.",
          "fa": "CCD را با سمت مقابل مقایسه و جابه‌جایی خلفی را با نمای مناسب بررسی کنید."
        },
        "questionIds": [
          "ak-lux-ccd-1-de",
          "ak-lux-belastung-1-de",
          "ak-lux-norm-1-de"
        ],
        "cardIds": [
          "ak-lux-fc-2",
          "ak-lux-fc-6"
        ]
      },
      {
        "id": "management",
        "text": {
          "de": "Morphologie von individueller Therapieentscheidung insbesondere bei Typ III trennen.",
          "en": "Separate morphology from individual management decisions, especially in type III.",
          "fa": "مورفولوژی را به‌ویژه در نوع III از تصمیم درمانی فردی جدا کنید."
        },
        "questionIds": [
          "ak-lux-therapie-1-de",
          "ak-lux-tossy-1-de"
        ],
        "cardIds": [
          "ak-lux-fc-3",
          "ak-lux-fc-7"
        ]
      }
    ],
    "status": "AUTHOR_PACKET_1_REVIEW_PENDING"
  },
  {
    "route": "/msk/trauma/frakturen-kindesalter",
    "topicId": "frakturen-kindesalter",
    "learningGoals": [
      {
        "id": "physis",
        "text": {
          "de": "Physeale Frakturverläufe Salter-Harris I–V anatomisch zuordnen.",
          "en": "Assign Salter–Harris I–V from the anatomical fracture course.",
          "fa": "انواع سالتر–هریس I تا V را از روی مسیر آناتومیک شکستگی تعیین کنید."
        },
        "questionIds": [
          "fk-sh-1-de",
          "fk-sh-2-de",
          "fk-sh-3-de",
          "fk-sh-4-de",
          "fk-sh-5-de"
        ],
        "cardIds": [
          "fk-fc-sh1",
          "fk-fc-sh2",
          "fk-fc-sh3",
          "fk-fc-sh5"
        ]
      },
      {
        "id": "patterns",
        "text": {
          "de": "Wulst, Grünholz und plastische Deformierung von Gelenkluxation unterscheiden.",
          "en": "Distinguish buckle, greenstick and plastic deformation from joint dislocation.",
          "fa": "شکستگی توروس، گرین‌استیک و تغییر شکل پلاستیک را از دررفتگی مفصل جدا کنید."
        },
        "questionIds": [
          "fk-wulst-1-de",
          "fk-gruenholz-1-de",
          "fk-remodel-1-de"
        ],
        "cardIds": [
          "fk-fc-wulst",
          "fk-fc-gruenholz",
          "fk-fc-periost",
          "fk-fc-remodel"
        ]
      },
      {
        "id": "occult",
        "text": {
          "de": "Bei möglicher Toddler-Fraktur die Grenzen eines negativen Erstbildes erklären.",
          "en": "Explain the limits of negative initial radiographs in suspected toddler fracture.",
          "fa": "در شک به شکستگی توددلر، محدودیت رادیوگرافی اولیهٔ منفی را توضیح دهید."
        },
        "questionIds": [
          "fk-toddler-1-de"
        ],
        "cardIds": [
          "fk-fc-toddler"
        ]
      },
      {
        "id": "transition",
        "text": {
          "de": "Tillaux- und Triplane-Muster erkennen und den Zusatznutzen gezielter CT einordnen.",
          "en": "Recognise Tillaux and triplane patterns and the added value of targeted CT.",
          "fa": "الگوهای تیلو و تری‌پلین و ارزش افزودهٔ CT هدفمند را تشخیص دهید."
        },
        "questionIds": [
          "fk-tillaux-1-de",
          "fk-triplane-1-de",
          "fk-two-plane-1-de"
        ],
        "cardIds": [
          "fk-fc-tillaux",
          "fk-fc-triplane",
          "fk-fc-two-plane",
          "fk-fc-uebergang-ct"
        ]
      },
      {
        "id": "context",
        "text": {
          "de": "Auffällige Frakturmuster im Kinderschutz als kontextabhängige Warnzeichen einordnen.",
          "en": "Interpret concerning fracture patterns as context-dependent safeguarding warning signs.",
          "fa": "الگوهای نگران‌کنندهٔ شکستگی را در حفاظت از کودک به‌عنوان علائم هشدار وابسته به زمینه تفسیر کنید."
        },
        "questionIds": [
          "fk-misshandlung-1-de"
        ],
        "cardIds": [
          "fk-fc-nai"
        ]
      }
    ],
    "status": "AUTHOR_PACKET_1_REVIEW_PENDING"
  },
  {
    "route": "/msk/trauma/frakturbeschreibung",
    "topicId": "frakturbeschreibung",
    "learningGoals": [
      {
        "id": "report",
        "text": {
          "de": "Seite, Segment und Dislokation mit distalem Referenzfragment präzise berichten.",
          "en": "Report side, segment and displacement using the distal reference fragment.",
          "fa": "سمت، سگمان و جابه‌جایی را با مرجع قطعهٔ دیستال دقیق گزارش کنید."
        },
        "questionIds": [
          "frakturbeschreibung-de-01",
          "frakturbeschreibung-de-02",
          "frakturbeschreibung-de-09",
          "aq-msk-frakturbeschreibung-de-report-distal-reference"
        ],
        "cardIds": [
          "frakturbeschreibung-01-system",
          "frakturbeschreibung-03-distal",
          "frakturbeschreibung-15-report"
        ]
      },
      {
        "id": "morphology",
        "text": {
          "de": "Morphologie und Knochenqualität mit Mechanismus und pathologischer Fraktur verknüpfen.",
          "en": "Relate morphology and bone quality to mechanism and pathological fracture.",
          "fa": "مورفولوژی و کیفیت استخوان را با مکانیسم و شکستگی پاتولوژیک مرتبط کنید."
        },
        "questionIds": [
          "frakturbeschreibung-de-03",
          "frakturbeschreibung-de-04",
          "frakturbeschreibung-de-05",
          "frakturbeschreibung-de-06",
          "frakturbeschreibung-de-12"
        ],
        "cardIds": [
          "frakturbeschreibung-06-stress",
          "frakturbeschreibung-07-pathologic",
          "frakturbeschreibung-08-spiral",
          "frakturbeschreibung-09-segmental"
        ]
      },
      {
        "id": "safety-imaging",
        "text": {
          "de": "Gelenkbeteiligung und offene Verletzung adressieren und Zusatzbildgebung begründen.",
          "en": "Address joint involvement and open injury and justify additional imaging.",
          "fa": "درگیری مفصل و آسیب باز را ارزیابی و تصویربرداری تکمیلی را توجیه کنید."
        },
        "questionIds": [
          "frakturbeschreibung-de-07",
          "frakturbeschreibung-de-08",
          "frakturbeschreibung-de-10",
          "frakturbeschreibung-de-11"
        ],
        "cardIds": [
          "frakturbeschreibung-11-joint",
          "frakturbeschreibung-12-open",
          "frakturbeschreibung-13-ct",
          "frakturbeschreibung-14-mri"
        ]
      }
    ],
    "status": "AUTHOR_PACKET_1_REVIEW_PENDING"
  },
  {
    "route": "/msk/trauma/unterarmschaftfrakturen",
    "topicId": "unterarmschaftfrakturen",
    "learningGoals": [
      {
        "id": "linked-joints",
        "text": {
          "de": "Monteggia und Galeazzi über Fraktur und zugehörige Gelenkfehlstellung zuordnen.",
          "en": "Identify Monteggia and Galeazzi from the fracture and associated joint malalignment.",
          "fa": "مونتگیا و گالئاتزی را از شکستگی و بدراستایی مفصل همراه تعیین کنید."
        },
        "questionIds": [
          "unterarm-de-monteggia-definition",
          "unterarm-de-bado-one",
          "unterarm-de-galeazzi-definition",
          "unterarm-de-child-bowing"
        ],
        "cardIds": [
          "unterarm-fc-03",
          "unterarm-fc-04",
          "unterarm-fc-06",
          "unterarm-fc-10"
        ]
      },
      {
        "id": "technique",
        "text": {
          "de": "Ellenbogen und DRUJ vollständig abbilden und Projektionsfallen erkennen.",
          "en": "Image the elbow and DRUJ completely and recognise projection pitfalls.",
          "fa": "آرنج و DRUJ را کامل تصویربرداری و دام‌های نما را شناسایی کنید."
        },
        "questionIds": [
          "unterarm-de-imaging-extent",
          "unterarm-de-rcl",
          "unterarm-de-druj-pitfall"
        ],
        "cardIds": [
          "unterarm-fc-02",
          "unterarm-fc-05",
          "unterarm-fc-08"
        ]
      },
      {
        "id": "restore-report",
        "text": {
          "de": "Länge, Achse, Rotation und radialen Bogen für Befund und Rekonstruktion benennen.",
          "en": "Specify length, alignment, rotation and radial bow for reporting and reconstruction.",
          "fa": "طول، محور، چرخش و قوس رادیوس را برای گزارش و بازسازی نام ببرید."
        },
        "questionIds": [
          "unterarm-de-adult-treatment"
        ],
        "cardIds": [
          "unterarm-fc-11",
          "unterarm-fc-12"
        ]
      },
      {
        "id": "followup",
        "text": {
          "de": "Kompartmentsyndrom-Warnzeichen und persistierende DRUJ-Instabilität nach Rekonstruktion erkennen.",
          "en": "Recognise compartment-syndrome warning signs and persistent DRUJ instability after reconstruction.",
          "fa": "علائم هشدار سندرم کمپارتمان و ناپایداری باقی‌ماندهٔ DRUJ پس از بازسازی را تشخیص دهید."
        },
        "questionIds": [
          "unterarm-de-compartment",
          "unterarm-de-post-reduction"
        ],
        "cardIds": [
          "unterarm-fc-13",
          "unterarm-fc-14"
        ]
      }
    ],
    "status": "AUTHOR_PACKET_1_REVIEW_PENDING"
  },
  {
    "route": "/msk/trauma/distale-radiusfraktur",
    "topicId": "distale-radiusfraktur",
    "learningGoals": [
      {
        "id": "morphology",
        "text": {
          "de": "Benannte Frakturformen anhand von Richtung, Gelenkrand und Karpusbeziehung unterscheiden.",
          "en": "Distinguish named fracture patterns by direction, articular rim and carpal relationship.",
          "fa": "الگوهای نام‌گذاری‌شدهٔ شکستگی را بر اساس جهت، لبهٔ مفصل و رابطهٔ کارپ تفکیک کنید."
        },
        "questionIds": [
          "distaleradius-de-colles",
          "distaleradius-de-smith",
          "distaleradius-de-barton",
          "distaleradius-de-fernandez-ii",
          "distaleradius-de-fernandez-iii",
          "distaleradius-de-chauffeur"
        ],
        "cardIds": [
          "drf-fc-01",
          "drf-fc-02",
          "drf-fc-03",
          "drf-fc-04",
          "drf-fc-05",
          "drf-fc-06"
        ]
      },
      {
        "id": "measure",
        "text": {
          "de": "Tilt und Gelenkinkongruenz beschreiben, ohne einen Einzelwert als automatische Therapieanordnung zu verwenden.",
          "en": "Describe tilt and articular incongruity without turning a single measurement into an automatic treatment instruction.",
          "fa": "تیلت و ناهم‌خوانی مفصل را بدون تبدیل یک اندازه به دستور خودکار درمان توصیف کنید."
        },
        "questionIds": [
          "distaleradius-de-step",
          "distaleradius-de-tilt"
        ],
        "cardIds": [
          "drf-fc-07",
          "drf-fc-08",
          "drf-fc-09"
        ]
      },
      {
        "id": "carpus",
        "text": {
          "de": "Skapholunäre Verletzung, Lunatumluxation und perilunäre Luxation unterscheiden.",
          "en": "Distinguish scapholunate injury, lunate dislocation and perilunate dislocation.",
          "fa": "آسیب اسکافولونات، دررفتگی لونیت و دررفتگی پری‌لونیت را متمایز کنید."
        },
        "questionIds": [
          "distaleradius-de-sl",
          "distaleradius-de-lunate"
        ],
        "cardIds": [
          "drf-fc-10",
          "drf-fc-11"
        ]
      },
      {
        "id": "report-escalate",
        "text": {
          "de": "DRUJ und Karpus mitberichten und komplexe oder dringliche Begleitverletzungen eskalieren.",
          "en": "Include DRUJ and carpus in the report and escalate complex or urgent associated injuries.",
          "fa": "DRUJ و کارپ را در گزارش بگنجانید و آسیب‌های همراه پیچیده یا فوری را ارجاع دهید."
        },
        "questionIds": [
          "distaleradius-de-ct",
          "distaleradius-de-urgent"
        ],
        "cardIds": [
          "drf-fc-13",
          "drf-fc-14",
          "drf-fc-15"
        ]
      }
    ],
    "status": "AUTHOR_PACKET_1_REVIEW_PENDING"
  },
  {
    "route": "/msk/osteochondrosen/morbus-perthes",
    "topicId": "morbus-perthes",
    "learningGoals": [
      {
        "id": "early-imaging",
        "text": {
          "de": "Den Zusatznutzen der MRT bei fortbestehendem frühem Verdacht erklären.",
          "en": "Explain MRI added value when early suspicion persists.",
          "fa": "ارزش افزودهٔ MRI را در تداوم شک زودرس توضیح دهید."
        },
        "questionIds": [
          "aq-msk-morbus-perthes-de-early-mri"
        ],
        "cardIds": [
          "aq-msk-perthes-early-mri"
        ]
      },
      {
        "id": "image-report",
        "text": {
          "de": "Epiphysäre Formänderung in der tatsächlichen Verlaufsaufnahme beschreiben.",
          "en": "Describe epiphyseal shape change on the actual follow-up image.",
          "fa": "تغییر شکل اپی‌فیز را در تصویر واقعی پیگیری توصیف کنید."
        },
        "questionIds": [
          "aq-msk-morbus-perthes-de-source-image-morphology"
        ],
        "cardIds": [
          "aq-msk-perthes-image-report"
        ]
      },
      {
        "id": "differential-context",
        "text": {
          "de": "Synchrone symmetrische Beidseitigkeit als Anlass zur breiteren Differenzialdiagnose einordnen.",
          "en": "Use synchronous symmetric bilateral involvement to broaden the differential.",
          "fa": "درگیری هم‌زمان، متقارن و دوطرفه را دلیلی برای گسترش افتراق بدانید."
        },
        "questionIds": [],
        "cardIds": [
          "aq-msk-perthes-bilateral-context"
        ],
        "assessmentRationale": "Applied free-recall card; no redundant MCQ variant authored."
      }
    ],
    "status": "AUTHOR_PACKET_2_IN_PROGRESS"
  },
  {
    "route": "/msk/knie/chondrokalzinose",
    "topicId": "chondrokalzinose",
    "learningGoals": [
      {
        "id": "radiograph",
        "text": {
          "de": "Meniskale Verkalkungen von subchondralen und randständigen Knochenbefunden unterscheiden.",
          "en": "Distinguish meniscal calcification from subchondral and marginal bony findings.",
          "fa": "کلسیفیکاسیون منیسک را از یافته‌های استخوانی زیرغضروفی و حاشیه‌ای جدا کنید."
        },
        "questionIds": [
          "aq-msk-chondrokalzinose-de-radiograph-pattern"
        ],
        "cardIds": [
          "aq-msk-chondro-pattern"
        ]
      },
      {
        "id": "signal",
        "text": {
          "de": "Hohes Meniskussignal bei Chondrokalzinose ohne vorschnellen Rissnachweis einordnen.",
          "en": "Interpret high meniscal signal with chondrocalcinosis without prematurely diagnosing a tear.",
          "fa": "سیگنال بالای منیسک در کندروکلسی‌نوز را بدون تشخیص عجولانهٔ پارگی تفسیر کنید."
        },
        "questionIds": [
          "aq-msk-chondrokalzinose-de-mri-correlation"
        ],
        "cardIds": [
          "aq-msk-chondro-mri-pitfall"
        ]
      },
      {
        "id": "clinical-limit",
        "text": {
          "de": "Bildbefund und klinische CPPD-Attacke im Bericht auseinanderhalten.",
          "en": "Separate imaging findings from a clinical CPPD attack in reporting.",
          "fa": "یافتهٔ تصویری را در گزارش از حملهٔ بالینی CPPD جدا کنید."
        },
        "questionIds": [
          "aq-msk-chondrokalzinose-de-mri-correlation"
        ],
        "cardIds": [
          "aq-msk-chondro-clinical-report"
        ]
      }
    ],
    "status": "AUTHOR_PACKET_2_IN_PROGRESS"
  },
  {
    "route": "/msk/osteochondrosen/osgood-schlatter",
    "topicId": "osgood-schlatter",
    "learningGoals": [
      {
        "id": "localisation",
        "text": {
          "de": "Den tibialen Ansatz von patellaren Ursachen vorderen Knieschmerzes abgrenzen.",
          "en": "Distinguish the tibial attachment from patellar causes of anterior knee pain.",
          "fa": "اتصال تیبیال را از علل کشککی درد قدامی زانو جدا کنید."
        },
        "questionIds": [
          "aq-msk-osgood-schlatter-de-pain-localisation"
        ],
        "cardIds": [
          "aq-msk-osgood-localise"
        ]
      },
      {
        "id": "ossicle-limit",
        "text": {
          "de": "Ein Ossikel nicht allein als Nachweis aktiver Beschwerden interpretieren.",
          "en": "Avoid interpreting an ossicle alone as proof of active symptoms.",
          "fa": "استخوانچه را به‌تنهایی شاهد علائم فعال تلقی نکنید."
        },
        "questionIds": [],
        "cardIds": [
          "aq-msk-osgood-ossicle-limit"
        ]
      },
      {
        "id": "report",
        "text": {
          "de": "Sehnen- und Weichteilreaktion zusammen mit der Schmerzlokalisation berichten.",
          "en": "Report tendon and soft-tissue reaction with pain localisation.",
          "fa": "واکنش تاندون و بافت نرم را همراه محل درد گزارش کنید."
        },
        "questionIds": [
          "aq-msk-osgood-schlatter-de-pain-localisation"
        ],
        "cardIds": [
          "aq-msk-osgood-report"
        ]
      }
    ],
    "status": "AUTHOR_PACKET_2_IN_PROGRESS",
    "assessmentRationale": "One anatomical interpretation MCQ; ossicle symptom-correlation and report synthesis remain distinct applied free-recall cards. Removed unpublished redundant MCQ whose stem already disclosed the clinical outcome; no quantity quota."
  },
  {
    "route": "/msk/osteochondrosen/weitere-osteochondrosen",
    "topicId": "weitere-osteochondrosen",
    "learningGoals": [
      {
        "id": "umbrella",
        "text": {
          "de": "Den Sammelbegriff erklären, ohne daraus eine Einzeldiagnose abzuleiten.",
          "en": "Explain the umbrella term without deriving a specific diagnosis.",
          "fa": "اصطلاح کلی را بدون نتیجه‌گیری یک تشخیص مشخص توضیح دهید."
        },
        "questionIds": [],
        "cardIds": [
          "aq-msk-osteochondrosis-umbrella"
        ],
        "assessmentRationale": "Definition assessed by free retrieval; no redundant recognition variant added."
      },
      {
        "id": "acute-physis",
        "text": {
          "de": "Akute traumatische Physisverletzung begrifflich abgrenzen.",
          "en": "Distinguish acute traumatic physeal injury.",
          "fa": "آسیب تروماتیک حاد صفحهٔ رشد را از نظر مفهومی جدا کنید."
        },
        "questionIds": [
          "aq-msk-weitere-osteochondrosen-de-acute-physis-distinction"
        ],
        "cardIds": [
          "aq-msk-osteochondrosis-acute-physis"
        ]
      },
      {
        "id": "adult-context",
        "text": {
          "de": "Den deutschsprachigen adulten Bandscheibenbegriff im Befundkontext zuordnen.",
          "en": "Interpret the German adult disc term in reporting context.",
          "fa": "اصطلاح آلمانی دیسک بزرگسالان را در زمینهٔ گزارش تفسیر کنید."
        },
        "questionIds": [
          "aq-msk-weitere-osteochondrosen-de-adult-disc-term"
        ],
        "cardIds": [
          "aq-msk-osteochondrosis-adult-term"
        ]
      }
    ],
    "status": "AUTHOR_PACKET_2_IN_PROGRESS"
  },
  {
    "route": "/msk/knie/patella-streckapparat",
    "topicId": "patella-streckapparat",
    "learningGoals": [
      {
        "id": "variant-fracture",
        "text": {
          "de": "Kortizierte bipartite Patella von akutem Frakturmuster abgrenzen.",
          "en": "Distinguish a corticated bipartite patella from an acute fracture pattern.",
          "fa": "کشکک دوقسمتی کورتیکه‌شده را از الگوی شکستگی حاد جدا کنید."
        },
        "questionIds": [
          "patella-extensor-bipartite-vs-fracture-de"
        ],
        "cardIds": [
          "patella-extensor-bipartite"
        ]
      },
      {
        "id": "fracture-pattern",
        "text": {
          "de": "Frakturrichtung beschreiben, ohne aus dem Mechanismus allein Stabilität abzuleiten.",
          "en": "Describe fracture orientation without deriving stability from mechanism alone.",
          "fa": "جهت شکستگی را توصیف کنید، بدون آنکه پایداری را فقط از مکانیسم نتیجه بگیرید."
        },
        "questionIds": [
          "patella-extensor-transverse-fracture-mechanism-de"
        ],
        "cardIds": [
          "patella-fracture-pattern"
        ]
      },
      {
        "id": "transient-dislocation",
        "text": {
          "de": "Kontusionen medial an der Patella und lateral am Femurkondylus als Luxationsspur erkennen.",
          "en": "Recognize medial patellar and lateral femoral condylar contusions as a dislocation footprint.",
          "fa": "کوفتگی کشکک در سمت داخلی و کندیل فمور در سمت خارجی را به‌عنوان ردپای دررفتگی بشناسید."
        },
        "questionIds": [
          "patella-extensor-transient-dislocation-de"
        ],
        "cardIds": [
          "patella-extensor-dislocation"
        ]
      },
      {
        "id": "tendon-clinical-correlation",
        "text": {
          "de": "Proximales Patellarsehnensignal mit Morphologie und klinischer Schmerzlokalisation abgleichen.",
          "en": "Correlate proximal patellar tendon signal with morphology and clinical pain localisation.",
          "fa": "سیگنال تاندون پروگزیمال کشککی را با مورفولوژی و محل بالینی درد تطبیق دهید."
        },
        "questionIds": [],
        "cardIds": [
          "aq-msk-patella-signal-clinical"
        ]
      }
    ],
    "assessmentRationale": "Preserve three useful existing recognition questions/cards; add one applied clinical-correlation recall card for an uncovered caution, rather than repeating the same tendon fact in another MCQ.",
    "status": "AUTHOR_PACKET_2_IN_PROGRESS"
  },
  {
    "route": "/msk/osteochondrosen/osteochondrosis-dissecans",
    "topicId": "osteochondrosis-dissecans",
    "learningGoals": [
      {
        "id": "normal-variant",
        "text": {
          "de": "Posteriores symmetrisches Ossifikationsmuster ohne Ödem als mögliche normale Variante einordnen.",
          "en": "Interpret posterior symmetric ossification without oedema as a possible normal variant.",
          "fa": "الگوی استخوان‌سازی قرینهٔ خلفی بدون ادم را به‌عنوان واریانت طبیعی احتمالی ارزیابی کنید."
        },
        "questionIds": [
          "osteochondrosis-dissecans-de-ossification-variant"
        ],
        "cardIds": []
      },
      {
        "id": "juvenile-stability",
        "text": {
          "de": "Die begrenzte Spezifität eines isolierten Grenzsaums bei juveniler OCD erklären.",
          "en": "Explain limited specificity of an isolated interface rim in juvenile OCD.",
          "fa": "اختصاصیت محدود حاشیهٔ منفرد محل تماس را در OCD نوجوانان توضیح دهید."
        },
        "questionIds": [
          "aq-msk-osteochondrosis-dissecans-de-juvenile-rim-interpretation"
        ],
        "cardIds": [
          "aq-msk-ocd-juvenile-rim"
        ]
      },
      {
        "id": "displaced-report",
        "text": {
          "de": "Leeres Defektbett und Lage eines dislozierten Gelenkkörpers berichten.",
          "en": "Report an empty defect bed and the location of a displaced loose body.",
          "fa": "بستر خالی نقص و محل جسم آزاد جابه‌جا‌شده را گزارش کنید."
        },
        "questionIds": [],
        "cardIds": [
          "aq-msk-ocd-displaced-report"
        ]
      },
      {
        "id": "sites",
        "text": {
          "de": "Die Prädilektionsorte an Knie, Talus und Ellenbogen nennen.",
          "en": "Recall predilection sites at the knee, talus and elbow.",
          "fa": "محل‌های مستعد در زانو، تالوس و آرنج را بیان کنید."
        },
        "questionIds": [],
        "cardIds": [
          "osteochondrosis-dissecans-predilection-sites"
        ]
      }
    ],
    "status": "AUTHOR_PACKET_2_IN_PROGRESS"
  },
  {
    "route": "/msk/knie/kreuzbaender",
    "topicId": "kreuzbaender",
    "learningGoals": [
      {
        "id": "mri-continuity",
        "text": {
          "de": "Periligamentäres Ödem und sichtbare Bandkontinuität in einem Quellbildpaar beschreiben.",
          "en": "Describe periligamentous oedema and visible ligament continuity in a source image pair.",
          "fa": "ادم پیرارباطی و پیوستگی قابل مشاهدهٔ رباط را در جفت تصاویر منبع توصیف کنید."
        },
        "questionIds": [
          "kreuzbaender-de-01"
        ],
        "cardIds": [
          "kreuzbaender-01"
        ]
      },
      {
        "id": "acl-pattern",
        "text": {
          "de": "Direkte und indirekte VKB-Zeichen mit Degenerationsmimik abgleichen.",
          "en": "Integrate direct and indirect ACL signs with degenerative mimics.",
          "fa": "علائم مستقیم و غیرمستقیم ACL را با مقلدهای دژنراتیو تطبیق دهید."
        },
        "questionIds": [
          "kreuzbaender-de-05",
          "kreuzbaender-de-06"
        ],
        "cardIds": [
          "kreuzbaender-04",
          "kreuzbaender-05"
        ]
      },
      {
        "id": "pcl-mechanism",
        "text": {
          "de": "Den anterioren Tibiaprall am gebeugten Knie der HKB-Verletzung zuordnen.",
          "en": "Associate anterior tibial impact at a flexed knee with PCL injury.",
          "fa": "ضربهٔ قدامی به تیبیا در زانوی خم را به آسیب PCL مرتبط کنید."
        },
        "questionIds": [
          "kreuzbaender-de-07"
        ],
        "cardIds": [
          "kreuzbaender-06"
        ]
      },
      {
        "id": "associated-complexes",
        "text": {
          "de": "Fibuläre und mediale Verletzungshinweise für eine gezielte PLC-/POL-Beurteilung und Befundbeschreibung nutzen.",
          "en": "Use fibular and medial injury clues for targeted PLC/POL assessment and reporting.",
          "fa": "از سرنخ‌های آسیب فیبولا و سمت داخلی برای ارزیابی هدفمند PLC/POL و گزارش استفاده کنید."
        },
        "questionIds": [
          "kreuzbaender-de-02",
          "kreuzbaender-de-03",
          "kreuzbaender-de-04",
          "kreuzbaender-de-08"
        ],
        "cardIds": [
          "kreuzbaender-02",
          "kreuzbaender-03",
          "kreuzbaender-07",
          "aq-msk-knee-medial-report"
        ]
      }
    ],
    "status": "AUTHOR_PACKET_3_BOUNDED_DELTA_READY_FULL_EXISTING_POOL_REVIEW_PENDING",
    "existingPoolReview": "Not fully reread or independently accepted; mapped unchanged IDs do not imply their pedagogic acceptance."
  },
  {
    "route": "/msk/knie/meniskus",
    "topicId": "meniskus",
    "learningGoals": [
      {
        "id": "normal-tear",
        "text": {
          "de": "Normale Anatomie und intrameniskales Signal von einem morphologisch gestützten Riss abgrenzen.",
          "en": "Distinguish normal anatomy and intrameniscal signal from a morphologically supported tear.",
          "fa": "آناتومی طبیعی و سیگنال داخل منیسک را از پارگی دارای شواهد مورفولوژیک جدا کنید."
        },
        "questionIds": [
          "meniskus-de-01",
          "meniskus-de-02",
          "meniskus-de-04",
          "meniskus-de-07",
          "meniskus-de-08",
          "meniskus-de-11",
          "meniskus-de-22"
        ],
        "cardIds": [
          "meniskus-01",
          "meniskus-02",
          "meniskus-03",
          "meniskus-04",
          "meniskus-05",
          "meniskus-06",
          "meniskus-07",
          "meniskus-09",
          "meniskus-10",
          "meniskus-27",
          "meniskus-28",
          "meniskus-35"
        ]
      },
      {
        "id": "tear-patterns",
        "text": {
          "de": "Rissverlauf und Fragmentverlagerung anatomisch beschreiben.",
          "en": "Describe tear orientation and fragment displacement anatomically.",
          "fa": "جهت پارگی و جابه‌جایی قطعه را به‌صورت آناتومیک توصیف کنید."
        },
        "questionIds": [
          "meniskus-de-12",
          "meniskus-de-13",
          "meniskus-de-14",
          "meniskus-de-15",
          "meniskus-de-16",
          "meniskus-de-36",
          "meniskus-de-37"
        ],
        "cardIds": [
          "meniskus-15",
          "meniskus-16",
          "meniskus-22",
          "meniskus-23",
          "meniskus-24",
          "meniskus-29",
          "meniskus-30",
          "meniskus-31",
          "meniskus-33",
          "meniskus-36",
          "meniskus-37"
        ]
      },
      {
        "id": "discoid",
        "text": {
          "de": "Die Discoidform mit koronaler Breite und protokollabhängiger sagittaler Ausdehnung beurteilen.",
          "en": "Assess discoid shape using coronal width and protocol-dependent sagittal extent.",
          "fa": "شکل دیسکویید را با پهنای کرونال و امتداد ساژیتال وابسته به پروتکل ارزیابی کنید."
        },
        "questionIds": [
          "meniskus-de-17",
          "meniskus-de-18"
        ],
        "cardIds": [
          "meniskus-18",
          "meniskus-19",
          "meniskus-20",
          "meniskus-21"
        ]
      },
      {
        "id": "clinical-management",
        "text": {
          "de": "Biologische Reparabilität und klinischen Kontext von einem automatischen Operationsschluss trennen.",
          "en": "Distinguish biologic repair potential and clinical context from an automatic surgery conclusion.",
          "fa": "ظرفیت زیستی ترمیم و زمینهٔ بالینی را از نتیجه‌گیری خودکار جراحی جدا کنید."
        },
        "questionIds": [
          "meniskus-de-03",
          "meniskus-de-10",
          "meniskus-de-23"
        ],
        "cardIds": [
          "meniskus-11",
          "meniskus-12",
          "meniskus-13",
          "meniskus-14"
        ]
      },
      {
        "id": "useful-report",
        "text": {
          "de": "Wurzelbezug, Extrusion, Knorpel und normale Rissmimiken im Bericht berücksichtigen.",
          "en": "Include root relationship, extrusion, cartilage and normal tear mimics in reporting.",
          "fa": "رابطه با ریشه، اکستروژن، غضروف و مقلدهای طبیعی پارگی را در گزارش لحاظ کنید."
        },
        "questionIds": [
          "meniskus-de-19",
          "meniskus-de-20",
          "meniskus-de-21"
        ],
        "cardIds": [
          "meniskus-32",
          "meniskus-34"
        ]
      }
    ],
    "status": "AUTHOR_PACKET_3_BOUNDED_DELTA_READY_FULL_EXISTING_POOL_REVIEW_PENDING",
    "existingPoolReview": "Not fully reread or independently accepted; mapped unchanged IDs do not imply their pedagogic acceptance."
  },
  {
    "route": "/msk/knochennekrosen/avn-huefte",
    "topicId": "avn-huefte",
    "learningGoals": [
      {
        "id": "diagnostic-specificity",
        "text": {
          "de": "Unspezifisches Ödem von einem osteonekrosetypischen MRT-Befund unterscheiden.",
          "en": "Distinguish nonspecific oedema from an MRI pattern of osteonecrosis.",
          "fa": "ادم غیراختصاصی را از الگوی MRI استئونکروز جدا کنید."
        },
        "questionIds": [],
        "cardIds": [
          "aq-msk-avn-imaging-specificity"
        ]
      },
      {
        "id": "arco-version",
        "text": {
          "de": "Fraktur, Einsenkung und Arthrose der expliziten ARCO-Version2019 zuordnen.",
          "en": "Assign fracture, depression and osteoarthritis to the explicit ARCO2019 version.",
          "fa": "شکستگی، فرورفتگی و آرتروز را بر اساس نسخهٔ مشخص ARCO۲۰۱۹ مرحله‌بندی کنید."
        },
        "questionIds": [
          "aq-msk-avn-huefte-de-arco2019-depression"
        ],
        "cardIds": [
          "aq-msk-avn-structural-stage"
        ]
      },
      {
        "id": "structural-report",
        "text": {
          "de": "Die strukturellen Merkmale und Klassifikationsversion nachvollziehbar berichten.",
          "en": "Report structural findings and the classification version traceably.",
          "fa": "یافته‌های ساختاری و نسخهٔ طبقه‌بندی را به‌صورت قابل پیگیری گزارش کنید."
        },
        "questionIds": [],
        "cardIds": [
          "aq-msk-avn-report-fracture"
        ]
      }
    ],
    "status": "AUTHOR_PACKET_3_BOUNDED_DELTA_READY_FULL_EXISTING_POOL_REVIEW_PENDING",
    "existingPoolReview": "Not fully reread or independently accepted; mapped unchanged IDs do not imply their pedagogic acceptance."
  },
  {
    "route": "/msk/knochennekrosen/knocheninfarkt",
    "topicId": "knocheninfarkt",
    "learningGoals": [
      {
        "id": "location",
        "text": {
          "de": "Medullären Meta-/Diaphyseninfarkt topographisch einordnen.",
          "en": "Localize medullary metaphyseal/diaphyseal infarction.",
          "fa": "انفارکت مدولاری متافیز/دیافیز را از نظر محل ارزیابی کنید."
        },
        "questionIds": [
          "knocheninfarkt-de-location"
        ],
        "cardIds": [
          "knocheninfarkt-location"
        ]
      },
      {
        "id": "border-centre",
        "text": {
          "de": "Serpiginösen Rand und zentrales Fettmark gemeinsam interpretieren.",
          "en": "Interpret a serpiginous border and central fatty marrow together.",
          "fa": "حاشیهٔ مارپیچی و مغز استخوان چرب مرکزی را با هم تفسیر کنید."
        },
        "questionIds": [
          "knocheninfarkt-de-pattern"
        ],
        "cardIds": [
          "knocheninfarkt-border-centre"
        ]
      },
      {
        "id": "infection",
        "text": {
          "de": "Infarktmuster bei klinischen Warnzeichen nicht als Infektionsausschluss behandeln.",
          "en": "Avoid treating an infarct pattern as an infection exclusion when clinical warning signs exist.",
          "fa": "در حضور علائم هشدار بالینی، الگوی انفارکت را معادل رد عفونت تلقی نکنید."
        },
        "questionIds": [
          "knocheninfarkt-de-infection"
        ],
        "cardIds": [
          "knocheninfarkt-infection"
        ]
      },
      {
        "id": "report",
        "text": {
          "de": "Lage, Rand, Zentrum und Begleitreaktion getrennt im Befund dokumentieren.",
          "en": "Document location, border, centre and associated reaction separately.",
          "fa": "محل، حاشیه، مرکز و واکنش همراه را جداگانه گزارش کنید."
        },
        "questionIds": [],
        "cardIds": [
          "aq-msk-infarct-report"
        ]
      }
    ],
    "status": "AUTHOR_PACKET_3_BOUNDED_DELTA_READY_FULL_EXISTING_POOL_REVIEW_PENDING",
    "existingPoolReview": "Not fully reread or independently accepted; mapped unchanged IDs do not imply their pedagogic acceptance."
  },
  {
    "route": "/msk/knochenstoffwechsel/melorheostose",
    "topicId": "melorheostose",
    "learningGoals": [
      {
        "id": "source-pattern",
        "text": {
          "de": "Längsverlaufende kortikale Hyperostose im tatsächlichen Quellbild erkennen.",
          "en": "Recognize longitudinal cortical hyperostosis in the actual source image.",
          "fa": "هیپراستوز قشری با امتداد طولی را در تصویر واقعی منبع بشناسید."
        },
        "questionIds": [
          "aq-msk-melorheostose-de-source-cortical-pattern"
        ],
        "cardIds": [
          "aq-msk-melor-morphology"
        ]
      },
      {
        "id": "complementary-imaging",
        "text": {
          "de": "CT-Knochenbeurteilung und gezielte MRT-Ergänzung für Weichteile unterscheiden.",
          "en": "Distinguish CT bone assessment from targeted MRI soft-tissue evaluation.",
          "fa": "ارزیابی استخوان با CT را از بررسی تکمیلی هدفمند بافت نرم با MRI جدا کنید."
        },
        "questionIds": [],
        "cardIds": [
          "aq-msk-melor-mri-role"
        ]
      },
      {
        "id": "reactive-findings",
        "text": {
          "de": "Signalarmen sklerotischen Kern von möglichem begleitendem Ödem trennen.",
          "en": "Distinguish low-signal sclerotic core from possible associated oedema.",
          "fa": "هستهٔ اسکلروتیک کم‌سیگنال را از ادم همراهِ احتمالی جدا کنید."
        },
        "questionIds": [],
        "cardIds": [
          "aq-msk-melor-edema-limit"
        ]
      }
    ],
    "status": "AUTHOR_PACKET_3_BOUNDED_DELTA_READY_FULL_EXISTING_POOL_REVIEW_PENDING",
    "existingPoolReview": "Not fully reread or independently accepted; mapped unchanged IDs do not imply their pedagogic acceptance."
  },
  {
    "route": "/msk/hand/de-quervain",
    "topicId": "de-quervain",
    "status": "AUTHOR_FULL_ORIGINAL_POOL_PLUS_GAP_READY_REVIEW_PENDING",
    "learningGoals": [
      {
        "id": "localise",
        "text": {
          "de": "APL/EPB und das erste Strecksehnenfach am Radiusstyloid anatomisch zuordnen.",
          "en": "Localise APL/EPB and the first extensor compartment at the radial styloid.",
          "fa": "APL/EPB و کمپارتمان اول اکستانسور را در سطح استایلوئید رادیوس مکان‌یابی کنید."
        },
        "questionIds": [
          "de-quervain-de-01"
        ],
        "cardIds": [
          "de-quervain-anatomy"
        ]
      },
      {
        "id": "report-components",
        "text": {
          "de": "Sehne, Sehnenscheide und Umgebung getrennt beschreiben und Bildzeichen klinisch einordnen.",
          "en": "Describe tendon, sheath and surrounding tissue separately and interpret imaging signs clinically.",
          "fa": "تاندون، غلاف و بافت اطراف را جداگانه توصیف و نشانه‌های تصویر را با بالین تفسیر کنید."
        },
        "questionIds": [
          "de-quervain-de-01"
        ],
        "cardIds": [
          "de-quervain-mri"
        ]
      },
      {
        "id": "provocation-limit",
        "text": {
          "de": "Manöverausführung benennen und die Grenzen einer Untersuchung beschwerdefreier Handgelenke für die klinische Testaussage erklären.",
          "en": "Specify manoeuvre technique and explain limits of an asymptomatic-wrist study for clinical test interpretation.",
          "fa": "شیوهٔ اجرای مانور را بیان و محدودیت مطالعهٔ مچ‌های بدون علامت را برای تفسیر بالینی آزمون توضیح دهید."
        },
        "questionIds": [
          "aq-msk-de-quervain-de-provocation-study-limit"
        ],
        "cardIds": [
          "de-quervain-provocation"
        ]
      }
    ]
  },
  {
    "route": "/msk/hand/strecksehnenfaecher",
    "topicId": "sehnenpathologien-hand",
    "status": "AUTHOR_FULL_ORIGINAL_POOL_REVIEW_READY",
    "learningGoals": [
      {
        "id": "carpal-joints",
        "text": {
          "de": "Mediokarpal-, Radiokarpal- und distale Gelenklinien anatomisch zuordnen.",
          "en": "Localise midcarpal, radiocarpal and distal joint lines anatomically.",
          "fa": "خطوط مفصلی میدکارپی، رادیوکارپی و دیستال را از نظر آناتومیک مکان‌یابی کنید."
        },
        "questionIds": [
          "sehnenpathologien-hand-de-02"
        ],
        "cardIds": [
          "wrist-carpal-midcarpal"
        ]
      },
      {
        "id": "compartment-map",
        "text": {
          "de": "Die radialen und ulnaren Strecksehnenfächer anhand ihrer Sehnen und Knochenlandmarken identifizieren.",
          "en": "Identify radial and ulnar extensor compartments using their tendons and bony landmarks.",
          "fa": "کمپارتمان‌های اکستانسور رادیال و اولنار را با تاندون‌ها و لندمارک‌های استخوانی شناسایی کنید."
        },
        "questionIds": [
          "sehnenpathologien-hand-de-01"
        ],
        "cardIds": [
          "wrist-extensor-compartment-1",
          "wrist-extensor-compartment-6"
        ]
      },
      {
        "id": "lister",
        "text": {
          "de": "Am Lister-Tuberkulum das zweite Fach von der EPL-Umlenkung im dritten Fach unterscheiden.",
          "en": "At Lister tubercle distinguish the second compartment from EPL turning in the third.",
          "fa": "کنار تکمهٔ لیستر، کمپارتمان دوم را از تغییر جهت EPL در کمپارتمان سوم تفکیک کنید."
        },
        "questionIds": [
          "aq-msk-sehnenpathologien-hand-de-lister-course"
        ],
        "cardIds": [
          "aq-msk-wrist-lister-course"
        ]
      }
    ]
  },
  {
    "route": "/msk/infektionen/osteomyelitis",
    "topicId": "osteomyelitis",
    "status": "AUTHOR_READY_PENDING_INDEPENDENT_REVIEW",
    "learningGoals": [
      {
        "id": "periosteal-report",
        "text": {
          "de": "Eine lamelläre Periostreaktion als unspezifische Knochenantwort differenzialdiagnostisch berichten.",
          "en": "Report lamellated periosteal response as a nonspecific bone reaction in the differential.",
          "fa": "واکنش پریوست لایه‌لایه را به‌عنوان پاسخ غیراختصاصی استخوان در افتراق گزارش کنید."
        },
        "questionIds": [
          "aq-msk-osteomyelitis-de-periosteal-report"
        ],
        "cardIds": [
          "aq-msk-osteomyelitis-periosteal-limit"
        ]
      },
      {
        "id": "brodie-variability",
        "text": {
          "de": "Das Fehlen einer Periostreaktion ohne unbegründeten Ausschluss eines Brodie-Abszesses einordnen.",
          "en": "Interpret absent periosteal response without unjustifiably excluding Brodie abscess.",
          "fa": "نبود واکنش پریوست را بدون رد ناموجه آبسهٔ برودی تفسیر کنید."
        },
        "questionIds": [
          "aq-msk-osteomyelitis-de-brodie-variability"
        ],
        "cardIds": [
          "aq-msk-osteomyelitis-brodie-variability"
        ]
      },
      {
        "id": "paediatric-imaging",
        "text": {
          "de": "Bei weiterem Bildgebungsbedarf im pädiatrischen AHO-Kontext MRT auswählen und den Geltungsbereich der Empfehlung benennen.",
          "en": "Select MRI when further imaging is needed in paediatric AHO and state the scope of that recommendation.",
          "fa": "در AHO کودکان و در صورت نیاز به تصویربرداری بیشتر، MRI را انتخاب و دامنهٔ توصیه را مشخص کنید."
        },
        "questionIds": [
          "aq-msk-osteomyelitis-de-paediatric-next-imaging"
        ],
        "cardIds": [
          "aq-msk-osteomyelitis-paediatric-imaging"
        ]
      }
    ]
  }
]
