// Canonical original PanNET pool; stable IDs and correct keys. ATV05 review pending.
export const PNET_QUESTIONS = {
  "de": [
    {
      "id": "pnet-de-01",
      "tags": [
        "pnet"
      ],
      "fach": "abdomen",
      "question": "Welches CT-Muster ist für einen PanNET häufig, obwohl abweichende Enhancementmuster vorkommen?",
      "options": [
        {
          "id": "A",
          "text": "Umschriebener solider Herd mit deutlicher arterieller Hyperanreicherung zum Pankreas"
        },
        {
          "id": "B",
          "text": "Unscharfer hypovaskulärer Herd mit abruptem Hauptgangabbruch"
        },
        {
          "id": "C",
          "text": "Diffuse Drüsenschwellung mit entzündlichen Veränderungen des umgebenden Fetts"
        },
        {
          "id": "D",
          "text": "Cluster kleiner Zysten mit kontrastierenden Septen"
        }
      ],
      "correct": "A",
      "explanation": "Arterielle Hyperanreicherung ist ein häufiges PanNET-Muster, aber nicht obligat. Originalkohorten dokumentieren auch iso- und hypoenhancende PanNET. Größe, Morphologie, Gang- und Gefäßbezug sowie Metastasenbefund ergänzen die Einordnung; aus Enhancement allein folgt kein sicherer Tumorgrad.",
      "wrongExplanations": {
        "B": "Dieses Muster lenkt den Verdacht eher auf einen duktalen Tumor. Hypoenhancement kann jedoch auch bei PanNET vorkommen; die Frage sucht dessen häufiges Muster, keinen Ausschlusstest.",
        "C": "Diffuse Schwellung und Fettreaktion sind eher ein entzündliches Muster als das häufige fokale solide PanNET-Muster. Klinik und weitere Befunde bleiben erforderlich.",
        "D": "Ein mikrozystisch-septiertes Muster lenkt die Einordnung zunächst auf eine zystische Läsion. PanNET können zystische Anteile haben, dies ist aber nicht das gefragte häufige solide Muster."
      },
      "source": "https://pubmed.ncbi.nlm.nih.gov/23991643/"
    },
    {
      "id": "pnet-de-02",
      "tags": [
        "pnet"
      ],
      "fach": "abdomen",
      "question": "Textfall: Eine kleine hypervaskuläre Läsion im Pankreasschwanz entspricht in CT-Dichte, MRT-Signal und Enhancement über die verfügbaren Phasen der Milz. Welche wichtige Differenzialdiagnose passt besonders zu dieser Übereinstimmung?",
      "options": [
        {
          "id": "A",
          "text": "Nichtfunktionelles PanNET"
        },
        {
          "id": "B",
          "text": "Intrapankreatischer Splenulus"
        },
        {
          "id": "C",
          "text": "Pankreasmetastase eines Nierenzellkarzinoms"
        },
        {
          "id": "D",
          "text": "Solid-pseudopapilläre Neoplasie"
        }
      ],
      "correct": "B",
      "explanation": "Ektopisches Milzgewebe kann über native und dynamische CT-/MRT-Aufnahmen die Eigenschaften der Milz zeigen. Diese Übereinstimmung ist ein wichtiger Hinweis im Pankreasschwanz und sollte vor vorschneller Tumorzuordnung geprüft werden. Bei verbleibender Unsicherheit ist eine gezielte Bestätigung möglich; die Textkonstellation ersetzt keine individuelle Diagnostik.",
      "wrongExplanations": {
        "A": "PanNET kann hypervaskulär sein. Die zusätzliche Übereinstimmung mit Milzgewebe in mehreren Sequenzen und Phasen verlangt jedoch besonders die Berücksichtigung eines Splenulus; Hypervaskularität allein trennt beide nicht.",
        "C": "Nierenzellkarzinommetastasen können hypervaskulär sein; Tumoranamnese und übrige Ausbreitung sind wichtig. Die beschriebene Milzgleichheit ist hier aber der gezielte Hinweis auf ektopisches Milzgewebe.",
        "D": "Eine pankreatische Raumforderung kann diese weitere Differenzialdiagnose erfordern. Die konkrete Übereinstimmung mit der Milz begründet hier vorrangig die Prüfung auf einen Splenulus, nicht die Zuordnung einer Neoplasie."
      },
      "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC3473517/"
    },
    {
      "id": "pnet-de-03",
      "tags": [
        "pnet"
      ],
      "fach": "abdomen",
      "question": "Welcher Befundkomplex stützt am direktesten ein klinisch funktionelles Insulinom-Syndrom bei einem PanNET?",
      "options": [
        {
          "id": "A",
          "text": "SSTR-positive Läsion und unauffällige Glukosewerte"
        },
        {
          "id": "B",
          "text": "Insulin-positive Tumorfärbung ohne dokumentiertes Hypoglykämiesyndrom"
        },
        {
          "id": "C",
          "text": "Typische Hypoglykämiebeschwerden mit dokumentiert niedriger Glukose und unangemessen erhaltenem/erhöhtem Insulin"
        },
        {
          "id": "D",
          "text": "Arterielle Hyperanreicherung mit niedrigem T1- und hohem T2-Signal"
        }
      ],
      "correct": "C",
      "explanation": "Ein NET-assoziiertes funktionelles Syndrom verbindet klinische Symptome mit dem biochemischen Nachweis einer unangemessenen Hormonkonzentration. Bildgebung lokalisiert und charakterisiert, ersetzt diese klinisch-biochemische Einordnung aber nicht. Die Bestätigung erfolgt im geeigneten endokrinologischen Untersuchungsrahmen.",
      "wrongExplanations": {
        "A": "SSTR-Uptake zeigt Rezeptorexpression und kann zur Lokalisation beitragen; er belegt kein klinisches Hormonexzess-Syndrom.",
        "B": "Eine Hormonfärbung zeigt die Expression im Gewebe, belegt aber ohne passendes klinisch-biochemisches Syndrom keine Funktionalität.",
        "D": "Diese Signale und das Enhancement beschreiben ein Bildmuster, nicht die systemische Wirkung einer Hormonsekretion."
      },
      "source": "https://doi.org/10.1111/jne.13318"
    },
    {
      "id": "pnet-de-04",
      "tags": [
        "pnet"
      ],
      "fach": "abdomen",
      "question": "Eine Zusammenfassung beschreibt überwiegend gutartige Insulinome. Für eine nichtfunktionelle PanNET-Gruppe soll daraus eine Risikoeinschätzung abgeleitet werden. Welche Datengrundlage adressiert diese Übertragbarkeit am direktesten?",
      "options": [
        {
          "id": "A",
          "text": "Eine größere Zahl zusätzlicher Insulinome mit derselben Datenerhebung"
        },
        {
          "id": "B",
          "text": "Genauere Messungen des arteriellen Enhancements in der Insulinomgruppe"
        },
        {
          "id": "C",
          "text": "Eine längere Nachbeobachtung derselben Insulinomgruppe"
        },
        {
          "id": "D",
          "text": "Daten aus der nichtfunktionellen Zielgruppe mit Tumorgrad, Verlauf und klinischem Kontext"
        }
      ],
      "correct": "D",
      "explanation": "Insulinomdaten beschreiben eine andere klinisch-biologische Gruppe. Mehr oder längere Daten derselben Ausgangsgruppe lösen die Übertragbarkeit nicht allein. Für nichtfunktionelle PanNET sind eigene Daten sowie Grad, Wachstum, Bildbefund und Patientenkontext relevant; eine Größen- oder Benignitätsregel wird daraus nicht abgeleitet.",
      "wrongExplanations": {
        "A": "Mehr Insulinomfälle verbessern die Beschreibung der Ausgangsgruppe, beantworten aber den Unterschied zur nichtfunktionellen Zielgruppe nicht direkt.",
        "B": "Genauere Bildmessungen können die Messqualität verbessern, ersetzen aber keine passende Zielpopulation für die Risikoeinschätzung.",
        "C": "Längere Nachbeobachtung kann spätere Ereignisse bei Insulinomen erfassen. Die klinisch-biologische Differenz zur nichtfunktionellen Gruppe bleibt bestehen."
      },
      "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7029300/"
    }
  ],
  "en": [
    {
      "id": "pnet-en-01",
      "tags": [
        "pnet"
      ],
      "fach": "abdomen",
      "question": "Which CT pattern is common in PanNET, although alternative enhancement patterns occur?",
      "options": [
        {
          "id": "A",
          "text": "Circumscribed solid lesion with marked arterial hyperenhancement relative to pancreas"
        },
        {
          "id": "B",
          "text": "Ill-defined hypovascular lesion with abrupt main-duct cut-off"
        },
        {
          "id": "C",
          "text": "Diffuse gland enlargement with inflammatory changes in surrounding fat"
        },
        {
          "id": "D",
          "text": "Cluster of small cysts with enhancing septa"
        }
      ],
      "correct": "A",
      "explanation": "Arterial hyperenhancement is a common but non-obligatory PanNET pattern. Original cohorts also document iso- and hypoenhancing PanNETs. Size, morphology, ductal/vascular relationships and metastases complement assessment; enhancement alone does not establish tumour grade.",
      "wrongExplanations": {
        "B": "This pattern raises greater concern for a ductal tumour. Hypoenhancement can nevertheless occur in PanNET; the question asks for its common pattern, not an exclusion test.",
        "C": "Diffuse enlargement and fat reaction favour an inflammatory pattern over the common focal solid-PanNET pattern. Clinical and additional findings remain necessary.",
        "D": "A microcystic septated pattern initially directs assessment towards a cystic lesion. PanNETs can contain cystic components, but this is not the common solid pattern asked for."
      },
      "source": "https://pubmed.ncbi.nlm.nih.gov/23991643/"
    },
    {
      "id": "pnet-en-02",
      "tags": [
        "pnet"
      ],
      "fach": "abdomen",
      "question": "Text vignette: A small hypervascular pancreatic-tail lesion matches the spleen in CT attenuation, MRI signal and enhancement across available phases. Which important differential diagnosis particularly fits this match?",
      "options": [
        {
          "id": "A",
          "text": "Nonfunctioning PanNET"
        },
        {
          "id": "B",
          "text": "Intrapancreatic accessory spleen"
        },
        {
          "id": "C",
          "text": "Pancreatic metastasis from renal cell carcinoma"
        },
        {
          "id": "D",
          "text": "Solid pseudopapillary neoplasm"
        }
      ],
      "correct": "B",
      "explanation": "Ectopic splenic tissue can match the spleen on unenhanced and dynamic CT/MRI. This is an important pancreatic-tail clue to check before prematurely assigning a tumour diagnosis. Targeted confirmation is possible if uncertainty remains; this text scenario does not replace individual evaluation.",
      "wrongExplanations": {
        "A": "PanNET can be hypervascular. The additional match to splenic tissue across sequences and phases particularly warrants consideration of accessory spleen; hypervascularity alone does not distinguish them.",
        "C": "Renal-cell carcinoma metastases can be hypervascular; cancer history and other disease sites matter. The stated match to the spleen is the targeted clue to ectopic splenic tissue here.",
        "D": "A pancreatic mass may warrant this additional differential diagnosis. Here, the specific match to spleen prioritises checking for accessory splenic tissue rather than assigning a neoplasm."
      },
      "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC3473517/"
    },
    {
      "id": "pnet-en-03",
      "tags": [
        "pnet"
      ],
      "fach": "abdomen",
      "question": "Which set of findings most directly supports a clinically functioning insulinoma syndrome in a patient with PanNET?",
      "options": [
        {
          "id": "A",
          "text": "SSTR-positive lesion with unremarkable glucose levels"
        },
        {
          "id": "B",
          "text": "Insulin-positive tumour staining without a documented hypoglycaemic syndrome"
        },
        {
          "id": "C",
          "text": "Typical hypoglycaemic symptoms with documented low glucose and inappropriately maintained/elevated insulin"
        },
        {
          "id": "D",
          "text": "Arterial hyperenhancement with low T1 and high T2 signal"
        }
      ],
      "correct": "C",
      "explanation": "A NET-associated functioning syndrome combines clinical symptoms with biochemical evidence of an inappropriate hormone concentration. Imaging localises and characterises but does not replace clinical/biochemical assessment. Confirmation requires an appropriate endocrine evaluation.",
      "wrongExplanations": {
        "A": "SSTR uptake demonstrates receptor expression and may aid localisation; it does not establish a clinical hormone-excess syndrome.",
        "B": "Hormone staining demonstrates tissue expression but does not establish functioning status without a corresponding clinical/biochemical syndrome.",
        "D": "These signals and enhancement describe an imaging pattern rather than the systemic effects of hormone secretion."
      },
      "source": "https://doi.org/10.1111/jne.13318"
    },
    {
      "id": "pnet-en-04",
      "tags": [
        "pnet"
      ],
      "fach": "abdomen",
      "question": "A summary describes mostly benign insulinomas. Its findings are to inform risk estimation in a nonfunctioning PanNET group. Which evidence most directly addresses this transfer between populations?",
      "options": [
        {
          "id": "A",
          "text": "A larger number of additional insulinomas with the same data collection"
        },
        {
          "id": "B",
          "text": "More precise arterial-enhancement measurements in the insulinoma group"
        },
        {
          "id": "C",
          "text": "Longer follow-up of the same insulinoma group"
        },
        {
          "id": "D",
          "text": "Data from the nonfunctioning target population including tumour grade, evolution and clinical context"
        }
      ],
      "correct": "D",
      "explanation": "Insulinoma data describe a different clinical/biological group. More data or longer follow-up in the same source group does not by itself resolve transferability. Nonfunctioning PanNET assessment requires target-population data and consideration of grade, growth, imaging and patient context; no size or benignity rule is inferred.",
      "wrongExplanations": {
        "A": "More insulinoma cases improve description of the source group but do not directly address its difference from the nonfunctioning target group.",
        "B": "More precise imaging measurements can improve measurement quality but do not replace an appropriate target population for risk estimation.",
        "C": "Longer follow-up may capture later events in insulinomas. The clinical/biological difference from the nonfunctioning group remains."
      },
      "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7029300/"
    }
  ],
  "fa": [
    {
      "id": "pnet-fa-01",
      "tags": [
        "pnet"
      ],
      "fach": "abdomen",
      "question": "کدام الگوی CT در PanNET شایع است، هرچند الگوهای متفاوت رفتار مادهٔ حاجب نیز دیده می‌شوند؟",
      "options": [
        {
          "id": "A",
          "text": "کانون توپر مشخص با جذب شریانی واضح بیشتر از پانکراس"
        },
        {
          "id": "B",
          "text": "کانون کم‌عروق با حاشیهٔ نامشخص همراه قطع ناگهانی مجرای اصلی"
        },
        {
          "id": "C",
          "text": "تورم منتشر غده با تغییرات التهابی چربی اطراف"
        },
        {
          "id": "D",
          "text": "خوشه‌ای از کیست‌های کوچک همراه سپتاهای دارای جذب مادهٔ حاجب"
        }
      ],
      "correct": "A",
      "explanation": "جذب بیشتر شریانی الگویی شایع ولی غیرالزامی در PanNET است. گروه‌های مطالعاتی اصلی، PanNET ایزو یا کم‌جذب را نیز ثبت کرده‌اند. اندازه، مورفولوژی، ارتباط مجرایی و عروقی و متاستازها ارزیابی را تکمیل می‌کنند؛ رفتار مادهٔ حاجب به‌تنهایی گرید تومور را قطعی نمی‌کند.",
      "wrongExplanations": {
        "B": "این الگو بیشتر شک به تومور داکتال را مطرح می‌کند. با این حال کم‌جذبی در PanNET نیز ممکن است؛ سؤال الگوی شایع را می‌پرسد، نه آزمون رد تشخیص.",
        "C": "تورم منتشر و واکنش چربی بیشتر الگوی التهابی‌اند تا الگوی شایع کانون توپر PanNET. داده‌های بالینی و یافته‌های تکمیلی همچنان لازم‌اند.",
        "D": "الگوی میکروکیستیک سپتادار، ابتدا ارزیابی را به سمت ضایعهٔ کیستیک هدایت می‌کند. PanNET می‌تواند اجزای کیستیک داشته باشد، اما این الگوی شایع توپرِ مورد سؤال نیست."
      },
      "source": "https://pubmed.ncbi.nlm.nih.gov/23991643/"
    },
    {
      "id": "pnet-fa-02",
      "tags": [
        "pnet"
      ],
      "fach": "abdomen",
      "question": "سناریوی متنی: ضایعهٔ کوچک پرعروق در دم پانکراس از نظر دانسیتهٔ CT، سیگنال MRI و رفتار مادهٔ حاجب در فازهای موجود با طحال تطابق دارد. کدام تشخیص افتراقی مهم به‌ویژه با این تطابق سازگار است؟",
      "options": [
        {
          "id": "A",
          "text": "PanNET غیرفانکشنال"
        },
        {
          "id": "B",
          "text": "طحال فرعی داخل پانکراس"
        },
        {
          "id": "C",
          "text": "متاستاز پانکراس از کارسینوم سلول کلیوی"
        },
        {
          "id": "D",
          "text": "نئوپلاسم توپر پسودوپاپیلاری"
        }
      ],
      "correct": "B",
      "explanation": "بافت طحال نابجا می‌تواند در تصاویر CT و MRI پیش از تزریق و دینامیک، ویژگی‌های طحال را نشان دهد. این تطابق در دم پانکراس سرنخ مهمی است و باید پیش از نام‌گذاری شتاب‌زدهٔ تومور بررسی شود. در عدم قطعیت باقی‌مانده، تأیید هدفمند ممکن است؛ این سناریوی متنی جای بررسی فردی را نمی‌گیرد.",
      "wrongExplanations": {
        "A": "PanNET می‌تواند پرعروق باشد. اما تطابق تکمیلی با بافت طحال در چند سکانس و فاز، به‌ویژه توجه به طحال فرعی را لازم می‌کند؛ پرعروقی به‌تنهایی این دو را جدا نمی‌کند.",
        "C": "متاستاز کارسینوم سلول کلیوی می‌تواند پرعروق باشد؛ سابقهٔ سرطان و انتشار در نواحی دیگر مهم‌اند. اما تطابق ذکرشده با طحال، اینجا سرنخ هدفمند بافت طحال نابجاست.",
        "D": "تودهٔ پانکراس ممکن است بررسی این تشخیص افتراقی را نیز لازم کند. اینجا تطابق مشخص با طحال، بررسی بافت طحال فرعی را در اولویت می‌گذارد، نه نام‌گذاری یک نئوپلاسم."
      },
      "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC3473517/"
    },
    {
      "id": "pnet-fa-03",
      "tags": [
        "pnet"
      ],
      "fach": "abdomen",
      "question": "کدام مجموعهٔ یافته‌ها مستقیم‌تر از سندرم بالینی انسولینومای فانکشنال در بیمار دارای PanNET حمایت می‌کند؟",
      "options": [
        {
          "id": "A",
          "text": "ضایعهٔ SSTR مثبت همراه مقادیر طبیعی گلوکز"
        },
        {
          "id": "B",
          "text": "رنگ‌آمیزی مثبت انسولین در تومور بدون سندرم هیپوگلیسمی مستند"
        },
        {
          "id": "C",
          "text": "علائم تیپیک هیپوگلیسمی همراه گلوکز پایین مستند و انسولین نامتناسباً حفظ‌شده یا افزایش‌یافته"
        },
        {
          "id": "D",
          "text": "جذب بیشتر شریانی همراه سیگنال پایین T1 و بالای T2"
        }
      ],
      "correct": "C",
      "explanation": "سندرم فانکشنال مرتبط با NET، علائم بالینی را با شواهد بیوشیمیایی غلظت نامتناسب هورمون ترکیب می‌کند. تصویربرداری محل و ویژگی‌ها را بررسی می‌کند، اما جای ارزیابی بالینی و بیوشیمیایی را نمی‌گیرد. تأیید در چارچوب مناسب بررسی غدد انجام می‌شود.",
      "wrongExplanations": {
        "A": "جذب SSTR بیان گیرنده را نشان می‌دهد و می‌تواند به تعیین محل کمک کند؛ سندرم بالینی افزایش هورمون را قطعی نمی‌کند.",
        "B": "رنگ‌آمیزی هورمون، بیان آن در بافت را نشان می‌دهد، اما بدون سندرم بالینی و بیوشیمیایی سازگار، فانکشنال‌بودن را قطعی نمی‌کند.",
        "D": "این سیگنال‌ها و رفتار مادهٔ حاجب، الگوی تصویربرداری را توصیف می‌کنند، نه اثر سیستمیک ترشح هورمون را."
      },
      "source": "https://doi.org/10.1111/jne.13318"
    },
    {
      "id": "pnet-fa-04",
      "tags": [
        "pnet"
      ],
      "fach": "abdomen",
      "question": "یک خلاصه، انسولینوماها را عمدتاً خوش‌خیم توصیف می‌کند و قرار است از آن برای برآورد خطر در گروه PanNET غیرفانکشنال استفاده شود. کدام داده مستقیم‌تر به قابلیت تعمیم بین این جمعیت‌ها می‌پردازد؟",
      "options": [
        {
          "id": "A",
          "text": "تعداد بیشتری انسولینوما با همان روش گردآوری داده"
        },
        {
          "id": "B",
          "text": "اندازه‌گیری دقیق‌تر جذب شریانی در گروه انسولینوما"
        },
        {
          "id": "C",
          "text": "پیگیری طولانی‌تر همان گروه انسولینوما"
        },
        {
          "id": "D",
          "text": "داده‌های جمعیت هدف غیرفانکشنال شامل گرید تومور، سیر و زمینهٔ بالینی"
        }
      ],
      "correct": "D",
      "explanation": "داده‌های انسولینوما، گروه بالینی و زیستی متفاوتی را توصیف می‌کنند. دادهٔ بیشتر یا پیگیری طولانی‌تر همان گروه مبدأ، به‌تنهایی قابلیت تعمیم را حل نمی‌کند. ارزیابی PanNET غیرفانکشنال به دادهٔ جمعیت هدف و توجه به گرید، رشد، تصویربرداری و زمینهٔ بیمار نیاز دارد؛ قاعده‌ای دربارهٔ اندازه یا خوش‌خیمی نتیجه‌گیری نمی‌شود.",
      "wrongExplanations": {
        "A": "موارد بیشتر انسولینوما، توصیف گروه مبدأ را بهتر می‌کند، اما تفاوت آن با جمعیت هدف غیرفانکشنال را مستقیم پاسخ نمی‌دهد.",
        "B": "اندازه‌گیری تصویری دقیق‌تر می‌تواند کیفیت سنجش را بهتر کند، اما جای جمعیت هدف مناسب برای برآورد خطر را نمی‌گیرد.",
        "C": "پیگیری طولانی‌تر ممکن است رخدادهای دیررس انسولینوما را نشان دهد. تفاوت بالینی و زیستی با گروه غیرفانکشنال همچنان باقی است."
      },
      "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7029300/"
    }
  ]
}

export const PNET_FLASHCARD_TOPIC = {
  "id": "pnet",
  "area": "Abdomen",
  "chapter": "Pankreas",
  "icon": "CT",
  "iconImage": "/fach/abdomen.png",
  "color": "#f97316",
  "href": "/flashcards/pnet",
  "title": {
    "de": "Neuroendokrine Tumoren (pNET)",
    "en": "Neuroendocrine tumours (pNET)",
    "fa": "تومورهای نورواندوکرین پانکراس (pNET)"
  },
  "subtitle": {
    "de": "Mehrphasen-CT · Milz-Mimic · klinische Korrelation",
    "en": "Multiphasic CT · splenic mimic · clinical correlation",
    "fa": "CT چندفازی · افتراق بافت طحال · تطبیق بالینی"
  }
}

export const PNET_FLASHCARDS = [
  {
    "id": "pnet-arterial-pattern",
    "topicId": "pnet",
    "category": {
      "de": "CT",
      "en": "CT",
      "fa": "CT"
    },
    "front": {
      "de": "Was bedeutet arterielle Hyperanreicherung bei einem PanNET?",
      "en": "What does arterial hyperenhancement mean in a PanNET?",
      "fa": "تقویت شریانی در PanNET چه مفهومی دارد؟"
    },
    "answer": {
      "de": "Sie ist häufig, aber nicht obligat oder allein beweisend.",
      "en": "It is common, but neither obligatory nor diagnostic by itself.",
      "fa": "شایع است، اما الزامی نیست و به‌تنهایی تشخیصی نیست."
    },
    "explanation": {
      "de": "Größe, Differenzierung und Nekrose beeinflussen das Erscheinungsbild.",
      "en": "Tumour size, differentiation and necrosis affect the appearance.",
      "fa": "اندازه، تمایز و نکروز تومور بر ظاهر اثر می‌گذارند."
    },
    "source": "https://pubmed.ncbi.nlm.nih.gov/23991643/"
  },
  {
    "id": "pnet-splenic-mimic",
    "topicId": "pnet",
    "category": {
      "de": "Differenzialdiagnose",
      "en": "Differential",
      "fa": "تشخیص افتراقی"
    },
    "front": {
      "de": "Wie prüfst du einen möglichen intrapankreatischen Splenulus?",
      "en": "How do you assess a possible intrapancreatic accessory spleen?",
      "fa": "طحال فرعی داخل پانکراس را چگونه بررسی می‌کنید؟"
    },
    "answer": {
      "de": "Dichte und Enhancement der Läsion über alle verfügbaren Phasen mit der Milz vergleichen.",
      "en": "Compare lesion attenuation and enhancement with the spleen across all available phases.",
      "fa": "دانسیته و تقویت ضایعه را در همهٔ فازهای موجود با طحال مقایسه کنید."
    },
    "explanation": {
      "de": "Übereinstimmung mit der Milz ist ein wichtiger Mimic-Hinweis, besonders im Pankreasschwanz.",
      "en": "Matching the spleen is an important mimic clue, especially in the pancreatic tail.",
      "fa": "تطابق با طحال سرنخی مهم برای افتراق است، به‌ویژه در دم پانکراس."
    },
    "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC3473517/"
  },
  {
    "id": "pnet-functional-status",
    "topicId": "pnet",
    "category": {
      "de": "Klinische Korrelation",
      "en": "Clinical correlation",
      "fa": "تطبیق بالینی"
    },
    "front": {
      "de": "Was definiert ein NET-assoziiertes funktionelles Hormonsyndrom?",
      "en": "What defines a NET-associated functioning hormonal syndrome?",
      "fa": "چه چیزی سندرم هورمونی فانکشنال مرتبط با NET را تعریف می‌کند؟"
    },
    "answer": {
      "de": "Passendes klinisches Syndrom zusammen mit biochemisch unangemessener Hormonkonzentration.",
      "en": "A compatible clinical syndrome together with a biochemically inappropriate hormone concentration.",
      "fa": "سندرم بالینی سازگار همراه با غلظت بیوشیمیایی نامتناسب هورمون."
    },
    "explanation": {
      "de": "Rezeptor-Uptake, Hormonfärbung und Enhancement allein belegen die klinische Hormonwirkung nicht. Bildgebung dient der Lokalisation und Ausbreitungsdiagnostik.",
      "en": "Receptor uptake, hormone staining and enhancement alone do not establish clinical hormonal effects. Imaging supports localisation and staging.",
      "fa": "جذب گیرنده‌ای، رنگ‌آمیزی هورمون و رفتار مادهٔ حاجب به‌تنهایی اثر بالینی هورمون را قطعی نمی‌کنند. تصویربرداری به تعیین محل و مرحله‌بندی کمک می‌کند."
    },
    "source": "https://doi.org/10.1111/jne.13318"
  },
  {
    "id": "pnet-insulinoma-caveat",
    "topicId": "pnet",
    "category": {
      "de": "Quellenkritik",
      "en": "Source appraisal",
      "fa": "ارزیابی منبع"
    },
    "front": {
      "de": "Warum lässt sich das Insulinom-Risiko nicht pauschal auf nichtfunktionelle PanNET übertragen?",
      "en": "Why can insulinoma risk not be transferred wholesale to nonfunctioning PanNETs?",
      "fa": "چرا خطر انسولینوما را نمی‌توان به‌طور کلی به PanNET غیرفانکشنال تعمیم داد؟"
    },
    "answer": {
      "de": "Es handelt sich um unterschiedliche klinisch-biologische Gruppen; für die Zielgruppe Grad, Wachstum, Bildbefund und Patientenkontext berücksichtigen.",
      "en": "They are different clinical/biological groups; consider grade, growth, imaging and patient context in the target population.",
      "fa": "این‌ها گروه‌های بالینی و زیستی متفاوت‌اند؛ گرید، رشد، تصویربرداری و زمینهٔ بیمار در جمعیت هدف لحاظ شوند."
    },
    "explanation": {
      "de": "Eine Häufigkeitsangabe zu Insulinomen beweist weder die Benignität eines kleinen nichtfunktionellen PanNET noch eine allgemeine Therapieentscheidung.",
      "en": "An insulinoma frequency statement establishes neither benignity of a small nonfunctioning PanNET nor a general treatment decision.",
      "fa": "یک گزارهٔ فراوانی دربارهٔ انسولینوما، نه خوش‌خیمی PanNET کوچک غیرفانکشنال و نه تصمیم درمانی عمومی را قطعی می‌کند."
    },
    "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7029300/"
  }
]
