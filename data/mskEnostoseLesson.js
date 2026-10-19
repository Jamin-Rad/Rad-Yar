const L = (de, en, fa) => ({ de, en, fa })

export const MSK_ENOSTOSE_LESSON = {
  id: 'enostose',
  title: L('Enostose (Kompaktinsel)', 'Enostosis (bone island)', 'انوستوز (جزیره استخوانی)'),
  contentTitle: L('Vom dichten Fokus zum sicheren Befund', 'From a dense focus to a supported interpretation', 'از کانون متراکم تا تفسیر مستند'),
  goals: [
    L('Eine Kompaktinsel als kompakten Knochen im spongiösen Markraum beschreiben.', 'Describe a bone island as compact bone within cancellous bone marrow.', 'انوستوز را به‌عنوان استخوان متراکم در مغز استخوان اسفنجی توصیف کنید.'),
    L('Die im PDF beschriebenen typischen Merkmale und Grenzen der Einordnung wiedergeben.', 'Recall the typical features and interpretation limits described in the PDF.', 'ویژگی‌های تیپیک و محدودیت‌های تفسیر شرح‌داده‌شده در PDF را بازگو کنید.'),
    L('Klinischen Kontext und Grenzen einer Einzelbilddiagnose berücksichtigen.', 'Account for clinical context and the limits of diagnosis from one image.', 'زمینه بالینی و محدودیت تشخیص بر پایه یک تصویر را در نظر بگیرید.'),
  ],
  diagramCaption: L('Konzeptuelles Schema einer Kompaktinsel im spongiösen Knochen; keine Patientenaufnahme.', 'Conceptual schematic of an enostosis in cancellous bone; not a patient image.', 'شماتیک مفهومی انوستوز در استخوان اسفنجی؛ تصویر بیمار نیست.'),
  check: {
    question: L('Eine kleine homogene Sklerose im Beckenknochen zeigt radiär auslaufende, mit der Trabekelstruktur verschmelzende Ränder. Was ist der beste nächste Schritt bei passendem klinischem Kontext und ohne aggressive Begleitzeichen?', 'A small homogeneous sclerotic focus in the pelvis has radiating margins blending with the trabeculae. With a compatible clinical context and no aggressive associated features, what is the best next step?', 'کانون اسکلروتیک کوچک و همگنی در لگن، حاشیه‌های شعاعی دارد که با ترابکول‌ها ادغام می‌شوند. با زمینه بالینی سازگار و بدون نشانه همراه تهاجمی، بهترین اقدام بعدی چیست؟'),
    options: [
      L('Als typische Enostose einordnen; bei atypischem Kontext oder Merkmalen erneut prüfen.', 'Interpret it as a typical enostosis; reassess if the context or features are atypical.', 'آن را انوستوز تیپیک در نظر بگیرید؛ اگر زمینه یا ویژگی‌ها غیرتیپیک بود، دوباره ارزیابی کنید.'),
      L('Allein aufgrund der Sklerose eine osteoblastische Metastase diagnostizieren.', 'Diagnose an osteoblastic metastasis based on sclerosis alone.', 'فقط بر اساس اسکلروز، متاستاز استئوبلاستیک تشخیص دهید.'),
      L('Wegen der Läsionsgröße grundsätzlich eine Biopsie empfehlen.', 'Recommend biopsy solely because of the lesion size.', 'فقط به‌دلیل اندازه ضایعه، بیوپسی را توصیه کنید.'),
    ],
    answer: 0,
    explanation: L('Die beschriebene homogene Sklerose mit pinselartigem Rand passt bei geeignetem Kontext zu einer Enostose. Die kleine abgebildete Aufnahme erlaubt hier nur eine grobe Lokalisation; Vorgeschichte und vollständige Bildgebung bleiben wichtig.', 'The described homogeneous sclerosis with a brush border can fit enostosis in the right context. The small reproduced image supports only rough localization here; history and complete imaging remain important.', 'اسکلروز همگن با حاشیه قلم‌موییِ توصیف‌شده، در زمینه مناسب می‌تواند با انوستوز سازگار باشد. تصویر کوچکِ بازنشرشده در اینجا فقط محل تقریبی را نشان می‌دهد؛ شرح‌حال و تصویربرداری کامل همچنان مهم‌اند.'),
  },
  summary: [
    L('Enostose = kompakter Knochen im Markraum; meist ein Zufallsbefund.', 'Enostosis = compact bone within cancellous bone; usually an incidental finding.', 'انوستوز یعنی استخوان متراکم درون استخوان اسفنجی؛ معمولاً یافته‌ای اتفاقی است.'),
    L('Das PDF beschreibt eine homogene Sklerose mit pinselartigem Rand; diese Morphologie ist im kleinen Fallbild nicht sicher zu beurteilen.', 'The PDF describes homogeneous sclerosis with a brush border; this morphology cannot be assessed confidently in the small case image.', 'PDF اسکلروز همگن با حاشیه قلم‌مویی را توصیف می‌کند؛ ارزیابی مطمئن این مورفولوژی در تصویر کوچک کیس ممکن نیست.'),
    L('Typische MRT-Merkmale werden im PDF textlich beschrieben; ein MRT-Fallbild ist auf dieser Seite nicht abgebildet.', 'Typical MRI features are described in the PDF text; this page does not show an MRI case image.', 'ویژگی‌های تیپیک MRI در متن PDF توصیف شده‌اند؛ در این صفحه تصویر کیس MRI وجود ندارد.'),
  ],
  references: [
    { label: L('Society of Skeletal Radiology: Bone-RADS für inzidentelle solitäre Läsionen bei Erwachsenen (2022)', 'Society of Skeletal Radiology: Bone-RADS for incidental solitary lesions in adults (2022)', 'انجمن رادیولوژی اسکلتی: Bone-RADS برای ضایعات منفرد اتفاقی در بزرگسالان (۲۰۲۲)'), url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9283187/' },
    { label: L('Ulano et al. CT attenuation zur Differenzierung von Enostosen und unbehandelten osteoblastischen Metastasen (2016)', 'Ulano et al. CT attenuation for differentiating enostoses from untreated osteoblastic metastases (2016)', 'Ulano و همکاران. تضعیف CT برای افتراق انوستوز از متاستاز استئوبلاستیک درمان‌نشده (۲۰۱۶)'), url: 'https://pubmed.ncbi.nlm.nih.gov/27101076/' },
    { label: L('Radiopaedia: Knocheninsel in der sakralen Ala, Röntgen (rID 6108; Frank Gaillard)', 'Radiopaedia: Bone island in the sacral ala, radiograph (rID 6108; Frank Gaillard)', 'Radiopaedia: جزیره استخوانی در آلا ساکروم، رادیوگرافی (rID 6108؛ Frank Gaillard)'), url: 'https://radiopaedia.org/cases/6108' },
  ],
  notice: L('Abdeckung: MSK.pdf, PDF S. 104 (gedruckte S. 103). Die PDF-Seite enthält eine kleine AP-Beckenaufnahme aus Radiopaedia rID 6108; die Originalseite nennt den Fallautor. Numerische Größe oder Dichte allein werden nicht als Diagnosekriterium vermittelt. Bone-RADS gilt hier nur als ergänzender Orientierungsrahmen für inzidentelle solitäre Läsionen bei Erwachsenen. Fachliche Freigabe und klinische Fallprüfung stehen aus.', 'Coverage: MSK.pdf, PDF p. 104 (printed p. 103). The page contains a small AP pelvic radiograph from Radiopaedia rID 6108; the original page identifies the case contributor. Size or attenuation alone is not taught as a diagnostic criterion. Bone-RADS is used only as an additional framework for incidental solitary lesions in adults. Specialist approval and clinical case review remain pending.', 'پوشش: MSK.pdf، صفحه ۱۰۴ PDF (صفحه چاپی ۱۰۳). صفحه شامل رادیوگرافی قدامی‌خلفی کوچک لگن از Radiopaedia با شناسه rID 6108 است؛ صفحه اصلی نام مشارکت‌کننده را ذکر می‌کند. اندازه یا چگالی به‌تنهایی به‌عنوان معیار تشخیصی آموزش داده نمی‌شود. Bone-RADS فقط چارچوب تکمیلی برای ضایعات منفرد اتفاقی در بزرگسالان است. تأیید متخصص و بازبینی بالینی کیس هنوز انجام نشده است.'),
}
