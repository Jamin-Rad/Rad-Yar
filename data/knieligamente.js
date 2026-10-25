import { KNEE_BICEPS_COMPLETION, KNEE_BICEPS_CORRECT_INDEX } from './kneeBicepsCompletion'

export const KNIE_LIGAMENTE_FLASHCARD_TOPIC = {
  id: 'kreuzbaender',
  area: 'MSK',
  chapter: 'Knie',
  icon: 'K',
  iconImage: '/fach/msk.png',
  color: '#0f766e',
  href: '/flashcards/kreuzbaender',
  title: {
    de: 'Knie-Ligamente',
    en: 'Knee ligaments',
    fa: 'رباط‌های زانو',
  },
  subtitle: {
    de: 'VKB · HKB · MCL · LCL/PLC · MRT-Grading · Begleitzeichen',
    en: 'ACL · PCL · MCL · LCL/PLC · MRI grading · associated signs',
    fa: 'ACL · PCL · MCL · LCL/PLC · درجه‌بندی MRI · علائم همراه',
  },
}

const q = (id, question, options, correct, explanation, metadata = {}) => ({ id, question, options, correct, explanation, ...metadata })

const CONTENT = [
  {
    "key": "grading",
    "question": {
      "de": "Welche Beobachtung am medialen Kollateralband beschreibt das gezeigte Bildpaar am treffendsten?",
      "en": "Which observation of the medial collateral ligament best describes the displayed image pair?",
      "fa": "کدام مشاهده دربارهٔ رباط جانبی داخلی، جفت تصاویر نشان‌داده‌شده را بهتر توصیف می‌کند؟"
    },
    "options": [
      {
        "de": "Initial deutliches Umgebungsödem bei erhaltener Bandkontinuität; im zweiten Bild rückläufig.",
        "en": "Initially prominent surrounding oedema with preserved ligament continuity; reduced on the second image.",
        "fa": "ادم واضح اولیه در اطراف رباط با حفظ پیوستگی آن؛ کاهش ادم در تصویر دوم."
      },
      {
        "de": "Initial flüssigkeitsgefüllte vollständige Bandlücke; im zweiten Bild weiterhin fehlende Kontinuität.",
        "en": "Initially a fluid-filled complete ligament gap, with persistent discontinuity on the second image.",
        "fa": "شکاف کامل رباط با محتوای مایع در ابتدا و تداوم گسستگی در تصویر دوم."
      },
      {
        "de": "Initial knöcherner Bandausriss; im zweiten Bild überbrückender Kallus.",
        "en": "Initially an osseous ligament avulsion, with bridging callus on the second image.",
        "fa": "کندگی استخوانی محل اتصال رباط در ابتدا و کالوس پل‌زننده در تصویر دوم."
      },
      {
        "de": "In beiden Bildern unauffälliges Band ohne sichtbare Umgebungsreaktion.",
        "en": "An unremarkable ligament without visible surrounding reaction on either image.",
        "fa": "رباط بدون تغییر و بدون واکنش قابل مشاهدهٔ اطراف، در هر دو تصویر."
      }
    ],
    "correct": "A",
    "explanation": {
      "de": "Links ist periligamentäres Ödem bei kontinuierlich dargestelltem MCL sichtbar, rechts nimmt die Umgebungsreaktion ab. Die Quelle bezeichnet dies als Grad-I-Zerrung. Die eingeblendeten zwei Wochen beschreiben diesen Quellverlauf, keine allgemeine Heilungsfrist oder Freigabe zur Belastung.",
      "en": "The left image shows periligamentous oedema around a continuously depicted MCL; the surrounding reaction decreases on the right. The source labels this a grade-I sprain. The displayed two weeks describe this source follow-up, not a universal healing or return-to-load deadline.",
      "fa": "در تصویر چپ ادم پیرارباطی در اطراف MCL با پیوستگی قابل مشاهده وجود دارد و در سمت راست واکنش اطراف کاهش یافته است. منبع این وضعیت را کشیدگی درجهٔ I می‌نامد. فاصلهٔ دو هفتهٔ درج‌شده مربوط به پیگیری همین منبع است، نه مهلت همگانی ترمیم یا بازگشت به بارگذاری."
    },
    "wrongExplanations": {
      "B": {
        "de": "Ein vollständiger flüssigkeitsgefüllter Defekt mit getrennten Bandstümpfen ist in diesem Quellpaar nicht das gezeigte Leitmuster.",
        "en": "A complete fluid-filled gap with separated ligament ends is not the predominant pattern in this source pair.",
        "fa": "نقص کامل پر از مایع با انتهای جداشدهٔ رباط، الگوی اصلیِ نشان‌داده‌شده در این جفت تصاویر منبع نیست."
      },
      "C": {
        "de": "Das Paar demonstriert eine Weichteilreaktion um das Band, nicht einen knöchernen Ausriss mit Kallusverlauf.",
        "en": "The pair demonstrates a soft-tissue reaction around the ligament, not an osseous avulsion with callus evolution.",
        "fa": "این جفت تصاویر واکنش بافت نرم اطراف رباط را نشان می‌دهد، نه کندگی استخوانی با سیر تشکیل کالوس."
      },
      "D": {
        "de": "Im linken Bild ist eine deutliche helle Umgebungsreaktion sichtbar; beide Bilder sind daher nicht gleichermaßen unauffällig.",
        "en": "The left image shows a prominent bright surrounding reaction; the two images are not both unremarkable.",
        "fa": "در تصویر چپ واکنش پرسیگنال واضح اطراف دیده می‌شود؛ بنابراین هر دو تصویر به یکسان طبیعی نیستند."
      }
    },
    "source": "MSK.pdf physical61 /printed60; original page and retained MRI pair actually visually inspected2026-10-25",
    "difficulty": 2,
    "image": {
      "src": {
        "de": "/knieligamente/mcl-sprain-followup.png",
        "en": "/knieligamente/mcl-sprain-followup.png",
        "fa": "/knieligamente/mcl-sprain-followup.png"
      },
      "alt": {
        "de": "Koronares MRT-Bildpaar des Knies aus MSK.pdf Seite61; links „Trauma“, rechts „nach2Wochen“.",
        "en": "Coronal knee MRI pair from MSK.pdf page61; left labelled “Trauma”, right “after2weeks”.",
        "fa": "جفت تصاویر کرونال MRI زانو از صفحهٔ ۶۱ MSK.pdf؛ برچسب چپ «تروما» و راست «پس از دو هفته»."
      },
      "caption": {
        "de": "Originales Quellpaar ohne zusätzliche Markierungen.",
        "en": "Original source pair without added overlays.",
        "fa": "جفت تصاویر اصلی منبع، بدون علامت‌گذاری افزوده."
      },
      "credit": {
        "de": "MSK.pdf · PDF-Seite61 /Druck60 · Beitragender auf der Seite nicht genannt.",
        "en": "MSK.pdf · PDF page61 /printed60 · no contributor named on the page.",
        "fa": "MSK.pdf · صفحهٔ PDF۶۱ /چاپی۶۰ · نام مشارکت‌کننده در صفحه ذکر نشده است."
      }
    }
  },
  {
    "key": "lcl-v-sign",
    "question": {
      "de": "Sie verfolgen zwei zur Fibula ziehende Strukturen in sagittalen MRT-Schichten. Welche Zuordnung entspricht dem im PDF gezeigten V am Fibulaköpfchen?",
      "en": "You trace two structures toward the fibula on sagittal MRI. Which pairing matches the V at the fibular head shown in the PDF?",
      "fa": "در برش‌های ساژیتال MRI دو ساختار رو به فیبولا را دنبال می‌کنید. کدام ترکیب با V نشان‌داده‌شده در سر فیبولا در PDF مطابقت دارد؟"
    },
    "options": [
      {
        "de": "LCL anteromedial und Biceps-femoris-Sehne posterolateral",
        "en": "LCL anteromedially and biceps femoris tendon posterolaterally",
        "fa": "LCL در قدام‌ـ‌داخل و تاندون بایسپس فموریس در خلف‌ـ‌خارج"
      },
      {
        "de": "Biceps-femoris-Sehne anteromedial und LCL posterolateral",
        "en": "Biceps femoris tendon anteromedially and LCL posterolaterally",
        "fa": "تاندون بایسپس فموریس در قدام‌ـ‌داخل و LCL در خلف‌ـ‌خارج"
      },
      {
        "de": "Popliteussehne anteromedial und Biceps-femoris-Sehne posterolateral",
        "en": "Popliteus tendon anteromedially and biceps femoris tendon posterolaterally",
        "fa": "تاندون پوپلیتئوس در قدام‌ـ‌داخل و تاندون بایسپس فموریس در خلف‌ـ‌خارج"
      },
      {
        "de": "LCL anteromedial und Popliteussehne posterolateral",
        "en": "LCL anteromedially and popliteus tendon posterolaterally",
        "fa": "LCL در قدام‌ـ‌داخل و تاندون پوپلیتئوس در خلف‌ـ‌خارج"
      }
    ],
    "correct": "A",
    "explanation": {
      "de": "Im lateralen Kollateralbandkomplex liegen am Fibulaköpfchen das LCL eher anteromedial und die Biceps-femoris-Sehne eher posterolateral.",
      "en": "Within the lateral collateral complex, the LCL lies more anteromedially and the biceps femoris tendon more posterolaterally at the fibular head.",
      "fa": "در کمپلکس لترال، در سطح سر فیبولا LCL بیشتر قدام-مدیال و تاندون بایسپس فموریس بیشتر خلف-لترال قرار دارد."
    },
    "wrongExplanations": {
      "B": {
        "de": "Diese Zuordnung vertauscht die beiden Schenkel des beschriebenen V.",
        "en": "This reverses the two limbs of the described V.",
        "fa": "این ترکیب دو بازوی V توصیف‌شده را جابه‌جا می‌کند."
      },
      "C": {
        "de": "Die Popliteussehne gehört zum lateralen Komplex, ersetzt aber nicht das zum Fibulaköpfchen ziehende LCL dieses V.",
        "en": "The popliteus tendon belongs to the lateral complex but does not replace the fibular-head LCL limb of this V.",
        "fa": "تاندون پوپلیتئوس در کمپلکس لترال است، اما جای بازوی LCL این V را که به سر فیبولا می‌رود نمی‌گیرد."
      },
      "D": {
        "de": "Der posterolaterale Schenkel ist hier die Biceps-femoris-Sehne; die Popliteussehne hat einen anderen Verlauf.",
        "en": "The posterolateral limb here is the biceps femoris tendon; the popliteus tendon follows a different course.",
        "fa": "بازوی خلفی‌ـ‌خارجی اینجا تاندون بایسپس فموریس است؛ تاندون پوپلیتئوس مسیر دیگری دارد."
      }
    },
    "source": "MSK.pdf physical57–66/printed56–65; actual text and freshly rendered page images read2026-10-25. p58.",
    "difficulty": 2
  },
  {
    "key": "arcuate-sign",
    "question": {
      "de": "Nach Knietrauma zeigt sich ein knöcherner Ausriss am Fibulastyloid (Arcuate Sign). Welcher Verletzungskomplex muss gezielt mitbeurteilt werden?",
      "en": "After knee trauma, a fibular styloid avulsion (arcuate sign) is seen. Which injury complex requires targeted assessment?",
      "fa": "پس از ترومای زانو، کندگی استخوانی زائدهٔ استیلوئید فیبولا (علامت آرکوات) دیده می‌شود. کدام مجموعهٔ آسیب باید هدفمند ارزیابی شود؟"
    },
    "options": [
      {
        "de": "Posterolaterale Stabilisatoren und Kreuzbänder.",
        "en": "Posterolateral stabilizers and cruciate ligaments.",
        "fa": "پایدارکننده‌های خلفی‌ـ‌خارجی و رباط‌های صلیبی."
      },
      {
        "de": "Medialer patellofemoraler Halteapparat.",
        "en": "Medial patellofemoral restraints.",
        "fa": "ساختارهای مهارکنندهٔ کشککی‌ـ‌رانی داخلی."
      },
      {
        "de": "Distaler Streckapparat an der Tuberositas tibiae.",
        "en": "Distal extensor mechanism at the tibial tuberosity.",
        "fa": "مکانیسم اکستانسور دیستال در برجستگی درشت‌نی."
      },
      {
        "de": "Posteromediale Kapsel und Semimembranosusansatz.",
        "en": "Posteromedial capsule and semimembranosus insertion.",
        "fa": "کپسول خلفی‌ـ‌داخلی و اتصال نیم‌غشایی."
      }
    ],
    "correct": "A",
    "explanation": {
      "de": "Das Arcuate Sign weist auf eine Verletzung von Strukturen hin, die am Fibulakopf/-styloid ansetzen. Posterolaterale Strukturen und Kreuzbänder gezielt prüfen; das Zeichen allein bestimmt nicht den gesamten Verletzungsumfang oder eine Therapie.",
      "en": "The arcuate sign indicates injury to structures inserting at the fibular head/styloid. Assess posterolateral structures and cruciate ligaments; the sign alone does not determine the entire injury extent or treatment.",
      "fa": "علامت آرکوات به آسیب ساختارهای متصل به سر/استیلوئید فیبولا اشاره دارد. ساختارهای خلفی‌ـ‌خارجی و رباط‌های صلیبی را هدفمند بررسی کنید؛ این علامت به‌تنهایی وسعت کامل آسیب یا درمان را تعیین نمی‌کند."
    },
    "wrongExplanations": {
      "B": {
        "de": "Ein fibulärer Ausriss liegt nicht am patellaren oder femoralen Ansatz des MPFL.",
        "en": "A fibular avulsion is not at a patellar or femoral MPFL attachment.",
        "fa": "کندگی فیبولا در محل اتصال کشککی یا رانی MPFL نیست."
      },
      "C": {
        "de": "Die Tuberositas tibiae ist der Patellarsehnenansatz; sie liegt nicht am Fibulastyloid.",
        "en": "The tibial tuberosity is the patellar tendon attachment, not the fibular styloid.",
        "fa": "برجستگی درشت‌نی محل اتصال تاندون کشککی است، نه استیلوئید فیبولا."
      },
      "D": {
        "de": "Diese Strukturen gehören zur posteromedialen Seite; der fibuläre Ausriss lenkt zunächst auf den posterolateralen Komplex.",
        "en": "These structures are posteromedial; fibular avulsion first directs attention to the posterolateral complex.",
        "fa": "این ساختارها در سمت خلفی‌ـ‌داخلی‌اند؛ کندگی فیبولا ابتدا توجه را به مجموعهٔ خلفی‌ـ‌خارجی معطوف می‌کند."
      }
    },
    "source": "https://pubmed.ncbi.nlm.nih.gov/12540438/; https://pubmed.ncbi.nlm.nih.gov/14520502/",
    "difficulty": 1
  },
  {
    "key": "mcl-pol",
    "question": {
      "de": "Bei einer akuten MCL-Verletzung soll auch die posteromediale Stabilisierung beurteilt werden. Welche Bandstruktur gehört gezielt zu dieser Beurteilung?",
      "en": "An acute MCL injury also requires assessment of posteromedial stabilization. Which ligament belongs in this targeted assessment?",
      "fa": "در آسیب حاد MCL، پایداری خلفی‌ـ‌داخلی نیز باید ارزیابی شود. کدام رباط باید در این ارزیابی هدفمند بررسی شود؟"
    },
    "options": [
      {
        "de": "Posterior Oblique Ligament (POL).",
        "en": "Posterior oblique ligament (POL).",
        "fa": "رباط مایل خلفی (POL)."
      },
      {
        "de": "Popliteofibulares Ligament.",
        "en": "Popliteofibular ligament.",
        "fa": "رباط پوپلیته‌ـ‌فیبولار."
      },
      {
        "de": "Mediales patellofemorales Ligament (MPFL).",
        "en": "Medial patellofemoral ligament (MPFL).",
        "fa": "رباط کشککی‌ـ‌رانی داخلی (MPFL)."
      },
      {
        "de": "Vorderes Kreuzband (VKB).",
        "en": "Anterior cruciate ligament (ACL).",
        "fa": "رباط صلیبی قدامی (ACL)."
      }
    ],
    "correct": "A",
    "explanation": {
      "de": "Das POL ist ein eigenständig beurteilbarer Teil des posteromedialen Komplexes. Die primäre MRT-Studie zeigte eine Assoziation mit MCL- und weiteren posteromedialen Verletzungen; eine MCL-Verletzung beweist aber keine POL-Ruptur.",
      "en": "The POL is an independently assessable part of the posteromedial complex. The primary MRI study found association with MCL and other posteromedial injuries; an MCL injury does not itself prove a POL tear.",
      "fa": "POL جزء قابل ارزیابیِ مستقلِ مجموعهٔ خلفی‌ـ‌داخلی است. مطالعهٔ اولیهٔ MRI ارتباط آن را با آسیب MCL و دیگر ساختارهای خلفی‌ـ‌داخلی نشان داد؛ اما آسیب MCL به‌خودی‌خود پارگی POL را ثابت نمی‌کند."
    },
    "wrongExplanations": {
      "B": {
        "de": "Das popliteofibulare Ligament gehört zum posterolateralen, nicht zum gesuchten posteromedialen Komplex.",
        "en": "The popliteofibular ligament is posterolateral rather than part of the requested posteromedial complex.",
        "fa": "رباط پوپلیته‌ـ‌فیبولار مربوط به مجموعهٔ خلفی‌ـ‌خارجی است، نه خلفی‌ـ‌داخلی مورد سؤال."
      },
      "C": {
        "de": "Das MPFL stabilisiert die Patella medial; es ist nicht das hier gesuchte POL der posteromedialen Kapselregion.",
        "en": "The MPFL restrains the patella medially; it is not the requested POL of the posteromedial capsular region.",
        "fa": "MPFL کشکک را از سمت داخلی مهار می‌کند؛ این رباط، POL ناحیهٔ کپسولی خلفی‌ـ‌داخلی مورد سؤال نیست."
      },
      "D": {
        "de": "Das VKB ist intraartikulär und kein Ersatz für die gezielte POL-Beurteilung; Begleitverletzungen werden zusätzlich geprüft.",
        "en": "The ACL is intra-articular and does not replace targeted POL assessment; associated injuries are assessed separately.",
        "fa": "ACL داخل‌مفصلی است و جای بررسی هدفمند POL را نمی‌گیرد؛ آسیب‌های همراه جداگانه ارزیابی می‌شوند."
      }
    },
    "source": "https://pubmed.ncbi.nlm.nih.gov/34626207/",
    "difficulty": 1
  },
  {
    "key": "acl-indirect",
    "question": {
      "de": "Welche Befundkombination beschreibt typische indirekte Hinweise auf eine VKB-Ruptur nach Pivot-Verletzung?",
      "en": "Which combination describes typical indirect clues to ACL rupture after a pivot injury?",
      "fa": "کدام ترکیب، سرنخ‌های غیرمستقیم تیپیک پارگی ACL پس از آسیب چرخشی را توصیف می‌کند؟"
    },
    "options": [
      {
        "de": "Kontusion am lateralen Femurkondylus und posterolateralen Tibiaplateau mit anteriorer Tibiasubluxation",
        "en": "Lateral femoral condyle and posterolateral tibial plateau contusions with anterior tibial subluxation",
        "fa": "کنتوزیون کندیل خارجی فمور و پلاتوی خلفی‌ـ‌خارجی تیبیا همراه ساب‌لوکساسیون قدامی تیبیا"
      },
      {
        "de": "Fokale VKB-Faserdiskontinuität mit abnormem Bandverlauf",
        "en": "Focal ACL fibre discontinuity with an abnormal ligament course",
        "fa": "گسستگی کانونی فیبرهای ACL همراه مسیر غیرطبیعی رباط"
      },
      {
        "de": "Voluminöses VKB mit durchziehenden parallelen dunklen Fasern",
        "en": "Bulky ACL with continuous parallel dark fibres",
        "fa": "ACL حجیم با فیبرهای تیرهٔ موازی و پیوسته"
      },
      {
        "de": "Kontusion der inferomedialen Patella und der anterolateralen Femurkondyle",
        "en": "Inferomedial patellar and anterolateral femoral condyle contusions",
        "fa": "کنتوزیون بخش تحتانی‌ـ‌داخلی پاتلا و بخش قدامی‌ـ‌خارجی کندیل فمور"
      }
    ],
    "correct": "A",
    "explanation": {
      "de": "Das laterale femorotibiale Kontusionsmuster und eine anteriore Tibiasubluxation stützen die VKB-Verletzung indirekt. Sie ersetzen nicht die direkte multiplanare Faserbeurteilung; ein Einzelzeichen bestimmt den Rupturgrad nicht sicher.",
      "en": "The lateral femorotibial contusion pattern and anterior tibial subluxation indirectly support ACL injury. They do not replace direct multiplanar fibre assessment; one sign does not reliably establish tear grade.",
      "fa": "الگوی کنتوزیون فموروتیبیال خارجی و ساب‌لوکساسیون قدامی تیبیا به‌طور غیرمستقیم از آسیب ACL حمایت می‌کنند. این یافته‌ها جای بررسی مستقیم چندصفحه‌ای فیبرها را نمی‌گیرند؛ یک علامت به‌تنهایی درجهٔ پارگی را با اطمینان تعیین نمی‌کند."
    },
    "wrongExplanations": {
      "B": {
        "de": "Dies sind direkte Zeichen am VKB selbst, nicht die gesuchten indirekten Begleitzeichen.",
        "en": "These are direct signs in the ACL itself, not the requested indirect associated signs.",
        "fa": "این‌ها علائم مستقیم در خود ACL هستند، نه علائم همراه غیرمستقیم مورد سؤال."
      },
      "C": {
        "de": "Durchgehende dunkle Fasern in einem voluminösen Band lenken die Differenzialdiagnose auf mukoide Degeneration; sie sind kein typisches Pivot-Kontusionsmuster.",
        "en": "Continuous dark fibres in a bulky ligament raise mucoid degeneration as a differential; they are not the typical pivot-contusion pattern.",
        "fa": "فیبرهای تیرهٔ پیوسته در رباط حجیم، دژنراسیون موکوئید را در افتراق مطرح می‌کنند؛ این‌ها الگوی کنتوزیون تیپیک آسیب چرخشی نیستند."
      },
      "D": {
        "de": "Dieses patellofemorale Kontusionspaar lenkt den Verdacht auf eine laterale Patellaluxation und unterscheidet sich vom beschriebenen femorotibialen Pivot-Muster.",
        "en": "This patellofemoral contusion pair raises concern for lateral patellar dislocation and differs from the femorotibial pivot pattern.",
        "fa": "این جفت کنتوزیون پاتلوفمورال شک به دررفتگی خارجی پاتلا را مطرح می‌کند و با الگوی چرخشی فموروتیبیال متفاوت است."
      }
    },
    "source": "MSK.pdf physical57–66/printed56–65; actual text and freshly rendered page images read2026-10-25. p64; https://pubmed.ncbi.nlm.nih.gov/8497637/; https://pubs.rsna.org/doi/10.1148/radiology.213.3.r99dc26697; patellofemoral alternative pattern: https://pubmed.ncbi.nlm.nih.gov/17056925/",
    "difficulty": 2
  },
  {
    "key": "acl-xray",
    "question": {
      "de": "Welcher knöcherne Ausriss entspricht einer Segond-Fraktur und lenkt die gezielte Suche auf eine VKB-Begleitverletzung?",
      "en": "Which bony avulsion represents a Segond fracture and prompts targeted assessment for associated ACL injury?",
      "fa": "کدام کندگی استخوانی معادل شکستگی Segond است و بررسی هدفمند آسیب همراه ACL را مطرح می‌کند؟"
    },
    "options": [
      {
        "de": "Kleiner Ausriss lateral an der proximalen Tibia knapp unter dem Plateau",
        "en": "Small lateral proximal tibial avulsion just below the plateau",
        "fa": "کندگی کوچک در خارج تیبیا پروگزیمال درست زیر پلاتو"
      },
      {
        "de": "Ausriss am Fibulastyloid",
        "en": "Fibular styloid avulsion",
        "fa": "کندگی استیلوئید فیبولا"
      },
      {
        "de": "Ausriss an der Tuberositas tibiae",
        "en": "Tibial tuberosity avulsion",
        "fa": "کندگی برجستگی تیبیا"
      },
      {
        "de": "Ausriss am femoralen MCL-Ansatz",
        "en": "Avulsion at the femoral MCL attachment",
        "fa": "کندگی محل اتصال فمورال MCL"
      }
    ],
    "correct": "A",
    "explanation": {
      "de": "Die Segond-Fraktur ist ein kleiner kapsulärer Ausriss lateral an der proximalen Tibia knapp unterhalb des Plateaus. Sie ist ein wichtiger Hinweis auf innere Knieverletzung mit möglicher VKB- und Meniskusverletzung. Das PDF nennt sie „pathognomonisch“; den tatsächlichen Bandstatus trotzdem direkt prüfen.",
      "en": "A Segond fracture is a small lateral capsular avulsion of the proximal tibia just below the plateau. It is an important clue to internal knee injury with possible ACL and meniscal injury. The PDF calls it “pathognomonic”; still assess actual ligament integrity directly.",
      "fa": "شکستگی Segond کندگی کوچک کپسولی در خارج تیبیا پروگزیمال، درست زیر پلاتو است. این یافته سرنخ مهم آسیب داخلی زانو با احتمال آسیب ACL و منیسک است. PDF آن را «پاتوگنومونیک» می‌نامد؛ بااین‌حال وضعیت واقعی رباط را مستقیم بررسی کنید."
    },
    "wrongExplanations": {
      "B": {
        "de": "Dies ist die fibuläre Lokalisation des Arcuate Sign und lenkt vor allem auf den PLC; Segond liegt an der Tibia.",
        "en": "This is the fibular location of the arcuate sign, directing attention to the PLC; Segond is tibial.",
        "fa": "این محل فیبولارِ علامت آرکوات است که توجه را به PLC جلب می‌کند؛ Segond در تیبیا قرار دارد."
      },
      "C": {
        "de": "Hier setzt die Patellarsehne an; ein Ausriss betrifft den Streckapparat und ist keine Segond-Lokalisation.",
        "en": "The patellar tendon inserts here; avulsion concerns the extensor mechanism, not the Segond location.",
        "fa": "تاندون پاتلا اینجا متصل می‌شود؛ کندگی مربوط به مکانیسم اکستانسور است، نه محل Segond."
      },
      "D": {
        "de": "Diese mediale femorale Lokalisation betrifft den MCL-Ansatz; Segond ist ein lateraler tibialer Ausriss.",
        "en": "This medial femoral location concerns the MCL attachment; Segond is a lateral tibial avulsion.",
        "fa": "این محل داخلی فمور مربوط به اتصال MCL است؛ Segond کندگی خارجی تیبیا است."
      }
    },
    "source": "MSK.pdf physical57–66/printed56–65; actual text and freshly rendered page images read2026-10-25. p64; https://pubmed.ncbi.nlm.nih.gov/3263770/",
    "difficulty": 2
  },
  {
    "key": "pcl-mechanism",
    "question": {
      "de": "Welcher Mechanismus passt klassisch zur HKB-Ruptur?",
      "en": "Which mechanism classically fits a PCL tear?",
      "fa": "کدام مکانیسم به طور کلاسیک با پارگی PCL تطابق دارد؟"
    },
    "options": [
      {
        "de": "Direkter anteriorer Anprall auf die Tibia bei gebeugtem Knie",
        "en": "Direct anterior blow to the tibia with the knee flexed",
        "fa": "ضربه مستقیم از جلو به تیبیا در حالی که زانو خم است"
      },
      {
        "de": "Valgus-Rotation ohne Kontakt beim Richtungswechsel",
        "en": "Non-contact valgus rotation during a pivot",
        "fa": "چرخش والگوس بدون تماس هنگام تغییر جهت"
      },
      {
        "de": "Varus-Rotationsbelastung mit Überstreckung",
        "en": "Varus rotation with hyperextension",
        "fa": "بار واروس‌ـ‌چرخشی همراه اکستانسیون بیش‌ازحد"
      },
      {
        "de": "Lateraler Patellaversatz nach medialem Anprall",
        "en": "Lateral patellar displacement after medial impact",
        "fa": "جابجایی خارجی پاتلا پس از ضربهٔ داخلی"
      }
    ],
    "correct": "A",
    "explanation": {
      "de": "Die klassische Dashboard Injury schiebt die Tibia bei gebeugtem Knie nach posterior und belastet dadurch das HKB.",
      "en": "The classic dashboard injury drives the tibia posteriorly while the knee is flexed, stressing the PCL.",
      "fa": "در dashboard injury، تیبیا در زانوی خم‌شده به عقب رانده می‌شود و PCL تحت کشش قرار می‌گیرد."
    },
    "wrongExplanations": {
      "B": {
        "de": "Ein nichtkontaktbedingter Valgus-Pivot ist klassischerweise mit VKB-Verletzung verbunden; er beschreibt nicht den posterioren Tibiaprall der Dashboard Injury.",
        "en": "A noncontact valgus pivot is classically associated with ACL injury, rather than the posteriorly driven tibia of a dashboard injury.",
        "fa": "چرخش والگوس غیرتماسی به‌طور کلاسیک با آسیب ACL همراه است، نه رانده‌شدن تیبیا به خلف در آسیب داشبورد."
      },
      "C": {
        "de": "Dies lenkt besonders auf den posterolateralen Komplex. Es kann kombinierte Verletzungen geben; der direkte posterior gerichtete Tibiaprall am gebeugten Knie ist der gesuchte Dashboard-Mechanismus.",
        "en": "This especially raises concern for the posterolateral complex. Combined injury can occur; the requested dashboard mechanism is direct posteriorly directed tibial impact at a flexed knee.",
        "fa": "این مکانیسم به‌ویژه PLC را مطرح می‌کند. آسیب ترکیبی ممکن است رخ دهد؛ مکانیسم داشبوردِ مورد سؤال، ضربهٔ مستقیم رو به خلف به تیبیا در زانوی خم است."
      },
      "D": {
        "de": "Dies beschreibt einen patellofemoralen Verletzungsmechanismus und nicht die direkte posteriore Translation der proximalen Tibia.",
        "en": "This describes a patellofemoral injury mechanism, not direct posterior translation of the proximal tibia.",
        "fa": "این مکانیسم آسیب پاتلوفمورال را توصیف می‌کند، نه جابجایی مستقیم تیبیا پروگزیمال به خلف."
      }
    },
    "source": "MSK.pdf physical57–66/printed56–65; actual text and freshly rendered page images read2026-10-25. p66.",
    "difficulty": 2
  }
]

CONTENT.push(q('biceps-tendon-versus-avulsion',Object.fromEntries(['de','en','fa'].map(l=>[l,KNEE_BICEPS_COMPLETION[l].question])),[0,1,2,3].map(i=>Object.fromEntries(['de','en','fa'].map(l=>[l,KNEE_BICEPS_COMPLETION[l].options[i]]))),String.fromCharCode(65+KNEE_BICEPS_CORRECT_INDEX),Object.fromEntries(['de','en','fa'].map(l=>[l,KNEE_BICEPS_COMPLETION[l].feedback[KNEE_BICEPS_CORRECT_INDEX]])),{wrongExplanations:Object.fromEntries(['A','C','D'].map(k=>[k,Object.fromEntries(['de','en','fa'].map(l=>[l,KNEE_BICEPS_COMPLETION[l].feedback['ABCD'.indexOf(k)]]))])),source:"MSK.pdf physical57–66/printed56–65; actual text and freshly rendered page images read2026-10-25. p59; https://pubmed.ncbi.nlm.nih.gov/35136515/; https://doi.org/10.1055/s-0041-1741106",difficulty:2}))
CONTENT.push(...[
  {
    "key": "mucoid-differential",
    "question": {
      "de": "Textfall: Ohne frisches Trauma ist das VKB voluminös und signalreich; dunkle Längsfasern sind vom femoralen bis zum tibialen Ansatz verfolgbar. Welche Einordnung passt am besten?",
      "en": "Text vignette: without recent trauma, the ACL is bulky and high in signal; dark longitudinal fibres can be traced from femoral to tibial attachment. Which interpretation fits best?",
      "fa": "سناریوی متنی: بدون ترومای تازه، ACL حجیم و پرسیگنال است؛ فیبرهای طولی تیره از اتصال فمورال تا تیبیایی قابل پیگیری‌اند. کدام تفسیر مناسب‌تر است؟"
    },
    "options": [
      {
        "de": "Akute komplette VKB-Ruptur mit getrennten Bandstümpfen",
        "en": "Acute complete ACL tear with separated ligament ends",
        "fa": "پارگی کامل حاد ACL با انتهای جداشدهٔ رباط"
      },
      {
        "de": "Mukoide VKB-Degeneration mit erhaltenen durchgehenden Fasern",
        "en": "Mucoid ACL degeneration with preserved continuous fibres",
        "fa": "دژنراسیون موکوئید ACL با فیبرهای پیوستهٔ حفظ‌شده"
      },
      {
        "de": "Normale feine Bündelseptierung bei unverändert schlankem VKB",
        "en": "Normal fine bundle septation in an unchanged slender ACL",
        "fa": "سپتاسیون ظریف طبیعی باندل‌ها در ACL باریک و بدون تغییر"
      },
      {
        "de": "Knöcherner VKB-Ausriss an der tibialen Eminentia",
        "en": "Bony ACL avulsion at the tibial eminence",
        "fa": "کندگی استخوانی ACL در امیننس تیبیا"
      }
    ],
    "correct": "B",
    "explanation": {
      "de": "Vergrößertes Band mit durchziehenden dunklen Fasern im signalreichen Gewebe passt zum Sellerie-Zeichen. Faserverlauf und klinischen Kontext prüfen; Signalsteigerung allein beweist keine Ruptur.",
      "en": "An enlarged ligament with continuous dark fibres in high-signal tissue fits the celery-stalk appearance. Check fibre course and clinical context; high signal alone does not prove a tear.",
      "fa": "رباط بزرگ‌شده با فیبرهای تیرهٔ پیوسته در بافت پرسیگنال با نمای ساقهٔ کرفس سازگار است. مسیر فیبرها و زمینهٔ بالینی را بسنجید؛ سیگنال بالا به‌تنهایی پارگی را اثبات نمی‌کند."
    },
    "wrongExplanations": {
      "A": {
        "de": "Durchgehend verfolgbare Fasern und fehlende Stumpftrennung stützen nicht die beschriebene komplette Ruptur.",
        "en": "Traceable continuous fibres without separated ends do not support that complete-tear interpretation.",
        "fa": "فیبرهای قابل پیگیریِ پیوسته بدون جدایی انتهاها، تفسیر پارگی کامل را تأیید نمی‌کنند."
      },
      "C": {
        "de": "Physiologische Septierung erklärt feine Streifen, nicht die hier beschriebene deutliche Bandvergrößerung.",
        "en": "Physiological septation explains fine streaks, not the marked ligament enlargement described here.",
        "fa": "سپتاسیون طبیعی خطوط ظریف را توضیح می‌دهد، نه بزرگی واضح رباطِ توصیف‌شده."
      },
      "D": {
        "de": "Ein Eminentia-Ausriss verlangt einen knöchernen Defekt beziehungsweise ein Fragment; beides ist hier nicht beschrieben.",
        "en": "Eminence avulsion requires a bony defect or fragment; neither is described here.",
        "fa": "کندگی امیننس به نقص یا قطعهٔ استخوانی نیاز دارد؛ هیچ‌یک اینجا توصیف نشده است."
      }
    },
    "source": "MSK.pdf physical57–66/printed56–65; actual text and freshly rendered page images read2026-10-25. p63/65; https://pubmed.ncbi.nlm.nih.gov/11465770/",
    "difficulty": 2
  },
  {
    "key": "partial-versus-complete",
    "question": {
      "de": "Textfall: Das MCL ist verdickt und signalreich. Ein Teil der Fasern ist unterbrochen, andere sind über die Läsion hinweg kontinuierlich verfolgbar. Welcher MRT-Schweregrad passt?",
      "en": "Text vignette: the MCL is thickened and high in signal. Some fibres are disrupted while others remain continuous across the lesion. Which MRI grade fits?",
      "fa": "سناریوی متنی: MCL ضخیم و پرسیگنال است. بخشی از فیبرها قطع‌اند و برخی دیگر در طول ضایعه پیوسته دنبال می‌شوند. کدام درجهٔ MRI مناسب است؟"
    },
    "options": [
      {
        "de": "Grad I: isoliertes Umgebungsödem bei unverändertem Band",
        "en": "Grade I: surrounding oedema with an unchanged ligament",
        "fa": "درجهٔ I: ادم اطراف با رباط بدون تغییر"
      },
      {
        "de": "Grad III: vollständige Unterbrechung sämtlicher Fasern",
        "en": "Grade III: complete interruption of all fibres",
        "fa": "درجهٔ III: قطع کامل همهٔ فیبرها"
      },
      {
        "de": "Grad II: Partialruptur mit verbliebener Faserkontinuität",
        "en": "Grade II: partial tear with residual fibre continuity",
        "fa": "درجهٔ II: پارگی نسبی با پیوستگی باقی‌ماندهٔ فیبرها"
      },
      {
        "de": "Unauffälliges MCL mit normalem Fasersignal",
        "en": "Unremarkable MCL with normal fibre signal",
        "fa": "MCL بدون تغییر با سیگنال طبیعی فیبرها"
      }
    ],
    "correct": "C",
    "explanation": {
      "de": "Teilweise Faserunterbrechung bei erhaltenen Restfasern entspricht Grad II. Grad III verlangt vollständige Diskontinuität; die Signalhöhe allein trennt die Grade nicht.",
      "en": "Partial fibre interruption with remaining continuous fibres corresponds to grade II. Grade III requires complete discontinuity; signal intensity alone does not separate the grades.",
      "fa": "قطع بخشی از فیبرها با باقی‌ماندن فیبرهای پیوسته با درجهٔ II مطابقت دارد. درجهٔ III به گسستگی کامل نیاز دارد؛ شدت سیگنال به‌تنهایی درجات را جدا نمی‌کند."
    },
    "wrongExplanations": {
      "A": {
        "de": "Grad I hat keine Teilunterbrechung der Bandfasern. Hier sind Faserdefekte beschrieben.",
        "en": "Grade I has no partial fibre interruption. Fibre defects are described here.",
        "fa": "درجهٔ I قطع نسبی فیبرها ندارد؛ اینجا نقص فیبر توصیف شده است."
      },
      "B": {
        "de": "Verbliebene durchgehende Fasern widersprechen der vollständigen Diskontinuität des Grads III.",
        "en": "Remaining continuous fibres contradict complete grade-III discontinuity.",
        "fa": "فیبرهای پیوستهٔ باقی‌مانده با گسستگی کامل درجهٔ III تناقض دارند."
      },
      "D": {
        "de": "Verdickung, Signalveränderung und partielle Defekte sind keine normale Banddarstellung.",
        "en": "Thickening, signal alteration and partial defects are not a normal ligament appearance.",
        "fa": "ضخیم‌شدن، تغییر سیگنال و نقص‌های نسبی، نمای طبیعی رباط نیستند."
      }
    },
    "source": "MSK.pdf physical57–66/printed56–65; actual text and freshly rendered page images read2026-10-25. p57/61.",
    "difficulty": 2
  },
  {
    "key": "pcl-mri-limit",
    "question": {
      "de": "Textfall: Nach Kniebeugetrauma ist das HKB verdickt und intraligamentär signalverändert. Eine vollständige Lücke lässt sich nicht sicher abgrenzen. Welche Befundaussage ist am besten begründet?",
      "en": "Text vignette: after a flexed-knee injury, the PCL is thickened with altered intrasubstance signal. A complete gap cannot be confidently identified. Which report statement is best supported?",
      "fa": "سناریوی متنی: پس از آسیب زانوی خم، PCL ضخیم و دارای تغییر سیگنال داخل رباط است. شکاف کامل با اطمینان مشخص نیست. کدام عبارت گزارش پشتوانهٔ بهتری دارد؟"
    },
    "options": [
      {
        "de": "MRT-Muster einer kompletten HKB-Ruptur",
        "en": "MRI pattern of a complete PCL tear",
        "fa": "الگوی MRIِ پارگی کامل PCL"
      },
      {
        "de": "MRT-Muster eines unauffälligen HKB",
        "en": "MRI pattern of an unremarkable PCL",
        "fa": "الگوی MRIِ PCL بدون تغییر"
      },
      {
        "de": "Isolierte periligamentäre Zerrung bei unverändertem HKB",
        "en": "Isolated periligamentous sprain with an unchanged PCL",
        "fa": "کشیدگی منفرد پیرارباطی با PCL بدون تغییر"
      },
      {
        "de": "HKB-Verletzung verdächtig; Faserkontinuität multiplanar und klinische Stabilität prüfen, Rupturgrad nicht aus Signal allein ableiten",
        "en": "PCL injury suspected; assess fibre continuity in multiple planes and clinical stability, without grading the tear from signal alone",
        "fa": "مشکوک به آسیب PCL؛ پیوستگی فیبرها را چندصفحه‌ای و پایداری را بالینی بررسی کنید و درجهٔ پارگی را فقط از سیگنال نتیجه نگیرید"
      }
    ],
    "correct": "D",
    "explanation": {
      "de": "Verdickung und Signalveränderung können eine HKB-Verletzung anzeigen. Die primäre MRT-Serie zeigte Überschneidungen zwischen Teil- und Komplettrupturen; fokale Diskontinuität unterstützt die Komplettruptur, deren Fehlen schließt Verletzung nicht aus.",
      "en": "Thickening and signal alteration can indicate PCL injury. The primary MRI series showed overlap between partial and complete tears; focal discontinuity supports complete tear, but its absence does not exclude injury.",
      "fa": "ضخیم‌شدن و تغییر سیگنال می‌توانند نشان‌دهندهٔ آسیب PCL باشند. مجموعهٔ اولیهٔ MRI همپوشانی پارگی نسبی و کامل را نشان داد؛ گسستگی کانونی از پارگی کامل حمایت می‌کند، اما نبود آن آسیب را رد نمی‌کند."
    },
    "wrongExplanations": {
      "A": {
        "de": "Die Signalhöhe allein unterscheidet Teil- und Komplettruptur nicht zuverlässig.",
        "en": "Signal intensity alone does not reliably distinguish partial from complete tear.",
        "fa": "شدت سیگنال به‌تنهایی پارگی نسبی و کامل را قابل‌اعتماد جدا نمی‌کند."
      },
      "B": {
        "de": "HKB-Verletzungen können ohne klar erkennbare komplette Lücke signalverändert und verdickt erscheinen.",
        "en": "PCL injuries may appear thickened and signal-altered without an obvious complete gap.",
        "fa": "آسیب PCL می‌تواند بدون شکاف کاملِ واضح، به‌صورت ضخیم و با تغییر سیگنال دیده شود."
      },
      "C": {
        "de": "Der traumatische Kontext und die Bandveränderung verlangen gezielte Abklärung; sie sind kein physiologischer Normalbefund.",
        "en": "The trauma context and ligament abnormality require targeted assessment; they are not a physiological normal finding.",
        "fa": "زمینهٔ تروما و تغییر رباط به بررسی هدفمند نیاز دارند؛ این‌ها یافتهٔ طبیعی فیزیولوژیک نیستند."
      }
    },
    "source": "MSK.pdf physical57–66/printed56–65; actual text and freshly rendered page images read2026-10-25. p66; https://pubmed.ncbi.nlm.nih.gov/8089331/",
    "difficulty": 2
  }
])

export const KNIE_LIGAMENTE_QUESTIONS = Object.fromEntries(
  ['de', 'en', 'fa'].map(lang => [
    lang,
    CONTENT.map((item, index) => ({
      id: `kreuzbaender-${lang}-${String(index + 1).padStart(2, '0')}`,
      tags: ['kreuzbaender', 'knieligamente', 'knie'],
      fach: 'msk',
      question: item.question[lang],
      options: item.options.map((option, optionIndex) => ({
        id: String.fromCharCode(65 + optionIndex),
        text: option[lang],
      })),
      correct: item.correct,
      explanation: item.explanation[lang],
      difficulty: item.difficulty || 1,
      ...(item.wrongExplanations ? { wrongExplanations: Object.fromEntries(Object.entries(item.wrongExplanations).map(([id, text]) => [id, text[lang]])) } : {}),
      ...(item.source ? { source: item.source } : {}),
      ...(item.image ? { image: Object.fromEntries(Object.entries(item.image).map(([key, value]) => [key, typeof value === 'object' ? value[lang] : value])) } : {}),
    })),
  ]),
)

export const KNIE_LIGAMENTE_FLASHCARDS = [
  {
    "id": "kreuzbaender-01",
    "topicId": "kreuzbaender",
    "category": {
      "de": "MRT-Grading",
      "en": "MRI grading",
      "fa": "درجه‌بندی MRI"
    },
    "front": {
      "de": "Wie unterscheiden sich Grad I, II und III einer Bandverletzung im MRT?",
      "en": "How do grade I, II and III ligament injuries differ on MRI?",
      "fa": "آسیب رباط درجه I، II و III در MRI چه تفاوتی دارند؟"
    },
    "answer": {
      "de": "I: Zerrung, II: Partialruptur, III: Komplettruptur.",
      "en": "I: sprain, II: partial tear, III: complete tear.",
      "fa": "I: کشیدگی، II: پارگی نسبی، III: پارگی کامل."
    },
    "explanation": {
      "de": "Grad I zeigt periligamentöses Ödem bei erhaltener Kontur. Grad II zeigt Verdickung, intraligamentäres Signal und teilweisen Fasererhalt. Grad III zeigt komplette Diskontinuität, oft mit welligem Verlauf.",
      "en": "Grade I shows periligamentous oedema with preserved contour. Grade II shows thickening, intraligamentous signal and some intact fibres. Grade III shows complete discontinuity, often with a wavy course.",
      "fa": "درجه I ادم اطراف رباط با کانتور حفظ‌شده دارد. درجه II ضخیم‌شدن، سیگنال داخل رباط و باقی‌ماندن بخشی از فیبرها را نشان می‌دهد. درجه III قطع کامل و اغلب مسیر موج‌دار دارد."
    },
    "diagram": {
      "de": "I: Umgebungsödem | II: Teildefekt | III: vollständiger Defekt",
      "en": "I: surrounding oedema | II: partial defect | III: complete defect",
      "fa": "I: ادم اطراف | II: نقص نسبی | III: نقص کامل"
    },
    "source": "MSK.pdf physical57–66/printed56–65; actual text and freshly rendered page images read2026-10-25. p57/61."
  },
  {
    "id": "kreuzbaender-02",
    "topicId": "kreuzbaender",
    "category": {
      "de": "LCL/PLC",
      "en": "LCL/PLC",
      "fa": "LCL/PLC"
    },
    "front": {
      "de": "Was bedeutet das Arcuate Sign?",
      "en": "What does the arcuate sign mean?",
      "fa": "علامت آرکوات (Arcuate sign) به چه معناست؟"
    },
    "answer": {
      "de": "Avulsion am Fibulaköpfchen und Red Flag für PLC-Verletzung.",
      "en": "Fibular head avulsion and red flag for PLC injury.",
      "fa": "کندگی سر فیبولا و هشدار برای آسیب PLC."
    },
    "explanation": {
      "de": "Die fibuläre Avulsion lenkt die Suche auf PLC-Strukturen und Kreuzbänder. Das Fragment allein legt weder jede betroffene Struktur noch die funktionelle Instabilität fest.",
      "en": "Fibular avulsion directs assessment to the PLC structures and cruciate ligaments. The fragment alone establishes neither every injured structure nor functional instability.",
      "fa": "آولسیون فیبولا بررسی ساختارهای PLC و رباط‌های صلیبی را مطرح می‌کند. قطعه به‌تنهایی نه تمام ساختارهای آسیب‌دیده و نه ناپایداری عملکردی را تعیین می‌کند."
    },
    "diagram": {
      "de": "Fibulaköpfchen-Avulsion → PLC prüfen",
      "en": "Fibular head avulsion → check PLC",
      "fa": "کندگی سر فیبولا → بررسی PLC"
    },
    "source": "https://pubmed.ncbi.nlm.nih.gov/12540438/; https://pubmed.ncbi.nlm.nih.gov/14520502/"
  },
  {
    "id": "kreuzbaender-03",
    "topicId": "kreuzbaender",
    "category": {
      "de": "MCL/POL",
      "en": "MCL/POL",
      "fa": "MCL/POL"
    },
    "front": {
      "de": "Warum muss bei MCL-Verletzung das POL mitbeurteilt werden?",
      "en": "Why must the POL be assessed in MCL injuries?",
      "fa": "چرا در آسیب MCL باید POL هم بررسی شود؟"
    },
    "answer": {
      "de": "Weil MCL und POL eine mediale Stabilitätseinheit bilden.",
      "en": "Because the MCL and POL form a medial stabilising unit.",
      "fa": "چون MCL و POL یک واحد پایداری مدیال می‌سازند."
    },
    "explanation": {
      "de": "MCL- und POL-Verletzungen können kombiniert vorliegen. Das begründet die gezielte Suche am POL, nicht seine automatische Rupturdiagnose bei jedem medialen Ödem.",
      "en": "MCL and POL injuries may coexist. This supports targeted POL assessment, not automatic diagnosis of rupture from any medial oedema.",
      "fa": "آسیب MCL و POL می‌توانند همراه باشند. این امر بررسی هدفمند POL را توجیه می‌کند، نه تشخیص خودکار پارگی با هر ادم داخلی."
    },
    "source": "https://pubmed.ncbi.nlm.nih.gov/34626207/"
  },
  {
    "id": "kreuzbaender-04",
    "topicId": "kreuzbaender",
    "category": {
      "de": "VKB",
      "en": "ACL",
      "fa": "ACL"
    },
    "front": {
      "de": "Welche direkten und indirekten Zeichen sprechen für eine VKB-Ruptur?",
      "en": "Which direct and indirect signs suggest an ACL tear?",
      "fa": "کدام علائم مستقیم و غیرمستقیم به نفع پارگی ACL هستند؟"
    },
    "answer": {
      "de": "Direkt: Faserdiskontinuität und abnormer Verlauf. Indirekt: laterale Kontusionen, anteriore Tibiasubluxation und gebogenes HKB.",
      "en": "Direct: fibre discontinuity and abnormal course. Indirect: lateral contusions, anterior tibial subluxation and buckled PCL.",
      "fa": "مستقیم: گسستگی فیبرها و مسیر غیرطبیعی. غیرمستقیم: کنتوزیون‌های خارجی، ساب‌لوکساسیون قدامی تیبیا و PCL خمیده."
    },
    "explanation": {
      "de": "Signalsteigerung gehört in den Kontext der Faserbeurteilung: Sie kann auch bei mukoider Degeneration oder normaler Bündelseptierung vorliegen. Direkte und indirekte Befunde kombinieren; kein Einzelzeichen ersetzt die multiplanare Prüfung.",
      "en": "Interpret high signal in the context of fibre assessment: it can also occur in mucoid degeneration or normal bundle septation. Combine direct and indirect findings; no single sign replaces multiplanar assessment.",
      "fa": "سیگنال بالا را در زمینهٔ بررسی فیبرها تفسیر کنید؛ این یافته در دژنراسیون موکوئید یا سپتاسیون طبیعی باندل‌ها هم رخ می‌دهد. یافته‌های مستقیم و غیرمستقیم را ترکیب کنید؛ هیچ علامت منفردی جای بررسی چندصفحه‌ای را نمی‌گیرد."
    },
    "source": "MSK.pdf physical57–66/printed56–65; actual text and freshly rendered page images read2026-10-25. https://pubmed.ncbi.nlm.nih.gov/8497637/; https://pubs.rsna.org/doi/10.1148/radiology.213.3.r99dc26697"
  },
  {
    "id": "kreuzbaender-05",
    "topicId": "kreuzbaender",
    "category": {
      "de": "VKB-Differenzialdiagnose",
      "en": "ACL differential",
      "fa": "افتراق ACL"
    },
    "front": {
      "de": "Wie grenzt man mukoide VKB-Degeneration von Ruptur ab?",
      "en": "How do you distinguish mucoid ACL degeneration from rupture?",
      "fa": "دژنراسیون موکوئید ACL را چگونه از پارگی افتراق می‌دهیم؟"
    },
    "answer": {
      "de": "Voluminöses VKB mit durchgehenden dunklen Fasern zwischen signalreichem Gewebe (Sellerie-Zeichen) unterstützt mukoide Degeneration.",
      "en": "A bulky ACL with continuous dark fibres amid high-signal tissue (celery-stalk appearance) supports mucoid degeneration.",
      "fa": "ACL حجیم با فیبرهای تیرهٔ پیوسته میان بافت پرسیگنال (نمای ساقهٔ کرفس) از دژنراسیون موکوئید حمایت می‌کند."
    },
    "explanation": {
      "de": "Den gesamten Faserverlauf und klinischen Kontext prüfen. Fehlendes Traumaödem schließt eine alte Ruptur nicht aus; feine Streifen ohne deutliche Bandvergrößerung können normale Septierung sein.",
      "en": "Assess the entire fibre course and clinical context. Absent traumatic oedema does not exclude an old tear; fine streaks without marked enlargement may be normal septation.",
      "fa": "کل مسیر فیبرها و زمینهٔ بالینی را بسنجید. نبود ادم تروماتیک پارگی قدیمی را رد نمی‌کند؛ خطوط ظریف بدون بزرگی واضح رباط می‌توانند سپتاسیون طبیعی باشند."
    },
    "source": "https://pubmed.ncbi.nlm.nih.gov/11465770/"
  },
  {
    "id": "kreuzbaender-06",
    "topicId": "kreuzbaender",
    "category": {
      "de": "HKB",
      "en": "PCL",
      "fa": "PCL"
    },
    "front": {
      "de": "Wie hängen Dashboard-Mechanismus und MRT-Beurteilung des HKB zusammen?",
      "en": "How do the dashboard mechanism and PCL MRI assessment relate?",
      "fa": "مکانیسم داشبورد و ارزیابی MRIِ PCL چه ارتباطی دارند؟"
    },
    "answer": {
      "de": "Posterior gerichtete Kraft auf die Tibia am gebeugten Knie belastet das HKB. Im MRT Verdickung, Signal und Faserkontinuität prüfen.",
      "en": "A posteriorly directed force on the tibia with the knee flexed loads the PCL. On MRI assess thickness, signal and fibre continuity.",
      "fa": "نیروی رو به خلف روی تیبیا در زانوی خم، PCL را تحت بار می‌گذارد. در MRI ضخامت، سیگنال و پیوستگی فیبرها را بسنجید."
    },
    "explanation": {
      "de": "Teil- und Komplettrupturen können sich hinsichtlich Signal und Dicke überschneiden; den Grad nicht allein aus der Signalhöhe ableiten. Bandstatus, Begleitverletzungen und klinische Stabilität gemeinsam berichten.",
      "en": "Partial and complete tears can overlap in signal and thickness; do not grade from signal intensity alone. Integrate ligament findings, associated injuries and clinical stability.",
      "fa": "پارگی نسبی و کامل می‌توانند در سیگنال و ضخامت همپوشانی داشته باشند؛ درجه را فقط از شدت سیگنال نتیجه نگیرید. یافتهٔ رباط، آسیب‌های همراه و پایداری بالینی را با هم گزارش کنید."
    },
    "source": "MSK.pdf physical57–66/printed56–65; actual text and freshly rendered page images read2026-10-25. https://pubmed.ncbi.nlm.nih.gov/8089331/"
  },
  {
    "id": "kreuzbaender-07",
    "topicId": "kreuzbaender",
    "category": {
      "de": "Biceps femoris / PLC",
      "en": "Biceps femoris / PLC",
      "fa": "بایسپس فموریس / PLC"
    },
    "front": {
      "de": "Ist eine distale Biceps-femoris-Ruptur ohne Knochenfragment ein Arcuate Sign?",
      "en": "Is a distal biceps femoris tear without a bone fragment an arcuate sign?",
      "fa": "آیا پارگی دیستال بایسپس فموریس بدون قطعهٔ استخوانی، علامت آرکوات محسوب می‌شود؟"
    },
    "answer": {
      "de": "Nein. Das Arcuate Sign bezeichnet eine knöcherne Avulsion am Fibulaköpfchen.",
      "en": "No. The arcuate sign denotes a bony avulsion at the fibular head.",
      "fa": "خیر. علامت آرکوات به آولسیون استخوانی در سر فیبولا اشاره دارد."
    },
    "explanation": {
      "de": "Die unterbrochene Sehne ist ein Weichteilbefund. Ein Arcuate Sign erfordert dagegen einen knöchernen fibulären Ausriss. LCL und übrige PLC-Strukturen separat beurteilen; aus der Biceps-Läsion folgt ihr Rupturstatus nicht automatisch.",
      "en": "The disrupted tendon is a soft-tissue finding. An arcuate sign instead requires a bony fibular avulsion. Assess the LCL and other PLC structures separately; the biceps lesion does not establish their tear status.",
      "fa": "قطع تاندون یک یافتهٔ بافت نرم است. علامت آرکوات در مقابل به کندگی استخوانی فیبولا نیاز دارد. LCL و سایر ساختارهای PLC را جداگانه بسنجید؛ ضایعهٔ بایسپس وضعیت پارگی آن‌ها را خودکار تعیین نمی‌کند."
    },
    "source": "https://pubmed.ncbi.nlm.nih.gov/35136515/; https://doi.org/10.1055/s-0041-1741106"
  }
]
