const L = (de, en, fa) => ({ de, en, fa })

export const PDAC_FLASHCARD_TOPIC = {
  id: 'pdac', area: 'Abdomen', chapter: 'Pankreas', icon: 'CT', iconImage: '/fach/abdomen.png', color: '#f97316', href: '/flashcards/pdac',
  title: L('Pankreasgangadenokarzinom', 'Pancreatic ductal adenocarcinoma', 'آدنوکارسینوم مجرایی پانکراس'),
  subtitle: L('CT · Gangzeichen · Gefäßkontakt · Befundung', 'CT · ductal signs · vessel contact · reporting', 'CT · نشانه‌های مجرا · تماس عروقی · گزارش'),
}

export const PDAC_FLASHCARDS = [
  {
    "id": "pdac-isoattenuating",
    "topicId": "pdac",
    "category": {
      "de": "CT-Muster",
      "en": "CT pattern",
      "fa": "الگوی CT"
    },
    "front": {
      "de": "Was suchen Sie bei einer isoattenuierenden möglichen Pankreasläsion?",
      "en": "What should you look for with a possible isoattenuating pancreatic lesion?",
      "fa": "در ضایعهٔ احتمالی هم‌دانسیتهٔ پانکراس به‌دنبال چه می‌گردید؟"
    },
    "answer": {
      "de": "Indirekte Zeichen wie Gangabbruch, prästenotische Gangdilatation oder distale Atrophie.",
      "en": "Indirect signs such as duct cut-off, upstream dilatation or distal atrophy.",
      "fa": "نشانه‌های غیرمستقیم مانند قطع مجرا، اتساع بالادست یا آتروفی دیستال."
    },
    "explanation": {
      "de": "Auch ohne sichtbare hypoenhancierende Masse kann ein fokaler Gangabbruch mit vorgeschalteter Dilatation und Parenchymatrophie auf PDAC hinweisen. Die Zeichen sind abklärungsbedürftig, nicht histologisch beweisend.",
      "en": "Even without a visible hypoenhancing mass, focal duct cut-off with upstream dilatation and parenchymal atrophy can raise concern for PDAC. These signs warrant evaluation rather than establish histology.",
      "fa": "حتی بدون تودهٔ واضح با جذب کمتر مادهٔ حاجب، قطع کانونی مجرا با اتساع و آتروفی پارانشیم در بالادست می‌تواند شک به PDAC ایجاد کند. این نشانه‌ها نیازمند بررسی‌اند، نه اثبات‌کنندهٔ بافت‌شناسی."
    },
    "source": "https://pubmed.ncbi.nlm.nih.gov/12202711/"
  },
  {
    "id": "pdac-double-duct",
    "topicId": "pdac",
    "category": {
      "de": "Sekundäre Zeichen",
      "en": "Secondary signs",
      "fa": "نشانه‌های ثانویه"
    },
    "front": {
      "de": "Was zeigt das Double-Duct-Zeichen?",
      "en": "What does the double-duct sign indicate?",
      "fa": "علامت دو مجرا چه چیزی را نشان می‌دهد؟"
    },
    "answer": {
      "de": "Gleichzeitige Erweiterung von Choledochus und Pankreasgang: Hinweis auf einen Prozess im Kopf-/Papillenbereich, kein PDAC-spezifischer Nachweis.",
      "en": "Concurrent common bile duct and pancreatic duct dilatation: a clue to a process in the head/papillary region, not a PDAC-specific diagnosis.",
      "fa": "اتساع هم‌زمان کلدوک و مجرای پانکراس: سرنخی برای فرایند ناحیهٔ سر/پاپیلا، نه تشخیص اختصاصی PDAC."
    },
    "explanation": {
      "de": "Zu den Ursachen gehören pankreatische oder ampulläre Neoplasien, chronische Pankreatitis und Steine. Klinik und gezielte Abklärung entscheiden; das Gangmuster allein legt die Histologie nicht fest.",
      "en": "Causes include pancreatic or ampullary neoplasms, chronic pancreatitis and stones. Clinical context and targeted evaluation are needed; the duct pattern alone does not establish histology.",
      "fa": "علل شامل نئوپلاسم پانکراس یا آمپولا، پانکراتیت مزمن و سنگ‌اند. زمینهٔ بالینی و بررسی هدفمند لازم است؛ الگوی مجرا به‌تنهایی بافت‌شناسی را تعیین نمی‌کند."
    },
    "source": "https://pubmed.ncbi.nlm.nih.gov/24705640/"
  },
  {
    "id": "pdac-vessel-reporting",
    "topicId": "pdac",
    "category": {
      "de": "Gefäßkontakt",
      "en": "Vessel contact",
      "fa": "تماس عروقی"
    },
    "front": {
      "de": "Welche Gefäßmerkmale sollten strukturiert beschrieben werden?",
      "en": "Which vessel features should be described systematically?",
      "fa": "کدام ویژگی‌های عروقی باید نظام‌مند توصیف شوند؟"
    },
    "answer": {
      "de": "Gefäß, Kontaktumfang und -länge sowie Kontur, Stenose, Verschluss, Thrombus und Kollateralen.",
      "en": "Vessel, extent and length of contact, contour, narrowing, occlusion, thrombus and collaterals.",
      "fa": "رگ، میزان و طول تماس، جدار، تنگی، انسداد، ترومبوز و کولترال‌ها."
    },
    "explanation": {
      "de": "Arterien und Venen getrennt beschreiben. Bei venösem Verschluss auch Lage/Länge und offene Gefäßsegmente proximal und distal dokumentieren; die Gesamtbeurteilung umfasst außerdem Metastasen und klinischen Kontext.",
      "en": "Describe arteries and veins separately. With venous occlusion, also document location/length and patent vessel segments above and below it; overall assessment additionally includes metastases and clinical context.",
      "fa": "شریان‌ها و وریدها را جداگانه توصیف کنید. در انسداد وریدی، محل/طول و قطعات باز پروگزیمال و دیستال نیز ثبت شوند؛ ارزیابی کلی متاستازها و زمینهٔ بالینی را هم در بر می‌گیرد."
    },
    "source": "https://doi.org/10.1148/radiol.13131184"
  },
  {
    "id": "pdac-mri",
    "topicId": "pdac",
    "category": {
      "de": "MRT/MRCP",
      "en": "MRI/MRCP",
      "fa": "MRI/MRCP"
    },
    "front": {
      "de": "Welche MRT-Merkmale können PDAC gegenüber normalem Pankreas unterstützen?",
      "en": "Which MRI findings may support PDAC relative to normal pancreas?",
      "fa": "کدام یافته‌های MRI می‌توانند در مقایسه با پانکراس طبیعی به نفع PDAC باشند؟"
    },
    "answer": {
      "de": "T1-Hypointensität und verzögerte oder geringere Anreicherung; T2 bleibt variabel.",
      "en": "T1 hypointensity and delayed or lower enhancement; T2 remains variable.",
      "fa": "کم‌سیگنالی T1 و جذب تأخیری یا کمتر مادهٔ حاجب؛ سیگنال T2 متغیر است."
    },
    "explanation": {
      "de": "MRCP kann einen Gangabbruch oder eine vorgeschaltete Gangdilatation zeigen. Das Sequenzmuster wird mit CT, Gangzeichen und klinischem Kontext zusammen beurteilt; es ist kein alleiniger Histologienachweis.",
      "en": "MRCP may show duct cut-off or upstream duct dilatation. Interpret the sequence pattern alongside CT, ductal findings and clinical context; it does not establish histology by itself.",
      "fa": "MRCP می‌تواند قطع مجرا یا اتساع بالادست را نشان دهد. الگوی سکانس‌ها در کنار CT، یافته‌های مجرا و زمینهٔ بالینی تفسیر می‌شود و به‌تنهایی بافت‌شناسی را اثبات نمی‌کند."
    },
    "source": "Abdomen.pdf physical p.37 (printed36), actual page image read2026-10-25; MRI problem-solving role: https://doi.org/10.1148/radiol.13131184"
  }
]
