// Unpublished ATV04 author work; independent review pending.
export const hcaRows = [
  {
    "key": "hca-risk-context",
    "fach": "abdomen",
    "topicId": "leberadenom",
    "route": "/abdomen/leber/adenom",
    "createCard": false,
    "source": "https://doi.org/10.14309/ajg.0000000000002857",
    "question": {
      "de": "Die Bildgebung lässt ein HCA erwägen. Welche zusätzliche Anamnese stützt diesen Verdacht besonders, ohne die Läsionsdiagnose allein festzulegen?",
      "en": "Imaging raises the possibility of HCA. Which additional history particularly supports this possibility without establishing the lesion diagnosis alone?",
      "fa": "تصویربرداری احتمال HCA را مطرح می‌کند. کدام شرح حال تکمیلی بیشتر از این احتمال حمایت می‌کند، بدون اینکه به‌تنهایی تشخیص ضایعه را قطعی کند؟"
    },
    "options": [
      {
        "de": "Langjährige Einnahme exogener Sexualhormone und metabolisches Syndrom",
        "en": "Long-term exogenous sex-hormone use and metabolic syndrome",
        "fa": "مصرف طولانی هورمون‌های جنسی خارجی و سندرم متابولیک"
      },
      {
        "de": "Chronische Virushepatitis mit Zirrhose",
        "en": "Chronic viral hepatitis with cirrhosis",
        "fa": "هپاتیت ویروسی مزمن همراه سیروز"
      },
      {
        "de": "Bekanntes kolorektales Karzinom mit weiterer Fernmetastasierung",
        "en": "Known colorectal carcinoma with other distant metastases",
        "fa": "کارسینوم شناخته‌شدهٔ کولورکتال همراه متاستازهای دوردست دیگر"
      },
      {
        "de": "Primär sklerosierende Cholangitis mit progredienter Gallenwegsstenose",
        "en": "Primary sclerosing cholangitis with progressive bile-duct stricture",
        "fa": "کلانژیت اسکلروزان اولیه با تنگی پیشروندهٔ مجرای صفراوی"
      }
    ],
    "correct": "A",
    "explanation": {
      "de": "Exogene Hormone, anabole Steroide, Adipositas/metabolische Faktoren und Glykogenspeicherkrankheiten gehören zur HCA-Risikoanamnese. Sie unterstützen die Einordnung, ersetzen aber nicht die multiphasische Bildgebung. Zirrhose oder bekannte Malignität verändern die Differenzialdiagnose.",
      "en": "Exogenous hormones, anabolic steroids, obesity/metabolic factors and glycogen-storage disease belong in the HCA risk history. They support assessment but do not replace multiphasic imaging. Cirrhosis or known malignancy changes the differential diagnosis.",
      "fa": "هورمون‌های خارجی، استروئیدهای آنابولیک، چاقی و عوامل متابولیک و بیماری ذخیرهٔ گلیکوژن از موارد شرح حال خطر HCA هستند. آن‌ها به ارزیابی کمک می‌کنند، اما جای تصویربرداری چندفازی را نمی‌گیرند. سیروز یا بدخیمی شناخته‌شده، تشخیص افتراقی را تغییر می‌دهد."
    },
    "wrong": [
      null,
      {
        "de": "Dieser Kontext erhöht besonders die Aufmerksamkeit für HCC. Er ist nicht die typische HCA-Risikokonstellation der Frage; die Läsion muss im entsprechenden Leberkontext beurteilt werden.",
        "en": "This context particularly raises concern for HCC. It is not the typical HCA risk combination asked for; assess the lesion in the appropriate liver context.",
        "fa": "این زمینه به‌ویژه توجه را به HCC جلب می‌کند. ترکیب خطر تیپیک HCA مورد سؤال نیست؛ ضایعه باید در زمینهٔ مناسب کبد بررسی شود."
      },
      {
        "de": "Eine bekannte metastasierende Tumorerkrankung lenkt die Abklärung zunächst auf sekundäre Leberläsionen. Sie ist kein spezifischer HCA-Risikofaktor.",
        "en": "Known metastatic malignancy directs evaluation towards secondary liver lesions. It is not a specific HCA risk factor.",
        "fa": "بدخیمی متاستاتیک شناخته‌شده، بررسی را به سمت ضایعات ثانویهٔ کبد هدایت می‌کند. عامل خطر اختصاصی HCA نیست."
      },
      {
        "de": "Diese Anamnese lenkt den Verdacht auf eine relevante biliäre Erkrankung einschließlich möglicher Malignität; sie ist keine typische HCA-Risikokonstellation.",
        "en": "This history directs concern towards relevant biliary disease including possible malignancy; it is not a typical HCA risk context.",
        "fa": "این شرح حال، توجه را به بیماری مهم صفراوی از جمله احتمال بدخیمی جلب می‌کند؛ زمینهٔ خطر تیپیک HCA نیست."
      }
    ]
  }
]

export const hcaCoverage = {
  "route": "/abdomen/leber/adenom",
  "topicId": "leberadenom",
  "status": "AUTHOR_FULL_ORIGINAL_POOL_PLUS_ONE_MAPPED_GAP_REVIEW_PENDING",
  "learningGoals": [
    {
      "id": "clinical-context",
      "text": {
        "de": "HCA-Risikoanamnese und relevante Komplikationsmöglichkeiten benennen.",
        "en": "State HCA risk history and clinically relevant potential complications.",
        "fa": "شرح حال خطر HCA و عوارض احتمالی مهم بالینی را بیان کنید."
      },
      "questionIds": [
        "aq-atv-hca-risk-context-de"
      ],
      "cardIds": [
        "leberadenom-01-definition",
        "leberadenom-02-risk"
      ]
    },
    {
      "id": "mri-phenotype",
      "text": {
        "de": "Chemical shift und HBP-Muster unter Beachtung von Ausnahmen einordnen.",
        "en": "Interpret chemical-shift and HBP patterns with their exceptions.",
        "fa": "الگوهای chemical shift و HBP را با توجه به استثناها تفسیر کنید."
      },
      "questionIds": [
        "hepatic-adenoma-hbp-de-01",
        "hepatic-adenoma-opposed-phase-de-01"
      ],
      "cardIds": [
        "leberadenom-03-mri-fat",
        "leberadenom-04-hepatobiliary"
      ]
    },
    {
      "id": "dynamic-assessment",
      "text": {
        "de": "Ein HCA-verdächtiges Enhancementmuster anhand geeigneter multiphasischer Bildgebung beurteilen.",
        "en": "Assess an HCA-suggestive enhancement pattern using appropriate multiphasic imaging.",
        "fa": "الگوی جذب مطرح‌کنندهٔ HCA را با تصویربرداری چندفازی مناسب بررسی کنید."
      },
      "questionIds": [
        "hepatic-adenoma-dynamic-ct-de-01",
        "abdomen-focal-liver-de-01"
      ],
      "cardIds": [
        "leberadenom-05-dynamic"
      ]
    },
    {
      "id": "limits-and-workup",
      "text": {
        "de": "Bei unklarer HCA/HCC-Abgrenzung die Grenzen der Bildgebung erkennen und weitere Abklärung anstoßen.",
        "en": "Recognise imaging limits in indeterminate HCA/HCC differentiation and initiate further workup.",
        "fa": "در افتراق نامشخص HCA از HCC، محدودیت تصویربرداری را بشناسید و بررسی تکمیلی را آغاز کنید."
      },
      "questionIds": [
        "hepatic-adenoma-caveat-de-01"
      ],
      "cardIds": [
        "leberadenom-04-hepatobiliary"
      ]
    }
  ]
}
